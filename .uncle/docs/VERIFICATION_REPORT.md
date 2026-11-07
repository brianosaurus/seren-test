# Verification report

## Findings

### MC-101

- **Action:** Ran `make`, then `./hello` (stdout/stderr captured separately), then `make clean` in the project directory.
- **Expected result:** `./hello` prints exactly `Hello, world!` plus newline, no `yoyoyoyoy`, exits 0, nothing on stderr. `make clean` removes `hello`.
- **Actual result:** make exited 0 (cc -o hello hello.c). ./hello exited 0; stdout bytes were exactly `Hello, world!\n` (14 bytes, no yoyoyoyoy); stderr was 0 bytes. make clean ran `rm -f hello`, exited 0, and `ls hello` then reported no such file.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-101 | YES | PASS | od -c of stdout: H e l l o , space w o r l d ! \n; exit=0; stderr bytes: 0; clean=0; ls: hello: No such file or directory |
