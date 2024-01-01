document.addEventListener('DOMContentLoaded', function () {
  try {



    let menu = document.querySelector('.js-menu');
    let toggleMenu = document.querySelector('.js-toggle-menu');

    toggleMenu.addEventListener("click",function(e){
      toggleMenu.classList.toggle('_opened');
      menu.classList.toggle('_opened');
    });



  } catch (err) {
    console.error('TRY-CATCH ERROR: ', err)
  } finally {}
})