document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript متصل بنجاح!");

    /*******************************
     * 🏥 1. صفحة رفع الصور الطبية *
     *******************************/
    let imageTypeSelect = document.getElementById("image_type");
    let imageUrlInput = document.getElementById("image_url");

    if (imageTypeSelect) {
        imageTypeSelect.addEventListener("change", function () {
            if (imageTypeSelect.value) {
                imageUrlInput.style.border = "2px solid green";
            } else {
                imageUrlInput.style.border = "2px solid red";
            }
        });
    }

    /********************************
     * 🔍 2. صفحة التشخيص الطبي *
     ********************************/
    let symptomsInput = document.getElementById("symptoms");
    let diagnosisForm = document.getElementById("diagnosis_form");

    if (diagnosisForm) {
        diagnosisForm.addEventListener("submit", function (event) {
            if (!symptomsInput.value.trim()) {
                event.preventDefault();
                alert("يرجى إدخال الأعراض لتحليل التشخيص!");
                symptomsInput.style.border = "2px solid red";
            } else {
                symptomsInput.style.border = "2px solid green";
            }
        });
    }

    /*******************************
     * 🧪 3. صفحة الفحوصات المخبرية *
     *******************************/
    let testTypeSelect = document.getElementById("test_type");
    let testDetailsDiv = document.getElementById("test_details");

    if (testTypeSelect) {
        testTypeSelect.addEventListener("change", function () {
            if (testTypeSelect.value) {
                testDetailsDiv.style.display = "block";
            } else {
                testDetailsDiv.style.display = "none";
            }
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
            if (queryTypeSelect.value === "info") {
                generalQueryDiv.style.display = "block";
                detailedQueryDiv.style.display = "none";
            } else if (queryTypeSelect.value === "take") {
                generalQueryDiv.style.display = "none";
                detailedQueryDiv.style.display = "block";
            } else {
                generalQueryDiv.style.display = "none";
                detailedQueryDiv.style.display = "none";
            }
        });
    }

    /********************************
     * 🏠 5. الصفحة الرئيسية *
     ********************************/
    let homeWelcomeMessage = document.getElementById("home_welcome");

    if (homeWelcomeMessage) {
        setTimeout(() => {
            homeWelcomeMessage.style.opacity = "1";
            homeWelcomeMessage.style.transform = "translateY(0)";
        }, 500);
    }

    /************************************
     * ✅ منع إرسال النماذج دون إدخال بيانات *
     ************************************/
    let forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("submit", function (event) {
            let inputs = form.querySelectorAll("input[required], select[required]");
            let valid = true;

            inputs.forEach((input) => {
                if (!input.value.trim()) {
                    input.style.border = "2px solid red";
                    valid = false;
                } else {
                    input.style.border = "2px solid green";
                }
            });

            if (!valid) {
                event.preventDefault();
                alert("يرجى ملء جميع الحقول المطلوبة!");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector(".form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let imageUrl = document.getElementById("image_url").value;
            if (!imageUrl.trim()) {
                alert("❌ يرجى إدخال رابط الصورة!");
                return;
            }

            fetch("http://127.0.0.1:5000/analyze_image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image_url: imageUrl })
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                })
                .catch(error => console.error("خطأ في الاتصال:", error));
        });
    }
});
