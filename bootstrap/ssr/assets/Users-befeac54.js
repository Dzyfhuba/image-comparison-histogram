import { j as jsxs, a as jsx } from "../ssr.js";
import { G as Guest } from "./Guest-284359ca.js";
import { Table, TableHead, TableRow, TableCell, TableBody } from "konsta/react";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "react";
import "./index.esm-569eca09.js";
const Users = (props) => {
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx("h1", { children: "Users" }),
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { header: true, children: [
        /* @__PURE__ */ jsx(TableCell, { header: true, children: "ID" }),
        /* @__PURE__ */ jsx(TableCell, { header: true, children: "Username" }),
        /* @__PURE__ */ jsx(TableCell, { header: true, children: "Trained Image" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: props.users.map((user) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: user.id }),
        /* @__PURE__ */ jsx(TableCell, { children: user.username }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("img", { src: `/users/trained-image/${user.trained_image}`, alt: `${"LBPH"} ${user.username}`, className: "h-14 w-14 object-cover" }) })
      ] }, user.id)) })
    ] })
  ] });
};
export {
  Users as default
};
