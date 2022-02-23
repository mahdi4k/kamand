<template>
  <div class="accordion">
    <p class="title">{{ headerTitle }}</p>
    <q-expansion-item class="q-pt-none"  v-model="expanded">
      <template  v-slot:header>

        <div class="full-width flex" @click='$emit("add-button-clicked")'>
          <q-item-section>
            {{ accordionTitle }}
          </q-item-section>

          <q-item-section  side>
            <div class="row items-center">
              <q-btn  v-if="!expanded" class="btn-boxShadow" outline style="color: #089562" label="افزودن"/>
              <q-btn v-else flat label="بستن"/>
            </div>
          </q-item-section>
        </div>
      </template>

      <q-card>
        <q-card-section>
          <div class="q-pa-md">
            <slot></slot>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  name: "AccordionMenu",
  props: ['headerTitle', 'accordionTitle'],
  data() {
    return {
      expanded: false,
    }
  },
  methods : {

  }
}
</script>

<style scoped>

</style>
