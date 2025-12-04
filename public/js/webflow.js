/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
    var d_ = Object.create;
    var fn = Object.defineProperty;
    var p_ = Object.getOwnPropertyDescriptor;
    var g_ = Object.getOwnPropertyNames;
    var v_ = Object.getPrototypeOf,
        h_ = Object.prototype.hasOwnProperty;
    var ye = (e, t) => () => (e && (t = e((e = 0))), t);
    var l = (e, t) => () => (
            t || e((t = { exports: {} }).exports, t), t.exports
        ),
        Ve = (e, t) => {
            for (var r in t) fn(e, r, { get: t[r], enumerable: !0 });
        },
        Vs = (e, t, r, n) => {
            if ((t && typeof t == "object") || typeof t == "function")
                for (let i of g_(t))
                    !h_.call(e, i) &&
                        i !== r &&
                        fn(e, i, {
                            get: () => t[i],
                            enumerable: !(n = p_(t, i)) || n.enumerable,
                        });
            return e;
        };
    var pe = (e, t, r) => (
            (r = e != null ? d_(v_(e)) : {}),
            Vs(
                t || !e || !e.__esModule
                    ? fn(r, "default", { value: e, enumerable: !0 })
                    : r,
                e
            )
        ),
        it = (e) => Vs(fn({}, "__esModule", { value: !0 }), e);
    var Us = l(() => {
        "use strict";
        (function () {
            if (typeof window > "u") return;
            let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
                t = e ? parseInt(e[1], 10) >= 16 : !1;
            if ("objectFit" in document.documentElement.style && !t) {
                window.objectFitPolyfill = function () {
                    return !1;
                };
                return;
            }
            let n = function (a) {
                    let u = window.getComputedStyle(a, null),
                        f = u.getPropertyValue("position"),
                        E = u.getPropertyValue("overflow"),
                        d = u.getPropertyValue("display");
                    (!f || f === "static") && (a.style.position = "relative"),
                        E !== "hidden" && (a.style.overflow = "hidden"),
                        (!d || d === "inline") && (a.style.display = "block"),
                        a.clientHeight === 0 && (a.style.height = "100%"),
                        a.className.indexOf("object-fit-polyfill") === -1 &&
                            (a.className += " object-fit-polyfill");
                },
                i = function (a) {
                    let u = window.getComputedStyle(a, null),
                        f = {
                            "max-width": "none",
                            "max-height": "none",
                            "min-width": "0px",
                            "min-height": "0px",
                            top: "auto",
                            right: "auto",
                            bottom: "auto",
                            left: "auto",
                            "margin-top": "0px",
                            "margin-right": "0px",
                            "margin-bottom": "0px",
                            "margin-left": "0px",
                        };
                    for (let E in f)
                        u.getPropertyValue(E) !== f[E] && (a.style[E] = f[E]);
                },
                o = function (a) {
                    let u = a.parentNode;
                    n(u),
                        i(a),
                        (a.style.position = "absolute"),
                        (a.style.height = "100%"),
                        (a.style.width = "auto"),
                        a.clientWidth > u.clientWidth
                            ? ((a.style.top = "0"),
                              (a.style.marginTop = "0"),
                              (a.style.left = "50%"),
                              (a.style.marginLeft = a.clientWidth / -2 + "px"))
                            : ((a.style.width = "100%"),
                              (a.style.height = "auto"),
                              (a.style.left = "0"),
                              (a.style.marginLeft = "0"),
                              (a.style.top = "50%"),
                              (a.style.marginTop = a.clientHeight / -2 + "px"));
                },
                s = function (a) {
                    if (typeof a > "u" || a instanceof Event)
                        a = document.querySelectorAll("[data-object-fit]");
                    else if (a && a.nodeName) a = [a];
                    else if (typeof a == "object" && a.length && a[0].nodeName)
                        a = a;
                    else return !1;
                    for (let u = 0; u < a.length; u++) {
                        if (!a[u].nodeName) continue;
                        let f = a[u].nodeName.toLowerCase();
                        if (f === "img") {
                            if (t) continue;
                            a[u].complete
                                ? o(a[u])
                                : a[u].addEventListener("load", function () {
                                      o(this);
                                  });
                        } else
                            f === "video"
                                ? a[u].readyState > 0
                                    ? o(a[u])
                                    : a[u].addEventListener(
                                          "loadedmetadata",
                                          function () {
                                              o(this);
                                          }
                                      )
                                : o(a[u]);
                    }
                    return !0;
                };
            document.readyState === "loading"
                ? document.addEventListener("DOMContentLoaded", s)
                : s(),
                window.addEventListener("resize", s),
                (window.objectFitPolyfill = s);
        })();
    });
    var Ws = l(() => {
        "use strict";
        (function () {
            if (typeof window > "u") return;
            function e(n) {
                Webflow.env("design") ||
                    ($("video").each(function () {
                        n && $(this).prop("autoplay")
                            ? this.play()
                            : this.pause();
                    }),
                    $(".w-background-video--control").each(function () {
                        n ? r($(this)) : t($(this));
                    }));
            }
            function t(n) {
                n.find("> span").each(function (i) {
                    $(this).prop("hidden", () => i === 0);
                });
            }
            function r(n) {
                n.find("> span").each(function (i) {
                    $(this).prop("hidden", () => i === 1);
                });
            }
            $(document).ready(() => {
                let n = window.matchMedia("(prefers-reduced-motion: reduce)");
                n.addEventListener("change", (i) => {
                    e(!i.matches);
                }),
                    n.matches && e(!1),
                    $("video:not([autoplay])").each(function () {
                        $(this)
                            .parent()
                            .find(".w-background-video--control")
                            .each(function () {
                                t($(this));
                            });
                    }),
                    $(document).on(
                        "click",
                        ".w-background-video--control",
                        function (i) {
                            if (Webflow.env("design")) return;
                            let o = $(i.currentTarget),
                                s = $(`video#${o.attr("aria-controls")}`).get(
                                    0
                                );
                            if (s)
                                if (s.paused) {
                                    let a = s.play();
                                    r(o),
                                        a &&
                                            typeof a.catch == "function" &&
                                            a.catch(() => {
                                                t(o);
                                            });
                                } else s.pause(), t(o);
                        }
                    );
            });
        })();
    });
    var Di = l(() => {
        "use strict";
        window.tram = (function (e) {
            function t(p, x) {
                var C = new g.Bare();
                return C.init(p, x);
            }
            function r(p) {
                return p.replace(/[A-Z]/g, function (x) {
                    return "-" + x.toLowerCase();
                });
            }
            function n(p) {
                var x = parseInt(p.slice(1), 16),
                    C = (x >> 16) & 255,
                    M = (x >> 8) & 255,
                    S = 255 & x;
                return [C, M, S];
            }
            function i(p, x, C) {
                return (
                    "#" +
                    ((1 << 24) | (p << 16) | (x << 8) | C).toString(16).slice(1)
                );
            }
            function o() {}
            function s(p, x) {
                f(
                    "Type warning: Expected: [" +
                        p +
                        "] Got: [" +
                        typeof x +
                        "] " +
                        x
                );
            }
            function a(p, x, C) {
                f("Units do not match [" + p + "]: " + x + ", " + C);
            }
            function u(p, x, C) {
                if ((x !== void 0 && (C = x), p === void 0)) return C;
                var M = C;
                return (
                    Te.test(p) || !Le.test(p)
                        ? (M = parseInt(p, 10))
                        : Le.test(p) && (M = 1e3 * parseFloat(p)),
                    0 > M && (M = 0),
                    M === M ? M : C
                );
            }
            function f(p) {
                oe.debug && window && window.console.warn(p);
            }
            function E(p) {
                for (var x = -1, C = p ? p.length : 0, M = []; ++x < C; ) {
                    var S = p[x];
                    S && M.push(S);
                }
                return M;
            }
            var d = (function (p, x, C) {
                    function M(se) {
                        return typeof se == "object";
                    }
                    function S(se) {
                        return typeof se == "function";
                    }
                    function k() {}
                    function ie(se, he) {
                        function J() {
                            var qe = new ce();
                            return (
                                S(qe.init) && qe.init.apply(qe, arguments), qe
                            );
                        }
                        function ce() {}
                        he === C && ((he = se), (se = Object)), (J.Bare = ce);
                        var le,
                            we = (k[p] = se[p]),
                            nt = (ce[p] = J[p] = new k());
                        return (
                            (nt.constructor = J),
                            (J.mixin = function (qe) {
                                return (ce[p] = J[p] = ie(J, qe)[p]), J;
                            }),
                            (J.open = function (qe) {
                                if (
                                    ((le = {}),
                                    S(qe)
                                        ? (le = qe.call(J, nt, we, J, se))
                                        : M(qe) && (le = qe),
                                    M(le))
                                )
                                    for (var Ir in le)
                                        x.call(le, Ir) && (nt[Ir] = le[Ir]);
                                return S(nt.init) || (nt.init = se), J;
                            }),
                            J.open(he)
                        );
                    }
                    return ie;
                })("prototype", {}.hasOwnProperty),
                b = {
                    ease: [
                        "ease",
                        function (p, x, C, M) {
                            var S = (p /= M) * p,
                                k = S * p;
                            return (
                                x +
                                C *
                                    (-2.75 * k * S +
                                        11 * S * S +
                                        -15.5 * k +
                                        8 * S +
                                        0.25 * p)
                            );
                        },
                    ],
                    "ease-in": [
                        "ease-in",
                        function (p, x, C, M) {
                            var S = (p /= M) * p,
                                k = S * p;
                            return (
                                x +
                                C * (-1 * k * S + 3 * S * S + -3 * k + 2 * S)
                            );
                        },
                    ],
                    "ease-out": [
                        "ease-out",
                        function (p, x, C, M) {
                            var S = (p /= M) * p,
                                k = S * p;
                            return (
                                x +
                                C *
                                    (0.3 * k * S +
                                        -1.6 * S * S +
                                        2.2 * k +
                                        -1.8 * S +
                                        1.9 * p)
                            );
                        },
                    ],
                    "ease-in-out": [
                        "ease-in-out",
                        function (p, x, C, M) {
                            var S = (p /= M) * p,
                                k = S * p;
                            return (
                                x + C * (2 * k * S + -5 * S * S + 2 * k + 2 * S)
                            );
                        },
                    ],
                    linear: [
                        "linear",
                        function (p, x, C, M) {
                            return (C * p) / M + x;
                        },
                    ],
                    "ease-in-quad": [
                        "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
                        function (p, x, C, M) {
                            return C * (p /= M) * p + x;
                        },
                    ],
                    "ease-out-quad": [
                        "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
                        function (p, x, C, M) {
                            return -C * (p /= M) * (p - 2) + x;
                        },
                    ],
                    "ease-in-out-quad": [
                        "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
                        function (p, x, C, M) {
                            return (p /= M / 2) < 1
                                ? (C / 2) * p * p + x
                                : (-C / 2) * (--p * (p - 2) - 1) + x;
                        },
                    ],
                    "ease-in-cubic": [
                        "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
                        function (p, x, C, M) {
                            return C * (p /= M) * p * p + x;
                        },
                    ],
                    "ease-out-cubic": [
                        "cubic-bezier(0.215, 0.610, 0.355, 1)",
                        function (p, x, C, M) {
                            return C * ((p = p / M - 1) * p * p + 1) + x;
                        },
                    ],
                    "ease-in-out-cubic": [
                        "cubic-bezier(0.645, 0.045, 0.355, 1)",
                        function (p, x, C, M) {
                            return (p /= M / 2) < 1
                                ? (C / 2) * p * p * p + x
                                : (C / 2) * ((p -= 2) * p * p + 2) + x;
                        },
                    ],
                    "ease-in-quart": [
                        "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
                        function (p, x, C, M) {
                            return C * (p /= M) * p * p * p + x;
                        },
                    ],
                    "ease-out-quart": [
                        "cubic-bezier(0.165, 0.840, 0.440, 1)",
                        function (p, x, C, M) {
                            return -C * ((p = p / M - 1) * p * p * p - 1) + x;
                        },
                    ],
                    "ease-in-out-quart": [
                        "cubic-bezier(0.770, 0, 0.175, 1)",
                        function (p, x, C, M) {
                            return (p /= M / 2) < 1
                                ? (C / 2) * p * p * p * p + x
                                : (-C / 2) * ((p -= 2) * p * p * p - 2) + x;
                        },
                    ],
                    "ease-in-quint": [
                        "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
                        function (p, x, C, M) {
                            return C * (p /= M) * p * p * p * p + x;
                        },
                    ],
                    "ease-out-quint": [
                        "cubic-bezier(0.230, 1, 0.320, 1)",
                        function (p, x, C, M) {
                            return (
                                C * ((p = p / M - 1) * p * p * p * p + 1) + x
                            );
                        },
                    ],
                    "ease-in-out-quint": [
                        "cubic-bezier(0.860, 0, 0.070, 1)",
                        function (p, x, C, M) {
                            return (p /= M / 2) < 1
                                ? (C / 2) * p * p * p * p * p + x
                                : (C / 2) * ((p -= 2) * p * p * p * p + 2) + x;
                        },
                    ],
                    "ease-in-sine": [
                        "cubic-bezier(0.470, 0, 0.745, 0.715)",
                        function (p, x, C, M) {
                            return (
                                -C * Math.cos((p / M) * (Math.PI / 2)) + C + x
                            );
                        },
                    ],
                    "ease-out-sine": [
                        "cubic-bezier(0.390, 0.575, 0.565, 1)",
                        function (p, x, C, M) {
                            return C * Math.sin((p / M) * (Math.PI / 2)) + x;
                        },
                    ],
                    "ease-in-out-sine": [
                        "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
                        function (p, x, C, M) {
                            return (
                                (-C / 2) * (Math.cos((Math.PI * p) / M) - 1) + x
                            );
                        },
                    ],
                    "ease-in-expo": [
                        "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
                        function (p, x, C, M) {
                            return p === 0
                                ? x
                                : C * Math.pow(2, 10 * (p / M - 1)) + x;
                        },
                    ],
                    "ease-out-expo": [
                        "cubic-bezier(0.190, 1, 0.220, 1)",
                        function (p, x, C, M) {
                            return p === M
                                ? x + C
                                : C * (-Math.pow(2, (-10 * p) / M) + 1) + x;
                        },
                    ],
                    "ease-in-out-expo": [
                        "cubic-bezier(1, 0, 0, 1)",
                        function (p, x, C, M) {
                            return p === 0
                                ? x
                                : p === M
                                ? x + C
                                : (p /= M / 2) < 1
                                ? (C / 2) * Math.pow(2, 10 * (p - 1)) + x
                                : (C / 2) * (-Math.pow(2, -10 * --p) + 2) + x;
                        },
                    ],
                    "ease-in-circ": [
                        "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
                        function (p, x, C, M) {
                            return -C * (Math.sqrt(1 - (p /= M) * p) - 1) + x;
                        },
                    ],
                    "ease-out-circ": [
                        "cubic-bezier(0.075, 0.820, 0.165, 1)",
                        function (p, x, C, M) {
                            return C * Math.sqrt(1 - (p = p / M - 1) * p) + x;
                        },
                    ],
                    "ease-in-out-circ": [
                        "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
                        function (p, x, C, M) {
                            return (p /= M / 2) < 1
                                ? (-C / 2) * (Math.sqrt(1 - p * p) - 1) + x
                                : (C / 2) * (Math.sqrt(1 - (p -= 2) * p) + 1) +
                                      x;
                        },
                    ],
                    "ease-in-back": [
                        "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
                        function (p, x, C, M, S) {
                            return (
                                S === void 0 && (S = 1.70158),
                                C * (p /= M) * p * ((S + 1) * p - S) + x
                            );
                        },
                    ],
                    "ease-out-back": [
                        "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
                        function (p, x, C, M, S) {
                            return (
                                S === void 0 && (S = 1.70158),
                                C *
                                    ((p = p / M - 1) * p * ((S + 1) * p + S) +
                                        1) +
                                    x
                            );
                        },
                    ],
                    "ease-in-out-back": [
                        "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
                        function (p, x, C, M, S) {
                            return (
                                S === void 0 && (S = 1.70158),
                                (p /= M / 2) < 1
                                    ? (C / 2) *
                                          p *
                                          p *
                                          (((S *= 1.525) + 1) * p - S) +
                                      x
                                    : (C / 2) *
                                          ((p -= 2) *
                                              p *
                                              (((S *= 1.525) + 1) * p + S) +
                                              2) +
                                      x
                            );
                        },
                    ],
                },
                m = {
                    "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
                    "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
                    "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
                },
                y = document,
                I = window,
                O = "bkwld-tram",
                T = /[\-\.0-9]/g,
                P = /[A-Z]/,
                L = "number",
                F = /^(rgb|#)/,
                G = /(em|cm|mm|in|pt|pc|px)$/,
                D = /(em|cm|mm|in|pt|pc|px|%)$/,
                K = /(deg|rad|turn)$/,
                z = "unitless",
                Q = /(all|none) 0s ease 0s/,
                re = /^(width|height)$/,
                j = " ",
                R = y.createElement("a"),
                w = ["Webkit", "Moz", "O", "ms"],
                N = ["-webkit-", "-moz-", "-o-", "-ms-"],
                V = function (p) {
                    if (p in R.style) return { dom: p, css: p };
                    var x,
                        C,
                        M = "",
                        S = p.split("-");
                    for (x = 0; x < S.length; x++)
                        M += S[x].charAt(0).toUpperCase() + S[x].slice(1);
                    for (x = 0; x < w.length; x++)
                        if (((C = w[x] + M), C in R.style))
                            return { dom: C, css: N[x] + p };
                },
                H = (t.support = {
                    bind: Function.prototype.bind,
                    transform: V("transform"),
                    transition: V("transition"),
                    backface: V("backface-visibility"),
                    timing: V("transition-timing-function"),
                });
            if (H.transition) {
                var te = H.timing.dom;
                if (((R.style[te] = b["ease-in-back"][0]), !R.style[te]))
                    for (var ne in m) b[ne][0] = m[ne];
            }
            var W = (t.frame = (function () {
                    var p =
                        I.requestAnimationFrame ||
                        I.webkitRequestAnimationFrame ||
                        I.mozRequestAnimationFrame ||
                        I.oRequestAnimationFrame ||
                        I.msRequestAnimationFrame;
                    return p && H.bind
                        ? p.bind(I)
                        : function (x) {
                              I.setTimeout(x, 16);
                          };
                })()),
                B = (t.now = (function () {
                    var p = I.performance,
                        x = p && (p.now || p.webkitNow || p.msNow || p.mozNow);
                    return x && H.bind
                        ? x.bind(p)
                        : Date.now ||
                              function () {
                                  return +new Date();
                              };
                })()),
                v = d(function (p) {
                    function x(ae, de) {
                        var be = E(("" + ae).split(j)),
                            ge = be[0];
                        de = de || {};
                        var Me = Y[ge];
                        if (!Me) return f("Unsupported property: " + ge);
                        if (!de.weak || !this.props[ge]) {
                            var ze = Me[0],
                                Ge = this.props[ge];
                            return (
                                Ge || (Ge = this.props[ge] = new ze.Bare()),
                                Ge.init(this.$el, be, Me, de),
                                Ge
                            );
                        }
                    }
                    function C(ae, de, be) {
                        if (ae) {
                            var ge = typeof ae;
                            if (
                                (de ||
                                    (this.timer && this.timer.destroy(),
                                    (this.queue = []),
                                    (this.active = !1)),
                                ge == "number" && de)
                            )
                                return (
                                    (this.timer = new Z({
                                        duration: ae,
                                        context: this,
                                        complete: k,
                                    })),
                                    void (this.active = !0)
                                );
                            if (ge == "string" && de) {
                                switch (ae) {
                                    case "hide":
                                        J.call(this);
                                        break;
                                    case "stop":
                                        ie.call(this);
                                        break;
                                    case "redraw":
                                        ce.call(this);
                                        break;
                                    default:
                                        x.call(this, ae, be && be[1]);
                                }
                                return k.call(this);
                            }
                            if (ge == "function")
                                return void ae.call(this, this);
                            if (ge == "object") {
                                var Me = 0;
                                nt.call(
                                    this,
                                    ae,
                                    function (Ie, f_) {
                                        Ie.span > Me && (Me = Ie.span),
                                            Ie.stop(),
                                            Ie.animate(f_);
                                    },
                                    function (Ie) {
                                        "wait" in Ie && (Me = u(Ie.wait, 0));
                                    }
                                ),
                                    we.call(this),
                                    Me > 0 &&
                                        ((this.timer = new Z({
                                            duration: Me,
                                            context: this,
                                        })),
                                        (this.active = !0),
                                        de && (this.timer.complete = k));
                                var ze = this,
                                    Ge = !1,
                                    ln = {};
                                W(function () {
                                    nt.call(ze, ae, function (Ie) {
                                        Ie.active &&
                                            ((Ge = !0),
                                            (ln[Ie.name] = Ie.nextStyle));
                                    }),
                                        Ge && ze.$el.css(ln);
                                });
                            }
                        }
                    }
                    function M(ae) {
                        (ae = u(ae, 0)),
                            this.active
                                ? this.queue.push({ options: ae })
                                : ((this.timer = new Z({
                                      duration: ae,
                                      context: this,
                                      complete: k,
                                  })),
                                  (this.active = !0));
                    }
                    function S(ae) {
                        return this.active
                            ? (this.queue.push({
                                  options: ae,
                                  args: arguments,
                              }),
                              void (this.timer.complete = k))
                            : f(
                                  "No active transition timer. Use start() or wait() before then()."
                              );
                    }
                    function k() {
                        if (
                            (this.timer && this.timer.destroy(),
                            (this.active = !1),
                            this.queue.length)
                        ) {
                            var ae = this.queue.shift();
                            C.call(this, ae.options, !0, ae.args);
                        }
                    }
                    function ie(ae) {
                        this.timer && this.timer.destroy(),
                            (this.queue = []),
                            (this.active = !1);
                        var de;
                        typeof ae == "string"
                            ? ((de = {}), (de[ae] = 1))
                            : (de =
                                  typeof ae == "object" && ae != null
                                      ? ae
                                      : this.props),
                            nt.call(this, de, qe),
                            we.call(this);
                    }
                    function se(ae) {
                        ie.call(this, ae), nt.call(this, ae, Ir, c_);
                    }
                    function he(ae) {
                        typeof ae != "string" && (ae = "block"),
                            (this.el.style.display = ae);
                    }
                    function J() {
                        ie.call(this), (this.el.style.display = "none");
                    }
                    function ce() {
                        this.el.offsetHeight;
                    }
                    function le() {
                        ie.call(this),
                            e.removeData(this.el, O),
                            (this.$el = this.el = null);
                    }
                    function we() {
                        var ae,
                            de,
                            be = [];
                        this.upstream && be.push(this.upstream);
                        for (ae in this.props)
                            (de = this.props[ae]),
                                de.active && be.push(de.string);
                        (be = be.join(",")),
                            this.style !== be &&
                                ((this.style = be),
                                (this.el.style[H.transition.dom] = be));
                    }
                    function nt(ae, de, be) {
                        var ge,
                            Me,
                            ze,
                            Ge,
                            ln = de !== qe,
                            Ie = {};
                        for (ge in ae)
                            (ze = ae[ge]),
                                ge in fe
                                    ? (Ie.transform || (Ie.transform = {}),
                                      (Ie.transform[ge] = ze))
                                    : (P.test(ge) && (ge = r(ge)),
                                      ge in Y
                                          ? (Ie[ge] = ze)
                                          : (Ge || (Ge = {}), (Ge[ge] = ze)));
                        for (ge in Ie) {
                            if (((ze = Ie[ge]), (Me = this.props[ge]), !Me)) {
                                if (!ln) continue;
                                Me = x.call(this, ge);
                            }
                            de.call(this, Me, ze);
                        }
                        be && Ge && be.call(this, Ge);
                    }
                    function qe(ae) {
                        ae.stop();
                    }
                    function Ir(ae, de) {
                        ae.set(de);
                    }
                    function c_(ae) {
                        this.$el.css(ae);
                    }
                    function je(ae, de) {
                        p[ae] = function () {
                            return this.children
                                ? l_.call(this, de, arguments)
                                : (this.el && de.apply(this, arguments), this);
                        };
                    }
                    function l_(ae, de) {
                        var be,
                            ge = this.children.length;
                        for (be = 0; ge > be; be++)
                            ae.apply(this.children[be], de);
                        return this;
                    }
                    (p.init = function (ae) {
                        if (
                            ((this.$el = e(ae)),
                            (this.el = this.$el[0]),
                            (this.props = {}),
                            (this.queue = []),
                            (this.style = ""),
                            (this.active = !1),
                            oe.keepInherited && !oe.fallback)
                        ) {
                            var de = X(this.el, "transition");
                            de && !Q.test(de) && (this.upstream = de);
                        }
                        H.backface &&
                            oe.hideBackface &&
                            _(this.el, H.backface.css, "hidden");
                    }),
                        je("add", x),
                        je("start", C),
                        je("wait", M),
                        je("then", S),
                        je("next", k),
                        je("stop", ie),
                        je("set", se),
                        je("show", he),
                        je("hide", J),
                        je("redraw", ce),
                        je("destroy", le);
                }),
                g = d(v, function (p) {
                    function x(C, M) {
                        var S = e.data(C, O) || e.data(C, O, new v.Bare());
                        return S.el || S.init(C), M ? S.start(M) : S;
                    }
                    p.init = function (C, M) {
                        var S = e(C);
                        if (!S.length) return this;
                        if (S.length === 1) return x(S[0], M);
                        var k = [];
                        return (
                            S.each(function (ie, se) {
                                k.push(x(se, M));
                            }),
                            (this.children = k),
                            this
                        );
                    };
                }),
                h = d(function (p) {
                    function x() {
                        var k = this.get();
                        this.update("auto");
                        var ie = this.get();
                        return this.update(k), ie;
                    }
                    function C(k, ie, se) {
                        return ie !== void 0 && (se = ie), k in b ? k : se;
                    }
                    function M(k) {
                        var ie = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(k);
                        return (ie ? i(ie[1], ie[2], ie[3]) : k).replace(
                            /#(\w)(\w)(\w)$/,
                            "#$1$1$2$2$3$3"
                        );
                    }
                    var S = { duration: 500, ease: "ease", delay: 0 };
                    (p.init = function (k, ie, se, he) {
                        (this.$el = k), (this.el = k[0]);
                        var J = ie[0];
                        se[2] && (J = se[2]),
                            ee[J] && (J = ee[J]),
                            (this.name = J),
                            (this.type = se[1]),
                            (this.duration = u(
                                ie[1],
                                this.duration,
                                S.duration
                            )),
                            (this.ease = C(ie[2], this.ease, S.ease)),
                            (this.delay = u(ie[3], this.delay, S.delay)),
                            (this.span = this.duration + this.delay),
                            (this.active = !1),
                            (this.nextStyle = null),
                            (this.auto = re.test(this.name)),
                            (this.unit =
                                he.unit || this.unit || oe.defaultUnit),
                            (this.angle =
                                he.angle || this.angle || oe.defaultAngle),
                            oe.fallback || he.fallback
                                ? (this.animate = this.fallback)
                                : ((this.animate = this.transition),
                                  (this.string =
                                      this.name +
                                      j +
                                      this.duration +
                                      "ms" +
                                      (this.ease != "ease"
                                          ? j + b[this.ease][0]
                                          : "") +
                                      (this.delay
                                          ? j + this.delay + "ms"
                                          : "")));
                    }),
                        (p.set = function (k) {
                            (k = this.convert(k, this.type)),
                                this.update(k),
                                this.redraw();
                        }),
                        (p.transition = function (k) {
                            (this.active = !0),
                                (k = this.convert(k, this.type)),
                                this.auto &&
                                    (this.el.style[this.name] == "auto" &&
                                        (this.update(this.get()),
                                        this.redraw()),
                                    k == "auto" && (k = x.call(this))),
                                (this.nextStyle = k);
                        }),
                        (p.fallback = function (k) {
                            var ie =
                                this.el.style[this.name] ||
                                this.convert(this.get(), this.type);
                            (k = this.convert(k, this.type)),
                                this.auto &&
                                    (ie == "auto" &&
                                        (ie = this.convert(
                                            this.get(),
                                            this.type
                                        )),
                                    k == "auto" && (k = x.call(this))),
                                (this.tween = new A({
                                    from: ie,
                                    to: k,
                                    duration: this.duration,
                                    delay: this.delay,
                                    ease: this.ease,
                                    update: this.update,
                                    context: this,
                                }));
                        }),
                        (p.get = function () {
                            return X(this.el, this.name);
                        }),
                        (p.update = function (k) {
                            _(this.el, this.name, k);
                        }),
                        (p.stop = function () {
                            (this.active || this.nextStyle) &&
                                ((this.active = !1),
                                (this.nextStyle = null),
                                _(this.el, this.name, this.get()));
                            var k = this.tween;
                            k && k.context && k.destroy();
                        }),
                        (p.convert = function (k, ie) {
                            if (k == "auto" && this.auto) return k;
                            var se,
                                he = typeof k == "number",
                                J = typeof k == "string";
                            switch (ie) {
                                case L:
                                    if (he) return k;
                                    if (J && k.replace(T, "") === "") return +k;
                                    se = "number(unitless)";
                                    break;
                                case F:
                                    if (J) {
                                        if (k === "" && this.original)
                                            return this.original;
                                        if (ie.test(k))
                                            return k.charAt(0) == "#" &&
                                                k.length == 7
                                                ? k
                                                : M(k);
                                    }
                                    se = "hex or rgb string";
                                    break;
                                case G:
                                    if (he) return k + this.unit;
                                    if (J && ie.test(k)) return k;
                                    se = "number(px) or string(unit)";
                                    break;
                                case D:
                                    if (he) return k + this.unit;
                                    if (J && ie.test(k)) return k;
                                    se = "number(px) or string(unit or %)";
                                    break;
                                case K:
                                    if (he) return k + this.angle;
                                    if (J && ie.test(k)) return k;
                                    se = "number(deg) or string(angle)";
                                    break;
                                case z:
                                    if (he || (J && D.test(k))) return k;
                                    se =
                                        "number(unitless) or string(unit or %)";
                            }
                            return s(se, k), k;
                        }),
                        (p.redraw = function () {
                            this.el.offsetHeight;
                        });
                }),
                c = d(h, function (p, x) {
                    p.init = function () {
                        x.init.apply(this, arguments),
                            this.original ||
                                (this.original = this.convert(this.get(), F));
                    };
                }),
                q = d(h, function (p, x) {
                    (p.init = function () {
                        x.init.apply(this, arguments),
                            (this.animate = this.fallback);
                    }),
                        (p.get = function () {
                            return this.$el[this.name]();
                        }),
                        (p.update = function (C) {
                            this.$el[this.name](C);
                        });
                }),
                U = d(h, function (p, x) {
                    function C(M, S) {
                        var k, ie, se, he, J;
                        for (k in M)
                            (he = fe[k]),
                                (se = he[0]),
                                (ie = he[1] || k),
                                (J = this.convert(M[k], se)),
                                S.call(this, ie, J, se);
                    }
                    (p.init = function () {
                        x.init.apply(this, arguments),
                            this.current ||
                                ((this.current = {}),
                                fe.perspective &&
                                    oe.perspective &&
                                    ((this.current.perspective =
                                        oe.perspective),
                                    _(
                                        this.el,
                                        this.name,
                                        this.style(this.current)
                                    ),
                                    this.redraw()));
                    }),
                        (p.set = function (M) {
                            C.call(this, M, function (S, k) {
                                this.current[S] = k;
                            }),
                                _(this.el, this.name, this.style(this.current)),
                                this.redraw();
                        }),
                        (p.transition = function (M) {
                            var S = this.values(M);
                            this.tween = new ue({
                                current: this.current,
                                values: S,
                                duration: this.duration,
                                delay: this.delay,
                                ease: this.ease,
                            });
                            var k,
                                ie = {};
                            for (k in this.current)
                                ie[k] = k in S ? S[k] : this.current[k];
                            (this.active = !0),
                                (this.nextStyle = this.style(ie));
                        }),
                        (p.fallback = function (M) {
                            var S = this.values(M);
                            this.tween = new ue({
                                current: this.current,
                                values: S,
                                duration: this.duration,
                                delay: this.delay,
                                ease: this.ease,
                                update: this.update,
                                context: this,
                            });
                        }),
                        (p.update = function () {
                            _(this.el, this.name, this.style(this.current));
                        }),
                        (p.style = function (M) {
                            var S,
                                k = "";
                            for (S in M) k += S + "(" + M[S] + ") ";
                            return k;
                        }),
                        (p.values = function (M) {
                            var S,
                                k = {};
                            return (
                                C.call(this, M, function (ie, se, he) {
                                    (k[ie] = se),
                                        this.current[ie] === void 0 &&
                                            ((S = 0),
                                            ~ie.indexOf("scale") && (S = 1),
                                            (this.current[ie] = this.convert(
                                                S,
                                                he
                                            )));
                                }),
                                k
                            );
                        });
                }),
                A = d(function (p) {
                    function x(J) {
                        se.push(J) === 1 && W(C);
                    }
                    function C() {
                        var J,
                            ce,
                            le,
                            we = se.length;
                        if (we)
                            for (W(C), ce = B(), J = we; J--; )
                                (le = se[J]), le && le.render(ce);
                    }
                    function M(J) {
                        var ce,
                            le = e.inArray(J, se);
                        le >= 0 &&
                            ((ce = se.slice(le + 1)),
                            (se.length = le),
                            ce.length && (se = se.concat(ce)));
                    }
                    function S(J) {
                        return Math.round(J * he) / he;
                    }
                    function k(J, ce, le) {
                        return i(
                            J[0] + le * (ce[0] - J[0]),
                            J[1] + le * (ce[1] - J[1]),
                            J[2] + le * (ce[2] - J[2])
                        );
                    }
                    var ie = { ease: b.ease[1], from: 0, to: 1 };
                    (p.init = function (J) {
                        (this.duration = J.duration || 0),
                            (this.delay = J.delay || 0);
                        var ce = J.ease || ie.ease;
                        b[ce] && (ce = b[ce][1]),
                            typeof ce != "function" && (ce = ie.ease),
                            (this.ease = ce),
                            (this.update = J.update || o),
                            (this.complete = J.complete || o),
                            (this.context = J.context || this),
                            (this.name = J.name);
                        var le = J.from,
                            we = J.to;
                        le === void 0 && (le = ie.from),
                            we === void 0 && (we = ie.to),
                            (this.unit = J.unit || ""),
                            typeof le == "number" && typeof we == "number"
                                ? ((this.begin = le), (this.change = we - le))
                                : this.format(we, le),
                            (this.value = this.begin + this.unit),
                            (this.start = B()),
                            J.autoplay !== !1 && this.play();
                    }),
                        (p.play = function () {
                            this.active ||
                                (this.start || (this.start = B()),
                                (this.active = !0),
                                x(this));
                        }),
                        (p.stop = function () {
                            this.active && ((this.active = !1), M(this));
                        }),
                        (p.render = function (J) {
                            var ce,
                                le = J - this.start;
                            if (this.delay) {
                                if (le <= this.delay) return;
                                le -= this.delay;
                            }
                            if (le < this.duration) {
                                var we = this.ease(le, 0, 1, this.duration);
                                return (
                                    (ce = this.startRGB
                                        ? k(this.startRGB, this.endRGB, we)
                                        : S(this.begin + we * this.change)),
                                    (this.value = ce + this.unit),
                                    void this.update.call(
                                        this.context,
                                        this.value
                                    )
                                );
                            }
                            (ce = this.endHex || this.begin + this.change),
                                (this.value = ce + this.unit),
                                this.update.call(this.context, this.value),
                                this.complete.call(this.context),
                                this.destroy();
                        }),
                        (p.format = function (J, ce) {
                            if (((ce += ""), (J += ""), J.charAt(0) == "#"))
                                return (
                                    (this.startRGB = n(ce)),
                                    (this.endRGB = n(J)),
                                    (this.endHex = J),
                                    (this.begin = 0),
                                    void (this.change = 1)
                                );
                            if (!this.unit) {
                                var le = ce.replace(T, ""),
                                    we = J.replace(T, "");
                                le !== we && a("tween", ce, J),
                                    (this.unit = le);
                            }
                            (ce = parseFloat(ce)),
                                (J = parseFloat(J)),
                                (this.begin = this.value = ce),
                                (this.change = J - ce);
                        }),
                        (p.destroy = function () {
                            this.stop(),
                                (this.context = null),
                                (this.ease = this.update = this.complete = o);
                        });
                    var se = [],
                        he = 1e3;
                }),
                Z = d(A, function (p) {
                    (p.init = function (x) {
                        (this.duration = x.duration || 0),
                            (this.complete = x.complete || o),
                            (this.context = x.context),
                            this.play();
                    }),
                        (p.render = function (x) {
                            var C = x - this.start;
                            C < this.duration ||
                                (this.complete.call(this.context),
                                this.destroy());
                        });
                }),
                ue = d(A, function (p, x) {
                    (p.init = function (C) {
                        (this.context = C.context),
                            (this.update = C.update),
                            (this.tweens = []),
                            (this.current = C.current);
                        var M, S;
                        for (M in C.values)
                            (S = C.values[M]),
                                this.current[M] !== S &&
                                    this.tweens.push(
                                        new A({
                                            name: M,
                                            from: this.current[M],
                                            to: S,
                                            duration: C.duration,
                                            delay: C.delay,
                                            ease: C.ease,
                                            autoplay: !1,
                                        })
                                    );
                        this.play();
                    }),
                        (p.render = function (C) {
                            var M,
                                S,
                                k = this.tweens.length,
                                ie = !1;
                            for (M = k; M--; )
                                (S = this.tweens[M]),
                                    S.context &&
                                        (S.render(C),
                                        (this.current[S.name] = S.value),
                                        (ie = !0));
                            return ie
                                ? void (
                                      this.update &&
                                      this.update.call(this.context)
                                  )
                                : this.destroy();
                        }),
                        (p.destroy = function () {
                            if ((x.destroy.call(this), this.tweens)) {
                                var C,
                                    M = this.tweens.length;
                                for (C = M; C--; ) this.tweens[C].destroy();
                                (this.tweens = null), (this.current = null);
                            }
                        });
                }),
                oe = (t.config = {
                    debug: !1,
                    defaultUnit: "px",
                    defaultAngle: "deg",
                    keepInherited: !1,
                    hideBackface: !1,
                    perspective: "",
                    fallback: !H.transition,
                    agentTests: [],
                });
            (t.fallback = function (p) {
                if (!H.transition) return (oe.fallback = !0);
                oe.agentTests.push("(" + p + ")");
                var x = new RegExp(oe.agentTests.join("|"), "i");
                oe.fallback = x.test(navigator.userAgent);
            }),
                t.fallback("6.0.[2-5] Safari"),
                (t.tween = function (p) {
                    return new A(p);
                }),
                (t.delay = function (p, x, C) {
                    return new Z({ complete: x, duration: p, context: C });
                }),
                (e.fn.tram = function (p) {
                    return t.call(null, this, p);
                });
            var _ = e.style,
                X = e.css,
                ee = { transform: H.transform && H.transform.css },
                Y = {
                    color: [c, F],
                    background: [c, F, "background-color"],
                    "outline-color": [c, F],
                    "border-color": [c, F],
                    "border-top-color": [c, F],
                    "border-right-color": [c, F],
                    "border-bottom-color": [c, F],
                    "border-left-color": [c, F],
                    "border-width": [h, G],
                    "border-top-width": [h, G],
                    "border-right-width": [h, G],
                    "border-bottom-width": [h, G],
                    "border-left-width": [h, G],
                    "border-spacing": [h, G],
                    "letter-spacing": [h, G],
                    margin: [h, G],
                    "margin-top": [h, G],
                    "margin-right": [h, G],
                    "margin-bottom": [h, G],
                    "margin-left": [h, G],
                    padding: [h, G],
                    "padding-top": [h, G],
                    "padding-right": [h, G],
                    "padding-bottom": [h, G],
                    "padding-left": [h, G],
                    "outline-width": [h, G],
                    opacity: [h, L],
                    top: [h, D],
                    right: [h, D],
                    bottom: [h, D],
                    left: [h, D],
                    "font-size": [h, D],
                    "text-indent": [h, D],
                    "word-spacing": [h, D],
                    width: [h, D],
                    "min-width": [h, D],
                    "max-width": [h, D],
                    height: [h, D],
                    "min-height": [h, D],
                    "max-height": [h, D],
                    "line-height": [h, z],
                    "scroll-top": [q, L, "scrollTop"],
                    "scroll-left": [q, L, "scrollLeft"],
                },
                fe = {};
            H.transform &&
                ((Y.transform = [U]),
                (fe = {
                    x: [D, "translateX"],
                    y: [D, "translateY"],
                    rotate: [K],
                    rotateX: [K],
                    rotateY: [K],
                    scale: [L],
                    scaleX: [L],
                    scaleY: [L],
                    skew: [K],
                    skewX: [K],
                    skewY: [K],
                })),
                H.transform &&
                    H.backface &&
                    ((fe.z = [D, "translateZ"]),
                    (fe.rotateZ = [K]),
                    (fe.scaleZ = [L]),
                    (fe.perspective = [G]));
            var Te = /ms/,
                Le = /s|\./;
            return (e.tram = t);
        })(window.jQuery);
    });
    var Bs = l((vW, Hs) => {
        "use strict";
        var m_ = window.$,
            y_ = Di() && m_.tram;
        Hs.exports = (function () {
            var e = {};
            e.VERSION = "1.6.0-Webflow";
            var t = {},
                r = Array.prototype,
                n = Object.prototype,
                i = Function.prototype,
                o = r.push,
                s = r.slice,
                a = r.concat,
                u = n.toString,
                f = n.hasOwnProperty,
                E = r.forEach,
                d = r.map,
                b = r.reduce,
                m = r.reduceRight,
                y = r.filter,
                I = r.every,
                O = r.some,
                T = r.indexOf,
                P = r.lastIndexOf,
                L = Array.isArray,
                F = Object.keys,
                G = i.bind,
                D =
                    (e.each =
                    e.forEach =
                        function (w, N, V) {
                            if (w == null) return w;
                            if (E && w.forEach === E) w.forEach(N, V);
                            else if (w.length === +w.length) {
                                for (var H = 0, te = w.length; H < te; H++)
                                    if (N.call(V, w[H], H, w) === t) return;
                            } else
                                for (
                                    var ne = e.keys(w), H = 0, te = ne.length;
                                    H < te;
                                    H++
                                )
                                    if (N.call(V, w[ne[H]], ne[H], w) === t)
                                        return;
                            return w;
                        });
            (e.map = e.collect =
                function (w, N, V) {
                    var H = [];
                    return w == null
                        ? H
                        : d && w.map === d
                        ? w.map(N, V)
                        : (D(w, function (te, ne, W) {
                              H.push(N.call(V, te, ne, W));
                          }),
                          H);
                }),
                (e.find = e.detect =
                    function (w, N, V) {
                        var H;
                        return (
                            K(w, function (te, ne, W) {
                                if (N.call(V, te, ne, W)) return (H = te), !0;
                            }),
                            H
                        );
                    }),
                (e.filter = e.select =
                    function (w, N, V) {
                        var H = [];
                        return w == null
                            ? H
                            : y && w.filter === y
                            ? w.filter(N, V)
                            : (D(w, function (te, ne, W) {
                                  N.call(V, te, ne, W) && H.push(te);
                              }),
                              H);
                    });
            var K =
                (e.some =
                e.any =
                    function (w, N, V) {
                        N || (N = e.identity);
                        var H = !1;
                        return w == null
                            ? H
                            : O && w.some === O
                            ? w.some(N, V)
                            : (D(w, function (te, ne, W) {
                                  if (H || (H = N.call(V, te, ne, W))) return t;
                              }),
                              !!H);
                    });
            (e.contains = e.include =
                function (w, N) {
                    return w == null
                        ? !1
                        : T && w.indexOf === T
                        ? w.indexOf(N) != -1
                        : K(w, function (V) {
                              return V === N;
                          });
                }),
                (e.delay = function (w, N) {
                    var V = s.call(arguments, 2);
                    return setTimeout(function () {
                        return w.apply(null, V);
                    }, N);
                }),
                (e.defer = function (w) {
                    return e.delay.apply(
                        e,
                        [w, 1].concat(s.call(arguments, 1))
                    );
                }),
                (e.throttle = function (w) {
                    var N, V, H;
                    return function () {
                        N ||
                            ((N = !0),
                            (V = arguments),
                            (H = this),
                            y_.frame(function () {
                                (N = !1), w.apply(H, V);
                            }));
                    };
                }),
                (e.debounce = function (w, N, V) {
                    var H,
                        te,
                        ne,
                        W,
                        B,
                        v = function () {
                            var g = e.now() - W;
                            g < N
                                ? (H = setTimeout(v, N - g))
                                : ((H = null),
                                  V ||
                                      ((B = w.apply(ne, te)),
                                      (ne = te = null)));
                        };
                    return function () {
                        (ne = this), (te = arguments), (W = e.now());
                        var g = V && !H;
                        return (
                            H || (H = setTimeout(v, N)),
                            g && ((B = w.apply(ne, te)), (ne = te = null)),
                            B
                        );
                    };
                }),
                (e.defaults = function (w) {
                    if (!e.isObject(w)) return w;
                    for (var N = 1, V = arguments.length; N < V; N++) {
                        var H = arguments[N];
                        for (var te in H) w[te] === void 0 && (w[te] = H[te]);
                    }
                    return w;
                }),
                (e.keys = function (w) {
                    if (!e.isObject(w)) return [];
                    if (F) return F(w);
                    var N = [];
                    for (var V in w) e.has(w, V) && N.push(V);
                    return N;
                }),
                (e.has = function (w, N) {
                    return f.call(w, N);
                }),
                (e.isObject = function (w) {
                    return w === Object(w);
                }),
                (e.now =
                    Date.now ||
                    function () {
                        return new Date().getTime();
                    }),
                (e.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g,
                });
            var z = /(.)^/,
                Q = {
                    "'": "'",
                    "\\": "\\",
                    "\r": "r",
                    "\n": "n",
                    "\u2028": "u2028",
                    "\u2029": "u2029",
                },
                re = /\\|'|\r|\n|\u2028|\u2029/g,
                j = function (w) {
                    return "\\" + Q[w];
                },
                R = /^\s*(\w|\$)+\s*$/;
            return (
                (e.template = function (w, N, V) {
                    !N && V && (N = V),
                        (N = e.defaults({}, N, e.templateSettings));
                    var H = RegExp(
                            [
                                (N.escape || z).source,
                                (N.interpolate || z).source,
                                (N.evaluate || z).source,
                            ].join("|") + "|$",
                            "g"
                        ),
                        te = 0,
                        ne = "__p+='";
                    w.replace(H, function (g, h, c, q, U) {
                        return (
                            (ne += w.slice(te, U).replace(re, j)),
                            (te = U + g.length),
                            h
                                ? (ne +=
                                      `'+
    ((__t=(` +
                                      h +
                                      `))==null?'':_.escape(__t))+
    '`)
                                : c
                                ? (ne +=
                                      `'+
    ((__t=(` +
                                      c +
                                      `))==null?'':__t)+
    '`)
                                : q &&
                                  (ne +=
                                      `';
    ` +
                                      q +
                                      `
    __p+='`),
                            g
                        );
                    }),
                        (ne += `';
    `);
                    var W = N.variable;
                    if (W) {
                        if (!R.test(W))
                            throw new Error(
                                "variable is not a bare identifier: " + W
                            );
                    } else
                        (ne =
                            `with(obj||{}){
    ` +
                            ne +
                            `}
    `),
                            (W = "obj");
                    ne =
                        `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    ` +
                        ne +
                        `return __p;
    `;
                    var B;
                    try {
                        B = new Function(N.variable || "obj", "_", ne);
                    } catch (g) {
                        throw ((g.source = ne), g);
                    }
                    var v = function (g) {
                        return B.call(this, g, e);
                    };
                    return (
                        (v.source =
                            "function(" +
                            W +
                            `){
    ` +
                            ne +
                            "}"),
                        v
                    );
                }),
                e
            );
        })();
    });
    var Ne = l((hW, Zs) => {
        "use strict";
        var ve = {},
            Bt = {},
            Xt = [],
            Gi = window.Webflow || [],
            _t = window.jQuery,
            Ye = _t(window),
            E_ = _t(document),
            ot = _t.isFunction,
            Ke = (ve._ = Bs()),
            js = (ve.tram = Di() && _t.tram),
            pn = !1,
            Vi = !1;
        js.config.hideBackface = !1;
        js.config.keepInherited = !0;
        ve.define = function (e, t, r) {
            Bt[e] && Ks(Bt[e]);
            var n = (Bt[e] = t(_t, Ke, r) || {});
            return zs(n), n;
        };
        ve.require = function (e) {
            return Bt[e];
        };
        function zs(e) {
            ve.env() &&
                (ot(e.design) && Ye.on("__wf_design", e.design),
                ot(e.preview) && Ye.on("__wf_preview", e.preview)),
                ot(e.destroy) && Ye.on("__wf_destroy", e.destroy),
                e.ready && ot(e.ready) && b_(e);
        }
        function b_(e) {
            if (pn) {
                e.ready();
                return;
            }
            Ke.contains(Xt, e.ready) || Xt.push(e.ready);
        }
        function Ks(e) {
            ot(e.design) && Ye.off("__wf_design", e.design),
                ot(e.preview) && Ye.off("__wf_preview", e.preview),
                ot(e.destroy) && Ye.off("__wf_destroy", e.destroy),
                e.ready && ot(e.ready) && __(e);
        }
        function __(e) {
            Xt = Ke.filter(Xt, function (t) {
                return t !== e.ready;
            });
        }
        ve.push = function (e) {
            if (pn) {
                ot(e) && e();
                return;
            }
            Gi.push(e);
        };
        ve.env = function (e) {
            var t = window.__wf_design,
                r = typeof t < "u";
            if (!e) return r;
            if (e === "design") return r && t;
            if (e === "preview") return r && !t;
            if (e === "slug") return r && window.__wf_slug;
            if (e === "editor") return window.WebflowEditor;
            if (e === "test") return window.__wf_test;
            if (e === "frame") return window !== window.top;
        };
        var dn = navigator.userAgent.toLowerCase(),
            Ys = (ve.env.touch =
                "ontouchstart" in window ||
                (window.DocumentTouch &&
                    document instanceof window.DocumentTouch)),
            w_ = (ve.env.chrome =
                /chrome/.test(dn) &&
                /Google/.test(navigator.vendor) &&
                parseInt(dn.match(/chrome\/(\d+)\./)[1], 10)),
            I_ = (ve.env.ios = /(ipod|iphone|ipad)/.test(dn));
        ve.env.safari = /safari/.test(dn) && !w_ && !I_;
        var ki;
        Ys &&
            E_.on("touchstart mousedown", function (e) {
                ki = e.target;
            });
        ve.validClick = Ys
            ? function (e) {
                  return e === ki || _t.contains(e, ki);
              }
            : function () {
                  return !0;
              };
        var Qs = "resize.webflow orientationchange.webflow load.webflow",
            T_ = "scroll.webflow " + Qs;
        ve.resize = Ui(Ye, Qs);
        ve.scroll = Ui(Ye, T_);
        ve.redraw = Ui();
        function Ui(e, t) {
            var r = [],
                n = {};
            return (
                (n.up = Ke.throttle(function (i) {
                    Ke.each(r, function (o) {
                        o(i);
                    });
                })),
                e && t && e.on(t, n.up),
                (n.on = function (i) {
                    typeof i == "function" && (Ke.contains(r, i) || r.push(i));
                }),
                (n.off = function (i) {
                    if (!arguments.length) {
                        r = [];
                        return;
                    }
                    r = Ke.filter(r, function (o) {
                        return o !== i;
                    });
                }),
                n
            );
        }
        ve.location = function (e) {
            window.location = e;
        };
        ve.env() && (ve.location = function () {});
        ve.ready = function () {
            (pn = !0),
                Vi ? x_() : Ke.each(Xt, Xs),
                Ke.each(Gi, Xs),
                ve.resize.up();
        };
        function Xs(e) {
            ot(e) && e();
        }
        function x_() {
            (Vi = !1), Ke.each(Bt, zs);
        }
        var Nt;
        ve.load = function (e) {
            Nt.then(e);
        };
        function $s() {
            Nt && (Nt.reject(), Ye.off("load", Nt.resolve)),
                (Nt = new _t.Deferred()),
                Ye.on("load", Nt.resolve);
        }
        ve.destroy = function (e) {
            (e = e || {}),
                (Vi = !0),
                Ye.triggerHandler("__wf_destroy"),
                e.domready != null && (pn = e.domready),
                Ke.each(Bt, Ks),
                ve.resize.off(),
                ve.scroll.off(),
                ve.redraw.off(),
                (Xt = []),
                (Gi = []),
                Nt.state() === "pending" && $s();
        };
        _t(ve.ready);
        $s();
        Zs.exports = window.Webflow = ve;
    });
    var tu = l((mW, eu) => {
        "use strict";
        var Js = Ne();
        Js.define(
            "brand",
            (eu.exports = function (e) {
                var t = {},
                    r = document,
                    n = e("html"),
                    i = e("body"),
                    o = ".w-webflow-badge",
                    s = window.location,
                    a = /PhantomJS/i.test(navigator.userAgent),
                    u =
                        "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
                    f;
                t.ready = function () {
                    var m = n.attr("data-wf-status"),
                        y = n.attr("data-wf-domain") || "";
                    /\.webflow\.io$/i.test(y) && s.hostname !== y && (m = !0),
                        m &&
                            !a &&
                            ((f = f || d()),
                            b(),
                            setTimeout(b, 500),
                            e(r).off(u, E).on(u, E));
                };
                function E() {
                    var m =
                        r.fullScreen ||
                        r.mozFullScreen ||
                        r.webkitIsFullScreen ||
                        r.msFullscreenElement ||
                        !!r.webkitFullscreenElement;
                    e(f).attr("style", m ? "display: none !important;" : "");
                }
                function d() {
                    
                }
                function b() {
                    var m = i.children(o),
                        y = m.length && m.get(0) === f,
                        I = Js.env("editor");
                    if (y) {
                        I && m.remove();
                        return;
                    }
                    m.length && m.remove(), I || i.append(f);
                }
                return t;
            })
        );
    });
    var nu = l((yW, ru) => {
        "use strict";
        var Wi = Ne();
        Wi.define(
            "edit",
            (ru.exports = function (e, t, r) {
                if (
                    ((r = r || {}),
                    (Wi.env("test") || Wi.env("frame")) && !r.fixture && !O_())
                )
                    return { exit: 1 };
                var n = {},
                    i = e(window),
                    o = e(document.documentElement),
                    s = document.location,
                    a = "hashchange",
                    u,
                    f = r.load || b,
                    E = !1;
                try {
                    E =
                        localStorage &&
                        localStorage.getItem &&
                        localStorage.getItem("WebflowEditor");
                } catch {}
                E
                    ? f()
                    : s.search
                    ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
                          /\?edit$/.test(s.href)) &&
                      f()
                    : i.on(a, d).triggerHandler(a);
                function d() {
                    u || (/\?edit/.test(s.hash) && f());
                }
                function b() {
                    (u = !0),
                        (window.WebflowEditor = !0),
                        i.off(a, d),
                        P(function (F) {
                            e.ajax({
                                url: T(
                                    "https://editor-api.webflow.com/api/editor/view"
                                ),
                                data: { siteId: o.attr("data-wf-site") },
                                xhrFields: { withCredentials: !0 },
                                dataType: "json",
                                crossDomain: !0,
                                success: m(F),
                            });
                        });
                }
                function m(F) {
                    return function (G) {
                        if (!G) {
                            console.error("Could not load editor data");
                            return;
                        }
                        (G.thirdPartyCookiesSupported = F),
                            y(O(G.scriptPath), function () {
                                window.WebflowEditor(G);
                            });
                    };
                }
                function y(F, G) {
                    e.ajax({
                        type: "GET",
                        url: F,
                        dataType: "script",
                        cache: !0,
                    }).then(G, I);
                }
                function I(F, G, D) {
                    throw (
                        (console.error("Could not load editor script: " + G), D)
                    );
                }
                function O(F) {
                    return F.indexOf("//") >= 0
                        ? F
                        : T("https://editor-api.webflow.com" + F);
                }
                function T(F) {
                    return F.replace(/([^:])\/\//g, "$1/");
                }
                function P(F) {
                    var G = window.document.createElement("iframe");
                    (G.src =
                        "https://webflow.com/site/third-party-cookie-check.html"),
                        (G.style.display = "none"),
                        (G.sandbox = "allow-scripts allow-same-origin");
                    var D = function (K) {
                        K.data === "WF_third_party_cookies_unsupported"
                            ? (L(G, D), F(!1))
                            : K.data === "WF_third_party_cookies_supported" &&
                              (L(G, D), F(!0));
                    };
                    (G.onerror = function () {
                        L(G, D), F(!1);
                    }),
                        window.addEventListener("message", D, !1),
                        window.document.body.appendChild(G);
                }
                function L(F, G) {
                    window.removeEventListener("message", G, !1), F.remove();
                }
                return n;
            })
        );
        function O_() {
            try {
                return window.top.__Cypress__;
            } catch {
                return !1;
            }
        }
    });
    var ou = l((EW, iu) => {
        "use strict";
        var A_ = Ne();
        A_.define(
            "focus-visible",
            (iu.exports = function () {
                function e(r) {
                    var n = !0,
                        i = !1,
                        o = null,
                        s = {
                            text: !0,
                            search: !0,
                            url: !0,
                            tel: !0,
                            email: !0,
                            password: !0,
                            number: !0,
                            date: !0,
                            month: !0,
                            week: !0,
                            time: !0,
                            datetime: !0,
                            "datetime-local": !0,
                        };
                    function a(L) {
                        return !!(
                            L &&
                            L !== document &&
                            L.nodeName !== "HTML" &&
                            L.nodeName !== "BODY" &&
                            "classList" in L &&
                            "contains" in L.classList
                        );
                    }
                    function u(L) {
                        var F = L.type,
                            G = L.tagName;
                        return !!(
                            (G === "INPUT" && s[F] && !L.readOnly) ||
                            (G === "TEXTAREA" && !L.readOnly) ||
                            L.isContentEditable
                        );
                    }
                    function f(L) {
                        L.getAttribute("data-wf-focus-visible") ||
                            L.setAttribute("data-wf-focus-visible", "true");
                    }
                    function E(L) {
                        L.getAttribute("data-wf-focus-visible") &&
                            L.removeAttribute("data-wf-focus-visible");
                    }
                    function d(L) {
                        L.metaKey ||
                            L.altKey ||
                            L.ctrlKey ||
                            (a(r.activeElement) && f(r.activeElement),
                            (n = !0));
                    }
                    function b() {
                        n = !1;
                    }
                    function m(L) {
                        a(L.target) && (n || u(L.target)) && f(L.target);
                    }
                    function y(L) {
                        a(L.target) &&
                            L.target.hasAttribute("data-wf-focus-visible") &&
                            ((i = !0),
                            window.clearTimeout(o),
                            (o = window.setTimeout(function () {
                                i = !1;
                            }, 100)),
                            E(L.target));
                    }
                    function I() {
                        document.visibilityState === "hidden" &&
                            (i && (n = !0), O());
                    }
                    function O() {
                        document.addEventListener("mousemove", P),
                            document.addEventListener("mousedown", P),
                            document.addEventListener("mouseup", P),
                            document.addEventListener("pointermove", P),
                            document.addEventListener("pointerdown", P),
                            document.addEventListener("pointerup", P),
                            document.addEventListener("touchmove", P),
                            document.addEventListener("touchstart", P),
                            document.addEventListener("touchend", P);
                    }
                    function T() {
                        document.removeEventListener("mousemove", P),
                            document.removeEventListener("mousedown", P),
                            document.removeEventListener("mouseup", P),
                            document.removeEventListener("pointermove", P),
                            document.removeEventListener("pointerdown", P),
                            document.removeEventListener("pointerup", P),
                            document.removeEventListener("touchmove", P),
                            document.removeEventListener("touchstart", P),
                            document.removeEventListener("touchend", P);
                    }
                    function P(L) {
                        (L.target.nodeName &&
                            L.target.nodeName.toLowerCase() === "html") ||
                            ((n = !1), T());
                    }
                    document.addEventListener("keydown", d, !0),
                        document.addEventListener("mousedown", b, !0),
                        document.addEventListener("pointerdown", b, !0),
                        document.addEventListener("touchstart", b, !0),
                        document.addEventListener("visibilitychange", I, !0),
                        O(),
                        r.addEventListener("focus", m, !0),
                        r.addEventListener("blur", y, !0);
                }
                function t() {
                    if (typeof document < "u")
                        try {
                            document.querySelector(":focus-visible");
                        } catch {
                            e(document);
                        }
                }
                return { ready: t };
            })
        );
    });
    var uu = l((bW, su) => {
        "use strict";
        var au = Ne();
        au.define(
            "focus",
            (su.exports = function () {
                var e = [],
                    t = !1;
                function r(s) {
                    t &&
                        (s.preventDefault(),
                        s.stopPropagation(),
                        s.stopImmediatePropagation(),
                        e.unshift(s));
                }
                function n(s) {
                    var a = s.target,
                        u = a.tagName;
                    return (
                        (/^a$/i.test(u) && a.href != null) ||
                        (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
                        (/^input$/i.test(u) &&
                            /^(button|reset|submit|radio|checkbox)$/i.test(
                                a.type
                            ) &&
                            !a.disabled) ||
                        (!/^(button|input|textarea|select|a)$/i.test(u) &&
                            !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
                        /^audio$/i.test(u) ||
                        (/^video$/i.test(u) && a.controls === !0)
                    );
                }
                function i(s) {
                    n(s) &&
                        ((t = !0),
                        setTimeout(() => {
                            for (t = !1, s.target.focus(); e.length > 0; ) {
                                var a = e.pop();
                                a.target.dispatchEvent(
                                    new MouseEvent(a.type, a)
                                );
                            }
                        }, 0));
                }
                function o() {
                    typeof document < "u" &&
                        document.body.hasAttribute("data-wf-focus-within") &&
                        au.env.safari &&
                        (document.addEventListener("mousedown", i, !0),
                        document.addEventListener("mouseup", r, !0),
                        document.addEventListener("click", r, !0));
                }
                return { ready: o };
            })
        );
    });
    var fu = l((_W, lu) => {
        "use strict";
        var Hi = window.jQuery,
            at = {},
            gn = [],
            cu = ".w-ix",
            vn = {
                reset: function (e, t) {
                    t.__wf_intro = null;
                },
                intro: function (e, t) {
                    t.__wf_intro ||
                        ((t.__wf_intro = !0),
                        Hi(t).triggerHandler(at.types.INTRO));
                },
                outro: function (e, t) {
                    t.__wf_intro &&
                        ((t.__wf_intro = null),
                        Hi(t).triggerHandler(at.types.OUTRO));
                },
            };
        at.triggers = {};
        at.types = { INTRO: "w-ix-intro" + cu, OUTRO: "w-ix-outro" + cu };
        at.init = function () {
            for (var e = gn.length, t = 0; t < e; t++) {
                var r = gn[t];
                r[0](0, r[1]);
            }
            (gn = []), Hi.extend(at.triggers, vn);
        };
        at.async = function () {
            for (var e in vn) {
                var t = vn[e];
                vn.hasOwnProperty(e) &&
                    (at.triggers[e] = function (r, n) {
                        gn.push([t, n]);
                    });
            }
        };
        at.async();
        lu.exports = at;
    });
    var jt = l((wW, gu) => {
        "use strict";
        var Bi = fu();
        function du(e, t) {
            var r = document.createEvent("CustomEvent");
            r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
        }
        var S_ = window.jQuery,
            hn = {},
            pu = ".w-ix",
            C_ = {
                reset: function (e, t) {
                    Bi.triggers.reset(e, t);
                },
                intro: function (e, t) {
                    Bi.triggers.intro(e, t), du(t, "COMPONENT_ACTIVE");
                },
                outro: function (e, t) {
                    Bi.triggers.outro(e, t), du(t, "COMPONENT_INACTIVE");
                },
            };
        hn.triggers = {};
        hn.types = { INTRO: "w-ix-intro" + pu, OUTRO: "w-ix-outro" + pu };
        S_.extend(hn.triggers, C_);
        gu.exports = hn;
    });
    var vu = l((IW, gt) => {
        function Xi(e) {
            return (
                (gt.exports = Xi =
                    typeof Symbol == "function" &&
                    typeof Symbol.iterator == "symbol"
                        ? function (t) {
                              return typeof t;
                          }
                        : function (t) {
                              return t &&
                                  typeof Symbol == "function" &&
                                  t.constructor === Symbol &&
                                  t !== Symbol.prototype
                                  ? "symbol"
                                  : typeof t;
                          }),
                (gt.exports.__esModule = !0),
                (gt.exports.default = gt.exports),
                Xi(e)
            );
        }
        (gt.exports = Xi),
            (gt.exports.__esModule = !0),
            (gt.exports.default = gt.exports);
    });
    var mn = l((TW, Tr) => {
        var R_ = vu().default;
        function hu(e) {
            if (typeof WeakMap != "function") return null;
            var t = new WeakMap(),
                r = new WeakMap();
            return (hu = function (i) {
                return i ? r : t;
            })(e);
        }
        function L_(e, t) {
            if (!t && e && e.__esModule) return e;
            if (e === null || (R_(e) != "object" && typeof e != "function"))
                return { default: e };
            var r = hu(t);
            if (r && r.has(e)) return r.get(e);
            var n = { __proto__: null },
                i = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
                if (o !== "default" && {}.hasOwnProperty.call(e, o)) {
                    var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                    s && (s.get || s.set)
                        ? Object.defineProperty(n, o, s)
                        : (n[o] = e[o]);
                }
            return (n.default = e), r && r.set(e, n), n;
        }
        (Tr.exports = L_),
            (Tr.exports.__esModule = !0),
            (Tr.exports.default = Tr.exports);
    });
    var mu = l((xW, xr) => {
        function N_(e) {
            return e && e.__esModule ? e : { default: e };
        }
        (xr.exports = N_),
            (xr.exports.__esModule = !0),
            (xr.exports.default = xr.exports);
    });
    var Ee = l((OW, yu) => {
        var yn = function (e) {
            return e && e.Math == Math && e;
        };
        yu.exports =
            yn(typeof globalThis == "object" && globalThis) ||
            yn(typeof window == "object" && window) ||
            yn(typeof self == "object" && self) ||
            yn(typeof global == "object" && global) ||
            (function () {
                return this;
            })() ||
            Function("return this")();
    });
    var zt = l((AW, Eu) => {
        Eu.exports = function (e) {
            try {
                return !!e();
            } catch {
                return !0;
            }
        };
    });
    var Pt = l((SW, bu) => {
        var P_ = zt();
        bu.exports = !P_(function () {
            return (
                Object.defineProperty({}, 1, {
                    get: function () {
                        return 7;
                    },
                })[1] != 7
            );
        });
    });
    var En = l((CW, _u) => {
        var Or = Function.prototype.call;
        _u.exports = Or.bind
            ? Or.bind(Or)
            : function () {
                  return Or.apply(Or, arguments);
              };
    });
    var xu = l((Tu) => {
        "use strict";
        var wu = {}.propertyIsEnumerable,
            Iu = Object.getOwnPropertyDescriptor,
            q_ = Iu && !wu.call({ 1: 2 }, 1);
        Tu.f = q_
            ? function (t) {
                  var r = Iu(this, t);
                  return !!r && r.enumerable;
              }
            : wu;
    });
    var ji = l((LW, Ou) => {
        Ou.exports = function (e, t) {
            return {
                enumerable: !(e & 1),
                configurable: !(e & 2),
                writable: !(e & 4),
                value: t,
            };
        };
    });
    var Qe = l((NW, Su) => {
        var Au = Function.prototype,
            zi = Au.bind,
            Ki = Au.call,
            M_ = zi && zi.bind(Ki);
        Su.exports = zi
            ? function (e) {
                  return e && M_(Ki, e);
              }
            : function (e) {
                  return (
                      e &&
                      function () {
                          return Ki.apply(e, arguments);
                      }
                  );
              };
    });
    var Lu = l((PW, Ru) => {
        var Cu = Qe(),
            F_ = Cu({}.toString),
            D_ = Cu("".slice);
        Ru.exports = function (e) {
            return D_(F_(e), 8, -1);
        };
    });
    var Pu = l((qW, Nu) => {
        var k_ = Ee(),
            G_ = Qe(),
            V_ = zt(),
            U_ = Lu(),
            Yi = k_.Object,
            W_ = G_("".split);
        Nu.exports = V_(function () {
            return !Yi("z").propertyIsEnumerable(0);
        })
            ? function (e) {
                  return U_(e) == "String" ? W_(e, "") : Yi(e);
              }
            : Yi;
    });
    var Qi = l((MW, qu) => {
        var H_ = Ee(),
            B_ = H_.TypeError;
        qu.exports = function (e) {
            if (e == null) throw B_("Can't call method on " + e);
            return e;
        };
    });
    var Ar = l((FW, Mu) => {
        var X_ = Pu(),
            j_ = Qi();
        Mu.exports = function (e) {
            return X_(j_(e));
        };
    });
    var st = l((DW, Fu) => {
        Fu.exports = function (e) {
            return typeof e == "function";
        };
    });
    var Kt = l((kW, Du) => {
        var z_ = st();
        Du.exports = function (e) {
            return typeof e == "object" ? e !== null : z_(e);
        };
    });
    var Sr = l((GW, ku) => {
        var $i = Ee(),
            K_ = st(),
            Y_ = function (e) {
                return K_(e) ? e : void 0;
            };
        ku.exports = function (e, t) {
            return arguments.length < 2 ? Y_($i[e]) : $i[e] && $i[e][t];
        };
    });
    var Vu = l((VW, Gu) => {
        var Q_ = Qe();
        Gu.exports = Q_({}.isPrototypeOf);
    });
    var Wu = l((UW, Uu) => {
        var $_ = Sr();
        Uu.exports = $_("navigator", "userAgent") || "";
    });
    var Yu = l((WW, Ku) => {
        var zu = Ee(),
            Zi = Wu(),
            Hu = zu.process,
            Bu = zu.Deno,
            Xu = (Hu && Hu.versions) || (Bu && Bu.version),
            ju = Xu && Xu.v8,
            $e,
            bn;
        ju &&
            (($e = ju.split(".")),
            (bn = $e[0] > 0 && $e[0] < 4 ? 1 : +($e[0] + $e[1])));
        !bn &&
            Zi &&
            (($e = Zi.match(/Edge\/(\d+)/)),
            (!$e || $e[1] >= 74) &&
                (($e = Zi.match(/Chrome\/(\d+)/)), $e && (bn = +$e[1])));
        Ku.exports = bn;
    });
    var Ji = l((HW, $u) => {
        var Qu = Yu(),
            Z_ = zt();
        $u.exports =
            !!Object.getOwnPropertySymbols &&
            !Z_(function () {
                var e = Symbol();
                return (
                    !String(e) ||
                    !(Object(e) instanceof Symbol) ||
                    (!Symbol.sham && Qu && Qu < 41)
                );
            });
    });
    var eo = l((BW, Zu) => {
        var J_ = Ji();
        Zu.exports = J_ && !Symbol.sham && typeof Symbol.iterator == "symbol";
    });
    var to = l((XW, Ju) => {
        var ew = Ee(),
            tw = Sr(),
            rw = st(),
            nw = Vu(),
            iw = eo(),
            ow = ew.Object;
        Ju.exports = iw
            ? function (e) {
                  return typeof e == "symbol";
              }
            : function (e) {
                  var t = tw("Symbol");
                  return rw(t) && nw(t.prototype, ow(e));
              };
    });
    var tc = l((jW, ec) => {
        var aw = Ee(),
            sw = aw.String;
        ec.exports = function (e) {
            try {
                return sw(e);
            } catch {
                return "Object";
            }
        };
    });
    var nc = l((zW, rc) => {
        var uw = Ee(),
            cw = st(),
            lw = tc(),
            fw = uw.TypeError;
        rc.exports = function (e) {
            if (cw(e)) return e;
            throw fw(lw(e) + " is not a function");
        };
    });
    var oc = l((KW, ic) => {
        var dw = nc();
        ic.exports = function (e, t) {
            var r = e[t];
            return r == null ? void 0 : dw(r);
        };
    });
    var sc = l((YW, ac) => {
        var pw = Ee(),
            ro = En(),
            no = st(),
            io = Kt(),
            gw = pw.TypeError;
        ac.exports = function (e, t) {
            var r, n;
            if (
                (t === "string" &&
                    no((r = e.toString)) &&
                    !io((n = ro(r, e)))) ||
                (no((r = e.valueOf)) && !io((n = ro(r, e)))) ||
                (t !== "string" && no((r = e.toString)) && !io((n = ro(r, e))))
            )
                return n;
            throw gw("Can't convert object to primitive value");
        };
    });
    var cc = l((QW, uc) => {
        uc.exports = !1;
    });
    var _n = l(($W, fc) => {
        var lc = Ee(),
            vw = Object.defineProperty;
        fc.exports = function (e, t) {
            try {
                vw(lc, e, { value: t, configurable: !0, writable: !0 });
            } catch {
                lc[e] = t;
            }
            return t;
        };
    });
    var wn = l((ZW, pc) => {
        var hw = Ee(),
            mw = _n(),
            dc = "__core-js_shared__",
            yw = hw[dc] || mw(dc, {});
        pc.exports = yw;
    });
    var oo = l((JW, vc) => {
        var Ew = cc(),
            gc = wn();
        (vc.exports = function (e, t) {
            return gc[e] || (gc[e] = t !== void 0 ? t : {});
        })("versions", []).push({
            version: "3.19.0",
            mode: Ew ? "pure" : "global",
            copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
        });
    });
    var mc = l((eH, hc) => {
        var bw = Ee(),
            _w = Qi(),
            ww = bw.Object;
        hc.exports = function (e) {
            return ww(_w(e));
        };
    });
    var wt = l((tH, yc) => {
        var Iw = Qe(),
            Tw = mc(),
            xw = Iw({}.hasOwnProperty);
        yc.exports =
            Object.hasOwn ||
            function (t, r) {
                return xw(Tw(t), r);
            };
    });
    var ao = l((rH, Ec) => {
        var Ow = Qe(),
            Aw = 0,
            Sw = Math.random(),
            Cw = Ow((1).toString);
        Ec.exports = function (e) {
            return (
                "Symbol(" + (e === void 0 ? "" : e) + ")_" + Cw(++Aw + Sw, 36)
            );
        };
    });
    var so = l((nH, Tc) => {
        var Rw = Ee(),
            Lw = oo(),
            bc = wt(),
            Nw = ao(),
            _c = Ji(),
            Ic = eo(),
            Yt = Lw("wks"),
            qt = Rw.Symbol,
            wc = qt && qt.for,
            Pw = Ic ? qt : (qt && qt.withoutSetter) || Nw;
        Tc.exports = function (e) {
            if (!bc(Yt, e) || !(_c || typeof Yt[e] == "string")) {
                var t = "Symbol." + e;
                _c && bc(qt, e)
                    ? (Yt[e] = qt[e])
                    : Ic && wc
                    ? (Yt[e] = wc(t))
                    : (Yt[e] = Pw(t));
            }
            return Yt[e];
        };
    });
    var Sc = l((iH, Ac) => {
        var qw = Ee(),
            Mw = En(),
            xc = Kt(),
            Oc = to(),
            Fw = oc(),
            Dw = sc(),
            kw = so(),
            Gw = qw.TypeError,
            Vw = kw("toPrimitive");
        Ac.exports = function (e, t) {
            if (!xc(e) || Oc(e)) return e;
            var r = Fw(e, Vw),
                n;
            if (r) {
                if (
                    (t === void 0 && (t = "default"),
                    (n = Mw(r, e, t)),
                    !xc(n) || Oc(n))
                )
                    return n;
                throw Gw("Can't convert object to primitive value");
            }
            return t === void 0 && (t = "number"), Dw(e, t);
        };
    });
    var uo = l((oH, Cc) => {
        var Uw = Sc(),
            Ww = to();
        Cc.exports = function (e) {
            var t = Uw(e, "string");
            return Ww(t) ? t : t + "";
        };
    });
    var lo = l((aH, Lc) => {
        var Hw = Ee(),
            Rc = Kt(),
            co = Hw.document,
            Bw = Rc(co) && Rc(co.createElement);
        Lc.exports = function (e) {
            return Bw ? co.createElement(e) : {};
        };
    });
    var fo = l((sH, Nc) => {
        var Xw = Pt(),
            jw = zt(),
            zw = lo();
        Nc.exports =
            !Xw &&
            !jw(function () {
                return (
                    Object.defineProperty(zw("div"), "a", {
                        get: function () {
                            return 7;
                        },
                    }).a != 7
                );
            });
    });
    var po = l((qc) => {
        var Kw = Pt(),
            Yw = En(),
            Qw = xu(),
            $w = ji(),
            Zw = Ar(),
            Jw = uo(),
            eI = wt(),
            tI = fo(),
            Pc = Object.getOwnPropertyDescriptor;
        qc.f = Kw
            ? Pc
            : function (t, r) {
                  if (((t = Zw(t)), (r = Jw(r)), tI))
                      try {
                          return Pc(t, r);
                      } catch {}
                  if (eI(t, r)) return $w(!Yw(Qw.f, t, r), t[r]);
              };
    });
    var Cr = l((cH, Fc) => {
        var Mc = Ee(),
            rI = Kt(),
            nI = Mc.String,
            iI = Mc.TypeError;
        Fc.exports = function (e) {
            if (rI(e)) return e;
            throw iI(nI(e) + " is not an object");
        };
    });
    var Rr = l((Gc) => {
        var oI = Ee(),
            aI = Pt(),
            sI = fo(),
            Dc = Cr(),
            uI = uo(),
            cI = oI.TypeError,
            kc = Object.defineProperty;
        Gc.f = aI
            ? kc
            : function (t, r, n) {
                  if ((Dc(t), (r = uI(r)), Dc(n), sI))
                      try {
                          return kc(t, r, n);
                      } catch {}
                  if ("get" in n || "set" in n)
                      throw cI("Accessors not supported");
                  return "value" in n && (t[r] = n.value), t;
              };
    });
    var In = l((fH, Vc) => {
        var lI = Pt(),
            fI = Rr(),
            dI = ji();
        Vc.exports = lI
            ? function (e, t, r) {
                  return fI.f(e, t, dI(1, r));
              }
            : function (e, t, r) {
                  return (e[t] = r), e;
              };
    });
    var vo = l((dH, Uc) => {
        var pI = Qe(),
            gI = st(),
            go = wn(),
            vI = pI(Function.toString);
        gI(go.inspectSource) ||
            (go.inspectSource = function (e) {
                return vI(e);
            });
        Uc.exports = go.inspectSource;
    });
    var Bc = l((pH, Hc) => {
        var hI = Ee(),
            mI = st(),
            yI = vo(),
            Wc = hI.WeakMap;
        Hc.exports = mI(Wc) && /native code/.test(yI(Wc));
    });
    var ho = l((gH, jc) => {
        var EI = oo(),
            bI = ao(),
            Xc = EI("keys");
        jc.exports = function (e) {
            return Xc[e] || (Xc[e] = bI(e));
        };
    });
    var Tn = l((vH, zc) => {
        zc.exports = {};
    });
    var Jc = l((hH, Zc) => {
        var _I = Bc(),
            $c = Ee(),
            mo = Qe(),
            wI = Kt(),
            II = In(),
            yo = wt(),
            Eo = wn(),
            TI = ho(),
            xI = Tn(),
            Kc = "Object already initialized",
            _o = $c.TypeError,
            OI = $c.WeakMap,
            xn,
            Lr,
            On,
            AI = function (e) {
                return On(e) ? Lr(e) : xn(e, {});
            },
            SI = function (e) {
                return function (t) {
                    var r;
                    if (!wI(t) || (r = Lr(t)).type !== e)
                        throw _o("Incompatible receiver, " + e + " required");
                    return r;
                };
            };
        _I || Eo.state
            ? ((It = Eo.state || (Eo.state = new OI())),
              (Yc = mo(It.get)),
              (bo = mo(It.has)),
              (Qc = mo(It.set)),
              (xn = function (e, t) {
                  if (bo(It, e)) throw new _o(Kc);
                  return (t.facade = e), Qc(It, e, t), t;
              }),
              (Lr = function (e) {
                  return Yc(It, e) || {};
              }),
              (On = function (e) {
                  return bo(It, e);
              }))
            : ((Mt = TI("state")),
              (xI[Mt] = !0),
              (xn = function (e, t) {
                  if (yo(e, Mt)) throw new _o(Kc);
                  return (t.facade = e), II(e, Mt, t), t;
              }),
              (Lr = function (e) {
                  return yo(e, Mt) ? e[Mt] : {};
              }),
              (On = function (e) {
                  return yo(e, Mt);
              }));
        var It, Yc, bo, Qc, Mt;
        Zc.exports = { set: xn, get: Lr, has: On, enforce: AI, getterFor: SI };
    });
    var rl = l((mH, tl) => {
        var wo = Pt(),
            CI = wt(),
            el = Function.prototype,
            RI = wo && Object.getOwnPropertyDescriptor,
            Io = CI(el, "name"),
            LI = Io && function () {}.name === "something",
            NI = Io && (!wo || (wo && RI(el, "name").configurable));
        tl.exports = { EXISTS: Io, PROPER: LI, CONFIGURABLE: NI };
    });
    var sl = l((yH, al) => {
        var PI = Ee(),
            nl = st(),
            qI = wt(),
            il = In(),
            MI = _n(),
            FI = vo(),
            ol = Jc(),
            DI = rl().CONFIGURABLE,
            kI = ol.get,
            GI = ol.enforce,
            VI = String(String).split("String");
        (al.exports = function (e, t, r, n) {
            var i = n ? !!n.unsafe : !1,
                o = n ? !!n.enumerable : !1,
                s = n ? !!n.noTargetGet : !1,
                a = n && n.name !== void 0 ? n.name : t,
                u;
            if (
                (nl(r) &&
                    (String(a).slice(0, 7) === "Symbol(" &&
                        (a =
                            "[" +
                            String(a).replace(/^Symbol\(([^)]*)\)/, "$1") +
                            "]"),
                    (!qI(r, "name") || (DI && r.name !== a)) &&
                        il(r, "name", a),
                    (u = GI(r)),
                    u.source ||
                        (u.source = VI.join(typeof a == "string" ? a : ""))),
                e === PI)
            ) {
                o ? (e[t] = r) : MI(t, r);
                return;
            } else i ? !s && e[t] && (o = !0) : delete e[t];
            o ? (e[t] = r) : il(e, t, r);
        })(Function.prototype, "toString", function () {
            return (nl(this) && kI(this).source) || FI(this);
        });
    });
    var To = l((EH, ul) => {
        var UI = Math.ceil,
            WI = Math.floor;
        ul.exports = function (e) {
            var t = +e;
            return t !== t || t === 0 ? 0 : (t > 0 ? WI : UI)(t);
        };
    });
    var ll = l((bH, cl) => {
        var HI = To(),
            BI = Math.max,
            XI = Math.min;
        cl.exports = function (e, t) {
            var r = HI(e);
            return r < 0 ? BI(r + t, 0) : XI(r, t);
        };
    });
    var dl = l((_H, fl) => {
        var jI = To(),
            zI = Math.min;
        fl.exports = function (e) {
            return e > 0 ? zI(jI(e), 9007199254740991) : 0;
        };
    });
    var gl = l((wH, pl) => {
        var KI = dl();
        pl.exports = function (e) {
            return KI(e.length);
        };
    });
    var xo = l((IH, hl) => {
        var YI = Ar(),
            QI = ll(),
            $I = gl(),
            vl = function (e) {
                return function (t, r, n) {
                    var i = YI(t),
                        o = $I(i),
                        s = QI(n, o),
                        a;
                    if (e && r != r) {
                        for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
                    } else
                        for (; o > s; s++)
                            if ((e || s in i) && i[s] === r) return e || s || 0;
                    return !e && -1;
                };
            };
        hl.exports = { includes: vl(!0), indexOf: vl(!1) };
    });
    var Ao = l((TH, yl) => {
        var ZI = Qe(),
            Oo = wt(),
            JI = Ar(),
            eT = xo().indexOf,
            tT = Tn(),
            ml = ZI([].push);
        yl.exports = function (e, t) {
            var r = JI(e),
                n = 0,
                i = [],
                o;
            for (o in r) !Oo(tT, o) && Oo(r, o) && ml(i, o);
            for (; t.length > n; )
                Oo(r, (o = t[n++])) && (~eT(i, o) || ml(i, o));
            return i;
        };
    });
    var An = l((xH, El) => {
        El.exports = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf",
        ];
    });
    var _l = l((bl) => {
        var rT = Ao(),
            nT = An(),
            iT = nT.concat("length", "prototype");
        bl.f =
            Object.getOwnPropertyNames ||
            function (t) {
                return rT(t, iT);
            };
    });
    var Il = l((wl) => {
        wl.f = Object.getOwnPropertySymbols;
    });
    var xl = l((SH, Tl) => {
        var oT = Sr(),
            aT = Qe(),
            sT = _l(),
            uT = Il(),
            cT = Cr(),
            lT = aT([].concat);
        Tl.exports =
            oT("Reflect", "ownKeys") ||
            function (t) {
                var r = sT.f(cT(t)),
                    n = uT.f;
                return n ? lT(r, n(t)) : r;
            };
    });
    var Al = l((CH, Ol) => {
        var fT = wt(),
            dT = xl(),
            pT = po(),
            gT = Rr();
        Ol.exports = function (e, t) {
            for (var r = dT(t), n = gT.f, i = pT.f, o = 0; o < r.length; o++) {
                var s = r[o];
                fT(e, s) || n(e, s, i(t, s));
            }
        };
    });
    var Cl = l((RH, Sl) => {
        var vT = zt(),
            hT = st(),
            mT = /#|\.prototype\./,
            Nr = function (e, t) {
                var r = ET[yT(e)];
                return r == _T ? !0 : r == bT ? !1 : hT(t) ? vT(t) : !!t;
            },
            yT = (Nr.normalize = function (e) {
                return String(e).replace(mT, ".").toLowerCase();
            }),
            ET = (Nr.data = {}),
            bT = (Nr.NATIVE = "N"),
            _T = (Nr.POLYFILL = "P");
        Sl.exports = Nr;
    });
    var Ll = l((LH, Rl) => {
        var So = Ee(),
            wT = po().f,
            IT = In(),
            TT = sl(),
            xT = _n(),
            OT = Al(),
            AT = Cl();
        Rl.exports = function (e, t) {
            var r = e.target,
                n = e.global,
                i = e.stat,
                o,
                s,
                a,
                u,
                f,
                E;
            if (
                (n
                    ? (s = So)
                    : i
                    ? (s = So[r] || xT(r, {}))
                    : (s = (So[r] || {}).prototype),
                s)
            )
                for (a in t) {
                    if (
                        ((f = t[a]),
                        e.noTargetGet
                            ? ((E = wT(s, a)), (u = E && E.value))
                            : (u = s[a]),
                        (o = AT(n ? a : r + (i ? "." : "#") + a, e.forced)),
                        !o && u !== void 0)
                    ) {
                        if (typeof f == typeof u) continue;
                        OT(f, u);
                    }
                    (e.sham || (u && u.sham)) && IT(f, "sham", !0),
                        TT(s, a, f, e);
                }
        };
    });
    var Pl = l((NH, Nl) => {
        var ST = Ao(),
            CT = An();
        Nl.exports =
            Object.keys ||
            function (t) {
                return ST(t, CT);
            };
    });
    var Ml = l((PH, ql) => {
        var RT = Pt(),
            LT = Rr(),
            NT = Cr(),
            PT = Ar(),
            qT = Pl();
        ql.exports = RT
            ? Object.defineProperties
            : function (t, r) {
                  NT(t);
                  for (
                      var n = PT(r), i = qT(r), o = i.length, s = 0, a;
                      o > s;

                  )
                      LT.f(t, (a = i[s++]), n[a]);
                  return t;
              };
    });
    var Dl = l((qH, Fl) => {
        var MT = Sr();
        Fl.exports = MT("document", "documentElement");
    });
    var Xl = l((MH, Bl) => {
        var FT = Cr(),
            DT = Ml(),
            kl = An(),
            kT = Tn(),
            GT = Dl(),
            VT = lo(),
            UT = ho(),
            Gl = ">",
            Vl = "<",
            Ro = "prototype",
            Lo = "script",
            Wl = UT("IE_PROTO"),
            Co = function () {},
            Hl = function (e) {
                return Vl + Lo + Gl + e + Vl + "/" + Lo + Gl;
            },
            Ul = function (e) {
                e.write(Hl("")), e.close();
                var t = e.parentWindow.Object;
                return (e = null), t;
            },
            WT = function () {
                var e = VT("iframe"),
                    t = "java" + Lo + ":",
                    r;
                return (
                    (e.style.display = "none"),
                    GT.appendChild(e),
                    (e.src = String(t)),
                    (r = e.contentWindow.document),
                    r.open(),
                    r.write(Hl("document.F=Object")),
                    r.close(),
                    r.F
                );
            },
            Sn,
            Cn = function () {
                try {
                    Sn = new ActiveXObject("htmlfile");
                } catch {}
                Cn =
                    typeof document < "u"
                        ? document.domain && Sn
                            ? Ul(Sn)
                            : WT()
                        : Ul(Sn);
                for (var e = kl.length; e--; ) delete Cn[Ro][kl[e]];
                return Cn();
            };
        kT[Wl] = !0;
        Bl.exports =
            Object.create ||
            function (t, r) {
                var n;
                return (
                    t !== null
                        ? ((Co[Ro] = FT(t)),
                          (n = new Co()),
                          (Co[Ro] = null),
                          (n[Wl] = t))
                        : (n = Cn()),
                    r === void 0 ? n : DT(n, r)
                );
            };
    });
    var zl = l((FH, jl) => {
        var HT = so(),
            BT = Xl(),
            XT = Rr(),
            No = HT("unscopables"),
            Po = Array.prototype;
        Po[No] == null && XT.f(Po, No, { configurable: !0, value: BT(null) });
        jl.exports = function (e) {
            Po[No][e] = !0;
        };
    });
    var Kl = l(() => {
        "use strict";
        var jT = Ll(),
            zT = xo().includes,
            KT = zl();
        jT(
            { target: "Array", proto: !0 },
            {
                includes: function (t) {
                    return zT(
                        this,
                        t,
                        arguments.length > 1 ? arguments[1] : void 0
                    );
                },
            }
        );
        KT("includes");
    });
    var Ql = l((GH, Yl) => {
        var YT = Ee(),
            QT = Qe();
        Yl.exports = function (e, t) {
            return QT(YT[e].prototype[t]);
        };
    });
    var Zl = l((VH, $l) => {
        Kl();
        var $T = Ql();
        $l.exports = $T("Array", "includes");
    });
    var ef = l((UH, Jl) => {
        var ZT = Zl();
        Jl.exports = ZT;
    });
    var rf = l((WH, tf) => {
        var JT = ef();
        tf.exports = JT;
    });
    var qo = l((HH, nf) => {
        var e0 =
            typeof global == "object" &&
            global &&
            global.Object === Object &&
            global;
        nf.exports = e0;
    });
    var Ze = l((BH, of) => {
        var t0 = qo(),
            r0 =
                typeof self == "object" &&
                self &&
                self.Object === Object &&
                self,
            n0 = t0 || r0 || Function("return this")();
        of.exports = n0;
    });
    var Qt = l((XH, af) => {
        var i0 = Ze(),
            o0 = i0.Symbol;
        af.exports = o0;
    });
    var lf = l((jH, cf) => {
        var sf = Qt(),
            uf = Object.prototype,
            a0 = uf.hasOwnProperty,
            s0 = uf.toString,
            Pr = sf ? sf.toStringTag : void 0;
        function u0(e) {
            var t = a0.call(e, Pr),
                r = e[Pr];
            try {
                e[Pr] = void 0;
                var n = !0;
            } catch {}
            var i = s0.call(e);
            return n && (t ? (e[Pr] = r) : delete e[Pr]), i;
        }
        cf.exports = u0;
    });
    var df = l((zH, ff) => {
        var c0 = Object.prototype,
            l0 = c0.toString;
        function f0(e) {
            return l0.call(e);
        }
        ff.exports = f0;
    });
    var Tt = l((KH, vf) => {
        var pf = Qt(),
            d0 = lf(),
            p0 = df(),
            g0 = "[object Null]",
            v0 = "[object Undefined]",
            gf = pf ? pf.toStringTag : void 0;
        function h0(e) {
            return e == null
                ? e === void 0
                    ? v0
                    : g0
                : gf && gf in Object(e)
                ? d0(e)
                : p0(e);
        }
        vf.exports = h0;
    });
    var Mo = l((YH, hf) => {
        function m0(e, t) {
            return function (r) {
                return e(t(r));
            };
        }
        hf.exports = m0;
    });
    var Fo = l((QH, mf) => {
        var y0 = Mo(),
            E0 = y0(Object.getPrototypeOf, Object);
        mf.exports = E0;
    });
    var vt = l(($H, yf) => {
        function b0(e) {
            return e != null && typeof e == "object";
        }
        yf.exports = b0;
    });
    var Do = l((ZH, bf) => {
        var _0 = Tt(),
            w0 = Fo(),
            I0 = vt(),
            T0 = "[object Object]",
            x0 = Function.prototype,
            O0 = Object.prototype,
            Ef = x0.toString,
            A0 = O0.hasOwnProperty,
            S0 = Ef.call(Object);
        function C0(e) {
            if (!I0(e) || _0(e) != T0) return !1;
            var t = w0(e);
            if (t === null) return !0;
            var r = A0.call(t, "constructor") && t.constructor;
            return typeof r == "function" && r instanceof r && Ef.call(r) == S0;
        }
        bf.exports = C0;
    });
    var _f = l((ko) => {
        "use strict";
        Object.defineProperty(ko, "__esModule", { value: !0 });
        ko.default = R0;
        function R0(e) {
            var t,
                r = e.Symbol;
            return (
                typeof r == "function"
                    ? r.observable
                        ? (t = r.observable)
                        : ((t = r("observable")), (r.observable = t))
                    : (t = "@@observable"),
                t
            );
        }
    });
    var wf = l((Vo, Go) => {
        "use strict";
        Object.defineProperty(Vo, "__esModule", { value: !0 });
        var L0 = _f(),
            N0 = P0(L0);
        function P0(e) {
            return e && e.__esModule ? e : { default: e };
        }
        var $t;
        typeof self < "u"
            ? ($t = self)
            : typeof window < "u"
            ? ($t = window)
            : typeof global < "u"
            ? ($t = global)
            : typeof Go < "u"
            ? ($t = Go)
            : ($t = Function("return this")());
        var q0 = (0, N0.default)($t);
        Vo.default = q0;
    });
    var Uo = l((qr) => {
        "use strict";
        qr.__esModule = !0;
        qr.ActionTypes = void 0;
        qr.default = Of;
        var M0 = Do(),
            F0 = xf(M0),
            D0 = wf(),
            If = xf(D0);
        function xf(e) {
            return e && e.__esModule ? e : { default: e };
        }
        var Tf = (qr.ActionTypes = { INIT: "@@redux/INIT" });
        function Of(e, t, r) {
            var n;
            if (
                (typeof t == "function" &&
                    typeof r > "u" &&
                    ((r = t), (t = void 0)),
                typeof r < "u")
            ) {
                if (typeof r != "function")
                    throw new Error("Expected the enhancer to be a function.");
                return r(Of)(e, t);
            }
            if (typeof e != "function")
                throw new Error("Expected the reducer to be a function.");
            var i = e,
                o = t,
                s = [],
                a = s,
                u = !1;
            function f() {
                a === s && (a = s.slice());
            }
            function E() {
                return o;
            }
            function d(I) {
                if (typeof I != "function")
                    throw new Error("Expected listener to be a function.");
                var O = !0;
                return (
                    f(),
                    a.push(I),
                    function () {
                        if (O) {
                            (O = !1), f();
                            var P = a.indexOf(I);
                            a.splice(P, 1);
                        }
                    }
                );
            }
            function b(I) {
                if (!(0, F0.default)(I))
                    throw new Error(
                        "Actions must be plain objects. Use custom middleware for async actions."
                    );
                if (typeof I.type > "u")
                    throw new Error(
                        'Actions may not have an undefined "type" property. Have you misspelled a constant?'
                    );
                if (u) throw new Error("Reducers may not dispatch actions.");
                try {
                    (u = !0), (o = i(o, I));
                } finally {
                    u = !1;
                }
                for (var O = (s = a), T = 0; T < O.length; T++) O[T]();
                return I;
            }
            function m(I) {
                if (typeof I != "function")
                    throw new Error(
                        "Expected the nextReducer to be a function."
                    );
                (i = I), b({ type: Tf.INIT });
            }
            function y() {
                var I,
                    O = d;
                return (
                    (I = {
                        subscribe: function (P) {
                            if (typeof P != "object")
                                throw new TypeError(
                                    "Expected the observer to be an object."
                                );
                            function L() {
                                P.next && P.next(E());
                            }
                            L();
                            var F = O(L);
                            return { unsubscribe: F };
                        },
                    }),
                    (I[If.default] = function () {
                        return this;
                    }),
                    I
                );
            }
            return (
                b({ type: Tf.INIT }),
                (n = {
                    dispatch: b,
                    subscribe: d,
                    getState: E,
                    replaceReducer: m,
                }),
                (n[If.default] = y),
                n
            );
        }
    });
    var Ho = l((Wo) => {
        "use strict";
        Wo.__esModule = !0;
        Wo.default = k0;
        function k0(e) {
            typeof console < "u" &&
                typeof console.error == "function" &&
                console.error(e);
            try {
                throw new Error(e);
            } catch {}
        }
    });
    var Cf = l((Bo) => {
        "use strict";
        Bo.__esModule = !0;
        Bo.default = H0;
        var Af = Uo(),
            G0 = Do(),
            rB = Sf(G0),
            V0 = Ho(),
            nB = Sf(V0);
        function Sf(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function U0(e, t) {
            var r = t && t.type,
                n = (r && '"' + r.toString() + '"') || "an action";
            return (
                "Given action " +
                n +
                ', reducer "' +
                e +
                '" returned undefined. To ignore an action, you must explicitly return the previous state.'
            );
        }
        function W0(e) {
            Object.keys(e).forEach(function (t) {
                var r = e[t],
                    n = r(void 0, { type: Af.ActionTypes.INIT });
                if (typeof n > "u")
                    throw new Error(
                        'Reducer "' +
                            t +
                            '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
                    );
                var i =
                    "@@redux/PROBE_UNKNOWN_ACTION_" +
                    Math.random().toString(36).substring(7).split("").join(".");
                if (typeof r(void 0, { type: i }) > "u")
                    throw new Error(
                        'Reducer "' +
                            t +
                            '" returned undefined when probed with a random type. ' +
                            ("Don't try to handle " +
                                Af.ActionTypes.INIT +
                                ' or other actions in "redux/*" ') +
                            "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
                    );
            });
        }
        function H0(e) {
            for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
                var i = t[n];
                typeof e[i] == "function" && (r[i] = e[i]);
            }
            var o = Object.keys(r);
            if (!1) var s;
            var a;
            try {
                W0(r);
            } catch (u) {
                a = u;
            }
            return function () {
                var f =
                        arguments.length <= 0 || arguments[0] === void 0
                            ? {}
                            : arguments[0],
                    E = arguments[1];
                if (a) throw a;
                if (!1) var d;
                for (var b = !1, m = {}, y = 0; y < o.length; y++) {
                    var I = o[y],
                        O = r[I],
                        T = f[I],
                        P = O(T, E);
                    if (typeof P > "u") {
                        var L = U0(I, E);
                        throw new Error(L);
                    }
                    (m[I] = P), (b = b || P !== T);
                }
                return b ? m : f;
            };
        }
    });
    var Lf = l((Xo) => {
        "use strict";
        Xo.__esModule = !0;
        Xo.default = B0;
        function Rf(e, t) {
            return function () {
                return t(e.apply(void 0, arguments));
            };
        }
        function B0(e, t) {
            if (typeof e == "function") return Rf(e, t);
            if (typeof e != "object" || e === null)
                throw new Error(
                    "bindActionCreators expected an object or a function, instead received " +
                        (e === null ? "null" : typeof e) +
                        '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
                );
            for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
                var o = r[i],
                    s = e[o];
                typeof s == "function" && (n[o] = Rf(s, t));
            }
            return n;
        }
    });
    var zo = l((jo) => {
        "use strict";
        jo.__esModule = !0;
        jo.default = X0;
        function X0() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            if (t.length === 0)
                return function (o) {
                    return o;
                };
            if (t.length === 1) return t[0];
            var n = t[t.length - 1],
                i = t.slice(0, -1);
            return function () {
                return i.reduceRight(function (o, s) {
                    return s(o);
                }, n.apply(void 0, arguments));
            };
        }
    });
    var Nf = l((Ko) => {
        "use strict";
        Ko.__esModule = !0;
        var j0 =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                        Object.prototype.hasOwnProperty.call(r, n) &&
                            (e[n] = r[n]);
                }
                return e;
            };
        Ko.default = Q0;
        var z0 = zo(),
            K0 = Y0(z0);
        function Y0(e) {
            return e && e.__esModule ? e : { default: e };
        }
        function Q0() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
            return function (n) {
                return function (i, o, s) {
                    var a = n(i, o, s),
                        u = a.dispatch,
                        f = [],
                        E = {
                            getState: a.getState,
                            dispatch: function (b) {
                                return u(b);
                            },
                        };
                    return (
                        (f = t.map(function (d) {
                            return d(E);
                        })),
                        (u = K0.default.apply(void 0, f)(a.dispatch)),
                        j0({}, a, { dispatch: u })
                    );
                };
            };
        }
    });
    var Yo = l((Xe) => {
        "use strict";
        Xe.__esModule = !0;
        Xe.compose =
            Xe.applyMiddleware =
            Xe.bindActionCreators =
            Xe.combineReducers =
            Xe.createStore =
                void 0;
        var $0 = Uo(),
            Z0 = Zt($0),
            J0 = Cf(),
            ex = Zt(J0),
            tx = Lf(),
            rx = Zt(tx),
            nx = Nf(),
            ix = Zt(nx),
            ox = zo(),
            ax = Zt(ox),
            sx = Ho(),
            uB = Zt(sx);
        function Zt(e) {
            return e && e.__esModule ? e : { default: e };
        }
        Xe.createStore = Z0.default;
        Xe.combineReducers = ex.default;
        Xe.bindActionCreators = rx.default;
        Xe.applyMiddleware = ix.default;
        Xe.compose = ax.default;
    });
    var Je,
        Qo,
        ut,
        ux,
        cx,
        Rn,
        lx,
        $o = ye(() => {
            "use strict";
            (Je = {
                NAVBAR_OPEN: "NAVBAR_OPEN",
                NAVBAR_CLOSE: "NAVBAR_CLOSE",
                TAB_ACTIVE: "TAB_ACTIVE",
                TAB_INACTIVE: "TAB_INACTIVE",
                SLIDER_ACTIVE: "SLIDER_ACTIVE",
                SLIDER_INACTIVE: "SLIDER_INACTIVE",
                DROPDOWN_OPEN: "DROPDOWN_OPEN",
                DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
                MOUSE_CLICK: "MOUSE_CLICK",
                MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
                MOUSE_DOWN: "MOUSE_DOWN",
                MOUSE_UP: "MOUSE_UP",
                MOUSE_OVER: "MOUSE_OVER",
                MOUSE_OUT: "MOUSE_OUT",
                MOUSE_MOVE: "MOUSE_MOVE",
                MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
                SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
                SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
                SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
                ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
                ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
                PAGE_START: "PAGE_START",
                PAGE_FINISH: "PAGE_FINISH",
                PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
                PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
                PAGE_SCROLL: "PAGE_SCROLL",
            }),
                (Qo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
                (ut = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
                (ux = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
                (cx = {
                    CHILDREN: "CHILDREN",
                    SIBLINGS: "SIBLINGS",
                    IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
                }),
                (Rn = {
                    FADE_EFFECT: "FADE_EFFECT",
                    SLIDE_EFFECT: "SLIDE_EFFECT",
                    GROW_EFFECT: "GROW_EFFECT",
                    SHRINK_EFFECT: "SHRINK_EFFECT",
                    SPIN_EFFECT: "SPIN_EFFECT",
                    FLY_EFFECT: "FLY_EFFECT",
                    POP_EFFECT: "POP_EFFECT",
                    FLIP_EFFECT: "FLIP_EFFECT",
                    JIGGLE_EFFECT: "JIGGLE_EFFECT",
                    PULSE_EFFECT: "PULSE_EFFECT",
                    DROP_EFFECT: "DROP_EFFECT",
                    BLINK_EFFECT: "BLINK_EFFECT",
                    BOUNCE_EFFECT: "BOUNCE_EFFECT",
                    FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
                    FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
                    RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
                    JELLO_EFFECT: "JELLO_EFFECT",
                    GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
                    SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
                    PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
                }),
                (lx = {
                    LEFT: "LEFT",
                    RIGHT: "RIGHT",
                    BOTTOM: "BOTTOM",
                    TOP: "TOP",
                    BOTTOM_LEFT: "BOTTOM_LEFT",
                    BOTTOM_RIGHT: "BOTTOM_RIGHT",
                    TOP_RIGHT: "TOP_RIGHT",
                    TOP_LEFT: "TOP_LEFT",
                    CLOCKWISE: "CLOCKWISE",
                    COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
                });
        });
    var Ue,
        fx,
        Ln = ye(() => {
            "use strict";
            (Ue = {
                TRANSFORM_MOVE: "TRANSFORM_MOVE",
                TRANSFORM_SCALE: "TRANSFORM_SCALE",
                TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
                TRANSFORM_SKEW: "TRANSFORM_SKEW",
                STYLE_OPACITY: "STYLE_OPACITY",
                STYLE_SIZE: "STYLE_SIZE",
                STYLE_FILTER: "STYLE_FILTER",
                STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
                STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
                STYLE_BORDER: "STYLE_BORDER",
                STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
                OBJECT_VALUE: "OBJECT_VALUE",
                PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
                PLUGIN_SPLINE: "PLUGIN_SPLINE",
                PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
                GENERAL_DISPLAY: "GENERAL_DISPLAY",
                GENERAL_START_ACTION: "GENERAL_START_ACTION",
                GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
                GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
                GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
                GENERAL_LOOP: "GENERAL_LOOP",
                STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
            }),
                (fx = {
                    ELEMENT: "ELEMENT",
                    ELEMENT_CLASS: "ELEMENT_CLASS",
                    TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
                });
        });
    var dx,
        Pf = ye(() => {
            "use strict";
            dx = {
                MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
                MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
                MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
                SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
                SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
                MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
                    "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
                PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
                PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
                PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
                NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
                DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
                ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
                TAB_INTERACTION: "TAB_INTERACTION",
                SLIDER_INTERACTION: "SLIDER_INTERACTION",
            };
        });
    var px,
        gx,
        vx,
        hx,
        mx,
        yx,
        Ex,
        Zo,
        qf = ye(() => {
            "use strict";
            Ln();
            ({
                TRANSFORM_MOVE: px,
                TRANSFORM_SCALE: gx,
                TRANSFORM_ROTATE: vx,
                TRANSFORM_SKEW: hx,
                STYLE_SIZE: mx,
                STYLE_FILTER: yx,
                STYLE_FONT_VARIATION: Ex,
            } = Ue),
                (Zo = {
                    [px]: !0,
                    [gx]: !0,
                    [vx]: !0,
                    [hx]: !0,
                    [mx]: !0,
                    [yx]: !0,
                    [Ex]: !0,
                });
        });
    var xe = {};
    Ve(xe, {
        IX2_ACTION_LIST_PLAYBACK_CHANGED: () => Fx,
        IX2_ANIMATION_FRAME_CHANGED: () => Rx,
        IX2_CLEAR_REQUESTED: () => Ax,
        IX2_ELEMENT_STATE_CHANGED: () => Mx,
        IX2_EVENT_LISTENER_ADDED: () => Sx,
        IX2_EVENT_STATE_CHANGED: () => Cx,
        IX2_INSTANCE_ADDED: () => Nx,
        IX2_INSTANCE_REMOVED: () => qx,
        IX2_INSTANCE_STARTED: () => Px,
        IX2_MEDIA_QUERIES_DEFINED: () => kx,
        IX2_PARAMETER_CHANGED: () => Lx,
        IX2_PLAYBACK_REQUESTED: () => xx,
        IX2_PREVIEW_REQUESTED: () => Tx,
        IX2_RAW_DATA_IMPORTED: () => bx,
        IX2_SESSION_INITIALIZED: () => _x,
        IX2_SESSION_STARTED: () => wx,
        IX2_SESSION_STOPPED: () => Ix,
        IX2_STOP_REQUESTED: () => Ox,
        IX2_TEST_FRAME_RENDERED: () => Gx,
        IX2_VIEWPORT_WIDTH_CHANGED: () => Dx,
    });
    var bx,
        _x,
        wx,
        Ix,
        Tx,
        xx,
        Ox,
        Ax,
        Sx,
        Cx,
        Rx,
        Lx,
        Nx,
        Px,
        qx,
        Mx,
        Fx,
        Dx,
        kx,
        Gx,
        Mf = ye(() => {
            "use strict";
            (bx = "IX2_RAW_DATA_IMPORTED"),
                (_x = "IX2_SESSION_INITIALIZED"),
                (wx = "IX2_SESSION_STARTED"),
                (Ix = "IX2_SESSION_STOPPED"),
                (Tx = "IX2_PREVIEW_REQUESTED"),
                (xx = "IX2_PLAYBACK_REQUESTED"),
                (Ox = "IX2_STOP_REQUESTED"),
                (Ax = "IX2_CLEAR_REQUESTED"),
                (Sx = "IX2_EVENT_LISTENER_ADDED"),
                (Cx = "IX2_EVENT_STATE_CHANGED"),
                (Rx = "IX2_ANIMATION_FRAME_CHANGED"),
                (Lx = "IX2_PARAMETER_CHANGED"),
                (Nx = "IX2_INSTANCE_ADDED"),
                (Px = "IX2_INSTANCE_STARTED"),
                (qx = "IX2_INSTANCE_REMOVED"),
                (Mx = "IX2_ELEMENT_STATE_CHANGED"),
                (Fx = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
                (Dx = "IX2_VIEWPORT_WIDTH_CHANGED"),
                (kx = "IX2_MEDIA_QUERIES_DEFINED"),
                (Gx = "IX2_TEST_FRAME_RENDERED");
        });
    var Pe = {};
    Ve(Pe, {
        ABSTRACT_NODE: () => DO,
        AUTO: () => OO,
        BACKGROUND: () => bO,
        BACKGROUND_COLOR: () => EO,
        BAR_DELIMITER: () => CO,
        BORDER_COLOR: () => _O,
        BOUNDARY_SELECTOR: () => Bx,
        CHILDREN: () => RO,
        COLON_DELIMITER: () => SO,
        COLOR: () => wO,
        COMMA_DELIMITER: () => AO,
        CONFIG_UNIT: () => Zx,
        CONFIG_VALUE: () => Kx,
        CONFIG_X_UNIT: () => Yx,
        CONFIG_X_VALUE: () => Xx,
        CONFIG_Y_UNIT: () => Qx,
        CONFIG_Y_VALUE: () => jx,
        CONFIG_Z_UNIT: () => $x,
        CONFIG_Z_VALUE: () => zx,
        DISPLAY: () => IO,
        FILTER: () => vO,
        FLEX: () => TO,
        FONT_VARIATION_SETTINGS: () => hO,
        HEIGHT: () => yO,
        HTML_ELEMENT: () => MO,
        IMMEDIATE_CHILDREN: () => LO,
        IX2_ID_DELIMITER: () => Vx,
        OPACITY: () => gO,
        PARENT: () => PO,
        PLAIN_OBJECT: () => FO,
        PRESERVE_3D: () => qO,
        RENDER_GENERAL: () => GO,
        RENDER_PLUGIN: () => UO,
        RENDER_STYLE: () => VO,
        RENDER_TRANSFORM: () => kO,
        ROTATE_X: () => uO,
        ROTATE_Y: () => cO,
        ROTATE_Z: () => lO,
        SCALE_3D: () => sO,
        SCALE_X: () => iO,
        SCALE_Y: () => oO,
        SCALE_Z: () => aO,
        SIBLINGS: () => NO,
        SKEW: () => fO,
        SKEW_X: () => dO,
        SKEW_Y: () => pO,
        TRANSFORM: () => Jx,
        TRANSLATE_3D: () => nO,
        TRANSLATE_X: () => eO,
        TRANSLATE_Y: () => tO,
        TRANSLATE_Z: () => rO,
        WF_PAGE: () => Ux,
        WIDTH: () => mO,
        WILL_CHANGE: () => xO,
        W_MOD_IX: () => Hx,
        W_MOD_JS: () => Wx,
    });
    var Vx,
        Ux,
        Wx,
        Hx,
        Bx,
        Xx,
        jx,
        zx,
        Kx,
        Yx,
        Qx,
        $x,
        Zx,
        Jx,
        eO,
        tO,
        rO,
        nO,
        iO,
        oO,
        aO,
        sO,
        uO,
        cO,
        lO,
        fO,
        dO,
        pO,
        gO,
        vO,
        hO,
        mO,
        yO,
        EO,
        bO,
        _O,
        wO,
        IO,
        TO,
        xO,
        OO,
        AO,
        SO,
        CO,
        RO,
        LO,
        NO,
        PO,
        qO,
        MO,
        FO,
        DO,
        kO,
        GO,
        VO,
        UO,
        Ff = ye(() => {
            "use strict";
            (Vx = "|"),
                (Ux = "data-wf-page"),
                (Wx = "w-mod-js"),
                (Hx = "w-mod-ix"),
                (Bx = ".w-dyn-item"),
                (Xx = "xValue"),
                (jx = "yValue"),
                (zx = "zValue"),
                (Kx = "value"),
                (Yx = "xUnit"),
                (Qx = "yUnit"),
                ($x = "zUnit"),
                (Zx = "unit"),
                (Jx = "transform"),
                (eO = "translateX"),
                (tO = "translateY"),
                (rO = "translateZ"),
                (nO = "translate3d"),
                (iO = "scaleX"),
                (oO = "scaleY"),
                (aO = "scaleZ"),
                (sO = "scale3d"),
                (uO = "rotateX"),
                (cO = "rotateY"),
                (lO = "rotateZ"),
                (fO = "skew"),
                (dO = "skewX"),
                (pO = "skewY"),
                (gO = "opacity"),
                (vO = "filter"),
                (hO = "font-variation-settings"),
                (mO = "width"),
                (yO = "height"),
                (EO = "backgroundColor"),
                (bO = "background"),
                (_O = "borderColor"),
                (wO = "color"),
                (IO = "display"),
                (TO = "flex"),
                (xO = "willChange"),
                (OO = "AUTO"),
                (AO = ","),
                (SO = ":"),
                (CO = "|"),
                (RO = "CHILDREN"),
                (LO = "IMMEDIATE_CHILDREN"),
                (NO = "SIBLINGS"),
                (PO = "PARENT"),
                (qO = "preserve-3d"),
                (MO = "HTML_ELEMENT"),
                (FO = "PLAIN_OBJECT"),
                (DO = "ABSTRACT_NODE"),
                (kO = "RENDER_TRANSFORM"),
                (GO = "RENDER_GENERAL"),
                (VO = "RENDER_STYLE"),
                (UO = "RENDER_PLUGIN");
        });
    var Df = {};
    Ve(Df, {
        ActionAppliesTo: () => fx,
        ActionTypeConsts: () => Ue,
        EventAppliesTo: () => Qo,
        EventBasedOn: () => ut,
        EventContinuousMouseAxes: () => ux,
        EventLimitAffectedElements: () => cx,
        EventTypeConsts: () => Je,
        IX2EngineActionTypes: () => xe,
        IX2EngineConstants: () => Pe,
        InteractionTypeConsts: () => dx,
        QuickEffectDirectionConsts: () => lx,
        QuickEffectIds: () => Rn,
        ReducedMotionTypes: () => Zo,
    });
    var We = ye(() => {
        "use strict";
        $o();
        Ln();
        Pf();
        qf();
        Mf();
        Ff();
        Ln();
        $o();
    });
    var WO,
        kf,
        Gf = ye(() => {
            "use strict";
            We();
            ({ IX2_RAW_DATA_IMPORTED: WO } = xe),
                (kf = (e = Object.freeze({}), t) => {
                    switch (t.type) {
                        case WO:
                            return t.payload.ixData || Object.freeze({});
                        default:
                            return e;
                    }
                });
        });
    var Jt = l((_e) => {
        "use strict";
        Object.defineProperty(_e, "__esModule", { value: !0 });
        var HO =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (e) {
                      return typeof e;
                  }
                : function (e) {
                      return e &&
                          typeof Symbol == "function" &&
                          e.constructor === Symbol &&
                          e !== Symbol.prototype
                          ? "symbol"
                          : typeof e;
                  };
        _e.clone = Pn;
        _e.addLast = Wf;
        _e.addFirst = Hf;
        _e.removeLast = Bf;
        _e.removeFirst = Xf;
        _e.insert = jf;
        _e.removeAt = zf;
        _e.replaceAt = Kf;
        _e.getIn = qn;
        _e.set = Mn;
        _e.setIn = Fn;
        _e.update = Qf;
        _e.updateIn = $f;
        _e.merge = Zf;
        _e.mergeDeep = Jf;
        _e.mergeIn = ed;
        _e.omit = td;
        _e.addDefaults = rd;
        var Vf = "INVALID_ARGS";
        function Uf(e) {
            throw new Error(e);
        }
        function Jo(e) {
            var t = Object.keys(e);
            return Object.getOwnPropertySymbols
                ? t.concat(Object.getOwnPropertySymbols(e))
                : t;
        }
        var BO = {}.hasOwnProperty;
        function Pn(e) {
            if (Array.isArray(e)) return e.slice();
            for (var t = Jo(e), r = {}, n = 0; n < t.length; n++) {
                var i = t[n];
                r[i] = e[i];
            }
            return r;
        }
        function He(e, t, r) {
            var n = r;
            n == null && Uf(Vf);
            for (
                var i = !1,
                    o = arguments.length,
                    s = Array(o > 3 ? o - 3 : 0),
                    a = 3;
                a < o;
                a++
            )
                s[a - 3] = arguments[a];
            for (var u = 0; u < s.length; u++) {
                var f = s[u];
                if (f != null) {
                    var E = Jo(f);
                    if (E.length)
                        for (var d = 0; d <= E.length; d++) {
                            var b = E[d];
                            if (!(e && n[b] !== void 0)) {
                                var m = f[b];
                                t &&
                                    Nn(n[b]) &&
                                    Nn(m) &&
                                    (m = He(e, t, n[b], m)),
                                    !(m === void 0 || m === n[b]) &&
                                        (i || ((i = !0), (n = Pn(n))),
                                        (n[b] = m));
                            }
                        }
                }
            }
            return n;
        }
        function Nn(e) {
            var t = typeof e > "u" ? "undefined" : HO(e);
            return e != null && (t === "object" || t === "function");
        }
        function Wf(e, t) {
            return Array.isArray(t) ? e.concat(t) : e.concat([t]);
        }
        function Hf(e, t) {
            return Array.isArray(t) ? t.concat(e) : [t].concat(e);
        }
        function Bf(e) {
            return e.length ? e.slice(0, e.length - 1) : e;
        }
        function Xf(e) {
            return e.length ? e.slice(1) : e;
        }
        function jf(e, t, r) {
            return e
                .slice(0, t)
                .concat(Array.isArray(r) ? r : [r])
                .concat(e.slice(t));
        }
        function zf(e, t) {
            return t >= e.length || t < 0
                ? e
                : e.slice(0, t).concat(e.slice(t + 1));
        }
        function Kf(e, t, r) {
            if (e[t] === r) return e;
            for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
            return (i[t] = r), i;
        }
        function qn(e, t) {
            if ((!Array.isArray(t) && Uf(Vf), e != null)) {
                for (var r = e, n = 0; n < t.length; n++) {
                    var i = t[n];
                    if (((r = r?.[i]), r === void 0)) return r;
                }
                return r;
            }
        }
        function Mn(e, t, r) {
            var n = typeof t == "number" ? [] : {},
                i = e ?? n;
            if (i[t] === r) return i;
            var o = Pn(i);
            return (o[t] = r), o;
        }
        function Yf(e, t, r, n) {
            var i = void 0,
                o = t[n];
            if (n === t.length - 1) i = r;
            else {
                var s =
                    Nn(e) && Nn(e[o])
                        ? e[o]
                        : typeof t[n + 1] == "number"
                        ? []
                        : {};
                i = Yf(s, t, r, n + 1);
            }
            return Mn(e, o, i);
        }
        function Fn(e, t, r) {
            return t.length ? Yf(e, t, r, 0) : r;
        }
        function Qf(e, t, r) {
            var n = e?.[t],
                i = r(n);
            return Mn(e, t, i);
        }
        function $f(e, t, r) {
            var n = qn(e, t),
                i = r(n);
            return Fn(e, t, i);
        }
        function Zf(e, t, r, n, i, o) {
            for (
                var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
                u < s;
                u++
            )
                a[u - 6] = arguments[u];
            return a.length
                ? He.call.apply(He, [null, !1, !1, e, t, r, n, i, o].concat(a))
                : He(!1, !1, e, t, r, n, i, o);
        }
        function Jf(e, t, r, n, i, o) {
            for (
                var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
                u < s;
                u++
            )
                a[u - 6] = arguments[u];
            return a.length
                ? He.call.apply(He, [null, !1, !0, e, t, r, n, i, o].concat(a))
                : He(!1, !0, e, t, r, n, i, o);
        }
        function ed(e, t, r, n, i, o, s) {
            var a = qn(e, t);
            a == null && (a = {});
            for (
                var u = void 0,
                    f = arguments.length,
                    E = Array(f > 7 ? f - 7 : 0),
                    d = 7;
                d < f;
                d++
            )
                E[d - 7] = arguments[d];
            return (
                E.length
                    ? (u = He.call.apply(
                          He,
                          [null, !1, !1, a, r, n, i, o, s].concat(E)
                      ))
                    : (u = He(!1, !1, a, r, n, i, o, s)),
                Fn(e, t, u)
            );
        }
        function td(e, t) {
            for (
                var r = Array.isArray(t) ? t : [t], n = !1, i = 0;
                i < r.length;
                i++
            )
                if (BO.call(e, r[i])) {
                    n = !0;
                    break;
                }
            if (!n) return e;
            for (var o = {}, s = Jo(e), a = 0; a < s.length; a++) {
                var u = s[a];
                r.indexOf(u) >= 0 || (o[u] = e[u]);
            }
            return o;
        }
        function rd(e, t, r, n, i, o) {
            for (
                var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
                u < s;
                u++
            )
                a[u - 6] = arguments[u];
            return a.length
                ? He.call.apply(He, [null, !0, !1, e, t, r, n, i, o].concat(a))
                : He(!0, !1, e, t, r, n, i, o);
        }
        var XO = {
            clone: Pn,
            addLast: Wf,
            addFirst: Hf,
            removeLast: Bf,
            removeFirst: Xf,
            insert: jf,
            removeAt: zf,
            replaceAt: Kf,
            getIn: qn,
            set: Mn,
            setIn: Fn,
            update: Qf,
            updateIn: $f,
            merge: Zf,
            mergeDeep: Jf,
            mergeIn: ed,
            omit: td,
            addDefaults: rd,
        };
        _e.default = XO;
    });
    var id,
        jO,
        zO,
        KO,
        YO,
        QO,
        nd,
        od,
        ad = ye(() => {
            "use strict";
            We();
            (id = pe(Jt())),
                ({
                    IX2_PREVIEW_REQUESTED: jO,
                    IX2_PLAYBACK_REQUESTED: zO,
                    IX2_STOP_REQUESTED: KO,
                    IX2_CLEAR_REQUESTED: YO,
                } = xe),
                (QO = { preview: {}, playback: {}, stop: {}, clear: {} }),
                (nd = Object.create(null, {
                    [jO]: { value: "preview" },
                    [zO]: { value: "playback" },
                    [KO]: { value: "stop" },
                    [YO]: { value: "clear" },
                })),
                (od = (e = QO, t) => {
                    if (t.type in nd) {
                        let r = [nd[t.type]];
                        return (0, id.setIn)(e, [r], { ...t.payload });
                    }
                    return e;
                });
        });
    var Fe,
        $O,
        ZO,
        JO,
        eA,
        tA,
        rA,
        nA,
        iA,
        oA,
        aA,
        sd,
        sA,
        ud,
        cd = ye(() => {
            "use strict";
            We();
            (Fe = pe(Jt())),
                ({
                    IX2_SESSION_INITIALIZED: $O,
                    IX2_SESSION_STARTED: ZO,
                    IX2_TEST_FRAME_RENDERED: JO,
                    IX2_SESSION_STOPPED: eA,
                    IX2_EVENT_LISTENER_ADDED: tA,
                    IX2_EVENT_STATE_CHANGED: rA,
                    IX2_ANIMATION_FRAME_CHANGED: nA,
                    IX2_ACTION_LIST_PLAYBACK_CHANGED: iA,
                    IX2_VIEWPORT_WIDTH_CHANGED: oA,
                    IX2_MEDIA_QUERIES_DEFINED: aA,
                } = xe),
                (sd = {
                    active: !1,
                    tick: 0,
                    eventListeners: [],
                    eventState: {},
                    playbackState: {},
                    viewportWidth: 0,
                    mediaQueryKey: null,
                    hasBoundaryNodes: !1,
                    hasDefinedMediaQueries: !1,
                    reducedMotion: !1,
                }),
                (sA = 20),
                (ud = (e = sd, t) => {
                    switch (t.type) {
                        case $O: {
                            let { hasBoundaryNodes: r, reducedMotion: n } =
                                t.payload;
                            return (0, Fe.merge)(e, {
                                hasBoundaryNodes: r,
                                reducedMotion: n,
                            });
                        }
                        case ZO:
                            return (0, Fe.set)(e, "active", !0);
                        case JO: {
                            let {
                                payload: { step: r = sA },
                            } = t;
                            return (0, Fe.set)(e, "tick", e.tick + r);
                        }
                        case eA:
                            return sd;
                        case nA: {
                            let {
                                payload: { now: r },
                            } = t;
                            return (0, Fe.set)(e, "tick", r);
                        }
                        case tA: {
                            let r = (0, Fe.addLast)(
                                e.eventListeners,
                                t.payload
                            );
                            return (0, Fe.set)(e, "eventListeners", r);
                        }
                        case rA: {
                            let { stateKey: r, newState: n } = t.payload;
                            return (0, Fe.setIn)(e, ["eventState", r], n);
                        }
                        case iA: {
                            let { actionListId: r, isPlaying: n } = t.payload;
                            return (0, Fe.setIn)(e, ["playbackState", r], n);
                        }
                        case oA: {
                            let { width: r, mediaQueries: n } = t.payload,
                                i = n.length,
                                o = null;
                            for (let s = 0; s < i; s++) {
                                let { key: a, min: u, max: f } = n[s];
                                if (r >= u && r <= f) {
                                    o = a;
                                    break;
                                }
                            }
                            return (0, Fe.merge)(e, {
                                viewportWidth: r,
                                mediaQueryKey: o,
                            });
                        }
                        case aA:
                            return (0, Fe.set)(e, "hasDefinedMediaQueries", !0);
                        default:
                            return e;
                    }
                });
        });
    var fd = l((SB, ld) => {
        function uA() {
            (this.__data__ = []), (this.size = 0);
        }
        ld.exports = uA;
    });
    var Dn = l((CB, dd) => {
        function cA(e, t) {
            return e === t || (e !== e && t !== t);
        }
        dd.exports = cA;
    });
    var Mr = l((RB, pd) => {
        var lA = Dn();
        function fA(e, t) {
            for (var r = e.length; r--; ) if (lA(e[r][0], t)) return r;
            return -1;
        }
        pd.exports = fA;
    });
    var vd = l((LB, gd) => {
        var dA = Mr(),
            pA = Array.prototype,
            gA = pA.splice;
        function vA(e) {
            var t = this.__data__,
                r = dA(t, e);
            if (r < 0) return !1;
            var n = t.length - 1;
            return r == n ? t.pop() : gA.call(t, r, 1), --this.size, !0;
        }
        gd.exports = vA;
    });
    var md = l((NB, hd) => {
        var hA = Mr();
        function mA(e) {
            var t = this.__data__,
                r = hA(t, e);
            return r < 0 ? void 0 : t[r][1];
        }
        hd.exports = mA;
    });
    var Ed = l((PB, yd) => {
        var yA = Mr();
        function EA(e) {
            return yA(this.__data__, e) > -1;
        }
        yd.exports = EA;
    });
    var _d = l((qB, bd) => {
        var bA = Mr();
        function _A(e, t) {
            var r = this.__data__,
                n = bA(r, e);
            return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
        }
        bd.exports = _A;
    });
    var Fr = l((MB, wd) => {
        var wA = fd(),
            IA = vd(),
            TA = md(),
            xA = Ed(),
            OA = _d();
        function er(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
                var n = e[t];
                this.set(n[0], n[1]);
            }
        }
        er.prototype.clear = wA;
        er.prototype.delete = IA;
        er.prototype.get = TA;
        er.prototype.has = xA;
        er.prototype.set = OA;
        wd.exports = er;
    });
    var Td = l((FB, Id) => {
        var AA = Fr();
        function SA() {
            (this.__data__ = new AA()), (this.size = 0);
        }
        Id.exports = SA;
    });
    var Od = l((DB, xd) => {
        function CA(e) {
            var t = this.__data__,
                r = t.delete(e);
            return (this.size = t.size), r;
        }
        xd.exports = CA;
    });
    var Sd = l((kB, Ad) => {
        function RA(e) {
            return this.__data__.get(e);
        }
        Ad.exports = RA;
    });
    var Rd = l((GB, Cd) => {
        function LA(e) {
            return this.__data__.has(e);
        }
        Cd.exports = LA;
    });
    var ct = l((VB, Ld) => {
        function NA(e) {
            var t = typeof e;
            return e != null && (t == "object" || t == "function");
        }
        Ld.exports = NA;
    });
    var ea = l((UB, Nd) => {
        var PA = Tt(),
            qA = ct(),
            MA = "[object AsyncFunction]",
            FA = "[object Function]",
            DA = "[object GeneratorFunction]",
            kA = "[object Proxy]";
        function GA(e) {
            if (!qA(e)) return !1;
            var t = PA(e);
            return t == FA || t == DA || t == MA || t == kA;
        }
        Nd.exports = GA;
    });
    var qd = l((WB, Pd) => {
        var VA = Ze(),
            UA = VA["__core-js_shared__"];
        Pd.exports = UA;
    });
    var Dd = l((HB, Fd) => {
        var ta = qd(),
            Md = (function () {
                var e = /[^.]+$/.exec(
                    (ta && ta.keys && ta.keys.IE_PROTO) || ""
                );
                return e ? "Symbol(src)_1." + e : "";
            })();
        function WA(e) {
            return !!Md && Md in e;
        }
        Fd.exports = WA;
    });
    var ra = l((BB, kd) => {
        var HA = Function.prototype,
            BA = HA.toString;
        function XA(e) {
            if (e != null) {
                try {
                    return BA.call(e);
                } catch {}
                try {
                    return e + "";
                } catch {}
            }
            return "";
        }
        kd.exports = XA;
    });
    var Vd = l((XB, Gd) => {
        var jA = ea(),
            zA = Dd(),
            KA = ct(),
            YA = ra(),
            QA = /[\\^$.*+?()[\]{}|]/g,
            $A = /^\[object .+?Constructor\]$/,
            ZA = Function.prototype,
            JA = Object.prototype,
            eS = ZA.toString,
            tS = JA.hasOwnProperty,
            rS = RegExp(
                "^" +
                    eS
                        .call(tS)
                        .replace(QA, "\\$&")
                        .replace(
                            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                            "$1.*?"
                        ) +
                    "$"
            );
        function nS(e) {
            if (!KA(e) || zA(e)) return !1;
            var t = jA(e) ? rS : $A;
            return t.test(YA(e));
        }
        Gd.exports = nS;
    });
    var Wd = l((jB, Ud) => {
        function iS(e, t) {
            return e?.[t];
        }
        Ud.exports = iS;
    });
    var xt = l((zB, Hd) => {
        var oS = Vd(),
            aS = Wd();
        function sS(e, t) {
            var r = aS(e, t);
            return oS(r) ? r : void 0;
        }
        Hd.exports = sS;
    });
    var kn = l((KB, Bd) => {
        var uS = xt(),
            cS = Ze(),
            lS = uS(cS, "Map");
        Bd.exports = lS;
    });
    var Dr = l((YB, Xd) => {
        var fS = xt(),
            dS = fS(Object, "create");
        Xd.exports = dS;
    });
    var Kd = l((QB, zd) => {
        var jd = Dr();
        function pS() {
            (this.__data__ = jd ? jd(null) : {}), (this.size = 0);
        }
        zd.exports = pS;
    });
    var Qd = l(($B, Yd) => {
        function gS(e) {
            var t = this.has(e) && delete this.__data__[e];
            return (this.size -= t ? 1 : 0), t;
        }
        Yd.exports = gS;
    });
    var Zd = l((ZB, $d) => {
        var vS = Dr(),
            hS = "__lodash_hash_undefined__",
            mS = Object.prototype,
            yS = mS.hasOwnProperty;
        function ES(e) {
            var t = this.__data__;
            if (vS) {
                var r = t[e];
                return r === hS ? void 0 : r;
            }
            return yS.call(t, e) ? t[e] : void 0;
        }
        $d.exports = ES;
    });
    var ep = l((JB, Jd) => {
        var bS = Dr(),
            _S = Object.prototype,
            wS = _S.hasOwnProperty;
        function IS(e) {
            var t = this.__data__;
            return bS ? t[e] !== void 0 : wS.call(t, e);
        }
        Jd.exports = IS;
    });
    var rp = l((e5, tp) => {
        var TS = Dr(),
            xS = "__lodash_hash_undefined__";
        function OS(e, t) {
            var r = this.__data__;
            return (
                (this.size += this.has(e) ? 0 : 1),
                (r[e] = TS && t === void 0 ? xS : t),
                this
            );
        }
        tp.exports = OS;
    });
    var ip = l((t5, np) => {
        var AS = Kd(),
            SS = Qd(),
            CS = Zd(),
            RS = ep(),
            LS = rp();
        function tr(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
                var n = e[t];
                this.set(n[0], n[1]);
            }
        }
        tr.prototype.clear = AS;
        tr.prototype.delete = SS;
        tr.prototype.get = CS;
        tr.prototype.has = RS;
        tr.prototype.set = LS;
        np.exports = tr;
    });
    var sp = l((r5, ap) => {
        var op = ip(),
            NS = Fr(),
            PS = kn();
        function qS() {
            (this.size = 0),
                (this.__data__ = {
                    hash: new op(),
                    map: new (PS || NS)(),
                    string: new op(),
                });
        }
        ap.exports = qS;
    });
    var cp = l((n5, up) => {
        function MS(e) {
            var t = typeof e;
            return t == "string" ||
                t == "number" ||
                t == "symbol" ||
                t == "boolean"
                ? e !== "__proto__"
                : e === null;
        }
        up.exports = MS;
    });
    var kr = l((i5, lp) => {
        var FS = cp();
        function DS(e, t) {
            var r = e.__data__;
            return FS(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
        }
        lp.exports = DS;
    });
    var dp = l((o5, fp) => {
        var kS = kr();
        function GS(e) {
            var t = kS(this, e).delete(e);
            return (this.size -= t ? 1 : 0), t;
        }
        fp.exports = GS;
    });
    var gp = l((a5, pp) => {
        var VS = kr();
        function US(e) {
            return VS(this, e).get(e);
        }
        pp.exports = US;
    });
    var hp = l((s5, vp) => {
        var WS = kr();
        function HS(e) {
            return WS(this, e).has(e);
        }
        vp.exports = HS;
    });
    var yp = l((u5, mp) => {
        var BS = kr();
        function XS(e, t) {
            var r = BS(this, e),
                n = r.size;
            return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
        }
        mp.exports = XS;
    });
    var Gn = l((c5, Ep) => {
        var jS = sp(),
            zS = dp(),
            KS = gp(),
            YS = hp(),
            QS = yp();
        function rr(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
                var n = e[t];
                this.set(n[0], n[1]);
            }
        }
        rr.prototype.clear = jS;
        rr.prototype.delete = zS;
        rr.prototype.get = KS;
        rr.prototype.has = YS;
        rr.prototype.set = QS;
        Ep.exports = rr;
    });
    var _p = l((l5, bp) => {
        var $S = Fr(),
            ZS = kn(),
            JS = Gn(),
            eC = 200;
        function tC(e, t) {
            var r = this.__data__;
            if (r instanceof $S) {
                var n = r.__data__;
                if (!ZS || n.length < eC - 1)
                    return n.push([e, t]), (this.size = ++r.size), this;
                r = this.__data__ = new JS(n);
            }
            return r.set(e, t), (this.size = r.size), this;
        }
        bp.exports = tC;
    });
    var na = l((f5, wp) => {
        var rC = Fr(),
            nC = Td(),
            iC = Od(),
            oC = Sd(),
            aC = Rd(),
            sC = _p();
        function nr(e) {
            var t = (this.__data__ = new rC(e));
            this.size = t.size;
        }
        nr.prototype.clear = nC;
        nr.prototype.delete = iC;
        nr.prototype.get = oC;
        nr.prototype.has = aC;
        nr.prototype.set = sC;
        wp.exports = nr;
    });
    var Tp = l((d5, Ip) => {
        var uC = "__lodash_hash_undefined__";
        function cC(e) {
            return this.__data__.set(e, uC), this;
        }
        Ip.exports = cC;
    });
    var Op = l((p5, xp) => {
        function lC(e) {
            return this.__data__.has(e);
        }
        xp.exports = lC;
    });
    var Sp = l((g5, Ap) => {
        var fC = Gn(),
            dC = Tp(),
            pC = Op();
        function Vn(e) {
            var t = -1,
                r = e == null ? 0 : e.length;
            for (this.__data__ = new fC(); ++t < r; ) this.add(e[t]);
        }
        Vn.prototype.add = Vn.prototype.push = dC;
        Vn.prototype.has = pC;
        Ap.exports = Vn;
    });
    var Rp = l((v5, Cp) => {
        function gC(e, t) {
            for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
                if (t(e[r], r, e)) return !0;
            return !1;
        }
        Cp.exports = gC;
    });
    var Np = l((h5, Lp) => {
        function vC(e, t) {
            return e.has(t);
        }
        Lp.exports = vC;
    });
    var ia = l((m5, Pp) => {
        var hC = Sp(),
            mC = Rp(),
            yC = Np(),
            EC = 1,
            bC = 2;
        function _C(e, t, r, n, i, o) {
            var s = r & EC,
                a = e.length,
                u = t.length;
            if (a != u && !(s && u > a)) return !1;
            var f = o.get(e),
                E = o.get(t);
            if (f && E) return f == t && E == e;
            var d = -1,
                b = !0,
                m = r & bC ? new hC() : void 0;
            for (o.set(e, t), o.set(t, e); ++d < a; ) {
                var y = e[d],
                    I = t[d];
                if (n) var O = s ? n(I, y, d, t, e, o) : n(y, I, d, e, t, o);
                if (O !== void 0) {
                    if (O) continue;
                    b = !1;
                    break;
                }
                if (m) {
                    if (
                        !mC(t, function (T, P) {
                            if (!yC(m, P) && (y === T || i(y, T, r, n, o)))
                                return m.push(P);
                        })
                    ) {
                        b = !1;
                        break;
                    }
                } else if (!(y === I || i(y, I, r, n, o))) {
                    b = !1;
                    break;
                }
            }
            return o.delete(e), o.delete(t), b;
        }
        Pp.exports = _C;
    });
    var Mp = l((y5, qp) => {
        var wC = Ze(),
            IC = wC.Uint8Array;
        qp.exports = IC;
    });
    var Dp = l((E5, Fp) => {
        function TC(e) {
            var t = -1,
                r = Array(e.size);
            return (
                e.forEach(function (n, i) {
                    r[++t] = [i, n];
                }),
                r
            );
        }
        Fp.exports = TC;
    });
    var Gp = l((b5, kp) => {
        function xC(e) {
            var t = -1,
                r = Array(e.size);
            return (
                e.forEach(function (n) {
                    r[++t] = n;
                }),
                r
            );
        }
        kp.exports = xC;
    });
    var Bp = l((_5, Hp) => {
        var Vp = Qt(),
            Up = Mp(),
            OC = Dn(),
            AC = ia(),
            SC = Dp(),
            CC = Gp(),
            RC = 1,
            LC = 2,
            NC = "[object Boolean]",
            PC = "[object Date]",
            qC = "[object Error]",
            MC = "[object Map]",
            FC = "[object Number]",
            DC = "[object RegExp]",
            kC = "[object Set]",
            GC = "[object String]",
            VC = "[object Symbol]",
            UC = "[object ArrayBuffer]",
            WC = "[object DataView]",
            Wp = Vp ? Vp.prototype : void 0,
            oa = Wp ? Wp.valueOf : void 0;
        function HC(e, t, r, n, i, o, s) {
            switch (r) {
                case WC:
                    if (
                        e.byteLength != t.byteLength ||
                        e.byteOffset != t.byteOffset
                    )
                        return !1;
                    (e = e.buffer), (t = t.buffer);
                case UC:
                    return !(
                        e.byteLength != t.byteLength || !o(new Up(e), new Up(t))
                    );
                case NC:
                case PC:
                case FC:
                    return OC(+e, +t);
                case qC:
                    return e.name == t.name && e.message == t.message;
                case DC:
                case GC:
                    return e == t + "";
                case MC:
                    var a = SC;
                case kC:
                    var u = n & RC;
                    if ((a || (a = CC), e.size != t.size && !u)) return !1;
                    var f = s.get(e);
                    if (f) return f == t;
                    (n |= LC), s.set(e, t);
                    var E = AC(a(e), a(t), n, i, o, s);
                    return s.delete(e), E;
                case VC:
                    if (oa) return oa.call(e) == oa.call(t);
            }
            return !1;
        }
        Hp.exports = HC;
    });
    var Un = l((w5, Xp) => {
        function BC(e, t) {
            for (var r = -1, n = t.length, i = e.length; ++r < n; )
                e[i + r] = t[r];
            return e;
        }
        Xp.exports = BC;
    });
    var Oe = l((I5, jp) => {
        var XC = Array.isArray;
        jp.exports = XC;
    });
    var aa = l((T5, zp) => {
        var jC = Un(),
            zC = Oe();
        function KC(e, t, r) {
            var n = t(e);
            return zC(e) ? n : jC(n, r(e));
        }
        zp.exports = KC;
    });
    var Yp = l((x5, Kp) => {
        function YC(e, t) {
            for (
                var r = -1, n = e == null ? 0 : e.length, i = 0, o = [];
                ++r < n;

            ) {
                var s = e[r];
                t(s, r, e) && (o[i++] = s);
            }
            return o;
        }
        Kp.exports = YC;
    });
    var sa = l((O5, Qp) => {
        function QC() {
            return [];
        }
        Qp.exports = QC;
    });
    var ua = l((A5, Zp) => {
        var $C = Yp(),
            ZC = sa(),
            JC = Object.prototype,
            eR = JC.propertyIsEnumerable,
            $p = Object.getOwnPropertySymbols,
            tR = $p
                ? function (e) {
                      return e == null
                          ? []
                          : ((e = Object(e)),
                            $C($p(e), function (t) {
                                return eR.call(e, t);
                            }));
                  }
                : ZC;
        Zp.exports = tR;
    });
    var eg = l((S5, Jp) => {
        function rR(e, t) {
            for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
            return n;
        }
        Jp.exports = rR;
    });
    var rg = l((C5, tg) => {
        var nR = Tt(),
            iR = vt(),
            oR = "[object Arguments]";
        function aR(e) {
            return iR(e) && nR(e) == oR;
        }
        tg.exports = aR;
    });
    var Gr = l((R5, og) => {
        var ng = rg(),
            sR = vt(),
            ig = Object.prototype,
            uR = ig.hasOwnProperty,
            cR = ig.propertyIsEnumerable,
            lR = ng(
                (function () {
                    return arguments;
                })()
            )
                ? ng
                : function (e) {
                      return (
                          sR(e) && uR.call(e, "callee") && !cR.call(e, "callee")
                      );
                  };
        og.exports = lR;
    });
    var sg = l((L5, ag) => {
        function fR() {
            return !1;
        }
        ag.exports = fR;
    });
    var Wn = l((Vr, ir) => {
        var dR = Ze(),
            pR = sg(),
            lg = typeof Vr == "object" && Vr && !Vr.nodeType && Vr,
            ug = lg && typeof ir == "object" && ir && !ir.nodeType && ir,
            gR = ug && ug.exports === lg,
            cg = gR ? dR.Buffer : void 0,
            vR = cg ? cg.isBuffer : void 0,
            hR = vR || pR;
        ir.exports = hR;
    });
    var Hn = l((N5, fg) => {
        var mR = 9007199254740991,
            yR = /^(?:0|[1-9]\d*)$/;
        function ER(e, t) {
            var r = typeof e;
            return (
                (t = t ?? mR),
                !!t &&
                    (r == "number" || (r != "symbol" && yR.test(e))) &&
                    e > -1 &&
                    e % 1 == 0 &&
                    e < t
            );
        }
        fg.exports = ER;
    });
    var Bn = l((P5, dg) => {
        var bR = 9007199254740991;
        function _R(e) {
            return typeof e == "number" && e > -1 && e % 1 == 0 && e <= bR;
        }
        dg.exports = _R;
    });
    var gg = l((q5, pg) => {
        var wR = Tt(),
            IR = Bn(),
            TR = vt(),
            xR = "[object Arguments]",
            OR = "[object Array]",
            AR = "[object Boolean]",
            SR = "[object Date]",
            CR = "[object Error]",
            RR = "[object Function]",
            LR = "[object Map]",
            NR = "[object Number]",
            PR = "[object Object]",
            qR = "[object RegExp]",
            MR = "[object Set]",
            FR = "[object String]",
            DR = "[object WeakMap]",
            kR = "[object ArrayBuffer]",
            GR = "[object DataView]",
            VR = "[object Float32Array]",
            UR = "[object Float64Array]",
            WR = "[object Int8Array]",
            HR = "[object Int16Array]",
            BR = "[object Int32Array]",
            XR = "[object Uint8Array]",
            jR = "[object Uint8ClampedArray]",
            zR = "[object Uint16Array]",
            KR = "[object Uint32Array]",
            me = {};
        me[VR] =
            me[UR] =
            me[WR] =
            me[HR] =
            me[BR] =
            me[XR] =
            me[jR] =
            me[zR] =
            me[KR] =
                !0;
        me[xR] =
            me[OR] =
            me[kR] =
            me[AR] =
            me[GR] =
            me[SR] =
            me[CR] =
            me[RR] =
            me[LR] =
            me[NR] =
            me[PR] =
            me[qR] =
            me[MR] =
            me[FR] =
            me[DR] =
                !1;
        function YR(e) {
            return TR(e) && IR(e.length) && !!me[wR(e)];
        }
        pg.exports = YR;
    });
    var hg = l((M5, vg) => {
        function QR(e) {
            return function (t) {
                return e(t);
            };
        }
        vg.exports = QR;
    });
    var yg = l((Ur, or) => {
        var $R = qo(),
            mg = typeof Ur == "object" && Ur && !Ur.nodeType && Ur,
            Wr = mg && typeof or == "object" && or && !or.nodeType && or,
            ZR = Wr && Wr.exports === mg,
            ca = ZR && $R.process,
            JR = (function () {
                try {
                    var e = Wr && Wr.require && Wr.require("util").types;
                    return e || (ca && ca.binding && ca.binding("util"));
                } catch {}
            })();
        or.exports = JR;
    });
    var Xn = l((F5, _g) => {
        var eL = gg(),
            tL = hg(),
            Eg = yg(),
            bg = Eg && Eg.isTypedArray,
            rL = bg ? tL(bg) : eL;
        _g.exports = rL;
    });
    var la = l((D5, wg) => {
        var nL = eg(),
            iL = Gr(),
            oL = Oe(),
            aL = Wn(),
            sL = Hn(),
            uL = Xn(),
            cL = Object.prototype,
            lL = cL.hasOwnProperty;
        function fL(e, t) {
            var r = oL(e),
                n = !r && iL(e),
                i = !r && !n && aL(e),
                o = !r && !n && !i && uL(e),
                s = r || n || i || o,
                a = s ? nL(e.length, String) : [],
                u = a.length;
            for (var f in e)
                (t || lL.call(e, f)) &&
                    !(
                        s &&
                        (f == "length" ||
                            (i && (f == "offset" || f == "parent")) ||
                            (o &&
                                (f == "buffer" ||
                                    f == "byteLength" ||
                                    f == "byteOffset")) ||
                            sL(f, u))
                    ) &&
                    a.push(f);
            return a;
        }
        wg.exports = fL;
    });
    var jn = l((k5, Ig) => {
        var dL = Object.prototype;
        function pL(e) {
            var t = e && e.constructor,
                r = (typeof t == "function" && t.prototype) || dL;
            return e === r;
        }
        Ig.exports = pL;
    });
    var xg = l((G5, Tg) => {
        var gL = Mo(),
            vL = gL(Object.keys, Object);
        Tg.exports = vL;
    });
    var zn = l((V5, Og) => {
        var hL = jn(),
            mL = xg(),
            yL = Object.prototype,
            EL = yL.hasOwnProperty;
        function bL(e) {
            if (!hL(e)) return mL(e);
            var t = [];
            for (var r in Object(e))
                EL.call(e, r) && r != "constructor" && t.push(r);
            return t;
        }
        Og.exports = bL;
    });
    var Ft = l((U5, Ag) => {
        var _L = ea(),
            wL = Bn();
        function IL(e) {
            return e != null && wL(e.length) && !_L(e);
        }
        Ag.exports = IL;
    });
    var Hr = l((W5, Sg) => {
        var TL = la(),
            xL = zn(),
            OL = Ft();
        function AL(e) {
            return OL(e) ? TL(e) : xL(e);
        }
        Sg.exports = AL;
    });
    var Rg = l((H5, Cg) => {
        var SL = aa(),
            CL = ua(),
            RL = Hr();
        function LL(e) {
            return SL(e, RL, CL);
        }
        Cg.exports = LL;
    });
    var Pg = l((B5, Ng) => {
        var Lg = Rg(),
            NL = 1,
            PL = Object.prototype,
            qL = PL.hasOwnProperty;
        function ML(e, t, r, n, i, o) {
            var s = r & NL,
                a = Lg(e),
                u = a.length,
                f = Lg(t),
                E = f.length;
            if (u != E && !s) return !1;
            for (var d = u; d--; ) {
                var b = a[d];
                if (!(s ? b in t : qL.call(t, b))) return !1;
            }
            var m = o.get(e),
                y = o.get(t);
            if (m && y) return m == t && y == e;
            var I = !0;
            o.set(e, t), o.set(t, e);
            for (var O = s; ++d < u; ) {
                b = a[d];
                var T = e[b],
                    P = t[b];
                if (n) var L = s ? n(P, T, b, t, e, o) : n(T, P, b, e, t, o);
                if (!(L === void 0 ? T === P || i(T, P, r, n, o) : L)) {
                    I = !1;
                    break;
                }
                O || (O = b == "constructor");
            }
            if (I && !O) {
                var F = e.constructor,
                    G = t.constructor;
                F != G &&
                    "constructor" in e &&
                    "constructor" in t &&
                    !(
                        typeof F == "function" &&
                        F instanceof F &&
                        typeof G == "function" &&
                        G instanceof G
                    ) &&
                    (I = !1);
            }
            return o.delete(e), o.delete(t), I;
        }
        Ng.exports = ML;
    });
    var Mg = l((X5, qg) => {
        var FL = xt(),
            DL = Ze(),
            kL = FL(DL, "DataView");
        qg.exports = kL;
    });
    var Dg = l((j5, Fg) => {
        var GL = xt(),
            VL = Ze(),
            UL = GL(VL, "Promise");
        Fg.exports = UL;
    });
    var Gg = l((z5, kg) => {
        var WL = xt(),
            HL = Ze(),
            BL = WL(HL, "Set");
        kg.exports = BL;
    });
    var fa = l((K5, Vg) => {
        var XL = xt(),
            jL = Ze(),
            zL = XL(jL, "WeakMap");
        Vg.exports = zL;
    });
    var Kn = l((Y5, zg) => {
        var da = Mg(),
            pa = kn(),
            ga = Dg(),
            va = Gg(),
            ha = fa(),
            jg = Tt(),
            ar = ra(),
            Ug = "[object Map]",
            KL = "[object Object]",
            Wg = "[object Promise]",
            Hg = "[object Set]",
            Bg = "[object WeakMap]",
            Xg = "[object DataView]",
            YL = ar(da),
            QL = ar(pa),
            $L = ar(ga),
            ZL = ar(va),
            JL = ar(ha),
            Dt = jg;
        ((da && Dt(new da(new ArrayBuffer(1))) != Xg) ||
            (pa && Dt(new pa()) != Ug) ||
            (ga && Dt(ga.resolve()) != Wg) ||
            (va && Dt(new va()) != Hg) ||
            (ha && Dt(new ha()) != Bg)) &&
            (Dt = function (e) {
                var t = jg(e),
                    r = t == KL ? e.constructor : void 0,
                    n = r ? ar(r) : "";
                if (n)
                    switch (n) {
                        case YL:
                            return Xg;
                        case QL:
                            return Ug;
                        case $L:
                            return Wg;
                        case ZL:
                            return Hg;
                        case JL:
                            return Bg;
                    }
                return t;
            });
        zg.exports = Dt;
    });
    var tv = l((Q5, ev) => {
        var ma = na(),
            eN = ia(),
            tN = Bp(),
            rN = Pg(),
            Kg = Kn(),
            Yg = Oe(),
            Qg = Wn(),
            nN = Xn(),
            iN = 1,
            $g = "[object Arguments]",
            Zg = "[object Array]",
            Yn = "[object Object]",
            oN = Object.prototype,
            Jg = oN.hasOwnProperty;
        function aN(e, t, r, n, i, o) {
            var s = Yg(e),
                a = Yg(t),
                u = s ? Zg : Kg(e),
                f = a ? Zg : Kg(t);
            (u = u == $g ? Yn : u), (f = f == $g ? Yn : f);
            var E = u == Yn,
                d = f == Yn,
                b = u == f;
            if (b && Qg(e)) {
                if (!Qg(t)) return !1;
                (s = !0), (E = !1);
            }
            if (b && !E)
                return (
                    o || (o = new ma()),
                    s || nN(e) ? eN(e, t, r, n, i, o) : tN(e, t, u, r, n, i, o)
                );
            if (!(r & iN)) {
                var m = E && Jg.call(e, "__wrapped__"),
                    y = d && Jg.call(t, "__wrapped__");
                if (m || y) {
                    var I = m ? e.value() : e,
                        O = y ? t.value() : t;
                    return o || (o = new ma()), i(I, O, r, n, o);
                }
            }
            return b ? (o || (o = new ma()), rN(e, t, r, n, i, o)) : !1;
        }
        ev.exports = aN;
    });
    var ya = l(($5, iv) => {
        var sN = tv(),
            rv = vt();
        function nv(e, t, r, n, i) {
            return e === t
                ? !0
                : e == null || t == null || (!rv(e) && !rv(t))
                ? e !== e && t !== t
                : sN(e, t, r, n, nv, i);
        }
        iv.exports = nv;
    });
    var av = l((Z5, ov) => {
        var uN = na(),
            cN = ya(),
            lN = 1,
            fN = 2;
        function dN(e, t, r, n) {
            var i = r.length,
                o = i,
                s = !n;
            if (e == null) return !o;
            for (e = Object(e); i--; ) {
                var a = r[i];
                if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
            }
            for (; ++i < o; ) {
                a = r[i];
                var u = a[0],
                    f = e[u],
                    E = a[1];
                if (s && a[2]) {
                    if (f === void 0 && !(u in e)) return !1;
                } else {
                    var d = new uN();
                    if (n) var b = n(f, E, u, e, t, d);
                    if (!(b === void 0 ? cN(E, f, lN | fN, n, d) : b))
                        return !1;
                }
            }
            return !0;
        }
        ov.exports = dN;
    });
    var Ea = l((J5, sv) => {
        var pN = ct();
        function gN(e) {
            return e === e && !pN(e);
        }
        sv.exports = gN;
    });
    var cv = l((eX, uv) => {
        var vN = Ea(),
            hN = Hr();
        function mN(e) {
            for (var t = hN(e), r = t.length; r--; ) {
                var n = t[r],
                    i = e[n];
                t[r] = [n, i, vN(i)];
            }
            return t;
        }
        uv.exports = mN;
    });
    var ba = l((tX, lv) => {
        function yN(e, t) {
            return function (r) {
                return r == null
                    ? !1
                    : r[e] === t && (t !== void 0 || e in Object(r));
            };
        }
        lv.exports = yN;
    });
    var dv = l((rX, fv) => {
        var EN = av(),
            bN = cv(),
            _N = ba();
        function wN(e) {
            var t = bN(e);
            return t.length == 1 && t[0][2]
                ? _N(t[0][0], t[0][1])
                : function (r) {
                      return r === e || EN(r, e, t);
                  };
        }
        fv.exports = wN;
    });
    var Br = l((nX, pv) => {
        var IN = Tt(),
            TN = vt(),
            xN = "[object Symbol]";
        function ON(e) {
            return typeof e == "symbol" || (TN(e) && IN(e) == xN);
        }
        pv.exports = ON;
    });
    var Qn = l((iX, gv) => {
        var AN = Oe(),
            SN = Br(),
            CN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            RN = /^\w*$/;
        function LN(e, t) {
            if (AN(e)) return !1;
            var r = typeof e;
            return r == "number" ||
                r == "symbol" ||
                r == "boolean" ||
                e == null ||
                SN(e)
                ? !0
                : RN.test(e) || !CN.test(e) || (t != null && e in Object(t));
        }
        gv.exports = LN;
    });
    var mv = l((oX, hv) => {
        var vv = Gn(),
            NN = "Expected a function";
        function _a(e, t) {
            if (typeof e != "function" || (t != null && typeof t != "function"))
                throw new TypeError(NN);
            var r = function () {
                var n = arguments,
                    i = t ? t.apply(this, n) : n[0],
                    o = r.cache;
                if (o.has(i)) return o.get(i);
                var s = e.apply(this, n);
                return (r.cache = o.set(i, s) || o), s;
            };
            return (r.cache = new (_a.Cache || vv)()), r;
        }
        _a.Cache = vv;
        hv.exports = _a;
    });
    var Ev = l((aX, yv) => {
        var PN = mv(),
            qN = 500;
        function MN(e) {
            var t = PN(e, function (n) {
                    return r.size === qN && r.clear(), n;
                }),
                r = t.cache;
            return t;
        }
        yv.exports = MN;
    });
    var _v = l((sX, bv) => {
        var FN = Ev(),
            DN =
                /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            kN = /\\(\\)?/g,
            GN = FN(function (e) {
                var t = [];
                return (
                    e.charCodeAt(0) === 46 && t.push(""),
                    e.replace(DN, function (r, n, i, o) {
                        t.push(i ? o.replace(kN, "$1") : n || r);
                    }),
                    t
                );
            });
        bv.exports = GN;
    });
    var wa = l((uX, wv) => {
        function VN(e, t) {
            for (
                var r = -1, n = e == null ? 0 : e.length, i = Array(n);
                ++r < n;

            )
                i[r] = t(e[r], r, e);
            return i;
        }
        wv.exports = VN;
    });
    var Sv = l((cX, Av) => {
        var Iv = Qt(),
            UN = wa(),
            WN = Oe(),
            HN = Br(),
            BN = 1 / 0,
            Tv = Iv ? Iv.prototype : void 0,
            xv = Tv ? Tv.toString : void 0;
        function Ov(e) {
            if (typeof e == "string") return e;
            if (WN(e)) return UN(e, Ov) + "";
            if (HN(e)) return xv ? xv.call(e) : "";
            var t = e + "";
            return t == "0" && 1 / e == -BN ? "-0" : t;
        }
        Av.exports = Ov;
    });
    var Rv = l((lX, Cv) => {
        var XN = Sv();
        function jN(e) {
            return e == null ? "" : XN(e);
        }
        Cv.exports = jN;
    });
    var Xr = l((fX, Lv) => {
        var zN = Oe(),
            KN = Qn(),
            YN = _v(),
            QN = Rv();
        function $N(e, t) {
            return zN(e) ? e : KN(e, t) ? [e] : YN(QN(e));
        }
        Lv.exports = $N;
    });
    var sr = l((dX, Nv) => {
        var ZN = Br(),
            JN = 1 / 0;
        function eP(e) {
            if (typeof e == "string" || ZN(e)) return e;
            var t = e + "";
            return t == "0" && 1 / e == -JN ? "-0" : t;
        }
        Nv.exports = eP;
    });
    var $n = l((pX, Pv) => {
        var tP = Xr(),
            rP = sr();
        function nP(e, t) {
            t = tP(t, e);
            for (var r = 0, n = t.length; e != null && r < n; )
                e = e[rP(t[r++])];
            return r && r == n ? e : void 0;
        }
        Pv.exports = nP;
    });
    var Zn = l((gX, qv) => {
        var iP = $n();
        function oP(e, t, r) {
            var n = e == null ? void 0 : iP(e, t);
            return n === void 0 ? r : n;
        }
        qv.exports = oP;
    });
    var Fv = l((vX, Mv) => {
        function aP(e, t) {
            return e != null && t in Object(e);
        }
        Mv.exports = aP;
    });
    var kv = l((hX, Dv) => {
        var sP = Xr(),
            uP = Gr(),
            cP = Oe(),
            lP = Hn(),
            fP = Bn(),
            dP = sr();
        function pP(e, t, r) {
            t = sP(t, e);
            for (var n = -1, i = t.length, o = !1; ++n < i; ) {
                var s = dP(t[n]);
                if (!(o = e != null && r(e, s))) break;
                e = e[s];
            }
            return o || ++n != i
                ? o
                : ((i = e == null ? 0 : e.length),
                  !!i && fP(i) && lP(s, i) && (cP(e) || uP(e)));
        }
        Dv.exports = pP;
    });
    var Vv = l((mX, Gv) => {
        var gP = Fv(),
            vP = kv();
        function hP(e, t) {
            return e != null && vP(e, t, gP);
        }
        Gv.exports = hP;
    });
    var Wv = l((yX, Uv) => {
        var mP = ya(),
            yP = Zn(),
            EP = Vv(),
            bP = Qn(),
            _P = Ea(),
            wP = ba(),
            IP = sr(),
            TP = 1,
            xP = 2;
        function OP(e, t) {
            return bP(e) && _P(t)
                ? wP(IP(e), t)
                : function (r) {
                      var n = yP(r, e);
                      return n === void 0 && n === t
                          ? EP(r, e)
                          : mP(t, n, TP | xP);
                  };
        }
        Uv.exports = OP;
    });
    var Jn = l((EX, Hv) => {
        function AP(e) {
            return e;
        }
        Hv.exports = AP;
    });
    var Ia = l((bX, Bv) => {
        function SP(e) {
            return function (t) {
                return t?.[e];
            };
        }
        Bv.exports = SP;
    });
    var jv = l((_X, Xv) => {
        var CP = $n();
        function RP(e) {
            return function (t) {
                return CP(t, e);
            };
        }
        Xv.exports = RP;
    });
    var Kv = l((wX, zv) => {
        var LP = Ia(),
            NP = jv(),
            PP = Qn(),
            qP = sr();
        function MP(e) {
            return PP(e) ? LP(qP(e)) : NP(e);
        }
        zv.exports = MP;
    });
    var Ot = l((IX, Yv) => {
        var FP = dv(),
            DP = Wv(),
            kP = Jn(),
            GP = Oe(),
            VP = Kv();
        function UP(e) {
            return typeof e == "function"
                ? e
                : e == null
                ? kP
                : typeof e == "object"
                ? GP(e)
                    ? DP(e[0], e[1])
                    : FP(e)
                : VP(e);
        }
        Yv.exports = UP;
    });
    var Ta = l((TX, Qv) => {
        var WP = Ot(),
            HP = Ft(),
            BP = Hr();
        function XP(e) {
            return function (t, r, n) {
                var i = Object(t);
                if (!HP(t)) {
                    var o = WP(r, 3);
                    (t = BP(t)),
                        (r = function (a) {
                            return o(i[a], a, i);
                        });
                }
                var s = e(t, r, n);
                return s > -1 ? i[o ? t[s] : s] : void 0;
            };
        }
        Qv.exports = XP;
    });
    var xa = l((xX, $v) => {
        function jP(e, t, r, n) {
            for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
                if (t(e[o], o, e)) return o;
            return -1;
        }
        $v.exports = jP;
    });
    var Jv = l((OX, Zv) => {
        var zP = /\s/;
        function KP(e) {
            for (var t = e.length; t-- && zP.test(e.charAt(t)); );
            return t;
        }
        Zv.exports = KP;
    });
    var th = l((AX, eh) => {
        var YP = Jv(),
            QP = /^\s+/;
        function $P(e) {
            return e && e.slice(0, YP(e) + 1).replace(QP, "");
        }
        eh.exports = $P;
    });
    var ei = l((SX, ih) => {
        var ZP = th(),
            rh = ct(),
            JP = Br(),
            nh = 0 / 0,
            eq = /^[-+]0x[0-9a-f]+$/i,
            tq = /^0b[01]+$/i,
            rq = /^0o[0-7]+$/i,
            nq = parseInt;
        function iq(e) {
            if (typeof e == "number") return e;
            if (JP(e)) return nh;
            if (rh(e)) {
                var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                e = rh(t) ? t + "" : t;
            }
            if (typeof e != "string") return e === 0 ? e : +e;
            e = ZP(e);
            var r = tq.test(e);
            return r || rq.test(e)
                ? nq(e.slice(2), r ? 2 : 8)
                : eq.test(e)
                ? nh
                : +e;
        }
        ih.exports = iq;
    });
    var sh = l((CX, ah) => {
        var oq = ei(),
            oh = 1 / 0,
            aq = 17976931348623157e292;
        function sq(e) {
            if (!e) return e === 0 ? e : 0;
            if (((e = oq(e)), e === oh || e === -oh)) {
                var t = e < 0 ? -1 : 1;
                return t * aq;
            }
            return e === e ? e : 0;
        }
        ah.exports = sq;
    });
    var Oa = l((RX, uh) => {
        var uq = sh();
        function cq(e) {
            var t = uq(e),
                r = t % 1;
            return t === t ? (r ? t - r : t) : 0;
        }
        uh.exports = cq;
    });
    var lh = l((LX, ch) => {
        var lq = xa(),
            fq = Ot(),
            dq = Oa(),
            pq = Math.max;
        function gq(e, t, r) {
            var n = e == null ? 0 : e.length;
            if (!n) return -1;
            var i = r == null ? 0 : dq(r);
            return i < 0 && (i = pq(n + i, 0)), lq(e, fq(t, 3), i);
        }
        ch.exports = gq;
    });
    var Aa = l((NX, fh) => {
        var vq = Ta(),
            hq = lh(),
            mq = vq(hq);
        fh.exports = mq;
    });
    var gh = {};
    Ve(gh, {
        ELEMENT_MATCHES: () => yq,
        FLEX_PREFIXED: () => Sa,
        IS_BROWSER_ENV: () => et,
        TRANSFORM_PREFIXED: () => At,
        TRANSFORM_STYLE_PREFIXED: () => ri,
        withBrowser: () => ti,
    });
    var ph,
        et,
        ti,
        yq,
        Sa,
        At,
        dh,
        ri,
        ni = ye(() => {
            "use strict";
            (ph = pe(Aa())),
                (et = typeof window < "u"),
                (ti = (e, t) => (et ? e() : t)),
                (yq = ti(() =>
                    (0, ph.default)(
                        [
                            "matches",
                            "matchesSelector",
                            "mozMatchesSelector",
                            "msMatchesSelector",
                            "oMatchesSelector",
                            "webkitMatchesSelector",
                        ],
                        (e) => e in Element.prototype
                    )
                )),
                (Sa = ti(() => {
                    let e = document.createElement("i"),
                        t = [
                            "flex",
                            "-webkit-flex",
                            "-ms-flexbox",
                            "-moz-box",
                            "-webkit-box",
                        ],
                        r = "";
                    try {
                        let { length: n } = t;
                        for (let i = 0; i < n; i++) {
                            let o = t[i];
                            if (((e.style.display = o), e.style.display === o))
                                return o;
                        }
                        return r;
                    } catch {
                        return r;
                    }
                }, "flex")),
                (At = ti(() => {
                    let e = document.createElement("i");
                    if (e.style.transform == null) {
                        let t = ["Webkit", "Moz", "ms"],
                            r = "Transform",
                            { length: n } = t;
                        for (let i = 0; i < n; i++) {
                            let o = t[i] + r;
                            if (e.style[o] !== void 0) return o;
                        }
                    }
                    return "transform";
                }, "transform")),
                (dh = At.split("transform")[0]),
                (ri = dh ? dh + "TransformStyle" : "transformStyle");
        });
    var Ca = l((PX, Eh) => {
        var Eq = 4,
            bq = 0.001,
            _q = 1e-7,
            wq = 10,
            jr = 11,
            ii = 1 / (jr - 1),
            Iq = typeof Float32Array == "function";
        function vh(e, t) {
            return 1 - 3 * t + 3 * e;
        }
        function hh(e, t) {
            return 3 * t - 6 * e;
        }
        function mh(e) {
            return 3 * e;
        }
        function oi(e, t, r) {
            return ((vh(t, r) * e + hh(t, r)) * e + mh(t)) * e;
        }
        function yh(e, t, r) {
            return 3 * vh(t, r) * e * e + 2 * hh(t, r) * e + mh(t);
        }
        function Tq(e, t, r, n, i) {
            var o,
                s,
                a = 0;
            do
                (s = t + (r - t) / 2),
                    (o = oi(s, n, i) - e),
                    o > 0 ? (r = s) : (t = s);
            while (Math.abs(o) > _q && ++a < wq);
            return s;
        }
        function xq(e, t, r, n) {
            for (var i = 0; i < Eq; ++i) {
                var o = yh(t, r, n);
                if (o === 0) return t;
                var s = oi(t, r, n) - e;
                t -= s / o;
            }
            return t;
        }
        Eh.exports = function (t, r, n, i) {
            if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
                throw new Error("bezier x values must be in [0, 1] range");
            var o = Iq ? new Float32Array(jr) : new Array(jr);
            if (t !== r || n !== i)
                for (var s = 0; s < jr; ++s) o[s] = oi(s * ii, t, n);
            function a(u) {
                for (var f = 0, E = 1, d = jr - 1; E !== d && o[E] <= u; ++E)
                    f += ii;
                --E;
                var b = (u - o[E]) / (o[E + 1] - o[E]),
                    m = f + b * ii,
                    y = yh(m, t, n);
                return y >= bq
                    ? xq(u, m, t, n)
                    : y === 0
                    ? m
                    : Tq(u, f, f + ii, t, n);
            }
            return function (f) {
                return t === r && n === i
                    ? f
                    : f === 0
                    ? 0
                    : f === 1
                    ? 1
                    : oi(a(f), r, i);
            };
        };
    });
    var Kr = {};
    Ve(Kr, {
        bounce: () => s1,
        bouncePast: () => u1,
        ease: () => Oq,
        easeIn: () => Aq,
        easeInOut: () => Cq,
        easeOut: () => Sq,
        inBack: () => Zq,
        inCirc: () => Kq,
        inCubic: () => Pq,
        inElastic: () => t1,
        inExpo: () => Xq,
        inOutBack: () => e1,
        inOutCirc: () => Qq,
        inOutCubic: () => Mq,
        inOutElastic: () => n1,
        inOutExpo: () => zq,
        inOutQuad: () => Nq,
        inOutQuart: () => kq,
        inOutQuint: () => Uq,
        inOutSine: () => Bq,
        inQuad: () => Rq,
        inQuart: () => Fq,
        inQuint: () => Gq,
        inSine: () => Wq,
        outBack: () => Jq,
        outBounce: () => $q,
        outCirc: () => Yq,
        outCubic: () => qq,
        outElastic: () => r1,
        outExpo: () => jq,
        outQuad: () => Lq,
        outQuart: () => Dq,
        outQuint: () => Vq,
        outSine: () => Hq,
        swingFrom: () => o1,
        swingFromTo: () => i1,
        swingTo: () => a1,
    });
    function Rq(e) {
        return Math.pow(e, 2);
    }
    function Lq(e) {
        return -(Math.pow(e - 1, 2) - 1);
    }
    function Nq(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 2)
            : -0.5 * ((e -= 2) * e - 2);
    }
    function Pq(e) {
        return Math.pow(e, 3);
    }
    function qq(e) {
        return Math.pow(e - 1, 3) + 1;
    }
    function Mq(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 3)
            : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function Fq(e) {
        return Math.pow(e, 4);
    }
    function Dq(e) {
        return -(Math.pow(e - 1, 4) - 1);
    }
    function kq(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 4)
            : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function Gq(e) {
        return Math.pow(e, 5);
    }
    function Vq(e) {
        return Math.pow(e - 1, 5) + 1;
    }
    function Uq(e) {
        return (e /= 0.5) < 1
            ? 0.5 * Math.pow(e, 5)
            : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function Wq(e) {
        return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function Hq(e) {
        return Math.sin(e * (Math.PI / 2));
    }
    function Bq(e) {
        return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function Xq(e) {
        return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function jq(e) {
        return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function zq(e) {
        return e === 0
            ? 0
            : e === 1
            ? 1
            : (e /= 0.5) < 1
            ? 0.5 * Math.pow(2, 10 * (e - 1))
            : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function Kq(e) {
        return -(Math.sqrt(1 - e * e) - 1);
    }
    function Yq(e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function Qq(e) {
        return (e /= 0.5) < 1
            ? -0.5 * (Math.sqrt(1 - e * e) - 1)
            : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function $q(e) {
        return e < 1 / 2.75
            ? 7.5625 * e * e
            : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
            ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
            : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function Zq(e) {
        let t = ht;
        return e * e * ((t + 1) * e - t);
    }
    function Jq(e) {
        let t = ht;
        return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function e1(e) {
        let t = ht;
        return (e /= 0.5) < 1
            ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
            : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function t1(e) {
        let t = ht,
            r = 0,
            n = 1;
        return e === 0
            ? 0
            : e === 1
            ? 1
            : (r || (r = 0.3),
              n < 1
                  ? ((n = 1), (t = r / 4))
                  : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
              -(
                  n *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin(((e - t) * (2 * Math.PI)) / r)
              ));
    }
    function r1(e) {
        let t = ht,
            r = 0,
            n = 1;
        return e === 0
            ? 0
            : e === 1
            ? 1
            : (r || (r = 0.3),
              n < 1
                  ? ((n = 1), (t = r / 4))
                  : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
              n *
                  Math.pow(2, -10 * e) *
                  Math.sin(((e - t) * (2 * Math.PI)) / r) +
                  1);
    }
    function n1(e) {
        let t = ht,
            r = 0,
            n = 1;
        return e === 0
            ? 0
            : (e /= 1 / 2) === 2
            ? 1
            : (r || (r = 0.3 * 1.5),
              n < 1
                  ? ((n = 1), (t = r / 4))
                  : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
              e < 1
                  ? -0.5 *
                    (n *
                        Math.pow(2, 10 * (e -= 1)) *
                        Math.sin(((e - t) * (2 * Math.PI)) / r))
                  : n *
                        Math.pow(2, -10 * (e -= 1)) *
                        Math.sin(((e - t) * (2 * Math.PI)) / r) *
                        0.5 +
                    1);
    }
    function i1(e) {
        let t = ht;
        return (e /= 0.5) < 1
            ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
            : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function o1(e) {
        let t = ht;
        return e * e * ((t + 1) * e - t);
    }
    function a1(e) {
        let t = ht;
        return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function s1(e) {
        return e < 1 / 2.75
            ? 7.5625 * e * e
            : e < 2 / 2.75
            ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
            : e < 2.5 / 2.75
            ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
            : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function u1(e) {
        return e < 1 / 2.75
            ? 7.5625 * e * e
            : e < 2 / 2.75
            ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
            : e < 2.5 / 2.75
            ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
            : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
    var zr,
        ht,
        Oq,
        Aq,
        Sq,
        Cq,
        Ra = ye(() => {
            "use strict";
            (zr = pe(Ca())),
                (ht = 1.70158),
                (Oq = (0, zr.default)(0.25, 0.1, 0.25, 1)),
                (Aq = (0, zr.default)(0.42, 0, 1, 1)),
                (Sq = (0, zr.default)(0, 0, 0.58, 1)),
                (Cq = (0, zr.default)(0.42, 0, 0.58, 1));
        });
    var _h = {};
    Ve(_h, {
        applyEasing: () => l1,
        createBezierEasing: () => c1,
        optimizeFloat: () => Yr,
    });
    function Yr(e, t = 5, r = 10) {
        let n = Math.pow(r, t),
            i = Number(Math.round(e * n) / n);
        return Math.abs(i) > 1e-4 ? i : 0;
    }
    function c1(e) {
        return (0, bh.default)(...e);
    }
    function l1(e, t, r) {
        return t === 0
            ? 0
            : t === 1
            ? 1
            : Yr(r ? (t > 0 ? r(t) : t) : t > 0 && e && Kr[e] ? Kr[e](t) : t);
    }
    var bh,
        La = ye(() => {
            "use strict";
            Ra();
            bh = pe(Ca());
        });
    var Th = {};
    Ve(Th, {
        createElementState: () => Ih,
        ixElements: () => T1,
        mergeActionState: () => Na,
    });
    function Ih(e, t, r, n, i) {
        let o =
            r === f1
                ? (0, ur.getIn)(i, ["config", "target", "objectId"])
                : null;
        return (0, ur.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
    }
    function Na(e, t, r, n, i) {
        let o = O1(i);
        return (0, ur.mergeIn)(e, [t, I1, r], n, o);
    }
    function O1(e) {
        let { config: t } = e;
        return x1.reduce((r, n) => {
            let i = n[0],
                o = n[1],
                s = t[i],
                a = t[o];
            return s != null && a != null && (r[o] = a), r;
        }, {});
    }
    var ur,
        MX,
        f1,
        FX,
        d1,
        p1,
        g1,
        v1,
        h1,
        m1,
        y1,
        E1,
        b1,
        _1,
        w1,
        wh,
        I1,
        T1,
        x1,
        xh = ye(() => {
            "use strict";
            ur = pe(Jt());
            We();
            ({
                HTML_ELEMENT: MX,
                PLAIN_OBJECT: f1,
                ABSTRACT_NODE: FX,
                CONFIG_X_VALUE: d1,
                CONFIG_Y_VALUE: p1,
                CONFIG_Z_VALUE: g1,
                CONFIG_VALUE: v1,
                CONFIG_X_UNIT: h1,
                CONFIG_Y_UNIT: m1,
                CONFIG_Z_UNIT: y1,
                CONFIG_UNIT: E1,
            } = Pe),
                ({
                    IX2_SESSION_STOPPED: b1,
                    IX2_INSTANCE_ADDED: _1,
                    IX2_ELEMENT_STATE_CHANGED: w1,
                } = xe),
                (wh = {}),
                (I1 = "refState"),
                (T1 = (e = wh, t = {}) => {
                    switch (t.type) {
                        case b1:
                            return wh;
                        case _1: {
                            let {
                                    elementId: r,
                                    element: n,
                                    origin: i,
                                    actionItem: o,
                                    refType: s,
                                } = t.payload,
                                { actionTypeId: a } = o,
                                u = e;
                            return (
                                (0, ur.getIn)(u, [r, n]) !== n &&
                                    (u = Ih(u, n, s, r, o)),
                                Na(u, r, a, i, o)
                            );
                        }
                        case w1: {
                            let {
                                elementId: r,
                                actionTypeId: n,
                                current: i,
                                actionItem: o,
                            } = t.payload;
                            return Na(e, r, n, i, o);
                        }
                        default:
                            return e;
                    }
                });
            x1 = [
                [d1, h1],
                [p1, m1],
                [g1, y1],
                [v1, E1],
            ];
        });
    var Oh = l((Ae) => {
        "use strict";
        Object.defineProperty(Ae, "__esModule", { value: !0 });
        Ae.renderPlugin =
            Ae.getPluginOrigin =
            Ae.getPluginDuration =
            Ae.getPluginDestination =
            Ae.getPluginConfig =
            Ae.createPluginInstance =
            Ae.clearPlugin =
                void 0;
        var A1 = (e) => e.value;
        Ae.getPluginConfig = A1;
        var S1 = (e, t) => {
            if (t.config.duration !== "auto") return null;
            let r = parseFloat(e.getAttribute("data-duration"));
            return r > 0
                ? r * 1e3
                : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
        };
        Ae.getPluginDuration = S1;
        var C1 = (e) => e || { value: 0 };
        Ae.getPluginOrigin = C1;
        var R1 = (e) => ({ value: e.value });
        Ae.getPluginDestination = R1;
        var L1 = (e) => {
            let t = window.Webflow.require("lottie").createInstance(e);
            return t.stop(), t.setSubframe(!0), t;
        };
        Ae.createPluginInstance = L1;
        var N1 = (e, t, r) => {
            if (!e) return;
            let n = t[r.actionTypeId].value / 100;
            e.goToFrame(e.frames * n);
        };
        Ae.renderPlugin = N1;
        var P1 = (e) => {
            window.Webflow.require("lottie").createInstance(e).stop();
        };
        Ae.clearPlugin = P1;
    });
    var Sh = l((Se) => {
        "use strict";
        Object.defineProperty(Se, "__esModule", { value: !0 });
        Se.renderPlugin =
            Se.getPluginOrigin =
            Se.getPluginDuration =
            Se.getPluginDestination =
            Se.getPluginConfig =
            Se.createPluginInstance =
            Se.clearPlugin =
                void 0;
        var q1 = (e) => document.querySelector(`[data-w-id="${e}"]`),
            M1 = () => window.Webflow.require("spline"),
            F1 = (e, t) => e.filter((r) => !t.includes(r)),
            D1 = (e, t) => e.value[t];
        Se.getPluginConfig = D1;
        var k1 = () => null;
        Se.getPluginDuration = k1;
        var Ah = Object.freeze({
                positionX: 0,
                positionY: 0,
                positionZ: 0,
                rotationX: 0,
                rotationY: 0,
                rotationZ: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
            }),
            G1 = (e, t) => {
                let r = t.config.value,
                    n = Object.keys(r);
                if (e) {
                    let o = Object.keys(e),
                        s = F1(n, o);
                    return s.length
                        ? s.reduce((u, f) => ((u[f] = Ah[f]), u), e)
                        : e;
                }
                return n.reduce((o, s) => ((o[s] = Ah[s]), o), {});
            };
        Se.getPluginOrigin = G1;
        var V1 = (e) => e.value;
        Se.getPluginDestination = V1;
        var U1 = (e, t) => {
            var r;
            let n =
                t == null ||
                (r = t.config) === null ||
                r === void 0 ||
                (r = r.target) === null ||
                r === void 0
                    ? void 0
                    : r.pluginElement;
            return n ? q1(n) : null;
        };
        Se.createPluginInstance = U1;
        var W1 = (e, t, r) => {
            let n = M1(),
                i = n.getInstance(e),
                o = r.config.target.objectId,
                s = (a) => {
                    if (!a)
                        throw new Error(
                            "Invalid spline app passed to renderSpline"
                        );
                    let u = o && a.findObjectById(o);
                    if (!u) return;
                    let { PLUGIN_SPLINE: f } = t;
                    f.positionX != null && (u.position.x = f.positionX),
                        f.positionY != null && (u.position.y = f.positionY),
                        f.positionZ != null && (u.position.z = f.positionZ),
                        f.rotationX != null && (u.rotation.x = f.rotationX),
                        f.rotationY != null && (u.rotation.y = f.rotationY),
                        f.rotationZ != null && (u.rotation.z = f.rotationZ),
                        f.scaleX != null && (u.scale.x = f.scaleX),
                        f.scaleY != null && (u.scale.y = f.scaleY),
                        f.scaleZ != null && (u.scale.z = f.scaleZ);
                };
            i ? s(i.spline) : n.setLoadHandler(e, s);
        };
        Se.renderPlugin = W1;
        var H1 = () => null;
        Se.clearPlugin = H1;
    });
    var qa = l((Pa) => {
        "use strict";
        Object.defineProperty(Pa, "__esModule", { value: !0 });
        Pa.normalizeColor = B1;
        var Ch = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aqua: "#00FFFF",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blue: "#0000FF",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgreen: "#006400",
            darkgrey: "#A9A9A9",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            fuchsia: "#FF00FF",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#ADFF2F",
            grey: "#808080",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgray: "#D3D3D3",
            lightgreen: "#90EE90",
            lightgrey: "#D3D3D3",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            lime: "#00FF00",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            maroon: "#800000",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            navy: "#000080",
            oldlace: "#FDF5E6",
            olive: "#808000",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#FF0000",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            silver: "#C0C0C0",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            teal: "#008080",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            white: "#FFFFFF",
            whitesmoke: "#F5F5F5",
            yellow: "#FFFF00",
            yellowgreen: "#9ACD32",
        };
        function B1(e) {
            let t,
                r,
                n,
                i = 1,
                o = e.replace(/\s/g, "").toLowerCase(),
                a =
                    (typeof Ch[o] == "string" ? Ch[o].toLowerCase() : null) ||
                    o;
            if (a.startsWith("#")) {
                let u = a.substring(1);
                u.length === 3
                    ? ((t = parseInt(u[0] + u[0], 16)),
                      (r = parseInt(u[1] + u[1], 16)),
                      (n = parseInt(u[2] + u[2], 16)))
                    : u.length === 6 &&
                      ((t = parseInt(u.substring(0, 2), 16)),
                      (r = parseInt(u.substring(2, 4), 16)),
                      (n = parseInt(u.substring(4, 6), 16)));
            } else if (a.startsWith("rgba")) {
                let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
                (t = parseInt(u[0], 10)),
                    (r = parseInt(u[1], 10)),
                    (n = parseInt(u[2], 10)),
                    (i = parseFloat(u[3]));
            } else if (a.startsWith("rgb")) {
                let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
                (t = parseInt(u[0], 10)),
                    (r = parseInt(u[1], 10)),
                    (n = parseInt(u[2], 10));
            } else if (a.startsWith("hsla")) {
                let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
                    f = parseFloat(u[0]),
                    E = parseFloat(u[1].replace("%", "")) / 100,
                    d = parseFloat(u[2].replace("%", "")) / 100;
                i = parseFloat(u[3]);
                let b = (1 - Math.abs(2 * d - 1)) * E,
                    m = b * (1 - Math.abs(((f / 60) % 2) - 1)),
                    y = d - b / 2,
                    I,
                    O,
                    T;
                f >= 0 && f < 60
                    ? ((I = b), (O = m), (T = 0))
                    : f >= 60 && f < 120
                    ? ((I = m), (O = b), (T = 0))
                    : f >= 120 && f < 180
                    ? ((I = 0), (O = b), (T = m))
                    : f >= 180 && f < 240
                    ? ((I = 0), (O = m), (T = b))
                    : f >= 240 && f < 300
                    ? ((I = m), (O = 0), (T = b))
                    : ((I = b), (O = 0), (T = m)),
                    (t = Math.round((I + y) * 255)),
                    (r = Math.round((O + y) * 255)),
                    (n = Math.round((T + y) * 255));
            } else if (a.startsWith("hsl")) {
                let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
                    f = parseFloat(u[0]),
                    E = parseFloat(u[1].replace("%", "")) / 100,
                    d = parseFloat(u[2].replace("%", "")) / 100,
                    b = (1 - Math.abs(2 * d - 1)) * E,
                    m = b * (1 - Math.abs(((f / 60) % 2) - 1)),
                    y = d - b / 2,
                    I,
                    O,
                    T;
                f >= 0 && f < 60
                    ? ((I = b), (O = m), (T = 0))
                    : f >= 60 && f < 120
                    ? ((I = m), (O = b), (T = 0))
                    : f >= 120 && f < 180
                    ? ((I = 0), (O = b), (T = m))
                    : f >= 180 && f < 240
                    ? ((I = 0), (O = m), (T = b))
                    : f >= 240 && f < 300
                    ? ((I = m), (O = 0), (T = b))
                    : ((I = b), (O = 0), (T = m)),
                    (t = Math.round((I + y) * 255)),
                    (r = Math.round((O + y) * 255)),
                    (n = Math.round((T + y) * 255));
            }
            if (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n))
                throw new Error(
                    `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
                );
            return { red: t, green: r, blue: n, alpha: i };
        }
    });
    var Rh = l((Ce) => {
        "use strict";
        Object.defineProperty(Ce, "__esModule", { value: !0 });
        Ce.renderPlugin =
            Ce.getPluginOrigin =
            Ce.getPluginDuration =
            Ce.getPluginDestination =
            Ce.getPluginConfig =
            Ce.createPluginInstance =
            Ce.clearPlugin =
                void 0;
        var X1 = qa(),
            j1 = (e, t) => e.value[t];
        Ce.getPluginConfig = j1;
        var z1 = () => null;
        Ce.getPluginDuration = z1;
        var K1 = (e, t) => {
            if (e) return e;
            let r = t.config.value,
                n = t.config.target.objectId,
                i = getComputedStyle(document.documentElement).getPropertyValue(
                    n
                );
            if (r.size != null) return { size: parseInt(i, 10) };
            if (r.red != null && r.green != null && r.blue != null)
                return (0, X1.normalizeColor)(i);
        };
        Ce.getPluginOrigin = K1;
        var Y1 = (e) => e.value;
        Ce.getPluginDestination = Y1;
        var Q1 = () => null;
        Ce.createPluginInstance = Q1;
        var $1 = (e, t, r) => {
            let n = r.config.target.objectId,
                i = r.config.value.unit,
                { PLUGIN_VARIABLE: o } = t,
                { size: s, red: a, green: u, blue: f, alpha: E } = o,
                d;
            s != null && (d = s + i),
                a != null &&
                    f != null &&
                    u != null &&
                    E != null &&
                    (d = `rgba(${a}, ${u}, ${f}, ${E})`),
                d != null && document.documentElement.style.setProperty(n, d);
        };
        Ce.renderPlugin = $1;
        var Z1 = (e, t) => {
            let r = t.config.target.objectId;
            document.documentElement.style.removeProperty(r);
        };
        Ce.clearPlugin = Z1;
    });
    var Lh = l((ai) => {
        "use strict";
        var Fa = mn().default;
        Object.defineProperty(ai, "__esModule", { value: !0 });
        ai.pluginMethodMap = void 0;
        var Ma = (We(), it(Df)),
            J1 = Fa(Oh()),
            eM = Fa(Sh()),
            tM = Fa(Rh()),
            UX = (ai.pluginMethodMap = new Map([
                [Ma.ActionTypeConsts.PLUGIN_LOTTIE, { ...J1 }],
                [Ma.ActionTypeConsts.PLUGIN_SPLINE, { ...eM }],
                [Ma.ActionTypeConsts.PLUGIN_VARIABLE, { ...tM }],
            ]));
    });
    var Nh = {};
    Ve(Nh, {
        clearPlugin: () => Wa,
        createPluginInstance: () => nM,
        getPluginConfig: () => ka,
        getPluginDestination: () => Va,
        getPluginDuration: () => rM,
        getPluginOrigin: () => Ga,
        isPluginType: () => kt,
        renderPlugin: () => Ua,
    });
    function kt(e) {
        return Da.pluginMethodMap.has(e);
    }
    var Da,
        Gt,
        ka,
        Ga,
        rM,
        Va,
        nM,
        Ua,
        Wa,
        Ha = ye(() => {
            "use strict";
            ni();
            Da = pe(Lh());
            (Gt = (e) => (t) => {
                if (!et) return () => null;
                let r = Da.pluginMethodMap.get(t);
                if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
                let n = r[e];
                if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
                return n;
            }),
                (ka = Gt("getPluginConfig")),
                (Ga = Gt("getPluginOrigin")),
                (rM = Gt("getPluginDuration")),
                (Va = Gt("getPluginDestination")),
                (nM = Gt("createPluginInstance")),
                (Ua = Gt("renderPlugin")),
                (Wa = Gt("clearPlugin"));
        });
    var qh = l((BX, Ph) => {
        function iM(e, t) {
            return e == null || e !== e ? t : e;
        }
        Ph.exports = iM;
    });
    var Fh = l((XX, Mh) => {
        function oM(e, t, r, n) {
            var i = -1,
                o = e == null ? 0 : e.length;
            for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
            return r;
        }
        Mh.exports = oM;
    });
    var kh = l((jX, Dh) => {
        function aM(e) {
            return function (t, r, n) {
                for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
                    var u = s[e ? a : ++i];
                    if (r(o[u], u, o) === !1) break;
                }
                return t;
            };
        }
        Dh.exports = aM;
    });
    var Vh = l((zX, Gh) => {
        var sM = kh(),
            uM = sM();
        Gh.exports = uM;
    });
    var Ba = l((KX, Uh) => {
        var cM = Vh(),
            lM = Hr();
        function fM(e, t) {
            return e && cM(e, t, lM);
        }
        Uh.exports = fM;
    });
    var Hh = l((YX, Wh) => {
        var dM = Ft();
        function pM(e, t) {
            return function (r, n) {
                if (r == null) return r;
                if (!dM(r)) return e(r, n);
                for (
                    var i = r.length, o = t ? i : -1, s = Object(r);
                    (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

                );
                return r;
            };
        }
        Wh.exports = pM;
    });
    var Xa = l((QX, Bh) => {
        var gM = Ba(),
            vM = Hh(),
            hM = vM(gM);
        Bh.exports = hM;
    });
    var jh = l(($X, Xh) => {
        function mM(e, t, r, n, i) {
            return (
                i(e, function (o, s, a) {
                    r = n ? ((n = !1), o) : t(r, o, s, a);
                }),
                r
            );
        }
        Xh.exports = mM;
    });
    var Kh = l((ZX, zh) => {
        var yM = Fh(),
            EM = Xa(),
            bM = Ot(),
            _M = jh(),
            wM = Oe();
        function IM(e, t, r) {
            var n = wM(e) ? yM : _M,
                i = arguments.length < 3;
            return n(e, bM(t, 4), r, i, EM);
        }
        zh.exports = IM;
    });
    var Qh = l((JX, Yh) => {
        var TM = xa(),
            xM = Ot(),
            OM = Oa(),
            AM = Math.max,
            SM = Math.min;
        function CM(e, t, r) {
            var n = e == null ? 0 : e.length;
            if (!n) return -1;
            var i = n - 1;
            return (
                r !== void 0 &&
                    ((i = OM(r)), (i = r < 0 ? AM(n + i, 0) : SM(i, n - 1))),
                TM(e, xM(t, 3), i, !0)
            );
        }
        Yh.exports = CM;
    });
    var Zh = l((ej, $h) => {
        var RM = Ta(),
            LM = Qh(),
            NM = RM(LM);
        $h.exports = NM;
    });
    function Jh(e, t) {
        return e === t
            ? e !== 0 || t !== 0 || 1 / e === 1 / t
            : e !== e && t !== t;
    }
    function PM(e, t) {
        if (Jh(e, t)) return !0;
        if (
            typeof e != "object" ||
            e === null ||
            typeof t != "object" ||
            t === null
        )
            return !1;
        let r = Object.keys(e),
            n = Object.keys(t);
        if (r.length !== n.length) return !1;
        for (let i = 0; i < r.length; i++)
            if (!Object.hasOwn(t, r[i]) || !Jh(e[r[i]], t[r[i]])) return !1;
        return !0;
    }
    var ja,
        em = ye(() => {
            "use strict";
            ja = PM;
        });
    var ym = {};
    Ve(ym, {
        cleanupHTMLElement: () => RF,
        clearAllStyles: () => CF,
        clearObjectCache: () => QM,
        getActionListProgress: () => NF,
        getAffectedElements: () => $a,
        getComputedStyle: () => iF,
        getDestinationValues: () => fF,
        getElementId: () => eF,
        getInstanceId: () => ZM,
        getInstanceOrigin: () => sF,
        getItemConfigByKey: () => lF,
        getMaxDurationItemIndex: () => mm,
        getNamespacedParameterId: () => MF,
        getRenderType: () => gm,
        getStyleProp: () => dF,
        mediaQueriesEqual: () => DF,
        observeStore: () => nF,
        reduceListToGroup: () => PF,
        reifyState: () => tF,
        renderHTMLElement: () => pF,
        shallowEqual: () => ja,
        shouldAllowMediaQuery: () => FF,
        shouldNamespaceEventParameter: () => qF,
        stringifyTarget: () => kF,
    });
    function QM() {
        si.clear();
    }
    function ZM() {
        return "i" + $M++;
    }
    function eF(e, t) {
        for (let r in e) {
            let n = e[r];
            if (n && n.ref === t) return n.id;
        }
        return "e" + JM++;
    }
    function tF({ events: e, actionLists: t, site: r } = {}) {
        let n = (0, fi.default)(
                e,
                (s, a) => {
                    let { eventTypeId: u } = a;
                    return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
                },
                {}
            ),
            i = r && r.mediaQueries,
            o = [];
        return (
            i
                ? (o = i.map((s) => s.key))
                : ((i = []),
                  console.warn("IX2 missing mediaQueries in site data")),
            {
                ixData: {
                    events: e,
                    actionLists: t,
                    eventTypeMap: n,
                    mediaQueries: i,
                    mediaQueryKeys: o,
                },
            }
        );
    }
    function nF({ store: e, select: t, onChange: r, comparator: n = rF }) {
        let { getState: i, subscribe: o } = e,
            s = o(u),
            a = t(i());
        function u() {
            let f = t(i());
            if (f == null) {
                s();
                return;
            }
            n(f, a) || ((a = f), r(a, e));
        }
        return s;
    }
    function nm(e) {
        let t = typeof e;
        if (t === "string") return { id: e };
        if (e != null && t === "object") {
            let {
                id: r,
                objectId: n,
                selector: i,
                selectorGuids: o,
                appliesTo: s,
                useEventTarget: a,
            } = e;
            return {
                id: r,
                objectId: n,
                selector: i,
                selectorGuids: o,
                appliesTo: s,
                useEventTarget: a,
            };
        }
        return {};
    }
    function $a({
        config: e,
        event: t,
        eventTarget: r,
        elementRoot: n,
        elementApi: i,
    }) {
        if (!i) throw new Error("IX2 missing elementApi");
        let { targets: o } = e;
        if (Array.isArray(o) && o.length > 0)
            return o.reduce(
                (R, w) =>
                    R.concat(
                        $a({
                            config: { target: w },
                            event: t,
                            eventTarget: r,
                            elementRoot: n,
                            elementApi: i,
                        })
                    ),
                []
            );
        let {
                getValidDocument: s,
                getQuerySelector: a,
                queryDocument: u,
                getChildElements: f,
                getSiblingElements: E,
                matchSelector: d,
                elementContains: b,
                isSiblingNode: m,
            } = i,
            { target: y } = e;
        if (!y) return [];
        let {
            id: I,
            objectId: O,
            selector: T,
            selectorGuids: P,
            appliesTo: L,
            useEventTarget: F,
        } = nm(y);
        if (O) return [si.has(O) ? si.get(O) : si.set(O, {}).get(O)];
        if (L === Qo.PAGE) {
            let R = s(I);
            return R ? [R] : [];
        }
        let D = (t?.action?.config?.affectedElements ?? {})[I || T] || {},
            K = !!(D.id || D.selector),
            z,
            Q,
            re,
            j = t && a(nm(t.target));
        if (
            (K
                ? ((z = D.limitAffectedElements), (Q = j), (re = a(D)))
                : (Q = re = a({ id: I, selector: T, selectorGuids: P })),
            t && F)
        ) {
            let R = r && (re || F === !0) ? [r] : u(j);
            if (re) {
                if (F === zM)
                    return u(re).filter((w) => R.some((N) => b(w, N)));
                if (F === tm)
                    return u(re).filter((w) => R.some((N) => b(N, w)));
                if (F === rm)
                    return u(re).filter((w) => R.some((N) => m(N, w)));
            }
            return R;
        }
        return Q == null || re == null
            ? []
            : et && n
            ? u(re).filter((R) => n.contains(R))
            : z === tm
            ? u(Q, re)
            : z === jM
            ? f(u(Q)).filter(d(re))
            : z === rm
            ? E(u(Q)).filter(d(re))
            : u(re);
    }
    function iF({ element: e, actionItem: t }) {
        if (!et) return {};
        let { actionTypeId: r } = t;
        switch (r) {
            case pr:
            case gr:
            case vr:
            case hr:
            case pi:
                return window.getComputedStyle(e);
            default:
                return {};
        }
    }
    function sF(e, t = {}, r = {}, n, i) {
        let { getStyle: o } = i,
            { actionTypeId: s } = n;
        if (kt(s)) return Ga(s)(t[s], n);
        switch (n.actionTypeId) {
            case lr:
            case fr:
            case dr:
            case Jr:
                return t[n.actionTypeId] || Za[n.actionTypeId];
            case en:
                return oF(t[n.actionTypeId], n.config.filters);
            case tn:
                return aF(t[n.actionTypeId], n.config.fontVariations);
            case fm:
                return { value: (0, mt.default)(parseFloat(o(e, ci)), 1) };
            case pr: {
                let a = o(e, lt),
                    u = o(e, ft),
                    f,
                    E;
                return (
                    n.config.widthUnit === St
                        ? (f = im.test(a) ? parseFloat(a) : parseFloat(r.width))
                        : (f = (0, mt.default)(
                              parseFloat(a),
                              parseFloat(r.width)
                          )),
                    n.config.heightUnit === St
                        ? (E = im.test(u)
                              ? parseFloat(u)
                              : parseFloat(r.height))
                        : (E = (0, mt.default)(
                              parseFloat(u),
                              parseFloat(r.height)
                          )),
                    { widthValue: f, heightValue: E }
                );
            }
            case gr:
            case vr:
            case hr:
                return OF({
                    element: e,
                    actionTypeId: n.actionTypeId,
                    computedStyle: r,
                    getStyle: o,
                });
            case pi:
                return { value: (0, mt.default)(o(e, li), r.display) };
            case YM:
                return t[n.actionTypeId] || { value: 0 };
            default:
                return;
        }
    }
    function fF({ element: e, actionItem: t, elementApi: r }) {
        if (kt(t.actionTypeId)) return Va(t.actionTypeId)(t.config);
        switch (t.actionTypeId) {
            case lr:
            case fr:
            case dr:
            case Jr: {
                let { xValue: n, yValue: i, zValue: o } = t.config;
                return { xValue: n, yValue: i, zValue: o };
            }
            case pr: {
                let { getStyle: n, setStyle: i, getProperty: o } = r,
                    { widthUnit: s, heightUnit: a } = t.config,
                    { widthValue: u, heightValue: f } = t.config;
                if (!et) return { widthValue: u, heightValue: f };
                if (s === St) {
                    let E = n(e, lt);
                    i(e, lt, ""), (u = o(e, "offsetWidth")), i(e, lt, E);
                }
                if (a === St) {
                    let E = n(e, ft);
                    i(e, ft, ""), (f = o(e, "offsetHeight")), i(e, ft, E);
                }
                return { widthValue: u, heightValue: f };
            }
            case gr:
            case vr:
            case hr: {
                let {
                    rValue: n,
                    gValue: i,
                    bValue: o,
                    aValue: s,
                    globalSwatchId: a,
                } = t.config;
                if (a && a.startsWith("--")) {
                    let { getStyle: u } = r,
                        f = u(e, a),
                        E = (0, sm.normalizeColor)(f);
                    return {
                        rValue: E.red,
                        gValue: E.green,
                        bValue: E.blue,
                        aValue: E.alpha,
                    };
                }
                return { rValue: n, gValue: i, bValue: o, aValue: s };
            }
            case en:
                return t.config.filters.reduce(uF, {});
            case tn:
                return t.config.fontVariations.reduce(cF, {});
            default: {
                let { value: n } = t.config;
                return { value: n };
            }
        }
    }
    function gm(e) {
        if (/^TRANSFORM_/.test(e)) return cm;
        if (/^STYLE_/.test(e)) return Ya;
        if (/^GENERAL_/.test(e)) return Ka;
        if (/^PLUGIN_/.test(e)) return lm;
    }
    function dF(e, t) {
        return e === Ya ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function pF(e, t, r, n, i, o, s, a, u) {
        switch (a) {
            case cm:
                return yF(e, t, r, i, s);
            case Ya:
                return AF(e, t, r, i, o, s);
            case Ka:
                return SF(e, i, s);
            case lm: {
                let { actionTypeId: f } = i;
                if (kt(f)) return Ua(f)(u, t, i);
            }
        }
    }
    function yF(e, t, r, n, i) {
        let o = mF
                .map((a) => {
                    let u = Za[a],
                        {
                            xValue: f = u.xValue,
                            yValue: E = u.yValue,
                            zValue: d = u.zValue,
                            xUnit: b = "",
                            yUnit: m = "",
                            zUnit: y = "",
                        } = t[a] || {};
                    switch (a) {
                        case lr:
                            return `${FM}(${f}${b}, ${E}${m}, ${d}${y})`;
                        case fr:
                            return `${DM}(${f}${b}, ${E}${m}, ${d}${y})`;
                        case dr:
                            return `${kM}(${f}${b}) ${GM}(${E}${m}) ${VM}(${d}${y})`;
                        case Jr:
                            return `${UM}(${f}${b}, ${E}${m})`;
                        default:
                            return "";
                    }
                })
                .join(" "),
            { setStyle: s } = i;
        Vt(e, At, i), s(e, At, o), _F(n, r) && s(e, ri, WM);
    }
    function EF(e, t, r, n) {
        let i = (0, fi.default)(
                t,
                (s, a, u) => `${s} ${u}(${a}${hF(u, r)})`,
                ""
            ),
            { setStyle: o } = n;
        Vt(e, Qr, n), o(e, Qr, i);
    }
    function bF(e, t, r, n) {
        let i = (0, fi.default)(
                t,
                (s, a, u) => (s.push(`"${u}" ${a}`), s),
                []
            ).join(", "),
            { setStyle: o } = n;
        Vt(e, $r, n), o(e, $r, i);
    }
    function _F({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
        return (
            (e === lr && n !== void 0) ||
            (e === fr && n !== void 0) ||
            (e === dr && (t !== void 0 || r !== void 0))
        );
    }
    function xF(e, t) {
        let r = e.exec(t);
        return r ? r[1] : "";
    }
    function OF({
        element: e,
        actionTypeId: t,
        computedStyle: r,
        getStyle: n,
    }) {
        let i = Qa[t],
            o = n(e, i),
            s = IF.test(o) ? o : r[i],
            a = xF(TF, s).split(Zr);
        return {
            rValue: (0, mt.default)(parseInt(a[0], 10), 255),
            gValue: (0, mt.default)(parseInt(a[1], 10), 255),
            bValue: (0, mt.default)(parseInt(a[2], 10), 255),
            aValue: (0, mt.default)(parseFloat(a[3]), 1),
        };
    }
    function AF(e, t, r, n, i, o) {
        let { setStyle: s } = o;
        switch (n.actionTypeId) {
            case pr: {
                let { widthUnit: a = "", heightUnit: u = "" } = n.config,
                    { widthValue: f, heightValue: E } = r;
                f !== void 0 &&
                    (a === St && (a = "px"), Vt(e, lt, o), s(e, lt, f + a)),
                    E !== void 0 &&
                        (u === St && (u = "px"), Vt(e, ft, o), s(e, ft, E + u));
                break;
            }
            case en: {
                EF(e, r, n.config, o);
                break;
            }
            case tn: {
                bF(e, r, n.config, o);
                break;
            }
            case gr:
            case vr:
            case hr: {
                let a = Qa[n.actionTypeId],
                    u = Math.round(r.rValue),
                    f = Math.round(r.gValue),
                    E = Math.round(r.bValue),
                    d = r.aValue;
                Vt(e, a, o),
                    s(
                        e,
                        a,
                        d >= 1
                            ? `rgb(${u},${f},${E})`
                            : `rgba(${u},${f},${E},${d})`
                    );
                break;
            }
            default: {
                let { unit: a = "" } = n.config;
                Vt(e, i, o), s(e, i, r.value + a);
                break;
            }
        }
    }
    function SF(e, t, r) {
        let { setStyle: n } = r;
        switch (t.actionTypeId) {
            case pi: {
                let { value: i } = t.config;
                i === HM && et ? n(e, li, Sa) : n(e, li, i);
                return;
            }
        }
    }
    function Vt(e, t, r) {
        if (!et) return;
        let n = pm[t];
        if (!n) return;
        let { getStyle: i, setStyle: o } = r,
            s = i(e, cr);
        if (!s) {
            o(e, cr, n);
            return;
        }
        let a = s.split(Zr).map(dm);
        a.indexOf(n) === -1 && o(e, cr, a.concat(n).join(Zr));
    }
    function vm(e, t, r) {
        if (!et) return;
        let n = pm[t];
        if (!n) return;
        let { getStyle: i, setStyle: o } = r,
            s = i(e, cr);
        !s ||
            s.indexOf(n) === -1 ||
            o(
                e,
                cr,
                s
                    .split(Zr)
                    .map(dm)
                    .filter((a) => a !== n)
                    .join(Zr)
            );
    }
    function CF({ store: e, elementApi: t }) {
        let { ixData: r } = e.getState(),
            { events: n = {}, actionLists: i = {} } = r;
        Object.keys(n).forEach((o) => {
            let s = n[o],
                { config: a } = s.action,
                { actionListId: u } = a,
                f = i[u];
            f && om({ actionList: f, event: s, elementApi: t });
        }),
            Object.keys(i).forEach((o) => {
                om({ actionList: i[o], elementApi: t });
            });
    }
    function om({ actionList: e = {}, event: t, elementApi: r }) {
        let { actionItemGroups: n, continuousParameterGroups: i } = e;
        n &&
            n.forEach((o) => {
                am({ actionGroup: o, event: t, elementApi: r });
            }),
            i &&
                i.forEach((o) => {
                    let { continuousActionGroups: s } = o;
                    s.forEach((a) => {
                        am({ actionGroup: a, event: t, elementApi: r });
                    });
                });
    }
    function am({ actionGroup: e, event: t, elementApi: r }) {
        let { actionItems: n } = e;
        n.forEach((i) => {
            let { actionTypeId: o, config: s } = i,
                a;
            kt(o)
                ? (a = (u) => Wa(o)(u, i))
                : (a = hm({ effect: LF, actionTypeId: o, elementApi: r })),
                $a({ config: s, event: t, elementApi: r }).forEach(a);
        });
    }
    function RF(e, t, r) {
        let { setStyle: n, getStyle: i } = r,
            { actionTypeId: o } = t;
        if (o === pr) {
            let { config: s } = t;
            s.widthUnit === St && n(e, lt, ""),
                s.heightUnit === St && n(e, ft, "");
        }
        i(e, cr) && hm({ effect: vm, actionTypeId: o, elementApi: r })(e);
    }
    function LF(e, t, r) {
        let { setStyle: n } = r;
        vm(e, t, r), n(e, t, ""), t === At && n(e, ri, "");
    }
    function mm(e) {
        let t = 0,
            r = 0;
        return (
            e.forEach((n, i) => {
                let { config: o } = n,
                    s = o.delay + o.duration;
                s >= t && ((t = s), (r = i));
            }),
            r
        );
    }
    function NF(e, t) {
        let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
            { actionItem: i, verboseTimeElapsed: o = 0 } = t,
            s = 0,
            a = 0;
        return (
            r.forEach((u, f) => {
                if (n && f === 0) return;
                let { actionItems: E } = u,
                    d = E[mm(E)],
                    { config: b, actionTypeId: m } = d;
                i.id === d.id && (a = s + o);
                let y = gm(m) === Ka ? 0 : b.duration;
                s += b.delay + y;
            }),
            s > 0 ? Yr(a / s) : 0
        );
    }
    function PF({ actionList: e, actionItemId: t, rawData: r }) {
        let { actionItemGroups: n, continuousParameterGroups: i } = e,
            o = [],
            s = (a) => (
                o.push(
                    (0, di.mergeIn)(a, ["config"], { delay: 0, duration: 0 })
                ),
                a.id === t
            );
        return (
            n && n.some(({ actionItems: a }) => a.some(s)),
            i &&
                i.some((a) => {
                    let { continuousActionGroups: u } = a;
                    return u.some(({ actionItems: f }) => f.some(s));
                }),
            (0, di.setIn)(r, ["actionLists"], {
                [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
            })
        );
    }
    function qF(e, { basedOn: t }) {
        return (
            (e === Je.SCROLLING_IN_VIEW && (t === ut.ELEMENT || t == null)) ||
            (e === Je.MOUSE_MOVE && t === ut.ELEMENT)
        );
    }
    function MF(e, t) {
        return e + KM + t;
    }
    function FF(e, t) {
        return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function DF(e, t) {
        return ja(e && e.sort(), t && t.sort());
    }
    function kF(e) {
        if (typeof e == "string") return e;
        if (e.pluginElement && e.objectId)
            return e.pluginElement + za + e.objectId;
        if (e.objectId) return e.objectId;
        let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
        return t + za + r + za + n;
    }
    var mt,
        fi,
        ui,
        di,
        sm,
        qM,
        MM,
        FM,
        DM,
        kM,
        GM,
        VM,
        UM,
        WM,
        HM,
        ci,
        Qr,
        $r,
        lt,
        ft,
        um,
        BM,
        XM,
        tm,
        jM,
        rm,
        zM,
        li,
        cr,
        St,
        Zr,
        KM,
        za,
        cm,
        Ka,
        Ya,
        lm,
        lr,
        fr,
        dr,
        Jr,
        fm,
        en,
        tn,
        pr,
        gr,
        vr,
        hr,
        pi,
        YM,
        dm,
        Qa,
        pm,
        si,
        $M,
        JM,
        rF,
        im,
        oF,
        aF,
        uF,
        cF,
        lF,
        Za,
        gF,
        vF,
        hF,
        mF,
        wF,
        IF,
        TF,
        hm,
        Em = ye(() => {
            "use strict";
            (mt = pe(qh())), (fi = pe(Kh())), (ui = pe(Zh())), (di = pe(Jt()));
            We();
            em();
            La();
            sm = pe(qa());
            Ha();
            ni();
            ({
                BACKGROUND: qM,
                TRANSFORM: MM,
                TRANSLATE_3D: FM,
                SCALE_3D: DM,
                ROTATE_X: kM,
                ROTATE_Y: GM,
                ROTATE_Z: VM,
                SKEW: UM,
                PRESERVE_3D: WM,
                FLEX: HM,
                OPACITY: ci,
                FILTER: Qr,
                FONT_VARIATION_SETTINGS: $r,
                WIDTH: lt,
                HEIGHT: ft,
                BACKGROUND_COLOR: um,
                BORDER_COLOR: BM,
                COLOR: XM,
                CHILDREN: tm,
                IMMEDIATE_CHILDREN: jM,
                SIBLINGS: rm,
                PARENT: zM,
                DISPLAY: li,
                WILL_CHANGE: cr,
                AUTO: St,
                COMMA_DELIMITER: Zr,
                COLON_DELIMITER: KM,
                BAR_DELIMITER: za,
                RENDER_TRANSFORM: cm,
                RENDER_GENERAL: Ka,
                RENDER_STYLE: Ya,
                RENDER_PLUGIN: lm,
            } = Pe),
                ({
                    TRANSFORM_MOVE: lr,
                    TRANSFORM_SCALE: fr,
                    TRANSFORM_ROTATE: dr,
                    TRANSFORM_SKEW: Jr,
                    STYLE_OPACITY: fm,
                    STYLE_FILTER: en,
                    STYLE_FONT_VARIATION: tn,
                    STYLE_SIZE: pr,
                    STYLE_BACKGROUND_COLOR: gr,
                    STYLE_BORDER: vr,
                    STYLE_TEXT_COLOR: hr,
                    GENERAL_DISPLAY: pi,
                    OBJECT_VALUE: YM,
                } = Ue),
                (dm = (e) => e.trim()),
                (Qa = Object.freeze({ [gr]: um, [vr]: BM, [hr]: XM })),
                (pm = Object.freeze({
                    [At]: MM,
                    [um]: qM,
                    [ci]: ci,
                    [Qr]: Qr,
                    [lt]: lt,
                    [ft]: ft,
                    [$r]: $r,
                })),
                (si = new Map());
            $M = 1;
            JM = 1;
            rF = (e, t) => e === t;
            (im = /px/),
                (oF = (e, t) =>
                    t.reduce(
                        (r, n) => (
                            r[n.type] == null && (r[n.type] = gF[n.type]), r
                        ),
                        e || {}
                    )),
                (aF = (e, t) =>
                    t.reduce(
                        (r, n) => (
                            r[n.type] == null &&
                                (r[n.type] = vF[n.type] || n.defaultValue || 0),
                            r
                        ),
                        e || {}
                    ));
            (uF = (e, t) => (t && (e[t.type] = t.value || 0), e)),
                (cF = (e, t) => (t && (e[t.type] = t.value || 0), e)),
                (lF = (e, t, r) => {
                    if (kt(e)) return ka(e)(r, t);
                    switch (e) {
                        case en: {
                            let n = (0, ui.default)(
                                r.filters,
                                ({ type: i }) => i === t
                            );
                            return n ? n.value : 0;
                        }
                        case tn: {
                            let n = (0, ui.default)(
                                r.fontVariations,
                                ({ type: i }) => i === t
                            );
                            return n ? n.value : 0;
                        }
                        default:
                            return r[t];
                    }
                });
            (Za = {
                [lr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
                [fr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
                [dr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
                [Jr]: Object.freeze({ xValue: 0, yValue: 0 }),
            }),
                (gF = Object.freeze({
                    blur: 0,
                    "hue-rotate": 0,
                    invert: 0,
                    grayscale: 0,
                    saturate: 100,
                    sepia: 0,
                    contrast: 100,
                    brightness: 100,
                })),
                (vF = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
                (hF = (e, t) => {
                    let r = (0, ui.default)(
                        t.filters,
                        ({ type: n }) => n === e
                    );
                    if (r && r.unit) return r.unit;
                    switch (e) {
                        case "blur":
                            return "px";
                        case "hue-rotate":
                            return "deg";
                        default:
                            return "%";
                    }
                }),
                (mF = Object.keys(Za));
            (wF = "\\(([^)]+)\\)"), (IF = /^rgb/), (TF = RegExp(`rgba?${wF}`));
            hm =
                ({ effect: e, actionTypeId: t, elementApi: r }) =>
                (n) => {
                    switch (t) {
                        case lr:
                        case fr:
                        case dr:
                        case Jr:
                            e(n, At, r);
                            break;
                        case en:
                            e(n, Qr, r);
                            break;
                        case tn:
                            e(n, $r, r);
                            break;
                        case fm:
                            e(n, ci, r);
                            break;
                        case pr:
                            e(n, lt, r), e(n, ft, r);
                            break;
                        case gr:
                        case vr:
                        case hr:
                            e(n, Qa[t], r);
                            break;
                        case pi:
                            e(n, li, r);
                            break;
                    }
                };
        });
    var Ut = l((De) => {
        "use strict";
        var mr = mn().default;
        Object.defineProperty(De, "__esModule", { value: !0 });
        De.IX2VanillaUtils =
            De.IX2VanillaPlugins =
            De.IX2ElementsReducer =
            De.IX2Easings =
            De.IX2EasingUtils =
            De.IX2BrowserSupport =
                void 0;
        var GF = mr((ni(), it(gh)));
        De.IX2BrowserSupport = GF;
        var VF = mr((Ra(), it(Kr)));
        De.IX2Easings = VF;
        var UF = mr((La(), it(_h)));
        De.IX2EasingUtils = UF;
        var WF = mr((xh(), it(Th)));
        De.IX2ElementsReducer = WF;
        var HF = mr((Ha(), it(Nh)));
        De.IX2VanillaPlugins = HF;
        var BF = mr((Em(), it(ym)));
        De.IX2VanillaUtils = BF;
    });
    var vi,
        yt,
        XF,
        jF,
        zF,
        KF,
        YF,
        QF,
        gi,
        bm,
        $F,
        ZF,
        Ja,
        JF,
        eD,
        tD,
        rD,
        _m,
        wm = ye(() => {
            "use strict";
            We();
            (vi = pe(Ut())),
                (yt = pe(Jt())),
                ({
                    IX2_RAW_DATA_IMPORTED: XF,
                    IX2_SESSION_STOPPED: jF,
                    IX2_INSTANCE_ADDED: zF,
                    IX2_INSTANCE_STARTED: KF,
                    IX2_INSTANCE_REMOVED: YF,
                    IX2_ANIMATION_FRAME_CHANGED: QF,
                } = xe),
                ({
                    optimizeFloat: gi,
                    applyEasing: bm,
                    createBezierEasing: $F,
                } = vi.IX2EasingUtils),
                ({ RENDER_GENERAL: ZF } = Pe),
                ({
                    getItemConfigByKey: Ja,
                    getRenderType: JF,
                    getStyleProp: eD,
                } = vi.IX2VanillaUtils),
                (tD = (e, t) => {
                    let {
                            position: r,
                            parameterId: n,
                            actionGroups: i,
                            destinationKeys: o,
                            smoothing: s,
                            restingValue: a,
                            actionTypeId: u,
                            customEasingFn: f,
                            skipMotion: E,
                            skipToValue: d,
                        } = e,
                        { parameters: b } = t.payload,
                        m = Math.max(1 - s, 0.01),
                        y = b[n];
                    y == null && ((m = 1), (y = a));
                    let I = Math.max(y, 0) || 0,
                        O = gi(I - r),
                        T = E ? d : gi(r + O * m),
                        P = T * 100;
                    if (T === r && e.current) return e;
                    let L, F, G, D;
                    for (let z = 0, { length: Q } = i; z < Q; z++) {
                        let { keyframe: re, actionItems: j } = i[z];
                        if ((z === 0 && (L = j[0]), P >= re)) {
                            L = j[0];
                            let R = i[z + 1],
                                w = R && P !== re;
                            (F = w ? R.actionItems[0] : null),
                                w &&
                                    ((G = re / 100),
                                    (D = (R.keyframe - re) / 100));
                        }
                    }
                    let K = {};
                    if (L && !F)
                        for (let z = 0, { length: Q } = o; z < Q; z++) {
                            let re = o[z];
                            K[re] = Ja(u, re, L.config);
                        }
                    else if (L && F && G !== void 0 && D !== void 0) {
                        let z = (T - G) / D,
                            Q = L.config.easing,
                            re = bm(Q, z, f);
                        for (let j = 0, { length: R } = o; j < R; j++) {
                            let w = o[j],
                                N = Ja(u, w, L.config),
                                te = (Ja(u, w, F.config) - N) * re + N;
                            K[w] = te;
                        }
                    }
                    return (0, yt.merge)(e, { position: T, current: K });
                }),
                (rD = (e, t) => {
                    let {
                            active: r,
                            origin: n,
                            start: i,
                            immediate: o,
                            renderType: s,
                            verbose: a,
                            actionItem: u,
                            destination: f,
                            destinationKeys: E,
                            pluginDuration: d,
                            instanceDelay: b,
                            customEasingFn: m,
                            skipMotion: y,
                        } = e,
                        I = u.config.easing,
                        { duration: O, delay: T } = u.config;
                    d != null && (O = d),
                        (T = b ?? T),
                        s === ZF ? (O = 0) : (o || y) && (O = T = 0);
                    let { now: P } = t.payload;
                    if (r && n) {
                        let L = P - (i + T);
                        if (a) {
                            let z = P - i,
                                Q = O + T,
                                re = gi(Math.min(Math.max(0, z / Q), 1));
                            e = (0, yt.set)(e, "verboseTimeElapsed", Q * re);
                        }
                        if (L < 0) return e;
                        let F = gi(Math.min(Math.max(0, L / O), 1)),
                            G = bm(I, F, m),
                            D = {},
                            K = null;
                        return (
                            E.length &&
                                (K = E.reduce((z, Q) => {
                                    let re = f[Q],
                                        j = parseFloat(n[Q]) || 0,
                                        w = (parseFloat(re) - j) * G + j;
                                    return (z[Q] = w), z;
                                }, {})),
                            (D.current = K),
                            (D.position = F),
                            F === 1 && ((D.active = !1), (D.complete = !0)),
                            (0, yt.merge)(e, D)
                        );
                    }
                    return e;
                }),
                (_m = (e = Object.freeze({}), t) => {
                    switch (t.type) {
                        case XF:
                            return t.payload.ixInstances || Object.freeze({});
                        case jF:
                            return Object.freeze({});
                        case zF: {
                            let {
                                    instanceId: r,
                                    elementId: n,
                                    actionItem: i,
                                    eventId: o,
                                    eventTarget: s,
                                    eventStateKey: a,
                                    actionListId: u,
                                    groupIndex: f,
                                    isCarrier: E,
                                    origin: d,
                                    destination: b,
                                    immediate: m,
                                    verbose: y,
                                    continuous: I,
                                    parameterId: O,
                                    actionGroups: T,
                                    smoothing: P,
                                    restingValue: L,
                                    pluginInstance: F,
                                    pluginDuration: G,
                                    instanceDelay: D,
                                    skipMotion: K,
                                    skipToValue: z,
                                } = t.payload,
                                { actionTypeId: Q } = i,
                                re = JF(Q),
                                j = eD(re, Q),
                                R = Object.keys(b).filter(
                                    (N) =>
                                        b[N] != null && typeof b[N] != "string"
                                ),
                                { easing: w } = i.config;
                            return (0, yt.set)(e, r, {
                                id: r,
                                elementId: n,
                                active: !1,
                                position: 0,
                                start: 0,
                                origin: d,
                                destination: b,
                                destinationKeys: R,
                                immediate: m,
                                verbose: y,
                                current: null,
                                actionItem: i,
                                actionTypeId: Q,
                                eventId: o,
                                eventTarget: s,
                                eventStateKey: a,
                                actionListId: u,
                                groupIndex: f,
                                renderType: re,
                                isCarrier: E,
                                styleProp: j,
                                continuous: I,
                                parameterId: O,
                                actionGroups: T,
                                smoothing: P,
                                restingValue: L,
                                pluginInstance: F,
                                pluginDuration: G,
                                instanceDelay: D,
                                skipMotion: K,
                                skipToValue: z,
                                customEasingFn:
                                    Array.isArray(w) && w.length === 4
                                        ? $F(w)
                                        : void 0,
                            });
                        }
                        case KF: {
                            let { instanceId: r, time: n } = t.payload;
                            return (0, yt.mergeIn)(e, [r], {
                                active: !0,
                                complete: !1,
                                start: n,
                            });
                        }
                        case YF: {
                            let { instanceId: r } = t.payload;
                            if (!e[r]) return e;
                            let n = {},
                                i = Object.keys(e),
                                { length: o } = i;
                            for (let s = 0; s < o; s++) {
                                let a = i[s];
                                a !== r && (n[a] = e[a]);
                            }
                            return n;
                        }
                        case QF: {
                            let r = e,
                                n = Object.keys(e),
                                { length: i } = n;
                            for (let o = 0; o < i; o++) {
                                let s = n[o],
                                    a = e[s],
                                    u = a.continuous ? tD : rD;
                                r = (0, yt.set)(r, s, u(a, t));
                            }
                            return r;
                        }
                        default:
                            return e;
                    }
                });
        });
    var nD,
        iD,
        oD,
        Im,
        Tm = ye(() => {
            "use strict";
            We();
            ({
                IX2_RAW_DATA_IMPORTED: nD,
                IX2_SESSION_STOPPED: iD,
                IX2_PARAMETER_CHANGED: oD,
            } = xe),
                (Im = (e = {}, t) => {
                    switch (t.type) {
                        case nD:
                            return t.payload.ixParameters || {};
                        case iD:
                            return {};
                        case oD: {
                            let { key: r, value: n } = t.payload;
                            return (e[r] = n), e;
                        }
                        default:
                            return e;
                    }
                });
        });
    var Am = {};
    Ve(Am, { default: () => sD });
    var xm,
        Om,
        aD,
        sD,
        Sm = ye(() => {
            "use strict";
            xm = pe(Yo());
            Gf();
            ad();
            cd();
            Om = pe(Ut());
            wm();
            Tm();
            ({ ixElements: aD } = Om.IX2ElementsReducer),
                (sD = (0, xm.combineReducers)({
                    ixData: kf,
                    ixRequest: od,
                    ixSession: ud,
                    ixElements: aD,
                    ixInstances: _m,
                    ixParameters: Im,
                }));
        });
    var Rm = l((mj, Cm) => {
        var uD = Tt(),
            cD = Oe(),
            lD = vt(),
            fD = "[object String]";
        function dD(e) {
            return typeof e == "string" || (!cD(e) && lD(e) && uD(e) == fD);
        }
        Cm.exports = dD;
    });
    var Nm = l((yj, Lm) => {
        var pD = Ia(),
            gD = pD("length");
        Lm.exports = gD;
    });
    var qm = l((Ej, Pm) => {
        var vD = "\\ud800-\\udfff",
            hD = "\\u0300-\\u036f",
            mD = "\\ufe20-\\ufe2f",
            yD = "\\u20d0-\\u20ff",
            ED = hD + mD + yD,
            bD = "\\ufe0e\\ufe0f",
            _D = "\\u200d",
            wD = RegExp("[" + _D + vD + ED + bD + "]");
        function ID(e) {
            return wD.test(e);
        }
        Pm.exports = ID;
    });
    var Hm = l((bj, Wm) => {
        var Fm = "\\ud800-\\udfff",
            TD = "\\u0300-\\u036f",
            xD = "\\ufe20-\\ufe2f",
            OD = "\\u20d0-\\u20ff",
            AD = TD + xD + OD,
            SD = "\\ufe0e\\ufe0f",
            CD = "[" + Fm + "]",
            es = "[" + AD + "]",
            ts = "\\ud83c[\\udffb-\\udfff]",
            RD = "(?:" + es + "|" + ts + ")",
            Dm = "[^" + Fm + "]",
            km = "(?:\\ud83c[\\udde6-\\uddff]){2}",
            Gm = "[\\ud800-\\udbff][\\udc00-\\udfff]",
            LD = "\\u200d",
            Vm = RD + "?",
            Um = "[" + SD + "]?",
            ND =
                "(?:" +
                LD +
                "(?:" +
                [Dm, km, Gm].join("|") +
                ")" +
                Um +
                Vm +
                ")*",
            PD = Um + Vm + ND,
            qD = "(?:" + [Dm + es + "?", es, km, Gm, CD].join("|") + ")",
            Mm = RegExp(ts + "(?=" + ts + ")|" + qD + PD, "g");
        function MD(e) {
            for (var t = (Mm.lastIndex = 0); Mm.test(e); ) ++t;
            return t;
        }
        Wm.exports = MD;
    });
    var Xm = l((_j, Bm) => {
        var FD = Nm(),
            DD = qm(),
            kD = Hm();
        function GD(e) {
            return DD(e) ? kD(e) : FD(e);
        }
        Bm.exports = GD;
    });
    var zm = l((wj, jm) => {
        var VD = zn(),
            UD = Kn(),
            WD = Ft(),
            HD = Rm(),
            BD = Xm(),
            XD = "[object Map]",
            jD = "[object Set]";
        function zD(e) {
            if (e == null) return 0;
            if (WD(e)) return HD(e) ? BD(e) : e.length;
            var t = UD(e);
            return t == XD || t == jD ? e.size : VD(e).length;
        }
        jm.exports = zD;
    });
    var Ym = l((Ij, Km) => {
        var KD = "Expected a function";
        function YD(e) {
            if (typeof e != "function") throw new TypeError(KD);
            return function () {
                var t = arguments;
                switch (t.length) {
                    case 0:
                        return !e.call(this);
                    case 1:
                        return !e.call(this, t[0]);
                    case 2:
                        return !e.call(this, t[0], t[1]);
                    case 3:
                        return !e.call(this, t[0], t[1], t[2]);
                }
                return !e.apply(this, t);
            };
        }
        Km.exports = YD;
    });
    var rs = l((Tj, Qm) => {
        var QD = xt(),
            $D = (function () {
                try {
                    var e = QD(Object, "defineProperty");
                    return e({}, "", {}), e;
                } catch {}
            })();
        Qm.exports = $D;
    });
    var ns = l((xj, Zm) => {
        var $m = rs();
        function ZD(e, t, r) {
            t == "__proto__" && $m
                ? $m(e, t, {
                      configurable: !0,
                      enumerable: !0,
                      value: r,
                      writable: !0,
                  })
                : (e[t] = r);
        }
        Zm.exports = ZD;
    });
    var ey = l((Oj, Jm) => {
        var JD = ns(),
            e2 = Dn(),
            t2 = Object.prototype,
            r2 = t2.hasOwnProperty;
        function n2(e, t, r) {
            var n = e[t];
            (!(r2.call(e, t) && e2(n, r)) || (r === void 0 && !(t in e))) &&
                JD(e, t, r);
        }
        Jm.exports = n2;
    });
    var ny = l((Aj, ry) => {
        var i2 = ey(),
            o2 = Xr(),
            a2 = Hn(),
            ty = ct(),
            s2 = sr();
        function u2(e, t, r, n) {
            if (!ty(e)) return e;
            t = o2(t, e);
            for (
                var i = -1, o = t.length, s = o - 1, a = e;
                a != null && ++i < o;

            ) {
                var u = s2(t[i]),
                    f = r;
                if (
                    u === "__proto__" ||
                    u === "constructor" ||
                    u === "prototype"
                )
                    return e;
                if (i != s) {
                    var E = a[u];
                    (f = n ? n(E, u, a) : void 0),
                        f === void 0 &&
                            (f = ty(E) ? E : a2(t[i + 1]) ? [] : {});
                }
                i2(a, u, f), (a = a[u]);
            }
            return e;
        }
        ry.exports = u2;
    });
    var oy = l((Sj, iy) => {
        var c2 = $n(),
            l2 = ny(),
            f2 = Xr();
        function d2(e, t, r) {
            for (var n = -1, i = t.length, o = {}; ++n < i; ) {
                var s = t[n],
                    a = c2(e, s);
                r(a, s) && l2(o, f2(s, e), a);
            }
            return o;
        }
        iy.exports = d2;
    });
    var sy = l((Cj, ay) => {
        var p2 = Un(),
            g2 = Fo(),
            v2 = ua(),
            h2 = sa(),
            m2 = Object.getOwnPropertySymbols,
            y2 = m2
                ? function (e) {
                      for (var t = []; e; ) p2(t, v2(e)), (e = g2(e));
                      return t;
                  }
                : h2;
        ay.exports = y2;
    });
    var cy = l((Rj, uy) => {
        function E2(e) {
            var t = [];
            if (e != null) for (var r in Object(e)) t.push(r);
            return t;
        }
        uy.exports = E2;
    });
    var fy = l((Lj, ly) => {
        var b2 = ct(),
            _2 = jn(),
            w2 = cy(),
            I2 = Object.prototype,
            T2 = I2.hasOwnProperty;
        function x2(e) {
            if (!b2(e)) return w2(e);
            var t = _2(e),
                r = [];
            for (var n in e)
                (n == "constructor" && (t || !T2.call(e, n))) || r.push(n);
            return r;
        }
        ly.exports = x2;
    });
    var py = l((Nj, dy) => {
        var O2 = la(),
            A2 = fy(),
            S2 = Ft();
        function C2(e) {
            return S2(e) ? O2(e, !0) : A2(e);
        }
        dy.exports = C2;
    });
    var vy = l((Pj, gy) => {
        var R2 = aa(),
            L2 = sy(),
            N2 = py();
        function P2(e) {
            return R2(e, N2, L2);
        }
        gy.exports = P2;
    });
    var my = l((qj, hy) => {
        var q2 = wa(),
            M2 = Ot(),
            F2 = oy(),
            D2 = vy();
        function k2(e, t) {
            if (e == null) return {};
            var r = q2(D2(e), function (n) {
                return [n];
            });
            return (
                (t = M2(t)),
                F2(e, r, function (n, i) {
                    return t(n, i[0]);
                })
            );
        }
        hy.exports = k2;
    });
    var Ey = l((Mj, yy) => {
        var G2 = Ot(),
            V2 = Ym(),
            U2 = my();
        function W2(e, t) {
            return U2(e, V2(G2(t)));
        }
        yy.exports = W2;
    });
    var _y = l((Fj, by) => {
        var H2 = zn(),
            B2 = Kn(),
            X2 = Gr(),
            j2 = Oe(),
            z2 = Ft(),
            K2 = Wn(),
            Y2 = jn(),
            Q2 = Xn(),
            $2 = "[object Map]",
            Z2 = "[object Set]",
            J2 = Object.prototype,
            ek = J2.hasOwnProperty;
        function tk(e) {
            if (e == null) return !0;
            if (
                z2(e) &&
                (j2(e) ||
                    typeof e == "string" ||
                    typeof e.splice == "function" ||
                    K2(e) ||
                    Q2(e) ||
                    X2(e))
            )
                return !e.length;
            var t = B2(e);
            if (t == $2 || t == Z2) return !e.size;
            if (Y2(e)) return !H2(e).length;
            for (var r in e) if (ek.call(e, r)) return !1;
            return !0;
        }
        by.exports = tk;
    });
    var Iy = l((Dj, wy) => {
        var rk = ns(),
            nk = Ba(),
            ik = Ot();
        function ok(e, t) {
            var r = {};
            return (
                (t = ik(t, 3)),
                nk(e, function (n, i, o) {
                    rk(r, i, t(n, i, o));
                }),
                r
            );
        }
        wy.exports = ok;
    });
    var xy = l((kj, Ty) => {
        function ak(e, t) {
            for (
                var r = -1, n = e == null ? 0 : e.length;
                ++r < n && t(e[r], r, e) !== !1;

            );
            return e;
        }
        Ty.exports = ak;
    });
    var Ay = l((Gj, Oy) => {
        var sk = Jn();
        function uk(e) {
            return typeof e == "function" ? e : sk;
        }
        Oy.exports = uk;
    });
    var Cy = l((Vj, Sy) => {
        var ck = xy(),
            lk = Xa(),
            fk = Ay(),
            dk = Oe();
        function pk(e, t) {
            var r = dk(e) ? ck : lk;
            return r(e, fk(t));
        }
        Sy.exports = pk;
    });
    var Ly = l((Uj, Ry) => {
        var gk = Ze(),
            vk = function () {
                return gk.Date.now();
            };
        Ry.exports = vk;
    });
    var qy = l((Wj, Py) => {
        var hk = ct(),
            is = Ly(),
            Ny = ei(),
            mk = "Expected a function",
            yk = Math.max,
            Ek = Math.min;
        function bk(e, t, r) {
            var n,
                i,
                o,
                s,
                a,
                u,
                f = 0,
                E = !1,
                d = !1,
                b = !0;
            if (typeof e != "function") throw new TypeError(mk);
            (t = Ny(t) || 0),
                hk(r) &&
                    ((E = !!r.leading),
                    (d = "maxWait" in r),
                    (o = d ? yk(Ny(r.maxWait) || 0, t) : o),
                    (b = "trailing" in r ? !!r.trailing : b));
            function m(D) {
                var K = n,
                    z = i;
                return (n = i = void 0), (f = D), (s = e.apply(z, K)), s;
            }
            function y(D) {
                return (f = D), (a = setTimeout(T, t)), E ? m(D) : s;
            }
            function I(D) {
                var K = D - u,
                    z = D - f,
                    Q = t - K;
                return d ? Ek(Q, o - z) : Q;
            }
            function O(D) {
                var K = D - u,
                    z = D - f;
                return u === void 0 || K >= t || K < 0 || (d && z >= o);
            }
            function T() {
                var D = is();
                if (O(D)) return P(D);
                a = setTimeout(T, I(D));
            }
            function P(D) {
                return (a = void 0), b && n ? m(D) : ((n = i = void 0), s);
            }
            function L() {
                a !== void 0 && clearTimeout(a),
                    (f = 0),
                    (n = u = i = a = void 0);
            }
            function F() {
                return a === void 0 ? s : P(is());
            }
            function G() {
                var D = is(),
                    K = O(D);
                if (((n = arguments), (i = this), (u = D), K)) {
                    if (a === void 0) return y(u);
                    if (d) return clearTimeout(a), (a = setTimeout(T, t)), m(u);
                }
                return a === void 0 && (a = setTimeout(T, t)), s;
            }
            return (G.cancel = L), (G.flush = F), G;
        }
        Py.exports = bk;
    });
    var Fy = l((Hj, My) => {
        var _k = qy(),
            wk = ct(),
            Ik = "Expected a function";
        function Tk(e, t, r) {
            var n = !0,
                i = !0;
            if (typeof e != "function") throw new TypeError(Ik);
            return (
                wk(r) &&
                    ((n = "leading" in r ? !!r.leading : n),
                    (i = "trailing" in r ? !!r.trailing : i)),
                _k(e, t, { leading: n, maxWait: t, trailing: i })
            );
        }
        My.exports = Tk;
    });
    var ky = {};
    Ve(ky, {
        actionListPlaybackChanged: () => Er,
        animationFrameChanged: () => mi,
        clearRequested: () => Yk,
        elementStateChanged: () => ds,
        eventListenerAdded: () => hi,
        eventStateChanged: () => cs,
        instanceAdded: () => ls,
        instanceRemoved: () => fs,
        instanceStarted: () => yi,
        mediaQueriesDefined: () => gs,
        parameterChanged: () => yr,
        playbackRequested: () => zk,
        previewRequested: () => jk,
        rawDataImported: () => os,
        sessionInitialized: () => as,
        sessionStarted: () => ss,
        sessionStopped: () => us,
        stopRequested: () => Kk,
        testFrameRendered: () => Qk,
        viewportWidthChanged: () => ps,
    });
    var Dy,
        xk,
        Ok,
        Ak,
        Sk,
        Ck,
        Rk,
        Lk,
        Nk,
        Pk,
        qk,
        Mk,
        Fk,
        Dk,
        kk,
        Gk,
        Vk,
        Uk,
        Wk,
        Hk,
        Bk,
        Xk,
        os,
        as,
        ss,
        us,
        jk,
        zk,
        Kk,
        Yk,
        hi,
        Qk,
        cs,
        mi,
        yr,
        ls,
        yi,
        fs,
        ds,
        Er,
        ps,
        gs,
        Ei = ye(() => {
            "use strict";
            We();
            (Dy = pe(Ut())),
                ({
                    IX2_RAW_DATA_IMPORTED: xk,
                    IX2_SESSION_INITIALIZED: Ok,
                    IX2_SESSION_STARTED: Ak,
                    IX2_SESSION_STOPPED: Sk,
                    IX2_PREVIEW_REQUESTED: Ck,
                    IX2_PLAYBACK_REQUESTED: Rk,
                    IX2_STOP_REQUESTED: Lk,
                    IX2_CLEAR_REQUESTED: Nk,
                    IX2_EVENT_LISTENER_ADDED: Pk,
                    IX2_TEST_FRAME_RENDERED: qk,
                    IX2_EVENT_STATE_CHANGED: Mk,
                    IX2_ANIMATION_FRAME_CHANGED: Fk,
                    IX2_PARAMETER_CHANGED: Dk,
                    IX2_INSTANCE_ADDED: kk,
                    IX2_INSTANCE_STARTED: Gk,
                    IX2_INSTANCE_REMOVED: Vk,
                    IX2_ELEMENT_STATE_CHANGED: Uk,
                    IX2_ACTION_LIST_PLAYBACK_CHANGED: Wk,
                    IX2_VIEWPORT_WIDTH_CHANGED: Hk,
                    IX2_MEDIA_QUERIES_DEFINED: Bk,
                } = xe),
                ({ reifyState: Xk } = Dy.IX2VanillaUtils),
                (os = (e) => ({ type: xk, payload: { ...Xk(e) } })),
                (as = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
                    type: Ok,
                    payload: { hasBoundaryNodes: e, reducedMotion: t },
                })),
                (ss = () => ({ type: Ak })),
                (us = () => ({ type: Sk })),
                (jk = ({ rawData: e, defer: t }) => ({
                    type: Ck,
                    payload: { defer: t, rawData: e },
                })),
                (zk = ({
                    actionTypeId: e = Ue.GENERAL_START_ACTION,
                    actionListId: t,
                    actionItemId: r,
                    eventId: n,
                    allowEvents: i,
                    immediate: o,
                    testManual: s,
                    verbose: a,
                    rawData: u,
                }) => ({
                    type: Rk,
                    payload: {
                        actionTypeId: e,
                        actionListId: t,
                        actionItemId: r,
                        testManual: s,
                        eventId: n,
                        allowEvents: i,
                        immediate: o,
                        verbose: a,
                        rawData: u,
                    },
                })),
                (Kk = (e) => ({ type: Lk, payload: { actionListId: e } })),
                (Yk = () => ({ type: Nk })),
                (hi = (e, t) => ({
                    type: Pk,
                    payload: { target: e, listenerParams: t },
                })),
                (Qk = (e = 1) => ({ type: qk, payload: { step: e } })),
                (cs = (e, t) => ({
                    type: Mk,
                    payload: { stateKey: e, newState: t },
                })),
                (mi = (e, t) => ({
                    type: Fk,
                    payload: { now: e, parameters: t },
                })),
                (yr = (e, t) => ({ type: Dk, payload: { key: e, value: t } })),
                (ls = (e) => ({ type: kk, payload: { ...e } })),
                (yi = (e, t) => ({
                    type: Gk,
                    payload: { instanceId: e, time: t },
                })),
                (fs = (e) => ({ type: Vk, payload: { instanceId: e } })),
                (ds = (e, t, r, n) => ({
                    type: Uk,
                    payload: {
                        elementId: e,
                        actionTypeId: t,
                        current: r,
                        actionItem: n,
                    },
                })),
                (Er = ({ actionListId: e, isPlaying: t }) => ({
                    type: Wk,
                    payload: { actionListId: e, isPlaying: t },
                })),
                (ps = ({ width: e, mediaQueries: t }) => ({
                    type: Hk,
                    payload: { width: e, mediaQueries: t },
                })),
                (gs = () => ({ type: Bk }));
        });
    var ke = {};
    Ve(ke, {
        elementContains: () => ms,
        getChildElements: () => aG,
        getClosestElement: () => rn,
        getProperty: () => tG,
        getQuerySelector: () => hs,
        getRefType: () => ys,
        getSiblingElements: () => sG,
        getStyle: () => eG,
        getValidDocument: () => nG,
        isSiblingNode: () => oG,
        matchSelector: () => rG,
        queryDocument: () => iG,
        setStyle: () => Jk,
    });
    function Jk(e, t, r) {
        e.style[t] = r;
    }
    function eG(e, t) {
        return t.startsWith("--")
            ? window
                  .getComputedStyle(document.documentElement)
                  .getPropertyValue(t)
            : e.style[t];
    }
    function tG(e, t) {
        return e[t];
    }
    function rG(e) {
        return (t) => t[vs](e);
    }
    function hs({ id: e, selector: t }) {
        if (e) {
            let r = e;
            if (e.indexOf(Gy) !== -1) {
                let n = e.split(Gy),
                    i = n[0];
                if (
                    ((r = n[1]),
                    i !== document.documentElement.getAttribute(Uy))
                )
                    return null;
            }
            return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
        }
        return t;
    }
    function nG(e) {
        return e == null || e === document.documentElement.getAttribute(Uy)
            ? document
            : null;
    }
    function iG(e, t) {
        return Array.prototype.slice.call(
            document.querySelectorAll(t ? e + " " + t : e)
        );
    }
    function ms(e, t) {
        return e.contains(t);
    }
    function oG(e, t) {
        return e !== t && e.parentNode === t.parentNode;
    }
    function aG(e) {
        let t = [];
        for (let r = 0, { length: n } = e || []; r < n; r++) {
            let { children: i } = e[r],
                { length: o } = i;
            if (o) for (let s = 0; s < o; s++) t.push(i[s]);
        }
        return t;
    }
    function sG(e = []) {
        let t = [],
            r = [];
        for (let n = 0, { length: i } = e; n < i; n++) {
            let { parentNode: o } = e[n];
            if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
                continue;
            r.push(o);
            let s = o.firstElementChild;
            for (; s != null; )
                e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
        }
        return t;
    }
    function ys(e) {
        return e != null && typeof e == "object"
            ? e instanceof Element
                ? $k
                : Zk
            : null;
    }
    var Vy,
        vs,
        Gy,
        $k,
        Zk,
        Uy,
        rn,
        Wy = ye(() => {
            "use strict";
            Vy = pe(Ut());
            We();
            ({ ELEMENT_MATCHES: vs } = Vy.IX2BrowserSupport),
                ({
                    IX2_ID_DELIMITER: Gy,
                    HTML_ELEMENT: $k,
                    PLAIN_OBJECT: Zk,
                    WF_PAGE: Uy,
                } = Pe);
            rn = Element.prototype.closest
                ? (e, t) =>
                      document.documentElement.contains(e) ? e.closest(t) : null
                : (e, t) => {
                      if (!document.documentElement.contains(e)) return null;
                      let r = e;
                      do {
                          if (r[vs] && r[vs](t)) return r;
                          r = r.parentNode;
                      } while (r != null);
                      return null;
                  };
        });
    var Es = l((jj, By) => {
        var uG = ct(),
            Hy = Object.create,
            cG = (function () {
                function e() {}
                return function (t) {
                    if (!uG(t)) return {};
                    if (Hy) return Hy(t);
                    e.prototype = t;
                    var r = new e();
                    return (e.prototype = void 0), r;
                };
            })();
        By.exports = cG;
    });
    var bi = l((zj, Xy) => {
        function lG() {}
        Xy.exports = lG;
    });
    var wi = l((Kj, jy) => {
        var fG = Es(),
            dG = bi();
        function _i(e, t) {
            (this.__wrapped__ = e),
                (this.__actions__ = []),
                (this.__chain__ = !!t),
                (this.__index__ = 0),
                (this.__values__ = void 0);
        }
        _i.prototype = fG(dG.prototype);
        _i.prototype.constructor = _i;
        jy.exports = _i;
    });
    var Qy = l((Yj, Yy) => {
        var zy = Qt(),
            pG = Gr(),
            gG = Oe(),
            Ky = zy ? zy.isConcatSpreadable : void 0;
        function vG(e) {
            return gG(e) || pG(e) || !!(Ky && e && e[Ky]);
        }
        Yy.exports = vG;
    });
    var Jy = l((Qj, Zy) => {
        var hG = Un(),
            mG = Qy();
        function $y(e, t, r, n, i) {
            var o = -1,
                s = e.length;
            for (r || (r = mG), i || (i = []); ++o < s; ) {
                var a = e[o];
                t > 0 && r(a)
                    ? t > 1
                        ? $y(a, t - 1, r, n, i)
                        : hG(i, a)
                    : n || (i[i.length] = a);
            }
            return i;
        }
        Zy.exports = $y;
    });
    var tE = l(($j, eE) => {
        var yG = Jy();
        function EG(e) {
            var t = e == null ? 0 : e.length;
            return t ? yG(e, 1) : [];
        }
        eE.exports = EG;
    });
    var nE = l((Zj, rE) => {
        function bG(e, t, r) {
            switch (r.length) {
                case 0:
                    return e.call(t);
                case 1:
                    return e.call(t, r[0]);
                case 2:
                    return e.call(t, r[0], r[1]);
                case 3:
                    return e.call(t, r[0], r[1], r[2]);
            }
            return e.apply(t, r);
        }
        rE.exports = bG;
    });
    var aE = l((Jj, oE) => {
        var _G = nE(),
            iE = Math.max;
        function wG(e, t, r) {
            return (
                (t = iE(t === void 0 ? e.length - 1 : t, 0)),
                function () {
                    for (
                        var n = arguments,
                            i = -1,
                            o = iE(n.length - t, 0),
                            s = Array(o);
                        ++i < o;

                    )
                        s[i] = n[t + i];
                    i = -1;
                    for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
                    return (a[t] = r(s)), _G(e, this, a);
                }
            );
        }
        oE.exports = wG;
    });
    var uE = l((ez, sE) => {
        function IG(e) {
            return function () {
                return e;
            };
        }
        sE.exports = IG;
    });
    var fE = l((tz, lE) => {
        var TG = uE(),
            cE = rs(),
            xG = Jn(),
            OG = cE
                ? function (e, t) {
                      return cE(e, "toString", {
                          configurable: !0,
                          enumerable: !1,
                          value: TG(t),
                          writable: !0,
                      });
                  }
                : xG;
        lE.exports = OG;
    });
    var pE = l((rz, dE) => {
        var AG = 800,
            SG = 16,
            CG = Date.now;
        function RG(e) {
            var t = 0,
                r = 0;
            return function () {
                var n = CG(),
                    i = SG - (n - r);
                if (((r = n), i > 0)) {
                    if (++t >= AG) return arguments[0];
                } else t = 0;
                return e.apply(void 0, arguments);
            };
        }
        dE.exports = RG;
    });
    var vE = l((nz, gE) => {
        var LG = fE(),
            NG = pE(),
            PG = NG(LG);
        gE.exports = PG;
    });
    var mE = l((iz, hE) => {
        var qG = tE(),
            MG = aE(),
            FG = vE();
        function DG(e) {
            return FG(MG(e, void 0, qG), e + "");
        }
        hE.exports = DG;
    });
    var bE = l((oz, EE) => {
        var yE = fa(),
            kG = yE && new yE();
        EE.exports = kG;
    });
    var wE = l((az, _E) => {
        function GG() {}
        _E.exports = GG;
    });
    var bs = l((sz, TE) => {
        var IE = bE(),
            VG = wE(),
            UG = IE
                ? function (e) {
                      return IE.get(e);
                  }
                : VG;
        TE.exports = UG;
    });
    var OE = l((uz, xE) => {
        var WG = {};
        xE.exports = WG;
    });
    var _s = l((cz, SE) => {
        var AE = OE(),
            HG = Object.prototype,
            BG = HG.hasOwnProperty;
        function XG(e) {
            for (
                var t = e.name + "",
                    r = AE[t],
                    n = BG.call(AE, t) ? r.length : 0;
                n--;

            ) {
                var i = r[n],
                    o = i.func;
                if (o == null || o == e) return i.name;
            }
            return t;
        }
        SE.exports = XG;
    });
    var Ti = l((lz, CE) => {
        var jG = Es(),
            zG = bi(),
            KG = 4294967295;
        function Ii(e) {
            (this.__wrapped__ = e),
                (this.__actions__ = []),
                (this.__dir__ = 1),
                (this.__filtered__ = !1),
                (this.__iteratees__ = []),
                (this.__takeCount__ = KG),
                (this.__views__ = []);
        }
        Ii.prototype = jG(zG.prototype);
        Ii.prototype.constructor = Ii;
        CE.exports = Ii;
    });
    var LE = l((fz, RE) => {
        function YG(e, t) {
            var r = -1,
                n = e.length;
            for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
            return t;
        }
        RE.exports = YG;
    });
    var PE = l((dz, NE) => {
        var QG = Ti(),
            $G = wi(),
            ZG = LE();
        function JG(e) {
            if (e instanceof QG) return e.clone();
            var t = new $G(e.__wrapped__, e.__chain__);
            return (
                (t.__actions__ = ZG(e.__actions__)),
                (t.__index__ = e.__index__),
                (t.__values__ = e.__values__),
                t
            );
        }
        NE.exports = JG;
    });
    var FE = l((pz, ME) => {
        var eV = Ti(),
            qE = wi(),
            tV = bi(),
            rV = Oe(),
            nV = vt(),
            iV = PE(),
            oV = Object.prototype,
            aV = oV.hasOwnProperty;
        function xi(e) {
            if (nV(e) && !rV(e) && !(e instanceof eV)) {
                if (e instanceof qE) return e;
                if (aV.call(e, "__wrapped__")) return iV(e);
            }
            return new qE(e);
        }
        xi.prototype = tV.prototype;
        xi.prototype.constructor = xi;
        ME.exports = xi;
    });
    var kE = l((gz, DE) => {
        var sV = Ti(),
            uV = bs(),
            cV = _s(),
            lV = FE();
        function fV(e) {
            var t = cV(e),
                r = lV[t];
            if (typeof r != "function" || !(t in sV.prototype)) return !1;
            if (e === r) return !0;
            var n = uV(r);
            return !!n && e === n[0];
        }
        DE.exports = fV;
    });
    var WE = l((vz, UE) => {
        var GE = wi(),
            dV = mE(),
            pV = bs(),
            ws = _s(),
            gV = Oe(),
            VE = kE(),
            vV = "Expected a function",
            hV = 8,
            mV = 32,
            yV = 128,
            EV = 256;
        function bV(e) {
            return dV(function (t) {
                var r = t.length,
                    n = r,
                    i = GE.prototype.thru;
                for (e && t.reverse(); n--; ) {
                    var o = t[n];
                    if (typeof o != "function") throw new TypeError(vV);
                    if (i && !s && ws(o) == "wrapper") var s = new GE([], !0);
                }
                for (n = s ? n : r; ++n < r; ) {
                    o = t[n];
                    var a = ws(o),
                        u = a == "wrapper" ? pV(o) : void 0;
                    u &&
                    VE(u[0]) &&
                    u[1] == (yV | hV | mV | EV) &&
                    !u[4].length &&
                    u[9] == 1
                        ? (s = s[ws(u[0])].apply(s, u[3]))
                        : (s = o.length == 1 && VE(o) ? s[a]() : s.thru(o));
                }
                return function () {
                    var f = arguments,
                        E = f[0];
                    if (s && f.length == 1 && gV(E)) return s.plant(E).value();
                    for (var d = 0, b = r ? t[d].apply(this, f) : E; ++d < r; )
                        b = t[d].call(this, b);
                    return b;
                };
            });
        }
        UE.exports = bV;
    });
    var BE = l((hz, HE) => {
        var _V = WE(),
            wV = _V();
        HE.exports = wV;
    });
    var jE = l((mz, XE) => {
        function IV(e, t, r) {
            return (
                e === e &&
                    (r !== void 0 && (e = e <= r ? e : r),
                    t !== void 0 && (e = e >= t ? e : t)),
                e
            );
        }
        XE.exports = IV;
    });
    var KE = l((yz, zE) => {
        var TV = jE(),
            Is = ei();
        function xV(e, t, r) {
            return (
                r === void 0 && ((r = t), (t = void 0)),
                r !== void 0 && ((r = Is(r)), (r = r === r ? r : 0)),
                t !== void 0 && ((t = Is(t)), (t = t === t ? t : 0)),
                TV(Is(e), t, r)
            );
        }
        zE.exports = xV;
    });
    var nb,
        ib,
        ob,
        ab,
        OV,
        AV,
        SV,
        CV,
        RV,
        LV,
        NV,
        PV,
        qV,
        MV,
        FV,
        DV,
        kV,
        GV,
        VV,
        sb,
        ub,
        UV,
        WV,
        HV,
        cb,
        BV,
        XV,
        lb,
        jV,
        Ts,
        fb,
        YE,
        QE,
        db,
        on,
        zV,
        dt,
        pb,
        KV,
        Be,
        tt,
        an,
        gb,
        xs,
        $E,
        Os,
        YV,
        nn,
        QV,
        $V,
        ZV,
        vb,
        ZE,
        JV,
        JE,
        eU,
        tU,
        rU,
        eb,
        Oi,
        Ai,
        tb,
        rb,
        hb,
        mb = ye(() => {
            "use strict";
            (nb = pe(BE())), (ib = pe(Zn())), (ob = pe(KE()));
            We();
            As();
            Ei();
            (ab = pe(Ut())),
                ({
                    MOUSE_CLICK: OV,
                    MOUSE_SECOND_CLICK: AV,
                    MOUSE_DOWN: SV,
                    MOUSE_UP: CV,
                    MOUSE_OVER: RV,
                    MOUSE_OUT: LV,
                    DROPDOWN_CLOSE: NV,
                    DROPDOWN_OPEN: PV,
                    SLIDER_ACTIVE: qV,
                    SLIDER_INACTIVE: MV,
                    TAB_ACTIVE: FV,
                    TAB_INACTIVE: DV,
                    NAVBAR_CLOSE: kV,
                    NAVBAR_OPEN: GV,
                    MOUSE_MOVE: VV,
                    PAGE_SCROLL_DOWN: sb,
                    SCROLL_INTO_VIEW: ub,
                    SCROLL_OUT_OF_VIEW: UV,
                    PAGE_SCROLL_UP: WV,
                    SCROLLING_IN_VIEW: HV,
                    PAGE_FINISH: cb,
                    ECOMMERCE_CART_CLOSE: BV,
                    ECOMMERCE_CART_OPEN: XV,
                    PAGE_START: lb,
                    PAGE_SCROLL: jV,
                } = Je),
                (Ts = "COMPONENT_ACTIVE"),
                (fb = "COMPONENT_INACTIVE"),
                ({ COLON_DELIMITER: YE } = Pe),
                ({ getNamespacedParameterId: QE } = ab.IX2VanillaUtils),
                (db = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
                (on = db(({ element: e, nativeEvent: t }) => e === t.target)),
                (zV = db(({ element: e, nativeEvent: t }) =>
                    e.contains(t.target)
                )),
                (dt = (0, nb.default)([on, zV])),
                (pb = (e, t) => {
                    if (t) {
                        let { ixData: r } = e.getState(),
                            { events: n } = r,
                            i = n[t];
                        if (i && !YV[i.eventTypeId]) return i;
                    }
                    return null;
                }),
                (KV = ({ store: e, event: t }) => {
                    let { action: r } = t,
                        { autoStopEventId: n } = r.config;
                    return !!pb(e, n);
                }),
                (Be = (
                    { store: e, event: t, element: r, eventStateKey: n },
                    i
                ) => {
                    let { action: o, id: s } = t,
                        { actionListId: a, autoStopEventId: u } = o.config,
                        f = pb(e, u);
                    return (
                        f &&
                            br({
                                store: e,
                                eventId: u,
                                eventTarget: r,
                                eventStateKey: u + YE + n.split(YE)[1],
                                actionListId: (0, ib.default)(
                                    f,
                                    "action.config.actionListId"
                                ),
                            }),
                        br({
                            store: e,
                            eventId: s,
                            eventTarget: r,
                            eventStateKey: n,
                            actionListId: a,
                        }),
                        sn({
                            store: e,
                            eventId: s,
                            eventTarget: r,
                            eventStateKey: n,
                            actionListId: a,
                        }),
                        i
                    );
                }),
                (tt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
                (an = { handler: tt(dt, Be) }),
                (gb = { ...an, types: [Ts, fb].join(" ") }),
                (xs = [
                    {
                        target: window,
                        types: "resize orientationchange",
                        throttle: !0,
                    },
                    {
                        target: document,
                        types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
                        throttle: !0,
                    },
                ]),
                ($E = "mouseover mouseout"),
                (Os = { types: xs }),
                (YV = { PAGE_START: lb, PAGE_FINISH: cb }),
                (nn = (() => {
                    let e = window.pageXOffset !== void 0,
                        r =
                            document.compatMode === "CSS1Compat"
                                ? document.documentElement
                                : document.body;
                    return () => ({
                        scrollLeft: e ? window.pageXOffset : r.scrollLeft,
                        scrollTop: e ? window.pageYOffset : r.scrollTop,
                        stiffScrollTop: (0, ob.default)(
                            e ? window.pageYOffset : r.scrollTop,
                            0,
                            r.scrollHeight - window.innerHeight
                        ),
                        scrollWidth: r.scrollWidth,
                        scrollHeight: r.scrollHeight,
                        clientWidth: r.clientWidth,
                        clientHeight: r.clientHeight,
                        innerWidth: window.innerWidth,
                        innerHeight: window.innerHeight,
                    });
                })()),
                (QV = (e, t) =>
                    !(
                        e.left > t.right ||
                        e.right < t.left ||
                        e.top > t.bottom ||
                        e.bottom < t.top
                    )),
                ($V = ({ element: e, nativeEvent: t }) => {
                    let { type: r, target: n, relatedTarget: i } = t,
                        o = e.contains(n);
                    if (r === "mouseover" && o) return !0;
                    let s = e.contains(i);
                    return !!(r === "mouseout" && o && s);
                }),
                (ZV = (e) => {
                    let {
                            element: t,
                            event: { config: r },
                        } = e,
                        { clientWidth: n, clientHeight: i } = nn(),
                        o = r.scrollOffsetValue,
                        u =
                            r.scrollOffsetUnit === "PX"
                                ? o
                                : (i * (o || 0)) / 100;
                    return QV(t.getBoundingClientRect(), {
                        left: 0,
                        top: u,
                        right: n,
                        bottom: i - u,
                    });
                }),
                (vb = (e) => (t, r) => {
                    let { type: n } = t.nativeEvent,
                        i = [Ts, fb].indexOf(n) !== -1 ? n === Ts : r.isActive,
                        o = { ...r, isActive: i };
                    return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
                }),
                (ZE = (e) => (t, r) => {
                    let n = { elementHovered: $V(t) };
                    return (
                        ((r
                            ? n.elementHovered !== r.elementHovered
                            : n.elementHovered) &&
                            e(t, n)) ||
                        n
                    );
                }),
                (JV = (e) => (t, r) => {
                    let n = { ...r, elementVisible: ZV(t) };
                    return (
                        ((r
                            ? n.elementVisible !== r.elementVisible
                            : n.elementVisible) &&
                            e(t, n)) ||
                        n
                    );
                }),
                (JE =
                    (e) =>
                    (t, r = {}) => {
                        let {
                                stiffScrollTop: n,
                                scrollHeight: i,
                                innerHeight: o,
                            } = nn(),
                            {
                                event: { config: s, eventTypeId: a },
                            } = t,
                            { scrollOffsetValue: u, scrollOffsetUnit: f } = s,
                            E = f === "PX",
                            d = i - o,
                            b = Number((n / d).toFixed(2));
                        if (r && r.percentTop === b) return r;
                        let m = (E ? u : (o * (u || 0)) / 100) / d,
                            y,
                            I,
                            O = 0;
                        r &&
                            ((y = b > r.percentTop),
                            (I = r.scrollingDown !== y),
                            (O = I ? b : r.anchorTop));
                        let T = a === sb ? b >= O + m : b <= O - m,
                            P = {
                                ...r,
                                percentTop: b,
                                inBounds: T,
                                anchorTop: O,
                                scrollingDown: y,
                            };
                        return (
                            (r &&
                                T &&
                                (I || P.inBounds !== r.inBounds) &&
                                e(t, P)) ||
                            P
                        );
                    }),
                (eU = (e, t) =>
                    e.left > t.left &&
                    e.left < t.right &&
                    e.top > t.top &&
                    e.top < t.bottom),
                (tU = (e) => (t, r) => {
                    let n = { finished: document.readyState === "complete" };
                    return n.finished && !(r && r.finshed) && e(t), n;
                }),
                (rU = (e) => (t, r) => {
                    let n = { started: !0 };
                    return r || e(t), n;
                }),
                (eb =
                    (e) =>
                    (t, r = { clickCount: 0 }) => {
                        let n = { clickCount: (r.clickCount % 2) + 1 };
                        return (n.clickCount !== r.clickCount && e(t, n)) || n;
                    }),
                (Oi = (e = !0) => ({
                    ...gb,
                    handler: tt(
                        e ? dt : on,
                        vb((t, r) => (r.isActive ? an.handler(t, r) : r))
                    ),
                })),
                (Ai = (e = !0) => ({
                    ...gb,
                    handler: tt(
                        e ? dt : on,
                        vb((t, r) => (r.isActive ? r : an.handler(t, r)))
                    ),
                })),
                (tb = {
                    ...Os,
                    handler: JV((e, t) => {
                        let { elementVisible: r } = t,
                            { event: n, store: i } = e,
                            { ixData: o } = i.getState(),
                            { events: s } = o;
                        return !s[n.action.config.autoStopEventId] &&
                            t.triggered
                            ? t
                            : (n.eventTypeId === ub) === r
                            ? (Be(e), { ...t, triggered: !0 })
                            : t;
                    }),
                }),
                (rb = 0.05),
                (hb = {
                    [qV]: Oi(),
                    [MV]: Ai(),
                    [PV]: Oi(),
                    [NV]: Ai(),
                    [GV]: Oi(!1),
                    [kV]: Ai(!1),
                    [FV]: Oi(),
                    [DV]: Ai(),
                    [XV]: { types: "ecommerce-cart-open", handler: tt(dt, Be) },
                    [BV]: {
                        types: "ecommerce-cart-close",
                        handler: tt(dt, Be),
                    },
                    [OV]: {
                        types: "click",
                        handler: tt(
                            dt,
                            eb((e, { clickCount: t }) => {
                                KV(e) ? t === 1 && Be(e) : Be(e);
                            })
                        ),
                    },
                    [AV]: {
                        types: "click",
                        handler: tt(
                            dt,
                            eb((e, { clickCount: t }) => {
                                t === 2 && Be(e);
                            })
                        ),
                    },
                    [SV]: { ...an, types: "mousedown" },
                    [CV]: { ...an, types: "mouseup" },
                    [RV]: {
                        types: $E,
                        handler: tt(
                            dt,
                            ZE((e, t) => {
                                t.elementHovered && Be(e);
                            })
                        ),
                    },
                    [LV]: {
                        types: $E,
                        handler: tt(
                            dt,
                            ZE((e, t) => {
                                t.elementHovered || Be(e);
                            })
                        ),
                    },
                    [VV]: {
                        types: "mousemove mouseout scroll",
                        handler: (
                            {
                                store: e,
                                element: t,
                                eventConfig: r,
                                nativeEvent: n,
                                eventStateKey: i,
                            },
                            o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
                        ) => {
                            let {
                                    basedOn: s,
                                    selectedAxis: a,
                                    continuousParameterGroupId: u,
                                    reverse: f,
                                    restingState: E = 0,
                                } = r,
                                {
                                    clientX: d = o.clientX,
                                    clientY: b = o.clientY,
                                    pageX: m = o.pageX,
                                    pageY: y = o.pageY,
                                } = n,
                                I = a === "X_AXIS",
                                O = n.type === "mouseout",
                                T = E / 100,
                                P = u,
                                L = !1;
                            switch (s) {
                                case ut.VIEWPORT: {
                                    T = I
                                        ? Math.min(d, window.innerWidth) /
                                          window.innerWidth
                                        : Math.min(b, window.innerHeight) /
                                          window.innerHeight;
                                    break;
                                }
                                case ut.PAGE: {
                                    let {
                                        scrollLeft: F,
                                        scrollTop: G,
                                        scrollWidth: D,
                                        scrollHeight: K,
                                    } = nn();
                                    T = I
                                        ? Math.min(F + m, D) / D
                                        : Math.min(G + y, K) / K;
                                    break;
                                }
                                case ut.ELEMENT:
                                default: {
                                    P = QE(i, u);
                                    let F = n.type.indexOf("mouse") === 0;
                                    if (
                                        F &&
                                        dt({ element: t, nativeEvent: n }) !==
                                            !0
                                    )
                                        break;
                                    let G = t.getBoundingClientRect(),
                                        {
                                            left: D,
                                            top: K,
                                            width: z,
                                            height: Q,
                                        } = G;
                                    if (!F && !eU({ left: d, top: b }, G))
                                        break;
                                    (L = !0),
                                        (T = I ? (d - D) / z : (b - K) / Q);
                                    break;
                                }
                            }
                            return (
                                O &&
                                    (T > 1 - rb || T < rb) &&
                                    (T = Math.round(T)),
                                (s !== ut.ELEMENT ||
                                    L ||
                                    L !== o.elementHovered) &&
                                    ((T = f ? 1 - T : T), e.dispatch(yr(P, T))),
                                {
                                    elementHovered: L,
                                    clientX: d,
                                    clientY: b,
                                    pageX: m,
                                    pageY: y,
                                }
                            );
                        },
                    },
                    [jV]: {
                        types: xs,
                        handler: ({ store: e, eventConfig: t }) => {
                            let { continuousParameterGroupId: r, reverse: n } =
                                    t,
                                {
                                    scrollTop: i,
                                    scrollHeight: o,
                                    clientHeight: s,
                                } = nn(),
                                a = i / (o - s);
                            (a = n ? 1 - a : a), e.dispatch(yr(r, a));
                        },
                    },
                    [HV]: {
                        types: xs,
                        handler: (
                            {
                                element: e,
                                store: t,
                                eventConfig: r,
                                eventStateKey: n,
                            },
                            i = { scrollPercent: 0 }
                        ) => {
                            let {
                                    scrollLeft: o,
                                    scrollTop: s,
                                    scrollWidth: a,
                                    scrollHeight: u,
                                    clientHeight: f,
                                } = nn(),
                                {
                                    basedOn: E,
                                    selectedAxis: d,
                                    continuousParameterGroupId: b,
                                    startsEntering: m,
                                    startsExiting: y,
                                    addEndOffset: I,
                                    addStartOffset: O,
                                    addOffsetValue: T = 0,
                                    endOffsetValue: P = 0,
                                } = r,
                                L = d === "X_AXIS";
                            if (E === ut.VIEWPORT) {
                                let F = L ? o / a : s / u;
                                return (
                                    F !== i.scrollPercent &&
                                        t.dispatch(yr(b, F)),
                                    { scrollPercent: F }
                                );
                            } else {
                                let F = QE(n, b),
                                    G = e.getBoundingClientRect(),
                                    D = (O ? T : 0) / 100,
                                    K = (I ? P : 0) / 100;
                                (D = m ? D : 1 - D), (K = y ? K : 1 - K);
                                let z = G.top + Math.min(G.height * D, f),
                                    re = G.top + G.height * K - z,
                                    j = Math.min(f + re, u),
                                    w = Math.min(Math.max(0, f - z), j) / j;
                                return (
                                    w !== i.scrollPercent &&
                                        t.dispatch(yr(F, w)),
                                    { scrollPercent: w }
                                );
                            }
                        },
                    },
                    [ub]: tb,
                    [UV]: tb,
                    [sb]: {
                        ...Os,
                        handler: JE((e, t) => {
                            t.scrollingDown && Be(e);
                        }),
                    },
                    [WV]: {
                        ...Os,
                        handler: JE((e, t) => {
                            t.scrollingDown || Be(e);
                        }),
                    },
                    [cb]: {
                        types: "readystatechange IX2_PAGE_UPDATE",
                        handler: tt(on, tU(Be)),
                    },
                    [lb]: {
                        types: "readystatechange IX2_PAGE_UPDATE",
                        handler: tt(on, rU(Be)),
                    },
                });
        });
    var qb = {};
    Ve(qb, {
        observeRequests: () => wU,
        startActionGroup: () => sn,
        startEngine: () => Pi,
        stopActionGroup: () => br,
        stopAllActionGroups: () => Lb,
        stopEngine: () => qi,
    });
    function wU(e) {
        Wt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: xU }),
            Wt({
                store: e,
                select: ({ ixRequest: t }) => t.playback,
                onChange: OU,
            }),
            Wt({
                store: e,
                select: ({ ixRequest: t }) => t.stop,
                onChange: AU,
            }),
            Wt({
                store: e,
                select: ({ ixRequest: t }) => t.clear,
                onChange: SU,
            });
    }
    function IU(e) {
        Wt({
            store: e,
            select: ({ ixSession: t }) => t.mediaQueryKey,
            onChange: () => {
                qi(e),
                    Ab({ store: e, elementApi: ke }),
                    Pi({ store: e, allowEvents: !0 }),
                    Sb();
            },
        });
    }
    function TU(e, t) {
        let r = Wt({
            store: e,
            select: ({ ixSession: n }) => n.tick,
            onChange: (n) => {
                t(n), r();
            },
        });
    }
    function xU({ rawData: e, defer: t }, r) {
        let n = () => {
            Pi({ store: r, rawData: e, allowEvents: !0 }), Sb();
        };
        t ? setTimeout(n, 0) : n();
    }
    function Sb() {
        document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function OU(e, t) {
        let {
                actionTypeId: r,
                actionListId: n,
                actionItemId: i,
                eventId: o,
                allowEvents: s,
                immediate: a,
                testManual: u,
                verbose: f = !0,
            } = e,
            { rawData: E } = e;
        if (n && i && E && a) {
            let d = E.actionLists[n];
            d && (E = fU({ actionList: d, actionItemId: i, rawData: E }));
        }
        if (
            (Pi({ store: t, rawData: E, allowEvents: s, testManual: u }),
            (n && r === Ue.GENERAL_START_ACTION) || Ss(r))
        ) {
            br({ store: t, actionListId: n }),
                Rb({ store: t, actionListId: n, eventId: o });
            let d = sn({
                store: t,
                eventId: o,
                actionListId: n,
                immediate: a,
                verbose: f,
            });
            f && d && t.dispatch(Er({ actionListId: n, isPlaying: !a }));
        }
    }
    function AU({ actionListId: e }, t) {
        e ? br({ store: t, actionListId: e }) : Lb({ store: t }), qi(t);
    }
    function SU(e, t) {
        qi(t), Ab({ store: t, elementApi: ke });
    }
    function Pi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
        let { ixSession: i } = e.getState();
        t && e.dispatch(os(t)),
            i.active ||
                (e.dispatch(
                    as({
                        hasBoundaryNodes: !!document.querySelector(Ci),
                        reducedMotion:
                            document.body.hasAttribute("data-wf-ix-vacation") &&
                            window.matchMedia("(prefers-reduced-motion)")
                                .matches,
                    })
                ),
                r &&
                    (qU(e),
                    CU(),
                    e.getState().ixSession.hasDefinedMediaQueries && IU(e)),
                e.dispatch(ss()),
                RU(e, n));
    }
    function CU() {
        let { documentElement: e } = document;
        e.className.indexOf(yb) === -1 && (e.className += ` ${yb}`);
    }
    function RU(e, t) {
        let r = (n) => {
            let { ixSession: i, ixParameters: o } = e.getState();
            i.active &&
                (e.dispatch(mi(n, o)), t ? TU(e, r) : requestAnimationFrame(r));
        };
        r(window.performance.now());
    }
    function qi(e) {
        let { ixSession: t } = e.getState();
        if (t.active) {
            let { eventListeners: r } = t;
            r.forEach(LU), vU(), e.dispatch(us());
        }
    }
    function LU({ target: e, listenerParams: t }) {
        e.removeEventListener.apply(e, t);
    }
    function NU({
        store: e,
        eventStateKey: t,
        eventTarget: r,
        eventId: n,
        eventConfig: i,
        actionListId: o,
        parameterGroup: s,
        smoothing: a,
        restingValue: u,
    }) {
        let { ixData: f, ixSession: E } = e.getState(),
            { events: d } = f,
            b = d[n],
            { eventTypeId: m } = b,
            y = {},
            I = {},
            O = [],
            { continuousActionGroups: T } = s,
            { id: P } = s;
        dU(m, i) && (P = pU(t, P));
        let L = E.hasBoundaryNodes && r ? rn(r, Ci) : null;
        T.forEach((F) => {
            let { keyframe: G, actionItems: D } = F;
            D.forEach((K) => {
                let { actionTypeId: z } = K,
                    { target: Q } = K.config;
                if (!Q) return;
                let re = Q.boundaryMode ? L : null,
                    j = hU(Q) + Cs + z;
                if (((I[j] = PU(I[j], G, K)), !y[j])) {
                    y[j] = !0;
                    let { config: R } = K;
                    Ri({
                        config: R,
                        event: b,
                        eventTarget: r,
                        elementRoot: re,
                        elementApi: ke,
                    }).forEach((w) => {
                        O.push({ element: w, key: j });
                    });
                }
            });
        }),
            O.forEach(({ element: F, key: G }) => {
                let D = I[G],
                    K = (0, Et.default)(D, "[0].actionItems[0]", {}),
                    { actionTypeId: z } = K,
                    Q = Ni(z) ? Ls(z)(F, K) : null,
                    re = Rs({ element: F, actionItem: K, elementApi: ke }, Q);
                Ns({
                    store: e,
                    element: F,
                    eventId: n,
                    actionListId: o,
                    actionItem: K,
                    destination: re,
                    continuous: !0,
                    parameterId: P,
                    actionGroups: D,
                    smoothing: a,
                    restingValue: u,
                    pluginInstance: Q,
                });
            });
    }
    function PU(e = [], t, r) {
        let n = [...e],
            i;
        return (
            n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
            i == null &&
                ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
            n[i].actionItems.push(r),
            n
        );
    }
    function qU(e) {
        let { ixData: t } = e.getState(),
            { eventTypeMap: r } = t;
        Cb(e),
            (0, _r.default)(r, (i, o) => {
                let s = hb[o];
                if (!s) {
                    console.warn(`IX2 event type not configured: ${o}`);
                    return;
                }
                VU({ logic: s, store: e, events: i });
            });
        let { ixSession: n } = e.getState();
        n.eventListeners.length && FU(e);
    }
    function FU(e) {
        let t = () => {
            Cb(e);
        };
        MU.forEach((r) => {
            window.addEventListener(r, t), e.dispatch(hi(window, [r, t]));
        }),
            t();
    }
    function Cb(e) {
        let { ixSession: t, ixData: r } = e.getState(),
            n = window.innerWidth;
        if (n !== t.viewportWidth) {
            let { mediaQueries: i } = r;
            e.dispatch(ps({ width: n, mediaQueries: i }));
        }
    }
    function VU({ logic: e, store: t, events: r }) {
        UU(r);
        let { types: n, handler: i } = e,
            { ixData: o } = t.getState(),
            { actionLists: s } = o,
            a = DU(r, GU);
        if (!(0, _b.default)(a)) return;
        (0, _r.default)(a, (d, b) => {
            let m = r[b],
                { action: y, id: I, mediaQueries: O = o.mediaQueryKeys } = m,
                { actionListId: T } = y.config;
            mU(O, o.mediaQueryKeys) || t.dispatch(gs()),
                y.actionTypeId === Ue.GENERAL_CONTINUOUS_ACTION &&
                    (Array.isArray(m.config) ? m.config : [m.config]).forEach(
                        (L) => {
                            let { continuousParameterGroupId: F } = L,
                                G = (0, Et.default)(
                                    s,
                                    `${T}.continuousParameterGroups`,
                                    []
                                ),
                                D = (0, bb.default)(G, ({ id: Q }) => Q === F),
                                K = (L.smoothing || 0) / 100,
                                z = (L.restingState || 0) / 100;
                            D &&
                                d.forEach((Q, re) => {
                                    let j = I + Cs + re;
                                    NU({
                                        store: t,
                                        eventStateKey: j,
                                        eventTarget: Q,
                                        eventId: I,
                                        eventConfig: L,
                                        actionListId: T,
                                        parameterGroup: D,
                                        smoothing: K,
                                        restingValue: z,
                                    });
                                });
                        }
                    ),
                (y.actionTypeId === Ue.GENERAL_START_ACTION ||
                    Ss(y.actionTypeId)) &&
                    Rb({ store: t, actionListId: T, eventId: I });
        });
        let u = (d) => {
                let { ixSession: b } = t.getState();
                kU(a, (m, y, I) => {
                    let O = r[y],
                        T = b.eventState[I],
                        { action: P, mediaQueries: L = o.mediaQueryKeys } = O;
                    if (!Li(L, b.mediaQueryKey)) return;
                    let F = (G = {}) => {
                        let D = i(
                            {
                                store: t,
                                element: m,
                                event: O,
                                eventConfig: G,
                                nativeEvent: d,
                                eventStateKey: I,
                            },
                            T
                        );
                        yU(D, T) || t.dispatch(cs(I, D));
                    };
                    P.actionTypeId === Ue.GENERAL_CONTINUOUS_ACTION
                        ? (Array.isArray(O.config)
                              ? O.config
                              : [O.config]
                          ).forEach(F)
                        : F();
                });
            },
            f = (0, xb.default)(u, _U),
            E = ({ target: d = document, types: b, throttle: m }) => {
                b.split(" ")
                    .filter(Boolean)
                    .forEach((y) => {
                        let I = m ? f : u;
                        d.addEventListener(y, I), t.dispatch(hi(d, [y, I]));
                    });
            };
        Array.isArray(n) ? n.forEach(E) : typeof n == "string" && E(e);
    }
    function UU(e) {
        if (!bU) return;
        let t = {},
            r = "";
        for (let n in e) {
            let { eventTypeId: i, target: o } = e[n],
                s = hs(o);
            t[s] ||
                ((i === Je.MOUSE_CLICK || i === Je.MOUSE_SECOND_CLICK) &&
                    ((t[s] = !0),
                    (r +=
                        s + "{cursor: pointer;touch-action: manipulation;}")));
        }
        if (r) {
            let n = document.createElement("style");
            (n.textContent = r), document.body.appendChild(n);
        }
    }
    function Rb({ store: e, actionListId: t, eventId: r }) {
        let { ixData: n, ixSession: i } = e.getState(),
            { actionLists: o, events: s } = n,
            a = s[r],
            u = o[t];
        if (u && u.useFirstGroupAsInitialState) {
            let f = (0, Et.default)(u, "actionItemGroups[0].actionItems", []),
                E = (0, Et.default)(a, "mediaQueries", n.mediaQueryKeys);
            if (!Li(E, i.mediaQueryKey)) return;
            f.forEach((d) => {
                let { config: b, actionTypeId: m } = d,
                    y =
                        b?.target?.useEventTarget === !0 &&
                        b?.target?.objectId == null
                            ? { target: a.target, targets: a.targets }
                            : b,
                    I = Ri({ config: y, event: a, elementApi: ke }),
                    O = Ni(m);
                I.forEach((T) => {
                    let P = O ? Ls(m)(T, d) : null;
                    Ns({
                        destination: Rs(
                            { element: T, actionItem: d, elementApi: ke },
                            P
                        ),
                        immediate: !0,
                        store: e,
                        element: T,
                        eventId: r,
                        actionItem: d,
                        actionListId: t,
                        pluginInstance: P,
                    });
                });
            });
        }
    }
    function Lb({ store: e }) {
        let { ixInstances: t } = e.getState();
        (0, _r.default)(t, (r) => {
            if (!r.continuous) {
                let { actionListId: n, verbose: i } = r;
                Ps(r, e),
                    i && e.dispatch(Er({ actionListId: n, isPlaying: !1 }));
            }
        });
    }
    function br({
        store: e,
        eventId: t,
        eventTarget: r,
        eventStateKey: n,
        actionListId: i,
    }) {
        let { ixInstances: o, ixSession: s } = e.getState(),
            a = s.hasBoundaryNodes && r ? rn(r, Ci) : null;
        (0, _r.default)(o, (u) => {
            let f = (0, Et.default)(u, "actionItem.config.target.boundaryMode"),
                E = n ? u.eventStateKey === n : !0;
            if (u.actionListId === i && u.eventId === t && E) {
                if (a && f && !ms(a, u.element)) return;
                Ps(u, e),
                    u.verbose &&
                        e.dispatch(Er({ actionListId: i, isPlaying: !1 }));
            }
        });
    }
    function sn({
        store: e,
        eventId: t,
        eventTarget: r,
        eventStateKey: n,
        actionListId: i,
        groupIndex: o = 0,
        immediate: s,
        verbose: a,
    }) {
        let { ixData: u, ixSession: f } = e.getState(),
            { events: E } = u,
            d = E[t] || {},
            { mediaQueries: b = u.mediaQueryKeys } = d,
            m = (0, Et.default)(u, `actionLists.${i}`, {}),
            { actionItemGroups: y, useFirstGroupAsInitialState: I } = m;
        if (!y || !y.length) return !1;
        o >= y.length && (0, Et.default)(d, "config.loop") && (o = 0),
            o === 0 && I && o++;
        let T =
                (o === 0 || (o === 1 && I)) && Ss(d.action?.actionTypeId)
                    ? d.config.delay
                    : void 0,
            P = (0, Et.default)(y, [o, "actionItems"], []);
        if (!P.length || !Li(b, f.mediaQueryKey)) return !1;
        let L = f.hasBoundaryNodes && r ? rn(r, Ci) : null,
            F = uU(P),
            G = !1;
        return (
            P.forEach((D, K) => {
                let { config: z, actionTypeId: Q } = D,
                    re = Ni(Q),
                    { target: j } = z;
                if (!j) return;
                let R = j.boundaryMode ? L : null;
                Ri({
                    config: z,
                    event: d,
                    eventTarget: r,
                    elementRoot: R,
                    elementApi: ke,
                }).forEach((N, V) => {
                    let H = re ? Ls(Q)(N, D) : null,
                        te = re ? EU(Q)(N, D) : null;
                    G = !0;
                    let ne = F === K && V === 0,
                        W = cU({ element: N, actionItem: D }),
                        B = Rs(
                            { element: N, actionItem: D, elementApi: ke },
                            H
                        );
                    Ns({
                        store: e,
                        element: N,
                        actionItem: D,
                        eventId: t,
                        eventTarget: r,
                        eventStateKey: n,
                        actionListId: i,
                        groupIndex: o,
                        isCarrier: ne,
                        computedStyle: W,
                        destination: B,
                        immediate: s,
                        verbose: a,
                        pluginInstance: H,
                        pluginDuration: te,
                        instanceDelay: T,
                    });
                });
            }),
            G
        );
    }
    function Ns(e) {
        let { store: t, computedStyle: r, ...n } = e,
            {
                element: i,
                actionItem: o,
                immediate: s,
                pluginInstance: a,
                continuous: u,
                restingValue: f,
                eventId: E,
            } = n,
            d = !u,
            b = aU(),
            { ixElements: m, ixSession: y, ixData: I } = t.getState(),
            O = oU(m, i),
            { refState: T } = m[O] || {},
            P = ys(i),
            L = y.reducedMotion && Zo[o.actionTypeId],
            F;
        if (L && u)
            switch (I.events[E]?.eventTypeId) {
                case Je.MOUSE_MOVE:
                case Je.MOUSE_MOVE_IN_VIEWPORT:
                    F = f;
                    break;
                default:
                    F = 0.5;
                    break;
            }
        let G = lU(i, T, r, o, ke, a);
        if (
            (t.dispatch(
                ls({
                    instanceId: b,
                    elementId: O,
                    origin: G,
                    refType: P,
                    skipMotion: L,
                    skipToValue: F,
                    ...n,
                })
            ),
            Nb(document.body, "ix2-animation-started", b),
            s)
        ) {
            WU(t, b);
            return;
        }
        Wt({ store: t, select: ({ ixInstances: D }) => D[b], onChange: Pb }),
            d && t.dispatch(yi(b, y.tick));
    }
    function Ps(e, t) {
        Nb(document.body, "ix2-animation-stopping", {
            instanceId: e.id,
            state: t.getState(),
        });
        let { elementId: r, actionItem: n } = e,
            { ixElements: i } = t.getState(),
            { ref: o, refType: s } = i[r] || {};
        s === Ob && gU(o, n, ke), t.dispatch(fs(e.id));
    }
    function Nb(e, t, r) {
        let n = document.createEvent("CustomEvent");
        n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
    }
    function WU(e, t) {
        let { ixParameters: r } = e.getState();
        e.dispatch(yi(t, 0)), e.dispatch(mi(performance.now(), r));
        let { ixInstances: n } = e.getState();
        Pb(n[t], e);
    }
    function Pb(e, t) {
        let {
                active: r,
                continuous: n,
                complete: i,
                elementId: o,
                actionItem: s,
                actionTypeId: a,
                renderType: u,
                current: f,
                groupIndex: E,
                eventId: d,
                eventTarget: b,
                eventStateKey: m,
                actionListId: y,
                isCarrier: I,
                styleProp: O,
                verbose: T,
                pluginInstance: P,
            } = e,
            { ixData: L, ixSession: F } = t.getState(),
            { events: G } = L,
            D = G[d] || {},
            { mediaQueries: K = L.mediaQueryKeys } = D;
        if (Li(K, F.mediaQueryKey) && (n || r || i)) {
            if (f || (u === iU && i)) {
                t.dispatch(ds(o, a, f, s));
                let { ixElements: z } = t.getState(),
                    { ref: Q, refType: re, refState: j } = z[o] || {},
                    R = j && j[a];
                (re === Ob || Ni(a)) && sU(Q, j, R, d, s, O, ke, u, P);
            }
            if (i) {
                if (I) {
                    let z = sn({
                        store: t,
                        eventId: d,
                        eventTarget: b,
                        eventStateKey: m,
                        actionListId: y,
                        groupIndex: E + 1,
                        verbose: T,
                    });
                    T &&
                        !z &&
                        t.dispatch(Er({ actionListId: y, isPlaying: !1 }));
                }
                Ps(e, t);
            }
        }
    }
    var bb,
        Et,
        _b,
        wb,
        Ib,
        Tb,
        _r,
        xb,
        Si,
        nU,
        Ss,
        Cs,
        Ci,
        Ob,
        iU,
        yb,
        Ri,
        oU,
        Rs,
        Wt,
        aU,
        sU,
        Ab,
        uU,
        cU,
        lU,
        fU,
        dU,
        pU,
        Li,
        gU,
        vU,
        hU,
        mU,
        yU,
        Ni,
        Ls,
        EU,
        Eb,
        bU,
        _U,
        MU,
        DU,
        kU,
        GU,
        As = ye(() => {
            "use strict";
            (bb = pe(Aa())),
                (Et = pe(Zn())),
                (_b = pe(zm())),
                (wb = pe(Ey())),
                (Ib = pe(_y())),
                (Tb = pe(Iy())),
                (_r = pe(Cy())),
                (xb = pe(Fy()));
            We();
            Si = pe(Ut());
            Ei();
            Wy();
            mb();
            (nU = Object.keys(Rn)),
                (Ss = (e) => nU.includes(e)),
                ({
                    COLON_DELIMITER: Cs,
                    BOUNDARY_SELECTOR: Ci,
                    HTML_ELEMENT: Ob,
                    RENDER_GENERAL: iU,
                    W_MOD_IX: yb,
                } = Pe),
                ({
                    getAffectedElements: Ri,
                    getElementId: oU,
                    getDestinationValues: Rs,
                    observeStore: Wt,
                    getInstanceId: aU,
                    renderHTMLElement: sU,
                    clearAllStyles: Ab,
                    getMaxDurationItemIndex: uU,
                    getComputedStyle: cU,
                    getInstanceOrigin: lU,
                    reduceListToGroup: fU,
                    shouldNamespaceEventParameter: dU,
                    getNamespacedParameterId: pU,
                    shouldAllowMediaQuery: Li,
                    cleanupHTMLElement: gU,
                    clearObjectCache: vU,
                    stringifyTarget: hU,
                    mediaQueriesEqual: mU,
                    shallowEqual: yU,
                } = Si.IX2VanillaUtils),
                ({
                    isPluginType: Ni,
                    createPluginInstance: Ls,
                    getPluginDuration: EU,
                } = Si.IX2VanillaPlugins),
                (Eb = navigator.userAgent),
                (bU = Eb.match(/iPad/i) || Eb.match(/iPhone/)),
                (_U = 12);
            MU = ["resize", "orientationchange"];
            (DU = (e, t) => (0, wb.default)((0, Tb.default)(e, t), Ib.default)),
                (kU = (e, t) => {
                    (0, _r.default)(e, (r, n) => {
                        r.forEach((i, o) => {
                            let s = n + Cs + o;
                            t(i, n, s);
                        });
                    });
                }),
                (GU = (e) => {
                    let t = { target: e.target, targets: e.targets };
                    return Ri({ config: t, elementApi: ke });
                });
        });
    var Fb = l((bt) => {
        "use strict";
        var HU = mn().default,
            BU = mu().default;
        Object.defineProperty(bt, "__esModule", { value: !0 });
        bt.actions = void 0;
        bt.destroy = Mb;
        bt.init = YU;
        bt.setEnv = KU;
        bt.store = void 0;
        rf();
        var XU = Yo(),
            jU = BU((Sm(), it(Am))),
            qs = (As(), it(qb)),
            zU = HU((Ei(), it(ky)));
        bt.actions = zU;
        var Ms = (bt.store = (0, XU.createStore)(jU.default));
        function KU(e) {
            e() && (0, qs.observeRequests)(Ms);
        }
        function YU(e) {
            Mb(),
                (0, qs.startEngine)({ store: Ms, rawData: e, allowEvents: !0 });
        }
        function Mb() {
            (0, qs.stopEngine)(Ms);
        }
    });
    var Vb = l((Az, Gb) => {
        "use strict";
        var Db = Ne(),
            kb = Fb();
        kb.setEnv(Db.env);
        Db.define(
            "ix2",
            (Gb.exports = function () {
                return kb;
            })
        );
    });
    var Wb = l((Sz, Ub) => {
        "use strict";
        var wr = Ne();
        wr.define(
            "links",
            (Ub.exports = function (e, t) {
                var r = {},
                    n = e(window),
                    i,
                    o = wr.env(),
                    s = window.location,
                    a = document.createElement("a"),
                    u = "w--current",
                    f = /index\.(html|php)$/,
                    E = /\/$/,
                    d,
                    b;
                r.ready = r.design = r.preview = m;
                function m() {
                    (i = o && wr.env("design")),
                        (b = wr.env("slug") || s.pathname || ""),
                        wr.scroll.off(I),
                        (d = []);
                    for (var T = document.links, P = 0; P < T.length; ++P)
                        y(T[P]);
                    d.length && (wr.scroll.on(I), I());
                }
                function y(T) {
                    if (!T.getAttribute("hreflang")) {
                        var P =
                            (i && T.getAttribute("href-disabled")) ||
                            T.getAttribute("href");
                        if (((a.href = P), !(P.indexOf(":") >= 0))) {
                            var L = e(T);
                            if (
                                a.hash.length > 1 &&
                                a.host + a.pathname === s.host + s.pathname
                            ) {
                                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                                var F = e(a.hash);
                                F.length &&
                                    d.push({ link: L, sec: F, active: !1 });
                                return;
                            }
                            if (!(P === "#" || P === "")) {
                                var G =
                                    a.href === s.href ||
                                    P === b ||
                                    (f.test(P) && E.test(b));
                                O(L, u, G);
                            }
                        }
                    }
                }
                function I() {
                    var T = n.scrollTop(),
                        P = n.height();
                    t.each(d, function (L) {
                        if (!L.link.attr("hreflang")) {
                            var F = L.link,
                                G = L.sec,
                                D = G.offset().top,
                                K = G.outerHeight(),
                                z = P * 0.5,
                                Q =
                                    G.is(":visible") &&
                                    D + K - z >= T &&
                                    D + z <= T + P;
                            L.active !== Q && ((L.active = Q), O(F, u, Q));
                        }
                    });
                }
                function O(T, P, L) {
                    var F = T.hasClass(P);
                    (L && F) ||
                        (!L && !F) ||
                        (L ? T.addClass(P) : T.removeClass(P));
                }
                return r;
            })
        );
    });
    var Bb = l((Cz, Hb) => {
        "use strict";
        var Mi = Ne();
        Mi.define(
            "scroll",
            (Hb.exports = function (e) {
                var t = {
                        WF_CLICK_EMPTY: "click.wf-empty-link",
                        WF_CLICK_SCROLL: "click.wf-scroll",
                    },
                    r = window.location,
                    n = y() ? null : window.history,
                    i = e(window),
                    o = e(document),
                    s = e(document.body),
                    a =
                        window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        function (R) {
                            window.setTimeout(R, 15);
                        },
                    u = Mi.env("editor") ? ".w-editor-body" : "body",
                    f =
                        "header, " +
                        u +
                        " > .header, " +
                        u +
                        " > .w-nav:not([data-no-scroll])",
                    E = 'a[href="#"]',
                    d = 'a[href*="#"]:not(.w-tab-link):not(' + E + ")",
                    b =
                        '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
                    m = document.createElement("style");
                m.appendChild(document.createTextNode(b));
                function y() {
                    try {
                        return !!window.frameElement;
                    } catch {
                        return !0;
                    }
                }
                var I = /^#[a-zA-Z0-9][\w:.-]*$/;
                function O(R) {
                    return (
                        I.test(R.hash) &&
                        R.host + R.pathname === r.host + r.pathname
                    );
                }
                let T =
                    typeof window.matchMedia == "function" &&
                    window.matchMedia("(prefers-reduced-motion: reduce)");
                function P() {
                    return (
                        document.body.getAttribute("data-wf-scroll-motion") ===
                            "none" || T.matches
                    );
                }
                function L(R, w) {
                    var N;
                    switch (w) {
                        case "add":
                            (N = R.attr("tabindex")),
                                N
                                    ? R.attr("data-wf-tabindex-swap", N)
                                    : R.attr("tabindex", "-1");
                            break;
                        case "remove":
                            (N = R.attr("data-wf-tabindex-swap")),
                                N
                                    ? (R.attr("tabindex", N),
                                      R.removeAttr("data-wf-tabindex-swap"))
                                    : R.removeAttr("tabindex");
                            break;
                    }
                    R.toggleClass("wf-force-outline-none", w === "add");
                }
                function F(R) {
                    var w = R.currentTarget;
                    if (
                        !(
                            Mi.env("design") ||
                            (window.$.mobile &&
                                /(?:^|\s)ui-link(?:$|\s)/.test(w.className))
                        )
                    ) {
                        var N = O(w) ? w.hash : "";
                        if (N !== "") {
                            var V = e(N);
                            V.length &&
                                (R && (R.preventDefault(), R.stopPropagation()),
                                G(N, R),
                                window.setTimeout(
                                    function () {
                                        D(V, function () {
                                            L(V, "add"),
                                                V.get(0).focus({
                                                    preventScroll: !0,
                                                }),
                                                L(V, "remove");
                                        });
                                    },
                                    R ? 0 : 300
                                ));
                        }
                    }
                }
                function G(R) {
                    if (
                        r.hash !== R &&
                        n &&
                        n.pushState &&
                        !(Mi.env.chrome && r.protocol === "file:")
                    ) {
                        var w = n.state && n.state.hash;
                        w !== R && n.pushState({ hash: R }, "", R);
                    }
                }
                function D(R, w) {
                    var N = i.scrollTop(),
                        V = K(R);
                    if (N !== V) {
                        var H = z(R, N, V),
                            te = Date.now(),
                            ne = function () {
                                var W = Date.now() - te;
                                window.scroll(0, Q(N, V, W, H)),
                                    W <= H
                                        ? a(ne)
                                        : typeof w == "function" && w();
                            };
                        a(ne);
                    }
                }
                function K(R) {
                    var w = e(f),
                        N = w.css("position") === "fixed" ? w.outerHeight() : 0,
                        V = R.offset().top - N;
                    if (R.data("scroll") === "mid") {
                        var H = i.height() - N,
                            te = R.outerHeight();
                        te < H && (V -= Math.round((H - te) / 2));
                    }
                    return V;
                }
                function z(R, w, N) {
                    if (P()) return 0;
                    var V = 1;
                    return (
                        s.add(R).each(function (H, te) {
                            var ne = parseFloat(
                                te.getAttribute("data-scroll-time")
                            );
                            !isNaN(ne) && ne >= 0 && (V = ne);
                        }),
                        (472.143 * Math.log(Math.abs(w - N) + 125) - 2e3) * V
                    );
                }
                function Q(R, w, N, V) {
                    return N > V ? w : R + (w - R) * re(N / V);
                }
                function re(R) {
                    return R < 0.5
                        ? 4 * R * R * R
                        : (R - 1) * (2 * R - 2) * (2 * R - 2) + 1;
                }
                function j() {
                    var { WF_CLICK_EMPTY: R, WF_CLICK_SCROLL: w } = t;
                    o.on(w, d, F),
                        o.on(R, E, function (N) {
                            N.preventDefault();
                        }),
                        document.head.insertBefore(m, document.head.firstChild);
                }
                return { ready: j };
            })
        );
    });
    var jb = l((Rz, Xb) => {
        "use strict";
        var QU = Ne();
        QU.define(
            "touch",
            (Xb.exports = function (e) {
                var t = {},
                    r = window.getSelection;
                (e.event.special.tap = {
                    bindType: "click",
                    delegateType: "click",
                }),
                    (t.init = function (o) {
                        return (
                            (o = typeof o == "string" ? e(o).get(0) : o),
                            o ? new n(o) : null
                        );
                    });
                function n(o) {
                    var s = !1,
                        a = !1,
                        u = Math.min(Math.round(window.innerWidth * 0.04), 40),
                        f,
                        E;
                    o.addEventListener("touchstart", d, !1),
                        o.addEventListener("touchmove", b, !1),
                        o.addEventListener("touchend", m, !1),
                        o.addEventListener("touchcancel", y, !1),
                        o.addEventListener("mousedown", d, !1),
                        o.addEventListener("mousemove", b, !1),
                        o.addEventListener("mouseup", m, !1),
                        o.addEventListener("mouseout", y, !1);
                    function d(O) {
                        var T = O.touches;
                        (T && T.length > 1) ||
                            ((s = !0),
                            T
                                ? ((a = !0), (f = T[0].clientX))
                                : (f = O.clientX),
                            (E = f));
                    }
                    function b(O) {
                        if (s) {
                            if (a && O.type === "mousemove") {
                                O.preventDefault(), O.stopPropagation();
                                return;
                            }
                            var T = O.touches,
                                P = T ? T[0].clientX : O.clientX,
                                L = P - E;
                            (E = P),
                                Math.abs(L) > u &&
                                    r &&
                                    String(r()) === "" &&
                                    (i("swipe", O, {
                                        direction: L > 0 ? "right" : "left",
                                    }),
                                    y());
                        }
                    }
                    function m(O) {
                        if (s && ((s = !1), a && O.type === "mouseup")) {
                            O.preventDefault(), O.stopPropagation(), (a = !1);
                            return;
                        }
                    }
                    function y() {
                        s = !1;
                    }
                    function I() {
                        o.removeEventListener("touchstart", d, !1),
                            o.removeEventListener("touchmove", b, !1),
                            o.removeEventListener("touchend", m, !1),
                            o.removeEventListener("touchcancel", y, !1),
                            o.removeEventListener("mousedown", d, !1),
                            o.removeEventListener("mousemove", b, !1),
                            o.removeEventListener("mouseup", m, !1),
                            o.removeEventListener("mouseout", y, !1),
                            (o = null);
                    }
                    this.destroy = I;
                }
                function i(o, s, a) {
                    var u = e.Event(o, { originalEvent: s });
                    e(s.target).trigger(u, a);
                }
                return (t.instance = t.init(document)), t;
            })
        );
    });
    var Yb = l((Lz, Kb) => {
        "use strict";
        var Ht = Ne(),
            $U = jt(),
            rt = {
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                ESCAPE: 27,
                SPACE: 32,
                ENTER: 13,
                HOME: 36,
                END: 35,
            },
            zb = !0,
            ZU = /^#[a-zA-Z0-9\-_]+$/;
        Ht.define(
            "dropdown",
            (Kb.exports = function (e, t) {
                var r = t.debounce,
                    n = {},
                    i = Ht.env(),
                    o = !1,
                    s,
                    a = Ht.env.touch,
                    u = ".w-dropdown",
                    f = "w--open",
                    E = $U.triggers,
                    d = 900,
                    b = "focusout" + u,
                    m = "keydown" + u,
                    y = "mouseenter" + u,
                    I = "mousemove" + u,
                    O = "mouseleave" + u,
                    T = (a ? "click" : "mouseup") + u,
                    P = "w-close" + u,
                    L = "setting" + u,
                    F = e(document),
                    G;
                (n.ready = D),
                    (n.design = function () {
                        o && w(), (o = !1), D();
                    }),
                    (n.preview = function () {
                        (o = !0), D();
                    });
                function D() {
                    (s = i && Ht.env("design")), (G = F.find(u)), G.each(K);
                }
                function K(c, q) {
                    var U = e(q),
                        A = e.data(q, u);
                    A ||
                        (A = e.data(q, u, {
                            open: !1,
                            el: U,
                            config: {},
                            selectedIdx: -1,
                        })),
                        (A.toggle = A.el.children(".w-dropdown-toggle")),
                        (A.list = A.el.children(".w-dropdown-list")),
                        (A.links = A.list.find(
                            "a:not(.w-dropdown .w-dropdown a)"
                        )),
                        (A.complete = H(A)),
                        (A.mouseLeave = ne(A)),
                        (A.mouseUpOutside = V(A)),
                        (A.mouseMoveOutside = W(A)),
                        z(A);
                    var Z = A.toggle.attr("id"),
                        ue = A.list.attr("id");
                    Z || (Z = "w-dropdown-toggle-" + c),
                        ue || (ue = "w-dropdown-list-" + c),
                        A.toggle.attr("id", Z),
                        A.toggle.attr("aria-controls", ue),
                        A.toggle.attr("aria-haspopup", "menu"),
                        A.toggle.attr("aria-expanded", "false"),
                        A.toggle
                            .find(".w-icon-dropdown-toggle")
                            .attr("aria-hidden", "true"),
                        A.toggle.prop("tagName") !== "BUTTON" &&
                            (A.toggle.attr("role", "button"),
                            A.toggle.attr("tabindex") ||
                                A.toggle.attr("tabindex", "0")),
                        A.list.attr("id", ue),
                        A.list.attr("aria-labelledby", Z),
                        A.links.each(function (_, X) {
                            X.hasAttribute("tabindex") ||
                                X.setAttribute("tabindex", "0"),
                                ZU.test(X.hash) &&
                                    X.addEventListener(
                                        "click",
                                        R.bind(null, A)
                                    );
                        }),
                        A.el.off(u),
                        A.toggle.off(u),
                        A.nav && A.nav.off(u);
                    var oe = re(A, zb);
                    s && A.el.on(L, Q(A)),
                        s ||
                            (i && ((A.hovering = !1), R(A)),
                            A.config.hover && A.toggle.on(y, te(A)),
                            A.el.on(P, oe),
                            A.el.on(m, B(A)),
                            A.el.on(b, h(A)),
                            A.toggle.on(T, oe),
                            A.toggle.on(m, g(A)),
                            (A.nav = A.el.closest(".w-nav")),
                            A.nav.on(P, oe));
                }
                function z(c) {
                    var q = Number(c.el.css("z-index"));
                    (c.manageZ = q === d || q === d + 1),
                        (c.config = {
                            hover: c.el.attr("data-hover") === "true" && !a,
                            delay: c.el.attr("data-delay"),
                        });
                }
                function Q(c) {
                    return function (q, U) {
                        (U = U || {}),
                            z(c),
                            U.open === !0 && j(c, !0),
                            U.open === !1 && R(c, { immediate: !0 });
                    };
                }
                function re(c, q) {
                    return r(function (U) {
                        if (c.open || (U && U.type === "w-close"))
                            return R(c, { forceClose: q });
                        j(c);
                    });
                }
                function j(c) {
                    if (!c.open) {
                        N(c),
                            (c.open = !0),
                            c.list.addClass(f),
                            c.toggle.addClass(f),
                            c.toggle.attr("aria-expanded", "true"),
                            E.intro(0, c.el[0]),
                            Ht.redraw.up(),
                            c.manageZ && c.el.css("z-index", d + 1);
                        var q = Ht.env("editor");
                        s || F.on(T, c.mouseUpOutside),
                            c.hovering && !q && c.el.on(O, c.mouseLeave),
                            c.hovering && q && F.on(I, c.mouseMoveOutside),
                            window.clearTimeout(c.delayId);
                    }
                }
                function R(c, { immediate: q, forceClose: U } = {}) {
                    if (c.open && !(c.config.hover && c.hovering && !U)) {
                        c.toggle.attr("aria-expanded", "false"), (c.open = !1);
                        var A = c.config;
                        if (
                            (E.outro(0, c.el[0]),
                            F.off(T, c.mouseUpOutside),
                            F.off(I, c.mouseMoveOutside),
                            c.el.off(O, c.mouseLeave),
                            window.clearTimeout(c.delayId),
                            !A.delay || q)
                        )
                            return c.complete();
                        c.delayId = window.setTimeout(c.complete, A.delay);
                    }
                }
                function w() {
                    F.find(u).each(function (c, q) {
                        e(q).triggerHandler(P);
                    });
                }
                function N(c) {
                    var q = c.el[0];
                    G.each(function (U, A) {
                        var Z = e(A);
                        Z.is(q) || Z.has(q).length || Z.triggerHandler(P);
                    });
                }
                function V(c) {
                    return (
                        c.mouseUpOutside && F.off(T, c.mouseUpOutside),
                        r(function (q) {
                            if (c.open) {
                                var U = e(q.target);
                                if (!U.closest(".w-dropdown-toggle").length) {
                                    var A =
                                            e.inArray(c.el[0], U.parents(u)) ===
                                            -1,
                                        Z = Ht.env("editor");
                                    if (A) {
                                        if (Z) {
                                            var ue =
                                                    U.parents().length === 1 &&
                                                    U.parents("svg").length ===
                                                        1,
                                                oe = U.parents(
                                                    ".w-editor-bem-EditorHoverControls"
                                                ).length;
                                            if (ue || oe) return;
                                        }
                                        R(c);
                                    }
                                }
                            }
                        })
                    );
                }
                function H(c) {
                    return function () {
                        c.list.removeClass(f),
                            c.toggle.removeClass(f),
                            c.manageZ && c.el.css("z-index", "");
                    };
                }
                function te(c) {
                    return function () {
                        (c.hovering = !0), j(c);
                    };
                }
                function ne(c) {
                    return function () {
                        (c.hovering = !1), c.links.is(":focus") || R(c);
                    };
                }
                function W(c) {
                    return r(function (q) {
                        if (c.open) {
                            var U = e(q.target),
                                A = e.inArray(c.el[0], U.parents(u)) === -1;
                            if (A) {
                                var Z = U.parents(
                                        ".w-editor-bem-EditorHoverControls"
                                    ).length,
                                    ue = U.parents(
                                        ".w-editor-bem-RTToolbar"
                                    ).length,
                                    oe = e(".w-editor-bem-EditorOverlay"),
                                    _ =
                                        oe.find(".w-editor-edit-outline")
                                            .length ||
                                        oe.find(".w-editor-bem-RTToolbar")
                                            .length;
                                if (Z || ue || _) return;
                                (c.hovering = !1), R(c);
                            }
                        }
                    });
                }
                function B(c) {
                    return function (q) {
                        if (!(s || !c.open))
                            switch (
                                ((c.selectedIdx = c.links.index(
                                    document.activeElement
                                )),
                                q.keyCode)
                            ) {
                                case rt.HOME:
                                    return c.open
                                        ? ((c.selectedIdx = 0),
                                          v(c),
                                          q.preventDefault())
                                        : void 0;
                                case rt.END:
                                    return c.open
                                        ? ((c.selectedIdx = c.links.length - 1),
                                          v(c),
                                          q.preventDefault())
                                        : void 0;
                                case rt.ESCAPE:
                                    return (
                                        R(c),
                                        c.toggle.focus(),
                                        q.stopPropagation()
                                    );
                                case rt.ARROW_RIGHT:
                                case rt.ARROW_DOWN:
                                    return (
                                        (c.selectedIdx = Math.min(
                                            c.links.length - 1,
                                            c.selectedIdx + 1
                                        )),
                                        v(c),
                                        q.preventDefault()
                                    );
                                case rt.ARROW_LEFT:
                                case rt.ARROW_UP:
                                    return (
                                        (c.selectedIdx = Math.max(
                                            -1,
                                            c.selectedIdx - 1
                                        )),
                                        v(c),
                                        q.preventDefault()
                                    );
                            }
                    };
                }
                function v(c) {
                    c.links[c.selectedIdx] && c.links[c.selectedIdx].focus();
                }
                function g(c) {
                    var q = re(c, zb);
                    return function (U) {
                        if (!s) {
                            if (!c.open)
                                switch (U.keyCode) {
                                    case rt.ARROW_UP:
                                    case rt.ARROW_DOWN:
                                        return U.stopPropagation();
                                }
                            switch (U.keyCode) {
                                case rt.SPACE:
                                case rt.ENTER:
                                    return (
                                        q(),
                                        U.stopPropagation(),
                                        U.preventDefault()
                                    );
                            }
                        }
                    };
                }
                function h(c) {
                    return r(function (q) {
                        var { relatedTarget: U, target: A } = q,
                            Z = c.el[0],
                            ue = Z.contains(U) || Z.contains(A);
                        return ue || R(c), q.stopPropagation();
                    });
                }
                return n;
            })
        );
    });
    var Qb = l((Fs) => {
        "use strict";
        Object.defineProperty(Fs, "__esModule", { value: !0 });
        Fs.default = JU;
        function JU(e, t, r, n, i, o, s, a, u, f, E, d, b) {
            return function (m) {
                e(m);
                var y = m.form,
                    I = {
                        name:
                            y.attr("data-name") ||
                            y.attr("name") ||
                            "Untitled Form",
                        pageId: y.attr("data-wf-page-id") || "",
                        elementId: y.attr("data-wf-element-id") || "",
                        source: t.href,
                        test: r.env(),
                        fields: {},
                        fileUploads: {},
                        dolphin:
                            /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
                                y.html()
                            ),
                        trackingCookies: n(),
                    };
                let O = y.attr("data-wf-flow");
                O && (I.wfFlow = O), i(m);
                var T = o(y, I.fields);
                if (T) return s(T);
                if (((I.fileUploads = a(y)), u(m), !f)) {
                    E(m);
                    return;
                }
                d.ajax({
                    url: b,
                    type: "POST",
                    data: I,
                    dataType: "json",
                    crossDomain: !0,
                })
                    .done(function (P) {
                        P && P.code === 200 && (m.success = !0), E(m);
                    })
                    .fail(function () {
                        E(m);
                    });
            };
        }
    });
    var Zb = l((Pz, $b) => {
        "use strict";
        var Fi = Ne();
        Fi.define(
            "forms",
            ($b.exports = function (e, t) {
                var r = {},
                    n = e(document),
                    i,
                    o = window.location,
                    s = window.XDomainRequest && !window.atob,
                    a = ".w-form",
                    u,
                    f = /e(-)?mail/i,
                    E = /^\S+@\S+$/,
                    d = window.alert,
                    b = Fi.env(),
                    m,
                    y,
                    I,
                    O = /list-manage[1-9]?.com/i,
                    T = t.debounce(function () {
                        d(
                            "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
                        );
                    }, 100);
                r.ready =
                    r.design =
                    r.preview =
                        function () {
                            P(), !b && !m && F();
                        };
                function P() {
                    (u = e("html").attr("data-wf-site")),
                        (y = "https://webflow.com/api/v1/form/" + u),
                        s &&
                            y.indexOf("https://webflow.com") >= 0 &&
                            (y = y.replace(
                                "https://webflow.com",
                                "https://formdata.webflow.com"
                            )),
                        (I = `${y}/signFile`),
                        (i = e(a + " form")),
                        i.length && i.each(L);
                }
                function L(W, B) {
                    var v = e(B),
                        g = e.data(B, a);
                    g || (g = e.data(B, a, { form: v })), G(g);
                    var h = v.closest("div.w-form");
                    (g.done = h.find("> .w-form-done")),
                        (g.fail = h.find("> .w-form-fail")),
                        (g.fileUploads = h.find(".w-file-upload")),
                        g.fileUploads.each(function (U) {
                            H(U, g);
                        });
                    var c =
                        g.form.attr("aria-label") ||
                        g.form.attr("data-name") ||
                        "Form";
                    g.done.attr("aria-label") || g.form.attr("aria-label", c),
                        g.done.attr("tabindex", "-1"),
                        g.done.attr("role", "region"),
                        g.done.attr("aria-label") ||
                            g.done.attr("aria-label", c + " success"),
                        g.fail.attr("tabindex", "-1"),
                        g.fail.attr("role", "region"),
                        g.fail.attr("aria-label") ||
                            g.fail.attr("aria-label", c + " failure");
                    var q = (g.action = v.attr("action"));
                    if (
                        ((g.handler = null),
                        (g.redirect = v.attr("data-redirect")),
                        O.test(q))
                    ) {
                        g.handler = w;
                        return;
                    }
                    if (!q) {
                        if (u) {
                            g.handler = (() => {
                                let U = Qb().default;
                                return U(
                                    G,
                                    o,
                                    Fi,
                                    re,
                                    V,
                                    K,
                                    d,
                                    z,
                                    D,
                                    u,
                                    N,
                                    e,
                                    y
                                );
                            })();
                            return;
                        }
                        T();
                    }
                }
                function F() {
                    (m = !0),
                        n.on("submit", a + " form", function (U) {
                            var A = e.data(this, a);
                            A.handler && ((A.evt = U), A.handler(A));
                        });
                    let W = ".w-checkbox-input",
                        B = ".w-radio-input",
                        v = "w--redirected-checked",
                        g = "w--redirected-focus",
                        h = "w--redirected-focus-visible",
                        c = ":focus-visible, [data-wf-focus-visible]",
                        q = [
                            ["checkbox", W],
                            ["radio", B],
                        ];
                    n.on(
                        "change",
                        a + ' form input[type="checkbox"]:not(' + W + ")",
                        (U) => {
                            e(U.target).siblings(W).toggleClass(v);
                        }
                    ),
                        n.on("change", a + ' form input[type="radio"]', (U) => {
                            e(`input[name="${U.target.name}"]:not(${W})`).map(
                                (Z, ue) => e(ue).siblings(B).removeClass(v)
                            );
                            let A = e(U.target);
                            A.hasClass("w-radio-input") ||
                                A.siblings(B).addClass(v);
                        }),
                        q.forEach(([U, A]) => {
                            n.on(
                                "focus",
                                a + ` form input[type="${U}"]:not(` + A + ")",
                                (Z) => {
                                    e(Z.target).siblings(A).addClass(g),
                                        e(Z.target)
                                            .filter(c)
                                            .siblings(A)
                                            .addClass(h);
                                }
                            ),
                                n.on(
                                    "blur",
                                    a +
                                        ` form input[type="${U}"]:not(` +
                                        A +
                                        ")",
                                    (Z) => {
                                        e(Z.target)
                                            .siblings(A)
                                            .removeClass(`${g} ${h}`);
                                    }
                                );
                        });
                }
                function G(W) {
                    var B = (W.btn = W.form.find(':input[type="submit"]'));
                    (W.wait = W.btn.attr("data-wait") || null),
                        (W.success = !1),
                        B.prop("disabled", !1),
                        W.label && B.val(W.label);
                }
                function D(W) {
                    var B = W.btn,
                        v = W.wait;
                    B.prop("disabled", !0),
                        v && ((W.label = B.val()), B.val(v));
                }
                function K(W, B) {
                    var v = null;
                    return (
                        (B = B || {}),
                        W.find(
                            ':input:not([type="submit"]):not([type="file"])'
                        ).each(function (g, h) {
                            var c = e(h),
                                q = c.attr("type"),
                                U =
                                    c.attr("data-name") ||
                                    c.attr("name") ||
                                    "Field " + (g + 1);
                            U = encodeURIComponent(U);
                            var A = c.val();
                            if (q === "checkbox") A = c.is(":checked");
                            else if (q === "radio") {
                                if (B[U] === null || typeof B[U] == "string")
                                    return;
                                A =
                                    W.find(
                                        'input[name="' +
                                            c.attr("name") +
                                            '"]:checked'
                                    ).val() || null;
                            }
                            typeof A == "string" && (A = e.trim(A)),
                                (B[U] = A),
                                (v = v || j(c, q, U, A));
                        }),
                        v
                    );
                }
                function z(W) {
                    var B = {};
                    return (
                        W.find(':input[type="file"]').each(function (v, g) {
                            var h = e(g),
                                c =
                                    h.attr("data-name") ||
                                    h.attr("name") ||
                                    "File " + (v + 1),
                                q = h.attr("data-value");
                            typeof q == "string" && (q = e.trim(q)), (B[c] = q);
                        }),
                        B
                    );
                }
                let Q = { _mkto_trk: "marketo" };
                function re() {
                    return document.cookie.split("; ").reduce(function (B, v) {
                        let g = v.split("="),
                            h = g[0];
                        if (h in Q) {
                            let c = Q[h],
                                q = g.slice(1).join("=");
                            B[c] = q;
                        }
                        return B;
                    }, {});
                }
                function j(W, B, v, g) {
                    var h = null;
                    return (
                        B === "password"
                            ? (h = "Passwords cannot be submitted.")
                            : W.attr("required")
                            ? g
                                ? f.test(W.attr("type")) &&
                                  (E.test(g) ||
                                      (h =
                                          "Please enter a valid email address for: " +
                                          v))
                                : (h =
                                      "Please fill out the required field: " +
                                      v)
                            : v === "g-recaptcha-response" &&
                              !g &&
                              (h = "Please confirm you\u2019re not a robot."),
                        h
                    );
                }
                function R(W) {
                    V(W), N(W);
                }
                function w(W) {
                    G(W);
                    var B = W.form,
                        v = {};
                    if (/^https/.test(o.href) && !/^https/.test(W.action)) {
                        B.attr("method", "post");
                        return;
                    }
                    V(W);
                    var g = K(B, v);
                    if (g) return d(g);
                    D(W);
                    var h;
                    t.each(v, function (A, Z) {
                        f.test(Z) && (v.EMAIL = A),
                            /^((full[ _-]?)?name)$/i.test(Z) && (h = A),
                            /^(first[ _-]?name)$/i.test(Z) && (v.FNAME = A),
                            /^(last[ _-]?name)$/i.test(Z) && (v.LNAME = A);
                    }),
                        h &&
                            !v.FNAME &&
                            ((h = h.split(" ")),
                            (v.FNAME = h[0]),
                            (v.LNAME = v.LNAME || h[1]));
                    var c = W.action.replace("/post?", "/post-json?") + "&c=?",
                        q = c.indexOf("u=") + 2;
                    q = c.substring(q, c.indexOf("&", q));
                    var U = c.indexOf("id=") + 3;
                    (U = c.substring(U, c.indexOf("&", U))),
                        (v["b_" + q + "_" + U] = ""),
                        e
                            .ajax({ url: c, data: v, dataType: "jsonp" })
                            .done(function (A) {
                                (W.success =
                                    A.result === "success" ||
                                    /already/.test(A.msg)),
                                    W.success ||
                                        console.info(
                                            "MailChimp error: " + A.msg
                                        ),
                                    N(W);
                            })
                            .fail(function () {
                                N(W);
                            });
                }
                function N(W) {
                    var B = W.form,
                        v = W.redirect,
                        g = W.success;
                    if (g && v) {
                        Fi.location(v);
                        return;
                    }
                    W.done.toggle(g),
                        W.fail.toggle(!g),
                        g ? W.done.focus() : W.fail.focus(),
                        B.toggle(!g),
                        G(W);
                }
                function V(W) {
                    W.evt && W.evt.preventDefault(), (W.evt = null);
                }
                function H(W, B) {
                    if (!B.fileUploads || !B.fileUploads[W]) return;
                    var v,
                        g = e(B.fileUploads[W]),
                        h = g.find("> .w-file-upload-default"),
                        c = g.find("> .w-file-upload-uploading"),
                        q = g.find("> .w-file-upload-success"),
                        U = g.find("> .w-file-upload-error"),
                        A = h.find(".w-file-upload-input"),
                        Z = h.find(".w-file-upload-label"),
                        ue = Z.children(),
                        oe = U.find(".w-file-upload-error-msg"),
                        _ = q.find(".w-file-upload-file"),
                        X = q.find(".w-file-remove-link"),
                        ee = _.find(".w-file-upload-file-name"),
                        Y = oe.attr("data-w-size-error"),
                        fe = oe.attr("data-w-type-error"),
                        Te = oe.attr("data-w-generic-error");
                    if (
                        (b ||
                            Z.on("click keydown", function (S) {
                                (S.type === "keydown" &&
                                    S.which !== 13 &&
                                    S.which !== 32) ||
                                    (S.preventDefault(), A.click());
                            }),
                        Z.find(".w-icon-file-upload-icon").attr(
                            "aria-hidden",
                            "true"
                        ),
                        X.find(".w-icon-file-upload-remove").attr(
                            "aria-hidden",
                            "true"
                        ),
                        b)
                    )
                        A.on("click", function (S) {
                            S.preventDefault();
                        }),
                            Z.on("click", function (S) {
                                S.preventDefault();
                            }),
                            ue.on("click", function (S) {
                                S.preventDefault();
                            });
                    else {
                        X.on("click keydown", function (S) {
                            if (S.type === "keydown") {
                                if (S.which !== 13 && S.which !== 32) return;
                                S.preventDefault();
                            }
                            A.removeAttr("data-value"),
                                A.val(""),
                                ee.html(""),
                                h.toggle(!0),
                                q.toggle(!1),
                                Z.focus();
                        }),
                            A.on("change", function (S) {
                                (v =
                                    S.target &&
                                    S.target.files &&
                                    S.target.files[0]),
                                    v &&
                                        (h.toggle(!1),
                                        U.toggle(!1),
                                        c.toggle(!0),
                                        c.focus(),
                                        ee.text(v.name),
                                        M() || D(B),
                                        (B.fileUploads[W].uploading = !0),
                                        te(v, x));
                            });
                        var Le = Z.outerHeight();
                        A.height(Le), A.width(1);
                    }
                    function p(S) {
                        var k = S.responseJSON && S.responseJSON.msg,
                            ie = Te;
                        typeof k == "string" &&
                        k.indexOf("InvalidFileTypeError") === 0
                            ? (ie = fe)
                            : typeof k == "string" &&
                              k.indexOf("MaxFileSizeError") === 0 &&
                              (ie = Y),
                            oe.text(ie),
                            A.removeAttr("data-value"),
                            A.val(""),
                            c.toggle(!1),
                            h.toggle(!0),
                            U.toggle(!0),
                            U.focus(),
                            (B.fileUploads[W].uploading = !1),
                            M() || G(B);
                    }
                    function x(S, k) {
                        if (S) return p(S);
                        var ie = k.fileName,
                            se = k.postData,
                            he = k.fileId,
                            J = k.s3Url;
                        A.attr("data-value", he), ne(J, se, v, ie, C);
                    }
                    function C(S) {
                        if (S) return p(S);
                        c.toggle(!1),
                            q.css("display", "inline-block"),
                            q.focus(),
                            (B.fileUploads[W].uploading = !1),
                            M() || G(B);
                    }
                    function M() {
                        var S =
                            (B.fileUploads && B.fileUploads.toArray()) || [];
                        return S.some(function (k) {
                            return k.uploading;
                        });
                    }
                }
                function te(W, B) {
                    var v = new URLSearchParams({ name: W.name, size: W.size });
                    e.ajax({ type: "GET", url: `${I}?${v}`, crossDomain: !0 })
                        .done(function (g) {
                            B(null, g);
                        })
                        .fail(function (g) {
                            B(g);
                        });
                }
                function ne(W, B, v, g, h) {
                    var c = new FormData();
                    for (var q in B) c.append(q, B[q]);
                    c.append("file", v, g),
                        e
                            .ajax({
                                type: "POST",
                                url: W,
                                data: c,
                                processData: !1,
                                contentType: !1,
                            })
                            .done(function () {
                                h(null);
                            })
                            .fail(function (U) {
                                h(U);
                            });
                }
                return r;
            })
        );
    });
    var t_ = l((qz, e_) => {
        "use strict";
        var Ds = Ne(),
            Jb = "w-condition-invisible",
            eW = "." + Jb;
        function tW(e) {
            return e.filter(function (t) {
                return !cn(t);
            });
        }
        function cn(e) {
            return !!(e.$el && e.$el.closest(eW).length);
        }
        function ks(e, t) {
            for (var r = e; r >= 0; r--) if (!cn(t[r])) return r;
            return -1;
        }
        function Gs(e, t) {
            for (var r = e; r <= t.length - 1; r++) if (!cn(t[r])) return r;
            return -1;
        }
        function rW(e, t) {
            return ks(e - 1, t) === -1;
        }
        function nW(e, t) {
            return Gs(e + 1, t) === -1;
        }
        function un(e, t) {
            e.attr("aria-label") || e.attr("aria-label", t);
        }
        function iW(e, t, r, n) {
            var i = r.tram,
                o = Array.isArray,
                s = "w-lightbox",
                a = s + "-",
                u = /(^|\s+)/g,
                f = [],
                E,
                d,
                b,
                m = [];
            function y(g, h) {
                return (
                    (f = o(g) ? g : [g]),
                    d || y.build(),
                    tW(f).length > 1 &&
                        ((d.items = d.empty),
                        f.forEach(function (c, q) {
                            var U = B("thumbnail"),
                                A = B("item")
                                    .prop("tabIndex", 0)
                                    .attr("aria-controls", "w-lightbox-view")
                                    .attr("role", "tab")
                                    .append(U);
                            un(A, `show item ${q + 1} of ${f.length}`),
                                cn(c) && A.addClass(Jb),
                                (d.items = d.items.add(A)),
                                re(c.thumbnailUrl || c.url, function (Z) {
                                    Z.prop("width") > Z.prop("height")
                                        ? H(Z, "wide")
                                        : H(Z, "tall"),
                                        U.append(H(Z, "thumbnail-image"));
                                });
                        }),
                        d.strip.empty().append(d.items),
                        H(d.content, "group")),
                    i(te(d.lightbox, "hide").trigger("focus"))
                        .add("opacity .3s")
                        .start({ opacity: 1 }),
                    H(d.html, "noscroll"),
                    y.show(h || 0)
                );
            }
            (y.build = function () {
                return (
                    y.destroy(),
                    (d = { html: r(t.documentElement), empty: r() }),
                    (d.arrowLeft = B("control left inactive")
                        .attr("role", "button")
                        .attr("aria-hidden", !0)
                        .attr("aria-controls", "w-lightbox-view")),
                    (d.arrowRight = B("control right inactive")
                        .attr("role", "button")
                        .attr("aria-hidden", !0)
                        .attr("aria-controls", "w-lightbox-view")),
                    (d.close = B("control close").attr("role", "button")),
                    un(d.arrowLeft, "previous image"),
                    un(d.arrowRight, "next image"),
                    un(d.close, "close lightbox"),
                    (d.spinner = B("spinner")
                        .attr("role", "progressbar")
                        .attr("aria-live", "polite")
                        .attr("aria-hidden", !1)
                        .attr("aria-busy", !0)
                        .attr("aria-valuemin", 0)
                        .attr("aria-valuemax", 100)
                        .attr("aria-valuenow", 0)
                        .attr("aria-valuetext", "Loading image")),
                    (d.strip = B("strip").attr("role", "tablist")),
                    (b = new w(d.spinner, N("hide"))),
                    (d.content = B("content").append(
                        d.spinner,
                        d.arrowLeft,
                        d.arrowRight,
                        d.close
                    )),
                    (d.container = B("container").append(d.content, d.strip)),
                    (d.lightbox = B("backdrop hide").append(d.container)),
                    d.strip.on("click", V("item"), L),
                    d.content
                        .on("swipe", F)
                        .on("click", V("left"), O)
                        .on("click", V("right"), T)
                        .on("click", V("close"), P)
                        .on("click", V("image, caption"), T),
                    d.container
                        .on("click", V("view"), P)
                        .on("dragstart", V("img"), D),
                    d.lightbox.on("keydown", K).on("focusin", G),
                    r(n).append(d.lightbox),
                    y
                );
            }),
                (y.destroy = function () {
                    d &&
                        (te(d.html, "noscroll"),
                        d.lightbox.remove(),
                        (d = void 0));
                }),
                (y.show = function (g) {
                    if (g !== E) {
                        var h = f[g];
                        if (!h) return y.hide();
                        if (cn(h)) {
                            if (g < E) {
                                var c = ks(g - 1, f);
                                g = c > -1 ? c : g;
                            } else {
                                var q = Gs(g + 1, f);
                                g = q > -1 ? q : g;
                            }
                            h = f[g];
                        }
                        var U = E;
                        (E = g),
                            d.spinner
                                .attr("aria-hidden", !1)
                                .attr("aria-busy", !0)
                                .attr("aria-valuenow", 0)
                                .attr("aria-valuetext", "Loading image"),
                            b.show();
                        var A = (h.html && v(h.width, h.height)) || h.url;
                        return (
                            re(A, function (Z) {
                                if (g !== E) return;
                                var ue = B("figure", "figure").append(
                                        H(Z, "image")
                                    ),
                                    oe = B("frame").append(ue),
                                    _ = B("view")
                                        .prop("tabIndex", 0)
                                        .attr("id", "w-lightbox-view")
                                        .append(oe),
                                    X,
                                    ee;
                                h.html &&
                                    ((X = r(h.html)),
                                    (ee = X.is("iframe")),
                                    ee && X.on("load", Y),
                                    ue.append(H(X, "embed"))),
                                    h.caption &&
                                        ue.append(
                                            B("caption", "figcaption").text(
                                                h.caption
                                            )
                                        ),
                                    d.spinner.before(_),
                                    ee || Y();
                                function Y() {
                                    if (
                                        (d.spinner
                                            .attr("aria-hidden", !0)
                                            .attr("aria-busy", !1)
                                            .attr("aria-valuenow", 100)
                                            .attr(
                                                "aria-valuetext",
                                                "Loaded image"
                                            ),
                                        b.hide(),
                                        g !== E)
                                    ) {
                                        _.remove();
                                        return;
                                    }
                                    let fe = rW(g, f);
                                    ne(d.arrowLeft, "inactive", fe),
                                        W(d.arrowLeft, fe),
                                        fe &&
                                            d.arrowLeft.is(":focus") &&
                                            d.arrowRight.focus();
                                    let Te = nW(g, f);
                                    if (
                                        (ne(d.arrowRight, "inactive", Te),
                                        W(d.arrowRight, Te),
                                        Te &&
                                            d.arrowRight.is(":focus") &&
                                            d.arrowLeft.focus(),
                                        d.view
                                            ? (i(d.view)
                                                  .add("opacity .3s")
                                                  .start({ opacity: 0 })
                                                  .then(j(d.view)),
                                              i(_)
                                                  .add("opacity .3s")
                                                  .add("transform .3s")
                                                  .set({
                                                      x:
                                                          g > U
                                                              ? "80px"
                                                              : "-80px",
                                                  })
                                                  .start({ opacity: 1, x: 0 }))
                                            : _.css("opacity", 1),
                                        (d.view = _),
                                        d.view.prop("tabIndex", 0),
                                        d.items)
                                    ) {
                                        te(d.items, "active"),
                                            d.items.removeAttr("aria-selected");
                                        var Le = d.items.eq(g);
                                        H(Le, "active"),
                                            Le.attr("aria-selected", !0),
                                            R(Le);
                                    }
                                }
                            }),
                            d.close.prop("tabIndex", 0),
                            r(":focus").addClass("active-lightbox"),
                            m.length === 0 &&
                                (r("body")
                                    .children()
                                    .each(function () {
                                        r(this).hasClass(
                                            "w-lightbox-backdrop"
                                        ) ||
                                            r(this).is("script") ||
                                            (m.push({
                                                node: r(this),
                                                hidden: r(this).attr(
                                                    "aria-hidden"
                                                ),
                                                tabIndex:
                                                    r(this).attr("tabIndex"),
                                            }),
                                            r(this)
                                                .attr("aria-hidden", !0)
                                                .attr("tabIndex", -1));
                                    }),
                                d.close.focus()),
                            y
                        );
                    }
                }),
                (y.hide = function () {
                    return (
                        i(d.lightbox)
                            .add("opacity .3s")
                            .start({ opacity: 0 })
                            .then(Q),
                        y
                    );
                }),
                (y.prev = function () {
                    var g = ks(E - 1, f);
                    g > -1 && y.show(g);
                }),
                (y.next = function () {
                    var g = Gs(E + 1, f);
                    g > -1 && y.show(g);
                });
            function I(g) {
                return function (h) {
                    this === h.target &&
                        (h.stopPropagation(), h.preventDefault(), g());
                };
            }
            var O = I(y.prev),
                T = I(y.next),
                P = I(y.hide),
                L = function (g) {
                    var h = r(this).index();
                    g.preventDefault(), y.show(h);
                },
                F = function (g, h) {
                    g.preventDefault(),
                        h.direction === "left"
                            ? y.next()
                            : h.direction === "right" && y.prev();
                },
                G = function () {
                    this.focus();
                };
            function D(g) {
                g.preventDefault();
            }
            function K(g) {
                var h = g.keyCode;
                h === 27 || z(h, "close")
                    ? y.hide()
                    : h === 37 || z(h, "left")
                    ? y.prev()
                    : h === 39 || z(h, "right")
                    ? y.next()
                    : z(h, "item") && r(":focus").click();
            }
            function z(g, h) {
                if (g !== 13 && g !== 32) return !1;
                var c = r(":focus").attr("class"),
                    q = N(h).trim();
                return c.includes(q);
            }
            function Q() {
                d &&
                    (d.strip.scrollLeft(0).empty(),
                    te(d.html, "noscroll"),
                    H(d.lightbox, "hide"),
                    d.view && d.view.remove(),
                    te(d.content, "group"),
                    H(d.arrowLeft, "inactive"),
                    H(d.arrowRight, "inactive"),
                    (E = d.view = void 0),
                    m.forEach(function (g) {
                        var h = g.node;
                        h &&
                            (g.hidden
                                ? h.attr("aria-hidden", g.hidden)
                                : h.removeAttr("aria-hidden"),
                            g.tabIndex
                                ? h.attr("tabIndex", g.tabIndex)
                                : h.removeAttr("tabIndex"));
                    }),
                    (m = []),
                    r(".active-lightbox")
                        .removeClass("active-lightbox")
                        .focus());
            }
            function re(g, h) {
                var c = B("img", "img");
                return (
                    c.one("load", function () {
                        h(c);
                    }),
                    c.attr("src", g),
                    c
                );
            }
            function j(g) {
                return function () {
                    g.remove();
                };
            }
            function R(g) {
                var h = g.get(0),
                    c = d.strip.get(0),
                    q = h.offsetLeft,
                    U = h.clientWidth,
                    A = c.scrollLeft,
                    Z = c.clientWidth,
                    ue = c.scrollWidth - Z,
                    oe;
                q < A
                    ? (oe = Math.max(0, q + U - Z))
                    : q + U > Z + A && (oe = Math.min(q, ue)),
                    oe != null &&
                        i(d.strip)
                            .add("scroll-left 500ms")
                            .start({ "scroll-left": oe });
            }
            function w(g, h, c) {
                (this.$element = g),
                    (this.className = h),
                    (this.delay = c || 200),
                    this.hide();
            }
            (w.prototype.show = function () {
                var g = this;
                g.timeoutId ||
                    (g.timeoutId = setTimeout(function () {
                        g.$element.removeClass(g.className), delete g.timeoutId;
                    }, g.delay));
            }),
                (w.prototype.hide = function () {
                    var g = this;
                    if (g.timeoutId) {
                        clearTimeout(g.timeoutId), delete g.timeoutId;
                        return;
                    }
                    g.$element.addClass(g.className);
                });
            function N(g, h) {
                return g.replace(u, (h ? " ." : " ") + a);
            }
            function V(g) {
                return N(g, !0);
            }
            function H(g, h) {
                return g.addClass(N(h));
            }
            function te(g, h) {
                return g.removeClass(N(h));
            }
            function ne(g, h, c) {
                return g.toggleClass(N(h), c);
            }
            function W(g, h) {
                return g.attr("aria-hidden", h).attr("tabIndex", h ? -1 : 0);
            }
            function B(g, h) {
                return H(r(t.createElement(h || "div")), g);
            }
            function v(g, h) {
                var c =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
                    g +
                    '" height="' +
                    h +
                    '"/>';
                return "data:image/svg+xml;charset=utf-8," + encodeURI(c);
            }
            return (
                (function () {
                    var g = e.navigator.userAgent,
                        h = /(iPhone|iPad|iPod);[^OS]*OS (\d)/,
                        c = g.match(h),
                        q =
                            g.indexOf("Android ") > -1 &&
                            g.indexOf("Chrome") === -1;
                    if (!q && (!c || c[2] > 7)) return;
                    var U = t.createElement("style");
                    t.head.appendChild(U), e.addEventListener("resize", A, !0);
                    function A() {
                        var Z = e.innerHeight,
                            ue = e.innerWidth,
                            oe =
                                ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                                Z +
                                "px}.w-lightbox-view {width:" +
                                ue +
                                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                                0.86 * Z +
                                "px}.w-lightbox-image {max-width:" +
                                ue +
                                "px;max-height:" +
                                Z +
                                "px}.w-lightbox-group .w-lightbox-image {max-height:" +
                                0.86 * Z +
                                "px}.w-lightbox-strip {padding: 0 " +
                                0.01 * Z +
                                "px}.w-lightbox-item {width:" +
                                0.1 * Z +
                                "px;padding:" +
                                0.02 * Z +
                                "px " +
                                0.01 * Z +
                                "px}.w-lightbox-thumbnail {height:" +
                                0.1 * Z +
                                "px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                                0.96 * Z +
                                "px}.w-lightbox-content {margin-top:" +
                                0.02 * Z +
                                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                                0.84 * Z +
                                "px}.w-lightbox-image {max-width:" +
                                0.96 * ue +
                                "px;max-height:" +
                                0.96 * Z +
                                "px}.w-lightbox-group .w-lightbox-image {max-width:" +
                                0.823 * ue +
                                "px;max-height:" +
                                0.84 * Z +
                                "px}}";
                        U.textContent = oe;
                    }
                    A();
                })(),
                y
            );
        }
        Ds.define(
            "lightbox",
            (e_.exports = function (e) {
                var t = {},
                    r = Ds.env(),
                    n = iW(
                        window,
                        document,
                        e,
                        r ? "#lightbox-mountpoint" : "body"
                    ),
                    i = e(document),
                    o,
                    s,
                    a = ".w-lightbox",
                    u;
                t.ready = t.design = t.preview = f;
                function f() {
                    (s = r && Ds.env("design")),
                        n.destroy(),
                        (u = {}),
                        (o = i.find(a)),
                        o.webflowLightBox(),
                        o.each(function () {
                            un(e(this), "open lightbox"),
                                e(this).attr("aria-haspopup", "dialog");
                        });
                }
                jQuery.fn.extend({
                    webflowLightBox: function () {
                        var m = this;
                        e.each(m, function (y, I) {
                            var O = e.data(I, a);
                            O ||
                                (O = e.data(I, a, {
                                    el: e(I),
                                    mode: "images",
                                    images: [],
                                    embed: "",
                                })),
                                O.el.off(a),
                                E(O),
                                s
                                    ? O.el.on("setting" + a, E.bind(null, O))
                                    : O.el
                                          .on("click" + a, d(O))
                                          .on("click" + a, function (T) {
                                              T.preventDefault();
                                          });
                        });
                    },
                });
                function E(m) {
                    var y = m.el.children(".w-json").html(),
                        I,
                        O;
                    if (!y) {
                        m.items = [];
                        return;
                    }
                    try {
                        y = JSON.parse(y);
                    } catch (T) {
                        console.error(
                            "Malformed lightbox JSON configuration.",
                            T
                        );
                    }
                    b(y),
                        y.items.forEach(function (T) {
                            T.$el = m.el;
                        }),
                        (I = y.group),
                        I
                            ? ((O = u[I]),
                              O || (O = u[I] = []),
                              (m.items = O),
                              y.items.length &&
                                  ((m.index = O.length),
                                  O.push.apply(O, y.items)))
                            : ((m.items = y.items), (m.index = 0));
                }
                function d(m) {
                    return function () {
                        m.items.length && n(m.items, m.index || 0);
                    };
                }
                function b(m) {
                    m.images &&
                        (m.images.forEach(function (y) {
                            y.type = "image";
                        }),
                        (m.items = m.images)),
                        m.embed &&
                            ((m.embed.type = "video"), (m.items = [m.embed])),
                        m.groupId && (m.group = m.groupId);
                }
                return t;
            })
        );
    });
    var n_ = l((Mz, r_) => {
        "use strict";
        var Ct = Ne(),
            oW = jt(),
            Re = {
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                ESCAPE: 27,
                SPACE: 32,
                ENTER: 13,
                HOME: 36,
                END: 35,
            };
        Ct.define(
            "navbar",
            (r_.exports = function (e, t) {
                var r = {},
                    n = e.tram,
                    i = e(window),
                    o = e(document),
                    s = t.debounce,
                    a,
                    u,
                    f,
                    E,
                    d = Ct.env(),
                    b = '<div class="w-nav-overlay" data-wf-ignore />',
                    m = ".w-nav",
                    y = "w--open",
                    I = "w--nav-dropdown-open",
                    O = "w--nav-dropdown-toggle-open",
                    T = "w--nav-dropdown-list-open",
                    P = "w--nav-link-open",
                    L = oW.triggers,
                    F = e();
                (r.ready = r.design = r.preview = G),
                    (r.destroy = function () {
                        (F = e()), D(), u && u.length && u.each(re);
                    });
                function G() {
                    (f = d && Ct.env("design")),
                        (E = Ct.env("editor")),
                        (a = e(document.body)),
                        (u = o.find(m)),
                        u.length && (u.each(Q), D(), K());
                }
                function D() {
                    Ct.resize.off(z);
                }
                function K() {
                    Ct.resize.on(z);
                }
                function z() {
                    u.each(h);
                }
                function Q(_, X) {
                    var ee = e(X),
                        Y = e.data(X, m);
                    Y ||
                        (Y = e.data(X, m, {
                            open: !1,
                            el: ee,
                            config: {},
                            selectedIdx: -1,
                        })),
                        (Y.menu = ee.find(".w-nav-menu")),
                        (Y.links = Y.menu.find(".w-nav-link")),
                        (Y.dropdowns = Y.menu.find(".w-dropdown")),
                        (Y.dropdownToggle = Y.menu.find(".w-dropdown-toggle")),
                        (Y.dropdownList = Y.menu.find(".w-dropdown-list")),
                        (Y.button = ee.find(".w-nav-button")),
                        (Y.container = ee.find(".w-container")),
                        (Y.overlayContainerId = "w-nav-overlay-" + _),
                        (Y.outside = v(Y));
                    var fe = ee.find(".w-nav-brand");
                    fe &&
                        fe.attr("href") === "/" &&
                        fe.attr("aria-label") == null &&
                        fe.attr("aria-label", "home"),
                        Y.button.attr("style", "-webkit-user-select: text;"),
                        Y.button.attr("aria-label") == null &&
                            Y.button.attr("aria-label", "menu"),
                        Y.button.attr("role", "button"),
                        Y.button.attr("tabindex", "0"),
                        Y.button.attr("aria-controls", Y.overlayContainerId),
                        Y.button.attr("aria-haspopup", "menu"),
                        Y.button.attr("aria-expanded", "false"),
                        Y.el.off(m),
                        Y.button.off(m),
                        Y.menu.off(m),
                        w(Y),
                        f
                            ? (j(Y), Y.el.on("setting" + m, N(Y)))
                            : (R(Y),
                              Y.button.on("click" + m, W(Y)),
                              Y.menu.on("click" + m, "a", B(Y)),
                              Y.button.on("keydown" + m, V(Y)),
                              Y.el.on("keydown" + m, H(Y))),
                        h(_, X);
                }
                function re(_, X) {
                    var ee = e.data(X, m);
                    ee && (j(ee), e.removeData(X, m));
                }
                function j(_) {
                    _.overlay &&
                        (oe(_, !0), _.overlay.remove(), (_.overlay = null));
                }
                function R(_) {
                    _.overlay ||
                        ((_.overlay = e(b).appendTo(_.el)),
                        _.overlay.attr("id", _.overlayContainerId),
                        (_.parent = _.menu.parent()),
                        oe(_, !0));
                }
                function w(_) {
                    var X = {},
                        ee = _.config || {},
                        Y = (X.animation =
                            _.el.attr("data-animation") || "default");
                    (X.animOver = /^over/.test(Y)),
                        (X.animDirect = /left$/.test(Y) ? -1 : 1),
                        ee.animation !== Y && _.open && t.defer(ne, _),
                        (X.easing = _.el.attr("data-easing") || "ease"),
                        (X.easing2 = _.el.attr("data-easing2") || "ease");
                    var fe = _.el.attr("data-duration");
                    (X.duration = fe != null ? Number(fe) : 400),
                        (X.docHeight = _.el.attr("data-doc-height")),
                        (_.config = X);
                }
                function N(_) {
                    return function (X, ee) {
                        ee = ee || {};
                        var Y = i.width();
                        w(_),
                            ee.open === !0 && Z(_, !0),
                            ee.open === !1 && oe(_, !0),
                            _.open &&
                                t.defer(function () {
                                    Y !== i.width() && ne(_);
                                });
                    };
                }
                function V(_) {
                    return function (X) {
                        switch (X.keyCode) {
                            case Re.SPACE:
                            case Re.ENTER:
                                return (
                                    W(_)(),
                                    X.preventDefault(),
                                    X.stopPropagation()
                                );
                            case Re.ESCAPE:
                                return (
                                    oe(_),
                                    X.preventDefault(),
                                    X.stopPropagation()
                                );
                            case Re.ARROW_RIGHT:
                            case Re.ARROW_DOWN:
                            case Re.HOME:
                            case Re.END:
                                return _.open
                                    ? (X.keyCode === Re.END
                                          ? (_.selectedIdx = _.links.length - 1)
                                          : (_.selectedIdx = 0),
                                      te(_),
                                      X.preventDefault(),
                                      X.stopPropagation())
                                    : (X.preventDefault(), X.stopPropagation());
                        }
                    };
                }
                function H(_) {
                    return function (X) {
                        if (_.open)
                            switch (
                                ((_.selectedIdx = _.links.index(
                                    document.activeElement
                                )),
                                X.keyCode)
                            ) {
                                case Re.HOME:
                                case Re.END:
                                    return (
                                        X.keyCode === Re.END
                                            ? (_.selectedIdx =
                                                  _.links.length - 1)
                                            : (_.selectedIdx = 0),
                                        te(_),
                                        X.preventDefault(),
                                        X.stopPropagation()
                                    );
                                case Re.ESCAPE:
                                    return (
                                        oe(_),
                                        _.button.focus(),
                                        X.preventDefault(),
                                        X.stopPropagation()
                                    );
                                case Re.ARROW_LEFT:
                                case Re.ARROW_UP:
                                    return (
                                        (_.selectedIdx = Math.max(
                                            -1,
                                            _.selectedIdx - 1
                                        )),
                                        te(_),
                                        X.preventDefault(),
                                        X.stopPropagation()
                                    );
                                case Re.ARROW_RIGHT:
                                case Re.ARROW_DOWN:
                                    return (
                                        (_.selectedIdx = Math.min(
                                            _.links.length - 1,
                                            _.selectedIdx + 1
                                        )),
                                        te(_),
                                        X.preventDefault(),
                                        X.stopPropagation()
                                    );
                            }
                    };
                }
                function te(_) {
                    if (_.links[_.selectedIdx]) {
                        var X = _.links[_.selectedIdx];
                        X.focus(), B(X);
                    }
                }
                function ne(_) {
                    _.open && (oe(_, !0), Z(_, !0));
                }
                function W(_) {
                    return s(function () {
                        _.open ? oe(_) : Z(_);
                    });
                }
                function B(_) {
                    return function (X) {
                        var ee = e(this),
                            Y = ee.attr("href");
                        if (!Ct.validClick(X.currentTarget)) {
                            X.preventDefault();
                            return;
                        }
                        Y && Y.indexOf("#") === 0 && _.open && oe(_);
                    };
                }
                function v(_) {
                    return (
                        _.outside && o.off("click" + m, _.outside),
                        function (X) {
                            var ee = e(X.target);
                            (E &&
                                ee.closest(".w-editor-bem-EditorOverlay")
                                    .length) ||
                                g(_, ee);
                        }
                    );
                }
                var g = s(function (_, X) {
                    if (_.open) {
                        var ee = X.closest(".w-nav-menu");
                        _.menu.is(ee) || oe(_);
                    }
                });
                function h(_, X) {
                    var ee = e.data(X, m),
                        Y = (ee.collapsed =
                            ee.button.css("display") !== "none");
                    if (
                        (ee.open && !Y && !f && oe(ee, !0), ee.container.length)
                    ) {
                        var fe = q(ee);
                        ee.links.each(fe), ee.dropdowns.each(fe);
                    }
                    ee.open && ue(ee);
                }
                var c = "max-width";
                function q(_) {
                    var X = _.container.css(c);
                    return (
                        X === "none" && (X = ""),
                        function (ee, Y) {
                            (Y = e(Y)),
                                Y.css(c, ""),
                                Y.css(c) === "none" && Y.css(c, X);
                        }
                    );
                }
                function U(_, X) {
                    X.setAttribute("data-nav-menu-open", "");
                }
                function A(_, X) {
                    X.removeAttribute("data-nav-menu-open");
                }
                function Z(_, X) {
                    if (_.open) return;
                    (_.open = !0),
                        _.menu.each(U),
                        _.links.addClass(P),
                        _.dropdowns.addClass(I),
                        _.dropdownToggle.addClass(O),
                        _.dropdownList.addClass(T),
                        _.button.addClass(y);
                    var ee = _.config,
                        Y = ee.animation;
                    (Y === "none" ||
                        !n.support.transform ||
                        ee.duration <= 0) &&
                        (X = !0);
                    var fe = ue(_),
                        Te = _.menu.outerHeight(!0),
                        Le = _.menu.outerWidth(!0),
                        p = _.el.height(),
                        x = _.el[0];
                    if (
                        (h(0, x),
                        L.intro(0, x),
                        Ct.redraw.up(),
                        f || o.on("click" + m, _.outside),
                        X)
                    ) {
                        S();
                        return;
                    }
                    var C = "transform " + ee.duration + "ms " + ee.easing;
                    if (
                        (_.overlay &&
                            ((F = _.menu.prev()),
                            _.overlay.show().append(_.menu)),
                        ee.animOver)
                    ) {
                        n(_.menu)
                            .add(C)
                            .set({ x: ee.animDirect * Le, height: fe })
                            .start({ x: 0 })
                            .then(S),
                            _.overlay && _.overlay.width(Le);
                        return;
                    }
                    var M = p + Te;
                    n(_.menu).add(C).set({ y: -M }).start({ y: 0 }).then(S);
                    function S() {
                        _.button.attr("aria-expanded", "true");
                    }
                }
                function ue(_) {
                    var X = _.config,
                        ee = X.docHeight ? o.height() : a.height();
                    return (
                        X.animOver
                            ? _.menu.height(ee)
                            : _.el.css("position") !== "fixed" &&
                              (ee -= _.el.outerHeight(!0)),
                        _.overlay && _.overlay.height(ee),
                        ee
                    );
                }
                function oe(_, X) {
                    if (!_.open) return;
                    (_.open = !1), _.button.removeClass(y);
                    var ee = _.config;
                    if (
                        ((ee.animation === "none" ||
                            !n.support.transform ||
                            ee.duration <= 0) &&
                            (X = !0),
                        L.outro(0, _.el[0]),
                        o.off("click" + m, _.outside),
                        X)
                    ) {
                        n(_.menu).stop(), x();
                        return;
                    }
                    var Y = "transform " + ee.duration + "ms " + ee.easing2,
                        fe = _.menu.outerHeight(!0),
                        Te = _.menu.outerWidth(!0),
                        Le = _.el.height();
                    if (ee.animOver) {
                        n(_.menu)
                            .add(Y)
                            .start({ x: Te * ee.animDirect })
                            .then(x);
                        return;
                    }
                    var p = Le + fe;
                    n(_.menu).add(Y).start({ y: -p }).then(x);
                    function x() {
                        _.menu.height(""),
                            n(_.menu).set({ x: 0, y: 0 }),
                            _.menu.each(A),
                            _.links.removeClass(P),
                            _.dropdowns.removeClass(I),
                            _.dropdownToggle.removeClass(O),
                            _.dropdownList.removeClass(T),
                            _.overlay &&
                                _.overlay.children().length &&
                                (F.length
                                    ? _.menu.insertAfter(F)
                                    : _.menu.prependTo(_.parent),
                                _.overlay.attr("style", "").hide()),
                            _.el.triggerHandler("w-close"),
                            _.button.attr("aria-expanded", "false");
                    }
                }
                return r;
            })
        );
    });
    var a_ = l((Fz, o_) => {
        "use strict";
        var Rt = Ne(),
            aW = jt(),
            pt = {
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                SPACE: 32,
                ENTER: 13,
                HOME: 36,
                END: 35,
            },
            i_ =
                'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
        Rt.define(
            "slider",
            (o_.exports = function (e, t) {
                var r = {},
                    n = e.tram,
                    i = e(document),
                    o,
                    s,
                    a = Rt.env(),
                    u = ".w-slider",
                    f = '<div class="w-slider-dot" data-wf-ignore />',
                    E =
                        '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
                    d = "w-slider-force-show",
                    b = aW.triggers,
                    m,
                    y = !1;
                (r.ready = function () {
                    (s = Rt.env("design")), I();
                }),
                    (r.design = function () {
                        (s = !0), setTimeout(I, 1e3);
                    }),
                    (r.preview = function () {
                        (s = !1), I();
                    }),
                    (r.redraw = function () {
                        (y = !0), I(), (y = !1);
                    }),
                    (r.destroy = O);
                function I() {
                    (o = i.find(u)), o.length && (o.each(L), !m && (O(), T()));
                }
                function O() {
                    Rt.resize.off(P), Rt.redraw.off(r.redraw);
                }
                function T() {
                    Rt.resize.on(P), Rt.redraw.on(r.redraw);
                }
                function P() {
                    o.filter(":visible").each(H);
                }
                function L(v, g) {
                    var h = e(g),
                        c = e.data(g, u);
                    c ||
                        (c = e.data(g, u, {
                            index: 0,
                            depth: 1,
                            hasFocus: { keyboard: !1, mouse: !1 },
                            el: h,
                            config: {},
                        })),
                        (c.mask = h.children(".w-slider-mask")),
                        (c.left = h.children(".w-slider-arrow-left")),
                        (c.right = h.children(".w-slider-arrow-right")),
                        (c.nav = h.children(".w-slider-nav")),
                        (c.slides = c.mask.children(".w-slide")),
                        c.slides.each(b.reset),
                        y && (c.maskWidth = 0),
                        h.attr("role") === void 0 && h.attr("role", "region"),
                        h.attr("aria-label") === void 0 &&
                            h.attr("aria-label", "carousel");
                    var q = c.mask.attr("id");
                    if (
                        (q ||
                            ((q = "w-slider-mask-" + v), c.mask.attr("id", q)),
                        !s &&
                            !c.ariaLiveLabel &&
                            (c.ariaLiveLabel = e(E).appendTo(c.mask)),
                        c.left.attr("role", "button"),
                        c.left.attr("tabindex", "0"),
                        c.left.attr("aria-controls", q),
                        c.left.attr("aria-label") === void 0 &&
                            c.left.attr("aria-label", "previous slide"),
                        c.right.attr("role", "button"),
                        c.right.attr("tabindex", "0"),
                        c.right.attr("aria-controls", q),
                        c.right.attr("aria-label") === void 0 &&
                            c.right.attr("aria-label", "next slide"),
                        !n.support.transform)
                    ) {
                        c.left.hide(), c.right.hide(), c.nav.hide(), (m = !0);
                        return;
                    }
                    c.el.off(u),
                        c.left.off(u),
                        c.right.off(u),
                        c.nav.off(u),
                        F(c),
                        s
                            ? (c.el.on("setting" + u, w(c)),
                              R(c),
                              (c.hasTimer = !1))
                            : (c.el.on("swipe" + u, w(c)),
                              c.left.on("click" + u, z(c)),
                              c.right.on("click" + u, Q(c)),
                              c.left.on("keydown" + u, K(c, z)),
                              c.right.on("keydown" + u, K(c, Q)),
                              c.nav.on("keydown" + u, "> div", w(c)),
                              c.config.autoplay &&
                                  !c.hasTimer &&
                                  ((c.hasTimer = !0), (c.timerCount = 1), j(c)),
                              c.el.on("mouseenter" + u, D(c, !0, "mouse")),
                              c.el.on("focusin" + u, D(c, !0, "keyboard")),
                              c.el.on("mouseleave" + u, D(c, !1, "mouse")),
                              c.el.on("focusout" + u, D(c, !1, "keyboard"))),
                        c.nav.on("click" + u, "> div", w(c)),
                        a ||
                            c.mask
                                .contents()
                                .filter(function () {
                                    return this.nodeType === 3;
                                })
                                .remove();
                    var U = h.filter(":hidden");
                    U.addClass(d);
                    var A = h.parents(":hidden");
                    A.addClass(d),
                        y || H(v, g),
                        U.removeClass(d),
                        A.removeClass(d);
                }
                function F(v) {
                    var g = {};
                    (g.crossOver = 0),
                        (g.animation = v.el.attr("data-animation") || "slide"),
                        g.animation === "outin" &&
                            ((g.animation = "cross"), (g.crossOver = 0.5)),
                        (g.easing = v.el.attr("data-easing") || "ease");
                    var h = v.el.attr("data-duration");
                    if (
                        ((g.duration = h != null ? parseInt(h, 10) : 500),
                        G(v.el.attr("data-infinite")) && (g.infinite = !0),
                        G(v.el.attr("data-disable-swipe")) &&
                            (g.disableSwipe = !0),
                        G(v.el.attr("data-hide-arrows"))
                            ? (g.hideArrows = !0)
                            : v.config.hideArrows &&
                              (v.left.show(), v.right.show()),
                        G(v.el.attr("data-autoplay")))
                    ) {
                        (g.autoplay = !0),
                            (g.delay =
                                parseInt(v.el.attr("data-delay"), 10) || 2e3),
                            (g.timerMax = parseInt(
                                v.el.attr("data-autoplay-limit"),
                                10
                            ));
                        var c = "mousedown" + u + " touchstart" + u;
                        s ||
                            v.el.off(c).one(c, function () {
                                R(v);
                            });
                    }
                    var q = v.right.width();
                    (g.edge = q ? q + 40 : 100), (v.config = g);
                }
                function G(v) {
                    return v === "1" || v === "true";
                }
                function D(v, g, h) {
                    return function (c) {
                        if (g) v.hasFocus[h] = g;
                        else if (
                            e.contains(v.el.get(0), c.relatedTarget) ||
                            ((v.hasFocus[h] = g),
                            (v.hasFocus.mouse && h === "keyboard") ||
                                (v.hasFocus.keyboard && h === "mouse"))
                        )
                            return;
                        g
                            ? (v.ariaLiveLabel.attr("aria-live", "polite"),
                              v.hasTimer && R(v))
                            : (v.ariaLiveLabel.attr("aria-live", "off"),
                              v.hasTimer && j(v));
                    };
                }
                function K(v, g) {
                    return function (h) {
                        switch (h.keyCode) {
                            case pt.SPACE:
                            case pt.ENTER:
                                return (
                                    g(v)(),
                                    h.preventDefault(),
                                    h.stopPropagation()
                                );
                        }
                    };
                }
                function z(v) {
                    return function () {
                        V(v, { index: v.index - 1, vector: -1 });
                    };
                }
                function Q(v) {
                    return function () {
                        V(v, { index: v.index + 1, vector: 1 });
                    };
                }
                function re(v, g) {
                    var h = null;
                    g === v.slides.length && (I(), te(v)),
                        t.each(v.anchors, function (c, q) {
                            e(c.els).each(function (U, A) {
                                e(A).index() === g && (h = q);
                            });
                        }),
                        h != null && V(v, { index: h, immediate: !0 });
                }
                function j(v) {
                    R(v);
                    var g = v.config,
                        h = g.timerMax;
                    (h && v.timerCount++ > h) ||
                        (v.timerId = window.setTimeout(function () {
                            v.timerId == null || s || (Q(v)(), j(v));
                        }, g.delay));
                }
                function R(v) {
                    window.clearTimeout(v.timerId), (v.timerId = null);
                }
                function w(v) {
                    return function (g, h) {
                        h = h || {};
                        var c = v.config;
                        if (s && g.type === "setting") {
                            if (h.select === "prev") return z(v)();
                            if (h.select === "next") return Q(v)();
                            if ((F(v), te(v), h.select == null)) return;
                            re(v, h.select);
                            return;
                        }
                        if (g.type === "swipe")
                            return c.disableSwipe || Rt.env("editor")
                                ? void 0
                                : h.direction === "left"
                                ? Q(v)()
                                : h.direction === "right"
                                ? z(v)()
                                : void 0;
                        if (v.nav.has(g.target).length) {
                            var q = e(g.target).index();
                            if (
                                (g.type === "click" && V(v, { index: q }),
                                g.type === "keydown")
                            )
                                switch (g.keyCode) {
                                    case pt.ENTER:
                                    case pt.SPACE: {
                                        V(v, { index: q }), g.preventDefault();
                                        break;
                                    }
                                    case pt.ARROW_LEFT:
                                    case pt.ARROW_UP: {
                                        N(v.nav, Math.max(q - 1, 0)),
                                            g.preventDefault();
                                        break;
                                    }
                                    case pt.ARROW_RIGHT:
                                    case pt.ARROW_DOWN: {
                                        N(v.nav, Math.min(q + 1, v.pages)),
                                            g.preventDefault();
                                        break;
                                    }
                                    case pt.HOME: {
                                        N(v.nav, 0), g.preventDefault();
                                        break;
                                    }
                                    case pt.END: {
                                        N(v.nav, v.pages), g.preventDefault();
                                        break;
                                    }
                                    default:
                                        return;
                                }
                        }
                    };
                }
                function N(v, g) {
                    var h = v.children().eq(g).focus();
                    v.children().not(h);
                }
                function V(v, g) {
                    g = g || {};
                    var h = v.config,
                        c = v.anchors;
                    v.previous = v.index;
                    var q = g.index,
                        U = {};
                    q < 0
                        ? ((q = c.length - 1),
                          h.infinite &&
                              ((U.x = -v.endX),
                              (U.from = 0),
                              (U.to = c[0].width)))
                        : q >= c.length &&
                          ((q = 0),
                          h.infinite &&
                              ((U.x = c[c.length - 1].width),
                              (U.from = -c[c.length - 1].x),
                              (U.to = U.from - U.x))),
                        (v.index = q);
                    var A = v.nav
                        .children()
                        .eq(q)
                        .addClass("w-active")
                        .attr("aria-pressed", "true")
                        .attr("tabindex", "0");
                    v.nav
                        .children()
                        .not(A)
                        .removeClass("w-active")
                        .attr("aria-pressed", "false")
                        .attr("tabindex", "-1"),
                        h.hideArrows &&
                            (v.index === c.length - 1
                                ? v.right.hide()
                                : v.right.show(),
                            v.index === 0 ? v.left.hide() : v.left.show());
                    var Z = v.offsetX || 0,
                        ue = (v.offsetX = -c[v.index].x),
                        oe = { x: ue, opacity: 1, visibility: "" },
                        _ = e(c[v.index].els),
                        X = e(c[v.previous] && c[v.previous].els),
                        ee = v.slides.not(_),
                        Y = h.animation,
                        fe = h.easing,
                        Te = Math.round(h.duration),
                        Le = g.vector || (v.index > v.previous ? 1 : -1),
                        p = "opacity " + Te + "ms " + fe,
                        x = "transform " + Te + "ms " + fe;
                    if (
                        (_.find(i_).removeAttr("tabindex"),
                        _.removeAttr("aria-hidden"),
                        _.find("*").removeAttr("aria-hidden"),
                        ee.find(i_).attr("tabindex", "-1"),
                        ee.attr("aria-hidden", "true"),
                        ee.find("*").attr("aria-hidden", "true"),
                        s || (_.each(b.intro), ee.each(b.outro)),
                        g.immediate && !y)
                    ) {
                        n(_).set(oe), S();
                        return;
                    }
                    if (v.index === v.previous) return;
                    if (
                        (s ||
                            v.ariaLiveLabel.text(
                                `Slide ${q + 1} of ${c.length}.`
                            ),
                        Y === "cross")
                    ) {
                        var C = Math.round(Te - Te * h.crossOver),
                            M = Math.round(Te - C);
                        (p = "opacity " + C + "ms " + fe),
                            n(X)
                                .set({ visibility: "" })
                                .add(p)
                                .start({ opacity: 0 }),
                            n(_)
                                .set({
                                    visibility: "",
                                    x: ue,
                                    opacity: 0,
                                    zIndex: v.depth++,
                                })
                                .add(p)
                                .wait(M)
                                .then({ opacity: 1 })
                                .then(S);
                        return;
                    }
                    if (Y === "fade") {
                        n(X).set({ visibility: "" }).stop(),
                            n(_)
                                .set({
                                    visibility: "",
                                    x: ue,
                                    opacity: 0,
                                    zIndex: v.depth++,
                                })
                                .add(p)
                                .start({ opacity: 1 })
                                .then(S);
                        return;
                    }
                    if (Y === "over") {
                        (oe = { x: v.endX }),
                            n(X).set({ visibility: "" }).stop(),
                            n(_)
                                .set({
                                    visibility: "",
                                    zIndex: v.depth++,
                                    x: ue + c[v.index].width * Le,
                                })
                                .add(x)
                                .start({ x: ue })
                                .then(S);
                        return;
                    }
                    h.infinite && U.x
                        ? (n(v.slides.not(X))
                              .set({ visibility: "", x: U.x })
                              .add(x)
                              .start({ x: ue }),
                          n(X)
                              .set({ visibility: "", x: U.from })
                              .add(x)
                              .start({ x: U.to }),
                          (v.shifted = X))
                        : (h.infinite &&
                              v.shifted &&
                              (n(v.shifted).set({ visibility: "", x: Z }),
                              (v.shifted = null)),
                          n(v.slides)
                              .set({ visibility: "" })
                              .add(x)
                              .start({ x: ue }));
                    function S() {
                        (_ = e(c[v.index].els)),
                            (ee = v.slides.not(_)),
                            Y !== "slide" && (oe.visibility = "hidden"),
                            n(ee).set(oe);
                    }
                }
                function H(v, g) {
                    var h = e.data(g, u);
                    if (h) {
                        if (W(h)) return te(h);
                        s && B(h) && te(h);
                    }
                }
                function te(v) {
                    var g = 1,
                        h = 0,
                        c = 0,
                        q = 0,
                        U = v.maskWidth,
                        A = U - v.config.edge;
                    A < 0 && (A = 0),
                        (v.anchors = [{ els: [], x: 0, width: 0 }]),
                        v.slides.each(function (ue, oe) {
                            c - h > A &&
                                (g++,
                                (h += U),
                                (v.anchors[g - 1] = {
                                    els: [],
                                    x: c,
                                    width: 0,
                                })),
                                (q = e(oe).outerWidth(!0)),
                                (c += q),
                                (v.anchors[g - 1].width += q),
                                v.anchors[g - 1].els.push(oe);
                            var _ = ue + 1 + " of " + v.slides.length;
                            e(oe).attr("aria-label", _),
                                e(oe).attr("role", "group");
                        }),
                        (v.endX = c),
                        s && (v.pages = null),
                        v.nav.length && v.pages !== g && ((v.pages = g), ne(v));
                    var Z = v.index;
                    Z >= g && (Z = g - 1), V(v, { immediate: !0, index: Z });
                }
                function ne(v) {
                    var g = [],
                        h,
                        c = v.el.attr("data-nav-spacing");
                    c && (c = parseFloat(c) + "px");
                    for (var q = 0, U = v.pages; q < U; q++)
                        (h = e(f)),
                            h
                                .attr(
                                    "aria-label",
                                    "Show slide " + (q + 1) + " of " + U
                                )
                                .attr("aria-pressed", "false")
                                .attr("role", "button")
                                .attr("tabindex", "-1"),
                            v.nav.hasClass("w-num") && h.text(q + 1),
                            c != null &&
                                h.css({ "margin-left": c, "margin-right": c }),
                            g.push(h);
                    v.nav.empty().append(g);
                }
                function W(v) {
                    var g = v.mask.width();
                    return v.maskWidth !== g ? ((v.maskWidth = g), !0) : !1;
                }
                function B(v) {
                    var g = 0;
                    return (
                        v.slides.each(function (h, c) {
                            g += e(c).outerWidth(!0);
                        }),
                        v.slidesWidth !== g ? ((v.slidesWidth = g), !0) : !1
                    );
                }
                return r;
            })
        );
    });
    var u_ = l((Dz, s_) => {
        "use strict";
        var Lt = Ne(),
            sW = jt();
        Lt.define(
            "tabs",
            (s_.exports = function (e) {
                var t = {},
                    r = e.tram,
                    n = e(document),
                    i,
                    o,
                    s = Lt.env,
                    a = s.safari,
                    u = s(),
                    f = "data-w-tab",
                    E = "data-w-pane",
                    d = ".w-tabs",
                    b = "w--current",
                    m = "w--tab-active",
                    y = sW.triggers,
                    I = !1;
                (t.ready = t.design = t.preview = O),
                    (t.redraw = function () {
                        (I = !0), O(), (I = !1);
                    }),
                    (t.destroy = function () {
                        (i = n.find(d)), i.length && (i.each(L), T());
                    });
                function O() {
                    (o = u && Lt.env("design")),
                        (i = n.find(d)),
                        i.length &&
                            (i.each(F),
                            Lt.env("preview") && !I && i.each(L),
                            T(),
                            P());
                }
                function T() {
                    Lt.redraw.off(t.redraw);
                }
                function P() {
                    Lt.redraw.on(t.redraw);
                }
                function L(j, R) {
                    var w = e.data(R, d);
                    w &&
                        (w.links && w.links.each(y.reset),
                        w.panes && w.panes.each(y.reset));
                }
                function F(j, R) {
                    var w = d.substr(1) + "-" + j,
                        N = e(R),
                        V = e.data(R, d);
                    if (
                        (V || (V = e.data(R, d, { el: N, config: {} })),
                        (V.current = null),
                        (V.tabIdentifier = w + "-" + f),
                        (V.paneIdentifier = w + "-" + E),
                        (V.menu = N.children(".w-tab-menu")),
                        (V.links = V.menu.children(".w-tab-link")),
                        (V.content = N.children(".w-tab-content")),
                        (V.panes = V.content.children(".w-tab-pane")),
                        V.el.off(d),
                        V.links.off(d),
                        V.menu.attr("role", "tablist"),
                        V.links.attr("tabindex", "-1"),
                        G(V),
                        !o)
                    ) {
                        V.links.on("click" + d, K(V)),
                            V.links.on("keydown" + d, z(V));
                        var H = V.links.filter("." + b),
                            te = H.attr(f);
                        te && Q(V, { tab: te, immediate: !0 });
                    }
                }
                function G(j) {
                    var R = {};
                    R.easing = j.el.attr("data-easing") || "ease";
                    var w = parseInt(j.el.attr("data-duration-in"), 10);
                    w = R.intro = w === w ? w : 0;
                    var N = parseInt(j.el.attr("data-duration-out"), 10);
                    (N = R.outro = N === N ? N : 0),
                        (R.immediate = !w && !N),
                        (j.config = R);
                }
                function D(j) {
                    var R = j.current;
                    return Array.prototype.findIndex.call(
                        j.links,
                        (w) => w.getAttribute(f) === R,
                        null
                    );
                }
                function K(j) {
                    return function (R) {
                        R.preventDefault();
                        var w = R.currentTarget.getAttribute(f);
                        w && Q(j, { tab: w });
                    };
                }
                function z(j) {
                    return function (R) {
                        var w = D(j),
                            N = R.key,
                            V = {
                                ArrowLeft: w - 1,
                                ArrowUp: w - 1,
                                ArrowRight: w + 1,
                                ArrowDown: w + 1,
                                End: j.links.length - 1,
                                Home: 0,
                            };
                        if (N in V) {
                            R.preventDefault();
                            var H = V[N];
                            H === -1 && (H = j.links.length - 1),
                                H === j.links.length && (H = 0);
                            var te = j.links[H],
                                ne = te.getAttribute(f);
                            ne && Q(j, { tab: ne });
                        }
                    };
                }
                function Q(j, R) {
                    R = R || {};
                    var w = j.config,
                        N = w.easing,
                        V = R.tab;
                    if (V !== j.current) {
                        j.current = V;
                        var H;
                        j.links.each(function (h, c) {
                            var q = e(c);
                            if (R.immediate || w.immediate) {
                                var U = j.panes[h];
                                c.id || (c.id = j.tabIdentifier + "-" + h),
                                    U.id || (U.id = j.paneIdentifier + "-" + h),
                                    (c.href = "#" + U.id),
                                    c.setAttribute("role", "tab"),
                                    c.setAttribute("aria-controls", U.id),
                                    c.setAttribute("aria-selected", "false"),
                                    U.setAttribute("role", "tabpanel"),
                                    U.setAttribute("aria-labelledby", c.id);
                            }
                            c.getAttribute(f) === V
                                ? ((H = c),
                                  q
                                      .addClass(b)
                                      .removeAttr("tabindex")
                                      .attr({ "aria-selected": "true" })
                                      .each(y.intro))
                                : q.hasClass(b) &&
                                  q
                                      .removeClass(b)
                                      .attr({
                                          tabindex: "-1",
                                          "aria-selected": "false",
                                      })
                                      .each(y.outro);
                        });
                        var te = [],
                            ne = [];
                        j.panes.each(function (h, c) {
                            var q = e(c);
                            c.getAttribute(f) === V
                                ? te.push(c)
                                : q.hasClass(m) && ne.push(c);
                        });
                        var W = e(te),
                            B = e(ne);
                        if (R.immediate || w.immediate) {
                            W.addClass(m).each(y.intro),
                                B.removeClass(m),
                                I || Lt.redraw.up();
                            return;
                        } else {
                            var v = window.scrollX,
                                g = window.scrollY;
                            H.focus(), window.scrollTo(v, g);
                        }
                        B.length && w.outro
                            ? (B.each(y.outro),
                              r(B)
                                  .add("opacity " + w.outro + "ms " + N, {
                                      fallback: a,
                                  })
                                  .start({ opacity: 0 })
                                  .then(() => re(w, B, W)))
                            : re(w, B, W);
                    }
                }
                function re(j, R, w) {
                    if (
                        (R.removeClass(m).css({
                            opacity: "",
                            transition: "",
                            transform: "",
                            width: "",
                            height: "",
                        }),
                        w.addClass(m).each(y.intro),
                        Lt.redraw.up(),
                        !j.intro)
                    )
                        return r(w).set({ opacity: 1 });
                    r(w)
                        .set({ opacity: 0 })
                        .redraw()
                        .add("opacity " + j.intro + "ms " + j.easing, {
                            fallback: a,
                        })
                        .start({ opacity: 1 });
                }
                return t;
            })
        );
    });
    Us();
    Ws();
    tu();
    nu();
    ou();
    uu();
    jt();
    Vb();
    Wb();
    Bb();
    jb();
    Yb();
    Zb();
    t_();
    n_();
    a_();
    u_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:
    
    timm/lib/timm.js:
      (*!
       * Timm
       *
       * Immutability helpers with fast reads and acceptable writes.
       *
       * @copyright Guillermo Grau Panea 2016
       * @license MIT
       *)
    */
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
    events: {
        e: {
            id: "e",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-2",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "bc339dbc-2a59-0847-4b81-c02c2ccf17bb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "bc339dbc-2a59-0847-4b81-c02c2ccf17bb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1702440162077,
        },
        "e-2": {
            id: "e-2",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "bc339dbc-2a59-0847-4b81-c02c2ccf17bb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "bc339dbc-2a59-0847-4b81-c02c2ccf17bb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1702440162077,
        },
        "e-3": {
            id: "e-3",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-99",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "2622062a-a813-b742-58d8-49522ee7a242",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "2622062a-a813-b742-58d8-49522ee7a242",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716462678375,
        },
        "e-4": {
            id: "e-4",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-98",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "2622062a-a813-b742-58d8-49522ee7a242",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "2622062a-a813-b742-58d8-49522ee7a242",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716462678375,
        },
        "e-7": {
            id: "e-7",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-8",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "4d983cc2-8477-8b10-9e87-c81881e04805",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "4d983cc2-8477-8b10-9e87-c81881e04805",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716465052161,
        },
        "e-8": {
            id: "e-8",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-7",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "4d983cc2-8477-8b10-9e87-c81881e04805",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "4d983cc2-8477-8b10-9e87-c81881e04805",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716465052161,
        },
        "e-13": {
            id: "e-13",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-14",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "4c666f9a-5c45-b8fd-2584-ea2b0c46f491",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "4c666f9a-5c45-b8fd-2584-ea2b0c46f491",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716522888588,
        },
        "e-14": {
            id: "e-14",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-13",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "4c666f9a-5c45-b8fd-2584-ea2b0c46f491",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "4c666f9a-5c45-b8fd-2584-ea2b0c46f491",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716522888588,
        },
        "e-15": {
            id: "e-15",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-16",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|e2ac78c2-1bdf-59dd-d25e-8426f79bfa0f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|e2ac78c2-1bdf-59dd-d25e-8426f79bfa0f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1712652648852,
        },
        "e-17": {
            id: "e-17",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-9",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-163",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|c027edd1-dbde-bba0-5982-0ec68235e217",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|c027edd1-dbde-bba0-5982-0ec68235e217",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1712137609464,
        },
        "e-18": {
            id: "e-18",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-10",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-17",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|c027edd1-dbde-bba0-5982-0ec68235e217",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|c027edd1-dbde-bba0-5982-0ec68235e217",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1712137609464,
        },
        "e-19": {
            id: "e-19",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-7",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-20",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|9c38230e-faf4-98af-7358-140ca0b63d14",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|9c38230e-faf4-98af-7358-140ca0b63d14",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716528449501,
        },
        "e-20": {
            id: "e-20",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-8",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-19",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|9c38230e-faf4-98af-7358-140ca0b63d14",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|9c38230e-faf4-98af-7358-140ca0b63d14",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716528449501,
        },
        "e-21": {
            id: "e-21",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-7",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-22",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|d140ffdc-ab0d-3767-f705-eba00023be90",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|d140ffdc-ab0d-3767-f705-eba00023be90",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716528453247,
        },
        "e-22": {
            id: "e-22",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-8",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-21",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|d140ffdc-ab0d-3767-f705-eba00023be90",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|d140ffdc-ab0d-3767-f705-eba00023be90",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716528453247,
        },
        "e-23": {
            id: "e-23",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-7",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-24",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|dd0b9f09-53cf-a40d-9b52-528409ab0b0a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|dd0b9f09-53cf-a40d-9b52-528409ab0b0a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716528454158,
        },
        "e-24": {
            id: "e-24",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-8",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-23",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|dd0b9f09-53cf-a40d-9b52-528409ab0b0a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|dd0b9f09-53cf-a40d-9b52-528409ab0b0a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716528454158,
        },
        "e-27": {
            id: "e-27",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-28",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|9b55ac65-0a99-2eae-4d33-bf8abe4736ab",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|9b55ac65-0a99-2eae-4d33-bf8abe4736ab",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716626652955,
        },
        "e-28": {
            id: "e-28",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-27",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|9b55ac65-0a99-2eae-4d33-bf8abe4736ab",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|9b55ac65-0a99-2eae-4d33-bf8abe4736ab",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716626652955,
        },
        "e-29": {
            id: "e-29",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-30",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|bee51c13-1866-03dc-e208-12593c97ac68",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|bee51c13-1866-03dc-e208-12593c97ac68",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716636637501,
        },
        "e-30": {
            id: "e-30",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-29",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|bee51c13-1866-03dc-e208-12593c97ac68",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|bee51c13-1866-03dc-e208-12593c97ac68",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716636637501,
        },
        "e-31": {
            id: "e-31",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-11",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-32",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|c0b83811-1ca4-87d0-f492-1c2d6d8e8af5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|c0b83811-1ca4-87d0-f492-1c2d6d8e8af5",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: true,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716638837335,
        },
        "e-34": {
            id: "e-34",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-35",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66503ca34b1be96b77c775e2|41fce662-98da-a9ac-efad-7836dbd8a8d1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66503ca34b1be96b77c775e2|41fce662-98da-a9ac-efad-7836dbd8a8d1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716803042400,
        },
        "e-35": {
            id: "e-35",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-34",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66503ca34b1be96b77c775e2|41fce662-98da-a9ac-efad-7836dbd8a8d1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66503ca34b1be96b77c775e2|41fce662-98da-a9ac-efad-7836dbd8a8d1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716803042400,
        },
        "e-36": {
            id: "e-36",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-37",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "81df812a-71af-8bae-2f5d-e1376378bb0a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "81df812a-71af-8bae-2f5d-e1376378bb0a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716804073296,
        },
        "e-37": {
            id: "e-37",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-36",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "81df812a-71af-8bae-2f5d-e1376378bb0a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "81df812a-71af-8bae-2f5d-e1376378bb0a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716804073296,
        },
        "e-38": {
            id: "e-38",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-39",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66545ebe427bda73419caa21|57f9316a-a33f-3595-427e-7b2b8ead97fe",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66545ebe427bda73419caa21|57f9316a-a33f-3595-427e-7b2b8ead97fe",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716805326700,
        },
        "e-39": {
            id: "e-39",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-38",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66545ebe427bda73419caa21|57f9316a-a33f-3595-427e-7b2b8ead97fe",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66545ebe427bda73419caa21|57f9316a-a33f-3595-427e-7b2b8ead97fe",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716805326700,
        },
        "e-42": {
            id: "e-42",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-13",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-43",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf4b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf4b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876127137,
        },
        "e-43": {
            id: "e-43",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-14",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-42",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf4b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf4b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876127138,
        },
        "e-44": {
            id: "e-44",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-45",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf56",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf56",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876296926,
        },
        "e-45": {
            id: "e-45",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-44",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf56",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf56",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876296926,
        },
        "e-46": {
            id: "e-46",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-47",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf61",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf61",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876434303,
        },
        "e-47": {
            id: "e-47",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-46",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf61",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf61",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876434303,
        },
        "e-48": {
            id: "e-48",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-49",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf6c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf6c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876447301,
        },
        "e-49": {
            id: "e-49",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-48",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf6c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9824798f-49e9-1ec7-d4f9-d869add9bf6c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716876447302,
        },
        "e-64": {
            id: "e-64",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-65",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee455",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee455",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1716891670262,
        },
        "e-66": {
            id: "e-66",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-269",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee464",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee464",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-67": {
            id: "e-67",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-66",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee464",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee464",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-68": {
            id: "e-68",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-259",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee471",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee471",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-69": {
            id: "e-69",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-270",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee471",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee471",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-70": {
            id: "e-70",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-71",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee47e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee47e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-71": {
            id: "e-71",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-260",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee47e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee47e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-72": {
            id: "e-72",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-73",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee48b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee48b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-73": {
            id: "e-73",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-72",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee48b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|7dddea3d-fdbe-be22-5cb4-9d89aceee48b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716891670262,
        },
        "e-76": {
            id: "e-76",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-11",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-77",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|f2241f05-86c7-29eb-f0d2-0937db2e9872",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|f2241f05-86c7-29eb-f0d2-0937db2e9872",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: true,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716893971870,
        },
        "e-78": {
            id: "e-78",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-79",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|80a99dd6-a8f0-044a-763d-661e3db48a8d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|80a99dd6-a8f0-044a-763d-661e3db48a8d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899246029,
        },
        "e-79": {
            id: "e-79",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-78",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|80a99dd6-a8f0-044a-763d-661e3db48a8d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|80a99dd6-a8f0-044a-763d-661e3db48a8d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899246029,
        },
        "e-80": {
            id: "e-80",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-81",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|83bb2eb7-3d3f-7c46-e07e-bad44c5a3f21",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|83bb2eb7-3d3f-7c46-e07e-bad44c5a3f21",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899622581,
        },
        "e-81": {
            id: "e-81",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-80",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|83bb2eb7-3d3f-7c46-e07e-bad44c5a3f21",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|83bb2eb7-3d3f-7c46-e07e-bad44c5a3f21",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899622581,
        },
        "e-82": {
            id: "e-82",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-83",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|ab5f845e-7767-49ba-9ea8-8ea0092abbfe",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|ab5f845e-7767-49ba-9ea8-8ea0092abbfe",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899631332,
        },
        "e-83": {
            id: "e-83",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-82",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|ab5f845e-7767-49ba-9ea8-8ea0092abbfe",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|ab5f845e-7767-49ba-9ea8-8ea0092abbfe",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899631332,
        },
        "e-84": {
            id: "e-84",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-85",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|f2aee256-b1b1-346a-fcf8-86d72581d198",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|f2aee256-b1b1-346a-fcf8-86d72581d198",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899631804,
        },
        "e-85": {
            id: "e-85",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-84",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|f2aee256-b1b1-346a-fcf8-86d72581d198",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|f2aee256-b1b1-346a-fcf8-86d72581d198",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716899631804,
        },
        "e-86": {
            id: "e-86",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-87",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9ffd9bf1-68cb-02b6-2781-7d64ed35c815",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9ffd9bf1-68cb-02b6-2781-7d64ed35c815",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716953938185,
        },
        "e-87": {
            id: "e-87",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-86",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|9ffd9bf1-68cb-02b6-2781-7d64ed35c815",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|9ffd9bf1-68cb-02b6-2781-7d64ed35c815",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716953938185,
        },
        "e-88": {
            id: "e-88",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-89",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778c0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778c0",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716803042400,
        },
        "e-89": {
            id: "e-89",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-88",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778c0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778c0",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716803042400,
        },
        "e-90": {
            id: "e-90",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-91",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656b567f024decdb442aa17|9dd267b5-335f-395b-d273-4d73fe0acbf4",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656b567f024decdb442aa17|9dd267b5-335f-395b-d273-4d73fe0acbf4",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1716961124887,
        },
        "e-92": {
            id: "e-92",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-19",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-93",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66558e982b224e7806a6a957|d0744075-f6a9-c2d6-4f61-eddcdcca307a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e982b224e7806a6a957|d0744075-f6a9-c2d6-4f61-eddcdcca307a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716974702690,
        },
        "e-93": {
            id: "e-93",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-20",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-92",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66558e982b224e7806a6a957|d0744075-f6a9-c2d6-4f61-eddcdcca307a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e982b224e7806a6a957|d0744075-f6a9-c2d6-4f61-eddcdcca307a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716974702690,
        },
        "e-94": {
            id: "e-94",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-11",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-95",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|9b00167f-90aa-102a-14b5-9f3544c8d7b7",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|9b00167f-90aa-102a-14b5-9f3544c8d7b7",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: true,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716979094273,
        },
        "e-96": {
            id: "e-96",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-97",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|02aad607-dae9-c002-f8b8-7ee18e22e9c0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|02aad607-dae9-c002-f8b8-7ee18e22e9c0",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1716979141454,
        },
        "e-100": {
            id: "e-100",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-11",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-101",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|9a98683d-ee95-1712-4ff0-c000da146d59",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|9a98683d-ee95-1712-4ff0-c000da146d59",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: true,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716986448016,
        },
        "e-102": {
            id: "e-102",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-103",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|68b05a66-9242-195e-ba41-0cd7899e24c6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|68b05a66-9242-195e-ba41-0cd7899e24c6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987101205,
        },
        "e-103": {
            id: "e-103",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-102",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|68b05a66-9242-195e-ba41-0cd7899e24c6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|68b05a66-9242-195e-ba41-0cd7899e24c6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987101206,
        },
        "e-104": {
            id: "e-104",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-105",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|91bcb33a-0838-3e5e-cc60-618e9f7ac7ec",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|91bcb33a-0838-3e5e-cc60-618e9f7ac7ec",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987132951,
        },
        "e-105": {
            id: "e-105",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-104",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|91bcb33a-0838-3e5e-cc60-618e9f7ac7ec",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|91bcb33a-0838-3e5e-cc60-618e9f7ac7ec",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987132952,
        },
        "e-106": {
            id: "e-106",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-107",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|f2f1ee5e-d0df-c452-e7da-00b9098f537f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|f2f1ee5e-d0df-c452-e7da-00b9098f537f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987144505,
        },
        "e-107": {
            id: "e-107",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-106",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|f2f1ee5e-d0df-c452-e7da-00b9098f537f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|f2f1ee5e-d0df-c452-e7da-00b9098f537f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987144505,
        },
        "e-108": {
            id: "e-108",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-109",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|16c1f08a-a5b4-439a-581c-d5635fe194fb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|16c1f08a-a5b4-439a-581c-d5635fe194fb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987157829,
        },
        "e-109": {
            id: "e-109",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-108",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|16c1f08a-a5b4-439a-581c-d5635fe194fb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|16c1f08a-a5b4-439a-581c-d5635fe194fb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1716987157829,
        },
        "e-112": {
            id: "e-112",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-113",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041232588,
        },
        "e-113": {
            id: "e-113",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-112",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041232588,
        },
        "e-114": {
            id: "e-114",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-115",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041232588,
        },
        "e-115": {
            id: "e-115",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-114",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f832f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041232588,
        },
        "e-122": {
            id: "e-122",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-123",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|6a2e6f7d-1f23-d929-07fc-9d08acc26189",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|6a2e6f7d-1f23-d929-07fc-9d08acc26189",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041310553,
        },
        "e-123": {
            id: "e-123",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-122",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|6a2e6f7d-1f23-d929-07fc-9d08acc26189",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|6a2e6f7d-1f23-d929-07fc-9d08acc26189",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041310553,
        },
        "e-124": {
            id: "e-124",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-125",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|5d4d90fa-3e73-fbac-4e9c-a6e670479860",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|5d4d90fa-3e73-fbac-4e9c-a6e670479860",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041310858,
        },
        "e-125": {
            id: "e-125",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-124",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|5d4d90fa-3e73-fbac-4e9c-a6e670479860",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|5d4d90fa-3e73-fbac-4e9c-a6e670479860",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041310858,
        },
        "e-126": {
            id: "e-126",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-13",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-127",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb35",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb35",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-127": {
            id: "e-127",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-14",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-126",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb35",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb35",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-128": {
            id: "e-128",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-129",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb40",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb40",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-129": {
            id: "e-129",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-128",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb40",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb40",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-130": {
            id: "e-130",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-131",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb4b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb4b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-131": {
            id: "e-131",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-130",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb4b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb4b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-132": {
            id: "e-132",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-133",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb56",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb56",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-133": {
            id: "e-133",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-132",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb56",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|7d19fac7-40c2-c2da-fe29-bf7e8a72fb56",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717041463093,
        },
        "e-150": {
            id: "e-150",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-151",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77366a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77366a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-151": {
            id: "e-151",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-150",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77366a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77366a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-152": {
            id: "e-152",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-153",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773675",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773675",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-153": {
            id: "e-153",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-152",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773675",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773675",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-154": {
            id: "e-154",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-155",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773680",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773680",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-155": {
            id: "e-155",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-154",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773680",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be773680",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-156": {
            id: "e-156",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-15",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-157",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77368b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77368b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-157": {
            id: "e-157",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_SECOND_CLICK",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-16",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-156",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77368b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3bcd0a85527340de30c|c7585c49-94ba-de56-b803-bd18be77368b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717042246377,
        },
        "e-158": {
            id: "e-158",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-159",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e37b5bc17bd5e768b66|3f431b0b-9f4c-d218-c32c-881d5e9f3410",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e37b5bc17bd5e768b66|3f431b0b-9f4c-d218-c32c-881d5e9f3410",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717043137207,
        },
        "e-159": {
            id: "e-159",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-158",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e37b5bc17bd5e768b66|3f431b0b-9f4c-d218-c32c-881d5e9f3410",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e37b5bc17bd5e768b66|3f431b0b-9f4c-d218-c32c-881d5e9f3410",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717043137209,
        },
        "e-160": {
            id: "e-160",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-161",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66594c1fe7a0c432989af38d|f6653b27-36c3-5bf0-f7d4-71ff31ea67b6",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66594c1fe7a0c432989af38d|f6653b27-36c3-5bf0-f7d4-71ff31ea67b6",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1703160000870,
        },
        "e-162": {
            id: "e-162",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-163",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d16|e5288d42-dbd8-8bd3-58ff-9dfe764dd3cb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d16|e5288d42-dbd8-8bd3-58ff-9dfe764dd3cb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717128881940,
        },
        "e-163": {
            id: "e-163",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-162",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d16|e5288d42-dbd8-8bd3-58ff-9dfe764dd3cb",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d16|e5288d42-dbd8-8bd3-58ff-9dfe764dd3cb",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717128881940,
        },
        "e-168": {
            id: "e-168",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-169",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d16|e40f75a2-71ac-09b8-d019-2897014b3098",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d16|e40f75a2-71ac-09b8-d019-2897014b3098",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717128891955,
        },
        "e-169": {
            id: "e-169",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-168",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d16|e40f75a2-71ac-09b8-d019-2897014b3098",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d16|e40f75a2-71ac-09b8-d019-2897014b3098",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717128891955,
        },
        "e-170": {
            id: "e-170",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-171",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d16|19042903-5283-414c-9640-877a0f723aa7",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d16|19042903-5283-414c-9640-877a0f723aa7",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717129070012,
        },
        "e-171": {
            id: "e-171",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-170",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d16|19042903-5283-414c-9640-877a0f723aa7",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d16|19042903-5283-414c-9640-877a0f723aa7",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717129070012,
        },
        "e-172": {
            id: "e-172",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-173",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e982b224e7806a6a957|51413b9a-8dc0-4afc-1828-594ed576460e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e982b224e7806a6a957|51413b9a-8dc0-4afc-1828-594ed576460e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717129828425,
        },
        "e-174": {
            id: "e-174",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-175",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "f186cf30-17a5-6ed6-37c8-6b48ecf59ae8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "f186cf30-17a5-6ed6-37c8-6b48ecf59ae8",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717129850249,
        },
        "e-176": {
            id: "e-176",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-177",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "f186cf30-17a5-6ed6-37c8-6b48ecf59af9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "f186cf30-17a5-6ed6-37c8-6b48ecf59af9",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717129860128,
        },
        "e-178": {
            id: "e-178",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-179",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "92ecc970-06f4-81b8-2a5b-ec95d17e1033",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "92ecc970-06f4-81b8-2a5b-ec95d17e1033",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717129868986,
        },
        "e-180": {
            id: "e-180",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-181",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "f186cf30-17a5-6ed6-37c8-6b48ecf59b1f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "f186cf30-17a5-6ed6-37c8-6b48ecf59b1f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717129879152,
        },
        "e-182": {
            id: "e-182",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-183",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717140805563,
        },
        "e-183": {
            id: "e-183",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-182",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717140805563,
        },
        "e-184": {
            id: "e-184",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-185",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66555e889423a659f5e44d84|cfd2cf86-2b69-0592-9281-7a489f9ae3ee",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66555e889423a659f5e44d84|cfd2cf86-2b69-0592-9281-7a489f9ae3ee",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717146709550,
        },
        "e-185": {
            id: "e-185",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-184",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66555e889423a659f5e44d84|cfd2cf86-2b69-0592-9281-7a489f9ae3ee",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66555e889423a659f5e44d84|cfd2cf86-2b69-0592-9281-7a489f9ae3ee",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717146709551,
        },
        "e-186": {
            id: "e-186",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-187",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|3226bfbd-d66a-9bcd-f5c4-0b4a00ef6420",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|3226bfbd-d66a-9bcd-f5c4-0b4a00ef6420",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717146752390,
        },
        "e-187": {
            id: "e-187",
            name: "",
            animationType: "custom",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-186",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|3226bfbd-d66a-9bcd-f5c4-0b4a00ef6420",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|3226bfbd-d66a-9bcd-f5c4-0b4a00ef6420",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717146752391,
        },
        "e-188": {
            id: "e-188",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-189",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|933e6eed-ca6d-c056-46b5-de7102875298",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|933e6eed-ca6d-c056-46b5-de7102875298",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 5,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717392041588,
        },
        "e-190": {
            id: "e-190",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInLeft",
                    autoStopEventId: "e-191",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|3c6fb48a-668f-e91e-0415-370ba4dd1f2e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|3c6fb48a-668f-e91e-0415-370ba4dd1f2e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "LEFT",
                effectIn: true,
            },
            createdOn: 1717392079275,
        },
        "e-192": {
            id: "e-192",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GROW_BIG_EFFECT",
                instant: false,
                config: { actionListId: "growBigIn", autoStopEventId: "e-193" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|3dc3044c-0e82-4da0-9ad9-e48a3019337d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|3dc3044c-0e82-4da0-9ad9-e48a3019337d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 50,
                direction: null,
                effectIn: true,
            },
            createdOn: 1717394028191,
        },
        "e-194": {
            id: "e-194",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GROW_BIG_EFFECT",
                instant: false,
                config: { actionListId: "growBigIn", autoStopEventId: "e-195" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|9c4fb70a-7f2f-afad-9521-4568a5188c54",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|9c4fb70a-7f2f-afad-9521-4568a5188c54",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: null,
                effectIn: true,
            },
            createdOn: 1717394058734,
        },
        "e-196": {
            id: "e-196",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GROW_BIG_EFFECT",
                instant: false,
                config: { actionListId: "growBigIn", autoStopEventId: "e-197" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|e4c1ed35-db6d-a5f6-7075-c6955e1df16c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|e4c1ed35-db6d-a5f6-7075-c6955e1df16c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: null,
                effectIn: true,
            },
            createdOn: 1717394074376,
        },
        "e-198": {
            id: "e-198",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GROW_BIG_EFFECT",
                instant: false,
                config: { actionListId: "growBigIn", autoStopEventId: "e-199" },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|8c289f18-13fe-2247-6af4-3e8b03d4506b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|8c289f18-13fe-2247-6af4-3e8b03d4506b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 350,
                direction: null,
                effectIn: true,
            },
            createdOn: 1717394089777,
        },
        "e-200": {
            id: "e-200",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-201",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "4c666f9a-5c45-b8fd-2584-ea2b0c46f47c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "4c666f9a-5c45-b8fd-2584-ea2b0c46f47c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 200,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717394181344,
        },
        "e-202": {
            id: "e-202",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-22",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|933e6eed-ca6d-c056-46b5-de7102875298",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|933e6eed-ca6d-c056-46b5-de7102875298",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-22-p",
                    smoothing: 90,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1717394209376,
        },
        "e-203": {
            id: "e-203",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-204",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|3487e3c5-f8e4-0f8a-f4b1-970b4fdeba01",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|3487e3c5-f8e4-0f8a-f4b1-970b4fdeba01",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717395356778,
        },
        "e-205": {
            id: "e-205",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-206",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|8b1cd817-0f18-a8fe-7f9f-5e2e7a4967b1",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|8b1cd817-0f18-a8fe-7f9f-5e2e7a4967b1",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717395375328,
        },
        "e-207": {
            id: "e-207",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-208",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|187125b2-77d6-1b4b-c282-7d53f348519f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|187125b2-77d6-1b4b-c282-7d53f348519f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717395407121,
        },
        "e-209": {
            id: "e-209",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-210",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|3ff877d7-ae49-fc0f-82a6-6e21aa31d4bc",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|3ff877d7-ae49-fc0f-82a6-6e21aa31d4bc",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717395433471,
        },
        "e-211": {
            id: "e-211",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-212",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "664f0b83318c54d5618a0d0f|40ee53b1-8ae9-3f9c-f201-88770ac38570",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "664f0b83318c54d5618a0d0f|40ee53b1-8ae9-3f9c-f201-88770ac38570",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717395448121,
        },
        "e-213": {
            id: "e-213",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInLeft",
                    autoStopEventId: "e-214",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|ccc0f1f8-4055-8731-c615-f50313b3740a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|ccc0f1f8-4055-8731-c615-f50313b3740a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "LEFT",
                effectIn: true,
            },
            createdOn: 1717395862529,
        },
        "e-215": {
            id: "e-215",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-216",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|1b6d0962-ea83-5a79-aeb0-fd3863c2eb6d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|1b6d0962-ea83-5a79-aeb0-fd3863c2eb6d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717395879063,
        },
        "e-217": {
            id: "e-217",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-218",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|80a99dd6-a8f0-044a-763d-661e3db48a68",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|80a99dd6-a8f0-044a-763d-661e3db48a68",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717395890289,
        },
        "e-219": {
            id: "e-219",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-23",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66556e964629bdf6899b70c1|2b958cec-6615-0f0a-7140-2f9a45429c3b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|2b958cec-6615-0f0a-7140-2f9a45429c3b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-23-p",
                    smoothing: 90,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1717395907858,
        },
        "e-220": {
            id: "e-220",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-221",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|fa2c6c9e-58ba-64d0-9db7-406c18ce034a",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|fa2c6c9e-58ba-64d0-9db7-406c18ce034a",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717396167146,
        },
        "e-222": {
            id: "e-222",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-223",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|77767e62-a178-0476-1250-5164e6696e7b",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|77767e62-a178-0476-1250-5164e6696e7b",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717396185399,
        },
        "e-224": {
            id: "e-224",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-225",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66556e964629bdf6899b70c1|f185e62b-bb76-78d7-8faa-68b13069a19f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66556e964629bdf6899b70c1|f185e62b-bb76-78d7-8faa-68b13069a19f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717396221943,
        },
        "e-226": {
            id: "e-226",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-227",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66545ebe427bda73419caa21|57f9316a-a33f-3595-427e-7b2b8ead97d9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66545ebe427bda73419caa21|57f9316a-a33f-3595-427e-7b2b8ead97d9",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717396251472,
        },
        "e-228": {
            id: "e-228",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-229",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778b0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778b0",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717397694671,
        },
        "e-230": {
            id: "e-230",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-231",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778af",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656b567f024decdb442aa17|c69ee168-f8db-13eb-fa56-11b0a2c778af",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717397714694,
        },
        "e-232": {
            id: "e-232",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-233",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656b567f024decdb442aa17|9d2a13dd-0e43-86be-9734-87182847e574",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656b567f024decdb442aa17|9d2a13dd-0e43-86be-9734-87182847e574",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717397893757,
        },
        "e-234": {
            id: "e-234",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-235",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|0553a495-3f0e-8beb-4100-b54b8c60469d",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|0553a495-3f0e-8beb-4100-b54b8c60469d",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398139149,
        },
        "e-236": {
            id: "e-236",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-237",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|d8afef64-ef57-ad6c-993c-84e7989f6816",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|d8afef64-ef57-ad6c-993c-84e7989f6816",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398152029,
        },
        "e-238": {
            id: "e-238",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-239",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|39935166-6847-955b-6c7d-7a6b8194f0b5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|39935166-6847-955b-6c7d-7a6b8194f0b5",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398174253,
        },
        "e-240": {
            id: "e-240",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-241",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e1d6f7a695f1ad76196|33890ff2-1be1-a0f8-8b9a-a1b64ae7604f",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|33890ff2-1be1-a0f8-8b9a-a1b64ae7604f",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398193436,
        },
        "e-242": {
            id: "e-242",
            name: "",
            animationType: "custom",
            eventTypeId: "SCROLLING_IN_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_CONTINUOUS_ACTION",
                config: {
                    actionListId: "a-23",
                    affectedElements: {},
                    duration: 0,
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66558e1d6f7a695f1ad76196|dbdda7c4-4536-4d1d-0d0e-a793607e07fa",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|dbdda7c4-4536-4d1d-0d0e-a793607e07fa",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: [
                {
                    continuousParameterGroupId: "a-23-p",
                    smoothing: 90,
                    startsEntering: true,
                    addStartOffset: false,
                    addOffsetValue: 50,
                    startsExiting: false,
                    addEndOffset: false,
                    endOffsetValue: 50,
                },
            ],
            createdOn: 1717398238596,
        },
        "e-243": {
            id: "e-243",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-244",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e37b5bc17bd5e768b66|6b646fab-18f7-3aea-5067-6545bc37559e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e37b5bc17bd5e768b66|6b646fab-18f7-3aea-5067-6545bc37559e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398688967,
        },
        "e-245": {
            id: "e-245",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-246",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f8323",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|f28f5b9c-2ba9-f541-3ad8-31ad920f8323",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398713646,
        },
        "e-247": {
            id: "e-247",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-248",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66503ca34b1be96b77c775e2|c54a91c1-d462-c33d-f47c-19b9ce849ff9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66503ca34b1be96b77c775e2|c54a91c1-d462-c33d-f47c-19b9ce849ff9",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398935924,
        },
        "e-249": {
            id: "e-249",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-250",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66503ca34b1be96b77c775e2|c047d7d7-6b89-3c5e-4a91-4b6db88e77a5",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66503ca34b1be96b77c775e2|c047d7d7-6b89-3c5e-4a91-4b6db88e77a5",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398951555,
        },
        "e-251": {
            id: "e-251",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-252",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66543abed015108e78231f15|413c3bcd-89e8-6330-39d0-ef09d1432076",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66543abed015108e78231f15|413c3bcd-89e8-6330-39d0-ef09d1432076",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717398965948,
        },
        "e-253": {
            id: "e-253",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInLeft",
                    autoStopEventId: "e-254",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66543abed015108e78231f15|0d33f2e6-0b37-d2d0-6bc1-0d6a287531a8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66543abed015108e78231f15|0d33f2e6-0b37-d2d0-6bc1-0d6a287531a8",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "LEFT",
                effectIn: true,
            },
            createdOn: 1717398988907,
        },
        "e-255": {
            id: "e-255",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-256",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66557883f8ec22b0abdfb53c|41dfad1e-7835-361e-3a77-21a1fe8470a0",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66557883f8ec22b0abdfb53c|41dfad1e-7835-361e-3a77-21a1fe8470a0",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717399613357,
        },
        "e-257": {
            id: "e-257",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-258",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66557883f8ec22b0abdfb53c|723112b8-8b17-5bb2-c19e-25c1abf53e22",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66557883f8ec22b0abdfb53c|723112b8-8b17-5bb2-c19e-25c1abf53e22",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 150,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717399625091,
        },
        "e-259": {
            id: "e-259",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-260",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e2ca3e73476bcaab134|c63b4d86-93c9-35ad-5b36-8ff011b93c47",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e2ca3e73476bcaab134|c63b4d86-93c9-35ad-5b36-8ff011b93c47",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717402283706,
        },
        "e-261": {
            id: "e-261",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInRight",
                    autoStopEventId: "e-262",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e2ca3e73476bcaab134|ea332ac8-6ff5-21ea-5cc1-a3e5f126f219",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e2ca3e73476bcaab134|ea332ac8-6ff5-21ea-5cc1-a3e5f126f219",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "RIGHT",
                effectIn: true,
            },
            createdOn: 1717402297880,
        },
        "e-263": {
            id: "e-263",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInLeft",
                    autoStopEventId: "e-264",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e2ca3e73476bcaab134|9fab8516-571b-4404-3d09-415e3b5dc896",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e2ca3e73476bcaab134|9fab8516-571b-4404-3d09-415e3b5dc896",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 5,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "LEFT",
                effectIn: true,
            },
            createdOn: 1717402310025,
        },
        "e-265": {
            id: "e-265",
            name: "",
            animationType: "custom",
            eventTypeId: "DROPDOWN_OPEN",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-266",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717413146692,
        },
        "e-266": {
            id: "e-266",
            name: "",
            animationType: "custom",
            eventTypeId: "DROPDOWN_CLOSE",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-2",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-265",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "4bebd1a1-52a7-0f47-6e35-71a311c4cf0e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717413146694,
        },
        "e-267": {
            id: "e-267",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-19",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-268",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66558e1d6f7a695f1ad76196|ffc77c7d-e9b8-88a4-b74c-e635e9ceaef9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|ffc77c7d-e9b8-88a4-b74c-e635e9ceaef9",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717484110170,
        },
        "e-268": {
            id: "e-268",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-20",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-267",
                },
            },
            mediaQueries: ["main"],
            target: {
                id: "66558e1d6f7a695f1ad76196|ffc77c7d-e9b8-88a4-b74c-e635e9ceaef9",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e1d6f7a695f1ad76196|ffc77c7d-e9b8-88a4-b74c-e635e9ceaef9",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717484110170,
        },
        "e-269": {
            id: "e-269",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-270",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6657fe67220cd6c2aa56a27e|59f6e645-04bd-d376-29ac-85c094b2aa76",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6657fe67220cd6c2aa56a27e|59f6e645-04bd-d376-29ac-85c094b2aa76",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 300,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1699598347062,
        },
        "e-271": {
            id: "e-271",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-272",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6657fe67220cd6c2aa56a27e|0e186c38-533d-af12-200d-4850939b4e7c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6657fe67220cd6c2aa56a27e|0e186c38-533d-af12-200d-4850939b4e7c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717486757944,
        },
        "e-273": {
            id: "e-273",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-274",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6657fe67220cd6c2aa56a27e|0e186c38-533d-af12-200d-4850939b4e81",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6657fe67220cd6c2aa56a27e|0e186c38-533d-af12-200d-4850939b4e81",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717486757944,
        },
        "e-274": {
            id: "e-274",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-273",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6657fe67220cd6c2aa56a27e|0e186c38-533d-af12-200d-4850939b4e81",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6657fe67220cd6c2aa56a27e|0e186c38-533d-af12-200d-4850939b4e81",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717486757944,
        },
        "e-279": {
            id: "e-279",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-11",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-280",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f39b39e723848ddb2391|130c882e-e0e1-30ce-5244-ed3ea40c7e2e",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f39b39e723848ddb2391|130c882e-e0e1-30ce-5244-ed3ea40c7e2e",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: true,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1717655627492,
        },
        "e-281": {
            id: "e-281",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-282",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f39b39e723848ddb2391|130c882e-e0e1-30ce-5244-ed3ea40c7e30",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f39b39e723848ddb2391|130c882e-e0e1-30ce-5244-ed3ea40c7e30",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717655627492,
        },
        "e-283": {
            id: "e-283",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInLeft",
                    autoStopEventId: "e-284",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f39b39e723848ddb2391|f071da78-df9b-688e-f03a-7f68a45b6694",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f39b39e723848ddb2391|f071da78-df9b-688e-f03a-7f68a45b6694",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 0,
                scrollOffsetUnit: "%",
                delay: 100,
                direction: "LEFT",
                effectIn: true,
            },
            createdOn: 1717659194592,
        },
        "e-285": {
            id: "e-285",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-286",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f39b39e723848ddb2391|abefd716-65e3-2e97-8165-ec8acc9e81e8",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f39b39e723848ddb2391|abefd716-65e3-2e97-8165-ec8acc9e81e8",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717659212649,
        },
        "e-287": {
            id: "e-287",
            name: "",
            animationType: "preset",
            eventTypeId: "SCROLL_INTO_VIEW",
            action: {
                id: "",
                actionTypeId: "SLIDE_EFFECT",
                instant: false,
                config: {
                    actionListId: "slideInBottom",
                    autoStopEventId: "e-288",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f39b39e723848ddb2391|71d14a62-4d99-98be-cde3-2dcfba1a23ac",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f39b39e723848ddb2391|71d14a62-4d99-98be-cde3-2dcfba1a23ac",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: 10,
                scrollOffsetUnit: "%",
                delay: 250,
                direction: "BOTTOM",
                effectIn: true,
            },
            createdOn: 1717659225041,
        },
        "e-289": {
            id: "e-289",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-290",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e982b224e7806a6a957|f8b7961d-ac5a-a652-c594-909103051b81",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e982b224e7806a6a957|f8b7961d-ac5a-a652-c594-909103051b81",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718687506469,
        },
        "e-290": {
            id: "e-290",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-289",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "66558e982b224e7806a6a957|f8b7961d-ac5a-a652-c594-909103051b81",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "66558e982b224e7806a6a957|f8b7961d-ac5a-a652-c594-909103051b81",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718687506469,
        },
        "e-291": {
            id: "e-291",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-3",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-292",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f39b39e723848ddb2391|6c5e450f-adda-431a-f751-70d92dd7891c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f39b39e723848ddb2391|6c5e450f-adda-431a-f751-70d92dd7891c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718688063445,
        },
        "e-292": {
            id: "e-292",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-4",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-291",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f39b39e723848ddb2391|6c5e450f-adda-431a-f751-70d92dd7891c",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f39b39e723848ddb2391|6c5e450f-adda-431a-f751-70d92dd7891c",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718688063445,
        },
        "e-299": {
            id: "e-299",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-300",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695455",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695455",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718692103432,
        },
        "e-300": {
            id: "e-300",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-299",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695455",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695455",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718692103432,
        },
        "e-301": {
            id: "e-301",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-302",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695457",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695457",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718692103432,
        },
        "e-302": {
            id: "e-302",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-301",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695457",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695457",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718692103432,
        },
        "e-303": {
            id: "e-303",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OVER",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-17",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-304",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695459",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695459",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718692103432,
        },
        "e-304": {
            id: "e-304",
            name: "",
            animationType: "preset",
            eventTypeId: "MOUSE_OUT",
            action: {
                id: "",
                actionTypeId: "GENERAL_START_ACTION",
                config: {
                    delay: 0,
                    easing: "",
                    duration: 0,
                    actionListId: "a-18",
                    affectedElements: {},
                    playInReverse: false,
                    autoStopEventId: "e-303",
                },
            },
            mediaQueries: ["main", "medium", "small", "tiny"],
            target: {
                id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695459",
                appliesTo: "ELEMENT",
                styleBlockIds: [],
            },
            targets: [
                {
                    id: "6656f3b59b9d83e707f5e289|b5a7bb5c-e87e-5c3c-87ad-a4a547695459",
                    appliesTo: "ELEMENT",
                    styleBlockIds: [],
                },
            ],
            config: {
                loop: false,
                playInReverse: false,
                scrollOffsetValue: null,
                scrollOffsetUnit: null,
                delay: null,
                direction: null,
                effectIn: null,
            },
            createdOn: 1718692103432,
        },
    },
    actionLists: {
        a: {
            id: "a",
            title: "Dropdown [Open]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-n",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".dropdown-list",
                                    selectorGuids: [
                                        "de8cf590-674f-1c5b-f730-f5a2af9cd920",
                                    ],
                                },
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "px",
                                zUnit: "PX",
                            },
                        },
                        {
                            id: "a-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".dropdown-list",
                                    selectorGuids: [
                                        "de8cf590-674f-1c5b-f730-f5a2af9cd920",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-n-3",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".dropdown-list",
                                    selectorGuids: [
                                        "de8cf590-674f-1c5b-f730-f5a2af9cd920",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                        {
                            id: "a-n-4",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".dropdown-list",
                                    selectorGuids: [
                                        "de8cf590-674f-1c5b-f730-f5a2af9cd920",
                                    ],
                                },
                                yValue: -20,
                                xUnit: "PX",
                                yUnit: "px",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1694609411684,
        },
        "a-2": {
            id: "a-2",
            title: "Dropdown [Close]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-2-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".dropdown-list",
                                    selectorGuids: [
                                        "de8cf590-674f-1c5b-f730-f5a2af9cd920",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-2-n-2",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".dropdown-list",
                                    selectorGuids: [
                                        "de8cf590-674f-1c5b-f730-f5a2af9cd920",
                                    ],
                                },
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "px",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1694609411684,
        },
        "a-3": {
            id: "a-3",
            title: "Button Hover [In]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-3-n-2",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".button-icon",
                                    selectorGuids: [
                                        "857acedc-b2d3-51ab-6cbd-83f1004ceda8",
                                    ],
                                },
                                yValue: 0,
                                xUnit: "DEG",
                                yUnit: "deg",
                                zUnit: "DEG",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-3-n",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 500,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".button-icon",
                                    selectorGuids: [
                                        "857acedc-b2d3-51ab-6cbd-83f1004ceda8",
                                    ],
                                },
                                yValue: 180,
                                xUnit: "DEG",
                                yUnit: "deg",
                                zUnit: "DEG",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1716462680790,
        },
        "a-4": {
            id: "a-4",
            title: "Button Hover [Out]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-4-n",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 500,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".button-icon",
                                    selectorGuids: [
                                        "857acedc-b2d3-51ab-6cbd-83f1004ceda8",
                                    ],
                                },
                                yValue: 0,
                                xUnit: "DEG",
                                yUnit: "deg",
                                zUnit: "DEG",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1716462680790,
        },
        "a-9": {
            id: "a-9",
            title: "Our Mission Accordion First [Open]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-9-n-7",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                        "2fa03e95-610c-1832-fbd1-d87dccc634cd",
                                    ],
                                },
                                zValue: 180,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-9-n",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector:
                                        ".our-mission-accordion-content-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ae3",
                                    ],
                                },
                                heightValue: 0,
                                widthUnit: "PX",
                                heightUnit: "px",
                                locked: false,
                            },
                        },
                        {
                            id: "a-9-n-2",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                        "2fa03e95-610c-1832-fbd1-d87dccc634cd",
                                    ],
                                },
                                zValue: 0,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                        {
                            id: "a-9-n-3",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".our-mission-accordion-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ade",
                                    ],
                                },
                                globalSwatchId: "--color--primary-1",
                                rValue: 57,
                                bValue: 71,
                                gValue: 29,
                                aValue: 1,
                            },
                        },
                        {
                            id: "a-9-n-4",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                        "27ba7eb0-7e4c-9d17-1275-8c33ed8eb5b4",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-9-n-5",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                        "2fa03e95-610c-1832-fbd1-d87dccc634cd",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                        {
                            id: "a-9-n-6",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                        "27ba7eb0-7e4c-9d17-1275-8c33ed8eb5b4",
                                    ],
                                },
                                zValue: -180,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1686634401626,
        },
        "a-10": {
            id: "a-10",
            title: "Our Mission Accordion First [Close]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-10-n",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector:
                                        ".our-mission-accordion-content-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ae3",
                                    ],
                                },
                                widthUnit: "PX",
                                heightUnit: "AUTO",
                                locked: false,
                            },
                        },
                        {
                            id: "a-10-n-2",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                        "2fa03e95-610c-1832-fbd1-d87dccc634cd",
                                    ],
                                },
                                zValue: 180,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                        {
                            id: "a-10-n-3",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".our-mission-accordion-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ade",
                                    ],
                                },
                                globalSwatchId: "",
                                rValue: 255,
                                bValue: 255,
                                gValue: 255,
                                aValue: 0.05,
                            },
                        },
                        {
                            id: "a-10-n-4",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                        "27ba7eb0-7e4c-9d17-1275-8c33ed8eb5b4",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                        {
                            id: "a-10-n-5",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                        "2fa03e95-610c-1832-fbd1-d87dccc634cd",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-10-n-6",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon.open",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                        "27ba7eb0-7e4c-9d17-1275-8c33ed8eb5b4",
                                    ],
                                },
                                zValue: 0,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1686634401626,
        },
        "a-7": {
            id: "a-7",
            title: "Our Mission Accordion [Open]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-7-n",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector:
                                        ".our-mission-accordion-content-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ae3",
                                    ],
                                },
                                heightValue: 0,
                                widthUnit: "PX",
                                heightUnit: "px",
                                locked: false,
                            },
                        },
                        {
                            id: "a-7-n-2",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".our-mission-accordion-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ade",
                                    ],
                                },
                                globalSwatchId: "--color--primary-1",
                                rValue: 57,
                                bValue: 71,
                                gValue: 29,
                                aValue: 1,
                            },
                        },
                        {
                            id: "a-7-n-3",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-7-n-5",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".our-mission-accordion-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                        {
                            id: "a-7-n-6",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                    ],
                                },
                                zValue: -180,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-7-n-7",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector:
                                        ".our-mission-accordion-content-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ae3",
                                    ],
                                },
                                widthUnit: "PX",
                                heightUnit: "AUTO",
                                locked: false,
                            },
                        },
                        {
                            id: "a-7-n-8",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".our-mission-accordion-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                    ],
                                },
                                zValue: 180,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                        {
                            id: "a-7-n-9",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".our-mission-accordion-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ade",
                                    ],
                                },
                                globalSwatchId: "",
                                rValue: 255,
                                bValue: 255,
                                gValue: 255,
                                aValue: 0.05,
                            },
                        },
                        {
                            id: "a-7-n-11",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".our-mission-accordion-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-7-n-12",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                        {
                            id: "a-7-n-13",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                    ],
                                },
                                zValue: 0,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1686634350298,
        },
        "a-8": {
            id: "a-8",
            title: "Our Mission Accordion [Close]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-8-n",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector:
                                        ".our-mission-accordion-content-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ae3",
                                    ],
                                },
                                heightValue: 0,
                                widthUnit: "PX",
                                heightUnit: "px",
                                locked: false,
                            },
                        },
                        {
                            id: "a-8-n-2",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".our-mission-accordion-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                    ],
                                },
                                zValue: 0,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                        {
                            id: "a-8-n-4",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".our-mission-accordion-wrap",
                                    selectorGuids: [
                                        "09d8fe67-2a43-1e17-1c3a-c76893553ade",
                                    ],
                                },
                                globalSwatchId: "--color--primary-1",
                                rValue: 57,
                                bValue: 71,
                                gValue: 29,
                                aValue: 1,
                            },
                        },
                        {
                            id: "a-8-n-5",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-8-n-6",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".our-mission-accordion-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a62",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                        {
                            id: "a-8-n-7",
                            actionTypeId: "TRANSFORM_ROTATE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".our-mission-accordion-close-icon",
                                    selectorGuids: [
                                        "84cc5a9e-c29c-5cbe-3a5a-d7b38f6e8a63",
                                    ],
                                },
                                zValue: -180,
                                xUnit: "DEG",
                                yUnit: "DEG",
                                zUnit: "deg",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1686634401626,
        },
        "a-11": {
            id: "a-11",
            title: "Client Marquee Move",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-11-n",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 20000,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".client-marquee",
                                    selectorGuids: [
                                        "05922ddc-231a-c21b-6617-7037fd334d17",
                                    ],
                                },
                                xValue: -75,
                                xUnit: "%",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-11-n-2",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 20000,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".client-marquee",
                                    selectorGuids: [
                                        "05922ddc-231a-c21b-6617-7037fd334d17",
                                    ],
                                },
                                xValue: 0,
                                xUnit: "%",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1716638841838,
        },
        "a-13": {
            id: "a-13",
            title: "Accordion First [Open]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-13-n-2",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector: ".accordion-content-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64c",
                                    ],
                                },
                                heightValue: 0,
                                widthUnit: "PX",
                                heightUnit: "px",
                                locked: false,
                            },
                        },
                        {
                            id: "a-13-n-4",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".accordion-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd649",
                                    ],
                                },
                                globalSwatchId: "--color--primary-1",
                                rValue: 57,
                                bValue: 71,
                                gValue: 29,
                                aValue: 1,
                            },
                        },
                        {
                            id: "a-13-n-5",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-close-icon.open",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64d",
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd654",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-13-n-6",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-icon.open",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd651",
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd652",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1686634401626,
        },
        "a-14": {
            id: "a-14",
            title: "Accordion First [Close]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-14-n",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector: ".accordion-content-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64c",
                                    ],
                                },
                                widthUnit: "PX",
                                heightUnit: "AUTO",
                                locked: false,
                            },
                        },
                        {
                            id: "a-14-n-3",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".accordion-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd649",
                                    ],
                                },
                                globalSwatchId: "",
                                rValue: 255,
                                bValue: 255,
                                gValue: 255,
                                aValue: 0.05,
                            },
                        },
                        {
                            id: "a-14-n-4",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-close-icon.open",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64d",
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd654",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                        {
                            id: "a-14-n-5",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-icon.open",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd651",
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd652",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1686634401626,
        },
        "a-15": {
            id: "a-15",
            title: "Accordion [Open]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-15-n",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector: ".accordion-content-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64c",
                                    ],
                                },
                                heightValue: 0,
                                widthUnit: "PX",
                                heightUnit: "px",
                                locked: false,
                            },
                        },
                        {
                            id: "a-15-n-2",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".accordion-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd649",
                                    ],
                                },
                                globalSwatchId: "--color--primary-1",
                                rValue: 57,
                                bValue: 71,
                                gValue: 29,
                                aValue: 1,
                            },
                        },
                        {
                            id: "a-15-n-3",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-close-icon",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64d",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-15-n-4",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-icon",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd651",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-15-n-6",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector: ".accordion-content-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64c",
                                    ],
                                },
                                widthUnit: "PX",
                                heightUnit: "AUTO",
                                locked: false,
                            },
                        },
                        {
                            id: "a-15-n-8",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".accordion-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd649",
                                    ],
                                },
                                globalSwatchId: "",
                                rValue: 255,
                                bValue: 255,
                                gValue: 255,
                                aValue: 0.05,
                            },
                        },
                        {
                            id: "a-15-n-9",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-icon",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd651",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-15-n-10",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-close-icon",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64d",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1686634350298,
        },
        "a-16": {
            id: "a-16",
            title: "Accordion [Close]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-16-n",
                            actionTypeId: "STYLE_SIZE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "SIBLINGS",
                                    selector: ".accordion-content-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64c",
                                    ],
                                },
                                heightValue: 0,
                                widthUnit: "PX",
                                heightUnit: "px",
                                locked: false,
                            },
                        },
                        {
                            id: "a-16-n-3",
                            actionTypeId: "STYLE_BACKGROUND_COLOR",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "PARENT",
                                    selector: ".accordion-wrap",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd649",
                                    ],
                                },
                                globalSwatchId: "--color--primary-1",
                                rValue: 57,
                                bValue: 71,
                                gValue: 29,
                                aValue: 1,
                            },
                        },
                        {
                            id: "a-16-n-4",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-close-icon",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd64d",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-16-n-5",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".accordion-icon",
                                    selectorGuids: [
                                        "c688e2b1-b2e2-4c7d-580d-3ad8a02cd651",
                                    ],
                                },
                                value: 1,
                                unit: "",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1686634401626,
        },
        "a-17": {
            id: "a-17",
            title: "Image Hover Scale [In]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-17-n",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".volunteer-slide-image",
                                    selectorGuids: [
                                        "b63d2077-17fd-4a41-6a1e-e31d9e0d5df7",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-4",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {},
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-6",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".gallery-lightbox-image",
                                    selectorGuids: [
                                        "f7ac497a-05e8-f3cb-4564-635a6084f87f",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-8",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".blog-image",
                                    selectorGuids: [
                                        "882b9295-6590-f960-af4f-0d7a1ca16ca3",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-10",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".event-image",
                                    selectorGuids: [
                                        "6c1ec263-468c-4f03-16f5-c2011af400dd",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-17-n-3",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".volunteer-slide-image",
                                    selectorGuids: [
                                        "b63d2077-17fd-4a41-6a1e-e31d9e0d5df7",
                                    ],
                                },
                                xValue: 1.1,
                                yValue: 1.1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-5",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {},
                                xValue: 1.1,
                                yValue: 1.1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-7",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".gallery-lightbox-image",
                                    selectorGuids: [
                                        "f7ac497a-05e8-f3cb-4564-635a6084f87f",
                                    ],
                                },
                                xValue: 1.1,
                                yValue: 1.1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-9",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".blog-image",
                                    selectorGuids: [
                                        "882b9295-6590-f960-af4f-0d7a1ca16ca3",
                                    ],
                                },
                                xValue: 1.1,
                                yValue: 1.1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-17-n-11",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".event-image",
                                    selectorGuids: [
                                        "6c1ec263-468c-4f03-16f5-c2011af400dd",
                                    ],
                                },
                                xValue: 1.1,
                                yValue: 1.1,
                                locked: true,
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1703928441784,
        },
        "a-18": {
            id: "a-18",
            title: "Image Hover Scale [Out]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-18-n",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".volunteer-slide-image",
                                    selectorGuids: [
                                        "b63d2077-17fd-4a41-6a1e-e31d9e0d5df7",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-18-n-2",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {},
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-18-n-3",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".gallery-lightbox-image",
                                    selectorGuids: [
                                        "f7ac497a-05e8-f3cb-4564-635a6084f87f",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-18-n-4",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".blog-image",
                                    selectorGuids: [
                                        "882b9295-6590-f960-af4f-0d7a1ca16ca3",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                        {
                            id: "a-18-n-5",
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".event-image",
                                    selectorGuids: [
                                        "6c1ec263-468c-4f03-16f5-c2011af400dd",
                                    ],
                                },
                                xValue: 1,
                                yValue: 1,
                                locked: true,
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1703928441784,
        },
        "a-19": {
            id: "a-19",
            title: "Volunteer Hover [In]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-19-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".volunteer-hover-overlay",
                                    selectorGuids: [
                                        "be60b605-af26-2f3a-9805-a2efdc0015bf",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-19-n-4",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".volunteer-hover-social-item-wrap",
                                    selectorGuids: [
                                        "de77ea0f-794d-3275-ccb5-8917164fb5aa",
                                    ],
                                },
                                yValue: 250,
                                xUnit: "PX",
                                yUnit: "%",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            id: "a-19-n-2",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".volunteer-hover-overlay",
                                    selectorGuids: [
                                        "be60b605-af26-2f3a-9805-a2efdc0015bf",
                                    ],
                                },
                                value: 0.2,
                                unit: "",
                            },
                        },
                        {
                            id: "a-19-n-3",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".volunteer-hover-social-item-wrap",
                                    selectorGuids: [
                                        "de77ea0f-794d-3275-ccb5-8917164fb5aa",
                                    ],
                                },
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "%",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: true,
            createdOn: 1716975688865,
        },
        "a-20": {
            id: "a-20",
            title: "Volunteer Hover [Out]",
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            id: "a-20-n",
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector: ".volunteer-hover-overlay",
                                    selectorGuids: [
                                        "be60b605-af26-2f3a-9805-a2efdc0015bf",
                                    ],
                                },
                                value: 0,
                                unit: "",
                            },
                        },
                        {
                            id: "a-20-n-2",
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "",
                                duration: 300,
                                target: {
                                    useEventTarget: "CHILDREN",
                                    selector:
                                        ".volunteer-hover-social-item-wrap",
                                    selectorGuids: [
                                        "de77ea0f-794d-3275-ccb5-8917164fb5aa",
                                    ],
                                },
                                yValue: 250,
                                xUnit: "PX",
                                yUnit: "%",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
            useFirstGroupAsInitialState: false,
            createdOn: 1716975688865,
        },
        "a-22": {
            id: "a-22",
            title: "About Image Rotate",
            continuousParameterGroups: [
                {
                    id: "a-22-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-22-n",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".about-counter-image",
                                            selectorGuids: [
                                                "170c26bf-a6ec-18cf-61bb-c0533d85cd37",
                                            ],
                                        },
                                        zValue: 360,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 100,
                            actionItems: [
                                {
                                    id: "a-22-n-2",
                                    actionTypeId: "TRANSFORM_ROTATE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".about-counter-image",
                                            selectorGuids: [
                                                "170c26bf-a6ec-18cf-61bb-c0533d85cd37",
                                            ],
                                        },
                                        zValue: 0,
                                        xUnit: "DEG",
                                        yUnit: "DEG",
                                        zUnit: "deg",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1717394212664,
        },
        "a-23": {
            id: "a-23",
            title: "About Image Move",
            continuousParameterGroups: [
                {
                    id: "a-23-p",
                    type: "SCROLL_PROGRESS",
                    parameterLabel: "Scroll",
                    continuousActionGroups: [
                        {
                            keyframe: 0,
                            actionItems: [
                                {
                                    id: "a-23-n",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-one",
                                            selectorGuids: [
                                                "16cf9fc8-c9ab-906b-b9d1-227e24c45ebb",
                                            ],
                                        },
                                        yValue: -5,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-3",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-two",
                                            selectorGuids: [
                                                "06fc38e6-6aff-a810-02ca-836551b18550",
                                            ],
                                        },
                                        yValue: 8,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-5",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-three",
                                            selectorGuids: [
                                                "e49d0eb6-ccbe-853a-e6fd-6f31ffa6db41",
                                            ],
                                        },
                                        yValue: -10,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-7",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-four",
                                            selectorGuids: [
                                                "3618ea30-c0e1-be4b-5656-bbe8108e6a85",
                                            ],
                                        },
                                        yValue: 12,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-9",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-five",
                                            selectorGuids: [
                                                "4664c07a-e3c3-d64a-faf9-8783693d31f6",
                                            ],
                                        },
                                        yValue: 3,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                            ],
                        },
                        {
                            keyframe: 100,
                            actionItems: [
                                {
                                    id: "a-23-n-2",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-one",
                                            selectorGuids: [
                                                "16cf9fc8-c9ab-906b-b9d1-227e24c45ebb",
                                            ],
                                        },
                                        yValue: 5,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-4",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-two",
                                            selectorGuids: [
                                                "06fc38e6-6aff-a810-02ca-836551b18550",
                                            ],
                                        },
                                        yValue: -8,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-6",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-three",
                                            selectorGuids: [
                                                "e49d0eb6-ccbe-853a-e6fd-6f31ffa6db41",
                                            ],
                                        },
                                        yValue: 10,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-8",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-four",
                                            selectorGuids: [
                                                "3618ea30-c0e1-be4b-5656-bbe8108e6a85",
                                            ],
                                        },
                                        yValue: -12,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                                {
                                    id: "a-23-n-10",
                                    actionTypeId: "TRANSFORM_MOVE",
                                    config: {
                                        delay: 0,
                                        easing: "",
                                        duration: 500,
                                        target: {
                                            useEventTarget: "CHILDREN",
                                            selector: ".counter-image-five",
                                            selectorGuids: [
                                                "4664c07a-e3c3-d64a-faf9-8783693d31f6",
                                            ],
                                        },
                                        yValue: -3,
                                        xUnit: "PX",
                                        yUnit: "vh",
                                        zUnit: "PX",
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            createdOn: 1717395928767,
        },
        slideInBottom: {
            id: "slideInBottom",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 100,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                    ],
                },
            ],
        },
        slideInLeft: {
            id: "slideInLeft",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: -100,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
        },
        growBigIn: {
            id: "growBigIn",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_SCALE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 1,
                                yValue: 1,
                            },
                        },
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                    ],
                },
            ],
        },
        slideInRight: {
            id: "slideInRight",
            useFirstGroupAsInitialState: true,
            actionItemGroups: [
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 0,
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                duration: 0,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 100,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
                {
                    actionItems: [
                        {
                            actionTypeId: "STYLE_OPACITY",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                value: 1,
                            },
                        },
                        {
                            actionTypeId: "TRANSFORM_MOVE",
                            config: {
                                delay: 0,
                                easing: "outQuart",
                                duration: 1000,
                                target: {
                                    id: "N/A",
                                    appliesTo: "TRIGGER_ELEMENT",
                                    useEventTarget: true,
                                },
                                xValue: 0,
                                yValue: 0,
                                xUnit: "PX",
                                yUnit: "PX",
                                zUnit: "PX",
                            },
                        },
                    ],
                },
            ],
        },
    },
    site: {
        mediaQueries: [
            { key: "main", min: 992, max: 10000 },
            { key: "medium", min: 768, max: 991 },
            { key: "small", min: 480, max: 767 },
            { key: "tiny", min: 0, max: 479 },
        ],
    },
});
