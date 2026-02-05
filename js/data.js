export const OATHS = [
    "매일 셀원을 기도로 품겠습니다.",
    "말과 행동으로 본이 되는 삶을 살겠습니다.",
    "주님과 깊은 교제를 놓치지 않겠습니다.",
    "어려움 속에서도 인내하며 사랑하겠습니다.",
    "교회의 질서에 순종하며 하나됨을 지키겠습니다."
];

export const MANUAL_STEPS = [
    {
        step: "1단계",
        title: "Welcome (마음열기)",
        time: "10%",
        guide: [
            "새가족을 환영합니다!",
            "서로의 안부를 묻고 위로/격려해주세요.",
            "교회 소식을 함께 나눕니다."
        ],
        warning: null
    },
    {
        step: "2단계",
        title: "Praise (찬양)",
        time: "10%",
        guide: [
            "마음을 모아 찬양합니다.",
            "리더가 미리 선곡한 찬양을 공유하세요."
        ],
        warning: "찬양에 집중할 수 있는 분위기를 만들어주세요."
    },
    {
        step: "3단계",
        title: "Sharing (나눔)",
        time: "70%",
        guide: [
            "이번 주 말씀을 되새깁니다.",
            "리더가 먼저 삶을 오픈하여 나눔을 이끌어주세요.",
            "셀가이드 질문을 적극 활용하세요."
        ],
        warning: "한 사람이 대화를 독점하지 않도록 주의하세요."
    },
    {
        step: "4단계",
        title: "Prayer (기도)",
        time: "10%",
        guide: [
            "말씀에 따른 결단을 나눕니다.",
            "기도제목을 나누고 서로를 위해 기도합니다."
        ],
        warning: "기도제목이 외부로 유출되지 않도록 주의하세요."
    }
];

export const FUNERAL_GUIDE = {
    title: "장례 사역 가이드",
    contactFlow: [
        { step: 1, who: "유족", action: "최초 연락 수신" },
        { step: 2, who: "셀장", action: "공동체 담당 교역자에게 전달" },
        { step: 3, who: "교회", action: "장례 주관 여부 및 일정 조율" }
    ],
    checklist: [
        "빈소 위치 (장례식장 호실)",
        "고인 정보 (성함, 나이, 병명 등)",
        "유족의 신앙 여부 확인",
        "교회 주관 장례 예배 요청 여부"
    ]
};

export const QUICK_LINKS = [
    { id: 'contact', title: '경조사 연락망', icon: '📞', action: 'funeral' },
    { id: 'list', title: '공동체 명단', icon: '📋', action: 'alert' },
    { id: 'guide', title: '금주 셀가이드', icon: '📖', action: 'alert' }
];

export const MEETING_MANUAL = [
    {
        step: 1,
        title: "Welcome (마음열기)",
        timeMin: 10,
        guide: "새가족 환영, 위로/애도, 격려/응원, 교회 소식 안내",
        warning: "너무 길어지지 않게 주의하세요. 가벼운 안부 위주로!"
    },
    {
        step: 2,
        title: "Praise (찬양)",
        timeMin: 10,
        guide: "말씀 나눔 전 마음 모으기, 찬양 미리 공유 권장",
        warning: "모두가 아는 곡으로 선정하세요."
    },
    {
        step: 3,
        title: "Sharing (나눔)",
        timeMin: 70,
        guide: "셀가이드 질문으로 말씀 및 삶 나누기 (리더가 먼저 오픈)",
        warning: "한 사람이 시간을 독점하지 않도록 조율이 필요합니다."
    },
    {
        step: 4,
        title: "Prayer (기도)",
        timeMin: 10,
        guide: "말씀에 따른 결단, 셀원별 기도제목 1/n 나눔 및 기도",
        warning: "구체적인 기도제목을 나누도록 유도하세요."
    }
];

export const SOLUTIONS = [
    {
        id: 'talkative',
        keyword: '말이 너무 많은 셀원',
        content: [
            "셀의 기본 방침(시간 제한 등)을 정해서 공지하세요.",
            "모임 밖에서 따로 1:1 면담 시간을 가지세요.",
            "중간에 정중하게 끊고 다른 분에게 발언권을 넘기세요."
        ]
    },
    {
        id: 'dominant',
        keyword: '대답을 독점하는 셀원',
        content: [
            "\"다른 분의 의견도 들어볼까요?\"라고 직접적으로 권유하세요.",
            "논쟁으로 이어지지 않도록 주의하세요.",
            "그 분의 열정은 인정해주되, 배려를 요청하세요."
        ]
    },
    {
        id: 'superficial',
        keyword: '나눔이 피상적인 경우',
        content: [
            "셀장이 먼저 자신의 연약함을 오픈하여 본을 보이세요.",
            "단답형 질문보다 감정을 묻는 질문(\"그때 마음이 어떠셨나요?\")을 던지세요.",
            "기다려주는 인내가 필요합니다."
        ]
    }
];

