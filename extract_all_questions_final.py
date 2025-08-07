#!/usr/bin/env python3
"""
Final aggressive extraction script to capture ALL questions from output.md
"""

import re
import json
import os

def extract_all_questions_final(file_path):
    """Extract ALL questions using multiple strategies"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"📄 Processing {len(content)} characters")
    
    questions = []
    
    # Strategy 1: Find all numbered questions (1., 2., 3., etc.)
    numbered_questions = re.findall(
        r'(\d+)\.\s+([^?]+\?)(.*?)(?=\d+\.\s+|\Z)',
        content, re.DOTALL
    )
    
    print(f"Strategy 1 - Numbered questions: {len(numbered_questions)}")
    
    for question_num, question_text, question_content in numbered_questions:
        try:
            question_data = parse_question_content(question_num, question_text, question_content)
            if question_data:
                questions.append(question_data)
        except Exception as e:
            print(f"Error processing numbered question {question_num}: {e}")
    
    # Strategy 2: Find questions by answer patterns (more aggressive)
    answer_sections = re.findall(
        r'(Answer:\s*[A-D])(.*?)(?=Answer:\s*[A-D]|\Z)',
        content, re.DOTALL
    )
    
    print(f"Strategy 2 - Answer sections: {len(answer_sections)}")
    
    for answer_line, answer_content in answer_sections:
        try:
            question_data = parse_from_answer(answer_line, answer_content, questions)
            if question_data:
                questions.append(question_data)
        except Exception as e:
            print(f"Error processing answer section: {e}")
    
    # Strategy 3: Find questions by option patterns
    option_sections = re.findall(
        r'([A-Z][^?]*\?)(.*?)(?=[A-Z][^?]*\?|\Z)',
        content, re.DOTALL
    )
    
    print(f"Strategy 3 - Question patterns: {len(option_sections)}")
    
    for question_text, question_content in option_sections:
        try:
            # Skip if this looks like it was already captured
            if any(q['question'].startswith(question_text[:50]) for q in questions):
                continue
                
            question_data = parse_question_content_alt(question_text, question_content, questions)
            if question_data:
                questions.append(question_data)
        except Exception as e:
            print(f"Error processing pattern question: {e}")
    
    # Strategy 4: Find questions by looking for option sequences
    option_sequences = re.findall(
        r'([^?]*\?)(.*?)(?:-\s*[A-D]\.\s*.*?\n){4,}',
        content, re.DOTALL
    )
    
    print(f"Strategy 4 - Option sequences: {len(option_sequences)}")
    
    for question_text, question_content in option_sequences:
        try:
            # Skip if this looks like it was already captured
            if any(q['question'].startswith(question_text[:50]) for q in questions):
                continue
                
            question_data = parse_question_content_alt(question_text, question_content, questions)
            if question_data:
                questions.append(question_data)
        except Exception as e:
            print(f"Error processing option sequence: {e}")
    
    return questions

def parse_question_content(question_num, question_text, question_content):
    """Parse question content with multiple option patterns"""
    
    # Clean question text
    question_text = question_text.strip()
    
    # Try multiple option patterns
    options = []
    
    # Pattern 1: - A. Text
    option_matches = re.findall(r'-\s*([A-D])\.\s*(.+)', question_content, re.MULTILINE)
    if len(option_matches) >= 4:
        for letter, text in option_matches:
            options.append(f"{letter}. {text.strip()}")
    
    # Pattern 2: 1. A. Text
    if not options:
        option_matches = re.findall(r'\d+\.\s*([A-D])\.\s*(.+)', question_content, re.MULTILINE)
        if len(option_matches) >= 4:
            for letter, text in option_matches:
                options.append(f"{letter}. {text.strip()}")
    
    # Pattern 3: A. Text (without numbering)
    if not options:
        option_matches = re.findall(r'^([A-D])\.\s*(.+)', question_content, re.MULTILINE)
        if len(option_matches) >= 4:
            for letter, text in option_matches:
                options.append(f"{letter}. {text.strip()}")
    
    # Extract answer
    answer_match = re.search(r'Answer:\s*([A-D])', question_content)
    answer = answer_match.group(1) if answer_match else None
    
    # Extract explanation
    explanation_match = re.search(r'Explanation:(.*?)(?=\n\s*\n|\n\s*#|\Z)', question_content, re.DOTALL)
    explanation = explanation_match.group(1).strip() if explanation_match else ""
    
    # Validate and return
    if (question_text and 
        len(options) == 4 and 
        answer and
        len(question_text) > 10):
        
        return {
            'id': int(question_num),
            'question': question_text,
            'options': options,
            'correctAnswer': ord(answer) - ord('A'),
            'explanation': explanation
        }
    
    return None

def parse_question_content_alt(question_text, question_content, existing_questions):
    """Parse question content for alternative patterns"""
    
    question_text = question_text.strip()
    
    # Extract options
    options = []
    option_patterns = [
        r'-\s*([A-D])\.\s*(.+)',
        r'\d+\.\s*([A-D])\.\s*(.+)',
        r'^([A-D])\.\s*(.+)',
    ]
    
    for pattern in option_patterns:
        option_matches = re.findall(pattern, question_content, re.MULTILINE)
        if len(option_matches) >= 4:
            for letter, text in option_matches:
                options.append(f"{letter}. {text.strip()}")
            break
    
    # Extract answer
    answer_match = re.search(r'Answer:\s*([A-D])', question_content)
    answer = answer_match.group(1) if answer_match else None
    
    # Extract explanation
    explanation_match = re.search(r'Explanation:(.*?)(?=\n\s*\n|\n\s*#|\Z)', question_content, re.DOTALL)
    explanation = explanation_match.group(1).strip() if explanation_match else ""
    
    if (question_text and 
        len(options) == 4 and 
        answer and
        len(question_text) > 10):
        
        return {
            'id': len(existing_questions) + 1,  # Assign next available ID
            'question': question_text,
            'options': options,
            'correctAnswer': ord(answer) - ord('A'),
            'explanation': explanation
        }
    
    return None

def parse_from_answer(answer_line, answer_content, existing_questions):
    """Parse question by working backwards from answer"""
    
    # Extract answer
    answer_match = re.search(r'Answer:\s*([A-D])', answer_line)
    answer = answer_match.group(1) if answer_match else None
    
    if not answer:
        return None
    
    # Look for options in the content
    options = []
    option_patterns = [
        r'-\s*([A-D])\.\s*(.+)',
        r'\d+\.\s*([A-D])\.\s*(.+)',
        r'^([A-D])\.\s*(.+)',
    ]
    
    for pattern in option_patterns:
        option_matches = re.findall(pattern, answer_content, re.MULTILINE)
        if len(option_matches) >= 4:
            for letter, text in option_matches:
                options.append(f"{letter}. {text.strip()}")
            break
    
    if len(options) != 4:
        return None
    
    # Try to find question text by looking at lines before options
    lines = answer_content.split('\n')
    question_text = ""
    
    for line in lines:
        line = line.strip()
        if line.startswith('-') or line.startswith('Answer:') or line.startswith('Explanation:'):
            break
        if line and not line.startswith('#'):
            question_text += " " + line
    
    question_text = question_text.strip()
    
    if question_text and len(question_text) > 10:
        return {
            'id': len(existing_questions) + 1,
            'question': question_text,
            'options': options,
            'correctAnswer': ord(answer) - ord('A'),
            'explanation': ""
        }
    
    return None

def deduplicate_questions(questions):
    """Remove true duplicates while keeping all unique questions"""
    
    unique_questions = []
    seen_fingerprints = set()
    
    for q in questions:
        # Create multiple fingerprints for better duplicate detection
        question_lower = q['question'].lower()
        
        # Remove common words and create fingerprint
        words = re.findall(r'\b\w+\b', question_lower)
        important_words = [w for w in words if len(w) > 3 and w not in {
            'which', 'following', 'should', 'technician', 'user', 'system', 
            'computer', 'windows', 'would', 'most', 'best', 'first', 'what',
            'when', 'where', 'how', 'why', 'that', 'this', 'with', 'from'
        }]
        
        if len(important_words) >= 3:
            fingerprint = " ".join(sorted(important_words[:8]))
            
            if fingerprint not in seen_fingerprints:
                seen_fingerprints.add(fingerprint)
                unique_questions.append(q)
        else:
            # If we can't create a good fingerprint, use the first 100 chars
            fingerprint = question_lower[:100].strip()
            if fingerprint not in seen_fingerprints:
                seen_fingerprints.add(fingerprint)
                unique_questions.append(q)
    
    return unique_questions

def save_questions_to_chunks(questions, chunk_size=30):
    """Save questions to multiple JSON files"""
    
    os.makedirs('questions_complete', exist_ok=True)
    
    for i in range(0, len(questions), chunk_size):
        chunk = questions[i:i + chunk_size]
        chunk_num = (i // chunk_size) + 1
        
        # Renumber questions in chunk
        for j, question in enumerate(chunk):
            question['id'] = j + 1
        
        # Save as JSON
        json_filename = f'questions_complete/core2_test_{chunk_num}.json'
        with open(json_filename, 'w', encoding='utf-8') as f:
            json.dump(chunk, f, indent=2, ensure_ascii=False)
        
        print(f"Created {json_filename} with {len(chunk)} questions")
    
    return len(questions), (len(questions) + chunk_size - 1) // chunk_size

def main():
    print("🎯 Final aggressive extraction to capture ALL questions...")
    
    # Extract all questions
    questions = extract_all_questions_final('output.md')
    
    print(f"📊 Raw extraction: {len(questions)} questions")
    
    # Deduplicate
    unique_questions = deduplicate_questions(questions)
    
    print(f"✨ After deduplication: {len(unique_questions)} unique questions")
    
    if unique_questions:
        # Save to chunks
        total_questions, num_files = save_questions_to_chunks(unique_questions, 30)
        
        print(f"\n📁 Created {num_files} test files:")
        for i in range(1, num_files + 1):
            print(f"   - questions_complete/core2_test_{i}.json")
        
        # Save all questions to single file
        with open('questions_complete/all_questions.json', 'w', encoding='utf-8') as f:
            json.dump(unique_questions, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 Saved all {len(unique_questions)} questions to questions_complete/all_questions.json")
        
        # Show statistics
        with_explanations = sum(1 for q in unique_questions if q['explanation'])
        
        print(f"\n📊 Final Statistics:")
        print(f"   • Total questions: {len(unique_questions)}")
        print(f"   • With explanations: {with_explanations}")
        print(f"   • Coverage: {len(unique_questions)/524*100:.1f}% of expected 524")
        
        # Show sample
        print(f"\n📝 Sample questions:")
        for i, q in enumerate(unique_questions[:3]):
            print(f"{i+1}. {q['question'][:80]}...")
            print(f"   Options: {len(q['options'])}, Answer: {chr(ord('A') + q['correctAnswer'])}")
        
    else:
        print("❌ No questions extracted!")

if __name__ == "__main__":
    main()
