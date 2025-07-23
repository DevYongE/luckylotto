import { OpenAI } from 'openai'

// 현재 주의 월요일부터 일요일까지 날짜 계산
function getWeekDates() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  
  // 월요일로 이동 (일요일이 0, 월요일이 1)
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  monday.setDate(today.getDate() + daysToMonday)
  
  const weekDates = []
  const dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    weekDates.push({
      day: dayNames[i],
      date: `${date.getMonth() + 1}월 ${date.getDate()}일`,
      fullDate: date.toISOString().split('T')[0]
    })
  }
  
  return weekDates
}

// 샘플 주간 운세 생성
function generateSampleWeeklyFortune() {
  const weekDates = getWeekDates()
  const fortuneTemplates = [
    "새로운 시작의 기운이 가득한 날입니다. 적극적으로 도전해보세요.",
    "열정적인 에너지가 넘치는 날입니다. 중요한 결정을 내리기 좋은 때입니다.",
    "균형과 조화를 이루는 날입니다. 관계 개선에 좋은 하루가 될 것입니다.",
    "성장과 발전의 기회가 다가오는 날입니다. 학습과 연구에 집중하세요.",
    "성취와 완성의 기운이 강한 날입니다. 마무리 작업에 집중하세요.",
    "휴식과 재충전의 시간입니다. 여유로운 마음으로 하루를 보내세요.",
    "새로운 계획을 세우고 내일을 준비하는 날입니다. 가족과 함께하는 시간을 늘려보세요."
  ]
  
  return weekDates.reduce((acc: Record<string, { date: string; fortune: string }>, { day, date }, index) => {
    acc[day] = {
      date,
      fortune: fortuneTemplates[index]
    }
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
  
  // API 키가 없을 때 샘플 데이터 반환
  if (!config.openaiApiKey) {
    console.log('OpenAI API 키가 없어서 샘플 데이터를 반환합니다.')
    
    // 랜덤 로또 번호 생성
    const generateLottoNumbers = () => {
      const numbers = new Set()
      while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1)
      }
      return Array.from(numbers).sort((a, b) => (a as number) - (b as number))
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
        weeklyFortune: generateSampleWeeklyFortune(),
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
  
  // 현재 주 정보
  const weekDates = getWeekDates()
  const weekInfo = weekDates.map(({ day, date }) => `${day} (${date})`).join(', ')
  
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

현재 주간 정보: ${weekInfo}

이 정보를 바탕으로 맞춤형 로또 번호 5세트와 주간 운세를 제공해주세요.
각 로또 세트는 1-45 사이의 중복되지 않는 숫자 6개로 구성해주세요.

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
  "weeklyFortune": {
    "월요일": {
      "date": "월 일일",
      "fortune": "월요일 운세 메시지"
    },
    "화요일": {
      "date": "월 일일", 
      "fortune": "화요일 운세 메시지"
    },
    "수요일": {
      "date": "월 일일",
      "fortune": "수요일 운세 메시지" 
    },
    "목요일": {
      "date": "월 일일",
      "fortune": "목요일 운세 메시지"
    },
    "금요일": {
      "date": "월 일일",
      "fortune": "금요일 운세 메시지"
    },
    "토요일": {
      "date": "월 일일", 
      "fortune": "토요일 운세 메시지"
    },
    "일요일": {
      "date": "월 일일",
      "fortune": "일요일 운세 메시지"
    }
  },
  "fortune": {
    "today": "오늘의 운세 메시지",
    "week": "이번 주 전체 운세 메시지", 
    "month": "이번 달 운세 메시지"
  }
}

위 JSON 형식으로만 응답해주세요. 주간 운세는 각 요일별로 구체적이고 긍정적인 메시지를 작성해주세요.
`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: '당신은 전문적인 운세 상담사입니다. 사용자의 정보를 바탕으로 맞춤형 로또 번호와 상세한 주간 운세를 JSON 형식으로 제공해주세요.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.8
    })
    
    const content = response.choices[0].message.content
    let result
    
    if (!content) {
      throw new Error('AI 응답이 비어있습니다')
    }
    
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
        weeklyFortune: generateSampleWeeklyFortune(),
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
              return Array.from(numbers).sort((a, b) => (a as number) - (b as number))
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
        weeklyFortune: generateSampleWeeklyFortune(),
        fortune: {
          today: "AI 서비스 일시 중단 중이지만, 오늘은 좋은 일이 있을 것입니다.",
          week: "이번 주는 긍정적인 변화가 있을 것입니다.",
          month: "이번 달은 새로운 시작의 달이 될 것입니다."
        }
      }
    }
  }
}) 