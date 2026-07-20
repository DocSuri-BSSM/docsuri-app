# 독수리 (docsuri-app)

> **Expo HAS CHANGED** — 코드를 쓰기 전에 반드시 https://docs.expo.dev/versions/v56.0.0/ 의 해당 버전 문서를 확인할 것.

## 서비스 컨셉

문서 관련 업무를 모바일에서 처리하는 **Android 전용** 앱. 현재는 기초 설정만 완료된 상태이며 도메인 화면/기능은 아직 없다.

## 플랫폼 정책 — Android 전용

- iOS / web 관련 설정·의존성은 **넣지 않는다**. (`react-native-web`, `react-dom`, `app.json`의 `ios`/`web` 키, `web` 스크립트 모두 없음)
- `Platform.OS` 분기를 만들지 않는다. `*.web.tsx` / `*.ios.tsx` 파일도 만들지 않는다.
- EAS 관련 설정(`eas.json`, `eas-cli`, `projectId`)은 사용하지 않는다.

## 기술 스택

| 영역        | 패키지                         | 버전               |
| ----------- | ------------------------------ | ------------------ |
| 런타임      | expo                           | ~56.0.9            |
|             | react                          | 19.2.3             |
|             | react-native                   | 0.85.3             |
| 라우팅      | expo-router                    | ~56.2.9            |
| 스타일      | nativewind                     | ^4.2.6             |
|             | tailwindcss                    | ^3.4.19            |
| 애니메이션  | react-native-reanimated        | 4.3.1              |
|             | react-native-worklets          | 0.8.3              |
| 제스처/화면 | react-native-gesture-handler   | ~2.31.2            |
|             | react-native-safe-area-context | ~5.7.0             |
|             | react-native-screens           | 4.25.2             |
| 네트워킹    | axios                          | ^1.18.1            |
|             | @tanstack/react-query          | ^5.101.2           |
| 저장소      | expo-secure-store              | ~56.0.4            |
| 리소스      | expo-font / expo-splash-screen | ~56.0.7 / ~56.0.13 |
|             | react-native-svg               | 15.15.4            |
| 언어/도구   | typescript                     | ~6.0.3             |
|             | eslint                         | ^9.39.5            |
|             | prettier                       | ^3.9.5             |

> eslint는 **9.x에 고정**한다. 10.x는 `eslint-plugin-react`(eslint-config-expo 의존)와 호환되지 않아 lint가 크래시한다.

## 패키지 매니저 규칙

- **pnpm만 사용한다.** npm / yarn / bun 금지.
- 패키지 추가는 `pnpm expo install <pkg>` (SDK 56에 맞는 버전으로 고정됨). Expo와 무관한 순수 JS 패키지만 `pnpm add`.
- 루트 `.npmrc`의 `node-linker=hoisted`는 **절대 지우지 말 것.** RN 네이티브 오토링킹이 hoisted 구조를 전제로 동작한다.

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

## 폴더 구조 규칙

타입 중심 구조를 따른다.

```
src/
  app/            # expo-router 라우트 (파일 = 화면)
  components/
    ui/           # 도메인 무관 공용 UI (Typography, Button ...)
    <도메인>/     # 도메인 전용 컴포넌트 (예: components/document/)
  hooks/
    <도메인>/     # useQuery/useMutation 래핑 훅
  api/            # axios 인스턴스, 토큰, queryClient, 도메인별 API 함수
  constants/      # colors.js 등 토큰·상수
  types/          # 공용 타입
assets/
  images/ fonts/
```

- `src/features/` 폴더는 **만들지 않는다.**
- 도메인 이름 폴더를 `components/ui/` **하위에 두지 않는다.** (`components/ui/document/` ❌ → `components/document/` ⭕)
- 컴포넌트 선언은 `export default function Name() {}` 로 통일한다. (`memo` / `forwardRef` 사용 시에만 예외)
- import 경로는 `@/*` (→ `src/*`), `@/assets/*` (→ `assets/*`) alias를 사용한다.

## 스타일 규칙 — 토큰 강제

- 스타일은 NativeWind className으로 작성한다. `StyleSheet.create`는 flex:1 같은 불가피한 경우로 제한.
- **임의값(arbitrary value) 금지**: `p-[13px]`, `text-[#FF8800]`, `rounded-[7px]` ❌
  → 필요한 값은 먼저 `tailwind.config.js` / `src/constants/colors.js`에 토큰으로 추가한 뒤 사용한다.
- 색상 단일 소스는 `src/constants/colors.js` 하나뿐이다. tailwind.config.js와 앱 코드가 모두 이 파일을 참조한다.
- 토큰 스케일: spacing/borderRadius `xs sm md lg xl 2xl 3xl 4xl`, fontSize `xs(12) ~ 4xl(40)`, fontFamily `regular / medium / bold / title`.
- 텍스트는 raw `<Text>` 대신 **항상 `@/components/ui/Typography`** 를 사용한다. (variant: `display`, `h1~h4`, `body1~body3`, `caption`)
- 런타임에 조합되는 클래스명은 `tailwind.config.js`의 `safelist`에 등록해야 스타일이 유실되지 않는다.

## 주의사항

### reactCompiler

`app.json`의 `experiments.reactCompiler: true` 로 React Compiler가 켜져 있다.

- `useMemo` / `useCallback` / `React.memo` 를 **습관적으로 쓰지 말 것.** 컴파일러가 자동으로 메모이제이션한다.
- 측정으로 증명된 병목에만 예외적으로 사용한다.

### typedRoutes

`experiments.typedRoutes: true` 로 라우트 경로가 타입 체크된다.

- `router.push('/foo')` 의 경로 문자열은 실제 존재하는 라우트여야 한다.
- 라우트 파일을 추가한 뒤 타입이 안 잡히면 `pnpm start` 를 한 번 돌려 `.expo/types` 를 재생성한다.

### 네이티브 모듈 / 빌드

- `expo-font`, `expo-secure-store` 등 config plugin을 쓰므로 **Expo Go가 아닌 dev build**가 필요하다.
- 폰트는 `expo-font` 플러그인으로 네이티브에 임베드된다. 런타임 `useFonts` 호출 불필요.

### 환경변수

- `.env`는 커밋하지 않는다. 새 변수를 추가하면 `.env.example`도 함께 갱신한다.
- 클라이언트에서 읽는 값은 `EXPO_PUBLIC_` 접두사가 필요하다.
- Android 에뮬레이터에서 호스트 PC의 localhost는 `http://10.0.2.2:<port>`.

### 비동기 상태

모든 서버 상태는 `useQuery` / `useMutation` 으로 다룬다. `useEffect` + `useState` 로 직접 fetch 하지 않는다.
훅은 `src/hooks/<도메인>/` 에, API 호출 함수는 `src/api/` 에 둔다.
