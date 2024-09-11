export const generateCSSVariableFromThemeKey = <T>(
  object: T,
  concatinatedPrefix: string,
  prefix: string,
  mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : ("light" as "dark" | "light"),
  onlyColor = false
): {
  generatedColorVariablesString: string;
  generatedNonColorVariablesString?: string;
} => {
  let generatedColorVariablesString: string = "";
  let generatedNonColorVariablesString: string = "";

  const cssVariableGenerator = (
    object: T,
    concatinatedPrefix: string,
    prefix: string,
    mode: "dark" | "light"
  ) => {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const modifiedKey = `${concatinatedPrefix}-${key
          .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
          .toLowerCase()}`;
        if (modifiedKey.includes("colors-")) {
          generatedColorVariablesString += `--${modifiedKey}:${
            object[key][mode as keyof object]
          };`;
        } else if (typeof object[key] === "object") {
          cssVariableGenerator(
            object[key as keyof object],
            modifiedKey,
            prefix,
            mode
          );
        } else {
          !onlyColor &&
            (generatedNonColorVariablesString += `--${modifiedKey}:${object[key]};`);
        }
      }
    }
  };

  cssVariableGenerator(object, concatinatedPrefix, prefix, mode);

  return { generatedColorVariablesString, generatedNonColorVariablesString };
};
