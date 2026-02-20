
const SCHEDULE_ITEMS = [
    {
        id: 'event1',
        title: '봄학기 공동체 개강',
        date: '2026-03-08',
        time: '주일 예배',
        location: '서울드림교회',
        description: '새로운 봄학기 공동체를 시작합니다.'
    },
    {
        id: 'event2',
        title: '고난주간',
        date: '2026-03-30',
        time: '해당 주간',
        location: '각자의 자리',
        description: '3/30(월) ~ 4/4(토). 우리를 위해 십자가 지신 예수님의 사랑과 은혜에 감사하는 주간입니다.'
    },
    {
        id: 'event3',
        title: '성금요예배',
        date: '2026-04-03',
        time: '20:00',
        location: '상문고등학교 체육관',
        description: '예수님의 십자가 고난을 묵상하는 성금요예배입니다.'
    },
    {
        id: 'event4',
        title: '부활주일 (세례, 입교식)',
        date: '2026-04-05',
        time: '주일 예배 시',
        location: '상문고등학교 체육관, 성수비전센터',
        description: '부활의 기쁨을 함께 나누는 예배입니다.'
    }
];

export function renderSchedule(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';
    wrapper.style.padding = 'var(--spacing-md)';
    wrapper.style.paddingBottom = '100px';

    const header = document.createElement('img');
    header.src = 'assets/church-events-1770370120198.png';
    header.alt = 'Church Events';
    header.style.width = '100%';
    header.style.marginBottom = 'var(--spacing-md)';
    header.style.borderRadius = 'var(--radius-md)'; // Optional rounded corners
    header.style.display = 'block'; // Ensure block display
    wrapper.appendChild(header);

    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = 'var(--spacing-md)';

    SCHEDULE_ITEMS.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.gap = '8px';

        // Date Badge
        const dateObj = new Date(item.date);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];

        const headerRow = document.createElement('div');
        headerRow.style.display = 'flex';
        headerRow.style.justifyContent = 'space-between';
        headerRow.style.alignItems = 'center';

        const dateBadge = document.createElement('div');
        dateBadge.style.background = 'var(--primary-light)';
        dateBadge.style.color = 'white';
        dateBadge.style.padding = '4px 12px';
        dateBadge.style.borderRadius = 'var(--radius-round)';
        dateBadge.style.fontSize = '0.9rem';
        dateBadge.style.fontWeight = 'bold';
        dateBadge.textContent = `${month}월 ${day}일 (${dayOfWeek})`;

        headerRow.appendChild(dateBadge);
        card.appendChild(headerRow);

        // Title
        const title = document.createElement('h3');
        title.textContent = item.title;
        title.style.fontSize = '1.2rem';
        title.style.color = 'var(--text-main)';
        card.appendChild(title);

        // Info
        const info = document.createElement('div');
        info.style.fontSize = '0.95rem';
        info.style.color = 'var(--text-sub)';
        info.innerHTML = `
            <i class="fas fa-clock" style="width:20px"></i> ${item.time}<br>
            <i class="fas fa-map-marker-alt" style="width:20px"></i> ${item.location}<br>
            <span style="display:block; margin-top:5px; color:#888;">${item.description}</span>
        `;
        card.appendChild(info);

        // Add to Calendar Button
        const calBtn = document.createElement('button');
        calBtn.className = 'btn btn-accent'; // Yellow accent
        calBtn.innerHTML = '<i class="fas fa-calendar-plus"></i> 내 캘린더에 저장';
        calBtn.style.marginTop = '10px';
        calBtn.style.fontSize = '0.9rem';

        calBtn.onclick = () => {
            addToCalendar(item);
        };

        card.appendChild(calBtn);
        list.appendChild(card);
    });

    wrapper.appendChild(list);
    container.appendChild(wrapper);
}

// Helper: Generate .ics file and trigger download
function addToCalendar(item) {
    // Format Date: YYYYMMDDTHHMMSS
    const startStr = item.date.replace(/-/g, '') + 'T' + item.time.replace(/:/g, '') + '00';

    // End Date (Assume 2 hours duration for simplicity)
    // Parse to add hours
    const d = new Date(`${item.date}T${item.time}:00`);
    d.setHours(d.getHours() + 2);

    const endYear = d.getFullYear();
    const endMonth = String(d.getMonth() + 1).padStart(2, '0');
    const endDay = String(d.getDate()).padStart(2, '0');
    const endHour = String(d.getHours()).padStart(2, '0');
    const endMin = String(d.getMinutes()).padStart(2, '0');

    const endStr = `${endYear}${endMonth}${endDay}T${endHour}${endMin}00`;

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//SeoulDreamChurch//CellLeaderGuide//KO',
        'BEGIN:VEVENT',
        `SUMMARY:${item.title}`,
        `DTSTART:${startStr}`,
        `DTEND:${endStr}`,
        `LOCATION:${item.location}`,
        `DESCRIPTION:${item.description}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n'); // Standard line ending

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    // iOS Safari workaround: Remove 'download' attribute.
    // Safari treats blob downloads as generic files or blocks them.
    // By omitting 'download' and using target='_blank', Safari navigates to the 
    // text/calendar Blob and natively hands it off to the Calendar app.
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
        link.target = '_blank';
    } else {
        link.setAttribute('download', `${item.title}.ics`);
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
