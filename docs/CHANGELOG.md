# Changelog

This append-only log records user-facing changes. See [DECISIONS.md](./DECISIONS.md) for rationale and [SYSTEM.md](./SYSTEM.md) for implementation details.

## 2026-08-15

- Kept interactive cards and result surfaces fully opaque during entrance motion so available choices never resemble disabled content.
- Shortened public source labels to **Dump** and **Sure** while preserving existing source slugs, quiz URLs, and import provenance.
- Redesigned every public screen as a responsive exam cockpit with consistent Core 1/Core 2 identity, semantic light/dark themes, Geist typography, and accessible focus states. ([why](./DECISIONS.md#adopt-a-semantic-exam-cockpit-and-restrained-motion-system--2026-08-15))
- Added a system-aware animated theme control to the site shell, mobile navigation, quiz bar, and results screens, with persisted choices and reduced-motion/unsupported-browser fallbacks. ([how](./SYSTEM.md#interface-theme-and-motion))
- Added restrained GSAP page, collection, quiz, progress, and results motion and removed Framer Motion. ([how](./SYSTEM.md#interface-theme-and-motion))
- Added URL-backed, keyboard-operable source tabs and compact deck browsers for both current exams while preserving all legacy quiz URLs.
- Consolidated Core 1/Core 2 results into a source-aware results experience with animated score feedback and retry/next-deck actions.
- Removed the saved-theme hydration warning and updated site metadata for current 220-1201/220-1202 coverage.
- Added 15 source-labelled DumpsGate 220-1201 v17.5 decks containing 450 standard questions. ([why](./DECISIONS.md#use-deterministic-native-pdf-extraction-for-text-based-question-banks--2026-08-15))
- Added six DumpsGate and six SurePass v5.3 decks for 220-1202, containing 153 standard questions per source. ([why](./DECISIONS.md#use-deterministic-native-pdf-extraction-for-text-based-question-banks--2026-08-15))
- Added exact-set grading for multi-select questions and consolidated Core 1/Core 2 question behavior into the shared quiz runner. ([how](./SYSTEM.md#source-labelled-decks-and-quiz-grading))
- Updated the test-selection experience to identify the current 220-1201 and 220-1202 exams while preserving the original legacy decks.
- Added a reproducible local PDF-import command and per-source manifests that record all rejected visual PBQs. ([how](./SYSTEM.md#pdf-question-bank-imports))
