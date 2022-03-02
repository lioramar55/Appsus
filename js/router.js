import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import keepApp from './apps/keep/pages/note-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import bookApp from './apps/book/pages/book-app.cmp.js'
import mailDetails from './apps/mail/cmps/mail-details.cmp.js'

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/book',
    component: bookApp,
  },
  {
    path: '/mail',
    component: mailApp,
    childrens: [{ path: '/details/:mailId', component: mailDetails }],
  },
  {
    path: '/keep',
    component: keepApp,
  },
  {
    path: '/about',
    component: aboutPage,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
