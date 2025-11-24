export function calculateRanson(inputs, isPrediction = true) {
    let score = 0;
    
    if (isPrediction) {
        // Admission criteria
        score += parseInt(inputs.age_above_55 || 0);
        score += parseInt(inputs.wbc_above_16 || 0);
        score += parseInt(inputs.glucose_above_200 || 0);
        score += parseInt(inputs.ast_above_250 || 0);
        score += parseInt(inputs.ldh_above_350 || 0);
    } else {
        // 48-hour criteria
        score += parseInt(inputs.hematocrit_drop_above_10 || 0);
        score += parseInt(inputs.bun_increase_above_5 || 0);
        score += parseInt(inputs.calcium_below_8 || 0);
        score += parseInt(inputs.pao2_below_60 || 0);
        score += parseInt(inputs.base_deficit_above_4 || 0);
        score += parseInt(inputs.fluid_sequestration_above_6 || 0);
    }
    
    let mortality = '';
    let interpretation = '';
    
    if (score <= 2) {
        mortality = '%1-3';
        interpretation = 'Hafif pankreatit. Standart tedavi yeterli.';
    } else if (score <= 4) {
        mortality = '%11-15';
        interpretation = 'Orta ağırlıkta pankreatit. Yakın monitörizasyon ve destek tedavisi.';
    } else if (score <= 6) {
        mortality = '%30-50';
        interpretation = 'Ağır pankreatit. ICU takibi, sıvı resüsitasyonu, organ destek tedavisi.';
    } else {
        mortality = '%50%+';
        interpretation = 'Çok ağır/fulminan pankreatit. Kritik bakım, ECMO/CRRT düşün.';
    }
    
    return { score, mortality, interpretation };
}
