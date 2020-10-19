<template>
  <div class="swiperitem">
    <div class="images">
      <slot name="image"></slot>
    </div>
    <div class="title">
    <div class="title-text">
      <slot name="title"></slot>
    </div>
    <div class="endnote">
      <div class="views">
        <div class="views-icon">
          <img src="../../../assets/img/common/browse-icon.svg" alt="">
        </div>
        <div class="views-text">
          <slot name="views"></slot>
        </div>
      </div>
      <div class="date">
        <div class="date-icon">
          <img src="../../../assets/img/common/clock-icon.svg" alt="">
        </div>
        <div class="date-text">
          <slot name="date"></slot>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
	export default {
    name: "SwiperItem",
    methods: {
      itemclick() {
         
      }
    }
	}
</script>

<style>


.swiperitem {
  height: 100%;
  width: 100%;
  flex-shrink: 0;
}

.images {
  width: 100%;
  height: 100%;
}

.title {
  height: 40%;
  width: 100%;
  z-index: 999;
  bottom: 5px;
  justify-content: center;
  color: white;
}
</style>