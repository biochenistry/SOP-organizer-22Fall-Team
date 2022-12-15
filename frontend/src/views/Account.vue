<template>
  <div class="common-layout">
    <el-container>
      <div class="info-left">
        <h1 style="text-align: left">Hi, {{ currentItem.first_name }}!</h1>
        <ul>
          <li>First Name:</li>
          <li>
            <b>{{ currentItem.first_name }}</b>
          </li>
          <li>Last Name:</li>
          <li>
            <b>{{ currentItem.last_name }}</b>
          </li>
          <li>
            Email:
            <P> Current Email Address </P>
          </li>
          <li>
            <b>{{ currentItem.email }}</b>
          </li>
          <li>
            User Name:
            <P> Change by clicking the button on the right</P>
          </li>
          <li>
            <b>{{ currentItem.username }}</b>
            <P @click="changeInfo('username')">
              <el-button type="primary">Change Username</el-button></P
            >
          </li>
          <li>
            Password
            <P>Change by clicking the button on the right</P>
          </li>
          <li>
            <p @click="changeInfo('password')">
              <el-button type="primary">Change Password</el-button>
            </p>
          </li>
          <template v-if="currentItem.is_superuser">
            <li>
              Generate Code
              <P>Click right button to give users authorization codes </P>
            </li>
            <li>
              <el-button type="primary" @click="changeInfo('code')"
                >Generate code</el-button
              >
            </li>
          </template>
        </ul>
      </div>
    </el-container>
    <el-dialog width="500px" v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="form">
        <template v-if="modifyType === 'code'">
          <el-form-item label="new user" label-width="140px">
            <el-select v-model="form.val" placeholder="please select">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.first_name + ' ' + item.last_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <button >Generate</button> -->
            <span
              style="
                display: inline-block;
                width: 140px;
                text-align: right;
                padding-right: 12px;
              "
            >
              <el-button slot="label" type="primary" @click="generateCode"
                >Generate</el-button
              ></span
            >
            <span>{{ code }}</span>
          </el-form-item>
          <div></div>
        </template>
        <template v-else>
          <el-form-item
            :label="modifyType === 'password' ? 'Old password' : ''"
            :label-width="modifyType === 'password' ? '140px' : '0'"
          >
            <el-input
              :type="modifyType === 'password' ? 'password' : 'text'"
              v-model="form.val"
              autocomplete="off"
              :show-password="modifyType === 'password'"
            />
          </el-form-item>
          <el-form-item
            v-if="modifyType === 'password'"
            label="New password"
            label-width="140px"
          >
            <el-input
              type="password"
              v-model="form.newPassword"
              autocomplete="off"
              show-password
            />
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="alterUserInfo"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { updateInfo, updatepassword } from "@/api/user";
import { PostCode } from "@/api/others";
export default {
  data() {
    return {
      currentItem: {},
      dialogFormVisible: false,
      form: {
        val: "",
        newPassword: "",
      },
      dialogTitle: "",
      modifyType: "",
      code: "",
      options: {},
    };
  },
  mounted() {
    this.currentItem = JSON.parse(localStorage.getItem("currentItem"));
    this.options = JSON.parse(localStorage.getItem("users"));
  },
  methods: {
    generateCode() {
      let array = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let ind = Math.floor(Math.random() * 3) + 6; // 6到8位
      let list = [];
      let len = array.length;
      for (let i = 0; i < ind; i++) {
        list.push(array[Math.floor(Math.random() * len)]);
      }
      this.code = list.join("");
      // this.postCode();
    },
    async postCode() {
      let formDatas = new FormData();
      formDatas.append("code", this.code);
      let res = await PostCode(formDatas);
      console.log(res);
    },
    msgHandle(str, type = "error") {
      ElMessage({
        showClose: true,
        message: str,
        type: type,
      });
    },
    changeInfo(type) {
      this.modifyType = type;
      switch (type) {
        case "username":
          this.form.val = this.currentItem.username;
          break;
        case "code":
          this.form.val = "";
          this.code = "";
          break;
        default:
          this.form.val = "";
          this.form.newPassword = "";
          break;
      }
      this.dialogTitle = `Generate ${type}`;
      this.dialogFormVisible = true;
    },
    async addUserCode() {
      if (!this.form.val) {
        this.msgHandle(`please select User!`);
        return;
      }
      if (!this.code) {
        this.msgHandle(`please generate code !`);
        return;
      }
      let currentItem = this.options.find((e) => e.id === this.form.val);
      currentItem.code = this.code;
      let formdata = new FormData();
      for (let v in currentItem) {
        formdata.append(v, currentItem[v]);
      }
      let {email} = await updateInfo(currentItem.id, formdata);
      if (email) {
        this.$message.success(`generate code success !`);
      } else {
        this.$message.error(message || `generate code failed !`);
      }
    },
    async alterUserInfo() {
      if (this.modifyType === "code") {
        this.addUserCode();
        return;
      }
      let params = { ...this.currentItem };
      params[this.modifyType] = this.form.val;
      let formdata = new FormData();
      for (let v in params) {
        formdata.append(v, params[v]);
      }
      let res = null;
      if (this.modifyType === "password") {
        if (!this.form.val || !this.form.newPassword) {
          this.msgHandle("password can not be empty");
          return;
        }
        let passwordreg = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{0,20}$/;
        if (
          !passwordreg.test(this.form.val) ||
          !passwordreg.test(this.form.newPassword)
        ) {
          this.msgHandle(
            "Password must contain uppercase and lowercase letters and numbers"
          );
          return;
        }
        formdata.append("newpassword", this.form.newPassword);
        res = await updatepassword(formdata);
      } else {
        if (!this.form.val) {
          this.msgHandle("username can not be empty");
          return;
        }
        res = await updateInfo(this.currentItem.id, formdata);
      }
      let { code, message } = res;
      if (code === 0) {
        this.$message.success(`modify ${this.modifyType} success !`);
        if (this.modifyType === "password") {
          sessionStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          localStorage.removeItem("currentItem");
          this.$store.commit("setUserInfo", "");
          location.href = "/welcome-home";
        } else {
          this.currentItem[this.modifyType] = params[this.modifyType];
          localStorage.setItem("currentItem", JSON.stringify(this.currentItem));
          this.$store.commit("setUserInfo", JSON.stringify(this.currentItem));
          this.dialogFormVisible = false;
        }
      } else {
        this.$message.error(message || `modify ${this.modifyType} failed !`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.common-layout {
  height: calc(100vh - 72px);
  background: #e5e5e5;
  padding: 24px;
}
::v-deep .el-header {
  margin-bottom: 30px;
  background: #fff;
  text-align: center;
  border-radius: 8px;
  line-height: 60px;
  font-size: 24px;
}
::v-deep .el-container {
  justify-content: space-between;
}
.info-left {
  width: 100%;
  padding: 16px;
  background: #fff;
  border-radius: 8px;

  max-width: 1200px;
  margin: 0 auto;
  h1 {
    padding-left: 2rem;
    margin-bottom: 30px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      list-style: none;
      font-size: 24px;
      line-height: 29px;
      text-align: center;
      margin-bottom: 30px;
      p {
        margin-bottom: 0;
        font-size: 12px;
        font-weight: normal;
        padding: 0 145px;
        color: #999;
      }
    }
  }
}
.info-left span {
  float: right;
  padding-right: 40px;
  color: red;
  cursor: pointer;
}
.info-right {
  display: flex;
  align-items: center;
}
</style>
