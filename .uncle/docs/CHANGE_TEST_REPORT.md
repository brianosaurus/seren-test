# Change test report

## Command results

| Command | Status | Meaningful output | Requirements |
|---|---|---|---|
| baseline: node tests/mutations/run.mjs at HEAD (earlier pass) | PASS | 7 caught, 2 survived (DI-7, DI-9) at HEAD; earlier result | S-5 |
| sh tests/check.sh (this pass, after reverting clearTimeout) | PASS | PASS | AC-1, AC-4 |
| git diff index.html | PASS | only two hunks: printf snippet and var t string; no handler change | AC-2, S-2, S-3 |
| grep -rn 'Hello, world' hello.c index.html tests (earlier pass) | PASS | no matches | AC-2 |
| node tests/mutations/run.mjs (earlier this stage; index.html not a mutation target; driver green-check FIXED) | PASS | 9 caught, 0 survived, exit 0 | AC-3 |
| regression tests | DRIVER PENDING | driver reruns | AC-4 |
| full test suite | DRIVER PENDING | NOT RUN in this pass | None stated |
| formatting | N/A | no formatter configured | None stated |
| compiler or type checker | PASS | make build exercised by tests/check.sh | AC-1 |
| linting | N/A | no linter configured | None stated |
| integration tests | N/A | none in repository | None stated |
| frontend build | N/A | static index.html | None stated |
| migration tests | N/A | no data or schema | None stated |
| rollback test | N/A | text change | None stated |
| performance checks | N/A | text change only | None stated |
| security checks | N/A | static literal | None stated |
| newly introduced warnings | PASS | none observed | None stated |
| pre-existing failures | PASS | mid-animation garbling at baseline is pre-existing (DEFECTS.md) and intentionally preserved per plan s18 | None stated |
| untested areas | NOT RUN | no real-browser run in this stage; MC-401 conflict with MC-202/MC-303 unresolved, see implementation notes | MC-401 |

## Coverage gaps

- index.html has no automated test; click behavior not browser-tested in this stage
- MC-401 expectation (no garbling) conflicts with plan s18 and MC-202/MC-303 (baseline behavior); left unresolved for reviewer disposition

## Next action

Driver reruns the full regression block; reviewer decides whether MC-401 expectation or the plan governs mid-animation clicks.
