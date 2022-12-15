
<template>
     
      <div id="app">
      <ejs-documenteditorcontainer 
        ref="documenteditor"
        :serviceUrl="documentEditorServiceUrl"
        height="calc(100vh - 142px)"
        id="container"
        :enableToolbar="!!token"
        :enableSfdtExport='true' 
        :enableWordExport='true' 
        :enableSelection='true' 
        :isReadOnly='false' 
      ></ejs-documenteditorcontainer>
    </div>
  </template>
      <script>
      import store from "@/store";
  export default {
    data() {
      return {
        //documentEditorServiceUrl:
          //"https://ej2services.syncfusion.com/production/web-services/api/documenteditor/",
  
           documentEditorServiceUrl: "http://localhost:6002/api/documenteditor",
      };
    },
    methods: {
      onWindowResize: function () {
        //Resizes the document editor component to fit full browser window automatically whenever the browser resized.
        this.updateDocumentEditorSize();
      },
      updateDocumentEditorSize: function () {
        let windowWidth = window.innerWidth;
        let windowHeight ='calc(100vh - 142px)';
        this.$refs.documenteditor.ej2Instances.resize(windowWidth, windowHeight);
      },
     
    },
  
    created() {
      setInterval(() => {
        this.updateDocumentEditorSize();
      }, 100);
      //Adds event listener for browser window resize event.
      window.addEventListener("resize", this.onWindowResize.bind(this));
    },
    // mounted() {
    //   http.send(JSON.stringify(sfdt));
    // },
    computed: {
    token() {
      return store.state.token;
    },
  },
  };
  </script>
      <style>
  @import "../../../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";
  @import '../../../node_modules/@syncfusion/ej2-base/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
  @import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';

 
   
  </style>