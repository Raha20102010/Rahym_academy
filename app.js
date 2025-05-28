// Sample lesson data
const lessons = [
    {
        id: 1,
        title: 'Beginner English Course (A1-A2)',
        description: 'Perfect for absolute beginners. Learn basic grammar, vocabulary, and conversation skills.',
        level: 'beginner',
        image: 'beginner.jpg'
    },
    {
        id: 2,
        title: 'Elementary English Course (A2)',
        description: 'Build a strong foundation in English with essential language skills and everyday communication.',
        level: 'beginner',
        image: 'elementary.jpg'
    },
    {
        id: 3,
        title: 'Pre-Intermediate English Course (B1)',
        description: 'Advance your English skills with more complex grammar and vocabulary.',
        level: 'intermediate',
        image: 'pre-intermediate.jpg'
    },
    {
        id: 4,
        title: 'Intermediate English Course (B1-B2)',
        description: 'Develop fluency and confidence in English through comprehensive practice.',
        level: 'intermediate',
        image: 'intermediate.jpg'
    },
    {
        id: 5,
        title: 'Upper-Intermediate Course (B2)',
        description: 'Master advanced grammar and vocabulary for professional contexts.',
        level: 'advanced',
        image: 'upper-intermediate.jpg'
    },
    {
        id: 6,
        title: 'Advanced English Course (C1-C2)',
        description: 'Achieve native-like fluency and master complex language skills.',
        level: 'advanced',
        image: 'advanced.jpg'
    }
];

// Get DOM elements
const lessonsContainer = document.getElementById('lessonsContainer');
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
        
        lessonCard.innerHTML = createLessonCard(lesson);
        
        lessonsContainer.appendChild(lessonCard);
    });
}

function createLessonCard(lesson) {
    return `
        <div class="lesson-card" data-level="${lesson.level}">
            <img src="images/${lesson.image}" alt="${lesson.title}" class="lesson-image">
            <div class="lesson-content">
                <span class="lesson-level">${getLevelLabel(lesson.level)}</span>
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-description">${lesson.description}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${lesson.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
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
    
    cart.forEach(item => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <span class="cart-item-title">${item.title}</span>
                <button class="remove-from-cart" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `;
    });
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
        message += `• ${item.title}\n`;
    });
    
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
        message += `• ${item.title}\n`;
    });
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/rahim_5500`, '_blank');
});

// Initial render
renderLessons(); 