export function getToken() {
  const data = localStorage.getItem("token");
  return data ? JSON.parse(data) : "";
}

export function setToken(key: string, token: string) {
  localStorage.setItem(key, JSON.stringify(token));
}

export function removeToken(key: string) {
  localStorage.removeItem(key);
}
