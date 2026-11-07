# Change spec

Omitted sections: Performance, Security, Migration (trivial text change); Prototype isolation (n/a)

## 1. Change type
Behavior modification (output text).

## 2. Problem statement
Greeting text must be `foo bar foo` instead of `Hello, world!`.

## 3. Current behavior
See baseline B-1, B-3, B-4.

## 4. Desired behavior
Program, web page animation, and displayed source all use `foo bar foo`.

## 5. Observable behavior table
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | MODIFY | ./hello | `Hello, world!\n` | `foo bar foo\n` | tests/check.sh |
| S-2 | MODIFY | Click run in index.html | types old text | types `foo bar foo` | grep index.html |
| S-3 | MODIFY | index.html source snippet | old printf | `printf("foo bar foo\n");` | grep index.html |
| S-4 | PRESERVE | make, make clean | per B-2 | unchanged | tests/check.sh |
| S-5 | MODIFY | Mutation list | DI-1/2/4 target old text | target new text, still fail check | node tests/mutations/run.mjs |

## 6. Invariant table
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | Exit 0, empty stderr, trailing newline | hello | hello.c | check.sh |
| I-2 | EXISTING | Build/clean semantics | Makefile | Makefile | check.sh |
| I-3 | EXISTING | Mutations each match once and are killed | tests | list.mjs | run.mjs |
No RELAXED or REMOVED invariants.

## 14. Non-goals
No Makefile, README, heading, or binary rename.

## 15. Assumptions
Exact text `foo bar foo`, no punctuation (UNRESOLVED only if user wanted punctuation).

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | Running ./hello prints exactly `foo bar foo` plus newline, exit 0, empty stderr. | sh tests/check.sh |
| AC-2 | index.html typed output string and displayed source snippet both use `foo bar foo`; no `Hello, world` remains in any tracked file outside .uncle. | grep -rn 'Hello, world' hello.c index.html tests returns nothing |
| AC-3 | Mutation harness passes with DI-1, DI-2, DI-4 retargeted to the new string. | node tests/mutations/run.mjs |
| AC-4 | Build and clean behavior unchanged. | sh tests/check.sh |

