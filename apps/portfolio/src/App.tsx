import { getAppConfig } from "@notadream/react";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { browserRouter } from "./Routes";

import "@notadream/react/dist/index.css";
import "./assets/css/index.css";

function App() {
  const appConfig = getAppConfig();

  useEffect(() => {
    const initialHue = 187;
    const saturation = 79;
    const lightness = 47;
    let currentHue = initialHue;
    let idleCallbackId: number;

    const updatePrimaryColor: FrameRequestCallback = () => {
      currentHue = (currentHue + 1) % 360; // Increment and loop hue
      const newColor = `hsl(${currentHue}, ${saturation}%, ${lightness}%)`;
      (
        document.getElementsByClassName("page-layout")[0] as HTMLElement
      ).style.setProperty("--nd-colors-accent", newColor);
      // }
      idleCallbackId = requestAnimationFrame(updatePrimaryColor);
    };

    if (appConfig.theme.multiColorMode) {
      idleCallbackId = requestAnimationFrame(updatePrimaryColor);
    }

    return () => {
      if (appConfig.theme.multiColorMode) {
        cancelAnimationFrame(idleCallbackId);
      }
    };
  }, []);

  return <RouterProvider router={browserRouter} />;
}

export default App;
