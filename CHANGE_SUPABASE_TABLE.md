# Supabase Tablosunu Değiştirme Rehberi

Bu dosya, UAZ'25 başvuru formunun farklı bir Supabase hesabı veya tablosuna bağlanması için yapılması gereken değişiklikleri açıklar.

## 📋 Değiştirilmesi Gereken Yerler

### 1️⃣ Supabase Bağlantı Bilgileri

**Dosya:** `uaz25.html`  
**Satırlar:** 385-386

```javascript
// ==========================================
// SUPABASE CONFIGURATION
// ==========================================
const SUPABASE_URL = 'https://ksvkdvamipuavekhzexp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzdmtkdmFtaXB1YXZla2h6ZXhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTI5NDMsImV4cCI6MjA3NzIyODk0M30.txooS99Vws73AUv3TeKAtFp3BGKeh1yyB4qMxQh-MEY';
```

**Değiştirin:**
```javascript
const SUPABASE_URL = 'YENİ_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YENİ_ANON_KEY';
```

---

### 2️⃣ Tablo Adı

**Dosya:** `uaz25.html`  
**Satır:** 697

```javascript
const { data, error } = await supabase
    .from('uaz25_applications') // Tablo adı
    .insert([formData]);
```

**Değiştirin:**
```javascript
const { data, error } = await supabase
    .from('yeni_tablo_adiniz') // Yeni tablo adınız
    .insert([formData]);
```

---

## 🔑 Yeni Supabase Bilgilerini Bulma

### Adım 1: Supabase Dashboard'a Giriş
1. https://supabase.com/dashboard adresine gidin
2. Hesabınıza giriş yapın
3. Kullanmak istediğiniz projeyi seçin

### Adım 2: API Bilgilerini Alma
1. Sol menüden **Settings** (⚙️) seçin
2. **API** sekmesine tıklayın
3. Aşağıdaki bilgileri kopyalayın:
   - **Project URL** → `SUPABASE_URL` olarak kullanın
   - **Project API keys** bölümünden **anon/public** → `SUPABASE_ANON_KEY` olarak kullanın

**Örnek:**
```
Project URL: https://abcdefghijklmnop.supabase.co
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 Yeni Tablo Oluşturma

### Adım 1: SQL Editor'ü Açın
1. Supabase Dashboard'da sol menüden **SQL Editor** seçin
2. **+ New query** butonuna tıklayın

### Adım 2: Aşağıdaki SQL'i Çalıştırın

**ÖNEMLİ:** `yeni_tablo_adiniz` yerine kendi tablo adınızı yazın!

```sql
-- Tablo Oluşturma
CREATE TABLE yeni_tablo_adiniz (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Kişisel Bilgiler
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    gender TEXT,
    
    -- Eğitim Bilgileri
    school TEXT,
    department TEXT,
    grade TEXT,
    
    -- Katılım Bilgileri
    participation_type TEXT,
    attendance_day TEXT,
    motivation TEXT NOT NULL,
    previous_event TEXT,
    previous_project TEXT,
    project_explanation TEXT,
    
    -- Onaylar
    email_consent BOOLEAN NOT NULL DEFAULT false,
    photo_consent BOOLEAN NOT NULL DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Aktif Etme
ALTER TABLE yeni_tablo_adiniz ENABLE ROW LEVEL SECURITY;

-- Herkes Form Gönderebilir (INSERT)
CREATE POLICY "Enable insert for all users" ON yeni_tablo_adiniz
    FOR INSERT WITH CHECK (true);

-- Sadece Giriş Yapmış Kullanıcılar Verileri Görebilir (SELECT)
CREATE POLICY "Enable read for authenticated users" ON yeni_tablo_adiniz
    FOR SELECT USING (auth.role() = 'authenticated');
```

### Adım 3: SQL'i Çalıştır
1. Sağ alt köşedeki **RUN** butonuna tıklayın
2. "Success. No rows returned" mesajı görürseniz işlem başarılı demektir

---

## ✅ Kontrol Listesi

Değişiklikleri yaptıktan sonra kontrol edin:

- [ ] `SUPABASE_URL` yeni proje URL'si ile değiştirildi
- [ ] `SUPABASE_ANON_KEY` yeni proje anon key ile değiştirildi
- [ ] Tablo adı (`.from('...')`) değiştirildi
- [ ] Yeni Supabase projesinde tablo SQL'i çalıştırıldı
- [ ] RLS (Row Level Security) politikaları oluşturuldu
- [ ] Form test edildi ve veri başarıyla kaydedildi

---

## 🧪 Test Etme

1. `uaz25.html` sayfasını tarayıcıda açın
2. Tüm zorunlu alanları doldurun
3. Formu gönderin
4. Supabase Dashboard'dan **Table Editor**'e gidin
5. Tablonuzda yeni kaydın görünüp görünmediğini kontrol edin

---

## 🔒 Güvenlik Notları

### Anon Key Güvenli mi?
✅ **Evet**, `anon key` (public key) istemci tarafında kullanılmak için tasarlanmıştır. Row Level Security (RLS) politikaları ile korunur.

### Service Role Key'i ASLA Kullanmayın!
❌ `service_role` key'ini **ASLA** frontend kodunda kullanmayın. Bu key tüm RLS politikalarını atlar ve güvenlik açığı oluşturur.

### RLS Politikalarını Mutlaka Kullanın
✅ Yukarıdaki SQL'de belirtilen RLS politikalarını mutlaka oluşturun. Bunlar:
- Herkesin form göndermesine izin verir (INSERT)
- Sadece giriş yapmış admin kullanıcıların verileri görmesine izin verir (SELECT)

---

## 📞 Sorun mu Yaşıyorsunuz?

### Hata: "Failed to fetch"
- İnternet bağlantınızı kontrol edin
- `SUPABASE_URL` doğru mu kontrol edin
- CORS ayarlarını kontrol edin (Supabase'de genellikle otomatik aktiftir)

### Hata: "Insert failed"
- Tablo adının doğru olduğundan emin olun
- SQL'in başarıyla çalıştığından emin olun
- Zorunlu alanların (NOT NULL) doldurulduğundan emin olun

### Hata: "Invalid API key"
- `SUPABASE_ANON_KEY` doğru kopyalandığından emin olun
- Key'in başında veya sonunda boşluk olmadığından emin olun
- Doğru projenin key'ini kullandığınızdan emin olun

---

## 📝 Notlar

- Tablo yapısını değiştirirseniz, HTML formdaki alanlarla eşleştiğinden emin olun
- Yeni alanlar eklerseniz, JavaScript'teki `formData` objesini de güncellemeyi unutmayın
- Başka bir etkinlik için aynı yapıyı kullanabilirsiniz, sadece tablo adını değiştirin

---

**Son Güncelleme:** 24 Kasım 2025  
**Form Versiyonu:** UAZ'25 v1.0

