from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import pandas as pd

# إنشاء تطبيق Flask
app = Flask(__name__)
CORS(app)  # السماح بالتواصل مع الواجهة الأمامية

# ✅ الصفحة الرئيسية (للتأكد من أن السيرفر يعمل)
@app.route('/')
def home():
    return "🚀 خادم Flask يعمل بنجاح!"

# 🎯 API 1: استقبال الصورة الطبية وتحليلها
@app.route('/analyze_image', methods=['POST'])
def analyze_image():
    try:
        data = request.json
        image_url = data.get("image_url")

        if not image_url:
            return jsonify({"error": "❌ يرجى إدخال رابط الصورة"}), 400

        # 🔍 (مكان كود تحليل الصور - OpenCV أو نموذج ذكاء اصطناعي)
        result = f"✅ تم استلام الصورة بنجاح من الرابط: {image_url}"

        return jsonify({"message": result, "status": "success"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🎯 API 2: استقبال الأعراض الطبية وتحليلها
@app.route('/diagnosis', methods=['POST'])
def diagnosis():
    try:
        data = request.json
        symptoms = data.get("symptoms", [])

        if not symptoms:
            return jsonify({"error": "❌ يرجى إدخال الأعراض"}), 400

        # 🔍 (مكان كود تحليل الأعراض الطبية باستخدام الذكاء الاصطناعي)
        diagnosis_result = f"🔍 بناءً على الأعراض المقدمة ({', '.join(symptoms)}), هناك احتمال للإصابة بعدوى فيروسية."

        return jsonify({"message": diagnosis_result, "status": "success"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🚀 تشغيل السيرفر
if __name__ == '__main__':
    print("🚀 تشغيل الخادم...")
    app.run(debug=True)
