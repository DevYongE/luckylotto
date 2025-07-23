<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="glass rounded-3xl p-8 shadow-2xl border border-white/20">
      <!-- 헤더 -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
          <span class="text-2xl">✨</span>
        </div>
        <h2 class="text-3xl font-bold text-white mb-2">
          정보 입력
        </h2>
        <p class="text-slate-300">
          당신의 특별한 번호를 찾아드릴게요
        </p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 이름 -->
        <div class="form-group">
          <label class="form-label">
            <span class="step-number">1</span>
            이름
          </label>
          <input
            v-model="formData.name"
            type="text"
            required
            placeholder="이름을 입력해주세요"
            class="form-input"
          />
        </div>

        <!-- 생년월일 -->
        <div class="form-group">
          <label class="form-label">
            <span class="step-number">2</span>
            생년월일
          </label>
          <input
            v-model="formData.birthDate"
            type="date"
            required
            class="form-input"
            :max="new Date().toISOString().split('T')[0]"
          />
        </div>
        
        <!-- 성별 -->
        <div class="form-group">
          <label class="form-label">
            <span class="step-number">3</span>
            성별
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              type="button"
              @click="formData.gender = '남성'"
              :class="[
                'gender-btn',
                formData.gender === '남성' ? 'gender-btn-active' : 'gender-btn-inactive'
              ]"
            >
              <span class="text-2xl mb-1">👨</span>
              남성
            </button>
            <button
              type="button"
              @click="formData.gender = '여성'"
              :class="[
                'gender-btn',
                formData.gender === '여성' ? 'gender-btn-active' : 'gender-btn-inactive'
              ]"
            >
              <span class="text-2xl mb-1">👩</span>
              여성
            </button>
          </div>
        </div>
        
        <!-- 출생시간 -->
        <div class="form-group">
          <label class="form-label">
            <span class="step-number">4</span>
            출생시간
            <span class="text-sm text-slate-400 ml-2">(선택사항)</span>
          </label>
          <div class="grid grid-cols-2 gap-3">
            <select v-model="formData.birthHour" class="form-select">
              <option value="">시</option>
              <option v-for="hour in 24" :key="hour" :value="hour - 1">
                {{ String(hour - 1).padStart(2, '0') }}시
              </option>
            </select>
            <select v-model="formData.birthMinute" class="form-select">
              <option value="">분</option>
              <option v-for="minute in [0, 15, 30, 45]" :key="minute" :value="minute">
                {{ String(minute).padStart(2, '0') }}분
              </option>
            </select>
          </div>
        </div>
        
        <!-- 특별한 의미가 있는 숫자 -->
        <div class="form-group">
          <label class="form-label">
            <span class="step-number">5</span>
            특별한 숫자
            <span class="text-sm text-slate-400 ml-2">(선택사항)</span>
          </label>
          <input
            v-model="formData.luckyNumbers"
            type="text"
            placeholder="예: 7, 13, 25 (쉼표로 구분)"
            class="form-input"
          />
          <p class="text-xs text-slate-400 mt-2">
            좋아하는 숫자나 의미 있는 숫자를 입력해주세요
          </p>
        </div>
        
        <!-- 제출 버튼 -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="!isFormValid"
            class="submit-btn"
            :class="isFormValid ? 'submit-btn-active' : 'submit-btn-disabled'"
          >
            <span class="flex items-center justify-center">
              <span class="text-xl mr-2">🎯</span>
              나만의 로또 번호 받기
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['submit'])

const formData = reactive({
  name: '',
  birthDate: '',
  gender: '',
  birthHour: '',
  birthMinute: '',
  luckyNumbers: ''
})

const isFormValid = computed(() => {
  return formData.name.trim() && formData.birthDate && formData.gender
})

const handleSubmit = () => {
  if (!isFormValid.value) return
  
  const submitData = {
    ...formData,
    luckyNumbers: formData.luckyNumbers
      ? formData.luckyNumbers.split(',').map(n => n.trim()).filter(n => n)
      : []
  }
  
  emit('submit', submitData)
}
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  @apply space-y-3;
}

.form-label {
  @apply flex items-center text-lg font-semibold text-white;
}

.step-number {
  @apply inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold mr-3 flex-shrink-0;
}

.form-input {
  @apply w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm;
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.15);
}

.form-select {
  @apply w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-sm appearance-none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.form-select option {
  @apply bg-slate-800 text-white;
}

.gender-btn {
  @apply flex flex-col items-center justify-center px-6 py-6 rounded-2xl border text-lg font-semibold transition-all duration-300 transform;
}

.gender-btn-active {
  @apply bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white shadow-lg scale-105;
}

.gender-btn-inactive {
  @apply bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:border-white/30 hover:scale-102;
}

.submit-btn {
  @apply w-full px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform;
}

.submit-btn-active {
  @apply bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95;
}

.submit-btn-disabled {
  @apply bg-slate-600/50 text-slate-400 cursor-not-allowed;
}

/* 애니메이션 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  animation: fadeInUp 0.6s ease-out forwards;
}

.form-group:nth-child(1) { animation-delay: 0.1s; }
.form-group:nth-child(2) { animation-delay: 0.2s; }
.form-group:nth-child(3) { animation-delay: 0.3s; }
.form-group:nth-child(4) { animation-delay: 0.4s; }
.form-group:nth-child(5) { animation-delay: 0.5s; }
.form-group:nth-child(6) { animation-delay: 0.6s; }
</style> 