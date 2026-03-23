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
    
    // Perfurador Nativo de Iframes e Shadow DOM do Playwright para clicar em Aceitar Cookies
    const nukePopups = async () => {
        try {
            for (const frame of page.frames()) {
                const acceptBtn = frame.locator('button:has-text("Aceitar"), button:has-text("Concordar"), button:has-text("Entendi"), a:has-text("Aceitar"), div[role="button"]:has-text("Aceitar")').first();
                if (await acceptBtn.count() > 0 && await acceptBtn.isVisible()) {
                    await acceptBtn.click({ force: true, timeout: 500 }).catch(()=>{});
                }
            }
        } catch(e) {}
        
        // CSS Fallback
        await page.evaluate(() => {
            const killTags = ['[id*="cookie"]', '[class*="cookie"]', '[id*="adopt"]', '[class*="adopt"]', '[id*="consent"]', '[class*="consent"]', 'iframe[src*="chat"]', 'iframe[src*="whatsapp"]', '.whatsapp-button', '.blip-chat-container'];
            document.querySelectorAll(killTags.join(',')).forEach(e => {
                e.style.setProperty('display', 'none', 'important');
            });
            // Oculta iframes fixos na borda que geralmente sao chatbots/cookies teimosos
            document.querySelectorAll('iframe').forEach(ifr => {
                const style = window.getComputedStyle(ifr);
                if ((style.position === 'fixed' || style.position === 'absolute') && parseInt(style.zIndex||0) > 50) {
                    ifr.style.setProperty('display', 'none', 'important');
                }
            });
        });
    };

    await nukePopups();
    await page.waitForTimeout(1000);
    
    // Injeta CSS basico para revelar animacoes
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
                min-height: 100% !important;
            }
            [data-aos], .elementor-invisible, .fade-in, .lazy {
                opacity: 1 !important;
                transform: none !important;
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);
    });
    
    // Rola a pagina destravando o scroll interno lazy-loaded
    let prevHeight = 0;
    while(true) {
        await nukePopups();
        const curHeight = await page.evaluate(() => {
            window.scrollBy({ top: 800, behavior: 'auto' });
            return document.documentElement.scrollTop || document.body.scrollTop;
        });
        await page.waitForTimeout(600); 
        
        const scrollHeight = await page.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight));
        const windowHeight = await page.evaluate(() => window.innerHeight);
        if((curHeight + windowHeight) >= (scrollHeight - 50) || curHeight === prevHeight) {
            break;
        }
        prevHeight = curHeight;
    }
    
    await page.waitForTimeout(3000);
    
    // Obliterador supremo de amarras (Liberta o Header ao Footer do Fullpage: true)
    await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            // Destrava conteineres de scroll limitados a 100vh
            if (style.overflow === 'hidden' || style.overflowY === 'auto' || style.overflowY === 'scroll') {
                el.style.setProperty('overflow', 'visible', 'important');
            }
            if (style.height === '100vh' || style.maxHeight === '100vh' || (style.height.includes('px') && parseInt(style.height) === window.innerHeight)) {
                el.style.setProperty('height', 'auto', 'important');
                el.style.setProperty('max-height', 'none', 'important');
            }
            // Corrige overlays sticky costurados nativamente
            if (style.position === 'fixed' || style.position === 'sticky') {
                el.style.setProperty('position', 'absolute', 'important');
            }
        });
        window.scrollTo(0, 0); 
    });
    
    await page.waitForTimeout(1000); // Aguarda layout rebater

    // Playwright Full Page normal para tirar o print da extensao recriada
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
