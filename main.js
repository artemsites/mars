import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';
import { formatDate } from './helpers/formatDate';
import { listenerWheel } from './helpers/listenerWheel';
import { getDeclOfNum } from './helpers/getDeclOfNum';
import { setCaretPosition } from './helpers/setCaretPosition';

import './widgets/menu.js';



document.addEventListener('DOMContentLoaded', function () {
  try {
    
    let btnOpenPopup = document.querySelector('#js-get-popup');
    let firstOpenPopup = true
    let btnClosePopup = document.querySelector('#js-close-popup');
    let popup = document.querySelector('#js-popup');
    let popupTitle = popup.querySelector('.js-popup-title')
    
    let form = popup.querySelector('.js-form');
    let dateFrom = form.querySelector('.js-from-date-from')
    let dateTo = form.querySelector('.js-from-date-to')
    let formPeopleCount = form.querySelector('.js-form-people-count')

    let peopleCount = Number(formPeopleCount.value.split(' ')[0])



    btnOpenPopup.addEventListener("click",function(e){
      popup.classList.add('_active');

      // Загрузка календарей
      if (firstOpenPopup) {
        // get-calendar
        let getCalendars = document.querySelectorAll('.js-get-calendar');
        getCalendars.forEach(getCalendar => {
          getCalendar.addEventListener("click", function(e) {
            getCalendar.nextElementSibling.classList.toggle('_active')
            // getCalendar.querySelector('.js-calendar').classList.add('_active')
          });
        }) 



        // calendar
        let elCalendars = form.querySelectorAll('.js-calendar');
        let calState = {
          start: null,
          end: null,
          // elStart: null,
          // elEnd: null,
          calStart: null,
          calEnd: null
        }

        elCalendars.forEach(elCalendar => {
          const isStartCal = elCalendar.dataset.calendar === 'start'
          const isEndCal = elCalendar.dataset.calendar === 'end'

          let input = elCalendar.closest('.form__item-box').querySelector('.form__item-input')
          let curDate = new Date()
          input.value = formatDate({ date: curDate })

          let selDateDefault = formatDate({ date: curDate, sep: '-', order: 'ymd' }) // to '2023-12-29'
          // console.log('selDateDefault')
          // console.log(selDateDefault)

          calState.start = curDate.getTime()
          calState.end = curDate.getTime()

          let calendar = new VanillaCalendar(elCalendar, {
            settings: {
              lang: 'ru-RU',

              selected: {
                dates: [selDateDefault],
              },
            },
            actions: {
              clickDay(event, self) {
                if (isStartCal) {
                  calState.start = new Date(self.selectedDates[0]).getTime()
                }
                else if (isEndCal) {
                  calState.end = new Date(self.selectedDates[0]).getTime()
                }
                // console.log(event.target);
                // console.log(self);
                
                // При выборе второй даты
                // Если она меньше стартовой
                if (isEndCal && calState.end < calState.start) {
                  // То ничего не делаем
                } 
                else {
                  // Иначе устанавливаем эту дату
                  let selDateText = formatDate( {date: self.selectedDates[0]} )
                  input.value = selDateText;
                  self.HTMLOriginalElement.classList.remove('_active');

                  if (isStartCal && calState.start > calState.end) {
                    // Установить в второй календарь выбор даты первого календаря
                    // calState.calEnd
                  }
                }
              },
            },
          });
          calendar.init()

          if (isStartCal) calState.calStart = calendar
          else if (isEndCal) calState.calEnd = calendar
        })

        // close calendar
        popup.addEventListener("click",function(e) {
          let isFormItemBox = e.target.closest('.form__item-box')
          if (!isFormItemBox) {
            elCalendars.forEach(elCalendar => {
                elCalendar.classList.remove('_active');
            }) 
          }
        });

        firstOpenPopup = false
      }
    });



    btnClosePopup.addEventListener("click",function(e){
      popup.classList.remove('_active');
    });



    // form-people-count
    function increaseDecreaseCountPeopleInForm(delta) {
      if (delta>0) peopleCount--
      else if (delta<0) peopleCount++

      if (peopleCount<=0) peopleCount = 1

      formPeopleCount.value = createStrPeopleCount(peopleCount)
    }

    listenerWheel(formPeopleCount, increaseDecreaseCountPeopleInForm)

    formPeopleCount.addEventListener("keydown", function(e) { 
      let testDig = e.key.match(/(\d)/)
      if (testDig) {
        let peopleCount = formPeopleCount.value.split(' ')[0]
        if (peopleCount!=='') {
          formPeopleCount.value = createStrPeopleCount(Number(peopleCount))
          setCaretPosition(formPeopleCount, peopleCount.length)
        }
      }
      else if (e.key!=='ArrowLeft'&&e.key!=='ArrowRight'&&e.key!=='Backspace'&&e.key!=='Delete') {
        e.preventDefault()
      }
    });

    function createStrPeopleCount(peopleCount) {
      return peopleCount + ' ' + getDeclOfNum(peopleCount, ['человек', 'человека', 'человек'])
    }
    


    // form - отправка
    form.addEventListener("submit", async function(e) {
      e.preventDefault();

      let formData = new FormData();

      formData.append('dateFrom', dateFrom.value)
      formData.append('dateTo', dateTo.value)
      formData.append('formPeopleCount', formPeopleCount.value)

      let response = await fetch('https://artemsites.ru/mail.php', {
        method: "POST",
        body: formData,
      });
      let res = await response.json();
      
      
      if (res.success === 1) {
        popupTitle.classList.add('_hidden')

        let rawMsChangeTitleContent = ((popupTitle.getAttribute('style').split(':')[1]).trim())
        const msChangeTitleContent = rawMsChangeTitleContent.slice(0, rawMsChangeTitleContent.length-3)

        setTimeout(()=>{
          popupTitle.textContent = "Спасибо, билеты забронированы!"
          popupTitle.classList.remove('_hidden')
        }, msChangeTitleContent)
      }
      else {
        console.log(res)
      }

    });




    // Изменения позиции космоса от мыши
    let elSpace = document.querySelector('.js-background-space');
    let viewportWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;

    let fromRight = false
    document.addEventListener("mousemove",function(e) {
      // center -> left
      if (e.x >= 0 && e.x < (viewportWidth/3)) {
        elSpace.classList.add('_left');
        elSpace.classList.remove('_right');
        elSpace.classList.remove('_center');
        elSpace.classList.remove('_from-right');
        fromRight = false
      }
      // center -> rigth
      else if (e.x <= viewportWidth && e.x > (viewportWidth/3*2)) {
        elSpace.classList.add('_right');
        elSpace.classList.remove('_left');
        elSpace.classList.remove('_center');
        elSpace.classList.remove('_from-right');
        fromRight = true
      }
      // right -> center
      else if (fromRight /* && e.x > (viewportWidth/3) && e.x < (viewportWidth/3*2) */) {
        elSpace.classList.add('_from-right');
        elSpace.classList.remove('_left');
        elSpace.classList.remove('_right');
        elSpace.classList.remove('_center');
      }
      // left -> center
      else {
        elSpace.classList.add('_center');
        elSpace.classList.remove('_left');
        elSpace.classList.remove('_right');
        elSpace.classList.remove('_from-right');
        fromRight = false
      }
    });




  } catch (err) {
    console.error('TRY-CATCH ERROR: ', err)
  } finally {}
})