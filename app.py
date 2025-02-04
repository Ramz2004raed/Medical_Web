from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# 🔑 مفاتيح API
GEMINI_API_KEY = "AIzaSyBwJg2SaqIDDOOfCJFohMj1RgDwvByR27Q"
OPENFDA_API_KEY = "hpEVuXy5fMXKKwQoYx37y8imbMPS35vD0tzWF5sW"
OPENFDA_BASE_URL = "https://api.fda.gov/drug/label.json"

# ✅ تهيئة مكتبة Gemini AI
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

# 🧠 **تحليل البيانات باستخدام الذكاء الاصطناعي**
def process_with_gemini(text):
    if not text:
        return "❌ لا توجد بيانات متاحة."
    try:
        response = gemini_model.generate_content(f"رتب البيانات الطبية التالية بشكل مفهوم:\n{text}")
        return response.text if response.text else "❌ لم يتمكن الذكاء الاصطناعي من المعالجة."
    except Exception as e:
        return f"❌ خطأ في الاتصال بـ Gemini: {str(e)}"

# 🎯 **API لاسترجاع معلومات الدواء**
@app.route('/drug_info', methods=['GET'])
def get_drug_info():
    drug_name = request.args.get('name')
    if not drug_name:
        return jsonify({"error": "❌ يرجى إدخال اسم الدواء!"}), 400

    try:
        response = requests.get(
            OPENFDA_BASE_URL,
            params={
                "api_key": OPENFDA_API_KEY,
                "search": f'openfda.brand_name:"{drug_name}"',
                "limit": 1
            }
        )
        data = response.json()

        # 🔍 **طباعة البيانات للتحقق**
        print("📢 بيانات API:", data)

        if "error" in data or "results" not in data or not data["results"]:
            return jsonify({"error": "❌ لم يتم العثور على معلومات للدواء."}), 404

        drug_data = data["results"][0]

        # ✅ **تحسين استخراج البيانات (تفادي undefined)**
        formatted_text = f"""
        💊 الاسم التجاري: {drug_name}
        📌 الاسم العلمي: {drug_data.get("openfda", {}).get("generic_name", ["غير متاح"])[0]}
        🔬 المكونات: {", ".join(drug_data.get("active_ingredient", ["غير متاح"]))}
        📏 الجرعة: {drug_data.get("dosage_and_administration", ["غير متاح"])[0]}
        ⚠ الأعراض الجانبية: {drug_data.get("warnings", ["غير متاح"])[0]}
        🏥 التصنيف: {drug_data.get("pharmacologic_class", ["غير متاح"])[0]}
        """

        processed_data = process_with_gemini(formatted_text)
        return jsonify({"result": processed_data})

    except Exception as e:
        return jsonify({"error": f"❌ خطأ في الاتصال بالخادم: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
