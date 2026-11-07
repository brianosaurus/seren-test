## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| ASSERTIONS | YES | PASS | [assertions] green-check.md shows sh tests/check.sh PASS and node tests/mutations/run.mjs FIXED. CHANGE_TEST_REPORT.md shows 9 caught and 0 survived, and the old-text grep found no matches. It also shows git diff index.html as two literal hunks with no handler change. The real-browser run and the MC-401 conflict with plan s18 remain open, but they are coverage gaps, not assertion defects. |
| COVERAGE | YES | PASS | [coverage] The driver's green-check.md shows `sh tests/check.sh` PASS (AC-1, AC-4) and `node tests/mutations/run.mjs` FIXED, with 9 caught and 0 survived (AC-3). The AC-2 grep found no old text, and `git diff index.html` shows only the snippet and `var t` hunks. The remaining gaps are that index.html has no automated test and nothing ran in a real browser. The MC-401 versus plan s18 conflict is unresolved and left to the reviewer. |
| INTEGRITY | YES | PASS | Driver green-check recorded 2 passing verification command(s); see .uncle/workflow/green-check.tsv. |
| NEGATIVE | YES | PASS | [oracle] CHANGE_TEST_REPORT.md shows `node tests/mutations/run.mjs` gave 9 caught and 0 survived, which includes DI-1, DI-2 and DI-4. green-check.md marks it FIXED, with no regressions. |
| ORACLE | YES | PASS | [oracle] The expected `foo bar foo` is a literal in tests/check.sh from the requested change text. The driver's `sh tests/check.sh` passed (green-check.md PASS). index.html has no automated oracle, which is a coverage gap noted in CHANGE_TEST_REPORT.md and not a wrong assertion. |
| RESULTS | YES | PASS | Driver green-check recorded 2 passing verification command(s); see .uncle/workflow/green-check.tsv. |
