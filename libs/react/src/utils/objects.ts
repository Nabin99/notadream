export const deepUpdateObject = <T>(target: T, updates: Partial<T>) => {
  // Helper function to recursively update object properties

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateRecursive = (target: any, updates: any): void => {
    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        if (
          typeof updates[key] === "object" &&
          typeof target[key] === "object"
        ) {
          updateRecursive(target[key], updates[key]);
        } else {
          target[key] = updates[key];
        }
      }
    }
  };

  updateRecursive(target, updates);
};
