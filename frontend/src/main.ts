import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import { FileManagerPlugin } from "@syncfusion/ej2-vue-filemanager";
import { registerLicense } from '@syncfusion/ej2-base';
import { PdfViewerPlugin } from '@syncfusion/ej2-vue-pdfviewer';
import {
    DocumentEditorContainerPlugin,
    Toolbar as DocEditToolbar
  } from "@syncfusion/ej2-vue-documenteditor";
  import { TabPlugin } from "@syncfusion/ej2-vue-navigations";


axios.defaults.baseURL = 'http://127.0.0.1:8000'

registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0RiWn9Yc3VVT2ZZUEc=');
createApp(App).use(store).use(router, axios).use(ElementPlus).use(FileManagerPlugin).use(PdfViewerPlugin).use(DocumentEditorContainerPlugin).use(TabPlugin).mount('#app')
