
export function renderVideoDetail(container, videoData, onBack) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.height = '100%';

    // 1. Header with Back Button (Specific to this view if needed, or rely on global back?)
    // User asked for "New App Screen". Usually has a back way.
    // Let's add a simple "Close" or "Back" bar.
    const header = document.createElement('div');
    header.style.padding = 'var(--spacing-md)';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.borderBottom = '1px solid #333';

    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backBtn.style.background = 'none';
    backBtn.style.border = 'none';
    backBtn.style.color = 'white';
    backBtn.style.fontSize = '1.2rem';
    backBtn.style.marginRight = '12px';
    backBtn.style.cursor = 'pointer';
    backBtn.onclick = onBack; // Navigate back to text/home

    const title = document.createElement('h3');
    title.textContent = videoData.title || '영상 상세';
    title.style.margin = '0';
    title.style.fontSize = '1.1rem';

    header.appendChild(backBtn);
    header.appendChild(title);
    wrapper.appendChild(header);

    // 2. Video Player / Large Thumbnail
    const videoContainer = document.createElement('div');
    videoContainer.style.width = '100%';
    videoContainer.style.aspectRatio = '16/9';
    videoContainer.style.backgroundColor = 'black';

    // We can use an iframe for playing
    if (videoData.videoId) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoData.videoId}`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
    } else {
        const img = document.createElement('img');
        img.src = videoData.src; // Thumbnail
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        videoContainer.appendChild(img);
    }
    wrapper.appendChild(videoContainer);

    // 3. Text Area / Description
    const contentArea = document.createElement('div');
    contentArea.style.padding = 'var(--spacing-md)';
    contentArea.style.flex = '1';
    contentArea.style.overflowY = 'auto';

    // Description Title
    const descTitle = document.createElement('h4');
    descTitle.textContent = '메모 / 설교 요약';
    descTitle.style.marginBottom = '8px';
    descTitle.style.color = 'var(--primary-light)';
    contentArea.appendChild(descTitle);

    // Text Area (Read-only description OR Editable notes?)
    // "글씨를 넣을 수 있는 공간" -> Ambiguous. Let's provide a textarea for *User* notes if that's the intent, 
    // OR a div for *Admin* text. 
    // Usually "Space to put text" in a request like this implies "I want to see text here".
    // I'll provide a pre-filled text area with description.

    const descBox = document.createElement('div');
    descBox.style.lineHeight = '1.6';
    descBox.style.color = '#ddd';
    descBox.style.fontSize = '0.95rem';
    descBox.innerHTML = videoData.description ? videoData.description.replace(/\n/g, '<br>') : '내용이 없습니다.';

    contentArea.appendChild(descBox);
    wrapper.appendChild(contentArea);

    container.appendChild(wrapper);
}
