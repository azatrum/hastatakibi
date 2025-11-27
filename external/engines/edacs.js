// EDACS variant A implementation (troponin excluded).
// NOTE: This implementation uses a commonly referenced MDCalc-style mapping
// for age points and basic component scoring. Please verify against your
// institutional reference/MDCalc and let me know if you want exact changes.

export function calculateEDACSScore(patient, inputs) {
    // inputs expected:
    // { age, male (0/1 or boolean), radiation (0/1), diaphoresis (0/1), pain_severity (0-3), risk_factors_count (number) }
    function toInt(v, fallback = 0) {
        const n = parseInt(v);
        return Number.isNaN(n) ? fallback : n;
    }

    const age = toInt(inputs.age, 0);
    // Age points mapping (MDCalc-like):
    // <40:0, 40-49:2, 50-59:4, 60-69:6, >=70:8
    let agePoints = 0;
    if (age >= 70) agePoints = 8;
    else if (age >= 60) agePoints = 6;
    else if (age >= 50) agePoints = 4;
    else if (age >= 40) agePoints = 2;
    else agePoints = 0;

    const malePoints = toInt(inputs.male, 0) ? 1 : 0;
    const radiationPoints = toInt(inputs.radiation, 0) ? 1 : 0;
    const diaphoresisPoints = toInt(inputs.diaphoresis, 0) ? 1 : 0;
    const painSeverityPoints = Math.min(Math.max(toInt(inputs.pain_severity, 0), 0), 3);
    const riskFactorsPoints = Math.min(Math.max(toInt(inputs.risk_factors_count, 0), 0), 3);

    const score = agePoints + malePoints + radiationPoints + diaphoresisPoints + painSeverityPoints + riskFactorsPoints;

    // Risk strata (example thresholds). Please verify with your preferred reference.
    let riskText = 'Bilinmiyor';
    if (score <= 8) riskText = 'Düşük';
    else if (score <= 15) riskText = 'Orta';
    else riskText = 'Yüksek';

    if (patient) {
        patient.edacs_score = score;
        patient.edacs_risk = riskText;
    }

    return { score, riskText };
}