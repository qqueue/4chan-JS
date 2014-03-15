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
}, FC = function() {
    function a() {
      var l, a;
      a = $.id("boardSelectMobile");
      for (l = a.options.length - 1; 0 <= l; l--)
        if (a.options[l].value == h.slug) {
          a.selectedIndex = l;
          break
        }
      $.on(a, "change", function() {
        var l = this.options[this.selectedIndex].value;
        window.location = "//boards.4chan.org/" + l + ("f" == l ? "" : "/catalog")
      });
      $.addClass(document.body, S.toLowerCase().replace(/ /g, "_"))
    }

    function b() {
      var l, a;
      l = $.id("globalMessage");
      a = $.id("toggleMsgBtn");
      "none" == l.style.display ? (l.style.display = "", a.className = "collapseIcon", a.style.opacity = "1", localStorage.removeItem("4chan-global-msg")) : (l.style.display = "none", a.className = "expandIcon", a.innerHTML = '<span class="mobile">View Important Announcement</span>', a.style.opacity = "0.5", localStorage.setItem("4chan-global-msg", l.getAttribute("data-utc")))
    }

    function c(l) {
      var a = document.getElementById("globalToggle"),
        d = document.getElementById("globalMessage");
      l.preventDefault();
      $.hasClass(a, "shown") ? ($.toggleClass(a, "shown"), d.style.display = "", a.innerHTML = "View Important Announcement") : ($.addClass(a, "shown"), d.style.display = "block", a.innerHTML = "Close Announcement")
    }

    function e() {
      var l = document.forms.post;
      "block" == l.style.display ? (l.style.display = "", this.textContent = "Start a Thread") : (l.style.display = "block", this.textContent = "Close Post Form")
    }

    function k() {
      return RegExp("(\\/|\\.|\\*|\\+|\\?|\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g")
    }

    function p() {
      var l = new Date;
      l.setTime(l.getTime() + 31536E6);
      document.cookie = fa + "=" + this.value + ";" + l.toGMTString() + "; path=/; domain=4chan.org";
      n()
    }

    function n() {
      location.href = location.href
    }

    function M(l, a) {
      var d;
      return function() {
        var b = arguments,
          c = this;
        clearTimeout(d);
        d = setTimeout(function() {
          a.apply(c, b)
        }, l)
      }
    }

    function F() {
      var l, a = $.id("qf-cnt");
      $.hasClass(B, "active") ? (T(), a.style.display = "none", $.removeClass(B, "active")) : (a.style.display = "inline", l = $.id("qf-box"), a.hasAttribute("data-built") || (a.setAttribute("data-built", "1"), $.on(l, "keyup", M(250, ha)), $.on(l, "keydown", function(l) {
        "27" == l.keyCode && F()
      })), l.focus(), l.value = "", $.addClass(B, "active"))
    }

    function ha() {
      var l, a;
      "" != (a = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", a), sessionStorage.setItem("4chan-catalog-search-board", h.slug)), l = k(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = a, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", a = a.replace(l, "\\$1"), K = RegExp(a, "i"), q()) : T()
    }

    function T(a) {
      var b = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      a ? (b.value = "", b.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), K = !1, q())
    }

    function Aa() {
      var a, b;
      if (UA.hasWebStorage) $.on(t, "mousedown", function(d) {
        a = d.target;
        if (-1 != a.className.indexOf("thumb"))
          if (b = a.getAttribute("data-id"), 3 == d.which) t.setAttribute("contextmenu", "ctxmenu-thread"), $.id("ctxmenu-thread").target = b;
          else {
            if (1 == d.which && d.altKey) return ia(b), !1;
            if (1 == d.which && d.shiftKey) return ja(b), !1
          } else 3 == d.which && t.setAttribute("contextmenu", "ctxmenu-main")
      });
      if (!v.nobinds) $.on(document, "keyup", U)
    }

    function ia(a) {
      0 <= s[a] ? delete s[a] : s[a] = h.threads[a].r || 0;
      localStorage.setItem("4chan-pin-" + h.slug, JSON.stringify(s));
      q()
    }

    function ja(a) {
      V ? (delete I[a], --x) : (I[a] = !0, ++x);
      localStorage.setItem("4chan-hide-t-" + h.slug, JSON.stringify(I));
      $.id("thread-" + a).style.display = "none";
      W("hidden", x);
      0 == x && X(!1)
    }

    function X(a) {
      V = a;
      $.id("filters-clear-hidden").textContent = $.id("filters-clear-hidden-bottom").textContent = a ? "Back" : "Show";
      q()
    }

    function W(a, b) {
      var d = a + "-label",
        c = a + "-count";
      0 < b ? ($.id(c).textContent = $.id(c + "-bottom").textContent = b, $.id(d).style.display = $.id(d + "-bottom").style.display = "inline") : $.id(d).style.display = $.id(d + "-bottom").style.display = "none"
    }

    function Ba(a) {
      window.open("http://sys.4chan.org/" + h.slug + "/imgboard.php?mode=report&no=" + a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
    }

    function Ca(a) {
      a = a.target.getAttribute("data-cmd");
      ka[a]($.id("ctxmenu-thread").target)
    }

    function U(a) {
      var b = a.target;
      if ("TEXTAREA" != b.nodeName && "INPUT" != b.nodeName && la[a.keyCode]) la[a.keyCode]()
    }

    function ma(a) {
      a.preventDefault();
      0 < x && ("Show" == $.id("filters-clear-hidden").textContent ? X(!0) : X(!1))
    }

    function Da() {
      s = {};
      localStorage.removeItem("4chan-pin-" + h.slug);
      q();
      return !1
    }

    function Ea(a) {
      var b = a.target,
        d;
      (b = a.target) != document && ((d = b.getAttribute("data-watch")) ? ThreadWatcher.toggle(d, h.slug, h.threads[d].teaser, h.threads[d].lr.id) : "backdrop" == b.id ? Y($.id("filters")) ? Y($.id("theme")) || N() : Y($.id("filters-protip")) ? Z() : na() : "filter-palette" == a.target.id && O())
    }

    function Fa() {
      var a = $.id("filters-protip");
      a.style.top = window.pageYOffset + 50 + "px";
      $.removeClass(a, "hidden")
    }

    function na() {
      $.addClass($.id("filters-protip"), "hidden")
    }

    function Ga(a) {
      var b = a.target;
      if ("filters-close" == b.id) Z();
      else if ("filters-add" == b.id) $.id("filter-list").appendChild(oa({
        active: 1,
        pattern: "",
        boards: "",
        color: "",
        hidden: 0,
        top: 0,
        hits: 0
      }, Ha()));
      else if ("filters-save" == b.id) Ia(), Z();
      else if (b.hasAttribute("data-active")) aa(b, "active");
      else if (b.hasAttribute("data-hide")) aa(b, "hide", "top");
      else if (b.hasAttribute("data-top")) aa(b, "top", "hide");
      else if ($.hasClass(b, "filter-color")) {
        var d;
        a = b.getBoundingClientRect();
        if (!w) {
          var c, f, e, g, k, h;
          w = $.id("filter-palette");
          c = $.id("filter-color-table");
          e = $.tag("tbody", c)[0];
          g = m.filterColors.length;
          if (0 < g)
            for (d = m.filterColors[0].length, f = $.tag("tfoot", c)[0], c = f.children.length - 1; 0 <= c; c--) f.children[c].firstElementChild.setAttribute("colspan", d);
          for (c = 0; c < g; ++c) {
            k = document.createElement("tr");
            for (f = 0; f < d; ++f) h = document.createElement("td"), h.innerHTML = '<span class="button clickbox" style="background:' + m.filterColors[c][f] + '"></span>', $.on(h.firstElementChild, "click", ba), k.appendChild(h);
            e.appendChild(k)
          }
        }
        $.removeClass(w, "hidden");
        w.setAttribute("data-target", b.id.split("-")[2]);
        d = w.firstElementChild;
        d.style.cssText = "top:" + a.top + "px;left:" + (a.left - d.clientWidth - 10) + "px;"
      } else b.hasAttribute("data-target") ? (a = $.id("filter-" + b.getAttribute("data-target")), a.parentNode.removeChild(a)) : b.hasAttribute("data-up") && (a = b.parentNode.parentNode, (d = a.previousElementSibling) && a.parentNode.insertBefore(a, d))
    }

    function Ja() {
      var a, b, d, c, f, e;
      b = $.id("filters");
      b.hasAttribute("data-built") || ($.on(b, "click", Ga), $.on($.id("filter-palette-close"), "click", O), $.on($.id("filter-palette-clear"), "click", Ka), $.on($.id("filters-help-open"), "click", Fa), $.on($.id("filters-help-close"), "click", na), $.on($.id("filter-rgb"), "keyup", La), $.on($.id("filter-rgb-ok"), "click", ba), b.setAttribute("data-built", "1"));
      d = localStorage.getItem("catalog-filters");
      f = 0;
      if (d) {
        c = $.id("filter-list");
        d = JSON.parse(d);
        for (a in d) c.appendChild(oa(d[a], f)), ++f;
        pa()
      }
      b.style.top = window.pageYOffset + 60 + "px";
      $.removeClass(b, "hidden");
      (e = $.cls("filter-active", b)[0]) && e.focus();
      P()
    }

    function Z() {
      var a, b, d;
      $.id("filters-msg").style.display = "none";
      $.addClass($.id("filters"), "hidden");
      b = $.id("filter-list");
      d = $.tag("tr", b);
      for (a = d.length - 1; 0 <= a; a--) b.removeChild(d[a]);
      O();
      P()
    }

    function O() {
      w && !$.hasClass(w, "hidden") && $.addClass(w, "hidden")
    }

    function qa() {
      if (UA.hasWebStorage) {
        G = {};
        var a = localStorage.getItem("catalog-filters");
        if (a) {
          var a = JSON.parse(a),
            b, d, c, f, e, g = /^\/(.*)\/(i?)$/,
            m = /\s*\|+\s*/g,
            p = /\\\*/g,
            n = k(),
            t, s, q, r, u, v, x, y;
          try {
            for (d in a)
              if (b = a[d], b.active && "" != b.pattern && (!b.boards || -1 != b.boards.split(" ").indexOf(h.slug))) {
                r = b.pattern;
                if ("#" == r.charAt(0)) y = "#" == r.charAt(1) ? 2 : 1, u = RegExp(r.slice(y).replace(n, "\\$1"));
                else if (y = 0, t = r.match(g)) u = RegExp(t[1], t[2]);
                else if ('"' == r.charAt(0) && '"' == r.charAt(r.length - 1)) u = RegExp(r.slice(1, -1).replace(n, "\\$1"));
                else {
                  q = r.replace(m, "|").split(" ");
                  u = "";
                  e = q.length;
                  for (f = 0; f < e; ++f)
                    if (-1 != q[f].indexOf("|")) {
                      v = q[f].split("|");
                      x = [];
                      for (c = v.length - 1; 0 <= c; c--) "" != v[c] && x.push(v[c].replace(n, "\\$1"));
                      s = x.join("|").replace(p, "[^\\s]*");
                      u += "(?=.*\\b(" + s + ")\\b)"
                    } else s = q[f].replace(n, "\\$1").replace(p, "[^\\s]*"), u += "(?=.*\\b" + s + "\\b)";
                  u = RegExp("^" + u, "i")
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

    function Ia() {
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
      qa();
      q();
      pa()
    }

    function La() {
      $.id("filter-rgb-ok").style.backgroundColor = this.value
    }

    function oa(a, b) {
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
      f.checked = !! a.active;
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
      f.checked = !! a.hidden;
      f.className = "filter-hide";
      d.appendChild(f);
      c.appendChild(d);
      d = document.createElement("td");
      f = document.createElement("input");
      f.type = "checkbox";
      f.checked = !! a.top;
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

    function ba(a) {
      var b = $.id("filter-color-" + w.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background = this.style.backgroundColor);
      O()
    }

    function Ka() {
      ba(!0)
    }

    function Ha() {
      var a, b, d, c = $.id("filter-list").children;
      if (c.length) {
        for (a = d = 0; b = c[a]; ++a) b = +b.id.slice(7), b > d && (d = b);
        return d + 1
      }
      return 0
    }

    function aa(a, b, d) {
      b = "data-" + b;
      "0" == a.getAttribute(b) ? (a.setAttribute(b, "1"), $.addClass(a, "active"), a.innerHTML = "&#x2714;", d && (a = $.cls("filter-" + d, a.parentNode.parentNode)[0], a.setAttribute("data-" + d, "0"), $.removeClass(a, "active"), a.innerHTML = "")) : (a.setAttribute(b, "0"), $.removeClass(a, "active"), a.innerHTML = "")
    }

    function pa() {
      var a, b, d = $.id("filter-list").children;
      for (a = 0; b = d[a]; ++a) $.id("fhc-" + b.id.slice(7)).innerHTML = G[a] ? "x" + G[a].hits : ""
    }

    function Y(a) {
      return $.hasClass(a, "hidden")
    }

    function ca() {
      var a, b;
      UA.hasWebStorage ? (ra && (localStorage.setItem("catalog-init", "1"), (b = $.id("first-run")) && b.parentNode.removeChild(b)), a = $.id("theme"), theme = (theme = localStorage.getItem("catalog-theme")) ? JSON.parse(theme) : {}, $.id("theme-nobinds").checked = !! theme.nobinds, $.id("theme-nospoiler").checked = !! theme.nospoiler, $.id("theme-newtab").checked = !! theme.newtab, $.id("theme-tw").checked = L, theme.css && ($.id("theme-css").value = theme.css), $.on($.id("theme-save"), "click", sa), $.on($.id("theme-close"), "click", N), $.id("theme-msg").style.display = "none", a.style.top = window.pageYOffset + 60 + "px", $.removeClass(a, "hidden"), (b = $.tag("input", a)[0]) && b.focus(), P()) : alert("Your browser doesn't support Local Storage")
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
      if (a.nobinds) v.nobinds != a.nobinds && $.off(document, "keyup", U);
      else if (v.nobinds != a.nobinds) $.on(document, "keyup", U);
      b || Q.applyCSS(a)
    }

    function sa() {
      var a, b, d, c = {};
      $.id("theme-nobinds").checked && (c.nobinds = !0);
      $.id("theme-nospoiler").checked && (c.nospoiler = !0);
      $.id("theme-newtab").checked && (c.newtab = !0);
      b = $.id("theme-tw").checked;
      b != L && (L = b, d = (d = localStorage.getItem("4chan-settings")) ? JSON.parse(d) : {}, d.threadWatcher = b, localStorage.setItem("4chan-settings", JSON.stringify(d)), b ? ThreadWatcher.init() : ThreadWatcher.unInit());
      "" != (b = $.id("theme-css").value) && (c.css = b);
      ta(c);
      localStorage.removeItem("catalog-theme");
      for (a in c) {
        localStorage.setItem("catalog-theme", JSON.stringify(c));
        break
      }
      v = c;
      q();
      N()
    }

    function ua(a) {
      var b, d, c = !1,
        f = h.order.date[0];
      if (d = localStorage.getItem(a)) {
        d = JSON.parse(d);
        for (b in d)!h.threads[b] && b < f && (delete d[b], c = !0);
        for (b in d) return c && localStorage.setItem(a, JSON.stringify(d)), d;
        localStorage.removeItem(a)
      }
      return {}
    }

    function da() {
      var a, b, d;
      if (UA.hasWebStorage) {
        d = {};
        for (a = va.length -
          1; 0 <= a; a--) b = va[a], d[b] = m[b];
        localStorage.setItem("catalog-settings", JSON.stringify(d))
      }
    }

    function wa(a, b) {
      var d = "";
      a ? ($teaserCtrl.selectedIndex = 1, d = "extended-", m.extended = !0) : ($teaserCtrl.selectedIndex = 0, m.extended = !1);
      d = m.large ? d + "large" : d + "small";
      t.className = d;
      b || da()
    }

    function xa(a, b) {
      var d = m.extended ? "extended-" : "";
      a ? (C.selectedIndex = 1, d += "large", m.large = !0) : (C.selectedIndex = 0, d += "small", m.large = !1);
      t.className = d;
      b || (da(), q())
    }

    function D(a, b) {
      var d = {
        alt: 0,
        absdate: 1,
        date: 2,
        r: 3
      };
      void 0 !== d[a] ? (z.selectedIndex = d[a], m.orderby = a) : (z.selectedIndex = 0, m.orderby = "date");
      b || (da(), q())
    }

    function Ma() {
      wa("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Na() {
      D(z.options[z.selectedIndex].value)
    }

    function Oa() {
      xa("large" == C.options[C.selectedIndex].value)
    }

    function q() {
      var a, b, d, c, f, e, g, k, p, n, q, w, B = 0,
        r = "",
        u = 0,
        C, D, y, z = "",
        J, A, E, H, F;
      if (0 != h.count) {
        w = h.custom_spoiler ? m.imgspoiler + "-" + h.slug + h.custom_spoiler + ".png" : m.imgspoiler + ".png";
        t.hasChildNodes() && ((a = document.getElementById("th-tip")) && document.body.removeChild(a), t.textContent = "");
        q = "//boards.4chan.org/" + h.slug + "/res/";
        C = ".t.4cdn.org/" + h.slug + "/thumb/";
        x = 0;
        for (c in G) G[c].hits = 0;
        F = !m.large;
        D = v.newtab ? 'target="_blank" ' : "";
        a = 0;
        a: for (; a < h.count; ++a) {
          f = h.order[m.orderby][a];
          e = h.threads[f];
          k = p = n = !1;
          e.sub ? (y = "<b>" + e.sub + "</b>", e.teaser && (y += ": " + e.teaser)) : y = e.teaser;
          if (V) {
            if (!I[f]) continue;
            ++x
          } else if (!K) {
            if (I[f]) {
              ++x;
              continue
            }
            if (0 <= s[f]) n = p = !0;
            else
              for (c in d = e.capcode ? (e.trip || "") + "!#" + e.capcode : e.trip, G)
                if (g = G[c], 0 == g.type && g.pattern.test(y) || 1 == g.type && g.pattern.test(d) || 2 == g.type && g.pattern.test(e.author)) {
                  if (g.hidden) {
                    ++B;
                    g.hits += 1;
                    continue a
                  }
                  k = g;
                  p = !! g.top;
                  g.hits += 1;
                  break
                }
          } else if (!K.test(y)) continue;
          u = 0 === u ? 1 : 0;
          g = '<div id="thread-' + f + '" class="thread">';
          L && (d = f + "-" + h.slug, g += '<span id="leaf-' + f + '" data-watch="' + f + '" ' + (ThreadWatcher.watched[d] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          g += "<a " + D + 'href="' + q + f + '"><img alt="" id="thumb-' + f + '" class="thumb';
          d = k.color ? ' hl" style="border-color: ' + k.color : n ? " pinned" : "";
          e.imgurl ? e.imgspoiler && !v.nospoiler ? g += d + '" src="' + w : (E = e.tn_w, H = e.tn_h, F && (A = m.smallsize, E > A && (J = A / E, E = A, H *= J), H > A && (J = A / H, H = A, E *= J)), g += d + '" width="' + E + '" height="' + H + '" src="//' + u + C + e.imgurl + "s.jpg") : g = e.imgdel ? g + (" imgdel" + d + '" src="' + m.imgdel) : g + (" nofile" + d + '" src="' + m.nofile);
          g += '" data-id="' + f + '" /></a>';
          if (e.sticky || e.closed || e.capcodereps) {
            g += '<div class="threadIcons">';
            e.sticky && (g += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            e.closed && (g += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (e.capcodereps)
              for (J = e.capcodereps.split(","), d = 0; A = J[d]; ++d)
                if (E = Pa[A]) g += '<span title="' + E + ' Replies" class="threadIcon ' + A + 'Icon"></span>';
            g += "</div>"
          }
          g += '<div title="(R)eplies / (I)mages' + (p ? " / (P)age" : "") + '" id="meta-' + f + '" class="meta">';
          e.r && (g = e.bumplimit ? g + ("<i>R: <b>" + e.r + "</b></i>") : g + ("R: <b>" + e.r + "</b>"), n && (n = e.r - s[f], 0 < n ? (g += " (+" + n + ")", s[f] = e.r) : g += "(+0)"), e.i && (g = e.imagelimit ? g + (" / <i>I: <b>" + e.i + "</b></i>") : g + (" / I: <b>" + e.i + "</b>")));
          p && 0 <= (page = 0 | h.order.alt.indexOf(f) / h.pagesize) && (e.r && (g += " / "), g += "P: <b>" + page + "</b>");
          g += "</div>";
          y && (g += '<div class="teaser', k.color && (g += ' style="color:' + k.color), g += '">' + y + "</div>");
          p ? z += g + "</div>" : r += g + "</div>"
        }
        r = K && "" == r ? '<div class="error">Nothing Found</div>' : z ? z + r + '<div class="clear"></div>' : r + '<div class="clear"></div>';
        for (b in s) {
          localStorage.setItem("4chan-pin-" + h.slug, JSON.stringify(s));
          break
        }
        t.innerHTML = r;
        W("filtered", B);
        W("hidden", x)
      }
    }

    function Qa(a) {
      a = a.target;
      $.hasClass(a, "thumb") && (clearTimeout(ea), R && ya(), ea = setTimeout(Ra, m.tipdelay, a))
    }

    function Sa(a) {
      clearTimeout(ea);
      R && ya()
    }

    function Ra(a) {
      var b, d, c, e;
      b = Date.now() / 1E3;
      e = a.getBoundingClientRect();
      c = document.documentElement.offsetWidth;
      thread = h.threads[a.getAttribute("data-id")];
      d = thread.sub ? '<span class="post-subject">' + thread.sub + "</span>" : "Posted";
      d += ' by <span class="' + (thread.capcode ? thread.capcode + "-capcode " : "") + 'post-author">' + (thread.author || h.anon);
      thread.trip && (d += ' <span class="post-tripcode">' + thread.trip + "</span>");
      thread.capcode && (d += " ## " + thread.capcode.charAt(0).toUpperCase() +
        thread.capcode.slice(1));
      d += "</span> ";
      h.flags && thread.country && (d += '<div class="flag flag-' + thread.country.toLowerCase() + '"></div> ');
      d += '<span class="post-ago">' + za(b - thread.date) + " ago</span>";
      !m.extended && thread.teaser && (d += '<p class="post-teaser">' + thread.teaser + "</p>");
      0 < thread.r && (d += '<div class="post-last">Last reply by <span class="' + (thread.lr.capcode ? thread.lr.capcode + "-capcode " : "") + 'post-author">' + thread.lr.author, thread.lr.trip && (d += ' <span class="post-tripcode">' + thread.lr.trip + "</span>"), thread.lr.capcode && (d += " ## " + thread.lr.capcode.charAt(0).toUpperCase() + thread.lr.capcode.slice(1)), d += '</span> <span class="post-ago">' + za(b - thread.lr.date) + " ago</span>");
      b = document.createElement("div");
      b.id = "post-preview";
      b.innerHTML = d;
      document.body.appendChild(b);
      d = b.style;
      c - e.right < (0 | 0.3 * c) ? (c -= e.left, d.right = c + 5 + "px") : (c = e.left + e.width, d.left = c + 5 + "px");
      d.top = e.top + a.offsetHeight + window.pageYOffset - b.offsetHeight / 2 - e.height / 2 + "px";
      R = !0
    }

    function ya() {
      document.body.removeChild($.id("post-preview"));
      R = !1
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
    var Q = this,
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
      }, Pa = {
        admin: "Administrator",
        mod: "Moderator",
        developer: "Developer",
        manager: "Manager"
      }, la = {
        83: function() {
          $.hasClass(B, "active") ? T(!0) : F()
        },
        82: n,
        88: function() {
          "date" == m.orderby ? D("alt") : "alt" == m.orderby ? D("r") : "r" == m.orderby ? D("absdate") : D("date")
        }
      }, h = {}, va = ["orderby", "large", "extended"],
      v = {}, fa, S, G = {}, R = !1,
      ea = null,
      s = {}, I = {}, x = 0,
      L = !1,
      K = !1,
      V = !1,
      ra = !1,
      t, B, C, z, w, ka;
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
    Q.init = function() {
      var a, k, d;
      FC.hasMobileLayout = checkMobileLayout();
      buildMobileNav();
      ta(v, !0);
      t = $.id("threads");
      B = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      C = $.id("size-ctrl");
      z = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(B, "click", F);
      $.on($.id("filters-clear-hidden"), "click", ma);
      $.on($.id("filters-clear-hidden-bottom"), "click", ma);
      $.on($.id("qf-clear"), "click", F);
      $.on($.id("settingsWindowLink"), "click", ca);
      $.on($.id("settingsWindowLinkBot"), "click", ca);
      $.on($.id("settingsWindowLinkMobile"), "click", ca);
      $.on($.id("filters-ctrl"), "click", Ja);
      $.on($teaserCtrl, "change", Ma);
      $.on(C, "change", Oa);
      $.on(z, "change", Na);
      $.on(t, "mouseover", Qa);
      $.on(t, "mouseout", Sa);
      $.on($.id("togglePostFormLink"), "click", e);
      $.on(document, "click", Ea);
      $.on(window, "load", checkForBlock);
      var h;
      UA.hasWebStorage && (h = localStorage.getItem("catalog-settings")) && $.extend(m, JSON.parse(h));
      Aa();
      var f, p;
      if (UA.hasWebStorage && (a = $.id("globalMessage")) && a.textContent && (a.nextElementSibling.style.clear = "both", h = document.createElement("span"), h.id = "toggleMsgBtn", h.setAttribute("data-cmd", "toggleMsg"), h.title = "Toggle announcement", p = localStorage.getItem("4chan-global-msg"), f = a.getAttribute("data-utc"), p && f <= p ? (a.style.display = "none", h.style.opacity = "0.5", h.className = "expandIcon") : h.className = "collapseIcon", $.on(h, "click", b), a.parentNode.insertBefore(h, a), h = $.id("globalToggle"), 0 < h.offsetWidth)) $.on(h, "click", c);
      !window.passEnabled && window.preupload_captcha && "FormData" in window && document.forms.post.addEventListener("submit", onPostSubmit, !1);
      UA.hasContextMenu && (ka = {
        pin: ia,
        hide: ja,
        report: Ba
      }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>', $.on($.id("ctxmenu-main"), "click", Da), $.on($.id("ctxmenu-thread"), "click", Ca));
      UA.hasWebStorage && (!localStorage.getItem("catalog-init") && (ra = !0, a = $.id("settingsWindowLink")) && (h = document.createElement("div"), h.id = "first-run", h.textContent = "Change your settings", a.parentNode.appendChild(h)), localStorage.getItem("catalog-visited") || localStorage.setItem("catalog-visited", "1"), a = localStorage.getItem("4chan-settings")) && (a = JSON.parse(a), !a.disableAll && a.threadWatcher && (L = !0, ThreadWatcher.init()), a.customMenu && CustomMenu.apply(a.customMenuList));
      window.passEnabled && setPassMsg();
      (k = document.forms.post.flag) && (d = $.readCookie("4chan_flag")) && (k = k.querySelector('option[value="' + d + '"]')) && k.setAttribute("selected", "selected");
      D(m.orderby, !0);
      xa(m.large, !0);
      wa(m.extended, !0)
    };
    Q.loadCatalog = function(b) {
      var c;
      h = b;
      a();
      var d, e, f;
      d = $.id("styleSelector");
      e = d.children;
      for (b = 0; f = e[b]; ++b) f.value == S && (d.selectedIndex = b);
      $.on(d, "change", p);
      qa();
      UA.hasWebStorage && (I = ua("4chan-hide-t-" + h.slug), s = ua("4chan-pin-" + h.slug));
      UA.hasSessionStorage && !location.hash && (c = sessionStorage.getItem("4chan-catalog-search")) ? h.slug != sessionStorage.getItem("4chan-catalog-search-board") && (sessionStorage.removeItem("4chan-catalog-search"), sessionStorage.removeItem("4chan-catalog-search-board"), c = null) : location.hash && (c = location.hash.match(/#s=(.+)/)) && (c = decodeURIComponent(c[1].replace(/\+/g, " ")));
      c ? (F(), $.id("qf-box").value = c, ha()) : q()
    };
    Q.applyCSS = function(a, b, c) {
      var e, f;
      a || (a = v);
      void 0 !== b && ((f = $.readCookie(b)) || (f = "nws_style" == b ? "Yotsuba New" : "Yotsuba B New"), fa = b, S = f, e = document.createElement("link"), e.type = "text/css", e.id = "base-css", e.rel = "stylesheet", e.setAttribute("href", "//s.4cdn.org/css/catalog_" + f.toLowerCase().replace(/ /g, "_") + "." + c + ".css"), document.head.insertBefore(e, $.id("mobile-css")));
      (e = $.id("custom-css")) && document.head.removeChild(e);
      a.css && (e = document.createElement("style"), e.type = "text/css", e.id = "custom-css", e.styleSheet ? e.styleSheet.cssText = a.css : e.innerHTML = a.css, document.head.appendChild(e));
      UA.dispatchEvent("4chanMainInit")
    }
  }, ThreadWatcher = {
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
      c = $.id("watch-" +
        a);
      if (-1 == ThreadWatcher.watched[a][1]) {
        if (delete ThreadWatcher.watched[a], c.parentNode.removeChild(c), b) ThreadWatcher.onRefreshEnd(b)
      } else c = a.split("-"), e = new XMLHttpRequest, e.onload = function() {
        var c, e, n, M;
        if (200 == this.status) {
          n = ThreadWatcher.parseThreadJSON(this.responseText);
          M = ThreadWatcher.watched[a][1];
          e = 0;
          for (c = n.length - 1; 1 <= c && !(n[c].no <= M); c--)++e;
          e > ThreadWatcher.watched[a][2] && (ThreadWatcher.watched[a][2] = e)
        } else 404 == this.status && (ThreadWatcher.watched[a][1] = -1); if (b) ThreadWatcher.onRefreshEnd(b)
      }, b && (e.onerror = e.onload), e.open("GET", "//a.4cdn.org/" + c[1] + "/res/" + c[0] + ".json"), e.send(null)
    },
    linkToThread: function(a, b, c) {
      return "//" + location.host + "/" + b + "/res/" + a + (0 < c ? "#p" + c : "")
    }
  }, Draggable = {
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

function buildMobileNav() {
  var a, b, c, e;
  e = "";
  if (el = document.getElementById("boardSelectMobile")) {
    a = document.querySelectorAll("#boardNavDesktop .boardList > a");
    for (b = 0; c = a[b]; ++b) e += '<option value="' + c.textContent + '">/' + c.textContent + "/ - " + c.title + "</option>";
    el.innerHTML = e
  }
}

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
  (function(a, b, c, e, k, p, n) {
    a.GoogleAnalyticsObject = k;
    a[k] = a[k] || function() {
      (a[k].q = a[k].q || []).push(arguments)
    };
    a[k].l = 1 * new Date;
    p = b.createElement(c);
    n = b.getElementsByTagName(c)[0];
    p.async = 1;
    p.src = e;
    n.parentNode.insertBefore(p, n)
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
};
