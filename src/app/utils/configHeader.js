// config.js
export const API_URL = "https://elearningnew.cybersoft.edu.vn/api";
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MCIsIkhldEhhblN0cmluZyI6IjA5LzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczOTA1OTIwMDAwMCIsIm5iZiI6MTcxMDY5NDgwMCwiZXhwIjoxNzM5MjA2ODAwfQ.6858c67tSwtIMCJuCLKgkFiJJz9wjrpDT1Q6QvJ_dgw";

export const getHeaders = () => {
  return {
    TokenCybersoft: TOKEN_CYBERSOFT,
    "Content-Type": "application/json",
  };
};
