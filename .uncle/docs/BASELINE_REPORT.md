# Baseline

Omitted sections: Reproduction (not a bug); Parallel groups (single command)

## 1. Change-request summary
CHANGE_REQUEST.md: "add a line that says yoyoyoyoy". Target file unspecified (see 15).

## 2. Repository architecture
Tiny C demo: `hello.c` (prints greeting), `Makefile` (hello, clean), `index.html` (static page showing the source), `README.md` (one line `# seren-test`), `tests/check.sh` (acceptance), `tests/mutations/*.mjs`.

## 3. Relevant code paths
`README.md:1`; `hello.c:4` printf; `tests/check.sh:16-22` asserts stdout exactly `Hello, world!\n`, exit 0, empty stderr.

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | make; ./hello | stdout `Hello, world!\n`, exit 0, no stderr | tests/check.sh:16-22 | Yes |
| B-2 | make clean | removes hello only, idempotent | tests/check.sh:24-28 | Yes |
| B-3 | read README.md | single heading line | README.md | Yes (heading) |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | Program stdout is exactly `Hello, world!` + newline | hello.c | tests/check.sh | High |
| I-2 | make/make clean succeed | Makefile | tests/check.sh | High |

## 7. Existing automated-test coverage
Only tests/check.sh covers hello.c and Makefile; nothing covers README.md or index.html.

## 9. Baseline test results
Command from tests/check.sh header usage. No results run by me; the driver's baseline is authoritative. No documented pre-existing failures.

## 12. Likely change surface
`README.md` (chosen). Changing hello.c output would contradict I-1/tests/check.sh.

## 13. Regression-sensitive components
hello.c, Makefile, tests/check.sh.

## 14. Outside the change
hello.c, Makefile, index.html, tests/.

## 15. Unknowns and assumptions
Assumption: the line goes into README.md because the request names no target and that avoids breaking I-1.

## 16. Initial risk
Low; only risk is wrong target file interpretation.

## Exact build and test commands executed

```sh
sh tests/check.sh
```

