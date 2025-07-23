<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
          <span class="text-2xl">📅</span>
        </div>
        <h2 class="text-3xl font-bold text-white mb-2" style="color: white !important;">당신의 정보를 입력해주세요</h2>
        <p class="text-purple-200" style="color: #c4b5fd !important;">사주 분석을 위한 기본 정보입니다</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- 생년월일 -->
        <div class="space-y-3">
          <label class="block text-lg font-semibold text-white" style="color: white !important;">
            <span class="inline-block w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold mr-2" style="color: white !important;">1</span>
            생년월일
          </label>
          <div class="relative">
            <input
              v-model="formData.birthDate"
              type="date"
              required
              class="w-full px-6 py-4 bg-white/20 border-2 border-purple-300/30 rounded-2xl text-white text-lg placeholder-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300"
              style="color: white !important; background-color: rgba(255,255,255,0.2) !important;"
              :max="new Date().toISOString().split('T')[0]"
            />
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300">
              📅
            </div>
          </div>
        </div>
        
        <!-- 성별 -->
        <div class="space-y-3">
          <label class="block text-lg font-semibold text-white" style="color: white !important;">
            <span class="inline-block w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold mr-2" style="color: white !important;">2</span>
            성별
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              @click="formData.gender = '남성'"
              :class="[
                'px-6 py-4 rounded-2xl border-2 text-lg font-semibold transition-all duration-300',
                formData.gender === '남성'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 text-white shadow-lg'
                  : 'bg-white/10 border-purple-300/30 text-purple-200 hover:bg-white/20 hover:border-purple-400'
              ]"
              style="color: white !important;"
            >
              <span class="text-2xl mr-2">👨</span>
              남성
            </button>
            <button
              type="button"
              @click="formData.gender = '여성'"
              :class="[
                'px-6 py-4 rounded-2xl border-2 text-lg font-semibold transition-all duration-300',
                formData.gender === '여성'
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 border-pink-400 text-white shadow-lg'
                  : 'bg-white/10 border-purple-300/30 text-purple-200 hover:bg-white/20 hover:border-purple-400'
              ]"
              style="color: white !important;"
            >
              <span class="text-2xl mr-2">👩</span>
              여성
            </button>
          </div>
        </div>
        
        <!-- 태어난 시간 -->
        <div class="space-y-3">
          <label class="block text-lg font-semibold text-white" style="color: white !important;">
            <span class="inline-block w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold mr-2" style="color: white !important;">3</span>
            태어난 시간 <span class="text-sm text-purple-300" style="color: #c4b5fd !important;">(선택사항)</span>
          </label>
          <div class="relative">
            <select
              v-model="formData.birthTime"
              class="w-full px-6 py-4 bg-white/20 border-2 border-purple-300/30 rounded-2xl text-white text-lg focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300 appearance-none"
              style="color: white !important; background-color: rgba(255,255,255,0.2) !important;"
            >
              <option value="" style="background-color: #1f2937 !important; color: white !important;">시간을 선택해주세요</option>
              <option value="자시 (23:00-01:00)" style="background-color: #1f2937 !important; color: white !important;">자시 (23:00-01:00)</option>
              <option value="축시 (01:00-03:00)" style="background-color: #1f2937 !important; color: white !important;">축시 (01:00-03:00)</option>
              <option value="인시 (03:00-05:00)" style="background-color: #1f2937 !important; color: white !important;">인시 (03:00-05:00)</option>
              <option value="묘시 (05:00-07:00)" style="background-color: #1f2937 !important; color: white !important;">묘시 (05:00-07:00)</option>
              <option value="진시 (07:00-09:00)" style="background-color: #1f2937 !important; color: white !important;">진시 (07:00-09:00)</option>
              <option value="사시 (09:00-11:00)" style="background-color: #1f2937 !important; color: white !important;">사시 (09:00-11:00)</option>
              <option value="오시 (11:00-13:00)" style="background-color: #1f2937 !important; color: white !important;">오시 (11:00-13:00)</option>
              <option value="미시 (13:00-15:00)" style="background-color: #1f2937 !important; color: white !important;">미시 (13:00-15:00)</option>
              <option value="신시 (15:00-17:00)" style="background-color: #1f2937 !important; color: white !important;">신시 (15:00-17:00)</option>
              <option value="유시 (17:00-19:00)" style="background-color: #1f2937 !important; color: white !important;">유시 (17:00-19:00)</option>
              <option value="술시 (19:00-21:00)" style="background-color: #1f2937 !important; color: white !important;">술시 (19:00-21:00)</option>
              <option value="해시 (21:00-23:00)" style="background-color: #1f2937 !important; color: white !important;">해시 (21:00-23:00)</option>
            </select>
            <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-300 pointer-events-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 제출 버튼 -->
        <div class="pt-6">
          <button
            type="submit"
            :disabled="!formData.birthDate || !formData.gender"
            class="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-6 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400/50 shadow-2xl"
            style="color: white !important;"
          >
            <span class="text-3xl mr-3">🔮</span>
            운세 보기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['submit'])

const formData = ref({
  birthDate: '',
  gender: '',
  birthTime: ''
})

const handleSubmit = () => {
  if (!formData.value.birthDate || !formData.value.gender) {
    alert('생년월일과 성별은 필수 입력사항입니다.')
    return
  }
  
  emit('submit', {
    birthDate: formData.value.birthDate,
    gender: formData.value.gender,
    birthTime: formData.value.birthTime || '모름'
  })
}
</script>

<style scoped>
/* 모든 텍스트 강제 색상 적용 */
* {
  color: white !important;
  font-family: 'Segoe UI', 'Malgun Gothic', system-ui, -apple-system, sans-serif !important;
}

/* select 옵션 스타일링 */
select option {
  background-color: #1f2937 !important;
  color: white !important;
  padding: 8px;
}

select option:hover {
  background-color: #374151 !important;
}

/* 포커스 시 배경색 변경 */
select:focus option:checked {
  background-color: #7c3aed !important;
}

/* 입력 필드 강제 스타일 */
input[type="date"] {
  color: white !important;
  background-color: rgba(255,255,255,0.2) !important;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  opacity: 0.8;
}

/* 버튼 텍스트 강제 적용 */
button {
  color: white !important;
}

/* 라벨 텍스트 강제 적용 */
label {
  color: white !important;
}
</style> 