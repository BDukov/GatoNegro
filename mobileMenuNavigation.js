document.addEventListener('DOMContentLoaded', function() {
	// Вземаме елементите от менюто
const obednoMenu = document.getElementById('text_block-133-842');
const promocii = document.getElementById('text_block-134-842');

// Вземаме табовете
const obednoMenuTab = document.getElementById('_tab-1000-7');
const promociiTab = document.getElementById('_tab-2221-926');

// Проверка и добавяне на събитие за обедното меню
if (obednoMenu) {
    obednoMenu.addEventListener('click', function () {
        oxyCloseModal();

        // Проверка дали вече сме на правилния URL
        if (window.location.href === "https://projects.miagod.com/gatonegro.bg/delivery/") {
            obednoMenuTab.click();
        } else {
            // Запазваме намерението за клик в localStorage
            localStorage.setItem('clickObednoMenuTab', 'true');
            // Пренасочваме потребителя
            window.location.href = 'https://projects.miagod.com/gatonegro.bg/delivery/';
        }
    });
}

// Проверка и добавяне на събитие за промоции
if(promocii){
    promocii.addEventListener('click', function () {
        oxyCloseModal();

        // Проверка дали вече сме на правилния URL
        if (window.location.href === "https://projects.miagod.com/gatonegro.bg/delivery/") {
            promociiTab.click();
        } else {
            // Запазваме намерението за клик в localStorage
            localStorage.setItem('clickPromociiTab', 'true');
            // Пренасочваме потребителя
            window.location.href = 'https://projects.miagod.com/gatonegro.bg/delivery/';
        }
    });
}
});



// Когато страницата се зареди, проверяваме дали трябва да кликнем на някой таб
window.addEventListener('load', function () {
    if (localStorage.getItem('clickObednoMenuTab') === 'true') {
		const obednoMenuTab = document.getElementById('_tab-1000-7');
        if (obednoMenuTab) {
            obednoMenuTab.click();
            localStorage.removeItem('clickObednoMenuTab'); // Изтриваме записа
        } 
    }

    if (localStorage.getItem('clickPromociiTab') === 'true') {
			const promociiTab = document.getElementById('_tab-2221-926');
        if (promociiTab) {
            promociiTab.click();
            localStorage.removeItem('clickPromociiTab'); // Изтриваме записа
        }
    }
});
