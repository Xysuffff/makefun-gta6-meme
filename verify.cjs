const sharp=require('sharp');const fs=require('node:fs');const crypto=require('node:crypto');
(async()=>{
const caption=fs.readFileSync('caption.txt','utf8').trimEnd();
if([...caption].length>280)throw Error('Caption exceeds 280 characters');
const code=JSON.parse(fs.readFileSync('play-code.json','utf8')).code;if(!caption.includes(code))throw Error('Caption omits exact play code');
console.log('Caption characters:',[...caption].length,'; exact play code: present');
for(const [text,size]of [['13 YEARS PLANNING',93],['THE PERFECT HEIST.',93],['MY AI JUST',91],['ENTERED A BOUNTY.',91]]){
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="200"><rect width="2400" height="200" fill="white"/><text x="0" y="150" font-family="Impact, Arial Black, sans-serif" font-size="${size}" letter-spacing=".4">${text}</text></svg>`;
const {data,info}=await sharp(Buffer.from(svg)).removeAlpha().raw().toBuffer({resolveWithObject:true});let max=0;for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){if(data[(y*info.width+x)*info.channels]<180)max=Math.max(max,x);}
if(max>1080)throw Error('Headline text overflows: '+text+' width='+max);console.log('Headline width:',max,text);
}
for(const f of ['gta6-legal-route.png','judge-preview-480.png']){const b=fs.readFileSync(f);const m=await sharp(b).metadata();if(m.hasAlpha)throw Error('Unexpected transparency');console.log(JSON.stringify({file:f,width:m.width,height:m.height,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')}));}
})();
