<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/history">History</router-link> |
      <router-link to="/history/out">History OUT</router-link> |
      <router-link to="/history/in">History IN</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss"></style>
