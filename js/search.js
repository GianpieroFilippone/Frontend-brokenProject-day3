'use strict';

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    // Se c'è un timer attivo, cancellalo
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
  
}

function initSearch(onSearch) {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const debouncedSearch = debounce(async (value) => {
    await onSearch(value.trim());
  }, 300);

  input.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
  });
}
