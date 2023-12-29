import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';
import {formatDate} from './helpers/formatDate';



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



    // get-calendar
    let getCalendars = document.querySelectorAll('.js-get-calendar');
    getCalendars.forEach(getCalendar => {
      getCalendar.addEventListener("click", function(e) {
        getCalendar.nextElementSibling.classList.add('_active');
      });
    }) 



    // calendar
    let elCalendars = document.querySelectorAll('.js-calendar');
    elCalendars.forEach(elCalendar => {
      let input = elCalendar.closest('.form__item-box').querySelector('.form__item-input')
      let curDate = new Date()
      input.value = formatDate({ date: curDate })

      let selDateDefault = formatDate({ date: curDate, sep: '-', order: 'ymd' }) // to '2023-12-29'

      const calendar = new VanillaCalendar(elCalendar, {
        settings: {
          lang: 'ru-RU',

          selected: {
            dates: [selDateDefault],
          },
        },
        actions: {
          clickDay(event, self) {
            // console.log(event);
            // console.log(self);
            let selDateText = formatDate( {date: self.selectedDates[0]} )

            input.value = selDateText;

            // @note календарь и так пока закрывается при нажатии вне .form__item-box
            // self.HTMLElement.classList.remove('_active');
          },
        },
      });
      calendar.init()

    })



    // close calendar
    popup.addEventListener("click",function(e) {
      let isFormItemBox = e.target.closest('.form__item-box')
      // @note но тогда календарь закрывается и при нажатии на дату в календаре
      if (!isFormItemBox) {
        elCalendars.forEach(elCalendar => {
            elCalendar.classList.remove('_active');
        }) 
      }
    });






  } catch (err) {
    console.error('TRY-CATCH ERROR: ', err)
  } finally {}
})