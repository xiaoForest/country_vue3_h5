
<template></template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const list = ref([]);
const goToPage = (i) => {
  router.push({
    path: i.path,
    query: {},
  });
};
onMounted(() => {});
</script>


<style lang="scss">
</style>