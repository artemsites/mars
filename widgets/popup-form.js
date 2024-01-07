import Datepicker from 'vanillajs-datepicker/Datepicker';
import ru from 'vanillajs-datepicker/locales/ru';
import 'vanillajs-datepicker/css/datepicker.css';

import { formatDate } from "../helpers/formatDate";
import { listenerWheel } from "../helpers/listenerWheel";
import { getDeclOfNum } from "../helpers/getDeclOfNum";
import { setCaretPosition } from "../helpers/setCaretPosition";



document.addEventListener("DOMContentLoaded", function () {
  try {
    let btnOpenPopup = document.querySelector("#js-get-popup");
    let firstOpenPopup = true;
    let btnClosePopup = document.querySelector("#js-close-popup");
    let popup = document.querySelector("#js-popup");
    let popupTitle = popup.querySelector(".js-popup-title");
    
    let form = popup.querySelector(".js-form");
    let dateFrom = form.querySelector(".js-date-from");
    let dateTo = form.querySelector(".js-date-to");
    let formPeopleCount = form.querySelector(".js-form-people-count");

    let peopleCount = Number(formPeopleCount.value.split(" ")[0]);

    btnOpenPopup.addEventListener("click", function (e) {
      popup.classList.add("_active");

      // Загрузка календарей
      if (firstOpenPopup) {

        let curDate = new Date();
        // dateFrom.value = '13.05.2022';
        // dateTo.value = '13.05.2022';
        dateFrom.value = formatDate({ date: curDate });
        dateTo.value = formatDate({ date: curDate });
        
        Object.assign(Datepicker.locales, ru);
        let calOpt = {
          format: 'dd.mm.yyyy',
          language: 'ru',
          autohide: true,
        }

        new Datepicker(dateFrom, calOpt); 
        new Datepicker(dateTo, calOpt); 

        firstOpenPopup = false;
      }
    });

    btnClosePopup.addEventListener("click", function (e) {
      popup.classList.remove("_active");
    });

    // form-people-count
    function increaseDecreaseCountPeopleInForm(delta) {
      if (delta > 0) peopleCount--;
      else if (delta < 0) peopleCount++;

      if (peopleCount <= 0) peopleCount = 1;

      formPeopleCount.value = createStrPeopleCount(peopleCount);
    }

    listenerWheel(formPeopleCount, increaseDecreaseCountPeopleInForm);

    formPeopleCount.addEventListener("keydown", function (e) {
      let testDig = e.key.match(/(\d)/);
      if (testDig) {
        let peopleCount = formPeopleCount.value.split(" ")[0];
        if (peopleCount !== "") {
          formPeopleCount.value = createStrPeopleCount(Number(peopleCount));
          setCaretPosition(formPeopleCount, peopleCount.length);
        }
      } else if (
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Backspace" &&
        e.key !== "Delete"
      ) {
        e.preventDefault();
      }
    });

    function createStrPeopleCount(peopleCount) {
      return (
        peopleCount +
        " " +
        getDeclOfNum(peopleCount, ["человек", "человека", "человек"])
      );
    }

    // form - отправка
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      let formData = new FormData();

      formData.append("dateFrom", dateFrom.value);
      formData.append("dateTo", dateTo.value);
      formData.append("formPeopleCount", formPeopleCount.value);

      let response = await fetch("https://artemsites.ru/mail.php", {
        method: "POST",
        body: formData,
      });
      let res = await response.json();

      if (res.success === 1) {
        popupTitle.classList.add("_hidden");

        let rawMsChangeTitleContent = popupTitle
          .getAttribute("style")
          .split(":")[1]
          .trim();
        const msChangeTitleContent = rawMsChangeTitleContent.slice(
          0,
          rawMsChangeTitleContent.length - 3
        );

        setTimeout(() => {
          popupTitle.textContent = "Спасибо, билеты забронированы!";
          popupTitle.classList.remove("_hidden");
        }, msChangeTitleContent);
      } else {
        console.log(res);
      }
    });



  } catch (err) {
    console.error("popup-form.js ", err);
  } finally {
  }
});