'use strict';

function formatCurrencyDash(amount) {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

function formatDateDash(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

async function initDashboard() {
  const user = await fetchUser();
  const transactions = await fetchTransactions();

  if (!user || !transactions) return;

  // Topbar
  document.getElementById('topbarUser').textContent = user.name;

  // Balance card
  document.getElementById('statBalance').textContent = formatCurrencyDash(user.balance);
  document.getElementById('statIban').textContent = user.iban;

  // Credits / debits summary
  const credits = transactions.filter(tx => tx.type === 'credit');
  const debits  = transactions.filter(tx => tx.type === 'debit');

  const totalCredits = credits.reduce((sum, tx) => sum + tx.amount, 0);
  const totalDebits  = debits.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  document.getElementById('statCredits').textContent      = formatCurrencyDash(totalCredits);
  document.getElementById('statCreditsCount').textContent = `${credits.length} transazion${credits.length === 1 ? 'e' : 'i'}`;
  document.getElementById('statDebits').textContent       = formatCurrencyDash(totalDebits);
  document.getElementById('statDebitsCount').textContent  = `${debits.length} transazion${debits.length === 1 ? 'e' : 'i'}`;

  // Recent transactions (last 5)
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const tbody = document.getElementById('recentBody');
  tbody.innerHTML = recent.map(tx => {
    const isCredit    = tx.type === 'credit';
    const amountClass = isCredit ? 'amount--credit' : 'amount--debit';
    const amountSign  = isCredit ? '+' : '';
    return `
      <tr>
        <td style="color:var(--muted);font-size:13px">${formatDateDash(tx.date)}</td>
        <td>${tx.description}</td>
        <td><span class="badge">${tx.category}</span></td>
        <td style="text-align:right" class="${amountClass}">
          ${amountSign}${formatCurrencyDash(tx.amount)}
        </td>
      </tr>`;
  }).join('');
}
