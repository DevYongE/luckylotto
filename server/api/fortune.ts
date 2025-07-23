import { OpenAI } from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  
  const { name, birthDate, gender, birthHour, birthMinute, luckyNumbers } = body
  
  if (!name || !birthDate || !gender) {
    throw createError({
      statusCode: 400,
      statusMessage: '이름, 생년월일, 성별은 필수 입력사항입니다.'
    })
  }
  
  // API 키가 없을 때 샘플 데이터 반환
  if (!config.openaiApiKey) {
    console.log('OpenAI API 키가 없어서 샘플 데이터를 반환합니다.')
    
    // 랜덤 로또 번호 생성
    const generateLottoNumbers = () => {
      const numbers = new Set()
      while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1)
      }
      return Array.from(numbers).sort((a, b) => a - b)
    }
    
    return {
      result: {
        message: `${name}님의 맞춤 로또 번호가 생성되었습니다!`,
        lottoNumbers: [
          generateLottoNumbers(),
          generateLottoNumbers(),
          generateLottoNumbers(),
          generateLottoNumbers(),
          generateLottoNumbers()
        ],
        fortune: {
          today: "오늘은 특별한 행운이 함께할 것입니다.",
          week: "이번 주는 새로운 기회가 많이 찾아올 예정입니다.",
          month: "이번 달은 재정적으로 좋은 소식이 있을 것 같습니다."
        }
      }
    }
  }
  
  // 생년월일 파싱
  const date = new Date(birthDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // 출생시간 처리
  let birthTimeText = '모름'
  if (birthHour !== '' && birthMinute !== '') {
    birthTimeText = `${birthHour}시 ${birthMinute}분`
  }
  
  // 행운의 숫자 처리
  const luckyNumberText = luckyNumbers && luckyNumbers.length > 0 
    ? luckyNumbers.join(', ') 
    : '없음'
  
  const openai = new OpenAI({ 
    apiKey: config.openaiApiKey 
  })
  
  const prompt = `
사용자 정보:
- 이름: ${name}
- 생년월일: ${year}년 ${month}월 ${day}일
- 성별: ${gender}
- 출생시간: ${birthTimeText}
- 좋아하는 숫자: ${luckyNumberText}

이 정보를 바탕으로 맞춤형 로또 번호 5세트를 추천해주세요.
각 세트는 1-45 사이의 중복되지 않는 숫자 6개로 구성해주세요.

응답 형식:
{
  "message": "사용자명님의 맞춤 로또 번호가 생성되었습니다!",
  "lottoNumbers": [
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6]
  ],
  "fortune": {
    "today": "오늘의 운세 메시지",
    "week": "이번 주 운세 메시지", 
    "month": "이번 달 운세 메시지"
  }
}

위 JSON 형식으로만 응답해주세요.
`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '당신은 전문적인 운세 상담사입니다. 사용자의 정보를 바탕으로 맞춤형 로또 번호와 운세를 JSON 형식으로 제공해주세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.8
    })
    
    const content = response.choices[0].message.content
    let result
    
    try {
      result = JSON.parse(content)
    } catch (parseError) {
      // JSON 파싱 실패 시 기본 응답
      result = {
        message: `${name}님의 맞춤 로또 번호가 생성되었습니다!`,
        lottoNumbers: [
          [3, 15, 22, 27, 34, 41],
          [6, 11, 18, 29, 35, 42],
          [8, 17, 23, 30, 36, 44],
          [5, 13, 21, 28, 37, 45],
          [1, 12, 19, 26, 32, 40]
        ],
        fortune: {
          today: "AI 응답 처리 중 오류가 있었지만, 오늘은 좋은 일이 있을 것입니다.",
          week: "이번 주는 새로운 기회가 찾아올 것입니다.",
          month: "이번 달은 행운이 함께할 것입니다."
        }
      }
    }
    
    return { result }
    
  } catch (error) {
    console.error('OpenAI API 오류:', error)
    
    // 오류 시에도 샘플 데이터 반환
    const generateLottoNumbers = () => {
      const numbers = new Set()
      while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1)
      }
      return Array.from(numbers).sort((a, b) => a - b)
    }
    
    return {
      result: {
        message: `${name}님의 랜덤 로또 번호입니다!`,
        lottoNumbers: [
          generateLottoNumbers(),
          generateLottoNumbers(),
          generateLottoNumbers(),
          generateLottoNumbers(),
          generateLottoNumbers()
        ],
        fortune: {
          today: "AI 서비스 일시 중단 중이지만, 오늘은 좋은 일이 있을 것입니다.",
          week: "이번 주는 긍정적인 변화가 있을 것입니다.",
          month: "이번 달은 새로운 시작의 달이 될 것입니다."
        }
      }
    }
  }
}) 