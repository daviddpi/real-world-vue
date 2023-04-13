import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetails from '../views/event/DetailsView.vue'
import EventRegisterView from '../views/event/RegisterView.vue'
import EventEditView from '../views/event/EditView.vue'
import LayoutView from '../views/event/LayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView,
      alias: '/about',
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView
        },
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFoundView,
    },
    {
      path: '/404/:resource',
      name: 'page-404',
      component: NotFoundView,
      props: true
    },
  ],
})

export default router
