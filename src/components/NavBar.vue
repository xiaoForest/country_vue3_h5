
<template>
  <div class="navbar">
    <div class="boxes l">
      <van-icon v-if="showL" name="arrow-left" @click="getBack(goBack)" />
    </div>
    <div>
      <h2>{{ title }}</h2>
    </div>
    <div class="boxes r">
      <van-icon name="search" v-if="showR" />
    </div>
  </div>
  <div class="emptyNavbar"></div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";

import localStorageEx from "../utils/localStorageEx.js";
const router = useRouter();
const route = useRoute();
const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  showR: {
    type: Boolean,
    default: true,
  },
  showL: {
    type: Boolean,
    default: true,
  },
  actions: {
    type: Array,
    default: [],
  },
  goBack: { type: String, default: "" },
});
const showPopover = ref(false);
const actions = props.actions;

const emit = defineEmits(["childClick"]);

const onSelect = (action) => {
  console.log(action);
  if (action.text == "重新加载") {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0,
    });
  }

  emit("childClick", action);
};

onMounted(() => {});
const getBack = (i) => {
  console.log(i);
  if (i == "") {
    router.go(-1);
  } else {
    router.push({
      path: i,
      query: {
        // id: item.id,
      },
    });
  }
};
defineExpose({
  actions,
});
</script>


<style lang="scss">
.emptyNavbar {
  height: 90px;
}
.navbar {
  position: fixed;
  width: 100%;
  background: #fff;
  height: 90px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  box-shadow: inset 0px -1px 0px 0px #e3e6e7;

  .boxes {
    height: 100%;
    padding: 0 15px;
    width: 100px;
    display: flex;
    align-content: center;
    &.r {
      justify-content: flex-end;
      text-align: right;
    }
    i {
      font-size: 48px;
      color: #333;

      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  h2 {
    text-align: center;
    width: 550px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>