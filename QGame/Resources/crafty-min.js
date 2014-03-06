/*!
* Crafty v0.4.4
* http://craftyjs.com
*
* Copyright 2010, Louis Stowasser
* Dual licensed under the MIT or GPL licenses.
*/
(function(h, g) {
    var q = function(w) {
        return new q.fn.init(w)
    }, v = 1, e = 50, n = 1, m = {}, c = {}, o = {}, r = [], s, i, a, f = 0, k = 1000 / e, b = (new Date).getTime(), p = Array.prototype.slice, d = /\s*,\s*/, t = /\s+/;
    q.fn = q.prototype = {
        init: function(A) {
            if (typeof A === "string") {
                var y = 0, E, F, D = false, C = false, G, w, x, B, z;
                if (A === "*") {
                    for (E in c) {
                        this[ + E] = c[E];
                        y++
                    }
                    this.length = y;
                    return this
                }
                if (A.indexOf(",")!==-1) {
                    C = true;
                    G = d
                } else {
                    if (A.indexOf(" ")!==-1) {
                        D = true;
                        G = t
                    }
                }
                for (E in c) {
                    if (!c.hasOwnProperty(E)) {
                        continue
                    }
                    F = c[E];
                    if (D || C) {
                        w = A.split(G);
                        B = 0;
                        z = w.length;
                        x = 0;
                        for (; B < z; B++) {
                            if (F.__c[w[B]]) {
                                x++
                            }
                        }
                        if (D && x === z || C && x > 0) {
                            this[y++] =+ E
                        }
                    } else {
                        if (F.__c[A]) {
                            this[y++] =+ E
                        }
                    }
                }
                if (y > 0&&!D&&!C) {
                    this.extend(m[A])
                }
                if (w && D) {
                    for (B = 0; B < z; B++) {
                        this.extend(m[w[B]])
                    }
                }
                this.length = y
            } else {
                if (!A) {
                    A = 0;
                    if (!(A in c)) {
                        c[A] = this
                    }
                }
                if (!(A in c)) {
                    this.length = 0;
                    return this
                }
                this[0] = A;
                this.length = 1;
                if (!this.__c) {
                    this.__c = {}
                }
                if (!c[A]) {
                    c[A] = this
                }
                return c[A]
            }
            return this
        },
        addComponent: function(C) {
            var z = [], B = 0, y, x = 0, w, A;
            if (arguments.length > 1) {
                w = arguments.length;
                for (; x < w; x++) {
                    this.__c[arguments[x]] = true;
                    z.push(arguments[x])
                }
            } else {
                if (C.indexOf(",")!==-1) {
                    A = C.split(d);
                    w = A.length;
                    for (; x < w; x++) {
                        this.__c[A[x]] = true;
                        z.push(A[x])
                    }
                } else {
                    this.__c[C] = true;
                    z.push(C)
                }
            }
            y = z.length;
            for (; B < y; B++) {
                comp = m[z[B]];
                this.extend(comp);
                if (comp && "init" in comp) {
                    comp.init.call(this)
                }
            }
            this.trigger("NewComponent", y);
            return this
        },
        requires: function(z) {
            var A = z.split(d), y = 0, w = A.length, x;
            for (; y < w; ++y) {
                x = A[y];
                if (!this.has(x)) {
                    this.addComponent(x)
                }
            }
            return this
        },
        removeComponent: function(z, w) {
            if (w === false) {
                var x = m[z], y;
                for (y in x) {
                    delete this[y]
                }
            }
            delete this.__c[z];
            this.trigger("RemoveComponent", z);
            return this
        },
        has: function(w) {
            return !!this.__c[w]
        },
        attr: function(w, x) {
            if (arguments.length === 1) {
                if (typeof w === "string") {
                    return this[w]
                }
                this.extend(w);
                this.trigger("Change", w);
                return this
            }
            this[w] = x;
            var y = {};
            y[w] = x;
            this.trigger("Change", y);
            return this
        },
        toArray: function() {
            return p.call(this, 0)
        },
        delay: function(w, x) {
            this.each(function() {
                var y = this;
                setTimeout(function() {
                    w.call(y)
                }, x)
            });
            return this
        },
        bind: function(y, x) {
            if (this.length === 1) {
                if (!o[y]) {
                    o[y] = {}
                }
                var w = o[y];
                if (!w[this[0]]) {
                    w[this[0]] = []
                }
                w[this[0]].push(x);
                return this
            }
            this.each(function() {
                if (!o[y]) {
                    o[y] = {}
                }
                var z = o[y];
                if (!z[this[0]]) {
                    z[this[0]] = []
                }
                z[this[0]].push(x)
            });
            return this
        },
        unbind: function(x, w) {
            this.each(function() {
                var A = o[x], z = 0, y, B;
                if (A && A[this[0]]) {
                    y = A[this[0]].length
                } else {
                    return this
                }
                if (!w) {
                    delete A[this[0]];
                    return this
                }
                for (; z < y; z++) {
                    B = A[this[0]];
                    if (B[z] == w) {
                        B.splice(z, 1);
                        z--
                    }
                }
            });
            return this
        },
        trigger: function(z, A) {
            if (this.length === 1) {
                if (o[z] && o[z][this[0]]) {
                    var y = o[z][this[0]], x = 0, w = y.length;
                    for (; x < w; x++) {
                        y[x].call(this, A)
                    }
                }
                return this
            }
            this.each(function() {
                if (o[z] && o[z][this[0]]) {
                    var D = o[z][this[0]], C = 0, B = D.length;
                    for (; C < B; C++) {
                        D[C].call(this, A)
                    }
                }
            });
            return this
        },
        each: function(y) {
            var x = 0, w = this.length;
            for (; x < w; x++) {
                if (!c[this[x]]) {
                    continue
                }
                y.call(c[this[x]], x)
            }
            return this
        },
        clone: function() {
            var z = this.__c, w, y, x = q.e();
            for (w in z) {
                x.addComponent(w)
            }
            for (y in this) {
                x[y] = this[y]
            }
            return x
        },
        setter: function(x, w) {
            if (q.support.setter) {
                this.__defineSetter__(x, w)
            } else {
                if (q.support.defineProperty) {
                    Object.defineProperty(this, x, {
                        set: w,
                        configurable: true
                    })
                } else {
                    a.push({
                        prop: x,
                        obj: this,
                        fn: w
                    })
                }
            }
            return this
        },
        destroy: function() {
            this.each(function() {
                this.trigger("Remove");
                for (var w in o) {
                    this.unbind(w)
                }
                delete c[this[0]]
            })
        }
    };
    q.fn.init.prototype = q.fn;
    q.extend = q.fn.extend = function(y) {
        var x = this, w;
        if (!y) {
            return x
        }
        for (w in y) {
            if (x === y[w]) {
                continue
            }
            x[w] = y[w]
        }
        return x
    };
    q.extend({
        init: function(x, y) {
            q.viewport.init(x, y);
            this.trigger("Load");
            this.timer.init();
            return this
        },
        stop: function() {
            this.timer.stop();
            q.stage.elem.parentNode.removeChild(q.stage.elem);
            return this
        },
        pause: function() {
            if (!this._paused) {
                this.trigger("Pause");
                this._paused = true;
                q.timer.stop();
                q.keydown = {}
            } else {
                this.trigger("Unpause");
                this._paused = false;
                q.timer.init()
            }
            return this
        },
        timer: {
            prev: ( + new Date),
            current: ( + new Date),
            fps: 0,
            init: function() {
                var w = h.requestAnimationFrame || h.webkitRequestAnimationFrame || h.mozRequestAnimationFrame || h.oRequestAnimationFrame || h.msRequestAnimationFrame || null;
                if (w) {
                    s = function() {
                        q.timer.step();
                        i = w(s)
                    };
                    s()
                } else {
                    s = setInterval(q.timer.step, 1000 / e)
                }
            },
            stop: function() {
                q.trigger("CraftyStop");
                if (typeof s === "number") {
                    clearInterval(s)
                }
                var w = h.cancelRequestAnimationFrame || h.webkitCancelRequestAnimationFrame || h.mozCancelRequestAnimationFrame || h.oCancelRequestAnimationFrame || h.msCancelRequestAnimationFrame || null;
                if (w) {
                    w(i)
                }
                s = null
            },
            step: function() {
                f = 0;
                while ((new Date).getTime() > b) {
                    q.trigger("EnterFrame", {
                        frame: n++
                    });
                    b += k;
                    f++
                }
                if (f) {
                    q.DrawManager.draw()
                }
            },
            getFPS: function() {
                return this.fps
            }
        },
        e: function() {
            var x = j(), w;
            c[x] = null;
            c[x] = w = q(x);
            if (arguments.length > 0) {
                w.addComponent.apply(w, arguments)
            }
            w.addComponent("obj");
            return w
        },
        c: function(x, w) {
            m[x] = w
        },
        trigger: function(A, B) {
            var z = o[A], y, x, w;
            for (y in z) {
                if (!z.hasOwnProperty(y)) {
                    continue
                }
                for (x = 0, w = z[y].length; x < w; x++) {
                    if (z[y] && z[y][x]) {
                        if (c[y]) {
                            z[y][x].call(q( + y), B)
                        } else {
                            z[y][x].call(q, B)
                        }
                    }
                }
            }
        },
        bind: function(x, y) {
            if (!o[x]) {
                o[x] = {}
            }
            var w = o[x];
            if (!w.global) {
                w.global = []
            }
            return w.global.push(y)-1
        },
        unbind: function(A, B) {
            var z = o[A], y, x, w;
            for (y in z) {
                if (!z.hasOwnProperty(y)) {
                    continue
                }
                if (typeof B === "number") {
                    delete z[y][B];
                    return true
                }
                for (x = 0, w = z[y].length; x < w; x++) {
                    if (z[y][x] === B) {
                        delete z[y][x];
                        return true
                    }
                }
            }
            return false
        },
        frame: function() {
            return n
        },
        components: function() {
            return m
        },
        isComp: function(w) {
            return w in m
        },
        debug: function() {
            return c
        },
        settings: (function() {
            var w = {}, x = {};
            return {
                register: function(y, z) {
                    x[y] = z
                },
                modify: function(y, z) {
                    if (!x[y]) {
                        return 
                    }
                    x[y].call(w[y], z);
                    w[y] = z
                },
                get: function(y) {
                    return w[y]
                }
            }
        })(),
        clone: u
    });
    function j() {
        var w = v++;
        if (w in c) {
            return j()
        }
        return w
    }
    function u(y) {
        if (y === null || typeof(y) != "object") {
            return y
        }
        var w = y.constructor();
        for (var x in y) {
            w[x] = u(y[x])
        }
        return w
    }
    q.bind("Load", function() {
        if (!q.support.setter && q.support.defineProperty) {
            a = [];
            q.bind("EnterFrame", function() {
                var x = 0, w = a.length, y;
                for (; x < w; ++x) {
                    y = a[x];
                    if (y.obj[y.prop] !== y.obj["_" + y.prop]) {
                        y.fn.call(y.obj, y.obj[y.prop])
                    }
                }
            })
        }
    });
    h.Crafty = q
})(window);
(function(i, f, h) {
    (function(o) {
        var n, q = function(r) {
            n = r || 64;
            this.map = {}
        }, p = " ";
        q.prototype = {
            insert: function(w) {
                var u = q.key(w), t = new e(u, w, this), s = 0, r, v;
                for (s = u.x1; s <= u.x2; s++) {
                    for (r = u.y1; r <= u.y2; r++) {
                        v = s + p + r;
                        if (!this.map[v]) {
                            this.map[v] = []
                        }
                        this.map[v].push(w)
                    }
                }
                return t
            },
            search: function(z, s) {
                var A = q.key(z), x, u, v, y = [];
                if (s === undefined) {
                    s = true
                }
                for (x = A.x1; x <= A.x2; x++) {
                    for (u = A.y1; u <= A.y2; u++) {
                        v = x + p + u;
                        if (this.map[v]) {
                            y = y.concat(this.map[v])
                        }
                    }
                }
                if (s) {
                    var w, r, t = [], B = {};
                    for (x = 0, l = y.length; x < l; x++) {
                        w = y[x];
                        if (!w) {
                            continue
                        }
                        r = w[0];
                        if (!B[r] && w.x < z._x + z._w && w._x + w._w > z._x && w.y < z._y + z._h && w._h + w._y > z._y) {
                            B[r] = y[x]
                        }
                    }
                    for (w in B) {
                        t.push(B[w])
                    }
                    return t
                } else {
                    return y
                }
            },
            remove: function(v, x) {
                var u = 0, t, w;
                if (arguments.length == 1) {
                    x = v;
                    v = q.key(x)
                }
                for (u = v.x1; u <= v.x2; u++) {
                    for (t = v.y1; t <= v.y2; t++) {
                        w = u + p + t;
                        if (this.map[w]) {
                            var s = this.map[w], r = 0, y = s.length;
                            for (; r < y; r++) {
                                if (s[r] && s[r][0] === x[0]) {
                                    s.splice(r, 1)
                                }
                            }
                        }
                    }
                }
            }
        };
        q.key = function(v) {
            if (v.hasOwnProperty("mbr")) {
                v = v.mbr()
            }
            var s=~~(v._x / n), u=~~(v._y / n), r=~~((v._w + v._x) / n), t=~~((v._h + v._y) / n);
            return {
                x1: s,
                y1: u,
                x2: r,
                y2: t
            }
        };
        q.hash = function(r) {
            return r.x1 + p + r.y1 + p + r.x2 + p + r.y2
        };
        function e(r, t, s) {
            this.keys = r;
            this.map = s;
            this.obj = t
        }
        e.prototype = {
            update: function(r) {
                if (q.hash(q.key(r)) != q.hash(this.keys)) {
                    this.map.remove(this.keys, this.obj);
                    var s = this.map.insert(this.obj);
                    this.keys = s.keys
                }
            }
        };
        o.HashMap = q
    })(i);
    i.map = new i.HashMap();
    var g = Math, k = g.cos, a = g.sin, m = g.PI, j = m / 180;
    i.c("2D", {
        _x: 0,
        _y: 0,
        _w: 0,
        _h: 0,
        _z: 0,
        _rotation: 0,
        _alpha: 1,
        _visible: true,
        _global: null,
        _origin: null,
        _mbr: null,
        _entry: null,
        _children: null,
        _parent: null,
        _changed: false,
        init: function() {
            this._global = this[0];
            this._origin = {
                x: 0,
                y: 0
            };
            this._children = [];
            if (i.support.setter) {
                this.__defineSetter__("x", function(e) {
                    this._attr("_x", e)
                });
                this.__defineSetter__("y", function(e) {
                    this._attr("_y", e)
                });
                this.__defineSetter__("w", function(e) {
                    this._attr("_w", e)
                });
                this.__defineSetter__("h", function(e) {
                    this._attr("_h", e)
                });
                this.__defineSetter__("z", function(e) {
                    this._attr("_z", e)
                });
                this.__defineSetter__("rotation", function(e) {
                    this._attr("_rotation", e)
                });
                this.__defineSetter__("alpha", function(e) {
                    this._attr("_alpha", e)
                });
                this.__defineSetter__("visible", function(e) {
                    this._attr("_visible", e)
                });
                this.__defineGetter__("x", function() {
                    return this._x
                });
                this.__defineGetter__("y", function() {
                    return this._y
                });
                this.__defineGetter__("w", function() {
                    return this._w
                });
                this.__defineGetter__("h", function() {
                    return this._h
                });
                this.__defineGetter__("z", function() {
                    return this._z
                });
                this.__defineGetter__("rotation", function() {
                    return this._rotation
                });
                this.__defineGetter__("alpha", function() {
                    return this._alpha
                });
                this.__defineGetter__("visible", function() {
                    return this._visible
                });
                this.__defineGetter__("parent", function() {
                    return this._parent
                });
                this.__defineGetter__("numChildren", function() {
                    return this._children.length
                })
            } else {
                if (i.support.defineProperty) {
                    Object.defineProperty(this, "x", {
                        set: function(e) {
                            this._attr("_x", e)
                        },
                        get: function() {
                            return this._x
                        }
                    });
                    Object.defineProperty(this, "y", {
                        set: function(e) {
                            this._attr("_y", e)
                        },
                        get: function() {
                            return this._y
                        }
                    });
                    Object.defineProperty(this, "w", {
                        set: function(e) {
                            this._attr("_w", e)
                        },
                        get: function() {
                            return this._w
                        }
                    });
                    Object.defineProperty(this, "h", {
                        set: function(e) {
                            this._attr("_h", e)
                        },
                        get: function() {
                            return this._h
                        }
                    });
                    Object.defineProperty(this, "z", {
                        set: function(e) {
                            this._attr("_z", e)
                        },
                        get: function() {
                            return this._z
                        }
                    });
                    Object.defineProperty(this, "rotation", {
                        set: function(e) {
                            this._attr("_rotation", e)
                        },
                        get: function() {
                            return this._rotation
                        }
                    });
                    Object.defineProperty(this, "alpha", {
                        set: function(e) {
                            this._attr("_alpha", e)
                        },
                        get: function() {
                            return this._alpha
                        }
                    });
                    Object.defineProperty(this, "visible", {
                        set: function(e) {
                            this._attr("_visible", e)
                        },
                        get: function() {
                            return this._visible
                        }
                    })
                } else {
                    this.x = this._x;
                    this.y = this._y;
                    this.w = this._w;
                    this.h = this._h;
                    this.z = this._z;
                    this.rotation = this._rotation;
                    this.alpha = this._alpha;
                    this.visible = this._visible;
                    this.bind("EnterFrame", function() {
                        if (this.x !== this._x || this.y !== this._y || this.w !== this._w || this.h !== this._h || this.z !== this._z || this.rotation !== this._rotation || this.alpha !== this._alpha || this.visible !== this._visible) {
                            var e = this.mbr() || this.pos();
                            if (this.rotation !== this._rotation) {
                                this._rotate(this.rotation)
                            } else {
                                var o = this._mbr, n = false;
                                if (o) {
                                    if (this.x !== this._x) {
                                        o._x -= this.x - this._x;
                                        n = true
                                    } else {
                                        if (this.y !== this._y) {
                                            o._y -= this.y - this._y;
                                            n = true
                                        } else {
                                            if (this.w !== this._w) {
                                                o._w -= this.w - this._w;
                                                n = true
                                            } else {
                                                if (this.h !== this._h) {
                                                    o._h -= this.h - this._h;
                                                    n = true
                                                } else {
                                                    if (this.z !== this._z) {
                                                        o._z -= this.z - this._z;
                                                        n = true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (n) {
                                    this.trigger("Move", e)
                                }
                            }
                            this._x = this.x;
                            this._y = this.y;
                            this._w = this.w;
                            this._h = this.h;
                            this._z = this.z;
                            this._rotation = this.rotation;
                            this._alpha = this.alpha;
                            this._visible = this.visible;
                            this.trigger("Change", e);
                            this.trigger("Move", e)
                        }
                    })
                }
            }
            this._entry = i.map.insert(this);
            this.bind("Move", function(o) {
                var n = this._mbr || this;
                this._entry.update(n);
                this._cascade(o)
            });
            this.bind("Rotate", function(o) {
                var n = this._mbr || this;
                this._entry.update(n);
                this._cascade(o)
            });
            this.bind("Remove", function() {
                i.map.remove(this);
                this.detach()
            })
        },
        _rotate: function(y) {
            var x =- 1 * (y%360), H = x * j, w = Math.cos(H), A = Math.sin(H), z = {
                x: this._origin.x + this._x,
                y: this._origin.y + this._y
            };
            if (!x) {
                this._mbr = null;
                if (!this._rotation%360) {
                    return 
                }
            }
            var E = z.x + (this._x - z.x) * w + (this._y - z.y) * A, r = z.y - (this._x - z.x) * A + (this._y - z.y) * w, D = z.x + (this._x + this._w - z.x) * w + (this._y - z.y) * A, p = z.y - (this._x + this._w - z.x) * A + (this._y - z.y) * w, C = z.x + (this._x + this._w - z.x) * w + (this._y + this._h - z.y) * A, n = z.y - (this._x + this._w - z.x) * A + (this._y + this._h - z.y) * w, B = z.x + (this._x - z.x) * w + (this._y + this._h - z.y) * A, e = z.y - (this._x - z.x) * A + (this._y + this._h - z.y) * w, u = Math.floor(Math.min(E, D, C, B)), s = Math.floor(Math.min(r, p, n, e)), t = Math.ceil(Math.max(E, D, C, B)), q = Math.ceil(Math.max(r, p, n, e));
            this._mbr = {
                _x: u,
                _y: s,
                _w: t - u,
                _h: q - s
            };
            var G = this._rotation - y, F = G * j;
            this.trigger("Rotate", {
                cos: Math.cos(F),
                sin: Math.sin(F),
                deg: G,
                rad: F,
                o: {
                    x: z.x,
                    y: z.y
                },
                matrix: {
                    M11: w,
                    M12: A,
                    M21: - A,
                    M22: w
                }
            })
        },
        area: function() {
            return this._w * this._h
        },
        intersect: function(e, r, n, o) {
            var p, q = this._mbr || this;
            if (typeof e === "object") {
                p = e
            } else {
                p = {
                    x: e,
                    y: r,
                    w: n,
                    h: o
                }
            }
            return q._x < p.x + p.w && q._x + q._w > p.x && q._y < p.y + p.h && q._h + q._y > p.y
        },
        within: function(e, q, n, o) {
            var p;
            if (typeof e === "object") {
                p = e
            } else {
                p = {
                    x: e,
                    y: q,
                    w: n,
                    h: o
                }
            }
            return p.x <= this.x && p.x + p.w >= this.x + this.w && p.y <= this.y && p.y + p.h >= this.y + this.h
        },
        contains: function(e, q, n, o) {
            var p;
            if (typeof e === "object") {
                p = e
            } else {
                p = {
                    x: e,
                    y: q,
                    w: n,
                    h: o
                }
            }
            return p.x >= this.x && p.x + p.w <= this.x + this.w && p.y >= this.y && p.y + p.h <= this.y + this.h
        },
        pos: function() {
            return {
                _x: (this._x),
                _y: (this._y),
                _w: (this._w),
                _h: (this._h)
            }
        },
        mbr: function() {
            if (!this._mbr) {
                return this.pos()
            }
            return {
                _x: (this._mbr._x),
                _y: (this._mbr._y),
                _w: (this._mbr._w),
                _h: (this._mbr._h)
            }
        },
        isAt: function(e, n) {
            if (this.map) {
                return this.map.containsPoint(e, n)
            }
            return this.x <= e && this.x + this.w >= e && this.y <= n && this.y + this.h >= n
        },
        move: function(e, n) {
            if (e.charAt(0) === "n") {
                this.y -= n
            }
            if (e.charAt(0) === "s") {
                this.y += n
            }
            if (e === "e" || e.charAt(1) === "e") {
                this.x += n
            }
            if (e === "w" || e.charAt(1) === "w") {
                this.x -= n
            }
            return this
        },
        shift: function(e, p, n, o) {
            if (e) {
                this.x += e
            }
            if (p) {
                this.y += p
            }
            if (n) {
                this.w += n
            }
            if (o) {
                this.h += o
            }
            return this
        },
        _cascade: function(s) {
            if (!s) {
                return 
            }
            var r = 0, o = this._children, p = o.length, q;
            if (s.cos) {
                for (; r < p; ++r) {
                    q = o[r];
                    if ("rotate" in q) {
                        q.rotate(s)
                    }
                }
            } else {
                var u = this._mbr || this, w = u._x - s._x, v = u._y - s._y, n = u._w - s._w, t = u._h - s._h;
                for (; r < p; ++r) {
                    q = o[r];
                    q.shift(w, v, n, t)
                }
            }
        },
        attach: function() {
            var o = 0, e = arguments, n = arguments.length, p;
            for (; o < n; ++o) {
                p = e[o];
                if (p._parent) {
                    p._parent.detach(p)
                }
                p._parent = this;
                this._children.push(p)
            }
            return this
        },
        detach: function(n) {
            if (!n) {
                for (var e = 0; e < this._children.length; e++) {
                    this._children[e]._parent = null
                }
                this._children = [];
                return this
            }
            for (var e = 0; e < this._children.length; e++) {
                if (this._children[e] == n) {
                    this._children.splice(e, 1)
                }
            }
            n._parent = null;
            return this
        },
        origin: function(e, o) {
            if (typeof e === "string") {
                if (e === "centre" || e === "center" || e.indexOf(" ")===-1) {
                    e = this._w / 2;
                    o = this._h / 2
                } else {
                    var n = e.split(" ");
                    if (n[0] === "top") {
                        o = 0
                    } else {
                        if (n[0] === "bottom") {
                            o = this._h
                        } else {
                            if (n[0] === "middle" || n[1] === "center" || n[1] === "centre") {
                                o = this._h / 2
                            }
                        }
                    }
                    if (n[1] === "center" || n[1] === "centre" || n[1] === "middle") {
                        e = this._w / 2
                    } else {
                        if (n[1] === "left") {
                            e = 0
                        } else {
                            if (n[1] === "right") {
                                e = this._w
                            }
                        }
                    }
                }
            }
            this._origin.x = e;
            this._origin.y = o;
            return this
        },
        flip: function(e) {
            e = e || "X";
            this["_flip" + e] = true;
            this.trigger("Change")
        },
        rotate: function(n) {
            this._origin.x = n.o.x - this._x;
            this._origin.y = n.o.y - this._y;
            this._attr("_rotation", n.theta)
        },
        _attr: function(n, o) {
            var q = this.pos(), e = this.mbr() || q;
            if (n === "_rotation") {
                this._rotate(o)
            } else {
                if (n === "_z") {
                    this._global = parseInt(o + i.zeroFill(this[0], 5), 10);
                    this.trigger("reorder")
                } else {
                    if (n == "_x" || n === "_y" || n === "_w" || n === "_h") {
                        var p = this._mbr;
                        if (p) {
                            p[n] -= this[n] - o
                        }
                        this[n] = o;
                        this.trigger("Move", e)
                    }
                }
            }
            this[n] = o;
            this.trigger("Change", e)
        }
    });
    i.c("Physics", {
        _gravity: 0.4,
        _friction: 0.2,
        _bounce: 0.5,
        gravity: function(e) {
            this._gravity = e
        }
    });
    i.c("Gravity", {
        _gravity: 0.2,
        _gy: 0,
        _falling: true,
        _anti: null,
        init: function() {
            this.requires("2D")
        },
        gravity: function(e) {
            if (e) {
                this._anti = e
            }
            this.bind("EnterFrame", this._enterframe);
            return this
        },
        _enterframe: function() {
            if (this._falling) {
                this._gy += this._gravity * 2;
                this.y += this._gy
            } else {
                this._gy = 0
            }
            var r, p = false, s = this.pos(), o, n = 0, e;
            s._y++;
            s.x = s._x;
            s.y = s._y;
            s.w = s._w;
            s.h = s._h;
            o = i.map.search(s);
            e = o.length;
            for (; n < e; ++n) {
                r = o[n];
                if (r !== this && r.has(this._anti) && r.intersect(s)) {
                    p = r;
                    break
                }
            }
            if (p) {
                if (this._falling) {
                    this.stopFalling(p)
                }
            } else {
                this._falling = true
            }
        },
        stopFalling: function(n) {
            if (n) {
                this.y = n._y - this._h
            }
            this._falling = false;
            if (this._up) {
                this._up = false
            }
            this.trigger("hit")
        },
        antigravity: function() {
            this.unbind("EnterFrame", this._enterframe)
        }
    });
    i.polygon = function(e) {
        if (arguments.length > 1) {
            e = Array.prototype.slice.call(arguments, 0)
        }
        this.points = e
    };
    i.polygon.prototype = {
        containsPoint: function(e, s) {
            var q = this.points, o, n, r = false;
            for (o = 0, n = q.length-1; o < q.length; n = o++) {
                if (((q[o][1] > s) != (q[n][1] > s)) && (e < (q[n][0] - q[o][0]) * (s - q[o][1]) / (q[n][1] - q[o][1]) + q[o][0])) {
                    r=!r
                }
            }
            return r
        },
        shift: function(e, q) {
            var o = 0, n = this.points.length, p;
            for (; o < n; o++) {
                p = this.points[o];
                p[0] += e;
                p[1] += q
            }
        },
        rotate: function(r) {
            var p = 0, o = this.points.length, q, n, s;
            for (; p < o; p++) {
                q = this.points[p];
                n = r.o.x + (q[0] - r.o.x) * r.cos + (q[1] - r.o.y) * r.sin;
                s = r.o.y - (q[0] - r.o.x) * r.sin + (q[1] - r.o.y) * r.cos;
                q[0] = Math.floor(n);
                q[1] = Math.floor(s)
            }
        }
    };
    i.circle = function(n, q, e) {
        this.x = n;
        this.y = q;
        this.radius = e;
        this.points = [];
        var p;
        for (var o = 0; o < 8; o++) {
            p = o * Math.PI / 4;
            this.points[o] = [Math.sin(p) * e, Math.cos(p) * e]
        }
    };
    i.circle.prototype = {
        containsPoint: function(o, r) {
            var n = this.radius, q = Math.sqrt, p = this.x - o, e = this.y - r;
            return (p * p + e * e) < (n * n)
        },
        shift: function(e, q) {
            this.x += e;
            this.y += q;
            var o = 0, n = this.points.length, p;
            for (; o < n; o++) {
                p = this.points[o];
                p[0] += e;
                p[1] += q
            }
        },
        rotate: function() {}
    };
    i.matrix = function(e) {
        this.mtx = e;
        this.width = e[0].length;
        this.height = e.length
    };
    i.matrix.prototype = {
        x: function(n) {
            if (this.width != n.height) {
                return 
            }
            var e = [];
            for (var q = 0; q < this.height; q++) {
                e[q] = [];
                for (var p = 0; p < n.width; p++) {
                    var r = 0;
                    for (var o = 0; o < this.width; o++) {
                        r += this.mtx[q][o] * n.mtx[o][p]
                    }
                    e[q][p] = r
                }
            }
            return new i.matrix(e)
        },
        e: function(n, e) {
            if (n < 1 || n > this.mtx.length || e < 1 || e > this.mtx[0].length) {
                return null
            }
            return this.mtx[n-1][e-1]
        }
    };
    i.c("Collision", {
        init: function() {
            this.requires("2D")
        },
        collision: function(n) {
            var e = this._mbr || this;
            if (!n) {
                n = new i.polygon([0, 0], [e._w, 0], [e._w, e._h], [0, e._h])
            }
            this.map = n;
            this.attach(this.map);
            this.map.shift(e._x, e._y);
            return this
        },
        hit: function(u) {
            var n = this._mbr || this, r = i.map.search(n, false), s = 0, p = r.length, y = {}, e, q, t, x, v = ("map" in this && "containsPoint" in this.map), o = [];
            if (!p) {
                return false
            }
            for (; s < p; ++s) {
                q = r[s];
                t = q._mbr || q;
                if (!q) {
                    continue
                }
                e = q[0];
                if (!y[e] && this[0] !== e && q.__c[u] && t._x < n._x + n._w && t._x + t._w > n._x && t._y < n._y + n._h && t._h + t._y > n._y) {
                    y[e] = q
                }
            }
            for (x in y) {
                q = y[x];
                if (v && "map" in q) {
                    var w = this._SAT(this.map, q.map);
                    w.obj = q;
                    w.type = "SAT";
                    if (w) {
                        o.push(w)
                    }
                } else {
                    o.push({
                        obj: q,
                        type: "MBR"
                    })
                }
            }
            if (!o.length) {
                return false
            }
            return o
        },
        onHit: function(o, p, e) {
            var n = false;
            this.bind("EnterFrame", function() {
                var q = this.hit(o);
                if (q) {
                    n = true;
                    p.call(this, q)
                } else {
                    if (n) {
                        if (typeof e == "function") {
                            e.call(this)
                        }
                        n = false
                    }
                }
            });
            return this
        },
        _SAT: function(r, q) {
            var E = r.points, D = q.points, B = 0, x = E.length, A, z = D.length, G = {
                x: 0,
                y: 0
            }, n, y, v, w, u, F, o = null, e = 0, s = null, t, C, p;
            for (; B < x; B++) {
                C = E[(B == x-1 ? 0 : B + 1)];
                p = E[B];
                G.x =- (C[1] - p[1]);
                G.y = (C[0] - p[0]);
                n = Math.sqrt(G.x * G.x + G.y * G.y);
                G.x/=n;
                G.y/=n;
                y = v =- 1;
                w = u =- 1;
                for (A = 0; A < x; ++A) {
                    t = E[A][0] * G.x + E[A][1] * G.y;
                    if (t > w || w===-1) {
                        w = t
                    }
                    if (t < y || y===-1) {
                        y = t
                    }
                }
                for (A = 0; A < z; ++A) {
                    t = D[A][0] * G.x + D[A][1] * G.y;
                    if (t > u || u===-1) {
                        u = t
                    }
                    if (t < v || v===-1) {
                        v = t
                    }
                }
                F = (y < v) ? v - w : y - u;
                if (F > 0) {
                    return false
                }
                if (F > o || o === null) {
                    o = F
                }
            }
            for (B = 0; B < z; B++) {
                C = D[(B == z-1 ? 0 : B + 1)];
                p = D[B];
                G.x =- (C[1] - p[1]);
                G.y = (C[0] - p[0]);
                n = Math.sqrt(G.x * G.x + G.y * G.y);
                G.x/=n;
                G.y/=n;
                y = v =- 1;
                w = u =- 1;
                for (A = 0; A < x; ++A) {
                    t = E[A][0] * G.x + E[A][1] * G.y;
                    if (t > w || w===-1) {
                        w = t
                    }
                    if (t < y || y===-1) {
                        y = t
                    }
                }
                for (A = 0; A < z; ++A) {
                    t = D[A][0] * G.x + D[A][1] * G.y;
                    if (t > u || u===-1) {
                        u = t
                    }
                    if (t < v || v===-1) {
                        v = t
                    }
                }
                F = (y < v) ? v - w : y - u;
                if (F > 0) {
                    return false
                }
                if (F > o || o === null) {
                    o = F
                }
                if (F < e) {
                    e = F;
                    s = {
                        x: G.x,
                        y: G.y
                    }
                }
            }
            return {
                overlap: o,
                normal: s
            }
        }
    });
    i.c("DOM", {
        _element: null,
        init: function() {
            this._element = h.createElement("div");
            i.stage.inner.appendChild(this._element);
            this._element.style.position = "absolute";
            this._element.id = "ent" + this[0];
            this.bind("Change", function() {
                if (!this._changed) {
                    this._changed = true;
                    i.DrawManager.add(this)
                }
            });
            function e() {
                var n = 0, p = this.__c, o = "";
                for (n in p) {
                    o += " " + n
                }
                o = o.substr(1);
                this._element.className = o
            }
            this.bind("NewComponent", e).bind("RemoveComponent", e);
            if (i.support.prefix === "ms" && i.support.version < 9) {
                this._filters = {};
                this.bind("Rotate", function(t) {
                    var n = t.matrix, s = this._element.style, p = n.M11.toFixed(8), o = n.M12.toFixed(8), r = n.M21.toFixed(8), q = n.M22.toFixed(8);
                    this._filters.rotation = "progid:DXImageTransform.Microsoft.Matrix(M11=" + p + ", M12=" + o + ", M21=" + r + ", M22=" + q + ",sizingMethod='auto expand')"
                })
            }
            this.bind("Remove", this.undraw)
        },
        DOM: function(e) {
            if (e && e.nodeType) {
                this.undraw();
                this._element = e;
                this._element.style.position = "absolute"
            }
            return this
        },
        draw: function() {
            var o = this._element.style, r = this.__coord || [0, 0, 0, 0], q = {
                x: r[0],
                y: r[1]
            }, p = i.support.prefix, n = [];
            if (!this._visible) {
                o.visibility = "hidden"
            } else {
                o.visibility = "visible"
            }
            if (i.support.css3dtransform) {
                n.push("translate3d(" + (~~this._x) + "px," + (~~this._y) + "px,0)")
            } else {
                o.top = Number(this._y) + "px";
                o.left = Number(this._x) + "px"
            }
            o.width=~~(this._w) + "px";
            o.height=~~(this._h) + "px";
            o.zIndex = this._z;
            o.opacity = this._alpha;
            o[p + "Opacity"] = this._alpha;
            if (p === "ms" && i.support.version < 9) {
                if (i.support.version === 8) {
                    this._filters.alpha = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + (this._alpha * 100) + ")"
                } else {
                    this._filters.alpha = "alpha(opacity=" + (this._alpha * 100) + ")"
                }
            }
            if (this._mbr) {
                var e = this._origin.x + "px " + this._origin.y + "px";
                o.transformOrigin = e;
                o[p + "TransformOrigin"] = e;
                if (i.support.css3dtransform) {
                    n.push("rotateZ(" + this._rotation + "deg)")
                } else {
                    n.push("rotate(" + this._rotation + "deg)")
                }
            }
            if (this._flipX) {
                n.push("scaleX(-1)");
                if (p === "ms" && i.support.version < 9) {
                    this._filters.flipX = "fliph"
                }
            }
            if (this._flipY) {
                n.push("scaleY(-1)");
                if (p === "ms" && i.support.version < 9) {
                    this._filters.flipY = "flipv"
                }
            }
            if (p === "ms" && i.support.version < 9) {
                this.applyFilters()
            }
            o.transform = n.join(" ");
            o[p + "Transform"] = n.join(" ");
            this.trigger("Draw", {
                style: o,
                type: "DOM",
                co: q
            });
            return this
        },
        applyFilters: function() {
            this._element.style.filter = "";
            var n = "";
            for (var e in this._filters) {
                if (!this._filters.hasOwnProperty(e)) {
                    continue
                }
                n += this._filters[e] + " "
            }
            this._element.style.filter = n
        },
        undraw: function() {
            i.stage.inner.removeChild(this._element);
            return this
        },
        css: function(q, p) {
            var e, o = this._element, r, n = o.style;
            if (typeof q === "object") {
                for (e in q) {
                    if (!q.hasOwnProperty(e)) {
                        continue
                    }
                    r = q[e];
                    if (typeof r === "number") {
                        r += "px"
                    }
                    n[i.DOM.camelize(e)] = r
                }
            } else {
                if (p) {
                    if (typeof p === "number") {
                        p += "px"
                    }
                    n[i.DOM.camelize(q)] = p
                } else {
                    return i.DOM.getStyle(o, q)
                }
            }
            this.trigger("Change");
            return this
        }
    });
    try {
        h.execCommand("BackgroundImageCache", false, true)
    } catch (d) {}
    i.extend({
        DOM: {
            window: {
                init: function() {
                    this.width = f.innerWidth || (f.document.documentElement.clientWidth || f.document.body.clientWidth);
                    this.height = f.innerHeight || (f.document.documentElement.clientHeight || f.document.body.clientHeight)
                },
                width: 0,
                height: 0
            },
            inner: function(q) {
                var p = q.getBoundingClientRect(), e = p.left + (f.pageXOffset ? f.pageXOffset : h.body.scrollTop), r = p.top + (f.pageYOffset ? f.pageYOffset : h.body.scrollLeft), o, n;
                o = parseInt(this.getStyle(q, "border-left-width") || 0, 10);
                n = parseInt(this.getStyle(q, "border-top-width") || 0, 10);
                if (!o ||!n) {
                    o = parseInt(this.getStyle(q, "borderLeftWidth") || 0, 10);
                    n = parseInt(this.getStyle(q, "borderTopWidth") || 0, 10)
                }
                e += o;
                r += n;
                return {
                    x: e,
                    y: r
                }
            },
            getStyle: function(n, o) {
                var e;
                if (n.currentStyle) {
                    e = n.currentStyle[this.camelize(o)]
                } else {
                    if (f.getComputedStyle) {
                        e = h.defaultView.getComputedStyle(n, null).getPropertyValue(this.csselize(o))
                    }
                }
                return e
            },
            camelize: function(e) {
                return e.replace(/-+(.)?/g, function(n, o) {
                    return o ? o.toUpperCase() : ""
                })
            },
            csselize: function(e) {
                return e.replace(/[A-Z]/g, function(n) {
                    return n ? "-" + n.toLowerCase() : ""
                })
            },
            translate: function(e, n) {
                return {
                    x: e - i.stage.x + h.body.scrollLeft + h.documentElement.scrollLeft - i.viewport._x,
                    y: n - i.stage.y + h.body.scrollTop + h.documentElement.scrollTop - i.viewport._y
                }
            }
        }
    });
    i.c("HTML", {
        inner: "",
        init: function() {
            this.requires("2D, DOM")
        },
        replace: function(e) {
            this.inner = e;
            this._element.innerHTML = e
        },
        append: function(e) {
            this.inner += e;
            this._element.innerHTML += e
        },
        prepend: function(e) {
            this.inner = e + this.inner;
            this._element.innerHTML = e + this.inner
        }
    });
    i.extend({
        randRange: function(n, e) {
            return Math.floor(Math.random() * (e - n + 1) + n)
        },
        zeroFill: function(n, e) {
            e -= n.toString().length;
            if (e > 0) {
                return new Array(e + (/\./.test(n) ? 2 : 1)).join("0") + n
            }
            return n.toString()
        },
        sprite: function(t, p, n, e, q, o) {
            var v, B, z, u, A, s, r;
            if (typeof t === "string") {
                e = n;
                n = p;
                t = 1;
                p = 1
            }
            if (typeof p == "string") {
                e = n;
                n = p;
                p = t
            }
            if (!o && q) {
                o = q
            }
            q = parseInt(q || 0, 10);
            o = parseInt(o || 0, 10);
            r = i.assets[n];
            if (!r) {
                r = new Image();
                r.src = n;
                i.assets[n] = r;
                r.onload = function() {
                    for (var w in e) {
                        i(w).each(function() {
                            this.ready = true;
                            this.trigger("Change")
                        })
                    }
                }
            }
            for (v in e) {
                if (!e.hasOwnProperty(v)) {
                    continue
                }
                B = e[v];
                z = B[0] * (t + q);
                u = B[1] * (p + o);
                A = B[2] * t || t;
                s = B[3] * p || p;
                i.c(v, {
                    ready: false,
                    __coord: [z, u, A, s],
                    init: function() {
                        this.requires("Sprite");
                        this.__trim = [0, 0, 0, 0];
                        this.__image = n;
                        this.__coord = [this.__coord[0], this.__coord[1], this.__coord[2], this.__coord[3]];
                        this.__tile = t;
                        this.__tileh = p;
                        this.__padding = [q, o];
                        this.img = r;
                        if (this.img.complete && this.img.width > 0) {
                            this.ready = true;
                            this.trigger("Change")
                        }
                        this.w = this.__coord[2];
                        this.h = this.__coord[3]
                    }
                })
            }
            return this
        },
        _events: {},
        addEvent: function(e, q, p, o) {
            if (arguments.length === 3) {
                o = p;
                p = q;
                q = f.document
            }
            var n = function(s) {
                var s = s || f.event;
                o.call(e, s)
            }, r = e[0] || "";
            if (!this._events[r + q + p + o]) {
                this._events[r + q + p + o] = n
            } else {
                return 
            }
            if (q.attachEvent) {
                q.attachEvent("on" + p, n)
            } else {
                q.addEventListener(p, n, false)
            }
        },
        removeEvent: function(e, q, p, o) {
            if (arguments.length === 3) {
                o = p;
                p = q;
                q = f.document
            }
            var r = e[0] || "", n = this._events[r + q + p + o];
            if (n) {
                if (q.detachEvent) {
                    q.detachEvent("on" + p, n)
                } else {
                    q.removeEventListener(p, n, false)
                }
                delete this._events[r + q + p + o]
            }
        },
        background: function(e) {
            i.stage.elem.style.background = e
        },
        viewport: {
            width: 0,
            height: 0,
            _x: 0,
            _y: 0,
            scroll: function(q, e) {
                e = Math.floor(e);
                var r = (e - this[q]), o = i.canvas.context, p = i.stage.inner.style, n;
                this[q] = e;
                if (q == "_x") {
                    if (o) {
                        o.translate(r, 0)
                    }
                } else {
                    if (o) {
                        o.translate(0, r)
                    }
                }
                if (o) {
                    i.DrawManager.drawAll()
                }
                p[q == "_x" ? "left": "top"]=~~e + "px"
            },
            rect: function() {
                return {
                    _x: - this._x,
                    _y: - this._y,
                    _w: this.width,
                    _h: this.height
                }
            },
            init: function(e, o) {
                i.DOM.window.init();
                this.width = (!e || i.mobile) ? i.DOM.window.width : e;
                this.height = (!o || i.mobile) ? i.DOM.window.height : o;
                var q = h.getElementById("cr-stage");
                i.stage = {
                    x: 0,
                    y: 0,
                    fullscreen: false,
                    elem: (q ? q : h.createElement("div")),
                    inner: h.createElement("div")
                };
                if ((!e&&!o) || i.mobile) {
                    h.body.style.overflow = "hidden";
                    i.stage.fullscreen = true
                }
                i.addEvent(this, f, "resize", function() {
                    i.DOM.window.init();
                    var t = i.DOM.window.width, u = i.DOM.window.height, v;
                    if (i.stage.fullscreen) {
                        this.width = t;
                        this.height = u;
                        i.stage.elem.style.width = t + "px";
                        i.stage.elem.style.height = u + "px";
                        if (i._canvas) {
                            i._canvas.width = t + "px";
                            i._canvas.height = u + "px";
                            i.DrawManager.drawAll()
                        }
                    }
                    v = i.DOM.inner(i.stage.elem);
                    i.stage.x = v.x;
                    i.stage.y = v.y
                });
                i.addEvent(this, f, "blur", function() {
                    if (i.settings.get("autoPause")) {
                        i.pause()
                    }
                });
                i.addEvent(this, f, "focus", function() {
                    if (i._paused) {
                        i.pause()
                    }
                });
                i.settings.register("stageSelectable", function(t) {
                    i.stage.elem.onselectstart = t ? function() {
                        return true
                    } : function() {
                        return false
                    }
                });
                i.settings.modify("stageSelectable", false);
                i.settings.register("stageContextMenu", function(t) {
                    i.stage.elem.oncontextmenu = t ? function() {
                        return true
                    } : function() {
                        return false
                    }
                });
                i.settings.modify("stageContextMenu", false);
                i.settings.register("autoPause", function() {});
                i.settings.modify("autoPause", false);
                if (!q) {
                    h.body.appendChild(i.stage.elem);
                    i.stage.elem.id = "cr-stage"
                }
                var p = i.stage.elem.style, s;
                i.stage.elem.appendChild(i.stage.inner);
                i.stage.inner.style.position = "absolute";
                i.stage.inner.style.zIndex = "1";
                p.width = this.width + "px";
                p.height = this.height + "px";
                p.overflow = "hidden";
                if (i.mobile) {
                    p.position = "absolute";
                    p.left = "0px";
                    p.top = "0px";
                    var r = h.createElement("meta"), n = h.getElementsByTagName("HEAD")[0];
                    r.setAttribute("name", "viewport");
                    r.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no");
                    n.appendChild(r);
                    r = h.createElement("meta");
                    r.setAttribute("name", "apple-mobile-web-app-capable");
                    r.setAttribute("content", "yes");
                    n.appendChild(r);
                    setTimeout(function() {
                        f.scrollTo(0, 1)
                    }, 0);
                    i.addEvent(this, f, "touchmove", function(t) {
                        t.preventDefault()
                    });
                    i.stage.x = 0;
                    i.stage.y = 0
                } else {
                    p.position = "relative";
                    s = i.DOM.inner(i.stage.elem);
                    i.stage.x = s.x;
                    i.stage.y = s.y
                }
                if (i.support.setter) {
                    this.__defineSetter__("x", function(t) {
                        this.scroll("_x", t)
                    });
                    this.__defineSetter__("y", function(t) {
                        this.scroll("_y", t)
                    });
                    this.__defineGetter__("x", function() {
                        return this._x
                    });
                    this.__defineGetter__("y", function() {
                        return this._y
                    })
                } else {
                    if (i.support.defineProperty) {
                        Object.defineProperty(this, "x", {
                            set: function(t) {
                                this.scroll("_x", t)
                            },
                            get: function() {
                                return this._x
                            }
                        });
                        Object.defineProperty(this, "y", {
                            set: function(t) {
                                this.scroll("_y", t)
                            },
                            get: function() {
                                return this._y
                            }
                        })
                    } else {
                        this.x = this._x;
                        this.y = this._y;
                        i.e("viewport")
                    }
                }
            }
        },
        support: {},
        keys: {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            PAUSE: 19,
            CAPS: 20,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            INSERT: 45,
            DELETE: 46,
            "0": 48,
            "1": 49,
            "2": 50,
            "3": 51,
            "4": 52,
            "5": 53,
            "6": 54,
            "7": 55,
            "8": 56,
            "9": 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_0: 96,
            NUMPAD_1: 97,
            NUMPAD_2: 98,
            NUMPAD_3: 99,
            NUMPAD_4: 100,
            NUMPAD_5: 101,
            NUMPAD_6: 102,
            NUMPAD_7: 103,
            NUMPAD_8: 104,
            NUMPAD_9: 105,
            MULTIPLY: 106,
            ADD: 107,
            SUBSTRACT: 109,
            DECIMAL: 110,
            DIVIDE: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PLUS: 187,
            COMMA: 188,
            MINUS: 189,
            PERIOD: 190
        }
    });
    (function b() {
        var p = i.support, o = navigator.userAgent.toLowerCase(), n = /(webkit)[ \/]([\w.]+)/.exec(o) || /(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(o) || /(ms)ie ([\w.]+)/.exec(o) || /(moz)illa(?:.*? rv:([\w.]+))?/.exec(o) || [], e = /iPad|iPod|iPhone|Android|webOS/i.exec(o);
        if (e) {
            i.mobile = e[0]
        }
        p.setter = ("__defineSetter__" in this && "__defineGetter__" in this);
        p.defineProperty = (function() {
            if (!"defineProperty" in Object) {
                return false
            }
            try {
                Object.defineProperty({}, "x", {})
            } catch (q) {
                return false
            }
            return true
        })();
        p.audio = ("Audio" in f);
        p.prefix = (n[1] || n[0]);
        if (p.prefix === "moz") {
            p.prefix = "Moz"
        }
        if (p.prefix === "o") {
            p.prefix = "O"
        }
        if (n[2]) {
            p.versionName = n[2];
            p.version =+ (n[2].split("."))[0]
        }
        p.canvas = ("getContext" in h.createElement("canvas"));
        p.css3dtransform = (typeof h.createElement("div").style[p.prefix + "Perspective"] !== "undefined")
    })();
    i.c("viewport", {
        init: function() {
            this.bind("EnterFrame", function() {
                if (i.viewport._x !== i.viewport.x) {
                    i.viewport.scroll("_x", i.viewport.x)
                }
                if (i.viewport._y !== i.viewport.y) {
                    i.viewport.scroll("_y", i.viewport.y)
                }
            })
        }
    });
    i.c("Sprite", {
        __image: "",
        __tile: 0,
        __tileh: 0,
        __padding: null,
        __trim: null,
        img: null,
        ready: false,
        init: function() {
            this.__trim = [0, 0, 0, 0];
            var e = function(o) {
                var p = o.co, q = o.pos, n = o.ctx;
                if (o.type === "canvas") {
                    n.drawImage(this.img, p.x, p.y, p.w, p.h, q._x, q._y, q._w, q._h)
                } else {
                    if (o.type === "DOM") {
                        this._element.style.background = "url('" + this.__image + "') no-repeat -" + p.x + "px -" + p.y + "px"
                    }
                }
            };
            this.bind("Draw", e).bind("RemoveComponent", function(n) {
                if (n === "Sprite") {
                    this.unbind("Draw", e)
                }
            })
        },
        sprite: function(e, p, n, o) {
            this.__coord = [e * this.__tile + this.__padding[0] + this.__trim[0], p * this.__tileh + this.__padding[1] + this.__trim[1], this.__trim[2] || n * this.__tile || this.__tile, this.__trim[3] || o * this.__tileh || this.__tileh];
            this.trigger("Change");
            return this
        },
        crop: function(e, q, o, p) {
            var n = this._mbr || this.pos();
            this.__trim = [];
            this.__trim[0] = e;
            this.__trim[1] = q;
            this.__trim[2] = o;
            this.__trim[3] = p;
            this.__coord[0] += e;
            this.__coord[1] += q;
            this.__coord[2] = o;
            this.__coord[3] = p;
            this._w = o;
            this._h = p;
            this.trigger("Change", n);
            return this
        }
    });
    i.c("Canvas", {
        init: function() {
            if (!i.canvas.context) {
                i.canvas.init()
            }
            i.DrawManager.total2D++;
            this.bind("Change", function(n) {
                if (this._changed === false) {
                    this._changed = i.DrawManager.add(n || this, this)
                } else {
                    if (n) {
                        this._changed = i.DrawManager.add(n, this)
                    }
                }
            });
            this.bind("Remove", function() {
                i.DrawManager.total2D--;
                i.DrawManager.add(this, this)
            })
        },
        draw: function(v, s, q, t, n) {
            if (!this.ready) {
                return 
            }
            if (arguments.length === 4) {
                n = t;
                t = q;
                q = s;
                s = v;
                v = i.canvas.context
            }
            var r = {
                _x: (this._x + (s || 0)),
                _y: (this._y + (q || 0)),
                _w: (t || this._w),
                _h: (n || this._h)
            }, e = v || i.canvas.context, o = this.__coord || [0, 0, 0, 0], p = {
                x: o[0] + (s || 0),
                y: o[1] + (q || 0),
                w: t || o[2],
                h: n || o[3]
            };
            if (this._mbr) {
                e.save();
                e.translate(this._origin.x + this._x, this._origin.y + this._y);
                r._x =- this._origin.x;
                r._y =- this._origin.y;
                e.rotate((this._rotation%360) * (Math.PI / 180))
            }
            if (this._alpha < 1) {
                var u = e.globalAlpha;
                e.globalAlpha = this._alpha
            }
            this.trigger("Draw", {
                type: "canvas",
                pos: r,
                co: p,
                ctx: e
            });
            if (this._mbr) {
                e.restore()
            }
            if (u) {
                e.globalAlpha = u
            }
            return this
        }
    });
    i.extend({
        canvas: {
            context: null,
            elem: null,
            init: function() {
                if (!i.support.canvas) {
                    i.trigger("NoCanvas");
                    i.stop();
                    return 
                }
                var e;
                e = h.createElement("canvas");
                e.width = i.viewport.width;
                e.height = i.viewport.height;
                e.style.position = "absolute";
                e.style.left = "0px";
                e.style.top = "0px";
                i.stage.elem.appendChild(e);
                i.canvas.context = e.getContext("2d");
                i.canvas._canvas = e
            }
        }
    });
    i.extend({
        down: null,
        over: null,
        mouseObjs: 0,
        mousePos: {},
        lastEvent: null,
        keydown: {},
        mouseDispatch: function(u) {
            if (!i.mouseObjs) {
                return 
            }
            i.lastEvent = u;
            var v =- 1, o, n, r = 0, p, B = i.DOM.translate(u.clientX, u.clientY), C, A, D = {}, s = u.target ? u.target : u.srcElement, z = u.type;
            if (z === "touchstart") {
                z = "mousedown"
            } else {
                if (z === "touchmove") {
                    z = "mousemove"
                } else {
                    if (z === "touchend") {
                        z = "mouseup"
                    }
                }
            }
            u.realX = C = i.mousePos.x = B.x;
            u.realY = A = i.mousePos.y = B.y;
            if (s.nodeName != "CANVAS") {
                while (typeof(s.id) != "string" && s.id.indexOf("ent")==-1) {
                    s = s.parentNode
                }
                ent = i(parseInt(s.id.replace("ent", "")));
                if (ent.has("Mouse") && ent.isAt(C, A)) {
                    o = ent
                }
            }
            if (!o) {
                n = i.map.search({
                    _x: C,
                    _y: A,
                    _w: 1,
                    _h: 1
                }, false);
                for (p = n.length; r < p; ++r) {
                    if (!n[r].__c.Mouse) {
                        continue
                    }
                    var t = n[r], w = false;
                    if (D[t[0]]) {
                        continue
                    } else {
                        D[t[0]] = true
                    }
                    if (t.map) {
                        if (t.map.containsPoint(C, A)) {
                            w = true
                        }
                    } else {
                        if (t.isAt(C, A)) {
                            w = true
                        }
                    }
                    if (w && (t._z >= v || v===-1)) {
                        if (t._z === v && t[0] < o[0]) {
                            continue
                        }
                        v = t._z;
                        o = t
                    }
                }
            }
            if (o) {
                if (z === "mousedown") {
                    this.down = o;
                    this.down.trigger("MouseDown", u)
                } else {
                    if (z === "mouseup") {
                        o.trigger("MouseUp", u);
                        if (this.down && o === this.down) {
                            this.down.trigger("Click", u)
                        }
                        this.down = null
                    } else {
                        if (z === "mousemove") {
                            if (this.over !== o) {
                                if (this.over) {
                                    this.over.trigger("MouseOut", u);
                                    this.over = null
                                }
                                this.over = o;
                                o.trigger("MouseOver", u)
                            }
                        } else {
                            o.trigger(z, u)
                        }
                    }
                }
            } else {
                if (z === "mousemove" && this.over) {
                    this.over.trigger("MouseOut", u);
                    this.over = null
                }
            }
            if (z === "mousemove") {
                this.lastEvent = u
            }
        },
        keyboardDispatch: function(n) {
            n.key = n.keyCode || n.which;
            if (n.type === "keydown") {
                if (i.keydown[n.key] !== true) {
                    i.keydown[n.key] = true;
                    i.trigger("KeyDown", n)
                }
            } else {
                if (n.type === "keyup") {
                    delete i.keydown[n.key];
                    i.trigger("KeyUp", n)
                }
            }
        }
    });
    i.bind("Load", function() {
        i.addEvent(this, "keydown", i.keyboardDispatch);
        i.addEvent(this, "keyup", i.keyboardDispatch);
        i.addEvent(this, i.stage.elem, "mousedown", i.mouseDispatch);
        i.addEvent(this, i.stage.elem, "mouseup", i.mouseDispatch);
        i.addEvent(this, i.stage.elem, "mousemove", i.mouseDispatch);
        i.addEvent(this, i.stage.elem, "touchstart", i.mouseDispatch);
        i.addEvent(this, i.stage.elem, "touchmove", i.mouseDispatch);
        i.addEvent(this, i.stage.elem, "touchend", i.mouseDispatch)
    });
    i.c("Mouse", {
        init: function() {
            i.mouseObjs++;
            this.bind("Remove", function() {
                i.mouseObjs--
            })
        },
        areaMap: function(n) {
            if (arguments.length > 1) {
                var e = Array.prototype.slice.call(arguments, 0);
                n = new i.polygon(e)
            }
            n.shift(this._x, this._y);
            this.map = n;
            this.attach(this.map);
            return this
        }
    });
    i.c("Draggable", {
        _startX: 0,
        _startY: 0,
        _dragging: false,
        _ondrag: null,
        _ondown: null,
        _onup: null,
        init: function() {
            this.requires("Mouse");
            this._ondrag = function(n) {
                var o = i.DOM.translate(n.clientX, n.clientY);
                this.x = o.x - this._startX;
                this.y = o.y - this._startY;
                this.trigger("Dragging", n)
            };
            this._ondown = function(n) {
                if (n.button !== 0) {
                    return 
                }
                this._startX = n.realX - this._x;
                this._startY = n.realY - this._y;
                this._dragging = true;
                i.addEvent(this, i.stage.elem, "mousemove", this._ondrag);
                i.addEvent(this, i.stage.elem, "mouseup", this._onup);
                this.trigger("StartDrag", n)
            };
            this._onup = function e(n) {
                i.removeEvent(this, i.stage.elem, "mousemove", this._ondrag);
                i.removeEvent(this, i.stage.elem, "mouseup", this._onup);
                this._dragging = false;
                this.trigger("StopDrag", n)
            };
            this.enableDrag()
        },
        stopDrag: function() {
            i.removeEvent(this, i.stage.elem, "mousemove", this._ondrag);
            i.removeEvent(this, i.stage.elem, "mouseup", this._onup);
            this._dragging = false;
            this.trigger("StopDrag");
            return this
        },
        startDrag: function() {
            if (!this._dragging) {
                this._dragging = true;
                i.addEvent(this, i.stage.elem, "mousemove", this._ondrag)
            }
        },
        enableDrag: function() {
            this.bind("MouseDown", this._ondown);
            i.addEvent(this, i.stage.elem, "mouseup", this._onup);
            return this
        },
        disableDrag: function() {
            this.unbind("MouseDown", this._ondown);
            this.stopDrag();
            return this
        }
    });
    i.c("Keyboard", {
        isDown: function(e) {
            if (typeof e === "string") {
                e = i.keys[e]
            }
            return !!i.keydown[e]
        }
    });
    i.c("Multiway", {
        _speed: 3,
        init: function() {
            this._keyDirection = {};
            this._keys = {};
            this._movement = {
                x: 0,
                y: 0
            }
        },
        multiway: function(o, n) {
            if (n) {
                this._speed = o
            } else {
                n = o
            }
            this._keyDirection = n;
            this.speed(this._speed);
            this.bind("KeyDown", function(p) {
                if (this._keys[p.key]) {
                    this._movement.x = Math.round((this._movement.x + this._keys[p.key].x) * 1000) / 1000;
                    this._movement.y = Math.round((this._movement.y + this._keys[p.key].y) * 1000) / 1000;
                    this.trigger("NewDirection", this._movement)
                }
            }).bind("KeyUp", function(p) {
                if (this._keys[p.key]) {
                    this._movement.x = Math.round((this._movement.x - this._keys[p.key].x) * 1000) / 1000;
                    this._movement.y = Math.round((this._movement.y - this._keys[p.key].y) * 1000) / 1000;
                    this.trigger("NewDirection", this._movement)
                }
            }).bind("EnterFrame", function() {
                if (this.disableControls) {
                    return 
                }
                if (this._movement.x !== 0) {
                    this.x += this._movement.x;
                    this.trigger("Moved", {
                        x: this.x - this._movement.x,
                        y: this.y
                    })
                }
                if (this._movement.y !== 0) {
                    this.y += this._movement.y;
                    this.trigger("Moved", {
                        x: this.x,
                        y: this.y - this._movement.y
                    })
                }
            });
            for (var e in n) {
                if (i.keydown[i.keys[e]]) {
                    this.trigger("KeyDown", {
                        key: i.keys[e]
                    })
                }
            }
            return this
        },
        speed: function(n) {
            for (var e in this._keyDirection) {
                var o = i.keys[e] || e;
                this._keys[o] = {
                    x: Math.round(Math.cos(this._keyDirection[e] * (Math.PI / 180)) * 1000 * n) / 1000,
                    y: Math.round(Math.sin(this._keyDirection[e] * (Math.PI / 180)) * 1000 * n) / 1000
                }
            }
            return this
        }
    });
    i.c("Fourway", {
        init: function() {
            this.requires("Multiway")
        },
        fourway: function(e) {
            this.multiway(e, {
                UP_ARROW: -90,
                DOWN_ARROW: 90,
                RIGHT_ARROW: 0,
                LEFT_ARROW: 180,
                W: -90,
                S: 90,
                D: 0,
                A: 180
            });
            return this
        }
    });
    i.c("Twoway", {
        _speed: 3,
        _up: false,
        init: function() {
            this.requires("Keyboard")
        },
        twoway: function(n, e) {
            if (n) {
                this._speed = n
            }
            e = e || this._speed * 2;
            this.bind("EnterFrame", function() {
                if (this.disableControls) {
                    return 
                }
                if (this.isDown("RIGHT_ARROW") || this.isDown("D")) {
                    this.x += this._speed
                }
                if (this.isDown("LEFT_ARROW") || this.isDown("A")) {
                    this.x -= this._speed
                }
                if (this._up) {
                    this.y -= e;
                    this._falling = true
                }
            }).bind("KeyDown", function() {
                if (this.isDown("UP_ARROW") || this.isDown("W")) {
                    this._up = true
                }
            });
            return this
        }
    });
    i.c("Animation", {
        _reel: null,
        init: function() {
            this._reel = {}
        },
        addAnimation: function(v, r) {
            var x, y = 0, t = 0, s, o, q, e, w = {}, n, z, u = [];
            for (x in r) {
                o = r[x];
                q = r[y] || this;
                w = {};
                for (e in o) {
                    if (typeof o[e] !== "number") {
                        w[e] = o[e];
                        continue
                    }
                    w[e] = (o[e] - q[e]) / (x - y)
                }
                for (t =+ y + 1, s = 1; t<=+x; ++t, ++s) {
                    z = {};
                    for (n in w) {
                        if (typeof w[n] === "number") {
                            z[n] = q[n] + w[n] * s
                        } else {
                            z[n] = w[n]
                        }
                    }
                    u[t] = z
                }
                y = x
            }
            this._reel[v] = u;
            return this
        },
        playAnimation: function(o) {
            var q = this._reel[o], p = 0, n = q.length, s;
            this.bind("EnterFrame", function r() {
                for (s in q[p]) {
                    this[s] = q[p][s]
                }
                p++;
                if (p > n) {
                    this.trigger("AnimationEnd");
                    this.unbind("EnterFrame", r)
                }
            })
        }
    });
    i.c("SpriteAnimation", {
        _reels: null,
        _frame: null,
        _current: null,
        init: function() {
            this._reels = {}
        },
        animate: function(e, q, v, r) {
            var p, s, t, o, n, u;
            if (arguments.length < 4 && typeof q === "number") {
                this._current = e;
                p = this._reels[e];
                n = q;
                this._frame = {
                    reel: p,
                    frameTime: Math.ceil(n / p.length),
                    frame: 0,
                    current: 0,
                    repeat: 0
                };
                if (arguments.length === 3 && typeof v === "number") {
                    if (v===-1) {
                        this._frame.repeatInfinitly = true
                    } else {
                        this._frame.repeat = v
                    }
                }
                u = this._frame.reel[0];
                this.__coord[0] = u[0];
                this.__coord[1] = u[1];
                this.bind("EnterFrame", this.drawFrame);
                return this
            }
            if (typeof q === "number") {
                s = q;
                p = [];
                t = this.__tile;
                o = this.__tileh;
                if (r > q) {
                    for (; s <= r; s++) {
                        p.push([s * t, v * o])
                    }
                } else {
                    for (; s >= r; s--) {
                        p.push([s * t, v * o])
                    }
                }
                this._reels[e] = p
            } else {
                if (typeof q === "object") {
                    s = 0;
                    p = [];
                    r = q.length-1;
                    t = this.__tile;
                    o = this.__tileh;
                    for (; s <= r; s++) {
                        u = q[s];
                        p.push([u[0] * t, u[1] * o])
                    }
                    this._reels[e] = p
                }
            }
            return this
        },
        drawFrame: function(o) {
            var n = this._frame;
            if (this._frame.current++===n.frameTime) {
                var p = n.reel[n.frame++];
                this.__coord[0] = p[0];
                this.__coord[1] = p[1];
                this._frame.current = 0
            }
            if (n.frame === n.reel.length && this._frame.current === n.frameTime) {
                n.frame = 0;
                if (this._frame.repeatInfinitly === true || this._frame.repeat > 0) {
                    if (this._frame.repeat) {
                        this._frame.repeat--
                    }
                    this._frame.current = 0;
                    this._frame.frame = 0
                } else {
                    this.trigger("AnimationEnd", {
                        reel: n.reel
                    });
                    this.stop();
                    return 
                }
            }
            this.trigger("Change")
        },
        stop: function() {
            this.unbind("EnterFrame", this.drawFrame);
            this.unbind("AnimationEnd");
            this._current = null;
            this._frame = null;
            return this
        },
        reset: function() {
            if (!this._frame) {
                return this
            }
            var e = this._frame.reel[0];
            this.__coord[0] = e[0];
            this.__coord[1] = e[1];
            this.stop();
            return this
        },
        isPlaying: function(e) {
            if (!e) {
                return !!this._interval
            }
            return this._current === e
        }
    });
    i.c("Tween", {
        _step: null,
        _numProps: 0,
        tween: function(e, n) {
            this.each(function() {
                if (this._step == null) {
                    this._step = {};
                    this.bind("EnterFrame", c);
                    this.bind("RemoveComponent", function(p) {
                        if (p == "Tween") {
                            this.unbind("EnterFrame", c)
                        }
                    })
                }
                for (var o in e) {
                    this._step[o] = {
                        val: (e[o] - this[o]) / n,
                        rem: n
                    };
                    this._numProps++
                }
            });
            return this
        }
    });
    function c(q) {
        if (this._numProps <= 0) {
            return 
        }
        var r, n;
        for (n in this._step) {
            r = this._step[n];
            this[n] += r.val;
            if (r.rem--==0) {
                this.trigger("TweenEnd", n);
                delete r;
                this._numProps--
            }
        }
        if (this.has("Mouse")) {
            var p = i.over, o = i.mousePos;
            if (p && p[0] == this[0]&&!this.isAt(o.x, o.y)) {
                this.trigger("MouseOut", i.lastEvent);
                i.over = null
            } else {
                if ((!p || p[0] != this[0]) && this.isAt(o.x, o.y)) {
                    i.over = this;
                    this.trigger("MouseOver", i.lastEvent)
                }
            }
        }
    }
    i.c("Color", {
        _color: "",
        ready: true,
        init: function() {
            this.bind("Draw", function(n) {
                if (n.type === "DOM") {
                    n.style.background = this._color;
                    n.style.lineHeight = 0
                } else {
                    if (n.type === "canvas") {
                        if (this._color) {
                            n.ctx.fillStyle = this._color
                        }
                        n.ctx.fillRect(n.pos._x, n.pos._y, n.pos._w, n.pos._h)
                    }
                }
            })
        },
        color: function(e) {
            this._color = e;
            this.trigger("Change");
            return this
        }
    });
    i.c("Tint", {
        _color: null,
        _strength: 1,
        init: function() {
            var e = function n(p) {
                var o = p.ctx || i.canvas.context;
                o.fillStyle = this._color || "rgb(0,0,0)";
                o.fillRect(p.pos._x, p.pos._y, p.pos._w, p.pos._h)
            };
            this.bind("Draw", e).bind("RemoveComponent", function(o) {
                if (o === "Tint") {
                    this.unbind("Draw", e)
                }
            })
        },
        tint: function(e, n) {
            this._strength = n;
            this._color = i.toRGB(e, this._strength);
            this.trigger("Change");
            return this
        }
    });
    i.c("Image", {
        _repeat: "repeat",
        ready: false,
        init: function() {
            var e = function(o) {
                if (o.type === "canvas") {
                    if (!this.ready ||!this._pattern) {
                        return 
                    }
                    var n = o.ctx;
                    n.fillStyle = this._pattern;
                    n.fillRect(this._x, this._y, this._w, this._h)
                } else {
                    if (o.type === "DOM") {
                        if (this.__image) {
                            o.style.background = "url(" + this.__image + ") " + this._repeat
                        }
                    }
                }
            };
            this.bind("Draw", e).bind("RemoveComponent", function(n) {
                if (n === "Image") {
                    this.unbind("Draw", e)
                }
            })
        },
        image: function(n, o) {
            this.__image = n;
            this._repeat = o || "no-repeat";
            this.img = i.assets[n];
            if (!this.img) {
                this.img = new Image();
                i.assets[n] = this.img;
                this.img.src = n;
                var e = this;
                this.img.onload = function() {
                    if (e.has("Canvas")) {
                        e._pattern = i.canvas.context.createPattern(e.img, e._repeat)
                    }
                    e.ready = true;
                    if (e._repeat === "no-repeat") {
                        e.w = e.img.width;
                        e.h = e.img.height
                    }
                    e.trigger("Change")
                };
                return this
            } else {
                this.ready = true;
                if (this.has("Canvas")) {
                    this._pattern = i.canvas.context.createPattern(this.img, this._repeat)
                }
                if (this._repeat === "no-repeat") {
                    this.w = this.img.width;
                    this.h = this.img.height
                }
            }
            this.trigger("Change");
            return this
        }
    });
    i.extend({
        _scenes: [],
        _current: null,
        scene: function(e, n) {
            if (arguments.length === 1) {
                i("2D").each(function() {
                    if (!this.has("persist")) {
                        this.destroy()
                    }
                });
                this._scenes[e].call(this);
                this._current = e;
                return 
            }
            this._scenes[e] = n;
            return 
        },
        rgbLookup: {},
        toRGB: function(n, p) {
            var o = this.rgbLookup[n];
            if (o) {
                return o
            }
            var n = (n.charAt(0) === "#") ? n.substr(1): n, q = [], e;
            q[0] = parseInt(n.substr(0, 2), 16);
            q[1] = parseInt(n.substr(2, 2), 16);
            q[2] = parseInt(n.substr(4, 2), 16);
            e = p === undefined ? "rgb(" + q.join(",") + ")" : "rgba(" + q.join(",") + "," + p + ")";
            o = e;
            return e
        }
    });
    i.DrawManager = (function() {
        var n = [], p = [];
        return {
            total2D: i("2D").length,
            onScreen: function(q) {
                return i.viewport._x + q._x + q._w > 0 && i.viewport._y + q._y + q._h > 0 && i.viewport._x + q._x < i.viewport.width && i.viewport._y + q._y < i.viewport.height
            },
            merge: function(x) {
                do {
                    var w = [], q = false, s = 0, r = x.length, v, t, u;
                    while (s < r) {
                        v = x[s];
                        t = x[s + 1];
                        if (s < r-1 && v._x < t._x + t._w && v._x + v._w > t._x && v._y < t._y + t._h && v._h + v._y > t._y) {
                            u = {
                                _x: ~~Math.min(v._x, t._x),
                                _y: ~~Math.min(v._y, t._y),
                                _w: Math.max(v._x, t._x) + Math.max(v._w, t._w),
                                _h: Math.max(v._y, t._y) + Math.max(v._h, t._h)
                            };
                            u._w = u._w - u._x;
                            u._h = u._h - u._y;
                            u._w = (u._w==~~u._w) ? u._w : u._w + 1 | 0;
                            u._h = (u._h==~~u._h) ? u._h : u._h + 1 | 0;
                            w.push(u);
                            s++;
                            q = true
                        } else {
                            w.push(v)
                        }
                        s++
                    }
                    x = w.length ? i.clone(w) : x;
                    if (q) {
                        s = 0
                    }
                }
                while (q);
                return x
            },
            add: function o(q, t) {
                if (!t) {
                    p.push(q);
                    return 
                }
                var r, s = q._mbr || q, u = t._mbr || t;
                if (q === t) {
                    r = q.mbr() || q.pos()
                } else {
                    r = {
                        _x: ~~Math.min(s._x, u._x),
                        _y: ~~Math.min(s._y, u._y),
                        _w: Math.max(s._w, u._w) + Math.max(s._x, u._x),
                        _h: Math.max(s._h, u._h) + Math.max(s._y, u._y)
                    };
                    r._w = (r._w - r._x);
                    r._h = (r._h - r._y)
                }
                if (r._w === 0 || r._h === 0 ||!this.onScreen(r)) {
                    return false
                }
                r._x=~~r._x;
                r._y=~~r._y;
                r._w = (r._w===~~r._w) ? r._w : r._w + 1 | 0;
                r._h = (r._h===~~r._h) ? r._h : r._h + 1 | 0;
                n.push(r);
                return true
            },
            debug: function() {
                console.log(n, p)
            },
            drawAll: function(u) {
                var u = u || i.viewport.rect(), v, t = 0, s, r = i.canvas.context, w;
                v = i.map.search(u);
                s = v.length;
                r.clearRect(u._x, u._y, u._w, u._h);
                v.sort(function(x, q) {
                    return x._global - q._global
                });
                for (; t < s; t++) {
                    w = v[t];
                    if (w._visible && w.__c.Canvas) {
                        w.draw();
                        w._changed = false
                    }
                }
            },
            boundingRect: function(w) {
                if (!w ||!w.length) {
                    return 
                }
                var v = [], s = 1, q = w.length, u, t = w[0], r;
                t = [t._x, t._y, t._x + t._w, t._y + t._h];
                while (s < q) {
                    u = w[s];
                    r = [u._x, u._y, u._x + u._w, u._y + u._h];
                    if (r[0] < t[0]) {
                        t[0] = r[0]
                    }
                    if (r[1] < t[1]) {
                        t[1] = r[1]
                    }
                    if (r[2] > t[2]) {
                        t[2] = r[2]
                    }
                    if (r[3] > t[3]) {
                        t[3] = r[3]
                    }
                    s++
                }
                r = t;
                t = {
                    _x: r[0],
                    _y: r[1],
                    _w: r[2] - r[0],
                    _h: r[3] - r[1]
                };
                return t
            },
            draw: function e() {
                if (!n.length&&!p.length) {
                    return 
                }
                var A = 0, t = n.length, u = p.length, G, r, v, D, K, z, E, C = [], J = i.canvas.context;
                for (; A < u; ++A) {
                    p[A].draw()._changed = false
                }
                p.length = A = 0;
                if (!t) {
                    return 
                }
                if (t / this.total2D > 0.6) {
                    this.drawAll();
                    n.length = 0;
                    return 
                }
                n = this.merge(n);
                for (; A < t; ++A) {
                    G = n[A];
                    if (!G) {
                        continue
                    }
                    r = i.map.search(G, false);
                    K = {};
                    for (v = 0, D = r.length; v < D; ++v) {
                        z = r[v];
                        if (K[z[0]] ||!z._visible ||!z.__c.Canvas) {
                            continue
                        }
                        K[z[0]] = true;
                        C.push({
                            obj: z,
                            rect: G
                        })
                    }
                    J.clearRect(G._x, G._y, G._w, G._h)
                }
                C.sort(function(w, q) {
                    return w.obj._global - q.obj._global
                });
                if (!C.length) {
                    return 
                }
                for (A = 0, t = C.length; A < t; ++A) {
                    z = C[A];
                    G = z.rect;
                    E = z.obj;
                    var s = E._mbr || E, H = (G._x - s._x <= 0) ? 0: ~~(G._x - s._x), F = (G._y - s._y < 0) ? 0: ~~(G._y - s._y), I=~~Math.min(s._w - H, G._w - (s._x - G._x), G._w, s._w), B=~~Math.min(s._h - F, G._h - (s._y - G._y), G._h, s._h);
                    if (B === 0 || I === 0) {
                        continue
                    }
                    J.save();
                    J.beginPath();
                    J.moveTo(G._x, G._y);
                    J.lineTo(G._x + G._w, G._y);
                    J.lineTo(G._x + G._w, G._h + G._y);
                    J.lineTo(G._x, G._h + G._y);
                    J.lineTo(G._x, G._y);
                    J.clip();
                    E.draw();
                    J.closePath();
                    J.restore();
                    E._changed = false
                }
                n.length = 0;
                merged = {}
            }
        }
    })();
    i.extend({
        isometric: {
            _tile: 0,
            _z: 0,
            size: function(e) {
                this._tile = e;
                return this
            },
            place: function(o, s, q, p) {
                var e = o * this._tile + (s & 1) * (this._tile / 2), r = s * this._tile / 4, r = r - q * (this._tile / 2);
                p.attr({
                    x: e + i.viewport._x,
                    y: r + i.viewport._y
                }).z += q;
                return this
            }
        }
    });
    i.extend({
        audio: {
            _elems: {},
            _muted: false,
            MAX_CHANNELS: 5,
            type: {
                mp3: "audio/mpeg;",
                ogg: 'audio/ogg; codecs="vorbis"',
                wav: 'audio/wav; codecs="1"',
                mp4: 'audio/mp4; codecs="mp4a.40.2"'
            },
            add: function(p, o) {
                if (!i.support.audio) {
                    return this
                }
                var s, w, u = new Audio(), q, v = 0, r = [];
                if (arguments.length === 1 && typeof p === "object") {
                    for (w in p) {
                        if (!p.hasOwnProperty(w)) {
                            continue
                        }
                        if (typeof p[w] !== "string") {
                            var n = p[w], v = 0, t = n.length, e;
                            for (; v < t; ++v) {
                                e = n[v];
                                ext = e.substr(e.lastIndexOf(".") + 1).toLowerCase();
                                q = u.canPlayType(this.type[ext]);
                                if (q !== "" && q !== "no") {
                                    o = e;
                                    break
                                }
                            }
                        } else {
                            o = p[w]
                        }
                        for (; v < this.MAX_CHANNELS; v++) {
                            u = new Audio(o);
                            u.preload = "auto";
                            u.load();
                            r.push(u)
                        }
                        this._elems[w] = r;
                        if (!i.assets[o]) {
                            i.assets[o] = this._elems[w][0]
                        }
                    }
                    return this
                }
                if (typeof o !== "string") {
                    var v = 0, t = o.length, e;
                    for (; v < t; ++v) {
                        e = o[v];
                        ext = e.substr(e.lastIndexOf(".") + 1);
                        q = u.canPlayType(this.type[ext]);
                        if (q !== "" && q !== "no") {
                            o = e;
                            break
                        }
                    }
                }
                for (; v < this.MAX_CHANNELS; v++) {
                    u = new Audio(o);
                    u.preload = "auto";
                    u.load();
                    r.push(u)
                }
                this._elems[p] = r;
                if (!i.assets[o]) {
                    i.assets[o] = this._elems[p][0]
                }
                return this
            },
            play: function(s, q) {
                if (!i.support.audio) {
                    return 
                }
                var e = this._elems[s], r, p = 0, n = e.length;
                for (; p < n; p++) {
                    r = e[p];
                    if (r.ended ||!r.currentTime) {
                        r.play();
                        break
                    } else {
                        if (p === n-1) {
                            r.currentTime = 0;
                            r.play()
                        }
                    }
                }
                if (typeof q == "number") {
                    var o = 0;
                    e[p].addEventListener("ended", function() {
                        if (q==-1 || o <= q) {
                            this.currentTime = 0;
                            o++
                        }
                    }, false)
                }
                return this
            },
            settings: function(t, r) {
                if (!r) {
                    for (var p in this._elems) {
                        this.settings(p, t)
                    }
                    return this
                }
                var e = this._elems[t], s, q, o = 0, n = e.length;
                for (var q in r) {
                    for (; o < n; o++) {
                        s = e[o];
                        s[q] = r[q]
                    }
                }
                return this
            },
            mute: function() {
                var e, q, o, n, p;
                for (e in this._elems) {
                    p = this._elems[e];
                    for (o = 0, n = p.length; o < n; ++o) {
                        q = p[o];
                        if (!q.ended && q.currentTime) {
                            if (this._muted) {
                                q.pause()
                            } else {
                                q.play()
                            }
                        }
                    }
                }
                this._muted=!this._muted;
                return this
            }
        }
    });
    i.bind("Pause", function() {
        i.audio.mute()
    });
    i.bind("Unpause", function() {
        i.audio.mute()
    });
    i.c("Text", {
        _text: "",
        init: function() {
            this.bind("Draw", function(p) {
                if (p.type === "DOM") {
                    var o = this._element, n = o.style;
                    o.innerHTML = this._text
                }
            })
        },
        text: function(e) {
            if (!e) {
                return this._text
            }
            this._text = e;
            this.trigger("Change");
            return this
        }
    });
    i.extend({
        assets: {},
        load: function(s, o, n, v) {
            var t = 0, p = s.length, u, r, w = p, q = 0, e;
            for (; t < p; ++t) {
                u = s[t];
                e = u.substr(u.lastIndexOf(".") + 1).toLowerCase();
                if (i.support.audio && (e === "mp3" || e === "wav" || e === "ogg" || e === "mp4")) {
                    r = new Audio(u);
                    if (navigator.userAgent.indexOf("Chrome")!=-1) {
                        q++
                    }
                } else {
                    if (e === "jpg" || e === "jpeg" || e === "gif" || e === "png") {
                        r = new Image();
                        r.src = u
                    } else {
                        w--;
                        continue
                    }
                }
                this.assets[u] = r;
                r.onload = function() {
                    ++q;
                    if (n) {
                        n.call(this, {
                            loaded: q,
                            total: w,
                            percent: (q / w * 100)
                        })
                    }
                    if (q === w) {
                        if (o) {
                            o()
                        }
                    }
                };
                r.onerror = function() {
                    if (v) {
                        v.call(this, {
                            loaded: q,
                            total: w,
                            percent: (q / w * 100)
                        })
                    } else {
                        q++;
                        if (q === w) {
                            if (o) {
                                o()
                            }
                        }
                    }
                }
            }
        }
    })
})(Crafty, window, window.document);
