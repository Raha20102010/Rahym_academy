// Sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');

    if (sidebarToggle && sidebar && closeSidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });

        // Prevent clicks inside sidebar from closing it
        sidebar.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Chat widget functionality
    const chatWidget = document.querySelector('.chat-widget');
    const chatToggle = document.querySelector('.chat-toggle');
    const chatInput = document.querySelector('.chat-input textarea');
    const chatSendButton = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    if (chatWidget && chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.toggle('active');
        });

        // Handle chat message sending
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMessageDiv = document.createElement('div');
                userMessageDiv.className = 'message user-message';
                userMessageDiv.textContent = message;
                chatMessages.appendChild(userMessageDiv);

                // Clear input
                chatInput.value = '';

                // Show typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'typing-indicator';
                typingIndicator.innerHTML = `
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                `;
                chatMessages.appendChild(typingIndicator);

                // Simulate bot response
                setTimeout(() => {
                    // Remove typing indicator
                    typingIndicator.remove();

                    // Add bot response
                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.className = 'message bot-message';
                    botMessageDiv.textContent = "Thanks for your message! I'll get back to you soon.";
                    chatMessages.appendChild(botMessageDiv);

                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1500);
            }
        };

        // Send message on button click
        if (chatSendButton) {
            chatSendButton.addEventListener('click', sendMessage);
        }

        // Send message on Enter key (but allow new lines with Shift+Enter)
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (chatWidget.classList.contains('active') &&
                !chatWidget.contains(e.target) &&
                !chatToggle.contains(e.target)) {
                chatWidget.classList.remove('active');
            }
        });

        // Prevent clicks inside chat widget from closing it
        chatWidget.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}); 