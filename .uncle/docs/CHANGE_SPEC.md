# Change spec

Omitted sections: Performance, Security, Migration (trivial text change)

## 1. Change type
Feature (documentation text).

## 2. Problem statement
Request to add a line reading `yoyoyoyoy`; target unspecified.

## 3. Current behavior
README.md contains only `# seren-test` (B-3).

## 4. Desired behavior
README.md also contains a line exactly `yoyoyoyoy`.

## 5. Observable behavior table
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | ADD | read README.md | no such line | line `yoyoyoyoy` present | grep -qx yoyoyoyoy README.md |
| S-2 | PRESERVE | read README.md | heading `# seren-test` | heading remains first line | head -1 README.md |
| S-3 | PRESERVE | build and run hello | B-1 | unchanged | sh tests/check.sh |

## 6. Invariant table
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | stdout exactly `Hello, world!` | hello.c | hello.c | sh tests/check.sh |
| I-2 | EXISTING | make and make clean succeed | Makefile | Makefile | sh tests/check.sh |
No RELAXED or REMOVED invariants.

## 14. Non-goals
No changes to program output, Makefile, index.html or tests.

## 15. Assumptions
Target file is README.md (decided; user may redirect).

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | README.md contains a line exactly `yoyoyoyoy`. | grep -qx yoyoyoyoy README.md |
| AC-2 | README.md first line remains `# seren-test`. | test "$(head -1 README.md)" = '# seren-test' |
| AC-3 | hello program behavior and make targets are unchanged. | sh tests/check.sh prints PASS |

