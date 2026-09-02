const quizData = [
  {
    quizNo: 1,
    code: "Q1",
    title: "수학 기초 퀴즈",
    subtitle: "5지선다",
    type: "MULTIPLE_CHOICE",
    category: "수학",
    question: "15 + 3의 계산 결과로 알맞은 것을 고르세요.",
    choices: [
      { choiceNo: 1, text: "15" },
      { choiceNo: 2, text: "16" },
      { choiceNo: 3, text: "17" },
      { choiceNo: 4, text: "18" },
      { choiceNo: 5, text: "19" },
    ],
    answer: "18",
    explanation: "15에 3을 더하면 18입니다.",
  },
  {
    quizNo: 2,
    code: "Q2",
    title: "OX 상식 퀴즈",
    subtitle: "O / X",
    type: "OX",
    category: "수학",
    question: "시그마 '1+...n'의 공식은 n(n+1)/2이다.",
    answer: "O",
    explanation: "시그마 1부터 n까지의 합의 공식에 대한 설명이므로 정답은 O입니다.",
  },
  {
    quizNo: 3,
    code: "Q3",
    title: "빈칸 채우기",
    subtitle: "빈칸",
    type: "FILL_BLANK",
    category: "수학",
    question: "다음 식의 빈칸에 들어갈 숫자를 입력하세요.",
    expression: "15 + 3 = □",
    answer: "18",
    explanation: "15 + 3을 계산하면 18입니다.",
  },
];

export const findQuizByNo = (quizNo) => {
  return quizData.find(
    (quiz) => quiz.quizNo === Number(quizNo),
  );
};

export default quizData;