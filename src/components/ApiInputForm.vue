<script setup>
import { ref } from 'vue';
import axios from 'axios';

const article = ref('');
const brands = ref('');
const selectedBrand = ref('');

const emit = defineEmits(['get-detail-data']);

const fetchBrands = async () => {
  try {
    const { data } = await axios.get(`https://a85f85ae0af7f164.mokky.dev/list?id=${article.value}`);
    brands.value = data;
  } catch (error) {
    console.error(error);
  }
};

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`https://a85f85ae0af7f164.mokky.dev/list?id=${article.value}&brand=${selectedBrand.value}`);
    emit('get-detail-data', data);
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
      30329726
    </div>
    <form action="" class="form-input">
      <div class="form-input__brand">
        <input
          id=""
          v-model="selectedBrand"
          :disabled="!brands.length"
          placeholder="Бренд"
          type="text"
          name=""
        >
        <ul v-show="brands.length" class="form-input__brand-list">
          <li
            v-for="(item, id) in brands"
            :key="id"
            @click="handleItemClick(item.brand)"
          >
            {{ item.brand }}
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
