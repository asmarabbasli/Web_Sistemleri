/**
 * Elegant Saat Tətbiqi
 * JavaScript Funksionallığı - Düzəldilmiş Versiya
 * 
 * Tarix və saat funksionallığı tam düzəldilmişdir
 */

// ============================================
// DOM Elementlərinin Seçilməsi
// ============================================

// Rəqəmsal saat elementləri
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const periodElement = document.getElementById('period');

// Analoq saat elementləri
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

// Tarix elementləri
const dayNameElement = document.getElementById('dayName');
const dateNumberElement = document.getElementById('dateNumber');
const monthNameElement = document.getElementById('monthName');
const yearNumberElement = document.getElementById('yearNumber');

// Menyü düymələri
const digitalBtn = document.getElementById('digitalBtn');
const analogBtn = document.getElementById('analogBtn');
const bothBtn = document.getElementById('bothBtn');

// Görünən bölmələr
const digitalSection = document.querySelector('.digital-clock-section');
const analogSection = document.querySelector('.analog-clock-section');

// ============================================
// Tarix və Vaxt Məlumatları
// ============================================

// Həftə günləri (Azərbaycan dilində)
const daysOfWeek = [
    'Bazar', 
    'Bazar ertəsi', 
    'Çərşənbə axşamı', 
    'Çərşənbə', 
    'Cümə axşamı', 
    'Cümə', 
    'Şənbə'
];

// Aylar (Azərbaycan dilində)
const monthsOfYear = [
    'Yanvar', 
    'Fevral', 
    'Mart', 
    'Aprel', 
    'May', 
    'İyun',
    'İyul', 
    'Avqust', 
    'Sentyabr', 
    'Oktyabr', 
    'Noyabr', 
    'Dekabr'
];

// ============================================
// Əsas Funksiyalar
// ============================================

/**
 * Vaxtı yeniləmək funksiyası
 * Hər saniyə çağırılır və bütün saat komponentlərini yeniləyir
 */
function updateTime() {
    // Hazırkı vaxtı almaq
    const now = new Date();
    
    // Sistem vaxtından saat, dəqiqə və saniyəni almaq
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    
    // AM/PM müəyyən etmək
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // 12 saat formatına çevirmək
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
    
    // Rəqəmsal saatı yeniləmək
    hoursElement.textContent = String(hours12).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
    periodElement.textContent = period;
    
    // Analoq saat əllərini hərəkət etdirmək (24 saat formatında)
    updateAnalogClock(hours, minutes, seconds);
    
    // Tarixi yeniləmək
    updateDate(now);
}

/**
 * Analoq saat əllərini yeniləmək funksiyası
 * @param {number} hours - Saat (24 saat formatında)
 * @param {number} minutes - Dəqiqə
 * @param {number} seconds - Saniyə
 */
function updateAnalogClock(hours, minutes, seconds) {
    // Saniyə əlinin bucağını hesablamaq
    // Saniyə əli hər saniyədə 6 dərəcə fırlanır
    const secondsDegrees = (seconds / 60) * 360;
    
    // Dəqiqə əlinin bucağını hesablamaq
    // Dəqiqə əli hər dəqiqədə 6 dərəcə fırlanır
    // Saniyəyə görə düzəliş edilir
    const minutesDegrees = ((minutes + seconds / 60) / 60) * 360;
    
    // Saat əlinin bucağını hesablamaq
    // Saat əli hər saatda 30 dərəcə fırlanır (360 / 12 = 30)
    // Dəqiqəyə görə düzəliş edilir (hər dəqiqə üçün 0.5 dərəcə)
    const hoursDegrees = ((hours + minutes / 60) / 12) * 360;
    
    // Əlləri fırlatmaq
    secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
}

/**
 * Tarixi yeniləmək funksiyası
 * @param {Date} date - Hazırkı tarix obyekti
 */
function updateDate(date) {
    // Tarix komponentlərini almaq
    const dayOfWeek = date.getDay(); // 0-6 (Bazar - Şənbə)
    const dayOfMonth = date.getDate(); // 1-31
    const month = date.getMonth(); // 0-11
    const year = date.getFullYear(); // 2024
    
    // Tarix elementlərini yeniləmək
    dayNameElement.textContent = daysOfWeek[dayOfWeek];
    dateNumberElement.textContent = dayOfMonth;
    monthNameElement.textContent = monthsOfYear[month];
    yearNumberElement.textContent = year;
}

// ============================================
// Rejim Funksiyaları
// ============================================

/**
 * Yalnız rəqəmsal saat rejimini aktivləşdirmək funksiyası
 */
function showDigitalClock() {
    digitalSection.classList.remove('hidden');
    digitalSection.classList.add('active');
    analogSection.classList.remove('active');
    
    digitalBtn.classList.add('active');
    analogBtn.classList.remove('active');
    bothBtn.classList.remove('active');
}

/**
 * Yalnız analoq saat rejimini aktivləşdirmək funksiyası
 */
function showAnalogClock() {
    digitalSection.classList.add('hidden');
    digitalSection.classList.remove('active');
    analogSection.classList.add('active');
    
    digitalBtn.classList.remove('active');
    analogBtn.classList.add('active');
    bothBtn.classList.remove('active');
}

/**
 * Hər iki saat rejimini aktivləşdirmək funksiyası
 */
function showBothClocks() {
    digitalSection.classList.remove('hidden');
    digitalSection.classList.add('active');
    analogSection.classList.add('active');
    
    digitalBtn.classList.remove('active');
    analogBtn.classList.remove('active');
    bothBtn.classList.add('active');
}

// ============================================
// Hadisə İşləyiciləri
// ============================================

digitalBtn.addEventListener('click', function() {
    showDigitalClock();
    savePreference('digital');
});

analogBtn.addEventListener('click', function() {
    showAnalogClock();
    savePreference('analog');
});

bothBtn.addEventListener('click', function() {
    showBothClocks();
    savePreference('both');
});

/**
 * Klaviatura qısa yolları
 */
document.addEventListener('keydown', function(event) {
    if (event.key === '1') {
        showDigitalClock();
    } else if (event.key === '2') {
        showAnalogClock();
    } else if (event.key === '3') {
        showBothClocks();
    }
});

// ============================================
// Local Storage Funksionallığı
// ============================================

function savePreference(preference) {
    try {
        localStorage.setItem('clockPreference', preference);
    } catch (e) {
        console.log('Local Storage mövcud deyil');
    }
}

function loadPreference() {
    try {
        const preference = localStorage.getItem('clockPreference');
        
        if (preference === 'digital') {
            showDigitalClock();
        } else if (preference === 'analog') {
            showAnalogClock();
        } else if (preference === 'both') {
            showBothClocks();
        } else {
            showBothClocks();
        }
    } catch (e) {
        showBothClocks();
    }
}

// ============================================
// Animasiya Funksiyaları
// ============================================

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .digital-clock-section {
        animation: fadeIn 0.5s ease-out;
    }
    
    .analog-clock-section {
        animation: fadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// Başlatma Funksiyası
// ============================================

function initializeApp() {
    // İstifadəçi seçimini yükləmək
    loadPreference();
    
    // Vaxtı dərhal yeniləmək
    updateTime();
    
    // Hər 1000 millisaniyə (1 saniyə) vaxtı yeniləmək
    setInterval(updateTime, 1000);
    
    console.log('Elegant Saat Tətbiqi uğurla başladıldı!');
    console.log('Hazırkı vaxt:', new Date().toLocaleString('az-AZ'));
}

// ============================================
// Tətbiqi Başlatmaq
// ============================================

document.addEventListener('DOMContentLoaded', initializeApp);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initializeApp, 100);
}