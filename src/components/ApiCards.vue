<script setup>
import ApiCard from './ApiCard.vue';

defineProps({
  cardList: Array,
})

const emit = defineEmits(['set-active-card']);

const setActiveCard = (event) => {
  emit('set-active-card', event.currentTarget.id);
}
</script>

<template>
  <div class="api-cards">
    <ApiCard v-for="{ id, title, description } in cardList" :id="id" :key="id" :title="title" :description="description" @click="setActiveCard" />
  </div>

</template>

<style lang="scss">
.api-cards {
  margin-top: 65px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
</style>
