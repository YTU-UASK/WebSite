// GSAP ve Native Scroll entegrasyonu - LOCOMOTIVE SCROLL KALDIRILDI
document.addEventListener('DOMContentLoaded', function() {
    
    // Locomotive Scroll kaldırıldı - Native scroll kullanılıyor
    console.log('Locomotive Scroll kaldırıldı - Native scroll aktif');
    
    // GSAP ScrollTrigger entegrasyonu - Native scroll ile
    gsap.registerPlugin(ScrollTrigger);
    
    // ScrollTrigger refresh - Native scroll ile
    ScrollTrigger.addEventListener("refresh", () => {
        ScrollTrigger.refresh();
    });
    
    // İlk yükleme sonrası refresh
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
    
    // Manuel scroll kontrolü kaldırıldı - Native scroll otomatik çalışıyor
    console.log('Manuel scroll kontrolü kaldırıldı - Native scroll aktif');

    // 3D Arkaplan Objesi
    init3DBackground();

    // Navigation animasyonları
    initNavigationAnimations();

    // Scroll animasyonları
    initScrollAnimations();

    // Parallax efektleri
    initParallaxEffects();

    // GSAP scroll animasyonları
    initGSAPAnimations();
    
    // Performance optimizasyonları
    initPerformanceOptimizations();

    // Hover efektleri
    initHoverEffects();

    // Smooth scroll için navigation linkleri
    initSmoothScroll();
    
    // NATIVE SCROLL MENÜ SİSTEMİ - LOCOMOTIVE SCROLL KALDIRILDI
    setTimeout(() => {
        const navDots = document.querySelectorAll('.nav-dot');
        console.log('Native scroll sistem - Nav dots:', navDots.length);
        
        // Önceki event listener'ları temizle
        navDots.forEach(dot => {
            dot.onclick = null;
            dot.removeEventListener('click', dot.onclick);
        });
        
        navDots.forEach((dot, index) => {
            dot.onclick = function(e) {
                console.log('Native scroll ONCLICK çalıştı:', index);
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = this.getAttribute('href');
                console.log('Target:', targetId);
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    console.log('Native scroll to:', targetElement);
                    
                    // Native scroll ile smooth scroll
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Aktif dot güncelle
                    navDots.forEach(d => d.classList.remove('active'));
                    this.classList.add('active');
                    
                    console.log('Native scroll tamamlandı');
                }
            };
        });
        
        // Contact button - Native scroll
        const contactBtn = document.querySelector('.contact-btn a');
        if (contactBtn) {
            contactBtn.onclick = null;
            contactBtn.removeEventListener('click', contactBtn.onclick);
            
            contactBtn.onclick = function(e) {
                console.log('Native scroll Contact ONCLICK çalıştı');
                e.preventDefault();
                e.stopPropagation();
                
                const targetElement = document.querySelector('#contact');
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Aktif dot güncelle
                    navDots.forEach(d => d.classList.remove('active'));
                    const contactDot = document.querySelector('.nav-dot[href="#contact"]');
                    if (contactDot) {
                        contactDot.classList.add('active');
                    }
                    
                    console.log('Native scroll Contact tamamlandı');
                }
            };
        }
    }, 1000);
    
    // Native scroll event listener - aktif dot'u güncelle
    let scrollUpdateTimeout;
    window.addEventListener('scroll', () => {
        // Throttle scroll updates
        clearTimeout(scrollUpdateTimeout);
        scrollUpdateTimeout = setTimeout(() => {
            const sections = document.querySelectorAll('section[id]');
            const navDots = document.querySelectorAll('.nav-dot');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollTop >= sectionTop - 100 && scrollTop < sectionTop + sectionHeight - 100) {
                    const sectionId = section.getAttribute('id');
                    
                    // Tüm dot'ları pasif yap
                    navDots.forEach(dot => dot.classList.remove('active'));
                    
                    // Aktif section'ın dot'unu aktif yap
                    const activeDot = document.querySelector(`.nav-dot[href="#${sectionId}"]`);
                    if (activeDot) {
                        activeDot.classList.add('active');
                    }
                }
            });
        }, 50);
    });
    
    // Locomotive Scroll kodları kaldırıldı - Native scroll aktif
    console.log('Locomotive Scroll kodları kaldırıldı - Native scroll aktif');
    
    // CSS animasyonları - KALDIRILDI
    // Intersection Observer kaldırıldı - her şey direkt görünüyor
    
    // Rastgele yıldızlar oluştur
    createRandomStars();
    
    // Hero section için rastgele yıldızlar
    createHeroStars();

});

// Rastgele yıldızlar oluşturma fonksiyonu
function createRandomStars() {
    const starContainers = ['about-stars', 'projects-stars', 'team-stars', 'contact-stars'];
    
    starContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            // Her container için 50-80 arası rastgele yıldız
            const starCount = Math.floor(Math.random() * 30) + 50;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Rastgele boyut (1-3px)
                const size = Math.random() * 2 + 1;
                star.style.width = size + 'px';
                star.style.height = size + 'px';
                
                // Rastgele pozisyon
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                
                // Rastgele animasyon gecikmesi
                star.style.animationDelay = Math.random() * 2 + 's';
                
                // Rastgele hareket süresi (6-12 saniye)
                const driftDuration = Math.random() * 6 + 6;
                star.style.setProperty('--drift-duration', driftDuration + 's');
                
                // Rastgele hareket mesafesi
                const driftDistance = Math.random() * 20 + 10;
                star.style.setProperty('--drift-distance', driftDistance + 'px');
                
                // Rastgele parlaklık
                const opacity = Math.random() * 0.7 + 0.3;
                star.style.opacity = opacity;
                
                container.appendChild(star);
            }
        }
    });
}

// Hero section için rastgele yıldızlar
function createHeroStars() {
    const heroStarsContainer = document.getElementById('hero-stars');
    if (!heroStarsContainer) return;
    
    // 150-250 arası rastgele yıldız (daha az)
    const starCount = Math.floor(Math.random() * 100) + 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'hero-star';
        
        // Rastgele boyut (1-2px) - daha küçük
        const size = Math.random() * 1 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Tamamen rastgele pozisyon
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Rastgele animasyon gecikmesi (daha yavaş)
        star.style.animationDelay = Math.random() * 4 + 's';
        
        // Az parlaklık (0.1-0.4 arası)
        const opacity = Math.random() * 0.3 + 0.1;
        star.style.opacity = opacity;
        
        // Rastgele drift süresi (15-25 saniye)
        const driftDuration = Math.random() * 10 + 15;
        star.style.setProperty('--drift-duration', driftDuration + 's');
        
        heroStarsContainer.appendChild(star);
    }
}

// 3D Arkaplan - KALDIRILDI
function init3DBackground() {
    // 3D objeler kaldırıldı - CSS nebula efekti kullanılıyor
    console.log('3D arkaplan kaldırıldı - CSS nebula efekti aktif');
}

// Navigation animasyonları
function initNavigationAnimations() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll ile navigation arkaplan değişimi
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top -100px',
        end: 'bottom bottom',
        onEnter: () => nav.style.background = 'rgba(10, 10, 10, 0.95)',
        onLeaveBack: () => nav.style.background = 'rgba(10, 10, 10, 0.9)'
    });

    // Navigation link hover efektleri
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });
}

// Scroll animasyonları
function initScrollAnimations() {
    console.log('Scroll animasyonları başlatılıyor...');
    
    // Intersection Observer ile scroll animasyonları
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Staggered animasyonlar için gecikme
                if (entry.target.classList.contains('stagger-item')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = (index * 0.1) + 's';
                }
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);
    
    // Animasyon elementlerini gözlemle
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Section başlıkları için özel animasyon
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header);
    });
    
    // Proje kartları için staggered animasyon
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.15) + 's';
        observer.observe(card);
    });
    
    // Takım üyeleri için staggered animasyon
    const memberCards = document.querySelectorAll('.member-card-large');
    memberCards.forEach((card, index) => {
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });
    
    // Sosyal medya linkleri için staggered animasyon
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        link.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(link);
    });
    
    console.log('Scroll animasyonları aktif');
}

    // Parallax efektleri
function initParallaxEffects() {
    console.log('Parallax efektleri başlatılıyor...');
    
    // Scroll progress bar
    const progressBar = document.querySelector('.scroll-progress');
    
    // Scroll progress güncelleme
    scroll.on('scroll', (instance) => {
        const progress = (instance.scroll.y / (instance.limit.y - window.innerHeight)) * 100;
        if (progressBar) {
            progressBar.style.width = Math.min(progress, 100) + '%';
        }
    });
    
    // Parallax elementleri
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    // Parallax scroll efektleri
    scroll.on('scroll', (instance) => {
        const scrollY = instance.scroll.y;
        
        // Parallax elementleri
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1); // Farklı hızlarda hareket
            const yPos = scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Parallax background'lar
        parallaxBgs.forEach((bg, index) => {
            const speed = 0.3 + (index * 0.05);
            const yPos = scrollY * speed;
            bg.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Section geçiş efektleri
    const sections = document.querySelectorAll('section');
    const sectionOverlays = document.querySelectorAll('.section-overlay');
    
    scroll.on('scroll', (instance) => {
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollTop = instance.scroll.y;
            const windowHeight = window.innerHeight;
            
            // Hero section özel geçiş efekti
            if (index === 0) { // Hero section
                const hero = section;
                const aboutSection = sections[1];
                
                // Hero'dan About'a geçiş
                if (scrollTop > windowHeight * 0.3) {
                    hero.classList.add('scroll-transition');
                    hero.classList.remove('scroll-transition-out');
                    
                    if (aboutSection) {
                        aboutSection.classList.add('scroll-transition-in');
                        aboutSection.classList.remove('scroll-transition-out');
                    }
                } else {
                    hero.classList.remove('scroll-transition');
                    hero.classList.add('scroll-transition-out');
                    
                    if (aboutSection) {
                        aboutSection.classList.remove('scroll-transition-in');
                        aboutSection.classList.add('scroll-transition-out');
                    }
                }
            }
            
            // About section özel geçiş efekti
            if (index === 1) { // About section
                const about = section;
                const projectsSection = sections[2];
                
                // About'dan Projects'e geçiş
                if (scrollTop > sectionTop - windowHeight * 0.2) {
                    about.classList.add('scroll-transition-in');
                    about.classList.remove('scroll-transition-out');
                } else {
                    about.classList.remove('scroll-transition-in');
                    about.classList.add('scroll-transition-out');
                }
            }
            
            // Diğer section'lar için normal geçiş
            if (index > 1) {
                // Section görünürlük kontrolü
                if (scrollTop >= sectionTop - windowHeight * 0.5 && 
                    scrollTop < sectionTop + sectionHeight - windowHeight * 0.5) {
                    
                    // Section overlay aktif
                    const overlay = section.querySelector('.section-overlay');
                    if (overlay) {
                        overlay.classList.add('active');
                    }
                    
                    // Section transition class'ı
                    section.classList.add('in-view');
                    section.classList.remove('leaving');
                    
                    // Önceki section'ı leaving olarak işaretle
                    if (index > 0) {
                        sections[index - 1].classList.add('leaving');
                        sections[index - 1].classList.remove('in-view');
                    }
                } else {
                    section.classList.remove('in-view');
                    const overlay = section.querySelector('.section-overlay');
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                }
            }
        });
    });
    
    console.log('Parallax efektleri aktif');
}

// GSAP scroll animasyonları
function initGSAPAnimations() {
    console.log('GSAP animasyonları başlatılıyor...');
    
    // Section başlıkları için GSAP animasyonları
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { 
                opacity: 0, 
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Proje kartları için GSAP staggered animasyon
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 100,
                rotationX: 15
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Takım üyeleri için GSAP animasyon
    gsap.utils.toArray('.member-card-large').forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                x: index % 2 === 0 ? -100 : 100,
                scale: 0.8
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // About section içerik animasyonu
    gsap.fromTo('.about-text',
        {
            opacity: 0,
            x: -100
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.about-text',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Community section animasyonu
    gsap.fromTo('.community-item',
        {
            opacity: 0,
            x: 100,
            scale: 0.9
        },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.community-item',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Contact section animasyonları
    gsap.fromTo('.contact-info',
        {
            opacity: 0,
            x: -50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.contact-info',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    gsap.fromTo('.social-links',
        {
            opacity: 0,
            x: 50
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.social-links',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
    
    // Parallax efektleri için GSAP
    gsap.utils.toArray('.parallax-element').forEach((element, index) => {
        gsap.to(element, {
            y: () => -window.innerHeight * 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
    
    // Background parallax
    gsap.utils.toArray('.parallax-bg').forEach((bg, index) => {
        gsap.to(bg, {
            y: () => -window.innerHeight * 0.3,
            ease: "none",
            scrollTrigger: {
                trigger: bg,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
    
    console.log('GSAP animasyonları aktif');
}

// Performance optimizasyonu
function initPerformanceOptimizations() {
    console.log('Performance optimizasyonları başlatılıyor...');
    
    // Throttle fonksiyonu
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Debounce fonksiyonu
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Scroll event optimizasyonu
    let ticking = false;
    
    function updateScrollEffects() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll progress bar güncelleme
                const progressBar = document.querySelector('.scroll-progress');
                if (progressBar && scroll) {
                    const progress = (scroll.scroll.y / (scroll.limit.y - window.innerHeight)) * 100;
                    progressBar.style.width = Math.min(progress, 100) + '%';
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Native scroll listener - LOCOMOTIVE SCROLL KALDIRILDI
    window.addEventListener('scroll', throttle(updateScrollEffects, 16)); // 60fps
    
    // Window resize optimizasyonu - Native scroll
    const handleResize = debounce(() => {
        ScrollTrigger.refresh();
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // Intersection Observer optimizasyonu
    const observerOptions = {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Lazy loading için observer
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Parallax elementleri için will-change optimizasyonu
                if (element.classList.contains('parallax-element')) {
                    element.style.willChange = 'transform';
                }
                
                // Animasyon tamamlandıktan sonra will-change'i kaldır
                setTimeout(() => {
                    element.style.willChange = 'auto';
                }, 1000);
            }
        });
    }, observerOptions);
    
    // Parallax elementleri için lazy loading
    document.querySelectorAll('.parallax-element, .parallax-bg').forEach(element => {
        lazyObserver.observe(element);
    });
    
    // YENİ: Scroll düzeltme mekanizması
    function fixScrollIssues() {
        if (scroll) {
            console.log('Scroll düzeltme mekanizması çalışıyor...');
            
            // Scroll'u zorla güncelle
            scroll.update();
            ScrollTrigger.refresh();
            
            // Scroll pozisyonunu kontrol et
            const currentScroll = scroll.scroll.y;
            console.log('Current scroll position:', currentScroll);
            
            // Eğer scroll pozisyonu 0'dan farklıysa, scroll'u düzelt
            if (currentScroll > 0) {
                setTimeout(() => {
                    scroll.update();
                    ScrollTrigger.refresh();
                }, 100);
            }
        }
    }
    
    // Scroll düzeltme için interval
    setInterval(fixScrollIssues, 2000);
    
    // YENİ: Manuel scroll'u aktif hale getiren mekanizma
    function enableManualScroll() {
        if (scroll) {
            console.log('Manuel scroll aktif hale getiriliyor...');
            
            // Scroll'u zorla güncelle
            scroll.update();
            ScrollTrigger.refresh();
            
            // Manuel scroll'u aktif hale getir
            document.addEventListener('wheel', function(e) {
                if (scroll) {
                    scroll.update();
                    ScrollTrigger.refresh();
                }
            }, { passive: true });
            
            // Touch event'lerini aktif hale getir
            document.addEventListener('touchmove', function(e) {
                if (scroll) {
                    scroll.update();
                    ScrollTrigger.refresh();
                }
            }, { passive: true });
        }
    }
    
    // Manuel scroll'u aktif hale getir
    setTimeout(enableManualScroll, 500);
    setTimeout(enableManualScroll, 1500);
    setTimeout(enableManualScroll, 3000);
    
    // Memory cleanup - Native scroll
    window.addEventListener('beforeunload', () => {
        // Observer'ları temizle
        if (lazyObserver) {
            lazyObserver.disconnect();
        }
        
        // GSAP ScrollTrigger'ı temizle
        ScrollTrigger.killAll();
    });
    
    console.log('Performance optimizasyonları aktif');
}

// Hover efektleri
function initHoverEffects() {
    // Proje kartları hover
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                scale: 1.05, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                scale: 1, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });

    // Takım üyeleri hover
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                x: 10, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                x: 0, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });

    // Sosyal medya linkleri hover
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { 
                scale: 1.1, 
                y: -5, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { 
                scale: 1, 
                y: 0, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });
}

// Native scroll için navigation - LOCOMOTIVE SCROLL KALDIRILDI
function initSmoothScroll() {
    console.log('Native scroll initSmoothScroll çalışıyor');
    
    // Bu fonksiyon artık sadece fallback olarak çalışacak
    // Ana navigation sistemi yukarıda native scroll ile düzeltildi
    
    // Hero navigation dots - Fallback
    const navDots = document.querySelectorAll('.nav-dot');
    console.log('Nav dots bulundu (fallback):', navDots.length);
    
    navDots.forEach((dot, index) => {
        // Sadece eğer onclick handler yoksa event listener ekle
        if (!dot.onclick) {
            dot.addEventListener('click', (e) => {
                console.log('Fallback dot tıklandı:', dot);
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = dot.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Native scroll ile smooth scroll
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Aktif dot'u güncelle
                    navDots.forEach(d => d.classList.remove('active'));
                    dot.classList.add('active');
                }
            });
        }
    });
    
    // Contact button - Fallback
    const contactBtn = document.querySelector('.contact-btn a');
    if (contactBtn && !contactBtn.onclick) {
        contactBtn.addEventListener('click', (e) => {
            console.log('Fallback contact button tıklandı');
            e.preventDefault();
            e.stopPropagation();
            
            const targetElement = document.querySelector('#contact');
            
            if (targetElement) {
                // Native scroll ile smooth scroll
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Aktif dot'u güncelle
                navDots.forEach(d => d.classList.remove('active'));
                const contactDot = document.querySelector('.nav-dot[href="#contact"]');
                if (contactDot) {
                    contactDot.classList.add('active');
                }
            }
        });
    }
}

// Sayı animasyonları (stats)
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        const duration = 2;
        const increment = finalNumber / (duration * 60);
        let currentNumber = 0;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentNumber) + (stat.textContent.includes('+') ? '+' : '');
        }, 1000 / 60);
    });
}

// Stats animasyonu - KALDIRILDI
// ScrollTrigger.create({
//     trigger: '.stats',
//     start: "top 95%",
//     onEnter: animateNumbers
// });

// Cursor takip efekti
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    }
});

// Loading animasyonu
window.addEventListener('load', () => {
    gsap.fromTo('body', 
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
    );
});
