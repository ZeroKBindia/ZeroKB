const internetEmailQuestionBank = [
  { question: "What is the Internet?", questionHindi: "इंटरनेट क्या है?", options: [{ en: "A global network of interconnected networks", hi: "आपस में जुड़े नेटवर्कों का वैश्विक नेटवर्क" }, { en: "A single word-processing file", hi: "एक वर्ड प्रोसेसिंग फाइल" }, { en: "A computer keyboard", hi: "कंप्यूटर कीबोर्ड" }, { en: "A local printer only", hi: "केवल स्थानीय प्रिंटर" }], correctAnswer: 0 },
  { question: "What is a web browser used for?", questionHindi: "वेब ब्राउज़र का उपयोग किसलिए होता है?", options: [{ en: "Viewing and interacting with web pages", hi: "वेब पेज देखना और उनसे काम करना" }, { en: "Increasing RAM", hi: "RAM बढ़ाना" }, { en: "Printing banknotes", hi: "बैंक नोट प्रिंट करना" }, { en: "Formatting a hard disk only", hi: "केवल हार्ड डिस्क फॉर्मेट करना" }], correctAnswer: 0 },
  { question: "Which of these is a web browser?", questionHindi: "इनमें से कौन-सा वेब ब्राउज़र है?", options: [{ en: "Mozilla Firefox", hi: "मोज़िला फ़ायरफ़ॉक्स" }, { en: "LibreOffice Calc", hi: "लिब्रेऑफिस कैल्क" }, { en: "BIOS Setup", hi: "BIOS सेटअप" }, { en: "Notepad", hi: "नोटपैड" }], correctAnswer: 0 },
  { question: "What is a search engine used for?", questionHindi: "Search Engine का उपयोग किसलिए होता है?", options: [{ en: "Finding information and resources on the web", hi: "वेब पर जानकारी और संसाधन ढूँढना" }, { en: "Creating a computer account", hi: "कंप्यूटर खाता बनाना" }, { en: "Sending power to a router", hi: "राउटर को बिजली देना" }, { en: "Editing a local image only", hi: "केवल स्थानीय चित्र संपादित करना" }], correctAnswer: 0 },
  { question: "What does URL stand for?", questionHindi: "URL का पूरा नाम क्या है?", options: [{ en: "Uniform Resource Locator", hi: "यूनिफॉर्म रिसोर्स लोकेटर" }, { en: "Universal Record Link", hi: "यूनिवर्सल रिकॉर्ड लिंक" }, { en: "User Routing List", hi: "यूज़र रूटिंग लिस्ट" }, { en: "Unified Radio Line", hi: "यूनिफाइड रेडियो लाइन" }], correctAnswer: 0 },
  { question: "What does a URL identify?", questionHindi: "URL किसकी पहचान करता है?", options: [{ en: "The address of a web resource", hi: "वेब संसाधन का पता" }, { en: "A computer's processor", hi: "कंप्यूटर का प्रोसेसर" }, { en: "A printer cartridge", hi: "प्रिंटर कार्ट्रिज" }, { en: "A keyboard layout", hi: "कीबोर्ड लेआउट" }], correctAnswer: 0 },
  { question: "What does HTTPS indicate about a web connection?", questionHindi: "वेब कनेक्शन में HTTPS क्या दर्शाता है?", options: [{ en: "The connection uses encryption between browser and website", hi: "ब्राउज़र और वेबसाइट के बीच कनेक्शन एन्क्रिप्शन उपयोग करता है" }, { en: "The website is always honest", hi: "वेबसाइट हमेशा ईमानदार है" }, { en: "The computer has no malware", hi: "कंप्यूटर में मैलवेयर नहीं है" }, { en: "The page works without a network", hi: "पेज नेटवर्क के बिना चलता है" }], correctAnswer: 0 },
  { question: "What is a domain name?", questionHindi: "Domain Name क्या होता है?", options: [{ en: "A human-readable name for an Internet resource", hi: "इंटरनेट संसाधन का मनुष्यों द्वारा पढ़ा जा सकने वाला नाम" }, { en: "A computer's screen resolution", hi: "कंप्यूटर का स्क्रीन रिज़ॉल्यूशन" }, { en: "A type of email attachment", hi: "ई-मेल अटैचमेंट का प्रकार" }, { en: "A keyboard shortcut", hi: "कीबोर्ड शॉर्टकट" }], correctAnswer: 0 },
  { question: "What is DNS used for?", questionHindi: "DNS का उपयोग किसलिए होता है?", options: [{ en: "Translating domain names into IP addresses", hi: "Domain name को IP address में बदलना" }, { en: "Compressing images", hi: "चित्र संपीड़ित करना" }, { en: "Printing web pages", hi: "वेब पेज प्रिंट करना" }, { en: "Creating email attachments", hi: "ई-मेल अटैचमेंट बनाना" }], correctAnswer: 0 },
  { question: "What does an IP address identify?", questionHindi: "IP Address किसकी पहचान करता है?", options: [{ en: "A device or network interface on an IP network", hi: "IP नेटवर्क पर किसी डिवाइस या नेटवर्क इंटरफेस की" }, { en: "A document's font", hi: "दस्तावेज़ के फ़ॉन्ट की" }, { en: "A spreadsheet formula", hi: "स्प्रेडशीट सूत्र की" }, { en: "A printer's paper size", hi: "प्रिंटर के कागज़ के आकार की" }], correctAnswer: 0 },
  { question: "What is an ISP?", questionHindi: "ISP क्या होता है?", options: [{ en: "An organization that provides Internet access", hi: "इंटरनेट एक्सेस देने वाली संस्था" }, { en: "An image editing tool", hi: "चित्र संपादन टूल" }, { en: "An operating system command", hi: "ऑपरेटिंग सिस्टम कमांड" }, { en: "A spreadsheet cell", hi: "स्प्रेडशीट सेल" }], correctAnswer: 0 },
  { question: "What is bandwidth commonly associated with?", questionHindi: "Bandwidth का संबंध सामान्यतः किससे है?", options: [{ en: "The capacity of a connection to transfer data", hi: "कनेक्शन की डेटा स्थानांतरित करने की क्षमता" }, { en: "The size of a monitor", hi: "मॉनिटर का आकार" }, { en: "The number of email folders", hi: "ई-मेल फोल्डरों की संख्या" }, { en: "The weight of a computer", hi: "कंप्यूटर का वजन" }], correctAnswer: 0 },
  { question: "What is a hyperlink?", questionHindi: "Hyperlink क्या होता है?", options: [{ en: "A clickable link to another location or resource", hi: "दूसरे स्थान या संसाधन तक जाने वाला क्लिक करने योग्य लिंक" }, { en: "A computer power cable", hi: "कंप्यूटर की बिजली केबल" }, { en: "A type of spreadsheet chart", hi: "स्प्रेडशीट चार्ट का प्रकार" }, { en: "A printed page number", hi: "प्रिंट किया पेज नंबर" }], correctAnswer: 0 },
  { question: "What is a website?", questionHindi: "Website क्या होती है?", options: [{ en: "A collection of related web pages under a domain", hi: "एक domain के अंतर्गत संबंधित वेब पेजों का समूह" }, { en: "A single keyboard key", hi: "एक कीबोर्ड कुंजी" }, { en: "A device driver", hi: "डिवाइस ड्राइवर" }, { en: "A computer's battery", hi: "कंप्यूटर की बैटरी" }], correctAnswer: 0 },
  { question: "What is a web page?", questionHindi: "Web Page क्या होता है?", options: [{ en: "A document viewed in a web browser", hi: "वेब ब्राउज़र में देखा जाने वाला दस्तावेज़" }, { en: "A physical network cable", hi: "भौतिक नेटवर्क केबल" }, { en: "A computer's RAM module", hi: "कंप्यूटर का RAM मॉड्यूल" }, { en: "An email password", hi: "ई-मेल पासवर्ड" }], correctAnswer: 0 },
  { question: "What is the purpose of a bookmark in a browser?", questionHindi: "ब्राउज़र में Bookmark का क्या उद्देश्य है?", options: [{ en: "Saving a link for quick access later", hi: "बाद में जल्दी पहुँचने के लिए लिंक सहेजना" }, { en: "Deleting browsing history automatically", hi: "Browsing history अपने-आप मिटाना" }, { en: "Blocking the keyboard", hi: "कीबोर्ड रोकना" }, { en: "Increasing screen resolution", hi: "स्क्रीन रिज़ॉल्यूशन बढ़ाना" }], correctAnswer: 0 },
  { question: "What does browser history usually record?", questionHindi: "Browser History सामान्यतः क्या दर्ज करती है?", options: [{ en: "Previously visited web pages", hi: "पहले देखे गए वेब पेज" }, { en: "All computer passwords", hi: "कंप्यूटर के सभी पासवर्ड" }, { en: "The printer's ink level", hi: "प्रिंटर की स्याही का स्तर" }, { en: "The files in RAM", hi: "RAM में मौजूद फाइलें" }], correctAnswer: 0 },
  { question: "What are browser cookies commonly used for?", questionHindi: "Browser Cookies का सामान्य उपयोग क्या है?", options: [{ en: "Storing small pieces of site-related data in the browser", hi: "ब्राउज़र में वेबसाइट से संबंधित छोटा डेटा रखना" }, { en: "Cleaning the monitor", hi: "मॉनिटर साफ करना" }, { en: "Replacing antivirus software", hi: "एंटीवायरस बदलना" }, { en: "Increasing battery capacity", hi: "बैटरी क्षमता बढ़ाना" }], correctAnswer: 0 },
  { question: "What does a browser cache store?", questionHindi: "Browser Cache क्या संग्रहित करता है?", options: [{ en: "Copies of some web resources to help load pages efficiently", hi: "पेज जल्दी लोड करने में मदद के लिए कुछ वेब संसाधनों की प्रतियाँ" }, { en: "The user's bank PIN", hi: "उपयोगकर्ता का बैंक PIN" }, { en: "Only deleted emails", hi: "केवल हटाए गए ई-मेल" }, { en: "The computer's BIOS password", hi: "कंप्यूटर का BIOS पासवर्ड" }], correctAnswer: 0 },
  { question: "What is an email address used for?", questionHindi: "ई-मेल पते का उपयोग किसलिए होता है?", options: [{ en: "Identifying a destination mailbox for electronic messages", hi: "इलेक्ट्रॉनिक संदेशों के गंतव्य मेलबॉक्स की पहचान करना" }, { en: "Identifying a printer cable", hi: "प्रिंटर केबल पहचानना" }, { en: "Measuring internet speed", hi: "इंटरनेट गति मापना" }, { en: "Formatting a hard drive", hi: "हार्ड ड्राइव फॉर्मेट करना" }], correctAnswer: 0 },
  { question: "Which symbol is required in a standard email address?", questionHindi: "सामान्य ई-मेल पते में कौन-सा चिह्न आवश्यक है?", options: [{ en: "@", hi: "@" }, { en: "#", hi: "#" }, { en: "$", hi: "$" }, { en: "%", hi: "%" }], correctAnswer: 0 },
  { question: "What is the Subject field in an email for?", questionHindi: "ई-मेल में Subject field किसलिए होती है?", options: [{ en: "A brief description of the message topic", hi: "संदेश के विषय का संक्षिप्त वर्णन" }, { en: "The recipient's password", hi: "प्राप्तकर्ता का पासवर्ड" }, { en: "The sender's postal address", hi: "भेजने वाले का डाक पता" }, { en: "The attachment file size only", hi: "केवल अटैचमेंट का आकार" }], correctAnswer: 0 },
  { question: "What does the To field contain?", questionHindi: "To field में क्या लिखा जाता है?", options: [{ en: "The main recipient's email address", hi: "मुख्य प्राप्तकर्ता का ई-मेल पता" }, { en: "The email password", hi: "ई-मेल पासवर्ड" }, { en: "The date of the computer", hi: "कंप्यूटर की तारीख" }, { en: "The browser's home page", hi: "ब्राउज़र का होम पेज" }], correctAnswer: 0 },
  { question: "What is the purpose of CC in email?", questionHindi: "ई-मेल में CC का क्या उद्देश्य है?", options: [{ en: "Sending a visible copy to additional recipients", hi: "अतिरिक्त प्राप्तकर्ताओं को दिखाई देने वाली प्रति भेजना" }, { en: "Encrypting an attachment", hi: "अटैचमेंट एन्क्रिप्ट करना" }, { en: "Deleting the message", hi: "संदेश हटाना" }, { en: "Changing the subject automatically", hi: "Subject अपने-आप बदलना" }], correctAnswer: 0 },
  { question: "What is BCC used for?", questionHindi: "BCC का उपयोग किसलिए होता है?", options: [{ en: "Sending a copy while hiding recipients from other recipients", hi: "प्रति भेजना और प्राप्तकर्ताओं के पते अन्य लोगों से छिपाना" }, { en: "Adding a visible signature only", hi: "केवल दिखाई देने वाला हस्ताक्षर जोड़ना" }, { en: "Blocking all email", hi: "सभी ई-मेल रोकना" }, { en: "Changing the sender's account", hi: "भेजने वाले का खाता बदलना" }], correctAnswer: 0 },
  { question: "What is an email attachment?", questionHindi: "ई-मेल Attachment क्या होता है?", options: [{ en: "A file sent along with an email message", hi: "ई-मेल संदेश के साथ भेजी गई फाइल" }, { en: "The sender's display name", hi: "भेजने वाले का प्रदर्शित नाम" }, { en: "A folder on the desktop only", hi: "केवल डेस्कटॉप का फोल्डर" }, { en: "A browser search result", hi: "ब्राउज़र खोज परिणाम" }], correctAnswer: 0 },
  { question: "Which folder commonly contains newly received email?", questionHindi: "नई प्राप्त ई-मेल सामान्यतः किस फोल्डर में होती है?", options: [{ en: "Inbox", hi: "इनबॉक्स" }, { en: "Sent", hi: "भेजे गए" }, { en: "Drafts", hi: "ड्राफ्ट" }, { en: "Trash only", hi: "केवल ट्रैश" }], correctAnswer: 0 },
  { question: "Where is an email saved when it has not yet been sent?", questionHindi: "अभी न भेजा गया ई-मेल कहाँ सेव होता है?", options: [{ en: "Drafts", hi: "ड्राफ्ट" }, { en: "Inbox", hi: "इनबॉक्स" }, { en: "Spam", hi: "स्पैम" }, { en: "Contacts", hi: "संपर्क" }], correctAnswer: 0 },
  { question: "Which folder commonly stores copies of messages sent by the user?", questionHindi: "उपयोगकर्ता द्वारा भेजे गए संदेशों की प्रतियाँ सामान्यतः किस फोल्डर में होती हैं?", options: [{ en: "Sent", hi: "भेजे गए" }, { en: "Inbox", hi: "इनबॉक्स" }, { en: "Drafts", hi: "ड्राफ्ट" }, { en: "Junk only", hi: "केवल जंक" }], correctAnswer: 0 },
  { question: "What is spam email?", questionHindi: "Spam ई-मेल क्या होती है?", options: [{ en: "Unsolicited or unwanted bulk email", hi: "बिना माँगी गई या अवांछित सामूहिक ई-मेल" }, { en: "A saved draft", hi: "सहेजा हुआ ड्राफ्ट" }, { en: "An official system update", hi: "आधिकारिक सिस्टम अपडेट" }, { en: "A local text file", hi: "स्थानीय टेक्स्ट फाइल" }], correctAnswer: 0 },
  { question: "What should you do with a suspicious email attachment?", questionHindi: "संदिग्ध ई-मेल अटैचमेंट के साथ क्या करना चाहिए?", options: [{ en: "Avoid opening it and verify the sender through a trusted channel", hi: "इसे खोलने से बचें और विश्वसनीय माध्यम से भेजने वाले की पुष्टि करें" }, { en: "Open it immediately", hi: "इसे तुरंत खोलें" }, { en: "Forward it to everyone", hi: "इसे सभी को भेजें" }, { en: "Enter your password into it", hi: "इसमें अपना पासवर्ड डालें" }], correctAnswer: 0 },
  { question: "What does Reply do in an email application?", questionHindi: "ई-मेल एप्लिकेशन में Reply क्या करता है?", options: [{ en: "Creates a response to the sender", hi: "भेजने वाले के लिए उत्तर बनाता है" }, { en: "Deletes the sender's account", hi: "भेजने वाले का खाता हटाता है" }, { en: "Prints the inbox", hi: "इनबॉक्स प्रिंट करता है" }, { en: "Changes the network address", hi: "नेटवर्क पता बदलता है" }], correctAnswer: 0 },
  { question: "What does Reply All do?", questionHindi: "Reply All क्या करता है?", options: [{ en: "Replies to the sender and other listed recipients", hi: "भेजने वाले और सूचीबद्ध अन्य प्राप्तकर्ताओं को उत्तर देता है" }, { en: "Sends a message to every Internet user", hi: "हर इंटरनेट उपयोगकर्ता को संदेश भेजता है" }, { en: "Deletes all replies", hi: "सभी उत्तर हटाता है" }, { en: "Blocks the sender", hi: "भेजने वाले को ब्लॉक करता है" }], correctAnswer: 0 },
  { question: "What does Forward do to an email?", questionHindi: "ई-मेल में Forward क्या करता है?", options: [{ en: "Sends a received message onward to another recipient", hi: "प्राप्त संदेश को किसी अन्य प्राप्तकर्ता को आगे भेजता है" }, { en: "Saves a draft automatically", hi: "ड्राफ्ट अपने-आप सेव करता है" }, { en: "Marks the computer as offline", hi: "कंप्यूटर को ऑफलाइन चिह्नित करता है" }, { en: "Changes the email provider", hi: "ई-मेल प्रदाता बदलता है" }], correctAnswer: 0 },
  { question: "What is an email signature?", questionHindi: "ई-मेल Signature क्या होता है?", options: [{ en: "A block of text added to the end of messages", hi: "संदेशों के अंत में जोड़ा गया टेक्स्ट" }, { en: "A password reset code", hi: "पासवर्ड रीसेट कोड" }, { en: "A browser cookie", hi: "ब्राउज़र कुकी" }, { en: "A file compression method", hi: "फाइल संपीड़न विधि" }], correctAnswer: 0 },
  { question: "What does an email filter commonly do?", questionHindi: "ई-मेल Filter सामान्यतः क्या करता है?", options: [{ en: "Automatically sorts or handles messages based on rules", hi: "नियमों के आधार पर संदेशों को अपने-आप व्यवस्थित या संभालता है" }, { en: "Increases monitor size", hi: "मॉनिटर का आकार बढ़ाता है" }, { en: "Formats the hard drive", hi: "हार्ड ड्राइव फॉर्मेट करता है" }, { en: "Changes a message into a website", hi: "संदेश को वेबसाइट में बदलता है" }], correctAnswer: 0 },
  { question: "What is an email alias?", questionHindi: "ई-मेल Alias क्या होता है?", options: [{ en: "An alternate address that can direct mail to an account", hi: "वैकल्पिक पता जो मेल को किसी खाते तक पहुँचा सकता है" }, { en: "A type of monitor", hi: "मॉनिटर का प्रकार" }, { en: "A deleted attachment", hi: "हटाया गया अटैचमेंट" }, { en: "A browser theme", hi: "ब्राउज़र थीम" }], correctAnswer: 0 },
  { question: "What does SMTP commonly do?", questionHindi: "SMTP सामान्यतः क्या करता है?", options: [{ en: "Sends outgoing email between mail systems", hi: "Mail systems के बीच बाहर जाने वाली ई-मेल भेजता है" }, { en: "Displays spreadsheet charts", hi: "स्प्रेडशीट चार्ट दिखाता है" }, { en: "Translates domain names", hi: "Domain name का अनुवाद करता है" }, { en: "Encrypts every local file", hi: "हर स्थानीय फाइल एन्क्रिप्ट करता है" }], correctAnswer: 0 },
  { question: "What are POP3 and IMAP commonly used for?", questionHindi: "POP3 और IMAP का सामान्य उपयोग क्या है?", options: [{ en: "Accessing or retrieving email", hi: "ई-मेल प्राप्त करने या एक्सेस करने के लिए" }, { en: "Editing images", hi: "चित्र संपादित करने के लिए" }, { en: "Creating computer hardware", hi: "कंप्यूटर हार्डवेयर बनाने के लिए" }, { en: "Printing a web page", hi: "वेब पेज प्रिंट करने के लिए" }], correctAnswer: 0 },
  { question: "What is cloud storage?", questionHindi: "Cloud Storage क्या है?", options: [{ en: "Storing data on remote servers accessible over a network", hi: "नेटवर्क से उपलब्ध दूरस्थ सर्वर पर डेटा रखना" }, { en: "Storing data only in the keyboard", hi: "डेटा केवल कीबोर्ड में रखना" }, { en: "A paper filing cabinet", hi: "कागज़ी फाइल कैबिनेट" }, { en: "A type of email subject", hi: "ई-मेल Subject का प्रकार" }], correctAnswer: 0 },
  { question: "What is a video conference?", questionHindi: "Video Conference क्या होती है?", options: [{ en: "A live meeting using audio and video over a network", hi: "नेटवर्क पर ऑडियो और वीडियो से होने वाली लाइव बैठक" }, { en: "A printed letter", hi: "प्रिंट किया हुआ पत्र" }, { en: "A spreadsheet formula", hi: "स्प्रेडशीट सूत्र" }, { en: "A computer boot process", hi: "कंप्यूटर की Boot प्रक्रिया" }], correctAnswer: 0 },
  { question: "What is netiquette?", questionHindi: "Netiquette क्या है?", options: [{ en: "Guidelines for respectful behavior online", hi: "ऑनलाइन सम्मानजनक व्यवहार के दिशानिर्देश" }, { en: "A kind of network cable", hi: "नेटवर्क केबल का प्रकार" }, { en: "A browser password", hi: "ब्राउज़र पासवर्ड" }, { en: "A method for printing email", hi: "ई-मेल प्रिंट करने की विधि" }], correctAnswer: 0 },
  { question: "What is phishing?", questionHindi: "Phishing क्या है?", options: [{ en: "A deceptive attempt to obtain sensitive information", hi: "संवेदनशील जानकारी पाने का धोखाधड़ीपूर्ण प्रयास" }, { en: "A safe way to back up email", hi: "ई-मेल बैकअप का सुरक्षित तरीका" }, { en: "A type of web browser", hi: "वेब ब्राउज़र का प्रकार" }, { en: "A method of sorting messages", hi: "संदेश क्रमबद्ध करने की विधि" }], correctAnswer: 0 },
  { question: "What is a CAPTCHA often used for?", questionHindi: "CAPTCHA का उपयोग अक्सर किसलिए किया जाता है?", options: [{ en: "Distinguishing human users from automated programs", hi: "मानव उपयोगकर्ताओं और स्वचालित प्रोग्रामों में अंतर करना" }, { en: "Increasing email storage", hi: "ई-मेल स्टोरेज बढ़ाना" }, { en: "Changing a domain name", hi: "Domain name बदलना" }, { en: "Removing a browser", hi: "ब्राउज़र हटाना" }], correctAnswer: 0 },
  { question: "What does downloading mean?", questionHindi: "Downloading का क्या अर्थ है?", options: [{ en: "Receiving data from a remote system to a local device", hi: "दूरस्थ सिस्टम से स्थानीय डिवाइस पर डेटा प्राप्त करना" }, { en: "Sending a file to a website", hi: "वेबसाइट पर फाइल भेजना" }, { en: "Deleting a network", hi: "नेटवर्क हटाना" }, { en: "Printing a message", hi: "संदेश प्रिंट करना" }], correctAnswer: 0 },
  { question: "What does uploading mean?", questionHindi: "Uploading का क्या अर्थ है?", options: [{ en: "Sending data from a local device to a remote system", hi: "स्थानीय डिवाइस से दूरस्थ सिस्टम पर डेटा भेजना" }, { en: "Receiving email only", hi: "केवल ई-मेल प्राप्त करना" }, { en: "Turning off Wi-Fi", hi: "Wi-Fi बंद करना" }, { en: "Clearing a keyboard", hi: "कीबोर्ड साफ करना" }], correctAnswer: 0 },
  { question: "What is a web portal?", questionHindi: "Web Portal क्या होता है?", options: [{ en: "A site that provides access to multiple information or services", hi: "कई जानकारी या सेवाओं तक पहुँच देने वाली वेबसाइट" }, { en: "A computer's power port", hi: "कंप्यूटर का पावर पोर्ट" }, { en: "A file extension", hi: "फाइल एक्सटेंशन" }, { en: "A type of spreadsheet cell", hi: "स्प्रेडशीट सेल का प्रकार" }], correctAnswer: 0 },
  { question: "What does a website's privacy policy generally explain?", questionHindi: "वेबसाइट की Privacy Policy सामान्यतः क्या बताती है?", options: [{ en: "How the site collects, uses, and handles personal data", hi: "वेबसाइट व्यक्तिगत डेटा कैसे एकत्र, उपयोग और संभालती है" }, { en: "The user's keyboard layout", hi: "उपयोगकर्ता का कीबोर्ड लेआउट" }, { en: "How to repair a monitor", hi: "मॉनिटर कैसे ठीक करें" }, { en: "The printer's paper capacity", hi: "प्रिंटर की कागज़ क्षमता" }], correctAnswer: 0 },
  { question: "What is a secure way to use public Wi-Fi for sensitive activity?", questionHindi: "संवेदनशील काम के लिए Public Wi-Fi उपयोग करने का सुरक्षित तरीका क्या है?", options: [{ en: "Avoid sensitive transactions or use a trusted VPN and HTTPS", hi: "संवेदनशील लेन-देन से बचें या विश्वसनीय VPN और HTTPS उपयोग करें" }, { en: "Share banking passwords in chat", hi: "बैंकिंग पासवर्ड चैट में साझा करें" }, { en: "Disable every security update", hi: "सभी सुरक्षा अपडेट बंद करें" }, { en: "Trust every pop-up", hi: "हर पॉप-अप पर भरोसा करें" }], correctAnswer: 0 },
  { question: "What is a VPN commonly used for?", questionHindi: "VPN का सामान्य उपयोग क्या है?", options: [{ en: "Creating an encrypted connection across a network", hi: "नेटवर्क पर एन्क्रिप्टेड कनेक्शन बनाना" }, { en: "Increasing screen brightness", hi: "स्क्रीन की चमक बढ़ाना" }, { en: "Editing spreadsheet formulas", hi: "स्प्रेडशीट सूत्र संपादित करना" }, { en: "Replacing a browser", hi: "ब्राउज़र बदलना" }], correctAnswer: 0 }
 ];

function replaceQuestion(index, question, questionHindi, options, correctAnswer) {
  internetEmailQuestionBank[index] = { question, questionHindi, options, correctAnswer };
}

replaceQuestion(2, "Which set contains only web browsers?", "किस समूह में केवल वेब ब्राउज़र हैं?", [
  { en: "Chrome, Firefox and Edge", hi: "क्रोम, फ़ायरफ़ॉक्स और एज" },
  { en: "Google, Bing and Yahoo", hi: "गूगल, बिंग और याहू" },
  { en: "Calc, Writer and Impress", hi: "कैल्क, राइटर और इम्प्रेस" },
  { en: "SMTP, IMAP and POP3", hi: "SMTP, IMAP और POP3" }
], 0);
replaceQuestion(1, "When a browser requests a web page, what does the web server do?", "जब ब्राउज़र वेब पेज का अनुरोध करता है, तो Web Server क्या करता है?", [
  { en: "Sends the requested web resource in response", hi: "अनुरोध के उत्तर में माँगा गया वेब संसाधन भेजता है" },
  { en: "Converts the page into a keyboard", hi: "पेज को कीबोर्ड में बदलता है" },
  { en: "Creates the user's email password", hi: "उपयोगकर्ता का ई-मेल पासवर्ड बनाता है" },
  { en: "Supplies electricity to the browser", hi: "ब्राउज़र को बिजली देता है" }
], 0);
replaceQuestion(3, "Which pair names search engines?", "किस जोड़ी में Search Engine के नाम हैं?", [
  { en: "Google and Bing", hi: "गूगल और बिंग" },
  { en: "Chrome and Firefox", hi: "क्रोम और फ़ायरफ़ॉक्स" },
  { en: "HTTP and HTTPS", hi: "HTTP और HTTPS" },
  { en: "Writer and Calc", hi: "राइटर और कैल्क" }
], 0);
replaceQuestion(8, "What does WWW stand for?", "WWW का पूरा नाम क्या है?", [
  { en: "World Wide Web", hi: "वर्ल्ड वाइड वेब" },
  { en: "World Web Window", hi: "वर्ल्ड वेब विंडो" },
  { en: "Web World Wide", hi: "वेब वर्ल्ड वाइड" },
  { en: "Wide World Web", hi: "वाइड वर्ल्ड वेब" }
], 0);
replaceQuestion(11, "A phone accesses the Internet through its mobile network while away from Wi-Fi. What is this access commonly called?", "Wi-Fi से दूर मोबाइल नेटवर्क के माध्यम से फोन द्वारा इंटरनेट चलाना सामान्यतः क्या कहलाता है?", [
  { en: "Mobile Internet", hi: "मोबाइल इंटरनेट" },
  { en: "Web hosting", hi: "वेब होस्टिंग" },
  { en: "Email forwarding", hi: "ई-मेल फ़ॉरवर्डिंग" },
  { en: "Local printing", hi: "स्थानीय प्रिंटिंग" }
], 0);
replaceQuestion(15, "What is a browser home page?", "ब्राउज़र का Home Page क्या होता है?", [
  { en: "The page that opens as the browser's starting page", hi: "वह पेज जो ब्राउज़र शुरू होने पर खुलता है" },
  { en: "The last file downloaded", hi: "आखिरी डाउनलोड की गई फाइल" },
  { en: "The computer's desktop wallpaper", hi: "कंप्यूटर का डेस्कटॉप वॉलपेपर" },
  { en: "The website's source code", hi: "वेबसाइट का सोर्स कोड" }
], 0);
replaceQuestion(16, "How can a search engine be asked to find an exact phrase?", "किसी सटीक वाक्यांश को खोजने के लिए Search Engine को कैसे निर्देश दें?", [
  { en: "Put the phrase inside quotation marks", hi: "वाक्यांश को उद्धरण चिह्नों के भीतर लिखें" },
  { en: "Replace every word with a file extension", hi: "हर शब्द को file extension से बदलें" },
  { en: "Type the phrase only in the browser address bar without searching", hi: "वाक्यांश को बिना खोजे केवल ब्राउज़र address bar में लिखें" },
  { en: "Turn off the network connection", hi: "नेटवर्क कनेक्शन बंद करें" }
], 0);
replaceQuestion(34, "Which command starts a new email message?", "नया ई-मेल संदेश शुरू करने के लिए कौन-सा command चुनते हैं?", [
  { en: "Compose", hi: "कंपोज़" },
  { en: "Forward", hi: "फ़ॉरवर्ड" },
  { en: "Delete", hi: "डिलीट" },
  { en: "Archive", hi: "आर्काइव" }
], 0);
replaceQuestion(35, "Which practice reflects good email etiquette?", "कौन-सा व्यवहार अच्छी ई-मेल शिष्टाचार दर्शाता है?", [
  { en: "Use a clear subject and a polite, concise message", hi: "स्पष्ट विषय और विनम्र, संक्षिप्त संदेश लिखें" },
  { en: "Write the entire message in capital letters", hi: "पूरा संदेश बड़े अक्षरों में लिखें" },
  { en: "Send every message to unrelated contacts", hi: "हर संदेश असंबंधित संपर्कों को भेजें" },
  { en: "Leave the subject blank in every email", hi: "हर ई-मेल में विषय खाली छोड़ें" }
], 0);
replaceQuestion(36, "When buying from an online shop, which action is the safest?", "ऑनलाइन दुकान से खरीदते समय कौन-सा कदम सबसे सुरक्षित है?", [
  { en: "Check the seller and use a trusted payment method", hi: "विक्रेता की जाँच करें और विश्वसनीय भुगतान तरीका अपनाएँ" },
  { en: "Share an OTP with the seller on request", hi: "माँगने पर विक्रेता को OTP बता दें" },
  { en: "Save card details on every public computer", hi: "हर सार्वजनिक कंप्यूटर पर कार्ड विवरण सहेजें" },
  { en: "Ignore the website address and security warnings", hi: "वेबसाइट पता और सुरक्षा चेतावनियाँ अनदेखी करें" }
], 0);
replaceQuestion(40, "Which activity is a common use of a social networking service?", "Social Networking सेवा का सामान्य उपयोग कौन-सा है?", [
  { en: "Sharing updates and communicating with a network of people", hi: "लोगों के नेटवर्क के साथ अपडेट साझा करना और संवाद करना" },
  { en: "Converting a domain name into an IP address", hi: "डोमेन नाम को IP address में बदलना" },
  { en: "Formatting a computer's hard disk", hi: "कंप्यूटर की हार्ड डिस्क फॉर्मेट करना" },
  { en: "Routing electricity to a monitor", hi: "मॉनिटर तक बिजली पहुँचाना" }
], 0);
replaceQuestion(46, "Which is an example of an e-governance service?", "ई-गवर्नेंस सेवा का उदाहरण कौन-सा है?", [
  { en: "Applying for a government certificate through an official portal", hi: "आधिकारिक पोर्टल से सरकारी प्रमाणपत्र के लिए आवेदन करना" },
  { en: "Changing a keyboard key", hi: "कीबोर्ड की कुंजी बदलना" },
  { en: "Editing a local photograph", hi: "स्थानीय फोटो संपादित करना" },
  { en: "Cleaning a computer screen", hi: "कंप्यूटर स्क्रीन साफ करना" }
], 0);
replaceQuestion(47, "Before using online banking, what should a user verify?", "Online Banking करने से पहले उपयोगकर्ता को क्या जाँचना चाहिए?", [
  { en: "The bank's correct official address and a secure connection", hi: "बैंक का सही आधिकारिक पता और सुरक्षित कनेक्शन" },
  { en: "That the page has many advertisements", hi: "कि पेज पर बहुत सारे विज्ञापन हैं" },
  { en: "That the browser has saved the banking password", hi: "कि ब्राउज़र ने बैंकिंग पासवर्ड सहेजा है" },
  { en: "That the message asks for an OTP by email", hi: "कि संदेश ई-मेल से OTP माँगता है" }
], 0);
replaceQuestion(49, "What does HTTP primarily define?", "HTTP मुख्य रूप से किसे परिभाषित करता है?", [
  { en: "Rules for transferring web resources between clients and servers", hi: "क्लाइंट और सर्वर के बीच वेब संसाधन स्थानांतरित करने के नियम" },
  { en: "A method for encrypting every stored file", hi: "हर संग्रहित फाइल एन्क्रिप्ट करने की विधि" },
  { en: "A format for writing email addresses", hi: "ई-मेल पता लिखने का प्रारूप" },
  { en: "A wireless network name", hi: "वायरलेस नेटवर्क का नाम" }
], 0);

const difficulties = [
  "Easy", "Moderate", "Easy", "Moderate", "Easy", "Hard", "Moderate", "Easy", "Hard", "Moderate",
  "Easy", "Moderate", "Easy", "Easy", "Moderate", "Hard", "Moderate", "Hard", "Moderate", "Easy",
  "Easy", "Moderate", "Easy", "Hard", "Moderate", "Easy", "Moderate", "Easy", "Easy", "Moderate",
  "Hard", "Easy", "Moderate", "Easy", "Hard", "Moderate", "Moderate", "Hard", "Hard", "Moderate",
  "Moderate", "Easy", "Hard", "Moderate", "Easy", "Moderate", "Easy", "Hard", "Hard", "Moderate"
];

const explanations = [
  "The Internet is a global system formed by interconnected computer networks.",
  "A web server receives requests and returns the requested web resource.",
  "Chrome, Firefox and Edge are browsers; the other groups name different tools or protocols.",
  "Google and Bing index web content and help users search for information.",
  "URL means Uniform Resource Locator.",
  "A URL identifies the location of a resource such as a web page or file.",
  "HTTPS protects data in transit using encryption, but does not guarantee that a site is honest.",
  "A domain name is a readable name that can be resolved to network addresses.",
  "WWW is short for the World Wide Web, the linked collection of web resources accessed over the Internet.",
  "An IP address identifies a network interface so data can be routed to it.",
  "An ISP provides customers with access to the Internet.",
  "Mobile Internet uses a cellular network connection when Wi-Fi is not being used.",
  "A hyperlink is a clickable reference that opens another resource or location.",
  "A website groups related web pages, commonly under one domain.",
  "A web page is an individual document displayed by a browser.",
  "The browser home page is configured as its starting page.",
  "Quotation marks around a phrase commonly ask a search engine to match that exact phrase.",
  "Cookies store small site-related data, often to maintain preferences or sessions.",
  "Cache keeps copies of some resources so repeat visits can load more efficiently.",
  "An email address identifies a mailbox that can receive electronic messages.",
  "The @ symbol separates the mailbox name from its domain in a standard email address.",
  "A concise subject tells recipients what the email is about.",
  "The To field lists the primary intended recipient or recipients.",
  "CC sends a copy with recipient addresses visible to other recipients.",
  "BCC hides its listed recipients from other recipients of the message.",
  "An attachment is a file included with an email message.",
  "Newly received messages are normally delivered to the Inbox.",
  "Unsent messages saved for later are kept in Drafts.",
  "The Sent folder commonly keeps copies of outgoing messages.",
  "Spam is unsolicited or unwanted email, often sent in bulk.",
  "Unexpected files may contain malware; verify the sender before opening them.",
  "Reply starts a response addressed to the original sender.",
  "Reply All includes the sender and other original recipients, so use it only when appropriate.",
  "Forward sends a received message onward to another recipient.",
  "Compose opens a new message editor so the user can address and write an email.",
  "Good email etiquette uses a meaningful subject and respectful, concise language.",
  "Checking the seller and payment channel reduces the risk of fraud when shopping online.",
  "SMTP is used to send outgoing email between mail systems.",
  "POP3 and IMAP are protocols used by email clients to retrieve or access messages.",
  "Cloud storage keeps data on remote servers that can be reached over a network.",
  "Social networks help people communicate and share content with connected users.",
  "Netiquette means respectful and responsible conduct in online communication.",
  "Phishing messages impersonate trusted sources to steal credentials or other sensitive data.",
  "CAPTCHA checks whether a user is human rather than an automated program.",
  "Downloading transfers data from a remote system to a local device.",
  "Uploading transfers data from a local device to a remote system.",
  "E-governance delivers government information or services through digital channels.",
  "Online banking should be accessed through the bank's verified site or official app.",
  "Avoid sensitive activity on untrusted public Wi-Fi; HTTPS protects the connection to a site but cannot make the network trustworthy.",
  "HTTP defines request and response rules used to transfer web resources."
];

const answerPositions = [1, 0, 1, 2, 2, 3, 0, 3, 0, 3, 1, 2, 2, 3, 0, 2, 1, 1, 0, 0, 1, 1, 3, 2, 3, 2, 1, 2, 3, 0, 2, 2, 3, 1, 0, 1, 3, 0, 1, 0, 0, 3, 3, 2, 0, 1, 2, 0, 1, 3];

window.internetEmailQuestions = internetEmailQuestionBank.map(function (item, index) {
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