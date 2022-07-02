
<template>
  <NavBar :title="title" ref="sonRef" :showR="false" goBack="/" />

  <!-- <div class="searchBox mt20">
    <van-icon name="search" />
    <input
      type="text"
      v-model="params.keyword"
      placeholder="输入姓名，电话查找"
      @input="changeInput(params.keyword)"
    />
    <div class="text r_case blue tdu" @click="onSearch(params.keyword)">
      搜索
    </div>
  </div> -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="newsUlWrap">
        <li
          class="items"
          v-for="(item, index) in list"
          :key="index"
          @click="goToPage(item)"
        >
          <span class="title">{{ item.title }}</span>
          <span class="time">{{ item.updatetime }}</span>
        </li>
      </ul>
    </van-list>
  </van-pull-refresh>
 
</template>
<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
import { getNewsBlock, getNewsIndex } from "@/api/api_news.js";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { Toast } from "vant";
const props = defineProps({
  Currently: {
    type: Number,
    default: 1,
  },
  List: {
    type: Array,
    default: [],
  },
});
const title = ref(route.query.title);
const params = ref({
  keyword: "",
  page: -1,
  pagesize: 20,
  channel: route.query.channel,
  subcategory: route.query.subcategory,
});
const appointmentQuery = async () => {
  await getNewsIndex(params.value)
    .then((res) => {
      let items = res.data.data.list.data;
      list.value = [...list.value, ...items];
      loading.value = false;

      if (items.length == 0) {
        finished.value = true;
      } else {
        finished.value = false;
      }
    })
    .catch((err) => {
      Toast("显示信息出错");
      console.log(err);
    });
};
onMounted(() => {});
const goToPage = (i) => {
  console.log(i);
  router.push({
    path: "/details",
    query: {
      id: i.id,
      channel: route.query.channel,
      subcategory: route.query.subcategory,
      title: route.query.title,
    },
  });
};
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  params.value["page"] += 1;
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    appointmentQuery(params.value, true);
  }, 1000);
};

const onSearch = (val) => {
  list.value = [];
  onRefresh();
};
const changeInput = (val) => {};
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  params.value["page"] = -1;
  loading.value = true;
  onLoad();
};

const onChange = () => {
  Toast("开发中");
};
</script>

<style lang="scss">
</style>