document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript متصل بنجاح!");

    function speakText(text) {
        let speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = "ar-SA";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;
        window.speechSynthesis.speak(speech);
    }

    async function fetchDrugInfo() {
        let drugName = document.getElementById("drug_name").value.trim();
        let resultDiv = document.getElementById("drug_info");
        let loadingText = document.getElementById("loading");

        if (!drugName) {
            alert("❌ يرجى إدخال اسم الدواء!");
            return;
        }

        resultDiv.innerHTML = "";
        loadingText.style.display = "block";

        try {
            let response = await fetch(`http://127.0.0.1:5000/drug_info?name=${encodeURIComponent(drugName)}`);
            let drugData = await response.json();

            loadingText.style.display = "none";

            if (drugData.error) {
                resultDiv.innerHTML = `<p style="color: red;">❌ ${drugData.error}</p>`;
                speakText(`❌ ${drugData.error}`);
                return;
            }

            resultDiv.innerHTML = `<pre>${drugData.result}</pre>`;
            speakText(drugData.result);

        } catch (error) {
            loadingText.style.display = "none";
            resultDiv.innerHTML = `<p style="color: red;">❌ خطأ في الاتصال بالخادم!</p>`;
            speakText("❌ خطأ في الاتصال بالخادم");
            console.error("❌ خطأ في الاتصال:", error);
        }
    }

    document.querySelector("button").addEventListener("click", fetchDrugInfo);
});
