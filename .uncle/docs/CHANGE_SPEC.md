# Change spec

Omitted sections: Migration, Performance, Security, Prototype isolation (trivial text edit)

## 1. Change type
Feature (documentation text).

## 2. Problem statement
Request asks for a line reading `yoyoyoyoy`.

## 3. Current behavior
README.md has only `# seren-test` (B-3).

## 4. Desired behavior
README.md gains a second line `yoyoyoyoy`.

## 5. Observable behavior table
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| B-3 | PRESERVE | Read README.md line 1 | `# seren-test` | unchanged | grep -x '# seren-test' README.md |
| B-4 | ADD | Read README.md | no such line | contains line exactly `yoyoyoyoy` | grep -x 'yoyoyoyoy' README.md |
| B-1 | PRESERVE | ./hello | Hello, world! | unchanged | sh tests/check.sh |

## 6. Invariant table
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | hello output unchanged | hello.c | tests/check.sh | sh tests/check.sh |
| I-2 | EXISTING | make clean behavior unchanged | Makefile | tests/check.sh | sh tests/check.sh |

No RELAXED or REMOVED invariants.

## 14. Non-goals
No change to hello.c, Makefile, index.html or tests.

## 15. Assumptions
Target file is README.md (request does not say). File ends with a trailing newline.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | README.md contains a line exactly equal to yoyoyoyoy, and its first line is still `# seren-test`. | grep -qx 'yoyoyoyoy' README.md && head -n1 README.md \| grep -qx '# seren-test' |
| AC-2 | Existing build/test behavior is unchanged. | sh tests/check.sh prints PASS |

