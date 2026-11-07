#!/bin/sh
# C-3 acceptance check (R-1, R-2; I-1,I-2,I-4,I-5,I-8,I-11).
# Usage: sh tests/check.sh [source_dir]   (default: repo root). Works on a scratch copy.
src=${1:-$(cd "$(dirname "$0")/.." && pwd)}
tmp=$(mktemp -d) || exit 1
trap 'rm -rf "$tmp"' EXIT
fail() { echo "FAIL: $1" >&2; exit 1; }

cp "$src/hello.c" "$src/Makefile" "$tmp/" || fail "cannot copy hello.c and Makefile"
cd "$tmp" || exit 1

make >make.out 2>&1 || { cat make.out >&2; fail "make exited nonzero"; }
[ -f hello ] || fail "hello not produced by make"
[ -x hello ] || fail "hello is not executable"

./hello >out.txt 2>err.txt </dev/null
code=$?
[ "$code" -eq 0 ] || fail "hello exit code $code, expected 0"
printf 'foo bar foo\n' >expected.txt
cmp -s out.txt expected.txt || fail "stdout differs from 'foo bar foo' + newline"
[ ! -s err.txt ] || fail "hello wrote to stderr"

# T-3: hello depends on hello.c (stale binary is rebuilt)
touch -t 200001010000 hello
touch hello.c
make >make.out 2>&1 || fail "make after touching hello.c failed"
[ -n "$(find hello -newer expected.txt 2>/dev/null)" ] || fail "make did not rebuild hello after hello.c changed"

# T-5: a compile failure must make make fail
make clean >/dev/null 2>&1
printf 'int main( {\n' >hello.c
make >make.out 2>&1 && fail "make succeeded on a hello.c that does not compile"
cp "$src/hello.c" hello.c

make clean >/dev/null 2>&1 || fail "make clean exited nonzero"
[ ! -e hello ] || fail "hello still present after make clean"
[ -f hello.c ] || fail "make clean removed hello.c"
make clean >/dev/null 2>&1 || fail "make clean failed when hello absent"

echo "PASS"
