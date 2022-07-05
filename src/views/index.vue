
<template>
  <!-- <NavBar title="首页" :showL="false" ref="sonRef" /> -->

  <section class="homeWrap">
    <img class="topBanner" :src="getSrc('topBanner.png')" alt="" />
    <div class="navList">
      <div
        class="item"
        v-for="(item, index) in navList"
        :key="index"
        @click="goToPage(item)"
      >
        {{ item.name }}
      </div>
      <van-icon name="search" @click="onSearchPage" />
    </div>
    <div class="swiperOne">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in slideshow"
          :key="index"
          @click="goToPageChange(item)"
        >
          <img :src="imgUrl + item.image" alt="" />
          <div class="info">
            <span>{{ item.title }}</span>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="wrap">
      <HomeList :List="blockList" />

      <div class="swiperThree">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item, index) in bannerList.slice(0, 1)"
            :key="index"
            @click="goToBannerList(item)"
          >
            <img :src="imgUrl + item.image" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="swiperTwo">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            v-for="(item, index) in bannerList.slice(1)"
            :key="index"
            @click="goToBannerList(item)"
          >
            <img :src="imgUrl + item.image" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <HomeList1 :List="blockList1" />
      <HomeList :List="blockList2" />
      <HomeList2 :List="blockList3" />
    </div>
  </section>
  <Footer />
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect, onActivated } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import getSrc from "@/utils/getSrc";
import { getIndexList, getBanner, getChannel, imgUrl } from "@/api/api_index";
import HomeList from "./homeList/homeList.vue";
import HomeList1 from "./homeList/homeList1.vue";
import HomeList2 from "./homeList/homeList2.vue";

const router = useRouter();
const route = useRoute();

import { Toast } from "vant";
const sonRef = ref();
const slideshow = ref([]);
const blockList = ref([]);
const blockList1 = ref([]);
const blockList2 = ref([]);
const blockList3 = ref([]);
const indexList = async () => {
  await getIndexList()
    .then((res) => {
      slideshow.value = res.data.data.slideshow;
      blockList.value = res.data.data.block["top"]["tap"];
      blockList1.value = res.data.data.block["middle_1"];
      blockList2.value = [
        { ...res.data.data.block["middle_2"]["tap"][0] },
        { ...res.data.data.block["bottom"]["tap"][1] },
      ];
      blockList3.value = [
        { ...res.data.data.block["bottom"]["tap"][2] },
        { ...res.data.data.block["bottom"]["tap"][0] },
      ];
    })
    .catch((err) => {
      console.log(err);
    });
};

const bannerList = ref([]);
const indexBanner = async () => {
  await getBanner()
    .then((res) => {
      bannerList.value = res.data.data.banner.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const goToPage = (i) => {
  console.log(i);
  router.push({
    path: "/page",
    query: {
      channel: i.id,
      title: i.name,
    },
  });
};

const goToPageChange = (i) => {
  let id = i.link_url.split("=");
  router.push({
    path: "/details",
    query: {
      id: id[1],
      title: i.name,
    },
  });
};
const goToBannerList = (i) => {
  let id = i.link_url.split("=");
  console.log(id[1]);
  router.push({
    path: "/topicList",
    query: {
      id: id[1],
      title: i.name,
    },
  });
};
onMounted(() => {});
onActivated(() => {
  console.log("缓缓");
  indexList();
  indexBanner();
  navChannel();
});

onBeforeRouteLeave((to, from) => {});
const navList = ref([]);
const navChannel = async () => {
  await getChannel()
    .then((res) => {
      navList.value = res.data.data.top;
    })
    .catch((err) => {
      Toast("显示信息出错");
      console.log(err);
    });
};
const onSearchPage = () => {
  router.push({
    path: "/searchPage",
    query: {},
  });
};
</script>

<style lang="scss">
.homeWrap {
  font-size: 0;
  .topBanner {
    width: 100%;
  }
  .navList {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 72px;
    background: #c10b0b;
    .item {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 1;
    }
    .van-icon {
      font-size: 30px;
      color: #fff;
    }
  }

  .swiperOne {
    border-radius: 10px;
    height: 480px;
    padding: 20px 20px 0;
    margin: auto 0;
    background: linear-gradient(180deg, #fff 0, rgba(255, 255, 255, 0.15) 100%);
    overflow: hidden;
  }
  .swiperTwo {
    border-radius: 0 0 10px 10px;
    padding: 0 20px 20px;
    height: 172px;
    margin: 0 auto 20px;
    background: #fff;
  }
  .swiperThree {
    border-radius: 10px 10px 0 0;
    padding: 20px 20px 0;
    background: #fff;
    margin: 20px auto 0;
    overflow: hidden;
    font-size: 0;
    .my-swipe {
      background: none !important;
      img {
        object-fit: contain !important;
      }
    }
  }
  .my-swipe {
    height: 100%;
    overflow: hidden;
    background: #fff;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 100%;
      width: 100%;
      text-align: center;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .info {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 90px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        z-index: 1;
        text-align: left;
        span {
          display: block;
          width: 680px;
          margin: 0 auto;
          height: 46px;
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 46px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .van-swipe__indicators {
      bottom: 20px;
      .van-swipe__indicator {
        margin: 0 6px;
        width: 14px;
        height: 14px;
      }
    }
  }
}
</style>