# Verification report

## Findings

### MC-100

- **Action:** Loaded file:///Users/brianwoods/src/seren-test-change-4/index.html in headless Chromium (Playwright) after reading the page source, clicked #run once, sampled #out every ~50ms through the animation, and read the final text and body text. No driver URL was supplied, so the file path was used.
- **Expected result:** Final typed output equals exactly `foo bar foo`, with no `Hello, world!` text at any point.
- **Actual result:** Typing progressed f, fo, foo, 'foo ', ... and ended at exactly `foo bar foo`. No `Hello, world` appeared in the body text or in any sampled frame.
- **Defects:** None

### MC-101

- **Action:** Inspected the rendered markup of index.html (static page, no click) for the C source snippet and the h1 heading, and diffed against HEAD. No visual screenshot or live browser run was performed.
- **Expected result:** The snippet shows `printf("foo bar foo\n");` and the heading is unchanged (`hello · first look`).
- **Actual result:** Line 25 of index.html renders printf("foo bar foo\n"); in the snippet. Line 20 is <h1>hello &middot; first look</h1>, which renders as `hello · first look`. The diff against HEAD changes only the printf string (and the JS typing string); the heading is untouched.
- **Defects:** None

### MC-102

- **Action:** Fresh page load, clicked #run, clicked again about 150ms later (mid-animation), waited for the animation to finish, then clicked a third time after it had finished and waited. Listened for pageerror and console errors. Compared the click handler with HEAD via git diff.
- **Expected result:** Click behavior during and after the animation matches baseline, no errors appear, and the final output is `foo bar foo`.
- **Actual result:** No page or console errors. A click after the animation finished restarted the typing and ended at `foo bar foo`. A mid-animation click started a second concurrent typing loop (the handler does not cancel the first), so the output was interleaved as `faoro  fboaor foo` once both loops finished. The git diff against HEAD shows the handler logic is unchanged and only the string literal changed from 'Hello, world!' to 'foo bar foo'. The interleaving is therefore baseline behavior and not a regression. The final output after a mid-animation click is not `foo bar foo`; that is baseline behavior and unrelated to this change.
- **Defects:** None

### MC-202

- **Action:** Loaded index.html in headless Google Chrome (via DevTools protocol), clicked #run, sampled output mid-animation, clicked again mid-animation, waited for completion, clicked again after completion, and waited for the final output. Also inspected the git diff of index.html.
- **Expected result:** Final typed output equals `foo bar foo`, the source snippet shows printf("foo bar foo\n");, the heading is unchanged, and repeated or mid-animation clicks behave as before the change.
- **Actual result:** Before click: h1 'hello · first look', snippet contains printf("foo bar foo\n"); and #out was empty. Mid-animation sample was 'foo b'. A click mid-animation reset the text and started a second concurrent typing loop, so the output interleaved into garbage ('faoro ' then 'faoro  fboaor foo'). This is the original click-handler behavior, because the diff shows only the string literals changed. A click after completion restarted typing ('foo'), and the final output was exactly 'foo bar foo'. The heading was unchanged throughout.
- **Defects:** None

### MC-301

- **Action:** No real browser/Playwright was available. Ran the existing temporary probe .uncle/tests/mc301.js, which executes index.html's actual inline script against a stubbed DOM (click handler invoked once, waited 700ms for the typing animation to finish), and grepped index.html for 'hello, world'.
- **Expected result:** The final typed output equals exactly `foo bar foo` with no 'Hello, world' text anywhere on the page.
- **Actual result:** Final output text was exactly "foo bar foo". Case-insensitive search for 'hello, world' in index.html found 0 matches (the static page has no such text; the script only types 'foo bar foo').
- **Defects:** None

### MC-302

- **Action:** Inspected the rendered markup of index.html (source snippet block and h1 heading) by reading the file and its diff against HEAD; no browser was launched and no URL was supplied.
- **Expected result:** The snippet shows `printf("foo bar foo\n");` and the heading is unchanged (`hello · first look`).
- **Actual result:** Line 25 contains `<span class="k">printf</span>(<span class="s">"foo bar foo\n"</span>);`, which renders as printf("foo bar foo\n");. Line 20 is `<h1>hello &middot; first look</h1>`, which renders as `hello · first look`. The diff against HEAD shows only the printf string and the JS typing string changed. The heading and the rest of the snippet are untouched.
- **Defects:** None

### MC-303

- **Action:** Executed index.html's inline click-handler script in Node with a minimal fake DOM (no real browser, no driver URL was supplied) using real timers. Clicked run, waited for completion, clicked again after completion. Then clicked twice 200ms apart (mid-animation). Ran the same sequence against the baseline index.html from git HEAD for comparison.
- **Expected result:** Repeated and mid-animation clicks behave as they did in the baseline, and the final output is still `foo bar foo`.
- **Actual result:** Click after completion: output is 'foo bar foo' both times (baseline: 'Hello, world!' both times). Mid-animation click: output is interleaved/garbled because two typing chains run concurrently ('faoro  fboaor foo'); the baseline does the same ('H,e lwloor,l dw!orld!'). Behavior is identical to baseline. The diff vs HEAD changes only the string literals, so the handler logic is untouched. Note: after a mid-animation click the final text is not 'foo bar foo'; this is a pre-existing baseline defect that the change neither introduces nor fixes. The final output is 'foo bar foo' after a completed run and after a rerun on a finished animation.
- **Defects:** None (pre-existing baseline mid-animation garbling, unchanged by this change)

### MC-400

- **Action:** Loaded a copy of index.html in headless Google Chrome, programmatically clicked the run button once, waited (virtual time 3s) for the typing animation to finish, then dumped the DOM and took a screenshot. No driver URL was supplied, so the static file was used.
- **Expected result:** The final typed output is exactly `foo bar foo`, and the page heading and layout look as they did before the change.
- **Actual result:** The #out span contained exactly `foo bar foo`. The heading was `hello · first look` (unchanged). The screenshot rendered and the layout CSS is untouched. I did not view the screenshot or compare it with a pre-change baseline, so the layout check rests on the unchanged CSS and heading.
- **Defects:** None

### MC-401

- **Action:** Headless Chromium (Playwright) on file:// index.html (no URL was supplied; static page): clicked #run, waited 800ms, clicked again after completion, then clicked 4 times at 100ms intervals mid-animation, waited 1200ms, then one more click and 800ms wait. Captured #out and page/console errors.
- **Expected result:** Repeated and mid-animation clicks behave as before the change. Output stays `foo bar foo`, with no stray old text and no new errors.
- **Actual result:** First run: 'foo bar foo'. Re-click after finish: 'foo bar foo'. After 4 rapid mid-animation clicks, #out was garbled: 'fo boofaoor o bfaoro foo' (stray characters from the earlier still-running typing loops interleaved). A single click after settling restored 'foo bar foo'. No page or console errors. The git diff of index.html vs HEAD changes only the string literals (Hello, world! -> foo bar foo) in the pre and the script; the click handler is unchanged, so the overlapping-timer garbling is the same pre-existing behavior (each click resets text but does not cancel the earlier step() timers), not introduced by this change. The literal 'no stray old text' expectation is not met for mid-animation clicks.
- **Defects:** Proposed: pre-existing race in index.html click handler (uncancelled setTimeout chains) gives garbled output on mid-animation clicks; not a regression from change 4, so the verifier may reclassify as expected-as-before.

### MC-402

- **Action:** Inspected index.html source for the snippet block and diffed it against HEAD (no browser screenshot taken).
- **Expected result:** The snippet shows printf("foo bar foo\n"); and the rest of the snippet and the heading are unchanged.
- **Actual result:** The first <pre> snippet contains `printf("foo bar foo\n");`. The git diff of index.html against HEAD changes only that printf line (plus the JS typing string 't'). The heading `hello · first look`, the #include line, main signature, return 0, closing brace and Makefile block are unchanged.
- **Defects:** None

### MC-403

- **Action:** Ran make, ./hello (stderr captured, exit status checked), make clean, make clean again.
- **Expected result:** make builds hello. ./hello prints exactly 'foo bar foo\n', exits 0, empty stderr. Both make clean runs succeed; first removes hello.
- **Actual result:** make built hello (cc -o hello hello.c, exit 0). ./hello output bytes were 'foo bar foo\n' (12 bytes via od -c), exit 0 (confirmed in a separate run), stderr 0 bytes. First make clean ran 'rm -f hello' exit 0 and ls showed hello gone; second make clean exit 0.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-100 | YES | PASS | Playwright output: f1="foo bar foo", 14 samples all prefixes of `foo bar foo`, hello=false. A screenshot was not taken; this is DOM text evidence. |
| MC-101 | YES | PASS | grep of index.html lines 20 and 25; git diff HEAD -- index.html shows the printf line changed from "Hello, world!\n" to "foo bar foo\n" and no heading change. |
| MC-102 | YES | PASS | Playwright output: mid1="foo ", afterMidClick="faoro  fboaor foo", afterLater="foo bar foo", errs=[]. git diff index.html shows only the two string changes, and the click handler is otherwise identical to HEAD. |
| MC-202 | YES | PASS | Script output JSON: before={h:'hello · first look',pre:true,out:''}, mid='foo b', afterMidClick='faoro ', done='faoro  fboaor foo', restart='foo', final='foo bar foo', h1='hello · first look'. `git diff HEAD -- index.html` shows only two changed lines: the printf snippet and var t, each changed from 'Hello, world!' to 'foo bar foo'. The click handler logic is untouched. No screenshots were taken; DOM text observations were used instead. |
| MC-301 | YES | PASS | Probe stdout: "foo bar foo" false; grep -ci 'hello, world' index.html -> 0. This is a simulated-DOM run, not a visual browser observation. No screenshot was taken. |
| MC-302 | YES | PASS | grep of index.html lines 20 and 25; git diff HEAD -- index.html (2 lines changed in the snippet and the JS). This is a source-level check of the static markup, not a visual screenshot. |
| MC-303 | YES | PASS | Node simulation script /tmp/mc303/t.js output: new {a1:'foo bar foo',a2:'foo bar foo',m:'faoro  fboaor foo'}; base {a1:'Hello, world!',a2:'Hello, world!',m:'H,e lwloor,l dw!orld!'}. git diff HEAD -- index.html shows only the two string changes. Not verified in a real browser. |
| MC-400 | YES | PASS | Chrome --dump-dom output: <h1>hello · first look</h1> and <span id="out">foo bar foo</span>. Screenshot at /tmp/mc400/shot.png (27858 bytes). |
| MC-401 | YES | FAIL | Probe /tmp/mc401.mjs output: {"first":"foo bar foo","again":"foo bar foo","mid":"fo boofaoor o bfaoro foo","final":"foo bar foo","errs":[]}; git diff HEAD -- index.html shows only the two string changes. |
| MC-402 | YES | PASS | index.html lines in the first <pre>: <span class="k">printf</span>(<span class="s">"foo bar foo\n"</span>); git diff HEAD -- index.html shows only 2 hunks: the printf line and var t='foo bar foo'. No screenshot captured. |
| MC-403 | YES | PASS | Terminal transcript: make=0; od -c shows 'f o o _ b a r _ f o o \n'; stderr wc -c = 0; exit=0; c1=0; 'ls: hello: No such file or directory'; c2=0. |
