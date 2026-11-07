# Change plan

Omitted sections: Schema, Migration, Concurrency, Feature flag, Observability (single text line)

Issue identity: none supplied in CHANGE_REQUEST.md metadata; omitted.

## 1. Selected technical approach
D-1: Append `yoyoyoyoy` plus newline as a new line to README.md.

## 2. Alternatives considered
Print it from hello.c (breaks I-1 and tests/check.sh); add to index.html (not asked).

## 3. Why preferred
No test or behavior impact; D-1 resolves the unspecified target by choosing the lowest-risk file.

## 4. Components to modify
README.md.

## 5. Not to modify
hello.c, Makefile, index.html, tests/.

## 12. Error and recovery
None applicable.

## 14. Rollback plan
Remove the added line from README.md (or git checkout README.md).

## Restrictions
| R-ID | source_kind | Source | Reqs | Property | Mechanism | Rationale | CAP | Phase |
|---|---|---|---|---|---|---|---|---|
| R-1 | REPOSITORY | tests/check.sh | I-1, I-2 | hello output unchanged | Do not edit hello.c/Makefile | check.sh cmp on stdout | CAP-1 | CODING |

Feasibility: tests/check.sh inspected, copies only hello.c and Makefile; command `sh tests/check.sh`. No live-auth prerequisites.

## 16-17. Test strategy
AC-1 and AC-2 commands as in the spec; regression via `sh tests/check.sh`. No new tests.

## 18. Manual verification
Open README.md and see the line.

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| README.md | Append line `yoyoyoyoy` | Requested | None | AC-1 grep |

## Traceability
| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | B-3, B-4 | none | README.md | grep commands | view file |
| AC-2 | B-1 | I-1, I-2 | none | sh tests/check.sh | none |

## Implementation sequence

1. S-1 Append `yoyoyoyoy` line to README.md; reqs AC-1; decision D-1; cap CAP-1; then run both acceptance commands. Owns: `README.md`

## 21. Scope cuts
None.

## 22. Risks and unresolved questions
Target file was inferred (README.md); if the user meant another file, redirect before implementation.
