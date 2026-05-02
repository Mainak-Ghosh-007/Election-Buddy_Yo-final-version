async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';

    // Show a temporary "Thinking..." bubble
    const thinkingDiv = appendMessage('ai', 'BUDDy_Yo is thinking...');

    const response = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    thinkingDiv.querySelector('.bubble').innerText = data.reply;
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = `<div class="bubble">${text}</div>`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv;
}

// Eligibility Tool Logic
function openChecker() { document.getElementById('checker-modal').style.display = 'block'; }
function closeChecker() { document.getElementById('checker-modal').style.display = 'none'; }

function checkStep(step, value) {
    const form = document.getElementById('checker-form');
    const result = document.getElementById('checker-result');

    if (step === 1) {
        if (!value) {
            result.innerHTML = "❌ Only citizens are eligible to vote.";
            form.style.display = 'none';
        } else {
            form.innerHTML = `<p>Are you 18 years or older?</p>
                             <button onclick="checkStep(2, true)">Yes</button>
                             <button onclick="checkStep(2, false)">No</button>`;
        }
    } else if (step === 2) {
        if (!value) {
            result.innerHTML = "❌ You must be 18+ to vote.";
        } else {
            result.innerHTML = "✅ You are eligible! Ensure you have registered in the electoral roll.";
        }
        form.style.display = 'none';
    }
}