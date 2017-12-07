export function unhtmlForUrl(str, reg) {
  return str ? str.replace(reg || /[<">']/g, function (a) {
    return {
      '<': '&lt;',
      '&': '&amp;',
      '"': '&quot;',
      '>': '&gt;',
      '\'': '&#39;'
    }[a]

  }) : ''
}

export function convertUrlToFlash(url) {
  url = String(url).replace(/^\s+|\s+$/g, '')
  if (!/^https?:\/\//i.test(url)) {
    return false
  }

  // http://my.tv.sohu.com/us/325364258/93029298.shtml
  url = url
    .replace(/v\.youku\.com\/v_show\/id_([\w\-=]+)\.html/i, 'player.youku.com/player.php/sid/$1/v.swf')
    .replace(/(www\.)?youtube\.com\/watch\?v=([\w\-]+)/i, 'www.youtube.com/v/$2')
    .replace(/youtu.be\/(\w+)$/i, 'www.youtube.com/v/$1')
    .replace(/v\.ku6\.com\/.+\/([\w\.]+)\.html.*$/i, 'player.ku6.com/refer/$1/v.swf')
    .replace(/www\.56\.com\/u\d+\/v_([\w\-]+)\.html/i, 'player.56.com/v_$1.swf')
    .replace(/www.56.com\/w\d+\/play_album\-aid\-\d+_vid\-([^.]+)\.html/i, 'player.56.com/v_$1.swf')
    .replace(/v\.pps\.tv\/play_([\w]+)\.html.*$/i, 'player.pps.tv/player/sid/$1/v.swf')
    .replace(/www\.letv\.com\/ptv\/vplay\/([\d]+)\.html.*$/i, 'i7.imgs.letv.com/player/swfPlayer.swf?id=$1&autoplay=0')
    .replace(/www\.tudou\.com\/programs\/view\/([\w\-]+)\/?/i, 'www.tudou.com/v/$1')
    .replace(/v\.qq\.com\/cover\/[\w]+\/[\w]+\/([\w]+)\.html/i, 'static.video.qq.com/TPout.swf?vid=$1')
    .replace(/v\.qq\.com\/.+[\?\&]vid=([^&]+).*$/i, 'static.video.qq.com/TPout.swf?vid=$1')
    .replace(/v\.qq\.com\/\w+\/\w+\/[\w]+\/([\w]+)\.html/i, 'imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?vid=$1')
    .replace(/v\.qq\.com\/\w+\/\w+\/([\w]+)\.html/i, 'imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?vid=$1')
    .replace(/my\.tv\.sohu\.com\/[\w]+\/([\d]+)\/([\d]+)\.shtml.*$/i, 'tv.sohu.com/upload/static/share/share_play.html#$2_$1_0_9001_0')
    .replace(/share\.vrs\.sohu\.com\/([\w]+)\/v\.swf.*?plid=(\w+).*/i, 'tv.sohu.com/upload/static/share/share_play.html#$1_$2_0_2_1')
  return url
}

export function convertUrlToIframe(url) {
  url = convertUrlToFlash(url)
  if (!url) return false

  if (url.match('v.qq.com') || url.match('video.qq.com') || url.match('imgcache.qq.com')) {
    url = 'http://v.qq.com/iframe/player.html?vid=' + getKeyVal(url, 'vid') + '&width=630&height=350&auto=0'
  } else if (url.match('youku.com')) {
    url.match(/http:\/\/player.youku.com\/player.php\/sid\/(.+)\/v.swf/)
    url = 'http://player.youku.com/embed/' + RegExp.$1
  }
  return url
}

export function getKeyVal(src, key) {
  var matchVidArray = src.toString().split('?')[1].toString().split('&'), vid = null
  for (var i2 = 0; i2 < matchVidArray.length; i2++) {
    if (matchVidArray[i2].split('=')[0].toLowerCase() == key) {
      vid = matchVidArray[i2].split('=')[1]
      return vid
    }
  }
  return ''
}
