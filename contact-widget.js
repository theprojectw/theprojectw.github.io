(() => {
  const widget = document.querySelector('.float-contact');
  if (!widget) return;
  const trigger = widget.querySelector('.float-trigger');
  const close = widget.querySelector('.float-close');
  const form = widget.querySelector('form');
  const setOpen = (open) => {
    widget.classList.toggle('open', open);
    trigger?.setAttribute('aria-expanded', String(open));
  };
  trigger?.addEventListener('click', () => setOpen(!widget.classList.contains('open')));
  close?.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || 'Website visitor').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    const subject = encodeURIComponent(`ProjectW website message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:wetheprojectw@gmail.com?subject=${subject}&body=${body}`;
  });
})();
