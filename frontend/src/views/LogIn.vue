<template>
  <div class="log-in">
    <el-dialog
      v-model="dialogVisible"
      title="Please Login To Continue"
      width="450px"
      class="dialog-custom"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <div class="modal-content">
        <div class="modal-body">
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home">
              <div class="row g-3 signin-form" @submit.prevent>
                <div class="col-md-12">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Username"
                      v-model="params.username"
                      class="form-control"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi bi-shield-lock-fill"></i>
                    </span>
                    <input
                      type="Password"
                      v-model="params.password"
                      placeholder="password"
                      class="form-control"
                      id="validationDefaultPassword"
                      aria-describedby="inputGroupPrepend2"
                      @keyup.enter="submit"
                    />
                  </div>
                </div>
                <div class="col-md-12 box-item">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi bi-people-fill"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Identification Code"
                      v-model="params.code"
                      class="form-control"
                      id="validationCode"
                      aria-describedby="inputGroupPrepend3"
                    />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="params.remember"
                        id="flexCheckDefault"
                        style="margin-right: 10px"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                    <div class="col-md-6" style="text-align: right">
                      <a href="/signup">Create Account</a>
                    </div>
                  </div>
                </div>
                <div class="col-12 d-grid gap-2">
                  <button class="btn btn-success" @click="submit">
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
// import axios from "axios";
import { Login, getMeInfo } from "@/api/user";

export default {
  name: "LogIn",
  data() {
    return {
      params: {
        username: "",
        password: "",
        remember: false,
        code:''
      },
      dialogVisible: true,
      password: "",
      username: "",
    };
  },
  mounted() {
    this.setInfo();
  },
  methods: {
    // dialogVisible
    closeDialog(){
      this.dialogVisible = false;
      this.$router.push('/');
    },
    setInfo() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo && userInfo.remember) {
        this.params = {
          username: userInfo.username,
          password: userInfo.password,
          remember: true,
          code: userInfo.code,
        };
      }
    },
    msgHandle(str, type = "error") {
      ElMessage({
        showClose: true,
        message: str,
        type: type,
      });
    },
    submit() {
      const { username, password, remember ,code} = this.params;
      if (!username) {
        this.msgHandle("username can not be empty");
        return;
      }
      if (!password) {
        this.msgHandle("password can not be empty");
        return;
      }
      
      if (!code) {
        this.msgHandle("verification code can not be empty");
        return;
      }
      const formData = {
        username: username,
        password: password,
        code:code,
      };
      Login(formData)
        .then((response) => {
          const token = response.auth_token;
          this.$store.commit("setToken", token);
          sessionStorage.setItem("token", token);
          this.msgHandle("Sign in success", "success");
          localStorage.setItem("userInfo", JSON.stringify(this.params));
          this.getMeInfos(formData.username); 
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getMeInfos(name) {
      let res = await getMeInfo();
      localStorage.setItem('users',JSON.stringify(res));
      let currentItem = res.find(e=>e.username===name)===-1?res.find(e=>e.email===name):res.find(e=>e.username===name)
      localStorage.setItem('currentItem',JSON.stringify(currentItem))
      this.$store.commit("setUserInfo", JSON.stringify(currentItem));
      this.$router.push("/welcome-home");
    },
  },
};
</script>
<style scoped>
::v-deep .dialog-custom {
  background-color: rgb(33, 41, 54) !important;
}
::v-deep .el-dialog__title {
  color: #fff !important;
}
::v-deep .btn-success {
  background-color: rgb(202, 58, 49) !important;
  border-color: rgb(202, 58, 49) !important;
  outline: none !important;
}
</style>
