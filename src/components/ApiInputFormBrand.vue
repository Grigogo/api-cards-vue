<script setup>
import { ref, inject } from 'vue';
import axios from 'axios';
import debounce from 'debounce';

const article = ref('');
const brands = ref('');
const brandInfo = ref('');
const selectedBrand = ref('');
const langValue = ref('ru');
const failGetData = 'Проверьте введенные данные';
let failRequest = ref(false);
const { activeStep, incrementStep } = inject('activeStep');

const emit = defineEmits(['get-detail-data']);


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
  } catch (error) {
    failRequest.value = true;
    console.error(error);
  }
};

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`https://api.parts-index.com/v1/brands/parse?q=${selectedBrand.value}&lang=${langValue.value}`, config);
    brandInfo.value = data.list;
    emit('get-detail-data', data.list);
    failRequest.value = false;
  } catch (error) {
    failRequest.value = true;
    console.error(error);
  }
};


const changeInputArticle = () => {
  if(article) {
    activeStep.value = 2;
  } else {
  }
}

const clickShowButton = () => {
  fetchBrands();
  if (brands.value.list?.length > 0) {
    incrementStep();
    failRequest.value = false;
  } else {
    failRequest.value = true;
  }
};

const setLanguage = (event) => {
  langValue.value = event.target.value;
}

const handleItemClick = (brand) => {
  selectedBrand.value = brand;
  fetchProduct();
  incrementStep();
};

const setArticle = (event) => {
  article.value = event.target.getAttribute('value');
  fetchBrands();
}

</script>

<template>
  <div class="search-block" :class="{alignitemsstart: activeStep == 4}">
    <div v-if="activeStep !== 4" class="search-block__lang">
      <select @change="setLanguage" id="" name="">
        <option value="ru">RUS</option>
        <option value="en">ENG</option>
      </select>
    </div>

    <form @submit.prevent v-show="activeStep == 1 || activeStep == 2" action="" class="form-input">
      <div>
        <input
          id=""
          v-model="article"
          placeholder="Артикул"
          type="text"
          name=""
          @input="changeInputArticle"
        >
        <div class="sample">
          Пример:<span @click="setArticle" value="4014835723498"> 4014835723498</span>
        </div>
      </div>
      <button type="button" :disabled="!article" @click.prevent="clickShowButton">
        Показать бренды
      </button>
      <div class="alert" v-show="failRequest">{{ failGetData }}</div>
    </form>

    <div v-show="activeStep == 3" class="brands">
      <div class="brand-list__header" :class="{ mt36: brands.list?.length  > 6 }">Выберите бренд</div>
      <ul v-show="brands.list?.length" class="brand-list__list" :class="{overflow: brands.list?.length > 6}">
        <li
          v-for="(item, id) in brands?.list"
          :key="id"
          @click="handleItemClick(item.name)"
        >
          {{ item.name }}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8.99991 17L13.4999 12L8.99991 7L10 6L16 12L10 18L8.99991 17Z" fill="black" fill-opacity="0.24"/>
          </svg>
        </li>
      </ul>
      <div class="alert" v-show="failRequest">{{ failGetData }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";

.overflow {
  overflow-y: scroll;
}

.brands {
  width: 392px;
  margin-top: 48px;
}

.alignitemsstart {
  align-items: start !important;
}
.brand-list {

  &__list {
    width: 100%;
    max-height: 360px;
    scrollbar-width: thin;
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
      cursor: pointer;
      transition: all ease .3s;

      &:first-child {
        border-top: 1px solid $grey;

        &:hover {
          border-bottom: 1px solid $white;
          border-top: 1px solid $white;
        }
      }

      &:hover {
        background-color: $whiteblue;
        border-radius: 4px;
        border-bottom: none;
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
  margin-top: 48px;

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

  input {
    &:disabled {
      background: rgba(0, 0, 0, 0.08);
      cursor: default;

      &:hover {
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.12);
      }

      &:focus {
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.12);
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

    &:disabled {
      background: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.20);
      cursor: default;
    }
  }
}

.search-block {
  padding: 16px 12px;
  border-radius: 8px;
  border: 1px solid #DBDFE9;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 8px;

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

  .brand {
    width: 100%;
    margin: 24px 32px;
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
  }
}

@media (min-width: 992px) and (max-width: 1093px) {

  .mt36 {
    margin-top: 36px;
  }
  .form-input {

    &__brand {
      width: 204px;
      input {
        width: 204px;
      }

      &-list {
        width: 204px;
      }
    }

    input {
      width: 204px;
    }

    button {
      padding: 10px 8px;
    }
  }

  .search-block {
    min-width: 630px;
  }
}

@media (min-width: 1200px) and (max-width: 1214px) {
  .mt36 {
    margin-top: 36px;
  }
.search-block {
  padding: 12px;
}
}
</style>
