# theo-kit

AI-assisted development로 빠르게 구축한 React 헤드리스 UI 컴포넌트 라이브러리

## 프로젝트 구조

```
theo-kit/
├── packages/
│   └── ui/                  # 핵심 컴포넌트 라이브러리 (theo-kit)
├── apps/
│   ├── docs/                # Storybook 문서 사이트
│   └── playground/          # Vite 기반 테스트 앱
├── package.json             # 모노레포 루트 설정
├── pnpm-workspace.yaml      # pnpm 워크스페이스 설정
├── turbo.json               # Turbo 빌드 파이프라인
├── eslint.config.js         # ESLint 설정
└── .prettierrc              # Prettier 설정
```

### 패키지 설명

| 패키지       | 경로              | 설명                                     |
| ------------ | ----------------- | ---------------------------------------- |
| `theo-kit`   | `packages/ui`     | 헤드리스 UI 컴포넌트 라이브러리 (배포용) |
| `docs`       | `apps/docs`       | Storybook 기반 컴포넌트 문서화           |
| `playground` | `apps/playground` | 컴포넌트 테스트용 샌드박스 앱            |

## 기술 스택

- **패키지 관리**: pnpm + workspaces
- **모노레포 관리**: Turbo
- **빌드**: tsup (라이브러리), Vite (앱)
- **테스트**: Vitest + Testing Library
- **문서화**: Storybook
- **스타일링**: Tailwind CSS v4
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

## 라이브러리 출력

`theo-kit` 패키지는 CJS + ESM 듀얼 포맷으로 빌드됩니다:

- `dist/index.js` - CommonJS
- `dist/index.mjs` - ES Modules
- `dist/index.d.ts` - TypeScript 타입 정의
