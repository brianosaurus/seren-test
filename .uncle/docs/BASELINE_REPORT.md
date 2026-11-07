# Baseline

Omitted sections: Reproduction (not a bug); Areas outside change folded into section 12

## 1. Change-request summary
.uncle/docs/CHANGE_REQUEST.md: "add a line that says yoyoyoyoy". Target file unspecified.

## 2. Repository architecture
Tiny C demo: `hello.c` (prints Hello, world!), `Makefile` (hello, clean), `index.html` (static page showing the sources), `README.md` (one line, `# seren-test`), `tests/check.sh` (builds hello.c with Makefile on a scratch copy, checks stdout/exit/clean), `tests/mutations/*.mjs`.

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | ./hello | stdout exactly `Hello, world!\n`, exit 0, empty stderr | hello.c:4, tests/check.sh | Yes |
| B-2 | make / make clean | builds hello; clean removes it, idempotent | Makefile, tests/check.sh | Yes |
| B-3 | view README.md | single line `# seren-test` | README.md:1 | Yes (line kept) |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | hello stdout is exactly `Hello, world!\n` | tests/check.sh cmp | tests/check.sh | High |
| I-2 | make clean idempotent, keeps hello.c | tests/check.sh | tests/check.sh | High |

## 7. Existing test coverage
tests/check.sh copies only hello.c and Makefile; README.md and index.html are not covered.

## 9. Baseline test results
Command taken from tests/check.sh header (`sh tests/check.sh`). No documented pre-existing failures. Driver baseline is authoritative.

## 12. Likely change surface
README.md only (assumed target; see 15).

## 13. Regression-sensitive components
hello.c stdout (I-1): adding the line there would break tests/check.sh.

## 15. Unknowns and assumptions
Where the line goes is unspecified. Assume README.md as the least risky, test-neutral location.

## 16. Initial risk assessment
Low.

## Exact build and test commands executed

```sh
sh tests/check.sh
```

