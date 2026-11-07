// Conta e sincronização entre aparelhos (mesmo Supabase do English Journey).
// Sem internet ou sem login, o app segue funcionando com o progresso do aparelho.
const SB_URL = 'https://eahqeuirjrtktqulrhlr.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhaHFldWlyanJ0a3RxdWxyaGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNjczNzAsImV4cCI6MjEwODk0MzM3MH0.BozTmFj96pnYfiYE7KIVWbNMEw58HeN5GJ5dCVHrLf0';
const SB_TABLE = 'ingles_todo_dia';
const MERGED = 'itd-merged-user';

const sb = window.supabase ? window.supabase.createClient(SB_URL, SB_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: 'itd-auth' },
}) : null;

let userId = null, userEmail = '', syncStatus = 'local', syncTimer = null, pushing = false, pushAgain = false;

const STATUS_TEXT = {
  local: 'Salvo neste aparelho', login: 'Entrar para sincronizar', syncing: 'Sincronizando…', synced: 'Sincronizado',
  offline: 'Sem internet · salvo no aparelho', error: 'Erro ao sincronizar', setup: 'Sync ainda não ativado',
};
function setStatus(s) {
  syncStatus = s;
  const el = document.getElementById('sync');
  if (el) { el.dataset.s = s === 'synced' ? 'cloud' : s; el.textContent = STATUS_TEXT[s]; }
  const m = document.getElementById('acc-status');
  if (m) m.textContent = STATUS_TEXT[s];
}
const failStatus = err => (err && /PGRST205|42P01/.test(err.code || '')) ? 'setup' : navigator.onLine ? 'error' : 'offline';
const saveLocal = () => { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {} };

async function push() {
  if (!sb || !userId) return;
  if (pushing) { pushAgain = true; return; }
  pushing = true;
  setStatus('syncing');
  const { error } = await sb.from(SB_TABLE).upsert({ user_id: userId, data: state, updated_at: new Date(state.updatedAt || Date.now()).toISOString() });
  setStatus(error ? failStatus(error) : 'synced');
  pushing = false;
  if (pushAgain) { pushAgain = false; push(); }
}

/** O progresso mais recente vence. Na primeira vez deste aparelho na conta, junta os dois. */
async function pull() {
  if (!sb || !userId) return;
  setStatus('syncing');
  const { data, error } = await sb.from(SB_TABLE).select('data').eq('user_id', userId).maybeSingle();
  if (error) return setStatus(failStatus(error));
  const remote = data && data.data;
  let first = true;
  try { first = localStorage.getItem(MERGED) !== userId; } catch (e) {}
  if (remote && first) {
    state = {
      done: [...new Set([...(remote.done || []), ...state.done])],
      steps: { ...(remote.steps || {}), ...state.steps },
      short: !!state.short, updatedAt: Date.now(),
    };
    saveLocal(); renderAll(); await push();
  } else if (remote && (remote.updatedAt || 0) > (state.updatedAt || 0)) {
    state = { done: remote.done || [], steps: remote.steps || {}, short: !!remote.short, updatedAt: remote.updatedAt };
    saveLocal(); renderAll(); setStatus('synced');
  } else {
    await push();
  }
  try { localStorage.setItem(MERGED, userId); } catch (e) {}
}

window.onLocalChange = () => {
  if (!userId) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(push, 1500);
};

function setUser(session) {
  const id = session ? session.user.id : null;
  userEmail = session ? session.user.email || '' : '';
  if (id === userId) return;
  userId = id;
  if (userId) pull(); else setStatus(sb ? 'login' : 'local');
  renderAll();
}

if (sb) {
  sb.auth.getSession().then(({ data }) => setUser(data.session)).catch(() => {});
  sb.auth.onAuthStateChange((_e, session) => setUser(session));
  window.addEventListener('online', () => pull());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') pull();
    else if (userId) { clearTimeout(syncTimer); push(); }
  });
}

/* ---------- aviso no topo da tela Hoje enquanto não entrou ---------- */
window.accountBanner = () => (!sb || userId) ? '' : `<div class="sync-banner">
  <div><b>Seu progresso está só neste aparelho.</b><p class="muted small">Entre com a conta do English Journey para ver o mesmo progresso no celular e no computador.</p></div>
  <button class="btn primary" id="acc-open">Entrar e sincronizar</button></div>`;

function openAccount() {
  show('hoje');
  const acc = document.getElementById('account');
  if (!acc) return;
  acc.open = true;
  acc.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const email = document.getElementById('acc-email');
  if (email) setTimeout(() => email.focus({ preventScroll: true }), 400);
}

/* ---------- painel da conta (fica na tela Hoje) ---------- */
window.accountPanel = () => {
  if (!sb) return `<details class="how" id="account"><summary>Sincronizar celular e computador</summary><div class="inner">
    <p>A sincronização precisa de internet na primeira abertura. Conecte e recarregue a página.</p></div></details>`;
  if (userId) return `<details class="how" id="account"><summary>Conta: ${esc(userEmail)}</summary><div class="inner">
    <p>Seu progresso vai sozinho para o celular e o computador. <b id="acc-status">${STATUS_TEXT[syncStatus]}</b></p>
    ${syncStatus === 'setup' ? '<p>A tabela do app ainda não foi criada no Supabase. Rode o arquivo <code>supabase/schema.sql</code> no SQL Editor do projeto.</p>' : ''}
    <div class="actions"><button class="btn" id="acc-sync">Sincronizar agora</button><button class="btn ghost" id="acc-out">Sair da conta</button></div></div></details>`;
  return `<details class="how" id="account" open><summary>Sincronizar celular e computador</summary><div class="inner">
    <p>Entre com a <b>mesma conta do English Journey</b>. Faça isso no celular e no computador, e o progresso passa a ser o mesmo nos dois.</p>
    <form class="acc-form" id="acc-form">
      <input class="code" id="acc-email" type="email" autocomplete="email" placeholder="seu e-mail" required aria-label="E-mail">
      <input class="code" id="acc-pass" type="password" autocomplete="current-password" placeholder="senha" required minlength="6" aria-label="Senha">
      <div class="actions"><button class="btn primary" type="submit">Entrar</button><button class="btn" type="button" id="acc-new">Criar conta</button></div>
    </form>
    <p class="small" id="acc-msg" aria-live="polite"></p></div></details>`;
};

window.bindAccount = el => {
  const open = el.querySelector('#acc-open');
  if (open) open.onclick = openAccount;
  const sync = el.querySelector('#acc-sync');
  if (sync) sync.onclick = () => pull();
  const out = el.querySelector('#acc-out');
  if (out) out.onclick = async () => { await sb.auth.signOut(); };
  const form = el.querySelector('#acc-form');
  if (!form) return;
  const msg = el.querySelector('#acc-msg');
  const creds = () => ({ email: el.querySelector('#acc-email').value.trim(), password: el.querySelector('#acc-pass').value });
  form.onsubmit = async e => {
    e.preventDefault();
    msg.textContent = 'Entrando…';
    const { error } = await sb.auth.signInWithPassword(creds());
    if (error) msg.textContent = /invalid/i.test(error.message) ? 'E-mail ou senha incorretos.' : /confirm/i.test(error.message) ? 'Confirme o e-mail pelo link que chegou na sua caixa de entrada.' : 'Não deu para entrar: ' + error.message;
  };
  el.querySelector('#acc-new').onclick = async () => {
    const c = creds();
    if (!c.email || c.password.length < 6) { msg.textContent = 'Digite um e-mail e uma senha com pelo menos 6 caracteres.'; return; }
    msg.textContent = 'Criando conta…';
    const { data, error } = await sb.auth.signUp(c);
    if (error) msg.textContent = 'Não deu para criar a conta: ' + error.message;
    else if (!data.session) msg.textContent = 'Conta criada. Abra o link de confirmação no seu e-mail e depois entre aqui.';
  };
};

if (sb) setStatus('login');
renderAll();

document.getElementById('sync').onclick = openAccount;
