# Baseline report

Omitted sections: Reproduction (not a bug); Schema contracts (none)

## 1. Change-request summary
.uncle/docs/CHANGE_REQUEST.md: change hello world to foo bar foo.

## 2. Repository architecture
Tiny C demo: `hello.c`, `Makefile`, `index.html` (static page mirroring the source and typing the output), `tests/check.sh` (acceptance), `tests/mutations/{list,run}.mjs` (mutation harness).

## 3. Relevant code paths
- hello.c:4 printf("Hello, world!\n")
- index.html:25 displayed source snippet; index.html:43 JS `t='Hello, world!'`
- tests/check.sh:19-20 expected output
- tests/mutations/list.mjs:11,12,14 DI-1, DI-2, DI-4 use the old string as `find`

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | ./hello | stdout `Hello, world!\n`, exit 0, empty stderr | hello.c:4, check.sh:15-21 | Format yes, text changes |
| B-2 | make / make clean | builds `hello`; clean removes it, idempotent | Makefile, check.sh | Yes |
| B-3 | Click run button in index.html | types `Hello, world!` | index.html:43 | Format yes, text changes |
| B-4 | index.html source snippet | shows old printf | index.html:25 | Should track hello.c |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | Exit 0, nothing on stderr, trailing newline | hello.c | tests/check.sh | High |
| I-2 | make builds hello; clean removes it only | Makefile | tests/check.sh | High |
| I-3 | Each mutation `find` occurs exactly once in target and mutant fails check | list.mjs / run.mjs | node tests/mutations/run.mjs | Medium |

## 6. Interfaces
Program stdout is the only interface.

## 7. Existing test coverage
check.sh compares stdout to the literal string; mutation list targets hello.c text. No browser tests.

## 9. Baseline test results
Commands come from tests/check.sh header and tests/mutations/run.mjs. No CI or documented failures. Not run here; driver baseline is authoritative.

## 12. Likely change surface
hello.c, index.html, tests/check.sh, tests/mutations/list.mjs.

## 13. Regression-sensitive components
Mutation DI-1/2/4 finds (break if string not updated); check.sh literal.

## 14. Outside the change
Makefile, tests/mutations/run.mjs, README.md, heading text `hello · first look`, filenames and binary name `hello`.

## 15. Unknowns and assumptions
Assume the new output is `foo bar foo` without comma or exclamation, newline kept.

## 16. Risk
Low. Main risk is stale test literals.

## Exact build and test commands executed

```sh
sh tests/check.sh
node tests/mutations/run.mjs
```

