# Defects

## Proposed: pre-existing race in index.html click handler (uncancelled setTimeout chains) gives garbled output on mid-animation clicks; not a regression from change 4, so the verifier may reclassify as expected-as-before.

- **Status:** FAIL
- **Evidence:** Probe /tmp/mc401.mjs output: {"first":"foo bar foo","again":"foo bar foo","mid":"fo boofaoor o bfaoro foo","final":"foo bar foo","errs":[]}; git diff HEAD -- index.html shows only the two string changes.
- **Expected result:** Repeated and mid-animation clicks behave as before the change. Output stays `foo bar foo`, with no stray old text and no new errors.
- **Actual result:** First run: 'foo bar foo'. Re-click after finish: 'foo bar foo'. After 4 rapid mid-animation clicks, #out was garbled: 'fo boofaoor o bfaoro foo' (stray characters from the earlier still-running typing loops interleaved). A single click after settling restored 'foo bar foo'. No page or console errors. The git diff of index.html vs HEAD changes only the string literals (Hello, world! -> foo bar foo) in the pre and the script; the click handler is unchanged, so the overlapping-timer garbling is the same pre-existing behavior (each click resets text but does not cancel the earlier step() timers), not introduced by this change. The literal 'no stray old text' expectation is not met for mid-animation clicks.
