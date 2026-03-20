<script>
const total=13;let cur=1;
function buildDots(){
  const c=document.getElementById('dots');c.innerHTML='';
  for(let i=1;i<=total;i++){
    const d=document.createElement('div');
    d.className='dot'+(i===cur?' active':'');
    d.onclick=()=>go(i);c.appendChild(d);
  }
}
function animateLetters() {
  const letters = 'NETFIX';
  const el = document.getElementById('nf-letters');
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    if (i >= letters.length) {
      clearInterval(iv);
      setTimeout(() => go(3), 800);
      return;
    }
    el.textContent += letters[i];
    i++;
  }, 250);
}
function go(n){
  document.getElementById('s'+cur).classList.remove('active');
  cur=n;
  document.getElementById('s'+cur).classList.add('active');
  document.getElementById('prog').style.width=(cur/total*100)+'%';
  document.getElementById('btn-prev').disabled=cur===1;
  document.getElementById('btn-next').disabled=cur===total;
  buildDots();
  if(n===2 && cur!== 1)setTimeout(()=>go(3),1800);
}
function next(){if(cur<total)go(cur+1);}
function prev(){if(cur>1)go(cur-1);}
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' ')next();
  if(e.key==='ArrowLeft')prev();
});
buildDots();
</script>
