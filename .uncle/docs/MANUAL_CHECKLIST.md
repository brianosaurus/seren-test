# Manual checklist

## Coverage

### MC-101
- Required for acceptance: YES
- Exclusive resources: none
- Depends on: none
- Exact action: Run ./hello after building with make, then run make clean twice.
- Expected result: hello prints exactly `Hello, world!` with exit 0 and no stderr. Both make clean runs succeed and hello.c remains.
- Evidence to capture: Terminal transcript showing the hello output, exit status, and both clean runs.
- Actual result: 
- Status: NOT RUN
