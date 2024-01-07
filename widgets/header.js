import { createApp } from "vue";
import { store } from "../store/store";

let header = document.querySelector("#js-header") || false;
if (header) {
  createApp({
    components: {},

    setup() {
      function openPopup() {
        store.isPopupOpened = true;
      }
      function toggleMenu() {
        store.isMenuOpened = !store.isMenuOpened;
      }
      return {
        toggleMenu,
        openPopup,
        store,
      };
    },
  }).mount(header);
}
