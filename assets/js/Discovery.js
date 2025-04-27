const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-btn');
const openBtn = document.querySelector('.open-btn');
const toggleButton = document.querySelector('.toggle-restaurant');
const restaurantWrapper = document.querySelector('.restaurant-wrapper');
const chatbotIcon = document.getElementById('chatbot-icon');

let isDragging = false;
let offsetX = 0, offsetY = 0;
let targetX = 0, targetY = 0;
let isSnapping = false;
let snapX = 0, snapY = 0;

chatbotIcon.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = chatbotIcon.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    targetX = rect.left;
    targetY = rect.top;
    
    isSnapping = false;
    chatbotIcon.classList.add('dragging');
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    chatbotIcon.classList.remove('dragging');

    const rect = chatbotIcon.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const distances = {
        top: rect.top,
        bottom: windowHeight - rect.bottom,
        left: rect.left,
        right: windowWidth - rect.right
    };

    const closest = Object.keys(distances).reduce((a, b) => distances[a] < distances[b] ? a : b);

    if (closest === 'top') {
        snapX = rect.left;
        snapY = 20;
    } else if (closest === 'bottom') {
        snapX = rect.left;
        snapY = windowHeight - chatbotIcon.offsetHeight - 20;
    } else if (closest === 'left') {
        snapX = 20;
        snapY = rect.top;
    } else if (closest === 'right') {
        snapX = windowWidth - chatbotIcon.offsetWidth - 20;
        snapY = rect.top;
    }

    isSnapping = true;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    targetX = e.clientX - offsetX;
    targetY = e.clientY - offsetY;
});

function smoothMove() {
    if (isDragging) {
        chatbotIcon.style.left = `${targetX}px`;
        chatbotIcon.style.top = `${targetY}px`;
        chatbotIcon.style.right = 'auto';
        chatbotIcon.style.bottom = 'auto';
    } else if (isSnapping) {
        // 스냅 이동 중일 때 부드럽게
        targetX += (snapX - targetX) * 0.2;
        targetY += (snapY - targetY) * 0.2;

        chatbotIcon.style.left = `${targetX}px`;
        chatbotIcon.style.top = `${targetY}px`;
        chatbotIcon.style.right = 'auto';
        chatbotIcon.style.bottom = 'auto';

        if (Math.abs(snapX - targetX) < 1 && Math.abs(snapY - targetY) < 1) {
            targetX = snapX;
            targetY = snapY;
            isSnapping = false;
        }
    }

    requestAnimationFrame(smoothMove);
}

smoothMove();

// 음식점 토글 버튼
toggleButton.addEventListener('click', () => {
    restaurantWrapper.classList.toggle('closed');
    toggleButton.innerHTML = restaurantWrapper.classList.contains('closed') ? '&gt;' : '&lt;';
});

// 사이드바 열고 닫기
closeBtn.addEventListener('click', () => {
    sidebar.classList.add('hidden');
});
openBtn.addEventListener('click', () => {
    sidebar.classList.remove('hidden');
});
