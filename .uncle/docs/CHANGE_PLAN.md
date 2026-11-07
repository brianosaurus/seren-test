# Change plan

Omitted sections: Schema, Migration, Concurrency, Feature flag, Observability, Data/state flow (plain text edit)

Source seed URL: none. No issue number available.

## 1. Selected technical approach
Append line `yoyoyoyoy` to README.md. Decision D-1: target README.md because the request names no file and altering hello.c output would break tests/check.sh:20-21 (I-1).

## 2. Alternatives
A: extra printf in hello.c (breaks protected check.sh). B: index.html (display only, no test). Rejected.

## 3. Why preferred
Zero regression exposure.

## 4. Components to modify
README.md.

## 5. Not to modify
hello.c, Makefile, index.html, tests/.

## 8. Interfaces
None.

## 10. Compatibility
README heading preserved.

## 12. Error and recovery
None.

## 14. Rollback plan
Remove the added line (git checkout README.md).

## 16. Automated-test strategy
Command `sh tests/check.sh` (baseline command); plus grep checks in AC-1/AC-2.

## 17. Regression-test strategy
sh tests/check.sh covers I-1, I-2.

## 18. Manual verification
Open README.md and confirm the line.

## Restrictions
| R-ID | source_kind | Source | Reqs | Property | Mechanism | Rationale | CAP | Phase | Feasibility |
|---|---|---|---|---|---|---|---|---|---|
| R-1 | REPOSITORY | tests/check.sh:20-21 | S-3, I-1 | hello stdout unchanged | do not edit hello.c | check asserts exact output | CAP-1 | CODING | inspected lines, exact cmp |

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| `README.md` | append line `yoyoyoyoy` | requested | none | AC-1, AC-2 greps |

## Traceability
| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S-1 | - | README.md | grep -qx | view file |
| AC-2 | S-2 | - | README.md | head -1 | view file |
| AC-3 | S-3 | I-1, I-2 | none | sh tests/check.sh | - |

## Implementation sequence
1. Append `yoyoyoyoy` as a new last line of README.md, keeping the heading first, then run the verification commands. Owns: `README.md`. Decisions: D-1. Reqs: AC-1..AC-3. Caps: CAP-1.

## 21. Scope cuts
None.

## 22. Risks
Target file interpretation (D-1); user can redirect. No blocking questions.
