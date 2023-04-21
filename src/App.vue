<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
.loginCard {
  margin: 10rem auto;
  max-width: 45rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  align-items: center;
  justify-content: center;
}
</style>
<style lang="sass">
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td
  border-right: thin solid rgba(0, 0, 0, 0.12)
  padding: 0px 6px
.theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td
  color: white !important
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td
  color: black !important
.theme--dark.v-data-table > .v-data-table__wrapper > table > thead > tr > th
  background-color: black !important
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:first-child, .v-data-table > .v-data-table__wrapper > table > thead > tr > td:first-child .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td:first-child
  border-left: thin solid rgba(0, 0, 0, 0.12)
  padding: 0px 6px
.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child > td
  border-bottom: thin solid rgba(0, 0, 0, 0.12)
.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th
  border-bottom: thin solid rgba(0, 0, 0, 0.12)
  border-right: thin solid rgba(0, 0, 0, 0.12)
  border-top: thin solid rgba(0, 0, 0, 0.12)
.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th:first-child
  border-left: thin solid rgba(0, 0, 0, 0.12)
.v-data-table > .v-data-table__wrapper > table > thead > tr > th
  color: rgba(0, 0, 0, 0.6)
  font-size: 13px !important
  font-weight: 500
  color: black !important
  background: #E0E0E0 !important
  letter-spacing: 1px
// .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active), .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-icon, .theme--dark.v-tabs > .v-tabs-bar .v-tab:not(.v-tab--active) > .v-btn, .theme--dark.v-tabs > .v-tabs-bar .v-tab--disabled
//   color: black !important
.theme--dark.v-data-table > .v-data-table__wrapper > table > thead > tr > th
  color: white !important
.v-data-table .v-data-table-header th.sortable.active .v-data-table-header__icon
  color: #0288D1 !important
.no-border-table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td
  border: 0px !important
.no-border-header-table.v-data-table > .v-data-table__wrapper > table > thead > tr > th
  border: 0px !important
  // background: none !important
// .theme--dark.v-btn
//   color: black !important
</style>
