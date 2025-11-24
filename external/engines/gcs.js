export function calculateGCS(inputs) {
    let score = 0;
    score += parseInt(inputs.eye_opening || 1);
    score += parseInt(inputs.verbal_response || 1);
    score += parseInt(inputs.motor_response || 1);
    
    let category = '';
    let interpretation = '';
    
    if (score <= 8) {
        category = 'Ağır';
        interpretation = 'Ağır beyin hasarı. Hava yolunu güvence altına al (entübasyon). ICU takibi zorunlu. Mortalite riski yüksek.';
    } else if (score <= 12) {
        category = 'Orta';
        interpretation = 'Orta derecede beyin hasarı. Yakın monitörizasyon gerekli. Anestezi konsültasyonu ve müdahale hazırlığı.';
    } else if (score <= 14) {
        category = 'Hafif';
        interpretation = 'Hafif beyin hasarı. Kognitif gözlem ve taburcu öncesi dikkat. Baş ağrısı, hafıza sorunları göz önüne alınmalı.';
    } else {
        category = 'Normal';
        interpretation = 'Normal GCS skoru. Detaylı nörolojik muayene yapılmalı.';
    }
    
    return { score, category, interpretation };
}
