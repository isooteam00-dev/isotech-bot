// Funzione per aprire e chiudere la chat
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

// Funzione per inviare il messaggio al server Python
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (message === "") return;

    // 1. Mostra il messaggio dell'utente nella chat
    appendMessage('user', message);
    input.value = "";

    try {
        // 2. Chiama il tuo server locale (il main.py su porta 8000)
        const response = await fetch('https://isotech-bot.onrender.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });

        const data = await response.json();

        // 3. Mostra la risposta del bot (da Groq)
        appendMessage('bot', data.reply);
    } catch (error) {
        console.error("Errore:", error);
        appendMessage('bot', "Ops! Qualcosa è andato storto nel collegamento.");
    }
}

// Funzione per aggiungere i fumetti alla chat
function appendMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);

    // Scroll automatico verso il basso
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Permette di inviare il messaggio premendo il tasto "Invio"
document.getElementById('chat-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
// Carica i messaggi salvati appena la pagina si apre
document.addEventListener('DOMContentLoaded', () => {
    const savedMessages = localStorage.getItem('chat_history');
    if (savedMessages) {
        document.getElementById('chat-messages').innerHTML = savedMessages;
        // Porta lo scroll in fondo
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.style.display = (chatWindow.style.display === 'none' || chatWindow.style.display === '') ? 'flex' : 'none';
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message === "") return;

    appendMessage('user', message);
    input.value = "";

    try {
        const response = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message }),
        });
        const data = await response.json();
        appendMessage('bot', data.reply);
    } catch (error) {
        appendMessage('bot', "Ops! Errore di connessione.");
    }
}

function appendMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    // SALVA LA CONVERSAZIONE NELLA CASSAFORTE DEL BROWSER
    localStorage.setItem('chat_history', chatMessages.innerHTML);
}

// Invia con tasto Invio
document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
