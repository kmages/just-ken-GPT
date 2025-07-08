# retriever.py

from flask import Flask, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)

@app.route("/retrieve", methods=["POST"])
def retrieve():
    try:
        print("✅ Received a request.")
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            print("❌ Missing or invalid Authorization header.")
            return jsonify({"error": "No API key provided."}), 400

        api_key = auth_header.split("Bearer ")[-1].strip()
        if not api_key:
            print("❌ API key is empty.")
            return jsonify({"error": "API key is empty."}), 400

        data = request.get_json()
        prompt = data.get("prompt", "")
        print(f"📝 Prompt received: {prompt}")

        if not prompt:
            print("❌ Prompt is missing.")
            return jsonify({"error": "Prompt is missing."}), 400

        print("📡 Calling OpenAI API...")
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )

        reply = response.choices[0].message.content
        print("✅ OpenAI returned response.")
        return jsonify({"response": reply})

    except Exception as e:
        print(f"💥 Exception occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask app...")
    app.run(host="0.0.0.0", port=8080)
