<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      :ellipsis="false"
      background-color="#c8102e"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item :index="!token ? '/' : '/welcome-home'" class="logo">
        Iowa State University
        <span>Dr Stone's Lab - SOP Organizer</span>
      </el-menu-item>
      <div class="flex-grow">
        <!-- <el-menu-item index="111">Home</el-menu-item>
      <el-menu-item index="12">Notice</el-menu-item>
      <el-menu-item index="13">Admin</el-menu-item>
      <el-menu-item index="14">Account</el-menu-item> -->
      </div>
      <el-sub-menu v-if="token" index="2">
        <template #title>{{ userInfo.username }}</template>
        <el-menu-item index="/account">Dashboard</el-menu-item>
        <el-menu-item index="/notice">Notice </el-menu-item>
        <el-menu-item index="/" @click="logout">Log Out</el-menu-item>
      </el-sub-menu>
      <template v-else>
        <el-menu-item index="/login" style="height: 70px">
          <el-button round class="model-btn">Login</el-button>
        </el-menu-item>
        <!-- <el-menu-item index="/signup" style="height: 70px">
          <el-button round class="model-btn">Signup</el-button>
        </el-menu-item> -->
      </template>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
import {
  DetailsView,
  NavigationPane,
  Toolbar,
} from "@syncfusion/ej2-vue-filemanager";
import { Toolbar as DocEditToolbar, Selection, SfdtExport, WordExport} from "@syncfusion/ej2-vue-documenteditor";

import {
  Toolbar as pdfToolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  Annotation,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
} from "@syncfusion/ej2-vue-pdfviewer";
import store from "@/store";
export default {
  name: "App",
  computed: {
    userInfo() {
      return Object.keys(store.state.userInfo).length === 0
        ? {}
        : JSON.parse(store.state.userInfo);
    },
    token() {
      return store.state.token;
    },
  },
  data() {
    return {
      params: {
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
      },
    };
  },
  methods: {
    logout() {
      store.commit("removeToken");
      sessionStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("currentItem");
      this.$store.commit("setUserInfo", "");
    },
    submit() {
      if (!this.params.email) {
        ElMessage.error("email can not be empty");
        return;
      }
      if (!this.params.username) {
        ElMessage.error("username can not be empty");
        return;
      }
      if (!this.params.password) {
        ElMessage.error("password can not be empty");
        return;
      }
      if (!this.params.firstname) {
        ElMessage.error("firstname can not be empty");
        return;
      }
      if (!this.params.lastname) {
        ElMessage.error("lastname can not be empty");
        return;
      }
      let emailreg =
        /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
      if (!emailreg.test(this.params.email)) {
        ElMessage.error("email format is incorrect");
        return;
      }
      let passwordreg = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{0,20}$/;
      if (!passwordreg.test(this.params.password)) {
        ElMessage.error(
          "Password must contain uppercase and lowercase letters and numbers"
        );
        return;
      }
      location.reload();
    },
  },
  beforeCreate() {
    // this.$store.commit('initialiseStore')

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

  provide: {
    filemanager: [DetailsView, NavigationPane, Toolbar],
    DocumentEditorContainer: [DocEditToolbar, SfdtExport, WordExport, Selection],
    PdfViewer: [
      pdfToolbar,
      Magnification,
      Navigation,
      LinkAnnotation,
      BookmarkView,
      Annotation,
      ThumbnailView,
      Print,
      TextSelection,
      TextSearch,
    ],
  },
};
</script>
<!-- <style scoped>
.nav-item {
  line-height: 40px;
}
</style>

<style>

#header {
  color:dimgrey;
}

</style> -->
<style lang="scss" scoped>
.model-btn {
  background-color: rgb(248, 225, 100);
  color: rgb(170, 46, 38);
  font-weight: bold;
  border-color: rgb(248, 225, 100);
}
.nav-item {
  line-height: 40px;
}
::v-deep .el-menu-item {
  font-size: 28px;
  font-weight: bold;
}
::v-deep .el-menu {
  height: 70px;
}
.flex-grow {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
.logo {
  display: flex !important;
  justify-content: flex-start !important;
  flex-direction: column;
  height: 71px !important;
  span {
    line-height: 10px;
    margin-top: -14px;
    font-size: 12px;
  }
}
</style>

<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-icons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-layouts/styles/material.css";
@import "../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-filemanager/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-pdfviewer/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";
</style>
