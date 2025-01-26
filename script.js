document.addEventListener('DOMContentLoaded', function() {

    const loginBtn = document.getElementById('loginBtn');

    const registerBtn = document.getElementById('registerBtn');

    const accountBtn = document.getElementById('accountBtn');

    const inventoryBtn = document.getElementById('inventoryBtn');

    const submitStoneBtn = document.getElementById('submitStoneBtn');

    const loginModal = document.getElementById('loginModal');

    const registerModal = document.getElementById('registerModal');

    const accountModal = document.getElementById('accountModal');

    const shopModal = document.getElementById('shopModal');

    const inventoryModal = document.getElementById('inventoryModal');

    const submitStoneModal = document.getElementById('submitStoneModal');

    const closeButtons = document.querySelectorAll('.close');

    const searchInput = document.getElementById('searchInput');

    const searchResults = document.getElementById('searchResults');

    const balanceElement = document.getElementById('balance');

    const buyBtn = document.getElementById('buyBtn');

    const inventoryItems = document.getElementById('inventoryItems');

    const submitStone = document.getElementById('submitStone');

    let balance = 0;

    let inventory = [];

    let loggedInUser = null;

    // Показать модальное окно

    function showModal(modal) {

        modal.style.display = 'block';

    }

    // Скрыть модальное окно

    function hideModal(modal) {

        modal.style.display = 'none';

    }

    // Обработчики для кнопок

    loginBtn.addEventListener('click', () => showModal(loginModal));

    registerBtn.addEventListener('click', () => showModal(registerModal));

    accountBtn.addEventListener('click', () => showModal(accountModal));

    inventoryBtn.addEventListener('click', () => showModal(inventoryModal));

    submitStoneBtn.addEventListener('click', () => showModal(submitStoneModal));

    // Закрыть модальное окно

    closeButtons.forEach(button => {

        button.addEventListener('click', () => {

            hideModal(loginModal);

            hideModal(registerModal);

            hideModal(accountModal);

            hideModal(shopModal);

            hideModal(inventoryModal);

            hideModal(submitStoneModal);

        });

    });

    // Регистрация

    document.getElementById('submitRegister').addEventListener('click', () => {

        const username = document.getElementById('registerUsername').value;

        const password = document.getElementById('registerPassword').value;

        if (username && password) {

            localStorage.setItem(username, JSON.stringify({ password, balance: 0, inventory: [] }));

            alert('Регистрация успешна!');

            hideModal(registerModal);

            showModal(loginModal);

        } else {

            alert('Заполните все поля!');

        }

    });

    // Вход

    document.getElementById('submitLogin').addEventListener('click', () => {

        const username = document.getElementById('loginUsername').value;

        const password = document.getElementById('loginPassword').value;

        const userData = JSON.parse(localStorage.getItem(username));

        if (userData && userData.password === password) {

            loggedInUser = username;

            balance = userData.balance;

            inventory = userData.inventory;

            updateBalance();

            updateInventory();

            loginBtn.classList.add('hidden');

            registerBtn.classList.add('hidden');

            accountBtn.classList.remove('hidden');

            inventoryBtn.classList.remove('hidden');

            hideModal(loginModal);

        } else {

            alert('Неверный никнейм или пароль!');

        }

    });

    // Обновление баланса

    function updateBalance() {

        balanceElement.textContent = `${balance.toFixed(2)} $`;

        localStorage.setItem(loggedInUser, JSON.stringify({ password: JSON.parse(localStorage.getItem(loggedInUser)).password, balance, inventory }));

    }

    // Обновление инвентаря

    function updateInventory() {

        inventoryItems.innerHTML = inventory.length > 0 ? inventory.map(item => `<p>${item}</p>`).join('') : '<p>Пустой инвентарь</p>';

    }

    // Начисление баланса

    setInterval(() => {

        if (loggedInUser) {

            balance += 999.01;

            updateBalance();

        }

    }, 1000);

    // Покупка камня

    buyBtn.addEventListener('click', () => {

        if (balance >= 999) {

            balance -= 999;

            inventory.push('КАМЕНЬ ТЕСТЕРОВ');

            updateBalance();

            updateInventory();

            alert('Покупка успешна!');

        } else {

            alert('Недостаточно средств!');

        }

    });

    // Отправка заявки на камень

    submitStone.addEventListener('click', () => {

        const stoneName = document.getElementById('stoneName').value;

        const stoneInfo = document.getElementById('stoneInfo').value;

        const stoneImage = document.getElementById('stoneImage').files[0];

        if (stoneName && stoneInfo && stoneImage) {

            const formData = new FormData();

            formData.append('stoneName', stoneName);

            formData.append('stoneInfo', stoneInfo);

            formData.append('stoneImage', stoneImage);

            fetch('mailto:kamnifirs2@gmail.com', {

                method: 'POST',

                body: formData

            }).then(response => {

                if (response.ok) {

                    alert('Заявка отправлена!');

                    hideModal(submitStoneModal);

                } else {

                    alert('Ошибка при отправке заявки!');

                }

            });

        } else {

            alert('Заполните все поля!');

        }

    });

    // Поиск

    searchInput.addEventListener('input', () => {

        const query = searchInput.value.toLowerCase();

        const stones = document.querySelectorAll('.stone h2');

        searchResults.innerHTML = '';

        stones.forEach(stone => {

            if (stone.textContent.toLowerCase().includes(query)) {

                const result = document.createElement('div');

                result.textContent = stone.textContent;

                result.addEventListener('click', () => {

                    stone.scrollIntoView({ behavior: 'smooth' });

                });

                searchResults.appendChild(result);

            }

        });

        searchResults.style.display = searchResults.children.length > 0 ? 'block' : 'none';

    });

    // Анимации

    document.querySelectorAll('.stone').forEach((stone, index) => {

        setTimeout(() => {

            stone.classList.add('fade-in');

        }, index * 200);

    });

    document.querySelectorAll('.modal-content').forEach(modal => {

        modal.classList.add('slide-up');

    });

});

// Получаем элементы модального окна магазина и кнопку "Магазин"
const shopModal = document.getElementById('shopModal');
const shopBtn = document.getElementById('shopBtn');
const closeShopModal = shopModal.querySelector('.close');

// Функция для открытия модального окна магазина
function openShopModal() {
    shopModal.style.display = 'block';
}

// Функция для закрытия модального окна магазина
function closeShopModalFunc() {
    shopModal.style.display = 'none';
}

// Добавляем обработчик события на кнопку "Магазин"
shopBtn.addEventListener('click', openShopModal);

// Добавляем обработчик события на кнопку закрытия модального окна
closeShopModal.addEventListener('click', closeShopModalFunc);

// Закрываем модальное окно при клике вне его области
window.addEventListener('click', function(event) {
    if (event.target === shopModal) {
        closeShopModalFunc();
    }
});

pro.addEventListener('click', () => {

    if (balance >= 500) {

        balance -= 500;

        inventory.push('PRO');

        updateBalance();

        updateInventory();

        alert('Покупка успешна!');

    } else {

        alert('OFF SALE...');

    }

});
