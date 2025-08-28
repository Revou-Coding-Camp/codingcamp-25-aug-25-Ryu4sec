// Global variables
let userName = '';

// Check if user name is stored
window.addEventListener('DOMContentLoaded', function() {
    const storedName = localStorage.getItem('portfolioUserName');
    if (storedName) {
        userName = storedName;
        hideModal();
        initializeApp();
    } else {
        showModal();
    }
});

// Modal functions
function showModal() {
    document.getElementById('nameModal').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'none';
}

function hideModal() {
    document.getElementById('nameModal').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

// Name input handling
document.getElementById('nameInput').addEventListener('input', function() {
    const submitBtn = document.getElementById('nameSubmitBtn');
    submitBtn.disabled = this.value.trim() === '';
});

document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (name) {
        userName = name;
        localStorage.setItem('portfolioUserName', name);
        hideModal();
        initializeApp();
        showToast(`Selamat datang, ${name}!`, 'success');
    }
});

// Initialize app after name is set
function initializeApp() {
    updateWelcomeMessage();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    setupNavigation();
    setupHeadquarters();
    setupContactForm();
    updateGreetingTime();
}

// Greeting and time functions
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
}

function updateWelcomeMessage() {
    const welcomeElement = document.getElementById('welcomeMessage');
    welcomeElement.textContent = `${getGreeting()}, ${userName}! Selamat Datang 🎉`;
}

function updateGreetingTime() {
    const greetingTimeElement = document.getElementById('greetingTime');
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');
    greetingTimeElement.textContent = `${timeString}`;
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toUTCString();
    document.getElementById('currentTime').textContent = timeString;
    updateGreetingTime();
}

// Navigation setup
function setupNavigation() {
    document.querySelectorAll('nav a[data-section]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Headquarters interaction
function setupHeadquarters() {
    const circles = document.querySelectorAll('.hq-item .circle');
    const hqInfo = document.getElementById('hqInfo');
    const hqInfoText = document.getElementById('hqInfoText');
    
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            // Remove selected class from all circles
            circles.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked circle
            this.classList.add('selected');
            
            // Show info
            const hqName = this.getAttribute('data-hq');
            const hqInfoContent = this.getAttribute('data-info');
            
            hqInfoText.textContent = `${hqName}: ${hqInfoContent}`;
            hqInfo.style.display = 'block';
            
            showToast(`Informasi ${hqName}`, 'success');
        });
    });
}

// Contact form setup
function setupContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nama = document.getElementById('nama').value;
        const tanggalLahir = document.getElementById('tanggalLahir').value;
        const gender = document.getElementById('gender').value;
        const pesan = document.getElementById('pesan').value;
        
        if (!nama || !tanggalLahir || !gender || !pesan) {
            showToast('Mohon lengkapi semua field!', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            const birthDate = new Date(tanggalLahir);
            const formattedDate = birthDate.toLocaleDateString('id-ID');
            
            document.getElementById('displayName').textContent = nama;
            document.getElementById('displayGender').textContent = gender;
            document.getElementById('displayBirthDate').textContent = formattedDate;
            document.getElementById('displayMessage').textContent = pesan;
            
            showToast(`Data berhasil disubmit! Terima kasih ${nama}!`, 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1000);
    });
    
    // Form validation styling
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
}

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Reset function (for testing)
function resetApp() {
    localStorage.removeItem('portfolioUserName');
    location.reload();
}

function validateForm() {
    const nameInput = document.getElementById('nameInput');
    const submitBtn = document.getElementById('nameSubmitBtn');
    
    if (nameInput.value.trim() === '') {
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
}

// Add reset button functionality (optional)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        if (confirm('Reset aplikasi dan hapus nama yang tersimpan?')) {
            resetApp();
        }
    }
});