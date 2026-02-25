// predict 함수 안의 setTimeout 부분을 이렇게 바꿔봐!
setTimeout(() => {
    document.getElementById('loading').style.display = "none";
    const resArea = document.getElementById('result-area');
    const resStatus = document.getElementById('res-status');
    const resAdvice = document.getElementById('res-advice');
    const resBar = document.getElementById('res-bar');
    const resProb = document.getElementById('res-prob');
    const buyBtn = document.getElementById('buy-btn');

    resArea.style.display = "block";
    buyBtn.style.display = "block";

    // 정확도 계산 및 게이지 애니메이션
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
        resAdvice.innerText = "갈비뼈가 잘 만져지지 않는다면 체중 조절이 필요합니다. 다이어트 사료를 고려해 보세요.";
        buyBtn.href = "https://www.coupang.com/np/search?q=강아지+다이어트+사료";
    }
}, 1500);
