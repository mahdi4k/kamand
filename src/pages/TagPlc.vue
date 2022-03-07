<template>
  <section>
    <AccordionMenu
      headerTitle="افزودن تگ"
      accordionTitle="در این بخش می‌توانید تگ مورد نظر را به لیست اضافه کنید."
    >
      <slot>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <div class="q-gutter-sm items-end inputs-form row ">
            <div class="col">
              <span class="input-title">عنوان</span>
              <q-input ref="focus" dense v-model="form.name"
                       outlined type="text" placeholder="عنوان"/>
            </div>

            <div class="col">
              <span class="input-title">کد</span>
              <q-input dense width="37"
                       outlined type="text"
                       v-model="form.code"
                       placeholder="کد"/>
            </div>

            <div class="col">
              <span class="input-title">نوع</span>
              <q-select use-input dense class="inputs-col" outlined v-model="form.datatype"
                        :options="typeOfData"
                        option-value="id"
                        option-label="name"
                        :placeholder="!form.datatype ? 'انتخاب' : ''">

              </q-select>
            </div>

            <div class="col">
              <span class="input-title">ضریب</span>
              <q-input ref="focus" dense v-model="form.factor"
                       outlined type="text" placeholder="ضریب"/>
            </div>

            <div class="col">
              <span class="input-title">دسته‌بندی</span>
              <q-select use-input dense class="inputs-col" outlined v-model="form.category"
                        :options="categories"
                        option-value="id"
                        option-label="name"
                        :placeholder="!form.category ? 'انتخاب' : ''">

              </q-select>
            </div>

            <div>
              <q-btn label="افزودن" type="submit" :disable="!activeFormButton"
                     :color="activeFormButton ? 'green-9' : 'primary'"/>
            </div>
          </div>
        </q-form>
      </slot>
    </AccordionMenu>
    <div class="br-line"></div>

    <!--table-->
    <p class="title q-mt-xl">مدیریت تگ</p>
    <q-table
      class=" border-radius k-grid "
      no-data-label="I didn't find anything for you"
      :data="table.data"
      :columns="table.columns"
      :pagination.sync="pagination"
      separator="vertical"
      :loading="tableLoading"
      hide-header
      hide-bottom
      row-key="index"
    >

      <template v-slot:top>
        <q-form
          class="full-width"
        >

          <div class="q-gutter-sm q-pt-sm q-ml-none items-end inputs-form row ">
            <div class="self-center first-col-table">
              <span>ردیف</span>
            </div>

            <div class="col">
              <q-input dense v-model="filter.name" outlined type="text" placeholder="عنوان"/>
            </div>

            <div class="col">
              <q-input dense width="37" v-model="filter.code" outlined type="text"
                       placeholder="کد"/>
            </div>

            <div class="col">
              <q-select use-input dense class="inputs-col" outlined v-model="filter.datatype"
                        :options="typeOfData"
                        option-value="id"
                        option-label="name"
                        :placeholder="!filter.datatype ? 'نوع' : ''"/>
            </div>

            <div class="col">
              <q-input dense v-model="filter.factor" outlined type="text" placeholder="ضریب"/>
            </div>

            <div class="col flex no-wrap">
              <q-select
                class="full-width"
                multiple
                use-input
                dense outlined
                v-model="filter.category"
                :options="typeOfData"
                option-value="id"
                option-label="name"
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
            <span key="name" :props="props" class="input-title">{{ props.rowIndex+1 }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.name }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.code }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.datatype }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.factor }}</span>
          </div>
          <div class="col detail">
            <span key="name" :props="props" class="input-title">{{ props.row.category[0].name }}</span>
          </div>
          <div class="last-col-table">
            <!--            edit-->
            <q-btn @click="showEditDialog(props.row.id)" class="btn-dense" color="white">
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

    <!--   start dialog section-->
    <!--    delete dialog-->
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

    <!--  edit dialog  -->
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
            <q-input dense v-model="edit.name" outlined type="text" placeholder="عنوان"
                     autofocus/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-input dense width="37" v-model="edit.code" outlined type="text"
                     placeholder="کد"/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-select use-input dense class="inputs-col" outlined v-model="edit.datatype"
                      :options="typeOfData"
                      option-value="id"
                      option-label="name"
                      :placeholder="!edit.datatype ? 'نوع' : ''"/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-input dense width="37" v-model="edit.factor" outlined type="text"
                     placeholder="ضریب"/>
          </div>

          <div class="col-4 q-pr-sm q-mb-md">
            <q-select class="full-width" use-input dense outlined v-model="edit.category"
                      :options="categories"
                      option-value="id"
                      option-label="name"
                      :placeholder="!edit.category ? 'دسته‌بندی' : ''"/>
          </div>
        </q-card-section>

        <q-card-actions class="q-pr-lg" align="right">
          <q-btn class="q-px-xl" color="primary" label="ویرایش"
                 :disable="!activeEditButton"
                 @click="editTag"
                 :color="activeEditButton ? 'green-9' : 'primary'"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--   end dialog section-->
  </section>

</template>

<script>
import AccordionMenu from "components/AccordionMenu";
import {api} from "boot/axios";

export default {
  meta: {
    title: 'برنامه‌ریزی و کنترل تولید - تگ plc',
  }, created() {
    this.getTypeOfData();
    this.getCategories();
    this.getTags();
  }
  ,
  components: {AccordionMenu},
  data() {
    return {
      form: {
        name: null,
        code: null,
        datatype: null,
        factor: null,
        category: null
      },
      tableLoading: false,
      typeOfData: [],
      categories: [],
      removeDialog: false,
      deleteItemId: null,
      activeFormButton: false,
      activeEditButton: false,
      editDialog: false,
      pagination: {
        sortBy: null,
        filterString: null,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 2
      },
      table: {
        columns: [
          {name: 'index', label: 'ردیف', align: 'center',},
          {name: 'code', label: 'کد', field: 'code'},
          {name: 'name', label: 'عنوان', field: 'name' , sortable: true},
          {name: 'datatype', label: 'نوع', field: 'datatype'},
          {name: 'factor', label: ' تگ', field: 'factor'},
          {name: 'category', label: 'دسته‌بندی', field: 'category',},
        ],
        data: [
          {
            code: "02",
            datatype: "عدد",
            factor: 1,
            id: 1,
            category:[{name: "درخت تجهیز"}, {name: "کلاس و گروه تجهیز"}]
          },
        ],
      },
      filter: {
        name: null,
        code: null,
        datatype: null,
        factor: null,
        category: null
      },
      edit: {
        name: null,
        code: null,
        datatype: null,
        factor: null,
        category: []
      },
    }
  },
  methods: {
    showEditDialog(id){
      this.editDialog=true;
      let index = this.table.data.findIndex(x => x.id === id);
      let item = this.table.data[index];
      this.edit.name=item.name;
      this.edit.code=item.code;
      this.edit.datatype=item.datatype;
      this.edit.factor=item.factor;
      this.edit.category=item.category[0].name;
    },
    editTag() {
      console.log(this.edit);
    },
    getTypeOfData() {
      api.get('unit-types')
        .then(response => {
          this.typeOfData = response.data.data;
        })
        .catch(error => {
          console.log('error');
        })
    },
    getCategories() {
      api.get('shift/type-of-shift/list')
        .then(response => {
          this.categories = response.data.data;
        })
        .catch(error => {
          console.log('error');
        })
    },
    getTags(){
      api.get('tags')
      .then(response =>{
        console.log(response.data.data);
        this.table.data = response.data.data ;
      }).catch(error =>{

      });
    },
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
      this.tableLoading = true;
      api.post('tags',this.form)
      .then(res =>{

      })
      .catch(error =>{

      });
      this.timer = setTimeout(() => {
        this.tableLoading = false;
        this.$refs.focus.focus();
        this.form.name = null,
          this.form.code = null,
          this.form.datatype = null,
          this.form.catgory = null,
          this.form.factor = null,
          this.$q.notify({
            type: 'positive',
            message: `تگ با موفقیت ثبت شد`
          })
        this.timer = void 0
      }, 1000)

    },
    removeRowTable() {
      let id = Number(this.deleteItemId) - 1
      this.table.data.splice(id, 1)
      this.removeDialog = false;
    },
    removeRow(index) {
      console.log(this.parameterRow.splice(index, 1))
    }
  },
  mounted() {
    this.getTableData({pagination: this.pagination})
  },
  watch: {
    edit: {
      deep: true,
      handler() {
        if (this.edit.datatype && this.edit.category && this.edit.factor && this.edit.code && this.edit.name) {
          return this.activeEditButton = true
        } else {
          return this.activeEditButton = false
        }
      }
    },

    form: {
      deep: true,
      handler() {
        if (this.form.datatype && this.form.category && this.form.factor && this.form.code && this.form.name) {
          return this.activeFormButton = true
        } else {
          return this.activeFormButton = false
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import "src/css/table";

</style>
