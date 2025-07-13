document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------
    // Typewriter Effect
    // -----------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const phrases = [
        "Tec. Sup. GRH 🚀 ✅",
        "Lic. RRHH (Cursando) ⏳ 📚",
        "Programador Autodidacta 💻"
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds per character

    function typeWriter() {
        const currentPhrase = phrases[currentPhraseIndex];
        let displayText = "";

        if (isDeleting) {
            displayText = currentPhrase.substring(0, currentCharIndex - 1);
            typingSpeed = 50; // Faster deletion
        } else {
            displayText = currentPhrase.substring(0, currentCharIndex + 1);
            typingSpeed = 100; // Normal typing speed
        }

        typewriterElement.textContent = displayText;

        if (!isDeleting && currentCharIndex < currentPhrase.length) {
            currentCharIndex++;
        } else if (isDeleting && currentCharIndex > 0) {
            currentCharIndex--;
        } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of phrase
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new phrase
        }

        setTimeout(typeWriter, typingSpeed);
    }

    typeWriter();

    // -----------------------------------------------------------
    // Scroll to Content
    // -----------------------------------------------------------
    window.scrollToContent = () => {
        document.getElementById('main-content').scrollIntoView({
            behavior: 'smooth'
        });
    };

    // -----------------------------------------------------------
    // Navigation Bar Active State
    // -----------------------------------------------------------
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.cv-section'); // Changed selector to target general CV sections

    const updateActiveNav = () => {
        let currentActiveSection = 'perfil'; 
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Check if section top is within top half of the viewport or bottom is within bottom half
            if (rect.top <= (window.innerHeight / 2) && rect.bottom >= (window.innerHeight / 2)) {
                currentActiveSection = section.id;
            }
        });

        navButtons.forEach(button => {
            if (button.dataset.target === currentActiveSection) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    };

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            // Immediately update active state on click
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    window.addEventListener('scroll', updateActiveNav);
    // Initial call to set active section on load
    updateActiveNav();

    // -----------------------------------------------------------
    // Dark Mode Toggle
    // -----------------------------------------------------------
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference or system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        body.classList.add('dark');
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
        // Re-create Lucide icons to update their color based on theme
        lucide.createIcons();
    });

    // -----------------------------------------------------------
    // Lucide Icons
    // -----------------------------------------------------------
    // Create icons on initial load and after theme change
    lucide.createIcons();

    // -----------------------------------------------------------
    // Calculate Age
    // -----------------------------------------------------------
    function calculateAge(birthDateString) {
        const birthDate = new Date(birthDateString); // Expected format: YYYY-MM-DD
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Set birth date
    const hectorBirthDate = "1990-11-30"; // Using YYYY-MM-DD for consistency with Date object
    const ageElement = document.getElementById("edad");
    if (ageElement) {
        ageElement.textContent = calculateAge(hectorBirthDate);
    }

    // -----------------------------------------------------------
    // Download PDF Functionality
    // -----------------------------------------------------------
    window.downloadPDF = () => {
        // We'll capture the entire content div or just the main sections
        const element = document.getElementById('main-content'); 
        const opt = {
            margin: [10, 10, 10, 10], // Margins for the PDF (top, left, bottom, right)
            filename: 'CV-Hector-Daniel-Ayarachi-Fuentes.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, // Higher scale for better image quality in PDF
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Use html2pdf to generate and save the PDF
        html2pdf().set(opt).from(element).save();
    };

});
