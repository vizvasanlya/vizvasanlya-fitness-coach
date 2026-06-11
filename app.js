const cards = [{"label": "Workouts", "value": "18", "delta": "+4"}, {"label": "Streak", "value": "12 days", "delta": "+3"}, {"label": "Recovery", "value": "86%", "delta": "+5%"}, {"label": "PRs", "value": "7", "delta": "+2"}];
const rows = [{"title": "Strength block", "status": "In progress", "detail": "Progressive overload plan for lower-body sessions."}, {"title": "Cardio plan", "status": "Ready", "detail": "Zone 2 and interval sessions scheduled for the week."}, {"title": "Mobility routine", "status": "Daily", "detail": "Ten-minute routine assigned after workouts."}, {"title": "Recovery check", "status": "Good", "detail": "Sleep and readiness scores are above baseline."}];
const insights = ["Consistency improved with shorter weekday workouts.", "Recovery score suggests keeping Friday intensity moderate.", "Bench press volume is ready for a small increase."];
const storageKey = 'vizvasanlya-fitness-coach-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
