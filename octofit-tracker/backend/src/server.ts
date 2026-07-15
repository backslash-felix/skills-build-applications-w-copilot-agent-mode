export const CODESPACE_NAME = process.env.CODESPACE_NAME ?? "";
export const URL = CODESPACE_NAME
	? `https://${CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN ?? "app.github.dev"}`
	: "";
