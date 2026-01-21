import os
import json
import httpx
from fastapi import FastAPI, HTTPException, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configuration
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral" 

@app.get("/")
async def serve_homepage():
    return FileResponse(os.path.join("static", "index.html"))

# --- Helper Function for Ollama ---
async def query_ollama(prompt: str):
    async with httpx.AsyncClient() as client:
        try:
            # increased timeout for longer chat responses
            response = await client.post(
                OLLAMA_URL,
                json={"model": MODEL_NAME, "prompt": prompt, "stream": False},
                timeout=60.0
            )
            response.raise_for_status()
            data = response.json()
            return data.get("response", "No response from model.")
        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail=str(e))

# --- Existing Feature Endpoints ---

@app.post("/api/code-assist")
async def code_assist(mode: str = Form(...), query: str = Form(...)):
    if mode == "generator":
        prompt = f"Write code for the following task. Provide only the code and brief comments:\n{query}"
    else: # debugger
        prompt = f"Debug the following code. Explain the error and provide the fixed version:\n{query}"
    result = await query_ollama(prompt)
    return {"result": result}

@app.post("/api/legal-analyze")
async def legal_analyze(text: str = Form(...)):
    prompt = f"Act as a legal assistant. Analyze the following legal text. Extract key dates, parties involved, and obligations:\n{text}"
    result = await query_ollama(prompt)
    return {"result": result}

@app.post("/api/text-summarize")
async def text_summarize(text: str = Form(...)):
    prompt = f"Summarize the following text, focusing only on the key points:\n{text}"
    result = await query_ollama(prompt)
    return {"result": result}

@app.post("/api/news-summarize")
async def news_summarize(text: str = Form(...)):
    prompt = (f"Act as a news aggregator. Read the following news text.\n"
              f"Step 1: Extract the raw facts/entities.\n"
              f"Step 2: Provide a concise summary.\n"
              f"Format output as:\n"
              f"---FACTS---\n[Facts here]\n"
              f"---SUMMARY---\n[Summary here]\n\n"
              f"News Text: {text}")
    result = await query_ollama(prompt)
    parts = result.split("---SUMMARY---")
    facts = parts[0].replace("---FACTS---", "").strip()
    summary = parts[1].strip() if len(parts) > 1 else "Could not separate summary."
    return {"facts": facts, "summary": summary}

@app.post("/api/ecommerce")
async def ecommerce_recommend(query: str = Form(...), price_min: str = Form(...), price_max: str = Form(...), rating: str = Form(...)):
    prompt = (f"Act as a shopping assistant. Recommend 3 products for '{query}'. "
              f"Constraint: Price between ${price_min} and ${price_max}. "
              f"Constraint: Minimum rating {rating} stars. "
              f"List them with Name, Price, and Why to buy.")
    result = await query_ollama(prompt)
    return {"result": result}

@app.post("/api/medical")
async def medical_symptom(symptoms: str = Form(...)):
    prompt = (f"Act as a medical knowledge assistant. The user has these symptoms: {symptoms}. "
              f"List potential viral or medical causes based on standard medical literature. "
              f"start the response with a bold disclaimer that this is not a doctor.")
    result = await query_ollama(prompt)
    return {"result": result}

# --- NEW ENDPOINTS (ChatBot & Assistant) ---

@app.post("/api/chatbot")
async def chatbot(message: str = Form(...)):
    # Conversational persona
    prompt = f"You are a friendly and witty AI companion. Reply to this message: {message}"
    result = await query_ollama(prompt)
    return {"result": result}

@app.post("/api/ai-assistant")
async def ai_assistant(message: str = Form(...)):
    # Professional productivity persona
    prompt = f"You are a professional AI Virtual Assistant. Help the user efficiently with this task or question: {message}"
    result = await query_ollama(prompt)
    return {"result": result}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
