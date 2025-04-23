import router from '@/router'

export default {
  namespaced: true,
  state: {
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    // 导航条, 布局风格, defalut(默认) / inverse(反向)
    navbarLayoutType: 'default',
    // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
    sidebarLayoutSkin: 'dark',
    // 侧边栏, 折叠状态
    sidebarFold: true,
    // 侧边栏, 菜单
    menuList: [],
    menuActiveName: '',
    // 内容, 是否需要刷新
    contentIsNeedRefresh: false,
    // 主入口标签页
    mainTabs: [],
    mainTabsActiveName: ''
  },
  mutations: {
    updateDocumentClientHeight (state, height) {
      state.documentClientHeight = height
    },
    updateNavbarLayoutType (state, type) {
      state.navbarLayoutType = type
    },
    updateSidebarLayoutSkin (state, skin) {
      state.sidebarLayoutSkin = skin
    },
    updateSidebarFold (state, fold) {
      state.sidebarFold = fold
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateMenuActiveName (state, name) {
      state.menuActiveName = name
    },
    updateContentIsNeedRefresh (state, status) {
      state.contentIsNeedRefresh = status
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    },
    removeTab (state, tabName) {
      state.mainTabs = state.mainTabs.filter(item => item.name !== tabName)
      if (state.mainTabs.length >= 1) {
        // 当前选中tab被删除
        if (tabName === state.mainTabsActiveName) {
          var tab = state.mainTabs[state.mainTabs.length - 1]
          router.push({name: tab.name, query: tab.query, params: tab.params}, () => {
            state.mainTabsActiveName = tab.name
          })
        }
      } else {
        state.mainTabs = [
          {
            iframeUrl: '',
            menuId: '2301',
            name: 'patient-list',
            params: undefined,
            query: undefined,
            title: '列表',
            type: 'module'
          }
        ]
        state.menuActiveName = '2301'
        router.push({path: '/patient-list'})
        // this.$router.push({path: '/patient-list'})
      }
    },
    closeCurrentTab (state) {
      this.commit('common/removeTab', state.mainTabsActiveName)
    }
  }
}
