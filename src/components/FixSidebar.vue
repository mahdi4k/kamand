<template>
  <div class="flex sidebar">
    <a @click="drawerToggle"  href="#" class="text-center q-mt-md">
      <img
        alt="collapse"
        src="~assets/icons/sidebar/Collapse.svg"
      >
    </a>

    <q-list  dense class="fix-sidebar q-my-auto">
      <q-item  clickable v-ripple>
        <q-item-section class="sidebar-items">
          <img
            alt="داشبورد"
            src="~assets/icons/sidebar/Dashboard.svg"
          >
          <span>داشبورد</span>
        </q-item-section>
      </q-item>

      <q-item active clickable v-ripple>
        <q-item-section class="sidebar-items">
          <img
            alt="اطلاعات پایه"
            src="~assets/icons/sidebar/Repair.svg"
          >
          <span>اطلاعات پایه</span>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section class="sidebar-items">
          <img
            alt="برنامه‌ریزی"
            src="~assets/icons/sidebar/Program.svg"
          >
          <span>برنامه‌ریزی</span>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section class="sidebar-items">
          <img
            alt="گزارشات"
            src="~assets/icons/sidebar/Reports.svg"
          >
          <span>گزارشات</span>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section class="sidebar-items">
          <img
            alt="پارامترهای سیستمی"
            src="~assets/icons/sidebar/Parameters.svg"
          >
          <span>پارامترهای سیستمی</span>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section class="sidebar-items">
          <img
            alt="اعلان‌ها"
            src="~assets/icons/sidebar/Notification.svg"
          >
          <span>اعلان‌ها</span>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
export default {
  name: "FixSidebar",
  data(){
    return{

    }
  },
  methods:{
    drawerToggle(){
      this.$emit('drawerShow', 'clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
.bg-sidebar {
  background-color: #035670;
}
.q-item--active{
  background-color: #003546;
}
.q-item {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.sidebar {
  height: 100vh;
  z-index: 1001;
  min-width: 3.6%;
  max-width: 4%;
  flex-direction: column;
  background-color: #035670;

  .fix-sidebar {
    overflow: hidden;

    .sidebar-items {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-top: 8px;
      padding-bottom: 8px;

      span {
        font-size: 11px;
        color: white;
        margin-top: 4px;
        text-align: center;
      }

    }
  }
}
</style>
