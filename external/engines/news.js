export function calculateNEWS(vitals) {
    // Basit NEWS hesaplayıcı; orijinal fonksiyonun aynısını burada tanımlayabilirsiniz.
    let score = 0;
    const rr = parseInt(vitals.vitals_resp_rate);
    if (rr <= 8) score += 3; else if (rr <= 11) score += 1; else if (rr <= 20) score += 0; else if (rr <= 24) score += 2; else score += 3;
    const spo2 = parseInt(vitals.vitals_spo2);
    if (spo2 <= 91) score += 3; else if (spo2 <= 93) score += 2; else if (spo2 <= 95) score += 1;
    const systolic = parseInt(vitals.vitals_bp_systolic);
    if (systolic <= 90) score += 3; else if (systolic <= 100) score += 2; else if (systolic <= 110) score += 1; else if (systolic <= 219) score += 0; else score += 3;
    const pulse = parseInt(vitals.vitals_pulse);
    if (pulse <= 40) score += 3; else if (pulse <= 50) score += 1; else if (pulse <= 90) score += 0; else if (pulse <= 110) score += 1; else if (pulse <= 130) score += 2; else score += 3;
    const temp = parseFloat(vitals.vitals_temp);
    if (temp <= 35) score += 3; else if (temp <= 36) score += 1; else if (temp <= 38) score += 0; else if (temp <= 39) score += 1; else score += 2;
    const gcs = parseInt(vitals.vitals_gcs);
    if (gcs <= 8) score += 3; else if (gcs <= 14) score += (15 - gcs);
    return score;
}
