<style>
  body {
    font-family: 'Lora', Georgia, serif;
    color: #141413;
    background-color: #faf9f5;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', Arial, sans-serif;
    color: #141413;
    margin-top: 1.5em;
  }
  h1 { font-size: 2.2em; border-bottom: 2px solid #d97757; padding-bottom: 10px; }
  h2 { font-size: 1.8em; color: #6a9bcc; }
  h3 { font-size: 1.4em; color: #788c5d; }
  .accent-orange { color: #d97757; font-weight: bold; }
  .accent-blue { color: #6a9bcc; font-weight: bold; }
  .accent-green { color: #788c5d; font-weight: bold; }
  .secondary-text { color: #b0aea5; }
  .box {
    background-color: #e8e6dc;
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    border-left: 5px solid #d97757;
  }
  .insight {
    background-color: #e8e6dc;
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
    border-left: 5px solid #6a9bcc;
  }
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  ul li::before {
    content: "■ ";
    color: #d97757;
    font-size: 0.8em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #b0aea5;
  }
  th {
    background-color: #e8e6dc;
    font-family: 'Poppins', Arial, sans-serif;
  }
</style>

# Análise Competitiva de Mercado - Landing Pages (CRO)

Este relatório compila a avaliação das páginas de empresas concorrentes/referências (Jetimob, CredPago, Avalyst e Velo), utilizando a metodologia de **Conversion Rate Optimization (CRO)** e formatado visualmente seguindo o <span class="accent-orange">Anthropic Brand Guidelines</span>.

## 1. Jetimob

No modelo SaaS para imobiliárias e corretores, atua majoritariamente no B2B oferecendo gestão e integração (CRM, site, financeiro).

<div class="box">
  <p><strong>Value Proposition (Proposição de Valor):</strong> "O sistema imobiliário que simplifica sua gestão."</p>
</div>

*   **Pontos Fortes de CRO:**
    *   **Público claro:** Divide muito bem as soluções (para corretores, imobiliárias, incorporadoras).
    *   **Trust Signals (Confiança):** Menciona grandes números ("integramos ao maior estoque do Brasil", "milhares de usuários").
    *   **Clareza visual:** Muito espaço em branco, layout responsivo.
*   **Atritos e Oportunidades:**
    *   **Headline fraco:** "Simplifica sua gestão" não tangibiliza o ganho ("venda 30% mais rápido" ou "economize X horas" serial ideal).
    *   **CTA Genérico:** Pode ser melhorado para CTAs mais orientados à ação como "Teste Grátis" ou "Ver Planos" acima da dobra, com destaque ainda maior.

## 2. CredPago

Foco total em garantia de aluguel por cartão de crédito. É um modelo B2B2C, atende imobiliária (gratuitamente), proprietário e inquilino.

<div class="box">
  <p><strong>Value Proposition:</strong> "Aluguel sem fiador, rápido e garantido."</p>
</div>

*   **Pontos Fortes de CRO:**
    *   **Headline Eficaz:** Direto ao ponto, resolve as principais "dores" (demora e a dificuldade de achar fiador).
    *   **Segmentação:** Explica na aba inicial a vantagem para cada um dos três perfis de clientes de forma limpa.
    *   **Social Proof Forte:** Parceria com a **Loft** em destaque funciona como excelente prova social de autoridade no mercado.
    *   **Tratamento de Objeções:** Na aba para a imobiliária, deixam explícito: "Garantia de recebimento" e "Até 30x o valor do aluguel".
*   **Atritos:**
    *   Muita informação segmentada pode exigir múltiplos cliques do usuário até ele entender onde se encaixa, caso não role a página (scannability).

## 3. Avalyst

Mesmo nicho da CredPago: fiança locatícia digital por cartão de crédito, com foco em agilizar a operação das imobiliárias.

<div class="insight">
  <p><strong>Value Proposition:</strong> "Garantia Digital de Aluguel sem fiador. Total garantia para o proprietário e facilidade para o inquilino."</p>
</div>

*   **Pontos Fortes de CRO:**
    *   **Social Proof Eficiente:** Grande ênfase em depoimentos reais (ex: Nelson Silva, Daniele Bento). Cita nomes e foca nos depoimentos de ganho financeiro e agilidade.
    *   **Acesso Rápido a Suporte:** Deixa muito claro o número 0800 e botão principal visível para WhatsApp, reduzindo a fricção e ajudando conversão via time de vendas/suporte.
    *   **Call to Action Direto:** Uso constante do botão "CADASTRE-SE" associado à "gratuidade" para o corretor.
*   **Atritos:**
    *   O design é levemente mais tradicional, faltando uma apresentação visual que transmita tecnologia "state-of-the-art".

## 4. Velo

Também do segmento de fiança e garantia para locações rápidas.

*   **Pontos Fortes de CRO (Geral no App/Ads):** A Velo costuma trabalhar muito bem o senso de urgência ("Alugue em poucas horas").
*   **Atritos Graves Encontrados (Alerta Técnico):** Durante a análise, o site oficial *velo.com.br* estava apontando um erro de *Certificado SSL expirado*. 
    *   <span class="accent-orange">Problema Crítico de CRO:</span> Em soluções financeiras, a falta de SSL assusta o visitante e despenca a taxa de conversão a zero (barreira de confiança primária do Google/Browser).

---

### <span class="accent-green">Sugestões de Implementação para a Inmediam</span>

1.  **Headline (H1) Focado em Resultado:** Não venda "o sistema", venda a "locação concluída em 1 dia" ou "risco zero de inadimplência".
2.  **CTAs de Valor:** Evitar CTAs passivos como "Saiba Mais". Usar "Ativar Garantia Agora" ou "Simular Meu Aluguel".
3.  **Matadora Prova Social:** Coloque os dados de clientes B2B (imobiliárias) fortes imediatamente abaixo da dobra. E garanta que o site passa máxima credibilidade técnica.
