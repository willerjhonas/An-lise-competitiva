---
description: Como executar uma análise completa de CRO Competitivo
---

Este fluxo de trabalho descreve os passos para realizar uma análise competitiva de ponta a ponta usando a Suite CRO Pro.

### Pré-requisitos
- Ter o Node.js instalado.
- Ter as dependências instaladas (`npm install`).

### Passos

1. **Descoberta de Concorrentes**
   - Use a skill `cro-discovery` para identificar os principais concorrentes no nicho desejado.
   - Isso gerará um arquivo `competitors.json`.

2. **Captura de Screenshots**
   - Use a skill `cro-capture` para capturar as landing pages dos concorrentes listados no `competitors.json`.
   - As imagens serão salvas na pasta do cliente.

3. **Análise Estratégica & Técnica**
   - Use a skill `audit-website` para realizar uma varredura profunda de SEO, performance e segurança no site principal.
   - Use a skill `cro-analyzer` para analisar as screenshots e o `competitors.json`.
   - O agente aplicará heurísticas de conversão usando o **Master Template** para identificar atritos de UX, escrever aprendizados estratégicos e gerar um relatório unificado de inteligência competitiva e saúde técnica.

4. **Organização dos Resultados**
   - Mova os arquivos gerados (relatórios, screenshots e logs de audit) para a pasta `data/[Nome do Cliente]/`.
