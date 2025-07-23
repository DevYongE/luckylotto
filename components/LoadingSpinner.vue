<template>
  <div class="text-center py-16">
    <div class="relative mb-8">
      <!-- 외부 링 -->
      <div class="w-24 h-24 border-4 border-purple-300/30 rounded-full animate-spin"></div>
      <!-- 내부 링 -->
      <div class="absolute top-2 left-2 w-20 h-20 border-4 border-pink-300/50 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
      <!-- 중앙 크리스탈 볼 -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl animate-pulse">
        🔮
      </div>
    </div>
    
    <div class="space-y-4">
      <h3 class="text-2xl font-bold text-white mb-2">🔮 운세를 분석하고 있습니다...</h3>
      <p class="text-purple-200 text-lg">AI가 당신의 사주를 분석하여 맞춤형 운세를 생성하고 있어요</p>
      
      <!-- 로딩 바 -->
      <div class="w-full bg-white/10 rounded-full h-2 mt-6">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style="width: 60%"></div>
      </div>
      
      <!-- 로딩 텍스트 애니메이션 -->
      <div class="flex justify-center space-x-1 mt-4">
        <span class="text-purple-300 animate-bounce" style="animation-delay: 0s">.</span>
        <span class="text-purple-300 animate-bounce" style="animation-delay: 0.1s">.</span>
        <span class="text-purple-300 animate-bounce" style="animation-delay: 0.2s">.</span>
      </div>
    </div>
  </div>
</template> 