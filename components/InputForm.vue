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
          <div class="gender-container">
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
  margin-bottom: 1.5rem;
}

.form-group > * + * {
  margin-top: 0.75rem;
}

.gender-container {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.form-label {
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  border-radius: 9999px;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.form-input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  color: white;
  font-size: 1.125rem;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: rgba(148, 163, 184, 1);
}

.form-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5);
}

.form-select {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  color: white;
  font-size: 1.125rem;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.form-select:focus {
  outline: none;
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5);
}

.form-select option {
  background-color: #1e293b;
  color: white;
}

.gender-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid;
  font-size: 1.125rem;
  font-weight: 600;
  transition: all 0.3s ease;
  transform: scale(1);
  cursor: pointer;
  flex: 1;
  min-height: 4rem;
}

.gender-btn:hover {
  transform: scale(1.02);
}

.gender-btn-active {
  background: linear-gradient(to right, #8b5cf6, #ec4899);
  border-color: #a855f7;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: scale(1.05);
}

.gender-btn-inactive {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: #cbd5e1;
}

.gender-btn-inactive:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-size: 1.125rem;
  font-weight: 700;
  transition: all 0.3s ease;
  transform: scale(1);
  cursor: pointer;
  border: none;
}

.submit-btn:active {
  transform: scale(0.95);
}

.submit-btn-active {
  background: linear-gradient(to right, #8b5cf6, #ec4899, #8b5cf6);
  color: white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.submit-btn-active:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 25px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.submit-btn-disabled {
  background: rgba(71, 85, 105, 0.5);
  color: #94a3b8;
  cursor: not-allowed;
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