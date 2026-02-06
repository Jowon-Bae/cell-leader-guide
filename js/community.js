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
        pdf: 'assets/cell_intro1.pdf'
    },
    {
        id: 'placement',
        title: '셀 배정',
        image: 'assets/community_placement_v2.png',
        detailImage: 'assets/community_placement_v2.png',
        pdf: 'assets/cell_intro2.pdf'
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

        // Click Event -> Detail View
        card.onclick = () => {
            renderCommunityDetail(container, item);
        };

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
        loader.textContent = 'PDF 로딩 중...';
        loader.style.padding = '20px';
        loader.style.textAlign = 'center';
        container.appendChild(loader);

        try {
            // Load from local js/lib folder
            await loadScript('./js/lib/pdf.min.js');

            // Set Worker to Local
            pdfjsLib.GlobalWorkerOptions.workerSrc = './js/lib/pdf.worker.min.js';
            loader.remove();
        } catch (e) {
            console.error("Lib Load Failed", e);
            loader.textContent = '라이브러리 로드 실패';
            return;
        }
    }

    // 2. Load PDF
    const loadingTask = pdfjsLib.getDocument(pdfUrl);

    const statusDiv = document.createElement('div');
    statusDiv.style.textAlign = 'center';
    statusDiv.textContent = '문서 여는 중...';
    container.appendChild(statusDiv);

    try {
        const pdf = await loadingTask.promise;
        statusDiv.remove();

        // 3. Render All Pages
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 }); // Good quality, better perf

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // CSS
            canvas.style.width = '100%';
            canvas.style.maxWidth = '1000px'; // Prevent too wide on desktop
            canvas.style.height = 'auto';
            canvas.style.display = 'block'; // Block behavior for margin auto
            canvas.style.marginBottom = '10px';
            canvas.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            canvas.style.marginLeft = 'auto'; // Robust centering
            canvas.style.marginRight = 'auto'; // Robust centering

            container.appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            await page.render(renderContext).promise;
        }

        // 5. Initialize Panzoom (Check if exists, or load it)
        if (!window.Panzoom) {
            try {
                await loadScript('./js/lib/panzoom.min.js');
            } catch (e) {
                console.error("Panzoom load failed", e);
            }
        }

        if (window.Panzoom) {
            // Let's create a wrapper for better control
            const zoomWrapper = document.createElement('div');
            zoomWrapper.style.touchAction = 'none'; // Critical
            zoomWrapper.style.display = 'block'; // Changed to Block
            zoomWrapper.style.textAlign = 'center'; // Center children
            zoomWrapper.style.width = '100%';
            zoomWrapper.style.margin = '0 auto'; // Robust centering of wrapper itself

            // Move children (canvases) to wrapper
            while (container.children.length > 0) {
                zoomWrapper.appendChild(container.children[0]);
            }
            container.appendChild(zoomWrapper);

            const panzoomInstance = Panzoom(zoomWrapper, {
                maxScale: 4,
                minScale: 1,
                // contain: 'outside', // Removed to prevent "leaning"/locking
                startScale: 1,
                cursor: 'default'
            });

            // Controls (Simple)
            const controls = document.createElement('div');
            controls.style.position = 'fixed';
            controls.style.bottom = '80px';
            controls.style.right = '20px';
            controls.style.zIndex = '9999';
            controls.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button id="z-in" style="width:50px;height:50px;background:rgba(0,0,0,0.7);color:white;border-radius:50%;border:none;font-size:24px;">+</button>
                    <button id="z-out" style="width:50px;height:50px;background:rgba(0,0,0,0.7);color:white;border-radius:50%;border:none;font-size:24px;">-</button>
                    <button id="z-reset" style="width:50px;height:50px;background:rgba(0,0,0,0.7);color:white;border-radius:50%;border:none;font-size:16px;">↺</button>
                </div>
            `;
            container.appendChild(controls);

            document.getElementById('z-in').onclick = (e) => { e.stopPropagation(); panzoomInstance.zoomIn(); };
            document.getElementById('z-out').onclick = (e) => { e.stopPropagation(); panzoomInstance.zoomOut(); };
            document.getElementById('z-reset').onclick = (e) => { e.stopPropagation(); panzoomInstance.reset(); };
        }

    } catch (error) {
        console.error(error);
        statusDiv.textContent = '오류: ' + error.message;
    }
}

// Helper to load script with timeout
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = src;

        const timeout = setTimeout(() => {
            reject(new Error(`Timeout loading ${src}`));
        }, 5000); // 5s timeout

        script.onload = () => {
            clearTimeout(timeout);
            resolve();
        };
        script.onerror = (e) => {
            clearTimeout(timeout);
            reject(new Error(`Failed to load ${src}`));
        };

        document.head.appendChild(script);
    });
}
