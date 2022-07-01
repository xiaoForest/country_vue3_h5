
<template>
  <div class="footerMain"></div>

  <div class="footerInfo" v-if="info.length">
    <p>
      <strong @click="goToPage(1, info[1].name)">{{ info[1].name }}</strong> |
      <strong @click="goToPage(2, info[2].name)">{{ info[2].name }}</strong>
    </p>
    <p v-for="(i, index) in ConfigVal" :key="index">
      {{ i.name }}：{{ i.value }}
    </p>
    <a href="https://beian.miit.gov.cn ">粤ICP备2021045362号</a>
    <a
      href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602010079"
    >
      <img :src="getSrc('registerSystemInfo.png')" alt="" />
      <span>粤公网安备 44010602010079号</span>
    </a>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import getSrc from "@/utils/getSrc";
import { getWebConfig, getWeblink, getChannel } from "@/api/api_index";
const router = useRouter();
const route = useRoute();

onMounted(() => {
  WebConfig();
  Weblink();
  infoChannel();
});
const ConfigVal = ref([]);
const WebConfig = async () => {
  await getWebConfig()
    .then((res) => {
      ConfigVal.value = res.data.data.bottom;
    })
    .catch((err) => {
      console.log(err);
    });
};
const WeblinkVal = ref([]);
const Weblink = async () => {
  await getWeblink()
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};
const info = ref([]);
const infoChannel = async () => {
  await getChannel()
    .then((res) => {
      console.log(res.data.data.bottom);
      info.value = res.data.data.bottom;
    })
    .catch((err) => {
      console.log(err);
    });
};

const goToPage = (i, name) => {
  console.log(i);
  router.push({
    path: "/articleDetails",
    query: {
      id: i,
      channel: 0,
      title: name,
    },
  });
};
</script>


<style lang="scss">
.footerInfo {
  padding: 20px 0;
  font-size: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-bottom: 15px;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 33px;
  }
  a {
    margin-bottom: 15px;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 33px;
    img {
      width: 23px;
      height: 24px;
    }
    span {
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 33px;
    }
  }
}
</style>