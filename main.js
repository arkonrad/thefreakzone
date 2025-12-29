document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.lock-box');
    const unlockBtn = document.getElementById('unlock-btn');
    const secretMsg = document.getElementById('secret-message');
    const correctCode = ['s', 'u', 'c', 'k', 'l', 'e']; // <-- Change this to your desired code

    unlockBtn.addEventListener('click', function() {
        const inputCode = Array.from(boxes).map(box => box.value.toLowerCase());
        if (inputCode.join('') === correctCode.join('')) {
            secretMsg.style.display = 'block';
        } else {
            secretMsg.style.display = 'none';
            alert('Incorrect code! Try again.');
        }
    });

    boxes.forEach((box, idx) => {
        box.addEventListener('input', function() {
            if (box.value.length === 1 && idx < boxes.length - 1) {
                boxes[idx + 1].focus();
            }
        });
        // Add this for Enter key support
        box.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                unlockBtn.click();
            }
        });
    });
});

if (gimbleActivated && unlockBtn.classList.contains('glitch-button')) {
    unlockBtn.disabled = true;
    unlockBtn.style.opacity = '0.4';
    showGimbleTextbox();
    unlockBtn.classList.add('pressed'); // Add this line
    return;
}

unlockBtn.classList.add('morphing-gimble');

// Final reveal box
function showGimbleTextbox() {
    if (document.getElementById('gimble-textbox')) return;
    
    const container = document.createElement('div');
    container.id = 'gimble-textbox';
    
    // Darken the button
    unlockBtn.classList.add('pressed');
    
    container.innerHTML = `
        <img src="https://i.imgur.com/7ZfTaU6.jpg" alt="Reward">
        <div style="font-family:monospace; line-height:1.5; margin-top:1rem; color: #00ff41 !important;">
            YOU FINALLY DID IT! I promise this is it. I'm so proud of you for getting all the way through this! Here's a reward for all your hard work! I hope you enjoy! :)<br><br>
            <a href="https://www.amazon.com/gc/reveal?encryptedClaimCode=XBCZU37RQJ8698&ref_=pe_120844090_1025281880_HI0101IMG" 
               target="_blank" style="color: #00ffff !important; text-decoration: underline;">
                🎁 Click here to claim your reward! 🎁
            </a>
        </div>`;
    
    document.body.appendChild(container);
    container.classList.add('glitch-in');
    
    // Create confetti
    createConfetti();
}

// Add this new function for creating confetti:
function createConfetti() {
    const colors = ['#00ff41', '#00ff00', '#00ffff', '#ffffff', '#ffff00'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '4002';
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        confettiContainer.appendChild(confetti);
        
        // Start at top of screen (0% position)
        confetti.style.top = '0px';
        
        // Animate
        setTimeout(() => {
            confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.opacity = '1';
        }, 10);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}
