<template>
  <div class="notice">
    <el-table
    :data="tableData"
    style="width: 100%; margin-top: 10px">
    <el-table-column property="date" label="Date" align="center"></el-table-column>
    <el-table-column property="time" label="Time" align="center"></el-table-column>
    <el-table-column property="message" label="Message"  align="center" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
import { ElTable } from 'element-plus';

export default {
  name: 'notice',
  data() {
    return {
      noticeList: [],
      tableData: [],
    };
  },

  name: 'userInfo',
  infoData() {
    return {
      userInfo: [],
    };
  },

  created() {
    this.getData();
  },

  mounted(){
    this.userInfo = JSON.parse(localStorage.getItem("currentItem"));
  },

  
  methods: {
    getData() {
      axios
        .get("http://127.0.0.1:8000/notices/")
            .then((response) => {
              this.noticeList = response.data;
              console.log('data', this.noticeList);
              console.log('result', this.tableData);
              for(let i = 0; i < this.noticeList.length; i++){
                if(this.noticeList[i].recipient == this.userInfo.id){
                  this.tableData.push({
                    date: this.noticeList[i].timestamp.split('T')[0],
                    time: this.noticeList[i].timestamp.split('T')[1].split('.')[0],
                    message: this.noticeList[i].verb,
                  });
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table {
  width: 100%;
  margin-bottom: 5px;
  background-color: #ffffff;
  // color: #f1be48;
  font-size: 15px;
  text-align: center;
}

.notice {
  height: calc(100vh - 72px);
  background: #e5e5e5;
  padding: 24px;
}

</style>

  

      

