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
        image: 'assets/community_cell_info.png',
        detailImage: 'assets/community_cell_info.png',
        pdf: 'assets/cell_intro.pdf'
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

    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';

    COMMUNITY_ITEMS.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.padding = '0';
        card.style.overflow = 'hidden';
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s';
        card.style.marginBottom = 'var(--spacing-md)'; // Added explicit margin

        const imgContainer = document.createElement('div');
        imgContainer.style.width = '100%';
        imgContainer.style.height = 'auto';
        imgContainer.style.display = 'block';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';

        imgContainer.appendChild(img);
        card.appendChild(imgContainer);

        card.onclick = () => renderCommunityDetail(container, item);

        list.appendChild(card);
    });

    wrapper.appendChild(list);
    container.appendChild(wrapper);
}

function renderCommunityDetail(container, item) {
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
    backBtn.style.color = 'var(--text-main)';
    backBtn.style.fontSize = '1.2rem';
    backBtn.style.marginRight = 'var(--spacing-md)';
    backBtn.style.cursor = 'pointer';
    backBtn.onclick = () => {
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

    // Content
    const content = document.createElement('div');
    content.style.flex = '1';
    content.style.overflowY = 'auto';
    content.style.padding = '0';
    content.style.background = '#f5f5f5'; // Light gray for PDF background

    if (item.pdf) {
        renderPdfViewer(content, item.pdf);
    } else {
        const detailImg = document.createElement('img');
        detailImg.src = item.detailImage;
        detailImg.style.width = '100%';
        detailImg.style.height = 'auto';
        detailImg.style.display = 'block';
        content.appendChild(detailImg);
    }

    wrapper.appendChild(content);
    container.appendChild(wrapper);
}

// PDF Viewer Implementation
async function renderPdfViewer(container, pdfUrl) {
    // 1. Check if pdf.js is loaded
    if (!window.pdfjsLib) {
        // Show loading spinner
        const loader = document.createElement('div');
        loader.textContent = 'PDF 뷰어 로딩 중...';
        loader.style.padding = '20px';
        loader.style.textAlign = 'center';
        container.appendChild(loader);

        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');
            // Worker is needed
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            loader.remove();
        } catch (e) {
            loader.textContent = 'PDF 뷰어를 불러오는데 실패했습니다.';
            console.error('PDF Load Error:', e);
            return;
        }
    }

    // 2. Load PDF
    const loadingTask = pdfjsLib.getDocument(pdfUrl);

    const statusDiv = document.createElement('div');
    statusDiv.style.padding = '20px';
    statusDiv.style.textAlign = 'center';
    statusDiv.style.color = '#666';
    statusDiv.textContent = '문서를 불러오는 중...';
    container.appendChild(statusDiv);

    try {
        const pdf = await loadingTask.promise;
        statusDiv.remove();

        // 3. Render All Pages
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);

            const viewport = page.getViewport({ scale: 1.5 }); // proper scale for mobile

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // CSS to make it fit width
            canvas.style.width = '100%';
            canvas.style.height = 'auto';
            canvas.style.display = 'block';
            canvas.style.marginBottom = '10px'; // Gap between pages
            canvas.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'; // Slight shadow

            container.appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            await page.render(renderContext).promise;
        }

    } catch (error) {
        console.error('Error rendering PDF:', error);
        statusDiv.textContent = 'PDF 파일을 여는 중 오류가 발생했습니다.';

        // Fallback or retry button?
        const retryBtn = document.createElement('button');
        retryBtn.textContent = '다시 시도';
        retryBtn.style.marginTop = '10px';
        retryBtn.onclick = () => {
            container.innerHTML = '';
            renderPdfViewer(container, pdfUrl);
        };
        container.appendChild(retryBtn);
    }
}

// Helper to load script
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
