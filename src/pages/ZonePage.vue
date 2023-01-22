<!-- Page to add Zones -->

<template>
  <div>
    <v-container>
      <v-card>
        <v-card-text class="mb-2"
          ><v-row
            ><span class="black--text font-weight-bold">Containment Zone</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openDialog"
              >Add Containment Zone</v-btn
            ></v-row
          ></v-card-text
        >
        <v-card>
          <v-data-table :headers="headers" :items="zones"></v-data-table>
        </v-card>
      </v-card>
    </v-container>

    <v-dialog v-model="showDialog" max-width="60%">
      <v-form ref="zones"
        ><v-card
          ><v-card-title>Add Contaiment Zones</v-card-title
          ><v-divider></v-divider
          ><v-card-actions
            ><v-container
              ><v-row no-gutters>
                <v-col cols="12">
                  <v-expansion-panels class="ml-0 mb-7" multiple v-model="panel"
                    ><v-expansion-panel
                      ><v-expansion-panel-header class="pl-0"
                        ><span
                          >Show on map <span class="red--text"> *</span></span
                        ></v-expansion-panel-header
                      ><v-expansion-panel-content
                        ><l-map
                          style="height: 350px"
                          :zoom="zoom"
                          :center="center"
                          @update:zoom="zoomUpdated"
                          @update:bounds="boundsUpdated"
                        >
                          <l-tile-layer
                            :url="url"
                            :attribution="attribution"
                          ></l-tile-layer>
                          <l-marker
                            :lat-lng="markerLatLng"
                          ></l-marker> </l-map></v-expansion-panel-content></v-expansion-panel
                  ></v-expansion-panels>
                </v-col> </v-row
              ><v-row no-gutters>
                <v-col cols="2" class="text-left mb-6 align-self-center"
                  ><span
                    >Zone Name <span class="red--text"> *</span></span
                  ></v-col
                >
                <v-col cols="10"
                  ><v-text-field
                    outlined
                    v-model="zone"
                    :rules="[rules.required]"
                  ></v-text-field
                ></v-col> </v-row
              ><v-row no-gutters>
                <v-col cols="2" class="text-left mb-6 align-self-center"
                  ><span>Pincode <span class="red--text"> *</span></span></v-col
                >
                <v-col cols="10"
                  ><v-text-field
                    outlined
                    v-model="pincode"
                    @keyup="getLatLng()"
                    :rules="[rules.required]"
                  ></v-text-field
                ></v-col> </v-row
              ><v-row no-gutters>
                <v-col cols="2" class="text-left mb-6 align-self-center"
                  ><span>Country <span class="red--text"> *</span></span></v-col
                >
                <v-col cols="10"
                  ><v-text-field
                    outlined
                    v-model="country"
                    :disabled="isTextFieldDisabled"
                  >
                  </v-text-field
                ></v-col> </v-row
              ><v-row no-gutters>
                <v-col cols="2" class="text-left mb-6 align-self-center"
                  ><span>State <span class="red--text"> *</span></span></v-col
                >
                <v-col cols="10"
                  ><v-text-field
                    outlined
                    v-model="state"
                    :disabled="isTextFieldDisabled"
                  ></v-text-field
                ></v-col> </v-row
              ><v-row no-gutters>
                <v-col cols="2" class="text-left mb-6 align-self-center"
                  ><span
                    >District <span class="red--text"> *</span></span
                  ></v-col
                >
                <v-col cols="10"
                  ><v-text-field
                    outlined
                    v-model="district"
                    :disabled="isTextFieldDisabled"
                  >
                  </v-text-field
                ></v-col> </v-row
              ><v-row no-gutters>
                <v-col cols="2" class="text-left mb-6 align-self-center"
                  ><span
                    >Containment Level<span class="red--text"> *</span></span
                  ></v-col
                >
                <v-col cols="10"
                  ><v-select
                    outlined
                    :items="containmentLevel"
                    v-model="selectedCL"
                  ></v-select
                ></v-col>
              </v-row>
              <v-row>
                <v-col class="text-right">
                  <v-btn class="pa-3 mr-2 text-right" @click="cancel"
                    >Cancel</v-btn
                  >
                  <v-btn
                    class="pa-3"
                    color="primary"
                    @click="addZone"
                    :disabled="isSubmitDisabled"
                    >Submit</v-btn
                  ></v-col
                ></v-row
              ></v-container
            >
          </v-card-actions></v-card
        ></v-form
      ></v-dialog
    >
  </div>
</template>
<script>
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import db from "../main";
const pincode = require("pincode-lat-long");
var pincodeDirectory = require("india-pincode-lookup");
export default {
  data() {
    return {
      panel: [0],
      isTextFieldDisabled: false,
      rules: {
        required: (value) => !!value || "This Field is Required.",
      },
      zone: "",
      country: "India",
      state: "",
      pincode: "",
      district: "",
      containmentLevel: ["HIGH", "MEDIUM", "LOW"],
      selectedCL: "",
      showDialog: false,
      zoneToBeAdded: {},
      pinCodeLatLong: {},
      headers: [
        {
          text: "Contaiment Zone",
          value: "zone",
        },
        {
          text: "Country",
          value: "country",
        },
        { text: "State", value: "state" },
        { text: "Area", value: "district" },
        { text: "Containment level", value: "conlevel" },
      ],
      zones: [],
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
    this.getZones();
  },
  methods: {
    async getZones() {
      const querySnapshot = await getDocs(collection(db.db, "zones"));
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push(doc.data());
      });
      this.zones = tempArr;
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
    async addZone() {
      let zoneObj = {
        zone: this.zone,
        country: this.country,
        state: this.state,
        district: this.district,
        pincode: this.pincode,
        conlevel: this.selectedCL,
      };
      try {
        await addDoc(collection(db.db, "zones"), zoneObj);
        this.$notify({
          group: "foo",
          type: "success",
          text: `Sucessfully Added zone ${this.zone}`,
        });
        this.showDialog = false;
        this.getZones();
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
</style>
