// src/components/test/BackendTest.jsx
import { useState } from 'react'
import apiService from '../../services/apiService'

const BackendTest = () => {
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    setTestResult(null)
    
    try {
      const result = await apiService.testConnection()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">백엔드 연결 테스트</h2>
      
      <button
        onClick={handleTest}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {loading ? '테스트 중...' : '연결 테스트'}
      </button>

      {testResult && (
        <div className={`p-4 rounded-lg ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          {testResult.success ? (
            <div>
              <div className="text-green-700 font-semibold mb-2">✅ 연결 성공!</div>
              <div className="text-sm text-green-600">
                <div>엔드포인트: {testResult.endpoint}</div>
                <div className="mt-2">
                  <details className="cursor-pointer">
                    <summary>응답 데이터 보기</summary>
                    <pre className="mt-2 p-2 bg-green-100 rounded text-xs overflow-auto">
                      {JSON.stringify(testResult.data, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-red-700 font-semibold mb-2">❌ 연결 실패</div>
              <div className="text-sm text-red-600">{testResult.error}</div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <div>백엔드 URL: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}</div>
      </div>
    </div>
  )
}

export default BackendTest