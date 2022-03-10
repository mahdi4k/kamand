<template>
  <section>
    <div class="row">
      <div class="col-2 ">
        <div class="selectUnit">
          <div class="flex header justify-between items-center q-mb-md">
            <span class="q-mb-none title ">نوع واحد</span>
            <q-btn @click="addUnitTypeDialog = !addUnitTypeDialog" label="تعریف نوع واحد" type="submit" color="secondary"/>
          </div>
          <div class="body h-85 q-py-md">
            <div class="search q-pb-md q-px-md inputs-form">
              <q-input dense color="teal" outlined v-model="searchUnit" label="جستجو">
                <template v-slot:prepend>
                  <q-avatar>
                    <q-icon color="accent" size="22px">
                      <img
                        alt="search"
                        src="~assets/icons/Search.svg"
                      >
                    </q-icon>
                  </q-avatar>
                </template>
              </q-input>
            </div>
            <div class="radioGroup q-mt-md q-px-md">
              <q-option-group
                class="options"
                :options="groupOptions"
                type="radio"
                v-model="group"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="group" class="col-10 pr-xl mt-md">
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
        <p class="q-mt-xl title ">مدیریت واحد اندازه‌گیری</p>
        <q-table
          class=" border-radius k-grid "
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
                  <q-input ref="focus" dense v-model="featuresInputData.title" outlined type="text"
                           placeholder="عنوان"/>
                </div>

                <div class="col">
                  <q-input dense v-model="featuresInputData.code" outlined type="text"
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
                            :placeholder="!featuresInputData.category ? 'دسته‌بندی' : ''">
                    <template v-slot:after>
                      <q-btn class="filter-btn-dense" color="primary">
                        <q-icon color="accent" size="22px">
                          <img
                            alt="Filter"
                            src="~assets/icons/Filter.svg"
                          >
                        </q-icon>
                      </q-btn>
                    </template>
                  </q-select>

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


      </div>
      <div class="col-10" v-else>
        <div class="flex justify-center items-center column h-85">
          <q-icon color="accent" size="38px">
            <img
              alt="Add"
              src="~assets/icons/Text.svg"
            >
          </q-icon>
          <span class="title q-mt-md">نوع واحد را در این بخش تعریف </span>
          <span class="title">یا انتخاب کنید</span>
        </div>
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
            <q-input dense v-model="edit.code" outlined type="text"
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
          <q-input dense v-model="parameter" outlined type="text"
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
            <q-input dense v-model="parameter.value" outlined type="text"
                     placeholder="پارامتر"/>
            <q-btn @click="removeRow(index)" class="filter-btn-dense" color="primary">
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

    <!--    add unit type dialog-->
    <q-dialog v-model="addUnitTypeDialog">
      <q-card class=" border-radius-dialog" style="width: 768px; max-width: 80vw;">
        <q-card-section class="d-grid text-right grid-column items-center q-pb-none">
          <div class="text-h6">افزودن نوع واحد</div>
          <div>
            <q-btn icon="close" flat round dense v-close-popup/>
          </div>
        </q-card-section>
        <q-card-section class="q-px-none">
          <q-carousel
            v-model="slide"
            height="auto"
            transition-prev="slide-right"
            transition-next="slide-left"
            animated
            control-color="primary"
            class="rounded-borders q-px-none"
          >
            <!--            step 1-->
            <q-carousel-slide name="step1" class="column no-wrap ">
              <div class="q-mt-md q-px-xl row text-center">
                <div class="col-12 text-left col-lg-6 q-pr-sm q-mb-md">
                  <span class="input-title">عنوان واحد</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="عنوانی وارد کنید"/>
                </div>

                <div class="col-12 text-left col-lg-6 q-mb-md">
                  <span class="input-title">وضعیت</span>
                  <q-select use-input dense class="inputs-col" outlined v-model="edit.type"
                            :options="options"
                            :placeholder="!edit.type ? 'وضعیت' : ''"/>
                </div>
              </div>
            </q-carousel-slide>

            <!--            step 2-->
            <q-carousel-slide name="step2" class="column no-wrap">
              <div class="q-mt-md q-px-xl row text-center">
                <div class="col text-left q-pr-sm q-mb-md">
                  <span class="input-title">واحد اصلی</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="واحد اصلی"/>
                </div>

                <div class="col text-left q-pr-sm q-mb-md">
                  <span class="input-title">کد</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="کد"/>
                </div>

                <div class="col text-left q-pr-sm q-mb-md">
                  <span class="input-title">نماد</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="نماد"/>
                </div>

                <div class="col text-left q-mb-md">
                  <span class="input-title">ضریب</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="ضریب"/>
                </div>
              </div>
              <div class="br-line q-mb-sm"></div>

              <div class="q-mt-lg q-px-xl box-shadow-top row text-center">
                <div class="col text-left q-pr-sm q-mb-md">
                  <span class="input-title">واحد فرعی</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="مثال گرم"/>
                </div>

                <div class="col text-left q-pr-sm q-mb-md">
                  <span class="input-title">کد</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="کدی را وارد کنید"/>
                </div>

                <div class="col text-left q-pr-sm q-mb-md">
                  <span class="input-title">نماد</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="مثال gr"/>
                </div>

                <div class="col text-left q-mb-md">
                  <span class="input-title">ضریب</span>
                  <q-input dense v-model="edit.code" outlined type="text"
                           placeholder="ضریب تعدیل" >
                    <template v-slot:after>
                      <q-btn class="btn-dense"  style="color: #065A75;" outline >
                        <q-icon color="accent" size="22px">
                          <img
                            style="filter: hue-rotate(58deg)"
                            alt="Add"
                            src="~assets/icons/Add.svg"
                          >
                        </q-icon>
                      </q-btn>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="column q-mt-xl flex justify-center items-center">
                <q-icon color="accent" size="43px">
                  <img
                    alt="Hand"
                    src="~assets/icons/Hand.svg"
                  >
                </q-icon>
                <span class="modalTitle q-mt-md">واحدی اضافه کنید</span>
              </div>

            </q-carousel-slide>
          </q-carousel>
        </q-card-section>

        <q-card-actions class="justify-end q-pb-lg q-px-xl row box-shadow-bottom" align="right">
          <div class="flex justify-between items-center full-width">

            <div>
              <span> {{this.slide === 'step1' ? '1' : '2'}} </span> از <span> 2 </span>
            </div>
            <div>
              <q-btn
                @click="slide === 'step1'? addUnitTypeDialog = false: slide ='step1' "
                class="secondaryButton  q-mr-sm" outline
                :class="slide === 'step2'? 'q-px-md': ''"
                color="blue-grey-2"
                :label="slide === 'step1'? 'انصراف': 'مرحله قبلی'"
                />
              <q-btn
                @click="slide === 'step1'? slide = 'step2': addUnitType() "

                :class="slide === 'step1'? 'q-px-md': ''"
                color="secondary"
                :label="slide === 'step1'? 'مرحله بعدی': 'ثبت'"/>
            </div>
          </div>
        </q-card-actions>
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
      slide: 'step1',
      searchUnit: null,
      parameter: [],
      parameterRow: [],
      groupOptions: [
        {label: 'طول', value: 'bat'},
        {label: 'حجم', value: 'friend', color: 'green'},
        {label: 'وزن', value: 'upload', color: 'red'}
      ],
      group: null,
      editDialog: false,
      parameterDialog: false,
      addUnitTypeDialog: false,
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
    addRow() {
      this.parameterRow.push({value: null})
    },
    removeRow(index) {
      console.log(this.parameterRow.splice(index, 1))
    },
    addUnitType() {
       this.slide = 'step1'
       this.addUnitTypeDialog = false
    }
  },

}
</script>

<style lang="scss">
@import "src/css/table";

.pr-xl {
  padding-left: 32px;
}

.mt-md {
  margin-top: 11px;
}

.h-85 {
  height: 85vh;
}
.modalTitle{
  font-weight: bold;
  color: #697387;
  font-size: 16px;
}
.selectUnit {
  .header {
    button span {
      font-size: 14px;
    }
  }

  .body {
    background-color: white;
    box-shadow: 0 2px 8px rgb(0 0 0 / 22%);
    border-radius: 8px;

    position: relative;

    &:after {
      content: "";
      height: 100%;
      position: absolute;
      width: 1px;
      background-color: #CCD9E5;
      right: -17px;
      top: 0;
    }

    .search {
      box-shadow: 0 8px 8px 0 #ebebeb;
    }

    .radioGroup {
      .q-option-group > div {
        padding-top: 2px;
        padding-bottom: 2px;
        position: relative;

        &:after {
          content: '';
          width: 110%;
          height: 1px;
          background-color: #CCD9E5;
          position: absolute;
          right: -4.8%;
          bottom: 0;
        }

        &:last-of-type {
          &:after {
            content: unset;
          }
        }
      }
    }
  }
}
.q-carousel__slide{
  padding-left: 0;
  padding-right: 0;
}
</style>
