//import { RouterProvider } from "react-router";
//import root from "./router/root";
//import StudentMyPage from "./pages/student/StudentMyPage";

/*const App = () => {
  return <RouterProvider router={root} />;
  <StudentMyPage />;
  
};*/

//export default App;

/*import { useEffect, useState } from "react";
import { getStatus } from "./api/statusApi";

function App() {

  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const loadStatus = async () => {

      try {

        const data = await getStatus(5);

        console.log("STATUS DATA:", data);

        setStatus(data);

      } catch (err) {

        console.error(err);

        setError(
          err.response?.data?.error
          || err.message
        );
      }
    };

    loadStatus();

  }, []);

  if (error) {
    return (
      <div className="p-10 text-red-500">
        오류: {error}
      </div>
    );
  }

  if (!status) {
    return (
      <div className="p-10">
        STATUS 데이터 불러오는 중...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-10">

      <div className="mx-auto max-w-xl bg-white p-8">

        <h1 className="mb-6 text-3xl font-bold">
          STUDY:QUEST STATUS TEST
        </h1>

        <p>
          학생번호:
          {status.studentNo}
        </p>

        <p>
          레벨:
          {status.statusLevel}
        </p>

        <p>
          공격력:
          {status.statusAttack}
        </p>

        <p>
          지혜:
          {status.statusWisdom}
        </p>

        <p>
          스피드:
          {status.statusSpeed}
        </p>

        <p>
          경험치:
          {status.statusExp}
        </p>

        <p>
          다음 레벨 경험치:
          {status.nextLevelExp}
        </p>

      </div>

    </div>
  );
}

export default App;*/

import root from "./router/root";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={root} />;
}

export default App;