<script setup>
import { ref, inject } from 'vue';
import axios from 'axios';

const article = ref('');
const brands = ref('');
const langValue = ref('ru');
const failGetData = 'Проверьте введенные данные';
let failRequest = ref(false);
const { activeStep, decrementStep } = inject('activeStep');

const emit = defineEmits(['get-detail-data'], ['request']);

// eslint-disable-next-line vue/max-len
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcmpJZCI6IjgzNjgifQ._ANRn1x1ID_HqRE9EsV-4onyQK3VeyzMZPjXHIXRT8k';

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const fetchBrands = async () => {
  try {
    const { data } = await axios.get(`https://api.parts-index.com/v1/brands/by-part-code?code=${article.value}&lang=${langValue.value}`, config);
    brands.value = data;
    emit('get-detail-data', data);
    emit('request', `/v1/brands/by-part-code?code=${article.value}&lang=${langValue.value}`);
  } catch (error) {
    failRequest.value = true;
    console.error(error);
  }
};

const clickShowButton = async () => {
  await fetchBrands();
  if (brands.value.list?.length > 0) {
    failRequest.value = false;
    activeStep.value = 2;
  } else {
    failRequest.value = true;
  }
};

const setLanguage = (event) => {
  langValue.value = event.target.value;
}

const setArticle = (event) => {
  article.value = event.target.getAttribute('value');
}

</script>

<template>
  <div class="search-block" :class="{alignitemsstart: activeStep == 2}">
    <div v-if="activeStep !== 2" class="search-block__lang">
      <select @change="setLanguage" id="" name="">
        <option value="ru">RUS</option>
        <option value="en">ENG</option>
      </select>
    </div>

    <form @submit.prevent v-show="activeStep == 1" action="" class="form-input">
      <div class="search-block__wrapper">
        <input
          id=""
          v-model="article"
          placeholder="Артикул"
          type="text"
          name=""
          @input="changeInputArticle"
          @keyup.enter="clickShowButton"
        >
        <button
          type="button"
          :disabled="!article"
          @click.prevent="clickShowButton"
        >
          Показать бренды
        </button>
      </div>

      <div class="sample">
        Пример:
        <span @click="setArticle" value="4014835723498"> 4014835723498</span>
        <span @click="setArticle" value="0092S40040">0092S40040</span>
      </div>
      <div class="alert" v-show="failRequest">{{ failGetData }}</div>
    </form>

    <div v-show="activeStep == 2" class="brands-info">
  <div class="back" @click="decrementStep">← Назад</div>

      <div class="brand-list__header" :class="{ mt36: brands.list?.length  > 6 }">Список брендов по артикулу {{ article }}</div>
      <ul v-show="brands.list?.length" class="brand-list__list" :class="{overflow: brands.list?.length > 6}">
        <li
          v-for="(item, id) in brands?.list"
          :key="id"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";

.brand {
  width: 100%;
  margin: 24px 32px;
}

.brands-info {
  width: 100%;
  user-select: none;
}
.brand-info {
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 16px;
  color: #000;
  font-size: 16px;
  line-height: 160%;
  margin-bottom: 16px;

  &__name {
    width: 35%;
  }

  &__descr {
    width: 65%;
    div {
      display: inline-block;
      padding-right: 8px;
    }

    a {
      color: $blue;
      cursor: pointer;

      &:hover {
        color: $lightblue;
      }
    }
  }
}

.overflow {
  overflow-y: scroll;
}

.mt36 {
  margin-top: 36px;
}

.alignitemsstart {
  align-items: start !important;
}
.brand-list {

  &__header {
    width: 100%;
  }

  &__list {
    width: 100%;
    max-height: 360px;
    scrollbar-color: hsl(0 0% 50%);

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: hsl(0 0% 50%);
      border-radius: 20px;
    }


    li {
      color: #000;
      font-size: 18px;
      font-weight: 400;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 16px 12px;
      border-bottom: 1px solid $grey;

      &:first-child {
        border-top: 1px solid $grey;
      }
    }
  }
}

.form-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 18px;
  width: 100%;

  &__brand {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    &-list {
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      padding: 8px 16px;

      li:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  button {
    height: 100%;
    padding: 10px 24px;
    background-color: $green;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    white-space: nowrap;
    width: 100%;

    &:disabled {
      background: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.20);
      cursor: default;
    }
  }
}

.search-block {
  padding: 60px 12px 12px;
  border-radius: 8px;
  border: 1px solid #DBDFE9;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  margin-bottom: 8px;

  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
  }

  &__lang {
    position: absolute;
    top: 24px;
    left: 24px;
    border: none;
    outline: none;
    font-size: 18px;

    select {
      border: none;
      background: none;

      &:focus-visible {
        border: none;
        outline: none;
      }
    }

    option {
      border: none;
    }
  }
}

@include for-lg-min {

  .brands-info {
    height: 100%;
  }

  .brand-list {

    &__header {
      width: 100%;
    }

    &__list {
      width: 80%;
      max-height: 80%;
    }
  }
  .form-input {
    flex-direction: row;

    &__brand {
      display: flex;
      flex-direction: column;
      width: 224px;
      position: relative;
    }

    input {
      width: 224px;
    }

    &__brand-list {
      position: absolute;
      top: 50px;
      width: 224px;
    }
  }

  .search-block {
    padding: 24px;
    max-height: 728px;
    overflow: hidden;
  }
}

@media (min-width: 992px) {
  .form-input {
    margin: 0 auto;
    max-width: 498px;
    justify-content: start;
  }

  .search-block {
    min-width: 630px;

    &__wrapper {
      flex-direction: row;

      input {
        width: 288px;
      }

      button {
        max-width: 202px;
      }
    }
  }
}

@media (min-width: 1200px) and (max-width: 1214px) {
.search-block {
  padding: 12px;
}
}
</style>
