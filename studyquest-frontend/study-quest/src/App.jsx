import { RouterProvider } from "react-router";
import root from "./router/root";

const App = () => {
  return <RouterProvider router={root} />;
  
};

export default App;