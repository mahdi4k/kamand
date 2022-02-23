<template>
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
  data(){
    return{
      type:null,
      options:['a','b','c']
    }
  },
  methods:{
    onSubmit(){

    }
  }
}
</script>

<style scoped>

</style>
