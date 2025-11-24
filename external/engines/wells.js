export function calculateWellsScore(inputs) {
    let score = 0;
    score += parseInt(inputs.clinical_suspicion || 0);
    score += parseInt(inputs.heart_rate || 0);
    score += parseInt(inputs.immobilization || 0);
    score += parseInt(inputs.hemoptysis || 0);
    score += parseInt(inputs.clinical_signs || 0);
    score += parseInt(inputs.dvt_symptoms || 0);
    score += parseInt(inputs.pe_diagnosis || 0);
    
    let risk = '';
    let interpretation = '';
    
    if (score < 2) {
        risk = 'Düşük';
        interpretation = 'PE olasılığı %1.6%. D-dimer negatifse PE dışlanabilir.';
    } else if (score <= 6) {
        risk = 'Orta';
        interpretation = 'PE olasılığı %16.2%. D-dimer+CT anjiyografi önerilir.';
    } else {
        risk = 'Yüksek';
        interpretation = 'PE olasılığı %37.8%. CT anjiyografi veya V/Q sintigrafisi yapılmalı.';
    }
    
    return { score, risk, interpretation };
}
