import { defineStore } from 'pinia';

export const useModalStore = defineStore('modals', () => {
  const showModal = ref<boolean>(false);

  const openModal = () => {
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
  };

  return {
    showModal,
    openModal,
    closeModal,
  };
});
