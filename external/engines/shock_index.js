export function calculateShockIndex(systolicBP, heartRate) {
    const shockIndex = heartRate / systolicBP;
    
    let severity = '';
    let interpretation = '';
    
    if (shockIndex < 0.6) {
        severity = 'Düşük/Normal';
        interpretation = 'Normal hemodynami. Şok riski minimal.';
    } else if (shockIndex < 0.9) {
        severity = 'Normal';
        interpretation = 'Normal şok indeksi. Standart tedavi yeterli.';
    } else if (shockIndex < 1.0) {
        severity = 'Hafif Tachycardia';
        interpretation = 'Hafif kalp hızı artışı. Sıvı kayıpları kontrol et.';
    } else if (shockIndex < 1.5) {
        severity = 'Orta';
        interpretation = 'Orta derecede şok belirtileri. Agresif sıvı resüsitasyonu başla.';
    } else if (shockIndex < 2.0) {
        severity = 'Ağır';
        interpretation = 'Ağır şok (hipovolümik). IV sıvı ve transfüzyon. Ameliyat hazırla.';
    } else {
        severity = 'Çok Ağır';
        interpretation = 'Dekompensatif şok. Vasopressor, ICU, acil müdahale gerekli.';
    }
    
    return { shockIndex: shockIndex.toFixed(2), severity, interpretation };
}
