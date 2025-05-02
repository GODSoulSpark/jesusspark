// Storage Initialization
let faithPoints = localStorage.getItem('faithPoints') ? parseInt(localStorage.getItem('faithPoints')) : 0;
let teachingHistory = localStorage.getItem('teachingHistory') ? JSON.parse(localStorage.getItem('teachingHistory')) : [];
let gardenItems = localStorage.getItem('gardenItems') ? JSON.parse(localStorage.getItem('gardenItems')) : [];
let dailyProgress = localStorage.getItem('dailyProgress') ? JSON.parse(localStorage.getItem('dailyProgress')) : [];

document.getElementById('faith-points').textContent = faithPoints;
updateMoodHistory();

// Background Image Check
const backgrounds = [
    { id: 'home', file: 'jesusspark_start_page.png' },
    { id: 'garden', file: 'jesusspark_garden_page.png' },
    { id: 'mood', file: 'jesusspark_mood_page.png' },
    { id: 'feed', file: 'jesusspark_feed_page.png' },
    { id: 'calendar', file: 'jesusspark_calendar_page.png' }
];

backgrounds.forEach(bg => {
    const img = new Image();
    img.src = bg.file;
    img.onload = () => console.log(`Background image for ${bg.id} (${bg.file}) loaded successfully`);
    img.onerror = () => {
        alert(`Error: Could not load ${bg.file} for the ${bg.id} page. Ensure it’s in the same folder as index.html, named exactly "${bg.file}" (case-sensitive), and is a valid PNG file.`);
        console.error(`Background image (${bg.file}) failed to load for ${bg.id} page. Check file path, name, and format.`);
    };
});

// Particle Animation (Cross-shaped)
const particleCanvas = document.getElementById('particle-canvas');
const particleCtx = particleCanvas.getContext('2d');
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 8; i++) {
    particles.push({
        x: Math.random() * particleCanvas.width,
        y: particleCanvas.height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3
    });
}

function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    particles.forEach(particle => {
        particle.y -= particle.speed;
        particle.opacity -= 0.005;
        if (particle.opacity <= 0) return;
        particleCtx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
        particleCtx.beginPath();
        particleCtx.moveTo(particle.x - particle.size, particle.y);
        particleCtx.lineTo(particle.x + particle.size, particle.y);
        particleCtx.moveTo(particle.x, particle.y - particle.size);
        particleCtx.lineTo(particle.x, particle.y + particle.size);
        particleCtx.strokeStyle = `rgba(255, 215, 0, ${particle.opacity})`;
        particleCtx.lineWidth = particle.size / 2;
        particleCtx.stroke();
    });
    if (particles.some(p => p.opacity > 0)) {
        requestAnimationFrame(animateParticles);
    }
}

// Teaching Data
const teachings = [
    {
        oldTestament: "Psalm 23:1 - The Lord is my shepherd; I shall not want.",
        newTestament: "John 10:11 - Jesus said, ‘I am the good shepherd: the good shepherd giveth his life for the sheep.’ He positions Himself as the ultimate guide who sacrifices for His followers.",
        modernApplication: "In 2025, trust Jesus’ guidance by seeking His wisdom in prayer when facing career or family challenges, knowing He provides for your needs."
    },
    {
        oldTestament: "Isaiah 40:31 - But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles.",
        newTestament: "John 16:33 - Jesus said, ‘In me ye might have peace.’ He promises inner strength and peace through faith in Him, even in trials.",
        modernApplication: "In 2025, wait on Jesus by pausing to pray before major decisions, trusting His timing to renew your energy and hope."
    },
    {
        oldTestament: "Proverbs 3:5-6 - Trust in the Lord with all thine heart; and lean not unto thine own understanding.",
        newTestament: "John 14:1 - Jesus said, ‘Let not your heart be troubled: ye believe in God, believe also in me.’ He calls for personal trust in Him as the path to peace.",
        modernApplication: "In 2025, surrender anxieties about finances or relationships to Jesus through daily prayer, relying on His guidance over your own plans."
    },
    {
        oldTestament: "Exodus 20:12 - Honour thy father and thy mother: that thy days may be long upon the land.",
        newTestament: "Matthew 15:4-6 - Jesus reaffirmed honoring parents, emphasizing heartfelt obedience over empty traditions.",
        modernApplication: "In 2025, honor your parents by calling them regularly, helping with their needs, or forgiving past conflicts to strengthen family bonds."
    },
    {
        oldTestament: "Micah 6:8 - He hath shewed thee, O man, what is good; and what doth the Lord require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?",
        newTestament: "Matthew 22:37-39 - Jesus said, ‘Thou shalt love the Lord thy God… and thy neighbour as thyself.’ He summarizes righteous living as love for God and others.",
        modernApplication: "In 2025, live justly by volunteering in your community, showing kindness to coworkers, and staying humble in your faith."
    },
    {
        oldTestament: "Psalm 46:10 - Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.",
        newTestament: "John 16:24 - Jesus said, ‘Ask, and ye shall receive, that your joy may be full.’ He invites us to find peace in communion with Him.",
        modernApplication: "In 2025, carve out 5 minutes daily to be still, pray, and reflect on Jesus’ presence to find calm amidst a busy world."
    },
    {
        oldTestament: "Deuteronomy 6:5 - And thou shalt love the Lord thy God with all thine heart, and with all thy soul, and with all thy might.",
        newTestament: "Mark 12:30 - Jesus said, ‘Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind, and with all thy strength.’ He expands this to include the mind.",
        modernApplication: "In 2025, love God fully by studying Scripture, praying intentionally, and using your talents to serve others in His name."
    },
    {
        oldTestament: "Isaiah 1:17 - Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for the widow.",
        newTestament: "Matthew 25:40 - Jesus said, ‘Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me.’ He equates serving others with serving Him.",
        modernApplication: "In 2025, help the marginalized by donating to a local charity, mentoring a young person, or advocating for justice in your community."
    },
    {
        oldTestament: "Psalm 119:105 - Thy word is a lamp unto my feet, and a light unto my path.",
        newTestament: "John 8:12 - Jesus said, ‘I am the light of the world: he that followeth me shall not walk in darkness.’ He embodies God’s guiding Word.",
        modernApplication: "In 2025, follow Jesus’ light by reading a Bible verse daily and applying its wisdom to navigate life’s challenges."
    },
    {
        oldTestament: "Leviticus 19:18 - Thou shalt love thy neighbour as thyself: I am the Lord.",
        newTestament: "John 13:34 - Jesus said, ‘A new commandment I give unto you, That ye love one another; as I have loved you.’ He elevates love to His sacrificial standard.",
        modernApplication: "In 2025, show Jesus’ love by listening to a friend in need, sharing a meal with a neighbor, or forgiving someone who wronged you."
    }
];

let currentTeaching = null;
let currentStage = 0;

function getDailyTeaching() {
    const today = new Date().toLocaleDateString();
    let storedTeaching = localStorage.getItem('dailyTeaching');
    let dailyTeaching = storedTeaching ? JSON.parse(storedTeaching) : null;

    if (!dailyTeaching || dailyTeaching.date !== today) {
        const dayOfMonth = new Date().getDate();
        const teachingIndex = (dayOfMonth - 1) % teachings.length;
        dailyTeaching = {
            date: today,
            teaching: teachings[teachingIndex]
        };
        localStorage.setItem('dailyTeaching', JSON.stringify(dailyTeaching));
    }
    return dailyTeaching;
}

function updateTeachingDisplay() {
    const dailyTeaching = getDailyTeaching();
    currentTeaching = dailyTeaching.teaching;
    const textElement = document.getElementById('teaching-text');
    textElement.textContent = currentTeaching.oldTestament;
    textElement.classList.remove('jesus-text');
    document.getElementById('teaching-button').textContent = 'Reveal';
}

function nextTeachingStage() {
    const textElement = document.getElementById('teaching-text');
    const button = document.getElementById('teaching-button');
    const feed = document.getElementById('spark-feed');
    const today = new Date().toLocaleDateString();

    let stageName, stageType;
    if (currentStage === 0) {
        textElement.textContent = currentTeaching.oldTestament;
        textElement.classList.remove('jesus-text');
        button.textContent = 'Next';
        stageName = 'Old Testament';
        stageType = 'oldTestament';
        currentStage = 1;
    } else if (currentStage === 1) {
        textElement.textContent = currentTeaching.newTestament;
        textElement.classList.add('jesus-text'); // Apply red color
        button.textContent = 'Apply';
        stageName = 'New Testament';
        stageType = 'newTestament';
        currentStage = 2;
    } else if (currentStage === 2) {
        textElement.textContent = currentTeaching.modernApplication;
        textElement.classList.remove('jesus-text');
        button.textContent = 'New Teaching';
        stageName = 'Application';
        stageType = 'application';
        currentStage = 3;
    } else {
        const dailyTeaching = getDailyTeaching();
        currentTeaching = dailyTeaching.teaching;
        textElement.textContent = currentTeaching.oldTestament;
        textElement.classList.remove('jesus-text');
        button.textContent = 'Reveal';
        stageName = 'Old Testament';
        stageType = 'oldTestament';
        currentStage = 1;
    }

    faithPoints += 10;
    document.getElementById('faith-points').textContent = faithPoints;
    localStorage.setItem('faithPoints', faithPoints);

    const li = document.createElement('li');
    li.textContent = `You reflected on the ${stageName}: ${textElement.textContent.split(' - ')[0] || textElement.textContent}!`;
    feed.prepend(li);

    gardenItems.push({
        type: stageType,
        x: Math.random() * 280,
        y: Math.random() * 280,
        size: stageName === 'Old Testament' ? 15 : stageName === 'New Testament' ? 12 : 10
    });
    localStorage.setItem('gardenItems', JSON.stringify(gardenItems));

    let todayProgress = dailyProgress.find(entry => entry.date === today);
    if (!todayProgress) {
        todayProgress = { date: today, oldTestament: false, newTestament: false, application: false, reflection: false };
        dailyProgress.push(todayProgress);
    }
    todayProgress[stageType] = true;
    localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));

    textElement.style.opacity = 0;
    setTimeout(() => {
        textElement.style.transition = 'opacity 0.5s';
        textElement.style.opacity = 1;
    }, 100);

    alert(`Well done! Your faith grows through ${stageName}.`);
}

function showPage(pageId) {
    try {
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.style.background = '';
        });
        const pageElement = document.getElementById(pageId);
        if (!pageElement) throw new Error(`Page with ID ${pageId} not found`);
        pageElement.style.display = 'block';
        if (pageId === 'garden') drawGarden();
        if (pageId === 'calendar') renderCalendar();
        if (pageId === 'home') {
            animateParticles();
            updateTeachingDisplay();
        }
        document.querySelectorAll('nav button').forEach(button => button.classList.remove('active'));
        const navButton = document.getElementById(`nav-${pageId}`);
        if (navButton) navButton.classList.add('active');
    } catch (error) {
        console.error('Error in showPage:', error);
        alert('An error occurred while loading the page.');
    }
}

function drawGarden() {
    const canvas = document.getElementById('garden-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#a5d6a7';
    ctx.fillRect(0, 200, canvas.width, 100);
    gardenItems.forEach(item => {
        if (item.type === 'oldTestament') {
            ctx.strokeStyle = '#388e3c';
            ctx.beginPath();
            ctx.moveTo(item.x, item.y);
            ctx.quadraticCurveTo(item.x + 10, item.y - 20, item.x + 20, item.y);
            ctx.stroke();
        } else if (item.type === 'newTestament') {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(item.x, item.y, item.size, item.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (item.type === 'application') {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.moveTo(item.x, item.y - item.size);
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(item.x + item.size * Math.cos((18 + i * 72) * Math.PI / 180), item.y + item.size * Math.sin((18 + i * 72) * Math.PI / 180));
                ctx.lineTo(item.x + (item.size / 2) * Math.cos((54 + i * 72) * Math.PI / 180), item.y + (item.size / 2) * Math.sin((54 + i * 72) * Math.PI / 180));
            }
            ctx.closePath();
            ctx.fill();
        }
    });
}

function logMood() {
    const bodyMood = document.getElementById('body-mood').value;
    const heartMood = document.getElementById('heart-mood').value;
    const today = new Date().toLocaleDateString();
    teachingHistory.push({
        body: bodyMood,
        heart: heartMood,
        date: today,
        teaching: currentTeaching ? currentTeaching[currentStage === 1 ? 'oldTestament' : currentStage === 2 ? 'newTestament' : 'modernApplication'] : ''
    });
    localStorage.setItem('teachingHistory', JSON.stringify(teachingHistory));
    let todayProgress = dailyProgress.find(entry => entry.date === today);
    if (!todayProgress) {
        todayProgress = { date: today, oldTestament: false, newTestament: false, application: false, reflection: false };
        dailyProgress.push(todayProgress);
    }
    todayProgress.reflection = true;
    localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));
    updateMoodHistory();
}

function updateMoodHistory() {
    const history = document.getElementById('mood-history');
    history.innerHTML = '<h3>Your Faith Reflections</h3>';
    teachingHistory.forEach(entry => {
        history.innerHTML += `<p>${entry.date}: Body - ${entry.body}, Heart - ${entry.heart}${entry.teaching ? ` (Reflected on: ${entry.teaching.split(' - ')[0]})` : ''}</p>`;
    });
}

let currentDate = new Date();

function renderCalendar() {
    try {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const todayStr = today.toLocaleDateString();
        const monthHeader = document.getElementById('calendar-month');
        if (!monthHeader) throw new Error('Calendar month header not found');
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        monthHeader.textContent = `${monthNames[month]} ${year}`;
        const calendarGrid = document.getElementById('calendar-grid');
        if (!calendarGrid) throw new Error('Calendar grid element not found');
        calendarGrid.innerHTML = '';
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekdays.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day empty';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            calendarGrid.appendChild(emptyDay);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day).toLocaleDateString();
            const progress = dailyProgress.find(entry => entry.date === date) || { oldTestament: false, newTestament: false, application: false, reflection: false };
            const isToday = date === todayStr && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();
            const dayElement = document.createElement('div');
            dayElement.className = `day ${isToday ? 'today' : ''}`;
            dayElement.innerHTML = `
                <span>${day}</span>
                <div class="indicators">
                    ${progress.oldTestament ? '<div class="indicator oldtestament"></div>' : ''}
                    ${progress.newTestament ? '<div class="indicator newtestament"></div>' : ''}
                    ${progress.application ? '<div class="indicator application"></div>' : ''}
                    ${progress.reflection ? '<div class="indicator reflection"></div>' : ''}
                </div>
            `;
            calendarGrid.appendChild(dayElement);
        }
    } catch (error) {
        console.error('Error in renderCalendar:', error);
        alert('An error occurred while rendering the calendar.');
    }
}

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar();
}

const audio = document.getElementById('background-audio');
const audioToggle = document.getElementById('audio-toggle');
let isAudioPlaying = false;

audio.muted = true;
audio.play().then(() => {
    console.log('Audio autoplay started (muted)');
    isAudioPlaying = true;
    audioToggle.textContent = '🔇 Mute Audio';
    audioToggle.classList.add('playing');
}).catch(error => {
    console.error('Autoplay failed:', error);
    audioToggle.textContent = '🔊 Play Audio';
});

document.body.addEventListener('click', function unmuteOnInteraction() {
    if (audio.muted) {
        audio.muted = false;
        audio.play();
        isAudioPlaying = true;
        audioToggle.textContent = '🔇 Mute Audio';
        audioToggle.classList.add('playing');
        console.log('Audio unmuted after user interaction');
    }
    document.body.removeEventListener('click', unmuteOnInteraction);
}, { once: true });

function toggleAudio() {
    if (isAudioPlaying) {
        audio.pause();
        isAudioPlaying = false;
        audioToggle.textContent = '🔊 Play Audio';
        audioToggle.classList.remove('playing');
    } else {
        audio.play();
        isAudioPlaying = true;
        audioToggle.textContent = '🔇 Mute Audio';
        audioToggle.classList.add('playing');
    }
}

showPage('home');