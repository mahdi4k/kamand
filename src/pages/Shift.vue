<template>
  <section>
    <AccordionMenu
      headerTitle="تعریف شیفت کاری"
      accordionTitle="در این بخش می‌توانید شیفت های کاری را به لیست اضافه کنید"
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
                        :placeholder="!type ? 'انتخاب' : ''">
                <template v-slot:after-options>
                  <q-item dir="rtl">
                    <q-btn flat
                           label="افزودن نوع شیفت... "
                           color="#28138D"
                           @click="shiftDialog = !shiftDialog">
                      <q-tooltip>
                        ثبت جدید
                      </q-tooltip>
                    </q-btn>

                  </q-item>
                </template>
              </q-select>
            </div>
            <div>
              <q-btn label="افزودن" :disable="!(type && categories.length>0)" type="submit"
                     :color="[type && categories.length>0 ? 'green-9' : 'primary']"/>
            </div>
          </div>
        </q-form>
        <q-separator class="half-hr"/>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md new-row"
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

          <q-separator class="col separator-hr"/>

          <div class="q-gutter-sm q-ml-none items-end q-mt-none inputs-form row " v-for="cat in categories">
            <div class="col-2">
              <div class="col">
                <q-input ref="focus" dense v-model="cat.name" outlined type="text" placeholder="عنوان"/>
              </div>
            </div>
            <div>
              <q-btn round size="12px" class="btn-Square" stretch
                     icon="img:./icons/delete.svg" @click="deleteRow"/>
            </div>
          </div>
        </q-form>
      </slot>
    </AccordionMenu>
    <div class="br-line"></div>

    <p class="title q-mt-xl">{{ headerTitle }}</p>
    <!--table-->
    <q-table
      class=" border-radius k-grid "
      :data="data"
      :loading="loading"
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

            <div class="col flex no-wrap">
              <q-select class="full-width" use-input dense outlined v-model="featuresInputData.category"
                        :options="options"
                        :placeholder="!featuresInputData.category ? 'نوع شیفت' : ''"/>
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
            <span key="name" :props="props" class="input-title">{{ props.row.number }}</span>
          </div>

          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.title }}</span>
          </div>

          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.type }}</span>
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
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>
    <!--  end table  -->

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
          <div class="col q-pr-sm q-mb-md">
            <q-input ref="focus" dense v-model="edit.title" outlined type="text" placeholder="عنوان"/>
          </div>

          <div class="col q-pr-sm q-mb-md">
            <q-select use-input dense class="inputs-col" outlined v-model="edit.type"
                      :options="options"
                      :placeholder="!edit.type ? 'نوع شیفت' : ''"/>
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
          <q-btn @click="addRow1" :disable="!parameter.length" class="filter-btn-dense" color="primary">
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

    <!--  add shift dialog  -->
    <q-dialog v-model="shiftDialog">
      <q-card class="q-pa-lg border-radius-dialog" style="width: 400px">
        <q-card-section class="d-grid text-right grid-column items-center q-pb-none">
          <div>تعریف نوع شیفت</div>
          <div>
            <q-btn icon="close" flat round dense v-close-popup/>
          </div>
        </q-card-section>

        <q-card-section >
          <div class="self-center first-col-table">
            <span>عنوان</span>
          </div>
          <q-input dense width="37" v-model="title" outlined type="text"
                   autofocus
                   placeholder="عنوان"/>


          <q-btn  :color="[title ? 'green-9' : 'primary']" :disable="title"
                  @click="saveShift"
                  style="width: 320px;margin-top: 15px">
            افزودن
          </q-btn>

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
    title: 'برنامه‌ریزی و کنترل تولید - شیفت کاری',

  },
  components: {AccordionMenu},
  data() {
    return {
      title:null,
      loading:false,
      headerTitle: 'مدیریت شیفت کاری',
      brStyle: 'border: solid 1px #c4c4c4;border-radius: 6px;',
      disable: true,
      icon: 'img:./icons/add-disable.svg',
      type: null,
      options: ['دو شیفته', 'سه شیفته'],
      categories: [],
      removeDialog: false,
      parameter: [],
      parameterRow: [],
      editDialog: false,
      parameterDialog: false,
      shiftDialog: false,
      data: [
        {
          number: 1,
          type: 'سه شیفته',
          title: 'A',
        },
        {
          number: 2,
          type: 'سه شیفته',
          title: 'B',
        }, {
          number: 3,
          type: 'سه شیفته',
          title: 'C',
        },
      ],
      featuresInputData: {
        title: null,
        type: null,
      },
      edit: {
        title: null,
        type: null,
      },
    }
  },
  methods: {
    saveShift(){
      this.options.push(this.title);
      this.title='';
      this.shiftDialog=false;
      this.type=this.options[this.options.length -1];
    },
    onSubmit() {
      this.loading=true;
      this.timer = setTimeout(()=>{

        this.loading = false

        this.$q.notify({
          type: 'negative',
          position:'top',
          message: `مشکل در برقراری ارتباط با سرور`
        })
        this.timer = void 0
      },1000)
    },
    addRow1() {
      this.parameterRow.push({value: null})
    },
    removeRow(index) {
      console.log(this.parameterRow.splice(index, 1))
    },
    addRow() {
      this.categories.push({id: 3, name: this.featuresInputData.title})
      this.featuresInputData.title = "";
    },
    deleteRow() {
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
<style scoped>
.half-hr {
  max-width: 340px;
  margin-top: 10px;
  margin-bottom: 10px
}

.new-row {
  max-height: 258px;
}

.separator-hr {
  margin-top: 10px;
  margin-bottom: 1px
}

.btn-Square {
  border: solid 1px #D01945;
  border-radius: 6px;
}
</style>
<style lang="scss">
@import "src/css/table";

</style>
