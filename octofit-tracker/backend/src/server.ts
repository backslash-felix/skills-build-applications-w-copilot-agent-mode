const PORT = 8000;

export const CODESPACE_NAME = process.env.CODESPACE_NAME;
export const CODESPACE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;
