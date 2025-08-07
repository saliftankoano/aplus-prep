#!/usr/bin/env python3
"""
Fix file ordering so test files are numbered sequentially
"""

import json
import os
import glob
import shutil

def fix_file_ordering():
    """Fix file ordering so test files are numbered sequentially"""
    
    print("🔄 Fixing file ordering...")
    
    # Load all questions from the main file
    with open('questions_organized/all_questions.json', 'r', encoding='utf-8') as f:
        all_questions = json.load(f)
    
    print(f"📊 Loaded {len(all_questions)} questions")
    
    # Create temporary directory
    os.makedirs('questions_organized/temp', exist_ok=True)
    
    # Split questions into chunks of 30
    chunk_size = 30
    question_counter = 1
    
    for i in range(0, len(all_questions), chunk_size):
        chunk = all_questions[i:i + chunk_size]
        file_num = (i // chunk_size) + 1
        
        # Renumber questions in this chunk
        for j, question in enumerate(chunk):
            question['id'] = question_counter
            question_counter += 1
        
        # Save to temporary file
        temp_filename = f'questions_organized/temp/core2_test_{file_num}.json'
        with open(temp_filename, 'w', encoding='utf-8') as f:
            json.dump(chunk, f, indent=2, ensure_ascii=False)
        
        print(f"📁 Created {temp_filename} with IDs {chunk[0]['id']}-{chunk[-1]['id']}")
    
    # Remove old files
    old_files = glob.glob('questions_organized/core2_test_*.json')
    for old_file in old_files:
        os.remove(old_file)
        print(f"🗑️ Removed {old_file}")
    
    # Move new files to main directory
    new_files = glob.glob('questions_organized/temp/core2_test_*.json')
    for new_file in new_files:
        filename = os.path.basename(new_file)
        shutil.move(new_file, f'questions_organized/{filename}')
        print(f"📁 Moved {filename}")
    
    # Remove temp directory
    os.rmdir('questions_organized/temp')
    
    # Verify the fix
    print(f"\n📊 Verification:")
    test_files = glob.glob('questions_organized/core2_test_*.json')
    test_files.sort()
    
    for test_file in test_files:
        with open(test_file, 'r', encoding='utf-8') as f:
            questions = json.load(f)
        
        start_id = questions[0]['id']
        end_id = questions[-1]['id']
        print(f"   • {os.path.basename(test_file)}: IDs {start_id}-{end_id} ({len(questions)} questions)")
    
    # Verify no duplicates in all_questions.json
    with open('questions_organized/all_questions.json', 'r', encoding='utf-8') as f:
        all_questions = json.load(f)
    
    ids = [q['id'] for q in all_questions]
    unique_ids = set(ids)
    
    print(f"\n📊 Final verification:")
    print(f"   • Total questions: {len(all_questions)}")
    print(f"   • Unique IDs: {len(unique_ids)}")
    print(f"   • Duplicate IDs: {len(ids) - len(unique_ids)}")
    
    if len(ids) == len(unique_ids):
        print("✅ No duplicate IDs found!")
    else:
        print("❌ Still have duplicate IDs!")

def main():
    fix_file_ordering()
    print(f"\n✅ File ordering fixed!")

if __name__ == "__main__":
    main()
