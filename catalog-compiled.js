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
      this.hasCORS = "withCredentials" in new XMLHttpRequest;
      this.isMobileDevice = /Mobile|Android|Dolfin|Opera Mobi|PlayStation Vita|Nintendo DS/.test(navigator.userAgent)
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
      var a, g, d;
      g = $.id("boardNavDesktop");
      d = $.id("boardNavDesktopFoot");
      T ? (a = document.createElement("div"), a.className = "pageJump", a.innerHTML = '<a href="#bottom">&#9660;</a><a href="javascript:void(0);" id="settingsWindowLinkClassic">Settings</a><a href="//www.4chan.org" target="_top">Home</a></div>', g.appendChild(a), $.id("settingsWindowLinkClassic").addEventListener("click", F, !1), $.addClass(g, "persistentNav")) : (g.style.display = "none", $.removeClass($.id("boardNavMobile"), "mobile"));
      d.style.display = "none";
      $.addClass(document.body, "hasDropDownNav")
    }

    function b() {
      var a, g;
      g = $.id("boardSelectMobile");
      for (a = g.options.length - 1; 0 <= a; a--)
        if (g.options[a].value == l.slug) {
          g.selectedIndex = a;
          break
        }
      $.on(g, "change", function() {
        var a = this.options[this.selectedIndex].value;
        window.location = "//boards.4chan.org/" + a + ("f" == a ? "" : "/catalog")
      });
      $.addClass(document.body, U.toLowerCase().replace(/ /g, "_"))
    }

    function c() {
      var a, g;
      a = $.id("globalMessage");
      g = $.id("toggleMsgBtn");
      "none" == a.style.display ? (a.style.display = "", g.className = "collapseIcon", g.style.opacity = "1", localStorage.removeItem("4chan-global-msg")) : (a.style.display = "none", g.className = "expandIcon", g.innerHTML = '<span class="mobile">View Important Announcement</span>', g.style.opacity = "0.5", localStorage.setItem("4chan-global-msg", a.getAttribute("data-utc")))
    }

    function e(a) {
      var g = document.getElementById("globalToggle"),
        d = document.getElementById("globalMessage");
      a.preventDefault();
      $.hasClass(g, "shown") ? ($.toggleClass(g, "shown"), d.style.display = "", g.innerHTML = "View Important Announcement") : ($.addClass(g, "shown"), d.style.display = "block", g.innerHTML = "Close Announcement")
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
      document.cookie = ha + "=" + this.value + ";" + a.toGMTString() + "; path=/; domain=4chan.org";
      ia()
    }

    function ia() {
      location.href = location.href
    }

    function Ba(a, g) {
      var d;
      return function() {
        var b = arguments,
          c = this;
        clearTimeout(d);
        d = setTimeout(function() {
          g.apply(c, b)
        }, a)
      }
    }

    function L() {
      var a, g = $.id("qf-cnt");
      $.hasClass(C, "active") ? (V(), g.style.display = "none", $.removeClass(C, "active")) : (g.style.display = "inline", a = $.id("qf-box"), g.hasAttribute("data-built") || (g.setAttribute("data-built", "1"), $.on(a, "keyup", Ba(250, ja)), $.on(a, "keydown", function(a) {
        "27" == a.keyCode && L()
      })), a.focus(), a.value = "", $.addClass(C, "active"))
    }

    function ja() {
      var a, g;
      "" != (g = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", g), sessionStorage.setItem("4chan-catalog-search-board", l.slug)), a = p(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = g, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", g = g.replace(a, "\\$1"), J = new RegExp(g, "i"), q()) : V()
    }

    function V(a) {
      var g = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      a ? (g.value = "", g.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), J = !1, q())
    }

    function Ca() {
      var a, g;
      if (UA.hasWebStorage) $.on(t, "mousedown", function(d) {
        a = d.target;
        if (-1 != a.className.indexOf("thumb"))
          if (g = a.getAttribute("data-id"), 3 == d.which) t.setAttribute("contextmenu", "ctxmenu-thread"), $.id("ctxmenu-thread").target = g;
          else {
            if (1 == d.which && d.altKey) return ka(g), !1;
            if (1 == d.which && d.shiftKey) return la(g), !1
          } else 3 == d.which && t.setAttribute("contextmenu", "ctxmenu-main")
      });
      if (!v.nobinds) $.on(document, "keyup", W)
    }

    function ka(a) {
      0 <= s[a] ? delete s[a] : s[a] = l.threads[a].r || 0;
      localStorage.setItem("4chan-pin-" + l.slug, JSON.stringify(s));
      q()
    }

    function la(a) {
      X ? (delete K[a], --x) : (K[a] = !0, ++x);
      localStorage.setItem("4chan-hide-t-" +
        l.slug, JSON.stringify(K));
      $.id("thread-" + a).style.display = "none";
      Y("hidden", x);
      0 == x && Z(!1)
    }

    function Z(a) {
      X = a;
      $.id("filters-clear-hidden").textContent = $.id("filters-clear-hidden-bottom").textContent = a ? "Back" : "Show";
      q()
    }

    function Y(a, g) {
      var d = a + "-label",
        b = a + "-count";
      0 < g ? ($.id(b).textContent = $.id(b + "-bottom").textContent = g, $.id(d).style.display = $.id(d + "-bottom").style.display = "inline") : $.id(d).style.display = $.id(d + "-bottom").style.display = "none"
    }

    function Da(a) {
      window.open("http://sys.4chan.org/" + l.slug + "/imgboard.php?mode=report&no=" + a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
    }

    function Ea(a) {
      a = a.target.getAttribute("data-cmd");
      ma[a]($.id("ctxmenu-thread").target)
    }

    function W(a) {
      var g = a.target;
      if ("TEXTAREA" != g.nodeName && "INPUT" != g.nodeName && na[a.keyCode]) na[a.keyCode]()
    }

    function oa(a) {
      a.preventDefault();
      0 < x && ("Show" == $.id("filters-clear-hidden").textContent ? Z(!0) : Z(!1))
    }

    function Fa() {
      s = {};
      localStorage.removeItem("4chan-pin-" + l.slug);
      q();
      return !1
    }

    function Ga(a) {
      var g = a.target,
        d;
      (g = a.target) != document && ((d = g.getAttribute("data-watch")) ? ThreadWatcher.toggle(d, l.slug, l.threads[d].teaser, l.threads[d].lr.id) : "backdrop" == g.id ? aa($.id("filters")) ? aa($.id("theme")) || O() : aa($.id("filters-protip")) ? ba() : pa() : "filter-palette" == a.target.id && P())
    }

    function Ha() {
      var a = $.id("filters-protip");
      a.style.top = window.pageYOffset + 50 + "px";
      $.removeClass(a, "hidden")
    }

    function pa() {
      $.addClass($.id("filters-protip"), "hidden")
    }

    function Ia(a) {
      var g = a.target;
      if ("filters-close" == g.id) ba();
      else if ("filters-add" == g.id) $.id("filter-list").appendChild(qa({
        active: 1,
        pattern: "",
        boards: "",
        color: "",
        hidden: 0,
        top: 0,
        hits: 0
      }, Ja()));
      else if ("filters-save" == g.id) Ka(), ba();
      else if (g.hasAttribute("data-active")) ca(g, "active");
      else if (g.hasAttribute("data-hide")) ca(g, "hide", "top");
      else if (g.hasAttribute("data-top")) ca(g, "top", "hide");
      else if ($.hasClass(g, "filter-color")) {
        var d;
        a = g.getBoundingClientRect();
        if (!w) {
          var b, c, e, h, k, l;
          w = $.id("filter-palette");
          b = $.id("filter-color-table");
          e = $.tag("tbody", b)[0];
          h = m.filterColors.length;
          if (0 < h)
            for (d = m.filterColors[0].length, c = $.tag("tfoot", b)[0], b = c.children.length - 1; 0 <= b; b--) c.children[b].firstElementChild.setAttribute("colspan", d);
          for (b = 0; b < h; ++b) {
            k = document.createElement("tr");
            for (c = 0; c < d; ++c) l = document.createElement("td"), l.innerHTML = '<span class="button clickbox" style="background:' + m.filterColors[b][c] + '"></span>', $.on(l.firstElementChild, "click", da), k.appendChild(l);
            e.appendChild(k)
          }
        }
        $.removeClass(w, "hidden");
        w.setAttribute("data-target", g.id.split("-")[2]);
        d = w.firstElementChild;
        d.style.cssText = "top:" + a.top + "px;left:" + (a.left - d.clientWidth - 10) + "px;"
      } else g.hasAttribute("data-target") ? (a = $.id("filter-" + g.getAttribute("data-target")), a.parentNode.removeChild(a)) : g.hasAttribute("data-up") && (a = g.parentNode.parentNode, (d = a.previousElementSibling) && a.parentNode.insertBefore(a, d))
    }

    function La() {
      var a, b, d, c, f, e;
      b = $.id("filters");
      b.hasAttribute("data-built") || ($.on(b, "click", Ia), $.on($.id("filter-palette-close"), "click", P), $.on($.id("filter-palette-clear"), "click", Ma), $.on($.id("filters-help-open"), "click", Ha), $.on($.id("filters-help-close"), "click", pa), $.on($.id("filter-rgb"), "keyup", Na), $.on($.id("filter-rgb-ok"), "click", da), b.setAttribute("data-built", "1"));
      d = localStorage.getItem("catalog-filters");
      f = 0;
      if (d) {
        c = $.id("filter-list");
        d = JSON.parse(d);
        for (a in d) c.appendChild(qa(d[a], f)), ++f;
        ra()
      }
      b.style.top = window.pageYOffset + 60 + "px";
      $.removeClass(b, "hidden");
      (e = $.cls("filter-active", b)[0]) && e.focus();
      Q()
    }

    function ba() {
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

    function sa() {
      if (UA.hasWebStorage) {
        G = {};
        var a = localStorage.getItem("catalog-filters");
        if (a) {
          var a = JSON.parse(a),
            b, d, c, f, e, h = /^\/(.*)\/(i?)$/,
            k = /\s*\|+\s*/g,
            m = /\\\*/g,
            n = p(),
            t, s, q, r, u, v, x, y;
          try {
            for (d in a)
              if (b = a[d], b.active && "" != b.pattern && (!b.boards || -1 != b.boards.split(" ").indexOf(l.slug))) {
                r = b.pattern;
                if ("#" == r.charAt(0)) y = "#" == r.charAt(1) ? 2 : 1, u = new RegExp(r.slice(y).replace(n, "\\$1"));
                else if (y = 0, t = r.match(h)) u = new RegExp(t[1], t[2]);
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
            alert("There was an error processing one of the filters: " + w + " in: " + b.pattern)
          }
        }
      }
    }

    function Ka() {
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
      sa();
      q();
      ra()
    }

    function Na() {
      $.id("filter-rgb-ok").style.backgroundColor = this.value
    }

    function qa(a, b) {
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
      f.id = "filter-color-" + b;
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

    function da(a) {
      var b = $.id("filter-color-" + w.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background = this.style.backgroundColor);
      P()
    }

    function Ma() {
      da(!0)
    }

    function Ja() {
      var a, b, d, c = $.id("filter-list").children;
      if (c.length) {
        for (a = d = 0; b = c[a]; ++a) b = +b.id.slice(7), b > d && (d = b);
        return d + 1
      }
      return 0
    }

    function ca(a, b, d) {
      b = "data-" + b;
      "0" == a.getAttribute(b) ? (a.setAttribute(b, "1"), $.addClass(a, "active"), a.innerHTML = "&#x2714;", d && (a = $.cls("filter-" + d, a.parentNode.parentNode)[0], a.setAttribute("data-" + d, "0"), $.removeClass(a, "active"), a.innerHTML = "")) : (a.setAttribute(b, "0"), $.removeClass(a, "active"), a.innerHTML = "")
    }

    function ra() {
      var a, b, d = $.id("filter-list").children;
      for (a = 0; b = d[a]; ++a) $.id("fhc-" + b.id.slice(7)).innerHTML = G[a] ? "x" + G[a].hits : ""
    }

    function aa(a) {
      return $.hasClass(a, "hidden")
    }

    function F() {
      var a, b;
      UA.hasWebStorage ? (a = $.id("theme"), theme = (theme = localStorage.getItem("catalog-theme")) ? JSON.parse(theme) : {}, $.id("theme-nobinds").checked = !!theme.nobinds, $.id("theme-nospoiler").checked = !!theme.nospoiler, $.id("theme-newtab").checked = !!theme.newtab, $.id("theme-tw").checked = M, $.id("theme-ddn").checked = N, theme.css && ($.id("theme-css").value = theme.css), $.on($.id("theme-save"), "click", ta), $.on($.id("theme-close"), "click", O), $.id("theme-msg").style.display = "none", a.style.top = window.pageYOffset + 60 + "px", $.removeClass(a, "hidden"), (b = $.tag("input", a)[0]) && b.focus(), Q()) : alert("Your browser doesn't support Local Storage")
    }

    function O() {
      $.off($.id("theme-save"), "click", ta);
      $.off($.id("theme-close"), "click", O);
      $.addClass($.id("theme"), "hidden");
      Q()
    }

    function Q() {
      $.toggleClass($.id("backdrop"), "hidden")
    }

    function ua(a, b) {
      if (a.nobinds) v.nobinds != a.nobinds && $.off(document, "keyup", W);
      else if (v.nobinds != a.nobinds) $.on(document, "keyup", W);
      b || R.applyCSS(a)
    }

    function ta() {
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
      if (d != N)
        if (d) a();
        else {
          var k, h;
          k = $.id("boardNavDesktop");
          h = $.id("boardNavDesktopFoot");
          if (T) {
            if (e = $.cls("pageJump", k)) $.id("settingsWindowLinkClassic").removeEventListener("click", F, !1), k.removeChild(e);
            $.removeClass(k, "persistentNav")
          } else k.style.display = "", $.addClass($.id("boardNavMobile"), "mobile");
          h.style.display = "";
          $.removeClass(document.body, "hasDropDownNav")
        }
      M = c;
      N = d;
      "" != (c = $.id("theme-css").value) && (f.css = c);
      ua(f);
      localStorage.removeItem("catalog-theme");
      for (b in f) {
        localStorage.setItem("catalog-theme", JSON.stringify(f));
        break
      }
      v = f;
      q();
      O()
    }

    function va(a) {
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

    function ea() {
      var a, b, d;
      if (UA.hasWebStorage) {
        d = {};
        for (a = wa.length - 1; 0 <= a; a--) b = wa[a], d[b] = m[b];
        localStorage.setItem("catalog-settings", JSON.stringify(d))
      }
    }

    function xa(a, b) {
      var d = "";
      a ? ($teaserCtrl.selectedIndex = 1, d = "extended-", m.extended = !0) : ($teaserCtrl.selectedIndex = 0, m.extended = !1);
      d = m.large ? d + "large" : d + "small";
      t.className = d;
      b || ea()
    }

    function ya(a, b) {
      var d = m.extended ? "extended-" : "";
      a ? (D.selectedIndex = 1, d += "large", m.large = !0) : (D.selectedIndex = 0, d += "small", m.large = !1);
      t.className = d;
      b || (ea(), q())
    }

    function A(a, b) {
      var d = {
        alt: 0,
        absdate: 1,
        date: 2,
        r: 3
      };
      void 0 !== d[a] ? (z.selectedIndex = d[a], m.orderby = a) : (z.selectedIndex = 0, m.orderby = "date");
      b || (ea(), q())
    }

    function Oa() {
      xa("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Pa() {
      A(z.options[z.selectedIndex].value)
    }

    function Qa() {
      ya("large" == D.options[D.selectedIndex].value)
    }

    function q() {
      var a, b, d, c, f, e, h, k, n, p, q, w, H = 0,
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
          if (X) {
            if (!K[f]) continue;
            ++x
          } else if (!J) {
            if (K[f]) {
              ++x;
              continue
            }
            if (0 <= s[f]) p = n = !0;
            else
              for (c in d = e.capcode ? (e.trip || "") + "!#" + e.capcode : e.trip, G)
                if (h = G[c], 0 == h.type && (h.pattern.test(y) || h.pattern.test(e.file)) || 1 == h.type && h.pattern.test(d) || 2 == h.type && h.pattern.test(e.author)) {
                  if (h.hidden) {
                    ++H;
                    h.hits += 1;
                    continue a
                  }
                  k = h;
                  n = !!h.top;
                  h.hits += 1;
                  break
                }
          } else if (!J.test(y) && !J.test(e.file)) continue;
          u = 0 === u ? 1 : 0;
          h = '<div id="thread-' + f + '" class="thread">';
          M && (d = f + "-" + l.slug, h += '<span id="leaf-' + f + '" data-watch="' + f + '" ' + (ThreadWatcher.watched[d] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          h += "<a " + D + 'href="' + q + f + (e.semantic_url ? "/" + e.semantic_url : "") + '"><img alt="" id="thumb-' + f + '" class="thumb';
          d = k.color ? ' hl" style="border-color: ' + k.color : p ? " pinned" : "";
          e.imgurl ? e.imgspoiler && !v.nospoiler ? h += d + '" src="' + w : (E = e.tn_w, I = e.tn_h, F && (B = m.smallsize, E > B && (z = B / E, E = B, I *= z), I > B && (z = B / I, I = B, E *= z)), h += d + '" width="' + E + '" height="' + I + '" src="//' + u + C + e.imgurl + "s.jpg") : h = e.imgdel ? h + (" imgdel" + d + '" src="' + m.imgdel) : h + (" nofile" + d + '" src="' + m.nofile);
          h += '" data-id="' + f + '" /></a>';
          if (e.sticky || e.closed || e.capcodereps) {
            h += '<div class="threadIcons">';
            e.sticky && (h += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            e.closed && (h += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (e.capcodereps)
              for (z = e.capcodereps.split(","), d = 0; B = z[d]; ++d)
                if (E = Ra[B]) h += '<span title="' + E + ' Replies" class="threadIcon ' + B + 'Icon"></span>';
            h += "</div>"
          }
          h += '<div title="(R)eplies / (I)mages' + (n ? " / (P)age" : "") + '" id="meta-' +
            f + '" class="meta">';
          e.r && (h = e.bumplimit ? h + ("<i>R: <b>" + e.r + "</b></i>") : h + ("R: <b>" + e.r + "</b>"), p && (p = e.r - s[f], 0 < p ? (h += " (+" + p + ")", s[f] = e.r) : h += "(+0)"), e.i && (h = e.imagelimit ? h + (" / <i>I: <b>" + e.i + "</b></i>") : h + (" / I: <b>" + e.i + "</b>")));
          n && 0 <= (page = 0 | l.order.alt.indexOf(f) / l.pagesize) && (e.r && (h += " / "), h += "P: <b>" + page + "</b>");
          h += "</div>";
          y && (h += '<div class="teaser', k.color && (h += ' style="color:' + k.color), h += '">' + y + "</div>");
          n ? A += h + "</div>" : r += h + "</div>"
        }
        r = J && "" == r ? '<div class="error">Nothing Found</div>' : A ? A + r + '<div class="clear"></div>' : r + '<div class="clear"></div>';
        for (b in s) {
          localStorage.setItem("4chan-pin-" + l.slug, JSON.stringify(s));
          break
        }
        t.innerHTML = r;
        Y("filtered", H);
        Y("hidden", x)
      }
    }

    function Sa(a) {
      a = a.target;
      $.hasClass(a, "thumb") && (clearTimeout(fa), S && za(), fa = setTimeout(Ta, m.tipdelay, a))
    }

    function Ua(a) {
      clearTimeout(fa);
      S && za()
    }

    function Ta(a) {
      var b, d, c, e;
      b = Date.now() / 1E3;
      e = a.getBoundingClientRect();
      c = document.documentElement.offsetWidth;
      thread = l.threads[a.getAttribute("data-id")];
      d = thread.sub ? '<span class="post-subject">' + thread.sub + "</span>" : "Posted";
      d += ' by <span class="' + (thread.capcode ? thread.capcode + "-capcode " : "") + 'post-author">' + (thread.author || l.anon);
      thread.trip && (d += ' <span class="post-tripcode">' + thread.trip + "</span>");
      thread.capcode && (d += " ## " + thread.capcode.charAt(0).toUpperCase() + thread.capcode.slice(1));
      d += "</span> ";
      l.flags && thread.country && (d += '<div class="flag flag-' + thread.country.toLowerCase() + '"></div> ');
      d += '<span class="post-ago">' + Aa(b - thread.date) + " ago</span>";
      !m.extended && thread.teaser && (d += '<p class="post-teaser">' + thread.teaser + "</p>");
      0 < thread.r && (d += '<div class="post-last">Last reply by <span class="' + (thread.lr.capcode ? thread.lr.capcode + "-capcode " : "") + 'post-author">' + thread.lr.author, thread.lr.trip && (d += ' <span class="post-tripcode">' + thread.lr.trip + "</span>"), thread.lr.capcode && (d += " ## " + thread.lr.capcode.charAt(0).toUpperCase() + thread.lr.capcode.slice(1)), d += '</span> <span class="post-ago">' + Aa(b - thread.lr.date) + " ago</span>");
      b = document.createElement("div");
      b.id = "post-preview";
      b.innerHTML = d;
      document.body.appendChild(b);
      d = b.style;
      c - e.right < (0 | .3 * c) ? (c -= e.left, d.right = c + 5 + "px") : (c = e.left + e.width, d.left = c + 5 + "px");
      d.top = e.top + a.offsetHeight + window.pageYOffset - b.offsetHeight / 2 - e.height / 2 + "px";
      S = !0
    }

    function za() {
      document.body.removeChild($.id("post-preview"));
      S = !1
    }

    function Aa(a, b) {
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
    var R = this,
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
      Ra = {
        admin: "Administrator",
        mod: "Moderator",
        developer: "Developer",
        manager: "Manager"
      },
      na = {
        83: function() {
          $.hasClass(C, "active") ? V(!0) : L()
        },
        82: ia,
        88: function() {
          "date" == m.orderby ? A("alt") : "alt" == m.orderby ? A("r") : "r" == m.orderby ? A("absdate") : A("date")
        }
      },
      l = {},
      wa = ["orderby", "large", "extended"],
      v = {},
      ha, U, G = {},
      S = !1,
      fa = null,
      s = {},
      K = {},
      x = 0,
      M = !1,
      N = !1,
      T = !1,
      J = !1,
      X = !1,
      t, C, D, z, w, ma;
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
    R.init = function() {
      var b, g, d;
      FC.hasMobileLayout = checkMobileLayout();
      buildMobileNav();
      ua(v, !0);
      t = $.id("threads");
      C = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      D = $.id("size-ctrl");
      z = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(C, "click", L);
      $.on($.id("filters-clear-hidden"), "click", oa);
      $.on($.id("filters-clear-hidden-bottom"), "click", oa);
      $.on($.id("qf-clear"), "click", L);
      $.on($.id("settingsWindowLink"), "click", F);
      $.on($.id("settingsWindowLinkBot"), "click", F);
      $.on($.id("settingsWindowLinkMobile"), "click", F);
      $.on($.id("filters-ctrl"), "click", La);
      $.on($teaserCtrl, "change", Oa);
      $.on(D, "change", Qa);
      $.on(z, "change", Pa);
      $.on(t, "mouseover", Sa);
      $.on(t, "mouseout", Ua);
      $.on($.id("togglePostFormLink").firstElementChild, "click", k);
      $.on($.id("togglePostFormLinkMobile"), "click", n);
      $.on(document, "click", Ga);
      $.on(window, "load", checkForBlock);
      var l;
      UA.hasWebStorage && (l = localStorage.getItem("catalog-settings")) && $.extend(m, JSON.parse(l));
      Ca();
      var f, p;
      if (UA.hasWebStorage && (b = $.id("globalMessage")) && b.textContent && (b.nextElementSibling.style.clear = "both", l = document.createElement("span"), l.id = "toggleMsgBtn", l.setAttribute("data-cmd", "toggleMsg"), l.title = "Toggle announcement", p = localStorage.getItem("4chan-global-msg"), f = b.getAttribute("data-utc"), p && f <= p ? (b.style.display = "none", l.style.opacity = "0.5", l.className = "expandIcon") : l.className = "collapseIcon", $.on(l, "click", c), b.parentNode.insertBefore(l, b), l = $.id("globalToggle"), 0 < l.offsetWidth)) $.on(l, "click", e);
      initBlotter();
      !window.passEnabled && window.preupload_captcha && "FormData" in window && document.forms.post.addEventListener("submit", onPostSubmit, !1);
      UA.hasContextMenu && (ma = {
        pin: ka,
        hide: la,
        report: Da
      }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>', $.on($.id("ctxmenu-main"), "click", Fa), $.on($.id("ctxmenu-thread"), "click", Ea));
      UA.hasWebStorage && ((b = localStorage.getItem("4chan-settings")) ? (b = JSON.parse(b), !b.disableAll && b.threadWatcher && (M = !0, ThreadWatcher.init()), b.customMenu && CustomMenu.apply(b.customMenuList), !1 === b.dropDownNav || FC.hasMobileLayout || (N = !0, T = b.classicNav, a())) : UA.isMobileDevice && !FC.hasMobileLayout && (N = !0, a()));
      window.passEnabled && setPassMsg();
      (g = document.forms.post.flag) && (d = $.readCookie("4chan_flag")) && (g = g.querySelector('option[value="' +
        d + '"]')) && g.setAttribute("selected", "selected");
      A(m.orderby, !0);
      ya(m.large, !0);
      xa(m.extended, !0);
      loadBannerImage()
    };
    R.loadCatalog = function(a) {
      var c;
      l = a;
      b();
      var d, e, f;
      d = $.id("styleSelector");
      e = d.children;
      for (a = 0; f = e[a]; ++a) f.value == U && (d.selectedIndex = a);
      $.on(d, "change", H);
      sa();
      UA.hasWebStorage && (K = va("4chan-hide-t-" + l.slug), s = va("4chan-pin-" + l.slug));
      UA.hasSessionStorage && !location.hash && (c = sessionStorage.getItem("4chan-catalog-search")) ? l.slug != sessionStorage.getItem("4chan-catalog-search-board") && (sessionStorage.removeItem("4chan-catalog-search"), sessionStorage.removeItem("4chan-catalog-search-board"), c = null) : location.hash && (c = location.hash.match(/#s=(.+)/)) && (c = decodeURIComponent(c[1].replace(/\+/g, " ")));
      c ? (L(), $.id("qf-box").value = c, ja()) : q()
    };
    R.applyCSS = function(a, b, c) {
      var e, f;
      a || (a = v);
      void 0 !== b && ((f = $.readCookie(b)) || (f = "nws_style" == b ? "Yotsuba New" : "Yotsuba B New"), ha = b, U = f, e = document.createElement("link"), e.type = "text/css", e.id = "base-css", e.rel = "stylesheet", e.setAttribute("href", "//s.4cdn.org/css/catalog_" +
        f.toLowerCase().replace(/ /g, "_") + "." + c + ".css"), document.head.insertBefore(e, $.id("mobile-css")));
      (e = $.id("custom-css")) && document.head.removeChild(e);
      a.css && (e = document.createElement("style"), e.type = "text/css", e.id = "custom-css", e.styleSheet ? e.styleSheet.cssText = a.css : e.innerHTML = a.css, document.head.appendChild(e));
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
      FC.hasMobileLayout && (el = document.createElement("a"), el.href = "#", el.textContent = "TW", el.addEventListener("click", ThreadWatcher.toggleList, !1), a = $.id("settingsWindowLinkMobile"), a.parentNode.insertBefore(el, a), a.parentNode.insertBefore(document.createTextNode(" "), a));
      a = document.createElement("div");
      a.id = "threadWatcher";
      a.setAttribute("data-trackpos", "TW-position");
      FC.hasMobileLayout ? a.style.display = "none" : (b = localStorage.getItem("catalog-tw-pos")) ? a.style.cssText = b : (a.style.left = "10px", a.style.top = "75px");
      a.innerHTML = '<div class="drag" id="twHeader">' +
        (FC.hasMobileLayout ? '<div id="twClose" class="icon closeIcon"></div>' : "") + "Thread Watcher" + (UA.hasCORS ? '<div id="twPrune" class="icon refreshIcon" title="Refresh"></div></div>' : "</div>");
      this.listNode = document.createElement("ul");
      this.listNode.id = "watchList";
      this.load();
      this.build();
      a.appendChild(this.listNode);
      document.body.appendChild(a);
      a.addEventListener("mouseup", this.onClick, !1);
      Draggable.set($.id("twHeader"));
      window.addEventListener("storage", this.syncStorage, !1);
      !FC.hasMobileLayout && this.canAutoRefresh() && this.refresh()
    },
    unInit: function() {
      var a;
      if (a = $.id("threadWatcher")) a.removeEventListener("mouseup", this.onClick, !1), Draggable.unset($.id("twHeader")), window.removeEventListener("storage", this.syncStorage, !1), document.body.removeChild(a)
    },
    toggleList: function(a) {
      var b = $.id("threadWatcher");
      a && a.preventDefault();
      ThreadWatcher.canAutoRefresh() && ThreadWatcher.refresh();
      "none" == b.style.display ? (b.style.top = window.pageYOffset + 30 + "px", b.style.display = "") : b.style.display = "none"
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
      for (c in this.watched) b = c.split("-"), a += '<li id="watch-' + c + '"><span class="pointer" data-cmd="unwatch" data-id="' + b[0] + '" data-board="' + b[1] + '">&times;</span> <a href="' + this.linkToThread(b[0], b[1], this.watched[c][1]) + '"', a = -1 == this.watched[c][1] ? a + ' class="deadlink">' : this.watched[c][2] ? a + (' class="hasNewReplies">(' + this.watched[c][2] + ") ") : a + ">", a += "/" + b[1] + "/ - " + this.watched[c][0] + "</a></li>";
      ThreadWatcher.listNode.innerHTML = a
    },
    onClick: function(a) {
      a = a.target;
      a.hasAttribute("data-id") ? ThreadWatcher.toggle(a.getAttribute("data-id"), a.getAttribute("data-board")) : "twPrune" != a.id || ThreadWatcher.isRefreshing ? "twClose" == a.id && ThreadWatcher.toggleList() : ThreadWatcher.refresh()
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
      }, b && (e.onerror = e.onload), e.open("GET", "//a.4cdn.org/" + c[1] + "/thread/" + c[0] + ".json"), e.send(null)
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
      if (!this.parentNode.hasAttribute("data-shiftkey") || a.shiftKey) a.preventDefault(), b = Draggable, c = document.documentElement, b.el = this.parentNode, b.key = b.el.getAttribute("data-trackpos"), e = b.el.getBoundingClientRect(), b.dx = a.clientX - e.left, b.dy = a.clientY - e.top, b.right = c.clientWidth -
        e.width, b.bottom = c.clientHeight - e.height, "fixed" != getComputedStyle(b.el, null).position ? (b.scrollX = window.scrollX || window.pageXOffset, b.scrollY = window.scrollY || window.pageYOffset) : b.scrollX = b.scrollY = 0, document.addEventListener("mouseup", b.endDrag, !1), document.addEventListener("mousemove", b.onDrag, !1)
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
