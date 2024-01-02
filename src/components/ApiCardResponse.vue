<script setup>
import '../css/github-dark.css';

defineProps({
  header: String,
  serverResponse: String,
});

</script>

<template>
  <div class="api-response">
    <div class="api-response__header">
      {{ header }}
    </div>
    <pre v-highlightjs>
      <code class="json">
        {{ serverResponse }}
      </code>
    </pre>
  </div>
</template>

<style lang="scss" scoped>
.api-response {
  background-color: #2B2A44;
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  color: #ffffff;
  height: 530px;

  pre {
    max-height: 95%;
    overflow-y: scroll;
  }

  &__header {
    font-family: var(--bs-font-monospace);
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
  }

  .hljs {
    padding: 0;
    margin: 0;
  }

  pre {
    padding: 0;
    margin: 0;
    scrollbar-width: thin;
    scrollbar-color: hsl(0 0% 50%);

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #2B2A44;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: hsl(0 0% 50%);
      border-radius: 20px;
    }
  }

}
</style>
