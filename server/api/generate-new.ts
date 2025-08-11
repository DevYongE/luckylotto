import { OpenAI } from 'openai'

// 랜덤 로또 번호 생성 함수
function generateRandomLottoNumbers() {
  const numbers = new Set()
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1)
  }
  return Array.from(numbers).sort((a, b) => (a as number) - (b as number))
}

// 샘플 주간 운세 생성
function generateSampleWeeklyFortune() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  
  // 월요일로 이동 (일요일이 0, 월요일이 1)
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  monday.setDate(today.getDate() + daysToMonday)
  
  const weekDates = []
  const dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
  const fortuneTemplates = [
    "새로운 시작의 기운이 가득한 날입니다. 적극적으로 도전해보세요.",
    "열정적인 에너지가 넘치는 날입니다. 중요한 결정을 내리기 좋은 때입니다.",
    "균형과 조화를 이루는 날입니다. 관계 개선에 좋은 하루가 될 것입니다.",
    "성장과 발전의 기회가 다가오는 날입니다. 학습과 연구에 집중하세요.",
    "성취와 완성의 기운이 강한 날입니다. 마무리 작업에 집중하세요.",
    "휴식과 재충전의 시간입니다. 여유로운 마음으로 하루를 보내세요.",
    "새로운 계획을 세우고 내일을 준비하는 날입니다. 가족과 함께하는 시간을 늘려보세요."
  ]
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    weekDates.push({
      day: dayNames[i],
      date: `${date.getMonth() + 1}월 ${date.getDate()}일`,
      fortune: fortuneTemplates[i]
    })
  }
  
  return weekDates.reduce((acc: Record<string, { date: string; fortune: string }>, { day, date, fortune }) => {
    acc[day] = { date, fortune }
    return acc
  }, {})
}

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
  
  // 현재 날짜 기반으로 이번 주 날짜 계산 (2024-12-23 추가)
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  
  // 월요일로 이동 (일요일이 0, 월요일이 1)
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  monday.setDate(today.getDate() + daysToMonday)
  
  // 이번 주 날짜들 계산
  const weekDates = []
  const dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    weekDates.push({
      day: dayNames[i],
      date: `${date.getMonth() + 1}월 ${date.getDate()}일`
    })
  }
  
  // API 키 상태 확인 및 로깅
  console.log('🔄 새로운 번호 생성 - API 키 상태 확인:')
  console.log('- config.openaiApiKey 존재:', !!config.openaiApiKey)
  console.log('- config.openaiApiKey 길이:', config.openaiApiKey ? config.openaiApiKey.length : 0)
  
  // API 키가 없거나 유효하지 않을 때 랜덤 데이터 반환
  if (!config.openaiApiKey || config.openaiApiKey === 'your_openai_api_key_here' || !config.openaiApiKey.startsWith('sk-')) {
    console.log('⚠️ OpenAI API 키가 없어서 랜덤 데이터를 반환합니다.')
    
    return {
      result: {
        message: `${name}님의 새로운 로또 번호가 생성되었습니다! (랜덤 데이터)`,
        lottoNumbers: [
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers()
        ],
        weeklyFortune: generateSampleWeeklyFortune(),
        fortune: {
          today: "새로운 기운이 가득한 하루입니다. 긍정적인 마음으로 시작해보세요.",
          week: "이번 주는 새로운 기회가 많이 찾아올 예정입니다.",
          month: "이번 달은 재정적으로 좋은 소식이 있을 것 같습니다."
        },
        isSampleData: true
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

이 정보를 바탕으로 **새로운** 맞춤형 로또 번호 5세트를 생성해주세요.
이전과 다른 새로운 조합으로 만들어주세요.

🚨 로또 번호 규칙 (반드시 지켜주세요):
- 각 세트는 정확히 6개의 숫자로 구성
- 모든 숫자는 1부터 45까지의 범위만 사용 (46 이상 사용 금지!)
- 각 세트 내에서 중복된 숫자 없음
- 5개 세트 모두 서로 다른 조합으로 생성

예시 올바른 로또 번호:
- 1번: [3, 15, 22, 27, 34, 41] ✅ (모든 숫자가 1-45 범위)
- 2번: [6, 11, 18, 29, 35, 42] ✅ (모든 숫자가 1-45 범위)
- 3번: [8, 17, 23, 30, 36, 44] ✅ (모든 숫자가 1-45 범위)

잘못된 예시:
- [3, 15, 22, 27, 34, 50] ❌ (50은 45를 초과)
- [3, 15, 22, 27, 34, 0] ❌ (0은 1 미만)

**중요: 반드시 JSON 형식으로만 응답해주세요. 마크다운 코드 블록이나 다른 형식을 사용하지 마세요.**

응답 형식:
{
  "message": "사용자명님의 새로운 맞춤 로또 번호가 생성되었습니다!",
  "lottoNumbers": [
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6],
    [숫자1, 숫자2, 숫자3, 숫자4, 숫자5, 숫자6]
  ],
  "weeklyFortune": {
    "월요일": {
      "date": "${weekDates[0].date}",
      "fortune": "새로운 월요일 운세 메시지"
    },
    "화요일": {
      "date": "${weekDates[1].date}", 
      "fortune": "새로운 화요일 운세 메시지"
    },
    "수요일": {
      "date": "${weekDates[2].date}",
      "fortune": "새로운 수요일 운세 메시지" 
    },
    "목요일": {
      "date": "${weekDates[3].date}",
      "fortune": "새로운 목요일 운세 메시지"
    },
    "금요일": {
      "date": "${weekDates[4].date}",
      "fortune": "새로운 금요일 운세 메시지"
    },
    "토요일": {
      "date": "${weekDates[5].date}", 
      "fortune": "새로운 토요일 운세 메시지"
    },
    "일요일": {
      "date": "${weekDates[6].date}",
      "fortune": "새로운 일요일 운세 메시지"
    }
  },
  "fortune": {
    "today": "새로운 오늘의 운세 메시지",
    "week": "새로운 이번 주 전체 운세 메시지", 
    "month": "새로운 이번 달 운세 메시지"
  }
}

위 JSON 형식으로만 응답해주세요. 이전과 다른 새로운 조합으로 만들어주세요.
`

  try {
    console.log('🤖 새로운 번호 생성 - AI API 호출 시작...')
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '당신은 전문적인 운세 상담사입니다. 사용자의 정보를 바탕으로 이전과 다른 새로운 맞춤형 로또 번호를 JSON 형식으로 제공해주세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.9 // 더 다양한 결과를 위해 temperature 높임
    })
    
    const content = response.choices[0].message.content
    console.log('🤖 새로운 번호 생성 - AI 응답 받음:', content ? '응답 있음' : '응답 없음')
    
    let result
    
    if (!content) {
      throw new Error('AI 응답이 비어있습니다')
    }
    
    try {
      result = JSON.parse(content)
      console.log('✅ 새로운 번호 생성 - AI JSON 파싱 성공')
      
      // 로또 번호 검증 및 수정
      if (result.lottoNumbers && Array.isArray(result.lottoNumbers)) {
        const validateAndFixLottoNumbers = (numbers: any) => {
          if (!Array.isArray(numbers) || numbers.length !== 6) {
            return generateRandomLottoNumbers()
          }
          
          // 1-45 범위 검증
          for (const num of numbers) {
            if (typeof num !== 'number' || num < 1 || num > 45) {
              console.warn(`🚨 잘못된 로또 번호 발견: ${num} (1-45 범위를 벗어남)`)
              return generateRandomLottoNumbers()
            }
          }
          
          // 중복 검증
          const uniqueNumbers = new Set(numbers)
          if (uniqueNumbers.size !== 6) {
            console.warn('🚨 중복된 로또 번호 발견')
            return generateRandomLottoNumbers()
          }
          
          return numbers
        }
        
                        result.lottoNumbers = result.lottoNumbers.map((numbers: any, index: any) => {
          const validatedNumbers = validateAndFixLottoNumbers(numbers)
          if (validatedNumbers !== numbers) {
            console.warn(`🚨 ${index + 1}번 세트가 유효하지 않아 새로운 번호로 교체합니다.`)
          }
          return validatedNumbers
        })
      }
      
      result.isSampleData = false
    } catch (parseError) {
      console.error('❌ 새로운 번호 생성 - AI JSON 파싱 실패:', parseError)
      
      // 마크다운 형식 제거 시도
      let cleanedContent = content
      
      // ```json ... ``` 형식 제거
      if (cleanedContent.includes('```json')) {
        cleanedContent = cleanedContent.replace(/```json\s*/, '').replace(/\s*```$/, '')
      }
      
      // ``` ... ``` 형식 제거
      if (cleanedContent.includes('```')) {
        cleanedContent = cleanedContent.replace(/```\s*/, '').replace(/\s*```$/, '')
      }
      
      // 앞뒤 공백 제거
      cleanedContent = cleanedContent.trim()
      
      console.log('🧹 새로운 번호 생성 - 정리된 AI 응답:', cleanedContent.substring(0, 100) + '...')
      
      try {
        result = JSON.parse(cleanedContent)
        console.log('✅ 새로운 번호 생성 - 정리 후 AI JSON 파싱 성공')
        result.isSampleData = false
      } catch (secondParseError) {
        console.error('❌ 새로운 번호 생성 - 정리 후에도 AI JSON 파싱 실패:', secondParseError)
        // JSON 파싱 실패 시 랜덤 데이터 반환
        result = {
          message: `${name}님의 새로운 랜덤 로또 번호입니다! (AI 응답 처리 오류)`,
          lottoNumbers: [
            generateRandomLottoNumbers(),
            generateRandomLottoNumbers(),
            generateRandomLottoNumbers(),
            generateRandomLottoNumbers(),
            generateRandomLottoNumbers()
          ],
          weeklyFortune: generateSampleWeeklyFortune(),
          fortune: {
            today: "새로운 기운이 가득한 하루입니다. 긍정적인 마음으로 시작해보세요.",
            week: "이번 주는 새로운 기회가 찾아올 것입니다.",
            month: "이번 달은 행운이 함께할 것입니다."
          },
          isSampleData: true
        }
      }
    }
    
    return { result }
    
  } catch (error) {
    console.error('❌ 새로운 번호 생성 - OpenAI API 오류:', error)
    
    // 오류 시에도 랜덤 데이터 반환
    return {
      result: {
        message: `${name}님의 새로운 랜덤 로또 번호입니다! (AI 서비스 오류)`,
        lottoNumbers: [
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers(),
          generateRandomLottoNumbers()
        ],
        weeklyFortune: generateSampleWeeklyFortune(),
        fortune: {
          today: "새로운 기운이 가득한 하루입니다. 긍정적인 마음으로 시작해보세요.",
          week: "이번 주는 긍정적인 변화가 있을 것입니다.",
          month: "이번 달은 새로운 시작의 달이 될 것입니다."
        },
        isSampleData: true
      }
    }
  }
}) 