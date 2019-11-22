export default function ({store, from, route, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
    // 如果用户未经过身份验证
  if (!store.state.overas.auth) {
    redirect(from.path)
    store.dispatch('SETUP', true);
    store.dispatch('LOGGEDIN', 'signIn');
    return false
  }
}