# Change plan

Omitted sections: schema, concurrency, migration, feature flag, observability, regression strategy beyond AC checks (single-line text edit)

## 1. Selected technical approach
D-1 (DESIGN): add the line `foo bar foo` to README.md after the heading, separated by a blank line. Reason: `hello world` is absent, so a literal replacement is impossible; this is the smallest edit satisfying the request intent.

## 2. Alternatives considered
- Do nothing: fails the request.
- Create a new hello/foo source file: out of scope, invents files.

## 3. Why preferred
Smallest diff, one tracked file, trivially reversible.

## 4. Components to modify
`README.md`.

## 5. Components not to modify
Everything else, including `.uncle/` and `.gitignore`.

## 12. Error and recovery
None expected.

## 16. Automated-test strategy
No test framework exists and none is added. Use the baseline verification_commands plus the AC-1 to AC-4 shell checks.

## 18. Manual verification
Open README.md and confirm the two lines.

## Restrictions
| R-ID | source_kind | Source | Requirements | Required property | Mechanism | Rationale | CAP | Feasibility evidence | Phase |
|---|---|---|---|---|---|---|---|---|---|
| R-1 | USER | CHANGE_REQUEST.md | AC-1 | Text `foo bar foo` appears | Edit README.md | Request wording | CAP-EDIT | README.md exists (git ls-files) | CODING |
| R-2 | DESIGN | Plan D-1 | AC-4 | Minimal scope | Only README.md owned | Avoid unrecorded deviations | CAP-EDIT | Single tracked file | CODING |

No live verification or credentials required.

## Change-impact table
| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| README.md | Add line `foo bar foo` | Request intent | Low | AC-1, AC-2, AC-3, AC-4 |

## Traceability
| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S-1 | I-1 | README.md | grep -qx 'foo bar foo' README.md | Read file |
| AC-2 | S-2 | I-1 | README.md | head -1 check | Read file |
| AC-3 | S-3 | n/a | README.md | git grep check | None |
| AC-4 | S-1 | n/a | README.md | git diff --name-only | None |

## Rollback plan
`git checkout README.md`.

## Implementation sequence
1. Add `foo bar foo` line to README.md (D-1, R-1, R-2; CAP-EDIT; AC-1 to AC-4) — Owns: `README.md`

## 21. Scope cuts
None possible; already minimal.

## 22. Risks and unresolved questions
- Risk: the user may have intended a different file containing `hello world`; none exists in this checkout. Not blocking: D-1 is a revisable in-scope default.
