# Usa una versione leggera di Python
FROM python:3.9-slim

# Imposta la cartella di lavoro nel contenitore
WORKDIR /app

# Copia il file dei requisiti e installa le dipendenze
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia tutto il resto del codice (compreso main.py)
COPY . .

# Espone la porta che userà Render
EXPOSE 10000

# Comando per avviare l'app usando uvicorn
CMD ["uvicorn", "main.py:app", "--host", "0.0.0.0", "--port", "10000"]