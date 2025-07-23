<template>
  <div class="w-full max-w-4xl mx-auto space-y-8">
    <!-- 헤더 -->
    <div class="text-center mb-12">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mb-6 shadow-2xl">
        <span class="text-3xl">🎯</span>
      </div>
      <h2 class="text-4xl font-bold text-white mb-4">
        당신만의 특별한 번호
      </h2>
      <p class="text-xl text-slate-300">
        AI가 분석한 맞춤형 로또 번호입니다
      </p>
    </div>

    <!-- 로또 번호 세트들 -->
    <div class="space-y-6">
      <div
        v-for="(set, index) in lottoSets"
        :key="index"
        class="result-card"
      >
        <!-- 카드 헤더 -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center">
            <div class="number-badge">
              {{ index + 1 }}
            </div>
            <div class="ml-4">
              <h3 class="text-xl font-bold text-white">
                {{ set.title }}
              </h3>
              <p class="text-slate-400 text-sm">
                {{ set.description }}
              </p>
            </div>
          </div>
          <div class="lucky-tag">
            <span class="text-yellow-300">✨</span>
            {{ set.luck }}%
          </div>
        </div>

        <!-- 로또 번호 구슬들 -->
        <div class="numbers-container">
          <div class="numbers-grid">
            <div
              v-for="(number, numIndex) in set.numbers"
              :key="numIndex"
              :class="getNumberClass(number)"
              class="lotto-ball"
            >
              {{ number }}
            </div>
          </div>
        </div>

        <!-- 추가 정보 -->
        <div class="card-footer">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">합계</span>
              <span class="info-value">{{ set.sum }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">홀짝</span>
              <span class="info-value">{{ set.evenOdd }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">고저</span>
              <span class="info-value">{{ set.highLow }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 액션 버튼들 -->
    <div class="flex flex-col sm:flex-row gap-4 pt-8">
      <button
        @click="generateNew"
        class="action-btn primary-btn"
      >
        <span class="text-xl mr-2">🎲</span>
        새로운 번호 생성
      </button>
      <button
        @click="copyNumbers"
        class="action-btn secondary-btn"
      >
        <span class="text-xl mr-2">📋</span>
        번호 복사하기
      </button>
      <button
        @click="$emit('reset')"
        class="action-btn tertiary-btn"
      >
        <span class="text-xl mr-2">🔄</span>
        처음부터 다시
      </button>
    </div>

    <!-- 행운의 메시지 -->
    <div class="lucky-message">
      <div class="flex items-center mb-4">
        <span class="text-2xl mr-3">🍀</span>
        <h4 class="text-lg font-semibold text-white">오늘의 행운 메시지</h4>
      </div>
      <p class="text-slate-300 text-lg leading-relaxed">
        {{ luckyMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  result: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['reset'])

// 로또 번호 세트 생성
const lottoSets = computed(() => {
  if (!props.result?.lottoNumbers) return []
  
  return props.result.lottoNumbers.map((numbers, index) => {
    const sum = numbers.reduce((a, b) => a + b, 0)
    const evenCount = numbers.filter(n => n % 2 === 0).length
    const highCount = numbers.filter(n => n > 25).length
    
    return {
      title: `${index + 1}번 조합`,
      description: getSetDescription(index),
      numbers: numbers.sort((a, b) => a - b),
      sum,
      evenOdd: `${evenCount}:${6 - evenCount}`,
      highLow: `${6 - highCount}:${highCount}`,
      luck: Math.floor(Math.random() * 20) + 80
    }
  })
})

const luckyMessage = computed(() => {
  const messages = [
    "행운은 준비된 자에게 찾아옵니다. 오늘이 바로 그 날일지도 모르겠네요!",
    "당신의 긍정적인 에너지가 좋은 결과를 불러올 것입니다.",
    "숫자 속에 담긴 의미를 믿고 도전해보세요. 꿈은 이루어집니다!",
    "오늘의 선택이 내일의 행운이 될 수 있습니다. 용기를 가지세요!",
    "운명은 우연이 아닙니다. 당신의 의지와 행동이 만들어갑니다."
  ]
  return messages[Math.floor(Math.random() * messages.length)]
})

const getSetDescription = (index) => {
  const descriptions = [
    "균형잡힌 황금 조합",
    "직감과 논리의 만남",
    "운명이 선택한 번호",
    "특별한 의미의 조합"
  ]
  return descriptions[index] || "행운의 번호"
}

const getNumberClass = (number) => {
  if (number <= 10) return 'ball-yellow'
  if (number <= 20) return 'ball-blue'
  if (number <= 30) return 'ball-red'
  if (number <= 40) return 'ball-gray'
  return 'ball-green'
}

const generateNew = () => {
  // 새로운 번호 생성 로직
  alert('새로운 번호를 생성합니다!')
}

const copyNumbers = () => {
  const allNumbers = lottoSets.value.map(set => 
    set.numbers.join(', ')
  ).join('\n')
  
  navigator.clipboard.writeText(allNumbers).then(() => {
    alert('번호가 클립보드에 복사되었습니다!')
  })
}
</script>

<style scoped>
.result-card {
  @apply glass rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-102 transition-all duration-300;
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
}

.number-badge {
  @apply w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg;
}

.lucky-tag {
  @apply bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 rounded-full border border-yellow-400/30 text-yellow-200 text-sm font-semibold;
}

.numbers-container {
  @apply bg-black/20 rounded-2xl p-6 mb-6;
}

.numbers-grid {
  @apply flex flex-wrap justify-center gap-4;
}

.lotto-ball {
  @apply w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white/20 transform hover:scale-110 transition-all duration-300 cursor-pointer;
}

.ball-yellow { @apply bg-gradient-to-br from-yellow-400 to-yellow-600; }
.ball-blue { @apply bg-gradient-to-br from-blue-400 to-blue-600; }
.ball-red { @apply bg-gradient-to-br from-red-400 to-red-600; }
.ball-gray { @apply bg-gradient-to-br from-gray-400 to-gray-600; }
.ball-green { @apply bg-gradient-to-br from-green-400 to-green-600; }

.card-footer {
  @apply bg-white/5 rounded-xl p-4;
}

.info-grid {
  @apply grid grid-cols-3 gap-4;
}

.info-item {
  @apply text-center;
}

.info-label {
  @apply block text-slate-400 text-xs uppercase tracking-wide mb-1;
}

.info-value {
  @apply text-white font-semibold;
}

.action-btn {
  @apply flex items-center justify-center px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95;
}

.primary-btn {
  @apply bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl;
}

.secondary-btn {
  @apply bg-white/10 text-white border border-white/20 hover:bg-white/20;
}

.tertiary-btn {
  @apply bg-slate-600/50 text-slate-300 hover:bg-slate-600/70;
}

.lucky-message {
  @apply glass rounded-2xl p-6 text-center;
}

/* 애니메이션 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.result-card {
  animation: slideInUp 0.6s ease-out forwards;
}

.result-card:nth-child(1) { animation-delay: 0.1s; }
.result-card:nth-child(2) { animation-delay: 0.2s; }
.result-card:nth-child(3) { animation-delay: 0.3s; }
.result-card:nth-child(4) { animation-delay: 0.4s; }

.lotto-ball {
  animation: slideInUp 0.5s ease-out forwards;
}

.lotto-ball:nth-child(1) { animation-delay: 0.1s; }
.lotto-ball:nth-child(2) { animation-delay: 0.2s; }
.lotto-ball:nth-child(3) { animation-delay: 0.3s; }
.lotto-ball:nth-child(4) { animation-delay: 0.4s; }
.lotto-ball:nth-child(5) { animation-delay: 0.5s; }
.lotto-ball:nth-child(6) { animation-delay: 0.6s; }
</style> 