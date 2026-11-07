## AR-001: AC-2 says no 'Hello, world' remains in any tracked file outside .uncle, but its grep covers only hello.c, index.html, te

- Severity: HIGH
- References: CHANGE_SPEC AC-2 criterion vs verification; CHANGE_PLAN section 5 lists README.md as not to modify.
- Failure: AC-2 says no 'Hello, world' remains in any tracked file outside .uncle, but its grep covers only hello.c, index.html, tests, and README.md is left untouched. Say: 'AC-2 is met when the grep over hello.c, index.html and tests/ is empty; README.md is out of scope and may keep the old text.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-002: S-2/S-3 verify by 'grep index.html' with no exact pattern, and the AC-2 grep misses variants like 'Hello, World'.

- Severity: MEDIUM
- References: CHANGE_SPEC S-2/S-3 verification column; AC-2 grep matches only 'Hello, world'.
- Failure: S-2/S-3 verify by 'grep index.html' with no exact pattern, and the AC-2 grep misses variants like 'Hello, World'. Say: 'index.html is checked by grep for the typed string foo bar foo and for printf("foo bar foo\n"); in the snippet.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-003: Plan does not say whether the typed JS string t includes a newline or just the text.

- Severity: MEDIUM
- References: CHANGE_PLAN impact row for index.html 'JS t line 43' vs AC-2 'typed output string'.
- Failure: Plan does not say whether the typed JS string t includes a newline or just the text. Say: 't is exactly "foo bar foo" plus whatever newline handling the original string had, unchanged.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-004: DI-4 replacement is elided as 'fprintf(stderr, ...)', and DI-1's find 'foo bar foo' may match more than once or overlap

- Severity: MEDIUM
- References: CHANGE_PLAN section 16-17 DI-4; I-3 requires each mutation to match once.
- Failure: DI-4 replacement is elided as 'fprintf(stderr, ...)', and DI-1's find 'foo bar foo' may match more than once or overlap DI-4's find. Say: 'DI-4 replaces the printf line with fprintf(stderr, "foo bar foo\n"); and every find string matches exactly once in hello.c.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-005: Plan does not state that the mutation harness restores hello.c after runs.

- Severity: LOW
- References: CHANGE_PLAN sections 14 and 16-17 contain no restoration statement.
- Failure: Plan does not state that the mutation harness restores hello.c after runs. Say: 'After run.mjs finishes, hello.c is byte-identical to its pre-run state.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-006: DI-2 find string `foo\\n"` is escaped inconsistently between plan and spec, so it may match zero times and break I-3.

- Severity: HIGH
- References: CHANGE_PLAN s9.1 uses `foo\\n"` and `printf("foo bar foo\\n");`; spec S-3 uses `foo\n`; I-3 requires each mutation to match once.
- Failure: DI-2 find string `foo\\n"` is escaped inconsistently between plan and spec, so it may match zero times and break I-3. Plan should say: 'DI-2 find is the exact source text foo, backslash, n, quote as written in hello.c, and run.mjs fails if any find count is not exactly 1.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-007: DI-1's find `foo bar foo` is a substring of DI-4's find, and the plan does not say how mutations are applied.

- Severity: MEDIUM
- References: CHANGE_PLAN s15.1 says only 'hello.c has one printf'; DI-1 find is a substring of the DI-4 find.
- Failure: DI-1's find `foo bar foo` is a substring of DI-4's find, and the plan does not say how mutations are applied. Plan should say: 'each mutation is applied independently to a pristine copy of hello.c, and its find must occur exactly once.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-008: AC-2 says 'any tracked file outside .uncle' but its grep covers only three paths, and README.md is off-limits.

- Severity: MEDIUM
- References: CHANGE_SPEC AC-2 criterion versus its verification grep; CHANGE_PLAN s4 forbids modifying README.md.
- Failure: AC-2 says 'any tracked file outside .uncle' but its grep covers only three paths, and README.md is off-limits. Plan should say: 'AC-2 scope is hello.c, index.html and tests/; README.md is excluded even if it contains the old text.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-009: The index.html edit is given by line numbers and checked only by grep for the old text.

- Severity: LOW
- References: CHANGE_PLAN change-impact row for index.html: 'Snippet line 25 and JS t line 43', coverage 'grep'.
- Failure: The index.html edit is given by line numbers and checked only by grep for the old text. Plan should say: 'a grep asserts `foo bar foo` appears in both the snippet and the `t` literal and the heading is unchanged.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-010: The plan doesn't say how the new string reaches the page.

- Severity: LOW
- References: CHANGE_PLAN.json s11 names "Snippet line 25 and JS `t` line 43" but not the rendering mechanism (textContent or innerHTML).
- Failure: The plan doesn't say how the new string reaches the page. Settle it with: "The text `foo bar foo` is a static literal with no HTML or format metacharacters, and index.html renders it with its existing mechanism, unchanged."
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-011: The mutation find/replace strings are ambiguous.

- Severity: LOW
- References: CHANGE_PLAN.json s9 gives DI-2 find as `foo\\n"` and DI-4 replace as `fprintf(stderr, ...)`.
- Failure: The mutation find/replace strings are ambiguous. DI-4's replacement `fprintf(stderr, ...)` is elided, and DI-2's escaping is unclear. Settle it with: "The runner treats find and replace strings as literal text, and DI-4's replacement is exactly `fprintf(stderr, \"foo bar foo\\n\");`."
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-012: AC-2 verification only greps for absence of 'Hello, world'; it never checks 'foo bar foo' appears in both the typed stri

- Severity: HIGH
- References: CHANGE_SPEC AC-2 verification; impact table lists coverage 'grep' for index.html.
- Failure: AC-2 verification only greps for absence of 'Hello, world'; it never checks 'foo bar foo' appears in both the typed string and snippet in index.html. Settle: 'AC-2 also requires grep -c "foo bar foo" index.html to return at least 2, including the line printf("foo bar foo\\n");.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-013: Mutation find strings mix escaping (`foo\\n"`) and the plan doesn't say whether they are literal or JS-escaped; a wrong

- Severity: MEDIUM
- References: CHANGE_PLAN section 16-17 DI-2 and DI-4 find strings; I-3.
- Failure: Mutation find strings mix escaping (`foo\\n"`) and the plan doesn't say whether they are literal or JS-escaped; a wrong level matches zero times and breaks I-3. Settle: 'Finds are JS literals that must evaluate to the exact bytes in hello.c, and run.mjs must report each matching exactly once.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-014: AC-2 says 'any tracked file outside .uncle' but its grep covers only hello.c, index.html and tests.

- Severity: MEDIUM
- References: CHANGE_SPEC AC-2 criterion versus its verification command; README.md listed as 'Not to modify'.
- Failure: AC-2 says 'any tracked file outside .uncle' but its grep covers only hello.c, index.html and tests. README.md is not modified and may still contain the old text, so the two statements disagree. Settle: 'AC-2 grep covers all tracked files outside .uncle, and README.md must be confirmed free of the old text.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## AR-015: The manual check is only 'see foo bar foo'; repeated or mid-animation clicks are unspecified.

- Severity: LOW
- References: CHANGE_PLAN section 18; S-2.
- Failure: The manual check is only 'see foo bar foo'; repeated or mid-animation clicks are unspecified. Settle: 'Manual check passes when the final typed output equals foo bar foo; click behavior during or after the animation is unchanged from baseline.'
- Fix: Address in the plan.
- Verify: Re-run the check.

## Overall assessment

Review findings require disposition.
