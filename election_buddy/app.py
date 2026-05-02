from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# --- CONFIGURATION ---
# Replace 'YOUR_GEMINI_API_KEY' with your actual key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Set up the current recommended model
model = genai.GenerativeModel('gemini-2.5-flash')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    # Make sure we actually received a message
    data = request.json
    if not data or "message" not in data:
        return jsonify({"reply": "Error: No message provided."}), 400

    user_message = data.get("message")
    
    # System prompt
    prompt = f"""
    You are 'Election BUDDy_Yo', a premium, friendly, and highly knowledgeable AI assistant.
    Your goal is to help citizens with voting information, registration processes, 
    important dates, and constitutional rights. 
    If the user asks something completely unrelated to elections or politics, 
    politely bring the conversation back to voting.
    
    User asks: {user_message}
    """
    
    try:
        response = model.generate_content(prompt)
        return jsonify({"reply": response.text})
    except Exception as e:
        # PRINT THE ERROR to your terminal so you can see what went wrong!
        print(f"API Error: {e}")
        return jsonify({"reply": "I'm having a connection glitch with my AI brain. Please try again in a moment!"}), 500

if __name__ == '__main__':
    app.run(debug=True)