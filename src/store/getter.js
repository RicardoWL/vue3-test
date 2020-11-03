const getters = {
  sidebar: (state) => state.app.sidebar,
  routers: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
}

export default getters
