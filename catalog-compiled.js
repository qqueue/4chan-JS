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

    function k() {
      var a = document.forms.post;
      "block" == a.style.display ? (a.style.display = "", this.textContent = "Start a Thread") : (a.style.display = "block", this.textContent = "Close Post Form")
    }

    function m() {
      return RegExp("(\\/|\\.|\\*|\\+|\\?|\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g")
    }

    function p() {
      var a = new Date;
      a.setTime(a.getTime() + 31536E6);
      document.cookie = ha + "=" + this.value + ";" + a.toGMTString() + "; path=/; domain=4chan.org";
      G()
    }

    function G() {
      location.href = location.href
    }

    function Aa(a, g) {
      var d;
      return function() {
        var b = arguments,
          f = this;
        clearTimeout(d);
        d = setTimeout(function() {
          g.apply(f, b)
        }, a)
      }
    }

    function K() {
      var a, g = $.id("qf-cnt");
      $.hasClass(C, "active") ? (V(), g.style.display = "none", $.removeClass(C, "active")) : (g.style.display = "inline", a = $.id("qf-box"), g.hasAttribute("data-built") || (g.setAttribute("data-built", "1"), $.on(a, "keyup", Aa(250, ia)), $.on(a, "keydown", function(a) {
        "27" == a.keyCode && K()
      })), a.focus(), a.value = "", $.addClass(C, "active"))
    }

    function ia() {
      var a, g;
      "" != (g = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", g), sessionStorage.setItem("4chan-catalog-search-board", l.slug)), a = m(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = g, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", g = g.replace(a, "\\$1"), L = RegExp(g, "i"), q()) : V()
    }

    function V(a) {
      var g = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      a ? (g.value = "", g.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), L = !1, q())
    }

    function Ba() {
      var a, g;
      if (UA.hasWebStorage) $.on(t, "mousedown", function(d) {
        a = d.target;
        if (-1 != a.className.indexOf("thumb"))
          if (g = a.getAttribute("data-id"), 3 == d.which) t.setAttribute("contextmenu", "ctxmenu-thread"), $.id("ctxmenu-thread").target = g;
          else {
            if (1 == d.which && d.altKey) return ja(g), !1;
            if (1 == d.which && d.shiftKey) return ka(g), !1
          } else 3 == d.which && t.setAttribute("contextmenu", "ctxmenu-main")
      });
      if (!v.nobinds) $.on(document, "keyup", W)
    }

    function ja(a) {
      0 <= s[a] ? delete s[a] : s[a] = l.threads[a].r || 0;
      localStorage.setItem("4chan-pin-" + l.slug, JSON.stringify(s));
      q()
    }

    function ka(a) {
      X ? (delete J[a], --x) : (J[a] = !0, ++x);
      localStorage.setItem("4chan-hide-t-" + l.slug, JSON.stringify(J));
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

    function Ca(a) {
      window.open("http://sys.4chan.org/" + l.slug + "/imgboard.php?mode=report&no=" + a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
    }

    function Da(a) {
      a = a.target.getAttribute("data-cmd");
      la[a]($.id("ctxmenu-thread").target)
    }

    function W(a) {
      var g = a.target;
      if ("TEXTAREA" != g.nodeName && "INPUT" != g.nodeName && ma[a.keyCode]) ma[a.keyCode]()
    }

    function na(a) {
      a.preventDefault();
      0 < x && ("Show" == $.id("filters-clear-hidden").textContent ? Z(!0) : Z(!1))
    }

    function Ea() {
      s = {};
      localStorage.removeItem("4chan-pin-" + l.slug);
      q();
      return !1
    }

    function Fa(a) {
      var g = a.target,
        d;
      (g = a.target) != document && ((d = g.getAttribute("data-watch")) ? ThreadWatcher.toggle(d, l.slug, l.threads[d].teaser, l.threads[d].lr.id) : "backdrop" == g.id ? aa($.id("filters")) ? aa($.id("theme")) || N() : aa($.id("filters-protip")) ? ba() : oa() : "filter-palette" == a.target.id && O())
    }

    function Ga() {
      var a = $.id("filters-protip");
      a.style.top = window.pageYOffset + 50 + "px";
      $.removeClass(a, "hidden")
    }

    function oa() {
      $.addClass($.id("filters-protip"), "hidden")
    }

    function Ha(a) {
      var g = a.target;
      if ("filters-close" == g.id) ba();
      else if ("filters-add" == g.id) $.id("filter-list").appendChild(pa({
        active: 1,
        pattern: "",
        boards: "",
        color: "",
        hidden: 0,
        top: 0,
        hits: 0
      }, Ia()));
      else if ("filters-save" == g.id) Ja(), ba();
      else if (g.hasAttribute("data-active")) ca(g, "active");
      else if (g.hasAttribute("data-hide")) ca(g, "hide", "top");
      else if (g.hasAttribute("data-top")) ca(g, "top", "hide");
      else if ($.hasClass(g, "filter-color")) {
        var d;
        a = g.getBoundingClientRect();
        if (!w) {
          var b, f, c, h, e, k;
          w = $.id("filter-palette");
          b = $.id("filter-color-table");
          c = $.tag("tbody", b)[0];
          h = n.filterColors.length;
          if (0 < h)
            for (d = n.filterColors[0].length, f = $.tag("tfoot", b)[0], b = f.children.length - 1; 0 <= b; b--) f.children[b].firstElementChild.setAttribute("colspan", d);
          for (b = 0; b < h; ++b) {
            e = document.createElement("tr");
            for (f = 0; f < d; ++f) k = document.createElement("td"), k.innerHTML = '<span class="button clickbox" style="background:' + n.filterColors[b][f] + '"></span>', $.on(k.firstElementChild, "click", da), e.appendChild(k);
            c.appendChild(e)
          }
        }
        $.removeClass(w, "hidden");
        w.setAttribute("data-target", g.id.split("-")[2]);
        d = w.firstElementChild;
        d.style.cssText = "top:" + a.top + "px;left:" + (a.left - d.clientWidth - 10) + "px;"
      } else g.hasAttribute("data-target") ? (a = $.id("filter-" + g.getAttribute("data-target")), a.parentNode.removeChild(a)) : g.hasAttribute("data-up") && (a = g.parentNode.parentNode, (d = a.previousElementSibling) && a.parentNode.insertBefore(a, d))
    }

    function Ka() {
      var a, g, d, b, f, c;
      g = $.id("filters");
      g.hasAttribute("data-built") || ($.on(g, "click", Ha), $.on($.id("filter-palette-close"), "click", O), $.on($.id("filter-palette-clear"), "click", La), $.on($.id("filters-help-open"), "click", Ga), $.on($.id("filters-help-close"), "click", oa), $.on($.id("filter-rgb"), "keyup", Ma), $.on($.id("filter-rgb-ok"), "click", da), g.setAttribute("data-built", "1"));
      d = localStorage.getItem("catalog-filters");
      f = 0;
      if (d) {
        b = $.id("filter-list");
        d = JSON.parse(d);
        for (a in d) b.appendChild(pa(d[a], f)), ++f;
        qa()
      }
      g.style.top = window.pageYOffset + 60 + "px";
      $.removeClass(g, "hidden");
      (c = $.cls("filter-active", g)[0]) && c.focus();
      P()
    }

    function ba() {
      var a, g, d;
      $.id("filters-msg").style.display = "none";
      $.addClass($.id("filters"), "hidden");
      g = $.id("filter-list");
      d = $.tag("tr", g);
      for (a = d.length - 1; 0 <= a; a--) g.removeChild(d[a]);
      O();
      P()
    }

    function O() {
      w && !$.hasClass(w, "hidden") && $.addClass(w, "hidden")
    }

    function ra() {
      if (UA.hasWebStorage) {
        H = {};
        var a = localStorage.getItem("catalog-filters");
        if (a) {
          var a = JSON.parse(a),
            g, d, b, c, e, h = /^\/(.*)\/(i?)$/,
            k = /\s*\|+\s*/g,
            n = /\\\*/g,
            p = m(),
            t, s, q, r, u, v, x, y;
          try {
            for (d in a)
              if (g = a[d], g.active && "" != g.pattern && (!g.boards || -1 != g.boards.split(" ").indexOf(l.slug))) {
                r = g.pattern;
                if ("#" == r.charAt(0)) y = "#" == r.charAt(1) ? 2 : 1, u = RegExp(r.slice(y).replace(p, "\\$1"));
                else if (y = 0, t = r.match(h)) u = RegExp(t[1], t[2]);
                else if ('"' == r.charAt(0) && '"' == r.charAt(r.length - 1)) u = RegExp(r.slice(1, -1).replace(p, "\\$1"));
                else {
                  q = r.replace(k, "|").split(" ");
                  u = "";
                  e = q.length;
                  for (c = 0; c < e; ++c)
                    if (-1 != q[c].indexOf("|")) {
                      v = q[c].split("|");
                      x = [];
                      for (b = v.length - 1; 0 <= b; b--) "" != v[b] && x.push(v[b].replace(p, "\\$1"));
                      s = x.join("|").replace(n, "[^\\s]*");
                      u += "(?=.*\\b(" + s + ")\\b)"
                    } else s = q[c].replace(p, "\\$1").replace(n, "[^\\s]*"), u += "(?=.*\\b" + s + "\\b)";
                  u = RegExp("^" + u, "i")
                }
                H[d] = {
                  type: y,
                  pattern: u,
                  boards: g.boards,
                  fid: d,
                  hidden: g.hidden,
                  color: g.color,
                  top: g.top,
                  hits: 0
                }
              }
          } catch (w) {
            alert("There was an error processing one of the filters: " + w + " in: " + g.pattern)
          }
        }
      }
    }

    function Ja() {
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
      ra();
      q();
      qa()
    }

    function Ma() {
      $.id("filter-rgb-ok").style.backgroundColor = this.value
    }

    function pa(a, b) {
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

    function da(a) {
      var b = $.id("filter-color-" + w.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background = this.style.backgroundColor);
      O()
    }

    function La() {
      da(!0)
    }

    function Ia() {
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

    function qa() {
      var a, b, d = $.id("filter-list").children;
      for (a = 0; b = d[a]; ++a) $.id("fhc-" + b.id.slice(7)).innerHTML = H[a] ? "x" + H[a].hits : ""
    }

    function aa(a) {
      return $.hasClass(a, "hidden")
    }

    function F() {
      var a, b;
      UA.hasWebStorage ? (a = $.id("theme"), theme = (theme = localStorage.getItem("catalog-theme")) ? JSON.parse(theme) : {}, $.id("theme-nobinds").checked = !!theme.nobinds, $.id("theme-nospoiler").checked = !!theme.nospoiler, $.id("theme-newtab").checked = !!theme.newtab, $.id("theme-tw").checked = M, $.id("theme-ddn").checked = Q, theme.css && ($.id("theme-css").value = theme.css), $.on($.id("theme-save"), "click", sa), $.on($.id("theme-close"), "click", N), $.id("theme-msg").style.display = "none", a.style.top = window.pageYOffset + 60 + "px", $.removeClass(a, "hidden"), (b = $.tag("input", a)[0]) && b.focus(), P()) : alert("Your browser doesn't support Local Storage")
    }

    function N() {
      $.off($.id("theme-save"), "click", sa);
      $.off($.id("theme-close"), "click", N);
      $.addClass($.id("theme"), "hidden");
      P()
    }

    function P() {
      $.toggleClass($.id("backdrop"), "hidden")
    }

    function ta(a, b) {
      if (a.nobinds) v.nobinds != a.nobinds && $.off(document, "keyup", W);
      else if (v.nobinds != a.nobinds) $.on(document, "keyup", W);
      b || R.applyCSS(a)
    }

    function sa() {
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
      if (d != Q)
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
      Q = d;
      "" != (c = $.id("theme-css").value) && (f.css = c);
      ta(f);
      localStorage.removeItem("catalog-theme");
      for (b in f) {
        localStorage.setItem("catalog-theme", JSON.stringify(f));
        break
      }
      v = f;
      q();
      N()
    }

    function ua(a) {
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
        for (a = va.length - 1; 0 <= a; a--) b = va[a], d[b] = n[b];
        localStorage.setItem("catalog-settings", JSON.stringify(d))
      }
    }

    function wa(a, b) {
      var d = "";
      a ? ($teaserCtrl.selectedIndex = 1, d = "extended-", n.extended = !0) : ($teaserCtrl.selectedIndex = 0, n.extended = !1);
      d = n.large ? d + "large" : d + "small";
      t.className = d;
      b || ea()
    }

    function xa(a, b) {
      var d = n.extended ? "extended-" : "";
      a ? (D.selectedIndex = 1, d += "large", n.large = !0) : (D.selectedIndex = 0, d += "small", n.large = !1);
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
      void 0 !== d[a] ? (z.selectedIndex = d[a], n.orderby = a) : (z.selectedIndex = 0, n.orderby = "date");
      b || (ea(), q())
    }

    function Na() {
      wa("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Oa() {
      A(z.options[z.selectedIndex].value)
    }

    function Pa() {
      xa("large" == D.options[D.selectedIndex].value)
    }

    function q() {
      var a, b, d, c, f, e, h, k, m, p, q, w, G = 0,
        r = "",
        u = 0,
        C, D, y, A = "",
        z, B, E, I, F;
      if (0 != l.count) {
        w = l.custom_spoiler ? n.imgspoiler + "-" + l.slug + l.custom_spoiler + ".png" : n.imgspoiler + ".png";
        t.hasChildNodes() && ((a = document.getElementById("th-tip")) && document.body.removeChild(a), t.textContent = "");
        q = "//boards.4chan.org/" + l.slug + "/thread/";
        C = ".t.4cdn.org/" + l.slug + "/";
        x = 0;
        for (c in H) H[c].hits = 0;
        F = !n.large;
        D = v.newtab ? 'target="_blank" ' : "";
        a = 0;
        a: for (; a < l.count; ++a) {
          f = l.order[n.orderby][a];
          e = l.threads[f];
          k = m = p = !1;
          e.sub ? (y = "<b>" + e.sub + "</b>", e.teaser && (y += ": " + e.teaser)) : y = e.teaser;
          if (X) {
            if (!J[f]) continue;
            ++x
          } else if (!L) {
            if (J[f]) {
              ++x;
              continue
            }
            if (0 <= s[f]) p = m = !0;
            else
              for (c in d = e.capcode ? (e.trip || "") + "!#" + e.capcode : e.trip, H)
                if (h = H[c], 0 == h.type && h.pattern.test(y) || 1 == h.type && h.pattern.test(d) || 2 == h.type && h.pattern.test(e.author)) {
                  if (h.hidden) {
                    ++G;
                    h.hits += 1;
                    continue a
                  }
                  k = h;
                  m = !!h.top;
                  h.hits += 1;
                  break
                }
          } else if (!L.test(y)) continue;
          u = 0 === u ? 1 : 0;
          h = '<div id="thread-' + f + '" class="thread">';
          M && (d = f + "-" + l.slug, h += '<span id="leaf-' + f + '" data-watch="' + f + '" ' + (ThreadWatcher.watched[d] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          h += "<a " + D + 'href="' + q + f + (e.semantic_url ? "/" + e.semantic_url : "") + '"><img alt="" id="thumb-' + f + '" class="thumb';
          d = k.color ? ' hl" style="border-color: ' + k.color : p ? " pinned" : "";
          e.imgurl ? e.imgspoiler && !v.nospoiler ? h += d + '" src="' + w : (E = e.tn_w, I = e.tn_h, F && (B = n.smallsize, E > B && (z = B / E, E = B, I *= z), I > B && (z = B / I, I = B, E *= z)), h += d + '" width="' + E + '" height="' + I + '" src="//' + u + C + e.imgurl + "s.jpg") : h = e.imgdel ? h + (" imgdel" + d + '" src="' + n.imgdel) : h + (" nofile" + d + '" src="' + n.nofile);
          h += '" data-id="' + f + '" /></a>';
          if (e.sticky || e.closed || e.capcodereps) {
            h += '<div class="threadIcons">';
            e.sticky && (h += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            e.closed && (h += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (e.capcodereps)
              for (z = e.capcodereps.split(","), d = 0; B = z[d]; ++d)
                if (E = Qa[B]) h += '<span title="' + E + ' Replies" class="threadIcon ' + B + 'Icon"></span>';
            h += "</div>"
          }
          h += '<div title="(R)eplies / (I)mages' + (m ? " / (P)age" : "") + '" id="meta-' + f + '" class="meta">';
          e.r && (h = e.bumplimit ? h + ("<i>R: <b>" + e.r + "</b></i>") : h + ("R: <b>" + e.r + "</b>"), p && (p = e.r - s[f], 0 < p ? (h += " (+" + p + ")", s[f] = e.r) : h += "(+0)"), e.i && (h = e.imagelimit ? h + (" / <i>I: <b>" + e.i + "</b></i>") : h + (" / I: <b>" + e.i + "</b>")));
          m && 0 <= (page = 0 | l.order.alt.indexOf(f) / l.pagesize) && (e.r && (h += " / "), h += "P: <b>" + page + "</b>");
          h += "</div>";
          y && (h += '<div class="teaser', k.color && (h += ' style="color:' + k.color), h += '">' + y + "</div>");
          m ? A += h + "</div>" : r += h + "</div>"
        }
        r = L && "" == r ? '<div class="error">Nothing Found</div>' : A ? A + r + '<div class="clear"></div>' : r + '<div class="clear"></div>';
        for (b in s) {
          localStorage.setItem("4chan-pin-" + l.slug, JSON.stringify(s));
          break
        }
        t.innerHTML = r;
        Y("filtered", G);
        Y("hidden", x)
      }
    }

    function Ra(a) {
      a = a.target;
      $.hasClass(a, "thumb") && (clearTimeout(fa), S && ya(), fa = setTimeout(Sa, n.tipdelay, a))
    }

    function Ta(a) {
      clearTimeout(fa);
      S && ya()
    }

    function Sa(a) {
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
      d += '<span class="post-ago">' + za(b - thread.date) + " ago</span>";
      !n.extended && thread.teaser && (d += '<p class="post-teaser">' + thread.teaser + "</p>");
      0 < thread.r && (d += '<div class="post-last">Last reply by <span class="' + (thread.lr.capcode ? thread.lr.capcode + "-capcode " : "") + 'post-author">' + thread.lr.author, thread.lr.trip && (d += ' <span class="post-tripcode">' + thread.lr.trip + "</span>"), thread.lr.capcode && (d += " ## " + thread.lr.capcode.charAt(0).toUpperCase() +
        thread.lr.capcode.slice(1)), d += '</span> <span class="post-ago">' + za(b - thread.lr.date) + " ago</span>");
      b = document.createElement("div");
      b.id = "post-preview";
      b.innerHTML = d;
      document.body.appendChild(b);
      d = b.style;
      c - e.right < (0 | 0.3 * c) ? (c -= e.left, d.right = c + 5 + "px") : (c = e.left + e.width, d.left = c + 5 + "px");
      d.top = e.top + a.offsetHeight + window.pageYOffset - b.offsetHeight / 2 - e.height / 2 + "px";
      S = !0
    }

    function ya() {
      document.body.removeChild($.id("post-preview"));
      S = !1
    }

    function za(a, b) {
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
      ma = {
        83: function() {
          $.hasClass(C, "active") ? V(!0) : K()
        },
        82: G,
        88: function() {
          "date" == n.orderby ? A("alt") : "alt" == n.orderby ? A("r") : "r" == n.orderby ? A("absdate") : A("date")
        }
      },
      l = {},
      va = ["orderby", "large", "extended"],
      v = {},
      ha, U, H = {},
      S = !1,
      fa = null,
      s = {},
      J = {},
      x = 0,
      M = !1,
      Q = !1,
      T = !1,
      L = !1,
      X = !1,
      t, C, D, z, w, la;
    2 <= window.devicePixelRatio && (n.imgdel.replace(".", "@2x."), n.nofile.replace(".", "@2x."));
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
      ta(v, !0);
      t = $.id("threads");
      C = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      D = $.id("size-ctrl");
      z = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(C, "click", K);
      $.on($.id("filters-clear-hidden"), "click", na);
      $.on($.id("filters-clear-hidden-bottom"), "click", na);
      $.on($.id("qf-clear"), "click", K);
      $.on($.id("settingsWindowLink"), "click", F);
      $.on($.id("settingsWindowLinkBot"), "click", F);
      $.on($.id("settingsWindowLinkMobile"), "click", F);
      $.on($.id("filters-ctrl"), "click", Ka);
      $.on($teaserCtrl, "change", Na);
      $.on(D, "change", Pa);
      $.on(z, "change", Oa);
      $.on(t, "mouseover", Ra);
      $.on(t, "mouseout", Ta);
      $.on($.id("togglePostFormLink"), "click", k);
      $.on(document, "click", Fa);
      $.on(window, "load", checkForBlock);
      var m;
      UA.hasWebStorage && (m = localStorage.getItem("catalog-settings")) && $.extend(n, JSON.parse(m));
      Ba();
      var f, l, h;
      if (UA.hasWebStorage && (f = $.id("globalMessage")) && f.textContent && (f.nextElementSibling.style.clear = "both", m = document.createElement("span"), m.id = "toggleMsgBtn", m.setAttribute("data-cmd", "toggleMsg"), m.title = "Toggle announcement", h = localStorage.getItem("4chan-global-msg"), l = f.getAttribute("data-utc"), h && l <= h ? (f.style.display = "none", m.style.opacity = "0.5", m.className = "expandIcon") : m.className = "collapseIcon", $.on(m, "click", c), f.parentNode.insertBefore(m, f), m = $.id("globalToggle"), 0 < m.offsetWidth)) $.on(m, "click", e);
      initBlotter();
      !window.passEnabled && window.preupload_captcha && "FormData" in window && document.forms.post.addEventListener("submit", onPostSubmit, !1);
      UA.hasContextMenu && (la = {
        pin: ja,
        hide: ka,
        report: Ca
      }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>', $.on($.id("ctxmenu-main"), "click", Ea), $.on($.id("ctxmenu-thread"), "click", Da));
      UA.hasWebStorage && (b = localStorage.getItem("4chan-settings")) && (b = JSON.parse(b), !b.disableAll && b.threadWatcher && (M = !0, ThreadWatcher.init()), b.customMenu && CustomMenu.apply(b.customMenuList), !1 === b.dropDownNav || FC.hasMobileLayout || (Q = !0, T = b.classicNav, a()));
      window.passEnabled && setPassMsg();
      (g = document.forms.post.flag) && (d = $.readCookie("4chan_flag")) && (g = g.querySelector('option[value="' + d + '"]')) && g.setAttribute("selected", "selected");
      A(n.orderby, !0);
      xa(n.large, !0);
      wa(n.extended, !0);
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
      $.on(d, "change", p);
      ra();
      UA.hasWebStorage && (J = ua("4chan-hide-t-" +
        l.slug), s = ua("4chan-pin-" + l.slug));
      UA.hasSessionStorage && !location.hash && (c = sessionStorage.getItem("4chan-catalog-search")) ? l.slug != sessionStorage.getItem("4chan-catalog-search-board") && (sessionStorage.removeItem("4chan-catalog-search"), sessionStorage.removeItem("4chan-catalog-search-board"), c = null) : location.hash && (c = location.hash.match(/#s=(.+)/)) && (c = decodeURIComponent(c[1].replace(/\+/g, " ")));
      c ? (K(), $.id("qf-box").value = c, ia()) : q()
    };
    R.applyCSS = function(a, b, d) {
      var c, e;
      a || (a = v);
      void 0 !== b && ((e = $.readCookie(b)) || (e = "nws_style" == b ? "Yotsuba New" : "Yotsuba B New"), ha = b, U = e, c = document.createElement("link"), c.type = "text/css", c.id = "base-css", c.rel = "stylesheet", c.setAttribute("href", "//s.4cdn.org/css/catalog_" + e.toLowerCase().replace(/ /g, "_") + "." + d + ".css"), document.head.insertBefore(c, $.id("mobile-css")));
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
      a.innerHTML = '<div class="drag" id="twHeader">Thread Watcher' + (UA.hasCORS ? '<div id="twPrune" class="icon refreshIcon" title="Refresh"></div></div>' : "</div>");
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
      for (c in this.watched) b = c.split("-"), a += '<li id="watch-' + c + '"><span class="pointer" data-cmd="unwatch" data-id="' + b[0] + '" data-board="' + b[1] + '">&times;</span> <a href="' + this.linkToThread(b[0], b[1], this.watched[c][1]) + '"', a = -1 == this.watched[c][1] ? a + ' class="deadlink">' : this.watched[c][2] ? a + (' class="hasNewReplies">(' + this.watched[c][2] + ") ") : a + ">", a += "/" + b[1] + "/ - " + this.watched[c][0] + "</a></li>";
      ThreadWatcher.listNode.innerHTML = a
    },
    onClick: function(a) {
      a = a.target;
      a.hasAttribute("data-id") ? ThreadWatcher.toggle(a.getAttribute("data-id"), a.getAttribute("data-board")) : "twPrune" != a.id || ThreadWatcher.isRefreshing || ThreadWatcher.refresh()
    },
    toggle: function(a, b, c, e) {
      var k;
      b = a + "-" + b;
      k = $.id("leaf-" +
        a);
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
        var c, e, p, G;
        if (200 == this.status) {
          p = ThreadWatcher.parseThreadJSON(this.responseText);
          G = ThreadWatcher.watched[a][1];
          e = 0;
          for (c = p.length - 1; 1 <= c && !(p[c].no <= G); c--)++e;
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
  (function(a, b, c, e, k, m, p) {
    a.GoogleAnalyticsObject = k;
    a[k] = a[k] || function() {
      (a[k].q = a[k].q || []).push(arguments)
    };
    a[k].l = 1 * new Date;
    m = b.createElement(c);
    p = b.getElementsByTagName(c)[0];
    m.async = 1;
    m.src = e;
    p.parentNode.insertBefore(m, p)
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
  if (a = document.getElementById("toggleBlotter"))
    if (a.addEventListener("click", toggleBlotter, !1), b = localStorage.getItem("4chan-blotter")) a = +a.getAttribute("data-utc"), a <= +b && toggleBlotter()
}

function toggleBlotter(a) {
  var b;
  a && a.preventDefault();
  if (a = document.getElementById("blotter-msgs")) b = document.getElementById("toggleBlotter"), "none" == a.style.display ? (a.style.display = "", localStorage.removeItem("4chan-blotter"), b.textContent = "Hide", a = b.nextElementSibling, a.style.display && (a.style.display = "")) : (a.style.display = "none", localStorage.setItem("4chan-blotter", b.getAttribute("data-utc")), b.textContent = "Show Blotter", b.nextElementSibling.style.display = "none")
}

function buildMobileNav() {
  var a, b, c, e, k, m;
  if (a = document.getElementById("boardSelectMobile")) {
    k = "";
    m = [];
    b = document.querySelectorAll("#boardNavDesktop .boardList > a");
    for (c = 0; e = b[c]; ++c) m.push(e);
    m.sort(function(a, b) {
      return a.textContent < b.textContent ? -1 : a.textContent > b.textContent ? 1 : 0
    });
    for (c = 0; e = m[c]; ++c) k += '<option value="' + e.textContent + '">/' + e.textContent + "/ - " + e.title + "</option>";
    a.innerHTML = k
  }
}

function loadBannerImage() {
  var a;
  !(a = document.getElementById("bannerCnt")) || 0 >= a.offsetWidth || (a.innerHTML = '<img alt="4chan" src="//s.4cdn.org/image/title/' + a.getAttribute("data-src") + '">')
};
