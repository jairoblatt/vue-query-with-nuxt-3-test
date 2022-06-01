<script setup lang="ts">
import { useInfiniteQuery, useQuery } from "./composable/useQuery";
import { getDog } from "./services";

const { data, isFetching } = await useQuery("simple-query-key", async () => {
  return await getDog();
});

// const {
//   data,
//   isFetching,
//   fetchNextPage,
//   fetchPreviousPage,
// } = await useInfiniteQuery(
//   "infinite-query-key",
//   ({ pageParam = 1 }) => getDog(pageParam),
//   {
//     getNextPageParam: ({ page }) => page + 1,
//     getPreviousPageParam: ({ page }) => page - 1,
//   }
// );

// const messages = computed(() => {
//   return data.value?.pages.flatMap(({ results }) => results) || [];
// });
</script>

<template>
  <p>{{ data }}</p>
  <p v-if="isFetching">Loading...</p>
  <!-- <p v-for="m of messages">{{ m }}</p>
  <button @click="fetchNextPage()">Next</button>
  <button @click="fetchPreviousPage()">Previous</button> -->
</template>
<style>
* {
  margin: 0;
  padding: 0;
}

p {
  color: white;
  width: 400px;
}

div {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

body,
#__nuxt {
  background-color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
