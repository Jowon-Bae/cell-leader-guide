

import { renderHome } from './home.js?v=71';
import { renderMeeting } from './meeting.js?v=71';
import { renderFuneral } from './funeral.js?v=71';
import { renderCommunity } from './community.js?v=71';
import { renderVideoDetail } from './video_detail.js?v=71';

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

    // Step 2: Click Phase 2 -> Go to Phase 3
    if (phase2) {
        const toPhase3 = () => {
            if (phase3) {
                // Prepare Phase 3 behind Phase 2
                phase3.style.transition = 'none';
                phase3.classList.remove('hidden');
                setTimeout(() => { phase3.style.transition = ''; }, 50);
            }
            phase2.classList.add('hidden');
            setTimeout(() => { phase2.remove(); }, 1000);
        };
        phase2.addEventListener('click', toPhase3);
    }

    // Step 3: Click Phase 3 -> Go to App
    if (phase3) {
        const enterApp = () => {
            phase3.classList.add('hidden');
            // Reveal the app smoothly
            document.getElementById('app').classList.add('app-visible');
        };
        phase3.addEventListener('click', enterApp);
    }

    // Back Button Logic
    const backBtn = document.getElementById('header-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling

            if (phase3) {
                // Check if phase3 is actually in the DOM (it might have been removed if old code ran)
                if (!document.body.contains(phase3)) {
                    alert("지침서 화면이 삭제되었습니다. 앱을 완전히 새로고침 해주세요.");
                    return;
                }

                phase3.classList.remove('hidden');
                // Ensure scroll is at top
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
