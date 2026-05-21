import { getAppConfig } from "@notadream/react";
import { useEffect, useRef } from "react";

export const useRotateCSSColorValue = () => {
  const appConfig = getAppConfig();
  const hueReference = useRef(187); // Store hue in a ref to avoid unnecessary re-renders
  const frameReference = useRef<number | null>(null);

  useEffect(() => {
    if (!appConfig.theme.multiColorMode) return;

    const updatePrimaryColor = () => {
      hueReference.current = (hueReference.current + 1) % 360;
      const newColor = `hsl(${hueReference.current}, 79%, 47%)`;

      // Get element safely
      const layoutElement = document.querySelector("body") as HTMLElement;
      if (layoutElement) {
        layoutElement.style.setProperty("--nd-colors-accent", newColor);
      }

      // Use setTimeout for better performance instead of requestAnimationFrame (adjust delay as needed)
      frameReference.current = window.setTimeout(updatePrimaryColor, 144); // Update every 100ms
    };

    frameReference.current = window.setTimeout(updatePrimaryColor, 144);

    return () => {
      if (frameReference.current !== null) {
        clearTimeout(frameReference.current);
      }
    };
  }, [appConfig.theme.multiColorMode]);
};
