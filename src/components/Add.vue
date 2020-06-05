<template>
  <div id="add">
    <van-divider :style="{ color: '#fff', borderColor: '#fff', padding: '0 16px' }">{{msg}}</van-divider>
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
            >添加</van-button>
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
      pwd: "",
      msg:''
    };
  },
  methods: {
    onSubmit(values) {
      var that = this;
      that.$http
        .post("/tiku_useradd", qs.stringify(values))
        .then(res => {
          if (res.data == "ok") {
            Toast("添加成功！");
            that.getusercount()
            that.phone=that.pwd=''
          } else {
            Toast("添加失败！");
          }
        })
        .catch(error => {
          Toast("网络错误！");
        });
    },
    getusercount() {
      var that=this
      that.$http
        .get("/tiku_getusercount")
        .then(res => {
          that.msg='当前用户有'+res.data[0][0]+'位！'
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created(){
    this.getusercount();
  }
};
</script>
<style  scoped>
#add {
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
