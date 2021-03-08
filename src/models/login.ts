// 登录页面数据全局共享
import type { Effect, Reducer, Subscription } from 'umi';
import { fakeAccountLogin } from '@/services/login';
// import type { LoginParamsType } from '@/services/login'
import { message } from 'antd';
import dvaModelExtend from 'dva-model-extend';
import BaseModal from '@/models/base';

export interface UserModelState {
  name?: string;
  age?: number;
  dept?: string;
  deptId?: string;
}

export interface LoginModelState {
  name: string;
  testMsg: string;
  user: UserModelState;
}

export interface LoginModelType {
  namespace: 'loginPageData';
  dva: any;
  state: LoginModelState;
  effects: {
    testQuery: Effect;
    login: Effect;
  };
  reducers: {
    saveTestData: Reducer<LoginModelState>;
    saveUser: Reducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}

const LoginModel: LoginModelType = {
  namespace: 'loginPageData',
  dva: {
    skipModelValidate: true,
  },
  state: {
    name: '',
    testMsg: '',
    user: {},
  },
  effects: {
    // 监听异步的 action = testQuery
    *testQuery({ payload }: any, { put }: any) {
      console.log('testQuery=', payload);
      // 1.存储数据到 state 中
      yield put({
        type: 'saveTestData',
        payload: {
          testMsg: `${payload.title}:请求成功`,
        },
      });
    },
    *login({ payload }, { call, put }) {
      console.log('login=', payload);
      // 1.发起登录请求
      const result = yield call(fakeAccountLogin, payload);
      console.log('result=', result);
      message.success('登录成功');
      // 2.存储数据到 state 中
      yield put({
        type: 'saveUser',
        payload: {
          user: {
            name: 'liu',
            age: 12,
          },
        },
      });

      // 4.把登录数据存到全局中

      // 5.调用成功的回调函数
      if (payload.success) payload.success('登录成功');
    },
  },
  reducers: {
    // 监听同步的 action = saveTestData
    saveTestData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveUser(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // 如果访问的是登录页面
        if (pathname === '/login') {
          // dispatch({
          //   type: 'login',
          //   payload: {
          //     username:'admin',
          //     password: '123456',
          //     captcha:'12sd'
          //   }
          // })
          // 默认发起这个网络请求
          dispatch({
            type: 'testQuery',
            payload: {
              title: 'testTitle',
            },
          });
        }
      });
    },
  },
};

// export default LoginModel;

export default dvaModelExtend(BaseModal, LoginModel);
