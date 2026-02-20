// User Profile & Simple Client-Side Authentication

// The shared community password
const AUTH_CODE = 'dream2026';

// List of allowed users
const ALLOWED_NAMES = [
    '김여호수아', '신도배', '배주원', '이상호', '김강림', '문현철', '곽은주'
];

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

                // Extra security: if they somehow logged in before with a bad name, kick them out
                if (!ALLOWED_NAMES.includes(this.user.name)) {
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
        if (!name || name.trim() === '') {
            return { success: false, message: '이름을 입력해주세요.' };
        }

        const cleanName = name.trim();

        if (!ALLOWED_NAMES.includes(cleanName)) {
            return { success: false, message: '등록되지 않은 사용자입니다. (이름을 확인해주세요)' };
        }

        if (inputCode !== AUTH_CODE) {
            return { success: false, message: '비밀번호가 일치하지 않습니다.' };
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
