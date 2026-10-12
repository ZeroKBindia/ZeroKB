const cyberSecurityQuestionBank = [
  { question: "What is cyber security?", questionHindi: "Cyber Security क्या है?", options: [{ en: "Protecting systems, networks, and data from digital threats", hi: "सिस्टम, नेटवर्क और डेटा को डिजिटल खतरों से सुरक्षित रखना" }, { en: "Designing a computer desk", hi: "कंप्यूटर डेस्क डिज़ाइन करना" }, { en: "Increasing screen brightness", hi: "स्क्रीन की चमक बढ़ाना" }, { en: "Printing a document", hi: "दस्तावेज़ प्रिंट करना" }], correctAnswer: 0 },
  { question: "What is the goal of information confidentiality?", questionHindi: "Information Confidentiality का लक्ष्य क्या है?", options: [{ en: "Preventing unauthorized disclosure of information", hi: "जानकारी का अनधिकृत खुलासा रोकना" }, { en: "Making every file public", hi: "हर फाइल सार्वजनिक करना" }, { en: "Deleting all backups", hi: "सभी Backup हटाना" }, { en: "Increasing internet speed", hi: "इंटरनेट गति बढ़ाना" }], correctAnswer: 0 },
  { question: "What does data integrity mean?", questionHindi: "Data Integrity का क्या अर्थ है?", options: [{ en: "Maintaining data accuracy and preventing unauthorized changes", hi: "डेटा की शुद्धता बनाए रखना और अनधिकृत बदलाव रोकना" }, { en: "Making data invisible to its owner", hi: "डेटा को उसके मालिक से छिपाना" }, { en: "Printing data twice", hi: "डेटा दो बार प्रिंट करना" }, { en: "Increasing file size", hi: "फाइल का आकार बढ़ाना" }], correctAnswer: 0 },
  { question: "What does availability mean in information security?", questionHindi: "Information Security में Availability का क्या अर्थ है?", options: [{ en: "Authorized users can access information and services when needed", hi: "अधिकृत उपयोगकर्ता जरूरत पड़ने पर जानकारी और सेवाएँ प्राप्त कर सकें" }, { en: "Every user can edit every file", hi: "हर उपयोगकर्ता हर फाइल संपादित कर सके" }, { en: "Data must be printed", hi: "डेटा प्रिंट होना चाहिए" }, { en: "Passwords are published", hi: "पासवर्ड प्रकाशित किए जाएँ" }], correctAnswer: 0 },
  { question: "What is malware?", questionHindi: "Malware क्या होता है?", options: [{ en: "Software designed to harm, disrupt, or misuse systems", hi: "सिस्टम को नुकसान, बाधा या दुरुपयोग पहुँचाने के लिए बनाया गया सॉफ्टवेयर" }, { en: "A legitimate spreadsheet formula", hi: "वैध स्प्रेडशीट सूत्र" }, { en: "A computer monitor", hi: "कंप्यूटर मॉनिटर" }, { en: "A secure backup copy", hi: "सुरक्षित Backup प्रति" }], correctAnswer: 0 },
  { question: "What is a computer virus?", questionHindi: "Computer Virus क्या होता है?", options: [{ en: "Malicious code that can attach to files or programs and spread when run", hi: "हानिकारक कोड जो फाइल या प्रोग्राम से जुड़कर चलने पर फैल सकता है" }, { en: "A hardware cooling fan", hi: "हार्डवेयर कूलिंग फैन" }, { en: "A trusted software update", hi: "विश्वसनीय सॉफ्टवेयर Update" }, { en: "An email folder", hi: "ई-मेल फोल्डर" }], correctAnswer: 0 },
  { question: "What is a computer worm?", questionHindi: "Computer Worm क्या होता है?", options: [{ en: "Malware that can self-replicate and spread across systems or networks", hi: "ऐसा Malware जो स्वयं प्रतिलिपि बनाकर सिस्टम या नेटवर्क में फैल सकता है" }, { en: "A type of firewall rule", hi: "Firewall Rule का प्रकार" }, { en: "A paper backup", hi: "कागज़ी Backup" }, { en: "A password manager", hi: "Password Manager" }], correctAnswer: 0 },
  { question: "What does ransomware typically do?", questionHindi: "Ransomware सामान्यतः क्या करता है?", options: [{ en: "Locks or encrypts data and demands payment", hi: "डेटा लॉक या एन्क्रिप्ट करके भुगतान की माँग करता है" }, { en: "Improves computer security automatically", hi: "कंप्यूटर सुरक्षा अपने-आप बेहतर करता है" }, { en: "Organizes desktop icons", hi: "डेस्कटॉप आइकन व्यवस्थित करता है" }, { en: "Creates a printer queue", hi: "प्रिंटर कतार बनाता है" }], correctAnswer: 0 },
  { question: "What is spyware designed to do?", questionHindi: "Spyware किस काम के लिए बनाया जाता है?", options: [{ en: "Secretly monitor activity or collect information", hi: "गुप्त रूप से गतिविधि देखना या जानकारी एकत्र करना" }, { en: "Back up files with permission", hi: "अनुमति से फाइलों का Backup लेना" }, { en: "Format a legal document", hi: "कानूनी दस्तावेज़ फॉर्मेट करना" }, { en: "Improve the monitor resolution", hi: "मॉनिटर रिज़ॉल्यूशन सुधारना" }], correctAnswer: 0 },
  { question: "What is a Trojan horse in cyber security?", questionHindi: "Cyber Security में Trojan Horse क्या होता है?", options: [{ en: "Malicious software disguised as legitimate or useful software", hi: "वैध या उपयोगी सॉफ्टवेयर के रूप में छिपा हानिकारक सॉफ्टवेयर" }, { en: "A physical security guard", hi: "भौतिक सुरक्षा गार्ड" }, { en: "A secure network cable", hi: "सुरक्षित नेटवर्क केबल" }, { en: "A type of encrypted backup", hi: "एन्क्रिप्टेड Backup का प्रकार" }], correctAnswer: 0 },
  { question: "What is phishing?", questionHindi: "Phishing क्या है?", options: [{ en: "A deceptive attempt to steal sensitive information", hi: "संवेदनशील जानकारी चुराने का धोखाधड़ीपूर्ण प्रयास" }, { en: "A method of safely updating software", hi: "सॉफ्टवेयर सुरक्षित Update करने की विधि" }, { en: "A type of data backup", hi: "Data Backup का प्रकार" }, { en: "A computer display standard", hi: "कंप्यूटर डिस्प्ले मानक" }], correctAnswer: 0 },
  { question: "What is spear phishing?", questionHindi: "Spear Phishing क्या है?", options: [{ en: "A targeted phishing attempt tailored to a particular person or organization", hi: "किसी व्यक्ति या संस्था को लक्ष्य करके बनाया गया विशेष Phishing प्रयास" }, { en: "A public security announcement", hi: "सार्वजनिक सुरक्षा घोषणा" }, { en: "A method of encrypting a disk", hi: "डिस्क एन्क्रिप्ट करने की विधि" }, { en: "A type of licensed antivirus", hi: "लाइसेंस प्राप्त Antivirus का प्रकार" }], correctAnswer: 0 },
  { question: "What is social engineering?", questionHindi: "Social Engineering क्या है?", options: [{ en: "Manipulating people into revealing information or taking unsafe actions", hi: "लोगों को जानकारी बताने या असुरक्षित कदम उठाने के लिए बहकाना" }, { en: "Designing a social media page", hi: "सोशल मीडिया पेज डिज़ाइन करना" }, { en: "Building a secure data center", hi: "सुरक्षित Data Center बनाना" }, { en: "Testing a monitor's color", hi: "मॉनिटर का रंग जाँचना" }], correctAnswer: 0 },
  { question: "What makes a password stronger?", questionHindi: "पासवर्ड को अधिक मजबूत क्या बनाता है?", options: [{ en: "Sufficient length and a unique, hard-to-guess combination", hi: "पर्याप्त लंबाई और अनूठा, अनुमान लगाना कठिन संयोजन" }, { en: "Using 123456 for every account", hi: "हर खाते के लिए 123456 उपयोग करना" }, { en: "Using your public birth date only", hi: "केवल सार्वजनिक जन्मतिथि उपयोग करना" }, { en: "Writing it on a public profile", hi: "इसे सार्वजनिक प्रोफाइल पर लिखना" }], correctAnswer: 0 },
  { question: "Why should different accounts use different passwords?", questionHindi: "अलग-अलग खातों में अलग पासवर्ड क्यों उपयोग करने चाहिए?", options: [{ en: "A breach of one account is less likely to expose the others", hi: "एक खाते का डेटा लीक होने पर दूसरे खाते कम जोखिम में रहते हैं" }, { en: "It makes every account public", hi: "इससे हर खाता सार्वजनिक हो जाता है" }, { en: "It removes the need for updates", hi: "इससे Update की जरूरत खत्म होती है" }, { en: "It makes passwords easier to guess", hi: "इससे पासवर्ड का अनुमान आसान होता है" }], correctAnswer: 0 },
  { question: "What is multi-factor authentication (MFA)?", questionHindi: "Multi-factor Authentication (MFA) क्या है?", options: [{ en: "Using two or more different types of evidence to verify identity", hi: "पहचान सत्यापित करने के लिए दो या अधिक अलग प्रकार के प्रमाण उपयोग करना" }, { en: "Using the same password twice", hi: "एक ही पासवर्ड दो बार उपयोग करना" }, { en: "Sharing a password with two people", hi: "दो लोगों से पासवर्ड साझा करना" }, { en: "Logging in from two browsers without verification", hi: "बिना सत्यापन दो ब्राउज़र से लॉगिन करना" }], correctAnswer: 0 },
  { question: "Which is an example of something you have for authentication?", questionHindi: "Authentication में आपके पास मौजूद वस्तु का उदाहरण कौन-सा है?", options: [{ en: "A registered security token or phone", hi: "पंजीकृत Security Token या फोन" }, { en: "A memorized passphrase", hi: "याद रखा गया Passphrase" }, { en: "A fingerprint", hi: "अंगुली का निशान" }, { en: "A favorite color", hi: "पसंदीदा रंग" }], correctAnswer: 0 },
  { question: "Why should an OTP not be shared?", questionHindi: "OTP साझा क्यों नहीं करना चाहिए?", options: [{ en: "It may allow another person to approve an authentication or transaction", hi: "इससे दूसरा व्यक्ति प्रमाणीकरण या लेन-देन मंजूर कर सकता है" }, { en: "It increases screen brightness", hi: "इससे स्क्रीन की चमक बढ़ती है" }, { en: "It deletes all backups", hi: "इससे सभी Backup हट जाते हैं" }, { en: "It is always a public code", hi: "यह हमेशा सार्वजनिक कोड होता है" }], correctAnswer: 0 },
  { question: "What is encryption?", questionHindi: "Encryption क्या है?", options: [{ en: "Transforming information so it is unreadable without the appropriate key", hi: "जानकारी को ऐसा बदलना कि उचित Key के बिना पढ़ना कठिन हो" }, { en: "Deleting every file permanently", hi: "हर फाइल स्थायी रूप से हटाना" }, { en: "Printing a password", hi: "पासवर्ड प्रिंट करना" }, { en: "Sorting a folder", hi: "फोल्डर क्रमबद्ध करना" }], correctAnswer: 0 },
  { question: "What is decryption?", questionHindi: "Decryption क्या है?", options: [{ en: "Converting encrypted data back into readable form using the appropriate key", hi: "उचित Key से एन्क्रिप्टेड डेटा को फिर पढ़ने योग्य रूप में बदलना" }, { en: "Copying a file to a printer", hi: "फाइल प्रिंटर पर कॉपी करना" }, { en: "Creating a weak password", hi: "कमजोर पासवर्ड बनाना" }, { en: "Blocking a website", hi: "वेबसाइट रोकना" }], correctAnswer: 0 },
  { question: "What does a firewall help do?", questionHindi: "Firewall किस काम में मदद करता है?", options: [{ en: "Control network traffic according to security rules", hi: "सुरक्षा नियमों के अनुसार Network Traffic नियंत्रित करना" }, { en: "Repair a broken screen", hi: "टूटी स्क्रीन ठीक करना" }, { en: "Guarantee every email is safe", hi: "हर ई-मेल सुरक्षित होने की गारंटी" }, { en: "Increase a battery's capacity", hi: "बैटरी क्षमता बढ़ाना" }], correctAnswer: 0 },
  { question: "What is antivirus software used for?", questionHindi: "Antivirus Software का उपयोग किसलिए किया जाता है?", options: [{ en: "Detecting, blocking, or helping remove malicious software", hi: "हानिकारक सॉफ्टवेयर पहचानने, रोकने या हटाने में मदद करना" }, { en: "Creating financial accounts", hi: "वित्तीय खाते बनाना" }, { en: "Replacing all security practices", hi: "सभी सुरक्षा अभ्यासों का स्थान लेना" }, { en: "Repairing physical keyboards", hi: "भौतिक कीबोर्ड ठीक करना" }], correctAnswer: 0 },
  { question: "Why should operating systems and applications be updated?", questionHindi: "Operating System और Applications को Update क्यों करना चाहिए?", options: [{ en: "Updates can fix security vulnerabilities and bugs", hi: "Update सुरक्षा कमजोरियाँ और Bugs ठीक कर सकते हैं" }, { en: "Updates make passwords unnecessary", hi: "Update से पासवर्ड अनावश्यक हो जाते हैं" }, { en: "Updates guarantee no future attack", hi: "Update भविष्य के हमले न होने की गारंटी देते हैं" }, { en: "Updates publish private files", hi: "Update निजी फाइलें प्रकाशित करते हैं" }], correctAnswer: 0 },
  { question: "What is a security patch?", questionHindi: "Security Patch क्या होता है?", options: [{ en: "An update that fixes a security weakness", hi: "सुरक्षा कमजोरी ठीक करने वाला Update" }, { en: "A sticker for a computer case", hi: "कंप्यूटर केस का Sticker" }, { en: "A password written on paper", hi: "कागज़ पर लिखा पासवर्ड" }, { en: "A type of email attachment", hi: "ई-मेल अटैचमेंट का प्रकार" }], correctAnswer: 0 },
  { question: "What is a security vulnerability?", questionHindi: "Security Vulnerability क्या होती है?", options: [{ en: "A weakness that could be exploited to affect a system", hi: "ऐसी कमजोरी जिसका उपयोग करके सिस्टम को प्रभावित किया जा सकता है" }, { en: "A strong backup", hi: "मजबूत Backup" }, { en: "A verified user account", hi: "सत्यापित उपयोगकर्ता खाता" }, { en: "A computer's wallpaper", hi: "कंप्यूटर का वॉलपेपर" }], correctAnswer: 0 },
  { question: "What is a data backup?", questionHindi: "Data Backup क्या होता है?", options: [{ en: "A separate copy of data that can help restore it after loss", hi: "डेटा की अलग प्रति जो खोने पर उसे वापस पाने में मदद करे" }, { en: "A second password shared online", hi: "ऑनलाइन साझा किया गया दूसरा पासवर्ड" }, { en: "A public copy of private data", hi: "निजी डेटा की सार्वजनिक प्रति" }, { en: "A temporary screen image only", hi: "केवल अस्थायी स्क्रीन चित्र" }], correctAnswer: 0 },
  { question: "Why should important backups be tested?", questionHindi: "महत्वपूर्ण Backup का परीक्षण क्यों करना चाहिए?", options: [{ en: "To check that data can actually be restored", hi: "यह जाँचने के लिए कि डेटा वास्तव में Restore हो सकता है" }, { en: "To publish the backup", hi: "Backup प्रकाशित करने के लिए" }, { en: "To remove all security controls", hi: "सभी सुरक्षा नियंत्रण हटाने के लिए" }, { en: "To make the computer slower", hi: "कंप्यूटर धीमा करने के लिए" }], correctAnswer: 0 },
  { question: "What is the 3-2-1 backup rule commonly intended to encourage?", questionHindi: "3-2-1 Backup Rule सामान्यतः किस बात को बढ़ावा देता है?", options: [{ en: "Keeping multiple copies on different media, with one copy off-site", hi: "अलग माध्यमों पर कई प्रतियाँ रखना और एक प्रति अलग स्थान पर रखना" }, { en: "Using three passwords on one website", hi: "एक वेबसाइट पर तीन पासवर्ड उपयोग करना" }, { en: "Deleting backups every day", hi: "हर दिन Backup हटाना" }, { en: "Keeping all copies on one device", hi: "सभी प्रतियाँ एक डिवाइस पर रखना" }], correctAnswer: 0 },
  { question: "What is the safest action when you receive an unexpected link asking for account details?", questionHindi: "खाते का विवरण माँगने वाला अनपेक्षित लिंक मिले तो सबसे सुरक्षित कदम क्या है?", options: [{ en: "Do not use the link; verify through the official site or app", hi: "लिंक उपयोग न करें; आधिकारिक वेबसाइट या ऐप से सत्यापित करें" }, { en: "Enter details quickly", hi: "जल्दी से विवरण दर्ज करें" }, { en: "Forward it to colleagues", hi: "इसे सहकर्मियों को Forward करें" }, { en: "Disable security alerts", hi: "सुरक्षा अलर्ट बंद करें" }], correctAnswer: 0 },
  { question: "What is a spoofed email address?", questionHindi: "Spoofed Email Address क्या होता है?", options: [{ en: "An address made to appear as if it belongs to someone else", hi: "ऐसा पता जो किसी और का होने जैसा दिखाया गया हो" }, { en: "A correctly verified certificate", hi: "सही तरह सत्यापित प्रमाणपत्र" }, { en: "A secure local backup", hi: "सुरक्षित स्थानीय Backup" }, { en: "A spreadsheet file name", hi: "स्प्रेडशीट फाइल नाम" }], correctAnswer: 0 },
  { question: "What is identity theft?", questionHindi: "Identity Theft क्या है?", options: [{ en: "Using another person's personal information without authorization", hi: "बिना अनुमति दूसरे व्यक्ति की निजी जानकारी का उपयोग करना" }, { en: "Updating your own contact details", hi: "अपने संपर्क विवरण अपडेट करना" }, { en: "Changing a computer wallpaper", hi: "कंप्यूटर वॉलपेपर बदलना" }, { en: "Backing up your files", hi: "अपनी फाइलों का Backup लेना" }], correctAnswer: 0 },
  { question: "What is a data breach?", questionHindi: "Data Breach क्या होता है?", options: [{ en: "Unauthorized access to or disclosure of protected information", hi: "सुरक्षित जानकारी तक अनधिकृत पहुँच या उसका खुलासा" }, { en: "A successful system update", hi: "सफल सिस्टम Update" }, { en: "A routine file backup", hi: "नियमित फाइल Backup" }, { en: "A keyboard typing error", hi: "कीबोर्ड टाइपिंग गलती" }], correctAnswer: 0 },
  { question: "What is a brute-force password attack?", questionHindi: "Brute-force Password Attack क्या होता है?", options: [{ en: "Repeatedly trying many possible passwords or combinations", hi: "बार-बार कई संभावित पासवर्ड या संयोजन आज़माना" }, { en: "Encrypting a backup with permission", hi: "अनुमति से Backup एन्क्रिप्ट करना" }, { en: "Updating an application", hi: "Application Update करना" }, { en: "Checking a website's spelling", hi: "वेबसाइट की वर्तनी जाँचना" }], correctAnswer: 0 },
  { question: "What is a password manager used for?", questionHindi: "Password Manager का उपयोग किसलिए होता है?", options: [{ en: "Securely storing and helping generate unique passwords", hi: "अनूठे पासवर्ड सुरक्षित रखना और बनाने में मदद करना" }, { en: "Publishing passwords to contacts", hi: "Contacts को पासवर्ड प्रकाशित करना" }, { en: "Removing two-factor authentication", hi: "Two-factor Authentication हटाना" }, { en: "Repairing network cables", hi: "Network Cable ठीक करना" }], correctAnswer: 0 },
  { question: "Why should you lock your device when leaving it unattended?", questionHindi: "डिवाइस को बिना देखरेख छोड़े समय Lock क्यों करना चाहिए?", options: [{ en: "To reduce unauthorized access", hi: "अनधिकृत पहुँच का जोखिम घटाने के लिए" }, { en: "To delete the operating system", hi: "ऑपरेटिंग सिस्टम हटाने के लिए" }, { en: "To disable all backups", hi: "सभी Backup बंद करने के लिए" }, { en: "To share files publicly", hi: "फाइलें सार्वजनिक रूप से साझा करने के लिए" }], correctAnswer: 0 },
  { question: "What is shoulder surfing?", questionHindi: "Shoulder Surfing क्या है?", options: [{ en: "Watching someone enter sensitive information", hi: "किसी को संवेदनशील जानकारी दर्ज करते हुए देखना" }, { en: "Backing up a mobile phone", hi: "मोबाइल फोन का Backup लेना" }, { en: "Scanning a device for viruses", hi: "डिवाइस में वायरस स्कैन करना" }, { en: "Updating a firewall", hi: "Firewall Update करना" }], correctAnswer: 0 },
  { question: "What is a secure practice when using public Wi-Fi?", questionHindi: "Public Wi-Fi उपयोग करते समय सुरक्षित अभ्यास क्या है?", options: [{ en: "Avoid sensitive activity unless using trusted protections and verified sites", hi: "विश्वसनीय सुरक्षा और सत्यापित साइट के बिना संवेदनशील काम से बचें" }, { en: "Share banking credentials", hi: "बैंकिंग Credentials साझा करें" }, { en: "Turn off device updates permanently", hi: "डिवाइस Update स्थायी रूप से बंद करें" }, { en: "Accept every certificate warning", hi: "हर Certificate Warning स्वीकार करें" }], correctAnswer: 0 },
  { question: "What does HTTPS help protect in transit?", questionHindi: "HTTPS रास्ते में किसकी सुरक्षा में मदद करता है?", options: [{ en: "Data exchanged between a browser and a website", hi: "ब्राउज़र और वेबसाइट के बीच आदान-प्रदान किया गया डेटा" }, { en: "Every file stored on a computer", hi: "कंप्यूटर में रखी हर फाइल" }, { en: "A user's physical device from theft", hi: "उपयोगकर्ता का भौतिक डिवाइस चोरी से" }, { en: "All messages from being fraudulent", hi: "सभी संदेशों को धोखाधड़ी से" }], correctAnswer: 0 },
  { question: "What is a digital certificate commonly used to help verify?", questionHindi: "Digital Certificate सामान्यतः किसका सत्यापन करने में मदद करता है?", options: [{ en: "The identity of a website or entity and its public key association", hi: "वेबसाइट या संस्था की पहचान और उससे जुड़ी Public Key" }, { en: "A user's bank balance", hi: "उपयोगकर्ता की बैंक राशि" }, { en: "A keyboard's serial number", hi: "कीबोर्ड का Serial Number" }, { en: "A file's word count", hi: "फाइल का Word Count" }], correctAnswer: 0 },
  { question: "What is a digital signature used to help provide?", questionHindi: "Digital Signature किस बात को प्रदान करने में मदद करता है?", options: [{ en: "Evidence of origin and integrity for signed digital data", hi: "हस्ताक्षरित डिजिटल डेटा के स्रोत और अखंडता का प्रमाण" }, { en: "A guarantee that a computer cannot fail", hi: "कंप्यूटर खराब न होने की गारंटी" }, { en: "A way to hide every file name", hi: "हर फाइल नाम छिपाने का तरीका" }, { en: "Free Internet access", hi: "मुफ्त इंटरनेट पहुँच" }], correctAnswer: 0 },
  { question: "What is a firewall rule?", questionHindi: "Firewall Rule क्या होता है?", options: [{ en: "A condition that allows or blocks specified network traffic", hi: "निर्दिष्ट Network Traffic को अनुमति या रोकने वाली शर्त" }, { en: "A password hint", hi: "पासवर्ड संकेत" }, { en: "A spreadsheet formula", hi: "स्प्रेडशीट सूत्र" }, { en: "A printer cartridge setting", hi: "प्रिंटर कार्ट्रिज सेटिंग" }], correctAnswer: 0 },
  { question: "What is the principle of least privilege?", questionHindi: "Least Privilege का सिद्धांत क्या है?", options: [{ en: "Giving users only the access needed for their tasks", hi: "उपयोगकर्ताओं को उनके काम के लिए जरूरी पहुँच ही देना" }, { en: "Giving every user administrator access", hi: "हर उपयोगकर्ता को Administrator पहुँच देना" }, { en: "Sharing one account with everyone", hi: "सबके साथ एक खाता साझा करना" }, { en: "Removing all access controls", hi: "सभी Access Control हटाना" }], correctAnswer: 0 },
  { question: "Why use a standard user account for everyday work?", questionHindi: "रोज़मर्रा के काम के लिए Standard User Account क्यों उपयोग करें?", options: [{ en: "It can limit the impact of actions that require elevated privileges", hi: "यह अधिक अधिकार माँगने वाली क्रियाओं के प्रभाव को सीमित कर सकता है" }, { en: "It guarantees no malware can run", hi: "यह Malware चलने की गारंटी से रोकता है" }, { en: "It disables all updates", hi: "यह सभी Update बंद करता है" }, { en: "It publishes administrator credentials", hi: "यह Administrator Credentials प्रकाशित करता है" }], correctAnswer: 0 },
  { question: "What is a secure screen lock useful for?", questionHindi: "Secure Screen Lock किसलिए उपयोगी है?", options: [{ en: "Preventing casual access to an unattended device", hi: "बिना देखरेख डिवाइस तक सामान्य अनधिकृत पहुँच रोकना" }, { en: "Backing up a bank", hi: "बैंक का Backup लेना" }, { en: "Removing all malware", hi: "सभी Malware हटाना" }, { en: "Making public Wi-Fi private", hi: "Public Wi-Fi को निजी बनाना" }], correctAnswer: 0 },
  { question: "What should you do before installing software?", questionHindi: "Software Install करने से पहले क्या करना चाहिए?", options: [{ en: "Verify its source, publisher, and required permissions", hi: "उसका स्रोत, Publisher और आवश्यक Permissions जाँचें" }, { en: "Disable antivirus permanently", hi: "Antivirus स्थायी रूप से बंद करें" }, { en: "Use any unknown download link", hi: "किसी भी अज्ञात Download Link का उपयोग करें" }, { en: "Share administrator password in a forum", hi: "Forum में Administrator Password साझा करें" }], correctAnswer: 0 },
  { question: "What is a potentially unwanted application (PUA)?", questionHindi: "Potentially Unwanted Application (PUA) क्या होती है?", options: [{ en: "Software that may be unwanted or risky despite being installed as an application", hi: "ऐसा सॉफ्टवेयर जो Application की तरह इंस्टॉल हो पर अवांछित या जोखिमपूर्ण हो सकता है" }, { en: "A required operating system file in every case", hi: "हर स्थिति में आवश्यक Operating System File" }, { en: "A verified system backup", hi: "सत्यापित System Backup" }, { en: "A hardware keyboard", hi: "हार्डवेयर कीबोर्ड" }], correctAnswer: 0 },
  { question: "What is a botnet?", questionHindi: "Botnet क्या होता है?", options: [{ en: "A group of compromised devices controlled together", hi: "एक साथ नियंत्रित किए जाने वाले संक्रमित डिवाइसों का समूह" }, { en: "A trusted password vault", hi: "विश्वसनीय Password Vault" }, { en: "A secure email folder", hi: "सुरक्षित ई-मेल फोल्डर" }, { en: "A type of backup cable", hi: "Backup Cable का प्रकार" }], correctAnswer: 0 },
  { question: "What is a denial-of-service attack intended to do?", questionHindi: "Denial-of-Service Attack का उद्देश्य क्या होता है?", options: [{ en: "Make a service unavailable by overwhelming or disrupting it", hi: "सेवा पर अत्यधिक भार या बाधा डालकर उसे अनुपलब्ध करना" }, { en: "Improve a website's accessibility", hi: "वेबसाइट की पहुँच बेहतर करना" }, { en: "Update a device securely", hi: "डिवाइस सुरक्षित रूप से Update करना" }, { en: "Back up a network", hi: "नेटवर्क का Backup लेना" }], correctAnswer: 0 },
  { question: "What is a zero-day vulnerability?", questionHindi: "Zero-day Vulnerability क्या होती है?", options: [{ en: "A vulnerability exploited before an effective fix is broadly available", hi: "ऐसी कमजोरी जिसका प्रभावी सुधार व्यापक रूप से उपलब्ध होने से पहले उपयोग हो" }, { en: "A vulnerability that lasts exactly one day", hi: "ठीक एक दिन रहने वाली कमजोरी" }, { en: "A harmless spelling issue", hi: "हानिरहित वर्तनी समस्या" }, { en: "A backup scheduled for midnight", hi: "आधी रात के लिए निर्धारित Backup" }], correctAnswer: 0 },
  { question: "What is responsible vulnerability disclosure?", questionHindi: "Responsible Vulnerability Disclosure क्या है?", options: [{ en: "Reporting a weakness to the responsible owner through an appropriate channel", hi: "उचित माध्यम से कमजोरी की सूचना जिम्मेदार मालिक को देना" }, { en: "Publishing exploit details to harm users", hi: "उपयोगकर्ताओं को नुकसान पहुँचाने के लिए Exploit विवरण प्रकाशित करना" }, { en: "Deleting the affected service immediately", hi: "प्रभावित सेवा तुरंत हटाना" }, { en: "Sharing credentials publicly", hi: "Credentials सार्वजनिक साझा करना" }], correctAnswer: 0 }
];

function replaceQuestion(index, question, questionHindi, options) {
  cyberSecurityQuestionBank[index] = { question, questionHindi, options, correctAnswer: 0 };
}

replaceQuestion(16, "What does two-factor authentication require?", "Two-Factor Authentication में क्या आवश्यक होता है?", [
  { en: "Two different verification factors, such as a password and a registered device", hi: "दो अलग सत्यापन कारक, जैसे पासवर्ड और पंजीकृत डिवाइस" },
  { en: "The same password entered twice", hi: "एक ही पासवर्ड दो बार दर्ज करना" },
  { en: "Two usernames with no verification", hi: "बिना सत्यापन दो Username" },
  { en: "Sharing one password with two people", hi: "दो लोगों से एक पासवर्ड साझा करना" }
]);
replaceQuestion(27, "After ransomware is contained and the device is cleaned, how can a user recover affected files?", "Ransomware को रोकने और डिवाइस साफ करने के बाद प्रभावित फाइलें कैसे वापस पाई जा सकती हैं?", [
  { en: "Restore from a recent, verified backup that was not affected", hi: "हाल के सत्यापित Backup से Restore करें जो प्रभावित न हुआ हो" },
  { en: "Open the suspicious attachment again", hi: "संदिग्ध Attachment दोबारा खोलें" },
  { en: "Disable all security updates", hi: "सभी Security Update बंद करें" },
  { en: "Share the account password publicly", hi: "खाते का पासवर्ड सार्वजनिक साझा करें" }
]);
replaceQuestion(29, "What should you do with an unexpected email attachment from an unknown sender?", "अनजान प्रेषक से आए अनपेक्षित ई-मेल Attachment के साथ क्या करना चाहिए?", [
  { en: "Do not open it; verify the sender through a trusted channel", hi: "इसे न खोलें; विश्वसनीय माध्यम से प्रेषक की पुष्टि करें" },
  { en: "Open it to see whether it looks familiar", hi: "यह परिचित दिखता है या नहीं, यह देखने के लिए खोलें" },
  { en: "Forward it to all contacts", hi: "इसे सभी संपर्कों को Forward करें" },
  { en: "Disable antivirus before opening it", hi: "खोलने से पहले Antivirus बंद करें" }
]);
replaceQuestion(38, "How can you reduce the risk of using a fake website?", "Fake Website उपयोग करने का जोखिम कैसे घटाया जा सकता है?", [
  { en: "Check the exact domain and reach the service through a trusted source", hi: "सटीक Domain जाँचें और विश्वसनीय स्रोत से सेवा खोलें" },
  { en: "Trust any page that copies a familiar logo", hi: "परिचित Logo की नकल करने वाले हर पेज पर भरोसा करें" },
  { en: "Enter credentials before checking the address", hi: "पता जाँचे बिना Credentials दर्ज करें" },
  { en: "Ignore browser security warnings", hi: "Browser Security Warning अनदेखी करें" }
]);
replaceQuestion(39, "What is smishing?", "Smishing क्या है?", [
  { en: "A phishing attempt delivered through SMS or text messages", hi: "SMS या Text Message से किया गया Phishing प्रयास" },
  { en: "A secure method of file backup", hi: "फाइल Backup की सुरक्षित विधि" },
  { en: "A firewall for mobile devices", hi: "मोबाइल डिवाइस के लिए Firewall" },
  { en: "A type of encrypted password vault", hi: "Encrypted Password Vault का प्रकार" }
]);
replaceQuestion(40, "What is vishing?", "Vishing क्या है?", [
  { en: "A voice-call scam that tries to obtain information or prompt an unsafe action", hi: "जानकारी पाने या असुरक्षित कदम करवाने की कोशिश करने वाला Voice Call Scam" },
  { en: "A method for securely updating software", hi: "सॉफ्टवेयर सुरक्षित Update करने की विधि" },
  { en: "A backup stored on a second drive", hi: "दूसरी Drive पर रखा Backup" },
  { en: "A browser privacy setting", hi: "Browser Privacy Setting" }
]);
replaceQuestion(41, "Before granting an app access to contacts or location, what should you do?", "किसी App को Contacts या Location की अनुमति देने से पहले क्या करना चाहिए?", [
  { en: "Check whether the permission is necessary for the app's purpose", hi: "जाँचें कि Permission App के काम के लिए आवश्यक है या नहीं" },
  { en: "Grant every permission automatically", hi: "हर Permission अपने-आप दे दें" },
  { en: "Share the permission request publicly", hi: "Permission Request सार्वजनिक साझा करें" },
  { en: "Disable the device's screen lock", hi: "डिवाइस का Screen Lock बंद करें" }
]);
replaceQuestion(42, "A stranger sends a friend request and asks for personal details. What is a safer response?", "कोई अनजान व्यक्ति Friend Request भेजकर निजी जानकारी माँगे, तो सुरक्षित प्रतिक्रिया क्या है?", [
  { en: "Do not share the information; verify the account and review privacy settings", hi: "जानकारी साझा न करें; Account की पुष्टि करें और Privacy Settings जाँचें" },
  { en: "Share your location and phone number immediately", hi: "तुरंत अपना Location और Phone Number साझा करें" },
  { en: "Send a photo of an identity document", hi: "पहचान दस्तावेज़ की फोटो भेजें" },
  { en: "Reuse your account password in the chat", hi: "Chat में Account Password दोबारा उपयोग करें" }
]);
replaceQuestion(43, "Which action improves the security of a smartphone that may be lost or stolen?", "खो या चोरी हो सकने वाले Smartphone की सुरक्षा कौन-सा कदम बेहतर करता है?", [
  { en: "Use a screen lock and enable the device's find or remote-lock feature", hi: "Screen Lock लगाएँ और Device का Find या Remote Lock Feature चालू रखें" },
  { en: "Disable the screen lock for faster access", hi: "तेज़ पहुँच के लिए Screen Lock बंद करें" },
  { en: "Store banking passwords in an unprotected note", hi: "Banking Password बिना सुरक्षा वाले Note में रखें" },
  { en: "Allow unknown apps to install automatically", hi: "Unknown App को अपने-आप Install होने दें" }
]);
replaceQuestion(45, "What is adware?", "Adware क्या होता है?", [
  { en: "Software that displays unwanted advertisements and may track activity", hi: "अनचाहे विज्ञापन दिखाने वाला और गतिविधि Track कर सकने वाला Software" },
  { en: "A tool that verifies a backup restore", hi: "Backup Restore सत्यापित करने वाला Tool" },
  { en: "A secure password method", hi: "सुरक्षित Password विधि" },
  { en: "A network cable standard", hi: "Network Cable Standard" }
]);
replaceQuestion(46, "What is a safe practice when using a USB drive from an unfamiliar source?", "अपरिचित स्रोत की USB Drive उपयोग करते समय सुरक्षित तरीका क्या है?", [
  { en: "Avoid using it unless necessary, and scan it with updated security software", hi: "आवश्यक न हो तो उपयोग न करें; Updated Security Software से Scan करें" },
  { en: "Run every file automatically", hi: "हर File अपने-आप Run करें" },
  { en: "Disable device protection before connecting it", hi: "Connect करने से पहले Device Protection बंद करें" },
  { en: "Copy its files to a shared public folder", hi: "इसकी Files Shared Public Folder में Copy करें" }
]);
replaceQuestion(48, "What is a digital footprint?", "Digital Footprint क्या होता है?", [
  { en: "The trail of information and activity a person leaves online", hi: "किसी व्यक्ति द्वारा Online छोड़ी गई जानकारी और गतिविधि का निशान" },
  { en: "A backup stored on paper", hi: "कागज़ पर रखा Backup" },
  { en: "A device's physical serial number only", hi: "केवल डिवाइस का भौतिक Serial Number" },
  { en: "A firewall setting", hi: "Firewall Setting" }
]);
replaceQuestion(47, "What is cybercrime?", "Cybercrime क्या है?", [
  { en: "Illegal activity carried out using or targeting computers and digital networks", hi: "कंप्यूटर और डिजिटल नेटवर्क का उपयोग करके या उन्हें लक्ष्य बनाकर की गई गैरकानूनी गतिविधि" },
  { en: "A routine software update", hi: "नियमित Software Update" },
  { en: "A verified backup procedure", hi: "सत्यापित Backup प्रक्रिया" },
  { en: "A privacy setting on a social profile", hi: "Social Profile की Privacy Setting" }
]);
replaceQuestion(49, "Which set of actions best represents good cyber hygiene?", "कौन-सा कदमों का समूह अच्छी Cyber Hygiene दर्शाता है?", [
  { en: "Update software, use unique passwords, enable MFA, and keep tested backups", hi: "Software Update करें, अलग Password रखें, MFA चालू करें और जाँचे हुए Backup रखें" },
  { en: "Reuse one password and ignore updates", hi: "एक Password दोहराएँ और Updates अनदेखी करें" },
  { en: "Open unknown links and disable security tools", hi: "अनजान Link खोलें और Security Tool बंद करें" },
  { en: "Share OTPs to avoid account delays", hi: "Account में देरी से बचने के लिए OTP साझा करें" }
]);

const difficulties = [
  "Easy", "Easy", "Moderate", "Easy", "Easy", "Moderate", "Moderate", "Easy", "Moderate", "Moderate",
  "Easy", "Hard", "Moderate", "Easy", "Moderate", "Hard", "Moderate", "Easy", "Moderate", "Hard",
  "Easy", "Easy", "Moderate", "Moderate", "Hard", "Easy", "Moderate", "Hard", "Moderate", "Moderate",
  "Easy", "Moderate", "Hard", "Moderate", "Easy", "Moderate", "Hard", "Moderate", "Moderate", "Hard",
  "Easy", "Moderate", "Moderate", "Easy", "Moderate", "Hard", "Moderate", "Hard", "Moderate", "Hard"
];

const explanations = [
  "Cyber security protects systems, networks, and information from digital threats and misuse.",
  "Confidentiality limits information access to authorized people or systems.",
  "Integrity helps keep data accurate and prevents unauthorized changes.",
  "Availability means authorized users can access services and information when needed.",
  "Malware is a broad term for software intended to harm, disrupt, or misuse a system.",
  "A virus attaches to a file or program and may spread when the infected host is run.",
  "A worm can replicate and spread between systems without attaching to a host file.",
  "Ransomware can encrypt or lock files and demand payment to restore access.",
  "Spyware secretly monitors activity or collects information.",
  "A Trojan disguises malicious behavior as software that appears useful or legitimate.",
  "Phishing impersonates a trusted source to trick people into revealing sensitive information.",
  "Spear phishing is tailored to a particular person or organization.",
  "Social engineering manipulates people into disclosing information or taking unsafe actions.",
  "Long, unique, hard-to-guess passwords are safer than common or reused ones.",
  "Unique passwords reduce the chance that one exposed account compromises other accounts.",
  "MFA uses more than one type of evidence to verify identity.",
  "Two-factor authentication uses two different factors, rather than repeating one factor.",
  "An OTP may authorize an authentication step, so it must not be shared.",
  "Encryption transforms information so it cannot be read without the appropriate key.",
  "Decryption uses the appropriate key to return encrypted information to readable form.",
  "A firewall applies security rules to control network traffic.",
  "Antivirus tools help detect, block, or remove malicious software.",
  "Updates often fix known flaws and improve software reliability and security.",
  "A security patch is an update that addresses a security weakness.",
  "A vulnerability is a weakness that could be exploited to affect a system.",
  "A backup is a separate copy that can help restore data after loss or damage.",
  "Testing a backup confirms that the recovery process can actually work.",
  "After containment and cleanup, restore affected files from a verified, unaffected backup.",
  "Do not follow unexpected credential links; verify the request through an official channel.",
  "Unexpected attachments can carry malware; verify the sender before opening them.",
  "Identity theft uses another person's identifying information without authorization.",
  "A data breach involves unauthorized access to or disclosure of protected information.",
  "Brute-force attacks repeatedly try possible password combinations.",
  "A password manager helps create and securely store unique passwords.",
  "Locking an unattended device helps prevent unauthorized access.",
  "Shoulder surfing is observing someone enter private information.",
  "Public networks can expose traffic or devices; avoid sensitive activity unless protections and destinations are verified.",
  "HTTPS encrypts data exchanged between a browser and a website, but does not prove that the site is trustworthy.",
  "Check the exact domain and use trusted routes; a copied logo alone does not establish legitimacy.",
  "Smishing is phishing delivered through SMS or other text messaging.",
  "Vishing uses voice calls to trick people into revealing data or taking unsafe actions.",
  "Apps should receive only permissions needed for their stated function.",
  "Verify unfamiliar accounts and limit personal information through privacy settings.",
  "A screen lock and remote-find feature can help protect a lost smartphone and its data.",
  "Check software sources and publisher details before installation; avoid untrusted downloads.",
  "Adware displays unwanted advertisements and may also monitor user activity.",
  "Unknown USB drives may carry malware; avoid them or scan them with updated security tools.",
  "Cybercrime is illegal activity carried out using or targeting computer systems or digital networks.",
  "A digital footprint is the trail of activity and information a person leaves online.",
  "Cyber hygiene combines routine protections such as updates, unique passwords, MFA, and tested backups."
];

const answerPositions = [3, 1, 1, 0, 3, 1, 2, 0, 1, 1, 0, 3, 2, 1, 3, 3, 0, 2, 1, 2, 0, 2, 2, 0, 2, 1, 1, 3, 2, 2, 0, 3, 1, 0, 2, 3, 1, 0, 2, 0, 3, 1, 3, 1, 3, 0, 2, 0, 0, 3];

window.cyberSecurityQuestions = cyberSecurityQuestionBank.map(function (item, index) {
  const options = item.options.slice();
  const correctOption = options.splice(item.correctAnswer, 1)[0];
  const answerPosition = answerPositions[index];
  options.splice(answerPosition, 0, correctOption);
  return Object.assign({}, item, {
    options: options,
    correctAnswer: answerPosition,
    difficulty: difficulties[index],
    explanation: explanations[index]
  });
});