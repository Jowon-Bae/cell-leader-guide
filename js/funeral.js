import { FUNERAL_GUIDE } from './data.js';

export function renderFuneral(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.padding = 'var(--spacing-md)';

    // Title
    const title = document.createElement('h2');
    title.textContent = FUNERAL_GUIDE.title;
    title.style.color = 'var(--primary-color)';
    title.style.marginBottom = 'var(--spacing-lg)';
    title.style.textAlign = 'center';
    wrapper.appendChild(title);

    // 1. Contact Flow
    const flowSection = document.createElement('div');
    flowSection.className = 'card';
    flowSection.innerHTML = `<h3 style="margin-bottom: var(--spacing-md)">📢 연락 체계</h3>`;

    const flowList = document.createElement('div');
    FUNERAL_GUIDE.contactFlow.forEach(step => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.marginBottom = '12px';
        item.innerHTML = `
            <span style="font-weight: bold; width: 60px; color: var(--primary-light); white-space: nowrap;">${step.who}</span>
            <span style="font-size: 1.2rem; margin: 0 10px; color: #ddd;">→</span>
            <span style="font-size: 0.95rem;">${step.action}</span>
        `;
        flowList.appendChild(item);
    });
    flowSection.appendChild(flowList);
    wrapper.appendChild(flowSection);

    // 2. Checklist
    const checkSection = document.createElement('div');
    checkSection.className = 'card';
    checkSection.innerHTML = `<h3 style="margin-bottom: var(--spacing-md)">✅ 필수 체크리스트</h3>`;

    const checkList = document.createElement('ul');
    checkList.style.paddingLeft = '20px';
    checkList.style.lineHeight = '1.6';

    FUNERAL_GUIDE.checklist.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.style.marginBottom = '8px';
        checkList.appendChild(li);
    });
    checkSection.appendChild(checkList);
    wrapper.appendChild(checkSection);

    // Call Button (Optional enhancement)
    const callBtn = document.createElement('a');
    callBtn.className = 'btn btn-primary';
    callBtn.href = 'tel:010-9017-1848';
    callBtn.innerHTML = '<i class="fas fa-phone"></i> 배주원 목사 010-9017-1848';
    callBtn.style.marginTop = 'var(--spacing-md)';
    wrapper.appendChild(callBtn);

    container.appendChild(wrapper);
}
