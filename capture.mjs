import { chromium } from 'playwright';

async function capture(url, name) {
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext({ 
      viewport: { width: 1440, height: 900 },
      ignoreHTTPSErrors: true
  });
  const page = await context.newPage();
  
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    console.log(`Página carregada: ${url}`);

    // Inject anti-animation ONLY
    await page.evaluate(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
            [data-aos], .elementor-invisible, .fade-in, .lazy {
                opacity: 1 !important;
                transform: none !important;
                visibility: visible !important;
            }
        `;
        document.head.appendChild(style);
    });
    
    // Smooth scroll down to bottom to trigger everything normally WITHOUT breaking 100vh
    let prevHeight = 0;
    while(true) {
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
    
    // Wait for all network images to settle
    await page.waitForTimeout(4000);
    
    // Converter elementos fixed e sticky para absolute para impedir repetição na costura do Playwright
    await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
                el.style.setProperty('position', 'absolute', 'important');
            }
        });
        window.scrollTo(0, 0); // Volta pro topo antes da foto
    });
    
    // Playwright native fullPage stitching
    await page.screenshot({ path: name, fullPage: true });
    console.log(`Captured ${name} successfully.`);
  } catch(e) {
    console.log(`Failed to capture ${name}: ${e.message}`);
  } finally {
    await browser.close();
  }
}

(async () => {
   console.log('Iniciando captura apenas da CredPago (Layout Fix)...');
   await capture('https://credpago.com.br/', 'credpago_screenshot.png');
   console.log('Finalizado!');
})();
