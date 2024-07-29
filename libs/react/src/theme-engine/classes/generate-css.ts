const resetBrowserDefaultCSS = `html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}
button {
    border:none;
  }`;

// const resetBrowserDefaultCSS = `/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

// html {
//   line-height: 1.15; /* 1 */
//   -webkit-text-size-adjust: 100%; /* 2 */
// }

// body {
//   margin: 0;
// }

// main {
//   display: block;
// }

// h1 {
//   font-size: 2em;
//   margin: 0.67em 0;
// }

// hr {
//   box-sizing: content-box; /* 1 */
//   height: 0; /* 1 */
//   overflow: visible; /* 2 */
// }

// pre {
//   font-family: monospace, monospace; /* 1 */
//   font-size: 1em; /* 2 */
// }

// a {
//   background-color: transparent; /* 1 */
//   -webkit-text-decoration-skip: objects; /* 2 */
// }

// abbr[title] {
//   border-bottom: none; /* 1 */
//   text-decoration: underline; /* 2 */
//   text-decoration: underline dotted; /* 2 */
// }

// b,
// strong {
//   font-weight: inherit;
// }

// b,
// strong {
//   font-weight: bolder;
// }

// code,
// kbd,
// samp {
//   font-family: monospace, monospace; /* 1 */
//   font-size: 1em; /* 2 */
// }

// dfn {
//   font-style: italic;
// }

// mark {
//   background-color: #ff0;
//   color: #000;
// }

// small {
//   font-size: 80%;
// }

// sub,
// sup {
//   font-size: 75%;
//   line-height: 0;
//   position: relative;
//   vertical-align: baseline;
// }

// sub {
//   bottom: -0.25em;
// }

// sup {
//   top: -0.5em;
// }

// audio,
// video {
//   display: inline-block;
// }

// audio:not([controls]) {
//   display: none;
//   height: 0;
// }

// img {
//   border-style: none;
// }

// svg:not(:root) {
//   overflow: hidden;
// }

// button,
// input,
// optgroup,
// select,
// textarea {
//   font-family: sans-serif; /* 1 */
//   font-size: 100%; /* 1 */
//   line-height: 1.15; /* 1 */
//   margin: 0; /* 2 */
// }

// button,
// input {
//   /* 1 */
//   overflow: visible;
// }

// button,
// select {
//   /* 1 */
//   text-transform: none;
// }

// button,
// html [type="button"],
// [type="reset"],
// [type="submit"] {
//   -webkit-appearance: button; /* 2 */
//   border:none;
// }

// button::-moz-focus-inner,
// [type="button"]::-moz-focus-inner,
// [type="reset"]::-moz-focus-inner,
// [type="submit"]::-moz-focus-inner {
//   border-style: none;
//   padding: 0;
// }

// button:-moz-focusring,
// [type="button"]:-moz-focusring,
// [type="reset"]:-moz-focusring,
// [type="submit"]:-moz-focusring {
//   outline: 1px dotted ButtonText;
// }

// fieldset {
//   padding: 0.35em 0.75em 0.625em;
// }

// legend {
//   box-sizing: border-box; /* 1 */
//   color: inherit; /* 2 */
//   display: table; /* 1 */
//   max-width: 100%; /* 1 */
//   padding: 0; /* 3 */
//   white-space: normal; /* 1 */
// }

// progress {
//   display: inline-block; /* 1 */
//   vertical-align: baseline; /* 2 */
// }

// textarea {
//   overflow: auto;
// }

// [type="checkbox"],
// [type="radio"] {
//   box-sizing: border-box; /* 1 */
//   padding: 0; /* 2 */
// }

// [type="number"]::-webkit-inner-spin-button,
// [type="number"]::-webkit-outer-spin-button {
//   height: auto;
// }

// [type="search"] {
//   -webkit-appearance: textfield; /* 1 */
//   outline-offset: -2px; /* 2 */
// }

// [type="search"]::-webkit-search-cancel-button,
// [type="search"]::-webkit-search-decoration {
//   -webkit-appearance: none;
// }

// ::-webkit-file-upload-button {
//   -webkit-appearance: button; /* 1 */
//   font: inherit; /* 2 */
// }

// details {
//   display: block;
// }

// summary {
//   display: list-item;
// }

// template {
//   display: none;
// }

// [hidden] {
//   display: none;
// }
// `;

// const hashString = (className: string, prefix: string): string => {
//   let hash = 0;

//   for (let i = 0; i < className.length; i++) {
//     const char = className.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash |= 0; // Convert to 32bit integer
//   }

//   return `${prefix}-${hash.toString(36).replace("-", "l")}`;
// };

export function generateCss(
  rootVariableString: string
  // prefix = "nd"
): string {
  const generateCss = resetBrowserDefaultCSS.replaceAll(/\s+/g, "");

  // const mapClassNames = {} as GeneratedClasses<ClassScheme>;

  // Object.entries(classDefinitions).forEach(([classGroupKey]) => {
  //   const cgk = classGroupKey as keyof GeneratedClasses<ClassScheme>;

  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   mapClassNames[cgk] = {} as any;

  //   Object.entries(classDefinitions[cgk]).forEach(([classKey]) => {
  //     const className = hashString(classKey, prefix);

  //     const ck = classKey as keyof GeneratedClasses<ClassScheme>[typeof cgk];

  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     mapClassNames[cgk] = { ...mapClassNames[cgk], [ck]: className } as any;

  //     generateCss += `.${className}{`;

  //     Object.entries(classDefinitions[cgk][ck]).forEach(
  //       ([properties, values]) => {
  //         generateCss += `${properties
  //           .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
  //           .toLowerCase()}:${values};`;
  //       }
  //     );

  //     generateCss += `}`;
  //   });
  // });

  return `:root{${rootVariableString}}${generateCss}`;
}
