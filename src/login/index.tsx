import type { FC } from 'react';
import React, { useState } from 'react';
// import type { Loading, LoginModelState, ConnectProps} from 'umi';
// import { connect, useDispatch, useSelector  } from 'umi';
import type { LoginModelState, ConnectProps } from 'umi';
import { useDispatch, useSelector } from 'umi';
// import { useDispatch } from "react-redux";
import { message } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileTwoTone, MailTwoTone, LockTwoTone } from '@ant-design/icons';
import styles from './index.less';
import ProFormCaptchaImg from '@/basic-comps/form-item/ProFormCaptchaImg/index';
import RememberPwd from '@/basic-comps/form-item/RememberPwd/index';
// import { fakeAccountLogin } from '@/services/login'
import type { LoginParamsType } from '@/services/login';
import { useModel } from 'umi';

interface PageProps extends ConnectProps {
  loginPageData: LoginModelState;
  loading: boolean;
}

//  获取登录页面的数据(第一种方法)
const Login: FC<PageProps> = ({ loginPageData, loading }) => {
  // 获取登录页面的数据(第二种方法)
  const loginPD = useSelector((state: any) => {
    // console.log('state=', state.base)
    return {
      loginPageData: state.loginPageData,
      loading: state.loading.models.loginPageData,
    };
  });
  console.log('loginPD=', loginPD);
  console.log('loading=', loading);
  console.log('loginPageData=', loginPageData);

  const [captchaImg, setCaptchaImg] = useState<string>(
    'http://172.16.121.73:8765/user/sys/user/captcha?t=1613985842126',
  );

  const rememberPwdChange = (event: any) => {
    console.log(event);
  };

  // 返回promise对象
  // const submitLogin1 = (values: LoginParamsType) => {
  //   return fakeAccountLogin({
  //     ...values
  //   })
  // }

  const { initialState, setInitialState }: any = useModel('@@initialState');

  const dispatch = useDispatch();
  const submitLogin2 = (values: LoginParamsType) => {
    // 点击登录按钮，发起登录请求
    dispatch!({
      type: 'loginPageData/login',
      payload: {
        ...values,
        success(res: any) {
          console.log('登录成功:', res);
          // refresh()
          console.log('全局数据1=', initialState);
          setInitialState({
            user: {
              name: 'liusss',
              age: 12000000,
            },
          });
          console.log('全局数据2=', initialState);
        },
      },
    });

    // dispatch!({
    //   type: 'loginPageData/getDepts',
    //   // type: 'basePageData/getDepts',
    //   payload: {
    //     depts: [
    //       {
    //         name: '第三部门',
    //         id: 3
    //       }
    //     ]
    //   }
    // })
  };

  return (
    <div className={styles.login}>
      {/* 登录的面板 */}
      {/* {initialState?.user?.name} */}
      <div
        style={{
          width: 330,
          margin: 'auto',
          paddingTop: '160px',
        }}
      >
        {/* 表单组件 */}
        <ProForm
          onFinish={async (values) => {
            // 点击登录的按钮，提交表单
            await submitLogin2({
              username: values.phone,
              password: values.password,
              captcha: values.captcha,
            });
          }}
          submitter={{
            searchConfig: {
              submitText: '登录',
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              size: 'large',
              style: {
                width: '100%',
              },
            },
          }}
        >
          <h1
            style={{
              textAlign: 'center',
            }}
          >
            <img
              style={{
                height: '44px',
                marginRight: 16,
              }}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            Ant Design 登录
          </h1>

          <div
            style={{
              marginTop: 12,
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            Ant Design 是西湖区最具影响力的 Web 设计规范
          </div>

          {/* 1.表单项 - ProFormText（ FormItem + Input ） */}
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileTwoTone />,
            }}
            name="phone"
            placeholder="请输入手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
              // {
              //   pattern: /^1\d{10}$/,
              //   message: '不合法的手机号格式!',
              // },
            ]}
          />

          {/* 2.表单项 - ProFormText（ FormItem + Input ） */}
          <ProFormText.Password
            fieldProps={{
              size: 'large',
              prefix: <LockTwoTone />,
            }}
            name="password"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
              // {
              //   pattern: /^1\d{6}$/,
              //   message: '不合法的密码!',
              // },
            ]}
          />

          {/* 3.获取图片验证码的表单项 */}
          <ProFormCaptchaImg
            fieldProps={{
              size: 'large',
              prefix: <MailTwoTone />,
            }}
            name="imgcode"
            placeholder="请输入验证码"
            rules={[
              {
                required: true,
                message: '请输入手机号!',
              },
            ]}
            captchaImg={captchaImg}
            onCaptcha={async () => {
              setCaptchaImg(
                `http://172.16.127.2/user/sys/user/captcha?t=${new Date().getTime()}`,
              );
            }}
          ></ProFormCaptchaImg>

          {/* 4.获取手机验证码的表单项 */}
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <MailTwoTone />,
            }}
            captchaProps={{
              size: 'large',
            }}
            phoneName="phone"
            name="captcha"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
            ]}
            placeholder="请输入验证码"
            onGetCaptcha={async (phone) => {
              message.success(`手机号 ${phone} 验证码发送成功!`);
            }}
          />

          {/* 5.记住用户名和密码 */}
          <RememberPwd
            defaultChecked={false}
            onChange={rememberPwdChange}
          ></RememberPwd>
        </ProForm>
      </div>
    </div>
  );
};

// loginPageData 是 model namespace 的名称
// const LoginPage= connect(({ loginPageData, loading }: { loginPageData: LoginModelState; loading: Loading }) => ({
//   loginPageData,
//   loading: loading.models.loginPageData,
// }))(Login);

export default Login;
