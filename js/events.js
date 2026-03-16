'use strict';

let transactionsMap = {};
let currentDetailId = null;

function setTransactions(list) {
  transactionsMap = {};
  if (!list) return;
  list.forEach(tx => {
    transactionsMap[String(tx.id)] = tx;
  });
}

function showTransactionDetail(txId) {
  const panel = document.getElementById('detailPanel');
  const tx    = transactionsMap[String(txId)];
  if (!tx || !panel) return;

  if (currentDetailId === String(txId) && panel.classList.contains('panel--visible')) {
    panel.classList.remove('panel--visible');
    currentDetailId = null;
  } else {
    currentDetailId = String(txId);
    document.getElementById('detailDescription').textContent = tx.description;
    document.getElementById('detailDate').textContent        = formatDate(tx.date);
    document.getElementById('detailCategory').textContent    = tx.category;
    document.getElementById('detailAmount').textContent      = formatCurrency(tx.amount);
    panel.classList.add('panel--visible');
  }
}

function handleRowClick(event) {
  const row = event.target.closest('tr');
  if (!row || !row.dataset.id) return;

  document.querySelectorAll('#transactionsBody tr').forEach(r =>
    r.classList.remove('row--selected'),
  );
  row.classList.add('row--selected');

  showTransactionDetail(row.dataset.id);
}

function initTableEvents() {
  const tbody = document.getElementById('transactionsBody');
  if (!tbody) return;

  tbody.addEventListener('click', handleRowClick);

}

// rimosso la chiamata a attachRowEvents() in renderTransactions, ora gestiamo tutto con event delegation
