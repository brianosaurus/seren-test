# Manual checklist

## Coverage: web page

### MC-100
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open index.html in a browser and click the run button once; wait for the typing animation to finish.
- Expected result: The final typed output equals exactly `foo bar foo`, with no `Hello, world!` text appearing at any point.
- Evidence to capture: Screenshot of the page after the animation completes showing the typed output.
- Actual result: 
- Status: NOT RUN

### MC-101
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open index.html and read the displayed C source snippet without clicking anything; also check the page heading.
- Expected result: The snippet shows `printf("foo bar foo\n");` and the heading is unchanged (`hello · first look`).
- Evidence to capture: Screenshot of the source snippet and heading.
- Actual result: 
- Status: NOT RUN

### MC-102
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: MC-100
- Exact action: In index.html, click run repeatedly: once mid-animation, then again after the animation finishes.
- Expected result: Click behavior during and after the animation matches baseline; no errors appear, and the final output is `foo bar foo`.
- Evidence to capture: Screenshots or notes after the mid-animation click and after the later click, plus any browser console errors.
- Actual result: 
- Status: NOT RUN

## Invariants

### MC-202
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open index.html in a browser, click the run button, wait for the typing animation to finish, then click again during and after the animation.
- Expected result: Final typed output equals `foo bar foo`, the displayed source snippet shows printf("foo bar foo\n");, the heading is unchanged, and repeated or mid-animation clicks behave as they did before the change.
- Evidence to capture: Screenshots of the page before the click, mid-animation, and after completion, plus a note on repeated-click behavior.
- Actual result: 
- Status: NOT RUN

### MC-301
- Exclusive resources: none
- Depends on: none
- Exact action: Open index.html in a browser, click the run button, wait for the typing animation to finish, and read the displayed output text.
- Expected result: The final typed output equals exactly `foo bar foo` with no 'Hello, world' text anywhere on the page.
- Actual result: 
- Status: NOT RUN

### MC-302
- Exclusive resources: none
- Depends on: none
- Exact action: In index.html, view the displayed source snippet next to the run button and the page heading.
- Expected result: The snippet shows the line `printf("foo bar foo\n");` and the heading is unchanged (`hello · first look`).
- Actual result: 
- Status: NOT RUN

### MC-303
- Exclusive resources: none
- Depends on: none
- Exact action: In index.html, click run again after the animation completes, and click run again mid-animation in a fresh page load.
- Expected result: Repeated and mid-animation clicks behave as they did in the baseline, and the final output is still `foo bar foo`.
- Actual result: 
- Status: NOT RUN

## Regressions

### MC-400
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Open index.html in a browser, click the run button once, and wait for the typing animation to finish.
- Expected result: The final typed output is exactly `foo bar foo`, and the page heading and layout look as they did before the change.
- Evidence to capture: Screenshot of the page after the animation completes.
- Actual result: 
- Status: NOT RUN

### MC-401
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: In index.html, click run again after the animation finishes, then click run repeatedly in the middle of an animation.
- Expected result: Repeated and mid-animation clicks behave as they did before the change. Output stays `foo bar foo`, with no stray old text and no new errors.
- Evidence to capture: Screenshots after the repeated click and the mid-animation clicks, plus the browser console contents.
- Actual result: 
- Status: NOT RUN

### MC-402
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Look at the source snippet shown on index.html.
- Expected result: The snippet shows `printf("foo bar foo\n");`, and the rest of the snippet and the heading are unchanged.
- Evidence to capture: Screenshot of the snippet area.
- Actual result: 
- Status: NOT RUN

### MC-403
- Required for acceptance: YES
- Exclusive resources: file:hello-binary
- Depends on: none
- Exact action: Run `make`, then `./hello`, then `make clean`, then `make clean` again. For the `./hello` run, capture stderr and the exit status.
- Expected result: `make` builds `hello`. `./hello` prints exactly `foo bar foo` plus a newline, exits 0, and writes nothing to stderr. Both `make clean` runs succeed, and the first removes `hello`.
- Evidence to capture: Terminal transcript showing the output, exit code, stderr and the file listing after each step.
- Actual result: 
- Status: NOT RUN
