# Change plan

Omitted sections: schema, migration, concurrency, observability, feature flag (trivial text edit)

## 1-3. Approach
Append line `yoyoyoyoy` to README.md. Alternatives: print from hello.c or add to index.html; rejected because hello.c output is asserted exactly by tests/check.sh (I-1), which is protected. Decision D-1: README placement, in-scope default.

## Restrictions
| ID | source_kind | Source | Reqs | Property | Mechanism | Rationale | CAP | Phase | Feasibility |
|---|---|---|---|---|---|---|---|---|---|
| R-1 | REPOSITORY | tests/check.sh:20 | S-2, I-1 | hello stdout unchanged | do not edit hello.c or tests | exact cmp assertion | CAP-1 | CODING | inspected check.sh:16-22 |

## 4-5. Components
Modify: README.md. Not modify: hello.c, Makefile, index.html, tests/.

## Change-impact table

| Component | Planned change | Reason | Regression risk | Test coverage |
|---|---|---|---|---|
| README.md | append line `yoyoyoyoy` | requested | none | grep -x; check.sh unaffected |

## Traceability
| Requirement | Behavior | Invariant | Component | Automated test | Manual check |
|---|---|---|---|---|---|
| AC-1 | S-1, S-3 | - | README.md | grep -x yoyoyoyoy README.md | view file |
| AC-2 | S-2 | I-1, I-2 | none | sh tests/check.sh | - |

## 16-18. Test strategy
Automated: `sh tests/check.sh` (from baseline verification_commands) plus grep from AC-1. No new tests.

## 10, 12. Compatibility and error behavior
None affected.

## Rollback plan
Revert README.md via git checkout.

## Implementation sequence
1. Append `yoyoyoyoy` as a new line to README.md. Capability CAP-1, decision D-1. Owns: `README.md`

## 21. Scope cuts
None.

## 22. Risks
Placement guess; if the user wanted program output, new authority to change tests/check.sh is needed.
