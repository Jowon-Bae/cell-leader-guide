
export function renderVideoDetail(container, videoData, onBack) {
    const wrapper = document.createElement('div');
    // DEBUG: Removed
    // console.log('Video Data:', videoData);
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
    header.style.borderBottom = '1px solid #eee';
    header.style.backgroundColor = '#f9f9f9'; // Visual cue for update

    const backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    backBtn.style.background = 'none';
    backBtn.style.border = 'none';
    backBtn.style.color = 'var(--text-main)';
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
    descTitle.textContent = videoData.descriptionTitle || '메모 / 설교 요약';
    descTitle.style.marginBottom = '12px';
    descTitle.style.color = '#333'; // Dark grey for title on white background
    descTitle.style.fontSize = '1.0rem';
    descTitle.style.fontWeight = '600';
    contentArea.appendChild(descTitle);

    // Text Area
    const descBox = document.createElement('div');
    descBox.style.lineHeight = '1.8';
    descBox.style.color = 'black'; // Requested: Black
    descBox.style.fontSize = '0.95rem';
    descBox.style.whiteSpace = 'pre-wrap'; // Preserve newlines
    descBox.innerHTML = videoData.description ? videoData.description : '내용이 없습니다.';

    // Style the content area to be paper-like for readability of black text
    // Style the content area to be paper-like for readability of black text
    contentArea.style.backgroundColor = '#ffffff';
    contentArea.style.borderRadius = '12px 12px 0 0'; // Round top corners
    contentArea.style.color = '#000000';
    contentArea.style.padding = '20px'; // Add more internal padding for the white box
    contentArea.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)'; // Slight shadow for depth
    contentArea.appendChild(descBox); // Restore the missing line!
    wrapper.appendChild(contentArea);

    container.appendChild(wrapper);
}
