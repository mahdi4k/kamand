const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: 'features', name: 'features', component: () => import('pages/Features.vue')},
      {path: 'unit', name: 'unit', component: () => import('pages/Unit.vue')},
      {path: 'shift', name: 'shift', component: () => import('pages/Shift.vue')},
      {path: 'tag', name: 'tag', component: () => import('pages/TagPlc.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
