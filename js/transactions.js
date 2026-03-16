'use strict';

function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

function formatDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function renderTransactions(list) {
  const tbody = document.getElementById('transactionsBody');
  if (!tbody) return;

  if (!list || list.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="state-empty">Nessuna transazione trovata.</td></tr>';
    return;
  }

  tbody.innerHTML = list.map(tx => {
    const isCredit    = tx.type === 'credit';
    const amountClass = isCredit ? 'amount--credit' : 'amount--debit';
    const badgeClass  = isCredit ? 'badge--credit'  : 'badge--debit';
    const typeLabel   = isCredit ? 'Entrata' : 'Uscita';
    const amountSign  = isCredit ? '+' : '';

    return `
      <tr data-id="${tx.id}">
        <td style="color:var(--muted);font-size:13px">${formatDate(tx.date)}</td>
        <td>${tx.description}</td>
        <td><span class="badge">${tx.category}</span></td>
        <td><span class="badge ${badgeClass}">${typeLabel}</span></td>
        <td style="text-align:right" class="${amountClass}">
          ${amountSign}${formatCurrency(tx.amount)}
        </td>
      </tr>`;
  }).join('');

  attachRowEvents();
}
