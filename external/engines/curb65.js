export function calculateCURB65(inputs) {
    let score = 0;
    score += parseInt(inputs.confusion || 0);
    score += parseInt(inputs.urea_above_7 || 0);
    score += parseInt(inputs.respiratory_rate_above_30 || 0);
    score += parseInt(inputs.bp_low || 0);
    score += parseInt(inputs.age_above_65 || 0);
    
    let severity = '';
    let mortality = '';
    let recommendation = '';
    
    if (score === 0) {
        severity = 'Düşük';
        mortality = '%1';
        recommendation = 'Ambulatuvar tedavi (oral antibiyotik), evde takip yeterli olabilir.';
    } else if (score === 1) {
        severity = 'Düşük-Orta';
        mortality = '%3';
        recommendation = 'Ambulatuvar tedavi veya kısa hospitalizasyon (1-2 gün) sonra ev tedavisi.';
    } else if (score === 2) {
        severity = 'Orta';
        mortality = '%4';
        recommendation = 'Hastaneye yatış önerilir. Oksijen uygulaması, IV sıvı, antibiyotik tedavisi.';
    } else if (score === 3) {
        severity = 'Ağır';
        mortality = '%17';
        recommendation = 'Yoğun bakım veya monitor altı tedavi. Hava yolunu kontrol et, destek tedavisi.';
    } else {
        severity = 'Çok Ağır';
        mortality = '%30+';
        recommendation = 'ICU yatışı zorunlu. Mekanik ventilasyon, vasopressor, sepsis protokolü.';
    }
    
    return { score, severity, mortality, recommendation };
}
