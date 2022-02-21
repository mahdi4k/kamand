<template>
  <q-layout view="hHh lpR fFf">
    <div class="flex mainLayout">

      <FixSidebar/>

      <MainSidebar/>

      <q-page-container class="col">
        <router-view/>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>


import FixSidebar from "components/FixSidebar";
import MainSidebar from "components/MainSidebar";

export default {
  name: 'MainLayout',
  components: {MainSidebar, FixSidebar},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">


</style>
