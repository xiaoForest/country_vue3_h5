# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


// https://segmentfault.com/a/1190000041488793
https://juejin.cn/post/7009282373476941831#heading-17

const router = useRouter();
// const goToPage = () => {
//   router.push({
//     path: "/page",
//   });
// };# epidemic-vue3
http://jsdawn.gitee.io/vue3-tinymce/


https://codepen.io/ahmedhrayyan/pen/GLBELM



接口模板
import { getVaccinationListMine } from "@/api/api_vaccination.js";
const NoDilivery = async () => {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });
  await getMissionNoDilivery()
    .then((res) => {})
    .catch((err) => {
      Toast("显示信息出错");
      console.log(err);
    });
};

存储功能模板
import localStorageEx from "../utils/localStorageEx.js";
  localStorageEx.saveLocalObject("currentAreaText", locationText.value);
    locationText.value = localStorageEx.getLocalObject("currentAreaText");# country_vue3_h5
