import { chromium } from 'playwright';

async function capture(url, name) {
  const browser = await chromium.launch({ headless: true }); 
  const context = await browser.newContext({ 
      viewport: { width: 1440, height: 900 },
      ignoreHTTPSErrors: true,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  const page = await context.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    console.log(`[SKILL: CRO] URL acessada (Canvas Stitcher V2): ${url}`);
    
    const nukePopups = async () => {
        try {
            for (const frame of page.frames()) {
                const b = frame.locator('button:has-text("Aceitar"), button:has-text("Concordar"), a:has-text("Aceitar")').first();
                if (await b.count() > 0 && await b.isVisible()) await b.click({timeout: 500}).catch(()=>{});
            }
        } catch(e) {}
        
        await page.evaluate(() => {
            // Eliminação nuclear de iframes fixos flutuantes (Chatbots independentes) e overlays
            document.querySelectorAll('iframe').forEach(ifr => {
                const c = window.getComputedStyle(ifr);
                if (c.position === 'fixed' || c.position === 'absolute') {
                    if (!ifr.src.includes('youtube') && !ifr.src.includes('vimeo')) {
                        ifr.style.setProperty('display', 'none', 'important');
                    }
                }
            });

            // Eliminação tradicional por assinatura
            const killTags = [
                '[id*="cookie"]', '[class*="cookie"]', '[id*="adopt"]', 
                'iframe[src*="chat"]', 'iframe[src*="whatsapp"]', 'iframe[src*="jivo"]', 'iframe[src*="tawk"]', '.whatsapp-button', '[class*="whatsapp"]', '[id*="whatsapp"]', 
                '#blip-chat-container', '#take-chat-window', '#rd-station-chatbot', '.intercom-lightweight-app', '#launcher'
            ];
            document.querySelectorAll(killTags.join(',')).forEach(e => e.style.setProperty('display', 'none', 'important'));
        });
    };

    await nukePopups();
    await page.waitForTimeout(1000);
    await page.mouse.click(720, 450);

    // 1. Lança a Isca Térmica do PageDown
    console.log(`[SKILL: CRO] Lançando a "Isca de Scroll" para o rastreador matemático...`);
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(800);

    // 2. Rastreador descobre QUEM de fato se mexeu
    await page.evaluate(() => {
        let max = 0;
        let masterScroller = document.documentElement;
        document.querySelectorAll('*').forEach(e => {
            if (e.scrollTop > max) {
                max = e.scrollTop;
                masterScroller = e;
            }
        });
        // Tatuamos a DIV Mestre para comandá-la no loop
        masterScroller.classList.add('MEU_SCROLLER_SECRETO');
        console.log("Scroller encontrado:", masterScroller.tagName);
    });

    // Rola para despertar elementos pesados usando a div mestra
    console.log(`[SKILL: CRO] Varrendo documento para forçar Lazy Load...`);
    for (let i = 0; i < 15; i++) {
        await nukePopups();
        await page.evaluate(() => {
            const scroller = document.querySelector('.MEU_SCROLLER_SECRETO') || document.documentElement;
            scroller.scrollBy({ top: 900, behavior: 'instant' });
            window.scrollBy({ top: 900, behavior: 'instant' });
        });
        await page.waitForTimeout(150);
    }
    
    // Volta pro topo no scroller verdadeiro
    await page.evaluate(() => {
        const scroller = document.querySelector('.MEU_SCROLLER_SECRETO') || document.documentElement;
        scroller.scrollTop = 0;
        window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);

    // Congele os cabecalhos!
    console.log(`[SKILL: CRO] Ocultando Headers Flutuantes no topo da página...`);
    await page.evaluate(() => {
        document.querySelectorAll('header, .elementor-location-header, [data-elementor-type="header"], .fixed-header, nav').forEach(h => {
             const comp = window.getComputedStyle(h);
             if (comp.position === 'fixed' || comp.position === 'sticky') {
                 h.style.setProperty('position', 'absolute', 'important');
                 h.style.setProperty('top', '0px', 'important');
             }
        });
    });

    // 3. Batida de Fotos Precisas
    console.log(`[SKILL: CRO] Iniciando Motor Canvas V2...`);
    const chunks = [];
    const scrollAmount = 900;
    
    for (let i = 0; i < 9; i++) {
        await nukePopups(); // Assassina o chatbot recarregado a cada frame
        
        const buf = await page.screenshot({ type: 'png' });
        chunks.push(buf.toString('base64'));
        
        // Empurra exatamente +900px direto na veia da DIV que controla o site
        await page.evaluate((H) => {
            const scroller = document.querySelector('.MEU_SCROLLER_SECRETO') || document.documentElement;
            scroller.scrollTop += H;
            // Garantia para window fallback
            if(scroller === document.documentElement) window.scrollBy({ top: H, behavior: 'instant' });
        }, scrollAmount);
        
        await page.waitForTimeout(400);
    }
    
    // 4. Cola tudo perfeitamente via Canvas e exporta
    console.log(`[SKILL: CRO] Costurando mega-matriz de pixels...`);
    const finalDataUrl = await page.evaluate(async (b64Array) => {
        return new Promise((resolve) => {
            const H = 900;
            const canvas = document.createElement('canvas');
            canvas.width = 1440;
            canvas.height = H * b64Array.length;
            const ctx = canvas.getContext('2d');
            
            let loaded = 0;
            for (let i = 0; i < b64Array.length; i++) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, i * H);
                    loaded++;
                    if (loaded === b64Array.length) {
                        resolve(canvas.toDataURL('image/png'));
                    }
                };
                img.src = 'data:image/png;base64,' + b64Array[i];
            }
        });
    }, chunks);
    
    import fs from 'fs';
    const base64Data = finalDataUrl.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(name, Buffer.from(base64Data, 'base64'));

    console.log(`[SKILL: CRO] Panorama perfeito exportado: ${name}`);

  } catch(e) {
    console.log(`[SKILL: CRO] Erro ao capturar ${name}: ${e.message}`);
  } finally {
    await browser.close();
  }
}

const args = process.argv.slice(2);
if (args.length >= 2) capture(args[0], args[1]);
else console.log("Uso: node capture.mjs <URL> <NOME.png>");
