Acil Hasta Takip — README

Amaç
- `index.html` uygulaması, `external/` klasöründen opsiyonel JSON şablonları ve JS hesaplama motorlarını (ES module) yükleyebilir.
- Uygulamanın içindeki Ayarlar üzerinden yapılan değişiklikler tarayıcı `localStorage`'a kaydedilir. Tarayıcı güvenlik kısıtları nedeniyle bu web uygulaması doğrudan çalışma dizinindeki `external/` klasörüne yazmaz.

Nasıl çalışır (özet)
- Uygulama başlatıldığında (`initializeApp`) `loadExternalResources()` çağrılır.
- Bu fonksiyon öncelikle `external/templates/*.json` dosyalarını `fetch()` ile, ardından `external/engines/*.js` modüllerini `import()` ile yüklemeye çalışır.
- Eğer dosyalar bulunursa, yüklendikten sonra ilgili veri (ör. `anamnezTemplates`, `testTemplates`, `diagnosisTemplates`, `scoringSystems`) `localStorage` içinde güncellenir ve UI bu verilerle başlar.
- Eğer external dosyalar yoksa uygulama dahili/default şablonları ve `localStorage` içeriğini kullanmaya devam eder.

Dış şablon dosyası formatı (JSON örnekleri)
- `external/templates/anamnez_templates.json`
[
  {
    "name": "Normal FM",
    "section": "examination",
    "text": "..."
  }
]

- `external/templates/test_templates.json`
[
  {
    "name": "AKS Protokolü",
    "diagnosis": "Akut Koroner Sendrom",
    "tests": [ { "name": "EKG", "delayMinutes": 0 }, { "name": "Troponin", "delayMinutes": 0 } ]
  }
]

- `external/templates/scoring_systems.json` ve `diagnosis_templates.json` benzer şekilde basit array'ler olmalıdır.

Hesaplama motoru (engine) modülleri
- `external/engines/heart.js` örneği ES module olmalı ve `export function calculateHEARTScore(patient, inputs) { ... }` gibi fonksiyonları dışa aktarmalıdır.
- Uygulama `loadExternalResources()` içinde `import('./external/engines/heart.js')` ile bu modülü yükleyip varsa `window.calculateHEARTScore` fonksiyonunu override eder.

Uygulama içinden yapılan değişiklikler nereye kaydedilir?
- Tüm UI işlemleri (şablon ekleme, test uygulama, hasta düzenleme) doğrudan `localStorage`'a yazılır.
- Tarayıcı tabanlı bir web uygulaması olarak, doğrudan dosya sistemine (ör. `external/*.json`) yazma yetkisi yoktur. Bu nedenle uygulama içinden eklediğiniz şablonlar sadece `localStorage` içinde saklanır.

External dosyalara otomatik olarak yazılsın istersem ne yapmalıyım?
Seçenekler:
1) Yerel bir sunucu (ör. Node/Express) kurun ve `external/` dizinini hem statik dosya olarak sunun hem de bir POST/PUT endpoint ile dosya yazma izni verin. Uygulama, dosya yazma gerektiğinde bu endpoint'i çağırabilir.
2) Uygulamayı Electron gibi bir masaüstü kabuğuna paketleyin; Electron içinde doğrudan `fs` modülü ile dosya yazabilirsiniz.

Örnek basit Node/Express sunucu (dosya yazma için dikkat: güvenlik)
- `server.js` (örnek):

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({ limit: '5mb' }));

const EXTERNAL_DIR = path.join(__dirname, 'external', 'templates');
app.use('/external/templates', express.static(EXTERNAL_DIR));

app.post('/api/templates/save/:name', (req, res) => {
  const name = req.params.name; // örn: anamnez_templates.json
  const data = req.body;
  const filePath = path.join(EXTERNAL_DIR, name);
  // Güvenlik: production için doğrulama ve izin gerekir!
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).json({ ok: false, error: err.message });
    res.json({ ok: true });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

- Bu sunucu çalışırken tarayıcı uygulamanız `fetch('/api/templates/save/anamnez_templates.json', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type':'application/json' } })` şeklinde çağrı yaparak `external` klasörünü güncelleyebilir.

Güvenlik uyarısı
- Dosya yazma endpoint'leri tehlikelidir; yalnızca güvenilir, kapalı ağlarda ve uygun kimlik doğrulama/izinlerle kullanılmalıdır.

Hızlı yerel test
- Sadece statik dosyaları test etmek için proje kökünde basit HTTP sunucu çalıştırabilirsiniz:

Python 3:
```powershell
python -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000/index.html` açın.

Özet (kısa cevap)
- Evet, `external` klasöründeki dosyalar uygulama tarafından "okunur" ve varsa `localStorage`'ı override eder.
- Hayır, uygulama içinden yapılan değişiklikler otomatik olarak `external/` dosyalarına yazılmaz; sadece `localStorage`'a kaydedilir.
- Eğer `external` dosyalarına uygulama içinden yazılmasını istiyorsanız bir sunucu (ör. Node/Express) veya Electron gibi çözüm gerekir — örnek kod üstte verilmiştir.

İsterseniz ben:
- Proje köküne örnek `server.js` ve `package.json` oluşturayım (lokalde çalıştırıp `external` dosyalarını yazdırabilmeniz için). 
- Veya uygulamanın tüm inline JS kısmını modüler `js/` dosyalarına taşıyıp `index.html`'i temizleyeyim.

Hangi adımı istersiniz? 
