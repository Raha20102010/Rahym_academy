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
        image: 'https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg'
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
        image: 'https://img.freepik.com/free-vector/english-teacher-concept-illustration_114360-7477.jpg'
    },
    {
        id: 3,
        title: {
            en: 'Pre-Intermediate English Course (B1)',
            tm: 'Orta öňi Iňlis dili kursy (B1)',
            ru: 'Пре-интермедиат курс английского языка (B1)'
        },
        description: {
            en: 'Advance your English skills with more complex grammar and vocabulary.',
            tm: 'Çylşyrymly grammatika we söz baýlygy bilen Iňlis dili başarnyklaryňyzy ösdüriň.',
            ru: 'Улучшите свой английский с помощью более сложной грамматики и словарного запаса.'
        },
        details: {
            en: [
                'Complex grammar structures',
                'Business vocabulary',
                'Presentation skills',
                'Email writing',
                'Advanced listening practice',
                'Regular speaking sessions',
                'Progress assessments'
            ],
            tm: [
                'Çylşyrymly grammatika düzümleri',
                'Iş söz baýlygy',
                'Prezentasiýa başarnyklary',
                'Email ýazmak',
                'Ösen diňleýiş tejribesi',
                'Yzygiderli gepleşik sessiýalary',
                'Ösüş bahalandyrmalary'
            ],
            ru: [
                'Сложные грамматические структуры',
                'Деловой словарный запас',
                'Навыки презентации',
                'Написание электронных писем',
                'Продвинутая практика аудирования',
                'Регулярные разговорные сессии',
                'Оценка прогресса'
            ]
        },
        level: 'intermediate',
        image: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg'
    },
    {
        id: 4,
        title: {
            en: 'Intermediate English Course (B1-B2)',
            tm: 'Orta Iňlis dili kursy (B1-B2)',
            ru: 'Средний курс английского языка (B1-B2)'
        },
        description: {
            en: 'Develop fluency and confidence in English through comprehensive practice.',
            tm: 'Giňişleýin tejribe arkaly Iňlis dilinde akgynlyk we ynam gazanyň.',
            ru: 'Развивайте беглость и уверенность в английском языке через комплексную практику.'
        },
        details: {
            en: [
                'Advanced grammar concepts',
                'Professional vocabulary',
                'Public speaking skills',
                'Academic writing',
                'Debate practice',
                'Cultural understanding',
                'Project work'
            ],
            tm: [
                'Ösen grammatika düşünjeleri',
                'Professional söz baýlygy',
                'Köpçülikleýin çykyş etmek başarnyklary',
                'Akademiki ýazuw',
                'Debat tejribesi',
                'Medeni düşünje',
                'Taslama işi'
            ],
            ru: [
                'Продвинутые грамматические концепции',
                'Профессиональный словарный запас',
                'Навыки публичных выступлений',
                'Академическое письмо',
                'Практика дебатов',
                'Понимание культуры',
                'Проектная работа'
            ]
        },
        level: 'intermediate',
        image: 'https://img.freepik.com/free-vector/language-learning-concept-illustration_114360-6220.jpg'
    },
    {
        id: 5,
        title: {
            en: 'Upper-Intermediate Course (B2)',
            tm: 'Ýokary-Orta kurs (B2)',
            ru: 'Курс выше среднего (B2)'
        },
        description: {
            en: 'Master advanced grammar and vocabulary for professional contexts.',
            tm: 'Professional ýagdaýlar üçin ösen grammatika we söz baýlygyny ele alyň.',
            ru: 'Освойте продвинутую грамматику и словарный запас для профессионального контекста.'
        },
        details: {
            en: [
                'Complex language structures',
                'Industry-specific vocabulary',
                'Business communication',
                'Report writing',
                'Advanced presentation skills',
                'Negotiation techniques',
                'Leadership communication'
            ],
            tm: [
                'Çylşyrymly dil düzümleri',
                'Pudaga degişli söz baýlygy',
                'Işewürlik aragatnaşygy',
                'Hasabat ýazmak',
                'Ösen prezentasiýa başarnyklary',
                'Gepleşik alyp barmak usullary',
                'Liderlik aragatnaşygy'
            ],
            ru: [
                'Сложные языковые структуры',
                'Отраслевой словарный запас',
                'Деловое общение',
                'Написание отчетов',
                'Продвинутые навыки презентации',
                'Техники ведения переговоров',
                'Лидерское общение'
            ]
        },
        level: 'advanced',
        image: 'https://img.freepik.com/free-vector/training-concept-illustration_114360-6267.jpg'
    },
    {
        id: 6,
        title: {
            en: 'Advanced English Course (C1-C2)',
            tm: 'Ösen Iňlis dili kursy (C1-C2)',
            ru: 'Продвинутый курс английского языка (C1-C2)'
        },
        description: {
            en: 'Achieve native-like fluency and master complex language skills.',
            tm: 'Ene dili ýaly akgynlyga ýetiň we çylşyrymly dil başarnyklaryny ele alyň.',
            ru: 'Достигните свободного владения языком и освойте сложные языковые навыки.'
        },
        details: {
            en: [
                'Native-level communication',
                'Academic research writing',
                'Professional presentations',
                'Advanced debate skills',
                'Cultural nuances',
                'Literature analysis',
                'Creative writing'
            ],
            tm: [
                'Ene dili derejesinde aragatnaşyk',
                'Akademiki gözleg ýazuw',
                'Professional prezentasiýalar',
                'Ösen debat başarnyklary',
                'Medeni öwüşginler',
                'Edebiýat derňewi',
                'Döredijilikli ýazuw'
            ],
            ru: [
                'Общение на уровне носителя языка',
                'Академическое исследовательское письмо',
                'Профессиональные презентации',
                'Продвинутые навыки дебатов',
                'Культурные нюансы',
                'Анализ литературы',
                'Креативное письмо'
            ]
        },
        level: 'advanced',
        image: 'https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4103.jpg'
    },
    {
        id: 7,
        title: {
            en: 'Business English (B2-C1)',
            tm: 'Işewürlik Iňlis dili (B2-C1)',
            ru: 'Деловой английский (B2-C1)'
        },
        description: {
            en: 'Specialized course for business professionals and corporate communication.',
            tm: 'Işewürler we korporatiw aragatnaşyk üçin ýöriteleşdirilen kurs.',
            ru: 'Специализированный курс для бизнес-профессионалов и корпоративного общения.'
        },
        details: {
            en: [
                'Business correspondence',
                'Meeting management',
                'Negotiation skills',
                'Professional presentations',
                'International business etiquette',
                'Report writing',
                'Case studies'
            ],
            tm: [
                'Işewürlik hat alyşmasy',
                'Duşuşyk dolandyryşy',
                'Gepleşik alyp barmak başarnyklary',
                'Professional prezentasiýalar',
                'Halkara işewürlik etikasy',
                'Hasabat ýazmak',
                'Tejribe derňewleri'
            ],
            ru: [
                'Деловая переписка',
                'Управление встречами',
                'Навыки ведения переговоров',
                'Профессиональные презентации',
                'Международный деловой этикет',
                'Написание отчетов',
                'Разбор кейсов'
            ]
        },
        level: 'advanced',
        image: 'https://img.freepik.com/free-vector/business-presentation-concept-illustration_114360-7477.jpg'
    },
    {
        id: 8,
        title: {
            en: 'IELTS Preparation Course',
            tm: 'IELTS Taýýarlyk kursy',
            ru: 'Подготовка к IELTS'
        },
        description: {
            en: 'Comprehensive preparation for the IELTS exam with practice tests and strategies.',
            tm: 'IELTS synagyna tejribe testleri we strategiýalar bilen giňişleýin taýýarlyk.',
            ru: 'Комплексная подготовка к экзамену IELTS с практическими тестами и стратегиями.'
        },
        details: {
            en: [
                'IELTS exam structure',
                'Test-taking strategies',
                'Reading techniques',
                'Writing task practice',
                'Speaking confidence',
                'Listening strategies',
                'Mock exams'
            ],
            tm: [
                'IELTS synag gurluşy',
                'Test tabşyrmak strategiýalary',
                'Okamak usullary',
                'Ýazuw ýumuşlary tejribesi',
                'Gepleşikde ynam',
                'Diňlemek strategiýalary',
                'Synag testleri'
            ],
            ru: [
                'Структура экзамена IELTS',
                'Стратегии сдачи теста',
                'Техники чтения',
                'Практика письменных заданий',
                'Уверенность в разговоре',
                'Стратегии аудирования',
                'Пробные экзамены'
            ]
        },
        level: 'advanced',
        image: 'https://img.freepik.com/free-vector/certification-concept-illustration_114360-5176.jpg'
    }
];

const courseImages = {
    beginner: 'https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg',
    elementary: 'https://img.freepik.com/free-vector/english-teacher-concept-illustration_114360-7477.jpg',
    preIntermediate: 'https://img.freepik.com/free-vector/online-certification-illustration_23-2148575636.jpg',
    intermediate: 'https://img.freepik.com/free-vector/language-learning-concept-illustration_114360-6220.jpg',
    upperIntermediate: 'https://img.freepik.com/free-vector/training-concept-illustration_114360-6267.jpg',
    advanced: 'https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4103.jpg',
    business: 'https://img.freepik.com/free-vector/business-presentation-concept-illustration_114360-7477.jpg',
    ielts: 'https://img.freepik.com/free-vector/certification-concept-illustration_114360-5176.jpg'
};

// Update the lessons array to use the new image URLs
lessons.forEach(lesson => {
    switch(lesson.id) {
        case 1:
            lesson.image = courseImages.beginner;
            break;
        case 2:
            lesson.image = courseImages.elementary;
            break;
        case 3:
            lesson.image = courseImages.preIntermediate;
            break;
        case 4:
            lesson.image = courseImages.intermediate;
            break;
        case 5:
            lesson.image = courseImages.upperIntermediate;
            break;
        case 6:
            lesson.image = courseImages.advanced;
            break;
        case 7:
            lesson.image = courseImages.business;
            break;
        case 8:
            lesson.image = courseImages.ielts;
            break;
    }
});

// Get DOM elements
const lessonsContainer = document.getElementById('lessonsContainer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const filterBtns = document.querySelectorAll('.filter-btn');

// Shopping cart array
let cart = [];

let currentLanguage = 'tm'; // Default language
let expandedCard = null;

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            toggleLanguage(lang);
            
            // Update active state of language buttons
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Initialize filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLessons(btn.dataset.level);
        });
    });

    // Initial render
    renderLessons('all');
});

function toggleLanguage(lang) {
    currentLanguage = lang;
    // Update filter button text visibility
    document.querySelectorAll('.filter-btn span').forEach(span => {
        span.style.display = 'none';
    });
    document.querySelectorAll(`.filter-btn span.${lang}`).forEach(span => {
        span.style.display = 'inline';
    });
    
    // Re-render lessons with current filter
    const activeFilter = document.querySelector('.filter-btn.active');
    renderLessons(activeFilter ? activeFilter.dataset.level : 'all');
}

function getLevelLabel(level) {
    const labels = {
        beginner: {
            en: 'Beginner',
            tm: 'Başlangyç',
            ru: 'Начальный'
        },
        intermediate: {
            en: 'Intermediate',
            tm: 'Orta',
            ru: 'Средний'
        },
        advanced: {
            en: 'Advanced',
            tm: 'Ýokary',
            ru: 'Продвинутый'
        }
    };
    return labels[level][currentLanguage] || level;
}

// Render lessons
function renderLessons(filterLevel = 'all') {
    const lessonsContainer = document.getElementById('lessonsContainer');
    if (!lessonsContainer) return;
    
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
    const defaultImage = 'https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg';
    return `
        <div class="lesson-card" data-level="${lesson.level}">
            <img src="${lesson.image || defaultImage}" alt="${lesson.title[currentLanguage]}" class="lesson-image" onerror="this.src='${defaultImage}'">
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
                    <button class="expand-btn" onclick="toggleDetails(event, ${lesson.id})">
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

function toggleDetails(event, lessonId) {
    event.preventDefault();
    const button = event.target;
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
        alert(
            currentLanguage === 'en' ? 'This course is already in your cart' :
            currentLanguage === 'tm' ? 'Bu kurs eýýäm sebetiňizde bar' :
            'Этот курс уже в вашей корзине'
        );
    }
}

// Remove from cart
function removeFromCart(lessonId) {
    const index = cart.findIndex(item => item.id === lessonId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
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

// Handle checkout buttons
document.getElementById('checkoutBtnWhatsapp')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert(
            currentLanguage === 'en' ? 'Your cart is empty!' :
            currentLanguage === 'tm' ? 'Sebetiňiz boş!' :
            'Ваша корзина пуста!'
        );
        return;
    }

    let message = currentLanguage === 'en' ? "Hello! I would like to enroll in the following courses:\n\n" :
                 currentLanguage === 'tm' ? "Salam! Men şu kurslara ýazylmak isleýärin:\n\n" :
                 "Здравствуйте! Я хотел бы записаться на следующие курсы:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.title[currentLanguage]}\n`;
    });
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/60104210238?text=${encodedMessage}`, '_blank');
});

document.getElementById('checkoutBtnTelegram')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert(
            currentLanguage === 'en' ? 'Your cart is empty!' :
            currentLanguage === 'tm' ? 'Sebetiňiz boş!' :
            'Ваша корзина пуста!'
        );
        return;
    }

    let message = currentLanguage === 'en' ? "Hello! I would like to enroll in the following courses:\n\n" :
                 currentLanguage === 'tm' ? "Salam! Men şu kurslara ýazylmak isleýärin:\n\n" :
                 "Здравствуйте! Я хотел бы записаться на следующие курсы:\n\n";
    
    cart.forEach(item => {
        message += `• ${item.title[currentLanguage]}\n`;
    });
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/rahim_5500`, '_blank');
}); 