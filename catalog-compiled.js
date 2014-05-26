var $ = {
  id: function(a) {
    return document.getElementById(a)
  },
  cls: function(a, b) {
    return (b || document).getElementsByClassName(a)
  },
  tag: function(a, b) {
    return (b || document).getElementsByTagName(a)
  },
  extend: function(a, b) {
    for (var c in b) a[c] = b[c]
  },
  on: function(a, b, c) {
    a.addEventListener(b, c, !1)
  },
  off: function(a, b, c) {
    a.removeEventListener(b, c, !1)
  },
  readCookie: function(a) {
    var b, c, e;
    e = a + "=";
    c = document.cookie.split(";");
    for (a = 0; b = c[a]; ++a) {
      for (;
        " " == b.charAt(0);) b = b.substring(1, b.length);
      if (0 == b.indexOf(e)) return decodeURIComponent(b.substring(e.length, b.length))
    }
    return null
  }
};
document.documentElement.classList ? ($.hasClass = function(a, b) {
  return a.classList.contains(b)
}, $.addClass = function(a, b) {
  a.classList.add(b)
}, $.removeClass = function(a, b) {
  a.classList.remove(b)
}) : ($.hasClass = function(a, b) {
  return -1 != (" " + a.className + " ").indexOf(" " + b + " ")
}, $.addClass = function(a, b) {
  a.className = "" == a.className ? b : a.className + " " + b
}, $.removeClass = function(a, b) {
  a.className = (" " + a.className + " ").replace(" " + b + " ", "")
});
$.toggleClass = function(a, b) {
  $.hasClass(a, b) ? $.removeClass(a, b) : $.addClass(a, b)
};
var get_cookie = $.readCookie;

function get_pass(a) {
  var b, c;
  if (a = get_cookie(a)) return a;
  a = "";
  for (b = 0; 32 > b; b++) c = Math.floor(62 * Math.random()), a += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".substring(c, c + 1);
  return "_" + a
}
var UA = {
    init: function() {
      document.head = document.head || $.tag("head")[0];
      this.hasContextMenu = "HTMLMenuItemElement" in window;
      var a;
      try {
        localStorage.setItem("catalog", "catalog"), localStorage.removeItem("catalog"), a = !0
      } catch (b) {
        a = !1
      }
      this.hasWebStorage = a;
      var c;
      try {
        sessionStorage.setItem("catalog", "catalog"), sessionStorage.removeItem("catalog"), c = !0
      } catch (e) {
        c = !1
      }
      this.hasSessionStorage = c;
      this.hasCORS = "withCredentials" in new XMLHttpRequest
    },
    dispatchEvent: function(a, b) {
      var c = document.createEvent("Event");
      c.initEvent(a, !1, !1);
      b && (c.detail = b);
      document.dispatchEvent(c)
    }
  },
  FC = function() {
    function a() {
      var N, a, d;
      a = $.id("boardNavDesktop");
      d = $.id("boardNavDesktopFoot");
      U ? (N = document.createElement("div"), N.className = "pageJump", N.innerHTML = '<a href="#bottom">&#9660;</a><a href="javascript:void(0);" id="settingsWindowLinkClassic">Settings</a><a href="//www.4chan.org" target="_top">Home</a></div>', a.appendChild(N), $.id("settingsWindowLinkClassic").addEventListener("click", F, !1), $.addClass(a, "persistentNav")) : (a.style.display = "none", $.removeClass($.id("boardNavMobile"), "mobile"));
      d.style.display = "none";
      $.addClass(document.body, "hasDropDownNav")
    }

    function b() {
      var a, h;
      h = $.id("boardSelectMobile");
      for (a = h.options.length - 1; 0 <= a; a--)
        if (h.options[a].value == l.slug) {
          h.selectedIndex = a;
          break
        }
      $.on(h, "change", function() {
        var a = this.options[this.selectedIndex].value;
        window.location = "//boards.4chan.org/" + a + ("f" == a ? "" : "/catalog")
      });
      $.addClass(document.body, V.toLowerCase().replace(/ /g, "_"))
    }

    function c() {
      var a, h;
      a = $.id("globalMessage");
      h = $.id("toggleMsgBtn");
      "none" == a.style.display ? (a.style.display = "", h.className = "collapseIcon", h.style.opacity = "1", localStorage.removeItem("4chan-global-msg")) : (a.style.display = "none", h.className = "expandIcon", h.innerHTML = '<span class="mobile">View Important Announcement</span>', h.style.opacity = "0.5", localStorage.setItem("4chan-global-msg", a.getAttribute("data-utc")))
    }

    function e(a) {
      var h = document.getElementById("globalToggle"),
        d = document.getElementById("globalMessage");
      a.preventDefault();
      $.hasClass(h, "shown") ? ($.toggleClass(h, "shown"), d.style.display = "", h.innerHTML = "View Important Announcement") : ($.addClass(h, "shown"), d.style.display = "block", h.innerHTML = "Close Announcement")
    }

    function k(a) {
      a.preventDefault();
      if (a = document.getElementById("postForm")) this.parentNode.style.display = "none", a.style.display = "table"
    }

    function n() {
      var a = document.getElementById("postForm");
      "table" == a.style.display ? (a.style.display = "", this.textContent = "Start a New Thread") : (a.style.display = "table", this.textContent = "Close Post Form")
    }

    function p() {
      return RegExp("(\\/|\\.|\\*|\\+|\\?|\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g")
    }

    function H() {
      var a = new Date;
      a.setTime(a.getTime() + 31536E6);
      document.cookie = ia + "=" + this.value + ";" + a.toGMTString() + "; path=/; domain=4chan.org";
      ja()
    }

    function ja() {
      location.href = location.href
    }

    function Ca(a, h) {
      var d;
      return function() {
        var b = arguments,
          f = this;
        clearTimeout(d);
        d = setTimeout(function() {
          h.apply(f, b)
        }, a)
      }
    }

    function K() {
      var a, h = $.id("qf-cnt");
      $.hasClass(C, "active") ? (W(), h.style.display = "none", $.removeClass(C, "active")) : (h.style.display = "inline", a = $.id("qf-box"), h.hasAttribute("data-built") || (h.setAttribute("data-built", "1"), $.on(a, "keyup", Ca(250, ka)), $.on(a, "keydown", function(a) {
        "27" == a.keyCode && K()
      })), a.focus(), a.value = "", $.addClass(C, "active"))
    }

    function ka() {
      var a, h;
      "" != (h = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", h), sessionStorage.setItem("4chan-catalog-search-board", l.slug)), a = p(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = h, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", h = h.replace(a, "\\$1"), L = new RegExp(h, "i"), q()) : W()
    }

    function W(a) {
      var h = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      a ? (h.value = "", h.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), L = !1, q())
    }

    function Da() {
      var a, h;
      if (UA.hasWebStorage) $.on(t, "mousedown", function(d) {
        a = d.target;
        if (-1 != a.className.indexOf("thumb"))
          if (h = a.getAttribute("data-id"), 3 == d.which) t.setAttribute("contextmenu", "ctxmenu-thread"), $.id("ctxmenu-thread").target = h;
          else {
            if (1 == d.which && d.altKey) return la(h), !1;
            if (1 == d.which && d.shiftKey) return ma(h), !1
          } else 3 == d.which && t.setAttribute("contextmenu", "ctxmenu-main")
      });
      if (!v.nobinds) $.on(document, "keyup", X)
    }

    function la(a) {
      0 <= s[a] ? delete s[a] : s[a] = l.threads[a].r || 0;
      localStorage.setItem("4chan-pin-" + l.slug, JSON.stringify(s));
      q()
    }

    function ma(a) {
      Y ? (delete J[a], --x) : (J[a] = !0, ++x);
      localStorage.setItem("4chan-hide-t-" + l.slug, JSON.stringify(J));
      $.id("thread-" + a).style.display = "none";
      Z("hidden", x);
      0 == x && aa(!1)
    }

    function aa(a) {
      Y = a;
      $.id("filters-clear-hidden").textContent = $.id("filters-clear-hidden-bottom").textContent = a ? "Back" : "Show";
      q()
    }

    function Z(a, h) {
      var d = a + "-label",
        b = a + "-count";
      0 < h ? ($.id(b).textContent = $.id(b + "-bottom").textContent = h, $.id(d).style.display = $.id(d + "-bottom").style.display = "inline") : $.id(d).style.display = $.id(d + "-bottom").style.display = "none"
    }

    function Ea(a) {
      window.open("http://sys.4chan.org/" + l.slug + "/imgboard.php?mode=report&no=" + a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
    }

    function Fa(a) {
      a = a.target.getAttribute("data-cmd");
      na[a]($.id("ctxmenu-thread").target)
    }

    function X(a) {
      var h = a.target;
      if ("TEXTAREA" != h.nodeName && "INPUT" != h.nodeName && oa[a.keyCode]) oa[a.keyCode]()
    }

    function pa(a) {
      a.preventDefault();
      0 < x && ("Show" == $.id("filters-clear-hidden").textContent ? aa(!0) : aa(!1))
    }

    function Ga() {
      s = {};
      localStorage.removeItem("4chan-pin-" + l.slug);
      q();
      return !1
    }

    function Ha(a) {
      var h = a.target,
        d;
      (h = a.target) != document && ((d = h.getAttribute("data-watch")) ? ThreadWatcher.toggle(d, l.slug, l.threads[d].teaser, l.threads[d].lr.id) : "backdrop" == h.id ? ba($.id("filters")) ? ba($.id("theme")) || O() : ba($.id("filters-protip")) ? ca() : qa() : "filter-palette" == a.target.id && P())
    }

    function Ia() {
      var a = $.id("filters-protip");
      a.style.top = window.pageYOffset + 50 + "px";
      $.removeClass(a, "hidden")
    }

    function qa() {
      $.addClass($.id("filters-protip"), "hidden")
    }

    function Ja(a) {
      var h = a.target;
      if ("filters-close" == h.id) ca();
      else if ("filters-add" == h.id) $.id("filter-list").appendChild(ra({
        active: 1,
        pattern: "",
        boards: "",
        color: "",
        hidden: 0,
        top: 0,
        hits: 0
      }, Ka()));
      else if ("filters-save" == h.id) La(), ca();
      else if (h.hasAttribute("data-active")) da(h, "active");
      else if (h.hasAttribute("data-hide")) da(h, "hide", "top");
      else if (h.hasAttribute("data-top")) da(h, "top", "hide");
      else if ($.hasClass(h, "filter-color")) {
        var d;
        a = h.getBoundingClientRect();
        if (!w) {
          var b, f, c, g, e, k;
          w = $.id("filter-palette");
          b = $.id("filter-color-table");
          c = $.tag("tbody", b)[0];
          g = m.filterColors.length;
          if (0 < g)
            for (d = m.filterColors[0].length, f = $.tag("tfoot", b)[0], b = f.children.length - 1; 0 <= b; b--) f.children[b].firstElementChild.setAttribute("colspan", d);
          for (b = 0; b < g; ++b) {
            e = document.createElement("tr");
            for (f = 0; f < d; ++f) k = document.createElement("td"), k.innerHTML = '<span class="button clickbox" style="background:' + m.filterColors[b][f] + '"></span>', $.on(k.firstElementChild, "click", ea), e.appendChild(k);
            c.appendChild(e)
          }
        }
        $.removeClass(w, "hidden");
        w.setAttribute("data-target", h.id.split("-")[2]);
        d = w.firstElementChild;
        d.style.cssText = "top:" + a.top + "px;left:" + (a.left - d.clientWidth - 10) + "px;"
      } else h.hasAttribute("data-target") ? (a = $.id("filter-" + h.getAttribute("data-target")), a.parentNode.removeChild(a)) : h.hasAttribute("data-up") && (a = h.parentNode.parentNode, (d = a.previousElementSibling) && a.parentNode.insertBefore(a, d))
    }

    function Ma() {
      var a, b, d, c, f, e;
      b = $.id("filters");
      b.hasAttribute("data-built") || ($.on(b, "click", Ja), $.on($.id("filter-palette-close"), "click", P), $.on($.id("filter-palette-clear"), "click", Na), $.on($.id("filters-help-open"), "click", Ia), $.on($.id("filters-help-close"), "click", qa), $.on($.id("filter-rgb"), "keyup", Oa), $.on($.id("filter-rgb-ok"), "click", ea), b.setAttribute("data-built", "1"));
      d = localStorage.getItem("catalog-filters");
      f = 0;
      if (d) {
        c = $.id("filter-list");
        d = JSON.parse(d);
        for (a in d) c.appendChild(ra(d[a], f)), ++f;
        sa()
      }
      b.style.top = window.pageYOffset + 60 + "px";
      $.removeClass(b, "hidden");
      (e = $.cls("filter-active", b)[0]) && e.focus();
      Q()
    }

    function ca() {
      var a, b, d;
      $.id("filters-msg").style.display = "none";
      $.addClass($.id("filters"), "hidden");
      b = $.id("filter-list");
      d = $.tag("tr", b);
      for (a = d.length - 1; 0 <= a; a--) b.removeChild(d[a]);
      P();
      Q()
    }

    function P() {
      w && !$.hasClass(w, "hidden") && $.addClass(w, "hidden")
    }

    function ta() {
      if (UA.hasWebStorage) {
        G = {};
        var a = localStorage.getItem("catalog-filters");
        if (a) {
          var a = JSON.parse(a),
            b, d, c, f, e, g = /^\/(.*)\/(i?)$/,
            k = /\s*\|+\s*/g,
            m = /\\\*/g,
            n = p(),
            t, s, q, r, u, v, x, y;
          try {
            for (d in a)
              if (b = a[d], b.active && "" != b.pattern && (!b.boards || -1 != b.boards.split(" ").indexOf(l.slug))) {
                r = b.pattern;
                if ("#" == r.charAt(0)) y = "#" == r.charAt(1) ? 2 : 1, u = new RegExp(r.slice(y).replace(n, "\\$1"));
                else if (y = 0, t = r.match(g)) u = new RegExp(t[1], t[2]);
                else if ('"' == r.charAt(0) && '"' == r.charAt(r.length - 1)) u = new RegExp(r.slice(1, -1).replace(n, "\\$1"));
                else {
                  q = r.replace(k, "|").split(" ");
                  u = "";
                  e = q.length;
                  for (f = 0; f < e; ++f)
                    if (-1 != q[f].indexOf("|")) {
                      v = q[f].split("|");
                      x = [];
                      for (c = v.length - 1; 0 <= c; c--) "" != v[c] && x.push(v[c].replace(n, "\\$1"));
                      s = x.join("|").replace(m, "[^\\s]*");
                      u += "(?=.*\\b(" + s + ")\\b)"
                    } else s = q[f].replace(n, "\\$1").replace(m, "[^\\s]*"), u += "(?=.*\\b" + s + "\\b)";
                  u = new RegExp("^" + u, "i")
                }
                G[d] = {
                  type: y,
                  pattern: u,
                  boards: b.boards,
                  fid: d,
                  hidden: b.hidden,
                  color: b.color,
                  top: b.top,
                  hits: 0
                }
              }
          } catch (w) {
            alert("There was an error processing one of the filters: " +
              w + " in: " + b.pattern)
          }
        }
      }
    }

    function La() {
      var a, b, d, c, f, e;
      c = {};
      e = $.id("filter-list").children;
      for (a = 0; b = e[a]; ++a) d = {
        active: $.cls("filter-active", b)[0].checked ? 1 : 0,
        pattern: $.cls("filter-pattern", b)[0].value,
        boards: $.cls("filter-boards", b)[0].value,
        hidden: $.cls("filter-hide", b)[0].checked ? 1 : 0,
        top: $.cls("filter-top", b)[0].checked ? 1 : 0
      }, b = $.cls("filter-color", b)[0], b.hasAttribute("data-nocolor") || (d.color = b.style.backgroundColor), c[a] = d;
      c[0] ? localStorage.setItem("catalog-filters", JSON.stringify(c)) : localStorage.removeItem("catalog-filters");
      f = $.id("filters-msg");
      f.innerHTML = "Done";
      f.className = "msg-ok";
      f.style.display = "inline";
      setTimeout(function() {
        f.style.display = "none"
      }, 2E3);
      ta();
      q();
      sa()
    }

    function Oa() {
      $.id("filter-rgb-ok").style.backgroundColor = this.value
    }

    function ra(a, b) {
      var d, c, f;
      c = document.createElement("tr");
      c.id = "filter-" + b;
      d = document.createElement("td");
      f = document.createElement("span");
      f.setAttribute("data-up", b);
      f.className = "pointer";
      f.innerHTML = "&uarr;";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.active;
      f.className = "filter-active";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("input");
      f.type = "text";
      f.value = a.pattern;
      f.className = "filter-pattern";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("input");
      f.type = "text";
      f.value = a.boards;
      f.className = "filter-boards";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("span");
      f.id = "filter-color-" +
        b;
      f.title = "Change Color";
      f.className = "button clickbox filter-color";
      a.color ? f.style.background = a.color : (f.setAttribute("data-nocolor", "1"), f.innerHTML = "&#x2215;");
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.hidden;
      f.className = "filter-hide";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.top;
      f.className = "filter-top";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("span");
      f.setAttribute("data-target", b);
      f.className = "pointer";
      f.innerHTML = "&times;";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      d.id = "fhc-" + b;
      d.className = "filter-hits";
      c.appendChild(d);
      return c
    }

    function ea(a) {
      var b = $.id("filter-color-" + w.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background = this.style.backgroundColor);
      P()
    }

    function Na() {
      ea(!0)
    }

    function Ka() {
      var a, b, d, c = $.id("filter-list").children;
      if (c.length) {
        for (a = d = 0; b = c[a]; ++a) b = +b.id.slice(7), b > d && (d = b);
        return d + 1
      }
      return 0
    }

    function da(a, b, d) {
      b = "data-" + b;
      "0" == a.getAttribute(b) ? (a.setAttribute(b, "1"), $.addClass(a, "active"), a.innerHTML = "&#x2714;", d && (a = $.cls("filter-" + d, a.parentNode.parentNode)[0], a.setAttribute("data-" + d, "0"), $.removeClass(a, "active"), a.innerHTML = "")) : (a.setAttribute(b, "0"), $.removeClass(a, "active"), a.innerHTML = "")
    }

    function sa() {
      var a, b, d = $.id("filter-list").children;
      for (a = 0; b = d[a]; ++a) $.id("fhc-" + b.id.slice(7)).innerHTML = G[a] ? "x" + G[a].hits : ""
    }

    function ba(a) {
      return $.hasClass(a, "hidden")
    }

    function F() {
      var a, b;
      UA.hasWebStorage ? (a = $.id("theme"), theme = (theme = localStorage.getItem("catalog-theme")) ? JSON.parse(theme) : {}, $.id("theme-nobinds").checked = !!theme.nobinds, $.id("theme-nospoiler").checked = !!theme.nospoiler, $.id("theme-newtab").checked = !!theme.newtab, $.id("theme-tw").checked = M, $.id("theme-ddn").checked = R, theme.css && ($.id("theme-css").value = theme.css), $.on($.id("theme-save"), "click", ua), $.on($.id("theme-close"), "click", O), $.id("theme-msg").style.display = "none", a.style.top = window.pageYOffset + 60 + "px", $.removeClass(a, "hidden"), (b = $.tag("input", a)[0]) && b.focus(), Q()) : alert("Your browser doesn't support Local Storage")
    }

    function O() {
      $.off($.id("theme-save"), "click", ua);
      $.off($.id("theme-close"), "click", O);
      $.addClass($.id("theme"), "hidden");
      Q()
    }

    function Q() {
      $.toggleClass($.id("backdrop"), "hidden")
    }

    function va(a, b) {
      if (a.nobinds) v.nobinds != a.nobinds && $.off(document, "keyup", X);
      else if (v.nobinds != a.nobinds) $.on(document, "keyup", X);
      b || S.applyCSS(a)
    }

    function ua() {
      var b, c, d, e, f = {};
      $.id("theme-nobinds").checked && (f.nobinds = !0);
      $.id("theme-nospoiler").checked && (f.nospoiler = !0);
      $.id("theme-newtab").checked && (f.newtab = !0);
      c = $.id("theme-tw").checked;
      d = $.id("theme-ddn").checked;
      e = (e = localStorage.getItem("4chan-settings")) ? JSON.parse(e) : {};
      e.threadWatcher = c;
      e.dropDownNav = d;
      localStorage.setItem("4chan-settings", JSON.stringify(e));
      c != M && (c ? ThreadWatcher.init() : ThreadWatcher.unInit());
      if (d != R)
        if (d) a();
        else {
          var k, g;
          k = $.id("boardNavDesktop");
          g = $.id("boardNavDesktopFoot");
          if (U) {
            if (e = $.cls("pageJump", k)) $.id("settingsWindowLinkClassic").removeEventListener("click", F, !1), k.removeChild(e);
            $.removeClass(k, "persistentNav")
          } else k.style.display = "", $.addClass($.id("boardNavMobile"), "mobile");
          g.style.display = "";
          $.removeClass(document.body, "hasDropDownNav")
        }
      M = c;
      R = d;
      "" != (c = $.id("theme-css").value) && (f.css = c);
      va(f);
      localStorage.removeItem("catalog-theme");
      for (b in f) {
        localStorage.setItem("catalog-theme", JSON.stringify(f));
        break
      }
      v = f;
      q();
      O()
    }

    function wa(a) {
      var b, d, c = !1,
        f = l.order.date[0];
      if (d = localStorage.getItem(a)) {
        d = JSON.parse(d);
        for (b in d)!l.threads[b] && b < f && (delete d[b], c = !0);
        for (b in d) return c && localStorage.setItem(a, JSON.stringify(d)), d;
        localStorage.removeItem(a)
      }
      return {}
    }

    function fa() {
      var a, b, d;
      if (UA.hasWebStorage) {
        d = {};
        for (a = xa.length - 1; 0 <= a; a--) b = xa[a], d[b] = m[b];
        localStorage.setItem("catalog-settings", JSON.stringify(d))
      }
    }

    function ya(a, b) {
      var d = "";
      a ? ($teaserCtrl.selectedIndex = 1, d = "extended-", m.extended = !0) : ($teaserCtrl.selectedIndex = 0, m.extended = !1);
      d = m.large ? d + "large" : d + "small";
      t.className = d;
      b || fa()
    }

    function za(a, b) {
      var d = m.extended ? "extended-" : "";
      a ? (D.selectedIndex = 1, d += "large", m.large = !0) : (D.selectedIndex = 0, d += "small", m.large = !1);
      t.className = d;
      b || (fa(), q())
    }

    function A(a, b) {
      var d = {
        alt: 0,
        absdate: 1,
        date: 2,
        r: 3
      };
      void 0 !== d[a] ? (z.selectedIndex = d[a], m.orderby = a) : (z.selectedIndex = 0, m.orderby = "date");
      b || (fa(), q())
    }

    function Pa() {
      ya("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Qa() {
      A(z.options[z.selectedIndex].value)
    }

    function Ra() {
      za("large" == D.options[D.selectedIndex].value)
    }

    function q() {
      var a, b, d, c, f, e, g, k, n, p, q, w, H = 0,
        r = "",
        u = 0,
        C, D, y, A = "",
        z, B, E, I, F;
      if (0 != l.count) {
        w = l.custom_spoiler ? m.imgspoiler + "-" + l.slug + l.custom_spoiler + ".png" : m.imgspoiler + ".png";
        t.hasChildNodes() && ((a = document.getElementById("th-tip")) && document.body.removeChild(a), t.textContent = "");
        q = "//boards.4chan.org/" + l.slug + "/thread/";
        C = ".t.4cdn.org/" + l.slug + "/";
        x = 0;
        for (c in G) G[c].hits = 0;
        F = !m.large;
        D = v.newtab ? 'target="_blank" ' : "";
        a = 0;
        a: for (; a < l.count; ++a) {
          f = l.order[m.orderby][a];
          e = l.threads[f];
          k = n = p = !1;
          e.sub ? (y = "<b>" + e.sub + "</b>", e.teaser && (y += ": " + e.teaser)) : y = e.teaser;
          if (Y) {
            if (!J[f]) continue;
            ++x
          } else if (!L) {
            if (J[f]) {
              ++x;
              continue
            }
            if (0 <= s[f]) p = n = !0;
            else
              for (c in d = e.capcode ? (e.trip || "") + "!#" + e.capcode : e.trip, G)
                if (g = G[c], 0 == g.type && g.pattern.test(y) || 1 == g.type && g.pattern.test(d) || 2 == g.type && g.pattern.test(e.author)) {
                  if (g.hidden) {
                    ++H;
                    g.hits += 1;
                    continue a
                  }
                  k = g;
                  n = !!g.top;
                  g.hits += 1;
                  break
                }
          } else if (!L.test(y)) continue;
          u = 0 === u ? 1 : 0;
          g = '<div id="thread-' + f + '" class="thread">';
          M && (d = f + "-" + l.slug, g += '<span id="leaf-' + f + '" data-watch="' + f + '" ' + (ThreadWatcher.watched[d] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          g += "<a " + D + 'href="' + q + f + (e.semantic_url ? "/" + e.semantic_url : "") + '"><img alt="" id="thumb-' + f + '" class="thumb';
          d = k.color ? ' hl" style="border-color: ' + k.color : p ? " pinned" : "";
          e.imgurl ? e.imgspoiler && !v.nospoiler ? g += d + '" src="' + w : (E = e.tn_w, I = e.tn_h, F && (B = m.smallsize, E > B && (z = B / E, E = B, I *= z), I > B && (z = B / I, I = B, E *= z)), g += d + '" width="' + E + '" height="' + I + '" src="//' + u + C + e.imgurl + "s.jpg") : g = e.imgdel ? g + (" imgdel" + d + '" src="' + m.imgdel) : g + (" nofile" + d + '" src="' + m.nofile);
          g += '" data-id="' + f + '" /></a>';
          if (e.sticky || e.closed || e.capcodereps) {
            g += '<div class="threadIcons">';
            e.sticky && (g += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            e.closed && (g += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (e.capcodereps)
              for (z = e.capcodereps.split(","), d = 0; B = z[d]; ++d)
                if (E = Sa[B]) g += '<span title="' + E + ' Replies" class="threadIcon ' + B + 'Icon"></span>';
            g += "</div>"
          }
          g += '<div title="(R)eplies / (I)mages' + (n ? " / (P)age" : "") + '" id="meta-' + f + '" class="meta">';
          e.r && (g = e.bumplimit ? g + ("<i>R: <b>" + e.r + "</b></i>") : g + ("R: <b>" + e.r + "</b>"), p && (p = e.r - s[f], 0 < p ? (g += " (+" + p + ")", s[f] = e.r) : g += "(+0)"), e.i && (g = e.imagelimit ? g + (" / <i>I: <b>" + e.i + "</b></i>") : g + (" / I: <b>" + e.i + "</b>")));
          n && 0 <= (page = 0 | l.order.alt.indexOf(f) / l.pagesize) && (e.r && (g += " / "), g += "P: <b>" + page + "</b>");
          g += "</div>";
          y && (g += '<div class="teaser', k.color && (g += ' style="color:' + k.color), g += '">' + y + "</div>");
          n ? A += g + "</div>" : r += g + "</div>"
        }
        r = L && "" == r ? '<div class="error">Nothing Found</div>' : A ? A + r + '<div class="clear"></div>' : r + '<div class="clear"></div>';
        for (b in s) {
          localStorage.setItem("4chan-pin-" + l.slug, JSON.stringify(s));
          break
        }
        t.innerHTML = r;
        Z("filtered", H);
        Z("hidden", x)
      }
    }

    function Ta(a) {
      a = a.target;
      $.hasClass(a, "thumb") && (clearTimeout(ha), T && Aa(), ha = setTimeout(Ua, m.tipdelay, a))
    }

    function Va(a) {
      clearTimeout(ha);
      T && Aa()
    }

    function Ua(a) {
      var b, d, c, f;
      b = Date.now() / 1E3;
      f = a.getBoundingClientRect();
      c = document.documentElement.offsetWidth;
      thread = l.threads[a.getAttribute("data-id")];
      d = thread.sub ? '<span class="post-subject">' + thread.sub + "</span>" : "Posted";
      d += ' by <span class="' + (thread.capcode ? thread.capcode + "-capcode " : "") + 'post-author">' + (thread.author || l.anon);
      thread.trip && (d += ' <span class="post-tripcode">' + thread.trip + "</span>");
      thread.capcode && (d += " ## " + thread.capcode.charAt(0).toUpperCase() + thread.capcode.slice(1));
      d += "</span> ";
      l.flags && thread.country && (d += '<div class="flag flag-' + thread.country.toLowerCase() + '"></div> ');
      d += '<span class="post-ago">' + Ba(b - thread.date) + " ago</span>";
      !m.extended && thread.teaser && (d += '<p class="post-teaser">' + thread.teaser + "</p>");
      0 < thread.r && (d += '<div class="post-last">Last reply by <span class="' + (thread.lr.capcode ? thread.lr.capcode + "-capcode " : "") + 'post-author">' + thread.lr.author, thread.lr.trip && (d += ' <span class="post-tripcode">' + thread.lr.trip + "</span>"), thread.lr.capcode && (d += " ## " + thread.lr.capcode.charAt(0).toUpperCase() +
        thread.lr.capcode.slice(1)), d += '</span> <span class="post-ago">' + Ba(b - thread.lr.date) + " ago</span>");
      b = document.createElement("div");
      b.id = "post-preview";
      b.innerHTML = d;
      document.body.appendChild(b);
      d = b.style;
      c - f.right < (0 | .3 * c) ? (c -= f.left, d.right = c + 5 + "px") : (c = f.left + f.width, d.left = c + 5 + "px");
      d.top = f.top + a.offsetHeight + window.pageYOffset - b.offsetHeight / 2 - f.height / 2 + "px";
      T = !0
    }

    function Aa() {
      document.body.removeChild($.id("post-preview"));
      T = !1
    }

    function Ba(a, b) {
      var d, c;
      if (2 > a) return "less than a second";
      if (b && 300 > a || 60 > a) return (0 | a) + " seconds";
      if (3600 > a) return d = 0 | a / 60, 1 < d ? d + " minutes" : "one minute";
      if (86400 > a) return d = 0 | a / 3600, c = 1 < d ? d + " hours" : "one hour", d = 0 | a / 60 - 60 * d, 1 < d && (c += " and " + d + " minutes"), c;
      d = 0 | a / 86400;
      c = 1 < d ? d + " days" : "one day";
      d = 0 | a / 3600 - 24 * d;
      1 < d && (c += " and " + d + " hours");
      return c
    }
    var S = this,
      m = {
        orderby: "alt",
        large: !1,
        extended: !0,
        imgdel: "//s.4cdn.org/image/filedeleted-res.gif",
        imgspoiler: "//s.4cdn.org/image/spoiler",
        nofile: "//s.4cdn.org/image/nofile.png",
        smallsize: 150,
        tipdelay: 250,
        filterColors: [
          ["#E0B0FF", "#F2F3F4", "#7DF9FF", "#FFFF00"],
          ["#FBCEB1", "#FFBF00", "#ADFF2F", "#0047AB"],
          ["#00A550", "#007FFF", "#AF0A0F", "#B5BD68"]
        ]
      },
      Sa = {
        admin: "Administrator",
        mod: "Moderator",
        developer: "Developer",
        manager: "Manager"
      },
      oa = {
        83: function() {
          $.hasClass(C, "active") ? W(!0) : K()
        },
        82: ja,
        88: function() {
          "date" == m.orderby ? A("alt") : "alt" == m.orderby ? A("r") : "r" == m.orderby ? A("absdate") : A("date")
        }
      },
      l = {},
      xa = ["orderby", "large", "extended"],
      v = {},
      ia, V, G = {},
      T = !1,
      ha = null,
      s = {},
      J = {},
      x = 0,
      M = !1,
      R = !1,
      U = !1,
      L = !1,
      Y = !1,
      t, C, D, z, w, na;
    2 <= window.devicePixelRatio && (m.imgdel.replace(".", "@2x."), m.nofile.replace(".", "@2x."));
    UA.init();
    (function() {
      var a;
      UA.hasWebStorage && (a = localStorage.getItem("catalog-theme")) && (v = JSON.parse(a))
    })();
    (function() {
      var a = $.readCookie("extra_path");
      a && /^[a-z0-9]+$/.test(a) && document.write('<script type="text/javascript" src="https://s.4cdn.org/js/' + a + "." + window.jsVersion + '.js">\x3c/script>')
    })();
    initPass();
    S.init = function() {
      var b, h, d;
      FC.hasMobileLayout = checkMobileLayout();
      buildMobileNav();
      va(v, !0);
      t = $.id("threads");
      C = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      D = $.id("size-ctrl");
      z = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(C, "click", K);
      $.on($.id("filters-clear-hidden"), "click", pa);
      $.on($.id("filters-clear-hidden-bottom"), "click", pa);
      $.on($.id("qf-clear"), "click", K);
      $.on($.id("settingsWindowLink"), "click", F);
      $.on($.id("settingsWindowLinkBot"), "click", F);
      $.on($.id("settingsWindowLinkMobile"), "click", F);
      $.on($.id("filters-ctrl"), "click", Ma);
      $.on($teaserCtrl, "change", Pa);
      $.on(D, "change", Ra);
      $.on(z, "change", Qa);
      $.on(t, "mouseover", Ta);
      $.on(t, "mouseout", Va);
      $.on($.id("togglePostFormLink").firstElementChild, "click", k);
      $.on($.id("togglePostFormLinkMobile"), "click", n);
      $.on(document, "click", Ha);
      $.on(window, "load", checkForBlock);
      var l;
      UA.hasWebStorage && (l = localStorage.getItem("catalog-settings")) && $.extend(m, JSON.parse(l));
      Da();
      var f, p, g;
      if (UA.hasWebStorage && (f = $.id("globalMessage")) && f.textContent && (f.nextElementSibling.style.clear = "both", l = document.createElement("span"), l.id = "toggleMsgBtn", l.setAttribute("data-cmd", "toggleMsg"), l.title = "Toggle announcement", g = localStorage.getItem("4chan-global-msg"), p = f.getAttribute("data-utc"), g && p <= g ? (f.style.display = "none", l.style.opacity = "0.5", l.className = "expandIcon") : l.className = "collapseIcon", $.on(l, "click", c), f.parentNode.insertBefore(l, f), l = $.id("globalToggle"), 0 < l.offsetWidth)) $.on(l, "click", e);
      initBlotter();
      !window.passEnabled && window.preupload_captcha && "FormData" in window && document.forms.post.addEventListener("submit", onPostSubmit, !1);
      UA.hasContextMenu && (na = {
        pin: la,
        hide: ma,
        report: Ea
      }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>', $.on($.id("ctxmenu-main"), "click", Ga), $.on($.id("ctxmenu-thread"), "click", Fa));
      UA.hasWebStorage && (b = localStorage.getItem("4chan-settings")) && (b = JSON.parse(b), !b.disableAll && b.threadWatcher && (M = !0, ThreadWatcher.init()), b.customMenu && CustomMenu.apply(b.customMenuList), !1 === b.dropDownNav || FC.hasMobileLayout || (R = !0, U = b.classicNav, a()));
      window.passEnabled && setPassMsg();
      (h = document.forms.post.flag) && (d = $.readCookie("4chan_flag")) && (h = h.querySelector('option[value="' + d + '"]')) && h.setAttribute("selected", "selected");
      A(m.orderby, !0);
      za(m.large, !0);
      ya(m.extended, !0);
      loadBannerImage()
    };
    S.loadCatalog = function(a) {
      var c;
      l = a;
      b();
      var d, e, f;
      d = $.id("styleSelector");
      e = d.children;
      for (a = 0; f = e[a]; ++a) f.value == V && (d.selectedIndex = a);
      $.on(d, "change", H);
      ta();
      UA.hasWebStorage && (J = wa("4chan-hide-t-" + l.slug), s = wa("4chan-pin-" + l.slug));
      UA.hasSessionStorage && !location.hash && (c = sessionStorage.getItem("4chan-catalog-search")) ? l.slug != sessionStorage.getItem("4chan-catalog-search-board") && (sessionStorage.removeItem("4chan-catalog-search"), sessionStorage.removeItem("4chan-catalog-search-board"), c = null) : location.hash && (c = location.hash.match(/#s=(.+)/)) && (c = decodeURIComponent(c[1].replace(/\+/g, " ")));
      c ? (K(), $.id("qf-box").value = c, ka()) : q()
    };
    S.applyCSS = function(a, b, d) {
      var c, e;
      a || (a = v);
      void 0 !== b && ((e = $.readCookie(b)) || (e = "nws_style" == b ? "Yotsuba New" : "Yotsuba B New"), ia = b, V = e, c = document.createElement("link"), c.type = "text/css", c.id = "base-css", c.rel = "stylesheet", c.setAttribute("href", "//s.4cdn.org/css/catalog_" + e.toLowerCase().replace(/ /g, "_") + "." + d + ".css"), document.head.insertBefore(c, $.id("mobile-css")));
      (c = $.id("custom-css")) && document.head.removeChild(c);
      a.css && (c = document.createElement("style"), c.type = "text/css", c.id = "custom-css", c.styleSheet ? c.styleSheet.cssText = a.css : c.innerHTML = a.css, document.head.appendChild(c));
      UA.dispatchEvent("4chanMainInit")
    }
  },
  ThreadWatcher = {
    init: function() {
      var a, b;
      this.listNode = null;
      this.charLimit = 45;
      this.watched = {};
      this.isRefreshing = !1;
      a = document.createElement("div");
      a.id = "threadWatcher";
      a.setAttribute("data-trackpos", "TW-position");
      (b = localStorage.getItem("catalog-tw-pos")) ? a.style.cssText = b : (a.style.left = "10px", a.style.top = "75px");
      a.innerHTML = '<div class="drag" id="twHeader">Thread Watcher' +
        (UA.hasCORS ? '<div id="twPrune" class="icon refreshIcon" title="Refresh"></div></div>' : "</div>");
      this.listNode = document.createElement("ul");
      this.listNode.id = "watchList";
      this.load();
      this.build();
      a.appendChild(this.listNode);
      document.body.appendChild(a);
      a.addEventListener("mouseup", this.onClick, !1);
      Draggable.set($.id("twHeader"));
      window.addEventListener("storage", this.syncStorage, !1);
      this.canAutoRefresh() && this.refresh()
    },
    unInit: function() {
      var a;
      if (a = $.id("threadWatcher")) a.removeEventListener("mouseup", this.onClick, !1), Draggable.unset($.id("twHeader")), window.removeEventListener("storage", this.syncStorage, !1), document.body.removeChild(a)
    },
    syncStorage: function(a) {
      var b;
      a.key && (b = a.key.split("-"), "4chan" == b[0] && "watch" == b[1] && a.newValue != a.oldValue && (ThreadWatcher.load(), ThreadWatcher.build()))
    },
    load: function() {
      if (storage = localStorage.getItem("4chan-watch")) this.watched = JSON.parse(storage)
    },
    build: function() {
      var a, b, c;
      a = "";
      for (c in this.watched) b = c.split("-"), a += '<li id="watch-' + c + '"><span class="pointer" data-cmd="unwatch" data-id="' +
        b[0] + '" data-board="' + b[1] + '">&times;</span> <a href="' + this.linkToThread(b[0], b[1], this.watched[c][1]) + '"', a = -1 == this.watched[c][1] ? a + ' class="deadlink">' : this.watched[c][2] ? a + (' class="hasNewReplies">(' + this.watched[c][2] + ") ") : a + ">", a += "/" + b[1] + "/ - " + this.watched[c][0] + "</a></li>";
      ThreadWatcher.listNode.innerHTML = a
    },
    onClick: function(a) {
      a = a.target;
      a.hasAttribute("data-id") ? ThreadWatcher.toggle(a.getAttribute("data-id"), a.getAttribute("data-board")) : "twPrune" != a.id || ThreadWatcher.isRefreshing || ThreadWatcher.refresh()
    },
    toggle: function(a, b, c, e) {
      var k;
      b = a + "-" + b;
      k = $.id("leaf-" + a);
      this.watched[b] ? (delete this.watched[b], k && (k.className = "watchIcon", k.title = "Watch")) : (c = c ? c.replace(/<[^>]*?>/g, "").slice(0, this.charLimit) : "No." + a, this.watched[b] = [c, e || a, 0], k.className = "unwatchIcon", k.title = "Unwatch");
      this.save();
      this.load();
      this.build()
    },
    save: function() {
      ThreadWatcher.sortByBoard();
      localStorage.setItem("4chan-watch", JSON.stringify(ThreadWatcher.watched))
    },
    sortByBoard: function() {
      var a, b, c, e, k;
      b = ThreadWatcher;
      e = {};
      k = [];
      for (c in b.watched) k.push(c);
      k.sort(function(a, b) {
        a = a.split("-")[1];
        b = b.split("-")[1];
        return a < b ? -1 : a > b ? 1 : 0
      });
      for (a = 0; c = k[a]; ++a) e[c] = b.watched[c];
      b.watched = e
    },
    canAutoRefresh: function() {
      var a;
      return (a = localStorage.getItem("4chan-tw-timestamp")) ? 6E4 <= Date.now() - +a : !1
    },
    setRefreshTimestamp: function() {
      localStorage.setItem("4chan-tw-timestamp", Date.now())
    },
    refresh: function() {
      var a, b, c, e, k;
      if (e = $.id("watchList").children.length)
        for (c in a = b = 0, k = $.id("twPrune"), k.className = "icon rotateIcon", ThreadWatcher.isRefreshing = !0, ThreadWatcher.setRefreshTimestamp(), ThreadWatcher.watched) setTimeout(ThreadWatcher.fetch, b, c, ++a == e ? k : null), b += 200
    },
    onRefreshEnd: function(a) {
      a.className = "icon refreshIcon";
      this.isRefreshing = !1;
      this.save();
      this.load();
      this.build()
    },
    parseThreadJSON: function(a) {
      var b;
      try {
        b = JSON.parse(a).posts
      } catch (c) {
        console.log(c), b = []
      }
      return b
    },
    fetch: function(a, b) {
      var c, e;
      c = $.id("watch-" + a);
      if (-1 == ThreadWatcher.watched[a][1]) {
        if (delete ThreadWatcher.watched[a], c.parentNode.removeChild(c), b) ThreadWatcher.onRefreshEnd(b)
      } else c = a.split("-"), e = new XMLHttpRequest, e.onload = function() {
        var c, e, p, H;
        if (200 == this.status) {
          p = ThreadWatcher.parseThreadJSON(this.responseText);
          H = ThreadWatcher.watched[a][1];
          e = 0;
          for (c = p.length - 1; 1 <= c && !(p[c].no <= H); c--)++e;
          e > ThreadWatcher.watched[a][2] && (ThreadWatcher.watched[a][2] = e)
        } else 404 == this.status && (ThreadWatcher.watched[a][1] = -1); if (b) ThreadWatcher.onRefreshEnd(b)
      }, b && (e.onerror = e.onload), e.open("GET", "//a.4cdn.org/" + c[1] + "/res/" + c[0] + ".json"), e.send(null)
    },
    linkToThread: function(a, b, c) {
      return "//" + location.host + "/" + b + "/res/" + a + (0 < c ? "#p" + c : "")
    }
  },
  Draggable = {
    el: null,
    key: null,
    scrollX: null,
    scrollY: null,
    dx: null,
    dy: null,
    right: null,
    bottom: null,
    set: function(a) {
      a.addEventListener("mousedown", Draggable.startDrag, !1)
    },
    unset: function(a) {
      a.removeEventListener("mousedown", Draggable.startDrag, !1)
    },
    startDrag: function(a) {
      var b, c, e;
      if (!this.parentNode.hasAttribute("data-shiftkey") || a.shiftKey) a.preventDefault(), b = Draggable, c = document.documentElement, b.el = this.parentNode, b.key = b.el.getAttribute("data-trackpos"), e = b.el.getBoundingClientRect(), b.dx = a.clientX - e.left, b.dy = a.clientY - e.top, b.right = c.clientWidth - e.width, b.bottom = c.clientHeight - e.height, "fixed" != getComputedStyle(b.el, null).position ? (b.scrollX = window.scrollX || window.pageXOffset, b.scrollY = window.scrollY || window.pageYOffset) : b.scrollX = b.scrollY = 0, document.addEventListener("mouseup", b.endDrag, !1), document.addEventListener("mousemove", b.onDrag, !1)
    },
    endDrag: function(a) {
      document.removeEventListener("mouseup", Draggable.endDrag, !1);
      document.removeEventListener("mousemove", Draggable.onDrag, !1);
      Draggable.key && localStorage.setItem("catalog-tw-pos", Draggable.el.style.cssText);
      delete Draggable.el
    },
    onDrag: function(a) {
      var b, c;
      b = a.clientX - Draggable.dx + Draggable.scrollX;
      a = a.clientY - Draggable.dy + Draggable.scrollY;
      c = Draggable.el.style;
      1 > b ? (c.left = "0", c.right = "") : Draggable.right < b ? (c.left = "", c.right = "0") : (c.left = b / document.documentElement.clientWidth * 100 + "%", c.right = "");
      1 > a ? (c.top = "0", c.bottom = "") : Draggable.bottom < a ? (c.bottom = "0", c.top = "") : (c.top = a / document.documentElement.clientHeight * 100 + "%", c.bottom = "")
    }
  };

function onCaptchaReady() {
  var a;
  if (a = document.getElementById("recaptcha_image")) a.title = "Reload", a.addEventListener("click", onCaptchaClick, !1), a = document.getElementsByClassName("recaptcha_image_cell")[0], a.style.cssText = "padding: 0 0 3px !important", a = document.getElementById("recaptcha_image"), a.style.cssText = "border: 1px solid #aaa !important", a = document.getElementById("recaptcha_response_field"), a.setAttribute("placeholder", "Type the text (Required)"), a.removeAttribute("style")
}

function onCaptchaClick(a) {
  Recaptcha.reload("t")
}

function setPassMsg() {
  var a;
  a = document.getElementById("captchaFormPart").children[1];
  a.innerHTML = '<div style="padding: 5px;">You are using a 4chan Pass. [<a href="https://sys.4chan.org/auth?act=logout" onclick="confirmPassLogout(event);" tabindex="-1">Logout</a>]</div>';
  a.removeAttribute("style")
}
var CustomMenu = {
  reset: function() {
    var a, b, c, e, k;
    c = $.cls("boardList");
    e = $.cls("customBoardList");
    k = $.cls("show-all-boards");
    for (a = 0; b = k[a]; ++a) b.removeEventListener("click", CustomMenu.reset, !1);
    for (a = e.length - 1; b = e[a]; a--) c[a].style.display = null, b.parentNode.removeChild(b)
  },
  apply: function(a) {
    var b, c, e;
    if (a) {
      e = a.split(/[^0-9a-z]/i);
      cnt = document.createElement("span");
      cnt.className = "customBoardList";
      for (a = 0; c = e[a]; ++a) a ? cnt.appendChild(document.createTextNode(" / ")) : cnt.appendChild(document.createTextNode("[")), b = document.createElement("a"), b.textContent = c, b.href = "//boards.4chan.org/" + c + ("f" !== c ? "/catalog" : ""), cnt.appendChild(b);
      cnt.appendChild(document.createTextNode("]"));
      cnt.appendChild(document.createTextNode(" ["));
      b = document.createElement("a");
      b.textContent = "\u2026";
      b.title = "Show all";
      b.className = "show-all-boards pointer";
      cnt.appendChild(b);
      cnt.appendChild(document.createTextNode("] "));
      c = cnt.cloneNode(!0);
      e = $.cls("boardList");
      for (a = 0; b = e[a]; ++a) b.style.display = "none", b.parentNode.insertBefore(a ? c : cnt, b);
      e = $.cls("show-all-boards");
      for (a = 0; b = e[a]; ++a) b.addEventListener("click", CustomMenu.reset, !1)
    }
  }
};

function onPostSubmit(a) {
  var b, c;
  if ((b = document.forms.post.upfile) && b.value && (b = b.files ? b.files[0].size : 0, c = FC.hasMobileLayout ? 0 : 204800, !a.shiftKey && b > c)) try {
    submitPreupload(), a.preventDefault()
  } catch (e) {}
}

function submitDirect() {
  var a = document.forms.post;
  a.removeEventListener("submit", onPostSubmit, !1);
  a.submit()
}

function submitPreupload() {
  var a, b, c, e, k;
  a = document.getElementById("recaptcha_challenge_field");
  c = document.getElementById("recaptcha_response_field");
  k = document.getElementById("fileError");
  c && "" != c.value ? (e = new FormData, e.append("mode", "checkcaptcha"), e.append("challenge", a.value), e.append("response", c.value), a = new XMLHttpRequest, a.open("POST", document.forms.post.action, !0), a.onerror = function() {
    submitDirect()
  }, a.onload = function() {
    var a;
    try {
      a = JSON.parse(this.responseText)
    } catch (c) {
      console.log("Couldn't verify captcha.");
      submitDirect();
      return
    }
    a.token ? (b = document.createElement("input"), b.id = "captchaToken", b.type = "hidden", b.value = a.token, submitDirect()) : a.error ? (onCaptchaClick(), k.innerHTML = a.error) : (a.fail && console.log(a.fail), submitDirect())
  }, (b = document.getElementById("captchaToken")) && b.parentNode.removeChild(b), a.send(e)) : (k.textContent = "You forgot to type in the CAPTCHA.", c && c.focus())
}

function initPass() {
  "1" == get_cookie("pass_enabled") || get_cookie("extra_path") ? window.passEnabled = !0 : window.passEnabled = !1
}

function initRecaptcha() {
  window.passEnabled || (document.forms.post.com.addEventListener("focus", loadRecaptcha, !1), document.forms.post.upfile.addEventListener("change", loadRecaptcha, !1))
}

function loadRecaptcha() {
  document.getElementById("recaptcha_area") || Recaptcha.create(window.recaptchaKey, "captchaContainer" + window.recaptchaId, {
    theme: "clean",
    callback: onCaptchaReady
  })
}

function initAnalytics() {
  (function(a, b, c, e, k, n, p) {
    a.GoogleAnalyticsObject = k;
    a[k] = a[k] || function() {
      (a[k].q = a[k].q || []).push(arguments)
    };
    a[k].l = 1 * new Date;
    n = b.createElement(c);
    p = b.getElementsByTagName(c)[0];
    n.async = 1;
    n.src = e;
    p.parentNode.insertBefore(n, p)
  })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
  ga("create", "UA-166538-1", "auto");
  ga("set", "anonymizeIp", !0);
  ga("send", "pageview")
}

function initAds(a, b) {
  var c = "http",
    e = "static";
  "https:" == document.location.protocol && (c += "s", e = "engine");
  var k = document.createElement("script");
  k.type = "text/javascript";
  k.async = !0;
  k.src = c + "://" + e + ".4chan-ads.org/ados.js";
  k.onload = function() {
    ados = ados || {};
    ados.run = ados.run || [];
    ados.run.push(function() {
      ados_add_placement(3536, 18130, "azk91603", 4).setZone(16258);
      ados_add_placement(3536, 18130, "azk98887", 3).setZone(16259);
      ados_add_placement(3536, 18130, "azk53379", 4).setZone(16260);
      ados_setDomain("engine.4chan-ads.org");
      ados_setKeywords(a + ", " + b);
      ados_setNoTrack();
      ados_load()
    })
  };
  c = document.getElementsByTagName("script")[0];
  c.parentNode.insertBefore(k, c)
}

function checkMobileLayout() {
  var a, b;
  if (window.matchMedia) return window.matchMedia("(max-width: 480px)").matches && "true" != localStorage.getItem("4chan_never_show_mobile");
  a = $.id("boardNavMobile");
  b = $.id("boardNavDesktop");
  return a && b && 0 < a.offsetWidth && 0 == b.offsetWidth
}

function checkForBlock() {
  var a, b, c, e;
  if (!/Mobile|Android|Dolfin|Opera Mobi|PlayStation Vita|Nintendo DS/.test(navigator.userAgent) && 1 != $.readCookie("pass_enabled"))
    for (e = document.getElementsByClassName("ad-cnt"), a = 0; b = e[a]; ++a) 0 == b.offsetHeight && (c = document.createElement("div"), c.className = "center", c.innerHTML = blockPlea, b.parentNode.insertBefore(c, b))
}

function initBlotter() {
  var a, b;
  UA.hasWebStorage && (a = document.getElementById("toggleBlotter")) && (a.addEventListener("click", toggleBlotter, !1), b = localStorage.getItem("4chan-blotter")) && (a = +a.getAttribute("data-utc"), a <= +b && toggleBlotter())
}

function toggleBlotter(a) {
  var b;
  a && a.preventDefault();
  if (a = document.getElementById("blotter-msgs")) b = document.getElementById("toggleBlotter"), "none" == a.style.display ? (a.style.display = "", localStorage.removeItem("4chan-blotter"), b.textContent = "Hide", a = b.nextElementSibling, a.style.display && (a.style.display = "")) : (a.style.display = "none", localStorage.setItem("4chan-blotter", b.getAttribute("data-utc")), b.textContent = "Show Blotter", b.nextElementSibling.style.display = "none")
}

function buildMobileNav() {
  var a, b, c, e, k, n;
  if (a = document.getElementById("boardSelectMobile")) {
    k = "";
    n = [];
    b = document.querySelectorAll("#boardNavDesktop .boardList > a");
    for (c = 0; e = b[c]; ++c) n.push(e);
    n.sort(function(a, b) {
      return a.textContent < b.textContent ? -1 : a.textContent > b.textContent ? 1 : 0
    });
    for (c = 0; e = n[c]; ++c) k += '<option value="' + e.textContent + '">/' + e.textContent + "/ - " + e.title + "</option>";
    a.innerHTML = k
  }
}

function loadBannerImage() {
  var a;
  !(a = document.getElementById("bannerCnt")) || 0 >= a.offsetWidth || (a.innerHTML = '<img alt="4chan" src="//s.4cdn.org/image/title/' + a.getAttribute("data-src") + '">')
};
