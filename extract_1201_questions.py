import re
import json
import os

def extract_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by question numbers
    # Matches "1." or "22." followed by newline or space
    blocks = re.split(r'\n(\d+)\.\n', content)
    
    questions = []
    
    # blocks[0] is everything before the first "1."
    # then blocks[1] is "1", blocks[2] is question content, blocks[3] is "2", etc.
    for i in range(1, len(blocks), 2):
        q_id_str = blocks[i]
        q_content = blocks[i+1]
        
        # Extract question text (up to the first option)
        # Options are A., B., C., D.
        # Sometimes there's noise before the question starts
        q_lines = [l.strip() for l in q_content.strip().split('\n') if l.strip()]
        
        question_text_parts = []
        options = []
        answer = None
        explanation = ""
        
        found_options = False
        for line in q_lines:
            if re.match(r'^[A-D]\.', line):
                found_options = True
                options.append(line)
            elif line.startswith('Answer:'):
                ans_match = re.search(r'Answer:\s*([A-D])', line, re.IGNORECASE)
                if ans_match:
                    answer = ans_match.group(1)
            elif line.startswith('Explanation:'):
                explanation = line.replace('Explanation:', '').strip()
            elif not found_options:
                question_text_parts.append(line)
            elif found_options and not answer and not line.startswith('Answer:'):
                # This could be more question text split after options or something?
                # Usually it's just noise or part of options if it didn't match [A-D].
                pass
            elif answer and not line.startswith('Explanation:'):
                explanation += " " + line
        
        question_text = " ".join(question_text_parts).strip()
        
        if len(options) >= 4 and answer:
            # We want exactly A, B, C, D
            final_options = []
            for letter in ['A', 'B', 'C', 'D']:
                opt = next((o for o in options if o.startswith(f"{letter}.")), None)
                if opt:
                    final_options.append(opt)
            
            if len(final_options) == 4:
                questions.append({
                    "id": int(q_id_str),
                    "question": question_text,
                    "options": final_options,
                    "correctAnswer": ord(answer.upper()) - ord('A'),
                    "explanation": explanation.strip()
                })

    return questions

def save_chunks(questions, output_dir, prefix, chunk_size=30):
    os.makedirs(output_dir, exist_ok=True)
    
    # Save all questions first
    all_path = os.path.join(output_dir, f"{prefix}_all_questions.json")
    with open(all_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved all {len(questions)} questions to {all_path}")
    
    # Save chunks
    for i in range(0, len(questions), chunk_size):
        chunk = questions[i:i + chunk_size]
        chunk_num = (i // chunk_size) + 1
        
        # Renumber IDs within each chunk to 1-30 if that's the convention, 
        # but the previous ones seem to have global IDs or just 1-30?
        # Looking at 220-1102_test_1.json, IDs are 1, 2, 3...
        # Let's keep them as 1-30 for each test file as per previous convention.
        
        for idx, q in enumerate(chunk):
            q['id'] = idx + 1
            
        chunk_path = os.path.join(output_dir, f"{prefix}_test_{chunk_num}.json")
        with open(chunk_path, 'w', encoding='utf-8') as f:
            json.dump(chunk, f, indent=2, ensure_ascii=False)
        print(f"✅ Saved chunk {chunk_num} to {chunk_path}")

if __name__ == "__main__":
    print("🚀 Extracting questions from cleaned_220-1201.md...")
    extracted = extract_questions('cleaned_220-1201.md')
    print(f"📊 Extracted {len(extracted)} valid multiple-choice questions.")
    
    if extracted:
        save_chunks(extracted, 'public/questions/220-1201', '220-1201', 30)
