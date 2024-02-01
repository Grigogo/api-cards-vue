<script setup>
defineProps({
  title: String,
  description: String,
});


</script>

<template>
  <div class="api-card">
    <div class="api-card__wrapper">
      <div class="api-card__title">
        {{ title }}
    </div>
    <div class="api-card__description">
      {{ description }}
    </div>
    </div>
    <div class="api-card__more">
      Смотреть подробнее
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/variables';
@import '../scss/media';

.api-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  background: $whiteblue;
  border-radius: 8px;
  border: 1px solid $whiteblue;
  padding: 20px;
  transition: all ease .2s;
  max-height: 312px;

  &:active {
    background: $lightblue;
    border: 1px solid $grey;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    line-height: 140%;
    margin-bottom: 12px;
  }

  &__description {
    color: $darkgrey;
    line-height: 160%;
    margin-bottom: 20px;
    max-height: 124px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__more {
    color: $blue;
  }
}

@include for-lg-min {
  .api-card {
    width: calc(50% - 12px);

    &:hover {
      background: $white;
      border: 1px solid $grey;
    }
  }
}

@include for-large-devices {
  .api-card {
    min-height: 312px;
    padding: 32px;

    &__title {
      font-size: 21px;
      max-width: 57%;
    }
  }
}

@include for-high-screens {
  .api-card {
    transition: all ease .2s;

    &__title {
      color: $black;
    }
  }
}


</style>
