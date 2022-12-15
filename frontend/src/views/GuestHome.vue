<template>
  <div class="home">
    <Sidebar :isGuest="!0" />
    <div id="container">
      <ejs-tab ref="tab1" id="ej2Tab">
        <div class="e-tab-header">
          <div>Files</div>
          <div>View</div>
        </div>
        <div class="e-content">
          <div >
            <ejs-filemanager 
              :fileOpen="fileOpen"
              id="overview_file"
              :ajaxSettings="ajaxSettings"
              :view="view"
              :height="'calc(100vh - 107px)'"
              :uploadSettings="uploadSettings"
              :toolbarSettings="token?'':toolbarSettings"
              :contextMenuSettings="token?'':contextMenuSettings"
            ></ejs-filemanager>
          </div>
          <div id="viewer_panel">
            <div id="header"></div>
            <ejs-tab ref="tab2" id="ej2Tab">
              <div class="e-tab-header">
                <div>Docx</div>
                <div>PdfViewer</div>
              </div>
              <div class="e-content">
                <div id="editor">
                  <!-- <ejs-documenteditorcontainer
                    id="container_1"
                    ref="doceditcontainer"
                    height="calc(100vh - 107px)"
                    :serviceUrl="documentEditorServiceUrl"
                  >
                  </ejs-documenteditorcontainer> -->
                  <div class="control-section">
      
      <div v-if="token" class="sample-container">
          <div class="default-section">
            <div ref="de_titlebar" id="documenteditor_titlebar" class="e-de-ctn-title">
            <div>
              <label v-on:blur="titleBarBlurEvent" id="documenteditor_title_name" :style="titileStyle" >{{documentName}}</label>
              <el-button type="save"  style=" margin-top: 6px"  @click="save">Save</el-button>        </div>    
          </div>
          </div>
          </div>
         </div>
                  <WordView
                    height="calc(100vh - 107px)"
                    ref="doceditcontainer"
                  />
                </div>
                <div>
                  <PdfView ref="pdfviewer" />
                </div>
              </div>
            </ejs-tab>
          </div>
        </div>
      </ejs-tab>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import Sidebar from "../components/Sidebar";
import PdfView from "./tool/PdfView.vue";
import WordView from "./tool/WordView.vue";
import { FileManagerComponent } from "@syncfusion/ej2-vue-filemanager";
import { DocumentEditorContainerComponent,SfdtExport, WordExport} from "@syncfusion/ej2-vue-documenteditor";
import { FileManagerPlugin, DetailsView, NavigationPane, Toolbar } from "@syncfusion/ej2-vue-filemanager";
var viewer;
var hostUrl = "http://localhost:8090/";
var path = '';
export default {
  name: "Home",
  data() {
    return {
      userInfo: {},
      ajaxSettings: {
        url: hostUrl,
        getImageUrl: "http://localhost:8090/GetImage",
        uploadUrl: "http://localhost:8090/Upload",
        downloadUrl: "http://localhost:8090/Download",
      },
      toolbarSettings: { items: ['Sortby', 'Refresh', 'View', 'Details','Download'], visible: true},
      toolbarSigninSettings: { items: ['Newfolder', 'Upload', 'Sortby', 'Refresh', 'View', 'Details','Download'], visible: true},

      contextMenuSettings: { file: ['Open', '|', 'Details','|','Download'], folder: ['Open', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Details', '|'], visible: true},
      uploadSettings: {
        allowedExtensions: ".docx,.doc,.txt,.pdf",
        minFileSize: 0,
        maxFileSize: 100000000,
      },

      view: "Details",
    };
  },
  components: {
    "ejs-filemanager": FileManagerComponent,
    "ejs-documenteditorcontainer": DocumentEditorContainerComponent,
    Sidebar,
    PdfView,
    WordView,
  },
  mounted() {
    console.log(this.$refs.tab1.ej2Instances.selectingID);
    this.$nextTick(function () {
      if (this.$refs.documenteditor) {
        this.$refs.documenteditor.resize();
      }
    });
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userInfo);
  },
  
  methods: {
    fileOpen: function (args) {
      console.log(args)
      if (
        args.fileDetails.name.indexOf(".pdf") > -1 ||
        args.fileDetails.name.indexOf(".pptx") > -1
      ) {
        // alert(args.fileDetails.name);
        viewer = this.$refs.pdfviewer.$refs.views.ej2Instances;
        this.$refs.tab1.select(1);
        this.$refs.tab2.select(1);
        var path = args.fileDetails.filterPath + args.fileDetails.name;
        viewer.load(path.substr(1), null);
      } else if (
        args.fileDetails.name.indexOf(".docx") > -1 ||
        args.fileDetails.name.indexOf(".doc") > -1
      ) {
        var fileName = args.fileDetails.filterPath + args.fileDetails.name;
        path = fileName;
        var httpRequest = new XMLHttpRequest();
        httpRequest.open(
          "POST",
          "http://localhost:6002/api/documenteditor/LoadDocument",
          true
        );
        httpRequest.onreadystatechange = () => {
          if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.staus === 304) {
              this.$refs.doceditcontainer.$refs.documenteditor.ej2Instances.documentEditor.open(
                httpRequest.responseText
              );
            }
          }
        };
        var formData = new FormData();
        formData.append("DocumentName", fileName.substr(1));
        httpRequest.send(formData);

        this.$refs.tab1.select(1);
        this.$refs.tab2.select(0);
      }
    },
    save:function(){
        this.$refs.doceditcontainer.$refs.documenteditor.ej2Instances.documentEditor.save('sample', 'Docx');
        let http = new XMLHttpRequest();
        http.open('POST', 'http://localhost:6002/api/documenteditor/Save'); 
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.responseType = 'json';
        let path = this.$refs.doceditcontainer.$refs.documenteditor.ej2Instances.documentEditor.documentName + '.docx';
        let sfdt = this.$refs.doceditcontainer.$refs.documenteditor.ej2Instances.documentEditor.serialize();
        let data ={
          content: sfdt,
          fileName: "SOP.docx",
          // fileName: path.substr(1)
        }
        // console.log(fileName)
        console.log(data)
        http.send(JSON.stringify(data));
      },
  },
  provide: {
            //Inject require modules.
            DocumentEditorContainer : [SfdtExport, WordExport, Selection],
            filemanager: [DetailsView, NavigationPane, Toolbar]
  },
  computed: {
    token() {
      return store.state.token;
    },
  },
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-icons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-layouts/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-filemanager/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css";

#documenteditor_titlebar {
        height: 42px;
        line-height: 26px;
        width: 100%;
        font-size: 12px;
        padding-left: 15px;
        padding-right: 10px;
        font-family: inherit;
    }

     [contenteditable="true"].single-line {
        white-space: nowrap;
        border-color: #e4e4e4 !important;
    }
</style>
