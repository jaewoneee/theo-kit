<div align="center">
  <img src="./assets/theo-kit.png" alt="theo-kit" width="150"/>
  <h1>Theo-kit</h1>
  <p>AI-assisted development로 빠르게 구축한 크로스 플랫폼 헤드리스 UI 컴포넌트 라이브러리</p>
  <p><strong>React (Web) + React Native (Expo)</strong></p>
</div>

---

## 아키텍처

헤드리스 hooks 기반으로 로직을 공유하고, 플랫폼별 렌더링을 분리합니다.

```
theo-kit-core  (순수 로직 · hooks · 타입)
    ↑                  ↑
theo-kit          theo-kit-native
(웹 컴포넌트)       (RN 컴포넌트)
```

## 프로젝트 구조

```
theo-kit/
├── packages/
│   ├── ui-core/             # 헤드리스 hooks + 유틸리티 (theo-kit-core)
│   ├── ui/                  # 웹 컴포넌트 라이브러리 (theo-kit)
│   └── ui-native/           # React Native 컴포넌트 (theo-kit-native)
├── apps/
│   ├── docs/                # Storybook 문서 사이트
│   ├── playground/          # Vite 기반 웹 테스트 앱
│   └── expo-playground/     # Expo 기반 네이티브 테스트 앱
├── package.json             # 모노레포 루트 설정
├── pnpm-workspace.yaml      # pnpm 워크스페이스 설정
├── turbo.json               # Turbo 빌드 파이프라인
├── eslint.config.js         # ESLint 설정
└── .prettierrc              # Prettier 설정
```

### 패키지

| 패키지 | 경로 | 설명 |
| --- | --- | --- |
| `theo-kit-core` | `packages/ui-core` | 플랫폼 무관 헤드리스 hooks, 유틸리티, 타입 |
| `theo-kit` | `packages/ui` | 웹 컴포넌트 (Tailwind CSS v4) |
| `theo-kit-native` | `packages/ui-native` | React Native 컴포넌트 (NativeWind) |

### 앱

| 앱 | 경로 | 설명 |
| --- | --- | --- |
| `docs` | `apps/docs` | Storybook 기반 컴포넌트 문서화 |
| `playground` | `apps/playground` | Vite 기반 웹 테스트 앱 |
| `expo-playground` | `apps/expo-playground` | Expo + NativeWind 네이티브 테스트 앱 |

## 컴포넌트

### 웹 (`theo-kit`)

Button, Badge, Typography, Card, Avatar, Switch, Checkbox, Radio, Input, InputGroup, TagInput, QuantityInput, Select, Accordion, Dialog, Popover, Tooltip, Carousel, Table, Toast

### React Native (`theo-kit-native`)

Button, Badge, Typography, Card, Switch, Checkbox, Radio, Input, QuantityInput, Accordion, Dialog

### 공유 Hooks (`theo-kit-core`)

`useControllable`, `useToggle`, `useRadioGroup`, `useAccordion`, `useDialog`, `usePopover`, `useSelect`, `useCarousel`, `useTagInput`, `useQuantityInput`

## 기술 스택

- **패키지 관리**: pnpm + workspaces
- **모노레포 관리**: Turbo
- **빌드**: tsup (라이브러리), Vite (웹 앱), Metro (Expo 앱)
- **테스트**: Vitest + Testing Library
- **문서화**: Storybook
- **스타일링**: Tailwind CSS v4 (웹), NativeWind (React Native)
- **코드 품질**: ESLint + Prettier
- **언어**: TypeScript, React 18

## 시작하기

### 설치

```bash
pnpm install
```

### 개발

```bash
# 모든 패키지 개발 모드 실행
pnpm dev

# Storybook만 실행
pnpm storybook

# Expo 앱 실행
pnpm --filter expo-playground dev
```

### 빌드

```bash
pnpm build
```

### 테스트

```bash
pnpm test
```

### 코드 품질

```bash
# ESLint 실행
pnpm lint

# Prettier 포맷팅
pnpm format

# Prettier 체크만 (CI용)
pnpm format:check
```

## 사용법

### 웹 (React)

```bash
pnpm add theo-kit
```

```tsx
import { Button, Dialog, useDialog } from "theo-kit";

function App() {
  return <Button variant="solid">Click me</Button>;
}
```

### React Native (Expo)

```bash
pnpm add theo-kit-native theo-kit-core
```

```tsx
import { Button, Switch, useToggle } from "theo-kit-native";

function App() {
  return <Button variant="solid">Press me</Button>;
}
```

## 라이브러리 출력

`theo-kit-core`, `theo-kit`은 CJS + ESM 듀얼 포맷으로 빌드됩니다:

- `dist/index.js` - CommonJS
- `dist/index.mjs` - ES Modules
- `dist/index.d.ts` - TypeScript 타입 정의

`theo-kit-native`은 TypeScript 소스를 직접 export합니다 (Metro 번들러가 컴파일).
