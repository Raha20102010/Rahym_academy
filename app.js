// Sample lesson data
const lessons = [
    {
        id: 1,
        title: {
            en: 'Beginner English Course (A1-A2)',
            tm: 'Başlangyç Iňlis dili kursy (A1-A2)',
            ru: 'Начальный курс английского языка (A1-A2)'
        },
        description: {
            en: 'Perfect for absolute beginners. Learn basic grammar, vocabulary, and conversation skills.',
            tm: 'Iňlis dilini öwrenmäge başlaýanlar üçin. Esasy grammatika, sözlük we gürrüňdeşlik başarnyklaryny öwreniň.',
            ru: 'Идеально подходит для начинающих. Изучите базовую грамматику, словарный запас и разговорные навыки.'
        },
        details: {
            en: [
                'Basic English grammar structures',
                'Essential everyday vocabulary',
                'Simple conversation practice',
                'Reading and writing fundamentals',
                'Pronunciation basics',
                'Regular homework and exercises',
                'Weekly speaking practice'
            ],
            tm: [
                'Esasy Iňlis dili grammatikasy',
                'Gündelik ulanylýan sözler',
                'Ýönekeý gürrüňdeşlik tejribesi',
                'Okamak we ýazmak esaslary',
                'Aýdylyş esaslary',
                'Yzygiderli öý işleri we gönükmeler',
                'Hepdede bir gezek gepleşik tejribesi'
            ],
            ru: [
                'Базовые грамматические структуры',
                'Основной словарный запас',
                'Практика простых разговоров',
                'Основы чтения и письма',
                'Основы произношения',
                'Регулярные домашние задания',
                'Еженедельная разговорная практика'
            ]
        },
        level: 'beginner',
        image: 'beginner.jpg'
    },
    {
        id: 2,
        title: {
            en: 'Elementary English Course (A2)',
            tm: 'Elementar Iňlis dili kursy (A2)',
            ru: 'Элементарный курс английского языка (A2)'
        },
        description: {
            en: 'Build a strong foundation in English with essential language skills and everyday communication.',
            tm: 'Iňlis diliniň esasy başarnyklaryny we gündelik aragatnaşygy öwreniň.',
            ru: 'Создайте прочную основу английского языка с помощью базовых языковых навыков и повседневного общения.'
        },
        details: {
            en: [
                'Intermediate grammar structures',
                'Expanded vocabulary',
                'Daily conversation practice',
                'Reading comprehension',
                'Writing skills development',
                'Listening exercises',
                'Group discussions'
            ],
            tm: [
                'Orta derejeli grammatika düzümleri',
                'Giňeldilen sözlük',
                'Gündelik gürrüňdeşlik tejribesi',
                'Okaýyş düşünjesi',
                'Ýazuw başarnyklaryny ösdürmek',
                'Diňleýiş gönükmeleri',
                'Topar ara maslahatlaşmalar'
            ],
            ru: [
                'Средние грамматические структуры',
                'Расширенный словарный запас',
                'Ежедневная разговорная практика',
                'Понимание прочитанного',
                'Развитие навыков письма',
                'Упражнения на аудирование',
                'Групповые обсуждения'
            ]
        },
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

let currentLanguage = 'tm'; // Default language
let expandedCard = null;

function toggleLanguage(lang) {
    currentLanguage = lang;
    renderLessons(document.querySelector('.filter-btn.active').dataset.level);
}

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
            <img src="images/${lesson.image}" alt="${lesson.title[currentLanguage]}" class="lesson-image">
            <div class="lesson-content">
                <span class="lesson-level">${getLevelLabel(lesson.level)}</span>
                <h3 class="lesson-title">${lesson.title[currentLanguage]}</h3>
                <p class="lesson-description">${lesson.description[currentLanguage]}</p>
                <div class="lesson-details" style="display: none;">
                    <h4>${
                        currentLanguage === 'en' ? 'Course Details' :
                        currentLanguage === 'tm' ? 'Kurs maglumatlary' :
                        'Детали курса'
                    }:</h4>
                    <ul>
                        ${lesson.details[currentLanguage].map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
                <div class="card-buttons">
                    <button class="expand-btn" onclick="toggleDetails(this)">
                        ${
                            currentLanguage === 'en' ? 'More Info' :
                            currentLanguage === 'tm' ? 'Giňişleýin' :
                            'Подробнее'
                        }
                    </button>
                    <button class="add-to-cart-btn" onclick="addToCart(${lesson.id})">
                        ${
                            currentLanguage === 'en' ? 'Add to Cart' :
                            currentLanguage === 'tm' ? 'Sebede goş' :
                            'Добавить в корзину'
                        }
                    </button>
                </div>
            </div>
        </div>
    `;
}

function toggleDetails(button) {
    const card = button.closest('.lesson-card');
    const details = card.querySelector('.lesson-details');
    const wasExpanded = details.style.display === 'block';

    // Close previously expanded card if it exists and is different from current card
    if (expandedCard && expandedCard !== card) {
        const prevDetails = expandedCard.querySelector('.lesson-details');
        const prevButton = expandedCard.querySelector('.expand-btn');
        prevDetails.style.display = 'none';
        prevButton.textContent = getExpandButtonText(false);
    }

    // Toggle current card
    details.style.display = wasExpanded ? 'none' : 'block';
    button.textContent = getExpandButtonText(!wasExpanded);
    
    // Update expanded card reference
    expandedCard = wasExpanded ? null : card;
}

function getExpandButtonText(isExpanded) {
    if (currentLanguage === 'en') {
        return isExpanded ? 'Less Info' : 'More Info';
    } else if (currentLanguage === 'tm') {
        return isExpanded ? 'Ýap' : 'Giňişleýin';
    } else {
        return isExpanded ? 'Свернуть' : 'Подробнее';
    }
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
                <span class="cart-item-title">${item.title[currentLanguage]}</span>
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
        message += `• ${item.title[currentLanguage]}\n`;
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
        message += `• ${item.title[currentLanguage]}\n`;
    });
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/rahim_5500`, '_blank');
});

// Initial render
renderLessons(); 