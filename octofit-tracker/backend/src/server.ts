const PORT = 8000;

export const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-${PORT}.app.github.dev`
  : `http://localhost:${PORT}`;
