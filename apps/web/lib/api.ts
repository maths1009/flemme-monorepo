export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchClient = async <T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    credentials: 'include' as RequestCredentials,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = Array.isArray(errorData.message)
        ? errorData.message.join(', ')
        : errorData.message || 'An error occurred';
      throw new ApiError(response.status, errorMessage, errorData);
    }

    if (response.status === 204 || response.status === 202) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, (error as Error).message);
  }
};
