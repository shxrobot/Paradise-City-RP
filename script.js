// PRELOADER
window.addEventListener('load',()=>{
 setTimeout(()=>{document.getElementById('preloader').style.opacity='0';setTimeout(()=>document.getElementById('preloader').remove(),800)},600);
});

// SCROLL PROGRESS + NAVBAR + BACK TO TOP
const progress=document.getElementById('scroll-progress');
const navbar=document.getElementById('navbar');
const backBtn=document.getElementById('backToTop');
window.addEventListener('scroll',()=>{
 const scrolled=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;
 progress.style.width=scrolled+'%';
 if(window.scrollY>50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
 if(window.scrollY>500) backBtn.classList.add('show'); else backBtn.classList.remove('show');
});
backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// MOBILE MENU
const toggle=document.getElementById('mobileToggle');
const navLinks=document.getElementById('navLinks');
toggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

// REVEAL ON SCROLL
const observer=new IntersectionObserver((entries)=>{
 entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('active')});
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// REGOLAMENTI TABS
document.querySelectorAll('.reg-tab').forEach(btn=>{
 btn.addEventListener('click',()=>{
  document.querySelectorAll('.reg-tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.reg-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('reg-'+btn.dataset.tab).classList.add('active');
 });
});

// ACCORDION
document.querySelectorAll('.acc-header').forEach(h=>{
 h.addEventListener('click',()=>{
  const item=h.parentElement;
  item.classList.toggle('open');
 });
});
// FAQ
document.querySelectorAll('.faq-q').forEach(q=>{
 q.addEventListener('click',()=>{
  const item=q.parentElement;
  item.classList.toggle('open');
  q.querySelector('span').textContent=item.classList.contains('open')?'−':'+';
 });
});

// SEARCH REGOLAMENTI
const search=document.getElementById('regSearch');
search.addEventListener('input',(e)=>{
 const term=e.target.value.toLowerCase();
 document.querySelectorAll('.acc-item').forEach(item=>{
  const text=item.textContent.toLowerCase();
  item.style.display=text.includes(term)?'block':'none';
  if(term.length>2 && text.includes(term)) item.classList.add('open');
 });
});

// PARTICLES CANVAS
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let w,h,particles=[];
function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight}
window.addEventListener('resize',resize); resize();
for(let i=0;i<60;i++) particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+0.5,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5,alpha:Math.random()*0.5});
function animateParticles(){
 ctx.clearRect(0,0,w,h);
 particles.forEach(p=>{
  p.x+=p.dx; p.y+=p.dy;
  if(p.x<0||p.x>w) p.dx*=-1;
  if(p.y<0||p.y>h) p.dy*=-1;
  ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
  ctx.fillStyle=`rgba(255,42,109,${p.alpha})`; ctx.fill();
 });
 requestAnimationFrame(animateParticles);
}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) animateParticles();

// MOUSE GLOW
const glow=document.getElementById('mouse-glow');
window.addEventListener('mousemove',(e)=>{
 glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
});

// TILT EFFECT
document.querySelectorAll('.tilt').forEach(card=>{
 card.addEventListener('mousemove',(e)=>{
  const rect=card.getBoundingClientRect();
  const x=e.clientX-rect.left-rect.width/2;
  const y=e.clientY-rect.top-rect.height/2;
  card.style.transform=`perspective(1000px) rotateY(${x/15}deg) rotateX(${-y/15}deg) translateY(-5px)`;
 });
 card.addEventListener('mouseleave',()=>{card.style.transform='perspective(1000px) rotateY(0) rotateX(0) translateY(0)'});
});