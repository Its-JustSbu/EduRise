import './assets/styles/global.css'

import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'

// createSSRApp hydrates the markup that scripts/prerender.mjs injected,
// rather than discarding it and rendering from scratch.
const app = createSSRApp(App)

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
