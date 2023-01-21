<template>
  <v-footer app color="primary lighten-1" padless class="footerMain">
    <v-row justify="center" no-gutters>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Containment Zone</strong>
      </v-col>
      <notifications group="foo" animation-type="velocity"/>
    </v-row>

  </v-footer>
</template>
