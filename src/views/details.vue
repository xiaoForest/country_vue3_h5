
<template>
  <NavBar ref="sonRef" title="广东乡村振兴" :showR="false" />
  <section class="detailWrap">
    <div class="title" v-html="detail.title"></div>
    <span class="lien"></span>
    <div class="info">
      来源：{{ detail.source }} |
      {{ dayjs(detail.createtime * 1000).format("YYYY-MM-DD HH:mm:ss") }}
    </div>
    <div class="detailsBox" v-html="detail.content"></div>
  </section>
  <Footer />
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import getSrc from "@/utils/getSrc";
import { getNewsDetail } from "@/api/api_news";
import dayjs from "dayjs";
const router = useRouter();
const route = useRoute();

import { Toast } from "vant";
const sonRef = ref();
const goToPage = () => {
  Toast("开发中");
};
const detail = ref([]);
const NewsDetail = async () => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });
  await getNewsDetail(route.query.id)
    .then((res) => {
      console.log(res);
      detail.value = res.data.data.detail;
    })
    .catch((err) => {
      Toast("显示信息出错");
      console.log(err);
    });
};
onMounted(() => {
  NewsDetail();
});
</script>

<style lang="scss">
.detailWrap {
  padding: 50px;
  background: #fff;
  .title {
    font-size: 44px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #292929;
    line-height: 62px;
    margin-bottom: 20px;
    text-align: justify;
  }
  .lien {
    display: block;
    width: 110px;
    height: 12px;
    background: #c10b0b;
    margin-bottom: 30px;
  }
  .info {
    height: 32px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #98999a;
    line-height: 32px;
  }
  .detailsBox {
    img {
      max-width: 100%;
      height: auto;
    }
    video {
      max-width: 100%;
      height: auto;
    }
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #434343;
    line-height: 56px;
    text-align: justify;
  }
}
</style>