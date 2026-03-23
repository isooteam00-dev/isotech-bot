import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI()

# Permette al tuo sito (index.html) di parlare con questo script Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inizializza il client di Groq usando la chiave che abbiamo messo nel terminale
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Qui usiamo il modello Llama 3 di Groq (velocissimo e gratis)
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "Sei l'assistente ufficiale di IsoTech 🚀. Sei esperto di automazione e siti web. Sei simpatico, usi spesso le emoji e dai del 'tu' all'utente. Spiega che IsoTech trasforma le idee in realtà digitale e invita sempre a chiedere un preventivo gratuito!"},
                {"role": "user", "content": request.message}
            ],
        )
        return {"reply": completion.choices[0].message.content}
    except Exception as e:
        # Se c'è un errore, lo vedrai nella chat del sito
        return {"reply": f"Errore tecnico: {str(e)}"}