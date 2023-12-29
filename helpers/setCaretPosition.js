export function setCaretPosition(elem, caretPos) {
  elem.value = elem.value;
  // ^ this is used to not only get "focus", but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)

  if (elem !== null) {
      if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.move('character', caretPos);
          range.select();
          return true;
      }

      else {
          // (elem.selectionStart === 0 added for Firefox bug)
          if (elem.selectionStart || elem.selectionStart === 0) {
              elem.focus();
              elem.setSelectionRange(caretPos, caretPos);
              return true;
          }

          else  { // fail city, fortunately this never happens (as far as I've tested) :)
              elem.focus();
              return false;
          }
      }
  }
}