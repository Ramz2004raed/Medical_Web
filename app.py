from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import pandas as pd

# إنشاء تطبيق Flask
app = Flask(__name__)
CORS(app)  # السماح بالتواصل مع الواجهة الأمامية

# الصفحة الرئيسية (للتأكد من أن السيرفر يعمل)
@app.route('/')
def home():
    return "🚀 خادم Flask يعمل بنجاح!"

# 🎯 API لاستقبال الصورة الطبية وتحليلها
@app.route('/analyze_image', methods=['POST'])
def analyze_image():
    try:
        data = request.json
        image_url = data.get("image_url")

        if not image_url:
            return jsonify({"error": "❌ يرجى إدخال رابط الصورة"}), 400

        # هنا يمكن إضافة كود معالجة الصور باستخدام OpenCV أو أي نموذج ذكاء اصطناعي
        result = f"✅ تم استلام الصورة بنجاح من الرابط: {image_url}"

        return jsonify({"message": result, "status": "success"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# تشغيل السيرفر
if __name__ == '__main__':
    print("🚀 تشغيل الخادم...")
    app.run(debug=True)