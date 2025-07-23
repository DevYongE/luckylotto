import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API 키가 설정되지 않았습니다.'
    })
  }
  
  const { birthDate, gender, birthTime } = body
  
  if (!birthDate || !gender) {
    throw createError({
      statusCode: 400,
      statusMessage: '생년월일과 성별은 필수 입력사항입니다.'
    })
  }
  
  // 생년월일 파싱
  const date = new Date(birthDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const openai = new OpenAI({ 
    apiKey: config.openaiApiKey 
  })
  
  const prompt = `
사용자의 생년월일: ${year}년 ${month}월 ${day}일
성별: ${gender}
태어난 시간: ${birthTime || '모름'}

이 사주 정보를 바탕으로 다음을 제공해주세요:

1. 이번 주 요일별 운세 (월요일부터 일요일까지)
   - 각 요일별로 짧고 명확한 운세를 알려주세요

2. 이 사주에 맞는 로또 번호 6자리 세트를 5개 추천해주세요
   - 각 세트는 1-45 사이의 숫자 6개로 구성
   - 중복 없이 생성해주세요

다음과 정확히 같은 형식으로 응답해주세요:

월요일: 가족과의 시간이 중요한 날입니다. 소통을 늘려보세요.
화요일: 새로운 기회가 다가올 수 있습니다. 적극적으로 도전해보세요.
수요일: 균형을 잡는 것이 중요합니다. 무리하지 마세요.
목요일: 성장의 기회가 있는 날입니다. 학습에 집중하세요.
금요일: 성취의 기운이 강합니다. 중요한 일을 마무리하세요.
토요일: 휴식이 필요한 날입니다. 여유를 가지세요.
일요일: 새로운 계획을 세우기 좋은 날입니다.

로또 번호 추천:
1번: 3, 15, 22, 27, 34, 41
2번: 6, 11, 18, 29, 35, 42
3번: 8, 17, 23, 30, 36, 44
4번: 5, 13, 21, 28, 37, 45
5번: 1, 12, 19, 26, 32, 40

위 형식을 정확히 지켜서 답변해주세요. 특히 로또 번호는 반드시 "번호: 숫자, 숫자, 숫자, 숫자, 숫자, 숫자" 형태로 써주세요.
`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '당신은 전문적인 사주 상담사이자 운세 전문가입니다. 사용자의 사주 정보를 바탕으로 정확하고 유용한 운세와 로또 번호를 제공해주세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })
    
    return {
      result: response.choices[0].message.content
    }
  } catch (error) {
    console.error('OpenAI API 오류:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '운세 생성 중 오류가 발생했습니다.'
    })
  }
}) 