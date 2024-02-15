<script setup>
import { ref, provide } from 'vue';
import ApiCards from './components/ApiCards.vue';
import ApiCodeBrand from './components/ApiCodeBrand.vue';
import ApiBrand from './components/ApiBrand.vue';
import ApiDetailArticle from './components/ApiDetailArticle.vue';
import ApiBrandDetailInfo from './components/ApiBrandDetailInfo.vue';

const showCards = ref('true');
const activeCard = ref('');
const filteredArray = ref('');

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

const setActiveCard = (data) => {
  activeCard.value = data;
  showCards.value = false;
  filteredArray.value = myData.filter(item => item.CODE === data);

};

function backToCards() {
  showCards.value = true;
  activeCard.value = '';
}



provide('backToCards', backToCards);
provide('activeCard', activeCard);
</script>
<template>
  <div style="margin-top:-40px" >
    <div @click="backToCards" id="back-to-cards"></div>
    <ApiCards @set-active-card="setActiveCard" v-if="showCards" :cardList="cardList"/>
    <ApiCodeBrand v-if="activeCard == 'DETAIL_BY_ARTICLE_BRAND'" :dataCard="filteredArray" />
    <ApiBrand v-if="activeCard == 'BREND_BY_ARTICLE'" :dataCard="filteredArray" />
    <ApiDetailArticle v-if="activeCard == 'DETAIL_BY_ARTICLE'" :dataCard="filteredArray" />
    <ApiBrandDetailInfo v-if="activeCard == 'BRAND_BY_NAME'" :dataCard="filteredArray" />
  </div>
</template>

<style lang="scss">
@import "/src/scss/_media.scss";
/* class="view container" style="margin-top:-40px" */
@import "/src/scss/global.scss";
@import "/src/scss/buttons.scss";
</style>
