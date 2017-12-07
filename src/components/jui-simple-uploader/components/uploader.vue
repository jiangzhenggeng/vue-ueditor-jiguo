<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </slot>
  </div>
</template>

<script>
  import Uploader from 'simple-uploader.js'
  import {kebabCase} from '../common/utils'
  import UploaderBtn from './btn.vue'
  import UploaderDrop from './drop.vue'
  import UploaderUnsupport from './unsupport.vue'
  import UploaderList from './list.vue'
  import UploaderFiles from './files.vue'
  import UploaderFile from './file.vue'

  const COMPONENT_NAME = 'uploader'

  export default {
    name: COMPONENT_NAME,
    props: {
      options: {
        type: Object,
        default() {
          return {}
        }
      },
      autoStart: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        started: false,
        files: [],
        fileList: []
      }
    },
    methods: {
      uploadStart() {
        this.started = true
      },
      fileAdded(file) {
        if (file.ignored) {
          // is ignored, filter it
          return false
        }
      },
      fileRemoved(file) {
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
      },
      filesSubmitted(files, fileList) {
        this.files = this.uploader.files
        this.fileList = this.uploader.fileList
        if (this.autoStart) {
          this.uploader.upload()
        }
      },
      filesUploadSuccess(rootFile, file, respon, chunk) {
        this.fileList.forEach((item, index) => {
          if (item.id == file.id) {
            item.respon = JSON.parse(respon)
            var src_arr = item.respon.url.match(/https?:\/\/s1\.jiguo\.com\/([\w\-]+)\/?/i);
            item.respon.field = src_arr ? src_arr[1] : ''
            this.fileList[index] = item
          }
        })
      },
      allEvent(...args) {
        args[0] = kebabCase(args[0])
        this.$emit.apply(this, args)
      }
    },
    created() {
      const uploader = new Uploader(this.options)
      this.uploader = uploader
      uploader.on('catchAll', this.allEvent)
      uploader.on('uploadStart', this.uploadStart)
      uploader.on('fileAdded', this.fileAdded)
      uploader.on('fileRemoved', this.fileRemoved)
      uploader.on('filesSubmitted', this.filesSubmitted)
      uploader.on('fileSuccess', this.filesUploadSuccess)
    },
    destroyed() {
      const uploader = this.uploader
      uploader.off('catchAll', this.allEvent)
      uploader.off('uploadStart', this.uploadStart)
      uploader.off('fileAdded', this.fileAdded)
      uploader.off('fileRemoved', this.fileRemoved)
      uploader.off('filesSubmitted', this.filesSubmitted)
      uploader.off('fileSuccess', this.filesUploadSuccess)
      this.uploader = null
    },
    components: {
      UploaderBtn,
      UploaderDrop,
      UploaderUnsupport,
      UploaderList,
      UploaderFiles,
      UploaderFile
    }
  }
</script>

<style>
  .uploader {
    position: relative;
  }
</style>
