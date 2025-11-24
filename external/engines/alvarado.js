export function calculateAlvarado(inputs) {
    let score = 0;
    score += parseInt(inputs.migration_to_right_iliac || 0);
    score += parseInt(inputs.anorexia || 0);
    score += parseInt(inputs.nausea_vomiting || 0);
    score += parseInt(inputs.tenderness_right_iliac || 0);
    score += parseInt(inputs.rebound_pain || 0);
    score += parseInt(inputs.elevated_temperature || 0);
    score += parseInt(inputs.leukocytosis || 0);
    score += parseInt(inputs.left_shift || 0);
    
    let likelihood = '';
    let interpretation = '';
    
    if (score < 5) {
        likelihood = 'Düşük';
        interpretation = 'Apandisit olasılığı %0-30%. Detaylı muayene, US veya CT. Klinik gözlem önerilir.';
    } else if (score <= 6) {
        likelihood = 'Belirsiz';
        interpretation = 'Apandisit olasılığı %30-72%. US (Ultrasound) veya CT tarama yapılmalı.';
    } else if (score <= 8) {
        likelihood = 'Yüksek';
        interpretation = 'Apandisit olasılığı %72-96%. Cerrahiye hazırlık ve danışman çağır.';
    } else {
        likelihood = 'Çok Yüksek';
        interpretation = 'Apandisit olasılığı %96%+. Cerrah ile iletişime geç. Ameliyat hazırla.';
    }
    
    return { score, likelihood, interpretation };
}
