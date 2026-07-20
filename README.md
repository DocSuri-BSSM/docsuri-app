# 독수리 (docsuri-app)

Expo SDK 56 기반 **Android 전용** 앱.

## 요구사항

- Node.js 20+
- pnpm 11+ (`corepack enable`)
- Android Studio + Android SDK (에뮬레이터 또는 실기기)

## 시작하기

```bash
pnpm install
cp .env.example .env   # EXPO_PUBLIC_API_URL 설정
pnpm android
```

> `expo-font`, `expo-secure-store` config plugin을 사용하므로 Expo Go가 아닌 **dev build**가 필요하다.
> Android 에뮬레이터에서 호스트 PC의 localhost는 `http://10.0.2.2:<port>`.

## 스크립트

| 명령                     | 설명               |
| ------------------------ | ------------------ |
| `pnpm start`             | Metro 시작         |
| `pnpm dev`               | dev client로 시작  |
| `pnpm android`           | Android 실행       |
| `pnpm lint`              | ESLint 검사        |
| `pnpm lint:fix`          | ESLint 자동 수정   |
| `pnpm format`            | Prettier 전체 포맷 |
| `pnpm exec tsc --noEmit` | 타입 체크          |

## 규칙

패키지 매니저 · 폴더 구조 · 스타일 토큰 규칙은 [AGENTS.md](./AGENTS.md)를 참고할 것.
