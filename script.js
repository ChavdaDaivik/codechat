// Global variables
let currentUser = null;
let currentLanguage = 'java';
let chatMessages = [];
let onlineUsers = new Set();

// Practice problems for each language
const practiceProblems = {
    java: [
        {
            title: "Hello World",
            description: "Write a Java program that prints 'Hello, World!' to the console.",
            sampleCode: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
            expectedOutput: "Hello, World!"
        },
        {
            title: "Sum of Two Numbers",
            description: "Write a Java program that takes two numbers as input and prints their sum.",
            sampleCode: `import java.util.Scanner;

public class SumNumbers {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter first number: ");
        int num1 = scanner.nextInt();
        System.out.print("Enter second number: ");
        int num2 = scanner.nextInt();
        int sum = num1 + num2;
        System.out.println("Sum: " + sum);
    }
}`,
            expectedOutput: "Enter first number: 5\nEnter second number: 3\nSum: 8"
        },
        {
            title: "Factorial Calculator",
            description: "Write a Java program to calculate the factorial of a number.",
            sampleCode: `import java.util.Scanner;

public class Factorial {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = scanner.nextInt();
        int factorial = 1;
        for (int i = 1; i <= n; i++) {
            factorial *= i;
        }
        System.out.println("Factorial of " + n + " is: " + factorial);
    }
}`,
            expectedOutput: "Enter a number: 5\nFactorial of 5 is: 120"
        }
    ],
    c: [
        {
            title: "Hello World",
            description: "Write a C program that prints 'Hello, World!' to the console.",
            sampleCode: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
            expectedOutput: "Hello, World!"
        },
        {
            title: "Array Sum",
            description: "Write a C program to find the sum of elements in an array.",
            sampleCode: `#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    int sum = 0;
    
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    
    printf("Sum of array elements: %d\\n", sum);
    return 0;
}`,
            expectedOutput: "Sum of array elements: 15"
        }
    ],
    html: [
        {
            title: "Basic HTML Page",
            description: "Create a basic HTML page with a title and some content.",
            sampleCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first HTML page!</p>
    <ul>
        <li>HTML is fun</li>
        <li>CSS makes it beautiful</li>
        <li>JavaScript makes it interactive</li>
    </ul>
</body>
</html>`,
            expectedOutput: "A webpage with a title 'Welcome to My Website' and a list of items"
        }
    ],
    css: [
        {
            title: "Styling a Button",
            description: "Create CSS styles for a modern button with hover effects.",
            sampleCode: `.my-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.my-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.my-button:active {
    transform: translateY(0);
}`,
            expectedOutput: "A styled button with gradient background and hover effects"
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showMainApp();
    } else {
        showLoginModal();
    }

    // Event listeners
    setupEventListeners();
    
    // Initialize coding practice
    initializeCodingPractice();
    
    // Initialize chat
    initializeChat();
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Language selector
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchLanguage(this.dataset.lang);
        });
    });
    
    // Run code button
    document.getElementById('runCode').addEventListener('click', runCode);
    
    // Chat input
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    document.getElementById('sendMessage').addEventListener('click', sendMessage);
    
    // Copyright button
    document.getElementById('copyrightBtn').addEventListener('click', showAboutModal);
    
    // Close about modal
    document.getElementById('closeAbout').addEventListener('click', hideAboutModal);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('mainApp').classList.add('hidden');
}

function showMainApp() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('currentUser').textContent = `Welcome, ${currentUser}!`;
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Check credentials
    if (username === 'gojoforlief' && password === 'gojo@123') {
        currentUser = username;
        localStorage.setItem('currentUser', currentUser);
        showMainApp();
        errorDiv.textContent = '';
        
        // Add welcome message to chat
        addSystemMessage('Welcome to the secure chat room!');
    } else {
        errorDiv.textContent = 'Invalid username or password. Please try again.';
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    chatMessages = [];
    onlineUsers.clear();
    showLoginModal();
}

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

function initializeCodingPractice() {
    loadProblem(0);
}

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Load first problem for the language
    loadProblem(0);
}

function loadProblem(index) {
    const problems = practiceProblems[currentLanguage];
    if (problems && problems[index]) {
        const problem = problems[index];
        document.getElementById('problemTitle').textContent = `${currentLanguage.toUpperCase()} Practice Problem`;
        document.getElementById('problemDescription').innerHTML = `
            <h4>Problem ${index + 1}: ${problem.title}</h4>
            <p>${problem.description}</p>
            <div class="sample-output">
                <strong>Expected Output:</strong>
                <pre>${problem.expectedOutput}</pre>
            </div>
        `;
        document.getElementById('codeEditor').value = problem.sampleCode;
    }
}

function runCode() {
    const code = document.getElementById('codeEditor').value;
    const outputDiv = document.getElementById('output');
    
    if (!code.trim()) {
        outputDiv.textContent = 'Please write some code first!';
        return;
    }
    
    // Simulate code execution
    outputDiv.innerHTML = '<div style="color: #28a745;">✓ Code executed successfully!</div>';
    
    // For demo purposes, show a sample output
    setTimeout(() => {
        const problems = practiceProblems[currentLanguage];
        if (problems && problems[0]) {
            outputDiv.innerHTML += `<div style="margin-top: 10px; color: #333;">Output:<br><pre>${problems[0].expectedOutput}</pre></div>`;
        }
    }, 1000);
}

function initializeChat() {
    // Add current user to online users
    onlineUsers.add(currentUser);
    updateUserCount();
    
    // Simulate other users joining
    setTimeout(() => {
        onlineUsers.add('CodingBuddy');
        updateUserCount();
        addSystemMessage('CodingBuddy joined the chat');
    }, 2000);
}

function updateUserCount() {
    const count = onlineUsers.size;
    document.getElementById('userCount').textContent = `${count} user${count !== 1 ? 's' : ''} online`;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        addMessage(message, currentUser, true);
        messageInput.value = '';
        
        // Simulate response from other user
        setTimeout(() => {
            const responses = [
                "That's a great solution!",
                "I'm working on the same problem.",
                "Can you help me with the next problem?",
                "Your code looks clean and efficient!",
                "I'm learning a lot from this practice session."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'CodingBuddy', false);
        }, 1000 + Math.random() * 2000);
    }
}

function addMessage(text, sender, isOwn) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isOwn ? 'own' : 'other'}`;
    
    const timestamp = new Date().toLocaleTimeString();
    messageDiv.innerHTML = `
        <div>${text}</div>
        <div class="message-info">${sender} • ${timestamp}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    chatMessages.push({ text, sender, timestamp, isOwn });
}

function addSystemMessage(text) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message system';
    messageDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${text}`;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showAboutModal() {
    document.getElementById('aboutModal').style.display = 'flex';
}

function hideAboutModal() {
    document.getElementById('aboutModal').style.display = 'none';
}

// Add some demo chat messages when switching to chat tab
document.addEventListener('click', function(e) {
    if (e.target.dataset.tab === 'chat') {
        // Add some demo messages if chat is empty
        if (chatMessages.length === 0) {
            setTimeout(() => {
                addMessage("Hey! Ready to practice some coding?", 'CodingBuddy', false);
            }, 500);
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.getElementById('codingTab').classList.contains('active')) {
            runCode();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});
