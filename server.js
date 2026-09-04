const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database(path.join(__dirname,'data','mbc80.db'));
db.pragma('journal_mode = WAL');
db.exec(fs.readFileSync(path.join(__dirname,'schema.sql'),'utf8'));
app.use(express.json({limit:'1mb'}));
app.use(express.static(path.join(__dirname,'public')));

const tables = {members:'execom_members',activities:'activities',sessions:'sessions',updates:'updates'};
app.get('/api/config',(req,res)=>res.json({adminEmail:process.env.ADMIN_EMAIL||'abinthomasmathew21@gmail.com',videoUrl:process.env.BACKGROUND_VIDEO_URL||''}));
app.get('/api/portal',(req,res)=>res.json({
 members:db.prepare('SELECT * FROM execom_members ORDER BY sort_order, id').all(),
 activities:db.prepare('SELECT * FROM activities ORDER BY event_date DESC, id DESC').all(),
 sessions:db.prepare('SELECT * FROM sessions ORDER BY session_date, start_time').all(),
 updates:db.prepare('SELECT * FROM updates ORDER BY published_at DESC, id DESC').all()
}));

// Simple admin gate for the starter portal. For production, replace with institutional SSO/OAuth.
app.post('/api/admin/login',(req,res)=>{
 const {email,password}=req.body||{};
 const ok=email===(process.env.ADMIN_EMAIL||'abinthomasmathew21@gmail.com') && password===(process.env.ADMIN_PASSWORD||'change-this-password');
 if(!ok) return res.status(401).json({error:'Invalid admin credentials'});
 res.json({ok:true,token:'local-admin'});
});
function admin(req,res,next){if(req.headers.authorization==='Bearer local-admin') return next(); res.status(401).json({error:'Admin authentication required'});}
app.post('/api/:resource',admin,(req,res)=>{
 const table=tables[req.params.resource]; if(!table) return res.status(404).end();
 const allowed={members:['name','position','department','year','email','phone','photo_url','bio','sort_order'],activities:['title','description','event_date','category','image_url'],sessions:['title','description','session_date','start_time','end_time','venue','speaker'],updates:['title','content']}[req.params.resource];
 const data=Object.fromEntries(allowed.filter(k=>k in req.body).map(k=>[k,req.body[k]]));
 if(!Object.keys(data).length) return res.status(400).json({error:'No fields provided'});
 const cols=Object.keys(data), vals=cols.map(c=>data[c]);
 const result=db.prepare(`INSERT INTO ${table} (${cols.join(',')}) VALUES (${cols.map(()=>'?').join(',')})`).run(...vals);
 res.json({id:result.lastInsertRowid});
});
app.delete('/api/:resource/:id',admin,(req,res)=>{const table=tables[req.params.resource]; if(!table)return res.status(404).end(); db.prepare(`DELETE FROM ${table} WHERE id=?`).run(req.params.id); res.json({ok:true});});
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,()=>console.log(`MBC : 80 Portal running on http://localhost:${PORT}`));
