import { ProfileManager } from './profile.js';
import { renderHome } from './home.js';
import { renderMeeting } from './meeting.js';
import { renderFuneral } from './funeral.js';
import { renderCommunity } from './community.js';
import { renderVideoDetail } from './video_detail.js';
import { renderSchedule } from './schedule.js';

// State
let currentTab = 'home';
const mainContent = document.getElementById('main-content');
const navItems = document.querySelectorAll('.nav-item');

// Router/Tab Switcher
function switchTab(tabId) {
    currentTab = tabId;

    // Update Nav UI
    navItems.forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tabId);
    });

    // Clear Content
    mainContent.innerHTML = '';
    mainContent.scrollTop = 0;

    switch (tabId) {
        case 'home':
            renderHome(mainContent, { onNavigateVideo: navigateToVideo });
            break;
        case 'community':
            renderCommunity(mainContent);
            break;
        case 'guide':
            renderMeeting(mainContent);
            break;
        case 'funeral':
            renderFuneral(mainContent);
            break;
        case 'schedule':
            renderSchedule(mainContent);
            break;
    }
}

// Navigation Helper
function navigateToVideo(videoData) {
    // Hide Bottom Nav for immersive feel? Or keep it? Keeping it for now.
    mainContent.innerHTML = '';
    mainContent.scrollTop = 0;

    renderVideoDetail(mainContent, videoData, () => {
        // On Back
        switchTab('home');
    });
}

// Event Listeners
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        // Find the closest .nav-item (in case icon/span is clicked)
        const target = e.target.closest('.nav-item');
        if (target) {
            switchTab(target.dataset.tab);
        }
    });
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // 0. Check Auth First
    let isAuth = ProfileManager.init();

    if (!isAuth) {
        document.getElementById('app').style.display = 'none';
    }

    // 1. Render UI underneath
    switchTab('home');

    // Splash Screen Logic (4-Step: Loading -> Video -> Logo -> Guides)
    const loadingScreen = document.getElementById('splash-loading');
    const phase1 = document.getElementById('splash-phase-1');
    const phase2 = document.getElementById('splash-phase-2');
    const phase3 = document.getElementById('splash-phase-3');
    const video = document.getElementById('splash-video');

    // Step 0: Loading Screen (Auto Advance)
    if (loadingScreen && phase1) {
        setTimeout(() => {
            // 1. Make Phase 1 immediately visible (opaque) BEHIND the loading screen
            // Disable transition temporarily so it doesn't fade in
            phase1.style.transition = 'none';
            phase1.classList.remove('hidden');

            // 2. Start Video
            if (video) {
                video.muted = true;
                video.play().catch(e => console.log('Autoplay prevented:', e));
            }

            // 3. Fade out Loading Screen (revealing Phase 1)
            requestAnimationFrame(() => {
                loadingScreen.classList.add('hidden');

                // Restore Phase 1 transition for later exit
                setTimeout(() => {
                    phase1.style.transition = '';
                }, 100);
            });

            // 4. Cleanup
            setTimeout(() => loadingScreen.remove(), 1000);
        }, 2200);
    }

    // Step 1: Click Video -> Go to Phase 2
    if (phase1) {
        const overlay = phase1.querySelector('.splash-click-capture');
        const toPhase2 = () => {
            if (phase2) {
                // Prevent transition on Phase 2 entry so it appears instantly BEHIND Phase 1
                phase2.style.transition = 'none';
                phase2.classList.remove('hidden');
                setTimeout(() => { phase2.style.transition = ''; }, 50);
            }
            phase1.classList.add('hidden');
            setTimeout(() => { phase1.remove(); }, 1000);
        };

        const trigger = overlay || phase1;
        trigger.addEventListener('click', toPhase2);
        trigger.addEventListener('touchstart', toPhase2, { passive: true });
    }

    // Step 2: Click Phase 2 -> Auth Check -> Go to Phase 3
    if (phase2) {
        const processPhase2 = () => {
            phase2.classList.add('hidden');
            setTimeout(() => { phase2.remove(); }, 1000);

            if (!isAuth) {
                showLoginModal(() => {
                    isAuth = true; // Update local state
                    showPhase3();  // Show guidelines after login
                });
            } else {
                showPhase3();      // Already logged in, straight to guidelines
            }
        };
        phase2.addEventListener('click', processPhase2);
    }

    // Helper to show Phase 3
    function showPhase3() {
        if (phase3) {
            phase3.style.transition = 'none';
            phase3.classList.remove('hidden');
            setTimeout(() => { phase3.style.transition = ''; }, 50);
        } else {
            enterApp();
        }
    }

    // Step 3: Enter App Logic
    const enterApp = () => {
        if (phase3) phase3.classList.add('hidden');
        document.getElementById('app').style.display = 'block';
        setTimeout(() => {
            document.getElementById('app').classList.add('app-visible');
            // Re-render home to show personalized greeting if we hit home first
            if (currentTab === 'home') switchTab('home');
        }, 50);
    };

    if (phase3) {
        phase3.addEventListener('click', enterApp);
    } else if (!isAuth) {
        showLoginModal(() => { enterApp(); });
    } else {
        enterApp();
    }

    // Back Button Logic
    const backBtn = document.getElementById('header-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (phase3) {
                if (!document.body.contains(phase3)) {
                    alert("지침서 화면이 삭제되었습니다. 앱을 완전히 새로고침 해주세요.");
                    return;
                }

                phase3.classList.remove('hidden');
                document.getElementById('app').classList.remove('app-visible'); // Hide app smoothly
                setTimeout(() => { document.getElementById('app').style.display = 'none'; }, 300);

                const container = phase3.querySelector('.guidelines-container');
                if (container) container.scrollTop = 0;
            } else {
                alert("오류: 지침서 화면을 찾을 수 없습니다.");
            }
        });
    }

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.log('SW Registration Failed: ', err));
    }
});

// ------------- Authentication & Login Modal -------------

function showLoginModal(onSuccessCallback) {
    const container = document.getElementById('modal-container');
    container.className = 'modal-overlay open'; // Ensure it covers the screen

    container.innerHTML = `
        <div class="modal-content fade-in" style="width: 90%; max-width: 400px; text-align: center;">
            <div style="margin-bottom: var(--spacing-md);">
                <img src="assets/logo.png" alt="Logo" style="width: 60px; height: 60px; border-radius: 15px;">
            </div>
            <h2 style="margin-bottom: var(--spacing-sm); color: var(--primary-color); font-family: 'Dancing Script', cursive; font-size: 2.5rem; font-weight: 700;">Welcome!</h2>
            <p style="color: var(--text-sub); font-size: 0.9rem; margin-bottom: var(--spacing-lg);">
                셀장 가이드 앱에 오신 것을 환영합니다.<br>
                등록된 셀장(교역자)만 이용 가능합니다.
            </p>
            
            <div style="text-align: left; margin-bottom: var(--spacing-sm);">
                <label style="display:block; font-size:0.85rem; font-weight:bold; color:var(--primary-color); margin-bottom: 4px;">Name</label>
                <input type="text" id="login-name" placeholder="실명을 입력하세요 (예: 홍길동)" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
            </div>
            
            <div style="text-align: left; margin-bottom: var(--spacing-sm);">
                <label style="display:block; font-size:0.85rem; font-weight:bold; color:var(--primary-color); margin-bottom: 4px;">소속 셀</label>
                <input type="text" id="login-cell" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
            </div>
            
            <div style="text-align: left; margin-bottom: var(--spacing-lg);">
                <label style="display:block; font-size:0.85rem; font-weight:bold; color:var(--primary-color); margin-bottom: 4px;">Password</label>
                <input type="password" id="login-code" placeholder="교회에서 안내받은 암호" style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem;">
            </div>
            
            <div id="login-error" style="color: var(--danger-color); font-size: 0.85rem; margin-bottom: var(--spacing-md); display:none;"></div>
            
            <button id="login-submit-btn" class="modal-close-btn" style="width:100%; padding: 16px; font-size: 1.1rem; border-radius: 12px;">시작하기</button>
        </div>
    `;

    const submitBtn = document.getElementById('login-submit-btn');
    const codeInput = document.getElementById('login-code');
    const nameInput = document.getElementById('login-name');
    const cellInput = document.getElementById('login-cell');

    const handleLogin = () => {
        const name = nameInput.value;
        const cell = cellInput.value;
        const code = codeInput.value;
        const errorDiv = document.getElementById('login-error');

        const result = ProfileManager.saveProfile(name, cell, code);

        if (result.success) {
            // Hide Modal
            container.className = 'modal-overlay'; // remove 'open' to fade out
            setTimeout(() => {
                container.style.display = 'none';
                container.innerHTML = '';
            }, 300);

            if (onSuccessCallback) {
                onSuccessCallback();
            }
        } else {
            errorDiv.textContent = result.message;
            errorDiv.style.display = 'block';
        }
    };

    submitBtn.addEventListener('click', handleLogin);

    // Allow Enter key to trigger login on password field
    codeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
        }
    });
}
