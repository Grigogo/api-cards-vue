<script setup>
import { ref, provide } from 'vue';
import ApiCards from './components/ApiCards.vue';
import ApiCodeBrand from './components/ApiCodeBrand.vue';
import ApiBrand from './components/ApiBrand.vue';
import ApiDetailArticle from './components/ApiDetailArticle.vue';
import ApiBrandDetailInfo from './components/ApiBrandDetailInfo.vue';

const showCards = ref('true');
const activeCard = ref('');

const myData = window.apiCardsData;

// const cardList = window.apiCardsData;
const cardList = myData.map((obj, index) => {
  return {
    id: index,
    code: obj.CODE,
    title: obj.NAME,
    description: obj.DESCRIPTION,
  }
})

console.log(myData);

const setActiveCard = (data) => {
  activeCard.value = data;
  showCards.value = false;
};

function backToCards() {
  showCards.value = true;
  activeCard.value = '';
}

provide('backToCards', backToCards);
provide('activeCard', activeCard);
</script>
<template>
  <div style="margin-top:-40px">
    <div @click="backToCards" id="back-to-cards"></div>
    <ApiCards @set-active-card="setActiveCard" v-if="showCards" :cardList="cardList"/>
    <ApiCodeBrand v-if="activeCard == 'DETAIL_BY_ARTICLE_BRAND'" />
    <ApiBrand v-if="activeCard == 'BREND_BY_ARTICLE'" />
    <ApiDetailArticle v-if="activeCard == 'DETAIL_BY_ARTICLE'" />
    <ApiBrandDetailInfo v-if="activeCard == 'BRAND_BY_NAME'" />
  </div>
</template>

<style lang="scss">
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";
</style>
