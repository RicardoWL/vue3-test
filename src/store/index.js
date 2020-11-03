import { createStore } from 'vuex'
import app from './modules/app'
import permission from "./modules/permission";
import getters from "./getter"

const store = createStore({
  modules: {
    app,
    permission
  },
  getters
})

export default store
