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
    let letterState = 0;  // 0: envelope, 1: short, 2: full
    const maxClicks = 20; // 🔹 Giới hạn 20 lần click
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
  
    const gifts = ['💙','🎁', '🧸', '💝', '🌸', '🎀', '🍬', '🐻', '🌷', '⭐', '✨'];
    let giftIndex = 0;
    let isAnimating = false;
    let canClick = true; // 🔹 chặn click khi đang cooldown

    let lastGiftTime = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastGiftTime < 250) return; // 250ms = 0.25s, có thể chỉnh
  lastGiftTime = now;

  const icons = ['💙','🎁', '🧸', '💝', '🌸', '🎀', '🍬', '🐻', '🌷', '⭐', '✨'];
  const gift = document.createElement("div");
  gift.className = "gift-cursor";
  gift.textContent = icons[Math.floor(Math.random() * icons.length)];
  gift.style.left = e.pageX + "px";
  gift.style.top = e.pageY + "px";
  document.body.appendChild(gift);

  setTimeout(() => gift.remove(), 1000);
});

  
    heartButton.addEventListener('click', function() {
      if (isAnimating || !canClick) return; // Nếu đang chạy animation hoặc đang cooldown thì bỏ qua
  
      if (clickCount >= maxClicks) return; // 🔹 Nếu quá 20 lần thì dừng không nhận thêm click
  
      canClick = false; // Bắt đầu cooldown
      isAnimating = true;
  
      // Hiệu ứng click (0.4s)
      heartButton.classList.add('clicked');
      setTimeout(() => {
        heartButton.classList.remove('clicked');
        isAnimating = false;
        canClick = true; // Cho phép click lại sau khi xong animation
      }, 400);
  
      clickCount++;
      const percentage = (clickCount / maxClicks) * 100;
      fillProgress.style.width = Math.min(percentage, 100) + '%';
      fillText.textContent = `Bấm Để Nạp: ${Math.round(percentage)}% 💕`;
      if(clickCount >= maxClicks){
        fillText.textContent = 'Đã Đầy! Mở Thư Tình 💌';
      }
      createConfetti();
  
      // 🔹 Khi đủ 20 click thì chuyển sang animation tiếp theo
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
        letterWrapper.classList.remove('show');
        letterFullWrapper.classList.add('show');
        letterState = 2;
      }
    });
  
    // Full letter click handler
    letterFullWrapper.addEventListener('click', function(e) {
      if (e.target.closest('.click-hint')) return;
      if (letterState === 2) {
        letterFullWrapper.classList.remove('show');
        envelopeWrapper.classList.add('show');
        envelopeWrapper.classList.add('envelope-closing');
        letterState = 0;
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
  
    // Hiệu ứng khi mới load
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
    const correctPassword = "281204"; // mật khẩu ddmmyy

    const overlay = document.getElementById("passwordOverlay");
    const btn = document.getElementById("passwordBtn");
    const errorMsg = document.getElementById("passwordError");
    const audio = document.getElementById("successAudio");
    const inputs = document.querySelectorAll(".otp-inputs .otp");
    
    // Tự động chuyển focus khi nhập
    inputs.forEach((input, idx) => {
        input.addEventListener("input", () => {
            if(input.value.length === 1 && idx < inputs.length - 1) {
                inputs[idx + 1].focus();
            }
        });
    
        input.addEventListener("keydown", (e) => {
            if(e.key === "Backspace" && input.value === "" && idx > 0) {
                inputs[idx - 1].focus();
            }
        });
    });
    
    // Kiểm tra mật khẩu
    btn.addEventListener("click", checkPassword);
    inputs.forEach(i => i.addEventListener("keypress", (e) => {
        if(e.key === "Enter") checkPassword();
    }));
    
    function checkPassword() {
        let entered = Array.from(inputs).map(i => i.value).join('');
        if(entered === correctPassword) {
            audio.play();
            overlay.style.display = "none";
        } else {
            errorMsg.textContent = "Mật khẩu không đúng, thử lại!";
            inputs.forEach(i => i.value = "");
            inputs[0].focus();
        }
    }
    
  });
  