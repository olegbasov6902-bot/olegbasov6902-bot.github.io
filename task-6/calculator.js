document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsGroup = document.getElementById('optionsGroup');
    const serviceOptionSelect = document.getElementById('serviceOption');
    const propertyGroup = document.getElementById('propertyGroup');
    const extraPropertyCheckbox = document.getElementById('extraProperty');
    const totalPriceSpan = document.getElementById('totalPrice');
    const priceBreakdownDiv = document.getElementById('priceBreakdown');
    
    const basePrices = {
        basic: 1000,      
        premium: 2500,    
        custom: 1800      
    };
    
    const optionPrices = {
        standard: 0,      
        advanced: 500,    
        enterprise: 1200      };
    
    const propertyPrice = 800;
    
    let currentServiceType = 'basic';
    
    function updateOptionsVisibility() {
        optionsGroup.classList.add('hidden');
        propertyGroup.classList.add('hidden');
        
        switch (currentServiceType) {
            case 'premium':
                optionsGroup.classList.remove('hidden');
                break;
            case 'custom':
                propertyGroup.classList.remove('hidden');
                break;
        }
    }
    
    function calculateTotal() {
        const quantity = parseInt(quantityInput.value) || 1;
        let basePrice = basePrices[currentServiceType];
        let optionPrice = 0;
        let propertyExtra = 0;
        
        if (currentServiceType === 'premium') {
            const selectedOption = serviceOptionSelect.value;
            optionPrice = optionPrices[selectedOption];
        }
        
        if (currentServiceType === 'custom' && extraPropertyCheckbox.checked) {
            propertyExtra = propertyPrice;
        }
        
        const unitPrice = basePrice + optionPrice + propertyExtra;
        const totalPrice = unitPrice * quantity;
        
        updateDisplay(totalPrice, unitPrice, quantity, optionPrice, propertyExtra);
    }
    
    function updateDisplay(totalPrice, unitPrice, quantity, optionPrice, propertyExtra) {
        totalPriceSpan.textContent = totalPrice.toLocaleString('ru-RU');
        
        let breakdownHTML = '';
        
        breakdownHTML += `<div class="price-item">
            <span>${quantity} × ${unitPrice.toLocaleString('ru-RU')} ₽</span>
            <span>${(unitPrice * quantity).toLocaleString('ru-RU')} ₽</span>
        </div>`;
        
        if (optionPrice > 0) {
            breakdownHTML += `<div class="price-item">
                <span>Опция: +${optionPrice.toLocaleString('ru-RU')} ₽/ед.</span>
                <span>+${(optionPrice * quantity).toLocaleString('ru-RU')} ₽</span>
            </div>`;
        }
        
        if (propertyExtra > 0) {
            breakdownHTML += `<div class="price-item">
                <span>Доп. свойство: +${propertyExtra.toLocaleString('ru-RU')} ₽/ед.</span>
                <span>+${(propertyExtra * quantity).toLocaleString('ru-RU')} ₽</span>
            </div>`;
        }
        
        priceBreakdownDiv.innerHTML = breakdownHTML;
    }
    
    function handleServiceTypeChange(event) {
        currentServiceType = event.target.value;
        updateOptionsVisibility();
        calculateTotal();
    }
    
    function handleQuantityChange() {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        } else if (value > 100) {
            quantityInput.value = 100;
        }
        calculateTotal();
    }
    
    function handleOptionChange() {
        calculateTotal();
    }
    
    function handlePropertyChange() {
        calculateTotal();
    }
    
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleServiceTypeChange);
    });
    
    quantityInput.addEventListener('input', handleQuantityChange);
    quantityInput.addEventListener('change', handleQuantityChange);
    
    serviceOptionSelect.addEventListener('change', handleOptionChange);
    extraPropertyCheckbox.addEventListener('change', handlePropertyChange);
    
    updateOptionsVisibility();
    calculateTotal();
    
    console.log('Калькулятор стоимости услуги инициализирован');
});