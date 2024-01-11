<script setup>
import { ref, inject } from 'vue';
import axios from 'axios';

const brandInfo = ref('');
const brand = ref('');
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

const fetchBrand = async () => {
  try {
    const { data } = await axios.get(`https://api.parts-index.com/v1/brands/parse?q=${brand.value}&lang=${langValue.value}`, config);
    brandInfo.value = data.list;
    emit('get-detail-data', data.list);
  } catch (error) {
    console.error(error);
  }
};

const setLanguage = (event) => {
  langValue.value = event.target.value;
}

const handleButtonClick = () => {
  fetchBrand();
  console.log(brandInfo.value.length);
  if (brandInfo.value.length) {
    activeStep.value = 2;
  } else {
    failRequest.value = true;
  }
}

const changeInput = () => {
  fetchBrand();
  failRequest.value = false;
}

</script>

<template>
  <div class="search-block">
    <div v-show="activeStep == 1" >
      <div v-if="activeStep !== 2" class="search-block__lang">
        <select @change="setLanguage" id="" name="">
          <option value="ru">RUS</option>
          <option value="en">ENG</option>
        </select>
        4014835723498
      </div>

      <form @submit.prevent action="" class="form">
        <div class="form">
          <input
            id=""
            v-model="brand"
            placeholder="Бренд"
            type="text"
            name=""
            @input="changeInput"
          >
        </div>
        <button type="button" :disabled="!brand" @click.prevent="handleButtonClick">
          Показать бренд
        </button>
        <div v-show="failRequest">{{ failGetData }}</div>
      </form>
    </div>

    <div class="brand" v-if="activeStep == 2">
      <div class="brand-list__header">Информация о бренде</div>
      <div v-if="brandInfo[0].id" class="brand-info">
        <div class="brand-info__name">
          ID
        </div>
        <div class="brand-info__descr">
          {{ brandInfo[0].id }}
        </div>
      </div>
      <div v-if="brandInfo[0].name" class="brand-info">
        <div class="brand-info__name">
          Название оригинальное
        </div>
        <div class="brand-info__descr">
          {{ brandInfo[0].name }}
        </div>
      </div>
      <div v-if="brandInfo[0].source" class="brand-info">
        <div class="brand-info__name">
          Название наше
        </div>
        <div class="brand-info__descr">
          {{ brandInfo[0].source }}
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
.brands {
  width: 392px;
}

.alignitemsstart {
  align-items: start !important;
}
.brand-list {
  &__header {
    font-size: 24px;
    font-weight: 600;
    line-height: 114%;
    margin-bottom: 12px;
  }

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
        border-radius: 8px;
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
      border-radius: 8px;
      padding: 8px 16px;

      li:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  input {
    width: 100%;
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

  .brand-list {
  &__header {
    font-size: 28px;
    font-weight: 600;
    line-height: 114%;
    margin-bottom: 24px;
  }
}

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
