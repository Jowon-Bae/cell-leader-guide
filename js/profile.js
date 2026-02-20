// User Profile & Simple Client-Side Authentication

// The shared community password
const AUTH_CODE = 'dream2026';

export const ProfileManager = {
    // Current user state
    user: null,

    // Initialize - check if user is logged in
    init() {
        const savedProfile = localStorage.getItem('sd_cell_leader_profile');
        if (savedProfile) {
            try {
                this.user = JSON.parse(savedProfile);

                // Add an explicit check for valid struct in case of old data
                if (!this.user.isAuthenticated || !this.user.name) {
                    this.clearProfile();
                    return false;
                }
                return true;
            } catch (e) {
                console.error("Profile parsing error", e);
                this.clearProfile();
                return false;
            }
        }
        return false;
    },

    // Save profile with authentication flag
    saveProfile(name, cellName, inputCode) {
        if (inputCode !== AUTH_CODE) {
            return { success: false, message: '비밀번호가 일치하지 않습니다.' };
        }

        if (!name || name.trim() === '') {
            return { success: false, message: '이름을 입력해주세요.' };
        }

        this.user = {
            name: name.trim(),
            cellName: cellName ? cellName.trim() : '',
            isAuthenticated: true,
            setupDate: new Date().toISOString()
        };

        localStorage.setItem('sd_cell_leader_profile', JSON.stringify(this.user));
        return { success: true };
    },

    // Get current profile
    getProfile() {
        return this.user;
    },

    // Clear profile (Logout)
    clearProfile() {
        this.user = null;
        localStorage.removeItem('sd_cell_leader_profile');
    },

    // Check if user is authenticated
    isAuthenticated() {
        return this.user !== null && this.user.isAuthenticated === true;
    }
};
