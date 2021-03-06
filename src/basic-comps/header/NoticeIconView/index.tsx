// import React, { useEffect, useState, useCallback } from 'react';
import React, { useState, useCallback } from 'react';
import { Tag, message } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
// import { useModel } from 'umi';
// import { queryNotices } from '@/services/user';

import NoticeIcon from './comps/NoticeIcon';
import styles from './index.less';

const getNoticeData = (
  notices: API.NoticeIconData[],
): Record<string, API.NoticeIconData[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime as string).fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    if (newNotice.extra && newNotice.status) {
      // : Record<string, string>
      // const color: Record<string, string> = {
      //   todo: '',
      //   processing: 'blue',
      //   urgent: 'red',
      //   doing: 'gold',
      // }[newNotice.status];

      newNotice.extra = (
        <Tag
          color={'blue'}
          style={{
            marginRight: 0,
          }}
        >
          {newNotice.extra}
        </Tag>
      );
    }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<string, API.NoticeIconData[]>) => {
  const unreadMsg: Record<string, number> = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read).length;
    }
  });
  return unreadMsg;
};

export interface GlobalHeaderRightProps {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
}

const NoticeIconView = () => {
  // const { initialState } = useModel('@@initialState');
  // const { currentUser } = initialState || {};

  const [notices, setNotices] = useState<API.NoticeIconData[]>([]);

  // useEffect(() => {
  //   queryNotices().then(({ data }) => setNotices(data));
  // }, []);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = useCallback((id: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.id === id) {
          notice.read = true;
        }
        return notice;
      }),
    );
  }, []);

  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.read = true;
        }
        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };

  /**
   *    id: string;
        key: string;
        avatar: string;
        title: string;
        datetime: string;
        type: string;
        read?: boolean;
        description: string;
        clickClose?: boolean;
        extra: any;
        status: string;
   */
  const list: API.NoticeIconData[] = [
    {
      id: '000000001',

      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification',

      key: '',
      read: false,
      description: 'description',
      clickClose: true,
      extra: 1,
      status: '1',
    },
    {
      id: '000000002',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification',

      key: '',
      read: false,
      description: 'description',
      clickClose: true,
      extra: 1,
      status: '1',
    },
  ];

  return (
    <NoticeIcon
      className={styles.action}
      // count={currentUser && currentUser.unreadCount}
      count={99}
      onItemClick={(item) => {
        changeReadState(item.id);
      }}
      onClear={(title: string, key: string) => clearReadState(title, key)}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('Click on view more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={2}
        list={list}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={unreadMsg.message}
        list={noticeData.message}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="event"
        title="待办"
        emptyText="你已完成所有待办"
        count={unreadMsg.event}
        list={noticeData.event}
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
