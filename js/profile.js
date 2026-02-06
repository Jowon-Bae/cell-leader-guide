
// Key for LocalStorage
const PROFILE_KEY = 'cell_leader_profile_v1';

export function getUserProfile() {
    try {
        const data = localStorage.getItem(PROFILE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error reading profile:', e);
        return null;
    }
}

export function saveUserProfile(name, cellName) {
    try {
        const profile = { name, cellName, updatedAt: new Date().toISOString() };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        return true;
    } catch (e) {
        console.error('Error saving profile:', e);
        return false;
    }
}

export function hasProfile() {
    return !!getUserProfile();
}

export function renderSetupModal(onComplete) {
    // Check if modal already exists
    if (document.getElementById('profile-setup-modal')) return;

    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'profile-setup-modal';
    modalOverlay.className = 'modal-overlay fade-in';
    modalOverlay.style.display = 'flex'; // Force flex for centering

    const existingProfile = getUserProfile() || {};

    modalOverlay.innerHTML = `
        <div class="modal-content profile-modal">
            <h3 class="modal-title">환영합니다!</h3>
            <p class="modal-subtitle">셀장님의 성함과 셀 이름을 입력해주세요.<br>입력된 정보는 앱 내에만 안전하게 저장됩니다.</p>
            
            <div class="input-group">
                <label for="profile-name">이름 (필수)</label>
                <input type="text" id="profile-name" placeholder="예: 김철수" value="${existingProfile.name || ''}" >
            </div>
            
            <div class="input-group">
                <label for="profile-cell">셀 이름 (선택)</label>
                <input type="text" id="profile-cell" placeholder="예: 3교구 5셀" value="${existingProfile.cellName || ''}">
            </div>

            <div class="modal-actions">
                <button id="save-profile-btn" class="modal-btn confirm full-width">시작하기</button>
            </div>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const saveBtn = modalOverlay.querySelector('#save-profile-btn');
    const nameInput = modalOverlay.querySelector('#profile-name');
    const cellInput = modalOverlay.querySelector('#profile-cell');

    saveBtn.onclick = () => {
        const name = nameInput.value.trim();
        const cellName = cellInput.value.trim();

        if (!name) {
            alert('이름을 입력해주세요.');
            nameInput.focus();
            return;
        }

        saveUserProfile(name, cellName);

        // Animating out
        modalOverlay.style.opacity = '0';
        setTimeout(() => {
            modalOverlay.remove();
            if (onComplete) onComplete();
        }, 300);
    };
}
