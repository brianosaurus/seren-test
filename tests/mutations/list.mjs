/**
 * Entry shape (plain strings only):
 *   id:      string, defect id from the plan (DI-n)
 *   file:    string, target file relative to the repo root (hello.c or Makefile)
 *   find:    string, text that occurs exactly once in the target
 *   replace: string, replacement text
 *   tests:   string[], check script(s) that must fail on the mutant
 *   expect:  string, which T-n check should fail
 */
export const mutations = [
  { id: 'DI-1', file: 'hello.c', find: 'Hello, world!', replace: 'Hello world', tests: ['tests/check.sh'], expect: 'T-2' },
  { id: 'DI-2', file: 'hello.c', find: 'world!\\n"', replace: 'world!"', tests: ['tests/check.sh'], expect: 'T-2' },
  { id: 'DI-3', file: 'hello.c', find: 'return 0;', replace: 'return 1;', tests: ['tests/check.sh'], expect: 'T-2' },
  { id: 'DI-4', file: 'hello.c', find: 'printf("Hello, world!\\n");', replace: 'fprintf(stderr, "Hello, world!\\n");', tests: ['tests/check.sh'], expect: 'T-2' },
  { id: 'DI-5', file: 'Makefile', find: '-o hello hello.c', replace: '-o a.out hello.c', tests: ['tests/check.sh'], expect: 'T-1' },
  {
    id: 'DI-6',
    file: 'Makefile',
    find: 'hello: hello.c\n\t$(CC) -o hello hello.c\n\n.PHONY: clean\nclean:\n\trm -f hello\n',
    replace: '.PHONY: clean\nclean:\n\trm -f hello\n\nhello: hello.c\n\t$(CC) -o hello hello.c\n',
    tests: ['tests/check.sh'],
    expect: 'T-1',
  },
  { id: 'DI-7', file: 'Makefile', find: 'hello: hello.c', replace: 'hello:', tests: ['tests/check.sh'], expect: 'T-3' },
  { id: 'DI-8', file: 'Makefile', find: '\trm -f hello', replace: '\t@true', tests: ['tests/check.sh'], expect: 'T-4' },
  { id: 'DI-9', file: 'Makefile', find: '$(CC) -o hello hello.c', replace: '$(CC) -o hello hello.c || true', tests: ['tests/check.sh'], expect: 'T-5' },
];
