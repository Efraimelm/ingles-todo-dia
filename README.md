# Inglês Todo Dia

Trilha de inglês de 360 dias para estudar por conta própria e de graça. Abra o app e a sessão do dia já está pronta.

**Abrir:** https://efraimelm.github.io/ingles-todo-dia/

- **Fase 1 (dias 1–90):** um texto curto por dia com o inglês mais usado, com áudio, tradução e expressões marcadas.
- **Fases 2 a 4 (dias 91–360):** uma missão por dia com conteúdo real (podcast, série, notícia, conversa, escrita) sobre o tema da semana.
- **Trilha:** o caminho dos 12 meses, com os atalhos gratuitos aparecendo no ponto em que você começa a usar cada um.
- Funciona sem internet depois da primeira abertura. O [English Journey](https://github.com/Efraimelm/english-journey) entra como a pausa de revisão do dia.

## Instalar

**iPhone:** abra o link no Safari → botão Compartilhar → **Adicionar à Tela de Início**.

**Android:** abra no Chrome → menu ⋮ → **Instalar app**.

**Computador:** abra no Chrome ou no Edge → ícone de instalar na barra de endereço (ou menu → **Instalar Inglês Todo Dia**).

Sem internet no computador: dê dois cliques em `rodar-no-computador.cmd` (precisa do Python).

## Celular e computador

Entre com a **mesma conta do English Journey** em **Hoje → Sincronizar celular e computador** (ou toque no aviso de salvamento no topo). Faça isso nos dois aparelhos e o progresso passa a ser o mesmo. Sem internet, o app segue salvando no aparelho e sincroniza quando a conexão volta.

A sincronização usa o mesmo projeto Supabase do English Journey, com a tabela `ingles_todo_dia`. Para criá-la, rode uma vez `supabase/schema.sql` no SQL Editor do projeto.

Sem conta, ainda dá para levar o progresso por código: **Hoje → Sem conta: levar o progresso por código**.

## Onde fica cada coisa

| Arquivo | O que é |
| --- | --- |
| `index.html` | A estrutura da página |
| `css/style.css` | Visual (cores claras e escuras, layout do celular) |
| `js/textos.js` | Os 90 textos da fase 1 |
| `js/app.js` | Trilha, sessões dos 360 dias, temas das semanas e atalhos |
| `js/sync.js` | Conta e sincronização entre aparelhos (Supabase) |
| `supabase/schema.sql` | Tabela do progresso na nuvem, com RLS |
| `sw.js` | Faz o app funcionar sem internet |
| `manifest.webmanifest` e `icons/` | Nome e ícone quando instalado |

## Atualizar

Edite os arquivos e envie para o GitHub (`git push`). O GitHub Pages publica sozinho em cerca de 1 minuto. Se mudar algum arquivo, troque `itd-v3` em `sw.js` para `itd-v4` (e assim por diante) para os aparelhos baixarem a versão nova.
