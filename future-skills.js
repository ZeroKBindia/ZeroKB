const futureSkillsQuestionBank = [
  { question: "What are future skills?", questionHindi: "Future Skills क्या हैं?", options: [{ en: "Capabilities that help people adapt to changing work and technology", hi: "बदलते काम और तकनीक के अनुसार ढलने में मदद करने वाली क्षमताएँ" }, { en: "Skills used only with paper files", hi: "केवल कागज़ी फाइलों में उपयोग होने वाले कौशल" }, { en: "A type of computer cable", hi: "कंप्यूटर केबल का प्रकार" }, { en: "A fixed list of obsolete tools", hi: "पुराने टूलों की स्थिर सूची" }], correctAnswer: 0 },
  { question: "What is Artificial Intelligence (AI)?", questionHindi: "Artificial Intelligence (AI) क्या है?", options: [{ en: "Technology that enables machines to perform tasks associated with human intelligence", hi: "ऐसी तकनीक जो मशीनों को मानव बुद्धि से जुड़े कार्य करने देती है" }, { en: "A type of monitor", hi: "मॉनिटर का एक प्रकार" }, { en: "A paper filing method", hi: "कागज़ी फाइल रखने की विधि" }, { en: "A computer power cable", hi: "कंप्यूटर पावर केबल" }], correctAnswer: 0 },
  { question: "What is Machine Learning?", questionHindi: "Machine Learning क्या है?", options: [{ en: "A field where systems learn patterns from data to make predictions or decisions", hi: "ऐसा क्षेत्र जहाँ सिस्टम डेटा से पैटर्न सीखकर अनुमान या निर्णय करते हैं" }, { en: "A method of cleaning keyboards", hi: "कीबोर्ड साफ करने की विधि" }, { en: "A type of spreadsheet cell", hi: "स्प्रेडशीट सेल का प्रकार" }, { en: "A method of manually printing a file", hi: "फाइल हाथ से प्रिंट करने की विधि" }], correctAnswer: 0 },
  { question: "What is Generative AI designed to do?", questionHindi: "Generative AI किस काम के लिए बनाई जाती है?", options: [{ en: "Generate new content such as text, images, audio, or code", hi: "टेक्स्ट, चित्र, ऑडियो या कोड जैसी नई सामग्री बनाना" }, { en: "Only store electricity", hi: "केवल बिजली संग्रहित करना" }, { en: "Replace every human decision", hi: "हर मानव निर्णय का स्थान लेना" }, { en: "Guarantee that all information is correct", hi: "हर जानकारी सही होने की गारंटी देना" }], correctAnswer: 0 },
  { question: "Why should AI-generated information be reviewed?", questionHindi: "AI द्वारा बनाई जानकारी की समीक्षा क्यों करनी चाहिए?", options: [{ en: "It can contain errors, bias, or outdated claims", hi: "इसमें गलती, पक्षपात या पुरानी जानकारी हो सकती है" }, { en: "It is always verified by law", hi: "यह कानून से हमेशा सत्यापित होती है" }, { en: "It cannot be edited", hi: "इसे संपादित नहीं किया जा सकता" }, { en: "It never uses data", hi: "यह कभी डेटा उपयोग नहीं करती" }], correctAnswer: 0 },
  { question: "What is a prompt in generative AI?", questionHindi: "Generative AI में Prompt क्या होता है?", options: [{ en: "An instruction or input that guides the model's response", hi: "ऐसा निर्देश या Input जो Model के उत्तर को दिशा देता है" }, { en: "A computer's battery", hi: "कंप्यूटर की बैटरी" }, { en: "A printer cartridge", hi: "प्रिंटर कार्ट्रिज" }, { en: "A type of network cable", hi: "Network Cable का प्रकार" }], correctAnswer: 0 },
  { question: "What does IoT stand for?", questionHindi: "IoT का पूरा नाम क्या है?", options: [{ en: "Internet of Things", hi: "इंटरनेट ऑफ थिंग्स" }, { en: "Input of Text", hi: "इनपुट ऑफ टेक्स्ट" }, { en: "Internet of Tables", hi: "इंटरनेट ऑफ टेबल्स" }, { en: "Instruction over Terminal", hi: "इंस्ट्रक्शन ओवर टर्मिनल" }], correctAnswer: 0 },
  { question: "What is a common feature of an IoT device?", questionHindi: "IoT Device की सामान्य विशेषता क्या है?", options: [{ en: "It can sense, communicate, or exchange data over a network", hi: "यह नेटवर्क पर संवेदन, संचार या डेटा आदान-प्रदान कर सकता है" }, { en: "It must work without any software", hi: "इसे बिना किसी सॉफ्टवेयर के काम करना चाहिए" }, { en: "It cannot contain sensors", hi: "इसमें Sensor नहीं हो सकता" }, { en: "It is always a desktop computer", hi: "यह हमेशा Desktop Computer होता है" }], correctAnswer: 0 },
  { question: "Which is an example of an IoT application?", questionHindi: "IoT Application का उदाहरण कौन-सा है?", options: [{ en: "A connected temperature sensor reporting readings", hi: "Reading भेजने वाला Connected Temperature Sensor" }, { en: "A paper notebook", hi: "कागज़ी नोटबुक" }, { en: "A disconnected ruler", hi: "बिना कनेक्शन वाला पैमाना" }, { en: "A mechanical pencil only", hi: "केवल Mechanical Pencil" }], correctAnswer: 0 },
  { question: "What is cloud computing?", questionHindi: "Cloud Computing क्या है?", options: [{ en: "Using computing resources and services delivered over a network", hi: "नेटवर्क के माध्यम से उपलब्ध Computing Resources और Services का उपयोग" }, { en: "Storing files only on paper", hi: "फाइलें केवल कागज़ पर रखना" }, { en: "A type of keyboard", hi: "कीबोर्ड का प्रकार" }, { en: "A computer without memory", hi: "बिना मेमोरी का कंप्यूटर" }], correctAnswer: 0 },
  { question: "What is Software as a Service (SaaS)?", questionHindi: "Software as a Service (SaaS) क्या है?", options: [{ en: "Using software hosted by a provider, often through a browser or app", hi: "प्रदाता द्वारा Hosted सॉफ्टवेयर को अक्सर Browser या App से उपयोग करना" }, { en: "Buying a physical mouse", hi: "भौतिक Mouse खरीदना" }, { en: "A type of processor", hi: "Processor का प्रकार" }, { en: "A paper software manual", hi: "कागज़ी Software Manual" }], correctAnswer: 0 },
  { question: "What does Infrastructure as a Service (IaaS) commonly provide?", questionHindi: "Infrastructure as a Service (IaaS) सामान्यतः क्या उपलब्ध कराता है?", options: [{ en: "On-demand computing infrastructure such as virtual machines and storage", hi: "माँग पर Virtual Machine और Storage जैसे Computing Infrastructure" }, { en: "Only printed books", hi: "केवल छपी पुस्तकें" }, { en: "A physical keyboard layout", hi: "भौतिक Keyboard Layout" }, { en: "A single email attachment", hi: "एक ई-मेल Attachment" }], correctAnswer: 0 },
  { question: "What is Platform as a Service (PaaS) intended to provide?", questionHindi: "Platform as a Service (PaaS) का उद्देश्य क्या उपलब्ध कराना है?", options: [{ en: "A managed environment for developing and deploying applications", hi: "Application विकसित और Deploy करने के लिए Managed Environment" }, { en: "A paper filing cabinet", hi: "कागज़ी फाइल कैबिनेट" }, { en: "A computer monitor stand", hi: "कंप्यूटर मॉनिटर स्टैंड" }, { en: "A cellular SIM card only", hi: "केवल Cellular SIM Card" }], correctAnswer: 0 },
  { question: "What is a benefit of cloud collaboration tools?", questionHindi: "Cloud Collaboration Tools का एक लाभ क्या है?", options: [{ en: "Multiple authorized users can work on shared resources", hi: "कई अधिकृत उपयोगकर्ता साझा संसाधनों पर काम कर सकते हैं" }, { en: "They guarantee no data loss", hi: "वे डेटा नष्ट न होने की गारंटी देते हैं" }, { en: "They remove the need for access control", hi: "वे Access Control की जरूरत हटाते हैं" }, { en: "They work only without the Internet", hi: "वे केवल Internet के बिना काम करते हैं" }], correctAnswer: 0 },
  { question: "What is Big Data?", questionHindi: "Big Data क्या है?", options: [{ en: "Data sets whose size or complexity may require specialized processing", hi: "ऐसे डेटा समूह जिनके आकार या जटिलता के लिए विशेष Processing चाहिए" }, { en: "A large computer monitor", hi: "बड़ा कंप्यूटर मॉनिटर" }, { en: "A single text document", hi: "एक टेक्स्ट दस्तावेज़" }, { en: "A type of printer ink", hi: "प्रिंटर स्याही का प्रकार" }], correctAnswer: 0 },
  { question: "What does data analytics help organizations do?", questionHindi: "Data Analytics संस्थाओं को क्या करने में मदद करता है?", options: [{ en: "Examine data to find patterns, insights, or support decisions", hi: "डेटा की जाँच कर पैटर्न, निष्कर्ष या निर्णय में सहायता पाना" }, { en: "Guarantee future profit", hi: "भविष्य के लाभ की गारंटी देना" }, { en: "Remove the need to collect relevant data", hi: "प्रासंगिक डेटा एकत्र करने की जरूरत हटाना" }, { en: "Replace all human judgment", hi: "सभी मानव निर्णयों का स्थान लेना" }], correctAnswer: 0 },
  { question: "What is data visualization?", questionHindi: "Data Visualization क्या है?", options: [{ en: "Presenting data graphically to make patterns easier to understand", hi: "डेटा को ग्राफ़िक रूप में दिखाना ताकि पैटर्न समझना आसान हो" }, { en: "Encrypting a hard drive", hi: "Hard Drive एन्क्रिप्ट करना" }, { en: "Replacing data with passwords", hi: "डेटा को पासवर्ड से बदलना" }, { en: "Printing every record", hi: "हर Record प्रिंट करना" }], correctAnswer: 0 },
  { question: "What is blockchain?", questionHindi: "Blockchain क्या है?", options: [{ en: "A distributed ledger that records transactions in linked blocks", hi: "Linked Blocks में लेन-देन दर्ज करने वाला Distributed Ledger" }, { en: "A single-user word processor", hi: "Single-user वर्ड प्रोसेसर" }, { en: "A type of monitor", hi: "मॉनिटर का प्रकार" }, { en: "A paper spreadsheet", hi: "कागज़ी स्प्रेडशीट" }], correctAnswer: 0 },
  { question: "What is a characteristic of a public blockchain?", questionHindi: "Public Blockchain की विशेषता क्या है?", options: [{ en: "Participation and transaction visibility follow the network's public rules", hi: "भागीदारी और लेन-देन की दृश्यता नेटवर्क के सार्वजनिक नियमों के अनुसार होती है" }, { en: "It is always controlled by one user's laptop", hi: "इसे हमेशा एक उपयोगकर्ता का Laptop नियंत्रित करता है" }, { en: "It cannot store records", hi: "यह Record नहीं रख सकता" }, { en: "It is a type of email inbox", hi: "यह ई-मेल Inbox का प्रकार है" }], correctAnswer: 0 },
  { question: "What is a smart contract in blockchain systems?", questionHindi: "Blockchain System में Smart Contract क्या होता है?", options: [{ en: "Code that can automatically execute defined rules on a blockchain", hi: "Blockchain पर निर्धारित नियम अपने-आप लागू करने वाला Code" }, { en: "A paper agreement stored in a folder", hi: "फोल्डर में रखी कागज़ी सहमति" }, { en: "A computer warranty", hi: "कंप्यूटर Warranty" }, { en: "A password printed on a card", hi: "कार्ड पर छपा पासवर्ड" }], correctAnswer: 0 },
  { question: "What is Augmented Reality (AR)?", questionHindi: "Augmented Reality (AR) क्या है?", options: [{ en: "Overlaying digital content onto a view of the real world", hi: "वास्तविक दुनिया के दृश्य पर डिजिटल सामग्री जोड़ना" }, { en: "Replacing every real-world object with a printed page", hi: "हर वास्तविक वस्तु को छपे पेज से बदलना" }, { en: "A method of file compression", hi: "फाइल संपीड़न विधि" }, { en: "A type of spreadsheet formula", hi: "स्प्रेडशीट सूत्र का प्रकार" }], correctAnswer: 0 },
  { question: "What is Virtual Reality (VR)?", questionHindi: "Virtual Reality (VR) क्या है?", options: [{ en: "An immersive computer-generated environment", hi: "कंप्यूटर द्वारा बनाया गया अनुभवात्मक वातावरण" }, { en: "A printed map only", hi: "केवल छपा नक्शा" }, { en: "A bank transfer method", hi: "बैंक Transfer विधि" }, { en: "A type of operating system file", hi: "Operating System File का प्रकार" }], correctAnswer: 0 },
  { question: "What does robotics combine?", questionHindi: "Robotics में किन चीज़ों का संयोजन होता है?", options: [{ en: "Engineering, control, sensing, and computing to build or operate robots", hi: "Robot बनाने या चलाने के लिए Engineering, Control, Sensing और Computing" }, { en: "Only paper filing and printing", hi: "केवल कागज़ी Filing और Printing" }, { en: "Only email and web browsing", hi: "केवल ई-मेल और Web Browsing" }, { en: "Only keyboard shortcuts", hi: "केवल Keyboard Shortcut" }], correctAnswer: 0 },
  { question: "What is automation?", questionHindi: "Automation क्या है?", options: [{ en: "Using technology to perform tasks with reduced manual intervention", hi: "कम मानवीय हस्तक्षेप से कार्य करने के लिए तकनीक का उपयोग" }, { en: "Doing every task without tools", hi: "हर काम बिना किसी साधन के करना" }, { en: "Turning off all computers", hi: "सभी कंप्यूटर बंद करना" }, { en: "Printing every digital file", hi: "हर डिजिटल फाइल प्रिंट करना" }], correctAnswer: 0 },
  { question: "What is 3D printing?", questionHindi: "3D Printing क्या है?", options: [{ en: "Creating a three-dimensional object by adding material layer by layer", hi: "परत-दर-परत सामग्री जोड़कर त्रि-आयामी वस्तु बनाना" }, { en: "Printing three copies of a letter", hi: "पत्र की तीन प्रतियाँ प्रिंट करना" }, { en: "Displaying a 3D chart on paper", hi: "कागज़ पर 3D चार्ट दिखाना" }, { en: "A method of cloud storage", hi: "Cloud Storage की विधि" }], correctAnswer: 0 },
  { question: "What is edge computing?", questionHindi: "Edge Computing क्या है?", options: [{ en: "Processing data closer to where it is generated or used", hi: "डेटा जहाँ बनाया या उपयोग किया जाता है उसके पास Processing करना" }, { en: "Processing only at the farthest data center", hi: "केवल सबसे दूर Data Center पर Processing" }, { en: "A type of paper cutter", hi: "Paper Cutter का प्रकार" }, { en: "A method of changing font size", hi: "Font Size बदलने की विधि" }], correctAnswer: 0 },
  { question: "What is 5G?", questionHindi: "5G क्या है?", options: [{ en: "A generation of mobile network technology", hi: "मोबाइल नेटवर्क तकनीक की एक पीढ़ी" }, { en: "A type of spreadsheet", hi: "स्प्रेडशीट का प्रकार" }, { en: "A computer file extension", hi: "कंप्यूटर File Extension" }, { en: "A digital signature format", hi: "Digital Signature Format" }], correctAnswer: 0 },
  { question: "What is a digital twin?", questionHindi: "Digital Twin क्या होता है?", options: [{ en: "A digital representation of a real-world object, system, or process", hi: "वास्तविक वस्तु, सिस्टम या प्रक्रिया का डिजिटल प्रतिनिधित्व" }, { en: "A second computer keyboard", hi: "दूसरा कंप्यूटर कीबोर्ड" }, { en: "A paper copy of a password", hi: "पासवर्ड की कागज़ी प्रति" }, { en: "An email sent twice", hi: "दो बार भेजा ई-मेल" }], correctAnswer: 0 },
  { question: "What is Natural Language Processing (NLP)?", questionHindi: "Natural Language Processing (NLP) क्या है?", options: [{ en: "Technology for computers to analyze or generate human language", hi: "कंप्यूटर द्वारा मानव भाषा का विश्लेषण या निर्माण करने की तकनीक" }, { en: "A method for cleaning hardware", hi: "Hardware साफ करने की विधि" }, { en: "A type of network cable", hi: "Network Cable का प्रकार" }, { en: "A spreadsheet cell format", hi: "स्प्रेडशीट Cell Format" }], correctAnswer: 0 },
  { question: "What is computer vision?", questionHindi: "Computer Vision क्या है?", options: [{ en: "A field that helps computers interpret images or video", hi: "कंप्यूटर को चित्र या वीडियो समझने में मदद करने वाला क्षेत्र" }, { en: "A screen protector", hi: "Screen Protector" }, { en: "A printed user manual", hi: "छपी User Manual" }, { en: "A type of email filter", hi: "ई-मेल Filter का प्रकार" }], correctAnswer: 0 },
  { question: "What does a sensor do in a smart system?", questionHindi: "Smart System में Sensor क्या करता है?", options: [{ en: "Measures or detects a physical condition", hi: "भौतिक स्थिति को मापता या पहचानता है" }, { en: "Always makes a financial decision", hi: "हमेशा वित्तीय निर्णय लेता है" }, { en: "Stores unlimited data", hi: "असीमित डेटा रखता है" }, { en: "Replaces a network", hi: "Network का स्थान लेता है" }], correctAnswer: 0 },
  { question: "What is a wearable technology device?", questionHindi: "Wearable Technology Device क्या होता है?", options: [{ en: "A digital device designed to be worn on the body", hi: "शरीर पर पहनने के लिए बनाया गया डिजिटल डिवाइस" }, { en: "A desktop printer", hi: "Desktop Printer" }, { en: "A paper notebook", hi: "कागज़ी Notebook" }, { en: "A router installed underground", hi: "भूमिगत लगाया गया Router" }], correctAnswer: 0 },
  { question: "What is a chatbot?", questionHindi: "Chatbot क्या होता है?", options: [{ en: "Software that interacts with users through conversational messages", hi: "संवादात्मक संदेशों के माध्यम से उपयोगकर्ता से बात करने वाला सॉफ्टवेयर" }, { en: "A computer's cooling fan", hi: "कंप्यूटर का Cooling Fan" }, { en: "A type of data cable", hi: "Data Cable का प्रकार" }, { en: "A spreadsheet chart", hi: "स्प्रेडशीट Chart" }], correctAnswer: 0 },
  { question: "What is a recommendation system?", questionHindi: "Recommendation System क्या होता है?", options: [{ en: "A system that suggests items based on data or user preferences", hi: "डेटा या उपयोगकर्ता पसंद के आधार पर चीज़ें सुझाने वाला सिस्टम" }, { en: "A system that repairs a monitor", hi: "मॉनिटर ठीक करने वाला सिस्टम" }, { en: "A tool for printing invoices only", hi: "केवल Invoice प्रिंट करने वाला टूल" }, { en: "A type of computer virus", hi: "कंप्यूटर वायरस का प्रकार" }], correctAnswer: 0 },
  { question: "What is a common risk of biased training data in AI?", questionHindi: "AI में पक्षपाती Training Data का सामान्य जोखिम क्या है?", options: [{ en: "The system may produce unfair or skewed results", hi: "सिस्टम अनुचित या पक्षपाती परिणाम दे सकता है" }, { en: "The keyboard stops working", hi: "कीबोर्ड काम करना बंद कर देता है" }, { en: "The screen becomes larger", hi: "स्क्रीन बड़ी हो जाती है" }, { en: "The Internet becomes unnecessary", hi: "Internet अनावश्यक हो जाता है" }], correctAnswer: 0 },
  { question: "Why is human oversight important when using AI for consequential decisions?", questionHindi: "महत्वपूर्ण निर्णयों में AI उपयोग करते समय Human Oversight क्यों जरूरी है?", options: [{ en: "People can review context, errors, fairness, and accountability", hi: "लोग संदर्भ, गलतियाँ, निष्पक्षता और जवाबदेही की समीक्षा कर सकते हैं" }, { en: "AI outputs are always perfect", hi: "AI Output हमेशा पूर्ण होते हैं" }, { en: "It removes the need to protect data", hi: "इससे डेटा सुरक्षा की जरूरत हटती है" }, { en: "It guarantees every decision is legal", hi: "यह हर निर्णय के कानूनी होने की गारंटी देता है" }], correctAnswer: 0 },
  { question: "What is digital literacy?", questionHindi: "Digital Literacy क्या है?", options: [{ en: "The ability to use digital tools safely, effectively, and critically", hi: "डिजिटल टूल सुरक्षित, प्रभावी और आलोचनात्मक ढंग से उपयोग करने की क्षमता" }, { en: "Knowing only how to switch on a monitor", hi: "केवल मॉनिटर चालू करना जानना" }, { en: "A type of digital bank account", hi: "Digital Bank Account का प्रकार" }, { en: "A computer's storage format", hi: "कंप्यूटर Storage Format" }], correctAnswer: 0 },
  { question: "What is critical thinking?", questionHindi: "Critical Thinking क्या है?", options: [{ en: "Evaluating evidence and reasoning before reaching a conclusion", hi: "निष्कर्ष से पहले प्रमाण और तर्क का मूल्यांकन करना" }, { en: "Accepting every claim immediately", hi: "हर दावे को तुरंत स्वीकार करना" }, { en: "Memorizing passwords publicly", hi: "पासवर्ड सार्वजनिक रूप से याद करना" }, { en: "Avoiding all questions", hi: "सभी प्रश्नों से बचना" }], correctAnswer: 0 },
  { question: "Why is problem-solving considered an important workplace skill?", questionHindi: "कार्यस्थल पर Problem-solving को महत्वपूर्ण कौशल क्यों माना जाता है?", options: [{ en: "It helps identify issues, compare options, and select workable solutions", hi: "यह समस्या पहचानने, विकल्पों की तुलना और व्यावहारिक समाधान चुनने में मदद करता है" }, { en: "It prevents all change", hi: "यह हर बदलाव रोकता है" }, { en: "It replaces communication", hi: "यह Communication का स्थान लेता है" }, { en: "It guarantees every plan succeeds", hi: "यह हर योजना सफल होने की गारंटी देता है" }], correctAnswer: 0 },
  { question: "What is collaboration?", questionHindi: "Collaboration क्या है?", options: [{ en: "Working with others toward a shared goal", hi: "साझा लक्ष्य के लिए दूसरों के साथ काम करना" }, { en: "Keeping all information secret from teammates", hi: "सारी जानकारी टीम से छिपाना" }, { en: "Avoiding feedback", hi: "Feedback से बचना" }, { en: "Using a computer alone", hi: "कंप्यूटर अकेले उपयोग करना" }], correctAnswer: 0 },
  { question: "What is effective digital communication?", questionHindi: "प्रभावी Digital Communication क्या है?", options: [{ en: "Sharing clear, appropriate messages through suitable digital channels", hi: "उपयुक्त Digital Channel से स्पष्ट और उचित संदेश साझा करना" }, { en: "Sending every message to everyone", hi: "हर संदेश सभी को भेजना" }, { en: "Using unclear abbreviations in every context", hi: "हर संदर्भ में अस्पष्ट संक्षेप उपयोग करना" }, { en: "Sharing private details publicly", hi: "निजी विवरण सार्वजनिक साझा करना" }], correctAnswer: 0 },
  { question: "What is adaptability?", questionHindi: "Adaptability क्या है?", options: [{ en: "Adjusting constructively to new conditions or requirements", hi: "नई परिस्थितियों या जरूरतों के अनुसार रचनात्मक रूप से ढलना" }, { en: "Refusing to learn anything new", hi: "कुछ नया सीखने से इनकार करना" }, { en: "Using only outdated tools", hi: "केवल पुराने टूल उपयोग करना" }, { en: "Avoiding every workplace change", hi: "कार्यस्थल के हर बदलाव से बचना" }], correctAnswer: 0 },
  { question: "What is lifelong learning?", questionHindi: "Lifelong Learning क्या है?", options: [{ en: "Continuously developing knowledge and skills over time", hi: "समय के साथ ज्ञान और कौशल लगातार विकसित करना" }, { en: "Studying only before an examination", hi: "केवल परीक्षा से पहले पढ़ना" }, { en: "Avoiding all training", hi: "सभी प्रशिक्षण से बचना" }, { en: "Using one skill forever without review", hi: "बिना समीक्षा एक ही कौशल हमेशा उपयोग करना" }], correctAnswer: 0 },
  { question: "What is time management?", questionHindi: "Time Management क्या है?", options: [{ en: "Planning and prioritizing work to use time effectively", hi: "समय का प्रभावी उपयोग करने के लिए काम की योजना और प्राथमिकता तय करना" }, { en: "Doing tasks without any order", hi: "बिना क्रम के कार्य करना" }, { en: "Avoiding deadlines", hi: "समय-सीमा से बचना" }, { en: "Extending every meeting", hi: "हर Meeting बढ़ाना" }], correctAnswer: 0 },
  { question: "What is emotional intelligence?", questionHindi: "Emotional Intelligence क्या है?", options: [{ en: "Recognizing and managing one's emotions and understanding others' emotions", hi: "अपनी भावनाएँ पहचानना-संभालना और दूसरों की भावनाएँ समझना" }, { en: "Measuring a computer's processor speed", hi: "कंप्यूटर Processor की गति मापना" }, { en: "Memorizing every email", hi: "हर ई-मेल याद करना" }, { en: "A type of artificial intelligence chip", hi: "Artificial Intelligence Chip का प्रकार" }], correctAnswer: 0 },
  { question: "What is entrepreneurship?", questionHindi: "Entrepreneurship क्या है?", options: [{ en: "Identifying opportunities and organizing resources to create value", hi: "मूल्य बनाने के लिए अवसर पहचानना और संसाधन व्यवस्थित करना" }, { en: "Avoiding all responsibility", hi: "सभी जिम्मेदारी से बचना" }, { en: "Using only government computers", hi: "केवल Government Computer उपयोग करना" }, { en: "A method of sorting email", hi: "ई-मेल Sort करने की विधि" }], correctAnswer: 0 },
  { question: "What is a business model?", questionHindi: "Business Model क्या होता है?", options: [{ en: "A description of how an organization creates, delivers, and captures value", hi: "संस्था मूल्य कैसे बनाती, पहुँचाती और प्राप्त करती है इसका वर्णन" }, { en: "A computer's physical shape", hi: "कंप्यूटर का भौतिक आकार" }, { en: "A type of email signature", hi: "ई-मेल Signature का प्रकार" }, { en: "A list of keyboard keys", hi: "Keyboard Keys की सूची" }], correctAnswer: 0 },
  { question: "What is design thinking commonly used for?", questionHindi: "Design Thinking का सामान्य उपयोग क्या है?", options: [{ en: "Understanding user needs and developing, testing, and improving solutions", hi: "उपयोगकर्ता की जरूरत समझकर समाधान विकसित, जाँच और बेहतर करना" }, { en: "Avoiding feedback from users", hi: "उपयोगकर्ता Feedback से बचना" }, { en: "Replacing every business process with AI", hi: "हर Business Process को AI से बदलना" }, { en: "Printing a spreadsheet", hi: "स्प्रेडशीट प्रिंट करना" }], correctAnswer: 0 },
  { question: "What is prototyping?", questionHindi: "Prototyping क्या है?", options: [{ en: "Creating an early model to explore or test an idea", hi: "विचार खोजने या जाँचने के लिए प्रारंभिक मॉडल बनाना" }, { en: "Launching a final product without testing", hi: "बिना जाँच अंतिम उत्पाद Launch करना" }, { en: "Deleting user requirements", hi: "उपयोगकर्ता आवश्यकताएँ हटाना" }, { en: "A type of secure password", hi: "सुरक्षित पासवर्ड का प्रकार" }], correctAnswer: 0 },
  { question: "What is agile project work generally characterized by?", questionHindi: "Agile Project Work की सामान्य विशेषता क्या है?", options: [{ en: "Iterative work, feedback, and adaptation", hi: "बार-बार चरणों में काम, Feedback और अनुकूलन" }, { en: "One fixed plan with no review", hi: "बिना समीक्षा की एक स्थिर योजना" }, { en: "No communication within a team", hi: "टीम में Communication न होना" }, { en: "Delivering only after all learning stops", hi: "सीखना बंद होने पर ही Deliver करना" }], correctAnswer: 0 }
];

function replaceQuestion(index, question, questionHindi, options) {
  futureSkillsQuestionBank[index] = { question, questionHindi, options, correctAnswer: 0 };
}

replaceQuestion(10, "What is digital transformation?", "Digital Transformation क्या है?", [
  { en: "Using digital technology to substantially improve how an organization works or serves people", hi: "डिजिटल तकनीक से संस्था के काम या सेवा देने के तरीके में सार्थक सुधार करना" },
  { en: "Replacing every worker with a computer", hi: "हर कर्मचारी को कंप्यूटर से बदल देना" },
  { en: "Scanning one paper document", hi: "एक कागज़ी दस्तावेज़ Scan करना" },
  { en: "Moving a file to another folder", hi: "एक File दूसरे Folder में रखना" }
]);
replaceQuestion(11, "Which example best describes a smart home?", "Smart Home का सबसे अच्छा उदाहरण कौन-सा है?", [
  { en: "Connected lights and sensors that can be monitored or controlled through a network", hi: "Network से देखी या नियंत्रित की जा सकने वाली Connected Lights और Sensors" },
  { en: "A house with no electrical devices", hi: "बिना बिजली के उपकरणों वाला घर" },
  { en: "A printed floor plan", hi: "छपा हुआ Floor Plan" },
  { en: "A computer used only for typing", hi: "केवल Typing के लिए उपयोग किया गया Computer" }
]);
replaceQuestion(12, "How can a smart city use technology to improve a public service?", "Smart City सार्वजनिक सेवा बेहतर करने के लिए तकनीक का उपयोग कैसे कर सकता है?", [
  { en: "Use connected sensors and data to manage services such as traffic or street lighting", hi: "Traffic या Street Lighting जैसी सेवाएँ सँभालने के लिए Connected Sensors और Data उपयोग करना" },
  { en: "Publish residents' private data for everyone", hi: "निवासियों का निजी Data सभी के लिए प्रकाशित करना" },
  { en: "Disconnect all public infrastructure", hi: "सभी सार्वजनिक Infrastructure Disconnect करना" },
  { en: "Replace every public service with a paper form", hi: "हर सार्वजनिक सेवा को कागज़ी Form से बदलना" }
]);
replaceQuestion(18, "An organization analyzes customer data. Which practice best protects data privacy?", "कोई संस्था ग्राहक Data का विश्लेषण करती है। Data Privacy की सुरक्षा का अच्छा तरीका कौन-सा है?", [
  { en: "Collect only necessary data, restrict access, and explain its use", hi: "केवल आवश्यक Data लें, पहुँच सीमित रखें और उपयोग स्पष्ट करें" },
  { en: "Publish identifiable records for convenience", hi: "सुविधा के लिए पहचान योग्य Records प्रकाशित करें" },
  { en: "Keep data forever without a purpose", hi: "बिना उद्देश्य Data हमेशा रखें" },
  { en: "Share account credentials with all analysts", hi: "सभी Analysts से Account Credentials साझा करें" }
]);
replaceQuestion(25, "Which practice supports productive remote work?", "कौन-सा अभ्यास उत्पादक Remote Work में मदद करता है?", [
  { en: "Agree on goals, communication channels, and secure access to shared files", hi: "लक्ष्य, Communication Channel और साझा Files की सुरक्षित पहुँच तय करना" },
  { en: "Send confidential work through public accounts", hi: "गोपनीय काम Public Account से भेजना" },
  { en: "Avoid documenting tasks or decisions", hi: "काम या निर्णयों का विवरण न रखना" },
  { en: "Schedule every meeting without an agenda", hi: "बिना Agenda हर Meeting तय करना" }
]);
replaceQuestion(26, "What is a useful benefit of online learning?", "Online Learning का उपयोगी लाभ क्या है?", [
  { en: "Learners can access lessons and practice from different locations and times", hi: "सीखने वाले अलग-अलग स्थानों और समय पर पाठ तथा अभ्यास कर सकते हैं" },
  { en: "It guarantees that every learner passes", hi: "यह हर विद्यार्थी के पास होने की गारंटी देता है" },
  { en: "It removes the need to check information", hi: "यह जानकारी जाँचने की जरूरत हटा देता है" },
  { en: "It works only when devices are offline", hi: "यह केवल Offline Device पर चलता है" }
]);
replaceQuestion(27, "What is video conferencing commonly used for in a digital workplace?", "Digital Workplace में Video Conferencing का सामान्य उपयोग क्या है?", [
  { en: "Holding live meetings with audio and video over a network", hi: "Network पर Audio और Video से Live Meeting करना" },
  { en: "Creating a permanent data backup automatically", hi: "अपने-आप स्थायी Data Backup बनाना" },
  { en: "Replacing all written communication", hi: "सभी लिखित Communication को बदलना" },
  { en: "Measuring a computer's storage capacity", hi: "Computer की Storage Capacity मापना" }
]);
replaceQuestion(28, "Which activity is an example of digital marketing?", "Digital Marketing का उदाहरण कौन-सी गतिविधि है?", [
  { en: "Promoting a product through a website, search, email, or social media", hi: "Website, Search, Email या Social Media से उत्पाद का प्रचार करना" },
  { en: "Repairing a computer monitor", hi: "Computer Monitor ठीक करना" },
  { en: "Storing files only on a local disk", hi: "Files केवल Local Disk पर रखना" },
  { en: "Printing a private letter", hi: "निजी पत्र Print करना" }
]);
replaceQuestion(29, "What is e-commerce?", "E-Commerce क्या है?", [
  { en: "Buying or selling goods and services through electronic networks", hi: "Electronic Network के माध्यम से वस्तुओं और सेवाओं को खरीदना या बेचना" },
  { en: "Writing a document without a computer", hi: "Computer के बिना Document लिखना" },
  { en: "Repairing a network cable", hi: "Network Cable ठीक करना" },
  { en: "A method of compressing images", hi: "चित्रों को Compress करने की विधि" }
]);
replaceQuestion(31, "Which habit supports digital well-being?", "Digital Well-being में कौन-सी आदत सहायक है?", [
  { en: "Balance screen time with breaks, sleep, and offline activities", hi: "Screen Time के साथ Break, नींद और Offline गतिविधियों का संतुलन रखें" },
  { en: "Keep notifications on during every activity", hi: "हर गतिविधि के दौरान Notifications चालू रखें" },
  { en: "Use a screen continuously without rest", hi: "बिना आराम लगातार Screen उपयोग करें" },
  { en: "Share personal details to gain more followers", hi: "अधिक Followers के लिए निजी विवरण साझा करें" }
]);
replaceQuestion(33, "Which is an example of an online service?", "Online Service का उदाहरण कौन-सा है?", [
  { en: "Booking an appointment or accessing a public service through an official portal", hi: "Official Portal से Appointment Book करना या सार्वजनिक सेवा लेना" },
  { en: "Rewiring a computer power supply", hi: "Computer Power Supply की Wiring बदलना" },
  { en: "Writing a note on paper", hi: "कागज़ पर Note लिखना" },
  { en: "Changing a keyboard key", hi: "Keyboard की Key बदलना" }
]);
replaceQuestion(44, "A team has members with different ideas. What behavior best demonstrates creativity?", "टीम के सदस्यों के विचार अलग-अलग हैं। कौन-सा व्यवहार Creativity दर्शाता है?", [
  { en: "Explore original options and combine useful ideas into a workable solution", hi: "नए विकल्प खोजें और उपयोगी विचारों को व्यावहारिक समाधान में जोड़ें" },
  { en: "Reject every suggestion before considering it", hi: "हर सुझाव पर विचार से पहले उसे अस्वीकार करें" },
  { en: "Copy another team's solution without checking the need", hi: "जरूरत जाँचे बिना दूसरी टीम का समाधान Copy करें" },
  { en: "Avoid testing any new approach", hi: "किसी नए तरीके को जाँचने से बचें" }
]);
replaceQuestion(46, "What is digital entrepreneurship?", "Digital Entrepreneurship क्या है?", [
  { en: "Creating or growing a venture using digital tools, platforms, or services", hi: "Digital Tool, Platform या Service से नया व्यवसाय बनाना या बढ़ाना" },
  { en: "Using a computer only to store personal photos", hi: "Computer का उपयोग केवल निजी फोटो रखने के लिए करना" },
  { en: "Avoiding customer feedback", hi: "Customer Feedback से बचना" },
  { en: "Replacing a business plan with a password", hi: "Business Plan को Password से बदलना" }
]);
replaceQuestion(48, "Which choice is an example of green technology?", "Green Technology का उदाहरण कौन-सा है?", [
  { en: "A system designed to reduce energy use or environmental impact", hi: "ऊर्जा उपयोग या पर्यावरणीय प्रभाव घटाने के लिए बनाया गया System" },
  { en: "A device that wastes power when idle", hi: "Idle रहने पर बिजली बर्बाद करने वाला Device" },
  { en: "Discarding usable electronics with ordinary waste", hi: "उपयोगी Electronics को सामान्य कचरे में फेंकना" },
  { en: "Printing every digital record several times", hi: "हर Digital Record कई बार Print करना" }
]);
replaceQuestion(49, "How can automation affect jobs and the future of work?", "Automation नौकरियों और काम के भविष्य को कैसे प्रभावित कर सकता है?", [
  { en: "It can automate some tasks while increasing demand for other skills and roles", hi: "यह कुछ काम स्वचालित कर सकता है और अन्य कौशलों तथा भूमिकाओं की माँग बढ़ा सकता है" },
  { en: "It guarantees that every job will disappear", hi: "यह हर नौकरी समाप्त होने की गारंटी देता है" },
  { en: "It removes the value of learning new skills", hi: "यह नए कौशल सीखने का महत्व समाप्त करता है" },
  { en: "It affects only paper-based work", hi: "यह केवल कागज़ी काम को प्रभावित करता है" }
]);
replaceQuestion(13, "What is digital collaboration?", "Digital Collaboration क्या है?", [
  { en: "Using digital tools to coordinate and work together on shared tasks", hi: "साझा कार्यों पर समन्वय और सहयोग के लिए Digital Tools उपयोग करना" },
  { en: "Sending files without considering access permissions", hi: "Access Permission देखे बिना Files भेजना" },
  { en: "Working separately without sharing relevant updates", hi: "प्रासंगिक Update साझा किए बिना अलग-अलग काम करना" },
  { en: "Replacing all teamwork with automated messages", hi: "पूरे Teamwork को Automated Message से बदलना" }
]);
replaceQuestion(39, "What is effective teamwork?", "प्रभावी Teamwork क्या है?", [
  { en: "Coordinating responsibilities and contributing toward a shared goal", hi: "जिम्मेदारियों का समन्वय करके साझा लक्ष्य में योगदान देना" },
  { en: "Hiding task progress from other members", hi: "अन्य सदस्यों से काम की प्रगति छिपाना" },
  { en: "Avoiding communication and feedback", hi: "Communication और Feedback से बचना" },
  { en: "Letting one person do every task without discussion", hi: "बिना चर्चा एक व्यक्ति से हर काम करवाना" }
]);
replaceQuestion(47, "How can design thinking support innovation?", "Design Thinking Innovation में कैसे मदद कर सकती है?", [
  { en: "By understanding user needs, testing ideas, and improving solutions", hi: "उपयोगकर्ता की जरूरत समझकर, विचारों की जाँच और समाधान बेहतर करके" },
  { en: "By avoiding feedback and keeping assumptions unchanged", hi: "Feedback से बचकर और धारणाएँ बिना बदले रखकर" },
  { en: "By copying a solution without checking the problem", hi: "समस्या जाँचे बिना समाधान Copy करके" },
  { en: "By launching an idea without testing it", hi: "विचार की जाँच किए बिना उसे Launch करके" }
]);
replaceQuestion(48, "Which choice is an example of green or sustainable technology?", "Green या Sustainable Technology का उदाहरण कौन-सा है?", [
  { en: "A system designed to reduce energy use or environmental impact", hi: "ऊर्जा उपयोग या पर्यावरणीय प्रभाव घटाने के लिए बनाया गया System" },
  { en: "A device that wastes power when idle", hi: "Idle रहने पर बिजली बर्बाद करने वाला Device" },
  { en: "Discarding usable electronics with ordinary waste", hi: "उपयोगी Electronics को सामान्य कचरे में फेंकना" },
  { en: "Printing every digital record several times", hi: "हर Digital Record कई बार Print करना" }
]);
replaceQuestion(35, "Why is human oversight important for ethical AI use in consequential decisions?", "महत्वपूर्ण निर्णयों में Ethical AI उपयोग के लिए Human Oversight क्यों जरूरी है?", [
  { en: "People can review context, errors, fairness, and accountability", hi: "लोग संदर्भ, गलतियाँ, निष्पक्षता और जवाबदेही की समीक्षा कर सकते हैं" },
  { en: "AI outputs are always perfect", hi: "AI Output हमेशा पूर्ण होते हैं" },
  { en: "It removes the need to protect data", hi: "इससे डेटा सुरक्षा की जरूरत हटती है" },
  { en: "It guarantees every decision is legal", hi: "यह हर निर्णय के कानूनी होने की गारंटी देता है" }
]);

const difficulties = [
  "Easy", "Easy", "Moderate", "Easy", "Moderate", "Moderate", "Easy", "Moderate", "Easy", "Easy",
  "Moderate", "Easy", "Moderate", "Moderate", "Easy", "Moderate", "Hard", "Easy", "Hard", "Moderate",
  "Easy", "Easy", "Moderate", "Moderate", "Easy", "Moderate", "Easy", "Moderate", "Moderate", "Easy",
  "Moderate", "Easy", "Moderate", "Easy", "Moderate", "Hard", "Moderate", "Easy", "Moderate", "Hard",
  "Easy", "Moderate", "Easy", "Moderate", "Moderate", "Easy", "Moderate", "Hard", "Moderate", "Hard"
];

const explanations = [
  "Future skills help people adapt to changing technologies, tasks, and work environments.",
  "AI enables computer systems to perform tasks associated with human intelligence.",
  "Machine learning finds patterns in data and uses them to make predictions or decisions.",
  "Generative AI produces new content, but its output should not be assumed to be correct.",
  "AI-generated content can be inaccurate, biased, or based on outdated information.",
  "A prompt is the input or instruction that guides a generative model.",
  "IoT stands for Internet of Things.",
  "IoT devices can sense conditions and exchange data over a network.",
  "A connected sensor that reports readings is a common IoT application.",
  "Cloud computing provides computing resources and services over a network.",
  "Digital transformation uses technology to meaningfully change or improve processes and services.",
  "A smart home uses connected devices that can be monitored or controlled through a network.",
  "Smart-city systems use connected data and technology to improve public infrastructure and services.",
  "Digital collaboration uses shared tools to coordinate tasks while managing access to shared resources.",
  "Big Data refers to datasets whose scale or complexity may need specialized processing.",
  "Data analytics examines data for patterns and insights that support decisions.",
  "Data visualization presents data graphically to make patterns easier to understand.",
  "Blockchain is a distributed ledger that records information in linked blocks.",
  "Data minimization, access limits, and clear purpose help protect customer privacy.",
  "A smart contract is code that can execute defined rules on a blockchain.",
  "AR adds digital content to a view of the real world.",
  "VR provides an immersive computer-generated environment.",
  "Robotics brings engineering, sensing, control, and computing together to operate robots.",
  "Automation uses technology to perform tasks with less manual intervention.",
  "3D printing builds an object by adding material layer by layer.",
  "Remote teams work better when goals, communication channels, and secure file access are agreed.",
  "Online learning gives learners access to lessons and practice across locations and schedules.",
  "Video conferencing supports live audio-video meetings over a network.",
  "Digital marketing promotes products or services through digital channels.",
  "E-commerce is the electronic buying and selling of goods or services.",
  "Sensors detect or measure physical conditions in a smart system.",
  "Balancing screen use with rest and offline activity supports digital well-being.",
  "Chatbots interact with users through conversational messages.",
  "Online services let people complete tasks such as appointments through digital portals.",
  "Biased training data can cause an AI system to produce unfair or skewed results.",
  "Human oversight helps review context, errors, fairness, and accountability in consequential uses.",
  "Digital literacy includes using technology safely, effectively, and critically.",
  "Critical thinking evaluates evidence and reasoning before reaching a conclusion.",
  "Problem solving identifies an issue, considers options, and selects a workable response.",
  "Effective teamwork coordinates responsibilities and contributions toward a shared goal.",
  "Effective digital communication is clear, suitable for the channel, and appropriate to the audience.",
  "Adaptability means adjusting constructively to new conditions or requirements.",
  "Lifelong learning develops knowledge and skills continuously over time.",
  "Time management plans and prioritizes tasks to use time effectively.",
  "Creativity explores original ideas and combines them into useful solutions.",
  "Entrepreneurship identifies opportunities and organizes resources to create value.",
  "Digital entrepreneurship builds or grows a venture using digital platforms and tools.",
  "Design thinking supports innovation by grounding ideas in user needs and iteratively testing solutions.",
  "Green or sustainable technology aims to reduce energy use and environmental impact over time.",
  "Automation can change tasks and increase demand for different skills; its effects vary by role and industry."
];

const answerPositions = [0, 0, 2, 0, 0, 1, 0, 0, 3, 1, 3, 1, 2, 2, 1, 3, 0, 3, 1, 0, 2, 0, 2, 3, 0, 2, 3, 1, 3, 0, 0, 3, 3, 1, 3, 1, 3, 1, 2, 2, 1, 3, 1, 2, 2, 1, 2, 0, 2, 1];

window.futureSkillsQuestions = futureSkillsQuestionBank.map(function (item, index) {
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