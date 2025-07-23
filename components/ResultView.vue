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

    <!-- 주간 운세 -->
    <div v-if="weeklyFortune && Object.keys(weeklyFortune).length > 0" class="result-card mb-8">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span class="text-xl">📅</span>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-bold text-white">
              이번 주 운세
            </h3>
            <p class="text-slate-400 text-sm">
              월요일부터 일요일까지
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="(dayInfo, day) in weeklyFortune"
          :key="day"
          class="weekly-card"
        >
          <div class="flex items-center mb-3">
            <div class="day-icon">
              {{ getDayEmoji(day) }}
            </div>
            <div class="ml-3">
              <div class="text-white font-semibold">{{ day }}</div>
              <div class="text-slate-400 text-xs">{{ dayInfo.date }}</div>
            </div>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed">
            {{ dayInfo.fortune }}
          </p>
        </div>
      </div>
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

// 주간 운세 데이터
const weeklyFortune = computed(() => {
  return props.result?.weeklyFortune || null
})

// 요일별 이모지
const getDayEmoji = (day) => {
  const emojiMap = {
    '월요일': '🌙',
    '화요일': '🔥', 
    '수요일': '💧',
    '목요일': '🌳',
    '금요일': '⚡',
    '토요일': '🌍',
    '일요일': '☀️'
  }
  return emojiMap[day] || '📅'
}

// 로또 번호 세트 생성
const lottoSets = computed(() => {
  let lottoNumbers = []
  
  // 새로운 API 응답 형식 처리
  if (props.result?.lottoNumbers) {
    lottoNumbers = props.result.lottoNumbers
  }
  // 기존 형식도 지원 (fallback)
  else if (Array.isArray(props.result)) {
    lottoNumbers = props.result
  }
  // 빈 배열일 경우 샘플 데이터
  else {
    lottoNumbers = [
      [3, 15, 22, 27, 34, 41],
      [6, 11, 18, 29, 35, 42],
      [8, 17, 23, 30, 36, 44],
      [5, 13, 21, 28, 37, 45],
      [1, 12, 19, 26, 32, 40]
    ]
  }
  
  return lottoNumbers.map((numbers, index) => {
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform: scale(1);
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: scale(1.02);
}

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
}

.number-badge {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.lucky-tag {
  background: linear-gradient(to right, rgba(234, 179, 8, 0.2), rgba(249, 115, 22, 0.2));
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(251, 191, 36, 0.3);
  color: #fde047;
  font-size: 0.875rem;
  font-weight: 600;
}

.numbers-container {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.numbers-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.lotto-ball {
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transform: scale(1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.lotto-ball:hover {
  transform: scale(1.1);
}

.ball-yellow { 
  background: linear-gradient(to bottom right, #facc15, #ca8a04);
}

.ball-blue { 
  background: linear-gradient(to bottom right, #60a5fa, #2563eb);
}

.ball-red { 
  background: linear-gradient(to bottom right, #f87171, #dc2626);
}

.ball-gray { 
  background: linear-gradient(to bottom right, #9ca3af, #4b5563);
}

.ball-green { 
  background: linear-gradient(to bottom right, #4ade80, #16a34a);
}

.card-footer {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.info-item {
  text-align: center;
}

.info-label {
  display: block;
  color: #94a3b8;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.info-value {
  color: white;
  font-weight: 600;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  transform: scale(1);
  cursor: pointer;
  border: none;
}

.action-btn:hover {
  transform: scale(1.05);
}

.action-btn:active {
  transform: scale(0.95);
}

.primary-btn {
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.primary-btn:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.tertiary-btn {
  background: rgba(71, 85, 105, 0.5);
  color: #cbd5e1;
}

.tertiary-btn:hover {
  background: rgba(71, 85, 105, 0.7);
}

.lucky-message {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
}

.weekly-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  transition: all 0.3s ease;
  transform: scale(1);
}

.weekly-card:hover {
  transform: scale(1.02);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.day-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
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