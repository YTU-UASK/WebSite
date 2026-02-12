/* ============================================
   UASK - Project Detail Page JavaScript
   Data-driven single template with:
   - 3D Model Viewer
   - Photo Gallery + Lightbox
   - Keyboard Navigation (surprise #1)
   - Project Comparison Drawer (surprise #2)
   - Reading Progress (surprise #3)
   ============================================ */

(function () {
    'use strict';

    // ==========================================
    // HELPERS
    // ==========================================
    function getProjectId() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id') || 'zifir';
    }

    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    }

    function getProjects() {
        return DataStore.get('projects');
    }

    function getProjectOrder() {
        return DataStore.get('projectOrder');
    }

    // ==========================================
    // PAGE RENDERER
    // ==========================================
    const PageRenderer = {
        project: null,

        init() {
            const id = getProjectId();
            const projects = getProjects();
            this.project = projects[id];
            if (!this.project) {
                window.location.href = 'index.html#projects';
                return;
            }

            document.title = `UASK - ${this.project.name}`;
            this.renderHero();
            this.renderDescription();
            this.renderSpecs();
            this.render3DModel();
            this.renderGallery();
            this.renderTeam();
            this.renderOtherProjects();
        },

        renderHero() {
            const p = this.project;
            document.getElementById('projectHeroBg').style.backgroundImage = `url('${p.image}')`;
            document.getElementById('projectTitle').textContent = p.name;
            document.getElementById('projectTagline').textContent = p.tagline;
            document.getElementById('breadcrumbName').textContent = p.name;

            const tagsEl = document.getElementById('projectTags');
            tagsEl.innerHTML = p.tech.map(t => `<span class="hero-tech-tag">${t}</span>`).join('');

            const metaEl = document.getElementById('projectMeta');
            const specs = p.specs;
            const metaItems = Object.entries(specs).slice(0, 4);
            metaEl.innerHTML = metaItems.map(([label, data]) =>
                `<div class="hero-meta-item"><i class="fas ${data.icon}"></i><span>${label}: ${data.value}</span></div>`
            ).join('');
        },

        renderDescription() {
            document.getElementById('projectDescription').innerHTML = this.project.description;
        },

        renderSpecs() {
            const p = this.project;
            let html = `<h3><i class="fas fa-clipboard-list"></i> Teknik Özellikler</h3>`;
            Object.entries(p.specs).forEach(([label, data]) => {
                html += `
                    <div class="spec-row">
                        <span class="spec-label"><i class="fas ${data.icon}"></i> ${label}</span>
                        <span class="spec-value">${data.value}</span>
                    </div>`;
            });
            document.getElementById('projectSpecs').innerHTML = html;
        },

        render3DModel() {
            const obj = document.getElementById('modelObject');
            if (this.project.modelType === 'fixedwing') {
                obj.innerHTML = `
                    <div class="model-face fuselage"></div>
                    <div class="model-face wing-main"></div>
                    <div class="model-face wing-tail"></div>
                    <div class="model-face tail-v"></div>
                `;
            } else {
                obj.innerHTML = `
                    <div class="model-face drone-body-top"></div>
                    <div class="model-face drone-body-bottom"></div>
                    <div class="model-face drone-body-front"></div>
                    <div class="model-face drone-body-back"></div>
                    <div class="model-face drone-body-left"></div>
                    <div class="model-face drone-body-right"></div>
                    <div class="drone-arm drone-arm-fl"></div>
                    <div class="drone-arm drone-arm-fr"></div>
                    <div class="drone-arm drone-arm-bl"></div>
                    <div class="drone-arm drone-arm-br"></div>
                    <div class="drone-prop drone-prop-fl"></div>
                    <div class="drone-prop drone-prop-fr"></div>
                    <div class="drone-prop drone-prop-bl"></div>
                    <div class="drone-prop drone-prop-br"></div>
                `;
            }
        },

        renderGallery() {
            const grid = document.getElementById('galleryGrid');
            grid.innerHTML = this.project.gallery.map((item, i) => `
                <div class="gallery-item" data-index="${i}">
                    <img src="${item.src}" alt="${item.caption}" loading="lazy">
                    <div class="gallery-item-overlay">
                        <span><i class="fas fa-search-plus"></i> ${item.caption}</span>
                    </div>
                </div>
            `).join('');
        },

        renderTeam() {
            const grid = document.getElementById('projectTeam');
            grid.innerHTML = this.project.team.map(m => `
                <div class="project-team-member">
                    <div class="ptm-avatar">${getInitials(m.name)}</div>
                    <div class="ptm-info">
                        <h4>${m.name}</h4>
                        <span>${m.role}</span>
                    </div>
                </div>
            `).join('');
        },

        renderOtherProjects() {
            const container = document.getElementById('otherProjects');
            const currentId = this.project.id;
            const projects = getProjects();
            const projectOrder = getProjectOrder();
            const others = projectOrder.filter(id => id !== currentId);

            container.innerHTML = others.map(id => {
                const p = projects[id];
                if (!p) return '';
                return `
                    <a href="project.html?id=${id}" class="other-project-card">
                        <div class="other-project-img">
                            <img src="${p.image}" alt="${p.name}" loading="lazy">
                        </div>
                        <div class="other-project-info">
                            <h4>${p.name}</h4>
                            <p>${p.tagline}</p>
                        </div>
                    </a>
                `;
            }).join('');
        },
    };

    // ==========================================
    // THEME MANAGER (reused from main)
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
    // PARTICLE SYSTEM (lightweight version)
    // ==========================================
    const ParticleSystem = {
        init() {
            const canvas = document.getElementById('particles');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const particles = [];

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const count = window.innerWidth < 768 ? 25 : 50;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.4 + 0.1,
                });
            }

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const theme = document.documentElement.getAttribute('data-theme');
                const color = theme === 'light' ? '0, 119, 182' : '0, 180, 216';

                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0) p.x = canvas.width;
                    if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height;
                    if (p.y > canvas.height) p.y = 0;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
                    ctx.fill();
                });
                requestAnimationFrame(animate);
            }
            animate();
        },
    };

    // ==========================================
    // 3D MODEL CONTROLS
    // ==========================================
    const ModelViewer = {
        init() {
            const obj = document.getElementById('modelObject');
            const scene = document.getElementById('modelScene');
            if (!obj || !scene) return;

            let isDragging = false;
            let startX, startY, currentRotY = 0, currentRotX = -15;
            let autoRotate = true;

            scene.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                obj.classList.add('paused');
                autoRotate = false;
                document.querySelector('[data-action="rotate"]').classList.remove('active');
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                currentRotY += dx * 0.5;
                currentRotX += dy * 0.3;
                obj.style.transform = `rotateY(${currentRotY}deg) rotateX(${currentRotX}deg)`;
                startX = e.clientX;
                startY = e.clientY;
            });

            window.addEventListener('mouseup', () => { isDragging = false; });

            scene.addEventListener('touchstart', (e) => {
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                obj.classList.add('paused');
                autoRotate = false;
            }, { passive: true });

            scene.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                const dx = e.touches[0].clientX - startX;
                const dy = e.touches[0].clientY - startY;
                currentRotY += dx * 0.5;
                currentRotX += dy * 0.3;
                obj.style.transform = `rotateY(${currentRotY}deg) rotateX(${currentRotX}deg)`;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }, { passive: true });

            scene.addEventListener('touchend', () => { isDragging = false; });

            document.querySelectorAll('.model-ctrl').forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.dataset.action;

                    if (action === 'rotate') {
                        autoRotate = !autoRotate;
                        btn.classList.toggle('active', autoRotate);
                        if (autoRotate) {
                            obj.classList.remove('paused');
                            obj.style.transform = '';
                        } else {
                            obj.classList.add('paused');
                        }
                    } else if (action === 'wireframe') {
                        obj.classList.toggle('wireframe');
                        btn.classList.toggle('active');
                    } else if (action === 'explode') {
                        obj.classList.toggle('exploded');
                        btn.classList.toggle('active');
                    } else if (action === 'reset') {
                        obj.classList.remove('wireframe', 'exploded', 'paused');
                        obj.style.transform = '';
                        autoRotate = true;
                        document.querySelectorAll('.model-ctrl').forEach(b => b.classList.remove('active'));
                        document.querySelector('[data-action="rotate"]').classList.add('active');
                        currentRotY = 0;
                        currentRotX = -15;
                    }
                });
            });
        },
    };

    // ==========================================
    // GALLERY + LIGHTBOX
    // ==========================================
    const Gallery = {
        currentIndex: 0,
        images: [],

        init() {
            const grid = document.getElementById('galleryGrid');
            const lightbox = document.getElementById('lightbox');
            if (!grid || !lightbox) return;

            const id = getProjectId();
            const projects = getProjects();
            this.images = projects[id]?.gallery || [];

            grid.addEventListener('click', (e) => {
                const item = e.target.closest('.gallery-item');
                if (!item) return;
                this.currentIndex = parseInt(item.dataset.index, 10);
                this.open();
            });

            document.getElementById('lightboxClose').addEventListener('click', () => this.close());
            document.getElementById('lightboxPrev').addEventListener('click', () => this.prev());
            document.getElementById('lightboxNext').addEventListener('click', () => this.next());

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) this.close();
            });
        },

        open() {
            this.update();
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
        },

        close() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = '';
        },

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.update();
        },

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.update();
        },

        update() {
            const img = this.images[this.currentIndex];
            document.getElementById('lightboxImg').src = img.src;
            document.getElementById('lightboxCaption').textContent = img.caption;
            document.getElementById('lightboxCounter').textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        },
    };

    // ==========================================
    // SURPRISE #1: KEYBOARD NAVIGATION
    // ==========================================
    const KeyboardNav = {
        init() {
            const currentId = getProjectId();
            const projectOrder = getProjectOrder();
            const idx = projectOrder.indexOf(currentId);

            const prevBtn = document.getElementById('prevProject');
            const nextBtn = document.getElementById('nextProject');

            const prevIdx = (idx - 1 + projectOrder.length) % projectOrder.length;
            const nextIdx = (idx + 1) % projectOrder.length;

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    window.location.href = `project.html?id=${projectOrder[prevIdx]}`;
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    window.location.href = `project.html?id=${projectOrder[nextIdx]}`;
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

                const lightbox = document.getElementById('lightbox');
                const isLightboxOpen = lightbox && lightbox.classList.contains('active');

                if (isLightboxOpen) {
                    if (e.key === 'Escape') Gallery.close();
                    if (e.key === 'ArrowLeft') Gallery.prev();
                    if (e.key === 'ArrowRight') Gallery.next();
                    return;
                }

                if (e.key === 'ArrowLeft') {
                    window.location.href = `project.html?id=${projectOrder[prevIdx]}`;
                } else if (e.key === 'ArrowRight') {
                    window.location.href = `project.html?id=${projectOrder[nextIdx]}`;
                } else if (e.key === 'Escape') {
                    window.location.href = 'index.html#projects';
                } else if (e.key.toLowerCase() === 'c') {
                    Comparison.toggle();
                } else if (e.key.toLowerCase() === 'g') {
                    const gallery = document.getElementById('gallerySection');
                    if (gallery) {
                        gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });

            const hintBtn = document.getElementById('kbdHint');
            const tooltip = document.getElementById('kbdTooltip');
            if (hintBtn && tooltip) {
                hintBtn.addEventListener('click', () => {
                    tooltip.classList.toggle('visible');
                });
                document.addEventListener('click', (e) => {
                    if (!hintBtn.contains(e.target) && !tooltip.contains(e.target)) {
                        tooltip.classList.remove('visible');
                    }
                });
            }
        },
    };

    // ==========================================
    // SURPRISE #2: PROJECT COMPARISON DRAWER
    // ==========================================
    const Comparison = {
        init() {
            const closeBtn = document.getElementById('comparisonClose');
            const overlay = document.getElementById('comparisonOverlay');

            if (closeBtn) closeBtn.addEventListener('click', () => this.close());
            if (overlay) overlay.addEventListener('click', () => this.close());

            this.buildTable();
        },

        toggle() {
            const drawer = document.getElementById('comparisonDrawer');
            const overlay = document.getElementById('comparisonOverlay');
            if (!drawer) return;

            const isActive = drawer.classList.contains('active');
            if (isActive) {
                this.close();
            } else {
                drawer.classList.add('active');
                overlay.classList.add('active');
            }
        },

        close() {
            document.getElementById('comparisonDrawer')?.classList.remove('active');
            document.getElementById('comparisonOverlay')?.classList.remove('active');
        },

        buildTable() {
            const body = document.getElementById('comparisonBody');
            if (!body) return;

            const currentId = getProjectId();
            const projects = getProjects();
            const projectOrder = getProjectOrder();

            const allSpecs = ['Uçuş Süresi', 'Menzil', 'Ekip', 'Süre', 'Ağırlık'];

            let html = '<table class="comparison-table"><thead><tr><th>Özellik</th>';
            projectOrder.forEach(id => {
                const p = projects[id];
                if (!p) return;
                const isCurrent = id === currentId;
                html += `<th${isCurrent ? ' class="highlight"' : ''}>${p.name}</th>`;
            });
            html += '</tr></thead><tbody>';

            allSpecs.forEach(spec => {
                html += '<tr>';
                html += `<th>${spec}</th>`;
                projectOrder.forEach(id => {
                    const p = projects[id];
                    if (!p) return;
                    const val = p.specs[spec]?.value || '-';
                    const isCurrent = id === currentId;
                    html += `<td${isCurrent ? ' class="highlight"' : ''}>${val}</td>`;
                });
                html += '</tr>';
            });

            html += '</tbody></table>';
            body.innerHTML = html;
        },
    };

    // ==========================================
    // SURPRISE #3: READING PROGRESS
    // ==========================================
    const ReadingProgress = {
        init() {
            const bar = document.getElementById('readingProgress');
            if (!bar) return;

            window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                bar.style.width = progress + '%';
            });
        },
    };

    // ==========================================
    // REVEAL ON SCROLL
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
                el.style.transitionDelay = `${(i % 4) * 0.1}s`;
                observer.observe(el);
            });
        },
    };

    // ==========================================
    // NAVBAR + BACK TO TOP
    // ==========================================
    const Navbar = {
        init() {
            const navbar = document.getElementById('navbar');
            if (!navbar) return;
            window.addEventListener('scroll', () => {
                navbar.classList.toggle('scrolled', window.scrollY > 50);
            });
        },
    };

    const BackToTop = {
        init() {
            const btn = document.getElementById('backToTop');
            if (!btn) return;
            window.addEventListener('scroll', () => {
                btn.classList.toggle('visible', window.scrollY > 500);
            });
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },
    };

    // ==========================================
    // INIT ALL
    // ==========================================
    document.addEventListener('DOMContentLoaded', async () => {
        await DataStore.init();
        ThemeManager.init();
        ParticleSystem.init();
        PageRenderer.init();
        ModelViewer.init();
        Gallery.init();
        KeyboardNav.init();
        Comparison.init();
        ReadingProgress.init();
        RevealOnScroll.init();
        Navbar.init();
        BackToTop.init();
    });
})();
