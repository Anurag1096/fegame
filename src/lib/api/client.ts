import { ApiError, ApiErrorBody } from "@/lib/auth/types";

/** Same-origin API path proxied to the NestJS server via next.config rewrites */
export const API_BASE_PATH = process.env.NEXT_PUBLIC_API_URL ?? "/api";

/** Socket.IO engine path proxied to the backend */
export const SOCKET_IO_PATH = "/api/socket.io";

const REFRESH_SKIP_PATHS = ["/auth/login", "/auth/signup", "/auth/refresh", "/auth/logout"];

type RequestOptions = {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
  skipRefresh?: boolean;
};

let refreshInFlight: Promise<boolean> | null = null;

function parseErrorMessage(body: ApiErrorBody): string {
  if (Array.isArray(body.message)) {
    return body.message.join(", ");
  }
  if (typeof body.message === "string") {
    return body.message;
  }
  return "Request failed";
}

function shouldAttemptRefresh(path: string): boolean {
  return !REFRESH_SKIP_PATHS.some((skipPath) => path.startsWith(skipPath));
}

async function rawFetch(path: string, options: RequestOptions = {}): Promise<Response> {
  const { method = "GET", body } = options;

  return fetch(`${API_BASE_PATH}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function tryRefreshSession(): Promise<boolean> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    try {
      const response = await rawFetch("/auth/refresh", {
        method: "POST",
        body: {},
        skipRefresh: true,
      });
      return response.ok;
    } catch {
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

async function requestJson<T>(
  path: string,
  options: RequestOptions = {},
  retried = false,
): Promise<T> {
  const response = await rawFetch(path, options);

  if (
    response.status === 401 &&
    !options.skipRefresh &&
    !retried &&
    shouldAttemptRefresh(path)
  ) {
    const refreshed = await tryRefreshSession();
    if (refreshed) {
      return requestJson<T>(path, options, true);
    }
  }

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as ApiErrorBody | null;
    const message = errorBody ? parseErrorMessage(errorBody) : response.statusText;
    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getJson<T>(path: string): Promise<T> {
  return requestJson<T>(path, { method: "GET" });
}

export function postJson<T>(
  path: string,
  body: Record<string, unknown> = {},
): Promise<T> {
  return requestJson<T>(path, { method: "POST", body });
}
