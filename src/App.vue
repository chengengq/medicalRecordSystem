<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
html,
body {
  width: 100%;
  height: 100%;
  background: #fefefe;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
@import "./styles/global.scss";
</style>
