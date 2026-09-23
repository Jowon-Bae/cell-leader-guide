// User Profile & Client-Side Authentication

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

                return true;
            } catch (e) {
                console.error("Profile parsing error", e);
                this.clearProfile();
                return false;
            }
        }
        return false;
    },

    // Save profile with authentication flag (Now SYNC again, removed checks)
    saveProfile(name, cellName, timeSlot) {
        if (!name || name.trim() === '') {
            return { success: false, message: '이름을 입력해주세요.' };
        }

        const cleanName = name.trim();

        this.user = {
            name: cleanName,
            cellName: cellName ? cellName.trim() : '',
            timeSlot: timeSlot || '2부',
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
