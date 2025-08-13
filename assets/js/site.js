document.addEventListener('click', function(e){
  if(e.target.matches('.toggle-abstract')){
    const id = e.target.dataset.target;
    const el = document.getElementById(id);
    if(!el) return;
    const showing = !el.hasAttribute('hidden');
    if(showing){
      el.setAttribute('hidden','');
      e.target.textContent = 'Abstract';
    } else {
      el.removeAttribute('hidden');
      e.target.textContent = 'Hide';
    }
  }
});
