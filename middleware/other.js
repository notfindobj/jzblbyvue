export default function ({store, from, route, redirect}) {
    if (route.name === 'other') {
        redirect('/other/aboutUs')
    }
  }