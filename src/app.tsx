// 编写运行时的配置
import type { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 1000,
  headers: {
    auth_token: 'auth_token_auth_token_auth_token',
  },
  // ...支持 axios 的全局配置

  middlewares: [],
  requestInterceptors: [
    // global Interceptor
    (url, options) => {
      console.log('拦截请求：', url);
      console.log('拦截请求：', options);
      return {
        url,
        options: { ...options },
      };
    },
  ],
  responseInterceptors: [
    (response, options) => {
      // const data = await response.clone().json();
      // if (data && data.NOT_LOGIN) {
      //   location.href = '登录url';
      // }
      console.log('拦截响应：', response);
      console.log('拦截响应：', options);
      // response.headers.append('interceptors', 'yes yo');
      return response;
    },
  ],
  errorConfig: {
    adaptor: (resData) => {
      console.log('app-errorConfig-resData:', resData);
      return {
        ...resData,
        success: 'ok~',
        errorMessage: '成功',
      };
    },
  },
};

// 初始化全局数据
export async function getInitialState(): Promise<any> {
  // const data = await fetchXXX();
  return {};
}
