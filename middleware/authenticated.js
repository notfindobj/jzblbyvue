export default function ({store, from, route, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  //在服务端
  if (isServer) {
    if (!store.state.overas.auth) {
      redirect('/')
    }
  }
  //在客户端
  if (isClient) {
     // 如果用户未经过身份验证
    if (!store.state.overas.auth) {
      redirect('/')
      store.dispatch('SETUP', true);
      store.dispatch('LOGGEDIN', 'signIn');
    }
  }
}