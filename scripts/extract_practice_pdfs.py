#!/usr/bin/env python3
"""Extract source-labelled CompTIA practice decks from text-based PDFs.

The source PDFs use one of two predictable layouts.  This script deliberately
uses Poppler's pdftotext instead of an LLM so imports are repeatable and every
accepted question can be validated before it reaches the app.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import tempfile
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_ROOT = ROOT / "public" / "questions"


@dataclass(frozen=True)
class Source:
    path: Path
    exam: str
    slug: str
    name: str
    version: str
    layout: str


DEFAULT_SOURCES = (
    Source(
        Path("/Users/salif/Downloads/220-1201-2-DUMPSGATE.pdf"),
        "220-1201",
        "dumpsgate-v17-5",
        "DumpsGate",
        "17.5",
        "dumpsgate",
    ),
    Source(
        Path("/Users/salif/Downloads/220-1202-practice exam Dumpsgate.pdf"),
        "220-1202",
        "dumpsgate",
        "DumpsGate",
        "2025",
        "dumpsgate",
    ),
    Source(
        Path("/Users/salif/Downloads/220-1202V5.3.pdf"),
        "220-1202",
        "surepass-v5-3",
        "SurePass",
        "5.3",
        "surepass",
    ),
)


NOISE_PATTERNS = (
    re.compile(r"^\s*Questions and Answers PDF\s+\d+/\d+\s*$"),
    re.compile(r"^\s*https://dumpsgate\.com/.*$"),
    re.compile(r"^\s*Certify For Sure with IT Exam Dumps\s*$"),
    re.compile(r"^\s*The No\.1 IT Certification Dumps\s*$"),
    re.compile(r"^\s*\d+\s*$"),
)


def extract_text(pdf_path: Path) -> str:
    if not shutil.which("pdftotext"):
        raise RuntimeError("pdftotext is required (install Poppler)")
    with tempfile.NamedTemporaryFile(suffix=".txt") as output:
        subprocess.run(
            ["pdftotext", "-layout", str(pdf_path), output.name],
            check=True,
        )
        return Path(output.name).read_text(encoding="utf-8", errors="replace")


def remove_page_noise(text: str) -> str:
    lines: list[str] = []
    for line in text.replace("\f", "\n").splitlines():
        if any(pattern.match(line) for pattern in NOISE_PATTERNS):
            continue
        lines.append(line.rstrip())
    return "\n".join(lines)


def join_lines(text: str) -> str:
    lines = [re.sub(r"\s+", " ", line).strip() for line in text.splitlines()]
    return " ".join(line for line in lines if line)


def question_sections(text: str, layout: str) -> list[tuple[int, str]]:
    if layout == "dumpsgate":
        marker = re.compile(r"(?m)^\s*Question:\s*(\d+)\s*$")
    else:
        marker = re.compile(r"(?m)^\s*(\d+)\.\s+")
    matches = list(marker.finditer(text))
    return [
        (int(match.group(1)), text[match.end() : matches[index + 1].start() if index + 1 < len(matches) else len(text)])
        for index, match in enumerate(matches)
    ]


def parse_section(number: int, section: str) -> tuple[dict | None, str | None]:
    answer_match = re.search(
        r"(?im)^\s*Answer:\s*([A-Z](?:\s*,\s*[A-Z])*)\s*$", section
    )
    if not answer_match:
        kind = "visual-pbq" if re.search(r"\b(SIMULATION|HOTSPOT|DRAG DROP)\b", section) else "missing-answer"
        return None, kind

    before_answer = section[: answer_match.start()]
    after_answer = section[answer_match.end() :]
    option_matches = list(re.finditer(r"(?m)^\s*([A-J])\.\s+", before_answer))
    if len(option_matches) < 2:
        return None, "missing-options"

    question_text = join_lines(before_answer[: option_matches[0].start()])
    if not question_text:
        return None, "missing-question"

    options: list[str] = []
    letters: list[str] = []
    for index, match in enumerate(option_matches):
        end = option_matches[index + 1].start() if index + 1 < len(option_matches) else len(before_answer)
        letters.append(match.group(1))
        options.append(f"{match.group(1)}. {join_lines(before_answer[match.end():end])}")

    answer_letters = [letter.strip() for letter in answer_match.group(1).split(",")]
    if any(letter not in letters for letter in answer_letters):
        return None, "answer-not-in-options"
    correct_answers = [letters.index(letter) for letter in answer_letters]

    explanation_match = re.search(r"(?is)\bExplanation:\s*(.*)", after_answer)
    explanation = join_lines(explanation_match.group(1)) if explanation_match else ""
    question = {
        "id": number,
        "question": question_text,
        "options": options,
        "correctAnswers": correct_answers,
        "correctAnswer": correct_answers[0],
        "explanation": explanation,
    }
    return question, None


def validate(questions: list[dict]) -> None:
    ids: set[int] = set()
    for question in questions:
        assert question["id"] not in ids
        ids.add(question["id"])
        assert len(question["options"]) >= 2
        assert question["correctAnswers"]
        assert all(0 <= answer < len(question["options"]) for answer in question["correctAnswers"])
        assert len(question["question"]) >= 10


def write_source(source: Source, deck_size: int) -> dict:
    text = remove_page_noise(extract_text(source.path))
    sections = question_sections(text, source.layout)
    accepted: list[dict] = []
    rejected: list[dict] = []
    for number, section in sections:
        question, reason = parse_section(number, section)
        if question:
            accepted.append(question)
        else:
            rejected.append({"id": number, "reason": reason})

    validate(accepted)
    output_dir = OUTPUT_ROOT / source.exam / source.slug
    output_dir.mkdir(parents=True, exist_ok=True)
    for old_file in output_dir.glob("test-*.json"):
        old_file.unlink()

    decks = []
    for index in range(0, len(accepted), deck_size):
        deck_number = index // deck_size + 1
        deck = accepted[index : index + deck_size]
        filename = f"test-{deck_number}.json"
        (output_dir / filename).write_text(
            json.dumps(deck, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )
        decks.append({"id": deck_number, "file": filename, "questions": len(deck)})

    manifest = {
        "exam": source.exam,
        "source": source.name,
        "sourceSlug": source.slug,
        "version": source.version,
        "sourceFile": source.path.name,
        "questionsFound": len(sections),
        "questionsImported": len(accepted),
        "questionsRejected": len(rejected),
        "rejected": rejected,
        "decks": decks,
    }
    (output_dir / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    return manifest


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--deck-size", type=int, default=30)
    args = parser.parse_args()
    if args.deck_size < 1:
        parser.error("--deck-size must be positive")

    missing = [str(source.path) for source in DEFAULT_SOURCES if not source.path.exists()]
    if missing:
        parser.error("Missing source PDFs: " + ", ".join(missing))

    manifests = [write_source(source, args.deck_size) for source in DEFAULT_SOURCES]
    print(json.dumps(manifests, indent=2))


if __name__ == "__main__":
    main()
