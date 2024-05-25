import { ClassScheme, MappedVariables } from "../type";

const useGeneratedVariables = (variable: string) => `var(--${variable})`;

export const getClassesDefinition = (
  mappedVariables: MappedVariables
): ClassScheme => ({
  h1: {
    fontSize: useGeneratedVariables(mappedVariables.fontSizes.h1),
    fontWeight: useGeneratedVariables(mappedVariables.fontWeight.h1),
    lineHeight: useGeneratedVariables(mappedVariables.lineHeight.h1),
  },
  h2: {
    fontSize: useGeneratedVariables(mappedVariables.fontSizes.h2),
    fontWeight: useGeneratedVariables(mappedVariables.fontWeight.h2),
    lineHeight: useGeneratedVariables(mappedVariables.lineHeight.h2),
  },
  h3: {
    fontSize: useGeneratedVariables(mappedVariables.fontSizes.h3),
    fontWeight: useGeneratedVariables(mappedVariables.fontWeight.h3),
    lineHeight: useGeneratedVariables(mappedVariables.lineHeight.h3),
  },
  h4: {
    fontSize: useGeneratedVariables(mappedVariables.fontSizes.h4),
    fontWeight: useGeneratedVariables(mappedVariables.fontWeight.h4),
    lineHeight: useGeneratedVariables(mappedVariables.lineHeight.h4),
  },
  primaryButton: {
    color: useGeneratedVariables(mappedVariables.colors.white),
    backgroundColor: useGeneratedVariables(mappedVariables.colors.primary),
  },
});
