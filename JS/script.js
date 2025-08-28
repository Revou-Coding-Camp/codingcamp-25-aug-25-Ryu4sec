
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toUTCString();
    document.getElementById('currentTime').textContent = timeString;
}

updateCurrentTime();

setInterval(updateCurrentTime, 1000);

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nama = document.getElementById('nama').value;
    const tanggalLahir = document.getElementById('tanggalLahir').value;
    const gender = document.getElementById('gender').value;
    const pesan = document.getElementById('pesan').value;
    
    if (!nama || !tanggalLahir || !gender || !pesan) {
        alert('Mohon lengkapi semua field!');
        return;
    }
    
    const birthDate = new Date(tanggalLahir);
    const formattedDate = birthDate.toLocaleDateString('id-ID');
    
    document.getElementById('displayName').textContent = nama;
    document.getElementById('displayGender').textContent = gender;
    document.getElementById('displayBirthDate').textContent = formattedDate;
    document.getElementById('displayMessage').textContent = pesan;
    
    alert('Data berhasil disubmit!');
    
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value) {
            this.style.borderColor = '#ff6b6b';
        } else {
            this.style.borderColor = '#ccc';
        }
    });
    
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(255, 107, 107)') {
            this.style.borderColor = '#ccc';
        }
    });
});

const form = document.getElementById('contactForm');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function() {
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
});