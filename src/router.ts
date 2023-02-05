import { createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home.vue";
import NewPost from "@/components/NewPost.vue";
import {Store, useStore} from "@/store";
import ShowPost from "@/components/ShowPost.vue";
import EditPost from "@/components/EditPost.vue";

export function routerWithStore(store: Store){

    const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: '/',
        component: Home
        },
        {
            path: '/posts/:id',
            component: ShowPost
        },
        {
            path: '/posts/:id/edit',
            component: EditPost,
        },
        {
            path: '/posts/new',
            component: NewPost,
        }]
})

router.beforeEach((to, from, next)=> {
    const auth = false
    if (!to.meta.requiresAuth){
        next()
        return
    }

    if (to.meta.requiresAuth && auth){
        next()
    } else {
        next({path: '/'})
    }
})
    return router
}