import React, { useState } from 'react';
import { message } from 'antd';
import ProForm, { ProFormText, ProFormCaptcha } from '@ant-design/pro-form';
import { MobileTwoTone, MailTwoTone, LockTwoTone } from '@ant-design/icons';
import styles from './index.less';
import ProFormCaptchaImg from '@/basic-comps/form-item/ProFormCaptchaImg/index';
import RememberPwd from '@/basic-comps/form-item/RememberPwd/index';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [captchaImg, setCaptchaImg] = useState<string>(
    'http://172.16.121.73:8765/user/sys/user/captcha?t=1613985842126',
  );

  const rememberPwdChange = (event: any) => {
    console.log(event);
  };

  return (
    <div className={styles.login}>
      {/* 登录的面板 */}
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
            console.log(values);
            await waitTime(2000);
            message.success('提交成功');
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
              await waitTime(50);
              setCaptchaImg(
                `http://172.16.121.73:8765/user/sys/user/captcha?t=${new Date().getTime()}`,
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
              await waitTime(1000);
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
