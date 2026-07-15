export const codespaceName = process.env.CODESPACE_NAME;
export const baseUrl = codespaceName
  ? `https://${codespaceName}-${process.env.PORT ?? 8000}.app.github.dev`
  : `http://localhost:${process.env.PORT ?? 8000}`;
