<template>
  <div>
    <el-container class="container">
      <el-header class="header">
        <el-row align="middle" type="flex">
          <el-col :span="6" class="bbe6">
            <p>
              <img class="logo" src="../assets/u20.png" />
              {{ currentSystem }}
              <!-- <span>白金软件</span> -->
            </p>
          </el-col>
          <el-col :span="14">
            <el-menu active-text-color="#E3685C" class="h60" mode="horizontal" @select="handleTopSelect">
              <!-- eslint-disable-next-line -->
              <el-menu-item :index="menu.key" :key="menu.key" v-for="menu of topMenu">{{menu.name}}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="4" class="bbe6 tr f14 pr15 lh60">
            <el-dropdown style="cursor: pointer;">
              <span>
                <!-- {{info.name}} -->
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin-top:-5px">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container class="left-container">
    </el-container>
  </div>
</template>

<script>
import oidc from "../auth";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import { GET_TOP_MENU, GET_PERMISSION } from "../store/actions";
import { SELECT_CURRENT_SYSTEM } from "../store/mutations";
import Menu from "../components/Menu";

export default {
  components: {
    Menu
  },
  computed: {
    ...mapState({
      topMenu: state => state.topMenu,
      currentSystem: state => state.currentSystem
    }),
    ...mapGetters(["sideMenu"])
  },
  created() {
    this.handleLogin();
    this.getTopMenu();
  },
  watch: {
    currentSystem: {
      async handler(sys) {
        if (!sys) return;
        this.getPermission(sys);
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      fetchTopMenu: GET_TOP_MENU,
      getPermission: GET_PERMISSION
    }),
    ...mapMutations({
      selectCurrentSys: SELECT_CURRENT_SYSTEM
    }),
    async getTopMenu() {
      await this.fetchTopMenu();
    },
    async handleTopSelect(index) {
      const sys = this.topMenu.filter(menu => menu.key === index).pop();
      this.selectCurrentSys(index);
    },
    async handleLogin() {
      try {
        const {
          access_token: accessToken,
          token_type: tokenType,
          profile,
          expires_at: expiresAt
        } = await oidc.signinRedirectCallback();
        // 存储用户信息
        this.storeUserInfo(profile);
        // 存储过期时间
        // 发送请求的时候比对
        sessionStorage.setItem("Authorization", `${tokenType} ${accessToken}`); // eslint-disable-line
        sessionStorage.setItem("expiresAt", expiresAt * 1000); // eslint-disable-line
      } catch (err) {
        console.info("即将跳转登录页面");
        await oidc.signinRedirect({ state: this.$route.fullPath });
      }
    }
  }
};
</script>

<style lang="scss">
.bbe6 {
  border-bottom: 1px solid #e6e6e6;
  & > p {
    display: flex;
    justify-content: start;
    margin: 0;
    padding: 0;
    line-height: 60px;
    height: 60px;
    color: #464646;
    .logo {
      align-self: center;
      margin-left: 20px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
    }
    span {
      width: 110px;
      min-width: 110px;
      margin-left: 6px;
      margin-top: 2px;
    }
  }
}
.container {
  height: 100%;
  min-width: 1280px;
}

.left-container {
  width: 220px;
  height: 1200px;
}
</style>
