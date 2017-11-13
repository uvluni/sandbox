window.onload = function() {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const main = document.getElementById('main');
  const sideNav = document.getElementById('side-nav');

  open.onclick = () => openNav();
  close.onclick = () => closeNav();

  function closeNav() {
    sideNav.style.width = '0';
    main.style.marginLeft = '0';
  }

  function openNav() {
    sideNav.style.width = '250px';
    main.style.marginLeft = '250px';
  }
};
