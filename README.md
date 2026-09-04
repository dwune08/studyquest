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
- 학생 기본 정보 수정
- 레벨 및 경험치 확인
- 학습 관련 정보 확인
- 상위 랭킹 조회

### 퀴즈

- 등록된 퀴즈 목록 조회
- 퀴즈 문제 풀이
- 객관식 문제 (O/X 퀴즈, 5지선다 퀴즈)
- 주관식 문제 (단답형 퀴즈)
- 퀴즈 제출

### 퀴즈 결과

- 자신이 제출한 퀴즈 결과 조회
- 퀴즈 제목 및 정답 확인
- 경험치와 문제 유형에 따른 능력치 획득

### 랭킹

- 학생별 랭킹 조회
- 경험치 및 레벨 기반 정보 확인
- 자신의 데이터의 강조 처리
- 페이지네이션으로 인한 다른 데이터 조회

### 출석

- 출석 이벤트
- 출석에 따른 보상
- 주간 출석 달성도 조회
- 1주일 연속 출석에 대한 추가 경험치 보상 획득

---

# 👨‍🏫 선생님 기능

### 퀴즈 등록

- 퀴즈 등록
- 퀴즈 유형 선택 (5지선다, 단답형, O/X)
- 정답 및 선택지 관리

### 퀴즈 관리

- 등록된 퀴즈 조회
- 퀴즈 관리 기능

### 학생 결과 조회

- 특정 퀴즈의 학생 제출 결과 조회
- 제출 인원 확인
- 그래프를 통한 성적, 점수, 정답률 조회

### 담당 학년

- 선생님 계정의 담당 학년 표시
- 사용자 상세정보 API를 통한 담당 학년 조회

---

# 📝 퀴즈 유형

| 유형   | 설명              |
|------|-----------------|
| 5지선다 | 5가지 선택지 중 정답 선택 |
| 단답형  | 정답을 직접 입력       |
| O/X  | O 또는 X 선택       |

---

# 📡 API

StudyQuest에서 제공하는 REST API 명세입니다.

> **Base URL**: `/`

---

## 👤 User

회원가입, 로그인, 회원 정보 및 마이페이지를 관리합니다.

|  Method  | Endpoint                      | 권한           | 설명                |
| :------: | ----------------------------- | ------------ | ----------------- |
|  `POST`  | `/users`                      | `Permit All` | 회원가입              |
|  `POST`  | `/users/login`                | `Permit All` | 로그인               |
|  `POST`  | `/users/refresh`              | `Permit All` | Access Token 재발급  |
|   `GET`  | `/users/{userNo}`             | `본인`         | 내 정보 조회           |
|  `PATCH` | `/users/{userNo}`             | `본인`         | 회원 정보 수정          |
| `DELETE` | `/users/{userNo}`             | `본인`         | 회원 탈퇴             |
|   `GET`  | `/students/{studentNo}`       | `인증 필요`      | 학생 정보 단건 조회       |
|   `GET`  | `/mypage/me`                  | `인증 필요`      | 로그인한 본인의 마이페이지 조회 |
|   `GET`  | `/mypage/student/{studentNo}` | `인증 필요`      | 특정 학생의 마이페이지 조회   |

---

## 📝 Quiz

선생님이 퀴즈를 등록·수정·삭제하고, 학생이 퀴즈를 조회할 수 있습니다.

|  Method  | Endpoint            | 권한             | 설명             |
| :------: | ------------------- | -------------- | -------------- |
|  `POST`  | `/quizzes`          | `ROLE_TEACHER` | 퀴즈 등록          |
|   `GET`  | `/quizzes`          | `인증 필요`        | 퀴즈 목록 조회 및 필터링 |
|   `GET`  | `/quizzes/{quizNo}` | `인증 필요`        | 퀴즈 상세 조회       |
|  `PATCH` | `/quizzes/{quizNo}` | `ROLE_TEACHER` | 퀴즈 수정          |
| `DELETE` | `/quizzes/{quizNo}` | `ROLE_TEACHER` | 퀴즈 삭제          |

---

## 📊 Result

학생의 퀴즈 답안 제출 및 채점 결과를 관리하고, 선생님에게 학생별 퀴즈 결과를 제공합니다.

### 👨‍🎓 학생

학생은 자신의 퀴즈 제출 및 결과를 조회할 수 있습니다.

**제공 정보**

* 퀴즈 번호
* 퀴즈 제목
* 점수
* 제출일

| Method | Endpoint           | 권한             | 설명                 |
| :----: | ------------------ | -------------- | ------------------ |
| `POST` | `/results`         | `ROLE_STUDENT` | 퀴즈 답안 제출 및 채점      |
|  `GET` | `/results/me`      | `ROLE_STUDENT` | 본인의 전체 퀴즈 제출 이력 조회 |
|  `GET` | `/results/me/quiz` | `ROLE_STUDENT` | 본인의 특정 퀴즈 제출 결과 조회 |

### 👨‍🏫 선생님

선생님은 특정 퀴즈에 제출된 학생들의 결과를 조회할 수 있습니다.

**제공 정보**

* 퀴즈 번호
* 퀴즈 제목
* 제출 인원
* 학생별 결과

| Method | Endpoint                 | 권한             | 설명                    |
| :----: | ------------------------ | -------------- | --------------------- |
|  `GET` | `/results/quiz/{quizNo}` | `ROLE_TEACHER` | 특정 퀴즈의 전체 학생 제출 결과 조회 |

---

## 👨‍🏫 Teacher

선생님 페이지에서 담당 학생들의 학습 및 성적 현황을 확인합니다.

| Method | Endpoint                    | 권한      | 설명                 |
| :----: | --------------------------- | ------- | ------------------ |
|  `GET` | `/teachers/statistics`      | `인증 필요` | 성적 통계 조회           |
|  `GET` | `/teachers/student-results` | `인증 필요` | 담당 퀴즈의 학생 제출 현황 조회 |

---

## 🏆 Rank

학생들의 랭킹 정보를 조회합니다.

| Method | Endpoint | 권한      | 설명       |
| :----: | -------- | ------- | -------- |
|  `GET` | `/ranks` | `인증 필요` | 랭킹 목록 조회 |

---

## 📅 Event

학생의 출석 정보를 관리합니다.

| Method | Endpoint | 권한      | 설명           |
| :----: | -------- | ------- | ------------ |
|  `GET` | `/event` | `인증 필요` | 본인의 출석 정보 조회 |
| `POST` | `/event` | `인증 필요` | 출석 체크        |

---

## 🔐 권한

| 권한             | 설명                  |
| -------------- | ------------------- |
| `Permit All`   | 로그인하지 않은 사용자도 접근 가능 |
| `인증 필요`        | 로그인한 사용자만 접근 가능     |
| `본인`           | 본인의 데이터만 접근 가능      |
| `ROLE_STUDENT` | 학생 권한 필요            |
| `ROLE_TEACHER` | 선생님 권한 필요           |


---

## 🗄️ ERD

### 전체 ERD

<p align="center">
  <a href="./studyquest-backend/docs/erd.png">
    <img src="./studyquest-backend/docs/erd.png" width="100%">
  </a>
</p>

### 주요 도메인

<details>
<summary>👤 User / Student / Teacher </summary>

<img src="./studyquest-backend/docs/user.png" width="100%">
<img src="./studyquest-backend/docs/student.png" width="100%">
<img src="./studyquest-backend/docs/teacher.png" width="100%">

</details>

<details>
<summary>📝 Quiz / Result / Option</summary>

<img src="./studyquest-backend/docs/quiz.png" width="100%">
<img src="./studyquest-backend/docs/result.png" width="100%">
<img src="./studyquest-backend/docs/option.png" width="100%">

</details>

<details>
<summary>📅 Attendance / Status</summary>

<img src="./studyquest-backend/docs/attendance.png" width="100%">
<img src="./studyquest-backend/docs/status.png" width="100%">

</details>

---

# 🖥️ 주요 화면

## 🏠 메인 페이지

![메인페이지](./studyquest-backend/images/mainPage.png)



## 🔐 로그인 및 회원가입

<p align="center">
  <img src="./studyquest-backend/images/join.png" width="48%" />
  <img src="./studyquest-backend/images/login.png" width="48%" />
</p>

---

## 👨‍🎓 학생 메인

![학생 메인](./studyquest-backend/images/student.png)

---

## 👨‍🎓 학생 정보 수정

![학생 정보 수정](./studyquest-backend/images/update.png)

---

## 📝 퀴즈 메인

![퀴즈 메인](./studyquest-backend/images/quizGo.png)

---

## 📝 퀴즈 목록

<table align="center">
  <tr>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/quiz-1.png" width="100%" alt="퀴즈 화면 1" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/quiz-2.png" width="100%" alt="퀴즈 화면 2" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/quiz-3.png" width="100%" alt="퀴즈 화면 3" />
    </td>
  </tr>
</table>

---

## 📝 퀴즈 디테일 화면

<table align="center">
  <tr>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/quizDetail1.png" width="100%" alt="퀴즈 화면 1" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/quizDetail2.png" width="100%" alt="퀴즈 화면 2" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/quizDetail3.png" width="100%" alt="퀴즈 화면 3" />
    </td>
  </tr>
</table>

---

## 📊 퀴즈 결과

<p align="center">
  <img src="./studyquest-backend/images/quizGood.png" width="48%" />
  <img src="./studyquest-backend/images/quizFail.png" width="48%" />
</p>

---

## 🏆 랭킹

![랭킹](./studyquest-backend/images/rank.png)

---

## 🎁 출석

<p align="center">
  <img src="./studyquest-backend/images/event1.png" width="48%" />
  <img src="./studyquest-backend/images/event2.png" width="48%" />
</p>

---

## 👨‍🏫 선생님 페이지

<table align="center">
  <tr>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/teacher1.png" width="100%" alt="퀴즈 화면 1" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/teacher2.png" width="100%" alt="퀴즈 화면 2" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/teacher3.png" width="100%" alt="퀴즈 화면 3" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/teacher4.png" width="100%" alt="퀴즈 화면 3" />
    </td>
  </tr>
</table>

---

## 📝 퀴즈 등록

<table align="center">
  <tr>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/regist1.png" width="100%" alt="퀴즈 화면 1" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/regist2.png" width="100%" alt="퀴즈 화면 2" />
    </td>
    <td width="33%" align="center">
      <img src="./studyquest-backend/images/regist3.png" width="100%" alt="퀴즈 화면 3" />
    </td>
  </tr>
</table>

---

# 👥 팀원 및 담당 기능

| 팀원           | 담당 기능 |
|--------------|---|
| **[한진형/팀장]** | 회원 / 로그인 / 학생 기능 |
| **[김성민]**    | 퀴즈 / 선생님 기능 |
| **[장호영]**    | 랭킹 / 이벤트 / 퀴즈 결과 |

---

# 🔧 Troubleshooting

[한진형]

## 1. 

### 문제 상황
랭킹 페이지 최초 진입 시 표시 오류
- 랭킹 페이지에 처음 진입했을 때, 로그인한 사용자의 실제 순위가 포함된 페이지(예: 5페이지) 대신 엉뚱한 페이지(1페이지 또는 잘못 매핑된 6페이지)가 표시됨.


### 원인
- 오류 원인 :
프론트엔드와 백엔드 간 최초 진입(Initial Request)을 판별하는 기준의 부재 (DTO의 기본값으로 인해 page 값이 0이나 null이 아닌 1로 바인딩됨).
컨트롤러에서 @GetMapping("/ranks")와 클래스 레벨의 @RequestMapping("/ranks")가 중첩되어 잘못된 URL(/ranks/ranks)이 생성되면서 시큐리티 예외 발생.
백엔드 서비스 계층에서 유저의 실제 순위(myRank)를 기반으로 targetPage를 계산하는 로직이 있었으나, 진입 조건 플래그(isInitialRequest)가 올바르게 전달되지 않아 우회됨.


### 문제 해결 과정
단계별 조치 방법:
- Step 1: 프론트엔드에서 최초 진입 시 page 파라미터를 아예 보내지 않거나 명시적으로 제어할 수 있도록 구조 수정.
- Step 2: 백엔드 컨트롤러에서 @RequestParam(value = "page", required = false)를 사용하여 page 파라미터의 유무로 최초 진입(isInitialRequest = true) 여부를 명확하게 판별.
- Step 3: 서비스 계층에서 최초 진입 시 로그인된 유저의 실제 순위를 DB에서 조회하여 알맞은 페이지 번호를 동적으로 계산((myRank - 1) / size + 1)한 뒤 리턴.


### 배운 점
프론트엔드의 상태 관리와 백엔드의 파라미터 바인딩 타이밍을 일치시키는 것이 동적 페이지네이션 구현의 핵심이며, 문제가 발생했을 때 컨트롤러 진입 지점에 상세 로그를 찍어 파라미터의 유입 상태를 확인하는 것이 디버깅의 지름길이다.

-----

## 2.

### 문제 상황
퀴즈 등록 시 5지선다형이 아닌 O/X 퀴즈나 단답형 퀴즈를 등록할 때 서버 에러 발생.


### 원인
- 프론트엔드에서 O/X 및 단답형 퀴즈 등록 시 사용되지 않는 choice1, choice2 필드에 null을 전달했으나, 데이터베이스의 CHOICES 테이블 내 CHOICE1, CHOICE2 컬럼에 NOT NULL 제약조건이 걸려 있어 무결성 위반 에러가 발생함.
- Choices 엔티티와 테이블 설계상 선택지 1번과 2번은 필수 값(NOT NULL)으로 지정되어 있어, 5지선다형 외의 퀴즈 타입에서 빈 값을 그대로 넘기면 데이터베이스에 저장할 수 없음.
- 프론트엔드의 기존 정답 입력 구조(숫자형)와 폼 데이터 전송 방식을 유지하기 위해, 데이터베이스 제약조건을 우회하거나 백엔드에서 데이터 가공 처리가 필요함.

### 문제 해결 과정
- 백엔드 서비스 레이어(QuizServiceImpl.createQuiz)에서 퀴즈 타입(quizType)이 5지선다형(0)이 아닐 경우, choice1과 choice2에 기본 더미 값("-")을 할당하여 데이터베이스의 NOT NULL 제약조건을 충족하도록 수정.

- 이하 예시 코드

// QuizServiceImpl.java 수정 적용
String c1 = quizDTO.getChoice1();
String c2 = quizDTO.getChoice2();

if (quizDTO.getQuizType() != 0) {
c1 = "-";
c2 = "-";
}

Choices choices = Choices.builder()
.quiz(savedQuiz)
.choice1(c1)
.choice2(c2)
.choice3(quizDTO.getChoice3())
.choice4(quizDTO.getChoice4())
.choice5(quizDTO.getChoice5())
.build();

choicesRepository.save(choices);


### 배운 점
- 설계 단계에서 DB의 제약조건을 꼼꼼히 확인해야 이후 예기치 못한 오류가 발생하는 것을 막을 수 있다. 
----

[김성민]

## 1.

### 문제 상황



### 원인


### 문제 해결 과정


### 배운 점

-----

[장호영]

## 1.

### 문제 상황



### 원인


### 문제 해결 과정


### 배운 점





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

Windows:

    cd studyquest-backend
    gradlew.bat bootRun

MacOs / Linux:

    gradlew bootRun

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

| 이름    | 역할 |
|-------|---|
| [한진형] | Backend / Frontend |
| [김성민] | Backend / Frontend |
| [장호영] | Backend / Frontend |
