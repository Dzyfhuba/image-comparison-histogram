import { j as jsxs, a as jsx } from "../ssr.js";
import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { G as GenIcon } from "./iconBase-08c2f7b6.js";
import { createTypedHooks } from "easy-peasy";
const typedHooks = createTypedHooks();
const useStoreActions = typedHooks.useStoreActions;
typedHooks.useStoreDispatch;
const useStoreState = typedHooks.useStoreState;
function MdDelete(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" } }] })(props);
}
function MdUpload(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z" } }] })(props);
}
function MdImage(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" } }] })(props);
}
function MdPeopleOutline(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-.2-.86-.52-1.22.88-.3 1.96-.53 3.02-.53 2.44 0 5 1.21 5 1.75v1.25zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" } }] })(props);
}
function MdOutlineAccountCircle(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38a9.947 9.947 0 00-12.28 0A7.957 7.957 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z" } }, { "tag": "path", "attr": { "d": "M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" } }] })(props);
}
const Navbar = () => {
  return /* @__PURE__ */ jsxs("nav", { className: `fixed bottom-0 border
     border-primary w-full z-50
      grid grid-rows-1 grid-flow-col
      h-14 rounded-t-2xl bg-white-1`, children: [
    /* @__PURE__ */ jsxs(Link, { href: "/", className: "flex justify-center items-center", children: [
      /* @__PURE__ */ jsx(MdOutlineAccountCircle, { size: 44, className: `${window.location.pathname === "/" ? "text-primary" : "text-neutral-1"}` }),
      /* @__PURE__ */ jsx("span", { className: "hidden", children: "KYC" })
    ] }),
    /* @__PURE__ */ jsxs(Link, { href: "/users", className: "flex justify-center items-center", children: [
      /* @__PURE__ */ jsx(MdPeopleOutline, { size: 44, className: `${window.location.pathname === "/users" ? "text-primary" : "text-neutral-1"}` }),
      /* @__PURE__ */ jsx("span", { className: "hidden", children: "Members" })
    ] })
  ] });
};
const Guest = (props) => {
  const { fetchMembers } = useStoreActions((actions) => actions);
  useEffect(() => {
    fetchMembers();
  }, []);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx(Navbar, {}) }),
    /* @__PURE__ */ jsx("main", { className: "px-3", children: props.children })
  ] });
};
const Button = (props) => {
  if (props.level === "primary") {
    return /* @__PURE__ */ jsx(
      "button",
      {
        ...props,
        className: `bg-primary px-5 rounded-md border border-primary hover:bg-white-1 hover:text-primary
        transition-colors duration-300 text-white
        disabled:bg-neutral-500 disabled:hover:bg-neutral-400 disabled:hover:text-white disabled:border-neutral-400
        ${props.className ? " " + props.className : ""}`,
        children: props.children
      }
    );
  }
  if (props.level === "danger") {
    return /* @__PURE__ */ jsx(
      "button",
      {
        ...props,
        className: `bg-red-500 px-5 rounded-md border border-red-500 hover:bg-white-1 hover:text-red-500
        transition-colors duration-300 text-white${props.className ? " " + props.className : ""}`,
        children: props.children
      }
    );
  }
  if (props.level === "success") {
    return /* @__PURE__ */ jsx(
      "button",
      {
        ...props,
        className: `bg-green-500 px-5 rounded-md border border-green-500 hover:bg-white-1 hover:text-green-500
        transition-colors duration-300 text-white${props.className ? " " + props.className : ""}`,
        children: props.children
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `${props.className}`,
      children: props.children
    }
  );
};
export {
  Button as B,
  Guest as G,
  MdDelete as M,
  MdUpload as a,
  useStoreActions as b,
  MdImage as c,
  useStoreState as u
};
