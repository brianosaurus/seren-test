# Change plan

Omitted sections: Schema, Migration, Concurrency, Feature flag, Observability (none applicable)

Seeded from: none

## 1. Selected technical approach
Replace the literal in hello.c, index.html and tests; update mutation find strings.

## 2-3. Alternatives
A shared constant was rejected as overkill for a demo.

## 4. Components to modify
See Change-impact table.

## 5. Not to modify

Makefile, tests/mutations/run.mjs, README.md. README.md is not edited. AC-2 scope is hello.c, index.html and tests/ only: it is met when the grep for the old text (`Hello, world`) over those paths is empty. README.md is excluded from AC-2 even if it contains the old text. As a check, also grep all tracked files outside .uncle, including README.md; if README.md contains the old text, report it rather than editing it.

## 6-9. Data flow, state, interface, schema
Stdout text only. No other changes.

## 10. Compatibility
Output text changes by request; format (newline, exit 0) kept.

## 12. Error and recovery
None new.

## 14. Rollback plan
Revert the four files with git checkout.

## 16-17. Automated and regression tests

check.sh literal updated (expected.txt `foo bar foo`). Mutations are literal text (not regex), each applied independently to a pristine copy of hello.c; find/replace are JS string literals in list.mjs that must evaluate to the exact bytes in hello.c, and run.mjs fails unless each find occurs exactly once. DI-1: find `foo bar foo`, replace `foo bar`. DI-2: find is the exact source text foo, backslash, n, double quote as written in hello.c (JS literal "foo\\n\""), replace `foo"`. DI-4: find is the exact source text printf("foo bar foo\n"); (JS literal 'printf("foo bar foo\\n");'), replace is exactly fprintf(stderr, "foo bar foo\n"); . After run.mjs finishes, hello.c is byte-identical to its pre-run state. The typed JS string t in index.html is exactly `foo bar foo` with the original string's newline handling unchanged. index.html positive check: `grep -c 'foo bar foo' index.html` returns at least 2 and includes the snippet line `printf("foo bar foo\n");`. AC-2 grep for `Hello, world` covers all tracked files outside .uncle, including README.md (which is not modified). Run `sh tests/check.sh` and `node tests/mutations/run.mjs`.

## 18. Manual verification

Open index.html, click run. Manual check passes when the final typed output equals `foo bar foo`; click behavior during or after the animation (repeated or mid-animation clicks) is unchanged from baseline.

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| `hello.c` | printf string to `foo bar foo\n` | S-1 | Low | check.sh |
| `index.html` | Snippet line 25 and JS `t` line 43 changed to `foo bar foo`. The text is a static literal with no HTML or format metacharacters, and index.html renders it with its existing mechanism, unchanged. | S-2, S-3 | Low | grep -c "foo bar foo" index.html returns at least 2: the typed JS string `t` and the snippet line printf("foo bar foo\n"); the page heading is unchanged. A case-insensitive grep for 'hello, world' over hello.c, index.html and tests/ is empty (README.md excluded). |
| `tests/check.sh` | Expected string lines 19-20 | S-1 | Low | self |
| `tests/mutations/list.mjs` | Retarget DI-1, DI-2, DI-4 | S-5 | Medium | run.mjs |

## Traceability

| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S-1 | I-1 | hello.c | check.sh | run ./hello |
| AC-2 | S-2, S-3 | none | index.html | grep, grep -c "foo bar foo" index.html >= 2, including snippet line printf("foo bar foo\n"); | click run |
| AC-3 | S-5 | I-3 | list.mjs | run.mjs reports DI-1, DI-2 and DI-4 all killed, each find occurs exactly once in pristine hello.c (grep -cF), and hello.c sha256 is unchanged after the run | none |
| AC-4 | S-4 | I-2 | none | check.sh | none |

## 20. Implementation sequence

1. Source and page text: edit hello.c and index.html.
   Owns: `hello.c`, `index.html`
2. Tests: update check.sh literal and mutation entries DI-1, DI-2, DI-4 (independent of step 1 files).
   Owns: `tests/check.sh`, `tests/mutations/list.mjs`
3. Verify with both baseline commands, plus: (a) `grep -rniE 'hello, ?world' hello.c index.html tests/` outputs nothing (README.md excluded from AC-2); (b) `grep -cF 'foo bar foo' index.html` is at least 2 and `grep -F 'printf("foo bar foo\n");' index.html` matches; (c) diff the `t` line in index.html against baseline to show only the text changed and newline handling is unchanged; (d) before running run.mjs, `grep -cF` each DI-1, DI-2, DI-4 find in pristine hello.c returns exactly 1; (e) run.mjs reports every mutation killed; (f) sha256 of hello.c before and after run.mjs is identical and `git diff hello.c` shows only the intended edit.
   Depends on: 1, 2

## 21. Scope cuts
None needed.

## 22. Risks

Punctuation assumption (spec section 15). Each mutation is applied independently to a pristine copy of hello.c, never cumulatively, and its find must occur exactly once in that copy. DI-1's find `foo bar foo` is a substring of DI-4's find, but independent application keeps each match count at one, as hello.c has one printf.

## Adversarial review dispositions

| Finding | Disposition | Reason | Exact plan change |
|---|---|---|---|
| AR-001 | Accepted | Plan keeps README.md untouched, so AC-2's scope must be stated to match its grep. | Section 5 text states AC-2 scope is hello.c, index.html and tests/; README.md excluded. |
| AR-002 | Accepted | index.html verification needs exact patterns for both the typed string and the snippet. | Impact row s11.1.r2 coverage now names exact greps for foo bar foo in the typed string and the snippet printf line. |
| AR-003 | Accepted | Plan did not state newline handling for the typed JS string t. | s11.1.r2 is not mine; s11.1.r4 row and s9.1 now state t is exactly the new text with original newline handling unchanged. |
| AR-004 | Accepted | DI-4 replacement was elided and find uniqueness was unstated. | s9.1 now gives DI-4's full replacement, says each mutation is applied to a pristine copy, and each find matches exactly once. |
| AR-005 | Accepted | Plan lacked a restoration guarantee for hello.c after mutation runs. | Section 16-17 (s9.1) now states hello.c is byte-identical to its pre-run state after run.mjs finishes. |
| AR-006 | Accepted | DI-2 find escaping was ambiguous and could match zero times, breaking I-3. | Section 16-17 (s9.1) now defines DI-2 find as exact source text foo, backslash, n, quote, and run.mjs fails unless every find matches exactly once. |
| AR-007 | Accepted | Plan did not say how mutations are applied, and DI-1's find is a substring of DI-4's. | s15.1 now states each mutation is applied independently to a pristine hello.c copy and its find must occur exactly once. |
| AR-008 | Accepted | AC-2 scope and README.md exclusion conflict; the plan should state the scope explicitly. | s4.1 now states AC-2 scope is hello.c, index.html and tests/, and README.md is excluded even if it has old text. |
| AR-009 | Accepted | Line-number edit checked only by old-text grep is weak; a positive grep is cheap and clear. | Updated index.html impact row: grep asserts foo bar foo in snippet and t literal, heading unchanged. |
| AR-010 | Accepted | Rendering mechanism should be stated to settle how the string reaches the page. | Updated index.html impact row: static literal without metacharacters, existing rendering mechanism unchanged. |
| AR-011 | Accepted | Mutation strings were elided/ambiguous; stating literal-text handling and exact DI-4 replacement removes ambiguity. | Edited s9.1 to state literal-text find/replace and spell out DI-4 replacement exactly. |
| AR-012 | Accepted | Plan lacked a positive check that the new string appears in index.html. | Edited s9.1 and AC-2 tests to add grep -c 'foo bar foo' index.html >= 2 including the printf snippet line. |
| AR-013 | Accepted | Escaping level of mutation finds was unspecified; a wrong level would match zero times. | Section 16-17 (s9.1) now states finds are JS literals evaluating to exact hello.c bytes and run.mjs requires exactly one match. |
| AR-014 | Accepted | AC-2 scope and the README.md not-to-modify rule must agree; README.md must be confirmed free of the old text. | Section 5 (s4.1) now requires a grep over all tracked files outside .uncle, including README.md, to confirm no old text, without modifying README.md. |
| AR-015 | Accepted | The manual check was underspecified about pass criteria and click behavior. | Section 18 now states the pass criterion and that click behavior is unchanged from baseline. |
