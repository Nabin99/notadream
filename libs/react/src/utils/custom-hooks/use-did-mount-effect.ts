import React, { useEffect, useRef } from "react";

export const useDidMountEffect = (
  callback: React.EffectCallback,
  dependencyArray: React.DependencyList
) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return callback();
    } else {
      isMounted.current = true;
      return;
    }
  }, dependencyArray);
};
