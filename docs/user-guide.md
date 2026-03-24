# 📖 Guia do Usuário: Suite CRO Pro

Este guia orienta sobre como utilizar a suite para realizar auditorias de conversão de alto impacto.

---

## 📌 Introdução
A **Suite CRO Pro** foi desenvolvida para automatizar o processo de benchmark competitivo, permitindo que gestores e designers identifiquem rapidamente gaps de conversão em seus projetos.

## 🚀 Como Executar uma Auditoria

### 1. Descoberta (`cro-discovery`)
O primeiro passo é mapear quem são os seus concorrentes.
- Execute a skill de descoberta passando o nicho ou URL base.
- O resultado será um arquivo `competitors.json`.

### 2. Captura Visual (`cro-capture`)
Com os concorrentes mapeados, é hora de "fotografar" as experiências.
- O agente acessará cada URL e gerará capturas de tela em alta definição (1440px).
- As imagens serão salvas na pasta `screenshots/`.

### 3. Análise e Relatório (`cro-analyzer`)
O passo final transforma imagens e dados em um relatório editorial.
- O agente aplica as heurísticas de CRO.
- O arquivo `analise_competitiva.html` é gerado seguindo o padrão **Medium Executive**.

## 📊 Interpretando os Resultados

- **Headline / Proposta**: Avalie se o concorrente é direto ou confuso.
- **CTA Principal**: Verifique se o botão de ação está em destaque ou "escondido".
- **Matriz Comparativa**: Use para ter uma visão macro de quem oferece o quê no mercado.

---
> [!TIP]
> **Dica**: Sempre revise o relatório final no mobile, pois o `cro-analyzer` otimiza a tabela para scroll horizontal.

---
© 2026 APVS Brasil · [NOME_DO_DEPARTAMENTO]
