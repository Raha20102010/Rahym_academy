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

// Get DOM elements
const lessonsContainer = document.getElementById('lessonsContainer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
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

// Checkout handler
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const courseNames = cart.map(item => item.title).join(', ');
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Create WhatsApp message
    const message = `Hello! I would like to enroll in the following course(s): ${courseNames}. Total monthly investment: $${totalAmount}/month`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/60104210238?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Clear cart
    cart = [];
    updateCart();
});

// Initial render
renderLessons(); 