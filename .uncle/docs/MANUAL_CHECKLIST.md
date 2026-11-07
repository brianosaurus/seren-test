# Manual checklist

## Coverage

### MC-102
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Look at the list of files changed in the working tree, outside `.uncle/`.
- Expected result: README.md is the only file whose content changed. No new source, test or build files were added. `.gitignore` is the same as in the pre-change snapshot: it was already present and untracked before the change, and its content is unchanged.
- Evidence to capture: Pasted file-status listing showing only README.md changed.
- Actual result: 
- Status: NOT RUN
