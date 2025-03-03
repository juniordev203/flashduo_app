
import type { RouterConfig } from "nuxt/schema";

export default <RouterConfig>{
    routes: () => {
        return [
            {
                path: '/',
                component: () => 
                    import('~/pages/index.vue').then((r) => r.default || r),
                meta: {
                    layout: 'app-nav'
                }
            }
        ]
    }
}