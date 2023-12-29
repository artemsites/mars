export function listenerWheel(el, callback) { 
  if (el.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      el.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      el.addEventListener("mousewheel", onWheel);
    } else {
      // Firefox < 17
      el.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else { // IE8-
    el.attachEvent("onmousewheel", onWheel);
  }

  function onWheel(e) {
    e = e || window.event;
  
    // wheelDelta не даёт возможность узнать количество пикселей
    var delta = e.deltaY || e.detail || e.wheelDelta;
  
    callback(delta)
  
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  }
}