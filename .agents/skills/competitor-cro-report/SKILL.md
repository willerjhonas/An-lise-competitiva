---
name: competitor-cro-report
description: Automatiza a análise competitiva de Landing Pages (CRO), extrai a matriz de diferenciais, o tom de voz e gera um relatório HTML premium baseado no Anthropic Brand Guidelines, com capturas de tela injetadas.
---

# Competitor CRO Report Skill

Esta skill transforma o agente em um Especialista Sênior de Conversion Rate Optimization (CRO). Dado um conjunto de URLs concorrentes, o agente irá varrer seus sites, fotografá-los, analisá-los e cuspir um relatório de altíssimo nível em HTML.

## Passo a Passo Operacional (O que o agente deve fazer)

Ao ser acionado pelo usuário informando as URLs da empresa e dos concorrentes, você (Agente) DEVE seguir rigorosamente esta ordem:

### 1. Fotografia Cirúrgica (Full-Page Stealth)
Use o script de captura customizado desta skill `scripts/capture.mjs` para cada um dos concorrentes. 
Este script foi desenhado exclusivamente para desarmar armadilhas de renderização moderna:
- Ele ignora erros de certificado SSL que barrariam outros robôs.
- Ele destrói animações On-Scroll (AOS, Elementor) injetando CSS de anulação de transições para que nenhum elemento fique invisível (`opacity: 0`) nas fotos.
- Ele lida perfeitamente com Lazy Loading descendo a página fisicamente antes do click.
- Ele imobiliza os *menus sticky/fixed* transformando-os em `absolute` para não repeti-los quebrando todo o design ao longo das milhares de linhas verticais.
- **Rode:** `node capture.mjs <URL_CONCORRENTE> <nome_do_arquivo.png>`

### 2. Dissecação da Proposta de Valor e Atritos
Utilize os recursos textuais das páginas e imagens capturadas para identificar:
- **Público-alvo claro:** B2B, B2C, Enterprise?
- **Value Proposition principal:** O que eles prometem resolver (Dor x Desejo)?
- **Botões e CTAs:** Passivos ou baseados em urgência? Qual o fluxo imediato de entrada?
- **Provas Sociais Táticas:** Logotipos? Depoimentos reais em vídeo? Avaliações no Google?
- **Pontos de Fricção:** Longos formulários? Erros no site? Comunicação burocrática?

### 3. Avaliação de Gatilhos e Copywriting (Tom de Voz)
Analise profundamente a semântica de como se apresentam.
Qual palavra/conceito é repetido (Eficiência? Paz? Ansiedade? Inovação? Descomplicado?). Esta variável dita a bússola emocional onde seu cliente deve se encaixar (ou desviar).

### 4. Mapa de Fluxo de Conversão (Fricção do Funil)
Não avalie apenas a vitrine. Determine o que acontece quando o fluxo principal é clicado:
- Qual a complexidade estrutural do formulário?
- Pede CNPJ logo de cara (Atrito Alto) ou usa gatilhos de reciprocidade (Atrito Mínimo)?

### 5. Geração do Artefato HTML (O Gran Finale)
Compile todas essas métricas e gere um documento `analise_competitiva.html` no diretório de trabalho. Use o framework desenvolvido:
- **Tema:** Anthropic Brand Guidelines (Muitos espaços em branco, laranjas `#d97757` focais e verde acadêmico `#788c5d`, tipografia *Lora* / *Poppins* de alta seriedade e elegância).
- **Estrutura:** 
  1. Menu de Navegação Glassmorphism (Sticky).
  2. Matriz de Competitividade (Tabela Comparativa em bloco `.table-container` moderno).
  3. Corpo das Análises de Imagem (com suas respectivas legendas e imagens capturadas embedded na mesma pasta).
  4. Análise do Tom de Voz e Copywriting.
  5. Mapa de Fluxo de Conversão (Fricção do Funil).
  6. Checklist Prático (Sugestões de melhoria baseada no benchmark).

---
> **Ativação Padrão do Usuário:** 
> "@[Agente], ative a skill de análise de CRO. Minha empresa é [X] e meus três concorrentes principais são os links: [A, B, C]."
