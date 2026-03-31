// Sayğac dəyəri və element seçimi
let counter = 0;

const counterValue = document.getElementById('counter-value');
const increaseBtn = document.getElementById('increase-btn');
const decreaseBtn = document.getElementById('decrease-btn');
const resetBtn = document.getElementById('reset-btn');
const historyList = document.getElementById('history-list');

// Əməliyyat tarixçəsinə yeni element əlavə etmək funksiyası
function addToHistory(operation, value) {
    const listItem = document.createElement('li');
    const timestamp = new Date().toLocaleTimeString('az-AZ');
    listItem.textContent = `${timestamp}: ${operation} (${value})`;
    
    historyList.insertBefore(listItem, historyList.firstChild);
    
    // Maksimum 10 element saxla
    if (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Sayğac dəyərini yeniləmək və rəngi dəyişmək funksiyası
function updateCounterDisplay() {
    counterValue.textContent = counter;
    
    // Dəyərə görə rəng siniflərini tətbiq et
    counterValue.classList.remove('positive', 'negative');
    
    if (counter > 0) {
        counterValue.classList.add('positive');
    } else if (counter < 0) {
        counterValue.classList.add('negative');
    }
}

// Artırma funksiyası
function increaseCounter() {
    counter++;
    updateCounterDisplay();
    addToHistory('Artırıldı', counter);
}

// Azaltma funksiyası
function decreaseCounter() {
    counter--;
    updateCounterDisplay();
    addToHistory('Azaldıldı', counter);
}

// Sıfırlama funksiyası
function resetCounter() {
    counter = 0;
    updateCounterDisplay();
    addToHistory('Sıfırlandı', counter);
}

// Hadisə işləyicilərini əlavə et
increaseBtn.addEventListener('click', increaseCounter);
decreaseBtn.addEventListener('click', decreaseCounter);
resetBtn.addEventListener('click', resetCounter);

// Klaviatura ilə idarəetmə
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        increaseCounter();
    } else if (event.key === 'ArrowDown') {
        decreaseCounter();
    } else if (event.key === 'r' || event.key === 'R') {
        resetCounter();
    }
});

// Səhifə yüklənəndə tarixçəni təmizlə
historyList.innerHTML = '';