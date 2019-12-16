export default function ({store, from, route, redirect}) {
    if (route.name === 'Message') {
        redirect('/Message/customized')
    }
    if (route.name === "PersonalCenter") {
        redirect('/PersonalCenter/myMessage')
    }
    if (route.name === "User") {
        redirect('/User/overview')
    }
  }