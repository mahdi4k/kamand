<template>
  <q-layout view="hHh lpR fFf">
    <div class="flex mainLayout">

      <FixSidebar @drawerShow="drawerShow"/>


      <q-drawer class="sidebarItem" :width="201" side="left" show-if-above v-model="leftDrawerOpen" bordered>
        <div class="q-pl-md header-sidebar q-pt-md flex column">
          <div class="borderLogo">
            <img
              width="36"
              alt="لوگو"
              src="~assets/icons/sidebar/Logo.png"
            >
          </div>
          <span class="q-mt-sm">
            سامانه جامع برنامه‌ریزی
          </span><span>
            و کنترل تولید
          </span>
        </div>
        <q-list class="q-my-auto">

          <q-item active clickable v-ripple>
            <q-item-section >
              تعریف مشخصه‌ها
            </q-item-section>
          </q-item>


          <q-expansion-item
            expand-separator
            label="واحد اندازه‌گیری"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="درخت مکان"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="تگ PLC"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="درخت تجهیزات"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            label="شیفت کاری"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-list>
        <div class="userDetail">

          <div class="flex row items-center">
            <img
              width="36"
              alt="user"
              src="~assets/icons/sidebar/User.png"
            >
            <div class="flex q-ml-sm column">
              <span>نام کاربر</span>
              <span>Product owner</span>
            </div>
          </div>
          <img class="cursor-pointer"
            alt="UserSetting"
            src="~assets/icons/sidebar/UserSetting.svg"
          >

        </div>
      </q-drawer>

      <q-page-container class="col">
        <router-view/>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>


import FixSidebar from "components/FixSidebar";

export default {
  name: 'MainLayout',
  components: {FixSidebar},
  data() {
    return {
      leftDrawerOpen: true,
    }
  },
  methods: {
    drawerShow() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
}
</script>

<style lang="scss">
.q-drawer--left {
  left: 4%;
}

.mainLayout {
  .q-drawer__content {
    display: flex;
    flex-direction: column;
  }
  .sidebarItem {
    .q-focus-helper {
      visibility: hidden;
    }
    .q-hoverable:hover{
      background-color: #EBF1F9 !important;
    }
    body.desktop .q-hoverable:hover > .q-focus-helper{
      background-color: #EBF1F9 !important;
    }
    .q-list {
      .q-item--active{
        background-color: #EBF1F9;
        .q-item__section{
          max-width: 85%;
          padding:6px 0 4px 13px;
          border-radius: 8px;
          background: linear-gradient(270deg, #058BB6 100% ,#007499 0%);
          color: white;
          font-size: 13px;
        }
      }
    }
    .q-item{
      &:after{
        content: "";
        height: 1px;
        width: 92%;
        background-color: #eeee;
        position: absolute;
        left: 8%;
        bottom: 0;
      }
    }
    .header-sidebar {
      .borderLogo {
        border: 1px solid #D7E3EE;
        width: fit-content;
        border-radius: 8px;
        padding: 5px;
        display: flex;
      }

      span {
        color: #697387;
        font-weight: bold;
      }
    }

    .userDetail {
      justify-content: space-between;
      display: flex;
      padding: 1rem;
      border-top: 1px solid #ccc;
      align-items: center;

      span {
        font-size: 11px;
      }
    }
  }

}

</style>
