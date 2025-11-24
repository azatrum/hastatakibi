export function calculateNIHSSScore(inputs) {
    let score = 0;
    score += parseInt(inputs.consciousness || 0);
    score += parseInt(inputs.consciousness_questions || 0);
    score += parseInt(inputs.consciousness_commands || 0);
    score += parseInt(inputs.gaze || 0);
    score += parseInt(inputs.visual_fields || 0);
    score += parseInt(inputs.facial_palsy || 0);
    score += parseInt(inputs.motor_arm_left || 0);
    score += parseInt(inputs.motor_arm_right || 0);
    score += parseInt(inputs.motor_leg_left || 0);
    score += parseInt(inputs.motor_leg_right || 0);
    score += parseInt(inputs.limb_ataxia || 0);
    score += parseInt(inputs.sensory || 0);
    score += parseInt(inputs.language || 0);
    score += parseInt(inputs.dysarthria || 0);
    score += parseInt(inputs.extinction_inattention || 0);
    
    let severity = '';
    let interpretation = '';
    
    if (score === 0) {
        severity = 'İnme Yok';
        interpretation = 'Normal nörolojik muayene.';
    } else if (score < 5) {
        severity = 'Çok Hafif';
        interpretation = 'Minimal nörolojik defisit. Prognoz genellikle iyidir.';
    } else if (score < 15) {
        severity = 'Hafif-Orta';
        interpretation = 'Orta düzeyde nörolojik defisit. t-PA tedavisi düşünülmeli.';
    } else if (score < 20) {
        severity = 'Orta-Ağır';
        interpretation = 'Ağır nörolojik defisit. Yoğun bakım ve thromboektomi değerlendirilmeli.';
    } else if (score < 26) {
        severity = 'Ağır';
        interpretation = 'Çok ağır defisit. Mekanik trombektomi ve destek tedavisi önerilir.';
    } else {
        severity = 'En Ağır';
        interpretation = 'Hayatı tehdit eden durum. Masif şiddetli beyin hasarı. Süporte tedavi ve etik konsültasyon gerekli.';
    }
    
    return { score, severity, interpretation };
}
