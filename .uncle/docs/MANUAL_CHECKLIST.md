# Manual checklist

### MC-101
- Exclusive resources: file:hello
- Depends on: none
- Exact action: Run `make`, then `./hello`, then `make clean` in the project directory, and watch the output of each command.
- Expected result: `./hello` prints exactly `Hello, world!` followed by a newline, with no `yoyoyoyoy` text, exits 0 and writes nothing to stderr. `make clean` removes the `hello` binary.
- Evidence to capture: Terminal transcript of the three commands, including the exit status of `./hello`.
- Actual result: 
- Status: NOT RUN
