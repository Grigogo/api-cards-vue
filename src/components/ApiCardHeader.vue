<script setup>
import { inject } from 'vue';

defineProps({
  headerData: Object,
});

const backToCards = inject('backToCards');

</script>

<template>
<div class="header">
  <div @click="backToCards" class="back">← Все возможности</div>
  <div class="header__title">{{ headerData.title }}</div>
  <div class="header__description">{{ headerData.description }}</div>
</div>
</template>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/media';

.header {
  padding: 20px 0;

  &__title {
    font-size: 18px;
    line-height: 160%;
    font-weight: 600;
    margin-bottom: 12px;
  }

  &__description {
    color: $darkgrey;
    line-height: 160%;
    max-width: 100%;
  }
}

@include for-lg-min {
  .header {

    &__description {
      max-width: 70%;
    }
  }
}

@include for-large-devices {
  .header {
    padding: 40px 0;

    &__title {
      font-size: 27px;
      line-height: 110%;
    }

    &__description {
      max-width: 60%;
    }
  }
}
</style>
