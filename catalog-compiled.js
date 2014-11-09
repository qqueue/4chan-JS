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

    function e(a) {
      var b = document.getElementById("globalToggle"),
        g = document.getElementById("globalMessage");
      a.preventDefault();
      $.hasClass(b, "shown") ? ($.toggleClass(b, "shown"), g.style.display = "", b.innerHTML = "View Important Announcement") : ($.addClass(b, "shown"), g.style.display = "block", b.innerHTML = "Close Announcement")
    }

    function d(a) {
      a.preventDefault();
      if (a = document.getElementById("postForm")) this.parentNode.style.display = "none", a.style.display = "table"
    }

    function m() {
      var a = document.getElementById("postForm");
      "table" == a.style.display ? (a.style.display = "", this.textContent = "Start a New Thread") : (a.style.display = "table", this.textContent = "Close Post Form")
    }

    function l() {
      return RegExp("(\\/|\\.|\\*|\\+|\\?|\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g")
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

    function B() {
      var a, b = $.id("qf-cnt");
      $.hasClass(E, "active") ? (X(), b.style.display = "none", $.removeClass(E, "active")) : (b.style.display = "inline", a = $.id("qf-box"), b.hasAttribute("data-built") || (b.setAttribute("data-built", "1"), $.on(a, "keyup", O(250, P)), $.on(a, "keydown", function(a) {
        "27" == a.keyCode && B()
      })), a.focus(), a.value = "", $.addClass(E, "active"))
    }

    function P() {
      var a, b;
      "" != (b = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", b), sessionStorage.setItem("4chan-catalog-search-board", k.slug)), a = l(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = b, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", b = b.replace(a, "\\$1"), J = new RegExp(b, "i"), r()) : X()
    }

    function X(a) {
      var b = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      a ? (b.value = "", b.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), J = !1, r())
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
      if (!w.nobinds) $.on(document, "keyup", Y)
    }

    function ka(a) {
      0 <= u[a] ? delete u[a] : u[a] = k.threads[a].r || 0;
      localStorage.setItem("4chan-pin-" + k.slug, JSON.stringify(u));
      r()
    }

    function la(a) {
      Z ? (delete K[a], --C) : (K[a] = !0, ++C);
      localStorage.setItem("4chan-hide-t-" +
        k.slug, JSON.stringify(K));
      $.id("thread-" + a).style.display = "none";
      aa("hidden", C);
      0 == C && ba(!1)
    }

    function ba(a) {
      Z = a;
      $.id("filters-clear-hidden").textContent = $.id("filters-clear-hidden-bottom").textContent = a ? "Back" : "Show";
      r()
    }

    function aa(a, b) {
      var g = a + "-label",
        c = a + "-count";
      0 < b ? ($.id(c).textContent = $.id(c + "-bottom").textContent = b, $.id(g).style.display = $.id(g + "-bottom").style.display = "inline") : $.id(g).style.display = $.id(g + "-bottom").style.display = "none"
    }

    function Ca(a) {
      window.open("http://sys.4chan.org/" +
        k.slug + "/imgboard.php?mode=report&no=" + a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
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
      0 < C && ("Show" == $.id("filters-clear-hidden").textContent ? ba(!0) : ba(!1))
    }

    function Ea() {
      u = {};
      localStorage.removeItem("4chan-pin-" + k.slug);
      r();
      return !1
    }

    function Fa(a) {
      var b = a.target,
        g;
      (b = a.target) != document && ((g = b.getAttribute("data-watch")) ? ThreadWatcher.toggle(g, k.slug, k.threads[g].teaser, k.threads[g].lr.id) : "backdrop" == b.id ? ca($.id("filters")) ? ca($.id("theme")) || Q() : ca($.id("filters-protip")) ? da() : pa() : "filter-palette" == a.target.id && R())
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
        if (!z) {
          var c, f, e, d, m, l;
          z = $.id("filter-palette");
          c = $.id("filter-color-table");
          e = $.tag("tbody", c)[0];
          d = n.filterColors.length;
          if (0 < d)
            for (g = n.filterColors[0].length, f = $.tag("tfoot", c)[0], c = f.children.length - 1; 0 <= c; c--) f.children[c].firstElementChild.setAttribute("colspan", g);
          for (c = 0; c < d; ++c) {
            m = document.createElement("tr");
            for (f = 0; f < g; ++f) l = document.createElement("td"), l.innerHTML = '<span class="button clickbox" style="background:' + n.filterColors[c][f] + '"></span>', $.on(l.firstElementChild, "click", fa), m.appendChild(l);
            e.appendChild(m)
          }
        }
        $.removeClass(z, "hidden");
        z.setAttribute("data-target", b.id.split("-")[2]);
        g = z.firstElementChild;
        g.style.cssText = "top:" + a.top + "px;left:" + (a.left - g.clientWidth - 10) + "px;"
      } else b.hasAttribute("data-target") ? (a = $.id("filter-" + b.getAttribute("data-target")), a.parentNode.removeChild(a)) : b.hasAttribute("data-up") && (a = b.parentNode.parentNode, (g = a.previousElementSibling) && a.parentNode.insertBefore(a, g))
    }

    function Ka() {
      var a, b, g, c, f, e;
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
      (e = $.cls("filter-active", b)[0]) && e.focus();
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
      z && !$.hasClass(z, "hidden") && $.addClass(z, "hidden")
    }

    function sa() {
      if (UA.hasWebStorage) {
        H = {};
        var a = localStorage.getItem("catalog-filters");
        if (a) {
          var a = JSON.parse(a),
            b, g, c, f, e, d = /^\/(.*)\/(i?)$/,
            m = /\s*\|+\s*/g,
            n = /\\\*/g,
            p = l(),
            u, t, q, s, v, r, w, x;
          try {
            for (g in a)
              if (b = a[g], b.active && "" != b.pattern && (!b.boards || -1 != b.boards.split(" ").indexOf(k.slug))) {
                s = b.pattern;
                if ("#" == s.charAt(0)) x = "#" == s.charAt(1) ? 2 : 1, v = new RegExp(s.slice(x).replace(p, "\\$1"));
                else if (x = 0, u = s.match(d)) v = new RegExp(u[1], u[2]);
                else if ('"' == s.charAt(0) && '"' == s.charAt(s.length - 1)) v = new RegExp(s.slice(1, -1).replace(p, "\\$1"));
                else {
                  q = s.replace(m, "|").split(" ");
                  v = "";
                  e = q.length;
                  for (f = 0; f < e; ++f)
                    if (-1 != q[f].indexOf("|")) {
                      r = q[f].split("|");
                      w = [];
                      for (c = r.length - 1; 0 <= c; c--) "" != r[c] && w.push(r[c].replace(p, "\\$1"));
                      t = w.join("|").replace(n, "[^\\s]*");
                      v += "(?=.*\\b(" + t + ")\\b)"
                    } else t = q[f].replace(p, "\\$1").replace(n, "[^\\s]*"), v += "(?=.*\\b" + t + "\\b)";
                  v = new RegExp("^" + v, "i")
                }
                H[g] = {
                  type: x,
                  pattern: v,
                  boards: b.boards,
                  fid: g,
                  hidden: b.hidden,
                  color: b.color,
                  top: b.top,
                  hits: 0
                }
              }
          } catch (C) {
            alert("There was an error processing one of the filters: " + C + " in: " + b.pattern)
          }
        }
      }
    }

    function Ja() {
      var a, b, g, c, f, e;
      c = {};
      e = $.id("filter-list").children;
      for (a = 0; b = e[a]; ++a) g = {
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
      r();
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
      var b = $.id("filter-color-" + z.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background = this.style.backgroundColor);
      R()
    }

    function La() {
      fa(!0)
    }

    function Ia() {
      var a, b, c, e = $.id("filter-list").children;
      if (e.length) {
        for (a = c = 0; b = e[a]; ++a) b = +b.id.slice(7), b > c && (c = b);
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
      if (a.nobinds) w.nobinds != a.nobinds && $.off(document, "keyup", Y);
      else if (w.nobinds != a.nobinds) $.on(document, "keyup", Y);
      b || T.applyCSS(a)
    }

    function ta() {
      var b, c, g, e, f = {};
      $.id("theme-nobinds").checked && (f.nobinds = !0);
      $.id("theme-nospoiler").checked && (f.nospoiler = !0);
      $.id("theme-newtab").checked && (f.newtab = !0);
      c = $.id("theme-tw").checked;
      g = $.id("theme-ddn").checked;
      e = (e = localStorage.getItem("4chan-settings")) ? JSON.parse(e) : {};
      c != M && (c ? (ThreadWatcher.init(), e.disableAll = !1) : ThreadWatcher.unInit());
      if (g != N)
        if (g) a(), e.disableAll = !1;
        else {
          var d, h, m;
          h = $.id("boardNavDesktop");
          m = $.id("boardNavDesktopFoot");
          if (V) {
            if (d = $.cls("pageJump", h)[0]) $.id("settingsWindowLinkClassic").removeEventListener("click", L, !1), h.removeChild(d);
            $.removeClass(h, "persistentNav")
          } else h.style.display = "", $.addClass($.id("boardNavMobile"), "mobile");
          m.style.display = "";
          $.removeClass(document.body, "hasDropDownNav")
        }
      e.threadWatcher = c;
      e.dropDownNav = g;
      localStorage.setItem("4chan-settings", JSON.stringify(e));
      M = c;
      N = g;
      "" != (c = $.id("theme-css").value) && (f.css = c);
      ua(f);
      localStorage.removeItem("catalog-theme");
      for (b in f) {
        localStorage.setItem("catalog-theme", JSON.stringify(f));
        break
      }
      w = f;
      r();
      Q()
    }

    function va(a) {
      var b, c, e = !1,
        f = k.order.date[0];
      if (c = localStorage.getItem(a)) {
        c = JSON.parse(c);
        for (b in c)!k.threads[b] && b < f && (delete c[b], e = !0);
        for (b in c) return e && localStorage.setItem(a, JSON.stringify(c)), c;
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
      a ? (A.selectedIndex = 1, c += "large", n.large = !0) : (A.selectedIndex = 0, c += "small", n.large = !1);
      t.className = c;
      b || (ha(), r())
    }

    function y(a, b) {
      var c = {
        alt: 0,
        absdate: 1,
        date: 2,
        r: 3
      };
      void 0 !== c[a] ? (F.selectedIndex = c[a], n.orderby = a) : (F.selectedIndex = 0, n.orderby = "date");
      b || (ha(), r())
    }

    function Na() {
      xa("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Oa() {
      y(F.options[F.selectedIndex].value)
    }

    function Pa() {
      ya("large" == A.options[A.selectedIndex].value)
    }

    function r() {
      var a, b, c, e, f, d, h, m, l, p, q, r, z = 0,
        s = "",
        v = 0,
        B, E, x, A = "",
        y, D, G, I, F;
      if (0 != k.count) {
        r = k.custom_spoiler ? n.imgspoiler + "-" + k.slug + k.custom_spoiler + ".png" : n.imgspoiler + ".png";
        t.hasChildNodes() && ((a = document.getElementById("th-tip")) && document.body.removeChild(a), t.textContent = "");
        q = "//boards.4chan.org/" + k.slug + "/thread/";
        B = ".t.4cdn.org/" + k.slug + "/";
        C = 0;
        for (e in H) H[e].hits = 0;
        F = !n.large;
        E = w.newtab ? 'target="_blank" ' : "";
        a = 0;
        a: for (; a < k.count; ++a) {
          f = k.order[n.orderby][a];
          d = k.threads[f];
          m = l = p = !1;
          d.sub ? (x = "<b>" + d.sub + "</b>", d.teaser && (x += ": " + d.teaser)) : x = d.teaser;
          if (Z) {
            if (!K[f]) continue;
            ++C
          } else if (!J) {
            if (K[f]) {
              ++C;
              continue
            }
            if (0 <= u[f]) p = l = !0;
            else
              for (e in c = d.capcode ? (d.trip || "") + "!#" + d.capcode : d.trip, H)
                if (h = H[e], 0 == h.type && (h.pattern.test(x) || h.pattern.test(d.file)) || 1 == h.type && h.pattern.test(c) || 2 == h.type && h.pattern.test(d.author)) {
                  if (h.hidden) {
                    ++z;
                    h.hits += 1;
                    continue a
                  }
                  m = h;
                  l = !!h.top;
                  h.hits += 1;
                  break
                }
          } else if (!J.test(x) && !J.test(d.file)) continue;
          0 <= u[f] && (p = l = !0);
          v = 0 === v ? 1 : 0;
          h = '<div id="thread-' + f + '" class="thread">';
          M && (c = f + "-" + k.slug, h += '<span id="leaf-' +
            f + '" data-watch="' + f + '" ' + (ThreadWatcher.watched[c] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          h += "<a " + E + 'href="' + q + f + (d.semantic_url ? "/" + d.semantic_url : "") + '"><img alt="" id="thumb-' + f + '" class="thumb';
          c = m.color ? ' hl" style="border-color: ' + m.color : p ? " pinned" : "";
          d.imgurl ? d.imgspoiler && !w.nospoiler ? h += c + '" src="' + r : (G = d.tn_w, I = d.tn_h, F && (D = n.smallsize, G > D && (y = D / G, G = D, I *= y), I > D && (y = D / I, I = D, G *= y)), h += c + '" width="' + G + '" height="' + I + '" src="//' + v + B + d.imgurl + "s.jpg") : h = d.imgdel ? h + (" imgdel" + c + '" src="' + n.imgdel) : h + (" nofile" + c + '" src="' + n.nofile);
          h += '" data-id="' + f + '" /></a>';
          if (d.sticky || d.closed || d.capcodereps) {
            h += '<div class="threadIcons">';
            d.sticky && (h += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            d.closed && (h += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (d.capcodereps)
              for (y = d.capcodereps.split(","), c = 0; D = y[c]; ++c)
                if (G = Qa[D]) h += '<span title="' + G + ' Replies" class="threadIcon ' + D + 'Icon"></span>';
            h += "</div>"
          }
          h += '<div title="(R)eplies / (I)mages' +
            (l ? " / (P)age" : "") + '" id="meta-' + f + '" class="meta">';
          d.r && (h = d.bumplimit ? h + ("<i>R: <b>" + d.r + "</b></i>") : h + ("R: <b>" + d.r + "</b>"), p && (p = d.r - u[f], 0 < p ? (h += " (+" + p + ")", u[f] = d.r) : h += "(+0)"), d.i && (h = d.imagelimit ? h + (" / <i>I: <b>" + d.i + "</b></i>") : h + (" / I: <b>" + d.i + "</b>")));
          l && 0 <= (page = 0 | k.order.alt.indexOf(f) / k.pagesize) && (d.r && (h += " / "), h += "P: <b>" + page + "</b>");
          h += "</div>";
          x && (h += '<div class="teaser', m.color && (h += ' style="color:' + m.color), h += '">' + x + "</div>");
          h = window.partyHats ? '<div class="party-cnt">' +
            h + '</div><img class="party-hat" src="//s.4cdn.org/image/' + window.partyHats + '"></div>' : h + "</div>";
          l ? A += h : s += h
        }
        s = J && "" == s && "" == A ? '<div class="error">Nothing Found</div>' : A ? A + s + '<div class="clear"></div>' : s + '<div class="clear"></div>';
        for (b in u) {
          localStorage.setItem("4chan-pin-" + k.slug, JSON.stringify(u));
          break
        }
        t.innerHTML = s;
        aa("filtered", z);
        aa("hidden", C)
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
          $.hasClass(E, "active") ? X(!0) : B()
        },
        82: q,
        88: function() {
          "date" == n.orderby ? y("alt") : "alt" == n.orderby ? y("r") : "r" == n.orderby ? y("absdate") : y("date")
        }
      },
      k = {},
      wa = ["orderby", "large", "extended"],
      w = {},
      ja, W, H = {},
      U = !1,
      ia = null,
      u = {},
      K = {},
      C = 0,
      M = !1,
      N = !1,
      V = !1,
      J = !1,
      Z = !1,
      t, E, A, F, z, ma;
    2 <= window.devicePixelRatio && (n.imgdel.replace(".", "@2x."), n.nofile.replace(".", "@2x."));
    UA.init();
    (function() {
      var a;
      UA.hasWebStorage && (a = localStorage.getItem("catalog-theme")) && (w = JSON.parse(a))
    })();
    (function() {
      var a = $.readCookie("extra_path");
      a && /^[a-z0-9]+$/.test(a) && document.write('<script type="text/javascript" src="https://s.4cdn.org/js/' + a + "." + window.jsVersion + '.js">\x3c/script>')
    })();
    initPass();
    T.init = function() {
      var b, l, g;
      FC.hasMobileLayout = checkMobileLayout();
      buildMobileNav();
      ua(w, !0);
      t = $.id("threads");
      E = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      A = $.id("size-ctrl");
      F = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(E, "click", B);
      $.on($.id("filters-clear-hidden"), "click", oa);
      $.on($.id("filters-clear-hidden-bottom"), "click", oa);
      $.on($.id("qf-clear"), "click", B);
      $.on($.id("settingsWindowLink"), "click", L);
      $.on($.id("settingsWindowLinkBot"), "click", L);
      $.on($.id("settingsWindowLinkMobile"), "click", L);
      $.on($.id("filters-ctrl"), "click", Ka);
      $.on($teaserCtrl, "change", Na);
      $.on(A, "change", Pa);
      $.on(F, "change", Oa);
      $.on(t, "mouseover", Ra);
      $.on(t, "mouseout", Ta);
      $.on($.id("togglePostFormLink").firstElementChild, "click", d);
      $.on($.id("togglePostFormLinkMobile"), "click", m);
      $.on(document, "click", Fa);
      $.on(window, "load", checkForBlock);
      var k;
      UA.hasWebStorage && (k = localStorage.getItem("catalog-settings")) && $.extend(n, JSON.parse(k));
      Ba();
      var f, p;
      if (UA.hasWebStorage && (b = $.id("globalMessage")) && b.textContent && (b.nextElementSibling.style.clear = "both", k = document.createElement("span"), k.id = "toggleMsgBtn", k.setAttribute("data-cmd", "toggleMsg"), k.title = "Toggle announcement", p = localStorage.getItem("4chan-global-msg"), f = b.getAttribute("data-utc"), p && f <= p ? (b.style.display = "none", k.style.opacity = "0.5", k.className = "expandIcon") : k.className = "collapseIcon", $.on(k, "click", c), b.parentNode.insertBefore(k, b), k = $.id("globalToggle"), 0 < k.offsetWidth)) $.on(k, "click", e);
      initBlotter();
      !window.passEnabled && window.preupload_captcha && "FormData" in window && document.forms.post.addEventListener("submit", onPostSubmit, !1);
      UA.hasContextMenu && (ma = {
        pin: ka,
        hide: la,
        report: Ca
      }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>', $.on($.id("ctxmenu-main"), "click", Ea), $.on($.id("ctxmenu-thread"), "click", Da));
      UA.hasWebStorage && ((b = localStorage.getItem("4chan-settings")) ? (b = JSON.parse(b), b.disableAll || (b.filter && (ThreadWatcher.hasFilters = !0), b.threadWatcher && (M = !0, ThreadWatcher.init()), b.customMenu && CustomMenu.apply(b.customMenuList), !1 === b.dropDownNav || FC.hasMobileLayout || (N = !0, V = b.classicNav, a()))) : UA.isMobileDevice && !FC.hasMobileLayout && (N = !0, a()));
      window.passEnabled && setPassMsg();
      (l = document.forms.post.flag) && (g = $.readCookie("4chan_flag")) && (l = l.querySelector('option[value="' + g + '"]')) && l.setAttribute("selected", "selected");
      y(n.orderby, !0);
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
      c ? (B(), $.id("qf-box").value = c, P()) : r()
    };
    T.applyCSS = function(a, b, c) {
      var d, e;
      a || (a = w);
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
      var c, e, d, m, l;
      l = !1;
      m = Filter.activeFilters;
      for (c = 0; d = m[c]; ++c)
        if (d.boards[b])
          if (0 == d.type) {
            if (d.pattern === a.trip) {
              l = !0;
              break
            }
          } else if (1 == d.type) {
        if (d.pattern === a.name) {
          l = !0;
          break
        }
      } else if (2 == d.type && a.com) {
        if (void 0 === e && (this.entities.innerHTML = a.com.replace(/<br>/g, "\n").replace(/[<[^>]+>/g, ""), e = this.entities.textContent), d.pattern.test(e)) {
          l = !0;
          break
        }
      } else if (4 == d.type) {
        if (d.pattern === a.id) {
          l = !0;
          break
        }
      } else if (5 == d.type) {
        if (d.pattern.test(a.sub)) {
          l = !0;
          break
        }
      } else if (6 == d.type && d.pattern.test(a.filename)) {
        l = !0;
        break
      }
      return l
    },
    load: function() {
      var a, b, c, e, d, m, l, p, q, O, B;
      this.activeFilters = [];
      if (e = localStorage.getItem("4chan-filters")) {
        e = JSON.parse(e);
        l = RegExp("(\\/|\\.|\\*|\\+|\\?|\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\^|\\$)", "g");
        p = /^\/(.*)\/(i?)$/;
        B = /\\\*/g;
        try {
          for (m = 0; c = e[m]; ++m)
            if (c.active && "" != c.pattern) {
              if (c.boards)
                for (tmp = c.boards.split(/[^a-z0-9]+/i), boards = {}, a = 0; b = tmp[a]; ++a) boards[b] = !0;
              else boards = !1;
              d = c.pattern;
              if (c.type && 1 != c.type && 4 != c.type)
                if (match = d.match(p)) pattern = new RegExp(match[1], match[2]);
                else if ('"' == d[0] && '"' == d[d.length - 1]) pattern = new RegExp(d.slice(1, -1).replace(l, "\\$1"));
              else {
                q = d.split(" ");
                pattern = "";
                a = 0;
                for (b = q.length; a < b; ++a) O = q[a].replace(l, "\\$1").replace(B, "[^\\s]*"), pattern += "(?=.*\\b" + O + "\\b)";
                pattern = new RegExp("^" + pattern, "im")
              } else pattern = d;
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
          alert("There was an error processing one of the filters: " + P + " in: " + d)
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
      for (c in this.watched) b = c.split("-"), a += '<li id="watch-' + c + '"><span class="pointer" data-cmd="unwatch" data-id="' +
        b[0] + '" data-board="' + b[1] + '">&times;</span> <a href="' + this.linkToThread(b[0], b[1], this.watched[c][1]) + '"', a = -1 == this.watched[c][1] ? a + ' class="deadlink">' : this.watched[c][2] ? a + (' class="hasNewReplies">(' + this.watched[c][2] + ") ") : a + ">", a += "/" + b[1] + "/ - " + this.watched[c][0] + "</a></li>";
      ThreadWatcher.listNode.innerHTML = a
    },
    onClick: function(a) {
      a = a.target;
      a.hasAttribute("data-id") ? ThreadWatcher.toggle(a.getAttribute("data-id"), a.getAttribute("data-board")) : "twPrune" != a.id || ThreadWatcher.isRefreshing ? "twClose" == a.id && ThreadWatcher.toggleList() : ThreadWatcher.refreshWithAutoWatch()
    },
    generateLabel: function(a, b) {
      return a ? a.replace(/<[^>]*?>/g, "").slice(0, this.charLimit) : "No." + b
    },
    toggle: function(a, b, c, e) {
      var d;
      b = a + "-" + b;
      d = $.id("leaf-" + a);
      this.watched[b] ? (delete this.watched[b], d && (d.className = "watchIcon", d.title = "Watch")) : (c = ThreadWatcher.generateLabel(c, a), this.watched[b] = [c, e || a, 0], d.className = "unwatchIcon", d.title = "Unwatch");
      this.save();
      this.load();
      this.build()
    },
    addRaw: function(a, b) {
      var c, e;
      c = a.no + "-" + b;
      this.watched[c] || (e = ThreadWatcher.generateLabel(a.sub, a.com, a.no), this.watched[c] = [e, 0, 0])
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
      var a, b, c, e, d;
      b = ThreadWatcher;
      e = {};
      d = [];
      for (c in b.watched) d.push(c);
      d.sort(function(a, b) {
        a = a.split("-")[1];
        b = b.split("-")[1];
        return a < b ? -1 : a > b ? 1 : 0
      });
      for (a = 0; c = d[a]; ++a) e[c] = b.watched[c];
      b.watched = e
    },
    canAutoRefresh: function() {
      var a;
      return (a = localStorage.getItem("4chan-tw-timestamp")) ? 6E4 <= Date.now() - +a : !1
    },
    setRefreshTimestamp: function() {
      localStorage.setItem("4chan-tw-timestamp", Date.now())
    },
    refreshWithAutoWatch: function() {
      var a, b, c, e, d;
      if (this.hasFilters) {
        Filter.load();
        d = {};
        for (a = c = 0; b = Filter.activeFilters[a]; ++a)
          if (b.auto && b.boards)
            for (e in b.boards) d[e] || (d[e] = !0, ++c);
        c ? (a = $.id("twPrune"), a.className = "icon rotateIcon", this.isRefreshing = !0, this.fetchCatalogs(d, c)) : this.refresh()
      } else this.refresh()
    },
    fetchCatalogs: function(a, b) {
      var c, e, d, m;
      d = {};
      m = {
        count: b
      };
      c = 0;
      for (e in a) setTimeout(ThreadWatcher.fetchCatalog, c, e, d, m), c += 200
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
      var e;
      e = new XMLHttpRequest;
      e.open("GET", "//a.4cdn.org/" + a + "/catalog.json");
      e.onload = function() {
        c.count--;
        b[a] = ThreadWatcher.parseCatalogJSON(this.responseText);
        if (!c.count) ThreadWatcher.onCatalogsLoaded(b)
      };
      e.onerror = function() {
        c.count--;
        if (!c.count) ThreadWatcher.onCatalogsLoaded(b)
      };
      e.send(null)
    },
    onCatalogsLoaded: function(a) {
      var b, c, e, d, m, l, p, q;
      $.id("twPrune").className = "icon rotateIcon";
      this.isRefreshing = !1;
      q = {};
      for (e in a)
        for (d = a[e], b = 0; c = d[b]; ++b)
          for (m = c.threads, c = 0; l = m[c]; ++c) p = l.no + "-" + e, this.blacklisted[p] ? q[p] = 1 : Filter.match(l, e) && this.addRaw(l, e);
      this.blacklisted = q;
      this.build(!0);
      this.refresh()
    },
    refresh: function() {
      var a, b, c, e, d;
      if (e = $.id("watchList").children.length)
        for (c in a = b = 0, d = $.id("twPrune"), d.className = "icon rotateIcon", ThreadWatcher.isRefreshing = !0, ThreadWatcher.setRefreshTimestamp(), ThreadWatcher.watched) setTimeout(ThreadWatcher.fetch, b, c, ++a == e ? d : null), b += 200
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
        var c, e, l, p;
        if (200 == this.status) {
          l = ThreadWatcher.parseThreadJSON(this.responseText);
          p = ThreadWatcher.watched[a][1];
          e = 0;
          for (c = l.length - 1; 1 <= c && !(l[c].no <= p); c--)++e;
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
    var a, b, c, e, d;
    c = $.cls("boardList");
    e = $.cls("customBoardList");
    d = $.cls("show-all-boards");
    for (a = 0; b = d[a]; ++a) b.removeEventListener("click", CustomMenu.reset, !1);
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
  var a, b, c, e, d;
  a = document.getElementById("recaptcha_challenge_field");
  c = document.getElementById("recaptcha_response_field");
  d = document.getElementById("fileError");
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
    a.token ? (b = document.createElement("input"), b.id = "captchaToken", b.type = "hidden", b.value = a.token, submitDirect()) : a.error ? (onCaptchaClick(), d.innerHTML = a.error) : (a.fail && console.log(a.fail), submitDirect())
  }, (b = document.getElementById("captchaToken")) && b.parentNode.removeChild(b), a.send(e)) : (d.textContent = "You forgot to type in the CAPTCHA.", c && c.focus())
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
  (function(a, b, c, e, d, m, l) {
    a.GoogleAnalyticsObject = d;
    a[d] = a[d] || function() {
      (a[d].q = a[d].q || []).push(arguments)
    };
    a[d].l = 1 * new Date;
    m = b.createElement(c);
    l = b.getElementsByTagName(c)[0];
    m.async = 1;
    m.src = e;
    l.parentNode.insertBefore(m, l)
  })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
  ga("create", "UA-166538-1", "auto");
  ga("set", "anonymizeIp", !0);
  ga("send", "pageview")
}

function initAds(a, b) {
  var c = "http",
    e = "static";
  "https:" == document.location.protocol && (c += "s", e = "engine");
  var d = document.createElement("script");
  d.type = "text/javascript";
  d.async = !0;
  d.src = c + "://" + e + ".4chan-ads.org/ados.js";
  d.onload = function() {
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
  c.parentNode.insertBefore(d, c)
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
  var a, b, c, e, d, m;
  if (a = document.getElementById("boardSelectMobile")) {
    d = "";
    m = [];
    b = document.querySelectorAll("#boardNavDesktop .boardList > a");
    for (c = 0; e = b[c]; ++c) m.push(e);
    m.sort(function(a, b) {
      return a.textContent < b.textContent ? -1 : a.textContent > b.textContent ? 1 : 0
    });
    for (c = 0; e = m[c]; ++c) d += '<option value="' + e.textContent + '">/' + e.textContent + "/ - " + e.title + "</option>";
    a.innerHTML = d
  }
}

function loadBannerImage() {
  var a;
  !(a = document.getElementById("bannerCnt")) || 0 >= a.offsetWidth || (a.innerHTML = '<img alt="4chan" src="//s.4cdn.org/image/title/' + a.getAttribute("data-src") + '">')
};
