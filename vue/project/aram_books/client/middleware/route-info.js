export default ({ store, route, redirect }) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
  if (isMobile) {
    window.location.href = 'https://m.arambooks.com/'
  }
  const isLoggedIn = store.state.auth.loggedIn
  const notAllowPaths = []
  const isAllowPath = route.matched.some((m) =>
    notAllowPaths.some((n) => m.path.includes(n)),
  )
  if (isAllowPath && !isLoggedIn) {
    redirect('/user')
  }
}
