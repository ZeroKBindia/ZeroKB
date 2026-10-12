(function (global) {
    const HISTORY_KEY = "zerokb_custom_test_history";
    const ATTEMPTS_KEY = "zerokb_custom_test_attempts";
    const BOOKMARK_KEY = "zerokb_bookmarked_questions";
    const CHAPTERS = [
        { id: "computer-fundamentals", label: "Computer Fundamentals" },
        { id: "operating-system", label: "Operating System" },
        { id: "word-processing", label: "Word Processing" },
        { id: "spreadsheet", label: "Spreadsheet" },
        { id: "internet-email", label: "Internet & E-mail" },
        { id: "digital-financial-services", label: "Digital & Financial Services" },
        { id: "cyber-security", label: "Cyber Security" },
        { id: "future-skills", label: "Future Skills" }
    ];

    const DIFFICULTY_ORDER = ["Easy", "Moderate", "Hard"];
    const CHAPTER_LOOKUP = new Map();

    function normalizeLabel(value) {
        return String(value || "").normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, "");
    }

    CHAPTERS.forEach(function (chapter) {
        CHAPTER_LOOKUP.set(normalizeLabel(chapter.id), chapter.id);
        CHAPTER_LOOKUP.set(normalizeLabel(chapter.label), chapter.id);
    });

    function normalizeCourse(value) {
        const course = normalizeLabel(value);
        if (course === "ccc") return "CCC";
        if (course === "olevel") return "O Level";
        return "";
    }

    function normalizeDifficulty(value) {
        const difficulty = normalizeLabel(value).replace(/(difficulty|level)$/, "");
        if (difficulty === "easy") return "Easy";
        if (difficulty === "moderate" || difficulty === "medium" || difficulty === "med") return "Moderate";
        if (difficulty === "hard") return "Hard";
        return "";
    }

    function resolveChapterId(value) {
        return CHAPTER_LOOKUP.get(normalizeLabel(value)) || "";
    }

    const state = {
        course: "CCC",
        chapterMode: "single",
        chapterSelection: [],
        difficultySelection: ["Moderate", "Hard"],
        questionCount: 20,
        timeMinutes: 20,
        questions: [],
        userAnswers: [],
        questionFlags: [],
        currentIndex: 0,
        timerHandle: null,
        timeEndsAt: 0,
        startedAt: 0,
        submitted: false
    };

    function readStorage(key, fallback) {
        try {
            const raw = global.localStorage.getItem(key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (_error) {
            return fallback;
        }
    }

    function writeStorage(key, value) {
        try {
            global.localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (_error) {
            return false;
        }
    }

    function shuffle(list, random) {
        const copy = list.slice();
        const randomValue = typeof random === "function" ? random : Math.random;
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const j = Math.floor(randomValue() * (index + 1));
            const temp = copy[index];
            copy[index] = copy[j];
            copy[j] = temp;
        }
        return copy;
    }

    function formatNumber(value) {
        return String(value).padStart(2, "0");
    }

    function formatClock(totalSeconds) {
        const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
        const minutes = Math.floor(safeSeconds / 60);
        const seconds = safeSeconds % 60;
        return formatNumber(minutes) + ":" + formatNumber(seconds);
    }

    function optionText(option) {
        if (typeof option === "string") return option;
        return option.en + " / " + option.hi;
    }

    function alphabetIndex(index) {
        return String.fromCharCode(65 + index);
    }

    function createQuestion(questionData, course, chapterId) {
        const metadataIssues = [];
        if (normalizeCourse(questionData.course) !== course) metadataIssues.push("course metadata does not match its bank");
        const declaredChapter = resolveChapterId(questionData.chapter);
        if (declaredChapter && declaredChapter !== chapterId) metadataIssues.push("chapter metadata does not match its bank section");
        const rawOptions = Array.isArray(questionData.options) ? questionData.options : [];
        return {
            id: questionData.id,
            course: course,
            chapterId: chapterId,
            chapter: questionData.chapter,
            difficulty: questionData.difficulty,
            questionEnglish: questionData.questionEnglish || questionData.questionHindi || "",
            questionHindi: questionData.questionHindi || questionData.questionEnglish || "",
            options: rawOptions.map(function (option) {
                if (typeof option === "string") {
                    return { en: option, hi: option };
                }
                const english = option && (option.en || option.hi) || "";
                const hindi = option && (option.hi || option.en) || "";
                return { en: english, hi: hindi };
            }),
            correctAnswer: questionData.correctAnswer,
            explanation: questionData.explanation || "",
            moduleId: questionData.moduleId || "",
            paperCode: questionData.paperCode || "",
            sourceType: questionData.sourceType || "",
            source: questionData.source || null,
            bankMetadataIssues: metadataIssues
        };
    }

    function buildQuestionBank() {
        const bank = { CCC: {}, "O Level": {} };

        function assignChapter(course, chapterId, questions) {
            bank[course][chapterId] = questions.map(function (question) {
                return createQuestion(question, course, chapterId);
            });
        }

        assignChapter("CCC", "computer-fundamentals", [
            { id: "CF-001", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Easy", questionEnglish: "Which component is known as the brain of the computer?", questionHindi: "किस घटक को कंप्यूटर का दिमाग कहा जाता है?", options: [{ en: "CPU", hi: "CPU" }, { en: "Monitor", hi: "मॉनीटर" }, { en: "Keyboard", hi: "कीबोर्ड" }, { en: "Printer", hi: "प्रिंटर" }], correctAnswer: 0, explanation: "CPU processes instructions and performs calculations, so it is called the brain of the computer." },
            { id: "CF-002", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Easy", questionEnglish: "Which memory is temporary and lost when the computer is switched off?", questionHindi: "कौन-सी मेमोरी अस्थायी होती है और कंप्यूटर बंद करने पर खत्म हो जाती है?", options: [{ en: "ROM", hi: "ROM" }, { en: "RAM", hi: "RAM" }, { en: "Hard disk", hi: "हार्ड डिस्क" }, { en: "SSD", hi: "SSD" }], correctAnswer: 1, explanation: "RAM is volatile memory and it loses data when power is turned off." },
            { id: "CF-003", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Moderate", questionEnglish: "What happens when you press Ctrl + C while working in a command-line interface?", questionHindi: "कमान-लाइन इंटरफेस में Ctrl + C दबाने पर क्या होता है?", options: [{ en: "It copies the selected text", hi: "यह चयनित टेक्स्ट कॉपी करता है" }, { en: "It cancels the current process or command", hi: "यह वर्तमान प्रक्रिया या कमांड को रद्द करता है" }, { en: "It opens the calculator", hi: "यह कैलकुलेटर खोलता है" }, { en: "It saves the document", hi: "यह दस्तावेज़ सेव करता है" }], correctAnswer: 1, explanation: "Ctrl + C is commonly used to interrupt or terminate the current running process in command-line environments." },
            { id: "CF-004", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Moderate", questionEnglish: "Which device is used to input text and commands into a computer?", questionHindi: "कंप्यूटर में टेक्स्ट और कमांड डालने के लिए किस डिवाइस का उपयोग किया जाता है?", options: [{ en: "Mouse", hi: "माउस" }, { en: "Keyboard", hi: "कीबोर्ड" }, { en: "Monitor", hi: "मॉनीटर" }, { en: "Speaker", hi: "स्पीकर" }], correctAnswer: 1, explanation: "Keyboard is used to enter commands and data into a computer system." },
            { id: "CF-005", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Hard", questionEnglish: "Why is binary used internally by computers?", questionHindi: "कंप्यूटर आंतरिक रूप से बाइनरी का उपयोग क्यों करता है?", options: [{ en: "Because it uses two-state electrical signals easily represented as on and off", hi: "क्योंकि यह दो-स्थिति बिजली संकेतों का उपयोग करता है, जिन्हें ऑन और ऑफ के रूप में सरलता से दर्शाया जा सकता है" }, { en: "Because it helps audio output", hi: "क्योंकि यह ऑडियो आउटपुट में मदद करता है" }, { en: "Because it stores images in color", hi: "क्योंकि यह इमेजेस को रंग में संग्रहीत करता है" }, { en: "Because it creates human-readable text", hi: "क्योंकि यह इंसानी पठनीय टेक्स्ट बनाता है" }], correctAnswer: 0, explanation: "Computers process electrical signals in two states, which maps naturally to binary digits 0 and 1." },
            { id: "CF-006", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Moderate", questionEnglish: "Which of the following is an example of application software?", questionHindi: "निम्नलिखित में से कौन-सा एप्लीकेशन सॉफ्टवेयर का उदाहरण है?", options: [{ en: "Windows 11", hi: "Windows 11" }, { en: "Microsoft Word", hi: "Microsoft Word" }, { en: "Linux kernel", hi: "Linux kernel" }, { en: "BIOS", hi: "BIOS" }], correctAnswer: 1, explanation: "Application software is used to perform user-specific tasks such as word processing, presentation design and spreadsheets." },
            { id: "CF-007", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Easy", questionEnglish: "Which device is best suited for scanning printed documents into a computer?", questionHindi: "प्रिंटेड दस्तावेज़ों को कंप्यूटर में स्कैन करने के लिए किस डिवाइस का उपयोग सबसे अच्छा है?", options: [{ en: "Scanner", hi: "स्कैनर" }, { en: "Projector", hi: "प्रोजेक्टर" }, { en: "Plotter", hi: "प्लॉटter" }, { en: "Webcam", hi: "वेबकैम" }], correctAnswer: 0, explanation: "A scanner converts a physical document into a digital format for the computer to process." },
            { id: "CF-008", course: "CCC", chapter: "Computer Fundamentals", difficulty: "Hard", questionEnglish: "A file is saved in a computer system. Which storage is most appropriate for fast access and low cost?", questionHindi: "कंप्यूटर सिस्टम में फाइल सेव की जाती है। तेज़ पहुँच और कम लागत के लिए सबसे उपयुक्त स्टोरेज कौन-सा है?", options: [{ en: "Registers", hi: "रजिस्टर" }, { en: "Cache", hi: "कैश" }, { en: "SSD", hi: "SSD" }, { en: "Magnetic tape", hi: "मैग्नेटिक टेप" }], correctAnswer: 2, explanation: "SSD provides faster access than magnetic tape and is a common balance between speed and cost for personal devices." }
        ]);

        assignChapter("O Level", "computer-fundamentals", [
            { id: "CF-101", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Moderate", questionEnglish: "Which of the following best describes a system bus?", questionHindi: "निम्नलिखित में से कौन-सा सिस्टम बस का सही वर्णन है?", options: [{ en: "It connects CPU, memory and I/O devices for communication", hi: "यह CPU, मेमोरी और I/O डिवाइस को संचार के लिए जोड़ता है" }, { en: "It stores the operating system permanently", hi: "यह ऑपरेटिंग सिस्टम को स्थायी रूप से संग्रहीत करता है" }, { en: "It prints output on paper", hi: "यह पेपर पर आउटपुट प्रिंट करता है" }, { en: "It protects the monitor from power spikes", hi: "यह मॉनीटर को पावर स्पाइक्स से बचाता है" }], correctAnswer: 0, explanation: "The system bus is the communication pathway between CPU, memory, and peripheral devices." },
            { id: "CF-102", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Moderate", questionEnglish: "Which statement about cache memory is correct?", questionHindi: "कैश मेमोरी के बारे में सही कथन चुनें।", options: [{ en: "It is slower than RAM and used for long-term storage", hi: "यह RAM से धीमी है और दीर्घकालिक भंडारण के लिए उपयोग की जाती है" }, { en: "It is a small high-speed memory used to reduce CPU access time", hi: "यह छोटी, तेज़ मेमोरी है जो CPU के एक्सेस समय को कम करती है" }, { en: "It is only used in printers", hi: "यह केवल प्रिंटर में उपयोग की जाती है" }, { en: "It stores all files permanently", hi: "यह सभी फाइलों को स्थायी रूप से संग्रहीत करती है" }], correctAnswer: 1, explanation: "Cache memory provides rapid access to frequently used instructions and data, reducing latency." },
            { id: "CF-103", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Easy", questionEnglish: "Which number system has digits 0 to 9 and A to F?", questionHindi: "कौन-सी संख्या पद्धति में 0 से 9 और A से F अंक होते हैं?", options: [{ en: "Binary", hi: "बाइनरी" }, { en: "Octal", hi: "ऑक्टल" }, { en: "Hexadecimal", hi: "हेक्साडेसिमल" }, { en: "Decimal", hi: "डेसिमल" }], correctAnswer: 2, explanation: "Hexadecimal uses 16 symbols including 0-9 and A-F, making it convenient for digital systems." },
            { id: "CF-104", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Hard", questionEnglish: "Which of the following best explains the purpose of a BIOS/UEFI?", questionHindi: "BIOS/UEFI का उद्देश्य सबसे सही तरीके से किस विकल्प में बताया गया है?", options: [{ en: "To manage user accounts only", hi: "केवल उपयोगकर्ता खातों का प्रबंधन करना" }, { en: "To initialize hardware and boot the operating system", hi: "हार्डवेयर को प्रारंभ करना और ऑपरेटिंग सिस्टम को बूट करना" }, { en: "To act as a word processor", hi: "एक वर्ड प्रोसेसर जैसा कार्य करना" }, { en: "To render graphics only", hi: "केवल ग्राफिक्स दिखाना" }], correctAnswer: 1, explanation: "BIOS or UEFI initializes system hardware and loads the OS during startup." },
            { id: "CF-105", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Moderate", questionEnglish: "Which of the following is a volatile storage medium?", questionHindi: "निम्नलिखित में से कौन-सा वोलाटाइल स्टोरेज माध्यम है?", options: [{ en: "DVD", hi: "DVD" }, { en: "RAM", hi: "RAM" }, { en: "ROM", hi: "ROM" }, { en: "Optical disk", hi: "ऑप्टिकल डिस्क" }], correctAnswer: 1, explanation: "RAM is volatile and loses its contents when power is removed." },
            { id: "CF-106", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Hard", questionEnglish: "If a computer has 8-bit data bus width, what is the maximum value that can be transferred in one operation?", questionHindi: "यदि कंप्यूटर में 8-बिट डेटा बस चौड़ाई है, तो एक ऑपरेशन में अधिकतम कितनी मान transferred हो सकता है?", options: [{ en: "127", hi: "127" }, { en: "255", hi: "255" }, { en: "256", hi: "256" }, { en: "512", hi: "512" }], correctAnswer: 1, explanation: "An 8-bit bus can represent values from 0 to 255, which is 2^8 - 1 total states." },
            { id: "CF-107", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Easy", questionEnglish: "Which of the following is a primary memory device?", questionHindi: "निम्नलिखित में से कौन-सा primary memory device है?", options: [{ en: "Hard disk", hi: "हार्ड डिस्क" }, { en: "RAM", hi: "RAM" }, { en: "Pen drive", hi: "पेन ड्राइव" }, { en: "CD", hi: "CD" }], correctAnswer: 1, explanation: "RAM is a primary memory device used for active program execution and temporary data storage." },
            { id: "CF-108", course: "O Level", chapter: "Computer Fundamentals", difficulty: "Moderate", questionEnglish: "Which of the following best differentiates software from hardware?", questionHindi: "सॉफ्टवेयर और हार्डवेयर के बीच सबसे सही अंतर क्या है?", options: [{ en: "Hardware is intangible while software is physical", hi: "हार्डवेयर अमूर्त है जबकि सॉफ्टवेयर भौतिक है" }, { en: "Hardware is physical equipment while software is instructions and programs", hi: "हार्डवेयर भौतिक उपकरण है जबकि सॉफ्टवेयर निर्देश और प्रोग्राम है" }, { en: "Software is used only in operating systems", hi: "सॉफ्टवेयर केवल ऑपरेटिंग सिस्टम में उपयोग होता है" }, { en: "Hardware stores data permanently and software does not", hi: "हार्डवेयर स्थायी रूप से डेटा संग्रहीत करता है और सॉफ्टवेयर नहीं" }], correctAnswer: 1, explanation: "Hardware refers to physical components; software refers to logical instructions and digital programs that run on hardware." }
        ]);

        assignChapter("CCC", "operating-system", [
            { id: "OS-001", course: "CCC", chapter: "Operating System", difficulty: "Easy", questionEnglish: "What is the main purpose of an operating system?", questionHindi: "ऑपरेटिंग सिस्टम का मुख्य उद्देश्य क्या है?", options: [{ en: "To manage hardware and software resources", hi: "हार्डवेयर और सॉफ्टवेयर संसाधनों का प्रबंधन करना" }, { en: "To create internet pages", hi: "इंटरनेट पेज बनाना" }, { en: "To store videos permanently", hi: "वीडियो को स्थायी रूप से संग्रहित करना" }, { en: "To replace the processor", hi: "प्रोसेसर का स्थान लेना" }], correctAnswer: 0, explanation: "An operating system manages CPU, memory, storage, devices, and user applications." },
            { id: "OS-002", course: "CCC", chapter: "Operating System", difficulty: "Easy", questionEnglish: "Which operating system is commonly used on personal computers in many offices?", questionHindi: "कई कार्यालयों में व्यक्तिगत कंप्यूटरों पर सामान्यतः कौन-सा ऑपरेटिंग सिस्टम उपयोग किया जाता है?", options: [{ en: "Windows", hi: "Windows" }, { en: "Compiler", hi: "Compiler" }, { en: "Spreadsheet", hi: "Spreadsheet" }, { en: "Router", hi: "Router" }], correctAnswer: 0, explanation: "Windows is a widely used operating system for desktops and laptops." },
            { id: "OS-003", course: "CCC", chapter: "Operating System", difficulty: "Moderate", questionEnglish: "What does the taskbar usually display?", questionHindi: "टास्कबार सामान्यतः क्या दर्शाता है?", options: [{ en: "Only the current document", hi: "केवल वर्तमान दस्तावेज़" }, { en: "Running applications and system notifications", hi: "चल रहे एप्लिकेशन और सिस्टम सूचना" }, { en: "Only hard disk space", hi: "केवल हार्ड डिस्क स्थान" }, { en: "Internet browsing history", hi: "इंटरनेट ब्राउज़िंग इतिहास" }], correctAnswer: 1, explanation: "The taskbar shows open applications and system-related indicators in many operating systems." },
            { id: "OS-004", course: "CCC", chapter: "Operating System", difficulty: "Moderate", questionEnglish: "Which action is most appropriate when the system freezes?", questionHindi: "जब सिस्टम फ्रीज हो जाए तो कौन-सा कदम सबसे उपयुक्त है?", options: [{ en: "Shut down the system properly and restart it", hi: "सिस्टम को सही तरीके से बंद करें और फिर से शुरू करें" }, { en: "Delete the operating system files", hi: "ऑपरेटिंग सिस्टम फाइलें हटाएँ" }, { en: "Ignore the issue permanently", hi: "समस्या को स्थायी रूप से नजरअंदाज करें" }, { en: "Disconnect the monitor", hi: "मॉनीटर को अलग करें" }], correctAnswer: 0, explanation: "Restarting the system is often the safest first troubleshooting step for a freeze." },
            { id: "OS-005", course: "CCC", chapter: "Operating System", difficulty: "Hard", questionEnglish: "Why is multitasking important in modern operating systems?", questionHindi: "आधुनिक ऑपरेटिंग सिस्टम में मल्टीटास्किंग क्यों महत्वपूर्ण है?", options: [{ en: "It allows multiple processes to share CPU time efficiently", hi: "यह कई प्रोसेसों को CPU समय साझा करने की सुविधा देता है" }, { en: "It increases the size of RAM", hi: "यह RAM का आकार बढ़ाता है" }, { en: "It reduces internet connectivity", hi: "यह इंटरनेट कनेक्टिविटी कम करता है" }, { en: "It removes all files from storage", hi: "यह स्टोरेज से सभी फाइलें हटा देता है" }], correctAnswer: 0, explanation: "Multitasking enables multiple tasks to run effectively by sharing CPU processing time." },
            { id: "OS-006", course: "CCC", chapter: "Operating System", difficulty: "Moderate", questionEnglish: "Which of the following is a file management feature?", questionHindi: "निम्नलिखित में से कौन-सा फाइल मैनेजमेंट फीचर है?", options: [{ en: "Printing a document", hi: "दस्तावेज़ प्रिंट करना" }, { en: "Creating folders and moving files", hi: "फोल्डर बनाना और फाइलें ले जाना" }, { en: "Opening the browser", hi: "ब्राउज़र खोलना" }, { en: "Restarting the modem", hi: "मोम को फिर से शुरू करना" }], correctAnswer: 1, explanation: "File management includes creating, renaming, moving, deleting, and organizing files and folders." },
            { id: "OS-007", course: "CCC", chapter: "Operating System", difficulty: "Easy", questionEnglish: "Which component acts as an interface between the user and the computer hardware?", questionHindi: "कौन-सा घटक उपयोगकर्ता और कंप्यूटर हार्डवेयर के बीच इंटरफ़ेस का कार्य करता है?", options: [{ en: "Operating system", hi: "ऑपरेटिंग सिस्टम" }, { en: "Printer cable", hi: "प्रिंटर कैबल" }, { en: "Keyboard cover", hi: "कीबोर्ड कवर" }, { en: "Spreadsheet", hi: "स्प्रेडशीट" }], correctAnswer: 0, explanation: "The operating system provides user interaction with the hardware and software environment." },
            { id: "OS-008", course: "CCC", chapter: "Operating System", difficulty: "Hard", questionEnglish: "What is the purpose of a scheduler in an operating system?", questionHindi: "ऑपरेटिंग सिस्टम में शेड्यूलर का क्या उद्देश्य है?", options: [{ en: "To manage the timing and priority of processes", hi: "प्रोसेसों के समय और प्रायोरिटी का प्रबंधन करना" }, { en: "To delete system memory", hi: "सिस्टम मेमोरी मिटाना" }, { en: "To format the keyboard", hi: "कीबोर्ड फॉर्मेट करना" }, { en: "To stop all network traffic", hi: "सभी नेटवर्क ट्रैफिक बंद करना" }], correctAnswer: 0, explanation: "A scheduler decides which process gets CPU time and in what order to improve efficiency." }
        ]);

        assignChapter("O Level", "operating-system", [
            { id: "OS-101", course: "O Level", chapter: "Operating System", difficulty: "Moderate", questionEnglish: "Which of the following is a function of the kernel?", questionHindi: "कर्नेल का कार्य निम्नलिखित में से कौन-सा है?", options: [{ en: "Managing system resources and process control", hi: "सिस्टम संसाधनों और प्रोसेस कंट्रोल का प्रबंधन" }, { en: "Designing user interface graphics", hi: "यूजर इंटरफ़ेस ग्राफिक्स डिज़ाइन करना" }, { en: "Writing HTML documents", hi: "HTML दस्तावेज़ लिखना" }, { en: "Encoding audio files", hi: "ऑडियो फाइलें एन्कोड करना" }], correctAnswer: 0, explanation: "The kernel controls low-level system resources and scheduling for system operations." },
            { id: "OS-102", course: "O Level", chapter: "Operating System", difficulty: "Moderate", questionEnglish: "Which memory management concept allows programs to use more memory than physically available?", questionHindi: "कौन-सा मेमोरी मैनेजमेंट कॉन्सेप्ट प्रोग्रामों को भौतिक रूप से उपलब्ध से अधिक मेमोरी उपयोग करने की अनुमति देता है?", options: [{ en: "Paging", hi: "Paging" }, { en: "Synchronization", hi: "Synchronization" }, { en: "Buffering", hi: "Buffering" }, { en: "Compression", hi: "Compression" }], correctAnswer: 0, explanation: "Paging divides memory into pages, allowing virtual memory to give the illusion of more space." },
            { id: "OS-103", course: "O Level", chapter: "Operating System", difficulty: "Hard", questionEnglish: "Which situation best reflects deadlock in an operating system?", questionHindi: "ऑपरेटिंग सिस्टम में deadlock का सही उदाहरण चुनें।", options: [{ en: "Two processes wait on each other for resources that neither can release", hi: "दो प्रोसेस एक-दूसरे की ज़रूरतों पर इंतज़ार करते हैं और कोई भी संसाधन नहीं छोड़ता" }, { en: "A process is running with high priority", hi: "एक प्रोसेस उच्च प्राथमिकता के साथ चल रहा है" }, { en: "An application is simply slow", hi: "एक एप्लिकेशन सामान्यतः धीमा है" }, { en: "A file is copied to the cloud", hi: "एक फाइल क्लाउड में कॉपी हो रही है" }], correctAnswer: 0, explanation: "Deadlock occurs when processes are waiting on resources held by each other with no resolution path." },
            { id: "OS-104", course: "O Level", chapter: "Operating System", difficulty: "Easy", questionEnglish: "Which OS function is responsible for keeping the system secure from unauthorized access?", questionHindi: "कौन-सा OS फ़ंक्शन अनधिकृत उपयोग से सिस्टम को सुरक्षित रखने में मदद करता है?", options: [{ en: "Authentication and authorization", hi: "Authentication और authorization" }, { en: "Print preview", hi: "Print preview" }, { en: "Spreadsheet sorting", hi: "Spreadsheet sorting" }, { en: "Virtual reality rendering", hi: "Virtual reality rendering" }], correctAnswer: 0, explanation: "Authentication and authorization are security features that validate users and grant permissions." },
            { id: "OS-105", course: "O Level", chapter: "Operating System", difficulty: "Moderate", questionEnglish: "What is the main benefit of a multi-user operating system?", questionHindi: "मल्टी-यूज़र ऑपरेटिंग सिस्टम का मुख्य लाभ क्या है?", options: [{ en: "It allows several users to access the same system resources securely", hi: "यह कई उपयोगकर्ताओं को एक ही सिस्टम संसाधनों तक सुरक्षित रूप से पहुँचने देता है" }, { en: "It removes all network security", hi: "यह सभी नेटवर्क सुरक्षा हटाता है" }, { en: "It increases CPU clock speed automatically", hi: "यह CPU क्लॉक स्पीड को अपने आप बढ़ाता है" }, { en: "It disables all printers", hi: "यह सभी प्रिंटर बंद कर देता है" }], correctAnswer: 0, explanation: "Multi-user operating systems support concurrent access by multiple users with controlled permissions and resource allocation." },
            { id: "OS-106", course: "O Level", chapter: "Operating System", difficulty: "Hard", questionEnglish: "In a priority-based scheduler, what happens to a low-priority process?", questionHindi: "प्रायोरिटी-आधारित शेड्यूलर में लो-प्रायोरिटी प्रोसेस के साथ क्या होता है?", options: [{ en: "It receives CPU time before all high-priority tasks", hi: "यह सभी हाई-प्रायोरिटी टास्क से पहले CPU समय प्राप्त करता है" }, { en: "It may wait longer while higher-priority tasks are processed", hi: "यह उच्च-प्रायोरिटी टास्क के प्रोसेसिंग के दौरान अधिक समय तक रुका रह सकता है" }, { en: "It is deleted automatically", hi: "यह अपने आप हट जाता है" }, { en: "It becomes the storage directory", hi: "यह स्टोरेज डाइरेक्टरी बन जाता है" }], correctAnswer: 1, explanation: "Priority scheduling can delay low-priority tasks while higher-priority tasks are allocated CPU time." },
            { id: "OS-107", course: "O Level", chapter: "Operating System", difficulty: "Moderate", questionEnglish: "Why are file permissions important?", questionHindi: "फाइल permissions महत्वपूर्ण क्यों हैं?", options: [{ en: "They help prevent unauthorized modification or deletion of files", hi: "वे अनधिकृत फाइल संशोधन या हटाने से रोकने में मदद करते हैं" }, { en: "They increase display brightness", hi: "वे डिस्प्ले ब्राइटनेस बढ़ाते हैं" }, { en: "They block internet access", hi: "वे इंटरनेट एक्सेस रोकते हैं" }, { en: "They create new hardware", hi: "वे नए हार्डवेयर बनाते हैं" }], correctAnswer: 0, explanation: "Permissions define who can read, write, or execute files, protecting system integrity and data security." },
            { id: "OS-108", course: "O Level", chapter: "Operating System", difficulty: "Easy", questionEnglish: "Which command is often used in a command-line OS to view a list of files and folders?", questionHindi: "कमांड-लाइन OS में फाइलों और फोल्डरों की सूची देखने के लिए सामान्यतः कौन-सा कमांड उपयोग किया जाता है?", options: [{ en: "dir", hi: "dir" }, { en: "print", hi: "print" }, { en: "save", hi: "save" }, { en: "copy", hi: "copy" }], correctAnswer: 0, explanation: "dir is widely used in Windows to list files and directories in the command line." }
        ]);

        assignChapter("CCC", "word-processing", [
            { id: "WP-001", course: "CCC", chapter: "Word Processing", difficulty: "Easy", questionEnglish: "Which application is mainly used for creating and editing documents?", questionHindi: "दस्तावेज़ बनाने और संपादित करने के लिए मुख्यतः किस एप्लिकेशन का उपयोग किया जाता है?", options: [{ en: "Word processor", hi: "वर्ड प्रोसेसर" }, { en: "Database software", hi: "डेटाबेस सॉफ्टवेयर" }, { en: "Browser", hi: "ब्राउज़र" }, { en: "Spreadsheet tool", hi: "स्प्रेडशीट टूल" }], correctAnswer: 0, explanation: "Word processors are designed for document creation, formatting, and editing." },
            { id: "WP-002", course: "CCC", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "Why is paragraph alignment useful in a document?", questionHindi: "दस्तावेज़ में पैराग्राफ aligment उपयोगी क्यों है?", options: [{ en: "It improves readability and professional appearance", hi: "यह पठनीयता और पेशेवर दिखावट में सुधार करता है" }, { en: "It changes the font size automatically", hi: "यह अपने आप फॉन्ट साइज़ बदल देता है" }, { en: "It creates a new file", hi: "यह नया फाइल बनाता है" }, { en: "It removes all text", hi: "यह सभी टेक्स्ट हटाता है" }], correctAnswer: 0, explanation: "Alignment ensures that text is visually consistent and easy to read." },
            { id: "WP-003", course: "CCC", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "What is the purpose of a mail merge feature?", questionHindi: "Mail merge फीचर का उद्देश्य क्या है?", options: [{ en: "To create letters or documents personalized for multiple recipients", hi: "कई प्राप्तकर्ताओं के लिए व्यक्तिगत पत्र या दस्तावेज़ बनाना" }, { en: "To insert images automatically", hi: "इमेजेस को अपने आप सम्मिलित करना" }, { en: "To delete formatting", hi: "फॉर्मेटिंग हटाना" }, { en: "To open a spreadsheet", hi: "स्प्रेडशीट खोलना" }], correctAnswer: 0, explanation: "Mail merge combines a template with recipient data to produce personalized documents." },
            { id: "WP-004", course: "CCC", chapter: "Word Processing", difficulty: "Hard", questionEnglish: "When should you use headers and footers in a document?", questionHindi: "दस्तावेज़ में headers और footers का उपयोग कब करना चाहिए?", options: [{ en: "For consistent page information like title, page number, or author", hi: "समान पेज सूचना जैसे शीर्षक, पेज नंबर, या लेखक के लिए" }, { en: "Only for printing images", hi: "केवल इमेज़ प्रिंट करने के लिए" }, { en: "When deleting a paragraph", hi: "पैराग्राफ हटाने के समय" }, { en: "To create a spreadsheet", hi: "स्प्रेडशीट बनाने के लिए" }], correctAnswer: 0, explanation: "Headers and footers allow repeated information to be maintained on every page." },
            { id: "WP-005", course: "CCC", chapter: "Word Processing", difficulty: "Easy", questionEnglish: "Which option is used to reverse the most recent action in a word processor?", questionHindi: "वर्ड प्रोसेसर में हाल की कार्रवाई को उलटने के लिए कौन-सा विकल्प उपयोग किया जाता है?", options: [{ en: "Undo", hi: "Undo" }, { en: "Save As", hi: "Save As" }, { en: "Italic", hi: "Italic" }, { en: "Print", hi: "Print" }], correctAnswer: 0, explanation: "Undo reverses the most recent action so users can correct mistakes quickly." },
            { id: "WP-006", course: "CCC", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "Which feature is useful to maintain consistent formatting across many sections of a document?", questionHindi: "दस्तावेज़ के कई भागों में समान फॉर्मेटिंग बनाए रखने के लिए कौन-सी सुविधा उपयोगी है?", options: [{ en: "Styles", hi: "Styles" }, { en: "Delete key", hi: "Delete key" }, { en: "Page border only", hi: "केवल Page border" }, { en: "AutoSave", hi: "AutoSave" }], correctAnswer: 0, explanation: "Styles help apply a consistent look to headings, paragraphs, and other document elements." },
            { id: "WP-007", course: "CCC", chapter: "Word Processing", difficulty: "Hard", questionEnglish: "A document contains repeated names in a table. Which feature reduces repetitive typing and errors?", questionHindi: "दस्तावेज़ में टेबल में बार-बार नाम आते हैं। कौन-सी सुविधा दोहराव लिखने और त्रुटियों को कम करती है?", options: [{ en: "Autofill or auto-text", hi: "Autofill या auto-text" }, { en: "Print area", hi: "Print area" }, { en: "Sorting", hi: "Sorting" }, { en: "Data validation", hi: "Data validation" }], correctAnswer: 0, explanation: "Autotext or AutoCorrect tools can reduce repeated typing and inconsistent text." },
            { id: "WP-008", course: "CCC", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "Which action helps protect a document from unauthorized editing?", questionHindi: "अनधिकृत संपादन से दस्तावेज़ को सुरक्षित करने के लिए कौन-सा कार्य मदद करता है?", options: [{ en: "Applying password protection or editing restrictions", hi: "पासवर्ड सुरक्षा या संपादन पर प्रतिबंध लगाना" }, { en: "Changing the desktop wallpaper", hi: "डेस्कटॉप वॉलपेपर बदलना" }, { en: "Opening a browser window", hi: "ब्राउज़र विंडो खोलना" }, { en: "Removing the keyboard driver", hi: "कीबोर्ड ड्राइवर हटाना" }], correctAnswer: 0, explanation: "Document protection options restrict access and help secure content from unwanted modifications." }
        ]);

        assignChapter("O Level", "word-processing", [
            { id: "WP-101", course: "O Level", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "Which feature is best for building a table of contents automatically?", questionHindi: "स्वचालित रूप से table of contents बनाने के लिए कौन-सी सुविधा सबसे अच्छी है?", options: [{ en: "Heading styles with TOC fields", hi: "Heading styles के साथ TOC fields" }, { en: "Page break only", hi: "केवल Page break" }, { en: "Zoom control", hi: "Zoom control" }, { en: "Spell check only", hi: "केवल Spell check" }], correctAnswer: 0, explanation: "Heading styles and table-of-contents field generation create a dynamic document index." },
            { id: "WP-102", course: "O Level", chapter: "Word Processing", difficulty: "Hard", questionEnglish: "Why is section break important in a long formal document?", questionHindi: "लंबे औपचारिक दस्तावेज़ में section break महत्वपूर्ण क्यों है?", options: [{ en: "It allows different page layouts, headers, and footers within one document", hi: "यह एक ही दस्तावेज़ में अलग पेज लेआउट, headers, और footers की अनुमति देता है" }, { en: "It compresses the document automatically", hi: "यह दस्तावेज़ को अपने आप कॉम्प्रेस करता है" }, { en: "It deletes page numbers", hi: "यह पेज नंबर हटाता है" }, { en: "It opens a PDF viewer", hi: "यह PDF viewer खोलता है" }], correctAnswer: 0, explanation: "Section breaks allow independent formatting in different parts of the document." },
            { id: "WP-103", course: "O Level", chapter: "Word Processing", difficulty: "Easy", questionEnglish: "Which option is usually used to insert a page number in a document?", questionHindi: "दस्तावेज़ में पेज नंबर डालने के लिए सामान्यतः कौन-सा विकल्प उपयोग किया जाता है?", options: [{ en: "Insert > Page Number", hi: "Insert > Page Number" }, { en: "Review > Spell Check", hi: "Review > Spell Check" }, { en: "View > Zoom", hi: "View > Zoom" }, { en: "File > New", hi: "File > New" }], correctAnswer: 0, explanation: "Most word processors include page number controls under the insert menu." },
            { id: "WP-104", course: "O Level", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "What is the benefit of using templates in a word processor?", questionHindi: "वर्ड प्रोसेसर में template का उपयोग करने का लाभ क्या है?", options: [{ en: "They save time by providing a standard structure and formatting", hi: "वे मानक संरचना और फॉर्मेटिंग प्रदान करके समय बचाते हैं" }, { en: "They change the operating system", hi: "वे ऑपरेटिंग सिस्टम बदल देते हैं" }, { en: "They create sound files", hi: "वे साउंड फाइलें बनाते हैं" }, { en: "They disable spell checking", hi: "वे spell checking बंद कर देते हैं" }], correctAnswer: 0, explanation: "Templates provide ready-made structure for efficient reuse and consistent formatting." },
            { id: "WP-105", course: "O Level", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "Which action helps maintain readability when editing a long document?", questionHindi: "लंबे दस्तावेज़ को संपादित करते समय पठनीयता बनाए रखने के लिए कौन-सा कार्य मदद करता है?", options: [{ en: "Using headings, spacing, and consistent formatting", hi: "headings, spacing, और consistent formatting का उपयोग करना" }, { en: "Deleting all margins", hi: "सभी margins हटाना" }, { en: "Printing without preview", hi: "preview के बिना प्रिंट करना" }, { en: "Writing all content in uppercase", hi: "सभी सामग्री uppercase में लिखना" }], correctAnswer: 0, explanation: "Consistent structure improves readability and comprehension in lengthy documents." },
            { id: "WP-106", course: "O Level", chapter: "Word Processing", difficulty: "Hard", questionEnglish: "Which option is most useful for applying the same layout to all pages of a report?", questionHindi: "रिपोर्ट के सभी पेजों पर एक ही लेआउट लागू करने के लिए सबसे उपयोगी विकल्प कौन-सा है?", options: [{ en: "Page style or template", hi: "Page style या template" }, { en: "Delete key", hi: "Delete key" }, { en: "Single paragraph spacing", hi: "Single paragraph spacing" }, { en: "Find and replace only", hi: "केवल Find and replace" }], correctAnswer: 0, explanation: "Page styles/templates ensure a consistent professional layout across a report." },
            { id: "WP-107", course: "O Level", chapter: "Word Processing", difficulty: "Easy", questionEnglish: "Why is track changes useful in collaborative writing?", questionHindi: "सहयोगात्मक लेखन में track changes उपयोगी क्यों है?", options: [{ en: "It shows edits and comments made by different authors", hi: "यह विभिन्न लेखकों के द्वारा किए गए edits और comments दिखाता है" }, { en: "It turns off formatting", hi: "यह फॉर्मेटिंग बंद कर देता है" }, { en: "It locks the document permanently", hi: "यह दस्तावेज़ को स्थायी रूप से लॉक कर देता है" }, { en: "It removes all headings", hi: "यह सभी headings हटाता है" }], correctAnswer: 0, explanation: "Track changes makes editorial revisions transparent and easier to review." },
            { id: "WP-108", course: "O Level", chapter: "Word Processing", difficulty: "Moderate", questionEnglish: "Which combination of tools is most suitable for preparing a standardized formal report?", questionHindi: "मानक औपचारिक रिपोर्ट बनाने के लिए कौन-से टूल का संयोजन सबसे उपयुक्त है?", options: [{ en: "Styles, page numbers, headers, and section breaks", hi: "Styles, page numbers, headers, और section breaks" }, { en: "Only bold text and a color fill", hi: "केवल bold text और color fill" }, { en: "Only image insertion", hi: "केवल image insertion" }, { en: "Only keyboard shortcuts", hi: "केवल keyboard shortcuts" }], correctAnswer: 0, explanation: "These tools together provide a polished, organized, and consistent formal report layout." }
        ]);

        assignChapter("CCC", "spreadsheet", [
            { id: "SS-001", course: "CCC", chapter: "Spreadsheet", difficulty: "Easy", questionEnglish: "What is a spreadsheet primarily used for?", questionHindi: "स्प्रेडशीट का मुख्य रूप से उपयोग क्या है?", options: [{ en: "Organizing, analyzing, and calculating data", hi: "डेटा को व्यवस्थित करना, विश्लेषण करना और गणना करना" }, { en: "Editing video clips", hi: "वीडियो क्लिप एडिट करना" }, { en: "Designing websites", hi: "वेबसाइट डिज़ाइन करना" }, { en: "Creating network cables", hi: "नेटवर्क केबल बनाना" }], correctAnswer: 0, explanation: "Spreadsheets are designed to store tabular data and perform calculations efficiently." },
            { id: "SS-002", course: "CCC", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "Which cell reference is relative in a formula?", questionHindi: "फॉर्मूला में कौन-सा cell reference relative है?", options: [{ en: "A1", hi: "A1" }, { en: "$A$1", hi: "$A$1" }, { en: "A$1", hi: "A$1" }, { en: "$A1", hi: "$A1" }], correctAnswer: 0, explanation: "A1 is a relative reference, which changes when copied to other cells." },
            { id: "SS-003", course: "CCC", chapter: "Spreadsheet", difficulty: "Hard", questionEnglish: "Why are functions like SUM and AVERAGE useful?", questionHindi: "SUM और AVERAGE जैसे functions उपयोगी क्यों हैं?", options: [{ en: "They reduce manual calculation errors and save time", hi: "वे मैन्युअल गणना त्रुटियाँ कम करते हैं और समय बचाते हैं" }, { en: "They format text color", hi: "वे टेक्स्ट रंग फॉर्मेट करते हैं" }, { en: "They create charts automatically", hi: "वे अपने आप chart बनाते हैं" }, { en: "They open browser windows", hi: "वे ब्राउज़र विंडो खोलते हैं" }], correctAnswer: 0, explanation: "Built-in functions perform calculations quickly and consistently across large datasets." },
            { id: "SS-004", course: "CCC", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "What does sorting data in a spreadsheet help you do?", questionHindi: "स्प्रेडशीट में data sorting करने से आप क्या कर सकते हैं?", options: [{ en: "Arrange rows in an order such as ascending or descending", hi: "पंक्तियों को ascending या descending क्रम में व्यवस्थित करना" }, { en: "Delete all formulas", hi: "सभी फॉर्मूला हटाना" }, { en: "Convert cells into images", hi: "सेल्स को इमेज में बदलना" }, { en: "Reset the printer", hi: "प्रिंटर रीसेट करना" }], correctAnswer: 0, explanation: "Sorting organizes records in a useful order for analysis and reporting." },
            { id: "SS-005", course: "CCC", chapter: "Spreadsheet", difficulty: "Easy", questionEnglish: "Which symbol is used for multiplication in spreadsheet formulas?", questionHindi: "स्प्रेडशीट फॉर्मूला में गुणा के लिए कौन-सा प्रतीक उपयोग किया जाता है?", options: [{ en: "*", hi: "*" }, { en: "/", hi: "/" }, { en: "+", hi: "+" }, { en: "%", hi: "%" }], correctAnswer: 0, explanation: "The asterisk symbol (*) denotes multiplication in spreadsheet formulas." },
            { id: "SS-006", course: "CCC", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "What is the purpose of conditional formatting?", questionHindi: "Conditional formatting का उद्देश्य क्या है?", options: [{ en: "To highlight cells based on rules or values", hi: "नियमों या मानों के आधार पर सेल को हाइलाइट करना" }, { en: "To insert charts only", hi: "केवल chart डालना" }, { en: "To rename worksheets", hi: "worksheet का नाम बदलना" }, { en: "To set page margins", hi: "पेज मार्जिन सेट करना" }], correctAnswer: 0, explanation: "Conditional formatting emphasizes data that meets specific conditions, aiding quick analysis." },
            { id: "SS-007", course: "CCC", chapter: "Spreadsheet", difficulty: "Hard", questionEnglish: "Which option is best for creating a chart from a dataset?", questionHindi: "डेटासेट से chart बनाने के लिए सबसे अच्छा विकल्प कौन-सा है?", options: [{ en: "Insert tab with chart tool", hi: "Insert tab के साथ chart tool" }, { en: "Formatting toolbar only", hi: "केवल Formatting toolbar" }, { en: "Delete cells", hi: "सेल्स हटाना" }, { en: "Scale down monitor", hi: "मॉनिटर छोटा करना" }], correctAnswer: 0, explanation: "Spreadsheets include chart creation tools under the Insert menu for data visualization." },
            { id: "SS-008", course: "CCC", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "Why is data validation useful in Excel-like software?", questionHindi: "Excel-जैसे सॉफ्टवेयर में data validation उपयोगी क्यों है?", options: [{ en: "It restricts invalid data entries and improves accuracy", hi: "यह अवैध डेटा प्रविष्टियों को रोकता है और सटीकता बढ़ाता है" }, { en: "It always adds one more row", hi: "यह हमेशा एक और row जोड़ देता है" }, { en: "It prints the sheet", hi: "यह शीट प्रिंट करता है" }, { en: "It changes the operating system", hi: "यह ऑपरेटिंग सिस्टम बदल देता है" }], correctAnswer: 0, explanation: "Data validation ensures only acceptable values are entered into specific cells." }
        ]);

        assignChapter("O Level", "spreadsheet", [
            { id: "SS-101", course: "O Level", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "What is the effect of using absolute references in formulas?", questionHindi: "फॉर्मूला में absolute references का प्रभाव क्या होता है?", options: [{ en: "The reference remains fixed when the formula is copied", hi: "फॉर्मूला कॉपी होने पर reference अचल रहता है" }, { en: "The formula becomes text", hi: "फॉर्मूला टेक्स्ट बन जाता है" }, { en: "The cell changes color", hi: "सेल का रंग बदल जाता है" }, { en: "The data is automatically deleted", hi: "डेटा अपने आप हट जाता है" }], correctAnswer: 0, explanation: "Absolute references are locked with dollar signs and do not change when copied to other cells." },
            { id: "SS-102", course: "O Level", chapter: "Spreadsheet", difficulty: "Hard", questionEnglish: "Which feature is most useful for comparing trends across several months in a sales sheet?", questionHindi: "सेल्स शीट में कई महीनों का ट्रेंड तुलना करने के लिए कौन-सी सुविधा सबसे उपयोगी है?", options: [{ en: "Chart creation and data series analysis", hi: "Chart creation और data series analysis" }, { en: "Changing column width only", hi: "केवल column width बदलना" }, { en: "Applying a cell border", hi: "cell border लगाना" }, { en: "Opening a new workbook", hi: "नया workbook खोलना" }], correctAnswer: 0, explanation: "Charts and trend analysis help summarize and compare monthly patterns visually." },
            { id: "SS-103", course: "O Level", chapter: "Spreadsheet", difficulty: "Easy", questionEnglish: "Which function returns the largest number in a range?", questionHindi: "रेंज में सबसे बड़ी संख्या लौटाने के लिए कौन-सा function उपयोग किया जाता है?", options: [{ en: "MAX", hi: "MAX" }, { en: "MIN", hi: "MIN" }, { en: "SUM", hi: "SUM" }, { en: "COUNT", hi: "COUNT" }], correctAnswer: 0, explanation: "MAX returns the largest value in a specified cell range." },
            { id: "SS-104", course: "O Level", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "Why is filtering data important in a spreadsheet?", questionHindi: "स्प्रेडशीट में data filtering महत्वपूर्ण क्यों है?", options: [{ en: "It helps display only records that match a condition", hi: "यह केवल उन रिकॉर्ड्स को दिखाता है जो किसी शर्त से मेल खाते हैं" }, { en: "It creates a password", hi: "यह password बनाता है" }, { en: "It removes the sheet file", hi: "यह sheet file हटाता है" }, { en: "It changes formula names", hi: "यह formula names बदल देता है" }], correctAnswer: 0, explanation: "Filtering hides non-matching rows so the user can focus on relevant data." },
            { id: "SS-105", course: "O Level", chapter: "Spreadsheet", difficulty: "Hard", questionEnglish: "Which scenario best uses a pivot table?", questionHindi: "pivot table का सबसे सही उपयोग कौन-से scenario में है?", options: [{ en: "Summarizing a large sales dataset by category and region", hi: "बड़े sales dataset को category और region के अनुसार सारांशित करना" }, { en: "Editing a single paragraph", hi: "एक single paragraph को एडिट करना" }, { en: "Changing the CPU clock speed", hi: "CPU clock speed बदलना" }, { en: "Creating a website layout", hi: "वेबसाइट लेआउट बनाना" }], correctAnswer: 0, explanation: "Pivot tables summarize and reorganize large datasets for decision-making and analysis." },
            { id: "SS-106", course: "O Level", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "Which action best prevents accidental changes to a workbook?", questionHindi: "workbook में आकस्मिक परिवर्तन रोकने के लिए सबसे सही कार्य कौन-सा है?", options: [{ en: "Protecting the sheet or workbook with a password", hi: "sheet या workbook को पासवर्ड से protect करना" }, { en: "Deleting all formulas", hi: "सभी formulas हटाना" }, { en: "Changing the font color to blue", hi: "फॉन्ट रंग नीला बदलना" }, { en: "Resizing the monitor", hi: "मॉनिटर का आकार बदलना" }], correctAnswer: 0, explanation: "Protection options lock parts of the workbook and reduce accidental edits." },
            { id: "SS-107", course: "O Level", chapter: "Spreadsheet", difficulty: "Easy", questionEnglish: "Which function counts non-empty cells in a range?", questionHindi: "रेंज में non-empty cells की गिनती करने के लिए कौन-सा function उपयोग किया जाता है?", options: [{ en: "COUNTA", hi: "COUNTA" }, { en: "AVERAGEIF", hi: "AVERAGEIF" }, { en: "SUMIF", hi: "SUMIF" }, { en: "LEN", hi: "LEN" }], correctAnswer: 0, explanation: "COUNTA counts cells that contain any value, excluding empty cells." },
            { id: "SS-108", course: "O Level", chapter: "Spreadsheet", difficulty: "Moderate", questionEnglish: "Why would a user freeze panes in a spreadsheet?", questionHindi: "स्प्रेडशीट में freeze panes का उपयोग क्यों किया जाता है?", options: [{ en: "To keep headers visible while scrolling through large data", hi: "बड़े डेटा को स्क्रॉल करते समय headers को दिखाई रखने के लिए" }, { en: "To hide the worksheet", hi: "worksheet को छिपाने के लिए" }, { en: "To connect to Wi-Fi", hi: "Wi-Fi से कनेक्ट करने के लिए" }, { en: "To create a sound file", hi: "साउंड फाइल बनाना" }], correctAnswer: 0, explanation: "Frozen panes keep labels visible while users navigate long datasets." }
        ]);

        assignChapter("CCC", "internet-email", [
            { id: "IE-001", course: "CCC", chapter: "Internet & E-mail", difficulty: "Easy", questionEnglish: "What is the primary purpose of a web browser?", questionHindi: "वेब ब्राउज़र का मुख्य उद्देश्य क्या है?", options: [{ en: "To access and view web pages", hi: "वेब पेजों तक पहुँचने और देखने के लिए" }, { en: "To create a printer cable", hi: "प्रिंटर केबल बनाना" }, { en: "To compress audio files", hi: "ऑडियो फाइलों को कॉम्प्रेस करना" }, { en: "To install software from a printer", hi: "प्रिंटर से सॉफ्टवेयर इंस्टॉल करना" }], correctAnswer: 0, explanation: "A browser fetches and displays content from the internet such as webpages and documents." },
            { id: "IE-002", course: "CCC", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "Which of the following is a strong email practice?", questionHindi: "निम्नलिखित में से कौन-सा मजबूत ई-मेल अभ्यास है?", options: [{ en: "Checking the sender before opening attachments", hi: "अटैचमेंट खोलने से पहले प्रेषक की पहचान जांचना" }, { en: "Opening every attachment immediately", hi: "हर अटैचमेंट तुरंत खोलना" }, { en: "Sharing passwords in email", hi: "पासवर्ड ई-मेल में साझा करना" }, { en: "Responding to unknown senders without verification", hi: "अज्ञात प्रेषकों को बिना सत्यापन के उत्तर देना" }], correctAnswer: 0, explanation: "Verifying the sender and attachment source helps prevent phishing and malware." },
            { id: "IE-003", course: "CCC", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "What is the purpose of a bookmark in a browser?", questionHindi: "ब्राउज़र में bookmark का उद्देश्य क्या है?", options: [{ en: "To save a website for easy access later", hi: "वेबसाइट को बाद में आसान पहुँच के लिए सहेजना" }, { en: "To delete browsing history", hi: "ब्राउज़िंग हिस्ट्री हटाना" }, { en: "To increase monitor brightness", hi: "मॉनीटर ब्राइटनेस बढ़ाना" }, { en: "To open the keyboard", hi: "कीबोर्ड खोलना" }], correctAnswer: 0, explanation: "Bookmarks save useful links for quick revisits without searching again." },
            { id: "IE-004", course: "CCC", chapter: "Internet & E-mail", difficulty: "Hard", questionEnglish: "Why is HTTPS important on a website?", questionHindi: "वेबसाइट पर HTTPS क्यों महत्वपूर्ण है?", options: [{ en: "It encrypts communication between the browser and the server", hi: "यह ब्राउज़र और सर्वर के बीच संचार को एन्क्रिप्ट करता है" }, { en: "It improves CPU speed", hi: "यह CPU स्पीड सुधारता है" }, { en: "It disables browser caching", hi: "यह browser caching बंद कर देता है" }, { en: "It replaces the operating system", hi: "यह ऑपरेटिंग सिस्टम का स्थान लेता है" }], correctAnswer: 0, explanation: "HTTPS uses encryption to protect data in transit and reduce interception risk." },
            { id: "IE-005", course: "CCC", chapter: "Internet & E-mail", difficulty: "Easy", questionEnglish: "Which of the following is a search engine?", questionHindi: "निम्नलिखित में से कौन-सा search engine है?", options: [{ en: "Google", hi: "Google" }, { en: "Skype", hi: "Skype" }, { en: "Microsoft Word", hi: "Microsoft Word" }, { en: "Scanner", hi: "स्कैनर" }], correctAnswer: 0, explanation: "Search engines index web pages and help users find information online." },
            { id: "IE-006", course: "CCC", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "What is a phishing attack?", questionHindi: "फिशिंग अटैक क्या है?", options: [{ en: "A scam that tricks users into sharing personal or financial information", hi: "एक स्कैम जो उपयोगकर्ताओं को व्यक्तिगत या वित्तीय जानकारी साझा करने के लिए धोखा देता है" }, { en: "A software update method", hi: "सॉफ्टवेयर अपडेट विधि" }, { en: "A hardware replacement process", hi: "हार्डवेयर प्रतिस्थापन प्रक्रिया" }, { en: "A type of spreadsheet function", hi: "स्प्रेडशीट फ़ंक्शन का प्रकार" }], correctAnswer: 0, explanation: "Phishing uses fake messages or websites to mislead users into revealing sensitive data." },
            { id: "IE-007", course: "CCC", chapter: "Internet & E-mail", difficulty: "Hard", questionEnglish: "Why should users verify URLs before entering credentials?", questionHindi: "Credentials दर्ज करने से पहले URL सत्यापित करना क्यों आवश्यक है?", options: [{ en: "To avoid fake or spoofed websites that may steal login details", hi: "फर्जी या spoofed वेबसाइटों से बचने के लिए जो लॉगिन जानकारी चुरा सकती हैं" }, { en: "To improve the CPU speed", hi: "CPU speed बेहतर करने के लिए" }, { en: "To change the browser theme", hi: "ब्राउज़र थीम बदलने के लिए" }, { en: "To open a new printer", hi: "नया प्रिंटर खोलने के लिए" }], correctAnswer: 0, explanation: "Fake websites often mimic trusted portals to steal credentials and sensitive information." },
            { id: "IE-008", course: "CCC", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "Which email feature helps organize messages by category or label?", questionHindi: "ई-मेल फीचर जो संदेशों को श्रेणी या लेबल के अनुसार व्यवस्थित करता है, कौन-सा है?", options: [{ en: "Folders or labels", hi: "Folders या labels" }, { en: "Text effect", hi: "Text effect" }, { en: "Printer queue", hi: "प्रिंटर queue" }, { en: "Keyboard shortcut", hi: "कीबोर्ड शॉर्टकट" }], correctAnswer: 0, explanation: "Folders and labels help users organize email messages and manage communication efficiently." }
        ]);

        assignChapter("O Level", "internet-email", [
            { id: "IE-101", course: "O Level", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "Which protocol is primarily used for sending email messages?", questionHindi: "ई-मेल संदेश भेजने के लिए मुख्यतः कौन-सा protocol उपयोग किया जाता है?", options: [{ en: "SMTP", hi: "SMTP" }, { en: "FTP", hi: "FTP" }, { en: "HTTP", hi: "HTTP" }, { en: "DNS", hi: "DNS" }], correctAnswer: 0, explanation: "SMTP is the standard protocol used for sending mail across networks." },
            { id: "IE-102", course: "O Level", chapter: "Internet & E-mail", difficulty: "Easy", questionEnglish: "What does DNS do?", questionHindi: "DNS क्या करता है?", options: [{ en: "Translates domain names into IP addresses", hi: "डोमेन नामों को IP addresses में बदलता है" }, { en: "Stores email attachments", hi: "ई-मेल अटैचमेंट संग्रहीत करता है" }, { en: "Encrypts all documents", hi: "सभी दस्तावेज़ों को एन्क्रिप्ट करता है" }, { en: "Controls keyboard input", hi: "कीबोर्ड इनपुट नियंत्रित करता है" }], correctAnswer: 0, explanation: "DNS maps human-friendly domain names such as google.com to machine-readable IP addresses." },
            { id: "IE-103", course: "O Level", chapter: "Internet & E-mail", difficulty: "Hard", questionEnglish: "Why is email etiquette important in professional communication?", questionHindi: "पेशेवर संचार में ई-मेल शिष्टाचार क्यों महत्वपूर्ण है?", options: [{ en: "It ensures clarity, professionalism, and respect in communication", hi: "यह संचार में स्पष्टता, व्यावसायिकता और सम्मान सुनिश्चित करता है" }, { en: "It reduces hardware speed", hi: "यह हार्डवेयर स्पीड कम करता है" }, { en: "It creates new files automatically", hi: "यह अपने आप नए फाइल बनाता है" }, { en: "It replaces antivirus software", hi: "यह एंटीवायरस सॉफ्टवेयर का स्थान लेता है" }], correctAnswer: 0, explanation: "Professional email etiquette improves credibility and reduces misunderstandings in communication." },
            { id: "IE-104", course: "O Level", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "Which of the following should be avoided in email communication?", questionHindi: "ई-मेल संचार में निम्नलिखित में से क्या बचना चाहिए?", options: [{ en: "Sending sensitive information without protection", hi: "सुरक्षा के बिना संवेदनशील जानकारी भेजना" }, { en: "Using a clear subject line", hi: "स्पष्ट subject line का उपयोग करना" }, { en: "Keeping attachments concise", hi: "अटैचमेंट को संक्षिप्त रखना" }, { en: "Checking recipients carefully", hi: "प्राप्तकर्ताओं को ध्यान से जांचना" }], correctAnswer: 0, explanation: "Sensitive information should be protected to reduce risk of interception or misuse." },
            { id: "IE-105", course: "O Level", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "Which feature helps prevent spam in an inbox?", questionHindi: "इनबॉक्स में spam रोकने के लिए कौन-सी सुविधा मदद करती है?", options: [{ en: "Spam filters and rule-based sorting", hi: "Spam filters और rule-based sorting" }, { en: "Deleting the internet connection", hi: "इंटरनेट कनेक्शन हटाना" }, { en: "Reducing browser cache", hi: "browser cache कम करना" }, { en: "Changing the keyboard layout", hi: "कीबोर्ड लेआउट बदलना" }], correctAnswer: 0, explanation: "Spam filters and rules help route unwanted messages away from important inbox content." },
            { id: "IE-106", course: "O Level", chapter: "Internet & E-mail", difficulty: "Hard", questionEnglish: "Which statement about domain names is correct?", questionHindi: "डोमेन नामों के बारे में सही कथन चुनें।", options: [{ en: "They are human-readable addresses used to locate online services", hi: "वे मानवीय पठनीय addresses हैं जिनका उपयोग ऑनलाइन सेवाओं को खोजने के लिए किया जाता है" }, { en: "They are only used in email attachments", hi: "वे केवल ई-मेल अटैचमेंट में उपयोग किए जाते हैं" }, { en: "They are installed as hardware drivers", hi: "वे हार्डवेयर ड्राइवर के रूप में इंस्टॉल किए जाते हैं" }, { en: "They replace passwords", hi: "वे passwords का स्थान लेते हैं" }], correctAnswer: 0, explanation: "Domain names provide memorable names for online services and resolve to IP addresses." },
            { id: "IE-107", course: "O Level", chapter: "Internet & E-mail", difficulty: "Easy", questionEnglish: "Which option is the safest way to download a file from the internet?", questionHindi: "इंटरनेट से फाइल डाउनलोड करने का सबसे सुरक्षित तरीका कौन-सा है?", options: [{ en: "Download only from trusted and verified sources", hi: "केवल भरोसेमंद और सत्यापित स्रोतों से डाउनलोड करना" }, { en: "Download every file without checking the link", hi: "लिंक की जांच किए बिना हर फाइल डाउनलोड करना" }, { en: "Use unknown file extensions only", hi: "केवल अज्ञात file extensions का उपयोग करना" }, { en: "Open a downloaded file before verifying it", hi: "सत्यापन से पहले डाउनलोड की गई फाइल खोलना" }], correctAnswer: 0, explanation: "Trusted sources reduce the risk of malware, spoof files, and harmful downloads." },
            { id: "IE-108", course: "O Level", chapter: "Internet & E-mail", difficulty: "Moderate", questionEnglish: "Why is it important to check recipients before sending an email?", questionHindi: "ई-मेल भेजने से पहले recipients की जांच करना क्यों महत्वपूर्ण है?", options: [{ en: "To avoid sending information to the wrong person", hi: "गलत व्यक्ति को सूचना भेजने से बचने के लिए" }, { en: "To change the file name", hi: "फाइल नाम बदलने के लिए" }, { en: "To delete all drafts", hi: "सभी drafts हटाने के लिए" }, { en: "To speed up printer output", hi: "प्रिंटर आउटपुट गति बढ़ाने के लिए" }], correctAnswer: 0, explanation: "Checking recipients reduces errors and prevents confidential data from being sent to the wrong address." }
        ]);

        assignChapter("CCC", "digital-financial-services", [
            { id: "DFS-001", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Easy", questionEnglish: "What is UPI primarily used for?", questionHindi: "UPI का मुख्य रूप से उपयोग क्या है?", options: [{ en: "Instant digital payments and fund transfers", hi: "तुरंत डिजिटल भुगतान और धन हस्तांतरण" }, { en: "Sending emails only", hi: "केवल ई-मेल भेजना" }, { en: "Printing documents", hi: "दस्तावेज़ प्रिंट करना" }, { en: "Running browser updates", hi: "ब्राउज़र अपडेट चलाना" }], correctAnswer: 0, explanation: "UPI enables real-time digital transfers using a mobile app or banking platform." },
            { id: "DFS-002", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "Which practice is safest when entering a banking password online?", questionHindi: "ऑनलाइन बैंकिंग पासवर्ड दर्ज करते समय कौन-सा अभ्यास सबसे सुरक्षित है?", options: [{ en: "Use a trusted app or official website and avoid public devices", hi: "विश्वसनीय ऐप या आधिकारिक वेबसाइट का उपयोग करें और सार्वजनिक डिवाइस से बचें" }, { en: "Share it in a group message", hi: "इसे ग्रुप मैसेज में साझा करें" }, { en: "Store it in a public note", hi: "इसे सार्वजनिक नोट में रखें" }, { en: "Send it by email", hi: "इसे ई-मेल से भेजें" }], correctAnswer: 0, explanation: "Only verified official channels and secure devices reduce the risk of credential theft." },
            { id: "DFS-003", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "What is a digital wallet most commonly used for?", questionHindi: "डिजिटल वॉलेट का सामान्य उपयोग क्या है?", options: [{ en: "Storing payment methods for quick transactions", hi: "त्वरित लेन-देन के लिए भुगतान विधियाँ संग्रहीत करना" }, { en: "Creating a word document", hi: "वर्ड दस्तावेज़ बनाना" }, { en: "Installing drivers", hi: "ड्राइवर इंस्टॉल करना" }, { en: "Running a server", hi: "सर्वर चलाना" }], correctAnswer: 0, explanation: "Digital wallets store payment details or tokens to make purchases and transfers easy." },
            { id: "DFS-004", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Hard", questionEnglish: "Why should users avoid saving payment details on unknown public computers?", questionHindi: "अज्ञात सार्वजनिक कंप्यूटरों पर भुगतान विवरण सेव करने से क्यों बचना चाहिए?", options: [{ en: "They may leak sensitive information to malware or keyloggers", hi: "वे संवेदनशील जानकारी को मैलवेयर या keylogger तक पहुँचने दे सकते हैं" }, { en: "They reduce internet speed", hi: "वे इंटरनेट स्पीड कम करते हैं" }, { en: "They create duplicate text files", hi: "वे duplicate text files बनाते हैं" }, { en: "They improve screen brightness", hi: "वे स्क्रीन ब्राइटनेस बढ़ाते हैं" }], correctAnswer: 0, explanation: "Public systems are vulnerable to malware and monitor tools that can capture keystrokes and stored data." },
            { id: "DFS-005", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Easy", questionEnglish: "Which is a common digital financial service?", questionHindi: "कौन-सा सामान्य डिजिटल वित्तीय सेवा है?", options: [{ en: "Internet banking", hi: "इंटरनेट बैंकिंग" }, { en: "USB formatting", hi: "USB फॉर्मेटिंग" }, { en: "Disk partitioning", hi: "डिस्क partitioning" }, { en: "System restore", hi: "System restore" }], correctAnswer: 0, explanation: "Internet banking allows account access, transfers, and service transactions online." },
            { id: "DFS-006", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "What is a key security benefit of OTP in digital payments?", questionHindi: "डिजिटल भुगतान में OTP का प्रमुख सुरक्षा लाभ क्या है?", options: [{ en: "It adds a second verification step for transactions", hi: "यह लेन-देन के लिए एक दूसरा सत्यापन चरण जोड़ता है" }, { en: "It automatically refunds money", hi: "यह अपने आप पैसा वापस कर देता है" }, { en: "It stores the payment card details", hi: "यह पेमेंट कार्ड की जानकारी संग्रहीत करता है" }, { en: "It downloads the application", hi: "यह एप्लिकेशन डाउनलोड करता है" }], correctAnswer: 0, explanation: "OTP verifies the user identity during a transaction and reduces unauthorized payments." },
            { id: "DFS-007", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Hard", questionEnglish: "Why should users verify payment requests received from unknown contacts?", questionHindi: "अज्ञात संपर्कों से प्राप्त भुगतान अनुरोधों को सत्यापित करना क्यों महत्वपूर्ण है?", options: [{ en: "Because fraudsters can imitate trusted contacts or merchants", hi: "क्योंकि धोखेबाज़ भरोसेमंद संपर्क या व्यापारी जैसा दिखाकर फर्जी अनुरोध भेज सकते हैं" }, { en: "Because all requests are always safe", hi: "क्योंकि सभी अनुरोध हमेशा सुरक्षित होते हैं" }, { en: "Because payment apps never require confirmation", hi: "क्योंकि पेमेंट ऐप कभी पुष्टि नहीं मांगते" }, { en: "Because every message is automatically valid", hi: "क्योंकि हर संदेश अपने आप मान्य होता है" }], correctAnswer: 0, explanation: "Fraudsters often impersonate trusted entities to trick users into making payments or revealing details." },
            { id: "DFS-008", course: "CCC", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "Which digital habit reduces the chances of financial fraud?", questionHindi: "कौन-सा डिजिटल व्यवहार वित्तीय धोखाधड़ी के जोखिम को कम करता है?", options: [{ en: "Regularly checking account activity and using verified apps", hi: "खाता गतिविधि की नियमित रूप से जाँच करना और सत्यापित ऐप का उपयोग करना" }, { en: "Sharing one-time passwords publicly", hi: "वन-टाइम पासवर्ड सार्वजनिक रूप से साझा करना" }, { en: "Saving PINs on sticky notes under keyboards", hi: "PIN को कीबोर्ड के नीचे स्टिक नोट पर लिखना" }, { en: "Accepting all payment requests without review", hi: "सभी भुगतान अनुरोधों को बिना समीक्षा स्वीकार करना" }], correctAnswer: 0, explanation: "Monitoring accounts and using verified services significantly lowers fraud risk." }
        ]);

        assignChapter("O Level", "digital-financial-services", [
            { id: "DFS-101", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "What is the key difference between a debit card and a credit card?", questionHindi: "डेबिट कार्ड और क्रेडिट कार्ड में मुख्य अंतर क्या है?", options: [{ en: "Debit cards use directly available funds while credit cards extend borrowing", hi: "डेबिट कार्ड सीधे उपलब्ध धन का उपयोग करते हैं, जबकि क्रेडिट कार्ड उधार विस्तार प्रदान करते हैं" }, { en: "Debit cards are used for websites only", hi: "डेबिट कार्ड केवल वेबसाइटों के लिए उपयोग होते हैं" }, { en: "Credit cards cannot be used online", hi: "क्रेडिट कार्ड ऑनलाइन उपयोग नहीं किए जा सकते" }, { en: "Debit cards generate OTP automatically", hi: "डेबिट कार्ड अपने आप OTP बनाते हैं" }], correctAnswer: 0, explanation: "Debit cards draw from existing account funds, while credit cards allow short-term borrowing." },
            { id: "DFS-102", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Hard", questionEnglish: "Why is multi-factor authentication valuable in digital banking?", questionHindi: "डिजिटल बैंकिंग में multi-factor authentication महत्वपूर्ण क्यों है?", options: [{ en: "It reduces the chance of unauthorized access by requiring more than one proof", hi: "यह एक से अधिक प्रमाण की आवश्यकता के द्वारा अनधिकृत पहुँच के जोखिम को कम करता है" }, { en: "It increases the number of bank branches", hi: "यह बैंक शाखाओं की संख्या बढ़ाता है" }, { en: "It reduces the need for passwords entirely", hi: "यह पासवर्ड की आवश्यकता को पूरी तरह समाप्त करता है" }, { en: "It stores all user data in the browser", hi: "यह सभी उपयोगकर्ता डेटा को ब्राउज़र में संग्रहीत करता है" }], correctAnswer: 0, explanation: "MFA makes access harder to compromise because an attacker needs multiple verification factors." },
            { id: "DFS-103", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Easy", questionEnglish: "Which digital mode is commonly used for small everyday payments in India?", questionHindi: "भारत में रोजमर्रा के छोटे भुगतान के लिए सामान्यतः कौन-सा डिजिटल तरीका उपयोग किया जाता है?", options: [{ en: "UPI", hi: "UPI" }, { en: "Floppy format", hi: "Floppy format" }, { en: "Keyboard firmware", hi: "Keyboard firmware" }, { en: "System restore", hi: "System restore" }], correctAnswer: 0, explanation: "UPI is widely used in India for quick, low-value digital transactions." },
            { id: "DFS-104", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "What should a user do if a payment app requests an OTP unexpectedly?", questionHindi: "यदि कोई पेमेंट ऐप बिना किसी अनुरोध के OTP माँगे तो उपयोगकर्ता को क्या करना चाहिए?", options: [{ en: "Verify whether the request was initiated by the user and contact support if unsure", hi: "सत्यापित करें कि अनुरोध उपयोगकर्ता द्वारा शुरू किया गया है या नहीं, और अगर अनिश्चित हो तो support से संपर्क करें" }, { en: "Share the OTP with the caller immediately", hi: "OTP को तुरंत कॉलर को साझा करें" }, { en: "Accept all prompts without checking", hi: "सभी prompts को बिना जांच के स्वीकार करें" }, { en: "Delete the banking app", hi: "बैंकिंग ऐप हटाएँ" }], correctAnswer: 0, explanation: "Unexpected OTP requests can signal fraud attempts; verification protects the account." },
            { id: "DFS-105", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "Which habit best supports safe online budgeting and payments?", questionHindi: "सुरक्षित ऑनलाइन बजटिंग और भुगतान के लिए कौन-सी आदत सबसे अच्छी है?", options: [{ en: "Using trusted apps, monitoring transactions, and updating credentials regularly", hi: "विश्वसनीय ऐप उपयोग, लेन-देन की निगरानी, और credentials को नियमित रूप से अपडेट करना" }, { en: "Saving PINs in an email draft", hi: "PINs को ई-मेल ड्राफ्ट में सेव करना" }, { en: "Sharing account details with family chats", hi: "अकाउंट डिटेल्स को परिवार चैट में साझा करना" }, { en: "Using one universal password everywhere", hi: "हर जगह एक ही universal password उपयोग करना" }], correctAnswer: 0, explanation: "Good cyber hygiene and regular review reduce unauthorized access and financial loss." },
            { id: "DFS-106", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Hard", questionEnglish: "Why is reconciliation of bank statements important?", questionHindi: "बैंक स्टेटमेंट का reconciliation क्यों महत्वपूर्ण है?", options: [{ en: "It helps identify unauthorized or incorrect transactions", hi: "यह अनधिकृत या गलत लेन-देन की पहचान में मदद करता है" }, { en: "It changes the account balance automatically", hi: "यह अपने आप account balance बदल देता है" }, { en: "It creates a new login", hi: "यह नया login बनाता है" }, { en: "It disables all alerts", hi: "यह सभी alerts बंद कर देता है" }], correctAnswer: 0, explanation: "Matching statements with recorded transactions helps detect fraud and accounting errors." },
            { id: "DFS-107", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Easy", questionEnglish: "Which of the following is a digital payment security step?", questionHindi: "निम्नलिखित में से कौन-सा डिजिटल भुगतान सुरक्षा कदम है?", options: [{ en: "Using a secure app and verifying transaction details", hi: "सुरक्षित ऐप का उपयोग करना और लेन-देन की जानकारी सत्यापित करना" }, { en: "Sharing OTP on social media", hi: "OTP को सोशल मीडिया पर साझा करना" }, { en: "Accepting all payment links", hi: "सभी payment links स्वीकार करना" }, { en: "Saving bank PIN in browser storage", hi: "बैंक PIN को browser storage में सेव करना" }], correctAnswer: 0, explanation: "Secure apps and verification reduce the risk of unauthorized transactions and scam identities." },
            { id: "DFS-108", course: "O Level", chapter: "Digital & Financial Services", difficulty: "Moderate", questionEnglish: "What does a payment gateway do?", questionHindi: "पेमेंट गेटवे क्या करता है?", options: [{ en: "It securely processes online payment requests between customers and merchants", hi: "यह ग्राहकों और व्यापारियों के बीच ऑनलाइन भुगतान अनुरोधों को सुरक्षित रूप से प्रोसेस करता है" }, { en: "It creates new hardware", hi: "यह नया हार्डवेयर बनाता है" }, { en: "It shapes the monitor screen", hi: "यह मॉनीटर स्क्रीन को आकार देता है" }, { en: "It formats a USB device", hi: "यह USB डिवाइस फॉर्मेट करता है" }], correctAnswer: 0, explanation: "Payment gateways authorize and securely route online payments between the payer and merchant." }
        ]);

        assignChapter("CCC", "cyber-security", [
            { id: "CS-001", course: "CCC", chapter: "Cyber Security", difficulty: "Easy", questionEnglish: "What is malware?", questionHindi: "मैलवेयर क्या है?", options: [{ en: "Malicious software designed to harm or exploit a computer system", hi: "हानिकारक सॉफ्टवेयर जो कंप्यूटर सिस्टम को नुकसान पहुँचाने या exploit करने के लिए बनाया जाता है" }, { en: "A type of spreadsheet", hi: "स्प्रेडशीट का प्रकार" }, { en: "A document formatting tool", hi: "दस्तावेज़ फॉर्मेटिंग टूल" }, { en: "A browser plugin for music", hi: "संगीत के लिए ब्राउज़र प्लगइन" }], correctAnswer: 0, explanation: "Malware is malicious software that can damage files, steal data, or disrupt system operation." },
            { id: "CS-002", course: "CCC", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "Why should you update software regularly?", questionHindi: "सॉफ्टवेयर को नियमित रूप से अपडेट क्यों करना चाहिए?", options: [{ en: "To fix vulnerabilities and improve security", hi: "कमजोरियों को ठीक करने और सुरक्षा बढ़ाने के लिए" }, { en: "To reduce the screen size", hi: "स्क्रीन का आकार कम करने के लिए" }, { en: "To delete the user profile", hi: "उपयोगकर्ता प्रोफाइल हटाने के लिए" }, { en: "To create new folders", hi: "नए फोल्डर बनाना" }], correctAnswer: 0, explanation: "Updates often include security patches that close known vulnerabilities." },
            { id: "CS-003", course: "CCC", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "Which action best protects a password?", questionHindi: "पासवर्ड को सुरक्षित रखने के लिए कौन-सा कार्य सबसे अच्छा है?", options: [{ en: "Using a long and unique password for each account", hi: "हर खाते के लिए लंबा और अलग पासवर्ड उपयोग करना" }, { en: "Writing it on a sticky note near the monitor", hi: "इसे मॉनीटर के पास स्टिक नोट पर लिखना" }, { en: "Sharing it with friends for convenience", hi: "सुविधा के लिए दोस्तों के साथ साझा करना" }, { en: "Keeping the same password everywhere", hi: "हर जगह एक ही पासवर्ड रखना" }], correctAnswer: 0, explanation: "Unique, strong passwords reduce the impact of a single compromised account." },
            { id: "CS-004", course: "CCC", chapter: "Cyber Security", difficulty: "Hard", questionEnglish: "What is the primary risk of using public Wi-Fi without protection?", questionHindi: "सुरक्षा के बिना public Wi-Fi का उपयोग करने का मुख्य जोखिम क्या है?", options: [{ en: "Data may be intercepted by attackers on the same network", hi: "समान नेटवर्क पर हमलावर डेटा इंटरसेप्ट कर सकते हैं" }, { en: "The router becomes slower automatically", hi: "राउटर अपने आप धीमा हो जाता है" }, { en: "The keyboard stops functioning", hi: "कीबोर्ड काम करना बंद कर देता है" }, { en: "The operating system deletes files", hi: "ऑपरेटिंग सिस्टम फाइलें हटा देता है" }], correctAnswer: 0, explanation: "Public Wi-Fi can expose unencrypted traffic to attackers on the same network." },
            { id: "CS-005", course: "CCC", chapter: "Cyber Security", difficulty: "Easy", questionEnglish: "Which of the following is a common sign of a phishing email?", questionHindi: "फिशिंग ई-मेल का सामान्य संकेत कौन-सा है?", options: [{ en: "Urgent request for personal information or password", hi: "व्यक्तिगत जानकारी या पासवर्ड के लिए त्वरित अनुरोध" }, { en: "A standard message from a known colleague", hi: "ज्ञात सहयोगी से सामान्य संदेश" }, { en: "A document with proper formatting", hi: "सही फॉर्मेटिंग वाला दस्तावेज़" }, { en: "An official bank letter with all details", hi: "सभी विवरणों वाला आधिकारिक बैंक पत्र" }], correctAnswer: 0, explanation: "Urgent calls to action and suspicious requests are frequent phishing indicators." },
            { id: "CS-006", course: "CCC", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "What is the purpose of antivirus software?", questionHindi: "एंटीवायरस सॉफ्टवेयर का उद्देश्य क्या है?", options: [{ en: "To identify and remove malicious software and threats", hi: "हानिकारक सॉफ्टवेयर और खतरों की पहचान और हटाने में मदद करना" }, { en: "To create a backup of documents", hi: "दस्तावेज़ों का बैकअप बनाना" }, { en: "To replace the CPU", hi: "CPU का स्थान लेना" }, { en: "To empty the recycle bin", hi: "रीसाइकिल बिन खाली करना" }], correctAnswer: 0, explanation: "Antivirus tools scan for known threats and help prevent or remove malicious code." },
            { id: "CS-007", course: "CCC", chapter: "Cyber Security", difficulty: "Hard", questionEnglish: "Which security practice helps protect devices from ransomware?", questionHindi: "रैनसमवेयर से उपकरणों की सुरक्षा के लिए कौन-सा सुरक्षा अभ्यास मदद करता है?", options: [{ en: "Regular backups and keeping systems updated", hi: "नियमित बैकअप और सिस्टम अपडेट रखना" }, { en: "Disabling all firewalls", hi: "सभी फायरवॉल बंद करना" }, { en: "Sharing admin passwords frequently", hi: "admin passwords को अक्सर साझा करना" }, { en: "Ignoring antivirus alerts", hi: "एंटीवायरस अलर्ट को नजरअंदाज करना" }], correctAnswer: 0, explanation: "Backups and security updates reduce the damage ransomware can cause and improve recovery." },
            { id: "CS-008", course: "CCC", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "Why should you enable two-factor authentication where available?", questionHindi: "जहाँ संभव हो वहाँ two-factor authentication सक्षम करना क्यों चाहिए?", options: [{ en: "It adds an additional verification layer beyond password alone", hi: "यह केवल पासवर्ड से अलग अतिरिक्त सत्यापन परत जोड़ता है" }, { en: "It prevents all software from opening", hi: "यह सभी सॉफ्टवेयर के खुलने को रोकता है" }, { en: "It disables network access", hi: "यह नेटवर्क एक्सेस बंद कर देता है" }, { en: "It replaces all backups", hi: "यह सभी बैकअप का स्थान लेता है" }], correctAnswer: 0, explanation: "2FA helps protect accounts even if the password is exposed, by demanding another proof of identity." }
        ]);

        assignChapter("O Level", "cyber-security", [
            { id: "CS-101", course: "O Level", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "Which of the following is a best practice for secure browsing?", questionHindi: "सुरक्षित ब्राउज़िंग के लिए निम्नलिखित में से कौन-सा सर्वोत्तम अभ्यास है?", options: [{ en: "Using verified websites and avoiding suspicious downloads", hi: "सत्यापित वेबसाइटों का उपयोग करना और संदिग्ध डाउनलोड से बचना" }, { en: "Opening every pop-up immediately", hi: "हर pop-up तुरंत खोलना" }, { en: "Entering passwords on unknown forms", hi: "अज्ञात फॉर्मों पर पासवर्ड दर्ज करना" }, { en: "Disabling all antivirus warnings", hi: "सभी एंटीवायरस चेतावनियाँ बंद करना" }], correctAnswer: 0, explanation: "Verified websites and careful downloads reduce malware exposure and credential theft." },
            { id: "CS-102", course: "O Level", chapter: "Cyber Security", difficulty: "Hard", questionEnglish: "What is the major purpose of a firewall?", questionHindi: "फायरवॉल का मुख्य उद्देश्य क्या है?", options: [{ en: "To monitor and control incoming and outgoing network traffic", hi: "आने और जाने वाले नेटवर्क ट्रैफ़िक की निगरानी और नियंत्रण करना" }, { en: "To replace the keyboard", hi: "कीबोर्ड का स्थान लेना" }, { en: "To design the webpage layout", hi: "वेबपेज लेआउट डिज़ाइन करना" }, { en: "To convert audio files", hi: "ऑडियो फाइलें बदलना" }], correctAnswer: 0, explanation: "Firewalls filter traffic to reduce unauthorized access and network-based attacks." },
            { id: "CS-103", course: "O Level", chapter: "Cyber Security", difficulty: "Easy", questionEnglish: "What does a strong password usually include?", questionHindi: "मजबूत पासवर्ड में सामान्यतः क्या शामिल होता है?", options: [{ en: "A mix of uppercase, lowercase, numbers, and symbols", hi: "अंग्रेज़ी बड़े, छोटे अक्षर, अंक, और symbols का मिश्रण" }, { en: "Only the user name", hi: "केवल उपयोगकर्ता नाम" }, { en: "A single word from a dictionary", hi: "शब्दकोश से एक शब्द" }, { en: "Only repeated numbers", hi: "केवल दोहराए गए अंक" }], correctAnswer: 0, explanation: "Longer and more complex passwords are harder to crack using brute-force or dictionary attacks." },
            { id: "CS-104", course: "O Level", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "Which practice is best when a website shows security warnings?", questionHindi: "यदि वेबसाइट सुरक्षा चेतावनी दिखाए तो कौन-सा अभ्यास सबसे अच्छा है?", options: [{ en: "Stop and verify the legitimacy before proceeding", hi: "आगे बढ़ने से पहले सत्यापन करें कि वेबसाइट वैध है या नहीं" }, { en: "Accept every warning automatically", hi: "हर चेतावनी अपने आप स्वीकार करें" }, { en: "Type credentials immediately anyway", hi: "किसी भी हालत में तुरंत credentials दर्ज करें" }, { en: "Close the browser without thinking", hi: "मन में सोचे बिना ब्राउज़र बंद करें" }], correctAnswer: 0, explanation: "Security warnings often indicate SSL or certificate issues and should not be ignored without verification." },
            { id: "CS-105", course: "O Level", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "Why is social engineering dangerous?", questionHindi: "Social engineering खतरनाक क्यों है?", options: [{ en: "Because it manipulates people into revealing sensitive information", hi: "क्योंकि यह लोगों को संवेदनशील जानकारी बताने के लिए मनोवैज्ञानिक रूप से प्रेरित करता है" }, { en: "Because it disables printers", hi: "क्योंकि यह प्रिंटर बंद कर देता है" }, { en: "Because it removes the keyboard driver", hi: "क्योंकि यह कीबोर्ड ड्राइवर हटा देता है" }, { en: "Because it creates spreadsheets automatically", hi: "क्योंकि यह अपने आप स्प्रेडशीट बनाता है" }], correctAnswer: 0, explanation: "Social engineering exploits human trust and behavior rather than relying on purely technical exploitation." },
            { id: "CS-106", course: "O Level", chapter: "Cyber Security", difficulty: "Hard", questionEnglish: "What is the best reason to use a password manager?", questionHindi: "पासवर्ड प्रबंधक का सबसे अच्छा कारण क्या है?", options: [{ en: "It helps create, store, and organize unique passwords securely", hi: "यह सुरक्षित रूप से अलग-अलग पासवर्ड बनाने, संग्रहीत करने और व्यवस्थित करने में मदद करता है" }, { en: "It doubles internet speed", hi: "यह इंटरनेट स्पीड को दोगुना करता है" }, { en: "It automatically updates the operating system", hi: "यह अपने आप ऑपरेटिंग सिस्टम अपडेट करता है" }, { en: "It fixes all hardware errors", hi: "यह सभी हार्डवेयर त्रुटियाँ ठीक करता है" }], correctAnswer: 0, explanation: "Password managers reduce weak-password reuse and make secure credential management easier." },
            { id: "CS-107", course: "O Level", chapter: "Cyber Security", difficulty: "Easy", questionEnglish: "Which action is a safe response to a suspicious link in an email?", questionHindi: "ई-मेल में संदिग्ध link के लिए सुरक्षित प्रतिक्रिया कौन-सी है?", options: [{ en: "Do not click it and verify the sender through a trusted channel", hi: "इसे न क्लिक करें और प्रेषक को विश्वसनीय चैनल से सत्यापित करें" }, { en: "Open it immediately to check what it does", hi: "इसका परीक्षण करने के लिए तुरंत खोलें" }, { en: "Share it with all contacts", hi: "इसे सभी संपर्कों के साथ साझा करें" }, { en: "Forward it to the system admin without checking", hi: "बिना जांच के इसे सिस्टम एडमिन को फॉरवर्ड करें" }], correctAnswer: 0, explanation: "Avoiding suspicious links reduces the chance of phishing, malware, or credential theft." },
            { id: "CS-108", course: "O Level", chapter: "Cyber Security", difficulty: "Moderate", questionEnglish: "Why is data encryption important for confidential information?", questionHindi: "गोपनीय जानकारी के लिए data encryption महत्वपूर्ण क्यों है?", options: [{ en: "It makes information unreadable to unauthorized people", hi: "यह जानकारी को अनधिकृत लोगों के लिए अपठनीय बना देता है" }, { en: "It increases file size without protection", hi: "यह सुरक्षा के बिना फाइल आकार बढ़ाता है" }, { en: "It disables backups", hi: "यह बैकअप बंद कर देता है" }, { en: "It only makes text bold", hi: "यह केवल टेक्स्ट को बोल्ड बनाता है" }], correctAnswer: 0, explanation: "Encryption protects data confidentiality by making unreadable information inaccessible to unauthorized users." }
        ]);

        assignChapter("CCC", "future-skills", [
            { id: "FS-001", course: "CCC", chapter: "Future Skills", difficulty: "Easy", questionEnglish: "What is digital literacy?", questionHindi: "डिजिटल लिटरसी क्या है?", options: [{ en: "The ability to use digital tools safely and effectively", hi: "डिजिटल टूल्स का सुरक्षित और प्रभावी उपयोग करने की क्षमता" }, { en: "The skill of repairing a keyboard", hi: "कीबोर्ड मरम्मत करने का कौशल" }, { en: "The ability to connect only to one website", hi: "केवल एक वेबसाइट से कनेक्ट करने की क्षमता" }, { en: "The use of only paper records", hi: "केवल पेपर रिकॉर्ड का उपयोग" }], correctAnswer: 0, explanation: "Digital literacy includes using technology responsibly, efficiently, and with awareness of risks." },
            { id: "FS-002", course: "CCC", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "Why is online collaboration becoming more important?", questionHindi: "ऑनलाइन सहयोग क्यों अधिक महत्वपूर्ण होता जा रहा है?", options: [{ en: "It allows teams to work together from different locations in real time", hi: "यह टीमों को अलग-अलग स्थानों से वास्तविक समय में सहयोग करने की सुविधा देता है" }, { en: "It removes all communication tools", hi: "यह सभी संचार उपकरणों को समाप्त कर देता है" }, { en: "It reduces internet access completely", hi: "यह इंटरनेट एक्सेस पूरी तरह कम कर देता है" }, { en: "It disables file sharing", hi: "यह फाइल शेयरिंग बंद कर देता है" }], correctAnswer: 0, explanation: "Modern work often depends on shared platforms, cloud tools, and digital collaboration." },
            { id: "FS-003", course: "CCC", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "Which practice supports remote learning effectively?", questionHindi: "रिमोट लर्निंग को प्रभावी रूप से समर्थन देने वाला अभ्यास कौन-सा है?", options: [{ en: "Planning time, organizing files, and using clear digital communication", hi: "समय का नियोजन, फाइलों का संगठन, और स्पष्ट डिजिटल संचार" }, { en: "Ignoring messages from instructors", hi: "इंस्ट्रक्टर के संदेशों को अनदेखा करना" }, { en: "Using multiple random devices without checking", hi: "जाँच किए बिना कई रैंडम डिवाइस उपयोग करना" }, { en: "Downloading every file without review", hi: "समीक्षा के बिना हर फाइल डाउनलोड करना" }], correctAnswer: 0, explanation: "Good digital habits improve focus, communication, and learning outcomes in remote environments." },
            { id: "FS-004", course: "CCC", chapter: "Future Skills", difficulty: "Hard", questionEnglish: "Why is data privacy important in modern digital systems?", questionHindi: "आधुनिक डिजिटल सिस्टम में डेटा प्राइवेसी महत्वपूर्ण क्यों है?", options: [{ en: "Because personal information can be misused if not protected", hi: "क्योंकि व्यक्तिगत जानकारी की सुरक्षा न होने पर उसका गलत उपयोग किया जा सकता है" }, { en: "Because all data should be public", hi: "क्योंकि सभी डेटा सार्वजनिक होना चाहिए" }, { en: "Because privacy has no impact on digital trust", hi: "क्योंकि प्राइवेसी का डिजिटल ट्रस्ट पर कोई प्रभाव नहीं है" }, { en: "Because hardware can replace security", hi: "क्योंकि हार्डवेयर सुरक्षा का स्थान ले सकता है" }], correctAnswer: 0, explanation: "Data privacy safeguards personal, financial, and professional information from misuse and breach." },
            { id: "FS-005", course: "CCC", chapter: "Future Skills", difficulty: "Easy", questionEnglish: "Which skill is highly relevant in a digital workplace?", questionHindi: "डिजिटल कार्यस्थल में कौन-सा कौशल अत्यधिक प्रासंगिक है?", options: [{ en: "Digital collaboration and communication", hi: "डिजिटल सहयोग और संचार" }, { en: "Manual typewriter repair", hi: "मैनुअल टाइपराइटर मरम्मत" }, { en: "Paper-only workflow", hi: "केवल पेपर-वर्कफ़्लो" }, { en: "Ignoring online tools", hi: "ऑनलाइन टूल्स को अनदेखा करना" }], correctAnswer: 0, explanation: "Digital collaboration and communication are central to many modern professional workflows." },
            { id: "FS-006", course: "CCC", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "What makes a digital artifact trustworthy?", questionHindi: "डिजिटल आर्टिफेक्ट विश्वसनीय कैसे बनता है?", options: [{ en: "Verified sources, clear attribution, and secure handling", hi: "सत्यापित स्रोत, स्पष्ट श्रेय, और सुरक्षित हैंडलिंग" }, { en: "The use of maximum color in every file", hi: "हर फाइल में अधिकतम रंग का उपयोग" }, { en: "Replacing all texts with images", hi: "सभी टेक्स्ट को इमेज से बदलना" }, { en: "Ignoring file metadata", hi: "फाइल metadata को अनदेखा करना" }], correctAnswer: 0, explanation: "Trustworthiness depends on authenticity, attribution, and safe digital practices." },
            { id: "FS-007", course: "CCC", chapter: "Future Skills", difficulty: "Hard", questionEnglish: "Why should learners verify information before sharing it online?", questionHindi: "लर्नर्स को ऑनलाइन साझा करने से पहले जानकारी सत्यापित क्यों करनी चाहिए?", options: [{ en: "Because misinformation can spread quickly and affect decision-making", hi: "क्योंकि गलत सूचना जल्दी फैल सकती है और निर्णय लेने को प्रभावित कर सकती है" }, { en: "Because all online posts are always true", hi: "क्योंकि सभी ऑनलाइन पोस्ट हमेशा सही होते हैं" }, { en: "Because sharing information is never risky", hi: "क्योंकि सूचना साझा करना कभी जोखिम नहीं होता" }, { en: "Because online sources do not need review", hi: "क्योंकि ऑनलाइन स्रोतों की समीक्षा करने की आवश्यकता नहीं होती" }], correctAnswer: 0, explanation: "Checking information quality helps prevent misinformation and poor decisions in digital communities." },
            { id: "FS-008", course: "CCC", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "Which habit best improves digital productivity?", questionHindi: "डिजिटल उत्पादकता को बेहतर बनाने वाली सबसे अच्छी आदत कौन-सी है?", options: [{ en: "Maintaining organized files, using backups, and setting priorities", hi: "संगठित फाइलें बनाए रखना, बैकअप उपयोग करना, और प्राथमिकताएँ तय करना" }, { en: "Saving every file in random folders without naming", hi: "बिना नाम के यादृच्छिक फोल्डरों में हर फाइल सेव करना" }, { en: "Ignoring deadlines and system alerts", hi: "डेडलाइन और system alerts को अनदेखा करना" }, { en: "Using unfamiliar tools without study", hi: "अपरिचित टूल्स का बिना अध्ययन के उपयोग करना" }], correctAnswer: 0, explanation: "Organization and planning help users work efficiently and reduce risk in digital environments." }
        ]);

        assignChapter("O Level", "future-skills", [
            { id: "FS-101", course: "O Level", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "What is a key advantage of cloud collaboration?", questionHindi: "क्लाउड सहयोग का मुख्य लाभ क्या है?", options: [{ en: "Files and updates can be shared in real time across teams", hi: "फाइलें और अपडेट वास्तविक समय में टीमों के बीच साझा किए जा सकते हैं" }, { en: "It limits all internet access", hi: "यह सभी इंटरनेट एक्सेस को सीमित करता है" }, { en: "It removes all backups", hi: "यह सभी बैकअप हटाता है" }, { en: "It disables device security", hi: "यह डिवाइस सुरक्षा बंद कर देता है" }], correctAnswer: 0, explanation: "Cloud collaboration supports shared edits, version control, and real-time coordination." },
            { id: "FS-102", course: "O Level", chapter: "Future Skills", difficulty: "Hard", questionEnglish: "Why is digital citizenship important in online learning?", questionHindi: "ऑनलाइन लर्निंग में डिजिटल सिटिज़नशिप महत्वपूर्ण क्यों है?", options: [{ en: "It promotes responsible, respectful, and safe digital behavior", hi: "यह जिम्मेदार, सम्मानजनक और सुरक्षित डिजिटल व्यवहार को बढ़ावा देता है" }, { en: "It prevents any use of internet resources", hi: "यह इंटरनेट संसाधनों के उपयोग को पूरी तरह रोकता है" }, { en: "It replaces all classroom activities", hi: "यह सभी क्लासरूम गतिविधियों का स्थान लेता है" }, { en: "It disables communication tools", hi: "यह सभी संचार टूल्स को बंद कर देता है" }], correctAnswer: 0, explanation: "Digital citizenship teaches users how to participate ethically and effectively in online spaces." },
            { id: "FS-103", course: "O Level", chapter: "Future Skills", difficulty: "Easy", questionEnglish: "Which factor best supports effective online teamwork?", questionHindi: "प्रभावी ऑनलाइन टीमवर्क के लिए कौन-सा कारक सबसे अच्छा है?", options: [{ en: "Clear roles, communication, and shared tools", hi: "स्पष्ट भूमिकाएँ, संवाद, और साझा टूल्स" }, { en: "Randomly changing responsibilities without notice", hi: "सूचना के बिना यादृच्छिक रूप से जिम्मेदारियाँ बदलना" }, { en: "Ignoring deadlines", hi: "डेडलाइन को अनदेखा करना" }, { en: "Turning off all notifications", hi: "सभी notifications बंद करना" }], correctAnswer: 0, explanation: "Defined roles and communication improve productivity and accountability in digital teams." },
            { id: "FS-104", course: "O Level", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "What is the advantage of using version control in a project?", questionHindi: "प्रोजेक्ट में version control का लाभ क्या है?", options: [{ en: "It tracks changes and allows safe recovery of earlier work", hi: "यह परिवर्तन ट्रैक करता है और पहले के काम को सुरक्षित रूप से पुनर्प्राप्त करने देता है" }, { en: "It reduces all memory use", hi: "यह सभी मेमोरी उपयोग कम कर देता है" }, { en: "It upgrades the monitor automatically", hi: "यह मॉनीटर को अपने आप अपग्रेड करता है" }, { en: "It disables access control", hi: "यह access control बंद कर देता है" }], correctAnswer: 0, explanation: "Version control keeps project history and allows comparisons or reversion to earlier states." },
            { id: "FS-105", course: "O Level", chapter: "Future Skills", difficulty: "Hard", questionEnglish: "Why should digital learners evaluate sources critically?", questionHindi: "डिजिटल learners को sources का आलोचनात्मक मूल्यांकन क्यों करना चाहिए?", options: [{ en: "Because not all online content is accurate or reliable", hi: "क्योंकि सभी ऑनलाइन सामग्री सही या भरोसेमंद नहीं होती" }, { en: "Because every website is equally trustworthy", hi: "क्योंकि हर वेबसाइट समान रूप से भरोसेमंद है" }, { en: "Because sources are only needed in exams", hi: "क्योंकि sources केवल exams में ही उपयोग किए जाते हैं" }, { en: "Because all online files are always safe", hi: "क्योंकि सभी ऑनलाइन फाइलें हमेशा सुरक्षित होती हैं" }], correctAnswer: 0, explanation: "Critical source evaluation helps users avoid misinformation and make better-informed decisions." },
            { id: "FS-106", course: "O Level", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "How does digital automation improve productivity?", questionHindi: "डिजिटल automation उत्पादकता को कैसे बेहतर बनाता है?", options: [{ en: "By reducing repetitive manual work and faster task execution", hi: "दोहराए जाने वाले मैनुअल कार्य को कम करके और कार्य निष्पादन को तेज़ करके" }, { en: "By preventing all software access", hi: "सभी सॉफ्टवेयर एक्सेस को रोककर" }, { en: "By deleting all data automatically", hi: "सभी डेटा को अपने आप हटाकर" }, { en: "By increasing CPU heat permanently", hi: "CPU heat को स्थायी रूप से बढ़ाकर" }], correctAnswer: 0, explanation: "Automation helps performers complete repetitive operations consistently and with less human effort." },
            { id: "FS-107", course: "O Level", chapter: "Future Skills", difficulty: "Easy", questionEnglish: "Which behavior best supports data privacy when using online platforms?", questionHindi: "ऑनलाइन प्लेटफ़ॉर्म के उपयोग में डेटा प्राइवेसी के लिए कौन-सा व्यवहार सबसे अच्छा है?", options: [{ en: "Reviewing privacy settings and limiting sharing of personal information", hi: "प्राइवेसी सेटिंग्स की जाँच करना और व्यक्तिगत जानकारी साझा करने की मात्रा कम करना" }, { en: "Posting all login details in a public forum", hi: "सभी लॉगिन विवरण सार्वजनिक मंच पर पोस्ट करना" }, { en: "Using the same password for all services", hi: "हर सेवा के लिए एक ही पासवर्ड उपयोग करना" }, { en: "Accepting unknown cookies without review", hi: "बिना समीक्षा के अज्ञात cookies स्वीकार करना" }], correctAnswer: 0, explanation: "Privacy settings and careful sharing reduce personal exposure and identity risk." },
            { id: "FS-108", course: "O Level", chapter: "Future Skills", difficulty: "Moderate", questionEnglish: "What is the main purpose of digital ethics?", questionHindi: "डिजिटल एथिक्स का मुख्य उद्देश्य क्या है?", options: [{ en: "To guide responsible and fair use of technology", hi: "तकनीक के जिम्मेदार और निष्पक्ष उपयोग को मार्गदर्शन करना" }, { en: "To avoid any internet-connected devices", hi: "किसी भी इंटरनेट-कनेक्टेड डिवाइस का उपयोग न करना" }, { en: "To remove all software updates", hi: "सभी सॉफ्टवेयर अपडेट हटाना" }, { en: "To replace all human decisions", hi: "सभी मानवीय निर्णयों का स्थान लेना" }], correctAnswer: 0, explanation: "Digital ethics supports fairness, accountability, privacy, and responsible use of technology." }
        ]);

        return bank;
    }

    const QUESTION_BANK = buildQuestionBank();

    function getQuestionBankForCourse(course) {
        return QUESTION_BANK[normalizeCourse(course)] || {};
    }

    function questionIssues(question, course, chapterId) {
        const issues = [];
        if (!question || typeof question !== "object") return ["question must be an object"];
        if (typeof question.id !== "string" || !question.id.trim()) issues.push("missing question ID");
        if (normalizeCourse(question.course) !== course) issues.push("course does not match selected course");
        if (question.chapterId !== chapterId) issues.push("chapter ID does not match selected chapter");
        if (Array.isArray(question.bankMetadataIssues)) issues.push.apply(issues, question.bankMetadataIssues);
        if (!normalizeDifficulty(question.difficulty)) issues.push("invalid difficulty");
        if (!(typeof question.questionEnglish === "string" && question.questionEnglish.trim()) &&
            !(typeof question.questionHindi === "string" && question.questionHindi.trim())) {
            issues.push("missing question text");
        }
        if (!Array.isArray(question.options) || question.options.length < 2) {
            issues.push("at least two answer options are required");
        } else {
            question.options.forEach(function (option) {
                if (!option || !(String(option.en || "").trim() || String(option.hi || "").trim())) {
                    issues.push("option has no answer text");
                }
            });
        }
        if (!Number.isInteger(question.correctAnswer) || !Array.isArray(question.options) ||
            question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
            issues.push("correct answer does not match an option");
        }
        return Array.from(new Set(issues));
    }

    function getQuestionBankDiagnostics(courseValue, chapterIds, difficulties) {
        const course = normalizeCourse(courseValue);
        const bank = getQuestionBankForCourse(course);
        const selectedChapters = Array.from(new Set(Array.isArray(chapterIds) ? chapterIds : []));
        const selectedDifficulties = new Set((Array.isArray(difficulties) ? difficulties : []).map(normalizeDifficulty).filter(Boolean));
        const seenIds = new Set();
        const chapters = selectedChapters.map(function (chapterId) {
            const chapter = CHAPTERS.find(function (entry) { return entry.id === chapterId; });
            const loaded = Array.isArray(bank[chapterId]) ? bank[chapterId] : [];
            const valid = [];
            const rejected = [];
            loaded.forEach(function (question) {
                const issues = questionIssues(question, course, chapterId);
                if (!issues.length && seenIds.has(question.id)) issues.push("duplicate question ID in selected chapters");
                if (!issues.length) {
                    seenIds.add(question.id);
                    valid.push(question);
                } else {
                    rejected.push({ id: question && question.id || "(missing ID)", reasons: issues });
                }
            });
            const byDifficulty = {};
            DIFFICULTY_ORDER.forEach(function (difficulty) {
                byDifficulty[difficulty] = valid.filter(function (question) {
                    return normalizeDifficulty(question.difficulty) === difficulty;
                }).length;
            });
            return {
                id: chapterId,
                title: chapter ? chapter.label : chapterId,
                loaded: loaded.length,
                valid: valid.length,
                eligible: valid.filter(function (question) { return selectedDifficulties.has(normalizeDifficulty(question.difficulty)); }).length,
                byDifficulty: byDifficulty,
                rejected: rejected
            };
        });
        const totalLoaded = Object.keys(bank).reduce(function (total, chapterId) {
            return total + (Array.isArray(bank[chapterId]) ? bank[chapterId].length : 0);
        }, 0);
        const selectedLoaded = chapters.reduce(function (total, chapter) { return total + chapter.loaded; }, 0);
        const selectedValid = chapters.reduce(function (total, chapter) { return total + chapter.valid; }, 0);
        const eligible = chapters.reduce(function (total, chapter) { return total + chapter.eligible; }, 0);
        const selectedDifficultyCounts = {};
        DIFFICULTY_ORDER.forEach(function (difficulty) {
            selectedDifficultyCounts[difficulty] = chapters.reduce(function (total, chapter) {
                return total + chapter.byDifficulty[difficulty];
            }, 0);
        });
        return {
            course: course || String(courseValue || ""),
            totalLoaded: totalLoaded,
            selectedChapterCount: selectedChapters.length,
            selectedChapterLoaded: selectedLoaded,
            selectedChapterValid: selectedValid,
            selectedDifficultyCounts: selectedDifficultyCounts,
            selectedDifficulties: Array.from(selectedDifficulties),
            eligible: eligible,
            invalid: chapters.reduce(function (all, chapter) {
                return all.concat(chapter.rejected.map(function (entry) {
                    return Object.assign({ chapterId: chapter.id }, entry);
                }));
            }, []),
            chapters: chapters
        };
    }

    function buildEligiblePool(courseValue, chapterIds, difficulties) {
        const course = normalizeCourse(courseValue);
        const bank = getQuestionBankForCourse(course);
        const selectedDifficulties = new Set((Array.isArray(difficulties) ? difficulties : []).map(normalizeDifficulty).filter(Boolean));
        const seenIds = new Set();
        const pool = [];
        (Array.isArray(chapterIds) ? chapterIds : []).forEach(function (chapterId) {
            (Array.isArray(bank[chapterId]) ? bank[chapterId] : []).forEach(function (question) {
                if (questionIssues(question, course, chapterId).length || seenIds.has(question.id)) return;
                if (!selectedDifficulties.has(normalizeDifficulty(question.difficulty))) return;
                seenIds.add(question.id);
                pool.push(question);
            });
        });
        return pool;
    }

    function selectUniqueQuestions(pool, requested, random) {
        if (!Number.isInteger(requested) || requested < 1) throw new RangeError("Question count must be a positive whole number.");
        const unique = [];
        const seenIds = new Set();
        (Array.isArray(pool) ? pool : []).forEach(function (question) {
            if (!question || !question.id || seenIds.has(question.id)) return;
            seenIds.add(question.id);
            unique.push(question);
        });
        if (requested > unique.length) {
            throw new RangeError("Requested " + requested + " questions, but only " + unique.length + " valid eligible questions are available.");
        }
        return shuffle(unique, random).slice(0, requested);
    }

    function getAvailableDifficultyOptions() {
        return Array.from(document.querySelectorAll('#difficulty-options input:checked')).map(function (input) {
            return input.value;
        });
    }

    function getSelectedChapters() {
        const mode = document.querySelector('input[name="chapter-mode"]:checked').value;
        if (mode === "single") {
            const selected = document.getElementById("chapter-select").value;
            return selected ? [selected] : [];
        }

        const selected = Array.from(document.querySelectorAll('#chapter-checkboxes input:checked')).map(function (input) {
            return input.value;
        });
        return selected;
    }

    function getSelectedCount() {
        const selected = document.querySelector('input[name="question-count"]:checked');
        if (!selected) return 20;
        if (selected.value === "all") return getFilteredPool().length;
        if (selected.value === "custom") {
            const value = Number(document.getElementById("custom-count").value);
            return Number.isInteger(value) && value > 0 ? value : 0;
        }
        return Number(selected.value);
    }

    function getTimeLimitMinutes() {
        const selected = document.querySelector('input[name="time-limit"]:checked');
        if (!selected) return 20;
        if (selected.value === "custom") {
            const value = Number(document.getElementById("custom-time").value);
            return Number.isFinite(value) && value > 0 ? value : 0;
        }
        return Number(selected.value);
    }

    function setError(message) {
        const box = document.getElementById("validation-message");
        if (!message) {
            box.classList.add("hidden");
            box.textContent = "";
            return;
        }
        box.textContent = message;
        box.classList.remove("hidden");
    }

    function buildChapterOptions() {
        const select = document.getElementById("chapter-select");
        const checkboxHost = document.getElementById("chapter-checkboxes");
        select.innerHTML = "";
        checkboxHost.innerHTML = "";

        CHAPTERS.forEach(function (chapter) {
            const option = document.createElement("option");
            option.value = chapter.id;
            option.textContent = chapter.label;
            select.appendChild(option);

            const label = document.createElement("label");
            const input = document.createElement("input");
            input.type = "checkbox";
            input.value = chapter.id;
            input.checked = true;
            label.append(input, document.createTextNode(" " + chapter.label));
            checkboxHost.appendChild(label);
        });
    }

    function updateChapterMode() {
        const mode = document.querySelector('input[name="chapter-mode"]:checked').value;
        const singleField = document.getElementById("single-chapter-field");
        const mixField = document.getElementById("mix-chapter-field");
        singleField.hidden = mode !== "single";
        mixField.hidden = mode !== "mix";
    }

    function updateCustomVisibility() {
        const countRadio = document.querySelector('input[name="question-count"]:checked');
        const customCountWrap = document.getElementById("custom-count-wrap");
        const timeRadio = document.querySelector('input[name="time-limit"]:checked');
        const customTimeWrap = document.getElementById("custom-time-wrap");

        customCountWrap.classList.toggle("hidden", !(countRadio && countRadio.value === "custom"));
        customTimeWrap.classList.toggle("hidden", !(timeRadio && timeRadio.value === "custom"));
    }

    function getFilteredPool() {
        const course = document.querySelector('input[name="course"]:checked').value;
        const selectedDifficulties = getAvailableDifficultyOptions();
        const selectedChapters = getSelectedChapters();
        return buildEligiblePool(course, selectedChapters, selectedDifficulties);
    }

    function validateSetup() {
        const selectedChapters = getSelectedChapters();
        const selectedDifficulties = getAvailableDifficultyOptions();
        const pool = getFilteredPool();

        if (!selectedChapters.length) {
            setError("Please select at least one chapter before starting a test.");
            return null;
        }

        if (!selectedDifficulties.length) {
            setError("Please choose at least one difficulty level.");
            return null;
        }

        const count = getSelectedCount();
        if (!Number.isInteger(count) || count < 1) {
            setError("Please enter a valid number of questions.");
            return null;
        }

        if (count > pool.length) {
            setError("You requested " + count + " question(s), but only " + pool.length +
                " valid eligible question(s) are available for the selected course, chapter(s), and difficulty. Choose All available questions or change your selected filters; nothing was changed automatically.");
            return null;
        }

        const timeMinutes = getTimeLimitMinutes();
        if (!timeMinutes || timeMinutes < 1) {
            setError("Please enter a valid time limit in minutes.");
            return null;
        }

        setError("");
        return {
            course: document.querySelector('input[name="course"]:checked').value,
            chapters: selectedChapters,
            difficulties: selectedDifficulties,
            count: count,
            timeMinutes: timeMinutes
        };
    }

    function updateSummary() {
        const config = validateSetup();
        const courseValue = document.querySelector('input[name="course"]:checked').value;
        const selectedChapters = getSelectedChapters();
        const chapterLabels = CHAPTERS.filter(function (chapter) {
            return selectedChapters.indexOf(chapter.id) !== -1;
        }).map(function (chapter) {
            return chapter.label;
        });
        const difficultyValue = getAvailableDifficultyOptions().join(", ") || "None";
        const countValue = getSelectedCount();
        const timeValue = getTimeLimitMinutes();

        document.getElementById("summary-course").textContent = courseValue;
        document.getElementById("summary-chapters").textContent = chapterLabels.length ? chapterLabels.join(", ") : "None";
        document.getElementById("summary-difficulty").textContent = difficultyValue;
        document.getElementById("summary-count").textContent = String(countValue || 0);
        document.getElementById("summary-time").textContent = timeValue + " minutes";

        if (config && config.count) {
            document.getElementById("summary-count").textContent = String(config.count);
        }
        const diagnostics = getQuestionBankDiagnostics(courseValue, selectedChapters, getAvailableDifficultyOptions());
        document.getElementById("question-bank-diagnostics").textContent = JSON.stringify(diagnostics, null, 2);
        document.getElementById("all-available-count").textContent = "All available (" + diagnostics.eligible + ")";
    }

    function buildTestQuestion(question) {
        const shuffled = shuffle(question.options.map(function (option, index) {
            return { index: index, option: option };
        }));
        const correctAnswer = shuffled.findIndex(function (entry) {
            return entry.index === question.correctAnswer;
        });
        const displayOptions = shuffled.map(function (item) {
            return item.option;
        });

        return {
            id: question.id,
            course: question.course,
            chapter: question.chapter,
            difficulty: question.difficulty,
            questionEnglish: question.questionEnglish,
            questionHindi: question.questionHindi,
            options: displayOptions,
            correctAnswer: correctAnswer,
            explanation: question.explanation
        };
    }

    function getRecentHistory() {
        return readStorage(HISTORY_KEY, []);
    }

    function storeAttemptHistory(ids) {
        const history = getRecentHistory();
        const next = history.concat([ids]).slice(-12);
        writeStorage(HISTORY_KEY, next);
    }

    function selectQuestionSet() {
        const config = validateSetup();
        if (!config) return null;

        const pool = getFilteredPool();
        const selected = selectUniqueQuestions(pool, config.count);

        const generated = selected.map(buildTestQuestion);
        state.questions = generated;
        state.userAnswers = new Array(generated.length).fill(null);
        state.questionFlags = generated.map(function () { return { skipped: false }; });
        state.currentIndex = 0;
        state.submitted = false;
        state.course = config.course;
        state.chapterSelection = config.chapters;
        state.difficultySelection = config.difficulties;
        state.questionCount = config.count;
        state.timeMinutes = config.timeMinutes;

        storeAttemptHistory(generated.map(function (question) { return question.id; }));
        return generated;
    }

    function renderQuestion() {
        const question = state.questions[state.currentIndex];
        if (!question) return;

        document.getElementById("test-course").textContent = state.course;
        document.getElementById("test-question-count").textContent = "Question " + (state.currentIndex + 1) + " of " + state.questions.length;
        document.getElementById("question-english").textContent = question.questionEnglish;
        document.getElementById("question-hindi").textContent = question.questionHindi;

        const answerList = document.getElementById("answer-list");
        answerList.innerHTML = "";

        question.options.forEach(function (option, index) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "option-button" + (state.userAnswers[state.currentIndex] === index ? " selected" : "");
            button.innerHTML = '<span class="option-letter">' + alphabetIndex(index) + '</span><span>' + optionText(option) + '</span>';
            button.addEventListener("click", function () {
                state.userAnswers[state.currentIndex] = index;
                state.questionFlags[state.currentIndex].skipped = false;
                renderQuestion();
                renderPalette();
            });
            answerList.appendChild(button);
        });

        renderBookmarkButton();
        renderPalette();
    }

    function getQuestionStatus(index) {
        const answer = state.userAnswers[index];
        const flag = state.questionFlags[index] || { skipped: false };

        if (answer !== null && answer !== undefined) {
            return "attempted";
        }
        if (flag.skipped) {
            return "skipped";
        }
        return "unattempted";
    }

    function renderPalette() {
        const panel = document.getElementById("palette-panel");
        const grid = document.createElement("div");
        grid.className = "question-palette-grid";

        state.questions.forEach(function (_question, index) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "palette-number " + getQuestionStatus(index) + (index === state.currentIndex ? " is-current" : "");
            button.textContent = String(index + 1);
            button.setAttribute("aria-label", "Question " + (index + 1));
            button.addEventListener("click", function () {
                state.currentIndex = index;
                renderQuestion();
                document.getElementById("palette-panel").classList.add("hidden");
                document.getElementById("palette-toggle").setAttribute("aria-expanded", "false");
            });
            grid.appendChild(button);
        });

        const header = document.createElement("div");
        header.className = "question-palette-header";
        header.innerHTML = '<h3>Question Palette</h3><button type="button" class="secondary-btn" id="palette-close">Close</button>';
        header.querySelector("#palette-close").addEventListener("click", function () {
            panel.classList.add("hidden");
            document.getElementById("palette-toggle").setAttribute("aria-expanded", "false");
        });

        const legend = document.createElement("div");
        legend.className = "palette-legend";
        legend.innerHTML = '<span class="legend-chip"><i class="legend-swatch attempted"></i>Attempted</span><span class="legend-chip"><i class="legend-swatch unattempted"></i>Unattempted</span><span class="legend-chip"><i class="legend-swatch skipped"></i>Skipped</span><span class="legend-chip"><i class="legend-swatch current"></i>Current</span>';

        panel.innerHTML = "";
        panel.appendChild(header);
        panel.appendChild(grid);
        panel.appendChild(legend);
    }

    function renderBookmarkButton() {
        const currentId = state.questions[state.currentIndex] ? state.questions[state.currentIndex].id : null;
        const bookmarkKey = readStorage(BOOKMARK_KEY, []);
        const button = document.getElementById("bookmark-button");
        if (!currentId) {
            button.textContent = "🔖 Bookmark";
            return;
        }
        button.textContent = bookmarkKey.indexOf(currentId) !== -1 ? "🔖 Bookmarked" : "🔖 Bookmark";
    }

    function toggleBookmark() {
        const currentId = state.questions[state.currentIndex].id;
        const saved = readStorage(BOOKMARK_KEY, []);
        const index = saved.indexOf(currentId);
        if (index === -1) saved.push(currentId);
        else saved.splice(index, 1);
        writeStorage(BOOKMARK_KEY, saved);
        renderBookmarkButton();
    }

    function navigateQuestion(step) {
        const nextIndex = state.currentIndex + step;
        if (nextIndex >= 0 && nextIndex < state.questions.length) {
            state.currentIndex = nextIndex;
            renderQuestion();
        }
    }

    function saveAndNext() {
        const currentAnswer = state.userAnswers[state.currentIndex];
        if (currentAnswer === null || currentAnswer === undefined) {
            state.questionFlags[state.currentIndex].skipped = true;
        }
        if (state.currentIndex < state.questions.length - 1) {
            state.currentIndex += 1;
            renderQuestion();
        }
    }

    function skipToNext() {
        if (state.userAnswers[state.currentIndex] === null || state.userAnswers[state.currentIndex] === undefined) {
            state.questionFlags[state.currentIndex].skipped = true;
        }
        if (state.currentIndex < state.questions.length - 1) {
            state.currentIndex += 1;
            renderQuestion();
        }
    }

    function formatRemainingTime() {
        const remainingMs = Math.max(0, state.timeEndsAt - Date.now());
        return formatClock(Math.ceil(remainingMs / 1000));
    }

    function updateTimer() {
        const timer = document.getElementById("timer-pill");
        if (!timer) return;
        const remainingMs = state.timeEndsAt - Date.now();
        if (remainingMs <= 0) {
            timer.textContent = "⏱ 00:00";
            finishTest(true);
            return;
        }
        timer.textContent = "⏱ " + formatRemainingTime();
    }

    function startTimer() {
        clearInterval(state.timerHandle);
        state.timeEndsAt = Date.now() + (state.timeMinutes * 60 * 1000);
        document.getElementById("timer-pill").textContent = "⏱ " + formatClock(state.timeMinutes * 60);
        state.timerHandle = setInterval(updateTimer, 1000);
    }

    function openSubmitDialog() {
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop";
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.innerHTML = '<h3>Submit Test</h3><p>Are you sure you want to submit this test?</p><div class="modal-actions"><button type="button" class="secondary-btn" id="cancel-submit">Cancel</button><button type="button" class="action-btn" id="confirm-submit">Submit Test</button></div>';
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);
        document.getElementById("cancel-submit").addEventListener("click", function () {
            backdrop.remove();
        });
        document.getElementById("confirm-submit").addEventListener("click", function () {
            backdrop.remove();
            finishTest(false);
        });
    }

    function buildResultSummary() {
        const total = state.questions.length;
        let attempted = 0;
        let unattempted = 0;
        let correct = 0;
        let wrong = 0;

        state.questions.forEach(function (question, index) {
            const answer = state.userAnswers[index];
            if (answer === null || answer === undefined) {
                unattempted += 1;
            } else {
                attempted += 1;
                if (answer === question.correctAnswer) {
                    correct += 1;
                } else {
                    wrong += 1;
                }
            }
        });

        const score = total ? Math.round((correct / total) * 100) : 0;
        const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;
        const timeSpentSeconds = Math.max(1, Math.ceil((Date.now() - state.startedAt) / 1000));

        const stats = [
            { label: "Total Questions", value: total },
            { label: "Attempted", value: attempted },
            { label: "Unattempted", value: unattempted },
            { label: "Correct", value: correct },
            { label: "Wrong", value: wrong },
            { label: "Score", value: score + "%" },
            { label: "Accuracy", value: accuracy + "%" },
            { label: "Time Used", value: formatClock(timeSpentSeconds) }
        ];

        return { attempted, unattempted, correct, wrong, score, accuracy, total, timeSpentSeconds, stats };
    }

    function renderCategoryReview(category) {
        const reviewHost = document.getElementById("result-review");
        const categoryTitles = {
            right: "Right Questions",
            wrong: "Wrong Questions",
            unattempted: "Unattempted Questions"
        };

        reviewHost.innerHTML = "";
        const title = document.createElement("h3");
        title.textContent = categoryTitles[category];
        reviewHost.appendChild(title);

        const items = [];
        state.questions.forEach(function (question, index) {
            const selected = state.userAnswers[index];
            const isUnattempted = selected === null || selected === undefined;
            const isRight = !isUnattempted && selected === question.correctAnswer;
            const isWrong = !isUnattempted && selected !== question.correctAnswer;

            if (
                (category === "right" && isRight) ||
                (category === "wrong" && isWrong) ||
                (category === "unattempted" && isUnattempted)
            ) {
                items.push({ question, index, selected });
            }
        });

        if (!items.length) {
            const empty = document.createElement("p");
            empty.textContent = "No questions in this category.";
            reviewHost.appendChild(empty);
            return;
        }

        items.forEach(function (item) {
            const article = document.createElement("article");
            article.className = "review-item";
            article.innerHTML = '<h4>Q' + (item.index + 1) + '. ' + item.question.questionEnglish + '</h4><p class="review-hindi">' + item.question.questionHindi + '</p><p><strong>Selected Answer:</strong> ' + (item.selected === null || item.selected === undefined ? "Not Attempted" : optionText(item.question.options[item.selected])) + '</p><p><strong>Correct Answer:</strong> ' + optionText(item.question.options[item.question.correctAnswer]) + '</p><p><strong>Explanation:</strong> ' + item.question.explanation + '</p>';
            reviewHost.appendChild(article);
        });
    }

    function renderResultCards(stats) {
        const host = document.getElementById("result-summary");
        host.innerHTML = "";

        const cards = [
            { key: "right", label: "Right Questions", value: stats.correct },
            { key: "wrong", label: "Wrong Questions", value: stats.wrong },
            { key: "unattempted", label: "Unattempted Questions", value: stats.unattempted },
            { key: "summary", label: "Total Questions", value: stats.total }
        ];

        cards.forEach(function (card) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "result-card";
            button.style.border = "1px solid var(--line)";
            button.innerHTML = '<strong>' + card.value + '</strong><span>' + card.label + '</span>';
            if (card.key !== "summary") {
                button.addEventListener("click", function () {
                    renderCategoryReview(card.key);
                });
            }
            host.appendChild(button);
        });

        const summaryGrid = document.createElement("div");
        summaryGrid.className = "result-stats";
        summaryGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(170px, 1fr))";

        const metricCards = stats.stats.map(function (item) {
            const element = document.createElement("div");
            element.className = "result-card";
            element.innerHTML = '<strong>' + item.value + '</strong><span>' + item.label + '</span>';
            return element;
        });

        metricCards.forEach(function (card) {
            summaryGrid.appendChild(card);
        });

        host.appendChild(summaryGrid);
    }

    function renderAnswerReview() {
        const host = document.getElementById("review-list");
        host.innerHTML = "";

        state.questions.forEach(function (question, index) {
            const article = document.createElement("article");
            article.className = "review-item";
            const selectedAnswer = state.userAnswers[index];
            article.innerHTML = '<h4>Q' + (index + 1) + '. ' + question.questionEnglish + '</h4><p class="review-hindi">' + question.questionHindi + '</p><p><strong>Selected Answer:</strong> ' + (selectedAnswer === null || selectedAnswer === undefined ? "Not Attempted" : optionText(question.options[selectedAnswer])) + '</p><p><strong>Correct Answer:</strong> ' + optionText(question.options[question.correctAnswer]) + '</p><p><strong>Explanation:</strong> ' + question.explanation + '</p>';
            host.appendChild(article);
        });
    }

    function finishTest(autoSubmitted) {
        if (state.submitted) return;
        state.submitted = true;
        clearInterval(state.timerHandle);

        const result = buildResultSummary();
        renderResultCards(result);

        document.getElementById("test-view").classList.add("hidden");
        document.getElementById("result-view").classList.remove("hidden");
        document.getElementById("review-view").classList.add("hidden");
        document.getElementById("setup-view").classList.add("hidden");

        if (autoSubmitted) {
            const notice = document.createElement("p");
            notice.style.color = "var(--warning-text)";
            notice.style.fontWeight = "700";
            notice.textContent = "Time up! The test was submitted automatically.";
            const resultSummaryEl = document.getElementById("result-summary");
            resultSummaryEl.insertBefore(notice, resultSummaryEl.firstChild);
        }

        const summaryTitle = document.createElement("h3");
        summaryTitle.textContent = "Attempt Summary";
        const reviewHost = document.getElementById("result-review");
        reviewHost.innerHTML = "";
        reviewHost.appendChild(summaryTitle);
        renderCategoryReview("right");
    }

    function startCustomTest() {
        const selectedSet = selectQuestionSet();
        if (!selectedSet) return;

        state.startedAt = Date.now();
        document.getElementById("setup-view").classList.add("hidden");
        document.getElementById("test-view").classList.remove("hidden");
        document.getElementById("result-view").classList.add("hidden");
        document.getElementById("review-view").classList.add("hidden");
        document.getElementById("palette-panel").classList.add("hidden");
        document.getElementById("palette-toggle").setAttribute("aria-expanded", "false");
        renderQuestion();
        startTimer();
    }

    function resetToSetup() {
        document.getElementById("setup-view").classList.remove("hidden");
        document.getElementById("test-view").classList.add("hidden");
        document.getElementById("result-view").classList.add("hidden");
        document.getElementById("review-view").classList.add("hidden");
        document.getElementById("palette-panel").classList.add("hidden");
        clearInterval(state.timerHandle);
        state.questions = [];
        state.userAnswers = [];
        state.questionFlags = [];
        state.currentIndex = 0;
        state.submitted = false;
    }

    function attachEvents() {
        document.querySelectorAll('input[name="course"]').forEach(function (input) {
            input.addEventListener("change", function () {
                updateSummary();
                updateCustomVisibility();
            });
        });

        document.querySelectorAll('input[name="chapter-mode"]').forEach(function (input) {
            input.addEventListener("change", function () {
                updateChapterMode();
                updateSummary();
            });
        });

        document.getElementById("chapter-select").addEventListener("change", updateSummary);
        document.getElementById("chapter-checkboxes").addEventListener("change", updateSummary);

        document.querySelectorAll('#difficulty-options input').forEach(function (input) {
            input.addEventListener("change", updateSummary);
        });

        document.querySelectorAll('input[name="question-count"]').forEach(function (input) {
            input.addEventListener("change", function () {
                updateCustomVisibility();
                updateSummary();
            });
        });

        document.getElementById("custom-count").addEventListener("input", updateSummary);

        document.querySelectorAll('input[name="time-limit"]').forEach(function (input) {
            input.addEventListener("change", function () {
                updateCustomVisibility();
                updateSummary();
            });
        });

        document.getElementById("custom-time").addEventListener("input", updateSummary);
        document.getElementById("start-test-button").addEventListener("click", startCustomTest);
        document.getElementById("previous-button").addEventListener("click", function () { navigateQuestion(-1); });
        document.getElementById("bookmark-button").addEventListener("click", toggleBookmark);
        document.getElementById("save-next-button").addEventListener("click", saveAndNext);
        document.getElementById("next-button").addEventListener("click", skipToNext);
        document.getElementById("submit-button").addEventListener("click", openSubmitDialog);
        document.getElementById("palette-toggle").addEventListener("click", function () {
            const panel = document.getElementById("palette-panel");
            const open = panel.classList.toggle("hidden");
            document.getElementById("palette-toggle").setAttribute("aria-expanded", String(!open));
            if (!panel.classList.contains("hidden")) {
                renderPalette();
            }
        });
        document.getElementById("review-answers-button").addEventListener("click", function () {
            renderAnswerReview();
            document.getElementById("result-view").classList.add("hidden");
            document.getElementById("review-view").classList.remove("hidden");
        });
        document.getElementById("back-to-results-button").addEventListener("click", function () {
            document.getElementById("review-view").classList.add("hidden");
            document.getElementById("result-view").classList.remove("hidden");
        });
        document.getElementById("new-test-button").addEventListener("click", resetToSetup);
    }

    function init() {
        buildChapterOptions();
        updateChapterMode();
        updateCustomVisibility();
        updateSummary();
        attachEvents();
        document.querySelector('input[name="question-count"][value="20"]').checked = true;
        document.querySelector('input[name="time-limit"][value="20"]').checked = true;
        document.querySelector('input[name="chapter-mode"][value="mix"]').checked = true;
        document.querySelector('input[name="course"][value="CCC"]').checked = true;
        document.getElementById("chapter-select").value = "computer-fundamentals";
        updateSummary();
    }

    global.ZeroKBCustomTest = {
        getBank: function () {
            return QUESTION_BANK;
        },
        getDiagnostics: getQuestionBankDiagnostics,
        getEligiblePool: buildEligiblePool,
        selectQuestions: selectUniqueQuestions,
        getRecentHistory: getRecentHistory,
        start: startCustomTest,
        finish: finishTest,
        reset: resetToSetup
    };

    if (typeof document !== "undefined" && document.getElementById("setup-view")) init();
})(window);
