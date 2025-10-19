document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const totalPriceSpan = document.getElementById('totalPrice');
    const quantityError = document.getElementById('quantityError');
    const errorMessage = document.getElementById('errorMessage');
    
    const quantityRegex = /^[1-9][0-9]{0,2}$/;
    
    let isQuantityValid = false;
    
    /**
     * Проверка валидности введенного количества
     * @param {string} value - значение из поля ввода
     * @returns {boolean} - true если значение валидно
     */
    function validateQuantity(value) {
        return quantityRegex.test(value);
    }
    
    /**
     * Показ сообщения об ошибке
     * @param {string} message - текст сообщения об ошибке
     */
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        resultDiv.style.display = 'none';
    }
    
    /**
     * Скрытие сообщения об ошибке
     */
    function hideError() {
        errorMessage.style.display = 'none';
    }
    
    /**
     * Показ результата расчета
     * @param {number} total - общая стоимость
     */
    function showResult(total) {
        totalPriceSpan.textContent = total.toLocaleString('ru-RU');
        resultDiv.style.display = 'block';
        hideError();
    }
    
    /**
     * Расчет стоимости заказа
     */
    function calculateTotal() {
        const productPrice = parseInt(productSelect.value);
        const quantity = parseInt(quantityInput.value);
        
        if (!productPrice) {
            showError('Пожалуйста, выберите товар');
            return;
        }
        
        if (!isQuantityValid) {
            showError('Пожалуйста, введите корректное количество');
            return;
        }
        
        const total = productPrice * quantity;
        
        showResult(total);
    }
    
    /**
     * Обработчик изменения количества
     */
    function handleQuantityChange() {
        const value = quantityInput.value.trim();
        
        isQuantityValid = validateQuantity(value);
        
        if (value && !isQuantityValid) {
            quantityError.style.display = 'block';
            quantityInput.style.borderColor = '#f44336';
        } else {
            quantityError.style.display = 'none';
            quantityInput.style.borderColor = isQuantityValid ? '#4CAF50' : '#ddd';
            hideError();
        }
        
        calculateBtn.disabled = !isQuantityValid || !productSelect.value;
    }
    
    /**
     * Обработчик изменения товара
     */
    function handleProductChange() {
        calculateBtn.disabled = !isQuantityValid || !productSelect.value;
        hideError();
        
        if (productSelect.value && isQuantityValid) {
            quantityInput.style.borderColor = '#4CAF50';
        }
    }
    
    /**
     * Обработчик отправки формы
     * @param {Event} event - событие отправки формы
     */
    function handleFormSubmit(event) {
        event.preventDefault(); 
        calculateTotal();
    }
    
    quantityInput.addEventListener('input', handleQuantityChange);
    productSelect.addEventListener('change', handleProductChange);
    orderForm.addEventListener('submit', handleFormSubmit);
    
    calculateBtn.disabled = true;
    
    quantityInput.addEventListener('blur', function() {
        if (this.value && !isQuantityValid) {
            showError('Количество должно быть числом от 1 до 999');
        }
    });
    
    quantityInput.addEventListener('focus', function() {
        hideError();
    });
    
    console.log('Калькулятор стоимости заказа инициализирован');
});