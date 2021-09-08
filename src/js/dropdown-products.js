(function () {
  let listItems = document.querySelectorAll('.js-products-list-item');
  let sublists = document.querySelectorAll('.js-products-sublist');
  let labels = document.querySelectorAll('.products-list-label');
 
  function toggleNavigation(index) {
    if (window.matchMedia('(max-width: 992px)').matches) {
      sublists[index].classList.toggle('js-products-sublist--hidden');
      labels[index].classList.toggle('products-list-label--rotate');
    } else {
      return;
    }
  }
 
  function addEventListenerToToggle(listItem, index) {
      listItem.addEventListener('click', () => {
      toggleNavigation(index);
    });
  }
 
  function hideAllSublists() {
    for (let i = 0; i < sublists.length; i++ ) {
      sublists[i].classList.add('js-products-sublist--hidden');
      labels[i].classList.add('products-list-label--rotate');
    }
  }
  
  function initDropdown() {
    for (let i = 0; i < listItems.length; i++ ) {
      hideAllSublists();
      addEventListenerToToggle(listItems[i], i);
    }
  }

  initDropdown();
})();