(function () {
  let navItems = document.querySelectorAll('.js-link');
  
  function initSmoothScrolling() {
    navItems.forEach(trigger => {
      trigger.onclick = function(e) {
        e.preventDefault();
        
        let hash = this.getAttribute('href');
        let target = document.querySelector(hash);
        let headerOffset = 0;
        if(window.matchMedia('(max-width: 992px)').matches) {
          headerOffset = 75;
        } else {
          headerOffset = 150;
        }
        let elementPosition = target.offsetTop;
        let offsetPosition = elementPosition - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
      });
      }
    });
  }
  
  initSmoothScrolling();
})();