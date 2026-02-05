// Logic to guide users to install the PWA

export function initInstallPrompt() {
    // Check if likely already standalone (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone ||
        document.referrer.includes('android-app://');

    if (isStandalone) {
        console.log('App is running in standalone mode.');
        return;
    }

    // Clear dismissal for testing (remove this later)
    // localStorage.removeItem('iosPromptDismissed');

    const ua = navigator.userAgent;
    const isAndroid = /Android/.test(ua);

    // Show Android prompt for Android, otherwise show the General/iOS prompt (even on Desktop)
    if (isAndroid) {
        // Android handles this via event listener
    } else {
        // iOS, Desktop, or others
        showIOSPrompt();
    }
}

// 1. iOS Prompt: Modal Style
function showIOSPrompt() {
    // For debugging: Do NOT check localStorage so it always shows
    // if (localStorage.getItem('iosPromptDismissed')) return;

    const overlay = document.createElement('div');
    overlay.className = 'install-modal-overlay fade-in';

    // Determine arrow direction (iPhone bottom, iPad top usually, but simplified for mobile)
    // For iOS Modal, we'll center it and ask them to look for the share button
    overlay.innerHTML = `
        <div class="install-modal">
            <button class="close-modal">&times;</button>
            <div class="install-icon">
                <img src="assets/icon_final.png" alt="App Icon">
            </div>
            <h3>앱으로 설치하기</h3>
            <p>이 웹사이트를 앱처럼 홈 화면에 추가하여<br>편리하게 사용하세요.</p>
            <div class="ios-instruction">
                <p>1. 하단의 <strong>[공유]</strong> 버튼(네모 화살표) 클릭</p>
                <p>2. <strong>'홈 화면에 추가'</strong> 선택</p>
            </div>
            <button class="btn-check-ok">알겠습니다</button>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeAction = () => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 300);
        localStorage.setItem('iosPromptDismissed', 'true');
    };

    overlay.querySelector('.close-modal').onclick = closeAction;
    overlay.querySelector('.btn-check-ok').onclick = closeAction;
}

// 2. Android: 'beforeinstallprompt'
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showAndroidInstallBtn();
});

function showAndroidInstallBtn() {
    if (localStorage.getItem('androidPromptDismissed')) return;

    const overlay = document.createElement('div');
    overlay.className = 'install-modal-overlay fade-in';
    overlay.innerHTML = `
        <div class="install-modal">
            <button class="close-modal">&times;</button>
            <div class="install-icon">
                <img src="assets/icon_final.png" alt="App Icon">
            </div>
            <h3>앱으로 설치하기</h3>
            <p>서울드림교회 셀장 가이드 앱을<br>설치하시겠습니까?</p>
            <button id="android-install-btn" class="btn btn-primary" style="margin-top:10px;">설치하기</button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('android-install-btn').onclick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
            overlay.remove();
        }
    };

    overlay.querySelector('.close-modal').onclick = () => {
        overlay.classList.add('fade-out');
        setTimeout(() => overlay.remove(), 300);
        localStorage.setItem('androidPromptDismissed', 'true');
    };
}
