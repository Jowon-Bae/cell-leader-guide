
export function renderCommunity(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.padding = 'var(--spacing-md)';
    wrapper.style.textAlign = 'center';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.justifyContent = 'center';
    wrapper.style.height = '100%';

    wrapper.innerHTML = `
        <i class="fas fa-users" style="font-size: 4rem; color: var(--cancel-color); margin-bottom: var(--spacing-lg); opacity: 0.5;"></i>
        <h2 style="color: var(--primary-dark); margin-bottom: var(--spacing-md);">공동체 명단</h2>
        <p style="color: var(--text-sub); line-height: 1.6;">
            현재 준비 중인 기능입니다.<br>
            추후 업데이트될 예정입니다.
        </p>
    `;

    container.appendChild(wrapper);
}
