// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Закрываем мобильное меню после клика
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) {
                    navbarToggler.click();
                }
            }
        }
    });
});

// ===== Active Menu Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__link');

function changeLinkState() {
    let index = sections.length;

    while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
    
    navLinks.forEach((link) => {
        link.classList.remove('header__link--active');
        link.removeAttribute('aria-current');
    });
    
    if (navLinks[index]) {
        navLinks[index].classList.add('header__link--active');
        navLinks[index].setAttribute('aria-current', 'page');
    }
}

// Инициализируем при загрузке
document.addEventListener('DOMContentLoaded', changeLinkState);
window.addEventListener('scroll', changeLinkState);

// ===== Reviews Slider =====
class ReviewsSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = [
            {
                title: "Команда Drupal Coder вызвала только положительные впечатления!",
                author: "Нуреев Александр, менеджер проекта Winamp Russian Community",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Профессиональная команда с большим опытом работы",
                author: "Иванов Иван, директор ООО «Рога и копыта»",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Рекомендую! Отличная поддержка и быстрое решение проблем",
                author: "Петрова Мария, CEO StartUp Inc.",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Благодаря Drupal Coder мы успели запуститься в срок без авралов",
                author: "Смирнов Алексей, руководитель проекта MediaCorp",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Грамотно консультируют и предлагают оптимальные решения",
                author: "Кузнецова Ольга, маркетолог OnlineShop",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Отлаженные процессы и понятная отчетность по часам",
                author: "Сидоров Дмитрий, владелец интернет‑портала",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Команда быстро вникла в сложный наследованный код",
                author: "Анна Фролова, продукт‑менеджер FinTech сервиса",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Надежный подрядчик, с которым спокойно работать долгосрочно",
                author: "Грачёв Николай, CTO B2B‑платформы",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Помогли мигрировать сайт на новую версию Drupal без простоя",
                author: "Екатерина Лебедева, руководитель digital‑направления",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Четко соблюдают договоренности по срокам и бюджету",
                author: "Васильев Пётр, владелец онлайн‑сервиса",
                avatar: "images/review-avatar.png"
            },
            {
                title: "С Drupal Coder мы уверены в стабильности корпоративного портала",
                author: "Мария Климова, HR‑директор",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Удобно, что все задачи ведутся через Helpdesk и ничего не теряется",
                author: "Сергей Орлов, менеджер по развитию",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Отдельное спасибо за советы по SEO и оптимизации скорости",
                author: "Дарья Белова, специалист по веб‑маркетингу",
                avatar: "images/review-avatar.png"
            },
            {
                title: "Если нужен стабильный Drupal‑подрядчик — смело рекомендую Drupal Coder",
                author: "Андрей Павлов, владелец контент‑проекта",
                avatar: "images/review-avatar.png"
            }
        ];
        
        this.init();
    }
    
    init() {
        const prevBtns = document.querySelectorAll('.review-card__arrow--prev');
        const nextBtns = document.querySelectorAll('.review-card__arrow--next');
        
        if (prevBtns.length > 0 && nextBtns.length > 0) {
            prevBtns.forEach(btn => {
                btn.addEventListener('click', () => this.prevSlide());
            });
            
            nextBtns.forEach(btn => {
                btn.addEventListener('click', () => this.nextSlide());
            });
        }
        
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide === 0 
            ? this.slides.length - 1 
            : this.currentSlide - 1;
        this.updateSlide();
    }
    
    nextSlide() {
        this.currentSlide = this.currentSlide === this.slides.length - 1 
            ? 0 
            : this.currentSlide + 1;
        this.updateSlide();
    }
    
    updateSlide() {
        const slide = this.slides[this.currentSlide];
        const card = document.querySelector('.review-card');
        
        if (card) {
            const title = card.querySelector('.review-card__title');
            const author = card.querySelector('.review-card__author');
            const counter = card.querySelectorAll('.review-card__counter');
            const avatar = card.querySelector('.review-card__avatar img');
            
            if (title) title.textContent = slide.title;
            if (author) author.textContent = slide.author;
            if (avatar) avatar.src = slide.avatar;
            
            if (counter.length > 0) {
                counter.forEach(c => {
                    c.textContent = `${String(this.currentSlide + 1).padStart(2, '0')} / ${String(this.slides.length).padStart(2, '0')}`;
                });
            }
        }
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsSlider();
});

// ===== Form Submission with Email =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Вариант 1: Использование Formspree (рекомендуемый)
    // Замените {YOUR_FORM_ID} на ваш ID из Formspree
    // Как получить: 1. Зарегистрируйтесь на formspree.io
    // 2. Создайте форму, получите ID
    // 3. Вставьте в action формы: action="https://formspree.io/f/{YOUR_FORM_ID}"
    
    // Вариант 2: Использование EmailJS (альтернативный)
    // Для этого нужно зарегистрироваться на emailjs.com
    // И добавить соответствующий скрипт
    
    // Вариант 3: Использование PHP на сервере (если есть доступ к бэкенду)
    // Для этого создайте файл sendmail.php на сервере
    
    // ВАЖНО: Для тестирования формы используйте Formspree - это самый простой способ
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value.trim();
        const phone = this.querySelector('input[name="phone"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        const privacy = this.querySelector('input[name="privacy"]').checked;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Basic validation
        let errors = [];
        
        if (!name) errors.push('имя');
        if (!phone) errors.push('телефон');
        if (!email) errors.push('email');
        
        if (errors.length > 0) {
            alert('Пожалуйста, заполните все обязательные поля: ' + errors.join(', '));
            return;
        }
        
        if (!privacy) {
            alert('Необходимо согласие на обработку персональных данных');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email');
            return;
        }
        
        // Phone validation (basic Russian format)
        const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
            alert('Пожалуйста, введите корректный номер телефона (минимум 10 цифр)');
            return;
        }
        
        // Disable button and show loading state
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
        
        // Simulate form submission (замените на реальную отправку)
        // Для реальной работы нужно настроить Formspree или другой сервис
        setTimeout(() => {
            // Если используете Formspree, раскомментируйте следующую строку:
            // this.submit();
            
            // Для демонстрации показываем успешное сообщение
            const successHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Спасибо за заявку!</strong> Мы свяжемся с вами в ближайшее время.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            
            // Вставляем сообщение об успехе перед формой
            const formContainer = contactForm.parentElement;
            const alertDiv = document.createElement('div');
            alertDiv.innerHTML = successHtml;
            formContainer.insertBefore(alertDiv.firstChild, contactForm);
            
            // Сбрасываем форму
            contactForm.reset();
            
            // Восстанавливаем кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            
            // Прокручиваем к сообщению об успехе
            alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Автоматически скрываем сообщение через 5 секунд
            setTimeout(() => {
                const alert = document.querySelector('.alert');
                if (alert) {
                    const closeBtn = alert.querySelector('.btn-close');
                    if (closeBtn) closeBtn.click();
                }
            }, 5000);
            
        }, 1500);
    });
}

// ===== Header Background Change on Scroll =====
const header = document.querySelector('.header');

if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(57, 64, 71, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'linear-gradient(233deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%), #394047';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== Mobile Menu Improvement =====
document.addEventListener('DOMContentLoaded', () => {
    // Закрытие меню при клике вне его области
    document.addEventListener('click', (e) => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarCollapse.classList.contains('show') && 
            !navbarCollapse.contains(e.target) && 
            (!navbarToggler || !navbarToggler.contains(e.target))) {
            navbarToggler.click();
        }
    });
});

// ===== Form Validation Improvements =====
function initFormValidation() {
    const form = document.querySelector('.webform__form');
    if (!form) return;
    
    // Добавляем маску для телефона
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                value = !value[2] ? value[1] : value[1] + ' ' + value[2] + (value[3] ? ' ' + value[3] : '') + (value[4] ? ' ' + value[4] : '');
            }
            
            this.value = value;
        });
    }
    
    // Валидация в реальном времени
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '';
                }
            }
            
            if (this.type === 'tel' && this.value) {
                const cleanPhone = this.value.replace(/\D/g, '');
                if (cleanPhone.length < 10) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '';
                }
            }
            
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
});

// ===== Console Info =====
console.log('%c Drupal-coder Website ', 'background: #F14D34; color: white; font-size: 16px; padding: 10px;');
console.log('%c Developed with ❤️ ', 'color: #F14D34; font-size: 14px;');

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Кнопка "Показать ещё" для кейсов =====
const showMoreBtn = document.querySelector('.btn--outline-dark');
if (showMoreBtn && showMoreBtn.textContent.includes('Показать ещё')) {
    showMoreBtn.addEventListener('click', function() {
        this.textContent = 'Загрузка...';
        this.disabled = true;
        
        // Симуляция загрузки дополнительных кейсов
        setTimeout(() => {
            this.textContent = 'Все кейсы загружены';
            this.classList.remove('btn--outline-dark');
            this.classList.add('btn--outline');
            this.disabled = true;
            this.style.opacity = '0.7';
        }, 1500);
    });
}