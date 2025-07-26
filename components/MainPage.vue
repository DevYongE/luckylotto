<template>
  <div class="w-full">
    <!-- 입력 폼 -->
    <Transition name="slide-fade" mode="out-in">
      <div v-if="currentStep === 'input'" key="input">
        <InputForm @submit="handleSubmit" />
      </div>
      
      <!-- 로딩 -->
      <div v-else-if="currentStep === 'loading'" key="loading" class="glass rounded-3xl shadow-2xl border border-white/20">
        <LoadingSpinner />
      </div>
      
      <!-- 결과 -->
      <div v-else-if="currentStep === 'result'" key="result">
        <ResultView :result="result" :original-user-info="originalUserInfo" @reset="handleReset" @update-result="handleUpdateResult" />
      </div>
      
      <!-- 에러 -->
      <div v-else-if="currentStep === 'error'" key="error" class="glass rounded-3xl p-8 shadow-2xl border border-red-500/30 text-center">
        <div class="text-6xl mb-4">😵</div>
        <h3 class="text-2xl font-bold text-white mb-4">앗, 문제가 발생했어요!</h3>
        <p class="text-slate-300 mb-6">{{ errorMessage }}</p>
        <button 
          @click="handleReset"
          class="bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 rounded-2xl text-white font-semibold hover:scale-105 transition-all duration-300"
        >
          다시 시도하기
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import InputForm from './InputForm.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import ResultView from './ResultView.vue'

// 상태 관리
const currentStep = ref('input') // 'input', 'loading', 'result', 'error'
const result = ref(null)
const errorMessage = ref('')
const originalUserInfo = ref(null) // 원본 사용자 정보 저장

const handleSubmit = async (formData) => {
  currentStep.value = 'loading'
  errorMessage.value = ''
  originalUserInfo.value = formData // 원본 정보 저장
  
  try {
    const response = await $fetch('/api/fortune', {
      method: 'POST',
      body: formData,
      timeout: 30000
    })
    
    if (response?.result) {
      result.value = response.result
      currentStep.value = 'result'
    } else {
      throw new Error('서버에서 올바른 응답을 받지 못했습니다.')
    }
  } catch (error) {
    console.error('Fortune API Error:', error)
    
    // 에러 타입별 메시지 설정
    if (error.name === 'AbortError' || error.message.includes('timeout')) {
      errorMessage.value = '요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.'
    } else if (error.statusCode === 500) {
      errorMessage.value = 'AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해주세요.'
    } else if (error.statusCode === 429) {
      errorMessage.value = '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.'
    } else {
      errorMessage.value = '번호 생성 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.'
    }
    
    currentStep.value = 'error'
  }
}

const handleReset = () => {
  currentStep.value = 'input'
  result.value = null
  errorMessage.value = ''
  originalUserInfo.value = null
}

const handleUpdateResult = (newResult) => {
  result.value = newResult
}

// 컴포넌트가 마운트될 때 이전 상태 초기화
onMounted(() => {
  handleReset()
})
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
}

/* 페이지 전환 애니메이션 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style> 