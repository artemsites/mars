document.addEventListener('DOMContentLoaded', function () {
  try {



        // Изменения позиции космоса от мыши
        let elSpace = document.querySelector(".js-background-space");
        let viewportWidth =
          document.body.clientWidth ||
          window.innerWidth ||
          document.documentElement.clientWidth;
    
        let fromRight = false;
        document.addEventListener("mousemove", function (e) {
          // center -> left
          if (e.x >= 0 && e.x < viewportWidth / 3) {
            elSpace.classList.add("_left");
            elSpace.classList.remove("_right");
            elSpace.classList.remove("_center");
            elSpace.classList.remove("_from-right");
            fromRight = false;
          }
          // center -> rigth
          else if (e.x <= viewportWidth && e.x > (viewportWidth / 3) * 2) {
            elSpace.classList.add("_right");
            elSpace.classList.remove("_left");
            elSpace.classList.remove("_center");
            elSpace.classList.remove("_from-right");
            fromRight = true;
          }
          // right -> center
          else if (
            fromRight /* && e.x > (viewportWidth/3) && e.x < (viewportWidth/3*2) */
          ) {
            elSpace.classList.add("_from-right");
            elSpace.classList.remove("_left");
            elSpace.classList.remove("_right");
            elSpace.classList.remove("_center");
          }
          // left -> center
          else {
            elSpace.classList.add("_center");
            elSpace.classList.remove("_left");
            elSpace.classList.remove("_right");
            elSpace.classList.remove("_from-right");
            fromRight = false;
          }
        });



  } catch (err) {
    console.error('space.js: ', err)
  } finally {}
})