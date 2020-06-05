<template>
  <div class="home">
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="volume-o">{{msg}}</van-notice-bar>
    <!-- <van-divider :style="{ color: '#66c6f2', borderColor: '#66c6f2', padding: '0 16px' }">{{msg}}</van-divider> -->
    <img class="addBox" src="../assets/add.png" @click="addbtn" />
    <form action="/">
      <van-search
        shape="round"
        background="#fff"
        v-model="value"
        placeholder="请输入搜索关键词"
        input-align="center"
        @search="onSearch"
      />
    </form>
    <van-row v-if="dataList.length==0">
      <van-empty
        class="custom-image"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
        description="请输入题目"
      />
    </van-row>
    <van-row v-else>
      <van-row type="flex" justify="center" v-for="item in dataList" :key="item.title">
        <van-col class="answerBox" span="22">
          <van-divider :style="{ color: '#fff', borderColor: '#fff' }">题目</van-divider>
          <span>{{item.title}}</span>
          <van-divider :style="{ color: '#fff', borderColor: '#fff'}">答案</van-divider>
          <span>{{item.answer}}</span>
        </van-col>
      </van-row>
    </van-row>
    <van-popup
      v-model="flag"
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-form @submit="onSubmit" style="margin-top:60px">
        <van-field
          v-model="title"
          name="title"
          label="题目"
          placeholder="请输入题目"
          :rules="[{ required: true, message: '请填写题目' }]"
        />
        <van-field
          v-model="answer"
          name="answer"
          label="答案"
          placeholder="请输入答案"
          :rules="[{ required: true, message: '请填写答案' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" color="linear-gradient(to right, #4bb0ff, #6149f6)" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import qs from 'qs'
import { Toast } from "vant";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      msg:"",
      value: "",
      flag: false,
      title:'',
      answer:'',
      dataList: []
    };
  },
  methods: {
    onSubmit(values) {
      var that=this
      that.$http
        .post("/tiku_add",qs.stringify(values))
        .then(res => {
          if (res.data=='ok') {
            Toast("添加成功！")
            that.getcount()
            that.title=that.answer=''
          } else {
            Toast("添加失败！")
          }
        })
        .catch(error => {
          Toast("添加失败！稍后再试！")
        });
    },
    onSearch(val) {
      
      var that=this
      if (val=='') {
        that.dataList=[]
      } else {
        Toast("查询中...")
        that.$http
        .post("/tiku_get",qs.stringify({title:val}))
        .then(res => {
          that.dataList=[]
          that.value=''
          if (res.data=='fail') {
            Toast("查无记录！")
              
          } else {
            for(let i=0;i<res.data.length;i++){
                that.dataList.push({title:res.data[i][0],answer:res.data[i][1]})
              }
          }
        })
        .catch(error => {
          Toast("查询失败！")
        });
      }
      
    },
    onCancel() {
      Toast("取消");
    },
    addbtn() {
      this.flag = true;
    },
    getcount() {
      var that=this
      that.$http
        .get("/tiku_getcount")
        .then(res => {
          that.msg='题库数量有'+res.data[0][0]+'道，如遇到卡顿，刷新即可！'
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created(){
    this.getcount();
  },
  destroyed(){
    sessionStorage.removeItem('token');
  }
};
</script>
<style scoped>
.answerBox {
  background: #66c6f2;
  color: white;
  padding: 5px;
  margin: 10px 0;
  border-radius: 5px;
}
.answerBox span {
  font-size: 18px;
}
.addBox {
  width: 3rem;
  height: 3rem;
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  background: white;
  border-radius: 40px;
}
</style>
