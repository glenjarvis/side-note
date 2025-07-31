function N(t) {
  return typeof t == "object" && t !== null && t.nodeType === Node.ELEMENT_NODE;
}
const p = {
  NONE: "",
  DESCENDANT: " ",
  CHILD: " > "
}, s = {
  id: "id",
  class: "class",
  tag: "tag",
  attribute: "attribute",
  nthchild: "nthchild",
  nthoftype: "nthoftype"
};
function W(t, e) {
  return Object.values(t).includes(e);
}
const G = "CssSelectorGenerator";
function S(t = "unknown problem", ...e) {
  console.warn(`${G}: ${t}`, ...e);
}
const H = {
  selectors: [
    s.id,
    s.class,
    s.tag,
    s.attribute
  ],
  // if set to true, always include tag name
  includeTag: !1,
  whitelist: [],
  blacklist: [],
  combineWithinSelector: !0,
  combineBetweenSelectors: !0,
  root: null,
  maxCombinations: Number.POSITIVE_INFINITY,
  maxCandidates: Number.POSITIVE_INFINITY
};
function U(t) {
  return Array.isArray(t) ? t.filter((e) => W(s, e)) : [];
}
function w(t) {
  return t instanceof RegExp;
}
function q(t) {
  return ["string", "function"].includes(typeof t) || w(t);
}
function C(t) {
  return Array.isArray(t) ? t.filter(q) : [];
}
function V(t) {
  return t instanceof Node;
}
function I(t) {
  const e = [
    Node.DOCUMENT_NODE,
    Node.DOCUMENT_FRAGMENT_NODE,
    // this includes Shadow DOM root
    Node.ELEMENT_NODE
  ];
  return V(t) && e.includes(t.nodeType);
}
function _(t, e) {
  if (I(t))
    return t.contains(e) || S("element root mismatch", "Provided root does not contain the element. This will most likely result in producing a fallback selector using element's real root node. If you plan to use the selector using provided root (e.g. `root.querySelector`), it will not work as intended."), t;
  const n = e.getRootNode({ composed: !1 });
  return I(n) ? (n !== document && S("shadow root inferred", "You did not provide a root and the element is a child of Shadow DOM. This will produce a selector using ShadowRoot as a root. If you plan to use the selector using document as a root (e.g. `document.querySelector`), it will not work as intended."), n) : b(e);
}
function O(t) {
  return typeof t == "number" ? t : Number.POSITIVE_INFINITY;
}
function J(t, e = {}) {
  const n = Object.assign(Object.assign({}, H), e);
  return {
    selectors: U(n.selectors),
    whitelist: C(n.whitelist),
    blacklist: C(n.blacklist),
    root: _(n.root, t),
    combineWithinSelector: !!n.combineWithinSelector,
    combineBetweenSelectors: !!n.combineBetweenSelectors,
    includeTag: !!n.includeTag,
    maxCombinations: O(n.maxCombinations),
    maxCandidates: O(n.maxCandidates)
  };
}
function m(t = []) {
  const [e = [], ...n] = t;
  return n.length === 0 ? e : n.reduce((r, o) => r.filter((i) => o.includes(i)), e);
}
function A(t) {
  return [].concat(...t);
}
function K(t) {
  return t.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".+");
}
function h(t) {
  const e = t.map((n) => {
    if (w(n))
      return (r) => n.test(r);
    if (typeof n == "function")
      return (r) => {
        const o = n(r);
        return typeof o != "boolean" ? (S("pattern matcher function invalid", "Provided pattern matching function does not return boolean. It's result will be ignored.", n), !1) : o;
      };
    if (typeof n == "string") {
      const r = new RegExp("^" + K(n) + "$");
      return (o) => r.test(o);
    }
    return S("pattern matcher invalid", "Pattern matching only accepts strings, regular expressions and/or functions. This item is invalid and will be ignored.", n), () => !1;
  });
  return (n) => e.some((r) => r(n));
}
function T(t, e, n) {
  const r = Array.from(_(n, t[0]).querySelectorAll(e));
  return r.length === t.length && t.every((o) => r.includes(o));
}
function R(t, e) {
  e = e ?? b(t);
  const n = [];
  let r = t;
  for (; N(r) && r !== e; )
    n.push(r), r = r.parentElement;
  return n;
}
function Q(t, e) {
  return m(t.map((n) => R(n, e)));
}
function b(t) {
  return t.ownerDocument.querySelector(":root");
}
const x = ", ", X = new RegExp([
  "^$",
  // empty or not set
  "\\s"
  // contains whitespace
].join("|")), Z = new RegExp([
  "^$"
  // empty or not set
].join("|")), v = [
  s.nthoftype,
  s.tag,
  s.id,
  s.class,
  s.attribute,
  s.nthchild
], tt = h([
  "class",
  "id",
  // Angular attributes
  "ng-*"
]);
function et({ name: t }) {
  return `[${t}]`;
}
function nt({ name: t, value: e }) {
  return `[${t}='${e}']`;
}
function rt({ nodeName: t, nodeValue: e }, n) {
  const r = n.tagName.toLowerCase();
  return ["input", "option"].includes(r) && t === "value" || t === "src" && e?.startsWith("data:") ? !1 : !tt(t);
}
function ot({ nodeName: t, nodeValue: e }) {
  return {
    name: g(t),
    value: g(e ?? void 0)
  };
}
function L(t) {
  const e = Array.from(t.attributes).filter((n) => rt(n, t)).map(ot);
  return [
    ...e.map(et),
    ...e.map(nt)
  ];
}
function it(t) {
  const e = t.map(L);
  return m(e);
}
function P(t) {
  var e;
  return ((e = t.getAttribute("class")) !== null && e !== void 0 ? e : "").trim().split(/\s+/).filter((n) => !Z.test(n)).map((n) => `.${g(n)}`);
}
function st(t) {
  const e = t.map(P);
  return m(e);
}
function D(t) {
  var e;
  const n = (e = t.getAttribute("id")) !== null && e !== void 0 ? e : "", r = `#${g(n)}`, o = t.getRootNode({ composed: !1 });
  return !X.test(n) && T([t], r, o) ? [r] : [];
}
function ct(t) {
  return t.length === 0 || t.length > 1 ? [] : D(t[0]);
}
function $(t) {
  const e = t.parentNode;
  if (e) {
    const r = Array.from(e.childNodes).filter(N).indexOf(t);
    if (r > -1)
      return [
        `:nth-child(${String(r + 1)})`
      ];
  }
  return [];
}
function at(t) {
  return m(t.map($));
}
function j(t) {
  return [
    g(t.tagName.toLowerCase())
  ];
}
function k(t) {
  const e = [
    ...new Set(A(t.map(j)))
  ];
  return e.length === 0 || e.length > 1 ? [] : [e[0]];
}
function M(t) {
  const e = k([t])[0], n = t.parentElement;
  if (n) {
    const o = Array.from(n.children).filter((i) => i.tagName.toLowerCase() === e).indexOf(t);
    if (o > -1)
      return [
        `${e}:nth-of-type(${String(o + 1)})`
      ];
  }
  return [];
}
function lt(t) {
  return m(t.map(M));
}
function* ut(t = [], { maxResults: e = Number.POSITIVE_INFINITY } = {}) {
  let n = 0, r = E(1);
  for (; r.length <= t.length && n < e; )
    n += 1, yield r.map((i) => t[i]), r = ft(r, t.length - 1);
}
function z(t = [], { maxResults: e = Number.POSITIVE_INFINITY } = {}) {
  return Array.from(ut(t, { maxResults: e }));
}
function ft(t = [], e = 0) {
  const n = t.length;
  if (n === 0)
    return [];
  const r = [...t];
  r[n - 1] += 1;
  for (let o = n - 1; o >= 0; o--)
    if (r[o] > e) {
      if (o === 0)
        return E(n + 1);
      r[o - 1]++, r[o] = r[o - 1] + 1;
    }
  return r[n - 1] > e ? E(n + 1) : r;
}
function E(t = 1) {
  return Array.from(Array(t).keys());
}
function dt(t = {}) {
  let e = [];
  return Object.entries(t).forEach(([n, r]) => {
    e = r.flatMap((o) => e.length === 0 ? [{ [n]: o }] : e.map((i) => Object.assign(Object.assign({}, i), { [n]: o })));
  }), e;
}
const gt = "3a".toUpperCase(), mt = /[ !"#$%&'()\[\]{|}<>*+,./;=?@^`~\\]/;
function g(t = "") {
  return CSS ? CSS.escape(t) : pt(t);
}
function pt(t = "") {
  return t.split("").map((e) => e === ":" ? `\\${gt} ` : mt.test(e) ? `\\${e}` : escape(e).replace(/%/g, "\\")).join("");
}
const St = {
  tag: k,
  id: ct,
  class: st,
  attribute: it,
  nthchild: at,
  nthoftype: lt
}, ht = {
  tag: j,
  id: D,
  class: P,
  attribute: L,
  nthchild: $,
  nthoftype: M
};
function Et(t, e) {
  return ht[e](t);
}
function Nt(t, e) {
  const n = St[e];
  return n(t);
}
function Tt(t = [], e, n) {
  return t.filter((r) => n(r) || !e(r));
}
function bt(t = [], e) {
  return t.sort((n, r) => {
    const o = e(n), i = e(r);
    return o && !i ? -1 : !o && i ? 1 : 0;
  });
}
function yt(t, e, n) {
  const r = Ct(t, n), o = _t(r, n), i = A(o);
  return [...new Set(i)];
}
function Ct(t, e) {
  const { blacklist: n, whitelist: r, combineWithinSelector: o, maxCombinations: i } = e, c = h(n), a = h(r), l = (u, f) => {
    const d = Nt(t, f), Y = Tt(d, c, a), y = bt(Y, a);
    return u[f] = o ? z(y, { maxResults: i }) : y.map((B) => [B]), u;
  };
  return It(e).reduce(l, {});
}
function It(t) {
  const { selectors: e, includeTag: n } = t, r = [...e];
  return n && !r.includes("tag") && r.push("tag"), r;
}
function Ot(t) {
  return t.includes(s.tag) || t.includes(s.nthoftype) ? [...t] : [...t, s.tag];
}
function wt(t) {
  const { selectors: e, combineBetweenSelectors: n, includeTag: r, maxCandidates: o } = t, i = n ? z(e, { maxResults: o }) : e.map((c) => [c]);
  return r ? i.map(Ot) : i;
}
function _t(t, e) {
  return wt(e).map((n) => At(n, t)).filter((n) => n.length > 0);
}
function At(t, e) {
  const n = {};
  return t.forEach((o) => {
    const i = e[o];
    i && i.length > 0 && (n[o] = i);
  }), dt(n).map(xt);
}
function Rt(t, e) {
  return e[t] ? e[t].join("") : "";
}
function xt(t = {}) {
  const e = [...v];
  return t[s.tag] && t[s.nthoftype] && e.splice(e.indexOf(s.tag), 1), e.map((n) => Rt(n, t)).join("");
}
function vt(t, e) {
  return [
    ...t.map((n) => e + p.DESCENDANT + n),
    ...t.map((n) => e + p.CHILD + n)
  ];
}
function Lt(t, e) {
  return e === "" ? t : vt(t, e);
}
function Pt(t, e, n = "", r) {
  const o = yt(t, e, r), i = Lt(o, n);
  for (const c of i)
    if (T(t, c, e))
      return c;
  return null;
}
function Dt(t, e, n = "", r) {
  if (t.length === 0)
    return null;
  const o = [
    t.length > 1 ? t : [],
    ...Q(t, e).map((i) => [i])
  ];
  for (const i of o) {
    const c = Pt(i, e, n, r);
    if (c)
      return {
        foundElements: i,
        selector: c
      };
  }
  return null;
}
function $t(t) {
  (t instanceof NodeList || t instanceof HTMLCollection) && (t = Array.from(t));
  const e = (Array.isArray(t) ? t : [t]).filter(N);
  return [...new Set(e)];
}
function jt(t) {
  return {
    value: t,
    include: !1
  };
}
function kt(t, e, n = p.NONE) {
  const r = {};
  return e.forEach((o) => {
    Reflect.set(r, o, Et(t, o).map(jt));
  }), {
    element: t,
    operator: n,
    selectors: r
  };
}
function Mt({ selectors: t, operator: e }) {
  let n = [...v];
  t[s.tag] && t[s.nthoftype] && (n = n.filter((o) => o !== s.tag));
  let r = "";
  return n.forEach((o) => {
    var i;
    ((i = t[o]) !== null && i !== void 0 ? i : []).forEach(({ value: a, include: l }) => {
      l && (r += a);
    });
  }), e + r;
}
function zt(t) {
  return [":root", ...R(t).reverse().map((r) => {
    const o = kt(r, [s.nthchild], p.CHILD);
    return o.selectors.nthchild.forEach((i) => {
      i.include = !0;
    }), o;
  }).map(Mt)].join("");
}
function Ft(t) {
  return t.map(zt).join(x);
}
function F(t, e = {}) {
  var n;
  const r = $t(t), o = J(r[0], e), i = (n = o.root) !== null && n !== void 0 ? n : b(r[0]);
  let c = "", a = i;
  function l() {
    return Dt(r, a, c, o);
  }
  let u = l();
  for (; u; ) {
    const { foundElements: f, selector: d } = u;
    if (T(r, d, i))
      return d;
    a = f[0], c = d, u = l();
  }
  return r.length > 1 ? r.map((f) => F(f, o)).join(x) : Ft(r);
}
const Yt = 1;
function Bt() {
  const t = window.getSelection(), e = {
    pageURL: window.location.href,
    selector: "",
    targetText: "",
    noteText: "",
    startOffset: null,
    endOffset: null,
    context: "",
    isSaved: !0
    // TODO: Return to false after testing
  };
  if (t && !t.isCollapsed && (e.targetText = t.toString().trim(), e.targetText.length > 0)) {
    const n = t.getRangeAt(0);
    e.startOffset = n.startOffset, e.endOffset = n.endOffset;
    const r = document.createElement("span");
    r.className = "note-wrapper";
    const o = document.createElement("span");
    o.className = "sticky-note", e.noteText = window.prompt("Contents for SideNote:"), o.textContent = e.noteText;
    const i = document.createTextNode(e.targetText);
    r.appendChild(i), r.appendChild(o), n.deleteContents(), n.insertNode(r);
    const c = n.commonAncestorContainer, a = c.nodeType === Yt ? c : c.parentElement;
    if (a)
      e.selector = F(a);
    else
      throw Error(`I could not determine CSS Selector for: ${JSON.stringify(e)}`);
    return console.log(`Database Record: ${JSON.stringify(e)}`), e;
  }
}
document.addEventListener("mouseup", Bt);
function Wt() {
  console.log("initSideNote exported...");
}
export {
  Wt as initSideNote
};
