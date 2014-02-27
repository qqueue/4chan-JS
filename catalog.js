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
      var f, l;
      l = $.id("boardSelectMobile");
      for (f = l.options.length - 1; 0 <= f; f--)
        if (l.options[f].value == m.slug) {
          l.selectedIndex = f;
          break
        }
      $.on(l, "change", function() {
        var f = this.options[this.selectedIndex].value;
        window.location = "//boards.4chan.org/" + f + ("f" == f ? "" : "/catalog")
      });
      $.addClass(document.body, T.toLowerCase().replace(/ /g, "_"))
    }

    function b() {
      var f, l;
      f = $.id("globalMessage");
      l = $.id("toggleMsgBtn");
      "none" == f.style.display ? (f.style.display = "", l.className = "collapseIcon", l.style.opacity = "1", localStorage.removeItem("4chan-global-msg")) : (f.style.display = "none", l.className = "expandIcon", l.innerHTML = '<span class="mobile">View Important Announcement</span>', l.style.opacity = "0.5", localStorage.setItem("4chan-global-msg", f.getAttribute("data-utc")))
    }

    function c(f) {
      var l = document.getElementById("globalToggle"),
        d = document.getElementById("globalMessage");
      f.preventDefault();
      $.hasClass(l, "shown") ? ($.toggleClass(l, "shown"), d.style.display = "", l.innerHTML = "View Important Announcement") : ($.addClass(l, "shown"), d.style.display = "block", l.innerHTML = "Close Announcement")
    }

    function e() {
      var f = document.forms.post;
      "block" == f.style.display ? (f.style.display = "", this.textContent = "Start a Thread") : (f.style.display = "block", this.textContent = "Close Post Form")
    }

    function k() {
      return RegExp("(\\/|\\.|\\*|\\+|\\?|\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "g")
    }

    function s() {
      var f = new Date;
      f.setTime(f.getTime() + 31536E6);
      document.cookie = ha + "=" + this.value + ";" + f.toGMTString() + "; path=/; domain=4chan.org";
      p()
    }

    function p() {
      location.href = location.href
    }

    function N(f, l) {
      var d;
      return function() {
        var a = arguments,
          b = this;
        clearTimeout(d);
        d = setTimeout(function() {
          l.apply(b, a)
        }, f)
      }
    }

    function G() {
      var f, l = $.id("qf-cnt");
      $.hasClass(C, "active") ? (U(), l.style.display = "none", $.removeClass(C, "active")) : (l.style.display = "inline", f = $.id("qf-box"), l.hasAttribute("data-built") || (l.setAttribute("data-built", "1"), $.on(f, "keyup", N(250, ia)), $.on(f, "keydown", function(f) {
        "27" == f.keyCode && G()
      })), f.focus(), f.value = "", $.addClass(C, "active"))
    }

    function ia() {
      var f, l;
      "" != (l = $.id("qf-box").value) ? (UA.hasSessionStorage && (sessionStorage.setItem("4chan-catalog-search", l), sessionStorage.setItem("4chan-catalog-search-board", m.slug)), f = k(), $.id("search-term").textContent = $.id("search-term-bottom").textContent = l, $.id("search-label").style.display = $.id("search-label-bottom").style.display = "inline", l = l.replace(f, "\\$1"), L = RegExp(l, "i"), q()) : U()
    }

    function U(f) {
      var l = $.id("qf-box");
      $.id("search-label").style.display = $.id("search-label-bottom").style.display = "none";
      f ? (l.value = "", l.focus()) : (UA.hasSessionStorage && sessionStorage.removeItem("4chan-catalog-search"), L = !1, q())
    }

    function Ba() {
      var f, l;
      if (UA.hasWebStorage) $.on(u, "mousedown", function(d) {
        f = d.target;
        if (-1 != f.className.indexOf("thumb"))
          if (l = f.getAttribute("data-id"), 3 == d.which) u.setAttribute("contextmenu", "ctxmenu-thread"), $.id("ctxmenu-thread").target = l;
          else {
            if (1 == d.which && d.altKey) return ja(l), !1;
            if (1 == d.which && d.shiftKey) return ka(l), !1
          } else 3 == d.which && u.setAttribute("contextmenu", "ctxmenu-main")
      });
      if (!w.nobinds) $.on(document, "keyup", V)
    }

    function ja(f) {
      0 <= t[f] ? delete t[f] : t[f] = m.threads[f].r || 0;
      localStorage.setItem("4chan-pin-" + m.slug, JSON.stringify(t));
      q()
    }

    function ka(f) {
      W ? (delete J[f], --y) : (J[f] = !0, ++y);
      localStorage.setItem("4chan-hide-t-" + m.slug, JSON.stringify(J));
      $.id("thread-" + f).style.display = "none";
      X("hidden", y);
      0 == y && Y(!1)
    }

    function Y(f) {
      W = f;
      $.id("filters-clear-hidden").textContent = $.id("filters-clear-hidden-bottom").textContent = f ? "Back" : "Show";
      q()
    }

    function X(f, l) {
      var d = f + "-label",
        a = f + "-count";
      0 < l ? ($.id(a).textContent = $.id(a + "-bottom").textContent = l, $.id(d).style.display = $.id(d + "-bottom").style.display = "inline") : $.id(d).style.display = $.id(d + "-bottom").style.display = "none"
    }

    function Ca(f) {
      window.open("http://sys.4chan.org/" + m.slug + "/imgboard.php?mode=report&no=" + f, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
    }

    function Da(f) {
      f = f.target.getAttribute("data-cmd");
      la[f]($.id("ctxmenu-thread").target)
    }

    function V(f) {
      var a = f.target;
      if ("TEXTAREA" != a.nodeName && "INPUT" != a.nodeName && ma[f.keyCode]) ma[f.keyCode]()
    }

    function na(f) {
      f.preventDefault();
      0 < y && ("Show" == $.id("filters-clear-hidden").textContent ? Y(!0) : Y(!1))
    }

    function Ea() {
      t = {};
      localStorage.removeItem("4chan-pin-" + m.slug);
      q();
      return !1
    }

    function Fa(f) {
      var a = f.target,
        d;
      (a = f.target) != document && ((d = a.getAttribute("data-watch")) ? ThreadWatcher.toggle(d, m.slug, m.threads[d].teaser, m.threads[d].lr.id) : "backdrop" == a.id ? Z($.id("filters")) ? Z($.id("theme")) || O() : Z($.id("filters-protip")) ? aa() : oa() : "filter-palette" == f.target.id && P())
    }

    function Ga() {
      var f = $.id("filters-protip");
      f.style.top = window.pageYOffset + 50 + "px";
      $.removeClass(f, "hidden")
    }

    function oa() {
      $.addClass($.id("filters-protip"), "hidden")
    }

    function Ha(f) {
      var a = f.target;
      if ("filters-close" == a.id) aa();
      else if ("filters-add" == a.id) $.id("filter-list").appendChild(pa({
        active: 1,
        pattern: "",
        boards: "",
        color: "",
        hidden: 0,
        top: 0,
        hits: 0
      }, Ia()));
      else if ("filters-save" == a.id) Ja(), aa();
      else if (a.hasAttribute("data-active")) ba(a, "active");
      else if (a.hasAttribute("data-hide")) ba(a, "hide", "top");
      else if (a.hasAttribute("data-top")) ba(a, "top", "hide");
      else if ($.hasClass(a, "filter-color")) {
        var d;
        f = a.getBoundingClientRect();
        if (!x) {
          var b, c, e, h, k, m;
          x = $.id("filter-palette");
          b = $.id("filter-color-table");
          e = $.tag("tbody", b)[0];
          h = n.filterColors.length;
          if (0 < h)
            for (d = n.filterColors[0].length, c = $.tag("tfoot", b)[0], b = c.children.length - 1; 0 <= b; b--) c.children[b].firstElementChild.setAttribute("colspan", d);
          for (b = 0; b < h; ++b) {
            k = document.createElement("tr");
            for (c = 0; c < d; ++c) m = document.createElement("td"), m.innerHTML = '<span class="button clickbox" style="background:' + n.filterColors[b][c] + '"></span>', $.on(m.firstElementChild, "click", ca), k.appendChild(m);
            e.appendChild(k)
          }
        }
        $.removeClass(x, "hidden");
        x.setAttribute("data-target", a.id.split("-")[2]);
        d = x.firstElementChild;
        d.style.cssText = "top:" + f.top + "px;left:" + (f.left - d.clientWidth - 10) + "px;"
      } else a.hasAttribute("data-target") ? (f = $.id("filter-" + a.getAttribute("data-target")), f.parentNode.removeChild(f)) : a.hasAttribute("data-up") && (f = a.parentNode.parentNode, (d = f.previousElementSibling) && f.parentNode.insertBefore(f, d))
    }

    function Ka() {
      var f, a, d, b, c, e;
      a = $.id("filters");
      a.hasAttribute("data-built") || ($.on(a, "click", Ha), $.on($.id("filter-palette-close"), "click", P), $.on($.id("filter-palette-clear"), "click", La), $.on($.id("filters-help-open"), "click", Ga), $.on($.id("filters-help-close"), "click", oa), $.on($.id("filter-rgb"), "keyup", Ma), $.on($.id("filter-rgb-ok"), "click", ca), a.setAttribute("data-built", "1"));
      d = localStorage.getItem("catalog-filters");
      c = 0;
      if (d) {
        b = $.id("filter-list");
        d = JSON.parse(d);
        for (f in d) b.appendChild(pa(d[f], c)), ++c;
        qa()
      }
      a.style.top = window.pageYOffset + 60 + "px";
      $.removeClass(a, "hidden");
      (e = $.cls("filter-active", a)[0]) && e.focus();
      Q()
    }

    function aa() {
      var f, a, d;
      $.id("filters-msg").style.display = "none";
      $.addClass($.id("filters"), "hidden");
      a = $.id("filter-list");
      d = $.tag("tr", a);
      for (f = d.length - 1; 0 <= f; f--) a.removeChild(d[f]);
      P();
      Q()
    }

    function P() {
      x && !$.hasClass(x, "hidden") && $.addClass(x, "hidden")
    }

    function ra() {
      if (UA.hasWebStorage) {
        H = {};
        var f = localStorage.getItem("catalog-filters");
        if (f) {
          var f = JSON.parse(f),
            a, d, b, c, e, h = /^\/(.*)\/(i?)$/,
            n = /\s*\|+\s*/g,
            s = /\\\*/g,
            p = k(),
            u, t, q, r, v, w, y, z;
          try {
            for (d in f)
              if (a = f[d], a.active && "" != a.pattern && (!a.boards || -1 != a.boards.split(" ").indexOf(m.slug))) {
                r = a.pattern;
                if ("#" == r.charAt(0)) z = "#" == r.charAt(1) ? 2 : 1, v = RegExp(r.slice(z).replace(p, "\\$1"));
                else if (z = 0, u = r.match(h)) v = RegExp(u[1], u[2]);
                else if ('"' == r.charAt(0) && '"' == r.charAt(r.length - 1)) v = RegExp(r.slice(1, -1).replace(p, "\\$1"));
                else {
                  q = r.replace(n, "|").split(" ");
                  v = "";
                  e = q.length;
                  for (c = 0; c < e; ++c)
                    if (-1 != q[c].indexOf("|")) {
                      w = q[c].split("|");
                      y = [];
                      for (b = w.length - 1; 0 <= b; b--) "" != w[b] && y.push(w[b].replace(p, "\\$1"));
                      t = y.join("|").replace(s, "[^\\s]*");
                      v += "(?=.*\\b(" + t + ")\\b)"
                    } else t = q[c].replace(p, "\\$1").replace(s, "[^\\s]*"), v += "(?=.*\\b" + t + "\\b)";
                  v = RegExp("^" + v, "i")
                }
                H[d] = {
                  type: z,
                  pattern: v,
                  boards: a.boards,
                  fid: d,
                  hidden: a.hidden,
                  color: a.color,
                  top: a.top,
                  hits: 0
                }
              }
          } catch (x) {
            alert("There was an error processing one of the filters: " + x + " in: " + a.pattern)
          }
        }
      }
    }

    function Ja() {
      var a, b, d, c, g, e;
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
      g = $.id("filters-msg");
      g.innerHTML = "Done";
      g.className = "msg-ok";
      g.style.display = "inline";
      setTimeout(function() {
        g.style.display = "none"
      }, 2E3);
      ra();
      q();
      qa()
    }

    function Ma() {
      $.id("filter-rgb-ok").style.backgroundColor = this.value
    }

    function pa(a, b) {
      var d, c, g;
      c = document.createElement("tr");
      c.id = "filter-" + b;
      d = document.createElement("td");
      g = document.createElement("span");
      g.setAttribute("data-up", b);
      g.className = "pointer";
      g.innerHTML = "&uarr;";
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      g = document.createElement("input");
      g.type = "checkbox";
      g.checked = !! a.active;
      g.className = "filter-active";
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      g = document.createElement("input");
      g.type = "text";
      g.value = a.pattern;
      g.className = "filter-pattern";
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      g = document.createElement("input");
      g.type = "text";
      g.value = a.boards;
      g.className = "filter-boards";
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      g = document.createElement("span");
      g.id = "filter-color-" + b;
      g.title = "Change Color";
      g.className = "button clickbox filter-color";
      a.color ? g.style.background = a.color : (g.setAttribute("data-nocolor", "1"), g.innerHTML = "&#x2215;");
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      g = document.createElement("input");
      g.type = "checkbox";
      g.checked = !! a.hidden;
      g.className = "filter-hide";
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      g = document.createElement("input");
      g.type = "checkbox";
      g.checked = !! a.top;
      g.className = "filter-top";
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      g = document.createElement("span");
      g.setAttribute("data-target", b);
      g.className = "pointer";
      g.innerHTML = "&times;";
      d.appendChild(g);
      c.appendChild(d);
      d = document.createElement("td");
      d.id = "fhc-" + b;
      d.className = "filter-hits";
      c.appendChild(d);
      return c
    }

    function ca(a) {
      var b = $.id("filter-color-" + x.getAttribute("data-target"));
      !0 === a ? (b.setAttribute("data-nocolor", "1"), b.innerHTML = "&#x2215;", b.style.background = "") : (b.removeAttribute("data-nocolor"), b.innerHTML = "", b.style.background = this.style.backgroundColor);
      P()
    }

    function La() {
      ca(!0)
    }

    function Ia() {
      var a, b, d, c = $.id("filter-list").children;
      if (c.length) {
        for (a = d = 0; b = c[a]; ++a) b = +b.id.slice(7), b > d && (d = b);
        return d + 1
      }
      return 0
    }

    function ba(a, b, d) {
      b = "data-" + b;
      "0" == a.getAttribute(b) ? (a.setAttribute(b, "1"), $.addClass(a, "active"), a.innerHTML = "&#x2714;", d && (a = $.cls("filter-" + d, a.parentNode.parentNode)[0], a.setAttribute("data-" + d, "0"), $.removeClass(a, "active"), a.innerHTML = "")) : (a.setAttribute(b, "0"), $.removeClass(a, "active"), a.innerHTML = "")
    }

    function qa() {
      var a, b, d = $.id("filter-list").children;
      for (a = 0; b = d[a]; ++a) $.id("fhc-" + b.id.slice(7)).innerHTML = H[a] ? "x" + H[a].hits : ""
    }

    function Z(a) {
      return $.hasClass(a, "hidden")
    }

    function da() {
      var a, b;
      UA.hasWebStorage ? (sa && (localStorage.setItem("catalog-init", "1"), (b = $.id("first-run")) && b.parentNode.removeChild(b)), a = $.id("theme"), theme = (theme = localStorage.getItem("catalog-theme")) ? JSON.parse(theme) : {}, $.id("theme-nobinds").checked = !! theme.nobinds, $.id("theme-nospoiler").checked = !! theme.nospoiler, $.id("theme-newtab").checked = !! theme.newtab, $.id("theme-tw").checked = M, theme.css && ($.id("theme-css").value = theme.css), $.on($.id("theme-save"), "click", ta), $.on($.id("theme-close"), "click", O), $.id("theme-msg").style.display = "none", a.style.top = window.pageYOffset + 60 + "px", $.removeClass(a, "hidden"), (b = $.tag("input", a)[0]) && b.focus(), Q()) : alert("Your browser doesn't support Local Storage")
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
      if (a.nobinds) w.nobinds != a.nobinds && $.off(document, "keyup", V);
      else if (w.nobinds != a.nobinds) $.on(document, "keyup", V);
      b || R.applyCSS(a)
    }

    function ta() {
      var a, b, d, c = {};
      $.id("theme-nobinds").checked && (c.nobinds = !0);
      $.id("theme-nospoiler").checked && (c.nospoiler = !0);
      $.id("theme-newtab").checked && (c.newtab = !0);
      b = $.id("theme-tw").checked;
      b != M && (M = b, d = (d = localStorage.getItem("4chan-settings")) ? JSON.parse(d) : {}, d.threadWatcher = b, localStorage.setItem("4chan-settings", JSON.stringify(d)), b ? ThreadWatcher.init() : ThreadWatcher.unInit());
      "" != (b = $.id("theme-css").value) && (c.css = b);
      ua(c);
      localStorage.removeItem("catalog-theme");
      for (a in c) {
        localStorage.setItem("catalog-theme", JSON.stringify(c));
        break
      }
      w = c;
      q();
      O()
    }

    function va(a) {
      var b, d, c = !1,
        g = m.order.date[0];
      if (d = localStorage.getItem(a)) {
        d = JSON.parse(d);
        for (b in d)!m.threads[b] && b < g && (delete d[b], c = !0);
        for (b in d) return c && localStorage.setItem(a, JSON.stringify(d)), d;
        localStorage.removeItem(a)
      }
      return {}
    }

    function ea() {
      var a, b, d;
      if (UA.hasWebStorage) {
        d = {};
        for (a = wa.length -
          1; 0 <= a; a--) b = wa[a], d[b] = n[b];
        localStorage.setItem("catalog-settings", JSON.stringify(d))
      }
    }

    function xa(a, b) {
      var d = "";
      a ? ($teaserCtrl.selectedIndex = 1, d = "extended-", n.extended = !0) : ($teaserCtrl.selectedIndex = 0, n.extended = !1);
      d = n.large ? d + "large" : d + "small";
      u.className = d;
      b || ea()
    }

    function ya(a, b) {
      var d = n.extended ? "extended-" : "";
      a ? (D.selectedIndex = 1, d += "large", n.large = !0) : (D.selectedIndex = 0, d += "small", n.large = !1);
      u.className = d;
      b || (ea(), q())
    }

    function E(a, b) {
      var d = {
        alt: 0,
        absdate: 1,
        date: 2,
        r: 3
      };
      void 0 !== d[a] ? (A.selectedIndex = d[a], n.orderby = a) : (A.selectedIndex = 0, n.orderby = "date");
      b || (ea(), q())
    }

    function Na() {
      xa("on" == $teaserCtrl.options[$teaserCtrl.selectedIndex].value)
    }

    function Oa() {
      E(A.options[A.selectedIndex].value)
    }

    function Pa() {
      ya("large" == D.options[D.selectedIndex].value)
    }

    function q() {
      var a, b, d, c, g, e, h, k, p, s, q, x, C = 0,
        r = "",
        v = 0,
        D, E, z, A = "",
        K, B, F, I, G;
      if (0 != m.count) {
        x = m.custom_spoiler ? n.imgspoiler + "-" + m.slug + m.custom_spoiler + ".png" : n.imgspoiler + ".png";
        u.hasChildNodes() && ((a = document.getElementById("th-tip")) && document.body.removeChild(a), u.textContent = "");
        q = "//boards.4chan.org/" + m.slug + "/res/";
        D = ".t.4cdn.org/" + m.slug + "/thumb/";
        y = 0;
        for (c in H) H[c].hits = 0;
        G = !n.large;
        E = w.newtab ? 'target="_blank" ' : "";
        a = 0;
        a: for (; a < m.count; ++a) {
          g = m.order[n.orderby][a];
          e = m.threads[g];
          k = p = s = !1;
          e.sub ? (z = "<b>" + e.sub + "</b>", e.teaser && (z += ": " + e.teaser)) : z = e.teaser;
          if (W) {
            if (!J[g]) continue;
            ++y
          } else if (!L) {
            if (J[g]) {
              ++y;
              continue
            }
            if (0 <= t[g]) s = p = !0;
            else
              for (c in d = e.capcode ? (e.trip || "") + "!#" + e.capcode : e.trip, H)
                if (h = H[c], 0 == h.type && h.pattern.test(z) || 1 == h.type && h.pattern.test(d) || 2 == h.type && h.pattern.test(e.author)) {
                  if (h.hidden) {
                    ++C;
                    h.hits += 1;
                    continue a
                  }
                  k = h;
                  p = !! h.top;
                  h.hits += 1;
                  break
                }
          } else if (!L.test(z)) continue;
          v = 0 === v ? 1 : 0;
          h = '<div id="thread-' + g + '" class="thread">';
          M && (d = g + "-" + m.slug, h += '<span id="leaf-' + g + '" data-watch="' + g + '" ' + (ThreadWatcher.watched[d] ? 'title="Unwatch" class="unwatchIcon"></span>' : 'title="Watch" class="watchIcon"></span>'));
          h += "<a " + E + 'href="' + q + g + '"><img alt="" id="thumb-' + g + '" class="thumb';
          d = k.color ? ' hl" style="border-color: ' + k.color : s ? " pinned" : "";
          e.imgurl ? e.imgspoiler && !w.nospoiler ? h += d + '" src="' + x : (F = e.tn_w, I = e.tn_h, G && (B = n.smallsize, F > B && (K = B / F, F = B, I *= K), I > B && (K = B / I, I = B, F *= K)), h += d + '" width="' + F + '" height="' + I + '" src="//' + v + D + e.imgurl + "s.jpg") : h = e.imgdel ? h + (" imgdel" + d + '" src="' + n.imgdel) : h + (" nofile" + d + '" src="' + n.nofile);
          h += '" data-id="' + g + '" /></a>';
          if (e.sticky || e.closed || e.capcodereps) {
            h += '<div class="threadIcons">';
            e.sticky && (h += '<span title="Sticky" class="threadIcon stickyIcon"></span>');
            e.closed && (h += '<span title="Closed" class="threadIcon closedIcon"></span>');
            if (e.capcodereps)
              for (K = e.capcodereps.split(","), d = 0; B = K[d]; ++d)
                if (F = Qa[B]) h += '<span title="' + F + ' Replies" class="threadIcon ' + B + 'Icon"></span>';
            h += "</div>"
          }
          h += '<div title="(R)eplies / (I)mages' + (p ? " / (P)age" : "") + '" id="meta-' + g + '" class="meta">';
          e.r && (h = e.bumplimit ? h + ("<i>R: <b>" + e.r + "</b></i>") : h + ("R: <b>" + e.r + "</b>"), s && (s = e.r - t[g], 0 < s ? (h += " (+" + s + ")", t[g] = e.r) : h += "(+0)"), e.i && (h = e.imagelimit ? h + (" / <i>I: <b>" + e.i + "</b></i>") : h + (" / I: <b>" + e.i + "</b>")));
          p && 0 <= (page = 0 | m.order.alt.indexOf(g) / m.pagesize) && (e.r && (h += " / "), h += "P: <b>" + page + "</b>");
          h += "</div>";
          z && (h += '<div class="teaser', k.color && (h += ' style="color:' + k.color), h += '">' + z + "</div>");
          p ? A += h + "</div>" : r += h + "</div>"
        }
        r = L && "" == r ? '<div class="error">Nothing Found</div>' : A ? A + r + '<div class="clear"></div>' : r + '<div class="clear"></div>';
        for (b in t) {
          localStorage.setItem("4chan-pin-" + m.slug, JSON.stringify(t));
          break
        }
        u.innerHTML = r;
        X("filtered", C);
        X("hidden", y)
      }
    }

    function Ra(a) {
      a = a.target;
      $.hasClass(a, "thumb") && (clearTimeout(fa), S && za(), fa = setTimeout(Sa, n.tipdelay, a))
    }

    function Ta(a) {
      clearTimeout(fa);
      S && za()
    }

    function Sa(a) {
      var b, d, c, e;
      b = Date.now() / 1E3;
      e = a.getBoundingClientRect();
      c = document.documentElement.offsetWidth;
      thread = m.threads[a.getAttribute("data-id")];
      d = thread.sub ? '<span class="post-subject">' + thread.sub + "</span>" : "Posted";
      d += ' by <span class="' + (thread.capcode ? thread.capcode + "-capcode " : "") + 'post-author">' + (thread.author || m.anon);
      thread.trip && (d += ' <span class="post-tripcode">' + thread.trip + "</span>");
      thread.capcode && (d += " ## " + thread.capcode.charAt(0).toUpperCase() +
        thread.capcode.slice(1));
      d += "</span> ";
      m.flags && thread.country && (d += '<div class="flag flag-' + thread.country.toLowerCase() + '"></div> ');
      d += '<span class="post-ago">' + Aa(b - thread.date) + " ago</span>";
      !n.extended && thread.teaser && (d += '<p class="post-teaser">' + thread.teaser + "</p>");
      0 < thread.r && (d += '<div class="post-last">Last reply by <span class="' + (thread.lr.capcode ? thread.lr.capcode + "-capcode " : "") + 'post-author">' + thread.lr.author, thread.lr.trip && (d += ' <span class="post-tripcode">' + thread.lr.trip + "</span>"), thread.lr.capcode && (d += " ## " + thread.lr.capcode.charAt(0).toUpperCase() + thread.lr.capcode.slice(1)), d += '</span> <span class="post-ago">' + Aa(b - thread.lr.date) + " ago</span>");
      b = document.createElement("div");
      b.id = "post-preview";
      b.innerHTML = d;
      document.body.appendChild(b);
      d = b.style;
      c - e.right < (0 | 0.3 * c) ? (c -= e.left, d.right = c + 5 + "px") : (c = e.left + e.width, d.left = c + 5 + "px");
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
      }, Qa = {
        admin: "Administrator",
        mod: "Moderator",
        developer: "Developer",
        manager: "Manager"
      }, ma = {
        83: function() {
          $.hasClass(C, "active") ? U(!0) : G()
        },
        82: p,
        88: function() {
          "date" == n.orderby ? E("alt") : "alt" == n.orderby ? E("r") : "r" == n.orderby ? E("absdate") : E("date")
        }
      }, m = {}, wa = ["orderby", "large", "extended"],
      w = {}, ha, T, H = {}, S = !1,
      fa = null,
      t = {}, J = {}, y = 0,
      M = !1,
      L = !1,
      W = !1,
      sa = !1,
      u, C, D, A, x, la;
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
    R.init = function() {
      var a, l, d;
      buildMobileNav();
      ua(w, !0);
      u = $.id("threads");
      C = $.id("qf-ctrl");
      $teaserCtrl = $.id("teaser-ctrl");
      D = $.id("size-ctrl");
      A = $.id("order-ctrl");
      $filtersPanel = $.id("filters");
      $themePanel = $.id("theme");
      $.on(C, "click", G);
      $.on($.id("filters-clear-hidden"), "click", na);
      $.on($.id("filters-clear-hidden-bottom"), "click", na);
      $.on($.id("qf-clear"), "click", G);
      $.on($.id("settingsWindowLink"), "click", da);
      $.on($.id("settingsWindowLinkBot"), "click", da);
      $.on($.id("settingsWindowLinkMobile"), "click", da);
      $.on($.id("filters-ctrl"), "click", Ka);
      $.on($teaserCtrl, "change", Na);
      $.on(D, "change", Pa);
      $.on(A, "change", Oa);
      $.on(u, "mouseover", Ra);
      $.on(u, "mouseout", Ta);
      $.on($.id("togglePostFormLink"), "click", e);
      $.on(document, "click", Fa);
      $.on(window, "load", checkForBlock);
      var k;
      UA.hasWebStorage && (k = localStorage.getItem("catalog-settings")) && $.extend(n, JSON.parse(k));
      Ba();
      var g, m;
      if (UA.hasWebStorage && (a = $.id("globalMessage")) && a.textContent && (a.nextElementSibling.style.clear = "both", k = document.createElement("span"), k.id = "toggleMsgBtn", k.setAttribute("data-cmd", "toggleMsg"), k.title = "Toggle announcement", m = localStorage.getItem("4chan-global-msg"), g = a.getAttribute("data-utc"), m && g <= m ? (a.style.display = "none", k.style.opacity = "0.5", k.className = "expandIcon") : k.className = "collapseIcon", $.on(k, "click", b), a.parentNode.insertBefore(k, a), k = $.id("globalToggle"), 0 < k.offsetWidth)) $.on(k, "click", c);
      UA.hasContextMenu && (la = {
        pin: ja,
        hide: ka,
        report: Ca
      }, $.id("ctxmenu-main").innerHTML = '<menuitem label="Unpin all threads"></menuitem>', $.id("ctxmenu-thread").innerHTML = '<menuitem label="Pin/Unpin" data-cmd="pin"></menuitem><menuitem label="Hide/Unhide" data-cmd="hide"></menuitem><menuitem label="Report" data-cmd="report"></menuitem>', $.on($.id("ctxmenu-main"), "click", Ea), $.on($.id("ctxmenu-thread"), "click", Da));
      UA.hasWebStorage && (!localStorage.getItem("catalog-init") && (sa = !0, a = $.id("settingsWindowLink")) && (k = document.createElement("div"), k.id = "first-run", k.textContent = "Change your settings", a.parentNode.appendChild(k)), localStorage.getItem("catalog-visited") || localStorage.setItem("catalog-visited", "1"), a = localStorage.getItem("4chan-settings")) && (a = JSON.parse(a), !a.disableAll && a.threadWatcher && (M = !0, ThreadWatcher.init()), a.customMenu && CustomMenu.apply(a.customMenuList));
      window.passEnabled && setPassMsg();
      (l = document.forms.post.flag) && (d = $.readCookie("4chan_flag")) && (l = l.querySelector('option[value="' + d + '"]')) && l.setAttribute("selected", "selected");
      E(n.orderby, !0);
      ya(n.large, !0);
      xa(n.extended, !0)
    };
    R.loadCatalog = function(b) {
      var c;
      m = b;
      a();
      var d, e, g;
      d = $.id("styleSelector");
      e = d.children;
      for (b = 0; g = e[b]; ++b) g.value == T && (d.selectedIndex = b);
      $.on(d, "change", s);
      ra();
      UA.hasWebStorage && (J = va("4chan-hide-t-" + m.slug), t = va("4chan-pin-" + m.slug));
      UA.hasSessionStorage && !location.hash && (c = sessionStorage.getItem("4chan-catalog-search")) ? m.slug != sessionStorage.getItem("4chan-catalog-search-board") && (sessionStorage.removeItem("4chan-catalog-search"), sessionStorage.removeItem("4chan-catalog-search-board"), c = null) : location.hash && (c = location.hash.match(/#s=(.+)/)) && (c = decodeURIComponent(c[1].replace(/\+/g, " ")));
      c ? (G(), $.id("qf-box").value = c, ia()) : q()
    };
    R.applyCSS = function(a, b, d) {
      var c, e;
      a || (a = w);
      void 0 !== b && ((e = $.readCookie(b)) || (e = "nws_style" == b ? "Yotsuba New" : "Yotsuba B New"), ha = b, T = e, c = document.createElement("link"), c.type = "text/css", c.id = "base-css", c.rel = "stylesheet", c.setAttribute("href", "//s.4cdn.org/css/catalog_" + e.toLowerCase().replace(/ /g, "_") + "." + d + ".css"), document.head.insertBefore(c, $.id("mobile-css")));
      (c = $.id("custom-css")) && document.head.removeChild(c);
      a.css && (c = document.createElement("style"), c.type = "text/css", c.id = "custom-css", c.styleSheet ? c.styleSheet.cssText = a.css : c.innerHTML = a.css, document.head.appendChild(c));
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
      c = $.id("watch-" + a);
      if (-1 == ThreadWatcher.watched[a][1]) {
        if (delete ThreadWatcher.watched[a], c.parentNode.removeChild(c), b) ThreadWatcher.onRefreshEnd(b)
      } else c = a.split("-"), e = new XMLHttpRequest, e.onload = function() {
        var c, e, p, N;
        if (200 == this.status) {
          p = ThreadWatcher.parseThreadJSON(this.responseText);
          N = ThreadWatcher.watched[a][1];
          e = 0;
          for (c = p.length - 1; 1 <= c && !(p[c].no <= N); c--)++e;
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

function buildMobileNav() {
  var a, b, c, e;
  e = "";
  if (el = document.getElementById("boardSelectMobile")) {
    a = document.querySelectorAll("#boardNavDesktop .boardList > a");
    for (b = 0; c = a[b]; ++b) e += '<option value="' + c.textContent + '">/' + c.textContent + "/ - " + c.title + "</option>";
    el.innerHTML = e
  }
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
  (function(a, b, c, e, k, s, p) {
    a.GoogleAnalyticsObject = k;
    a[k] = a[k] || function() {
      (a[k].q = a[k].q || []).push(arguments)
    };
    a[k].l = 1 * new Date;
    s = b.createElement(c);
    p = b.getElementsByTagName(c)[0];
    s.async = 1;
    s.src = e;
    p.parentNode.insertBefore(s, p)
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

function checkForBlock() {
  var a, b, c, e;
  if (!/Mobile|Android|Dolfin|Opera Mobi|PlayStation Vita|Nintendo DS/.test(navigator.userAgent) && 1 != $.readCookie("pass_enabled"))
    for (e = document.getElementsByClassName("ad-cnt"), a = 0; b = e[a]; ++a) 0 == b.offsetHeight && (c = document.createElement("div"), c.className = "center", c.innerHTML = blockPlea, b.parentNode.insertBefore(c, b))
};
