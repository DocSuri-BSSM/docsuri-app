import { create, type AxiosError } from 'axios';

import { getAccessToken } from '@/api/token';

export const apiClient = create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 요청 인터셉터: SecureStore에 저장된 액세스 토큰 주입
apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터: 공통 에러 처리 자리
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // TODO: 토큰 갱신 / 로그아웃 처리
    }

    return Promise.reject(error);
  },
);

export default apiClient;
