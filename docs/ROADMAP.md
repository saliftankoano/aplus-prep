# Product Roadmap

This roadmap tracks accepted future work. Shipped behavior belongs in [CHANGELOG.md](./CHANGELOG.md), architecture in [SYSTEM.md](./SYSTEM.md), and consequential choices in [DECISIONS.md](./DECISIONS.md).

## Now — Audit and model the 20 interactive PBQs

**Goal:** Convert the image-dependent questions already recorded in the import manifests into reviewed, source-labelled PBQ specifications.

- Audit 12 DumpsGate 220-1201 v17.5 PBQs (source IDs 393–404), four DumpsGate 220-1202 PBQs (1, 19, 72, 76), and four SurePass 220-1202 v5.3 PBQs (30, 32, 56, 140).
- Render each task plus its solution/explanation pages and extract clean, stable source assets without answer annotations.
- Classify each as drag-and-drop, matching, hotspot, dropdown configuration, or topology/configuration.
- Define a discriminated TypeScript/JSON schema for prompt, assets, interaction state, correct state, partial-credit policy, explanation, and source metadata.
- Manually review every answer model; publish no inferred coordinate or answer rule without review.

**Exit:** Every PBQ has a reviewed interaction type, asset set, answer model, and authoring checklist.

## Next — Build the accessible engine and source decks

- Build pointer- and keyboard-accessible drag-and-drop with click-to-place fallback.
- Build reusable matching/dropdown matrices, percentage-based hotspots, and responsive topology/configuration panels.
- Add reset, submit, retry, correct-state reveal, explanations, exact and optional partial-credit grading.
- Integrate PBQ state with the existing quiz session, progress, and final scoring contracts.
- Author and review all 12 Core 1 items, then publish a DumpsGate 220-1201 PBQ deck.
- Author and review the four DumpsGate and four SurePass Core 2 items, then publish source-specific Core 2 PBQ decks.

**Exit:** Representative fixtures for every interaction type pass desktop, mobile, touch, keyboard-only, reset, retry, and grading tests; all 20 authored PBQs match their source solutions.

## Later — PBQ release quality and maintenance

- Add automated schema validation and interaction fixtures to CI.
- Record per-field grading diagnostics without exposing answers before submission.
- Verify loading, focus management, responsive assets, and results scoring across all PBQ types.
- Settle the related [PBQ architecture decision](./DECISIONS.md#build-pbqs-as-reusable-interaction-types--2026-08-15) after the representative component set passes acceptance testing.

**Definition of done:** Twenty source-labelled PBQs work with mouse, touch, and keyboard, reset cleanly, grade reproducibly, and match reviewed source answer models.

## Recently completed

- **2026-08-15 — Full public UI revamp:** Shipped the semantic light/dark exam cockpit, shared shell, URL-backed collection tabs, responsive quiz workspace, shared results, and reduced-motion-aware GSAP enhancement.
- **2026-08-15 — Current exam banks:** Imported and published 27 source-labelled decks for 220-1201 and 220-1202, including exact-set multi-select grading and rejected-PBQ manifests.
