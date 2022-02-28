<template>
  <section>
    <AccordionMenu
      headerTitle="تعریف شیفت کاری"
      accordionTitle="در این بخش می‌توانید شیفت های کاری را به لیست اضافه کنید."
    >
      <slot>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <div class="q-gutter-sm q-ml-none items-end q-mt-none inputs-form row ">
            <div class="col-2">
              <span class="input-title">نوع شیفت</span>
              <q-select use-input dense class="inputs-col" outlined v-model="type"
                        :options="options"
                        :placeholder="!type ? 'انتخاب' : ''"/>
            </div>
            <div>
              <q-btn label="افزودن" type="submit" color="primary"/>
            </div>
          </div>
        </q-form>
        <q-separator style="max-width: 200px;margin-top: 10px;margin-bottom: 10px"/>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <div class="q-gutter-sm q-ml-none items-end q-mt-none inputs-form row ">
            <div class="col-2">
              <span class="input-title">عنوان</span>
              <div class="col">
                <q-input ref="focus" dense v-model="featuresInputData.title" outlined type="text" placeholder="عنوان"/>
              </div>
            </div>
            <div>
              <q-btn :disable="isComplete" round size="12px" :style="getStyle" stretch
                     :icon="getIcon" @click="addRow"/>
            </div>
          </div>

          <q-separator class="col" style="margin-top: 10px;margin-bottom: 1px"/>

          <div class="q-gutter-sm q-ml-none items-end q-mt-none inputs-form row " v-for="cat in categories">
            <div class="col-2">
              <div class="col">
                <q-input ref="focus" dense v-model="cat.name" outlined type="text" placeholder="عنوان"/>
              </div>
            </div>
            <div>
              <q-btn round size="12px" style="border: solid 1px #D01945  ;border-radius: 6px;" stretch
                     icon="img:./icons/delete.svg" @click="deleteRow"/>
            </div>
          </div>
        </q-form>
      </slot>
    </AccordionMenu>
    <div class="br-line"></div>



  </section>
</template>

<script>
import AccordionMenu from "components/AccordionMenu";


export default {
  name: "Unit.vue",
  meta: {
    // sets document title
    title: 'برنامه‌ریزی و کنترل تولید - واحد اندازه‌گیری',

  },
  components: { AccordionMenu},
  data() {
    return {
      brStyle: 'border: solid 1px #c4c4c4;border-radius: 6px;',
      disable: true,
      icon: 'img:./icons/add-disable.svg',
      type: null,
      options: ['دو شیفته', 'سه شیفته'],
      categories: [{id: 1, name: "A"}, {id: 2, name: "B"}],
      optionPageSelect: [1, 5, 10, 15],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 3,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
      pagesNumber: 2,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          sortable: true
        },

        {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
        {name: 'protein', label: 'Protein (g)', field: 'protein'},
        {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],
      data: [
        {
          title: "A",
          type: "سه شیفته",
        },
        {
          title: "B",
          type: "سه شیفته",
        }, {
          title: "C",
          type: "سه شیفته",
        },
      ],
      featuresInputData: {
        title: null,
        code: null,
        type: null,
        tag: null,
        category: null
      },
    }
  },
  methods: {
    onSubmit() {

    }, addRow() {
      this.categories.push({id: 3, name: this.featuresInputData.title})
      this.featuresInputData.title = "";
    }, deleteRow() {
      this.categories.splice(0, 1)
    }
  }, computed: {
    isComplete() {
      return !this.featuresInputData.title && true;
    },
    getIcon() {
      if (this.isComplete) {
        this.icon = 'img:./icons/add-disable.svg';
      } else {
        this.icon = 'img:./icons/add-active.svg';
      }
      return this.icon;
    }, getStyle() {
      if (this.isComplete) {
        this.brStyle = 'border: solid 1px #c4c4c4;border-radius: 6px;';
      } else {
        this.brStyle = 'border: solid 1px #065A75;border-radius: 6px;';
      }
      return this.brStyle;
    }
  }
}
</script>

<style lang="scss">
.first-col-table {
  margin-right: 0;
  width: 4%;
  text-align: center;
  height: 100%;
  place-self: center;
}

.btn-pagination {
  .q-btn__content {
    background: white;
    padding: 8px 14px 8px 14px;
    border: 1px solid #CCD9E5;
    border-radius: 8px;
  }

  .q-focus-helper {
    visibility: hidden;
  }
}

.last-col-table {
  width: 3%;
}

.rowPerPage {
  width: 100px;
  background-color: white;
}

.tableRows {
  padding: 12px 16px;
  border-bottom: 1px solid #CCD9E5;
}

.tableRows:last-child {
  border-bottom: unset;
}
</style>
