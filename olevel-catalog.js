(function (global) {
    "use strict";

    global.OLEVEL_CATALOG = [
        {
            code: "M1-R5.1",
            shortCode: "m1",
            title: "Information Technology Tools and Network Basics",
            description: "Computer systems, office tools, internet services, digital finance and cyber security.",
            chapters: [
                { id: "computer-fundamentals", title: "Introduction to Computer", topics: ["Computer organization and functional units", "Input/output devices and memory", "Software categories and number systems"] },
                { id: "operating-system", title: "Introduction to Operating System", topics: ["Operating-system purpose and interfaces", "Files, folders and basic utilities", "Processes, memory and system settings"] },
                { id: "word-processing", title: "Word Processing", topics: ["Document editing and formatting", "Styles, tables and page layout", "Mail merge and document output"] },
                { id: "spreadsheet", title: "Spreadsheet", topics: ["Cells, ranges, formulas and references", "Functions, charts and data presentation", "Sorting, filtering and worksheet management"] },
                { id: "presentation", title: "Presentation", topics: ["Slide creation and visual design", "Themes, layouts and slide masters", "Transitions, animations and presenting"] },
                { id: "internet-www", title: "Introduction to Internet and WWW", topics: ["Internet, WWW, URLs and browsers", "Search, web services and cloud concepts", "Network protocols and secure browsing"] },
                { id: "email-egovernance", title: "E-mail, Social Networking and e-Governance Services", topics: ["E-mail composition, attachments and safety", "Social networking and responsible use", "Online public services and digital identity"] },
                { id: "digital-finance", title: "Digital Financial Tools and Applications", topics: ["UPI, cards, wallets and AEPS", "Electronic fund-transfer channels", "Payment verification, PIN safety and fraud awareness"] },
                { id: "future-skills-cybersecurity", title: "Overview of FutureSkills and Cyber Security", topics: ["Emerging technology concepts", "Threats, malware, phishing and safe practices", "Authentication, privacy and data protection"] }
            ]
        },
        {
            code: "M2-R5.1",
            shortCode: "m2",
            title: "Web Designing & Publishing",
            description: "Web concepts, HTML, CSS, scripting, graphics, publishing and browsing.",
            chapters: [
                { id: "web-design-intro", title: "Introduction to Web Design and Applications", topics: ["Web concepts, clients and servers", "Planning, usability and accessibility", "Responsive web design principles"] },
                { id: "editors", title: "Editors", topics: ["Text and code editors", "Editor features, extensions and previews", "Project files and validation workflow"] },
                { id: "html", title: "HTML", topics: ["Elements, attributes and document structure", "Links, lists, tables and multimedia", "Forms and semantic page regions"] },
                { id: "css", title: "Cascading Style Sheets (CSS)", topics: ["Selectors, cascade and inheritance", "Box model, positioning and layout", "Responsive styling and media queries"] },
                { id: "css-frameworks", title: "CSS Frameworks", topics: ["Grid systems and responsive breakpoints", "Reusable components and utility classes", "Framework customization"] },
                { id: "javascript", title: "JavaScript and AngularJS", topics: ["Values, operators, functions and control flow", "DOM selection and event handling", "Introductory client-side framework concepts"] },
                { id: "image-editing", title: "Photo Editor", topics: ["Selections, layers and masks", "Retouching and image adjustments", "Raster/vector formats and export"] },
                { id: "web-publishing", title: "Web Publishing and Browsing", topics: ["Domains, DNS and web hosting", "Publishing files and maintaining a website", "Browser features, HTTPS and safe browsing"] }
            ]
        },
        {
            code: "M3-R5.1",
            shortCode: "m3",
            title: "Programming and Problem Solving through Python",
            description: "Algorithmic problem solving, Python programming, data structures, functions and files.",
            chapters: [
                { id: "programming-basics", title: "Introduction to Programming", topics: ["Problem analysis and decomposition", "Programming languages and development cycle", "Testing, debugging and documentation"] },
                { id: "algorithms-flowcharts", title: "Algorithms and Flowcharts", topics: ["Algorithm properties and stepwise refinement", "Flowchart symbols and control paths", "Tracing and evaluating solutions"] },
                { id: "python-intro", title: "Introduction to Python", topics: ["Python environment and program structure", "Names, objects and built-in data types", "Input, output and indentation"] },
                { id: "operators-statements", title: "Operators, Expressions and Python Statements", topics: ["Arithmetic, comparison and logical operators", "Precedence, expressions and evaluation", "Conditional and iterative statements"] },
                { id: "sequence-types", title: "Sequence Data Types", topics: ["Strings, lists and tuples", "Indexing, slicing and iteration", "Mutability and sequence operations"] },
                { id: "functions-modules", title: "Functions and Modules", topics: ["Function definition, parameters and return values", "Scope, default arguments and recursion concepts", "Modules, imports and reusable code"] },
                { id: "numpy-basics", title: "NumPy Basics", topics: ["Array creation, dimensions and shape", "Indexing, slicing and array operations", "Element-wise operations and broadcasting"] },
                { id: "oop", title: "Object Oriented Programming", topics: ["Classes, objects, attributes and methods", "Encapsulation, inheritance and overriding", "Designing and using class instances"] },
                { id: "file-processing", title: "File Processing", topics: ["Text files and access modes", "Reading, writing and appending data", "File pointers and safe resource handling"] }
            ]
        },
        {
            code: "M4-R5.1",
            shortCode: "m4",
            title: "Internet of Things and its Applications",
            description: "Connected things, sensors, communication, application development and IoT security.",
            chapters: [
                { id: "iot-intro", title: "Introduction to IoT", topics: ["IoT concepts, components and architecture", "Edge, gateway and cloud roles", "IoT requirements and system characteristics"] },
                { id: "things-connections", title: "Things and Connections", topics: ["Connected devices, identity and telemetry", "Network addressing and connectivity", "Data collection and device management"] },
                { id: "sensors-actuators", title: "Sensors, Actuators and Microcontrollers", topics: ["Sensor measurements and calibration", "Actuator control and feedback", "Microcontroller interfaces and signal conversion"] },
                { id: "iot-communication", title: "IoT Communication Protocols", topics: ["Wireless and wired connectivity choices", "Message exchange and publish/subscribe", "Power, range, latency and reliability trade-offs"] },
                { id: "iot-platforms", title: "Building IoT Applications", topics: ["Device-to-application data flow", "Rules, dashboards and cloud/edge services", "Prototyping and application deployment"] },
                { id: "iot-security", title: "Security in IoT", topics: ["Device identity, authentication and access control", "Secure communications and data privacy", "Firmware updates and lifecycle security"] },
                { id: "iot-applications", title: "IoT Applications", topics: ["Smart homes and connected infrastructure", "Agriculture, health and industrial use cases", "Monitoring, automation and responsible data use"] }
            ]
        }
    ];

    global.OLEVEL_SOURCE_URL = "https://nielit.gov.in/sites/default/files/headquarter/pdf/20220905_5_1_revised_O_Level_IT.pdf";
}(window));
