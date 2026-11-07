# Verification report

## Findings

### MC-103

- **Action:** Loaded a copy of index.html in headless Chrome (no Playwright available) with a click on #run injected at end of the script; waited 3s virtual time; dumped DOM and captured screenshot. Grepped the original index.html for the forbidden string.
- **Expected result:** The page displays as before and the run button types `Hello, world!`. The page does not contain `yoyoyoyoy`.
- **Actual result:** After the click, #out contained exactly `Hello, world!`. Page renders with the same code listings and button. `yoyoyoyoy` count in index.html is 0 and absent from the dumped DOM. Caveat: click was script-triggered via button.click(), not a human mouse click, and the screenshot was not visually inspected.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-103 | YES | PASS | DOM dump: <button id="run">$ ./hello</button><span id="out">Hello, world!</span>; grep -c yoyoyoyoy index.html = 0; screenshot at /tmp/mc103/shot.png |
