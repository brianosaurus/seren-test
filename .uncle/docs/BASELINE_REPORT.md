# Baseline report

Omitted sections: Reproduction (not a bug); Parallel groups (single command)

## 1. Change-request summary
CHANGE_REQUEST.md: "add a line that says yoyoyoyoy". Location unspecified (see 15).

## 2. Repository architecture
Tiny C demo: `hello.c`, `Makefile`, `index.html` (static demo page), `README.md` (only `# seren-test`), `tests/check.sh`, `tests/mutations/*.mjs`.

## 3. Relevant code paths
- `hello.c:3-5` prints `Hello, world!\n`.
- `tests/check.sh:16-22` asserts stdout is exactly that line.
- `README.md:1` sole line.

## 4. Current observable behavior
| ID | Trigger | Current result | Evidence | Must preserve? |
|---|---|---|---|---|
| B-1 | run ./hello | stdout `Hello, world!` exit 0, empty stderr | tests/check.sh:16-22 | Yes |
| B-2 | make / make clean | builds hello; clean removes it, idempotent | Makefile; check.sh:24-28 | Yes |
| B-3 | open README.md | single heading line | README.md | Yes (heading) |

## 5. Existing invariants
| ID | Invariant | Current enforcement | Existing test | Confidence |
|---|---|---|---|---|
| I-1 | hello stdout exactly `Hello, world!\n` | hello.c | tests/check.sh | High |
| I-2 | make clean idempotent, keeps hello.c | Makefile | tests/check.sh | High |

## 7. Existing automated-test coverage
`tests/check.sh` covers C build/output/clean only; README and index.html uncovered. `tests/mutations` is a mutation helper, not in verification.

## 9. Baseline test results
Command from tests/check.sh header (`sh tests/check.sh`). No documented pre-existing failures. Not run here; driver baseline is authoritative.

## 12. Likely change surface
README.md (chosen) vs hello.c/index.html (would break I-1).

## 13. Regression-sensitive components
hello.c and tests/check.sh (exact-output assertion).

## 14. Outside the change
Makefile, tests, index.html, hello.c.

## 15. Unknowns and assumptions
Where the line goes is unspecified. Assumption: append to README.md, since changing hello.c output would contradict protected test check.sh.

## 16. Initial risk assessment
Low. Only risk is wrong placement.

## Exact build and test commands executed

```sh
sh tests/check.sh
```

