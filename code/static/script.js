// Navigation Logic
function showSection(id) {
    document.querySelectorAll('.tool-section').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });
    const activeSec = document.getElementById(id);
    activeSec.style.display = 'block';
    activeSec.classList.add('active');
}

// Generic API Caller
async function callApi(endpoint, formData) {
    try {
        const response = await fetch(endpoint, { method: 'POST', body: formData });
        if (!response.ok) throw new Error("API Request Failed");
        return await response.json();
    } catch (error) {
        alert("Error: " + error.message);
        return null;
    }
}

// --- Chat UI Helper ---
function appendMessage(windowId, text, isUser) {
    const windowDiv = document.getElementById(windowId);
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(isUser ? 'user-msg' : 'ai-msg');
    msgDiv.innerText = text;
    windowDiv.appendChild(msgDiv);
    windowDiv.scrollTop = windowDiv.scrollHeight; // Auto scroll to bottom
}

// Handle Enter key for chats
function handleEnter(event, type) {
    if (event.key === "Enter") {
        if (type === 'chatbot') handleChatBot();
        if (type === 'assistant') handleAIAssistant();
    }
}

// --- NEW: Chat Bot Logic ---
async function handleChatBot() {
    const input = document.getElementById('chatbot_input');
    const text = input.value;
    if (!text) return;

    // UI Updates
    appendMessage('chatbot_window', text, true);
    input.value = ''; // Clear input

    // API Call
    const formData = new FormData();
    formData.append('message', text);
    const data = await callApi('/api/chatbot', formData);
    
    if (data) appendMessage('chatbot_window', data.result, false);
}

// --- NEW: AI Assistant Logic ---
async function handleAIAssistant() {
    const input = document.getElementById('assistant_input');
    const text = input.value;
    if (!text) return;

    appendMessage('assistant_window', text, true);
    input.value = ''; 

    const formData = new FormData();
    formData.append('message', text);
    const data = await callApi('/api/ai-assistant', formData);
    
    if (data) appendMessage('assistant_window', data.result, false);
}

// --- Existing Functions (Code, Legal, etc.) ---

async function handleCode() {
    const mode = document.getElementById('code_mode').value;
    const query = document.getElementById('code_input').value;
    const output = document.getElementById('code_output');
    
    output.innerText = "Processing code...";
    const formData = new FormData();
    formData.append('mode', mode);
    formData.append('query', query);

    const data = await callApi('/api/code-assist', formData);
    if(data) output.innerText = data.result;
}

async function handleLegal() {
    const text = document.getElementById('legal_input').value;
    const output = document.getElementById('legal_output');
    
    output.innerText = "Analyzing document...";
    const formData = new FormData();
    formData.append('text', text);

    const data = await callApi('/api/legal-analyze', formData);
    if(data) output.innerText = data.result;
}

async function handleSummarize() {
    const text = document.getElementById('sum_input').value;
    const output = document.getElementById('sum_output');
    
    output.innerText = "Summarizing...";
    const formData = new FormData();
    formData.append('text', text);

    const data = await callApi('/api/text-summarize', formData);
    if(data) output.innerText = data.result;
}

async function handleNews() {
    const text = document.getElementById('news_input').value;
    document.getElementById('news_facts').innerText = "Extracting...";
    document.getElementById('news_summary').innerText = "Summarizing...";

    const formData = new FormData();
    formData.append('text', text);

    const data = await callApi('/api/news-summarize', formData);
    if(data) {
        document.getElementById('news_facts').innerText = data.facts;
        document.getElementById('news_summary').innerText = data.summary;
    }
}

async function handleEcommerce() {
    const query = document.getElementById('ecom_query').value;
    const min = document.getElementById('ecom_min').value;
    const max = document.getElementById('ecom_max').value;
    const rating = document.getElementById('ecom_rating').value;
    const output = document.getElementById('ecom_output');

    output.innerText = "Finding recommendations...";
    const formData = new FormData();
    formData.append('query', query);
    formData.append('price_min', min);
    formData.append('price_max', max);
    formData.append('rating', rating);

    const data = await callApi('/api/ecommerce', formData);
    if(data) output.innerText = data.result;
}

async function handleMedical() {
    const text = document.getElementById('med_input').value;
    const output = document.getElementById('med_output');

    output.innerText = "Consulting AI knowledge base...";
    const formData = new FormData();
    formData.append('symptoms', text);

    const data = await callApi('/api/medical', formData);
    if(data) output.innerText = data.result;
}