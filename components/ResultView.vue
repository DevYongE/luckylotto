<template>
  <div>
    <div class="text-center mb-8">
      <div class="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
        <span class="text-3xl">✨</span>
      </div>
      <h2 class="text-3xl font-bold text-white mb-2" style="color: white !important;">🔮 당신의 운세 결과</h2>
      <p class="text-purple-200 text-lg" style="color: #c4b5fd !important;">AI가 분석한 맞춤형 운세입니다</p>
    </div>
    
    <div class="space-y-8">
      <!-- 주간 운세 -->
      <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-white mb-2" style="color: white !important;">📅 이번 주 요일별 운세</h3>
          <p class="text-purple-200" style="color: #c4b5fd !important;">각 요일별 상세한 운세를 확인해보세요</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="(fortune, day, index) in weeklyFortune"
            :key="day"
            :class="getDayCardClass(day)"
            class="relative overflow-hidden rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105 border-2"
          >
            <!-- 배경 패턴 -->
            <div class="absolute top-0 right-0 w-20 h-20 opacity-10">
              <div class="text-4xl">{{ getDayEmoji(day) }}</div>
            </div>
            
            <!-- 카드 헤더 -->
            <div class="relative z-10 mb-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <div :class="getDayIconClass(day)" class="w-12 h-12 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <span class="text-xl">{{ getDayEmoji(day) }}</span>
                  </div>
                  <div>
                    <h4 class="text-lg font-bold text-white" style="color: white !important;">{{ day }}</h4>
                    <p class="text-xs opacity-80" style="color: white !important;">{{ getDaySubtitle(day) }}</p>
                  </div>
                </div>
                <div :class="getDayBadgeClass(day)" class="px-3 py-1 rounded-full text-xs font-semibold">
                  {{ getDayKeyword(day) }}
                </div>
              </div>
              
              <!-- 운세 내용 -->
              <div class="bg-black/20 rounded-xl p-4 backdrop-blur-sm">
                <p class="text-white leading-relaxed text-sm" style="color: white !important;">{{ fortune }}</p>
              </div>
            </div>
            
            <!-- 하단 장식 -->
            <div class="absolute bottom-0 left-0 w-full h-1" :class="getDayAccentClass(day)"></div>
          </div>
        </div>
      </div>
      
      <!-- 로또 번호 -->
      <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
        <div class="text-center mb-8">
          <div class="inline-block p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
            <span class="text-2xl">🎰</span>
          </div>
          <h3 class="text-2xl font-bold text-white mb-2" style="color: white !important;">🎰 사주 기반 로또 번호 추천</h3>
          <p class="text-purple-200" style="color: #c4b5fd !important;">당신의 사주와 조화를 이루는 행운의 번호들입니다</p>
        </div>
        
        <div class="space-y-6">
          <div
            v-for="(numbers, index) in lottoNumbers"
            :key="index"
            class="bg-gradient-to-r from-white/15 to-white/8 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/30 hover:border-yellow-400/70 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-600 rounded-full flex items-center justify-center mr-4 shadow-lg border-2 border-white/20">
                  <span class="text-white font-bold text-lg" style="color: white !important;">{{ index + 1 }}</span>
                </div>
                <div>
                  <span class="text-xl font-bold text-white" style="color: white !important;">{{ index + 1 }}번 조합</span>
                  <p class="text-sm text-purple-200" style="color: #ddd6fe !important;">행운의 번호</p>
                </div>
              </div>
              <div class="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 px-4 py-2 rounded-full border border-yellow-400/50">
                <span class="text-yellow-100 text-sm font-bold" style="color: #fef3c7 !important;">🍀 Lucky Set</span>
              </div>
            </div>
            
            <!-- 로또 번호들 -->
            <div class="flex flex-wrap items-center justify-center gap-6 bg-gradient-to-br from-black/30 to-black/20 rounded-3xl p-8 border border-white/10">
              <!-- 번호 표시 -->
              <div class="w-full text-center mb-4">
                <p class="text-sm text-purple-300" style="color: #d1d5db !important;">개별 로또 공</p>
              </div>
              
              <div
                v-for="(number, numIndex) in numbers"
                :key="`${index}-${numIndex}-${number}`"
                class="relative group"
              >
                <!-- 로또 공 외부 링 -->
                <div class="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 group-hover:shadow-3xl transition-all duration-300">
                    <!-- 로또 공 메인 -->
                    <div
                      :class="['w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-all duration-300 relative overflow-hidden', getLottoNumberClass(number)]"
                    >
                      <!-- 하이라이트 효과 -->
                      <div class="absolute top-1.5 left-3 w-5 h-5 bg-white/50 rounded-full blur-sm"></div>
                      <div class="absolute top-0.5 left-2 w-3 h-3 bg-white/30 rounded-full"></div>

                      <!-- 번호 텍스트 -->
                      <span class="relative z-20 font-black text-xl drop-shadow-lg" style="text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        {{ number }}
                      </span>
                    </div>

                    <!-- 번호 아래 작은 라벨 -->
                  </div>
                  <div class="text-center mt-2">
                    <span class="text-xs text-purple-300" style="color: #c4b5fd !important;">{{ number }}</span>
                  </div>
                                <!-- 번호 아래 작은 라벨 -->
                <div class="text-center mt-2">
                  <span class="text-xs text-purple-300" style="color: #c4b5fd !important;">{{ number }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 액션 버튼들 -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
          @click="copyResult"
          class="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50 shadow-2xl flex items-center justify-center"
          style="color: white !important;"
        >
          <span class="text-2xl mr-3">📋</span>
          결과 복사
        </button>
        <button
          @click="$emit('reset')"
          class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50 shadow-2xl flex items-center justify-center"
          style="color: white !important;"
        >
          <span class="text-2xl mr-3">🔄</span>
          다시하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  result: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['reset'])

// 요일별 이모지 매핑
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

// 요일별 카드 클래스
const getDayCardClass = (day) => {
  const classMap = {
    '월요일': 'bg-gradient-to-br from-blue-600/80 to-indigo-700/80 border-blue-400/50',
    '화요일': 'bg-gradient-to-br from-red-600/80 to-orange-700/80 border-red-400/50',
    '수요일': 'bg-gradient-to-br from-cyan-600/80 to-blue-700/80 border-cyan-400/50',
    '목요일': 'bg-gradient-to-br from-green-600/80 to-emerald-700/80 border-green-400/50',
    '금요일': 'bg-gradient-to-br from-yellow-600/80 to-orange-700/80 border-yellow-400/50',
    '토요일': 'bg-gradient-to-br from-purple-600/80 to-violet-700/80 border-purple-400/50',
    '일요일': 'bg-gradient-to-br from-orange-600/80 to-red-700/80 border-orange-400/50'
  }
  return classMap[day] || 'bg-gradient-to-br from-gray-600/80 to-gray-700/80 border-gray-400/50'
}

// 요일별 아이콘 클래스
const getDayIconClass = (day) => {
  const classMap = {
    '월요일': 'bg-blue-500/90',
    '화요일': 'bg-red-500/90',
    '수요일': 'bg-cyan-500/90',
    '목요일': 'bg-green-500/90',
    '금요일': 'bg-yellow-500/90',
    '토요일': 'bg-purple-500/90',
    '일요일': 'bg-orange-500/90'
  }
  return classMap[day] || 'bg-gray-500/90'
}

// 요일별 뱃지 클래스
const getDayBadgeClass = (day) => {
  const classMap = {
    '월요일': 'bg-blue-500/30 text-blue-100',
    '화요일': 'bg-red-500/30 text-red-100',
    '수요일': 'bg-cyan-500/30 text-cyan-100',
    '목요일': 'bg-green-500/30 text-green-100',
    '금요일': 'bg-yellow-500/30 text-yellow-100',
    '토요일': 'bg-purple-500/30 text-purple-100',
    '일요일': 'bg-orange-500/30 text-orange-100'
  }
  return classMap[day] || 'bg-gray-500/30 text-gray-100'
}

// 요일별 하단 액센트 클래스
const getDayAccentClass = (day) => {
  const classMap = {
    '월요일': 'bg-gradient-to-r from-blue-400 to-indigo-500',
    '화요일': 'bg-gradient-to-r from-red-400 to-orange-500',
    '수요일': 'bg-gradient-to-r from-cyan-400 to-blue-500',
    '목요일': 'bg-gradient-to-r from-green-400 to-emerald-500',
    '금요일': 'bg-gradient-to-r from-yellow-400 to-orange-500',
    '토요일': 'bg-gradient-to-r from-purple-400 to-violet-500',
    '일요일': 'bg-gradient-to-r from-orange-400 to-red-500'
  }
  return classMap[day] || 'bg-gradient-to-r from-gray-400 to-gray-500'
}

// 요일별 서브타이틀
const getDaySubtitle = (day) => {
  const subtitleMap = {
    '월요일': '새로운 시작',
    '화요일': '열정의 날',
    '수요일': '균형의 날',
    '목요일': '성장의 날',
    '금요일': '성취의 날',
    '토요일': '휴식의 날',
    '일요일': '충전의 날'
  }
  return subtitleMap[day] || '특별한 날'
}

// 요일별 키워드
const getDayKeyword = (day) => {
  const keywordMap = {
    '월요일': '시작',
    '화요일': '열정',
    '수요일': '균형',
    '목요일': '성장',
    '금요일': '성취',
    '토요일': '휴식',
    '일요일': '재충전'
  }
  return keywordMap[day] || '운세'
}

// 로또 번호별 색상 - 실제 로또와 같은 색상
const getLottoNumberClass = (number) => {
  if (number <= 10) return 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900 border-2 border-yellow-200/50' // 노란색
  if (number <= 20) return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 text-white border-2 border-blue-200/50'   // 파란색
  if (number <= 30) return 'bg-gradient-to-br from-red-400 via-red-500 to-red-700 text-white border-2 border-red-200/50'    // 빨간색
  if (number <= 40) return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700 text-white border-2 border-gray-200/50'   // 회색
  return 'bg-gradient-to-br from-green-400 via-green-500 to-green-700 text-white border-2 border-green-200/50'                     // 초록색
}

// 결과 텍스트를 파싱하여 구조화된 데이터로 변환
const weeklyFortune = computed(() => {
  const fortuneMap = {}
  const lines = props.result.split('\n')
  let currentDay = ''
  
  lines.forEach(line => {
    // 요일 패턴 찾기
    const dayPatterns = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
    const foundDay = dayPatterns.find(day => line.includes(day))
    
    if (foundDay) {
      currentDay = foundDay
      // 요일 뒤의 콘텐츠 추출
      const content = line.replace(foundDay, '').replace(':', '').trim()
      if (content) {
        fortuneMap[currentDay] = content
      }
    } else if (currentDay && line.trim() && !line.includes('로또') && !line.includes('번:')) {
      // 현재 요일의 운세 내용 추가 (로또 번호 라인은 제외)
      if (fortuneMap[currentDay]) {
        fortuneMap[currentDay] += ' ' + line.trim()
      } else {
        fortuneMap[currentDay] = line.trim()
      }
    }
  })
  
  // 빈 운세가 있다면 기본 메시지 추가
  const defaultMessages = {
    '월요일': '새로운 시작의 기운이 가득한 날입니다. 적극적으로 도전해보세요.',
    '화요일': '열정적인 에너지가 넘치는 날입니다. 중요한 결정을 내리기 좋은 때입니다.',
    '수요일': '균형과 조화를 이루는 날입니다. 관계 개선에 좋은 하루가 될 것입니다.',
    '목요일': '성장과 발전의 기회가 다가오는 날입니다. 학습과 연구에 집중하세요.',
    '금요일': '성취와 완성의 기운이 강한 날입니다. 마무리 작업에 집중하세요.',
    '토요일': '휴식과 재충전의 시간입니다. 여유로운 마음으로 하루를 보내세요.',
    '일요일': '새로운 계획을 세우고 내일을 준비하는 날입니다. 가족과 함께하는 시간을 늘려보세요.'
  }
  
  // 각 요일에 대해 운세가 없으면 기본 메시지 추가
  Object.keys(defaultMessages).forEach(day => {
    if (!fortuneMap[day] || fortuneMap[day].length < 10) {
      fortuneMap[day] = defaultMessages[day]
    }
  })
  
  return fortuneMap
})

const lottoNumbers = computed(() => {
  const numbers = []
  const lines = props.result.split('\n')
  
  lines.forEach(line => {
    // 더 정확한 로또 번호 패턴 찾기
    // "1번: 3, 15, 22, 27, 34, 41" 형태를 찾습니다
    const numberMatch = line.match(/(\d+)번:\s*(\d{1,2}),?\s*(\d{1,2}),?\s*(\d{1,2}),?\s*(\d{1,2}),?\s*(\d{1,2}),?\s*(\d{1,2})/)
    
    if (numberMatch && numbers.length < 5) {
      const lottoSet = [
        parseInt(numberMatch[2]),
        parseInt(numberMatch[3]),
        parseInt(numberMatch[4]),
        parseInt(numberMatch[5]),
        parseInt(numberMatch[6]),
        parseInt(numberMatch[7])
      ]
      
      // 유효한 로또 번호인지 확인 (1-45 범위)
      const isValid = lottoSet.every(num => num >= 1 && num <= 45)
      if (isValid) {
        numbers.push(lottoSet)
      }
    }
  })
  
  // 만약 파싱된 번호가 없거나 부족하면 샘플 데이터 제공
  if (numbers.length === 0) {
    return [
      [3, 15, 22, 27, 34, 41],
      [6, 11, 18, 29, 35, 42],
      [8, 17, 23, 30, 36, 44],
      [5, 13, 21, 28, 37, 45],
      [1, 12, 19, 26, 32, 40]
    ]
  }
  
  // 부족한 세트는 샘플로 채우기
  while (numbers.length < 5) {
    const sampleSets = [
      [3, 15, 22, 27, 34, 41],
      [6, 11, 18, 29, 35, 42],
      [8, 17, 23, 30, 36, 44],
      [5, 13, 21, 28, 37, 45],
      [1, 12, 19, 26, 32, 40]
    ]
    numbers.push(sampleSets[numbers.length])
  }
  
  return numbers.slice(0, 5) // 정확히 5개만 반환
})

const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(props.result)
    alert('결과가 클립보드에 복사되었습니다!')
  } catch (error) {
    console.error('복사 실패:', error)
    alert('복사에 실패했습니다.')
  }
}
</script>

<style scoped>
/* 모든 텍스트 강제 색상 적용 */
* {
  color: white !important;
  font-family: 'Segoe UI', 'Malgun Gothic', system-ui, -apple-system, sans-serif !important;
}

/* 로또 공 추가 효과 */
.group:hover .w-20 {
  transform: translateY(-2px);
}

/* 그림자 효과 개선 */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* 로또 번호 텍스트 개선 */
.font-black {
  font-weight: 900;
  letter-spacing: -0.025em;
}

/* 호버 시 글로우 효과 */
.group:hover [class*="bg-gradient-to-br"] {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* 번호별 특별 글로우 효과 */
.bg-gradient-to-br.from-yellow-300:hover {
  box-shadow: 0 0 25px rgba(255, 235, 59, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

.bg-gradient-to-br.from-blue-400:hover {
  box-shadow: 0 0 25px rgba(33, 150, 243, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

.bg-gradient-to-br.from-red-400:hover {
  box-shadow: 0 0 25px rgba(244, 67, 54, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

.bg-gradient-to-br.from-gray-400:hover {
  box-shadow: 0 0 25px rgba(158, 158, 158, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

.bg-gradient-to-br.from-green-400:hover {
  box-shadow: 0 0 25px rgba(76, 175, 80, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}
</style> 