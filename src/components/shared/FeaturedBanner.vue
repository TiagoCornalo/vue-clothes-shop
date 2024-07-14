<template>
  <section class="featured-banner-container animate">
    <slot class="featured-banner-content" />
    <img
      :src="image"
      alt="Featured banner"
      class="featured-image"
    />
  </section>
</template>

<script setup lang="ts">
defineProps({
  image: String
});

</script>

<style scoped>
.featured-banner-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 4rem 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }

  .featured-image {
    max-width: 50%;
    max-height: 750px;
    margin-right: 5rem;
    object-fit: contain;

    @media (max-width: 768px) {
      max-width: 100%;
      margin-right: 0;
    }
  }

}
</style>