# UAZ'25 Form - Supabase Kurulum Rehberi

## 📋 İçindekiler
1. [Supabase Projesi Oluşturma](#1-supabase-projesi-oluşturma)
2. [Veritabanı Tablosu Oluşturma](#2-veritabanı-tablosu-oluşturma)
3. [API Bilgilerini Alma](#3-api-bilgilerini-alma)
4. [Form Entegrasyonu](#4-form-entegrasyonu)
5. [Test Etme](#5-test-etme)
6. [Verileri Görüntüleme](#6-verileri-görüntüleme)

---

## 1. Supabase Projesi Oluşturma

1. **Supabase'e gidin:** [https://supabase.com](https://supabase.com)
2. **Sign Up / Log In** yapın
3. **"New Project"** butonuna tıklayın
4. Proje bilgilerini doldurun:
   - **Name:** UAZ25 (veya istediğiniz isim)
   - **Database Password:** Güçlü bir şifre oluşturun (kaydedin!)
   - **Region:** Europe (Frankfurt) - En yakın bölge
5. **Create Project** butonuna tıklayın
6. Proje kurulumunun tamamlanmasını bekleyin (2-3 dakika)

---

## 2. Veritabanı Tablosu Oluşturma

1. Sol menüden **"SQL Editor"** sekmesine gidin
2. **"New Query"** butonuna tıklayın
3. Aşağıdaki SQL kodunu yapıştırın ve çalıştırın:

```sql
-- UAZ'25 Başvuru Tablosu
CREATE TABLE uaz25_applications (
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

-- Row Level Security (RLS) Etkinleştir
ALTER TABLE uaz25_applications ENABLE ROW LEVEL SECURITY;

-- Herkes form gönderebilir
CREATE POLICY "Enable insert for all users" ON uaz25_applications
    FOR INSERT WITH CHECK (true);

-- Sadece authenticated kullanıcılar verileri okuyabilir
CREATE POLICY "Enable read for authenticated users" ON uaz25_applications
    FOR SELECT USING (auth.role() = 'authenticated');
```

4. **Run** (veya Ctrl+Enter) ile SQL'i çalıştırın
5. Success mesajını gördüğünüzde tablo oluşturulmuş demektir! ✅

---

## 3. API Bilgilerini Alma

1. Sol menüden **"Settings"** > **"API"** sekmesine gidin
2. Aşağıdaki bilgileri kopyalayın:
   - **Project URL** (URL bölümünde)
   - **anon public key** (API Keys bölümünde)

⚠️ **ÖNEMLİ:** Bu bilgileri güvenli bir yere not alın!

---

## 4. Form Entegrasyonu

1. `uaz25.html` dosyasını açın
2. Dosyanın başındaki JavaScript bölümünde şu satırları bulun:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

3. Bu satırları kendi Supabase bilgilerinizle değiştirin:

```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co'; // Kendi URL'iniz
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Kendi anon key'iniz
```

4. Dosyayı kaydedin

---

## 5. Test Etme

1. `uaz25.html` dosyasını bir web tarayıcıda açın
2. Formu doldurun ve **"Başvuruyu Gönder"** butonuna tıklayın
3. Başarılı mesajını gördüğünüzde ✅

**Test için:**
- Browser Console'u açın (F12)
- Network sekmesine bakın
- Supabase API çağrılarını görebilirsiniz

---

## 6. Verileri Görüntüleme

### Supabase Dashboard'dan:
1. Sol menüden **"Table Editor"** sekmesine gidin
2. **"uaz25_applications"** tablosunu seçin
3. Tüm başvuruları görebilirsiniz

### Excel'e Aktarma:
1. Table Editor'da **"Export"** butonuna tıklayın
2. CSV veya JSON formatında indirebilirsiniz

---

## 🔒 Güvenlik Notları

- ✅ **anon key** public olarak kullanılabilir (zaten public key)
- ✅ Row Level Security (RLS) aktif olduğu için sadece insert yapılabilir
- ✅ Sadece authenticated kullanıcılar verileri okuyabilir
- ⚠️ **service_role key**'i asla client-side'da kullanmayın!

---

## 📊 Veri Yapısı

| Alan | Tip | Zorunlu | Açıklama |
|------|-----|---------|----------|
| id | UUID | Otomatik | Benzersiz kimlik |
| firstname | TEXT | ✅ | İsim |
| lastname | TEXT | ✅ | Soyisim |
| phone | TEXT | ✅ | Telefon |
| email | TEXT | ✅ | E-posta |
| gender | TEXT | - | Cinsiyet |
| school | TEXT | - | Okul |
| department | TEXT | - | Bölüm |
| grade | TEXT | - | Sınıf |
| participation_type | TEXT | - | Katılım türü |
| attendance_day | TEXT | - | Katılım günü |
| motivation | TEXT | ✅ | Katılım nedeni |
| previous_event | TEXT | - | Önceki etkinlik |
| previous_project | TEXT | - | Proje deneyimi |
| project_explanation | TEXT | - | Proje açıklaması |
| email_consent | BOOLEAN | ✅ | E-posta izni |
| photo_consent | BOOLEAN | ✅ | Fotoğraf izni |
| created_at | TIMESTAMPTZ | Otomatik | Oluşturma tarihi |

---

## 🚀 Ek Özellikler

### E-posta Bildirimleri (İsteğe Bağlı)

Supabase Database Webhooks veya Functions kullanarak yeni başvurularda e-posta bildirimi alabilirsiniz.

### Admin Paneli (İsteğe Bağlı)

Supabase Authentication ile admin girişi yapıp verileri görebilirsiniz.

---

## 🆘 Sorun Giderme

### Form gönderilmiyor
- Browser Console'da hata var mı kontrol edin
- Supabase URL ve Key'in doğru olduğundan emin olun
- Network sekmesinde API çağrısını kontrol edin

### "Row Level Security" hatası
- SQL'deki policy'lerin doğru çalıştırıldığından emin olun
- Table Editor'dan manuel insert deneyin

### CORS hatası
- Supabase otomatik olarak tüm origin'lere izin verir
- Eğer hata alırsanız, Settings > API > CORS'u kontrol edin

---

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:
- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com

---

**🎉 Kurulum Tamamlandı!** Artık form başvurularınız Supabase'de güvenle saklanıyor.





