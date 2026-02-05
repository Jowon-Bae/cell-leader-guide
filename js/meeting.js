import { MANUAL_STEPS } from './data.js';

let timerInterval;
let timeLeft = 0;
let isRunning = false;

export function renderMeeting(container) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';

    // 1. Timer Section
    const timerCard = document.createElement('div');
    timerCard.className = 'card timer-card';
    timerCard.innerHTML = `
        <h3>⏰ 셀모임 타이머</h3>
        <div class="timer-display" id="timer-display">00:00</div>
        <div class="timer-controls">
            <button id="start-btn" class="btn image-btn">시작</button>
            <button id="reset-btn" class="btn image-btn">초기화</button>
        </div>
    `;
    wrapper.appendChild(timerCard);

    // 2. Steps Tabs
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'steps-container';

    // Tab Headers
    const tabsHeader = document.createElement('div');
    tabsHeader.className = 'tabs-header';

    // Tab Content Area
    const tabContent = document.createElement('div');
    tabContent.className = 'card step-content';
    tabContent.id = 'step-content-area';

    MANUAL_STEPS.forEach((step, index) => {
        const tabBtn = document.createElement('button');
        tabBtn.className = `tab-btn image-tab ${index === 0 ? 'active' : ''}`;
        tabBtn.textContent = step.step; // "1단계", "2단계"...
        tabBtn.dataset.index = index;
        tabBtn.addEventListener('click', () => switchStep(index));
        tabsHeader.appendChild(tabBtn);
    });

    stepsContainer.appendChild(tabsHeader);
    stepsContainer.appendChild(tabContent);
    wrapper.appendChild(stepsContainer);

    container.appendChild(wrapper);

    // Initialize Timer Logic
    setupTimer();
    // Initialize First Step
    switchStep(0);

    function switchStep(index) {
        // Update Tabs
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(t => t.classList.remove('active'));
        tabs[index].classList.add('active');

        // Update Content
        const data = MANUAL_STEPS[index];
        const contentArea = document.getElementById('step-content-area');
        contentArea.innerHTML = `
            <div class="step-header">
                <span class="step-badge">${data.title}</span>
                <span class="step-time">${data.time}</span>
            </div>
            <div class="step-guide">
                <h4>🗣️ 리더 가이드</h4>
                <ul>
                    ${data.guide.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            ${data.warning ? `
            <div class="step-warning">
                <h4>⚠️ 주의사항</h4>
                <p>${data.warning}</p>
            </div>
            ` : ''}
        `;

        // Reset and Set Timer for this step (Optional auto-set? User asked for manual implementation usually, keeping it simple for now)
        // Let's just update the suggested time text. User didn't explicitly ask to auto-set timer.
    }

    function setupTimer() {
        const display = document.getElementById('timer-display');
        const startBtn = document.getElementById('start-btn');
        const resetBtn = document.getElementById('reset-btn');

        startBtn.addEventListener('click', toggleTimer);
        resetBtn.addEventListener('click', resetTimer);

        function updateDisplay() {
            const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
            const s = (timeLeft % 60).toString().padStart(2, '0');
            display.textContent = `${m}:${s}`;
        }

        function toggleTimer() {
            if (isRunning) {
                // Pause
                clearInterval(timerInterval);
                isRunning = false;
                startBtn.textContent = '계속';
            } else {
                // Start
                if (timeLeft === 0) timeLeft = 10 * 60; // Default 10 min if 0, or resume
                isRunning = true;
                startBtn.textContent = '일시정지';
                timerInterval = setInterval(() => {
                    if (timeLeft > 0) {
                        timeLeft--;
                        updateDisplay();
                    } else {
                        clearInterval(timerInterval);
                        isRunning = false;
                        startBtn.textContent = '종료';
                        alert('시간이 종료되었습니다!');
                    }
                }, 1000);
            }
        }

        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            timeLeft = 0; // Or reset to step default? Let's just zero it.
            startBtn.textContent = '시작';
            updateDisplay();
        }
    }
}
