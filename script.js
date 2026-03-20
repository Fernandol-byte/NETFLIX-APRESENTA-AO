const total=14;let cur=1;

function animateLetters(){
  const letters='NETFIX';
  const el=document.getElementById('nf-letters');
  el.textContent='';
  let i=0;
  const iv=setInterval(()=>{
    if(i>=letters.length){
      clearInterval(iv);
      setTimeout(()=>go(3),1000);
      return;
    }
    el.textContent+=letters[i];
    i++;
  },300);
}

function buildDots(){
  const c=document.getElementById('dots');c.innerHTML='';
  for(let i=1;i<=total;i++){
    const d=document.createElement('div');
    d.className='dot'+(i===cur?' active':'');
    d.onclick=()=>go(i);c.appendChild(d);
  }
}

function go(n){
  document.getElementById('s'+cur).classList.remove('active');
  cur=n;
  document.getElementById('s'+cur).classList.add('active');
  document.getElementById('prog').style.width=(cur/total*100)+'%';
  document.getElementById('btn-prev').disabled=cur===1;
  document.getElementById('btn-next').disabled=cur===total;
  buildDots();
  if(n===2)animateLetters();
}

function next(){if(cur<total)go(cur+1);}
function prev(){if(cur>1)go(cur-1);}

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key===' ')next();
  if(e.key==='ArrowLeft')prev();
});
function openAddProfile(){
  document.getElementById('add-modal').style.display='flex';
}

function closeModal(){
  document.getElementById('add-modal').style.display='none';
}

function addProfile(){
  const name = document.getElementById('new-name').value.trim();
  const file = document.getElementById('new-photo').files[0];
  if(!name) return alert('Coloca um nome!');
  
  const reader = new FileReader();
  reader.onload = function(e){
    const grid = document.getElementById('profiles-grid');
    const addBtn = grid.lastElementChild;
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.onclick = () => go(2);
    card.innerHTML = `<div class="avatar" style="background:#555;overflow:hidden;padding:0"><img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;display:block"></div><span class="profile-name">${name.toUpperCase()}</span>`;
    grid.insertBefore(card, addBtn);
    closeModal();
  };
  
  if(file) reader.readAsDataURL(file);
  else {
    const grid = document.getElementById('profiles-grid');
    const addBtn = grid.lastElementChild;
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.onclick = () => go(2);
    card.innerHTML = `<div class="avatar" style="background:#E50914;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700">${name[0].toUpperCase()}</div><span class="profile-name">${name.toUpperCase()}</span>`;
    grid.insertBefore(card, addBtn);
    closeModal();
  }
}

buildDots();
