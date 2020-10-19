<template>
<div class="find-swiper">
  <Swiper>
    <!-- 若干swiperitem，不加key引警告  -->
    <SwiperItem v-for="(item, index) in RotationItems" :key=index>
      <img class="images" slot="image" :src="item.cover_url" alt="">
      <div slot="title">{{item.title}}</div>
      <div slot="views">{{item.views}}</div>
      <div slot="date">{{item.released_timestamp | timestampToTime}}</div>
    </SwiperItem>
  </Swiper>
</div>
</template>

<script>
  import SwiperItem from "../../../components/common/swiper/SwiperItem"
  import Swiper from "../../../components/common/swiper/Swiper"
  import {timestampToTime} from "../../../utils/utils"

  export default {
    name: "FindSwiper",
    props: {
      RotationItems: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    filters: {
      timestampToTime(timestamp) {
        return timestampToTime(timestamp)
      }
    }
  }
</script>

<style>
.find-swiper {
  width: 100%;
  height: 250px;
}
</style>