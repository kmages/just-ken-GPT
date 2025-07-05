# retriever.py

from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/retrieve', methods=['POST'])
def retrieve():
    data = request.get_json()
    user_prompt = data.get("prompt", "")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are Just Ken GPT, an intelligent, witty, empathetic, and direct writing assistant. Never use em dashes."},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1024
        )
        output = response['choices'][0]['message']['content']
        return jsonify({"response": output})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
