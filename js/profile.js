// User Profile & Client-Side Authentication

// The shared community password
const AUTH_CODE = 'dream2026';
const GAS_URL = 'https://script.google.com/macros/s/AKfycbyhVzV1SYeVN6wYtoX6iig1WHCQONok7IqyPrk1IbOfa5spZxoyO2YfsC1uIgUYsX3r/exec';

export const ProfileManager = {
    // Current user state
    user: null,

    // Initialize - check if user is logged in
    init() {
        const savedProfile = sessionStorage.getItem('sd_cell_leader_profile');
        if (savedProfile) {
            try {
                this.user = JSON.parse(savedProfile);

                // Add an explicit check for valid struct in case of old data
                if (!this.user.isAuthenticated || !this.user.name) {
                    this.clearProfile();
                    return false;
                }

                // Note: We don't check against ALLOWED_NAMES here anymore
                // because doing an async fetch on every init() would delay the app loading.
                // If they have the profile object and passed auth once, we trust it until cleared.

                return true;
            } catch (e) {
                console.error("Profile parsing error", e);
                this.clearProfile();
                return false;
            }
        }
        return false;
    },

    // Save profile with authentication flag (Now ASYNC)
    async saveProfile(name, cellName, inputCode) {
        if (!name || name.trim() === '') {
            return { success: false, message: '이름을 입력해주세요.' };
        }

        const cleanName = name.trim();

        if (inputCode !== AUTH_CODE) {
            return { success: false, message: '비밀번호가 일치하지 않습니다.' };
        }

        try {
            // Fetch allowed names from Google Sheets
            const response = await fetch(`${GAS_URL}?action=getLeaders`);
            const allowedNames = await response.json();
            
            if (!Array.isArray(allowedNames) || !allowedNames.includes(cleanName)) {
                return { success: false, message: '등록되지 않은 사용자입니다. (구글 시트에 등록된 이름을 확인해주세요)' };
            }
        } catch (error) {
            console.error("Failed to fetch leaders list:", error);
            return { success: false, message: '명단을 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' };
        }

        this.user = {
            name: name.trim(),
            cellName: cellName ? cellName.trim() : '',
            isAuthenticated: true,
            setupDate: new Date().toISOString()
        };

        sessionStorage.setItem('sd_cell_leader_profile', JSON.stringify(this.user));
        return { success: true };
    },

    // Get current profile
    getProfile() {
        return this.user;
    },

    // Clear profile (Logout)
    clearProfile() {
        this.user = null;
        sessionStorage.removeItem('sd_cell_leader_profile');
    },

    // Check if user is authenticated
    isAuthenticated() {
        return this.user !== null && this.user.isAuthenticated === true;
    }
};
