export default function ({ store, redirect }) {
    // 如果用户未经过身份验证
    if (!store.overas.auth) {
      return redirect('/login')
    }
  }