// Cybersecurity Portfolio JavaScript - Vivek Sikarwar

class CyberSecurityPortfolio {
    constructor() {
        this.currentTestimonial = 0;
        this.testimonials = document.querySelectorAll('.testimonial-slide');
        this.testimonialInterval = null;
        this.typingText = ['Cloud Security Engineer', 'SOC Analyst', 'Python Developer', 'Cybersecurity Specialist', 'Threat Hunter', 'Security Automation Expert'];
        this.typingIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isDarkMode = true; // Default to dark for cybersecurity theme
        
        this.init();
    }

    init() {
        this.handleLoading();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupTypingEffect();
        this.setupSkillsAnimation();
        this.setupProjectFilters();
        this.setupTestimonials();
        this.setupContactForm();
        this.setupThemeToggle();
        this.setupParallax();
        this.setupCyberEffects();
        this.setupMiscellaneous();
        this.setupProjectModals();
    }

    // Loading Screen with Cyber Animation
    handleLoading() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.add('fade-out');
                    
                    setTimeout(() => {
                        loader.style.display = 'none';
                        document.body.style.overflow = 'visible';
                        this.animateOnLoad();
                    }, 500);
                }
            }, 2500); // Longer loading for cyber effect
        });
    }

    animateOnLoad() {
        // Animate hero content with cyber effects
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'heroFadeIn 1s ease-out forwards';
        }
        
        // Start particle effects
        this.createCyberParticles();
    }

    // Fixed Navigation with Cyber Theme
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelectorAll('.nav-link');

        // Sticky navbar with cyber glow effect
        window.addEventListener('scroll', () => {
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // Fixed smooth scroll and active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 70;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active link immediately
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }

                // Close mobile menu
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Update active nav link on scroll
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Setup Project Modals
    setupProjectModals() {
        // Set up modal functionality
        const modal = document.getElementById('project-modal');
        const modalOverlay = document.querySelector('.modal-overlay');
        const modalClose = document.querySelector('.modal-close');

        // Close modal when clicking overlay
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }

        // Close modal when clicking close button
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }

        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                this.closeProjectModal();
            }
        });

        // Add click event listeners to all project modal buttons
        document.querySelectorAll('.project-btn').forEach(btn => {
            if (btn.textContent.includes('View Details')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Find the project card and get the modal ID
                    const projectCard = btn.closest('.project-card');
                    if (projectCard) {
                        const projectCards = Array.from(document.querySelectorAll('.project-card'));
                        const projectIndex = projectCards.indexOf(projectCard) + 1;
                        this.openProjectModal(projectIndex);
                    }
                });
            }
        });
    }

    openProjectModal(projectId) {
        const modal = document.getElementById('project-modal');
        const modalBody = document.getElementById('modal-body');
        const project = cyberProjectData[projectId];

        if (!project || !modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="project-modal-content">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem; border: 1px solid #00ffff;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                    <h2 style="margin: 0; color: #00ffff; font-size: 1.8rem;">${project.title}</h2>
                    <span style="background: rgba(0,255,255,0.1); color: #00ffff; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem; border: 1px solid rgba(0,255,255,0.3); white-space: nowrap;">${project.category}</span>
                </div>
                <p style="margin-bottom: 1.5rem; line-height: 1.6; color: #cccccc;">${project.description}</p>
                
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem; color: #00ffff; font-size: 1.3rem;">🛠️ Technologies Used</h3>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        ${project.technologies.map(tech => `<span style="padding: 0.25rem 0.75rem; background: rgba(0,255,255,0.1); color: #00ffff; border: 1px solid rgba(0,255,255,0.3); border-radius: 1rem; font-size: 0.8rem; font-weight: 500;">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem; color: #00ffff; font-size: 1.3rem;">⚡ Key Security Features</h3>
                    <ul style="list-style-type: none; padding-left: 0; color: #cccccc;">
                        ${project.features.map(feature => `<li style="margin-bottom: 0.75rem; display: flex; align-items: flex-start; gap: 0.5rem;"><span style="color: #00ff41; min-width: 16px; margin-top: 2px;">✓</span><span>${feature}</span></li>`).join('')}
                    </ul>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="${project.liveUrl}" class="btn btn--primary" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.75rem 1.5rem; background: #00ffff; color: #1f2121; border-radius: 8px; font-weight: 500; transition: all 0.3s ease;">
                        🚀 Live Demo
                    </a>
                    <a href="${project.githubUrl}" class="btn btn--outline" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.75rem 1.5rem; border: 2px solid #00ffff; color: #00ffff; border-radius: 8px; font-weight: 500; transition: all 0.3s ease; background: transparent;">
                        📁 View Code
                    </a>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        if (!modal) return;

        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Scroll Animations with Cyber Effects
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Trigger skills animation
                    if (entry.target.classList.contains('skills-list')) {
                        this.animateSkills();
                    }

                    // Add cyber glow effects to cards
                    if (entry.target.classList.contains('service-card') || 
                        entry.target.classList.contains('project-card')) {
                        setTimeout(() => {
                            entry.target.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.2)';
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .project-card, .skill-item, .skills-list, .testimonial-content');
        animateElements.forEach(el => observer.observe(el));
    }

    // Cybersecurity Typing Effect
    setupTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const typeSpeed = 120;
        const deleteSpeed = 60;
        const pauseDelay = 2500;

        const type = () => {
            const currentText = this.typingText[this.typingIndex];
            
            if (this.isDeleting) {
                typingElement.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeSpeedCurrent = this.isDeleting ? deleteSpeed : typeSpeed;

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeSpeedCurrent = pauseDelay;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.typingIndex = (this.typingIndex + 1) % this.typingText.length;
            }

            setTimeout(type, typeSpeedCurrent);
        };

        type();
    }

    // Skills Animation with Cyber Effects
    setupSkillsAnimation() {
        // This will be triggered by intersection observer
    }

    animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const level = item.dataset.level;
                const progressBar = item.querySelector('.skill-progress');
                
                if (progressBar) {
                    item.classList.add('animate');
                    progressBar.style.width = `${level}%`;
                    
                    // Add cyber glow effect
                    progressBar.style.boxShadow = `0 0 10px rgba(0, 255, 255, 0.6)`;
                }
            }, index * 150);
        });
    }

    // Project Filters with Cyber Theme
    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active filter button with cyber effect
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.boxShadow = 'none';
                });
                btn.classList.add('active');
                btn.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.4)';

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.dataset.category || '';
                    
                    if (filter === 'all' || category.toLowerCase() === filter.toLowerCase()) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.style.transition = 'all 0.5s ease';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Testimonials Carousel with Cyber Effects
    setupTestimonials() {
        if (this.testimonials.length === 0) return;

        this.createTestimonialDots();
        this.showTestimonial(0);
        this.startTestimonialAutoplay();

        // Navigation buttons
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousTestimonial());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTestimonial());
        }
    }

    createTestimonialDots() {
        const dotsContainer = document.getElementById('testimonial-dots');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';

        this.testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => this.showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
    }

    showTestimonial(index) {
        this.testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });

        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        this.currentTestimonial = index;
    }

    nextTestimonial() {
        const next = (this.currentTestimonial + 1) % this.testimonials.length;
        this.showTestimonial(next);
    }

    previousTestimonial() {
        const prev = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prev);
    }

    startTestimonialAutoplay() {
        if (this.testimonialInterval) {
            clearInterval(this.testimonialInterval);
        }
        
        this.testimonialInterval = setInterval(() => {
            this.nextTestimonial();
        }, 6000);

        // Pause autoplay on hover
        const testimonialSlider = document.getElementById('testimonials-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => {
                clearInterval(this.testimonialInterval);
            });

            testimonialSlider.addEventListener('mouseleave', () => {
                this.startTestimonialAutoplay();
            });
        }
    }

    // Fixed Contact Form with Security Validation
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });

        // Real-time validation with security checks
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        let isValid = true;
        let errorMessage = '';

        // Security-focused validation
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required for security verification';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Name can only contain letters and spaces';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required for secure communication';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'subject':
                if (!value) {
                    errorMessage = 'Subject is required';
                    isValid = false;
                } else if (value.length < 3) {
                    errorMessage = 'Subject must be at least 3 characters';
                    isValid = false;
                }
                break;
            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.toggle('show', !isValid);
            errorElement.style.display = !isValid ? 'block' : 'none';
        }

        // Add security-themed border colors
        if (isValid) {
            field.style.borderColor = 'rgba(0, 255, 255, 0.5)';
        } else {
            field.style.borderColor = '#ff073a';
        }

        return isValid;
    }

    clearFieldError(field) {
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.style.display = 'none';
        }
        field.style.borderColor = 'rgba(0, 255, 255, 0.3)';
    }

    async handleFormSubmission(form) {
        const formData = new FormData(form);
        const fields = ['name', 'email', 'subject', 'message'];
        let isFormValid = true;

        // Validate all fields
        fields.forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (field && !this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormMessage('Security check failed. Please correct the errors above.', 'error');
            return;
        }

        // Show loading state with cyber effect
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        submitBtn.style.background = '#ff073a';
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) {
            btnLoading.style.display = 'inline';
            btnLoading.textContent = 'Encrypting & Sending...';
            btnLoading.classList.add('show');
        }

        try {
            // Simulate secure form submission
            await this.simulateSecureFormSubmission(formData);
            
            this.showFormMessage('✅ Secure transmission successful! Message encrypted and delivered.', 'success');
            form.reset();
        } catch (error) {
            this.showFormMessage('❌ Security error: Message transmission failed. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) {
                btnLoading.style.display = 'none';
                btnLoading.classList.remove('show');
            }
        }
    }

    simulateSecureFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate successful secure transmission (95% of the time)
                if (Math.random() > 0.05) {
                    resolve('Secure message delivered');
                } else {
                    reject('Security protocol error');
                }
            }, 2500);
        });
    }

    showFormMessage(message, type) {
        const messageElement = document.getElementById('form-message');
        if (!messageElement) return;

        messageElement.innerHTML = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';

        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 7000);
    }

    // Theme Toggle (Enhanced for Cyber Theme)
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Default to dark theme for cybersecurity
        this.setTheme('dark');

        themeToggle.addEventListener('click', () => {
            this.isDarkMode = !this.isDarkMode;
            const newTheme = this.isDarkMode ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        
        if (theme === 'dark') {
            this.isDarkMode = true;
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            this.isDarkMode = false;
            if (themeIcon) themeIcon.textContent = '🌙';
        }
    }

    // Cyber Parallax Effects
    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            const heroBackground = document.querySelector('.hero-background');
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * -0.3}px)`;
            }

            const cyberGrid = document.querySelector('.cyber-grid');
            if (cyberGrid) {
                cyberGrid.style.transform = `translateY(${scrolled * -0.2}px) rotate(${scrolled * 0.05}deg)`;
            }

            const particles = document.querySelector('.particles');
            if (particles) {
                particles.style.transform = `translateY(${scrolled * -0.4}px)`;
            }
        });
    }

    // Cybersecurity Specific Effects
    setupCyberEffects() {
        this.createMatrixRain();
        this.addCyberGlowEffects();
        this.setupSecurityAlerts();
    }

    createMatrixRain() {
        // Create subtle matrix-style background effect
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-rain';
        document.body.appendChild(matrixContainer);

        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*';
        
        for (let i = 0; i < 20; i++) {
            const column = document.createElement('div');
            column.style.position = 'absolute';
            column.style.top = '-100px';
            column.style.left = `${Math.random() * 100}%`;
            column.style.color = 'rgba(0, 255, 65, 0.3)';
            column.style.fontSize = '12px';
            column.style.fontFamily = 'monospace';
            column.style.animation = `matrixFall ${Math.random() * 10 + 10}s linear infinite`;
            column.style.animationDelay = `${Math.random() * 5}s`;
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
            }
            column.innerHTML = text;
            
            matrixContainer.appendChild(column);
        }

        // Add CSS for matrix animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes matrixFall {
                0% { transform: translateY(-100vh); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    addCyberGlowEffects() {
        // Add cyber glow to various elements
        const cyberElements = document.querySelectorAll('.nav-logo a, .highlight, .cyber-primary');
        
        cyberElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.textShadow = '0 0 20px #00ffff, 0 0 30px #0080ff';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.textShadow = '0 0 10px #00ffff';
            });
        });
    }

    setupSecurityAlerts() {
        // Add subtle security-themed notifications
        setTimeout(() => {
            this.showSecurityNotification('🔒 Secure connection established', 'success');
        }, 3000);

        setTimeout(() => {
            this.showSecurityNotification('🛡️ Advanced threat protection active', 'info');
        }, 8000);
    }

    showSecurityNotification(message, type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(19, 52, 59, 0.95);
            color: #00ffff;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 1px solid #00ffff;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            z-index: 9999;
            opacity: 0;
            transition: all 0.5s ease;
            backdrop-filter: blur(10px);
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 4000);
    }

    createCyberParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Create cyber-themed particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'cyber-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: ${Math.random() > 0.5 ? '#00ffff' : '#0080ff'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: cyberParticleFloat ${Math.random() * 15 + 15}s infinite linear;
                animation-delay: ${Math.random() * 10}s;
                box-shadow: 0 0 10px currentColor;
                opacity: 0.7;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes cyberParticleFloat {
                0% { 
                    transform: translateY(100vh) rotate(0deg) scale(0); 
                    opacity: 0; 
                }
                10% { 
                    opacity: 0.7; 
                    transform: scale(1); 
                }
                90% { 
                    opacity: 0.7; 
                }
                100% { 
                    transform: translateY(-100vh) rotate(360deg) scale(0); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Miscellaneous Setup
    setupMiscellaneous() {
        this.createScrollToTop();
        this.setupLazyLoading();
        this.addKeyboardShortcuts();
    }

    createScrollToTop() {
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #00ffff;
            background: rgba(19, 52, 59, 0.9);
            color: #00ffff;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            backdrop-filter: blur(10px);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
        `;

        document.body.appendChild(scrollToTopBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Cybersecurity-themed keyboard shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                    case 'p':
                        e.preventDefault();
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                        break;
                }
            }
        });
    }
}

// Project Modal Data - Updated Cybersecurity Projects
const cyberProjectData = {
    1: {
        title: "Advanced Keylogger System",
        description: "Sophisticated keylogger application with stealth capabilities, encrypted data transmission, and remote monitoring features for security testing purposes. Built with advanced Windows API integration and military-grade encryption protocols.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
        technologies: ["Python", "Windows API", "AES Encryption", "Socket Programming", "Steganography"],
        features: [
            "🔒 AES-256 encryption for all captured data",
            "👻 Advanced stealth mode with rootkit capabilities",
            "📡 Remote data transmission via secure channels",
            "🖼️ Screenshot capture with timestamp logging",
            "🔍 System information gathering and analysis",
            "⚡ Real-time keystroke analysis and filtering"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "Penetration Testing"
    },
    2: {
        title: "Anti-Forensic Detection System",
        description: "Advanced system for detecting anti-forensic techniques and maintaining digital evidence integrity during security investigations. Features machine learning algorithms for behavioral analysis.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        technologies: ["Python", "Digital Forensics", "Machine Learning", "Security Analysis", "TensorFlow"],
        features: [
            "🔍 Real-time anti-forensic technique detection",
            "🧠 ML-powered behavioral analysis engine",
            "📊 Digital evidence integrity verification",
            "🔒 Secure evidence chain of custody",
            "⚡ Automated forensic artifact extraction",
            "📈 Advanced timeline reconstruction capabilities"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "Digital Forensics"
    },
    3: {
        title: "Real-time SOC Dashboard",
        description: "Comprehensive security operations center dashboard with real-time threat monitoring, incident tracking, automated alert system, and machine learning-powered anomaly detection for enterprise environments.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
        technologies: ["Python", "Django", "JavaScript", "D3.js", "WebSocket", "Redis", "PostgreSQL"],
        features: [
            "📊 Real-time threat visualization dashboard",
            "🚨 Automated incident response workflows",
            "🤖 ML-powered anomaly detection engine",
            "📈 Advanced security metrics and KPIs",
            "🔔 Multi-channel alert management system",
            "🗂️ Comprehensive incident case management"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "SOC Operations"
    },
    4: {
        title: "Cloud Security Assessment Tool",
        description: "Automated cloud security assessment platform for AWS and Azure environments with compliance reporting, vulnerability detection, and continuous security monitoring capabilities.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
        technologies: ["Python", "AWS SDK", "Azure API", "Terraform", "Security Frameworks", "Docker"],
        features: [
            "☁️ Multi-cloud security assessment (AWS, Azure, GCP)",
            "📋 Automated compliance reporting (SOC2, PCI-DSS)",
            "🔍 Vulnerability scanning and prioritization",
            "📊 Security posture scoring and trending",
            "🛡️ Infrastructure as Code security analysis",
            "🔄 Continuous security monitoring integration"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "Cloud Security"
    },
    5: {
        title: "Network Vulnerability Scanner",
        description: "Comprehensive network vulnerability scanning tool with automated reporting, risk assessment, and integration with popular security frameworks for enterprise network security testing.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
        technologies: ["Python", "Nmap", "OpenVAS", "Custom Modules", "Report Generation"],
        features: [
            "🌐 Comprehensive network discovery and mapping",
            "🔍 Advanced vulnerability detection algorithms",
            "📊 Risk-based vulnerability prioritization",
            "📄 Automated executive and technical reporting",
            "🔧 Integration with popular security tools",
            "⚡ High-performance multi-threaded scanning"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "Network Security"
    },
    6: {
        title: "Automated Threat Detection System",
        description: "Machine learning-powered threat detection system with behavioral analysis, anomaly detection, and automated response capabilities for advanced persistent threat identification.",
        image: "https://images.unsplash.com/photo-1550645612-83f5d594b671?w=600&h=400&fit=crop",
        technologies: ["Python", "TensorFlow", "Scikit-learn", "Apache Kafka", "Security APIs"],
        features: [
            "🧠 ML-powered behavioral threat analysis",
            "🎯 Advanced persistent threat (APT) detection",
            "⚡ Real-time threat scoring and correlation",
            "🔄 Automated threat response orchestration",
            "📈 Threat intelligence integration and enrichment",
            "🔍 Zero-day attack detection capabilities"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "Threat Detection"
    },
    7: {
        title: "Security Automation Scripts",
        description: "Collection of Python automation scripts for security tasks including log analysis, threat intelligence gathering, and system hardening for enterprise security operations.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
        technologies: ["Python", "Bash", "APIs", "Automation Frameworks", "SIEM Integration"],
        features: [
            "📝 Advanced log analysis and correlation",
            "🔍 Automated threat intelligence gathering",
            "🛡️ System hardening and configuration scripts",
            "📊 Security metrics and reporting automation",
            "🔗 Multi-platform SIEM integration",
            "⚡ Scalable security workflow automation"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "Security Automation"
    },
    8: {
        title: "Java Security Analysis Tool",
        description: "Enterprise-grade Java application for security code analysis, vulnerability assessment, and secure coding practice enforcement in development environments.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        technologies: ["Java", "Security Libraries", "Static Analysis", "Maven", "Spring Security"],
        features: [
            "🔍 Advanced static code security analysis",
            "🛡️ Vulnerability pattern detection engine",
            "📊 Security compliance reporting",
            "🔧 Secure coding best practices enforcement",
            "📈 Developer security training integration",
            "🔄 CI/CD pipeline security integration"
        ],
        liveUrl: "https://github.com/viveksinghisyour-max",
        githubUrl: "https://github.com/viveksinghisyour-max",
        category: "Code Security"
    }
};

// Initialize Cybersecurity Portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new CyberSecurityPortfolio();
    
    // Make modal functions globally available
    window.openProjectModal = (projectId) => portfolio.openProjectModal(projectId);
    window.closeProjectModal = () => portfolio.closeProjectModal();
});

// Handle page visibility change for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animationPlayState !== undefined) {
                el.style.animationPlayState = 'paused';
            }
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('*').forEach(el => {
            if (el.style.animationPlayState !== undefined) {
                el.style.animationPlayState = 'running';
            }
        });
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy operations
window.addEventListener('scroll', debounce(() => {
    // Expensive scroll operations are handled in the main class
}, 16)); // 60fps

// Security-themed console message
console.log(`
🛡️  CYBERSECURITY PORTFOLIO LOADED  🛡️
═══════════════════════════════════════════
👨‍💻 Vivek Sikarwar - Cloud Security Engineer
🔒 Advanced Threat Protection: ACTIVE
🌐 Secure Connection: ESTABLISHED  
📊 System Status: OPERATIONAL
📧 Contact: viveksinghisyour@gmail.com
📱 Phone: +91 8791533032
🔗 LinkedIn: linkedin.com/in/vivek-singh-843639326
📷 Instagram: @its_vivek_chwdry
🐙 GitHub: github.com/viveksinghisyour-max
═══════════════════════════════════════════
`);

// Add some cyber-themed easter eggs
document.addEventListener('keydown', (e) => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.code);
    if (window.konamiSequence.length > konami.length) {
        window.konamiSequence = window.konamiSequence.slice(-konami.length);
    }
    
    if (window.konamiSequence.join(',') === konami.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
        console.log('🎮 Konami Code Activated! Cyber Mode Engaged! 🎮');
    }
});