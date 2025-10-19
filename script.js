document.addEventListener('DOMContentLoaded', () => {

function createStars() {
    const container = document.getElementById('starsContainer');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        container.appendChild(star);
    }
}
createStars();

// State management
let clickCount = 0;
let currentState = 0; // 0: heart, 1: envelope, 2: short letter, 3: full letter
let letterState = 0; // 0: envelope, 1: short, 2: full
const maxClicks = 20;
const heartButton = document.getElementById('heartButton');
const heartWrapper = document.getElementById('heartWrapper');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const letterWrapper = document.getElementById('letterWrapper');
const letterFullWrapper = document.getElementById('letterFullWrapper');
const fillProgress = document.getElementById('fillProgress');
const fillText = document.getElementById('fillText');
const letter = document.getElementById('letter');
const letterFull = document.getElementById('letterFull');
const envelope = document.getElementById('envelope');

const gifts = ['💙', '🧸', '💝', '🌸', '🎀', '🍬', '💎', '🌷', '⭐', '✨'];
let giftIndex = 0;
let isAnimating = false;
let canClick = true;

heartButton.addEventListener('click', function() {
    if (isAnimating || !canClick) return;
    if (clickCount >= maxClicks) return; 
    canClick = false; 
    isAnimating = true;

    // Hiệu ứng click (0.4s)
    heartButton.classList.add('clicked');
    setTimeout(() => {
        heartButton.classList.remove('clicked');
        isAnimating = false; // Cho phép click lại sau khi xong animation
        canClick = true;
    }, 400);

    clickCount++;
    const percentage = (clickCount / 20) * 100;
    fillProgress.style.width = Math.min(percentage, 100) + '%';
    fillText.textContent = `${Math.round(percentage)}% 💕`;

    createConfetti();

    if (clickCount >= maxClicks && !heartWrapper.classList.contains('hidden')) {
        triggerNextScene();
      }
    });
  
    function triggerNextScene() {
      const curtain = document.getElementById('curtain');
      curtain.classList.add('open');
  
      // Chặn mọi click khi đang mở curtain
      isAnimating = true;
  
      // 🔹 Hiệu ứng fade nền hoặc chuyển sang animation khác
      document.body.classList.add('fade-out');
      setTimeout(() => {
        heartWrapper.classList.add('hidden');
        document.body.classList.remove('fade-out');
        envelopeWrapper.classList.add('show');
        envelope.classList.add('appear');
        currentState = 1;
        letterState = 0;
        isAnimating = false;
      }, 2000);
    }

// Envelope click handler
envelope.addEventListener('click', function() {
    if (letterState === 0) {
        // Add opened class to envelope
        envelope.classList.add('opened');
        
        setTimeout(() => {
            envelopeWrapper.classList.remove('show');
            letterWrapper.classList.add('show');
            letterState = 1;
        }, 300);
    }
});

// Letter click handler
letterWrapper.addEventListener('click', function(e) {
    if (e.target.closest('.click-hint')) return;

    if (letterState === 1) {
        // Switch to full letter
        letterWrapper.classList.remove('show');
        letterFullWrapper.classList.add('show');
        letterState = 2;
    }
});

// Full letter click handler
letterFullWrapper.addEventListener('click', function(e) {
    if (e.target.closest('.click-hint')) return;

    if (letterState === 2) {
        // Close letter and show envelope again with closing animation
        letterFullWrapper.classList.remove('show');
        envelopeWrapper.classList.add('show');
        envelopeWrapper.classList.add('envelope-closing');
        letterState = 0;
        // Add closing animation to envelope
        envelope.classList.add('closing');
        setTimeout(() => {
            envelope.classList.remove('opened');
            envelope.classList.remove('closing');
            envelopeWrapper.classList.remove('envelope-closing');
        }, 800);
    }
});


// Confetti effect
function createConfetti() {
    for (let i = 0; i < 5; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = gifts[Math.floor(Math.random() * gifts.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.fontSize = (20 + Math.random() * 30) + 'px';
        confetti.style.animation = `confetti-fall ${2 + Math.random() * 1}s ease-in forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

heartButton.classList.add('clicked');
setTimeout(() => heartButton.classList.remove('clicked'), 400);

// Gift cursor effect
document.addEventListener('pointermove', function(e) {
    if (Math.random() < 0.15) {
        const gift = document.createElement('div');
        gift.className = 'gift-cursor';
        gift.textContent = gifts[giftIndex % gifts.length];
        giftIndex++;
        gift.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
        gift.style.top = (e.clientY - 20) + 'px';
        document.body.appendChild(gift);
        setTimeout(() => gift.remove(), 1000);
    }
});
// const heart = document.querySelector(".heart");
// let canClick = true;

// heart.addEventListener("click", () => {
//   if (!canClick) return; // nếu đang cooldown thì bỏ qua
//   canClick = false;

//   heart.classList.add("active"); // thêm class hiệu ứng

//   setTimeout(() => {
//     heart.classList.remove("active"); // bỏ hiệu ứng sau 0.5s (tùy bạn)
//   }, 500);

//   // cooldown 1s để tránh spam
//   setTimeout(() => {
//     canClick = true;
//   }, 1000);
// });

});