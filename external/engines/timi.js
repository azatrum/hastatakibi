export function calculateTIMIScore(inputs) {
    let score = 0;
    score += parseInt(inputs.age_65_above || 0);
    score += parseInt(inputs.risk_factors || 0);
    score += parseInt(inputs.aspirin_use || 0);
    score += parseInt(inputs.severity || 0);
    score += parseInt(inputs.ekg_changes || 0);
    score += parseInt(inputs.enzyme_elevation || 0);
    
    let risk = '';
    let interpretation = '';
    
    if (score <= 1) {
        risk = 'Çok Düşük';
        interpretation = '14 günlük MACE riski: %1.6%. Sadece asetoaminofen veya NSAID önerilir.';
    } else if (score <= 2) {
        risk = 'Düşük';
        interpretation = '14 günlük MACE riski: %3.3%. İnvazif strateji düşünülebilir.';
    } else if (score <= 4) {
        risk = 'Orta';
        interpretation = '14 günlük MACE riski: %7.3%. P2Y12 inhibitörü + Heparin önerilir.';
    } else if (score <= 6) {
        risk = 'Yüksek';
        interpretation = '14 günlük MACE riski: %13.4%. Agresif antikoagülasyon ve P2Y12 inhibitörü.';
    } else {
        risk = 'Çok Yüksek';
        interpretation = '14 günlük MACE riski: %19.9%. ICU/KBH takibi, invazif strateji yapılmalı.';
    }
    
    return { score, risk, interpretation };
}
