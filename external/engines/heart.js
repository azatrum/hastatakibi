export function calculateHEARTScore(patient, inputs) {
    // Basit örnek implementasyon; uygulamanızın ihtiyaçlarına göre genişletin.
    let score = 0;
    score += parseInt(inputs.history_score || 0);
    score += parseInt(inputs.ekg_score || 0);
    score += parseInt(inputs.age_score || 0);
    score += parseInt(inputs.risk_score || 0);
    score += parseInt(inputs.troponin_score || 0);

    const risk = score <= 3 ? 'Düşük' : score <= 6 ? 'Orta' : 'Yüksek';
    // Hasta nesnesine kaydet
    if (patient) {
        patient.heart_score = score;
        patient.heart_risk = risk;
        patient.last_score = `${score} (${risk})`;
    }

    return { score, riskText: `(Risk: ${risk})` };
}
