<style lang="less" scoped>

  .previewvideo__video.mousedown {
    pointer-events: none;
  }
</style>
<template>
  <transition name="window__modal">
    <dialog-base
      v-show="inner_visibile"
      @mousedown="mousedown=true"
      @mouseup="mousedown=false"
      @close="close"
      title="插入视频"
    >
      <div class="video__wrap">
        <div class="video__input-box">
          <input v-model="inner_videoUrl" placeholder="粘贴视频地址并键入回车，目前支持优酷、腾讯视频、搜狐视频的视频链接">
        </div>
        <div class="video__body">
          <div class="previewvideo__msg">
            <div v-if="!inner_videoUrl"><img src="./icon/video_cover.svg"/></div>
            <span v-else-if="notSupport" class="previewvideo__msg-tps-text">不支持或地址错误</span>
            <div v-else :style="`position:relative;height:${height}px;width:${width}px;overflow:hidden`">
              <div class="previewvideo__msg">
                <span class="previewvideo__msg-tps-text">正在检测中...</span>
              </div>
              <div class="previewvideo__video" :class="mousedown?'mousedown':''">
                <iframe
                  style="margin:auto;display:block"
                  :id="iframeId"
                  :name="iframeId"
                  :src="iframeUrl"
                  :width="width"
                  :height="height"
                  frameBorder="none"
                  ref="edui-faked-video"
                />
                <div style="display:none" ref="video-wrap-box">
                  <p style="text-align: center">
                    <embed
                      type="application/x-shockwave-flash"
                      class="edui-faked-video"
                      pluginspage="http://www.macromedia.com/go/getflashplayer"
                      :src="flashUrl"
                      :width="width"
                      :height="height"
                      wmode="transparent"
                      play="true"
                      loop="false"
                      menu="false"
                      allowscriptaccess="never"
                      allowfullscreen="true"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="video__footer">
          <div class="video__btn video__cansel" @click="close">取消</div>
          <div id="video__btn-check-wrap" class="video__btn" :class="`video__${status}`" @click="InsertVideo(status)">
            <span class="video__btn-text">确认</span>
            <img src="./icon/rotation_show.svg"/>
          </div>
        </div>
      </div>
    </dialog-base>
  </transition>
</template>
<script>
  import mixins from './mixins'
  import {
    convertUrlToFlash,
    convertUrlToIframe,
    unhtmlForUrl
  } from './tools'

  export default {
    mixins: [mixins],
    props: {
      videoUrl: {
        type: String,
        default: ''//https://v.qq.com/x/cover/61fm5aaqrv18skf/h0025gp4zf2.html'
      }
    },
    data() {
      return {
        inner_videoUrl: this.videoUrl,
        notSupport: false,
        status: 'cansel',
        flashUrl: '',
        iframeUrl: '',
        window: window,
        width: 640,
        height: 350,
        iframeId: String('id' + Math.random()).replace('.', ''),
        mousedown: false
      }
    },
    watch: {
      videoUrl(newVal) {
        this.$changeVideoUrl(newVal)
      },
      inner_videoUrl(newVal) {
        this.$changeVideoUrl(newVal)
      }
    },
    mounted() {
      this.inner_videoUrl &&
      this.$changeVideoUrl(this.inner_videoUrl)
    },
    methods: {
      $changeVideoUrl(newVal) {
        this.notSupport = false
        this.flashUrl = convertUrlToFlash(newVal)
        this.iframeUrl = convertUrlToIframe(newVal)
        if (!this.flashUrl || !this.iframeUrl) {
          this.notSupport = true
          this.status = 'cansel'
          return
        }
        this.inner_videoUrl = newVal
        this.status = 'check'
        setTimeout(() => {
          this.status = 'ok'
        }, 3000)
      },
      InsertVideo(status) {
        if (status == 'ok' || status == 'check') {
          var html = this.$refs['video-wrap-box'].innerHTML
          this.$emit('insert:html', html)
          this.close()
        } else {

        }
      }
    }
  }
</script>