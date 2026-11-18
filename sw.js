const C="laxmi-pg-v1",F=["./","index.html","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
const A=F.filter(f=>f!=="./");
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin)return;
  if(/(^|\/)(\.|wp-|_vti|backup|database)|(\.sql|\.env|\.tar\.gz|\.bak|\.old|\.log)$/i.test(u.pathname)){e.respondWith(new Response("Not found",{status:404,headers:{"Content-Type":"text/plain"}}));return}
  if(u.pathname.endsWith("/favicon.ico")){e.respondWith(caches.match(new URL("icon-192.png",self.location).href).then(r=>r||fetch(e.request)));return}
  if(e.request.mode!=="navigate"&&!A.some(f=>u.pathname.endsWith(f)))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==="navigate"?caches.match("index.html"):Response.error()))));
});
