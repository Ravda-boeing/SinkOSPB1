from flask import Flask, request, render_template_string
import requests

API_KEY = "YOUR_API_KEY"  # Replace with your Gemini API key
GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent"

app = Flask(__name__)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Sink AI Interface</title>
</head>
<body style="background:#0f0f0f;color:#00ffcc;font-family:monospace;">
    <h1>🌀 Sink AI</h1>
    <form method="post">
        <input name="prompt" type="text" placeholder="Speak to the Sinkstream..." style="width:400px;" />
        <input type="submit" value="Invoke" />
    </form>
    {% if response %}
    <div style="margin-top:20px;">
        <h3>Response:</h3>
        <pre>{{ response }}</pre>
    </div>
    {% endif %}
</body>
</html>
"""

def query_sink_ai(prompt):
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
    }
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ]
    }
    res = requests.post(GEMINI_URL, headers=headers, json=payload)
    return res.json().get("candidates", [{}])[0].get("content", "No response.")

@app.route("/", methods=["GET", "POST"])
def index():
    response = None
    if request.method == "POST":
        user_input = request.form["prompt"]
        response = query_sink_ai(user_input)
    return render_template_string(HTML_TEMPLATE, response=response)

if __name__ == "__main__":
    app.run(debug=True) 