<script setup>
import { ref, inject, watch } from 'vue';
import axios from 'axios';

const brandInfo = ref('');
const brand = ref('');
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

const fetchBrandInfo = async () => {
  try {
    const { data } = await axios.get(`https://api.parts-index.com/v1/brands/parse?q=${brand.value}&lang=${langValue.value}`, config);
    brandInfo.value = data.list;
    emit('get-detail-data', data);
    emit('request', `/v1/brands/parse?q=${brand.value}&lang=${langValue.value}`);
  } catch (error) {
    console.error(error);
  }
};

const setLanguage = (event) => {
  langValue.value = event.target.value;
}

const handleButtonClick = async () => {
  await fetchBrandInfo();
  if (brandInfo.value.length) {
    activeStep.value = 2;
  } else {
    failRequest.value = true;
  }
}

const setArticle = (event) => {
  brand.value = event.target.getAttribute('value');
}

</script>

<template>
  <div class="search-block">
    <div class="w100" v-show="activeStep == 1" >
      <div v-if="activeStep !== 2" class="search-block__lang">
        <select @change="setLanguage" id="" name="">
          <option value="ru">RUS</option>
          <option value="en">ENG</option>
        </select>
      </div>

      <form @submit.prevent action="" class="form-input">
        <div class="width100">
          <input
            id=""
            v-model="brand"
            placeholder="Бренд"
            type="text"
            name=""
          >
          <div class="sample">
            Пример:
            <span @click="setArticle" value="VAG">VAG</span>
            <span @click="setArticle" value="Mann Filter">&nbsp Mann Filter</span>
            </div>
        </div>
        <button type="button" :disabled="!brand" @click.prevent="handleButtonClick">
          Показать бренд
        </button>
        <div class="alert" v-show="failRequest">{{ failGetData }}</div>
      </form>
    </div>

    <div class="brand" v-if="activeStep == 2">
      <div class="brand-list__header">Информация о бренде</div>
      <div v-if="brandInfo.id" class="brand-info">
        <div class="brand-info__name">
          ID
        </div>
        <div class="brand-info__descr">
          {{ brandInfo.id }}
        </div>
      </div>
      <div v-if="brandInfo.name" class="brand-info">
        <div class="brand-info__name">
          Название оригинальное
        </div>
        <div class="brand-info__descr">
          {{ brandInfo.name }}
        </div>
      </div>
      <div v-if="brandInfo[0].source" class="brand-info">
        <div class="brand-info__name">
          Название наше
        </div>
        <div class="brand-info__descr">
          {{ brandInfo.source }}
        </div>
      </div>
      <div v-show="brandInfo[0].synonyms.length != 0" class="brand-info">
        <div class="brand-info__name">
          Синонимы бренда
        </div>
        <div class="brand-info__descr">
          <div v-for="(item, idx) in brandInfo[0].synonyms" :key="idx">
            {{ item }}
          </div>
        </div>
      </div>
<!--       <div class="brand-info">
        <div class="brand-info__name">
          Описание
        </div>
        <div class="brand-info__descr">
          Для современного мира понимание сути ресурсосберегающих технологий играет определяющее значение для существующих финансовых и административных условий.
        </div>
      </div>
      <div class="brand-info">
        <div class="brand-info__name">
          Страна производитель
        </div>
        <div class="brand-info__descr">
          Германия
        </div>
      </div>
      <div class="brand-info">
        <div class="brand-info__name">
          Cайт бренда
        </div>
        <div class="brand-info__descr">
          <a href="mann-filter.com">mann-filter.com</a>
        </div>
      </div>
      <div class="brand-info">
        <div class="brand-info__name">
          E-mail бренда
        </div>
        <div class="brand-info__descr">
          <a href="mailto:info@mann-filter.com">info@mann-filter.com</a>
        </div>
      </div>
      <div class="brand-info">
        <div class="brand-info__name">
          Адрес бренда
        </div>
        <div class="brand-info__descr">
          2715 Ash Dr. San Jose, South Dakota 83475
        </div>
      </div> -->
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";

.w100 {
  width: 100%;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}
.brand {
  width: 100%;
}

.brands {
  width: 392px;
}

.alignitemsstart {
  align-items: start !important;
}
.brand-list {

  &__list {
    width: 100%;

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
