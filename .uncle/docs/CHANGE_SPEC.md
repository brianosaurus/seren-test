# Change spec

Omitted sections: Performance, Security, Migration, Prototype isolation (trivial text change)

## 1. Change type
Feature (documentation text).

## 2-4. Problem, current, desired
README.md contains only a title. Desired: README.md also contains a line reading exactly `yoyoyoyoy`.

## 5. Observable behavior
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | ADD | read README.md | no such line | a line exactly `yoyoyoyoy` after the heading | grep -x yoyoyoyoy README.md |
| S-2 | PRESERVE | run ./hello (B-1) | Hello, world! | unchanged | sh tests/check.sh |
| S-3 | PRESERVE | README heading (B-3) | `# seren-test` | still first line | head -1 README.md |

## 6. Invariants
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | hello stdout exact | hello.c | tests/check.sh | sh tests/check.sh |
| I-2 | EXISTING | make clean idempotent | Makefile | tests/check.sh | sh tests/check.sh |

No RELAXED or REMOVED invariants.

## 7. Compatibility / 12. Rollback
No interface change. Rollback: revert README.md.

## 14. Non-goals
No change to program output, index.html, tests.

## 15. Assumptions
Placement in README.md is assumed (request gives no file). Alternative of printing from hello.c would conflict with tests/check.sh and needs new authority.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | README.md contains a line exactly `yoyoyoyoy`, after the existing heading. | grep -x yoyoyoyoy README.md; head -1 README.md shows `# seren-test` |
| AC-2 | hello output, build and clean behavior unchanged. | sh tests/check.sh prints PASS |

