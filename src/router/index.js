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

Vue.use(Router)

export default new Router({
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
            props: true
        },
        {
            path: '/me/edit',
            name:"ProfileEdit",
            component: PageProfile,
            props: {edit: true} // passing value throgh props if match with edit page
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
            props: true
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
            path: '*',
            name: 'NotFound',
            component: PageNotFound
        }
    ],
    mode: 'history'
})