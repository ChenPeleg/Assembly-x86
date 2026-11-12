const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for (const [n,o] of [['phone',devices['Pixel 5']],['desktop',{viewport:{width:1280,height:500},deviceScaleFactor:1}]]){
const p=await b.newPage(o);await p.goto('http://localhost:4200/#/docs/01%20basics%2B02%20hello%20world');
await p.getByRole('button',{name:'Try me'}).click();await p.waitForTimeout(1500);
const btn=p.locator('button[title="Close assembler"]');await btn.scrollIntoViewIfNeeded();
const bb=await btn.boundingBox();
await p.screenshot({path:__dirname+`/applied-${n}.png`,clip:n=='phone'?{x:0,y:Math.max(0,bb.y-90),width:o.viewport.width,height:230}:{x:0,y:0,width:1280,height:260}});}
await b.close()})();
