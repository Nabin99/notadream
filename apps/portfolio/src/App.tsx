import { RouterProvider } from "react-router-dom";

import { browserRouter } from "./Routes";

import "@notadream/react/dist/index.css";

function App() {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
