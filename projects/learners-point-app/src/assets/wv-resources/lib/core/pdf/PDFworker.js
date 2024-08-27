(function () {
  var $jscomp = $jscomp || {};
  $jscomp.scope = {};
  $jscomp.arrayIteratorImpl = function (v) {
    var z = 0;
    return function () {
      return z < v.length ? { done: !1, value: v[z++] } : { done: !0 };
    };
  };
  $jscomp.arrayIterator = function (v) {
    return { next: $jscomp.arrayIteratorImpl(v) };
  };
  $jscomp.ASSUME_ES5 = !1;
  $jscomp.ASSUME_NO_NATIVE_MAP = !1;
  $jscomp.ASSUME_NO_NATIVE_SET = !1;
  $jscomp.SIMPLE_FROUND_POLYFILL = !1;
  $jscomp.ISOLATE_POLYFILLS = !1;
  $jscomp.FORCE_POLYFILL_PROMISE = !1;
  $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
  $jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
      ? Object.defineProperty
      : function (v, z, u) {
          if (v == Array.prototype || v == Object.prototype) return v;
          v[z] = u.value;
          return v;
        };
  $jscomp.getGlobal = function (v) {
    v = [
      "object" == typeof globalThis && globalThis,
      v,
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
    ];
    for (var z = 0; z < v.length; ++z) {
      var u = v[z];
      if (u && u.Math == Math) return u;
    }
    throw Error("Cannot find global object");
  };
  $jscomp.global = $jscomp.getGlobal(this);
  $jscomp.IS_SYMBOL_NATIVE =
    "function" === typeof Symbol && "symbol" === typeof Symbol("x");
  $jscomp.TRUST_ES6_POLYFILLS =
    !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
  $jscomp.polyfills = {};
  $jscomp.propertyToPolyfillSymbol = {};
  $jscomp.POLYFILL_PREFIX = "$jscp$";
  var $jscomp$lookupPolyfilledValue = function (v, z, u) {
    if (!u || null != v) {
      u = $jscomp.propertyToPolyfillSymbol[z];
      if (null == u) return v[z];
      u = v[u];
      return void 0 !== u ? u : v[z];
    }
  };
  $jscomp.polyfill = function (v, z, u, t) {
    z &&
      ($jscomp.ISOLATE_POLYFILLS
        ? $jscomp.polyfillIsolated(v, z, u, t)
        : $jscomp.polyfillUnisolated(v, z, u, t));
  };
  $jscomp.polyfillUnisolated = function (v, z, u, t) {
    u = $jscomp.global;
    v = v.split(".");
    for (t = 0; t < v.length - 1; t++) {
      var r = v[t];
      if (!(r in u)) return;
      u = u[r];
    }
    v = v[v.length - 1];
    t = u[v];
    z = z(t);
    z != t &&
      null != z &&
      $jscomp.defineProperty(u, v, {
        configurable: !0,
        writable: !0,
        value: z,
      });
  };
  $jscomp.polyfillIsolated = function (v, z, u, t) {
    var r = v.split(".");
    v = 1 === r.length;
    t = r[0];
    t = !v && t in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var B = 0; B < r.length - 1; B++) {
      var m = r[B];
      if (!(m in t)) return;
      t = t[m];
    }
    r = r[r.length - 1];
    u = $jscomp.IS_SYMBOL_NATIVE && "es6" === u ? t[r] : null;
    z = z(u);
    null != z &&
      (v
        ? $jscomp.defineProperty($jscomp.polyfills, r, {
            configurable: !0,
            writable: !0,
            value: z,
          })
        : z !== u &&
          (void 0 === $jscomp.propertyToPolyfillSymbol[r] &&
            ((u = (1e9 * Math.random()) >>> 0),
            ($jscomp.propertyToPolyfillSymbol[r] = $jscomp.IS_SYMBOL_NATIVE
              ? $jscomp.global.Symbol(r)
              : $jscomp.POLYFILL_PREFIX + u + "$" + r)),
          $jscomp.defineProperty(t, $jscomp.propertyToPolyfillSymbol[r], {
            configurable: !0,
            writable: !0,
            value: z,
          })));
  };
  $jscomp.initSymbol = function () {};
  $jscomp.polyfill(
    "Symbol",
    function (v) {
      if (v) return v;
      var z = function (B, m) {
        this.$jscomp$symbol$id_ = B;
        $jscomp.defineProperty(this, "description", {
          configurable: !0,
          writable: !0,
          value: m,
        });
      };
      z.prototype.toString = function () {
        return this.$jscomp$symbol$id_;
      };
      var u = "jscomp_symbol_" + ((1e9 * Math.random()) >>> 0) + "_",
        t = 0,
        r = function (B) {
          if (this instanceof r)
            throw new TypeError("Symbol is not a constructor");
          return new z(u + (B || "") + "_" + t++, B);
        };
      return r;
    },
    "es6",
    "es3"
  );
  $jscomp.polyfill(
    "Symbol.iterator",
    function (v) {
      if (v) return v;
      v = Symbol("Symbol.iterator");
      for (
        var z =
            "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(
              " "
            ),
          u = 0;
        u < z.length;
        u++
      ) {
        var t = $jscomp.global[z[u]];
        "function" === typeof t &&
          "function" != typeof t.prototype[v] &&
          $jscomp.defineProperty(t.prototype, v, {
            configurable: !0,
            writable: !0,
            value: function () {
              return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
            },
          });
      }
      return v;
    },
    "es6",
    "es3"
  );
  $jscomp.iteratorPrototype = function (v) {
    v = { next: v };
    v[Symbol.iterator] = function () {
      return this;
    };
    return v;
  };
  $jscomp.checkEs6ConformanceViaProxy = function () {
    try {
      var v = {},
        z = Object.create(
          new $jscomp.global.Proxy(v, {
            get: function (u, t, r) {
              return u == v && "q" == t && r == z;
            },
          })
        );
      return !0 === z.q;
    } catch (u) {
      return !1;
    }
  };
  $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
  $jscomp.ES6_CONFORMANCE =
    $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS &&
    $jscomp.checkEs6ConformanceViaProxy();
  $jscomp.makeIterator = function (v) {
    var z =
      "undefined" != typeof Symbol && Symbol.iterator && v[Symbol.iterator];
    if (z) return z.call(v);
    if ("number" == typeof v.length) return $jscomp.arrayIterator(v);
    throw Error(String(v) + " is not an iterable or ArrayLike");
  };
  $jscomp.owns = function (v, z) {
    return Object.prototype.hasOwnProperty.call(v, z);
  };
  $jscomp.polyfill(
    "WeakMap",
    function (v) {
      function z() {
        if (!v || !Object.seal) return !1;
        try {
          var n = Object.seal({}),
            f = Object.seal({}),
            l = new v([
              [n, 2],
              [f, 3],
            ]);
          if (2 != l.get(n) || 3 != l.get(f)) return !1;
          l.delete(n);
          l.set(f, 4);
          return !l.has(n) && 4 == l.get(f);
        } catch (g) {
          return !1;
        }
      }
      function u() {}
      function t(n) {
        var f = typeof n;
        return ("object" === f && null !== n) || "function" === f;
      }
      function r(n) {
        if (!$jscomp.owns(n, m)) {
          var f = new u();
          $jscomp.defineProperty(n, m, { value: f });
        }
      }
      function B(n) {
        if (!$jscomp.ISOLATE_POLYFILLS) {
          var f = Object[n];
          f &&
            (Object[n] = function (l) {
              if (l instanceof u) return l;
              Object.isExtensible(l) && r(l);
              return f(l);
            });
        }
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (v && $jscomp.ES6_CONFORMANCE) return v;
      } else if (z()) return v;
      var m = "$jscomp_hidden_" + Math.random();
      B("freeze");
      B("preventExtensions");
      B("seal");
      var d = 0,
        k = function (n) {
          this.id_ = (d += Math.random() + 1).toString();
          if (n) {
            n = $jscomp.makeIterator(n);
            for (var f; !(f = n.next()).done; )
              (f = f.value), this.set(f[0], f[1]);
          }
        };
      k.prototype.set = function (n, f) {
        if (!t(n)) throw Error("Invalid WeakMap key");
        r(n);
        if (!$jscomp.owns(n, m)) throw Error("WeakMap key fail: " + n);
        n[m][this.id_] = f;
        return this;
      };
      k.prototype.get = function (n) {
        return t(n) && $jscomp.owns(n, m) ? n[m][this.id_] : void 0;
      };
      k.prototype.has = function (n) {
        return t(n) && $jscomp.owns(n, m) && $jscomp.owns(n[m], this.id_);
      };
      k.prototype.delete = function (n) {
        return t(n) && $jscomp.owns(n, m) && $jscomp.owns(n[m], this.id_)
          ? delete n[m][this.id_]
          : !1;
      };
      return k;
    },
    "es6",
    "es3"
  );
  $jscomp.MapEntry = function () {};
  $jscomp.polyfill(
    "Map",
    function (v) {
      function z() {
        if (
          $jscomp.ASSUME_NO_NATIVE_MAP ||
          !v ||
          "function" != typeof v ||
          !v.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1;
        try {
          var k = Object.seal({ x: 4 }),
            n = new v($jscomp.makeIterator([[k, "s"]]));
          if (
            "s" != n.get(k) ||
            1 != n.size ||
            n.get({ x: 4 }) ||
            n.set({ x: 4 }, "t") != n ||
            2 != n.size
          )
            return !1;
          var f = n.entries(),
            l = f.next();
          if (l.done || l.value[0] != k || "s" != l.value[1]) return !1;
          l = f.next();
          return l.done ||
            4 != l.value[0].x ||
            "t" != l.value[1] ||
            !f.next().done
            ? !1
            : !0;
        } catch (g) {
          return !1;
        }
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (v && $jscomp.ES6_CONFORMANCE) return v;
      } else if (z()) return v;
      var u = new WeakMap(),
        t = function (k) {
          this.data_ = {};
          this.head_ = m();
          this.size = 0;
          if (k) {
            k = $jscomp.makeIterator(k);
            for (var n; !(n = k.next()).done; )
              (n = n.value), this.set(n[0], n[1]);
          }
        };
      t.prototype.set = function (k, n) {
        k = 0 === k ? 0 : k;
        var f = r(this, k);
        f.list || (f.list = this.data_[f.id] = []);
        f.entry
          ? (f.entry.value = n)
          : ((f.entry = {
              next: this.head_,
              previous: this.head_.previous,
              head: this.head_,
              key: k,
              value: n,
            }),
            f.list.push(f.entry),
            (this.head_.previous.next = f.entry),
            (this.head_.previous = f.entry),
            this.size++);
        return this;
      };
      t.prototype.delete = function (k) {
        k = r(this, k);
        return k.entry && k.list
          ? (k.list.splice(k.index, 1),
            k.list.length || delete this.data_[k.id],
            (k.entry.previous.next = k.entry.next),
            (k.entry.next.previous = k.entry.previous),
            (k.entry.head = null),
            this.size--,
            !0)
          : !1;
      };
      t.prototype.clear = function () {
        this.data_ = {};
        this.head_ = this.head_.previous = m();
        this.size = 0;
      };
      t.prototype.has = function (k) {
        return !!r(this, k).entry;
      };
      t.prototype.get = function (k) {
        return (k = r(this, k).entry) && k.value;
      };
      t.prototype.entries = function () {
        return B(this, function (k) {
          return [k.key, k.value];
        });
      };
      t.prototype.keys = function () {
        return B(this, function (k) {
          return k.key;
        });
      };
      t.prototype.values = function () {
        return B(this, function (k) {
          return k.value;
        });
      };
      t.prototype.forEach = function (k, n) {
        for (var f = this.entries(), l; !(l = f.next()).done; )
          (l = l.value), k.call(n, l[1], l[0], this);
      };
      t.prototype[Symbol.iterator] = t.prototype.entries;
      var r = function (k, n) {
          var f = n && typeof n;
          "object" == f || "function" == f
            ? u.has(n)
              ? (f = u.get(n))
              : ((f = "" + ++d), u.set(n, f))
            : (f = "p_" + n);
          var l = k.data_[f];
          if (l && $jscomp.owns(k.data_, f))
            for (k = 0; k < l.length; k++) {
              var g = l[k];
              if ((n !== n && g.key !== g.key) || n === g.key)
                return { id: f, list: l, index: k, entry: g };
            }
          return { id: f, list: l, index: -1, entry: void 0 };
        },
        B = function (k, n) {
          var f = k.head_;
          return $jscomp.iteratorPrototype(function () {
            if (f) {
              for (; f.head != k.head_; ) f = f.previous;
              for (; f.next != f.head; )
                return (f = f.next), { done: !1, value: n(f) };
              f = null;
            }
            return { done: !0, value: void 0 };
          });
        },
        m = function () {
          var k = {};
          return (k.previous = k.next = k.head = k);
        },
        d = 0;
      return t;
    },
    "es6",
    "es3"
  );
  $jscomp.polyfill(
    "Promise",
    function (v) {
      function z() {
        this.batch_ = null;
      }
      function u(m) {
        return m instanceof r
          ? m
          : new r(function (d, k) {
              d(m);
            });
      }
      if (
        v &&
        (!(
          $jscomp.FORCE_POLYFILL_PROMISE ||
          ($jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION &&
            "undefined" === typeof $jscomp.global.PromiseRejectionEvent)
        ) ||
          !$jscomp.global.Promise ||
          -1 === $jscomp.global.Promise.toString().indexOf("[native code]"))
      )
        return v;
      z.prototype.asyncExecute = function (m) {
        if (null == this.batch_) {
          this.batch_ = [];
          var d = this;
          this.asyncExecuteFunction(function () {
            d.executeBatch_();
          });
        }
        this.batch_.push(m);
      };
      var t = $jscomp.global.setTimeout;
      z.prototype.asyncExecuteFunction = function (m) {
        t(m, 0);
      };
      z.prototype.executeBatch_ = function () {
        for (; this.batch_ && this.batch_.length; ) {
          var m = this.batch_;
          this.batch_ = [];
          for (var d = 0; d < m.length; ++d) {
            var k = m[d];
            m[d] = null;
            try {
              k();
            } catch (n) {
              this.asyncThrow_(n);
            }
          }
        }
        this.batch_ = null;
      };
      z.prototype.asyncThrow_ = function (m) {
        this.asyncExecuteFunction(function () {
          throw m;
        });
      };
      var r = function (m) {
        this.state_ = 0;
        this.result_ = void 0;
        this.onSettledCallbacks_ = [];
        this.isRejectionHandled_ = !1;
        var d = this.createResolveAndReject_();
        try {
          m(d.resolve, d.reject);
        } catch (k) {
          d.reject(k);
        }
      };
      r.prototype.createResolveAndReject_ = function () {
        function m(n) {
          return function (f) {
            k || ((k = !0), n.call(d, f));
          };
        }
        var d = this,
          k = !1;
        return { resolve: m(this.resolveTo_), reject: m(this.reject_) };
      };
      r.prototype.resolveTo_ = function (m) {
        if (m === this)
          this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (m instanceof r) this.settleSameAsPromise_(m);
        else {
          a: switch (typeof m) {
            case "object":
              var d = null != m;
              break a;
            case "function":
              d = !0;
              break a;
            default:
              d = !1;
          }
          d ? this.resolveToNonPromiseObj_(m) : this.fulfill_(m);
        }
      };
      r.prototype.resolveToNonPromiseObj_ = function (m) {
        var d = void 0;
        try {
          d = m.then;
        } catch (k) {
          this.reject_(k);
          return;
        }
        "function" == typeof d
          ? this.settleSameAsThenable_(d, m)
          : this.fulfill_(m);
      };
      r.prototype.reject_ = function (m) {
        this.settle_(2, m);
      };
      r.prototype.fulfill_ = function (m) {
        this.settle_(1, m);
      };
      r.prototype.settle_ = function (m, d) {
        if (0 != this.state_)
          throw Error(
            "Cannot settle(" +
              m +
              ", " +
              d +
              "): Promise already settled in state" +
              this.state_
          );
        this.state_ = m;
        this.result_ = d;
        2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
        this.executeOnSettledCallbacks_();
      };
      r.prototype.scheduleUnhandledRejectionCheck_ = function () {
        var m = this;
        t(function () {
          if (m.notifyUnhandledRejection_()) {
            var d = $jscomp.global.console;
            "undefined" !== typeof d && d.error(m.result_);
          }
        }, 1);
      };
      r.prototype.notifyUnhandledRejection_ = function () {
        if (this.isRejectionHandled_) return !1;
        var m = $jscomp.global.CustomEvent,
          d = $jscomp.global.Event,
          k = $jscomp.global.dispatchEvent;
        if ("undefined" === typeof k) return !0;
        "function" === typeof m
          ? (m = new m("unhandledrejection", { cancelable: !0 }))
          : "function" === typeof d
          ? (m = new d("unhandledrejection", { cancelable: !0 }))
          : ((m = $jscomp.global.document.createEvent("CustomEvent")),
            m.initCustomEvent("unhandledrejection", !1, !0, m));
        m.promise = this;
        m.reason = this.result_;
        return k(m);
      };
      r.prototype.executeOnSettledCallbacks_ = function () {
        if (null != this.onSettledCallbacks_) {
          for (var m = 0; m < this.onSettledCallbacks_.length; ++m)
            B.asyncExecute(this.onSettledCallbacks_[m]);
          this.onSettledCallbacks_ = null;
        }
      };
      var B = new z();
      r.prototype.settleSameAsPromise_ = function (m) {
        var d = this.createResolveAndReject_();
        m.callWhenSettled_(d.resolve, d.reject);
      };
      r.prototype.settleSameAsThenable_ = function (m, d) {
        var k = this.createResolveAndReject_();
        try {
          m.call(d, k.resolve, k.reject);
        } catch (n) {
          k.reject(n);
        }
      };
      r.prototype.then = function (m, d) {
        function k(g, x) {
          return "function" == typeof g
            ? function (q) {
                try {
                  n(g(q));
                } catch (p) {
                  f(p);
                }
              }
            : x;
        }
        var n,
          f,
          l = new r(function (g, x) {
            n = g;
            f = x;
          });
        this.callWhenSettled_(k(m, n), k(d, f));
        return l;
      };
      r.prototype.catch = function (m) {
        return this.then(void 0, m);
      };
      r.prototype.callWhenSettled_ = function (m, d) {
        function k() {
          switch (n.state_) {
            case 1:
              m(n.result_);
              break;
            case 2:
              d(n.result_);
              break;
            default:
              throw Error("Unexpected state: " + n.state_);
          }
        }
        var n = this;
        null == this.onSettledCallbacks_
          ? B.asyncExecute(k)
          : this.onSettledCallbacks_.push(k);
        this.isRejectionHandled_ = !0;
      };
      r.resolve = u;
      r.reject = function (m) {
        return new r(function (d, k) {
          k(m);
        });
      };
      r.race = function (m) {
        return new r(function (d, k) {
          for (
            var n = $jscomp.makeIterator(m), f = n.next();
            !f.done;
            f = n.next()
          )
            u(f.value).callWhenSettled_(d, k);
        });
      };
      r.all = function (m) {
        var d = $jscomp.makeIterator(m),
          k = d.next();
        return k.done
          ? u([])
          : new r(function (n, f) {
              function l(q) {
                return function (p) {
                  g[q] = p;
                  x--;
                  0 == x && n(g);
                };
              }
              var g = [],
                x = 0;
              do
                g.push(void 0),
                  x++,
                  u(k.value).callWhenSettled_(l(g.length - 1), f),
                  (k = d.next());
              while (!k.done);
            });
      };
      return r;
    },
    "es6",
    "es3"
  );
  $jscomp.checkStringArgs = function (v, z, u) {
    if (null == v)
      throw new TypeError(
        "The 'this' value for String.prototype." +
          u +
          " must not be null or undefined"
      );
    if (z instanceof RegExp)
      throw new TypeError(
        "First argument to String.prototype." +
          u +
          " must not be a regular expression"
      );
    return v + "";
  };
  $jscomp.polyfill(
    "String.prototype.endsWith",
    function (v) {
      return v
        ? v
        : function (z, u) {
            var t = $jscomp.checkStringArgs(this, z, "endsWith");
            z += "";
            void 0 === u && (u = t.length);
            u = Math.max(0, Math.min(u | 0, t.length));
            for (var r = z.length; 0 < r && 0 < u; )
              if (t[--u] != z[--r]) return !1;
            return 0 >= r;
          };
    },
    "es6",
    "es3"
  );
  $jscomp.findInternal = function (v, z, u) {
    v instanceof String && (v = String(v));
    for (var t = v.length, r = 0; r < t; r++) {
      var B = v[r];
      if (z.call(u, B, r, v)) return { i: r, v: B };
    }
    return { i: -1, v: void 0 };
  };
  $jscomp.polyfill(
    "Array.prototype.find",
    function (v) {
      return v
        ? v
        : function (z, u) {
            return $jscomp.findInternal(this, z, u).v;
          };
    },
    "es6",
    "es3"
  );
  $jscomp.underscoreProtoCanBeSet = function () {
    var v = { a: !0 },
      z = {};
    try {
      return (z.__proto__ = v), z.a;
    } catch (u) {}
    return !1;
  };
  $jscomp.setPrototypeOf =
    $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.setPrototypeOf
      ? Object.setPrototypeOf
      : $jscomp.underscoreProtoCanBeSet()
      ? function (v, z) {
          v.__proto__ = z;
          if (v.__proto__ !== z) throw new TypeError(v + " is not extensible");
          return v;
        }
      : null;
  $jscomp.assign =
    $jscomp.TRUST_ES6_POLYFILLS && "function" == typeof Object.assign
      ? Object.assign
      : function (v, z) {
          for (var u = 1; u < arguments.length; u++) {
            var t = arguments[u];
            if (t) for (var r in t) $jscomp.owns(t, r) && (v[r] = t[r]);
          }
          return v;
        };
  $jscomp.polyfill(
    "Set",
    function (v) {
      function z() {
        if (
          $jscomp.ASSUME_NO_NATIVE_SET ||
          !v ||
          "function" != typeof v ||
          !v.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1;
        try {
          var t = Object.seal({ x: 4 }),
            r = new v($jscomp.makeIterator([t]));
          if (
            !r.has(t) ||
            1 != r.size ||
            r.add(t) != r ||
            1 != r.size ||
            r.add({ x: 4 }) != r ||
            2 != r.size
          )
            return !1;
          var B = r.entries(),
            m = B.next();
          if (m.done || m.value[0] != t || m.value[1] != t) return !1;
          m = B.next();
          return m.done ||
            m.value[0] == t ||
            4 != m.value[0].x ||
            m.value[1] != m.value[0]
            ? !1
            : B.next().done;
        } catch (d) {
          return !1;
        }
      }
      if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
        if (v && $jscomp.ES6_CONFORMANCE) return v;
      } else if (z()) return v;
      var u = function (t) {
        this.map_ = new Map();
        if (t) {
          t = $jscomp.makeIterator(t);
          for (var r; !(r = t.next()).done; ) this.add(r.value);
        }
        this.size = this.map_.size;
      };
      u.prototype.add = function (t) {
        t = 0 === t ? 0 : t;
        this.map_.set(t, t);
        this.size = this.map_.size;
        return this;
      };
      u.prototype.delete = function (t) {
        t = this.map_.delete(t);
        this.size = this.map_.size;
        return t;
      };
      u.prototype.clear = function () {
        this.map_.clear();
        this.size = 0;
      };
      u.prototype.has = function (t) {
        return this.map_.has(t);
      };
      u.prototype.entries = function () {
        return this.map_.entries();
      };
      u.prototype.values = function () {
        return this.map_.values();
      };
      u.prototype.keys = u.prototype.values;
      u.prototype[Symbol.iterator] = u.prototype.values;
      u.prototype.forEach = function (t, r) {
        var B = this;
        this.map_.forEach(function (m) {
          return t.call(r, m, m, B);
        });
      };
      return u;
    },
    "es6",
    "es3"
  );
  $jscomp.iteratorFromArray = function (v, z) {
    v instanceof String && (v += "");
    var u = 0,
      t = !1,
      r = {
        next: function () {
          if (!t && u < v.length) {
            var B = u++;
            return { value: z(B, v[B]), done: !1 };
          }
          t = !0;
          return { done: !0, value: void 0 };
        },
      };
    r[Symbol.iterator] = function () {
      return r;
    };
    return r;
  };
  $jscomp.polyfill(
    "Array.prototype.keys",
    function (v) {
      return v
        ? v
        : function () {
            return $jscomp.iteratorFromArray(this, function (z) {
              return z;
            });
          };
    },
    "es6",
    "es3"
  );
  (function (v) {
    function z(t) {
      if (u[t]) return u[t].exports;
      var r = (u[t] = { i: t, l: !1, exports: {} });
      v[t].call(r.exports, r, r.exports, z);
      r.l = !0;
      return r.exports;
    }
    var u = {};
    z.m = v;
    z.c = u;
    z.d = function (t, r, B) {
      z.o(t, r) || Object.defineProperty(t, r, { enumerable: !0, get: B });
    };
    z.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
      Object.defineProperty(t, "__esModule", { value: !0 });
    };
    z.t = function (t, r) {
      r & 1 && (t = z(t));
      if (r & 8 || (r & 4 && "object" === typeof t && t && t.__esModule))
        return t;
      var B = Object.create(null);
      z.r(B);
      Object.defineProperty(B, "default", { enumerable: !0, value: t });
      if (r & 2 && "string" != typeof t)
        for (var m in t)
          z.d(
            B,
            m,
            function (d) {
              return t[d];
            }.bind(null, m)
          );
      return B;
    };
    z.n = function (t) {
      var r =
        t && t.__esModule
          ? function () {
              return t["default"];
            }
          : function () {
              return t;
            };
      z.d(r, "a", r);
      return r;
    };
    z.o = function (t, r) {
      return Object.prototype.hasOwnProperty.call(t, r);
    };
    z.p = "/core/pdf/";
    return z((z.s = 19));
  })([
    function (v, z, u) {
      u.d(z, "d", function () {
        return B;
      });
      u.d(z, "e", function () {
        return r;
      });
      u.d(z, "c", function () {
        return m;
      });
      u.d(z, "a", function () {
        return d;
      });
      u.d(z, "b", function () {
        return k;
      });
      var t = u(2),
        r = function (n, f) {
          Object(t.a)("disableLogs") ||
            (f ? console.warn("".concat(n, ": ").concat(f)) : console.warn(n));
        },
        B = function (n, f) {
          Object(t.a)("disableLogs") ||
            (f ? console.log("".concat(n, ": ").concat(f)) : console.log(n));
        },
        m = function (n) {
          if (!Object(t.a)("disableLogs")) throw (console.error(n), Error(n));
        },
        d = function (n, f) {},
        k = function (n, f) {};
    },
    function (v, z, u) {
      u.d(z, "c", function () {
        return k;
      });
      u.d(z, "a", function () {
        return n;
      });
      u.d(z, "b", function () {
        return f;
      });
      u.d(z, "d", function () {
        return l;
      });
      var t = u(14),
        r = console.log,
        B = console.warn,
        m = console.error,
        d = function (g) {
          void 0 === g && (g = !0);
          g
            ? ((console.log = function () {}),
              (console.warn = function () {}),
              (console.error = function () {}))
            : ((console.log = r), (console.warn = B), (console.error = m));
        },
        k = function () {
          var g = Object(t.a)(location.search);
          d("1" === g.disableLogs);
        },
        n = function (g) {
          g.on("disableLogs", function (x) {
            d(x.disabled);
          });
        },
        f = function (g, x) {
          return function () {};
        },
        l = function (g, x) {
          x ? console.warn("".concat(g, ": ").concat(x)) : console.warn(g);
        };
    },
    function (v, z, u) {
      u.d(z, "a", function () {
        return B;
      });
      u.d(z, "b", function () {
        return m;
      });
      var t = {},
        r = {
          flattenedResources: !1,
          CANVAS_CACHE_SIZE: void 0,
          maxPagesBefore: void 0,
          maxPagesAhead: void 0,
          disableLogs: !1,
          wvsQueryParameters: {},
          _trnDebugMode: !1,
          _logFiltersEnabled: null,
        },
        B = function (d) {
          return r[d];
        },
        m = function (d, k) {
          var n;
          r[d] = k;
          null === (n = t[d]) || void 0 === n
            ? void 0
            : n.forEach(function (f) {
                f(k);
              });
        };
    },
    function (v, z, u) {
      u.d(z, "a", function () {
        return y;
      });
      u.d(z, "b", function () {
        return b;
      });
      u.d(z, "c", function () {
        return a;
      });
      var t = u(11),
        r = u(0),
        B = u(8),
        m = u(4),
        d = "undefined" === typeof window ? self : window,
        k = d.importScripts,
        n = !1,
        f = function (c, h) {
          n || (k("".concat(d.basePath, "decode.min.js")), (n = !0));
          c = self.BrotliDecode(Object(m.b)(c));
          return h ? c : Object(m.a)(c);
        },
        l = function (c, h) {
          return Object(t.a)(void 0, void 0, Promise, function () {
            var e;
            return Object(t.b)(this, function (w) {
              switch (w.label) {
                case 0:
                  return n
                    ? [3, 2]
                    : [
                        4,
                        Object(B.a)(
                          "".concat(
                            self.Core.getWorkerPath(),
                            "external/decode.min.js"
                          ),
                          "Failed to download decode.min.js",
                          window
                        ),
                      ];
                case 1:
                  w.sent(), (n = !0), (w.label = 2);
                case 2:
                  return (
                    (e = self.BrotliDecode(Object(m.b)(c))),
                    [2, h ? e : Object(m.a)(e)]
                  );
              }
            });
          });
        };
      (function () {
        function c() {
          this.remainingDataArrays = [];
        }
        c.prototype.processRaw = function (h) {
          return h;
        };
        c.prototype.processBrotli = function (h) {
          this.remainingDataArrays.push(h);
          return null;
        };
        c.prototype.GetNextChunk = function (h) {
          this.decodeFunction ||
            (this.decodeFunction =
              0 === h[0] && 97 === h[1] && 115 === h[2] && 109 === h[3]
                ? this.processRaw
                : this.processBrotli);
          return this.decodeFunction(h);
        };
        c.prototype.End = function () {
          if (this.remainingDataArrays.length) {
            for (var h = this.arrays, e = 0, w = 0; w < h.length; ++w)
              e += h[w].length;
            e = new Uint8Array(e);
            var D = 0;
            for (w = 0; w < h.length; ++w) {
              var A = h[w];
              e.set(A, D);
              D += A.length;
            }
            return f(e, !0);
          }
          return null;
        };
        return c;
      })();
      var g = !1,
        x = function (c) {
          g || (k("".concat(d.basePath, "pako_inflate.min.js")), (g = !0));
          var h = 10;
          if ("string" === typeof c) {
            if (c.charCodeAt(3) & 8) {
              for (; 0 !== c.charCodeAt(h); ++h);
              ++h;
            }
          } else if (c[3] & 8) {
            for (; 0 !== c[h]; ++h);
            ++h;
          }
          c = Object(m.b)(c);
          c = c.subarray(h, c.length - 8);
          return d.pako.inflate(c, { windowBits: -15 });
        },
        q = function (c, h) {
          return h ? c : Object(m.a)(c);
        },
        p = function (c) {
          var h = !c.shouldOutputArray,
            e = new XMLHttpRequest();
          e.open("GET", c.url, c.isAsync);
          var w = h && e.overrideMimeType;
          e.responseType = w ? "text" : "arraybuffer";
          w && e.overrideMimeType("text/plain; charset=x-user-defined");
          e.send();
          var D = function () {
            var F = Date.now();
            var J = w ? e.responseText : new Uint8Array(e.response);
            Object(r.a)("worker", "Result length is ".concat(J.length));
            J.length < c.compressedMaximum
              ? ((J = c.decompressFunction(J, c.shouldOutputArray)),
                Object(r.e)(
                  "There may be some degradation of performance. Your server has not been configured to serve .gz. and .br. files with the expected Content-Encoding. See https://docs.apryse.com/documentation/web/faq/content-encoding/ for instructions on how to resolve this."
                ),
                k &&
                  Object(r.a)(
                    "worker",
                    "Decompressed length is ".concat(J.length)
                  ))
              : h && (J = Object(m.a)(J));
            k &&
              Object(r.a)(
                "worker",
                "".concat(c.url, " Decompression took ").concat(Date.now() - F)
              );
            return J;
          };
          if (c.isAsync)
            var A = new Promise(function (F, J) {
              e.onload = function () {
                200 === this.status || 0 === this.status
                  ? F(D())
                  : J("Download Failed ".concat(c.url));
              };
              e.onerror = function () {
                J("Network error occurred ".concat(c.url));
              };
            });
          else {
            if (200 === e.status || 0 === e.status) return D();
            throw Error("Failed to load ".concat(c.url));
          }
          return A;
        },
        y = function (c) {
          var h = c.lastIndexOf("/");
          -1 === h && (h = 0);
          var e = c.slice(h).replace(".", ".br.");
          k ||
            (e.endsWith(".js.mem")
              ? (e = e.replace(".js.mem", ".mem"))
              : e.endsWith(".js") && (e = e.concat(".mem")));
          return c.slice(0, h) + e;
        },
        E = function (c, h) {
          var e = c.lastIndexOf("/");
          -1 === e && (e = 0);
          var w = c.slice(e).replace(".", ".gz.");
          h.url = c.slice(0, e) + w;
          h.decompressFunction = x;
          return p(h);
        },
        C = function (c, h) {
          h.url = y(c);
          h.decompressFunction = k ? f : l;
          return p(h);
        },
        H = function (c, h) {
          c.endsWith(".js.mem")
            ? (c = c.slice(0, -4))
            : c.endsWith(".mem") && (c = "".concat(c.slice(0, -4), ".js.mem"));
          h.url = c;
          h.decompressFunction = q;
          return p(h);
        },
        G = function (c, h, e, w) {
          return c.catch(function (D) {
            Object(r.e)(D);
            return w(h, e);
          });
        },
        I = function (c, h, e) {
          var w;
          if (e.isAsync) {
            var D = h[0](c, e);
            for (w = 1; w < h.length; ++w) D = G(D, c, e, h[w]);
            return D;
          }
          for (w = 0; w < h.length; ++w)
            try {
              return h[w](c, e);
            } catch (A) {
              Object(r.e)(A.message);
            }
          throw Error("");
        },
        a = function (c, h, e, w) {
          return I(c, [E, C, H], {
            compressedMaximum: h,
            isAsync: e,
            shouldOutputArray: w,
          });
        },
        b = function (c, h, e, w) {
          return I(c, [C, E, H], {
            compressedMaximum: h,
            isAsync: e,
            shouldOutputArray: w,
          });
        };
    },
    function (v, z, u) {
      u.d(z, "b", function () {
        return t;
      });
      u.d(z, "a", function () {
        return r;
      });
      var t = function (B) {
          if ("string" === typeof B) {
            for (
              var m = new Uint8Array(B.length), d = B.length, k = 0;
              k < d;
              k++
            )
              m[k] = B.charCodeAt(k);
            return m;
          }
          return B;
        },
        r = function (B) {
          if ("string" !== typeof B) {
            for (var m = "", d = 0, k = B.length, n; d < k; )
              (n = B.subarray(d, d + 1024)),
                (d += 1024),
                (m += String.fromCharCode.apply(null, n));
            return m;
          }
          return B;
        };
    },
    function (v, z, u) {
      u.d(z, "a", function () {
        return q;
      });
      var t,
        r = "undefined" === typeof window ? self : window;
      v = (function () {
        var p = navigator.userAgent.toLowerCase();
        return (p =
          /(msie) ([\w.]+)/.exec(p) || /(trident)(?:.*? rv:([\w.]+)|)/.exec(p))
          ? parseInt(p[2], 10)
          : p;
      })();
      var B = (function () {
        var p = r.navigator.userAgent.match(/OPR/),
          y = r.navigator.userAgent.match(/Maxthon/),
          E = r.navigator.userAgent.match(/Edge/);
        return r.navigator.userAgent.match(/Chrome\/(.*?) /) && !p && !y && !E;
      })();
      (function () {
        if (!B) return null;
        var p = r.navigator.userAgent.match(/Chrome\/([0-9]+)\./);
        return p ? parseInt(p[1], 10) : p;
      })();
      var m =
        !!navigator.userAgent.match(/Edge/i) ||
        (navigator.userAgent.match(/Edg\/(.*?)/) &&
          r.navigator.userAgent.match(/Chrome\/(.*?) /));
      (function () {
        if (!m) return null;
        var p = r.navigator.userAgent.match(/Edg\/([0-9]+)\./);
        return p ? parseInt(p[1], 10) : p;
      })();
      z =
        /iPad|iPhone|iPod/.test(r.navigator.platform) ||
        ("MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints) ||
        /iPad|iPhone|iPod/.test(r.navigator.userAgent);
      var d = (function () {
          var p = r.navigator.userAgent.match(
            /.*\/([0-9\.]+)\s(Safari|Mobile).*/i
          );
          return p ? parseFloat(p[1]) : p;
        })(),
        k =
          /^((?!chrome|android).)*safari/i.test(r.navigator.userAgent) ||
          (/^((?!chrome|android).)*$/.test(r.navigator.userAgent) && z);
      k &&
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
        parseInt(
          null === (t = navigator.userAgent.match(/Version\/(\d+)/)) ||
            void 0 === t
            ? void 0
            : t[1],
          10
        );
      var n = r.navigator.userAgent.match(/Firefox/);
      (function () {
        if (!n) return null;
        var p = r.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
        return p ? parseInt(p[1], 10) : p;
      })();
      v || /Android|webOS|Touch|IEMobile|Silk/i.test(navigator.userAgent);
      navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
      r.navigator.userAgent.indexOf("Android");
      var f = /Mac OS X 10_13_6.*\(KHTML, like Gecko\)$/.test(
          r.navigator.userAgent
        ),
        l = r.navigator.userAgent.match(/(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i)
          ? 14 <=
            parseInt(
              r.navigator.userAgent.match(
                /(iPad|iPhone).+\sOS\s((\d+)(_\d)*)/i
              )[3],
              10
            )
          : !1,
        g = !(!self.WebAssembly || !self.WebAssembly.validate),
        x =
          -1 < r.navigator.userAgent.indexOf("Edge/16") ||
          -1 < r.navigator.userAgent.indexOf("MSAppHost"),
        q = function () {
          return g && !x && !(!l && ((k && 14 > d) || f));
        };
    },
    function (v, z, u) {
      function t(d) {
        "@babel/helpers - typeof";
        return (
          (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (k) {
                  return typeof k;
                }
              : function (k) {
                  return k &&
                    "function" == typeof Symbol &&
                    k.constructor === Symbol &&
                    k !== Symbol.prototype
                    ? "symbol"
                    : typeof k;
                }),
          t(d)
        );
      }
      var r, B, m;
      !(function (d) {
        "object" === t(z) && "undefined" !== typeof v
          ? (v.exports = d())
          : !((B = []),
            (r = d),
            (m = "function" === typeof r ? r.apply(z, B) : r),
            void 0 !== m && (v.exports = m));
      })(function () {
        return (function l(k, n, f) {
          function g(p, y) {
            if (!n[p]) {
              if (!k[p]) {
                if (x) return x(p, !0);
                y = Error("Cannot find module '".concat(p, "'"));
                throw ((y.code = "MODULE_NOT_FOUND"), y);
              }
              y = n[p] = { exports: {} };
              k[p][0].call(
                y.exports,
                function (E) {
                  return g(k[p][1][E] || E);
                },
                y,
                y.exports,
                l,
                k,
                n,
                f
              );
            }
            return n[p].exports;
          }
          for (var x = !1, q = 0; q < f.length; q++) g(f[q]);
          return g;
        })(
          {
            1: [
              function (k, n, f) {
                var l = {}.hasOwnProperty,
                  g = function (x, q) {
                    function p() {
                      this.constructor = x;
                    }
                    for (var y in q) l.call(q, y) && (x[y] = q[y]);
                    p.prototype = q.prototype;
                    x.prototype = new p();
                    x.__super__ = q.prototype;
                    return x;
                  };
                f = k("./PriorityQueue/AbstractPriorityQueue");
                k = k("./PriorityQueue/ArrayStrategy");
                f = (function (x) {
                  function q(p) {
                    p || (p = {});
                    p.strategy || (p.strategy = BinaryHeapStrategy);
                    p.comparator ||
                      (p.comparator = function (y, E) {
                        return (y || 0) - (E || 0);
                      });
                    q.__super__.constructor.call(this, p);
                  }
                  g(q, x);
                  return q;
                })(f);
                f.ArrayStrategy = k;
                n.exports = f;
              },
              {
                "./PriorityQueue/AbstractPriorityQueue": 2,
                "./PriorityQueue/ArrayStrategy": 3,
              },
            ],
            2: [
              function (k, n, f) {
                n.exports = (function () {
                  function l(g) {
                    if (null == (null != g ? g.strategy : void 0))
                      throw "Must pass options.strategy, a strategy";
                    if (null == (null != g ? g.comparator : void 0))
                      throw "Must pass options.comparator, a comparator";
                    this.priv = new g.strategy(g);
                    this.length = 0;
                  }
                  l.prototype.queue = function (g) {
                    this.length++;
                    this.priv.queue(g);
                  };
                  l.prototype.dequeue = function (g) {
                    if (!this.length) throw "Empty queue";
                    this.length--;
                    return this.priv.dequeue();
                  };
                  l.prototype.peek = function (g) {
                    if (!this.length) throw "Empty queue";
                    return this.priv.peek();
                  };
                  l.prototype.remove = function (g) {
                    this.priv.remove(g) && --this.length;
                  };
                  l.prototype.find = function (g) {
                    return 0 <= this.priv.find(g);
                  };
                  l.prototype.removeAllMatching = function (g, x) {
                    g = this.priv.removeAllMatching(g, x);
                    this.length -= g;
                  };
                  return l;
                })();
              },
              {},
            ],
            3: [
              function (k, n, f) {
                var l = function (g, x, q) {
                  var p;
                  var y = 0;
                  for (p = g.length; y < p; ) {
                    var E = (y + p) >>> 1;
                    0 <= q(g[E], x) ? (y = E + 1) : (p = E);
                  }
                  return y;
                };
                n.exports = (function () {
                  function g(x) {
                    var q;
                    this.options = x;
                    this.comparator = this.options.comparator;
                    this.data =
                      (null != (q = this.options.initialValues)
                        ? q.slice(0)
                        : void 0) || [];
                    this.data.sort(this.comparator).reverse();
                  }
                  g.prototype.queue = function (x) {
                    var q = l(this.data, x, this.comparator);
                    this.data.splice(q, 0, x);
                  };
                  g.prototype.dequeue = function () {
                    return this.data.pop();
                  };
                  g.prototype.peek = function () {
                    return this.data[this.data.length - 1];
                  };
                  g.prototype.find = function (x) {
                    var q = l(this.data, x, this.comparator) - 1;
                    return 0 <= q && !this.comparator(this.data[q], x) ? q : -1;
                  };
                  g.prototype.remove = function (x) {
                    x = this.find(x);
                    return 0 <= x ? (this.data.splice(x, 1), !0) : !1;
                  };
                  g.prototype.removeAllMatching = function (x, q) {
                    for (var p = 0, y = this.data.length - 1; 0 <= y; --y)
                      if (x(this.data[y])) {
                        var E = this.data.splice(y, 1)[0];
                        q && q(E);
                        ++p;
                      }
                    return p;
                  };
                  return g;
                })();
              },
              {},
            ],
          },
          {},
          [1]
        )(1);
      });
    },
    function (v, z, u) {
      (function (t) {
        function r(d, k) {
          this._id = d;
          this._clearFn = k;
        }
        var B =
            ("undefined" !== typeof t && t) ||
            ("undefined" !== typeof self && self) ||
            window,
          m = Function.prototype.apply;
        z.setTimeout = function () {
          return new r(m.call(setTimeout, B, arguments), clearTimeout);
        };
        z.setInterval = function () {
          return new r(m.call(setInterval, B, arguments), clearInterval);
        };
        z.clearTimeout = z.clearInterval = function (d) {
          d && d.close();
        };
        r.prototype.unref = r.prototype.ref = function () {};
        r.prototype.close = function () {
          this._clearFn.call(B, this._id);
        };
        z.enroll = function (d, k) {
          clearTimeout(d._idleTimeoutId);
          d._idleTimeout = k;
        };
        z.unenroll = function (d) {
          clearTimeout(d._idleTimeoutId);
          d._idleTimeout = -1;
        };
        z._unrefActive = z.active = function (d) {
          clearTimeout(d._idleTimeoutId);
          var k = d._idleTimeout;
          0 <= k &&
            (d._idleTimeoutId = setTimeout(function () {
              d._onTimeout && d._onTimeout();
            }, k));
        };
        u(23);
        z.setImmediate =
          ("undefined" !== typeof self && self.setImmediate) ||
          ("undefined" !== typeof t && t.setImmediate) ||
          (this && this.setImmediate);
        z.clearImmediate =
          ("undefined" !== typeof self && self.clearImmediate) ||
          ("undefined" !== typeof t && t.clearImmediate) ||
          (this && this.clearImmediate);
      }.call(this, u(10)));
    },
    function (v, z, u) {
      function t(B, m, d) {
        return new Promise(function (k) {
          if (!B) return k();
          var n = d.document.createElement("script");
          n.type = "text/javascript";
          n.onload = function () {
            k();
          };
          n.onerror = function () {
            m && Object(r.e)(m);
            k();
          };
          n.src = B;
          d.document.getElementsByTagName("head")[0].appendChild(n);
        });
      }
      u.d(z, "a", function () {
        return t;
      });
      var r = u(0);
    },
    function (v, z, u) {
      function t(d, k, n) {
        function f(x) {
          g = g || Date.now();
          return x
            ? (Object(r.a)("load", "Try instantiateStreaming"),
              fetch(Object(B.a)(d))
                .then(function (q) {
                  return WebAssembly.instantiateStreaming(q, k);
                })
                .catch(function (q) {
                  Object(r.a)(
                    "load",
                    "instantiateStreaming Failed "
                      .concat(d, " message ")
                      .concat(q.message)
                  );
                  return f(!1);
                }))
            : Object(B.b)(d, n, !0, !0).then(function (q) {
                l = Date.now();
                Object(r.a)("load", "Request took ".concat(l - g, " ms"));
                return WebAssembly.instantiate(q, k);
              });
        }
        var l, g;
        return f(!!WebAssembly.instantiateStreaming).then(function (x) {
          Object(r.a)(
            "load",
            "WASM compilation took ".concat(Date.now() - (l || g), " ms")
          );
          return x;
        });
      }
      u.d(z, "a", function () {
        return t;
      });
      var r = u(0),
        B = u(3),
        m = u(8);
      u.d(z, "b", function () {
        return m.a;
      });
    },
    function (v, z) {
      z = (function () {
        return this;
      })();
      try {
        z = z || new Function("return this")();
      } catch (u) {
        "object" === typeof window && (z = window);
      }
      v.exports = z;
    },
    function (v, z, u) {
      function t(B, m, d, k) {
        function n(f) {
          return f instanceof d
            ? f
            : new d(function (l) {
                l(f);
              });
        }
        return new (d || (d = Promise))(function (f, l) {
          function g(p) {
            try {
              q(k.next(p));
            } catch (y) {
              l(y);
            }
          }
          function x(p) {
            try {
              q(k["throw"](p));
            } catch (y) {
              l(y);
            }
          }
          function q(p) {
            p.done ? f(p.value) : n(p.value).then(g, x);
          }
          q((k = k.apply(B, m || [])).next());
        });
      }
      function r(B, m) {
        function d(q) {
          return function (p) {
            return k([q, p]);
          };
        }
        function k(q) {
          if (f) throw new TypeError("Generator is already executing.");
          for (; x && ((x = 0), q[0] && (n = 0)), n; )
            try {
              if (
                ((f = 1),
                l &&
                  (g =
                    q[0] & 2
                      ? l["return"]
                      : q[0]
                      ? l["throw"] || ((g = l["return"]) && g.call(l), 0)
                      : l.next) &&
                  !(g = g.call(l, q[1])).done)
              )
                return g;
              if (((l = 0), g)) q = [q[0] & 2, g.value];
              switch (q[0]) {
                case 0:
                case 1:
                  g = q;
                  break;
                case 4:
                  return n.label++, { value: q[1], done: !1 };
                case 5:
                  n.label++;
                  l = q[1];
                  q = [0];
                  continue;
                case 7:
                  q = n.ops.pop();
                  n.trys.pop();
                  continue;
                default:
                  if (
                    !((g = n.trys), (g = 0 < g.length && g[g.length - 1])) &&
                    (6 === q[0] || 2 === q[0])
                  ) {
                    n = 0;
                    continue;
                  }
                  if (3 === q[0] && (!g || (q[1] > g[0] && q[1] < g[3])))
                    n.label = q[1];
                  else if (6 === q[0] && n.label < g[1])
                    (n.label = g[1]), (g = q);
                  else if (g && n.label < g[2]) (n.label = g[2]), n.ops.push(q);
                  else {
                    g[2] && n.ops.pop();
                    n.trys.pop();
                    continue;
                  }
              }
              q = m.call(B, n);
            } catch (p) {
              (q = [6, p]), (l = 0);
            } finally {
              f = g = 0;
            }
          if (q[0] & 5) throw q[1];
          return { value: q[0] ? q[1] : void 0, done: !0 };
        }
        var n = {
            label: 0,
            sent: function () {
              if (g[0] & 1) throw g[1];
              return g[1];
            },
            trys: [],
            ops: [],
          },
          f,
          l,
          g,
          x;
        return (
          (x = { next: d(0), throw: d(1), return: d(2) }),
          "function" === typeof Symbol &&
            (x[Symbol.iterator] = function () {
              return this;
            }),
          x
        );
      }
      u.d(z, "a", function () {
        return t;
      });
      u.d(z, "b", function () {
        return r;
      });
    },
    function (v, z) {
      function u() {
        throw Error("setTimeout has not been defined");
      }
      function t() {
        throw Error("clearTimeout has not been defined");
      }
      function r(y) {
        if (f === setTimeout) return setTimeout(y, 0);
        if ((f === u || !f) && setTimeout)
          return (f = setTimeout), setTimeout(y, 0);
        try {
          return f(y, 0);
        } catch (E) {
          try {
            return f.call(null, y, 0);
          } catch (C) {
            return f.call(this, y, 0);
          }
        }
      }
      function B(y) {
        if (l === clearTimeout) return clearTimeout(y);
        if ((l === t || !l) && clearTimeout)
          return (l = clearTimeout), clearTimeout(y);
        try {
          return l(y);
        } catch (E) {
          try {
            return l.call(null, y);
          } catch (C) {
            return l.call(this, y);
          }
        }
      }
      function m() {
        x &&
          q &&
          ((x = !1), q.length ? (g = q.concat(g)) : (p = -1), g.length && d());
      }
      function d() {
        if (!x) {
          var y = r(m);
          x = !0;
          for (var E = g.length; E; ) {
            q = g;
            for (g = []; ++p < E; ) q && q[p].run();
            p = -1;
            E = g.length;
          }
          q = null;
          x = !1;
          B(y);
        }
      }
      function k(y, E) {
        this.fun = y;
        this.array = E;
      }
      function n() {}
      v = v.exports = {};
      try {
        var f = "function" === typeof setTimeout ? setTimeout : u;
      } catch (y) {
        f = u;
      }
      try {
        var l = "function" === typeof clearTimeout ? clearTimeout : t;
      } catch (y) {
        l = t;
      }
      var g = [],
        x = !1,
        q,
        p = -1;
      v.nextTick = function (y) {
        var E = Array(arguments.length - 1);
        if (1 < arguments.length)
          for (var C = 1; C < arguments.length; C++) E[C - 1] = arguments[C];
        g.push(new k(y, E));
        1 !== g.length || x || r(d);
      };
      k.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      v.title = "browser";
      v.browser = !0;
      v.env = {};
      v.argv = [];
      v.version = "";
      v.versions = {};
      v.on = n;
      v.addListener = n;
      v.once = n;
      v.off = n;
      v.removeListener = n;
      v.removeAllListeners = n;
      v.emit = n;
      v.prependListener = n;
      v.prependOnceListener = n;
      v.listeners = function (y) {
        return [];
      };
      v.binding = function (y) {
        throw Error("process.binding is not supported");
      };
      v.cwd = function () {
        return "/";
      };
      v.chdir = function (y) {
        throw Error("process.chdir is not supported");
      };
      v.umask = function () {
        return 0;
      };
    },
    function (v, z, u) {
      z.a = function () {
        ArrayBuffer.prototype.slice ||
          (ArrayBuffer.prototype.slice = function (t, r) {
            void 0 === t && (t = 0);
            void 0 === r && (r = this.byteLength);
            t = Math.floor(t);
            r = Math.floor(r);
            0 > t && (t += this.byteLength);
            0 > r && (r += this.byteLength);
            t = Math.min(Math.max(0, t), this.byteLength);
            r = Math.min(Math.max(0, r), this.byteLength);
            if (0 >= r - t) return new ArrayBuffer(0);
            var B = new ArrayBuffer(r - t),
              m = new Uint8Array(B);
            t = new Uint8Array(this, t, r - t);
            m.set(t);
            return B;
          });
      };
    },
    function (v, z, u) {
      z.a = function (t) {
        var r = {};
        decodeURIComponent(t.slice(1))
          .split("&")
          .forEach(function (B) {
            B = B.split("=", 2);
            r[B[0]] = B[1];
          });
        return r;
      };
    },
    function (v, z, u) {
      (function (t) {
        function r(H) {
          "function" !== typeof H && (H = new Function("".concat(H)));
          for (var G = Array(arguments.length - 1), I = 0; I < G.length; I++)
            G[I] = arguments[I + 1];
          q[x] = { callback: H, args: G };
          E(x);
          return x++;
        }
        function B(H) {
          delete q[H];
        }
        function m(H) {
          if (p) setTimeout(m, 0, H);
          else {
            var G = q[H];
            if (G) {
              p = !0;
              try {
                var I = G.callback,
                  a = G.args;
                switch (a.length) {
                  case 0:
                    I();
                    break;
                  case 1:
                    I(a[0]);
                    break;
                  case 2:
                    I(a[0], a[1]);
                    break;
                  case 3:
                    I(a[0], a[1], a[2]);
                    break;
                  default:
                    I.apply(void 0, a);
                }
              } finally {
                B(H), (p = !1);
              }
            }
          }
        }
        function d() {
          E = function (H) {
            t.nextTick(function () {
              m(H);
            });
          };
        }
        function k() {
          if (g.postMessage && !g.importScripts) {
            var H = !0,
              G = g.onmessage;
            g.onmessage = function () {
              H = !1;
            };
            g.postMessage("", "*");
            g.onmessage = G;
            return H;
          }
        }
        function n() {
          var H = "setImmediate$".concat(Math.random(), "$"),
            G = function (I) {
              (I.source !== g && I.source !== g.parent) ||
                "string" !== typeof I.data ||
                0 !== I.data.indexOf(H) ||
                m(+I.data.slice(H.length));
            };
          g.addEventListener
            ? g.addEventListener("message", G, !1)
            : g.attachEvent("onmessage", G);
          E = function (I) {
            g.postMessage(H + I, "*");
          };
        }
        function f() {
          var H = y.documentElement;
          E = function (G) {
            var I = y.createElement("script");
            I.onreadystatechange = function () {
              m(G);
              I.onreadystatechange = null;
              H.removeChild(I);
              I = null;
            };
            H.appendChild(I);
          };
        }
        function l() {
          E = function (H) {
            setTimeout(m, 0, H);
          };
        }
        var g = "undefined" === typeof window ? self : window,
          x = 1,
          q = {},
          p = !1,
          y = g.document,
          E,
          C = Object.getPrototypeOf && Object.getPrototypeOf(g);
        C = C && C.setTimeout ? C : g;
        "[object process]" === {}.toString.call(g.process)
          ? d()
          : k()
          ? n()
          : y && "onreadystatechange" in y.createElement("script")
          ? f()
          : l();
        C.setImmediate = r;
        C.clearImmediate = B;
        z.a = { setImmediate: r, clearImmediate: B };
      }.call(this, u(12)));
    },
    function (v, z, u) {
      var t = u(0),
        r = u(2);
      v = (function () {
        function B(m, d) {
          this.name = m;
          this.comObj = d;
          this.callbackIndex = 1;
          this.postMessageTransfers = !0;
          this.callbacksCapabilities = {};
          this.actionHandler = {};
          this.actionHandlerAsync = {};
          this.pdfnetCommandChain = this.nextAsync = null;
          this.pdfnetActiveCommands = new Set();
          this.actionHandler.console_log = [
            function (k) {
              Object(t.d)(k);
            },
          ];
          this.actionHandler.console_error = [
            function (k) {
              Object(t.c)(k);
            },
          ];
          this.actionHandler.workerLoaded = [function () {}];
          this.msgHandler = this.handleMessage.bind(this);
          d.addEventListener("message", this.msgHandler);
        }
        B.prototype.on = function (m, d, k) {
          var n = this.actionHandler;
          n[m] &&
            Object(t.c)(
              'There is already an actionName called "'.concat(m, '"')
            );
          n[m] = [d, k];
        };
        B.prototype.clearActionHandlers = function () {
          this.actionHandler = {};
          this.comObj.removeEventListener("message", this.msgHandler);
        };
        B.prototype.reset = function () {
          this.clearActionHandlers();
          this.comObj.reset && this.comObj.reset();
        };
        B.prototype.replace = function (m, d, k) {
          this.actionHandler[m] = [d, k];
        };
        B.prototype.onAsync = function (m, d, k) {
          var n = this.actionHandlerAsync;
          n[m] &&
            Object(t.c)(
              'There is already an actionName called "'.concat(m, '"')
            );
          n[m] = [d, k];
        };
        B.prototype.replaceAsync = function (m, d, k) {
          var n = this.actionHandlerAsync,
            f = this.actionHandler;
          f[m] && delete f[m];
          n[m] = [d, k];
        };
        B.prototype.onNextAsync = function (m) {
          this.nextAsync = m;
        };
        B.prototype.send = function (m, d) {
          this.postMessage({ action: m, data: d });
        };
        B.prototype.getNextId = function () {
          return this.callbackIndex++;
        };
        B.prototype.sendWithPromise = function (m, d, k) {
          var n = this.getNextId();
          m = { action: m, data: d, callbackId: n, priority: k };
          d = window.createPromiseCapability();
          this.callbacksCapabilities[n] = d;
          try {
            this.postMessage(m);
          } catch (f) {
            d.reject(f);
          }
          return d.promise;
        };
        B.prototype.sendWithPromiseReturnId = function (m, d, k) {
          var n = this.getNextId();
          m = { action: m, data: d, callbackId: n, priority: k };
          d = window.createPromiseCapability();
          this.callbacksCapabilities[n] = d;
          try {
            this.postMessage(m);
          } catch (f) {
            d.reject(f);
          }
          return { promise: d.promise, callbackId: n };
        };
        B.prototype.sendWithPromiseWithId = function (m, d, k) {
          d > this.callbackIndex &&
            Object(t.c)(
              "Can't reuse callbackId "
                .concat(d, " lesser than callbackIndex ")
                .concat(this.callbackIndex)
            );
          d in this.callbacksCapabilities &&
            Object(t.c)(
              "Can't reuse callbackId ".concat(
                d,
                ". There is a capability waiting to be resolved. "
              )
            );
          m = { action: m, data: k, callbackId: d };
          k = window.createPromiseCapability();
          this.callbacksCapabilities[d] = k;
          try {
            this.postMessage(m);
          } catch (n) {
            k.reject(n);
          }
          return k.promise;
        };
        B.prototype.sendError = function (m, d) {
          if (m.message || m.errorData) {
            m.message && m.message.message && (m.message = m.message.message);
            var k = m.errorData;
            m = {
              type: m.type ? m.type : "JavascriptError",
              message: m.message,
            };
            k &&
              Object.keys(k).forEach(function (n) {
                k.hasOwnProperty(n) && (m[n] = k[n]);
              });
          }
          this.postMessage({ isReply: !0, callbackId: d, error: m });
        };
        B.prototype.getPromise = function (m) {
          if (m in this.callbacksCapabilities)
            return this.callbacksCapabilities[m];
          Object(t.c)("Cannot get promise for callback ".concat(m));
        };
        B.prototype.cancelPromise = function (m) {
          if (m in this.callbacksCapabilities) {
            var d = this.callbacksCapabilities[m];
            delete this.callbacksCapabilities[m];
            this.pdfnetActiveCommands.has(m) &&
              this.pdfnetActiveCommands.delete(m);
            d.reject({
              type: "Cancelled",
              message: "Request has been cancelled.",
            });
            this.postMessage({
              action: "actionCancel",
              data: { callbackId: m },
            });
          } else Object(t.b)("Cannot cancel callback ".concat(m));
        };
        B.prototype.postMessage = function (m) {
          "officeeditor" !== this.name &&
            Object(r.a)("enableWorkerLogs") &&
            Object(t.d)(
              "PDFWorker",
              "".concat(performance.now(), " Sent ").concat(JSON.stringify(m))
            );
          if (this.postMessageTransfers) {
            var d = this.getTransfersArray(m);
            this.comObj.postMessage(m, d);
          } else this.comObj.postMessage(m);
        };
        B.prototype.getObjectTransfers = function (m, d) {
          var k = this;
          null !== m &&
            "object" === typeof m &&
            (m instanceof Uint8Array
              ? d.push(m.buffer)
              : m instanceof ArrayBuffer
              ? d.push(m)
              : Object.keys(m).forEach(function (n) {
                  m.hasOwnProperty(n) && k.getObjectTransfers(m[n], d);
                }));
        };
        B.prototype.getTransfersArray = function (m) {
          var d = [];
          this.getObjectTransfers(m, d);
          return 0 === d.length ? void 0 : d;
        };
        B.prototype.handleMessage = function (m) {
          var d = this,
            k = m.data;
          "officeeditor" !== this.name &&
            Object(r.a)("enableWorkerLogs") &&
            Object(t.d)(
              "PDFWorker",
              ""
                .concat(performance.now(), " Received ")
                .concat(JSON.stringify(k))
            );
          var n = this.actionHandler,
            f = this.actionHandlerAsync;
          m = this.callbacksCapabilities;
          var l = this.pdfnetActiveCommands;
          if (k.isReply)
            (n = k.callbackId),
              n in m
                ? ((f = m[n]),
                  delete m[n],
                  l.has(n) && l.delete(n),
                  "error" in k ? f.reject(k.error) : f.resolve(k.data))
                : Object(t.a)("Cannot resolve callback ".concat(n));
          else if (k.action in n) {
            var g = n[k.action];
            k.callbackId
              ? Promise.resolve()
                  .then(function () {
                    return g[0].call(g[1], k.data);
                  })
                  .then(
                    function (x) {
                      d.postMessage({
                        isReply: !0,
                        callbackId: k.callbackId,
                        data: x,
                      });
                    },
                    function (x) {
                      d.sendError(x, k.callbackId);
                    }
                  )
              : g[0].call(g[1], k.data);
          } else
            k.action in f
              ? ((g = f[k.action]),
                k.callbackId
                  ? g[0].call(g[1], k).then(
                      function (x) {
                        d.postMessage({
                          isReply: !0,
                          callbackId: k.callbackId,
                          data: x,
                        });
                        d.nextAsync();
                      },
                      function (x) {
                        d.sendError(x, k.callbackId);
                        d.nextAsync();
                      }
                    )
                  : g[0].call(g[1], k).then(
                      function () {
                        d.nextAsync();
                      },
                      function () {
                        d.nextAsync();
                      }
                    ))
              : Object(t.c)("Unknown action from worker: ".concat(k.action));
        };
        return B;
      })();
      z.a = v;
    },
    function (v, z, u) {
      u.d(z, "a", function () {
        return d;
      });
      var t = u(3),
        r = u(9),
        B = u(5),
        m = (function () {
          function k(n) {
            var f = this;
            this.promise = n.then(function (l) {
              f.response = l;
              f.status = 200;
            });
          }
          k.prototype.addEventListener = function (n, f) {
            this.promise.then(f);
          };
          return k;
        })(),
        d = function (k, n, f) {
          if (Object(B.a)() && !f) {
            self.Module.instantiateWasm = function (g, x) {
              return Object(r.a)(
                "".concat(k, "Wasm.wasm"),
                g,
                n["Wasm.wasm"]
              ).then(function (q) {
                x(q.instance);
              });
            };
            if (n.disableObjectURLBlobs) {
              importScripts("".concat(k, "Wasm.js"));
              return;
            }
            f = Object(t.b)(
              "".concat(k, "Wasm.js.mem"),
              n["Wasm.js.mem"],
              !1,
              !1
            );
          } else {
            if (n.disableObjectURLBlobs) {
              importScripts(
                "".concat(
                  (self.Module.asmjsPrefix ? self.Module.asmjsPrefix : "") + k,
                  ".js"
                )
              );
              return;
            }
            f = Object(t.b)(
              "".concat(
                (self.Module.asmjsPrefix ? self.Module.asmjsPrefix : "") + k,
                ".js.mem"
              ),
              n[".js.mem"],
              !1
            );
            var l = Object(t.c)(
              "".concat(
                (self.Module.memoryInitializerPrefixURL
                  ? self.Module.memoryInitializerPrefixURL
                  : "") + k,
                ".mem"
              ),
              n[".mem"],
              !0,
              !0
            );
            self.Module.memoryInitializerRequest = new m(l);
          }
          f = new Blob([f], { type: "application/javascript" });
          importScripts(URL.createObjectURL(f));
        };
    },
    function (v, z, u) {
      u.d(z, "a", function () {
        return t;
      });
      var t = "optimized/";
    },
    function (v, z, u) {
      v.exports = u(20);
    },
    function (v, z, u) {
      u.r(z);
      u(5);
      v = u(13);
      u(21);
      u(22);
      u(25);
      u(26);
      u(27);
      u(28);
      u(29);
      Object(v.a)();
    },
    function (v, z, u) {
      (function (t) {
        "undefined" === typeof t.crypto &&
          (t.crypto = {
            getRandomValues: function (r) {
              for (var B = 0; B < r.length; B++) r[B] = 256 * Math.random();
            },
          });
      })("undefined" === typeof window ? self : window);
    },
    function (v, z, u) {
      (function (t, r) {
        function B(m) {
          "@babel/helpers - typeof";
          return (
            (B =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (d) {
                    return typeof d;
                  }
                : function (d) {
                    return d &&
                      "function" == typeof Symbol &&
                      d.constructor === Symbol &&
                      d !== Symbol.prototype
                      ? "symbol"
                      : typeof d;
                  }),
            B(m)
          );
        }
        (function (m) {
          function d() {
            for (var A = 0; A < w.length; A++) w[A][0](w[A][1]);
            w = [];
            D = !1;
          }
          function k(A, F) {
            w.push([A, F]);
            D || ((D = !0), e(d, 0));
          }
          function n(A, F) {
            function J(K) {
              g(F, K);
            }
            function L(K) {
              q(F, K);
            }
            try {
              A(J, L);
            } catch (K) {
              L(K);
            }
          }
          function f(A) {
            var F = A.owner,
              J = F.state_;
            F = F.data_;
            var L = A[J];
            A = A.then;
            if ("function" === typeof L) {
              J = b;
              try {
                F = L(F);
              } catch (K) {
                q(A, K);
              }
            }
            l(A, F) || (J === b && g(A, F), J === c && q(A, F));
          }
          function l(A, F) {
            var J;
            try {
              if (A === F)
                throw new TypeError(
                  "A promises callback cannot return that same promise."
                );
              if (F && ("function" === typeof F || "object" === B(F))) {
                var L = F.then;
                if ("function" === typeof L)
                  return (
                    L.call(
                      F,
                      function (K) {
                        J || ((J = !0), F !== K ? g(A, K) : x(A, K));
                      },
                      function (K) {
                        J || ((J = !0), q(A, K));
                      }
                    ),
                    !0
                  );
              }
            } catch (K) {
              return J || q(A, K), !0;
            }
            return !1;
          }
          function g(A, F) {
            (A !== F && l(A, F)) || x(A, F);
          }
          function x(A, F) {
            A.state_ === I && ((A.state_ = a), (A.data_ = F), k(y, A));
          }
          function q(A, F) {
            A.state_ === I && ((A.state_ = a), (A.data_ = F), k(E, A));
          }
          function p(A) {
            var F = A.then_;
            A.then_ = void 0;
            for (A = 0; A < F.length; A++) f(F[A]);
          }
          function y(A) {
            A.state_ = b;
            p(A);
          }
          function E(A) {
            A.state_ = c;
            p(A);
          }
          function C(A) {
            if ("function" !== typeof A)
              throw new TypeError(
                "Promise constructor takes a function argument"
              );
            if (!(this instanceof C))
              throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
              );
            this.then_ = [];
            n(A, this);
          }
          m.createPromiseCapability = function () {
            var A = {};
            A.promise = new C(function (F, J) {
              A.resolve = F;
              A.reject = J;
            });
            return A;
          };
          var H = m.Promise,
            G =
              H &&
              "resolve" in H &&
              "reject" in H &&
              "all" in H &&
              "race" in H &&
              (function () {
                var A;
                new H(function (F) {
                  A = F;
                });
                return "function" === typeof A;
              })();
          "undefined" !== typeof exports && exports
            ? ((exports.Promise = G ? H : C), (exports.Polyfill = C))
            : "function" === typeof define && u(24)
            ? define(function () {
                return G ? H : C;
              })
            : G || (m.Promise = C);
          var I = "pending",
            a = "sealed",
            b = "fulfilled",
            c = "rejected",
            h = function () {},
            e = "undefined" !== typeof r ? r : setTimeout,
            w = [],
            D;
          C.prototype = {
            constructor: C,
            state_: I,
            then_: null,
            data_: void 0,
            then: function (A, F) {
              A = {
                owner: this,
                then: new this.constructor(h),
                fulfilled: A,
                rejected: F,
              };
              this.state_ === b || this.state_ === c
                ? k(f, A)
                : this.then_.push(A);
              return A.then;
            },
            catch: function (A) {
              return this.then(null, A);
            },
          };
          C.all = function (A) {
            if ("[object Array]" !== Object.prototype.toString.call(A))
              throw new TypeError("You must pass an array to Promise.all().");
            return new this(function (F, J) {
              function L(R) {
                N++;
                return function (P) {
                  K[R] = P;
                  --N || F(K);
                };
              }
              for (var K = [], N = 0, M = 0, Q; M < A.length; M++)
                (Q = A[M]) && "function" === typeof Q.then
                  ? Q.then(L(M), J)
                  : (K[M] = Q);
              N || F(K);
            });
          };
          C.race = function (A) {
            if ("[object Array]" !== Object.prototype.toString.call(A))
              throw new TypeError("You must pass an array to Promise.race().");
            return new this(function (F, J) {
              for (var L = 0, K; L < A.length; L++)
                (K = A[L]) && "function" === typeof K.then
                  ? K.then(F, J)
                  : F(K);
            });
          };
          C.resolve = function (A) {
            return A && "object" === B(A) && A.constructor === this
              ? A
              : new this(function (F) {
                  F(A);
                });
          };
          C.reject = function (A) {
            return new this(function (F, J) {
              J(A);
            });
          };
        })(
          "undefined" !== typeof window
            ? window
            : "undefined" !== typeof t
            ? t
            : "undefined" !== typeof self
            ? self
            : void 0
        );
      }.call(this, u(10), u(7).setImmediate));
    },
    function (v, z, u) {
      (function (t, r) {
        (function (B, m) {
          function d(I) {
            delete y[I];
          }
          function k(I) {
            if (E) setTimeout(k, 0, I);
            else {
              var a = y[I];
              if (a) {
                E = !0;
                try {
                  var b = a.callback,
                    c = a.args;
                  switch (c.length) {
                    case 0:
                      b();
                      break;
                    case 1:
                      b(c[0]);
                      break;
                    case 2:
                      b(c[0], c[1]);
                      break;
                    case 3:
                      b(c[0], c[1], c[2]);
                      break;
                    default:
                      b.apply(m, c);
                  }
                } finally {
                  d(I), (E = !1);
                }
              }
            }
          }
          function n() {
            H = function (I) {
              r.nextTick(function () {
                k(I);
              });
            };
          }
          function f() {
            if (B.postMessage && !B.importScripts) {
              var I = !0,
                a = B.onmessage;
              B.onmessage = function () {
                I = !1;
              };
              B.postMessage("", "*");
              B.onmessage = a;
              return I;
            }
          }
          function l() {
            var I = "setImmediate$" + Math.random() + "$",
              a = function (b) {
                b.source === B &&
                  "string" === typeof b.data &&
                  0 === b.data.indexOf(I) &&
                  k(+b.data.slice(I.length));
              };
            B.addEventListener
              ? B.addEventListener("message", a, !1)
              : B.attachEvent("onmessage", a);
            H = function (b) {
              B.postMessage(I + b, "*");
            };
          }
          function g() {
            var I = new MessageChannel();
            I.port1.onmessage = function (a) {
              k(a.data);
            };
            H = function (a) {
              I.port2.postMessage(a);
            };
          }
          function x() {
            var I = C.documentElement;
            H = function (a) {
              var b = C.createElement("script");
              b.onreadystatechange = function () {
                k(a);
                b.onreadystatechange = null;
                I.removeChild(b);
                b = null;
              };
              I.appendChild(b);
            };
          }
          function q() {
            H = function (I) {
              setTimeout(k, 0, I);
            };
          }
          if (!B.setImmediate) {
            var p = 1,
              y = {},
              E = !1,
              C = B.document,
              H,
              G = Object.getPrototypeOf && Object.getPrototypeOf(B);
            G = G && G.setTimeout ? G : B;
            "[object process]" === {}.toString.call(B.process)
              ? n()
              : f()
              ? l()
              : B.MessageChannel
              ? g()
              : C && "onreadystatechange" in C.createElement("script")
              ? x()
              : q();
            G.setImmediate = function (I) {
              "function" !== typeof I && (I = new Function("" + I));
              for (
                var a = Array(arguments.length - 1), b = 0;
                b < a.length;
                b++
              )
                a[b] = arguments[b + 1];
              y[p] = { callback: I, args: a };
              H(p);
              return p++;
            };
            G.clearImmediate = d;
          }
        })(
          "undefined" === typeof self
            ? "undefined" === typeof t
              ? this
              : t
            : self
        );
      }.call(this, u(10), u(12)));
    },
    function (v, z) {
      v.exports = {};
    },
    function (v, z, u) {
      (function (t) {
        var r = function (B, m) {
          var d = function l(f) {
              f = this["catch"](f);
              return {
                cancel: m,
                promise: f,
                then: k.bind(f),
                catch: l.bind(f),
              };
            },
            k = function x(l, g) {
              l = this.then(l, g);
              return {
                cancel: m,
                promise: l,
                then: x.bind(l),
                catch: d.bind(l),
              };
            };
          return { cancel: m, promise: B, then: k.bind(B), catch: d.bind(B) };
        };
        t.CancellablePromise = function (B, m) {
          var d = !1,
            k,
            n = new Promise(function (f, l) {
              k = function () {
                d || (m(), l("cancelled"));
              };
              new Promise(B).then(
                function (g) {
                  d = !0;
                  f(g);
                },
                function (g) {
                  d = !0;
                  l(g);
                }
              );
            });
          return r(n, k);
        };
        t.CancellablePromise.all = function (B) {
          var m = Promise.all(B);
          return r(m, function () {
            B.forEach(function (d) {
              d.cancel && d.cancel();
            });
          });
        };
      })("undefined" === typeof self ? void 0 : self);
    },
    function (v, z, u) {
      (function (t, r) {
        function B(n) {
          "@babel/helpers - typeof";
          return (
            (B =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (f) {
                    return typeof f;
                  }
                : function (f) {
                    return f &&
                      "function" == typeof Symbol &&
                      f.constructor === Symbol &&
                      f !== Symbol.prototype
                      ? "symbol"
                      : typeof f;
                  }),
            B(n)
          );
        }
        function m(n, f) {
          var l = Object.keys(n);
          if (Object.getOwnPropertySymbols) {
            var g = Object.getOwnPropertySymbols(n);
            f &&
              (g = g.filter(function (x) {
                return Object.getOwnPropertyDescriptor(n, x).enumerable;
              }));
            l.push.apply(l, g);
          }
          return l;
        }
        function d(n) {
          for (var f = 1; f < arguments.length; f++) {
            var l = null != arguments[f] ? arguments[f] : {};
            f % 2
              ? m(Object(l), !0).forEach(function (g) {
                  var x = l[g];
                  a: if ("object" === B(g) && null !== g) {
                    var q = g[Symbol.toPrimitive];
                    if (void 0 !== q) {
                      g = q.call(g, "string");
                      if ("object" !== B(g)) break a;
                      throw new TypeError(
                        "@@toPrimitive must return a primitive value."
                      );
                    }
                    g = String(g);
                  }
                  g = "symbol" === B(g) ? g : String(g);
                  g in n
                    ? Object.defineProperty(n, g, {
                        value: x,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                      })
                    : (n[g] = x);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(l))
              : m(Object(l)).forEach(function (g) {
                  Object.defineProperty(
                    n,
                    g,
                    Object.getOwnPropertyDescriptor(l, g)
                  );
                });
          }
          return n;
        }
        var k = u(1);
        (function (n) {
          n.Module = {
            INITIAL_MEMORY: 50331648,
            noExitRuntime: !0,
            devicePixelRatio: 1,
            cur_doc: null,
            cachePtrSize: 0,
            hasBufOwnership: !0,
            loaded: !1,
            initCb: null,
            cachePtr: null,
            cleanupState: null,
            docs: {},
            postEvent: function (f, l, g) {
              Module.workerMessageHandler.send("event", {
                docId: f,
                type: l,
                data: g,
              });
            },
            postProgressiveRenderingStartEvent: function (f, l) {
              Module.postEvent(f, "progressiveRenderingStart", { pageNum: l });
            },
            postPagesUpdatedEvent: function (f, l, g, x) {
              f = { pageDimensions: Module.GetPageDimensions(f) };
              if (g)
                for (var q = 0; q < g.length; ++q)
                  g[q] in f.pageDimensions
                    ? ((f.pageDimensions[g[q]].contentChanged = !0),
                      x && (f.pageDimensions[g[q]].annotationsUnchanged = !0))
                    : console.warn("Invalid Page Number ".concat(g[q]));
              Module.postEvent(l, "pagesUpdated", f);
              return f;
            },
            postPagesRenamedEvent: function (f, l) {
              var g = {};
              f = Module.PDFDocGetPageIterator(f, 1);
              for (var x = 1; Module.IteratorHasNext(f); ++x) {
                var q = Module.stackSave(),
                  p = Module.IteratorCurrent(f);
                g[x] = Module.PageGetId(p);
                Module.IteratorNext(f);
                Module.stackRestore(q);
              }
              Module.postEvent(l, "pagesRenamed", { pageNumToId: g });
            },
            GetIndividualPageDimensions: function (f, l, g) {
              f = Module.PageGetPageInfo(g);
              f.id = Module.PageGetId(g);
              return f;
            },
            GetPageDimensionsRange: function (f, l, g) {
              for (
                var x = {}, q = Module.PDFDocGetPageIterator(f, l);
                l < g && Module.IteratorHasNext(q);
                ++l
              ) {
                var p = Module.stackSave(),
                  y = Module.IteratorCurrent(q);
                x[l] = this.GetIndividualPageDimensions(f, l, y);
                Module.IteratorNext(q);
                Module.stackRestore(p);
              }
              return x;
            },
            GetPageDimensionsContentChangedList: function (f, l) {
              l.sort(function (H, G) {
                return H - G;
              });
              for (
                var g = {},
                  x = l[0],
                  q = l[l.length - 1],
                  p = 0,
                  y = Module.PDFDocGetPageIterator(f, x);
                x <= q && Module.IteratorHasNext(y);
                ++x
              ) {
                if (l[p] == x) {
                  for (++p; l[p] == x; ) ++p;
                  var E = Module.stackSave(),
                    C = Module.IteratorCurrent(y);
                  C = this.GetIndividualPageDimensions(f, x, C);
                  C.contentChanged = !0;
                  g[x] = C;
                  Module.stackRestore(E);
                }
                Module.IteratorNext(y);
              }
              return g;
            },
            GetPageDimensions: function (f) {
              try {
                var l = Module.stackSave();
                var g = Module.GetPageCount(f);
                if (0 === g) throw "This document has no pages.";
                return Module.GetPageDimensionsRange(f, 1, g + 1);
              } finally {
                Module.stackRestore(l);
              }
            },
            loadDoc: function (f, l) {
              "undefined" === typeof Module && this._main();
              var g = null;
              try {
                var x = Module.stackSave();
                f.customHandlerId &&
                  Module._TRN_PDFNetAddPDFTronCustomHandler(f.customHandlerId);
                l = Module.CreateDoc(f, l);
                var q = Module.GetDoc(l);
                if (Module.PDFDocInitSecurityHandler(q))
                  return {
                    docId: l,
                    pageDimensions: Module.GetPageDimensions(q),
                  };
                g = {
                  type: "NeedsPassword",
                  errorData: { docId: l },
                  message: "This document requires a password",
                };
              } catch (p) {
                g = { type: "InvalidPDF", message: p };
              } finally {
                Module.stackRestore(x);
              }
              throw g;
            },
            loadCanvas: function (f, l, g, x, q, p, y, E) {
              return new Promise(function (C, H) {
                var G = Module.GetDoc(f),
                  I = l + 1,
                  a = function () {
                    C(Module.RasterizePage(G, I, g, x, p, q, y, E, f));
                  },
                  b = Module.docs[f].chunkStorage;
                if (b) {
                  var c = Module.GetDownloadData(G).downloader,
                    h = b.getRequiredChunkOffsetArrays(c, I);
                  b.keepChunks(h.have);
                  c = function () {
                    var e = b.getChunks(h.missing);
                    Module.loadPromise = e
                      .then(function () {
                        var w = Module.loadPromise.cancelled;
                        Module.loadPromise = null;
                        w || a();
                      })
                      ["catch"](function (w) {
                        "cancelled" !== w ? H(w) : (Module.loadPromise = null);
                      });
                  };
                  Module.loadPromise ? Module.loadPromise.then(c, c) : c();
                } else a();
              });
            },
            loadResources: function (f, l) {
              Module.Initialize(l);
              Object(k.b)("worker", "PDFNet initialized!");
              Module._TRN_PDFNetSetDefaultDiskCachingEnabled(!1);
              f = new Uint8Array(f);
              Module.PDFNetSetResourceData(f);
            },
            onRuntimeInitialized: function () {
              "undefined" === typeof Module &&
                (("undefined" !== typeof window ? window : self).Module = {});
              (function (f) {
                f.PDFDocExportXFDF = function (l, g) {
                  l = Module.GetDoc(l);
                  var x = Module.stackSave();
                  try {
                    var q = g
                      ? Module.PDFDocFDFExtract(l, g)
                      : Module.PDFDocFDFExtract(l);
                    var p = Module.FDFDocSaveAsXFDF(q);
                    Module.stackRestore(x);
                  } catch (y) {
                    throw (Module.stackRestore(x), y);
                  }
                  return p;
                };
                f.PageArrayToPageSet = function (l) {
                  var g = Module.stackSave();
                  try {
                    var x = Module.PageSetCreate();
                    for (var q = 0; q < l.length; ++q)
                      Module.PageSetAddPage(x, l[q]);
                    Module.stackRestore(g);
                  } catch (p) {
                    throw (Module.stackRestore(g), p);
                  }
                  return x;
                };
                f.cancelCurrent = function () {
                  var l = Module.loadPromise;
                  return l
                    ? (l.cancel(), (l.cancelled = !0))
                    : (l = Module.cleanupState)
                    ? (t(l.timeout),
                      l.cleanupArr.reverse().forEach(function (g) {
                        g();
                      }),
                      (Module.cleanupState = null),
                      !0)
                    : !1;
                };
                f.SetWorkerRestartCallback = function (l) {
                  Module.workerRestartCallback = l;
                };
                f.XFDFMerge = function (l, g, x) {
                  if (g) {
                    var q = Module.GetDoc(l),
                      p = [];
                    try {
                      Object(k.b)(
                        "worker",
                        "Merge XFDF of length ".concat(g.length)
                      );
                      var y = Module.GetUStringFromJSString(g, !0);
                      p.push(function () {
                        Module.UStringDestroy(y);
                      });
                      var E = Module.allocate(4, "i8", Module.ALLOC_STACK);
                      REX(Module._TRN_FDFDocCreateFromXFDF(y, E));
                      var C = Module.getValue(E, "i8*");
                      p.push(function () {
                        Module.FDFDocDestroy(C);
                      });
                      var H = Module.PDFDocFDFUpdate(q, C, x);
                      H &&
                        H.length &&
                        Module.postEvent(l, "apRefChanged", {
                          apRefChanges: H,
                        });
                    } finally {
                      p.reverse().forEach(function (G) {
                        G();
                      });
                    }
                  }
                };
                f.MergeXFDF = function (l, g, x) {
                  return new Promise(function (q, p) {
                    var y = [];
                    try {
                      var E = Module.stackSave();
                      y[y.length] = function () {
                        Module.stackRestore(E);
                      };
                      Module.XFDFMerge(l, g, x);
                      y.forEach(function (C) {
                        C();
                      });
                      q({});
                    } catch (C) {
                      y.forEach(function (H) {
                        H();
                      }),
                        p(C);
                    }
                  });
                };
                f.CreateBufferFile = function (l, g, x) {
                  Module.MakeDev(l);
                  var q = new ArrayBuffer(g);
                  q = new Uint8Array(q);
                  x = x ? 0 : 255;
                  for (var p = 0; p < g; ++p) q[p] = x;
                  Module.docs[l] = { buffer: q };
                };
                f.ReadBufferFile = function (l, g) {
                  var x = Module.docs[l].buffer;
                  g &&
                    (Module.docs[l].buffer = new Uint8Array(x.buffer.slice(0)));
                  return x;
                };
                f.RemoveBufferFile = function (l) {
                  Module.docs[l] = null;
                };
                f.SaveHelper = function (l, g, x) {
                  x = "undefined" === typeof x ? 2 : x;
                  Module.MakeDev(g);
                  var q = Module._TRN_PDFDocSave(
                    l,
                    Module.GetUStringFromJSString(g),
                    x,
                    0
                  );
                  Module.docs[g].sink = null;
                  REX(q);
                  x & 16 && Module.postPagesRenamedEvent(l, g);
                  return Module.docs[g].buffer.buffer;
                };
                f.SaveDoc = function (l, g, x, q, p, y, E, C, H) {
                  return new Promise(function (G, I) {
                    var a = [];
                    try {
                      var b = Module.GetDoc(l),
                        c = Module.stackSave();
                      a[a.length] = function () {
                        Module.stackRestore(c);
                      };
                      Module.XFDFMerge(l, g, E);
                      var h = Module.allocate(8, "i8", Module.ALLOC_STACK),
                        e = Module.allocate(
                          Module.intArrayFromString(
                            '{"UseNonStandardRotation": true}'
                          ),
                          "i8",
                          Module.ALLOC_STACK
                        );
                      Module.setValue(h, e, "i8*");
                      Module.setValue(h + 4, 0, "i32");
                      Module._TRN_PDFDocRefreshAnnotAppearances(b, h);
                      if (y) {
                        h = function (O) {
                          O = new Uint8Array(O);
                          n.FS.writeFile("watermarkFile", O);
                          O = Module.ImageCreateFromFile(
                            b,
                            Module.GetUStringFromJSString("watermarkFile")
                          );
                          n.FS.unlink("watermarkFile");
                          return O;
                        };
                        var w = Module.ElementBuilderCreate();
                        a.push(function () {
                          Module.ElementBuilderDestroy(w);
                        });
                        var D = Module.ElementWriterCreate();
                        a.push(function () {
                          Module.ElementWriterDestroy(D);
                        });
                        try {
                          if (!y.hasOwnProperty("default"))
                            throw Error(
                              "Watermark dictionary has no 'default' key!"
                            );
                          var A = h(y["default"]),
                            F = Module.PDFDocGetPageIterator(b, 1);
                          for (e = -1; Module.IteratorHasNext(F); ) {
                            var J = Module.IteratorCurrent(F);
                            Module.IteratorNext(F);
                            e++;
                            var L = e.toString();
                            try {
                              var K = void 0;
                              if (y.hasOwnProperty(L)) {
                                var N = y[L];
                                if (N) K = h(N);
                                else continue;
                              } else K = A;
                              var M = Module.PageGetPageInfo(J),
                                Q = Module.ElementBuilderCreateImage(
                                  w,
                                  K,
                                  0,
                                  0,
                                  M.width,
                                  M.height
                                );
                              Module.ElementWriterBegin(D, J);
                              Module.ElementWriterWritePlacedElement(D, Q);
                              Module.ElementWriterEnd(D);
                            } catch (O) {
                              console.warn(
                                "Watermark for page " +
                                  L +
                                  "can not be added due to error: " +
                                  O
                              );
                            }
                          }
                        } catch (O) {
                          console.warn(
                            "Watermarks can not be added due to error: " + O
                          );
                        }
                      }
                      if (C) {
                        var R = Module.SecurityHandlerCreate(H);
                        R &&
                          (Module.SecurityHandlerChangeUserPasswordUString(
                            R,
                            C
                          ),
                          Module.PDFDocSetSecurityHandler(b, R));
                      }
                      A = 0;
                      if (q) {
                        var P = Module.PDFDocGetRoot(b);
                        (A = Module.ObjFindObj(P, "OpenAction")) &&
                          Module.ObjPut(P, "__OpenActionBackup__", A);
                        var S = Module.ObjPutDict(P, "OpenAction");
                        Module.ObjPutName(S, "Type", "Action");
                        Module.ObjPutName(S, "S", "JavaScript");
                        Module.ObjPutString(S, "JS", "this.print()");
                      }
                      var T = Module.SaveHelper(b, l, p);
                      q &&
                        (A
                          ? Module.ObjPut(
                              P,
                              "OpenAction",
                              Module.ObjFindObj(P, "__OpenActionBackup__")
                            )
                          : Module.ObjErase(P, "OpenAction"));
                      a.reverse().forEach(function (O) {
                        O();
                      });
                      if (x) G({ fileData: T });
                      else {
                        var U = T.slice(0);
                        G({ fileData: U });
                      }
                    } catch (O) {
                      a.reverse().forEach(function (V) {
                        V();
                      }),
                        I(O);
                    }
                  });
                };
                f.SaveDocFromFixedElements = function (l, g, x, q, p, y) {
                  l = Module.PDFDocCreateFromLayoutEls(l);
                  l = Module.CreateDoc({ type: "ptr", value: l });
                  return Module.SaveDoc(l, g, !0, !1, x, q, p, y);
                };
                f.GetCurrentCanvasData = function (l) {
                  var g = Module.currentRenderData;
                  if (!g) return null;
                  l && REX(Module._TRN_PDFRasterizerUpdateBuffer(g.rast));
                  var x = Date.now();
                  if (g.bufPtr) {
                    l = new Uint8Array(new ArrayBuffer(g.buf_size));
                    for (var q = 0, p = 0; p < g.out_height; ++p)
                      for (
                        var y = g.bufPtr + g.stride * p, E = 0;
                        E < g.out_width;
                        ++E
                      )
                        (l[q++] = Module.HEAPU8[y + 2]),
                          (l[q++] = Module.HEAPU8[y + 1]),
                          (l[q++] = Module.HEAPU8[y]),
                          (l[q++] = Module.HEAPU8[y + 3]),
                          (y += 4);
                  } else l = Module.ReadBufferFile("b", l);
                  Object(k.b)(
                    "bufferTiming",
                    "Copy took ".concat(Date.now() - x)
                  );
                  return {
                    pageBuf: l.buffer,
                    pageWidth: g.out_width,
                    pageHeight: g.out_height,
                  };
                };
                f.RasterizePage = function (l, g, x, q, p, y, E, C, H) {
                  return new Promise(function (G, I) {
                    Module.currentRenderData = {};
                    var a = Module.currentRenderData;
                    a.out_width = parseInt(x, 10);
                    a.out_height = parseInt(q, 10);
                    var b = [];
                    b.push(function () {
                      Module.currentRenderData = null;
                    });
                    try {
                      var c = Module.stackSave();
                      b[b.length] = function () {
                        Module.stackRestore(c);
                      };
                      var h = Module.GetPage(l, g),
                        e = Module.PageGetPageWidth(h),
                        w = Module.PageGetPageHeight(h);
                      a.stride = 4 * a.out_width;
                      a.buf_size = a.out_width * a.out_height * 4;
                      Object(k.b)("Memory", "Created rasterizer");
                      a.rast = Module.PDFRasterizerCreate();
                      b.push(function () {
                        Object(k.b)("Memory", "Destroyed rasterizer");
                        Module._TRN_PDFRasterizerDestroy(a.rast);
                      });
                      if (E) {
                        var D = Module.EMSCreateUpdatedLayersContext(l, E);
                        0 !== D &&
                          (REX(
                            Module._TRN_PDFRasterizerSetOCGContext(a.rast, D)
                          ),
                          b.push(function () {
                            Module._TRN_OCGContextDestroy(D);
                          }));
                      }
                      var A = !1;
                      C.hasOwnProperty("renderAnnots")
                        ? (C.renderAnnots && (A = !0),
                          REX(
                            Module._TRN_PDFRasterizerSetDrawAnnotations(
                              a.rast,
                              C.renderAnnots ? 1 : 0
                            )
                          ))
                        : REX(
                            Module._TRN_PDFRasterizerSetDrawAnnotations(
                              a.rast,
                              0
                            )
                          );
                      C.hasOwnProperty("highlightFields") &&
                        (C.highlightFields && (A = !0),
                        REX(
                          Module._TRN_PDFRasterizerSetHighlightFields(
                            a.rast,
                            C.highlightFields
                          )
                        ));
                      C.hasOwnProperty("antiAliasing") &&
                        REX(
                          Module._TRN_PDFRasterizerSetAntiAliasing(
                            a.rast,
                            C.antiAliasing
                          )
                        );
                      C.hasOwnProperty("pathHinting") &&
                        REX(
                          Module._TRN_PDFRasterizerSetPathHinting(
                            a.rast,
                            C.pathHinting
                          )
                        );
                      if (C.hasOwnProperty("thinLinePixelGridFit")) {
                        var F = !0;
                        C.hasOwnProperty("thinLineStrokeAdjust") &&
                          (F = C.thinLineStrokeAdjust);
                        REX(
                          Module._TRN_PDFRasterizerSetThinLineAdjustment(
                            a.rast,
                            C.thinLinePixelGridFit,
                            F
                          )
                        );
                      } else C.hasOwnProperty("thinLineStrokeAdjust") && REX(Module._TRN_PDFRasterizerSetThinLineAdjustment(a.rast, !1, C.thinLineStrokeAdjust));
                      C.hasOwnProperty("thinLineScaling") &&
                        REX(
                          Module._TRN_PDFRasterizerSetThinLineScaling(
                            a.rast,
                            C.thinLineScaling
                          )
                        );
                      if (
                        C.hasOwnProperty("nightModeTuningContrast") ||
                        C.hasOwnProperty("nightModeTuningSaturation") ||
                        C.hasOwnProperty("nightModeTuningFlipness")
                      ) {
                        var J = C.hasOwnProperty("nightModeTuningContrast")
                            ? C.nightModeTuningContrast
                            : 0.9,
                          L = C.hasOwnProperty("nightModeTuningSaturation")
                            ? C.nightModeTuningSaturation
                            : 0.8,
                          K = C.hasOwnProperty("nightModeTuningFlipness")
                            ? C.nightModeTuningFlipness
                            : 1;
                        REX(
                          Module._TRN_PDFRasterizerSetNightModeTuning(
                            a.rast,
                            J,
                            L,
                            K
                          )
                        );
                      }
                      C.hasOwnProperty("imageSmoothing")
                        ? ((F = !1),
                          C.hasOwnProperty("hqImageResampling") &&
                            (F = C.hqImageResampling),
                          REX(
                            Module._TRN_PDFRasterizerSetImageSmoothing(
                              a.rast,
                              C.imageSmoothing,
                              F
                            )
                          ))
                        : C.hasOwnProperty("hqImageResampling") &&
                          REX(
                            Module._TRN_PDFRasterizerSetImageSmoothing(
                              a.rast,
                              !0,
                              C.hqImageResampling
                            )
                          );
                      C.hasOwnProperty("caching") &&
                        REX(
                          Module._TRN_PDFRasterizerSetCaching(a.rast, C.caching)
                        );
                      C.hasOwnProperty("expGamma") &&
                        REX(
                          Module._TRN_PDFRasterizerSetGamma(a.rast, C.expGamma)
                        );
                      C.hasOwnProperty("isPrinting") &&
                        (C.isPrinting && (A = !0),
                        REX(
                          Module._TRN_PDFRasterizerSetPrintMode(
                            a.rast,
                            C.isPrinting
                          )
                        ));
                      C.hasOwnProperty("colorPostProcessMode") &&
                        (C.colorPostProcessMode && (A = !0),
                        REX(
                          Module._TRN_PDFRasterizerSetColorPostProcessMode(
                            a.rast,
                            C.colorPostProcessMode
                          )
                        ));
                      var N = Module.PageGetRotation(h);
                      F = 1 === y || 3 === y;
                      N = (1 === N || 3 === N) !== F;
                      var M = Module.allocate(48, "i8", Module.ALLOC_STACK);
                      if (p) {
                        p.x1 = p[0];
                        p.y1 = p[1];
                        p.x2 = p[2];
                        p.y2 = p[3];
                        var Q = Module.PageGetDefaultMatrix(h, 0),
                          R = Module.Matrix2DInverse(Q);
                        p = Module.Matrix2DMultBBox(R, p);
                        if (p.x2 < p.x1) {
                          var P = p.x1;
                          p.x1 = p.x2;
                          p.x2 = P;
                        }
                        p.y2 < p.y1 && ((P = p.y1), (p.y1 = p.y2), (p.y2 = P));
                        var S = a.out_width / (N ? p.y2 - p.y1 : p.x2 - p.x1);
                        var T = Module.GetDefaultMatrixBox(h, p, y);
                      } else (T = Module.PageGetDefaultMatrix(h, y)), (S = a.out_width / (F ? w : e));
                      Module.Matrix2DSet(M, S, 0, 0, S, 0, 0);
                      Module.Matrix2DConcat(M, T);
                      var U = Module.allocate(4, "i8", Module.ALLOC_STACK),
                        O = Module.allocate(4, "i8", Module.ALLOC_STACK);
                      A
                        ? ((a.bufPtr = Module._malloc(a.buf_size)),
                          Module._memset(
                            a.bufPtr,
                            C.pageTransparent ? 0 : 255,
                            a.buf_size
                          ),
                          b.push(function () {
                            Module._free(a.bufPtr);
                          }))
                        : (Module.CreateBufferFile(
                            "b",
                            a.buf_size,
                            C.pageTransparent
                          ),
                          b.push(function () {
                            Module.RemoveBufferFile("b");
                          }));
                      var V = C.overprintMode;
                      if (10 === V) {
                        REX(Module._TRN_PDFRasterizerSetOverprint(a.rast, 1));
                        var Z = Module.PDFRasterizerRasterizeSeparations(
                          a.rast,
                          h,
                          a.out_width,
                          a.out_height,
                          M,
                          0,
                          0
                        );
                        G({
                          pageBuf: Z,
                          pageWidth: a.out_width,
                          pageHeight: a.out_height,
                        });
                      } else {
                        REX(Module._TRN_PDFRasterizerSetOverprint(a.rast, V));
                        A
                          ? REX(
                              Module._TRN_PDFRasterizerGetChunkRenderer(
                                a.rast,
                                h,
                                a.bufPtr,
                                a.out_width,
                                a.out_height,
                                a.stride,
                                4,
                                !0,
                                M,
                                0,
                                0,
                                0,
                                U
                              )
                            )
                          : REX(
                              Module._TRN_PDFRasterizerGetChunkRendererPath(
                                a.rast,
                                h,
                                Module.GetUStringFromJSString("b"),
                                a.out_width,
                                a.out_height,
                                !0,
                                M,
                                0,
                                0,
                                0,
                                U
                              )
                            );
                        var Y = Module.getValue(U, "i8*");
                        b.push(function () {
                          REX(Module._TRN_ChunkRendererDestroy(Y));
                        });
                      }
                      var aa = new Date().getTime();
                      C.useProgress &&
                        Module.postProgressiveRenderingStartEvent(H, g);
                      var da = r(function W() {
                        try {
                          if (
                            (REX(
                              Module._TRN_ChunkRendererRenderForTimePeriod(
                                Y,
                                200,
                                O
                              )
                            ),
                            Module.getValue(O, "i8"))
                          )
                            Module.cleanupState.timeout = r(W);
                          else {
                            var ba = Module.GetCurrentCanvasData(!1);
                            console.log("data=",ba);
                            Object(k.b)(
                              "worker",
                              "Total Page Time ".concat(
                                new Date().getTime() - aa
                              )
                            );
                            b.reverse().forEach(function (X) {
                              X();
                            });
                            G(ba);
                          }
                        } catch (X) {
                          b.reverse().forEach(function (ca) {
                            ca();
                          }),
                            I(X);
                        }
                      });
                      Module.cleanupState = { cleanupArr: b, timeout: da };
                      b.push(function () {
                        Module.cleanupState = null;
                      });
                    } catch (ea) {
                      b.reverse().forEach(function (W) {
                        W();
                      }),
                        I(ea);
                    }
                  });
                };
                f.UpdatePassword = function (l, g) {
                  try {
                    var x = Module.stackSave();
                    var q = Module.GetDoc(l);
                    return Module.PDFDocInitStdSecurityHandler(q, g)
                      ? (q in downloadDataMap &&
                          REX(
                            Module._TRN_PDFDocDownloaderInitialize(
                              q,
                              downloadDataMap[q].downloader
                            )
                          ),
                        {
                          success: !0,
                          pageDimensions: Module.GetPageDimensions(q),
                        })
                      : { success: !1 };
                  } finally {
                    Module.stackRestore(x);
                  }
                };
                f.UpdateCustomHeader = function (l, g) {
                  Module.customHeadersMap[l] =
                    l in Module.customHeadersMap
                      ? d(d({}, Module.customHeadersMap[l]), g)
                      : g;
                };
                f.TriggerFullDownload = function (l) {
                  return new Promise(function (g, x) {
                    var q = Module.GetDoc(l);
                    try {
                      q in downloadDataMap &&
                        REX(
                          Module.PDFDocDownloaderTriggerFullDownload(
                            q,
                            downloadDataMap[q].downloader
                          )
                        ),
                        g({});
                    } catch (p) {
                      x(p);
                    }
                  });
                };
                f.InsertBlankPages = function (l, g, x, q) {
                  return new Promise(function (p, y) {
                    var E = [],
                      C = Module.GetDoc(l);
                    try {
                      var H = Module.stackSave();
                      E[E.length] = function () {
                        Module.stackRestore(H);
                      };
                      for (var G = g.length - 1; 0 <= G; --G) {
                        var I = Module.PDFDocGetPageIterator(C, g[G]),
                          a = Module.PDFDocPageCreate(C, x, q);
                        Module.PDFDocPageInsert(C, I, a);
                      }
                      var b = Module.postPagesUpdatedEvent(C, l);
                      E.forEach(function (c) {
                        c();
                      });
                      p(b);
                    } catch (c) {
                      E.forEach(function (h) {
                        h();
                      }),
                        y(c);
                    }
                  });
                };
                f.InsertPages = function (l, g, x, q, p, y) {
                  return new Promise(function (E, C) {
                    var H = [],
                      G = Module.GetDoc(l);
                    try {
                      var I = Module.stackSave();
                      H[H.length] = function () {
                        Module.stackRestore(I);
                      };
                      if (g instanceof ArrayBuffer) {
                        var a = Module.CreateDoc(g);
                        var b = Module.GetDoc(a);
                        H[H.length] = function () {
                          Module.DeleteDoc(a);
                        };
                      } else b = Module.GetDoc(g);
                      for (
                        var c = x.length, h = Module.PageSetCreate(), e = 0;
                        e < c;
                        ++e
                      )
                        Module.PageSetAddPage(h, x[e]);
                      y
                        ? Module.PDFDocInsertPages2(G, q, b, h, p)
                        : Module.PDFDocInsertPages(G, q, b, h, p);
                      var w;
                      y || (w = Module.postPagesUpdatedEvent(G, l));
                      H.reverse().forEach(function (D) {
                        D();
                      });
                      E(w);
                    } catch (D) {
                      H.reverse().forEach(function (A) {
                        A();
                      }),
                        C(D);
                    }
                  });
                };
                f.MovePages = function (l, g, x) {
                  return new Promise(function (q, p) {
                    var y = [],
                      E = Module.GetDoc(l);
                    try {
                      var C = Module.stackSave();
                      y[y.length] = function () {
                        Module.stackRestore(C);
                      };
                      for (
                        var H = g.length, G = Module.PageSetCreate(), I = 0;
                        I < H;
                        ++I
                      )
                        Module.PageSetAddPage(G, g[I]);
                      Module.PDFDocMovePages(E, x, G);
                      var a = Module.postPagesUpdatedEvent(E, l);
                      y.forEach(function (b) {
                        b();
                      });
                      q(a);
                    } catch (b) {
                      y.forEach(function (c) {
                        c();
                      }),
                        p(b);
                    }
                  });
                };
                f.RemovePages = function (l, g, x) {
                  return new Promise(function (q, p) {
                    var y = Module.GetDoc(l),
                      E = [];
                    try {
                      var C = Module.stackSave();
                      E[E.length] = function () {
                        Module.stackRestore(C);
                      };
                      for (var H = g.length - 1; 0 <= H; --H) {
                        var G = Module.PDFDocGetPageIterator(y, g[H]);
                        Module.IteratorHasNext(G) &&
                          (x
                            ? Module.PDFDocPageRemove2(y, G)
                            : Module.PDFDocPageRemove(y, G));
                      }
                      var I;
                      x || (I = Module.postPagesUpdatedEvent(y, l));
                      E.forEach(function (a) {
                        a();
                      });
                      q(I);
                    } catch (a) {
                      E.forEach(function (b) {
                        b();
                      }),
                        p(a);
                    }
                  });
                };
                f.RotatePages = function (l, g, x) {
                  return new Promise(function (q, p) {
                    var y = Module.GetDoc(l),
                      E = [];
                    try {
                      var C = Module.stackSave();
                      E[E.length] = function () {
                        Module.stackRestore(C);
                      };
                      var H = g.length,
                        G = 0,
                        I = Module.PDFDocGetPageIterator(y, g[0]),
                        a = [];
                      E.push(function () {
                        Module._TRN_IteratorDestroy(I);
                      });
                      for (
                        var b = g[0];
                        Module.IteratorHasNext(I) && G < g[H - 1];
                        ++b
                      ) {
                        if (b === g[G]) {
                          var c = Module.IteratorCurrent(I),
                            h = (Module.PageGetRotation(c) + x) % 4;
                          Module.PageSetRotation(c, h);
                          a.push(b);
                          G++;
                        }
                        Module.IteratorNext(I);
                      }
                      var e = Module.postPagesUpdatedEvent(y, l, a, !0);
                      E.reverse().forEach(function (w) {
                        w();
                      });
                      q(e);
                    } catch (w) {
                      E.reverse().forEach(function (D) {
                        D();
                      }),
                        p(w);
                    }
                  });
                };
                f.ExtractPages = function (l, g, x, q, p, y) {
                  return new Promise(function (E, C) {
                    var H = [];
                    try {
                      var G = Module.stackSave();
                      H[H.length] = function () {
                        Module.stackRestore(G);
                      };
                      var I = function (c) {
                        H.reverse().forEach(function (h) {
                          h();
                        });
                        C(c);
                      };
                      Module.XFDFMerge(l, x, p);
                      var a = Module.CreateEmptyDoc();
                      H[H.length] = function () {
                        Module.DeleteDoc(a);
                      };
                      var b = Module.InsertPages(a, l, g, 1, !0, y)
                        .then(function () {
                          return Module.SaveDoc(a, void 0, !0, !1, void 0, q);
                        })
                        .then(function (c) {
                          H.reverse().forEach(function (h) {
                            h();
                          });
                          return c;
                        });
                      E(b);
                    } catch (c) {
                      I(c);
                    }
                  });
                };
                f.CropPages = function (l, g, x, q, p, y) {
                  return new Promise(function (E, C) {
                    var H = Module.GetDoc(l),
                      G = [];
                    try {
                      var I = Module.stackSave();
                      G[G.length] = function () {
                        Module.stackRestore(I);
                      };
                      var a = g.length,
                        b = 0,
                        c = Module.PDFDocGetPageIterator(H, g[0]);
                      G.push(function () {
                        Module._TRN_IteratorDestroy(c);
                      });
                      for (
                        var h = [], e = g[0];
                        Module.IteratorHasNext(c) && b < g[a - 1];
                        ++e
                      ) {
                        if (e === g[b]) {
                          var w = Module.IteratorCurrent(c),
                            D = Module.allocate(8, "i8", Module.ALLOC_STACK);
                          REX(Module._TRN_PageGetCropBox(w, D));
                          var A = Module.PageGetRotation(w),
                            F = Module.getValue(D, "double"),
                            J = Module.getValue(D + 8, "double"),
                            L = Module.getValue(D + 16, "double"),
                            K = Module.getValue(D + 24, "double");
                          0 === A % 4
                            ? (Module.setValue(D, F + p, "double"),
                              Module.setValue(D + 8, J + q, "double"),
                              Module.setValue(D + 16, L - y, "double"),
                              Module.setValue(D + 24, K - x, "double"))
                            : 1 === A % 4
                            ? (Module.setValue(D, F + x, "double"),
                              Module.setValue(D + 8, J + p, "double"),
                              Module.setValue(D + 16, L - q, "double"),
                              Module.setValue(D + 24, K - y, "double"))
                            : 2 === A % 4
                            ? (Module.setValue(D, F + y, "double"),
                              Module.setValue(D + 8, J + x, "double"),
                              Module.setValue(D + 16, L - p, "double"),
                              Module.setValue(D + 24, K - q, "double"))
                            : 3 === A % 4 &&
                              (Module.setValue(D, F + q, "double"),
                              Module.setValue(D + 8, J + y, "double"),
                              Module.setValue(D + 16, L - x, "double"),
                              Module.setValue(D + 24, K - p, "double"));
                          Module.setValue(D + 32, 0, "double");
                          REX(Module._TRN_PageSetBox(w, 0, D));
                          REX(Module._TRN_PageSetBox(w, 1, D));
                          h.push(e);
                          b++;
                        }
                        Module.IteratorNext(c);
                      }
                      var N = Module.postPagesUpdatedEvent(H, l, h, !0);
                      G.reverse().forEach(function (M) {
                        M();
                      });
                      E(N);
                    } catch (M) {
                      G.reverse().forEach(function (Q) {
                        Q();
                      }),
                        C(M);
                    }
                  });
                };
              })("undefined" === typeof self ? this.Module : self.Module);
              this.loaded = !0;
              Module.initCb && Module.initCb();
            },
          };
        })(self);
      }.call(this, u(7).clearImmediate, u(7).setImmediate));
    },
    function (v, z, u) {
      (function (t) {
        function r(d) {
          "@babel/helpers - typeof";
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (k) {
                    return typeof k;
                  }
                : function (k) {
                    return k &&
                      "function" == typeof Symbol &&
                      k.constructor === Symbol &&
                      k !== Symbol.prototype
                      ? "symbol"
                      : typeof k;
                  }),
            r(d)
          );
        }
        var B = u(1),
          m = "undefined" !== typeof window ? window : self;
        m.global = m;
        (function (d) {
          d.currentFileString = "/current";
          var k = 0,
            n = 0,
            f = {},
            l = null;
          Module.chunkMax = 200;
          var g = function (a, b, c, h, e) {
              var w = new XMLHttpRequest();
              return CancellablePromise(
                function (D, A) {
                  w.open("GET", a, !0);
                  w.responseType = "arraybuffer";
                  w.onerror = function () {
                    A("Network error occurred");
                  };
                  w.onload = function () {
                    if (206 === this.status && w.response.byteLength === c) {
                      var J = new Int8Array(w.response);
                      D(J);
                    } else A("Download Failed");
                  };
                  var F = ["bytes=", b, "-", b + c - 1].join("");
                  w.setRequestHeader("Range", F);
                  e && (w.withCredentials = e);
                  h &&
                    Object.keys(h).forEach(function (J) {
                      w.setRequestHeader(J, h[J]);
                    });
                  w.send();
                },
                function () {
                  w.abort();
                }
              );
            },
            x = function (a) {
              this.maxChunkNum = a;
              this.lruList = [];
              this.chunkMap = {};
            };
          x.prototype = {
            has: function (a) {
              return a in this.chunkMap;
            },
            insert: function (a, b) {
              this.lruList.length >= this.maxChunkNum &&
                (delete this.chunkMap[this.lruList[0]], this.lruList.shift());
              this.lruList.push(b);
              this.chunkMap[b] = a;
            },
            get: function (a) {
              var b = this.lruList.lastIndexOf(a);
              0 <= b && this.lruList.splice(b, 1);
              this.lruList.push(a);
              return this.chunkMap[a];
            },
          };
          var q = function (a) {
            this.file = a;
            this.filePosition = 0;
            this.fileLength = a.size;
            this.chunkSize = 1048576;
            this.chunkCache = new x(8);
            this.reader = new FileReaderSync();
          };
          q.prototype = {
            read: function (a, b, c) {
              c =
                this.filePosition + c <= this.fileLength
                  ? c
                  : this.fileLength - this.filePosition;
              a = a.subarray(b, b + c);
              b = c;
              for (
                var h = this.filePosition % this.chunkSize,
                  e = this.filePosition - h,
                  w = 0;
                0 < c;

              ) {
                if (this.chunkCache.has(e)) var D = this.chunkCache.get(e);
                else
                  (D = new Int8Array(
                    this.reader.readAsArrayBuffer(
                      this.file.slice(e, e + this.chunkSize)
                    )
                  )),
                    this.chunkCache.insert(D, e);
                var A = D.length,
                  F = h + c;
                F <= A
                  ? (a.set(D.subarray(h, F), w),
                    (this.filePosition += c),
                    (c = 0))
                  : (a.set(D.subarray(h), w),
                    (this.filePosition += A - h),
                    (h = 0),
                    (e = this.filePosition),
                    (c = F - A),
                    (w = b - c));
              }
              return b;
            },
            seek: function (a) {
              this.filePosition = a;
            },
            close: function () {
              this.reader = this.file = null;
            },
            getPos: function () {
              return this.filePosition;
            },
            getTotalSize: function () {
              return this.fileLength;
            },
          };
          var p = function (a) {
            this.data = a;
            this.position = 0;
            this.length = this.data.length;
          };
          p.prototype = {
            read: function (a, b, c) {
              c =
                this.position + c <= this.length
                  ? c
                  : this.length - this.position;
              a = a.subarray(b, b + c);
              b = this.data.subarray(this.position, this.position + c);
              a.set(b);
              this.position += c;
              return c;
            },
            write: function (a, b, c) {
              c =
                this.position + c <= this.length
                  ? c
                  : this.length - this.position;
              a = a.subarray(b, b + c);
              this.data.subarray(this.position, this.position + c).set(a);
              this.position += c;
              return c;
            },
            seek: function (a) {
              this.position = a;
            },
            close: function () {
              this.data = null;
            },
            getPos: function () {
              return this.position;
            },
            getTotalSize: function () {
              return this.length;
            },
          };
          var y = function (a, b, c, h, e) {
            "object" === r(a)
              ? ((this.lruList = a.lruList),
                (this.chunkMap = a.chunkMap),
                (this.length = a.length),
                (this.url = a.url),
                (this.customHeaders = a.customHeaders),
                (this.withCredentials = a.withCredentials))
              : ((this.lruList = []),
                (this.chunkMap = {}),
                (this.chunkMap[b] = e),
                (this.length = b),
                (this.url = a),
                (this.customHeaders = c),
                (this.withCredentials = h));
          };
          y.prototype = {
            lruUpdate: function (a) {
              var b = this.lruList.lastIndexOf(a);
              0 <= b && this.lruList.splice(b, 1);
              this.lruList.push(a);
            },
            getChunk: function (a) {
              var b = this;
              if (this.chunkMap[a]) this.lruUpdate(a);
              else {
                var c = Math.min(a + 1048576, this.length) - 1,
                  h = new XMLHttpRequest();
                h.open("GET", this.url, !1);
                h.responseType = "arraybuffer";
                h.setRequestHeader("Range", ["bytes=", a, "-", c].join(""));
                this.withCredentials &&
                  (h.withCredentials = this.withCredentials);
                this.customHeaders &&
                  Object.keys(this.customHeaders).forEach(function (e) {
                    h.setRequestHeader(e, b.customHeaders[e]);
                  });
                h.send();
                if (200 === h.status || 206 === h.status)
                  this.writeChunk(new Int8Array(h.response), a);
                else throw Error("Failed to load data from");
              }
              return this.chunkMap[a];
            },
            hadChunk: function (a) {
              return a in this.chunkMap;
            },
            hasChunk: function (a) {
              return this.chunkMap[a];
            },
            getCacheData: function () {
              return this.chunkMap[this.length];
            },
            getRequiredChunkOffsetArrays: function (a, b) {
              var c = { have: [], downloading: [], missing: [] };
              try {
                var h = Module.stackSave();
                var e = Module.allocate(4, "i8", Module.ALLOC_STACK);
                REX(Module._TRN_DownloaderGetRequiredChunksSize(a, b, e));
                var w = Module.getValue(e, "i8*");
                if (w) {
                  var D = Module._malloc(4 * w);
                  REX(Module._TRN_DownloaderGetRequiredChunks(a, b, D, w));
                  for (a = 0; a < w; ++a) {
                    var A = Module.getValue(D + 4 * a, "i8*");
                    this.hasChunk(A)
                      ? c.have.push(A)
                      : this.hadChunk(A)
                      ? c.missing.push(A)
                      : c.downloading.push(A);
                  }
                }
              } finally {
                D && Module._free(D), Module.stackRestore(h);
              }
              return c;
            },
            keepVisibleChunks: function (a, b) {
              for (
                var c = b.length, h = Module.chunkMax / 2, e = 0, w = 0;
                w < c;
                ++w
              ) {
                var D = this.getRequiredChunkOffsetArrays(a, b[w]),
                  A = D.have,
                  F = A.length;
                e += F;
                if (e > h) {
                  this.keepChunks(A.slice(0, F - e + h));
                  break;
                }
                this.keepChunks(D.have);
              }
            },
            getChunkAsync: function (a) {
              var b = this,
                c = a + 1048576,
                h = 1048576;
              c > this.length && (h -= c - this.length);
              return g(
                this.url,
                a,
                h,
                this.customHeaders,
                this.withCredentials
              ).then(function (e) {
                b.writeChunk(e, a);
              });
            },
            getChunks: function (a) {
              for (var b = a.length, c = Array(b), h = 0; h < b; ++h)
                c[h] = this.getChunkAsync(a[h]);
              return CancellablePromise.all(c);
            },
            keepChunks: function (a) {
              for (var b = a.length, c = 0; c < b; ++c) this.lruUpdate(a[c]);
            },
            writeChunk: function (a, b, c) {
              c = c || 0;
              var h = this.chunkMap[b],
                e = a.length,
                w = this.lruList.length >= Module.chunkMax && !h;
              1048576 !== e || a.buffer.byteLength !== e
                ? (w
                    ? ((h = this.lruList.shift()),
                      (w = this.chunkMap[h]),
                      1048576 > w.length && (w = new Int8Array(1048576)),
                      (this.chunkMap[h] = null))
                    : (w = h ? this.chunkMap[b] : new Int8Array(1048576)),
                  w.subarray(c, c + e).set(a),
                  (a = w))
                : w && ((h = this.lruList.shift()), (this.chunkMap[h] = null));
              this.lruUpdate(b);
              this.chunkMap[b] = a;
            },
          };
          var E = function (a) {
            this.chunkStorage = a;
            this.position = 0;
            this.length = this.chunkStorage.length;
          };
          E.prototype = {
            read: function (a, b, c) {
              var h = this.position + c <= this.length,
                e = h ? c : this.length - this.position;
              if (this.position < this.length) {
                var w;
                for (w = 0; w < e; ) {
                  var D = this.position % 1048576;
                  var A = this.position - D;
                  var F = e - w,
                    J = a.subarray(b + w, b + w + F);
                  if (this.chunkStorage.hadChunk(A))
                    (A = this.chunkStorage.getChunk(A).subarray(D, D + F)),
                      J.set(A),
                      (J = A.length),
                      (w += J),
                      (this.position += J);
                  else for (this.position += F; w < e; ++w) J[w] = 0;
                }
              }
              if (!h) {
                b += e;
                if ((c -= e))
                  (h = this.chunkStorage.getCacheData()),
                    c > h.length && (c = h.length),
                    (w = this.position - this.length),
                    (a = a.subarray(b, b + c)),
                    (A = h.subarray(w, w + c)),
                    a.set(A);
                this.position += c;
                return e + c;
              }
              return e;
            },
            write: function (a, b, c) {
              var h = this.position + c <= this.length,
                e =
                  this.position + c <= this.length
                    ? c
                    : this.length - this.position,
                w = a.subarray(b, b + e),
                D = this.position % 1048576;
              this.chunkStorage.writeChunk(w, this.position - D, D);
              this.position += e;
              if (!h) {
                w = b + e;
                if ((c -= e))
                  (b = this.chunkStorage.getCacheData()),
                    c > b.length && (c = b.length),
                    (h = this.position - this.length),
                    (w = a.subarray(w, w + c)),
                    b.subarray(h, h + c).set(w);
                this.position += c;
                return e + c;
              }
              return e;
            },
            seek: function (a) {
              this.position = a;
            },
            close: function () {
              this.chunkStorage = null;
            },
            getPos: function () {
              return this.position;
            },
            getTotalSize: function () {
              return this.length;
            },
          };
          var C = function (a) {
            this.docId = a;
            this.length = 0;
            this.data = new Int8Array(8192);
            this.position = 0;
          };
          C.prototype = {
            seek: function (a) {
              this.position = a;
            },
            close: function () {
              var a = new Int8Array(this.data.buffer.slice(0, this.length));
              Module.ChangeDocBackend(this.docId, {
                ptr: Module.GetDoc(this.docId),
                buffer: a,
              });
              this.data = null;
            },
            getPos: function () {
              return this.position;
            },
            getTotalSize: function () {
              return this.length;
            },
            read: function (a, b, c) {
              var h = this.data.length;
              c = c + b < h ? c : h - b;
              a = a.subarray(b, b + c);
              b = this.data.subarray(this.position, this.position + c);
              a.set(b);
              this.position += c;
              return c;
            },
            write: function (a, b, c) {
              for (var h = this.position + c, e = this.data.length; h > e; ) {
                e = Math.max(e * (16777216 < e ? 1.5 : 2), h);
                var w = new Int8Array(e);
                w.set(this.data.subarray(0, this.length), 0);
                this.data = w;
              }
              a = a.subarray(b, b + c);
              this.data.set(a, this.position);
              this.position += c;
              this.position > this.length && (this.length = this.position);
              return c;
            },
          };
          var H = {
            IsSink: function (a) {
              return 66 === (a.flags & 255);
            },
            open: function (a) {
              var b = a.path.slice(1);
              this.IsSink(a)
                ? ((a.provider = new C(b)), (Module.docs[b].sink = a.provider))
                : (a.provider = Module.docs[b].sink
                    ? new p(Module.docs[b].sink.data)
                    : Module.docs[b].chunkStorage
                    ? new E(Module.docs[b].chunkStorage)
                    : Module.docs[b].buffer
                    ? new p(Module.docs[b].buffer)
                    : new q(Module.docs[b].file));
            },
            close: function (a) {
              a.provider.close();
            },
            read: function (a, b, c, h, e) {
              return a.provider.read(b, c, h);
            },
            llseek: function (a, b, c) {
              a = a.provider;
              1 === c
                ? (b += a.getPos())
                : 2 === c && (b = a.getTotalSize() + b);
              if (0 > b) throw new FS.ErrnoError(m.ERRNO_CODES.EINVAL);
              a.seek(b);
              return b;
            },
            write: function (a, b, c, h, e) {
              return h ? a.provider.write(b, c, h) : 0;
            },
          };
          m.THROW = function (a) {
            throw { type: "PDFWorkerError", message: a };
          };
          var G = function (a) {
            return "Exception: \n\t Message: "
              .concat(
                d.GetJSStringFromCString(Module._TRN_GetMessage(a)),
                "\n\t Filename: "
              )
              .concat(
                d.GetJSStringFromCString(Module._TRN_GetFileName(a)),
                "\n\t Function: "
              )
              .concat(
                d.GetJSStringFromCString(Module._TRN_GetFunction(a)),
                "\n\t Linenumber: "
              )
              .concat(d.GetJSStringFromCString(Module._TRN_GetLineNum(a)));
          };
          d.GetErrToString = G;
          m.REX = function (a) {
            a && THROW(G(a));
          };
          d.Initialize = function (a) {
            var b = Module.stackSave();
            a = a
              ? Module.allocate(
                  Module.intArrayFromString(a),
                  "i8",
                  Module.ALLOC_STACK
                )
              : 0;
            REX(Module._TRN_PDFNetInitialize(a));
            Module.stackRestore(b);
          };
          d.GetDoc = function (a) {
            if (a in Module.docs) return Module.docs[a].ptr;
            throw {
              type: "InvalidDocReference",
              message: "Unable to access Document id=".concat(
                a,
                ". The document appears to be invalid or was deleted."
              ),
            };
          };
          d.clearDocBackend = function () {
            null !== Module.cachePtr
              ? (Module.hasBufOwnership && Module._free(Module.cachePtr),
                (Module.cachePtr = null))
              : Module.docs[d.currentFileString] &&
                delete Module.docs[d.currentFileString];
          };
          d.MakeDev = function (a) {
            if (!f[a]) {
              var b = FS.makedev(3, 5);
              FS.registerDevice(b, H);
              FS.mkdev(a, 511, b);
              f[a] = !0;
            }
          };
          d.CreateDocFileBackend = function (a, b) {
            Module.MakeDev(b);
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            Module.docs[b] = { file: a };
            a = Module.allocate(
              Module.intArrayFromString(b),
              "i8",
              Module.ALLOC_STACK
            );
            REX(Module._TRN_PDFDocCreateFromFilePath(a, c));
            c = Module.getValue(c, "i8*");
            Module.docs[b].ptr = c;
          };
          d.InsertImageIntoDoc = function (a, b, c) {
            var h = [];
            try {
              var e = Module.ElementBuilderCreate();
              h.push(function () {
                Module.ElementBuilderDestroy(e);
              });
              var w = Module.ElementWriterCreate();
              h.push(function () {
                Module.ElementWriterDestroy(w);
              });
              if (c) {
                var D = c.width;
                var A = c.height;
              } else
                (D = Module.ImageGetImageWidth(b)),
                  (A = Module.ImageGetImageHeight(b)),
                  (c = D / A),
                  c > 612 / 792
                    ? ((D = 612), (A = parseInt(D / c, 10)))
                    : ((A = 792), (D = parseInt(A * c, 10)));
              var F = Module.ElementBuilderCreateImage(e, b, 0, 0, D, A),
                J = Module.PDFDocPageCreate(a, D, A);
              Module.ElementWriterBegin(w, J);
              Module.ElementWriterWritePlacedElement(w, F);
              Module.ElementWriterEnd(w);
              Module.PDFDocPagePushBack(a, J);
            } finally {
              h.reverse().forEach(function (L) {
                L();
              });
            }
          };
          var I = function (a, b, c) {
            "object" === r(a)
              ? ((this.m_pages = a.m_pages),
                (this.m_has_named_dests = a.m_has_named_dests),
                (this.m_finished_download = a.m_finished_download),
                (this.m_has_outline = a.m_has_outline),
                (this.m_current_page = a.m_current_page),
                (this.m_id = a.m_id),
                (this.size = a.size),
                (this.timeout = a.timeout),
                (this.eventPageArray = a.eventPageArray),
                (this.requirePageCallbacks = a.requirePageCallbacks))
              : ((this.m_pages = []),
                (this.m_has_outline =
                  this.m_finished_download =
                  this.m_has_named_dests =
                    !1),
                (this.m_current_page = 1),
                (this.m_id = c),
                (this.size = a),
                (this.timeout = null),
                (this.eventPageArray = []),
                (this.requirePageCallbacks = {}));
            this.downloadUserData = Module.createDownloadUserData(b, c);
          };
          I.prototype = {
            getJSUrl: function () {
              return Module.extractDownloadUserData(this.downloadUserData).url;
            },
            getDocId: function () {
              return Module.extractDownloadUserData(this.downloadUserData)
                .docId;
            },
            destroyUserData: function () {
              this.m_id in Module.withCredentials &&
                delete Module.withCredentials[this.m_id];
              this.m_id in Module.customHeadersMap &&
                delete Module.customHeadersMap[this.m_id];
              Module.destroyDownloadUserData(this.downloadUserData);
            },
          };
          d.createDownloadUserData = function (a, b) {
            a = Module.allocate(
              Module.intArrayFromString(a),
              "i8",
              Module.ALLOC_NORMAL
            );
            var c = Module.allocate(8, "i8", Module.ALLOC_NORMAL);
            Module.setValue(c, a, "i8*");
            Module.setValue(c + 4, parseInt(b, 10), "i32");
            return (this.downloadUserData = c);
          };
          d.extractDownloadUserData = function (a) {
            var b = Module.getValue(a, "i8*");
            b = d.GetJSStringFromCString(b);
            a = Module.getValue(a + 4, "i32").toString();
            return { url: b, docId: a };
          };
          d.destroyDownloadUserData = function (a) {
            Module._free(Module.getValue(a, "i8*"));
            Module._free(a);
          };
          m.downloadDataMap = {};
          Module.customHeadersMap = {};
          Module.withCredentials = {};
          d.GetDownloadData = function (a) {
            if (a in downloadDataMap) return downloadDataMap[a];
          };
          d.DownloaderHint = function (a, b) {
            var c = Module.GetDoc(a),
              h = downloadDataMap[c];
            b.currentPage && (h.m_current_page = b.currentPage);
            if (b.visiblePages) {
              var e = b.visiblePages;
              for (b = 0; b < e.length; ++b) ++e[b];
              Object.keys(h.requirePageCallbacks).forEach(function (D) {
                h.requirePageCallbacks.hasOwnProperty(D) &&
                  e.push(parseInt(D, 10));
              });
              (b = Module.docs[a].chunkStorage) &&
                b.keepVisibleChunks(h.downloader, e);
              a = e.length;
              var w = Module.allocate(4 * a, "i8", Module.ALLOC_STACK);
              for (b = 0; b < a; ++b) Module.setValue(w + 4 * b, e[b], "i32");
              REX(Module._TRN_PDFDocDownloadPages(c, w, a, 1, 0));
            }
          };
          d.RequirePage = function (a, b) {
            return new Promise(function (c, h) {
              h = Module.GetDoc(a);
              var e = downloadDataMap[h];
              !e || e.m_finished_download || e.m_pages[b]
                ? c()
                : (b in e.requirePageCallbacks
                    ? e.requirePageCallbacks[b].push(c)
                    : (e.requirePageCallbacks[b] = [c]),
                  (c = Module.allocate(4, "i8", Module.ALLOC_STACK)),
                  Module.setValue(c, b, "i32"),
                  Module._TRN_PDFDocDownloadPages(h, c, 1, 0, 0));
            });
          };
          d.IsLinearizationValid = function (a) {
            a = Module.GetDoc(a);
            if ((a = downloadDataMap[a])) {
              var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
              REX(Module._TRN_DownloaderIsLinearizationValid(a.downloader, b));
              return 0 !== Module.getValue(b, "i8");
            }
            return !1;
          };
          d.ShouldRunRender = function (a, b) {
            a = Module.GetDoc(a);
            return (a = downloadDataMap[a])
              ? a.m_finished_download
                ? !0
                : a.m_pages[b]
              : !0;
          };
          d.postPagesDownloadedEvent = function (a, b, c) {
            a = {
              pageDimensions: Module.GetPageDimensionsContentChangedList(a, c),
              pageNumbers: c,
            };
            Module.postEvent(b, "pagesDownloaded", a);
            return a;
          };
          d.createCallbacksStruct = function (a) {
            if (!l) {
              var b = function (c) {
                return function (h) {
                  var e = arguments;
                  h in downloadDataMap
                    ? c.apply(this, e)
                    : t(function () {
                        h in downloadDataMap && c.apply(this, e);
                      }, 0);
                };
              };
              l = {
                downloadProc: Module.addFunction(function (c, h, e, w, D) {
                  w = Module.extractDownloadUserData(w);
                  var A = w.docId;
                  g(
                    w.url,
                    h,
                    e,
                    Module.customHeadersMap[A],
                    Module.withCredentials[A]
                  ).then(function (F) {
                    A in Module.docs &&
                      Module.docs[A].chunkStorage &&
                      Module.docs[A].chunkStorage.writeChunk(F, h);
                    Module._TRN_DownloadComplete(0, h, e, c);
                  });
                }, "viiiii"),
                notifyUpdatePage: Module.addFunction(
                  b(function (c, h, e, w) {
                    var D = downloadDataMap[c];
                    D.m_pages[h] = !0;
                    var A = D.eventPageArray;
                    if (h in D.requirePageCallbacks)
                      for (
                        e = D.requirePageCallbacks[h], w = 0;
                        w < e.length;
                        ++w
                      )
                        e[w]();
                    D.timeout
                      ? A.push(h)
                      : ((A = D.eventPageArray = [h]),
                        (D.timeout = setTimeout(function () {
                          Module.postPagesDownloadedEvent(c, D.m_id, A);
                          D.timeout = null;
                        }, 100)));
                  }),
                  "viiii"
                ),
                notifyUpdateOutline: Module.addFunction(
                  b(function (c, h) {
                    c = downloadDataMap[c];
                    c.m_has_outline ||
                      ((c.m_has_outline = !0),
                      Module.postEvent(c.m_id, "bookmarksUpdated", {}));
                  }),
                  "vii"
                ),
                notifyUpdateNamedDests: Module.addFunction(
                  b(function (c, h) {
                    c = downloadDataMap[c];
                    c.m_has_named_dests || (c.m_has_named_dests = !0);
                  }),
                  "vii"
                ),
                notifyUpdateThumb: Module.addFunction(
                  b(function (c, h) {}),
                  "viiii"
                ),
                notifyFinishedDownload: Module.addFunction(
                  b(function (c, h) {
                    c = downloadDataMap[c];
                    c.m_finished_download ||
                      ((c.m_finished_download = !0),
                      Module.postEvent(c.m_id, "documentComplete", {}));
                  }),
                  "vii"
                ),
                notifyDocumentError: Module.addFunction(function (c, h) {},
                "viii"),
                getCurrentPage: Module.addFunction(function (c, h) {
                  return downloadDataMap[c].m_current_page;
                }, "iii"),
              };
            }
            b = Module.allocate(40, "i8", Module.ALLOC_STACK);
            Module.setValue(b, l.downloadProc, "i8*");
            Module.setValue(b + 4, a, "i8*");
            Module.setValue(b + 8, l.notifyUpdatePage, "i8*");
            Module.setValue(b + 12, l.notifyUpdateOutline, "i8*");
            Module.setValue(b + 16, l.notifyUpdateNamedDests, "i8*");
            Module.setValue(b + 20, l.notifyUpdateThumb, "i8*");
            Module.setValue(b + 24, l.notifyFinishedDownload, "i8*");
            Module.setValue(b + 28, l.notifyDocumentError, "i8*");
            Module.setValue(b + 32, l.getCurrentPage, "i8*");
            Module.setValue(b + 36, 0, "i8*");
            return b;
          };
          d.CreateDocDownloaderBackend = function (a, b, c) {
            var h = a.url,
              e = a.size,
              w = a.customHeaders,
              D = a.withCredentials,
              A = a.shouldUseMinimumDownloads;
            w && (Module.customHeadersMap[c] = w);
            D && (Module.withCredentials[c] = D);
            var F = a.downloadData
              ? new I(a.downloadData, h, c)
              : new I(a.size, h, c);
            var J = Module.createCallbacksStruct(F.downloadUserData),
              L = Module.allocate(4, "i8", Module.ALLOC_STACK);
            Module.MakeDev(c);
            a.chunkStorage
              ? (h = new y(a.chunkStorage))
              : ((a = new Int8Array(
                  new ArrayBuffer(
                    Math.ceil((a.size + 1048576 - 1) / 1048576 / 8)
                  )
                )),
                (h = new y(h, e, w, D, a)));
            Module.docs[c] = { chunkStorage: h };
            REX(
              Module._TRN_DownloaderCreate(
                J,
                e,
                Module.GetUStringFromJSString(c),
                A,
                L
              )
            );
            F.downloader = Module.getValue(L, "i8*");
            if ((e = Module._TRN_PDFDocCreateFromFilter(F.downloader, b)))
              Module._TRN_FilterDestroy(F.downloader), REX(e);
            b = Module.getValue(b, "i8*");
            Module.docs[c].ptr = b;
            Module.PDFDocInitSecurityHandler(b) &&
              REX(Module._TRN_PDFDocDownloaderInitialize(b, F.downloader));
            downloadDataMap[b] = F;
          };
          d.CreateDocBackend = function (a, b) {
            var c = a.value,
              h = a.extension,
              e = a.type,
              w = Module.allocate(4, "i8", Module.ALLOC_STACK),
              D = Module.stackSave();
            try {
              if (c)
                if ("ptr" === e) Module.docs[b] = { ptr: c };
                else {
                  c.shouldUseMinimumDownloads = a.shouldUseMinimumDownloads;
                  var A = "object" === r(c) && c.url;
                  e = h && "pdf" !== h;
                  if (A) d.CreateDocDownloaderBackend(c, w, b);
                  else {
                    var F = c instanceof ArrayBuffer;
                    A = F ? "buffer" : "file";
                    if (
                      F &&
                      ((c = new Uint8Array(c)), 10485760 > c.length + k && !e)
                    ) {
                      k += c.length;
                      var J = c.length,
                        L = Module._malloc(c.length);
                      Module.HEAPU8.set(c, L);
                      REX(Module._TRN_PDFDocCreateFromBuffer(L, J, w));
                      var K = Module.getValue(w, "i8*");
                      Module.docs[b] = {
                        ptr: K,
                        bufPtr: L,
                        bufPtrSize: J,
                        ownership: !0,
                      };
                      Module.docs[b].extension = h;
                      return;
                    }
                    Module.MakeDev(b);
                    F = {};
                    F[A] = c;
                    Module.docs[b] = F;
                    if (e) {
                      if (a.pageSizes && a.pageSizes.length)
                        var N = a.pageSizes[0];
                      else a.defaultPageSize && (N = a.defaultPageSize);
                      var M = Module.GetUStringFromJSString(b);
                      REX(Module._TRN_PDFDocCreate(w));
                      K = Module.getValue(w, "i8*");
                      var Q = Module.ImageCreateFromFile(K, M);
                      Module.InsertImageIntoDoc(K, Q, N);
                    } else {
                      var R = Module.allocate(
                        Module.intArrayFromString(b),
                        "i8",
                        Module.ALLOC_STACK
                      );
                      REX(Module._TRN_PDFDocCreateFromFilePath(R, w));
                      K = Module.getValue(w, "i8*");
                    }
                    Module.docs[b].extension = h;
                    Module.docs[b].ptr = K;
                  }
                }
              else
                REX(Module._TRN_PDFDocCreate(w)),
                  (K = Module.getValue(w, "i8*")),
                  (Module.docs[b] = { ptr: K }),
                  (Module.docs[b].extension = h);
            } finally {
              Module.stackRestore(D);
            }
          };
          d.ChangeDocBackend = function (a, b) {
            var c = Module.docs[a];
            c
              ? (c.bufPtr &&
                  c.ownership &&
                  (Module._free(c.bufPtr), (k -= c.bufPtrSize)),
                delete Module.docs[a])
              : Object(B.d)(
                  "Trying to delete document ".concat(
                    a,
                    " that does not exist."
                  )
                );
            Module.docs[a] = b;
          };
          d.DeleteDoc = function (a) {
            var b = Module.docs[a];
            b
              ? (b.ptr &&
                  (b.ptr in downloadDataMap &&
                    (clearTimeout(downloadDataMap[b.ptr].timeout),
                    downloadDataMap[b.ptr].destroyUserData(),
                    delete downloadDataMap[b.ptr]),
                  Module.PDFDocDestroy(b.ptr)),
                b.bufPtr &&
                  b.ownership &&
                  (Module._free(b.bufPtr), (k -= b.bufPtrSize)),
                delete Module.docs[a])
              : Object(B.d)(
                  "Trying to delete document ".concat(
                    a,
                    " that does not exist."
                  )
                );
          };
          d.CreateDoc = function (a, b) {
            if ("id" === a.type) {
              if (
                Module.docPtrStringToIdMap &&
                a.value in Module.docPtrStringToIdMap
              )
                return Module.docPtrStringToIdMap[a.value];
              a.type = "ptr";
              a.value = Number("0x".concat(a.value));
            }
            if (!b) {
              do b = (++n).toString();
              while (b in Module.docs);
            }
            Module.hasBufOwnership = !0;
            d.CreateDocBackend(a, b);
            return b;
          };
          d.CreateEmptyDoc = function () {
            var a = (++n).toString(),
              b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocCreate(b));
            b = Module.getValue(b, "i8*");
            Module.docs[a] = { ptr: b };
            return a;
          };
          d.PDFDocCreateFromLayoutEls = function (a) {
            var b = new Uint8Array(a);
            a = Module._malloc(b.length);
            var c = Module.stackSave(),
              h = Module.allocate(4, "i8", Module.ALLOC_STACK);
            Module.HEAPU8.set(b, a);
            b = Module._TRN_PDFDocCreateFromLayoutEls(a, b.length, h);
            h = Module.getValue(h, "i8*");
            Module._free(a);
            Module.stackRestore(c);
            REX(b);
            return h;
          };
          d.GetPageCount = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocGetPageCount(a, b));
            return Module.getValue(b, "i8*");
          };
          d.GetPage = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocGetPage(a, b, c));
            a = Module.getValue(c, "i8*");
            Module.PageIsValid(a) ||
              THROW(
                "Trying to access page that doesn't exist at index ".concat(b)
              );
            return a;
          };
          d.PageGetPageWidth = function (a) {
            var b = Module.allocate(8, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetPageWidth(a, 1, b));
            return Module.getValue(b, "double");
          };
          d.PageGetPageHeight = function (a) {
            var b = Module.allocate(8, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetPageHeight(a, 1, b));
            return Module.getValue(b, "double");
          };
          d.PageGetDefaultMatrix = function (a, b) {
            var c = Module.allocate(48, "i8", Module.ALLOC_STACK);
            b || (b = 0);
            REX(Module._TRN_PageGetDefaultMatrix(a, !0, 1, b, c));
            return c;
          };
          d.GetMatrixAsArray = function (a) {
            for (var b = [], c = 0; 6 > c; ++c)
              b[c] = Module.getValue(a + 8 * c, "double");
            return b;
          };
          d.PageGetPageInfo = function (a) {
            var b = Module.allocate(48, "i8", Module.ALLOC_STACK),
              c = Module.allocate(8, "i8", Module.ALLOC_STACK),
              h = Module.allocate(8, "i8", Module.ALLOC_STACK),
              e = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetPageInfo(a, !0, 1, 0, c, h, b, e));
            return {
              rotation: Module.getValue(e, "i8*"),
              width: Module.getValue(c, "double"),
              height: Module.getValue(h, "double"),
              matrix: Module.GetMatrixAsArray(b),
            };
          };
          d.GetUStringFromJSString = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK),
              h = 2 * (a.length + 1),
              e = Module.allocate(
                h,
                "i8",
                b ? Module.ALLOC_NORMAL : Module.ALLOC_STACK
              );
            Module.stringToUTF16(a, e, h);
            a = Module._TRN_UStringCreateFromString(e, c);
            b && Module._free(e);
            REX(a);
            return Module.getValue(c, "i8*");
          };
          d.GetJSStringFromUString = function (a) {
            var b = Module.allocate(4, "i16*", Module.ALLOC_STACK);
            REX(Module._TRN_UStringCStr(a, b));
            return Module.UTF16ToString(Module.getValue(b, "i16*"));
          };
          d.GetJSStringFromCString = function (a) {
            return Module.UTF8ToString(a);
          };
          d.PDFNetSetResourceData = function (a) {
            Module.res_ptr = Module._malloc(a.length);
            Module.HEAPU8.set(a, Module.res_ptr);
            REX(Module._TRN_PDFNetSetResourceData(Module.res_ptr, a.length));
            Module.res_ptr_size = a.length;
          };
          d.PDFDocDestroy = function (a) {
            REX(Module._TRN_PDFDocDestroy(a));
          };
          d.VectorGetSize = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_VectorGetSize(a, b));
            return Module.getValue(b, "i32");
          };
          d.VectorGetAt = function (a, b) {
            var c = Module.allocate(1, "i8*", Module.ALLOC_STACK);
            REX(Module._TRN_VectorGetAt(a, b, c));
            return Module.getValue(c, "i8*");
          };
          d.VectorDestroy = function (a) {
            REX(Module._TRN_VectorDestroy(a));
          };
          d.PDFRasterizerCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFRasterizerCreate(0, a));
            return Module.getValue(a, "i8*");
          };
          d.ExtractSeparationData = function (a) {
            var b = Module.getValue(a, "i8*"),
              c = Module.getValue(a + 4, "i32"),
              h = Module.getValue(a + 8, "i8*"),
              e = Module.HEAPU8[a + 12],
              w = Module.HEAPU8[a + 13],
              D = Module.HEAPU8[a + 14];
            a = Module.HEAPU8[a + 15];
            var A = new Uint8Array(c);
            A.set(Module.HEAPU8.subarray(b, b + c));
            b = Module.GetJSStringFromUString(h);
            return { color: [e, w, D, a], data: A.buffer, name: b };
          };
          d.ExtractApRefChangeData = function (a) {
            var b = Module.getValue(a, "i32"),
              c = Module.getValue(a + 4, "i32"),
              h = Module.getValue(a + 8, "i32"),
              e = Module.getValue(a + 12, "i32");
            a = 0 !== Module.getValue(a + 16, "i8");
            return {
              oldObjNum: b,
              discardAppearance: a,
              newObjNum: c,
              genNum: h,
              pageNum: e,
            };
          };
          d.PDFRasterizerRasterizeSeparations = function (a, b, c, h, e, w, D) {
            var A = Module.allocate(8, "i8", Module.ALLOC_STACK);
            REX(
              Module._TRN_PDFRasterizerRasterizeSeparations(
                a,
                b,
                c,
                h,
                e,
                w,
                D,
                A
              )
            );
            a = Module.getValue(A, "i8*");
            b = Module.VectorGetSize(a);
            c = Array(b);
            for (h = 0; h < b; ++h)
              (e = Module.VectorGetAt(a, h)),
                (c[h] = Module.ExtractSeparationData(e));
            Module.VectorDestroy(a);
            return c;
          };
          d.PageGetRotation = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetRotation(a, b));
            return Module.getValue(b, "i8*");
          };
          d.PageGetId = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetSDFObj(a, b));
            b = Module.getValue(b, "i8*");
            a = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjGetObjNum(b, a));
            a = Module.getValue(a, "i32");
            var c = Module.allocate(2, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjGetGenNum(b, c));
            c = Module.getValue(c, "i16");
            return "".concat(a, "-").concat(c);
          };
          d.PageSetRotation = function (a, b) {
            REX(Module._TRN_PageSetRotation(a, b));
          };
          d.GetDefaultMatrixBox = function (a, b, c) {
            var h = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetRotation(a, h));
            a = (Module.getValue(h, "i32") + c) % 4;
            c = Module.allocate(48, "i8", Module.ALLOC_STACK);
            switch (a) {
              case 0:
                return (
                  REX(Module._TRN_Matrix2DSet(c, 1, 0, 0, -1, -b.x1, b.y2)), c
                );
              case 1:
                return (
                  REX(Module._TRN_Matrix2DSet(c, 0, 1, 1, 0, -b.y1, -b.x1)), c
                );
              case 2:
                return (
                  REX(Module._TRN_Matrix2DSet(c, -1, 0, 0, 1, b.x2, -b.y1)), c
                );
              case 3:
                return (
                  REX(Module._TRN_Matrix2DSet(c, 0, -1, -1, 0, b.y2, b.x2)), c
                );
            }
            throw Error("Yikes, we don't support that rotation type");
          };
          d.Matrix2DMultBBox = function (a, b) {
            var c = Module.allocate(8, "i8", Module.ALLOC_STACK),
              h = Module.allocate(8, "i8", Module.ALLOC_STACK);
            Module.setValue(c, b.x1, "double");
            Module.setValue(h, b.y1, "double");
            REX(Module._TRN_Matrix2DMult(a, c, h));
            b.x1 = Module.getValue(c, "double");
            b.y1 = Module.getValue(h, "double");
            Module.setValue(c, b.x2, "double");
            Module.setValue(h, b.y2, "double");
            REX(Module._TRN_Matrix2DMult(a, c, h));
            b.x2 = Module.getValue(c, "double");
            b.y2 = Module.getValue(h, "double");
            return b;
          };
          d.Matrix2DMult = function (a, b) {
            var c = Module.allocate(8, "i8", Module.ALLOC_STACK),
              h = Module.allocate(8, "i8", Module.ALLOC_STACK);
            Module.setValue(c, b.x, "double");
            Module.setValue(h, b.y, "double");
            REX(Module._TRN_Matrix2DMult(a, c, h));
            b.x = Module.getValue(c, "double");
            b.y = Module.getValue(h, "double");
            return b;
          };
          d.Matrix2DConcat = function (a, b) {
            var c = Module.getValue(b, "double"),
              h = Module.getValue(b + 8, "double"),
              e = Module.getValue(b + 16, "double"),
              w = Module.getValue(b + 24, "double"),
              D = Module.getValue(b + 32, "double");
            b = Module.getValue(b + 40, "double");
            REX(Module._TRN_Matrix2DConcat(a, c, h, e, w, D, b));
          };
          d.Matrix2DSet = function (a, b, c, h, e, w, D) {
            REX(Module._TRN_Matrix2DSet(a, b, c, h, e, w, D));
          };
          d.IteratorHasNext = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_IteratorHasNext(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.IteratorCurrent = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_IteratorCurrent(a, b));
            return Module.getValue(Module.getValue(b, "i8*"), "i8*");
          };
          d.IteratorNext = function (a) {
            REX(Module._TRN_IteratorNext(a));
          };
          d.PageGetNumAnnots = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetNumAnnots(a, b));
            return Module.getValue(b, "i32");
          };
          d.PageGetAnnot = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetAnnot(a, b, c));
            return Module.getValue(c, "i8*");
          };
          d.PageAnnotRemove = function (a, b) {
            REX(Module._TRN_PageAnnotRemoveByIndex(a, b));
          };
          d.AnnotGetType = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_AnnotGetType(a, b));
            return Module.getValue(b, "i32");
          };
          d.AnnotHasAppearance = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_AnnotGetAppearance(a, 0, 0, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.AnnotRefreshAppearance = function (a) {
            REX(Module._TRN_AnnotRefreshAppearance(a));
          };
          d.ObjErase = function (a, b) {
            b = Module.allocate(
              Module.intArrayFromString(b),
              "i8",
              Module.ALLOC_STACK
            );
            REX(Module._TRN_ObjEraseFromKey(a, b));
          };
          d.GetJSDoubleArrFromCore = function (a, b) {
            for (var c = Array(b), h = 0; h < b; ++h)
              (c[h] = Module.getValue(a, "double")), (a += 8);
            return c;
          };
          d.GetJSIntArrayFromCore = function (a, b) {
            for (var c = Array(b), h = 0; h < b; ++h)
              (c[h] = Module.getValue(a, "i32")), (a += 4);
            return c;
          };
          d.BookmarkIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_BookmarkIsValid(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.BookmarkGetNext = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_BookmarkGetNext(a, b));
            return Module.getValue(b, "i8*");
          };
          d.BookmarkGetFirstChild = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_BookmarkGetFirstChild(a, b));
            return Module.getValue(b, "i8*");
          };
          d.BookmarkHasChildren = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_BookmarkHasChildren(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.BookmarkGetAction = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_BookmarkGetAction(a, b));
            return Module.getValue(b, "i8*");
          };
          d.BookmarkGetTitle = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_BookmarkGetTitle(a, b));
            a = Module.getValue(b, "i8*");
            return Module.GetJSStringFromUString(a);
          };
          d.ActionIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ActionIsValid(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.ActionGetType = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ActionGetType(a, b));
            return Module.getValue(b, "i32");
          };
          d.ActionGetDest = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ActionGetDest(a, b));
            return Module.getValue(b, "i8*");
          };
          d.DestinationIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_DestinationIsValid(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.DestinationGetPage = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_DestinationGetPage(a, b));
            return Module.getValue(b, "i8*");
          };
          d.PageIsValid = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageIsValid(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.PageGetIndex = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageGetIndex(a, b));
            return Module.getValue(b, "i32");
          };
          d.ObjGetAsPDFText = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjGetAsPDFText(a, b));
            a = Module.getValue(b, "i8*");
            return Module.GetJSStringFromUString(a);
          };
          d.ObjFindObj = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            b = Module.allocate(
              Module.intArrayFromString(b),
              "i8",
              Module.ALLOC_STACK
            );
            REX(Module._TRN_ObjFindObj(a, b, c));
            return Module.getValue(c, "i8*");
          };
          d.PDFDocGetFirstBookmark = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocGetFirstBookmark(a, b));
            return Module.getValue(b, "i8*");
          };
          d.DestinationGetExplicitDestObj = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_DestinationGetExplicitDestObj(a, b));
            return Module.getValue(b, "i8*");
          };
          d.DestinationGetFitType = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_DestinationGetFitType(a, b));
            return Module.getValue(b, "i32");
          };
          d.ObjIsNumber = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjIsNumber(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.ObjGetNumber = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjGetNumber(a, b));
            return Module.getValue(b, "double");
          };
          d.PDFDocGetRoot = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocGetRoot(a, b));
            return Module.getValue(b, "i8*");
          };
          d.ObjPutName = function (a, b, c) {
            b = Module.allocate(
              Module.intArrayFromString(b),
              "i8",
              Module.ALLOC_STACK
            );
            c = Module.allocate(
              Module.intArrayFromString(c),
              "i8",
              Module.ALLOC_STACK
            );
            var h = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjPutName(a, b, c, h));
            return Module.getValue(h, "i8*");
          };
          d.ObjPutDict = function (a, b) {
            b = Module.allocate(
              Module.intArrayFromString(b),
              "i8",
              Module.ALLOC_STACK
            );
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjPutDict(a, b, c));
            return Module.getValue(c, "i8*");
          };
          d.ObjPutString = function (a, b, c) {
            b = Module.allocate(
              Module.intArrayFromString(b),
              "i8",
              Module.ALLOC_STACK
            );
            c = Module.allocate(
              Module.intArrayFromString(c),
              "i8",
              Module.ALLOC_STACK
            );
            var h = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjPutString(a, b, c, h));
            return Module.getValue(h, "i8*");
          };
          d.ObjPut = function (a, b, c) {
            b = Module.allocate(
              Module.intArrayFromString(b),
              "i8",
              Module.ALLOC_STACK
            );
            var h = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjPut(a, b, c, h));
            return Module.getValue(h, "i8*");
          };
          d.ObjGetAt = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ObjGetAt(a, b, c));
            return Module.getValue(c, "i8*");
          };
          d.Matrix2DInverse = function (a) {
            var b = Module.allocate(48, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_Matrix2DInverse(a, b));
            return b;
          };
          d.PDFDocInitSecurityHandler = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocInitSecurityHandler(a, 0, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.PDFDocSetSecurityHandler = function (a, b) {
            REX(Module._TRN_PDFDocSetSecurityHandler(a, b));
          };
          d.SecurityHandlerCreate = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_SecurityHandlerCreate(a, b));
            return Module.getValue(b, "i8*");
          };
          d.SecurityHandlerChangeUserPasswordUString = function (a, b) {
            REX(
              Module._TRN_SecurityHandlerChangeUserPasswordUString(
                a,
                Module.GetUStringFromJSString(b)
              )
            );
          };
          d.PDFDocInitStdSecurityHandler = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(
              Module._TRN_PDFDocInitStdSecurityHandlerUString(
                a,
                Module.GetUStringFromJSString(b),
                c
              )
            );
            return 0 !== Module.getValue(c, "i8");
          };
          d.PDFDocDownloaderTriggerFullDownload = function (a, b) {
            REX(Module._TRN_PDFDocDownloaderTriggerFullDownload(a, b));
          };
          d.PDFDocInsertPages = function (a, b, c, h, e) {
            REX(Module._TRN_PDFDocInsertPageSet(a, b, c, h, e ? 1 : 0, 0));
          };
          d.PDFDocInsertPages2 = function (a, b, c, h, e) {
            REX(Module._TRN_PDFDocInsertPageSet2(a, b, c, h, e ? 1 : 0, 0));
          };
          d.PDFDocMovePages = function (a, b, c) {
            REX(Module._TRN_PDFDocMovePageSet(a, b, a, c, 0, 0));
          };
          d.PDFDocGetPageIterator = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocGetPageIterator(a, b, c));
            return Module.getValue(c, "i8*");
          };
          d.PDFDocPageRemove = function (a, b) {
            REX(Module._TRN_PDFDocPageRemove(a, b));
          };
          d.PDFDocPageRemove2 = function (a, b) {
            REX(Module._TRN_PDFDocPageRemove2(a, b));
          };
          d.PDFDocPageCreate = function (a, b, c) {
            var h = Module.allocate(40, "i8", Module.ALLOC_STACK);
            Module.setValue(h, 0, "double");
            Module.setValue(h + 8, 0, "double");
            Module.setValue(h + 16, b, "double");
            Module.setValue(h + 24, c, "double");
            Module.setValue(h + 32, 0, "double");
            b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocPageCreate(a, h, b));
            return Module.getValue(b, "i8*");
          };
          d.PDFDocPageInsert = function (a, b, c) {
            REX(Module._TRN_PDFDocPageInsert(a, b, c));
          };
          d.PageSetCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageSetCreate(a));
            return Module.getValue(a, "i8*");
          };
          d.PageSetCreateRange = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PageSetCreateRange(c, a, b));
            return Module.getValue(c, "i8*");
          };
          d.PageSetAddPage = function (a, b) {
            REX(Module._TRN_PageSetAddPage(a, b));
          };
          d.ElementBuilderCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ElementBuilderCreate(a));
            return Module.getValue(a, "i8*");
          };
          d.ElementBuilderDestroy = function (a) {
            REX(Module._TRN_ElementBuilderDestroy(a));
          };
          d.ElementBuilderCreateImage = function (a, b, c, h, e, w) {
            var D = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(
              Module._TRN_ElementBuilderCreateImageScaled(a, b, c, h, e, w, D)
            );
            return Module.getValue(D, "i8*");
          };
          d.ElementWriterCreate = function () {
            var a = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ElementWriterCreate(a));
            return Module.getValue(a, "i8*");
          };
          d.ElementWriterDestroy = function (a) {
            REX(Module._TRN_ElementWriterDestroy(a));
          };
          d.ElementWriterBegin = function (a, b) {
            REX(Module._TRN_ElementWriterBeginOnPage(a, b, 1, 1, 1, 0));
          };
          d.ElementWriterWritePlacedElement = function (a, b) {
            REX(Module._TRN_ElementWriterWritePlacedElement(a, b));
          };
          d.ElementWriterEnd = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ElementWriterEnd(a, b));
          };
          d.ImageGetImageWidth = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ImageGetImageWidth(a, b));
            return Module.getValue(b, "i32");
          };
          d.ImageGetImageHeight = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ImageGetImageHeight(a, b));
            return Module.getValue(b, "i32");
          };
          d.ImageCreateFromMemory2 = function (a, b, c) {
            var h = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ImageCreateFromMemory2(a, b, c, 0, h));
            return Module.getValue(h, "i8*");
          };
          d.ImageCreateFromFile = function (a, b) {
            var c = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_ImageCreateFromFile(a, b, 0, c));
            return Module.getValue(c, "i8*");
          };
          d.PDFDocPagePushBack = function (a, b) {
            REX(Module._TRN_PDFDocPagePushBack(a, b));
          };
          d.PDFDocHasOC = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocHasOC(a, b));
            return 0 !== Module.getValue(b, "i8");
          };
          d.PDFDocGetOCGConfig = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_PDFDocGetOCGConfig(a, b));
            return Module.getValue(b, "i8*");
          };
          d.OCGContextCreate = function (a) {
            var b = Module.allocate(4, "i8", Module.ALLOC_STACK);
            REX(Module._TRN_OCGContextCreateFromConfig(a, b));
            return Module.getValue(b, "i8*");
          };
          d.UStringDestroy = function (a) {
            REX(Module._TRN_UStringDestroy(a));
          };
          d.PDFDocFDFUpdate = function (a, b, c) {
            if (c) {
              for (
                var h = Object.keys(c),
                  e = h.length,
                  w = Module._malloc(8 * e),
                  D = 0;
                D < e;
                ++D
              ) {
                var A = 8 * D,
                  F = h[D],
                  J = Module.GetDoc(c[F]);
                F = Module.GetUStringFromJSString(F);
                Module.setValue(w + A, J, "i8*");
                Module.setValue(w + A + 4, F, "i8*");
              }
              c = Module.allocate(8, "i8", Module.ALLOC_STACK);
              REX(Module._TRN_PDFDocFDFUpdateAppearanceDocs(a, b, w, e, c));
              a = Module.getValue(c, "i8*");
              b = Module.VectorGetSize(a);
              e = Array(b);
              for (w = 0; w < b; ++w)
                (c = Module.VectorGetAt(a, w)),
                  (e[w] = Module.ExtractApRefChangeData(c));
              Module.VectorDestroy(a);
              if (b) return e;
            } else REX(Module._TRN_PDFDocFDFUpdate(a, b));
          };
          d.FDFDocDestroy = function (a) {
            REX(Module._TRN_FDFDocDestroy(a));
          };
        })(m.Module);
      }.call(this, u(7).setImmediate));
    },
    function (v, z, u) {
      function t(r) {
        "@babel/helpers - typeof";
        return (
          (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (B) {
                  return typeof B;
                }
              : function (B) {
                  return B &&
                    "function" == typeof Symbol &&
                    B.constructor === Symbol &&
                    B !== Symbol.prototype
                    ? "symbol"
                    : typeof B;
                }),
          t(r)
        );
      }
      (function (r) {
        r.SetupPDFNetFunctions = function (B) {
          Module._IB_ = [];
          for (
            var m = function E(y) {
                if ("object" === t(y) && null !== y)
                  if ("undefined" !== typeof y.byteLength) {
                    var C = Module._IB_.length;
                    Module._IB_[C] = new Uint8Array(y);
                    y = { handle: C, isArrayBufferRef: !0 };
                  } else
                    Object.keys(y).forEach(function (H) {
                      y.hasOwnProperty(H) && (y[H] = E(y[H]));
                    });
                return y;
              },
              d = function C(E) {
                "object" === t(E) &&
                  null !== E &&
                  (E.buffer
                    ? (E = E.buffer.slice(
                        E.byteOffset,
                        E.byteOffset + E.length
                      ))
                    : E.isArrayBufferRef
                    ? (E = Module._IB_[E.handle].buffer)
                    : Object.keys(E).forEach(function (H) {
                        E.hasOwnProperty(H) && (E[H] = C(E[H]));
                      }));
                return E;
              },
              k = Module._TRN_EMSCreateSharedWorkerInstance(),
              n,
              f = Module._TRN_EMSWorkerInstanceGetFunctionIterator(k),
              l = function (E, C) {
                return new Promise(function (H, G) {
                  E = m(E);
                  var I = E.docId;
                  I = I ? Module.GetDoc(I) : 0;
                  (I = Module.EMSCallSharedFunction(k, C, I))
                    ? G({
                        type: "PDFWorkerError",
                        message: Module.GetErrToString(I),
                      })
                    : ((G = Module.EMSGetLastResponse(k)), (G = d(G)), H(G));
                });
              };
            (n = Module._TRN_EMSFunctionIteratorGetNextCommandName(f));

          )
            (n = Module.GetJSStringFromCString(n)), r.queue.onAsync(n, l);
          Module._TRN_EMSFunctionIteratorDestroy(f);
          if (Module._TRN_EMSCreatePDFNetWorkerInstance) {
            var g = {};
            f = function (p, y) {
              B.on(p, y);
              g[p] = !0;
            };
            Module.docPtrStringToIdMap = {};
            var x = function (p) {
              if (p in Module.docPtrStringToIdMap)
                return Module.docPtrStringToIdMap[p];
              throw Error("Couldn't find document ".concat(p));
            };
            r.queue.onAsync("PDFDoc.RequirePage", function (p) {
              return Module.RequirePage(x(p.docId), p.pageNum);
            });
            f("pdfDocCreateFromBuffer", function (p) {
              p = Module.CreateDoc({ type: "array", value: p.buf });
              var y = Module.GetDoc(p).toString(16);
              Module.docPtrStringToIdMap[y] = p;
              return y;
            });
            f("PDFDoc.destroy", function (p) {
              p = x(p.auto_dealloc_obj);
              Module.DeleteDoc(p);
            });
            f("PDFDoc.saveMemoryBuffer", function (p) {
              var y = x(p.doc);
              return Module.SaveHelper(Module.GetDoc(y), y, p.flags).slice(0);
            });
            f("pdfDocCreate", function () {
              var p = Module.CreateDoc({ type: "new" }),
                y = Module.GetDoc(p).toString(16);
              Module.docPtrStringToIdMap[y] = p;
              return y;
            });
            f("GetPDFDoc", function (p) {
              p = p.docId;
              var y = Module.GetDoc(p).toString(16);
              Module.docPtrStringToIdMap[y] = p;
              return y;
            });
            f("ExtractPDFNetLayersContext", function (p) {
              var y = p.layers;
              p = Module.GetDoc(p.docId);
              var E = 0;
              y
                ? (E = Module.EMSCreateUpdatedLayersContext(p, y))
                : Module.PDFDocHasOC(p) &&
                  ((y = Module.PDFDocGetOCGConfig(p)),
                  (E = Module.OCGContextCreate(y)));
              return E.toString(16);
            });
            var q = Module._TRN_EMSCreatePDFNetWorkerInstance();
            f = Module._TRN_EMSWorkerInstanceGetFunctionIterator(q);
            for (
              l = function (p) {
                return new Promise(function (y, E) {
                  p = m(p);
                  var C = Module.EMSCallPDFNetFunction(q, p);
                  C
                    ? E(Module.GetErrToString(C))
                    : ((E = Module.EMSGetLastResponse(q)), (E = d(E)), y(E));
                });
              };
              (n = Module._TRN_EMSFunctionIteratorGetNextCommandName(f));

            )
              if (((n = Module.GetJSStringFromCString(n)), !g[n]))
                B.onAsync(n, l);
            Module._TRN_EMSFunctionIteratorDestroy(f);
          }
        };
      })(self);
    },
    function (v, z, u) {
      v = u(6);
      var t = u.n(v),
        r = u(15),
        B = u(16),
        m = u(5),
        d = u(17),
        k = u(1),
        n = u(18);
      (function (f) {
        var l = null;
        f.basePath = "../";
        var g = function () {
          var q = f.pdfWorkerPath || "";
          f.workerBasePath && (f.basePath = f.workerBasePath);
          var p = f.isFull,
            y = p ? "full/" : "lean/";
          f.useOptimizedWorker && (y += n.a);
          var E = f.wasmDisabled,
            C = f.disableObjectURLBlobs;
          Object(k.c)();
          f.overriddenPdfWorkerPath &&
            ((q = f.overriddenPdfWorkerPath),
            (f.basePath = "../"),
            !Object(m.a)() || E) &&
            (q = "");
          f.basePath = f.externalPath
            ? f.externalPath
            : f.basePath + "external/";
          Object(d.a)(
            "".concat(q + y, "PDFNetC"),
            {
              "Wasm.wasm": p ? 1e7 : 4e6,
              "Wasm.js.mem": 1e5,
              ".js.mem": 12e6,
              ".mem": p ? 2e6 : 6e5,
              disableObjectURLBlobs: C,
            },
            E
          );
        };
        f.EmscriptenPDFManager = function () {};
        f.EmscriptenPDFManager.prototype = {
          OnInitialized: function (q) {
            Module.loaded
              ? q()
              : ((Module.initCb = function () {
                  q();
                }),
                Object(k.b)("worker", "PDFNet is not initialized yet!"));
          },
          NewDoc: function (q, p) {
            return new Promise(function (y, E) {
              try {
                y(Module.loadDoc(q, p));
              } catch (C) {
                E(C);
              }
            });
          },
          Initialize: function (q, p, y, E) {
            q && (Module.TOTAL_MEMORY = q);
            Module.memoryInitializerPrefixURL = p;
            Module.asmjsPrefix = y;
            f.basePath = E;
            g();
          },
          shouldRunRender: function (q) {
            return Module.ShouldRunRender(q.docId, q.pageIndex + 1);
          },
        };
        var x = {
          setup: function (q) {
            function p(e) {
              var w = e.data,
                D = e.action;
              var A =
                "GetCanvas" === D || "GetCanvasPartial" === D
                  ? H.shouldRunRender(w)
                  : !0;
              if (A) {
                l = e;
                var F = e.asyncCallCapability;
                Object(k.b)("Memory", "Worker running command: ".concat(D));
                G.actionMap[D](w, e).then(
                  function (J) {
                    "BeginOperation" !== l.action && (l = null);
                    F.resolve(J);
                  },
                  function (J) {
                    l = null;
                    F.reject(J);
                  }
                );
              } else f.deferredQueue.queue(e), C();
            }
            function y(e) {
              e.asyncCallCapability = createPromiseCapability();
              l || G.length ? G.queue(e) : p(e);
              return e.asyncCallCapability.promise;
            }
            function E(e) {
              self.shouldResize &&
                H.Initialize(
                  e.options.workerHeapSize,
                  e.options.pdfResourcePath,
                  e.options.pdfAsmPath,
                  e.options.parentUrl
                );
              Module.chunkMax = e.options.chunkMax;
              if (e.array instanceof Uint8Array) {
                var w = 255 === e.array[0];
                q.postMessageTransfers = w;
                "response" in new XMLHttpRequest()
                  ? H.OnInitialized(function () {
                      f.SetupPDFNetFunctions(q);
                      b();
                      q.send("test", {
                        supportTypedArray: !0,
                        supportTransfers: w,
                      });
                    })
                  : q.send("test", !1);
              } else q.send("test", !1);
            }
            function C() {
              r.a.setImmediate(function () {
                if ((!l || "BeginOperation" !== l.action) && G.length && !l) {
                  var e = G.dequeue();
                  p(e);
                }
              });
            }
            var H = new f.EmscriptenPDFManager(),
              G,
              I = !1,
              a = !1;
            Module.workerMessageHandler = q;
            var b = function () {
              I ? a || (q.send("workerLoaded", {}), (a = !0)) : (I = !0);
            };
            H.OnInitialized(b);
            (function () {
              f.queue = G = new t.a({
                strategy: t.a.ArrayStrategy,
                comparator: function (e, w) {
                  return e.priority === w.priority
                    ? e.callbackId - w.callbackId
                    : w.priority - e.priority;
                },
              });
              f.deferredQueue = new t.a({
                strategy: t.a.ArrayStrategy,
                comparator: function (e, w) {
                  return e.priority === w.priority
                    ? e.callbackId - w.callbackId
                    : w.priority - e.priority;
                },
              });
              G.actionMap = {};
              G.onAsync = function (e, w) {
                q.onAsync(e, y);
                G.actionMap[e] = w;
              };
            })();
            q.on("test", E);
            q.on("InitWorker", E);
            var c = function (e) {
                l && e(l) && (Module.cancelCurrent(), (l = null));
                G.removeAllMatching(e, function (w) {
                  w.asyncCallCapability.reject({
                    type: "Cancelled",
                    message:
                      "Operation was cancelled due to a change affecting the loaded document.",
                  });
                });
              },
              h = function (e) {
                c(function (w) {
                  return w.data && w.data.docId === e;
                });
              };
            q.on("UpdatePassword", function (e) {
              return Module.UpdatePassword(e.docId, e.password);
            });
            q.on("UpdateCustomHeader", function (e) {
              return Module.UpdateCustomHeader(e.docId, e.customHeader);
            });
            q.on("LoadRes", function (e) {
              Module.loadResources(e.array, e.l);
              return {};
            });
            q.on("DownloaderHint", function (e) {
              Module.DownloaderHint(e.docId, e.hint);
            });
            q.on("IsLinearized", function (e) {
              return Module.IsLinearizationValid(e.docId);
            });
            q.onNextAsync(C);
            G.onAsync("NewDoc", function (e) {
              return H.NewDoc(e);
            });
            G.onAsync("GetCanvas", function (e) {
              Object(k.b)(
                "workerdetails",
                "Run GetCanvas PageIdx: "
                  .concat(e.pageIndex, " Width: ")
                  .concat(e.width)
              );
              Object(k.b)(
                "Memory",
                "loadCanvas with potential memory usage ".concat(
                  e.width * e.height * 8
                )
              );
              return Module.loadCanvas(
                e.docId,
                e.pageIndex,
                e.width,
                e.height,
                e.rotation,
                null,
                e.layers,
                e.renderOptions
              );
            });
            G.onAsync("GetCanvasPartial", function (e) {
              Object(k.b)(
                "Memory",
                "GetCanvasPartial with potential memory usage ".concat(
                  e.width * e.height * 8
                )
              );
              return Module.loadCanvas(
                e.docId,
                e.pageIndex,
                e.width,
                e.height,
                e.rotation,
                e.bbox,
                e.layers,
                e.renderOptions
              );
            });
            G.onAsync("SaveDoc", function (e) {
              return Module.SaveDoc(
                e.docId,
                e.xfdfString,
                e.finishedWithDocument,
                e.printDocument,
                e.flags,
                e.watermarks,
                e.apdocs,
                e.password,
                e.encryptionAlgorithmType
              );
            });
            G.onAsync("SaveDocFromFixedElements", function (e) {
              return Module.SaveDocFromFixedElements(
                e.bytes,
                e.xfdfString,
                e.flags,
                e.watermarks,
                e.password,
                e.encryptionAlgorithmType
              );
            });
            G.onAsync("MergeXFDF", function (e) {
              return Module.MergeXFDF(e.docId, e.xfdf, e.apdocs);
            });
            G.onAsync("InsertPages", function (e) {
              return Module.InsertPages(
                e.docId,
                e.doc,
                e.pageArray,
                e.destPos,
                e.insertBookmarks,
                e.skipUpdateEvent
              );
            });
            G.onAsync("MovePages", function (e) {
              return Module.MovePages(e.docId, e.pageArray, e.destPos);
            });
            G.onAsync("RemovePages", function (e) {
              return Module.RemovePages(
                e.docId,
                e.pageArray,
                e.skipUpdateEvent
              );
            });
            G.onAsync("RotatePages", function (e) {
              return Module.RotatePages(e.docId, e.pageArray, e.rotation);
            });
            G.onAsync("ExtractPages", function (e) {
              return Module.ExtractPages(
                e.docId,
                e.pageArray,
                e.xfdfString,
                e.watermarks,
                e.apdocs,
                e.skipUpdateEvent
              );
            });
            G.onAsync("CropPages", function (e) {
              return Module.CropPages(
                e.docId,
                e.pageArray,
                e.topMargin,
                e.botMargin,
                e.leftMargin,
                e.rightMargin
              );
            });
            G.onAsync("TriggerFullDownload", function (e) {
              return Module.TriggerFullDownload(e.docId);
            });
            G.onAsync("InsertBlankPages", function (e) {
              return Module.InsertBlankPages(
                e.docId,
                e.pageArray,
                e.width,
                e.height
              );
            });
            G.onAsync("BeginOperation", function () {
              return Promise.resolve();
            });
            G.onAsync("RequirePage", function (e, w) {
              return Module.RequirePage(e.docId, e.pageNum);
            });
            q.on("FinishOperation", function () {
              if (l && "BeginOperation" === l.action) (l = null), C();
              else throw { message: "Operation has not started." };
            });
            q.on("DeleteDocument", function (e) {
              e = e.docId;
              h(e);
              Module.DeleteDoc(e);
            });
            q.on("GetCanvasProgressive", function (e) {
              if (l && l.callbackId === e.callbackId) {
                Object(k.b)("worker", "Progressive request in progress");
                var w = Module.GetCurrentCanvasData(!0);
              } else {
                if (G.find({ priority: 0, callbackId: e.callbackId }))
                  throw (
                    (Object(k.b)("worker", "Progressive request Queued"),
                    {
                      type: "Queued",
                      message: "Rendering has not started yet.",
                    })
                  );
                if (
                  f.deferredQueue.find({
                    priority: 0,
                    callbackId: e.callbackId,
                  })
                )
                  throw (
                    (Object(k.b)("worker", "Progressive request Deferred"),
                    {
                      type: "Queued",
                      message: "Rendering has not started yet.",
                    })
                  );
              }
              if (!w)
                throw (
                  (Object(k.b)(
                    "worker",
                    "Progressive request invalid (render already complete)"
                  ),
                  {
                    type: "Unavailable",
                    message: "Rendering is complete or was cancelled.",
                  })
                );
              return w;
            });
            q.on("actionCancel", function (e) {
              l && l.callbackId === e.callbackId
                ? (Object(k.b)("workerdetails", "Cancelled Current Operation"),
                  Module.cancelCurrent() && ((l = null), C()))
                : (Object(k.b)("workerdetails", "Cancelled queued operation"),
                  G.remove({ priority: 0, callbackId: e.callbackId }),
                  f.deferredQueue.remove({
                    priority: 0,
                    callbackId: e.callbackId,
                  }));
            });
          },
        };
        f.onmessage = function (q) {
          if ("init" === q.data.action) {
            var p = q.data.shouldResize;
            f.shouldResize = p;
            f.isFull = q.data.isFull;
            f.wasmDisabled = !q.data.wasm;
            f.externalPath = q.data.externalPath;
            f.useOptimizedWorker = q.data.useOptimizedWorker;
            f.disableObjectURLBlobs = q.data.disableObjectURLBlobs;
            if ((q = q.data.pdfWorkerPath)) f.overriddenPdfWorkerPath = q;
            p || g();
            p = new B.a("worker_processor", self);
            Object(k.a)(p);
            x.setup(p);
          }
        };
      })("undefined" === typeof window ? self : window);
    },
  ]);
}.call(this || window));
