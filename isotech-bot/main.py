import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incolla qui la tua chiave sk-... tra le virgolette
client = OpenAI(api_key="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")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Sei l'assistente ufficiale di IsoTech. Rispondi in modo professionale e breve."},
                {"role": "user", "content": request.message}
            ]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"response": f"Errore tecnico: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)