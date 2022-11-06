export default ({ store, route, redirect }) => {
  const isLoggedIn = store.state.auth.loggedIn
  const notAllowPaths = []
  const isAllowPath = route.matched.some((m) =>
    notAllowPaths.some((n) => m.path.includes(n))
  )
  if (isAllowPath && !isLoggedIn) {
    redirect('/user')
  }
}
