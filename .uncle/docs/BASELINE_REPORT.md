# Baseline

Omitted sections: Reproduction (not a bug); Parallel groups (single command)

## 1. Change-request summary
.uncle/docs/CHANGE_REQUEST.md: "change add a line that says yoyoyoyoy". Target file unspecified.

## 2. Repository architecture
Tiny C demo: `hello.c`, `Makefile`, `index.html` (static demo page), `README.md` (single line `# seren-test`), `tests/check.sh` (acceptance), `tests/mutations/*.mjs`.

## 3. Relevant code paths
- `README.md:1` title only.
- `hello.c:4` prints `Hello, world!\n`.
- `tests/check.sh:17-21` asserts stdout is exactly `Hello, world!\n`, exit 0, empty stderr.
- `index.html` mirrors hello.c/Makefile as display text.

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | `./hello` | prints `Hello, world!` exit 0 | hello.c:4, check.sh:17-21 | Yes |
| B-2 | `make` / `make clean` | builds / removes hello | Makefile, check.sh:10,23-27 | Yes |
| B-3 | open README.md | one line `# seren-test` | README.md:1 | Title yes |
| B-4 | click run button in index.html | types `Hello, world!` | index.html script | Yes |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | hello stdout is exactly `Hello, world!\n`, stderr empty, exit 0 | hello.c | tests/check.sh | High |
| I-2 | make clean removes only the binary, idempotent | Makefile | tests/check.sh | High |

## 7. Existing automated-test coverage
`tests/check.sh` covers hello.c and Makefile only; README.md and index.html are untested. It copies only hello.c and Makefile.

## 9. Baseline test results
Command from tests/check.sh usage header. No suite run here; driver baseline is authoritative. No documented pre-existing failures.

## 12. Likely change surface
`README.md` (chosen; see assumption). Adding to hello.c would break I-1.

## 13. Regression-sensitive components
hello.c output (I-1).

## 14. Outside the change
hello.c, Makefile, index.html, tests/.

## 15. Unknowns and assumptions
A-1: target file unspecified; assume README.md as a new line after `# seren-test`. Program output must not change because check.sh pins it.

## 16. Initial risk assessment
Low.

## Exact build and test commands executed

```sh
sh tests/check.sh
```

