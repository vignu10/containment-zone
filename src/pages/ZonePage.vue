<!-- Page to add Zones -->

<template>
  <div>
    <v-container>
      <v-card class="pa-3">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="4" class="text-left">
                <v-text-field
                  class="mb-3"
                  max-width="40"
                  v-model="searchTable"
                  append-icon="search"
                  label="Search"
                  outlined
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col class="align-self-center text-right">
                <v-row no-gutters>
                  <v-col>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          large
                          @click="getUsers"
                        >
                          refresh
                        </v-icon>
                      </template>
                      <span>Refresh</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="2">
                    <v-menu v-model="showMenu" absolute>
                      <template v-slot:activator="{ on: menu, attrs }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on: tooltip }">
                            <v-btn
                              icon
                              v-bind="attrs"
                              v-on="{ ...tooltip, ...menu }"
                            >
                              <v-icon
                                class="material-symbols-outlined"
                                large
                                color="primary"
                                >filter_alt</v-icon
                              >
                            </v-btn>
                          </template>
                          <span>Filter users</span>
                        </v-tooltip>
                      </template>
                      <v-list style="border: 1px solid grey">
                        <v-list-item @click="filter('All')">
                          <v-list-item-title>All</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="filter('Available')">
                          <v-list-item-title>Available</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="filter('Away')">
                          <v-list-item-title>Away</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="filter('Do not disturb')">
                          <v-list-item-title>Do not disturb</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="filter('In a meeting')">
                          <v-list-item-title>In a meeting</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <v-tooltip bottom v-if="!invisible">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          class="material-symbols-outlined"
                          color="primary"
                          large
                          v-bind="attrs"
                          v-on="on"
                          @click="invisible = true"
                          >visibility</v-icon
                        > </template
                      ><span>Hide device address</span></v-tooltip
                    >
                    <v-tooltip bottom v-if="invisible">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          large
                          v-bind="attrs"
                          v-on="on"
                          class="material-symbols-outlined"
                          color="primary"
                          @click="invisible = false"
                          >visibility_off</v-icon
                        > </template
                      ><span>Unhide device address</span></v-tooltip
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters
              ><v-col>
                <v-data-table
                  :headers="headers"
                  :search="searchTable"
                  :items="filteredObjs"
                  :loading="tableLoading"
                  class="users-table"
                >
                  <template v-slot:[`item.name`]="{ item }">
                    {{
                      item.name != null &&
                      item.name != "" &&
                      item.name != undefined
                        ? item.name
                        : "-"
                    }}
                  </template>
                  <template v-slot:[`item.email`]="{ item }">
                    {{
                      item.email != null &&
                      item.email != "" &&
                      item.email != undefined
                        ? item.email
                        : "-"
                    }}
                  </template>
                  <template v-slot:[`item.phoneNumber`]="{ item }">
                    {{
                      item.phoneNumber != null &&
                      item.phoneNumber != "" &&
                      item.phoneNumber != undefined
                        ? item.phoneNumber
                        : "-"
                    }}
                  </template>
                  <template v-slot:[`item.category`]="{ item }">
                    {{
                      item.category != null &&
                      item.category != "" &&
                      item.category != undefined
                        ? item.category.toString()
                        : "-"
                    }}
                  </template>
                  <template v-slot:[`item.status`]="{ item }">
                    <v-chip :color="getColor(item.status)" text-color="white"
                      >{{ item.status }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.deviceAddress`]="{ item }">
                    <v-row no-gutters>
                      <v-col cols="10">
                        <span v-if="invisible" class="pr-4">********</span>
                        <span v-if="!invisible" class="pr-4">{{
                          item.deviceAddress !== "" &&
                          item.deviceAddress != undefined &&
                          item.deviceAddress != null
                            ? item.deviceAddress
                            : "Device address not available"
                        }}</span>
                      </v-col>
                      <v-col cols="1" class="pa-0 ma-0 align-self-center">
                        <v-edit-dialog
                          large
                          left
                          @open="setDeviceAddress(item)"
                          @save="saveDeviceAddress(item.uid)"
                        >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                class="material-symbols-outlined"
                                color="primary"
                                small
                                v-bind="attrs"
                                v-on="on"
                                >edit</v-icon
                              >
                            </template>
                            <span>Edit or Add Device address</span>
                          </v-tooltip>
                          <template v-slot:input>
                            <p class="mt-5">Enter Device address</p>
                            <v-text-field
                              v-model="deviceAddress"
                              maxlength="20"
                              hide-details="auto"
                            ></v-text-field
                          ></template>
                        </v-edit-dialog>
                      </v-col>
                    </v-row>
                  </template>
                </v-data-table> </v-col
            ></v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { collection } from "firebase/firestore";
import { getDocs, doc, updateDoc } from "firebase/firestore";
import db from "../main";
const pincode = require("pincode-lat-long");
var pincodeDirectory = require("india-pincode-lookup");
export default {
  data() {
    return {
      showMenu: false,
      searchTable: "",
      filteredObjs: [],
      invisible: true,
      tableLoading: false,
      panel: [0],
      isTextFieldDisabled: false,
      rules: {
        required: (value) => !!value || "This Field is Required.",
      },
      showDialog: false,
      deviceAddress: "",
      zoneToBeAdded: {},
      pinCodeLatLong: {},
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      headers: [
        {
          text: "Name",
          value: "userName",
          align: "center",
        },
        {
          text: "Email",
          value: "email",
          align: "center",
        },
        { text: "Phone number", value: "phoneNumber", align: "center" },
        { text: "Status", value: "status", align: "center" },
        { text: "Department", value: "category", align: "center" },
        { text: "Device address", value: "deviceAddress", align: "center" },
      ],
      users: [],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [],
      markerLatLng: [],
      bounds: null,
      currentLatLng: {},
    };
  },
  computed: {
    isSubmitDisabled() {
      if (
        this.zone === "" ||
        this.zone === null ||
        this.state === "" ||
        this.state === null ||
        this.country === "" ||
        this.country === null ||
        this.selectedCL === "" ||
        this.selectedCL === null ||
        this.conlevel === "" ||
        this.conlevel === null
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.getLocation();
    this.getUsers();
  },
  methods: {
    filter(type) {
      this.filteredObjs = this.users;
      switch (type) {
        case "All": {
          this.filteredObjs = this.users;
          break;
        }
        case "Available": {
          this.filteredObjs = this.filteredObjs.filter(
            (a) => a.status == "Available"
          );
          break;
        }
        case "Away": {
          this.filteredObjs = this.filteredObjs.filter(
            (a) => a.status == "Away"
          );
          break;
        }
        case "Do not disturb": {
          this.filteredObjs = this.filteredObjs.filter(
            (a) => a.status == "Do not disturb"
          );
          break;
        }
        case "In a meeting": {
          this.filteredObjs = this.filteredObjs.filter(
            (a) => a.status == "In a meeting"
          );
          break;
        }
        default: {
          this.filteredObjs = this.users;
        }
      }
    },
    getColor(status) {
      switch (status) {
        case "Available": {
          return "#00ff00";
        }
        case "Away": {
          return "yellow";
        }
        case "Do not disturb": {
          return "red";
        }
        case "In a meeting": {
          return "purple";
        }
        case "On leave": {
          return "#66666";
        }
      }
    },
    setDeviceAddress(item) {
      this.deviceAddress = item.deviceAddress;
    },
    async getUsers() {
      this.tableLoading = true;
      const querySnapshot = await getDocs(collection(db.db, "Worker"));
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data());
      });

      this.users = tempArr;
      this.filteredObjs = this.users;
      this.tableLoading = false;
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        <alert>geolocation is not enabled in this browser</alert>;
      }
    },
    showPosition(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      this.currentLatLng = Object.assign({
        lat: lat,
        lng: lng,
      });
      this.center = this.currentLatLng;
      this.markerLatLng = this.currentLatLng;
    },
    getLatLng() {
      var latlng = pincode.getlatlong(this.pincode);
      if (latlng !== null && latlng !== "" && latlng !== undefined) {
        this.pinCodeLatLong = Object.assign({
          lat: latlng.lat,
          lng: latlng.long,
        });
        this.center = this.pinCodeLatLong;
        this.markerLatLng = this.pinCodeLatLong;
        let state = pincodeDirectory.lookup(this.pincode);
        this.state = state[0].stateName;
        this.district = state[0].districtName;
        this.isTextFieldDisabled = true;
      } else {
        this.isTextFieldDisabled = false;
      }
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },

    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    openDialog() {
      this.showDialog = !this.showDialog;

      this.getLocation();
    },
    cancel() {
      this.zone =
        this.country =
        this.state =
        this.pincode =
        this.selectedCL =
          "";
      this.showDialog = false;
    },
    async saveDeviceAddress(uid) {
      try {
        if (
          this.deviceAddress != null &&
          this.deviceAddress != "" &&
          this.deviceAddress != undefined
        ) {
          const docRef = doc(db.db, "Worker", uid);
          let updateData = { deviceAddress: this.deviceAddress };
          updateDoc(docRef, updateData);
          this.getUsers();
        } else {
          throw "Please enter a valid value";
        }

        this.$notify({
          group: "foo",
          type: "success",
          text: `Sucessfully Added device address`,
        });
        this.showDialog = false;
      } catch (e) {
        this.$notify({ group: "foo", type: "error", text: e.message });
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.theme--dark.v-application span
  color: white


.border-radius-root
  border: 1px solid grey !important
</style>
