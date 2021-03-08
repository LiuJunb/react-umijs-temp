// 登录页面数据全局共享
import type { Effect, Reducer, Subscription } from 'umi';
// import { message } from 'antd';

export interface BaseModelState {
  depts: number[];
}

export interface BaseModelType {
  namespace: 'basePageData';
  dva: any;
  state: BaseModelState;
  effects: {
    getDepts: Effect;
  };
  reducers: {
    saveDepts: Reducer<BaseModelState>;
  };
  subscriptions: { setup: Subscription };
}

const BaseModel: BaseModelType = {
  namespace: 'basePageData',
  dva: {
    skipModelValidate: true,
  },
  state: {
    depts: [],
  },
  effects: {
    *getDepts({ payload }, { put }) {
      console.log('base=', payload);
      yield put({
        type: 'saveDepts',
        payload: {
          depts: [...payload.depts],
        },
      });
    },
  },
  reducers: {
    saveDepts(state, action) {
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
        if (pathname === '/') {
          // dispatch({
          //   type: 'loginPageData/testQuery',
          //   payload: {
          //     title: 'testTitlemain'
          //   }
          // })
        }
        if (pathname === '/login') {
          dispatch({
            type: 'getDepts',
            payload: {
              depts: [
                {
                  name: '第1部门',
                  id: 1,
                },
              ],
            },
          });
        }
      });
    },
  },
};

export default BaseModel;
