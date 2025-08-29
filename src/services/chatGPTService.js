// src/services/chatGPTService.js

// ChatGPT API 호출 서비스
class ChatGPTService {
  constructor() {
    // 환경변수에서 API 키를 가져옵니다 (.env 파일에 저장)
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY
    this.baseURL = 'https://api.openai.com/v1/chat/completions'
  }

  /**
   * ChatGPT API에 프롬프트를 전송하고 응답을 받습니다
   * @param {string} prompt - 사용자가 완성한 프롬프트
   * @param {function} onProgress - 스트리밍 응답을 처리할 콜백 함수 (선택적)
   * @returns {Promise<string>} - ChatGPT의 응답
   */
  async sendPrompt(prompt, onProgress = null) {
    // 🔥 개발 중에는 항상 더미 응답 사용 (무료)
    const useDummyMode = true // false로 변경하면 실제 API 호출
    
    if (useDummyMode || import.meta.env.MODE === 'development') {
      // 더미 응답 시뮬레이션 (타이핑 효과)
      if (onProgress) {
        return await this.simulateTypingResponse(prompt, onProgress)
      }
      return this.getDummyResponse(prompt)
    }

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // 또는 'gpt-4'
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
          stream: onProgress ? true : false // 스트리밍 여부
        })
      })

      if (!response.ok) {
        throw new Error(`API 오류: ${response.status} ${response.statusText}`)
      }

      // 스트리밍 응답 처리
      if (onProgress) {
        return await this.handleStreamResponse(response, onProgress)
      }

      // 일반 응답 처리
      const data = await response.json()
      return data.choices[0].message.content.trim()

    } catch (error) {
      console.error('ChatGPT API 호출 실패:', error)
      
      // 실패 시 더미 응답 반환
      return this.getDummyResponse(prompt)
    }
  }

  /**
   * 스트리밍 응답을 처리합니다 (타이핑 효과)
   */
  async handleStreamResponse(response, onProgress) {
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            
            if (data === '[DONE]') {
              return fullResponse
            }

            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices[0]?.delta?.content
              
              if (content) {
                fullResponse += content
                onProgress(content) // 실시간으로 콘텐츠 전달
              }
            } catch (e) {
              // JSON 파싱 오류 무시
            }
          }
        }
      }
    } finally {
      reader.releaseLock()
    }

    return fullResponse
  }

  /**
   * 타이핑 효과가 있는 더미 응답 시뮬레이션
   */
  async simulateTypingResponse(prompt, onProgress) {
    const response = this.getDummyResponse(prompt)
    
    // 타이핑 효과 시뮬레이션
    for (let i = 0; i <= response.length; i++) {
      const chunk = response.slice(i-1, i)
      if (chunk) {
        onProgress(chunk)
      }
      // 타이핑 속도 조절 (50ms)
      await new Promise(resolve => setTimeout(resolve, 50))
    }
    
    return response
  }

  /**
   * 개발용 더미 응답 (기법별로 다른 응답)
   */
  getDummyResponse(prompt) {
    // 프롬프트 내용에 따라 다른 응답 제공
    if (prompt.includes('FEW SHOT') || prompt.includes('예시')) {
      return "훌륭한 FEW SHOT 프롬프트네요! 구체적인 예시들을 제시해주셔서 패턴을 명확히 이해할 수 있었습니다. 이런 식으로 작성하시면 AI가 원하는 형태의 결과를 정확히 생성할 수 있습니다. 👍"
    }
    
    if (prompt.includes('역할') || prompt.includes('전문가')) {
      return "완벽한 역할 지정 프롬프트입니다! 특정 전문가의 역할을 명확히 지정해주셔서 해당 분야의 깊이 있는 답변을 제공할 수 있겠네요. 이런 컨텍스트 제공은 AI 활용의 핵심입니다! 🎯"
    }
    
    if (prompt.includes('마크다운') || prompt.includes('구조')) {
      return "정말 잘 구조화된 프롬프트입니다! 마크다운 형식을 요청하신 덕분에 정리된 형태의 답변을 제공할 수 있겠어요. 이런 템플릿 기법은 일관성 있는 결과를 얻는데 매우 효과적입니다! 📝"
    }
    
    // 기본 응답들
    const responses = [
      "정말 잘 작성된 프롬프트네요! 명확하고 구체적인 요청으로 원하는 결과를 얻을 수 있겠습니다. 이런 식으로 계속 연습하시면 프롬프트 엔지니어링 실력이 크게 향상될 거예요! ✨",
      "훌륭합니다! 이 프롬프트는 AI가 정확히 이해할 수 있도록 잘 구성되어 있어요. 컨텍스트와 구체적인 요구사항이 모두 포함되어 있어서 고품질의 답변을 기대할 수 있습니다! 🚀",
      "완벽한 프롬프트 작성법이네요! 이런 방식으로 질문하시면 AI가 여러분의 의도를 정확히 파악하고 유용한 답변을 제공할 수 있어요. 앞으로도 이런 패턴을 활용해보세요! 💡"
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }

  /**
   * API 키 유효성 검사
   */
  isApiKeyValid() {
    return this.apiKey && this.apiKey.length > 0
  }
}

export default new ChatGPTService()