
const SCHEDULE_ITEMS = [
    {
        id: 'event1',
        title: '신년 특별 새벽기도회',
        date: '2026-01-05',
        time: '05:00',
        location: '서울드림교회 본당',
        description: '한 해를 기도로 시작하는 특별 새벽기도회입니다.'
    },
    {
        id: 'event2',
        title: '셀 리더 수련회',
        date: '2026-02-20',
        time: '19:30',
        location: '비전홀',
        description: '셀 리더들의 영적 충전을 위한 수련회입니다.'
    },
    {
        id: 'event3',
        title: '부활절 연합예배',
        date: '2026-04-05',
        time: '11:00',
        location: '장충체육관',
        description: '부활의 기쁨을 함께 나누는 연합예배입니다.'
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
    link.setAttribute('download', `${item.title}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
