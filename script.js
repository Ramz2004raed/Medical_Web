document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript متصل بنجاح!");

    /*******************************
     * 🏥 1. صفحة رفع الصور الطبية *
     *******************************/
    let imageTypeSelect = document.getElementById("image_type");
    let imageUrlInput = document.getElementById("image_url");

    if (imageTypeSelect) {
        imageTypeSelect.addEventListener("change", function () {
            imageUrlInput.style.border = imageTypeSelect.value ? "2px solid green" : "2px solid red";
        });
    }

    /********************************
     * 🔍 2. صفحة التشخيص الطبي *
     ********************************/
    let symptomsInput = document.getElementById("symptoms");
    let ageInput = document.getElementById("age"); // إضافة حقل العمر
    let diagnoseButton = document.getElementById("diagnose_button");
    let resultText = document.getElementById("result_text");

    if (diagnoseButton) {
        diagnoseButton.addEventListener("click", function () {
            let symptoms = symptomsInput.value.trim();
            let age = ageInput.value.trim(); // الحصول على قيمة العمر
            if (!symptoms || !age) {
                alert("❌ يرجى إدخال العمر والأعراض!");
                symptomsInput.style.border = "2px solid red";
                ageInput.style.border = "2px solid red";
                return;
            }

            symptomsInput.style.border = "2px solid green";
            ageInput.style.border = "2px solid green"; // تلوين حقل العمر باللون الأخضر

            // عرض رسالة انتظار
            resultText.innerHTML = `<span>جاري تحليل الأعراض...</span>`;

            // إرسال العمر والأعراض إلى الخادم
            fetch("http://127.0.0.1:5000/diagnosis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    age: age,
                    symptoms: symptoms.split(",").map(s => s.trim())
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        resultText.innerHTML = `<span style="color: red;">❌ ${data.error}</span>`;
                    } else {
                        resultText.innerHTML = `<span style="color: green;">✅ ${data.message}</span>`;
                    }
                })
                .catch(error => {
                    resultText.innerHTML = `<span style="color: red;">❌ خطأ في الاتصال بالخادم!</span>`;
                    console.error("❌ خطأ في الاتصال:", error);
                });
        });
    }

    /*******************************
     * 🧪 3. صفحة الفحوصات المخبرية *
     *******************************/
    let testTypeSelect = document.getElementById("test_type");
    let testDetailsDiv = document.getElementById("test_details");

    if (testTypeSelect) {
        testTypeSelect.addEventListener("change", function () {
            testDetailsDiv.style.display = testTypeSelect.value ? "block" : "none";
        });
    }

    /********************************
     * 💊 4. صفحة الأدوية *
     ********************************/
    let queryTypeSelect = document.getElementById("query_type");
    let generalQueryDiv = document.getElementById("general_query");
    let detailedQueryDiv = document.getElementById("detailed_query");

    if (queryTypeSelect) {
        queryTypeSelect.addEventListener("change", function () {
            generalQueryDiv.style.display = queryTypeSelect.value === "info" ? "block" : "none";
            detailedQueryDiv.style.display = queryTypeSelect.value === "take" ? "block" : "none";
        });
    }

    /************************************ 
     * 📌 إرسال صورة طبية إلى الخادم *
     ************************************/
    let analyzeButton = document.getElementById("analyze_button");
    if (analyzeButton) {
        analyzeButton.addEventListener("click", function () {
            let imageUrl = imageUrlInput.value.trim();
            if (!imageUrl) {
                alert("❌ يرجى إدخال رابط الصورة!");
                return;
            }

            // عرض رسالة انتظار
            alert("جاري إرسال الصورة للتحليل...");

            fetch("http://127.0.0.1:5000/analyze_image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_url: imageUrl })
            })
                .then(response => response.json())
                .then(data => {
                    alert(`✅ تحليل الصورة: ${data.message}`);
                })
                .catch(error => {
                    alert("❌ حدث خطأ أثناء تحليل الصورة.");
                    console.error("❌ خطأ في الاتصال:", error);
                });
        });
    }
});
