import os
import google.generativeai as genai
from flask import Flask, request, jsonify

# Set your Gemini API key
genai.configure(api_key="AIzaSyCS4_33cwDZv0BmoxNNPtk1-RGKCdGXcu8")

# Choose a model
model = genai.GenerativeModel("gemini-pro")

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    response = model.generate_content(user_input)
    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(debug=True)