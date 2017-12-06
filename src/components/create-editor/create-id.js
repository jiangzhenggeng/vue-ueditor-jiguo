import $ from 'jquery'

export function createId() {
  return 'id-' + (new Date().getTime()) + '' + (Math.random() + '').replace('.', '')
}

export function editorReady(vm, editor) {
  vm.$emit('editor-ready', vm.editor = editor)
  vm.content && editor.setContent(vm.content)
  vm['EditorWrap'] = $(vm.$refs['editor__wrap'])
  vm['EditorWrap'].offsetTop = vm['EditorWrap'].offset().top
  vm['ToolBarWrap'] = vm['EditorWrap'].find('.edui-editor-toolbarbox-position:first')
  vm['ToolBarBox'] = vm['ToolBarWrap'].find('.edui-editor-toolbarbox:first')
  vm['ToolBarInner'] = vm['ToolBarWrap'].find('.edui-editor-toolbarbox-inner:first')
  editorRefresh(vm, editor)
  editorBindScrollFun(vm, editor)
}

export function editorRefresh(vm, editor) {
  if (editor.fullScreen) {
    $('html').addClass('editor-full-screen')
    editor.setHeight($(window).height() - 60)
  } else {
    $('html').removeClass('editor-full-screen')
    $(window).scrollTop(vm['EditorWrap'].offsetTop)
    editor.setAutoHeight()
  }
  editorBindScrollFun(vm, editor)
}

//浏览器滚动固定导航栏逻辑
export function editorBindScrollFun(vm, editor) {
  if (!vm['ToolBarBox'] || !vm['ToolBarBox'].length) {
    return
  }
  if (editor.fullScreen) {
    vm['EditorWrap'].addClass('full__screen')
    vm['ToolBarInner'].css({
      width: vm['ToolBarWrap'].width()
    })
    vm['ToolBarBox'].css({
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%'
    })
  } else {
    vm['EditorWrap'].removeClass('full__screen')
    var scrollTop = $(window).scrollTop()
    var offset = vm['EditorWrap'].offset()
    if (scrollTop >= offset.top) {
      vm['ToolBarBox'].css({
        position: 'fixed',
        left: vm['ToolBarWrap'].offset().left,
        top: 0,
        width: vm['ToolBarInner'].width()
      })
      var posFix = scrollTop - offset.top - vm['EditorWrap'].height() + 60
      if (posFix >= 0) {
        vm['ToolBarBox'].css({
          top: -(posFix > 60 ? 60 : posFix)
        })
      }
    } else {
      vm['ToolBarBox'].removeAttr('style')
    }
  }
}

//hover tool bar text tips
import EditorRoowUp from './icon/editor_roow.svg'
import EditorRoowDown from './icon/editor_roow2.svg'

export function editorBindToolBarTips(vm, editor) {
  var EditorToolsTips = $('#' + vm.editorId + '-tools-tips')
  var EditorToolsTipsText = EditorToolsTips.find('.editor__tools-tips-text')
  if (EditorToolsTips.length <= 0) {
    $('body').append(`
			<div id="${vm.editorId}-tools-tips" class="editor__tools-tips-wrap">
				<div class="editor__tools-tips-text"></div>
				<img class="editor__tools-tips-roow" src="${EditorRoowUp}" />
				<img class="editor__tools-tips-roow editor__tools-tips-roow2" src="${EditorRoowDown}" />
			</div>`
    );
    EditorToolsTips = $('#' + vm.editorId + '-tools-tips')
    EditorToolsTipsText = EditorToolsTips.find('.editor__tools-tips-text')
  }

  //hover提示
  vm['ToolBarWrap'].on('mouseenter.editor', '.edui-button-body', function () {
    var title = $(this).attr('data-title')
    EditorToolsTipsText.html(title);
    var offset = $(this).offset();
    var tips_w = EditorToolsTips.outerWidth()
    var tips_h = EditorToolsTips.outerHeight()
    var scrollTop = $(window).scrollTop()
    EditorToolsTips.hide()
    if (offset.top - 40 <= scrollTop) {
      EditorToolsTips.addClass('editor__tools-arrow-down').css({
        left: offset.left - (tips_w / 2) + 20,
        top: offset.top + tips_h + 18,
      });
    } else {
      EditorToolsTips.removeClass('editor__tools-arrow-down').css({
        left: offset.left - (tips_w / 2) + 20,
        top: offset.top - tips_h - 8,
      });
    }
    EditorToolsTips.stop(true, false).fadeIn(260)

  }).on('mouseleave.editor', '.edui-button-body', function () {
    EditorToolsTips.stop(true, false).fadeOut(260)
  });
}