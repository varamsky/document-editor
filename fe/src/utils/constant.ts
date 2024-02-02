export const buttons = [
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "|",
  "superscript",
  "subscript",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "align",
  "hr",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "image",
  "link",
  "table",
  "|",
  "print",
];

export enum AI_PROMPTS {
  REPHRASE = "Improve Writing",
  CHANGE_TONE = "Change Tone",
  GRAMMAR = "Fix Grammar",
}

export enum TONES {
  PROFESSIONAL = "professional",
  CASUAL = "casual",
}

export const AIPromptsOption = [
  {
    label: AI_PROMPTS.REPHRASE,
    value: "rephrase",
  },
  {
    label: AI_PROMPTS.GRAMMAR,
    value: "grammar",
  },
  {
    label: AI_PROMPTS.CHANGE_TONE,
    value: "tone",
    options: [...Object.values(TONES)],
  },
];

export const SOCKET_URL = "http://localhost:9000";

export enum SocketEvents {
  SAVE_DOC = "save-document",
  LOAD_DOC = "load-document",
  GET_DOC = "get-document",
  RECEIVE_CHANGES = "receive-changes",
  SEND_CHANGES = "send-changes",
}

export enum MSGSEVERITY {
  SUCCESS = "success",
  ERROR = "error",
}

export enum FONTS {
  ARIAL = "Arial",
  CALIBRI = "Calibri",
  TIMES_NEW_ROMAN = "Times New Roman",
  ROBOTO = "Roboto",
  IMPACT = "IMPACT",
  RALEWAY = "Raleway",
  LATO = "Lato",
  COURIER_NEW = "Courier New",
  COMIC_SANS = "Comic Sans MS",
  CONSTANTIA = "Constantia",
  GEORGIA = "Georgia",
  PACIFICO = "Pacifico",
}

export enum HeadingLevel {
  "Normal" = "normal",
  "Heading 1" = "first",
  "Heading 2" = "second",
  "Heading 3" = "third",
  "Heading 4" = "fourth",
  "Heading 5" = "fifth",
  "Heading 6" = "sixth",
}

export const fontSizes = [
  6, 7, 8, 10, 12, 14, 16, 18, 20, 21, 24, 29, 32, 34, 48, 56, 72,
];

export const colors = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d9d9d9",
  "#efefef",
  "#f3f3f3",
  "#ffffff",
  "#980000",
  "#ff0000",
  "#ff9900",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#4a86e8",
  "#0000ff",
  "#9900ff",
  "#ff00ff",
  "#e6b8af",
  "#f4cccc",
  "#fce5cd",
  "#fff2cc",
  "#d9ead3",
  "#d0e0e3",
  "#c9daf8",
  "#cfe2f3",
  "#d9d2e9",
  "#ead1dc",
  "#dd7e6b",
  "#ea9999",
  "#f9cb9c",
  "#ffe599",
  "#b6d7a8",
  "#a2c4c9",
  "#a4c2f4",
  "#9fc5e8",
  "#b4a7d6",
  "#d5a6bd",
  "#cc4125",
  "#e06666",
  "#f6b26b",
  "#ffd966",
  "#93c47d",
  "#76a5af",
  "#6d9eeb",
  "#6fa8dc",
  "#8e7cc3",
  "#c27ba0",
  "#a61c00",
  "#cc0000",
  "#e69138",
  "#f1c232",
  "#6aa84f",
  "#45818e",
  "#3c78d8",
  "#3d85c6",
  "#674ea7",
  "#a64d79",
  "#85200c",
  "#990000",
  "#b45f06",
  "#bf9000",
  "#38761d",
  "#134f5c",
  "#1155cc",
  "#0b5394",
  "#351c75",
  "#741b47",
  "#5b0f00",
  "#660000",
  "#783f04",
  "#7f6000",
  "#274e13",
  "#0c343d",
  "#1c4587",
  "#073763",
  "#20124d",
  "#4c1130",
];

export enum Color {
  COLOR = "color",
  HIGHLIGHT = "highlight",
}
