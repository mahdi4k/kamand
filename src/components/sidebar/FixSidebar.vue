<template>
  <div class="flex no-wrap sidebar">
    <a @click="drawerToggle" href="#" class="text-center q-mt-md">
      <img
        alt="collapse"
        src="~assets/icons/sidebar/Collapse.svg"
      >
    </a>

    <q-list dense class="fix-sidebar q-my-auto">
      <q-item :active="activeMenu === menu.id" v-for="(menu) in menus" :key="menu.id" @click="setActiveMenu(menu.id)" clickable
              v-ripple>
        <q-item-section class="sidebar-items">
          <q-img
            :alt="menu.title"
            :src="menu.icon"
            style="width:22px"
          />
          <span>{{ menu.title }}</span>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
import {EventBus} from "src/EventBus";

export default {
  name: "FixSidebar",
  data() {
    return {
      menus: [
        {
          title: 'داشبورد',
          icon: './icons/sidebar/Dashboard.svg',
          id: 1
        },
        {
          title: 'اطلاعات پایه',
          icon: './icons/sidebar/Repair.svg',
          id: 2
        },
        {
          title: 'برنامه‌ریزی',
          icon: './icons/sidebar/Program.svg',
          id: 3
        },
        {
          title: 'گزارشات',
          icon: './icons/sidebar/Reports.svg',
          id: 4
        },
        {
          title: 'پارامترهای سیستمی',
          icon: './icons/sidebar/Parameters.svg',
          id: 5
        },
        {
          title: 'اعلان‌ها',
          icon: './icons/sidebar/Notification.svg',
          id: 6
        },
      ],
      activeMenu: 1
    }
  },
  methods: {
    drawerToggle() {
      EventBus.$emit('drawerShow', 'clicked')
    },
    setActiveMenu(val) {
      this.activeMenu = val
      // for check active is dashboard then hide mainSidebar
      EventBus.$emit('activeMenu', this.activeMenu)
    }
  }
}
</script>

<style lang="scss" scoped>
.q-drawer--left {
  left: 4%;
}



.q-item--active {
  background-color: $fix-activeBgSidebar;
}

.q-item {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.sidebar {
  height: 100vh;
  z-index: 1001;
  width: 4%;
  flex-direction: column;
  background-color: $fix-bgSidebar;
  @media (max-width:1100px ) {
    width: 6%;
  }
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
