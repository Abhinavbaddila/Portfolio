// Cyberpunk Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const sections = document.querySelectorAll('section');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting on scroll
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Navbar background on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(204, 17, 240, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', function() {
        highlightActiveSection();
        handleNavbarScroll();
        animateSkillsOnScroll();
    });
    
    // Skills Animation
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkills() {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    function animateSkillsOnScroll() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection || skillsAnimated) return;
        
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            animateSkills();
            skillsAnimated = true;
        }
    }
    
    // Certificate Tabs Functionality - FIXED
    const certTabs = document.querySelectorAll('.cert-tab');
    const certCategories = document.querySelectorAll('.cert-category');
    
    // Initialize certificate tabs
    function initializeCertTabs() {
        // Ensure first tab and category are active by default
        if (certTabs.length > 0 && certCategories.length > 0) {
            certTabs.forEach(tab => tab.classList.remove('active'));
            certCategories.forEach(category => category.classList.remove('active'));
            
            certTabs[0].classList.add('active');
            certCategories[0].classList.add('active');
        }
    }
    
    certTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Prevent any default behavior and event bubbling
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.getAttribute('data-category');
            console.log('Tab clicked:', category); // Debug log
            
            // Remove active class from all tabs and categories
            certTabs.forEach(t => {
                t.classList.remove('active');
            });
            certCategories.forEach(c => {
                c.classList.remove('active');
                c.style.display = 'none'; // Explicitly hide
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show the corresponding category
            const targetCategory = document.querySelector(`.cert-category[data-category="${category}"]`);
            if (targetCategory) {
                targetCategory.classList.add('active');
                targetCategory.style.display = 'block'; // Explicitly show
                console.log('Showing category:', category); // Debug log
            } else {
                console.error('Category not found:', category); // Debug log
            }
            
            // Add small delay to allow smooth transition
            setTimeout(() => {
                // Trigger any animations for newly visible elements
                checkAnimations();
            }, 100);
        });
    });
    
    // Ensure certificate items are clickable and redirect properly
    const certItems = document.querySelectorAll('.cert-item.clickable');
    certItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Allow the default link behavior for certificate verification
            console.log('Certificate clicked:', this.getAttribute('href'));
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:abhinavbaddila@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Message prepared! Your email client should open now.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 10px;
            border: 1px solid var(--neon-purple);
            box-shadow: 0 0 20px rgba(204, 17, 240, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Scroll animations for cards and elements
    const animateElements = document.querySelectorAll('.project-card, .cert-item, .leadership-card, .stat-item');
    
    function checkAnimations() {
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !element.classList.contains('animate-in')) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // Add CSS for animations and improved tab switching
    const style = document.createElement('style');
    style.textContent = `
        .project-card,
        .cert-item,
        .leadership-card,
        .stat-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--neon-purple);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            color: var(--neon-pink);
        }
        
        /* Improved certificate category switching */
        .cert-category {
            display: none;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease;
        }
        
        .cert-category.active {
            display: block !important;
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Hamburger menu animation */
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Loading animation for skill bars */
        .skill-progress {
            position: relative;
            overflow: hidden;
        }
        
        .skill-progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            animation: skillShine 2s ease-in-out;
        }
        
        @keyframes skillShine {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
        }
        
        /* Glitch effect for hero name */
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
        
        .name:hover {
            animation: glitch 0.3s ease-in-out;
        }
        
        /* Pulse animation for social links */
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 0, 141, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 0, 141, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 0, 141, 0); }
        }
        
        .social-link:hover {
            animation: pulse 1.5s infinite;
        }
        
        /* Certificate tab hover effect */
        .cert-tab {
            position: relative;
            overflow: hidden;
        }
        
        .cert-tab::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .cert-tab:hover::before {
            left: 100%;
        }
        
        /* Certificate item hover animation */
        .cert-item.clickable {
            position: relative;
            overflow: hidden;
        }
        
        .cert-item.clickable::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 0, 141, 0.1), transparent);
            transition: left 0.6s ease;
        }
        
        .cert-item.clickable:hover::before {
            left: 100%;
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', checkAnimations);
    window.addEventListener('load', checkAnimations);
    
    // Initialize animations on page load
    setTimeout(checkAnimations, 500);
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Activate super cyberpunk mode
            document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
            showNotification('🎮 CYBERPUNK MODE ACTIVATED! 🎮', 'success');
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);
            konamiCode = [];
        }
    });
    
    // Add matrix rain effect to background (optional easter egg)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F3';
            ctx.font = fontSize + 'px arial';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
        
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Activate matrix rain on triple click of logo
    let logoClickCount = 0;
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('click', function() {
            logoClickCount++;
            if (logoClickCount === 3) {
                createMatrixRain();
                showNotification('🌧️ Matrix Rain Activated! 🌧️', 'success');
                logoClickCount = 0;
            }
            setTimeout(() => {
                logoClickCount = 0;
            }, 1000);
        });
    }
    
    // Debug function to verify certificate tab functionality
    function debugCertificateTabs() {
        console.log('🎯 Certificate Tabs Debug:');
        console.log('- Tab buttons should only expand/collapse content');
        console.log('- Individual certificate cards should redirect to verification URLs');
        console.log('- "View All Certificates" buttons should open Google Drive folders');
        
        const tabs = document.querySelectorAll('.cert-tab');
        const clickableCerts = document.querySelectorAll('.cert-item.clickable');
        const viewAllBtns = document.querySelectorAll('.view-all-btn');
        const categories = document.querySelectorAll('.cert-category');
        
        console.log(`Found ${tabs.length} certificate tabs`);
        console.log(`Found ${categories.length} certificate categories`);
        console.log(`Found ${clickableCerts.length} clickable certificate items`);
        console.log(`Found ${viewAllBtns.length} "View All" buttons`);
        
        // Verify tabs don't have href attributes (they shouldn't redirect)
        tabs.forEach((tab, index) => {
            const category = tab.getAttribute('data-category');
            const corresponding = document.querySelector(`.cert-category[data-category="${category}"]`);
            if (tab.hasAttribute('href')) {
                console.warn(`⚠️ Tab ${index} has href attribute - this might cause unwanted redirects`);
            }
            if (!corresponding) {
                console.error(`❌ Tab ${index} (${category}) has no corresponding content category`);
            } else {
                console.log(`✅ Tab ${index} (${category}) properly linked to content`);
            }
        });
        
        // Verify clickable certificate items have proper href attributes
        clickableCerts.forEach((cert, index) => {
            const href = cert.getAttribute('href');
            if (!href) {
                console.warn(`⚠️ Clickable certificate ${index} missing href attribute`);
            } else {
                console.log(`✅ Certificate ${index} links to: ${href}`);
            }
        });
    }
    
    // Initialize everything
    highlightActiveSection();
    checkAnimations();
    initializeCertTabs(); // Initialize certificate tabs properly
    
    // Add smooth reveal animation to page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Run debug function in development
    setTimeout(debugCertificateTabs, 1000);
    
    console.log('🚀 Cyberpunk Portfolio Initialized! 🚀');
    console.log('✅ Certificate tabs fixed: tabs only expand/collapse, certificates redirect properly');
    console.log('💡 Try the Konami code for a surprise!');
    console.log('💡 Triple-click the logo for matrix rain!');
});