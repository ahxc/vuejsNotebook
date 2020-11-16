<template>
<div id="swiper">
  <div class="swiper-main" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <slot></slot>
  </div>
  <div class="indicator">
    <slot name="indicator" v-if="showIndicator && slideCount>1">
      <!-- 展开slidecount个节点 -->
      <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
    </slot>
  </div>
</div>
</template>

<script>
export default {
  name: "Swiper",

  props: {
    // 轮播间隔
    interval: {
      type: Number,
      default: 3000
    },
    // 滚动花费时间
    animDuration: {
      type: Number,
      default: 300
    },
    // 下一张滑动边界
    moveRatio: {
      type: Number,
      default: 0.2
    },
    // 显示指示器
    showIndicator: {
      type: Boolean,
      default: true
    }
  },

  data: function () {
    return {
      slideCount: 0, // 元素个数
      totalWidth: this.$store.state.screenWidth, // swiper的宽度，屏宽
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    }
  },

  // 初始化，开局显示的第一张图1，2，3，4
  mounted: function () {
    setTimeout(() => {
      // 加两张轮播图：4，1，2，3，4，1
      this.handleDom();
      // 开启定时器
      this.startTimer();
    }, 1000)
  },

  methods: {
    /* 开始计时器 */
    startTimer: function () {
      // window.setInterval每隔多少时间执行函数
      // playTimer是父类ppt播放计时器
      this.playTimer = window.setInterval(
        // index负数是为了x轴向左滚动
        () => {this.currentIndex++; this.scrollContent(-this.currentIndex * this.totalWidth)},
        this.interval)
    },

    /* 停止定时器 */
    stopTimer: function () {
      // clearInterval停止指定的setInterval函数
      window.clearInterval(this.playTimer);
    },

    /* 动画滚动操作 */
    scrollContent: function (moveDistance) {
      // 设置正在滚动
      this.scrolling = true;
      // 设置transition样式滚动花费时间，不加transform则所有样式操作为 animDuration ms
      this.swiperStyle.transition = 'transform '+this.animDuration+'ms';
      // 开始滚动动画
      this.setTransform(moveDistance);
      // 判断滚动到的位置
      this.checkPosition();
      // 滚动完成
      this.scrolling = false
    },

    /* 索引检查 */
    checkPosition: function () {
      window.setTimeout(() => {
        // 检查前滚动时间设置为0
        this.swiperStyle.transition = '0ms';
        // 如果索引到达了5，已到达了最后一张图，设置索引为1
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          // 并立即移动到索引1，无动画
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          // 如果索引为0或负数(往右滑动到达的实际第一张索引为0，图像为4)，重置索引为4，
          // 为什么要多此一举，因为左边已无图像，右滑不动
          this.currentIndex = this.slideCount;
          // 并立即移动到索引4，无动画
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        // 子传父，将参数currentIndex-1传给子transitionEnd绑定的函数
        // 这里transitionEnd为父类函数，响应动画滚动结束后的事件
        // this.$emit('transitionEnd', this.currentIndex-1);
      }, this.animDuration)// 等待一个滚动时间执行检查
    },

    /* 设置滚动的位置 */
    // 滚动依赖的是x轴原点，因此滚动距离为索引*屏宽，而1*屏宽动画显示7只滚动一次
    setTransform: function (position) {
      // translate3d(x,y,z)：3d样式div位移函数，xyz移动量，移动一个position宽度
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;// 大部分浏览器
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;//表示对safari的支持
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;// 表示对IE的支持
    },

    /* 操作DOM, 在DOM前后添加Slide */
    handleDom: function () {
      // css选择器获取所有swiperitem节点
      let swiperElements = document.querySelector('#swiper .swiper-main');
      // get获取的是list
      let swiperitem = swiperElements.getElementsByClassName('swiperitem');
      // 获取图片张数作为索引，张数为传过来的初始值
      this.slideCount = swiperitem.length;
      if (this.slideCount > 1) {
        // cloneNode节点克隆方法，传参true则拷贝当前节点外还拷贝其子孙节点，类似深拷贝
        // 获取第一张和最后一张image
        let cloneFirst = swiperitem[0].cloneNode(true);
        let cloneLast = swiperitem[this.slideCount-1].cloneNode(true);
        // 将最后一张的备份插到第一张前面，如果不备份一张，则是插麻将，appendChild同理
        swiperElements.insertBefore(cloneLast, swiperitem[0]);
        swiperElements.appendChild(cloneFirst);
        // 提取swiper节点的样式
        this.swiperStyle = swiperElements.style;
      }
      // 插入两张图后显示的是索引4，因此左移一张显示第一张图，这里左移没移动延迟时间
      this.setTransform(-this.totalWidth);
    },

    /* 触摸事件的开始点保存 */
    touchStart: function (e) {
      // 如果正在滚动, 不可以拖动
      if (this.scrolling) return;
      // 触摸则停止定时器
      this.stopTimer();
      // 记录开始滚动的位置，startX是div距离左上角的横坐标值
      this.startX = e.touches[0].pageX;// e.touches[0].pageX，当前触摸位置的横坐标
    },

    /* 触摸拖拽事件 */
    touchMove: function (e) {
      // 当前拖拽已到达点的横坐标
      this.currentX = e.touches[0].pageX;
      // 计算拖拽的水平距离，负数为往左滚动，负的越多往左滚的越多
      // 因为左上角为原点，往右拖currentX>startX，距离为正，往左托距离为负，currentX<startX，距离为负
      this.distance = this.currentX - this.startX;
      // 计算出当前索引图像已移动的距离，因此是负数(左移)
      let moveDistance = -this.currentIndex * this.totalWidth;
      // 将两者距离合并
      moveDistance = this.distance + moveDistance;
      // 根据拖动距离同步移动元素样式
      this.setTransform(moveDistance);
    },

    /* 拖拽松手事件 */
    touchEnd: function (e) {
      let currentMove = Math.abs(this.distance);
      // 如果只是点了一下，无操作
      if (this.distance === 0) {
        return
      }
      // 如果拖动距离>0，右拖，且绝对距离>屏宽的0.25，则索引-1
      else if (this.distance>0 && currentMove>this.totalWidth*this.moveRatio) {
        this.currentIndex--
      }
      // 如果拖动距离<0，左拖，且绝对距离>屏宽的0.25，则索引+1
      else if (this.distance<0 && currentMove>this.totalWidth*this.moveRatio) { // 向左移动超过0.5
        this.currentIndex++
      }

      // 执行修改后的索引
      this.scrollContent(-this.currentIndex*this.totalWidth);

      // 手工拖拽完毕重设0000定时器
      this.startTimer();
    },

    /* 下面三个函数是pc端上下一张的简单实现 */
    previous: function () {
      this.changeItem(-1);
    },

    next: function () {
      this.changeItem(1);
    },

    changeItem: function (num) {
      // 删除定时器
      this.stopTimer();
      // 修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 新添定时器
      this.startTimer();
    }
  }
}
</script>

<style>
#swiper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.swiper-main {
  display: flex;
  height: 100%;
}

.indicator {
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 8px;
  z-index: 999;
  /* 配合父元素的relative可以不使父元素脱离文档结构 */
  position: absolute;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;/* 添加圆角，值为高宽一办则为圆形 */
  background-color: white;
  text-align: center;
  margin: 0 3px 0 3px;
}

.indi-item.active {
  background-color: black;
}
</style>
