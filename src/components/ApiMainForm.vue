<script setup>
import { ref, watch, inject } from 'vue';
import ApiCardRequest from './ApiCardRequest.vue';
import ApiCardResponse from './ApiCardResponse.vue';
import ApiInputForm from './ApiInputForm.vue';
import ApiDetailInfo from './ApiDetailInfo.vue';

const detailData = ref('');
const jsonStringFormattedResponse = ref('');
const { activeStep, incrementStep } = inject('activeStep');

defineProps({
  activeStep: Number,
});

watch(detailData, () => {
  jsonStringFormattedResponse.value = JSON.stringify(detailData.value, null, 2);
});

const getDetailData = (data) => {
  detailData.value = data;
  incrementStep();
};
</script>

<template>
  <div class="api-wrapper-request">
    <div class="api-wrapper-request__main">
      <ApiInputForm v-if="activeStep == 1" @get-detail-data="getDetailData" @set-active-step="activeStep" />
      <ApiDetailInfo v-if="activeStep == 2" :detail-data="detailData[0]" />
    </div>
    <div class="api-wrapper-request__code">
      <ApiCardRequest header="Запрос" />
      <ApiCardResponse header="Ответ" :server-response="jsonStringFormattedResponse" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../scss/media';
.api-wrapper-request {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__code {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
}

@include for-lg-min {
  .api-wrapper-request {
    flex-direction: row;

    &__main {
      width: 70%;
    }

    &__code {
    width: 30%;
  }
  }
}

</style>
