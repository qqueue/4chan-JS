var Tip = {
  node: null,
  show: function(t, data, pos) {
    var el, rect, style, left, top;
    rect = t.getBoundingClientRect();
    el = document.createElement('div');
    el.id = 'tooltip';
    if (data) {
      el.innerHTML = data;
    } else {
      el.textContent = t.getAttribute('data-tip');
    }
    if (!pos) {
      pos = 'top';
    }
    el.className = 'tip-' + pos;
    document.body.appendChild(el);
    left = rect.left - (el.offsetWidth - t.offsetWidth) / 2;
    if (left < 0) {
      left = rect.left;
    } else if (left + el.offsetWidth > document.documentElement.clientWidth) {
      left = rect.left - el.offsetWidth + t.offsetWidth;
    }
    top = rect.top - el.offsetHeight - 5;
    style = el.style;
    style.top = (top + window.pageYOffset) + 'px';
    style.left = left + window.pageXOffset + 'px';
    this.node = el;
  },
  hide: function() {
    if (this.node) {
      document.body.removeChild(this.node);
      this.node = null;
    }
  }
}

  function buildMobileNav() {
    var cnt, boards, i, b, html, order;
    if (el = document.getElementById('boardSelectMobile')) {
      html = '';
      order = [];
      boards = document.querySelectorAll('#boardNavDesktop .boardList > a');
      for (i = 0; b = boards[i]; ++i) {
        order.push(b);
      }
      order.sort(function(a, b) {
        if (a.textContent < b.textContent) {
          return -1;
        }
        if (a.textContent > b.textContent) {
          return 1;
        }
        return 0;
      });
      for (i = 0; b = order[i]; ++i) {
        html += '<option value="' + b.textContent + '">/' + b.textContent + '/ - ' + b.title + '</option>';
      }
      el.innerHTML = html;
    }
  }

  function initPass() {
    if (get_cookie("pass_enabled") == '1' || get_cookie('extra_path')) {
      window.passEnabled = true;
    } else {
      window.passEnabled = false;
    }
  }

  function initRecaptcha() {
    var el;
    if (!window.passEnabled) {
      el = document.forms.post;
      el.com.addEventListener('focus', loadRecaptcha, false);
      el.upfile && el.upfile.addEventListener('change', loadRecaptcha, false);
    }
  }

  function loadRecaptcha() {
    var el;
    if (document.getElementById('recaptcha_area')) {
      return;
    }
    if (el = document.getElementById('captchaContainer')) {
      el.setAttribute('data-placeholder', el.textContent);
    }
    Recaptcha.create(window.recaptchaKey, 'captchaContainer' + window.recaptchaId, {
      theme: "clean",
      callback: onCaptchaReady
    });
  }

  function initAnalytics() {
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o), m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-166538-1', 'auto');
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');
  }

  function initAds(category, board) {
    var p = "http",
      d = "static";
    if (document.location.protocol == "https:") {
      p += "s";
      d = "engine";
    }
    var z = document.createElement("script");
    z.type = "text/javascript";
    z.async = true;
    z.src = p + "://" + d + ".4chan-ads.org/ados.js";
    z.onload = function() {
      ados = ados || {};
      ados.run = ados.run || [];
      ados.run.push(function() {
        window._top_ad = ados_add_placement(3536, 18130, "azk91603", 4).setZone(16258);
        window._middle_ad = ados_add_placement(3536, 18130, "azk98887", 3).setZone(16259);
        window._bottom_ad = ados_add_placement(3536, 18130, "azk53379", 4).setZone(16260);
        ados_setDomain('engine.4chan-ads.org');
        ados_setKeywords(category + ', ' + board);
        ados_setNoTrack();
        ados_load();
      });
    };
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(z, s);
  }

  function toggleSearch(e) {
    var input, cnt;
    e && e.preventDefault();
    cnt = document.getElementById('search-cnt');
    input = document.getElementById('search-box');
    if (cnt.hasAttribute('data-enabled')) {
      cnt.style.display = '';
      input.value = '';
      input.blur();
      cnt.removeAttribute('data-enabled');
    } else {
      cnt.style.display = 'inline';
      input.focus();
      input.value = '';
      cnt.setAttribute('data-enabled', '1');
    }
  }

  function applySearch(e) {
    var str;
    e && e.preventDefault();
    str = document.getElementById('search-box').value;
    if (str !== '') {
      window.location.href = 'catalog#s=' + str;
    }
  }

  function onKeyDownSearch(e) {
    if (e.keyCode == 13) {
      applySearch();
    }
  }

  function onReportClick(e) {
    var i, input, nodes, board;
    nodes = document.getElementsByTagName('input');
    board = location.pathname.split(/\//)[1];
    for (i = 0; input = nodes[i]; ++i) {
      if (input.type == 'checkbox' && input.checked && input.value == 'delete') {
        return reppop('https://sys.4chan.org/' + board + '/' + (board != 'f' ? 'imgboard' : 'up') + '.php?mode=report&no=' + input.name.replace(/[a-z]+/, ''));
      }
    }
  }

  function onStyleSheetChange(e) {
    setActiveStyleSheet(this.value);
  }

  function onPageSwitch(e) {
    e.preventDefault();
    window.location = this.action;
  }

  function onMobileFormClick(e) {
    var index = location.pathname.split(/\//).length < 4;
    e.preventDefault();
    if (this.parentNode.id == 'mpostform') {
      toggleMobilePostForm(index);
    } else {
      toggleMobilePostForm(index, 1);
    }
  }

  function onMobileRefreshClick(e) {
    locationHashChanged(this);
  }

  function get_pass(name) {
    var pass, chars, i, len, rnd;
    pass = get_cookie(name);
    if (pass) return pass;
    chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    len = chars.length;
    pass = '';
    for (var i = 0; i < 32; i++) {
      rnd = Math.floor(Math.random() * len);
      pass += chars.substring(rnd, rnd + 1);
    }
    return '_' + pass;
  }

  function toggle(name) {
    var a = document.getElementById(name);
    a.style.display = ((a.style.display != 'block') ? 'block' : 'none');
  }

  function quote(text) {
    if (document.selection) {
      document.post.com.focus();
      var sel = document.selection.createRange();
      sel.text = ">>" + text + "\n";
    } else if (document.post.com.selectionStart || document.post.com.selectionStart == "0") {
      var startPos = document.post.com.selectionStart;
      var endPos = document.post.com.selectionEnd;
      document.post.com.value = document.post.com.value.substring(0, startPos) + ">>" + text + "\n" + document.post.com.value.substring(endPos, document.post.com.value.length);
    } else {
      document.post.com.value += ">>" + text + "\n";
    }
  }

  function repquote(rep) {
    if (document.post.com.value == "") {
      quote(rep);
    }
  }

  function reppop(url) {
    var day = new Date();
    var id = day.getTime();
    window.open(url, id, 'toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=610,height=170');
    return false;
  }

  function recaptcha_load() {
    var d = document.getElementById("recaptcha_div");
    if (!d) return;
    Recaptcha.create("6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc", "recaptcha_div", {
      theme: "clean"
    });
  }

  function onParsingDone(e) {
    var i, nodes, n, p, tid, offset, limit;
    tid = e.detail.threadId;
    offset = e.detail.offset;
    if (!offset) {
      return;
    }
    nodes = document.getElementById('t' + tid).getElementsByClassName('nameBlock');
    limit = e.detail.limit ? (e.detail.limit * 2) : nodes.length;
    for (i = offset * 2 + 1; i < limit; i += 2) {
      if (n = nodes[i].children[1]) {
        if (currentHighlighted && n.className.indexOf('id_' + currentHighlighted) != -1) {
          p = n.parentNode.parentNode.parentNode;
          p.className = 'highlight ' + p.className;
        }
        n.addEventListener('click', idClick, false)
      }
    }
  }

  function loadExtraScripts() {
    var path = readCookie('extra_path');
    if (!path) return false;
    if (!/^[a-z0-9]+$/.test(path)) return false;
    document.write('<script type="text/javascript" src="https://s.4cdn.org/js/' + path + '.' + jsVersion + '.js"></script>');
    return true;
  }

  function toggleMobilePostForm(index, scrolltotop) {
    elem = document.getElementById('mpostform').firstElementChild;
    postForm = document.getElementById('postForm');
    if (elem.className.match('hidden')) {
      elem.className = elem.className.replace('hidden', 'shown');
      postForm.className = postForm.className.replace(' hideMobile', '');
      elem.innerHTML = 'Close Post Form';
    } else {
      elem.className = elem.className.replace('shown', 'hidden');
      postForm.className += ' hideMobile';
      elem.innerHTML = (index) ? 'Start a Thread' : 'Reply to Thread';
    }
    if (scrolltotop) {
      window.scroll(0, 0);
    }
  }

  function toggleGlobalMessage(e) {
    var elem, postForm;
    if (e) {
      e.preventDefault();
    }
    elem = document.getElementById('globalToggle');
    postForm = document.getElementById('globalMessage');
    if (elem.className.match('hidden')) {
      elem.className = elem.className.replace('hidden', 'shown');
      postForm.className = postForm.className.replace(' hideMobile', '');
      elem.innerHTML = 'Close Announcement';
    } else {
      elem.className = elem.className.replace('shown', 'hidden');
      postForm.className += ' hideMobile';
      elem.innerHTML = 'View Important Announcement';
    }
  }

  function checkRecaptcha() {
    if (typeof RecaptchaState.timeout != 'undefined') {
      if (RecaptchaState.timeout == 1800) {
        RecaptchaState.timeout = 570;
        Recaptcha._reset_timer();
        clearInterval(captchainterval);
      }
    }
  }

  function setPassMsg() {
    var el, msg;
    el = document.getElementById('captchaFormPart');
    if (!el) {
      return;
    }
    msg = 'You are using a 4chan Pass. [<a href="https://sys.4chan.org/auth?act=logout" onclick="confirmPassLogout(event);" tabindex="-1">Logout</a>]';
    el.children[1].innerHTML = '<div style="padding: 5px;">' + msg + '</div>';
  }

  function confirmPassLogout(event) {
    var conf = confirm('Are you sure you want to logout?');
    if (!conf) {
      event.preventDefault();
      return false;
    }
  }
var activeStyleSheet;

function initStyleSheet() {
  var i, rem, link, len;
  if (typeof style_group != "undefined" && style_group) {
    var cookie = readCookie(style_group);
    activeStyleSheet = cookie ? cookie : getPreferredStyleSheet();
  }
  switch (activeStyleSheet) {
    case "Yotsuba B":
      setActiveStyleSheet("Yotsuba B New", true);
      break;
    case "Yotsuba":
      setActiveStyleSheet("Yotsuba New", true);
      break;
    case "Burichan":
      setActiveStyleSheet("Burichan New", true);
      break;
    case "Futaba":
      setActiveStyleSheet("Futaba New", true);
      break;
    default:
      setActiveStyleSheet(activeStyleSheet, true);
      break;
  }
  if (localStorage.getItem('4chan_never_show_mobile') == 'true') {
    link = document.querySelectorAll('link');
    len = link.length;
    for (i = 0; i < len; i++) {
      if (link[i].getAttribute('href').match('mobile')) {
        (rem = link[i]).parentNode.removeChild(rem);
      }
    }
  }
}
captchainterval = null;

function init() {
  var error = typeof is_error != "undefined";
  var board = location.href.match(/4chan\.org\/(\w+)/)[1];
  var arr = location.href.split(/#/);
  if (arr[1] && arr[1].match(/q[0-9]+$/)) {
    repquote(arr[1].match(/q([0-9]+)$/)[1]);
  }
  if (typeof jsMath != "undefined" && typeof jsMath.Easy.onload != "undefined" && !jsMath.Easy.loaded) jsMath.Easy.onload();
  if (navigator.userAgent) {
    if (navigator.userAgent.match(/iP(hone|ad|od)/i)) {
      links = document.querySelectorAll('s');
      len = links.length;
      for (var i = 0; i < len; i++) {
        links[i].onclick = function() {
          if (this.hasAttribute('style')) {
            this.removeAttribute('style');
          } else {
            this.setAttribute('style', 'color: #fff!important;');
          }
        }
      }
    }
  }
  if (document.getElementById('styleSelector')) {
    styleSelect = document.getElementById('styleSelector');
    len = styleSelect.options.length;
    for (var i = 0; i < len; i++) {
      if (styleSelect.options[i].value == activeStyleSheet) {
        styleSelect.selectedIndex = i;
        continue;
      }
    }
  }
  if (!error) document.getElementById('delPassword').value = get_pass('4chan_pass');
  if (board != 'i' && board != 'ic' && board != 'f' && !error) {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      document.getElementById('postFile').addEventListener('change', handleFileSelect, false);
    }
  }
  if (typeof extra != "undefined" && extra && !error) extra.init();
  if (check_for_block) checkForBlock();
}

function onCaptchaClick(e) {
  if (document.getElementById('qrCaptcha')) {
    QR.reloadCaptcha();
  } else {
    Recaptcha.reload('t');
  }
}
var coreLenCheckTimeout = null;

function onComKeyDown() {
  clearTimeout(coreLenCheckTimeout);
  coreLenCheckTimeout = setTimeout(coreCheckComLength, 500);
}

function coreCheckComLength() {
  var byteLength, comField, error;
  if (comlen) {
    comField = document.getElementsByName('com')[0];
    byteLength = encodeURIComponent(comField.value).split(/%..|./).length - 1;
    if (byteLength > comlen) {
      if (!(error = document.getElementById('comlenError'))) {
        error = document.createElement('div');
        error.id = 'comlenError';
        error.style.cssText = 'font-weight:bold;padding:5px;color:red;';
        comField.parentNode.appendChild(error);
      }
      error.textContent = 'Error: Comment too long (' + byteLength + '/' + comlen + ').';
    } else if (error = document.getElementById('comlenError')) {
      error.parentNode.removeChild(error);
    }
  }
}

function onCaptchaReady() {
  var el;
  if (el = document.getElementById('recaptcha_image')) {
    el.title = 'Reload';
    el.addEventListener('click', onCaptchaClick, false);
    el = document.getElementsByClassName('recaptcha_image_cell')[0];
    el.style.cssText = 'padding: 0 0 3px !important';
    el = document.getElementById('recaptcha_image');
    el.style.cssText = 'border: 1px solid #aaa !important';
    el = document.getElementById('recaptcha_response_field');
    el.setAttribute('placeholder', 'Type the text (Required)');
    el.setAttribute('spellcheck', 'false');
    el.setAttribute('autocorrect', 'off');
    el.setAttribute('autocapitalize', 'off');
    el.removeAttribute('style');
    window.captchaReady = true;
    window.QR && QR.onCaptchaReady();
  }
}

function disableMobile() {
  localStorage.setItem('4chan_never_show_mobile', 'true');
  location.reload(true);
}

function enableMobile() {
  localStorage.removeItem('4chan_never_show_mobile');
  location.reload(true);
}

function checkForBlock() {
  var i, el, plea, nodes;
  if (/Mobile|Android|Dolfin|Opera Mobi|PlayStation Vita|Nintendo DS/.test(navigator.userAgent) || readCookie('pass_enabled') == 1) {
    return;
  }
  nodes = document.getElementsByClassName('ad-cnt');
  for (i = 0; el = nodes[i]; ++i) {
    if (el.offsetHeight == 0) {
      plea = document.createElement('div');
      plea.className = 'center';
      plea.innerHTML = blockPlea;
      el.parentNode.insertBefore(plea, el);
    }
  }
}
var currentHighlighted = null;

function enableClickableIds() {
  var i = 0,
    len = 0;
  var elems = document.getElementsByClassName('posteruid');
  var capcode = document.getElementsByClassName('capcode');
  if (capcode != null) {
    for (i = 0, len = capcode.length; i < len; i++) {
      capcode[i].addEventListener("click", idClick, false);
    }
  }
  if (elems == null) return;
  for (i = 0, len = elems.length; i < len; i++) {
    elems[i].addEventListener("click", idClick, false);
  }
}

function idClick(evt) {
  var i = 0,
    len = 0,
    node;
  var uid = evt.target.className == 'hand' ? evt.target.parentNode.className.match(/id_([^ $]+)/)[1] : evt.target.className.match(/id_([^ $]+)/)[1];
  var hl = document.getElementsByClassName('highlight');
  len = hl.length;
  for (i = 0; i < len; i++) {
    var cn = hl[0].className.toString();
    hl[0].className = cn.replace(/highlight /g, '');
  }
  if (currentHighlighted == uid) {
    currentHighlighted = null;
    return;
  }
  currentHighlighted = uid;
  var nhl = document.getElementsByClassName('id_' + uid);
  len = nhl.length;
  for (i = 0; i < len; i++) {
    node = nhl[i].parentNode.parentNode.parentNode;
    if (!node.className.match(/highlight /)) node.className = "highlight " + node.className;
  }
}

function handleFileSelect() {
  var el, fsize, maxFilesize;
  if (this.files) {
    maxFilesize = window.maxFilesize;
    el = document.getElementById('fileError');
    fsize = this.files[0].size;
    if (this.files[0].type == 'video/webm' && window.maxWebmFilesize) {
      maxFilesize = window.maxWebmFilesize;
    }
    if (fsize > maxFilesize) {
      el.textContent = 'Error: Maximum file size allowed is ' + Math.floor(maxFilesize / 1048576) + ' MB';
    } else {
      el.textContent = '';
    }
  }
}

function locationHashChanged(e) {
  var css = document.getElementById('id_css');
  switch (e.id) {
    case 'refresh_top':
      url = window.location.href.replace(/#.+/, '#top');
      if (!/top$/.test(url)) url += '#top';
      css.innerHTML = '<meta http-equiv="refresh" content="0;URL=' + url + '">';
      document.location.reload(true);
      break;
    case 'refresh_bottom':
      url = window.location.href.replace(/#.+/, '#bottom');
      if (!/bottom$/.test(url)) url += '#bottom';
      css.innerHTML = '<meta http-equiv="refresh" content="0;URL=' + url + '">';
      document.location.reload(true);
      break;
    default:
      break;
  }
  return true;
}

function setActiveStyleSheet(title, init) {
  if (document.querySelectorAll('link[title]').length == 1) {
    return;
  }
  var a;
  var link;
  var href = '';
  for (var i = 0;
    (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("title") == "switch")
      link = a;
    if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      if (a.getAttribute("title") == title) {
        href = a.href;
      }
    }
  }
  link.setAttribute("href", href);
  if (!init) {
    createCookie(style_group, title, 365, "4chan.org");
  }
}

function getActiveStyleSheet() {
  var i, a;
  var link;
  if (document.querySelectorAll('link[title]').length == 1) {
    return 'Yotsuba P';
  }
  for (i = 0;
    (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("title") == "switch")
      link = a;
    else if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.href == link.href) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  return (style_group == "ws_style") ? "Yotsuba B New" : "Yotsuba New";
}

function createCookie(name, value, days, domain) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else expires = ""; if (domain) domain = "; domain=" + domain;
  else domain = "";
  document.cookie = name + "=" + value + expires + "; path=/" + domain;
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return '';
}
var get_cookie = readCookie;

function setRetinaIcons() {
  var i, j, nodes;
  nodes = document.getElementsByClassName('retina');
  for (i = 0; j = nodes[i]; ++i) {
    j.src = j.src.replace(/\.(gif|png)$/, "@2x.$1");
  }
}

function onCoreClick(e) {
  if (/flag flag-/.test(e.target.className) && e.which == 1) {
    window.open('//s.4cdn.org/image/country/' + e.target.className.match(/flag-([a-z]+)/)[1] + '.gif', '');
  }
}

function onPostSubmit(e) {
  var fsize, limit, file = document.forms.post.upfile;
  if (file && file.value && file.files) {
    fsize = file.files[0].size || 0;
  } else {
    fsize = 0;
  }
  limit = (window.Main && Main.hasMobileLayout) ? 0 : 204800;
  if (!e.shiftKey && fsize > limit) {
    try {
      submitPreupload();
      e.preventDefault();
    } catch (e) {}
  }
}

function submitDirect() {
  var el = document.forms.post;
  el.removeEventListener('submit', onPostSubmit, false);
  el.submit();
}

function submitPreupload() {
  var xhr, token, challenge, response, data, errCnt;
  if (token = document.getElementById('captchaToken')) {
    token.parentNode.removeChild(token);
  }
  challenge = document.getElementById('recaptcha_challenge_field');
  response = document.getElementById('recaptcha_response_field');
  errCnt = document.getElementById('fileError');
  if (!response || response.value == '') {
    errCnt.textContent = 'You forgot to type in the CAPTCHA.';
    response && response.focus();
    return;
  }
  data = new FormData();
  data.append('mode', 'checkcaptcha');
  data.append('challenge', challenge.value);
  data.append('response', response.value);
  xhr = new XMLHttpRequest();
  xhr.open('POST', document.forms.post.action, true);
  xhr.onerror = function() {
    submitDirect();
  };
  xhr.onload = function() {
    var resp;
    try {
      resp = JSON.parse(this.responseText);
    } catch (e) {
      console.log("Couldn't verify captcha.");
      submitDirect();
      return;
    }
    if (resp.token) {
      token = document.createElement('input');
      token.name = 'captcha_token';
      token.id = 'captchaToken';
      token.type = 'hidden';
      token.value = resp.token;
      document.forms.post.appendChild(token);
      submitDirect();
    } else if (resp.error) {
      onCaptchaClick();
      errCnt.innerHTML = resp.error;
    } else {
      if (resp.fail) {
        console.log(resp.fail);
      }
      submitDirect();
    }
  };
  xhr.send(data);
};

function contentLoaded() {
  var i, el, el2, nodes, len, mobileSelect, params, board, val;
  document.removeEventListener('DOMContentLoaded', contentLoaded, true);
  initAnalytics();
  params = location.pathname.split(/\//);
  board = params[1];
  if (window.passEnabled) {
    setPassMsg();
  }
  if (el = document.getElementById('bottomReportBtn')) {
    el.addEventListener('click', onReportClick, false);
  }
  if (el = document.getElementById('styleSelector')) {
    el.addEventListener('change', onStyleSheetChange, false);
  }
  if (board == 'int' || board == 'sp') {
    el = document.getElementById('delform');
    el.addEventListener('click', onCoreClick, false);
  }
  if (!window.passEnabled && window.preupload_captcha && 'FormData' in window) {
    if (el = document.forms.post) {
      el.addEventListener('submit', onPostSubmit, false);
    }
  }
  if ((el = document.forms.post) && el.flag) {
    if ((val = readCookie('4chan_flag')) && (el2 = el.querySelector('option[value="' + val + '"]'))) {
      el2.setAttribute('selected', 'selected');
    }
  }
  if (!params[3]) {
    nodes = document.getElementsByClassName('pageSwitcherForm');
    for (i = 0; el = nodes[i]; ++i) {
      el.addEventListener('submit', onPageSwitch, false);
    }
    if (el = document.getElementById('search-btn')) {
      el.addEventListener('click', toggleSearch, false);
      el = document.getElementById('search-ok');
      el.addEventListener('click', applySearch, false);
      el = document.getElementById('search-box');
      el.addEventListener('keydown', onKeyDownSearch, false);
    }
  }
  buildMobileNav();
  nodes = document.getElementsByClassName('mobilePostFormToggle');
  for (i = 0; el = nodes[i]; ++i) {
    el.addEventListener('click', onMobileFormClick, false);
  }
  if (el = document.getElementsByName('com')[0]) {
    el.addEventListener('keydown', onComKeyDown, false);
    el.addEventListener('paste', onComKeyDown, false);
    el.addEventListener('cut', onComKeyDown, false);
  }
  if (el = document.getElementById('refresh_top')) {
    el.addEventListener('mouseup', onMobileRefreshClick, false);
  }
  if (el = document.getElementById('refresh_bottom')) {
    el.addEventListener('mouseup', onMobileRefreshClick, false);
  }
  if (el = document.getElementById('globalToggle')) {
    el.addEventListener('click', toggleGlobalMessage, false);
  }
  if (localStorage.getItem('4chan_never_show_mobile') == 'true') {
    if (el = document.getElementById('disable-mobile')) {
      el.style.display = 'none';
      el = document.getElementById('enable-mobile');
      el.parentNode.style.cssText = 'display: inline !important;';
    }
  }
  if (mobileSelect = document.getElementById('boardSelectMobile')) {
    len = mobileSelect.options.length;
    for (i = 0; i < len; i++) {
      if (mobileSelect.options[i].value == board) {
        mobileSelect.selectedIndex = i;
        continue;
      }
    }
    mobileSelect.onchange = function() {
      var boardNew = this.options[this.selectedIndex].value;
      window.location = '//boards.4chan.org/' + boardNew + '/';
    }
  }
  if (clickable_ids) enableClickableIds();
  if (window.devicePixelRatio >= 2) {
    setRetinaIcons();
  }
}
initPass();
window.onload = init;
if (clickable_ids) {
  document.addEventListener('4chanParsingDone', onParsingDone, false);
}
document.addEventListener('4chanMainInit', loadExtraScripts, false);
document.addEventListener('DOMContentLoaded', contentLoaded, true);
initStyleSheet();
