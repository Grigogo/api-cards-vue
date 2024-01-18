<script setup>
import { provide, ref } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import ApiSteps from './ApiSteps.vue';
import ApiMainForm from './ApiMainForm.vue';
import ApiCardHeader from './ApiCardHeader.vue';

const headerData = {
  title: 'Детальная информации о конкретном бренде',
  description: 'Как принято считать, элементы политического процесса, инициированные исключительно синтетически, своевременно верифицированы. Есть над чем.',
}

const stepsData = {
  title: 'Пользователь указывает бренд и получает подробную информацию',
  steps: [
    {
      step: 1,
      text: 'Ввод бренда и выбор языка',
    },
    {
      step: 2,
      text: 'Получение информации о бренде',
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

function setStep(step) {
  activeStep.value = step.step;
}

function decrementStep() {
  activeStep.value -= 1;
}

provide('activeStep', {
  activeStep,
  setStep,
  decrementStep
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
