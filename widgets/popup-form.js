import { createApp, ref, watch, onMounted } from "vue";
import { store } from "../store/store";

import { DateRangePicker, Datepicker } from "vanillajs-datepicker";
import ru from "vanillajs-datepicker/locales/ru";
import "vanillajs-datepicker/css/datepicker.css";

import { formatDate } from "../helpers/formatDate";
import { listenerWheel } from "../helpers/listenerWheel";
import { getDeclOfNum } from "../helpers/getDeclOfNum";
import { setCaretPosition } from "../helpers/setCaretPosition";



let popup = document.querySelector("#js-popup") || false;
if (popup) {
  createApp({
    components: {},

    setup() {
      let elPopupTitle = ref(null);
      let elDateFrom = ref(null);
      let elDateTo = ref(null);
      let elDatepicker = ref(null);
      let elFormPeopleCount = ref(null);
      let peopleCount = ref(1);

      let firstOpenPopup = true;
      let placeholders = ref({
        from: null,
        to: null,
      });

      onMounted(() => {});

      watch(store, () => {
        if (firstOpenPopup && store.isPopupOpened) {
          // Колесо мыши включаем прослушиватель при первом открытии
          peopleCount.value = Number(elFormPeopleCount.value.value.split(" ")[0]);
          listenerWheel(elFormPeopleCount.value, increaseDecreaseCountPeopleInForm);

          let curDate = new Date();
          placeholders.value.from = formatDate({ date: curDate });
          placeholders.value.to = formatDate({ date: curDate });

          Object.assign(Datepicker.locales, ru);

          let calOpt = {
            format: "dd.mm.yyyy",
            language: "ru",
            autohide: true,
          };

          new DateRangePicker(elDatepicker.value, calOpt);

          firstOpenPopup = false;
        }
      });

      function closePopup() {
        store.isPopupOpened = false;
      }

      function increaseDecreaseCountPeopleInForm(delta) {
        if (delta > 0) peopleCount.value--;
        else if (delta < 0) peopleCount.value++;
  
        if (peopleCount.value <= 0) peopleCount.value = 1;
  
        elFormPeopleCount.value.value = createStrPeopleCount(peopleCount.value);
      }

      function createStrPeopleCount(peopleCount) {
        return (
          peopleCount +
          " " +
          getDeclOfNum(peopleCount, ["человек", "человека", "человек"])
        );
      }
      
      function changeNumber(e) {
        let testDig = e.key.match(/(\d)/);
        if (testDig) {
          let peopleCount = elFormPeopleCount.value.value.split(" ")[0];
          if (peopleCount !== "") {
            elFormPeopleCount.value.value = createStrPeopleCount(Number(peopleCount));
            setCaretPosition(elFormPeopleCount.value, peopleCount.length);
          }
        } else if (
          e.key !== "ArrowLeft" &&
          e.key !== "ArrowRight" &&
          e.key !== "Backspace" &&
          e.key !== "Delete"
        ) {
          e.preventDefault();
        }
      }

      async function submit(e) {
        e.preventDefault();
  
        let formData = new FormData();
  
        if (elDateFrom.value.value==='') {
          elDateFrom.value.value = elDateFrom.value.placeholder
        }
        if (elDateTo.value.value==='') {
          elDateTo.value.value = elDateTo.value.placeholder
        }
  
        formData.append("elDateFrom", elDateFrom.value.value);
        formData.append("elDateTo", elDateTo.value.value);
        formData.append("elFormPeopleCount", elFormPeopleCount.value.value);

        let response = await fetch("https://artemsites.ru/mail.php", {
          method: "POST",
          body: formData,
        });

        let res = await response.json();
  
        if (res.success === 1) {
          elPopupTitle.value.classList.add("_hidden");
  
          let rawMsChangeTitleContent = elPopupTitle.value
            .getAttribute("style")
            .split(":")[1]
            .trim();
          const msChangeTitleContent = rawMsChangeTitleContent.slice(
            0,
            rawMsChangeTitleContent.length - 3
          );
  
          setTimeout(() => {
            elPopupTitle.value.textContent = "Спасибо, билеты забронированы!";
            elPopupTitle.value.classList.remove("_hidden");
          }, msChangeTitleContent);
        } else {
          console.log(res);
        }
      }

      return {
        store,
        closePopup,
        placeholders,
        elDatepicker,
        elFormPeopleCount,
        changeNumber,
        submit,
        elDateFrom,
        elDateTo,
        elPopupTitle,
      };
    },

  }).mount(popup);
}
