export function calculateQSOFA(inputs) {
    let score = 0;
    score += parseInt(inputs.altered_mentation || 0);
    score += parseInt(inputs.systolic_bp_below_100 || 0);
    score += parseInt(inputs.respiratory_rate_above_22 || 0);
    
    let risk = '';
    let interpretation = '';
    
    if (score === 0) {
        risk = 'Düşük';
        interpretation = 'Sepsis/ölüm riski %1%. Standart bakım yeterli olabilir.';
    } else if (score === 1) {
        risk = 'Orta';
        interpretation = 'Sepsis/ölüm riski %5%. Enfeksiyon kaynağını araştır ve antimikrobial başla.';
    } else if (score >= 2) {
        risk = 'Yüksek';
        interpretation = 'Sepsis/ölüm riski %15%+. Agresif sıvı resüsitasyonu, vasopressor, geniş spektrumlu antibiyotik başla. ICU transferi düşün.';
    }
    
    return { score, risk, interpretation };
}
