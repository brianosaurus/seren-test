# Verification report

## Findings

### MC-101

- **Action:** Ran make (hello already up to date), ran ./hello capturing stdout/stderr and exit code, then ran make clean twice and checked hello.c remains.
- **Expected result:** hello prints exactly `Hello, world!` with exit 0 and no stderr. Both make clean runs succeed and hello.c remains.
- **Actual result:** ./hello printed `Hello, world!`, exit=0, stderr 0 bytes. make clean exited 0 both times (rm -f hello). hello.c still present; hello binary removed.
- **Defects:** None

## Acceptance gate

| ID | Required | Status | Evidence |
|---|---|---|---|
| MC-101 | YES | PASS | Terminal transcript: make: `hello' is up to date.; exit=0; Hello, world!; stderr_bytes=0; rm -f hello c1=0; rm -f hello c2=0; ls hello.c -> hello.c |
