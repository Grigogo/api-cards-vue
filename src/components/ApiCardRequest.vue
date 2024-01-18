<script setup>
defineProps({
  header: String,
  request: String,
});

</script>

<template>
  <div class="api-request">
    <div class="api-request__header">
      {{ header }}
    </div>
    <div class="api-request__code">
      <span class="block"><span class="purple-code">curl</span> --request GET \</span>
      <span class="block">--url https://api.parts-index.com{{ request }} \</span>
      <span class="block">
        --header <span class="blue-code">'Accept: application/json'</span> \
      </span>
      <span class="block">--header <span class="blue-code">'Authorization: 123'</span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.api-request {
  background-color: #2B2A44;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  color: #ffffff;
  white-space: nowrap;
  height: 150px;

  &__header {
    font-family: var(--bs-font-monospace);
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
  }

  &__code {
    font-family: var(--bs-font-monospace);
    font-size: 14px;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: hsl(0 0% 50%);

    &::-webkit-scrollbar {
      height: 8px;
    }

    &::-webkit-scrollbar-corner {
      background: #2B2A44;
    }

    &::-webkit-scrollbar-track {
      background: #2B2A44;
    }

    &::-webkit-scrollbar-thumb {
      background-color: hsl(0 0% 50%);
      border-radius: 20px;
    }
  }

  .hljs {
    padding: 0;
  }
}

.purple-code {
  color: #BC87FF;
}

.blue-code {
  color: #92C1FF;
}

.block {
  display: block;
}
</style>
