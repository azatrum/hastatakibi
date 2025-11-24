export function calculateGlasgowBlatchford(inputs) {
    let score = 0;
    score += parseInt(inputs.blood_in_pr || 0);
    score += parseInt(inputs.melena || 0);
    score += parseInt(inputs.systolic_bp || 0);
    score += parseInt(inputs.pulse_rate || 0);
    score += parseInt(inputs.fresh_frozen_plasma || 0);
    score += parseInt(inputs.hemoglobin || 0);

    let risk = '';
    let transfusion_probability = '';
    let interpretation = '';

    if (score === 0) {
        risk = 'Çok Düşük';
        transfusion_probability = '<5%';
        interpretation = 'Düşük risk kanama veya transfüzyon ihtiyacı. Poliklinik izlemi yeterli olabilir.';
    } else if (score <= 2) {
        risk = 'Düşük';
        transfusion_probability = '5-10%';
        interpretation = 'Düşük kan transfüzyon riski. Kısa hospitalizasyon ve endoskopi.';
    } else if (score <= 4) {
        risk = 'Orta';
        transfusion_probability = '10-30%';
        interpretation = 'Orta transfüzyon riski. Acil endoskopi ve IV erişimi sağla.';
    } else {
        risk = 'Yüksek';
        transfusion_probability = '>30%';
        interpretation = 'Yüksek kan transfüzyon riski. ICU takibi, O-type kan hazırla, acil endoskopi.';
    }

    return { score, risk, transfusion_probability, interpretation };
}
