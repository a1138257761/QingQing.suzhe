<script type="text/jsx">
import _ from 'lodash';
import { menuFilter } from "../utils/menuHelper";

export default {
  name: 'cc-comp-menu',
  props: {
    menuData: {
      type: Array,
      required: true,
    },
    baseURL: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      collapse: false,
    };
  },
  render() {
    return (
      <el-container class="hpct100" id="menu">
        <el-header style={{ height: '30px' }}>
          <div class="hpct100 tc" style={{ width: this.collapse ? '64px' : 'auto' }}>
            <el-button type="text" onClick={this.toggleMenu}>
            </el-button>
          </div>
        </el-header>
        <el-main class="hpct100 scroll-bar">
          <el-menu
            collapse={this.collapse}
            unique-opened
            id="menu"
            default-active={this.$route.path}
            class="hpct100 scroll-bar"
            router
          >
            {this.createMenuItem(this.menuData)}
          </el-menu>
        </el-main>
      </el-container>
    );
  },
  methods: {
    createMenuItem(menu) {
      return menu.map(({
        key, name, children,
      }) =>
        (_.isEmpty(children) ? (
          <el-menu-item index={ menuFilter(key, this.baseURL) }>
            <span>{name}</span>
          </el-menu-item>
        ) : (
          <el-submenu index={ menuFilter(key, this.baseURL) }>
            <template slot="title">
              <div>
                <span>{name}</span>
              </div>
            </template>
            {this.createMenuItem(children)}
          </el-submenu>
        )));
    },
    toggleMenu() {
      this.collapse = !this.collapse;
      this.$emit('toggle', this.collapse);
    },
  },
};
</script>

<style lang="scss">
.hpct100 {
  height: 100%;
}
#menu {
  box-sizing: border-box;
  border-right: 1px solid #e6e6e6;
  .el-main,
  .el-header {
    padding: 0;
  }

  .el-button {
    padding: 0;
  }

  .menu-toggle {
    font-size: 30px;
  }

  .el-menu {
    border: none;
  }

  // 隐藏侧边菜单滚动条
  .scroll-bar {
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>

