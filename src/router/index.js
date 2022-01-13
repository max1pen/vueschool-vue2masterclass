import Vue from  'vue'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'
import PageThreadShow from '@/pages/PageThreadShow'
import PageNotFound from '@/pages/PageNotFound'
import PageForumShow from '@/pages/PageForumShow'
import PageCategory from '@/pages/PageCategory'
import PageProfile from '@/pages/PageProfile'
import ThreadCreate from '@/pages/PageThreadCreate'
import PageThreadEdit from '@/pages/PageThreadEdit'
import PageRegister from '@/pages/PageRegister'
import PageSignIn from '@/pages/PageSignIn'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name:"Home",
            component: PageHome,
        },
        {
            path: '/me',
            name:"Profile",
            component: PageProfile,
            props: true,
            meta: { requiresAuth: true }
        },
        {
            path: '/me/edit',
            name:"ProfileEdit",
            component: PageProfile,
            props: {edit: true},// passing value throgh props if match with edit page
            meta: { requiresAuth: true }
        },
        {
            path: '/forum/:id',
            name:"Forum",
            component: PageForumShow,
            props: true
        },
        {
            path: '/category/:id',
            name:"Category",
            component: PageCategory,
            props: true
        },
        {
            path: '/thread/create/:forumId',
            name:"ThreadCreate",
            component: ThreadCreate,
            props: true,
            meta: { requiresAuth: true }
        },
        {
            path: '/thread/:id',
            name:"ThreadShow",
            component: PageThreadShow,
            props: true
        },
        {
            path: '/thread/:id/edit',
            name:"ThreadEdit",
            component: PageThreadEdit,
            props: true
        },
        {
            path: '/register',
            name:"Register",
            component: PageRegister,
            meta: { requiresGuest: true }
        },
        {
            path: '/signin',
            name:"Sigin",
            component: PageSignIn,
            meta: { requiresGuest: true }
        },
        {
            path: '/logout',
            name:"SignOut",
            meta: { requiresAuth: true },
            beforeEnter(to, from, next) {
                store.dispatch('signOut')
                .then(() => next({name: 'Home'}))
            }
        },
        {
            path: '*',
            name: 'NotFound',
            component: PageNotFound
        }
    ],
    mode: 'history'
})

// middleware
// Check the routing navigation
// using meta filed and global guard to protected routers
router.beforeEach((to, from, next) => {
    console.log(`navigatin to ${to.name} from ${from.name}`)
    store.dispatch('initAuthentication') 
        .then(user => {
        if(to.matched.some(route => route.meta.requiresAuth)) {
        
            // protected route
            if(user) {
                next()
            } else {
                // passing params to store old path that user try to visit, after login success will back
                next({name: 'Sigin', query: {redirectTo: to.path}}) 
            }
        } else if(to.matched.some(route => route.meta.requiresGuest)) {
            // protected route
            if(!user) {
                next()
            } else {
                next({name: 'Home'})
            }
        } else {
            next()
        }
    })
})

export default router