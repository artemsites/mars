document.addEventListener('DOMContentLoaded', function () {
  try {



    let btnOpenPopup = document.querySelector('#js-get-popup');
    let btnClosePopup = document.querySelector('#js-close-popup');
    let popup = document.querySelector('#js-popup');

    btnOpenPopup.addEventListener("click",function(e){
      popup.classList.add('_active');
    });
    
    btnClosePopup.addEventListener("click",function(e){
      popup.classList.remove('_active');
    });



  } catch (err) {
    console.error('TRY-CATCH ERROR: ', err)
  } finally {}
})