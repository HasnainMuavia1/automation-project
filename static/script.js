// Modern Chatbot JavaScript with Dark Mode Support
class Chatbot {
    constructor() {
        this.chatHistory = [];
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.currentChatId = this.generateChatId();
        this.isTyping = false;
        
        this.initializeTheme();
        this.initializeEventListeners();
        this.loadChatHistory();
    }
    
    initializeTheme() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.updateThemeButton(true);
        }
    }
    
    initializeEventListeners() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.querySelector('.chat-input .btn');
        
        messageInput.addEventListener('input', () => {
            this.adjustTextareaHeight(messageInput);
        });
        
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-focus on input
        messageInput.focus();
    }
    
    adjustTextareaHeight(element) {
        element.style.height = 'auto';
        element.style.height = Math.min(element.scrollHeight, 120) + 'px';
    }
    
    generateChatId() {
        return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    startNewChat() {
        this.currentChatId = this.generateChatId();
        this.chatHistory = [];
        this.clearChatMessages();
        this.showWelcomeMessage();
        this.updateChatHistory();
    }
    
    clearChatMessages() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
    }
    
    showWelcomeMessage() {
        const chatMessages = document.getElementById('chatMessages');
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">
                        Hello! I'm your AI assistant powered by a RAG (Retrieval-Augmented Generation) system. 
                        I can help you with questions based on the documents in my knowledge base. 
                        How can I assist you today?
                    </div>
                    <div class="message-time">
                        <small class="text-muted">Just now</small>
                    </div>
                </div>
            </div>
        `;
        chatMessages.appendChild(welcomeMessage);
        this.scrollToBottom();
    }
    
    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;
        
        // Clear input and reset height
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Send message to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            if (data.status === 'success') {
                // Add bot response to chat
                this.addMessage(data.response, 'bot');
                
                // Save to chat history
                this.chatHistory.push({
                    user: message,
                    bot: data.response,
                    timestamp: new Date().toISOString()
                });
                
                this.updateChatHistory();
            } else {
                this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
            
        } catch (error) {
            console.error('Error:', error);
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }
    
    addMessage(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <div class="message-text">${this.formatMessage(content)}</div>
                <div class="message-time">
                    <small class="text-muted">${timestamp}</small>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Add animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 100);
    }
    
    formatMessage(content) {
        // Convert line breaks to HTML
        return content.replace(/\n/g, '<br>');
    }
    
    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.style.display = 'block';
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.style.display = 'none';
    }
    
    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
    
    updateChatHistory() {
        const chatHistoryDiv = document.getElementById('chatHistory');
        chatHistoryDiv.innerHTML = '';
        
        if (this.chatHistory.length === 0) {
            chatHistoryDiv.innerHTML = '<div class="text-muted small">No recent chats</div>';
            return;
        }
        
        this.chatHistory.forEach((chat, index) => {
            const chatItem = document.createElement('div');
            chatItem.className = 'chat-item';
            chatItem.innerHTML = `
                <div class="small fw-bold">Chat ${index + 1}</div>
                <div class="small text-muted">${chat.user.substring(0, 30)}${chat.user.length > 30 ? '...' : ''}</div>
            `;
            chatItem.onclick = () => this.loadChat(index);
            chatHistoryDiv.appendChild(chatItem);
        });
    }
    
    loadChat(index) {
        // Implementation for loading specific chat
        console.log('Loading chat:', index);
    }
    
    loadChatHistory() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            this.chatHistory = JSON.parse(savedHistory);
            this.updateChatHistory();
        }
    }
    
    saveChatHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        
        localStorage.setItem('darkMode', this.isDarkMode);
        this.updateThemeButton(this.isDarkMode);
    }
    
    updateThemeButton(isDark) {
        const themeIcon = document.getElementById('themeIcon');
        const themeText = document.getElementById('themeText');
        
        if (isDark) {
            themeIcon.className = 'fas fa-sun me-2';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon me-2';
            themeText.textContent = 'Dark Mode';
        }
    }
}

// Global functions for HTML onclick events
let chatbot;

document.addEventListener('DOMContentLoaded', function() {
    chatbot = new Chatbot();
});

function sendMessage() {
    if (chatbot) {
        chatbot.sendMessage();
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function startNewChat() {
    if (chatbot) {
        chatbot.startNewChat();
    }
}

function toggleTheme() {
    if (chatbot) {
        chatbot.toggleTheme();
    }
}

// Auto-save chat history periodically
setInterval(() => {
    if (chatbot && chatbot.chatHistory.length > 0) {
        chatbot.saveChatHistory();
    }
}, 30000); // Save every 30 seconds

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden && chatbot) {
        chatbot.saveChatHistory();
    }
});

// Handle beforeunload to save data
window.addEventListener('beforeunload', function() {
    if (chatbot) {
        chatbot.saveChatHistory();
    }
});
