'use strict';

const API_BASE = 'http://localhost:3001';

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

  const response = await fetch(url);

  if (response.status === 200) {
    return response.json();
  }
}

async function fetchUser() {
  const response = await fetch(`${API_BASE}/users/1`);

  if (response.status === 200) {
    return response.json();
  }
}
