/**
 * Tooltips
 */
var Tip = {
  node: null,
  timeout: null,
  delay: 300,
  
  init: function() {
    document.addEventListener('mouseover', this.onMouseOver, false);
    document.addEventListener('mouseout', this.onMouseOut, false);
  },
  
  onMouseOver: function(e) {
    var cb, data, t;
    
    t = e.target;
    
    if (Tip.timeout) {
      clearTimeout(Tip.timeout);
      Tip.timeout = null;
    }
    
    if (t.hasAttribute('data-tip')) {
      data = null;
      
      if (t.hasAttribute('data-tip-cb')) {
        cb = t.getAttribute('data-tip-cb');
        if (window[cb]) {
          data = window[cb](t);
        }
      }
      Tip.timeout = setTimeout(Tip.show, Tip.delay, e.target, data);
    }
  },
  
  onMouseOut: function(e) {
    if (Tip.timeout) {
      clearTimeout(Tip.timeout);
      Tip.timeout = null;
    }
    
    Tip.hide();
  },
  
  show: function(t, data, pos) {
    var el, rect, style, left, top;
    
    rect = t.getBoundingClientRect();
    
    el = document.createElement('div');
    el.id = 'tooltip';
    
    if (data) {
      el.innerHTML = data;
    }
    else {
      el.textContent = t.getAttribute('data-tip');
    }
    
    if (!pos) {
      pos = 'top';
    }
    
    el.className = 'tip-' + pos;
    
    document.body.appendChild(el);
    
    left = rect.left - (el.offsetWidth - t.offsetWidth) / 2;
    
    if (left < 0) {
      left = rect.left + 2;
      el.className += '-right';
    }
    else if (left + el.offsetWidth > document.documentElement.clientWidth) {
      left = rect.left - el.offsetWidth + t.offsetWidth + 2;
      el.className += '-left';
    }
    
    top = rect.top - el.offsetHeight - 5;
    
    style = el.style;
    style.top = (top + window.pageYOffset) + 'px';
    style.left = left + window.pageXOffset + 'px';
    
    Tip.node = el;
  },
  
  hide: function() {
    if (Tip.node) {
      document.body.removeChild(Tip.node);
      Tip.node = null;
    }
  }
}

function toggleArcSort() {
  var i, j, el, cid, body, rows, data;
  
  cid = 3;
  body = document.getElementById('arc-list').getElementsByTagName('tbody')[0]
  rows = body.children;
  
  data = [];
  
  for (i = 0; el = rows[i]; ++i) {
    data.push([+el.children[cid].textContent, el]);
  }
  
  data.sort(function(a, b) {
    return b[0] - a[0];
  });
  
  body.style.display = 'none';
  body.textContent = '';
  
  for (i = 0; el = data[i]; ++i) {
    body.appendChild(el[1]);
  }
  
  body.style.display = '';
}

function mShowFull(t) {
  var el, data;
  
  if (t.className === 'name') {
    if (el = t.parentNode.parentNode.parentNode
        .getElementsByClassName('name')[1]) {
      data = el.innerHTML;
    }
  }
  else if (t.parentNode.className === 'subject') {
    if (el = t.parentNode.parentNode.parentNode.parentNode
        .getElementsByClassName('subject')[1]) {
      data = el.innerHTML;
    }
  }
  else if (/fileThumb/.test(t.parentNode.className)) {
    if (el = t.parentNode.parentNode.getElementsByClassName('fileText')[0]) {
      el = el.firstElementChild;
      data = el.getAttribute('title') || el.innerHTML;
    }
  }
  
  return data;
}

function loadBannerImage() {
  var cnt, el;
  
  cnt = document.getElementById('bannerCnt');
  
  if (!cnt || cnt.offsetWidth <= 0) {
    return;
  }
  
  cnt.innerHTML = '<img alt="4chan" src="//s.4cdn.org/image/title/'
    + cnt.getAttribute('data-src') + '">';
}

function onMobileSelectChange() {
  var board, page;
  
  board = this.options[this.selectedIndex].value;
  page = (board !== 'f' && /\/catalog$/.test(location.pathname)) ? 'catalog' : '';
  
  window.location = '//boards.4chan.org/' + board + '/' + page;
}

function buildMobileNav(currentBoard) {
  var el, cnt, boards, i, b, html, order;
  
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
      html += '<option value="'
        + b.textContent + '">/'
        + b.textContent + '/ - '
        + b.title + '</option>';
    }
    
    el.innerHTML = html;
  }
}

function cloneTopNav() {
  var navT, navB, ref, el;
  
  navT = document.getElementById('boardNavDesktop');
  
  if (!navT) {
    return;
  }
  
  ref = document.getElementById('absbot');
  
  navB = navT.cloneNode(true);
  navB.id = navB.id + 'Foot';
  
  if (el = navB.querySelector('#navtopright')) {
    el.id = 'navbotright';
  }
  
  if (el = navB.querySelector('#settingsWindowLink')) {
    el.id = el.id + 'Bot';
  }
  
  document.body.insertBefore(navB, ref);
}

function initPass() {
  if (get_cookie("pass_enabled") == '1' || get_cookie('extra_path')) {
    window.passEnabled = true;
  }
  else {
    window.passEnabled = false;
  }
}

function initBlotter() {
  var mTime, seenTime, el;
  
  el = document.getElementById('toggleBlotter');
  
  if (!el) {
    return;
  }
  
  el.addEventListener('click', toggleBlotter, false);
  
  seenTime = localStorage.getItem('4chan-blotter');
  
  if (!seenTime) {
    return;
  }
  
  mTime = +el.getAttribute('data-utc');
  
  if (mTime <= +seenTime) {
    toggleBlotter();
  }
}

function toggleBlotter(e) {
  var el, btn;
  
  e && e.preventDefault();
  
  el = document.getElementById('blotter-msgs');
  
  if (!el) {
    return;
  }
  
  btn = document.getElementById('toggleBlotter');
  
  if (el.style.display == 'none') {
    el.style.display = '';
    localStorage.removeItem('4chan-blotter');
    btn.textContent = 'Hide';
    
    el = btn.nextElementSibling;
    
    if (el.style.display) {
      el.style.display = '';
    }
  }
  else {
    el.style.display = 'none';
    localStorage.setItem('4chan-blotter', btn.getAttribute('data-utc'));
    btn.textContent = 'Show Blotter';
    btn.nextElementSibling.style.display = 'none';
  }
}

function onRecaptchaLoaded() {
  if (document.getElementById('postForm').style.display == 'table') {
    initRecaptcha();
  }
}

function initRecaptcha() {
  var el;
  
  el = document.getElementById('g-recaptcha');
  
  if (!el || el.firstElementChild) {
    return;
  }
  
  if (!window.passEnabled && window.grecaptcha) {
    grecaptcha.render(el, {
      sitekey: window.recaptchaKey,
      theme: activeStyleSheet === 'Tomorrow' ? 'dark' : 'light'
    });
  }
}

function initAnalytics() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  
  ga('create','UA-166538-1', {'sampleRate': 1});
  ga('set', 'anonymizeIp', true);
  ga('send','pageview');
}

function initAds(category, board) {
  var p = "http", d = "s";
  
  if (document.location.protocol == "https:") {
    p += "s";
  }
  
  var z = document.createElement("script");
  z.type = "text/javascript";
  z.async = true;
  z.src = p + "://" + d + ".zkcdn.net/ados.js";
  z.onload = function() {
    ados = ados || {};
    ados.run = ados.run || [];
    ados.run.push(function () {
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
      return reppop('https://sys.4chan.org/' + board + '/imgboard.php?mode=report&no='
        + input.name.replace(/[a-z]+/, '')
      );
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
  }
  else {
    toggleMobilePostForm(index, 1);
  }
}

function onMobileRefreshClick(e) {
  locationHashChanged(this);
}

function get_pass(name){
  var pass, chars, i, len, rnd;
  
  pass = get_cookie(name);
  
  if (pass) return pass;
  
  chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  len = chars.length;
  pass = '';
  
  for (var i = 0; i < 32; i++) {
    rnd = Math.floor(Math.random() * len);
    pass += chars.substring(rnd,rnd + 1);
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

	Recaptcha.create("6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc", "recaptcha_div",{theme: "clean"});
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
  for (i = offset * 2 + 1; i < limit; i+=2) {
    if (n = nodes[i].children[1]) {
      if (currentHighlighted
        && n.className.indexOf('id_' + currentHighlighted) != -1) {
        p = n.parentNode.parentNode.parentNode;
        p.className = 'highlight ' + p.className;
      }
      n.addEventListener('click', idClick, false)
    }
  }
}

function loadExtraScripts() {
  var el, path;
  
  path = readCookie('extra_path');
  
  if (!path || !/^[a-z0-9]+$/.test(path)) {
    return false;
  }
  
  if (window.FC) {
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = 'https://s.4cdn.org/js/' + path + '.' + jsVersion + '.js';
    document.head.appendChild(el);
  }
  else {
    document.write('<script type="text/javascript" src="https://s.4cdn.org/js/' + path + '.' + jsVersion + '.js"></script>');
  }
  
  return true;
}


function toggleMobilePostForm(index, scrolltotop) {
  var elem = document.getElementById('mpostform').firstElementChild;
  var postForm = document.getElementById('postForm');
  
  if (elem.className.match('hidden')) {
    elem.className = elem.className.replace('hidden', 'shown');
    postForm.className = postForm.className.replace(' hideMobile', '');
    elem.innerHTML = 'Close Post Form';
    initRecaptcha();
  }
  else {
    elem.className = elem.className.replace('shown', 'hidden');
    postForm.className += ' hideMobile';
    elem.innerHTML = (index) ? 'Start New Thread' : 'Post Reply';
  }
  
  if (scrolltotop) {
    elem.scrollIntoView();
  }
}

function toggleGlobalMessage(e) {
  var elem, postForm;
  
  if (e) {
    e.preventDefault();
  }
  
	elem = document.getElementById('globalToggle');
	postForm = document.getElementById('globalMessage');

	if( elem.className.match('hidden') ) {
		elem.className = elem.className.replace('hidden', 'shown');
		postForm.className = postForm.className.replace(' hideMobile', '');

		elem.innerHTML = 'Close Announcement';
	} else {
		elem.className = elem.className.replace('shown', 'hidden');
		postForm.className += ' hideMobile';

		elem.innerHTML = 'View Announcement';
	}
}

function checkRecaptcha()
{
	if( typeof RecaptchaState.timeout != 'undefined' ) {
		if( RecaptchaState.timeout == 1800 ) {
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

function confirmPassLogout(event)
{
	var conf = confirm('Are you sure you want to logout?');
	if( !conf ) {
		event.preventDefault();
		return false;
	}
}

var activeStyleSheet;

function initStyleSheet() {
  var i, rem, link, len;
  
  // fix me
  if (window.FC) {
    return;
  }
  
	// hack for people on old things
	if (typeof style_group != "undefined" && style_group) {
		var cookie = readCookie(style_group);
		activeStyleSheet = cookie ? cookie : getPreferredStyleSheet();
	}

	switch(activeStyleSheet) {
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
  var el;
	var error = typeof is_error != "undefined";
	var board = location.href.match(/4chan\.org\/(\w+)/)[1];
	var arr = location.href.split(/#/);
	if( arr[1] && arr[1].match(/q[0-9]+$/) ) {
		repquote( arr[1].match(/q([0-9]+)$/)[1] );
	}


	if (typeof jsMath != "undefined" && typeof jsMath.Easy.onload != "undefined" && !jsMath.Easy.loaded) jsMath.Easy.onload();

	if(navigator.userAgent) {
		if( navigator.userAgent.match( /iP(hone|ad|od)/i ) ) {
			links = document.querySelectorAll('s');
			len = links.length;

			for( var i = 0; i < len; i++ ) {
				links[i].onclick = function() {
					if (this.hasAttribute('style')) {
						this.removeAttribute('style');
					}
					else {
						this.setAttribute('style', 'color: #fff!important;');
					}
				}
			}
		}
	}

	if( document.getElementById('styleSelector') ) {
        styleSelect = document.getElementById('styleSelector');
        len = styleSelect.options.length;
        for ( var i = 0; i < len; i++) {
            if (styleSelect.options[i].value == activeStyleSheet) {
                styleSelect.selectedIndex = i;
                continue;
            }
        }
    }

  if (!error && document.forms.post) {
    el = document.getElementById('delPassword');
    el && (el.value = get_pass('4chan_pass'));
    
    if (board != 'i' && board != 'ic' && board != 'f') {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('postFile').addEventListener('change', handleFileSelect, false);
      }
    }
  }

	//window.addEventListener('onhashchange', locationHashChanged, false);

	if( typeof extra != "undefined" && extra && !error ) extra.init();
	
	if( window.check_for_block ) checkForBlock();
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
		}
		else if (error = document.getElementById('comlenError')) {
			error.parentNode.removeChild(error);
		}
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
  var i, el, plea, nodes, s, b;
  
  if (/Mobile|Android|Dolfin|Opera Mobi|PlayStation Vita|Nintendo DS/.test(navigator.userAgent) || readCookie('pass_enabled') == 1) {
    return;
  }
  
  nodes = document.getElementsByClassName('ad-cnt');
  
  for (i = 0; el = nodes[i]; ++i) {
    if (el.offsetHeight == 0) {
      plea = document.createElement('div');
      plea.className = 'center';
      plea.innerHTML = '<div style="display:table-cell;vertical-align:middle">' + blockPlea + '</div>';
      
      s = plea.style;
      
      if (/middlead/.test(el.className)) {
        s.width = '448px';
        s.height = '60px';
        s.padding = '0 10px';
      }
      else {
        s.width = '728px';
        s.height = '90px';
      }
      
      s.display = 'table';
      
      b = '1px solid ';
      
      if (activeStyleSheet == 'Yotsuba B New') {
        b += '#34345c';
      }
      else if (activeStyleSheet == 'Yotsuba New') {
        b += '#800';
      }
      else {
        b += '#000';
      }
      
      s.border = b;
      
      el.parentNode.insertBefore(plea, el);
    }
  }
}

var currentHighlighted = null;
function enableClickableIds()
{
	var i = 0, len = 0;
	var elems = document.getElementsByClassName('posteruid');
	var capcode = document.getElementsByClassName('capcode');

	if( capcode != null ) {
		for( i = 0, len = capcode.length; i < len; i++ ) {
			capcode[i].addEventListener("click", idClick, false);
		}
	}

	if( elems == null ) return;
	for( i = 0, len = elems.length; i < len; i++ ) {
		elems[i].addEventListener("click", idClick, false);
	}
}

function idClick(evt)
{
	var i = 0, len = 0, node;
	var uid = evt.target.className == 'hand' ? evt.target.parentNode.className.match(/id_([^ $]+)/)[1] : evt.target.className.match(/id_([^ $]+)/)[1];

	// remove all .highlight classes
	var hl = document.getElementsByClassName('highlight');
	len = hl.length;
	for( i = 0; i < len; i++ ) {
		var cn = hl[0].className.toString();
		hl[0].className = cn.replace(/highlight /g, '');
	}

	if( currentHighlighted == uid ) {
		currentHighlighted = null;
		return;
	}
	currentHighlighted = uid;

	var nhl = document.getElementsByClassName('id_' + uid);
	len = nhl.length;
	for( i = 0; i < len; i++ ) {
		node = nhl[i].parentNode.parentNode.parentNode;
		if( !node.className.match(/highlight /) ) node.className = "highlight " + node.className;
	}
}

function showPostFormError(msg) {
  var el = document.getElementById('postFormError');
  
  if (msg) {
    el.innerHTML = msg;
    el.style.display = 'block';
  }
  else {
    el.textContent = '';
    el.style.display = '';
  }
}

function handleFileSelect() {
  var fsize, maxFilesize;
  
  if (this.files) {
    maxFilesize = window.maxFilesize;
    
    fsize = this.files[0].size;
    
    if (this.files[0].type == 'video/webm' && window.maxWebmFilesize) {
      maxFilesize = window.maxWebmFilesize;
    }
    
    if (fsize > maxFilesize) {
      showPostFormError('Error: Maximum file size allowed is '
        + Math.floor(maxFilesize / 1048576) + ' MB');
    }
    else {
      showPostFormError();
    }
  }
}

function locationHashChanged(e)
{
	var css = document.getElementById('id_css');

	switch( e.id )
	{
		case 'refresh_top':
			url = window.location.href.replace(/#.+/, '#top');
			if( !/top$/.test(url) ) url += '#top';
			css.innerHTML = '<meta http-equiv="refresh" content="0;URL=' + url + '">';
			document.location.reload(true);
			break;

		case 'refresh_bottom':
			url = window.location.href.replace(/#.+/, '#bottom');
			if( !/bottom$/.test(url) ) url += '#bottom';
			css.innerHTML = '<meta http-equiv="refresh" content="0;URL=' + url + '">';
			document.location.reload(true);
			break;

		default:break;
	}

	return true;

}

function setActiveStyleSheet(title, init) {
  var a, link, href, i, nodes;
  
  if( document.querySelectorAll('link[title]').length == 1 ) {
    return;
  }
  
  href = '';
  
  nodes = document.getElementsByTagName('link');
  
  for (i = 0; a = nodes[i]; i++) {
    if (a.getAttribute("title") == "switch") {
      link = a;
    }
    
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

    if( document.querySelectorAll('link[title]').length == 1 ) {
        return 'Yotsuba P';
    }

	for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
		if (a.getAttribute("title") == "switch")
               link = a;
		else if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && a.href==link.href) return a.getAttribute("title");
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
	} else expires = "";
	if (domain) domain = "; domain=" + domain;
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

// legacy
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
    window.open('//s.4cdn.org/image/country/'
      + e.target.className.match(/flag-([a-z]+)/)[1]
      + '.gif', '');
  }
}

function showPostForm(e) {
  var el;
  
  e && e.preventDefault();
  
  if (el = document.getElementById('postForm')) {
    $.id('togglePostFormLink').style.display = 'none';
    el.style.display = 'table';
    initRecaptcha();
  }
}

function oeCanvasPreview(e) {
  var t, el, sel;
  
  if (el = document.getElementById('oe-canvas-preview')) {
    el.parentNode.removeChild(el);
  }
  
  if (e.target.nodeName == 'OPTION' && e.target.value != '0') {
    t = document.getElementById('f' + e.target.value);
    
    if (!t) {
      return;
    }
    
    t = t.getElementsByTagName('img')[0];
    
    if (!t || !t.hasAttribute('data-md5')) {
      return;
    }
    
    el = t.cloneNode();
    el.id = 'oe-canvas-preview';
    sel = e.target.parentNode;
    sel.parentNode.insertBefore(el, sel.nextSibling);
  }
}

function oeClearPreview(e) {
  var el;
  
  if (el = document.getElementById('oe-canvas-preview')) {
    el.parentNode.removeChild(el);
  }
}

var PainterCore = {
  init: function() {
    var btns;
    
    if (!document.forms.post) {
      return;
    }
    
    btns = document.forms.post.getElementsByClassName('painter-ctrl')[0];
    
    if (!btns) {
      return;
    }
    
    btns = btns.getElementsByTagName('button');
    
    if (!btns[1]) {
      return;
    }
    
    this.data = null;
    
    this.btnDraw = btns[0];
    this.btnClear = btns[1];
    this.btnFile = document.getElementById('postFile');
    this.btnSubmit = document.forms.post.querySelector('input[type="submit"]');
    
    btns[0].addEventListener('click', this.onDrawClick, false);
    btns[1].addEventListener('click', this.onCancel, false);
  },
  
  onDrawClick: function() {
    var w, h, dims = this.parentNode.getElementsByTagName('input');
    
    w = +dims[0].value;
    h = +dims[1].value;
    
    if (w < 1 || h < 1) {
      return;
    }
    
    Tegaki.open({
      onDone: PainterCore.onDone,
      onCancel: PainterCore.onCancel,
      width: w,
      height: h
    });
  },
  
  // move this to tegaki.js
  b64toBlob: function(data) {
    var i, bytes, ary, bary, len;
    
    bytes = atob(data);
    len = bytes.length;
    
    ary = new Array(len);
    
    for (i = 0; i < len; ++i) {
      ary[i] = bytes.charCodeAt(i);
    }
    
    bary = new Uint8Array(ary);
    
    return new Blob([bary]);
  },
  
  onDone: function() {
    var formdata, blob;
    
    PainterCore.btnFile.disabled = true;
    PainterCore.btnClear.disabled = false;
    
    PainterCore.data = Tegaki.flatten().toDataURL('image/png');
    
    document.forms.post.addEventListener('submit', PainterCore.onSubmit, false);
  },
  
  onCancel: function() {
    PainterCore.data = null;
    
    PainterCore.btnFile.disabled = false;
    PainterCore.btnClear.disabled = true;
    
    document.forms.post.removeEventListener('submit', PainterCore.onSubmit, false);
  },
  
  onSubmit: function(e) {
    var formdata, blob, xhr;
    
    e.preventDefault();
    
    formdata = new FormData(this);
    
    blob = PainterCore.b64toBlob(PainterCore.data.slice(PainterCore.data.indexOf(',') + 1));
    
    if (blob) {
      formdata.append('upfile', blob, 'tegaki.png');
    }
    
    xhr = new XMLHttpRequest();
    xhr.open('POST', this.action, true);
    xhr.withCredentials = true;
    xhr.onerror = PainterCore.onSubmitError;
    xhr.onload = PainterCore.onSubmitDone;
    
    xhr.send(formdata);
    
    PainterCore.btnSubmit.disabled = true;
  },
  
  onSubmitError: function() {
    PainterCore.btnSubmit.disabled = false;
    showPostFormError('Connection Error.');
  },
  
  onSubmitDone: function() {
    var resp, ids, tid, pid, board;
    
    PainterCore.btnSubmit.disabled = false;
    
    if (ids = this.responseText.match(/<!-- thread:([0-9]+),no:([0-9]+) -->/)) {
      tid = +ids[1];
      pid = +ids[2];
      
      if (!tid) {
        tid = pid;
      }
      
      board = location.pathname.split(/\//)[1];
      
      window.location.href = '/' + board + '/thread/' + tid + '#p' + pid;
      
      PainterCore.onCancel();
      
      if (tid != pid) {
        PainterCore.btnClear.disabled = true;
        window.location.reload();
      }
      
      return;
    }
    
    if (resp = this.responseText.match(/"errmsg"[^>]*>(.*?)<\/span/)) {
      showPostFormError(resp[1]);
    }
  }
};

function contentLoaded() {
  var i, el, el2, nodes, len, mobileSelect, params, board, val;
  
  document.removeEventListener('DOMContentLoaded', contentLoaded, true);
  
  cloneTopNav();
  
  initAnalytics();
  
  params = location.pathname.split(/\//);
  
  board = params[1];
  
  if (params[2] == 'archive') {
    document.getElementById('arc-sort').addEventListener('click', toggleArcSort, false);
  }
  
  if (window.passEnabled) {
    setPassMsg();
  }
  
  if (window.Tegaki) {
    PainterCore.init();
  }
  
  if (el = document.getElementById('bottomReportBtn')) {
    el.addEventListener('click', onReportClick, false);
  }
  
  if (el = document.getElementById('styleSelector')) {
    el.addEventListener('change', onStyleSheetChange, false);
  }
  
  // Post form toggle
  if (el = document.getElementById('togglePostFormLink')) {
    if (el = el.firstElementChild) {
      el.addEventListener('click', showPostForm, false);
    }
    if (location.hash === '#reply') {
      showPostForm();
    }
  }
  
  // Selectable flags
  if ((el = document.forms.post) && el.flag) {
    if ((val = readCookie('4chan_flag')) && (el2 = el.querySelector('option[value="' + val + '"]'))) {
      el2.setAttribute('selected', 'selected');
    }
  }
  
  // Mobile nav menu
  buildMobileNav(board);
  
	// Mobile global message toggle
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
		for ( i = 0; i < len; i++) {
			if (mobileSelect.options[i].value == board) {
				mobileSelect.selectedIndex = i;
				continue;
			}
		}
		
		mobileSelect.addEventListener('change', onMobileSelectChange, false);
	}
	
  if (document.forms.oeform && (el = document.forms.oeform.oe_src)) {
    el.addEventListener('mouseover', oeCanvasPreview, false);
    el.addEventListener('mouseout', oeClearPreview, false);
  }
	
	if (params[2] != 'catalog') {
    // Mobile post form toggle
    nodes = document.getElementsByClassName('mobilePostFormToggle');
    
    for (i = 0; el = nodes[i]; ++i) {
      el.addEventListener('click', onMobileFormClick, false);
    }
    
    if (el = document.getElementsByName('com')[0]) {
      el.addEventListener('keydown', onComKeyDown, false);
      el.addEventListener('paste', onComKeyDown, false);
      el.addEventListener('cut', onComKeyDown, false);
    }
    
    // Mobile refresh buttons
    if (el = document.getElementById('refresh_top')) {
      el.addEventListener('mouseup', onMobileRefreshClick, false);
    }
    
    if (el = document.getElementById('refresh_bottom')) {
      el.addEventListener('mouseup', onMobileRefreshClick, false);
    }
    
    // Clickable flags
    if (board == 'int' || board == 'sp' || board == 'pol') {
      el = document.getElementById('delform');
      el.addEventListener('click', onCoreClick, false);
    }
    
    // Page switcher + Search field
    if (!params[3]) {
      nodes = document.getElementsByClassName('pageSwitcherForm');
      
      for (i = 0; el = nodes[i]; ++i) {
        el.addEventListener('submit', onPageSwitch, false);
      }
      
      if (el = document.getElementById('search-box')) {
        el.addEventListener('keydown', onKeyDownSearch, false);
      }
    }
    
    if (window.clickable_ids) {
      enableClickableIds();
    }
    
    Tip.init();
	}
	
	if (window.devicePixelRatio >= 2) {
	  setRetinaIcons();
	}
	
	initBlotter();
	
	loadBannerImage();
}

initPass();

window.onload = init;

if (window.clickable_ids) {
  document.addEventListener('4chanParsingDone', onParsingDone, false);
}

document.addEventListener('4chanMainInit', loadExtraScripts, false);
document.addEventListener('DOMContentLoaded', contentLoaded, true);

initStyleSheet();
