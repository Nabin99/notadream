import { MappedVariables } from "../type";

export const generateCSSVariableFromThemeKey = <T>(
  object: T,
  concatinatedPrefix: string,
  prefix: string,
  mode: "dark" | "light"
): {
  mappedGeneratedCSSVariables: MappedVariables;
  generatedVariablesString: string;
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedGeneratedCSSVariables: any = {};

  let generatedVariablesString: string = "";

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const modifiedKey = `${concatinatedPrefix}-${key
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .toLowerCase()}`;
      if (modifiedKey.includes("colors-")) {
        mappedGeneratedCSSVariables[key] = modifiedKey;
        generatedVariablesString += `--${modifiedKey}:${
          object[key][mode as keyof object]
        };`;
      } else if (typeof object[key] === "object") {
        const {
          mappedGeneratedCSSVariables: cssVariablesMapped,
          generatedVariablesString: rootVariables,
        } = generateCSSVariableFromThemeKey(
          object[key],
          modifiedKey,
          prefix,
          mode
        );
        mappedGeneratedCSSVariables[key] = cssVariablesMapped;
        generatedVariablesString += rootVariables;
      } else {
        mappedGeneratedCSSVariables[key] = modifiedKey;
        generatedVariablesString += `--${modifiedKey}:${object[key]};`;
      }
    }
  }

  return { mappedGeneratedCSSVariables, generatedVariablesString };
};
