import { request } from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
  captcha: string;
}

// 登录的逻辑
export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>(
    'http://172.16.127.2/user/sys/user/login',
    {
      method: 'POST', // POST GET
      data: params,
    },
  );
}

// 退出登录
export async function outLogin() {
  return request('/api/login/outLogin');
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
