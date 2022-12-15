<template>
  <div>
    <!-- <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3">
          <div
            id="sidebar-container"
            class="sidebar-expanded d-none d-md-block border-end border-5"
          >
            <transition name="fade">
              <div style="text-align:center">
                <i class="bi bi-search" v-show="!showSearch" @click="()=>showSearch=true"></i>
                <div class="folder-search" v-show="showSearch" @mouseleave="()=>showSearch=false">
                  <input
                    type="text"
                    v-model="keywords"
                    @keyup.enter="searchFolder"
                  />
                  <i class="bi bi-search" @click="searchFolder"></i>
                </div>
              </div>
            </transition>
            <ul
              v-for="(folder, index) in folders"
              class="list-group"
              :key="index"
            >
              <SidebarItem
                @viewPDF="changePDF"
                :folder="folder"
                :item="index"
              />
            </ul>
            <div class="add-btn" v-if="!isGuest">
              <button
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#FolderModal"
              >
                Add Folder
              </button>
              <router-link to="/file-upload">Add File</router-link>
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <div class="container">
            <object width="90%" type="application/pdf" :data="PDFurl"></object>
            <div>
              <select>
                <option id="selected">Select Version</option>
                <option>Version 1</option>
                <option>Version 2</option>
                <option>Version 3</option>
                <option>Version 4</option>
                <option>Version 5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" id="FolderModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Folder</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p><input v-model="folderName" placeholder="Unnamed Folder" /></p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="createFolder()"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div> -->

    <div>
      <div class="modal fade" id="FileModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="fileModalLabel">
                Please select a file to be uploaded
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <select v-model="folder" id="folder" name="folders" ref="folder">
                <option
                  v-for="(folderx, ind) in folders"
                  :key="ind"
                  :value="folderx.name"
                >
                  {{ folderx.name }}
                </option>
              </select>
              <input v-model="fileName" />
              <input
                type="file"
                id="myFile"
                @change="uploadFile()"
                ref="file"
              />
              <button @click="addPDF()">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getFiles } from "@/api/others";
import SidebarItem from "./SidebarItem.vue";
export default {
  name: "Sidebar",
  props:{
    isGuest:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      showSearch:false,
      folders: [],
      PDFname: "",
      file: null,
      folder: "",
      fileName: "",
      folderName: "",
      keywords: "",
    };
  },
  mounted() {
    this.get_Folders();
  },
  methods: {
    async searchFolder() {
      this.folders = [];
      let res = await getFiles({
        file_name:this.keywords
      })
      if(res&&res.length>0){
        this.folders = res;
      }
    },
    get_Folders() {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/folders/",
      }).then((response) => (this.folders = response.data));
    },
    changePDF(url) {
      console.log(url)
      this.PDFname = url;
    },
    uploadFile() {
      this.file = this.$refs.file.files[0];
    },
    addPDF() {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("folder", this.folder);
      formData.append("fileName", this.fileName);
      const headers = { "Content-Type": "multipart/form-data" };
      axios
        .post("http://127.0.0.1:8000/upload", formData, { headers })
        .then((res) => {
          res.data.files; // binary representation of the file
          res.status; // HTTP status
        });
    },
    createFolder() {
      const formData = new FormData();
      formData.append("name", this.folderName);
      const headers = { "Content-Type": "application/json" };
      axios
        .post("http://127.0.0.1:8000/createFolder", formData, { headers })
        .then((res) => {
          res.status; // HTTP status
        });
    },
  },
  computed: {
    PDFurl() {
      if (this.PDFname != "") {
        return this.PDFname.substring(0, 19) + "8" + this.PDFname.substring(20);
      }

      return "";
    },
  },
  components: { SidebarItem },
};
</script>

<style lang="scss" scoped>
.fade-leave {
    opacity: 1
}
.fade-leave-active {
    transition: all 1s;
}
.fade-leave-to {
    opcaity: 0
}

.add-btn {
  display: flex;
  justify-content: space-around;
  padding: 30px 20px;
  align-items: center;
}
i.bi-search {
  font-size: 36px;
  cursor: pointer;
}
.folder-search {
  position: relative;
  padding: 20px 30px 20px 20px;
  i.bi-search {
    position: absolute;
    font-size: 24px;
    right: 45px;
    top: 22px;
    cursor: pointer;
  }
  input {
    width: 100%;
    line-height: 40px;
    font-size: 18px;
    border-radius: 20px;
    padding: 0 60px 0 10px;
  }
}
.row {
  margin-left: 0px;
}
.container {
  height: 100vh;
}

object {
  display: block;
  height: 90%;
}

#sidebar-container {
  border-color: #e3f2fd !important;
}

#body-row {
  margin-left: 0;
  margin-right: 0;
}
#sidebar-container {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0;
}

/* Sidebar sizes when expanded and expanded */
.sidebar-expanded {
  width: 300px;
}
.sidebar-collapsed {
  width: 60px;
}

/* Menu item*/
#sidebar-container .list-group a {
  height: 50px;
  color: dodgerblue;
}

/* Submenu item*/
#sidebar-container .list-group .sidebar-submenu a {
  height: 45px;
  padding-left: 30px;
}
.sidebar-submenu {
  font-size: 0.9rem;
}

/* Separators */
.sidebar-separator-title {
  background-color: #ffffff;
  height: 35px;
}
.sidebar-separator {
  background-color: #ffffff;
  height: 25px;
}
.logo-separator {
  background-color: #ffffff;
  height: 60px;
}

/* Closed submenu icon */
#sidebar-container
  .list-group
  .list-group-item[aria-expanded="false"]
  .submenu-icon::after {
  content: ">";
  display: inline;
  text-align: right;
  padding-left: 10px;
}
/* Opened submenu icon */
#sidebar-container
  .list-group
  .list-group-item[aria-expanded="true"]
  .submenu-icon::after {
  content: "-";
  display: inline;
  text-align: right;
  padding-left: 10px;
}
</style>