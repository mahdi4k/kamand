<template>
  <section>
    <AccordionMenu
      headerTitle="مشخصات"
      accordionTitle="در این بخش می‌توانید مشخصات را وارد کنید"
      @add-button-clicked="focusInput()"
    >
      <slot>
        <q-form
          @submit="onSubmit"
          ref="formSubmit"
          class="q-gutter-md"
        >
          <div class="q-gutter-sm items-end inputs-form row ">
            <div class="col">
              <span class="input-title">عنوان</span>
              <q-input :rules="[val => !!val || 'عنوان را وارد کنید']" ref="focus" dense
                       v-model="featuresInputData.title" outlined type="text" placeholder="عنوان"/>
            </div>

            <div class="col">
              <span class="input-title">کد</span>
              <q-input :rules="[val => !!val || 'کد را وارد کنید']" dense width="37" v-model="featuresInputData.code"
                       outlined type="text"
                       placeholder="کد"/>
            </div>

            <div class="col">
              <span class="input-title">نوع</span>
              <q-select :rules="[val => !!val || 'نوع را وارد کنید']" use-input dense class="inputs-col hide-caret"
                        outlined
                        v-model="featuresInputData.type"
                        :options="typeOptions"
                        :placeholder="!featuresInputData.type ? 'نوع' : ''">
                <template v-slot:append>
                  <q-icon
                    v-if="featuresInputData.type !== null && featuresInputData.type && featuresInputData.type.length !== 0"
                    class="cursor-pointer"
                    name="cancel"
                    @click.stop="featuresInputData.type = null"
                  />
                </template>

              </q-select>
            </div>

            <div class="col">
              <span class="input-title">تگ</span>

              <q-select
                class="hide-caret"
                use-input
                outlined
                v-model="featuresInputData.tag"
                :options="options"
                :placeholder="!featuresInputData.tag ? 'تگ' : ''"
                multiple
                emit-value
                dense
                map-options
              >
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item
                    v-bind="itemProps"
                    v-on="itemEvents"
                    class="multiSelect"
                  >

                    <div class="multiSelectSection">
                      <q-item-section>
                        <q-checkbox color="cyan-10" :value="selected" @input="toggleOption(opt)"></q-checkbox>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="opt.label"></q-item-label>
                      </q-item-section>
                    </div>

                  </q-item>
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="featuresInputData.tag !== null && featuresInputData.tag && featuresInputData.tag.length !== 0"
                    class="cursor-pointer"
                    name="cancel"
                    @click.stop="featuresInputData.tag = null"
                  />
                </template>
              </q-select>


            </div>

            <div class="col">
              <span class="input-title">دسته‌بندی</span>


              <q-select
                class="hide-caret"
                use-input
                outlined
                v-model="featuresInputData.category"
                :options="options"
                :placeholder="!featuresInputData.category ? 'دسته‌بندی' : ''"
                multiple
                emit-value
                dense
                map-options
              >
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item
                    v-bind="itemProps"
                    v-on="itemEvents"
                    class="multiSelect"
                  >

                    <div class="multiSelectSection">
                      <q-item-section>
                        <q-checkbox color="cyan-10" :value="selected" @input="toggleOption(opt)"></q-checkbox>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="opt.label"></q-item-label>
                      </q-item-section>
                    </div>

                  </q-item>
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="featuresInputData.category !== null && featuresInputData.category && featuresInputData.category.length !== 0"
                    class="cursor-pointer"
                    name="cancel"
                    @click.stop="featuresInputData.category = null"
                  />
                </template>
              </q-select>
            </div>

            <div>
              <q-btn label="افزودن" type="submit" :color="activeFormButton ? 'green-9' : 'primary'"/>
            </div>
          </div>
        </q-form>
      </slot>
    </AccordionMenu>
    <div class="br-line"></div>

    <!--table-->
    <p class="title q-mt-xl">مدیریت مشخصات</p>
    <q-table
      class=" border-radius k-grid "
      no-data-label="I didn't find anything for you"
      :data="table.data"
      :columns="table.columns"
      :pagination="pagination"
      separator="vertical"
      :loading="tableLoading"
      hide-header
      hide-bottom
      row-key="name"
    >

      <template v-slot:top>
        <q-form
          @submit="filterSubmit"
          class="full-width"
        >

          <div class="q-gutter-sm q-pt-sm q-ml-none items-end inputs-form row ">
            <div class="self-center first-col-table">
              <span>ردیف</span>
            </div>

            <div class="col">
              <q-input dense v-model="filter.title" outlined type="text" placeholder="عنوان"/>
            </div>

            <div class="col">
              <q-input dense width="37" v-model="filter.code" outlined type="text"
                       placeholder="کد"/>
            </div>

            <div class="col">
              <q-select use-input dense class="inputs-col" outlined v-model="filter.type"
                        :options="options"
                        :placeholder="!filter.type ? 'نوع' : ''"/>
            </div>

            <div class="col">
              <q-select use-input dense outlined v-model="filter.tag" :options="options"
                        :placeholder="!filter.tag ? 'تگ' : ''"/>
            </div>

            <div class="col flex no-wrap">
              <q-select
                class="full-width"
                multiple
                use-input
                dense outlined
                v-model="filter.category"
                :options="options"
                :placeholder="!filter.category ? 'دسته‌بندی' : ''"/>
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
            <span key="name" :props="props" class="input-title">{{ props.row.index }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.title }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.code }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props"
                  class="input-title">{{ props.row.type.label ? props.row.type.label : props.row.type }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props"
                  class="input-title">{{ props.row.tag.label ? props.row.tag.label : props.row.tag }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.category.toString() }}</span>
          </div>
          <div class="last-col-table">
            <!--            parameter-->
            <q-btn :disable="props.row.type!=='لیست'" @click="parameterDialog = !parameterDialog" class="btn-dense"
                   color="white">
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
            <q-btn @click="prepareEditData(props.row.index)" class="btn-dense" color="white">
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
            <q-btn @click="removeDialog = !removeDialog;deleteItemId=props.row.index" class="btn-dense" color="white">
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
        <q-inner-loading showing color="blue-4"/>
      </template>
    </q-table>
    <div class="row hidden justify-between q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="5"
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

    <!--  remove  dialog section-->
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
          <q-btn class="q-px-md" color="green-9" @click="removeRowTable()" text-color="white" label="بله"></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!--  edit dialog section-->
    <q-dialog v-model="editDialog">
      <q-card class="q-pa-lg border-radius-dialog" style="width: 700px; max-width: 80vw;">
        <q-form
          @submit="editTableData"
          ref="formSubmit"
          class="q-gutter-md"
        >
          <q-card-section class="d-grid text-right grid-column items-center q-pb-none">
            <div class="text-h6">ویرایش</div>
            <div>
              <q-btn icon="close" flat round dense v-close-popup/>
            </div>
          </q-card-section>
          <q-card-section class="row inputs-form">
            <div class="col-4 q-pr-sm q-mb-md">
              <span class="input-title">عنوان</span>
              <q-input :rules="[val => !!val || 'عنوان را وارد کنید']" dense v-model="edit.title" outlined type="text"
                       placeholder="عنوان"/>
            </div>

            <div class="col-4 q-pr-sm q-mb-md">
              <span class="input-title">کد</span>

              <q-input :rules="[val => !!val || 'کد را وارد کنید']" dense width="37" v-model="edit.code" outlined
                       type="text"
                       placeholder="کد"/>
            </div>

            <div class="col-4 q-pr-sm q-mb-md">
              <span class="input-title">نوع</span>
              <q-select :rules="[val => !!val || 'نوع را وارد کنید']" use-input dense class="inputs-col" outlined
                        v-model="edit.type"
                        :options="typeOptions"
                        :placeholder="!edit.type ? 'نوع' : ''"/>
            </div>

            <div class="col-4 q-pr-sm q-mb-md">
              <span class="input-title">تگ</span>
              <q-select
                use-input
                outlined
                v-model="edit.tag"
                :options="options"
                :placeholder="!edit.tag ? 'تگ' : ''"
                multiple
                emit-value
                dense
                map-options
              >
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item
                    v-bind="itemProps"
                    v-on="itemEvents"
                    class="multiSelect"
                  >

                    <div class="multiSelectSection">
                      <q-item-section>
                        <q-checkbox color="cyan-10" :value="selected"></q-checkbox>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="opt.label"></q-item-label>
                      </q-item-section>
                    </div>

                  </q-item>
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="edit.tag !== null && edit.tag && edit.tag.length !== 0"
                    class="cursor-pointer"
                    name="cancel"
                    @click.stop="edit.tag = null"
                  />
                </template>
              </q-select>
            </div>

            <div class="col-4 q-pr-sm q-mb-md">
              <span class="input-title">دسته‌بندی</span>
              <q-select
                use-input
                outlined
                v-model="edit.category"
                :options="options"
                :placeholder="!edit.category ? 'دسته‌بندی' : ''"
                multiple
                emit-value
                dense
                map-options
              >
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item
                    v-bind="itemProps"
                    v-on="itemEvents"
                    class="multiSelect"
                  >

                    <div class="multiSelectSection">
                      <q-item-section>
                        <q-checkbox color="cyan-10" :value="selected"></q-checkbox>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label v-html="opt.label"></q-item-label>
                      </q-item-section>
                    </div>

                  </q-item>
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="edit.category !== null && edit.category && edit.category.length !== 0"
                    class="cursor-pointer"
                    name="cancel"
                    @click.stop="edit.category = null"
                  />
                </template>
              </q-select>
            </div>
          </q-card-section>

          <q-card-actions class="q-pr-lg" align="right">
            <q-btn class="cancel-btn" outline color="blue-grey-2" label="انصراف" v-close-popup></q-btn>
            <q-btn autofocus type="submit" class="q-px-xl" color="green-9" label="ویرایش"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <!--  parameter dialog section-->
    <q-dialog v-model="parameterDialog">
      <q-card class="q-pa-lg border-radius-dialog" style="width: 440px">
        <q-card-section class="d-grid text-right grid-column items-center q-pb-none">
          <div>افزودن پارامتر لیست</div>
          <div>
            <q-btn icon="close" flat round dense v-close-popup/>
          </div>
        </q-card-section>

        <q-card-section class="row inputs-form">
          <q-form
            @submit="onSubmit"
            ref="formSubmit"
          >
            <div class="full-width flex">

              <div class="self-center first-col-table">
                <span class="input-title">پارامتر</span>
              </div>
              <div :class="index === 0 ?'q-mt-xs' : 'q-mt-md' " class="full-width  flex"
                   v-for="(parameter,index) in parameterRow">
                <q-input :rules="[val => !!val || '']" class="col" dense width="37"
                         v-model="parameter.value" outlined type="text"
                         placeholder="پارامتر"/>
                <q-btn v-if="index === 0" outline @click="rowCheck(index)" :disable="!activeParameterButton"
                       class="filter-btn-dense q-ml-sm"
                       color="primary">
                  <q-icon color="accent" size="22px">
                    <img
                      alt="Add"
                      src="~assets/icons/Add.svg"
                    >
                  </q-icon>
                </q-btn>
                <q-btn v-else outline @click="rowCheck(index)" class="filter-btn-dense q-ml-sm"
                       color="primary">
                  <q-icon color="accent" size="22px">
                    <img
                      alt="Add"
                      src="~assets/icons/Remove.svg"
                    >
                  </q-icon>
                </q-btn>
              </div>
              <q-btn type="submit" class="q-mt-md full-width" label="افزودن"
                     color="green-9">
              </q-btn>

            </div>
          </q-form>

        </q-card-section>


      </q-card>
    </q-dialog>
  </section>

</template>

<script>
import AccordionMenu from "components/AccordionMenu";
import {api} from "boot/axios";

export default {
  name: 'Features',
  meta: {
    // sets document title
    title: 'برنامه‌ریزی و کنترل تولید - مشخصه‌‌ها',

  },
  components: {AccordionMenu},
  data() {
    return {
      type: null,
      tableLoading: false,
      options: [
        {
          label: 'عمومی',
          value: 'عمومی'
        },
        {
          label: 'پرخطر',
          value: 'پرخطر'
        },
        {
          label: 'الکترود',
          value: 'الکترود'
        },

      ],
      typeOptions: [
        {
          label: 'متن',
          value: 'متن'
        },
        {
          label: 'لیست',
          value: 'لیست'
        },
        {
          label: 'عدد',
          value: 'عدد'
        },

      ],
      optionPageSelect: [1, 5, 10, 15],
      removeDialog: false,
      deleteItemId: null,
      editItemId: null,
      parameter: [],
      parameterRow: [
        {value: null}
      ],
      activeFormButton: false,
      activeParameterButton: false,
      editDialog: false,
      parameterDialog: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      table: {
        columns: [
          {
            name: 'index',
            label: 'ردیف',
            align: 'center',
          },

          {name: 'code', label: 'کد', field: 'code'},
          {name: 'type', label: 'نوع', field: 'type'},
          {name: 'tag', label: ' تگ', field: 'tag'},
          {
            name: 'category',
            label: 'دسته‌بندی',
            field: 'category',
            sortable: true,
          },
        ],
        data: [
          {
            index: 1,
            title: 'تست 1',
            code: 12,
            type: 'متن',
            tag: 'عمومی',
            category: 'عمومی,پرخطر'
          },
          {
            index: 2,
            title: 'تست 12',
            code: 33,
            type: 'لیست',
            tag: 'عمومی',
            category: 'عمومی,پرخطر'
          },
          {
            index: 3,
            title: 'تست 13',
            code: 34,
            type: 'عدد',
            tag: 'عمومی',
            category: 'عمومی,پرخطر'
          },
        ],
      },
      featuresInputData: {
        title: null,
        code: null,
        type: null,
        tag: null,
        category: null
      },
      filter: {
        title: null,
        code: null,
        type: null,
        tag: null,
        category: null
      },
      edit: {
        index: null,
        title: null,
        code: null,
        type: null,
        tag: null,
        category: null
      },
    }
  },
  methods: {
    async getTableData(props) {
      const {
        page,
        rowsPerPage,
        filterString,
      } = props.pagination;

      await api.get(`features?perPage=${rowsPerPage}&page=${page}&${filterString}`)
        .then(res => {
          let dataTable = res.data.data
          this.updatePagination({
            meta: res.data.meta,
            sortBy: null,
            filterString: filterString
          });
          // this.table.data = dataTable.length > 0 ? this.prepareDataForTable(dataTable) : []
        })
    },
    updatePagination(obj) {
      obj.hasOwnProperty('sortBy') ? this.pagination.sortBy = obj.sortBy : '';
      obj.hasOwnProperty('filterString') ? this.pagination.filterString = obj.filterString : '';
      if (obj.hasOwnProperty('meta')) {
        this.pagination.rowsNumber = obj.meta.total;
        this.pagination.page = obj.meta.current_page;
        this.pagination.rowsPerPage = obj.meta.per_page;
      }
    },
    prepareDataForTable(data) {
      let tableData = [];
      data.forEach((item, index) => {
        let object = {
          id: item.id,
          index: (this.pagination.page - 1) * this.pagination.rowsPerPage + index + 1,
          destination: item.destination.name,
          subcategory: item.subcategory.name,
          description: item.description,
          trucks: item.trucks,
        }
        tableData.push(object);
      });
      return tableData;
    },

    onSubmit() {
      // let data = {
      //   dataType : this.featuresInputData.type.label,
      //   subcategories : this.featuresInputData.category.toString(),
      //   tags: this.featuresInputData.tag.label,
      //   name : this.featuresInputData.title,
      //   code : this.featuresInputData.code
      // }


      // api.post('features',data).then(res=>{
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })

      this.tableLoading = true
      this.timer = setTimeout(() => {
        let data = {
          index: this.table.data.length + 1,
          type: this.featuresInputData.type.label,
          category: this.featuresInputData.category.toString(),
          tag: this.featuresInputData.tag.toString(),
          title: this.featuresInputData.title,
          code: this.featuresInputData.code
        }
        this.table.data.push(data)
        this.clearForm()
        this.tableLoading = false
        this.$refs.focus.focus()
        this.$refs.formSubmit.reset();
        this.$q.notify({
          type: 'positive',
          message: `مشخصه با موفقیت ثبت شد`
        })
        this.timer = void 0
      }, 1000)

    },
    clearForm() {
      this.featuresInputData.tag = null
      this.featuresInputData.title = null
      this.featuresInputData.code = null
      this.featuresInputData.category = null
      this.featuresInputData.type = null
    },
    filterSubmit() {

    },
    focusInput() {

      setTimeout(() => {

        this.$refs.focus.focus()
      }, 100)

    },
    rowCheck(index) {
      index === 0 ? this.addRow() : this.removeRow(index)
    },
    addRow() {

      this.parameterRow.push({value: null})
    },
    removeRow(index) {
      this.activeParameterButton = true
      console.log(this.parameterRow.splice(index, 1))
    },
    prepareEditData(index) {
      this.editDialog = !this.editDialog
      let editData = this.table.data.filter(el => el.index === index)[0]
      console.log(editData)

      this.editItemId = index
      this.edit.index = index
      this.edit.title = editData.title
      this.edit.code = editData.code
      this.edit.type = editData.type
      this.edit.tag = Array.isArray(editData.tag) ? editData.tag : editData.tag.split(",")
      this.edit.category = Array.isArray(editData.category) ? editData.category : editData.category.split(",")
    },
    editTableData() {
      let findIndex = this.table.data.findIndex(el => (el.index === this.editItemId))
      this.table.data.splice(findIndex, 1, this.edit)
      this.editDialog = false
      this.$q.notify({
        type: 'positive',
        message: `مشخصه با موفقیت ویرایش شد`
      })

    },
    removeRowTable() {
      let id = Number(this.deleteItemId) - 1
      this.table.data.splice(id, 1)
      this.$q.notify({
        type: 'positive',
        message: `ردیف مورد نظر با موفقیت حذف شد`
      })
    },

  },
  mounted() {
    this.getTableData({pagination: this.pagination})
  },
  watch: {
    featuresInputData: {
      deep: true,
      handler() {
        this.activeFormButton = !!(this.featuresInputData['type'] && this.featuresInputData['title'] && this.featuresInputData['code']);
        if (this.featuresInputData.type && this.featuresInputData.type.label === 'لیست') {
          this.parameterDialog = true
        }
      }
    },
    parameterRow: {
      deep: true,
      handler() {
        this.parameterRow.map(el => {

          this.activeParameterButton = !(el.value === null || el.value === '');
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import "src/css/table";
.q-field__bottom{

}
</style>
