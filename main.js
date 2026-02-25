const URL = "https://teachablemachine.withgoogle.com/models/Kulg1mwvS/";
let model, maxPredictions;

async function init() {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    maxPredictions = model.getTotalClasses();
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('image-preview');
        output.src = reader.result;
        output.style.display = "block";
        document.getElementById('result-area').style.display = "none";
    }
    reader.readAsDataURL(event.target.files[0]);
}

async function predict() {
    const img = document.getElementById('image-preview');
    if (!img.src || img.src.includes('window.location')) return alert("사진을 먼저 선택해주세요!");

    document.getElementById('loading').style.display = "block";
    document.getElementById('result-area').style.display = "none";
    
    const prediction = await model.predict(img);
    let topResult = { className: "", probability: 0 };

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > topResult.probability) {
            topResult = prediction[i];
        }
    }

    setTimeout(() => {
        document.getElementById('loading').style.display = "none";
        const resArea = document.getElementById('result-area');
        const resStatus = document.getElementById('res-status');
        const resAdvice = document.getElementById('res-advice');
        const resBar = document.getElementById('res-bar');
        const resProb = document.getElementById('res-prob');
        const buyBtn = document.getElementById('buy-btn');

        resArea.style.display = "block";
        
        const probPercent = Math.floor(topResult.probability * 100);
        resBar.style.width = probPercent + "%";
        resProb.innerText = `AI 분석 확신도: ${probPercent}%`;

        if (topResult.className === "Class 1") {
            resStatus.innerText = "✅ 아주 건강해요!";
            resStatus.style.color = "#4CAF50";
            resAdvice.innerText = "현재 이상적인 체형입니다. 꾸준한 활동량과 균형 잡힌 식단이 비결이네요!";
            buyBtn.href = "https://www.coupang.com/np/search?q=강아지+영양제";
        } else {
            resStatus.innerText = "⚠️ 관리가 필요해요";
            resStatus.style.color = "#F44336";
            resAdvice.innerText = "조금 통통한 상태인 것 같아요. 다이어트 사료와 산책 횟수를 늘려주는 건 어떨까요?";
            buyBtn.href = "https://www.coupang.com/np/search?q=강아지+다이어트+사료";
        }
    }, 1500);
}

init();
