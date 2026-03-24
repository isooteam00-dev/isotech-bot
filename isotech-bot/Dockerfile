# Usa Python
FROM python:3.9-slim

# Imposta la cartella di lavoro dentro il contenitore
WORKDIR /app

# Copia i file dalla cartella locale alla cartella /app del contenitore
COPY . /app

# Installa le librerie
RUN pip install --no-cache-dir -r requirements.txt

# Comando per avviare il server (nota il main:app senza .py)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]
