import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { ElMessage } from 'element-plus';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashIndex.vue'),
        meta: { title: '仪表板', icon: 'dashboard' }
      },
      {
        path: 'blogs',
        name: 'BlogList',
        component: () => import('@/views/blog/BlogList.vue'),
        meta: { title: '博客管理', icon: 'document' }
      },
      {
        path: 'blog/create',
        name: 'BlogCreate',
        component: () => import('@/views/blog/BlogEditor.vue'),
        meta: { title: '创建博客', hidden: true }
      },
      {
        path: 'blog/edit/:id',
        name: 'BlogEdit',
        component: () => import('@/views/blog/BlogEditor.vue'),
        meta: { title: '编辑博客', hidden: true }
      },
      {
        path: 'categories',
        name: 'CategoryList',
        component: () => import('@/views/category/CategoryList.vue'),
        meta: { title: '分类管理', icon: 'folder' }
      },
      {
        path: 'tags',
        name: 'TagList',
        component: () => import('@/views/tag/TagList.vue'),
        meta: { title: '标签管理', icon: 'price-tag' }
      },
      {
        path: 'comments',
        name: 'CommentList',
        component: () => import('@/views/comment/CommentList.vue'),
        meta: { title: '评论管理', icon: 'ChatDotRound' }
      },
      {
        path: 'comments/pending',
        name: 'CommentPending',
        component: () => import('@/views/comment/CommentList.vue'),
        meta: { title: '待审核评论', query: { status: 'pending' } }
      },
      {
        path: 'comments/spam',
        name: 'CommentSpam',
        component: () => import('@/views/comment/CommentList.vue'),
        meta: { title: '垃圾评论', query: { status: 'spam' } }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/settings/SetIndex.vue'),
        // component: () => import('@/views/settings/SystemConfig.vue'),
        meta: { title: '系统设置', icon: 'Setting' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 临时增加，备案后再删除
const loginInfo = {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoidmlzaXRvciIsImp0aSI6Ijc1OTAwZmM1LWUzOWUtNGY4OS04ZjA4LWYyZjc2NzI4NWI4OSIsImlhdCI6MTc4MDU2MDIzOSwiZXhwIjoxNzgzMTUyMjM5LCJhdWQiOiJqY2FuZHktYWRtaW4iLCJpc3MiOiJqaW5nb3QifQ.asAQCdS8lpHXG4DFbaHWw0M5ClxnNn88zO0IGUEBZh4",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNCIsInR5cGUiOiJyZWZyZXNoIiwianRpIjoiMjQzMjBkMDAtYzQzNy00ZjVlLWI4YjUtZWJlYWEwOWExMTgzIiwiaWF0IjoxNzgwNTYwMjM5LCJleHAiOjE3ODExNjUwMzksImlzcyI6ImppbmdvdCJ9.yJ_KcnLfEt1_b47MIUSBRGyCaLOdg0Ngx8dOkhibw9I",
  "expiresIn": 2592000,
  "tokenType":
    "Bearer",
  "userInfo": {
    "id": "14",
    "username": "admin",
    "nickname": "管理员",
    "email": "admin123@126.com",
    "role": "visitor",
    "avatar": null,
    "permissions": ["*"]
  }
}

// 路由守卫
router.beforeEach((to, _from, next) => {
  // const token = localStorage.getItem('access_token');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // ==== BEGIN 临时增加，备案后再删除
  const token = loginInfo.accessToken;
  localStorage.setItem('access_token', loginInfo.accessToken);
  localStorage.setItem('user_info', JSON.stringify(loginInfo.userInfo));
  // ==== END 临时增加，备案后再删除``

  if (requiresAuth && !token) {
    ElMessage.warning('请先登录');
    next('/login');
  } else if (to.path === '/login' && token) {
    next('/');
  } else {
    next();
  }
});

export default router;