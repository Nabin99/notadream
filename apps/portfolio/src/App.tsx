import { getAppConfig } from "@notadream/react";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { browserRouter } from "./Routes";

import "@notadream/react/dist/index.css";

function App() {
  const appConfig = getAppConfig();

  useEffect(() => {
    const initialHue = 187;
    const saturation = 79;
    const lightness = 47;
    let currentHue = initialHue;

    const updatePrimaryColor: IdleRequestCallback = (deadline) => {
      if (deadline.timeRemaining() > 0) {
        currentHue = (currentHue + 1) % 360; // Increment and loop hue
        const newColor = `hsl(${currentHue}, ${saturation}%, ${lightness}%)`;
        (
          document.getElementsByClassName("page-layout")[0] as HTMLElement
        ).style.setProperty("--nd-colors-accent", newColor);
      }
      requestIdleCallback(updatePrimaryColor, {
        timeout: 10000, // Increase timeout to decrease update frequency
      });
    };

    let idleCallbackId: number;

    if (appConfig.theme.multiColorMode) {
      idleCallbackId = requestIdleCallback(updatePrimaryColor);
    }

    return () => {
      if (appConfig.theme.multiColorMode) {
        return cancelIdleCallback(idleCallbackId);
      }
    }; // Cleanup on unmount
  }, []);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
