import { ThemeMode } from "../type";

export const generateCSSVariableFromThemeKey = <T>(
  object: T,
  concatinatedPrefix: string,
  prefix: string,
  colorScheme: Omit<ThemeMode, "auto">,
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
    colorScheme: Omit<ThemeMode, "auto">
  ) => {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const modifiedKey = `${concatinatedPrefix}-${key
          .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
          .toLowerCase()}`;
        if (modifiedKey.includes("colors-")) {
          generatedColorVariablesString += `--${modifiedKey}:${
            object[key][colorScheme as keyof object]
          };`;
        } else if (typeof object[key] === "object") {
          cssVariableGenerator(
            object[key as keyof object],
            modifiedKey,
            prefix,
            colorScheme
          );
        } else {
          !onlyColor &&
            (generatedNonColorVariablesString += `--${modifiedKey}:${object[key]};`);
        }
      }
    }
  };

  cssVariableGenerator(object, concatinatedPrefix, prefix, colorScheme);

  return { generatedColorVariablesString, generatedNonColorVariablesString };
};
