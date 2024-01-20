<script setup>
import { inject } from 'vue';
defineProps({
  detailData: Object,
});

const { decrementStep } = inject('activeStep');
</script>

<template>
    <div class="detail">
      <div class="back" @click="decrementStep">← Назад</div>
      <div class="detail__header">
        Информация о бренде
      </div>

      <div class="data-table__rows">

        <div v-if="detailData.id" class="data-table__row">
          <div class="data-table__row-name">
            <span> ID </span>
          </div>
          <div class="data-table__row-divider" />
          <div class="data-table__row-value">
            {{ detailData.id }}
          </div>
        </div>
        <div v-if="detailData.id" class="data-table__row">
          <div class="data-table__row-name">
            <span> Информация о бренде </span>
          </div>
          <div class="data-table__row-divider" />
          <div class="data-table__row-value">
            {{ detailData.name }}
          </div>
        </div>
        <div v-if="detailData.source" class="data-table__row">
          <div class="data-table__row-name">
            <span> Запрашиваемый бренд </span>
          </div>
          <div class="data-table__row-divider" />
          <div class="data-table__row-value">
            {{ detailData.source }}
          </div>
        </div>
        <div v-if="detailData.synonyms.length != 0" class="data-table__row">
          <div class="data-table__row-name">
            <span> Синонимы бренда </span>
          </div>
          <div class="data-table__row-divider" />
          <div class="data-table__row-value">
            <span class="data-table__row-synonyms" v-for="(item, idx) in detailData.synonyms" :key="idx">
              {{ item }}
            </span>
          </div>
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
</template>

<style lang="scss">
@import "/src/scss/_media.scss";
@import "/src/scss/global.scss";
.detail {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid #DBDFE9;
  border-radius: 8px;

  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;

  .divider {
    border-bottom: 1px dotted #6a6a6a;
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    border: 1px solid #ECECEC;
    border-radius: 4px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__header {
    font-size: 20px;
    font-weight: 500;
  }

  &__properties-item {
    display: flex;
    justify-content: space-between;
  }
}

.data-table {
  &__row {
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    margin-bottom: 8px;
    align-items: baseline;

    &-name {
      display: flex;
      flex-shrink: 0;
      color: $grey;
      max-width: 240px;
      width: 100%;
      line-height: 1.6;
    }

    &-divider {
      border-bottom: 1px dashed $grey;
      margin-right: 16px;
      width: 100%;
      height: 20px;
      display: none;
    }

    &-value {
      min-width: fit-content;
      line-height: 1.6;
    }

    &-synonyms {
      display: block;
    }
  }
}

@include for-tablet {

  .detail {
    min-height: 728px;
    &__header {
      font-size: 32px;
    }
  }
  .data-table {
    &__row {
      flex-direction: row;

      &-name {
        max-width: 240px;
      }

      &-divider {
        display: block;
      }

      &-synonyms {
        text-align: end;
        max-width: 240px;
      }
    }
  }
}

</style>
