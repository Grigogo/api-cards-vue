<script setup>
import { ref } from 'vue';
import axios from 'axios';

const article = ref('');
const brands = ref('');
const selectedBrand = ref('');

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
    const { data } = await axios.get(`https://api.parts-index.com/v1/brands/by-part-code?code=${article.value}&lang=ru`, config);
    brands.value = data;
  } catch (error) {
    console.error(error);
  }
};

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`https://api.parts-index.com/v1/entities?code=${article.value}&brand=${selectedBrand.value}&lang=ru`, config);
    emit('get-detail-data', data.list);
  } catch (error) {
    console.error(error);
  }
};

const onChangeInputArticle = () => {
  fetchBrands();
};

const clickShowButton = () => {
  fetchProduct();
};

const handleItemClick = (brand) => {
  selectedBrand.value = brand;
};
</script>

<template>
  <div class="search-block">
    <div class="search-block__lang">
      <select id="" name="">
        <option>
          RUS
        </option>
        <option>
          ENG
        </option>
      </select>
      4014835723498
    </div>
    <form action="" class="form-input">
      <div class="form-input__brand">
        <input
          id=""
          v-model="selectedBrand"
          :disabled="!brands"
          placeholder="Бренд"
          type="text"
          name=""
        >
        <ul v-show="brands" class="form-input__brand-list">
          <li
            v-for="(item, id) in brands?.list"
            :key="id"
            @click="handleItemClick(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div>
        <input
          id=""
          v-model="article"
          placeholder="Артикул"
          type="text"
          name=""
          @input="onChangeInputArticle"
        >
      </div>
      <button type="button" :disabled="!selectedBrand" @click.prevent="clickShowButton">
        Показать деталь
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";

.form-input {
  display: flex;
  gap: 8px;
  font-size: 18px;

  &__brand {
    display: flex;
    flex-direction: column;
    width: 224px;
    position: relative;

    &-list {
      border: 1px solid rgba(0, 0, 0, 0.12);
      border-radius: 8px;
      padding: 16px;
    }
  }

  input {
    width: 224px;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.12);

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
    border-radius: 8px;

    &:disabled {
      background: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.20);
      cursor: default;
    }
  }
}

.search-block {
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #DBDFE9;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

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
</style>
