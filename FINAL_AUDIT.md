## Findings

| ID | Severity | Evidence | Affected requirement | Required correction | Blocks |
|---|---|---|---|---|---|
| FA-001 | MEDIUM | VERIFICATION_REPORT.json has one row, MC-103, with DOM and screenshot evidence for index.html. The AC-1 and AC-2 evidence is only in TEST_REVIEW.json and CHANGE_TEST_REPORT.json. | Not stated | The verification report has only one row, MC-103. It covers an index.html DOM check and does not cover AC-1 (the yoyoyoyoy line in README.md) or AC-2. The row looks unrelated to this change. | NO |
| FA-002 | LOW | TEST_REVIEW.json NEGATIVE row is FAIL with severity MINOR, downgraded. | Not stated | The NEGATIVE row is FAIL (not run). No defect injection shows that the AC-1 grep or tests/check.sh can fail. This is informational and does not block release. | NO |
| FA-003 | LOW | CHANGE_TEST_REPORT.json coverage_gaps and the COVERAGE row in TEST_REVIEW.json. | Not stated | The placement of the line in README.md rests on unconfirmed assumption A-1. Nothing asserts that the line is last or that no other README lines changed. | NO |
| FA-004 | LOW | VERIFICATION_REPORT.json MC-103 is PASS. TEST_REVIEW.json has NEGATIVE as required=false and FAIL, downgraded to MINOR. All required rows are PASS. | Not stated | No waivers are recorded, and none are needed: every required row passes. The only failing row is the optional NEGATIVE row, which is informational and nonblocking. | NO |
| FA-005 | LOW | IMPLEMENTATION_NOTES.json deviations entry for .gitignore, plus the unresolved_concerns line saying it was already uncommitted before this stage. | Not stated | The .gitignore change is a driver-recorded scope deviation with no waiver or explanation from the implementation. It is outside the plan's change-impact table, though the notes call it pre-existing and untouched, so a reviewer should confirm that. | NO |

READY WITH NON-BLOCKING ISSUES
