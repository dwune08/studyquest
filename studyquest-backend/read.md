# 🎮 Study:Quest

> 게임 요소를 활용하여 학생들의 학습 참여를 유도하는 교육 플랫폼

---

## 📌 프로젝트 소개

### 프로젝트 개요

**Study:Quest**는 학생과 선생님이 함께 사용할 수 있는 학습 관리 및 퀴즈 플랫폼입니다.

학생은 퀴즈를 풀고 경험치와 레벨을 획득하며, 랭킹과 이벤트 등의 기능을 통해 학습에 지속적으로 참여할 수 있습니다.

선생님은 퀴즈를 관리하며, 학생들의 퀴즈 결과와 제출 현황을 확인할 수 있습니다.

### 프로젝트 목표

- 학생들의 학습 참여를 유도할 수 있는 게임형 학습 서비스 구현
- 학생과 선생님의 역할에 따른 기능 제공
- 퀴즈 풀이 및 결과 관리 기능 구현
- Spring Boot와 React를 활용한 REST API 기반 웹 서비스 구현
- Git을 활용한 팀 단위 협업 경험

---

## 📅 프로젝트 기간

**2026.08.25 ~ 2026.09.03**

---

# 🛠 기술 스택

## Backend

| 기술 | 사용 목적 |
|---|---|
| Java | Backend 개발 |
| Spring Boot | 웹 애플리케이션 개발 |
| Spring MVC | REST API 구현 |
| Spring Data JPA | ORM 및 데이터 접근 |
| Oracle | 데이터베이스 |
| Gradle | 프로젝트 빌드 및 의존성 관리 |

## Frontend

| 기술 | 사용 목적 |
|---|---|
| React | 사용자 인터페이스 구현 |
| JavaScript | Frontend 개발 |
| Axios | Backend API 통신 |
| Redux | 전역 상태 관리 |
| Tailwind CSS | UI 스타일링 |

## 협업 및 개발 도구

| 도구 | 사용 목적 |
|---|---|
| Git | 버전 관리 |
| GitHub | 코드 관리 및 협업 |
| IntelliJ IDEA | Backend 개발 |
| VS Code | Frontend 개발 |

---

# 🏗 프로젝트 구조

Study:Quest는 Spring Boot 기반의 Backend와 React 기반의 Frontend를 분리하여 개발했습니다.

    StudyQuest
    ├── studyquest-backend
    │   └── Spring Boot
    │
    └── studyquest-frontend
        └── React

### Backend 구조

    Controller
        ↓
    Service
        ↓
    Repository
        ↓
    Database

### Frontend 구조

    React Page
        ↓
    Component
        ↓
    Axios
        ↓
    REST API
        ↓
    Spring Boot

---

# ✨ 주요 기능

## 🏠 메인 페이지

- 서비스 메인 화면 제공
- 기존 사용자 로그인 페이지 이동
- 신규 사용자 회원가입 페이지 이동

### 서비스 이용 흐름

    메인 페이지
        ├── 새로운 시작 → 회원가입
                       ↓
                  회원가입 완료
                       ↓
                     로그인
        │
        └── 불러오기 → 로그인
        │              ↓
        │        학생 / 선생님 구분

---

## 👤 회원 및 로그인

### 회원가입

- 신규 사용자 회원가입
- 학생 / 선생님 역할 선택
- 회원가입 정보 입력 및 저장
- 회원가입 완료 후 로그인 진행

### 로그인

- 이메일 및 비밀번호를 이용한 로그인
- 학생 / 선생님 역할 구분
- 로그인 사용자 정보 관리
- 로그인 상태 유지

### 로그아웃

- 로그아웃 기능 제공
- 로그인 상태 초기화
- 로그인 화면으로 이동

### 사용자 정보

- 사용자 기본 정보 조회
- 학생 / 선생님 역할에 따른 정보 관리
- 역할에 따른 화면 및 메뉴 구성

---

## 👨‍🎓 학생 기능

### 마이페이지

- 학생 기본 정보 확인
- 레벨 및 경험치 확인
- 학습 관련 정보 확인
- 상위 랭킹 조회

### 퀴즈

- 등록된 퀴즈 목록 조회
- 퀴즈 문제 풀이
- 객관식 문제
- 주관식 문제
- O/X 문제
- 퀴즈 제출

### 퀴즈 결과

- 자신이 제출한 퀴즈 결과 조회
- 퀴즈 제목 및 번호 확인
- 점수 확인
- 제출일 확인

### 랭킹

- 학생별 랭킹 조회
- 경험치 및 레벨 기반 정보 확인

### 이벤트

- 출석 이벤트
- 이벤트 참여
- 출석에 따른 보상

---

# 👨‍🏫 선생님 기능

### 퀴즈 등록

- 퀴즈 등록
- 퀴즈 유형 선택
- 객관식 / 주관식 / O/X 문제 등록
- 정답 및 선택지 관리

### 퀴즈 관리

- 등록된 퀴즈 조회
- 퀴즈 관리 기능

### 학생 결과 조회

- 특정 퀴즈의 학생 제출 결과 조회
- 제출 인원 확인
- 학생별 결과 확인

### 담당 학년

- 선생님 계정의 담당 학년 표시
- 사용자 상세정보 API를 통한 담당 학년 조회

---

# 📝 퀴즈 유형

| 유형 | 설명 |
|---|---|
| 객관식 | 여러 선택지 중 정답 선택 |
| 주관식 | 정답을 직접 입력 |
| O/X | O 또는 X 선택 |

---

# 📊 퀴즈 결과 API

| Method | URI | 설명 |
|---|---|---|
| POST | `/results` | 학생의 퀴즈 답안 제출 및 결과 저장 |
| GET | `/results?studentNo={studentNo}` | 특정 학생의 전체 퀴즈 결과 조회 |
| GET | `/results?quizNo={quizNo}` | 특정 퀴즈의 학생 결과 조회 |
| GET | `/results/{resultNo}` | 특정 퀴즈 결과 조회 |

### 학생 결과

- 퀴즈 번호
- 퀴즈 제목
- 점수
- 제출일

### 선생님 결과

- 퀴즈 번호
- 퀴즈 제목
- 제출 인원
- 학생 결과 관리

---

# 🗄️ ERD

> 프로젝트 최종 ERD 이미지를 추가해주세요.

![ERD](./images/erd.png)

---

# 🖥️ 주요 화면

## 🔐 로그인

![로그인](./images/login.png)

---

## 👨‍🎓 학생 메인

![학생 메인](./images/student-main.png)

---

## 📝 퀴즈

![퀴즈](./images/quiz.png)

---

## 📊 퀴즈 결과

![퀴즈 결과](./images/result.png)

---

## 🏆 랭킹

![랭킹](./images/ranking.png)

---

## 🎁 이벤트

![이벤트](./images/event.png)

---

## 👨‍🏫 선생님 페이지

![선생님 페이지](./images/teacher.png)

---

## 📝 퀴즈 등록

![퀴즈 등록](./images/quiz-register.png)

---

# 👥 팀원 및 담당 기능

| 팀원 | 담당 기능 |
|---|---|
| **[팀원 1]** | 회원 / 로그인 / 학생 기능 |
| **[팀원 2]** | 퀴즈 / 선생님 기능 |
| **[팀원 3]** | 랭킹 / 이벤트 / 퀴즈 결과 |

> ※ 실제 팀원 이름과 담당 기능에 맞게 수정

---

# 🔧 Troubleshooting

## 1. localhost:8080 접속 시 `/login`으로 자동 이동되는 문제

### 문제 상황

`localhost:8080/ranks`로 직접 접속했을 때 Controller에서 설정한 페이지가 정상적으로 출력되지 않고 `/login`으로 자동 이동하는 문제가 발생했습니다.

HTTP 상태 코드 오류나 Controller의 매핑 오류가 발생한 것이 아니었기 때문에 요청 처리 과정의 앞단을 확인했습니다.

### 원인

프로젝트의 `build.gradle`에 Spring Security 관련 의존성이 포함되어 있었습니다.

    implementation 'org.springframework.boot:spring-boot-starter-security'
    testImplementation 'org.springframework.security:spring-security-test'

프로젝트에서는 당시 Spring Security를 사용하지 않고 있었기 때문에 해당 의존성으로 인해 인증되지 않은 요청이 `/login`으로 이동하고 있었습니다.

### 문제 해결 과정

    localhost:8080/ranks
            ↓
    Spring Security
            ↓
    인증 여부 확인
            ↓
    인증되지 않은 사용자
            ↓
    /login으로 리다이렉트

프로젝트에서 Security를 사용하지 않는 상태였기 때문에 관련 의존성을 제거하여 문제를 해결했습니다.

### 배운 점

Controller의 URI 매핑만 확인하는 것이 아니라 Filter, Security 등 Controller 이전 단계에서 요청을 가로채고 있는 요소도 함께 확인해야 한다는 것을 배웠습니다.

---

## 2. 선생님 페이지 헤더의 담당 학년이 1학년으로 고정되는 문제

### 문제 상황

DB에는 선생님의 담당 학년이 정상적으로 저장되어 있었지만, 선생님 페이지의 헤더에는 다음과 같이 기본값인 `1학년 담당 선생님`이 출력되는 문제가 발생했습니다.

    1학년 담당 [김자바]

Console에서 확인한 결과 담당 학년 데이터가 정상적으로 전달되지 않고 있었습니다.

    선생님 학년 확인:
    {
        finalTeacherGrade: null,
        reduxTeacherGrade: null,
        userInfoTeacherGrade: undefined
    }

### 원인

로그인 API의 응답에는 다음과 같은 사용자 정보가 포함되어 있었습니다.

    {
        userNo: 23,
        userEmail: "qqq@naver.com",
        studentNo: null,
        userType: 2,
        userName: "김자바",
        teacherNo: 8,
        roleNames: ["TEACHER"],
        accessToken: "...",
        refreshToken: "..."
    }

하지만 `teacherGrade`가 포함되어 있지 않았습니다.

기존 `TopMenu`에서는 사용자 정보에 `teacherGrade`가 존재하지 않을 경우 기본값을 출력하도록 되어 있었습니다.

따라서 DB에 담당 학년이 정상적으로 저장되어 있더라도 Frontend까지 해당 데이터가 전달되지 않아 기본값인 `1학년 담당 선생님`이 출력되고 있었습니다.

### 해결 방법

Backend를 확인한 결과 기존 사용자 상세정보 API에서 `teacherGrade`를 이미 제공하고 있었습니다.

    GET /users/{userNo}

따라서 로그인 API를 불필요하게 수정하지 않고 `userNo`를 이용하여 기존 사용자 상세정보 API를 호출하도록 수정했습니다.

### 수정 후 데이터 흐름

    로그인
      ↓
    userNo = 23
      ↓
    BasicLayout
      ↓
    TopMenu에 userNo 전달
      ↓
    GET /users/23
      ↓
    UserService
      ↓
    Teacher 조회
      ↓
    teacher.getTeacherGrade()
      ↓
    teacherGrade = 3
      ↓
    UserResponseDTO
      ↓
    TopMenu
      ↓
    3학년 담당 [김자바]

### 배운 점

DB에 데이터가 존재한다고 해서 Frontend에서 바로 사용할 수 있는 것은 아니며,

    Database
        ↓
    Repository
        ↓
    Service
        ↓
    Controller
        ↓
    API Response
        ↓
    Axios
        ↓
    Redux / State
        ↓
    Props
        ↓
    React Component
        ↓
    화면

각 계층을 따라 데이터가 실제로 전달되고 있는지 확인해야 한다는 것을 배웠습니다.

---

# 💡 프로젝트를 통해 배운 점

## Backend

- Spring Boot 기반 REST API 구현
- Controller → Service → Repository 구조 이해
- JPA를 활용한 Entity 및 데이터 접근
- DTO를 통한 API 요청 및 응답 데이터 관리
- Oracle Database 연동
- Frontend와 Backend 간 API 데이터 흐름 이해

## Frontend

- React 컴포넌트 기반 UI 구성
- Props와 State 관리
- Redux를 이용한 전역 상태 관리
- Axios를 이용한 REST API 통신
- Backend API와 React 화면 연동

## 협업

- Git Branch를 활용한 기능별 개발
- GitHub를 통한 코드 공유
- Backend / Frontend 간 API 명세를 기반으로 기능 연동
- 기능 통합 과정에서 발생한 오류 분석 및 수정
- 기존 코드를 분석하고 필요한 부분을 최소한으로 수정하는 경험

---

# 🔍 프로젝트를 진행하며 경험한 문제 해결

프로젝트 개발 과정에서 단순히 기능을 구현하는 것뿐만 아니라 Backend와 Frontend를 통합하는 과정에서 발생한 여러 문제를 직접 확인하고 해결했습니다.

### 주요 경험

- Spring Security에 의한 인증 및 페이지 리다이렉트 문제
- React Props / Redux 데이터 전달 문제
- API 응답 데이터 누락 문제
- Backend와 Frontend 간 API 연동 문제
- 사용자 상세정보 조회 및 데이터 전달 문제
- Git Branch 통합 과정에서 발생한 오류 수정

특히 데이터 관련 문제를 해결하면서 단순히 특정 파일만 확인하는 것이 아니라 전체적인 데이터 흐름을 추적하는 방법을 익혔습니다.

    Database
       ↓
    Repository
       ↓
    Service
       ↓
    Controller
       ↓
    API Response
       ↓
    Axios
       ↓
    Redux / State
       ↓
    Props
       ↓
    React Component
       ↓
    화면

이를 통해 문제가 발생했을 때 어느 한 계층만 확인하는 것이 아니라 데이터가 처음 생성되는 지점부터 최종적으로 화면에 출력되는 지점까지 순서대로 확인하는 습관을 갖게 되었습니다.

---

# 📌 프로젝트 회고

Study:Quest 프로젝트를 통해 Spring Boot와 React를 활용한 웹 서비스 개발 과정을 경험했습니다.

각자의 기능을 개발하는 것뿐만 아니라 서로 다른 기능을 하나의 서비스로 통합하는 과정에서 API 명세와 데이터 구조를 맞추는 것이 중요하다는 것을 배웠습니다.

또한 개발 과정에서 발생한 오류를 단순히 수정하는 것에 그치지 않고, 요청이 어떤 과정을 거쳐 처리되는지와 데이터가 각 계층에서 어떻게 전달되는지를 확인하면서 문제의 원인을 찾는 경험을 할 수 있었습니다.

특히 Backend에서 정상적으로 존재하는 데이터가 Frontend 화면에 출력되지 않는 문제를 해결하면서 Controller, Service, Repository뿐만 아니라 API Response와 React의 State 및 Props까지 전체 데이터 흐름을 확인하는 경험을 할 수 있었습니다.

프로젝트 기간 내 모든 기획 기능을 완성하지는 못했지만, 기능 개발부터 API 연동, 오류 수정, Git을 활용한 협업까지 하나의 프로젝트를 완성해 나가는 전반적인 개발 과정을 경험할 수 있었습니다.

---

# 🚀 실행 방법

## Backend

    cd studyquest-backend
    ./gradlew bootRun

Windows 환경에서는:

    cd studyquest-backend
    gradlew.bat bootRun

## Frontend

    cd studyquest-frontend
    npm install
    npm run dev

---

# 📁 Repository

- Backend: `studyquest-backend`
- Frontend: `studyquest-frontend`

---

# 👨‍💻 Team

### Study:Quest

| 이름 | 역할 |
|---|---|
| [팀원 1] | Backend / Frontend |
| [팀원 2] | Backend / Frontend |
| [팀원 3] | Backend / Frontend |