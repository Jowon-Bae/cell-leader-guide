
export function renderSchedule(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.padding = 'var(--spacing-md)';
    wrapper.style.textAlign = 'center';

    // Placeholder Content
    const title = document.createElement('h2');
    title.textContent = '사역 일정';
    title.style.color = 'var(--primary-color)';
    title.style.marginBottom = 'var(--spacing-md)';

    const message = document.createElement('p');
    message.textContent = '준비 중입니다.';
    message.style.color = 'var(--text-sub)';

    const icon = document.createElement('i');
    icon.className = 'fas fa-calendar-alt';
    icon.style.fontSize = '3rem';
    icon.style.color = 'var(--accent-color)';
    icon.style.margin = '2rem 0';
    icon.style.display = 'block';

    wrapper.appendChild(title);
    wrapper.appendChild(icon);
    wrapper.appendChild(message);

    container.appendChild(wrapper);
}
