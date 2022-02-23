<template>
      <AccordionMenu
        headerTitle="مشخصات"
        accordionTitle="در این بخش می‌توانید مشخصات را وارد کنید"
        @add-button-clicked="focusInput()"
      >
        <slot>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
          >
            <div class="q-gutter-sm items-end inputs-form row ">
              <div class="col">
                <span class="input-title">عنوان</span>
                <q-input ref="focus" dense v-model="featuresInputData.title" outlined type="text" placeholder="عنوان"/>
              </div>

              <div class="col">
                <span class="input-title">کد</span>
                <q-input dense width="37" v-model="featuresInputData.code" outlined type="text"
                          placeholder="کد"/>
              </div>

              <div class="col">
                <span class="input-title">نوع</span>
                <q-select use-input dense class="inputs-col" outlined v-model="featuresInputData.type"
                          :options="options"
                          :placeholder="!featuresInputData.type ? 'نوع' : ''"/>
              </div>

              <div class="col">
                <span class="input-title">تگ</span>
                <q-select use-input dense outlined v-model="featuresInputData.tag" :options="options"
                          :placeholder="!featuresInputData.tag ? 'تگ' : ''"/>
              </div>

              <div class="col">
                <span class="input-title">دسته‌بندی</span>
                <q-select use-input dense outlined v-model="featuresInputData.category" :options="options"
                          :placeholder="!featuresInputData.category ? 'دسته‌بندی' : ''"/>
              </div>

              <div>
                <q-btn label="افزودن" type="submit" color="primary"/>
              </div>
            </div>
          </q-form>
        </slot>
      </AccordionMenu>

</template>

<script>
import AccordionMenu from "components/AccordionMenu";

export default {
  name: 'Features',
  meta: {
    // sets document title
    title: 'برنامه‌ریزی و کنترل تولید - مشخصه‌‌ها',

  },
  components: {AccordionMenu},
  data() {
    return {
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

    },
    focusInput(){

      setTimeout(() => {

        this.$refs.focus.focus()
      }, 100)

    }
  }
}
</script>
