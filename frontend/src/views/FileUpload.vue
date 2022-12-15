<template>
  <!-- <div>
    <h>File Upload</h>
    <br/>
    <label for="folder">Folder:</label>
    <input type="text" id="folder" name="folder" v-model="fileData.folder">
    <label for="fileName">File Name:</label>
    <input type="text" id="fileName" name="fileName" v-model="fileData.file_name">
    <el-upload
      ref="upload"
      drag
      class="upload-file"
      action="http://127.0.0.1:8000/createFile/"
      :data="fileData"
      :auto-upload="false"
      :on-success="onSuccess"
      style="padding: 30px"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :limit="1"
      :on-exceed="handleExceed"
      :on-error="onError"
    >
    <i class="el-icon-upload" />
    <div class="el-upload__text">Drag File here or <em>Click to Upload</em></div>
    </el-upload>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Upload</el-button>
  </div> -->

</template>

<script>
// import axios from 'axios'

// export default {
//   components: {
//       axios
//   },
//   data() {
//     return {
//       fileData: {
//         isUpload: false,
//         file_name: "",
//         folder: "",
//       }
//     }
//   },

//   methods: {
//     beforeUpload(file) {
//       let fileName = file.name.split('.')
//       let hz = fileName.pop()
//       this.file_name = fileName.pop()
//       if (hz != 'docx' && hz != 'doc' && hz != 'pdf') {
//         this.$message.error(`Only Select docx/doc File`)
//         return false
//       }
//       let fileSize = file.size / 1024 / 1024 < 50
//       // let fileSize = file.size / 1024 / 1024 < 0.5
//       if (!fileSize) {
//         this.$message.error('Upload file size cannot exceed 50MB!')
//         return false
//       }
//       this.isUpload = true
//     },
//     handleExceed(files, fileList) {
//       this.$message.warning(`Current limit: 1. At most 1 file can be uploaded.`)
//     },
//     submitUpload() {
//       if (this.isUpload == false){
//         this.$message.error("Please Check your file")
//         return false
//       } else {
//         this.$refs.upload.submit()
//         return true
//       }
//     },
//     onSuccess() {
//       this.$message.success('Upload Success')
//     },
//     onError() {
//       this.$message.error("File Already Exist, Please Change File Name Or Check Your File")
//     },
//   }
// }

// </script>

// <style scoped>

</style>