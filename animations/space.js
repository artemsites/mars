import { onEventEndThenStartCallback } from "../helpers/onEventEndThenStartCallback";

try {
  let elSpace = null;

  document.addEventListener("DOMContentLoaded", function () {
    elSpace = document.querySelector(".js-background-space");
    initSpaceMouseAnimation();
  });

  window.addEventListener("resize", onEventEndThenStartCallback(250, initSpaceMouseAnimation));

    function initSpaceMouseAnimation() {
      document.removeEventListener("mousemove", animationLogicClasses, false);
      document.addEventListener("mousemove", animationLogicClasses);
    }
    
    let fromRight = false;
    function animationLogicClasses(e) {
      // Изменения позиции космоса от мыши
      let viewportWidth =
      document.body.clientWidth ||
      window.innerWidth ||
      document.documentElement.clientWidth;

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
  }

} catch (err) {
  console.error("space.js: ", err);
} finally {
}
