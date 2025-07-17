# UI / UX Gaps

| Component | Gap | Suggested Improvement |
|-----------|-----|-----------------------|
| Terminal scrollback | Output overflows small screens; no auto-scroll to latest message | Add `scrollIntoView` for newest line & responsive max-height |
| Chat mode switch | No visible hint that user is now chatting vs issuing commands | Display mode badge "B.R.O. Chat" in prompt bar |
| Theme toggling | Dark/light toggle exists but keyboard shortcut missing | Add `ctrl + shift + l` shortcut via `useHotkeys` |

---
*Audit date: 2025-07-17*
