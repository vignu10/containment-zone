"use strict";(self["webpackChunkcontainment_zone"]=self["webpackChunkcontainment_zone"]||[]).push([[423],{7423:function(t,e,s){s.r(e),s.d(e,{default:function(){return P}});var i=s(8232),o=s(266),a=s(2118),r=s(6579),n=s(4263),l=s(7678);function h(t,e=[]){return(0,l.Z)((0,n.d)(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty(){return t}},watch:{app(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated(){this.callUpdate()},created(){for(let t=0,s=e.length;t<s;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted(){this.callUpdate()},deactivated(){this.removeApplication()},destroyed(){this.removeApplication()},methods:{callUpdate(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication(t=!1){(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:()=>0}})}var p=s(144),c=p["default"].extend({name:"ssr-bootable",data:()=>({isBooted:!1}),mounted(){window.requestAnimationFrame((()=>{this.$el.setAttribute("data-booted","true"),this.isBooted=!0}))}}),u=s(5352),d=(0,l.Z)(r.Z,h("footer",["height","inset"]),c).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty(){return this.inset?"insetFooter":"footer"},classes(){return{...r.Z.options.computed.classes.call(this),"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset}},computedBottom(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned(){return Boolean(this.absolute||this.fixed||this.app)},styles(){const t=parseInt(this.height);return{...r.Z.options.computed.styles.call(this),height:isNaN(t)?t:(0,u.kb)(t),left:(0,u.kb)(this.computedLeft),right:(0,u.kb)(this.computedRight),bottom:(0,u.kb)(this.computedBottom)}}},methods:{updateApplication(){const t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render(t){const e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}}),f=s(1713),g=s(6878),m=s(6669),y=(0,l.Z)(h("bar",["height","window"]),g.Z,m.Z).extend({name:"v-system-bar",props:{height:[Number,String],lightsOut:Boolean,window:Boolean},computed:{classes(){return{"v-system-bar--lights-out":this.lightsOut,"v-system-bar--absolute":this.absolute,"v-system-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-system-bar--window":this.window,...this.themeClasses}},computedHeight(){return this.height?isNaN(parseInt(this.height))?this.height:parseInt(this.height):this.window?32:24},styles(){return{height:(0,u.kb)(this.computedHeight)}}},methods:{updateApplication(){return this.$el?this.$el.clientHeight:this.computedHeight}},render(t){const e={staticClass:"v-system-bar",class:this.classes,style:this.styles,on:this.$listeners};return t("div",this.setBackgroundColor(this.color,e),(0,u.z9)(this))}}),v=function(){var t=this,e=t._self._c;return e("div",[e(y,{attrs:{height:"50",color:"primary",window:""}},[e(f.Z,{attrs:{"no-gutters":""}},[e(o.Z,{staticClass:"text-left align-self-center white--text"},[e("header",[e("b",[t._v(" Containment Zone ")])])]),e(o.Z,{staticClass:"text-right",attrs:{cols:"5"}},[e(o.Z,[e(i.Z,{attrs:{color:"secondary",depressed:"",outlined:""},on:{click:t.signOut}},[t._v(" LOGOUT")])],1)],1)],1)],1),e(a.Z,{attrs:{fluid:"","pa-0":""}},[e("router-view")],1),e(d,{staticClass:"pa-0",attrs:{absolute:""}},[e(f.Z,{attrs:{justify:"center","no-gutters":""}},[e(o.Z,{staticClass:"primary py-4 text-center white--text",attrs:{cols:"12"}},[t._v(" "+t._s((new Date).getFullYear())+" — "),e("strong",[t._v("Containment Zone")])]),e("notifications",{attrs:{group:"foo","animation-type":"velocity"}})],1)],1)],1)},b=[],w=s(7969),Z={data(){return{}},methods:{signOut(){const t=(0,w.v0)();(0,w.w7)(t).then((()=>{this.$notify({group:"foo",type:"success",text:"Sucessfully Signed out"}),this.$router.replace("/home/login")})).catch((t=>{this.$notify({group:"foo",type:"error",text:t.message})}))}}},$=Z,x=s(4223),C=(0,x.Z)($,v,b,!1,null,null,null),P=C.exports},9582:function(){},2118:function(t,e,s){s.d(e,{Z:function(){return r}});s(9582),s(7320);var i=s(144);function o(t){return i["default"].extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:s,data:i,children:o}){i.staticClass=`${t} ${i.staticClass||""}`.trim();const{attrs:a}=i;if(a){i.attrs={};const t=Object.keys(a).filter((t=>{if("slot"===t)return!1;const e=a[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));t.length&&(i.staticClass+=` ${t.join(" ")}`)}return s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),e(s.tag,i,o)}})}var a=s(1767),r=o("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:s,children:i}){let o;const{attrs:r}=s;return r&&(s.attrs={},o=Object.keys(r).filter((t=>{if("slot"===t)return!1;const e=r[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}))),e.id&&(s.domProps=s.domProps||{},s.domProps.id=e.id),t(e.tag,(0,a.ZP)(s,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(o||[])}),i)}})}}]);
//# sourceMappingURL=423.ee2d7ca8.js.map