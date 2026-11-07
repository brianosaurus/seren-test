# Change plan

Omitted sections: Data-flow, State, Interface, Schema, Concurrency, Migration, Feature-flag, Observability (none apply to a one-line text edit)

Issue identity: none (CHANGE_REQUEST.md has no seed link or issue number).

## 1. Selected technical approach
Append line `yoyoyoyoy` to README.md after `# seren-test`. Decision D-1: README.md chosen because the request names no file and tests/check.sh pins hello's output.

## 2. Alternatives considered
Add to hello.c output (breaks I-1 and check.sh); add to index.html (display only, unrequested).

## 3. Why preferred
Zero behavior risk.

## 4. Components to modify
README.md

## 5. Not to modify
hello.c, Makefile, index.html, tests/

## 10. Compatibility
No effect on build or tests.

## 12. Error and recovery
None.

## 14. Rollback plan
`git checkout -- README.md`.

## 16. Automated-test strategy
AC-1 grep command; no new test files (disproportionate).

## 17. Regression-test strategy
`sh tests/check.sh` (baseline verification command).

## 18. Manual verification
None required.

## Restrictions
| R-ID | source_kind | Source | Reqs | Property | Mechanism | Rationale | CAP | Phase | Feasibility |
|---|---|---|---|---|---|---|---|---|---|
| R-1 | REPOSITORY | tests/check.sh:17-21 | S-3, I-1 | hello output unchanged | do not edit hello.c | check pins exact stdout | CAP-1 | CODING | inspected check.sh lines 17-21 |

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| `README.md` | append line `yoyoyoyoy` | requested line | None | AC-1 |

## Traceability
| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S-1, S-2 | n/a | README.md | grep command | none |
| AC-2 | S-3, S-4 | I-1, I-2 | none | sh tests/check.sh | none |

## Implementation sequence
1. STEP-1: Append `yoyoyoyoy` as a new line at end of README.md; reqs AC-1; decision D-1; CAP-1. Owns: `README.md`

## 21. Scope cuts
None.

## 22. Risks and unresolved questions
If the user intended another file, move the line; low-cost. Live verification: none needed.
