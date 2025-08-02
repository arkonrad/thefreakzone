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