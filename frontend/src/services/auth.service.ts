/**
 * Authentication service — handles login, logout, token refresh, and
 * fetching the current user profile.
 */

import api from "@/lib/axios";
import type { AuthResponse, LoginCredentials, User } from "@/types";

export const authService = {
  /** Authenticate user and set JWT cookies. */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      "/auth/login/",
      credentials
    );
    return data;
  },

  /** Clear JWT cookies and blacklist refresh token. */
  async logout(): Promise<void> {
    await api.post("/auth/logout/");
  },

  /** Refresh the access token using the refresh cookie. */
  async refresh(): Promise<void> {
    await api.post("/auth/refresh/");
  },

  /** Get the currently authenticated user's profile. */
  async getMe(): Promise<User> {
    const { data } = await api.get<User>("/auth/me/");
    return data;
  },
};
