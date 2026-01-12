#!/usr/bin/env python3
import json
import os

def fix_question_text(text):
    """Fix common formatting issues in question text"""
    fixes = [
        # Remove mixed content issues
        ('"Bootmgr is missing Press Ctrl+Alt+Del to restart" error when you start Windows 2. Startup Repair: frequently asked questionsA technician is setting up a newly built computer. Which of the following is the fastest way for the technician to install Windows 10?', 
         'A technician is setting up a newly built computer. Which of the following is the fastest way for the technician to install Windows 10?'),
        
        ('Six Ways to Handle Angry CustomersA user is setting up a computer for the first time and would like to create a secondary login with permissions that are different than the primary login. The secondary login will need to be protected from certain content such as games and websites. Which of the following Windows settings should the user utilize to create the secondary login?',
         'A user is setting up a computer for the first time and would like to create a secondary login with permissions that are different than the primary login. The secondary login will need to be protected from certain content such as games and websites. Which of the following Windows settings should the user utilize to create the secondary login?'),
        
        ('Change Management and Sandbox - Quickbase 2. Embracing change: Build, test, and adapt in a sandbox environment - ZendeskA user is unable to access a web-based application. A technician verifies the computer cannot access any web pages at all. The computer obtains an IP address from the DHCP server. Then, the technician verifies the user can ping localhost, the gateway, and known IP addresses on the internet and receive a response. Which of the following is the MOST likely reason for the issue?',
         'A user is unable to access a web-based application. A technician verifies the computer cannot access any web pages at all. The computer obtains an IP address from the DHCP server. Then, the technician verifies the user can ping localhost, the gateway, and known IP addresses on the internet and receive a response. Which of the following is the MOST likely reason for the issue?'),
        
        # Remove explanatory text mixed with questions
        ('✑ Defragmenting the hard drive means rearranging the files on the disk so that they are stored in contiguous blocks. This will improve the disk performance and reduce the time it takes to read and write data2. 1: CompTIA A+ Certification Exam: Core 2 Objectives, page 23, section 3.1. 2: CompTIA A+ Certification Exam: Core 2 Objectives, page 24, section 3.2.46. A technician needs administrator access on a Windows workstation to facilitate system changes without elevating permissions. Which of the following would best accomplish this task?',
         'A technician needs administrator access on a Windows workstation to facilitate system changes without elevating permissions. Which of the following would best accomplish this task?'),
        
        # Fix mixed content in payment question
        ('Payment applications that allow payments to be made with a mobile device usually rely on NFC to communicate with the payment terminal1. Therefore, if NFC is disabled on the phone, the payment will not work. To enable NFC on an Android phone, you need to follow these steps3: - On your Android device, open the Settings app. - Select Connected devices. - Tap on Connection preferences. - You should see the NFC option. Toggle it on. The other options are not directly related to using a payment application with a mobile device. Airplane mode is a setting that disables all wireless communication on the phone, including NFC4, but it also affects calls, texts, and internet access. Bluetooth is a wireless technology that allows you to connect your phone with other devices such as headphones or speakers, but it is not used for contactless payments. Wi-Fi is a wireless technology that allows you to access the internet or a local network, but it is also not used for contactless payments. Location services are a feature that allows your phone to determine your geographic location using GPS or other methods, but they are not required for contactless payments. 66. A user installed a new application that automatically starts each time the user logs in to a Windows 10 system. The user does not want this to happen and has asked for this setting to be changed. Which of the following tools would the technician MOST likely use to safely make this change?',
         'A user installed a new application that automatically starts each time the user logs in to a Windows 10 system. The user does not want this to happen and has asked for this setting to be changed. Which of the following tools would the technician MOST likely use to safely make this change?'),
        
        # Fix mixed content in CAD question
        ('Resetting a corporate laptop back to a personal laptop… Enterprise vs Pro - WindowsAn architecture firm is considering upgrading its computer-aided design (CAD) software to the newest version that forces storage of backups of all CAD files on the software\'s cloud server. Which of the following is MOST likely to be of concern to the IT manager?',
         'An architecture firm is considering upgrading its computer-aided design (CAD) software to the newest version that forces storage of backups of all CAD files on the software\'s cloud server. Which of the following is MOST likely to be of concern to the IT manager?'),
        
        # Fix incomplete question
        ('After clicking on a link in an email a Chief Financial Officer (CFO) received the following error: The CFO then reported the incident to a technician. The link is purportedly to the organization\'s bank. Which of the following should the technician perform FIRST?',
         'A Chief Financial Officer (CFO) received an error after clicking on a link in an email. The link is purportedly to the organization\'s bank. Which of the following should the technician perform FIRST?'),
        
        # Fix mixed content in whaling/RAM question
        ('A technician is concerned about a large increase in the number of whaling attacks happening in the industry. The technician wants to limit the company\'s risk to avoid any issues. Which of the following items A technician is installing RAM in a new workstation and needs to protect against electrostatic discharge. Which of the following will best resolve this concern?',
         'A technician is installing RAM in a new workstation and needs to protect against electrostatic discharge. Which of the following will best resolve this concern?'),
        
        # Fix mixed content in banking error question
        ('A user received the following error upon visiting a banking website: The security presented by website was issued a different website\'s address. A technician should instruct the user to: - A. clear the browser cache and contact the bank. - B. close out of the site and contact the bank.C. continue to the site and contact the bank. D. update the browser and contact the bank.Explanation: The technician should instruct the user to clear the browser cache and contact the bank (option A). This error indicates that the website the user is visiting is not the correct website and is likely due to a cached version of the website being stored in the user\'s browser. Clearing the browser cache should remove any stored versions of the website and allow the user to access the correct website. The user should also contact the bank to confirm that they are visiting the correct website and to report the error. 117. A technician downloaded software from the Internet that required the technician to scroll through a text box and at the end of the text box, click a button labeled Accept. Which of the following agreements IS MOST likely in use?',
         'A technician downloaded software from the Internet that required the technician to scroll through a text box and at the end of the text box, click a button labeled Accept. Which of the following agreements IS MOST likely in use?'),
        
        # Fix mixed content in forensic question
        ('It is important in forensic investigations to establish that the evidence is in fact related to the case, and that it has not been tampered with or contaminated. A technician needs to track evidence for a forensic investigation on a Windows computer by following the proper procedures for collecting, handling, storing, and analyzing the evidence, and documenting every step of the process on a chain of custody form23. A new spam gateway was recently deployed at a small business However; users still occasionally receive spam. The management team is concerned that users will open the messages and potentially infect the network systems. Which of the following is the MOST effective method for dealing with this Issue?',
         'A new spam gateway was recently deployed at a small business. However, users still occasionally receive spam. The management team is concerned that users will open the messages and potentially infect the network systems. Which of the following is the MOST effective method for dealing with this issue?'),
        
        # Fix mixed content in phone issues question
        ('System Indexing Options Device Manager Programs and FeaturesA user is having phone issues after installing a new application that claims to optimize performance. The user downloaded the application directly from the vendor\'s website and is now experiencing high network utilization and is receiving repeated security warnings. Which of the following should the technician perform FIRST to mitigate the issue?',
         'A user is having phone issues after installing a new application that claims to optimize performance. The user downloaded the application directly from the vendor\'s website and is now experiencing high network utilization and is receiving repeated security warnings. Which of the following should the technician perform FIRST to mitigate the issue?'),
        
        # Fix mixed content in malware question
        ('After a security event, a technician removes malware from an affected laptop and disconnects the Question A technician is trying to remove malware from a laptop from the network. Which of the following should the technician do to prevent the operating system from automatically returning to an infected state?',
         'A technician is trying to remove malware from a laptop. Which of the following should the technician do to prevent the operating system from automatically returning to an infected state?'),
        
        # Fix mixed content in Windows RAM question
        ('Question A technician installed Windows 10 on a workstation. The workstation only has 3.5GB of usable RAM, even though the technician installed 8GB. Which of the following is the MOST likely reason this system is not utilizing all the available RAM?',
         'A technician installed Windows 10 on a workstation. The workstation only has 3.5GB of usable RAM, even though the technician installed 8GB. Which of the following is the MOST likely reason this system is not utilizing all the available RAM?'),
        
        # Fix mixed content in sfc command question
        ('The sfc command can be used with different switches, such as /scannow, /verifyonly, /scanfile, or /offbootdir, depending on the situation and the desired action4. The most common switch is /scannow, which scans all the system files and repairs any problems that are found5. The syntax of the sfc command with the /scannow switch is: sfc /scannow The sfc command will then scan and repair the system files, and display the results on the screen. If the sfc command is able to fix the system files, the PC should be able to start the GUI normally after rebooting. If the sfc command is unable to fix the system files, the PC may need further troubleshooting or a clean installation of Windows. References1: CompTIA A+ Certification Exam Core 2 Objectives, page 10 2: CompTIA A+ Core 2 (220-1102) Complete Video Course, Lesson 26 Documentation 3: How to use SFC Scannow to repair Windows system files 4: SFC Command (System File Checker) 5: How to Repair Windows 10 using Command PromptA technician installs specialized software on a workstation. The technician then attempts to run the software. The workstation displays a message indicating the software is not authorized to run. Which of the following should the technician do to most likely resolve the issue?',
         'A technician installs specialized software on a workstation. The technician then attempts to run the software. The workstation displays a message indicating the software is not authorized to run. Which of the following should the technician do to most likely resolve the issue?'),
    ]
    
    for old_text, new_text in fixes:
        if old_text in text:
            text = text.replace(old_text, new_text)
    
    return text

def fix_explanation_text(text):
    """Fix common formatting issues in explanation text"""
    fixes = [
        # Fix incomplete explanations
        ('The technician should escalate the ticket to ensure that the CEO\'s device is returned as soon.',
         'The technician should escalate the ticket to ensure that the CEO\'s device is returned as soon as possible. Escalation ensures that higher-level technicians or management can address the urgent issue promptly.'),
        
        ('The two safety procedures that would best protect the components in the PC are:',
         'The two safety procedures that would best protect the components in the PC are: 1) Disconnecting the computer from the power source to prevent electrical shock, and 2) Utilizing an ESD strap to prevent electrostatic discharge damage to sensitive components.'),
        
        ('Isolating the machine from the network is the best way to identify the source of the attack, because it prevents the malicious traffic from spreading to other devices or reaching the attacker. Isolating the machine can also help preserve the evidence of the attack, such as the malware files, the network connections, the registry entries, or the system logs. By isolating the machine, a technician can safely analyze the machine and determine the source of the attack, such as a phishing email, a compromised.',
         'Isolating the machine from the network is the best way to identify the source of the attack, because it prevents the malicious traffic from spreading to other devices or reaching the attacker. Isolating the machine can also help preserve the evidence of the attack, such as the malware files, the network connections, the registry entries, or the system logs. By isolating the machine, a technician can safely analyze the machine and determine the source of the attack, such as a phishing email, a compromised website, or malicious software.'),
        
        ('EOL (end-of-life) is a term that indicates a vendor no longer supports a product. It means that',
         'EOL (end-of-life) is a term that indicates a vendor no longer supports a product. It means that the vendor will no longer provide updates, patches, or technical support for the product.'),
        
        ('MFA (Multi-Factor Authentication) is a security measure that often uses an SMS or third-party application as a secondary method to access a system. MFA requires the user to provide two or more pieces of evidence to prove their identity, such as something they know (e.g., password), something they have (e.g.,',
         'MFA (Multi-Factor Authentication) is a security measure that often uses an SMS or third-party application as a secondary method to access a system. MFA requires the user to provide two or more pieces of evidence to prove their identity, such as something they know (e.g., password), something they have (e.g., smartphone or token), or something they are (e.g., fingerprint or facial recognition).'),
        
        ('MFA stands for Multi-Factor Authentication, which is a method of verifying a user\'s identity using two or more different factors of authentication. The three factors of authentication are something you know, something you have, and something you are. These factors correspond to different types of information or evidence that only the legitimate user should possess or provide. For example:',
         'MFA stands for Multi-Factor Authentication, which is a method of verifying a user\'s identity using two or more different factors of authentication. The three factors of authentication are something you know (password), something you have (smartphone/token), and something you are (biometric). These factors provide multiple layers of security to prevent unauthorized access.'),
        
        ('Risk analysis is the process of identifying and evaluating the potential threats and impacts of a change on the system, network, or service. It is an essential step before approving a change request, as it helps to',
         'Risk analysis is the process of identifying and evaluating the potential threats and impacts of a change on the system, network, or service. It is an essential step before approving a change request, as it helps to assess potential problems and develop mitigation strategies.'),
        
        ('The most effective method for dealing with spam messages in a small business is to provide user training',
         'The most effective method for dealing with spam messages in a small business is to provide user training. Educating users about identifying and avoiding spam helps prevent them from opening malicious emails that could infect the network.'),
        
        ('A hardware token is a physical device that provides an additional layer of security for software authorization. Some specialized software may require a hardware token to be attached to the workstation in order to run. A hardware token may contain a cryptographic key, a password, or a one-time code that',
         'A hardware token is a physical device that provides an additional layer of security for software authorization. Some specialized software may require a hardware token to be attached to the workstation in order to run. A hardware token may contain a cryptographic key, a password, or a one-time code that validates the user\'s authorization to use the software.'),
        
        ('When a Blue Screen of Death (BSOD) appears on a Windows workstation, it indicates that there is a serious problem with the operating system. The stop code displayed on the BSOD can provide valuable information to help determine the cause of the issue. The stop code is a specific error code that is associated with the BSOD, and it can help identify the root cause of the problem.',
         'When a Blue Screen of Death (BSOD) appears on a Windows workstation, it indicates that there is a serious problem with the operating system. The stop code displayed on the BSOD can provide valuable information to help determine the cause of the issue. The stop code is a specific error code that is associated with the BSOD, and it can help identify the root cause of the problem, such as driver conflicts, hardware failures, or system corruption.'),
        
        ('The technician should add the update site to the client\'s exceptions list to bypass the proxy. This can be done through the client\'s web browser settings, where the proxy settings can be configured.',
         'The technician should add the update site to the client\'s exceptions list to bypass the proxy. This can be done through the client\'s web browser settings, where the proxy settings can be configured. This allows the software update to download without being blocked by the company\'s proxy server.'),
    ]
    
    for old_text, new_text in fixes:
        if old_text in text:
            text = text.replace(old_text, new_text)
    
    return text

def process_file(filename):
    """Process a single quiz file and fix issues"""
    print(f"Processing {filename}...")
    
    with open(filename, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    changes_made = 0
    
    for question in data:
        original_question = question['question']
        original_explanation = question.get('explanation', '')
        
        # Fix question text
        fixed_question = fix_question_text(original_question)
        if fixed_question != original_question:
            question['question'] = fixed_question
            changes_made += 1
        
        # Fix explanation text
        if original_explanation:
            fixed_explanation = fix_explanation_text(original_explanation)
            if fixed_explanation != original_explanation:
                question['explanation'] = fixed_explanation
                changes_made += 1
    
    if changes_made > 0:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"  Fixed {changes_made} issues in {filename}")
    else:
        print(f"  No issues found in {filename}")

def main():
    """Main function to process all quiz files"""
    quiz_files = [
        'public/questions/220-1102/220-1102_test_1.json',
        'public/questions/220-1102/220-1102_test_2.json',
        'public/questions/220-1102/220-1102_test_3.json',
        'public/questions/220-1102/220-1102_test_4.json',
        'public/questions/220-1102/220-1102_test_5.json',
        'public/questions/220-1102/220-1102_test_6.json',
        'public/questions/220-1102/220-1102_test_7.json',
        'public/questions/220-1102/220-1102_test_8.json',
        'public/questions/220-1102/220-1102_test_9.json',
        'public/questions/220-1102/220-1102_test_10.json',
        'public/questions/220-1102/220-1102_test_11.json',
        'public/questions/220-1102/220-1102_test_12.json',
        'public/questions/220-1102/220-1102_test_13.json',
        'public/questions/220-1102/220-1102_test_14.json',
        'public/questions/220-1102/220-1102_test_15.json'
    ]
    
    total_changes = 0
    
    for filename in quiz_files:
        if os.path.exists(filename):
            process_file(filename)
        else:
            print(f"File not found: {filename}")
    
    print("\nAll quiz files processed successfully!")

if __name__ == "__main__":
    main()
