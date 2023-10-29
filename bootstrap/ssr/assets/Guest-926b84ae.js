import { a as jsx, j as jsxs, F as Fragment } from "../ssr.js";
import { Navbar as Navbar$1, App, Page, Tabbar, TabbarLink, Icon } from "konsta/react";
import { useState } from "react";
import { G as GenIcon, g as MdCameraFront } from "./index.esm-569eca09.js";
import { router } from "@inertiajs/react";
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
function FaUsers(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 640 512" }, "child": [{ "tag": "path", "attr": { "d": "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" } }] })(props);
}
const Guest = (props) => {
  var _a;
  const [activePath, setActivePath] = useState(window.location.pathname);
  return /* @__PURE__ */ jsxs(
    App,
    {
      theme: ((_a = props.agent) == null ? void 0 : _a.os) == "iOS" ? "ios" : "material",
      children: [
        /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx(Navbar, {}) }),
        /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(
          Page,
          {
            children: props.children
          }
        ) }),
        /* @__PURE__ */ jsxs(
          Tabbar,
          {
            className: "fixed bottom-0",
            hidden: !["/", "/users"].includes(activePath),
            children: [
              /* @__PURE__ */ jsx(
                TabbarLink,
                {
                  active: activePath === "/",
                  onClick: () => {
                    router.visit("/");
                    setActivePath("/");
                  },
                  icon: /* @__PURE__ */ jsx(
                    Icon,
                    {
                      ios: /* @__PURE__ */ jsx(MdCameraFront, { size: 44 }),
                      material: /* @__PURE__ */ jsx(MdCameraFront, { size: 44 })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                TabbarLink,
                {
                  active: activePath === "/users",
                  onClick: () => {
                    router.visit("/users");
                    setActivePath("/users");
                  },
                  icon: /* @__PURE__ */ jsx(
                    Icon,
                    {
                      ios: /* @__PURE__ */ jsx(FaUsers, { size: 44 }),
                      material: /* @__PURE__ */ jsx(FaUsers, { size: 44 })
                    }
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
};
export {
  Guest as G
};
