<template>
  <section>
    <AccordionMenu
      headerTitle="تعریف واحد اندازه‌گیری"
      accordionTitle="در این بخش می‌توانید یک یا چند واحد اضافه کنید"
    >
      <slot>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <div class="q-gutter-sm q-ml-none items-end q-mt-none inputs-form row ">
            <div class="col-2">
              <span class="input-title">نوع واحد</span>
              <q-select use-input dense class="inputs-col" outlined v-model="type"
                        :options="options"
                        :placeholder="!type ? 'انتخاب' : ''"/>
            </div>
            <div>
              <q-btn label="افزودن" type="submit" color="primary"/>
            </div>
          </div>
        </q-form>
      </slot>
    </AccordionMenu>
    <div class="br-line"></div>

    <q-table
      class="q-mt-xl border-radius "
      :data="data"
      :columns="columns"
      separator="vertical"
      hide-header
      hide-bottom
      row-key="name"
    >
      <template v-slot:top>
        <q-form

          @submit="onSubmit"
          class="full-width"
        >

          <div class="q-gutter-sm q-ml-none items-end inputs-form row ">
            <div class="self-center first-col-table">
              <span>ردیف</span>
            </div>

            <div class="col">
              <q-input ref="focus" dense v-model="featuresInputData.title" outlined type="text" placeholder="عنوان"/>
            </div>

            <div class="col">
              <q-input dense width="37" v-model="featuresInputData.code" outlined type="text"
                       placeholder="کد"/>
            </div>

            <div class="col">
              <q-select use-input dense class="inputs-col" outlined v-model="featuresInputData.type"
                        :options="options"
                        :placeholder="!featuresInputData.type ? 'نوع' : ''"/>
            </div>

            <div class="col">
              <q-select use-input dense outlined v-model="featuresInputData.tag" :options="options"
                        :placeholder="!featuresInputData.tag ? 'تگ' : ''"/>
            </div>

            <div class="col">
              <q-select use-input dense outlined v-model="featuresInputData.category" :options="options"
                        :placeholder="!featuresInputData.category ? 'دسته‌بندی' : ''"/>
            </div>

            <div>
              <q-btn color="primary">
                <q-icon color="accent" size="22px">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M22 0H-1.90735e-06L7.93837 13.389V22H14.0612V13.389L22 0ZM18.3683 2.09524L12.0202 12.8015V19.9048H9.97931V12.8015L3.63155 2.09524H18.3683Z"
                          fill="white"/>
                  </svg>
                </q-icon>
              </q-btn>
            </div>
          </div>
        </q-form>
      </template>
      <template v-slot:body="props">
        <div class="row q-gutter-sm q-ml-none tableRows">
          <div class="first-col-table">
            <span key="name" :props="props" class="input-title">{{ props.row.name }}</span>
          </div>
          <div class="col">
            <span key="name" :props="props" class="input-title">{{ props.row.carbs }}</span>
          </div>
          <div class="col">
            <span key="name" :props="props" class="input-title">{{ props.row.protein }}</span>
          </div>
          <div class="col">
            <span key="name" :props="props" class="input-title">{{ props.row.sodium }}</span>
          </div>
          <div class="col">
            <span key="name" :props="props" class="input-title">{{ props.row.calcium }}</span>
          </div>
          <div class="col">
            <span key="name" :props="props" class="input-title">{{ props.row.fat }}</span>
          </div>
          <div class="last-col-table"></div>
        </div>

      </template>
    </q-table>
    <div class="row justify-between q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        boundary-numbers
        class="btn-pagination"
        size="sm"
      />
      <div class="flex  items-center">
        <span>تعداد نمایش :</span>
        <q-select use-input dense class="rowPerPage" outlined v-model="type"
                  :options="optionPageSelect"
        />
      </div>
    </div>
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
  components: {AccordionMenu},
  data() {
    return {
      type: null,
      options: ['a', 'b', 'c'],
      optionPageSelect:[1,5,10,15],
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
          name: 1,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
        },
        {
          name: 2,
          fat: 'آج',
          carbs: 224,
          protein: 'لیست',
          sodium: 'DRI-Co',
          calcium: 'درخت تجهیز',
        },{
          name: 2,
          fat: 'آج',
          carbs: 224,
          protein: 'لیست',
          sodium: 'DRI-Co',
          calcium: 'درخت تجهیز',
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
.btn-pagination{
  .q-btn__content{
    background: white;
    padding: 8px 14px 8px 14px;
    border: 1px solid #CCD9E5;
    border-radius: 8px;
  }
  .q-focus-helper {
    visibility: hidden;
  }
}
.last-col-table{
  width: 3%;
}
.rowPerPage{
  width: 100px;
  background-color: white;
}
.tableRows {
  padding: 12px 16px;
  border-bottom: 1px solid #CCD9E5;
}
.tableRows:last-child{
  border-bottom: unset;
}
</style>
