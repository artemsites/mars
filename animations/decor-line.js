import { onEventEndThenStartCallback } from "../helpers/onEventEndThenStartCallback";

document.addEventListener('DOMContentLoaded', function () {
  try {



    let decLine = document.querySelector('.banner__decor-line');

    window.addEventListener("resize",onEventEndThenStartCallback(750, resetAnimation));

    function resetAnimation() {
      decLine.style.animationName = "none";

      requestAnimationFrame(() => {
        setTimeout(() => {
          decLine.style.animationName = ""
        }, 0);
      });
    }



  } catch (err) {
    console.error('TRY-CATCH ERROR: ', err)
  } finally {}
})