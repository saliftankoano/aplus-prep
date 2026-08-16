# System

This document explains how the project works. See [DECISIONS.md](./DECISIONS.md) for why consequential choices were made, [DOMAIN.md](./DOMAIN.md) for shared terminology, and [CHANGELOG.md](./CHANGELOG.md) for shipped behavior.

## Interface, theme, and motion

The public experience is built from a shared shell, semantic design tokens, and configurable exam data:

- `globals.css` defines light tokens under `:root` and dark tokens under `.dark` for canvas, panels, borders, text, brand, Core 1, Core 2, success, warning, and error states.
- `next-themes` defaults to the operating-system preference and persists an explicit light or dark choice. `AnimatedThemeToggler` uses a circular View Transition when supported and changes immediately when it is not.
- `lib/exam-config.ts` is the presentation source of truth for exam codes, collection labels, source versions, totals, and deck links. Question content remains in the existing JSON files.
- Public source labels are deliberately short (`Dump` and `Sure`); stable source slugs remain unchanged for URL and import compatibility.
- `SiteShell`, `DeckBrowser`, `QuizRunner`, and `QuizResults` provide the shared public-screen structure while preserving the existing route and grading contracts.

GSAP and `@gsap/react` provide scoped, automatically cleaned-up motion. ScrollTrigger is limited to discovery/editorial sections; quiz motion is local to answer feedback, progress, and question changes. Server-rendered content starts visible, and page/deck/result entrance motion never lowers opacity so available controls cannot resemble disabled controls. Every animation checks `prefers-reduced-motion`, and CSS also collapses animation and transition duration for reduced-motion visitors.

## Source-labelled decks and quiz grading

Current banks live below an exam and source slug, for example `220-1202/surepass-v5-3/test-1.json`. Current quiz links carry the source in `?source=`, while links without it continue to load the original legacy files. Core collection tabs use `?collection=` so a selected source can be bookmarked and shared independently of quiz URLs.

The shared quiz runner accepts both the newer `correctAnswers` array and the legacy `correctAnswer` field. Multi-select grading uses exact-set equality: the response is correct only when every required answer and no extra answer is selected. Results retain `score`, `total`, and `time`, with optional source and deck context used only to construct retry and next-deck actions.

## PDF question-bank imports

The supplied PDFs contain embedded text. Poppler's `pdftotext` reads that native text layer directly; this is neither OCR nor generative interpretation. The importer detects each source's question markers, option labels, answer keys, and explanations, validates the records, and writes source-labelled JSON decks.

`PDF → native text → source parser → schema validation → 30-question JSON decks + manifest`

Every accepted answer index must refer to an extracted option. Items without representable options or answer keys are listed in the source manifest instead of being silently dropped. Imports can be rebuilt with `npm run import:practice-pdfs` and produce an auditable result. Scanned pages, diagrams, and simulations still require image extraction and reviewed PBQ authoring.

Related decision: [Use deterministic native PDF extraction for text-based question banks](./DECISIONS.md#use-deterministic-native-pdf-extraction-for-text-based-question-banks--2026-08-15).
