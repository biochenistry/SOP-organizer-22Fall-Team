<template>
  <div class="log-in">
    <el-dialog
      v-model="dialogVisible"
      class="dialog-custom"
      width="450px"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <template #title>
        <div class="p1">
          Fill the information below。<span>*</span>filed is required
        </div>
        <!-- <div class="p2">
          Only lab’s student can Signup. If you are lab’s student, please
          contact Dr Stone for verification code.
        </div> -->
      </template>
      <div class="modal-content">
        <div class="modal-body">
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-profile">
              <div class="row g-3 signin-form">
                <div class="col-md-12 box-item">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi bi-envelope"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="E-mail"
                      v-model="params.email"
                      class="form-control"
                      id="validationDefaultUsername"
                      aria-describedby="inputGroupPrepend2"
                    />
                  </div>
                  <span class="star">*</span>
                </div>
                <div class="col-md-12 box-item">
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
                  <span class="star">*</span>
                </div>
                <div class="col-md-12 box-item">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi bi-shield-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      v-model="params.password"
                      class="form-control"
                      id="validationDefaultPassword"
                      aria-describedby="inputGroupPrepend2"
                    />
                  </div>
                  <span class="star">*</span>
                </div>
                <div class="col-md-12 box-item">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi bi-people-fill"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="First Name"
                      v-model="params.firstname"
                      class="form-control"
                      id="validationDefaultFirstName"
                      aria-describedby="inputGroupPrepend2"
                    />
                  </div>
                  <span class="star">*</span>
                </div>
                <div class="col-md-12 box-item">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1">
                      <i class="bi bi-people-fill"></i>
                    </span>
                    <input
                      type="text"
                      placeholder="Last Name"
                      v-model="params.lastname"
                      class="form-control"
                      id="validationDefaultLastName"
                      aria-describedby="inputGroupPrepend2"
                    />
                  </div>
                  <span class="star">*</span>
                </div>
                <div class="col-12 d-grid gap-2">
                  <button class="btn btn-success" @click="submit">
                    Signup
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
import { signup } from "@/api/user";

export default {
  name: "SignUp",
  data() {
    return {
      params: {},
      dialogVisible: true,
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      code: "",
    };
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.$router.push("/");
    },
    msgHandle(str, type = "error") {
      ElMessage({
        showClose: true,
        message: str,
        type: type,
      });
    },
    submit() {
      const { email, username, password, firstname, lastname } = this.params;
      if (!email) {
        this.msgHandle("email can not be empty");
        return;
      }
      let emailreg =
        /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
      if (!emailreg.test(email)) {
        this.msgHandle("email format is incorrect");
        return;
      }
      if (!username) {
        this.msgHandle("username can not be empty");
        return;
      }
      if (!password) {
        this.msgHandle("password can not be empty");
        return;
      }
      let passwordreg = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{0,20}$/;
      if (!passwordreg.test(password)) {
        this.msgHandle(
          "Password must contain uppercase and lowercase letters and numbers"
        );
        return;
      }
      if (!firstname) {
        this.msgHandle("firstname can not be empty");
        return;
      }
      if (!lastname) {
        this.msgHandle("lastname can not be empty");
        return;
      }

      const formData = {
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname,
        email: email,
        is_active: false,
        is_staff: false,
      };
      signup(formData)
        .then((response) => {
          //transfer to log in page
          //   this.$router.push("/log-in");
          console.log(response);
          this.msgHandle("Signup success", "success");
          sessionStorage.removeItem("token");
        })
        .catch((error) => {
          console.log(error);
        });
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
<style lang="scss" scoped>
.box-item {
  position: relative;
}
.star {
  position: absolute;
  right: -4px;
  top: 12px;
  color: #ff0033;
}
.p1 {
  color: #fff;
  font-size: 16px;
  span {
    color: #ff0033;
  }
}
.p2 {
  color: #ff0033;
  font-size: 12px;
}
</style>
