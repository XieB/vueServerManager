<template>
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo left_nav-menu"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :unique-opened="true"
                :router="true">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>服务器</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/server/lists">服务器列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统设置</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/system/contact">联系人</el-menu-item>
                    <el-menu-item index="/system/warnSet">报警设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <div class="right_main">
            <router-view v-wechat-title='$route.meta.title'/>
        </div>
    </div>


</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  list-style: none;
  margin: 0;
  padding: 0;
}
.left_nav-menu{
    overflow: auto;
    width: 200px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
}
.right_main{
    margin-left: 220px;
    margin-top: 20px;
}
</style>
