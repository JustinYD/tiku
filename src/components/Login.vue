<template>
  <div id="login">
    <van-row type="flex" justify="center">
      <van-col class="loginBox" span="20">
        <van-form @submit="onSubmit">
          <van-field
            v-model="phone"
            name="phone"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <van-field
            v-model="pwd"
            type="password"
            name="pwd"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              color="linear-gradient(to right, #4bb0ff, #6149f6)"
              native-type="submit"
            >登录</van-button>
          </div>
        </van-form>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import qs from "qs";
import { Toast } from "vant";
export default {
  data() {
    return {
      phone: "",
      pwd: ""
    };
  },
  methods: {
    onSubmit(values) {
      var that = this;
      that.$http
        .post("/tiku_login", qs.stringify(values))
        .then(res => {
          if (res.data == "ok") {
            Toast("登录成功！");
            sessionStorage.setItem("token", values.phone);
            if (values.phone=='15187464876') {
              that.$router.push({path: '/add'});
            } else {
              that.$router.push({path: '/home'});
            }
          } else {
            Toast("账号或密码错误，请联系管理员！");
          }
        })
        .catch(error => {
          Toast("登录失败！");
        });
    }
  }
};
</script>
<style  scoped>
#login {
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  background-image: linear-gradient(to bottom right, #8bffff, #8f71ff);
}
.loginBox {
  margin-top: 7rem;
  padding: 20px;
  border: white 2px solid;
  border-radius: 15px;
  background-color: white;
}
</style>
