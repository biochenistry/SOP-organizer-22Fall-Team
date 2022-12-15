
<template>
  <div id="app">
    <ejs-pdfviewer
      id="pdfViewer"
      ref="views"
      height="calc(100vh - 142px)"
      :serviceUrl="serviceUrl"
      :documentPath="documentPath"
      :enableNavigation="true"
    >
    </ejs-pdfviewer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      //serviceUrl:
        //"https://ej2services.syncfusion.com/production/web-services/api/pdfviewer",
      //documentPath: "PDF_Succinctly.pdf",
       serviceUrl: "http://localhost:6001/api/PdfViewer"
    };
  },
};
</script>

<style>
#pdfViewer_toolbarItemsContainer{
  height: 56px;
}
.e-pv-viewer-main-container,#pdfViewer_sideBarToolbar {
  top: 56px !important;
}
.e-toolbar.e-control#pdfViewer_toolbarContainer {
  position: fixed;
  top: 142px;
  width: 100%;
  z-index: 999;
}
.e-pv-page-div {
  left: 50% !important;
  transform: translateX(-50%);
}
  @import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
  @import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';  
  @import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-vue-pdfviewer/styles/material.css';
</style>