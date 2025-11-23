
    // --- Datos personalizados ---
    const invite = {
      name: 'Ailyn',
      age: '7',
      date: 'Sábado 6 de Diciembre',
      time: '5:00 PM',
      place: 'calle 7 mz E lte.'
    };

    // poblar campos visibles
    document.getElementById('nameText').textContent = invite.name;
    document.getElementById('ageText').textContent = invite.age + ' años';
    document.getElementById('dateText').textContent = invite.date;
    document.getElementById('timeText').textContent = invite.time;
    document.getElementById('placeText').textContent = invite.place;
    const headlineEl = document.querySelector('.headline');
    if(headlineEl) headlineEl.textContent = 'Pastel, juegos y capibaras';

    // Intro behavior
    const intro = document.getElementById('intro');
    const enterBtn = document.getElementById('enterBtn');
    const mainContent = document.getElementById('mainContent');

    function showMain(){
      intro.classList.add('hidden');
      // after transition, hide for accessibility
      setTimeout(()=>{intro.style.display='none'; mainContent.setAttribute('aria-hidden','false')},700);
      runConfetti();
    }

    enterBtn.addEventListener('click', showMain);

    // allow clicking the image to enter
    document.getElementById('introImg').addEventListener('click', showMain);

    // botones
    const openRsvp = document.getElementById('openRsvp');
    const rsvpForm = document.getElementById('rsvpForm');
    const formInner = document.getElementById('formInner');
    const thanksBox = document.getElementById('thanksBox');

    openRsvp.addEventListener('click', ()=>{
      rsvpForm.scrollIntoView({behavior:'smooth', block:'center'});
      // pequeño efecto confetti
      runConfetti();
    });

    document.getElementById('mapBtn').addEventListener('click', ()=>{
      const q = encodeURIComponent(invite.place + ', ' + invite.date);
      window.open('https://www.google.com/maps/search/?api=1&query='+q,'_blank');
    });

    // RSVP handling (localStorage)
    function saveRSVP(data){
      try{
        const list = JSON.parse(localStorage.getItem('rsvps') || '[]');
        list.push(Object.assign({ts:new Date().toISOString()}, data));
        localStorage.setItem('rsvps', JSON.stringify(list));
      }catch(e){console.error(e)}
    }

    document.getElementById('send').addEventListener('click', ()=>{
      const rname = document.getElementById('rname').value.trim();
      const remail = document.getElementById('remail').value.trim();
      const rattend = document.getElementById('rattend').value;
      const rnote = document.getElementById('rnote').value.trim();
      if(!rname){alert('Por favor escribe tu nombre'); return}
      saveRSVP({name:rname,email:remail,attend:rattend,note:rnote});
      formInner.style.display='none';
      thanksBox.style.display='block';
      runConfetti();
    });

    document.getElementById('clear').addEventListener('click', ()=>{
      document.getElementById('rname').value='';
      document.getElementById('remail').value='';
      document.getElementById('rnote').value='';
      document.getElementById('rattend').value='yes';
    });

    // simple confetti (canvas) — lightweight particles
    function runConfetti(){
      const canvas = document.getElementById('confetti');
      if(!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      const pieces = [];
      for(let i=0;i<80;i++){pieces.push({x:Math.random()*w,y:Math.random()*-h,size:6+Math.random()*10,vy:2+Math.random()*6,angle:Math.random()*360,va:Math.random()*6,color:['#ffd6e0','#fff2a6','#c7f3f0','#ffdca8'][Math.floor(Math.random()*4)]})}
      let t=0; function frame(){ctx.clearRect(0,0,w,h); for(const p of pieces){p.y += p.vy; p.angle += p.va; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle*Math.PI/180); ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size); ctx.restore()} t++; if(t<120) requestAnimationFrame(frame); else ctx.clearRect(0,0,w,h);
      }
      frame();
    }

    // accessibility small tweak
    document.querySelectorAll('button').forEach(b=>b.addEventListener('keydown',e=>{if(e.key==='Enter')b.click()}));

