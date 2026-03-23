import { chromium } from 'playwright';

// Este script foi projetado para capturar prints perfeitos de landin pages
// Ele burla SSL, processa lazy-loads e impede que "fixed headers" quebrem o layout (100vh)
async function capture(url, name) {
  const browser = await chromium.launch({ headless: true }); 
  const context = await browser.newContext({ 
      viewport: { width: 1440, height: 900 },
      ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    console.log(`[SKILL: CRO] URL acessada: ${url}`);
    
    // Função que destrói popups ativamente, varrendo texto e z-index
    const nukePopups = async () => {
        await page.evaluate(() => {
            // Tenta clicar em "Aceitar"
            const btns = Array.from(document.querySelectorAll('button, a, div[role="button"], span'));
            btns.forEach(btn => {
                const text = (btn.innerText || '').toLowerCase().trim();
                if (['aceitar', 'aceito', 'concordo', 'entendi', 'aceitar cookies', 'permitir todos', 'aceitar todos'].includes(text)) {
                    if (btn.tagName === 'A') btn.removeAttribute('href');
                    try { btn.click(); } catch(e){}
                }
            });
            // Oculta blocos fixed/sticky que falem de cookies/lgpd/consentimento
            Array.from(document.querySelectorAll('*')).forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.position === 'fixed' || style.position === 'sticky') {
                    const text = (el.innerText || '').toLowerCase();
                    const idCls = (el.id + ' ' + el.className).toLowerCase();
                    if (text.includes('cookie') || text.includes('privacidade') || text.includes('lgpd') || text.includes('consentimento') || idCls.includes('chat') || idCls.includes('whatsapp')) {
                        el.style.setProperty('display', 'none', 'important');
                    }
                }
            });
        });
    };

    await nukePopups();
    await page.waitForTimeout(1000);
    
    // Injeta CSS para desligar animações e revelar todo o conteúdo instantaneamente
    await page.evaluate(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            html, body {
                height: auto !important;
                max-height: none !important;
                overflow: visible !important;
            }
            [data-aos], .elementor-invisible, .fade-in, .lazy {
                opacity: 1 !important;
                transform: none !important;
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);
    });
    
    // Scroll suave até o rodapé para engatilhar as imagens (lazy load)
    let prevHeight = 0;
    while(true) {
        await nukePopups();
        const curHeight = await page.evaluate(() => {
            window.scrollBy({ top: 600, behavior: 'auto' });
            return document.documentElement.scrollTop;
        });
        await page.waitForTimeout(600); 
        
        const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
        const windowHeight = await page.evaluate(() => window.innerHeight);
        if(curHeight + windowHeight >= scrollHeight - 50 || curHeight === prevHeight) {
            break;
        }
        prevHeight = curHeight;
    }
    
    await page.waitForTimeout(4000);
    
    // Converte menus 'fixed' e 'sticky' para 'absolute' para prevenir o bug fantasma na costura
    await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
                el.style.setProperty('position', 'absolute', 'important');
            }
        });
        window.scrollTo(0, 0); 
    });
    
    // Playwright Full Page normal (quebra nativamente as alturas corretas sem esticar o 100vh)
    await page.screenshot({ path: name, fullPage: true });
    console.log(`[SKILL: CRO] Artefato salvo com sucesso: ${name}`);
  } catch(e) {
    console.log(`[SKILL: CRO] Erro ao capturar ${name}: ${e.message}`);
  } finally {
    await browser.close();
  }
}

const args = process.argv.slice(2);
if (args.length >= 2) {
    capture(args[0], args[1]);
} else {
    console.log("Uso: node capture.mjs <URL> <NOME_DO_ARQUIVO.png>");
}
