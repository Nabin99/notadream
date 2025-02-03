import { RouterProvider } from "react-router-dom";

import { browserRouter } from "./Routes";
import { useRotateCSSColorValue } from "./utils";

import "@notadream/react/dist/index.css";
import "./assets/css/index.css";

function App() {
  useRotateCSSColorValue();

  return <RouterProvider router={browserRouter} />;
}

export default App;
