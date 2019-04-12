import Vue from 'vue'
import Router from 'vue-router'
import main from '@/views/main';
import index from '@/views/index';
import question from '@/views/question';
Vue.use(Router)
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
//const _import = require('./import-' + process.env.NODE_ENV)
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: main,
  name: 'main',
  redirect: {name: 'index'},
  meta: {title: '主入口整体布局'},
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    {path: '/index', component: index, name: 'index', meta: {title: '首页'}},
    {path: '/question', component: question, name: 'question', meta: {title: '常见问题'}},


  ],
  beforeEnter(to, from, next) {
    // if (to.meta.title) {
    //   document.title = to.meta.title
    // }
    //  let token = Vue.cookie.get('sister-front-token')
    // alert("token:"+token)
    //  if (!token || !/\S/.test(token)) {
    //    clearLoginInfo()
    //    router.push({ name: 'login' })
    //  }else{
    //    http({
    //      url: http.adornUrl('/vue/member/info'),
    //      method: 'get',
    //    }).then(({data}) => {
    //      if (data && data.code === '0000') {
    //        Vue.cookie.set('sister-front-token', data.token)
    //        next()
    //      } else {
    //        router.push({ name: 'login' })
    //      }
    //    }).catch((e) => {
    //      router.push({ name: 'login' })
    //    })
    //  }
//  http({
//    url: http.adornUrl('/vue/member/info'),
//    method: 'get',
//  }).then(({data}) => {
//    if (data && data.code === '0000') {
//      Vue.cookie.set('sister-front-token', data.token)
//      next()
//    } else {
//      router.push({name: 'login'})
//    }
//  }).catch((e) => {
//    router.push({name: 'login'})
//  })
    next()
  }
}


const router = new Router({
  scrollBehavior: () => ({y: 0}),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

export default router;

//export default new Router({
// routes: [
// {
// path: '/',
// name: 'casino-dapp',
// component: CasinoDapp
// }
// ]
//})
