<template>
  <div class="loading-container">
    <div class="text-center">
      <!-- 메인 로딩 애니메이션 -->
      <div class="relative mb-8">
        <div class="loading-circle">
          <div class="loading-dot loading-dot-1"></div>
          <div class="loading-dot loading-dot-2"></div>
          <div class="loading-dot loading-dot-3"></div>
          <div class="loading-dot loading-dot-4"></div>
        </div>
        <div class="loading-center">
          <span class="text-4xl">🎰</span>
        </div>
      </div>
      
      <!-- 로딩 텍스트 -->
      <div class="space-y-4">
        <h3 class="text-2xl font-bold text-white">
          AI가 분석 중입니다
        </h3>
        <div class="loading-text-container">
          <p class="text-slate-300 text-lg loading-text">
            {{ currentMessage }}
          </p>
        </div>
        
        <!-- 진행률 바 -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="text-sm text-slate-400 mt-2">{{ progress }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = [
  '당신의 정보를 분석하고 있습니다...',
  '행운의 패턴을 찾고 있습니다...',
  '특별한 숫자 조합을 계산하고 있습니다...',
  '최적의 로또 번호를 생성하고 있습니다...',
  '거의 완료되었습니다...'
]

const currentMessage = ref(messages[0])
const progress = ref(0)
let messageIndex = 0

// 메시지 변경
const changeMessage = () => {
  messageIndex = (messageIndex + 1) % messages.length
  currentMessage.value = messages[messageIndex]
}

// 진행률 업데이트
const updateProgress = () => {
  if (progress.value < 95) {
    progress.value += Math.random() * 15 + 5
    if (progress.value > 95) progress.value = 95
  }
}

onMounted(() => {
  const messageInterval = setInterval(changeMessage, 2000)
  const progressInterval = setInterval(updateProgress, 800)
  
  onBeforeUnmount(() => {
    clearInterval(messageInterval)
    clearInterval(progressInterval)
  })
})
</script>

<style scoped>
.loading-container {
  @apply py-12 px-8;
}

.loading-circle {
  @apply relative w-32 h-32 mx-auto;
}

.loading-dot {
  @apply absolute w-4 h-4 rounded-full;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  animation: loading-rotate 2s linear infinite;
}

.loading-dot-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 0s;
}

.loading-dot-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation-delay: 0.5s;
}

.loading-dot-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: 1s;
}

.loading-dot-4 {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  animation-delay: 1.5s;
}

.loading-center {
  @apply absolute inset-0 flex items-center justify-center;
}

.loading-text-container {
  @apply h-8 flex items-center justify-center;
}

.loading-text {
  animation: loading-text-fade 2s ease-in-out infinite;
}

.progress-container {
  @apply max-w-sm mx-auto;
}

.progress-bar {
  @apply w-full h-2 bg-white/10 rounded-full overflow-hidden;
}

.progress-fill {
  @apply h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out;
}

/* 애니메이션 */
@keyframes loading-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateY(-40px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateY(-40px) rotate(-360deg);
  }
}

@keyframes loading-text-fade {
  0%, 80%, 100% {
    opacity: 1;
  }
  10%, 70% {
    opacity: 0.6;
  }
}

/* 펄스 효과 */
.loading-center span {
  animation: loading-pulse 2s ease-in-out infinite;
}

@keyframes loading-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

/* 진입 애니메이션 */
.loading-container {
  animation: loading-enter 0.5s ease-out;
}

@keyframes loading-enter {
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