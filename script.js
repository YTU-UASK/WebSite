/* ============================================
   UASK - New Modern Website JavaScript
   Interactive Particles + Stats Counter +
   Team Filter/Search + FAQ + Theme Toggle +
   ContentRenderer (dynamic from DataStore)
   ============================================ */

(function () {
    'use strict';

    // ==========================================
    // 0. CONTENT RENDERER (from DataStore)
    // ==========================================
    const ContentRenderer = {
        init() {
            this.renderHero();
            this.renderAbout();
            this.renderStats();
            this.renderProjects();
            this.renderTimeline();
            this.renderTeamFilter();
            this.renderTeam();
            this.renderFAQ();
            this.renderContact();
            this.renderFooter();
        },

        renderHero() {
            const hero = DataStore.get('hero');
            const el = document.getElementById('heroContent');
            if (!el) return;

            const socialsHtml = hero.socials.map(s =>
                `<a href="${s.url}" target="_blank" class="hero-social" aria-label="${s.label}"><i class="${s.icon}"></i></a>`
            ).join('');

            el.innerHTML = `
                <div class="hero-badge">
                    <i class="fas ${hero.badge.icon}"></i>
                    <span>${hero.badge.text}</span>
                </div>
                <h1 class="hero-title">
                    <span class="hero-line hero-line-1">${hero.titleLine1}</span>
                    <span class="hero-line hero-line-2">${hero.titleLine2} <span class="gradient-text">${hero.titleHighlight}</span></span>
                </h1>
                <p class="hero-description">${hero.description}</p>
                <div class="hero-buttons">
                    <a href="${hero.buttonLink}" class="btn btn-outline-glass shine-hover">
                        <span>${hero.buttonText}</span>
                        <i class="fas fa-chevron-down"></i>
                    </a>
                </div>
                <div class="hero-socials">${socialsHtml}</div>
            `;
        },

        renderAbout() {
            const about = DataStore.get('about');
            const header = document.getElementById('aboutHeader');
            const grid = document.getElementById('aboutGrid');
            if (!header || !grid) return;

            header.innerHTML = `
                <span class="section-tag">${about.sectionTag}</span>
                <h2 class="section-title">${about.sectionTitle}</h2>
                <div class="section-line"></div>
            `;

            const featuresHtml = about.features.map(f => `
                <div class="about-feature">
                    <div class="feature-icon"><i class="fas ${f.icon}"></i></div>
                    <div>
                        <h4>${f.title}</h4>
                        <p>${f.desc}</p>
                    </div>
                </div>
            `).join('');

            const paragraphsHtml = about.paragraphs.map(p => `<p>${p}</p>`).join('');
            const c = about.community;

            grid.innerHTML = `
                <div class="about-text reveal">
                    <h3>${about.title}</h3>
                    ${paragraphsHtml}
                    <div class="about-features">${featuresHtml}</div>
                </div>
                <div class="about-community reveal">
                    <div class="community-card glass-card">
                        <div class="community-image">
                            <img src="${c.image}" alt="${c.title}" loading="lazy">
                            <div class="community-badge">${c.badge}</div>
                        </div>
                        <div class="community-info">
                            <h3>${c.title}</h3>
                            <p>${c.description}</p>
                            <a href="${c.linkUrl}" target="_blank" class="community-link">
                                <i class="${c.linkIcon}"></i>
                                <span>${c.linkText}</span>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        },

        renderStats() {
            const stats = DataStore.get('stats');
            const header = document.getElementById('statsHeader');
            const grid = document.getElementById('statsGrid');
            if (!header || !grid) return;

            header.innerHTML = `
                <span class="section-tag">Rakamlarla</span>
                <h2 class="section-title">Başarılarımız</h2>
                <div class="section-line"></div>
            `;

            grid.innerHTML = stats.map(s => `
                <div class="stat-card glass-card reveal">
                    <div class="stat-icon"><i class="fas ${s.icon}"></i></div>
                    <div class="stat-number" data-target="${s.target}">0</div>
                    <div class="stat-suffix">${s.suffix}</div>
                    <div class="stat-label">${s.label}</div>
                </div>
            `).join('');
        },

        renderProjects() {
            const projects = DataStore.get('projects');
            const projectOrder = DataStore.get('projectOrder');
            const header = document.getElementById('projectsHeader');
            const grid = document.getElementById('projectsGrid');
            if (!header || !grid) return;

            header.innerHTML = `
                <span class="section-tag">Projelerimiz</span>
                <h2 class="section-title">Neler Yapıyoruz?</h2>
                <div class="section-line"></div>
            `;

            grid.innerHTML = projectOrder.map(id => {
                const p = projects[id];
                if (!p) return '';

                const techTags = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
                const statsHtml = p.cardStats.map(s => `
                    <div class="project-stat">
                        <i class="fas ${s.icon}"></i>
                        <span>${s.text}</span>
                    </div>
                `).join('');

                const statusClass = p.status === 'Tamamlandı' ? 'completed' : '';

                return `
                    <a href="project.html?id=${p.id}" class="project-card glass-card reveal">
                        <div class="project-image">
                            <img src="${p.image}" alt="${p.name}" loading="lazy">
                            <div class="project-status ${statusClass}">${p.status}</div>
                            <div class="project-techs">${techTags}</div>
                        </div>
                        <div class="project-body">
                            <h3>${p.name}</h3>
                            <p>${p.cardDescription}</p>
                            <div class="project-stats">${statsHtml}</div>
                            <div class="project-view-more">
                                <span>Detayları Gör</span>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </a>
                `;
            }).join('');
        },

        renderTimeline() {
            const timeline = DataStore.get('timeline');
            const header = document.getElementById('timelineHeader');
            const container = document.getElementById('timelineContainer');
            if (!header || !container) return;

            header.innerHTML = `
                <span class="section-tag">Yolculuğumuz</span>
                <h2 class="section-title">Kilometre Taşları</h2>
                <div class="section-line"></div>
            `;

            const itemsHtml = timeline.map(t => `
                <div class="timeline-item reveal" data-side="${t.side}">
                    <div class="timeline-dot"><i class="fas ${t.icon}"></i></div>
                    <div class="timeline-card glass-card">
                        <span class="timeline-date">${t.date}</span>
                        <h3>${t.title}</h3>
                        <p>${t.description}</p>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `<div class="timeline-line"></div>${itemsHtml}`;
        },

        renderTeamFilter() {
            const team = DataStore.get('team');
            const filterEl = document.getElementById('teamFilter');
            if (!filterEl) return;

            // Extract unique categories
            const cats = new Set();
            team.forEach(m => {
                m.categories.split(' ').forEach(c => { if (c) cats.add(c); });
            });

            const catLabels = {
                'yonetim': 'Yönetim Kurulu',
                'denetim': 'Denetim Kurulu',
                'idari': 'İdari Kadro'
            };

            let html = '<button class="filter-btn active" data-filter="all">Tümü</button>';
            cats.forEach(cat => {
                html += `<button class="filter-btn" data-filter="${cat}">${catLabels[cat] || cat}</button>`;
            });

            filterEl.innerHTML = html;
        },

        renderTeam() {
            const team = DataStore.get('team');
            const grid = document.getElementById('teamGrid');
            const header = document.getElementById('teamHeader');
            if (!grid || !header) return;

            header.innerHTML = `
                <span class="section-tag">Ekibimiz</span>
                <h2 class="section-title">Biz Kimiz?</h2>
                <div class="section-line"></div>
            `;

            grid.innerHTML = team.map(m => `
                <div class="team-card glass-card reveal" data-category="${m.categories}" data-name="${m.name}" data-dept="${m.dept}">
                    <div class="team-photo">
                        <img src="${m.photo}" alt="${m.name}" loading="lazy">
                    </div>
                    <div class="team-info">
                        <h4>${m.name}</h4>
                        <p class="team-role">${m.role}</p>
                        <span class="team-dept">${m.dept}</span>
                        <span class="team-board">${m.board}</span>
                    </div>
                </div>
            `).join('');
        },

        renderFAQ() {
            const faq = DataStore.get('faq');
            const header = document.getElementById('faqHeader');
            const grid = document.getElementById('faqGrid');
            if (!header || !grid) return;

            header.innerHTML = `
                <span class="section-tag">Sıkça Sorulan</span>
                <h2 class="section-title">Sorular</h2>
                <div class="section-line"></div>
            `;

            grid.innerHTML = faq.map(f => `
                <div class="faq-item glass-card reveal">
                    <button class="faq-question">
                        <span>${f.question}</span>
                        <i class="fas fa-plus"></i>
                    </button>
                    <div class="faq-answer">
                        <p>${f.answer}</p>
                    </div>
                </div>
            `).join('');
        },

        renderContact() {
            const contact = DataStore.get('contact');
            const hero = DataStore.get('hero');
            const header = document.getElementById('contactHeader');
            const grid = document.getElementById('contactGrid');
            if (!header || !grid) return;

            header.innerHTML = `
                <span class="section-tag">İletişim</span>
                <h2 class="section-title">Bize Ulaşın</h2>
                <div class="section-line"></div>
            `;

            const socialsHtml = contact.socials.map(s => `
                <a href="${s.url}" target="_blank" class="social-card glass-card shine-hover">
                    <div class="social-card-icon ${s.colorClass}">
                        <i class="${s.icon}"></i>
                    </div>
                    <div class="social-card-info">
                        <h4>${s.platform}</h4>
                        <span>${s.handle}</span>
                    </div>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            `).join('');

            grid.innerHTML = `
                <div class="contact-info-cards reveal">
                    <div class="contact-card glass-card shine-hover">
                        <div class="contact-card-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <h4>Adres</h4>
                        <p>${contact.address}</p>
                    </div>
                    <div class="contact-card glass-card shine-hover">
                        <div class="contact-card-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <h4>E-posta</h4>
                        <p><a href="mailto:${contact.email}">${contact.email}</a></p>
                    </div>
                </div>
                <div class="contact-socials reveal">
                    <h3>Sosyal Medya</h3>
                    <div class="social-cards">${socialsHtml}</div>
                </div>
            `;
        },

        renderFooter() {
            const contact = DataStore.get('contact');
            const footer = DataStore.get('footer');
            const contentEl = document.getElementById('footerContent');
            const bottomEl = document.getElementById('footerBottom');
            if (!contentEl || !bottomEl) return;

            const footerSocials = contact.socials.map(s =>
                `<a href="${s.url}" target="_blank" aria-label="${s.platform}"><i class="${s.icon}"></i></a>`
            ).join('');

            contentEl.innerHTML = `
                <div class="footer-brand">
                    <img src="media/logo.png" alt="UASK" class="footer-logo">
                    <p>Uzay ve Aviyonik Sistemler Kulübü</p>
                    <span>Yıldız Teknik Üniversitesi</span>
                </div>
                <div class="footer-links">
                    <a href="#home">Ana Sayfa</a>
                    <a href="#about">Hakkımızda</a>
                    <a href="#projects">Projeler</a>
                    <a href="#team">Ekip</a>
                    <a href="#contact">İletişim</a>
                </div>
                <div class="footer-socials">${footerSocials}</div>
            `;

            bottomEl.innerHTML = `<p>${footer.copyright}</p>`;
        }
    };

    // ==========================================
    // 1. INTERACTIVE PARTICLE SYSTEM
    // ==========================================
    const ParticleSystem = {
        canvas: null,
        ctx: null,
        particles: [],
        mouse: { x: null, y: null, radius: 150 },
        animationId: null,
        particleCount: 80,

        init() {
            this.canvas = document.getElementById('particles');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            this.createParticles();
            this.bindEvents();
            this.animate();
        },

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        },

        createParticles() {
            this.particles = [];
            const count = window.innerWidth < 768 ? 40 : this.particleCount;
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    baseX: 0,
                    baseY: 0,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.1,
                });
                const p = this.particles[i];
                p.baseX = p.x;
                p.baseY = p.y;
            }
        },

        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                this.createParticles();
            });

            window.addEventListener('mousemove', (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
            });

            window.addEventListener('mouseout', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        },

        getColor() {
            const theme = document.documentElement.getAttribute('data-theme');
            return theme === 'light' ? '0, 119, 182' : '0, 180, 216';
        },

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            const color = this.getColor();

            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = this.canvas.width;
                if (p.x > this.canvas.width) p.x = 0;
                if (p.y < 0) p.y = this.canvas.height;
                if (p.y > this.canvas.height) p.y = 0;

                if (this.mouse.x !== null && this.mouse.y !== null) {
                    const dx = p.x - this.mouse.x;
                    const dy = p.y - this.mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < this.mouse.radius) {
                        const force = (this.mouse.radius - dist) / this.mouse.radius;
                        p.x += dx * force * 0.03;
                        p.y += dy * force * 0.03;
                    }
                }

                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                this.ctx.fill();

                for (let j = i + 1; j < this.particles.length; j++) {
                    const p2 = this.particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const opacity = (1 - dist / 150) * 0.15;
                        this.ctx.beginPath();
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            }

            this.animationId = requestAnimationFrame(() => this.animate());
        },
    };

    // ==========================================
    // 2. THEME TOGGLE
    // ==========================================
    const ThemeManager = {
        init() {
            const toggle = document.getElementById('themeToggle');
            if (!toggle) return;

            const saved = localStorage.getItem('uask-theme') || 'dark';
            document.documentElement.setAttribute('data-theme', saved);

            toggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('uask-theme', next);
            });
        },
    };

    // ==========================================
    // 3. NAVBAR
    // ==========================================
    const Navbar = {
        init() {
            const navbar = document.getElementById('navbar');
            const hamburger = document.getElementById('navHamburger');
            const mobileMenu = document.getElementById('mobileMenu');

            if (!navbar) return;

            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                if (scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                lastScroll = scrollY;
            });

            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const id = entry.target.id;
                            navLinks.forEach((link) => {
                                link.classList.toggle('active', link.dataset.section === id);
                            });
                        }
                    });
                },
                { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
            );

            sections.forEach((s) => observer.observe(s));

            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    mobileMenu.classList.toggle('active');
                    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
                });

                mobileMenu.querySelectorAll('a').forEach((link) => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
            }
        },
    };

    // ==========================================
    // 4. SCROLL PROGRESS
    // ==========================================
    const ScrollProgress = {
        init() {
            const bar = document.getElementById('scrollProgress');
            if (!bar) return;

            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (scrollTop / docHeight) * 100;
                bar.style.width = progress + '%';
            });
        },
    };

    // ==========================================
    // 5. REVEAL ON SCROLL (Intersection Observer)
    // ==========================================
    const RevealOnScroll = {
        init() {
            const elements = document.querySelectorAll('.reveal');
            if (!elements.length) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );

            elements.forEach((el, i) => {
                el.style.transitionDelay = `${(i % 6) * 0.1}s`;
                observer.observe(el);
            });
        },
    };

    // ==========================================
    // 6. ANIMATED STATS COUNTER
    // ==========================================
    const StatsCounter = {
        animated: false,

        init() {
            const statNumbers = document.querySelectorAll('.stat-number');
            if (!statNumbers.length) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !this.animated) {
                            this.animated = true;
                            this.animateAll(statNumbers);
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.3 }
            );

            statNumbers.forEach((el) => observer.observe(el));
        },

        animateAll(elements) {
            elements.forEach((el) => {
                const target = parseInt(el.dataset.target, 10);
                this.countUp(el, target);
            });
        },

        countUp(element, target) {
            const duration = 2000;
            const startTime = performance.now();

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = Math.round(target * easedProgress);

                element.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target;
                }
            };

            requestAnimationFrame(update);
        },
    };

    // ==========================================
    // 7. TEAM FILTER & SEARCH
    // ==========================================
    const TeamFilter = {
        init() {
            const filterContainer = document.getElementById('teamFilter');
            const searchInput = document.getElementById('teamSearch');
            const teamCards = document.querySelectorAll('.team-card');
            const noResults = document.getElementById('noResults');

            if (!filterContainer || !teamCards.length) return;

            let currentFilter = 'all';
            let currentSearch = '';

            filterContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (!btn) return;
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                this.applyFilters(teamCards, currentFilter, currentSearch, noResults);
            });

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    currentSearch = e.target.value.toLowerCase().trim();
                    this.applyFilters(teamCards, currentFilter, currentSearch, noResults);
                });
            }
        },

        applyFilters(cards, filter, search, noResults) {
            let visibleCount = 0;

            cards.forEach((card) => {
                const category = card.dataset.category || '';
                const name = (card.dataset.name || '').toLowerCase();
                const dept = (card.dataset.dept || '').toLowerCase();

                const matchesFilter = filter === 'all' || category.includes(filter);
                const matchesSearch = !search || name.includes(search) || dept.includes(search);

                if (matchesFilter && matchesSearch) {
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.95)';
                }
            });

            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        },
    };

    // ==========================================
    // 8. FAQ ACCORDION
    // ==========================================
    const FAQ = {
        init() {
            const faqItems = document.querySelectorAll('.faq-item');
            if (!faqItems.length) return;

            faqItems.forEach((item) => {
                const question = item.querySelector('.faq-question');
                if (!question) return;

                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach((i) => i.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });
        },
    };

    // ==========================================
    // 9. BACK TO TOP
    // ==========================================
    const BackToTop = {
        init() {
            const btn = document.getElementById('backToTop');
            if (!btn) return;

            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
            });

            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },
    };

    // ==========================================
    // 10. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach((link) => {
                link.addEventListener('click', (e) => {
                    const targetId = link.getAttribute('href');
                    if (targetId === '#') return;

                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const offset = 80;
                        const top = target.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                    }
                });
            });
        },
    };

    // ==========================================
    // 11. TILT EFFECT ON PROJECT CARDS
    // ==========================================
    const TiltEffect = {
        init() {
            if (window.innerWidth < 768) return;

            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card) => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -3;
                    const rotateY = ((x - centerX) / centerX) * 3;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        },
    };

    // ==========================================
    // INIT ALL
    // ==========================================
    document.addEventListener('DOMContentLoaded', async () => {
        // Fetch content from API (falls back to defaults)
        await DataStore.init();
        // Render content
        ContentRenderer.init();

        // Then init all interactive modules
        ThemeManager.init();
        ParticleSystem.init();
        Navbar.init();
        ScrollProgress.init();
        RevealOnScroll.init();
        StatsCounter.init();
        TeamFilter.init();
        FAQ.init();
        BackToTop.init();
        SmoothScroll.init();
        TiltEffect.init();
    });
})();
