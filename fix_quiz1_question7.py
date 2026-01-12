#!/usr/bin/env python3
import json

# Read the JSON file
with open('public/questions/220-1102/220-1102_test_1.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find and fix question 7
for question in data:
    if question['id'] == 7:
        # Fix the question text
        question['question'] = "A technician is setting up a newly built computer. Which of the following is the fastest way for the technician to install Windows 10?"
        # Update the explanation to be more concise
        question['explanation'] = "An unattended installation is the fastest way to install Windows 10 on a newly built computer. This method uses an answer file to automate the installation process, eliminating the need for user interaction during setup. It can configure all settings including product key, language, partition size, and user accounts automatically. Factory reset is for existing systems, System Restore is for recovery, and in-place upgrade is for updating existing installations."
        break

# Write the fixed data back to the file
with open('public/questions/220-1102/220-1102_test_1.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Quiz 1 Question 7 has been fixed successfully!")
