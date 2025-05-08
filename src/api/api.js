const API_BASE = "http://localhost:8000";

// Ottieni cookie CSRF
export async function getCsrfCookie() {
  await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    credentials: 'include',
  });
}

// Leggi un cookie per nome
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Parsing sicuro JSON (evita crash su risposte vuote o HTML)
export async function safeJson(res) {
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType?.includes("application/json")) {
    return res.json();
  } else {
    const text = await res.text();
    throw new Error(`Errore ${res.status}: ${text}`);
  }
}

// Registrazione
export async function register(data) {
  await getCsrfCookie(); 
  const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return safeJson(res);
}

// Login
export async function login(data) {
  await getCsrfCookie();
  const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return safeJson(res);
}

export async function fetchUser() {
  const res = await fetch(`${API_BASE}/api/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
  });

  return safeJson(res);
}
export async function logout() {
  await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
