/* ============================================
   UASK - Centralized Data Store
   All site content in one place.
   Fetches from API with DEFAULT_DATA as fallback.
   ============================================ */

const DEFAULT_DATA = {
    hero: {
        badge: { icon: 'fa-rocket', text: 'Yıldız Teknik Üniversitesi' },
        titleLine1: 'READY TO',
        titleLine2: 'TAKE',
        titleHighlight: 'OFF',
        description: 'Uzay ve Aviyonik Sistemler Kulübü olarak geleceğin havacılık ve uzay mühendislerini yetiştiriyoruz.',
        buttonText: 'Keşfet',
        buttonLink: '#about',
        socials: [
            { icon: 'fab fa-instagram', url: 'https://www.instagram.com/ytuuask/', label: 'Instagram' },
            { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/ytü-uzay-ve-aviyonik-sistemler-kulübü/', label: 'LinkedIn' }
        ]
    },

    about: {
        sectionTag: 'Hakkımızda',
        sectionTitle: 'UASK Nedir?',
        title: 'Uzay ve Aviyonik Sistemler Kulübü',
        paragraphs: [
            'UASK, havacılık ve uzay teknolojileri alanında çalışan öğrencilerin bir araya geldiği, projeler geliştirdiği ve bilgi paylaştığı bir topluluktur. Amacımız, geleceğin havacılık ve uzay mühendislerini yetiştirmek ve bu alanda yenilikçi projeler ortaya çıkarmaktır.',
            'Kulübümüz, öğrencilerin teorik bilgilerini pratik projelerle birleştirmelerini sağlayarak, sektördeki gelişmeleri takip etmelerine ve yenilikçi çözümler üretmelerine olanak tanır. Türkiye\'nin havacılık ve uzay sektöründe öncü rol oynayacak, teknoloji üreten mühendisler yetiştirmeyi hedefliyoruz.'
        ],
        features: [
            { icon: 'fa-satellite-dish', title: 'Aviyonik Sistemler', desc: 'Uçuş kontrol ve iletişim sistemleri geliştirme' },
            { icon: 'fa-helicopter', title: 'İHA Tasarım', desc: 'Otonom insansız hava araçları tasarımı' },
            { icon: 'fa-code', title: 'Yazılım Geliştirme', desc: 'Görüntü işleme ve otonom uçuş yazılımları' }
        ],
        community: {
            image: 'media/fpv.png',
            badge: 'Topluluk',
            title: 'FPV Drone Topluluğu',
            description: 'FPV (First Person View) drone teknolojileri ile ilgilenen öğrencilerimizin bir araya geldiği topluluğumuz. Yüksek hızlı, manevra kabiliyeti yüksek drone\'lar tasarlayıp geliştiriyoruz.',
            linkUrl: 'https://www.instagram.com/ytufpvdrone/',
            linkIcon: 'fab fa-instagram',
            linkText: '@ytufpvdrone'
        }
    },

    stats: [
        { icon: 'fa-project-diagram', target: 4, suffix: '+', label: 'Tamamlanan Proje' },
        { icon: 'fa-users', target: 50, suffix: '+', label: 'Aktif Üye' },
        { icon: 'fa-trophy', target: 3, suffix: '', label: 'Yarışma Katılımı' },
        { icon: 'fa-plane', target: 37, suffix: '+', label: 'Toplam Uçuş Süresi (dk)' },
        { icon: 'fa-graduation-cap', target: 10, suffix: '+', label: 'Eğitim & Workshop' },
        { icon: 'fa-calendar-check', target: 380, suffix: '+', label: 'Etkinlik Katılımcı' }
    ],

    projects: {
        zifir: {
            id: 'zifir',
            name: 'ZİFİR',
            tagline: 'Otonom kargo teslimat İHA sistemi',
            image: 'media/zifir.jpg',
            status: 'Tamamlandı',
            tech: ['Raspberry Pi', 'Pixhawk', 'Karbonfiber'],
            cardDescription: 'Otonom uçuş kabiliyetlerine sahip insansız hava aracı (İHA) projesi. Görüntü işleme teknolojileri ile belirlenen bölgelere yük bırakan bir drone.',
            cardStats: [
                { icon: 'fa-clock', text: '6+ dk uçuş' },
                { icon: 'fa-route', text: '4.2 km menzil' },
                { icon: 'fa-user-friends', text: '8 kişi' },
                { icon: 'fa-calendar', text: '5 ay' }
            ],
            specs: {
                'Uçuş Süresi': { value: '6+ dakika', icon: 'fa-clock' },
                'Menzil': { value: '4.2 km', icon: 'fa-route' },
                'Ekip': { value: '8 kişi', icon: 'fa-user-friends' },
                'Süre': { value: '5 ay', icon: 'fa-calendar' },
                'Ağırlık': { value: '2.4 kg', icon: 'fa-weight-hanging' },
                'Kanat Açıklığı': { value: '65 cm', icon: 'fa-arrows-alt-h' },
                'Kontrol': { value: 'Pixhawk + RPi', icon: 'fa-microchip' },
                'Malzeme': { value: 'Karbonfiber', icon: 'fa-cube' }
            },
            modelType: 'quadcopter',
            description: '<h3>Proje Hakkında</h3><p>ZİFİR, UASK ekibinin geliştirdiği otonom uçuş kabiliyetlerine sahip bir insansız hava aracı (İHA) projesidir. Görüntü işleme teknolojileri kullanılarak belirlenen hedef bölgelere hassas yük bırakma operasyonları gerçekleştirebilen bir drone sistemidir.</p><h3>Teknik Altyapı</h3><p>Proje, Raspberry Pi 4B üzerinde çalışan OpenCV tabanlı görüntü işleme modülü ve Pixhawk uçuş kontrolcüsü ile entegre bir mimari üzerine kurulmuştur. Karbonfiber gövde yapısı sayesinde hem hafiflik hem de dayanıklılık sağlanmıştır.</p><ul><li>Pymavlink protokolü ile otonom uçuş kontrol sistemi</li><li>OpenCV tabanlı gerçek zamanlı hedef tanımlama</li><li>GPS destekli waypoint navigasyonu</li><li>Servo kontrollü yük bırakma mekanizması</li><li>Telemetri ile gerçek zamanlı veri aktarımı</li></ul><h3>Tasarım Süreci</h3><p>5 aylık geliştirme sürecinde 8 kişilik ekibimiz mekanik tasarım, elektronik entegrasyon ve yazılım geliştirme alanlarında paralel çalışmalar yürütmüştür. İteratif test uçuşları ile sistem optimize edilmiştir.</p><h3>Sonuçlar</h3><p>Proje başarıyla tamamlanmış olup 6 dakikayı aşan uçuş süresi ve 4.2 km menzil ile hedeflenen performans değerlerine ulaşılmıştır. Otonom yük bırakma testlerinde %92 isabet oranı elde edilmiştir.</p>',
            gallery: [
                { src: 'media/zifir.jpg', caption: 'ZİFİR - Genel görünüm' },
                { src: 'media/projeler1.jpeg', caption: 'Montaj süreci' },
                { src: 'media/projeler2.jpeg', caption: 'Elektronik entegrasyon' },
                { src: 'media/projeler4.jpeg', caption: 'Test uçuşu hazırlığı' },
                { src: 'media/projeler3.jpg', caption: 'Arazi test uçuşu' }
            ],
            team: [
                { name: 'Huzeyfe Fazıl Koç', role: 'Proje Lideri' },
                { name: 'Yusuf Yasir İncal', role: 'Elektronik Tasarım' },
                { name: 'Ahmet Faruk Ertürk', role: 'Yazılım Geliştirme' },
                { name: 'Tunahan E. Karataş', role: 'Yazılım Geliştirme' },
                { name: 'Zehra Kıldıze', role: 'Mekanik Tasarım' },
                { name: 'Muharrem S. Çoktaş', role: 'Test & Entegrasyon' },
                { name: 'Sevban Fidan', role: 'Elektronik Destek' },
                { name: 'İrem Akkalay', role: 'Proje Koordinasyonu' }
            ]
        },
        otonom: {
            id: 'otonom',
            name: 'Otonom Uçuş & Görüntü İşleme',
            tagline: 'Modüler otonom görev yönetim yazılımı',
            image: 'media/projeler4.jpeg',
            status: 'Tamamlandı',
            tech: ['Python', 'Pymavlink', 'OpenCV'],
            cardDescription: 'Pymavlink protokolü kullanılarak Python ile geliştirildi. Node\'lara dayanan modüler görev tasarımlarıyla istenilen görevler kolaylıkla gerçekleştirilebiliyor.',
            cardStats: [
                { icon: 'fa-microchip', text: 'Pymavlink & OpenCV' },
                { icon: 'fa-flag-checkered', text: 'Teknofest 2025' },
                { icon: 'fa-user-friends', text: '3 kişi' },
                { icon: 'fa-calendar', text: '5 ay' }
            ],
            specs: {
                'Teknoloji': { value: 'Pymavlink & OpenCV', icon: 'fa-microchip' },
                'Hedef': { value: 'Teknofest 2025', icon: 'fa-flag-checkered' },
                'Ekip': { value: '3 kişi', icon: 'fa-user-friends' },
                'Süre': { value: '5 ay', icon: 'fa-calendar' },
                'Dil': { value: 'Python 3.11', icon: 'fa-code' },
                'İletişim': { value: 'MAVLink 2.0', icon: 'fa-exchange-alt' },
                'Görüntü': { value: 'OpenCV 4.x', icon: 'fa-eye' },
                'Mimari': { value: 'Node Tabanlı', icon: 'fa-project-diagram' }
            },
            modelType: 'quadcopter',
            description: '<h3>Proje Hakkında</h3><p>Otonom Uçuş & Görüntü İşleme Yazılımı, UASK\'ın Teknofest 2025 yarışmasına hazırlık kapsamında geliştirdiği modüler görev yönetim sistemidir. Pymavlink protokolü üzerinden İHA\'lar ile haberleşerek tamamen otonom uçuş ve görev icrasını sağlar.</p><h3>Yazılım Mimarisi</h3><p>Sistem, node tabanlı modüler bir mimaride tasarlanmıştır. Her bir görev (kalkış, waypoint navigasyonu, görüntü işleme, iniş) bağımsız bir node olarak tanımlanmış olup mission planner benzeri bir akış ile sıralanır.</p><ul><li>MAVLink 2.0 protokolü ile düşük gecikmeli haberleşme</li><li>Node-based mission tasarım altyapısı</li><li>OpenCV ile gerçek zamanlı nesne tespiti ve takibi</li><li>Otomatik kalibrasyon ve güvenlik protokolleri</li><li>Simülatör ortamında test ve doğrulama desteği</li></ul><h3>Geliştirme Süreci</h3><p>3 kişilik yazılım ekibimiz, 5 aylık sürede SITL (Software In The Loop) simülatör ortamında kapsamlı testler gerçekleştirmiştir. Ardından gerçek İHA\'lar üzerinde saha testleri yapılmıştır.</p><h3>Kazanımlar</h3><p>Proje, Teknofest 2025 yarışması için hazırlanan yazılım altyapısının temelini oluşturmuştur. Modüler yapısı sayesinde farklı görev senaryolarına kolayca uyarlanabilmektedir.</p>',
            gallery: [
                { src: 'media/projeler4.jpeg', caption: 'Geliştirme ortamı' },
                { src: 'media/projeler2.jpeg', caption: 'Test ve entegrasyon' },
                { src: 'media/projeler1.jpeg', caption: 'Saha testleri' },
                { src: 'media/zifir.jpg', caption: 'ZİFİR entegrasyonu' }
            ],
            team: [
                { name: 'Ahmet Faruk Ertürk', role: 'Baş Geliştirici' },
                { name: 'Tunahan E. Karataş', role: 'Görüntü İşleme' },
                { name: 'Necip Arda Kocabaş', role: 'Yazılım Geliştirme' }
            ]
        },
        sabitkanat: {
            id: 'sabitkanat',
            name: 'Sabit Kanat İHA',
            tagline: 'Uzun menzilli otonom keşif platformu',
            image: 'media/sabitkanat.jpeg',
            status: 'Tamamlandı',
            tech: ['Raspberry Pi', 'Pixhawk', 'Balsa Plaka'],
            cardDescription: 'Sabit kanat tasarımına sahip insansız hava aracı projesi. Uzun menzil ve yüksek dayanıklılık özelliklerine sahip otonom uçuş sistemi.',
            cardStats: [
                { icon: 'fa-clock', text: '15+ dk uçuş' },
                { icon: 'fa-route', text: '9+ km menzil' },
                { icon: 'fa-user-friends', text: '9 kişi' },
                { icon: 'fa-calendar', text: '6 ay' }
            ],
            specs: {
                'Uçuş Süresi': { value: '15+ dakika', icon: 'fa-clock' },
                'Menzil': { value: '9+ km', icon: 'fa-route' },
                'Ekip': { value: '9 kişi', icon: 'fa-user-friends' },
                'Süre': { value: '6 ay', icon: 'fa-calendar' },
                'Ağırlık': { value: '3.2 kg', icon: 'fa-weight-hanging' },
                'Kanat Açıklığı': { value: '180 cm', icon: 'fa-arrows-alt-h' },
                'Gövde': { value: 'Balsa Plaka', icon: 'fa-cube' },
                'İtki': { value: 'Elektrik Motor', icon: 'fa-bolt' }
            },
            modelType: 'fixedwing',
            description: '<h3>Proje Hakkında</h3><p>Sabit Kanat İHA, uzun menzil ve yüksek dayanıklılık gereksinimlerine yönelik tasarlanmış bir otonom insansız hava aracı projesidir. Sabit kanat tasarımı sayesinde döner kanatlı sistemlere göre çok daha uzun uçuş süreleri ve menzillere ulaşılmıştır.</p><h3>Aerodinamik Tasarım</h3><p>Kanat profili ve gövde geometrisi, CFD (Computational Fluid Dynamics) analizleri ile optimize edilmiştir. Balsa plaka ve köpük malzeme kombinasyonu ile hem hafiflik hem yapısal dayanım sağlanmıştır.</p><ul><li>180 cm kanat açıklığı ile yüksek L/D oranı</li><li>Modifiye Clark Y kanat profili</li><li>Servo kontrollü aileron, elevator ve rudder</li><li>GPS waypoint tabanlı otonom navigasyon</li><li>Otomatik kalkış ve iniş algoritmaları</li></ul><h3>Üretim Süreci</h3><p>6 aylık proje süresinde 9 kişilik ekibimiz, tasarım, prototipleme, test ve iterasyon aşamalarını başarıyla tamamlamıştır. Toplam 3 prototip üretilmiş olup son versiyon tüm hedefleri karşılamıştır.</p><h3>Performans</h3><p>15 dakikayı aşan uçuş süresi ve 9 km üzeri menzil ile projemiz hedef performans değerlerinin üzerine çıkmıştır. Stabil uçuş karakteristikleri ve güvenilir otonom kontrol sistemi ile başarılı sonuçlar elde edilmiştir.</p>',
            gallery: [
                { src: 'media/sabitkanat.jpeg', caption: 'Sabit Kanat İHA - Uçuş görüntüsü' },
                { src: 'media/projeler1.jpeg', caption: 'Kanat montajı' },
                { src: 'media/projeler2.jpeg', caption: 'Gövde yapısı' },
                { src: 'media/projeler3.jpg', caption: 'Test uçuşu' },
                { src: 'media/projeler4.jpeg', caption: 'Elektronik entegrasyon' }
            ],
            team: [
                { name: 'Huzeyfe Fazıl Koç', role: 'Proje Lideri' },
                { name: 'Sevban Fidan', role: 'Aerodinamik Tasarım' },
                { name: 'Yusuf Yasir İncal', role: 'Elektronik Sistemler' },
                { name: 'Zehra Bengisu Aydın', role: 'Mekanik Üretim' },
                { name: 'Ahmet Faruk Ertürk', role: 'Yazılım' },
                { name: 'Tunahan E. Karataş', role: 'Yazılım' },
                { name: 'Muharrem S. Çoktaş', role: 'Test Pilotu' },
                { name: 'Zehra Kıldıze', role: 'Malzeme Tedarik' },
                { name: 'Tuğba Elverdi', role: 'Dokümantasyon' }
            ]
        },
        suha: {
            id: 'suha',
            name: 'SÜHA',
            tagline: 'Çok amaçlı hafif İHA platformu',
            image: 'media/projeler3.jpg',
            status: 'Tamamlandı',
            tech: ['Pixhawk'],
            cardDescription: 'Esnek ve dayanıklı gövdesi sayesinde hafif ve stabil bir uçuş kabiliyetine sahip insansız hava aracı. Çeşitli projeler kapsamında çok amaçlı kullanılabilmektedir.',
            cardStats: [
                { icon: 'fa-clock', text: '8 dk uçuş' },
                { icon: 'fa-route', text: '4 km menzil' },
                { icon: 'fa-user-friends', text: '8 kişi' },
                { icon: 'fa-calendar', text: '3 ay' }
            ],
            specs: {
                'Uçuş Süresi': { value: '8 dakika', icon: 'fa-clock' },
                'Menzil': { value: '4 km', icon: 'fa-route' },
                'Ekip': { value: '8 kişi', icon: 'fa-user-friends' },
                'Süre': { value: '3 ay', icon: 'fa-calendar' },
                'Ağırlık': { value: '1.8 kg', icon: 'fa-weight-hanging' },
                'Kontrol': { value: 'Pixhawk', icon: 'fa-microchip' },
                'Gövde': { value: 'Esnek kompozit', icon: 'fa-cube' },
                'Amaç': { value: 'Çok amaçlı', icon: 'fa-bullseye' }
            },
            modelType: 'quadcopter',
            description: '<h3>Proje Hakkında</h3><p>SÜHA, esnek ve dayanıklı gövde yapısı ile tasarlanmış hafif bir insansız hava aracıdır. Stabil uçuş kabiliyeti sayesinde farklı projelerde çok amaçlı platform olarak kullanılabilmektedir.</p><h3>Tasarım Felsefesi</h3><p>SÜHA, minimum karmaşıklık ve maksimum güvenilirlik prensibi ile tasarlanmıştır. Hızlı montaj ve bakım kolaylığı ön plana çıkarılmış, modüler gövde yapısı sayesinde farklı görev konfigürasyonlarına uyarlanabilir.</p><ul><li>Esnek kompozit gövde yapısı - darbelere dayanıklı</li><li>Pixhawk tabanlı uçuş kontrol sistemi</li><li>Hızlı söküp takılabilir bileşen tasarımı</li><li>Farklı görev modülleri ile uyumluluk</li><li>Kolay taşınabilir ve saha-dostu tasarım</li></ul><h3>Geliştirme</h3><p>3 aylık kısa ama yoğun bir geliştirme sürecinde, 8 kişilik ekibimiz SÜHA\'yı tasarım aşamasından uçuş testlerine kadar başarıyla tamamlamıştır.</p><h3>Kullanım Alanları</h3><p>SÜHA, eğitim amaçlı uçuşlardan test platformuna, hava görüntüleme çalışmalarından sensör taşıma görevlerine kadar geniş bir kullanım yelpazesine sahiptir. Kulübümüzün genel amaçlı İHA platformu olarak aktif kullanımdadır.</p>',
            gallery: [
                { src: 'media/projeler3.jpg', caption: 'SÜHA - Genel görünüm' },
                { src: 'media/projeler1.jpeg', caption: 'Montaj aşaması' },
                { src: 'media/projeler2.jpeg', caption: 'Elektronik bileşenler' },
                { src: 'media/zifir.jpg', caption: 'Test ortamı' }
            ],
            team: [
                { name: 'Huzeyfe Fazıl Koç', role: 'Proje Lideri' },
                { name: 'İrem Akkalay', role: 'Koordinasyon' },
                { name: 'Yusuf Yasir İncal', role: 'Elektronik' },
                { name: 'Zehra Kıldıze', role: 'Mekanik' },
                { name: 'Sevban Fidan', role: 'Elektronik Destek' },
                { name: 'Muharrem S. Çoktaş', role: 'Test' },
                { name: 'Ahmet Faruk Ertürk', role: 'Yazılım' },
                { name: 'Tuğba Elverdi', role: 'Dokümantasyon' }
            ]
        }
    },

    projectOrder: ['zifir', 'otonom', 'sabitkanat', 'suha'],

    timeline: [
        { date: '2023', title: 'Kulüp Kuruluşu', description: 'UASK, Yıldız Teknik Üniversitesi bünyesinde havacılık ve uzay tutkusu olan öğrenciler tarafından kuruldu.', icon: 'fa-flag', side: 'left' },
        { date: '2024 - İlkbahar', title: 'İlk Projeler', description: 'SÜHA ve Zİfir İHA projeleri ile ilk otonom uçuş denemelerimizi gerçekleştirdik. Toplam 28+ kişilik ekiple çalışmalara başladık.', icon: 'fa-drone', side: 'right' },
        { date: '2024 - Yaz', title: 'Teknofest Hazırlıkları', description: 'Otonom uçuş ve görüntü işleme yazılımlarımızı geliştirdik. Sabit Kanat İHA projemiz ile uzun menzilli uçuş kapasitesine ulaştık.', icon: 'fa-trophy', side: 'left' },
        { date: '2024 - Sonbahar', title: 'FPV Drone Topluluğu', description: 'FPV Drone topluluğumuz kuruldu. Drone pilotajı ve yarış drone tasarımı alanında çalışmalar başlatıldı.', icon: 'fa-users', side: 'right' },
        { date: '2025', title: 'Yeni Dönem', description: 'Yeni projeler, genişleyen ekip ve büyüyen vizyonumuzla Türkiye\'nin havacılık ve uzay sektörüne katkı sağlamaya devam ediyoruz.', icon: 'fa-rocket', side: 'right' }
    ],

    team: [
        { name: 'Huzeyfe Fazıl Koç', role: 'Kulüp Başkanı', photo: 'media/Huzeyfe Fazıl Koç.jpg', dept: 'Elektronik ve Haberleşme Müh. - 2. Sınıf', board: 'Yönetim Kurulu', categories: 'yonetim' },
        { name: 'İrem Akkalay', role: 'Başkan Yardımcısı & Organizasyon Birimi Başkanı', photo: 'media/irem akkalay 2.jpg', dept: 'Mekatronik Mühendisliği - 2. Sınıf', board: 'Yönetim Kurulu / İdari Kadro', categories: 'yonetim idari' },
        { name: 'Tuğba Elverdi', role: 'Genel Sekreter & Sponsorluk Birimi Başkanı', photo: 'media/Tuğba Elverdi.jpg', dept: 'Endüstri Mühendisliği - 3. Sınıf', board: 'Yönetim Kurulu / İdari Kadro', categories: 'yonetim idari' },
        { name: 'Yusuf Yasir İncal', role: 'Mali İşler Sorumlusu', photo: 'media/Yusuf Yasir İncal.jpg', dept: 'Elektronik ve Haberleşme Müh. - 2. Sınıf', board: 'Yönetim Kurulu', categories: 'yonetim' },
        { name: 'Zehra Kıldıze', role: 'Yönetim Kurulu Üyesi', photo: 'media/Zehra Kıldıze.jpg', dept: 'Elektronik ve Haberleşme Müh. - 2. Sınıf', board: 'Yönetim Kurulu', categories: 'yonetim' },
        { name: 'Zehra Bengisu Aydın', role: 'Denetim Kurulu Başkanı', photo: 'media/Zehra Bengisu Aydın.jpg', dept: 'Mekatronik Mühendisliği - 3. Sınıf', board: 'Denetim Kurulu', categories: 'denetim' },
        { name: 'Sevban Fidan', role: 'Denetim Kurulu Başkan Yardımcısı', photo: 'media/Sevban Fidan.jpg', dept: 'Elektronik ve Haberleşme Müh. - 4. Sınıf', board: 'Denetim Kurulu', categories: 'denetim' },
        { name: 'Necip Arda Kocabaş', role: 'Denetim Kurulu Üyesi', photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGmi8n7Avp88w/profile-displayphoto-crop_800_800/B4DZrvbh6nGsAI-/0/1764953564591?e=1772668800&v=beta&t=6fSknMpUWVofWdN8bzR5hT0FkfWTc1qI3cHHNGeZoWA', dept: 'Bilgisayar Mühendisliği - 2. Sınıf', board: 'Denetim Kurulu', categories: 'denetim' },
        { name: 'Ahmet Faruk Ertürk', role: 'Eğitim Birimi Eş Başkanı', photo: 'media/Ahmet Faruk Ertürk.jpg', dept: 'Elektronik ve Haberleşme Müh. - 3. Sınıf', board: 'İdari Kadro', categories: 'idari' },
        { name: 'Muharrem Sait Çoktaş', role: 'Yarışma Birimi Başkanı', photo: 'media/Muharrem Sait Çoktaş.jpg', dept: 'Harita Mühendisliği - 2. Sınıf', board: 'İdari Kadro', categories: 'idari' },
        { name: 'Tunahan Emre Karataş', role: 'Eğitim Birimi Eş Başkanı', photo: 'media/Tunahan Emre Karataş.jpg', dept: 'Elektronik ve Haberleşme Müh. - 3. Sınıf', board: 'İdari Kadro', categories: 'idari' }
    ],

    faq: [
        { question: 'UASK\'a nasıl üye olabilirim?', answer: 'UASK\'a üye olmak için dönem başında açılan kayıt formunu doldurmanız yeterlidir. Ayrıca etkinliklerimize ve sosyal medya hesaplarımızı takip ederek güncel duyurulardan haberdar olabilirsiniz. Tüm YTÜ öğrencileri kulübümüze katılabilir.' },
        { question: 'Mühendislik bölümünde olmam gerekiyor mu?', answer: 'Hayır! UASK, tüm bölümlerden öğrencilere açıktır. Havacılık ve uzay alanına ilgi duyan, öğrenmek ve katkı sağlamak isteyen herkes kulübümüze katılabilir. Farklı disiplinlerden gelen bakış açıları projelerimizi zenginleştirmektedir.' },
        { question: 'Hangi alanlarda projeler geliştiriyorsunuz?', answer: 'Otonom İHA tasarımı ve üretimi, otonom uçuş yazılımları, görüntü işleme, FPV drone teknolojileri, sabit kanat İHA sistemleri ve aviyonik sistemler gibi alanlarda projeler geliştiriyoruz. Ayrıca Teknofest gibi ulusal yarışmalara katılım sağlıyoruz.' },
        { question: 'Deneyimim yoksa da katılabilir miyim?', answer: 'Kesinlikle! Kulübümüz her seviyeden öğrenciyi kabul eder. Eğitim birimimiz, yeni üyelere temel konularda eğitimler ve workshop\'lar düzenler. Deneyimli üyelerimiz mentorluk yaparak sizi projelere hazırlar. Öğrenme motivasyonunuz en önemli kriterdir.' },
        { question: 'Kulüp etkinlikleri ne sıklıkla yapılıyor?', answer: 'Haftalık proje toplantıları, aylık eğitim workshop\'ları ve dönemlik büyük etkinlikler düzenliyoruz. Proje ekipleri düzenli olarak bir araya gelerek çalışmalarını sürdürür. Tüm etkinliklerimizi Instagram ve LinkedIn hesaplarımızdan duyuruyoruz.' }
    ],

    contact: {
        address: 'Yıldız Teknik Üniversitesi<br>Davutpaşa Kampüsü<br>İstanbul, Türkiye',
        email: 'yildizuask@gmail.com',
        socials: [
            { platform: 'Instagram', handle: '@ytuuask', url: 'https://www.instagram.com/ytuuask/', icon: 'fab fa-instagram', colorClass: 'instagram-icon' },
            { platform: 'LinkedIn', handle: 'UASK - Uzay ve Aviyonik Sistemler', url: 'https://www.linkedin.com/company/ytü-uzay-ve-aviyonik-sistemler-kulübü/', icon: 'fab fa-linkedin-in', colorClass: 'linkedin-icon' }
        ]
    },

    footer: {
        copyright: '&copy; 2025 UASK - Tüm hakları saklıdır.'
    }
};

/* DataStore - Fetches from API with DEFAULT_DATA as fallback */
const DataStore = {
    _cache: {},
    _loaded: false,

    async init() {
        try {
            const res = await fetch('/api/content');
            if (res.ok) {
                this._cache = await res.json();
                this._loaded = true;
            }
        } catch (e) {
            console.warn('API unavailable, using defaults');
        }
    },

    get(key) {
        if (this._cache[key] !== undefined) {
            return JSON.parse(JSON.stringify(this._cache[key]));
        }
        return JSON.parse(JSON.stringify(DEFAULT_DATA[key]));
    }
};
