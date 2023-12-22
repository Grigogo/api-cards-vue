<script setup>
import { provide, ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import ApiSteps from './components/ApiSteps.vue';
import ApiMainForm from './components/ApiMainForm.vue';

const stepsData = {
  title: 'Сначала пользователь указывает артикул детали и получает список брендов',
  steps: [
    {
      step: 1,
      text: 'Ввод артикула и выбор языка',
    },
    {
      step: 2,
      text: 'Получение информации о детали',
    },
  ],
};

const activeStep = ref(1);

function incrementStep() {
  activeStep.value += 1;
}

function setStep(step) {
  activeStep.value = step.step;
}

provide('activeStep', {
  activeStep,
  incrementStep,
  setStep,
});

</script>

<template>
  <div class="container">
    <ApiSteps :steps-data="stepsData" :active-step="activeStep" />
    <ApiMainForm :active-step="activeStep" />
  </div>
</template>

<style lang="scss">
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";
</style>
