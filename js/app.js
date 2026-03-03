import { ProfileManager } from './profile.js';
import { renderHome } from './home.js';
import { renderMeeting } from './meeting.js';
import { renderFuneral } from './funeral.js';
import { renderCommunity } from './community.js';
import { renderVideoDetail } from './video_detail.js';
import { renderSchedule } from './schedule_v2.js';

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

    const urlParams = new URLSearchParams(window.location.search);
    const forceLogin = urlParams.get('login') === 'true';

    if (forceLogin && !isAuth) {
        document.getElementById('app').style.display = 'none';

        // Hide all splash screens
        ['splash-loading', 'splash-phase-1', 'splash-phase-2', 'splash-phase-3'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        switchTab('home');

        setTimeout(() => {
            showLoginModal(() => {
                isAuth = true;
                const antiFlashStyle = document.getElementById('anti-flash-style');
                if (antiFlashStyle) antiFlashStyle.remove();

                const phase3 = document.getElementById('splash-phase-3');
                if (phase3) {
                    phase3.style.display = ''; // Clear the inline display:none
                    phase3.style.transition = 'none';
                    phase3.classList.remove('hidden');

                    setTimeout(() => { phase3.style.transition = ''; }, 50);

                    // Allow clicking the guidelines to enter the app
                    phase3.addEventListener('click', () => {
                        phase3.classList.add('hidden');
                        document.getElementById('app').style.display = 'block';
                        setTimeout(() => {
                            document.getElementById('app').classList.add('app-visible');
                            if (currentTab === 'home') switchTab('home');
                        }, 50);
                    }, { once: true });
                } else {
                    document.getElementById('app').style.display = 'block';
                    setTimeout(() => {
                        document.getElementById('app').classList.add('app-visible');
                        if (currentTab === 'home') switchTab('home');
                    }, 50);
                }
            }, true); // Pass true to disable transition
        }, 100);

        return; // Skip the rest of splash setup
    }

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

function showLoginModal(onSuccessCallback, instant = false) {
    const container = document.getElementById('modal-container');

    const isPreRendered = container.innerHTML.includes('login-code');

    if (instant) {
        container.classList.add('no-transition');
    }

    container.className = `modal-overlay open ${instant ? 'no-transition' : ''}`; // Ensure it covers the screen

    if (!isPreRendered) {
        container.innerHTML = `
            <div class="modal-content ${instant ? '' : 'fade-in'}" style="width: 90%; max-width: 400px; text-align: center; background: #1a237e url('assets/background_card.jpeg') no-repeat center center / cover; color: white; max-height: 95vh; overflow-y: visible; padding: 15px; border-radius: 16px;">
                <!-- Dark overlay to ensure text readability against the potentially bright background image -->
                <div style="position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); border-radius: 16px; z-index: 1;"></div>
                
                <div style="position: relative; z-index: 2;">
                    <div style="margin-bottom: 8px;">
                        <img src="assets/logo.png" alt="Logo" style="width: 50px; height: 50px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
                    </div>
                    <h2 style="margin-bottom: 4px; color: white; font-family: 'Dancing Script', cursive; font-size: 2.2rem; font-weight: 700; text-shadow: 1px 1px 3px rgba(0,0,0,0.5);">Welcome!</h2>
                    <p style="color: rgba(255,255,255,0.9); font-size: 0.85rem; margin-bottom: 16px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); line-height: 1.3;">
                        셀장 가이드에 오신 것을 환영합니다.<br>이름과 커뮤니티(셀), 암호를 입력해 주세요.
                    </p>
                    
                    <div style="text-align: left; margin-bottom: 12px;">
                        <label style="display:block; font-size:0.8rem; font-weight:bold; color:white; margin-bottom: 4px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Name</label>
                        <input type="text" id="login-name" placeholder="홍길동" style="width: 100%; border-sizing: border-box; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; font-size: 0.95rem; background: rgba(255,255,255,0.9); color: #333;">
                    </div>
                    
                    <div style="text-align: left; margin-bottom: 12px;">
                        <label style="display:block; font-size:0.8rem; font-weight:bold; color:white; margin-bottom: 4px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Community</label>
                        <input type="text" id="login-cell" placeholder="(예: 마태)" style="width: 100%; border-sizing: border-box; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; font-size: 0.95rem; background: rgba(255,255,255,0.9); color: #333;">
                    </div>
                    
                    <div style="text-align: left; margin-bottom: 20px;">
                        <label style="display:block; font-size:0.8rem; font-weight:bold; color:white; margin-bottom: 4px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">Password</label>
                        <input type="password" id="login-code" placeholder="교회에서 안내받은 암호" style="width: 100%; border-sizing: border-box; padding: 10px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; font-size: 0.95rem; background: rgba(255,255,255,0.9); color: #333;">
                    </div>
                    
                    <div id="login-error" style="color: #ff8a80; font-size: 0.85rem; margin-bottom: 12px; display:none; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);"></div>
                    
                    <button id="login-submit-btn" class="modal-close-btn" style="width:100%; padding: 12px; font-size: 1rem; border-radius: 12px; background-color: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.5); backdrop-filter: blur(5px); font-weight: bold;">시작하기</button>
                </div>
            </div>
        `;
    }

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
