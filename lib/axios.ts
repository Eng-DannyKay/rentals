import axiosClient, { isAxiosError } from "axios";
import { timeDifferenceChecker } from "./date";
import { ToastStatus } from "@/types/shared.enum";
import { ToastT } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const networkFailureErrorMessage =
  "Oops! Server Error... Please check your internet connection";

const axios = axiosClient.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

export const axiosBase = axiosClient.create();
axios.interceptors.request.use((request) => {
  const auth = JSON.parse(localStorage.getItem("persist:auth") || "{}");
  const token = auth?.token;
  const notAuth =
    request.url?.endsWith("signin") || request.url?.endsWith("signup"); 
  if (token && !notAuth) {
    const cleanedToken = token.replace(/^"|"$/g, "");
    request.headers.Authorization = `Bearer ${cleanedToken}`;
  }
  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      const user = JSON.parse(localStorage.getItem("persist:user") || "{}");
      const loggedInAt = user?.loggedInAt;
      if (error.response?.status === 401 && loggedInAt) {
        // Session usually expires after 24 hours
        // Let's allow a 30 minutes backup time to gracefully log out the user
        // Hence reason for 23.5 hours
        // We stringify before persisting to local storage hence the need to parse twice
        if (timeDifferenceChecker(JSON.parse(JSON.parse(loggedInAt)), 23.5)) {
          window.localStorage.clear();
          window.location.reload();
        }
      }
    }
    return Promise.reject(error);
  }
);

export const axiosErrorHandler = (
  error: unknown,
  toast = false
): string | Partial<ToastT> => {
  const message = isAxiosError(error)
    ? error.response?.data.message ?? networkFailureErrorMessage
    : error instanceof Error
    ? error.message
    : networkFailureErrorMessage;

  if (toast) {
    return {
      title: ToastStatus.Error,
      description: typeof message === 'object' ? message.message: message,
      type: "error",
    };
  }

  return message;
};

export default axios;
