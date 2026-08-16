## aplus-prep.com

This project was built to assist Mr.Williams and Comptia A+ students to have a place to practice questions for completely free!

### Importing the 220-1201 and 220-1202 source decks

Run `npm run import:practice-pdfs` to rebuild the source-labelled JSON decks
from the three PDFs configured in `scripts/extract_practice_pdfs.py`. The import
uses Poppler's `pdftotext`, validates every answer against its options, creates
30-question deck files, and writes a manifest containing rejected visual PBQs.

The generated question schema supports both single-answer questions and
multi-select questions through `correctAnswers`. `correctAnswer` is retained for
compatibility with the original quiz data.
