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

<!--table-->
    <q-table
      class="q-mt-xl border-radius k-grid "
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

          <div class="q-gutter-sm q-pt-sm q-ml-none items-end inputs-form row ">
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

            <div class="col flex no-wrap">
              <q-select class="full-width" use-input dense outlined v-model="featuresInputData.category"
                        :options="options"
                        :placeholder="!featuresInputData.category ? 'دسته‌بندی' : ''"/>
              <div>
                <q-btn class="filter-btn-dense" color="primary">
                  <q-icon color="accent" size="22px">
                    <img
                      alt="Filter"
                      src="~assets/icons/Filter.svg"
                    >
                  </q-icon>
                </q-btn>
              </div>
            </div>

          </div>
        </q-form>
      </template>
      <template v-slot:body="props">
        <div class="row q-gutter-sm q-mt-none relative-position q-ml-none tableRows">
          <div class="first-col-table">
            <span key="name" :props="props" class="input-title">{{ props.row.name }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.carbs }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.protein }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.sodium }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.calcium }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.fat }}</span>
          </div>
          <div class="last-col-table">
            <!--            parameter-->
            <q-btn @click="parameterDialog = !parameterDialog" class="btn-dense" color="white">
              <q-icon color="accent" size="22px">
                <img
                  alt="Parameters"
                  src="~assets/icons/Parameters.svg"
                >
              </q-icon>
              <q-tooltip>
                پارامتر
              </q-tooltip>
            </q-btn>
            <!--            edit-->
            <q-btn @click="editDialog = !editDialog" class="btn-dense" color="white">
              <q-icon color="accent" size="22px">
                <img
                  alt="Edit"
                  src="~assets/icons/Edit.svg"
                >
              </q-icon>
              <q-tooltip>
                ویرایش
              </q-tooltip>
            </q-btn>
            <!--            remove-->
            <q-btn @click="removeDialog = !removeDialog" class="btn-dense" color="white">
              <q-icon color="accent" size="22px">
                <img
                  alt="Remove"
                  src="~assets/icons/Remove.svg"
                >
              </q-icon>
              <q-tooltip>
                حذف
              </q-tooltip>
            </q-btn>
          </div>
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

<!--    dialog section-->
    <q-dialog v-model="removeDialog">
      <q-card class="q-pa-lg border-radius-dialog" style="width: 400px">
        <q-card-section class="d-grid text-right grid-column items-center q-pb-none">
          <div class="text-h6">پیام</div>
          <div>
            <q-btn icon="close" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section class="row justify-center items-center">
          <span class="q-ml-sm">آیا از حذف این سطر اطمینان دارید؟</span>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn class="cancel-btn" outline color="blue-grey-2" label="انصراف" v-close-popup></q-btn>
          <q-btn class="q-px-md" color="green-9" text-color="white" label="بله"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editDialog">
      <q-card class="q-pa-lg border-radius-dialog" style="width: 700px; max-width: 80vw;">
        <q-card-section class="d-grid text-right grid-column items-center q-pb-none">
          <div class="text-h6">ویرایش</div>
          <div>
            <q-btn icon="close" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section class="row">
          <div class="col-4 q-pr-sm q-mb-md">
            <q-input ref="focus" dense v-model="edit.title" outlined type="text" placeholder="عنوان"/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-input dense width="37" v-model="edit.code" outlined type="text"
                     placeholder="کد"/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-select use-input dense class="inputs-col" outlined v-model="edit.type"
                      :options="options"
                      :placeholder="!edit.type ? 'نوع' : ''"/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-select use-input dense outlined v-model="edit.tag" :options="options"
                      :placeholder="!edit.tag ? 'تگ' : ''"/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-select class="full-width" use-input dense outlined v-model="edit.category"
                      :options="options"
                      :placeholder="!edit.category ? 'دسته‌بندی' : ''"/>
          </div>
        </q-card-section>

        <q-card-actions class="q-pr-lg" align="right">
          <q-btn class="q-px-xl" color="primary" label="ویرایش"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="parameterDialog">
      <q-card class="q-pa-lg border-radius-dialog" style="width: 400px">
        <q-card-section class="d-grid text-right grid-column items-center q-pb-none">
          <div>افزودن پارامتر لیست</div>
          <div>
            <q-btn icon="close" flat round dense v-close-popup/>
          </div>
        </q-card-section>

        <q-card-section class="row">
          <div class="self-center first-col-table">
            <span>پارامتر</span>
          </div>
          <q-input dense width="37" v-model="parameter" outlined type="text"
                   placeholder="پارامتر"/>
          <q-btn @click="addRow" :disable="!parameter.length" class="filter-btn-dense" color="primary">
            <q-icon color="accent" size="22px">
              <img
                alt="Add"
                src="~assets/icons/Add.svg"
              >
            </q-icon>
          </q-btn>
          <div v-for="(parameter,index) in parameterRow">
            <q-input dense width="37" v-model="parameter.value" outlined type="text"
                     placeholder="پارامتر"/>
            <q-btn @click="removeRow(index)"   class="filter-btn-dense" color="primary">
              <q-icon color="accent" size="22px">
                <img
                  alt="Add"
                  src="~assets/icons/Add.svg"
                >
              </q-icon>
            </q-btn>
          </div>

        </q-card-section>


      </q-card>
    </q-dialog>

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
      optionPageSelect: [1, 5, 10, 15],
      removeDialog: false,
      parameter: [],
      parameterRow: [],
      editDialog: false,
      parameterDialog: false,
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
        }, {
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
      edit: {
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

    },
    addRow(){
      this.parameterRow.push({value :null})
    },
    removeRow(index){
      console.log(this.parameterRow.splice(index,1))
    }
  },

}
</script>

<style lang="scss">
@import "src/css/table";

</style>
