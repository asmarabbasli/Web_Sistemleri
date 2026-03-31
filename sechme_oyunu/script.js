// Hekayə məlumatları (Data)
const storyData = {
    start: {
        title: "Mistik Qərar",
        text: "Siz qaranlıq bir meşənin ortasında dayanmısınız. Əlinizdəki köhnə xəritə sizi gizli xəzinəyə aparır. Qarşıda iki yol ayrılır.",
        options: [
            { text: "Sol tərəfdəki qaranlıq dərəyə get", next: "dark_valley" },
            { text: "Sağ tərəfdəki işıqlı çəmənliyə get", next: "sunny_meadow" }
        ],
        progress: 10
    },
    dark_valley: {
        title: "Qaranlıq Dərə",
        text: "Dərəyə endikcə hava soyuyur. Uzaqdan bir pələngin səsi gəlir. Yanınızda bir mağara görürsünüz.",
        options: [
            { text: "Mağaraya daxil ol", next: "cave_enter" },
            { text: "Səsi izləyərək gedin", next: "tiger_death" }
        ],
        progress: 40
    },
    sunny_meadow: {
        title: "İşıqlı Çəmənlik",
        text: "Çəmənlik çox gözəldir. Qarşınızda qədim bir daş quruluşu var. Ətrafında çiçəklər açıb.",
        options: [
            { text: "Daş quruluşunu araşdır", next: "stone_altar" },
            { text: "Çiçəkləri iylə", next: "sleep_peace" }
        ],
        progress: 40
    },
    cave_enter: {
        title: "Gizli Otaq",
        text: "Mağaranın dərinliyində parıldayan bir qapı var. Qapının arxasında xəzinə! Amma qapı bağlıdır.",
        options: [
            { text: "Qapını qırmağa çalış", next: "trap_death" },
            { text: "Axtarış edərək açar tap", next: "treasure_win" }
        ],
        progress: 70
    },
    tiger_death: {
        title: "Təhlükəli Son!",
        text: "Pələng sizi gördü və təqib etdi. Qaça bildiniz, amma xəzinədən əliniz üzüldü.",
        options: [], // Heç bir seçim yoxdur, oyun bitir
        end: true,
        resultTitle: "Məğlubiyyət",
        resultDesc: "Təhlükəni qiymətləndirə bilmədiniz.",
        progress: 100
    },
    stone_altar: {
        title: "Qədim Altar",
        text: "Altarın üzərində bir alışqan yanır. Yanında bir yazı var: 'Ağıllı olan qalib gələr'.",
        options: [
            { text: "Alışqanı söndür", next: "darkness_death" },
            { text: "Alışqanı yandır saxla", next: "treasure_win" }
        ],
        progress: 70
    },
    sleep_peace: {
        title: "Xoşbəxt Son!",
        text: "Çiçəklərin ətri yuxu gətirdi. Siz orada rahatlaşdınız və heç vaxt bu qədər xoşbəxt olmamısınız. Amma xəzinə? Unuduldu.",
        options: [],
        end: true,
        resultTitle: "Fərqli Qələbə",
        resultDesc: "Bəzən ən qiymətli şey sülh və rahatlıqdır.",
        progress: 100
    },
    trap_death: {
        title: "Tələ!",
        text: "Qapını vuranda divar sürüşdü. Daşlar sizin üstünüzə töküldü.",
        options: [],
        end: true,
        resultTitle: "Məğlubiyyət",
        resultDesc: "Hərəkətiniz tələyə düşdü.",
        progress: 100
    },
    treasure_win: {
        title: "Böyük Qələbə!",
        text: "Açarı tapdınız və ya düzgün seçimi etdiniz! Qapı açıldı. Qarşınızda qızıl dolu bir otaq.",
        options: [],
        end: true,
        resultTitle: "Qalib Gəldiniz!",
        resultDesc: "Təbrik edirik! Siz gizli xəzinəni tapdınız.",
        progress: 100
    },
    darkness_death: {
        title: "Qaranlıq!",
        text: "Alışqanı söndürən kimi ətraf tamamilə qaraldı. İtkisiniz.",
        options: [],
        end: true,
        resultTitle: "Məğlubiyyət",
        resultDesc: "İşığı söndürmək yaxşı fikir deyildi.",
        progress: 100
    }
};

// Elementləri seçirik
const titleEl = document.getElementById('story-title');
const textEl = document.getElementById('story-text');
const optionsEl = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');
const progressBar = document.getElementById('progress');

// Oyunu başladan funksiya
function startGame() {
    showStory('start');
}

// Hekayəni ekrana çıxaran funksiya
function showStory(storyId) {
    const story = storyData[storyId];
    
    // Animasiyanı yeniləmək üçün classı silib yenidən əlavə edirik
    titleEl.classList.remove('fade-in');
    textEl.classList.remove('fade-in');
    void titleEl.offsetWidth; // Reflow trigger
    titleEl.classList.add('fade-in');
    textEl.classList.add('fade-in');

    titleEl.innerText = story.title;
    textEl.innerText = story.text;
    
    // Progress barı yenilə
    if (story.progress) {
        progressBar.style.width = story.progress + '%';
    }

    // Köhnə düymələri təmizlə
    optionsEl.innerHTML = '';

    // Nəticə ekranı və ya seçim düymələri
    if (story.end) {
        optionsEl.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        resultTitle.innerText = story.resultTitle;
        resultDesc.innerText = story.resultDesc;
    } else {
        optionsEl.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        
        // Yeni düymələr yarat
        story.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('option-btn', 'fade-in');
            button.onclick = () => showStory(option.next);
            optionsEl.appendChild(button);
        });
    }
}

// Oyunu yenidən başlat
function restartGame() {
    progressBar.style.width = '0%';
    startGame();
}

// Oyunu başlat
startGame();