import { Message } from 'iview'
export default function ({ store, redirect }) {
    // 如果用户未经过身份验证
    if (!store.overas.auth) {
      Message.warning('请登陆后操作！');
      // return redirect('/login')
    }
  }