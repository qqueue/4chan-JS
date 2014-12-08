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
    var b, c, d;
    d = a + "=";
    c = document.cookie.split(";");
    for (a = 0; b = c[a]; ++a) {
      for (;
        " " == b.charAt(0);) b = b.substring(1, b.length);
      if (0 == b.indexOf(d)) return decodeURIComponent(b.substring(d.length, b.length))
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
      } catch (d) {
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
      var a, b, g;
      b = $.id("boardNavDesktop");
      g = $.id("boardNavDesktopFoot");
      V ? (a = document.createElement("div"), a.className = "pageJump", a.innerHTML = '<a href="#bottom">&#9660;</a><a href="javascript:void(0);" id="settingsWindowLinkClassic">Settings</a><a href="//www.4chan.org" target="_top">Home</a></div>', b.appendChild(a), $.id("settingsWindowLinkClassic").addEventListener("click", L, !1), $.addClass(b, "persistentNav")) : (b.style.display = "none", $.removeClass($.id("boardNavMobile"), "mobile"));
      g.style.display = "none";
      $.addClass(document.body, "hasDropDownNav")
    }

    function b() {
      var a, b;
      b = $.id("boardSelectMobile");
      for (a = b.options.length - 1; 0 <= a; a--)
        if (b.options[a].value == k.slug) {
          b.selectedIndex = a;
          break
        }
      $.on(b, "change", function() {
        var a = this.options[this.selectedIndex].value;
        window.location = "//boards.4chan.org/" + a + ("f" == a ? "" : "/catalog")
      });
      $.addClass(document.body, W.toLowerCase().replace(/ /g, "_"))
    }

    function c() {
      var a, b;
      a = $.id("globalMessage");
      b = $.id("toggleMsgBtn");
      "none" == a.style.display ? (a.style.display = "", b.className = "collapseIcon", b.style.opacity = "1", localStorage.removeItem("4chan-global-msg")) : (a.style.display = "none", b.className = "expandIcon", b.innerHTML = '<span class="mobile">View Important Announcement</span>', b.style.opacity = "0.5", localStorage.setItem("4chan-global-msg", a.getAttribute("data-utc")))
    }

    function d(a) {
      var b = document.getElementById("globalToggle"),
        g = document.getElementById("globalMessage");
      a.preventDefault();
      $.hasClass(b, "shown") ? ($.toggleClass(b, "shown"), g.style.display = "", b.innerHTML = "View Important Announcement") : ($.addClass(b, "shown"), g.style.display = "block", b.innerHTML = "Close Announcement")
    }

    function e(a) {
      a.preventDefault();
      if (a = document.getElementById("postForm")) this.parentNode.style.display = "none", a.style.display = "table", initRecaptcha()
    }

    function l() {
      var a = document.getElementById("postForm");
      "table" == a.style.display ? (a.style.display = "", this.textContent = "Start a New Thread") : (a.style.display = "table", this.textContent = "Close Post Form", initRecaptcha())
    }

    function m() {
      return /(\/|\.|\*|\+|\?|\(|\)|\[|\]|\{|\}|\\)/g
    }

    function p() {
      var a = new Date;
      a.setTime(a.getTime() + 31536E6);
      document.cookie = ja + "=" + this.value + ";" + a.toGMTString() + "; path=/; domain=4chan.org";
      q()
    }

    function q() {
      location.href = location.href
    }

    function O(a, b) {
      var g;
      return function() {
        var c = arguments,
          f = this;
        clearTimeout(g);
        g = setTimeout(function() {
          b.apply(f, c)
        }, a)
      }
    }

    function A() {
      var a, b = $.id("qf-cnt");
      $.hasClass(D, "active") ? (X(), b.style.display = "none", $.removeClass(D, "active")) : (b.style.display = "inline", a = $.id("qf-box"), b.hasAttribute("data-built") || (b.setAttribute("data-built", "1"), $.on(a, "keyup", O(250, P)), $.on(a, "keydown", function(a) {
        "27" == a.keyCode && A()
      })), a.focus(), a.value = "", $.addClass(D, "active"))
    }

    function P() {
      var a, b;
      "" != (b = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", b), sessionStorage.setItem("4chan-catalog-search-board", k.slug)), a = m(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = b, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", b = b.replace(a, "\\$1"), J = new RegExp(b, "i"), s()) : X()
    }

    function X(a) {
      var b = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      a ? (b.value = "", b.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), J = !1, s())
    }

    function Ba() {
      var a, b;
      if (UA.hasWebStorage) $.on(t, "mousedown", function(g) {
        a = g.target;
        if (-1 != a.className.indexOf("thumb"))
          if (b = a.getAttribute("data-id"), 3 == g.which) t.setAttribute("contextmenu", "ctxmenu-thread"), $.id("ctxmenu-thread").target = b;
          else {
            if (1 == g.which && g.altKey) return ka(b), !1;
            if (1 == g.which && g.shiftKey) return la(b), !1
          } else 3 == g.which && t.setAttribute("contextmenu", "ctxmenu-main")
      });
      if (!B.nobinds) $.on(document, "keyup", Y)
    }

    function ka(a) {
      0 <= u[a] ? delete u[a] : u[a] = k.threads[a].r || 0;
      localStorage.setItem("4chan-pin-" + k.slug, JSON.stringify(u));
      s()
    }

    function la(a) {
      Z ? (delete K[a], --E) : (K[a] = !0, ++E);
      localStorage.setItem("4chan-hide-t-" + k.slug, JSON.stringify(K));
      $.id("thread-" + a).style.display = "none";
      aa("hidden", E);
      0 == E && ba(!1)
    }

    function ba(a) {
      Z = a;
      $.id("filters-clear-hidden").textContent = $.id("filters-clear-hidden-bottom").textContent = a ? "Back" : "Show";
      s()
    }

    function aa(a, b) {
      var g = a + "-label",
        c = a + "-count";
      0 < b ? ($.id(c).textContent = $.id(c + "-bottom").textContent = b, $.id(g).style.display = $.id(g + "-bottom").style.display = "inline") : $.id(g).style.display = $.id(g + "-bottom").style.display = "none"
    }

    function Ca(a) {
      window.open("http://sys.4chan.org/" + k.slug + "/imgboard.php?mode=report&no=" +
        a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
    }

    function Da(a) {
      a = a.target.getAttribute("data-cmd");
      ma[a]($.id("ctxmenu-thread").target)
    }

    function Y(a) {
      var b = a.target;
      if ("TEXTAREA" != b.nodeName && "INPUT" != b.nodeName && na[a.keyCode]) na[a.keyCode]()
    }

    function oa(a) {
      a.preventDefault();
      0 < E && ("Show" == $.id("filters-clear-hidden").textContent ? ba(!0) : ba(!1))
    }

    function Ea() {
      u = {};
      localStorage.removeItem("4chan-pin-" + k.slug);
      s();
      return !1
    }

    function Fa(a) {
      var b = a.target,
        g;
      (b = a.target) != document && ((g = b.getAttribute("data-watch")) ? ThreadWatcher.toggle(g, k.slug, k.threads[g].sub, k.threads[g].teaser, k.threads[g].lr.id) : "backdrop" == b.id ? ca($.id("filters")) ? ca($.id("theme")) || Q() : ca($.id("filters-protip")) ? da() : pa() : "filter-palette" == a.target.id && R())
    }

    function Ga() {
      var a = $.id("filters-protip");
      a.style.top = window.pageYOffset + 50 + "px";
      $.removeClass(a, "hidden")
    }

    function pa() {
      $.addClass($.id("filters-protip"), "hidden")
    }

    function Ha(a) {
      var b = a.target;
      if ("filters-close" == b.id) da();
      else if ("filters-add" == b.id) $.id("filter-list").appendChild(qa({
        active: 1,
        pattern: "",
        boards: "",
        color: "",
        hidden: 0,
        top: 0,
        hits: 0
      }, Ia()));
      else if ("filters-save" == b.id) Ja(), da();
      else if (b.hasAttribute("data-active")) ea(b, "active");
      else if (b.hasAttribute("data-hide")) ea(b, "hide", "top");
      else if (b.hasAttribute("data-top")) ea(b, "top", "hide");
      else if ($.hasClass(b, "filter-color")) {
        var g;
        a = b.getBoundingClientRect();
        if (!y) {
          var c, f, d, h, e, l;
          y = $.id("filter-palette");
          c = $.id("filter-color-table");
          d = $.tag("tbody", c)[0];
          h = n.filterColors.length;
          if (0 < h)
            for (g = n.filterColors[0].length, f = $.tag("tfoot", c)[0], c = f.children.length - 1; 0 <= c; c--) f.children[c].firstElementChild.setAttribute("colspan", g);
          for (c = 0; c < h; ++c) {
            e = document.createElement("tr");
            for (f = 0; f < g; ++f) l = document.createElement("td"), l.innerHTML = '<span class="button clickbox" style="background:' + n.filterColors[c][f] + '"></span>', $.on(l.firstElementChild, "click", fa), e.appendChild(l);
            d.appendChild(e)
          }
        }
        $.removeClass(y, "hidden");
        y.setAttribute("data-target", b.id.split("-")[2]);
        g = y.firstElementChild;
        g.style.cssText = "top:" + a.top + "px;left:" + (a.left - g.clientWidth - 10) + "px;"
      } else b.hasAttribute("data-target") ? (a = $.id("filter-" + b.getAttribute("data-target")), a.parentNode.removeChild(a)) : b.hasAttribute("data-up") && (a = b.parentNode.parentNode, (g = a.previousElementSibling) && a.parentNode.insertBefore(a, g))
    }

    function Ka() {
      var a, b, g, c, f, d;
      b = $.id("filters");
      b.hasAttribute("data-built") || ($.on(b, "click", Ha), $.on($.id("filter-palette-close"), "click", R), $.on($.id("filter-palette-clear"), "click", La), $.on($.id("filters-help-open"), "click", Ga), $.on($.id("filters-help-close"), "click", pa), $.on($.id("filter-rgb"), "keyup", Ma), $.on($.id("filter-rgb-ok"), "click", fa), b.setAttribute("data-built", "1"));
      g = localStorage.getItem("catalog-filters");
      f = 0;
      if (g) {
        c = $.id("filter-list");
        g = JSON.parse(g);
        for (a in g) c.appendChild(qa(g[a], f)), ++f;
        ra()
      }
      b.style.top = window.pageYOffset + 60 + "px";
      $.removeClass(b, "hidden");
      (d = $.cls("filter-active", b)[0]) && d.focus();
      S()
    }

    function da() {
      var a, b, g;
      $.id("filters-msg").style.display = "none";
      $.addClass($.id("filters"), "hidden");
      b = $.id("filter-list");
      g = $.tag("tr", b);
      for (a = g.length - 1; 0 <= a; a--) b.removeChild(g[a]);
      R();
      S()
    }

    function R() {
      y && !$.hasClass(y, "hidden") && $.addClass(y, "hidden")
    }

    function sa() {
      if (UA.hasWebStorage) {
        H = {};
        var a = localStorage.getItem("catalog-filters");
        if (a) {
          var a = JSON.parse(a),
            b, g, c, f, d, h = /^\/(.*)\/(i?)$/,
            e = /\s*\|+\s*/g,
            l = /\\\*/g,
            n = m(),
            p, u, t, r, v, q, s, w;
          try {
            for (g in a)
              if (b = a[g], b.active && "" != b.pattern && (!b.boards || -1 != b.boards.split(" ").indexOf(k.slug))) {
                r = b.pattern;
                if ("#" == r.charAt(0)) w = "#" == r.charAt(1) ? 2 : 1, v = new RegExp(r.slice(w).replace(n, "\\$1"));
                else if (w = 0, p = r.match(h)) v = new RegExp(p[1], p[2]);
                else if ('"' == r.charAt(0) && '"' == r.charAt(r.length - 1)) v = new RegExp(r.slice(1, -1).replace(n, "\\$1"));
                else {
                  t = r.replace(e, "|").split(" ");
                  v = "";
                  d = t.length;
                  for (f = 0; f < d; ++f)
                    if (-1 != t[f].indexOf("|")) {
                      q = t[f].split("|");
                      s = [];
                      for (c = q.length - 1; 0 <= c; c--) "" != q[c] && s.push(q[c].replace(n, "\\$1"));
                      u = s.join("|").replace(l, "[^\\s]*");
                      v += "(?=.*\\b(" + u + ")\\b)"
                    } else u = t[f].replace(n, "\\$1").replace(l, "[^\\s]*"), v += "(?=.*\\b" + u + "\\b)";
                  v = new RegExp("^" + v, "i")
                }
                H[g] = {
                  type: w,
                  pattern: v,
                  boards: b.boards,
                  fid: g,
                  hidden: b.hidden,
                  color: b.color,
                  top: b.top,
                  hits: 0
                }
              }
          } catch (B) {
            alert("There was an error processing one of the filters: " + B + " in: " + b.pattern)
          }
        }
      }
    }

    function Ja() {
      var a, b, g, c, f, d;
      c = {};
      d = $.id("filter-list").children;
      for (a = 0; b = d[a]; ++a) g = {
        active: $.cls("filter-active", b)[0].checked ? 1 : 0,
        pattern: $.cls("filter-pattern", b)[0].value,
        boards: $.cls("filter-boards", b)[0].value,
        hidden: $.cls("filter-hide", b)[0].checked ? 1 : 0,
        top: $.cls("filter-top", b)[0].checked ? 1 : 0
      }, b = $.cls("filter-color", b)[0], b.hasAttribute("data-nocolor") || (g.color = b.style.backgroundColor), c[a] = g;
      c[0] ? localStorage.setItem("catalog-filters", JSON.stringify(c)) : localStorage.removeItem("catalog-filters");
      f = $.id("filters-msg");
      f.innerHTML = "Done";
      f.className = "msg-ok";
      f.style.display = "inline";
      setTimeout(function() {
        f.style.display = "none"
      }, 2E3);
      sa();
      s();
      ra()
    }

    function Ma() {
      $.id("filter-rgb-ok").style.backgroundColor = this.value
    }

    function qa(a, b) {
      var g, c, f;
      c = document.createElement("tr");
      c.id = "filter-" + b;
      g = document.createElement("td");
      f = document.createElement("span");
      f.setAttribute("data-up", b);
      f.className = "pointer";
      f.innerHTML = "&uarr;";
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.active;
      f.className = "filter-active";
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      f = document.createElement("input");
      f.type = "text";
      f.value = a.pattern;
      f.className = "filter-pattern";
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      f = document.createElement("input");
      f.type = "text";
      f.value = a.boards;
      f.className = "filter-boards";
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      f = document.createElement("span");
      f.id = "filter-color-" + b;
      f.title = "Change Color";
      f.className = "button clickbox filter-color";
      a.color ? f.style.background = a.color : (f.setAttribute("data-nocolor", "1"), f.innerHTML = "&#x2215;");
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.hidden;
      f.className = "filter-hide";
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.top;
      f.className = "filter-top";
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      f = document.createElement("span");
      f.setAttribute("data-target", b);
      f.className = "pointer";
      f.innerHTML = "&times;";
      g.appendChild(f);
      c.appendChild(g);
      g = document.createElement("td");
      g.id = "fhc-" + b;
      g.className = "filter-hits";
      c.appendChild(g);
      return c
    }

    function fa(a) {
      var b = $.id("filter-color-" + y.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background = this.style.backgroundColor);
      R()
    }

    function La() {
      fa(!0)
    }

    function Ia() {
      var a, b, c, d = $.id("filter-list").children;
      if (d.length) {
        for (a = c = 0; b = d[a]; ++a) b = +b.id.slice(7), b > c && (c = b);
        return c + 1
      }
      return 0
    }

    function ea(a, b, c) {
      b = "data-" + b;
      "0" == a.getAttribute(b) ? (a.setAttribute(b, "1"), $.addClass(a, "active"), a.innerHTML = "&#x2714;", c && (a = $.cls("filter-" + c, a.parentNode.parentNode)[0], a.setAttribute("data-" + c, "0"), $.removeClass(a, "active"), a.innerHTML = "")) : (a.setAttribute(b, "0"), $.removeClass(a, "active"), a.innerHTML = "")
    }

    function ra() {
      var a, b, c = $.id("filter-list").children;
      for (a = 0; b = c[a]; ++a) $.id("fhc-" + b.id.slice(7)).innerHTML = H[a] ? "x" + H[a].hits : ""
    }

    function ca(a) {
      return $.hasClass(a, "hidden")
    }

    function L() {
      var a, b;
      UA.hasWebStorage ? (a = $.id("theme"), theme = (theme = localStorage.getItem("catalog-theme")) ? JSON.parse(theme) : {}, $.id("theme-nobinds").checked = !!theme.nobinds, $.id("theme-nospoiler").checked = !!theme.nospoiler, $.id("theme-newtab").checked = !!theme.newtab, $.id("theme-tw").checked = M, $.id("theme-ddn").checked = N, theme.css && ($.id("theme-css").value = theme.css), $.on($.id("theme-save"), "click", ta), $.on($.id("theme-close"), "click", Q), $.id("theme-msg").style.display = "none", a.style.top = window.pageYOffset + 60 + "px", $.removeClass(a, "hidden"), (b = $.tag("input", a)[0]) && b.focus(), S()) : alert("Your browser doesn't support Local Storage")
    }

    function Q() {
      $.off($.id("theme-save"), "click", ta);
      $.off($.id("theme-close"), "click", Q);
      $.addClass($.id("theme"), "hidden");
      S()
    }

    function S() {
      $.toggleClass($.id("backdrop"), "hidden")
    }

    function ua(a, b) {
      if (a.nobinds) B.nobinds != a.nobinds && $.off(document, "keyup", Y);
      else if (B.nobinds != a.nobinds) $.on(document, "keyup", Y);
      b || T.applyCSS(a)
    }

    function ta() {
      var b, c, g, d, f = {};
      $.id("theme-nobinds").checked && (f.nobinds = !0);
      $.id("theme-nospoiler").checked && (f.nospoiler = !0);
      $.id("theme-newtab").checked && (f.newtab = !0);
      c = $.id("theme-tw").checked;
      g = $.id("theme-ddn").checked;
      d = (d = localStorage.getItem("4chan-settings")) ? JSON.parse(d) : {};
      c != M && (c ? (ThreadWatcher.init(), d.disableAll = !1) : ThreadWatcher.unInit());
      if (g != N)
        if (g) a(), d.disableAll = !1;
        else {
          var e, h, l;
          h = $.id("boardNavDesktop");
          l = $.id("boardNavDesktopFoot");
          if (V) {
            if (e = $.cls("pageJump", h)[0]) $.id("settingsWindowLinkClassic").removeEventListener("click", L, !1), h.removeChild(e);
            $.removeClass(h, "persistentNav")
          } else h.style.display = "", $.addClass($.id("boardNavMobile"), "mobile");
          l.style.display = "";
          $.removeClass(document.body, "hasDropDownNav")
        }
      d.threadWatcher = c;
      d.dropDownNav = g;
      localStorage.setItem("4chan-settings", JSON.stringify(d));
      M = c;
      N = g;
      "" != (c = $.id("theme-css").value) && (f.css = c);
      ua(f);
      localStorage.removeItem("catalog-theme");
      for (b in f) {
        localStorage.setItem("catalog-theme", JSON.stringify(f));
        break
      }
      B = f;
      s();
      Q()
    }

    function va(a) {
      var b, c, d = !1,
        f = k.order.date[0];
      if (c = localStorage.getItem(a)) {
        c = JSON.parse(c);
        for (b in c)!k.threads[b] && b < f && (delete c[b], d = !0);
        for (b in c) return d && localStorage.setItem(a, JSON.stringify(c)), c;
        localStorage.removeItem(a)
      }
      return {}
    }

    function ha() {
      var a, b, c;
      if (UA.hasWebStorage) {
        c = {};
        for (a = wa.length - 1; 0 <= a; a--) b = wa[a], c[b] = n[b];
        localStorage.setItem("catalog-settings", JSON.stringify(c))
      }
    }

    function xa(a, b) {
      var c = "";
      a ? ($teaserCtrl.selectedIndex = 1, c = "extended-", n.extended = !0) : ($teaserCtrl.selectedIndex = 0, n.extended = !1);
      c = n.large ? c + "large" : c + "small";
      t.className = c;
      b || ha()
    }

    function ya(a, b) {
      var c = n.extended ? "extended-" : "";
      a ? (z.selectedIndex = 1, c += "large", n.large = !0) : (z.selectedIndex = 0, c += "small", n.large = !1);
      t.className = c;
      b || (ha(), s())
    }

    function x(a, b) {
      var c = {
        alt: 0,
        absdate: 1,
        date: 2,
        r: 3
      };
      void 0 !== c[a] ? (F.selectedIndex = c[a], n.orderby = a) : (F.selectedIndex = 0, n.orderby = "date");
      b || (ha(), s())
    }

    function Na() {
      xa("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Oa() {
      x(F.options[F.selectedIndex].value)
    }

    function Pa() {
      ya("large" == z.options[z.selectedIndex].value)
    }

    function s() {
      var a, b, c, d, f, e, h, l, m, p, q, s, y = 0,
        r = "",
        v = 0,
        A, D, w, z = "",
        x, C, G, I, F;
      if (0 != k.count) {
        s = k.custom_spoiler ? n.imgspoiler + "-" + k.slug + k.custom_spoiler + ".png" : n.imgspoiler + ".png";
        t.hasChildNodes() && ((a = document.getElementById("th-tip")) && document.body.removeChild(a), t.textContent = "");
        q = "//boards.4chan.org/" + k.slug + "/thread/";
        A = ".t.4cdn.org/" + k.slug + "/";
        E = 0;
        for (d in H) H[d].hits = 0;
        F = !n.large;
        D = B.newtab ? 'target="_blank" ' : "";
        a = 0;
        a: for (; a < k.count; ++a) {
          f = k.order[n.orderby][a];
          e = k.threads[f];
          l = m = p = !1;
          e.sub ? (w = "<b>" + e.sub + "</b>", e.teaser && (w += ": " + e.teaser)) : w = e.teaser;
          if (Z) {
            if (!K[f]) continue;
            ++E
          } else if (!J) {
            if (K[f]) {
              ++E;
              continue
            }
            if (0 <= u[f]) p = m = !0;
            else
              for (d in c = e.capcode ? (e.trip || "") + "!#" + e.capcode : e.trip, H)
                if (h = H[d], 0 == h.type && (h.pattern.test(w) || h.pattern.test(e.file)) || 1 == h.type && h.pattern.test(c) || 2 == h.type && h.pattern.test(e.author)) {
                  if (h.hidden) {
                    ++y;
                    h.hits += 1;
                    continue a
                  }
                  l = h;
                  m = !!h.top;
                  h.hits += 1;
                  break
                }
          } else if (!J.test(w) && !J.test(e.file)) continue;
          0 <= u[f] && (p = m = !0);
          v = 0 === v ? 1 : 0;
          h = '<div id="thread-' + f + '" class="thread">';
          M && (c = f + "-" + k.slug, h += '<span id="leaf-' +
            f + '" data-watch="' + f + '" ' + (ThreadWatcher.watched[c] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          h += "<a " + D + 'href="' + q + f + (e.semantic_url ? "/" + e.semantic_url : "") + '"><img alt="" id="thumb-' + f + '" class="thumb';
          c = l.color ? ' hl" style="border-color: ' + l.color : p ? " pinned" : "";
          e.imgurl ? e.imgspoiler && !B.nospoiler ? h += c + '" src="' + s : (G = e.tn_w, I = e.tn_h, F && (C = n.smallsize, G > C && (x = C / G, G = C, I *= x), I > C && (x = C / I, I = C, G *= x)), h += c + '" width="' + G + '" height="' + I + '" src="//' + v + A + e.imgurl + "s.jpg") : h = e.imgdel ? h + (" imgdel" + c + '" src="' + n.imgdel) : h + (" nofile" + c + '" src="' + n.nofile);
          h += '" data-id="' + f + '" /></a>';
          if (e.sticky || e.closed || e.capcodereps) {
            h += '<div class="threadIcons">';
            e.sticky && (h += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            e.closed && (h += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (e.capcodereps)
              for (x = e.capcodereps.split(","), c = 0; C = x[c]; ++c)
                if (G = Qa[C]) h += '<span title="' + G + ' Replies" class="threadIcon ' + C + 'Icon"></span>';
            h += "</div>"
          }
          h += '<div title="(R)eplies / (I)mages' +
            (m ? " / (P)age" : "") + '" id="meta-' + f + '" class="meta">';
          e.r && (h = e.bumplimit ? h + ("<i>R: <b>" + e.r + "</b></i>") : h + ("R: <b>" + e.r + "</b>"), p && (p = e.r - u[f], 0 < p ? (h += " (+" + p + ")", u[f] = e.r) : h += "(+0)"), e.i && (h = e.imagelimit ? h + (" / <i>I: <b>" + e.i + "</b></i>") : h + (" / I: <b>" + e.i + "</b>")));
          m && 0 <= (page = 0 | k.order.alt.indexOf(f) / k.pagesize) && (e.r && (h += " / "), h += "P: <b>" + page + "</b>");
          h += "</div>";
          w && (h += '<div class="teaser', l.color && (h += ' style="color:' + l.color), h += '">' + w + "</div>");
          h = window.partyHats ? '<div class="party-cnt">' +
            h + '</div><img class="party-hat" src="//s.4cdn.org/image/' + window.partyHats + '"></div>' : h + "</div>";
          m ? z += h : r += h
        }
        r = J && "" == r && "" == z ? '<div class="error">Nothing Found</div>' : z ? z + r + '<div class="clear"></div>' : r + '<div class="clear"></div>';
        for (b in u) {
          localStorage.setItem("4chan-pin-" + k.slug, JSON.stringify(u));
          break
        }
        t.innerHTML = r;
        aa("filtered", y);
        aa("hidden", E)
      }
    }

    function Ra(a) {
      a = a.target;
      $.hasClass(a, "thumb") && (clearTimeout(ia), U && za(), ia = setTimeout(Sa, n.tipdelay, a))
    }

    function Ta(a) {
      clearTimeout(ia);
      U && za()
    }

    function Sa(a) {
      var b, c, d, e;
      b = Date.now() / 1E3;
      e = a.getBoundingClientRect();
      d = document.documentElement.offsetWidth;
      thread = k.threads[a.getAttribute("data-id")];
      c = thread.sub ? '<span class="post-subject">' + thread.sub + "</span>" : "Posted";
      c += ' by <span class="' + (thread.capcode ? thread.capcode + "-capcode " : "") + 'post-author">' + (thread.author || k.anon);
      thread.trip && (c += ' <span class="post-tripcode">' + thread.trip + "</span>");
      thread.capcode && (c += " ## " + thread.capcode.charAt(0).toUpperCase() + thread.capcode.slice(1));
      c += "</span> ";
      k.flags && thread.country && (c += '<div class="flag flag-' + thread.country.toLowerCase() + '"></div> ');
      c += '<span class="post-ago">' + Aa(b - thread.date) + " ago</span>";
      !n.extended && thread.teaser && (c += '<p class="post-teaser">' + thread.teaser + "</p>");
      0 < thread.r && (c += '<div class="post-last">Last reply by <span class="' + (thread.lr.capcode ? thread.lr.capcode + "-capcode " : "") + 'post-author">' + thread.lr.author, thread.lr.trip && (c += ' <span class="post-tripcode">' + thread.lr.trip + "</span>"), thread.lr.capcode && (c += " ## " + thread.lr.capcode.charAt(0).toUpperCase() + thread.lr.capcode.slice(1)), c += '</span> <span class="post-ago">' + Aa(b - thread.lr.date) + " ago</span>");
      b = document.createElement("div");
      b.id = "post-preview";
      b.innerHTML = c;
      document.body.appendChild(b);
      c = b.style;
      d - e.right < (0 | .3 * d) ? (d -= e.left, c.right = d + 5 + "px") : (d = e.left + e.width, c.left = d + 5 + "px");
      c.top = e.top + a.offsetHeight + window.pageYOffset - b.offsetHeight / 2 - e.height / 2 + "px";
      U = !0
    }

    function za() {
      document.body.removeChild($.id("post-preview"));
      U = !1
    }

    function Aa(a, b) {
      var c, d;
      if (2 > a) return "less than a second";
      if (b && 300 > a || 60 > a) return (0 | a) + " seconds";
      if (3600 > a) return c = 0 | a / 60, 1 < c ? c + " minutes" : "one minute";
      if (86400 > a) return c = 0 | a / 3600, d = 1 < c ? c + " hours" : "one hour", c = 0 | a / 60 - 60 * c, 1 < c && (d += " and " + c + " minutes"), d;
      c = 0 | a / 86400;
      d = 1 < c ? c + " days" : "one day";
      c = 0 | a / 3600 - 24 * c;
      1 < c && (d += " and " + c + " hours");
      return d
    }
    var T = this,
      n = {
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
      Qa = {
        admin: "Administrator",
        mod: "Moderator",
        developer: "Developer",
        manager: "Manager"
      },
      na = {
        83: function() {
          $.hasClass(D, "active") ? X(!0) : A()
        },
        82: q,
        88: function() {
          "date" == n.orderby ? x("alt") : "alt" == n.orderby ? x("r") : "r" == n.orderby ? x("absdate") : x("date")
        }
      },
      k = {},
      wa = ["orderby", "large", "extended"],
      B = {},
      ja, W, H = {},
      U = !1,
      ia = null,
      u = {},
      K = {},
      E = 0,
      M = !1,
      N = !1,
      V = !1,
      J = !1,
      Z = !1,
      t, D, z, F, y, ma;
    2 <= window.devicePixelRatio && (n.imgdel.replace(".", "@2x."), n.nofile.replace(".", "@2x."));
    UA.init();
    (function() {
      var a;
      UA.hasWebStorage && (a = localStorage.getItem("catalog-theme")) && (B = JSON.parse(a))
    })();
    (function() {
      var a = $.readCookie("extra_path");
      a && /^[a-z0-9]+$/.test(a) && document.write('<script type="text/javascript" src="https://s.4cdn.org/js/' + a + "." + window.jsVersion + '.js">\x3c/script>')
    })();
    initPass();
    T.init = function() {
      var b, m, g;
      FC.hasMobileLayout = checkMobileLayout();
      buildMobileNav();
      ua(B, !0);
      t = $.id("threads");
      D = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      z = $.id("size-ctrl");
      F = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(D, "click", A);
      $.on($.id("filters-clear-hidden"), "click", oa);
      $.on($.id("filters-clear-hidden-bottom"), "click", oa);
      $.on($.id("qf-clear"), "click", A);
      $.on($.id("settingsWindowLink"), "click", L);
      $.on($.id("settingsWindowLinkBot"), "click", L);
      $.on($.id("settingsWindowLinkMobile"), "click", L);
      $.on($.id("filters-ctrl"), "click", Ka);
      $.on($teaserCtrl, "change", Na);
      $.on(z, "change", Pa);
      $.on(F, "change", Oa);
      $.on(t, "mouseover", Ra);
      $.on(t, "mouseout", Ta);
      $.on($.id("togglePostFormLink").firstElementChild, "click", e);
      $.on($.id("togglePostFormLinkMobile"), "click", l);
      $.on(document, "click", Fa);
      $.on(window, "load", checkForBlock);
      var k;
      UA.hasWebStorage && (k = localStorage.getItem("catalog-settings")) && $.extend(n, JSON.parse(k));
      Ba();
      var f, p;
      if (UA.hasWebStorage && (b = $.id("globalMessage")) && b.textContent && (b.nextElementSibling.style.clear = "both", k = document.createElement("span"), k.id = "toggleMsgBtn", k.setAttribute("data-cmd", "toggleMsg"), k.title = "Toggle announcement", p = localStorage.getItem("4chan-global-msg"), f = b.getAttribute("data-utc"), p && f <= p ? (b.style.display = "none", k.style.opacity = "0.5", k.className = "expandIcon") : k.className = "collapseIcon", $.on(k, "click", c), b.parentNode.insertBefore(k, b), k = $.id("globalToggle"), 0 < k.offsetWidth)) $.on(k, "click", d);
      initBlotter();
      UA.hasContextMenu && (ma = {
        pin: ka,
        hide: la,
        report: Ca
      }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>', $.on($.id("ctxmenu-main"), "click", Ea), $.on($.id("ctxmenu-thread"), "click", Da));
      UA.hasWebStorage && ((b = localStorage.getItem("4chan-settings")) ? (b = JSON.parse(b), b.disableAll || (b.filter && (ThreadWatcher.hasFilters = !0), b.threadWatcher && (M = !0, ThreadWatcher.init()), b.customMenu && CustomMenu.apply(b.customMenuList), !1 === b.dropDownNav || FC.hasMobileLayout || (N = !0, V = b.classicNav, a()))) : UA.isMobileDevice && !FC.hasMobileLayout && (N = !0, a()));
      window.passEnabled && setPassMsg();
      (m = document.forms.post.flag) && (g = $.readCookie("4chan_flag")) && (m = m.querySelector('option[value="' + g + '"]')) && m.setAttribute("selected", "selected");
      x(n.orderby, !0);
      ya(n.large, !0);
      xa(n.extended, !0);
      loadBannerImage()
    };
    T.loadCatalog = function(a) {
      var c;
      k = a;
      b();
      var d, e, f;
      d = $.id("styleSelector");
      e = d.children;
      for (a = 0; f = e[a]; ++a) f.value == W && (d.selectedIndex = a);
      $.on(d, "change", p);
      sa();
      UA.hasWebStorage && (K = va("4chan-hide-t-" + k.slug), u = va("4chan-pin-" + k.slug));
      UA.hasSessionStorage && !location.hash && (c = sessionStorage.getItem("4chan-catalog-search")) ? k.slug != sessionStorage.getItem("4chan-catalog-search-board") && (sessionStorage.removeItem("4chan-catalog-search"), sessionStorage.removeItem("4chan-catalog-search-board"), c = null) : location.hash && (c = location.hash.match(/#s=(.+)/)) && (c = decodeURIComponent(c[1].replace(/\+/g, " ")));
      c ? (A(), $.id("qf-box").value = c, P()) : s()
    };
    T.applyCSS = function(a, b, c) {
      var d, e;
      a || (a = B);
      void 0 !== b && ((e = $.readCookie(b)) || (e = "nws_style" == b ? "Yotsuba New" : "Yotsuba B New"), ja = b, W = e, d = document.createElement("link"), d.type = "text/css", d.id = "base-css", d.rel = "stylesheet", d.setAttribute("href", "//s.4cdn.org/css/catalog_" + e.toLowerCase().replace(/ /g, "_") + "." + c + ".css"), document.head.insertBefore(d, $.id("mobile-css")));
      (d = $.id("custom-css")) && document.head.removeChild(d);
      a.css && (d = document.createElement("style"), d.type = "text/css", d.id = "custom-css", d.styleSheet ? d.styleSheet.cssText = a.css : d.innerHTML = a.css, document.head.appendChild(d));
      UA.dispatchEvent("4chanMainInit")
    }
  },
  Filter = {
    init: function() {
      this.entities = document.createElement("div");
      Filter.load()
    },
    match: function(a, b) {
      var c, d, e, l, m;
      m = !1;
      l = Filter.activeFilters;
      for (c = 0; e = l[c]; ++c)
        if (e.boards[b])
          if (0 == e.type) {
            if (e.pattern === a.trip) {
              m = !0;
              break
            }
          } else if (1 == e.type) {
        if (e.pattern === a.name) {
          m = !0;
          break
        }
      } else if (2 == e.type && a.com) {
        if (void 0 === d && (this.entities.innerHTML = a.com.replace(/<br>/g, "\n").replace(/[<[^>]+>/g, ""), d = this.entities.textContent), e.pattern.test(d)) {
          m = !0;
          break
        }
      } else if (4 == e.type) {
        if (e.pattern === a.id) {
          m = !0;
          break
        }
      } else if (5 == e.type) {
        if (e.pattern.test(a.sub)) {
          m = !0;
          break
        }
      } else if (6 == e.type && e.pattern.test(a.filename)) {
        m = !0;
        break
      }
      return m
    },
    load: function() {
      var a, b, c, d, e, l, m, p, q, O, A;
      this.activeFilters = [];
      if (d = localStorage.getItem("4chan-filters")) {
        d = JSON.parse(d);
        m = /(\/|\.|\*|\+|\?|\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
        p = /^\/(.*)\/(i?)$/;
        A = /\\\*/g;
        try {
          for (l = 0; c = d[l]; ++l)
            if (c.active && "" != c.pattern) {
              if (c.boards)
                for (tmp = c.boards.split(/[^a-z0-9]+/i), boards = {}, a = 0; b = tmp[a]; ++a) boards[b] = !0;
              else boards = !1;
              e = c.pattern;
              if (c.type && 1 != c.type && 4 != c.type)
                if (match = e.match(p)) pattern = new RegExp(match[1], match[2]);
                else if ('"' == e[0] && '"' == e[e.length - 1]) pattern = new RegExp(e.slice(1, -1).replace(m, "\\$1"));
              else {
                q = e.split(" ");
                pattern = "";
                a = 0;
                for (b = q.length; a < b; ++a) O = q[a].replace(m, "\\$1").replace(A, "[^\\s]*"), pattern += "(?=.*\\b" + O + "\\b)";
                pattern = new RegExp("^" + pattern, "im")
              } else pattern = e;
              this.activeFilters.push({
                type: c.type,
                pattern: pattern,
                boards: boards,
                color: c.color,
                hide: c.hide,
                auto: c.auto
              })
            }
        } catch (P) {
          alert("There was an error processing one of the filters: " + P + " in: " + e)
        }
      }
    }
  },
  ThreadWatcher = {
    hasFilters: !1,
    init: function() {
      var a, b;
      this.hasFilters && Filter.init();
      this.listNode = null;
      this.charLimit = 45;
      this.watched = {};
      this.blacklisted = {};
      this.isRefreshing = !1;
      FC.hasMobileLayout && (el = document.createElement("a"), el.href = "#", el.textContent = "TW", el.addEventListener("click", ThreadWatcher.toggleList, !1), a = $.id("settingsWindowLinkMobile"), a.parentNode.insertBefore(el, a), a.parentNode.insertBefore(document.createTextNode(" "), a));
      a = document.createElement("div");
      a.id = "threadWatcher";
      a.setAttribute("data-trackpos", "TW-position");
      FC.hasMobileLayout ? a.style.display = "none" : (b = localStorage.getItem("catalog-tw-pos")) ? a.style.cssText = b : (a.style.left = "10px", a.style.top = "75px");
      a.innerHTML = '<div class="drag" id="twHeader">' + (FC.hasMobileLayout ? '<div id="twClose" class="icon closeIcon"></div>' : "") + "Thread Watcher" + (UA.hasCORS ? '<div id="twPrune" class="icon refreshIcon" title="Refresh"></div></div>' : "</div>");
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
      if (storage = localStorage.getItem("4chan-watch")) this.watched = JSON.parse(storage);
      if (storage = localStorage.getItem("4chan-watch-bl")) this.blacklisted = JSON.parse(storage)
    },
    build: function() {
      var a, b, c;
      a = "";
      for (c in this.watched) b = c.split("-"), a += '<li id="watch-' + c + '"><span class="pointer" data-cmd="unwatch" data-id="' + b[0] + '" data-board="' + b[1] + '">&times;</span> <a href="' + this.linkToThread(b[0], b[1], this.watched[c][1]) + '"', a = -1 == this.watched[c][1] ? a + ' class="deadlink">' : this.watched[c][2] ? a + (' class="hasNewReplies">(' + this.watched[c][2] + ") ") : a + ">", a += "/" + b[1] + "/ - " + this.watched[c][0] + "</a></li>";
      ThreadWatcher.listNode.innerHTML = a
    },
    onClick: function(a) {
      a = a.target;
      a.hasAttribute("data-id") ? ThreadWatcher.toggle(a.getAttribute("data-id"), a.getAttribute("data-board")) : "twPrune" != a.id || ThreadWatcher.isRefreshing ? "twClose" == a.id && ThreadWatcher.toggleList() : ThreadWatcher.refreshWithAutoWatch()
    },
    generateLabel: function(a, b, c) {
      var d;
      return d = (d = a) ? d.slice(0, this.charLimit) : (d = b) ? d.replace(/(?:<br>)+/g, " ").replace(/<[^>]*?>/g, "").slice(0, this.charLimit) : "No." + c
    },
    toggle: function(a, b, c, d, e) {
      var l;
      b = a + "-" + b;
      l = $.id("leaf-" + a);
      this.watched[b] ? (delete this.watched[b], l && (l.className = "watchIcon", l.title = "Watch")) : (c = ThreadWatcher.generateLabel(c, d, a), this.watched[b] = [c, e || a, 0], l.className = "unwatchIcon", l.title = "Unwatch");
      this.save();
      this.load();
      this.build()
    },
    addRaw: function(a, b) {
      var c, d;
      c = a.no + "-" + b;
      this.watched[c] || (d = ThreadWatcher.generateLabel(a.sub, a.com, a.no), this.watched[c] = [d, 0, 0])
    },
    save: function() {
      ThreadWatcher.sortByBoard();
      localStorage.setItem("4chan-watch", JSON.stringify(ThreadWatcher.watched));
      for (i in ThreadWatcher.blacklisted) {
        localStorage.setItem("4chan-watch-bl", JSON.stringify(ThreadWatcher.blacklisted));
        break
      }
    },
    sortByBoard: function() {
      var a, b, c, d, e;
      b = ThreadWatcher;
      d = {};
      e = [];
      for (c in b.watched) e.push(c);
      e.sort(function(a, b) {
        a = a.split("-")[1];
        b = b.split("-")[1];
        return a < b ? -1 : a > b ? 1 : 0
      });
      for (a = 0; c = e[a]; ++a) d[c] = b.watched[c];
      b.watched = d
    },
    canAutoRefresh: function() {
      var a;
      return (a = localStorage.getItem("4chan-tw-timestamp")) ? 6E4 <= Date.now() - +a : !1
    },
    setRefreshTimestamp: function() {
      localStorage.setItem("4chan-tw-timestamp", Date.now())
    },
    refreshWithAutoWatch: function() {
      var a, b, c, d, e;
      if (this.hasFilters) {
        Filter.load();
        e = {};
        for (a = c = 0; b = Filter.activeFilters[a]; ++a)
          if (b.auto && b.boards)
            for (d in b.boards) e[d] || (e[d] = !0, ++c);
        c ? (a = $.id("twPrune"), a.className = "icon rotateIcon", this.isRefreshing = !0, this.fetchCatalogs(e, c)) : this.refresh()
      } else this.refresh()
    },
    fetchCatalogs: function(a, b) {
      var c, d, e, l;
      e = {};
      l = {
        count: b
      };
      c = 0;
      for (d in a) setTimeout(ThreadWatcher.fetchCatalog, c, d, e, l), c += 200
    },
    parseCatalogJSON: function(a) {
      var b;
      try {
        b = JSON.parse(a)
      } catch (c) {
        console.log(c), b = []
      }
      return b
    },
    fetchCatalog: function(a, b, c) {
      var d;
      d = new XMLHttpRequest;
      d.open("GET", "//a.4cdn.org/" + a + "/catalog.json");
      d.onload = function() {
        c.count--;
        b[a] = ThreadWatcher.parseCatalogJSON(this.responseText);
        if (!c.count) ThreadWatcher.onCatalogsLoaded(b)
      };
      d.onerror = function() {
        c.count--;
        if (!c.count) ThreadWatcher.onCatalogsLoaded(b)
      };
      d.send(null)
    },
    onCatalogsLoaded: function(a) {
      var b, c, d, e, l, m, p, q;
      $.id("twPrune").className = "icon rotateIcon";
      this.isRefreshing = !1;
      q = {};
      for (d in a)
        for (e = a[d], b = 0; c = e[b]; ++b)
          for (l = c.threads, c = 0; m = l[c]; ++c) p = m.no + "-" + d, this.blacklisted[p] ? q[p] = 1 : Filter.match(m, d) && this.addRaw(m, d);
      this.blacklisted = q;
      this.build(!0);
      this.refresh()
    },
    refresh: function() {
      var a, b, c, d, e;
      if (d = $.id("watchList").children.length)
        for (c in a = b = 0, e = $.id("twPrune"), e.className = "icon rotateIcon", ThreadWatcher.isRefreshing = !0, ThreadWatcher.setRefreshTimestamp(), ThreadWatcher.watched) setTimeout(ThreadWatcher.fetch, b, c, ++a == d ? e : null), b += 200
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
      var c, d;
      c = $.id("watch-" + a);
      if (-1 == ThreadWatcher.watched[a][1]) {
        if (delete ThreadWatcher.watched[a], c.parentNode.removeChild(c), b) ThreadWatcher.onRefreshEnd(b)
      } else c = a.split("-"), d = new XMLHttpRequest, d.onload = function() {
        var c, d, m, p;
        if (200 == this.status) {
          m = ThreadWatcher.parseThreadJSON(this.responseText);
          p = ThreadWatcher.watched[a][1];
          d = 0;
          for (c = m.length - 1; 1 <= c && !(m[c].no <= p); c--)++d;
          d > ThreadWatcher.watched[a][2] && (ThreadWatcher.watched[a][2] = d)
        } else 404 == this.status && (ThreadWatcher.watched[a][1] = -1); if (b) ThreadWatcher.onRefreshEnd(b)
      }, b && (d.onerror = d.onload), d.open("GET", "//a.4cdn.org/" + c[1] + "/thread/" + c[0] + ".json"), d.send(null)
    },
    linkToThread: function(a, b, c) {
      return "//" + location.host + "/" + b + "/res/" +
        a + (0 < c ? "#p" + c : "")
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
      var b, c, d;
      if (!this.parentNode.hasAttribute("data-shiftkey") || a.shiftKey) a.preventDefault(), b = Draggable, c = document.documentElement, b.el = this.parentNode, b.key = b.el.getAttribute("data-trackpos"), d = b.el.getBoundingClientRect(), b.dx = a.clientX - d.left, b.dy = a.clientY - d.top, b.right = c.clientWidth - d.width, b.bottom = c.clientHeight - d.height, "fixed" != getComputedStyle(b.el, null).position ? (b.scrollX = window.scrollX || window.pageXOffset, b.scrollY = window.scrollY || window.pageYOffset) : b.scrollX = b.scrollY = 0, document.addEventListener("mouseup", b.endDrag, !1), document.addEventListener("mousemove", b.onDrag, !1)
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

function setPassMsg() {
  var a;
  a = document.getElementById("captchaFormPart").children[1];
  a.innerHTML = '<div style="padding: 5px;">You are using a 4chan Pass. [<a href="https://sys.4chan.org/auth?act=logout" onclick="confirmPassLogout(event);" tabindex="-1">Logout</a>]</div>';
  a.removeAttribute("style")
}
var CustomMenu = {
  reset: function() {
    var a, b, c, d, e;
    c = $.cls("boardList");
    d = $.cls("customBoardList");
    e = $.cls("show-all-boards");
    for (a = 0; b = e[a]; ++a) b.removeEventListener("click", CustomMenu.reset, !1);
    for (a = d.length - 1; b = d[a]; a--) c[a].style.display = null, b.parentNode.removeChild(b)
  },
  apply: function(a) {
    var b, c, d;
    if (a) {
      d = a.split(/[^0-9a-z]/i);
      cnt = document.createElement("span");
      cnt.className = "customBoardList";
      for (a = 0; c = d[a]; ++a) a ? cnt.appendChild(document.createTextNode(" / ")) : cnt.appendChild(document.createTextNode("[")), b = document.createElement("a"), b.textContent = c, b.href = "//boards.4chan.org/" + c + ("f" !== c ? "/catalog" : ""), cnt.appendChild(b);
      cnt.appendChild(document.createTextNode("]"));
      cnt.appendChild(document.createTextNode(" ["));
      b = document.createElement("a");
      b.textContent = "\u2026";
      b.title = "Show all";
      b.className = "show-all-boards pointer";
      cnt.appendChild(b);
      cnt.appendChild(document.createTextNode("] "));
      c = cnt.cloneNode(!0);
      d = $.cls("boardList");
      for (a = 0; b = d[a]; ++a) b.style.display = "none", b.parentNode.insertBefore(a ? c : cnt, b);
      d = $.cls("show-all-boards");
      for (a = 0; b = d[a]; ++a) b.addEventListener("click", CustomMenu.reset, !1)
    }
  }
};

function onPostSubmit(a) {
  var b, c;
  if ((b = document.forms.post.upfile) && b.value && (b = b.files ? b.files[0].size : 0, c = FC.hasMobileLayout ? 0 : 204800, !a.shiftKey && b > c)) try {
    submitPreupload(), a.preventDefault()
  } catch (d) {}
}

function initPass() {
  "1" == get_cookie("pass_enabled") || get_cookie("extra_path") ? window.passEnabled = !0 : window.passEnabled = !1
}

function initAnalytics() {
  (function(a, b, c, d, e, l, m) {
    a.GoogleAnalyticsObject = e;
    a[e] = a[e] || function() {
      (a[e].q = a[e].q || []).push(arguments)
    };
    a[e].l = 1 * new Date;
    l = b.createElement(c);
    m = b.getElementsByTagName(c)[0];
    l.async = 1;
    l.src = d;
    m.parentNode.insertBefore(l, m)
  })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
  ga("create", "UA-166538-1", "auto");
  ga("set", "anonymizeIp", !0);
  ga("send", "pageview")
}

function initAds(a, b) {
  var c = "http",
    d = "static";
  "https:" == document.location.protocol && (c += "s", d = "engine");
  var e = document.createElement("script");
  e.type = "text/javascript";
  e.async = !0;
  e.src = c + "://" + d + ".4chan-ads.org/ados.js";
  e.onload = function() {
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
  c.parentNode.insertBefore(e, c)
}

function checkMobileLayout() {
  var a, b;
  if (window.matchMedia) return window.matchMedia("(max-width: 480px)").matches && "true" != localStorage.getItem("4chan_never_show_mobile");
  a = $.id("boardNavMobile");
  b = $.id("boardNavDesktop");
  return a && b && 0 < a.offsetWidth && 0 == b.offsetWidth
}

function checkForBlock() {
  var a, b, c, d;
  if (!/Mobile|Android|Dolfin|Opera Mobi|PlayStation Vita|Nintendo DS/.test(navigator.userAgent) && 1 != $.readCookie("pass_enabled"))
    for (d = document.getElementsByClassName("ad-cnt"), a = 0; b = d[a]; ++a) 0 == b.offsetHeight && (c = document.createElement("div"), c.className = "center", c.innerHTML = blockPlea, b.parentNode.insertBefore(c, b))
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
  var a, b, c, d, e, l;
  if (a = document.getElementById("boardSelectMobile")) {
    e = "";
    l = [];
    b = document.querySelectorAll("#boardNavDesktop .boardList > a");
    for (c = 0; d = b[c]; ++c) l.push(d);
    l.sort(function(a, b) {
      return a.textContent < b.textContent ? -1 : a.textContent > b.textContent ? 1 : 0
    });
    for (c = 0; d = l[c]; ++c) e += '<option value="' + d.textContent + '">/' + d.textContent + "/ - " + d.title + "</option>";
    a.innerHTML = e
  }
}

function loadBannerImage() {
  var a;
  !(a = document.getElementById("bannerCnt")) || 0 >= a.offsetWidth || (a.innerHTML = '<img alt="4chan" src="//s.4cdn.org/image/title/' + a.getAttribute("data-src") + '">')
}

function initRecaptcha() {
  var a;
  (a = document.getElementById("g-recaptcha")) && !a.firstElementChild && !window.passEnabled && window.grecaptcha && grecaptcha.render(a, {
    sitekey: window.recaptchaKey,
    theme: $.hasClass(document.body, "tomorrow") ? "dark" : "light"
  })
};
