# Usa Python 3.11 (versione leggera)
FROM python:3.11-slim

# Crea la cartella del progetto dentro il "container"
WORKDIR /app

# Copia la lista delle librerie (requirements.txt)
COPY requirements.txt .

# Installa le librerie necessarie (fastapi, groq, uvicorn, etc.)
RUN pip install --no-cache-dir -r requirements.txt

# COPIA TUTTO IL CONTENUTO DELLA TUA CARTELLA (main.py, bot.js, bot.css, etc.)
COPY . .

# Apre la porta 8000 per far passare il traffico del bot
EXPOSE 8000

# Avvia il server Python
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]