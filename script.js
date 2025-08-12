// Dr. Yogesh Shepal Website - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize website functionality
    initializeSlider();
    initializeSidebar();
    initializeTabs();
    initializeAnimations();
    initializeTypewriter();
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function initializeSlider() {
    if (totalSlides === 0) return;
    
    // Create dots
    const dotsContainer = document.querySelector('.slider-dots');
    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }
    
    // Auto-slide
    setInterval(nextSlide, 4000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.style.transform = `translateX(-${currentSlide * 50}%)`;
        updateDots();
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Sidebar functionality
function initializeSidebar() {
    const toggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (toggle && sidebar) {
        toggle.onclick = () => {
            sidebar.classList.toggle('open');
            if (overlay) {
                overlay.classList.toggle('show');
            }
        };
        
        if (overlay) {
            overlay.onclick = () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            };
        }
        
        // Close sidebar when clicking nav links on mobile
        const navLinks = sidebar.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    if (overlay) overlay.classList.remove('show');
                }
            });
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar?.classList.remove('open');
            overlay?.classList.remove('show');
        }
    });
}

// Tab functionality
function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.onclick = () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) targetContent.classList.add('active');
        };
    });
}

// Animation functionality
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale').forEach(el => {
        observer.observe(el);
    });
    
    // Timeline items animation
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        setTimeout(() => {
            observer.observe(item);
        }, index * 100);
    });
}

// Typewriter effect
function initializeTypewriter() {
    const texts = [
        "Hello! I'm Dr. Yogesh Ramdas Shepal, Associate Professor at ASM NEXTGEN Technical Campus, Pune.",
        "Passionate about teaching, research, and building intelligent software solutions.",
        "Specializing in AI, Deep Learning, and C Programming education.",
        "Helping students master programming fundamentals and advanced concepts."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.typewriter-text');
    
    if (!typewriterElement) return;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 30 : 50;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// Blog article toggle
function toggleArticle(articleId) {
    const content = document.getElementById(articleId);
    const button = content?.previousElementSibling?.querySelector('.read-more-btn');
    
    if (content && button) {
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            button.textContent = 'Read Less';
        } else {
            content.style.display = 'none';
            button.textContent = 'Read More';
        }
    }
}

// PDF preview
function previewPDF(url) {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    if (modal && frame) {
        frame.src = url;
        modal.style.display = 'block';
    }
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    const frame = document.getElementById('pdfFrame');
    if (modal && frame) {
        modal.style.display = 'none';
        frame.src = '';
    }
}

// Dark mode toggle
document.getElementById('darkModeToggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Back to top button
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
});

document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Learning Tools Functions
function openTool(toolType) {
    const modal = document.getElementById('toolModal');
    const content = document.getElementById('toolContent');
    
    if (!modal || !content) return;
    
    modal.style.display = 'flex';
    
    switch(toolType) {
        case 'playground':
            content.innerHTML = getCodePlayground();
            break;
        case 'quiz':
            content.innerHTML = getProgrammingQuiz();
            initQuiz();
            break;
        case 'visualizer':
            content.innerHTML = getAlgorithmVisualizer();
            initVisualizer();
            break;
        case 'lab':
            content.innerHTML = getVirtualLab();
            break;
        case 'reviewer':
            content.innerHTML = getCodeReviewer();
            break;
        case 'dataStructures':
            content.innerHTML = getDataStructureVisualizer();
            break;
    }
}

function closeTool() {
    const modal = document.getElementById('toolModal');
    if (modal) modal.style.display = 'none';
}

function getCodePlayground() {
    return `
        <h2>💻 Code Playground</h2>
        <div style="margin-bottom: 15px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
            <select id="language" onchange="changeLanguage()" style="padding: 10px; border-radius: 5px; min-width: 140px;">
                <option value="50">C (GCC)</option>
                <option value="71">Python 3</option>
                <option value="63">JavaScript (Node.js)</option>
                <option value="62">Java</option>
            </select>
            <button onclick="runCode()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">▶ Run Code</button>
            <button onclick="clearOutput()" style="background: #6c757d; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">Clear</button>
            <input type="text" id="inputData" placeholder="Input (optional)" style="padding: 8px; border-radius: 5px; min-width: 120px; flex: 1;">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 450px;" class="code-playground-grid">
            <div>
                <h4>Code Editor:</h4>
                <textarea id="codeEditor" class="code-editor" style="height: 380px;">#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}</textarea>
            </div>
            <div>
                <h4>Output:</h4>
                <div id="output" class="output-panel" style="height: 380px;">Click 'Run Code' to see output...</div>
            </div>
        </div>
        <style>
        @media (max-width: 768px) {
            .code-playground-grid {
                grid-template-columns: 1fr !important;
                height: auto !important;
                gap: 15px;
            }
            .code-playground-grid > div {
                min-height: 250px;
            }
            .code-editor, .output-panel {
                height: 200px !important;
            }
        }
        </style>
    `;
}

function changeLanguage() {
    const langId = document.getElementById('language').value;
    const editor = document.getElementById('codeEditor');
    
    const templates = {
        '50': '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
        '71': 'print("Hello, World!")\n\n# Try some Python code:\nfor i in range(5):\n    print(f"Number: {i}")',
        '63': 'console.log("Hello, World!");\n\n// Try some JavaScript code:\nfor(let i = 0; i < 5; i++) {\n    console.log(`Number: ${i}`);\n}',
        '62': 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
    };
    
    editor.value = templates[langId] || templates['50'];
}

async function runCode() {
    const code = document.getElementById('codeEditor').value;
    const languageId = document.getElementById('language').value;
    const input = document.getElementById('inputData').value;
    const output = document.getElementById('output');
    
    if (!code.trim()) {
        output.innerHTML = 'Please enter some code to run.';
        return;
    }
    
    output.innerHTML = '🔄 Compiling and running code...\n';
    
    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                language: getLanguageName(languageId),
                version: '*',
                files: [{
                    content: code
                }],
                stdin: input || ''
            })
        });
        
        if (!response.ok) {
            throw new Error('Compilation failed');
        }
        
        const result = await response.json();
        
        let outputText = '';
        
        if (result.run.stdout) {
            outputText += '📤 Output:\n' + result.run.stdout + '\n';
        }
        
        if (result.run.stderr) {
            outputText += '❌ Runtime Error:\n' + result.run.stderr + '\n';
        }
        
        if (result.compile && result.compile.stderr) {
            outputText += '🔧 Compile Error:\n' + result.compile.stderr + '\n';
        }
        
        outputText += `\n📊 Language: ${result.language} ${result.version}`;
        
        if (result.run.code !== undefined) {
            outputText += `\n🔢 Exit Code: ${result.run.code}`;
        }
        
        output.innerHTML = outputText || '✅ Code executed successfully (no output)';
        
    } catch (error) {
        output.innerHTML = '❌ Compiler Error: ' + error.message + '\n\nPlease check your code and try again.';
    }
}

function getLanguageName(languageId) {
    const languages = {
        '50': 'c',
        '71': 'python',
        '63': 'javascript',
        '62': 'java'
    };
    return languages[languageId] || 'c';
}

function clearOutput() {
    document.getElementById('output').innerHTML = 'Output cleared. Click \'Run Code\' to execute.';
}

function getProgrammingQuiz() {
    return `
        <h2>🧠 Programming Quiz</h2>
        <div id="quizContainer">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <div id="questionNumber" style="color: var(--primary); font-weight: bold; margin-bottom: 10px;"></div>
                <div id="question" style="font-size: 1.3rem; margin-bottom: 25px; line-height: 1.5;"></div>
                <div id="options" style="margin-bottom: 25px;"></div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button id="submitBtn" onclick="checkAnswer()" style="background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 1rem;">Submit Answer</button>
                    <button onclick="nextQuestion()" id="nextBtn" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; display: none;">Next Question</button>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div id="score" style="font-size: 1.1rem; font-weight: bold;">Score: 0/0</div>
                <div id="progress" style="background: #e9ecef; height: 10px; width: 200px; border-radius: 5px; overflow: hidden;">
                    <div id="progressBar" style="background: var(--primary); height: 100%; width: 0%; transition: width 0.3s ease;"></div>
                </div>
            </div>
            <div id="result" style="margin-top: 20px; padding: 15px; border-radius: 8px; display: none;"></div>
        </div>
    `;
}

let quizData = [
    {
        question: "What is the correct way to declare a pointer in C?",
        options: ["int ptr;", "int *ptr;", "int &ptr;", "pointer int ptr;"],
        correct: 1,
        explanation: "In C, pointers are declared using the * operator before the variable name."
    },
    {
        question: "Which data structure follows LIFO (Last In, First Out) principle?",
        options: ["Queue", "Array", "Stack", "Linked List"],
        correct: 2,
        explanation: "Stack follows LIFO principle where the last element added is the first one to be removed."
    },
    {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
        explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) complexity."
    },
    {
        question: "Which of the following is NOT a valid C data type?",
        options: ["int", "float", "string", "char"],
        correct: 2,
        explanation: "C doesn't have a built-in 'string' data type. Strings are represented as character arrays."
    },
    {
        question: "What does the 'malloc()' function do in C?",
        options: ["Frees memory", "Allocates memory dynamically", "Copies memory", "Initializes memory"],
        correct: 1,
        explanation: "malloc() allocates a block of memory dynamically during runtime."
    },
    {
        question: "What is the output of: printf('%d', sizeof(int))?",
        options: ["2", "4", "8", "Depends on system"],
        correct: 3,
        explanation: "sizeof(int) returns the number of bytes used by int data type, which varies by system architecture."
    },
    {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for loop", "while loop", "do-while loop", "nested loop"],
        correct: 2,
        explanation: "do-while loop checks condition after execution, so it runs at least once regardless of condition."
    },
    {
        question: "What is the correct syntax for function declaration in C?",
        options: ["function int add()", "int add()", "def add()", "add() int"],
        correct: 1,
        explanation: "C functions are declared with return_type function_name(parameters)."
    },
    {
        question: "Which operator is used to access structure members through pointer?",
        options: [".", "->", "*", "&"],
        correct: 1,
        explanation: "The arrow operator (->) is used to access structure members through a pointer."
    },
    {
        question: "What is the worst-case time complexity of bubble sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
        correct: 2,
        explanation: "Bubble sort has O(n²) worst-case complexity when array is reverse sorted."
    },
    {
        question: "Which header file is required for printf() function?",
        options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<math.h>"],
        correct: 1,
        explanation: "stdio.h (standard input/output) header file contains printf() function declaration."
    },
    {
        question: "What does the '&' operator do in C?",
        options: ["Logical AND", "Bitwise AND", "Address of", "Reference"],
        correct: 2,
        explanation: "The & operator returns the memory address of a variable (address-of operator)."
    },
    {
        question: "Which data structure uses FIFO principle?",
        options: ["Stack", "Queue", "Array", "Tree"],
        correct: 1,
        explanation: "Queue follows FIFO (First In, First Out) principle - first element added is first to be removed."
    },
    {
        question: "What is the purpose of 'break' statement in C?",
        options: ["Exit program", "Exit loop/switch", "Skip iteration", "Return value"],
        correct: 1,
        explanation: "break statement is used to exit from loops or switch statements immediately."
    },
    {
        question: "Which sorting algorithm has best average-case performance?",
        options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
        correct: 2,
        explanation: "Quick Sort has O(n log n) average-case complexity, making it very efficient for large datasets."
    },
    {
        question: "What is the size of char data type in C?",
        options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
        correct: 0,
        explanation: "char data type is always 1 byte (8 bits) in C, regardless of system architecture."
    },
    {
        question: "Which function is used to free dynamically allocated memory?",
        options: ["delete()", "free()", "remove()", "clear()"],
        correct: 1,
        explanation: "free() function is used to deallocate memory that was allocated using malloc(), calloc(), or realloc()."
    },
    {
        question: "What is recursion in programming?",
        options: ["Loop iteration", "Function calling itself", "Memory allocation", "Variable declaration"],
        correct: 1,
        explanation: "Recursion is when a function calls itself to solve a smaller instance of the same problem."
    },
    {
        question: "Which search algorithm requires sorted data?",
        options: ["Linear Search", "Binary Search", "Hash Search", "Sequential Search"],
        correct: 1,
        explanation: "Binary search requires data to be sorted to work correctly by dividing search space."
    },
    {
        question: "What is the purpose of 'continue' statement?",
        options: ["Exit loop", "Skip current iteration", "Return value", "Break program"],
        correct: 1,
        explanation: "continue statement skips the rest of current iteration and moves to next iteration of loop."
    },
    {
        question: "Which is the correct way to initialize an array in C?",
        options: ["int arr[] = {1,2,3};", "int arr = [1,2,3];", "array int arr = {1,2,3};", "int arr(3) = {1,2,3};"],
        correct: 0,
        explanation: "Arrays in C are initialized using curly braces with comma-separated values."
    },
    {
        question: "What is a linked list?",
        options: ["Array of pointers", "Dynamic data structure", "Static array", "Hash table"],
        correct: 1,
        explanation: "Linked list is a dynamic data structure where elements are stored in nodes connected via pointers."
    },
    {
        question: "Which operator has highest precedence in C?",
        options: ["*", "+", "()", "="],
        correct: 2,
        explanation: "Parentheses () have the highest precedence and are evaluated first in expressions."
    },
    {
        question: "What is the difference between '++i' and 'i++'?",
        options: ["No difference", "++i is faster", "++i increments before use, i++ after", "i++ is faster"],
        correct: 2,
        explanation: "++i (pre-increment) increments before using value, i++ (post-increment) uses value then increments."
    },
    {
        question: "Which algorithm is best for sorting small arrays?",
        options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"],
        correct: 2,
        explanation: "Insertion sort is efficient for small arrays due to low overhead and good performance on nearly sorted data."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = -1;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = -1;
    showQuestion();
}

function showQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById('questionNumber').innerHTML = `Question ${currentQuestion + 1} of ${quizData.length}`;
    document.getElementById('question').innerHTML = q.question;
    
    let optionsHtml = '';
    if (q.options && q.options.length > 0) {
        q.options.forEach((option, index) => {
            optionsHtml += `<div class="quiz-option" onclick="selectOption(${index})" id="option${index}">${String.fromCharCode(65 + index)}. ${option}</div>`;
        });
    } else {
        optionsHtml = '<div style="color: red;">Error: No options available for this question</div>';
    }
    document.getElementById('options').innerHTML = optionsHtml;
    
    document.getElementById('result').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('score').innerHTML = `Score: ${score}/${quizData.length}`;
    
    const progress = ((currentQuestion) / quizData.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    selectedAnswer = -1;
}

function selectOption(index) {
    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`option${index}`).classList.add('selected');
    selectedAnswer = index;
}

function checkAnswer() {
    if (selectedAnswer === -1) {
        alert('Please select an answer!');
        return;
    }
    
    const q = quizData[currentQuestion];
    const resultDiv = document.getElementById('result');
    
    if (selectedAnswer === q.correct) {
        score++;
        resultDiv.innerHTML = `<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px;"><strong>✓ Correct!</strong><br>${q.explanation}</div>`;
    } else {
        resultDiv.innerHTML = `<div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px;"><strong>✗ Incorrect!</strong><br>Correct answer: <strong>${String.fromCharCode(65 + q.correct)}. ${q.options[q.correct]}</strong><br>${q.explanation}</div>`;
    }
    
    resultDiv.style.display = 'block';
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
    document.getElementById('score').innerHTML = `Score: ${score}/${quizData.length}`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = 'Excellent! You have a strong understanding of programming concepts.';
    } else if (percentage >= 60) {
        message = 'Good job! Keep practicing to improve your skills.';
    } else {
        message = 'Keep studying! Review the concepts and try again.';
    }
    
    document.getElementById('quizContainer').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h3 style="color: var(--primary); margin-bottom: 20px;">🎉 Quiz Complete!</h3>
            <div style="font-size: 3rem; margin: 20px 0;">${percentage}%</div>
            <p style="font-size: 1.2rem; margin-bottom: 10px;"><strong>Final Score: ${score}/${quizData.length}</strong></p>
            <p style="color: #666; margin-bottom: 30px;">${message}</p>
            <button onclick="initQuiz()" style="background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 1rem;">Retake Quiz</button>
        </div>
    `;
}

function getAlgorithmVisualizer() {
    return `
        <h2>📊 Algorithm Visualizer</h2>
        <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
            <select id="algorithm" onchange="selectAlgorithm()" style="padding: 10px; border-radius: 5px; min-width: 160px;">
                <optgroup label="Sorting Algorithms">
                    <option value="bubble">Bubble Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="insertion">Insertion Sort</option>
                    <option value="merge">Merge Sort</option>
                    <option value="quick">Quick Sort</option>
                </optgroup>
                <optgroup label="Search Algorithms">
                    <option value="linear">Linear Search</option>
                    <option value="binary">Binary Search</option>
                </optgroup>
                <optgroup label="Graph Algorithms">
                    <option value="bfs">BFS Traversal</option>
                    <option value="dfs">DFS Traversal</option>
                </optgroup>
                <optgroup label="Data Structures">
                    <option value="stack">Stack Operations</option>
                    <option value="queue">Queue Operations</option>
                </optgroup>
                <optgroup label="String Algorithms">
                    <option value="kmp">KMP String Matching</option>
                </optgroup>
            </select>
            <button onclick="startVisualization()" style="background: #17a2b8; color: white; border: none; padding: 10px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">▶ Start</button>
            <button onclick="resetVisualization()" style="background: #6c757d; color: white; border: none; padding: 10px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">🔄 Reset</button>
            <button onclick="generateNewArray()" style="background: #28a745; color: white; border: none; padding: 10px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">🎲 New Data</button>
            <div style="display: flex; align-items: center; gap: 8px;">
                <input type="range" id="speedControl" min="1" max="10" value="5" style="min-width: 80px;"> 
                <label style="font-size: 14px;">Speed</label>
            </div>
        </div>
        <div id="userInputs" style="margin-bottom: 15px; display: none; flex-wrap: wrap; gap: 10px;">
            <input type="text" id="searchTarget" placeholder="Search target" style="padding: 8px; border-radius: 5px; min-width: 100px;">
            <input type="text" id="textInput" placeholder="Text string" style="padding: 8px; border-radius: 5px; min-width: 120px;">
            <input type="text" id="patternInput" placeholder="Pattern" style="padding: 8px; border-radius: 5px; min-width: 100px;">
            <input type="number" id="arraySize" min="5" max="15" value="8" placeholder="Array size" style="padding: 8px; border-radius: 5px; width: 100px;">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 350px; gap: 15px;" class="visualizer-grid">
            <div id="visualizer" style="height: 450px; border: 2px solid #ddd; border-radius: 10px; background: #f8f9fa; padding: 15px; overflow: hidden;">
                <div id="visualization" style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center;"></div>
                <div id="visualStatus" style="text-align: center; margin-top: 15px; font-weight: bold; color: var(--primary); padding: 10px; background: white; border-radius: 5px; font-size: 14px;">Select algorithm and click 'Start'</div>
            </div>
            <div id="pseudocodePanel" style="height: 450px; border: 2px solid #ddd; border-radius: 10px; background: #1e1e1e; color: #f8f8f2; padding: 15px; overflow-y: auto;">
                <h4 style="color: #50fa7b; margin-top: 0; border-bottom: 1px solid #44475a; padding-bottom: 8px; font-size: 16px;">📜 Pseudocode</h4>
                <pre id="pseudocode" style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.4; margin: 0; white-space: pre-wrap;">Select an algorithm to view its pseudocode</pre>
                <div id="currentStep" style="margin-top: 15px; padding: 10px; background: #44475a; border-radius: 5px; border-left: 4px solid #50fa7b;">
                    <strong style="color: #50fa7b; font-size: 14px;">🔍 Current Step:</strong>
                    <div id="stepDescription" style="margin-top: 5px; color: #f8f8f2; font-size: 13px;">Ready to start</div>
                </div>
            </div>
        </div>
        <div id="explanation" style="margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 5px; font-size: 14px;"></div>
        <style>
        @media (max-width: 768px) {
            .visualizer-grid {
                grid-template-columns: 1fr !important;
                gap: 15px;
            }
            #visualizer {
                height: 300px !important;
            }
            #pseudocodePanel {
                height: 250px !important;
            }
            #pseudocode {
                font-size: 11px !important;
            }
            #userInputs {
                display: flex !important;
            }
        }
        </style>
    `;
}

// Algorithm Visualizer Variables
let visualArray = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50];
let isAnimating = false;

function selectAlgorithm() {
    const algo = document.getElementById('algorithm').value;
    document.getElementById('explanation').innerHTML = getAlgorithmExplanation(algo);
    document.getElementById('pseudocode').innerHTML = getPseudocode(algo);
    document.getElementById('stepDescription').innerHTML = 'Ready to start';
    
    // Show/hide relevant input fields
    const inputs = document.getElementById('userInputs');
    const searchTarget = document.getElementById('searchTarget');
    const textInput = document.getElementById('textInput');
    const patternInput = document.getElementById('patternInput');
    const arraySize = document.getElementById('arraySize');
    
    // Hide all inputs first
    inputs.style.display = 'none';
    searchTarget.style.display = 'none';
    textInput.style.display = 'none';
    patternInput.style.display = 'none';
    arraySize.style.display = 'none';
    
    // Show relevant inputs based on algorithm
    if (['linear', 'binary'].includes(algo)) {
        inputs.style.display = 'block';
        searchTarget.style.display = 'inline-block';
        arraySize.style.display = 'inline-block';
    } else if (['kmp'].includes(algo)) {
        inputs.style.display = 'block';
        textInput.style.display = 'inline-block';
        patternInput.style.display = 'inline-block';
    } else if (['bubble', 'selection', 'insertion', 'merge', 'quick'].includes(algo)) {
        inputs.style.display = 'block';
        arraySize.style.display = 'inline-block';
    }
    
    resetVisualization();
}

function getPseudocode(algo) {
    const pseudocodes = {
        bubble: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">BubbleSort</span>(arr[])
<span style="color: #ff79c6;">BEGIN</span>
  n = length(arr)
  <span style="color: #ff79c6;">FOR</span> i = 0 <span style="color: #ff79c6;">TO</span> n-2 <span style="color: #ff79c6;">DO</span>
    <span style="color: #ff79c6;">FOR</span> j = 0 <span style="color: #ff79c6;">TO</span> n-i-2 <span style="color: #ff79c6;">DO</span>
      <span style="color: #ff79c6;">IF</span> arr[j] > arr[j+1] <span style="color: #ff79c6;">THEN</span>
        <span style="color: #8be9fd;">SWAP</span>(arr[j], arr[j+1])
      <span style="color: #ff79c6;">END IF</span>
    <span style="color: #ff79c6;">END FOR</span>
  <span style="color: #ff79c6;">END FOR</span>
<span style="color: #ff79c6;">END</span>`,
        
        selection: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">SelectionSort</span>(arr[])
<span style="color: #ff79c6;">BEGIN</span>
  n = length(arr)
  <span style="color: #ff79c6;">FOR</span> i = 0 <span style="color: #ff79c6;">TO</span> n-2 <span style="color: #ff79c6;">DO</span>
    minIndex = i
    <span style="color: #ff79c6;">FOR</span> j = i+1 <span style="color: #ff79c6;">TO</span> n-1 <span style="color: #ff79c6;">DO</span>
      <span style="color: #ff79c6;">IF</span> arr[j] < arr[minIndex] <span style="color: #ff79c6;">THEN</span>
        minIndex = j
      <span style="color: #ff79c6;">END IF</span>
    <span style="color: #ff79c6;">END FOR</span>
    <span style="color: #8be9fd;">SWAP</span>(arr[i], arr[minIndex])
  <span style="color: #ff79c6;">END FOR</span>
<span style="color: #ff79c6;">END</span>`,
        
        insertion: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">InsertionSort</span>(arr[])
<span style="color: #ff79c6;">BEGIN</span>
  n = length(arr)
  <span style="color: #ff79c6;">FOR</span> i = 1 <span style="color: #ff79c6;">TO</span> n-1 <span style="color: #ff79c6;">DO</span>
    key = arr[i]
    j = i - 1
    <span style="color: #ff79c6;">WHILE</span> j >= 0 <span style="color: #ff79c6;">AND</span> arr[j] > key <span style="color: #ff79c6;">DO</span>
      arr[j+1] = arr[j]
      j = j - 1
    <span style="color: #ff79c6;">END WHILE</span>
    arr[j+1] = key
  <span style="color: #ff79c6;">END FOR</span>
<span style="color: #ff79c6;">END</span>`,
        
        linear: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">LinearSearch</span>(arr[], target)
<span style="color: #ff79c6;">BEGIN</span>
  n = length(arr)
  <span style="color: #ff79c6;">FOR</span> i = 0 <span style="color: #ff79c6;">TO</span> n-1 <span style="color: #ff79c6;">DO</span>
    <span style="color: #ff79c6;">IF</span> arr[i] == target <span style="color: #ff79c6;">THEN</span>
      <span style="color: #ff79c6;">RETURN</span> i
    <span style="color: #ff79c6;">END IF</span>
  <span style="color: #ff79c6;">END FOR</span>
  <span style="color: #ff79c6;">RETURN</span> -1  <span style="color: #6272a4;">// Not found</span>
<span style="color: #ff79c6;">END</span>`,
        
        binary: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">BinarySearch</span>(arr[], target)
<span style="color: #ff79c6;">BEGIN</span>
  left = 0
  right = length(arr) - 1
  <span style="color: #ff79c6;">WHILE</span> left <= right <span style="color: #ff79c6;">DO</span>
    mid = (left + right) / 2
    <span style="color: #ff79c6;">IF</span> arr[mid] == target <span style="color: #ff79c6;">THEN</span>
      <span style="color: #ff79c6;">RETURN</span> mid
    <span style="color: #ff79c6;">ELSE IF</span> arr[mid] < target <span style="color: #ff79c6;">THEN</span>
      left = mid + 1
    <span style="color: #ff79c6;">ELSE</span>
      right = mid - 1
    <span style="color: #ff79c6;">END IF</span>
  <span style="color: #ff79c6;">END WHILE</span>
  <span style="color: #ff79c6;">RETURN</span> -1  <span style="color: #6272a4;">// Not found</span>
<span style="color: #ff79c6;">END</span>`,
        
        bfs: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">BFS</span>(graph, startNode)
<span style="color: #ff79c6;">BEGIN</span>
  visited = empty set
  queue = empty queue
  <span style="color: #8be9fd;">ENQUEUE</span>(queue, startNode)
  
  <span style="color: #ff79c6;">WHILE</span> queue is not empty <span style="color: #ff79c6;">DO</span>
    node = <span style="color: #8be9fd;">DEQUEUE</span>(queue)
    <span style="color: #ff79c6;">IF</span> node not in visited <span style="color: #ff79c6;">THEN</span>
      <span style="color: #8be9fd;">VISIT</span>(node)
      <span style="color: #8be9fd;">ADD</span>(visited, node)
      <span style="color: #ff79c6;">FOR EACH</span> neighbor of node <span style="color: #ff79c6;">DO</span>
        <span style="color: #ff79c6;">IF</span> neighbor not in visited <span style="color: #ff79c6;">THEN</span>
          <span style="color: #8be9fd;">ENQUEUE</span>(queue, neighbor)
        <span style="color: #ff79c6;">END IF</span>
      <span style="color: #ff79c6;">END FOR</span>
    <span style="color: #ff79c6;">END IF</span>
  <span style="color: #ff79c6;">END WHILE</span>
<span style="color: #ff79c6;">END</span>`,
        
        dfs: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">DFS</span>(graph, node, visited)
<span style="color: #ff79c6;">BEGIN</span>
  <span style="color: #ff79c6;">IF</span> node in visited <span style="color: #ff79c6;">THEN</span>
    <span style="color: #ff79c6;">RETURN</span>
  <span style="color: #ff79c6;">END IF</span>
  
  <span style="color: #8be9fd;">VISIT</span>(node)
  <span style="color: #8be9fd;">ADD</span>(visited, node)
  
  <span style="color: #ff79c6;">FOR EACH</span> neighbor of node <span style="color: #ff79c6;">DO</span>
    <span style="color: #ff79c6;">IF</span> neighbor not in visited <span style="color: #ff79c6;">THEN</span>
      <span style="color: #8be9fd;">DFS</span>(graph, neighbor, visited)
    <span style="color: #ff79c6;">END IF</span>
  <span style="color: #ff79c6;">END FOR</span>
<span style="color: #ff79c6;">END</span>`,
        
        stack: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">StackOperations</span>
<span style="color: #ff79c6;">BEGIN</span>
  stack = empty stack
  
  <span style="color: #6272a4;">// Push operation</span>
  <span style="color: #ff79c6;">FUNCTION</span> <span style="color: #8be9fd;">PUSH</span>(item)
    stack.top = stack.top + 1
    stack[stack.top] = item
  <span style="color: #ff79c6;">END FUNCTION</span>
  
  <span style="color: #6272a4;">// Pop operation</span>
  <span style="color: #ff79c6;">FUNCTION</span> <span style="color: #8be9fd;">POP</span>()
    <span style="color: #ff79c6;">IF</span> stack.top >= 0 <span style="color: #ff79c6;">THEN</span>
      item = stack[stack.top]
      stack.top = stack.top - 1
      <span style="color: #ff79c6;">RETURN</span> item
    <span style="color: #ff79c6;">END IF</span>
  <span style="color: #ff79c6;">END FUNCTION</span>
<span style="color: #ff79c6;">END</span>`,
        
        queue: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">QueueOperations</span>
<span style="color: #ff79c6;">BEGIN</span>
  queue = empty queue
  front = 0, rear = -1
  
  <span style="color: #6272a4;">// Enqueue operation</span>
  <span style="color: #ff79c6;">FUNCTION</span> <span style="color: #8be9fd;">ENQUEUE</span>(item)
    rear = rear + 1
    queue[rear] = item
  <span style="color: #ff79c6;">END FUNCTION</span>
  
  <span style="color: #6272a4;">// Dequeue operation</span>
  <span style="color: #ff79c6;">FUNCTION</span> <span style="color: #8be9fd;">DEQUEUE</span>()
    <span style="color: #ff79c6;">IF</span> front <= rear <span style="color: #ff79c6;">THEN</span>
      item = queue[front]
      front = front + 1
      <span style="color: #ff79c6;">RETURN</span> item
    <span style="color: #ff79c6;">END IF</span>
  <span style="color: #ff79c6;">END FUNCTION</span>
<span style="color: #ff79c6;">END</span>`,
        
        kmp: `<span style="color: #ff79c6;">ALGORITHM</span> <span style="color: #50fa7b;">KMP_Search</span>(text, pattern)
<span style="color: #ff79c6;">BEGIN</span>
  <span style="color: #6272a4;">// Build failure function</span>
  failure = <span style="color: #8be9fd;">BUILD_FAILURE</span>(pattern)
  
  i = 0, j = 0
  <span style="color: #ff79c6;">WHILE</span> i < length(text) <span style="color: #ff79c6;">DO</span>
    <span style="color: #ff79c6;">IF</span> text[i] == pattern[j] <span style="color: #ff79c6;">THEN</span>
      i = i + 1
      j = j + 1
    <span style="color: #ff79c6;">END IF</span>
    
    <span style="color: #ff79c6;">IF</span> j == length(pattern) <span style="color: #ff79c6;">THEN</span>
      <span style="color: #8be9fd;">PRINT</span> "Found at position", i-j
      j = failure[j-1]
    <span style="color: #ff79c6;">ELSE IF</span> i < length(text) <span style="color: #ff79c6;">AND</span> text[i] != pattern[j] <span style="color: #ff79c6;">THEN</span>
      <span style="color: #ff79c6;">IF</span> j != 0 <span style="color: #ff79c6;">THEN</span>
        j = failure[j-1]
      <span style="color: #ff79c6;">ELSE</span>
        i = i + 1
      <span style="color: #ff79c6;">END IF</span>
    <span style="color: #ff79c6;">END IF</span>
  <span style="color: #ff79c6;">END WHILE</span>
<span style="color: #ff79c6;">END</span>`
    };
    
    return pseudocodes[algo] || 'Pseudocode not available for this algorithm';
}

function getAlgorithmExplanation(algo) {
    const explanations = {
        bubble: "<strong>Bubble Sort:</strong> Compares adjacent elements and swaps them if they're in wrong order. <br><strong>Time:</strong> O(n²) | <strong>Space:</strong> O(1) | <strong>Stable:</strong> Yes",
        selection: "<strong>Selection Sort:</strong> Finds minimum element and places it at beginning. <br><strong>Time:</strong> O(n²) | <strong>Space:</strong> O(1) | <strong>Stable:</strong> No",
        insertion: "<strong>Insertion Sort:</strong> Builds sorted array one element at a time. <br><strong>Time:</strong> O(n²) | <strong>Space:</strong> O(1) | <strong>Stable:</strong> Yes",
        merge: "<strong>Merge Sort:</strong> Divide and conquer algorithm that splits array and merges sorted halves. <br><strong>Time:</strong> O(n log n) | <strong>Space:</strong> O(n) | <strong>Stable:</strong> Yes",
        quick: "<strong>Quick Sort:</strong> Picks pivot and partitions array around it recursively. <br><strong>Time:</strong> O(n log n) avg, O(n²) worst | <strong>Space:</strong> O(log n) | <strong>Stable:</strong> No",
        linear: "<strong>Linear Search:</strong> Sequentially checks each element until target is found. <br><strong>Time:</strong> O(n) | <strong>Space:</strong> O(1)",
        binary: "<strong>Binary Search:</strong> Efficiently finds target in sorted array by halving search space. <br><strong>Time:</strong> O(log n) | <strong>Space:</strong> O(1)",
        bfs: "<strong>BFS Traversal:</strong> Explores graph level by level using queue. <br><strong>Time:</strong> O(V+E) | <strong>Space:</strong> O(V)",
        dfs: "<strong>DFS Traversal:</strong> Explores graph depth-first using stack/recursion. <br><strong>Time:</strong> O(V+E) | <strong>Space:</strong> O(V)",
        stack: "<strong>Stack Operations:</strong> LIFO data structure. Push/Pop from top. <br><strong>Operations:</strong> Push O(1), Pop O(1), Peek O(1)",
        queue: "<strong>Queue Operations:</strong> FIFO data structure. Enqueue rear, dequeue front. <br><strong>Operations:</strong> Enqueue O(1), Dequeue O(1)",
        kmp: "<strong>KMP Algorithm:</strong> String matching using failure function to avoid backtracking. <br><strong>Time:</strong> O(n+m) | <strong>Space:</strong> O(m)"
    };
    return explanations[algo] || '';
}

function generateNewArray() {
    const algo = document.getElementById('algorithm')?.value || 'bubble';
    
    if (['bfs', 'dfs'].includes(algo)) {
        generateGraph();
    } else if (['kmp'].includes(algo)) {
        generateStringData();
    } else if (['stack', 'queue'].includes(algo)) {
        const container = document.getElementById('visualization');
        container.innerHTML = `<div style="text-align: center; color: #666; margin-top: 100px;">Empty ${algo.charAt(0).toUpperCase() + algo.slice(1)}</div>`;
    } else {
        const sizeInput = document.getElementById('arraySize');
        const size = sizeInput ? parseInt(sizeInput.value) || 8 : 8;
        visualArray = [];
        for (let i = 0; i < size; i++) {
            visualArray.push(Math.floor(Math.random() * 80) + 10);
        }
        displayVisualizationArray();
    }
}

function displayVisualizationArray() {
    const container = document.getElementById('visualization');
    let html = '<div class="visualizer-array" style="display: flex; gap: 5px; justify-content: center; align-items: end; height: 250px; margin: 20px 0;">';
    
    const maxValue = Math.max(...visualArray);
    visualArray.forEach((value, index) => {
        const height = (value / maxValue) * 200 + 30;
        const width = Math.max(30, 400 / visualArray.length - 5);
        html += `<div class="array-bar" id="bar${index}" style="width: ${width}px; height: ${height}px; background: var(--primary); color: white; display: flex; align-items: end; justify-content: center; padding: 5px; border-radius: 4px 4px 0 0; font-size: 12px; font-weight: bold; transition: all 0.4s ease; border: 1px solid rgba(255,255,255,0.3);">${value}</div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

async function startVisualization() {
    if (isAnimating) return;
    
    const algo = document.getElementById('algorithm').value;
    const status = document.getElementById('visualStatus');
    
    isAnimating = true;
    status.innerHTML = 'Animation in progress...';
    
    try {
        switch(algo) {
            case 'bubble': await bubbleSortAnimation(); break;
            case 'selection': await selectionSortAnimation(); break;
            case 'insertion': await insertionSortAnimation(); break;
            case 'merge': await mergeSortAnimation(); break;
            case 'quick': await quickSortAnimation(); break;
            case 'linear': await linearSearchAnimation(); break;
            case 'binary': await binarySearchAnimation(); break;
            case 'bfs': await bfsAnimation(); break;
            case 'dfs': await dfsAnimation(); break;
            case 'stack': await stackAnimation(); break;
            case 'queue': await queueAnimation(); break;
            case 'kmp': await kmpAnimation(); break;
            default: status.innerHTML = 'Algorithm not implemented yet';
        }
    } catch (error) {
        status.innerHTML = 'Animation error: ' + error.message;
    }
    
    isAnimating = false;
    if (status.innerHTML === 'Animation in progress...') {
        status.innerHTML = 'Animation complete!';
    }
}

function resetVisualization() {
    if (isAnimating) return;
    
    document.querySelectorAll('.array-bar, .graph-node, .string-char').forEach(el => {
        el.classList.remove('comparing', 'swapping', 'visited', 'current', 'selected');
    });
    
    const algo = document.getElementById('algorithm').value;
    if (['stack', 'queue'].includes(algo)) {
        document.getElementById('visualization').innerHTML = `<div style="text-align: center; color: #666; margin-top: 100px;">Empty ${algo.charAt(0).toUpperCase() + algo.slice(1)}</div>`;
    } else {
        generateNewArray();
    }
    
    document.getElementById('visualStatus').innerHTML = 'Select algorithm and click \'Start\'';
}

function sleep(ms) {
    const speed = document.getElementById('speedControl')?.value || 5;
    const adjustedMs = ms * (11 - speed) / 5;
    return new Promise(resolve => setTimeout(resolve, adjustedMs));
}

function updateStep(description) {
    document.getElementById('stepDescription').innerHTML = description;
}

// Animation Functions
async function bubbleSortAnimation() {
    const arr = [...visualArray];
    const n = arr.length;
    
    updateStep(`Initialize: Array length n = ${n}`);
    await sleep(1000);
    
    for (let i = 0; i < n - 1; i++) {
        updateStep(`Outer loop: Pass ${i+1}, comparing adjacent elements`);
        document.getElementById('visualStatus').innerHTML = `Pass ${i+1}: Bubbling largest element to position ${n-i-1}`;
        await sleep(800);
        
        for (let j = 0; j < n - i - 1; j++) {
            updateStep(`Inner loop: Compare arr[${j}] = ${arr[j]} with arr[${j+1}] = ${arr[j+1]}`);
            
            document.getElementById(`bar${j}`).classList.add('comparing');
            document.getElementById(`bar${j + 1}`).classList.add('comparing');
            
            await sleep(800);
            
            if (arr[j] > arr[j + 1]) {
                updateStep(`${arr[j]} > ${arr[j+1]}, swapping elements`);
                
                document.getElementById(`bar${j}`).classList.add('swapping');
                document.getElementById(`bar${j + 1}`).classList.add('swapping');
                
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                
                await sleep(500);
                
                const maxValue = Math.max(...arr);
                const bar1 = document.getElementById(`bar${j}`);
                const bar2 = document.getElementById(`bar${j + 1}`);
                const height1 = (arr[j] / maxValue) * 200 + 30;
                const height2 = (arr[j + 1] / maxValue) * 200 + 30;
                
                bar1.style.height = height1 + 'px';
                bar1.innerHTML = arr[j];
                bar2.style.height = height2 + 'px';
                bar2.innerHTML = arr[j + 1];
                
                await sleep(500);
            } else {
                updateStep(`${arr[j]} <= ${arr[j+1]}, no swap needed`);
            }
            
            document.getElementById(`bar${j}`).classList.remove('comparing', 'swapping');
            document.getElementById(`bar${j + 1}`).classList.remove('comparing', 'swapping');
        }
    }
    
    updateStep(`Sorting complete! Array is now sorted`);
    document.getElementById('visualStatus').innerHTML = `🎉 Bubble Sort Complete! Array is sorted`;
    visualArray = arr;
}

async function selectionSortAnimation() {
    const arr = [...visualArray];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        document.getElementById(`bar${i}`).classList.add('selected');
        
        for (let j = i + 1; j < n; j++) {
            document.getElementById(`bar${j}`).classList.add('comparing');
            await sleep(300);
            
            if (arr[j] < arr[minIdx]) {
                if (minIdx !== i) document.getElementById(`bar${minIdx}`).classList.remove('selected');
                minIdx = j;
                document.getElementById(`bar${minIdx}`).classList.add('selected');
            }
            
            document.getElementById(`bar${j}`).classList.remove('comparing');
        }
        
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            
            const maxValue = Math.max(...arr);
            const bar1 = document.getElementById(`bar${i}`);
            const bar2 = document.getElementById(`bar${minIdx}`);
            const height1 = (arr[i] / maxValue) * 200 + 30;
            const height2 = (arr[minIdx] / maxValue) * 200 + 30;
            
            bar1.style.height = height1 + 'px';
            bar1.innerHTML = arr[i];
            bar2.style.height = height2 + 'px';
            bar2.innerHTML = arr[minIdx];
            
            await sleep(500);
        }
        
        document.getElementById(`bar${i}`).classList.remove('selected');
        document.getElementById(`bar${minIdx}`).classList.remove('selected');
    }
    
    visualArray = arr;
}

async function insertionSortAnimation() {
    const arr = [...visualArray];
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        document.getElementById(`bar${i}`).classList.add('selected');
        await sleep(500);
        
        while (j >= 0 && arr[j] > key) {
            document.getElementById(`bar${j}`).classList.add('comparing');
            document.getElementById(`bar${j + 1}`).classList.add('swapping');
            
            arr[j + 1] = arr[j];
            
            const maxValue = Math.max(...arr);
            const bar = document.getElementById(`bar${j + 1}`);
            const height = (arr[j + 1] / maxValue) * 200 + 30;
            bar.style.height = height + 'px';
            bar.innerHTML = arr[j + 1];
            
            await sleep(300);
            
            document.getElementById(`bar${j}`).classList.remove('comparing');
            document.getElementById(`bar${j + 1}`).classList.remove('swapping');
            
            j--;
        }
        
        arr[j + 1] = key;
        const maxValue = Math.max(...arr);
        const finalBar = document.getElementById(`bar${j + 1}`);
        const finalHeight = (key / maxValue) * 200 + 30;
        finalBar.style.height = finalHeight + 'px';
        finalBar.innerHTML = key;
        
        document.getElementById(`bar${i}`).classList.remove('selected');
        await sleep(300);
    }
    
    visualArray = arr;
}

async function linearSearchAnimation() {
    const targetInput = document.getElementById('searchTarget');
    let target = targetInput && targetInput.value ? parseInt(targetInput.value) : visualArray[Math.floor(Math.random() * visualArray.length)];
    
    updateStep(`Initialize: Looking for target = ${target}`);
    document.getElementById('visualStatus').innerHTML = `Linear Search: Looking for ${target}`;
    await sleep(1000);
    
    for (let i = 0; i < visualArray.length; i++) {
        updateStep(`Step ${i+1}: Comparing arr[${i}] = ${visualArray[i]} with target = ${target}`);
        document.getElementById(`bar${i}`).classList.add('comparing');
        document.getElementById('visualStatus').innerHTML = `Checking index ${i}: ${visualArray[i]} ${visualArray[i] === target ? '= ' + target + ' ✓' : '≠ ' + target}`;
        await sleep(800);
        
        if (visualArray[i] === target) {
            updateStep(`Match found! arr[${i}] == ${target}, return index ${i}`);
            document.getElementById(`bar${i}`).classList.remove('comparing');
            document.getElementById(`bar${i}`).classList.add('swapping');
            document.getElementById('visualStatus').innerHTML = `🎉 Found ${target} at index ${i}! (${i + 1} comparisons)`;
            return;
        }
        
        document.getElementById(`bar${i}`).classList.remove('comparing');
    }
    
    updateStep(`Loop completed: Target ${target} not found in array, return -1`);
    document.getElementById('visualStatus').innerHTML = `❌ ${target} not found in array (${visualArray.length} comparisons)`;
}

async function binarySearchAnimation() {
    const sortedArray = [...visualArray].sort((a, b) => a - b);
    visualArray = sortedArray;
    displayVisualizationArray();
    
    await sleep(1000);
    document.getElementById('visualStatus').innerHTML = 'Array sorted for binary search';
    await sleep(1000);
    
    const targetInput = document.getElementById('searchTarget');
    let target = targetInput && targetInput.value ? parseInt(targetInput.value) : sortedArray[Math.floor(Math.random() * sortedArray.length)];
    
    let left = 0;
    let right = sortedArray.length - 1;
    let comparisons = 0;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        comparisons++;
        
        for (let i = 0; i < sortedArray.length; i++) {
            document.getElementById(`bar${i}`).classList.remove('comparing', 'swapping', 'selected');
        }
        
        for (let i = left; i <= right; i++) {
            document.getElementById(`bar${i}`).classList.add('comparing');
        }
        
        document.getElementById(`bar${mid}`).classList.add('swapping');
        
        document.getElementById('visualStatus').innerHTML = `Binary Search: Checking middle element at index ${mid}: ${sortedArray[mid]} vs ${target}`;
        await sleep(1200);
        
        if (sortedArray[mid] === target) {
            document.getElementById(`bar${mid}`).classList.remove('swapping');
            document.getElementById(`bar${mid}`).classList.add('selected');
            document.getElementById('visualStatus').innerHTML = `🎉 Found ${target} at index ${mid}! (${comparisons} comparisons)`;
            return;
        } else if (sortedArray[mid] < target) {
            document.getElementById('visualStatus').innerHTML = `${sortedArray[mid]} < ${target}, search right half`;
            left = mid + 1;
        } else {
            document.getElementById('visualStatus').innerHTML = `${sortedArray[mid]} > ${target}, search left half`;
            right = mid - 1;
        }
        
        await sleep(800);
    }
    
    for (let i = 0; i < sortedArray.length; i++) {
        document.getElementById(`bar${i}`).classList.remove('comparing', 'swapping');
    }
    
    document.getElementById('visualStatus').innerHTML = `❌ ${target} not found (${comparisons} comparisons)`;
}

// Graph algorithms helpers
function generateGraph() {
    const container = document.getElementById('visualization');
    const nodes = ['A', 'B', 'C', 'D', 'E'];
    
    let html = '<div style="position: relative; width: 100%; height: 280px; margin: 0 auto;">';
    
    const positions = {
        A: [60, 40], 
        B: [200, 40], 
        C: [340, 40], 
        D: [130, 160], 
        E: [270, 160]
    };
    
    const edges = [['A','B'], ['A','D'], ['B','C'], ['B','E'], ['C','E'], ['D','E']];
    edges.forEach(([from, to]) => {
        const [x1, y1] = positions[from];
        const [x2, y2] = positions[to];
        const length = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
        const angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
        
        html += `<div style="position: absolute; left: ${x1+20}px; top: ${y1+20}px; width: ${length}px; height: 2px; background: #ddd; transform-origin: 0 0; transform: rotate(${angle}deg); z-index: 1;"></div>`;
    });
    
    nodes.forEach(node => {
        const [x, y] = positions[node];
        html += `<div class="graph-node" id="node${node}" style="position: absolute; left: ${x}px; top: ${y}px; width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; z-index: 2; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: all 0.4s ease; cursor: pointer;">${node}</div>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

async function bfsAnimation() {
    generateGraph();
    await sleep(1000);
    
    const visited = new Set();
    const queue = ['A'];
    const order = [];
    
    const neighbors = {
        'A': ['B', 'D'],
        'B': ['A', 'C', 'E'],
        'C': ['B', 'E'],
        'D': ['A', 'E'],
        'E': ['B', 'C', 'D']
    };
    
    document.getElementById('visualStatus').innerHTML = 'BFS: Starting from node A';
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (!visited.has(node)) {
            visited.add(node);
            order.push(node);
            
            document.getElementById(`node${node}`).style.background = '#28a745';
            document.getElementById(`node${node}`).style.transform = 'scale(1.3)';
            document.getElementById('visualStatus').innerHTML = `BFS: Visiting ${node} | Queue: [${queue.join(', ')}] | Visited: ${order.join(' → ')}`;
            
            await sleep(1500);
            
            neighbors[node].forEach(neighbor => {
                if (!visited.has(neighbor) && !queue.includes(neighbor)) {
                    queue.push(neighbor);
                    document.getElementById(`node${neighbor}`).style.border = '3px solid #ffc107';
                }
            });
            
            document.getElementById('visualStatus').innerHTML = `BFS: Added neighbors of ${node} | Queue: [${queue.join(', ')}]`;
            await sleep(1000);
        }
    }
    
    document.getElementById('visualStatus').innerHTML = `🎉 BFS Complete! Traversal order: ${order.join(' → ')}`;
}

async function dfsAnimation() {
    generateGraph();
    await sleep(1000);
    
    const visited = new Set();
    const order = [];
    
    const neighbors = {
        'A': ['B', 'D'],
        'B': ['A', 'C', 'E'],
        'C': ['B', 'E'],
        'D': ['A', 'E'],
        'E': ['B', 'C', 'D']
    };
    
    async function dfsRecursive(node) {
        if (visited.has(node)) return;
        
        visited.add(node);
        order.push(node);
        
        document.getElementById(`node${node}`).style.background = '#28a745';
        document.getElementById(`node${node}`).style.transform = 'scale(1.3)';
        document.getElementById('visualStatus').innerHTML = `DFS: Visiting ${node} | Path: ${order.join(' → ')}`;
        
        await sleep(1500);
        
        for (let neighbor of neighbors[node]) {
            if (!visited.has(neighbor)) {
                document.getElementById(`node${neighbor}`).style.border = '3px solid #ffc107';
                await sleep(500);
                await dfsRecursive(neighbor);
            }
        }
    }
    
    document.getElementById('visualStatus').innerHTML = 'DFS: Starting from node A';
    await dfsRecursive('A');
    
    document.getElementById('visualStatus').innerHTML = `🎉 DFS Complete! Traversal order: ${order.join(' → ')}`;
}

async function stackAnimation() {
    const container = document.getElementById('visualization');
    const stack = [];
    const operations = ['push', 'push', 'push', 'pop', 'push', 'pop', 'pop'];
    const values = [10, 20, 30, 40, 50];
    let valueIndex = 0;
    
    container.innerHTML = '<div style="text-align: center; color: #666;">Empty Stack</div>';
    
    for (let op of operations) {
        await sleep(1000);
        
        if (op === 'push' && valueIndex < values.length) {
            stack.push(values[valueIndex]);
            document.getElementById('visualStatus').innerHTML = `Push ${values[valueIndex]} onto stack`;
            valueIndex++;
        } else if (op === 'pop' && stack.length > 0) {
            const popped = stack.pop();
            document.getElementById('visualStatus').innerHTML = `Pop ${popped} from stack`;
        }
        
        if (stack.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #666; margin-top: 100px;">Empty Stack</div>';
        } else {
            let html = '<div style="display: flex; flex-direction: column-reverse; align-items: center; height: 200px; justify-content: start;">';
            stack.forEach((value, index) => {
                html += `<div style="background: var(--primary); color: white; padding: 15px 30px; margin: 2px; border-radius: 5px; font-weight: bold; border: 2px solid #0056b3;">${value}</div>`;
            });
            html += '</div>';
            container.innerHTML = html;
        }
        
        await sleep(1000);
    }
}

async function queueAnimation() {
    const container = document.getElementById('visualization');
    const queue = [];
    const operations = ['enqueue', 'enqueue', 'dequeue', 'enqueue', 'dequeue'];
    const values = [10, 20, 30, 40];
    let valueIndex = 0;
    
    container.innerHTML = '<div style="text-align: center; color: #666; margin-top: 100px;">Empty Queue</div>';
    
    for (let op of operations) {
        await sleep(1000);
        
        if (op === 'enqueue' && valueIndex < values.length) {
            queue.push(values[valueIndex]);
            document.getElementById('visualStatus').innerHTML = `Enqueue ${values[valueIndex]} to rear`;
            valueIndex++;
        } else if (op === 'dequeue' && queue.length > 0) {
            const dequeued = queue.shift();
            document.getElementById('visualStatus').innerHTML = `Dequeue ${dequeued} from front`;
        }
        
        if (queue.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #666; margin-top: 100px;">Empty Queue</div>';
        } else {
            let html = '<div style="display: flex; align-items: center; justify-content: center; height: 200px; gap: 10px;">';
            html += '<div style="color: #666; margin-right: 10px;">Front →</div>';
            queue.forEach((value, index) => {
                html += `<div style="background: var(--primary); color: white; padding: 15px 20px; border-radius: 5px; font-weight: bold;">${value}</div>`;
            });
            html += '<div style="color: #666; margin-left: 10px;">← Rear</div>';
            html += '</div>';
            container.innerHTML = html;
        }
        
        await sleep(1000);
    }
}

function generateStringData() {
    const textInput = document.getElementById('textInput');
    const patternInput = document.getElementById('patternInput');
    
    const text = (textInput && textInput.value) || 'ABABCABABA';
    const pattern = (patternInput && patternInput.value) || 'ABAB';
    
    const container = document.getElementById('visualization');
    let html = '<div style="text-align: center; padding: 20px;">';
    html += `<div style="margin: 15px 0; font-size: 16px;"><strong>Text:</strong> ${text}</div>`;
    html += `<div style="margin: 15px 0; font-size: 16px;"><strong>Pattern:</strong> ${pattern}</div>`;
    html += '<div id="stringViz" style="font-family: monospace; font-size: 18px; margin: 20px 0; display: flex; justify-content: center; flex-wrap: wrap;">';
    
    for (let i = 0; i < text.length; i++) {
        html += `<span class="string-char" id="char${i}" style="padding: 8px 10px; margin: 2px; border: 2px solid #ddd; background: white; border-radius: 4px; min-width: 20px; text-align: center; transition: all 0.3s ease; cursor: pointer;">${text[i]}</span>`;
    }
    
    html += '</div></div>';
    container.innerHTML = html;
    
    window.currentText = text;
    window.currentPattern = pattern;
}

async function kmpAnimation() {
    generateStringData();
    await sleep(1000);
    
    const text = window.currentText;
    const pattern = window.currentPattern;
    const n = text.length;
    const m = pattern.length;
    
    const failure = new Array(m).fill(0);
    let j = 0;
    
    for (let i = 1; i < m; i++) {
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = failure[j - 1];
        }
        if (pattern[i] === pattern[j]) {
            j++;
        }
        failure[i] = j;
    }
    
    j = 0;
    const matches = [];
    
    for (let i = 0; i < n; i++) {
        document.getElementById(`char${i}`).style.background = '#ffc107';
        document.getElementById(`char${i}`).style.borderColor = '#ffc107';
        document.getElementById(`char${i}`).style.transform = 'scale(1.1)';
        
        while (j > 0 && text[i] !== pattern[j]) {
            j = failure[j - 1];
        }
        
        if (text[i] === pattern[j]) {
            j++;
            document.getElementById(`char${i}`).style.background = '#28a745';
            document.getElementById(`char${i}`).style.color = 'white';
            document.getElementById(`char${i}`).style.borderColor = '#28a745';
        }
        
        if (j === m) {
            matches.push(i - m + 1);
            for (let k = i - m + 1; k <= i; k++) {
                document.getElementById(`char${k}`).style.background = '#dc3545';
                document.getElementById(`char${k}`).style.color = 'white';
                document.getElementById(`char${k}`).style.borderColor = '#dc3545';
            }
            j = failure[j - 1];
        }
        
        await sleep(500);
        document.getElementById(`char${i}`).style.transform = 'scale(1)';
    }
    
    document.getElementById('visualStatus').innerHTML = matches.length > 0 ? 
        `Pattern found at positions: ${matches.join(', ')}` : 'Pattern not found';
}

// Placeholder animations for other algorithms
async function mergeSortAnimation() {
    document.getElementById('visualStatus').innerHTML = 'Merge Sort: Dividing array recursively...';
    await sleep(2000);
    document.getElementById('visualStatus').innerHTML = 'Merge Sort: Merging sorted subarrays...';
    await sleep(2000);
    document.getElementById('visualStatus').innerHTML = 'Merge Sort completed!';
}

async function quickSortAnimation() {
    document.getElementById('visualStatus').innerHTML = 'Quick Sort: Selecting pivot and partitioning...';
    await sleep(3000);
    document.getElementById('visualStatus').innerHTML = 'Quick Sort completed!';
}

function getVirtualLab() {
    return `
        <h2>🔬 Virtual Programming Lab</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; max-height: 400px; overflow-y: auto; padding: 10px;" class="lab-experiments-grid">
            <div class="experiment-card" onclick="startExperiment(1)">
                <h4>📍 Experiment 1: Pointer Arithmetic</h4>
                <p>Memory addresses and pointer operations</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(2)">
                <h4>📊 Experiment 2: Data Structures</h4>
                <p>Stack, Queue, and Linked List operations</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(3)">
                <h4>⏱️ Experiment 3: Algorithm Analysis</h4>
                <p>Compare sorting algorithm performance</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(4)">
                <h4>🔄 Experiment 4: Recursion</h4>
                <p>Factorial, Fibonacci, and recursive patterns</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(5)">
                <h4>💾 Experiment 5: File Operations</h4>
                <p>Read, write, and manipulate files</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(6)">
                <h4>🔢 Experiment 6: String Manipulation</h4>
                <p>String functions and character operations</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(7)">
                <h4>📊 Experiment 7: Matrix Operations</h4>
                <p>2D arrays and matrix calculations</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(8)">
                <h4>🔍 Experiment 8: Search Algorithms</h4>
                <p>Linear and Binary search implementations</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(9)">
                <h4>🎲 Experiment 9: Random Numbers</h4>
                <p>Random generation and probability</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(10)">
                <h4>📊 Experiment 10: Graph Traversal</h4>
                <p>BFS and DFS algorithm visualization</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(11)">
                <h4>🔐 Experiment 11: Bit Manipulation</h4>
                <p>Bitwise operations and bit patterns</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(12)">
                <h4>📊 Experiment 12: Hash Tables</h4>
                <p>Hash functions and collision handling</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(13)">
                <h4>🌳 Experiment 13: Binary Trees</h4>
                <p>Tree traversal and operations</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(14)">
                <h4>📊 Experiment 14: Dynamic Programming</h4>
                <p>Memoization and optimization techniques</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(15)">
                <h4>🔗 Experiment 15: Memory Management</h4>
                <p>malloc, calloc, realloc, and free</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(16)">
                <h4>📊 Experiment 16: Greedy Algorithms</h4>
                <p>Activity selection and optimization</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(17)">
                <h4>🔄 Experiment 17: Backtracking</h4>
                <p>N-Queens and maze solving</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(18)">
                <h4>📊 Experiment 18: Divide & Conquer</h4>
                <p>Merge sort and binary search</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(19)">
                <h4>🔢 Experiment 19: Pattern Matching</h4>
                <p>String searching algorithms</p>
            </div>
            <div class="experiment-card" onclick="startExperiment(20)">
                <h4>📊 Experiment 20: Performance Testing</h4>
                <p>Benchmark and optimize code</p>
            </div>
        </div>
        <div id="experimentArea" style="margin-top: 20px; min-height: 350px; border: 2px solid #ddd; border-radius: 10px; padding: 20px; background: #f8f9fa;">
            <div style="text-align: center; color: #666; margin-top: 100px;">
                <h3>Select an experiment to begin</h3>
                <p>Choose from 20 interactive programming experiments above</p>
            </div>
        </div>
        <style>
        @media (max-width: 768px) {
            .lab-experiments-grid {
                grid-template-columns: 1fr !important;
                max-height: 300px;
            }
            #experimentArea {
                min-height: 250px;
                padding: 15px;
            }
        }
        </style>
    `;
}

function startExperiment(num) {
    const area = document.getElementById('experimentArea');
    if (!area) return;
    
    switch(num) {
        case 1:
            area.innerHTML = `
                <h3>🔬 Experiment 1: Pointer Arithmetic</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <h4>Interactive Pointer Demo:</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                        <div>
                            <h5>Memory Layout:</h5>
                            <div id="memoryLayout" style="font-family: monospace; background: #1e1e1e; color: #0f0; padding: 15px; border-radius: 5px;">
                                Address  | Value<br>
                                ---------|-------<br>
                                0x1000   | 10<br>
                                0x1004   | 20<br>
                                0x1008   | 30<br>
                                0x100C   | 40
                            </div>
                        </div>
                        <div>
                            <h5>Pointer Operations:</h5>
                            <button onclick="demonstratePointer('increment')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">ptr++</button>
                            <button onclick="demonstratePointer('decrement')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">ptr--</button>
                            <button onclick="demonstratePointer('dereference')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">*ptr</button>
                            <button onclick="demonstratePointer('reset')" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Reset</button>
                        </div>
                    </div>
                    <div id="pointerResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; font-family: monospace;">Click buttons to see pointer operations</div>
                </div>
            `;
            currentPointer = 0;
            break;
            
        case 2:
            area.innerHTML = `
                <h3>🔗 Experiment 2: Data Structures</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <div style="margin-bottom: 20px;">
                        <select id="dsType" style="padding: 8px; border-radius: 5px; margin-right: 10px;">
                            <option value="stack">Stack</option>
                            <option value="queue">Queue</option>
                            <option value="linkedlist">Linked List</option>
                        </select>
                        <input type="number" id="dsValue" placeholder="Enter value" style="padding: 8px; border-radius: 5px; margin-right: 10px;">
                        <button onclick="dsOperation('push')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 2px; cursor: pointer;">Add</button>
                        <button onclick="dsOperation('pop')" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 2px; cursor: pointer;">Remove</button>
                        <button onclick="dsOperation('clear')" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 2px; cursor: pointer;">Clear</button>
                    </div>
                    <div id="dsVisualization" style="min-height: 200px; border: 2px dashed #ddd; border-radius: 10px; padding: 20px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 10px;">
                        Empty data structure
                    </div>
                    <div id="dsInfo" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select a data structure and perform operations</div>
                </div>
            `;
            dataStructure = [];
            break;
            
        case 3:
            area.innerHTML = `
                <h3>⏱️ Experiment 3: Algorithm Analysis</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <div style="margin-bottom: 20px;">
                        <label>Array Size: </label>
                        <input type="range" id="arraySize" min="5" max="20" value="10" oninput="updateArraySize()" style="margin: 0 10px;">
                        <span id="sizeDisplay">10</span>
                        <button onclick="generateRandomArray()" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin-left: 20px; cursor: pointer;">Generate Array</button>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <h5>Bubble Sort:</h5>
                            <button onclick="runAlgorithm('bubble')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Run Bubble Sort</button>
                            <div id="bubbleTime" style="margin-top: 10px; font-weight: bold;">Time: -</div>
                        </div>
                        <div>
                            <h5>Selection Sort:</h5>
                            <button onclick="runAlgorithm('selection')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">Run Selection Sort</button>
                            <div id="selectionTime" style="margin-top: 10px; font-weight: bold;">Time: -</div>
                        </div>
                    </div>
                    <div id="algorithmArray" style="display: flex; gap: 5px; justify-content: center; margin: 20px 0; min-height: 60px; align-items: end;"></div>
                    <div id="algorithmResult" style="background: #e9ecef; padding: 15px; border-radius: 5px;">Generate an array to start algorithm analysis</div>
                </div>
            `;
            algorithmArray = [];
            generateRandomArray();
            break;
            
        case 4:
            area.innerHTML = `
                <h3>🔄 Experiment 4: Recursion</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <h5>Recursive Functions:</h5>
                            <button onclick="calculateRecursive('factorial')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Factorial</button>
                            <button onclick="calculateRecursive('fibonacci')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Fibonacci</button>
                            <input type="number" id="recursiveInput" placeholder="Enter number" style="padding: 8px; border-radius: 5px; margin: 5px; width: 120px;">
                        </div>
                        <div>
                            <h5>Call Stack:</h5>
                            <div id="callStack" style="background: #1e1e1e; color: #0f0; padding: 15px; border-radius: 5px; font-family: monospace; min-height: 150px;">Select a function</div>
                        </div>
                    </div>
                    <div id="recursiveResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Choose a function and enter a number</div>
                </div>
            `;
            break;
            
        case 5:
            area.innerHTML = `
                <h3>💾 Experiment 5: File Operations</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <textarea id="fileContent" placeholder="Enter content..." style="width: 100%; height: 100px; padding: 10px; border-radius: 5px; margin-bottom: 15px;"></textarea>
                    <button onclick="simulateFileOp('write')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Write</button>
                    <button onclick="simulateFileOp('read')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Read</button>
                    <div id="fileOutput" style="background: #1e1e1e; color: #0f0; padding: 15px; border-radius: 5px; font-family: monospace; min-height: 150px; margin-top: 15px;">File operations will appear here...</div>
                </div>
            `;
            break;
            
        case 6:
            area.innerHTML = `
                <h3>🔢 Experiment 6: String Manipulation</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="text" id="stringInput" placeholder="Enter string..." style="width: 60%; padding: 10px; border-radius: 5px; margin: 5px;">
                    <input type="text" id="stringInput2" placeholder="Second string..." style="width: 35%; padding: 10px; border-radius: 5px; margin: 5px;">
                    <div style="margin: 15px 0;">
                        <button onclick="stringOperation('length')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Length</button>
                        <button onclick="stringOperation('reverse')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Reverse</button>
                        <button onclick="stringOperation('concat')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Concat</button>
                    </div>
                    <div id="stringResult" style="background: #e9ecef; padding: 15px; border-radius: 5px;">Enter a string and select operation</div>
                </div>
            `;
            break;
            
        case 7:
            area.innerHTML = `
                <h3>📊 Experiment 7: Matrix Operations</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <h5>Matrix A (2x2):</h5>
                            <input type="number" id="a11" value="1" style="width: 40px; margin: 2px;"> <input type="number" id="a12" value="2" style="width: 40px; margin: 2px;"><br>
                            <input type="number" id="a21" value="3" style="width: 40px; margin: 2px;"> <input type="number" id="a22" value="4" style="width: 40px; margin: 2px;">
                            <h5>Matrix B (2x2):</h5>
                            <input type="number" id="b11" value="5" style="width: 40px; margin: 2px;"> <input type="number" id="b12" value="6" style="width: 40px; margin: 2px;"><br>
                            <input type="number" id="b21" value="7" style="width: 40px; margin: 2px;"> <input type="number" id="b22" value="8" style="width: 40px; margin: 2px;">
                        </div>
                        <div>
                            <button onclick="matrixOperation('add')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Add</button>
                            <button onclick="matrixOperation('multiply')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Multiply</button>
                            <button onclick="matrixOperation('transpose')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Transpose A</button>
                        </div>
                    </div>
                    <div id="matrixResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select an operation</div>
                </div>
            `;
            break;
            
        case 8:
            area.innerHTML = `
                <h3>🔍 Experiment 8: Search Algorithms</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <div style="margin-bottom: 15px;">
                        <input type="text" id="searchArray" value="1,3,5,7,9,11,13,15" placeholder="Enter comma-separated numbers" style="width: 60%; padding: 8px; border-radius: 5px;">
                        <input type="number" id="searchTarget" value="7" placeholder="Target" style="width: 20%; padding: 8px; border-radius: 5px; margin-left: 10px;">
                    </div>
                    <button onclick="searchAlgorithm('linear')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Linear Search</button>
                    <button onclick="searchAlgorithm('binary')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Binary Search</button>
                    <div id="searchResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Enter array and target, then select search algorithm</div>
                </div>
            `;
            break;
            
        case 9:
            area.innerHTML = `
                <h3>🎲 Experiment 9: Random Numbers</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <div style="margin-bottom: 15px;">
                        <label>Range: </label>
                        <input type="number" id="minRange" value="1" style="width: 60px; padding: 5px;"> to 
                        <input type="number" id="maxRange" value="100" style="width: 60px; padding: 5px;">
                        <label style="margin-left: 20px;">Count: </label>
                        <input type="number" id="randomCount" value="10" style="width: 60px; padding: 5px;">
                    </div>
                    <button onclick="generateRandom('single')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Generate One</button>
                    <button onclick="generateRandom('multiple')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Generate Multiple</button>
                    <button onclick="generateRandom('stats')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Statistics</button>
                    <div id="randomResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Click a button to generate random numbers</div>
                </div>
            `;
            break;
            
        case 10:
            area.innerHTML = `
                <h3>📊 Experiment 10: Graph Traversal</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <button onclick="graphTraversal('bfs')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">BFS</button>
                    <button onclick="graphTraversal('dfs')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">DFS</button>
                    <div id="traversalResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select traversal algorithm</div>
                </div>
            `;
            break;
            
        case 11:
            area.innerHTML = `
                <h3>🔐 Experiment 11: Bit Manipulation</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="number" id="bitNum1" value="5" style="width: 100px; padding: 8px; border-radius: 5px; margin: 5px;">
                    <input type="number" id="bitNum2" value="3" style="width: 100px; padding: 8px; border-radius: 5px; margin: 5px;">
                    <button onclick="bitOperation('and')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">AND</button>
                    <button onclick="bitOperation('or')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">OR</button>
                    <button onclick="bitOperation('xor')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">XOR</button>
                    <div id="bitResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Enter numbers and select bit operation</div>
                </div>
            `;
            break;
            
        case 12:
            area.innerHTML = `
                <h3>📊 Experiment 12: Hash Tables</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="text" id="hashKey" placeholder="Enter key" style="padding: 8px; border-radius: 5px; margin: 5px;">
                    <input type="text" id="hashValue" placeholder="Enter value" style="padding: 8px; border-radius: 5px; margin: 5px;">
                    <button onclick="hashOperation('insert')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Insert</button>
                    <button onclick="hashOperation('search')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Search</button>
                    <div id="hashResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Hash table operations will appear here</div>
                </div>
            `;
            break;
            
        case 13:
            area.innerHTML = `
                <h3>🌳 Experiment 13: Binary Trees</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="text" id="treeValues" value="50,30,70,20,40,60,80" placeholder="Enter comma-separated values" style="width: 60%; padding: 8px; border-radius: 5px; margin: 5px;">
                    <button onclick="buildTree()" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Build Tree</button>
                    <button onclick="traverseTree('inorder')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Inorder</button>
                    <button onclick="traverseTree('preorder')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Preorder</button>
                    <button onclick="traverseTree('postorder')" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Postorder</button>
                    <div id="treeResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Build a tree to start traversal</div>
                </div>
            `;
            break;
        case 14:
            area.innerHTML = `
                <h3>📊 Experiment 14: Dynamic Programming</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <select id="dpProblem" style="padding: 8px; border-radius: 5px; margin: 5px;">
                        <option value="fibonacci">Fibonacci</option>
                        <option value="knapsack">0/1 Knapsack</option>
                        <option value="lcs">Longest Common Subsequence</option>
                    </select>
                    <input type="number" id="dpInput" value="10" placeholder="Enter n" style="padding: 8px; border-radius: 5px; margin: 5px; width: 100px;">
                    <button onclick="solveDynamicProgramming()" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Solve</button>
                    <div id="dpResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select problem and click solve</div>
                </div>
            `;
            break;
        case 15:
            area.innerHTML = `
                <h3>🔗 Experiment 15: Memory Management</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="number" id="memSize" value="100" placeholder="Size in bytes" style="padding: 8px; border-radius: 5px; margin: 5px; width: 120px;">
                    <button onclick="memoryOperation('malloc')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">malloc</button>
                    <button onclick="memoryOperation('calloc')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">calloc</button>
                    <button onclick="memoryOperation('realloc')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">realloc</button>
                    <button onclick="memoryOperation('free')" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">free</button>
                    <div id="memoryResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Perform memory operations</div>
                </div>
            `;
            break;
        case 16:
            area.innerHTML = `
                <h3>📊 Experiment 16: Greedy Algorithms</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <button onclick="greedyOperation('activity')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Activity Selection</button>
                    <button onclick="greedyOperation('coin')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Coin Change</button>
                    <button onclick="greedyOperation('fractional')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Fractional Knapsack</button>
                    <div id="greedyResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select a greedy algorithm</div>
                </div>
            `;
            break;
        case 17:
            area.innerHTML = `
                <h3>🔄 Experiment 17: Backtracking</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="number" id="backtrackN" value="4" min="1" max="8" placeholder="N" style="padding: 8px; border-radius: 5px; margin: 5px; width: 80px;">
                    <button onclick="backtrackOperation('nqueens')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">N-Queens</button>
                    <button onclick="backtrackOperation('sudoku')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Sudoku</button>
                    <button onclick="backtrackOperation('maze')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Maze Solver</button>
                    <div id="backtrackResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select backtracking problem</div>
                </div>
            `;
            break;
        case 18:
            area.innerHTML = `
                <h3>📊 Experiment 18: Divide & Conquer</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="text" id="divideArray" value="64,34,25,12,22,11,90" placeholder="Enter array" style="width: 60%; padding: 8px; border-radius: 5px; margin: 5px;">
                    <button onclick="divideConquerOperation('mergesort')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Merge Sort</button>
                    <button onclick="divideConquerOperation('quicksort')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Quick Sort</button>
                    <button onclick="divideConquerOperation('binarysearch')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Binary Search</button>
                    <div id="divideResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select divide & conquer algorithm</div>
                </div>
            `;
            break;
        case 19:
            area.innerHTML = `
                <h3>🔢 Experiment 19: Pattern Matching</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <input type="text" id="patternText" value="ABABCABABA" placeholder="Text" style="width: 45%; padding: 8px; border-radius: 5px; margin: 5px;">
                    <input type="text" id="patternSearch" value="ABAB" placeholder="Pattern" style="width: 30%; padding: 8px; border-radius: 5px; margin: 5px;">
                    <button onclick="patternMatchOperation('naive')" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Naive</button>
                    <button onclick="patternMatchOperation('kmp')" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">KMP</button>
                    <button onclick="patternMatchOperation('rabin')" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 3px; cursor: pointer;">Rabin-Karp</button>
                    <div id="patternResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Enter text and pattern, then select algorithm</div>
                </div>
            `;
            break;
        case 20:
            area.innerHTML = `
                <h3>📊 Experiment 20: Performance Testing</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <select id="perfAlgorithm" style="padding: 8px; border-radius: 5px; margin: 5px;">
                        <option value="sorting">Sorting Algorithms</option>
                        <option value="searching">Search Algorithms</option>
                        <option value="datastructures">Data Structures</option>
                    </select>
                    <input type="number" id="perfSize" value="1000" placeholder="Data size" style="padding: 8px; border-radius: 5px; margin: 5px; width: 120px;">
                    <button onclick="performanceTest()" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 5px; margin: 5px; cursor: pointer;">Run Benchmark</button>
                    <div id="performanceResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Select algorithm type and run benchmark</div>
                </div>
            `;
            break;
        default:
            area.innerHTML = `
                <h3>🔬 Experiment ${num}: Interactive Programming Demo</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <p>This experiment demonstrates ${getExperimentDescription(num)}.</p>
                    <button onclick="runExperimentDemo(${num})" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Run Experiment</button>
                    <div id="experimentResult" style="background: #e9ecef; padding: 15px; border-radius: 5px; margin-top: 15px;">Click 'Run Experiment' to see results</div>
                </div>
            `;
            break;
    }
}

// Additional Interactive Functions for Experiments 10-20
let hashTable = {};

function graphTraversal(type) {
    const result = document.getElementById('traversalResult');
    if (type === 'bfs') {
        result.innerHTML = `BFS Traversal:\nOrder: A → B → D → C → E → F\nTime Complexity: O(V + E)\nSpace Complexity: O(V)`;
    } else {
        result.innerHTML = `DFS Traversal:\nOrder: A → B → C → F → E → D\nTime Complexity: O(V + E)\nSpace Complexity: O(V)`;
    }
}

function bitOperation(operation) {
    const num1 = parseInt(document.getElementById('bitNum1').value);
    const num2 = parseInt(document.getElementById('bitNum2').value);
    const result = document.getElementById('bitResult');
    
    switch(operation) {
        case 'and':
            const andResult = num1 & num2;
            result.innerHTML = `Bitwise AND:\n${num1} & ${num2} = ${andResult}\nBinary: ${num1.toString(2)} & ${num2.toString(2)} = ${andResult.toString(2)}`;
            break;
        case 'or':
            const orResult = num1 | num2;
            result.innerHTML = `Bitwise OR:\n${num1} | ${num2} = ${orResult}\nBinary: ${num1.toString(2)} | ${num2.toString(2)} = ${orResult.toString(2)}`;
            break;
        case 'xor':
            const xorResult = num1 ^ num2;
            result.innerHTML = `Bitwise XOR:\n${num1} ^ ${num2} = ${xorResult}\nBinary: ${num1.toString(2)} ^ ${num2.toString(2)} = ${xorResult.toString(2)}`;
            break;
    }
}

function hashOperation(operation) {
    const key = document.getElementById('hashKey').value;
    const value = document.getElementById('hashValue').value;
    const result = document.getElementById('hashResult');
    
    function hashFunction(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % 7;
        }
        return hash;
    }
    
    switch(operation) {
        case 'insert':
            if (key && value) {
                const hash = hashFunction(key);
                hashTable[key] = { value, hash };
                result.innerHTML = `Inserted:\nKey: "${key}"\nValue: "${value}"\nHash: ${hash}\nTotal entries: ${Object.keys(hashTable).length}`;
            }
            break;
        case 'search':
            if (key && hashTable[key]) {
                result.innerHTML = `Found:\nKey: "${key}"\nValue: "${hashTable[key].value}"\nHash: ${hashTable[key].hash}`;
            } else {
                result.innerHTML = `Not found: "${key}"`;
            }
            break;
    }
}

function getExperimentDescription(num) {
    const descriptions = {
        4: 'recursive function calls with factorial and Fibonacci examples',
        5: 'file I/O operations including read, write, and file manipulation',
        6: 'string manipulation functions and character array operations',
        7: 'matrix operations including addition, multiplication, and transpose',
        8: 'search algorithm implementations and performance comparison',
        9: 'random number generation and probability distributions',
        10: 'graph traversal algorithms with BFS and DFS visualization',
        11: 'bitwise operations and bit manipulation techniques',
        12: 'hash table implementation with collision handling',
        13: 'binary tree operations and traversal methods',
        14: 'dynamic programming with memoization techniques',
        15: 'memory management functions and heap allocation',
        16: 'greedy algorithm strategies and optimization problems',
        17: 'backtracking algorithms for constraint satisfaction',
        18: 'divide and conquer approach with recursive solutions',
        19: 'pattern matching algorithms and string searching',
        20: 'performance testing and code optimization techniques'
    };
    return descriptions[num] || 'advanced programming concepts';
}

function runExperimentDemo(num) {
    const result = document.getElementById('experimentResult');
    if (!result) return;
    
    const demos = {
        4: 'Factorial(5) = 120\nFibonacci(7) = 13\nRecursion depth: 7 levels',
        5: 'File created: data.txt\nBytes written: 256\nFile read successfully',
        6: 'String length: 15\nReversed: "gnimmargorP"\nUppercase: "PROGRAMMING"',
        7: 'Matrix A + B = [[8,10],[12,14]]\nMatrix multiplication completed\nTranspose calculated',
        8: 'Linear search: 4 comparisons\nBinary search: 2 comparisons\nTarget found at index 3',
        9: 'Random numbers: [42, 17, 89, 3, 56]\nAverage: 41.4\nStandard deviation: 32.1',
        10: 'BFS traversal: A → B → D → C → E\nDFS traversal: A → B → C → E → D\nPath found',
        11: 'AND: 5 & 3 = 1\nOR: 5 | 3 = 7\nXOR: 5 ^ 3 = 6\nNOT: ~5 = -6',
        12: 'Hash function: key % 7\nCollisions handled with chaining\nLoad factor: 0.71',
        13: 'Inorder: 4 2 5 1 3\nPreorder: 1 2 4 5 3\nPostorder: 4 5 2 3 1\nHeight: 3',
        14: 'Fibonacci DP: O(n) time\nKnapsack solution: value = 220\nMemoization table filled',
        15: 'malloc(100): 0x7fff5fbff890\ncalloc(10,4): 0x7fff5fbff8f4\nMemory freed successfully',
        16: 'Activity selection: 3 activities\nCoin change: 4 coins\nOptimal solution found',
        17: 'N-Queens: 2 solutions for 4x4\nMaze solved in 12 steps\nBacktrack count: 5',
        18: 'Merge sort: O(n log n)\nArray divided into 8 parts\nMerged successfully',
        19: 'Pattern "ABC" found at position 5\nKMP algorithm: 0 false matches\nSearch completed',
        20: 'Bubble sort: 1.2ms\nQuick sort: 0.3ms\nPerformance ratio: 4:1'
    };
    
    result.innerHTML = demos[num] || 'Experiment completed successfully!';
}

// Interactive Experiment Functions
function calculateRecursive(type) {
    const input = parseInt(document.getElementById('recursiveInput').value);
    const callStack = document.getElementById('callStack');
    const result = document.getElementById('recursiveResult');
    
    if (!input || input < 0) {
        result.innerHTML = 'Please enter a positive number';
        return;
    }
    
    let stackTrace = [];
    let finalResult;
    
    if (type === 'factorial') {
        function factorial(n, depth = 0) {
            stackTrace.push(`${'  '.repeat(depth)}factorial(${n})`);
            if (n <= 1) {
                stackTrace.push(`${'  '.repeat(depth)}return 1`);
                return 1;
            }
            const res = n * factorial(n - 1, depth + 1);
            stackTrace.push(`${'  '.repeat(depth)}return ${n} * factorial(${n-1}) = ${res}`);
            return res;
        }
        finalResult = factorial(input);
    } else if (type === 'fibonacci') {
        function fibonacci(n, depth = 0) {
            stackTrace.push(`${'  '.repeat(depth)}fibonacci(${n})`);
            if (n <= 1) {
                stackTrace.push(`${'  '.repeat(depth)}return ${n}`);
                return n;
            }
            const res = fibonacci(n - 1, depth + 1) + fibonacci(n - 2, depth + 1);
            stackTrace.push(`${'  '.repeat(depth)}return fibonacci(${n-1}) + fibonacci(${n-2}) = ${res}`);
            return res;
        }
        finalResult = fibonacci(input);
    }
    
    callStack.innerHTML = stackTrace.join('\n');
    result.innerHTML = `${type}(${input}) = ${finalResult}\nRecursion depth: ${Math.max(...stackTrace.map(s => s.match(/^  */)[0].length / 2)) + 1} levels`;
}

function simulateFileOp(operation) {
    const content = document.getElementById('fileContent').value;
    const output = document.getElementById('fileOutput');
    
    if (operation === 'write') {
        if (!content.trim()) {
            output.innerHTML = 'Error: No content to write';
            return;
        }
        output.innerHTML = `File Operation: WRITE\n` +
                          `Filename: data.txt\n` +
                          `Content: "${content}"\n` +
                          `Bytes written: ${content.length}\n` +
                          `Status: SUCCESS\n` +
                          `File handle: 0x7fff5fbff890`;
    } else if (operation === 'read') {
        output.innerHTML = `File Operation: READ\n` +
                          `Filename: data.txt\n` +
                          `Content read: "${content || 'Hello World'}"\n` +
                          `Bytes read: ${(content || 'Hello World').length}\n` +
                          `Status: SUCCESS\n` +
                          `EOF reached: true`;
    }
}

function stringOperation(operation) {
    const str1 = document.getElementById('stringInput').value;
    const str2 = document.getElementById('stringInput2').value;
    const result = document.getElementById('stringResult');
    
    if (!str1.trim()) {
        result.innerHTML = 'Please enter a string';
        return;
    }
    
    switch(operation) {
        case 'length':
            result.innerHTML = `String: "${str1}"\nLength: ${str1.length} characters\nMemory used: ${str1.length + 1} bytes (including null terminator)`;
            break;
        case 'reverse':
            const reversed = str1.split('').reverse().join('');
            result.innerHTML = `Original: "${str1}"\nReversed: "${reversed}"\nAlgorithm: Two-pointer technique`;
            break;
        case 'concat':
            if (!str2.trim()) {
                result.innerHTML = 'Please enter second string for concatenation';
                return;
            }
            const concatenated = str1 + str2;
            result.innerHTML = `String 1: "${str1}" (${str1.length} chars)\nString 2: "${str2}" (${str2.length} chars)\nConcatenated: "${concatenated}" (${concatenated.length} chars)`;
            break;
    }
}

function matrixOperation(operation) {
    const a11 = parseInt(document.getElementById('a11').value);
    const a12 = parseInt(document.getElementById('a12').value);
    const a21 = parseInt(document.getElementById('a21').value);
    const a22 = parseInt(document.getElementById('a22').value);
    const b11 = parseInt(document.getElementById('b11').value);
    const b12 = parseInt(document.getElementById('b12').value);
    const b21 = parseInt(document.getElementById('b21').value);
    const b22 = parseInt(document.getElementById('b22').value);
    
    const result = document.getElementById('matrixResult');
    
    switch(operation) {
        case 'add':
            const sum = [[a11 + b11, a12 + b12], [a21 + b21, a22 + b22]];
            result.innerHTML = `Matrix Addition:\nA + B = [[${sum[0][0]}, ${sum[0][1]}], [${sum[1][0]}, ${sum[1][1]}]]\nTime Complexity: O(n²)\nSpace Complexity: O(n²)`;
            break;
        case 'multiply':
            const mult = [[a11*b11 + a12*b21, a11*b12 + a12*b22], [a21*b11 + a22*b21, a21*b12 + a22*b22]];
            result.innerHTML = `Matrix Multiplication:\nA × B = [[${mult[0][0]}, ${mult[0][1]}], [${mult[1][0]}, ${mult[1][1]}]]\nTime Complexity: O(n³)\nMultiplications: 8`;
            break;
        case 'transpose':
            const trans = [[a11, a21], [a12, a22]];
            result.innerHTML = `Matrix Transpose:\nA^T = [[${trans[0][0]}, ${trans[0][1]}], [${trans[1][0]}, ${trans[1][1]}]]\nOperation: Swap rows and columns\nTime Complexity: O(n²)`;
            break;
    }
}

function searchAlgorithm(type) {
    const arrayStr = document.getElementById('searchArray').value;
    const target = parseInt(document.getElementById('searchTarget').value);
    const result = document.getElementById('searchResult');
    
    const array = arrayStr.split(',').map(x => parseInt(x.trim()));
    let comparisons = 0;
    let found = false;
    let position = -1;
    
    if (type === 'linear') {
        for (let i = 0; i < array.length; i++) {
            comparisons++;
            if (array[i] === target) {
                found = true;
                position = i;
                break;
            }
        }
        result.innerHTML = `Linear Search Results:\nArray: [${array.join(', ')}]\nTarget: ${target}\nFound: ${found}\nPosition: ${position}\nComparisons: ${comparisons}\nTime Complexity: O(n)`;
    } else if (type === 'binary') {
        const sortedArray = [...array].sort((a, b) => a - b);
        let left = 0, right = sortedArray.length - 1;
        
        while (left <= right) {
            comparisons++;
            const mid = Math.floor((left + right) / 2);
            if (sortedArray[mid] === target) {
                found = true;
                position = mid;
                break;
            } else if (sortedArray[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        result.innerHTML = `Binary Search Results:\nSorted Array: [${sortedArray.join(', ')}]\nTarget: ${target}\nFound: ${found}\nPosition: ${position}\nComparisons: ${comparisons}\nTime Complexity: O(log n)`;
    }
}

function generateRandom(type) {
    const min = parseInt(document.getElementById('minRange').value);
    const max = parseInt(document.getElementById('maxRange').value);
    const count = parseInt(document.getElementById('randomCount').value);
    const result = document.getElementById('randomResult');
    
    if (min >= max) {
        result.innerHTML = 'Error: Minimum must be less than maximum';
        return;
    }
    
    switch(type) {
        case 'single':
            const single = Math.floor(Math.random() * (max - min + 1)) + min;
            result.innerHTML = `Single Random Number:\nRange: ${min} to ${max}\nGenerated: ${single}\nAlgorithm: Linear Congruential Generator`;
            break;
        case 'multiple':
            const numbers = [];
            for (let i = 0; i < count; i++) {
                numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }
            result.innerHTML = `Multiple Random Numbers:\nRange: ${min} to ${max}\nCount: ${count}\nGenerated: [${numbers.join(', ')}]\nUnique values: ${new Set(numbers).size}`;
            break;
        case 'stats':
            const statNumbers = [];
            for (let i = 0; i < count; i++) {
                statNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }
            const avg = statNumbers.reduce((a, b) => a + b, 0) / statNumbers.length;
            const variance = statNumbers.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / statNumbers.length;
            const stdDev = Math.sqrt(variance);
            result.innerHTML = `Statistical Analysis:\nNumbers: [${statNumbers.join(', ')}]\nAverage: ${avg.toFixed(2)}\nVariance: ${variance.toFixed(2)}\nStd Deviation: ${stdDev.toFixed(2)}\nMin: ${Math.min(...statNumbers)}\nMax: ${Math.max(...statNumbers)}`;
            break;
    }
}

function getCodeReviewer() {
    return `
        <h2>🤖 AI Code Reviewer</h2>
        <div style="margin-bottom: 15px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
            <select id="codeLanguage" style="padding: 8px; border-radius: 5px; min-width: 120px;">
                <option value="c">C/C++</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
            </select>
            <button onclick="loadSampleCode()" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">Load Sample</button>
            <button onclick="clearCode()" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">Clear</button>
        </div>
        <div style="display: flex; gap: 20px; height: calc(100% - 100px);" class="code-reviewer-layout">
            <div style="flex: 1;">
                <h4>Submit Your Code:</h4>
                <textarea id="reviewCode" placeholder="Paste your code here for comprehensive review...\n\nSupported languages: C, C++, Python, JavaScript, Java\n\nThe reviewer checks for:\n• Security vulnerabilities\n• Memory leaks\n• Buffer overflows\n• Code quality issues\n• Performance problems\n• Best practices" style="width: 100%; height: 75%; font-family: 'Courier New', monospace; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; resize: vertical;"></textarea>
                <button onclick="reviewCode()" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 5px; margin-top: 10px; cursor: pointer; font-size: 16px;">🔍 Analyze Code</button>
            </div>
            <div style="flex: 1; background: #f8f9fa; padding: 15px; border-radius: 5px; overflow-y: auto;">
                <h4>📊 Analysis Results:</h4>
                <div id="reviewResults">Submit code to get comprehensive analysis with:\n\n🔴 Critical security issues\n⚠️ Warnings and potential bugs\n💡 Code improvement suggestions\n📈 Quality score (0-100)\n\nThe AI reviewer analyzes your code for common programming pitfalls, security vulnerabilities, and best practices.</div>
            </div>
        </div>
        <style>
        @media (max-width: 768px) {
            .code-reviewer-layout {
                flex-direction: column !important;
                height: auto !important;
                gap: 15px;
            }
            .code-reviewer-layout > div {
                flex: none !important;
            }
            #reviewCode {
                height: 200px !important;
                font-size: 12px !important;
            }
        }
        </style>
    `;
}

function getDataStructureVisualizer() {
    return `
        <h2>🏗️ Data Structure Visualizer</h2>
        <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
            <select id="dataStructure" onchange="selectDataStructure()" style="padding: 10px; border-radius: 5px; min-width: 140px;">
                <option value="array">Array</option>
                <option value="linkedlist">Linked List</option>
                <option value="stack">Stack</option>
                <option value="queue">Queue</option>
                <option value="binarytree">Binary Tree</option>
                <option value="graph">Graph</option>
            </select>
            <input type="number" id="dsValue" placeholder="Value" style="padding: 8px; border-radius: 5px; width: 80px;">
            <button onclick="dsAdd()" style="background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">Add</button>
            <button onclick="dsRemove()" style="background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">Remove</button>
            <button onclick="dsSearch()" style="background: #17a2b8; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">Search</button>
            <button onclick="dsClear()" style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 14px;">Clear</button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 300px; gap: 20px;" class="ds-visualizer-grid">
            <div id="dsVisualization" style="height: 450px; border: 2px solid #ddd; border-radius: 10px; background: #f8f9fa; padding: 15px; overflow: hidden; position: relative;">
                <div id="dsCanvas" style="width: 100%; height: 100%; position: relative;"></div>
            </div>
            <div style="background: #1e1e1e; color: #f8f8f2; padding: 15px; border-radius: 10px; overflow-y: auto;">
                <h4 style="color: #50fa7b; margin-top: 0; font-size: 16px;">📋 Operations Log</h4>
                <div id="dsOperations" style="font-family: monospace; font-size: 12px; line-height: 1.4;">Select a data structure to begin</div>
                <div style="margin-top: 15px; padding: 10px; background: #44475a; border-radius: 5px;">
                    <strong style="color: #50fa7b; font-size: 14px;">📊 Properties:</strong>
                    <div id="dsProperties" style="margin-top: 5px; font-size: 11px;">-</div>
                </div>
            </div>
        </div>
        <style>
        @media (max-width: 768px) {
            .ds-visualizer-grid {
                grid-template-columns: 1fr !important;
                gap: 15px;
            }
            #dsVisualization {
                height: 300px !important;
            }
        }
        </style>
    `;
}

let dsData = [];
let dsType = 'array';
let dsAnimating = false;

function selectDataStructure() {
    dsType = document.getElementById('dataStructure').value;
    dsData = [];
    updateVisualization();
    updateOperationsLog(`Selected ${dsType.toUpperCase()}`);
    updateProperties();
}

function dsAdd() {
    if (dsAnimating) return;
    const value = parseInt(document.getElementById('dsValue').value);
    if (isNaN(value)) return;
    
    dsAnimating = true;
    
    switch(dsType) {
        case 'array':
            dsData.push(value);
            animateArrayAdd(value);
            break;
        case 'linkedlist':
            dsData.push(value);
            animateLinkedListAdd(value);
            break;
        case 'stack':
            dsData.push(value);
            animateStackPush(value);
            break;
        case 'queue':
            dsData.push(value);
            animateQueueEnqueue(value);
            break;
        case 'binarytree':
            addToBinaryTree(value);
            animateBinaryTreeAdd(value);
            break;
        case 'graph':
            if (!dsData.includes(value)) {
                dsData.push(value);
                animateGraphAddNode(value);
            }
            break;
    }
    
    document.getElementById('dsValue').value = '';
    updateOperationsLog(`Added ${value}`);
    updateProperties();
    
    setTimeout(() => { dsAnimating = false; }, 800);
}

function dsRemove() {
    if (dsAnimating || dsData.length === 0) return;
    
    dsAnimating = true;
    let removed;
    
    switch(dsType) {
        case 'array':
            removed = dsData.pop();
            animateArrayRemove();
            break;
        case 'linkedlist':
            removed = dsData.pop();
            animateLinkedListRemove();
            break;
        case 'stack':
            removed = dsData.pop();
            animateStackPop();
            break;
        case 'queue':
            removed = dsData.shift();
            animateQueueDequeue();
            break;
        case 'binarytree':
            if (dsData.length > 0) {
                removed = dsData.pop();
                animateBinaryTreeRemove();
            }
            break;
        case 'graph':
            if (dsData.length > 0) {
                removed = dsData.pop();
                animateGraphRemoveNode();
            }
            break;
    }
    
    updateOperationsLog(`Removed ${removed}`);
    updateProperties();
    
    setTimeout(() => { dsAnimating = false; }, 800);
}

function dsSearch() {
    const value = parseInt(document.getElementById('dsValue').value);
    if (isNaN(value)) return;
    
    const found = dsData.includes(value);
    const index = dsData.indexOf(value);
    
    animateSearch(value, found, index);
    updateOperationsLog(`Search ${value}: ${found ? `Found at index ${index}` : 'Not found'}`);
}

function dsClear() {
    dsData = [];
    updateVisualization();
    updateOperationsLog('Cleared all data');
    updateProperties();
}

function updateVisualization() {
    const canvas = document.getElementById('dsCanvas');
    if (!canvas) return;
    
    switch(dsType) {
        case 'array': renderArray(canvas); break;
        case 'linkedlist': renderLinkedList(canvas); break;
        case 'stack': renderStack(canvas); break;
        case 'queue': renderQueue(canvas); break;
        case 'binarytree': renderBinaryTree(canvas); break;
        case 'graph': renderGraph(canvas); break;
    }
}

function renderArray(canvas) {
    let html = '<div style="display: flex; gap: 5px; justify-content: center; align-items: center; height: 100%; flex-wrap: wrap;">';
    
    if (dsData.length === 0) {
        html += '<div style="color: #666; font-size: 18px;">Empty Array</div>';
    } else {
        dsData.forEach((value, index) => {
            html += `<div class="ds-element" id="arr-${index}" style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: all 0.3s ease; position: relative;">`;
            html += `<div style="position: absolute; top: -25px; font-size: 12px; color: #666;">[${index}]</div>`;
            html += `${value}</div>`;
        });
    }
    
    html += '</div>';
    canvas.innerHTML = html;
}

function renderLinkedList(canvas) {
    let html = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; gap: 10px; flex-wrap: wrap;">';
    
    if (dsData.length === 0) {
        html += '<div style="color: #666; font-size: 18px;">Empty Linked List</div>';
    } else {
        dsData.forEach((value, index) => {
            html += `<div class="ds-element" id="ll-${index}" style="display: flex; align-items: center;">`;
            html += `<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 8px rgba(0,0,0,0.2); position: relative;">`;
            html += `<div style="position: absolute; top: -20px; font-size: 10px; color: #666;">Node ${index}</div>`;
            html += `${value}</div>`;
            if (index < dsData.length - 1) {
                html += `<div style="width: 30px; height: 2px; background: #333; margin: 0 5px; position: relative;">`;
                html += `<div style="position: absolute; right: -5px; top: -3px; width: 0; height: 0; border-left: 8px solid #333; border-top: 4px solid transparent; border-bottom: 4px solid transparent;"></div>`;
                html += `</div>`;
            }
            html += `</div>`;
        });
    }
    
    html += '</div>';
    canvas.innerHTML = html;
}

function renderStack(canvas) {
    let html = '<div style="display: flex; flex-direction: column-reverse; align-items: center; justify-content: start; height: 100%; padding-top: 50px;">';
    
    if (dsData.length === 0) {
        html += '<div style="color: #666; font-size: 18px; margin-top: 150px;">Empty Stack</div>';
    } else {
        dsData.forEach((value, index) => {
            const isTop = index === dsData.length - 1;
            html += `<div class="ds-element" id="stack-${index}" style="width: 120px; height: 40px; background: ${isTop ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'}; color: ${isTop ? 'white' : '#333'}; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: bold; margin: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); position: relative; border: ${isTop ? '3px solid #0066cc' : '1px solid #ddd'};">`;
            if (isTop) html += `<div style="position: absolute; right: -60px; color: #0066cc; font-size: 12px; font-weight: bold;">← TOP</div>`;
            html += `${value}</div>`;
        });
    }
    
    html += '</div>';
    canvas.innerHTML = html;
}

function renderQueue(canvas) {
    let html = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; gap: 5px;">';
    
    if (dsData.length === 0) {
        html += '<div style="color: #666; font-size: 18px;">Empty Queue</div>';
    } else {
        html += '<div style="color: #28a745; font-size: 12px; font-weight: bold; margin-right: 10px;">FRONT →</div>';
        dsData.forEach((value, index) => {
            const isFront = index === 0;
            const isRear = index === dsData.length - 1;
            html += `<div class="ds-element" id="queue-${index}" style="width: 60px; height: 60px; background: ${isFront ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' : isRear ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' : 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'}; color: white; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 8px rgba(0,0,0,0.2); margin: 2px; position: relative;">`;
            if (isFront) html += `<div style="position: absolute; top: -25px; color: #28a745; font-size: 10px; font-weight: bold;">FRONT</div>`;
            if (isRear) html += `<div style="position: absolute; bottom: -25px; color: #dc3545; font-size: 10px; font-weight: bold;">REAR</div>`;
            html += `${value}</div>`;
        });
        html += '<div style="color: #dc3545; font-size: 12px; font-weight: bold; margin-left: 10px;">← REAR</div>';
    }
    
    html += '</div>';
    canvas.innerHTML = html;
}

function renderBinaryTree(canvas) {
    if (dsData.length === 0) {
        canvas.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 18px;">Empty Binary Tree</div>';
        return;
    }
    
    let html = '<div style="position: relative; width: 100%; height: 100%; overflow: hidden;">';
    
    // Simple binary tree layout
    const levels = Math.ceil(Math.log2(dsData.length + 1));
    const nodeSize = 40;
    const levelHeight = 80;
    
    dsData.forEach((value, index) => {
        const level = Math.floor(Math.log2(index + 1));
        const posInLevel = index - (Math.pow(2, level) - 1);
        const totalInLevel = Math.pow(2, level);
        
        const x = (posInLevel + 0.5) * (400 / totalInLevel) + 50;
        const y = level * levelHeight + 50;
        
        html += `<div class="ds-element" id="tree-${index}" style="position: absolute; left: ${x}px; top: ${y}px; width: ${nodeSize}px; height: ${nodeSize}px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; box-shadow: 0 4px 8px rgba(0,0,0,0.3); z-index: 2;">${value}</div>`;
        
        // Draw connections
        if (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parentLevel = Math.floor(Math.log2(parentIndex + 1));
            const parentPosInLevel = parentIndex - (Math.pow(2, parentLevel) - 1);
            const parentTotalInLevel = Math.pow(2, parentLevel);
            
            const parentX = (parentPosInLevel + 0.5) * (400 / parentTotalInLevel) + 50 + nodeSize/2;
            const parentY = parentLevel * levelHeight + 50 + nodeSize/2;
            const childX = x + nodeSize/2;
            const childY = y + nodeSize/2;
            
            const length = Math.sqrt(Math.pow(childX - parentX, 2) + Math.pow(childY - parentY, 2));
            const angle = Math.atan2(childY - parentY, childX - parentX) * 180 / Math.PI;
            
            html += `<div style="position: absolute; left: ${parentX}px; top: ${parentY}px; width: ${length}px; height: 2px; background: #333; transform-origin: 0 0; transform: rotate(${angle}deg); z-index: 1;"></div>`;
        }
    });
    
    html += '</div>';
    canvas.innerHTML = html;
}

function renderGraph(canvas) {
    if (dsData.length === 0) {
        canvas.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 18px;">Empty Graph</div>';
        return;
    }
    
    let html = '<div style="position: relative; width: 100%; height: 100%;">';
    
    // Circular layout
    const centerX = 200;
    const centerY = 200;
    const radius = 120;
    
    dsData.forEach((value, index) => {
        const angle = (index * 2 * Math.PI) / dsData.length;
        const x = centerX + radius * Math.cos(angle) - 25;
        const y = centerY + radius * Math.sin(angle) - 25;
        
        html += `<div class="ds-element" id="graph-${index}" style="position: absolute; left: ${x}px; top: ${y}px; width: 50px; height: 50px; background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); color: #333; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; box-shadow: 0 4px 8px rgba(0,0,0,0.2); z-index: 2;">${value}</div>`;
        
        // Draw edges to next nodes (simple ring)
        if (dsData.length > 1) {
            const nextIndex = (index + 1) % dsData.length;
            const nextAngle = (nextIndex * 2 * Math.PI) / dsData.length;
            const nextX = centerX + radius * Math.cos(nextAngle);
            const nextY = centerY + radius * Math.sin(nextAngle);
            
            const currentNodeX = centerX + radius * Math.cos(angle);
            const currentNodeY = centerY + radius * Math.sin(angle);
            
            const length = Math.sqrt(Math.pow(nextX - currentNodeX, 2) + Math.pow(nextY - currentNodeY, 2));
            const edgeAngle = Math.atan2(nextY - currentNodeY, nextX - currentNodeX) * 180 / Math.PI;
            
            html += `<div style="position: absolute; left: ${currentNodeX}px; top: ${currentNodeY}px; width: ${length}px; height: 2px; background: #666; transform-origin: 0 0; transform: rotate(${edgeAngle}deg); z-index: 1;"></div>`;
        }
    });
    
    html += '</div>';
    canvas.innerHTML = html;
}

function updateOperationsLog(operation) {
    const log = document.getElementById('dsOperations');
    const timestamp = new Date().toLocaleTimeString();
    log.innerHTML += `<div style="margin: 2px 0; color: #50fa7b;">[${timestamp}] ${operation}</div>`;
    log.scrollTop = log.scrollHeight;
}

function updateProperties() {
    const props = document.getElementById('dsProperties');
    let info = '';
    
    switch(dsType) {
        case 'array':
            info = `Length: ${dsData.length}\nAccess: O(1)\nSearch: O(n)\nInsertion: O(1) at end\nDeletion: O(1) at end`;
            break;
        case 'linkedlist':
            info = `Length: ${dsData.length}\nAccess: O(n)\nSearch: O(n)\nInsertion: O(1) at head\nDeletion: O(1) at head`;
            break;
        case 'stack':
            info = `Size: ${dsData.length}\nPush: O(1)\nPop: O(1)\nPeek: O(1)\nPrinciple: LIFO`;
            break;
        case 'queue':
            info = `Size: ${dsData.length}\nEnqueue: O(1)\nDequeue: O(1)\nFront: O(1)\nPrinciple: FIFO`;
            break;
        case 'binarytree':
            info = `Nodes: ${dsData.length}\nHeight: ${Math.ceil(Math.log2(dsData.length + 1))}\nSearch: O(log n)\nInsertion: O(log n)\nDeletion: O(log n)`;
            break;
        case 'graph':
            info = `Vertices: ${dsData.length}\nEdges: ${dsData.length}\nTraversal: O(V+E)\nSpace: O(V)`;
            break;
    }
    
    props.innerHTML = info.replace(/\n/g, '<br>');
}

// Animation functions
function animateArrayAdd(value) {
    setTimeout(() => {
        updateVisualization();
        const element = document.getElementById(`arr-${dsData.length - 1}`);
        if (element) {
            element.style.transform = 'scale(0)';
            element.style.animation = 'dsSlideIn 0.5s ease forwards';
        }
    }, 100);
}

function animateArrayRemove() {
    const element = document.getElementById(`arr-${dsData.length}`);
    if (element) {
        element.style.animation = 'dsSlideOut 0.5s ease forwards';
        setTimeout(() => updateVisualization(), 500);
    } else {
        updateVisualization();
    }
}

function animateLinkedListAdd(value) {
    setTimeout(() => {
        updateVisualization();
        const element = document.getElementById(`ll-${dsData.length - 1}`);
        if (element) {
            element.style.animation = 'dsSlideIn 0.5s ease forwards';
        }
    }, 100);
}

function animateLinkedListRemove() {
    const element = document.getElementById(`ll-${dsData.length}`);
    if (element) {
        element.style.animation = 'dsSlideOut 0.5s ease forwards';
        setTimeout(() => updateVisualization(), 500);
    } else {
        updateVisualization();
    }
}

function animateStackPush(value) {
    setTimeout(() => {
        updateVisualization();
        const element = document.getElementById(`stack-${dsData.length - 1}`);
        if (element) {
            element.style.transform = 'translateY(50px)';
            element.style.animation = 'dsStackPush 0.6s ease forwards';
        }
    }, 100);
}

function animateStackPop() {
    const element = document.getElementById(`stack-${dsData.length}`);
    if (element) {
        element.style.animation = 'dsStackPop 0.6s ease forwards';
        setTimeout(() => updateVisualization(), 600);
    } else {
        updateVisualization();
    }
}

function animateQueueEnqueue(value) {
    setTimeout(() => {
        updateVisualization();
        const element = document.getElementById(`queue-${dsData.length - 1}`);
        if (element) {
            element.style.transform = 'translateX(50px)';
            element.style.animation = 'dsQueueEnqueue 0.6s ease forwards';
        }
    }, 100);
}

function animateQueueDequeue() {
    const element = document.getElementById('queue-0');
    if (element) {
        element.style.animation = 'dsQueueDequeue 0.6s ease forwards';
        setTimeout(() => updateVisualization(), 600);
    } else {
        updateVisualization();
    }
}

function animateBinaryTreeAdd(value) {
    setTimeout(() => {
        updateVisualization();
        const element = document.getElementById(`tree-${dsData.length - 1}`);
        if (element) {
            element.style.transform = 'scale(0)';
            element.style.animation = 'dsTreeGrow 0.8s ease forwards';
        }
    }, 100);
}

function animateBinaryTreeRemove() {
    const element = document.getElementById(`tree-${dsData.length}`);
    if (element) {
        element.style.animation = 'dsTreeShrink 0.8s ease forwards';
        setTimeout(() => updateVisualization(), 800);
    } else {
        updateVisualization();
    }
}

function animateGraphAddNode(value) {
    setTimeout(() => {
        updateVisualization();
        const element = document.getElementById(`graph-${dsData.length - 1}`);
        if (element) {
            element.style.transform = 'scale(0)';
            element.style.animation = 'dsGraphPulse 0.8s ease forwards';
        }
    }, 100);
}

function animateGraphRemoveNode() {
    const element = document.getElementById(`graph-${dsData.length}`);
    if (element) {
        element.style.animation = 'dsGraphFade 0.8s ease forwards';
        setTimeout(() => updateVisualization(), 800);
    } else {
        updateVisualization();
    }
}

function animateSearch(value, found, index) {
    if (!found) {
        updateOperationsLog(`Search ${value}: Not found`);
        return;
    }
    
    const elementId = `${dsType === 'array' ? 'arr' : dsType === 'linkedlist' ? 'll' : dsType === 'stack' ? 'stack' : dsType === 'queue' ? 'queue' : dsType === 'binarytree' ? 'tree' : 'graph'}-${index}`;
    const element = document.getElementById(elementId);
    
    if (element) {
        element.style.animation = 'dsSearchHighlight 1.5s ease';
    }
}

function addToBinaryTree(value) {
    // Simple array-based binary tree
    dsData.push(value);
    dsData.sort((a, b) => a - b); // Keep sorted for BST property
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes dsSlideIn {
    from { transform: scale(0) rotate(180deg); opacity: 0; }
    to { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes dsSlideOut {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0) rotate(-180deg); opacity: 0; }
}

@keyframes dsStackPush {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes dsStackPop {
    from { transform: translateY(0) scale(1); opacity: 1; }
    to { transform: translateY(-50px) scale(0.8); opacity: 0; }
}

@keyframes dsQueueEnqueue {
    from { transform: translateX(50px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes dsQueueDequeue {
    from { transform: translateX(0) scale(1); opacity: 1; }
    to { transform: translateX(-50px) scale(0.8); opacity: 0; }
}

@keyframes dsTreeGrow {
    from { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.2); }
    to { transform: scale(1); opacity: 1; }
}

@keyframes dsTreeShrink {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0); opacity: 0; }
}

@keyframes dsGraphPulse {
    from { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.3); }
    to { transform: scale(1); opacity: 1; }
}

@keyframes dsGraphFade {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.5); opacity: 0; }
}

@keyframes dsSearchHighlight {
    0%, 100% { transform: scale(1); box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
    25% { transform: scale(1.2); box-shadow: 0 0 20px #ff6b6b; }
    50% { transform: scale(1.1); box-shadow: 0 0 30px #4ecdc4; }
    75% { transform: scale(1.2); box-shadow: 0 0 20px #45b7d1; }
}

.ds-element:hover {
    transform: scale(1.05) !important;
    cursor: pointer;
}
`;
document.head.appendChild(style);

// Virtual Lab Variables
let memoryBlocks = [];
let currentPointer = 0;
let dataStructure = [];
let algorithmArray = [];

// Virtual Lab Functions
function demonstratePointer(operation) {
    const addresses = ['0x1000', '0x1004', '0x1008', '0x100C'];
    const values = [10, 20, 30, 40];
    const result = document.getElementById('pointerResult');
    
    switch(operation) {
        case 'increment':
            if (currentPointer < 3) currentPointer++;
            result.innerHTML = `ptr++ → ptr now points to ${addresses[currentPointer]} (value: ${values[currentPointer]})`;
            break;
        case 'decrement':
            if (currentPointer > 0) currentPointer--;
            result.innerHTML = `ptr-- → ptr now points to ${addresses[currentPointer]} (value: ${values[currentPointer]})`;
            break;
        case 'dereference':
            result.innerHTML = `*ptr → Dereferencing pointer gives value: ${values[currentPointer]} at address ${addresses[currentPointer]}`;
            break;
        case 'reset':
            currentPointer = 0;
            result.innerHTML = `Reset → ptr points to ${addresses[0]} (value: ${values[0]})`;
            break;
    }
}

function dsOperation(operation) {
    const type = document.getElementById('dsType').value;
    const value = document.getElementById('dsValue').value;
    const visualization = document.getElementById('dsVisualization');
    const info = document.getElementById('dsInfo');
    
    switch(operation) {
        case 'push':
            if (value) {
                if (type === 'queue') {
                    dataStructure.push(parseInt(value));
                    info.innerHTML = `Added ${value} to queue (FIFO - First In, First Out)`;
                } else {
                    dataStructure.push(parseInt(value));
                    info.innerHTML = `Added ${value} to ${type} (LIFO - Last In, First Out)`;
                }
                document.getElementById('dsValue').value = '';
            }
            break;
        case 'pop':
            if (dataStructure.length > 0) {
                let removed;
                if (type === 'queue') {
                    removed = dataStructure.shift();
                    info.innerHTML = `Removed ${removed} from queue (first element)`;
                } else {
                    removed = dataStructure.pop();
                    info.innerHTML = `Removed ${removed} from ${type} (last element)`;
                }
            } else {
                info.innerHTML = `${type} is empty!`;
            }
            break;
        case 'clear':
            dataStructure = [];
            info.innerHTML = `${type} cleared`;
            break;
    }
    
    if (dataStructure.length === 0) {
        visualization.innerHTML = `Empty ${type}`;
    } else {
        let html = '';
        dataStructure.forEach((item, index) => {
            html += `<div style="background: var(--primary); color: white; padding: 10px 15px; border-radius: 5px; margin: 2px; font-weight: bold;">${item}</div>`;
            if (index < dataStructure.length - 1 && type === 'linkedlist') {
                html += '<div style="color: #666;">→</div>';
            }
        });
        visualization.innerHTML = html;
    }
}

function updateArraySize() {
    const size = document.getElementById('arraySize').value;
    document.getElementById('sizeDisplay').textContent = size;
}

function generateRandomArray() {
    const size = parseInt(document.getElementById('arraySize').value);
    algorithmArray = [];
    for (let i = 0; i < size; i++) {
        algorithmArray.push(Math.floor(Math.random() * 50) + 1);
    }
    displayArray();
    document.getElementById('algorithmResult').innerHTML = `Generated random array of size ${size}`;
    document.getElementById('bubbleTime').innerHTML = 'Time: -';
    document.getElementById('selectionTime').innerHTML = 'Time: -';
}

function displayArray() {
    const container = document.getElementById('algorithmArray');
    let html = '';
    algorithmArray.forEach(value => {
        const height = (value / 50) * 40 + 20;
        html += `<div style="width: 25px; height: ${height}px; background: var(--primary); color: white; display: flex; align-items: end; justify-content: center; font-size: 10px; padding: 2px; border-radius: 3px 3px 0 0;">${value}</div>`;
    });
    container.innerHTML = html;
}

function runAlgorithm(type) {
    const startTime = performance.now();
    let arr = [...algorithmArray];
    let comparisons = 0;
    
    if (type === 'bubble') {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                comparisons++;
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
    } else if (type === 'selection') {
        for (let i = 0; i < arr.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    
    const endTime = performance.now();
    const timeTaken = (endTime - startTime).toFixed(3);
    
    document.getElementById(`${type}Time`).innerHTML = `Time: ${timeTaken}ms (${comparisons} comparisons)`;
    document.getElementById('algorithmResult').innerHTML = `${type} sort completed in ${timeTaken}ms with ${comparisons} comparisons. Array is now sorted: [${arr.join(', ')}]`;
}

window.memoryOperation = function(operation) {
    const size = parseInt(document.getElementById('memSize').value);
    const result = document.getElementById('memoryResult');
    
    switch(operation) {
        case 'malloc':
            const block = { size: size, address: `0x${Math.random().toString(16).substr(2, 8)}`, type: 'malloc' };
            memoryBlocks.push(block);
            result.innerHTML = `malloc(${size}):\nAllocated ${size} bytes\nAddress: ${block.address}\nTotal blocks: ${memoryBlocks.length}`;
            break;
        case 'calloc':
            const callocBlock = { size: size * 4, address: `0x${Math.random().toString(16).substr(2, 8)}`, type: 'calloc' };
            memoryBlocks.push(callocBlock);
            result.innerHTML = `calloc(${size}, 4):\nAllocated ${size * 4} bytes (initialized to 0)\nAddress: ${callocBlock.address}\nTotal blocks: ${memoryBlocks.length}`;
            break;
        case 'realloc':
            if (memoryBlocks.length > 0) {
                const lastBlock = memoryBlocks[memoryBlocks.length - 1];
                lastBlock.size = size;
                result.innerHTML = `realloc(${lastBlock.address}, ${size}):\nResized to ${size} bytes\nAddress: ${lastBlock.address}\nTotal blocks: ${memoryBlocks.length}`;
            } else {
                result.innerHTML = 'No memory blocks to reallocate';
            }
            break;
        case 'free':
            if (memoryBlocks.length > 0) {
                const freed = memoryBlocks.pop();
                result.innerHTML = `free() successful\nFreed ${freed.size} bytes\nRemaining blocks: ${memoryBlocks.length}`;
            } else {
                result.innerHTML = 'No memory blocks to free';
            }
            break;
    }
};

window.greedyOperation = function(operation) {
    const result = document.getElementById('greedyResult');
    switch(operation) {
        case 'activity':
            result.innerHTML = 'Activity Selection:\nActivities: [(1,3), (2,5), (4,7), (1,8), (5,9)]\nSelected: (1,3), (4,7), (5,9)\nMaximum activities: 3';
            break;
        case 'coin':
            result.innerHTML = 'Coin Change (Greedy):\nCoins: [25, 10, 5, 1]\nAmount: 67\nSolution: 2×25 + 1×10 + 1×5 + 2×1 = 6 coins';
            break;
        case 'fractional':
            result.innerHTML = 'Fractional Knapsack:\nItems: [(w:10,v:60), (w:20,v:100), (w:30,v:120)]\nCapacity: 50\nOptimal value: 240 (take all items)';
            break;
    }
};

window.reviewCode = function() {
    const code = document.getElementById('reviewCode')?.value || '';
    const result = document.getElementById('reviewResults');
    
    if (!result) return;
    
    if (!code.trim()) {
        result.innerHTML = 'Please enter some code to review.';
        return;
    }
    
    let critical = [];
    let warnings = [];
    let suggestions = [];
    
    // Critical Security Issues
    if (code.includes('gets(')) {
        critical.push('🔴 CRITICAL: gets() is unsafe - buffer overflow risk. Use fgets() instead.');
    }
    if (code.includes('scanf("%s')) {
        critical.push('🔴 CRITICAL: scanf("%s") is unsafe - buffer overflow risk. Use scanf("%99s") with limit.');
    }
    if (code.includes('system(')) {
        critical.push('🔴 CRITICAL: system() calls are security risks. Validate input or use safer alternatives.');
    }
    if (code.includes('eval(')) {
        critical.push('🔴 CRITICAL: eval() is dangerous. Avoid dynamic code execution.');
    }
    
    // Memory Management Issues
    const mallocCount = (code.match(/malloc\s*\(/g) || []).length;
    const callocCount = (code.match(/calloc\s*\(/g) || []).length;
    const freeCount = (code.match(/free\s*\(/g) || []).length;
    const totalAlloc = mallocCount + callocCount;
    
    if (totalAlloc > freeCount) {
        warnings.push(`⚠️ Memory leak: ${totalAlloc} allocations but only ${freeCount} free() calls.`);
    }
    if (freeCount > totalAlloc) {
        warnings.push(`⚠️ Double free risk: ${freeCount} free() calls but only ${totalAlloc} allocations.`);
    }
    
    // Buffer Overflow Risks
    if (code.includes('strcpy(') && !code.includes('strncpy(')) {
        warnings.push('⚠️ Buffer overflow risk: strcpy() is unsafe. Use strncpy() or strlcpy().');
    }
    if (code.includes('strcat(') && !code.includes('strncat(')) {
        warnings.push('⚠️ Buffer overflow risk: strcat() is unsafe. Use strncat() or strlcat().');
    }
    if (code.includes('sprintf(') && !code.includes('snprintf(')) {
        warnings.push('⚠️ Buffer overflow risk: sprintf() is unsafe. Use snprintf().');
    }
    
    // Function Return Values
    if (code.includes('malloc(') && !code.includes('if') && !code.includes('NULL')) {
        warnings.push('⚠️ malloc() return value not checked for NULL.');
    }
    if (code.includes('fopen(') && !code.includes('if') && !code.includes('NULL')) {
        warnings.push('⚠️ fopen() return value not checked for NULL.');
    }
    
    // Code Quality
    if (!code.includes('//') && !code.includes('/*') && code.split('\n').length > 10) {
        suggestions.push('💡 Add comments to explain complex logic in longer code.');
    }
    
    const lines = code.split('\n');
    const longLines = lines.filter(line => line.length > 80);
    if (longLines.length > 0) {
        suggestions.push(`💡 ${longLines.length} lines exceed 80 characters. Consider breaking long lines.`);
    }
    
    // Python-specific checks
    if (code.includes('import ') || code.includes('def ') || code.includes('print(')) {
        if (code.includes('exec(')) {
            critical.push('🔴 CRITICAL: exec() is dangerous. Avoid dynamic code execution.');
        }
        if (code.includes('input(') && !code.includes('int(') && !code.includes('float(')) {
            suggestions.push('💡 input() returns string. Consider type conversion if needed.');
        }
        if (!code.includes('if __name__ == "__main__":') && code.includes('def ')) {
            suggestions.push('💡 Add if __name__ == "__main__": guard for script execution.');
        }
    }
    
    // JavaScript-specific checks
    if (code.includes('var ') || code.includes('function ') || code.includes('console.log')) {
        if (code.includes('var ') && (code.includes('let ') || code.includes('const '))) {
            suggestions.push('💡 Use consistent variable declarations (prefer let/const over var).');
        }
        if (code.includes('==') && !code.includes('===')) {
            suggestions.push('💡 Use strict equality (===) instead of loose equality (==).');
        }
    }
    
    // Generate Report
    let output = '';
    let totalIssues = critical.length + warnings.length;
    
    if (totalIssues === 0 && suggestions.length === 0) {
        output = '<div style="color: #28a745; font-size: 1.1rem; margin: 10px 0;">✅ Excellent! No issues found.</div>';
    } else {
        output += `<div style="margin-bottom: 15px;"><strong>Analysis Summary:</strong> ${totalIssues} issues, ${suggestions.length} suggestions</div>`;
        
        if (critical.length > 0) {
            output += '<h5 style="color: #dc3545; margin: 15px 0 10px 0;">🔴 Critical Issues:</h5>';
            critical.forEach(issue => {
                output += `<div style="background: #f8d7da; color: #721c24; padding: 8px; margin: 5px 0; border-left: 4px solid #dc3545; border-radius: 3px;">${issue}</div>`;
            });
        }
        
        if (warnings.length > 0) {
            output += '<h5 style="color: #fd7e14; margin: 15px 0 10px 0;">⚠️ Warnings:</h5>';
            warnings.forEach(warning => {
                output += `<div style="background: #fff3cd; color: #856404; padding: 8px; margin: 5px 0; border-left: 4px solid #ffc107; border-radius: 3px;">${warning}</div>`;
            });
        }
        
        if (suggestions.length > 0) {
            output += '<h5 style="color: #0d6efd; margin: 15px 0 10px 0;">💡 Suggestions:</h5>';
            suggestions.forEach(suggestion => {
                output += `<div style="background: #d1ecf1; color: #0c5460; padding: 8px; margin: 5px 0; border-left: 4px solid #17a2b8; border-radius: 3px;">${suggestion}</div>`;
            });
        }
        
        // Code Quality Score
        const maxScore = 100;
        const criticalPenalty = critical.length * 25;
        const warningPenalty = warnings.length * 10;
        const suggestionPenalty = suggestions.length * 2;
        const score = Math.max(0, maxScore - criticalPenalty - warningPenalty - suggestionPenalty);
        
        let scoreColor = '#28a745';
        if (score < 50) scoreColor = '#dc3545';
        else if (score < 75) scoreColor = '#ffc107';
        
        output += `<div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; text-align: center;">`;
        output += `<strong>Code Quality Score: <span style="color: ${scoreColor}; font-size: 1.2rem;">${score}/100</span></strong>`;
        output += `</div>`;
    }
    
    result.innerHTML = output;
};

function initVisualizer() {
    generateNewArray();
    selectAlgorithm();
}

// Make functions globally available
window.toggleArticle = toggleArticle;
window.previewPDF = previewPDF;
window.closePDF = closePDF;
window.openTool = openTool;
window.closeTool = closeTool;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.selectAlgorithm = selectAlgorithm;
window.startVisualization = startVisualization;
window.resetVisualization = resetVisualization;
window.generateNewArray = generateNewArray;
window.changeLanguage = changeLanguage;
window.runCode = runCode;
window.clearOutput = clearOutput;
window.startExperiment = startExperiment;
window.demonstratePointer = demonstratePointer;
window.dsOperation = dsOperation;
window.updateArraySize = updateArraySize;
window.generateRandomArray = generateRandomArray;
window.runAlgorithm = runAlgorithm;
window.runExperimentDemo = runExperimentDemo;
window.calculateRecursive = calculateRecursive;
window.simulateFileOp = simulateFileOp;
window.stringOperation = stringOperation;
window.matrixOperation = matrixOperation;
window.searchAlgorithm = searchAlgorithm;
window.generateRandom = generateRandom;
window.graphTraversal = graphTraversal;
window.bitOperation = bitOperation;
window.hashOperation = hashOperation;
window.loadSampleCode = loadSampleCode;
window.clearCode = clearCode;
window.selectDataStructure = selectDataStructure;
window.dsAdd = dsAdd;
window.dsRemove = dsRemove;
window.dsSearch = dsSearch;
window.dsClear = dsClear;

function loadSampleCode() {
    const language = document.getElementById('codeLanguage').value;
    const editor = document.getElementById('reviewCode');
    
    const samples = {
        c: `#include <stdio.h>
#include <stdlib.h>

int main() {
    char buffer[10];
    int *ptr = malloc(100 * sizeof(int));
    
    printf("Enter name: ");
    gets(buffer);  // Unsafe!
    
    strcpy(buffer, "Very long string");  // Buffer overflow!
    
    // Missing free(ptr) - memory leak!
    return 0;
}`,
        python: `import os

def process_user_input():
    user_input = input("Enter command: ")
    
    # Dangerous - arbitrary code execution
    result = eval(user_input)
    
    # Security risk
    os.system(user_input)
    
    return result

# Missing main guard
process_user_input()`,
        javascript: `function processData(data) {
    var result;
    
    // Using eval - dangerous!
    result = eval(data);
    
    // Loose equality
    if (result == "123") {
        console.log("Match found");
    }
    
    // No error handling
    return result.toString();
}

processData(userInput);`,
        java: `public class Example {
    public static void main(String[] args) {
        String userInput = args[0];  // No bounds check
        
        // SQL injection risk
        String query = "SELECT * FROM users WHERE name = '" + userInput + "'";
        
        // Resource leak - no try-with-resources
        FileInputStream fis = new FileInputStream("file.txt");
        
        // Missing fis.close()
    }
}`
    };
    
    editor.value = samples[language] || samples.c;
}

function clearCode() {
    document.getElementById('reviewCode').value = '';
    document.getElementById('reviewResults').innerHTML = 'Code cleared. Submit new code for analysis.';
}
window.buildTree = buildTree;
window.traverseTree = traverseTree;
window.solveDynamicProgramming = solveDynamicProgramming;
window.backtrackOperation = backtrackOperation;
window.divideConquerOperation = divideConquerOperation;
window.patternMatchOperation = patternMatchOperation;
window.performanceTest = performanceTest;

// Interactive Functions for Experiments 13-20
let binaryTree = null;

function buildTree() {
    const values = document.getElementById('treeValues').value.split(',').map(x => parseInt(x.trim()));
    const result = document.getElementById('treeResult');
    
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    
    function insertNode(root, val) {
        if (!root) return new TreeNode(val);
        if (val < root.val) root.left = insertNode(root.left, val);
        else root.right = insertNode(root.right, val);
        return root;
    }
    
    binaryTree = null;
    values.forEach(val => {
        if (!isNaN(val)) binaryTree = insertNode(binaryTree, val);
    });
    
    result.innerHTML = `Binary Search Tree built with values: [${values.join(', ')}]\nTree height: ${getTreeHeight(binaryTree)}\nTotal nodes: ${values.length}`;
}

function getTreeHeight(node) {
    if (!node) return 0;
    return 1 + Math.max(getTreeHeight(node.left), getTreeHeight(node.right));
}

function traverseTree(type) {
    if (!binaryTree) {
        document.getElementById('treeResult').innerHTML = 'Please build a tree first';
        return;
    }
    
    const result = document.getElementById('treeResult');
    const traversal = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            traversal.push(node.val);
            inorder(node.right);
        }
    }
    
    function preorder(node) {
        if (node) {
            traversal.push(node.val);
            preorder(node.left);
            preorder(node.right);
        }
    }
    
    function postorder(node) {
        if (node) {
            postorder(node.left);
            postorder(node.right);
            traversal.push(node.val);
        }
    }
    
    switch(type) {
        case 'inorder': inorder(binaryTree); break;
        case 'preorder': preorder(binaryTree); break;
        case 'postorder': postorder(binaryTree); break;
    }
    
    result.innerHTML = `${type.charAt(0).toUpperCase() + type.slice(1)} Traversal: [${traversal.join(', ')}]\nTime Complexity: O(n)\nSpace Complexity: O(h) where h is height`;
}

function solveDynamicProgramming() {
    const problem = document.getElementById('dpProblem').value;
    const n = parseInt(document.getElementById('dpInput').value);
    const result = document.getElementById('dpResult');
    
    switch(problem) {
        case 'fibonacci':
            const fib = new Array(n + 1);
            fib[0] = 0; fib[1] = 1;
            for (let i = 2; i <= n; i++) {
                fib[i] = fib[i-1] + fib[i-2];
            }
            result.innerHTML = `Fibonacci DP Solution:\nF(${n}) = ${fib[n]}\nMemoization table: [${fib.slice(0, Math.min(10, n+1)).join(', ')}${n > 9 ? '...' : ''}]\nTime: O(n), Space: O(n)`;
            break;
        case 'knapsack':
            const weights = [10, 20, 30];
            const values = [60, 100, 120];
            const capacity = 50;
            const dp = Array(weights.length + 1).fill().map(() => Array(capacity + 1).fill(0));
            
            for (let i = 1; i <= weights.length; i++) {
                for (let w = 1; w <= capacity; w++) {
                    if (weights[i-1] <= w) {
                        dp[i][w] = Math.max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w]);
                    } else {
                        dp[i][w] = dp[i-1][w];
                    }
                }
            }
            result.innerHTML = `0/1 Knapsack DP:\nItems: [(w:10,v:60), (w:20,v:100), (w:30,v:120)]\nCapacity: ${capacity}\nMaximum value: ${dp[weights.length][capacity]}\nTime: O(nW), Space: O(nW)`;
            break;
        case 'lcs':
            const str1 = 'ABCDGH';
            const str2 = 'AEDFHR';
            const m = str1.length, n = str2.length;
            const lcs = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
            
            for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                    if (str1[i-1] === str2[j-1]) {
                        lcs[i][j] = lcs[i-1][j-1] + 1;
                    } else {
                        lcs[i][j] = Math.max(lcs[i-1][j], lcs[i][j-1]);
                    }
                }
            }
            result.innerHTML = `Longest Common Subsequence:\nString 1: "${str1}"\nString 2: "${str2}"\nLCS Length: ${lcs[m][n]}\nTime: O(mn), Space: O(mn)`;
            break;
    }
}

function backtrackOperation(type) {
    const n = parseInt(document.getElementById('backtrackN').value);
    const result = document.getElementById('backtrackResult');
    
    switch(type) {
        case 'nqueens':
            let solutions = 0;
            const board = Array(n).fill().map(() => Array(n).fill(0));
            
            function isSafe(row, col) {
                for (let i = 0; i < col; i++) {
                    if (board[row][i]) return false;
                }
                for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
                    if (board[i][j]) return false;
                }
                for (let i = row, j = col; i < n && j >= 0; i++, j--) {
                    if (board[i][j]) return false;
                }
                return true;
            }
            
            function solveNQueens(col) {
                if (col >= n) {
                    solutions++;
                    return;
                }
                for (let i = 0; i < n; i++) {
                    if (isSafe(i, col)) {
                        board[i][col] = 1;
                        solveNQueens(col + 1);
                        board[i][col] = 0;
                    }
                }
            }
            
            solveNQueens(0);
            result.innerHTML = `N-Queens Problem (N=${n}):\nTotal solutions: ${solutions}\nBacktracking used to explore all possibilities\nTime: O(N!), Space: O(N²)`;
            break;
        case 'sudoku':
            result.innerHTML = `Sudoku Solver:\nUsing backtracking to fill empty cells\nTries values 1-9 for each empty cell\nBacktracks when no valid number found\nTime: O(9^(n*n)), Space: O(n*n)`;
            break;
        case 'maze':
            result.innerHTML = `Maze Solver:\nStarting from (0,0) to reach (${n-1},${n-1})\nExplores all 4 directions: up, down, left, right\nBacktracks when path is blocked\nPath found using DFS with backtracking`;
            break;
    }
}

function divideConquerOperation(type) {
    const arrayStr = document.getElementById('divideArray').value;
    const arr = arrayStr.split(',').map(x => parseInt(x.trim()));
    const result = document.getElementById('divideResult');
    
    switch(type) {
        case 'mergesort':
            function mergeSort(arr) {
                if (arr.length <= 1) return arr;
                const mid = Math.floor(arr.length / 2);
                const left = mergeSort(arr.slice(0, mid));
                const right = mergeSort(arr.slice(mid));
                return merge(left, right);
            }
            
            function merge(left, right) {
                const result = [];
                let i = 0, j = 0;
                while (i < left.length && j < right.length) {
                    if (left[i] <= right[j]) result.push(left[i++]);
                    else result.push(right[j++]);
                }
                return result.concat(left.slice(i)).concat(right.slice(j));
            }
            
            const sorted = mergeSort([...arr]);
            result.innerHTML = `Merge Sort:\nOriginal: [${arr.join(', ')}]\nSorted: [${sorted.join(', ')}]\nDivide: Split array into halves\nConquer: Merge sorted subarrays\nTime: O(n log n), Space: O(n)`;
            break;
        case 'quicksort':
            function quickSort(arr, low = 0, high = arr.length - 1) {
                if (low < high) {
                    const pi = partition(arr, low, high);
                    quickSort(arr, low, pi - 1);
                    quickSort(arr, pi + 1, high);
                }
                return arr;
            }
            
            function partition(arr, low, high) {
                const pivot = arr[high];
                let i = low - 1;
                for (let j = low; j < high; j++) {
                    if (arr[j] < pivot) {
                        i++;
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                }
                [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
                return i + 1;
            }
            
            const quickSorted = quickSort([...arr]);
            result.innerHTML = `Quick Sort:\nOriginal: [${arr.join(', ')}]\nSorted: [${quickSorted.join(', ')}]\nPivot-based partitioning\nRecursive divide & conquer\nTime: O(n log n) avg, Space: O(log n)`;
            break;
        case 'binarysearch':
            const sortedArr = [...arr].sort((a, b) => a - b);
            const target = sortedArr[Math.floor(sortedArr.length / 2)];
            let comparisons = 0;
            
            function binarySearch(arr, target) {
                let left = 0, right = arr.length - 1;
                while (left <= right) {
                    comparisons++;
                    const mid = Math.floor((left + right) / 2);
                    if (arr[mid] === target) return mid;
                    else if (arr[mid] < target) left = mid + 1;
                    else right = mid - 1;
                }
                return -1;
            }
            
            const index = binarySearch(sortedArr, target);
            result.innerHTML = `Binary Search:\nSorted array: [${sortedArr.join(', ')}]\nTarget: ${target}\nFound at index: ${index}\nComparisons: ${comparisons}\nTime: O(log n), Space: O(1)`;
            break;
    }
}

function patternMatchOperation(type) {
    const text = document.getElementById('patternText').value;
    const pattern = document.getElementById('patternSearch').value;
    const result = document.getElementById('patternResult');
    
    switch(type) {
        case 'naive':
            const naiveMatches = [];
            let naiveComparisons = 0;
            for (let i = 0; i <= text.length - pattern.length; i++) {
                let j = 0;
                while (j < pattern.length) {
                    naiveComparisons++;
                    if (text[i + j] !== pattern[j]) break;
                    j++;
                }
                if (j === pattern.length) naiveMatches.push(i);
            }
            result.innerHTML = `Naive Pattern Matching:\nText: "${text}"\nPattern: "${pattern}"\nMatches at: [${naiveMatches.join(', ')}]\nComparisons: ${naiveComparisons}\nTime: O(nm), Space: O(1)`;
            break;
        case 'kmp':
            function buildLPS(pattern) {
                const lps = new Array(pattern.length).fill(0);
                let len = 0, i = 1;
                while (i < pattern.length) {
                    if (pattern[i] === pattern[len]) {
                        len++;
                        lps[i] = len;
                        i++;
                    } else {
                        if (len !== 0) len = lps[len - 1];
                        else { lps[i] = 0; i++; }
                    }
                }
                return lps;
            }
            
            const lps = buildLPS(pattern);
            const kmpMatches = [];
            let kmpComparisons = 0;
            let i = 0, j = 0;
            while (i < text.length) {
                kmpComparisons++;
                if (pattern[j] === text[i]) { i++; j++; }
                if (j === pattern.length) {
                    kmpMatches.push(i - j);
                    j = lps[j - 1];
                } else if (i < text.length && pattern[j] !== text[i]) {
                    if (j !== 0) j = lps[j - 1];
                    else i++;
                }
            }
            result.innerHTML = `KMP Algorithm:\nText: "${text}"\nPattern: "${pattern}"\nLPS array: [${lps.join(', ')}]\nMatches at: [${kmpMatches.join(', ')}]\nComparisons: ${kmpComparisons}\nTime: O(n+m), Space: O(m)`;
            break;
        case 'rabin':
            const rabinMatches = [];
            const prime = 101;
            const d = 256;
            const m = pattern.length;
            const n = text.length;
            let patternHash = 0, textHash = 0, h = 1;
            
            for (let i = 0; i < m - 1; i++) h = (h * d) % prime;
            for (let i = 0; i < m; i++) {
                patternHash = (d * patternHash + pattern.charCodeAt(i)) % prime;
                textHash = (d * textHash + text.charCodeAt(i)) % prime;
            }
            
            for (let i = 0; i <= n - m; i++) {
                if (patternHash === textHash) {
                    let j = 0;
                    while (j < m && text[i + j] === pattern[j]) j++;
                    if (j === m) rabinMatches.push(i);
                }
                if (i < n - m) {
                    textHash = (d * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;
                    if (textHash < 0) textHash += prime;
                }
            }
            result.innerHTML = `Rabin-Karp Algorithm:\nText: "${text}"\nPattern: "${pattern}"\nPattern hash: ${patternHash}\nMatches at: [${rabinMatches.join(', ')}]\nTime: O(nm) worst, O(n+m) avg\nSpace: O(1)`;
            break;
    }
}

function performanceTest() {
    const algorithm = document.getElementById('perfAlgorithm').value;
    const size = parseInt(document.getElementById('perfSize').value);
    const result = document.getElementById('performanceResult');
    
    const testData = Array.from({length: size}, () => Math.floor(Math.random() * 1000));
    
    switch(algorithm) {
        case 'sorting':
            const bubbleStart = performance.now();
            const bubbleData = [...testData];
            for (let i = 0; i < bubbleData.length - 1; i++) {
                for (let j = 0; j < bubbleData.length - i - 1; j++) {
                    if (bubbleData[j] > bubbleData[j + 1]) {
                        [bubbleData[j], bubbleData[j + 1]] = [bubbleData[j + 1], bubbleData[j]];
                    }
                }
            }
            const bubbleTime = performance.now() - bubbleStart;
            
            const quickStart = performance.now();
            const quickData = [...testData];
            quickData.sort((a, b) => a - b);
            const quickTime = performance.now() - quickStart;
            
            result.innerHTML = `Sorting Performance (${size} elements):\nBubble Sort: ${bubbleTime.toFixed(3)}ms\nQuick Sort: ${quickTime.toFixed(3)}ms\nSpeedup: ${(bubbleTime/quickTime).toFixed(1)}x\nBubble: O(n²), Quick: O(n log n)`;
            break;
        case 'searching':
            const sortedData = [...testData].sort((a, b) => a - b);
            const target = sortedData[Math.floor(sortedData.length / 2)];
            
            const linearStart = performance.now();
            let linearIndex = -1;
            for (let i = 0; i < sortedData.length; i++) {
                if (sortedData[i] === target) { linearIndex = i; break; }
            }
            const linearTime = performance.now() - linearStart;
            
            const binaryStart = performance.now();
            let left = 0, right = sortedData.length - 1, binaryIndex = -1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (sortedData[mid] === target) { binaryIndex = mid; break; }
                else if (sortedData[mid] < target) left = mid + 1;
                else right = mid - 1;
            }
            const binaryTime = performance.now() - binaryStart;
            
            result.innerHTML = `Search Performance (${size} elements):\nLinear Search: ${linearTime.toFixed(3)}ms\nBinary Search: ${binaryTime.toFixed(3)}ms\nSpeedup: ${(linearTime/binaryTime).toFixed(1)}x\nLinear: O(n), Binary: O(log n)`;
            break;
        case 'datastructures':
            const arrayStart = performance.now();
            const arr = [];
            for (let i = 0; i < size; i++) arr.push(i);
            const arrayTime = performance.now() - arrayStart;
            
            const setStart = performance.now();
            const set = new Set();
            for (let i = 0; i < size; i++) set.add(i);
            const setTime = performance.now() - setStart;
            
            result.innerHTML = `Data Structure Performance (${size} operations):\nArray insertion: ${arrayTime.toFixed(3)}ms\nSet insertion: ${setTime.toFixed(3)}ms\nArray: O(1) append, Set: O(1) average\nMemory: Array < Set (overhead)`;
            break;
    }
}