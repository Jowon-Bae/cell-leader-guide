// Community Tab Logic

const COMMUNITY_ITEMS = [
    {
        id: 'reorg',
        title: '2026 공동체 개편',
        image: 'assets/community_reorg.png',
        detailImage: 'assets/community_reorg.png'
    },
    {
        id: 'cell_intro',
        title: '셀이란?',
        image: 'assets/community_cell_info.png',
        detailImage: 'assets/community_cell_info.png'
    },
    {
        id: 'placement',
        title: '셀 배정',
        image: 'assets/community_placement_v2.png',
        detailImage: 'assets/community_placement_v2.png'
    },
    {
        id: 'officers',
        title: '서울드림교회 임직자',
        image: 'assets/community_officers.png',
        detailImage: 'assets/community_officers.png'
    }
];

export function renderCommunity(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.padding = 'var(--spacing-md)';
    wrapper.style.height = '100%';
    wrapper.style.overflowY = 'auto';

    // Title
    const headerTitle = document.createElement('h2');
    headerTitle.textContent = '공동체';
    headerTitle.style.color = 'var(--primary-dark)';
    headerTitle.style.marginBottom = 'var(--spacing-lg)';
    headerTitle.style.textAlign = 'center';
    wrapper.appendChild(headerTitle);

    // List Container
    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = 'var(--spacing-md)';

    COMMUNITY_ITEMS.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card'; // Use existing card class for shadow/radius
        card.style.padding = '0'; // Custom padding
        card.style.overflow = 'hidden'; // Clip image
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s';

        // Image Container (Aspect Ratio)
        const imgContainer = document.createElement('div');
        imgContainer.style.width = '100%';
        imgContainer.style.height = '120px'; // Fixed height for list item
        imgContainer.style.overflow = 'hidden';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        imgContainer.appendChild(img);

        // Title Container
        const content = document.createElement('div');
        content.style.padding = 'var(--spacing-md)';

        const title = document.createElement('h3');
        title.textContent = item.title;
        title.style.margin = '0';
        title.style.fontSize = '1.1rem';
        title.style.color = 'var(--text-main)';

        content.appendChild(title);
        card.appendChild(imgContainer);
        card.appendChild(content);

        // Click Event -> Detail View
        card.onclick = () => renderCommunityDetail(container, item);

        list.appendChild(card);
    });

    wrapper.appendChild(list);
    container.appendChild(wrapper);
}

function renderCommunityDetail(container, item) {
    // Clear Container
    container.innerHTML = '';
    container.scrollTop = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.height = '100%';
    wrapper.style.backgroundColor = 'var(--bg-color)';

    // Header with Back Button
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
    backBtn.style.color = 'var(--text-main)';
    backBtn.style.fontSize = '1.2rem';
    backBtn.style.marginRight = 'var(--spacing-md)';
    backBtn.style.cursor = 'pointer';
    backBtn.onclick = () => {
        // Go back to list
        container.innerHTML = '';
        renderCommunity(container);
    };

    const title = document.createElement('h3');
    title.textContent = item.title;
    title.style.margin = '0';
    title.style.fontSize = '1.1rem';
    title.style.flex = '1';

    header.appendChild(backBtn);
    header.appendChild(title);
    wrapper.appendChild(header);

    // Content: Full Image
    const content = document.createElement('div');
    content.style.flex = '1';
    content.style.overflowY = 'auto';
    content.style.padding = '0'; // Full width image? Or padded? Let's do full width for impact.

    const detailImg = document.createElement('img');
    detailImg.src = item.detailImage;
    detailImg.style.width = '100%';
    detailImg.style.height = 'auto';
    detailImg.style.display = 'block';

    content.appendChild(detailImg);
    wrapper.appendChild(content);

    container.appendChild(wrapper);
}
