/*! For license information please see site.js.LICENSE.txt */
!(function () {
  var e = {
      695: function (e, t, n) {
        e.exports = (function (e, t) {
          "use strict";
          function n(e) {
            return e && "object" == typeof e && "default" in e ? e : { default: e };
          }
          var r = n(e),
            s = n(t);
          const o = "transitionend",
            i = (e) => (((e) => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType))(e) ? (e.jquery ? e[0] : e) : "string" == typeof e && e.length > 0 ? document.querySelector(e) : null),
            l = (e) => {
              "function" == typeof e && e();
            },
            a = (e, t, n = !0) => {
              if (!n) return void l(e);
              const r =
                ((e) => {
                  if (!e) return 0;
                  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
                  const r = Number.parseFloat(t),
                    s = Number.parseFloat(n);
                  return r || s ? ((t = t.split(",")[0]), (n = n.split(",")[0]), 1e3 * (Number.parseFloat(t) + Number.parseFloat(n))) : 0;
                })(t) + 5;
              let s = !1;
              const i = ({ target: n }) => {
                n === t && ((s = !0), t.removeEventListener(o, i), l(e));
              };
              t.addEventListener(o, i),
                setTimeout(() => {
                  s || t.dispatchEvent(new Event(o));
                }, r);
            };
          return class {
            constructor(e) {
              (e = i(e)) && ((this._element = e), r.default.set(this._element, this.constructor.DATA_KEY, this));
            }
            dispose() {
              r.default.remove(this._element, this.constructor.DATA_KEY),
                s.default.off(this._element, this.constructor.EVENT_KEY),
                Object.getOwnPropertyNames(this).forEach((e) => {
                  this[e] = null;
                });
            }
            _queueCallback(e, t, n = !0) {
              a(e, t, n);
            }
            static getInstance(e) {
              return r.default.get(i(e), this.DATA_KEY);
            }
            static getOrCreateInstance(e, t = {}) {
              return this.getInstance(e) || new this(e, "object" == typeof t ? t : null);
            }
            static get VERSION() {
              return "5.1.1";
            }
            static get NAME() {
              throw new Error('You have to implement the static method "NAME", for each component!');
            }
            static get DATA_KEY() {
              return `bs.${this.NAME}`;
            }
            static get EVENT_KEY() {
              return `.${this.DATA_KEY}`;
            }
          };
        })(n(493), n(286));
      },
      863: function (e, t, n) {
        e.exports = (function (e, t, n, r, s) {
          "use strict";
          function o(e) {
            return e && "object" == typeof e && "default" in e ? e : { default: e };
          }
          var i = o(e),
            l = o(t),
            a = o(n),
            c = o(r),
            u = o(s);
          const d = (e) => {
              let t = e.getAttribute("data-bs-target");
              if (!t || "#" === t) {
                let n = e.getAttribute("href");
                if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
                n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), (t = n && "#" !== n ? n.trim() : null);
              }
              return t;
            },
            f = (e) => {
              const t = d(e);
              return t && document.querySelector(t) ? t : null;
            },
            h = (e) => {
              const t = d(e);
              return t ? document.querySelector(t) : null;
            },
            g = (e) => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
            p = [],
            m = "collapse",
            _ = "bs.collapse",
            b = { toggle: !0, parent: null },
            y = { toggle: "boolean", parent: "(null|element)" },
            v = "show",
            E = "collapse",
            A = "collapsing",
            w = "collapsed",
            C = '[data-bs-toggle="collapse"]';
          class T extends u.default {
            constructor(e, t) {
              super(e), (this._isTransitioning = !1), (this._config = this._getConfig(t)), (this._triggerArray = []);
              const n = c.default.find(C);
              for (let e = 0, t = n.length; e < t; e++) {
                const t = n[e],
                  r = f(t),
                  s = c.default.find(r).filter((e) => e === this._element);
                null !== r && s.length && ((this._selector = r), this._triggerArray.push(t));
              }
              this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
            }
            static get Default() {
              return b;
            }
            static get NAME() {
              return m;
            }
            toggle() {
              this._isShown() ? this.hide() : this.show();
            }
            show() {
              if (this._isTransitioning || this._isShown()) return;
              let e,
                t = [];
              if (this._config.parent) {
                const e = c.default.find(".collapse .collapse", this._config.parent);
                t = c.default.find(".collapse.show, .collapse.collapsing", this._config.parent).filter((t) => !e.includes(t));
              }
              const n = c.default.findOne(this._selector);
              if (t.length) {
                const r = t.find((e) => n !== e);
                if (((e = r ? T.getInstance(r) : null), e && e._isTransitioning)) return;
              }
              if (l.default.trigger(this._element, "show.bs.collapse").defaultPrevented) return;
              t.forEach((t) => {
                n !== t && T.getOrCreateInstance(t, { toggle: !1 }).hide(), e || i.default.set(t, _, null);
              });
              const r = this._getDimension();
              this._element.classList.remove(E), this._element.classList.add(A), (this._element.style[r] = 0), this._addAriaAndCollapsedClass(this._triggerArray, !0), (this._isTransitioning = !0);
              const s = `scroll${r[0].toUpperCase() + r.slice(1)}`;
              this._queueCallback(
                () => {
                  (this._isTransitioning = !1), this._element.classList.remove(A), this._element.classList.add(E, v), (this._element.style[r] = ""), l.default.trigger(this._element, "shown.bs.collapse");
                },
                this._element,
                !0
              ),
                (this._element.style[r] = `${this._element[s]}px`);
            }
            hide() {
              if (this._isTransitioning || !this._isShown()) return;
              if (l.default.trigger(this._element, "hide.bs.collapse").defaultPrevented) return;
              const e = this._getDimension();
              (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`), this._element.offsetHeight, this._element.classList.add(A), this._element.classList.remove(E, v);
              const t = this._triggerArray.length;
              for (let e = 0; e < t; e++) {
                const t = this._triggerArray[e],
                  n = h(t);
                n && !this._isShown(n) && this._addAriaAndCollapsedClass([t], !1);
              }
              this._isTransitioning = !0;
              (this._element.style[e] = ""),
                this._queueCallback(
                  () => {
                    (this._isTransitioning = !1), this._element.classList.remove(A), this._element.classList.add(E), l.default.trigger(this._element, "hidden.bs.collapse");
                  },
                  this._element,
                  !0
                );
            }
            _isShown(e = this._element) {
              return e.classList.contains(v);
            }
            _getConfig(e) {
              return (
                ((e = { ...b, ...a.default.getDataAttributes(this._element), ...e }).toggle = Boolean(e.toggle)),
                (e.parent = ((t = e.parent), g(t) ? (t.jquery ? t[0] : t) : "string" == typeof t && t.length > 0 ? document.querySelector(t) : null)),
                ((e, t, n) => {
                  Object.keys(n).forEach((r) => {
                    const s = n[r],
                      o = t[r],
                      i =
                        o && g(o)
                          ? "element"
                          : null == (l = o)
                          ? `${l}`
                          : {}.toString
                              .call(l)
                              .match(/\s([a-z]+)/i)[1]
                              .toLowerCase();
                    var l;
                    if (!new RegExp(s).test(i)) throw new TypeError(`${e.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${s}".`);
                  });
                })(m, e, y),
                e
              );
              var t;
            }
            _getDimension() {
              return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
            }
            _initializeChildren() {
              if (!this._config.parent) return;
              const e = c.default.find(".collapse .collapse", this._config.parent);
              c.default
                .find(C, this._config.parent)
                .filter((t) => !e.includes(t))
                .forEach((e) => {
                  const t = h(e);
                  t && this._addAriaAndCollapsedClass([e], this._isShown(t));
                });
            }
            _addAriaAndCollapsedClass(e, t) {
              e.length &&
                e.forEach((e) => {
                  t ? e.classList.remove(w) : e.classList.add(w), e.setAttribute("aria-expanded", t);
                });
            }
            static jQueryInterface(e) {
              return this.each(function () {
                const t = {};
                "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1);
                const n = T.getOrCreateInstance(this, t);
                if ("string" == typeof e) {
                  if (void 0 === n[e]) throw new TypeError(`No method named "${e}"`);
                  n[e]();
                }
              });
            }
          }
          return (
            l.default.on(document, "click.bs.collapse.data-api", C, function (e) {
              ("A" === e.target.tagName || (e.delegateTarget && "A" === e.delegateTarget.tagName)) && e.preventDefault();
              const t = f(this);
              c.default.find(t).forEach((e) => {
                T.getOrCreateInstance(e, { toggle: !1 }).toggle();
              });
            }),
            (O = T),
            (S = () => {
              const e = (() => {
                const { jQuery: e } = window;
                return e && !document.body.hasAttribute("data-bs-no-jquery") ? e : null;
              })();
              if (e) {
                const t = O.NAME,
                  n = e.fn[t];
                (e.fn[t] = O.jQueryInterface), (e.fn[t].Constructor = O), (e.fn[t].noConflict = () => ((e.fn[t] = n), O.jQueryInterface));
              }
            }),
            "loading" === document.readyState
              ? (p.length ||
                  document.addEventListener("DOMContentLoaded", () => {
                    p.forEach((e) => e());
                  }),
                p.push(S))
              : S(),
            T
          );
          var O, S;
        })(n(493), n(286), n(175), n(737), n(695));
      },
      493: function (e) {
        e.exports = (function () {
          "use strict";
          const e = new Map();
          return {
            set(t, n, r) {
              e.has(t) || e.set(t, new Map());
              const s = e.get(t);
              s.has(n) || 0 === s.size ? s.set(n, r) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);
            },
            get: (t, n) => (e.has(t) && e.get(t).get(n)) || null,
            remove(t, n) {
              if (!e.has(t)) return;
              const r = e.get(t);
              r.delete(n), 0 === r.size && e.delete(t);
            },
          };
        })();
      },
      286: function (e) {
        e.exports = (function () {
          "use strict";
          const e = /[^.]*(?=\..*)\.|.*/,
            t = /\..*/,
            n = /::\d+$/,
            r = {};
          let s = 1;
          const o = { mouseenter: "mouseover", mouseleave: "mouseout" },
            i = /^(mouseenter|mouseleave)/i,
            l = new Set([
              "click",
              "dblclick",
              "mouseup",
              "mousedown",
              "contextmenu",
              "mousewheel",
              "DOMMouseScroll",
              "mouseover",
              "mouseout",
              "mousemove",
              "selectstart",
              "selectend",
              "keydown",
              "keypress",
              "keyup",
              "orientationchange",
              "touchstart",
              "touchmove",
              "touchend",
              "touchcancel",
              "pointerdown",
              "pointermove",
              "pointerup",
              "pointerleave",
              "pointercancel",
              "gesturestart",
              "gesturechange",
              "gestureend",
              "focus",
              "blur",
              "change",
              "reset",
              "select",
              "submit",
              "focusin",
              "focusout",
              "load",
              "unload",
              "beforeunload",
              "resize",
              "move",
              "DOMContentLoaded",
              "readystatechange",
              "error",
              "abort",
              "scroll",
            ]);
          function a(e, t) {
            return (t && `${t}::${s++}`) || e.uidEvent || s++;
          }
          function c(e) {
            const t = a(e);
            return (e.uidEvent = t), (r[t] = r[t] || {}), r[t];
          }
          function u(e, t, n = null) {
            const r = Object.keys(e);
            for (let s = 0, o = r.length; s < o; s++) {
              const o = e[r[s]];
              if (o.originalHandler === t && o.delegationSelector === n) return o;
            }
            return null;
          }
          function d(e, t, n) {
            const r = "string" == typeof t,
              s = r ? n : t;
            let o = g(e);
            return l.has(o) || (o = e), [r, s, o];
          }
          function f(t, n, r, s, o) {
            if ("string" != typeof n || !t) return;
            if ((r || ((r = s), (s = null)), i.test(n))) {
              const e = (e) =>
                function (t) {
                  if (!t.relatedTarget || (t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget))) return e.call(this, t);
                };
              s ? (s = e(s)) : (r = e(r));
            }
            const [l, f, h] = d(n, r, s),
              g = c(t),
              m = g[h] || (g[h] = {}),
              _ = u(m, f, l ? r : null);
            if (_) return void (_.oneOff = _.oneOff && o);
            const b = a(f, n.replace(e, "")),
              y = l
                ? (function (e, t, n) {
                    return function r(s) {
                      const o = e.querySelectorAll(t);
                      for (let { target: i } = s; i && i !== this; i = i.parentNode) for (let l = o.length; l--; ) if (o[l] === i) return (s.delegateTarget = i), r.oneOff && p.off(e, s.type, t, n), n.apply(i, [s]);
                      return null;
                    };
                  })(t, r, s)
                : (function (e, t) {
                    return function n(r) {
                      return (r.delegateTarget = e), n.oneOff && p.off(e, r.type, t), t.apply(e, [r]);
                    };
                  })(t, r);
            (y.delegationSelector = l ? r : null), (y.originalHandler = f), (y.oneOff = o), (y.uidEvent = b), (m[b] = y), t.addEventListener(h, y, l);
          }
          function h(e, t, n, r, s) {
            const o = u(t[n], r, s);
            o && (e.removeEventListener(n, o, Boolean(s)), delete t[n][o.uidEvent]);
          }
          function g(e) {
            return (e = e.replace(t, "")), o[e] || e;
          }
          const p = {
            on(e, t, n, r) {
              f(e, t, n, r, !1);
            },
            one(e, t, n, r) {
              f(e, t, n, r, !0);
            },
            off(e, t, r, s) {
              if ("string" != typeof t || !e) return;
              const [o, i, l] = d(t, r, s),
                a = l !== t,
                u = c(e),
                f = t.startsWith(".");
              if (void 0 !== i) {
                if (!u || !u[l]) return;
                return void h(e, u, l, i, o ? r : null);
              }
              f &&
                Object.keys(u).forEach((n) => {
                  !(function (e, t, n, r) {
                    const s = t[n] || {};
                    Object.keys(s).forEach((o) => {
                      if (o.includes(r)) {
                        const r = s[o];
                        h(e, t, n, r.originalHandler, r.delegationSelector);
                      }
                    });
                  })(e, u, n, t.slice(1));
                });
              const g = u[l] || {};
              Object.keys(g).forEach((r) => {
                const s = r.replace(n, "");
                if (!a || t.includes(s)) {
                  const t = g[r];
                  h(e, u, l, t.originalHandler, t.delegationSelector);
                }
              });
            },
            trigger(e, t, n) {
              if ("string" != typeof t || !e) return null;
              const r = (() => {
                  const { jQuery: e } = window;
                  return e && !document.body.hasAttribute("data-bs-no-jquery") ? e : null;
                })(),
                s = g(t),
                o = t !== s,
                i = l.has(s);
              let a,
                c = !0,
                u = !0,
                d = !1,
                f = null;
              return (
                o && r && ((a = r.Event(t, n)), r(e).trigger(a), (c = !a.isPropagationStopped()), (u = !a.isImmediatePropagationStopped()), (d = a.isDefaultPrevented())),
                i ? ((f = document.createEvent("HTMLEvents")), f.initEvent(s, c, !0)) : (f = new CustomEvent(t, { bubbles: c, cancelable: !0 })),
                void 0 !== n &&
                  Object.keys(n).forEach((e) => {
                    Object.defineProperty(f, e, { get: () => n[e] });
                  }),
                d && f.preventDefault(),
                u && e.dispatchEvent(f),
                f.defaultPrevented && void 0 !== a && a.preventDefault(),
                f
              );
            },
          };
          return p;
        })();
      },
      175: function (e) {
        e.exports = (function () {
          "use strict";
          function e(e) {
            return "true" === e || ("false" !== e && (e === Number(e).toString() ? Number(e) : "" === e || "null" === e ? null : e));
          }
          function t(e) {
            return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
          }
          return {
            setDataAttribute(e, n, r) {
              e.setAttribute(`data-bs-${t(n)}`, r);
            },
            removeDataAttribute(e, n) {
              e.removeAttribute(`data-bs-${t(n)}`);
            },
            getDataAttributes(t) {
              if (!t) return {};
              const n = {};
              return (
                Object.keys(t.dataset)
                  .filter((e) => e.startsWith("bs"))
                  .forEach((r) => {
                    let s = r.replace(/^bs/, "");
                    (s = s.charAt(0).toLowerCase() + s.slice(1, s.length)), (n[s] = e(t.dataset[r]));
                  }),
                n
              );
            },
            getDataAttribute: (n, r) => e(n.getAttribute(`data-bs-${t(r)}`)),
            offset(e) {
              const t = e.getBoundingClientRect();
              return { top: t.top + window.pageYOffset, left: t.left + window.pageXOffset };
            },
            position: (e) => ({ top: e.offsetTop, left: e.offsetLeft }),
          };
        })();
      },
      737: function (e) {
        e.exports = (function () {
          "use strict";
          return {
            find: (e, t = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
            findOne: (e, t = document.documentElement) => Element.prototype.querySelector.call(t, e),
            children: (e, t) => [].concat(...e.children).filter((e) => e.matches(t)),
            parents(e, t) {
              const n = [];
              let r = e.parentNode;
              for (; r && r.nodeType === Node.ELEMENT_NODE && 3 !== r.nodeType; ) r.matches(t) && n.push(r), (r = r.parentNode);
              return n;
            },
            prev(e, t) {
              let n = e.previousElementSibling;
              for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.previousElementSibling;
              }
              return [];
            },
            next(e, t) {
              let n = e.nextElementSibling;
              for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.nextElementSibling;
              }
              return [];
            },
            focusableChildren(e) {
              const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((e) => `${e}:not([tabindex^="-"])`).join(", ");
              return this.find(t, e).filter(
                (e) =>
                  !((e) => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")))(e) &&
                  ((e) => {
                    return (t = e), !(!t || "object" != typeof t || (void 0 !== t.jquery && (t = t[0]), void 0 === t.nodeType) || 0 === e.getClientRects().length || "visible" !== getComputedStyle(e).getPropertyValue("visibility"));
                    var t;
                  })(e)
              );
            },
          };
        })();
      },
    },
    t = {};
  function n(r) {
    var s = t[r];
    if (void 0 !== s) return s.exports;
    var o = (t[r] = { exports: {} });
    return e[r].call(o.exports, o, o.exports, n), o.exports;
  }
  (n.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    return n.d(t, { a: t }), t;
  }),
    (n.d = function (e, t) {
      for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (function () {
      "use strict";
      n(863);
    })();
})();
(function () {
  let navItems = document.querySelectorAll('.js-link');
  let menu = document.querySelector('.navbar-collapse');
  let toggle = document.querySelector('.navbar-toggler');

  function closeMenu() {
    for(let i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('click', () => {
        if(window.matchMedia('(max-width: 992px)').matches) {
          menu.classList.remove ("show");
          toggle.ariaExpanded = false;
        }
      });
    }
  }
  
  closeMenu();
})();
(function () {
  let navItems = document.querySelectorAll('.js-link');
  
  function initSmoothScrolling() {
    navItems.forEach(trigger => {
      trigger.onclick = function(e) {
        e.preventDefault();
        
        let hash = this.getAttribute('href');
        let target = document.querySelector(hash);
        let headerOffset = 0;
        if(window.matchMedia('(max-width: 992px)').matches) {
          headerOffset = 75;
        } else {
          headerOffset = 150;
        }
        let elementPosition = target.offsetTop;
        let offsetPosition = elementPosition - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
      });
      }
    });
  }
  
  initSmoothScrolling();
})();