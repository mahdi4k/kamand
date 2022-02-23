<template>
  <q-layout view="hHh lpR fFf">
    <div class="flex mainLayout">

      <FixSidebar/>

      <MainSidebar/>

      <q-page-container class="col">
        <q-page class="flex">
          <q-page-container class="container container" style="padding-right: 62px !important">
            <router-view/>
          </q-page-container>
        </q-page>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>


import FixSidebar from "components/sidebar/FixSidebar";
import MainSidebar from "components/sidebar/MainSidebar";

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
