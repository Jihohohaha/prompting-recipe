// src/pages/AuthCallback.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sp = new URLSearchParams(search);
    const accessToken = sp.get('access_token');
    const refreshToken = sp.get('refresh_token');
    const userJson = sp.get('user');

    if (accessToken && refreshToken && userJson) {
      try {
        const user = JSON.parse(decodeURIComponent(userJson));

        // 토큰 저장 (보안 정책에 따라 localStorage or cookie)
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));

        // 쿼리스트링 지우고 메인 페이지로 이동
        navigate('/', { replace: true });
      } catch (e) {
        console.error('사용자 정보 파싱 실패', e);
        navigate('/login?error=invalid_user', { replace: true });
      }
    } else {
      const error = sp.get('error') ?? 'missing_tokens';
      navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
    }
  }, [search, navigate]);

  return <div>로그인 처리중...</div>;
}
