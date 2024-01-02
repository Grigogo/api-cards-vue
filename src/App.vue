<script setup>
import { ref, provide } from 'vue';
import ApiCards from './components/ApiCards.vue';
import ApiCodeBrand from './components/ApiCodeBrand.vue';
import ApiBrand from './components/ApiBrand.vue';

const showCards = ref('true');
const activeCard = ref('');

const cardList = [
  {
    id: 1,
    title: 'Информация о детали по артикулу и бренду',
    description: 'Как принято считать, элементы политического процесса, инициированные исключительно синтетически, своевременно верифицированы. Есть над чем.',
  },
  {
    id: 2,
    title: 'Получение брендов по артикулу',
    description: 'Как принято считать, элементы политического процесса, инициированные исключительно синтетически, своевременно верифицированы. Есть над чем.',
  },
  {
    id: 3,
    title: 'Информации о детали по артикулу',
    description: 'Как принято считать, элементы политического процесса, инициированные исключительно синтетически, своевременно верифицированы. Есть над чем.',
  },
  {
    id: 4,
    title: 'Детальная информации о конкретном бренде',
    description: 'Как принято считать, элементы политического процесса, инициированные исключительно синтетически, своевременно верифицированы. Есть над чем.',
  },
]

const setActiveCard = (data) => {
  activeCard.value = data;
  showCards.value = false;
};

function backToCards() {
  showCards.value = true;
  activeCard.value = '';
}

provide('backToCards', backToCards);
</script>

<template>
  <div class="container">
    <ApiCards @set-active-card="setActiveCard" v-if="showCards" :cardList="cardList"/>
    <ApiCodeBrand v-if="activeCard == 1"/>
    <ApiBrand v-if="activeCard == 2"/>
  </div>
</template>

<style lang="scss">
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";
</style>
