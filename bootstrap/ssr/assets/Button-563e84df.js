import { j as jsxs, a as jsx } from "../ssr.js";
import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { c as MdOutlineAccountCircle, d as MdPeopleOutline } from "./index.esm-569eca09.js";
import { a as useStoreActions } from "./hook-282f7307.js";
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
  Guest as G
};
