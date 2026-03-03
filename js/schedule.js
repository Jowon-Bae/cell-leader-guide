export function renderSchedule(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.padding = 'var(--spacing-md)';
    wrapper.style.paddingBottom = '100px';

    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = 'var(--spacing-md)';

    // Helper to create banner cards
    const createBanner = (title, subtitle, imageSrc, onClick) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.padding = '0';
        card.style.overflow = 'hidden';
        card.style.cursor = 'pointer';
        card.style.position = 'relative';
        card.style.height = '120px';
        card.style.borderRadius = '16px';
        card.onclick = onClick;

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.background = 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.1) 100%)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.padding = '20px';

        const h3 = document.createElement('h3');
        h3.textContent = title;
        h3.style.color = 'white';
        h3.style.fontSize = '1.25rem';
        h3.style.fontWeight = 'bold';
        h3.style.marginBottom = '4px';

        const p = document.createElement('p');
        p.textContent = subtitle;
        p.style.color = 'rgba(255, 255, 255, 0.8)';
        p.style.fontSize = '0.875rem';

        const iconContainer = document.createElement('div');
        iconContainer.style.position = 'absolute';
        iconContainer.style.right = '12px';
        iconContainer.style.top = '12px';
        iconContainer.style.width = '32px';
        iconContainer.style.height = '32px';
        iconContainer.style.backgroundColor = '#f3f4f6';
        iconContainer.style.borderRadius = '50%';
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.justifyContent = 'center';

        const chevron = document.createElement('i');
        chevron.className = 'fas fa-chevron-right';
        chevron.style.color = '#3b82f6';
        chevron.style.fontSize = '14px';

        iconContainer.appendChild(chevron);
        overlay.appendChild(h3);
        overlay.appendChild(p);
        overlay.appendChild(iconContainer);

        card.appendChild(img);
        card.appendChild(overlay);
        return card;
    };

    // Mission Banner
    const missionCard = createBanner(
        'Mission',
        '국내 선교 & 해외 선교',
        'assets/slide4.jpg',
        () => {
            renderMissionDetail(container);
        }
    );
    list.appendChild(missionCard);

    // Dream+ Banner
    const dreamPlusCard = createBanner(
        'Dream +',
        '드림플러스 상세 보기',
        'assets/dreamplus2_mid.jpeg',
        () => {
            renderDreamPlusDetail(container);
        }
    );
    list.appendChild(dreamPlusCard);

    wrapper.appendChild(list);
    container.appendChild(wrapper);
}

function renderMissionDetail(container) {
    container.innerHTML = '';
    container.scrollTop = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.height = '100%';
    wrapper.style.backgroundColor = 'var(--bg-color)';

    // Header
    const header = document.createElement('div');
    header.style.padding = 'var(--spacing-md)';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.background = 'white';
    header.style.boxShadow = 'var(--shadow-sm)';
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '10';

    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backBtn.style.background = 'none';
    backBtn.style.border = 'none';
    backBtn.style.fontSize = '1.2rem';
    backBtn.style.color = 'var(--text-main)';
    backBtn.style.cursor = 'pointer';
    backBtn.style.marginRight = 'var(--spacing-md)';
    backBtn.onclick = () => {
        container.innerHTML = '';
        renderSchedule(container);
    };

    const title = document.createElement('h2');
    title.textContent = 'Mission';
    title.style.fontSize = '1.2rem';
    title.style.margin = '0';
    title.style.color = 'var(--text-main)';

    header.appendChild(backBtn);
    header.appendChild(title);
    wrapper.appendChild(header);

    // Content
    const content = document.createElement('div');
    content.style.padding = 'var(--spacing-md)';
    content.style.paddingBottom = '80px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.gap = 'var(--spacing-md)';

    // Helper to create simple detail banner cards
    const createDetailBanner = (titleText, subtitleText, imageSrc, linkObj) => {
        const card = document.createElement('div');
        card.style.height = '120px';
        card.style.borderRadius = '16px';
        card.style.overflow = 'hidden';
        card.style.position = 'relative';

        const link = document.createElement('a');
        link.href = linkObj;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.style.display = 'block';
        link.style.width = '100%';
        link.style.height = '100%';

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'flex-end';
        overlay.style.padding = '20px';

        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        h3.style.color = 'white';
        h3.style.fontSize = '1.25rem';
        h3.style.fontWeight = 'bold';
        h3.style.marginBottom = '4px';

        const p = document.createElement('p');
        p.textContent = subtitleText;
        p.style.color = 'rgba(255, 255, 255, 0.8)';
        p.style.fontSize = '0.875rem';

        overlay.appendChild(h3);
        overlay.appendChild(p);
        link.appendChild(img);
        link.appendChild(overlay);
        card.appendChild(link);
        return card;
    };

    content.appendChild(createDetailBanner(
        '국내 선교',
        'Domestic Missions',
        'assets/slide5.jpg',
        'https://seouldream.org/Board/Index/3642'
    ));

    content.appendChild(createDetailBanner(
        '해외 선교',
        'Global Missions',
        'assets/slide4.jpg',
        'https://seouldream.org/Board/Index/3847'
    ));

    wrapper.appendChild(content);
    container.appendChild(wrapper);
}

function renderDreamPlusDetail(container) {
    container.innerHTML = '';
    container.scrollTop = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.height = '100%';
    wrapper.style.backgroundColor = 'var(--bg-color)';

    // Header
    const header = document.createElement('div');
    header.style.padding = 'var(--spacing-md)';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.background = 'white';
    header.style.boxShadow = 'var(--shadow-sm)';
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.zIndex = '10';

    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backBtn.style.background = 'none';
    backBtn.style.border = 'none';
    backBtn.style.fontSize = '1.2rem';
    backBtn.style.color = 'var(--text-main)';
    backBtn.style.cursor = 'pointer';
    backBtn.style.marginRight = 'var(--spacing-md)';
    backBtn.onclick = () => {
        container.innerHTML = '';
        renderSchedule(container); // Go back to Ministry Tab
    };

    const title = document.createElement('h2');
    title.textContent = 'Dream +';
    title.style.fontSize = '1.2rem';
    title.style.margin = '0';
    title.style.color = 'var(--text-main)';

    header.appendChild(backBtn);
    header.appendChild(title);
    wrapper.appendChild(header);

    // Content
    const content = document.createElement('div');
    content.style.padding = 'var(--spacing-md)';
    content.style.paddingBottom = '80px';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.gap = 'var(--spacing-md)';

    const createDetailBanner = (titleText, subtitleText, imageSrc, actionLink) => {
        const card = document.createElement('div');
        card.style.height = '120px';
        card.style.borderRadius = '16px';
        card.style.overflow = 'hidden';
        card.style.position = 'relative';

        const ElementType = actionLink ? 'a' : 'div';
        const inner = document.createElement(ElementType);
        inner.style.display = 'block';
        inner.style.width = '100%';
        inner.style.height = '100%';
        if (actionLink) {
            inner.href = actionLink;
            inner.target = '_blank';
            inner.rel = 'noopener noreferrer';
        }

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';

        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'flex-end';
        overlay.style.padding = '20px';

        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        h3.style.color = 'white';
        h3.style.fontSize = '1.25rem';
        h3.style.fontWeight = 'bold';
        h3.style.marginBottom = '4px';

        const p = document.createElement('p');
        p.textContent = subtitleText;
        p.style.color = 'rgba(255, 255, 255, 0.8)';
        p.style.fontSize = '0.875rem';

        overlay.appendChild(h3);
        overlay.appendChild(p);
        inner.appendChild(img);
        inner.appendChild(overlay);

        card.appendChild(inner);
        return card;
    };

    content.appendChild(createDetailBanner(
        '드림플러스 사역 안내',
        'Ministry Guide',
        'assets/dreamplus1_mid.jpeg',
        null // Clicking doesnt route externally according to spec
    ));

    content.appendChild(createDetailBanner(
        '드림플러스 유튜브 링크',
        'YouTube Channel',
        'assets/dreamplus2_mid.jpeg',
        'https://www.youtube.com/@드림플러스'
    ));

    wrapper.appendChild(content);
    container.appendChild(wrapper);
}
