# Decisions

This document records why non-obvious product and engineering choices were made. See [SYSTEM.md](./SYSTEM.md) for how the systems work, [DOMAIN.md](./DOMAIN.md) for shared language, and [CHANGELOG.md](./CHANGELOG.md) for what shipped.

### Adopt a semantic exam cockpit and restrained motion system — 2026-08-15

**Decision:** Use shared semantic design tokens, a system-aware `next-themes` control, configurable exam/collection data, and scoped GSAP enhancement across every public screen. Preserve server-visible content, current question data, grading, and public route contracts.

**Why:** The previous screens duplicated Core-specific presentation, mixed hard-coded colors, and did not consistently communicate exam/source context. One accessible system makes both themes, every breakpoint, source provenance, and future PBQ surfaces easier to maintain. See [Interface, theme, and motion](./SYSTEM.md#interface-theme-and-motion).

**Ruled out / alternatives:** A static dark-only redesign would ignore visitor preference and accessibility needs. Cinematic motion and quiz ScrollTriggers were rejected because they distract from answer work. Rewriting question data or URLs was outside the presentation scope and would break existing links.

**Status:** Settled. Reopen only if accessibility testing or a future platform constraint requires a different theme or motion foundation.

### Use deterministic native PDF extraction for text-based question banks — 2026-08-15

**Decision:** Import the supplied 220-1201 and 220-1202 PDFs with Poppler's native text extraction, a source-specific deterministic parser, and schema validation. Preserve the publisher and version as part of every deck's identity.

**Why:** All three PDFs contain clean embedded text and stable question, option, answer, and explanation markers. Native extraction is reproducible, local, inexpensive, and makes rejected records auditable. See [PDF question-bank imports](./SYSTEM.md#pdf-question-bank-imports).

**Ruled out / alternatives:** LLM-first parsing was unnecessary for the standard questions and could introduce nondeterministic formatting or answer errors. Image-dependent PBQs were not flattened into ordinary multiple-choice questions because that would change what they test.

**Status:** Settled. Reopen only for scanned or structurally irregular sources that lack a reliable text layer.

### Build PBQs as reusable interaction types — 2026-08-15

**Decision:** Implement the 20 rejected visual PBQs through reusable drag-and-drop, dropdown configuration, hotspot, matching, and topology/configuration components, followed by manual answer-key review.

**Why:** The simulations test relationships and configuration state that cannot be represented faithfully as radio-button questions. A typed PBQ engine lets one accessible interaction model serve multiple source questions. See the [PBQ roadmap](./ROADMAP.md#interactive-pbq-simulations).

**Ruled out / alternatives:** Publishing screenshots with a single generic answer field would be quick but would not reproduce the exam task. Automatically inferred hotspot coordinates and grading rules will not be published without visual review.

**Status:** Open. It becomes settled after the first component set and representative PBQs pass keyboard, mobile, reset, and grading acceptance tests.
