
import { OATHS, FUNERAL_GUIDE, QUICK_LINKS } from './data.js';
import { getUserProfile } from './profile.js';

initInstallPrompt();

export function renderHome(container, callbacks = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';

    // 0. Greeting Card (Personalization)
    const profile = getUserProfile();
    if (profile && profile.name) {
        const greetingCard = document.createElement('div');
        greetingCard.className = 'home-greeting-card fade-in';
        greetingCard.innerHTML = `
            <div class="greeting-text">반갑습니다, <span class="highlight-name">${profile.name}</span> 셀장님!</div>
            ${profile.cellName ? `<div class="greeting-subtext">${profile.cellName}</div>` : ''}
        `;
        wrapper.appendChild(greetingCard);
    }

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
                title: '2026.01.25 신도배 목사 주일 설교',
                descriptionTitle: '역대상 4:9-10(개역개정)',
                description: '9 야베스는 그의 형제보다 귀중한 자라 그의 어머니가 이름하여 이르되 야베스라 하였으니 이는 내가 수고로이 낳았다 함이었더라\n10 야베스가 이스라엘 하나님께 아뢰어 이르되 주께서 내게 복을 주시려거든 나의 지역을 넓히시고 주의 손으로 나를 도우사 나로 환난을 벗어나 내게 근심이 없게 하옵소서 하였더니 하나님이 그가 구하는 것을 허락하셨더라'
            }
        },
        {
            src: 'https://img.youtube.com/vi/tM2AE8ii0Bo/maxresdefault.jpg',
            action: true,
            data: {
                videoId: 'tM2AE8ii0Bo',
                title: '2026.01.25 김여호수아 목사 주일 설교',
                descriptionTitle: '역대상 4:9-10(쉬운성경)',
                description: '9 야베스라는 사람이 있었는데, 그는 다른 형제들보다 더 존경을 받았습니다. 야베스의 어머니는 \'고통중에 아들을 낳았다\'는 뜻으로 그의 이름을 야베스라고 지었습니다.\n10 야베스가 이스라엘의 하나님께 기도드렸습니다. "나에게 복을 주십시오. 나에게 땅을 더 많이 주십시오. 나와 함께 계셔 주시고, 아무도 나를 해치지 못하게 해 주십시오. 내가 누구한테도 고통을 당하지 않게 해 주십시오." 하나님께서는 야베스의 기도를 들어 주셨습니다.'
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
    welcomeSection.style.background = 'transparent'; // Remove black bars

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
    worshipSection.style.background = 'transparent';

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
