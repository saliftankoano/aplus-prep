import re
import os

def clean_file(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    cleaned_lines = []
    
    # Patterns to remove
    skip_patterns = [
        r'The No\.1 IT Certification Dumps',
        r'Certify For Sure with IT Exam Dumps',
        r'IT Exam Dumps',
        r'AI-generated content may be incorrect\.',
        r'^---$',
        r'^\d+$', # Page numbers on their own line
        r'Version: 11\.0',
        r'\[ Total Questions: \d+ \]',
        r'# Topic \d+, Main Questions',
        r'# Exam 220-1201',
        r'## CompTIA A\+ Core 1Exam \(2025\)'
    ]
    
    combined_skip_pattern = re.compile('|'.join(skip_patterns), re.IGNORECASE)

    for line in lines:
        line = line.strip()
        
        # Skip empty lines that are just noise
        if not line:
            cleaned_lines.append("")
            continue
            
        # Skip matching patterns
        if combined_skip_pattern.search(line):
            continue
            
        # Standardize question headers: "## 1. - (Topic 1)" -> "1."
        question_match = re.match(r'## (\d+)\. - \(Topic \d+\)', line)
        if question_match:
            cleaned_lines.append(f"{question_match.group(1)}.")
            continue
            
        # Standardize "5. - (Topic 1)" (sometimes missing ##)
        question_match_alt = re.match(r'^(\d+)\. - \(Topic \d+\)', line)
        if question_match_alt:
            cleaned_lines.append(f"{question_match_alt.group(1)}.")
            continue

        # Standardize Answer format: "**Answer:** A" -> "Answer: A"
        answer_match = re.match(r'\*\*Answer:\s*\*\*?\s*([A-D])', line, re.IGNORECASE)
        if answer_match:
            cleaned_lines.append(f"Answer: {answer_match.group(1)}")
            continue

        cleaned_lines.append(line)

    # Post-process to remove multiple consecutive blank lines
    final_content = "\n".join(cleaned_lines)
    final_content = re.sub(r'\n{3,}', '\n\n', final_content)
    
    # Fix split questions (lines ending without punctuation followed by text)
    # This is tricky but let's try a simple version: if a line doesn't end in . ? : and next line starts with lowercase or certain words
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final_content)

    print(f"✅ Cleaned file saved to {output_path}")

if __name__ == "__main__":
    clean_file('220-1201-LLAAMA-Parsed.md', 'cleaned_220-1201.md')
