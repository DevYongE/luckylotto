<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden flex items-center justify-center">
    <!-- 배경 장식 -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative z-10 container mx-auto px-4 py-8 w-full max-w-4xl">
      <header class="text-center mb-12">
        <div class="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-full mb-6">
          <span class="text-6xl">🔮</span>
        </div>
        <h1 class="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          사주로또
        </h1>
        <p class="text-xl text-purple-200 font-medium">당신의 사주로 알아보는 주간 운세와 로또 번호</p>
      </header>
      
      <MainPage />
    </div>
  </div>
</template>

<script setup>
import MainPage from '../components/MainPage.vue'
</script>

<style>
/* 전체 폰트 강제 적용 */
* {
  font-family: 'Segoe UI', 'Malgun Gothic', system-ui, -apple-system, sans-serif !important;
  color: inherit !important;
}

/* 기본 텍스트 색상 강제 적용 */
body, html {
  color: white !important;
  font-family: 'Segoe UI', 'Malgun Gothic', system-ui, -apple-system, sans-serif !important;
}

/* 입력 필드 텍스트 색상 강제 적용 */
input, select, textarea, button {
  color: white !important;
  font-family: 'Segoe UI', 'Malgun Gothic', system-ui, -apple-system, sans-serif !important;
}

/* select 옵션 강제 색상 적용 */
select option {
  background-color: #1f2937 !important;
  color: white !important;
}

/* 플레이스홀더 색상 */
::placeholder {
  color: rgba(196, 181, 253, 0.7) !important;
}

/* 커스텀 스크롤바 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 텍스트 선택 색상 */
::selection {
  background: rgba(139, 92, 246, 0.3);
  color: white;
}
</style>
