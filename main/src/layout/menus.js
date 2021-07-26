export default {
  'app1': [
    {
      path: '/',
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }]
    }
  ],
  'app2': [
    {
      path: '/',
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }]
    }
  ]
}
