(function(){
  var m=location.pathname.match(/posts\/(\d+)\.html/);
  if(!m)return;
  var curId=parseInt(m[1]);
  fetch("../posts.json?"+Date.now()).then(function(r){return r.json()}).then(function(posts){
    var cur=posts.find(function(p){return p.id===curId});
    if(!cur)return;
    var curTags=cur.tags||[];
    var scored=posts.filter(function(p){return p.id!==curId}).map(function(p){
      var s=0;(p.tags||[]).forEach(function(t){if(curTags.indexOf(t)>-1)s+=2;});return{p:p,s:s};
    }).sort(function(a,b){return b.s-a.s||new Date(b.p.date)-new Date(a.p.date)}).slice(0,3);
    if(!scored.length)return;
    var h='<div style="background:#fff;border-radius:12px;padding:28px;box-shadow:0 2px 12px rgba(0,0,0,0.08)"><h3 style="font-size:18px;color:#0a1d3f;margin-bottom:16px">📖 관련 글 더보기</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">';
    scored.forEach(function(item){
      var p=item.p;
      h+='<a href="'+p.id+'.html" style="display:block;padding:16px;background:#f0f4f8;border-radius:10px;text-decoration:none;color:inherit;border:2px solid transparent;transition:all 0.2s" onmouseover="this.style.borderColor=\'#0066cc\'" onmouseout="this.style.borderColor=\'transparent\'">';
      h+='<div style="font-size:13px;color:#0066cc;margin-bottom:4px">#'+(p.tags[0]||"")+'</div>';
      h+='<div style="font-size:15px;font-weight:700;color:#0a1d3f;line-height:1.4">'+p.title+'</div>';
      h+='</a>';
    });
    h+='</div></div>';
    var el=document.getElementById("relatedPosts");
    if(el)el.innerHTML=h;
  }).catch(function(){});
})();