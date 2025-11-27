document.addEventListener('DOMContentLoaded', function() {
    // Update year automatically
    document.getElementById("year").textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Animate skill progress bars when they become visible
    function animateSkills() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        skillProgresses.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width + '%';
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            
            if (validateForm()) {
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value,
                    timestamp: new Date().toISOString()
                };
                
                localStorage.setItem('contactFormData', JSON.stringify(formData));
                window.location.href = 'form-details.html';
            }
        });
    }

    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name').value.trim();
        if (name === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }
        
        // Subject validation
        const subject = document.getElementById('subject').value.trim();
        if (subject === '') {
            showError('subjectError', 'Subject is required');
            isValid = false;
        }
        
        // Message validation
        const message = document.getElementById('message').value.trim();
        if (message === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }

    function showError(elementId, message) {
        document.getElementById(elementId).textContent = message;
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    // Project redirection using JavaScript (no anchor tags)
    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });

    // Interactive Canvas
    const canvas = document.getElementById('myCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Draw initial design
        drawCanvas();
        
        // Make canvas interactive
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCanvas();
            
            // Draw interactive element
            ctx.fillStyle = 'rgba(108, 99, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
        });
        
        function drawCanvas() {
            // Background
            ctx.fillStyle = '#1e1e1e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw some elements
            ctx.fillStyle = '#6c63ff';
            ctx.font = '20px Poppins';
            ctx.fillText('Interactive Canvas', 20, 40);
            
            ctx.fillStyle = '#ff6584';
            ctx.beginPath();
            ctx.arc(100, 120, 30, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#5752d4';
            ctx.fillRect(200, 100, 60, 60);
        }
    }

    // Image Slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next/previous controls
    document.querySelector('.next-btn')?.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    document.querySelector('.prev-btn')?.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    // Dot controls
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            showSlide(parseInt(this.getAttribute('data-slide')));
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Dark/Light Mode Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Back-to-Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skills when skills section is visible
                if (entry.target.id === 'about') {
                    animateSkills();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .contact-item, .skill-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Also observe the about section for skills animation
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
});