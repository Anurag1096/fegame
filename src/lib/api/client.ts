import { ApiError, ApiErrorBody } from "@/lib/auth/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3004";

function parseErrorMessage(body: ApiErrorBody): string {
  if (Array.isArray(body.message)) {
    return body.message.join(", ");
  }
  if (typeof body.message === "string") {
    return body.message;
  }
  return "Request failed";
}

export async function postJson<TResponse>(
  path: string,
  body: Record<string, unknown>,
): Promise<TResponse> {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as ApiErrorBody | null;
    const message = errorBody ? parseErrorMessage(errorBody) : response.statusText;
    throw new ApiError(response.status, message);
  }

  return response.json() as Promise<TResponse>;
}

export { API_URL };
