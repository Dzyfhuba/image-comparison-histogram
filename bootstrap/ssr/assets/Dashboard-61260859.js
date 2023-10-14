import { a as jsx, j as jsxs, F as Fragment } from "../ssr.js";
import { Navbar as Navbar$1, Page, Fab } from "konsta/react";
import { G as GenIcon } from "./iconBase-08c2f7b6.js";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "react";
const LogoImageLight = "/build/assets/logo-long-light-72e64892.png";
const LogoImageDark = "/build/assets/logo-long-dark-70b0c989.png";
const Navbar = () => {
  return /* @__PURE__ */ jsx(
    Navbar$1,
    {
      title: /* @__PURE__ */ jsx(Logo, {}),
      titleClassName: "h-3/5",
      className: "hidden"
    }
  );
};
const Logo = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("img", { src: LogoImageLight, alt: "title", className: "dark:hidden h-full" }),
    /* @__PURE__ */ jsx("img", { src: LogoImageDark, alt: "title", className: "hidden dark:block h-full" })
  ] });
};
const Guest = (props) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Page, { children: props.children }) })
  ] }) });
};
function BsThreeDotsVertical(props) {
  return GenIcon({ "tag": "svg", "attr": { "fill": "currentColor", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" } }] })(props);
}
const Dashboard = () => {
  return /* @__PURE__ */ jsxs(Guest, { children: [
    "Dashboard",
    /* @__PURE__ */ jsx(Fab, { icon: /* @__PURE__ */ jsx(BsThreeDotsVertical, {}), className: "fixed bottom-10-safe right-10-safe rounded-full" })
  ] });
};
export {
  Dashboard as default
};
