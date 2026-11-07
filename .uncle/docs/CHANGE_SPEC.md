# Change spec

Omitted sections: performance, security, migration (trivial text change); prototype isolation (not applicable)

## 1. Change type
Text content change.

## 2. Problem statement
Request: replace `hello world` with `foo bar foo`. The repository contains no `hello world` (baseline B-2).

## 3. Current behavior
See B-1 and B-2.

## 4. Desired behavior
No occurrence of `hello world` remains. Since none exists, the minimal in-scope realisation is to add the line `foo bar foo` to README.md below the heading. This resolves the missing target by choosing the smallest literal outcome.

## 5. Observable behavior table
| ID | Class | Trigger | Current behavior | Expected behavior | Verification |
|---|---|---|---|---|---|
| S-1 | ADD | Read README.md | No `foo bar foo` | Contains a line `foo bar foo` | grep -qx 'foo bar foo' README.md |
| S-2 | PRESERVE | Read README.md line 1 | `# seren-test` | Unchanged | head -1 README.md |
| S-3 | PRESERVE | Search `hello world` | None | Still none | grep -ri 'hello world' README.md returns nonzero |

## 6. Invariant table
| ID | Status | Invariant | Scope | Enforcement point | Verification |
|---|---|---|---|---|---|
| I-1 | EXISTING | README line 1 is `# seren-test` | README.md | Manual convention | S-2 check |

No RELAXED or REMOVED invariants.

## 8. Error and failure behavior
None. A text edit has no runtime failure mode.

## 12. Rollback expectations
`git checkout README.md` restores the original.

## 14. Non-goals
No code, build system, tests, or other files.

## 15. Assumptions and unresolved questions
- Assumption: the user wants `foo bar foo` present, because no `hello world` exists. If a different file was intended, the user must supply it. This is not a blocker for the plan.

## Acceptance criteria

| ID | Criterion | Verification |
|---|---|---|
| AC-1 | README.md contains a line exactly equal to `foo bar foo`. | grep -qx 'foo bar foo' README.md |
| AC-2 | README.md line 1 remains `# seren-test`. | test "$(head -1 README.md)" = '# seren-test' |
| AC-3 | No file outside .uncle/ contains `hello world` (case-insensitive). | ! git grep -qi 'hello world' -- . ':!.uncle' |
| AC-4 | Only README.md is modified among tracked files. | git diff --name-only outputs exactly README.md |

