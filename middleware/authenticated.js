import { Message } from 'iview'
// {route,store, req, res, redirect}
export default function ({store, from, route, redirect}) {
  // console.log(app)
  let isClient = process.client;
  let isServer = process.server;
  //在服务端
  if (isServer) {}
  //在客户端
  if (isClient) {
     // 如果用户未经过身份验证
    if (!store.state.overas.auth) {
      redirect('/')
      store.dispatch('SETUP', true);
      store.dispatch('LOGGEDIN', 'signIn');
      // Message.warning('请登陆后操作！');
    }
  }
}