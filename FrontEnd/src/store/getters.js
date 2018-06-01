const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  sk: state => state.user.sk,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
