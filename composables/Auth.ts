import { authApiUtil } from "~/utils/api.utils";
import { useMyBaseStore } from "~/stores/base.store";
import type { AuthLoginRequest, AuthRegisterRequest, AuthLoginResponse } from "~/auto_api";

// Đăng ký tài khoản
export const registerUser = async (payload: AuthRegisterRequest) => {
  const response = await authApiUtil.apiAuthRegisterPost(payload);
  return response.data;
};

// Đăng nhập
export const loginUser = async (payload: AuthLoginRequest) => {
  const response = await authApiUtil.apiAuthLoginPost(payload);
  const store = useMyBaseStore();
  store.setAuthUser(response.data);
  return response.data;

};

// Đăng xuất
export const logoutUser = () => {
  const store = useMyBaseStore();
  store.clearAuthUser();
};
