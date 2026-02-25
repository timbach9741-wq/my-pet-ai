const URL = "https://teachablemachine.withgoogle.com/models/Kulg1mwvS/";
let model, maxPredictions;

async function init() {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    maxPredictions = model.getTotalClasses();
    console.log("AI 준비 완료!");
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('image-preview');
        output.src = reader.result;
        output.style.display = "block";
        document.getElementById('result-card').style.display = "none"; // 새 사진 올리면 이전 결과 숨김
    }
    reader.readAsDataURL(event.target.files[0]);
}

async function predict() {
    const img = document.getElementById('image-preview');
    if (!img.src || img.src.includes('window.location')) return alert("사진을 먼저 선택해주세요!");

    document.getElementById('loading').style.display = "block";
    document.getElementById('result-card').style.display = "none";
    
    const prediction = await model.predict(img);
    let topResult = { className: "", probability: 0 };

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > topResult.probability) {
            topResult = prediction[i];
        }
    }

    // 화면에 결과 업데이트
    setTimeout(() => {
        document.getElementById('loading').style.display = "none";
        const resCard = document.getElementById('result-card');
        const resStatus = document.getElementById('res-status');
        const resAdvice = document.getElementById('res-advice');
        const resProb = document.getElementById('res-prob');

        resCard.style.display = "block";
        resProb.innerText = `분석 정확도: ${Math.floor(topResult.probability * 100)}%`;

        if (topResult.className === "Class 1") {
            resStatus.innerText = "✅ 짱구네 건강한 아이";
            resStatus.style.color = "#4CAF50";
            resAdvice.innerText = "지금처럼 꾸준한 산책과 건강한 식단을 유지해주세요!";
        } else {
            resStatus.innerText = "⚠️ 비만 관리 필요";
            resStatus.style.color = "#F44336";
            resAdvice.innerText = "다이어트 사료와 규칙적인 운동으로 관리가 필요한 상태입니다.";
        }
    }, 1500);
}


init();
