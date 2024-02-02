<script setup>
import { provide, ref } from 'vue';
import ApiSteps from './ApiSteps.vue';
import ApiMainForm from './ApiMainForm.vue';
import ApiCardHeader from './ApiCardHeader.vue';

const myData = window.apiCardsData;

const myData1 = myData[3];


const headerData = {
  title: myData1.NAME,
  description: myData1.DESCRIPTION,
}

const steps = myData1.ELEMENTS[0].STEPS.map((obj, index) => {
  return {
    step: index+1,
    text: obj,
  }
})

const stepsText = myData1.ELEMENTS[0].STEPS_TEXT.map((obj, index) => {
  return {
    step: index+1,
    text: obj,
  }
})

const stepsData = {
  steps: steps,
  stepsText: stepsText,
};

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
