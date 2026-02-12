/* ============================================
   UASK - Admin Panel JavaScript
   Auth, Dashboard, CRUD for all sections
   ============================================ */

(function () {
    'use strict';

    // ==========================================
    // UTILS
    // ==========================================
    function toast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const el = document.createElement('div');
        el.className = `toast ${type}`;
        el.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
        container.appendChild(el);
        setTimeout(() => {
            el.classList.add('removing');
            setTimeout(() => el.remove(), 300);
        }, 3000);
    }

    function escHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ==========================================
    // LOCAL DATASTORE (shadows global, uses API)
    // ==========================================
    const DataStore = {
        _cache: {},
        _token: null,

        getToken() {
            if (!this._token) this._token = sessionStorage.getItem('uask-admin-token');
            return this._token;
        },

        async init() {
            try {
                const res = await fetch('/api/content');
                if (res.ok) this._cache = await res.json();
            } catch (e) {
                console.warn('API unavailable');
            }
        },

        get(key) {
            if (this._cache[key] !== undefined) {
                return JSON.parse(JSON.stringify(this._cache[key]));
            }
            return JSON.parse(JSON.stringify(DEFAULT_DATA[key]));
        },

        set(key, value) {
            this._cache[key] = JSON.parse(JSON.stringify(value));
            fetch('/api/admin/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({ key, data: value })
            }).then(res => {
                if (!res.ok) {
                    if (res.status === 401) { toast('Oturum süresi doldu, tekrar giriş yapın.', 'error'); return; }
                    toast('Sunucu kayıt hatası!', 'error');
                }
            }).catch(() => toast('Sunucu bağlantı hatası!', 'error'));
        },

        reset(key) {
            delete this._cache[key];
            fetch('/api/admin/content', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.getToken()}`
                },
                body: JSON.stringify({ key })
            }).catch(() => toast('Sunucu bağlantı hatası!', 'error'));
        },

        resetAll() {
            this._cache = {};
        }
    };

    // ==========================================
    // AUTH (API-based)
    // ==========================================
    const Auth = {
        init() {
            const form = document.getElementById('loginForm');
            const logoutBtn = document.getElementById('logoutBtn');

            const token = sessionStorage.getItem('uask-admin-token');
            if (token) {
                DataStore._token = token;
                this.showDashboard();
            }

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const u = document.getElementById('username').value.trim();
                const p = document.getElementById('password').value;
                const err = document.getElementById('loginError');
                const btn = form.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.querySelector('span').textContent = 'Giriş yapılıyor...';

                try {
                    const res = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: u, password: p })
                    });

                    if (res.ok) {
                        const { token } = await res.json();
                        sessionStorage.setItem('uask-admin-token', token);
                        DataStore._token = token;
                        err.textContent = '';
                        this.showDashboard();
                    } else {
                        err.textContent = 'Kullanıcı adı veya şifre hatalı!';
                    }
                } catch {
                    err.textContent = 'Sunucuya bağlanılamadı!';
                }

                btn.disabled = false;
                btn.querySelector('span').textContent = 'Giriş Yap';
            });

            logoutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('uask-admin-token');
                DataStore._token = null;
                location.reload();
            });
        },

        showDashboard() {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            Dashboard.init();
        }
    };

    // ==========================================
    // THEME
    // ==========================================
    const Theme = {
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
        }
    };

    // ==========================================
    // PARTICLES (lightweight)
    // ==========================================
    const Particles = {
        init() {
            const canvas = document.getElementById('particles');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const pts = [];
            function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
            resize();
            window.addEventListener('resize', resize);
            for (let i = 0; i < 30; i++) {
                pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.3 + 0.1 });
            }
            (function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const theme = document.documentElement.getAttribute('data-theme');
                const color = theme === 'light' ? '0, 119, 182' : '0, 180, 216';
                pts.forEach(p => {
                    p.x += p.vx; p.y += p.vy;
                    if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                    if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${color}, ${p.opacity})`; ctx.fill();
                });
                requestAnimationFrame(animate);
            })();
        }
    };

    // ==========================================
    // MODAL
    // ==========================================
    const Modal = {
        onSave: null,

        init() {
            document.getElementById('modalClose').addEventListener('click', () => this.close());
            document.getElementById('modalCancel').addEventListener('click', () => this.close());
            document.getElementById('modalOverlay').addEventListener('click', (e) => {
                if (e.target === e.currentTarget) this.close();
            });
            document.getElementById('modalSave').addEventListener('click', () => {
                if (this.onSave) this.onSave();
            });
        },

        open(title, bodyHtml, saveFn) {
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalBody').innerHTML = bodyHtml;
            this.onSave = saveFn;
            document.getElementById('modalOverlay').classList.add('active');
        },

        close() {
            document.getElementById('modalOverlay').classList.remove('active');
            this.onSave = null;
        }
    };

    // ==========================================
    // SIDEBAR NAVIGATION
    // ==========================================
    const Sidebar = {
        init() {
            const sidebar = document.getElementById('adminSidebar');
            sidebar.addEventListener('click', (e) => {
                const item = e.target.closest('.sidebar-item');
                if (!item) return;
                sidebar.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const tab = item.dataset.tab;
                TabManager.show(tab);
            });
        }
    };

    // ==========================================
    // TAB MANAGER
    // ==========================================
    const TabManager = {
        show(tab) {
            const content = document.getElementById('adminContent');
            switch (tab) {
                case 'dashboard': DashboardTab.render(content); break;
                case 'hero': HeroTab.render(content); break;
                case 'about': AboutTab.render(content); break;
                case 'stats': StatsTab.render(content); break;
                case 'projects': ProjectsTab.render(content); break;
                case 'timeline': TimelineTab.render(content); break;
                case 'team': TeamTab.render(content); break;
                case 'faq': FAQTab.render(content); break;
                case 'contact': ContactTab.render(content); break;
            }
        }
    };

    // ==========================================
    // DASHBOARD TAB
    // ==========================================
    const DashboardTab = {
        render(container) {
            const stats = DataStore.get('stats');
            const projects = DataStore.get('projects');
            const projectOrder = DataStore.get('projectOrder');
            const timeline = DataStore.get('timeline');
            const team = DataStore.get('team');
            const faq = DataStore.get('faq');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-tachometer-alt" style="color:var(--accent-primary);margin-right:8px;"></i> Dashboard</h2>
                </div>
                <div class="dashboard-grid">
                    <div class="dashboard-card glass-card">
                        <div class="dc-icon"><i class="fas fa-chart-bar"></i></div>
                        <div class="dc-info"><h3>${stats.length}</h3><p>İstatistik</p></div>
                    </div>
                    <div class="dashboard-card glass-card">
                        <div class="dc-icon"><i class="fas fa-project-diagram"></i></div>
                        <div class="dc-info"><h3>${projectOrder.length}</h3><p>Proje</p></div>
                    </div>
                    <div class="dashboard-card glass-card">
                        <div class="dc-icon"><i class="fas fa-stream"></i></div>
                        <div class="dc-info"><h3>${timeline.length}</h3><p>Zaman Çizelgesi</p></div>
                    </div>
                    <div class="dashboard-card glass-card">
                        <div class="dc-icon"><i class="fas fa-users"></i></div>
                        <div class="dc-info"><h3>${team.length}</h3><p>Ekip Üyesi</p></div>
                    </div>
                    <div class="dashboard-card glass-card">
                        <div class="dc-icon"><i class="fas fa-question-circle"></i></div>
                        <div class="dc-info"><h3>${faq.length}</h3><p>SSS</p></div>
                    </div>
                </div>
                <div class="edit-form">
                    <h3><i class="fas fa-info-circle"></i> Hızlı Bilgi</h3>
                    <p style="color:var(--text-secondary);font-size:14px;line-height:1.8;">
                        Sol menüden ilgili bölümü seçerek web sitesinin tüm içeriğini yönetebilirsiniz.
                        Yaptığınız değişiklikler MongoDB veritabanına kaydedilir
                        ve ana sitede anında yansıtılır. "Varsayılana Sıfırla" butonu ile herhangi bir bölümü
                        orijinal haline geri döndürebilirsiniz.
                    </p>
                </div>
                <div class="edit-form">
                    <h3><i class="fas fa-database"></i> Veritabanı</h3>
                    <p style="color:var(--text-secondary);font-size:14px;line-height:1.8;margin-bottom:16px;">
                        İlk kurulumda veritabanını varsayılan içerikle doldurmak için aşağıdaki butona tıklayın.
                        Bu işlem mevcut verilerinizin üzerine yazar.
                    </p>
                    <button class="btn btn-sm btn-danger" onclick="AdminApp.seedDatabase()"><i class="fas fa-exclamation-triangle"></i> Veritabanını Varsayılanlarla Doldur</button>
                </div>
            `;
        }
    };

    // ==========================================
    // HERO TAB
    // ==========================================
    const HeroTab = {
        render(container) {
            const hero = DataStore.get('hero');
            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-home" style="color:var(--accent-primary);margin-right:8px;"></i> Hero Bölümü</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('hero')"><i class="fas fa-undo"></i> Varsayılana Sıfırla</button>
                    </div>
                </div>
                <div class="edit-form">
                    <div class="form-group">
                        <label><i class="fas fa-tag"></i> Rozet Metni</label>
                        <input type="text" id="heroBadgeText" value="${escHtml(hero.badge.text)}">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-heading"></i> Başlık Satır 1</label>
                            <input type="text" id="heroLine1" value="${escHtml(hero.titleLine1)}">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-heading"></i> Başlık Satır 2</label>
                            <input type="text" id="heroLine2" value="${escHtml(hero.titleLine2)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-star"></i> Vurgulanan Kelime</label>
                        <input type="text" id="heroHighlight" value="${escHtml(hero.titleHighlight)}">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-align-left"></i> Açıklama</label>
                        <textarea id="heroDesc">${escHtml(hero.description)}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-mouse-pointer"></i> Buton Metni</label>
                            <input type="text" id="heroButtonText" value="${escHtml(hero.buttonText)}">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-link"></i> Buton Linki</label>
                            <input type="text" id="heroButtonLink" value="${escHtml(hero.buttonLink)}">
                        </div>
                    </div>
                    <button class="btn btn-sm btn-save" onclick="AdminApp.saveHero()"><i class="fas fa-save"></i> Kaydet</button>
                </div>
            `;
        }
    };

    // ==========================================
    // ABOUT TAB
    // ==========================================
    const AboutTab = {
        render(container) {
            const about = DataStore.get('about');
            const featuresHtml = about.features.map((f, i) => `
                <div class="sub-item">
                    <div class="crud-item-icon"><i class="fas ${f.icon}"></i></div>
                    <div class="sub-item-text"><strong>${escHtml(f.title)}</strong> — ${escHtml(f.desc)}</div>
                    <button class="sub-item-remove" onclick="AdminApp.removeAboutFeature(${i})"><i class="fas fa-times"></i></button>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-info-circle" style="color:var(--accent-primary);margin-right:8px;"></i> Hakkımızda</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('about')"><i class="fas fa-undo"></i> Varsayılana Sıfırla</button>
                    </div>
                </div>
                <div class="edit-form">
                    <div class="form-group">
                        <label><i class="fas fa-heading"></i> Bölüm Başlığı</label>
                        <input type="text" id="aboutTitle" value="${escHtml(about.title)}">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-align-left"></i> Paragraf 1</label>
                        <textarea id="aboutP1">${escHtml(about.paragraphs[0] || '')}</textarea>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-align-left"></i> Paragraf 2</label>
                        <textarea id="aboutP2">${escHtml(about.paragraphs[1] || '')}</textarea>
                    </div>
                    <div class="sub-items">
                        <h4><i class="fas fa-list" style="color:var(--accent-primary);margin-right:6px;"></i> Özellikler</h4>
                        ${featuresHtml}
                        <button class="btn btn-sm btn-add" style="margin-top:12px;" onclick="AdminApp.addAboutFeature()"><i class="fas fa-plus"></i> Özellik Ekle</button>
                    </div>
                    <hr class="section-sep">
                    <h3 style="margin-bottom:16px;"><i class="fas fa-users" style="color:var(--accent-primary);margin-right:8px;"></i> FPV Topluluk Kartı</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-heading"></i> Topluluk Adı</label>
                            <input type="text" id="communityTitle" value="${escHtml(about.community.title)}">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-image"></i> Görsel URL</label>
                            <input type="text" id="communityImage" value="${escHtml(about.community.image)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-align-left"></i> Açıklama</label>
                        <textarea id="communityDesc">${escHtml(about.community.description)}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-link"></i> Link URL</label>
                            <input type="text" id="communityLink" value="${escHtml(about.community.linkUrl)}">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-at"></i> Link Metni</label>
                            <input type="text" id="communityLinkText" value="${escHtml(about.community.linkText)}">
                        </div>
                    </div>
                    <button class="btn btn-sm btn-save" onclick="AdminApp.saveAbout()"><i class="fas fa-save"></i> Kaydet</button>
                </div>
            `;
        }
    };

    // ==========================================
    // STATS TAB
    // ==========================================
    const StatsTab = {
        render(container) {
            const stats = DataStore.get('stats');
            const listHtml = stats.map((s, i) => `
                <div class="crud-item">
                    <div class="crud-item-icon"><i class="fas ${s.icon}"></i></div>
                    <div class="crud-item-info">
                        <h4>${s.target}${s.suffix} — ${escHtml(s.label)}</h4>
                        <p>İkon: ${s.icon}</p>
                    </div>
                    <div class="crud-item-actions">
                        <button class="crud-btn" onclick="AdminApp.editStat(${i})" title="Düzenle"><i class="fas fa-edit"></i></button>
                        <button class="crud-btn delete" onclick="AdminApp.deleteStat(${i})" title="Sil"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-chart-bar" style="color:var(--accent-primary);margin-right:8px;"></i> İstatistikler</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-add" onclick="AdminApp.addStat()"><i class="fas fa-plus"></i> Yeni Ekle</button>
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('stats')"><i class="fas fa-undo"></i> Sıfırla</button>
                    </div>
                </div>
                <div class="crud-list">${listHtml}</div>
            `;
        }
    };

    // ==========================================
    // PROJECTS TAB
    // ==========================================
    const ProjectsTab = {
        render(container) {
            const projects = DataStore.get('projects');
            const projectOrder = DataStore.get('projectOrder');

            const listHtml = projectOrder.map(id => {
                const p = projects[id];
                if (!p) return '';
                const tags = p.tech.map(t => `<span>${t}</span>`).join('');
                return `
                    <div class="project-admin-card">
                        <div class="project-admin-thumb"><img src="../${p.image}" alt="${escHtml(p.name)}"></div>
                        <div class="project-admin-info">
                            <h4>${escHtml(p.name)}</h4>
                            <p>${escHtml(p.tagline)}</p>
                            <div class="project-admin-tags">${tags}</div>
                        </div>
                        <div class="crud-item-actions">
                            <button class="crud-btn" onclick="AdminApp.editProject('${id}')" title="Düzenle"><i class="fas fa-edit"></i></button>
                            <button class="crud-btn delete" onclick="AdminApp.deleteProject('${id}')" title="Sil"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-project-diagram" style="color:var(--accent-primary);margin-right:8px;"></i> Projeler</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-add" onclick="AdminApp.addProject()"><i class="fas fa-plus"></i> Yeni Proje</button>
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('projects')"><i class="fas fa-undo"></i> Sıfırla</button>
                    </div>
                </div>
                ${listHtml}
            `;
        }
    };

    // ==========================================
    // PROJECT EDITOR (full page)
    // ==========================================
    const ProjectEditor = {
        projectId: null,
        isNew: false,

        render(container, id, isNew) {
            this.projectId = id;
            this.isNew = isNew;
            const projects = DataStore.get('projects');
            const p = isNew ? {
                id: '', name: '', tagline: '', image: '', status: 'Devam Ediyor',
                tech: [], cardDescription: '', cardStats: [],
                specs: {}, modelType: 'quadcopter', description: '',
                gallery: [], team: []
            } : projects[id];

            if (!p && !isNew) { ProjectsTab.render(container); return; }

            const techStr = (p.tech || []).join(', ');

            // Card Stats list
            const cardStatsHtml = (p.cardStats || []).map((s, i) => `
                <div class="sub-item">
                    <div class="crud-item-icon" style="width:28px;height:28px;min-width:28px;border-radius:6px;font-size:12px;"><i class="fas ${s.icon}"></i></div>
                    <div class="sub-item-text">${escHtml(s.text)}</div>
                    <button class="sub-item-remove" onclick="AdminApp.removeProjectCardStat(${i})"><i class="fas fa-times"></i></button>
                </div>
            `).join('');

            // Specs list
            const specsHtml = Object.entries(p.specs || {}).map(([label, data], i) => `
                <div class="sub-item">
                    <div class="crud-item-icon" style="width:28px;height:28px;min-width:28px;border-radius:6px;font-size:12px;"><i class="fas ${data.icon}"></i></div>
                    <div class="sub-item-text"><strong>${escHtml(label)}</strong>: ${escHtml(data.value)}</div>
                    <button class="sub-item-remove" onclick="AdminApp.removeProjectSpec('${escHtml(label)}')"><i class="fas fa-times"></i></button>
                </div>
            `).join('');

            // Gallery list
            const galleryHtml = (p.gallery || []).map((g, i) => `
                <div class="sub-item">
                    <div class="crud-item-icon" style="width:28px;height:28px;min-width:28px;border-radius:6px;font-size:12px;"><i class="fas fa-image"></i></div>
                    <div class="sub-item-text"><strong>${escHtml(g.caption)}</strong><br><span style="font-size:11px;color:var(--text-muted);">${escHtml(g.src)}</span></div>
                    <button class="sub-item-remove" onclick="AdminApp.removeProjectGallery(${i})"><i class="fas fa-times"></i></button>
                </div>
            `).join('');

            // Team list
            const teamHtml = (p.team || []).map((m, i) => `
                <div class="sub-item">
                    <div class="crud-item-icon" style="width:28px;height:28px;min-width:28px;border-radius:6px;font-size:12px;"><i class="fas fa-user"></i></div>
                    <div class="sub-item-text"><strong>${escHtml(m.name)}</strong> — ${escHtml(m.role)}</div>
                    <button class="sub-item-remove" onclick="AdminApp.removeProjectTeamMember(${i})"><i class="fas fa-times"></i></button>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2>
                        <button class="btn-sm btn-reset" onclick="AdminApp.backToProjects()" style="margin-right:8px;"><i class="fas fa-arrow-left"></i></button>
                        <i class="fas fa-edit" style="color:var(--accent-primary);margin-right:8px;"></i>
                        ${isNew ? 'Yeni Proje' : escHtml(p.name) + ' — Düzenle'}
                    </h2>
                </div>

                <!-- Basic Info -->
                <div class="edit-form">
                    <h3><i class="fas fa-info-circle"></i> Temel Bilgiler</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-fingerprint"></i> Proje ID</label>
                            <input type="text" id="peId" value="${escHtml(p.id)}" ${isNew ? '' : 'readonly'} placeholder="proje-id">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-heading"></i> Proje Adı</label>
                            <input type="text" id="peName" value="${escHtml(p.name)}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-quote-left"></i> Kısa Tanım (Tagline)</label>
                        <input type="text" id="peTagline" value="${escHtml(p.tagline)}">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label><i class="fas fa-image"></i> Kapak Görseli URL</label>
                            <input type="text" id="peImage" value="${escHtml(p.image)}">
                        </div>
                        <div class="form-group">
                            <label><i class="fas fa-info-circle"></i> Durum</label>
                            <select id="peStatus">
                                <option value="Tamamlandı" ${p.status === 'Tamamlandı' ? 'selected' : ''}>Tamamlandı</option>
                                <option value="Devam Ediyor" ${p.status === 'Devam Ediyor' ? 'selected' : ''}>Devam Ediyor</option>
                                <option value="Planlama" ${p.status === 'Planlama' ? 'selected' : ''}>Planlama</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-tags"></i> Teknolojiler (virgülle ayırın)</label>
                        <input type="text" id="peTech" value="${escHtml(techStr)}">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-align-left"></i> Kart Açıklaması (ana sayfadaki)</label>
                        <textarea id="peCardDesc">${escHtml(p.cardDescription)}</textarea>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-cube"></i> 3D Model Tipi</label>
                        <select id="peModelType">
                            <option value="quadcopter" ${p.modelType === 'quadcopter' ? 'selected' : ''}>Quadcopter</option>
                            <option value="fixedwing" ${p.modelType === 'fixedwing' ? 'selected' : ''}>Sabit Kanat</option>
                        </select>
                    </div>
                </div>

                <!-- Card Stats -->
                <div class="edit-form">
                    <h3><i class="fas fa-chart-pie"></i> Kart İstatistikleri</h3>
                    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Ana sayfadaki proje kartında gösterilen istatistikler</p>
                    <div class="sub-items">
                        ${cardStatsHtml || '<p style="color:var(--text-muted);font-size:13px;">Henüz istatistik yok</p>'}
                        <button class="btn btn-sm btn-add" style="margin-top:12px;" onclick="AdminApp.addProjectCardStat()"><i class="fas fa-plus"></i> İstatistik Ekle</button>
                    </div>
                </div>

                <!-- Specs -->
                <div class="edit-form">
                    <h3><i class="fas fa-clipboard-list"></i> Teknik Özellikler</h3>
                    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">Proje detay sayfasındaki teknik özellikler tablosu</p>
                    <div class="sub-items">
                        ${specsHtml || '<p style="color:var(--text-muted);font-size:13px;">Henüz özellik yok</p>'}
                        <button class="btn btn-sm btn-add" style="margin-top:12px;" onclick="AdminApp.addProjectSpec()"><i class="fas fa-plus"></i> Özellik Ekle</button>
                    </div>
                </div>

                <!-- Description -->
                <div class="edit-form">
                    <h3><i class="fas fa-file-alt"></i> Detay Sayfası İçerik</h3>
                    <p style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">HTML destekler: &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;</p>
                    <div class="form-group">
                        <textarea id="peDescription" style="min-height:250px;">${p.description || ''}</textarea>
                    </div>
                </div>

                <!-- Gallery -->
                <div class="edit-form">
                    <h3><i class="fas fa-images"></i> Fotoğraf Galerisi</h3>
                    <div class="sub-items">
                        ${galleryHtml || '<p style="color:var(--text-muted);font-size:13px;">Henüz fotoğraf yok</p>'}
                        <button class="btn btn-sm btn-add" style="margin-top:12px;" onclick="AdminApp.addProjectGallery()"><i class="fas fa-plus"></i> Fotoğraf Ekle</button>
                    </div>
                </div>

                <!-- Project Team -->
                <div class="edit-form">
                    <h3><i class="fas fa-users"></i> Proje Ekibi</h3>
                    <div class="sub-items">
                        ${teamHtml || '<p style="color:var(--text-muted);font-size:13px;">Henüz ekip üyesi yok</p>'}
                        <button class="btn btn-sm btn-add" style="margin-top:12px;" onclick="AdminApp.addProjectTeamMember()"><i class="fas fa-plus"></i> Ekip Üyesi Ekle</button>
                    </div>
                </div>

                <!-- Save -->
                <div style="display:flex;gap:12px;margin-top:8px;">
                    <button class="btn btn-primary" onclick="AdminApp.saveFullProject()"><i class="fas fa-save"></i> Projeyi Kaydet</button>
                    <button class="btn btn-glass" onclick="AdminApp.backToProjects()">İptal</button>
                </div>
            `;
        }
    };

    // ==========================================
    // TIMELINE TAB
    // ==========================================
    const TimelineTab = {
        render(container) {
            const timeline = DataStore.get('timeline');
            const listHtml = timeline.map((t, i) => `
                <div class="crud-item">
                    <div class="crud-item-icon"><i class="fas ${t.icon}"></i></div>
                    <div class="crud-item-info">
                        <h4>${escHtml(t.title)}</h4>
                        <p>${escHtml(t.date)} — ${escHtml(t.description).substring(0, 60)}...</p>
                    </div>
                    <div class="crud-item-actions">
                        <button class="crud-btn" onclick="AdminApp.editTimeline(${i})" title="Düzenle"><i class="fas fa-edit"></i></button>
                        <button class="crud-btn delete" onclick="AdminApp.deleteTimeline(${i})" title="Sil"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-stream" style="color:var(--accent-primary);margin-right:8px;"></i> Zaman Çizelgesi</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-add" onclick="AdminApp.addTimeline()"><i class="fas fa-plus"></i> Yeni Ekle</button>
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('timeline')"><i class="fas fa-undo"></i> Sıfırla</button>
                    </div>
                </div>
                <div class="crud-list">${listHtml}</div>
            `;
        }
    };

    // ==========================================
    // TEAM TAB
    // ==========================================
    const TeamTab = {
        render(container) {
            const team = DataStore.get('team');
            const listHtml = team.map((m, i) => `
                <div class="crud-item">
                    <div class="crud-item-icon"><i class="fas fa-user"></i></div>
                    <div class="crud-item-info">
                        <h4>${escHtml(m.name)}</h4>
                        <p>${escHtml(m.role)} — ${escHtml(m.board)}</p>
                    </div>
                    <div class="crud-item-actions">
                        <button class="crud-btn" onclick="AdminApp.editTeamMember(${i})" title="Düzenle"><i class="fas fa-edit"></i></button>
                        <button class="crud-btn delete" onclick="AdminApp.deleteTeamMember(${i})" title="Sil"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-users" style="color:var(--accent-primary);margin-right:8px;"></i> Ekip</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-add" onclick="AdminApp.addTeamMember()"><i class="fas fa-plus"></i> Yeni Üye</button>
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('team')"><i class="fas fa-undo"></i> Sıfırla</button>
                    </div>
                </div>
                <div class="crud-list">${listHtml}</div>
            `;
        }
    };

    // ==========================================
    // FAQ TAB
    // ==========================================
    const FAQTab = {
        render(container) {
            const faq = DataStore.get('faq');
            const listHtml = faq.map((f, i) => `
                <div class="crud-item">
                    <div class="crud-item-icon"><i class="fas fa-question"></i></div>
                    <div class="crud-item-info">
                        <h4>${escHtml(f.question)}</h4>
                        <p>${escHtml(f.answer).substring(0, 80)}...</p>
                    </div>
                    <div class="crud-item-actions">
                        <button class="crud-btn" onclick="AdminApp.editFAQ(${i})" title="Düzenle"><i class="fas fa-edit"></i></button>
                        <button class="crud-btn delete" onclick="AdminApp.deleteFAQ(${i})" title="Sil"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-question-circle" style="color:var(--accent-primary);margin-right:8px;"></i> Sıkça Sorulan Sorular</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-add" onclick="AdminApp.addFAQ()"><i class="fas fa-plus"></i> Yeni Soru</button>
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('faq')"><i class="fas fa-undo"></i> Sıfırla</button>
                    </div>
                </div>
                <div class="crud-list">${listHtml}</div>
            `;
        }
    };

    // ==========================================
    // CONTACT TAB
    // ==========================================
    const ContactTab = {
        render(container) {
            const contact = DataStore.get('contact');
            const socialsHtml = contact.socials.map((s, i) => `
                <div class="sub-item">
                    <div class="crud-item-icon"><i class="${s.icon}"></i></div>
                    <div class="sub-item-text"><strong>${escHtml(s.platform)}</strong> — ${escHtml(s.handle)}</div>
                    <button class="sub-item-remove" onclick="AdminApp.removeContactSocial(${i})"><i class="fas fa-times"></i></button>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="content-header">
                    <h2><i class="fas fa-envelope" style="color:var(--accent-primary);margin-right:8px;"></i> İletişim</h2>
                    <div class="content-header-actions">
                        <button class="btn-sm btn-reset" onclick="AdminApp.resetSection('contact')"><i class="fas fa-undo"></i> Sıfırla</button>
                    </div>
                </div>
                <div class="edit-form">
                    <div class="form-group">
                        <label><i class="fas fa-map-marker-alt"></i> Adres (HTML)</label>
                        <textarea id="contactAddress">${contact.address}</textarea>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-envelope"></i> E-posta</label>
                        <input type="email" id="contactEmail" value="${escHtml(contact.email)}">
                    </div>
                    <div class="sub-items">
                        <h4><i class="fas fa-share-alt" style="color:var(--accent-primary);margin-right:6px;"></i> Sosyal Medya</h4>
                        ${socialsHtml}
                        <button class="btn btn-sm btn-add" style="margin-top:12px;" onclick="AdminApp.addContactSocial()"><i class="fas fa-plus"></i> Sosyal Medya Ekle</button>
                    </div>
                    <hr class="section-sep">
                    <button class="btn btn-sm btn-save" onclick="AdminApp.saveContact()"><i class="fas fa-save"></i> Kaydet</button>
                </div>
            `;
        }
    };

    // ==========================================
    // ADMIN APP (global actions)
    // ==========================================
    window.AdminApp = {
        // --- RESET ---
        resetSection(key) {
            if (!confirm('Bu bölümü varsayılan haline sıfırlamak istediğinize emin misiniz?')) return;
            DataStore.reset(key);
            if (key === 'projects') DataStore.reset('projectOrder');
            toast('Bölüm varsayılan haline sıfırlandı.');
            TabManager.show(key === 'projectOrder' ? 'projects' : key);
        },

        // --- HERO ---
        saveHero() {
            const hero = DataStore.get('hero');
            hero.badge.text = document.getElementById('heroBadgeText').value;
            hero.titleLine1 = document.getElementById('heroLine1').value;
            hero.titleLine2 = document.getElementById('heroLine2').value;
            hero.titleHighlight = document.getElementById('heroHighlight').value;
            hero.description = document.getElementById('heroDesc').value;
            hero.buttonText = document.getElementById('heroButtonText').value;
            hero.buttonLink = document.getElementById('heroButtonLink').value;
            DataStore.set('hero', hero);
            toast('Hero bölümü kaydedildi!');
        },

        // --- ABOUT ---
        saveAbout() {
            const about = DataStore.get('about');
            about.title = document.getElementById('aboutTitle').value;
            about.paragraphs = [
                document.getElementById('aboutP1').value,
                document.getElementById('aboutP2').value
            ];
            about.community.title = document.getElementById('communityTitle').value;
            about.community.image = document.getElementById('communityImage').value;
            about.community.description = document.getElementById('communityDesc').value;
            about.community.linkUrl = document.getElementById('communityLink').value;
            about.community.linkText = document.getElementById('communityLinkText').value;
            DataStore.set('about', about);
            toast('Hakkımızda bölümü kaydedildi!');
        },

        addAboutFeature() {
            Modal.open('Yeni Özellik', `
                <div class="form-group">
                    <label><i class="fas fa-icons"></i> İkon (FA sınıfı)</label>
                    <input type="text" id="mFeatureIcon" placeholder="fa-satellite-dish">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-heading"></i> Başlık</label>
                    <input type="text" id="mFeatureTitle" placeholder="Özellik başlığı">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-align-left"></i> Açıklama</label>
                    <input type="text" id="mFeatureDesc" placeholder="Kısa açıklama">
                </div>
            `, () => {
                const about = DataStore.get('about');
                about.features.push({
                    icon: document.getElementById('mFeatureIcon').value || 'fa-star',
                    title: document.getElementById('mFeatureTitle').value,
                    desc: document.getElementById('mFeatureDesc').value
                });
                DataStore.set('about', about);
                Modal.close();
                toast('Özellik eklendi!');
                AboutTab.render(document.getElementById('adminContent'));
            });
        },

        removeAboutFeature(i) {
            const about = DataStore.get('about');
            about.features.splice(i, 1);
            DataStore.set('about', about);
            toast('Özellik silindi.');
            AboutTab.render(document.getElementById('adminContent'));
        },

        // --- STATS ---
        addStat() {
            this._openStatModal('Yeni İstatistik', { icon: '', target: 0, suffix: '+', label: '' }, -1);
        },

        editStat(i) {
            const stats = DataStore.get('stats');
            this._openStatModal('İstatistik Düzenle', stats[i], i);
        },

        _openStatModal(title, stat, index) {
            Modal.open(title, `
                <div class="form-group">
                    <label><i class="fas fa-icons"></i> İkon (FA sınıfı)</label>
                    <input type="text" id="mStatIcon" value="${escHtml(stat.icon)}" placeholder="fa-users">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-hashtag"></i> Hedef Değer</label>
                        <input type="number" id="mStatTarget" value="${stat.target}">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-plus"></i> Sonek</label>
                        <input type="text" id="mStatSuffix" value="${escHtml(stat.suffix)}" placeholder="+">
                    </div>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-tag"></i> Etiket</label>
                    <input type="text" id="mStatLabel" value="${escHtml(stat.label)}" placeholder="Aktif Üye">
                </div>
            `, () => {
                const stats = DataStore.get('stats');
                const newStat = {
                    icon: document.getElementById('mStatIcon').value,
                    target: parseInt(document.getElementById('mStatTarget').value, 10) || 0,
                    suffix: document.getElementById('mStatSuffix').value,
                    label: document.getElementById('mStatLabel').value
                };
                if (index >= 0) { stats[index] = newStat; } else { stats.push(newStat); }
                DataStore.set('stats', stats);
                Modal.close();
                toast(index >= 0 ? 'İstatistik güncellendi!' : 'İstatistik eklendi!');
                StatsTab.render(document.getElementById('adminContent'));
            });
        },

        deleteStat(i) {
            if (!confirm('Bu istatistiği silmek istediğinize emin misiniz?')) return;
            const stats = DataStore.get('stats');
            stats.splice(i, 1);
            DataStore.set('stats', stats);
            toast('İstatistik silindi.');
            StatsTab.render(document.getElementById('adminContent'));
        },

        // --- PROJECTS ---
        addProject() {
            ProjectEditor.render(document.getElementById('adminContent'), null, true);
        },

        editProject(id) {
            ProjectEditor.render(document.getElementById('adminContent'), id, false);
        },

        backToProjects() {
            ProjectsTab.render(document.getElementById('adminContent'));
        },

        deleteProject(id) {
            if (!confirm(`"${id}" projesini silmek istediğinize emin misiniz?`)) return;
            const projects = DataStore.get('projects');
            const projectOrder = DataStore.get('projectOrder');
            delete projects[id];
            const idx = projectOrder.indexOf(id);
            if (idx >= 0) projectOrder.splice(idx, 1);
            DataStore.set('projects', projects);
            DataStore.set('projectOrder', projectOrder);
            toast('Proje silindi.');
            ProjectsTab.render(document.getElementById('adminContent'));
        },

        saveFullProject() {
            const projects = DataStore.get('projects');
            const projectOrder = DataStore.get('projectOrder');
            const isNew = ProjectEditor.isNew;
            const oldId = ProjectEditor.projectId;
            const id = document.getElementById('peId').value.trim();
            if (!id) { toast('Proje ID boş olamaz!', 'error'); return; }

            const techArr = document.getElementById('peTech').value.split(',').map(s => s.trim()).filter(s => s);

            const existing = isNew ? {} : (projects[oldId] || {});

            projects[id] = {
                ...existing,
                id: id,
                name: document.getElementById('peName').value,
                tagline: document.getElementById('peTagline').value,
                image: document.getElementById('peImage').value,
                status: document.getElementById('peStatus').value,
                tech: techArr,
                cardDescription: document.getElementById('peCardDesc').value,
                cardStats: existing.cardStats || [],
                specs: existing.specs || {},
                modelType: document.getElementById('peModelType').value,
                description: document.getElementById('peDescription').value,
                gallery: existing.gallery || [],
                team: existing.team || []
            };

            if (!projectOrder.includes(id)) projectOrder.push(id);

            DataStore.set('projects', projects);
            DataStore.set('projectOrder', projectOrder);
            toast(isNew ? 'Proje oluşturuldu!' : 'Proje kaydedildi!');
            // Stay on editor to keep editing sub-items
            ProjectEditor.isNew = false;
            ProjectEditor.projectId = id;
        },

        // --- PROJECT CARD STATS ---
        addProjectCardStat() {
            Modal.open('Kart İstatistiği Ekle', `
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-icons"></i> İkon (FA)</label>
                        <input type="text" id="mCsIcon" placeholder="fa-clock">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-font"></i> Metin</label>
                        <input type="text" id="mCsText" placeholder="6+ dk uçuş">
                    </div>
                </div>
            `, () => {
                const id = ProjectEditor.projectId;
                const projects = DataStore.get('projects');
                if (!projects[id]) { toast('Önce projeyi kaydedin!', 'error'); return; }
                projects[id].cardStats.push({
                    icon: document.getElementById('mCsIcon').value || 'fa-info',
                    text: document.getElementById('mCsText').value
                });
                DataStore.set('projects', projects);
                Modal.close();
                toast('Kart istatistiği eklendi!');
                ProjectEditor.render(document.getElementById('adminContent'), id, false);
            });
        },

        removeProjectCardStat(i) {
            const id = ProjectEditor.projectId;
            const projects = DataStore.get('projects');
            projects[id].cardStats.splice(i, 1);
            DataStore.set('projects', projects);
            toast('Kart istatistiği silindi.');
            ProjectEditor.render(document.getElementById('adminContent'), id, false);
        },

        // --- PROJECT SPECS ---
        addProjectSpec() {
            Modal.open('Teknik Özellik Ekle', `
                <div class="form-group">
                    <label><i class="fas fa-tag"></i> Etiket</label>
                    <input type="text" id="mSpLabel" placeholder="Uçuş Süresi">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-font"></i> Değer</label>
                        <input type="text" id="mSpValue" placeholder="6+ dakika">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-icons"></i> İkon (FA)</label>
                        <input type="text" id="mSpIcon" placeholder="fa-clock">
                    </div>
                </div>
            `, () => {
                const id = ProjectEditor.projectId;
                const projects = DataStore.get('projects');
                if (!projects[id]) { toast('Önce projeyi kaydedin!', 'error'); return; }
                const label = document.getElementById('mSpLabel').value;
                if (!label) { toast('Etiket boş olamaz!', 'error'); return; }
                projects[id].specs[label] = {
                    value: document.getElementById('mSpValue').value,
                    icon: document.getElementById('mSpIcon').value || 'fa-info'
                };
                DataStore.set('projects', projects);
                Modal.close();
                toast('Teknik özellik eklendi!');
                ProjectEditor.render(document.getElementById('adminContent'), id, false);
            });
        },

        removeProjectSpec(label) {
            const id = ProjectEditor.projectId;
            const projects = DataStore.get('projects');
            delete projects[id].specs[label];
            DataStore.set('projects', projects);
            toast('Teknik özellik silindi.');
            ProjectEditor.render(document.getElementById('adminContent'), id, false);
        },

        // --- PROJECT GALLERY ---
        addProjectGallery() {
            Modal.open('Fotoğraf Ekle', `
                <div class="form-group">
                    <label><i class="fas fa-image"></i> Görsel URL</label>
                    <input type="text" id="mGalSrc" placeholder="media/foto.jpg">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-tag"></i> Açıklama</label>
                    <input type="text" id="mGalCaption" placeholder="Fotoğraf açıklaması">
                </div>
            `, () => {
                const id = ProjectEditor.projectId;
                const projects = DataStore.get('projects');
                if (!projects[id]) { toast('Önce projeyi kaydedin!', 'error'); return; }
                projects[id].gallery.push({
                    src: document.getElementById('mGalSrc').value,
                    caption: document.getElementById('mGalCaption').value
                });
                DataStore.set('projects', projects);
                Modal.close();
                toast('Fotoğraf eklendi!');
                ProjectEditor.render(document.getElementById('adminContent'), id, false);
            });
        },

        removeProjectGallery(i) {
            const id = ProjectEditor.projectId;
            const projects = DataStore.get('projects');
            projects[id].gallery.splice(i, 1);
            DataStore.set('projects', projects);
            toast('Fotoğraf silindi.');
            ProjectEditor.render(document.getElementById('adminContent'), id, false);
        },

        // --- PROJECT TEAM ---
        addProjectTeamMember() {
            Modal.open('Ekip Üyesi Ekle', `
                <div class="form-group">
                    <label><i class="fas fa-user"></i> Ad Soyad</label>
                    <input type="text" id="mPtName" placeholder="Ad Soyad">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-id-badge"></i> Görev</label>
                    <input type="text" id="mPtRole" placeholder="Proje Lideri">
                </div>
            `, () => {
                const id = ProjectEditor.projectId;
                const projects = DataStore.get('projects');
                if (!projects[id]) { toast('Önce projeyi kaydedin!', 'error'); return; }
                projects[id].team.push({
                    name: document.getElementById('mPtName').value,
                    role: document.getElementById('mPtRole').value
                });
                DataStore.set('projects', projects);
                Modal.close();
                toast('Ekip üyesi eklendi!');
                ProjectEditor.render(document.getElementById('adminContent'), id, false);
            });
        },

        removeProjectTeamMember(i) {
            const id = ProjectEditor.projectId;
            const projects = DataStore.get('projects');
            projects[id].team.splice(i, 1);
            DataStore.set('projects', projects);
            toast('Ekip üyesi silindi.');
            ProjectEditor.render(document.getElementById('adminContent'), id, false);
        },

        // --- TIMELINE ---
        addTimeline() {
            this._openTimelineModal('Yeni Olay', { date: '', title: '', description: '', icon: 'fa-flag', side: 'left' }, -1);
        },

        editTimeline(i) {
            const timeline = DataStore.get('timeline');
            this._openTimelineModal('Olay Düzenle', timeline[i], i);
        },

        _openTimelineModal(title, item, index) {
            Modal.open(title, `
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-calendar"></i> Tarih</label>
                        <input type="text" id="mTlDate" value="${escHtml(item.date)}" placeholder="2024 - Yaz">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-icons"></i> İkon (FA)</label>
                        <input type="text" id="mTlIcon" value="${escHtml(item.icon)}" placeholder="fa-flag">
                    </div>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-heading"></i> Başlık</label>
                    <input type="text" id="mTlTitle" value="${escHtml(item.title)}">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-align-left"></i> Açıklama</label>
                    <textarea id="mTlDesc">${escHtml(item.description)}</textarea>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-arrows-alt-h"></i> Taraf</label>
                    <select id="mTlSide">
                        <option value="left" ${item.side === 'left' ? 'selected' : ''}>Sol</option>
                        <option value="right" ${item.side === 'right' ? 'selected' : ''}>Sağ</option>
                    </select>
                </div>
            `, () => {
                const timeline = DataStore.get('timeline');
                const newItem = {
                    date: document.getElementById('mTlDate').value,
                    title: document.getElementById('mTlTitle').value,
                    description: document.getElementById('mTlDesc').value,
                    icon: document.getElementById('mTlIcon').value || 'fa-flag',
                    side: document.getElementById('mTlSide').value
                };
                if (index >= 0) { timeline[index] = newItem; } else { timeline.push(newItem); }
                DataStore.set('timeline', timeline);
                Modal.close();
                toast(index >= 0 ? 'Olay güncellendi!' : 'Olay eklendi!');
                TimelineTab.render(document.getElementById('adminContent'));
            });
        },

        deleteTimeline(i) {
            if (!confirm('Bu olayı silmek istediğinize emin misiniz?')) return;
            const timeline = DataStore.get('timeline');
            timeline.splice(i, 1);
            DataStore.set('timeline', timeline);
            toast('Olay silindi.');
            TimelineTab.render(document.getElementById('adminContent'));
        },

        // --- TEAM ---
        addTeamMember() {
            this._openTeamModal('Yeni Üye', { name: '', role: '', photo: '', dept: '', board: '', categories: '' }, -1);
        },

        editTeamMember(i) {
            const team = DataStore.get('team');
            this._openTeamModal('Üye Düzenle', team[i], i);
        },

        _openTeamModal(title, member, index) {
            Modal.open(title, `
                <div class="form-group">
                    <label><i class="fas fa-user"></i> Ad Soyad</label>
                    <input type="text" id="mTeamName" value="${escHtml(member.name)}">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-id-badge"></i> Görev</label>
                    <input type="text" id="mTeamRole" value="${escHtml(member.role)}" placeholder="Kulüp Başkanı">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-image"></i> Fotoğraf URL</label>
                    <input type="text" id="mTeamPhoto" value="${escHtml(member.photo)}">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-graduation-cap"></i> Bölüm & Sınıf</label>
                    <input type="text" id="mTeamDept" value="${escHtml(member.dept)}" placeholder="Bilgisayar Mühendisliği - 2. Sınıf">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-sitemap"></i> Kurul</label>
                    <input type="text" id="mTeamBoard" value="${escHtml(member.board)}" placeholder="Yönetim Kurulu">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-tags"></i> Kategoriler (boşlukla ayırın)</label>
                    <input type="text" id="mTeamCats" value="${escHtml(member.categories)}" placeholder="yonetim idari">
                </div>
            `, () => {
                const team = DataStore.get('team');
                const newMember = {
                    name: document.getElementById('mTeamName').value,
                    role: document.getElementById('mTeamRole').value,
                    photo: document.getElementById('mTeamPhoto').value,
                    dept: document.getElementById('mTeamDept').value,
                    board: document.getElementById('mTeamBoard').value,
                    categories: document.getElementById('mTeamCats').value
                };
                if (index >= 0) { team[index] = newMember; } else { team.push(newMember); }
                DataStore.set('team', team);
                Modal.close();
                toast(index >= 0 ? 'Üye güncellendi!' : 'Üye eklendi!');
                TeamTab.render(document.getElementById('adminContent'));
            });
        },

        deleteTeamMember(i) {
            if (!confirm('Bu üyeyi silmek istediğinize emin misiniz?')) return;
            const team = DataStore.get('team');
            team.splice(i, 1);
            DataStore.set('team', team);
            toast('Üye silindi.');
            TeamTab.render(document.getElementById('adminContent'));
        },

        // --- FAQ ---
        addFAQ() {
            this._openFAQModal('Yeni Soru', { question: '', answer: '' }, -1);
        },

        editFAQ(i) {
            const faq = DataStore.get('faq');
            this._openFAQModal('Soru Düzenle', faq[i], i);
        },

        _openFAQModal(title, item, index) {
            Modal.open(title, `
                <div class="form-group">
                    <label><i class="fas fa-question"></i> Soru</label>
                    <input type="text" id="mFaqQ" value="${escHtml(item.question)}">
                </div>
                <div class="form-group">
                    <label><i class="fas fa-align-left"></i> Cevap</label>
                    <textarea id="mFaqA">${escHtml(item.answer)}</textarea>
                </div>
            `, () => {
                const faq = DataStore.get('faq');
                const newItem = {
                    question: document.getElementById('mFaqQ').value,
                    answer: document.getElementById('mFaqA').value
                };
                if (index >= 0) { faq[index] = newItem; } else { faq.push(newItem); }
                DataStore.set('faq', faq);
                Modal.close();
                toast(index >= 0 ? 'Soru güncellendi!' : 'Soru eklendi!');
                FAQTab.render(document.getElementById('adminContent'));
            });
        },

        deleteFAQ(i) {
            if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;
            const faq = DataStore.get('faq');
            faq.splice(i, 1);
            DataStore.set('faq', faq);
            toast('Soru silindi.');
            FAQTab.render(document.getElementById('adminContent'));
        },

        // --- CONTACT ---
        saveContact() {
            const contact = DataStore.get('contact');
            contact.address = document.getElementById('contactAddress').value;
            contact.email = document.getElementById('contactEmail').value;
            DataStore.set('contact', contact);
            toast('İletişim bilgileri kaydedildi!');
        },

        addContactSocial() {
            Modal.open('Sosyal Medya Ekle', `
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-heading"></i> Platform</label>
                        <input type="text" id="mSocPlatform" placeholder="Instagram">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-at"></i> Kullanıcı Adı</label>
                        <input type="text" id="mSocHandle" placeholder="@ytuuask">
                    </div>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-link"></i> URL</label>
                    <input type="text" id="mSocUrl" placeholder="https://instagram.com/...">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-icons"></i> İkon (FA sınıfı)</label>
                        <input type="text" id="mSocIcon" placeholder="fab fa-instagram">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-palette"></i> Renk Sınıfı</label>
                        <input type="text" id="mSocColor" placeholder="instagram-icon">
                    </div>
                </div>
            `, () => {
                const contact = DataStore.get('contact');
                contact.socials.push({
                    platform: document.getElementById('mSocPlatform').value,
                    handle: document.getElementById('mSocHandle').value,
                    url: document.getElementById('mSocUrl').value,
                    icon: document.getElementById('mSocIcon').value,
                    colorClass: document.getElementById('mSocColor').value
                });
                DataStore.set('contact', contact);
                Modal.close();
                toast('Sosyal medya eklendi!');
                ContactTab.render(document.getElementById('adminContent'));
            });
        },

        removeContactSocial(i) {
            const contact = DataStore.get('contact');
            contact.socials.splice(i, 1);
            DataStore.set('contact', contact);
            toast('Sosyal medya silindi.');
            ContactTab.render(document.getElementById('adminContent'));
        },

        // --- SEED DATABASE ---
        async seedDatabase() {
            if (!confirm('DİKKAT: Veritabanını varsayılan verilerle doldurmak istediğinize emin misiniz? Mevcut TÜM veriler üzerine yazılacak!')) return;
            if (!confirm('Bu işlem geri alınamaz! Gerçekten devam etmek istiyor musunuz?')) return;
            try {
                const res = await fetch('/api/admin/seed', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${DataStore.getToken()}`
                    },
                    body: JSON.stringify({ defaults: DEFAULT_DATA })
                });
                if (res.ok) {
                    toast('Veritabanı başarıyla dolduruldu!');
                    await DataStore.init();
                    DashboardTab.render(document.getElementById('adminContent'));
                } else {
                    toast('Seed işlemi başarısız!', 'error');
                }
            } catch {
                toast('Sunucu bağlantı hatası!', 'error');
            }
        }
    };

    // ==========================================
    // DASHBOARD INIT
    // ==========================================
    const Dashboard = {
        async init() {
            await DataStore.init();
            Sidebar.init();
            Modal.init();
            DashboardTab.render(document.getElementById('adminContent'));
        }
    };

    // ==========================================
    // INIT ALL
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        Theme.init();
        Particles.init();
        Auth.init();
    });
})();
