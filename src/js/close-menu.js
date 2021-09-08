(function () {
  let navItems = document.querySelectorAll('.js-link');
  let menu = document.querySelector('.navbar-collapse');
  let toggle = document.querySelector('.navbar-toggler');

  function closeMenu() {
    for(let i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('click', () => {
        if(window.matchMedia('(max-width: 992px)').matches) {
          menu.classList.remove ("show");
          toggle.ariaExpanded = false;
        }
      });
    }
  }
  
  closeMenu();
})();