/* ---------- estrutura da jornada ---------- */
const TOTAL = 360;
const APP_URL = 'https://english-journey.expo.app';
const PHASES = [
  { n: 1, name: 'Base', goal: 'Falar da sua vida', months: [1, 3], lvl: 'A1 → A2',
    about: 'Um texto curto por dia com o inglês mais usado. Você ouve, repete e reconta em voz alta.',
    test: 'Falar 3 minutos sobre você, contar uma história do passado e falar dos seus planos, sem ler.' },
  { n: 2, name: 'Comunicação', goal: 'Conversar sobre o dia a dia', months: [4, 6], lvl: 'A2 → B1',
    about: 'Agora o conteúdo é real: podcasts para quem aprende, séries com legenda em inglês, notícias e a primeira conversa por semana.',
    test: 'Manter uma conversa de 10 minutos e acompanhar a história de um episódio com legenda em inglês.' },
  { n: 3, name: 'Imersão', goal: 'O inglês do seu mundo', months: [7, 9], lvl: 'B1',
    about: 'Podcasts de nativos, YouTube sobre o que você gosta, leitura da sua área e duas conversas por semana.',
    test: 'Apresentar o seu trabalho por 5 minutos e entender boa parte de um podcast feito para nativos.' },
  { n: 4, name: 'Fluência', goal: 'Inglês profissional e espontâneo', months: [10, 12], lvl: 'B1 → B2',
    about: 'Entrevistas, reuniões, e-mails, negociação e séries sem legenda. Você treina as situações reais do trabalho.',
    test: 'Uma entrevista simulada de 20 minutos em inglês e um episódio de série sem legenda entendendo a história.' },
];
const P1_WEEKS = {
  1: ['Eu e meu dia', 'Resolvendo a vida', 'Contando o que aconteceu', 'Planos, opiniões e trabalho'],
  2: ['Casa, compras e comida', 'Pessoas e relações', 'Hábitos e vida agora', 'Viagem do começo ao fim'],
  3: ['Trabalho de verdade', 'Histórias da sua vida', 'Futuro e decisões', 'Conversa de verdade'],
};
const THEMES = [
  ['Trabalho e carreira', 'present perfect x passado simples', 'present perfect vs past simple'],
  ['Saúde e bem-estar', 'should, have to e must', 'should have to must'],
  ['Dinheiro e compras', 'comparativos e superlativos', 'comparatives and superlatives'],
  ['Tecnologia no dia a dia', 'will x going to', 'will vs going to'],
  ['Viagens e cultura', 'phrasal verbs de viagem', 'travel phrasal verbs'],
  ['Comida e restaurantes', 'some, any, much e many', 'some any much many'],
  ['Relacionamentos', 'passado contínuo', 'past continuous'],
  ['Cidade e moradia', 'primeira condicional', 'first conditional'],
  ['Esportes e hobbies', 'gerúndio x infinitivo', 'gerund vs infinitive'],
  ['Estudos e aprendizado', 'present perfect continuous', 'present perfect continuous'],
  ['Filmes, séries e música', 'who, which e that', 'relative clauses who which that'],
  ['Revisão da fase 2', 'revisão', 'English grammar review intermediate'],
  ['Sua área profissional', 'voz passiva', 'passive voice'],
  ['Reuniões', 'pedidos educados: would you mind, could you', 'polite requests would you mind'],
  ['Histórias longas', 'past perfect', 'past perfect'],
  ['Opiniões e debates', 'conectores: however, although, because of', 'linking words however although'],
  ['Notícias e atualidades', 'reported speech', 'reported speech'],
  ['Problemas e soluções', 'segunda condicional', 'second conditional'],
  ['Cultura dos EUA e do Reino Unido', 'would e used to para o passado', 'would and used to past habits'],
  ['Projetos e prazos', 'future continuous e future perfect', 'future continuous future perfect'],
  ['Atendimento ao cliente', 'question tags', 'question tags'],
  ['Tecnologia e IA', 'passiva com modais: can be done', 'passive with modal verbs'],
  ['Sentimentos e saúde mental', 'wish e if only', 'wish and if only'],
  ['Revisão da fase 3', 'revisão', 'English grammar review upper intermediate'],
  ['Entrevista de emprego', 'falar de conquistas e experiência', 'job interview answers English'],
  ['E-mails profissionais', 'formal x informal', 'formal and informal English emails'],
  ['Apresentações', 'signposting: first, moving on, to sum up', 'presentation signposting language'],
  ['Negociação', 'condicionais na negociação', 'negotiation English phrases'],
  ['Small talk avançado', 'expressões idiomáticas comuns', 'common English idioms'],
  ['Discordar com educação', 'linguagem suavizada: I\'m afraid, I\'m not sure', 'polite disagreement English'],
  ['Explicar processos', 'sequência e voz passiva', 'describing a process English'],
  ['Dar e receber feedback', 'I\'d suggest, it might be better', 'giving feedback English phrases'],
  ['Humor e cultura pop', 'phrasal verbs avançados', 'advanced phrasal verbs'],
  ['Sua trajetória', 'misturar todos os tempos verbais', 'mixed tenses English'],
  ['Simulado final', 'revisão', 'advanced English grammar review'],
  ['A última semana', 'revisão', 'speak English fluently tips'],
];

const RES = {
  ej:      { n: 'English Journey', u: APP_URL, g: 'app', at: 1, p: 'O seu app. Use como teste rápido de revisão num intervalo do dia.' },
  voa:     { n: 'VOA Learning English', u: 'https://learningenglish.voanews.com', g: 'ouvir', at: 1, p: 'Notícias e aulas faladas devagar, com o texto na tela.' },
  cambridge: { n: 'Cambridge Dictionary', u: 'https://dictionary.cambridge.org/pt/dicionario/ingles-portugues/', g: 'vocab', at: 1, p: 'Dicionário inglês–português com áudio americano e britânico.' },
  languagetool: { n: 'LanguageTool', u: 'https://languagetool.org', g: 'falar', at: 2, p: 'Corrige o que você escreve e explica o erro.' },
  youglish: { n: 'YouGlish', u: 'https://youglish.com', g: 'vocab', at: 8, p: 'Digite uma palavra e ouça nativos falando ela em vídeos reais.' },
  rachel:  { n: 'Rachel\'s English', u: 'https://www.youtube.com/results?search_query=Rachel%27s+English', g: 'vocab', at: 15, p: 'Pronúncia americana explicada som por som.' },
  bbc:     { n: 'BBC 6 Minute English', u: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english', g: 'ouvir', at: 31, p: 'Conversas de 6 minutos com transcrição.' },
  reactor: { n: 'Language Reactor', u: 'https://www.languagereactor.com', g: 'falar', at: 52, p: 'Extensão do Chrome: legenda em inglês e português juntas no YouTube e na Netflix.' },
  easy:    { n: 'Easy English', u: 'https://www.youtube.com/results?search_query=Easy+English+street+interviews', g: 'ouvir', at: 61, p: 'Entrevistas na rua com gente de verdade, com legenda.' },
  council: { n: 'British Council LearnEnglish', u: 'https://learnenglish.britishcouncil.org', g: 'gram', at: 68, p: 'Gramática explicada com exercícios, por nível.' },
  peg:     { n: 'Perfect English Grammar', u: 'https://www.perfect-english-grammar.com', g: 'gram', at: 75, p: 'Explicações diretas e exercícios de cada tempo verbal.' },
  news:    { n: 'News in Levels', u: 'https://www.newsinlevels.com', g: 'gram', at: 84, p: 'A mesma notícia em 3 níveis, com áudio.' },
  tandem:  { n: 'Tandem', u: 'https://www.tandem.net', g: 'falar', at: 88, p: 'Troca de idiomas: você ajuda com português e recebe ajuda com inglês. A versão grátis basta.' },
  anki:    { n: 'Anki', u: 'https://apps.ankiweb.net', g: 'vocab', at: 91, p: 'Cartões de revisão. Grátis no computador e no Android. No iPhone, use o AnkiWeb pelo navegador.' },
  luke:    { n: 'Luke\'s English Podcast', u: 'https://teacherluke.co.uk', g: 'ouvir', at: 181, p: 'Podcast longo e divertido de um professor britânico.' },
  allears: { n: 'All Ears English', u: 'https://www.allearsenglish.com', g: 'ouvir', at: 181, p: 'Podcast americano sobre inglês natural e conversação.' },
  ted:     { n: 'TED Talks', u: 'https://www.ted.com/talks', g: 'ouvir', at: 271, p: 'Palestras curtas sobre todos os assuntos, com legenda e transcrição.' },
};
const RES_GROUPS = [['app', 'Seu app'], ['ouvir', 'Ouvir'], ['vocab', 'Pronúncia e vocabulário'], ['gram', 'Gramática e leitura'], ['falar', 'Falar e escrever']];
const unlocksOn = d => Object.keys(RES).filter(k => RES[k].at === d);
const yt = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);

function info(d) {
  const month = Math.ceil(d / 30);
  const dom = (d - 1) % 30 + 1;
  const phase = PHASES.find(p => month >= p.months[0] && month <= p.months[1]);
  const tail = dom > 28;
  const wk = tail ? 5 : Math.ceil(dom / 7);
  const dw = tail ? dom - 28 : (dom - 1) % 7 + 1;
  const gw = (month - 1) * 4 + Math.min(wk, 4);
  let weekName, theme = null;
  if (tail) weekName = 'Fechamento do mês ' + month;
  else if (phase.n === 1) weekName = P1_WEEKS[month][wk - 1];
  else { theme = THEMES[gw - 13]; weekName = theme[0]; }
  return { d, month, dom, phase, tail, wk, dw, gw, weekName, theme, text: DAYS.find(x => x.d === d) || null,
           monthEnd: dom === 30, phaseEnd: dom === 30 && month === phase.months[1] };
}
function weekLabel(i) { return i.tail ? 'Dias ' + (i.d - i.dw + 1) + '–' + (i.d - i.dw + 2) : 'Semana ' + i.gw; }

/* ---------- a sessão de cada dia ---------- */
const L = (k, label) => ({ label: label || RES[k].n, url: RES[k].u });
function session(d, short) {
  const i = info(d);
  if (i.phase.n === 1) {
    const t = i.text;
    const listen = i.month === 1 ? { k: 'voa', desc: 'Ouça um episódio do VOA Learning English com o texto na tela. Não precisa entender tudo.' }
                 : i.month === 2 ? { k: 'bbc', desc: 'Ouça um episódio do 6 Minute English. Primeiro sem ler, depois com a transcrição.' }
                 : { k: 'easy', desc: 'Assista um vídeo do Easy English com legenda em inglês. Pause e repita as frases que você entender.' };
    const speak = t.review || i.dw === 7 || i.tail || d % 2 === 1;
    const steps = [
      { id: 'texto', min: short ? 15 : 20, kind: 'Texto do dia', title: t.title, sub: t.pt, text: true,
        flow: short ? ['Ouça 1× sem ler', 'Shadowing devagar 2×', 'Reconte gravando'] : ['Ouça 2× sem ler', 'Leia com a tradução', 'Ouça lendo junto', 'Shadowing devagar 3×', 'Reconte gravando'] },
      { id: 'pausa', min: 10, kind: 'Pausa', title: 'Teste rápido no English Journey', desc: 'Faça a revisão do dia num intervalo: almoço, fila, ônibus.', links: [L('ej', 'Abrir o English Journey')] },
    ];
    if (!short) {
      steps.push({ id: 'escuta', min: 15, kind: 'Escuta', title: RES[listen.k].n, desc: listen.desc, links: [L(listen.k)] });
      steps.push(speak
        ? { id: 'saida', min: 15, kind: 'Falar', title: 'Agora você, em voz alta', desc: 'Grave no celular respondendo:', tasks: t.tasks, links: [L('youglish', 'Ouvir uma palavra no YouGlish')].filter(() => d >= 8) }
        : { id: 'saida', min: 15, kind: 'Escrever', title: 'Escreva 5 a 8 frases', desc: 'Responda por escrito e corrija no LanguageTool. Depois leia em voz alta.', tasks: t.tasks, links: [L('languagetool', 'Corrigir no LanguageTool')] });
    }
    return steps;
  }
  // fases 2 a 4
  const [t, g, q] = i.theme || ['', '', ''];
  const series = { 2: 'Friends ou Modern Family', 3: 'The Office ou Ted Lasso', 4: 'Suits ou Silicon Valley' }[i.phase.n];
  const isRev = g === 'revisão';
  let m;
  if (i.tail) {
    m = i.dw === 1
      ? { kind: 'Revisão do mês', title: 'Revise as 4 semanas', desc: 'Releia suas anotações do mês, refaça o shadowing do áudio mais difícil e revise as expressões no Anki.', links: [L('anki')] }
      : i.phaseEnd
        ? { kind: 'Teste da fase ' + i.phase.n, title: 'Chegou ao fim da fase ' + i.phase.n, desc: i.phase.test + ' Grave tudo e compare com o teste da fase anterior.', links: [L('tandem', 'Marcar a conversa no Tandem')] }
        : { kind: 'Teste do mês', title: 'Grave ' + (i.phase.n + 2) + ' minutos sem ler', desc: 'Fale dos 4 temas do mês, um depois do outro. Compare com o teste do mês passado.', links: [] };
  } else {
    const T = {
      2: [
        { kind: 'Podcast', title: 'Um episódio do 6 Minute English', desc: 'Ouça sem ler, depois com a transcrição. Escolha 1 minuto e faça shadowing.', links: [L('bbc')] },
        { kind: 'Gramática', title: isRev ? 'Revise o que mais te travou' : 'Gramática da semana: ' + g, desc: 'Assista uma explicação e escreva 8 frases sobre "' + t + '" usando a estrutura.', links: [{ label: 'Vídeos sobre o tema', url: yt(q) }, L('peg')] },
        { kind: 'Série', title: 'Um episódio de ' + series, desc: 'Legenda em inglês. Pause, anote 5 expressões e repita cada uma 3 vezes.', links: [L('reactor')] },
        { kind: 'Notícia', title: 'Notícia em níveis', desc: 'Leia e ouça uma notícia no nível 2. Reconte em voz alta em 1 minuto.', links: [L('news')] },
        { kind: 'Conversa', title: 'Conversa sobre ' + t.toLowerCase(), desc: '15 minutos com alguém (Tandem, amigo, colega). Sem parceiro? Fale sozinho 5 minutos gravando.', links: [L('tandem')] },
        { kind: 'Escrita', title: 'Diário: ' + t.toLowerCase(), desc: 'Escreva 8 a 10 frases sobre o tema. Corrija e leia a versão corrigida em voz alta.', links: [L('languagetool')] },
        { kind: 'Domingo', title: 'Grave 3 minutos sobre ' + t.toLowerCase(), desc: 'Ouça a gravação do domingo passado e compare. Revise as expressões da semana.', links: [L('anki')] },
      ],
      3: [
        { kind: 'Podcast nativo', title: '20 minutos de podcast', desc: 'Luke\'s English Podcast ou All Ears English. Anote 5 expressões e faça shadowing de 1 minuto.', links: [L('luke'), L('allears')] },
        { kind: 'Gramática', title: isRev ? 'Revise o que mais te travou' : 'Gramática da semana: ' + g, desc: 'Estude a estrutura e escreva 10 frases sobre "' + t + '".', links: [{ label: 'Vídeos sobre o tema', url: yt(q) }, L('council')] },
        { kind: 'YouTube', title: '20 minutos do seu mundo em inglês', desc: 'Um canal em inglês sobre o que você gosta: tecnologia, SAP, futebol, games. Legenda em inglês.', links: [{ label: 'Buscar vídeos sobre ' + t.toLowerCase(), url: yt(t + ' in English') }] },
        { kind: 'Leitura', title: 'Ler sobre ' + t.toLowerCase(), desc: 'Uma notícia no nível 3 ou um artigo da sua área. Resuma em 5 frases em voz alta.', links: [L('news')] },
        { kind: 'Conversa 1', title: '20 minutos de conversa', desc: 'Tema: ' + t.toLowerCase() + '. Prepare 3 perguntas antes de começar.', links: [L('tandem')] },
        { kind: 'Apresentação', title: 'Apresente 2 minutos sobre ' + t.toLowerCase(), desc: 'Como se fosse no trabalho: começo, 3 pontos e conclusão. Grave e ouça.', links: [L('youglish', 'Conferir pronúncia no YouGlish')] },
        { kind: 'Conversa 2', title: 'Segunda conversa da semana', desc: '20 minutos. Depois, revise as expressões que você anotou na semana.', links: [L('tandem'), L('anki')] },
      ],
      4: [
        { kind: 'TED Talk', title: 'Uma palestra sobre ' + t.toLowerCase(), desc: 'Assista com legenda em inglês e resuma em voz alta em 2 minutos.', links: [L('ted')] },
        { kind: 'Foco', title: isRev ? 'Revise o que mais te travou' : 'Foco da semana: ' + g, desc: 'Estude e use em 10 frases da sua vida profissional.', links: [{ label: 'Vídeos sobre o tema', url: yt(q) }] },
        { kind: 'Série', title: 'Um episódio de ' + series + ' sem legenda', desc: 'Só ative a legenda em inglês se perder a história.', links: [] },
        { kind: 'Escrita', title: 'Um e-mail ou relatório curto', desc: 'Sobre ' + t.toLowerCase() + '. Corrija e leia em voz alta.', links: [L('languagetool')] },
        { kind: 'Conversa', title: '30 minutos de conversa', desc: 'Tema: ' + t.toLowerCase() + '. Tente falar mais do que ouvir.', links: [L('tandem')] },
        { kind: 'Simulação', title: 'Simule a situação da semana', desc: 'Grave 5 minutos de uma situação real de "' + t + '": entrevista, reunião ou apresentação.', links: [] },
        { kind: 'Revisão', title: 'Grave 5 minutos sobre ' + t.toLowerCase(), desc: 'Compare com a semana passada. Revise as expressões da semana.', links: [L('anki')] },
      ],
    };
    m = T[i.phase.n][i.dw - 1];
  }
  const steps = [{ id: 'missao', min: short ? 15 : 30, ...m }];
  steps.push({ id: 'pausa', min: 10, kind: 'Pausa', title: 'Teste rápido no English Journey', desc: 'Faça a revisão do dia num intervalo.', links: [L('ej', 'Abrir o English Journey')] });
  if (!short) {
    steps.push({ id: 'shadow', min: 10, kind: 'Shadowing', title: 'Repita 1 minuto do que ouviu hoje', desc: 'Frase por frase, imitando o ritmo e a entonação. Se não ouviu nada hoje, use o último texto da fase 1.', links: [L('youglish')] });
    steps.push({ id: 'caderno', min: 10, kind: 'Caderno', title: 'Anote 5 expressões do dia', desc: 'Com uma frase de exemplo cada. Leia em voz alta antes de dormir.', links: [L('anki')] });
  }
  return steps;
}

/* ---------- estado e salvamento ---------- */
const LS = 'itd-state-v2';
let state = { done: [], steps: {}, short: false, updatedAt: 0 };
try {
  const s = JSON.parse(localStorage.getItem(LS) || 'null');
  if (s && Array.isArray(s.done)) state = { done: s.done, steps: s.steps || {}, short: !!s.short, updatedAt: s.updatedAt || 0 };
  const old = JSON.parse(localStorage.getItem('itd-done-v1') || '[]');
  if (Array.isArray(old)) state.done = [...new Set([...state.done, ...old])];
} catch (e) {}
const isDone = d => state.done.includes(d);
const firstOpen = () => { for (let d = 1; d <= TOTAL; d++) if (!isDone(d)) return d; return null; };
let viewing = null;
let justFinished = null;

function persist() {
  state.updatedAt = Date.now();
  try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {}
  if (window.onLocalChange) window.onLocalChange();
}

/* levar o progresso para outro aparelho: um código curto com os dias feitos */
function toRanges(list) {
  const a = [...list].sort((x, y) => x - y), out = [];
  for (let k = 0; k < a.length; k++) {
    let j = k;
    while (j + 1 < a.length && a[j + 1] === a[j] + 1) j++;
    out.push(a[k] === a[j] ? String(a[k]) : a[k] + '-' + a[j]);
    k = j;
  }
  return out.join('.');
}
function fromRanges(str) {
  const out = [];
  for (const part of str.split('.')) {
    const m = part.match(/^(\d+)(?:-(\d+))?$/);
    if (!m) continue;
    const a = +m[1], b = m[2] ? +m[2] : a;
    for (let d = a; d <= Math.min(b, TOTAL); d++) out.push(d);
  }
  return out;
}
const exportCode = () => 'ITD-' + (toRanges(state.done) || '0');
function importCode(code) {
  const m = String(code).trim().toUpperCase().match(/^ITD-([\d.\-]+)$/);
  if (!m) return null;
  const days = fromRanges(m[1]).filter(d => d >= 1);
  state.done = [...new Set([...state.done, ...days])];
  persist();
  return days.length;
}

/* ---------- utilidades ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ICON_PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_KEY = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2l2.2 5.1L17.5 8l-4 3.6 1.2 5.4L10 14.3 5.3 17l1.2-5.4-4-3.6 5.3-.9z" fill="currentColor"/></svg>';
const ICON_FLAG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4m0 0h11l-2 4 2 4H5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
const linkBtn = (l, cls) => `<a class="btn link ${cls || ''}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`;

const synth = window.speechSynthesis;
let voice = null;
function pickVoice() {
  if (!synth) return;
  const vs = synth.getVoices();
  voice = vs.find(v => v.lang === 'en-US' && /natural|samantha|aria|jenny|google/i.test(v.name)) || vs.find(v => v.lang === 'en-US') || vs.find(v => v.lang && v.lang.startsWith('en')) || null;
}
if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }
function speak(text, rate) {
  if (!synth) return false;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = rate || 0.95; if (voice) u.voice = voice;
  synth.speak(u);
  return true;
}
const plain = t => t.en.map(p => p.replace(/^[A-Z][a-z]+:\s/, '')).join(' ');
function markText(html, chunks) {
  const ranges = [], low = html.toLowerCase();
  for (const [c] of chunks) {
    const needle = esc(c.replace(/[?!.…]+$/, '').trim()).toLowerCase();
    if (!needle) continue;
    let i = low.indexOf(needle);
    while (i !== -1) {
      const end = i + needle.length;
      if (!ranges.some(r => i < r[1] && end > r[0])) { ranges.push([i, end]); break; }
      i = low.indexOf(needle, i + 1);
    }
  }
  ranges.sort((a, b) => b[0] - a[0]);
  for (const [s, e] of ranges) html = html.slice(0, s) + '<mark>' + html.slice(s, e) + '</mark>' + html.slice(e);
  return html;
}

/* ---------- leitor de texto ---------- */
let showPT = false;
function readerHTML(t) {
  const i = info(t.d);
  const paras = t.en.map((p, k) => {
    let sp = '', body = p;
    const m = p.match(/^([A-Z][a-z]+):\s(.*)$/);
    if (m) { sp = `<span class="speaker">${m[1]}</span>`; body = m[2]; }
    return `<div class="para"><div>${sp}${markText(esc(body), t.chunks)}</div>${showPT ? `<div class="pt">${esc(t.tr[k])}</div>` : ''}</div>`;
  }).join('');
  return `<div class="reader-head"><div class="eyebrow">Dia ${t.d} · ${esc(i.weekName)} · ${t.lvl}${t.review ? ' · Revisão' : ''}</div><h2>${esc(t.title)}</h2><div class="muted">${esc(t.pt)}</div></div>
    <div class="controls">
      <button class="btn primary" data-r="play">${ICON_PLAY} Ouvir</button>
      <button class="btn" data-r="slow">${ICON_PLAY} Devagar</button>
      <button class="btn" data-r="stop">Parar</button>
      <button class="btn" data-r="pt" aria-pressed="${showPT}">Tradução</button>
    </div>
    <p class="voice-note" data-r="nv" hidden>Este navegador não tem voz em inglês. Copie o texto no Google Tradutor e use o botão de ouvir de lá.</p>
    <div class="text">${paras}</div>
    <div><div class="label">Expressões do dia · toque para ouvir</div>
      <ul class="chunks">${t.chunks.map(([en, pt], k) => `<li><button class="chunk" data-chunk="${k}">${ICON_PLAY}<span><span class="en">${esc(en)}</span><span class="ptx">${esc(pt)}</span></span></button></li>`).join('')}</ul></div>
    <div class="focus"><b>Repare:</b> ${esc(t.focus)}</div>`;
}
function mountReader(el, t, rerender) {
  el.innerHTML = readerHTML(t);
  const nv = () => { el.querySelector('[data-r="nv"]').hidden = false; };
  el.querySelector('[data-r="play"]').onclick = () => speak(plain(t), 0.95) || nv();
  el.querySelector('[data-r="slow"]').onclick = () => speak(plain(t), 0.72) || nv();
  el.querySelector('[data-r="stop"]').onclick = () => synth && synth.cancel();
  el.querySelector('[data-r="pt"]').onclick = () => { showPT = !showPT; mountReader(el, t, rerender); };
  el.querySelectorAll('.chunk').forEach(b => b.onclick = () => speak(t.chunks[+b.dataset.chunk][0], 0.85) || nv());
}

/* ---------- HOJE ---------- */
const TOPO = `<svg class="topo" viewBox="0 0 800 300" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1">
  <path d="M520 300c10-60 60-90 120-95s110-40 160-110"/><path d="M560 300c10-45 50-68 95-72s95-30 145-90"/><path d="M600 300c8-30 40-48 70-50s70-20 130-70"/>
  <path d="M470 300c15-80 80-120 160-128s120-60 170-150"/><path d="M420 300c20-100 100-150 200-160s130-80 180-190"/><path d="M640 300c6-15 25-28 45-30s55-12 115-50"/></svg>`;
let readerOpen = false;
function renderHoje() {
  const el = document.getElementById('view-hoje');
  const today = firstOpen();
  if (justFinished) return renderCelebrate(el, justFinished, today);
  if (!today && !viewing) {
    el.innerHTML = `<div class="celebrate"><div class="eyebrow">Dia 360</div><h2>Você chegou ao cume.</h2><p>Os 360 dias estão concluídos. Continue com uma conversa por semana e um episódio sem legenda por dia para manter o nível.</p></div>`;
    return;
  }
  const d = viewing || today;
  const i = info(d);
  const steps = session(d, state.short);
  const checks = state.steps[d] || {};
  const doneCount = state.done.length;
  const nextTest = 30 - i.dom;
  const allChecked = steps.every(s => checks[s.id]);
  const unl = unlocksOn(d);
  const ticks = [90, 180, 270].map(x => `<span class="tick" style="left:${x / TOTAL * 100}%"></span>`).join('');
  el.innerHTML = `
    ${viewing && viewing !== today ? `<div class="viewing"><span>Você está vendo o <b>dia ${d}</b>${isDone(d) ? ' (já feito)' : ''}.</span><button class="btn" id="back-today">Voltar para hoje (dia ${today || TOTAL})</button></div>` : ''}
    <div class="hero">${TOPO}
      <div class="eyebrow">Fase ${i.phase.n} · ${esc(i.phase.name)} · ${weekLabel(i)}</div>
      <div class="hero-row">
        <div><h1>Dia ${d}<small>de ${TOTAL}</small></h1><p class="where">${esc(i.weekName)} · ${i.phase.lvl}</p></div>
        <div class="stats">
          <div class="stat"><b>${doneCount}</b><span>dias feitos</span></div>
          <div class="stat"><b>${nextTest === 0 ? 'Hoje' : nextTest}</b><span>${nextTest === 0 ? (i.phaseEnd ? 'teste da fase' : 'teste do mês') : 'dias até o teste do mês'}</span></div>
        </div>
      </div>
      <div class="journey" aria-label="Sua posição na jornada">
        <div class="jbar"><span class="fill" style="width:${doneCount / TOTAL * 100}%"></span>${ticks}<span class="me" style="left:${(d - .5) / TOTAL * 100}%"></span></div>
        <div class="jlabels">${PHASES.map(p => `<span class="${p.n === i.phase.n ? 'on' : ''}">${p.n}. ${p.name}</span>`).join('')}</div>
      </div>
    </div>
    ${window.accountBanner ? window.accountBanner() : ''}
    ${unl.length ? `<div class="unlock"><span class="k">${ICON_KEY}</span><div class="txt"><b>Novo atalho na trilha:</b> ${unl.map(k => esc(RES[k].n)).join(', ')}. <span class="muted small">${esc(RES[unl[0]].p)}</span></div>${linkBtn({ label: 'Abrir', url: RES[unl[0]].u })}</div>` : ''}
    <div class="session-head">
      <div><h2>Sua sessão de hoje</h2><p class="muted small">${steps.reduce((a, s) => a + s.min, 0)} minutos · marque cada passo ao terminar</p></div>
      <div class="mode" role="group" aria-label="Duração"><button data-mode="full" aria-pressed="${!state.short}">Completa</button><button data-mode="short" aria-pressed="${state.short}">Dia corrido</button></div>
    </div>
    <div class="steps">${steps.map((s, k) => stepHTML(s, k, !!checks[s.id])).join('')}</div>
    <div class="finish">
      <div><b>${isDone(d) ? 'Dia concluído' : allChecked ? 'Tudo feito. Feche o dia.' : 'Terminou o que deu?'}</b><p class="muted small">${isDone(d) ? 'Você pode refazer qualquer passo quando quiser.' : 'Fechar o dia leva você para o próximo, mesmo que falte um passo.'}</p></div>
      <button class="btn ${isDone(d) ? '' : 'primary'}" id="finish">${isDone(d) ? 'Desmarcar dia' : 'Concluir o dia ' + d}</button>
    </div>
    <details class="how"><summary>Como funciona a trilha</summary><div class="inner">
      <p>Você só precisa abrir esta página e seguir a sessão do dia. Ela muda sozinha conforme você avança.</p>
      <ul>
        <li><b>Fase 1 (dias 1–90):</b> um texto curto por dia com o inglês mais falado. Você ouve, repete junto (shadowing) e reconta gravando.</li>
        <li><b>Fases 2 a 4 (dias 91–360):</b> uma missão por dia com conteúdo real: podcast, série, notícia, conversa e escrita, sempre sobre o tema da semana.</li>
        <li><b>O English Journey</b> entra como pausa: um teste rápido de revisão num intervalo do dia.</li>
        <li><b>Todo 7º dia é revisão</b> e todo dia 30 do mês é teste. Guarde as gravações para ouvir a sua evolução.</li>
        <li><b>Dia corrido?</b> Use a versão curta. Pular um dia não estraga nada; pular uma semana estraga.</li>
      </ul></div></details>
    ${window.accountPanel ? window.accountPanel() : ''}
    <details class="how"><summary>Sem conta: levar o progresso por código</summary><div class="inner">
      <p>O progresso fica salvo neste aparelho. Para continuar no celular ou no computador, copie o código aqui e cole no outro aparelho.</p>
      <div class="actions"><input id="code-out" class="code" readonly value="${exportCode()}" aria-label="Seu código de progresso"><button class="btn" id="code-copy">Copiar código</button></div>
      <div class="actions"><input id="code-in" class="code" placeholder="Cole aqui o código do outro aparelho" aria-label="Código do outro aparelho"><button class="btn" id="code-load">Trazer progresso</button></div>
      <p class="small" id="code-msg" aria-live="polite"></p>
    </div></details>`;
  bindHoje(el, d, steps);
  bindCode(el);
  if (window.bindAccount) window.bindAccount(el);
}
function stepHTML(s, k, on) {
  return `<div class="step ${on ? 'is-done' : ''}">
    <button class="check" data-check="${s.id}" aria-pressed="${on}" aria-label="Marcar ${esc(s.kind)} como feito">${ICON_CHECK}</button>
    <div class="step-body">
      <div class="step-meta"><span>${k + 1} · ${esc(s.kind)}</span><span>·</span><span>${s.min} min</span></div>
      <div class="step-title">${esc(s.title)}${s.sub ? ` <span class="muted" style="font-family:var(--f-ui);font-weight:400;font-size:15px">· ${esc(s.sub)}</span>` : ''}</div>
      ${s.desc ? `<p class="step-desc">${esc(s.desc)}</p>` : ''}
      ${s.flow ? `<ol class="flow">${s.flow.map(f => `<li>${esc(f)}</li>`).join('')}</ol>` : ''}
      ${s.tasks ? `<ol class="tasks">${s.tasks.map(t => `<li>${esc(t)}</li>`).join('')}</ol>` : ''}
      <div class="actions">
        ${s.text ? `<button class="btn primary" id="open-text" aria-expanded="${readerOpen}">${readerOpen ? 'Fechar texto' : 'Abrir o texto'}</button>` : ''}
        ${(s.links || []).map((l, j) => linkBtn(l, j === 0 && !s.text ? 'primary' : '')).join('')}
      </div>
    </div></div>${s.text && readerOpen ? '<article class="reader" id="today-reader"></article>' : ''}`;
}
function bindHoje(el, d, steps) {
  const back = el.querySelector('#back-today');
  if (back) back.onclick = () => { viewing = null; readerOpen = false; renderHoje(); window.scrollTo({ top: 0 }); };
  el.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { state.short = b.dataset.mode === 'short'; persist(); renderHoje(); });
  el.querySelectorAll('[data-check]').forEach(b => b.onclick = () => {
    const c = { ...(state.steps[d] || {}) };
    c[b.dataset.check] = !c[b.dataset.check];
    state.steps = { ...state.steps, [d]: c };
    persist(); renderHoje(); renderTrilhaIfVisible();
  });
  const ot = el.querySelector('#open-text');
  if (ot) ot.onclick = () => { readerOpen = !readerOpen; renderHoje(); if (readerOpen) document.getElementById('today-reader').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const tr = el.querySelector('#today-reader');
  if (tr) mountReader(tr, info(d).text);
  el.querySelector('#finish').onclick = () => {
    if (isDone(d)) { state.done = state.done.filter(x => x !== d); persist(); renderAll(); return; }
    state.done = [...state.done, d];
    persist(); synth && synth.cancel();
    justFinished = d; viewing = null; readerOpen = false;
    renderAll(); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
function renderCelebrate(el, d, next) {
  const i = info(d);
  const n = next ? info(next) : null;
  const nTitle = n ? (n.text ? n.text.title + ' · ' + n.text.pt : session(next, false)[0].title) : '';
  el.innerHTML = `<div class="celebrate">
      <div class="eyebrow">Dia ${d} concluído · ${state.done.length} de ${TOTAL}</div>
      <h2>${i.phaseEnd ? 'Fim da fase ' + i.phase.n + '. Você subiu um acampamento.' : i.monthEnd ? 'Mês ' + i.month + ' fechado.' : 'Mais um passo na trilha.'}</h2>
      ${n ? `<p>Amanhã: <b>dia ${next}</b>, ${esc(nTitle)}.</p>` : '<p>Você terminou a jornada inteira.</p>'}
      <div class="actions">${n ? '<button class="btn primary" id="go-next">Ver o dia ' + next + '</button>' : ''}<button class="btn" id="go-trail">Ver a trilha</button></div>
    </div>`;
  const gn = el.querySelector('#go-next');
  if (gn) gn.onclick = () => { justFinished = null; renderHoje(); window.scrollTo({ top: 0 }); };
  el.querySelector('#go-trail').onclick = () => { justFinished = null; renderHoje(); show('trilha'); };
}

function bindCode(el) {
  const out = el.querySelector('#code-out'), msg = el.querySelector('#code-msg');
  el.querySelector('#code-copy').onclick = async () => {
    try { await navigator.clipboard.writeText(out.value); msg.textContent = 'Código copiado.'; }
    catch (e) { out.select(); msg.textContent = 'Selecionei o código: copie com Ctrl+C ou segurando o dedo.'; }
  };
  el.querySelector('#code-load').onclick = () => {
    const n = importCode(el.querySelector('#code-in').value);
    if (n === null) { msg.textContent = 'Código inválido. Ele começa com ITD-.'; return; }
    renderAll();
    const m2 = document.querySelector('#code-msg');
    if (m2) m2.textContent = 'Pronto: ' + n + ' dias trazidos do outro aparelho.';
  };
}

/* ---------- TRILHA ---------- */
let openStation = null;
const XS = [18, 50, 82, 50, 18];
function stationsOf(p) {
  const list = [];
  for (let m = p.months[0]; m <= p.months[1]; m++) {
    for (let w = 1; w <= 5; w++) {
      const start = (m - 1) * 30 + (w - 1) * 7 + 1;
      const days = w < 5 ? [0, 1, 2, 3, 4, 5, 6].map(k => start + k) : [(m - 1) * 30 + 29, (m - 1) * 30 + 30];
      list.push({ key: m + '-' + w, m, w, days, i: info(days[0]) });
    }
  }
  return list;
}
function renderTrilha() {
  const el = document.getElementById('view-trilha');
  const today = firstOpen() || TOTAL;
  const ti = info(today);
  let html = `<div class="trail-top"><div class="eyebrow">Sua jornada · 12 meses</div><h2>Você está no dia ${today}, na fase ${ti.phase.n}.</h2>
    <p class="muted">Siga o caminho de cima para baixo. Cada estação é uma semana; toque nela para ver os dias. Os atalhos aparecem no ponto da trilha em que você vai começar a usar cada um.</p></div>`;
  let idx = 0;
  for (const p of PHASES) {
    const st = stationsOf(p);
    const pDone = st.every(s => s.days.every(isDone));
    const pOn = today >= (p.months[0] - 1) * 30 + 1 && today <= p.months[1] * 30;
    html += `<div class="camp ${pDone ? 'done' : pOn ? 'on' : ''}"><div class="badge">${p.n}</div>
      <div class="eyebrow">Acampamento ${p.n} · meses ${p.months[0]}–${p.months[1]} · ${p.lvl}</div>
      <h3>${esc(p.name)}: ${esc(p.goal)}</h3><p>${esc(p.about)}</p></div>
      <div class="path" data-path="${p.n}"><svg class="line" aria-hidden="true"></svg>`;
    for (const s of st) {
      const x = XS[idx % 4]; idx++;
      const doneN = s.days.filter(isDone).length;
      const all = doneN === s.days.length;
      const on = s.days.includes(today) && !all;
      const tail = s.w === 5;
      const chips = [...new Set(s.days.flatMap(unlocksOn))].map(k => `<span class="chip">+ ${esc(RES[k].n)}</span>`).join('');
      const title = tail ? (s.m === p.months[1] ? 'Teste da fase ' + p.n : 'Teste do mês ' + s.m) : s.i.weekName;
      const left = x > 50;
      const labStyle = left ? `margin-right:calc(${100 - x}% + 34px);max-width:calc(${x}% - 40px)` : `margin-left:calc(${x}% + 34px);max-width:calc(${100 - x}% - 40px)`;
      html += `<div class="station ${all ? 'done' : ''} ${on ? 'on' : ''} ${tail ? 'tail' : ''}" data-st="${s.key}">
        <button class="node" style="left:${x}%" data-open="${s.key}" aria-expanded="${openStation === s.key}" aria-label="${esc(title)}">${tail ? 'T' : s.i.gw}</button>
        <button class="lab ${left ? 'left' : ''}" style="${labStyle}" data-open="${s.key}">
          ${on ? '<span class="here">Você está aqui</span>' : ''}
          <b>${esc(title)}</b><span class="m">${tail ? 'Dias ' + s.days[0] + '–' + s.days[1] : 'Semana ' + s.i.gw + ' · dias ' + s.days[0] + '–' + s.days[6]} · ${doneN}/${s.days.length}</span>
          ${chips ? `<span class="chips">${chips}</span>` : ''}
        </button></div>`;
      if (openStation === s.key) {
        html += `<div class="days-panel">${s.days.map(d => {
          const di = info(d);
          const t = di.text ? di.text.title : session(d, false)[0].title;
          return `<button class="day-row ${d === today ? 'on' : ''}" data-day="${d}"><span class="n">DIA ${d}</span><span class="t">${esc(t)}</span><span class="s">${isDone(d) ? '✓ feito' : d === today ? 'hoje' : ''}</span></button>`;
        }).join('')}</div>`;
      }
    }
    html += `</div><div class="summit">${ICON_FLAG}<div><b>Teste da fase ${p.n}:</b> ${esc(p.test)}</div></div>`;
  }
  el.innerHTML = html;
  el.querySelectorAll('[data-open]').forEach(b => b.onclick = () => { openStation = openStation === b.dataset.open ? null : b.dataset.open; renderTrilha(); });
  el.querySelectorAll('[data-day]').forEach(b => b.onclick = () => openDay(+b.dataset.day));
  requestAnimationFrame(drawPaths);
}
function drawPaths() {
  document.querySelectorAll('.path').forEach(path => {
    const svg = path.querySelector('svg.line');
    const box = path.getBoundingClientRect();
    const pts = [...path.querySelectorAll('.node')].map(n => {
      const r = n.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, done: n.parentElement.classList.contains('done') };
    });
    if (pts.length < 2) return;
    let all = '', done = '';
    for (let k = 1; k < pts.length; k++) {
      const a = pts[k - 1], b = pts[k], ym = (a.y + b.y) / 2;
      const seg = `M${a.x},${a.y} C${a.x},${ym} ${b.x},${ym} ${b.x},${b.y}`;
      all += seg;
      if (a.done) done += seg;
    }
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    svg.innerHTML = `<path d="${all}" fill="none" stroke="var(--line)" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
      <path d="${done}" fill="none" stroke="var(--done)" stroke-width="3" stroke-linecap="round"/>`;
  });
}
function renderTrilhaIfVisible() { if (!document.getElementById('view-trilha').hidden) renderTrilha(); }
function openDay(d) {
  justFinished = null;
  viewing = d === firstOpen() ? null : d;
  readerOpen = !!info(d).text;
  show('hoje'); renderHoje(); window.scrollTo({ top: 0 });
}

/* ---------- TEXTOS ---------- */
let libMonth = 1, libOpen = null;
function renderTextos() {
  const el = document.getElementById('view-textos');
  if (libOpen) {
    const t = DAYS.find(x => x.d === libOpen);
    el.innerHTML = `<div class="actions"><button class="btn" id="lib-back">← Todos os textos</button><button class="btn" id="lib-day">Abrir como sessão do dia ${t.d}</button></div><article class="reader" id="lib-reader"></article>`;
    mountReader(el.querySelector('#lib-reader'), t);
    el.querySelector('#lib-back').onclick = () => { synth && synth.cancel(); libOpen = null; renderTextos(); };
    el.querySelector('#lib-day').onclick = () => openDay(t.d);
    return;
  }
  const list = DAYS.filter(t => Math.ceil(t.d / 30) === libMonth);
  el.innerHTML = `<div class="trail-top"><div class="eyebrow">Biblioteca · fase 1</div><h2>Os 90 textos</h2><p class="muted">Para revisar quando quiser. A sessão de hoje abre o texto certo sozinha.</p></div>
    <div class="filters" role="group" aria-label="Mês">${[1, 2, 3].map(m => `<button data-m="${m}" aria-pressed="${m === libMonth}">Mês ${m}</button>`).join('')}</div>
    <div class="lib">${list.map(t => `<button class="card ${t.review ? 'rev' : ''}" data-t="${t.d}"><span class="n"><span>DIA ${t.d}${t.review ? ' · REVISÃO' : ''}</span>${isDone(t.d) ? '<span class="ok">✓</span>' : ''}</span><b>${esc(t.title)}</b><span class="p">${esc(t.pt)}</span></button>`).join('')}</div>`;
  el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { libMonth = +b.dataset.m; renderTextos(); });
  el.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { libOpen = +b.dataset.t; renderTextos(); window.scrollTo({ top: 0 }); });
}

/* ---------- ATALHOS ---------- */
function renderAtalhos() {
  const el = document.getElementById('view-atalhos');
  const today = firstOpen() || TOTAL;
  el.innerHTML = `<div class="trail-top"><div class="eyebrow">Tudo gratuito</div><h2>Atalhos da trilha</h2><p class="muted">Cada atalho aparece na sessão do dia em que você precisa dele. Aqui ficam todos juntos, para abrir quando quiser.</p></div>
    <div class="res-groups">${RES_GROUPS.map(([g, name]) => `<div class="res-group"><div class="label">${name}</div>${Object.values(RES).filter(r => r.g === g).map(r => `
      <div class="res ${r.at > today ? 'locked' : ''}"><a class="name" href="${esc(r.u)}" target="_blank" rel="noopener">${esc(r.n)} ↗</a><span class="when">${r.at > today ? 'entra no dia ' + r.at : 'em uso'}</span><p>${esc(r.p)}</p></div>`).join('')}</div>`).join('')}
      <div class="res-group"><div class="label">Sem instalar nada</div>
        <div class="res"><b>Gravador do celular</b><span class="when">todo dia</span><p>Seu melhor professor de fala. Grave, ouça e compare com o áudio do texto.</p></div>
        <div class="res"><b>Botão Ouvir dos textos</b><span class="when">fase 1</span><p>Usa a voz em inglês do seu aparelho. Funciona no celular e no computador.</p></div>
      </div></div>`;
}

/* ---------- navegação ---------- */
const VIEWS = ['hoje', 'trilha', 'textos', 'atalhos'];
function show(v) {
  if (!VIEWS.includes(v)) v = 'hoje';
  VIEWS.forEach(x => {
    document.getElementById('view-' + x).hidden = x !== v;
    document.getElementById('tab-' + x).setAttribute('aria-selected', String(x === v));
  });
  if (v === 'trilha') renderTrilha();
  if (v === 'textos') renderTextos();
  if (v === 'atalhos') renderAtalhos();
  try { history.replaceState(null, '', '#' + v); } catch (e) {}
}
document.querySelectorAll('[data-view]').forEach(b => b.onclick = () => { show(b.dataset.view); window.scrollTo({ top: 0 }); });
function renderAll() {
  renderHoje();
  const cur = VIEWS.find(x => !document.getElementById('view-' + x).hidden);
  if (cur && cur !== 'hoje') show(cur);
}
let rz;
window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(drawPaths, 120); });
renderHoje();
show(location.hash.slice(1) || 'hoje');
