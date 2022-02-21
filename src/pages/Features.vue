<template>
  <q-page class="flex">

    <q-page-container class="container container" style="padding-right: 62px !important">

      <div class="features">
        <p class="title">مشخصات</p>
        <q-expansion-item v-model="expanded">
          <template v-slot:header>

            <q-item-section>
              در این بخش می‌توانید مشخصات را وارد کنید
            </q-item-section>

            <q-item-section side>
              <div class="row items-center">
                <q-btn v-if="!expanded" class="btn-boxShadow" outline style="color: #089562" label="افزودن"/>
                <q-btn v-else flat label="بستن"/>
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div class="q-pa-md">
                <q-form
                  @submit="onSubmit"
                  class="q-gutter-md"
                >
                  <div class="q-gutter-sm items-end inputs-form row ">
                    <div class="col">
                      <span class="input-title">عنوان</span>
                      <q-input dense v-model="featuresInputData.title" outlined type="text" placeholder="عنوان"/>
                    </div>

                    <div class="col">
                      <span class="input-title">کد</span>
                      <q-input dense width="37" v-model="featuresInputData.title" outlined type="text"
                               placeholder="کد"/>
                    </div>

                    <div class="col">
                      <span class="input-title">نوع</span>
                      <q-select use-input dense class="inputs-col" outlined v-model="featuresInputData.type"
                                :options="options"
                                placeholder="نوع"/>
                    </div>

                    <div class="col">
                      <span class="input-title">تگ</span>
                      <q-select use-input dense outlined v-model="featuresInputData.title" :options="options"
                                placeholder="تگ"/>
                    </div>

                    <div class="col">
                      <span class="input-title">دسته‌بندی</span>
                      <q-select use-input dense outlined v-model="featuresInputData.title" :options="options"
                                placeholder="دسته‌بندی"/>
                    </div>

                    <div>
                      <q-btn label="افزودن" type="submit" color="primary"/>
                    </div>
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

    </q-page-container>

  </q-page>

</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      expanded: false,
      featuresInputData: {
        title: null,
        code: null,
        type: null,
        tag: null,
        category: null
      },
      options: [
        'a', 'b', 'c'
      ]
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>
