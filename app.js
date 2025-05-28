// Sample lesson data
const lessons = [
    {
        id: 1,
        title: "Foundation English Course",
        level: "beginner",
        price: 300,
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=500",
        description: "Esasy grammatika, sözlük we ýönekeý gürrüňdeşlik başarnyklaryny öwreniň"
    },
    {
        id: 2,
        title: "Business Communication",
        level: "intermediate",
        price: 300,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500",
        description: "Häzirki zaman iş dünýäsi üçin professional iňlis dili başarnyklaryny ösdüriň"
    },
    {
        id: 3,
        title: "Advanced Mastery Program",
        level: "advanced",
        price: 300,
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=500",
        description: "Öňdebaryjy usullar we ýerli aksentler bilen iňlis diliňizi kämilleşdiriň"
    },
    {
        id: 4,
        title: "Conversational English",
        level: "beginner",
        price: 300,
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=500",
        description: "Gündelik iňlis dilinde gürrüňdeşmekde özüňize ynam döretmegi öwreniň"
    },
    {
        id: 5,
        title: "Academic Excellence",
        level: "advanced",
        price: 300,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500",
        description: "Öňdebaryjy iňlis dili başarnyklary bilen akademiki üstünlik üçin taýýarlanyň"
    },
    {
        id: 6,
        title: "Professional Development",
        level: "intermediate",
        price: 300,
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=500",
        description: "Ýöriteleşdirilen iňlis dili tälimi bilen karýera mümkinçilikleriňizi artdyryň"
    }
];

// Get videos from localStorage instead of using sample data
function getVideos() {
    const storedVideos = localStorage.getItem('videos');
    return storedVideos ? JSON.parse(storedVideos) : [];
}

// Initial render - moved to top to ensure it runs immediately
document.addEventListener('DOMContentLoaded', () => {
    renderLessons();
    renderVideos();
});

// Get DOM elements
const lessonsContainer = document.getElementById('lessonsContainer');
const videoContainer = document.getElementById('videoContainer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const filterBtns = document.querySelectorAll('.filter-btn');

// Shopping cart array
let cart = [];

// Render lessons
function renderLessons(filterLevel = 'all') {
    lessonsContainer.innerHTML = '';
    
    const filteredLessons = filterLevel === 'all' 
        ? lessons 
        : lessons.filter(lesson => lesson.level === filterLevel);

    filteredLessons.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        
        lessonCard.innerHTML = `
            <img src="${lesson.image}" alt="${lesson.title}" class="lesson-image">
            <div class="lesson-content">
                <span class="lesson-level">${lesson.level}</span>
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-description">${lesson.description}</p>
                <div class="lesson-price">$${lesson.price}/month</div>
                <button class="add-to-cart-btn" onclick="addToCart(${lesson.id})">Enroll Now</button>
            </div>
        `;
        
        lessonsContainer.appendChild(lessonCard);
    });
}

// Render videos
function renderVideos() {
    if (!videoContainer) return;
    
    videoContainer.innerHTML = '';
    const videos = getVideos();
    
    if (videos.length === 0) {
        videoContainer.innerHTML = `
            <div style="text-align: center; color: #666; padding: 2rem;">
                <p>Häzirki wagtda wideolar ýok.</p>
                <p>Täze wideolar goşulan badyna şu ýerde peýda bolar.</p>
            </div>
        `;
        return;
    }
    
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        
        videoCard.innerHTML = `
            <div class="video-player">
                <video class="video-thumbnail" controls>
                    <source src="${video.data}" type="${video.type}">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
                <div class="video-meta">
                    <span>Added: ${new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        
        videoContainer.appendChild(videoCard);
    });
}

// Add to cart
function addToCart(lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson && !cart.find(item => item.id === lesson.id)) {
        cart.push(lesson);
        updateCart();
    } else {
        alert('This course is already in your cart');
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <span class="cart-item-title">${item.title}</span>
            <span class="cart-item-price">$${item.price}/month</span>
            <button class="remove-from-cart" onclick="removeFromCart(${index})">×</button>
        `;
        
        cartItems.appendChild(cartItem);
        total += item.price;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}/month`;
}

// Filter lessons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLessons(btn.dataset.level);
    });
});

// Handle checkout buttons
document.getElementById('checkoutBtnWhatsapp').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let message = "Hello! I would like to enroll in the following courses:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.title} - $${item.price}/month\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\nTotal Investment: $${total.toFixed(2)}/month`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/60104210238?text=${encodedMessage}`, '_blank');
});

document.getElementById('checkoutBtnTelegram').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let message = "Hello! I would like to enroll in the following courses:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.title} - $${item.price}/month\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\nTotal Investment: $${total.toFixed(2)}/month`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/rahim_5500?text=${encodedMessage}`, '_blank');
});

// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const closeSidebar = document.getElementById('closeSidebar');

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

// Chat Widget Functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatContainer = document.querySelector('.chat-container');

    // Toggle chat widget
    chatToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            chatInput.focus();
        }
    });

    // Prevent chat container clicks from closing
    chatContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (!chatWidget.contains(e.target)) {
            chatWidget.classList.remove('active');
        }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Send message on enter (shift+enter for new line)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage.click();
        }
    });

    // Handle send message button
    sendMessage.addEventListener('click', async function() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';
        chatInput.style.height = 'auto';

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Get and display AI response
        try {
            const response = await getAIResponse(message);
            typingIndicator.remove();
            addMessage(response);
        } catch (error) {
            typingIndicator.remove();
            addMessage('Sorry, there was an error. Please try again later.');
        }
    });
});

// Add message to chat
function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
}

// AI response function
async function getAIResponse(userMessage) {
    try {
        // Try to use the API first
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error('API not available');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.log('Falling back to local responses');
        // Fallback to predefined responses if API is not available
        const responses = {
            'price': 'Biziň kurslarymyzyň bahasy aýda $300. Bu bahanyň içine ähli sapaklar we materiallar girýär.',
            'course': 'Biz dürli derejede iňlis dili kurslaryny hödürleýäris: Başlangyç (A1-A2), Orta (B1-B2) we Ýokary (C1-C2) derejeleri.',
            'teacher': 'Biziň mugallymlarymyz tejribeli we hünärmen. Olar iňlis dilini öwretmekde ýörite sertifikatlara eýe.',
            'online': 'Hawa, biz online sapaklary hödürleýäris. Sapaklar Zoom ýa-da Google Meet arkaly geçirilýär.',
            'schedule': 'Sapak wagtlaryny siziň amatlylygňyza görä düzüp bileris. Adatça sapaklar hepdede 3 gezek geçirilýär.',
            'duration': 'Her sapak 1 sagat 30 minut dowam edýär.',
            'material': 'Ähli okuw materiallary mugt berilýär. Biz häzirki zaman okuw kitaplaryny we online resurslary ulanýarys.',
            'certificate': 'Kursy üstünlikli tamamlan soň, size sertifikat berilýär.',
            'payment': 'Töleg her aýyň başynda edilýär. Biz nagt we bank geçirmeleri kabul edýäris.',
            'trial': 'Hawa, biz mugt synag sapadyny hödürleýäris. Şol sapakda siziň derejeňizi kesgitläp, size gabat gelýän topary saýlarys.',
            'contact': 'Biz bilen WhatsApp (+60104210238) ýa-da Telegram (@rahim_5500) arkaly habarlaşyp bilersiňiz.',
            'location': 'Häzirki wagtda diňe online sapaklar geçirilýär.',
            'registration': 'Ýazylmak üçin, WhatsApp ýa-da Telegram arkaly habarlaşyp bilersiňiz.',
            'level': 'Siziň derejeňizi kesgitlemek üçin, biz mugt test geçirýäris.',
            'group': 'Toparlar 4-6 adamdan ybarat. Bu her okuwça ýeterlik üns bermäge mümkinçilik berýär.'
        };

        // Default response if no keyword match is found
        let response = 'Bagyşlaň, men size başga maglumat berip bilerin. Sapaklar, bahalar ýa-da beýleki soraglar barada sorap bilersiňiz.';

        // Check message for keywords
        const message = userMessage.toLowerCase();
        for (const [keyword, answer] of Object.entries(responses)) {
            if (message.includes(keyword)) {
                response = answer;
                break;
            }
        }

        return response;
    }
} 