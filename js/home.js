
import { OATHS, FUNERAL_GUIDE, QUICK_LINKS } from './data.js';
import { initInstallPrompt } from './install_prompt.js';

initInstallPrompt();

export function renderHome(container, callbacks = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';

    // 1. Helper: Create Auto-Playing Slider
    function createSlider(items, intervalTime = 5000) {
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const track = document.createElement('div');
        track.className = 'slider-track';

        items.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'slider-slide';
            if (index === 0) slide.classList.add('active');

            let content;
            if (item.action && callbacks.onNavigateVideo) {
                // Clickable Slide for Internal Navigation
                const btn = document.createElement('div');
                btn.style.width = '100%';
                btn.style.height = '100%';
                btn.style.cursor = 'pointer';
                btn.onclick = () => callbacks.onNavigateVideo(item.data);

                const img = document.createElement('img');
                img.src = item.src;
                img.loading = 'lazy';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';

                btn.appendChild(img);
                content = btn;
            } else if (item.link) {
                // Should not happen for video items now, but kept for compatibility
                const link = document.createElement('a');
                link.href = item.link;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.style.display = 'block';
                link.style.width = '100%';
                link.style.height = '100%';

                const img = document.createElement('img');
                img.src = item.src;
                img.loading = 'lazy';
                link.appendChild(img);
                content = link;
            } else {
                // Static Image
                const img = document.createElement('img');
                img.src = item.src;
                img.loading = 'lazy';
                content = img;
            }

            slide.appendChild(content);
            track.appendChild(slide);
        });

        sliderContainer.appendChild(track);

        // Auto-play Logic
        let currentIndex = 0;
        const totalSlides = items.length;

        const intervalId = setInterval(() => {
            if (!document.body.contains(sliderContainer)) {
                clearInterval(intervalId);
                return;
            }

            const slides = track.querySelectorAll('.slider-slide');
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % totalSlides;
            slides[currentIndex].classList.add('active');

        }, intervalTime);

        return sliderContainer;
    }

    // 2. Main Image Slider
    const mainImages = [
        { src: 'assets/slide1.jpg' },
        { src: 'assets/slide2.jpg' },
        { src: 'assets/slide3.jpg' },
        { src: 'assets/slide4.jpg' },
        { src: 'assets/slide5.jpg' }
    ];
    wrapper.appendChild(createSlider(mainImages, 5000));

    // 3. YouTube Thumbnail Slider
    const youtubeItems = [
        {
            src: 'https://img.youtube.com/vi/RM7dsSUV68w/maxresdefault.jpg',
            action: true,
            data: {
                videoId: 'RM7dsSUV68w',
                title: '3기 제자훈련 수료 영상',
                description: '제자훈련 과정을 마친 수료생들의 간증과 은혜의 기록입니다.\n\n"내가 그리스도와 함께 십자가에 못 박혔나니 그런즉 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것이라"'
            }
        },
        {
            src: 'https://img.youtube.com/vi/tM2AE8ii0Bo/maxresdefault.jpg',
            action: true,
            data: {
                videoId: 'tM2AE8ii0Bo',
                title: '특별 새벽 기도회 특송',
                description: '우리 교회의 뜨거운 기도의 현장을 담았습니다.\n새벽을 깨우는 거룩한 습관으로 나아갑시다.'
            }
        }
    ];

    // Add margin for separation
    const ytSection = document.createElement('div');
    ytSection.style.marginTop = 'var(--spacing-md)';
    ytSection.appendChild(createSlider(youtubeItems, 5000));
    wrapper.appendChild(ytSection);

    // 4. Welcome Image (Request: Same size as YouTube slider, below it)
    const welcomeSection = document.createElement('div');
    // Using slider-container class for consistency in size/ratio (16:9)
    welcomeSection.className = 'slider-container';
    welcomeSection.style.marginTop = 'var(--spacing-md)';
    welcomeSection.style.background = 'black'; // Fill background if image aspect differs

    // Link Wrapper
    const welcomeLink = document.createElement('a');
    welcomeLink.href = 'http://seouldream.org/Page/Index/15';
    welcomeLink.target = '_blank';
    welcomeLink.rel = 'noopener noreferrer';
    welcomeLink.style.display = 'block';
    welcomeLink.style.width = '100%';
    welcomeLink.style.height = '100%';

    const welcomeImg = document.createElement('img');
    welcomeImg.src = 'assets/welcome.png';
    welcomeImg.loading = 'lazy';
    welcomeImg.style.width = '100%';
    welcomeImg.style.height = '100%';
    welcomeImg.style.objectFit = 'contain'; // Keep ratio, fill box

    welcomeLink.appendChild(welcomeImg);
    welcomeSection.appendChild(welcomeLink);
    wrapper.appendChild(welcomeSection);

    // 5. Worship Guide Image (Request: Same size, below Welcome)
    const worshipSection = document.createElement('div');
    worshipSection.className = 'slider-container';
    worshipSection.style.marginTop = 'var(--spacing-md)';
    worshipSection.style.background = 'black';

    const worshipLink = document.createElement('a');
    worshipLink.href = 'http://seouldream.org/Board/Index/3639';
    worshipLink.target = '_blank';
    worshipLink.rel = 'noopener noreferrer';
    worshipLink.style.display = 'block';
    worshipLink.style.width = '100%';
    worshipLink.style.height = '100%';

    const worshipImg = document.createElement('img');
    worshipImg.src = 'assets/worship_guide.png';
    worshipImg.loading = 'lazy';
    worshipImg.style.width = '100%';
    worshipImg.style.height = '100%';
    worshipImg.style.objectFit = 'contain';

    worshipLink.appendChild(worshipImg);
    worshipSection.appendChild(worshipLink);
    wrapper.appendChild(worshipSection);

    // 5. Greeting removed as per request
    // const greeting = document.createElement('div'); ...

    container.appendChild(wrapper);
}
