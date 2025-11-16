class FeedbackForm {
    constructor() {
        this.formData = {};
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.elements = {
            openFormBtn: document.getElementById('openFormBtn'),
            popupOverlay: document.getElementById('popupOverlay'),
            closeBtn: document.getElementById('closeBtn'),
            contactForm: document.getElementById('contactForm'),
            submitBtn: document.getElementById('submitBtn'),
            formMessage: document.getElementById('formMessage')
        };

        this.bindEvents();
        this.loadFormData();

        // Восстановить данные если форма была открыта при перезагрузке
        if (window.location.hash === '#feedback') {
            setTimeout(() => this.openForm(), 100);
        }
    }

    bindEvents() {
        this.elements.openFormBtn.addEventListener('click', () => this.openForm());
        this.elements.closeBtn.addEventListener('click', () => this.closeForm());
        this.elements.popupOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.popupOverlay) this.closeForm();
        });
        this.elements.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));

        // Обработка кнопки "Назад" в браузере
        window.addEventListener('popstate', (e) => {
            if (window.location.hash !== '#feedback') {
                this.closeForm();
            }
        });

        // Автосохранение при изменении полей
        this.elements.contactForm.addEventListener('input', () => {
            this.saveFormData();
        });
    }

    openForm() {
        this.elements.popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        
        // History API
        if (window.location.hash !== '#feedback') {
            history.pushState({ formOpen: true }, '', '#feedback');
        }
        
        this.restoreFormData();
        this.clearMessage();
    }

    closeForm() {
        this.elements.popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Разблокируем прокрутку
        
        // History API
        if (window.location.hash === '#feedback') {
            history.back();
        }
    }

    saveFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value,
            privacyPolicy: document.getElementById('privacyPolicy').checked
        };
        
        localStorage.setItem('feedbackFormData', JSON.stringify(formData));
    }

    loadFormData() {
        try {
            const saved = localStorage.getItem('feedbackFormData');
            if (saved) {
                this.formData = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            this.formData = {};
        }
    }

    restoreFormData() {
        if (this.formData) {
            document.getElementById('fullName').value = this.formData.fullName || '';
            document.getElementById('email').value = this.formData.email || '';
            document.getElementById('phone').value = this.formData.phone || '';
            document.getElementById('organization').value = this.formData.organization || '';
            document.getElementById('message').value = this.formData.message || '';
            document.getElementById('privacyPolicy').checked = this.formData.privacyPolicy || false;
        }
    }

    clearFormData() {
        localStorage.removeItem('feedbackFormData');
        this.formData = {};
    }

    showMessage(text, type) {
        this.elements.formMessage.innerHTML = `
            <div class="message ${type}">${text}</div>
        `;
        
        // Автоскрытие успешного сообщения
        if (type === 'success') {
            setTimeout(() => {
                this.clearMessage();
            }, 5000);
        }
    }

    clearMessage() {
        this.elements.formMessage.innerHTML = '';
    }

    validateForm(data) {
        const errors = [];

        if (!data.fullName?.trim()) {
            errors.push('ФИО является обязательным полем');
        }

        if (!data.email?.trim()) {
            errors.push('Email является обязательным полем');
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Введите корректный email адрес');
        }

        if (!data.message?.trim()) {
            errors.push('Сообщение является обязательным полем');
        }

        if (!data.privacyPolicy) {
            errors.push('Необходимо согласие с политикой обработки данных');
        }

        return errors;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;

        const formData = new FormData(this.elements.contactForm);
        const data = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            organization: formData.get('organization'),
            message: formData.get('message'),
            privacyPolicy: formData.get('privacyPolicy') === 'on'
        };

        // Валидация
        const errors = this.validateForm(data);
        if (errors.length > 0) {
            this.showMessage(errors.join('<br>'), 'error');
            return;
        }

        this.setSubmitting(true);

        try {
            // Отправка на Formcarry (замени YOUR_API_KEY на реальный ключ)
            const response = await fetch('https://formcarry.com/s/IQuw_q2BVJJ', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.code === 200) {
                this.showMessage('✅ Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
                this.elements.contactForm.reset();
                this.clearFormData();
                
                // Автозакрытие формы через 3 секунды
                setTimeout(() => {
                    this.closeForm();
                }, 3000);
            } else {
                throw new Error(result.message || 'Произошла ошибка при отправке');
            }
        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            this.showMessage('❌ Ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами другим способом.', 'error');
        } finally {
            this.setSubmitting(false);
        }
    }

    setSubmitting(submitting) {
        this.isSubmitting = submitting;
        this.elements.submitBtn.disabled = submitting;
        this.elements.submitBtn.textContent = submitting ? 'Отправка...' : 'Отправить';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new FeedbackForm();
});

// Обработка Escape для закрытия формы
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const form = document.getElementById('popupOverlay');
        if (form.classList.contains('active')) {
            const feedbackForm = new FeedbackForm();
            feedbackForm.closeForm();
        }
    }
});