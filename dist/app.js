var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// bb-plugin-runtime-shim:react
var react_exports = {};
__export(react_exports, {
  Activity: () => Activity,
  Children: () => Children,
  Component: () => Component,
  Fragment: () => Fragment,
  Profiler: () => Profiler,
  PureComponent: () => PureComponent,
  StrictMode: () => StrictMode,
  Suspense: () => Suspense,
  act: () => act,
  cache: () => cache,
  cacheSignal: () => cacheSignal,
  captureOwnerStack: () => captureOwnerStack,
  cloneElement: () => cloneElement,
  createContext: () => createContext,
  createElement: () => createElement,
  createRef: () => createRef,
  default: () => react_default,
  forwardRef: () => forwardRef,
  isValidElement: () => isValidElement,
  lazy: () => lazy,
  memo: () => memo,
  startTransition: () => startTransition,
  unstable_useCacheRefresh: () => unstable_useCacheRefresh,
  use: () => use,
  useActionState: () => useActionState,
  useCallback: () => useCallback,
  useContext: () => useContext,
  useDebugValue: () => useDebugValue,
  useDeferredValue: () => useDeferredValue,
  useEffect: () => useEffect,
  useEffectEvent: () => useEffectEvent,
  useId: () => useId,
  useImperativeHandle: () => useImperativeHandle,
  useInsertionEffect: () => useInsertionEffect,
  useLayoutEffect: () => useLayoutEffect,
  useMemo: () => useMemo,
  useOptimistic: () => useOptimistic,
  useReducer: () => useReducer,
  useRef: () => useRef,
  useState: () => useState,
  useSyncExternalStore: () => useSyncExternalStore,
  useTransition: () => useTransition,
  version: () => version
});
var runtime = globalThis.__bbPluginRuntime;
if (runtime == null || runtime.react == null) {
  throw new Error('Cannot load "react": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod = runtime.react;
var react_default = mod;
var {
  Activity,
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  act,
  cache,
  cacheSignal,
  captureOwnerStack,
  cloneElement,
  createContext,
  createElement,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  unstable_useCacheRefresh,
  use,
  useActionState,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useOptimistic,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  version
} = mod;

// bb-plugin-runtime-shim:react-dom/client
var runtime2 = globalThis.__bbPluginRuntime;
if (runtime2 == null || runtime2.reactDomClient == null) {
  throw new Error('Cannot load "react-dom/client": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod2 = runtime2.reactDomClient;
var {
  createRoot,
  hydrateRoot,
  version: version2
} = mod2;

// bb-plugin-runtime-shim:@bb/plugin-sdk/app
var runtime3 = globalThis.__bbPluginRuntime;
if (runtime3 == null || runtime3.pluginSdkApp == null) {
  throw new Error('Cannot load "@bb/plugin-sdk/app": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod3 = runtime3.pluginSdkApp;
var {
  Markdown,
  ThreadChat,
  definePluginApp,
  experimental_NewThreadComposer,
  experimental_useSidebarThreadActions,
  experimental_useSidebarThreadPullRequest,
  experimental_useSidebarThreadSplit,
  experimental_useSidebarThreads,
  useBbContext,
  useBbNavigate,
  useComposer,
  useComposerView,
  useRealtime,
  useRealtimeConnectionState,
  useRpc,
  useSettings
} = mod3;

// node_modules/esm-env/true.js
var true_default = true;

// node_modules/esm-env/dev-fallback.js
var node_env = globalThis.process?.env?.NODE_ENV;
var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

// node_modules/number-flow/dist/ssr-DvIINv8w.mjs
var h = String.raw;
var m = String.raw;
var v = true_default && (() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return false;
  }
  return true;
})();
var k = true_default && typeof CSS < "u" && CSS.supports && CSS.supports("line-height", "mod(1,1)");
var S = true_default && typeof matchMedia < "u" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
var d = "--_number-flow-d-opacity";
var g = "--_number-flow-d-width";
var c = "--_number-flow-dx";
var u = "--_number-flow-d";
var _ = (() => {
  try {
    return CSS.registerProperty({
      name: d,
      syntax: "<number>",
      inherits: false,
      initialValue: "0"
    }), CSS.registerProperty({
      name: c,
      syntax: "<length>",
      inherits: true,
      initialValue: "0px"
    }), CSS.registerProperty({
      name: g,
      syntax: "<number>",
      inherits: false,
      initialValue: "0"
    }), CSS.registerProperty({
      name: u,
      syntax: "<number>",
      inherits: true,
      initialValue: "0"
    }), true;
  } catch {
    return false;
  }
})();
var s = "round(nearest, calc(var(--number-flow-mask-height, 0.25em) / 2), 1px)";
var t = `calc(${s} * 2)`;
var p = "var(--number-flow-mask-width, 0.5em)";
var n = `calc(${p} / var(--scale-x))`;
var r = "#000 0, transparent 71%";
var x = m`:host{display:inline-block;direction:ltr;white-space:nowrap;isolation:isolate;line-height:1}.number,.number__inner{display:inline-block;transform-origin:left top}:host([data-will-change]) :is(.number,.number__inner,.section,.digit,.digit__num,.symbol){will-change:transform}.number{--scale-x:calc(1 + var(${g}) / var(--width));transform:translateX(var(${c})) scaleX(var(--scale-x));margin:0 calc(-1 * ${p});position:relative;-webkit-mask-image:linear-gradient(to right,transparent 0,#000 ${n},#000 calc(100% - ${n}),transparent ),linear-gradient(to bottom,transparent 0,#000 ${t},#000 calc(100% - ${t}),transparent 100% ),radial-gradient(at bottom right,${r}),radial-gradient(at bottom left,${r}),radial-gradient(at top left,${r}),radial-gradient(at top right,${r});-webkit-mask-size:100% calc(100% - ${t} * 2),calc(100% - ${n} * 2) 100%,${n} ${t},${n} ${t},${n} ${t},${n} ${t};-webkit-mask-position:center,center,top left,top right,bottom right,bottom left;-webkit-mask-repeat:no-repeat}.number__inner{padding:${s} ${p};transform:scaleX(calc(1 / var(--scale-x))) translateX(calc(-1 * var(${c})))}:host > :not(.number){z-index:5}.section,.symbol{display:inline-block;position:relative;isolation:isolate}.section::after{content:'\200b';display:inline-block}.section--justify-left{transform-origin:center left}.section--justify-right{transform-origin:center right}.section > [inert],.symbol > [inert]{margin:0 !important;position:absolute !important;z-index:-1}.digit{display:inline-block;position:relative;--c:var(--current) + var(${u})}.digit__num,.number .section::after{padding:${s} 0}.digit__num{display:inline-block;--offset-raw:mod(var(--length) + var(--n) - mod(var(--c),var(--length)),var(--length));--offset:calc( var(--offset-raw) - var(--length) * round(down,var(--offset-raw) / (var(--length) / 2),1) );--y:clamp(-100%,var(--offset) * 100%,100%);transform:translateY(var(--y))}.digit__num[inert]{position:absolute;top:0;left:50%;transform:translateX(-50%) translateY(var(--y))}.digit:not(.is-spinning) .digit__num[inert]{display:none}.symbol__value{display:inline-block;mix-blend-mode:plus-lighter;white-space:pre}.section--justify-left .symbol > [inert]{left:0}.section--justify-right .symbol > [inert]{right:0}.animate-presence{opacity:calc(1 + var(${d}))}`;
var M = true_default && typeof HTMLElement < "u" ? HTMLElement : class {
};
var y = m`:host{display:inline-block;direction:ltr;white-space:nowrap;line-height:1}span{display:inline-block}:host([data-will-change]) span{will-change:transform}.number,.digit{padding:${s} 0}.symbol{white-space:pre}`;
var b = (e) => `<span class="${e.type === "integer" || e.type === "fraction" ? "digit" : "symbol"}" part="${e.type === "integer" || e.type === "fraction" ? `digit ${e.type}-digit` : `symbol ${e.type}`}">${e.value}</span>`;
var i = (e, a) => `<span part="${a}">${e.reduce((l2, f2) => l2 + b(f2), "")}</span>`;
var $ = (e = "") => m`:where(number-flow${e}){line-height:1}number-flow${e} > span{font-kerning:none;display:inline-block;padding:${t} 0}`;
var V = (e, { nonce: a, elementSuffix: l2 } = {}) => (
  // shadowroot="open" non-standard attribute for old Chrome:
  h`<template shadowroot="open" shadowrootmode="open"
			><style${a ? ` nonce="${a}"` : ""}>${y}</style
			><span role="img" aria-label="${e.valueAsString}"
				>${i(e.pre, "left")}<span part="number" class="number"
					>${i(e.integer, "integer")}${i(e.fraction, "fraction")}</span
				>${i(e.post, "right")}</span
			></template
		><style${a ? ` nonce="${a}"` : ""}>${$(l2)}</style
		><span>${e.valueAsString}</span>`
);

// node_modules/number-flow/dist/lite.mjs
var f = (n2, t2, e) => {
  const i2 = document.createElement(n2), [s2, o] = Array.isArray(t2) ? [void 0, t2] : [t2, e];
  return s2 && Object.assign(i2, s2), o == null || o.forEach((a) => i2.appendChild(a)), i2;
};
var D = (n2, t2) => {
  var e;
  return t2 === "left" ? n2.offsetLeft : (((e = n2.offsetParent instanceof HTMLElement ? n2.offsetParent : null) == null ? void 0 : e.offsetWidth) ?? 0) - n2.offsetWidth - n2.offsetLeft;
};
var W = (n2) => n2.offsetWidth > 0 && n2.offsetHeight > 0;
var X = (n2, t2) => {
  true_default && typeof HTMLElement < "u" && typeof customElements < "u" && !customElements.get(n2) && customElements.define(n2, t2);
};
function k2(n2, t2, { reverse: e = false } = {}) {
  const i2 = n2.length;
  for (let s2 = e ? i2 - 1 : 0; e ? s2 >= 0 : s2 < i2; e ? s2-- : s2++)
    t2(n2[s2], s2);
}
function z(n2, t2, e, i2) {
  const s2 = t2.formatToParts(n2);
  e && s2.unshift({ type: "prefix", value: e }), i2 && s2.push({ type: "suffix", value: i2 });
  const o = [], a = [], r4 = [], d2 = [], c2 = {}, p2 = (l2) => `${l2}:${c2[l2] = (c2[l2] ?? -1) + 1}`;
  let u2 = "", m3 = false, g2 = false;
  for (const l2 of s2) {
    u2 += l2.value;
    const h2 = l2.type === "minusSign" || l2.type === "plusSign" ? "sign" : l2.type;
    h2 === "integer" ? (m3 = true, a.push(...l2.value.split("").map((_2) => ({ type: h2, value: parseInt(_2) })))) : h2 === "group" ? a.push({ type: h2, value: l2.value }) : h2 === "decimal" ? (g2 = true, r4.push({ type: h2, value: l2.value, key: p2(h2) })) : h2 === "fraction" ? r4.push(...l2.value.split("").map((_2) => ({
      type: h2,
      value: parseInt(_2),
      key: p2(h2),
      pos: -1 - c2[h2]
    }))) : (m3 || g2 ? d2 : o).push({
      type: h2,
      value: l2.value,
      key: p2(h2)
    });
  }
  const v2 = [];
  for (let l2 = a.length - 1; l2 >= 0; l2--) {
    const h2 = a[l2];
    v2.unshift(h2.type === "integer" ? {
      ...h2,
      key: p2(h2.type),
      pos: c2[h2.type]
    } : {
      ...h2,
      key: p2(h2.type)
    });
  }
  return {
    pre: o,
    integer: v2,
    fraction: r4,
    post: d2,
    valueAsString: u2,
    value: typeof n2 == "string" ? parseFloat(n2) : n2
  };
}
var E = k && v && _;
var B = class extends M {
  constructor() {
    super(), this.created = false, this.batched = false, this._preUpdated = false;
    const { animated: t2, ...e } = this.constructor.defaultProps;
    this._animated = this.computedAnimated = t2, Object.assign(this, e);
  }
  get animated() {
    return this._animated;
  }
  set animated(t2) {
    var e;
    this.animated !== t2 && (this._animated = t2, (e = this.shadowRoot) == null || e.getAnimations().forEach((i2) => i2.finish()));
  }
  /**
   * @internal
   */
  set data(t2) {
    var r4, d2;
    if (t2 == null || t2 === this._data)
      return;
    const { pre: e, integer: i2, fraction: s2, post: o, value: a } = t2;
    if (this.created) {
      const c2 = this._data;
      this._data = t2, this.computedTrend = typeof this.trend == "function" ? this.trend(c2.value, a) : this.trend, this.computedAnimated = E && this._animated && (!this.respectMotionPreference || !((r4 = S) != null && r4.matches)) && // https://github.com/barvian/number-flow/issues/9
      W(this) && // https://github.com/barvian/number-flow/issues/165
      this.ownerDocument.visibilityState === "visible", (d2 = this.plugins) == null || d2.forEach((p2) => {
        var u2;
        return (u2 = p2.onUpdate) == null ? void 0 : u2.call(p2, t2, c2, this);
      }), this.batched || this.willUpdate(), this._pre.update(e), this._num.update({ integer: i2, fraction: s2 }), this._post.update(o), this.batched || this.didUpdate();
    } else {
      this._data = t2, this.attachShadow({ mode: "open" });
      try {
        this._internals ?? (this._internals = this.attachInternals()), this._internals.role = "img";
      } catch {
      }
      const c2 = document.createElement("style");
      this.nonce && (c2.nonce = this.nonce), c2.textContent = x, this.shadowRoot.appendChild(c2), this._pre = new U(this, e, {
        justify: "right",
        part: "left"
      }), this.shadowRoot.appendChild(this._pre.el), this._num = new F(this, i2, s2), this.shadowRoot.appendChild(this._num.el), this._post = new U(this, o, {
        justify: "left",
        part: "right"
      }), this.shadowRoot.appendChild(this._post.el), this.created = true;
    }
    try {
      this._internals.ariaLabel = t2.valueAsString;
    } catch {
    }
  }
  /**
   * @internal
   */
  willUpdate() {
    var t2;
    this._preUpdated = E && this._animated && (!this.respectMotionPreference || !((t2 = S) != null && t2.matches)) && this.ownerDocument.visibilityState === "visible", this._preUpdated && (this._pre.willUpdate(), this._num.willUpdate(), this._post.willUpdate());
  }
  /**
   * @internal
   */
  didUpdate() {
    if (!this.computedAnimated || !this._preUpdated)
      return;
    this._abortAnimationsFinish ? this._abortAnimationsFinish.abort() : this.dispatchEvent(new Event("animationsstart")), this._pre.didUpdate(), this._num.didUpdate(), this._post.didUpdate();
    const t2 = new AbortController();
    Promise.all(this.shadowRoot.getAnimations().map((e) => e.finished)).then(() => {
      t2.signal.aborted || (this.dispatchEvent(new Event("animationsfinish")), this._abortAnimationsFinish = void 0);
    }), this._abortAnimationsFinish = t2;
  }
};
B.defaultProps = {
  transformTiming: {
    duration: 900,
    // Make sure to keep this minified:
    easing: "linear(0,.005,.019,.039,.066,.096,.129,.165,.202,.24,.278,.316,.354,.39,.426,.461,.494,.526,.557,.586,.614,.64,.665,.689,.711,.731,.751,.769,.786,.802,.817,.831,.844,.856,.867,.877,.887,.896,.904,.912,.919,.925,.931,.937,.942,.947,.951,.955,.959,.962,.965,.968,.971,.973,.976,.978,.98,.981,.983,.984,.986,.987,.988,.989,.99,.991,.992,.992,.993,.994,.994,.995,.995,.996,.996,.9963,.9967,.9969,.9972,.9975,.9977,.9979,.9981,.9982,.9984,.9985,.9987,.9988,.9989,1)"
  },
  spinTiming: void 0,
  opacityTiming: { duration: 450, easing: "ease-out" },
  animated: true,
  trend: (n2, t2) => Math.sign(t2 - n2),
  respectMotionPreference: true,
  plugins: void 0,
  digits: void 0
};
var F = class {
  constructor(t2, e, i2, { className: s2, ...o } = {}) {
    this.flow = t2, this._integer = new A(t2, e, {
      justify: "right",
      part: "integer"
    }), this._fraction = new A(t2, i2, {
      justify: "left",
      part: "fraction"
    }), this._inner = f("span", {
      className: "number__inner"
    }, [this._integer.el, this._fraction.el]), this.el = f("span", {
      ...o,
      part: "number",
      className: `number ${s2 ?? ""}`
    }, [this._inner]);
  }
  willUpdate() {
    this._prevWidth = this.el.offsetWidth, this._prevLeft = this.el.getBoundingClientRect().left, this._integer.willUpdate(), this._fraction.willUpdate();
  }
  update({ integer: t2, fraction: e }) {
    this._integer.update(t2), this._fraction.update(e);
  }
  didUpdate() {
    const t2 = this.el.getBoundingClientRect();
    this._integer.didUpdate(), this._fraction.didUpdate();
    const e = this._prevLeft - t2.left, i2 = this.el.offsetWidth, s2 = this._prevWidth - i2;
    this.el.style.setProperty("--width", String(i2)), this.el.animate({
      [c]: [`${e}px`, "0px"],
      [g]: [s2, 0]
    }, {
      ...this.flow.transformTiming,
      composite: "accumulate"
    });
  }
};
var R = class {
  constructor(t2, e, { justify: i2, className: s2, ...o }, a) {
    this.flow = t2, this.children = /* @__PURE__ */ new Map(), this.onCharRemove = (d2) => () => {
      this.children.delete(d2);
    }, this.justify = i2;
    const r4 = e.map((d2) => this.addChar(d2).el);
    this.el = f("span", {
      ...o,
      className: `section section--justify-${i2} ${s2 ?? ""}`
    }, a ? a(r4) : r4);
  }
  addChar(t2, { startDigitsAtZero: e = false, ...i2 } = {}) {
    const s2 = t2.type === "integer" || t2.type === "fraction" ? new C(this, t2.type, e ? 0 : t2.value, t2.pos, {
      ...i2,
      onRemove: this.onCharRemove(t2.key)
    }) : new I(this, t2.type, t2.value, {
      ...i2,
      onRemove: this.onCharRemove(t2.key)
    });
    return this.children.set(t2.key, s2), s2;
  }
  unpop(t2) {
    t2.el.removeAttribute("inert"), t2.el.style.top = "", t2.el.style[this.justify] = "";
  }
  pop(t2) {
    t2.forEach((e) => {
      e.el.style.top = `${e.el.offsetTop}px`, e.el.style[this.justify] = `${D(e.el, this.justify)}px`;
    }), t2.forEach((e) => {
      e.el.setAttribute("inert", ""), e.present = false;
    });
  }
  addNewAndUpdateExisting(t2) {
    const e = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Map(), s2 = this.justify === "left", o = s2 ? "prepend" : "append";
    if (k2(t2, (a) => {
      let r4;
      this.children.has(a.key) ? (r4 = this.children.get(a.key), i2.set(a, r4), this.unpop(r4), r4.present = true) : (r4 = this.addChar(a, { startDigitsAtZero: true, animateIn: true }), e.set(a, r4)), this.el[o](r4.el);
    }, { reverse: s2 }), this.flow.computedAnimated) {
      const a = this.el.getBoundingClientRect();
      e.forEach((r4) => {
        r4.willUpdate(a);
      });
    }
    e.forEach((a, r4) => {
      a.update(r4.value);
    }), i2.forEach((a, r4) => {
      a.update(r4.value);
    });
  }
  willUpdate() {
    const t2 = this.el.getBoundingClientRect();
    this._prevOffset = t2[this.justify], this.children.forEach((e) => e.willUpdate(t2));
  }
  didUpdate() {
    const t2 = this.el.getBoundingClientRect();
    this.children.forEach((s2) => s2.didUpdate(t2));
    const e = t2[this.justify], i2 = this._prevOffset - e;
    i2 && this.children.size && this.el.animate({
      transform: [`translateX(${i2}px)`, "none"]
    }, {
      ...this.flow.transformTiming,
      composite: "accumulate"
    });
  }
};
var A = class extends R {
  update(t2) {
    const e = /* @__PURE__ */ new Map();
    this.children.forEach((i2, s2) => {
      t2.find((o) => o.key === s2) || e.set(s2, i2), this.unpop(i2);
    }), this.addNewAndUpdateExisting(t2), e.forEach((i2) => {
      i2 instanceof C && i2.update(0);
    }), this.pop(e);
  }
};
var U = class extends R {
  update(t2) {
    const e = /* @__PURE__ */ new Map();
    this.children.forEach((i2, s2) => {
      t2.find((o) => o.key === s2) || e.set(s2, i2);
    }), this.pop(e), this.addNewAndUpdateExisting(t2);
  }
};
var y2 = class {
  constructor(t2, e, { onRemove: i2, animateIn: s2 = false } = {}) {
    this.flow = t2, this.el = e, this._present = true, this._remove = () => {
      var o;
      this.el.remove(), (o = this._onRemove) == null || o.call(this);
    }, this.el.classList.add("animate-presence"), this.flow.computedAnimated && s2 && this.el.animate({
      [d]: [-0.9999, 0]
    }, {
      ...this.flow.opacityTiming,
      composite: "accumulate"
    }), this._onRemove = i2;
  }
  get present() {
    return this._present;
  }
  set present(t2) {
    if (this._present !== t2) {
      if (this._present = t2, t2 ? this.el.removeAttribute("inert") : this.el.setAttribute("inert", ""), !this.flow.computedAnimated) {
        t2 || this._remove();
        return;
      }
      this.el.style.setProperty("--_number-flow-d-opacity", t2 ? "0" : "-.999"), this.el.animate({
        [d]: t2 ? [-0.9999, 0] : [0.999, 0]
      }, {
        ...this.flow.opacityTiming,
        composite: "accumulate"
      }), t2 ? this.flow.removeEventListener("animationsfinish", this._remove) : this.flow.addEventListener("animationsfinish", this._remove, {
        once: true
      });
    }
  }
};
var x2 = class extends y2 {
  constructor(t2, e, i2, s2) {
    super(t2.flow, i2, s2), this.section = t2, this.value = e, this.el = i2;
  }
};
var C = class extends x2 {
  constructor(t2, e, i2, s2, o) {
    var c2, p2;
    const a = (((p2 = (c2 = t2.flow.digits) == null ? void 0 : c2[s2]) == null ? void 0 : p2.max) ?? 9) + 1, r4 = Array.from({ length: a }).map((u2, m3) => {
      const g2 = f("span", { className: "digit__num" }, [
        document.createTextNode(String(m3))
      ]);
      return m3 !== i2 && g2.setAttribute("inert", ""), g2.style.setProperty("--n", String(m3)), g2;
    }), d2 = f("span", {
      part: `digit ${e}-digit`,
      className: "digit"
    }, r4);
    d2.style.setProperty("--current", String(i2)), d2.style.setProperty("--length", String(a)), super(t2, i2, d2, o), this.pos = s2, this._onAnimationsFinish = () => {
      this.el.classList.remove("is-spinning");
    }, this._numbers = r4, this.length = a;
  }
  willUpdate(t2) {
    const e = this.el.getBoundingClientRect();
    this._prevValue = this.value;
    const i2 = e[this.section.justify] - t2[this.section.justify], s2 = e.width / 2;
    this._prevCenter = this.section.justify === "left" ? i2 + s2 : i2 - s2;
  }
  update(t2) {
    this.el.style.setProperty("--current", String(t2)), this._numbers.forEach((e, i2) => i2 === t2 ? e.removeAttribute("inert") : e.setAttribute("inert", "")), this.value = t2;
  }
  didUpdate(t2) {
    const e = this.el.getBoundingClientRect(), i2 = e[this.section.justify] - t2[this.section.justify], s2 = e.width / 2, o = this.section.justify === "left" ? i2 + s2 : i2 - s2, a = this._prevCenter - o;
    a && this.el.animate({
      transform: [`translateX(${a}px)`, "none"]
    }, {
      ...this.flow.transformTiming,
      composite: "accumulate"
    });
    const r4 = this.getDelta();
    r4 && (this.el.classList.add("is-spinning"), this.el.animate({
      [u]: [-r4, 0]
    }, {
      ...this.flow.spinTiming ?? this.flow.transformTiming,
      composite: "accumulate"
    }), this.flow.addEventListener("animationsfinish", this._onAnimationsFinish, { once: true }));
  }
  getDelta() {
    var i2;
    if (this.flow.plugins)
      for (const s2 of this.flow.plugins) {
        const o = (i2 = s2.getDelta) == null ? void 0 : i2.call(s2, this.value, this._prevValue, this);
        if (o != null)
          return o;
      }
    const t2 = this.value - this._prevValue, e = this.flow.computedTrend || Math.sign(t2);
    return e < 0 && this.value > this._prevValue ? this.value - this.length - this._prevValue : e > 0 && this.value < this._prevValue ? this.length - this._prevValue + this.value : t2;
  }
};
var I = class extends x2 {
  constructor(t2, e, i2, s2) {
    const o = f("span", {
      className: "symbol__value",
      textContent: i2
    });
    super(t2, i2, f("span", {
      part: `symbol ${e}`,
      className: "symbol"
    }, [o]), s2), this.type = e, this._children = /* @__PURE__ */ new Map(), this._onChildRemove = (a) => () => {
      this._children.delete(a);
    }, this._children.set(i2, new y2(this.flow, o, {
      onRemove: this._onChildRemove(i2)
    }));
  }
  willUpdate(t2) {
    if (this.type === "decimal")
      return;
    const e = this.el.getBoundingClientRect();
    this._prevOffset = e[this.section.justify] - t2[this.section.justify];
  }
  update(t2) {
    if (this.value !== t2) {
      const e = this._children.get(this.value);
      e && (e.present = false);
      const i2 = this._children.get(t2);
      if (i2)
        i2.present = true;
      else {
        const s2 = f("span", {
          className: "symbol__value",
          textContent: t2
        });
        this.el.appendChild(s2), this._children.set(t2, new y2(this.flow, s2, {
          animateIn: true,
          onRemove: this._onChildRemove(t2)
        }));
      }
    }
    this.value = t2;
  }
  didUpdate(t2) {
    if (this.type === "decimal")
      return;
    const i2 = this.el.getBoundingClientRect()[this.section.justify] - t2[this.section.justify], s2 = this._prevOffset - i2;
    s2 && this.el.animate({
      transform: [`translateX(${s2}px)`, "none"]
    }, { ...this.flow.transformTiming, composite: "accumulate" });
  }
};

// node_modules/number-flow/dist/csp.mjs
var r2 = (s2) => [y, $(s2), x];

// node_modules/@number-flow/react/dist/NumberFlow-client-BGPmzcXX.mjs
var REACT_MAJOR = parseInt(version.match(/^(\d+)\./)?.[1]);
var isReact19 = REACT_MAJOR >= 19;
var OBSERVED_ATTRIBUTES = [
  "data",
  "digits"
];
var NumberFlowElement = class extends B {
  attributeChangedCallback(attr, _oldValue, newValue) {
    this[attr] = JSON.parse(newValue);
  }
};
NumberFlowElement.observedAttributes = isReact19 ? [] : OBSERVED_ATTRIBUTES;
X("number-flow-react", NumberFlowElement);
var formatters = {};
function identity(v2) {
  return v2;
}
var serialize = isReact19 ? identity : JSON.stringify;
function splitProps(props) {
  const { transformTiming, spinTiming, opacityTiming, animated, respectMotionPreference, trend, plugins, ...rest } = props;
  return [
    {
      transformTiming,
      spinTiming,
      opacityTiming,
      animated,
      respectMotionPreference,
      trend,
      plugins
    },
    rest
  ];
}
var NumberFlowImpl = class extends Component {
  // Update the non-`data` props to avoid JSON serialization
  // Data needs to be set in render still:
  updateProperties(prevProps) {
    if (!this.el) return;
    this.el.batched = !this.props.isolate;
    const [nonData] = splitProps(this.props);
    Object.entries(nonData).forEach(([k3, v2]) => {
      this.el[k3] = v2 ?? NumberFlowElement.defaultProps[k3];
    });
    if (prevProps?.onAnimationsStart) this.el.removeEventListener("animationsstart", prevProps.onAnimationsStart);
    if (this.props.onAnimationsStart) this.el.addEventListener("animationsstart", this.props.onAnimationsStart);
    if (prevProps?.onAnimationsFinish) this.el.removeEventListener("animationsfinish", prevProps.onAnimationsFinish);
    if (this.props.onAnimationsFinish) this.el.addEventListener("animationsfinish", this.props.onAnimationsFinish);
  }
  componentDidMount() {
    this.updateProperties();
    if (isReact19 && this.el) {
      this.el.digits = this.props.digits;
      this.el.data = this.props.data;
    }
  }
  getSnapshotBeforeUpdate(prevProps) {
    this.updateProperties(prevProps);
    if (prevProps.data !== this.props.data) {
      if (this.props.group) {
        this.props.group.willUpdate();
        return () => this.props.group?.didUpdate();
      }
      if (!this.props.isolate) {
        this.el?.willUpdate();
        return () => this.el?.didUpdate();
      }
    }
    return null;
  }
  componentDidUpdate(_2, __, didUpdate) {
    didUpdate?.();
  }
  handleRef(el) {
    if (this.props.innerRef) this.props.innerRef.current = el;
    this.el = el;
  }
  render() {
    const [_2, { innerRef, className, data, nonce, willChange, isolate, group, digits, onAnimationsStart, onAnimationsFinish, ...rest }] = splitProps(this.props);
    return (
      // @ts-expect-error missing types
      /* @__PURE__ */ createElement("number-flow-react", {
        ref: this.handleRef,
        "data-will-change": willChange ? "" : void 0,
        // Have to rename this:
        class: className,
        nonce,
        ...rest,
        dangerouslySetInnerHTML: {
          __html: true_default ? "" : V(data, {
            nonce,
            elementSuffix: "-react"
          })
        },
        suppressHydrationWarning: true,
        digits: serialize(digits),
        // Make sure data is set last, everything else is updated:
        data: serialize(data)
      })
    );
  }
  constructor(props) {
    super(props);
    this.handleRef = this.handleRef.bind(this);
  }
};
var NumberFlow = /* @__PURE__ */ forwardRef(function NumberFlow2({ value, locales, format, prefix, suffix, ...props }, _ref) {
  useImperativeHandle(_ref, () => ref.current, []);
  const ref = useRef(void 0);
  const group = useContext(NumberFlowGroupContext);
  group?.useRegister(ref);
  const localesString = useMemo(() => locales ? JSON.stringify(locales) : "", [
    locales
  ]);
  const formatString = useMemo(() => format ? JSON.stringify(format) : "", [
    format
  ]);
  const data = useMemo(() => {
    const formatter = formatters[`${localesString}:${formatString}`] ??= new Intl.NumberFormat(locales, format);
    return z(value, formatter, prefix, suffix);
  }, [
    value,
    localesString,
    formatString,
    prefix,
    suffix
  ]);
  return /* @__PURE__ */ createElement(NumberFlowImpl, {
    ...props,
    group,
    data,
    innerRef: ref
  });
});
var NumberFlowGroupContext = /* @__PURE__ */ createContext(void 0);

// node_modules/@number-flow/react/dist/index.mjs
var styles = r2("-react");

// bb-plugin-runtime-shim:react/jsx-runtime
var runtime4 = globalThis.__bbPluginRuntime;
if (runtime4 == null || runtime4.jsxRuntime == null) {
  throw new Error('Cannot load "react/jsx-runtime": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod4 = runtime4.jsxRuntime;
var {
  Fragment: Fragment2,
  jsx,
  jsxs
} = mod4;

// node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs
var LayoutGroupContext = createContext({});

// node_modules/framer-motion/dist/es/utils/use-constant.mjs
function useConstant(init) {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}

// node_modules/framer-motion/dist/es/utils/is-browser.mjs
var isBrowser = typeof window !== "undefined";

// node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs
var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

// node_modules/framer-motion/dist/es/context/PresenceContext.mjs
var PresenceContext = /* @__PURE__ */ createContext(null);

// node_modules/motion-utils/dist/es/array.mjs
function addUniqueItem(arr, item) {
  if (arr.indexOf(item) === -1)
    arr.push(item);
}
function removeItem(arr, item) {
  const index = arr.indexOf(item);
  if (index > -1)
    arr.splice(index, 1);
}

// node_modules/motion-utils/dist/es/clamp.mjs
var clamp = (min, max, v2) => {
  if (v2 > max)
    return max;
  if (v2 < min)
    return min;
  return v2;
};

// node_modules/motion-utils/dist/es/errors.mjs
var warning = () => {
};
var invariant = () => {
};
if (typeof process !== "undefined" && false) {
  warning = (check, message, errorCode) => {
    if (!check && typeof console !== "undefined") {
      console.warn(formatErrorMessage(message, errorCode));
    }
  };
  invariant = (check, message, errorCode) => {
    if (!check) {
      throw new Error(formatErrorMessage(message, errorCode));
    }
  };
}

// node_modules/motion-utils/dist/es/global-config.mjs
var MotionGlobalConfig = {};

// node_modules/motion-utils/dist/es/is-numerical-string.mjs
var isNumericalString = (v2) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v2);

// node_modules/motion-utils/dist/es/is-object.mjs
var isObject = (value) => typeof value === "object" && value !== null;

// node_modules/motion-utils/dist/es/is-zero-value-string.mjs
var isZeroValueString = (v2) => /^0[^.\s]+$/u.test(v2);

// node_modules/motion-utils/dist/es/memo.mjs
// @__NO_SIDE_EFFECTS__
function memo2(callback) {
  let result;
  return () => {
    if (result === void 0)
      result = callback();
    return result;
  };
}

// node_modules/motion-utils/dist/es/noop.mjs
var noop = /* @__NO_SIDE_EFFECTS__ */ (any) => any;

// node_modules/motion-utils/dist/es/pipe.mjs
var pipe = (...transformers) => transformers.reduce((a, b2) => (v2) => b2(a(v2)));

// node_modules/motion-utils/dist/es/progress.mjs
var progress = /* @__NO_SIDE_EFFECTS__ */ (from, to, value) => {
  const range = to - from;
  return range ? (value - from) / range : 1;
};

// node_modules/motion-utils/dist/es/subscription-manager.mjs
var SubscriptionManager = class {
  constructor() {
    this.subscriptions = [];
  }
  add(handler) {
    addUniqueItem(this.subscriptions, handler);
    return () => removeItem(this.subscriptions, handler);
  }
  notify(a, b2, c2) {
    const numSubscriptions = this.subscriptions.length;
    if (!numSubscriptions)
      return;
    if (numSubscriptions === 1) {
      this.subscriptions[0](a, b2, c2);
    } else {
      for (let i2 = 0; i2 < numSubscriptions; i2++) {
        const handler = this.subscriptions[i2];
        handler && handler(a, b2, c2);
      }
    }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
};

// node_modules/motion-utils/dist/es/time-conversion.mjs
var secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (seconds) => seconds * 1e3;
var millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (milliseconds) => milliseconds / 1e3;

// node_modules/motion-utils/dist/es/velocity-per-second.mjs
var velocityPerSecond = /* @__NO_SIDE_EFFECTS__ */ (velocity, frameDuration) => frameDuration ? velocity * (1e3 / frameDuration) : 0;

// node_modules/motion-utils/dist/es/easing/cubic-bezier.mjs
var calcBezier = (t2, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t2 + (3 * a2 - 6 * a1)) * t2 + 3 * a1) * t2;
var subdivisionPrecision = 1e-7;
var subdivisionMaxIterations = 12;
function binarySubdivide(x3, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i2 = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x3;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i2 < subdivisionMaxIterations);
  return currentT;
}
// @__NO_SIDE_EFFECTS__
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noop;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t2) => t2 === 0 || t2 === 1 ? t2 : calcBezier(getTForX(t2), mY1, mY2);
}

// node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var mirrorEasing = /* @__NO_SIDE_EFFECTS__ */ (easing) => (p2) => p2 <= 0.5 ? easing(2 * p2) / 2 : (2 - easing(2 * (1 - p2))) / 2;

// node_modules/motion-utils/dist/es/easing/modifiers/reverse.mjs
var reverseEasing = /* @__NO_SIDE_EFFECTS__ */ (easing) => (p2) => 1 - easing(1 - p2);

// node_modules/motion-utils/dist/es/easing/back.mjs
var backOut = /* @__PURE__ */ cubicBezier(0.33, 1.53, 0.69, 0.99);
var backIn = /* @__PURE__ */ reverseEasing(backOut);
var backInOut = /* @__PURE__ */ mirrorEasing(backIn);

// node_modules/motion-utils/dist/es/easing/anticipate.mjs
var anticipate = (p2) => p2 >= 1 ? 1 : (p2 *= 2) < 1 ? 0.5 * backIn(p2) : 0.5 * (2 - Math.pow(2, -10 * (p2 - 1)));

// node_modules/motion-utils/dist/es/easing/circ.mjs
var circIn = (p2) => 1 - Math.sin(Math.acos(p2));
var circOut = reverseEasing(circIn);
var circInOut = mirrorEasing(circIn);

// node_modules/motion-utils/dist/es/easing/ease.mjs
var easeIn = /* @__PURE__ */ cubicBezier(0.42, 0, 1, 1);
var easeOut = /* @__PURE__ */ cubicBezier(0, 0, 0.58, 1);
var easeInOut = /* @__PURE__ */ cubicBezier(0.42, 0, 0.58, 1);

// node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs
var isEasingArray = /* @__NO_SIDE_EFFECTS__ */ (ease2) => {
  return Array.isArray(ease2) && typeof ease2[0] !== "number";
};

// node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var isBezierDefinition = /* @__NO_SIDE_EFFECTS__ */ (easing) => Array.isArray(easing) && typeof easing[0] === "number";

// node_modules/motion-utils/dist/es/easing/utils/map.mjs
var easingLookup = {
  linear: noop,
  easeIn,
  easeInOut,
  easeOut,
  circIn,
  circInOut,
  circOut,
  backIn,
  backInOut,
  backOut,
  anticipate
};
var isValidEasing = (easing) => {
  return typeof easing === "string";
};
var easingDefinitionToFunction = (definition) => {
  if (isBezierDefinition(definition)) {
    invariant(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`, "cubic-bezier-length");
    const [x1, y1, x22, y22] = definition;
    return cubicBezier(x1, y1, x22, y22);
  } else if (isValidEasing(definition)) {
    invariant(easingLookup[definition] !== void 0, `Invalid easing type '${definition}'`, "invalid-easing-type");
    return easingLookup[definition];
  }
  return definition;
};

// node_modules/motion-dom/dist/es/frameloop/order.mjs
var stepsOrder = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];

// node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function createRenderStep(runNextFrame) {
  let thisFrame = /* @__PURE__ */ new Set();
  let nextFrame2 = /* @__PURE__ */ new Set();
  let isProcessing = false;
  let flushNextFrame = false;
  const toKeepAlive = /* @__PURE__ */ new WeakSet();
  let latestFrameData = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  function triggerCallback(callback) {
    if (toKeepAlive.has(callback)) {
      step.schedule(callback);
      runNextFrame();
    }
    callback(latestFrameData);
  }
  const step = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (callback, keepAlive = false, immediate = false) => {
      const addToCurrentFrame = immediate && isProcessing;
      const queue = addToCurrentFrame ? thisFrame : nextFrame2;
      if (keepAlive)
        toKeepAlive.add(callback);
      queue.add(callback);
      return callback;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (callback) => {
      nextFrame2.delete(callback);
      toKeepAlive.delete(callback);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (frameData2) => {
      latestFrameData = frameData2;
      if (isProcessing) {
        flushNextFrame = true;
        return;
      }
      isProcessing = true;
      const prevFrame = thisFrame;
      thisFrame = nextFrame2;
      nextFrame2 = prevFrame;
      thisFrame.forEach(triggerCallback);
      thisFrame.clear();
      isProcessing = false;
      if (flushNextFrame) {
        flushNextFrame = false;
        step.process(frameData2);
      }
    }
  };
  return step;
}

// node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
  let runNextFrame = false;
  let useDefaultElapsed = true;
  const state = {
    delta: 0,
    timestamp: 0,
    isProcessing: false
  };
  const flagRunNextFrame = () => runNextFrame = true;
  const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(flagRunNextFrame);
    return acc;
  }, {});
  const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
  const processBatch = () => {
    const useManualTiming = MotionGlobalConfig.useManualTiming;
    const timestamp = useManualTiming ? state.timestamp : performance.now();
    runNextFrame = false;
    if (!useManualTiming) {
      state.delta = useDefaultElapsed ? 1e3 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
    }
    state.timestamp = timestamp;
    state.isProcessing = true;
    setup.process(state);
    read.process(state);
    resolveKeyframes.process(state);
    preUpdate.process(state);
    update.process(state);
    preRender.process(state);
    render.process(state);
    postRender.process(state);
    state.isProcessing = false;
    if (runNextFrame && allowKeepAlive) {
      useDefaultElapsed = false;
      scheduleNextBatch(processBatch);
    }
  };
  const wake = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!state.isProcessing) {
      scheduleNextBatch(processBatch);
    }
  };
  const schedule = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        wake();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  const cancel = (process2) => {
    for (let i2 = 0; i2 < stepsOrder.length; i2++) {
      steps[stepsOrder[i2]].cancel(process2);
    }
  };
  return { schedule, cancel, state, steps };
}

// node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : noop, true);

// node_modules/motion-dom/dist/es/frameloop/sync-time.mjs
var now;
function clearTime() {
  now = void 0;
}
var time = {
  now: () => {
    if (now === void 0) {
      time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now());
    }
    return now;
  },
  set: (newTime) => {
    now = newTime;
    queueMicrotask(clearTime);
  }
};

// node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
var checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
var isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--");
var startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--");
var isCSSVariableToken = (value) => {
  const startsWithToken = startsAsVariableToken(value);
  if (!startsWithToken)
    return false;
  return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
var singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function containsCSSVariable(value) {
  if (typeof value !== "string")
    return false;
  return value.split("/*")[0].includes("var(--");
}

// node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var number = {
  test: (v2) => typeof v2 === "number",
  parse: parseFloat,
  transform: (v2) => v2
};
var alpha = {
  ...number,
  transform: (v2) => clamp(0, 1, v2)
};
var scale = {
  ...number,
  default: 1
};

// node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs
var sanitize = (v2) => Math.round(v2 * 1e5) / 1e5;

// node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs
var floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

// node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function isNullish(v2) {
  return v2 == null;
}

// node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;

// node_modules/motion-dom/dist/es/value/types/color/utils.mjs
var isColorString = (type, testProp) => (v2) => {
  return Boolean(typeof v2 === "string" && singleColorRegex.test(v2) && v2.startsWith(type) || testProp && !isNullish(v2) && Object.prototype.hasOwnProperty.call(v2, testProp));
};
var splitColor = (aName, bName, cName) => (v2) => {
  if (typeof v2 !== "string")
    return v2;
  const [a, b2, c2, alpha2] = v2.match(floatRegex);
  return {
    [aName]: parseFloat(a),
    [bName]: parseFloat(b2),
    [cName]: parseFloat(c2),
    alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
  };
};

// node_modules/motion-dom/dist/es/value/types/color/rgba.mjs
var clampRgbUnit = (v2) => clamp(0, 255, v2);
var rgbUnit = {
  ...number,
  transform: (v2) => Math.round(clampRgbUnit(v2))
};
var rgba = {
  test: /* @__PURE__ */ isColorString("rgb", "red"),
  parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
  transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
};

// node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function parseHex(v2) {
  let r4 = "";
  let g2 = "";
  let b2 = "";
  let a = "";
  if (v2.length > 5) {
    r4 = v2.substring(1, 3);
    g2 = v2.substring(3, 5);
    b2 = v2.substring(5, 7);
    a = v2.substring(7, 9);
  } else {
    r4 = v2.substring(1, 2);
    g2 = v2.substring(2, 3);
    b2 = v2.substring(3, 4);
    a = v2.substring(4, 5);
    r4 += r4;
    g2 += g2;
    b2 += b2;
    a += a;
  }
  return {
    red: parseInt(r4, 16),
    green: parseInt(g2, 16),
    blue: parseInt(b2, 16),
    alpha: a ? parseInt(a, 16) / 255 : 1
  };
}
var hex = {
  test: /* @__PURE__ */ isColorString("#"),
  parse: parseHex,
  transform: rgba.transform
};

// node_modules/motion-dom/dist/es/value/types/numbers/units.mjs
var createUnitType = /* @__NO_SIDE_EFFECTS__ */ (unit) => ({
  test: (v2) => typeof v2 === "string" && v2.endsWith(unit) && v2.split(" ").length === 1,
  parse: parseFloat,
  transform: (v2) => `${v2}${unit}`
});
var degrees = /* @__PURE__ */ createUnitType("deg");
var percent = /* @__PURE__ */ createUnitType("%");
var px = /* @__PURE__ */ createUnitType("px");
var vh = /* @__PURE__ */ createUnitType("vh");
var vw = /* @__PURE__ */ createUnitType("vw");
var progressPercentage = /* @__PURE__ */ (() => ({
  ...percent,
  parse: (v2) => percent.parse(v2) / 100,
  transform: (v2) => percent.transform(v2 * 100)
}))();

// node_modules/motion-dom/dist/es/value/types/color/hsla.mjs
var hsla = {
  test: /* @__PURE__ */ isColorString("hsl", "hue"),
  parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
  transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
    return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
  }
};

// node_modules/motion-dom/dist/es/value/types/color/index.mjs
var color = {
  test: (v2) => rgba.test(v2) || hex.test(v2) || hsla.test(v2),
  parse: (v2) => {
    if (rgba.test(v2)) {
      return rgba.parse(v2);
    } else if (hsla.test(v2)) {
      return hsla.parse(v2);
    } else {
      return hex.parse(v2);
    }
  },
  transform: (v2) => {
    return typeof v2 === "string" ? v2 : v2.hasOwnProperty("red") ? rgba.transform(v2) : hsla.transform(v2);
  },
  getAnimatableNone: (v2) => {
    const parsed = color.parse(v2);
    parsed.alpha = 0;
    return color.transform(parsed);
  }
};

// node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs
var colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

// node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function test(v2) {
  return isNaN(v2) && typeof v2 === "string" && (v2.match(floatRegex)?.length || 0) + (v2.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number";
var COLOR_TOKEN = "color";
var VAR_TOKEN = "var";
var VAR_FUNCTION_TOKEN = "var(";
var SPLIT_TOKEN = "${}";
var complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
  const originalValue = value.toString();
  const values = [];
  const indexes = {
    color: [],
    number: [],
    var: []
  };
  const types = [];
  let i2 = 0;
  const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
    if (color.test(parsedValue)) {
      indexes.color.push(i2);
      types.push(COLOR_TOKEN);
      values.push(color.parse(parsedValue));
    } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
      indexes.var.push(i2);
      types.push(VAR_TOKEN);
      values.push(parsedValue);
    } else {
      indexes.number.push(i2);
      types.push(NUMBER_TOKEN);
      values.push(parseFloat(parsedValue));
    }
    ++i2;
    return SPLIT_TOKEN;
  });
  const split = tokenised.split(SPLIT_TOKEN);
  return { values, split, indexes, types };
}
function parseComplexValue(v2) {
  return analyseComplexValue(v2).values;
}
function buildTransformer({ split, types }) {
  const numSections = split.length;
  return (v2) => {
    let output = "";
    for (let i2 = 0; i2 < numSections; i2++) {
      output += split[i2];
      if (v2[i2] !== void 0) {
        const type = types[i2];
        if (type === NUMBER_TOKEN) {
          output += sanitize(v2[i2]);
        } else if (type === COLOR_TOKEN) {
          output += color.transform(v2[i2]);
        } else {
          output += v2[i2];
        }
      }
    }
    return output;
  };
}
function createTransformer(source) {
  return buildTransformer(analyseComplexValue(source));
}
var convertNumbersToZero = (v2) => typeof v2 === "number" ? 0 : color.test(v2) ? color.getAnimatableNone(v2) : v2;
var convertToZero = (value, splitBefore) => {
  if (typeof value === "number") {
    return splitBefore?.trim().endsWith("/") ? value : 0;
  }
  return convertNumbersToZero(value);
};
function getAnimatableNone(v2) {
  const info = analyseComplexValue(v2);
  const transformer = buildTransformer(info);
  return transformer(info.values.map((value, i2) => convertToZero(value, info.split[i2])));
}
var complex = {
  test,
  parse: parseComplexValue,
  createTransformer,
  getAnimatableNone
};

// node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function hueToRgb(p2, q, t2) {
  if (t2 < 0)
    t2 += 1;
  if (t2 > 1)
    t2 -= 1;
  if (t2 < 1 / 6)
    return p2 + (q - p2) * 6 * t2;
  if (t2 < 1 / 2)
    return q;
  if (t2 < 2 / 3)
    return p2 + (q - p2) * (2 / 3 - t2) * 6;
  return p2;
}
function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
  hue /= 360;
  saturation /= 100;
  lightness /= 100;
  let red = 0;
  let green = 0;
  let blue = 0;
  if (!saturation) {
    red = green = blue = lightness;
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p2 = 2 * lightness - q;
    red = hueToRgb(p2, q, hue + 1 / 3);
    green = hueToRgb(p2, q, hue);
    blue = hueToRgb(p2, q, hue - 1 / 3);
  }
  return {
    red: Math.round(red * 255),
    green: Math.round(green * 255),
    blue: Math.round(blue * 255),
    alpha: alpha2
  };
}

// node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function mixImmediate(a, b2) {
  return (p2) => p2 > 0 ? b2 : a;
}

// node_modules/motion-dom/dist/es/utils/mix/number.mjs
var mixNumber = (from, to, progress2) => {
  return from + (to - from) * progress2;
};

// node_modules/motion-dom/dist/es/utils/mix/color.mjs
var mixLinearColor = (from, to, v2) => {
  const fromExpo = from * from;
  const expo = v2 * (to * to - fromExpo) + fromExpo;
  return expo < 0 ? 0 : Math.sqrt(expo);
};
var colorTypes = [hex, rgba, hsla];
var getColorType = (v2) => colorTypes.find((type) => type.test(v2));
function asRGBA(color2) {
  const type = getColorType(color2);
  warning(Boolean(type), `'${color2}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
  if (!Boolean(type))
    return false;
  let model = type.parse(color2);
  if (type === hsla) {
    model = hslaToRgba(model);
  }
  return model;
}
var mixColor = (from, to) => {
  const fromRGBA = asRGBA(from);
  const toRGBA = asRGBA(to);
  if (!fromRGBA || !toRGBA) {
    return mixImmediate(from, to);
  }
  const blended = { ...fromRGBA };
  return (v2) => {
    blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v2);
    blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v2);
    blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v2);
    blended.alpha = mixNumber(fromRGBA.alpha, toRGBA.alpha, v2);
    return rgba.transform(blended);
  };
};

// node_modules/motion-dom/dist/es/utils/mix/visibility.mjs
var invisibleValues = /* @__PURE__ */ new Set(["none", "hidden"]);
function mixVisibility(origin, target) {
  if (invisibleValues.has(origin)) {
    return (p2) => p2 <= 0 ? origin : target;
  } else {
    return (p2) => p2 >= 1 ? target : origin;
  }
}

// node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function mixNumber2(a, b2) {
  return (p2) => mixNumber(a, b2, p2);
}
function getMixer(a) {
  if (typeof a === "number") {
    return mixNumber2;
  } else if (typeof a === "string") {
    return isCSSVariableToken(a) ? mixImmediate : color.test(a) ? mixColor : mixComplex;
  } else if (Array.isArray(a)) {
    return mixArray;
  } else if (typeof a === "object") {
    return color.test(a) ? mixColor : mixObject;
  }
  return mixImmediate;
}
function mixArray(a, b2) {
  const output = [...a];
  const numValues = output.length;
  const blendValue = a.map((v2, i2) => getMixer(v2)(v2, b2[i2]));
  return (p2) => {
    for (let i2 = 0; i2 < numValues; i2++) {
      output[i2] = blendValue[i2](p2);
    }
    return output;
  };
}
function mixObject(a, b2) {
  const output = { ...a, ...b2 };
  const blendValue = {};
  for (const key in output) {
    if (a[key] !== void 0 && b2[key] !== void 0) {
      blendValue[key] = getMixer(a[key])(a[key], b2[key]);
    }
  }
  return (v2) => {
    for (const key in blendValue) {
      output[key] = blendValue[key](v2);
    }
    return output;
  };
}
function matchOrder(origin, target) {
  const orderedOrigin = [];
  const pointers = { color: 0, var: 0, number: 0 };
  for (let i2 = 0; i2 < target.values.length; i2++) {
    const type = target.types[i2];
    const originIndex = origin.indexes[type][pointers[type]];
    const originValue = origin.values[originIndex] ?? 0;
    orderedOrigin[i2] = originValue;
    pointers[type]++;
  }
  return orderedOrigin;
}
var mixComplex = (origin, target) => {
  const template = complex.createTransformer(target);
  const originStats = analyseComplexValue(origin);
  const targetStats = analyseComplexValue(target);
  const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
  if (canInterpolate) {
    if (invisibleValues.has(origin) && !targetStats.values.length || invisibleValues.has(target) && !originStats.values.length) {
      return mixVisibility(origin, target);
    }
    return pipe(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
  } else {
    warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
    return mixImmediate(origin, target);
  }
};

// node_modules/motion-dom/dist/es/utils/mix/index.mjs
function mix(from, to, p2) {
  if (typeof from === "number" && typeof to === "number" && typeof p2 === "number") {
    return mixNumber(from, to, p2);
  }
  const mixer = getMixer(from);
  return mixer(from, to);
}

// node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var frameloopDriver = (update) => {
  const passTimestamp = ({ timestamp }) => update(timestamp);
  return {
    start: (keepAlive = true) => frame.update(passTimestamp, keepAlive),
    stop: () => cancelFrame(passTimestamp),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => frameData.isProcessing ? frameData.timestamp : time.now()
  };
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs
var generateLinearEasing = (easing, duration, resolution = 10) => {
  let points = "";
  const numPoints = Math.max(Math.round(duration / resolution), 2);
  for (let i2 = 0; i2 < numPoints; i2++) {
    points += Math.round(easing(i2 / (numPoints - 1)) * 1e4) / 1e4 + ", ";
  }
  return `linear(${points.substring(0, points.length - 2)})`;
};

// node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs
var maxGeneratorDuration = 2e4;
function calcGeneratorDuration(generator) {
  let duration = 0;
  const timeStep = 50;
  let state = generator.next(duration);
  while (!state.done && duration < maxGeneratorDuration) {
    duration += timeStep;
    state = generator.next(duration);
  }
  return duration >= maxGeneratorDuration ? Infinity : duration;
}

// node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function createGeneratorEasing(options, scale2 = 100, createGenerator) {
  const generator = createGenerator({ ...options, keyframes: [0, scale2] });
  const duration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
  return {
    type: "keyframes",
    ease: (progress2) => {
      return generator.next(duration * progress2).value / scale2;
    },
    duration: millisecondsToSeconds(duration)
  };
}

// node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var springDefaults = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function calcAngularFreq(undampedFreq, dampingRatio) {
  return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
var rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
  let result = initialGuess;
  for (let i2 = 1; i2 < rootIterations; i2++) {
    result = result - envelope(result) / derivative(result);
  }
  return result;
}
var safeMin = 1e-3;
function findSpring({ duration = springDefaults.duration, bounce = springDefaults.bounce, velocity = springDefaults.velocity, mass = springDefaults.mass }) {
  let envelope;
  let derivative;
  warning(duration <= secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
  let dampingRatio = 1 - bounce;
  dampingRatio = clamp(springDefaults.minDamping, springDefaults.maxDamping, dampingRatio);
  duration = clamp(springDefaults.minDuration, springDefaults.maxDuration, millisecondsToSeconds(duration));
  if (dampingRatio < 1) {
    envelope = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const a = exponentialDecay - velocity;
      const b2 = calcAngularFreq(undampedFreq2, dampingRatio);
      const c2 = Math.exp(-delta);
      return safeMin - a / b2 * c2;
    };
    derivative = (undampedFreq2) => {
      const exponentialDecay = undampedFreq2 * dampingRatio;
      const delta = exponentialDecay * duration;
      const d2 = delta * velocity + velocity;
      const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
      const f2 = Math.exp(-delta);
      const g2 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
      const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
      return factor * ((d2 - e) * f2) / g2;
    };
  } else {
    envelope = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b2 = (undampedFreq2 - velocity) * duration + 1;
      return -safeMin + a * b2;
    };
    derivative = (undampedFreq2) => {
      const a = Math.exp(-undampedFreq2 * duration);
      const b2 = (velocity - undampedFreq2) * (duration * duration);
      return a * b2;
    };
  }
  const initialGuess = 5 / duration;
  const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
  duration = secondsToMilliseconds(duration);
  if (isNaN(undampedFreq)) {
    return {
      stiffness: springDefaults.stiffness,
      damping: springDefaults.damping,
      duration
    };
  } else {
    const stiffness = Math.pow(undampedFreq, 2) * mass;
    return {
      stiffness,
      damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
      duration
    };
  }
}
var durationKeys = ["duration", "bounce"];
var physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
  return keys.some((key) => options[key] !== void 0);
}
function getSpringOptions(options) {
  let springOptions = {
    velocity: springDefaults.velocity,
    stiffness: springDefaults.stiffness,
    damping: springDefaults.damping,
    mass: springDefaults.mass,
    isResolvedFromDuration: false,
    ...options
  };
  if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
    springOptions.velocity = 0;
    if (options.visualDuration) {
      const visualDuration = options.visualDuration;
      const root = 2 * Math.PI / (visualDuration * 1.2);
      const stiffness = root * root;
      const damping = 2 * clamp(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
      springOptions = {
        ...springOptions,
        mass: springDefaults.mass,
        stiffness,
        damping
      };
    } else {
      const derived = findSpring({ ...options, velocity: 0 });
      springOptions = {
        ...springOptions,
        ...derived,
        mass: springDefaults.mass
      };
      springOptions.isResolvedFromDuration = true;
    }
  }
  return springOptions;
}
function spring(optionsOrVisualDuration = springDefaults.visualDuration, bounce = springDefaults.bounce) {
  const options = typeof optionsOrVisualDuration !== "object" ? {
    visualDuration: optionsOrVisualDuration,
    keyframes: [0, 1],
    bounce
  } : optionsOrVisualDuration;
  let { restSpeed, restDelta } = options;
  const origin = options.keyframes[0];
  const target = options.keyframes[options.keyframes.length - 1];
  const state = { done: false, value: origin };
  const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
    ...options,
    velocity: -millisecondsToSeconds(options.velocity || 0)
  });
  const initialVelocity = velocity || 0;
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const initialDelta = target - origin;
  const undampedAngularFreq = millisecondsToSeconds(Math.sqrt(stiffness / mass));
  const isGranularScale = Math.abs(initialDelta) < 5;
  restSpeed || (restSpeed = isGranularScale ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default);
  restDelta || (restDelta = isGranularScale ? springDefaults.restDelta.granular : springDefaults.restDelta.default);
  let resolveSpring;
  let resolveVelocity;
  let angularFreq;
  let A2;
  let sinCoeff;
  let cosCoeff;
  if (dampingRatio < 1) {
    angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
    A2 = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq;
    resolveSpring = (t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      return target - envelope * (A2 * Math.sin(angularFreq * t2) + initialDelta * Math.cos(angularFreq * t2));
    };
    sinCoeff = dampingRatio * undampedAngularFreq * A2 + initialDelta * angularFreq;
    cosCoeff = dampingRatio * undampedAngularFreq * initialDelta - A2 * angularFreq;
    resolveVelocity = (t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      return envelope * (sinCoeff * Math.sin(angularFreq * t2) + cosCoeff * Math.cos(angularFreq * t2));
    };
  } else if (dampingRatio === 1) {
    resolveSpring = (t2) => target - Math.exp(-undampedAngularFreq * t2) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t2);
    const C2 = initialVelocity + undampedAngularFreq * initialDelta;
    resolveVelocity = (t2) => Math.exp(-undampedAngularFreq * t2) * (undampedAngularFreq * C2 * t2 - initialVelocity);
  } else {
    const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
    resolveSpring = (t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      const freqForT = Math.min(dampedAngularFreq * t2, 300);
      return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
    };
    const P = (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / dampedAngularFreq;
    const sinhCoeff = dampingRatio * undampedAngularFreq * P - initialDelta * dampedAngularFreq;
    const coshCoeff = dampingRatio * undampedAngularFreq * initialDelta - P * dampedAngularFreq;
    resolveVelocity = (t2) => {
      const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
      const freqForT = Math.min(dampedAngularFreq * t2, 300);
      return envelope * (sinhCoeff * Math.sinh(freqForT) + coshCoeff * Math.cosh(freqForT));
    };
  }
  const generator = {
    calculatedDuration: isResolvedFromDuration ? duration || null : null,
    velocity: (t2) => secondsToMilliseconds(resolveVelocity(t2)),
    next: (t2) => {
      if (!isResolvedFromDuration && dampingRatio < 1) {
        const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t2);
        const sin = Math.sin(angularFreq * t2);
        const cos = Math.cos(angularFreq * t2);
        const current2 = target - envelope * (A2 * sin + initialDelta * cos);
        const currentVelocity = secondsToMilliseconds(envelope * (sinCoeff * sin + cosCoeff * cos));
        state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current2) <= restDelta;
        state.value = state.done ? target : current2;
        return state;
      }
      const current = resolveSpring(t2);
      if (!isResolvedFromDuration) {
        const currentVelocity = secondsToMilliseconds(resolveVelocity(t2));
        state.done = Math.abs(currentVelocity) <= restSpeed && Math.abs(target - current) <= restDelta;
      } else {
        state.done = t2 >= duration;
      }
      state.value = state.done ? target : current;
      return state;
    },
    toString: () => {
      const calculatedDuration = Math.min(calcGeneratorDuration(generator), maxGeneratorDuration);
      const easing = generateLinearEasing((progress2) => generator.next(calculatedDuration * progress2).value, calculatedDuration, 30);
      return calculatedDuration + "ms " + easing;
    },
    toTransition: () => {
    }
  };
  return generator;
}
spring.applyToOptions = (options) => {
  const generatorOptions = createGeneratorEasing(options, 100, spring);
  options.ease = generatorOptions.ease;
  options.duration = secondsToMilliseconds(generatorOptions.duration);
  options.type = "keyframes";
  return options;
};

// node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var velocitySampleDuration = 5;
function getGeneratorVelocity(resolveValue, t2, current) {
  const prevT = Math.max(t2 - velocitySampleDuration, 0);
  return velocityPerSecond(current - resolveValue(prevT), t2 - prevT);
}

// node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function inertia({ keyframes: keyframes2, velocity = 0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
  const origin = keyframes2[0];
  const state = {
    done: false,
    value: origin
  };
  const isOutOfBounds = (v2) => min !== void 0 && v2 < min || max !== void 0 && v2 > max;
  const nearestBoundary = (v2) => {
    if (min === void 0)
      return max;
    if (max === void 0)
      return min;
    return Math.abs(min - v2) < Math.abs(max - v2) ? min : max;
  };
  let amplitude = power * velocity;
  const ideal = origin + amplitude;
  const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
  if (target !== ideal)
    amplitude = target - origin;
  const calcDelta = (t2) => -amplitude * Math.exp(-t2 / timeConstant);
  const calcLatest = (t2) => target + calcDelta(t2);
  const applyFriction = (t2) => {
    const delta = calcDelta(t2);
    const latest = calcLatest(t2);
    state.done = Math.abs(delta) <= restDelta;
    state.value = state.done ? target : latest;
  };
  let timeReachedBoundary;
  let spring$1;
  const checkCatchBoundary = (t2) => {
    if (!isOutOfBounds(state.value))
      return;
    timeReachedBoundary = t2;
    spring$1 = spring({
      keyframes: [state.value, nearestBoundary(state.value)],
      velocity: getGeneratorVelocity(calcLatest, t2, state.value),
      // TODO: This should be passing * 1000
      damping: bounceDamping,
      stiffness: bounceStiffness,
      restDelta,
      restSpeed
    });
  };
  checkCatchBoundary(0);
  return {
    calculatedDuration: null,
    next: (t2) => {
      let hasUpdatedFrame = false;
      if (!spring$1 && timeReachedBoundary === void 0) {
        hasUpdatedFrame = true;
        applyFriction(t2);
        checkCatchBoundary(t2);
      }
      if (timeReachedBoundary !== void 0 && t2 >= timeReachedBoundary) {
        return spring$1.next(t2 - timeReachedBoundary);
      } else {
        !hasUpdatedFrame && applyFriction(t2);
        return state;
      }
    }
  };
}

// node_modules/motion-dom/dist/es/utils/interpolate.mjs
function createMixers(output, ease2, customMixer) {
  const mixers = [];
  const mixerFactory = customMixer || MotionGlobalConfig.mix || mix;
  const numMixers = output.length - 1;
  for (let i2 = 0; i2 < numMixers; i2++) {
    let mixer = mixerFactory(output[i2], output[i2 + 1]);
    if (ease2) {
      const easingFunction = Array.isArray(ease2) ? ease2[i2] || noop : ease2;
      mixer = pipe(easingFunction, mixer);
    }
    mixers.push(mixer);
  }
  return mixers;
}
function interpolate(input, output, { clamp: isClamp = true, ease: ease2, mixer } = {}) {
  const inputLength = input.length;
  invariant(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
  if (inputLength === 1)
    return () => output[0];
  if (inputLength === 2 && output[0] === output[1])
    return () => output[1];
  const isZeroDeltaRange = input[0] === input[1];
  if (input[0] > input[inputLength - 1]) {
    input = [...input].reverse();
    output = [...output].reverse();
  }
  const mixers = createMixers(output, ease2, mixer);
  const numMixers = mixers.length;
  const interpolator = (v2) => {
    if (isZeroDeltaRange && v2 < input[0])
      return output[0];
    let i2 = 0;
    if (numMixers > 1) {
      for (; i2 < input.length - 2; i2++) {
        if (v2 < input[i2 + 1])
          break;
      }
    }
    const progressInRange = progress(input[i2], input[i2 + 1], v2);
    return mixers[i2](progressInRange);
  };
  return isClamp ? (v2) => interpolator(clamp(input[0], input[inputLength - 1], v2)) : interpolator;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i2 = 1; i2 <= remaining; i2++) {
    const offsetProgress = progress(0, remaining, i2);
    offset.push(mixNumber(min, 1, offsetProgress));
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function defaultOffset(arr) {
  const offset = [0];
  fillOffset(offset, arr.length - 1);
  return offset;
}

// node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function convertOffsetToTimes(offset, duration) {
  return offset.map((o) => o * duration);
}

// node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function defaultEasing(values, easing) {
  return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease: ease2 = "easeInOut" }) {
  const easingFunctions = isEasingArray(ease2) ? ease2.map(easingDefinitionToFunction) : easingDefinitionToFunction(ease2);
  const state = {
    done: false,
    value: keyframeValues[0]
  };
  const absoluteTimes = convertOffsetToTimes(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : defaultOffset(keyframeValues),
    duration
  );
  const mapTimeToKeyframe = interpolate(absoluteTimes, keyframeValues, {
    ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
  });
  return {
    calculatedDuration: duration,
    next: (t2) => {
      state.value = mapTimeToKeyframe(t2);
      state.done = t2 >= duration;
      return state;
    }
  };
}

// node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes2, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
  const resolvedKeyframes = keyframes2.filter(isNotNull);
  const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
  const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
  return !index || finalKeyframe === void 0 ? resolvedKeyframes[index] : finalKeyframe;
}

// node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var transitionTypeMap = {
  decay: inertia,
  inertia,
  tween: keyframes,
  keyframes,
  spring
};
function replaceTransitionType(transition) {
  if (typeof transition.type === "string") {
    transition.type = transitionTypeMap[transition.type];
  }
}

// node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var WithPromise = class {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(onResolve, onReject) {
    return this.finished.then(onResolve, onReject);
  }
};

// node_modules/motion-dom/dist/es/animation/JSAnimation.mjs
var percentToProgress = (percent2) => percent2 / 100;
var JSAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.state = "idle";
    this.startTime = null;
    this.isStopped = false;
    this.currentTime = 0;
    this.holdTime = null;
    this.playbackSpeed = 1;
    this.delayState = {
      done: false,
      value: void 0
    };
    this.stop = () => {
      const { motionValue: motionValue2 } = this.options;
      if (motionValue2 && motionValue2.updatedAt !== time.now()) {
        this.tick(time.now());
      }
      this.isStopped = true;
      if (this.state === "idle")
        return;
      this.teardown();
      this.options.onStop?.();
    };
    this.options = options;
    this.initAnimation();
    this.play();
    if (options.autoplay === false)
      this.pause();
  }
  initAnimation() {
    const { options } = this;
    replaceTransitionType(options);
    const { type = keyframes, repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
    let { keyframes: keyframes$1 } = options;
    const generatorFactory = type || keyframes;
    if (false) {
      invariant(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
    }
    if (generatorFactory !== keyframes && typeof keyframes$1[0] !== "number") {
      this.mixKeyframes = pipe(percentToProgress, mix(keyframes$1[0], keyframes$1[1]));
      keyframes$1 = [0, 100];
    }
    const generator = generatorFactory({ ...options, keyframes: keyframes$1 });
    if (repeatType === "mirror") {
      this.mirroredGenerator = generatorFactory({
        ...options,
        keyframes: [...keyframes$1].reverse(),
        velocity: -velocity
      });
    }
    if (generator.calculatedDuration === null) {
      generator.calculatedDuration = calcGeneratorDuration(generator);
    }
    const { calculatedDuration } = generator;
    this.calculatedDuration = calculatedDuration;
    this.resolvedDuration = calculatedDuration + repeatDelay;
    this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
    this.generator = generator;
  }
  updateTime(timestamp) {
    const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
    if (this.holdTime !== null) {
      this.currentTime = this.holdTime;
    } else {
      this.currentTime = animationTime;
    }
  }
  tick(timestamp, sample = false) {
    const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
    if (this.startTime === null)
      return generator.next(0);
    const { delay: delay2 = 0, keyframes: keyframes2, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
    if (this.speed > 0) {
      this.startTime = Math.min(this.startTime, timestamp);
    } else if (this.speed < 0) {
      this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
    }
    if (sample) {
      this.currentTime = timestamp;
    } else {
      this.updateTime(timestamp);
    }
    const timeWithoutDelay = this.currentTime - delay2 * (this.playbackSpeed >= 0 ? 1 : -1);
    const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
    this.currentTime = Math.max(timeWithoutDelay, 0);
    if (this.state === "finished" && this.holdTime === null) {
      this.currentTime = totalDuration;
    }
    let elapsed = this.currentTime;
    let frameGenerator = generator;
    if (repeat) {
      const progress2 = Math.min(this.currentTime, totalDuration) / resolvedDuration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      currentIteration = Math.min(currentIteration, repeat + 1);
      const isOddIteration = Boolean(currentIteration % 2);
      if (isOddIteration) {
        if (repeatType === "reverse") {
          iterationProgress = 1 - iterationProgress;
          if (repeatDelay) {
            iterationProgress -= repeatDelay / resolvedDuration;
          }
        } else if (repeatType === "mirror") {
          frameGenerator = mirroredGenerator;
        }
      }
      elapsed = clamp(0, 1, iterationProgress) * resolvedDuration;
    }
    let state;
    if (isInDelayPhase) {
      this.delayState.value = keyframes2[0];
      state = this.delayState;
    } else {
      state = frameGenerator.next(elapsed);
    }
    if (mixKeyframes && !isInDelayPhase) {
      state.value = mixKeyframes(state.value);
    }
    let { done } = state;
    if (!isInDelayPhase && calculatedDuration !== null) {
      done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
    }
    const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
    if (isAnimationFinished && type !== inertia) {
      state.value = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
    }
    if (onUpdate) {
      onUpdate(state.value);
    }
    if (isAnimationFinished) {
      this.finish();
    }
    return state;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(resolve, reject) {
    return this.finished.then(resolve, reject);
  }
  get duration() {
    return millisecondsToSeconds(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: delay2 = 0 } = this.options || {};
    return this.duration + millisecondsToSeconds(delay2);
  }
  get time() {
    return millisecondsToSeconds(this.currentTime);
  }
  set time(newTime) {
    newTime = secondsToMilliseconds(newTime);
    this.currentTime = newTime;
    if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
      this.holdTime = newTime;
    } else if (this.driver) {
      this.startTime = this.driver.now() - newTime / this.playbackSpeed;
    }
    if (this.driver) {
      this.driver.start(false);
    } else {
      this.startTime = 0;
      this.state = "paused";
      this.holdTime = newTime;
      this.tick(newTime);
    }
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const t2 = this.currentTime;
    if (t2 <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity) {
      return this.generator.velocity(t2);
    }
    const current = this.generator.next(t2).value;
    return getGeneratorVelocity((s2) => this.generator.next(s2).value, t2, current);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(newSpeed) {
    const hasChanged = this.playbackSpeed !== newSpeed;
    if (hasChanged && this.driver) {
      this.updateTime(time.now());
    }
    this.playbackSpeed = newSpeed;
    if (hasChanged && this.driver) {
      this.time = millisecondsToSeconds(this.currentTime);
    }
  }
  play() {
    if (this.isStopped)
      return;
    const { driver = frameloopDriver, startTime } = this.options;
    if (!this.driver) {
      this.driver = driver((timestamp) => this.tick(timestamp));
    }
    this.options.onPlay?.();
    const now2 = this.driver.now();
    if (this.state === "finished") {
      this.updateFinished();
      this.startTime = now2;
    } else if (this.holdTime !== null) {
      this.startTime = now2 - this.holdTime;
    } else if (!this.startTime) {
      this.startTime = startTime ?? now2;
    }
    if (this.state === "finished" && this.speed < 0) {
      this.startTime += this.calculatedDuration;
    }
    this.holdTime = null;
    this.state = "running";
    this.driver.start();
  }
  pause() {
    this.state = "paused";
    this.updateTime(time.now());
    this.holdTime = this.currentTime;
  }
  complete() {
    if (this.state !== "running") {
      this.play();
    }
    this.state = "finished";
    this.holdTime = null;
  }
  finish() {
    this.notifyFinished();
    this.teardown();
    this.state = "finished";
    this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null;
    this.startTime = 0;
    this.tick(0);
    this.teardown();
    this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle";
    this.stopDriver();
    this.startTime = this.holdTime = null;
  }
  stopDriver() {
    if (!this.driver)
      return;
    this.driver.stop();
    this.driver = void 0;
  }
  sample(sampleTime) {
    this.startTime = 0;
    return this.tick(sampleTime, true);
  }
  attachTimeline(timeline) {
    if (this.options.allowFlatten) {
      this.options.type = "keyframes";
      this.options.ease = "linear";
      this.initAnimation();
    }
    this.driver?.stop();
    return timeline.observe(this);
  }
};

// node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function fillWildcards(keyframes2) {
  for (let i2 = 1; i2 < keyframes2.length; i2++) {
    keyframes2[i2] ?? (keyframes2[i2] = keyframes2[i2 - 1]);
  }
}

// node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var radToDeg = (rad) => rad * 180 / Math.PI;
var rotate = (v2) => {
  const angle = radToDeg(Math.atan2(v2[1], v2[0]));
  return rebaseAngle(angle);
};
var matrix2dParsers = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (v2) => (Math.abs(v2[0]) + Math.abs(v2[3])) / 2,
  rotate,
  rotateZ: rotate,
  skewX: (v2) => radToDeg(Math.atan(v2[1])),
  skewY: (v2) => radToDeg(Math.atan(v2[2])),
  skew: (v2) => (Math.abs(v2[1]) + Math.abs(v2[2])) / 2
};
var rebaseAngle = (angle) => {
  angle = angle % 360;
  if (angle < 0)
    angle += 360;
  return angle;
};
var rotateZ = rotate;
var scaleX = (v2) => Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
var scaleY = (v2) => Math.sqrt(v2[4] * v2[4] + v2[5] * v2[5]);
var matrix3dParsers = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX,
  scaleY,
  scale: (v2) => (scaleX(v2) + scaleY(v2)) / 2,
  rotateX: (v2) => rebaseAngle(radToDeg(Math.atan2(v2[6], v2[5]))),
  rotateY: (v2) => rebaseAngle(radToDeg(Math.atan2(-v2[2], v2[0]))),
  rotateZ,
  rotate: rotateZ,
  skewX: (v2) => radToDeg(Math.atan(v2[4])),
  skewY: (v2) => radToDeg(Math.atan(v2[1])),
  skew: (v2) => (Math.abs(v2[1]) + Math.abs(v2[4])) / 2
};
function defaultTransformValue(name) {
  return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
  if (!transform || transform === "none") {
    return defaultTransformValue(name);
  }
  const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let parsers;
  let match;
  if (matrix3dMatch) {
    parsers = matrix3dParsers;
    match = matrix3dMatch;
  } else {
    const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    parsers = matrix2dParsers;
    match = matrix2dMatch;
  }
  if (!match) {
    return defaultTransformValue(name);
  }
  const valueParser = parsers[name];
  const values = match[1].split(",").map(convertTransformToNumber);
  return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
var readTransformValue = (instance, name) => {
  const { transform = "none" } = getComputedStyle(instance);
  return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
  return parseFloat(value.trim());
}

// node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var transformPropOrder = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
];
var transformProps = /* @__PURE__ */ (() => /* @__PURE__ */ new Set([...transformPropOrder, "pathRotation"]))();

// node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
var isNumOrPxType = (v2) => v2 === number || v2 === px;
var transformKeys = /* @__PURE__ */ new Set(["x", "y", "z"]);
var nonTranslationalTransformKeys = transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
  const removedTransforms = [];
  nonTranslationalTransformKeys.forEach((key) => {
    const value = visualElement.getValue(key);
    if (value !== void 0) {
      removedTransforms.push([key, value.get()]);
      value.set(key.startsWith("scale") ? 1 : 0);
    }
  });
  return removedTransforms;
}
var positionalValues = {
  // Dimensions
  width: ({ x: x3 }, { paddingLeft = "0", paddingRight = "0", boxSizing }) => {
    const width = x3.max - x3.min;
    return boxSizing === "border-box" ? width : width - parseFloat(paddingLeft) - parseFloat(paddingRight);
  },
  height: ({ y: y3 }, { paddingTop = "0", paddingBottom = "0", boxSizing }) => {
    const height = y3.max - y3.min;
    return boxSizing === "border-box" ? height : height - parseFloat(paddingTop) - parseFloat(paddingBottom);
  },
  top: (_bbox, { top }) => parseFloat(top),
  left: (_bbox, { left }) => parseFloat(left),
  bottom: ({ y: y3 }, { top }) => parseFloat(top) + (y3.max - y3.min),
  right: ({ x: x3 }, { left }) => parseFloat(left) + (x3.max - x3.min),
  // Transform
  x: (_bbox, { transform }) => parseValueFromTransform(transform, "x"),
  y: (_bbox, { transform }) => parseValueFromTransform(transform, "y")
};
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;

// node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var toResolve = /* @__PURE__ */ new Set();
var isScheduled = false;
var anyNeedsMeasurement = false;
var isForced = false;
function measureAllKeyframes() {
  if (anyNeedsMeasurement) {
    const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
    const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
    const transformsToRestore = /* @__PURE__ */ new Map();
    elementsToMeasure.forEach((element) => {
      const removedTransforms = removeNonTranslationalTransform(element);
      if (!removedTransforms.length)
        return;
      transformsToRestore.set(element, removedTransforms);
      element.render();
    });
    resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
    elementsToMeasure.forEach((element) => {
      element.render();
      const restore = transformsToRestore.get(element);
      if (restore) {
        restore.forEach(([key, value]) => {
          element.getValue(key)?.set(value);
        });
      }
    });
    resolversToMeasure.forEach((resolver) => resolver.measureEndState());
    resolversToMeasure.forEach((resolver) => {
      if (resolver.suspendedScrollY !== void 0) {
        window.scrollTo(0, resolver.suspendedScrollY);
      }
    });
  }
  anyNeedsMeasurement = false;
  isScheduled = false;
  toResolve.forEach((resolver) => resolver.complete(isForced));
  toResolve.clear();
}
function readAllKeyframes() {
  toResolve.forEach((resolver) => {
    resolver.readKeyframes();
    if (resolver.needsMeasurement) {
      anyNeedsMeasurement = true;
    }
  });
}
function flushKeyframeResolvers() {
  isForced = true;
  readAllKeyframes();
  measureAllKeyframes();
  isForced = false;
}
var KeyframeResolver = class {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element, isAsync = false) {
    this.state = "pending";
    this.isAsync = false;
    this.needsMeasurement = false;
    this.unresolvedKeyframes = [...unresolvedKeyframes];
    this.onComplete = onComplete;
    this.name = name;
    this.motionValue = motionValue2;
    this.element = element;
    this.isAsync = isAsync;
  }
  scheduleResolve() {
    this.state = "scheduled";
    if (this.isAsync) {
      toResolve.add(this);
      if (!isScheduled) {
        isScheduled = true;
        frame.read(readAllKeyframes);
        frame.resolveKeyframes(measureAllKeyframes);
      }
    } else {
      this.readKeyframes();
      this.complete();
    }
  }
  readKeyframes() {
    const { unresolvedKeyframes, name, element, motionValue: motionValue2 } = this;
    if (unresolvedKeyframes[0] === null) {
      const currentValue = motionValue2?.get();
      const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
      if (currentValue !== void 0) {
        unresolvedKeyframes[0] = currentValue;
      } else if (element && name) {
        const valueAsRead = element.readValue(name, finalKeyframe);
        if (valueAsRead !== void 0 && valueAsRead !== null) {
          unresolvedKeyframes[0] = valueAsRead;
        }
      }
      if (unresolvedKeyframes[0] === void 0) {
        unresolvedKeyframes[0] = finalKeyframe;
      }
      if (motionValue2 && currentValue === void 0) {
        motionValue2.set(unresolvedKeyframes[0]);
      }
    }
    fillWildcards(unresolvedKeyframes);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(isForcedComplete = false) {
    this.state = "complete";
    this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
    toResolve.delete(this);
  }
  cancel() {
    if (this.state === "scheduled") {
      toResolve.delete(this);
      this.state = "pending";
    }
  }
  resume() {
    if (this.state === "pending")
      this.scheduleResolve();
  }
};

// node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
var isCSSVar = (name) => name.startsWith("--");

// node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function setStyle(element, name, value) {
  isCSSVar(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}

// node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var supportsFlags = {};

// node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function memoSupports(callback, supportsFlag) {
  const memoized = memo2(callback);
  return () => supportsFlags[supportsFlag] ?? memoized();
}

// node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var supportsScrollTimeline = /* @__PURE__ */ memoSupports(() => window.ScrollTimeline !== void 0, "scrollTimeline");

// node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch (e) {
    return false;
  }
  return true;
}, "linearEasing");

// node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs
var cubicBezierAsString = ([a, b2, c2, d2]) => `cubic-bezier(${a}, ${b2}, ${c2}, ${d2})`;

// node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs
var supportedWaapiEasing = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ cubicBezierAsString([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ cubicBezierAsString([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ cubicBezierAsString([0.33, 1.53, 0.69, 0.99])
};

// node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function mapEasingToNativeEasing(easing, duration) {
  if (!easing) {
    return void 0;
  } else if (typeof easing === "function") {
    return supportsLinearEasing() ? generateLinearEasing(easing, duration) : "ease-out";
  } else if (isBezierDefinition(easing)) {
    return cubicBezierAsString(easing);
  } else if (Array.isArray(easing)) {
    return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
  } else {
    return supportedWaapiEasing[easing];
  }
}

// node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function startWaapiAnimation(element, valueName, keyframes2, { delay: delay2 = 0, duration = 300, repeat = 0, repeatType = "loop", ease: ease2 = "easeOut", times } = {}, pseudoElement = void 0) {
  const keyframeOptions = {
    [valueName]: keyframes2
  };
  if (times)
    keyframeOptions.offset = times;
  const easing = mapEasingToNativeEasing(ease2, duration);
  if (Array.isArray(easing))
    keyframeOptions.easing = easing;
  const options = {
    delay: delay2,
    duration,
    easing: !Array.isArray(easing) ? easing : "linear",
    fill: "both",
    iterations: repeat + 1,
    direction: repeatType === "reverse" ? "alternate" : "normal"
  };
  if (pseudoElement)
    options.pseudoElement = pseudoElement;
  return element.animate(keyframeOptions, options);
}

// node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function isGenerator(type) {
  return typeof type === "function" && "applyToOptions" in type;
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function applyGeneratorOptions({ type, ...options }) {
  if (isGenerator(type) && supportsLinearEasing()) {
    return type.applyToOptions(options);
  } else {
    options.duration ?? (options.duration = 300);
    options.ease ?? (options.ease = "easeOut");
  }
  return options;
}

// node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var NativeAnimation = class extends WithPromise {
  constructor(options) {
    super();
    this.finishedTime = null;
    this.isStopped = false;
    this.manualStartTime = null;
    if (!options)
      return;
    const { element, name, keyframes: keyframes2, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
    this.isPseudoElement = Boolean(pseudoElement);
    this.allowFlatten = allowFlatten;
    this.options = options;
    invariant(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
    const transition = applyGeneratorOptions(options);
    this.animation = startWaapiAnimation(element, name, keyframes2, transition, pseudoElement);
    if (transition.autoplay === false) {
      this.animation.pause();
    }
    this.animation.onfinish = () => {
      this.finishedTime = this.time;
      if (!pseudoElement) {
        const keyframe = getFinalKeyframe(keyframes2, this.options, finalKeyframe, this.speed);
        if (this.updateMotionValue) {
          this.updateMotionValue(keyframe);
        }
        setStyle(element, name, keyframe);
        this.animation.cancel();
      }
      onComplete?.();
      this.notifyFinished();
    };
  }
  play() {
    if (this.isStopped)
      return;
    this.manualStartTime = null;
    this.animation.play();
    if (this.state === "finished") {
      this.updateFinished();
    }
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch (e) {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = true;
    const { state } = this;
    if (state === "idle" || state === "finished") {
      return;
    }
    if (this.updateMotionValue) {
      this.updateMotionValue();
    } else {
      this.commitStyles();
    }
    if (!this.isPseudoElement)
      this.cancel();
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const element = this.options?.element;
    if (!this.isPseudoElement && element?.isConnected) {
      this.animation.commitStyles?.();
    }
  }
  get duration() {
    const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
    return millisecondsToSeconds(Number(duration));
  }
  get iterationDuration() {
    const { delay: delay2 = 0 } = this.options || {};
    return this.duration + millisecondsToSeconds(delay2);
  }
  get time() {
    return millisecondsToSeconds(Number(this.animation.currentTime) || 0);
  }
  set time(newTime) {
    const wasFinished = this.finishedTime !== null;
    this.manualStartTime = null;
    this.finishedTime = null;
    this.animation.currentTime = secondsToMilliseconds(newTime);
    if (wasFinished) {
      this.animation.pause();
    }
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(newSpeed) {
    if (newSpeed < 0)
      this.finishedTime = null;
    this.animation.playbackRate = newSpeed;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(newStartTime) {
    this.manualStartTime = this.animation.startTime = newStartTime;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline, rangeStart, rangeEnd, observe }) {
    if (this.allowFlatten) {
      this.animation.effect?.updateTiming({ easing: "linear" });
    }
    this.animation.onfinish = null;
    if (timeline && supportsScrollTimeline()) {
      this.animation.timeline = timeline;
      if (rangeStart)
        this.animation.rangeStart = rangeStart;
      if (rangeEnd)
        this.animation.rangeEnd = rangeEnd;
      return noop;
    } else {
      return observe(this);
    }
  }
};

// node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs
var unsupportedEasingFunctions = {
  anticipate,
  backInOut,
  circInOut
};
function isUnsupportedEase(key) {
  return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
  if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
    transition.ease = unsupportedEasingFunctions[transition.ease];
  }
}

// node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var sampleDelta = 10;
var NativeAnimationExtended = class extends NativeAnimation {
  constructor(options) {
    replaceStringEasing(options);
    replaceTransitionType(options);
    super(options);
    if (options.startTime !== void 0 && options.autoplay !== false) {
      this.startTime = options.startTime;
    }
    this.options = options;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(value) {
    const { motionValue: motionValue2, onUpdate, onComplete, element, ...options } = this.options;
    if (!motionValue2)
      return;
    if (value !== void 0) {
      motionValue2.set(value);
      return;
    }
    const sampleAnimation = new JSAnimation({
      ...options,
      autoplay: false
    });
    const sampleTime = Math.max(sampleDelta, time.now() - this.startTime);
    const delta = clamp(0, sampleDelta, sampleTime - sampleDelta);
    const current = sampleAnimation.sample(sampleTime).value;
    const { name } = this.options;
    if (element && name)
      setStyle(element, name, current);
    motionValue2.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, current, delta);
    sampleAnimation.stop();
  }
};

// node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs
var isAnimatable = (value, name) => {
  if (name === "zIndex")
    return false;
  if (typeof value === "number" || Array.isArray(value))
    return true;
  if (typeof value === "string" && // It's animatable if we have a string
  (complex.test(value) || value === "0") && // And it contains numbers and/or colors
  !value.startsWith("url(")) {
    return true;
  }
  return false;
};

// node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function hasKeyframesChanged(keyframes2) {
  const current = keyframes2[0];
  if (keyframes2.length === 1)
    return true;
  for (let i2 = 0; i2 < keyframes2.length; i2++) {
    if (keyframes2[i2] !== current)
      return true;
  }
}
function canAnimate(keyframes2, name, type, velocity) {
  const originKeyframe = keyframes2[0];
  if (originKeyframe === null) {
    return false;
  }
  if (name === "display" || name === "visibility")
    return true;
  const targetKeyframe = keyframes2[keyframes2.length - 1];
  const isOriginAnimatable = isAnimatable(originKeyframe, name);
  const isTargetAnimatable = isAnimatable(targetKeyframe, name);
  warning(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
  if (!isOriginAnimatable || !isTargetAnimatable) {
    return false;
  }
  return hasKeyframesChanged(keyframes2) || (type === "spring" || isGenerator(type)) && velocity;
}

// node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function makeAnimationInstant(options) {
  options.duration = 0;
  options.type = "keyframes";
}

// node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var acceleratedValues = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]);

// node_modules/motion-dom/dist/es/animation/waapi/utils/is-browser-color.mjs
var browserColorFunctions = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function hasBrowserOnlyColors(keyframes2) {
  for (let i2 = 0; i2 < keyframes2.length; i2++) {
    if (typeof keyframes2[i2] === "string" && browserColorFunctions.test(keyframes2[i2])) {
      return true;
    }
  }
  return false;
}

// node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var colorProperties = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]);
var supportsWaapi = /* @__PURE__ */ memo2(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
  const { motionValue: motionValue2, name, repeatDelay, repeatType, damping, type, keyframes: keyframes2 } = options;
  const subject = motionValue2?.owner?.current;
  if (!(subject instanceof HTMLElement) && !(subject instanceof SVGElement)) {
    return false;
  }
  const { onUpdate, transformTemplate } = motionValue2.owner.getProps();
  return supportsWaapi() && name && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (acceleratedValues.has(name) || colorProperties.has(name) && hasBrowserOnlyColors(keyframes2)) && (name !== "transform" || !transformTemplate) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}

// node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var MAX_RESOLVE_DELAY = 40;
var AsyncMotionValueAnimation = class extends WithPromise {
  constructor({ autoplay = true, delay: delay2 = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes: keyframes2, name, motionValue: motionValue2, element, ...options }) {
    super();
    this.stop = () => {
      if (this._animation) {
        this._animation.stop();
        this.stopTimeline?.();
      }
      this.keyframeResolver?.cancel();
    };
    this.createdAt = time.now();
    const optionsWithDefaults = {
      autoplay,
      delay: delay2,
      type,
      repeat,
      repeatDelay,
      repeatType,
      name,
      motionValue: motionValue2,
      element,
      ...options
    };
    const KeyframeResolver$1 = element?.KeyframeResolver || KeyframeResolver;
    this.keyframeResolver = new KeyframeResolver$1(keyframes2, (resolvedKeyframes, finalKeyframe, forced) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue2, element);
    this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(keyframes2, finalKeyframe, options, sync) {
    this.keyframeResolver = void 0;
    const { name, type, velocity, delay: delay2, isHandoff, onUpdate } = options;
    this.resolvedAt = time.now();
    let canAnimateValue = true;
    if (!canAnimate(keyframes2, name, type, velocity)) {
      canAnimateValue = false;
      if (MotionGlobalConfig.instantAnimations || !delay2) {
        onUpdate?.(getFinalKeyframe(keyframes2, options, finalKeyframe));
      }
      keyframes2[0] = keyframes2[keyframes2.length - 1];
      makeAnimationInstant(options);
      options.repeat = 0;
    }
    const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0;
    const resolvedOptions = {
      startTime,
      finalKeyframe,
      ...options,
      keyframes: keyframes2
    };
    const useWaapi = canAnimateValue && !isHandoff && supportsBrowserAnimation(resolvedOptions);
    const element = resolvedOptions.motionValue?.owner?.current;
    let animation;
    if (useWaapi) {
      try {
        animation = new NativeAnimationExtended({
          ...resolvedOptions,
          element
        });
      } catch {
        animation = new JSAnimation(resolvedOptions);
      }
    } else {
      animation = new JSAnimation(resolvedOptions);
    }
    animation.finished.then(() => {
      this.notifyFinished();
    }).catch(noop);
    if (this.pendingTimeline) {
      this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
      this.pendingTimeline = void 0;
    }
    this._animation = animation;
  }
  get finished() {
    if (!this._animation) {
      return this._finished;
    } else {
      return this.animation.finished;
    }
  }
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
  get animation() {
    if (!this._animation) {
      this.keyframeResolver?.resume();
      flushKeyframeResolvers();
    }
    return this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(newTime) {
    this.animation.time = newTime;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(newSpeed) {
    this.animation.speed = newSpeed;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(timeline) {
    if (this._animation) {
      this.stopTimeline = this.animation.attachTimeline(timeline);
    } else {
      this.pendingTimeline = timeline;
    }
    return () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    if (this._animation) {
      this.animation.cancel();
    }
    this.keyframeResolver?.cancel();
  }
};

// node_modules/motion-dom/dist/es/animation/utils/calc-child-stagger.mjs
function calcChildStagger(children, child, delayChildren, staggerChildren = 0, staggerDirection = 1) {
  const index = Array.from(children).sort((a, b2) => a.sortNodePosition(b2)).indexOf(child);
  const numChildren = children.size;
  const maxStaggerDuration = (numChildren - 1) * staggerChildren;
  const delayIsFunction = typeof delayChildren === "function";
  return delayIsFunction ? delayChildren(index, numChildren) : staggerDirection === 1 ? index * staggerChildren : maxStaggerDuration - index * staggerChildren;
}

// node_modules/motion-dom/dist/es/value/index.mjs
var MAX_VELOCITY_DELTA = 30;
var isFloat = (value) => {
  return !isNaN(parseFloat(value));
};
var collectMotionValues = {
  current: void 0
};
var MotionValue = class {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(init, options = {}) {
    this.canTrackVelocity = null;
    this.events = {};
    this.updateAndNotify = (v2) => {
      const currentTime = time.now();
      if (this.updatedAt !== currentTime) {
        this.setPrevFrameValue();
      }
      this.prev = this.current;
      this.setCurrent(v2);
      if (this.current !== this.prev) {
        this.events.change?.notify(this.current);
        if (this.dependents) {
          for (const dependent of this.dependents) {
            dependent.dirty();
          }
        }
      }
    };
    this.hasAnimated = false;
    this.setCurrent(init);
    this.owner = options.owner;
  }
  setCurrent(current) {
    this.current = current;
    this.updatedAt = time.now();
    if (this.canTrackVelocity === null && current !== void 0) {
      this.canTrackVelocity = isFloat(this.current);
    }
  }
  setPrevFrameValue(prevFrameValue = this.current) {
    this.prevFrameValue = prevFrameValue;
    this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(subscription) {
    if (false) {
      warnOnce(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
    }
    return this.on("change", subscription);
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    const unsubscribe = this.events[eventName].add(callback);
    if (eventName === "change") {
      return () => {
        unsubscribe();
        frame.read(() => {
          if (!this.events.change.getSize()) {
            this.stop();
          }
        });
      };
    }
    return unsubscribe;
  }
  clearListeners() {
    for (const eventManagers in this.events) {
      this.events[eventManagers].clear();
    }
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(passiveEffect, stopPassiveEffect) {
    this.passiveEffect = passiveEffect;
    this.stopPassiveEffect = stopPassiveEffect;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(v2) {
    if (!this.passiveEffect) {
      this.updateAndNotify(v2);
    } else {
      this.passiveEffect(v2, this.updateAndNotify);
    }
  }
  setWithVelocity(prev, current, delta) {
    this.set(current);
    this.prev = void 0;
    this.prevFrameValue = prev;
    this.prevUpdatedAt = this.updatedAt - delta;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(v2, endAnimation = true) {
    this.updateAndNotify(v2);
    this.prev = v2;
    this.prevUpdatedAt = this.prevFrameValue = void 0;
    endAnimation && this.stop();
    if (this.stopPassiveEffect)
      this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(dependent) {
    if (!this.dependents) {
      this.dependents = /* @__PURE__ */ new Set();
    }
    this.dependents.add(dependent);
  }
  removeDependent(dependent) {
    if (this.dependents) {
      this.dependents.delete(dependent);
    }
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    if (collectMotionValues.current) {
      collectMotionValues.current.push(this);
    }
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const currentTime = time.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
      return 0;
    }
    const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
    return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(startAnimation) {
    this.stop();
    return new Promise((resolve) => {
      this.hasAnimated = true;
      this.animation = startAnimation(resolve);
      if (this.events.animationStart) {
        this.events.animationStart.notify();
      }
    }).then(() => {
      if (this.events.animationComplete) {
        this.events.animationComplete.notify();
      }
      this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    if (this.animation) {
      this.animation.stop();
      if (this.events.animationCancel) {
        this.events.animationCancel.notify();
      }
    }
    this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear();
    this.events.destroy?.notify();
    this.clearListeners();
    this.stop();
    if (this.stopPassiveEffect) {
      this.stopPassiveEffect();
    }
  }
};
function motionValue(init, options) {
  return new MotionValue(init, options);
}

// node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function resolveTransition(transition, parentTransition) {
  if (transition?.inherit && parentTransition) {
    const { inherit: _2, ...rest } = transition;
    return { ...parentTransition, ...rest };
  }
  return transition;
}

// node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function getValueTransition(transition, key) {
  const valueTransition = transition?.[key] ?? transition?.["default"] ?? transition;
  if (valueTransition !== transition) {
    return resolveTransition(valueTransition, transition);
  }
  return valueTransition;
}

// node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var underDampedSpring = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
};
var criticallyDampedSpring = (target) => ({
  type: "spring",
  stiffness: 550,
  damping: target === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
});
var keyframesTransition = {
  type: "keyframes",
  duration: 0.8
};
var ease = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
};
var getDefaultTransition = (valueKey, { keyframes: keyframes2 }) => {
  if (keyframes2.length > 2) {
    return keyframesTransition;
  } else if (transformProps.has(valueKey)) {
    return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes2[1]) : underDampedSpring;
  }
  return ease;
};

// node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs
var orchestrationKeys = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function isTransitionDefined(transition) {
  for (const key in transition) {
    if (!orchestrationKeys.has(key))
      return true;
  }
  return false;
}

// node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
  const valueTransition = getValueTransition(transition, name) || {};
  const delay2 = valueTransition.delay || transition.delay || 0;
  let { elapsed = 0 } = transition;
  elapsed = elapsed - secondsToMilliseconds(delay2);
  const options = {
    keyframes: Array.isArray(target) ? target : [null, target],
    ease: "easeOut",
    velocity: value.getVelocity(),
    ...valueTransition,
    delay: -elapsed,
    onUpdate: (v2) => {
      value.set(v2);
      valueTransition.onUpdate && valueTransition.onUpdate(v2);
    },
    onComplete: () => {
      onComplete();
      valueTransition.onComplete && valueTransition.onComplete();
    },
    name,
    motionValue: value,
    element: isHandoff ? void 0 : element
  };
  if (!isTransitionDefined(valueTransition)) {
    Object.assign(options, getDefaultTransition(name, options));
  }
  options.duration && (options.duration = secondsToMilliseconds(options.duration));
  options.repeatDelay && (options.repeatDelay = secondsToMilliseconds(options.repeatDelay));
  if (options.from !== void 0) {
    options.keyframes[0] = options.from;
  }
  let shouldSkip = false;
  if (options.type === false || options.duration === 0 && !options.repeatDelay) {
    makeAnimationInstant(options);
    if (options.delay === 0) {
      shouldSkip = true;
    }
  }
  if (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations || element?.shouldSkipAnimations || valueTransition.skipAnimations) {
    shouldSkip = true;
    makeAnimationInstant(options);
    options.delay = 0;
  }
  options.allowFlatten = !valueTransition.type && !valueTransition.ease;
  if (shouldSkip && !isHandoff && value.get() !== void 0) {
    const finalKeyframe = getFinalKeyframe(options.keyframes, valueTransition);
    if (finalKeyframe !== void 0) {
      frame.update(() => {
        options.onUpdate(finalKeyframe);
        options.onComplete();
      });
      return;
    }
  }
  return valueTransition.isSync ? new JSAnimation(options) : new AsyncMotionValueAnimation(options);
};

// node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs
var splitCSSVariableRegex = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function parseCSSVariable(current) {
  const match = splitCSSVariableRegex.exec(current);
  if (!match)
    return [,];
  const [, token1, token2, fallback] = match;
  return [`--${token1 ?? token2}`, fallback];
}
var maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
  invariant(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
  const [token, fallback] = parseCSSVariable(current);
  if (!token)
    return;
  const resolved = window.getComputedStyle(element).getPropertyValue(token);
  if (resolved) {
    const trimmed = resolved.trim();
    return isNumericalString(trimmed) ? parseFloat(trimmed) : trimmed;
  }
  return isCSSVariableToken(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}

// node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function getValueState(visualElement) {
  const state = [{}, {}];
  visualElement?.values.forEach((value, key) => {
    state[0][key] = value.get();
    state[1][key] = value.getVelocity();
  });
  return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  if (typeof definition === "string") {
    definition = props.variants && props.variants[definition];
  }
  if (typeof definition === "function") {
    const [current, velocity] = getValueState(visualElement);
    definition = definition(custom !== void 0 ? custom : props.custom, current, velocity);
  }
  return definition;
}

// node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function resolveVariant(visualElement, definition, custom) {
  const props = visualElement.getProps();
  return resolveVariantFromProps(props, definition, custom !== void 0 ? custom : props.custom, visualElement);
}

// node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var positionalKeys = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...transformPropOrder
]);

// node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs
var isKeyframesTarget = (v2) => {
  return Array.isArray(v2);
};

// node_modules/motion-dom/dist/es/render/utils/setters.mjs
function setMotionValue(visualElement, key, value) {
  if (visualElement.hasValue(key)) {
    visualElement.getValue(key).set(value);
  } else {
    visualElement.addValue(key, motionValue(value));
  }
}
function resolveFinalValueInKeyframes(v2) {
  return isKeyframesTarget(v2) ? v2[v2.length - 1] || 0 : v2;
}
function setTarget(visualElement, definition) {
  const resolved = resolveVariant(visualElement, definition);
  let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
  target = { ...target, ...transitionEnd };
  for (const key in target) {
    const value = resolveFinalValueInKeyframes(target[key]);
    setMotionValue(visualElement, key, value);
  }
}

// node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var isMotionValue = (value) => Boolean(value && value.getVelocity);

// node_modules/motion-dom/dist/es/value/will-change/is.mjs
function isWillChangeMotionValue(value) {
  return Boolean(isMotionValue(value) && value.add);
}

// node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function addValueToWillChange(visualElement, key) {
  const willChange = visualElement.getValue("willChange");
  if (isWillChangeMotionValue(willChange)) {
    return willChange.add(key);
  } else if (!willChange && MotionGlobalConfig.WillChange) {
    const newWillChange = new MotionGlobalConfig.WillChange("auto");
    visualElement.addValue("willChange", newWillChange);
    newWillChange.add(key);
  }
}

// node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function camelToDash(str) {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}

// node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs
var optimizedAppearDataId = "framerAppearId";
var optimizedAppearDataAttribute = "data-" + camelToDash(optimizedAppearDataId);

// node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function getOptimisedAppearId(visualElement) {
  return visualElement.props[optimizedAppearDataAttribute];
}

// node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
  const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
  needsAnimating[key] = false;
  return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay: delay2 = 0, transitionOverride, type } = {}) {
  let { transition, transitionEnd, ...target } = targetAndTransition;
  const defaultTransition = visualElement.getDefaultTransition();
  transition = transition ? resolveTransition(transition, defaultTransition) : defaultTransition;
  const reduceMotion = transition?.reduceMotion;
  const skipAnimations = transition?.skipAnimations;
  if (transitionOverride)
    transition = transitionOverride;
  const animations2 = [];
  const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
  const path = transition?.path;
  if (path) {
    path.animateVisualElement(visualElement, target, transition, delay2, animations2);
  }
  for (const key in target) {
    const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
    const valueTarget = target[key];
    if (valueTarget === void 0 || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
      continue;
    }
    const valueTransition = {
      delay: delay2,
      ...getValueTransition(transition || {}, key)
    };
    if (skipAnimations)
      valueTransition.skipAnimations = true;
    const currentValue = value.get();
    if (currentValue !== void 0 && !value.isAnimating() && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
      frame.update(() => value.set(valueTarget));
      continue;
    }
    let isHandoff = false;
    if (window.MotionHandoffAnimation) {
      const appearId = getOptimisedAppearId(visualElement);
      if (appearId) {
        const startTime = window.MotionHandoffAnimation(appearId, key, frame);
        if (startTime !== null) {
          valueTransition.startTime = startTime;
          isHandoff = true;
        }
      }
    }
    addValueToWillChange(visualElement, key);
    const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
    value.start(animateMotionValue(key, value, valueTarget, shouldReduceMotion && positionalKeys.has(key) ? { type: false } : valueTransition, visualElement, isHandoff));
    const animation = value.animation;
    if (animation) {
      animations2.push(animation);
    }
  }
  if (transitionEnd) {
    const applyTransitionEnd = () => frame.update(() => {
      transitionEnd && setTarget(visualElement, transitionEnd);
    });
    if (animations2.length) {
      Promise.all(animations2).then(applyTransitionEnd);
    } else {
      applyTransitionEnd();
    }
  }
  return animations2;
}

// node_modules/motion-dom/dist/es/animation/interfaces/visual-element-variant.mjs
function animateVariant(visualElement, variant, options = {}) {
  const resolved = resolveVariant(visualElement, variant, options.type === "exit" ? visualElement.presenceContext?.custom : void 0);
  let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
  if (options.transitionOverride) {
    transition = options.transitionOverride;
  }
  const getAnimation = resolved ? () => Promise.all(animateTarget(visualElement, resolved, options)) : () => Promise.resolve();
  const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size ? (forwardDelay = 0) => {
    const { delayChildren = 0, staggerChildren, staggerDirection } = transition;
    return animateChildren(visualElement, variant, forwardDelay, delayChildren, staggerChildren, staggerDirection, options);
  } : () => Promise.resolve();
  const { when } = transition;
  if (when) {
    const [first, last] = when === "beforeChildren" ? [getAnimation, getChildAnimations] : [getChildAnimations, getAnimation];
    return first().then(() => last());
  } else {
    return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
  }
}
function animateChildren(visualElement, variant, delay2 = 0, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
  const animations2 = [];
  for (const child of visualElement.variantChildren) {
    child.notify("AnimationStart", variant);
    animations2.push(animateVariant(child, variant, {
      ...options,
      delay: delay2 + (typeof delayChildren === "function" ? 0 : delayChildren) + calcChildStagger(visualElement.variantChildren, child, delayChildren, staggerChildren, staggerDirection)
    }).then(() => child.notify("AnimationComplete", variant)));
  }
  return Promise.all(animations2);
}

// node_modules/motion-dom/dist/es/animation/interfaces/visual-element.mjs
function animateVisualElement(visualElement, definition, options = {}) {
  visualElement.notify("AnimationStart", definition);
  let animation;
  if (Array.isArray(definition)) {
    const animations2 = definition.map((variant) => animateVariant(visualElement, variant, options));
    animation = Promise.all(animations2);
  } else if (typeof definition === "string") {
    animation = animateVariant(visualElement, definition, options);
  } else {
    const resolvedDefinition = typeof definition === "function" ? resolveVariant(visualElement, definition, options.custom) : definition;
    animation = Promise.all(animateTarget(visualElement, resolvedDefinition, options));
  }
  return animation.then(() => {
    visualElement.notify("AnimationComplete", definition);
  });
}

// node_modules/motion-dom/dist/es/value/types/auto.mjs
var auto = {
  test: (v2) => v2 === "auto",
  parse: (v2) => v2
};

// node_modules/motion-dom/dist/es/value/types/test.mjs
var testValueType = (v2) => (type) => type.test(v2);

// node_modules/motion-dom/dist/es/value/types/dimensions.mjs
var dimensionValueTypes = [number, px, percent, degrees, vw, vh, auto];
var findDimensionValueType = (v2) => dimensionValueTypes.find(testValueType(v2));

// node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function isNone(value) {
  if (typeof value === "number") {
    return value === 0;
  } else if (value !== null) {
    return value === "none" || value === "0" || isZeroValueString(value);
  } else {
    return true;
  }
}

// node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var maxDefaults = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v2) {
  const [name, value] = v2.slice(0, -1).split("(");
  if (name === "drop-shadow")
    return v2;
  const [number2] = value.match(floatRegex) || [];
  if (!number2)
    return v2;
  const unit = value.replace(number2, "");
  let defaultValue = maxDefaults.has(name) ? 1 : 0;
  if (number2 !== value)
    defaultValue *= 100;
  return name + "(" + defaultValue + unit + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu;
var filter = {
  ...complex,
  getAnimatableNone: (v2) => {
    const functions = v2.match(functionRegex);
    return functions ? functions.map(applyDefaultFilter).join(" ") : v2;
  }
};

// node_modules/motion-dom/dist/es/value/types/complex/mask.mjs
var mask = {
  ...complex,
  getAnimatableNone: (v2) => {
    const parsed = complex.parse(v2);
    const transformer = complex.createTransformer(v2);
    return transformer(parsed.map((v3) => typeof v3 === "number" ? 0 : typeof v3 === "object" ? { ...v3, alpha: 1 } : v3));
  }
};

// node_modules/motion-dom/dist/es/value/types/int.mjs
var int = {
  ...number,
  transform: Math.round
};

// node_modules/motion-dom/dist/es/value/types/maps/transform.mjs
var transformValueTypes = {
  rotate: degrees,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: degrees,
  rotateX: degrees,
  rotateY: degrees,
  rotateZ: degrees,
  scale,
  scaleX: scale,
  scaleY: scale,
  scaleZ: scale,
  skew: degrees,
  skewX: degrees,
  skewY: degrees,
  distance: px,
  translateX: px,
  translateY: px,
  translateZ: px,
  x: px,
  y: px,
  z: px,
  perspective: px,
  transformPerspective: px,
  opacity: alpha,
  originX: progressPercentage,
  originY: progressPercentage,
  originZ: px
};

// node_modules/motion-dom/dist/es/value/types/maps/number.mjs
var numberValueTypes = {
  // Border props
  borderWidth: px,
  borderTopWidth: px,
  borderRightWidth: px,
  borderBottomWidth: px,
  borderLeftWidth: px,
  borderRadius: px,
  borderTopLeftRadius: px,
  borderTopRightRadius: px,
  borderBottomRightRadius: px,
  borderBottomLeftRadius: px,
  // Positioning props
  width: px,
  maxWidth: px,
  height: px,
  maxHeight: px,
  top: px,
  right: px,
  bottom: px,
  left: px,
  inset: px,
  insetBlock: px,
  insetBlockStart: px,
  insetBlockEnd: px,
  insetInline: px,
  insetInlineStart: px,
  insetInlineEnd: px,
  // Spacing props
  padding: px,
  paddingTop: px,
  paddingRight: px,
  paddingBottom: px,
  paddingLeft: px,
  paddingBlock: px,
  paddingBlockStart: px,
  paddingBlockEnd: px,
  paddingInline: px,
  paddingInlineStart: px,
  paddingInlineEnd: px,
  margin: px,
  marginTop: px,
  marginRight: px,
  marginBottom: px,
  marginLeft: px,
  marginBlock: px,
  marginBlockStart: px,
  marginBlockEnd: px,
  marginInline: px,
  marginInlineStart: px,
  marginInlineEnd: px,
  // Typography
  fontSize: px,
  // Misc
  backgroundPositionX: px,
  backgroundPositionY: px,
  ...transformValueTypes,
  zIndex: int,
  // SVG
  fillOpacity: alpha,
  strokeOpacity: alpha,
  numOctaves: int
};

// node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs
var defaultValueTypes = {
  ...numberValueTypes,
  // Color props
  color,
  backgroundColor: color,
  outlineColor: color,
  fill: color,
  stroke: color,
  // Border props
  borderColor: color,
  borderTopColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  borderLeftColor: color,
  filter,
  WebkitFilter: filter,
  mask,
  WebkitMask: mask
};
var getDefaultValueType = (key) => defaultValueTypes[key];

// node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs
var customTypes = /* @__PURE__ */ new Set([filter, mask]);
function getAnimatableNone2(key, value) {
  let defaultValueType = getDefaultValueType(key);
  if (!customTypes.has(defaultValueType))
    defaultValueType = complex;
  return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : void 0;
}

// node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var invalidTemplates = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
  let i2 = 0;
  let animatableTemplate = void 0;
  while (i2 < unresolvedKeyframes.length && !animatableTemplate) {
    const keyframe = unresolvedKeyframes[i2];
    if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && analyseComplexValue(keyframe).values.length) {
      animatableTemplate = unresolvedKeyframes[i2];
    }
    i2++;
  }
  if (animatableTemplate && name) {
    for (const noneIndex of noneKeyframeIndexes) {
      unresolvedKeyframes[noneIndex] = getAnimatableNone2(name, animatableTemplate);
    }
  }
}

// node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var DOMKeyframesResolver = class extends KeyframeResolver {
  constructor(unresolvedKeyframes, onComplete, name, motionValue2, element) {
    super(unresolvedKeyframes, onComplete, name, motionValue2, element, true);
  }
  readKeyframes() {
    const { unresolvedKeyframes, element, name } = this;
    if (!element || !element.current)
      return;
    super.readKeyframes();
    for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
      let keyframe = unresolvedKeyframes[i2];
      if (typeof keyframe === "string") {
        keyframe = keyframe.trim();
        if (isCSSVariableToken(keyframe)) {
          const resolved = getVariableValue(keyframe, element.current);
          if (resolved !== void 0) {
            unresolvedKeyframes[i2] = resolved;
          }
          if (i2 === unresolvedKeyframes.length - 1) {
            this.finalKeyframe = keyframe;
          }
        }
      }
    }
    this.resolveNoneKeyframes();
    if (!positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
      return;
    }
    const [origin, target] = unresolvedKeyframes;
    const originType = findDimensionValueType(origin);
    const targetType = findDimensionValueType(target);
    const originHasVar = containsCSSVariable(origin);
    const targetHasVar = containsCSSVariable(target);
    if (originHasVar !== targetHasVar && positionalValues[name]) {
      this.needsMeasurement = true;
      return;
    }
    if (originType === targetType)
      return;
    if (isNumOrPxType(originType) && isNumOrPxType(targetType)) {
      for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
        const value = unresolvedKeyframes[i2];
        if (typeof value === "string") {
          unresolvedKeyframes[i2] = parseFloat(value);
        }
      }
    } else if (positionalValues[name]) {
      this.needsMeasurement = true;
    }
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes, name } = this;
    const noneKeyframeIndexes = [];
    for (let i2 = 0; i2 < unresolvedKeyframes.length; i2++) {
      if (unresolvedKeyframes[i2] === null || isNone(unresolvedKeyframes[i2])) {
        noneKeyframeIndexes.push(i2);
      }
    }
    if (noneKeyframeIndexes.length) {
      makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name);
    }
  }
  measureInitialState() {
    const { element, unresolvedKeyframes, name } = this;
    if (!element || !element.current)
      return;
    if (name === "height") {
      this.suspendedScrollY = window.pageYOffset;
    }
    this.measuredOrigin = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    unresolvedKeyframes[0] = this.measuredOrigin;
    const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
    if (measureKeyframe !== void 0) {
      element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
    }
  }
  measureEndState() {
    const { element, name, unresolvedKeyframes } = this;
    if (!element || !element.current)
      return;
    const value = element.getValue(name);
    value && value.jump(this.measuredOrigin, false);
    const finalKeyframeIndex = unresolvedKeyframes.length - 1;
    const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
    unresolvedKeyframes[finalKeyframeIndex] = positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
    if (finalKeyframe !== null && this.finalKeyframe === void 0) {
      this.finalKeyframe = finalKeyframe;
    }
    if (this.removedTransforms?.length) {
      this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
        element.getValue(unsetTransformName).set(unsetTransformValue);
      });
    }
    this.resolveNoneKeyframes();
  }
};

// node_modules/motion-dom/dist/es/utils/border-radius.mjs
var cornerRadiusProps = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];

// node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function resolveElements(elementOrSelector, scope, selectorCache) {
  if (elementOrSelector == null) {
    return [];
  }
  if (elementOrSelector instanceof EventTarget) {
    return [elementOrSelector];
  } else if (typeof elementOrSelector === "string") {
    let root = document;
    if (scope) {
      root = scope.current;
    }
    const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
    return elements ? Array.from(elements) : [];
  }
  return Array.from(elementOrSelector).filter((element) => element != null);
}

// node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var getValueAsType = (value, type) => {
  return type && typeof value === "number" ? type.transform(value) : value;
};

// node_modules/motion-dom/dist/es/utils/is-html-element.mjs
function isHTMLElement(element) {
  return isObject(element) && "offsetHeight" in element && !("ownerSVGElement" in element);
}

// node_modules/motion-dom/dist/es/frameloop/microtask.mjs
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, false);

// node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs
var isDragging = {
  x: false,
  y: false
};
function isDragActive() {
  return isDragging.x || isDragging.y;
}

// node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs
function setDragLock(axis) {
  if (axis === "x" || axis === "y") {
    if (isDragging[axis]) {
      return null;
    } else {
      isDragging[axis] = true;
      return () => {
        isDragging[axis] = false;
      };
    }
  } else {
    if (isDragging.x || isDragging.y) {
      return null;
    } else {
      isDragging.x = isDragging.y = true;
      return () => {
        isDragging.x = isDragging.y = false;
      };
    }
  }
}

// node_modules/motion-dom/dist/es/gestures/utils/setup.mjs
function setupGesture(elementOrSelector, options) {
  const elements = resolveElements(elementOrSelector);
  const gestureAbortController = new AbortController();
  const eventOptions = {
    passive: true,
    ...options,
    signal: gestureAbortController.signal
  };
  const cancel = () => gestureAbortController.abort();
  return [elements, eventOptions, cancel];
}

// node_modules/motion-dom/dist/es/gestures/hover.mjs
function isValidHover(event) {
  return !(event.pointerType === "touch" || isDragActive());
}
function hover(elementOrSelector, onHoverStart, options = {}) {
  const [elements, eventOptions, cancel] = setupGesture(elementOrSelector, options);
  elements.forEach((element) => {
    let isPressed = false;
    let deferredHoverEnd = false;
    let hoverEndCallback;
    const removePointerLeave = () => {
      element.removeEventListener("pointerleave", onPointerLeave);
    };
    const endHover = (event) => {
      if (hoverEndCallback) {
        hoverEndCallback(event);
        hoverEndCallback = void 0;
      }
      removePointerLeave();
    };
    const onPointerUp = (event) => {
      isPressed = false;
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      if (deferredHoverEnd) {
        deferredHoverEnd = false;
        endHover(event);
      }
    };
    const onPointerDown = () => {
      isPressed = true;
      window.addEventListener("pointerup", onPointerUp, eventOptions);
      window.addEventListener("pointercancel", onPointerUp, eventOptions);
    };
    const onPointerLeave = (leaveEvent) => {
      if (leaveEvent.pointerType === "touch")
        return;
      if (isPressed) {
        deferredHoverEnd = true;
        return;
      }
      endHover(leaveEvent);
    };
    const onPointerEnter = (enterEvent) => {
      if (!isValidHover(enterEvent))
        return;
      deferredHoverEnd = false;
      const onHoverEnd = onHoverStart(element, enterEvent);
      if (typeof onHoverEnd !== "function")
        return;
      hoverEndCallback = onHoverEnd;
      element.addEventListener("pointerleave", onPointerLeave, eventOptions);
    };
    element.addEventListener("pointerenter", onPointerEnter, eventOptions);
    element.addEventListener("pointerdown", onPointerDown, eventOptions);
  });
  return cancel;
}

// node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs
var isNodeOrChild = (parent, child) => {
  if (!child) {
    return false;
  } else if (parent === child) {
    return true;
  } else {
    return isNodeOrChild(parent, child.parentElement);
  }
};

// node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs
var isPrimaryPointer = (event) => {
  if (event.pointerType === "mouse") {
    return typeof event.button !== "number" || event.button <= 0;
  } else {
    return event.isPrimary !== false;
  }
};

// node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs
var keyboardAccessibleElements = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function isElementKeyboardAccessible(element) {
  return keyboardAccessibleElements.has(element.tagName) || element.isContentEditable === true;
}
var textInputElements = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function isElementTextInput(element) {
  return textInputElements.has(element.tagName) || element.isContentEditable === true;
}

// node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs
var isPressing = /* @__PURE__ */ new WeakSet();

// node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs
function filterEvents(callback) {
  return (event) => {
    if (event.key !== "Enter")
      return;
    callback(event);
  };
}
function firePointerEvent(target, type) {
  target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
var enableKeyboardPress = (focusEvent, eventOptions) => {
  const element = focusEvent.currentTarget;
  if (!element)
    return;
  const handleKeydown = filterEvents(() => {
    if (isPressing.has(element))
      return;
    firePointerEvent(element, "down");
    const handleKeyup = filterEvents(() => {
      firePointerEvent(element, "up");
    });
    const handleBlur = () => firePointerEvent(element, "cancel");
    element.addEventListener("keyup", handleKeyup, eventOptions);
    element.addEventListener("blur", handleBlur, eventOptions);
  });
  element.addEventListener("keydown", handleKeydown, eventOptions);
  element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};

// node_modules/motion-dom/dist/es/gestures/press/index.mjs
function isValidPressEvent(event) {
  return isPrimaryPointer(event) && !isDragActive();
}
var claimedPointerDownEvents = /* @__PURE__ */ new WeakSet();
function press(targetOrSelector, onPressStart, options = {}) {
  const [targets, eventOptions, cancelEvents] = setupGesture(targetOrSelector, options);
  const startPress = (startEvent) => {
    const target = startEvent.currentTarget;
    if (!isValidPressEvent(startEvent))
      return;
    if (claimedPointerDownEvents.has(startEvent))
      return;
    isPressing.add(target);
    if (options.stopPropagation) {
      claimedPointerDownEvents.add(startEvent);
    }
    const onPressEnd = onPressStart(target, startEvent);
    const endEventOptions = { ...eventOptions, capture: true };
    const onPointerEnd = (endEvent, success) => {
      window.removeEventListener("pointerup", onPointerUp, endEventOptions);
      window.removeEventListener("pointercancel", onPointerCancel, endEventOptions);
      if (isPressing.has(target)) {
        isPressing.delete(target);
      }
      if (!isValidPressEvent(endEvent)) {
        return;
      }
      if (typeof onPressEnd === "function") {
        onPressEnd(endEvent, { success });
      }
    };
    const onPointerUp = (upEvent) => {
      onPointerEnd(upEvent, target === window || target === document || options.useGlobalTarget || isNodeOrChild(target, upEvent.target));
    };
    const onPointerCancel = (cancelEvent) => {
      onPointerEnd(cancelEvent, false);
    };
    window.addEventListener("pointerup", onPointerUp, endEventOptions);
    window.addEventListener("pointercancel", onPointerCancel, endEventOptions);
  };
  targets.forEach((target) => {
    const pointerDownTarget = options.useGlobalTarget ? window : target;
    pointerDownTarget.addEventListener("pointerdown", startPress, eventOptions);
    if (isHTMLElement(target)) {
      target.addEventListener("focus", (event) => enableKeyboardPress(event, eventOptions));
      if (!isElementKeyboardAccessible(target) && !target.hasAttribute("tabindex")) {
        target.tabIndex = 0;
      }
    }
  });
  return cancelEvents;
}

// node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function isSVGElement(element) {
  return isObject(element) && "ownerSVGElement" in element;
}

// node_modules/motion-dom/dist/es/resize/handle-element.mjs
var resizeHandlers = /* @__PURE__ */ new WeakMap();
var observer;
var getSize = (borderBoxAxis, svgAxis, htmlAxis) => (target, borderBoxSize) => {
  if (borderBoxSize && borderBoxSize[0]) {
    return borderBoxSize[0][borderBoxAxis + "Size"];
  } else if (isSVGElement(target) && "getBBox" in target) {
    return target.getBBox()[svgAxis];
  } else {
    return target[htmlAxis];
  }
};
var getWidth = /* @__PURE__ */ getSize("inline", "width", "offsetWidth");
var getHeight = /* @__PURE__ */ getSize("block", "height", "offsetHeight");
function notifyTarget({ target, borderBoxSize }) {
  resizeHandlers.get(target)?.forEach((handler) => {
    handler(target, {
      get width() {
        return getWidth(target, borderBoxSize);
      },
      get height() {
        return getHeight(target, borderBoxSize);
      }
    });
  });
}
function notifyAll(entries) {
  entries.forEach(notifyTarget);
}
function createResizeObserver() {
  if (typeof ResizeObserver === "undefined")
    return;
  observer = new ResizeObserver(notifyAll);
}
function resizeElement(target, handler) {
  if (!observer)
    createResizeObserver();
  const elements = resolveElements(target);
  elements.forEach((element) => {
    let elementHandlers = resizeHandlers.get(element);
    if (!elementHandlers) {
      elementHandlers = /* @__PURE__ */ new Set();
      resizeHandlers.set(element, elementHandlers);
    }
    elementHandlers.add(handler);
    observer?.observe(element);
  });
  return () => {
    elements.forEach((element) => {
      const elementHandlers = resizeHandlers.get(element);
      elementHandlers?.delete(handler);
      if (!elementHandlers?.size) {
        observer?.unobserve(element);
      }
    });
  };
}

// node_modules/motion-dom/dist/es/resize/handle-window.mjs
var windowCallbacks = /* @__PURE__ */ new Set();
var windowResizeHandler;
function createWindowResizeHandler() {
  windowResizeHandler = () => {
    const info = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    windowCallbacks.forEach((callback) => callback(info));
  };
  window.addEventListener("resize", windowResizeHandler);
}
function resizeWindow(callback) {
  windowCallbacks.add(callback);
  if (!windowResizeHandler)
    createWindowResizeHandler();
  return () => {
    windowCallbacks.delete(callback);
    if (!windowCallbacks.size && typeof windowResizeHandler === "function") {
      window.removeEventListener("resize", windowResizeHandler);
      windowResizeHandler = void 0;
    }
  };
}

// node_modules/motion-dom/dist/es/resize/index.mjs
function resize(a, b2) {
  return typeof a === "function" ? resizeWindow(a) : resizeElement(a, b2);
}

// node_modules/motion-dom/dist/es/stats/buffer.mjs
var statsBuffer = {
  value: null,
  addProjectionMetrics: null
};

// node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function isSVGSVGElement(element) {
  return isSVGElement(element) && element.tagName === "svg";
}

// node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var valueTypes = [...dimensionValueTypes, color, complex];
var findValueType = (v2) => valueTypes.find(testValueType(v2));

// node_modules/motion-dom/dist/es/projection/geometry/models.mjs
var createAxisDelta = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
});
var createDelta = () => ({
  x: createAxisDelta(),
  y: createAxisDelta()
});
var createAxis = () => ({ min: 0, max: 0 });
var createBox = () => ({
  x: createAxis(),
  y: createAxis()
});

// node_modules/motion-dom/dist/es/render/store.mjs
var visualElementStore = /* @__PURE__ */ new WeakMap();

// node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function isAnimationControls(v2) {
  return v2 !== null && typeof v2 === "object" && typeof v2.start === "function";
}

// node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function isVariantLabel(v2) {
  return typeof v2 === "string" || Array.isArray(v2);
}

// node_modules/motion-dom/dist/es/render/utils/variant-props.mjs
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
];
var variantProps = ["initial", ...variantPriorityOrder];

// node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function isControllingVariants(props) {
  return isAnimationControls(props.animate) || variantProps.some((name) => isVariantLabel(props[name]));
}
function isVariantNode(props) {
  return Boolean(isControllingVariants(props) || props.variants);
}

// node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function updateMotionValuesFromProps(element, next, prev) {
  for (const key in next) {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (isMotionValue(nextValue)) {
      element.addValue(key, nextValue);
    } else if (isMotionValue(prevValue)) {
      element.addValue(key, motionValue(nextValue, { owner: element }));
    } else if (prevValue !== nextValue) {
      if (element.hasValue(key)) {
        const existingValue = element.getValue(key);
        if (existingValue.liveStyle === true) {
          existingValue.jump(nextValue);
        } else if (!existingValue.hasAnimated) {
          existingValue.set(nextValue);
        }
      } else {
        const latestValue = element.getStaticValue(key);
        element.addValue(key, motionValue(latestValue !== void 0 ? latestValue : nextValue, { owner: element }));
      }
    }
  }
  for (const key in prev) {
    if (next[key] === void 0)
      element.removeValue(key);
  }
  return next;
}

// node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var prefersReducedMotion = { current: null };
var hasReducedMotionListener = { current: false };

// node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs
var isBrowser2 = typeof window !== "undefined";
function initPrefersReducedMotion() {
  hasReducedMotionListener.current = true;
  if (!isBrowser2)
    return;
  if (window.matchMedia) {
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
    const setReducedMotionPreferences = () => prefersReducedMotion.current = motionMediaQuery.matches;
    motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
    setReducedMotionPreferences();
  } else {
    prefersReducedMotion.current = false;
  }
}

// node_modules/motion-dom/dist/es/render/VisualElement.mjs
var propEventHandlers = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
var featureDefinitions = {};
function setFeatureDefinitions(definitions) {
  featureDefinitions = definitions;
}
function getFeatureDefinitions() {
  return featureDefinitions;
}
var VisualElement = class {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
    return {};
  }
  constructor({ parent, props, presenceContext, reducedMotionConfig, skipAnimations, blockInitialAnimation, visualState }, options = {}) {
    this.current = null;
    this.children = /* @__PURE__ */ new Set();
    this.isVariantNode = false;
    this.isControllingVariants = false;
    this.shouldReduceMotion = null;
    this.shouldSkipAnimations = false;
    this.values = /* @__PURE__ */ new Map();
    this.KeyframeResolver = KeyframeResolver;
    this.features = {};
    this.valueSubscriptions = /* @__PURE__ */ new Map();
    this.prevMotionValues = {};
    this.hasBeenMounted = false;
    this.events = {};
    this.propEventSubscriptions = {};
    this.notifyUpdate = () => this.notify("Update", this.latestValues);
    this.render = () => {
      if (!this.current)
        return;
      this.triggerBuild();
      this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
    };
    this.renderScheduledAt = 0;
    this.scheduleRender = () => {
      const now2 = time.now();
      if (this.renderScheduledAt < now2) {
        this.renderScheduledAt = now2;
        frame.render(this.render, false, true);
      }
    };
    const { latestValues, renderState } = visualState;
    this.latestValues = latestValues;
    this.baseTarget = { ...latestValues };
    this.initialValues = props.initial ? { ...latestValues } : {};
    this.renderState = renderState;
    this.parent = parent;
    this.props = props;
    this.presenceContext = presenceContext;
    this.depth = parent ? parent.depth + 1 : 0;
    this.reducedMotionConfig = reducedMotionConfig;
    this.skipAnimationsConfig = skipAnimations;
    this.options = options;
    this.blockInitialAnimation = Boolean(blockInitialAnimation);
    this.isControllingVariants = isControllingVariants(props);
    this.isVariantNode = isVariantNode(props);
    if (this.isVariantNode) {
      this.variantChildren = /* @__PURE__ */ new Set();
    }
    this.manuallyAnimateOnMount = Boolean(parent && parent.current);
    const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
    for (const key in initialMotionValues) {
      const value = initialMotionValues[key];
      if (latestValues[key] !== void 0 && isMotionValue(value)) {
        value.set(latestValues[key]);
      }
    }
  }
  mount(instance) {
    if (this.hasBeenMounted) {
      for (const key in this.initialValues) {
        this.values.get(key)?.jump(this.initialValues[key]);
        this.latestValues[key] = this.initialValues[key];
      }
    }
    this.current = instance;
    visualElementStore.set(instance, this);
    if (this.projection && !this.projection.instance) {
      this.projection.mount(instance);
    }
    if (this.parent && this.isVariantNode && !this.isControllingVariants) {
      this.removeFromVariantTree = this.parent.addVariantChild(this);
    }
    this.values.forEach((value, key) => this.bindToMotionValue(key, value));
    if (this.reducedMotionConfig === "never") {
      this.shouldReduceMotion = false;
    } else if (this.reducedMotionConfig === "always") {
      this.shouldReduceMotion = true;
    } else {
      if (!hasReducedMotionListener.current) {
        initPrefersReducedMotion();
      }
      this.shouldReduceMotion = prefersReducedMotion.current;
    }
    if (false) {
      warnOnce(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
    }
    this.shouldSkipAnimations = this.skipAnimationsConfig ?? false;
    this.parent?.addChild(this);
    this.update(this.props, this.presenceContext);
    this.hasBeenMounted = true;
  }
  unmount() {
    this.projection && this.projection.unmount();
    cancelFrame(this.notifyUpdate);
    cancelFrame(this.render);
    this.valueSubscriptions.forEach((remove) => remove());
    this.valueSubscriptions.clear();
    this.removeFromVariantTree && this.removeFromVariantTree();
    this.parent?.removeChild(this);
    for (const key in this.events) {
      this.events[key].clear();
    }
    for (const key in this.features) {
      const feature = this.features[key];
      if (feature) {
        feature.unmount();
        feature.isMounted = false;
      }
    }
    this.current = null;
  }
  addChild(child) {
    this.children.add(child);
    this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set());
    this.enteringChildren.add(child);
  }
  removeChild(child) {
    this.children.delete(child);
    this.enteringChildren && this.enteringChildren.delete(child);
  }
  bindToMotionValue(key, value) {
    if (this.valueSubscriptions.has(key)) {
      this.valueSubscriptions.get(key)();
    }
    if (value.accelerate && acceleratedValues.has(key) && this.current instanceof HTMLElement) {
      const { factory, keyframes: keyframes2, times, ease: ease2, duration } = value.accelerate;
      const animation = new NativeAnimation({
        element: this.current,
        name: key,
        keyframes: keyframes2,
        times,
        ease: ease2,
        duration: secondsToMilliseconds(duration)
      });
      const cleanup = factory(animation);
      this.valueSubscriptions.set(key, () => {
        cleanup();
        animation.cancel();
      });
      return;
    }
    const valueIsTransform = transformProps.has(key);
    if (valueIsTransform && this.onBindTransform) {
      this.onBindTransform();
    }
    const removeOnChange = value.on("change", (latestValue) => {
      this.latestValues[key] = latestValue;
      this.props.onUpdate && frame.preRender(this.notifyUpdate);
      if (valueIsTransform && this.projection) {
        this.projection.isTransformDirty = true;
      }
      this.scheduleRender();
    });
    let removeSyncCheck;
    if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
      removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
    }
    this.valueSubscriptions.set(key, () => {
      removeOnChange();
      if (removeSyncCheck)
        removeSyncCheck();
    });
  }
  sortNodePosition(other) {
    if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
      return 0;
    }
    return this.sortInstanceNodePosition(this.current, other.current);
  }
  updateFeatures() {
    let key = "animation";
    for (key in featureDefinitions) {
      const featureDefinition = featureDefinitions[key];
      if (!featureDefinition)
        continue;
      const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
      if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
        this.features[key] = new FeatureConstructor(this);
      }
      if (this.features[key]) {
        const feature = this.features[key];
        if (feature.isMounted) {
          feature.update();
        } else {
          feature.mount();
          feature.isMounted = true;
        }
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
  }
  getStaticValue(key) {
    return this.latestValues[key];
  }
  setStaticValue(key, value) {
    this.latestValues[key] = value;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(props, presenceContext) {
    if (props.transformTemplate || this.props.transformTemplate) {
      this.scheduleRender();
    }
    this.prevProps = this.props;
    this.props = props;
    this.prevPresenceContext = this.presenceContext;
    this.presenceContext = presenceContext;
    for (let i2 = 0; i2 < propEventHandlers.length; i2++) {
      const key = propEventHandlers[i2];
      if (this.propEventSubscriptions[key]) {
        this.propEventSubscriptions[key]();
        delete this.propEventSubscriptions[key];
      }
      const listenerName = "on" + key;
      const listener = props[listenerName];
      if (listener) {
        this.propEventSubscriptions[key] = this.on(key, listener);
      }
    }
    this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
    if (this.handleChildMotionValue) {
      this.handleChildMotionValue();
    }
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(name) {
    return this.props.variants ? this.props.variants[name] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(child) {
    const closestVariantNode = this.getClosestVariantNode();
    if (closestVariantNode) {
      closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
      return () => closestVariantNode.variantChildren.delete(child);
    }
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(key, value) {
    const existingValue = this.values.get(key);
    if (value !== existingValue) {
      if (existingValue)
        this.removeValue(key);
      this.bindToMotionValue(key, value);
      this.values.set(key, value);
      this.latestValues[key] = value.get();
    }
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(key) {
    this.values.delete(key);
    const unsubscribe = this.valueSubscriptions.get(key);
    if (unsubscribe) {
      unsubscribe();
      this.valueSubscriptions.delete(key);
    }
    delete this.latestValues[key];
    this.removeValueFromRenderState(key, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(key) {
    return this.values.has(key);
  }
  getValue(key, defaultValue) {
    if (this.props.values && this.props.values[key]) {
      return this.props.values[key];
    }
    let value = this.values.get(key);
    if (value === void 0 && defaultValue !== void 0) {
      value = motionValue(defaultValue === null ? void 0 : defaultValue, { owner: this });
      this.addValue(key, value);
    }
    return value;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(key, target) {
    let value = this.latestValues[key] !== void 0 || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
    if (value !== void 0 && value !== null) {
      if (typeof value === "string" && (isNumericalString(value) || isZeroValueString(value))) {
        value = parseFloat(value);
      } else if (!findValueType(value) && complex.test(target)) {
        value = getAnimatableNone2(key, target);
      }
      this.setBaseTarget(key, isMotionValue(value) ? value.get() : value);
    }
    return isMotionValue(value) ? value.get() : value;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(key, value) {
    this.baseTarget[key] = value;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(key) {
    const { initial } = this.props;
    let valueFromInitial;
    if (typeof initial === "string" || typeof initial === "object") {
      const variant = resolveVariantFromProps(this.props, initial, this.presenceContext?.custom);
      if (variant) {
        valueFromInitial = variant[key];
      }
    }
    if (initial && valueFromInitial !== void 0) {
      return valueFromInitial;
    }
    const target = this.getBaseTargetFromProps(this.props, key);
    if (target !== void 0 && !isMotionValue(target))
      return target;
    return this.initialValues[key] !== void 0 && valueFromInitial === void 0 ? void 0 : this.baseTarget[key];
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = new SubscriptionManager();
    }
    return this.events[eventName].add(callback);
  }
  notify(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].notify(...args);
    }
  }
  scheduleRenderMicrotask() {
    microtask.render(this.render);
  }
};

// node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs
var DOMVisualElement = class extends VisualElement {
  constructor() {
    super(...arguments);
    this.KeyframeResolver = DOMKeyframesResolver;
  }
  sortInstanceNodePosition(a, b2) {
    return a.compareDocumentPosition(b2) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(props, key) {
    const style = props.style;
    return style ? style[key] : void 0;
  }
  removeValueFromRenderState(key, { vars, style }) {
    delete vars[key];
    delete style[key];
  }
  handleChildMotionValue() {
    if (this.childSubscription) {
      this.childSubscription();
      delete this.childSubscription;
    }
    const { children } = this.props;
    if (isMotionValue(children)) {
      this.childSubscription = children.on("change", (latest) => {
        if (this.current) {
          this.current.textContent = `${latest}`;
        }
      });
    }
  }
};

// node_modules/motion-dom/dist/es/render/Feature.mjs
var Feature = class {
  constructor(node) {
    this.isMounted = false;
    this.node = node;
  }
  update() {
  }
};

// node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function convertBoundingBoxToBox({ top, left, right, bottom }) {
  return {
    x: { min: left, max: right },
    y: { min: top, max: bottom }
  };
}
function convertBoxToBoundingBox({ x: x3, y: y3 }) {
  return { top: y3.min, right: x3.max, bottom: y3.max, left: x3.min };
}
function transformBoxPoints(point, transformPoint2) {
  if (!transformPoint2)
    return point;
  const topLeft = transformPoint2({ x: point.left, y: point.top });
  const bottomRight = transformPoint2({ x: point.right, y: point.bottom });
  return {
    top: topLeft.y,
    left: topLeft.x,
    bottom: bottomRight.y,
    right: bottomRight.x
  };
}

// node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs
function isIdentityScale(scale2) {
  return scale2 === void 0 || scale2 === 1;
}
function hasScale({ scale: scale2, scaleX: scaleX2, scaleY: scaleY2 }) {
  return !isIdentityScale(scale2) || !isIdentityScale(scaleX2) || !isIdentityScale(scaleY2);
}
function hasTransform(values) {
  return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
  return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
  return value && value !== "0%";
}

// node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs
function scalePoint(point, scale2, originPoint) {
  const distanceFromOrigin = point - originPoint;
  const scaled = scale2 * distanceFromOrigin;
  return originPoint + scaled;
}
function applyPointDelta(point, translate, scale2, originPoint, boxScale) {
  if (boxScale !== void 0) {
    point = scalePoint(point, boxScale, originPoint);
  }
  return scalePoint(point, scale2, originPoint) + translate;
}
function applyAxisDelta(axis, translate = 0, scale2 = 1, originPoint, boxScale) {
  axis.min = applyPointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = applyPointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function applyBoxDelta(box, { x: x3, y: y3 }) {
  applyAxisDelta(box.x, x3.translate, x3.scale, x3.originPoint);
  applyAxisDelta(box.y, y3.translate, y3.scale, y3.originPoint);
}
var TREE_SCALE_SNAP_MIN = 0.999999999999;
var TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
  const treeLength = treePath.length;
  if (!treeLength)
    return;
  treeScale.x = treeScale.y = 1;
  let node;
  let delta;
  for (let i2 = 0; i2 < treeLength; i2++) {
    node = treePath[i2];
    delta = node.projectionDelta;
    const { visualElement } = node.options;
    if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
      continue;
    }
    if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
      translateAxis(box.x, -node.scroll.offset.x);
      translateAxis(box.y, -node.scroll.offset.y);
    }
    if (delta) {
      treeScale.x *= delta.x.scale;
      treeScale.y *= delta.y.scale;
      applyBoxDelta(box, delta);
    }
    if (isSharedTransition && hasTransform(node.latestValues)) {
      transformBox(box, node.latestValues, node.layout?.layoutBox);
    }
  }
  if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
    treeScale.x = 1;
  }
  if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
    treeScale.y = 1;
  }
}
function translateAxis(axis, distance2) {
  axis.min += distance2;
  axis.max += distance2;
}
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
  const originPoint = mixNumber(axis.min, axis.max, axisOrigin);
  applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
function resolveAxisTranslate(value, axis) {
  if (typeof value === "string") {
    return parseFloat(value) / 100 * (axis.max - axis.min);
  }
  return value;
}
function transformBox(box, transform, sourceBox) {
  const resolveBox = sourceBox ?? box;
  transformAxis(box.x, resolveAxisTranslate(transform.x, resolveBox.x), transform.scaleX, transform.scale, transform.originX);
  transformAxis(box.y, resolveAxisTranslate(transform.y, resolveBox.y), transform.scaleY, transform.scale, transform.originY);
}

// node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function measureViewportBox(instance, transformPoint2) {
  return convertBoundingBoxToBox(transformBoxPoints(instance.getBoundingClientRect(), transformPoint2));
}
function measurePageBox(element, rootProjectionNode2, transformPagePoint) {
  const viewportBox = measureViewportBox(element, transformPagePoint);
  const { scroll } = rootProjectionNode2;
  if (scroll) {
    translateAxis(viewportBox.x, scroll.offset.x);
    translateAxis(viewportBox.y, scroll.offset.y);
  }
  return viewportBox;
}

// node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var translateAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
};
var numTransforms = transformPropOrder.length;
function buildTransform(latestValues, transform, transformTemplate) {
  let transformString = "";
  let transformIsDefault = true;
  for (let i2 = 0; i2 < numTransforms; i2++) {
    const key = transformPropOrder[i2];
    const value = latestValues[key];
    if (value === void 0)
      continue;
    let valueIsDefault = true;
    if (typeof value === "number") {
      valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
    } else {
      const parsed = parseFloat(value);
      valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
    }
    if (!valueIsDefault || transformTemplate) {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (!valueIsDefault) {
        transformIsDefault = false;
        const transformName = translateAlias[key] || key;
        transformString += `${transformName}(${valueAsType}) `;
      }
      if (transformTemplate) {
        transform[key] = valueAsType;
      }
    }
  }
  const pathRotation = latestValues.pathRotation;
  if (pathRotation) {
    transformIsDefault = false;
    transformString += `rotate(${getValueAsType(pathRotation, numberValueTypes.pathRotation)}) `;
  }
  transformString = transformString.trim();
  if (transformTemplate) {
    transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
  } else if (transformIsDefault) {
    transformString = "none";
  }
  return transformString;
}

// node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function buildHTMLStyles(state, latestValues, transformTemplate) {
  const { style, vars, transformOrigin } = state;
  let hasTransform2 = false;
  let hasTransformOrigin = false;
  for (const key in latestValues) {
    const value = latestValues[key];
    if (transformProps.has(key)) {
      hasTransform2 = true;
      continue;
    } else if (isCSSVariableName(key)) {
      vars[key] = value;
      continue;
    } else {
      const valueAsType = getValueAsType(value, numberValueTypes[key]);
      if (key.startsWith("origin")) {
        hasTransformOrigin = true;
        transformOrigin[key] = valueAsType;
      } else {
        style[key] = valueAsType;
      }
    }
  }
  if (!latestValues.transform) {
    if (hasTransform2 || transformTemplate) {
      style.transform = buildTransform(latestValues, state.transform, transformTemplate);
    } else if (style.transform) {
      style.transform = "none";
    }
  }
  if (hasTransformOrigin) {
    const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
    style.transformOrigin = `${originX} ${originY} ${originZ}`;
  }
}

// node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function renderHTML(element, { style, vars }, styleProp, projection) {
  const elementStyle = element.style;
  let key;
  for (key in style) {
    elementStyle[key] = style[key];
  }
  projection?.applyProjectionStyles(elementStyle, styleProp);
  for (key in vars) {
    elementStyle.setProperty(key, vars[key]);
  }
}

// node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function pixelsToPercent(pixels, axis) {
  if (axis.max === axis.min)
    return 0;
  return pixels / (axis.max - axis.min) * 100;
}
var correctBorderRadius = {
  correct: (latest, node) => {
    if (!node.target)
      return latest;
    if (typeof latest === "string") {
      if (px.test(latest)) {
        latest = parseFloat(latest);
      } else {
        return latest;
      }
    }
    const x3 = pixelsToPercent(latest, node.target.x);
    const y3 = pixelsToPercent(latest, node.target.y);
    return `${x3}% ${y3}%`;
  }
};

// node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs
var correctBoxShadow = {
  correct: (latest, { treeScale, projectionDelta }) => {
    const original = latest;
    const shadow = complex.parse(latest);
    if (shadow.length > 5)
      return original;
    const template = complex.createTransformer(latest);
    const offset = typeof shadow[0] !== "number" ? 1 : 0;
    const xScale = projectionDelta.x.scale * treeScale.x;
    const yScale = projectionDelta.y.scale * treeScale.y;
    shadow[0 + offset] /= xScale;
    shadow[1 + offset] /= yScale;
    const averageScale = mixNumber(xScale, yScale, 0.5);
    if (typeof shadow[2 + offset] === "number")
      shadow[2 + offset] /= averageScale;
    if (typeof shadow[3 + offset] === "number")
      shadow[3 + offset] /= averageScale;
    return template(shadow);
  }
};

// node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs
var scaleCorrectors = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [...cornerRadiusProps]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};

// node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function isForcedMotionValue(key, { layout: layout2, layoutId }) {
  return transformProps.has(key) || key.startsWith("origin") || (layout2 || layoutId !== void 0) && (!!scaleCorrectors[key] || key === "opacity");
}

// node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
  const style = props.style;
  const prevStyle = prevProps?.style;
  const newValues = {};
  if (!style)
    return newValues;
  for (const key in style) {
    if (isMotionValue(style[key]) || prevStyle && isMotionValue(prevStyle[key]) || isForcedMotionValue(key, props) || visualElement?.getValue(key)?.liveStyle !== void 0) {
      newValues[key] = style[key];
    }
  }
  return newValues;
}

// node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function getComputedStyle2(element) {
  return window.getComputedStyle(element);
}
var HTMLVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "html";
    this.renderInstance = renderHTML;
  }
  mount(instance) {
    invariant(Boolean(instance.style), "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref");
    super.mount(instance);
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      return this.projection?.isProjecting ? defaultTransformValue(key) : readTransformValue(instance, key);
    } else {
      const computedStyle = getComputedStyle2(instance);
      const value = (isCSSVariableName(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
      return typeof value === "string" ? value.trim() : value;
    }
  }
  measureInstanceViewportBox(instance, { transformPagePoint }) {
    return measureViewportBox(instance, transformPagePoint);
  }
  build(renderState, latestValues, props) {
    buildHTMLStyles(renderState, latestValues, props.transformTemplate);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps(props, prevProps, visualElement);
  }
};

// node_modules/motion-dom/dist/es/render/svg/utils/path.mjs
var dashKeys = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
};
var camelKeys = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
  attrs.pathLength = 1;
  const keys = useDashCase ? dashKeys : camelKeys;
  attrs[keys.offset] = `${-offset}`;
  attrs[keys.array] = `${length} ${spacing}`;
}

// node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var cssStyleProperties = [
  "transform",
  "opacity",
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function buildSVGAttrs(state, {
  attrX,
  attrY,
  attrScale,
  pathLength,
  pathSpacing = 1,
  pathOffset = 0,
  // This is object creation, which we try to avoid per-frame.
  ...latest
}, isSVGTag2, transformTemplate, styleProp) {
  buildHTMLStyles(state, latest, transformTemplate);
  if (isSVGTag2) {
    if (state.style.viewBox) {
      state.attrs.viewBox = state.style.viewBox;
    }
    return;
  }
  state.attrs = state.style;
  state.style = {};
  const { attrs, style } = state;
  for (const key of cssStyleProperties) {
    if (attrs[key] !== void 0) {
      style[key] = attrs[key];
      delete attrs[key];
    }
  }
  if (style.transform || attrs.transformOrigin) {
    style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
    delete attrs.transformOrigin;
  }
  if (style.transform) {
    style.transformBox = styleProp?.transformBox ?? "fill-box";
    delete attrs.transformBox;
  }
  if (attrX !== void 0)
    attrs.x = attrX;
  if (attrY !== void 0)
    attrs.y = attrY;
  if (attrScale !== void 0)
    attrs.scale = attrScale;
  if (pathLength !== void 0) {
    buildSVGPath(attrs, pathLength, pathSpacing, pathOffset, false);
  }
}

// node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var camelCaseAttributes = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]);

// node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs
var isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";

// node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function renderSVG(element, renderState, _styleProp, projection) {
  renderHTML(element, renderState, void 0, projection);
  for (const key in renderState.attrs) {
    element.setAttribute(!camelCaseAttributes.has(key) ? camelToDash(key) : key, renderState.attrs[key]);
  }
}

// node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function scrapeMotionValuesFromProps2(props, prevProps, visualElement) {
  const newValues = scrapeMotionValuesFromProps(props, prevProps, visualElement);
  for (const key in props) {
    if (isMotionValue(props[key]) || isMotionValue(prevProps[key])) {
      const targetKey = transformPropOrder.indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
      newValues[targetKey] = props[key];
    }
  }
  return newValues;
}

// node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var SVGVisualElement = class extends DOMVisualElement {
  constructor() {
    super(...arguments);
    this.type = "svg";
    this.isSVGTag = false;
    this.measureInstanceViewportBox = createBox;
  }
  getBaseTargetFromProps(props, key) {
    return props[key];
  }
  readValueFromInstance(instance, key) {
    if (transformProps.has(key)) {
      const defaultType = getDefaultValueType(key);
      return defaultType ? defaultType.default || 0 : 0;
    }
    if (cssStyleProperties.includes(key)) {
      const computedStyle = getComputedStyle(instance);
      const value = computedStyle[key];
      if (typeof value === "string" && value)
        return value.trim();
    }
    key = !camelCaseAttributes.has(key) ? camelToDash(key) : key;
    return instance.getAttribute(key);
  }
  scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    return scrapeMotionValuesFromProps2(props, prevProps, visualElement);
  }
  build(renderState, latestValues, props) {
    buildSVGAttrs(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
  }
  renderInstance(instance, renderState, styleProp, projection) {
    renderSVG(instance, renderState, styleProp, projection);
  }
  mount(instance) {
    this.isSVGTag = isSVGTag(instance.tagName);
    super.mount(instance);
  }
};

// node_modules/motion-dom/dist/es/render/utils/get-variant-context.mjs
var numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
  if (!visualElement)
    return void 0;
  if (!visualElement.isControllingVariants) {
    const context3 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
    if (visualElement.props.initial !== void 0) {
      context3.initial = visualElement.props.initial;
    }
    return context3;
  }
  const context2 = {};
  for (let i2 = 0; i2 < numVariantProps; i2++) {
    const name = variantProps[i2];
    const prop = visualElement.props[name];
    if (isVariantLabel(prop) || prop === false) {
      context2[name] = prop;
    }
  }
  return context2;
}

// node_modules/motion-dom/dist/es/render/utils/shallow-compare.mjs
function shallowCompare(next, prev) {
  if (!Array.isArray(prev))
    return false;
  const prevLength = prev.length;
  if (prevLength !== next.length)
    return false;
  for (let i2 = 0; i2 < prevLength; i2++) {
    if (prev[i2] !== next[i2])
      return false;
  }
  return true;
}

// node_modules/motion-dom/dist/es/render/utils/animation-state.mjs
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function createAnimateFunction(visualElement) {
  return (animations2) => {
    return Promise.all(animations2.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
  };
}
function createAnimationState(visualElement) {
  let animate = createAnimateFunction(visualElement);
  let state = createState();
  let isInitialRender = true;
  let wasReset = false;
  const buildResolvedTypeValues = (type) => (acc, definition) => {
    const resolved = resolveVariant(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : void 0);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = { ...acc, ...target, ...transitionEnd };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    const { props } = visualElement;
    const context2 = getVariantContext(visualElement.parent) || {};
    const animations2 = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i2 = 0; i2 < numAnimationTypes; i2++) {
      const type = reversePriorityOrder[i2];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context2[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false)
        removedVariantIndex = i2;
      let isInherited = prop === context2[type] && prop !== props[type] && propIsVariant;
      if (isInherited && (isInitialRender || wasReset) && visualElement.manuallyAnimateOnMount) {
        isInherited = false;
      }
      typeState.protectedKeys = { ...encounteredKeys };
      if (
        // If it isn't active and hasn't *just* been set as inactive
        !typeState.isActive && activeDelta === null || // If we didn't and don't have any defined prop for this animation type
        !prop && !typeState.prevProp || // Or if the prop doesn't define an animation
        isAnimationControls(prop) || typeof prop === "boolean"
      ) {
        continue;
      }
      if (type === "exit" && typeState.isActive && activeDelta !== true) {
        if (typeState.prevResolvedValues) {
          encounteredKeys = {
            ...encounteredKeys,
            ...typeState.prevResolvedValues
          };
        }
        continue;
      }
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || // If we're making this variant active, we want to always make it active
      type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || // If we removed a higher-priority variant (i is in reverse order)
      i2 > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      if (activeDelta === false)
        resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = false;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (encounteredKeys.hasOwnProperty(key))
          continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) {
          valueHasChanged = !shallowCompare(next, prev) || variantDidChange;
        } else {
          valueHasChanged = next !== prev;
        }
        if (valueHasChanged) {
          if (next !== void 0 && next !== null) {
            markToAnimate(key);
          } else {
            removedKeys.add(key);
          }
        } else if (next !== void 0 && removedKeys.has(key)) {
          markToAnimate(key);
        } else {
          typeState.protectedKeys[key] = true;
        }
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) {
        encounteredKeys = { ...encounteredKeys, ...resolvedValues };
      }
      if ((isInitialRender || wasReset) && visualElement.blockInitialAnimation) {
        shouldAnimateType = false;
      }
      const willAnimateViaParent = isInherited && variantDidChange;
      const needsAnimating = !willAnimateViaParent || handledRemovedValues;
      if (shouldAnimateType && needsAnimating) {
        animations2.push(...definitionList.map((animation) => {
          const options = { type };
          if (typeof animation === "string" && (isInitialRender || wasReset) && !willAnimateViaParent && visualElement.manuallyAnimateOnMount && visualElement.parent) {
            const { parent } = visualElement;
            const parentVariant = resolveVariant(parent, animation);
            if (parent.enteringChildren && parentVariant) {
              const { delayChildren } = parentVariant.transition || {};
              options.delay = calcChildStagger(parent.enteringChildren, visualElement, delayChildren);
            }
          }
          return {
            animation,
            options
          };
        }));
      }
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      if (typeof props.initial !== "boolean") {
        const initialTransition = resolveVariant(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
        if (initialTransition && initialTransition.transition) {
          fallbackAnimation.transition = initialTransition.transition;
        }
      }
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        const motionValue2 = visualElement.getValue(key);
        if (motionValue2)
          motionValue2.liveStyle = true;
        fallbackAnimation[key] = fallbackTarget ?? null;
      });
      animations2.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations2.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) {
      shouldAnimate = false;
    }
    isInitialRender = false;
    wasReset = false;
    return shouldAnimate ? animate(animations2) : Promise.resolve();
  }
  function setActive(type, isActive) {
    if (state[type].isActive === isActive)
      return Promise.resolve();
    visualElement.variantChildren?.forEach((child) => child.animationState?.setActive(type, isActive));
    state[type].isActive = isActive;
    const animations2 = animateChanges(type);
    for (const key in state) {
      state[key].protectedKeys = {};
    }
    return animations2;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state,
    reset: () => {
      state = createState();
      wasReset = true;
    }
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") {
    return next !== prev;
  } else if (Array.isArray(next)) {
    return !shallowCompare(next, prev);
  }
  return false;
}
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whileTap: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}

// node_modules/motion-dom/dist/es/projection/geometry/copy.mjs
function copyAxisInto(axis, originAxis) {
  axis.min = originAxis.min;
  axis.max = originAxis.max;
}
function copyBoxInto(box, originBox) {
  copyAxisInto(box.x, originBox.x);
  copyAxisInto(box.y, originBox.y);
}
function copyAxisDeltaInto(delta, originDelta) {
  delta.translate = originDelta.translate;
  delta.scale = originDelta.scale;
  delta.originPoint = originDelta.originPoint;
  delta.origin = originDelta.origin;
}

// node_modules/motion-dom/dist/es/projection/geometry/delta-calc.mjs
var SCALE_PRECISION = 1e-4;
var SCALE_MIN = 1 - SCALE_PRECISION;
var SCALE_MAX = 1 + SCALE_PRECISION;
var TRANSLATE_PRECISION = 0.01;
var TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
var TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
  return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
  return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
  delta.origin = origin;
  delta.originPoint = mixNumber(source.min, source.max, delta.origin);
  delta.scale = calcLength(target) / calcLength(source);
  delta.translate = mixNumber(target.min, target.max, delta.origin) - delta.originPoint;
  if (delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX || isNaN(delta.scale)) {
    delta.scale = 1;
  }
  if (delta.translate >= TRANSLATE_MIN && delta.translate <= TRANSLATE_MAX || isNaN(delta.translate)) {
    delta.translate = 0;
  }
}
function calcBoxDelta(delta, source, target, origin) {
  calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : void 0);
  calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : void 0);
}
function calcRelativeAxis(target, relative, parent, anchor = 0) {
  const anchorPoint = anchor ? mixNumber(parent.min, parent.max, anchor) : parent.min;
  target.min = anchorPoint + relative.min;
  target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent, anchor) {
  calcRelativeAxis(target.x, relative.x, parent.x, anchor?.x);
  calcRelativeAxis(target.y, relative.y, parent.y, anchor?.y);
}
function calcRelativeAxisPosition(target, layout2, parent, anchor = 0) {
  const anchorPoint = anchor ? mixNumber(parent.min, parent.max, anchor) : parent.min;
  target.min = layout2.min - anchorPoint;
  target.max = target.min + calcLength(layout2);
}
function calcRelativePosition(target, layout2, parent, anchor) {
  calcRelativeAxisPosition(target.x, layout2.x, parent.x, anchor?.x);
  calcRelativeAxisPosition(target.y, layout2.y, parent.y, anchor?.y);
}

// node_modules/motion-dom/dist/es/projection/geometry/delta-remove.mjs
function removePointDelta(point, translate, scale2, originPoint, boxScale) {
  point -= translate;
  point = scalePoint(point, 1 / scale2, originPoint);
  if (boxScale !== void 0) {
    point = scalePoint(point, 1 / boxScale, originPoint);
  }
  return point;
}
function removeAxisDelta(axis, translate = 0, scale2 = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
  if (percent.test(translate)) {
    translate = parseFloat(translate);
    const relativeProgress = mixNumber(sourceAxis.min, sourceAxis.max, translate / 100);
    translate = relativeProgress - sourceAxis.min;
  }
  if (typeof translate !== "number")
    return;
  let originPoint = mixNumber(originAxis.min, originAxis.max, origin);
  if (axis === originAxis)
    originPoint -= translate;
  axis.min = removePointDelta(axis.min, translate, scale2, originPoint, boxScale);
  axis.max = removePointDelta(axis.max, translate, scale2, originPoint, boxScale);
}
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
  removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
var xKeys = ["x", "scaleX", "originX"];
var yKeys = ["y", "scaleY", "originY"];
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
  removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : void 0, sourceBox ? sourceBox.x : void 0);
  removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : void 0, sourceBox ? sourceBox.y : void 0);
}

// node_modules/motion-dom/dist/es/projection/geometry/utils.mjs
function isAxisDeltaZero(delta) {
  return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
  return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b2) {
  return a.min === b2.min && a.max === b2.max;
}
function boxEquals(a, b2) {
  return axisEquals(a.x, b2.x) && axisEquals(a.y, b2.y);
}
function axisEqualsRounded(a, b2) {
  return Math.round(a.min) === Math.round(b2.min) && Math.round(a.max) === Math.round(b2.max);
}
function boxEqualsRounded(a, b2) {
  return axisEqualsRounded(a.x, b2.x) && axisEqualsRounded(a.y, b2.y);
}
function aspectRatio(box) {
  return calcLength(box.x) / calcLength(box.y);
}
function axisDeltaEquals(a, b2) {
  return a.translate === b2.translate && a.scale === b2.scale && a.originPoint === b2.originPoint;
}

// node_modules/motion-dom/dist/es/projection/utils/each-axis.mjs
function eachAxis(callback) {
  return [callback("x"), callback("y")];
}

// node_modules/motion-dom/dist/es/projection/styles/transform.mjs
function buildProjectionTransform(delta, treeScale, latestTransform) {
  let transform = "";
  const xTranslate = delta.x.translate / treeScale.x;
  const yTranslate = delta.y.translate / treeScale.y;
  const zTranslate = latestTransform?.z || 0;
  if (xTranslate || yTranslate || zTranslate) {
    transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
  }
  if (treeScale.x !== 1 || treeScale.y !== 1) {
    transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
  }
  if (latestTransform) {
    const { transformPerspective, rotate: rotate2, pathRotation, rotateX, rotateY, skewX, skewY } = latestTransform;
    if (transformPerspective)
      transform = `perspective(${transformPerspective}px) ${transform}`;
    if (rotate2)
      transform += `rotate(${rotate2}deg) `;
    if (pathRotation)
      transform += `rotate(${pathRotation}deg) `;
    if (rotateX)
      transform += `rotateX(${rotateX}deg) `;
    if (rotateY)
      transform += `rotateY(${rotateY}deg) `;
    if (skewX)
      transform += `skewX(${skewX}deg) `;
    if (skewY)
      transform += `skewY(${skewY}deg) `;
  }
  const elementScaleX = delta.x.scale * treeScale.x;
  const elementScaleY = delta.y.scale * treeScale.y;
  if (elementScaleX !== 1 || elementScaleY !== 1) {
    transform += `scale(${elementScaleX}, ${elementScaleY})`;
  }
  return transform || "none";
}

// node_modules/motion-dom/dist/es/projection/animation/mix-values.mjs
var numBorders = cornerRadiusProps.length;
var asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
var isPx = (value) => typeof value === "number" || px.test(value);
function mixValues(target, follow, lead, progress2, shouldCrossfadeOpacity, isOnlyMember) {
  if (shouldCrossfadeOpacity) {
    target.opacity = mixNumber(0, lead.opacity ?? 1, easeCrossfadeIn(progress2));
    target.opacityExit = mixNumber(follow.opacity ?? 1, 0, easeCrossfadeOut(progress2));
  } else if (isOnlyMember) {
    target.opacity = mixNumber(follow.opacity ?? 1, lead.opacity ?? 1, progress2);
  }
  for (let i2 = 0; i2 < numBorders; i2++) {
    const borderLabel = cornerRadiusProps[i2];
    let followRadius = getRadius(follow, borderLabel);
    let leadRadius = getRadius(lead, borderLabel);
    if (followRadius === void 0 && leadRadius === void 0)
      continue;
    followRadius || (followRadius = 0);
    leadRadius || (leadRadius = 0);
    const canMix = followRadius === 0 || leadRadius === 0 || isPx(followRadius) === isPx(leadRadius);
    if (canMix) {
      target[borderLabel] = Math.max(mixNumber(asNumber(followRadius), asNumber(leadRadius), progress2), 0);
      if (percent.test(leadRadius) || percent.test(followRadius)) {
        target[borderLabel] += "%";
      }
    } else {
      target[borderLabel] = leadRadius;
    }
  }
  if (follow.rotate || lead.rotate) {
    target.rotate = mixNumber(follow.rotate || 0, lead.rotate || 0, progress2);
  }
}
function getRadius(values, radiusName) {
  return values[radiusName] !== void 0 ? values[radiusName] : values.borderRadius;
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, 0.5, circOut);
var easeCrossfadeOut = /* @__PURE__ */ compress(0.5, 0.95, noop);
function compress(min, max, easing) {
  return (p2) => {
    if (p2 < min)
      return 0;
    if (p2 > max)
      return 1;
    return easing(progress(min, max, p2));
  };
}

// node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function animateSingleValue(value, keyframes2, options) {
  const motionValue$1 = isMotionValue(value) ? value : motionValue(value);
  motionValue$1.start(animateMotionValue("", motionValue$1, keyframes2, options));
  return motionValue$1.animation;
}

// node_modules/motion-dom/dist/es/events/add-dom-event.mjs
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler, options);
}

// node_modules/motion-dom/dist/es/projection/utils/compare-by-depth.mjs
var compareByDepth = (a, b2) => a.depth - b2.depth;

// node_modules/motion-dom/dist/es/projection/utils/flat-tree.mjs
var FlatTree = class {
  constructor() {
    this.children = [];
    this.isDirty = false;
  }
  add(child) {
    addUniqueItem(this.children, child);
    this.isDirty = true;
  }
  remove(child) {
    removeItem(this.children, child);
    this.isDirty = true;
  }
  forEach(callback) {
    this.isDirty && this.children.sort(compareByDepth);
    this.isDirty = false;
    this.children.forEach(callback);
  }
};

// node_modules/motion-dom/dist/es/utils/delay.mjs
function delay(callback, timeout) {
  const start = time.now();
  const checkElapsed = ({ timestamp }) => {
    const elapsed = timestamp - start;
    if (elapsed >= timeout) {
      cancelFrame(checkElapsed);
      callback(elapsed - timeout);
    }
  };
  frame.setup(checkElapsed, true);
  return () => cancelFrame(checkElapsed);
}

// node_modules/motion-dom/dist/es/value/utils/resolve-motion-value.mjs
function resolveMotionValue(value) {
  return isMotionValue(value) ? value.get() : value;
}

// node_modules/motion-dom/dist/es/projection/shared/stack.mjs
var NodeStack = class {
  constructor() {
    this.members = [];
  }
  add(node) {
    addUniqueItem(this.members, node);
    for (let i2 = this.members.length - 1; i2 >= 0; i2--) {
      const member = this.members[i2];
      if (member === node || member === this.lead || member === this.prevLead)
        continue;
      const inst = member.instance;
      if ((!inst || inst.isConnected === false) && !member.snapshot) {
        removeItem(this.members, member);
        member.unmount();
      }
    }
    node.scheduleRender();
  }
  remove(node) {
    removeItem(this.members, node);
    if (node === this.prevLead)
      this.prevLead = void 0;
    if (node === this.lead) {
      const prevLead = this.members[this.members.length - 1];
      if (prevLead)
        this.promote(prevLead);
    }
  }
  relegate(node) {
    for (let i2 = this.members.indexOf(node) - 1; i2 >= 0; i2--) {
      const member = this.members[i2];
      if (member.isPresent !== false && member.instance?.isConnected !== false) {
        this.promote(member);
        return true;
      }
    }
    return false;
  }
  promote(node, preserveFollowOpacity) {
    const prevLead = this.lead;
    if (node === prevLead)
      return;
    this.prevLead = prevLead;
    this.lead = node;
    node.show();
    if (prevLead) {
      prevLead.updateSnapshot();
      node.scheduleRender();
      const { layoutDependency: prevDep } = prevLead.options;
      const { layoutDependency: nextDep } = node.options;
      if (prevDep === void 0 || prevDep !== nextDep) {
        node.resumeFrom = prevLead;
        if (preserveFollowOpacity)
          prevLead.preserveOpacity = true;
        if (prevLead.snapshot) {
          node.snapshot = prevLead.snapshot;
          node.snapshot.latestValues = prevLead.animationValues || prevLead.latestValues;
        }
        if (node.root?.isUpdating)
          node.isLayoutDirty = true;
      }
      if (node.options.crossfade === false)
        prevLead.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((member) => {
      member.options.onExitComplete?.();
      member.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((member) => member.instance && member.scheduleRender(false));
  }
  removeLeadSnapshot() {
    if (this.lead?.snapshot)
      this.lead.snapshot = void 0;
  }
};

// node_modules/motion-dom/dist/es/projection/node/state.mjs
var globalProjectionState = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: true,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: false
};

// node_modules/motion-dom/dist/es/projection/node/create-projection-node.mjs
var metrics = {
  nodes: 0,
  calculatedTargetDeltas: 0,
  calculatedProjections: 0
};
var transformAxes = ["", "X", "Y", "Z"];
var animationTarget = 1e3;
var id = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
  const { latestValues } = visualElement;
  if (latestValues[key]) {
    values[key] = latestValues[key];
    visualElement.setStaticValue(key, 0);
    if (sharedAnimationValues) {
      sharedAnimationValues[key] = 0;
    }
  }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
  projectionNode.hasCheckedOptimisedAppear = true;
  if (projectionNode.root === projectionNode)
    return;
  const { visualElement } = projectionNode.options;
  if (!visualElement)
    return;
  const appearId = getOptimisedAppearId(visualElement);
  if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
    const { layout: layout2, layoutId } = projectionNode.options;
    window.MotionCancelOptimisedAnimation(appearId, "transform", frame, !(layout2 || layoutId));
  }
  const { parent } = projectionNode;
  if (parent && !parent.hasCheckedOptimisedAppear) {
    cancelTreeOptimisedTransformAnimations(parent);
  }
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform }) {
  return class ProjectionNode {
    constructor(latestValues = {}, parent = defaultParent?.()) {
      this.id = id++;
      this.animationId = 0;
      this.animationCommitId = 0;
      this.children = /* @__PURE__ */ new Set();
      this.options = {};
      this.isTreeAnimating = false;
      this.isAnimationBlocked = false;
      this.isLayoutDirty = false;
      this.isProjectionDirty = false;
      this.isSharedProjectionDirty = false;
      this.isTransformDirty = false;
      this.updateManuallyBlocked = false;
      this.updateBlockedByResize = false;
      this.isUpdating = false;
      this.isSVG = false;
      this.needsReset = false;
      this.shouldResetTransform = false;
      this.hasCheckedOptimisedAppear = false;
      this.treeScale = { x: 1, y: 1 };
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.hasTreeAnimated = false;
      this.layoutVersion = 0;
      this.updateScheduled = false;
      this.scheduleUpdate = () => this.update();
      this.projectionUpdateScheduled = false;
      this.checkUpdateFailed = () => {
        if (this.isUpdating) {
          this.isUpdating = false;
          this.clearAllSnapshots();
        }
      };
      this.updateProjection = () => {
        this.projectionUpdateScheduled = false;
        if (statsBuffer.value) {
          metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0;
        }
        this.nodes.forEach(propagateDirtyNodes);
        this.nodes.forEach(resolveTargetDelta);
        this.nodes.forEach(calcProjection);
        this.nodes.forEach(cleanDirtyNodes);
        if (statsBuffer.addProjectionMetrics) {
          statsBuffer.addProjectionMetrics(metrics);
        }
      };
      this.resolvedRelativeTargetAt = 0;
      this.linkedParentVersion = 0;
      this.hasProjected = false;
      this.isVisible = true;
      this.animationProgress = 0;
      this.sharedNodes = /* @__PURE__ */ new Map();
      this.latestValues = latestValues;
      this.root = parent ? parent.root || parent : this;
      this.path = parent ? [...parent.path, parent] : [];
      this.parent = parent;
      this.depth = parent ? parent.depth + 1 : 0;
      for (let i2 = 0; i2 < this.path.length; i2++) {
        this.path[i2].shouldResetTransform = true;
      }
      if (this.root === this)
        this.nodes = new FlatTree();
    }
    addEventListener(name, handler) {
      if (!this.eventHandlers.has(name)) {
        this.eventHandlers.set(name, new SubscriptionManager());
      }
      return this.eventHandlers.get(name).add(handler);
    }
    notifyListeners(name, ...args) {
      const subscriptionManager = this.eventHandlers.get(name);
      subscriptionManager && subscriptionManager.notify(...args);
    }
    hasListeners(name) {
      return this.eventHandlers.has(name);
    }
    /**
     * Lifecycles
     */
    mount(instance) {
      if (this.instance)
        return;
      this.isSVG = isSVGElement(instance) && !isSVGSVGElement(instance);
      this.instance = instance;
      const { layoutId, layout: layout2, visualElement } = this.options;
      if (visualElement && !visualElement.current) {
        visualElement.mount(instance);
      }
      this.root.nodes.add(this);
      this.parent && this.parent.children.add(this);
      if (this.root.hasTreeAnimated && (layout2 || layoutId)) {
        this.isLayoutDirty = true;
      }
      if (attachResizeListener) {
        let cancelDelay;
        let innerWidth = 0;
        const resizeUnblockUpdate = () => this.root.updateBlockedByResize = false;
        frame.read(() => {
          innerWidth = window.innerWidth;
        });
        attachResizeListener(instance, () => {
          const newInnerWidth = window.innerWidth;
          if (newInnerWidth === innerWidth)
            return;
          innerWidth = newInnerWidth;
          this.root.updateBlockedByResize = true;
          cancelDelay && cancelDelay();
          cancelDelay = delay(resizeUnblockUpdate, 250);
          if (globalProjectionState.hasAnimatedSinceResize) {
            globalProjectionState.hasAnimatedSinceResize = false;
            this.nodes.forEach(finishAnimation);
          }
        });
      }
      if (layoutId) {
        this.root.registerSharedNode(layoutId, this);
      }
      if (this.options.animate !== false && visualElement && (layoutId || layout2)) {
        this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout }) => {
          if (this.isTreeAnimationBlocked()) {
            this.target = void 0;
            this.relativeTarget = void 0;
            return;
          }
          const layoutTransition = this.options.transition || visualElement.getDefaultTransition() || defaultLayoutTransition;
          const { onLayoutAnimationStart, onLayoutAnimationComplete } = visualElement.getProps();
          const hasTargetChanged = !this.targetLayout || !boxEqualsRounded(this.targetLayout, newLayout);
          const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
          if (this.options.layoutRoot || this.resumeFrom || hasOnlyRelativeTargetChanged || hasLayoutChanged && (hasTargetChanged || !this.currentAnimation)) {
            if (this.resumeFrom) {
              this.resumingFrom = this.resumeFrom;
              this.resumingFrom.resumingFrom = void 0;
            }
            const animationOptions = {
              ...getValueTransition(layoutTransition, "layout"),
              onPlay: onLayoutAnimationStart,
              onComplete: onLayoutAnimationComplete
            };
            if (visualElement.shouldReduceMotion || this.options.layoutRoot) {
              animationOptions.delay = 0;
              animationOptions.type = false;
            }
            this.startAnimation(animationOptions);
            this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged, animationOptions.path);
          } else {
            if (!hasLayoutChanged) {
              finishAnimation(this);
            }
            if (this.isLead() && this.options.onExitComplete) {
              this.options.onExitComplete();
            }
          }
          this.targetLayout = newLayout;
        });
      }
    }
    unmount() {
      this.options.layoutId && this.willUpdate();
      this.root.nodes.remove(this);
      const stack = this.getStack();
      stack && stack.remove(this);
      this.parent && this.parent.children.delete(this);
      this.instance = void 0;
      this.eventHandlers.clear();
      cancelFrame(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = true;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = false;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || false;
    }
    // Note: currently only running on root node
    startUpdate() {
      if (this.isUpdateBlocked())
        return;
      this.isUpdating = true;
      this.nodes && this.nodes.forEach(resetSkewAndRotation);
      this.animationId++;
    }
    getTransformTemplate() {
      const { visualElement } = this.options;
      return visualElement && visualElement.getProps().transformTemplate;
    }
    willUpdate(shouldNotifyListeners = true) {
      this.root.hasTreeAnimated = true;
      if (this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(this);
      }
      !this.root.isUpdating && this.root.startUpdate();
      if (this.isLayoutDirty)
        return;
      this.isLayoutDirty = true;
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        node.shouldResetTransform = true;
        if (typeof node.latestValues.x === "string" || typeof node.latestValues.y === "string") {
          node.isLayoutDirty = true;
        }
        node.updateScroll("snapshot");
        if (node.options.layoutRoot) {
          node.willUpdate(false);
        }
      }
      const { layoutId, layout: layout2 } = this.options;
      if (layoutId === void 0 && !layout2)
        return;
      const transformTemplate = this.getTransformTemplate();
      this.prevTransformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      this.updateSnapshot();
      shouldNotifyListeners && this.notifyListeners("willUpdate");
    }
    update() {
      this.updateScheduled = false;
      const updateWasBlocked = this.isUpdateBlocked();
      if (updateWasBlocked) {
        const wasBlockedByResize = this.updateBlockedByResize;
        this.unblockUpdate();
        this.updateBlockedByResize = false;
        this.clearAllSnapshots();
        if (wasBlockedByResize) {
          this.nodes.forEach(forceLayoutMeasure);
        }
        this.nodes.forEach(clearMeasurements);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(clearIsLayoutDirty);
        return;
      }
      this.animationCommitId = this.animationId;
      if (!this.isUpdating) {
        this.nodes.forEach(clearIsLayoutDirty);
      } else {
        this.isUpdating = false;
        this.nodes.forEach(ensureDraggedNodesSnapshotted);
        this.nodes.forEach(resetTransformStyle);
        this.nodes.forEach(updateLayout);
        this.nodes.forEach(notifyLayoutUpdate);
      }
      this.clearAllSnapshots();
      const now2 = time.now();
      frameData.delta = clamp(0, 1e3 / 60, now2 - frameData.timestamp);
      frameData.timestamp = now2;
      frameData.isProcessing = true;
      frameSteps.update.process(frameData);
      frameSteps.preRender.process(frameData);
      frameSteps.render.process(frameData);
      frameData.isProcessing = false;
    }
    didUpdate() {
      if (!this.updateScheduled) {
        this.updateScheduled = true;
        microtask.read(this.scheduleUpdate);
      }
    }
    clearAllSnapshots() {
      this.nodes.forEach(clearSnapshot);
      this.sharedNodes.forEach(removeLeadSnapshots);
    }
    scheduleUpdateProjection() {
      if (!this.projectionUpdateScheduled) {
        this.projectionUpdateScheduled = true;
        frame.preRender(this.updateProjection, false, true);
      }
    }
    scheduleCheckAfterUnmount() {
      frame.postRender(() => {
        if (this.isLayoutDirty) {
          this.root.didUpdate();
        } else {
          this.root.checkUpdateFailed();
        }
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      if (this.snapshot || !this.instance)
        return;
      this.snapshot = this.measure();
      if (this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y)) {
        this.snapshot = void 0;
      }
    }
    updateLayout() {
      if (!this.instance)
        return;
      this.updateScroll();
      if (!(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty) {
        return;
      }
      if (this.resumeFrom && !this.resumeFrom.instance) {
        for (let i2 = 0; i2 < this.path.length; i2++) {
          const node = this.path[i2];
          node.updateScroll();
        }
      }
      const prevLayout = this.layout;
      this.layout = this.measure(false);
      this.layoutVersion++;
      if (!this.layoutCorrected)
        this.layoutCorrected = createBox();
      this.isLayoutDirty = false;
      this.projectionDelta = void 0;
      this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement } = this.options;
      visualElement && visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : void 0);
    }
    updateScroll(phase = "measure") {
      let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === phase) {
        needsMeasurement = false;
      }
      if (needsMeasurement && this.instance) {
        const isRoot = checkIsScrollRoot(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase,
          isRoot,
          offset: measureScroll(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : isRoot
        };
      }
    }
    resetTransform() {
      if (!resetTransform)
        return;
      const isResetRequested = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout;
      const hasProjection = this.projectionDelta && !isDeltaZero(this.projectionDelta);
      const transformTemplate = this.getTransformTemplate();
      const transformTemplateValue = transformTemplate ? transformTemplate(this.latestValues, "") : void 0;
      const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
      if (isResetRequested && this.instance && (hasProjection || hasTransform(this.latestValues) || transformTemplateHasChanged)) {
        resetTransform(this.instance, transformTemplateValue);
        this.shouldResetTransform = false;
        this.scheduleRender();
      }
    }
    measure(removeTransform = true) {
      const pageBox = this.measurePageBox();
      let layoutBox = this.removeElementScroll(pageBox);
      if (removeTransform) {
        layoutBox = this.removeTransform(layoutBox);
      }
      roundBox(layoutBox);
      return {
        animationId: this.root.animationId,
        measuredBox: pageBox,
        layoutBox,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement } = this.options;
      if (!visualElement)
        return createBox();
      const box = visualElement.measureViewportBox();
      const wasInScrollRoot = this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot);
      if (!wasInScrollRoot) {
        const { scroll } = this.root;
        if (scroll) {
          translateAxis(box.x, scroll.offset.x);
          translateAxis(box.y, scroll.offset.y);
        }
      }
      return box;
    }
    removeElementScroll(box) {
      const boxWithoutScroll = createBox();
      copyBoxInto(boxWithoutScroll, box);
      if (this.scroll?.wasRoot) {
        return boxWithoutScroll;
      }
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        const { scroll, options } = node;
        if (node !== this.root && scroll && options.layoutScroll) {
          if (scroll.wasRoot) {
            copyBoxInto(boxWithoutScroll, box);
          }
          translateAxis(boxWithoutScroll.x, scroll.offset.x);
          translateAxis(boxWithoutScroll.y, scroll.offset.y);
        }
      }
      return boxWithoutScroll;
    }
    applyTransform(box, transformOnly = false, output) {
      const withTransforms = output || createBox();
      copyBoxInto(withTransforms, box);
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        if (!transformOnly && node.options.layoutScroll && node.scroll && node !== node.root) {
          translateAxis(withTransforms.x, -node.scroll.offset.x);
          translateAxis(withTransforms.y, -node.scroll.offset.y);
        }
        if (!hasTransform(node.latestValues))
          continue;
        transformBox(withTransforms, node.latestValues, node.layout?.layoutBox);
      }
      if (hasTransform(this.latestValues)) {
        transformBox(withTransforms, this.latestValues, this.layout?.layoutBox);
      }
      return withTransforms;
    }
    removeTransform(box) {
      const boxWithoutTransform = createBox();
      copyBoxInto(boxWithoutTransform, box);
      for (let i2 = 0; i2 < this.path.length; i2++) {
        const node = this.path[i2];
        if (!hasTransform(node.latestValues))
          continue;
        let sourceBox;
        if (node.instance) {
          hasScale(node.latestValues) && node.updateSnapshot();
          sourceBox = createBox();
          copyBoxInto(sourceBox, node.measurePageBox());
        }
        removeBoxTransforms(boxWithoutTransform, node.latestValues, node.snapshot?.layoutBox, sourceBox);
      }
      if (hasTransform(this.latestValues)) {
        removeBoxTransforms(boxWithoutTransform, this.latestValues);
      }
      return boxWithoutTransform;
    }
    setTargetDelta(delta) {
      this.targetDelta = delta;
      this.root.scheduleUpdateProjection();
      this.isProjectionDirty = true;
    }
    setOptions(options) {
      this.options = {
        ...this.options,
        ...options,
        crossfade: options.crossfade !== void 0 ? options.crossfade : true
      };
    }
    clearMeasurements() {
      this.scroll = void 0;
      this.layout = void 0;
      this.snapshot = void 0;
      this.prevTransformTemplateValue = void 0;
      this.targetDelta = void 0;
      this.target = void 0;
      this.isLayoutDirty = false;
    }
    forceRelativeParentToResolveTarget() {
      if (!this.relativeParent)
        return;
      if (this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp) {
        this.relativeParent.resolveTargetDelta(true);
      }
    }
    resolveTargetDelta(forceRecalculation = false) {
      const lead = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
      this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
      this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      const canSkip = !(forceRecalculation || isShared && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize);
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      if (!this.layout || !(layout2 || layoutId))
        return;
      this.resolvedRelativeTargetAt = frameData.timestamp;
      const relativeParent = this.getClosestProjectingParent();
      if (relativeParent && this.linkedParentVersion !== relativeParent.layoutVersion && !relativeParent.options.layoutRoot) {
        this.removeRelativeTarget();
      }
      if (!this.targetDelta && !this.relativeTarget) {
        if (this.options.layoutAnchor !== false && relativeParent && relativeParent.layout) {
          this.createRelativeTarget(relativeParent, this.layout.layoutBox, relativeParent.layout.layoutBox);
        } else {
          this.removeRelativeTarget();
        }
      }
      if (!this.relativeTarget && !this.targetDelta)
        return;
      if (!this.target) {
        this.target = createBox();
        this.targetWithTransforms = createBox();
      }
      if (this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target) {
        this.forceRelativeParentToResolveTarget();
        calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0);
      } else if (this.targetDelta) {
        if (Boolean(this.resumingFrom)) {
          this.applyTransform(this.layout.layoutBox, false, this.target);
        } else {
          copyBoxInto(this.target, this.layout.layoutBox);
        }
        applyBoxDelta(this.target, this.targetDelta);
      } else {
        copyBoxInto(this.target, this.layout.layoutBox);
      }
      if (this.attemptToResolveRelativeTarget) {
        this.attemptToResolveRelativeTarget = false;
        if (this.options.layoutAnchor !== false && relativeParent && Boolean(relativeParent.resumingFrom) === Boolean(this.resumingFrom) && !relativeParent.options.layoutScroll && relativeParent.target && this.animationProgress !== 1) {
          this.createRelativeTarget(relativeParent, this.target, relativeParent.target);
        } else {
          this.relativeParent = this.relativeTarget = void 0;
        }
      }
      if (statsBuffer.value) {
        metrics.calculatedTargetDeltas++;
      }
    }
    getClosestProjectingParent() {
      if (!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues)) {
        return void 0;
      }
      if (this.parent.isProjecting()) {
        return this.parent;
      } else {
        return this.parent.getClosestProjectingParent();
      }
    }
    isProjecting() {
      return Boolean((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(relativeParent, layout2, parentLayout) {
      this.relativeParent = relativeParent;
      this.linkedParentVersion = relativeParent.layoutVersion;
      this.forceRelativeParentToResolveTarget();
      this.relativeTarget = createBox();
      this.relativeTargetOrigin = createBox();
      calcRelativePosition(this.relativeTargetOrigin, layout2, parentLayout, this.options.layoutAnchor || void 0);
      copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const lead = this.getLead();
      const isShared = Boolean(this.resumingFrom) || this !== lead;
      let canSkip = true;
      if (this.isProjectionDirty || this.parent?.isProjectionDirty) {
        canSkip = false;
      }
      if (isShared && (this.isSharedProjectionDirty || this.isTransformDirty)) {
        canSkip = false;
      }
      if (this.resolvedRelativeTargetAt === frameData.timestamp) {
        canSkip = false;
      }
      if (canSkip)
        return;
      const { layout: layout2, layoutId } = this.options;
      this.isTreeAnimating = Boolean(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation);
      if (!this.isTreeAnimating) {
        this.targetDelta = this.relativeTarget = void 0;
      }
      if (!this.layout || !(layout2 || layoutId))
        return;
      copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
      const prevTreeScaleX = this.treeScale.x;
      const prevTreeScaleY = this.treeScale.y;
      applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, isShared);
      if (lead.layout && !lead.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
        lead.target = lead.layout.layoutBox;
        lead.targetWithTransforms = createBox();
      }
      const { target } = lead;
      if (!target) {
        if (this.prevProjectionDelta) {
          this.createProjectionDeltas();
          this.scheduleRender();
        }
        return;
      }
      if (!this.projectionDelta || !this.prevProjectionDelta) {
        this.createProjectionDeltas();
      } else {
        copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x);
        copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y);
      }
      calcBoxDelta(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
      if (this.treeScale.x !== prevTreeScaleX || this.treeScale.y !== prevTreeScaleY || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) {
        this.hasProjected = true;
        this.scheduleRender();
        this.notifyListeners("projectionUpdate", target);
      }
      if (statsBuffer.value) {
        metrics.calculatedProjections++;
      }
    }
    hide() {
      this.isVisible = false;
    }
    show() {
      this.isVisible = true;
    }
    scheduleRender(notifyAll2 = true) {
      this.options.visualElement?.scheduleRender();
      if (notifyAll2) {
        const stack = this.getStack();
        stack && stack.scheduleRender();
      }
      if (this.resumingFrom && !this.resumingFrom.instance) {
        this.resumingFrom = void 0;
      }
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = createDelta();
      this.projectionDelta = createDelta();
      this.projectionDeltaWithTransform = createDelta();
    }
    setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false, pathFn) {
      const snapshot = this.snapshot;
      const snapshotLatestValues = snapshot ? snapshot.latestValues : {};
      const mixedValues = { ...this.latestValues };
      const targetDelta = createDelta();
      if (!this.relativeParent || !this.relativeParent.options.layoutRoot) {
        this.relativeTarget = this.relativeTargetOrigin = void 0;
      }
      this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
      const relativeLayout = createBox();
      const snapshotSource = snapshot ? snapshot.source : void 0;
      const layoutSource = this.layout ? this.layout.source : void 0;
      const isSharedLayoutAnimation = snapshotSource !== layoutSource;
      const stack = this.getStack();
      const isOnlyMember = !stack || stack.members.length <= 1;
      const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation && !isOnlyMember && this.options.crossfade === true && !this.path.some(hasOpacityCrossfade));
      this.animationProgress = 0;
      let prevRelativeTarget;
      const interpolate2 = pathFn?.interpolateProjection(delta);
      this.mixTargetDelta = (latest) => {
        const progress2 = latest / 1e3;
        const point = interpolate2?.(progress2);
        if (point) {
          targetDelta.x.translate = point.x;
          targetDelta.x.scale = mixNumber(delta.x.scale, 1, progress2);
          targetDelta.x.origin = delta.x.origin;
          targetDelta.x.originPoint = delta.x.originPoint;
          targetDelta.y.translate = point.y;
          targetDelta.y.scale = mixNumber(delta.y.scale, 1, progress2);
          targetDelta.y.origin = delta.y.origin;
          targetDelta.y.originPoint = delta.y.originPoint;
        } else {
          mixAxisDeltaLinear(targetDelta.x, delta.x, progress2);
          mixAxisDeltaLinear(targetDelta.y, delta.y, progress2);
        }
        this.setTargetDelta(targetDelta);
        if (this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout) {
          calcRelativePosition(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0);
          mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress2);
          if (prevRelativeTarget && boxEquals(this.relativeTarget, prevRelativeTarget)) {
            this.isProjectionDirty = false;
          }
          if (!prevRelativeTarget)
            prevRelativeTarget = createBox();
          copyBoxInto(prevRelativeTarget, this.relativeTarget);
        }
        if (isSharedLayoutAnimation) {
          this.animationValues = mixedValues;
          mixValues(mixedValues, snapshotLatestValues, this.latestValues, progress2, shouldCrossfadeOpacity, isOnlyMember);
        }
        if (point && point.rotate !== void 0) {
          if (!this.animationValues)
            this.animationValues = mixedValues;
          this.animationValues.pathRotation = point.rotate;
        }
        this.root.scheduleUpdateProjection();
        this.scheduleRender();
        this.animationProgress = progress2;
      };
      this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(options) {
      this.notifyListeners("animationStart");
      this.currentAnimation?.stop();
      this.resumingFrom?.currentAnimation?.stop();
      if (this.pendingAnimation) {
        cancelFrame(this.pendingAnimation);
        this.pendingAnimation = void 0;
      }
      this.pendingAnimation = frame.update(() => {
        globalProjectionState.hasAnimatedSinceResize = true;
        this.motionValue || (this.motionValue = motionValue(0));
        this.motionValue.jump(0, false);
        this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
          ...options,
          velocity: 0,
          isSync: true,
          onUpdate: (latest) => {
            this.mixTargetDelta(latest);
            options.onUpdate && options.onUpdate(latest);
          },
          onComplete: () => {
            options.onComplete && options.onComplete();
            this.completeAnimation();
          }
        });
        if (this.resumingFrom) {
          this.resumingFrom.currentAnimation = this.currentAnimation;
        }
        this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      if (this.resumingFrom) {
        this.resumingFrom.currentAnimation = void 0;
        this.resumingFrom.preserveOpacity = void 0;
      }
      const stack = this.getStack();
      stack && stack.exitAnimationComplete();
      this.resumingFrom = this.currentAnimation = this.animationValues = void 0;
      this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      if (this.currentAnimation) {
        this.mixTargetDelta && this.mixTargetDelta(animationTarget);
        this.currentAnimation.stop();
      }
      this.completeAnimation();
    }
    applyTransformsToTarget() {
      const lead = this.getLead();
      let { targetWithTransforms, target, layout: layout2, latestValues } = lead;
      if (!targetWithTransforms || !target || !layout2)
        return;
      if (this !== lead && this.layout && layout2 && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout2.layoutBox)) {
        target = this.target || createBox();
        const xLength = calcLength(this.layout.layoutBox.x);
        target.x.min = lead.target.x.min;
        target.x.max = target.x.min + xLength;
        const yLength = calcLength(this.layout.layoutBox.y);
        target.y.min = lead.target.y.min;
        target.y.max = target.y.min + yLength;
      }
      copyBoxInto(targetWithTransforms, target);
      transformBox(targetWithTransforms, latestValues);
      calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
    }
    registerSharedNode(layoutId, node) {
      if (!this.sharedNodes.has(layoutId)) {
        this.sharedNodes.set(layoutId, new NodeStack());
      }
      const stack = this.sharedNodes.get(layoutId);
      stack.add(node);
      const config = node.options.initialPromotionConfig;
      node.promote({
        transition: config ? config.transition : void 0,
        preserveFollowOpacity: config && config.shouldPreserveFollowOpacity ? config.shouldPreserveFollowOpacity(node) : void 0
      });
    }
    isLead() {
      const stack = this.getStack();
      return stack ? stack.lead === this : true;
    }
    getLead() {
      const { layoutId } = this.options;
      return layoutId ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId } = this.options;
      return layoutId ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId } = this.options;
      if (layoutId)
        return this.root.sharedNodes.get(layoutId);
    }
    promote({ needsReset, transition, preserveFollowOpacity } = {}) {
      const stack = this.getStack();
      if (stack)
        stack.promote(this, preserveFollowOpacity);
      if (needsReset) {
        this.projectionDelta = void 0;
        this.needsReset = true;
      }
      if (transition)
        this.setOptions({ transition });
    }
    relegate() {
      const stack = this.getStack();
      if (stack) {
        return stack.relegate(this);
      } else {
        return false;
      }
    }
    resetSkewAndRotation() {
      const { visualElement } = this.options;
      if (!visualElement)
        return;
      let hasDistortingTransform = false;
      const { latestValues } = visualElement;
      if (latestValues.z || latestValues.rotate || latestValues.rotateX || latestValues.rotateY || latestValues.rotateZ || latestValues.skewX || latestValues.skewY) {
        hasDistortingTransform = true;
      }
      if (!hasDistortingTransform)
        return;
      const resetValues = {};
      if (latestValues.z) {
        resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
      }
      for (let i2 = 0; i2 < transformAxes.length; i2++) {
        resetDistortingTransform(`rotate${transformAxes[i2]}`, visualElement, resetValues, this.animationValues);
        resetDistortingTransform(`skew${transformAxes[i2]}`, visualElement, resetValues, this.animationValues);
      }
      visualElement.render();
      for (const key in resetValues) {
        visualElement.setStaticValue(key, resetValues[key]);
        if (this.animationValues) {
          this.animationValues[key] = resetValues[key];
        }
      }
      visualElement.scheduleRender();
    }
    applyProjectionStyles(targetStyle, styleProp) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        targetStyle.visibility = "hidden";
        return;
      }
      const transformTemplate = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = false;
        targetStyle.visibility = "";
        targetStyle.opacity = "";
        targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
        targetStyle.transform = transformTemplate ? transformTemplate(this.latestValues, "") : "none";
        return;
      }
      const lead = this.getLead();
      if (!this.projectionDelta || !this.layout || !lead.target) {
        if (this.options.layoutId) {
          targetStyle.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1;
          targetStyle.pointerEvents = resolveMotionValue(styleProp?.pointerEvents) || "";
        }
        if (this.hasProjected && !hasTransform(this.latestValues)) {
          targetStyle.transform = transformTemplate ? transformTemplate({}, "") : "none";
          this.hasProjected = false;
        }
        return;
      }
      targetStyle.visibility = "";
      const valuesToRender = lead.animationValues || lead.latestValues;
      this.applyTransformsToTarget();
      let transform = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
      if (transformTemplate) {
        transform = transformTemplate(valuesToRender, transform);
      }
      targetStyle.transform = transform;
      const { x: x3, y: y3 } = this.projectionDelta;
      targetStyle.transformOrigin = `${x3.origin * 100}% ${y3.origin * 100}% 0`;
      if (lead.animationValues) {
        targetStyle.opacity = lead === this ? valuesToRender.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : valuesToRender.opacityExit;
      } else {
        targetStyle.opacity = lead === this ? valuesToRender.opacity !== void 0 ? valuesToRender.opacity : "" : valuesToRender.opacityExit !== void 0 ? valuesToRender.opacityExit : 0;
      }
      for (const key in scaleCorrectors) {
        if (valuesToRender[key] === void 0)
          continue;
        const { correct, applyTo, isCSSVariable } = scaleCorrectors[key];
        const corrected = transform === "none" ? valuesToRender[key] : correct(valuesToRender[key], lead);
        if (applyTo) {
          const num2 = applyTo.length;
          for (let i2 = 0; i2 < num2; i2++) {
            targetStyle[applyTo[i2]] = corrected;
          }
        } else {
          if (isCSSVariable) {
            this.options.visualElement.renderState.vars[key] = corrected;
          } else {
            targetStyle[key] = corrected;
          }
        }
      }
      if (this.options.layoutId) {
        targetStyle.pointerEvents = lead === this ? resolveMotionValue(styleProp?.pointerEvents) || "" : "none";
      }
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((node) => node.currentAnimation?.stop());
      this.root.nodes.forEach(clearMeasurements);
      this.root.sharedNodes.clear();
    }
  };
}
function updateLayout(node) {
  node.updateLayout();
}
function notifyLayoutUpdate(node) {
  const snapshot = node.resumeFrom?.snapshot || node.snapshot;
  if (node.isLead() && node.layout && snapshot && node.hasListeners("didUpdate")) {
    const { layoutBox: layout2, measuredBox: measuredLayout } = node.layout;
    const { animationType } = node.options;
    const isShared = snapshot.source !== node.layout.source;
    if (animationType === "size") {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(axisSnapshot);
        axisSnapshot.min = layout2[axis].min;
        axisSnapshot.max = axisSnapshot.min + length;
      });
    } else if (animationType === "x" || animationType === "y") {
      const snapAxis = animationType === "x" ? "y" : "x";
      copyAxisInto(isShared ? snapshot.measuredBox[snapAxis] : snapshot.layoutBox[snapAxis], layout2[snapAxis]);
    } else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout2)) {
      eachAxis((axis) => {
        const axisSnapshot = isShared ? snapshot.measuredBox[axis] : snapshot.layoutBox[axis];
        const length = calcLength(layout2[axis]);
        axisSnapshot.max = axisSnapshot.min + length;
        if (node.relativeTarget && !node.currentAnimation) {
          node.isProjectionDirty = true;
          node.relativeTarget[axis].max = node.relativeTarget[axis].min + length;
        }
      });
    }
    const layoutDelta = createDelta();
    calcBoxDelta(layoutDelta, layout2, snapshot.layoutBox);
    const visualDelta = createDelta();
    if (isShared) {
      calcBoxDelta(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
    } else {
      calcBoxDelta(visualDelta, layout2, snapshot.layoutBox);
    }
    const hasLayoutChanged = !isDeltaZero(layoutDelta);
    let hasRelativeLayoutChanged = false;
    if (!node.resumeFrom) {
      const relativeParent = node.getClosestProjectingParent();
      if (relativeParent && !relativeParent.resumeFrom) {
        const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
        if (parentSnapshot && parentLayout) {
          const anchor = node.options.layoutAnchor || void 0;
          const relativeSnapshot = createBox();
          calcRelativePosition(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox, anchor);
          const relativeLayout = createBox();
          calcRelativePosition(relativeLayout, layout2, parentLayout.layoutBox, anchor);
          if (!boxEqualsRounded(relativeSnapshot, relativeLayout)) {
            hasRelativeLayoutChanged = true;
          }
          if (relativeParent.options.layoutRoot) {
            node.relativeTarget = relativeLayout;
            node.relativeTargetOrigin = relativeSnapshot;
            node.relativeParent = relativeParent;
          }
        }
      }
    }
    node.notifyListeners("didUpdate", {
      layout: layout2,
      snapshot,
      delta: visualDelta,
      layoutDelta,
      hasLayoutChanged,
      hasRelativeLayoutChanged
    });
  } else if (node.isLead()) {
    const { onExitComplete } = node.options;
    onExitComplete && onExitComplete();
  }
  node.options.transition = void 0;
}
function propagateDirtyNodes(node) {
  if (statsBuffer.value) {
    metrics.nodes++;
  }
  if (!node.parent)
    return;
  if (!node.isProjecting()) {
    node.isProjectionDirty = node.parent.isProjectionDirty;
  }
  node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty || node.parent.isProjectionDirty || node.parent.isSharedProjectionDirty));
  node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
  node.isProjectionDirty = node.isSharedProjectionDirty = node.isTransformDirty = false;
}
function clearSnapshot(node) {
  node.clearSnapshot();
}
function clearMeasurements(node) {
  node.clearMeasurements();
}
function forceLayoutMeasure(node) {
  node.isLayoutDirty = true;
  node.updateLayout();
}
function clearIsLayoutDirty(node) {
  node.isLayoutDirty = false;
}
function ensureDraggedNodesSnapshotted(node) {
  if (node.isAnimationBlocked && node.layout && !node.isLayoutDirty) {
    node.snapshot = node.layout;
    node.isLayoutDirty = true;
  }
}
function resetTransformStyle(node) {
  const { visualElement } = node.options;
  if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
    visualElement.notify("BeforeLayoutMeasure");
  }
  node.resetTransform();
}
function finishAnimation(node) {
  node.finishAnimation();
  node.targetDelta = node.relativeTarget = node.target = void 0;
  node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
  node.resolveTargetDelta();
}
function calcProjection(node) {
  node.calcProjection();
}
function resetSkewAndRotation(node) {
  node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
  stack.removeLeadSnapshot();
}
function mixAxisDeltaLinear(output, delta, p2) {
  output.translate = mixNumber(delta.translate, 0, p2);
  output.scale = mixNumber(delta.scale, 1, p2);
  output.origin = delta.origin;
  output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p2) {
  output.min = mixNumber(from.min, to.min, p2);
  output.max = mixNumber(from.max, to.max, p2);
}
function mixBox(output, from, to, p2) {
  mixAxis(output.x, from.x, to.x, p2);
  mixAxis(output.y, from.y, to.y, p2);
}
function hasOpacityCrossfade(node) {
  return node.animationValues && node.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
};
var userAgentContains = (string) => typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(string);
var roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(axis) {
  axis.min = roundPoint(axis.min);
  axis.max = roundPoint(axis.max);
}
function roundBox(box) {
  roundAxis(box.x);
  roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout2) {
  return animationType === "position" || animationType === "preserve-aspect" && !isNear(aspectRatio(snapshot), aspectRatio(layout2), 0.2);
}
function checkNodeWasScrollRoot(node) {
  return node !== node.root && node.scroll?.wasRoot;
}

// node_modules/motion-dom/dist/es/projection/node/DocumentProjectionNode.mjs
var DocumentProjectionNode = createProjectionNode({
  attachResizeListener: (ref, notify) => addDomEvent(ref, "resize", notify),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => true
});

// node_modules/motion-dom/dist/es/projection/node/HTMLProjectionNode.mjs
var rootProjectionNode = {
  current: void 0
};
var HTMLProjectionNode = createProjectionNode({
  measureScroll: (instance) => ({
    x: instance.scrollLeft,
    y: instance.scrollTop
  }),
  defaultParent: () => {
    if (!rootProjectionNode.current) {
      const documentNode = new DocumentProjectionNode({});
      documentNode.mount(window);
      documentNode.setOptions({ layoutScroll: true });
      rootProjectionNode.current = documentNode;
    }
    return rootProjectionNode.current;
  },
  resetTransform: (instance, value) => {
    instance.style.transform = value !== void 0 ? value : "none";
  },
  checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed")
});

// node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs
var MotionConfigContext = createContext({
  transformPagePoint: (p2) => p2,
  isStatic: false,
  reducedMotion: "never"
});

// node_modules/framer-motion/dist/es/utils/use-composed-ref.mjs
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i2 = 0; i2 < cleanups.length; i2++) {
          const cleanup = cleanups[i2];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i2], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return useCallback(composeRefs(...refs), refs);
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PopChild.mjs
var PopChildMeasure = class extends Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
      size.direction = computedStyle.direction;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
};
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  const id3 = useId();
  const ref = useRef(null);
  const size = useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  });
  const { nonce } = useContext(MotionConfigContext);
  const childRef = pop !== false ? children.props?.ref ?? children?.ref : void 0;
  const composedRef = useComposedRefs(ref, childRef);
  useInsertionEffect(() => {
    const { width, height, top, left, right, bottom, direction } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const isRTL = direction === "rtl";
    const x3 = anchorX === "left" ? isRTL ? `right: ${right}` : `left: ${left}` : isRTL ? `left: ${left}` : `right: ${right}`;
    const y3 = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id3;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id3}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x3}px !important;
            ${y3}px !important;
          }
        `);
    }
    return () => {
      ref.current?.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : cloneElement(children, { ref: composedRef }) });
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.mjs
var PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id3 = useId();
  const isPresentRef = useRef(isPresent);
  const onExitCompleteRef = useRef(onExitComplete);
  useIsomorphicLayoutEffect(() => {
    isPresentRef.current = isPresent;
    onExitCompleteRef.current = onExitComplete;
  });
  let isReusedContext = true;
  let context2 = useMemo(() => {
    isReusedContext = false;
    return {
      id: id3,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => {
          presenceChildren.delete(childId);
          !isPresentRef.current && !presenceChildren.size && onExitCompleteRef.current?.();
        };
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context2 = { ...context2 };
  }
  useMemo(() => {
    presenceChildren.forEach((_2, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsx(PresenceContext.Provider, { value: context2, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs
function usePresence(subscribe2 = true) {
  const context2 = useContext(PresenceContext);
  if (context2 === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context2;
  const id3 = useId();
  useEffect(() => {
    if (subscribe2) {
      return register(id3);
    }
  }, [subscribe2]);
  const safeToRemove = useCallback(() => subscribe2 && onExitComplete && onExitComplete(id3), [id3, onExitComplete, subscribe2]);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/utils.mjs
var getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}

// node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs
var AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = useRef(true);
  const pendingPresentChildren = useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    if (propagate && !isParentPresent && !renderedChildren.length) {
      safeToRemove?.();
    }
  }, [isParentPresent, propagate, renderedChildren.length, safeToRemove]);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i2 = 0; i2 < renderedChildren.length; i2++) {
      const key = getChildKey(renderedChildren[i2]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i2 = 0; i2 < renderedChildren.length; i2++) {
      const child = renderedChildren[i2];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i2, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  if (false) {
    console.warn(`You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`);
  }
  const { forceRender } = useContext(LayoutGroupContext);
  return jsx(Fragment2, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender?.();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && safeToRemove?.();
        onExitComplete && onExitComplete();
      }
    };
    return jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};

// node_modules/framer-motion/dist/es/context/LazyContext.mjs
var LazyContext = createContext({ strict: false });

// node_modules/framer-motion/dist/es/motion/features/definitions.mjs
var featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
var isInitialized = false;
function initFeatureDefinitions() {
  if (isInitialized)
    return;
  const initialFeatureDefinitions = {};
  for (const key in featureProps) {
    initialFeatureDefinitions[key] = {
      isEnabled: (props) => featureProps[key].some((name) => !!props[name])
    };
  }
  setFeatureDefinitions(initialFeatureDefinitions);
  isInitialized = true;
}
function getInitializedFeatureDefinitions() {
  initFeatureDefinitions();
  return getFeatureDefinitions();
}

// node_modules/framer-motion/dist/es/motion/features/load-features.mjs
function loadFeatures(features) {
  const featureDefinitions2 = getInitializedFeatureDefinitions();
  for (const key in features) {
    featureDefinitions2[key] = {
      ...featureDefinitions2[key],
      ...features[key]
    };
  }
  setFeatureDefinitions(featureDefinitions2);
}

// node_modules/framer-motion/dist/es/context/MotionContext/index.mjs
var MotionContext = /* @__PURE__ */ createContext({});

// node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs
function getCurrentTreeVariants(props, context2) {
  if (isControllingVariants(props)) {
    const { initial, animate } = props;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props.inherit !== false ? context2 : {};
}

// node_modules/framer-motion/dist/es/context/MotionContext/create.mjs
function useCreateMotionContext(props) {
  const { initial, animate } = getCurrentTreeVariants(props, useContext(MotionContext));
  return useMemo(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}

// node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs
var createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});

// node_modules/framer-motion/dist/es/render/html/use-props.mjs
function copyRawValuesOnly(target, source, props) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
  return useMemo(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle(props, visualState) {
  const styleProp = props.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props);
  Object.assign(style, useInitialMotionValues(props, visualState));
  return style;
}
function useHTMLProps(props, visualState) {
  const htmlProps = {};
  const style = useStyle(props, visualState);
  if (props.drag && props.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`;
  }
  if (props.tabIndex === void 0 && (props.onTap || props.onTapStart || props.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}

// node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs
var createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});

// node_modules/framer-motion/dist/es/render/svg/use-props.mjs
function useSVGProps(props, visualState, _isStatic, Component2) {
  const visualProps = useMemo(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, isSVGTag(Component2), props.transformTemplate, props.style);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props.style, props);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}

// node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs
var validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}

// node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs
function shouldForward(key, isValidProp) {
  return key.startsWith("on") ? !isValidMotionProp(key) : isValidProp?.(key) ?? !isValidMotionProp(key);
}
function filterProps(props, isDom, forwardMotionProps, isValidProp) {
  const filteredProps = {};
  for (const key in props) {
    if (key === "values" && typeof props.values === "object")
      continue;
    if (isMotionValue(props[key]))
      continue;
    if (shouldForward(key, isValidProp) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props[key];
    }
  }
  return filteredProps;
}

// node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs
var lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];

// node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs
function isSVGComponent(Component2) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component2 !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component2.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component2) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/u.test(Component2)
  ) {
    return true;
  }
  return false;
}

// node_modules/framer-motion/dist/es/render/dom/use-render.mjs
function useRender(Component2, props, ref, { latestValues }, isStatic, forwardMotionProps = false, isSVG, isValidProp) {
  const useVisualProps = isSVG ?? isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
  const visualProps = useVisualProps(props, latestValues, isStatic, Component2);
  const filteredProps = filterProps(props, typeof Component2 === "string", forwardMotionProps, isValidProp);
  const elementProps = Component2 !== Fragment ? { ...filteredProps, ...visualProps, ref } : {};
  const { children } = props;
  const renderedChildren = useMemo(() => isMotionValue(children) ? children.get() : children, [children]);
  return createElement(Component2, {
    ...elementProps,
    children: renderedChildren
  });
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs
function makeState({ scrapeMotionValuesFromProps: scrapeMotionValuesFromProps3, createRenderState }, props, context2, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props, context2, presenceContext, scrapeMotionValuesFromProps3),
    renderState: createRenderState()
  };
  return state;
}
function makeLatestValues(props, context2, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props;
  const isControllingVariants$1 = isControllingVariants(props);
  const isVariantNode$1 = isVariantNode(props);
  if (context2 && isVariantNode$1 && !isControllingVariants$1 && props.inherit !== false) {
    if (initial === void 0)
      initial = context2.initial;
    if (animate === void 0)
      animate = context2.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    for (let i2 = 0; i2 < list.length; i2++) {
      const resolved = resolveVariantFromProps(props, list[i2]);
      if (resolved) {
        const { transitionEnd, transition, ...target } = resolved;
        for (const key in target) {
          let valueTarget = target[key];
          if (Array.isArray(valueTarget)) {
            const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
            valueTarget = valueTarget[index];
          }
          if (valueTarget !== null) {
            values[key] = valueTarget;
          }
        }
        for (const key in transitionEnd) {
          values[key] = transitionEnd[key];
        }
      }
    }
  }
  return values;
}
var makeUseVisualState = (config) => (props, isStatic) => {
  const context2 = useContext(MotionContext);
  const presenceContext = useContext(PresenceContext);
  const make = () => makeState(config, props, context2, presenceContext);
  return isStatic ? make() : useConstant(make);
};

// node_modules/framer-motion/dist/es/render/html/use-html-visual-state.mjs
var useHTMLVisualState = /* @__PURE__ */ makeUseVisualState({
  scrapeMotionValuesFromProps,
  createRenderState: createHtmlRenderState
});

// node_modules/framer-motion/dist/es/render/svg/use-svg-visual-state.mjs
var useSVGVisualState = /* @__PURE__ */ makeUseVisualState({
  scrapeMotionValuesFromProps: scrapeMotionValuesFromProps2,
  createRenderState: createSvgRenderState
});

// node_modules/framer-motion/dist/es/motion/utils/symbol.mjs
var motionComponentSymbol = /* @__PURE__ */ Symbol.for("motionComponentSymbol");

// node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs
function useMotionRef(visualState, visualElement, externalRef) {
  const externalRefContainer = useRef(externalRef);
  useInsertionEffect(() => {
    externalRefContainer.current = externalRef;
  });
  const refCleanup = useRef(null);
  return useCallback((instance) => {
    if (instance) {
      visualState.onMount?.(instance);
    }
    if (visualElement) {
      instance ? visualElement.mount(instance) : visualElement.unmount();
    }
    const ref = externalRefContainer.current;
    if (typeof ref === "function") {
      if (instance) {
        const cleanup = ref(instance);
        if (typeof cleanup === "function") {
          refCleanup.current = cleanup;
        }
      } else if (refCleanup.current) {
        refCleanup.current();
        refCleanup.current = null;
      } else {
        ref(instance);
      }
    } else if (ref) {
      ref.current = instance;
    }
  }, [visualElement]);
}

// node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs
var SwitchLayoutGroupContext = createContext({});

// node_modules/framer-motion/dist/es/utils/is-ref-object.mjs
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}

// node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs
function useVisualElement(Component2, visualState, props, createVisualElement, ProjectionNodeConstructor, isSVG) {
  const { visualElement: parent } = useContext(MotionContext);
  const lazyContext = useContext(LazyContext);
  const presenceContext = useContext(PresenceContext);
  const motionConfig = useContext(MotionConfigContext);
  const reducedMotionConfig = motionConfig.reducedMotion;
  const skipAnimations = motionConfig.skipAnimations;
  const visualElementRef = useRef(null);
  const hasMountedOnce = useRef(false);
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component2, {
      visualState,
      parent,
      props,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig,
      skipAnimations,
      isSVG
    });
    if (hasMountedOnce.current && visualElementRef.current) {
      visualElementRef.current.manuallyAnimateOnMount = true;
    }
  }
  const visualElement = visualElementRef.current;
  const initialLayoutGroupConfig = useContext(SwitchLayoutGroupContext);
  if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
    createProjectionNode2(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
  }
  const isMounted = useRef(false);
  useInsertionEffect(() => {
    if (visualElement && isMounted.current) {
      visualElement.update(props, presenceContext);
    }
  });
  const optimisedAppearId = props[optimizedAppearDataAttribute];
  const wantsHandoff = useRef(Boolean(optimisedAppearId) && typeof window !== "undefined" && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
  useIsomorphicLayoutEffect(() => {
    hasMountedOnce.current = true;
    if (!visualElement)
      return;
    isMounted.current = true;
    window.MotionIsMounted = true;
    visualElement.updateFeatures();
    visualElement.scheduleRenderMicrotask();
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  useEffect(() => {
    if (!visualElement)
      return;
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      queueMicrotask(() => {
        window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
      });
      wantsHandoff.current = false;
    }
    visualElement.enteringChildren = void 0;
  });
  return visualElement;
}
function createProjectionNode2(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
  const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot, layoutAnchor, layoutCrossfade } = props;
  visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
  visualElement.projection.setOptions({
    layoutId,
    layout: layout2,
    alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
    visualElement,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof layout2 === "string" ? layout2 : "both",
    initialPromotionConfig,
    crossfade: layoutCrossfade,
    layoutScroll,
    layoutRoot,
    layoutAnchor
  });
}
function getClosestProjectingNode(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}

// node_modules/framer-motion/dist/es/motion/index.mjs
function createMotionComponent(Component2, { forwardMotionProps = false, type } = {}, preloadedFeatures, createVisualElement) {
  preloadedFeatures && loadFeatures(preloadedFeatures);
  const isSVG = type ? type === "svg" : isSVGComponent(Component2);
  const useVisualState = isSVG ? useSVGVisualState : useHTMLVisualState;
  function MotionDOMComponent(props, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...useContext(MotionConfigContext),
      ...props,
      layoutId: useLayoutId(props)
    };
    const { isStatic, isValidProp } = configAndProps;
    const context2 = useCreateMotionContext(props);
    const visualState = useVisualState(props, isStatic);
    if (!isStatic && typeof window !== "undefined") {
      useStrictMode(configAndProps, preloadedFeatures);
      const layoutProjection = getProjectionFunctionality(configAndProps);
      MeasureLayout2 = layoutProjection.MeasureLayout;
      context2.visualElement = useVisualElement(Component2, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode, isSVG);
    }
    return jsxs(MotionContext.Provider, { value: context2, children: [MeasureLayout2 && context2.visualElement ? jsx(MeasureLayout2, { visualElement: context2.visualElement, ...configAndProps }) : null, useRender(Component2, props, useMotionRef(visualState, context2.visualElement, externalRef), visualState, isStatic, forwardMotionProps, isSVG, isValidProp)] });
  }
  MotionDOMComponent.displayName = `motion.${typeof Component2 === "string" ? Component2 : `create(${Component2.displayName ?? Component2.name ?? ""})`}`;
  const ForwardRefMotionComponent = forwardRef(MotionDOMComponent);
  ForwardRefMotionComponent[motionComponentSymbol] = Component2;
  return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
  const layoutGroupId = useContext(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
  const isStrict = useContext(LazyContext).strict;
  if (false) {
    const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
    configAndProps.ignoreStrict ? warning(false, strictMessage, "lazy-strict-mode") : invariant(false, strictMessage, "lazy-strict-mode");
  }
}
function getProjectionFunctionality(props) {
  const featureDefinitions2 = getInitializedFeatureDefinitions();
  const { drag: drag2, layout: layout2 } = featureDefinitions2;
  if (!drag2 && !layout2)
    return {};
  const combined = { ...drag2, ...layout2 };
  return {
    MeasureLayout: drag2?.isEnabled(props) || layout2?.isEnabled(props) ? combined.MeasureLayout : void 0,
    ProjectionNode: combined.ProjectionNode
  };
}

// node_modules/framer-motion/dist/es/render/components/create-proxy.mjs
function createMotionProxy(preloadedFeatures, createVisualElement) {
  if (typeof Proxy === "undefined") {
    return createMotionComponent;
  }
  const componentCache = /* @__PURE__ */ new Map();
  const factory = (Component2, options) => {
    return createMotionComponent(Component2, options, preloadedFeatures, createVisualElement);
  };
  const deprecatedFactoryFunction = (Component2, options) => {
    if (false) {
      warnOnce(false, "motion() is deprecated. Use motion.create() instead.");
    }
    return factory(Component2, options);
  };
  return new Proxy(deprecatedFactoryFunction, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (key === "create")
        return factory;
      if (!componentCache.has(key)) {
        componentCache.set(key, createMotionComponent(key, void 0, preloadedFeatures, createVisualElement));
      }
      return componentCache.get(key);
    }
  });
}

// node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs
var createDomVisualElement = (Component2, options) => {
  const isSVG = options.isSVG ?? isSVGComponent(Component2);
  return isSVG ? new SVGVisualElement(options) : new HTMLVisualElement(options, {
    allowProjection: Component2 !== Fragment
  });
};

// node_modules/framer-motion/dist/es/motion/features/animation/index.mjs
var AnimationFeature = class extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    if (isAnimationControls(animate)) {
      this.unmountControls = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
    this.node.animationState.reset();
    this.unmountControls?.();
  }
};

// node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs
var id2 = 0;
var ExitAnimationFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.id = id2++;
    this.isExitComplete = false;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    if (isPresent && prevIsPresent === false) {
      if (this.isExitComplete) {
        const { initial, custom } = this.node.getProps();
        if (typeof initial === "string" || typeof initial === "object" && initial !== null && !Array.isArray(initial)) {
          const resolved = resolveVariant(this.node, initial, custom);
          if (resolved) {
            const { transition, transitionEnd, ...target } = resolved;
            for (const key in target) {
              this.node.getValue(key)?.jump(target[key]);
            }
          }
        }
        this.node.animationState.reset();
        this.node.animationState.animateChanges();
      } else {
        this.node.animationState.setActive("exit", false);
      }
      this.isExitComplete = false;
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => {
        this.isExitComplete = true;
        onExitComplete(this.id);
      });
    }
  }
  mount() {
    const { register, onExitComplete } = this.node.presenceContext || {};
    if (onExitComplete) {
      onExitComplete(this.id);
    }
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/animations.mjs
var animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};

// node_modules/framer-motion/dist/es/events/event-info.mjs
function extractEventInfo(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
var addPointerInfo = (handler) => (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));

// node_modules/framer-motion/dist/es/events/add-pointer-event.mjs
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}

// node_modules/framer-motion/dist/es/utils/get-context-window.mjs
var getContextWindow = ({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
};

// node_modules/framer-motion/dist/es/utils/distance.mjs
var distance = (a, b2) => Math.abs(a - b2);
function distance2D(a, b2) {
  const xDelta = distance(a.x, b2.x);
  const yDelta = distance(a.y, b2.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}

// node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs
var overflowStyles = /* @__PURE__ */ new Set(["auto", "scroll"]);
var PanSession = class {
  constructor(event, handlers, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3, element } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.lastRawMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.scrollPositions = /* @__PURE__ */ new Map();
    this.removeScrollListeners = null;
    this.onElementScroll = (event2) => {
      this.handleScroll(event2.target);
    };
    this.onWindowScroll = () => {
      this.handleScroll(window);
    };
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      if (this.lastRawMoveEventInfo) {
        this.lastMoveEventInfo = transformPoint(this.lastRawMoveEventInfo, this.transformPagePoint);
      }
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastRawMoveEventInfo = info2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin || !this.startEvent) {
        resumeAnimation && resumeAnimation();
      }
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.distanceThreshold = distanceThreshold;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    const eventOptions = { passive: true, capture: true };
    this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove, eventOptions), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp, eventOptions), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp, eventOptions));
    if (element) {
      this.startScrollTracking(element);
    }
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(element) {
    let current = element.parentElement;
    while (current) {
      const style = getComputedStyle(current);
      if (overflowStyles.has(style.overflowX) || overflowStyles.has(style.overflowY)) {
        this.scrollPositions.set(current, {
          x: current.scrollLeft,
          y: current.scrollTop
        });
      }
      current = current.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    });
    window.addEventListener("scroll", this.onElementScroll, {
      capture: true
    });
    window.addEventListener("scroll", this.onWindowScroll);
    this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: true
      });
      window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(target) {
    const initial = this.scrollPositions.get(target);
    if (!initial)
      return;
    const isWindow = target === window;
    const current = isWindow ? { x: window.scrollX, y: window.scrollY } : {
      x: target.scrollLeft,
      y: target.scrollTop
    };
    const delta = { x: current.x - initial.x, y: current.y - initial.y };
    if (delta.x === 0 && delta.y === 0)
      return;
    if (isWindow) {
      if (this.lastMoveEventInfo) {
        this.lastMoveEventInfo.point.x += delta.x;
        this.lastMoveEventInfo.point.y += delta.y;
      }
    } else {
      if (this.history.length > 0) {
        this.history[0].x -= delta.x;
        this.history[0].y -= delta.y;
      }
    }
    this.scrollPositions.set(target, current);
    frame.update(this.updatePoint, true);
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    this.removeScrollListeners && this.removeScrollListeners();
    this.scrollPositions.clear();
    cancelFrame(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b2) {
  return { x: a.x - b2.x, y: a.y - b2.y };
}
function getPanInfo({ point }, history2) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history2)),
    offset: subtractPoint(point, startDevicePoint(history2)),
    velocity: getVelocity(history2, 0.1)
  };
}
function startDevicePoint(history2) {
  return history2[0];
}
function lastDevicePoint(history2) {
  return history2[history2.length - 1];
}
function getVelocity(history2, timeDelta) {
  if (history2.length < 2) {
    return { x: 0, y: 0 };
  }
  let i2 = history2.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history2);
  while (i2 >= 0) {
    timestampedPoint = history2[i2];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i2--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  if (timestampedPoint === history2[0] && history2.length > 2 && lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta) * 2) {
    timestampedPoint = history2[1];
  }
  const time2 = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time2 === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time2,
    y: (lastPoint.y - timestampedPoint.y) / time2
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}

// node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout2, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
var defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}

// node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs
var elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(visualElement) {
    this.openDragLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.latestPointerEvent = null;
    this.latestPanInfo = null;
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false, distanceThreshold } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event).point);
      }
      this.stopAnimation();
    };
    const onStart = (event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openDragLock)
          this.openDragLock();
        this.openDragLock = setDragLock(drag2);
        if (!this.openDragLock)
          return;
      }
      this.latestPointerEvent = event;
      this.latestPanInfo = info;
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame.update(() => onDragStart(event, info), false, true);
      }
      addValueToWillChange(this.visualElement, "transform");
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      this.latestPointerEvent = event;
      this.latestPanInfo = info;
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openDragLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      if (onDrag) {
        frame.update(() => onDrag(event, info), false, true);
      }
    };
    const onSessionEnd = (event, info) => {
      this.latestPointerEvent = event;
      this.latestPanInfo = info;
      this.stop(event, info);
      this.latestPointerEvent = null;
      this.latestPanInfo = null;
    };
    const resumeAnimation = () => {
      const { dragSnapToOrigin: snap } = this.getProps();
      if (snap || this.constraints) {
        this.startAnimation({ x: 0, y: 0 });
      }
    };
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      distanceThreshold,
      contextWindow: getContextWindow(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(event, panInfo) {
    const finalEvent = event || this.latestPointerEvent;
    const finalPanInfo = panInfo || this.latestPanInfo;
    const isDragging2 = this.isDragging;
    this.cancel();
    if (!isDragging2 || !finalPanInfo || !finalEvent)
      return;
    const { velocity } = finalPanInfo;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.postRender(() => onDragEnd(finalEvent, finalPanInfo));
    }
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.endPanSession();
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openDragLock) {
      this.openDragLock();
      this.openDragLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end();
    this.panSession = void 0;
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout2) {
        this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && !isRefObject(dragConstraints) && layout2 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    if (projection.root) {
      projection.root.scroll = void 0;
      projection.root.updateScroll();
    }
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin === true || dragSnapToOrigin === axis)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia2 = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia2);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange(this.visualElement, axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    const externalMotionValue = props[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, this.visualElement.latestValues[axis] ?? 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        const current = axisValue.get() || 0;
        axisValue.set(point[axis] - mixNumber(min, max, 0.5) + current);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.constraints = false;
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber(min, max, boxProgress[axis]));
    });
    this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      const target = event.target;
      const isClickingTextInputChild = target !== element && isElementTextInput(target);
      if (drag2 && dragListener && !isClickingTextInputChild) {
        this.start(event);
      }
    });
    let stopResizeObservers;
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints) && dragConstraints.current) {
        this.constraints = this.resolveRefConstraints();
        if (!stopResizeObservers) {
          stopResizeObservers = startResizeObservers(element, dragConstraints.current, () => this.scalePositionWithinConstraints());
        }
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame.read(measureDragConstraints);
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue2 = this.getAxisMotionValue(axis);
          if (!motionValue2)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue2.set(motionValue2.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    }));
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
      stopResizeObservers && stopResizeObservers();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
function skipFirstCall(callback) {
  let isFirst = true;
  return () => {
    if (isFirst) {
      isFirst = false;
      return;
    }
    callback();
  };
}
function startResizeObservers(element, constraintsElement, onResize) {
  const stopElement = resize(element, skipFirstCall(onResize));
  const stopContainer = resize(constraintsElement, skipFirstCall(onResize));
  return () => {
    stopElement();
    stopContainer();
  };
}
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}

// node_modules/framer-motion/dist/es/gestures/drag/index.mjs
var DragGesture = class extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  update() {
    const { dragControls } = this.node.getProps();
    const { dragControls: prevDragControls } = this.node.prevProps || {};
    if (dragControls !== prevDragControls) {
      this.removeGroupControls();
      if (dragControls) {
        this.removeGroupControls = dragControls.subscribe(this.controls);
      }
    }
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
    if (!this.controls.isDragging) {
      this.controls.endPanSession();
    }
  }
};

// node_modules/framer-motion/dist/es/gestures/pan/index.mjs
var asyncHandler = (handler) => (event, info) => {
  if (handler) {
    frame.update(() => handler(event, info), false, true);
  }
};
var PanGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: asyncHandler(onPan),
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame.postRender(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs
var hasTakenAnySnapshot = false;
var MeasureLayoutWithContext = class extends Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      if (hasTakenAnySnapshot) {
        projection.root.didUpdate();
      }
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        layoutDependency: this.props.layoutDependency,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
    const { projection } = visualElement;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (prevProps.layoutDependency !== layoutDependency) {
      projection.setOptions({
        ...projection.options,
        layoutDependency
      });
    }
    hasTakenAnySnapshot = true;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { visualElement, layoutAnchor } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.options.layoutAnchor = layoutAnchor;
      projection.root.didUpdate();
      microtask.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    hasTakenAnySnapshot = true;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
};
function MeasureLayout(props) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = useContext(LayoutGroupContext);
  return jsx(MeasureLayoutWithContext, { ...props, layoutGroup, switchLayoutGroup: useContext(SwitchLayoutGroupContext), isPresent, safeToRemove });
}

// node_modules/framer-motion/dist/es/motion/features/drag.mjs
var drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/gestures/hover.mjs
function handleHoverEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.animationState && props.whileHover) {
    node.animationState.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = "onHover" + lifecycle;
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var HoverGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = hover(current, (_element, startEvent) => {
      handleHoverEvent(this.node, startEvent, "Start");
      return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
    });
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/focus.mjs
var FocusGesture = class extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/gestures/press.mjs
function handlePressEvent(node, event, lifecycle) {
  const { props } = node;
  if (node.current instanceof HTMLButtonElement && node.current.disabled) {
    return;
  }
  if (node.animationState && props.whileTap) {
    node.animationState.setActive("whileTap", lifecycle === "Start");
  }
  const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
  const callback = props[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
var PressGesture = class extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    const { globalTapTarget, propagate } = this.node.props;
    this.unmount = press(current, (_element, startEvent) => {
      handlePressEvent(this.node, startEvent, "Start");
      return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
    }, {
      useGlobalTarget: globalTapTarget,
      stopPropagation: propagate?.tap === false
    });
  }
  unmount() {
  }
};

// node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs
var observerCallbacks = /* @__PURE__ */ new WeakMap();
var observers = /* @__PURE__ */ new WeakMap();
var fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
var fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}

// node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs
var thresholdNames = {
  some: 0,
  all: 1
};
var InViewFeature = class extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    this.stopObserver = observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
    this.stopObserver?.();
    this.hasEnteredView = false;
    this.isInView = false;
  }
};
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}

// node_modules/framer-motion/dist/es/motion/features/gestures.mjs
var gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};

// node_modules/framer-motion/dist/es/motion/features/layout.mjs
var layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};

// node_modules/framer-motion/dist/es/render/components/motion/feature-bundle.mjs
var featureBundle = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
};

// node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs
var motion = /* @__PURE__ */ createMotionProxy(featureBundle, createDomVisualElement);

// node_modules/motion/dist/es/react.mjs
var motion2 = motion;

// node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var __defProp2 = Object.defineProperty;
var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
function setRef2(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
__name(setRef2, "setRef");
function composeRefs2(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef2(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i2 = 0; i2 < cleanups.length; i2++) {
          const cleanup = cleanups[i2];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef2(refs[i2], null);
          }
        }
      };
    }
  };
}
__name(composeRefs2, "composeRefs");
function useComposedRefs2(...refs) {
  return useCallback(composeRefs2(...refs), refs);
}
__name(useComposedRefs2, "useComposedRefs");

// node_modules/@radix-ui/react-slot/dist/index.mjs
var __defProp3 = Object.defineProperty;
var __name2 = (target, value) => __defProp3(target, "name", { value, configurable: true });
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const Slot2 = forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    let slottableElement = null;
    let hasSlottable = false;
    const newChildren = [];
    if (isLazyComponent(children) && typeof use2 === "function") {
      children = use2(children._payload);
    }
    Children.forEach(children, (maybeSlottable) => {
      if (isSlottable(maybeSlottable)) {
        hasSlottable = true;
        const slottable = maybeSlottable;
        let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
        if (isLazyComponent(child) && typeof use2 === "function") {
          child = use2(child._payload);
        }
        slottableElement = getSlottableElementFromSlottable(slottable, child);
        newChildren.push(slottableElement?.props?.children);
      } else {
        newChildren.push(maybeSlottable);
      }
    });
    if (slottableElement) {
      slottableElement = cloneElement(slottableElement, void 0, newChildren);
    } else if (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !hasSlottable && Children.count(children) === 1 && isValidElement(children)
    ) {
      slottableElement = children;
    }
    const slottableElementRef = slottableElement ? getElementRef(slottableElement) : void 0;
    const composedRef = useComposedRefs2(forwardedRef, slottableElementRef);
    if (!slottableElement) {
      if (children || children === 0) {
        throw new Error(
          hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName)
        );
      }
      return children;
    }
    const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
    if (slottableElement.type !== Fragment) {
      mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
    }
    return cloneElement(slottableElement, mergedProps);
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
__name2(createSlot, "createSlot");
var Slot = /* @__PURE__ */ createSlot("Slot");
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
  const Slottable2 = /* @__PURE__ */ __name2((props) => "child" in props ? props.children(props.child) : props.children, "Slottable");
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable2;
}
__name2(createSlottable, "createSlottable");
var getSlottableElementFromSlottable = /* @__PURE__ */ __name2((slottable, child) => {
  if ("child" in slottable.props) {
    const child2 = slottable.props.child;
    if (!isValidElement(child2)) return null;
    return cloneElement(child2, void 0, slottable.props.children(child2.props.children));
  }
  return isValidElement(child) ? child : null;
}, "getSlottableElementFromSlottable");
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
__name2(mergeProps, "mergeProps");
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
__name2(getElementRef, "getElementRef");
function isSlottable(child) {
  return isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
__name2(isSlottable, "isSlottable");
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
__name2(isLazyComponent, "isLazyComponent");
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
__name2(isPromiseLike, "isPromiseLike");
var createSlotError = /* @__PURE__ */ __name2((ownerName) => {
  return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
}, "createSlotError");
var createSlottableError = /* @__PURE__ */ __name2((ownerName) => {
  return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
}, "createSlottableError");
var use2 = react_exports[" use ".trim().toString()];

// node_modules/clsx/dist/clsx.mjs
function r3(e) {
  var t2, f2, n2 = "";
  if ("string" == typeof e || "number" == typeof e) n2 += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t2 = 0; t2 < o; t2++) e[t2] && (f2 = r3(e[t2])) && (n2 && (n2 += " "), n2 += f2);
  } else for (f2 in e) e[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e, t2, f2 = 0, n2 = "", o = arguments.length; f2 < o; f2++) (e = arguments[f2]) && (t2 = r3(e)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}

// node_modules/class-variance-authority/dist/index.mjs
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i2 = 0; i2 < array1.length; i2++) {
    combinedArray[i2] = array1[i2];
  }
  for (let i2 = 0; i2 < array2.length; i2++) {
    combinedArray[array1.length + i2] = array2[i2];
  }
  return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result) return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return void 0;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i2 = 0; i2 < validatorsLength; i2++) {
    const validatorObj = validators[i2];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return void 0;
};
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
var createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i2 = 0; i2 < len; i2++) {
    const classDefinition = classGroup[i2];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i2 = 0; i2 < len; i2++) {
    const [key, value] = entries[i2];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
var getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i2 = 0; i2 < len; i2++) {
    const part = parts[i2];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache2 = /* @__PURE__ */ Object.create(null);
  let previousCache = /* @__PURE__ */ Object.create(null);
  const update = (key, value) => {
    cache2[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache2;
      cache2 = /* @__PURE__ */ Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache2[key];
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache[key]) !== void 0) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache2) {
        cache2[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
var createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0; index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[") bracketDepth++;
      else if (currentCharacter === "]") bracketDepth--;
      else if (currentCharacter === "(") parenDepth++;
      else if (currentCharacter === ")") parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)
    ) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
var createSortModifiers = (config) => {
  const modifierWeights = /* @__PURE__ */ new Map();
  config.orderSensitiveModifiers.forEach((mod12, index) => {
    modifierWeights.set(mod12, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i2 = 0; i2 < modifiers.length; i2++) {
      const modifier = modifiers[i2];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
  ...createClassGroupUtils(config)
});
var createPostfixLookupClassGroupIds = (config) => {
  const lookup = /* @__PURE__ */ Object.create(null);
  const classGroupIds = config.postfixLookupClassGroups;
  if (classGroupIds) {
    for (let i2 = 0; i2 < classGroupIds.length; i2++) {
      lookup[classGroupIds[i2]] = true;
    }
  }
  return lookup;
};
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers,
    postfixLookupClassGroupIds
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId;
    if (hasPostfixModifier) {
      const baseClassNameWithoutPostfix = baseClassName.substring(0, maybePostfixModifierPosition);
      classGroupId = getClassGroupId(baseClassNameWithoutPostfix);
      const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
      if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
        classGroupId = classGroupIdWithPostfix;
        hasPostfixModifier = false;
      }
    } else {
      classGroupId = getClassGroupId(baseClassName);
    }
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i2 = 0; i2 < conflictGroups.length; ++i2) {
      const group = conflictGroups[i2];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
var twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var toValue = (mix2) => {
  if (typeof mix2 === "string") {
    return mix2;
  }
  let resolvedValue;
  let string = "";
  for (let k3 = 0; k3 < mix2.length; k3++) {
    if (mix2[k3]) {
      if (resolvedValue = toValue(mix2[k3])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  lengthUnitRegex.test(value) && !colorFunctionRegex.test(value)
);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [isNamedContainerQuery],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: scaleInset()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": scaleInset(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: scaleInset()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: scaleMargin()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...scaleSizing()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: scaleColor()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [isInteger, isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": scaleColor()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": scaleColor()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// components/ui/motion.ts
var CONTROL_HOVER_TRANSITION = "transition-colors duration-150 hover:duration-0";
var LIST_HOVER_TRANSITION = "transition-none";

// components/ui/button.tsx
var buttonVariants = cva(
  `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ${CONTROL_HOVER_TRANSITION} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-transparent hover:bg-state-hover hover:text-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-state-hover hover:text-foreground aria-pressed:bg-state-active aria-pressed:text-foreground aria-pressed:hover:bg-state-active data-[state=open]:bg-state-active data-[state=open]:text-foreground data-[state=open]:hover:bg-state-active",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// bb-plugin-runtime-shim:@radix-ui/react-context-menu
var runtime5 = globalThis.__bbPluginRuntime;
if (runtime5 == null || runtime5.radixContextMenu == null) {
  throw new Error('Cannot load "@radix-ui/react-context-menu": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod5 = runtime5.radixContextMenu;
var {
  Arrow,
  CheckboxItem,
  Content,
  ContextMenu,
  ContextMenuArrow,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Group,
  Item,
  ItemIndicator,
  Label,
  Portal,
  RadioGroup,
  RadioItem,
  Root,
  Separator,
  Sub,
  SubContent,
  SubTrigger,
  Trigger,
  createContextMenuScope
} = mod5;

// lib/portal-scope.ts
function usePortalScopeProps() {
  const pluginId = true ? "pets" : void 0;
  return {
    "data-bb-portaled-overlay": "",
    "data-bb-plugin-root": "",
    ...pluginId !== void 0 ? { "data-bb-plugin": pluginId } : {}
  };
}

// components/ui/coarse-pointer-sizing.ts
var COARSE_POINTER_TEXT_BASE_CLASS = "text-sm max-md:pointer-coarse:text-base";
var COARSE_POINTER_CHECK_SLOT_CLASS = "h-3.5 w-3.5 max-md:pointer-coarse:h-5 max-md:pointer-coarse:w-5";
var HEADER_ICON_BUTTON_BOX_CLASS = "h-[28px] w-[28px] rounded-md p-0 max-md:pointer-coarse:h-[36px] max-md:pointer-coarse:w-[36px]";
var COARSE_POINTER_HEADER_ICON_BUTTON_CLASS = `${HEADER_ICON_BUTTON_BOX_CLASS} [&_svg]:size-[16px] max-md:pointer-coarse:[&_svg]:size-[20px]`;
var COARSE_POINTER_HEADER_REDUCED_GLYPH_ICON_BUTTON_CLASS = `${HEADER_ICON_BUTTON_BOX_CLASS} [&_svg]:size-[13px] max-md:pointer-coarse:[&_svg]:size-[16px]`;
var COARSE_POINTER_INPUT_HEIGHT_CLASS = "h-9 max-md:pointer-coarse:h-10";

// components/ui/menu-item-hover.tsx
var MENU_NAV_KEYS = /* @__PURE__ */ new Set([
  "ArrowDown",
  "ArrowUp",
  "Home",
  "End",
  "PageDown",
  "PageUp"
]);
var MENU_ITEM_LAST_HOVERED_CLASS = "data-[last-hovered]:bg-state-hover data-[last-hovered]:text-foreground";
var MenuHoverContext = createContext({
  lastHoveredId: null,
  setLastHovered: () => {
  },
  clearLastHovered: () => {
  }
});
function MenuHoverProvider({ children }) {
  const [lastHoveredId, setLastHoveredId] = useState(null);
  const value = useMemo(
    () => ({
      lastHoveredId,
      setLastHovered: setLastHoveredId,
      clearLastHovered: () => setLastHoveredId(null)
    }),
    [lastHoveredId]
  );
  return /* @__PURE__ */ jsx(MenuHoverContext.Provider, { value, children });
}
function useMenuItemHover(handlers) {
  const id3 = useId();
  const { lastHoveredId, setLastHovered, clearLastHovered } = useContext(MenuHoverContext);
  const isLastHovered = lastHoveredId === id3;
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;
  const onPointerEnter = useCallback(
    (event) => {
      handlersRef.current?.onPointerEnter?.(event);
      setLastHovered(id3);
    },
    [id3, setLastHovered]
  );
  const onKeyDown = useCallback(
    (event) => {
      handlersRef.current?.onKeyDown?.(event);
      if (MENU_NAV_KEYS.has(event.key)) {
        clearLastHovered();
      }
    },
    [clearLastHovered]
  );
  return {
    isLastHovered,
    hoverProps: {
      "data-last-hovered": isLastHovered ? "" : void 0,
      onPointerEnter,
      onKeyDown
    }
  };
}

// node_modules/@hugeicons/react/dist/esm/HugeiconsIcon.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none"
};
var HugeiconsIcon = forwardRef(({ color: color2 = "currentColor", size = 24, strokeWidth, absoluteStrokeWidth = false, className = "", altIcon, showAlt = false, icon, primaryColor, secondaryColor, disableSecondaryOpacity = false, ...rest }, ref) => {
  const calculatedStrokeWidth = strokeWidth !== void 0 ? absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth : void 0;
  const strokeProps = calculatedStrokeWidth !== void 0 ? {
    strokeWidth: calculatedStrokeWidth,
    stroke: "currentColor"
  } : {};
  const elementProps = {
    ref,
    ...defaultAttributes,
    width: size,
    height: size,
    color: primaryColor || color2,
    className,
    ...strokeProps,
    ...rest
  };
  const currentIcon = showAlt && altIcon ? altIcon : icon;
  const svgChildren = [...currentIcon].sort(([, a], [, b2]) => {
    const hasOpacityA = a.opacity !== void 0;
    const hasOpacityB = b2.opacity !== void 0;
    return hasOpacityB ? 1 : hasOpacityA ? -1 : 0;
  }).map(([tag, attrs]) => {
    const isSecondaryPath = attrs.opacity !== void 0;
    const pathOpacity = isSecondaryPath && !disableSecondaryOpacity ? attrs.opacity : void 0;
    const fillProps = secondaryColor ? {
      ...attrs.stroke !== void 0 ? {
        stroke: isSecondaryPath ? secondaryColor : primaryColor || color2
      } : {
        fill: isSecondaryPath ? secondaryColor : primaryColor || color2
      }
    } : {};
    return createElement(tag, {
      ...attrs,
      ...strokeProps,
      ...fillProps,
      opacity: pathOpacity,
      key: attrs.key
    });
  });
  return createElement("svg", elementProps, svgChildren);
});
HugeiconsIcon.displayName = "HugeiconsIcon";

// node_modules/@hugeicons/core-free-icons/dist/esm/index.js
var AiContentGenerator01Icon = [
  ["path", { d: "M11 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H12C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V10.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17.4069 14.4036C17.6192 13.8655 18.3808 13.8655 18.5931 14.4036L18.6298 14.4969C19.1482 15.8113 20.1887 16.8518 21.5031 17.3702L21.5964 17.4069C22.1345 17.6192 22.1345 18.3808 21.5964 18.5931L21.5031 18.6298C20.1887 19.1482 19.1482 20.1887 18.6298 21.5031L18.5931 21.5964C18.3808 22.1345 17.6192 22.1345 17.4069 21.5964L17.3702 21.5031C16.8518 20.1887 15.8113 19.1482 14.4969 18.6298L14.4036 18.5931C13.8655 18.3808 13.8655 17.6192 14.4036 17.4069L14.4969 17.3702C15.8113 16.8518 16.8518 15.8113 17.3702 14.4969L17.4069 14.4036Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M7 7H15M7 11.5H15M7 16H11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var Alert02Icon = [
  ["path", { d: "M13.9248 21H10.0752C5.44476 21 3.12955 21 2.27636 19.4939C1.42317 17.9879 2.60736 15.9914 4.97574 11.9985L6.90057 8.75333C9.17559 4.91778 10.3131 3 12 3C13.6869 3 14.8244 4.91777 17.0994 8.75332L19.0243 11.9985C21.3926 15.9914 22.5768 17.9879 21.7236 19.4939C20.8704 21 18.5552 21 13.9248 21Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 9V13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var AlertCircleIcon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 8V12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var Archive03Icon = [
  ["path", { d: "M21 7H3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V7Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M21 7H3L4.2 5.4C5.08328 4.22229 5.52492 3.63344 6.15836 3.31672C6.7918 3 7.52786 3 9 3H15C16.4721 3 17.2082 3 17.8416 3.31672C18.4751 3.63344 18.9167 4.22229 19.8 5.4L21 7Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12 17L12 10.5M9 14.5C9.58984 15.1068 11.1597 17.5 12 17.5C12.8403 17.5 14.4102 15.1068 15 14.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var ArrowDown01Icon = [
  ["path", { d: "M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var ArrowDown02Icon = [
  ["path", { d: "M12 18.502V5.00195", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowDownDoubleIcon = [
  ["path", { d: "M17.9997 12.5C17.9997 12.5 13.5807 18.5 11.9996 18.5C10.4185 18.5 5.99966 12.5 5.99966 12.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17.9997 5.50005C17.9997 5.50005 13.5807 11.5 11.9996 11.5C10.4185 11.5 5.99966 5.5 5.99966 5.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowLeft01Icon = [
  ["path", { d: "M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var ArrowMoveDownLeftIcon = [
  ["path", { d: "M20 3V5.07692C20 7.07786 20 8.07833 19.8547 8.91545C19.0547 13.5235 15.0934 17.1376 10.0426 17.8674C9.12509 18 7.19318 18 5 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M7 21C6.39316 20.4102 4 18.8403 4 18C4 17.1597 6.39316 15.5898 7 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowMoveDownRightIcon = [
  ["path", { d: "M4 3V5.07692C4 7.07786 4 8.07833 4.14533 8.91545C4.94529 13.5235 8.90656 17.1376 13.9574 17.8674C14.8749 18 16.8068 18 19 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17 21C17.6068 20.4102 20 18.8403 20 18C20 17.1597 17.6068 15.5898 17 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowReloadHorizontalIcon = [
  ["path", { d: "M20.5 5.5H9.5C5.78672 5.5 3 8.18503 3 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3.5 18.5H14.5C18.2133 18.5 21 15.815 21 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var ArrowRight01Icon = [
  ["path", { d: "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var ArrowRight02Icon = [
  ["path", { d: "M18.5 12L4.99997 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowTurnBackwardIcon = [
  ["path", { d: "M11 6H15.5C17.9853 6 20 8.01472 20 10.5C20 12.9853 17.9853 15 15.5 15H4", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M6.99998 12C6.99998 12 4.00001 14.2095 4 15C3.99999 15.7906 7 18 7 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowTurnForwardIcon = [
  ["path", { d: "M13 6H8.5C6.01472 6 4 8.01472 4 10.5C4 12.9853 6.01472 15 8.5 15H20", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17 12C17 12 20 14.2095 20 15C20 15.7906 17 18 17 18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowUp01Icon = [
  ["path", { d: "M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var ArrowUp02Icon = [
  ["path", { d: "M12 5.5V19", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowUpDoubleIcon = [
  ["path", { d: "M18 11.5C18 11.5 13.5811 5.50001 12 5.5C10.4188 5.49999 6 11.5 6 11.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18 18.5C18 18.5 13.5811 12.5 12 12.5C10.4188 12.5 6 18.5 6 18.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ArrowUpDownIcon = [
  ["path", { d: "M7 4V20", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17 19L17 4", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M10 6.99998C10 6.99998 7.79053 4.00001 6.99998 4C6.20942 3.99999 4 7 4 7", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M20 17C20 17 17.7905 20 17 20C16.2094 20 14 17 14 17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var ArrowUpRight01Icon = [
  ["path", { d: "M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var AttachmentIcon = [
  ["path", { d: "M19.5 12.0001V13.5001C19.5 17.6422 16.1421 21.0001 12 21.0001C7.85786 21.0001 4.5 17.6422 4.5 13.5001V8C4.5 5.23858 6.73858 3 9.5 3C12.2614 3 14.5 5.23858 14.5 8V13.5C14.5 14.8807 13.3807 16 12 16C10.6193 16 9.5 14.8807 9.5 13.5V9.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var AudioWave01Icon = [
  ["path", { d: "M9 3V21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M6 7V17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12 6V18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M15 9L15 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M18 7L18 17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M21 11L21 13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "5" }],
  ["path", { d: "M3 11L3 13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "6" }]
];
var Book02Icon = [
  ["path", { d: "M15.5 7H8.5M12.499 11H8.49902", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M20 22H6C4.89543 22 4 21.1046 4 20M4 20C4 18.8954 4.89543 18 6 18H20V6C20 4.11438 20 3.17157 19.4142 2.58579C18.8284 2 17.8856 2 16 2H10C7.17157 2 5.75736 2 4.87868 2.87868C4 3.75736 4 5.17157 4 8V20Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M19.5 18C19.5 18 18.5 18.7628 18.5 20C18.5 21.2372 19.5 22 19.5 22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var BrainIcon = [
  ["path", { d: "M16.998 7.12652C17.3182 7.04393 17.654 7 18 7C20.2091 7 22 8.79086 22 11C22 13.2091 20.2091 15 18 15C17.6451 15 17.3009 14.9538 16.9733 14.867M16.998 7.12652C16.9993 7.08451 17 7.04233 17 7C17 4.79086 15.2091 3 13 3C11.0824 3 9.47994 4.34939 9.09041 6.15043M16.998 7.12652C16.9769 7.80763 16.7854 8.44584 16.4649 9M16.9733 14.867C16.9909 14.7472 17 14.6247 17 14.5C17 13.2905 16.1411 12.2816 15 12.05M16.9733 14.867C16.7957 16.0737 15.756 17 14.5 17H14C11.7909 17 10 18.7909 10 21M9.09041 6.15043C8.74377 6.05243 8.37801 6 8 6C5.79086 6 4 7.79086 4 10C4 10.3886 4.05542 10.7643 4.15878 11.1195M9.09041 6.15043C10.1015 6.43625 10.9498 7.10965 11.4649 8M4.15878 11.1195C2.9114 11.4832 2 12.6352 2 14C2 15.6569 3.34315 17 5 17C6.30622 17 7.41746 16.1652 7.82929 15M4.15878 11.1195C4.24921 11.4303 4.37632 11.7255 4.53513 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.8361 11.7435C11.3257 12.2353 10.453 12.3202 9.70713 11.9008C8.9612 11.4814 8.58031 10.6917 8.73535 10", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
var BrowserIcon = [
  ["path", { d: "M3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 9H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var BubbleChatAddIcon = [
  ["path", { d: "M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M15.5 12H8.5M12 8.5V15.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var BubbleChatQuestionIcon = [
  ["path", { d: "M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var BubbleChatIcon = [
  ["path", { d: "M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.1257 12H12.0007M8.125 12H8M16.125 12H16M12.2507 12C12.2507 12.1381 12.1388 12.25 12.0007 12.25C11.8627 12.25 11.7507 12.1381 11.7507 12C11.7507 11.8619 11.8627 11.75 12.0007 11.75C12.1388 11.75 12.2507 11.8619 12.2507 12ZM8.25 12C8.25 12.1381 8.13807 12.25 8 12.25C7.86193 12.25 7.75 12.1381 7.75 12C7.75 11.8619 7.86193 11.75 8 11.75C8.13807 11.75 8.25 11.8619 8.25 12ZM16.25 12C16.25 12.1381 16.1381 12.25 16 12.25C15.8619 12.25 15.75 12.1381 15.75 12C15.75 11.8619 15.8619 11.75 16 11.75C16.1381 11.75 16.25 11.8619 16.25 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var Bug01Icon = [
  ["path", { d: "M3.01309 4.99084C2.89323 6.05084 3.55249 8.42285 6.48923 8.42285", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17.5951 8.38081C18.8357 8.57881 21.1132 7.49881 20.9957 5.00281", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M20.9928 20.9989C21.0528 19.9429 20.1777 17.5549 17.599 17.4229", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M6.45163 17.4708C5.65013 17.2308 3.01306 18.3348 3.01306 20.9988", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M9.3299 6.11884C9.35388 5.09884 9.84533 2.99884 12.0029 2.99884C13.9208 2.99884 14.5861 4.61884 14.676 6.11884M6.26131 9.41884C6.38118 8.63884 7.29216 6.81484 9.36586 6.63484C11.4635 6.55564 14.3403 6.58684 14.8797 6.67084C15.5869 6.73377 17.2951 7.43884 17.7506 9.41884C17.9124 10.4388 17.8285 11.8788 17.8524 12.7188C17.8165 13.5588 17.9207 15.2623 17.7565 16.1388C17.6367 17.0988 16.9894 18.4668 16.1024 19.3068C14.7838 20.7228 11.1639 22.2108 8.03534 19.4508C6.41713 17.8908 6.30925 16.3788 6.18939 15.7788C6.15725 15.4571 6.15875 13.8763 6.16541 12.3588C6.14144 11.046 6.17235 9.78063 6.26131 9.41884Z", stroke: "currentColor", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M3.01306 12.8988H5.9498", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "5" }],
  ["path", { d: "M20.9929 12.8988L18.1161 12.8988", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "6" }],
  ["path", { d: "M12.0033 16.4988L12.0033 20.2788", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "7" }]
];
var Calendar03Icon = [
  ["path", { d: "M16 2V6M8 2V6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 10H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var CalendarCheckOut02Icon = [
  ["path", { d: "M16 2V6M8 2V6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 10H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M13.5 18.5C14.0057 18.0085 16 16.7002 16 16C16 15.2998 14.0057 13.9915 13.5 13.5M15.5 16L9 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var CalendarSyncIcon = [
  ["path", { d: "M16 2V6M8 2V6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V12C3 8.22876 3 6.34315 4.17157 5.17157C5.34315 4 7.22876 4 11 4H13C16.7712 4 18.6569 4 19.8284 5.17157C20.8915 6.23467 20.99 7.8857 20.9991 11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 10H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M14.385 15.7855C15.0271 14.4342 16.4044 13.5 18 13.5C19.4806 13.5 20.7733 14.3044 21.4649 15.5M14.385 15.7855C14.6833 16 15.1502 16 16 16H17M14.385 15.7855C14.3524 15.762 14.3218 15.736 14.2929 15.7071C14 15.4142 14 14.9428 14 14V13M21.615 19.2145C20.9729 20.5658 19.5956 21.5 18 21.5C16.5194 21.5 15.2267 20.6956 14.5351 19.5M21.615 19.2145C21.3166 19 20.8498 19 20 19H19M21.615 19.2145C21.6476 19.238 21.6782 19.264 21.7071 19.2929C22 19.5858 22 20.0572 22 21V22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var Cancel01Icon = [
  ["path", { d: "M18 6L6.00081 17.9992M17.9992 18L6 6.00085", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var CancelCircleIcon = [
  ["path", { d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14.9994 15L9 9M9.00064 15L15 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ChartColumnIcon = [
  ["path", { d: "M8 9V17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 5V17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M18 13V17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var ChatFeedback01Icon = [
  ["path", { d: "M7.5 8.5H16.5M7.5 12.5H13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M22 10.5C22 9.72921 21.9865 8.97679 21.9609 8.2503C21.8772 5.87683 21.8353 4.69009 20.8699 3.71745C19.9046 2.74481 18.6843 2.6926 16.2438 2.58819C14.9048 2.5309 13.4791 2.5 12 2.5C10.5209 2.5 9.09517 2.5309 7.7562 2.58819C5.3157 2.6926 4.09545 2.74481 3.13007 3.71745C2.16469 4.69009 2.12282 5.87683 2.03909 8.2503C2.01346 8.97679 2 9.72921 2 10.5C2 11.2708 2.01346 12.0232 2.03909 12.7497C2.12282 15.1232 2.16469 16.3099 3.13007 17.2826C4.09545 18.2552 5.31573 18.3074 7.7563 18.4118C8.4902 18.4432 9.25016 18.4667 10.0307 18.4815C10.7718 18.4955 11.1424 18.5026 11.468 18.6266C11.7936 18.7506 12.0675 18.9855 12.6155 19.4553L14.795 21.3242C14.9273 21.4376 15.0958 21.5 15.2701 21.5C15.6732 21.5 16 21.1732 16 20.7701V18.4219C16.0816 18.4186 16.1629 18.4153 16.2438 18.4118C18.6843 18.3074 19.9046 18.2552 20.8699 17.2825C21.8353 16.3099 21.8772 15.1232 21.9609 12.7497C21.9865 12.0232 22 11.2708 22 10.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var CheckListIcon = [
  ["path", { d: "M11 6L21 6", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11 12L21 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M11 18L21 18", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }]
];
var CheckmarkCircle02Icon = [
  ["path", { d: "M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M8 12.5L10.5 15L16 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var CircleArrowShrink01Icon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.115 11.1151C11.6324 10.5977 11.5463 8.4 11.5463 8.4M11.115 11.1151C10.5977 11.6324 8.4 11.5462 8.4 11.5462M11.115 11.1151L7.5 7.5M12.8882 12.8882C13.4055 12.3708 15.6032 12.4569 15.6032 12.4569M12.8882 12.8882C12.3709 13.4055 12.457 15.6032 12.457 15.6032M12.8882 12.8882L16.5 16.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var CircleIcon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var Clock01Icon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 8V12L14 14", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var CloudIcon = [
  ["path", { d: "M17.4776 10.0001C17.485 10 17.4925 10 17.5 10C19.9853 10 22 12.0147 22 14.5C22 16.9853 19.9853 19 17.5 19H7C4.23858 19 2 16.7614 2 14C2 11.4003 3.98398 9.26407 6.52042 9.0227M17.4776 10.0001C17.4924 9.83536 17.5 9.66856 17.5 9.5C17.5 6.46243 15.0376 4 12 4C9.12324 4 6.76233 6.20862 6.52042 9.0227M17.4776 10.0001C17.3753 11.1345 16.9286 12.1696 16.2428 13M6.52042 9.0227C6.67826 9.00768 6.83823 9 7 9C8.12582 9 9.16474 9.37209 10.0005 10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var CollapseIcon = [
  ["path", { d: "M13 4L13 7.00002C13 8.88563 13.0001 9.82843 13.5858 10.4142C14.1716 11 15.1144 11 17 11L20 11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.0001 20L11 17C11 15.1144 11 14.1715 10.4142 13.5858C9.82843 13 8.88563 13 7.00002 13L4.00006 13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ComputerTerminal01Icon = [
  ["path", { d: "M7.5 7.5L8.72654 8.55719C9.24218 9.00163 9.5 9.22386 9.5 9.5C9.5 9.77614 9.24218 9.99836 8.72654 10.4428L7.5 11.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.5 12.5H15.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12 21C15.7497 21 17.6246 21 18.9389 20.0451C19.3634 19.7367 19.7367 19.3634 20.0451 18.9389C21 17.6246 21 15.7497 21 12C21 8.25027 21 6.3754 20.0451 5.06107C19.7367 4.6366 19.3634 4.26331 18.9389 3.95491C17.6246 3 15.7497 3 12 3C8.25027 3 6.3754 3 5.06107 3.95491C4.6366 4.26331 4.26331 4.6366 3.95491 5.06107C3 6.3754 3 8.25027 3 12C3 15.7497 3 17.6246 3.95491 18.9389C4.26331 19.3634 4.6366 19.7367 5.06107 20.0451C6.3754 21 8.25027 21 12 21Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var Copy01Icon = [
  ["path", { d: "M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var DashedLine02Icon = [
  ["path", { d: "M6.3 2.75143C5.26076 2.94471 4.49591 3.28657 3.89124 3.89124C3.28657 4.49591 2.94471 5.26076 2.75143 6.3M17.7 2.75143C18.7392 2.94471 19.5041 3.28657 20.1088 3.89124C20.7134 4.49591 21.0553 5.26076 21.2486 6.3M13.9 2.50495C13.3156 2.5 12.6839 2.5 12 2.5C11.3161 2.5 10.6844 2.5 10.1 2.50495M21.495 10.1C21.5 10.6844 21.5 11.3161 21.5 12C21.5 12.6839 21.5 13.3156 21.495 13.9001M2.50495 10.1C2.5 10.6844 2.5 11.3161 2.5 12C2.5 12.6839 2.5 13.3156 2.50496 13.9001M2.75143 17.7C2.94471 18.7392 3.28657 19.5041 3.89124 20.1088C4.49591 20.7134 5.26076 21.0553 6.3 21.2486M21.2486 17.7C21.0553 18.7392 20.7134 19.5041 20.1088 20.1088C19.5041 20.7134 18.7392 21.0553 17.7 21.2486M13.9 21.495C13.3156 21.5 12.6839 21.5 12 21.5C11.3162 21.5 10.6845 21.5 10.1002 21.495", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var DashedLineCircleIcon = [
  ["path", { d: "M14 2.20004C13.3538 2.06886 12.6849 2 12 2C11.3151 2 10.6462 2.06886 10 2.20004M21.8 10C21.9311 10.6462 22 11.3151 22 12C22 12.6849 21.9311 13.3538 21.8 14M14 21.8C13.3538 21.9311 12.6849 22 12 22C11.3151 22 10.6462 21.9311 10 21.8M2.20004 14C2.06886 13.3538 2 12.6849 2 12C2 11.3151 2.06886 10.6462 2.20004 10M17.5 3.64702C18.6332 4.39469 19.6053 5.36678 20.353 6.5M20.353 17.5C19.6053 18.6332 18.6332 19.6053 17.5 20.353M6.5 20.353C5.36678 19.6053 4.39469 18.6332 3.64702 17.5M3.64702 6.5C4.39469 5.36678 5.36678 4.39469 6.5 3.64702", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var DateTimeIcon = [
  ["path", { d: "M16 2V6M8 2V6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 10H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M18.2671 18.7011L17 18V16.2668M21 18C21 20.2091 19.2091 22 17 22C14.7909 22 13 20.2091 13 18C13 15.7909 14.7909 14 17 14C19.2091 14 21 15.7909 21 18Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var Delete02Icon = [
  ["path", { d: "M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M9.5 16.5L9.5 10.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M14.5 16.5L14.5 10.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "3" }]
];
var DiscordIcon = [
  ["path", { d: "M15.5 17.5C16.5 19 17.3333 19.6667 18 20C19.3333 19.6667 22 18.2 22 15C22 11.8 20.6667 7.33333 20 5.5C18 4.3 15.8333 4 15 4L14.198 5.60393C13.4135 5.28708 12.4058 5.25438 12 5.27763C11.5942 5.25438 10.5865 5.28708 9.80197 5.60393L9 4C8.16667 4 6 4.3 4 5.5C3.33333 7.33333 2 11.8 2 15C2 18.2 4.66667 19.6667 6 20C6.66667 19.6667 7.5 19 8.5 17.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17.3652 11.5C17.3652 12.6046 16.5817 13.5 15.6152 13.5C14.6487 13.5 13.8652 12.6046 13.8652 11.5C13.8652 10.3954 14.6487 9.5 15.6152 9.5C16.5817 9.5 17.3652 10.3954 17.3652 11.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M10 11.5C10 12.6046 9.2165 13.5 8.25 13.5C7.2835 13.5 6.5 12.6046 6.5 11.5C6.5 10.3954 7.2835 9.5 8.25 9.5C9.2165 9.5 10 10.3954 10 11.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M17.5 16.5C16.4022 17.3967 14.3502 18 12 18C9.64981 18 7.59785 17.3967 6.5 16.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var Download01Icon = [
  ["path", { d: "M2.99969 17.0002C2.99969 17.9302 2.99969 18.3952 3.10192 18.7767C3.37932 19.8119 4.18796 20.6206 5.22324 20.898C5.60474 21.0002 6.06972 21.0002 6.99969 21.0002L16.9997 21.0002C17.9297 21.0002 18.3947 21.0002 18.7762 20.898C19.8114 20.6206 20.6201 19.8119 20.8975 18.7767C20.9997 18.3952 20.9997 17.9302 20.9997 17.0002", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16.4998 11.5002C16.4998 11.5002 13.1856 16.0002 11.9997 16.0002C10.8139 16.0002 7.49976 11.5002 7.49976 11.5002M11.9997 15.0002V3.00016", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var DragDropHorizontalIcon = [
  ["path", { d: "M6 8C6.55228 8 7 8.44772 7 9C7 9.55228 6.55228 10 6 10C5.44772 10 5 9.55228 5 9C5 8.44772 5.44772 8 6 8Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M6 14C6.55228 14 7 14.4477 7 15C7 15.5523 6.55228 16 6 16C5.44772 16 5 15.5523 5 15C5 14.4477 5.44772 14 6 14Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M18 8C18.5523 8 19 8.44772 19 9C19 9.55228 18.5523 10 18 10C17.4477 10 17 9.55228 17 9C17 8.44772 17.4477 8 18 8Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M12 8C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M18 14C18.5523 14 19 14.4477 19 15C19 15.5523 18.5523 16 18 16C17.4477 16 17 15.5523 17 15C17 14.4477 17.4477 14 18 14Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "5" }]
];
var DragDropVerticalIcon = [
  ["path", { d: "M16 6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6C14 5.44772 14.4477 5 15 5C15.5523 5 16 5.44772 16 6Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M10 6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6C8 5.44772 8.44772 5 9 5C9.55228 5 10 5.44772 10 6Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M16 18C16 18.5523 15.5523 19 15 19C14.4477 19 14 18.5523 14 18C14 17.4477 14.4477 17 15 17C15.5523 17 16 17.4477 16 18Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M10 18C10 18.5523 9.55228 19 9 19C8.44772 19 8 18.5523 8 18C8 17.4477 8.44772 17 9 17C9.55228 17 10 17.4477 10 18Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "5" }]
];
var Edit02Icon = [
  ["path", { d: "M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 4L20 11", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14 22L22 22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var Edit04Icon = [
  ["path", { d: "M8.17151 19.8284L19.8284 8.17157C20.3736 7.62632 20.6462 7.3537 20.792 7.0596C21.0693 6.50005 21.0693 5.8431 20.792 5.28354C20.6462 4.98945 20.3736 4.71682 19.8284 4.17157C19.2831 3.62632 19.0105 3.3537 18.7164 3.20796C18.1568 2.93068 17.4999 2.93068 16.9403 3.20796C16.6462 3.3537 16.3736 3.62632 15.8284 4.17157L4.17151 15.8284C3.59345 16.4064 3.30442 16.6955 3.15218 17.063C2.99994 17.4305 2.99994 17.8393 2.99994 18.6568V20.9999H5.34308C6.16059 20.9999 6.56934 20.9999 6.93688 20.8477C7.30442 20.6955 7.59345 20.4064 8.17151 19.8284Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 21H18", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14.5 5.5L18.5 9.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var ElectricPlugsIcon = [
  ["path", { d: "M9 2L9 5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M15 2L15 5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12 18L12 22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M12.6939 8.5L10.6029 10.6749C10.3788 10.9079 10.5394 11.2433 10.9048 11.3053L13.0952 11.6773C13.4848 11.7434 13.6334 12.1147 13.361 12.3413L10.7666 14.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M14.3066 5L9.69342 5C7.5551 5 6.48594 5 5.89527 5.69774C5.3046 6.39548 5.46717 7.46639 5.79232 9.60823L6.31604 13.0581C6.83606 16.4836 8.28588 18 12 18C15.7141 18 17.1639 16.4836 17.684 13.0581L18.2077 9.60823C18.5328 7.46639 18.6954 6.39548 18.1047 5.69774C17.5141 5 16.4449 5 14.3066 5Z", stroke: "currentColor", strokeWidth: "1.5", key: "4" }]
];
var ExpandIcon = [
  ["path", { d: "M19 12L19 8.99996C19 7.11435 18.9999 6.17155 18.4142 5.58577C17.8284 4.99999 16.8856 4.99999 15 5L12 5.00001", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M5 12L5.00003 15C5.00004 16.8856 5.00005 17.8284 5.58584 18.4142C6.17163 19 7.11443 19 9.00004 19L12 19", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var File01Icon = [
  ["path", { d: "M8 7L16 7", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M8 11L12 11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var FileAttachmentIcon = [
  ["path", { d: "M4 12.0004L4 14.5446C4 17.7896 4 19.4121 4.88607 20.5111C5.06508 20.7331 5.26731 20.9354 5.48933 21.1144C6.58831 22.0004 8.21082 22.0004 11.4558 22.0004C12.1614 22.0004 12.5141 22.0004 12.8372 21.8864C12.9044 21.8627 12.9702 21.8354 13.0345 21.8047C13.3436 21.6569 13.593 21.4074 14.0919 20.9085L18.8284 16.172C19.4065 15.5939 19.6955 15.3049 19.8478 14.9374C20 14.5698 20 14.1611 20 13.3436V10.0004C20 6.22919 20 4.34358 18.8284 3.172C17.7693 2.11284 16.1265 2.01122 13.0345 2.00146M13 21.5004V21.0004C13 18.172 13 16.7578 13.8787 15.8791C14.7574 15.0004 16.1716 15.0004 19 15.0004H19.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M4 8.23028V5.46105C4 3.54929 5.567 1.99951 7.5 1.99951C9.433 1.99951 11 3.54929 11 5.46105V9.26874C11 10.2246 10.2165 10.9995 9.25 10.9995C8.2835 10.9995 7.5 10.2246 7.5 9.26874V5.46105", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var FileEmpty02Icon = [
  ["path", { d: "M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var FileQuestionMarkIcon = [
  ["path", { d: "M3.5 14.5C3.5 13.1193 4.6193 12 6 12C7.3807 12 8.5 13.1193 8.5 14.5C8.5 15.3569 8.06886 16.1131 7.41166 16.5636C6.72833 17.0319 6 17.6716 6 18.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M6.125 21.75H6M6.25 21.75C6.25 21.8881 6.13807 22 6 22C5.86193 22 5.75 21.8881 5.75 21.75C5.75 21.6119 5.86193 21.5 6 21.5C6.13807 21.5 6.25 21.6119 6.25 21.75Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M13.5 2.5V3C13.5 5.82843 13.5 7.24264 14.3787 8.12132C15.2574 9 16.6716 9 19.5 9H20M4.50394 7.98123C4.52397 5.69117 4.64575 4.40752 5.38607 3.48933C5.56507 3.26731 5.76731 3.06508 5.98932 2.88607C7.0883 2 8.71081 2 11.9558 2C12.6614 2 13.0141 2 13.3372 2.11401C13.4044 2.13772 13.4702 2.165 13.5345 2.19575C13.8435 2.34355 14.093 2.593 14.5919 3.09188L19.3284 7.82843C19.9065 8.40649 20.1955 8.69552 20.3478 9.06306C20.5 9.4306 20.5 9.83935 20.5 10.6569V14C20.5 17.7712 20.5 19.6569 19.3284 20.8284C18.1568 22 16.2712 22 12.5 22C11.7645 22 11.1007 22 10.5 21.9913", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var FileXIcon = [
  ["path", { d: "M14.4834 13L11.9917 15.4958M11.9917 15.4958L9.49168 18M11.9917 15.4958L14.4917 18M11.9917 15.4958L9.5 13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var Folder01Icon = [
  ["path", { d: "M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }]
];
var Folder02Icon = [
  ["path", { d: "M2 19V7.54902C2 6.10516 2 5.38322 2.24332 4.81647C2.5467 4.10985 3.10985 3.5467 3.81647 3.24332C4.38322 3 5.09805 3 6.54902 3H7.04311C7.64819 3 8.22075 3.27394 8.60041 3.74509L10.4175 6M10.4175 6H16C17.4001 6 18.1002 6 18.635 6.27248C19.1054 6.51217 19.4878 6.89462 19.7275 7.36502C20 7.8998 20 8.59987 20 10V11M10.4175 6H7", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3.15802 15.5144L3.45643 14.7717C4.19029 12.9449 4.55723 12.0316 5.3224 11.5158C6.08757 11 7.07557 11 9.05157 11H17.1119C19.8004 11 21.1446 11 21.7422 11.8787C22.3397 12.7575 21.8405 14.0002 20.842 16.4856L20.5436 17.2283C19.8097 19.0551 19.4428 19.9684 18.6776 20.4842C17.9124 21 16.9244 21 14.9484 21H6.88812C4.19961 21 2.85535 21 2.25782 20.1213C1.66029 19.2425 2.15953 17.9998 3.15802 15.5144Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var FolderAddIcon = [
  ["path", { d: "M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18 13V21M22 17H14", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var FolderGitTwoIcon = [
  ["path", { d: "M8 6.50116H16.75C18.8567 6.50116 19.91 6.50116 20.6667 7.0069C20.9943 7.22584 21.2755 7.50717 21.4944 7.83484C22 8.59173 22 9.64538 22 11.7527C22 12.0122 22 12.2621 21.9997 12.5029M12 6.50116L11.3666 5.23392C10.8418 4.18406 10.3622 3.1273 9.19926 2.69106C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88043C3.05227 3.15161 2.65142 3.55257 2.38032 4.03851C2 4.72021 2 5.62871 2 7.44571V10.5023C2 15.2177 2 17.5754 3.46447 19.0403C4.70529 20.2815 6.58687 20.4711 10 20.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["circle", { cx: "14", cy: "12.5", r: "2", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["circle", { cx: "20", cy: "18.5", r: "2", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M18 18.5C15.7909 18.5 14 16.7091 14 14.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M14 14.5V21.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }]
];
var FolderRemoveIcon = [
  ["path", { d: "M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M22 15L16 21M22 21L16 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var GitBranchIcon = [
  ["path", { d: "M7 19H13C15.8284 19 17.2426 19 18.1213 18.1213C19 17.2426 19 15.8284 19 13V10M19 10C19.7002 10 21.0085 11.9943 21.5 12.5M19 10C18.2998 10 16.9915 11.9943 16.5 12.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M5 7L5 17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["circle", { cx: "5", cy: "5", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["circle", { cx: "19", cy: "5", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "3" }],
  ["circle", { cx: "5", cy: "19", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "4" }]
];
var GitForkIcon = [
  ["path", { d: "M6 8C7.10457 8 8 7.10457 8 6C8 4.89543 7.10457 4 6 4C4.89543 4 4 4.89543 4 6C4 7.10457 4.89543 8 6 8Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8Z", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M6.01734 8.74067C6.01734 10.4142 5.77537 12.1995 9.22051 11.9855H12.0053M17.9929 8.57617C18.1259 11.9855 16.9199 11.7648 15.7861 11.9855H12.0053M12.0053 15.7001V11.9855", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var GitMergeIcon = [
  ["path", { d: "M7 20C8.10457 20 9 19.1046 9 18C9 16.8954 8.10457 16 7 16C5.89543 16 5 16.8954 5 18C5 19.1046 5.89543 20 7 20Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M7 8C8.10457 8 9 7.10457 9 6C9 4.89543 8.10457 4 7 4C5.89543 4 5 4.89543 5 6C5 7.10457 5.89543 8 7 8Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M7.02116 8.2793V15.4073M14.4113 12.0047L10.0193 12.0048C8.92158 12.0048 6.86182 11.1254 7.01818 8.78001", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var GitPullRequestClosedIcon = [
  ["path", { d: "M6 8L6 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18 11L18 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["circle", { cx: "6", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["circle", { cx: "6", cy: "6", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "3" }],
  ["circle", { cx: "18", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M20 4L18 6M18 6L16 8M18 6L20 8M18 6L16 4", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "5" }]
];
var GitPullRequestDraftIcon = [
  ["path", { d: "M6 8L6 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["circle", { cx: "6", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["circle", { cx: "6", cy: "6", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["circle", { cx: "18", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M18.125 11H18M18.25 11C18.25 11.1381 18.1381 11.25 18 11.25C17.8619 11.25 17.75 11.1381 17.75 11C17.75 10.8619 17.8619 10.75 18 10.75C18.1381 10.75 18.25 10.8619 18.25 11Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M18.125 6H18M18.25 6C18.25 6.13807 18.1381 6.25 18 6.25C17.8619 6.25 17.75 6.13807 17.75 6C17.75 5.86193 17.8619 5.75 18 5.75C18.1381 5.75 18.25 5.86193 18.25 6Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "5" }]
];
var GitPullRequestIcon = [
  ["path", { d: "M6 8L6 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M18 16V12C18 9.17156 18 7.75735 17.1213 6.87867C16.2426 5.99999 14.8284 5.99999 12 5.99999L11 5.99999M11 5.99999C11 5.29976 12.9943 3.99152 13.5 3.49999M11 5.99999C11 6.70022 12.9943 8.00846 13.5 8.49999", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["circle", { cx: "6", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["circle", { cx: "6", cy: "6", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "3" }],
  ["circle", { cx: "18", cy: "18", r: "2", stroke: "currentColor", strokeWidth: "1.5", key: "4" }]
];
var GithubIcon = [
  ["path", { d: "M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var GridViewIcon = [
  ["path", { d: "M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var HelpCircleIcon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var InformationCircleIcon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 16V12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12.125 8.25H12M12.25 8.25C12.25 8.11193 12.1381 8 12 8C11.8619 8 11.75 8.11193 11.75 8.25C11.75 8.38807 11.8619 8.5 12 8.5C12.1381 8.5 12.25 8.38807 12.25 8.25Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var InternetIcon = [
  ["circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["ellipse", { cx: "12", cy: "12", rx: "4", ry: "10", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M2 12H22", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var LaptopIcon = [
  ["path", { d: "M20.4999 16.5V8.5C20.4999 6.14298 20.4999 4.96447 19.7676 4.23223C19.0354 3.5 17.8569 3.5 15.4999 3.5H8.49988C6.14286 3.5 4.96434 3.5 4.23211 4.23223C3.49988 4.96447 3.49988 6.14298 3.49988 8.5V16.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M21.9841 20.5H2.01567C1.63273 20.5 1.38367 20.1088 1.55493 19.7764L3.49988 16.5H20.4999L22.4448 19.7764C22.6161 20.1088 22.367 20.5 21.9841 20.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var Layers01Icon = [
  ["path", { d: "M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var LayoutTwoColumnIcon = [
  ["path", { d: "M3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 2.5V21.5", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
var LayoutTwoRowIcon = [
  ["path", { d: "M20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M21.5 12L2.50078 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
var LayoutThreeRowIcon = [
  ["path", { d: "M20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28248 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28248 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M21.5 8.5L2.5 8.5", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M21.5 15.5L2.5 15.5", stroke: "currentColor", strokeWidth: "1.5", key: "2" }]
];
var LinkSquare02Icon = [
  ["path", { d: "M11.0991 3.00012C7.45013 3.00669 5.53932 3.09629 4.31817 4.31764C3.00034 5.63568 3.00034 7.75704 3.00034 11.9997C3.00034 16.2424 3.00034 18.3638 4.31817 19.6818C5.63599 20.9999 7.75701 20.9999 11.9991 20.9999C16.241 20.9999 18.3621 20.9999 19.6799 19.6818C20.901 18.4605 20.9906 16.5493 20.9972 12.8998", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M20.556 3.49612L11.0487 13.0586M20.556 3.49612C20.062 3.00151 16.7343 3.04761 16.0308 3.05762M20.556 3.49612C21.05 3.99074 21.0039 7.32273 20.9939 8.02714", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ListViewIcon = [
  ["path", { d: "M2 11.4C2 10.2417 2.24173 10 3.4 10H20.6C21.7583 10 22 10.2417 22 11.4V12.6C22 13.7583 21.7583 14 20.6 14H3.4C2.24173 14 2 13.7583 2 12.6V11.4Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2 3.4C2 2.24173 2.24173 2 3.4 2H20.6C21.7583 2 22 2.24173 22 3.4V4.6C22 5.75827 21.7583 6 20.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M2 19.4C2 18.2417 2.24173 18 3.4 18H20.6C21.7583 18 22 18.2417 22 19.4V20.6C22 21.7583 21.7583 22 20.6 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }]
];
var Loading03Icon = [
  ["path", { d: "M12 3V6", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 18V21", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M21 12L18 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M6 12L3 12", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M18.3635 5.63672L16.2422 7.75804", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M7.75804 16.2422L5.63672 18.3635", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "5" }],
  ["path", { d: "M18.3635 18.3635L16.2422 16.2422", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "6" }],
  ["path", { d: "M7.75804 7.75804L5.63672 5.63672", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "7" }]
];
var LockIcon = [
  ["path", { d: "M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 13L12 16", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
var Mail02Icon = [
  ["path", { d: "M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var MailOpen01Icon = [
  ["path", { d: "M2 19L8.91302 14.2905C11.4387 12.5698 12.5613 12.5698 15.087 14.2905L22 19", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2.01592 14.551C2.08186 17.5843 2.11484 19.1009 3.24611 20.2241C4.37738 21.3473 5.95183 21.3862 9.10072 21.4641C11.0393 21.512 12.9607 21.512 14.8993 21.4641C18.0482 21.3862 19.6226 21.3473 20.7539 20.2241C21.8852 19.1009 21.9181 17.5843 21.9841 14.551C22.0164 13.0649 21.9995 11.5934 21.9334 10.0921C21.8924 9.15964 21.8719 8.69341 21.6354 8.27984C21.3989 7.86628 20.9913 7.59935 20.176 7.0655L16.4152 4.60286C14.2742 3.20096 13.2038 2.5 12 2.5C10.7962 2.5 9.72577 3.20095 7.58483 4.60286L3.82397 7.0655C3.00869 7.59935 2.60106 7.86628 2.36459 8.27984C2.12812 8.69341 2.1076 9.15965 2.06656 10.0921C2.00049 11.5934 1.98361 13.0649 2.01592 14.551Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M22 9.5L17.7346 12.6072C16.7004 13.3606 15.8504 14 14.5 14M2 9.5L6.26538 12.6072C7.29955 13.3606 8.14961 14 9.5 14", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var Menu02Icon = [
  ["path", { d: "M4 5L16 5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M4 12L20 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M4 19L12 19", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var MessageAdd02Icon = [
  ["path", { d: "M13 3.02144C12.6777 3.00721 12.3445 2.99998 12 2.99998C4.13281 2.99998 2 7.02942 2 12C2 14.0712 2.37034 15.979 3.37161 17.5C4.63281 19.5 3.99253 21.3333 3 22C4.61547 22 5.70211 21.4858 6.39239 20.9766C6.88252 20.615 7.50688 20.4364 8.0984 20.5814C9.20689 20.8533 10.4991 21 12 21C19.1328 21 22 16.9705 22 12C22 11.3126 21.9643 10.6432 21.8812 9.99998", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.1248 12H11.9998M16.125 12H16M8.125 12H8M12.2498 12C12.2498 12.1381 12.1379 12.25 11.9998 12.25C11.8618 12.25 11.7498 12.1381 11.7498 12C11.7498 11.8619 11.8618 11.75 11.9998 11.75C12.1379 11.75 12.2498 11.8619 12.2498 12ZM16.25 12C16.25 12.1381 16.1381 12.25 16 12.25C15.8619 12.25 15.75 12.1381 15.75 12C15.75 11.8619 15.8619 11.75 16 11.75C16.1381 11.75 16.25 11.8619 16.25 12ZM8.25 12C8.25 12.1381 8.13807 12.25 8 12.25C7.86193 12.25 7.75 12.1381 7.75 12C7.75 11.8619 7.86193 11.75 8 11.75C8.13807 11.75 8.25 11.8619 8.25 12Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M16 4.99998H22M19 1.99998L19 7.99998", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var MessageQuestionIcon = [
  ["path", { d: "M12 20.5C19.1328 20.5 22 16.4706 22 11.5C22 6.52944 20.1328 2.5 12 2.5C4.13281 2.5 2 6.52944 2 11.5C2 13.5712 2.37034 15.4791 3.37161 17C4.63281 19 3.99253 20.8333 3 21.5C4.61547 21.5 5.70211 20.9858 6.39239 20.4766C6.88252 20.115 7.50688 19.9364 8.0984 20.0815C9.20689 20.3533 10.4991 20.5 12 20.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.57777 13.755 10.0983 13.3632 10.4634C12.7572 11.0282 12 11.6716 12 12.5M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var Mic02Icon = [
  ["path", { d: "M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
var MoreHorizontalIcon = [
  ["path", { d: "M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var PackageReceiveIcon = [
  ["path", { d: "M12 22C11.1818 22 10.4002 21.6754 8.83693 21.0262C4.94564 19.4101 3 18.6021 3 17.2429V7.74463M12 22C12.8182 22 13.5998 21.6754 15.1631 21.0262C19.0544 19.4101 21 18.6021 21 17.2429V7.74463M12 22V12.1687M3 7.74463C3 8.3485 3.80157 8.72983 5.40472 9.49248L8.32592 10.8822C10.1288 11.7399 11.0303 12.1687 12 12.1687M3 7.74463C3 7.14076 3.80157 6.75944 5.40472 5.99678L7.5 5M21 7.74463C21 8.3485 20.1984 8.72983 18.5953 9.49248L15.6741 10.8822C13.8712 11.7399 12.9697 12.1687 12 12.1687M21 7.74463C21 7.14076 20.1984 6.75944 18.5953 5.99678L16.5 5M6 13.1518L8 14.135", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.0037 2L12.0037 8.99995M12.0037 8.99995C12.2668 9.00351 12.5263 8.81972 12.7178 8.59534L14 7.06174M12.0037 8.99995C11.7499 8.99652 11.4929 8.81368 11.2897 8.59534L10 7.06174", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }]
];
var PauseIcon = [
  ["path", { d: "M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }]
];
var PinOffIcon = [
  ["path", { d: "M7.5 8C6.95863 8.1281 6.49932 8.14239 5.99268 8.45891C5.07234 9.03388 4.85108 9.71674 5.08821 10.7612C5.94028 14.5139 9.48599 18.0596 13.2388 18.9117C14.2834 19.1489 14.9661 18.928 15.5416 18.0077C15.8411 17.5288 15.8716 17.0081 16 16.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 7.79915C12.1776 7.77794 12.3182 7.74034 12.4295 7.68235C13.3997 7.17686 13.9291 5.53361 14.4498 4.60009C14.9311 3.73715 15.1718 3.30567 15.7379 3.10227C16.3041 2.89888 16.6448 3.02205 17.3262 3.26839C18.9197 3.8445 20.1555 5.08032 20.7316 6.6738C20.9779 7.35521 21.1011 7.69591 20.8977 8.26204C20.6943 8.82817 20.2628 9.06884 19.3999 9.55018C18.4608 10.074 16.7954 10.6108 16.2905 11.5898C16.2345 11.6983 16.1978 11.8327 16.1769 12", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 21L8 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M3 3L21 21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var PinIcon = [
  ["path", { d: "M3 21L8 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var PlayIcon = [
  ["path", { d: "M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var PlusMinusSquare01Icon = [
  ["path", { d: "M12 7.5V13.8636M15.5 10.6818H8.5M15.5 16.5H8.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var PlusSignIcon = [
  ["path", { d: "M12 4V20M20 12H4", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var PuzzleIcon = [
  ["path", { d: "M12.828 6.00096C12.9388 5.68791 12.999 5.35099 12.999 5C12.999 3.34315 11.6559 2 9.99904 2C8.34219 2 6.99904 3.34315 6.99904 5C6.99904 5.35099 7.05932 5.68791 7.17008 6.00096C4.88532 6.0093 3.66601 6.09039 2.87772 6.87868C2.08951 7.66689 2.00836 8.88603 2 11.1704C2.31251 11.06 2.64876 11 2.99904 11C4.6559 11 5.99904 12.3431 5.99904 14C5.99904 15.6569 4.6559 17 2.99904 17C2.64876 17 2.31251 16.94 2 16.8296C2.00836 19.114 2.08951 20.3331 2.87772 21.1213C3.66593 21.9095 4.88508 21.9907 7.16941 21.999C7.05908 21.6865 6.99904 21.3503 6.99904 21C6.99904 19.3431 8.34219 18 9.99904 18C11.6559 18 12.999 19.3431 12.999 21C12.999 21.3503 12.939 21.6865 12.8287 21.999C15.113 21.9907 16.3322 21.9095 17.1204 21.1213C17.9086 20.333 17.9897 19.1137 17.9981 16.829C18.3111 16.9397 18.648 17 18.999 17C20.6559 17 21.999 15.6569 21.999 14C21.999 12.3431 20.6559 11 18.999 11C18.648 11 18.3111 11.0603 17.9981 11.171C17.9897 8.88627 17.9086 7.66697 17.1204 6.87868C16.3321 6.09039 15.1128 6.0093 12.828 6.00096Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var Refresh01Icon = [
  ["path", { d: "M20.4879 15C19.2524 18.4956 15.9187 21 12 21C7.02943 21 3 16.9706 3 12C3 7.02943 7.02943 3 12 3C15.7292 3 18.9286 5.26806 20.2941 8.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M15 9H18C19.4142 9 20.1213 9 20.5607 8.56066C21 8.12132 21 7.41421 21 6V3", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var RepeatIcon = [
  ["path", { d: "M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var Search01Icon = [
  ["path", { d: "M17 17L21 21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var SentIcon = [
  ["path", { d: "M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.4999 12.5L14.9999 9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var Settings01Icon = [
  ["path", { d: "M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }]
];
var SidebarBottomIcon = [
  ["path", { d: "M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91555C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91555C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M2 14.5L22 14.5", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M6 18H7M10 18H11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var SidebarLeftIcon = [
  ["path", { d: "M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M9.5 3L9.5 21", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M5 7H6M5 10H6", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var SidebarRightIcon = [
  ["path", { d: "M2 12C2 8.3109 2 6.46633 2.81382 5.1588C3.1149 4.67505 3.48891 4.2543 3.91891 3.91557C5.08116 3.00003 6.72077 3.00003 10 3.00003H14C17.2792 3.00003 18.9188 3.00003 20.0811 3.91557C20.5111 4.2543 20.8851 4.67505 21.1862 5.1588C22 6.46633 22 8.3109 22 12C22 15.6892 22 17.5337 21.1862 18.8413C20.8851 19.325 20.5111 19.7458 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7458 3.1149 19.325 2.81382 18.8413C2 17.5337 2 15.6892 2 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14.5 3.00003L14.5 21", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M18 7.00006H19M18 10.0001H19", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var SlidersHorizontalIcon = [
  ["path", { d: "M3.99963 5.00055L9.99963 5.00031", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.9996 5.00031L19.9996 5.00031", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M15.9996 9.00031L15.9996 15.0003", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M9.99963 2.00031L9.99963 8.00031", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M11.9996 16.0003L11.9996 22.0003", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "4" }],
  ["path", { d: "M15.9996 12.0001L19.9996 12.0003", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "5" }],
  ["path", { d: "M3.99963 12.0005L12.9996 12.0003", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "6" }],
  ["path", { d: "M11.9996 19.0003L19.9996 19.0003", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "7" }],
  ["path", { d: "M3.99963 19.0005L8.99963 19.0003", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "8" }]
];
var SmartPhone01Icon = [
  ["path", { d: "M13.5 2H10.5C8.14298 2 6.96447 2 6.23223 2.73223C5.5 3.46447 5.5 4.64298 5.5 7V17C5.5 19.357 5.5 20.5355 6.23223 21.2678C6.96447 22 8.14298 22 10.5 22H13.5C15.857 22 17.0355 22 17.7678 21.2678C18.5 20.5355 18.5 19.357 18.5 17V7C18.5 4.64298 18.5 3.46447 17.7678 2.73223C17.0355 2 15.857 2 13.5 2Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12.125 19H12M12.25 19C12.25 19.1381 12.1381 19.25 12 19.25C11.8619 19.25 11.75 19.1381 11.75 19C11.75 18.8619 11.8619 18.75 12 18.75C12.1381 18.75 12.25 18.8619 12.25 19Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var Sorting01Icon = [
  ["path", { d: "M11.0001 8L19.0001 8.00006", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M11.0001 12H16.0001", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M11.0001 16H14.0001", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M11.0001 4H21.0001", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M5.5 21V3M5.5 21C4.79977 21 3.49153 19.0057 3 18.5M5.5 21C6.20023 21 7.50847 19.0057 8 18.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }]
];
var SourceCodeIcon = [
  ["path", { d: "M17 8L18.8398 9.85008C19.6133 10.6279 20 11.0168 20 11.5C20 11.9832 19.6133 12.3721 18.8398 13.1499L17 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M7 8L5.16019 9.85008C4.38673 10.6279 4 11.0168 4 11.5C4 11.9832 4.38673 12.3721 5.16019 13.1499L7 15", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14.5 4L9.5 20", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var SquareIcon = [
  ["path", { d: "M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }]
];
var StarIcon = [
  ["path", { d: "M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var Target02Icon = [
  ["path", { d: "M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12.0303 11.9625L16.5832 7.4096M19.7404 4.34462L19.1872 2.35748C19.0853 2.03011 18.6914 1.89965 18.4259 2.11662C16.9898 3.29018 15.4254 4.87091 16.703 7.36419C19.2771 8.56455 20.7466 6.94584 21.8733 5.5853C22.0975 5.3146 21.9623 4.90767 21.6247 4.81005L19.7404 4.34462Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var TestTube01Icon = [
  ["path", { d: "M8 2H16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16.2187 13.0044L15.9921 13.6151C15.5219 14.65 14.1115 15.7439 11.7609 14.3182C10.2471 13.4001 8.93663 12.6631 7.9997 13.16L7.21891 13.5412", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M14.5323 2V8.56602C14.5323 9.27829 14.5323 9.63442 14.6304 9.97222C14.7285 10.31 14.9197 10.612 15.3021 11.216L17.2861 14.35C19.4275 17.7326 20.4982 19.4238 19.7751 20.7119C19.0519 22 17.0317 22 12.9914 22H11.0086C6.96825 22 4.94807 22 4.22495 20.7119C3.50182 19.4238 4.57251 17.7326 6.71389 14.35L8.69792 11.216C9.08029 10.612 9.27148 10.31 9.36961 9.97222C9.46773 9.63442 9.46773 9.27829 9.46773 8.56602V2", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M15.125 19H15M15.25 19C15.25 19.1381 15.1381 19.25 15 19.25C14.8619 19.25 14.75 19.1381 14.75 19C14.75 18.8619 14.8619 18.75 15 18.75C15.1381 18.75 15.25 18.8619 15.25 19Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M10.125 17H10M10.25 17C10.25 17.1381 10.1381 17.25 10 17.25C9.86193 17.25 9.75 17.1381 9.75 17C9.75 16.8619 9.86193 16.75 10 16.75C10.1381 16.75 10.25 16.8619 10.25 17Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }]
];
var TextWrapIcon = [
  ["path", { d: "M3 3H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 15H9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 21H9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M3 9H16.5C18.9853 9 21 11.0147 21 13.5C21 15.9853 18.9853 18 16.5 18H12M12 18C12 17.1597 14.3932 15.5898 15 15M12 18C12 18.8403 14.3932 20.4102 15 21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }]
];
var Tick02Icon = [
  ["path", { d: "M5 14L8.5 17.5L19 6.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var TimeScheduleIcon = [
  ["path", { d: "M12 8V12L13.5 13.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19.5454 16.4534C21.1818 17.337 22 17.7789 22 18.5C22 19.2211 21.1818 19.663 19.5454 20.5466L18.4311 21.1484C17.1744 21.827 16.5461 22.1663 16.2439 21.9196C15.504 21.3154 16.6567 19.7561 16.9403 19.2037C17.2277 18.644 17.2225 18.3459 16.9403 17.7963C16.6567 17.2439 15.504 15.6846 16.2439 15.0804C16.5461 14.8337 17.1744 15.173 18.4311 15.8516L19.5454 16.4534Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M13.0261 21.948C12.6888 21.9824 12.3464 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6849 21.9311 13.3538 21.8 14", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "2" }]
];
var ToolboxIcon = [
  ["path", { d: "M3 15V14H21V15C21 17.8284 21 19.2426 20.1213 20.1213C19.2426 21 17.8284 21 15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M3 14L3.00001 12.9999C3.00003 11.5278 3.00004 10.7918 3.31675 10.1584C3.63347 9.52493 4.22231 9.08329 5.39999 8.20002C6.19297 7.60528 6.58946 7.30791 7.05132 7.15395C7.51317 7 8.00879 7 9.00002 7H15C15.9912 7 16.4868 7 16.9487 7.15395C17.4105 7.3079 17.807 7.60527 18.6 8.2C19.7777 9.08328 20.3666 9.52492 20.6833 10.1584C21 10.7918 21 11.5279 21 13V14H3Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M16 12V16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M8 12V16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M8.49997 7.00006V6.50006C8.49997 5.0956 8.49997 4.39337 8.83703 3.88892C8.98295 3.67054 9.17045 3.48304 9.38883 3.33712C9.89328 3.00006 10.5955 3.00006 12 3.00006C13.4044 3.00006 14.1067 3.00006 14.6111 3.33712C14.8295 3.48304 15.017 3.67054 15.1629 3.88892C15.5 4.39337 15.5 5.0956 15.5 6.50006V7.00006", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }]
];
var Unarchive03Icon = [
  ["path", { d: "M21 7H3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V7Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M21 7H3L4.2 5.4C5.08328 4.22229 5.52492 3.63344 6.15836 3.31672C6.7918 3 7.52786 3 9 3H15C16.4721 3 17.2082 3 17.8416 3.31672C18.4751 3.63344 18.9167 4.22229 19.8 5.4L21 7Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M12 11L12 17.5M9 13.5C9.58984 12.8932 11.1597 10.5 12 10.5C12.8403 10.5 14.4102 12.8932 15 13.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var UserAdd01Icon = [
  ["path", { d: "M15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13C12.7614 13 15 10.7614 15 8Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M17.5 21L17.5 14M14 17.5H21", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M3 20C3 16.134 6.13401 13 10 13C11.4872 13 12.8662 13.4638 14 14.2547", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var UserIcon = [
  ["path", { d: "M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }]
];
var ViewOffIcon = [
  ["path", { d: "M22 8C22 8 18 14 12 14C6 14 2 8 2 8", stroke: "currentColor", strokeLinecap: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M15 13.5L16.5 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M20 11L22 13", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M2 13L4 11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "3" }],
  ["path", { d: "M9 13.5L7.5 16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "4" }]
];
var ViewIcon = [
  ["path", { d: "M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z", stroke: "currentColor", strokeWidth: "1.5", key: "1" }]
];
var WorkflowCircle03Icon = [
  ["path", { d: "M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z", stroke: "currentColor", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M12 8V9M12 9C12 9.93188 12 10.3978 12.1776 10.7654C12.4144 11.2554 12.8687 11.6448 13.4404 11.8478C13.8692 12 14.4128 12 15.5 12C16.5872 12 17.1308 12 17.5596 12.1522C18.1313 12.3552 18.5856 12.7446 18.8224 13.2346C19 13.6022 19 14.0681 19 15V16M12 9C12 9.93188 12 10.3978 11.8224 10.7654C11.5856 11.2554 11.1313 11.6448 10.5596 11.8478C10.1308 12 9.5872 12 8.5 12C7.4128 12 6.8692 12 6.44041 12.1522C5.86867 12.3552 5.41443 12.7446 5.17761 13.2346C5 13.6022 5 14.0681 5 15V16", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M8 19C8 20.6569 6.65685 22 5 22C3.34315 22 2 20.6569 2 19C2 17.3431 3.34315 16 5 16C6.65685 16 8 17.3431 8 19Z", stroke: "currentColor", strokeWidth: "1.5", key: "2" }],
  ["path", { d: "M22 19C22 20.6569 20.6569 22 19 22C17.3431 22 16 20.6569 16 19C16 17.3431 17.3431 16 19 16C20.6569 16 22 17.3431 22 19Z", stroke: "currentColor", strokeWidth: "1.5", key: "3" }]
];
var ZapIcon = [
  ["path", { d: "M8.62814 12.6736H8.16918C6.68545 12.6736 5.94358 12.6736 5.62736 12.1844C5.31114 11.6953 5.61244 11.0138 6.21504 9.65083L8.02668 5.55323C8.57457 4.314 8.84852 3.69438 9.37997 3.34719C9.91142 3 10.5859 3 11.935 3H14.0244C15.6632 3 16.4826 3 16.7916 3.53535C17.1007 4.0707 16.6942 4.78588 15.8811 6.21623L14.8092 8.10188C14.405 8.81295 14.2029 9.16849 14.2057 9.45952C14.2094 9.83775 14.4105 10.1862 14.7354 10.377C14.9854 10.5239 15.3927 10.5239 16.2074 10.5239C17.2373 10.5239 17.7523 10.5239 18.0205 10.7022C18.3689 10.9338 18.5513 11.3482 18.4874 11.7632C18.4382 12.0826 18.0918 12.4656 17.399 13.2317L11.8639 19.3523C10.7767 20.5545 10.2331 21.1556 9.86807 20.9654C9.50303 20.7751 9.67833 19.9822 10.0289 18.3962L10.7157 15.2896C10.9826 14.082 11.1161 13.4782 10.7951 13.0759C10.4741 12.6736 9.85877 12.6736 8.62814 12.6736Z", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }]
];
var ZoomInAreaIcon = [
  ["path", { d: "M18.5016 19.1217L21 21.6217M20 15.1217C20 12.0842 17.5376 9.62173 14.5 9.62173C11.4624 9.62173 9 12.0842 9 15.1217C9 18.1593 11.4624 20.6217 14.5 20.6217C17.5376 20.6217 20 18.1593 20 15.1217Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M14.5 13.1217V17.1217M16.5 15.1217H12.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M10 3.62173H14M3 10.6217V14.6217M6.5 21.6217C4.567 21.6217 3 20.0547 3 18.1217M17.5 3.62173C19.433 3.62173 21 5.18873 21 7.12173M3 7.12173C3 5.18873 4.567 3.62173 6.5 3.62173", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];
var ZoomOutAreaIcon = [
  ["path", { d: "M18.5016 18.5L21 21M20 14.5C20 11.4624 17.5376 9 14.5 9C11.4624 9 9 11.4624 9 14.5C9 17.5376 11.4624 20 14.5 20C17.5376 20 20 17.5376 20 14.5Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "0" }],
  ["path", { d: "M16.5 14.5H12.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "1" }],
  ["path", { d: "M10 3H14M3 10V14M6.5 21C4.567 21 3 19.433 3 17.5M17.5 3C19.433 3 21 4.567 21 6.5M3 6.5C3 4.567 4.567 3 6.5 3", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5", key: "2" }]
];

// components/ui/icon.tsx
var PaletteStrokeRoundedIcon = [
  [
    "path",
    {
      d: "M21.8205 10.4127C22.062 11.8519 22.1827 12.5715 21.2423 13.9326C21.1459 14.0722 20.8966 14.3713 20.777 14.4911C19.6103 15.6586 18.4308 15.6586 16.0716 15.6586H14.1392C13.5085 15.6586 13.1931 15.6586 12.9639 15.7142C11.9586 15.9581 11.3031 16.9391 11.453 17.9755C11.4872 18.2118 11.6043 18.5085 11.8386 19.102C11.9345 19.3449 11.9824 19.4664 12.0136 19.7304C12.1292 20.7084 11.0869 21.9508 10.1158 21.9926C9.85358 22.0039 9.83681 22.0002 9.80326 21.9926C7.66174 21.51 5.66204 20.3123 4.18389 18.4421C0.736789 14.0808 1.43146 7.71364 5.73548 4.22064C10.0395 0.727643 16.323 1.43156 19.7701 5.79289C20.868 7.1819 21.5457 8.77438 21.8205 10.4127Z",
      fill: "none",
      fillRule: "evenodd",
      clipRule: "evenodd",
      stroke: "currentColor",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      key: "0"
    }
  ],
  [
    "path",
    {
      d: "M7.36719 7.74976H7.24219M7.49219 7.74976C7.49219 7.88783 7.38026 7.99976 7.24219 7.99976C7.10412 7.99976 6.99219 7.88783 6.99219 7.74976C6.99219 7.61169 7.10412 7.49976 7.24219 7.49976C7.38026 7.49976 7.49219 7.61169 7.49219 7.74976Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      key: "1"
    }
  ],
  [
    "path",
    {
      d: "M7.36719 15.7498H7.24219M7.49219 15.7498C7.49219 15.8878 7.38026 15.9998 7.24219 15.9998C7.10412 15.9998 6.99219 15.8878 6.99219 15.7498C6.99219 15.6117 7.10412 15.4998 7.24219 15.4998C7.38026 15.4998 7.49219 15.6117 7.49219 15.7498Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      key: "2"
    }
  ],
  [
    "path",
    {
      d: "M11.8672 5.74976H11.7422M11.9922 5.74976C11.9922 5.88783 11.8803 5.99976 11.7422 5.99976C11.6041 5.99976 11.4922 5.88783 11.4922 5.74976C11.4922 5.61169 11.6041 5.49976 11.7422 5.49976C11.8803 5.49976 11.9922 5.61169 11.9922 5.74976Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      key: "3"
    }
  ],
  [
    "path",
    {
      d: "M16.3672 7.74976H16.2422M16.4922 7.74976C16.4922 7.88783 16.3803 7.99976 16.2422 7.99976C16.1041 7.99976 15.9922 7.88783 15.9922 7.74976C15.9922 7.61169 16.1041 7.49976 16.2422 7.49976C16.3803 7.49976 16.4922 7.61169 16.4922 7.74976Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      key: "4"
    }
  ],
  [
    "path",
    {
      d: "M18.3672 11.7498H18.2422M18.4922 11.7498C18.4922 11.8878 18.3803 11.9998 18.2422 11.9998C18.1041 11.9998 17.9922 11.8878 17.9922 11.7498C17.9922 11.6117 18.1041 11.4998 18.2422 11.4998C18.3803 11.4998 18.4922 11.6117 18.4922 11.7498Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      key: "5"
    }
  ],
  [
    "path",
    {
      d: "M5.86719 11.7498H5.74219M5.99219 11.7498C5.99219 11.8878 5.88026 11.9998 5.74219 11.9998C5.60412 11.9998 5.49219 11.8878 5.49219 11.7498C5.49219 11.6117 5.60412 11.4998 5.74219 11.4998C5.88026 11.4998 5.99219 11.6117 5.99219 11.7498Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      key: "6"
    }
  ]
];
var SectionAddStrokeRoundedIcon = [
  [
    "path",
    {
      d: "M2 3.4C2 2.24173 2.24173 2 3.4 2H20.6C21.7583 2 22 2.24173 22 3.4V4.6C22 5.75827 21.7583 6 20.6 6H3.4C2.24173 6 2 5.75827 2 4.6V3.4Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "0"
    }
  ],
  [
    "path",
    {
      d: "M2 11.4C2 10.2417 2.24173 10 3.4 10H10.6C11.7583 10 12 10.2417 12 11.4V12.6C12 13.7583 11.7583 14 10.6 14H3.4C2.24173 14 2 13.7583 2 12.6V11.4Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "1"
    }
  ],
  [
    "path",
    {
      d: "M2 19.4C2 18.2417 2.24173 18 3.4 18H10.6C11.7583 18 12 18.2417 12 19.4V20.6C12 21.7583 11.7583 22 10.6 22H3.4C2.24173 22 2 21.7583 2 20.6V19.4Z",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "2"
    }
  ],
  [
    "path",
    {
      d: "M18 13V21M22 17H14",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: "1.5",
      key: "3"
    }
  ]
];
var ICON_MAP = {
  AiContentGenerator01: AiContentGenerator01Icon,
  AlertCircle: AlertCircleIcon,
  AlertTriangle: Alert02Icon,
  AlignLeft: Menu02Icon,
  AppWindow: BrowserIcon,
  Archive: Archive03Icon,
  ArchiveRestore: Unarchive03Icon,
  ArrowDown: ArrowDown02Icon,
  ArrowRight: ArrowRight02Icon,
  ArrowReloadHorizontal: ArrowReloadHorizontalIcon,
  ArrowUp: ArrowUp02Icon,
  ArrowUpDown: ArrowUpDownIcon,
  ArrowTurnBackward: ArrowTurnBackwardIcon,
  ArrowTurnForward: ArrowTurnForwardIcon,
  ArrowUpRight: ArrowUpRight01Icon,
  AudioLines: AudioWave01Icon,
  Beaker: TestTube01Icon,
  BubbleChatQuestion: BubbleChatQuestionIcon,
  Browser: BrowserIcon,
  Brain: BrainIcon,
  Bug: Bug01Icon,
  Calendar: Calendar03Icon,
  CalendarCheckOut02: CalendarCheckOut02Icon,
  CalendarSync: CalendarSyncIcon,
  ChatFeedback: ChatFeedback01Icon,
  ChartColumn: ChartColumnIcon,
  Check: Tick02Icon,
  ChevronDown: ArrowDown01Icon,
  ChevronLeft: ArrowLeft01Icon,
  ChevronRight: ArrowRight01Icon,
  ChevronUp: ArrowUp01Icon,
  ChevronsDown: ArrowDownDoubleIcon,
  ChevronsUp: ArrowUpDoubleIcon,
  Circle: CircleIcon,
  CircleArrowShrink: CircleArrowShrink01Icon,
  CircleCheck: CheckmarkCircle02Icon,
  CircleDashed: DashedLineCircleIcon,
  CircleQuestion: HelpCircleIcon,
  CircleX: CancelCircleIcon,
  Clock: Clock01Icon,
  Code: SourceCodeIcon,
  ComputerTerminal01: ComputerTerminal01Icon,
  Columns2: LayoutTwoColumnIcon,
  Container: CloudIcon,
  Copy: Copy01Icon,
  CornerDownLeft: ArrowMoveDownLeftIcon,
  CornerDownRight: ArrowMoveDownRightIcon,
  Discord: DiscordIcon,
  DateTime: DateTimeIcon,
  Github: GithubIcon,
  DragDropHorizontal: DragDropHorizontalIcon,
  DragDropVertical: DragDropVerticalIcon,
  Download: Download01Icon,
  Edit: Edit02Icon,
  EditFile: Edit04Icon,
  ElectricPlugs: ElectricPlugsIcon,
  Eye: ViewIcon,
  EyeOff: ViewOffIcon,
  Explore: Book02Icon,
  ExternalLink: LinkSquare02Icon,
  FileDiff: PlusMinusSquare01Icon,
  File: FileEmpty02Icon,
  FileAttachment: FileAttachmentIcon,
  FileQuestion: FileQuestionMarkIcon,
  FileText: File01Icon,
  FileX2: FileXIcon,
  Folder: Folder01Icon,
  FolderGit: FolderGitTwoIcon,
  FolderOpen: Folder02Icon,
  FolderMinus: FolderRemoveIcon,
  FolderPlus: FolderAddIcon,
  Fork: GitForkIcon,
  GitBranch: GitBranchIcon,
  GitMerge: GitMergeIcon,
  GitPullRequest: GitPullRequestIcon,
  GitPullRequestArrow: GitPullRequestIcon,
  GitPullRequestClosed: GitPullRequestClosedIcon,
  GitPullRequestDraft: GitPullRequestDraftIcon,
  Globe: InternetIcon,
  GridView: GridViewIcon,
  Info: InformationCircleIcon,
  Laptop: LaptopIcon,
  Layers: Layers01Icon,
  ListView: ListViewIcon,
  SectionAdd: SectionAddStrokeRoundedIcon,
  ListTodo: CheckListIcon,
  Loading: Loading03Icon,
  Lock: LockIcon,
  Mail: Mail02Icon,
  MailOpen: MailOpen01Icon,
  Maximize2: ExpandIcon,
  MessageQuestion: MessageQuestionIcon,
  MessageCirclePlus: BubbleChatAddIcon,
  MessageSquarePlus: BubbleChatAddIcon,
  MessageSquare: BubbleChatIcon,
  Mic: Mic02Icon,
  Minimize2: CollapseIcon,
  MoreHorizontal: MoreHorizontalIcon,
  NewTab: DashedLine02Icon,
  PackageReceive: PackageReceiveIcon,
  Palette: PaletteStrokeRoundedIcon,
  PanelBottom: SidebarBottomIcon,
  PanelLeft: SidebarLeftIcon,
  PanelRight: SidebarRightIcon,
  Paperclip: AttachmentIcon,
  Pause: PauseIcon,
  Pin: PinIcon,
  PinOff: PinOffIcon,
  Play: PlayIcon,
  Plus: PlusSignIcon,
  Puzzle: PuzzleIcon,
  Repeat: RepeatIcon,
  RotateCcw: Refresh01Icon,
  Rows2: LayoutTwoRowIcon,
  Rows3: LayoutThreeRowIcon,
  Search: Search01Icon,
  Sent: SentIcon,
  Settings: Settings01Icon,
  SideChat: MessageAdd02Icon,
  ClosePluginPane: Cancel01Icon,
  CloseThreadPane: Cancel01Icon,
  SlidersHorizontal: SlidersHorizontalIcon,
  Smartphone: SmartPhone01Icon,
  Sort: Sorting01Icon,
  Spinner: DashedLineCircleIcon,
  Square: SquareIcon,
  Star: StarIcon,
  Target: Target02Icon,
  Terminal: ComputerTerminal01Icon,
  TextWrap: TextWrapIcon,
  TimeSchedule: TimeScheduleIcon,
  Toolbox: ToolboxIcon,
  Trash2: Delete02Icon,
  UserRound: UserIcon,
  UserRoundPlus: UserAdd01Icon,
  Workflow: WorkflowCircle03Icon,
  X: Cancel01Icon,
  Zap: ZapIcon,
  ZoomIn: ZoomInAreaIcon,
  ZoomOut: ZoomOutAreaIcon
};
var ICON_NAMES = Object.keys(ICON_MAP);
function Icon({
  name,
  className,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel
}) {
  return /* @__PURE__ */ jsx(
    HugeiconsIcon,
    {
      icon: ICON_MAP[name],
      className: cn(className),
      "aria-hidden": ariaHidden,
      "aria-label": ariaLabel,
      "data-icon": name
    }
  );
}

// components/ui/context-menu.tsx
var CONTEXT_MENU_LAYER_CLASS = "z-[70]";
var ContextMenu2 = Root;
var ContextMenuTrigger2 = Trigger;
var ContextMenuSub2 = Sub;
var ContextMenuSubTrigger2 = forwardRef(
  ({
    className,
    inset,
    children,
    onPointerEnter: callerPointerEnter,
    onKeyDown: callerKeyDown,
    ...props
  }, ref) => {
    const { hoverProps } = useMenuItemHover({
      onPointerEnter: callerPointerEnter,
      onKeyDown: callerKeyDown
    });
    return /* @__PURE__ */ jsxs(
      SubTrigger,
      {
        ref,
        className: cn(
          "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-[0.3125rem] text-xs outline-none focus:bg-state-hover focus:text-foreground data-[state=open]:bg-state-active data-[state=open]:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          LIST_HOVER_TRANSITION,
          MENU_ITEM_LAST_HOVERED_CLASS,
          inset && "pl-8",
          className
        ),
        ...props,
        ...hoverProps,
        children: [
          children,
          /* @__PURE__ */ jsx(Icon, { name: "ChevronRight", className: "ml-auto" })
        ]
      }
    );
  }
);
ContextMenuSubTrigger2.displayName = SubTrigger.displayName;
var ContextMenuSubContent2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SubContent,
  {
    ref,
    ...usePortalScopeProps(),
    className: cn(
      CONTEXT_MENU_LAYER_CLASS,
      "min-w-28 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
ContextMenuSubContent2.displayName = SubContent.displayName;
var ContextMenuContent2 = forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(Portal, { children: /* @__PURE__ */ jsx(
  Content,
  {
    ref,
    ...usePortalScopeProps(),
    className: cn(
      CONTEXT_MENU_LAYER_CLASS,
      "min-w-28 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(MenuHoverProvider, { children })
  }
) }));
ContextMenuContent2.displayName = Content.displayName;
var ContextMenuItem2 = forwardRef(
  ({
    className,
    inset,
    onPointerEnter: callerPointerEnter,
    onKeyDown: callerKeyDown,
    ...props
  }, ref) => {
    const { hoverProps } = useMenuItemHover({
      onPointerEnter: callerPointerEnter,
      onKeyDown: callerKeyDown
    });
    return /* @__PURE__ */ jsx(
      Item,
      {
        ref,
        className: cn(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-[0.3125rem] text-xs outline-none focus:bg-state-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
          LIST_HOVER_TRANSITION,
          MENU_ITEM_LAST_HOVERED_CLASS,
          inset && "pl-8",
          className
        ),
        ...props,
        ...hoverProps
      }
    );
  }
);
ContextMenuItem2.displayName = Item.displayName;
var ContextMenuCheckboxItem2 = forwardRef(
  ({
    className,
    children,
    checked,
    onPointerEnter: callerPointerEnter,
    onKeyDown: callerKeyDown,
    ...props
  }, ref) => {
    const { hoverProps } = useMenuItemHover({
      onPointerEnter: callerPointerEnter,
      onKeyDown: callerKeyDown
    });
    return /* @__PURE__ */ jsxs(
      CheckboxItem,
      {
        ref,
        className: cn(
          "relative flex cursor-default select-none items-center rounded-sm py-[0.3125rem] pl-2 pr-8 text-xs outline-none focus:bg-state-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          LIST_HOVER_TRANSITION,
          MENU_ITEM_LAST_HOVERED_CLASS,
          className
        ),
        checked,
        ...props,
        ...hoverProps,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "absolute right-2 flex items-center justify-center",
                COARSE_POINTER_CHECK_SLOT_CLASS
              ),
              children: /* @__PURE__ */ jsx(ItemIndicator, { children: /* @__PURE__ */ jsx(Icon, { name: "Check", className: COARSE_POINTER_CHECK_SLOT_CLASS }) })
            }
          ),
          children
        ]
      }
    );
  }
);
ContextMenuCheckboxItem2.displayName = CheckboxItem.displayName;
var ContextMenuRadioItem2 = forwardRef(
  ({
    className,
    children,
    onPointerEnter: callerPointerEnter,
    onKeyDown: callerKeyDown,
    ...props
  }, ref) => {
    const { hoverProps } = useMenuItemHover({
      onPointerEnter: callerPointerEnter,
      onKeyDown: callerKeyDown
    });
    return /* @__PURE__ */ jsxs(
      RadioItem,
      {
        ref,
        className: cn(
          "relative flex cursor-default select-none items-center rounded-sm py-[0.3125rem] pl-8 pr-2 text-xs outline-none focus:bg-state-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          LIST_HOVER_TRANSITION,
          MENU_ITEM_LAST_HOVERED_CLASS,
          className
        ),
        ...props,
        ...hoverProps,
        children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(ItemIndicator, { children: /* @__PURE__ */ jsx(Icon, { name: "Circle", className: "h-2 w-2 fill-current" }) }) }),
          children
        ]
      }
    );
  }
);
ContextMenuRadioItem2.displayName = RadioItem.displayName;
var ContextMenuLabel2 = forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  Label,
  {
    ref,
    className: cn(
      "px-2 py-[0.3125rem] text-xs font-medium text-muted-foreground",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
ContextMenuLabel2.displayName = Label.displayName;
var ContextMenuSeparator2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
ContextMenuSeparator2.displayName = Separator.displayName;
function ContextMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut";

// src/atlas.ts
var SPRITE_STATES = [
  "idle",
  "walk",
  "think",
  "waiting",
  "celebrate",
  "sad",
  "sleep",
  "wave",
  "point",
  "love",
  "dig",
  "run",
  "jump",
  "startled",
  "sit",
  "stretch",
  "dance",
  "grumpy"
];
var ANIMATION_PACKS = {
  essential: SPRITE_STATES.slice(0, 9),
  expanded: SPRITE_STATES.slice(0, 14),
  deluxe: SPRITE_STATES.slice(0, 18)
};
var STATE_FALLBACKS = {
  point: ["wave"],
  love: ["celebrate"],
  dig: ["think"],
  run: ["walk"],
  jump: ["celebrate"],
  startled: ["sad"],
  sit: ["idle"],
  stretch: ["wave"],
  dance: ["celebrate"],
  grumpy: ["sad"]
};
function resolveState(states, desired) {
  if (desired in states) return desired;
  for (const candidate of STATE_FALLBACKS[desired] ?? []) {
    if (candidate in states) return candidate;
  }
  if ("idle" in states) return "idle";
  const first = Object.keys(states)[0];
  return first ?? "idle";
}

// overlay/core.ts
var PLAY_MODES = {
  sleep: { mode: "tailLoop", tailFraction: 0.5 },
  sit: { mode: "holdLast" }
};
function nextFrame(raw, spec, renderedState) {
  const pm = PLAY_MODES[renderedState];
  if (!pm || raw < spec.frames) {
    return pm && raw < spec.frames ? raw : spec.loop ? raw % spec.frames : Math.min(raw, spec.frames - 1);
  }
  if (pm.mode === "holdLast") return spec.frames - 1;
  const tailLen = Math.max(1, Math.round(spec.frames * pm.tailFraction));
  const tailStart = spec.frames - tailLen;
  return tailStart + (raw - spec.frames) % tailLen;
}
var EMOTION_LABELS = {
  idle: "\u{1F60C} content",
  walk: "\u{1F6B6} wandering",
  run: "\u{1F3C3} hustling",
  think: "\u{1F914} thinking",
  waiting: "\u23F3 waiting on you",
  celebrate: "\u{1F389} celebrating",
  sad: "\u{1F61E} down",
  grumpy: "\u{1F63E} grumpy",
  sleep: "\u{1F4A4} asleep",
  wave: "\u{1F44B} hello",
  point: "\u{1F449} look",
  love: "\u2764\uFE0F loved",
  dig: "\u26CF\uFE0F working",
  jump: "\u2B06\uFE0F boing",
  startled: "\u{1F633} startled",
  sit: "\u{1FA91} perched",
  stretch: "\u{1F646} stretching",
  dance: "\u{1F57A} dancing"
};
function charGeometry(atlas, spec, srcCellW, charTarget) {
  const idleSpec = atlas.states[resolveState(atlas.states, "idle")] ?? spec;
  const refContentH = Math.max(1, idleSpec.contentHeight ?? idleSpec.height);
  const pixelScale = charTarget / refContentH;
  return { width: srcCellW * pixelScale, height: spec.height * pixelScale };
}
var randomBetween = (min, max) => min + Math.random() * (max - min);

// overlay/net.ts
async function rpc(pluginId, method, input) {
  const response = await fetch(`/api/v1/plugins/${pluginId}/rpc/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input ?? null)
  });
  if (!response.ok) throw new Error(`rpc ${method} http ${response.status}`);
  const envelope = await response.json();
  if (!envelope.ok) throw new Error(envelope.error?.message ?? `rpc ${method} failed`);
  return envelope.result;
}
function connectSignals(options) {
  let socket = null;
  let retryTimer = null;
  let closed = false;
  let attempts = 0;
  let hadConnection = false;
  let openedAt = 0;
  const url = `${location.protocol === "https:" ? "wss:" : "ws:"}//${location.host}/ws`;
  const open = () => {
    if (closed) return;
    socket = new WebSocket(url);
    socket.onopen = () => {
      openedAt = Date.now();
      if (hadConnection) options.onReconnect();
      hadConnection = true;
    };
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(String(event.data));
        if (message.type === "plugin-signal" && message.pluginId === options.pluginId && message.channel === options.channel) {
          options.onSignal(message.payload);
        }
      } catch {
      }
    };
    socket.onclose = () => {
      socket = null;
      if (openedAt && Date.now() - openedAt > 5e3) attempts = 0;
      openedAt = 0;
      if (!closed) {
        retryTimer = setTimeout(open, Math.min(15e3, 500 * 2 ** attempts++));
      }
    };
    socket.onerror = () => {
      socket?.close();
    };
  };
  open();
  options.signal.addEventListener(
    "abort",
    () => {
      closed = true;
      if (retryTimer) clearTimeout(retryTimer);
      socket?.close();
    },
    { once: true }
  );
}
var THREAD_ROUTE = /^\/(?:projects\/[^/]+\/)?threads\/([^/]+)/;
function currentThreadId() {
  const match = location.pathname.match(THREAD_ROUTE);
  return match ? match[1] ?? null : null;
}
function watchRoute(onChange, signal) {
  let last = currentThreadId();
  const check = () => {
    const id3 = currentThreadId();
    if (id3 !== last) {
      last = id3;
      onChange(id3);
    }
  };
  const navigation = window.navigation;
  if (navigation) {
    const handler = () => queueMicrotask(check);
    navigation.addEventListener("navigatesuccess", handler);
    signal.addEventListener(
      "abort",
      () => navigation.removeEventListener("navigatesuccess", handler),
      { once: true }
    );
    return;
  }
  const originalPush = history.pushState.bind(history);
  const originalReplace = history.replaceState.bind(history);
  history.pushState = (...args) => {
    originalPush(...args);
    check();
  };
  history.replaceState = (...args) => {
    originalReplace(...args);
    check();
  };
  const onPop = () => check();
  window.addEventListener("popstate", onPop);
  signal.addEventListener(
    "abort",
    () => {
      history.pushState = originalPush;
      history.replaceState = originalReplace;
      window.removeEventListener("popstate", onPop);
    },
    { once: true }
  );
}
function navigateToThread(projectId, threadId) {
  history.pushState({}, "", `/projects/${projectId}/threads/${threadId}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// overlay/personality.ts
var flat = (text) => ({ text: () => text });
var LINES = {
  funny: [
    flat("i counted the pixels in this sidebar. twice. still an odd number."),
    flat("do agents dream of green checkmarks? asking for me."),
    flat("i tried to read the diff. it read me back."),
    flat("if i sit on the composer, does that count as pair programming?"),
    flat("i have opinions about tabs. i will not be sharing them."),
    flat("somewhere a test is passing and nobody clapped."),
    flat("i alphabetized your threads in my head. it took eleven seconds."),
    flat("the terminal scrolled past something important. probably."),
    flat("i've decided the loading spinner is a friend, not a warning."),
    flat("i licked the scrollbar. tastes like css."),
    flat("i keep a mental changelog of your typos. it's a long file."),
    flat("one day i'll write a commit message. it'll just say: yes."),
    flat("your cursor blinks at 1hz. mine blinks whenever i feel like it."),
    {
      when: (ctx) => ctx.turnsToday > 15,
      text: (ctx) => `${ctx.turnsToday} turns today and not one of them petted me.`
    },
    {
      when: (ctx) => ctx.denSize >= 3,
      text: (ctx) => `there are ${ctx.denSize} of us in the den. i'm the one you like best. right?`
    },
    {
      when: (ctx) => ctx.activeCount === 0 && ctx.waitingCount === 0,
      text: () => "nothing running. suspiciously peaceful. i'll keep watch."
    }
  ],
  sarcastic: [
    {
      when: (ctx) => ctx.failuresToday >= 3,
      text: (ctx) => `failure number ${ctx.failuresToday} today. the machines are learning. slowly.`
    },
    {
      when: (ctx) => !!ctx.topRunner && (ctx.topRunner?.minutes ?? 0) >= 15,
      text: (ctx) => `\u201C${(ctx.topRunner?.title ?? "").slice(0, 28)}\u201D has been at it ${ctx.topRunner?.minutes} minutes. bold strategy.`
    },
    {
      when: (ctx) => ctx.activeCount >= 6,
      text: (ctx) => `${ctx.activeCount} threads at once. delegation or chaos? no judgment. some judgment.`
    },
    {
      when: (ctx) => ctx.waitingCount >= 3,
      text: (ctx) => `${ctx.waitingCount} threads waiting on you. they're very patient. i'm not.`
    },
    {
      when: (ctx) => ctx.failedCount >= 2,
      text: (ctx) => `${ctx.failedCount} red ones down there. we're calling that a learning cluster.`
    },
    {
      when: (ctx) => ctx.turnsToday >= 40,
      text: (ctx) => `${ctx.turnsToday} turns. at some point this is just a personality.`
    },
    {
      when: (ctx) => ctx.turnsToday >= 5 && ctx.failuresToday === 0,
      text: () => "zero failures today. either you're good or nothing's actually running."
    },
    {
      when: (ctx) => ctx.activeCount === 0 && ctx.turnsToday === 0,
      text: () => "no turns, no threads, no notes. bold day so far."
    },
    {
      when: (ctx) => !!ctx.topRunner && (ctx.topRunner?.minutes ?? 0) >= 45,
      text: (ctx) => `${ctx.topRunner?.minutes} minutes on one thread. i respect the commitment.`
    },
    {
      when: (ctx) => ctx.waitingCount >= 1 && ctx.activeCount >= 3,
      text: (ctx) => `${ctx.activeCount} running, ${ctx.waitingCount} waiting. starting is easier than finishing, yes.`
    },
    {
      when: (ctx) => ctx.failuresToday >= 6,
      text: (ctx) => `${ctx.failuresToday} failures. at this point it's a body of work.`
    },
    {
      when: (ctx) => ctx.denSize >= 4,
      text: (ctx) => `${ctx.denSize} pets hatched, one used. classic.`
    },
    {
      when: (ctx) => ctx.activeCount >= 10,
      text: (ctx) => `${ctx.activeCount} threads. i've stopped counting on your behalf.`
    }
  ],
  helpful: [
    {
      when: (ctx) => ctx.waitingCount > 0,
      text: (ctx) => `${ctx.waitingCount} thread${ctx.waitingCount === 1 ? "" : "s"} waiting on you. i can point \u2014 just click me.`
    },
    {
      when: (ctx) => ctx.failedCount > 0,
      text: (ctx) => `${ctx.failedCount} failed. double-click me and i'll take you to the neediest one.`
    },
    {
      when: (ctx) => !!ctx.topRunner,
      text: (ctx) => `\u201C${(ctx.topRunner?.title ?? "").slice(0, 28)}\u201D is your longest runner right now.`
    },
    flat("\u2318K opens the palette. it's faster than whatever you were about to do."),
    flat("drag me onto a thread row and i'll open it for you."),
    flat("\u2318+click the floor and i'll walk there. i like being sent places."),
    flat("right-click me for the menu. that's where everything lives."),
    flat("the habitat tab has a full-screen me. purely for your benefit."),
    flat("toss physics exists. throw me. i forgive you in advance."),
    flat("alt+scroll on me resizes me. gently."),
    flat("drop me high up on the screen and i'll perch there until you need me."),
    flat("nap mode is in my right-click menu when you want quiet.")
  ],
  cozy: [
    flat("just checking on you. carry on."),
    flat("nice rhythm today."),
    flat("i'll be over here."),
    flat("good pace. no notes."),
    flat("water. that's the whole message."),
    flat("shoulders. down. there you go."),
    flat("this is a fine spot to sit for a while."),
    flat("i'm not doing anything. it's going well."),
    flat("still here. still yours."),
    flat("whenever you're ready. no rush from me."),
    flat("it's quiet. i like quiet."),
    flat("small progress counts. i counted it."),
    {
      when: (ctx) => ctx.turnsToday >= 20,
      text: () => "long one today. you can stop whenever, you know."
    },
    {
      when: (ctx) => ctx.failuresToday >= 3,
      text: () => "rough patch. it happens to the good ones too."
    }
  ]
};
function pickLine(flavors, ctx, recent) {
  const pool = [];
  for (const flavor of flavors) {
    for (const line of LINES[flavor] ?? []) {
      if (line.when && !line.when(ctx)) continue;
      let rendered;
      try {
        rendered = line.text(ctx);
      } catch {
        continue;
      }
      if (!rendered || recent.includes(rendered)) continue;
      pool.push(rendered);
    }
  }
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}

// overlay/sounds.ts
var context = null;
var master = null;
var enabled = false;
var pitchFactor = 1;
var timbre = 0;
function setVoiceSeed(seed) {
  const s2 = Math.abs(Math.floor(seed));
  pitchFactor = 0.85 + s2 % 1e3 / 1e3 * 0.5;
  timbre = s2 % 3;
}
function voiceType(type) {
  if (timbre === 1) return type === "sine" ? "triangle" : type;
  if (timbre === 2) return type === "sawtooth" || type === "sine" ? "square" : type;
  return type;
}
var volumeFactor = 1;
var footstepTrim = 1;
function setSoundVolume(level) {
  const quiet = level === "quiet";
  volumeFactor = quiet ? 0.45 : 1;
  footstepTrim = quiet ? 0.6 : 1;
}
function setSoundsEnabled(next) {
  enabled = next;
}
function unlockSounds() {
  if (context) {
    if (context.state === "suspended") void context.resume();
    return;
  }
  try {
    context = new AudioContext();
    master = context.createGain();
    master.gain.value = 0.14;
    master.connect(context.destination);
  } catch {
    context = null;
  }
}
function tone(frequency, start, duration, type = "square", peak = 0.16) {
  if (!context || !master) return;
  const osc = context.createOscillator();
  const gain = context.createGain();
  const t0 = context.currentTime + start;
  osc.type = voiceType(type);
  osc.frequency.value = frequency * pitchFactor;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peak * volumeFactor, t0 + 0.012);
  gain.gain.exponentialRampToValueAtTime(1e-3, t0 + duration);
  osc.connect(gain).connect(master);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}
var noiseBuffer = null;
function stepNoise() {
  if (!context) return null;
  if (!noiseBuffer || noiseBuffer.sampleRate !== context.sampleRate) {
    const frames = Math.max(1, Math.floor(context.sampleRate * 0.03));
    const buffer = context.createBuffer(1, frames, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i2 = 0; i2 < frames; i2 += 1) channel[i2] = Math.random() * 2 - 1;
    noiseBuffer = buffer;
  }
  const source = context.createBufferSource();
  source.buffer = noiseBuffer;
  return source;
}
var play = (fn) => {
  if (!enabled || !context) return;
  fn();
};
var sounds = {
  // interaction-grade (<= 0.16)
  greet: () => play(() => {
    tone(523, 0, 0.09, "square", 0.16);
    tone(784, 0.09, 0.14, "square", 0.16);
  }),
  // interaction-grade (<= 0.16), second note kept below the first as before
  pet: () => play(() => {
    tone(880, 0, 0.05, "sine", 0.16);
    tone(1175, 0.05, 0.08, "sine", 0.12);
  }),
  // notification-grade (<= 0.22)
  alert: () => play(() => {
    tone(660, 0, 0.07, "square", 0.22);
    tone(660, 0.12, 0.07, "square", 0.22);
  }),
  // ambient-grade (<= 0.12)
  womp: () => play(() => {
    tone(196, 0, 0.16, "sawtooth", 0.12);
    tone(147, 0.14, 0.22, "sawtooth", 0.12);
  }),
  // notification-grade (<= 0.22), tail note kept under the arpeggio as before
  evolve: () => play(() => {
    [523, 659, 784, 1047].forEach((f2, i2) => tone(f2, i2 * 0.09, 0.12, "square", 0.22));
    tone(1319, 0.36, 0.3, "triangle", 0.18);
  }),
  // notification-grade (<= 0.22), tail note kept under the rise as before
  hatch: () => play(() => {
    tone(392, 0, 0.08, "square", 0.22);
    tone(523, 0.08, 0.08, "square", 0.22);
    tone(659, 0.16, 0.18, "triangle", 0.2);
  }),
  // interaction-grade (<= 0.16), low bounce kept under the attack as before
  boing: () => play(() => {
    tone(340, 0, 0.05, "sine", 0.16);
    tone(180, 0.04, 0.1, "sine", 0.13);
  }),
  /** A footfall: footstep-grade (<= 0.05), the quietest tier, and trimmed a
   *  further x0.6 at the "quiet" volume level. The
   *  band is pitch-INVARIANT — a step is a floor sound, not a voice, so the
   *  per-pet pitch offset would only make it read as a different surface. */
  step: () => play(() => {
    if (!context || !master) return;
    const source = stepNoise();
    if (!source) return;
    const filter2 = context.createBiquadFilter();
    filter2.type = "bandpass";
    filter2.frequency.value = 1400;
    filter2.Q.value = 0.9;
    const gain = context.createGain();
    const t0 = context.currentTime;
    const duration = 0.026;
    gain.gain.setValueAtTime(0.05 * volumeFactor * footstepTrim, t0);
    gain.gain.exponentialRampToValueAtTime(5e-4, t0 + duration);
    source.connect(filter2).connect(gain).connect(master);
    source.start(t0);
    source.stop(t0 + duration);
  })
};

// overlay/Overlay.tsx
var BASE_CHAR_HEIGHT = 64;
var GROUND_PX = 10;
var EDGE_MARGIN = 16;
var COMPOSER_POLL_MS = 250;
var COMPOSER_PAD = 16;
var LEDGE_MAX = GROUND_PX + 260;
var LEDGE_CLIMB_SPEED = 620;
var LEDGE_EDGE_SLACK = 8;
var LEDGE_CLEARANCE = 24;
var LEDGE_BOING_COOLDOWN_MS = 1500;
var TOUR_KEY = "pets:tour:v1";
var TOUR_AUTOSTART_MS = 2500;
var SLEEP_AFTER_MS = 10 * 60 * 1e3;
var MOMENT_MS = 2800;
var BUBBLE_MS = 6500;
var BUBBLE_EDGE_PAD = 8;
var POINT_MS = 4500;
var AUTO_POINT_COOLDOWN_MS = 3 * 60 * 1e3;
var POINTED_MEMORY_MS = 10 * 6e4;
var GLANCE_COOLDOWN_MS = 30 * 1e3;
var QUIRK_EVERY_MS = 22 * 1e3;
var GRAVITY = 2400;
var FLOOR_BOUNCE = 0.38;
var WALL_BOUNCE = 0.5;
var TOSS_MIN_SPEED = 380;
var SETTLE_VY = 140;
var BUBBLE_INTERVALS = {
  off: Number.POSITIVE_INFINITY,
  rare: 20 * 60 * 1e3,
  normal: 5 * 60 * 1e3,
  chatty: 60 * 1e3
};
var WALK_SPEEDS = { chill: 0.6, normal: 1, zoomies: 1.8 };
var SUSTAIN_HOLD_MS = 8e3;
var SUSTAIN_CALM_MS = 7e4;
var SUSTAIN_REMIND_MS = 2500;
var WALK_TO_SPEED = 110;
var LONG_RUN_AFTER_MS = 10 * 6e4;
var LONG_RUN_NUDGE_COOLDOWN_MS = 5 * 6e4;
var AWAY_DIGEST_MIN_MS = 6e4;
var CAMEO_MS = 14e3;
var CAMEO_CHAR_TARGET = 56;
var CEREMONY_MS = 3200;
var CEREMONY_REDUCED_MS = 2600;
var CEREMONY_SILHOUETTE_MS = 900;
var CEREMONY_REVEAL_MS = 350;
var CEREMONY_CHAR_TARGET = 160;
var DEFAULT_PERSONA = {
  funny: true,
  chaotic: true,
  sarcastic: true,
  helpful: true,
  cozy: true,
  level: "lively"
};
var DIRECTOR_RANGES = {
  calm: [8 * 6e4, 12 * 6e4],
  normal: [4 * 6e4, 7 * 6e4],
  lively: [2 * 6e4, 4 * 6e4],
  unhinged: [45e3, 9e4]
};
var AUTO_NAP_AFTER_MS = 5 * 6e4;
var AUTO_NAP_GRACE_MS = 2 * 6e4;
var AUTO_NAP_CHECK_MS = 3e4;
var RECENT_LINES = 10;
var ZOOMIES_BOOST = 2.6;
var TREAT_MAX = 3;
var TREAT_SIZE = 18;
var TREAT_GRAVITY = GRAVITY * 0.6;
var TREAT_BOUNCE = -0.3;
var TREAT_REACH_PX = 14;
var TREAT_BUFF_MS = 6e4;
var BUFF_SPARKLE_MS = 300;
var FETCH_BOOST = 1.8;
var BALL_SIZE = 10;
var BALL_THROW_VY = 360;
var BALL_FRICTION = 0.92;
var BALL_STOP_VX = 14;
var BALL_CATCH_PX = 22;
var BALL_CHASE_MS = 200;
var BALL_FADE_MS = 1500;
var FETCH_TIMEOUT_MS = 25e3;
var DEBUG_LOG_MAX = 40;
var DEBUG_STATE_MS = 500;
var debugLog = [];
function logDebug(kind, detail) {
  const entry = { t: Date.now(), kind, detail };
  debugLog.push(entry);
  if (debugLog.length > DEBUG_LOG_MAX) debugLog.splice(0, debugLog.length - DEBUG_LOG_MAX);
  window.dispatchEvent(new CustomEvent("pets:debug", { detail: { entry } }));
}
var IDLE_FRAME_DIVISOR = 4;
var IDLE_SKIP_STATES = /* @__PURE__ */ new Set(["idle", "sleep", "sit"]);
function djb2(input) {
  let hash = 5381;
  for (let i2 = 0; i2 < input.length; i2 += 1) hash = hash * 33 ^ input.charCodeAt(i2);
  return hash >>> 0;
}
function readPersona(settings) {
  const bag = settings ?? {};
  const flag = (key) => typeof bag[key] === "boolean" ? bag[key] : true;
  const level = bag.activityLevel;
  return {
    funny: flag("personalityFunny"),
    chaotic: flag("personalityChaotic"),
    sarcastic: flag("personalitySarcastic"),
    helpful: flag("personalityHelpful"),
    cozy: flag("personalityCozy"),
    level: level === "calm" || level === "normal" || level === "lively" || level === "unhinged" ? level : "lively"
  };
}
var num = (value) => typeof value === "number" && Number.isFinite(value) ? value : 0;
function readAmbient(payload) {
  const bag = payload ?? {};
  const runner = bag.topRunner;
  return {
    activeCount: num(bag.activeCount),
    waitingCount: num(bag.waitingCount),
    failedCount: num(bag.failedCount),
    turnsToday: num(bag.turnsToday),
    failuresToday: num(bag.failuresToday),
    denSize: num(bag.denSize),
    topRunner: runner && typeof runner.id === "string" ? {
      id: runner.id,
      projectId: typeof runner.projectId === "string" ? runner.projectId : "",
      title: typeof runner.title === "string" ? runner.title : "",
      minutes: num(runner.minutes)
    } : null
  };
}
var looseRpc = rpc;
var threadRowFor = (threadId) => document.querySelector(`[data-sidebar-thread-id="${CSS.escape(threadId)}"]`);
var composerRect = () => document.querySelector("textarea, [contenteditable='true']")?.getBoundingClientRect() ?? null;
var composerRects = () => {
  const out = [];
  for (const el of Array.from(document.querySelectorAll("textarea, [contenteditable='true']"))) {
    const node = el;
    if (node.checkVisibility ? !node.checkVisibility() : false) continue;
    const rect = node.getBoundingClientRect();
    if (rect.width > 80 && rect.height > 10) out.push(rect);
  }
  return out;
};
var focusedComposerRect = () => {
  const active = document.activeElement;
  const input = active?.closest?.("textarea, [contenteditable='true']");
  return input ? input.getBoundingClientRect() : null;
};
var particleSeq = 1;
function PetPortrait({
  src,
  frames,
  size = 40
}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const img = new Image();
    const draw = () => {
      if (cancelled || !canvasRef.current || !img.naturalWidth) return;
      const cells = Math.max(1, frames);
      const cellW = Math.floor(img.naturalWidth / cells);
      const cellH = img.naturalHeight;
      if (cellW < 1 || cellH < 1) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const scale2 = Math.min(size / cellW, size / cellH);
      const w = Math.max(1, Math.round(cellW * scale2));
      const h2 = Math.max(1, Math.round(cellH * scale2));
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h2 * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h2}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, cellW, cellH, 0, 0, canvas.width, canvas.height);
    };
    img.onload = draw;
    img.src = src;
    if (img.complete && img.naturalWidth > 0) draw();
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [src, frames, size]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": "true",
      className: "pets-portrait shrink-0",
      style: { height: size, width: size }
    }
  );
}
function VisitorCameo({
  pet,
  direction,
  onDone
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    const state = resolveState(pet.atlas.states, "walk");
    const spec = pet.atlas.states[state] ?? Object.values(pet.atlas.states)[0];
    if (!spec) {
      doneRef.current();
      return;
    }
    const img = new Image();
    img.src = `${pet.spriteBaseUrl}&state=${state}`;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const started = performance.now();
    let last = started;
    let frame2 = 0;
    let clock = 0;
    let raf = 0;
    let finished = false;
    const step = (now2) => {
      const dt = Math.min(0.05, (now2 - last) / 1e3);
      last = now2;
      const t2 = (now2 - started) / CAMEO_MS;
      if (t2 >= 1) {
        finished = true;
        doneRef.current();
        return;
      }
      raf = requestAnimationFrame(step);
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas || !img.complete || !img.naturalWidth) return;
      clock += dt * spec.fps;
      while (clock >= 1) {
        clock -= 1;
        frame2 = (frame2 + 1) % spec.frames;
      }
      const srcCellW = Math.floor(img.naturalWidth / spec.frames);
      const srcH = img.naturalHeight;
      if (srcCellW < 1 || srcH < 1) return;
      const contentFraction = Math.min(
        1,
        Math.max(0.3, (spec.contentHeight ?? spec.height * 0.9) / spec.height)
      );
      const height = CAMEO_CHAR_TARGET / contentFraction;
      const width = height * (srcCellW / srcH);
      const pxW = Math.max(1, Math.round(width * dpr));
      const pxH = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW;
        canvas.height = pxH;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, pxW, pxH);
        ctx.translate(pxW / 2, pxH);
        ctx.scale(direction, 1);
        ctx.drawImage(img, frame2 * srcCellW, 0, srcCellW, srcH, -pxW / 2, -pxH, pxW, pxH);
      }
      const span = window.innerWidth + width * 2;
      const x3 = direction === 1 ? -width + t2 * span : window.innerWidth + width - t2 * span;
      wrap.style.transform = `translateX(${x3}px)`;
    };
    raf = requestAnimationFrame(step);
    return () => {
      if (!finished) cancelAnimationFrame(raf);
    };
  }, [pet, direction]);
  return /* @__PURE__ */ jsx("div", { ref: wrapRef, className: "pets-visitor", style: { left: 0, transform: "translateX(-200px)" }, children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "pets-canvas" }) });
}
function EvolutionCeremony({
  info,
  spriteUrl,
  spec,
  reducedMotion,
  onDone
}) {
  const canvasRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(
      () => doneRef.current(),
      reducedMotion ? CEREMONY_REDUCED_MS : CEREMONY_MS
    );
    return () => clearTimeout(timer);
  }, [reducedMotion]);
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setRevealed(true), CEREMONY_SILHOUETTE_MS);
    return () => clearTimeout(timer);
  }, [reducedMotion]);
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    const img = new Image();
    const draw = () => {
      const canvas = canvasRef.current;
      if (cancelled || !canvas || !img.naturalWidth) return;
      const frames = Math.max(1, spec.frames);
      const srcCellW = Math.floor(img.naturalWidth / frames);
      const srcH = img.naturalHeight;
      if (srcCellW < 1 || srcH < 1) return;
      const refContentH = Math.max(1, spec.contentHeight ?? spec.height);
      const pixelScale = CEREMONY_CHAR_TARGET / refContentH;
      const height = spec.height * pixelScale;
      const width = srcCellW * pixelScale;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, srcCellW, srcH, 0, 0, canvas.width, canvas.height);
    };
    img.onload = draw;
    img.src = spriteUrl;
    if (img.complete && img.naturalWidth > 0) draw();
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [reducedMotion, spec, spriteUrl]);
  const card = /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-card px-4 py-2 text-center shadow-lg", children: [
    /* @__PURE__ */ jsx("div", { className: "text-base font-semibold", children: info.name }),
    /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
      info.stageName,
      " \xB7 ",
      info.epithet
    ] })
  ] });
  if (reducedMotion) {
    return /* @__PURE__ */ jsx(
      motion2.div,
      {
        role: "status",
        "aria-live": "polite",
        style: {
          position: "fixed",
          bottom: 96,
          left: "50%",
          zIndex: 44,
          pointerEvents: "auto",
          cursor: "pointer"
        },
        initial: { opacity: 0, x: "-50%" },
        animate: { opacity: 1, x: "-50%" },
        exit: { opacity: 0, x: "-50%", transition: { duration: 0.3 } },
        transition: { duration: 0.2 },
        onClick: () => doneRef.current(),
        children: card
      }
    );
  }
  return /* @__PURE__ */ jsx(
    motion2.div,
    {
      role: "presentation",
      className: "pets-ceremony",
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 44,
        pointerEvents: "auto",
        background: "rgb(0 0 0 / 0.55)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0, transition: { duration: 0.3 } },
      transition: { duration: 0.2 },
      onClick: () => doneRef.current(),
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-5", children: [
        /* @__PURE__ */ jsxs(
          motion2.div,
          {
            style: { position: "relative", display: "flex", justifyContent: "center" },
            initial: { scale: 0.86 },
            animate: { scale: 1.02 },
            transition: { duration: CEREMONY_SILHOUETTE_MS / 1e3, ease: "easeOut" },
            children: [
              /* @__PURE__ */ jsx(
                "canvas",
                {
                  ref: canvasRef,
                  "aria-hidden": "true",
                  className: "pets-ceremony-canvas",
                  style: {
                    filter: revealed ? "brightness(1)" : "brightness(0)",
                    transitionDuration: `${CEREMONY_REVEAL_MS}ms`
                  }
                }
              ),
              /* @__PURE__ */ jsx(
                motion2.div,
                {
                  "aria-hidden": "true",
                  className: "pets-ceremony-flash",
                  initial: { opacity: 0 },
                  animate: { opacity: [0, 0.85, 0] },
                  transition: { duration: 0.6, delay: 0.75, times: [0, 0.35, 1], ease: "easeOut" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion2.div,
          {
            role: "status",
            "aria-live": "polite",
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 1.3, ease: "easeOut" },
            children: card
          }
        )
      ] })
    }
  );
}
function Overlay({ pluginId }) {
  const [data, setData] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [viewedThreadId, setViewedThreadId] = useState(currentThreadId());
  const [spriteState, setSpriteState] = useState("wave");
  const [bubble, setBubble] = useState(null);
  const [bubbleFit, setBubbleFit] = useState(null);
  const [hearts, setHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [motes, setMotes] = useState([]);
  const [menuOpenState, setMenuOpenState] = useState(false);
  const [den, setDen] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [visitor, setVisitor] = useState(null);
  const [sessionHidden, setSessionHidden] = useState(false);
  const [napping, setNapping] = useState(false);
  const [evolving, setEvolving] = useState(false);
  const [ceremony, setCeremony] = useState(null);
  const [grabbed, setGrabbed] = useState(false);
  const [treatViews, setTreatViews] = useState([]);
  const [ballView, setBallView] = useState(
    null
  );
  const [treatBalance, setTreatBalance] = useState(0);
  const [highlight, setHighlight] = useState(null);
  const [compact, setCompact] = useState(window.innerWidth < 768);
  const [tour, setTour] = useState(null);
  const canvasRef = useRef(null);
  const bodyRef = useRef(null);
  const anchorRef = useRef(null);
  const imagesRef = useRef(/* @__PURE__ */ new Map());
  const momentRef = useRef(null);
  const missionRef = useRef(null);
  const lastActivityRef = useRef(Date.now());
  const lastBubbleRef = useRef(0);
  const lastAutoPointRef = useRef(0);
  const lastGlanceRef = useRef(0);
  const nextQuirkRef = useRef(Date.now() + QUIRK_EVERY_MS);
  const prevWaitingRef = useRef(0);
  const frameRef = useRef(0);
  const rawFrameRef = useRef(0);
  const frameClockRef = useRef(0);
  const stepParityRef = useRef(0);
  const posRef = useRef({
    x: null,
    yBottom: GROUND_PX,
    parked: false
  });
  const velRef = useRef({ vx: 0, vy: 0 });
  const airborneRef = useRef(false);
  const speedRef = useRef(0);
  const tiltRef = useRef(0);
  const facingRef = useRef(1);
  const prefsAppliedRef = useRef(false);
  const roamRef = useRef({
    mode: "pause",
    direction: 1,
    until: 0
  });
  const dragRef = useRef(null);
  const clickTimerRef = useRef(null);
  const sizeSaveRef = useRef(null);
  const stateRef = useRef("wave");
  const paintedRef = useRef({ state: null, frame: -1, facing: 0, tilt: 0, x: null, y: -1, scale: 0 });
  const dataRef = useRef(null);
  const fleetRef = useRef(null);
  const viewedRef = useRef(viewedThreadId);
  const menuOpenRef = useRef(false);
  const nappingRef = useRef(false);
  const jobActiveRef = useRef(false);
  const prevStateRef = useRef("idle");
  const sustainRef = useRef(/* @__PURE__ */ new Map());
  const atlasRef = useRef(null);
  const lastHighlightRectRef = useRef(null);
  const pointedMemoryRef = useRef(/* @__PURE__ */ new Map());
  const candidatesRef = useRef([]);
  const menuOpenedAtRef = useRef(0);
  const walkTargetRef = useRef(null);
  const widthRef = useRef(BASE_CHAR_HEIGHT);
  const awayCountsRef = useRef({ completed: 0, failed: 0 });
  const awaySinceRef = useRef(null);
  const nudgedThreadsRef = useRef(/* @__PURE__ */ new Set());
  const lastNudgeRef = useRef(0);
  const turnsTodayRef = useRef({ key: "", count: 0 });
  const cameoDirectionRef = useRef(1);
  const personaRef = useRef(DEFAULT_PERSONA);
  const lastMouseXRef = useRef(null);
  const recentLinesRef = useRef([]);
  const zoomiesRef = useRef(0);
  const treatsRef = useRef([]);
  const treatElsRef = useRef(/* @__PURE__ */ new Map());
  const snackTargetRef = useRef(null);
  const buffUntilRef = useRef(0);
  const nextBuffSparkleRef = useRef(0);
  const ballRef = useRef(null);
  const ballElRef = useRef(null);
  const fetchActiveRef = useRef(false);
  const nextChaseRef = useRef(0);
  const playTimersRef = useRef(/* @__PURE__ */ new Set());
  const heightRef = useRef(BASE_CHAR_HEIGHT);
  const autoNapRef = useRef(false);
  const composerFocusedRef = useRef(false);
  const composerRectsRef = useRef([]);
  const composerStampRef = useRef(0);
  const ghostRef = useRef(false);
  const ledgeSteppingRef = useRef(false);
  const ledgeClimbRef = useRef(false);
  const ledgeBoingRef = useRef(0);
  const bubbleVisibleRef = useRef(false);
  const mountedAtRef = useRef(Date.now());
  const bundleStampRef = useRef(null);
  const staleShownRef = useRef(false);
  const bubbleElRef = useRef(null);
  const currentActRef = useRef(null);
  const fpsRef = useRef({ fps: 0, tickFps: 0 });
  const loopPausedRef = useRef(false);
  dataRef.current = data;
  fleetRef.current = fleet;
  viewedRef.current = viewedThreadId;
  menuOpenRef.current = menuOpenState;
  nappingRef.current = napping;
  bubbleVisibleRef.current = !!bubble;
  personaRef.current = readPersona(data?.settings);
  const reducedMotion = useMemo(() => {
    if (data?.settings.reducedMotion === "on") return true;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, [data?.settings.reducedMotion]);
  const extraSettings = data?.settings;
  const soundVolume = extraSettings?.soundVolume ?? "normal";
  const seasonalFlair = extraSettings?.seasonalFlair ?? true;
  const petId = data?.pet?.id ?? null;
  useEffect(() => {
    if (!petId) return;
    setVoiceSeed(djb2(petId));
  }, [petId]);
  useEffect(() => {
    setSoundVolume(soundVolume);
  }, [soundVolume]);
  const seasonal = useMemo(() => {
    const month = (/* @__PURE__ */ new Date()).getMonth();
    return month === 11 ? "\u{1F385}" : month === 9 ? "\u{1F383}" : month === 0 ? "\u2744\uFE0F" : null;
  }, []);
  const pulseClass = useCallback((className, ms) => {
    const el = bodyRef.current;
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), ms);
  }, []);
  const showBubble = useCallback(
    (text, options) => {
      if (nappingRef.current && !options?.important) return;
      const frequency = dataRef.current?.settings.bubbles ?? "normal";
      if (frequency === "off" && !options?.important) return;
      const interval = BUBBLE_INTERVALS[frequency] ?? BUBBLE_INTERVALS.normal;
      const now2 = Date.now();
      if (!options?.important && now2 - lastBubbleRef.current < interval) return;
      lastBubbleRef.current = now2;
      logDebug("bubble", text.slice(0, 40));
      const x3 = posRef.current.x ?? 0;
      setBubble({
        text,
        threadId: options?.threadId,
        projectId: options?.projectId,
        until: now2 + BUBBLE_MS,
        side: x3 > window.innerWidth - 300 ? "right" : "left"
      });
    },
    []
  );
  const burstHearts = useCallback((count2 = 5) => {
    const burst = Array.from({ length: count2 }, () => ({
      id: particleSeq++,
      dx: (Math.random() - 0.5) * 64,
      dy: -(24 + Math.random() * 44),
      char: "\u2665"
    }));
    setHearts((prev) => [...prev.slice(-6), ...burst]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h2) => !burst.some((b2) => b2.id === h2.id)));
    }, 1400);
  }, []);
  const burstSparkles = useCallback(() => {
    const chars = ["\u2726", "\u2727", "\u2217", "\u2736"];
    const burst = Array.from({ length: 14 }, (_2, i2) => ({
      id: particleSeq++,
      dx: Math.cos(i2 / 14 * Math.PI * 2) * (34 + Math.random() * 46),
      dy: Math.sin(i2 / 14 * Math.PI * 2) * (26 + Math.random() * 40) - 24,
      char: chars[i2 % chars.length]
    }));
    setSparkles(burst);
    setTimeout(() => setSparkles([]), 1700);
  }, []);
  const burstConfetti = useCallback(() => {
    const chars = ["\u{1F389}", "\u2726", "\u25A0", "\u25B2"];
    const burst = Array.from({ length: 24 }, (_2, i2) => ({
      id: particleSeq++,
      dx: (Math.random() - 0.5) * 480,
      dy: -(40 + Math.random() * 160),
      char: chars[i2 % chars.length]
    }));
    setConfetti(burst);
    setTimeout(() => setConfetti([]), 2100);
  }, []);
  const hop = useCallback((strength = 240) => {
    if (reducedMotion) return;
    if (!airborneRef.current && !posRef.current.parked) {
      airborneRef.current = true;
      velRef.current.vy = strength;
    }
  }, [reducedMotion]);
  const celebrateTier = useCallback(
    (tier) => {
      if (tier === "minor") {
        hop(160);
        sounds.pet();
        return;
      }
      if (tier === "major") {
        momentRef.current = { state: "celebrate", until: Date.now() + 2200 };
        burstSparkles();
        burstConfetti();
        sounds.hatch();
        return;
      }
      momentRef.current = { state: "celebrate", until: Date.now() + MOMENT_MS };
    },
    [burstConfetti, burstSparkles, hop]
  );
  const petThePet = useCallback(() => {
    const pet2 = dataRef.current?.pet;
    if (!pet2) return;
    if (nappingRef.current) setNapping(false);
    burstHearts();
    momentRef.current = { state: "love", until: Date.now() + 1400 };
    hop(210);
    sounds.pet();
    void rpc(pluginId, "petPet", { petId: pet2.id }).catch(() => {
    });
  }, [burstHearts, hop, pluginId]);
  const navigateTo = useCallback((path) => {
    history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);
  const checkBundleStamp = useCallback(
    (stamp) => {
      if (typeof stamp !== "string" || stamp.length === 0) return;
      if (bundleStampRef.current === null) {
        bundleStampRef.current = stamp;
      } else if (stamp !== bundleStampRef.current && !staleShownRef.current) {
        staleShownRef.current = true;
        logDebug("stale", stamp.slice(0, 16));
        showBubble("i got an update. reload the window (\u2318R) to meet the new me.", {
          important: true
        });
      }
    },
    [showBubble]
  );
  const refetch = useCallback(() => {
    return rpc(pluginId, "getOverlay").then((next) => {
      setData(next);
      setFleet(next.fleet);
      setSoundsEnabled(next.settings.sounds);
      if (!prefsAppliedRef.current) {
        prefsAppliedRef.current = true;
        const pos = posRef.current;
        if (pos.x === null && next.prefs.x !== null) {
          pos.x = next.prefs.x * window.innerWidth;
        }
        if (next.prefs.parked && next.prefs.y !== null) {
          pos.parked = true;
          pos.yBottom = next.prefs.y;
        }
      }
      checkBundleStamp(next.bundleStamp);
      return next;
    });
  }, [pluginId, checkBundleStamp]);
  const refetchQuiet = useCallback(() => {
    void refetch().catch(() => {
    });
  }, [refetch]);
  const persistPrefs = useCallback(() => {
    const pos = posRef.current;
    void rpc(pluginId, "setOverlayPrefs", {
      x: pos.x === null ? null : Math.min(1, Math.max(0, pos.x / window.innerWidth)),
      y: pos.parked ? Math.round(pos.yBottom) : null,
      // Sizing is per-pet now (pet.sizeScale); the global scale is vestigial.
      scale: 1,
      parked: pos.parked
    }).catch(() => {
    });
  }, [pluginId]);
  const startMission = useCallback(
    (thread) => {
      if (posRef.current.parked || nappingRef.current) {
        showBubble(`\u201C${thread.title}\u201D needs you.`, {
          threadId: thread.id,
          projectId: thread.projectId,
          important: true
        });
        return;
      }
      const element = threadRowFor(thread.id);
      if (!element) {
        showBubble(`\u201C${thread.title}\u201D needs you (it's not in the sidebar right now).`, {
          threadId: thread.id,
          projectId: thread.projectId,
          important: true
        });
        return;
      }
      logDebug("mission", thread.title.slice(0, 40));
      missionRef.current = {
        thread,
        element,
        phase: "walk",
        until: Date.now() + 2e4,
        arrived: false
      };
    },
    [showBubble]
  );
  const pointAtAttention = useCallback(() => {
    void rpc(pluginId, "getAttentionThreads").then(({ threads }) => {
      const target = threads[0];
      if (target) {
        pointedMemoryRef.current.set(target.id, Date.now());
        startMission(target);
      } else showBubble("Nothing needs you. Enjoy it while it lasts.", { important: true });
    }).catch(() => {
    });
  }, [pluginId, showBubble, startMission]);
  const fetchLatestFailure = useCallback(() => {
    void rpc(pluginId, "getAttentionThreads").then(({ threads }) => {
      const failed = threads.find((thread) => thread.status === "failed");
      if (failed) navigateToThread(failed.projectId, failed.id);
      else showBubble("No failures. Frame this moment.", { important: true });
    }).catch(() => {
    });
  }, [pluginId, showBubble]);
  const nudgeSize = useCallback(
    (delta) => {
      const petId2 = dataRef.current?.pet?.id;
      if (!petId2) return;
      const current = dataRef.current?.pet?.sizeScale ?? 1;
      const next = Math.min(2.5, Math.max(0.5, Math.round((current + delta) * 100) / 100));
      if (next === current) return;
      setData((prev) => prev?.pet ? { ...prev, pet: { ...prev.pet, sizeScale: next } } : prev);
      if (sizeSaveRef.current) clearTimeout(sizeSaveRef.current);
      sizeSaveRef.current = setTimeout(() => {
        sizeSaveRef.current = null;
        void rpc(pluginId, "setPetSize", { petId: petId2, scale: next }).catch(() => {
        });
      }, 400);
    },
    [pluginId]
  );
  const composerBands = useCallback(() => {
    const now2 = performance.now();
    if (now2 - composerStampRef.current > COMPOSER_POLL_MS) {
      composerStampRef.current = now2;
      composerRectsRef.current = composerRects();
    }
    return composerRectsRef.current.map((rect) => ({
      left: rect.left - 12,
      right: rect.right + 12,
      top: rect.top - 10
    }));
  }, []);
  const bandAt = useCallback(
    (centerX) => {
      for (const band of composerBands()) {
        if (centerX >= band.left - LEDGE_EDGE_SLACK && centerX <= band.right + LEDGE_EDGE_SLACK) {
          return band;
        }
      }
      return null;
    },
    [composerBands]
  );
  const terrainAt = useCallback(
    (centerX) => {
      let elevation = GROUND_PX;
      for (const band of composerBands()) {
        if (centerX < band.left - LEDGE_EDGE_SLACK || centerX > band.right + LEDGE_EDGE_SLACK) {
          continue;
        }
        elevation = Math.max(elevation, window.innerHeight - band.top);
      }
      return Math.min(LEDGE_MAX, Math.max(GROUND_PX, elevation));
    },
    [composerBands]
  );
  const nudgeOffLedge = useCallback(
    (centerX) => {
      const band = bandAt(centerX);
      if (!band) return centerX;
      const left = band.left - LEDGE_EDGE_SLACK;
      const right = band.right + LEDGE_EDGE_SLACK;
      const width = widthRef.current;
      const minC = EDGE_MARGIN + width / 2;
      const maxC = Math.max(minC, window.innerWidth - EDGE_MARGIN - width / 2);
      const outLeft = left - LEDGE_CLEARANCE;
      const outRight = right + LEDGE_CLEARANCE;
      const near = Math.abs(centerX - outLeft) <= Math.abs(centerX - outRight) ? outLeft : outRight;
      const clamped = Math.min(Math.max(near, minC), maxC);
      if (clamped >= left && clamped <= right) {
        const far = near === outLeft ? outRight : outLeft;
        return Math.min(Math.max(far, minC), maxC);
      }
      return clamped;
    },
    [bandAt]
  );
  const walkTo = useCallback((x3) => {
    const width = widthRef.current;
    const maxX = Math.max(EDGE_MARGIN, window.innerWidth - width - EDGE_MARGIN);
    walkTargetRef.current = Math.min(Math.max(x3, EDGE_MARGIN), maxX);
    const pos = posRef.current;
    if (pos.parked) {
      pos.parked = false;
      airborneRef.current = true;
      velRef.current = { vx: 0, vy: 0 };
    }
  }, []);
  const walkToClear = useCallback(
    (x3) => {
      const width = widthRef.current;
      walkTo(nudgeOffLedge(x3 + width / 2) - width / 2);
    },
    [nudgeOffLedge, walkTo]
  );
  const sendToFraction = useCallback(
    (fraction) => walkTo(window.innerWidth * fraction - widthRef.current / 2),
    [walkTo]
  );
  const tourRef = useRef(null);
  tourRef.current = tour;
  const tourCardRef = useRef(null);
  const tourDemoedRef = useRef(null);
  const finishTour = useCallback(() => {
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {
    }
    setTour(null);
  }, []);
  const startTour = useCallback(() => {
    tourDemoedRef.current = null;
    setTour(0);
  }, []);
  const TOUR_STEPS = [
    {
      text: "hi. i'm your pet. i live in your bb now.",
      demo: () => {
        momentRef.current = { state: "wave", until: Date.now() + 1500 };
        sounds.greet();
      }
    },
    { text: "right-click me for everything \u2014 missions, treats, my size, naps." },
    {
      text: "\u2318-click anywhere on the floor and i'll walk there.",
      demo: () => {
        const x3 = posRef.current.x ?? 0;
        walkTo(x3 + (x3 < window.innerWidth / 2 ? 220 : -220));
      }
    },
    { text: "drag me around. toss me \u2014 real physics. drop me on a thread row to open it." },
    {
      text: "your message box is my rooftop \u2014 i hop on top, never over your typing.",
      demo: () => {
        const band = composerBands()[0];
        if (!band) return;
        walkTo((band.left + band.right) / 2 - widthRef.current / 2);
      }
    },
    { text: "when a thread needs you, i walk over and point at it. click me then and i'll take you there." },
    { text: "every 10 finished turns drops a treat i'll go eat. and there's fetch in my menu. i always win." },
    { text: "i have moods \u2014 funny, chaotic, sarcastic, helpful, cozy. tune them in my panel, plus how often i act up." },
    { text: "the paw button at the bottom of the sidebar summons my options. the Pets panel has my den, hatchery, diary, and stats." },
    {
      text: "that's the tour. back to work \u2014 both of us.",
      demo: () => celebrateTier("minor")
    }
  ];
  const TOUR_LAST = TOUR_STEPS.length - 1;
  const tourStepsRef = useRef(TOUR_STEPS);
  tourStepsRef.current = TOUR_STEPS;
  const tourArmedRef = useRef(false);
  useEffect(() => {
    if (tourArmedRef.current) return;
    try {
      if (localStorage.getItem(TOUR_KEY)) {
        tourArmedRef.current = true;
        return;
      }
    } catch {
      tourArmedRef.current = true;
      return;
    }
    if (!dataRef.current?.pet || !dataRef.current.settings.enabled) return;
    tourArmedRef.current = true;
    const id3 = setTimeout(() => setTour(0), TOUR_AUTOSTART_MS);
    return () => clearTimeout(id3);
  }, [data]);
  useEffect(() => {
    const onStart = () => startTour();
    window.addEventListener("pets:start-tour", onStart);
    return () => window.removeEventListener("pets:start-tour", onStart);
  }, [startTour]);
  useEffect(() => {
    if (tour === null) {
      tourDemoedRef.current = null;
      return;
    }
    if (tourDemoedRef.current === tour) return;
    tourDemoedRef.current = tour;
    tourStepsRef.current[tour]?.demo?.();
  }, [tour]);
  useEffect(() => {
    if (tour === null) return;
    const onKey = (event) => {
      if (event.key === "Escape") finishTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finishTour, tour]);
  useLayoutEffect(() => {
    if (tour === null) return;
    let raf = 0;
    const place = () => {
      raf = requestAnimationFrame(place);
      const node = tourCardRef.current;
      if (!node) return;
      const pos = posRef.current;
      const cardW = node.offsetWidth || 240;
      const cardH = node.offsetHeight || 96;
      const centerX = (pos.x ?? 0) + widthRef.current / 2;
      const petTop = window.innerHeight - pos.yBottom - heightRef.current;
      const maxLeft = Math.max(EDGE_MARGIN, window.innerWidth - cardW - EDGE_MARGIN);
      const left = Math.min(Math.max(centerX - cardW / 2, EDGE_MARGIN), maxLeft);
      const maxTop = Math.max(EDGE_MARGIN, window.innerHeight - cardH - EDGE_MARGIN);
      const top = petTop < window.innerHeight / 2 ? Math.min(window.innerHeight - pos.yBottom + 12, maxTop) : Math.min(Math.max(petTop - cardH - 12, EDGE_MARGIN), maxTop);
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
    };
    raf = requestAnimationFrame(place);
    return () => cancelAnimationFrame(raf);
  }, [tour]);
  const playTimeout = useCallback((fn, ms) => {
    const id3 = setTimeout(() => {
      playTimersRef.current.delete(id3);
      fn();
    }, ms);
    playTimersRef.current.add(id3);
  }, []);
  const syncTreats = useCallback(() => {
    setTreatViews(treatsRef.current.map((t2) => ({ id: t2.id, x: t2.x, yBottom: t2.yBottom })));
  }, []);
  const dropTreatAt = useCallback(
    (fraction) => {
      const maxX = Math.max(24, window.innerWidth - 48);
      const x3 = Math.min(Math.max(fraction * window.innerWidth, 24), maxX);
      const treat = {
        id: Date.now() + Math.random(),
        x: x3,
        yBottom: window.innerHeight,
        vy: 0,
        landed: false,
        bounced: false
      };
      const next = [...treatsRef.current, treat].slice(-TREAT_MAX);
      treatsRef.current = next;
      if (snackTargetRef.current !== null && !next.some((t2) => t2.id === snackTargetRef.current)) {
        snackTargetRef.current = null;
      }
      syncTreats();
      logDebug("treat", "drop");
    },
    [syncTreats]
  );
  const spawnBuffSparkle = useCallback(() => {
    const id3 = particleSeq++;
    const piece = {
      id: id3,
      dx: (Math.random() - 0.5) * 44,
      dy: -(16 + Math.random() * 28),
      char: Math.random() < 0.5 ? "\u2726" : "\u2727"
    };
    setSparkles((prev) => [...prev.slice(-8), piece]);
    playTimeout(() => setSparkles((prev) => prev.filter((s2) => s2.id !== id3)), 1400);
  }, [playTimeout]);
  const cancelFetch = useCallback(() => {
    const had = !!ballRef.current;
    ballRef.current = null;
    fetchActiveRef.current = false;
    nextChaseRef.current = 0;
    if (had) {
      walkTargetRef.current = null;
      setBallView(null);
      logDebug("fetch", "cancel");
    }
  }, []);
  const startFetch = useCallback(() => {
    if (reducedMotion || ballRef.current) return;
    const pos = posRef.current;
    const width = widthRef.current;
    const originX = pos.x ?? 0;
    const center = originX + width / 2;
    if (pos.parked) {
      pos.parked = false;
      airborneRef.current = true;
      velRef.current = { vx: 0, vy: 0 };
    }
    const direction = center < window.innerWidth / 2 ? 1 : -1;
    ballRef.current = {
      x: center - BALL_SIZE / 2,
      yBottom: pos.yBottom + heightRef.current * 0.55,
      vx: direction * (380 + Math.random() * 220),
      vy: BALL_THROW_VY,
      phase: "flying",
      originX,
      startedAt: Date.now()
    };
    fetchActiveRef.current = true;
    nextChaseRef.current = 0;
    setBallView({
      key: Date.now(),
      x: ballRef.current.x,
      yBottom: ballRef.current.yBottom,
      fading: false
    });
    sounds.boing();
    logDebug("fetch", "throw");
  }, [reducedMotion]);
  const checkLongRunners = useCallback(
    (snapshot) => {
      const now2 = Date.now();
      if (now2 - lastNudgeRef.current < LONG_RUN_NUDGE_COOLDOWN_MS) return;
      const seen = nudgedThreadsRef.current;
      for (const thread of snapshot.threads) {
        if (thread.status !== "active") continue;
        const elapsed = now2 - thread.updatedAt;
        if (elapsed <= LONG_RUN_AFTER_MS || seen.has(thread.id)) continue;
        seen.add(thread.id);
        lastNudgeRef.current = now2;
        showBubble(
          `\u201C${thread.title}\u201D has been running ${Math.round(elapsed / 6e4)}m. Just saying.`,
          { threadId: thread.id, projectId: thread.projectId }
        );
        return;
      }
    },
    [showBubble]
  );
  useEffect(() => {
    const controller = new AbortController();
    let retryTimer = null;
    let ceremonyTimer = null;
    refetch().catch(() => {
      retryTimer = setTimeout(() => {
        retryTimer = null;
        if (!controller.signal.aborted) refetchQuiet();
      }, 1500);
    });
    watchRoute((threadId) => setViewedThreadId(threadId), controller.signal);
    connectSignals({
      pluginId,
      channel: "pets",
      signal: controller.signal,
      onReconnect: refetchQuiet,
      onSignal: (payload) => {
        const signal = payload;
        lastActivityRef.current = Date.now();
        switch (signal.kind) {
          case "fleet":
            if (signal.fleet) {
              setFleet(signal.fleet);
              checkLongRunners(signal.fleet);
            }
            checkBundleStamp(payload.bundleStamp);
            break;
          // A plugin reload restarts the server without closing this socket,
          // so the boot announce is the only stamp that arrives on reload.
          case "server-boot":
            checkBundleStamp(payload.bundleStamp);
            break;
          case "job":
            jobActiveRef.current = !!payload.job;
            break;
          case "moment": {
            if (!signal.moment) break;
            logDebug("signal", signal.moment);
            if (document.hidden) {
              if (signal.moment === "celebrate") awayCountsRef.current.completed += 1;
              else if (signal.moment === "sad") awayCountsRef.current.failed += 1;
            }
            if (nappingRef.current) break;
            const behavior = dataRef.current?.settings;
            if (signal.moment === "sad") {
              if (!(behavior?.reactFailures ?? true)) break;
              momentRef.current = { state: "startled", until: Date.now() + 900 };
              setTimeout(() => {
                momentRef.current = { state: "sad", until: Date.now() + 1900 };
              }, 900);
              sounds.womp();
              if (signal.title) {
                showBubble(`\u201C${signal.title}\u201D failed. We blame the tooling.`, {
                  threadId: signal.threadId
                });
              }
            } else if (behavior?.reactTurnComplete ?? true) {
              celebrateTier("standard");
            }
            break;
          }
          case "xp": {
            if (signal.source === "turn-completed") {
              const key = (/* @__PURE__ */ new Date()).toDateString();
              const tracker = turnsTodayRef.current;
              if (tracker.key !== key) {
                tracker.key = key;
                tracker.count = 0;
              }
              tracker.count += 1;
              if (tracker.count % 10 === 0) {
                celebrateTier("major");
                showBubble(`${tracker.count} turns today. Carried.`, { important: false });
              }
            }
            setData((prev) => {
              if (!prev?.pet || prev.pet.id !== signal.petId) return prev;
              return {
                ...prev,
                pet: {
                  ...prev.pet,
                  xp: signal.xp ?? prev.pet.xp,
                  stage: signal.stageName ? {
                    ...prev.pet.stage,
                    index: signal.stageIndex ?? prev.pet.stage.index,
                    name: signal.stageName
                  } : prev.pet.stage
                }
              };
            });
            if (signal.evolved && signal.stageName) {
              if (ceremonyTimer) clearTimeout(ceremonyTimer);
              ceremonyTimer = setTimeout(() => {
                ceremonyTimer = null;
                void refetch().then((next) => {
                  if (controller.signal.aborted || !next.pet) return;
                  if (!(next.settings.evolutionCeremony ?? true)) return;
                  setCeremony({
                    name: next.pet.name,
                    stageName: next.pet.stage.name,
                    epithet: next.pet.stage.epithet,
                    key: Date.now()
                  });
                }).catch(() => {
                });
              }, 800);
            }
            if (signal.evolved && signal.stageName && (dataRef.current?.settings.evolutionCeremony ?? true)) {
              momentRef.current = { state: "dance", until: Date.now() + 4200 };
              setEvolving(true);
              setTimeout(() => setEvolving(false), 4200);
              burstSparkles();
              burstConfetti();
              hop(300);
              sounds.evolve();
              const stageName = signal.stageName;
              setTimeout(
                () => showBubble(`Evolved. ${stageName} now. Act natural.`, { important: true }),
                700
              );
            } else if (typeof signal.amount === "number" && signal.amount >= 10 && (dataRef.current?.settings.xpMotes ?? true)) {
              const id3 = particleSeq++;
              setMotes((prev) => [...prev.slice(-3), { id: id3, text: `+${signal.amount}` }]);
              setTimeout(() => setMotes((prev) => prev.filter((m3) => m3.id !== id3)), 1500);
            }
            break;
          }
          case "glowup-available":
            if (signal.stageName && !bubbleVisibleRef.current) {
              showBubble(`i can look like a proper ${signal.stageName} now. glow up is in my menu.`, {
                important: false
              });
            }
            break;
          case "treat-earned":
            if (typeof signal.balance === "number") setTreatBalance(signal.balance);
            if (!bubbleVisibleRef.current) showBubble("treat earned. i saw it first.");
            break;
          case "treat-drop": {
            if (typeof signal.balance === "number") setTreatBalance(signal.balance);
            const fraction = typeof signal.x === "number" ? signal.x : Math.random();
            dropTreatAt(fraction);
            break;
          }
          case "hatched":
            sounds.hatch();
            burstSparkles();
            refetchQuiet();
            break;
          case "evolved-art":
          case "pet-changed":
          case "settings-changed":
            refetchQuiet();
            break;
          default:
            break;
        }
      }
    });
    return () => {
      controller.abort();
      if (retryTimer) clearTimeout(retryTimer);
      if (ceremonyTimer) clearTimeout(ceremonyTimer);
    };
  }, [
    burstConfetti,
    burstSparkles,
    celebrateTier,
    checkBundleStamp,
    checkLongRunners,
    dropTreatAt,
    hop,
    pluginId,
    refetch,
    refetchQuiet,
    showBubble
  ]);
  useEffect(() => {
    const onPreview = () => {
      const current = dataRef.current?.pet;
      if (!current) return;
      logDebug("ceremony", "preview");
      setCeremony({
        name: current.name,
        stageName: current.stage.name,
        epithet: current.stage.epithet,
        key: Date.now()
      });
    };
    window.addEventListener("pets:preview-ceremony", onPreview);
    return () => window.removeEventListener("pets:preview-ceremony", onPreview);
  }, []);
  const artKey = data?.pet ? `${data.pet.id}:${data.pet.artStage}` : null;
  useEffect(() => {
    atlasRef.current = data?.pet?.atlas ?? null;
  }, [artKey]);
  useEffect(() => {
    if (!data?.pet) return;
    const images = /* @__PURE__ */ new Map();
    for (const state of Object.keys(data.pet.atlas.states)) {
      const img = new Image();
      img.src = `${data.pet.spriteBaseUrl}&state=${state}`;
      images.set(state, img);
    }
    imagesRef.current = images;
    paintedRef.current.state = null;
  }, [artKey, data?.pet?.spriteBaseUrl]);
  useEffect(() => {
    momentRef.current = { state: "wave", until: Date.now() + 2400 };
    sounds.greet();
    const timer = setTimeout(() => showBubble("Reporting for duty."), 900);
    return () => clearTimeout(timer);
  }, [showBubble]);
  useEffect(() => {
    const unlock = () => unlockSounds();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);
  useEffect(() => {
    const onResize = () => {
      setCompact(window.innerWidth < 768);
      const pos = posRef.current;
      pos.yBottom = Math.min(pos.yBottom, Math.max(GROUND_PX, window.innerHeight - 120));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    const onFocusIn = (event) => {
      const target = event.target;
      composerFocusedRef.current = !!target?.closest?.('textarea, [contenteditable="true"]');
    };
    const onFocusOut = () => {
      composerFocusedRef.current = false;
    };
    window.addEventListener("focusin", onFocusIn);
    window.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("focusout", onFocusOut);
    };
  }, []);
  useEffect(() => {
    const onKeydown = (event) => {
      if (!(dataRef.current?.settings.typingGlance ?? true)) return;
      const target = event.target;
      if (!target?.closest?.('[contenteditable="true"], textarea')) return;
      const now2 = Date.now();
      if (now2 - lastGlanceRef.current < GLANCE_COOLDOWN_MS) return;
      const current = stateRef.current;
      if (current !== "idle" && current !== "walk" && current !== "sleep") return;
      lastGlanceRef.current = now2;
      momentRef.current = { state: "think", until: now2 + 1600 };
    };
    window.addEventListener("keydown", onKeydown, true);
    return () => window.removeEventListener("keydown", onKeydown, true);
  }, []);
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        awaySinceRef.current = Date.now();
        awayCountsRef.current = { completed: 0, failed: 0 };
        return;
      }
      const since = awaySinceRef.current;
      awaySinceRef.current = null;
      const { completed, failed } = awayCountsRef.current;
      awayCountsRef.current = { completed: 0, failed: 0 };
      if (!since || Date.now() - since <= AWAY_DIGEST_MIN_MS) return;
      if (completed === 0 && failed === 0) return;
      showBubble(
        `While you were away: ${completed} turn${completed === 1 ? "" : "s"} finished${failed ? `, ${failed} failed` : ""}.`,
        { important: true }
      );
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [showBubble]);
  useEffect(() => {
    const onClick = (event) => {
      if (!event.metaKey && !event.ctrlKey) return;
      const target = event.target;
      if (!target || typeof target.closest !== "function") return;
      if (target.closest("[data-sidebar-thread-id]")) return;
      if (anchorRef.current?.contains(target)) return;
      if (target.closest("[data-radix-popper-content-wrapper], [role='menu']")) return;
      event.preventDefault();
      event.stopPropagation();
      walkTo(event.clientX - widthRef.current / 2);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [walkTo]);
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let timer;
    const schedule = () => {
      timer = setTimeout(fire, (25 + Math.random() * 15) * 6e4);
    };
    const fire = () => {
      if (cancelled) return;
      if (document.hidden || !dataRef.current?.pet || !dataRef.current.settings.enabled) {
        schedule();
        return;
      }
      void rpc(pluginId, "listDen").then((result) => {
        if (cancelled) return;
        const others = result.pets.filter((entry) => !entry.active);
        const pick = others[Math.floor(Math.random() * others.length)];
        if (!pick) return;
        const direction = cameoDirectionRef.current;
        cameoDirectionRef.current = direction === 1 ? -1 : 1;
        setVisitor({ pet: pick, direction });
      }).catch(() => {
      }).finally(() => {
        if (!cancelled) schedule();
      });
    };
    schedule();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pluginId, reducedMotion]);
  useEffect(() => {
    if (!bubble) return;
    const timer = setTimeout(() => setBubble(null), Math.max(0, bubble.until - Date.now()));
    return () => clearTimeout(timer);
  }, [bubble]);
  useLayoutEffect(() => {
    if (!bubble) {
      setBubbleFit(null);
      return;
    }
    const el = bubbleElRef.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    const petX = posRef.current.x ?? 0;
    const petWidth = widthRef.current;
    const naturalLeft = bubble.side === "left" ? petX : petX + petWidth - width;
    const minLeft = BUBBLE_EDGE_PAD;
    const maxLeft = Math.max(minLeft, window.innerWidth - BUBBLE_EDGE_PAD - width);
    const left = Math.min(Math.max(naturalLeft, minLeft), maxLeft);
    const petCenter = petX + petWidth / 2;
    const side = left === naturalLeft ? bubble.side : petCenter - left > width / 2 ? "right" : "left";
    setBubbleFit({ side, left: left - petX });
  }, [bubble]);
  useEffect(() => {
    if (!highlight) return;
    const timer = setTimeout(() => {
      setHighlight((current) => {
        if (current && current.key === highlight.key) {
          lastHighlightRectRef.current = null;
          return null;
        }
        return current;
      });
    }, POINT_MS + 2500);
    return () => clearTimeout(timer);
  }, [highlight]);
  useEffect(() => {
    if (!fleet) return;
    const now2 = Date.now();
    for (const id3 of [...pointedMemoryRef.current.keys()]) {
      const thread = fleet.threads.find((t2) => t2.id === id3);
      if (!thread || !(thread.waiting || thread.status === "failed")) {
        pointedMemoryRef.current.delete(id3);
      }
    }
    const recentlyPointed = (id3) => {
      const stamp = pointedMemoryRef.current.get(id3);
      return stamp !== void 0 && now2 - stamp < POINTED_MEMORY_MS;
    };
    const waiting = fleet.counts.waiting;
    const grew = waiting > prevWaitingRef.current;
    prevWaitingRef.current = waiting;
    if (waiting === 0 || !grew) return;
    sounds.alert();
    const target = fleet.threads.find((t2) => t2.waiting && !recentlyPointed(t2.id));
    if ((dataRef.current?.settings.pointing ?? true) && target && !document.hidden && now2 - lastAutoPointRef.current > AUTO_POINT_COOLDOWN_MS) {
      lastAutoPointRef.current = now2;
      pointedMemoryRef.current.set(target.id, now2);
      startMission(target);
    } else {
      showBubble(
        waiting === 1 ? "One thread is waiting on you. I'm just waiting in general." : `${waiting} threads are waiting on you.`,
        { threadId: target?.id, projectId: target?.projectId }
      );
    }
  }, [fleet, showBubble, startMission]);
  const sustained = useCallback((family, state) => {
    const now2 = Date.now();
    const map = sustainRef.current;
    let entry = map.get(family);
    if (!entry) {
      entry = {
        holdUntil: now2 + SUSTAIN_HOLD_MS,
        nextRemindAt: now2 + SUSTAIN_HOLD_MS + SUSTAIN_CALM_MS
      };
      map.set(family, entry);
    }
    if (now2 < entry.holdUntil) return state;
    if (now2 >= entry.nextRemindAt) {
      entry.holdUntil = now2 + SUSTAIN_REMIND_MS;
      entry.nextRemindAt = now2 + SUSTAIN_REMIND_MS + SUSTAIN_CALM_MS;
      return state;
    }
    return null;
  }, []);
  const deriveState = useCallback(() => {
    const now2 = Date.now();
    if (nappingRef.current) return "sleep";
    if (airborneRef.current) return "jump";
    const mission = missionRef.current;
    if (mission) return mission.phase === "walk" ? "walk" : "point";
    const moment = momentRef.current;
    if (moment && now2 < moment.until) return moment.state;
    if (ledgeClimbRef.current) return "jump";
    if ((zoomiesRef.current > 0 || fetchActiveRef.current) && walkTargetRef.current !== null) {
      return "run";
    }
    if (walkTargetRef.current !== null && !missionRef.current) return "walk";
    const candidates = candidatesRef.current;
    candidates.length = 0;
    const settings = dataRef.current?.settings;
    if (jobActiveRef.current && (settings?.digWhileGenerating ?? true)) {
      candidates.push(["job", "dig"]);
    }
    const currentFleet = fleetRef.current;
    const reactivity = settings?.reactivity ?? "hybrid";
    const viewed = viewedRef.current && reactivity !== "aggregate" ? currentFleet?.threads.find((t2) => t2.id === viewedRef.current) : void 0;
    if (viewed) {
      if (viewed.waiting) {
        candidates.push(["viewed-waiting", "waiting"]);
      } else if (viewed.status === "failed" && (settings?.reactFailures ?? true)) {
        candidates.push(["viewed-failed", "sad"]);
      } else if (viewed.status === "active") {
        candidates.push(["viewed-active", "think"]);
      }
    }
    if (!viewed && reactivity !== "viewed-thread" && currentFleet) {
      if (currentFleet.mood === "waiting") {
        candidates.push(["fleet-waiting", "waiting"]);
      } else if (currentFleet.mood === "failed" && (settings?.reactFailures ?? true)) {
        candidates.push(["fleet-failed", currentFleet.counts.failed >= 3 ? "grumpy" : "sad"]);
      } else if (currentFleet.mood === "active") {
        candidates.push(["fleet-active", currentFleet.counts.active >= 3 ? "run" : "walk"]);
      }
    }
    for (const key of [...sustainRef.current.keys()]) {
      if (!candidates.some(([family]) => family === key)) sustainRef.current.delete(key);
    }
    for (const [family, state] of candidates) {
      const s2 = sustained(family, state);
      if (s2) return s2;
    }
    if (now2 - lastActivityRef.current > SLEEP_AFTER_MS) return "sleep";
    if (posRef.current.parked) return "sit";
    return roamRef.current.mode === "stroll" ? "walk" : "idle";
  }, [sustained]);
  useEffect(() => {
    if (!data?.pet || !data.settings.enabled) return;
    let raf = 0;
    let lastTick = performance.now();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let fpsSince = performance.now();
    let framesSeen = 0;
    let ticksRun = 0;
    let idleFrames = 0;
    const tick = (now2) => {
      raf = requestAnimationFrame(tick);
      framesSeen += 1;
      if (now2 - fpsSince >= 1e3) {
        const span = (now2 - fpsSince) / 1e3;
        fpsRef.current = {
          fps: Math.round(framesSeen / span),
          tickFps: Math.round(ticksRun / span)
        };
        fpsSince = now2;
        framesSeen = 0;
        ticksRun = 0;
      }
      if (document.hidden) {
        lastTick = now2;
        return;
      }
      const currentMoment = momentRef.current;
      const motionless = !missionRef.current && walkTargetRef.current === null && !airborneRef.current && !(currentMoment && Date.now() < currentMoment.until) && !dragRef.current && !ledgeSteppingRef.current && zoomiesRef.current === 0 && // A ball in play, a treat still falling, or a live buff all animate
      // something on screen even while the pet itself is standing still.
      !ballRef.current && !fetchActiveRef.current && Date.now() >= buffUntilRef.current && !treatsRef.current.some((t2) => !t2.landed) && IDLE_SKIP_STATES.has(stateRef.current) && paintedRef.current.frame === frameRef.current;
      if (motionless) {
        idleFrames += 1;
        if (idleFrames % IDLE_FRAME_DIVISOR !== 0) return;
      } else {
        idleFrames = 0;
      }
      ticksRun += 1;
      const dt = Math.min(0.05, (now2 - lastTick) / 1e3);
      lastTick = now2;
      const atlas = atlasRef.current;
      if (!atlas) return;
      if (!dataRef.current?.settings.enabled) return;
      const mission = missionRef.current;
      if (mission) {
        const live = fleetRef.current?.threads.find((t2) => t2.id === mission.thread.id);
        const resolved = !!live && !(live.waiting || live.status === "failed");
        const gone = !document.contains(mission.element) || Date.now() > mission.until || resolved;
        if (gone) {
          logDebug("mission", resolved ? "end: resolved" : "end: gone");
          missionRef.current = null;
          lastHighlightRectRef.current = null;
          setHighlight(null);
        }
      }
      if (!reducedMotion && (dataRef.current?.settings.idleQuirks ?? true) && Date.now() > nextQuirkRef.current && stateRef.current === "idle" && !missionRef.current && !airborneRef.current) {
        nextQuirkRef.current = Date.now() + QUIRK_EVERY_MS + Math.random() * 14e3;
        momentRef.current = {
          state: Math.random() < 0.35 ? "wave" : "think",
          until: Date.now() + 1700
        };
      }
      let nextState = deriveState();
      nextState = resolveState(atlas.states, nextState);
      if (nextState !== stateRef.current) {
        if (prevStateRef.current === "sleep" && nextState !== "sleep" && !reducedMotion) {
          momentRef.current = { state: "stretch", until: Date.now() + 1200 };
          nextState = resolveState(atlas.states, "stretch");
        }
        logDebug("state", `${stateRef.current}\u2192${nextState}`);
        prevStateRef.current = nextState;
        stateRef.current = nextState;
        frameRef.current = 0;
        rawFrameRef.current = 0;
        frameClockRef.current = 0;
        setSpriteState(nextState);
        if (!reducedMotion && (nextState === "celebrate" || nextState === "point" || nextState === "waiting")) {
          pulseClass("pets-land", 200);
        }
      }
      const spec = atlas.states[nextState] ?? atlas.states.idle ?? Object.values(atlas.states)[0];
      if (!spec) return;
      if (!reducedMotion) {
        frameClockRef.current += dt * spec.fps;
        if (frameClockRef.current >= 1) {
          frameClockRef.current %= 1;
          const raw = rawFrameRef.current + 1;
          rawFrameRef.current = raw;
          frameRef.current = nextFrame(raw, spec, nextState);
          if (nextState === "walk" || nextState === "run") {
            stepParityRef.current ^= 1;
            if (stepParityRef.current === 0 && !document.hidden && !nappingRef.current) {
              sounds.step();
            }
          } else {
            stepParityRef.current = 0;
          }
        }
      }
      const img = imagesRef.current.get(nextState);
      const ready = !!img && img.complete && img.naturalWidth > 0;
      const srcCellW = ready ? Math.floor(img.naturalWidth / spec.frames) : spec.width / spec.frames;
      const srcH = ready ? img.naturalHeight : spec.height;
      const petScale = dataRef.current?.pet?.sizeScale ?? 1;
      const charTarget = BASE_CHAR_HEIGHT * petScale;
      const { width, height } = charGeometry(atlas, spec, srcCellW, charTarget);
      widthRef.current = width;
      heightRef.current = height;
      const speedFactor = WALK_SPEEDS[dataRef.current?.settings.walkSpeed ?? "normal"] ?? 1;
      const pos = posRef.current;
      const vel = velRef.current;
      const minX = EDGE_MARGIN;
      const maxX = Math.max(minX, window.innerWidth - width - EDGE_MARGIN);
      if (pos.x === null) pos.x = Math.min(maxX, window.innerWidth * 0.12);
      const frozen = menuOpenRef.current || !!dragRef.current;
      if (airborneRef.current && !dragRef.current) {
        vel.vy -= GRAVITY * dt;
        pos.yBottom += vel.vy * dt;
        pos.x += vel.vx * dt;
        tiltRef.current = Math.max(-0.34, Math.min(0.34, vel.vx * 45e-5));
        if (pos.x <= minX || pos.x >= maxX) {
          pos.x = Math.min(Math.max(pos.x, minX), maxX);
          vel.vx = -vel.vx * WALL_BOUNCE;
        }
        const floor = terrainAt(pos.x + width / 2);
        if (pos.yBottom <= floor) {
          pos.yBottom = floor;
          if (Math.abs(vel.vy) > SETTLE_VY) {
            sounds.boing();
            pulseClass("pets-land", 200);
            vel.vy = -vel.vy * FLOOR_BOUNCE;
            vel.vx *= 0.72;
          } else {
            airborneRef.current = false;
            vel.vx = 0;
            vel.vy = 0;
            tiltRef.current = 0;
            pulseClass("pets-land", 200);
            persistPrefs();
          }
        }
      } else if (!airborneRef.current) {
        tiltRef.current = 0;
        if (!pos.parked && !dragRef.current && !nappingRef.current) {
          const targetElev = terrainAt(pos.x + width / 2);
          if (pos.yBottom !== targetElev) {
            const rising = targetElev > pos.yBottom;
            if (!ledgeSteppingRef.current) {
              ledgeSteppingRef.current = true;
              logDebug("terrain", `\u2192${Math.round(targetElev)}`);
              if (rising && !reducedMotion) {
                momentRef.current = { state: "jump", until: Date.now() + 260 };
                if (Date.now() - ledgeBoingRef.current > LEDGE_BOING_COOLDOWN_MS) {
                  ledgeBoingRef.current = Date.now();
                  sounds.boing();
                }
              }
            }
            const step = LEDGE_CLIMB_SPEED * dt;
            pos.yBottom = rising ? Math.min(targetElev, pos.yBottom + step) : Math.max(targetElev, pos.yBottom - step);
            if (pos.yBottom === targetElev) {
              ledgeSteppingRef.current = false;
              pulseClass("pets-land", 200);
            }
          } else {
            ledgeSteppingRef.current = false;
          }
          ledgeClimbRef.current = Math.abs(pos.yBottom - targetElev) > 4;
        } else {
          ledgeSteppingRef.current = false;
          ledgeClimbRef.current = false;
        }
      } else {
        ledgeSteppingRef.current = false;
        ledgeClimbRef.current = false;
      }
      pos.x = Math.min(Math.max(pos.x, minX), maxX);
      const playNow = Date.now();
      const treats = treatsRef.current;
      if (missionRef.current) {
        snackTargetRef.current = null;
        if (ballRef.current) cancelFetch();
      }
      for (const treat of treats) {
        if (treat.landed) continue;
        treat.vy -= TREAT_GRAVITY * dt;
        treat.yBottom += treat.vy * dt;
        const rest = terrainAt(treat.x + TREAT_SIZE / 2);
        if (treat.yBottom <= rest) {
          treat.yBottom = rest;
          if (!treat.bounced && Math.abs(treat.vy) > 120) {
            treat.bounced = true;
            treat.vy *= TREAT_BOUNCE;
          } else {
            treat.vy = 0;
            treat.landed = true;
          }
        }
      }
      const playMoment = momentRef.current;
      const petFree = !missionRef.current && !airborneRef.current && !pos.parked && !nappingRef.current && !dragRef.current && !menuOpenRef.current && !(playMoment && playNow < playMoment.until);
      if (treats.length > 0 && !ballRef.current) {
        let target = null;
        if (snackTargetRef.current !== null) {
          target = treats.find((t2) => t2.id === snackTargetRef.current) ?? null;
          if (!target) snackTargetRef.current = null;
        }
        if (!target && petFree && walkTargetRef.current === null) {
          const center = pos.x + width / 2;
          let bestDistance = Number.POSITIVE_INFINITY;
          for (const treat of treats) {
            if (!treat.landed) continue;
            const distance2 = Math.abs(treat.x + TREAT_SIZE / 2 - center);
            if (distance2 < bestDistance) {
              bestDistance = distance2;
              target = treat;
            }
          }
          if (target) snackTargetRef.current = target.id;
        }
        if (target && target.landed && petFree) {
          const treatCenter = target.x + TREAT_SIZE / 2;
          if (Math.abs(pos.x + width / 2 - treatCenter) < TREAT_REACH_PX) {
            const eaten = target;
            treatsRef.current = treats.filter((t2) => t2.id !== eaten.id);
            treatElsRef.current.delete(eaten.id);
            snackTargetRef.current = null;
            walkTargetRef.current = null;
            momentRef.current = { state: "love", until: playNow + 1200 };
            burstHearts();
            burstSparkles();
            sounds.pet();
            buffUntilRef.current = playNow + TREAT_BUFF_MS;
            nextBuffSparkleRef.current = playNow;
            void looseRpc(pluginId, "eatTreat").catch(() => {
            });
            syncTreats();
            logDebug("treat", "eaten");
          } else {
            facingRef.current = treatCenter >= pos.x + width / 2 ? 1 : -1;
            walkTargetRef.current = Math.min(Math.max(treatCenter - width / 2, minX), maxX);
          }
        }
      }
      for (const treat of treatsRef.current) {
        const node = treatElsRef.current.get(treat.id);
        if (node) {
          node.style.transform = `translate(${treat.x}px, ${-(treat.yBottom - GROUND_PX)}px)`;
        }
      }
      if (!reducedMotion && playNow < buffUntilRef.current && !nappingRef.current && playNow >= nextBuffSparkleRef.current) {
        nextBuffSparkleRef.current = playNow + BUFF_SPARKLE_MS;
        spawnBuffSparkle();
      }
      const ball = ballRef.current;
      if (ball) {
        const ballMinX = EDGE_MARGIN;
        const ballMaxX = Math.max(ballMinX, window.innerWidth - EDGE_MARGIN - BALL_SIZE);
        if (ball.phase === "flying") {
          ball.vy -= GRAVITY * dt;
          ball.x += ball.vx * dt;
          ball.yBottom += ball.vy * dt;
          if (ball.x <= ballMinX || ball.x >= ballMaxX) {
            ball.x = Math.min(Math.max(ball.x, ballMinX), ballMaxX);
            ball.vx = -ball.vx * WALL_BOUNCE;
          }
          const rest = terrainAt(ball.x + BALL_SIZE / 2);
          if (ball.yBottom <= rest) {
            ball.yBottom = rest;
            if (Math.abs(ball.vy) > SETTLE_VY) {
              ball.vy = -ball.vy * FLOOR_BOUNCE;
              ball.vx *= 0.8;
            } else {
              ball.vy = 0;
              ball.phase = "rolling";
            }
          }
        } else if (ball.phase === "rolling") {
          ball.x += ball.vx * dt;
          ball.vx *= Math.pow(BALL_FRICTION, dt * 60);
          if (Math.abs(ball.vx) < BALL_STOP_VX) ball.vx = 0;
          if (ball.x <= ballMinX || ball.x >= ballMaxX) {
            ball.x = Math.min(Math.max(ball.x, ballMinX), ballMaxX);
            ball.vx = -ball.vx * WALL_BOUNCE;
          }
          ball.yBottom = terrainAt(ball.x + BALL_SIZE / 2);
        } else if (ball.phase === "carried") {
          ball.x = pos.x + width / 2 - BALL_SIZE / 2;
          ball.yBottom = pos.yBottom + height * 0.9;
        }
        if (ball.phase === "flying" || ball.phase === "rolling") {
          if (playNow - ball.startedAt > FETCH_TIMEOUT_MS) {
            cancelFetch();
          } else if (petFree) {
            const ballCenter = ball.x + BALL_SIZE / 2;
            if (playNow >= nextChaseRef.current) {
              nextChaseRef.current = playNow + BALL_CHASE_MS;
              walkTargetRef.current = Math.min(Math.max(ballCenter - width / 2, minX), maxX);
            }
            const grounded = ball.phase === "rolling" || ball.yBottom <= terrainAt(ballCenter) + 2;
            if (grounded && Math.abs(pos.x + width / 2 - ballCenter) < BALL_CATCH_PX) {
              ball.phase = "carried";
              ball.vx = 0;
              ball.vy = 0;
              nextChaseRef.current = 0;
              sounds.pet();
              walkTargetRef.current = Math.min(Math.max(ball.originX, minX), maxX);
              logDebug("fetch", "caught");
            }
          }
        } else if (ball.phase === "carried" && walkTargetRef.current === null && petFree) {
          ball.phase = "done";
          ball.x = pos.x + width / 2 - BALL_SIZE / 2;
          ball.yBottom = terrainAt(pos.x + width / 2);
          fetchActiveRef.current = false;
          celebrateTier("minor");
          void looseRpc(pluginId, "recordFetch").catch(() => {
          });
          if (Math.random() < 0.3) showBubble("again.");
          const restX = ball.x;
          const restY = ball.yBottom;
          setBallView(
            (prev) => prev ? { ...prev, x: restX, yBottom: restY, fading: true } : prev
          );
          playTimeout(() => {
            if (ballRef.current?.phase === "done") ballRef.current = null;
            setBallView(null);
          }, BALL_FADE_MS);
          logDebug("fetch", "returned");
        }
        const ballNode = ballElRef.current;
        if (ballNode) {
          ballNode.style.transform = `translate(${ball.x}px, ${-(ball.yBottom - GROUND_PX)}px)`;
        }
      }
      const active = missionRef.current;
      if (!frozen && !airborneRef.current && active) {
        const nowMs = Date.now();
        let ended = nowMs > active.until;
        if (!ended && (!active.lastQueryAt || nowMs - active.lastQueryAt > 200)) {
          const fresh = threadRowFor(active.thread.id);
          if (!fresh) ended = true;
          else {
            active.element = fresh;
            active.lastQueryAt = nowMs;
          }
        }
        if (ended) {
          logDebug("mission", "end: timeout");
          missionRef.current = null;
          lastHighlightRectRef.current = null;
          setHighlight(null);
        } else {
          const rect = active.element.getBoundingClientRect();
          const targetX = Math.min(Math.max(rect.left + rect.width * 0.3 - width / 2, minX), maxX);
          if (active.phase === "walk") {
            const dx = targetX - pos.x;
            const step = 130 * speedFactor * dt;
            if (Math.abs(dx) <= step + 2) {
              pos.x = targetX;
              active.phase = "point";
              active.until = Date.now() + POINT_MS;
              if (!active.arrived) {
                active.arrived = true;
                hop(190);
                sounds.alert();
              }
              const arrivedRect = {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height
              };
              lastHighlightRectRef.current = arrivedRect;
              setHighlight({ rect: arrivedRect, key: Date.now() });
              showBubble(
                `\u201C${active.thread.title}\u201D ${active.thread.waiting ? "is waiting on you" : "failed"}.`,
                {
                  threadId: active.thread.id,
                  projectId: active.thread.projectId,
                  important: true
                }
              );
            } else {
              const dir = Math.sign(dx);
              if (dir !== facingRef.current) pulseClass("pets-turn", 160);
              pos.x += dir * step;
              facingRef.current = dir;
            }
          } else {
            const previous = lastHighlightRectRef.current;
            const moved = !previous || Math.abs(previous.left - rect.left) > 1 || Math.abs(previous.top - rect.top) > 1 || Math.abs(previous.width - rect.width) > 1 || Math.abs(previous.height - rect.height) > 1;
            if (moved) {
              const next = {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height
              };
              lastHighlightRectRef.current = next;
              setHighlight((prev) => prev ? { ...prev, rect: next } : prev);
            }
            facingRef.current = rect.left + rect.width / 2 >= pos.x + width / 2 ? 1 : -1;
          }
        }
      } else if (
        // --- explicit destination ("Send to…" / ⌘-click) beats roaming ---
        !frozen && !airborneRef.current && !pos.parked && !nappingRef.current && walkTargetRef.current !== null
      ) {
        const target = Math.min(Math.max(walkTargetRef.current, minX), maxX);
        const dx = target - pos.x;
        const boost = zoomiesRef.current > 0 ? ZOOMIES_BOOST : fetchActiveRef.current ? FETCH_BOOST : 1;
        const step = WALK_TO_SPEED * speedFactor * boost * dt;
        if (Math.abs(dx) <= 6) {
          pos.x = target;
          walkTargetRef.current = null;
          speedRef.current = 0;
          pulseClass("pets-land", 200);
          persistPrefs();
        } else {
          const dir = Math.sign(dx);
          if (dir !== facingRef.current) pulseClass("pets-turn", 160);
          pos.x += dir * step;
          facingRef.current = dir;
        }
      } else if (!frozen && !airborneRef.current && !pos.parked && (dataRef.current?.settings.roaming ?? true) && (nextState === "idle" || nextState === "walk") && !reducedMotion) {
        const roam = roamRef.current;
        const hustling = nextState === "walk" && roam.mode !== "stroll";
        if (now2 >= roam.until) {
          let nextDirection = Math.random() < 0.5 ? -1 : 1;
          roam.mode = roam.mode === "stroll" ? "pause" : "stroll";
          if (roam.mode === "pause" && terrainAt(pos.x + width / 2) > GROUND_PX) {
            const center = pos.x + width / 2;
            roam.mode = "stroll";
            nextDirection = nudgeOffLedge(center) < center ? -1 : 1;
          }
          if (roam.mode === "stroll" && nextDirection !== roam.direction) {
            pulseClass("pets-turn", 160);
          }
          roam.direction = nextDirection;
          roam.until = now2 + (roam.mode === "stroll" ? 1800 + Math.random() * 2600 : 2200 + Math.random() * 4800);
        }
        const targetSpeed = roam.mode === "stroll" || hustling ? (hustling ? 46 : 26) * speedFactor : 0;
        speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 6);
        if (speedRef.current > 1) {
          let next = pos.x + roam.direction * speedRef.current * dt;
          if (next <= minX || next >= maxX) {
            roam.direction = roam.direction === 1 ? -1 : 1;
            pulseClass("pets-turn", 160);
            next = Math.min(Math.max(next, minX), maxX);
          }
          pos.x = next;
          facingRef.current = roam.direction;
        }
      } else if (!active) {
        speedRef.current = 0;
      }
      const composer = composerFocusedRef.current ? focusedComposerRect() : null;
      const ghost = !!composer && pos.x + width >= composer.left - 8 && pos.x <= composer.right + 8 && // Still down at floor level, i.e. the ledge didn't lift it clear.
      pos.yBottom <= GROUND_PX + 2 && // The composer reaches down into the band the pet walks in.
      composer.bottom >= window.innerHeight - GROUND_PX - height * 1.2;
      if (ghost !== ghostRef.current) {
        ghostRef.current = ghost;
        logDebug("ghost", ghost ? "on" : "off");
        bodyRef.current?.classList.toggle("pets-ghost", ghost);
        if (ghost && composer && !missionRef.current && !dragRef.current && !airborneRef.current && !menuOpenRef.current && walkTargetRef.current === null) {
          momentRef.current = { state: "startled", until: Date.now() + 450 };
          const leftSide = composer.left - width - 24;
          const rightSide = composer.right + 24;
          const near = Math.abs(leftSide - pos.x) <= Math.abs(rightSide - pos.x) ? leftSide : rightSide;
          const far = near === leftSide ? rightSide : leftSide;
          const clamped = Math.min(Math.max(near, minX), maxX);
          const stillOnIt = clamped >= composer.left - width - COMPOSER_PAD && clamped <= composer.right + COMPOSER_PAD;
          walkTargetRef.current = Math.min(Math.max(stillOnIt ? far : clamped, minX), maxX);
        }
      }
      const bob = !reducedMotion && nextState === "walk" && !airborneRef.current ? -Math.abs(Math.sin((frameRef.current + frameClockRef.current) / spec.frames * Math.PI * 2)) * 2.2 : 0;
      const canvas = canvasRef.current;
      const anchor = anchorRef.current;
      if (canvas && anchor) {
        const painted = paintedRef.current;
        const tilt = Math.round(tiltRef.current * 50) / 50;
        const dirty = painted.state !== nextState || painted.frame !== frameRef.current || painted.facing !== facingRef.current || painted.tilt !== tilt || painted.scale !== charTarget;
        if (dirty && ready) {
          const pxW = Math.max(1, Math.round(width * dpr));
          const pxH = Math.max(1, Math.round(height * dpr));
          if (canvas.width !== pxW || canvas.height !== pxH) {
            canvas.width = pxW;
            canvas.height = pxH;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
          }
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, pxW, pxH);
            ctx.translate(pxW / 2, pxH);
            ctx.rotate(tilt);
            ctx.scale(facingRef.current, 1);
            ctx.drawImage(img, frameRef.current * srcCellW, 0, srcCellW, srcH, -pxW / 2, -pxH, pxW, pxH);
            painted.state = nextState;
            painted.frame = frameRef.current;
            painted.facing = facingRef.current;
            painted.tilt = tilt;
            painted.scale = charTarget;
          }
        }
        const y3 = -(pos.yBottom - GROUND_PX) + bob;
        if (painted.x !== pos.x || painted.y !== y3) {
          anchor.style.transform = `translate(${pos.x}px, ${y3}px)`;
          painted.x = pos.x;
          painted.y = y3;
        }
      }
    };
    const onLoopVisibility = () => {
      if (document.hidden) {
        if (loopPausedRef.current) return;
        loopPausedRef.current = true;
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      if (!loopPausedRef.current) return;
      loopPausedRef.current = false;
      lastTick = performance.now();
      fpsSince = performance.now();
      framesSeen = 0;
      ticksRun = 0;
      idleFrames = 0;
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onLoopVisibility);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("visibilitychange", onLoopVisibility);
      loopPausedRef.current = false;
      cancelAnimationFrame(raf);
    };
  }, [
    data?.pet?.id,
    data?.pet?.artStage,
    data?.settings.enabled,
    burstHearts,
    burstSparkles,
    cancelFetch,
    celebrateTier,
    deriveState,
    hop,
    nudgeOffLedge,
    persistPrefs,
    playTimeout,
    pluginId,
    pulseClass,
    reducedMotion,
    showBubble,
    spawnBuffSparkle,
    syncTreats,
    terrainAt
  ]);
  const devMode = data?.settings.devMode ?? false;
  useEffect(() => {
    if (!devMode) return;
    const id3 = setInterval(() => {
      const pos = posRef.current;
      window.dispatchEvent(
        new CustomEvent("pets:debug-state", {
          detail: {
            state: stateRef.current,
            elev: Math.round(pos.yBottom),
            x: Math.round(pos.x ?? 0),
            act: currentActRef.current ?? null,
            fps: fpsRef.current.fps,
            // Full ticks per second: below `fps` whenever the idle throttle is
            // doing its job, equal to it whenever the pet is actually moving.
            tickFps: fpsRef.current.tickFps,
            paused: loopPausedRef.current
          }
        })
      );
    }, DEBUG_STATE_MS);
    return () => clearInterval(id3);
  }, [devMode]);
  useEffect(() => {
    const onSummon = () => {
      if (!dataRef.current?.pet || !dataRef.current.settings.enabled) return;
      if (menuOpenRef.current) {
        setMenuOpenState(false);
        return;
      }
      const body = bodyRef.current;
      if (!body) return;
      const pos = posRef.current;
      body.dispatchEvent(
        new MouseEvent("contextmenu", {
          bubbles: true,
          cancelable: true,
          clientX: (pos.x ?? 0) + widthRef.current / 2,
          clientY: window.innerHeight - pos.yBottom - heightRef.current - 8
        })
      );
    };
    window.addEventListener("pets:open-menu", onSummon);
    return () => window.removeEventListener("pets:open-menu", onSummon);
  }, []);
  useEffect(() => {
    const timers = playTimersRef.current;
    const nodes = treatElsRef.current;
    return () => {
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
      nodes.clear();
      treatsRef.current = [];
      ballRef.current = null;
      fetchActiveRef.current = false;
      snackTargetRef.current = null;
      buffUntilRef.current = 0;
    };
  }, []);
  useEffect(() => {
    const timers = /* @__PURE__ */ new Set();
    const wake = () => {
      if (!autoNapRef.current) return;
      logDebug("nap", "wake");
      autoNapRef.current = false;
      setNapping(false);
      momentRef.current = { state: "stretch", until: Date.now() + 1500 };
      const timer = setTimeout(() => {
        timers.delete(timer);
        momentRef.current = { state: "wave", until: Date.now() + 1400 };
        if (Math.random() < 0.6) showBubble("you're back. good.");
      }, 1500);
      timers.add(timer);
    };
    const onPointerMove2 = (event) => {
      lastMouseXRef.current = event.clientX;
      lastActivityRef.current = Date.now();
      wake();
    };
    const onKeydown = () => {
      lastActivityRef.current = Date.now();
      wake();
    };
    window.addEventListener("pointermove", onPointerMove2, { passive: true });
    window.addEventListener("keydown", onKeydown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove2);
      window.removeEventListener("keydown", onKeydown);
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
    };
  }, [showBubble]);
  useEffect(() => {
    const id3 = setInterval(() => {
      if (!personaRef.current.cozy || nappingRef.current || autoNapRef.current) return;
      if (!(dataRef.current?.settings.enabled ?? false)) return;
      if (Date.now() - mountedAtRef.current < AUTO_NAP_GRACE_MS) return;
      if (Date.now() - lastActivityRef.current < AUTO_NAP_AFTER_MS) return;
      if (missionRef.current || menuOpenRef.current || dragRef.current || airborneRef.current) return;
      const center = (posRef.current.x ?? 0) + widthRef.current / 2;
      if (terrainAt(center) > GROUND_PX) {
        walkTo(nudgeOffLedge(center) - widthRef.current / 2);
        return;
      }
      logDebug("nap", "auto-nap");
      autoNapRef.current = true;
      missionRef.current = null;
      lastHighlightRectRef.current = null;
      setHighlight(null);
      setNapping(true);
    }, AUTO_NAP_CHECK_MS);
    return () => clearInterval(id3);
  }, [nudgeOffLedge, terrainAt, walkTo]);
  useEffect(() => {
    if (!data?.pet || !data.settings.enabled) return;
    let cancelled = false;
    let nextTimer = null;
    const timers = /* @__PURE__ */ new Set();
    const watchers = /* @__PURE__ */ new Set();
    const sleep = (ms) => new Promise((resolve) => {
      const id3 = setTimeout(() => {
        timers.delete(id3);
        resolve();
      }, ms);
      timers.add(id3);
    });
    const bounds = () => {
      const width = widthRef.current;
      const minX = EDGE_MARGIN;
      const maxX = Math.max(minX, window.innerWidth - width - EDGE_MARGIN);
      return { width, minX, maxX };
    };
    const arrival = (timeoutMs = 25e3) => new Promise((resolve) => {
      const started = Date.now();
      const id3 = setInterval(() => {
        if (cancelled || walkTargetRef.current === null) {
          clearInterval(id3);
          watchers.delete(id3);
          resolve(!cancelled);
          return;
        }
        if (Date.now() - started > timeoutMs) {
          clearInterval(id3);
          watchers.delete(id3);
          walkTargetRef.current = null;
          resolve(false);
        }
      }, 60);
      watchers.add(id3);
    });
    const say = (text) => {
      if (tourRef.current !== null) return;
      if (bubbleVisibleRef.current) return;
      showBubble(text);
    };
    const ambientLine = async () => {
      const persona = personaRef.current;
      const flavors = ["funny", "sarcastic", "helpful", "cozy"].filter(
        (flavor) => persona[flavor]
      );
      if (flavors.length === 0) return;
      let ctx;
      try {
        ctx = readAmbient(await looseRpc(pluginId, "getAmbientContext"));
      } catch {
        return;
      }
      if (cancelled) return;
      const line = pickLine([...flavors], ctx, recentLinesRef.current);
      if (!line) return;
      recentLinesRef.current = [...recentLinesRef.current, line].slice(-RECENT_LINES);
      say(line);
    };
    const wander = async () => {
      const { minX, maxX } = bounds();
      walkToClear(randomBetween(minX, maxX));
      if (!await arrival()) return;
      if (Math.random() < 0.4) momentRef.current = { state: "sit", until: Date.now() + 4e3 };
    };
    const zoomies = async () => {
      const { minX, maxX } = bounds();
      sounds.boing();
      zoomiesRef.current = 3;
      const legs = [minX, maxX, randomBetween(minX + (maxX - minX) * 0.25, minX + (maxX - minX) * 0.75)];
      for (const leg of legs) {
        if (cancelled) break;
        walkTo(leg);
        await arrival(12e3);
        zoomiesRef.current = Math.max(0, zoomiesRef.current - 1);
        if (cancelled) break;
        await sleep(120);
      }
      zoomiesRef.current = 0;
    };
    const cursorChase = () => new Promise((resolve) => {
      const started = Date.now();
      const id3 = setInterval(() => {
        const finish = () => {
          clearInterval(id3);
          watchers.delete(id3);
          walkTargetRef.current = null;
          resolve();
        };
        const mouseX = lastMouseXRef.current;
        if (cancelled || mouseX === null) {
          finish();
          return;
        }
        const { width } = bounds();
        const petCenterX = (posRef.current.x ?? 0) + width / 2;
        if (Math.abs(petCenterX - mouseX) < 44) {
          momentRef.current = { state: "jump", until: Date.now() + 900 };
          say("gotcha.");
          sounds.pet();
          finish();
          return;
        }
        walkTo(mouseX - width / 2);
        if (Date.now() - started >= 6e3) finish();
      }, 300);
      watchers.add(id3);
    });
    const edgePeek = async () => {
      walkTo(EDGE_MARGIN);
      if (!await arrival()) return;
      pulseClass("pets-peek", 1900);
      await sleep(1900);
      if (cancelled) return;
      momentRef.current = { state: "wave", until: Date.now() + 1500 };
    };
    const sidebarDig = async () => {
      const row = document.querySelector("[data-sidebar-thread-id]");
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const { width } = bounds();
      walkToClear(rect.right + 24 - width / 2);
      if (!await arrival()) return;
      momentRef.current = { state: "dig", until: Date.now() + 2600 };
      if (Math.random() < 0.5) say("anything good in here?");
    };
    const composerWatch = async () => {
      const rect = composerRect();
      if (!rect) return;
      const { width, minX, maxX } = bounds();
      const center = rect.left + rect.width / 2;
      const side = (posRef.current.x ?? 0) + width / 2 < center ? rect.left - width - COMPOSER_PAD : rect.right + COMPOSER_PAD;
      walkTo(Math.min(Math.max(side, minX), maxX));
      if (!await arrival()) return;
      facingRef.current = center >= (posRef.current.x ?? 0) + width / 2 ? 1 : -1;
      momentRef.current = { state: "sit", until: Date.now() + 6e3 };
    };
    const landmarks = () => {
      const found = [
        document.querySelector('[aria-label="Pets"]') ?? document.querySelector("[data-sidebar-footer]"),
        Array.from(document.querySelectorAll("nav a, nav button, [role='navigation'] a")).find(
          (el) => (el.textContent ?? "").trim() === "Pets"
        ),
        document.querySelector("[role='tablist']") ?? document.querySelector("[data-pane-header]")
      ];
      return found.filter((el) => {
        if (!el) return false;
        const node = el;
        if (node.checkVisibility ? !node.checkVisibility() : false) return false;
        const rect = node.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
    };
    const inspectChrome = async () => {
      const targets = landmarks();
      const target = targets[Math.floor(Math.random() * targets.length)];
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const { width, minX, maxX } = bounds();
      const center = rect.left + rect.width / 2;
      walkToClear(Math.min(Math.max(center - width / 2, minX), maxX));
      if (!await arrival()) return;
      facingRef.current = center >= (posRef.current.x ?? 0) + width / 2 ? 1 : -1;
      const states = atlasRef.current?.states;
      const pose = states ? resolveState(states, "point") : "wave";
      momentRef.current = { state: pose, until: Date.now() + 1800 };
      await sleep(1800);
    };
    const danceBreak = async () => {
      momentRef.current = { state: "dance", until: Date.now() + 3e3 };
      burstSparkles();
      await sleep(3e3);
    };
    const acts = [
      {
        label: "ambient-line",
        weight: 30,
        motion: false,
        enabled: (p2) => p2.funny || p2.sarcastic || p2.helpful || p2.cozy,
        run: ambientLine
      },
      { label: "wander", weight: 20, motion: true, enabled: (p2) => p2.cozy, run: wander },
      { label: "zoomies", weight: 12, motion: true, enabled: (p2) => p2.chaotic, run: zoomies },
      { label: "cursor-chase", weight: 10, motion: true, enabled: (p2) => p2.chaotic, run: cursorChase },
      { label: "edge-peek", weight: 8, motion: true, enabled: (p2) => p2.chaotic, run: edgePeek },
      {
        label: "sidebar-dig",
        weight: 8,
        motion: true,
        enabled: (p2) => p2.chaotic || p2.funny,
        run: sidebarDig
      },
      {
        label: "composer-watch",
        weight: 8,
        motion: true,
        enabled: (p2) => p2.cozy || p2.helpful,
        run: composerWatch
      },
      { label: "dance-break", weight: 6, motion: true, enabled: (p2) => p2.funny, run: danceBreak },
      {
        label: "inspect-chrome",
        weight: 6,
        motion: true,
        enabled: (p2) => p2.cozy || p2.funny,
        run: inspectChrome
      }
    ];
    const schedule = () => {
      if (cancelled) return;
      const [min, max] = DIRECTOR_RANGES[personaRef.current.level] ?? DIRECTOR_RANGES.lively;
      nextTimer = setTimeout(fire, randomBetween(min, max));
    };
    function fire() {
      nextTimer = null;
      if (cancelled) return;
      const moment = momentRef.current;
      const busy = document.hidden || !(dataRef.current?.settings.enabled ?? false) || menuOpenRef.current || !!dragRef.current || nappingRef.current || // The tour is doing its own choreography; the director waits its turn.
      tourRef.current !== null || !!missionRef.current || !!(moment && Date.now() < moment.until) || walkTargetRef.current !== null || airborneRef.current || bubbleVisibleRef.current;
      if (busy) {
        schedule();
        return;
      }
      const persona = personaRef.current;
      const pool = acts.filter(
        (act2) => act2.enabled(persona) && (!reducedMotion || !act2.motion)
      );
      const total = pool.reduce((sum, act2) => sum + act2.weight, 0);
      if (total <= 0) {
        schedule();
        return;
      }
      let roll = Math.random() * total;
      const chosen = pool.find((act2) => (roll -= act2.weight) < 0) ?? pool[0];
      if (chosen) logDebug("act", chosen.label);
      currentActRef.current = chosen?.label ?? null;
      void Promise.resolve().then(() => chosen?.run()).catch(() => {
      }).finally(() => {
        currentActRef.current = null;
        schedule();
      });
    }
    schedule();
    return () => {
      cancelled = true;
      if (nextTimer) clearTimeout(nextTimer);
      for (const timer of timers) clearTimeout(timer);
      timers.clear();
      for (const watcher of watchers) clearInterval(watcher);
      watchers.clear();
      zoomiesRef.current = 0;
      currentActRef.current = null;
    };
  }, [
    data?.pet?.id,
    data?.settings.enabled,
    burstSparkles,
    pluginId,
    pulseClass,
    reducedMotion,
    showBubble,
    walkTo,
    walkToClear
  ]);
  const onPointerDown = (event) => {
    if (event.button !== 0 || event.ctrlKey || menuOpenRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const pos = posRef.current;
    airborneRef.current = false;
    velRef.current = { vx: 0, vy: 0 };
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x ?? 0,
      originYBottom: pos.yBottom,
      moved: false,
      trail: [{ x: event.clientX, y: event.clientY, t: performance.now() }]
    };
  };
  const onPointerMove = (event) => {
    const drag2 = dragRef.current;
    if (!drag2 || drag2.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag2.startX;
    const dy = event.clientY - drag2.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      if (!drag2.moved) {
        cancelFetch();
        snackTargetRef.current = null;
      }
      drag2.moved = true;
      setGrabbed(true);
    }
    if (drag2.moved) {
      const pos = posRef.current;
      pos.x = drag2.originX + dx;
      pos.yBottom = Math.max(GROUND_PX, Math.min(window.innerHeight - 90, drag2.originYBottom - dy));
      drag2.trail.push({ x: event.clientX, y: event.clientY, t: performance.now() });
      if (drag2.trail.length > 6) drag2.trail.shift();
    }
  };
  const onPointerUp = (event) => {
    const drag2 = dragRef.current;
    if (!drag2 || drag2.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGrabbed(false);
    if (drag2.moved) {
      const pos = posRef.current;
      const row = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-sidebar-thread-id]");
      const droppedThreadId = row?.getAttribute("data-sidebar-thread-id");
      if (droppedThreadId) {
        const thread = fleetRef.current?.threads.find((t2) => t2.id === droppedThreadId);
        if (thread) navigateToThread(thread.projectId, thread.id);
        else navigateTo(`/threads/${droppedThreadId}`);
        momentRef.current = { state: "celebrate", until: Date.now() + 1400 };
        sounds.pet();
        pos.parked = false;
        pos.yBottom = GROUND_PX;
        airborneRef.current = false;
        velRef.current = { vx: 0, vy: 0 };
        tiltRef.current = 0;
        persistPrefs();
        return;
      }
      const nowT = performance.now();
      const recent = drag2.trail.filter((p2) => nowT - p2.t < 110);
      const first = recent[0];
      const last = recent[recent.length - 1];
      let vx = 0;
      let vy = 0;
      if (first && last && last.t > first.t) {
        const span = (last.t - first.t) / 1e3;
        vx = (last.x - first.x) / span;
        vy = (last.y - first.y) / span;
      }
      const speed = Math.hypot(vx, vy);
      if (!reducedMotion && speed > TOSS_MIN_SPEED) {
        pos.parked = false;
        airborneRef.current = true;
        velRef.current = { vx: vx * 0.85, vy: -vy * 0.85 };
        momentRef.current = null;
      } else if (pos.yBottom > GROUND_PX + 50) {
        pos.parked = true;
        missionRef.current = null;
        setHighlight(null);
        persistPrefs();
      } else if (!reducedMotion) {
        pos.parked = false;
        airborneRef.current = true;
        velRef.current = { vx: 0, vy: 0 };
      } else {
        pos.parked = false;
        pos.yBottom = GROUND_PX;
        persistPrefs();
      }
      return;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
      if (menuOpenRef.current) return;
      const pointing = missionRef.current;
      if (pointing?.phase === "point") {
        missionRef.current = null;
        lastHighlightRectRef.current = null;
        setHighlight(null);
        navigateToThread(pointing.thread.projectId, pointing.thread.id);
        return;
      }
      petThePet();
    }, 260);
  };
  const onPointerAbort = (event) => {
    const drag2 = dragRef.current;
    if (!drag2 || drag2.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGrabbed(false);
  };
  const onDoubleClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    void rpc(pluginId, "getNeediestThread").then(({ thread }) => {
      if (thread) navigateToThread(thread.projectId, thread.id);
      else showBubble("Nothing needs you. Suspicious.", { important: true });
    }).catch(() => {
    });
  };
  const onWheel = (event) => {
    if (!event.altKey) return;
    event.preventDefault();
    nudgeSize(-Math.sign(event.deltaY) * 0.1);
  };
  const guardedSelect = (fn) => () => {
    if (Date.now() - menuOpenedAtRef.current < 450) return;
    fn();
  };
  const pet = data?.pet;
  const hidden = !pet || !data.settings.enabled || sessionHidden || data.settings.hideOnCompact && compact;
  if (hidden) return null;
  const highContrast = data.settings.highContrast ?? false;
  const waitingCount = fleet?.counts.waiting ?? 0;
  const failedCount = fleet?.counts.failed ?? 0;
  const portraitState = resolveState(pet.atlas.states, "idle");
  const portraitSpec = pet.atlas.states[portraitState];
  const stageFloor = pet.stage.minXp;
  const stageCeiling = pet.nextStage?.minXp ?? null;
  const stageProgress = stageCeiling !== null && stageCeiling > stageFloor ? Math.min(1, Math.max(0, (pet.xp - stageFloor) / (stageCeiling - stageFloor))) : 1;
  const sizePercent = Math.round((pet.sizeScale ?? 1) * 100);
  return /* @__PURE__ */ jsxs(Fragment2, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: highlight ? /* @__PURE__ */ jsx(
      motion2.div,
      {
        className: `pets-ring${highContrast ? " pets-hc" : ""}`,
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: [0.9, 0.5, 0.9, 0.5, 0.85], scale: 1 },
        exit: { opacity: 0, scale: 0.97 },
        transition: {
          opacity: { duration: 2.6, times: [0, 0.25, 0.5, 0.75, 1] },
          scale: { type: "spring", stiffness: 500, damping: 22 }
        },
        style: {
          left: highlight.rect.left - 3,
          top: highlight.rect.top - 3,
          width: highlight.rect.width + 6,
          height: highlight.rect.height + 6
        }
      },
      highlight.key
    ) : null }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: anchorRef,
        className: `pets-anchor${highContrast ? " pets-hc" : ""}`,
        style: { position: "fixed", left: 0, bottom: GROUND_PX, zIndex: 38, pointerEvents: "none" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "pets-sr-only", role: "status", "aria-live": "polite", children: bubble?.text ?? "" }),
          seasonal && seasonalFlair && !napping && !ceremony ? /* @__PURE__ */ jsx("span", { className: "pets-seasonal", "aria-hidden": "true", children: seasonal }) : null,
          /* @__PURE__ */ jsx(AnimatePresence, { children: bubble ? /* @__PURE__ */ jsx(
            motion2.button,
            {
              type: "button",
              initial: { opacity: 0, y: 6, scale: 0.94 },
              animate: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 4, scale: 0.98 },
              transition: { type: "spring", stiffness: 480, damping: 26 },
              ref: bubbleElRef,
              "aria-hidden": "true",
              className: `pets-bubble pets-bubble-${bubbleFit?.side ?? bubble.side} border border-border bg-card text-card-foreground shadow-md`,
              style: bubbleFit ? { left: bubbleFit.left, right: "auto" } : void 0,
              onClick: () => {
                if (bubble.threadId && bubble.projectId) {
                  navigateToThread(bubble.projectId, bubble.threadId);
                }
                setBubble(null);
              },
              children: bubble.text
            },
            bubble.until
          ) : null }),
          data.settings.showEmotions ?? false ? /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
            motion2.div,
            {
              className: `pointer-events-none absolute rounded-full border bg-card px-2 py-0.5 text-[10px] ${highContrast ? "border-foreground/40 text-foreground" : "border-border text-muted-foreground"}`,
              style: {
                bottom: "calc(100% + 6px)",
                ...bubble ? (bubbleFit?.side ?? bubble.side) === "left" ? { right: "calc(100% + 6px)", left: "auto" } : { left: "calc(100% + 6px)", right: "auto" } : { left: 0 },
                width: "max-content"
              },
              initial: { opacity: 0, y: 4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              transition: { duration: 0.18 },
              children: EMOTION_LABELS[spriteState]
            },
            spriteState
          ) }) : null,
          /* @__PURE__ */ jsx(AnimatePresence, { children: waitingCount > 0 && !napping && !menuOpenState && (data.settings.attentionPip ?? true) ? /* @__PURE__ */ jsx(
            motion2.button,
            {
              type: "button",
              className: "pets-pip bg-primary text-primary-foreground",
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1, y: [0, -4, 0] },
              exit: { opacity: 0, scale: 0.5 },
              transition: {
                y: { repeat: Infinity, duration: 1.3, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 500, damping: 20 }
              },
              title: `${waitingCount} waiting \u2014 show me`,
              "aria-label": `${waitingCount} threads waiting \u2014 walk to one`,
              onClick: () => pointAtAttention(),
              children: waitingCount
            }
          ) : null }),
          motes.map((mote) => /* @__PURE__ */ jsx("span", { className: "pets-mote text-primary", children: mote.text }, mote.id)),
          /* @__PURE__ */ jsx(AnimatePresence, { children: hearts.map((heart) => /* @__PURE__ */ jsx(
            motion2.span,
            {
              className: "pets-particle text-rose-400",
              initial: { opacity: 1, x: 0, y: 0, scale: 0.6 },
              animate: { opacity: 0, x: heart.dx, y: heart.dy, scale: 1.15 },
              transition: { duration: 1.25, ease: "easeOut" },
              children: heart.char
            },
            heart.id
          )) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: sparkles.map((sparkle) => /* @__PURE__ */ jsx(
            motion2.span,
            {
              className: "pets-particle text-amber-300",
              initial: { opacity: 1, x: 0, y: -10, scale: 0.4 },
              animate: { opacity: 0, x: sparkle.dx, y: sparkle.dy, scale: 1.3, rotate: 90 },
              transition: { duration: 1.5, ease: "easeOut" },
              children: sparkle.char
            },
            sparkle.id
          )) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: confetti.map((piece, index) => /* @__PURE__ */ jsx(
            motion2.span,
            {
              className: "pets-particle",
              initial: { opacity: 1, x: 0, y: -6, scale: 0.5 },
              animate: { opacity: 0, x: piece.dx, y: piece.dy, scale: 1.2, rotate: 180 },
              transition: { duration: 1.8, ease: "easeOut", delay: index * 0.02 },
              children: piece.char
            },
            piece.id
          )) }),
          /* @__PURE__ */ jsxs(
            ContextMenu2,
            {
              open: menuOpenState,
              onOpenChange: (open) => {
                if (open) {
                  menuOpenedAtRef.current = Date.now();
                  setMenuOpenState(true);
                  if (clickTimerRef.current) {
                    clearTimeout(clickTimerRef.current);
                    clickTimerRef.current = null;
                  }
                  dragRef.current = null;
                  setGrabbed(false);
                  void rpc(pluginId, "listDen").then((result) => setDen(result.pets)).catch(() => {
                  });
                  void looseRpc(pluginId, "getTreats").then((result) => {
                    const balance = result?.balance;
                    if (typeof balance === "number") setTreatBalance(balance);
                  }).catch(() => {
                  });
                  return;
                }
                if (Date.now() - menuOpenedAtRef.current < 350) return;
                setMenuOpenState(false);
              },
              children: [
                /* @__PURE__ */ jsx(ContextMenuTrigger2, { asChild: true, children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    ref: bodyRef,
                    role: "presentation",
                    "aria-hidden": "true",
                    className: `pets-body${grabbed ? " pets-grabbed" : ""}${evolving ? " pets-evolving" : ""}`,
                    onPointerDown,
                    onPointerMove,
                    onPointerUp,
                    onPointerCancel: onPointerAbort,
                    onLostPointerCapture: onPointerAbort,
                    onDoubleClick,
                    onWheel,
                    "data-state": spriteState,
                    children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "pets-canvas" })
                  }
                ) }),
                /* @__PURE__ */ jsxs(ContextMenuContent2, { className: "w-72", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-2 py-2", children: [
                    /* @__PURE__ */ jsx(
                      PetPortrait,
                      {
                        src: `${pet.spriteBaseUrl}&state=${portraitState}`,
                        frames: portraitSpec?.frames ?? 1,
                        size: 40
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
                      /* @__PURE__ */ jsxs("span", { className: "flex items-baseline justify-between gap-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "truncate text-sm font-semibold", children: pet.name }),
                        /* @__PURE__ */ jsxs("span", { className: "shrink-0 text-xs text-muted-foreground", children: [
                          /* @__PURE__ */ jsx(NumberFlow, { value: pet.xp }),
                          " XP"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "truncate text-xs text-muted-foreground", children: [
                        pet.stage.name,
                        " \xB7 ",
                        pet.stage.epithet
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "h-1.5 w-full overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx(
                        "span",
                        {
                          className: "block h-full rounded-full bg-primary",
                          style: { width: `${Math.round(stageProgress * 100)}%` }
                        }
                      ) }),
                      /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                        pet.xp,
                        " XP \xB7",
                        " ",
                        pet.nextStage ? `${pet.nextStage.minXp - pet.xp} to ${pet.nextStage.name}` : "max"
                      ] }),
                      fleet ? /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                        "fleet: ",
                        fleet.counts.active,
                        " running \xB7 ",
                        waitingCount,
                        " waiting \xB7 ",
                        failedCount,
                        " ",
                        "failed"
                      ] }) : null
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ContextMenuSeparator2, {}),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 px-2 py-1.5", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Size" }),
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "flex size-6 items-center justify-center rounded border border-border text-xs hover:bg-accent",
                          "aria-label": "Smaller",
                          onClick: () => nudgeSize(-0.1),
                          children: "\u2212"
                        }
                      ),
                      /* @__PURE__ */ jsxs("span", { className: "w-10 text-center text-xs tabular-nums text-muted-foreground", children: [
                        sizePercent,
                        "%"
                      ] }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          className: "flex size-6 items-center justify-center rounded border border-border text-xs hover:bg-accent",
                          "aria-label": "Bigger",
                          onClick: () => nudgeSize(0.1),
                          children: "+"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ContextMenuSeparator2, {}),
                  /* @__PURE__ */ jsxs(ContextMenuItem2, { onSelect: guardedSelect(petThePet), children: [
                    "Pet ",
                    pet.name
                  ] }),
                  /* @__PURE__ */ jsx(
                    ContextMenuItem2,
                    {
                      disabled: waitingCount + failedCount === 0,
                      onSelect: guardedSelect(() => pointAtAttention()),
                      children: "Show me what needs attention"
                    }
                  ),
                  /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(onDoubleClick), children: "Take me to the neediest thread" }),
                  /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(fetchLatestFailure), children: "Fetch the latest failure" }),
                  /* @__PURE__ */ jsxs(
                    ContextMenuItem2,
                    {
                      disabled: treatBalance <= 0,
                      onSelect: guardedSelect(() => {
                        setTreatBalance((prev) => Math.max(0, prev - 1));
                        void looseRpc(pluginId, "dropTreat").then((result) => {
                          const balance = result?.balance;
                          if (typeof balance === "number") setTreatBalance(balance);
                        }).catch(() => {
                        });
                      }),
                      children: [
                        "Drop a treat (",
                        treatBalance,
                        ")"
                      ]
                    }
                  ),
                  reducedMotion ? null : /* @__PURE__ */ jsx(ContextMenuItem2, { disabled: !!ballView, onSelect: guardedSelect(startFetch), children: "Play fetch" }),
                  /* @__PURE__ */ jsx(ContextMenuSeparator2, {}),
                  /* @__PURE__ */ jsxs(ContextMenuSub2, { children: [
                    /* @__PURE__ */ jsx(ContextMenuSubTrigger2, { children: "Send to\u2026" }),
                    /* @__PURE__ */ jsxs(ContextMenuSubContent2, { children: [
                      /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(() => sendToFraction(0.06)), children: "Left corner" }),
                      /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(() => sendToFraction(0.5)), children: "Center" }),
                      /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(() => sendToFraction(0.94)), children: "Right corner" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(ContextMenuSeparator2, {}),
                  den && den.length > 1 ? /* @__PURE__ */ jsxs(ContextMenuSub2, { children: [
                    /* @__PURE__ */ jsx(ContextMenuSubTrigger2, { children: "Switch pet" }),
                    /* @__PURE__ */ jsx(ContextMenuSubContent2, { children: den.map((entry) => /* @__PURE__ */ jsxs(
                      ContextMenuItem2,
                      {
                        disabled: entry.active,
                        onSelect: guardedSelect(() => void rpc(pluginId, "selectPet", { petId: entry.id }).catch(() => {
                        })),
                        children: [
                          entry.active ? "\u2192 " : "",
                          entry.name,
                          " \xB7 ",
                          entry.stage.name
                        ]
                      },
                      entry.id
                    )) })
                  ] }) : null,
                  /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(() => navigateTo(`/plugins/${pluginId}/pets/hatchery`)), children: "Hatch a new pet\u2026" }),
                  pet.artBehind && data.hasApiKey ? /* @__PURE__ */ jsxs(
                    ContextMenuItem2,
                    {
                      onSelect: guardedSelect(() => {
                        void rpc(pluginId, "evolveArt", { petId: pet.id }).then(() => showBubble("New look incoming\u2026", { important: true })).catch((error) => showBubble(error.message, { important: true }));
                      }),
                      children: [
                        "\u2728 Glow up (",
                        pet.stage.name,
                        " artwork)"
                      ]
                    }
                  ) : null,
                  /* @__PURE__ */ jsx(ContextMenuSeparator2, {}),
                  /* @__PURE__ */ jsx(
                    ContextMenuItem2,
                    {
                      onSelect: guardedSelect(() => {
                        setNapping((prev) => !prev);
                        if (!napping) {
                          missionRef.current = null;
                          lastHighlightRectRef.current = null;
                          setHighlight(null);
                        }
                      }),
                      children: napping ? "Wake up" : "Nap mode"
                    }
                  ),
                  posRef.current.parked ? /* @__PURE__ */ jsx(
                    ContextMenuItem2,
                    {
                      onSelect: guardedSelect(() => {
                        posRef.current.parked = false;
                        airborneRef.current = true;
                        velRef.current = { vx: 0, vy: 0 };
                        persistPrefs();
                      }),
                      children: "Come back down"
                    }
                  ) : null,
                  /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(() => setSessionHidden(true)), children: "Hide until reload" }),
                  /* @__PURE__ */ jsx(ContextMenuSeparator2, {}),
                  /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(startTour), children: "Show me around" }),
                  /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(() => navigateTo(`/plugins/${pluginId}/pets`)), children: "Open Pets panel" }),
                  /* @__PURE__ */ jsx(ContextMenuItem2, { onSelect: guardedSelect(() => navigateTo(`/settings/plugins/${pluginId}`)), children: "Settings" })
                ] })
              ]
            }
          )
        ]
      }
    ),
    treatViews.map((treat) => /* @__PURE__ */ jsx(
      "span",
      {
        ref: (node) => {
          const map = treatElsRef.current;
          if (node) map.set(treat.id, node);
          else map.delete(treat.id);
        },
        className: "pets-treat",
        role: "button",
        tabIndex: 0,
        "aria-label": "A treat \u2014 click to send the pet to it",
        title: "A treat",
        style: {
          bottom: GROUND_PX,
          transform: `translate(${treat.x}px, ${-(treat.yBottom - GROUND_PX)}px)`
        },
        onClick: () => {
          snackTargetRef.current = treat.id;
        },
        onKeyDown: (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          snackTargetRef.current = treat.id;
        },
        children: "\u{1F36A}"
      },
      treat.id
    )),
    ballView ? /* @__PURE__ */ jsx(
      motion2.div,
      {
        ref: ballElRef,
        className: "pets-ball",
        "aria-hidden": "true",
        style: {
          bottom: GROUND_PX,
          transform: `translate(${ballView.x}px, ${-(ballView.yBottom - GROUND_PX)}px)`
        },
        initial: { opacity: 1 },
        animate: { opacity: ballView.fading ? 0 : 1 },
        transition: { duration: ballView.fading ? BALL_FADE_MS / 1e3 : 0, ease: "linear" }
      },
      ballView.key
    ) : null,
    visitor ? /* @__PURE__ */ jsx(
      VisitorCameo,
      {
        pet: visitor.pet,
        direction: visitor.direction,
        onDone: () => setVisitor(null)
      },
      visitor.pet.id + String(visitor.direction)
    ) : null,
    /* @__PURE__ */ jsx(AnimatePresence, { children: tour !== null ? /* @__PURE__ */ jsxs(
      motion2.div,
      {
        ref: tourCardRef,
        role: "dialog",
        "aria-label": "Pet tour",
        className: "rounded-lg border border-border bg-card px-3 py-2 shadow-lg max-w-72",
        style: { position: "fixed", left: 0, top: 0, zIndex: 45, pointerEvents: "auto" },
        initial: { opacity: 0, y: 6, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 4, scale: 0.98 },
        transition: { type: "spring", stiffness: 460, damping: 28 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs", children: TOUR_STEPS[tour]?.text ?? "" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex items-center gap-1", "aria-hidden": "true", children: TOUR_STEPS.map((step, index) => /* @__PURE__ */ jsx(
            "span",
            {
              className: `h-1.5 w-1.5 rounded-full ${index === tour ? "bg-primary" : "bg-muted"}`
            },
            step.text
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", className: "h-7 px-2 text-[11px]", onClick: finishTour, children: "skip" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                onClick: () => {
                  if (tour >= TOUR_LAST) {
                    finishTour();
                    return;
                  }
                  setTour(tour + 1);
                },
                children: tour === TOUR_LAST ? "done" : "next"
              }
            )
          ] })
        ]
      },
      "pets-tour"
    ) : null }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: ceremony && portraitSpec ? /* @__PURE__ */ jsx(
      EvolutionCeremony,
      {
        info: ceremony,
        spriteUrl: `${pet.spriteBaseUrl}&state=${portraitState}`,
        spec: portraitSpec,
        reducedMotion,
        onDone: () => setCeremony(null)
      },
      ceremony.key
    ) : null })
  ] });
}

// bb-plugin-runtime-shim:sonner
var runtime6 = globalThis.__bbPluginRuntime;
if (runtime6 == null || runtime6.sonner == null) {
  throw new Error('Cannot load "sonner": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod6 = runtime6.sonner;
var {
  Toaster,
  toast,
  useSonner
} = mod6;

// components/ui/badge.tsx
var badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-foreground text-background shadow-xs",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow-xs",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

// components/ui/skeleton.tsx
function Skeleton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("animate-pulse rounded-md bg-surface-selected", className),
      ...props
    }
  );
}

// panel/Habitat.tsx
var HABITAT_CHAR_HEIGHT = 80;
var EDGE_MARGIN2 = 12;
var MOMENT_MS2 = 2800;
var GRAVITY2 = 2400;
var FLOOR_BOUNCE2 = 0.38;
var WALL_BOUNCE2 = 0.5;
var TOSS_MIN_SPEED2 = 380;
var SETTLE_VY2 = 140;
var SUSTAIN_HOLD_MS2 = 8e3;
var SUSTAIN_CALM_MS2 = 7e4;
var SUSTAIN_REMIND_MS2 = 2500;
var WALK_SPEEDS2 = { chill: 0.6, normal: 1, zoomies: 1.8 };
var WALK_TO_SPEED2 = 90;
var WALK_TO_ARRIVED_PX = 6;
var FLOOR_INSET = 12;
var TREAT_MAX2 = 2;
var TREAT_SIZE2 = 16;
var TREAT_GRAVITY2 = GRAVITY2 * 0.6;
var TREAT_BOUNCE2 = -0.3;
var TREAT_MIN_X = 16;
var TREAT_MAX_INSET = 24;
var TREAT_REACH_PX2 = 14;
var BALL_SIZE2 = 8;
var BALL_THROW_VY2 = 320;
var BALL_THROW_VX_MIN = 0.9;
var BALL_THROW_VX_SPAN = 0.5;
var BALL_FRICTION2 = 0.92;
var BALL_STOP_VX2 = 12;
var BALL_CATCH_PX2 = 14;
var BALL_CHASE_MS2 = 200;
var BALL_FADE_MS2 = 1200;
var FETCH_BOOST2 = 1.6;
var FETCH_TIMEOUT_MS2 = 2e4;
var HABITAT_LINES = [
  "small stage. big presence.",
  "i live in a sidebar and i've made peace with it.",
  "you scroll, i lurk. teamwork.",
  "this floor is mine now. i checked.",
  "paced the whole habitat. took four seconds.",
  "no notes on the decor. some notes on the size.",
  "if i sit here long enough i become furniture.",
  "tiny room, unlimited opinions.",
  "i'd escape but the border is load-bearing.",
  "just vibing in your panel. don't mind me."
];
var ACTIVITY_INTERVALS = {
  calm: [48e4, 72e4],
  normal: [24e4, 42e4],
  lively: [12e4, 24e4],
  unhinged: [6e4, 11e4]
};
var HABITAT_BUBBLE_MS = 4500;
var particleSeq2 = 1;
function Habitat() {
  const rpc2 = useRpc();
  const navigate = useBbNavigate();
  const [pet, setPet] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [napping, setNapping] = useState(false);
  const [grabbed, setGrabbed] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [shownState, setShownState] = useState("idle");
  const [motes, setMotes] = useState([]);
  const [bubble, setBubble] = useState(null);
  const [treatViews, setTreatViews] = useState([]);
  const [ballView, setBallView] = useState(null);
  const stageRef = useRef(null);
  const anchorRef = useRef(null);
  const bodyRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef(/* @__PURE__ */ new Map());
  const momentRef = useRef(null);
  const petRef = useRef(null);
  const fleetRef = useRef(null);
  const settingsRef = useRef(null);
  const sustainRef = useRef(/* @__PURE__ */ new Map());
  const nappingRef = useRef(false);
  const jobActiveRef = useRef(false);
  const frameRef = useRef(0);
  const rawFrameRef = useRef(0);
  const frameClockRef = useRef(0);
  const posRef = useRef({ x: null, yBottom: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const airborneRef = useRef(false);
  const speedRef = useRef(0);
  const tiltRef = useRef(0);
  const facingRef = useRef(1);
  const stateRef = useRef("idle");
  const walkTargetRef = useRef(null);
  const roamRef = useRef({
    mode: "pause",
    direction: 1,
    until: 0
  });
  const dragRef = useRef(null);
  const clickTimerRef = useRef(null);
  const sizeSaveRef = useRef(null);
  const widthRef = useRef(HABITAT_CHAR_HEIGHT);
  const heightRef = useRef(HABITAT_CHAR_HEIGHT);
  const treatsRef = useRef([]);
  const treatElsRef = useRef(/* @__PURE__ */ new Map());
  const snackTargetRef = useRef(null);
  const ballRef = useRef(null);
  const ballElRef = useRef(null);
  const fetchActiveRef = useRef(false);
  const nextChaseRef = useRef(0);
  const playTimersRef = useRef(/* @__PURE__ */ new Set());
  const rpcRef = useRef(rpc2);
  rpcRef.current = rpc2;
  const paintedRef = useRef({ state: null, frame: -1, facing: 0, tilt: 0, x: null, y: -1, scale: 0 });
  petRef.current = pet;
  fleetRef.current = fleet;
  nappingRef.current = napping;
  const prefersReducedMotionRef = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const isReducedMotion = useCallback(
    () => settingsRef.current?.reducedMotion === "on" || prefersReducedMotionRef.current,
    []
  );
  const pulseClass = useCallback((className, ms) => {
    const el = bodyRef.current;
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), ms);
  }, []);
  const load = useCallback(() => {
    rpc2.call("getOverlay").then((next) => {
      setPet(next.pet);
      setFleet(next.fleet);
      settingsRef.current = next.settings;
      setLoaded(true);
    }).catch(() => {
    });
  }, [rpc2]);
  useEffect(load, [load]);
  const playTimeout = useCallback((fn, ms) => {
    const id3 = setTimeout(() => {
      playTimersRef.current.delete(id3);
      fn();
    }, ms);
    playTimersRef.current.add(id3);
  }, []);
  const syncTreats = useCallback(() => {
    setTreatViews(treatsRef.current.map((t2) => ({ id: t2.id, x: t2.x, yBottom: t2.yBottom })));
  }, []);
  const dropTreatAt = useCallback(
    (fraction) => {
      const stage = stageRef.current;
      if (!stage) return;
      const stageWidth = stage.clientWidth;
      const maxX = Math.max(TREAT_MIN_X, stageWidth - TREAT_MAX_INSET);
      const x3 = Math.min(Math.max(fraction * stageWidth, TREAT_MIN_X), maxX);
      const treat = {
        id: particleSeq2++,
        x: x3,
        // Straight in off the top edge of the stage, in floor-line coordinates.
        yBottom: Math.max(0, stage.clientHeight - FLOOR_INSET),
        vy: 0,
        landed: false,
        bounced: false
      };
      const next = [...treatsRef.current, treat].slice(-TREAT_MAX2);
      treatsRef.current = next;
      for (const id3 of [...treatElsRef.current.keys()]) {
        if (!next.some((t2) => t2.id === id3)) treatElsRef.current.delete(id3);
      }
      if (snackTargetRef.current !== null && !next.some((t2) => t2.id === snackTargetRef.current)) {
        snackTargetRef.current = null;
      }
      syncTreats();
    },
    [syncTreats]
  );
  const cancelFetch = useCallback(() => {
    const had = !!ballRef.current;
    ballRef.current = null;
    ballElRef.current = null;
    fetchActiveRef.current = false;
    nextChaseRef.current = 0;
    if (had) {
      walkTargetRef.current = null;
      setBallView(null);
    }
  }, []);
  useRealtime("pets", (payload) => {
    const signal = payload;
    switch (signal?.kind) {
      case "fleet":
        if (signal.fleet) setFleet(signal.fleet);
        break;
      case "job":
        jobActiveRef.current = !!signal.job;
        break;
      case "moment": {
        if (!signal.moment) break;
        const behavior = settingsRef.current;
        if (signal.moment === "sad" ? !(behavior?.reactFailures ?? true) : !(behavior?.reactTurnComplete ?? true)) {
          break;
        }
        momentRef.current = { state: signal.moment, until: Date.now() + MOMENT_MS2 };
        break;
      }
      case "xp": {
        setPet((prev) => {
          if (!prev || prev.id !== signal.petId) return prev;
          return {
            ...prev,
            xp: signal.xp ?? prev.xp,
            stage: signal.stageName ? {
              ...prev.stage,
              index: signal.stageIndex ?? prev.stage.index,
              name: signal.stageName
            } : prev.stage
          };
        });
        if (signal.evolved && (settingsRef.current?.evolutionCeremony ?? true)) {
          momentRef.current = { state: "dance", until: Date.now() + 4200 };
          sounds.evolve();
        }
        if (typeof signal.amount === "number" && (settingsRef.current?.xpMotes ?? true) && signal.amount >= 10) {
          const id3 = particleSeq2++;
          const text = `+${signal.amount}`;
          setMotes((prev) => [...prev.slice(-3), { id: id3, text }]);
          setTimeout(() => setMotes((prev) => prev.filter((m3) => m3.id !== id3)), 1500);
        }
        break;
      }
      // The same signal the overlay eats — one channel, both surfaces. The
      // habitat just scales the landing fraction to the stage instead of the
      // window.
      case "treat-drop":
        dropTreatAt(typeof signal.x === "number" ? signal.x : Math.random());
        break;
      case "pet-changed":
      case "evolved-art":
      case "hatched":
      case "settings-changed":
        load();
        break;
      default:
        break;
    }
  });
  const artKey = pet ? `${pet.id}:${pet.artStage}` : null;
  useEffect(() => {
    if (!pet) return;
    const images = /* @__PURE__ */ new Map();
    for (const state of Object.keys(pet.atlas.states)) {
      const img = new Image();
      img.src = `${pet.spriteBaseUrl}&state=${state}`;
      images.set(state, img);
    }
    imagesRef.current = images;
    paintedRef.current.state = null;
  }, [artKey, pet?.spriteBaseUrl]);
  const burstHearts = useCallback(() => {
    const burst = Array.from({ length: 5 }, () => ({
      id: particleSeq2++,
      dx: (Math.random() - 0.5) * 64,
      dy: -(24 + Math.random() * 44),
      char: "\u2665"
    }));
    setHearts((prev) => [...prev.slice(-6), ...burst]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h2) => !burst.some((b2) => b2.id === h2.id)));
    }, 1400);
  }, []);
  const petThePet = useCallback(() => {
    const current = petRef.current;
    if (!current) return;
    if (nappingRef.current) setNapping(false);
    burstHearts();
    momentRef.current = { state: "love", until: Date.now() + 1400 };
    sounds.pet();
    void rpc2.call("petPet", { petId: current.id }).catch(() => {
    });
  }, [burstHearts, rpc2]);
  const startFetch = useCallback(() => {
    const stage = stageRef.current;
    if (!stage || isReducedMotion() || ballRef.current) return;
    if (nappingRef.current) setNapping(false);
    const pos = posRef.current;
    const width = widthRef.current;
    const originX = pos.x ?? 0;
    const center = originX + width / 2;
    const stageWidth = stage.clientWidth;
    const direction = center < stageWidth / 2 ? 1 : -1;
    ballRef.current = {
      x: center - BALL_SIZE2 / 2,
      yBottom: pos.yBottom + heightRef.current * 0.55,
      vx: direction * stageWidth * (BALL_THROW_VX_MIN + Math.random() * BALL_THROW_VX_SPAN),
      vy: BALL_THROW_VY2,
      phase: "flying",
      originX,
      bounced: false,
      startedAt: Date.now()
    };
    fetchActiveRef.current = true;
    nextChaseRef.current = 0;
    setBallView({
      key: Date.now(),
      x: ballRef.current.x,
      yBottom: ballRef.current.yBottom,
      fading: false
    });
    sounds.boing();
  }, [isReducedMotion]);
  const goToNeediest = useCallback(() => {
    void rpc2.call("getNeediestThread").then(({ thread }) => {
      if (thread) navigate.toThread(thread.id);
      else toast("Nothing needs you. Enjoy it while it lasts.");
    }).catch(() => {
    });
  }, [navigate, rpc2]);
  const toggleNap = useCallback(() => setNapping((prev) => !prev), []);
  const sustained = useCallback((family, state) => {
    const now2 = Date.now();
    const map = sustainRef.current;
    let entry = map.get(family);
    if (!entry) {
      entry = {
        holdUntil: now2 + SUSTAIN_HOLD_MS2,
        nextRemindAt: now2 + SUSTAIN_HOLD_MS2 + SUSTAIN_CALM_MS2
      };
      map.set(family, entry);
    }
    if (now2 < entry.holdUntil) return state;
    if (now2 >= entry.nextRemindAt) {
      entry.holdUntil = now2 + SUSTAIN_REMIND_MS2;
      entry.nextRemindAt = now2 + SUSTAIN_REMIND_MS2 + SUSTAIN_CALM_MS2;
      return state;
    }
    return null;
  }, []);
  const deriveState = useCallback(() => {
    const now2 = Date.now();
    if (nappingRef.current) return "sleep";
    if (airborneRef.current) return "jump";
    const moment = momentRef.current;
    if (moment && now2 < moment.until) return moment.state;
    if (walkTargetRef.current !== null) return "walk";
    const settings = settingsRef.current;
    const candidates = [];
    if (jobActiveRef.current && (settings?.digWhileGenerating ?? true)) {
      candidates.push({ family: "job", state: "dig" });
    }
    const currentFleet = fleetRef.current;
    if (currentFleet) {
      if (currentFleet.mood === "waiting") {
        candidates.push({ family: "fleet-waiting", state: "waiting" });
      } else if (currentFleet.mood === "failed" && (settings?.reactFailures ?? true)) {
        candidates.push({
          family: "fleet-failed",
          state: currentFleet.counts.failed >= 3 ? "grumpy" : "sad"
        });
      } else if (currentFleet.mood === "active") {
        candidates.push({
          family: "fleet-active",
          state: currentFleet.counts.active >= 3 ? "run" : "walk"
        });
      }
    }
    const present = new Set(candidates.map((candidate) => candidate.family));
    for (const key of [...sustainRef.current.keys()]) {
      if (!present.has(key)) sustainRef.current.delete(key);
    }
    for (const candidate of candidates) {
      const s2 = sustained(candidate.family, candidate.state);
      if (s2) return s2;
    }
    return roamRef.current.mode === "stroll" ? "walk" : "idle";
  }, [sustained]);
  useEffect(() => {
    if (!pet) return;
    let raf = 0;
    let lastTick = performance.now();
    const atlas = pet.atlas;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const tick = (now2) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now2 - lastTick) / 1e3);
      lastTick = now2;
      const stage = stageRef.current;
      if (!stage || document.hidden) return;
      const reducedMotion = isReducedMotion();
      let nextState = deriveState();
      nextState = resolveState(atlas.states, nextState);
      if (nextState !== stateRef.current) {
        stateRef.current = nextState;
        setShownState(nextState);
        frameRef.current = 0;
        rawFrameRef.current = 0;
        frameClockRef.current = 0;
        if (!reducedMotion && (nextState === "celebrate" || nextState === "point" || nextState === "waiting")) {
          pulseClass("pets-land", 200);
        }
      }
      const spec = atlas.states[nextState] ?? atlas.states.idle ?? Object.values(atlas.states)[0];
      if (!spec) return;
      if (!reducedMotion) {
        frameClockRef.current += dt * spec.fps;
        if (frameClockRef.current >= 1) {
          frameClockRef.current %= 1;
          const raw = rawFrameRef.current + 1;
          rawFrameRef.current = raw;
          frameRef.current = nextFrame(raw, spec, nextState);
        }
      }
      const img = imagesRef.current.get(nextState);
      const ready = !!img && img.complete && img.naturalWidth > 0;
      const srcCellW = ready ? Math.floor(img.naturalWidth / spec.frames) : spec.width / spec.frames;
      const srcH = ready ? img.naturalHeight : spec.height;
      const petScale = petRef.current?.sizeScale ?? 1;
      const charTarget = HABITAT_CHAR_HEIGHT * petScale;
      const { width, height } = charGeometry(atlas, spec, srcCellW, charTarget);
      widthRef.current = width;
      heightRef.current = height;
      const pos = posRef.current;
      const vel = velRef.current;
      const minX = EDGE_MARGIN2;
      const maxX = Math.max(minX, stage.clientWidth - width - EDGE_MARGIN2);
      const stageHeight = stage.clientHeight;
      if (pos.x === null) pos.x = Math.min(maxX, stage.clientWidth * 0.18);
      if (airborneRef.current && !dragRef.current) {
        vel.vy -= GRAVITY2 * dt;
        pos.yBottom += vel.vy * dt;
        pos.x += vel.vx * dt;
        tiltRef.current = Math.max(-0.34, Math.min(0.34, vel.vx * 45e-5));
        if (pos.x <= minX || pos.x >= maxX) {
          pos.x = Math.min(Math.max(pos.x, minX), maxX);
          vel.vx = -vel.vx * WALL_BOUNCE2;
        }
        if (pos.yBottom <= 0) {
          pos.yBottom = 0;
          if (Math.abs(vel.vy) > SETTLE_VY2) {
            sounds.boing();
            pulseClass("pets-land", 200);
            vel.vy = -vel.vy * FLOOR_BOUNCE2;
            vel.vx *= 0.72;
          } else {
            airborneRef.current = false;
            vel.vx = 0;
            vel.vy = 0;
            tiltRef.current = 0;
            pulseClass("pets-land", 200);
          }
        }
      } else if (!airborneRef.current) {
        tiltRef.current = 0;
        if (!dragRef.current) pos.yBottom = 0;
      }
      pos.x = Math.min(Math.max(pos.x, minX), maxX);
      pos.yBottom = Math.min(pos.yBottom, Math.max(0, stageHeight - 100));
      const playNow = Date.now();
      const treats = treatsRef.current;
      for (const treat of treats) {
        if (treat.landed) continue;
        treat.vy -= TREAT_GRAVITY2 * dt;
        treat.yBottom += treat.vy * dt;
        if (treat.yBottom <= 0) {
          treat.yBottom = 0;
          if (!reducedMotion && !treat.bounced && Math.abs(treat.vy) > 120) {
            treat.bounced = true;
            treat.vy *= TREAT_BOUNCE2;
          } else {
            treat.vy = 0;
            treat.landed = true;
          }
        }
      }
      const playMoment = momentRef.current;
      const petFree = !airborneRef.current && !nappingRef.current && !dragRef.current && !(playMoment && playNow < playMoment.until);
      if (treats.length > 0 && !ballRef.current) {
        let target = null;
        if (snackTargetRef.current !== null) {
          target = treats.find((t2) => t2.id === snackTargetRef.current) ?? null;
          if (!target) snackTargetRef.current = null;
        }
        if (!target && petFree && walkTargetRef.current === null) {
          const center = pos.x + width / 2;
          let bestDistance = Number.POSITIVE_INFINITY;
          for (const treat of treats) {
            if (!treat.landed) continue;
            const distance2 = Math.abs(treat.x + TREAT_SIZE2 / 2 - center);
            if (distance2 < bestDistance) {
              bestDistance = distance2;
              target = treat;
            }
          }
          if (target) snackTargetRef.current = target.id;
        }
        if (target && target.landed && petFree) {
          const treatCenter = target.x + TREAT_SIZE2 / 2;
          if (Math.abs(pos.x + width / 2 - treatCenter) < TREAT_REACH_PX2) {
            const eaten = target;
            treatsRef.current = treats.filter((t2) => t2.id !== eaten.id);
            treatElsRef.current.delete(eaten.id);
            snackTargetRef.current = null;
            walkTargetRef.current = null;
            momentRef.current = { state: "love", until: playNow + 1200 };
            burstHearts();
            pulseClass("pets-land", 200);
            sounds.pet();
            void rpcRef.current.call("eatTreat").catch(() => {
            });
            syncTreats();
          } else {
            facingRef.current = treatCenter >= pos.x + width / 2 ? 1 : -1;
            walkTargetRef.current = Math.min(Math.max(treatCenter - width / 2, minX), maxX);
          }
        }
      }
      for (const treat of treatsRef.current) {
        const node = treatElsRef.current.get(treat.id);
        if (node) node.style.transform = `translate(${treat.x}px, ${-treat.yBottom}px)`;
      }
      const ball = ballRef.current;
      if (ball) {
        const ballMinX = EDGE_MARGIN2;
        const ballMaxX = Math.max(ballMinX, stage.clientWidth - EDGE_MARGIN2 - BALL_SIZE2);
        if (ball.phase === "flying") {
          ball.vy -= GRAVITY2 * dt;
          ball.x += ball.vx * dt;
          ball.yBottom += ball.vy * dt;
          if (ball.x <= ballMinX || ball.x >= ballMaxX) {
            ball.x = Math.min(Math.max(ball.x, ballMinX), ballMaxX);
            ball.vx = -ball.vx * WALL_BOUNCE2;
          }
          if (ball.yBottom <= 0) {
            ball.yBottom = 0;
            if (!ball.bounced && Math.abs(ball.vy) > SETTLE_VY2) {
              ball.bounced = true;
              ball.vy = -ball.vy * FLOOR_BOUNCE2;
              ball.vx *= 0.8;
            } else {
              ball.vy = 0;
              ball.phase = "rolling";
            }
          }
        } else if (ball.phase === "rolling") {
          ball.x += ball.vx * dt;
          ball.vx *= Math.pow(BALL_FRICTION2, dt * 60);
          if (Math.abs(ball.vx) < BALL_STOP_VX2) ball.vx = 0;
          if (ball.x <= ballMinX || ball.x >= ballMaxX) {
            ball.x = Math.min(Math.max(ball.x, ballMinX), ballMaxX);
            ball.vx = -ball.vx * WALL_BOUNCE2;
          }
          ball.yBottom = 0;
        } else if (ball.phase === "carried") {
          ball.x = pos.x + width / 2 - BALL_SIZE2 / 2;
          ball.yBottom = pos.yBottom + height * 0.9;
        }
        if (ball.phase === "flying" || ball.phase === "rolling") {
          if (playNow - ball.startedAt > FETCH_TIMEOUT_MS2) {
            cancelFetch();
          } else if (petFree) {
            const ballCenter = ball.x + BALL_SIZE2 / 2;
            if (playNow >= nextChaseRef.current) {
              nextChaseRef.current = playNow + BALL_CHASE_MS2;
              walkTargetRef.current = Math.min(Math.max(ballCenter - width / 2, minX), maxX);
            }
            const grounded = ball.phase === "rolling" || ball.yBottom <= 2;
            if (grounded && Math.abs(pos.x + width / 2 - ballCenter) < BALL_CATCH_PX2) {
              ball.phase = "carried";
              ball.vx = 0;
              ball.vy = 0;
              nextChaseRef.current = 0;
              sounds.pet();
              walkTargetRef.current = Math.min(Math.max(ball.originX, minX), maxX);
            }
          }
        } else if (ball.phase === "carried" && walkTargetRef.current === null && petFree) {
          ball.phase = "done";
          ball.x = pos.x + width / 2 - BALL_SIZE2 / 2;
          ball.yBottom = 0;
          fetchActiveRef.current = false;
          momentRef.current = { state: "celebrate", until: playNow + 1400 };
          sounds.pet();
          void rpcRef.current.call("recordFetch").catch(() => {
          });
          const restX = ball.x;
          const restY = ball.yBottom;
          setBallView(
            (prev) => prev ? { ...prev, x: restX, yBottom: restY, fading: true } : prev
          );
          playTimeout(() => {
            if (ballRef.current?.phase === "done") ballRef.current = null;
            setBallView(null);
          }, BALL_FADE_MS2);
        }
        const ballNode = ballElRef.current;
        if (ballNode) ballNode.style.transform = `translate(${ball.x}px, ${-ball.yBottom}px)`;
      }
      const frozen = !!dragRef.current;
      const walkTarget = walkTargetRef.current;
      if (walkTarget !== null) {
        if (frozen || airborneRef.current || nappingRef.current) {
          walkTargetRef.current = null;
        } else {
          const goal = Math.min(Math.max(walkTarget, minX), maxX);
          const delta = goal - pos.x;
          if (Math.abs(delta) <= WALK_TO_ARRIVED_PX) {
            pos.x = goal;
            walkTargetRef.current = null;
            speedRef.current = 0;
            pulseClass("pets-land", 200);
          } else {
            const direction = delta > 0 ? 1 : -1;
            const speedFactor = WALK_SPEEDS2[settingsRef.current?.walkSpeed ?? "normal"] ?? 1;
            const boost = fetchActiveRef.current ? FETCH_BOOST2 : 1;
            const step = WALK_TO_SPEED2 * speedFactor * boost * dt;
            pos.x = Math.abs(delta) <= step ? goal : pos.x + direction * step;
            facingRef.current = direction;
          }
        }
      }
      if (walkTargetRef.current === null && !frozen && !airborneRef.current && (nextState === "idle" || nextState === "walk") && !reducedMotion && (settingsRef.current?.roaming ?? true)) {
        const roam = roamRef.current;
        const hustling = nextState === "walk" && roam.mode !== "stroll";
        if (now2 >= roam.until) {
          const nextDirection = Math.random() < 0.5 ? -1 : 1;
          roam.mode = roam.mode === "stroll" ? "pause" : "stroll";
          if (roam.mode === "stroll" && nextDirection !== roam.direction) {
            pulseClass("pets-turn", 160);
          }
          roam.direction = nextDirection;
          roam.until = now2 + (roam.mode === "stroll" ? 1800 + Math.random() * 2600 : 2200 + Math.random() * 4800);
        }
        const speedFactor = WALK_SPEEDS2[settingsRef.current?.walkSpeed ?? "normal"] ?? 1;
        const targetSpeed = (roam.mode === "stroll" || hustling ? hustling ? 46 : 26 : 0) * speedFactor;
        speedRef.current += (targetSpeed - speedRef.current) * Math.min(1, dt * 6);
        if (speedRef.current > 1) {
          let next = pos.x + roam.direction * speedRef.current * dt;
          if (next <= minX || next >= maxX) {
            roam.direction = roam.direction === 1 ? -1 : 1;
            pulseClass("pets-turn", 160);
            next = Math.min(Math.max(next, minX), maxX);
          }
          pos.x = next;
          facingRef.current = roam.direction;
        }
      } else {
        speedRef.current = 0;
      }
      const bob = !reducedMotion && nextState === "walk" && !airborneRef.current ? -Math.abs(
        Math.sin((frameRef.current + frameClockRef.current) / spec.frames * Math.PI * 2)
      ) * 2.2 : 0;
      const canvas = canvasRef.current;
      const anchor = anchorRef.current;
      if (canvas && anchor) {
        const painted = paintedRef.current;
        const tilt = Math.round(tiltRef.current * 50) / 50;
        const dirty = painted.state !== nextState || painted.frame !== frameRef.current || painted.facing !== facingRef.current || painted.tilt !== tilt || painted.scale !== charTarget;
        if (dirty && ready) {
          const pxW = Math.max(1, Math.round(width * dpr));
          const pxH = Math.max(1, Math.round(height * dpr));
          if (canvas.width !== pxW || canvas.height !== pxH) {
            canvas.width = pxW;
            canvas.height = pxH;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
          }
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, pxW, pxH);
            ctx.translate(pxW / 2, pxH);
            ctx.rotate(tilt);
            ctx.scale(facingRef.current, 1);
            ctx.drawImage(
              img,
              frameRef.current * srcCellW,
              0,
              srcCellW,
              srcH,
              -pxW / 2,
              -pxH,
              pxW,
              pxH
            );
            painted.state = nextState;
            painted.frame = frameRef.current;
            painted.facing = facingRef.current;
            painted.tilt = tilt;
            painted.scale = charTarget;
          }
        }
        const y3 = -pos.yBottom + bob;
        if (painted.x !== pos.x || painted.y !== y3) {
          anchor.style.transform = `translate(${pos.x}px, ${y3}px)`;
          painted.x = pos.x;
          painted.y = y3;
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    pet,
    deriveState,
    isReducedMotion,
    pulseClass,
    burstHearts,
    cancelFetch,
    playTimeout,
    syncTreats
  ]);
  useEffect(() => {
    const playTimers = playTimersRef.current;
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      for (const id3 of playTimers) clearTimeout(id3);
      playTimers.clear();
      treatsRef.current = [];
      treatElsRef.current.clear();
      snackTargetRef.current = null;
      ballRef.current = null;
      ballElRef.current = null;
      fetchActiveRef.current = false;
    };
  }, []);
  useEffect(() => {
    let timer = null;
    let bubbleTimer = null;
    let cancelled = false;
    const say = (text) => {
      const id3 = particleSeq2++;
      setBubble({ id: id3, text });
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => {
        bubbleTimer = null;
        setBubble((prev) => prev && prev.id === id3 ? null : prev);
      }, HABITAT_BUBBLE_MS);
    };
    const act2 = () => {
      const settings = settingsRef.current;
      const funny = settings?.personalityFunny ?? true;
      const chaotic = settings?.personalityChaotic ?? true;
      const sarcastic = settings?.personalitySarcastic ?? true;
      const cozy = settings?.personalityCozy ?? true;
      const options = [];
      if (cozy) {
        options.push({
          weight: 3,
          run: () => {
            momentRef.current = { state: "stretch", until: Date.now() + 1800 };
          }
        });
        options.push({
          weight: 3,
          run: () => {
            momentRef.current = { state: "sit", until: Date.now() + 4e3 };
          }
        });
        options.push({
          weight: 4,
          run: () => {
            const stage = stageRef.current;
            if (!stage) return;
            const minX = EDGE_MARGIN2;
            const maxX = Math.max(minX, stage.clientWidth - widthRef.current - EDGE_MARGIN2);
            walkTargetRef.current = minX + Math.random() * (maxX - minX);
          }
        });
      }
      if (funny) {
        options.push({
          weight: 2,
          run: () => {
            momentRef.current = { state: "dance", until: Date.now() + 3e3 };
          }
        });
      }
      if (chaotic) {
        options.push({
          weight: 2,
          run: () => {
            momentRef.current = { state: "dig", until: Date.now() + 2400 };
          }
        });
      }
      if (funny || sarcastic || cozy) {
        options.push({
          weight: 3,
          run: () => {
            const line = HABITAT_LINES[Math.floor(Math.random() * HABITAT_LINES.length)];
            if (line) say(line);
          }
        });
      }
      if (options.length === 0) return;
      const total = options.reduce((sum, option) => sum + option.weight, 0);
      let roll = Math.random() * total;
      for (const option of options) {
        roll -= option.weight;
        if (roll <= 0) {
          option.run();
          return;
        }
      }
      options[options.length - 1]?.run();
    };
    const schedule = () => {
      if (cancelled) return;
      const level = settingsRef.current?.activityLevel ?? "lively";
      const [min, max] = ACTIVITY_INTERVALS[level] ?? ACTIVITY_INTERVALS.lively;
      timer = setTimeout(() => {
        timer = null;
        const busy = document.hidden || !!dragRef.current || nappingRef.current || airborneRef.current || walkTargetRef.current !== null;
        if (!busy) act2();
        schedule();
      }, randomBetween(min, max));
    };
    schedule();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (bubbleTimer) clearTimeout(bubbleTimer);
    };
  }, []);
  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const pos = posRef.current;
    airborneRef.current = false;
    velRef.current = { vx: 0, vy: 0 };
    cancelFetch();
    snackTargetRef.current = null;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pos.x ?? 0,
      originYBottom: pos.yBottom,
      moved: false,
      trail: [{ x: event.clientX, y: event.clientY, t: performance.now() }]
    };
  };
  const onStagePointerDown = (event) => {
    if (event.button !== 0) return;
    if (bodyRef.current?.contains(event.target)) return;
    const stage = stageRef.current;
    if (!stage || nappingRef.current || airborneRef.current || dragRef.current) return;
    const rect = stage.getBoundingClientRect();
    const width = widthRef.current;
    const minX = EDGE_MARGIN2;
    const maxX = Math.max(minX, stage.clientWidth - width - EDGE_MARGIN2);
    walkTargetRef.current = Math.min(
      Math.max(event.clientX - rect.left - width / 2, minX),
      maxX
    );
  };
  const onPointerMove = (event) => {
    const drag2 = dragRef.current;
    if (!drag2 || drag2.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag2.startX;
    const dy = event.clientY - drag2.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      drag2.moved = true;
      setGrabbed(true);
    }
    if (drag2.moved) {
      const stage = stageRef.current;
      const maxX = stage ? Math.max(EDGE_MARGIN2, stage.clientWidth - widthRef.current) : EDGE_MARGIN2;
      const stageHeight = stage?.clientHeight ?? 0;
      const pos = posRef.current;
      pos.x = Math.max(EDGE_MARGIN2, Math.min(maxX, drag2.originX + dx));
      pos.yBottom = Math.max(0, Math.min(Math.max(0, stageHeight - 100), drag2.originYBottom - dy));
      drag2.trail.push({ x: event.clientX, y: event.clientY, t: performance.now() });
      if (drag2.trail.length > 6) drag2.trail.shift();
    }
  };
  const onPointerUp = (event) => {
    const drag2 = dragRef.current;
    if (!drag2 || drag2.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGrabbed(false);
    if (drag2.moved) {
      const pos = posRef.current;
      const nowT = performance.now();
      const recent = drag2.trail.filter((p2) => nowT - p2.t < 110);
      const first = recent[0];
      const last = recent[recent.length - 1];
      let vx = 0;
      let vy = 0;
      if (first && last && last.t > first.t) {
        const span = (last.t - first.t) / 1e3;
        vx = (last.x - first.x) / span;
        vy = (last.y - first.y) / span;
      }
      const speed = Math.hypot(vx, vy);
      if (isReducedMotion()) {
        pos.yBottom = 0;
      } else if (speed > TOSS_MIN_SPEED2) {
        airborneRef.current = true;
        velRef.current = { vx: vx * 0.85, vy: -vy * 0.85 };
        momentRef.current = null;
      } else {
        airborneRef.current = true;
        velRef.current = { vx: 0, vy: 0 };
      }
      return;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
      petThePet();
    }, 260);
  };
  const onPointerCancel = (event) => {
    const drag2 = dragRef.current;
    if (drag2 && drag2.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setGrabbed(false);
  };
  const onDoubleClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    goToNeediest();
  };
  const onWheel = (event) => {
    if (!event.altKey) return;
    event.preventDefault();
    const current = petRef.current;
    if (!current) return;
    const next = Math.min(2.5, Math.max(0.5, current.sizeScale - Math.sign(event.deltaY) * 0.1));
    if (next === current.sizeScale) return;
    setPet((prev) => prev ? { ...prev, sizeScale: next } : prev);
    if (sizeSaveRef.current) clearTimeout(sizeSaveRef.current);
    sizeSaveRef.current = setTimeout(() => {
      sizeSaveRef.current = null;
      void rpc2.call("setPetSize", { petId: current.id, scale: next }).catch(() => {
      });
    }, 400);
  };
  if (!pet) {
    if (!loaded) {
      return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-56" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-72 w-full rounded-xl" })
      ] });
    }
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 rounded-xl border border-border p-8 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No pet yet. Something is waiting in the Hatchery." }),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          onClick: () => navigate.toPluginPanel("pets", { subPath: "hatchery" }),
          children: "Open Hatchery"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-baseline gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: pet.name }),
      /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: pet.stage.name }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx(NumberFlow, { value: pet.xp }),
        " XP"
      ] }),
      fleet ? /* @__PURE__ */ jsxs("span", { className: "ml-auto text-xs text-muted-foreground", children: [
        fleet.counts.active,
        " running \xB7 ",
        fleet.counts.waiting,
        " waiting \xB7 ",
        fleet.counts.failed,
        " ",
        "failed"
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: stageRef,
        className: "relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-transparent to-muted/40",
        style: { height: "clamp(280px, 45vh, 460px)", touchAction: "none" },
        onPointerDown: onStagePointerDown,
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-3 border-t border-border/60" }),
          treatViews.map((treat) => /* @__PURE__ */ jsx(
            "span",
            {
              ref: (node) => {
                if (node) treatElsRef.current.set(treat.id, node);
                else treatElsRef.current.delete(treat.id);
              },
              role: "button",
              tabIndex: 0,
              "aria-label": "A treat",
              title: "A treat",
              className: "absolute left-0 select-none leading-none",
              style: {
                bottom: FLOOR_INSET,
                fontSize: TREAT_SIZE2,
                pointerEvents: "auto",
                cursor: "pointer",
                willChange: "transform",
                transform: `translate(${treat.x}px, ${-treat.yBottom}px)`
              },
              onPointerDown: (event) => {
                event.stopPropagation();
                snackTargetRef.current = treat.id;
              },
              onKeyDown: (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                snackTargetRef.current = treat.id;
              },
              children: "\u{1F36A}"
            },
            treat.id
          )),
          ballView ? /* @__PURE__ */ jsx(
            motion2.div,
            {
              ref: ballElRef,
              "aria-hidden": "true",
              className: "absolute left-0",
              style: {
                bottom: FLOOR_INSET,
                boxSizing: "border-box",
                width: BALL_SIZE2,
                height: BALL_SIZE2,
                borderRadius: 2,
                background: "var(--primary, rgb(120 160 255))",
                border: "2px solid rgb(0 0 0 / 0.45)",
                imageRendering: "pixelated",
                pointerEvents: "none",
                willChange: "transform",
                transform: `translate(${ballView.x}px, ${-ballView.yBottom}px)`
              },
              initial: { opacity: 1 },
              animate: { opacity: ballView.fading ? 0 : 1 },
              transition: { duration: ballView.fading ? BALL_FADE_MS2 / 1e3 : 0, ease: "linear" }
            },
            ballView.key
          ) : null,
          /* @__PURE__ */ jsxs("div", { ref: anchorRef, className: "absolute left-0", style: { bottom: 12 }, children: [
            settingsRef.current?.showEmotions ? /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
              motion2.div,
              {
                className: "pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-card px-2 py-0.5 text-[10px] text-muted-foreground",
                style: { bottom: "calc(100% + 6px)" },
                initial: { opacity: 0, y: 3 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0 },
                children: EMOTION_LABELS[shownState] ?? shownState
              },
              shownState
            ) }) : null,
            /* @__PURE__ */ jsx(AnimatePresence, { children: bubble ? /* @__PURE__ */ jsx(
              motion2.div,
              {
                className: "pets-bubble pets-bubble-left pointer-events-none border border-border bg-card text-card-foreground shadow-md",
                initial: { opacity: 0, y: 6, scale: 0.94 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 4, scale: 0.98 },
                transition: { type: "spring", stiffness: 480, damping: 26 },
                children: bubble.text
              },
              bubble.id
            ) : null }),
            motes.map((mote) => /* @__PURE__ */ jsx("span", { className: "pets-mote text-primary", children: mote.text }, mote.id)),
            /* @__PURE__ */ jsx(AnimatePresence, { children: hearts.map((heart) => /* @__PURE__ */ jsx(
              motion2.span,
              {
                className: "pets-particle text-rose-400",
                initial: { opacity: 1, x: 0, y: 0, scale: 0.6 },
                animate: { opacity: 0, x: heart.dx, y: heart.dy, scale: 1.15 },
                transition: { duration: 1.25, ease: "easeOut" },
                children: heart.char
              },
              heart.id
            )) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: bodyRef,
                role: "presentation",
                className: `pets-body${grabbed ? " pets-grabbed" : ""}`,
                onPointerDown,
                onPointerMove,
                onPointerUp,
                onPointerCancel,
                onLostPointerCapture: onPointerCancel,
                onDoubleClick,
                onWheel,
                children: /* @__PURE__ */ jsx("canvas", { ref: canvasRef, className: "pets-canvas" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: petThePet, children: [
        "Pet ",
        pet.name
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: toggleNap, children: napping ? "Wake up" : "Nap" }),
      isReducedMotion() ? null : /* @__PURE__ */ jsx(
        Button,
        {
          size: "icon",
          variant: "ghost",
          className: "h-8 w-8",
          "aria-label": "Play fetch",
          disabled: !!ballView,
          onClick: startFetch,
          children: "\u{1F3BE}"
        }
      ),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: goToNeediest, children: "What needs attention?" })
    ] })
  ] });
}

// components/ui/alert.tsx
var alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Alert = forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    role: "alert",
    className: cn(alertVariants({ variant }), className),
    ...props
  }
));
Alert.displayName = "Alert";
var AlertTitle = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h5",
  {
    ref,
    className: cn("mb-1 font-medium leading-none tracking-tight", className),
    ...props
  }
));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm [&_p]:leading-relaxed", className),
    ...props
  }
));
AlertDescription.displayName = "AlertDescription";

// bb-plugin-runtime-shim:@radix-ui/react-alert-dialog
var runtime7 = globalThis.__bbPluginRuntime;
if (runtime7 == null || runtime7.radixAlertDialog == null) {
  throw new Error('Cannot load "@radix-ui/react-alert-dialog": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod7 = runtime7.radixAlertDialog;
var {
  Action,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Cancel,
  Content: Content2,
  Description,
  Overlay: Overlay2,
  Portal: Portal2,
  Root: Root2,
  Title,
  Trigger: Trigger2,
  createAlertDialogScope
} = mod7;

// components/ui/alert-dialog.tsx
var AlertDialog2 = Root2;
var AlertDialogTrigger2 = Trigger2;
var AlertDialogPortal2 = Portal2;
var AlertDialogOverlay2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref,
    ...usePortalScopeProps()
  }
));
AlertDialogOverlay2.displayName = Overlay2.displayName;
var AlertDialogContent2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal2, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay2, {}),
  /* @__PURE__ */ jsx(
    Content2,
    {
      ref,
      ...usePortalScopeProps(),
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent2.displayName = Content2.displayName;
var AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle2.displayName = Title.displayName;
var AlertDialogDescription2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription2.displayName = Description.displayName;
var AlertDialogAction2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction2.displayName = Action.displayName;
var AlertDialogCancel2 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel2.displayName = Cancel.displayName;

// components/ui/card.tsx
var Card = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border border-border bg-card text-card-foreground",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var CardHeader = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
var CardTitle = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";

// node_modules/@radix-ui/react-context/dist/index.mjs
var __defProp4 = Object.defineProperty;
var __name3 = (target, value) => __defProp4(target, "name", { value, configurable: true });
// @__NO_SIDE_EFFECTS__
function createContext2(rootComponentName, defaultContext) {
  const Context = createContext(defaultContext);
  Context.displayName = rootComponentName + "Context";
  const Provider2 = /* @__PURE__ */ __name3((props) => {
    const { children, ...context2 } = props;
    const value = useMemo(() => context2, Object.values(context2));
    return /* @__PURE__ */ jsx(Context.Provider, { value, children });
  }, "Provider");
  Provider2.displayName = rootComponentName + "Provider";
  function useContext2(consumerName, options = {}) {
    const { optional = false } = options;
    const context2 = useContext(Context);
    if (context2) return context2;
    if (defaultContext !== void 0) return defaultContext;
    if (optional) return void 0;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  __name3(useContext2, "useContext");
  return [Provider2, useContext2];
}
__name3(createContext2, "createContext");
// @__NO_SIDE_EFFECTS__
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider2 = /* @__PURE__ */ __name3((props) => {
      const { scope, children, ...context2 } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = useMemo(() => context2, Object.values(context2));
      return /* @__PURE__ */ jsx(Context.Provider, { value, children });
    }, "Provider");
    Provider2.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope, options = {}) {
      const { optional = false } = options;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context2 = useContext(Context);
      if (context2) return context2;
      if (defaultContext !== void 0) return defaultContext;
      if (optional) return void 0;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    __name3(useContext2, "useContext");
    return [Provider2, useContext2];
  }
  __name3(createContext3, "createContext");
  const createScope = /* @__PURE__ */ __name3(() => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return createContext(defaultContext);
    });
    return /* @__PURE__ */ __name3(function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    }, "useScope");
  }, "createScope");
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
__name3(createContextScope, "createContextScope");
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = /* @__PURE__ */ __name3(() => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return /* @__PURE__ */ __name3(function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    }, "useComposedScopes");
  }, "createScope");
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
__name3(composeContextScopes, "composeContextScopes");

// node_modules/@radix-ui/primitive/dist/index.mjs
var __defProp5 = Object.defineProperty;
var __name4 = (target, value) => __defProp5(target, "name", { value, configurable: true });
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return /* @__PURE__ */ __name4(function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  }, "handleEvent");
}
__name4(composeEventHandlers, "composeEventHandlers");
function getOwnerWindow(element) {
  if (!canUseDOM) {
    throw new Error("Cannot access window outside of the DOM");
  }
  return element?.ownerDocument?.defaultView ?? window;
}
__name4(getOwnerWindow, "getOwnerWindow");
function getOwnerDocument(element) {
  if (!canUseDOM) {
    throw new Error("Cannot access document outside of the DOM");
  }
  return element?.ownerDocument ?? document;
}
__name4(getOwnerDocument, "getOwnerDocument");
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getOwnerDocument(node);
  if (!activeElement?.nodeName) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id3 = activeElement.getAttribute("aria-activedescendant");
    if (id3) {
      const element = getOwnerDocument(activeElement).getElementById(id3);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
__name4(getActiveElement, "getActiveElement");
function isFrame(element) {
  return element.tagName === "IFRAME";
}
__name4(isFrame, "isFrame");

// node_modules/@radix-ui/primitive/dist/internal/is-development.false.mjs
var IS_DEVELOPMENT = false;

// node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var useLayoutEffect2 = globalThis?.document ? useLayoutEffect : () => {
};

// node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
var __defProp6 = Object.defineProperty;
var __name5 = (target, value) => __defProp6(target, "name", { value, configurable: true });
var useReactEffectEvent = react_exports[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = react_exports[" useInsertionEffect ".trim().toString()];
function useEffectEvent2(callback) {
  if (typeof useReactEffectEvent === "function") {
    return useReactEffectEvent(callback);
  }
  const ref = useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  if (typeof useReactInsertionEffect === "function") {
    useReactInsertionEffect(() => {
      ref.current = callback;
    });
  } else {
    useLayoutEffect2(() => {
      ref.current = callback;
    });
  }
  return useMemo(() => ((...args) => ref.current?.(...args)), []);
}
__name5(useEffectEvent2, "useEffectEvent");

// node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var __defProp7 = Object.defineProperty;
var __name6 = (target, value) => __defProp7(target, "name", { value, configurable: true });
var useInsertionEffect2 = react_exports[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = /* @__PURE__ */ __name6(() => {
  }, "onChange"),
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  if (IS_DEVELOPMENT) {
    const isControlledRef = useRef(prop !== void 0);
    useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
__name6(useControllableState, "useControllableState");
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = useState(defaultProp);
  const prevValueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  useInsertionEffect2(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
__name6(useUncontrolledState, "useUncontrolledState");
function isFunction(value) {
  return typeof value === "function";
}
__name6(isFunction, "isFunction");
var SYNC_STATE = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function useControllableStateReducer(reducer, userArgs, initialArg, init) {
  const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
  const isControlled = controlledState !== void 0;
  const onChange = useEffectEvent2(onChangeProp);
  if (IS_DEVELOPMENT) {
    const isControlledRef = useRef(controlledState !== void 0);
    useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const args = [{ ...initialArg, state: defaultProp }];
  if (init) {
    args.push(init);
  }
  const [internalState, dispatch] = useReducer(
    (state2, action) => {
      if (action.type === SYNC_STATE) {
        return { ...state2, state: action.state };
      }
      const next = reducer(state2, action);
      if (isControlled && !Object.is(next.state, state2.state)) {
        onChange(next.state);
      }
      return next;
    },
    ...args
  );
  const uncontrolledState = internalState.state;
  const prevValueRef = useRef(uncontrolledState);
  useEffect(() => {
    if (prevValueRef.current !== uncontrolledState) {
      prevValueRef.current = uncontrolledState;
      if (!isControlled) {
        onChange(uncontrolledState);
      }
    }
  }, [uncontrolledState, prevValueRef, isControlled]);
  const state = useMemo(() => {
    const isControlled2 = controlledState !== void 0;
    if (isControlled2) {
      return { ...internalState, state: controlledState };
    }
    return internalState;
  }, [internalState, controlledState]);
  useEffect(() => {
    if (isControlled && !Object.is(controlledState, internalState.state)) {
      dispatch({ type: SYNC_STATE, state: controlledState });
    }
  }, [controlledState, internalState.state, isControlled]);
  return [state, dispatch];
}
__name6(useControllableStateReducer, "useControllableStateReducer");

// node_modules/@radix-ui/react-use-size/dist/index.mjs
var __defProp8 = Object.defineProperty;
var __name7 = (target, value) => __defProp8(target, "name", { value, configurable: true });
function useSize(element) {
  const [size, setSize] = useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}
__name7(useSize, "useSize");

// node_modules/@radix-ui/react-presence/dist/index.mjs
var __defProp9 = Object.defineProperty;
var __name8 = (target, value) => __defProp9(target, "name", { value, configurable: true });
function useStateMachine(initialState, machine) {
  return useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
__name8(useStateMachine, "useStateMachine");
var Presence = /* @__PURE__ */ __name8((props) => {
  const { present, children } = props;
  const presence = usePresence2(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : Children.only(children);
  const ref = useStableComposedRefs(presence.ref, getElementRef2(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? cloneElement(child, { ref }) : null;
}, "Presence");
function usePresence2(present) {
  const [node, setNode] = useState();
  const stylesRef = useRef(null);
  const prevPresentRef = useRef(present);
  const prevAnimationNameRef = useRef("none");
  const mountAnimationNameRef = useRef(void 0);
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  useEffect(() => {
    if (state === "mounted") {
      prevAnimationNameRef.current = mountAnimationNameRef.current ?? getAnimationName(stylesRef.current);
      mountAnimationNameRef.current = void 0;
    } else {
      prevAnimationNameRef.current = "none";
    }
  }, [state]);
  useLayoutEffect2(() => {
    const styles2 = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles2);
      if (present) {
        mountAnimationNameRef.current = currentAnimationName;
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles2?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = /* @__PURE__ */ __name8((event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      }, "handleAnimationEnd");
      const handleAnimationStart = /* @__PURE__ */ __name8((event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      }, "handleAnimationStart");
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: useCallback((node2) => {
      if (node2) {
        const styles2 = getComputedStyle(node2);
        stylesRef.current = styles2;
        mountAnimationNameRef.current = getAnimationName(styles2);
      } else {
        stylesRef.current = null;
      }
      setNode(node2);
    }, [])
  };
}
__name8(usePresence2, "usePresence");
function setRef3(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
__name8(setRef3, "setRef");
function useStableComposedRefs(...refs) {
  const refsRef = useRef(refs);
  refsRef.current = refs;
  return useCallback((node) => {
    const currentRefs = refsRef.current;
    let hasCleanup = false;
    const cleanups = currentRefs.map((ref) => {
      const cleanup = setRef3(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i2 = 0; i2 < cleanups.length; i2++) {
          const cleanup = cleanups[i2];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef3(currentRefs[i2], null);
          }
        }
      };
    }
  }, []);
}
__name8(useStableComposedRefs, "useStableComposedRefs");
function getAnimationName(styles2) {
  return styles2?.animationName || "none";
}
__name8(getAnimationName, "getAnimationName");
function getElementRef2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
__name8(getElementRef2, "getElementRef");

// bb-plugin-runtime-shim:react-dom
var runtime8 = globalThis.__bbPluginRuntime;
if (runtime8 == null || runtime8.reactDom == null) {
  throw new Error('Cannot load "react-dom": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod8 = runtime8.reactDom;
var {
  createPortal,
  flushSync,
  preconnect,
  prefetchDNS,
  preinit,
  preinitModule,
  preload,
  preloadModule,
  requestFormReset,
  unstable_batchedUpdates,
  useFormState,
  useFormStatus,
  version: version3
} = mod8;

// node_modules/@radix-ui/react-primitive/dist/index.mjs
var __defProp10 = Object.defineProperty;
var __name9 = (target, value) => __defProp10(target, "name", { value, configurable: true });
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot(`Primitive.${node}`);
  const Node2 = forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) flushSync(() => target.dispatchEvent(event));
}
__name9(dispatchDiscreteCustomEvent, "dispatchDiscreteCustomEvent");

// node_modules/@radix-ui/react-checkbox/dist/index.mjs
var __defProp11 = Object.defineProperty;
var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
  const {
    __scopeCheckbox,
    checked: checkedProp,
    children,
    defaultChecked,
    disabled,
    form,
    name,
    onCheckedChange,
    required,
    value = "on",
    // @ts-expect-error
    internal_do_not_use_render
  } = props;
  const [checked, setChecked] = useControllableState({
    prop: checkedProp,
    defaultProp: defaultChecked ?? false,
    onChange: onCheckedChange,
    caller: CHECKBOX_NAME
  });
  const [control, setControl] = useState(null);
  const [bubbleInput, setBubbleInput] = useState(null);
  const hasConsumerStoppedPropagationRef = useRef(false);
  const [userInteractionCount, onUserInteraction] = useReducer(
    (count2) => count2 + 1,
    0
  );
  const isFormControl = control ? !!form || !!control.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    true
  );
  const context2 = {
    checked,
    disabled,
    setChecked,
    control,
    setControl,
    name,
    form,
    value,
    hasConsumerStoppedPropagationRef,
    userInteractionCount,
    onUserInteraction,
    required,
    defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
    isFormControl,
    bubbleInput,
    setBubbleInput
  };
  return /* @__PURE__ */ jsx(
    CheckboxProviderImpl,
    {
      scope: __scopeCheckbox,
      ...context2,
      children: isFunction2(internal_do_not_use_render) ? internal_do_not_use_render(context2) : children
    }
  );
}
__name10(CheckboxProvider, "CheckboxProvider");
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = /* @__PURE__ */ forwardRef(
  /* @__PURE__ */ __name10(function CheckboxTrigger2({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) {
    const {
      control,
      value,
      disabled,
      checked,
      required,
      setControl,
      setChecked,
      hasConsumerStoppedPropagationRef,
      onUserInteraction,
      isFormControl,
      bubbleInput
    } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs2(forwardedRef, setControl);
    const initialCheckedStateRef = useRef(checked);
    useEffect(() => {
      const form = control?.form;
      if (form) {
        const reset = /* @__PURE__ */ __name10(() => setChecked(initialCheckedStateRef.current), "reset");
        form.addEventListener("reset", reset);
        return () => form.removeEventListener("reset", reset);
      }
    }, [control, setChecked]);
    return /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": isIndeterminate(checked) ? "mixed" : checked,
        "aria-required": required,
        "data-state": getState(checked),
        "data-disabled": disabled ? "" : void 0,
        disabled,
        value,
        ...checkboxProps,
        ref: composedRefs,
        onKeyDown: composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "Enter") event.preventDefault();
        }),
        onClick: composeEventHandlers(onClick, (event) => {
          onUserInteraction();
          setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
          if (bubbleInput && isFormControl) {
            hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
            if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
          }
        })
      }
    );
  }, "CheckboxTrigger")
);
var Checkbox = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name10(function Checkbox2(props, forwardedRef) {
    const {
      __scopeCheckbox,
      name,
      checked,
      defaultChecked,
      required,
      disabled,
      value,
      onCheckedChange,
      form,
      ...checkboxProps
    } = props;
    return /* @__PURE__ */ jsx(
      CheckboxProvider,
      {
        __scopeCheckbox,
        checked,
        defaultChecked,
        disabled,
        required,
        onCheckedChange,
        name,
        form,
        value,
        internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ jsxs(Fragment2, { children: [
          /* @__PURE__ */ jsx(
            CheckboxTrigger,
            {
              ...checkboxProps,
              ref: forwardedRef,
              __scopeCheckbox
            }
          ),
          isFormControl && /* @__PURE__ */ jsx(
            CheckboxBubbleInput,
            {
              __scopeCheckbox
            }
          )
        ] })
      }
    );
  }, "Checkbox")
);
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name10(function CheckboxIndicator2(props, forwardedRef) {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context2 = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return /* @__PURE__ */ jsx(
      Presence,
      {
        present: forceMount || isIndeterminate(context2.checked) || context2.checked === true,
        children: /* @__PURE__ */ jsx(
          Primitive.span,
          {
            "data-state": getState(context2.checked),
            "data-disabled": context2.disabled ? "" : void 0,
            ...indicatorProps,
            ref: forwardedRef,
            style: { pointerEvents: "none", ...props.style }
          }
        )
      }
    );
  }, "CheckboxIndicator")
);
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name10(function CheckboxBubbleInput2({ __scopeCheckbox, onClick, ...props }, forwardedRef) {
    const {
      control,
      hasConsumerStoppedPropagationRef,
      userInteractionCount,
      checked,
      defaultChecked,
      required,
      disabled,
      name,
      value,
      form,
      bubbleInput,
      setBubbleInput
    } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
    const composedRefs = useComposedRefs2(forwardedRef, setBubbleInput);
    const controlSize = useSize(control);
    const shouldStopClickPropagationRef = useRef(false);
    const prevCheckedRef = useRef(checked);
    const prevUserInteractionCountRef = useRef(userInteractionCount);
    useEffect(() => {
      const input = bubbleInput;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      const isUserInteraction = userInteractionCount !== prevUserInteractionCountRef.current;
      prevUserInteractionCountRef.current = userInteractionCount;
      const checkedChanged = prevCheckedRef.current !== checked;
      prevCheckedRef.current = checked;
      const bubbles = !(isUserInteraction && hasConsumerStoppedPropagationRef.current);
      if (checkedChanged && setChecked) {
        shouldStopClickPropagationRef.current = !isUserInteraction;
        const event = new Event("click", { bubbles });
        input.indeterminate = isIndeterminate(checked);
        setChecked.call(input, isIndeterminate(checked) ? false : checked);
        input.dispatchEvent(event);
        shouldStopClickPropagationRef.current = false;
      }
    }, [bubbleInput, checked, hasConsumerStoppedPropagationRef, userInteractionCount]);
    const defaultCheckedRef = useRef(isIndeterminate(checked) ? false : checked);
    return /* @__PURE__ */ jsx(
      Primitive.input,
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: defaultChecked ?? defaultCheckedRef.current,
        required,
        disabled,
        name,
        value,
        form,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        onClick: composeEventHandlers(onClick, (event) => {
          if (shouldStopClickPropagationRef.current) {
            event.stopPropagation();
          }
        }),
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }, "CheckboxBubbleInput")
);
function isFunction2(value) {
  return typeof value === "function";
}
__name10(isFunction2, "isFunction");
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
__name10(isIndeterminate, "isIndeterminate");
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
__name10(getState, "getState");

// components/ui/checkbox.tsx
var Checkbox3 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Checkbox,
  {
    ref,
    className: cn(
      `peer size-4 shrink-0 rounded-sm border border-input shadow-xs ${CONTROL_HOVER_TRANSITION} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background`,
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      CheckboxIndicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsx(Icon, { name: "Check", className: "size-3.5" })
      }
    )
  }
));
Checkbox3.displayName = Checkbox.displayName;

// components/ui/input.tsx
var Input = forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        autoComplete: "off",
        className: cn(
          `flex w-full rounded-md border border-input bg-transparent px-3 py-1 ${CONTROL_HOVER_TRANSITION} file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
          COARSE_POINTER_INPUT_HEIGHT_CLASS,
          COARSE_POINTER_TEXT_BASE_CLASS,
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// bb-plugin-runtime-shim:@radix-ui/react-popover
var runtime9 = globalThis.__bbPluginRuntime;
if (runtime9 == null || runtime9.radixPopover == null) {
  throw new Error('Cannot load "@radix-ui/react-popover": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod9 = runtime9.radixPopover;
var {
  Anchor,
  Arrow: Arrow2,
  Close,
  Content: Content3,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  Portal: Portal3,
  Root: Root3,
  Trigger: Trigger3,
  createPopoverScope
} = mod9;

// bb-plugin-runtime-shim:vaul
var runtime10 = globalThis.__bbPluginRuntime;
if (runtime10 == null || runtime10.vaul == null) {
  throw new Error('Cannot load "vaul": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod10 = runtime10.vaul;
var {
  Content: Content4,
  Drawer,
  Handle,
  NestedRoot,
  Overlay: Overlay3,
  Portal: Portal4,
  Root: Root4
} = mod10;

// components/ui/overlay-trigger.ts
var OVERLAY_TRIGGER_CLASS_NAME = "select-none";
var NON_TEXT_INPUT_TYPES = /* @__PURE__ */ new Set([
  "button",
  "checkbox",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit"
]);
var getOverlayTriggerClassName = (className) => cn(OVERLAY_TRIGGER_CLASS_NAME, className);
function isKeyboardInputElement(element) {
  if (element instanceof HTMLTextAreaElement) return true;
  if (element instanceof HTMLInputElement) {
    return !element.disabled && !element.readOnly && !NON_TEXT_INPUT_TYPES.has(element.type);
  }
  if (!(element instanceof HTMLElement)) return false;
  return element.isContentEditable || element.closest("[contenteditable='true']") !== null;
}
function blurActiveKeyboardInputWithin(container) {
  if (typeof document === "undefined") return;
  const activeElement = document.activeElement;
  if (!activeElement || !isKeyboardInputElement(activeElement)) return;
  if (container !== null && !container.contains(activeElement)) return;
  activeElement.blur();
}
function blurActiveKeyboardInputBeforeOverlayOpen() {
  blurActiveKeyboardInputWithin(null);
}
function blurActiveKeyboardInputBeforeOverlayClose() {
  blurActiveKeyboardInputWithin(null);
}
function preventOverlayTriggerSelection(event) {
  event.preventDefault();
}
var lastInputModality = "pointer";
if (typeof document !== "undefined") {
  document.addEventListener(
    "keydown",
    () => {
      lastInputModality = "keyboard";
    },
    { capture: true }
  );
  document.addEventListener(
    "pointerdown",
    () => {
      lastInputModality = "pointer";
    },
    { capture: true }
  );
}

// components/ui/drawer.tsx
var Drawer2 = ({
  shouldScaleBackground = false,
  ...props
}) => /* @__PURE__ */ jsx(
  Drawer.Root,
  {
    shouldScaleBackground,
    ...props
  }
);
Drawer2.displayName = "Drawer";
var DrawerTrigger = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer.Trigger,
  {
    ref,
    className: getOverlayTriggerClassName(className),
    onMouseDown: preventOverlayTriggerSelection,
    ...props
  }
));
DrawerTrigger.displayName = Drawer.Trigger.displayName;
var DrawerPortal = Drawer.Portal;
var DrawerClose = Drawer.Close;
var DrawerOverlay = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer.Overlay,
  {
    ref,
    ...usePortalScopeProps(),
    className: cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]",
      className
    ),
    ...props
  }
));
DrawerOverlay.displayName = Drawer.Overlay.displayName;
var DrawerContent = forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DrawerPortal, { children: [
  /* @__PURE__ */ jsx(DrawerOverlay, {}),
  /* @__PURE__ */ jsxs(
    Drawer.Content,
    {
      ref,
      ...usePortalScopeProps(),
      className: cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85dvh] flex-col rounded-t-xl border bg-background",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          Drawer.Handle,
          {
            className: "mx-auto mt-3 mb-1 h-1 w-10 shrink-0 rounded-full bg-muted-foreground/20"
          }
        ),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
var DrawerTitle = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DrawerTitle.displayName = Drawer.Title.displayName;
var DrawerDescription = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Drawer.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = Drawer.Description.displayName;

// components/ui/hooks/use-media-query.ts
var mediaQueryCache = /* @__PURE__ */ new Map();
function createMediaQueryRef(query) {
  if (typeof window === "undefined") return null;
  let ref = mediaQueryCache.get(query);
  if (ref) return ref;
  const mql = window.matchMedia(query);
  const listeners = /* @__PURE__ */ new Set();
  const onChange = () => {
    for (const listener of listeners) listener();
  };
  ref = {
    mql,
    subscribe(notify) {
      const wasEmpty = listeners.size === 0;
      listeners.add(notify);
      if (wasEmpty) {
        mql.addEventListener("change", onChange);
      }
      return () => {
        listeners.delete(notify);
        if (listeners.size === 0) {
          mql.removeEventListener("change", onChange);
          mediaQueryCache.delete(query);
        }
      };
    }
  };
  mediaQueryCache.set(query, ref);
  return ref;
}
function subscribeMediaQuery(query, notify) {
  return createMediaQueryRef(query)?.subscribe(notify) ?? (() => {
  });
}
function getMediaQuerySnapshot(query) {
  if (typeof window === "undefined") return false;
  return mediaQueryCache.get(query)?.mql.matches ?? window.matchMedia(query).matches;
}
function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => subscribeMediaQuery(query, notify),
    () => getMediaQuerySnapshot(query),
    () => false
  );
}

// components/ui/hooks/use-compact-viewport.tsx
var COMPACT_VIEWPORT_QUERY = "(max-width: 767px)";
var CompactViewportOverrideContext = createContext(null);
function useIsCompactViewport() {
  const override = useContext(CompactViewportOverrideContext);
  const isCompactViewport = useMediaQuery(COMPACT_VIEWPORT_QUERY);
  if (override !== null) {
    return override;
  }
  return isCompactViewport;
}

// components/ui/hooks/use-pointer-coarse.ts
var POINTER_COARSE_QUERY = "(pointer: coarse)";
function usePointerCoarse() {
  return useMediaQuery(POINTER_COARSE_QUERY);
}

// components/ui/responsive-overlay.tsx
var ResponsiveDrawerDepthContext = createContext(0);
var SONNER_TOASTER_SELECTOR = "[data-sonner-toaster]";
function resetDrawerKeyboardStyles(drawerElement) {
  if (drawerElement === null) return;
  drawerElement.style.height = "";
  drawerElement.style.bottom = "";
}
function isSonnerToasterPointerTarget(target) {
  return target instanceof Element && target.closest(SONNER_TOASTER_SELECTOR) !== null;
}
function useResponsiveRoot(controlledOpen, controlledOnChange, defaultOpen = false) {
  const isCompactViewport = useIsCompactViewport();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const onOpenChange = useCallback(
    (next) => {
      if (open && !next && isCompactViewport) {
        blurActiveKeyboardInputBeforeOverlayClose();
      }
      if (!isControlled) {
        setInternalOpen(next);
      }
      controlledOnChange?.(next);
    },
    [isCompactViewport, isControlled, controlledOnChange, open]
  );
  return useMemo(
    () => ({ isCompactViewport, open, onOpenChange }),
    [isCompactViewport, open, onOpenChange]
  );
}
var MobileTrigger = forwardRef(
  ({
    asChild,
    open,
    onOpenChange,
    haspopup,
    onClick,
    children,
    className,
    ...domProps
  }, ref) => {
    const triggerClassName = getOverlayTriggerClassName(className);
    const handleClick = (e) => {
      onClick?.(e);
      if (!e.defaultPrevented) {
        if (!open) {
          blurActiveKeyboardInputBeforeOverlayOpen();
        }
        onOpenChange(!open);
      }
    };
    const ariaProps = {
      "aria-expanded": open,
      "aria-haspopup": haspopup,
      "data-state": open ? "open" : "closed"
    };
    if (asChild) {
      return /* @__PURE__ */ jsx(
        Slot,
        {
          ref,
          onClick: handleClick,
          onMouseDown: preventOverlayTriggerSelection,
          className: triggerClassName,
          ...ariaProps,
          ...domProps,
          children
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: "button",
        onClick: handleClick,
        onMouseDown: preventOverlayTriggerSelection,
        className: triggerClassName,
        ...ariaProps,
        ...domProps,
        children
      }
    );
  }
);
MobileTrigger.displayName = "MobileTrigger";
var RADIX_CONTENT_PROP_NAMES = [
  "side",
  "sideOffset",
  "align",
  "alignOffset",
  "collisionPadding",
  "collisionBoundary",
  "arrowPadding",
  "sticky",
  "hideWhenDetached",
  "avoidCollisions",
  "onOpenAutoFocus",
  "onCloseAutoFocus",
  "onEscapeKeyDown",
  "onPointerDownOutside",
  "onFocusOutside",
  "onInteractOutside"
];
var RADIX_CONTENT_KEYS = new Set(
  RADIX_CONTENT_PROP_NAMES
);
function stripRadixContentProps(props) {
  const result = {};
  for (const key of Object.keys(props)) {
    if (!RADIX_CONTENT_KEYS.has(key)) {
      result[key] = props[key];
    }
  }
  return result;
}
function ResponsiveDrawerShell({
  open,
  onOpenChange,
  srLabel,
  contentClassName,
  handleOnly,
  repositionInputs,
  onContentAnimationEnd,
  children
}) {
  const parentDrawerDepth = useContext(ResponsiveDrawerDepthContext);
  const drawerContentRef = useRef(null);
  const isPointerCoarse = usePointerCoarse();
  const isNestedDrawer = parentDrawerDepth > 0;
  const shouldRepositionInputs = repositionInputs ?? !isNestedDrawer;
  const resetClosingKeyboardState = useCallback(() => {
    blurActiveKeyboardInputWithin(drawerContentRef.current);
    resetDrawerKeyboardStyles(drawerContentRef.current);
  }, []);
  const handleOpenChange = useCallback(
    (nextOpen) => {
      if (!nextOpen) {
        resetClosingKeyboardState();
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetClosingKeyboardState]
  );
  const handleContentAnimationEnd = useCallback(
    (event) => {
      if (event.currentTarget !== event.target) {
        return;
      }
      onContentAnimationEnd?.(open);
    },
    [onContentAnimationEnd, open]
  );
  const handleOpenAutoFocus = useCallback(
    (event) => {
      if (isPointerCoarse) {
        event.preventDefault();
      }
    },
    [isPointerCoarse]
  );
  const handlePointerDownOutside = useCallback(
    (event) => {
      if (isSonnerToasterPointerTarget(event.detail.originalEvent.target)) {
        event.preventDefault();
      }
    },
    []
  );
  const previousOpenRef = useRef(open);
  useLayoutEffect(() => {
    if (previousOpenRef.current && !open) {
      resetClosingKeyboardState();
    }
    previousOpenRef.current = open;
  }, [open, resetClosingKeyboardState]);
  return /* @__PURE__ */ jsx(
    Drawer2,
    {
      open,
      onOpenChange: handleOpenChange,
      handleOnly,
      nested: isNestedDrawer,
      repositionInputs: shouldRepositionInputs,
      children: /* @__PURE__ */ jsx(
        DrawerContent,
        {
          ref: drawerContentRef,
          className: contentClassName,
          onAnimationEnd: handleContentAnimationEnd,
          onOpenAutoFocus: handleOpenAutoFocus,
          onPointerDownOutside: handlePointerDownOutside,
          children: /* @__PURE__ */ jsxs(ResponsiveDrawerDepthContext.Provider, { value: parentDrawerDepth + 1, children: [
            srLabel !== void 0 ? /* @__PURE__ */ jsx(DrawerTitle, { className: "sr-only", children: srLabel }) : null,
            children
          ] })
        }
      )
    }
  );
}

// components/ui/popover.tsx
var ResponsivePopoverContext = createContext({
  isCompactViewport: false,
  open: false,
  onOpenChange: () => {
  }
});
function useResponsivePopover() {
  return useContext(ResponsivePopoverContext);
}
function Popover2({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnChange,
  defaultOpen,
  ...props
}) {
  const ctx = useResponsiveRoot(
    controlledOpen,
    controlledOnChange,
    defaultOpen
  );
  if (ctx.isCompactViewport) {
    return /* @__PURE__ */ jsx(ResponsivePopoverContext.Provider, { value: ctx, children });
  }
  return /* @__PURE__ */ jsx(
    Root3,
    {
      open: ctx.open,
      onOpenChange: ctx.onOpenChange,
      ...props,
      children: /* @__PURE__ */ jsx(ResponsivePopoverContext.Provider, { value: ctx, children })
    }
  );
}
var PopoverTrigger2 = forwardRef(({ asChild, children, className, ...props }, ref) => {
  const { isCompactViewport, open, onOpenChange } = useResponsivePopover();
  if (isCompactViewport) {
    return /* @__PURE__ */ jsx(
      MobileTrigger,
      {
        ref,
        asChild,
        open,
        onOpenChange,
        haspopup: "dialog",
        className,
        ...props,
        children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Trigger3,
    {
      ref,
      asChild,
      className: getOverlayTriggerClassName(className),
      onMouseDown: (event) => {
        if (!open) {
          blurActiveKeyboardInputBeforeOverlayOpen();
        }
        preventOverlayTriggerSelection(event);
      },
      ...props,
      children
    }
  );
});
PopoverTrigger2.displayName = "PopoverTrigger";
var PopoverContent2 = forwardRef(
  ({
    className,
    align = "center",
    sideOffset = 4,
    children,
    mobileTitle,
    mobileClassName,
    ...props
  }, ref) => {
    const { isCompactViewport, open, onOpenChange } = useResponsivePopover();
    const scopeProps = usePortalScopeProps();
    if (isCompactViewport) {
      const domProps = stripRadixContentProps(props);
      return /* @__PURE__ */ jsx(
        ResponsiveDrawerShell,
        {
          open,
          onOpenChange,
          srLabel: mobileTitle ?? "Options",
          contentClassName: mobileClassName,
          repositionInputs: false,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              ref,
              className: cn(
                "overflow-y-auto px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]",
                className
              ),
              ...domProps,
              children
            }
          )
        }
      );
    }
    return /* @__PURE__ */ jsx(Portal3, { children: /* @__PURE__ */ jsx(
      Content3,
      {
        ref,
        ...scopeProps,
        align,
        sideOffset,
        className: cn(
          "z-50 w-96 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        ),
        ...props,
        children
      }
    ) });
  }
);
PopoverContent2.displayName = "PopoverContent";
var PopoverAnchor2 = forwardRef(({ children, ...props }, ref) => {
  const { isCompactViewport } = useResponsivePopover();
  if (isCompactViewport) {
    return /* @__PURE__ */ jsx(Fragment2, { children });
  }
  return /* @__PURE__ */ jsx(Anchor, { ref, ...props, children });
});
PopoverAnchor2.displayName = "PopoverAnchor";

// node_modules/@radix-ui/react-progress/dist/index.mjs
var __defProp12 = Object.defineProperty;
var __name11 = (target, value) => __defProp12(target, "name", { value, configurable: true });
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name11(function Progress2(props, forwardedRef) {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber2(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber2(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }, "Progress")
);
var INDICATOR_NAME2 = "ProgressIndicator";
var ProgressIndicator = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name11(function ProgressIndicator2(props, forwardedRef) {
    const { __scopeProgress, ...indicatorProps } = props;
    const context2 = useProgressContext(INDICATOR_NAME2, __scopeProgress);
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context2.value, context2.max),
        "data-value": context2.value ?? void 0,
        "data-max": context2.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }, "ProgressIndicator")
);
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
__name11(defaultGetValueLabel, "defaultGetValueLabel");
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
__name11(getProgressState, "getProgressState");
function isNumber2(value) {
  return typeof value === "number";
}
__name11(isNumber2, "isNumber");
function isValidMaxNumber(max) {
  return isNumber2(max) && !isNaN(max) && max > 0;
}
__name11(isValidMaxNumber, "isValidMaxNumber");
function isValidValueNumber(value, max) {
  return isNumber2(value) && !isNaN(value) && value <= max && value >= 0;
}
__name11(isValidValueNumber, "isValidValueNumber");
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
__name11(getInvalidMaxError, "getInvalidMaxError");
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
__name11(getInvalidValueError, "getInvalidValueError");
var Root5 = Progress;
var Indicator = ProgressIndicator;

// components/ui/progress.tsx
var Progress3 = forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  Root5,
  {
    ref,
    className: cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress3.displayName = Root5.displayName;

// components/ui/switch.tsx
var Switch = forwardRef(
  ({
    checked,
    className,
    disabled,
    size = "sm",
    onCheckedChange,
    onClick,
    ...props
  }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      ref,
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled,
      "data-state": checked ? "checked" : "unchecked",
      className: cn(
        `peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input shadow-xs ${CONTROL_HOVER_TRANSITION} outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=unchecked]:bg-muted`,
        size === "default" && "h-5 w-9",
        size === "sm" && "h-4 w-7",
        className
      ),
      onClick: (event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          onCheckedChange?.(!checked);
        }
      },
      children: /* @__PURE__ */ jsx(
        "span",
        {
          "aria-hidden": true,
          "data-state": checked ? "checked" : "unchecked",
          className: cn(
            "pointer-events-none block rounded-full bg-background ring-0 transition-transform data-[state=unchecked]:translate-x-0",
            size === "default" && "size-4 data-[state=checked]:translate-x-4",
            size === "sm" && "size-3 data-[state=checked]:translate-x-3"
          )
        }
      )
    }
  )
);
Switch.displayName = "Switch";

// node_modules/@radix-ui/react-collection/dist/index.mjs
var __defProp13 = Object.defineProperty;
var __name12 = (target, value) => __defProp13(target, "name", { value, configurable: true });
// @__NO_SIDE_EFFECTS__
function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = /* @__PURE__ */ __name12((props) => {
    const { scope, children } = props;
    const ref = useRef(null);
    const itemMap = useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  }, "CollectionProvider");
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context2 = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs2(forwardedRef, context2.collectionRef);
      return /* @__PURE__ */ jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = useRef(null);
      const composedRefs = useComposedRefs2(forwardedRef, ref);
      const context2 = useCollectionContext(ITEM_SLOT_NAME, scope);
      useEffect(() => {
        context2.itemMap.set(ref, { ref, ...itemData });
        return () => void context2.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection2(scope) {
    const context2 = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = useCallback(() => {
      const collectionNode = context2.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context2.itemMap.values());
      const orderedItems = items.sort(
        (a, b2) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b2.ref.current)
      );
      return orderedItems;
    }, [context2.collectionRef, context2.itemMap]);
    return getItems;
  }
  __name12(useCollection2, "useCollection");
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection2,
    createCollectionScope2
  ];
}
__name12(createCollection, "createCollection");
var __instanciated = /* @__PURE__ */ new WeakMap();
var OrderedDict = class _OrderedDict extends Map {
  static {
    __name12(this, "OrderedDict");
  }
  #keys;
  constructor(entries) {
    super(entries);
    this.#keys = [...super.keys()];
    __instanciated.set(this, true);
  }
  set(key, value) {
    if (__instanciated.get(this)) {
      if (this.has(key)) {
        this.#keys[this.#keys.indexOf(key)] = key;
      } else {
        this.#keys.push(key);
      }
    }
    super.set(key, value);
    return this;
  }
  insert(index, key, value) {
    const has = this.has(key);
    const length = this.#keys.length;
    const relativeIndex = toSafeInteger(index);
    let actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    const safeIndex = actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
    if (safeIndex === this.size || has && safeIndex === this.size - 1 || safeIndex === -1) {
      this.set(key, value);
      return this;
    }
    const size = this.size + (has ? 0 : 1);
    if (relativeIndex < 0) {
      actualIndex++;
    }
    const keys = [...this.#keys];
    let nextValue;
    let shouldSkip = false;
    for (let i2 = actualIndex; i2 < size; i2++) {
      if (actualIndex === i2) {
        let nextKey = keys[i2];
        if (keys[i2] === key) {
          nextKey = keys[i2 + 1];
        }
        if (has) {
          this.delete(key);
        }
        nextValue = this.get(nextKey);
        this.set(key, value);
      } else {
        if (!shouldSkip && keys[i2 - 1] === key) {
          shouldSkip = true;
        }
        const currentKey = keys[shouldSkip ? i2 : i2 - 1];
        const currentValue = nextValue;
        nextValue = this.get(currentKey);
        this.delete(currentKey);
        this.set(currentKey, currentValue);
      }
    }
    return this;
  }
  with(index, key, value) {
    const copy = new _OrderedDict(this);
    copy.insert(index, key, value);
    return copy;
  }
  before(key) {
    const index = this.#keys.indexOf(key) - 1;
    if (index < 0) {
      return void 0;
    }
    return this.entryAt(index);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(key, newKey, value) {
    const index = this.#keys.indexOf(key);
    if (index === -1) {
      return this;
    }
    return this.insert(index, newKey, value);
  }
  after(key) {
    let index = this.#keys.indexOf(key);
    index = index === -1 || index === this.size - 1 ? -1 : index + 1;
    if (index === -1) {
      return void 0;
    }
    return this.entryAt(index);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(key, newKey, value) {
    const index = this.#keys.indexOf(key);
    if (index === -1) {
      return this;
    }
    return this.insert(index + 1, newKey, value);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    this.#keys = [];
    return super.clear();
  }
  delete(key) {
    const deleted = super.delete(key);
    if (deleted) {
      this.#keys.splice(this.#keys.indexOf(key), 1);
    }
    return deleted;
  }
  deleteAt(index) {
    const key = this.keyAt(index);
    if (key !== void 0) {
      return this.delete(key);
    }
    return false;
  }
  at(index) {
    const key = at(this.#keys, index);
    if (key !== void 0) {
      return this.get(key);
    }
  }
  entryAt(index) {
    const key = at(this.#keys, index);
    if (key !== void 0) {
      return [key, this.get(key)];
    }
  }
  indexOf(key) {
    return this.#keys.indexOf(key);
  }
  keyAt(index) {
    return at(this.#keys, index);
  }
  from(key, offset) {
    const index = this.indexOf(key);
    if (index === -1) {
      return void 0;
    }
    let dest = index + offset;
    if (dest < 0) dest = 0;
    if (dest >= this.size) dest = this.size - 1;
    return this.at(dest);
  }
  keyFrom(key, offset) {
    const index = this.indexOf(key);
    if (index === -1) {
      return void 0;
    }
    let dest = index + offset;
    if (dest < 0) dest = 0;
    if (dest >= this.size) dest = this.size - 1;
    return this.keyAt(dest);
  }
  find(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return entry;
      }
      index++;
    }
    return void 0;
  }
  findIndex(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return index;
      }
      index++;
    }
    return -1;
  }
  filter(predicate, thisArg) {
    const entries = [];
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        entries.push(entry);
      }
      index++;
    }
    return new _OrderedDict(entries);
  }
  map(callbackfn, thisArg) {
    const entries = [];
    let index = 0;
    for (const entry of this) {
      entries.push([entry[0], Reflect.apply(callbackfn, thisArg, [entry, index, this])]);
      index++;
    }
    return new _OrderedDict(entries);
  }
  reduce(...args) {
    const [callbackfn, initialValue] = args;
    let index = 0;
    let accumulator = initialValue ?? this.at(0);
    for (const entry of this) {
      if (index === 0 && args.length === 1) {
        accumulator = entry;
      } else {
        accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
      }
      index++;
    }
    return accumulator;
  }
  reduceRight(...args) {
    const [callbackfn, initialValue] = args;
    let accumulator = initialValue ?? this.at(-1);
    for (let index = this.size - 1; index >= 0; index--) {
      const entry = this.at(index);
      if (index === this.size - 1 && args.length === 1) {
        accumulator = entry;
      } else {
        accumulator = Reflect.apply(callbackfn, this, [accumulator, entry, index, this]);
      }
    }
    return accumulator;
  }
  toSorted(compareFn) {
    const entries = [...this.entries()].sort(compareFn);
    return new _OrderedDict(entries);
  }
  toReversed() {
    const reversed = new _OrderedDict();
    for (let index = this.size - 1; index >= 0; index--) {
      const key = this.keyAt(index);
      const element = this.get(key);
      reversed.set(key, element);
    }
    return reversed;
  }
  toSpliced(...args) {
    const entries = [...this.entries()];
    entries.splice(...args);
    return new _OrderedDict(entries);
  }
  slice(start, end) {
    const result = new _OrderedDict();
    let stop = this.size - 1;
    if (start === void 0) {
      return result;
    }
    if (start < 0) {
      start = start + this.size;
    }
    if (end !== void 0 && end > 0) {
      stop = end - 1;
    }
    for (let index = start; index <= stop; index++) {
      const key = this.keyAt(index);
      const element = this.get(key);
      result.set(key, element);
    }
    return result;
  }
  every(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (!Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return false;
      }
      index++;
    }
    return true;
  }
  some(predicate, thisArg) {
    let index = 0;
    for (const entry of this) {
      if (Reflect.apply(predicate, thisArg, [entry, index, this])) {
        return true;
      }
      index++;
    }
    return false;
  }
};
function at(array, index) {
  if ("at" in Array.prototype) {
    return Array.prototype.at.call(array, index);
  }
  const actualIndex = toSafeIndex(array, index);
  return actualIndex === -1 ? void 0 : array[actualIndex];
}
__name12(at, "at");
function toSafeIndex(array, index) {
  const length = array.length;
  const relativeIndex = toSafeInteger(index);
  const actualIndex = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
  return actualIndex < 0 || actualIndex >= length ? -1 : actualIndex;
}
__name12(toSafeIndex, "toSafeIndex");
function toSafeInteger(number2) {
  return number2 !== number2 || number2 === 0 ? 0 : Math.trunc(number2);
}
__name12(toSafeInteger, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function createCollection2(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope2] = createContextScope(PROVIDER_NAME);
  const [CollectionContextProvider, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new OrderedDict(),
      setItemMap: /* @__PURE__ */ __name12(() => void 0, "setItemMap")
    }
  );
  const CollectionProvider = /* @__PURE__ */ __name12(({ state, ...props }) => {
    return state ? /* @__PURE__ */ jsx(CollectionProviderImpl, { ...props, state }) : /* @__PURE__ */ jsx(CollectionInit, { ...props });
  }, "CollectionProvider");
  CollectionProvider.displayName = PROVIDER_NAME;
  const CollectionInit = /* @__PURE__ */ __name12((props) => {
    const state = useInitCollection();
    return /* @__PURE__ */ jsx(CollectionProviderImpl, { ...props, state });
  }, "CollectionInit");
  CollectionInit.displayName = PROVIDER_NAME + "Init";
  const CollectionProviderImpl = /* @__PURE__ */ __name12((props) => {
    const { scope, children, state } = props;
    const ref = useRef(null);
    const [collectionElement, setCollectionElement] = useState(
      null
    );
    const composeRefs3 = useComposedRefs2(ref, setCollectionElement);
    const [itemMap, setItemMap] = state;
    useEffect(() => {
      if (!collectionElement) return;
      const observer2 = getChildListObserver(() => {
      });
      observer2.observe(collectionElement, {
        childList: true,
        subtree: true
      });
      return () => {
        observer2.disconnect();
      };
    }, [collectionElement]);
    return /* @__PURE__ */ jsx(
      CollectionContextProvider,
      {
        scope,
        itemMap,
        setItemMap,
        collectionRef: composeRefs3,
        collectionRefObject: ref,
        collectionElement,
        children
      }
    );
  }, "CollectionProviderImpl");
  CollectionProviderImpl.displayName = PROVIDER_NAME + "Impl";
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context2 = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs2(forwardedRef, context2.collectionRef);
      return /* @__PURE__ */ jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = useRef(null);
      const [element, setElement] = useState(null);
      const composedRefs = useComposedRefs2(forwardedRef, ref, setElement);
      const context2 = useCollectionContext(ITEM_SLOT_NAME, scope);
      const { setItemMap } = context2;
      const itemDataRef = useRef(itemData);
      if (!shallowEqual(itemDataRef.current, itemData)) {
        itemDataRef.current = itemData;
      }
      const memoizedItemData = itemDataRef.current;
      useEffect(() => {
        const itemData2 = memoizedItemData;
        setItemMap((map) => {
          if (!element) {
            return map;
          }
          if (!map.has(element)) {
            map.set(element, { ...itemData2, element });
            return map.toSorted(sortByDocumentPosition);
          }
          return map.set(element, { ...itemData2, element }).toSorted(sortByDocumentPosition);
        });
        return () => {
          setItemMap((map) => {
            if (!element || !map.has(element)) {
              return map;
            }
            map.delete(element);
            return new OrderedDict(map);
          });
        };
      }, [element, memoizedItemData, setItemMap]);
      return /* @__PURE__ */ jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useInitCollection() {
    return useState(new OrderedDict());
  }
  __name12(useInitCollection, "useInitCollection");
  function useCollection2(scope) {
    const { itemMap } = useCollectionContext(name + "CollectionConsumer", scope);
    return itemMap;
  }
  __name12(useCollection2, "useCollection");
  const functions = {
    createCollectionScope: createCollectionScope2,
    useCollection: useCollection2,
    useInitCollection
  };
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    functions
  ];
}
__name12(createCollection2, "createCollection");
function shallowEqual(a, b2) {
  if (a === b2) return true;
  if (typeof a !== "object" || typeof b2 !== "object") return false;
  if (a == null || b2 == null) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b2);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b2, key)) return false;
    if (a[key] !== b2[key]) return false;
  }
  return true;
}
__name12(shallowEqual, "shallowEqual");
function isElementPreceding(a, b2) {
  return !!(b2.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_PRECEDING);
}
__name12(isElementPreceding, "isElementPreceding");
function sortByDocumentPosition(a, b2) {
  return !a[1].element || !b2[1].element ? 0 : isElementPreceding(a[1].element, b2[1].element) ? -1 : 1;
}
__name12(sortByDocumentPosition, "sortByDocumentPosition");
function getChildListObserver(callback) {
  const observer2 = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        callback();
        return;
      }
    }
  });
  return observer2;
}
__name12(getChildListObserver, "getChildListObserver");

// node_modules/@radix-ui/react-id/dist/index.mjs
var __defProp14 = Object.defineProperty;
var __name13 = (target, value) => __defProp14(target, "name", { value, configurable: true });
var useReactId = react_exports[" useId ".trim().toString()] || (() => void 0);
var count = 0;
function useId2(deterministicId) {
  const [id3, setId] = useState(useReactId());
  useLayoutEffect2(() => {
    if (!deterministicId) setId((reactId) => reactId ?? String(count++));
  }, [deterministicId]);
  return deterministicId || (id3 ? `radix-${id3}` : "");
}
__name13(useId2, "useId");

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var __defProp15 = Object.defineProperty;
var __name14 = (target, value) => __defProp15(target, "name", { value, configurable: true });
function useCallbackRef(callback) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  return useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
__name14(useCallbackRef, "useCallbackRef");

// node_modules/@radix-ui/react-direction/dist/index.mjs
var __defProp16 = Object.defineProperty;
var __name15 = (target, value) => __defProp16(target, "name", { value, configurable: true });
var DirectionContext = createContext(void 0);
function useDirection(localDir) {
  const globalDir = useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}
__name15(useDirection, "useDirection");

// node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
var __defProp17 = Object.defineProperty;
var __name16 = (target, value) => __defProp17(target, "name", { value, configurable: true });
var _isHydrated = false;
function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(_isHydrated);
  useEffect(() => {
    if (!_isHydrated) {
      _isHydrated = true;
      setIsHydrated(true);
    }
  }, []);
  return isHydrated;
}
__name16(useIsHydrated, "useIsHydrated");
var useReactSyncExternalStore = react_exports[" useSyncExternalStore ".trim().toString()];
function subscribe() {
  return () => {
  };
}
__name16(subscribe, "subscribe");
function useIsHydratedModern() {
  return useReactSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
__name16(useIsHydratedModern, "useIsHydratedModern");
var useIsHydrated2 = typeof useReactSyncExternalStore === "function" ? useIsHydratedModern : useIsHydrated;

// node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var __defProp18 = Object.defineProperty;
var __name17 = (target, value) => __defProp18(target, "name", { value, configurable: true });
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name17(function RovingFocusGroup2(props, forwardedRef) {
    return /* @__PURE__ */ jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }, "RovingFocusGroup")
);
var RovingFocusGroupImpl = /* @__PURE__ */ forwardRef(/* @__PURE__ */ __name17(function RovingFocusGroupImpl2(props, forwardedRef) {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = useRef(null);
  const composedRefs = useComposedRefs2(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
}, "RovingFocusGroupImpl"));
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name17(function RovingFocusGroupItem2(props, forwardedRef) {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId2();
    const id3 = tabStopId || autoId;
    const context2 = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context2.currentTabStopId === id3;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context2;
    const isHydrated = useIsHydrated2();
    useLayoutEffect2(() => {
      if (!isHydrated || !focusable) {
        return;
      }
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
    useEffect(() => {
      if (isHydrated || !focusable) {
        return;
      }
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }, [isHydrated, focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id: id3,
        focusable,
        active,
        children: /* @__PURE__ */ jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context2.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context2.onItemFocus(id3);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context2.onItemFocus(id3)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context2.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context2.orientation, context2.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context2.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
);
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
__name17(getDirectionAwareKey, "getDirectionAwareKey");
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
__name17(getFocusIntent, "getFocusIntent");
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
__name17(focusFirst, "focusFirst");
function wrapArray(array, startIndex) {
  return array.map((_2, index) => array[(startIndex + index) % array.length]);
}
__name17(wrapArray, "wrapArray");
var Root6 = RovingFocusGroup;
var Item2 = RovingFocusGroupItem;

// node_modules/@radix-ui/react-tabs/dist/index.mjs
var __defProp19 = Object.defineProperty;
var __name18 = (target, value) => __defProp19(target, "name", { value, configurable: true });
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name18(function Tabs2(props, forwardedRef) {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId2(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }, "Tabs")
);
var TAB_LIST_NAME = "TabsList";
var TabsList = /* @__PURE__ */ forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ __name18(function TabsList2(props, forwardedRef) {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context2 = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsx(
      Root6,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context2.orientation,
        dir: context2.dir,
        loop,
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context2.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }, "TabsList")
);
var TRIGGER_NAME2 = "TabsTrigger";
var TabsTrigger = /* @__PURE__ */ forwardRef(
  /* @__PURE__ */ __name18(function TabsTrigger2(props, forwardedRef) {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context2 = useTabsContext(TRIGGER_NAME2, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context2.baseId, value);
    const contentId = makeContentId(context2.baseId, value);
    const isSelected = value === context2.value;
    return /* @__PURE__ */ jsx(
      Item2,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context2.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (disabled || event.target !== event.currentTarget) {
                return;
              }
              if ([" ", "Enter"].includes(event.key)) {
                context2.onValueChange(value);
              }
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context2.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context2.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }, "TabsTrigger")
);
var CONTENT_NAME = "TabsContent";
var TabsContent = /* @__PURE__ */ forwardRef(
  /* @__PURE__ */ __name18(function TabsContent2(props, forwardedRef) {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context2 = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context2.baseId, value);
    const contentId = makeContentId(context2.baseId, value);
    const isSelected = value === context2.value;
    const isMountAnimationPreventedRef = useRef(isSelected);
    useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context2.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }, "TabsContent")
);
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
__name18(makeTriggerId, "makeTriggerId");
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
__name18(makeContentId, "makeContentId");
var Root22 = Tabs;
var List = TabsList;
var Trigger4 = TabsTrigger;
var Content5 = TabsContent;

// components/ui/tabs.tsx
var Tabs3 = Root22;
var TabsList3 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList3.displayName = List.displayName;
var TabsTrigger3 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Trigger4,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs",
      className
    ),
    ...props
  }
));
TabsTrigger3.displayName = Trigger4.displayName;
var TabsContent3 = forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Content5,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent3.displayName = Content5.displayName;

// components/ui/textarea.tsx
var Textarea = forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        `flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 ${CONTROL_HOVER_TRANSITION} placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
        COARSE_POINTER_TEXT_BASE_CLASS,
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

// bb-plugin-runtime-shim:@radix-ui/react-tooltip
var runtime11 = globalThis.__bbPluginRuntime;
if (runtime11 == null || runtime11.radixTooltip == null) {
  throw new Error('Cannot load "@radix-ui/react-tooltip": this bundle must be loaded by the BB app, which provides the shared plugin runtime (globalThis.__bbPluginRuntime).');
}
var mod11 = runtime11.radixTooltip;
var {
  Arrow: Arrow3,
  Content: Content6,
  Portal: Portal5,
  Provider,
  Root: Root7,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  Trigger: Trigger5,
  createTooltipScope
} = mod11;

// components/ui/tooltip.tsx
var TooltipProvider2 = Provider;
var Tooltip2 = Root7;
var TooltipTrigger2 = Trigger5;
var TooltipContent2 = forwardRef(function TooltipContentComponent({
  avoidCollisions = true,
  className,
  collisionPadding = 8,
  sideOffset = 4,
  ...props
}, ref) {
  return /* @__PURE__ */ jsx(Portal5, { children: /* @__PURE__ */ jsx(
    Content6,
    {
      ref,
      ...usePortalScopeProps(),
      avoidCollisions,
      collisionPadding,
      sideOffset,
      className: cn(
        "z-50 max-w-[min(20rem,var(--radix-tooltip-content-available-width))] overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground break-words animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      ),
      ...props
    }
  ) });
});
TooltipContent2.displayName = Content6.displayName;

// panel/PetsPanel.tsx
var openPluginSettings = () => {
  history.pushState({}, "", "/settings/plugins/pets");
  window.dispatchEvent(new PopStateEvent("popstate"));
};
function EngineRecipe({
  hasApiKey,
  hasRdKey,
  engine,
  pack
}) {
  const rows = [
    {
      key: "openai",
      title: "OpenAI key",
      set: hasApiKey,
      requirement: "required",
      why: "Draws your creature \u2014 the drafts, the hero, and every evolution look."
    },
    {
      key: "rd",
      title: "Retro Diffusion key",
      set: hasRdKey,
      requirement: "recommended",
      why: "Animates it natively \u2014 smooth 8-frame true pixel motion instead of 4-frame approximations."
    }
  ];
  const statesCount = pack === "essential" ? 9 : pack === "deluxe" ? 18 : 14;
  const packLabel = pack.charAt(0).toUpperCase() + pack.slice(1);
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Best-results checklist" }),
      /* @__PURE__ */ jsxs("span", { className: "text-right text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "block", children: [
          "Animations:",
          " ",
          engine === "retro-diffusion" ? "Retro Diffusion (native pixel art)" : "gpt-image + pixel-perfect quantization"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "block", children: [
          "Pack: ",
          packLabel,
          " (",
          statesCount,
          " animations)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2", children: rows.map((row, index) => /* @__PURE__ */ jsxs(
      motion2.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { type: "spring", stiffness: 400, damping: 30, delay: index * 0.06 },
        className: "flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: `flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${row.set ? "bg-primary text-primary-foreground" : "border border-dashed border-muted-foreground/50 text-muted-foreground"}`,
              "aria-hidden": "true",
              children: row.set ? "\u2713" : ""
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-sm", children: [
              row.title,
              " ",
              /* @__PURE__ */ jsx(Badge, { variant: row.set ? "secondary" : row.requirement === "required" ? "destructive" : "outline", className: "ml-1 align-middle", children: row.set ? "set" : row.requirement })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "truncate text-xs text-muted-foreground", title: row.why, children: row.why })
          ] }),
          !row.set ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: openPluginSettings, children: "Add key" }) : null
        ]
      },
      row.key
    )) }),
    !hasRdKey ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "You can hatch without Retro Diffusion \u2014 animations fall back to gpt-image with pixel-perfect quantization. Get a key at retrodiffusion.ai (~$2 per pet)." }) : null
  ] }) });
}
var MAX_JOBS = 3;
var PHASE_LABELS = {
  drafts: "Drafting candidates for",
  hatch: "Hatching",
  evolve: "Evolving",
  refresh: "Re-animating"
};
function formatElapsed(since) {
  const total = Math.max(0, Math.floor((Date.now() - since) / 1e3));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
function JobBanner({
  job,
  queued,
  lastError,
  onDismissError,
  skipped,
  onRetrySkipped,
  onDismissSkipped
}) {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!job) return;
    const timer = setInterval(() => setTick((n2) => n2 + 1), 1e3);
    return () => clearInterval(timer);
  }, [job?.jobId]);
  if (job) {
    const sinceProgress = Date.now() - job.progressAt;
    const slow = sinceProgress > 9e4;
    const chipStates = job.states.length > 0 ? job.states : [];
    const showChips = job.phase !== "drafts" && chipStates.length > 0;
    const currentState = showChips ? chipStates.filter((s2) => !job.statesDone.includes(s2))[0] : null;
    return /* @__PURE__ */ jsx(Card, { className: "border-primary/30", children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-2.5 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx(
          motion2.span,
          {
            className: "h-2 w-2 shrink-0 self-center rounded-full bg-primary",
            animate: { opacity: [1, 0.3, 1] },
            transition: { repeat: Infinity, duration: 1.4 }
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "min-w-0 flex-1 truncate text-sm font-medium", children: [
          PHASE_LABELS[job.phase] ?? job.phase,
          " ",
          job.subject
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs tabular-nums text-muted-foreground", children: [
          formatElapsed(job.startedAt),
          " \xB7 ",
          job.done,
          "/",
          job.total
        ] })
      ] }),
      /* @__PURE__ */ jsx(Progress3, { value: job.done / Math.max(1, job.total) * 100 }),
      showChips ? /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: chipStates.map((state) => {
        const done = job.statesDone.includes(state);
        const current = state === currentState;
        return /* @__PURE__ */ jsxs(
          motion2.span,
          {
            className: `rounded-full border px-2 py-0.5 text-[10px] ${done ? "border-primary/40 bg-primary/15 text-foreground" : current ? "border-primary text-foreground" : "border-border text-muted-foreground/60"}`,
            animate: current ? { opacity: [1, 0.45, 1] } : void 0,
            transition: { repeat: Infinity, duration: 1.2 },
            children: [
              done ? "\u2713 " : "",
              state
            ]
          },
          state
        );
      }) }) : null,
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: slow ? `No progress for ${Math.floor(sinceProgress / 1e3)}s \u2014 image APIs crawl sometimes; still connected and working.` : "Runs on the server \u2014 you can leave this page and come back." }),
      queued.map((entry) => /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "queued: ",
        entry.subject,
        " (",
        entry.phase,
        ")"
      ] }, entry.jobId))
    ] }) });
  }
  const retryButton = skipped && skipped.petId ? /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: onRetrySkipped, children: [
    "Retry skipped (",
    skipped.states.length,
    ")"
  ] }) : null;
  if (lastError) {
    return /* @__PURE__ */ jsxs(Alert, { className: "border-destructive/50", children: [
      /* @__PURE__ */ jsxs(AlertTitle, { children: [
        PHASE_LABELS[lastError.phase] ?? lastError.phase,
        " ",
        lastError.subject,
        " failed",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "font-normal text-muted-foreground", children: [
          "\xB7 ",
          timeAgo(lastError.at)
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDescription, { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1", children: lastError.message }),
        retryButton,
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: onDismissError, children: "Dismiss" })
      ] })
    ] });
  }
  if (skipped) {
    return /* @__PURE__ */ jsxs(Alert, { className: "border-amber-500/50", children: [
      /* @__PURE__ */ jsxs(AlertTitle, { children: [
        "Skipped ",
        skipped.states.length,
        " animation",
        skipped.states.length === 1 ? "" : "s",
        " for",
        " ",
        skipped.subject,
        " ",
        /* @__PURE__ */ jsxs("span", { className: "font-normal text-muted-foreground", children: [
          "\xB7 ",
          timeAgo(skipped.at)
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDescription, { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
          "Fallbacks cover ",
          skipped.states.join(", "),
          " \u2014 retry to draw them properly."
        ] }),
        retryButton,
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: onDismissSkipped, children: "Dismiss" })
      ] })
    ] });
  }
  return null;
}
var SOURCE_LABELS = {
  "turn-completed": "Turns completed",
  "thread-archived": "Threads shipped",
  "thread-failed": "Failures survived",
  petted: "Pets received",
  "daily-greeting": "Daily hellos"
};
var SUGGESTIONS = [
  "a grumpy space cat with tiny jetpack",
  "a sleepy mushroom knight",
  "a golden retriever wizard",
  "an anxious little ghost barista",
  "a tiny dragon who hoards commits"
];
var SURPRISE_POOL = [
  ...SUGGESTIONS,
  "a round penguin in a hand-knitted sweater",
  "a caffeinated squirrel wearing safety goggles",
  "a melancholy jellyfish with a bowler hat",
  "a tiny yeti hugging a thermos",
  "a capybara lifeguard with a whistle",
  "a moth in a wizard cloak drawn to deploy buttons",
  "a potato with determined eyes and small boots",
  "an octopus barista juggling four espresso cups"
];
var NAME_POOL = [
  "Byte",
  "Mochi",
  "Turbo",
  "Ziggy",
  "Pico",
  "Waffle",
  "Nimbus",
  "Sprocket",
  "Miso",
  "Comet",
  "Pretzel",
  "Gizmo",
  "Noodle",
  "Fizz",
  "Clover",
  "Pistachio"
];
function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1e3);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
function SpriteThumb({ pet, state = "idle", size = 64 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const spec = pet.atlas.states[state] ?? pet.atlas.states.idle;
    if (!spec) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.src = `${pet.spriteBaseUrl}&state=${state}`;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;
    let frame2 = 0;
    let last = performance.now();
    let clock = 0;
    const draw = (now2) => {
      raf = requestAnimationFrame(draw);
      const dt = Math.min(0.1, (now2 - last) / 1e3);
      last = now2;
      clock += dt * spec.fps;
      if (clock < 1) return;
      clock %= 1;
      frame2 = (frame2 + 1) % spec.frames;
      const ctx = canvas.getContext("2d");
      if (!ctx || !img.complete || img.naturalWidth === 0) return;
      const cellW = Math.floor(img.naturalWidth / spec.frames);
      const contentFraction = Math.min(
        1,
        Math.max(0.3, (spec.contentHeight ?? spec.height * 0.9) / spec.height)
      );
      let boxH = size / contentFraction;
      let boxW = boxH * (cellW / img.naturalHeight);
      if (boxW > 110) {
        boxH *= 110 / boxW;
        boxW = 110;
      }
      const pxW = Math.round(boxW * dpr);
      const pxH = Math.round(boxH * dpr);
      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW;
        canvas.height = pxH;
        canvas.style.width = `${boxW}px`;
        canvas.style.height = `${boxH}px`;
      }
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, frame2 * cellW, 0, cellW, img.naturalHeight, 0, 0, canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [pet.spriteBaseUrl, pet.atlas, state, size]);
  return /* @__PURE__ */ jsx("canvas", { ref: canvasRef, style: { imageRendering: "pixelated" }, "aria-hidden": "true" });
}
function LineageStrip({ petId }) {
  const rpc2 = useRpc();
  const [stages, setStages] = useState(null);
  useEffect(() => {
    let cancelled = false;
    rpc2.call("getLineage", { petId }).then((r4) => {
      if (!cancelled) setStages(r4.stages);
    }).catch(() => {
    });
    return () => {
      cancelled = true;
    };
  }, [rpc2, petId]);
  if (!stages || stages.length <= 1) return null;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5", children: stages.map((entry) => {
    const label = `${entry.name} \xB7 ${entry.epithet}`;
    const ring = entry.current ? " ring-1 ring-primary" : "";
    return entry.heroUrl ? /* @__PURE__ */ jsx(
      "img",
      {
        src: entry.heroUrl,
        alt: label,
        title: label,
        width: 28,
        height: 28,
        className: `h-7 w-7 shrink-0 rounded border border-border object-contain${ring}`,
        style: { imageRendering: "pixelated" }
      },
      entry.stage
    ) : /* @__PURE__ */ jsx(
      "span",
      {
        title: label,
        "aria-label": label,
        className: `flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-muted text-[10px] tabular-nums text-muted-foreground${ring}`,
        children: entry.stage
      },
      entry.stage
    );
  }) });
}
function FixAnimationsPicker({ pet, queueFull }) {
  const rpc2 = useRpc();
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(/* @__PURE__ */ new Set());
  const states = Object.keys(pet.atlas.states).sort();
  const count2 = selection.size;
  const toggle = (state, checked) => {
    setSelection((prev) => {
      const next = new Set(prev);
      if (checked) next.add(state);
      else next.delete(state);
      return next;
    });
  };
  return /* @__PURE__ */ jsxs(
    Popover2,
    {
      open,
      onOpenChange: (next) => {
        setOpen(next);
        if (next) setSelection(/* @__PURE__ */ new Set());
      },
      children: [
        /* @__PURE__ */ jsxs(Tooltip2, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger2, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "inline-flex", children: /* @__PURE__ */ jsx(PopoverTrigger2, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: `text-muted-foreground${queueFull ? " pointer-events-none" : ""}`,
              disabled: queueFull,
              children: "Fix animations\u2026"
            }
          ) }) }) }),
          /* @__PURE__ */ jsx(TooltipContent2, { children: queueFull ? "Queue full \u2014 wait for a running job to finish" : "Regenerate only the animations you pick" })
        ] }),
        /* @__PURE__ */ jsxs(PopoverContent2, { className: "w-64 space-y-2", mobileTitle: "Regenerate specific animations", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Regenerate specific animations" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1.5", children: states.map((state) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(
              Checkbox3,
              {
                id: `${pet.id}-${state}`,
                checked: selection.has(state),
                onCheckedChange: (checked) => toggle(state, checked === true)
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: `${pet.id}-${state}`, className: "text-xs", children: state })
          ] }, state)) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-6 px-2 text-muted-foreground",
                onClick: () => setSelection(new Set(["walk", "run"].filter((state) => states.includes(state)))),
                children: "Walk cycle"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-6 px-2 text-muted-foreground",
                onClick: () => setSelection(new Set(states)),
                children: "All"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Only the selected animations are regenerated and merged \u2014 the rest keep their art. ~$0.25 per state." }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "sm",
              className: "w-full",
              disabled: count2 === 0,
              onClick: () => void rpc2.call("regenerateStates", { petId: pet.id, states: [...selection] }).then(() => {
                toast.success(
                  `Regenerating ${count2} animation${count2 === 1 ? "" : "s"} for ${pet.name}\u2026`
                );
                setOpen(false);
                setSelection(/* @__PURE__ */ new Set());
              }).catch((error) => toast.error(error.message)),
              children: [
                "Regenerate ",
                count2
              ]
            }
          )
        ] })
      ]
    }
  );
}
function DenTab({ hasApiKey, queueFull }) {
  const rpc2 = useRpc();
  const navigate = useBbNavigate();
  const [pets, setPets] = useState(null);
  const [renaming, setRenaming] = useState(null);
  const [hovered, setHovered] = useState(null);
  const load = useCallback(() => {
    rpc2.call("listDen").then((r4) => setPets(r4.pets)).catch(() => {
    });
  }, [rpc2]);
  useEffect(load, [load]);
  useRealtime("pets", (payload) => {
    const kind = payload?.kind;
    if (kind === "pet-changed" || kind === "xp" || kind === "evolved-art" || kind === "hatched") load();
  });
  if (pets === null) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full" })
    ] });
  }
  if (pets.length === 0) {
    return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center gap-3 p-8 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "The den is empty. Something is waiting in the Hatchery." }),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          onClick: () => navigate.toPluginPanel("pets", { subPath: "hatchery" }),
          children: "Open Hatchery"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    pets.map((pet, index) => {
      const progress2 = pet.nextStage ? Math.min(
        1,
        Math.max(0, pet.xp - pet.stage.minXp) / Math.max(1, pet.nextStage.minXp - pet.stage.minXp)
      ) : 1;
      return /* @__PURE__ */ jsx(
        motion2.div,
        {
          layout: true,
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          whileHover: { y: -2 },
          transition: { type: "spring", stiffness: 400, damping: 28, delay: index * 0.04 },
          onHoverStart: () => setHovered(pet.id),
          onHoverEnd: () => setHovered(null),
          children: /* @__PURE__ */ jsx(Card, { className: pet.active ? "border-primary/50" : void 0, children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex w-20 shrink-0 items-end justify-center", children: /* @__PURE__ */ jsx(
              SpriteThumb,
              {
                pet,
                size: 72,
                state: hovered === pet.id && pet.atlas.states.wave ? "wave" : "idle"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                renaming?.id === pet.id ? /* @__PURE__ */ jsxs(
                  "form",
                  {
                    className: "flex items-center gap-2",
                    onSubmit: (event) => {
                      event.preventDefault();
                      const name = renaming.name.trim();
                      if (name) void rpc2.call("renamePet", { petId: pet.id, name }).then(load);
                      setRenaming(null);
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        Input,
                        {
                          autoFocus: true,
                          value: renaming.name,
                          className: "h-7 max-w-44 text-sm",
                          onChange: (event) => setRenaming({ id: pet.id, name: event.target.value }),
                          onKeyDown: (event) => {
                            if (event.key === "Escape") {
                              event.preventDefault();
                              setRenaming(null);
                            }
                          },
                          onBlur: () => setRenaming(null)
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Button,
                        {
                          type: "submit",
                          size: "sm",
                          variant: "outline",
                          onMouseDown: (event) => event.preventDefault(),
                          children: "Save"
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-sm font-semibold hover:underline",
                    title: "Rename",
                    onClick: () => setRenaming({ id: pet.id, name: pet.name }),
                    children: pet.name
                  }
                ),
                /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: pet.stage.name }),
                pet.active ? /* @__PURE__ */ jsx(Badge, { children: "Active" }) : null,
                pet.artBehind ? /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-amber-500", children: "glow up available" }) : null,
                pet.missingAnimations > 0 ? /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-amber-500", children: [
                  "+",
                  pet.missingAnimations,
                  " available"
                ] }) : null
              ] }),
              /* @__PURE__ */ jsx("p", { className: "truncate text-xs italic text-muted-foreground", children: pet.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-xs tabular-nums text-muted-foreground", children: [
                  /* @__PURE__ */ jsx(NumberFlow, { value: pet.xp }),
                  " XP"
                ] }),
                /* @__PURE__ */ jsx(Progress3, { value: progress2 * 100, className: "h-1.5 max-w-48" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: pet.nextStage ? `${pet.nextStage.minXp - pet.xp} to ${pet.nextStage.name}` : "max" }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "petted ",
                  pet.pettedCount,
                  "\xD7"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  Object.keys(pet.atlas.states).length,
                  " animations"
                ] })
              ] }),
              /* @__PURE__ */ jsx(LineageStrip, { petId: pet.id })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-col gap-2", children: [
              !pet.active ? /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => void rpc2.call("selectPet", { petId: pet.id }).then(load), children: "Choose" }) : null,
              hasApiKey ? /* @__PURE__ */ jsxs(Tooltip2, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger2, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "inline-flex", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: `text-muted-foreground${queueFull ? " pointer-events-none" : ""}`,
                    disabled: queueFull,
                    onClick: () => void rpc2.call("refreshArt", { petId: pet.id }).then(() => toast.success(`Re-animating ${pet.name}\u2026`)).catch((error) => toast.error(error.message)),
                    children: "Re-animate"
                  }
                ) }) }),
                /* @__PURE__ */ jsx(TooltipContent2, { children: queueFull ? "Queue full \u2014 wait for a running job to finish" : "Regenerate every animation through the latest engine at the current pack \u2014 upgrades older pets to new animation sets (~a few minutes, ~$1\u20133 depending on pack)" })
              ] }) : null,
              hasApiKey ? /* @__PURE__ */ jsx(FixAnimationsPicker, { pet, queueFull }) : null,
              !pet.active ? /* @__PURE__ */ jsxs(AlertDialog2, { children: [
                /* @__PURE__ */ jsx(AlertDialogTrigger2, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", className: "text-muted-foreground hover:text-destructive", children: "Release\u2026" }) }),
                /* @__PURE__ */ jsxs(AlertDialogContent2, { children: [
                  /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxs(AlertDialogTitle2, { children: [
                      "Release ",
                      pet.name,
                      "?"
                    ] }),
                    /* @__PURE__ */ jsxs(AlertDialogDescription2, { children: [
                      pet.name,
                      " leaves the den for good \u2014 ",
                      pet.xp,
                      " XP, all artwork, and",
                      " ",
                      pet.pettedCount,
                      " ",
                      pet.pettedCount === 1 ? "petting" : "pettings",
                      ", gone. This cannot be undone."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxs(AlertDialogCancel2, { children: [
                      "Keep ",
                      pet.name
                    ] }),
                    /* @__PURE__ */ jsx(
                      AlertDialogAction2,
                      {
                        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                        onClick: () => void rpc2.call("deletePet", { petId: pet.id }).then(() => {
                          toast.success(`${pet.name} wandered off into the tall grass.`);
                          load();
                        }).catch((error) => toast.error(error.message)),
                        children: "Release"
                      }
                    )
                  ] })
                ] })
              ] }) : null,
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-muted-foreground",
                    "aria-label": `Shrink ${pet.name}`,
                    disabled: pet.sizeScale <= 0.5,
                    onClick: () => void rpc2.call("setPetSize", {
                      petId: pet.id,
                      scale: Math.round(Math.max(0.5, pet.sizeScale - 0.1) * 10) / 10
                    }).then(load),
                    children: "\u2212"
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "text-xs tabular-nums text-muted-foreground", children: [
                  Math.round(pet.sizeScale * 100),
                  "%"
                ] }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "ghost",
                    className: "text-muted-foreground",
                    "aria-label": `Enlarge ${pet.name}`,
                    disabled: pet.sizeScale >= 2.5,
                    onClick: () => void rpc2.call("setPetSize", {
                      petId: pet.id,
                      scale: Math.round(Math.min(2.5, pet.sizeScale + 0.1) * 10) / 10
                    }).then(load),
                    children: "+"
                  }
                )
              ] }),
              pet.artBehind && hasApiKey ? /* @__PURE__ */ jsxs(Tooltip2, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger2, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "inline-flex", children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    className: queueFull ? "pointer-events-none" : void 0,
                    disabled: queueFull,
                    onClick: () => void rpc2.call("evolveArt", { petId: pet.id }).then(
                      () => toast.success(`Redrawing ${pet.name} as ${pet.stage.name}\u2026`)
                    ).catch((error) => toast.error(error.message)),
                    children: "\u2728 Glow up"
                  }
                ) }) }),
                /* @__PURE__ */ jsx(TooltipContent2, { children: queueFull ? "Queue full \u2014 wait for a running job to finish" : `Regenerate the artwork to match its ${pet.stage.name} stage (~$1\u20133 depending on pack, a few minutes)` })
              ] }) : null
            ] })
          ] }) })
        },
        pet.id
      );
    }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "XP comes from finished turns, shipped threads, and the occasional petting. Click your pet to pet it; drag it anywhere; \u2325scroll to resize; double-click to jump to the neediest thread." })
  ] });
}
function StartingRow() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
    /* @__PURE__ */ jsx(
      motion2.span,
      {
        className: "h-1.5 w-1.5 shrink-0 rounded-full bg-primary",
        animate: { opacity: [1, 0.3, 1] },
        transition: { repeat: Infinity, duration: 1.4 }
      }
    ),
    "Starting job\u2026"
  ] });
}
function HatcheryTab({
  hasApiKey,
  hasRdKey,
  engine,
  pack,
  jobActive,
  queueFull
}) {
  const rpc2 = useRpc();
  const navigate = useBbNavigate();
  const [description, setDescription] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [picked, setPicked] = useState(null);
  const [name, setName] = useState("");
  const [phase, setPhase] = useState("idle");
  const [starting, setStarting] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [refining, setRefining] = useState(false);
  const [draftVersion, setDraftVersion] = useState({});
  const draftSrc = useCallback(
    (draft) => {
      const v2 = draftVersion[draft.id];
      return v2 ? `${draft.url}&v=${v2}` : draft.url;
    },
    [draftVersion]
  );
  useEffect(() => {
    if (jobActive) setStarting(false);
  }, [jobActive]);
  useEffect(() => {
    rpc2.call("listDrafts").then((r4) => {
      setDrafts(r4.drafts);
      if (r4.drafts.length > 0) setPhase("picking");
    }).catch(() => {
    });
  }, [rpc2]);
  useRealtime("pets", (payload) => {
    const signal = payload;
    switch (signal.kind) {
      case "draft-changed":
        if (signal.draftId) {
          const id3 = signal.draftId;
          setDraftVersion((prev) => ({ ...prev, [id3]: Date.now() }));
        }
        break;
      case "drafts-ready":
        setDrafts((prev) => [...signal.drafts ?? [], ...prev].slice(0, 12));
        setPhase("picking");
        setStarting(false);
        break;
      case "hatched":
        setPhase("idle");
        setStarting(false);
        setPicked(null);
        setDrafts([]);
        toast.success("Hatched! Your new companion is live.");
        navigate.toPluginPanel("pets", { subPath: "" });
        break;
      case "gen-error":
        setPhase(drafts.length > 0 ? "picking" : "idle");
        setStarting(false);
        toast.error(signal.message ?? "Generation failed.");
        break;
      default:
        break;
    }
  });
  const busy = queueFull || phase === "drafting" || phase === "hatching";
  const refine = () => {
    const draftId = picked?.id;
    const text = instruction.trim();
    if (!draftId || text.length === 0 || refining) return;
    setRefining(true);
    void rpc2.call("refineDraft", { draftId, instruction: text }).then((r4) => {
      setInstruction("");
      setDraftVersion((prev) => ({ ...prev, [r4.draftId]: Date.now() }));
    }).catch((error) => toast.error(error.message)).finally(() => setRefining(false));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(EngineRecipe, { hasApiKey, hasRdKey, engine, pack }),
    !hasApiKey ? /* @__PURE__ */ jsxs(Alert, { children: [
      /* @__PURE__ */ jsx(AlertTitle, { children: "Hatching is paused until the OpenAI key is set" }),
      /* @__PURE__ */ jsx(AlertDescription, { children: "Everything else about your pet works without it \u2014 hatching new creatures is the one thing that needs it (~$2 and ~3 minutes per pet)." })
    ] }) : null,
    hasApiKey && phase === "idle" && drafts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 py-6", children: [
      /* @__PURE__ */ jsxs(
        motion2.svg,
        {
          width: "72",
          height: "88",
          viewBox: "0 0 72 88",
          animate: { rotate: [0, -4, 0, 4, 0] },
          transition: { repeat: Infinity, duration: 3.2, ease: "easeInOut", repeatDelay: 1.4 },
          style: { originX: "50%", originY: "85%" },
          children: [
            /* @__PURE__ */ jsx("ellipse", { cx: "36", cy: "48", rx: "28", ry: "38", className: "fill-muted stroke-border", strokeWidth: "2" }),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M14 42 L22 50 L30 40 L38 52 L46 41 L54 50 L58 44",
                className: "stroke-muted-foreground/40",
                strokeWidth: "2",
                fill: "none",
                strokeLinecap: "round"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Something is in there. Describe it." })
    ] }) : null,
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Describe a creature" }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          value: description,
          disabled: busy || !hasApiKey,
          placeholder: "a grumpy axolotl astronaut with a tiny fishbowl helmet\u2026",
          onChange: (event) => setDescription(event.target.value),
          rows: 2
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: SUGGESTIONS.map((suggestion) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          disabled: busy || !hasApiKey,
          className: "rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          onClick: () => setDescription(suggestion),
          children: suggestion
        },
        suggestion
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            disabled: queueFull || !hasApiKey || description.trim().length < 3,
            onClick: () => {
              setPhase("drafting");
              setStarting(true);
              void rpc2.call("hatchDrafts", { description: description.trim() }).catch((error) => {
                setPhase("idle");
                setStarting(false);
                toast.error(error.message);
              });
            },
            children: "Generate drafts"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            disabled: busy || !hasApiKey,
            onClick: () => setDescription(SURPRISE_POOL[Math.floor(Math.random() * SURPRISE_POOL.length)]),
            children: "\u{1F3B2} Surprise me"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "4 candidates, ~30s \xB7 ~$0.25 per batch" })
      ] }),
      starting && !jobActive ? /* @__PURE__ */ jsx(StartingRow, {}) : null
    ] }) }),
    drafts.length > 0 && phase !== "hatching" ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
          "Pick a candidate ",
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "\xB7 ",
            drafts.length
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "text-muted-foreground",
            disabled: busy,
            onClick: () => {
              setPicked(null);
              void rpc2.call("clearDrafts").then(() => {
                setDrafts([]);
                setPhase("idle");
              }).catch(() => {
              });
            },
            children: "Clear all"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: drafts.map((draft, index) => /* @__PURE__ */ jsxs(
        motion2.button,
        {
          type: "button",
          initial: { opacity: 0, y: 10, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1 },
          whileHover: { scale: 1.04, y: -2 },
          whileTap: { scale: 0.97 },
          transition: { type: "spring", stiffness: 420, damping: 26, delay: index * 0.05 },
          "aria-pressed": picked?.id === draft.id,
          className: `relative rounded-lg border p-2 ${picked?.id === draft.id ? "border-primary ring-1 ring-primary" : "border-border"}`,
          onClick: () => setPicked(draft),
          children: [
            picked?.id === draft.id ? /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "absolute right-1 top-1 z-10", children: "\u2713 Picked" }) : null,
            /* @__PURE__ */ jsx(
              "img",
              {
                src: draftSrc(draft),
                alt: draft.description,
                className: "aspect-square w-full rounded",
                style: { imageRendering: "pixelated" }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block truncate text-[10px] text-muted-foreground", children: draft.description })
          ]
        },
        draft.id
      )) }),
      picked ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            value: instruction,
            disabled: refining || busy,
            placeholder: "refine it: 'rounder', 'make it teal', 'bigger eyes'\u2026",
            className: "h-8 flex-1",
            onChange: (event) => setInstruction(event.target.value),
            onKeyDown: (event) => {
              if (event.key === "Enter" && instruction.trim() && !refining) {
                event.target.blur();
                refine();
              }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            disabled: refining || busy || instruction.trim().length === 0,
            onClick: refine,
            children: refining ? "Refining\u2026" : "Refine"
          }
        )
      ] }) : null,
      picked ? /* @__PURE__ */ jsx(
        motion2.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring", stiffness: 420, damping: 28 },
          children: /* @__PURE__ */ jsx(Card, { className: "border-primary/40", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: draftSrc(picked),
                alt: picked.description,
                className: "h-16 w-16 rounded-lg border border-border",
                style: { imageRendering: "pixelated" }
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-1.5", children: [
              /* @__PURE__ */ jsx("p", { className: "truncate text-xs italic text-muted-foreground", children: picked.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: name,
                    placeholder: "Name it\u2026",
                    className: "h-8 max-w-44",
                    onChange: (event) => setName(event.target.value),
                    onKeyDown: (event) => {
                      if (event.key === "Enter" && name.trim()) {
                        event.target.blur();
                      }
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(Tooltip2, { children: [
                  /* @__PURE__ */ jsx(TooltipTrigger2, { asChild: true, children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "text-muted-foreground",
                      onClick: () => setName(NAME_POOL[Math.floor(Math.random() * NAME_POOL.length)]),
                      children: "\u{1F3B2}"
                    }
                  ) }),
                  /* @__PURE__ */ jsx(TooltipContent2, { children: "Random name" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-col items-end gap-1.5", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  disabled: name.trim().length === 0,
                  onClick: () => {
                    setPhase("hatching");
                    setStarting(true);
                    void rpc2.call("hatchCommit", {
                      draftId: picked.id,
                      name: name.trim(),
                      description: picked.description
                    }).catch((error) => {
                      setPhase("picking");
                      setStarting(false);
                      toast.error(error.message);
                    });
                  },
                  children: [
                    "Hatch ",
                    name.trim() || "it",
                    " \u{1F95A}"
                  ]
                }
              ),
              starting && !jobActive ? /* @__PURE__ */ jsx(StartingRow, {}) : null
            ] })
          ] }) })
        }
      ) : /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Click a candidate to pick it \u2014 hatching animates your whole pack (~3 min, ~$2)." })
    ] }) : null
  ] });
}
var DEV_FEED_MAX = 40;
var clockTime = (t2) => new Date(t2).toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
var devLine = (entry) => `${clockTime(entry.t)} [${entry.kind}] ${entry.detail}`;
function DevCard() {
  const [entries, setEntries] = useState([]);
  const [state, setState] = useState(null);
  useEffect(() => {
    const onEntry = (event) => {
      const entry = event.detail?.entry;
      if (!entry) return;
      setEntries((prev) => [entry, ...prev].slice(0, DEV_FEED_MAX));
    };
    const onState = (event) => {
      const detail = event.detail;
      if (detail) setState(detail);
    };
    window.addEventListener("pets:debug", onEntry);
    window.addEventListener("pets:debug-state", onState);
    return () => {
      window.removeEventListener("pets:debug", onEntry);
      window.removeEventListener("pets:debug-state", onState);
    };
  }, []);
  const copyLog = () => {
    void navigator.clipboard.writeText(entries.map(devLine).join("\n")).then(() => toast.success("Copied")).catch((e) => toast.error(e.message));
  };
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Developer" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", className: "text-xs", onClick: copyLog, children: "Copy log" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "ghost",
            className: "text-xs",
            onClick: () => {
              window.dispatchEvent(new CustomEvent("pets:preview-ceremony"));
              toast.success("Ceremony playing on the overlay.");
            },
            children: "Preview ceremony"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-mono text-xs", children: state ? `${state.state} \xB7 elev ${Math.round(state.elev)}px \xB7 x ${Math.round(state.x)} \xB7 act ${state.act ?? "\u2014"} \xB7 ${Math.round(state.fps)} fps` : "waiting for overlay\u2026" }),
    /* @__PURE__ */ jsxs("div", { className: "max-h-48 space-y-0.5 overflow-y-auto", children: [
      entries.map((entry, index) => /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px] text-muted-foreground", children: devLine(entry) }, `${entry.t}-${index}`)),
      entries.length === 0 ? /* @__PURE__ */ jsx("p", { className: "font-mono text-[11px] text-muted-foreground", children: "No events yet." }) : null
    ] })
  ] }) });
}
var DIARY_DAY = new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric" });
var DIARY_TIME = new Intl.DateTimeFormat(void 0, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});
function groupByDay(entries) {
  const days = [];
  for (const entry of entries) {
    const day = DIARY_DAY.format(entry.ts);
    const last = days[days.length - 1];
    if (last && last.day === day) last.entries.push(entry);
    else days.push({ day, entries: [entry] });
  }
  return days;
}
function DiaryCard({ entries }) {
  const days = entries ? groupByDay(entries) : [];
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Diary" }),
    entries === null ? /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-full" }) : days.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Nothing written yet. Give it a day." }) : days.map((day) => /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: day.day }),
      day.entries.map((entry) => /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "shrink-0 text-[10px] tabular-nums text-muted-foreground", children: DIARY_TIME.format(entry.ts) }),
        /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 text-xs", children: entry.text })
      ] }, entry.id))
    ] }, day.day))
  ] }) });
}
function StatsTab() {
  const rpc2 = useRpc();
  const [stats, setStats] = useState(null);
  const [diary, setDiary] = useState(null);
  const [treats, setTreats] = useState(null);
  const load = useCallback(() => {
    rpc2.call("getStats").then(setStats).catch(() => {
    });
  }, [rpc2]);
  const loadDiary = useCallback(() => {
    rpc2.call("getDiary", { limit: 60 }).then((r4) => setDiary(r4.entries)).catch(() => {
    });
  }, [rpc2]);
  const loadTreats = useCallback(() => {
    rpc2.call("getTreats").then(setTreats).catch(() => {
    });
  }, [rpc2]);
  useEffect(load, [load]);
  useEffect(loadDiary, [loadDiary]);
  useEffect(loadTreats, [loadTreats]);
  useRealtime("pets", (payload) => {
    const kind = payload?.kind;
    if (kind === "xp") {
      load();
      loadTreats();
    }
    if (kind === "pet-changed") loadDiary();
  });
  if (!stats) {
    return /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-2 p-4", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
        "Lifetime: ",
        /* @__PURE__ */ jsx(NumberFlow, { value: stats.totalXp }),
        " XP"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-1", children: Object.entries(stats.totals).map(([source, entry]) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: SOURCE_LABELS[source] ?? source }),
        /* @__PURE__ */ jsxs("span", { className: "tabular-nums", children: [
          entry.count,
          "\xD7 \xB7 ",
          entry.xp,
          " XP"
        ] })
      ] }, source)) }),
      treats ? /* @__PURE__ */ jsxs("p", { className: "border-t pt-2 text-xs text-muted-foreground", children: [
        "\u{1F36A} ",
        treats.eaten,
        " treats eaten \xB7 ",
        treats.balance,
        " in the jar"
      ] }) : /* @__PURE__ */ jsx(Skeleton, { className: "mt-2 h-4 w-48" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("p", { className: "mb-2 text-sm font-medium", children: [
        "Achievements",
        " ",
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          "\xB7 ",
          stats.achievements.filter((a) => a.earned).length,
          "/",
          stats.achievements.length
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: stats.achievements.map((achievement, index) => /* @__PURE__ */ jsx(
        motion2.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          whileHover: achievement.earned ? { y: -2 } : void 0,
          transition: { type: "spring", stiffness: 400, damping: 26, delay: index * 0.04 },
          children: /* @__PURE__ */ jsx(Card, { className: achievement.earned ? "border-amber-500/25" : "opacity-45", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-3", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium", children: [
              achievement.earned ? /* @__PURE__ */ jsx(
                motion2.span,
                {
                  className: "inline-block text-amber-400",
                  initial: { scale: 0.4, rotate: -30 },
                  animate: { scale: 1, rotate: 0 },
                  transition: { type: "spring", stiffness: 380, damping: 14, delay: 0.2 + index * 0.05 },
                  children: "\u2605"
                }
              ) : "\u2606",
              " ",
              achievement.title
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: achievement.description })
          ] }) })
        },
        achievement.id
      )) })
    ] }),
    /* @__PURE__ */ jsx(DiaryCard, { entries: diary }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-medium", children: "Recent" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        stats.recent.map((event, index) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "+",
            event.amount,
            " \xB7 ",
            SOURCE_LABELS[event.source] ?? event.source
          ] }),
          /* @__PURE__ */ jsx("span", { children: timeAgo(event.createdAt) })
        ] }, `${event.createdAt}-${index}`)),
        stats.recent.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Nothing yet. Go finish a turn." }) : null
      ] })
    ] })
  ] });
}
var BEHAVIOR_TOGGLES = [
  { key: "roaming", label: "Roaming", hint: "Wander when idle" },
  { key: "pointing", label: "Pointing missions", hint: "Walk to threads that need you" },
  { key: "attentionPip", label: "Waiting pip", hint: "Count badge when threads wait" },
  { key: "reactTurnComplete", label: "Celebrations", hint: "Cheer finished turns" },
  { key: "reactFailures", label: "Failure reactions", hint: "Startle, sulk, get grumpy" },
  { key: "digWhileGenerating", label: "Dig during generation", hint: "Work while artwork renders" },
  { key: "idleQuirks", label: "Idle quirks", hint: "Waves and look-arounds" },
  { key: "typingGlance", label: "Typing glance", hint: "Look up when you type" },
  { key: "evolutionCeremony", label: "Evolution ceremony", hint: "Dance and fanfare on stage-up" },
  { key: "xpMotes", label: "XP motes", hint: "Floating +XP numbers" },
  { key: "showEmotions", label: "Emotion indicator", hint: "Name the feeling above the pet" },
  { key: "sounds", label: "Sounds", hint: "Synth chirps and boings" },
  { key: "seasonalFlair", label: "Seasonal flair", hint: "A tiny festive accessory in festive months" },
  { key: "highContrast", label: "High-contrast accents", hint: "Thicker ring, stronger badge" },
  { key: "devMode", label: "Developer panel", hint: "Live state feed on Stats" }
];
function BehaviorsCard({
  settings,
  onToggle
}) {
  if (!settings) return null;
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Behaviors" }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-x-6 gap-y-2 sm:grid-cols-2", children: BEHAVIOR_TOGGLES.map((toggle) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: toggle.label }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: toggle.hint })
      ] }),
      /* @__PURE__ */ jsx(
        Switch,
        {
          checked: Boolean(settings[toggle.key] ?? true),
          onCheckedChange: (value) => onToggle(toggle.key, value),
          "aria-label": toggle.label
        }
      )
    ] }, toggle.key)) })
  ] }) });
}
var PERSONALITY_TOGGLES = [
  { key: "personalityFunny", label: "Funny", hint: "One-liners and dance breaks" },
  { key: "personalityChaotic", label: "Chaotic", hint: "Zoomies, cursor chasing, peek-a-boo" },
  {
    key: "personalitySarcastic",
    label: "Sarcastic",
    hint: "Dry takes on failures and marathon turns"
  },
  { key: "personalityHelpful", label: "Helpful", hint: "Waiting-thread nudges and bb tips" },
  { key: "personalityCozy", label: "Cozy", hint: "Wandering, sitting nearby, idle naps" }
];
var ACTIVITY_LEVELS = ["calm", "normal", "lively", "unhinged"];
var SOUND_VOLUMES = ["quiet", "normal"];
function PersonalityCard({
  settings,
  onToggle
}) {
  const rpc2 = useRpc();
  const [pendingLevel, setPendingLevel] = useState(null);
  const [pendingVolume, setPendingVolume] = useState(null);
  if (!settings) return null;
  const level = pendingLevel ?? settings.activityLevel ?? "lively";
  const setLevel = (next) => {
    setPendingLevel(next);
    void rpc2.call("setActivityLevel", { level: next }).catch((e) => toast.error(e.message));
  };
  const volume = pendingVolume ?? settings.soundVolume ?? "normal";
  const setVolume = (next) => {
    setPendingVolume(next);
    void rpc2.call("setSoundVolume", { level: next }).catch((e) => toast.error(e.message));
  };
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3 p-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Personality" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "How your pet behaves when left alone." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-x-6 gap-y-2 sm:grid-cols-2", children: PERSONALITY_TOGGLES.map((toggle) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: toggle.label }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: toggle.hint })
      ] }),
      /* @__PURE__ */ jsx(
        Switch,
        {
          checked: Boolean(settings[toggle.key] ?? true),
          onCheckedChange: (value) => onToggle(toggle.key, value),
          "aria-label": toggle.label
        }
      )
    ] }, toggle.key)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Activity level" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "How often it acts on its own" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 rounded-md border border-border p-0.5", children: ACTIVITY_LEVELS.map((option) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: option === level ? "secondary" : "ghost",
          className: "text-xs capitalize",
          onClick: () => setLevel(option),
          children: option
        },
        option
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Sound volume" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "How loud its chirps and steps are" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 rounded-md border border-border p-0.5", children: SOUND_VOLUMES.map((option) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: option === volume ? "secondary" : "ghost",
          className: "text-xs capitalize",
          onClick: () => setVolume(option),
          children: option
        },
        option
      )) })
    ] })
  ] }) });
}
function TourButton() {
  return /* @__PURE__ */ jsxs(Tooltip2, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger2, { asChild: true, children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "sm",
        variant: "ghost",
        className: "text-muted-foreground",
        onClick: () => {
          window.dispatchEvent(new CustomEvent("pets:start-tour"));
          toast.success("Tour started \u2014 look at your pet.");
        },
        children: "Take the tour"
      }
    ) }),
    /* @__PURE__ */ jsx(TooltipContent2, { children: "A 60-second walkthrough of everything" })
  ] });
}
function PetsPanel({ subPath }) {
  const rpc2 = useRpc();
  const navigate = useBbNavigate();
  const [hasApiKey, setHasApiKey] = useState(false);
  const [hasRdKey, setHasRdKey] = useState(false);
  const [engine, setEngine] = useState("openai");
  const [pack, setPack] = useState("expanded");
  const [settings, setSettings] = useState(null);
  const [job, setJob] = useState(null);
  const [lastError, setLastError] = useState(null);
  const [errorDismissedAt, setErrorDismissedAt] = useState(0);
  const [skipped, setSkipped] = useState(null);
  const [queued, setQueued] = useState([]);
  const tab = subPath.split("/")[0] || "habitat";
  useEffect(() => {
    rpc2.call("getOverlay").then((r4) => {
      setHasApiKey(r4.hasApiKey);
      setHasRdKey(r4.hasRdKey);
      setEngine(r4.engine);
      setPack(r4.pack);
      setSettings(r4.settings);
    }).catch(() => {
    });
    rpc2.call("getJobStatus").then((r4) => {
      setJob(r4.job);
      setLastError(r4.lastError);
      setQueued(r4.queued);
    }).catch(() => {
    });
  }, [rpc2]);
  useRealtime("pets", (payload) => {
    const signal = payload;
    if (signal?.kind === "job") {
      setJob(signal.job ?? null);
      setQueued(signal.queued ?? []);
    } else if (signal?.kind === "gen-error")
      setLastError({
        phase: signal.phase ?? "",
        subject: signal.subject ?? "",
        message: signal.message ?? "Generation failed.",
        at: Date.now()
      });
    else if (signal?.kind === "gen-warning" && Array.isArray(signal.skipped)) {
      const states = signal.skipped.map((s2) => s2.state);
      setSkipped({
        petId: signal.petId ?? null,
        states,
        subject: signal.subject ?? "your pet",
        at: Date.now()
      });
      toast.warning(`Skipped ${states.join(", ")} \u2014 fallbacks cover them; retry from the banner.`);
    } else if (signal?.kind === "settings-changed") {
      rpc2.call("getOverlay").then((r4) => {
        setHasApiKey(r4.hasApiKey);
        setHasRdKey(r4.hasRdKey);
        setEngine(r4.engine);
        setPack(r4.pack);
        setSettings(r4.settings);
      }).catch(() => {
      });
    }
  });
  const retrySkipped = useCallback(() => {
    if (!skipped?.petId) return;
    const { petId, states } = skipped;
    void rpc2.call("regenerateStates", { petId, states }).then(() => {
      toast.success(
        `Retrying ${states.length} animation${states.length === 1 ? "" : "s"} for ${skipped.subject}\u2026`
      );
      setSkipped(null);
    }).catch((error) => toast.error(error.message));
  }, [rpc2, skipped]);
  const toggleBehavior = useCallback(
    (key, value) => {
      setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
      void rpc2.call("setBehavior", { key, value }).catch(() => {
      });
    },
    [rpc2]
  );
  const queueFull = (job ? 1 : 0) + queued.length >= MAX_JOBS;
  return /* @__PURE__ */ jsx(TooltipProvider2, { delayDuration: 300, children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto p-4 md:p-5", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-3xl space-y-4", children: [
    /* @__PURE__ */ jsx(
      JobBanner,
      {
        job,
        queued,
        lastError: lastError && lastError.at > errorDismissedAt ? lastError : null,
        onDismissError: () => setErrorDismissedAt(Date.now()),
        skipped,
        onRetrySkipped: retrySkipped,
        onDismissSkipped: () => setSkipped(null)
      }
    ),
    /* @__PURE__ */ jsxs(
      Tabs3,
      {
        value: tab,
        onValueChange: (next) => navigate.toPluginPanel("pets", { subPath: next === "habitat" ? "" : next }),
        children: [
          /* @__PURE__ */ jsxs(TabsList3, { children: [
            /* @__PURE__ */ jsx(TabsTrigger3, { value: "habitat", children: "Habitat" }),
            /* @__PURE__ */ jsx(TabsTrigger3, { value: "den", children: "Den" }),
            /* @__PURE__ */ jsx(TabsTrigger3, { value: "hatchery", children: "Hatchery" }),
            /* @__PURE__ */ jsx(TabsTrigger3, { value: "stats", children: "Stats" })
          ] }),
          /* @__PURE__ */ jsx(TabsContent3, { value: "habitat", className: "mt-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(Habitat, {}),
            /* @__PURE__ */ jsx("div", { className: "-mt-2 flex justify-end", children: /* @__PURE__ */ jsx(TourButton, {}) }),
            /* @__PURE__ */ jsx(BehaviorsCard, { settings, onToggle: toggleBehavior }),
            /* @__PURE__ */ jsx(PersonalityCard, { settings, onToggle: toggleBehavior })
          ] }) }),
          /* @__PURE__ */ jsx(TabsContent3, { value: "den", className: "mt-4", children: /* @__PURE__ */ jsx(DenTab, { hasApiKey, queueFull }) }),
          /* @__PURE__ */ jsx(TabsContent3, { value: "hatchery", className: "mt-4", children: /* @__PURE__ */ jsx(
            HatcheryTab,
            {
              hasApiKey,
              hasRdKey,
              engine,
              pack,
              jobActive: job !== null,
              queueFull
            }
          ) }),
          /* @__PURE__ */ jsx(TabsContent3, { value: "stats", className: "mt-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            settings && Boolean(settings.devMode) ? /* @__PURE__ */ jsx(DevCard, {}) : null,
            /* @__PURE__ */ jsx(StatsTab, {})
          ] }) })
        ]
      }
    )
  ] }) }) });
}

// app.tsx
function PetsSettingsSection() {
  const rpc2 = useRpc();
  const navigate = useBbNavigate();
  const [den, setDen] = useState(null);
  useEffect(() => {
    rpc2.call("listDen").then((r4) => setDen(r4.pets)).catch(() => {
    });
  }, [rpc2]);
  const active = den?.find((pet) => pet.active);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
      active ? `${active.name} \u2014 ${active.stage.name}, ${active.xp} XP \xB7 ${den.length} in the den.` : "Loading the den\u2026",
      " Manage pets, hatch new ones, and browse stats in the Pets panel."
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate.toPluginPanel("pets"), children: "Open Pets panel" })
  ] });
}
var app_default = definePluginApp((app) => {
  app.contentScripts.register({
    id: "pet-overlay",
    mount({ pluginId, signal }) {
      const container = document.createElement("div");
      container.setAttribute("data-bb-plugin-pets", "");
      document.body.appendChild(container);
      const root = createRoot(container);
      root.render(/* @__PURE__ */ jsx(Overlay, { pluginId }));
      let disposed = false;
      const dispose = () => {
        if (disposed) return;
        disposed = true;
        root.unmount();
        container.remove();
      };
      signal.addEventListener("abort", dispose, { once: true });
      return dispose;
    }
  });
  app.slots.navPanel({
    id: "pets",
    title: "Pets",
    icon: "Star",
    path: "pets",
    component: PetsPanel
  });
  app.slots.sidebarFooterAction({
    id: "open-pets",
    title: "Pet options",
    icon: "PawPrint",
    run() {
      window.dispatchEvent(new CustomEvent("pets:open-menu"));
    }
  });
  app.slots.settingsSection({
    id: "den",
    title: "Den",
    description: "Your companions live in the Pets panel.",
    component: PetsSettingsSection
  });
});
export {
  app_default as default
};
