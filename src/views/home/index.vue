<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="icon_left">
          <i
            @click="isOpen"
            :class="{
              'el-icon-s-fold': isCollapse == false ? true : false,
              'el-icon-s-unfold': isCollapse == true ? true : false
            }"
          ></i>
        </div>
        <div class="header_right">
          <div class="home_head_loginout">
            <el-dropdown trigger="click" style="cursor: pointer;">
              <i class="el-icon-caret-bottom el-icon--right dropdown_icon"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>关闭全部页面</el-dropdown-item>
                <el-dropdown-item>刷新页面</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container :style="{ height: setHeight + 'px' }">
        <el-aside style="width: auto" :width="isCollapse ? '64px' : '200px'">
          <el-scrollbar style="width:100%; height:100%">
            <div class="home_aside">
              <div class="home_aside_nav">
                <el-menu
                  :default-active="String(activeNav)"
                  class="el_menu"
                  unique-opened
                  @select="handleSelect"
                  :collapse="isCollapse"
                  :collapse-transition="false"
                  router
                >
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="iconfont icon-luru"></i>
                      <span>病案录入</span>
                    </template>
                    <el-menu-item index="/meHomepageEntry"
                      >首页录入</el-menu-item
                    >
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title">
                      <i class="iconfont icon-binganchaxun"></i>
                      <span>病案查询</span>
                    </template>
                    <el-menu-item index="/workloadAccount"
                      >首页录入2</el-menu-item
                    >
                  </el-submenu>
                  <el-submenu index="4">
                    <template slot="title">
                      <i class="iconfont icon-shangbao1"></i>
                      <span>直接上报</span>
                    </template>
                    <el-menu-item index="/talentQuery">首页录入3</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5">
                    <template slot="title">
                      <i class="iconfont icon-baobiaotongji5"></i>
                      <span>报表统计</span>
                    </template>
                    <el-menu-item index="/talentExport">首页录入4</el-menu-item>
                  </el-submenu>
                  <el-submenu index="6">
                    <template slot="title">
                      <i class="iconfont icon-shezhi1"></i>
                      <span>系统管理</span>
                    </template>
                    <el-menu-item index="/talentExport">首页录入4</el-menu-item>
                  </el-submenu>
                  <el-submenu index="7">
                    <template slot="title">
                      <i class="iconfont icon-ziyuan5"></i>
                      <span>字典库设置</span>
                    </template>
                    <el-menu-item index="/systemSettings"
                      >首页录入4</el-menu-item
                    >
                  </el-submenu>
                </el-menu>
              </div>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-main :style="{ height: setHeight + 'px', padding: 0 }">
          <el-tabs
            v-model="activeTab"
            type="card"
            @tab-remove="removeTab"
            @tab-click="tabClick"
          >
            <el-tab-pane
              v-for="item in tabsItem"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="item.closable"
              :ref="item.ref"
            >
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeHeader from "@/components/homeHeader";
import welcome from "@/views/home/welcome";
import meHomepageEntry from "@/views/home/MedicalRecordEntry/meHomepageEntry";
import scheduling from "@/views/home/scheduling";
import workloadAccount from "@/views/home/workloadAccount";
import talentQuery from "@/views/home/talentQuery";
import talentExport from "@/views/home/talentExport";
import systemSettings from "@/views/home/systemSettings";
export default {
  name: "home",
  components: {
    HomeHeader,
    welcome,
    meHomepageEntry,
    scheduling,
    workloadAccount,
    talentQuery,
    talentExport,
    systemSettings
  },
  data() {
    return {
      collapseBtnClick: false,
      isCollapse: false,
      activeTab: "1", //默认显示的tab
      tabIndex: 1, //tab目前显示数
      tabsItem: [
        {
          title: "首页",
          name: "1",
          closable: false,
          ref: "tabs",
          content: welcome
        }
      ],
      tabsPath: [
        {
          name: "1",
          path: "/welcome"
        }
      ]
    };
  },
  computed: {
    setHeight() {
      return document.documentElement.clientHeight - 65;
    },
    activeNav() {
      //当前激活的导航
      return this.$route.path;
    }
  },
  watch: {
    $route: "handleRouter"
  },
  mounted() {
    /*
     * 监听页面刷新事件
     * 页面刷新前 需要保存当前打开的tabs的位置，刷新后按刷新前的顺序展示
     * 使用js的sessionStorage保存刷新页面前的数据
     * */
    window.addEventListener("beforeunload", e => {
      sessionStorage.setItem(
        "tabsItem",
        JSON.stringify({
          currTabsItem: this.tabsItem.filter(item => item.name !== "1"),
          currTabsPath: this.tabsPath.filter(item => item.name !== "1"),
          currActiveTabs: this.activeTab,
          currIndex: this.tabIndex
        })
      );
    });
  },
  created() {
    /*
     * 使用js的sessionStorage读取刷新前的数据，并按刷新前的tabs顺序重新生成tabs
     * */
    const sessionTabs = JSON.parse(sessionStorage.getItem("tabsItem"));
    if (
      sessionTabs.currTabsItem.length != 0 &&
      sessionTabs.currTabsPath.length != 0
    ) {
      for (let i = 0; i < sessionTabs.currTabsItem.length; i++) {
        this.tabsItem.push({
          title: sessionTabs.currTabsItem[i].title,
          name: sessionTabs.currTabsItem[i].name,
          closable: true,
          ref: sessionTabs.currTabsItem[i].ref,
          content: sessionTabs.currTabsItem[i].content
        });
      }
      for (let j = 0; j < sessionTabs.currTabsPath.length; j++) {
        this.tabsPath.push({
          name: sessionTabs.currTabsPath[j].name,
          path: sessionTabs.currTabsPath[j].path
        });
      }
      this.activeTab = sessionTabs.currActiveTabs;
      this.tabIndex = sessionTabs.currIndex;
      //避免强制修改url 出现浏览器的url输入框的路径和当前tabs选中的路由路径不匹配
      const activePath = this.tabsPath.filter(
        item => item.name == this.activeTab
      );
      this.$router.push({
        path: activePath[0].path
      });
    }
  },
  methods: {
    isOpen() {
      //判断左侧栏是否展开或收缩
      if (this.isCollapse == false) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    },
    handleRouter(to) {
      //监听路由的变化，动态生成tabs
      let flag = true; //判断是否需要新增页面
      const path = to.path;
      if (Object.keys(to.meta).length != 0) {
        console.log(11, to, this.$refs.tabs);
        for (let i = 0; i < this.$refs.tabs.length; i++) {
          //首页不判断 如果页面已存在，则直接定位当页面，否则新增tab页面
          if (this.$refs.tabs[i].label == to.meta.title) {
            this.activeTab = this.$refs.tabs[i].name; //定位到已打开页面
            flag = false;
            break;
          }
        }
        //新增页面
        if (flag) {
          //获得路由元数据的name和组件名
          const thisName = to.meta.title;
          const thisComp = to.meta.comp;
          //对tabs的当前激活下标和tabs数量进行自加
          let newActiveIndex = ++this.tabIndex + "";
          //动态双向追加tabs
          this.tabsItem.push({
            title: thisName,
            name: String(newActiveIndex),
            closable: true,
            ref: "tabs",
            content: thisComp
          });
          this.activeTab = newActiveIndex;
          /*
           * 当添加tabs的时候，把当前tabs的name作为key，path作为value存入tabsPath数组中
           * key:tabs的name
           * value:tabs的path
           * {
           *   key: name,
           *   value: path
           * }
           * ///后面需要得到当前tabs的时候可以通过当前tabs的name获得path
           * */
          if (this.tabsPath.indexOf(path) == -1) {
            this.tabsPath.push({
              name: newActiveIndex,
              path: path
            });
          }
        }
      }
    },
    //导航路由改变
    handleSelect(index, indexPath) {
      console.log(index, indexPath);
    },
    //侧边导航栏显示/隐藏
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    removeTab(targetName) {
      //删除Tab
      let tabs = this.tabsItem; //当前显示的tab数组
      let activeName = this.activeTab; //点前活跃的tab

      //如果当前tab正活跃 被删除时执行
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.tabClick(nextTab);
            }
          }
        });
      }
      this.activeTab = activeName;
      this.tabsItem = tabs.filter(tab => tab.name !== targetName);
      //在tabsPath中删除当前被删除tab的path
      this.tabsPath = this.tabsPath.filter(item => item.name !== targetName);
    },
    tabClick(thisTab) {
      /*
       * thisTab:当前选中的tabs的实例
       * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
       * */
      let val = this.tabsPath.filter(item => thisTab.name == item.name);
      this.$router.push({
        path: val[0].path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}

.el-menu--collapse {
  height: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
}
.home {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      width: 100% !important;
      padding: 0;
      height: 60px !important;
      line-height: 60px !important;
      background-color: #b3c0d1;
      color: #333;
      display: flex;
      .icon_left {
        width: 20%;
        i {
          font-size: 22px;
          padding-left: 20px;
        }
      }
      .header_right {
        width: 80%;
        .home_head_loginout {
          width: 100%;
          height: 100%;
          text-align: right;
          color: rgb(41, 35, 35);
          font-size: 18px;
          .el-dropdown {
            padding-right: 20px;
            cursor: pointer;
            i {
              font-size: 20px;
            }
            .el-dropdown-link {
              color: rgb(49, 40, 40);
            }
          }
        }
      }
    }

    /deep/ .el-container {
      width: 100%;
      height: 100%;
      .el-aside {
        width: 100%;
        height: 100%;
        border-top-right-radius: 5px;

        color: #333;
        .home_aside_nav {
          width: 100%;
          height: 100%;
        }
      }
      .el-main {
        height: 100%;
        padding: 0;
      }
    }
  }
}
</style>
