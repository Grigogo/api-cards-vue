<script setup>
import { provide, ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import ApiSteps from './ApiSteps.vue';
import ApiMainForm from './ApiMainForm.vue';
import ApiCardHeader from './ApiCardHeader.vue';

const headerData = {
  title: 'Получение брендов по артикулу',
  description: 'Как принято считать, элементы политического процесса, инициированные исключительно синтетически, своевременно верифицированы. Есть над чем.',
}

const stepsData = {
  title: 'Сначала пользователь указывает артикул детали и получает список брендов',
  steps: [
    {
      step: 1,
      text: 'Ввод артикула и выбор языка',
    },
    {
      step: 2,
      text: 'Получение списка брендов',
    },
  ],
};
/* const data = JSON.parse(document.getElementById('app').getAttribute('data-my-data'));

const dataSteps = data.ITEMS.map((item, index) => ({
  step: index + 1,
  text: item.NAME,
}));

const stepsData = {
  title: data.SECTION.PATH.pop().DESCRIPTION,
  steps: dataSteps,
}; */

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
  <div>
    <ApiCardHeader :header-data="headerData"/>
    <ApiSteps :steps-data="stepsData" :active-step="activeStep" />
    <ApiMainForm :active-step="activeStep" />
  </div>
</template>

<style lang="scss">
</style>
