/**
 * @author Artem Kuznecov - artemsites.ru
 * @version 1.0 - 03.01.2024
 * 
 * @source https://gist.github.com/artemsites/204dfa300c0607fcc6422c3e466dc8ca
 * @param {*} el 
 * @param {*} callback 
 * listenerWheel(elem, functionCallback);
 */
export function listenerWheel(el, callback) { 
  if (el.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      el.addEventListener("wheel", onWheel, {passive: true});
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      el.addEventListener("mousewheel", onWheel, {passive: true});
    } else {
      // Firefox < 17
      el.addEventListener("MozMousePixelScroll", onWheel, {passive: true});
    }
  } else { // IE8-
    el.attachEvent("onmousewheel", onWheel, {passive: true});
  }

  function onWheel(e) {
    e = e || window.event;
  
    // wheelDelta не даёт возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;
  
    callback(delta)
  
    // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  }
}