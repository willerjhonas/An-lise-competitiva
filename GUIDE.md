# 🧭 Guia Mestre: CRO Master Pro (v2.0)

Bem-vindo ao **CRO Master Pro (v2.0)**. Este documento é o seu mapa para navegar e operar esta suite de inteligência competitiva com maestria. Abaixo, explicamos a função de cada componente e como extrair o máximo de valor do sistema.

---

## 🏗️ Estrutura de Pastas (Onde cada peça se encaixa)

### 🧠 `.agents/` (O Cérebro)
Esta é a pasta mais importante. Ela contém a inteligência e as instruções que eu (seu agente) uso para trabalhar.
- **`skills/`**: São as ferramentas individuais. Cada subpasta aqui (como `cro-analyzer` ou `web-research`) contém um arquivo `SKILL.md` que me ensina a realizar uma tarefa específica em nível sênior.
- **`workflows/`**: São os "Manuais de Procedimentos Padrão" (SOPs). O arquivo `run-cro-analysis.md` descreve o passo a passo exato para uma análise completa.

### 📊 `data/` (O Cofre de Dados)
Aqui é onde os resultados do seu trabalho são armazenados. 
- **Privacidade**: No GitHub, esta pasta aparece vazia. No seu computador, ela conterá pastas para cada cliente (ex: `APVS Brasil`).
- **Conteúdo**: Dentro de cada pasta de cliente, você encontrará o `competitors.json` (dados brutos), a pasta `screenshots/` (fotos dos sites) e o relatório final em HTML.

### 🎨 `templates/` (O Design System)
Contém o **`cro_report_master_template.html`**. Este é o "esqueleto" visual de luxo que usamos para gerar os relatórios. Se você quiser mudar cores ou fontes de todos os futuros relatórios, é aqui que deve mexer.

### 📚 `docs/` (Biblioteca Técnica)
Contém manuais detalhados de uso e especificações técnicas sobre como o motor do sistema foi construído.

### ⚙️ Arquivos de Configuração (Raiz)
- **`README.md`**: A página de entrada do projeto no GitHub.
- **`.gitignore`**: As regras de privacidade. Ele garante que seus dados de clientes (`data/`) nunca vazem para a internet.
- **`package.json`**: Lista as ferramentas de infraestrutura (como o Playwright) que usamos para capturar as telas.

---

## 🚀 Como usar: O Fluxo de Ouro

Para realizar uma análise impecável, siga estes 3 passos:

### 1️⃣ Descoberta (Market Discovery)
Peça para o agente: *"Faça uma pesquisa de concorrentes para a empresa X no nicho Y"*.
- **O que acontece:** Eu uso a skill `cro-discovery` para mapear os players, suas propostas de valor e gerar o arquivo de base.

### 2️⃣ Captura (High-Def Capture)
Peça para o agente: *"Capture as telas dos concorrentes do arquivo da empresa X"*.
- **O que acontece:** Eu uso a skill `cro-capture` para entrar em cada site, ignorar banners de cookies e tirar "fotos" perfeitas de 1440px.

### 3️⃣ Análise Estratégica & Técnica (Full Assessment)
Peça para o agente: *"Gere o relatório de CRO e faça uma auditoria técnica para a empresa X"*.
- **O que acontece:** Eu executo o `cro-analyzer` + o `audit-website` simultaneamente. Uso o **Master Template** (`templates/`) para cruzar os dados de UX (heurísticas) com dados técnicos (mais de 230 regras de SEO e performance) para identificar atritos de UX, escrever aprendizados estratégicos e gerar um diagnóstico unificado e visualmente premium.

---

## 💡 Dicas de Mestre

- **Nunca use "Landing Page"**: O sistema foi padronizado para usar o termo **"Site"**, garantindo um tom mais corporativo e institucional.
- **Revise o JSON**: Entre o passo 1 e 2, dê uma olhada no `competitors.json`. Você pode remover ou adicionar URLs manualmente se quiser refinar o benchmarking.
- **Links Locais**: Os relatórios HTML gerados têm links clicáveis para abrir as screenshots diretamente no seu navegador.

---
© 2026 APVS Brasil · Inteligência Estratégica
