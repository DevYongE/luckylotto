<template>
  <div class="w-full flex justify-center">
    <div class="w-full max-w-4xl">
      <div v-if="!isLoading && !result" class="animate-fade-in">
        <InputForm @submit="handleSubmit" />
      </div>
      
      <div v-if="isLoading" class="animate-fade-in">
        <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <LoadingSpinner />
        </div>
      </div>
      
      <div v-if="result && !isLoading" class="animate-fade-in">
        <ResultView :result="result" @reset="handleReset" />
      </div>
    </div>
  </div>
</template>

<script setup>
import InputForm from './InputForm.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ResultView from './ResultView.vue'

const isLoading = ref(false)
const result = ref(null)

const handleSubmit = async (formData) => {
  isLoading.value = true
  try {
    const response = await $fetch('/api/fortune', {
      method: 'POST',
      body: formData
    })
    result.value = response.result
  } catch (error) {
    console.error('Error:', error)
    alert('운세를 가져오는 중 오류가 발생했습니다.')
  } finally {
    isLoading.value = false
  }
}

const handleReset = () => {
  result.value = null
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 