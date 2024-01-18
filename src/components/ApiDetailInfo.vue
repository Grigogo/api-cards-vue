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
    <div class="detail__image">
      <img :src="detailData.images[0]" alt="">
    </div>
    <div class="detail__header">
      {{ detailData.originalName }}
    </div>

    <div class="data-table__rows">
      <div
        v-for="{ id, title, values } in detailData.parameters[0]?.params"
        :key="id"
        class="data-table__row"
      >
        <div class="data-table__row-name">
          <span>{{ title }}</span>
        </div>
        <div class="data-table__row-divider" />
        <div v-for="{ value, id } in values" :key="id" class="data-table__row-value">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    font-size: 32px;
    font-weight: 500;
  }

  &__properties-item {
    display: flex;
    justify-content: space-between;
  }
}

.data-table {
  &__row {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    margin-bottom: 8px;
    align-items: baseline;

    &-name {
      display: flex;
      color: #ccccd2;
      max-width: 240px;
      width: 100%;
    }

    &-divider {
      border-bottom: 1px dashed #ccccd2;
      margin-right: 16px;
      width: 100%;
      height: 20px;
    }

    &-value {
      min-width: -webkit-fit-content;
      min-width: -moz-fit-content;
      min-width: fit-content;
    }
  }
}
</style>
