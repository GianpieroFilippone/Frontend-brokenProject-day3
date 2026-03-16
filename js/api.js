'use strict';

const API_BASE = 'http://localhost:3001';
let controller = null; // Variabile globale per tenere traccia del controller di fetch attivo
async function fetchTransactions(query = '') {

  // Se esiste una richiesta precedente, annullala
  if (controller) {
    controller.abort();
  }

  // Crea un nuovo controller per questa richiesta
   controller = new AbortController();

  const url = query
    ? `${API_BASE}/transactions?q=${encodeURIComponent(query)}`
    : `${API_BASE}/transactions`;

  // Ho inserito il try/catch direttamente qui per gestire eventuali errori di rete o di fetch, e per loggare se la richiesta è stata abortita
  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();

  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Richiesta abortita:", url);
      return;
    }
    console.error("Errore fetchTransactions:", err);
    throw err;
  }
}


async function fetchUser() {
  const response = await fetch(`${API_BASE}/users/1`);

  if (response.status === 200) {
    return response.json();
  }
}
