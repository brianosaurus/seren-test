# Change spec

Omitted sections: Performance, Security, Migration, Prototype isolation (trivial text edit)

## 1. Change type
Add (documentation text).

## 2. Problem statement
Request to add a line reading `yoyoyoyoy`; location not given.

## 3. Current behavior
README.md contains only `# seren-test` (baseline B-3).

## 4. Desired behavior
README.md also contains a line exactly `yoyoyoyoy`, after the title line.

## 5. Observable behavior table
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | ADD | read README.md | no such line | line `yoyoyoyoy` present | grep -qx yoyoyoyoy README.md |
| S-2 | PRESERVE | read README.md line 1 | `# seren-test` | unchanged | head -n1 README.md |
| S-3 | PRESERVE | run ./hello, make, make clean (B-1, B-2) | per baseline | unchanged | sh tests/check.sh |
| S-4 | PRESERVE | index.html (B-4) | per baseline | unchanged | git diff --stat |

## 6. Invariant table
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | hello output exact | hello.c | tests/check.sh | sh tests/check.sh |
| I-2 | EXISTING | make clean behavior | Makefile | tests/check.sh | sh tests/check.sh |

No RELAXED or REMOVED invariants.

## 7. Compatibility
No interface changes.

## 8. Error behavior
None.

## 12. Rollback
Revert the README.md line.

## 14. Non-goals
Changing program output, index.html, or tests.

## 15. Assumptions
A-1: README.md is the target (location unspecified); changing hello's output would violate I-1.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | README.md contains a line exactly `yoyoyoyoy`, and line 1 is still `# seren-test`. | grep -qx yoyoyoyoy README.md && [ "$(head -n1 README.md)" = "# seren-test" ] |
| AC-2 | hello.c, Makefile, index.html are unmodified and the acceptance check passes. | sh tests/check.sh; git diff --name-only shows only README.md |

