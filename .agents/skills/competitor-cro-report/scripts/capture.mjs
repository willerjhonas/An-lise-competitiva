import { chromium } from 'playwright';

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
    
    // Destrói ativamente modais de Cookies e LGPD (Ignorando iFrames)
    const nukePopups = async () => {
        try {
            for (const frame of page.frames()) {
                const b = frame.locator('button:has-text("Aceitar"), button:has-text("Concordar"), a:has-text("Aceitar")').first();
                if (await b.count() > 0 && await b.isVisible()) await b.click({timeout: 500}).catch(()=>{});
            }
        } catch(e) {}
        
        await page.evaluate(() => {
            const killTags = ['[id*="cookie"]', '[class*="cookie"]', '[id*="adopt"]', 'iframe[src*="chat"]', 'iframe[src*="whatsapp"]', '.whatsapp-button'];
            document.querySelectorAll(killTags.join(',')).forEach(e => e.style.setProperty('display', 'none', 'important'));
            document.querySelectorAll('iframe').forEach(ifr => {
                if (window.getComputedStyle(ifr).position === 'fixed') ifr.style.setProperty('display', 'none', 'important');
            });
        });
    };

    await nukePopups();
    await page.waitForTimeout(1000);

    // Desliga animacões e abre as travas de root para frameworks (React/Next)
    await page.evaluate(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                animation: none !important;
                transition: none !important;
                scroll-behavior: auto !important;
            }
            html, body, #root, #__next, .wrapper {
                height: auto !important;
                min-height: 100vh !important;
                overflow: visible !important;
            }
            [data-aos], .lazy, .elementor-invisible {
                opacity: 1 !important;
                transform: none !important;
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);
    });

    // Scroll simples da janela inteira (window) descendo do header ao footer para carregar lazy-loading
    let prevHeight = -1;
    let retries = 0;
    while(retries < 3) {
        await nukePopups();
        const curHeight = await page.evaluate(() => {
            window.scrollBy({ top: 800, behavior: 'instant' });
            return document.documentElement.scrollTop;
        });
        await page.waitForTimeout(600);
        
        if (curHeight === prevHeight) {
            retries++;
        } else {
            retries = 0; 
        }
        prevHeight = curHeight;
    }

    // Antes de tirar o print, força o scroll de volta ao TOPO 
    // e MATA os menus "fixed" para não repetirem na imagem inteira do fullPage
    await page.evaluate(() => {
        window.scrollTo(0, 0);
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.position === 'fixed' || style.position === 'sticky') {
                el.style.setProperty('position', 'absolute', 'important');
            }
        });
    });

    await page.waitForTimeout(1000); // Aguarda layout estabilizar no topo

    // O Playwright sozinho cuida da captura da página inteira
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
    console.log("Uso: node capture.mjs <URL> <NOME.png>");
}
