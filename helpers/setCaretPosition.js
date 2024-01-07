/**
 * @author stackoverflow (Mark Pieszak)
 * @version 1.0 - 03.01.2024
 * 
 * @source1 https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox#answer-12518737 
 * @source2 https://gist.github.com/artemsites/09d2cf0db5decca116dfaaee6774e2c6
 * @param {*} elem 
 * @param {*} caretPos 
 * setCaretPosition(elem, 3);
 */
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