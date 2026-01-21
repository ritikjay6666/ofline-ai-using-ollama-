AI Suite - All-in-One AI Toolkit
AI Suite is a robust multi-tool web application that leverages local LLMs (via Ollama) to provide a variety of AI services, ranging from code generation to legal document analysis. Built with a FastAPI backend and a responsive HTML/CSS/JS frontend, this project demonstrates how to integrate local AI models into a functional web interface.

(Note: Upload your screenshot to the repo and ensure the filename matches)

🚀 Features
This application includes 8 distinct AI modules:

💬 Chat Bot: A friendly and witty AI companion for casual conversation.

🤖 AI Assistant: A professional virtual assistant focused on productivity and task planning.

💻 Code Assistant:

Generator: Writes code based on descriptions.

Debugger: Identifies errors and provides fixed versions.

⚖️ Legal Analyzer: Extracts key dates, parties involved, and obligations from legal texts.

📝 Text Summarizer: Condenses long passages into key points.

📰 News Extraction: Separates raw facts/entities from a concise summary for news articles.

🛒 E-Commerce: Recommends products based on user queries, price range, and rating constraints.

​​​​​​​🩺 Medical AI: Analyzes symptoms to list potential causes (Educational purpose only).

🛠️ Tech Stack
Backend: Python, FastAPI, Uvicorn.

AI Engine: Ollama (running the mistral model locally).

Frontend: HTML5, CSS3, Vanilla JavaScript.

HTTP Client: HTTPX (for async communication with Ollama).

📂 Project Structure
Ensure your repository is organized as follows for the code to run correctly:

/

├── requirements.txt      # Python dependencies
├── code
    ├── app.py                # Main FastAPI application
    ├── static/               # Static assets folder
│      ├── index.html        # Main frontend UI
│      ├── style1.css        # CSS styling
│      └── script.js         # Frontend logic
└── README.md             # Project documentation
⚙️ Prerequisites
Before running the project, ensure you have the following installed:

Python 3.8+

Ollama: Download from ollama.com.

Mistral Model: You must pull the specific model used in the configuration.

Bash

ollama pull mistral
📦 Installation & Setup
Clone the repository

Bash

git clone https://github.com/your-username/ai-suite.git
cd ai-suite
Install Python Dependencies Create a requirements.txt file (or install manually):

Bash

pip install fastapi uvicorn httpx
Start the Ollama Server Ensure Ollama is running in the background (usually runs automatically after installation).

Run the Application Start the FastAPI server using Uvicorn:

Bash

uvicorn app:app --reload
The app will run at http://0.0.0.0:8000.

Access the Interface Open your browser and navigate to: http://localhost:8000

⚠️ Disclaimer
The Medical AI feature is intended for educational and demonstration purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns.

🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

Developed with ❤️ using FastAPI and Ollama.
