<template>
  <div class="image-viewer-container">
    <div
      class="main-image"
      v-if="currentImage !== null"
    >
      <img
        :src="imageList[currentImage]"
        alt="Product image"
        fetchpriority="high"
      />
    </div>

    <Progress
      :model-value="getProgress"
      class="h-[700px]"
      orientation="vertical"
    />

    <div class="image-list">
      <div
        v-for="(image, index) in imageList"
        :key="index"
        class="image-list-item"
        :class="{ 'image-list-item-active': index === currentImage }"
        @click="handleImageClick(index)"
        role="button"
        :aria-label="'Select image ' + (index + 1)"
      >
        <img
          :src="image"
          :alt="'Product thumbnail ' + (index + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, withDefaults, onMounted } from 'vue';
import { Progress } from '@/ui';

const props = withDefaults(defineProps<{
  imageList: string[];
}>(), {
  imageList: () => [],
});

const preloadImages = (images: string[]) => {
  images.forEach((imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
  });
};

const currentImage = ref(props.imageList.length ? 0 : null);

const handleImageClick = (index: number) => {
  currentImage.value = index;
};

const getProgress = computed(() => {
  if (!props.imageList.length || currentImage.value === null) return 0;
  return ((currentImage.value + 1) / props.imageList.length) * 100;
});

onMounted(() => {
  preloadImages(props.imageList);
});

</script>

<style scoped>
.image-viewer-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.main-image {
  flex-grow: 1;
  width: 100%;
  max-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image img {
  max-width: 100%;
  max-height: 700px;
  object-fit: contain;
  object-position: center;
}

.image-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-end;
  gap: 0.5rem;
  max-width: 50px;
}

.image-list-item {
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: 0.5;
}

.image-list-item img {
  width: 100%;
  height: auto;
}

.image-list-item-active {
  opacity: 1;
}

@media (max-width: 768px) {
  .image-viewer-container {
    flex-direction: column;
  }

  .image-list {
    flex-direction: row;
    max-width: none;
    max-height: 50px;
  }
}
</style>
