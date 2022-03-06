<template>
  <q-drawer class="sidebarItem" :width="201" side="left" v-model="leftDrawerOpen" bordered>
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

      <q-item :to="{name:'features'}" clickable v-ripple>
        <q-item-section>
          تعریف مشخصه‌ها
        </q-item-section>
      </q-item>

      <q-expansion-item
        expand-separator
        label="واحد اندازه‌گیری"
      >
        <q-card>
          <q-list dense padding>
            <q-item :to="{name:'unit'}" class="childExpansionItem" clickable v-ripple>
              <q-item-section>
                تعریف واحد
              </q-item-section>
            </q-item>

            <q-item class="childExpansionItem" clickable v-ripple>
              <q-item-section>
                تبدیل واحد
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        class="expansionItem"
        expand-separator
        label="درخت مکان"
      >
        <q-card>
          <q-list dense padding>
            <q-item class="childExpansionItem" clickable v-ripple>
              <q-item-section>
                درخت مکان
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        class="expansionItem"
        expand-separator
        label="تگ PLC"
      >
        <q-card>
          <q-list dense padding>
            <q-item :to="{name:'tag'}" class="childExpansionItem" clickable v-ripple>
              <q-item-section>
                تگ PLC
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        class="expansionItem"
        expand-separator
        label="درخت تجهیزات"
      >
        <q-card>
          <q-list dense padding>
            <q-item class="childExpansionItem" clickable v-ripple>
              <q-item-section>
                درخت تجهیزات
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        class="expansionItem"
        expand-separator
        label="شیفت کاری"
      >
        <q-card>
          <q-list dense padding>
            <q-item :to="{name:'shift'}" class="childExpansionItem" clickable v-ripple>
              <q-item-section>
                تعریف شیفت کاری
              </q-item-section>
            </q-item>
            <q-item class="childExpansionItem" clickable v-ripple>
              <q-item-section>
                تعریف الگوی کاری
              </q-item-section>
            </q-item>
          </q-list>
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
</template>

<script>
import {EventBus} from "src/EventBus";

export default {
  name: "MainSidebar",

  data() {
    return {
      leftDrawerOpen: false
    }
  },
  created() {
    EventBus.$on('drawerShow', data => {
      this.leftDrawerOpen = !this.leftDrawerOpen
    })
    EventBus.$on('activeMenu', data => {
      data === 1 ? this.leftDrawerOpen = false : this.leftDrawerOpen = true
    })

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
    font-size: $main-sidebar-font-size;
    .q-focus-helper {
      visibility: hidden;
    }

    .q-expansion-item--expanded {
      background-color: #EBF1F9;
      .q-card{
        background-color: #EBF1F9;
        .q-list{
          padding-top: 0;
          padding-left: 35px;
          color: #697387;
          .q-item{
            margin-bottom: 5px;

          }
        }
      }
    }
    .q-expansion-item--collapsed{
      transition: all .3s;
      background-color: #ffffff;
      .q-card{
        transition: all .3s;
        background-color: #ffffff;
        .q-list{
          padding-top: 0;
          padding-left: 35px;
          color: #697387;
          .q-item{
            margin-bottom: 5px;
            font-size: $main-sidebar-font-size;
          }
        }
      }
    }
    .q-hoverable:hover {
      background-color: #EBF1F9 !important;
    }

    body.desktop .q-hoverable:hover > .q-focus-helper {
      background-color: #EBF1F9 !important;
    }

    .q-list {
      .q-router-link--active {
        background-color: #EBF1F9;

        .q-item__section {
          max-width: 85%;
          padding: 6px 0 4px 13px;
          border-radius: 8px;
          background: $active-mainSideBar;
          color: white;
          font-size: $main-sidebar-font-size;
          position: relative;
          right: 8%;
        }
      }

      .q-item {
        &:after {
          content: "";
          height: 1px;
          width: 92%;
          background-color: #eeee;
          position: absolute;
          left: 8%;
          bottom: 0;
        }
        font-weight: 500;
      }

      .childExpansionItem {
        &:after {
          content: none !important;
        }
        font-weight: normal ;
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
