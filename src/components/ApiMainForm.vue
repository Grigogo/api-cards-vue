<script setup>
import { ref, watch, inject } from 'vue';
import ApiCardRequest from './ApiCardRequest.vue';
import ApiCardResponse from './ApiCardResponse.vue';
import ApiInputFormCodeBrand from './ApiInputFormCodeBrand.vue';
import ApiInputFormBrand from './ApiInputFormBrand.vue';
import ApiDetailInfo from './ApiDetailInfo.vue';
import ApiInputFormDetailArticle from './ApiInputFormDetailArticle.vue';
import ApiInputFormBrandDetailInfo from './ApiInputFormBrandDetailInfo.vue';
import BrandInfo from './BrandInfo.vue';

const detailData = ref('');
const jsonStringFormattedResponse = ref('');
const { activeStep, incrementStep } = inject('activeStep');
const activeCard = inject('activeCard');
const request = ref('');

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
const setRequest = (data) => {
  request.value = data;
}

const getBrandData = (data) => {
  detailData.value = data;
};
</script>

<template>
  <div class="api-wrapper-request">
    <div v-if="activeCard == 'DETAIL_BY_ARTICLE_BRAND'" class="api-wrapper-request__main">
      <ApiInputFormCodeBrand
        v-show="activeStep == 1"
        @request="setRequest"
        @get-detail-data="getDetailData"
        @set-active-step="activeStep"
      />
      <ApiDetailInfo v-if="activeStep == 2" :detail-data="detailData.list[0]" />
    </div>
    <div v-if="activeCard == 'BREND_BY_ARTICLE'" class="api-wrapper-request__main">
      <ApiInputFormBrand
        v-show="activeStep != 4"
        @request="setRequest"
        @get-detail-data="getBrandData"
        @set-active-step="activeStep"
      />
    </div>
    <div v-if="activeCard == 'DETAIL_BY_ARTICLE'" class="api-wrapper-request__main">
      <ApiInputFormDetailArticle
        v-show="activeStep != 4"
        @request="setRequest"
        @get-detail-data="getDetailData"
        @set-active-step="activeStep"
      />
      <ApiDetailInfo
        v-if="activeStep == 4"
        :detail-data="detailData.list[0]"
        />
    </div>
    <div v-if="activeCard == 'BRAND_BY_NAME'" class="api-wrapper-request__main">
      <ApiInputFormBrandDetailInfo
        v-show="activeStep != 2"
        @request="setRequest"
        @get-detail-data="getBrandData"
        @set-active-step="activeStep"
        :detail-data="detailData[0]"
      />
      <BrandInfo v-if="activeStep == 2" :detail-data="detailData.list[0]" />
    </div>
    <div class="api-wrapper-request__code">
      <ApiCardRequest :request="request" header="Запрос" />
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
