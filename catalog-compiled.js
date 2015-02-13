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
      if (0 == b.indexOf(d)) return decodeURIComponent(b.substring(d.length,
        b.length))
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
      var p, a, e;
      a = $.id("boardNavDesktop");
      e = $.id("boardNavDesktopFoot");
      X ? (p = document.createElement("div"), p.className = "pageJump", p.innerHTML = '<a href="#bottom">&#9660;</a><a href="javascript:void(0);" id="settingsWindowLinkClassic">Settings</a><a href="//www.4chan.org" target="_top">Home</a></div>', a.appendChild(p), $.id("settingsWindowLinkClassic").addEventListener("click",
        N, !1), $.addClass(a, "persistentNav")) : (a.style.display = "none", $.removeClass($.id("boardNavMobile"), "mobile"));
      e.style.display = "none";
      $.addClass(document.body, "hasDropDownNav")
    }

    function b() {
      var p, a;
      p = $.id("globalMessage");
      a = $.id("toggleMsgBtn");
      "none" == p.style.display ? (p.style.display = "", a.className = "collapseIcon", a.style.opacity = "1", localStorage.removeItem("4chan-global-msg")) : (p.style.display = "none", a.className = "expandIcon", a.innerHTML = '<span class="mobile">View Important Announcement</span>', a.style.opacity =
        "0.5", localStorage.setItem("4chan-global-msg", p.getAttribute("data-utc")))
    }

    function c() {
      var p = document.getElementById("postForm");
      "table" == p.style.display ? (p.style.display = "", this.textContent = "Start a New Thread") : (p.style.display = "table", this.textContent = "Close Post Form", initRecaptcha())
    }

    function d() {
      return /(\/|\.|\*|\+|\?|\(|\)|\[|\]|\{|\}|\\)/g
    }

    function h() {
      var p = new Date;
      p.setTime(p.getTime() + 31536E6);
      document.cookie = ja + "=" + this.value + ";" + p.toGMTString() + "; path=/; domain=4chan.org";
      k()
    }

    function k() {
      location.href =
        location.href
    }

    function l(p, a) {
      var e;
      return function() {
        var b = arguments,
          c = this;
        clearTimeout(e);
        e = setTimeout(function() {
          a.apply(c, b)
        }, p)
      }
    }

    function q() {
      var p, a = $.id("qf-cnt");
      $.hasClass(z, "active") ? (y(), a.style.display = "none", $.removeClass(z, "active")) : (a.style.display = "inline", p = $.id("qf-box"), a.hasAttribute("data-built") || (a.setAttribute("data-built", "1"), $.on(p, "keyup", l(250, r)), $.on(p, "keydown", function(p) {
        "27" == p.keyCode && q()
      })), p.focus(), p.value = "", $.addClass(z, "active"))
    }

    function r() {
      var p, a;
      "" !=
        (a = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", a), sessionStorage.setItem("4chan-catalog-search-board", m.slug)), p = d(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = a, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", a = a.replace(p, "\\$1"), J = new RegExp(a, "i"), t()) : y()
    }

    function y(a) {
      var b = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      a ? (b.value =
        "", b.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), J = !1, t())
    }

    function Q() {
      var a, b;
      if (UA.hasWebStorage) $.on(v, "mousedown", function(e) {
        a = e.target;
        if (-1 != a.className.indexOf("thumb"))
          if (b = a.getAttribute("data-id"), 3 == e.which) v.setAttribute("contextmenu", "ctxmenu-thread"), $.id("ctxmenu-thread").target = b;
          else {
            if (1 == e.which && e.altKey) return R(b), !1;
            if (1 == e.which && e.shiftKey) return ka(b), !1
          } else 3 == e.which && v.setAttribute("contextmenu", "ctxmenu-main")
      });
      if (!C.nobinds) $.on(document,
        "keyup", Y)
    }

    function R(a) {
      0 <= w[a] ? delete w[a] : w[a] = m.threads[a].r || 0;
      localStorage.setItem("4chan-pin-" + m.slug, JSON.stringify(w));
      t()
    }

    function ka(a) {
      Z ? (delete K[a], --E) : (K[a] = !0, ++E);
      localStorage.setItem("4chan-hide-t-" + m.slug, JSON.stringify(K));
      $.id("thread-" + a).style.display = "none";
      aa("hidden", E);
      0 == E && ba(!1)
    }

    function ba(a) {
      Z = a;
      $.id("filters-clear-hidden").textContent = $.id("filters-clear-hidden-bottom").textContent = a ? "Back" : "Show";
      t()
    }

    function aa(a, b) {
      var e = a + "-label",
        c = a + "-count";
      0 < b ? ($.id(c).textContent =
        $.id(c + "-bottom").textContent = b, $.id(e).style.display = $.id(e + "-bottom").style.display = "inline") : $.id(e).style.display = $.id(e + "-bottom").style.display = "none"
    }

    function Aa(a) {
      window.open("http://sys.4chan.org/" + m.slug + "/imgboard.php?mode=report&no=" + a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=270")
    }

    function Ba(a) {
      a = a.target.getAttribute("data-cmd");
      la[a]($.id("ctxmenu-thread").target)
    }

    function Y(a) {
      var b = a.target;
      if ("TEXTAREA" != b.nodeName && "INPUT" !=
        b.nodeName && ma[a.keyCode]) ma[a.keyCode]()
    }

    function na(a) {
      a.preventDefault();
      0 < E && ("Show" == $.id("filters-clear-hidden").textContent ? ba(!0) : ba(!1))
    }

    function Ca() {
      w = {};
      localStorage.removeItem("4chan-pin-" + m.slug);
      t();
      return !1
    }

    function Da(a) {
      var b = a.target,
        e;
      (b = a.target) != document && ((e = b.getAttribute("data-watch")) ? ThreadWatcher.toggle(e, m.slug, m.threads[e].sub, m.threads[e].teaser, m.threads[e].lr.id) : "backdrop" == b.id ? ca($.id("filters")) ? ca($.id("theme")) || S() : ca($.id("filters-protip")) ? da() : oa() : "filter-palette" ==
        a.target.id && T())
    }

    function Ea() {
      var a = $.id("filters-protip");
      a.style.top = window.pageYOffset + 50 + "px";
      $.removeClass(a, "hidden")
    }

    function oa() {
      $.addClass($.id("filters-protip"), "hidden")
    }

    function Fa(a) {
      var b = a.target;
      if ("filters-close" == b.id) da();
      else if ("filters-add" == b.id) $.id("filter-list").appendChild(pa({
        active: 1,
        pattern: "",
        boards: "",
        color: "",
        hidden: 0,
        top: 0,
        hits: 0
      }, Ga()));
      else if ("filters-save" == b.id) Ha(), da();
      else if (b.hasAttribute("data-active")) ea(b, "active");
      else if (b.hasAttribute("data-hide")) ea(b,
        "hide", "top");
      else if (b.hasAttribute("data-top")) ea(b, "top", "hide");
      else if ($.hasClass(b, "filter-color")) {
        var e;
        a = b.getBoundingClientRect();
        if (!A) {
          var c, f, d, g, h, m;
          A = $.id("filter-palette");
          c = $.id("filter-color-table");
          d = $.tag("tbody", c)[0];
          g = n.filterColors.length;
          if (0 < g)
            for (e = n.filterColors[0].length, f = $.tag("tfoot", c)[0], c = f.children.length - 1; 0 <= c; c--) f.children[c].firstElementChild.setAttribute("colspan", e);
          for (c = 0; c < g; ++c) {
            h = document.createElement("tr");
            for (f = 0; f < e; ++f) m = document.createElement("td"),
              m.innerHTML = '<span class="button clickbox" style="background:' + n.filterColors[c][f] + '"></span>', $.on(m.firstElementChild, "click", fa), h.appendChild(m);
            d.appendChild(h)
          }
        }
        $.removeClass(A, "hidden");
        A.setAttribute("data-target", b.id.split("-")[2]);
        e = A.firstElementChild;
        e.style.cssText = "top:" + a.top + "px;left:" + (a.left - e.clientWidth - 10) + "px;"
      } else b.hasAttribute("data-target") ? (a = $.id("filter-" + b.getAttribute("data-target")), a.parentNode.removeChild(a)) : b.hasAttribute("data-up") && (a = b.parentNode.parentNode, (e = a.previousElementSibling) && a.parentNode.insertBefore(a, e))
    }

    function Ia() {
      var a, b, e, c, f, d;
      b = $.id("filters");
      b.hasAttribute("data-built") || ($.on(b, "click", Fa), $.on($.id("filter-palette-close"), "click", T), $.on($.id("filter-palette-clear"), "click", Ja), $.on($.id("filters-help-open"), "click", Ea), $.on($.id("filters-help-close"), "click", oa), $.on($.id("filter-rgb"), "keyup", Ka), $.on($.id("filter-rgb-ok"), "click", fa), b.setAttribute("data-built", "1"));
      e = localStorage.getItem("catalog-filters");
      f = 0;
      if (e) {
        c =
          $.id("filter-list");
        e = JSON.parse(e);
        for (a in e) c.appendChild(pa(e[a], f)), ++f;
        qa()
      }
      b.style.top = window.pageYOffset + 60 + "px";
      $.removeClass(b, "hidden");
      (d = $.cls("filter-active", b)[0]) && d.focus();
      U()
    }

    function da() {
      var a, b, e;
      $.id("filters-msg").style.display = "none";
      $.addClass($.id("filters"), "hidden");
      b = $.id("filter-list");
      e = $.tag("tr", b);
      for (a = e.length - 1; 0 <= a; a--) b.removeChild(e[a]);
      T();
      U()
    }

    function T() {
      A && !$.hasClass(A, "hidden") && $.addClass(A, "hidden")
    }

    function ra() {
      if (UA.hasWebStorage) {
        H = {};
        var a = localStorage.getItem("catalog-filters");
        if (a) {
          var a = JSON.parse(a),
            b, e, c, f, h, g = /^\/(.*)\/(i?)$/,
            k = /\s*\|+\s*/g,
            n = /\\\*/g,
            l = d(),
            q, w, v, u, x, r, B, t;
          try {
            for (e in a)
              if (b = a[e], b.active && "" != b.pattern && (!b.boards || -1 != b.boards.split(" ").indexOf(m.slug))) {
                u = b.pattern;
                if ("#" == u.charAt(0)) t = "#" == u.charAt(1) ? 2 : 1, x = new RegExp(u.slice(t).replace(l, "\\$1"));
                else if (t = 0, q = u.match(g)) x = new RegExp(q[1], q[2]);
                else if ('"' == u.charAt(0) && '"' == u.charAt(u.length - 1)) x = new RegExp(u.slice(1, -1).replace(l, "\\$1"));
                else {
                  v = u.replace(k, "|").split(" ");
                  x = "";
                  h = v.length;
                  for (f = 0; f < h; ++f)
                    if (-1 != v[f].indexOf("|")) {
                      r = v[f].split("|");
                      B = [];
                      for (c = r.length - 1; 0 <= c; c--) "" != r[c] && B.push(r[c].replace(l, "\\$1"));
                      w = B.join("|").replace(n, "[^\\s]*");
                      x += "(?=.*\\b(" + w + ")\\b)"
                    } else w = v[f].replace(l, "\\$1").replace(n, "[^\\s]*"), x += "(?=.*\\b" + w + "\\b)";
                  x = new RegExp("^" + x, "i")
                }
                H[e] = {
                  type: t,
                  pattern: x,
                  boards: b.boards,
                  fid: e,
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

    function Ha() {
      var a, b, e, c,
        f, d;
      c = {};
      d = $.id("filter-list").children;
      for (a = 0; b = d[a]; ++a) e = {
        active: $.cls("filter-active", b)[0].checked ? 1 : 0,
        pattern: $.cls("filter-pattern", b)[0].value,
        boards: $.cls("filter-boards", b)[0].value,
        hidden: $.cls("filter-hide", b)[0].checked ? 1 : 0,
        top: $.cls("filter-top", b)[0].checked ? 1 : 0
      }, b = $.cls("filter-color", b)[0], b.hasAttribute("data-nocolor") || (e.color = b.style.backgroundColor), c[a] = e;
      c[0] ? localStorage.setItem("catalog-filters", JSON.stringify(c)) : localStorage.removeItem("catalog-filters");
      f = $.id("filters-msg");
      f.innerHTML = "Done";
      f.className = "msg-ok";
      f.style.display = "inline";
      setTimeout(function() {
        f.style.display = "none"
      }, 2E3);
      ra();
      t();
      qa()
    }

    function Ka() {
      $.id("filter-rgb-ok").style.backgroundColor = this.value
    }

    function pa(a, b) {
      var e, c, f;
      c = document.createElement("tr");
      c.id = "filter-" + b;
      e = document.createElement("td");
      f = document.createElement("span");
      f.setAttribute("data-up", b);
      f.className = "pointer";
      f.innerHTML = "&uarr;";
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.active;
      f.className = "filter-active";
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      f = document.createElement("input");
      f.type = "text";
      f.value = a.pattern;
      f.className = "filter-pattern";
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      f = document.createElement("input");
      f.type = "text";
      f.value = a.boards;
      f.className = "filter-boards";
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      f = document.createElement("span");
      f.id = "filter-color-" +
        b;
      f.title = "Change Color";
      f.className = "button clickbox filter-color";
      a.color ? f.style.background = a.color : (f.setAttribute("data-nocolor", "1"), f.innerHTML = "&#x2215;");
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.hidden;
      f.className = "filter-hide";
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !!a.top;
      f.className = "filter-top";
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      f = document.createElement("span");
      f.setAttribute("data-target", b);
      f.className = "pointer";
      f.innerHTML = "&times;";
      e.appendChild(f);
      c.appendChild(e);
      e = document.createElement("td");
      e.id = "fhc-" + b;
      e.className = "filter-hits";
      c.appendChild(e);
      return c
    }

    function fa(a) {
      var b = $.id("filter-color-" + A.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background =
        this.style.backgroundColor);
      T()
    }

    function Ja() {
      fa(!0)
    }

    function Ga() {
      var a, b, e, c = $.id("filter-list").children;
      if (c.length) {
        for (a = e = 0; b = c[a]; ++a) b = +b.id.slice(7), b > e && (e = b);
        return e + 1
      }
      return 0
    }

    function ea(a, b, e) {
      b = "data-" + b;
      "0" == a.getAttribute(b) ? (a.setAttribute(b, "1"), $.addClass(a, "active"), a.innerHTML = "&#x2714;", e && (a = $.cls("filter-" + e, a.parentNode.parentNode)[0], a.setAttribute("data-" + e, "0"), $.removeClass(a, "active"), a.innerHTML = "")) : (a.setAttribute(b, "0"), $.removeClass(a, "active"), a.innerHTML = "")
    }

    function qa() {
      var a, b, e = $.id("filter-list").children;
      for (a = 0; b = e[a]; ++a) $.id("fhc-" + b.id.slice(7)).innerHTML = H[a] ? "x" + H[a].hits : ""
    }

    function ca(a) {
      return $.hasClass(a, "hidden")
    }

    function N() {
      var a, b;
      UA.hasWebStorage ? (a = $.id("theme"), theme = (theme = localStorage.getItem("catalog-theme")) ? JSON.parse(theme) : {}, $.id("theme-nobinds").checked = !!theme.nobinds, $.id("theme-nospoiler").checked = !!theme.nospoiler, $.id("theme-newtab").checked = !!theme.newtab, $.id("theme-tw").checked = O, $.id("theme-ddn").checked = P, theme.css &&
        ($.id("theme-css").value = theme.css), $.on($.id("theme-save"), "click", sa), $.on($.id("theme-close"), "click", S), $.id("theme-msg").style.display = "none", a.style.top = window.pageYOffset + 60 + "px", $.removeClass(a, "hidden"), (b = $.tag("input", a)[0]) && b.focus(), U()) : alert("Your browser doesn't support Local Storage")
    }

    function S() {
      $.off($.id("theme-save"), "click", sa);
      $.off($.id("theme-close"), "click", S);
      $.addClass($.id("theme"), "hidden");
      U()
    }

    function U() {
      $.toggleClass($.id("backdrop"), "hidden")
    }

    function ta(a, b) {
      if (a.nobinds) C.nobinds !=
        a.nobinds && $.off(document, "keyup", Y);
      else if (C.nobinds != a.nobinds) $.on(document, "keyup", Y);
      b || V.applyCSS(a)
    }

    function sa() {
      var b, c, e, d, f = {};
      $.id("theme-nobinds").checked && (f.nobinds = !0);
      $.id("theme-nospoiler").checked && (f.nospoiler = !0);
      $.id("theme-newtab").checked && (f.newtab = !0);
      c = $.id("theme-tw").checked;
      e = $.id("theme-ddn").checked;
      d = (d = localStorage.getItem("4chan-settings")) ? JSON.parse(d) : {};
      c != O && (c ? (ThreadWatcher.init(), d.disableAll = !1) : ThreadWatcher.unInit());
      if (e != P)
        if (e) a(), d.disableAll = !1;
        else {
          var h, g, m;
          g = $.id("boardNavDesktop");
          m = $.id("boardNavDesktopFoot");
          if (X) {
            if (h = $.cls("pageJump", g)[0]) $.id("settingsWindowLinkClassic").removeEventListener("click", N, !1), g.removeChild(h);
            $.removeClass(g, "persistentNav")
          } else g.style.display = "", $.addClass($.id("boardNavMobile"), "mobile");
          m.style.display = "";
          $.removeClass(document.body, "hasDropDownNav")
        }
      d.threadWatcher = c;
      d.dropDownNav = e;
      localStorage.setItem("4chan-settings", JSON.stringify(d));
      O = c;
      P = e;
      "" != (c = $.id("theme-css").value) && (f.css = c);
      ta(f);
      localStorage.removeItem("catalog-theme");
      for (b in f) {
        localStorage.setItem("catalog-theme", JSON.stringify(f));
        break
      }
      C = f;
      t();
      S()
    }

    function ua(a) {
      var b, e, c = !1,
        f = m.order.date[0];
      if (e = localStorage.getItem(a)) {
        e = JSON.parse(e);
        for (b in e)!m.threads[b] && b < f && (delete e[b], c = !0);
        for (b in e) return c && localStorage.setItem(a, JSON.stringify(e)), e;
        localStorage.removeItem(a)
      }
      return {}
    }

    function ga() {
      var a, b, e;
      if (UA.hasWebStorage) {
        e = {};
        for (a = va.length - 1; 0 <= a; a--) b = va[a], e[b] = n[b];
        localStorage.setItem("catalog-settings",
          JSON.stringify(e))
      }
    }

    function wa(a, b) {
      var e = "";
      a ? ($teaserCtrl.selectedIndex = 1, e = "extended-", n.extended = !0) : ($teaserCtrl.selectedIndex = 0, n.extended = !1);
      e = n.large ? e + "large" : e + "small";
      v.className = e;
      b || ga()
    }

    function xa(a, b) {
      var e = n.extended ? "extended-" : "";
      a ? (F.selectedIndex = 1, e += "large", n.large = !0) : (F.selectedIndex = 0, e += "small", n.large = !1);
      v.className = e;
      b || (ga(), t())
    }

    function L(a, b) {
      var e = {
        alt: 0,
        absdate: 1,
        date: 2,
        r: 3
      };
      void 0 !== e[a] ? (M.selectedIndex = e[a], n.orderby = a) : (M.selectedIndex = 0, n.orderby = "date");
      b || (ga(), t())
    }

    function La() {
      wa("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Ma() {
      L(M.options[M.selectedIndex].value)
    }

    function Na() {
      xa("large" == F.options[F.selectedIndex].value)
    }

    function t() {
      var a, b, e, c, f, d, g, h, k, l, q, r, t = 0,
        u = "",
        x, A, B, z = "",
        y, D, G, I, F;
      if (0 != m.count) {
        r = m.custom_spoiler ? n.imgspoiler + "-" + m.slug + m.custom_spoiler + ".png" : n.imgspoiler + ".png";
        v.hasChildNodes() && ((a = document.getElementById("th-tip")) && document.body.removeChild(a), v.textContent = "");
        q = "//boards.4chan.org/" +
          m.slug + "/thread/";
        x = "i.4cdn.org/" + m.slug + "/";
        E = 0;
        for (c in H) H[c].hits = 0;
        F = !n.large;
        A = C.newtab ? 'target="_blank" ' : "";
        a = 0;
        a: for (; a < m.count; ++a) {
          f = m.order[n.orderby][a];
          d = m.threads[f];
          h = k = l = !1;
          d.sub ? (B = "<b>" + d.sub + "</b>", d.teaser && (B += ": " + d.teaser)) : B = d.teaser;
          if (Z) {
            if (!K[f]) continue;
            ++E
          } else if (!J) {
            if (K[f]) {
              ++E;
              continue
            }
            if (0 <= w[f]) l = k = !0;
            else
              for (c in e = d.capcode ? (d.trip || "") + "!#" + d.capcode : d.trip, H)
                if (g = H[c], 0 == g.type && (g.pattern.test(B) || g.pattern.test(d.file)) || 1 == g.type && g.pattern.test(e) || 2 ==
                  g.type && g.pattern.test(d.author)) {
                  if (g.hidden) {
                    ++t;
                    g.hits += 1;
                    continue a
                  }
                  h = g;
                  k = !!g.top;
                  g.hits += 1;
                  break
                }
          } else if (!J.test(B) && !J.test(d.file)) continue;
          0 <= w[f] && (l = k = !0);
          g = '<div id="thread-' + f + '" class="thread">';
          O && (e = f + "-" + m.slug, g += '<span id="leaf-' + f + '" data-watch="' + f + '" ' + (ThreadWatcher.watched[e] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          g += "<a " + A + 'href="' + q + f + (d.semantic_url ? "/" + d.semantic_url : "") + '"><img alt="" id="thumb-' + f + '" class="thumb';
          e =
            h.color ? ' hl" style="border-color: ' + h.color : l ? " pinned" : "";
          d.imgurl ? d.imgspoiler && !C.nospoiler ? g += e + '" src="' + r : (G = d.tn_w, I = d.tn_h, F && (D = n.smallsize, G > D && (y = D / G, G = D, I *= y), I > D && (y = D / I, I = D, G *= y)), g += e + '" width="' + G + '" height="' + I + '" src="//' + x + d.imgurl + "s.jpg") : g = d.imgdel ? g + (" imgdel" + e + '" src="' + n.imgdel) : g + (" nofile" + e + '" src="' + n.nofile);
          g += '" data-id="' + f + '" /></a>';
          if (d.sticky || d.closed || d.capcodereps) {
            g += '<div class="threadIcons">';
            d.sticky && (g += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            d.closed && (g += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (d.capcodereps)
              for (y = d.capcodereps.split(","), e = 0; D = y[e]; ++e)
                if (G = Oa[D]) g += '<span title="' + G + ' Replies" class="threadIcon ' + D + 'Icon"></span>';
            g += "</div>"
          }
          g += '<div title="(R)eplies / (I)mages' + (k ? " / (P)age" : "") + '" id="meta-' + f + '" class="meta">';
          d.r && (g = d.bumplimit ? g + ("<i>R: <b>" + d.r + "</b></i>") : g + ("R: <b>" + d.r + "</b>"), l && (l = d.r - w[f], 0 < l ? (g += " (+" + l + ")", w[f] = d.r) : g += "(+0)"), d.i && (g = d.imagelimit ? g + (" / <i>I: <b>" + d.i + "</b></i>") :
            g + (" / I: <b>" + d.i + "</b>")));
          k && 0 <= (page = 0 | m.order.alt.indexOf(f) / m.pagesize) && (d.r && (g += " / "), g += "P: <b>" + page + "</b>");
          g += "</div>";
          B && (g += '<div class="teaser', h.color && (g += ' style="color:' + h.color), g += '">' + B + "</div>");
          g = window.partyHats ? '<div class="party-cnt">' + g + '</div><img class="party-hat" src="//s.4cdn.org/image/' + window.partyHats + '"></div>' : g + "</div>";
          k ? z += g : u += g
        }
        u = J && "" == u && "" == z ? '<div class="error">Nothing Found</div>' : z ? z + u + '<div class="clear"></div>' : u + '<div class="clear"></div>';
        for (b in w) {
          localStorage.setItem("4chan-pin-" +
            m.slug, JSON.stringify(w));
          break
        }
        v.innerHTML = u;
        aa("filtered", t);
        aa("hidden", E)
      }
    }

    function Pa(a) {
      a = a.target;
      $.hasClass(a, "thumb") && (clearTimeout(ha), W && ya(), ha = setTimeout(Qa, n.tipdelay, a))
    }

    function Ra(a) {
      clearTimeout(ha);
      W && ya()
    }

    function Qa(a) {
      var b, e, c, d;
      b = Date.now() / 1E3;
      d = a.getBoundingClientRect();
      c = document.documentElement.offsetWidth;
      thread = m.threads[a.getAttribute("data-id")];
      e = thread.sub ? '<span class="post-subject">' + thread.sub + "</span>" : "Posted";
      e += ' by <span class="' + (thread.capcode ? thread.capcode +
        "-capcode " : "") + 'post-author">' + (thread.author || m.anon);
      thread.trip && (e += ' <span class="post-tripcode">' + thread.trip + "</span>");
      thread.capcode && (e += " ## " + thread.capcode.charAt(0).toUpperCase() + thread.capcode.slice(1));
      e += "</span> ";
      m.flags && thread.country && (e += '<div class="flag flag-' + thread.country.toLowerCase() + '"></div> ');
      e += '<span class="post-ago">' + za(b - thread.date) + " ago</span>";
      !n.extended && thread.teaser && (e += '<p class="post-teaser">' + thread.teaser + "</p>");
      0 < thread.r && (e += '<div class="post-last">Last reply by <span class="' +
        (thread.lr.capcode ? thread.lr.capcode + "-capcode " : "") + 'post-author">' + thread.lr.author, thread.lr.trip && (e += ' <span class="post-tripcode">' + thread.lr.trip + "</span>"), thread.lr.capcode && (e += " ## " + thread.lr.capcode.charAt(0).toUpperCase() + thread.lr.capcode.slice(1)), e += '</span> <span class="post-ago">' + za(b - thread.lr.date) + " ago</span>");
      b = document.createElement("div");
      b.id = "post-preview";
      b.innerHTML = e;
      document.body.appendChild(b);
      e = b.style;
      c - d.right < (0 | .3 * c) ? (c -= d.left, e.right = c + 5 + "px") : (c = d.left + d.width,
        e.left = c + 5 + "px");
      e.top = d.top + a.offsetHeight + window.pageYOffset - b.offsetHeight / 2 - d.height / 2 + "px";
      W = !0
    }

    function ya() {
      document.body.removeChild($.id("post-preview"));
      W = !1
    }

    function za(a, b) {
      var c, d;
      if (2 > a) return "less than a second";
      if (b && 300 > a || 60 > a) return (0 | a) + " seconds";
      if (3600 > a) return c = 0 | a / 60, 1 < c ? c + " minutes" : "one minute";
      if (86400 > a) return c = 0 | a / 3600, d = 1 < c ? c + " hours" : "one hour", c = 0 | a / 60 - 60 * c, 1 < c && (d += " and " + c + " minutes"), d;
      c = 0 | a / 86400;
      d = 1 < c ? c + " days" : "one day";
      c = 0 | a / 3600 - 24 * c;
      1 < c && (d += " and " + c +
        " hours");
      return d
    }
    var V = this,
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
      Oa = {
        admin: "Administrator",
        mod: "Moderator",
        developer: "Developer",
        manager: "Manager"
      },
      ma = {
        83: function() {
          $.hasClass(z, "active") ? y(!0) : q()
        },
        82: k,
        88: function() {
          "date" == n.orderby ? L("alt") : "alt" == n.orderby ? L("r") : "r" == n.orderby ? L("absdate") : L("date")
        }
      },
      m = {},
      va = ["orderby", "large", "extended"],
      C = {},
      ja, ia, H = {},
      W = !1,
      ha = null,
      w = {},
      K = {},
      E = 0,
      O = !1,
      P = !1,
      X = !1,
      J = !1,
      Z = !1,
      v, z, F, M, A, la;
    2 <= window.devicePixelRatio && (n.imgdel.replace(".", "@2x."), n.nofile.replace(".", "@2x."));
    UA.init();
    (function() {
      var a;
      UA.hasWebStorage && (a = localStorage.getItem("catalog-theme")) && (C = JSON.parse(a))
    })();
    V.init = function() {
      var d, h, e;
      FC.hasMobileLayout = checkMobileLayout();
      ta(C, !0);
      v =
        $.id("threads");
      z = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      F = $.id("size-ctrl");
      M = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(z, "click", q);
      $.on($.id("filters-clear-hidden"), "click", na);
      $.on($.id("filters-clear-hidden-bottom"), "click", na);
      $.on($.id("qf-clear"), "click", q);
      $.on($.id("settingsWindowLink"), "click", N);
      $.on($.id("settingsWindowLinkBot"), "click", N);
      $.on($.id("settingsWindowLinkMobile"), "click", N);
      $.on($.id("filters-ctrl"), "click", Ia);
      $.on($teaserCtrl,
        "change", La);
      $.on(F, "change", Na);
      $.on(M, "change", Ma);
      $.on(v, "mouseover", Pa);
      $.on(v, "mouseout", Ra);
      $.on($.id("togglePostFormLink").firstElementChild, "click", showPostForm);
      $.on($.id("togglePostFormLinkMobile"), "click", c);
      $.on(document, "click", Da);
      var k;
      UA.hasWebStorage && (k = localStorage.getItem("catalog-settings")) && $.extend(n, JSON.parse(k));
      Q();
      var f, l;
      UA.hasWebStorage && !FC.hasMobileLayout && (d = $.id("globalMessage")) && d.textContent && (d.nextElementSibling.style.clear = "both", k = document.createElement("span"),
        k.id = "toggleMsgBtn", k.setAttribute("data-cmd", "toggleMsg"), k.title = "Toggle announcement", l = localStorage.getItem("4chan-global-msg"), f = d.getAttribute("data-utc"), l && f <= l ? (d.style.display = "none", k.style.opacity = "0.5", k.className = "expandIcon") : k.className = "collapseIcon", $.on(k, "click", b), d.parentNode.insertBefore(k, d));
      UA.hasContextMenu && (la = {
          pin: R,
          hide: ka,
          report: Aa
        }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>',
        $.on($.id("ctxmenu-main"), "click", Ca), $.on($.id("ctxmenu-thread"), "click", Ba));
      UA.hasWebStorage && ((d = localStorage.getItem("4chan-settings")) ? (d = JSON.parse(d), d.disableAll || (d.filter && (ThreadWatcher.hasFilters = !0), d.threadWatcher && (O = !0, ThreadWatcher.init()), d.customMenu && CustomMenu.apply(d.customMenuList), !1 === d.dropDownNav || FC.hasMobileLayout || (P = !0, X = d.classicNav, a()))) : UA.isMobileDevice && !FC.hasMobileLayout && (P = !0, a()));
      (h = document.forms.post.flag) && (e = $.readCookie("4chan_flag")) && (h = h.querySelector('option[value="' +
        e + '"]')) && h.setAttribute("selected", "selected");
      L(n.orderby, !0);
      xa(n.large, !0);
      wa(n.extended, !0);
      UA.dispatchEvent("4chanMainInit")
    };
    V.loadCatalog = function(a) {
      var b;
      m = a;
      $.addClass(document.body, ia.toLowerCase().replace(/ /g, "_"));
      var c, d, f;
      c = $.id("styleSelector");
      d = c.children;
      for (a = 0; f = d[a]; ++a) f.value == ia && (c.selectedIndex = a);
      $.on(c, "change", h);
      ra();
      UA.hasWebStorage && (K = ua("4chan-hide-t-" + m.slug), w = ua("4chan-pin-" + m.slug));
      UA.hasSessionStorage && !location.hash && (b = sessionStorage.getItem("4chan-catalog-search")) ?
        m.slug != sessionStorage.getItem("4chan-catalog-search-board") && (sessionStorage.removeItem("4chan-catalog-search"), sessionStorage.removeItem("4chan-catalog-search-board"), b = null) : location.hash && (b = location.hash.match(/#s=(.+)/)) && (b = decodeURIComponent(b[1].replace(/\+/g, " ")));
      b ? (q(), $.id("qf-box").value = b, r()) : t()
    };
    V.applyCSS = function(a, b, c) {
      var d, f;
      a || (a = C);
      void 0 !== b && ((f = $.readCookie(b)) || (f = "nws_style" == b ? "Yotsuba New" : "Yotsuba B New"), ja = b, ia = f, d = document.createElement("link"), d.type = "text/css",
        d.id = "base-css", d.rel = "stylesheet", d.setAttribute("href", "//s.4cdn.org/css/catalog_" + f.toLowerCase().replace(/ /g, "_") + "." + c + ".css"), document.head.insertBefore(d, $.id("mobile-css")));
      (d = $.id("custom-css")) && document.head.removeChild(d);
      a.css && (d = document.createElement("style"), d.type = "text/css", d.id = "custom-css", d.styleSheet ? d.styleSheet.cssText = a.css : d.innerHTML = a.css, document.head.appendChild(d))
    }
  },
  Filter = {
    init: function() {
      this.entities = document.createElement("div");
      Filter.load()
    },
    match: function(a,
      b) {
      var c, d, h, k, l;
      l = !1;
      k = Filter.activeFilters;
      for (c = 0; h = k[c]; ++c)
        if (h.boards[b])
          if (0 == h.type) {
            if (h.pattern === a.trip) {
              l = !0;
              break
            }
          } else if (1 == h.type) {
        if (h.pattern === a.name) {
          l = !0;
          break
        }
      } else if (2 == h.type && a.com) {
        if (void 0 === d && (this.entities.innerHTML = a.com.replace(/<br>/g, "\n").replace(/[<[^>]+>/g, ""), d = this.entities.textContent), h.pattern.test(d)) {
          l = !0;
          break
        }
      } else if (4 == h.type) {
        if (h.pattern === a.id) {
          l = !0;
          break
        }
      } else if (5 == h.type) {
        if (h.pattern.test(a.sub)) {
          l = !0;
          break
        }
      } else if (6 == h.type && h.pattern.test(a.filename)) {
        l = !0;
        break
      }
      return l
    },
    load: function() {
      var a, b, c, d, h, k, l, q, r, y, Q;
      this.activeFilters = [];
      if (d = localStorage.getItem("4chan-filters")) {
        d = JSON.parse(d);
        l = /(\/|\.|\*|\+|\?|\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
        q = /^\/(.*)\/(i?)$/;
        Q = /\\\*/g;
        try {
          for (k = 0; c = d[k]; ++k)
            if (c.active && "" != c.pattern) {
              if (c.boards)
                for (tmp = c.boards.split(/[^a-z0-9]+/i), boards = {}, a = 0; b = tmp[a]; ++a) boards[b] = !0;
              else boards = !1;
              h = c.pattern;
              if (c.type && 1 != c.type && 4 != c.type)
                if (match = h.match(q)) pattern = new RegExp(match[1], match[2]);
                else if ('"' == h[0] && '"' ==
                h[h.length - 1]) pattern = new RegExp(h.slice(1, -1).replace(l, "\\$1"));
              else {
                r = h.split(" ");
                pattern = "";
                a = 0;
                for (b = r.length; a < b; ++a) y = r[a].replace(l, "\\$1").replace(Q, "[^\\s]*"), pattern += "(?=.*\\b" + y + "\\b)";
                pattern = new RegExp("^" + pattern, "im")
              } else pattern = h;
              this.activeFilters.push({
                type: c.type,
                pattern: pattern,
                boards: boards,
                color: c.color,
                hide: c.hide,
                auto: c.auto
              })
            }
        } catch (R) {
          alert("There was an error processing one of the filters: " + R + " in: " + h)
        }
      }
    }
  },
  ThreadWatcher = {
    hasFilters: !1,
    init: function() {
      var a, b;
      this.hasFilters &&
        Filter.init();
      this.listNode = null;
      this.charLimit = 45;
      this.watched = {};
      this.blacklisted = {};
      this.isRefreshing = !1;
      FC.hasMobileLayout && (el = document.createElement("a"), el.href = "#", el.textContent = "TW", el.addEventListener("click", ThreadWatcher.toggleList, !1), a = $.id("settingsWindowLinkMobile"), a.parentNode.insertBefore(el, a), a.parentNode.insertBefore(document.createTextNode(" "), a));
      a = document.createElement("div");
      a.id = "threadWatcher";
      a.setAttribute("data-trackpos", "TW-position");
      FC.hasMobileLayout ? a.style.display =
        "none" : (b = localStorage.getItem("catalog-tw-pos")) ? a.style.cssText = b : (a.style.left = "10px", a.style.top = "75px");
      a.innerHTML = '<div class="drag" id="twHeader">' + (FC.hasMobileLayout ? '<div id="twClose" class="icon closeIcon"></div>' : "") + "Thread Watcher" + (UA.hasCORS ? '<div id="twPrune" class="icon refreshIcon" title="Refresh"></div></div>' : "</div>");
      this.listNode = document.createElement("ul");
      this.listNode.id = "watchList";
      this.load();
      this.build();
      a.appendChild(this.listNode);
      document.body.appendChild(a);
      a.addEventListener("mouseup",
        this.onClick, !1);
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
      for (c in this.watched) b =
        c.split("-"), a += '<li id="watch-' + c + '"><span class="pointer" data-cmd="unwatch" data-id="' + b[0] + '" data-board="' + b[1] + '">&times;</span> <a href="' + this.linkToThread(b[0], b[1], this.watched[c][1]) + '"', a = -1 == this.watched[c][1] ? a + ' class="deadlink">' : this.watched[c][2] ? a + (' class="hasNewReplies">(' + this.watched[c][2] + ") ") : a + ">", a += "/" + b[1] + "/ - " + this.watched[c][0] + "</a></li>";
      ThreadWatcher.listNode.innerHTML = a
    },
    onClick: function(a) {
      a = a.target;
      a.hasAttribute("data-id") ? ThreadWatcher.toggle(a.getAttribute("data-id"),
        a.getAttribute("data-board")) : "twPrune" != a.id || ThreadWatcher.isRefreshing ? "twClose" == a.id && ThreadWatcher.toggleList() : ThreadWatcher.refreshWithAutoWatch()
    },
    generateLabel: function(a, b, c) {
      var d;
      return d = (d = a) ? d.slice(0, this.charLimit) : (d = b) ? d.replace(/(?:<br>)+/g, " ").replace(/<[^>]*?>/g, "").slice(0, this.charLimit) : "No." + c
    },
    toggle: function(a, b, c, d, h) {
      var k;
      b = a + "-" + b;
      k = $.id("leaf-" + a);
      this.watched[b] ? (delete this.watched[b], k && (k.className = "watchIcon", k.title = "Watch")) : (c = ThreadWatcher.generateLabel(c,
        d, a), this.watched[b] = [c, h || a, 0], k.className = "unwatchIcon", k.title = "Unwatch");
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
      var a,
        b, c, d, h;
      b = ThreadWatcher;
      d = {};
      h = [];
      for (c in b.watched) h.push(c);
      h.sort(function(a, b) {
        a = a.split("-")[1];
        b = b.split("-")[1];
        return a < b ? -1 : a > b ? 1 : 0
      });
      for (a = 0; c = h[a]; ++a) d[c] = b.watched[c];
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
      var a, b, c, d, h;
      if (this.hasFilters) {
        Filter.load();
        h = {};
        for (a = c = 0; b = Filter.activeFilters[a]; ++a)
          if (b.auto &&
            b.boards)
            for (d in b.boards) h[d] || (h[d] = !0, ++c);
        c ? (a = $.id("twPrune"), a.className = "icon rotateIcon", this.isRefreshing = !0, this.fetchCatalogs(h, c)) : this.refresh()
      } else this.refresh()
    },
    fetchCatalogs: function(a, b) {
      var c, d, h, k;
      h = {};
      k = {
        count: b
      };
      c = 0;
      for (d in a) setTimeout(ThreadWatcher.fetchCatalog, c, d, h, k), c += 200
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
      var b, c, d, h, k, l, q, r;
      $.id("twPrune").className = "icon rotateIcon";
      this.isRefreshing = !1;
      r = {};
      for (d in a)
        for (h = a[d], b = 0; c = h[b]; ++b)
          for (k = c.threads, c = 0; l = k[c]; ++c) q = l.no + "-" + d, this.blacklisted[q] ? r[q] = 1 : Filter.match(l, d) && this.addRaw(l, d);
      this.blacklisted =
        r;
      this.build(!0);
      this.refresh()
    },
    refresh: function() {
      var a, b, c, d, h;
      if (d = $.id("watchList").children.length)
        for (c in a = b = 0, h = $.id("twPrune"), h.className = "icon rotateIcon", ThreadWatcher.isRefreshing = !0, ThreadWatcher.setRefreshTimestamp(), ThreadWatcher.watched) setTimeout(ThreadWatcher.fetch, b, c, ++a == d ? h : null), b += 200
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
        console.log(c),
        b = []
      }
      return b
    },
    fetch: function(a, b) {
      var c, d;
      c = $.id("watch-" + a);
      if (-1 == ThreadWatcher.watched[a][1]) {
        if (delete ThreadWatcher.watched[a], c.parentNode.removeChild(c), b) ThreadWatcher.onRefreshEnd(b)
      } else c = a.split("-"), d = new XMLHttpRequest, d.onload = function() {
        var c, d, l, q;
        if (200 == this.status) {
          l = ThreadWatcher.parseThreadJSON(this.responseText);
          q = ThreadWatcher.watched[a][1];
          d = 0;
          for (c = l.length - 1; 1 <= c && !(l[c].no <= q); c--)++d;
          d > ThreadWatcher.watched[a][2] && (ThreadWatcher.watched[a][2] = d)
        } else 404 == this.status &&
          (ThreadWatcher.watched[a][1] = -1); if (b) ThreadWatcher.onRefreshEnd(b)
      }, b && (d.onerror = d.onload), d.open("GET", "//a.4cdn.org/" + c[1] + "/thread/" + c[0] + ".json"), d.send(null)
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
      var b,
        c, d;
      if (!this.parentNode.hasAttribute("data-shiftkey") || a.shiftKey) a.preventDefault(), b = Draggable, c = document.documentElement, b.el = this.parentNode, b.key = b.el.getAttribute("data-trackpos"), d = b.el.getBoundingClientRect(), b.dx = a.clientX - d.left, b.dy = a.clientY - d.top, b.right = c.clientWidth - d.width, b.bottom = c.clientHeight - d.height, "fixed" != getComputedStyle(b.el, null).position ? (b.scrollX = window.scrollX || window.pageXOffset, b.scrollY = window.scrollY || window.pageYOffset) : b.scrollX = b.scrollY = 0, document.addEventListener("mouseup",
        b.endDrag, !1), document.addEventListener("mousemove", b.onDrag, !1)
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
      1 > b ? (c.left = "0", c.right = "") : Draggable.right < b ? (c.left = "",
        c.right = "0") : (c.left = b / document.documentElement.clientWidth * 100 + "%", c.right = "");
      1 > a ? (c.top = "0", c.bottom = "") : Draggable.bottom < a ? (c.bottom = "0", c.top = "") : (c.top = a / document.documentElement.clientHeight * 100 + "%", c.bottom = "")
    }
  },
  CustomMenu = {
    reset: function() {
      var a, b, c, d, h;
      c = $.cls("boardList");
      d = $.cls("customBoardList");
      h = $.cls("show-all-boards");
      for (a = 0; b = h[a]; ++a) b.removeEventListener("click", CustomMenu.reset, !1);
      for (a = d.length - 1; b = d[a]; a--) c[a].style.display = null, b.parentNode.removeChild(b)
    },
    apply: function(a) {
      var b,
        c, d;
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

function checkMobileLayout() {
  var a, b;
  if (window.matchMedia) return window.matchMedia("(max-width: 480px)").matches && "true" != localStorage.getItem("4chan_never_show_mobile");
  a = $.id("boardNavMobile");
  b = $.id("boardNavDesktop");
  return a && b && 0 < a.offsetWidth && 0 == b.offsetWidth
};
