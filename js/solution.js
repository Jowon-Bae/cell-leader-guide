import { SOLUTIONS } from './data.js';

export function renderSolution(container) {
    const wrapper = document.createElement('div');
    wrapper.className = 'fade-in';

    const header = document.createElement('h2');
    header.innerText = "고민 해결 사전";
    header.style.marginBottom = "20px";
    header.style.color = "var(--primary-dark)";
    wrapper.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'action-grid'; // Reuse grid style
    grid.style.gridTemplateColumns = '1fr'; // Single column for longer text

    SOLUTIONS.forEach(sol => {
        const btn = document.createElement('div');
        btn.className = 'action-card';
        btn.style.flexDirection = 'row';
        btn.style.justifyContent = 'flex-start';
        btn.style.textAlign = 'left';

        btn.innerHTML = `
            <span style="font-size: 1.5rem; margin-right: 15px;">💡</span>
            <span style="font-size: 1.1rem;">${sol.keyword}</span>
        `;
        btn.onclick = () => showSolutionModal(sol);
        grid.appendChild(btn);
    });

    wrapper.appendChild(grid);
    container.appendChild(wrapper);
}

function showSolutionModal(solutionData) {
    const modalContainer = document.getElementById('modal-container');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay open';

    modalOverlay.innerHTML = `
        <div class="modal-content">
            <button class="close-btn">&times;</button>
            <h2 style="margin-bottom: 16px; color: var(--primary-color);">${solutionData.keyword}</h2>
            
            <h3 style="font-size: 1rem; margin-bottom: 12px; color: var(--text-sub);">📌 이렇게 해보세요</h3>
            <ul style="padding-left: 20px; line-height: 1.6;">
                ${solutionData.content.map(item => `<li style="margin-bottom: 8px;">${item}</li>`).join('')}
            </ul>

             <button class="btn btn-primary" style="margin-top: 24px; width: 100%" onclick="this.closest('.modal-overlay').remove()">확인</button>
        </div>
    `;

    const closeBtn = modalOverlay.querySelector('.close-btn');
    closeBtn.onclick = () => modalOverlay.remove();
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) modalOverlay.remove();
    };

    modalContainer.appendChild(modalOverlay);
}
