<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import debounce from 'debounce';

const article = ref('');
const brands = ref('');
const selectedBrand = ref('');
const langValue = ref('ru');
const failGetBrandsText = 'Ни одного производителя по введенному артикулу не найдено. Перепроверьте артикул или введите другой';
const failGetBrands = ref(false);
const failGetData = 'Проверьте введенные данные';
const failRequest = ref(false);
const showBrandList = ref(false);
const activeBrandList = ref(false);
const emptyArticle = ref(true);
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
    if (data?.list.length != 0) {
      brands.value = data;
      showBrandList.value = true;
      failGetBrands.value = false;
    } else {
      showBrandList.value = false;
      selectedBrand.value ='';
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`https://api.parts-index.com/v1/entities?code=${article.value}&brand=${selectedBrand.value}&lang=${langValue.value}`, config);
    emit('get-detail-data', data);
    emit('request', `/v1/entities?code=${article.value}&brand=${selectedBrand.value}&lang=${langValue.value}`);
    failRequest.value = false;
  } catch (error) {
    selectedBrand.value ='';
    failRequest.value = true;
    console.error(error);
  }
};

const debouncedSearchProduct = debounce(fetchProduct, 500);

const onChangeInputArticle = async () => {
  selectedBrand.value = '';
  brands.value = '';
  await fetchBrands();

  if (!brands.value.list?.length) {
    failGetBrands.value = true;
  }
};

const onChangeArticle = () => {
  console.log(article.value.length);
  if (article.value.length === 0) {
    emptyArticle.value = true;
  } else {
    emptyArticle.value = false;
  }
}

const clickShowButton = () => {
  debouncedSearchProduct();
};

const handleItemClick = (brand) => {
  if (!article.value) {
    selectedBrand.value ='';
  } else {
    selectedBrand.value = brand;
    showBrandList.value = false;
  }
};

const setLanguage = (event) => {
  langValue.value = event.target.value;
}

const setArticle = (event) => {
  article.value = event.target.getAttribute('value');
  selectedBrand.value ='';
  fetchBrands();
}

</script>

<template>
  <div class="search-block">
    <div class="search-block__lang">
      <select @change="setLanguage" id="" name="">
        <option value="ru">RUS</option>
        <option value="en">ENG</option>
      </select>
    </div>
    <form @submit.prevent action="" class="form-input">
      <div class="search-block__wrapper">
        <input
          id=""
          v-model="article"
          placeholder="Артикул"
          type="text"
          name=""
          @input="onChangeArticle"
          @change="onChangeInputArticle"
          @keyup.enter="onChangeInputArticle"
        >
      <div class="form-input__brand">
        <input
          readonly
          v-model="selectedBrand"
          :disabled="!brands.list?.length"
          placeholder="Бренд"
          type="text"
          name=""
          @focus="activeBrandList = true"
        >
        <ul v-show="showBrandList && activeBrandList && article" class="form-input__brand-list" :class="{overflow: brands.list?.length > 6}">
          <li
            v-for="(item, id) in brands?.list"
            :key="id"
            @click="handleItemClick(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <button type="button" :disabled="!selectedBrand" @click.prevent="clickShowButton">
        Показать деталь
      </button>
    </div>

      <div class="sample">
        Пример:
        <span @click="setArticle" value="4014835723498"> 4014835723498</span>
        <span @click="setArticle" value="0092S40040">0092S40040</span>
      </div>
      <div class="search-block__wrapper">
        <div class="alert" v-show="failRequest">{{ failGetData }}</div>
        <div class="alert" v-show="failGetBrands && !emptyArticle">{{ failGetBrandsText }}</div>
      </div>
    </form>


  </div>

</template>

<style lang="scss" scoped>
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";


.overflow {
  overflow-y: scroll;
}

.form-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 18px;
  width: 100%;
  margin-bottom: 12px;

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

  &__brand-list {
    max-height: 200px;
    overflow-y: scroll;
  }

  span {
    display: inline-block;

    &:first-child {
      margin-left: 4px;
    }
  }

  input {
    &:disabled {
      background: rgba(0, 0, 0, 0.08);
      cursor: default;

      &:hover {
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.08);
      }

      &:focus {
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.08);
      }
    }
  }

  button {
    height: 48px;
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
  padding: 60px 12px 12px;
  border-radius: 8px;
  border: 1px solid #DBDFE9;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 8px;

  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
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
  .form-input {
    flex-direction: column;
    justify-content: start;
    margin-bottom: 0;
    max-width: 660px;
    margin: 0 auto;

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
      max-height: 240px;
      overflow-y: scroll;
      scrollbar-color: hsl(0 0% 50%);
      background-color: #ffffff;

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
    }
  }

  .search-block {
    padding: 24px;
    align-items: start;

    &__wrapper {
      flex-direction: row;
    }

    .alert {
    }
  }
}

@media (min-width: 992px) and (max-width: 1093px) {
  .form-input {
    max-width: 600px;

    &__brand {
      max-width: 33%;
      input {
        max-width: 100% !important;
      }
    }
  }

  .search-block {
    &__wrapper {
      max-width: 100%;

      input {
        max-width: 33%;
      }

      button {
        max-width: 33%;
      }
    }
  }
}
</style>
