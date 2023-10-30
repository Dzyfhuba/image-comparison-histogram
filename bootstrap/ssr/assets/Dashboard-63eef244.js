import { j as jsxs, F as Fragment, a as jsx } from "../ssr.js";
import { u as useCamera, N as NoImage } from "./No-Image-Found-9f1fc533.js";
import { a as useStoreActions } from "./hook-282f7307.js";
import { router } from "@inertiajs/react";
import { Fab, Popover, List, ListButton, Card, Table, TableHead, TableRow, TableCell, TableBody, Sheet, Toolbar, Link } from "konsta/react";
import { useState, useRef, useEffect } from "react";
import { G as GenIcon } from "./index.esm-569eca09.js";
import moment from "moment";
import "moment/locale/id.js";
import { G as Guest } from "./Guest-284359ca.js";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "@capacitor/camera";
import "easy-peasy";
function BsThreeDotsVertical(props) {
  return GenIcon({ "tag": "svg", "attr": { "fill": "currentColor", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" } }] })(props);
}
const FabMenu = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const popoverTargetRef = useRef(null);
  const { setImage } = useStoreActions((state) => state);
  const openPopover = (targetRef) => {
    popoverTargetRef.current = targetRef;
    setPopoverOpened(true);
  };
  const { takePicture } = useCamera();
  const handleNewFace = async (path) => {
    const image = await takePicture();
    setImage(image);
    router.visit(path);
    window.localStorage.setItem("image", JSON.stringify(image));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Fab,
      {
        icon: /* @__PURE__ */ jsx(BsThreeDotsVertical, {}),
        className: "fixed bottom-20-safe right-10-safe rounded-full force-dark",
        id: "fab-menu",
        onClick: (e) => {
          openPopover(e.currentTarget);
        }
      }
    ),
    /* @__PURE__ */ jsx(
      Popover,
      {
        opened: popoverOpened,
        target: popoverTargetRef.current,
        onBackdropClick: () => setPopoverOpened(false),
        children: /* @__PURE__ */ jsxs(List, { nested: true, children: [
          /* @__PURE__ */ jsx(ListButton, { onClick: () => handleNewFace("/new-face?mode=train"), children: "New Face" }),
          /* @__PURE__ */ jsx(ListButton, { onClick: () => handleNewFace("/new-face?mode=train&replace=1"), children: "Update Face" }),
          /* @__PURE__ */ jsx(
            ListButton,
            {
              onClick: () => handleNewFace("/new-face?mode=predict"),
              children: "Predict"
            }
          )
        ] })
      }
    )
  ] });
};
const Predicted = () => {
  const [predicted, setPredicted] = useState("");
  useEffect(() => {
    setPredicted(window.localStorage.getItem("predicted") || "");
  }, []);
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Predicted" }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: predicted,
        alt: "predicted",
        className: "max-w-xl mx-auto w-full h-3/5",
        onError: (e) => e.currentTarget.setAttribute("src", NoImage)
      }
    )
  ] }) });
};
moment.locale("id");
const PredictedLogs = (props) => {
  const columns = [
    "id",
    "result path",
    "user id",
    "score",
    "diff time",
    "created at"
  ];
  const [sheetOpened, setSheetOpened] = useState(false);
  const [sheetContent, setSheetContent] = useState(null);
  const diffDate = (date) => {
    const currentDate = moment(/* @__PURE__ */ new Date());
    const createdDate = moment(date);
    const diff = currentDate.diff(createdDate, "seconds");
    if (diff < 60) {
      return `${diff} seconds ago`;
    } else if (diff < 3600) {
      return `${currentDate.diff(createdDate, "minutes")} minutes ago`;
    } else if (diff < 86400) {
      return `${currentDate.diff(createdDate, "hours")} hours ago`;
    } else if (diff < 604800) {
      return `${currentDate.diff(createdDate, "days")} days ago`;
    } else if (diff < 2592e3) {
      return `${currentDate.diff(createdDate, "weeks")} weeks ago`;
    } else if (diff < 31536e3) {
      return `${currentDate.diff(createdDate, "months")} months ago`;
    } else {
      return `${currentDate.diff(createdDate, "years")} years ago`;
    }
  };
  useEffect(() => {
    if (!sheetOpened) {
      setSheetContent("");
    }
  }, [sheetOpened]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Predicted Logs" }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx(TableRow, { header: true, children: columns.filter((a) => a !== "id").map((column, index) => /* @__PURE__ */ jsx(TableCell, { header: true, className: "capitalize", children: column }, index)) }) }),
        /* @__PURE__ */ jsx(TableBody, { children: props.data.map((log, index) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            onClick: () => {
              setSheetOpened(true);
              setSheetContent(
                /* @__PURE__ */ jsx("img", { src: `/lbph/score/${log.result_path}`, alt: "preview", className: "object-center w-full h-full object-contain" })
              );
            },
            className: "hover:cursor-pointer touch-ripple-current",
            colors: {
              bgIos: "hover:bg-black/5 dark:hover:bg-white/10 hover:cursor-pointer touch-ripple-current",
              bgMaterial: "hover:bg-md-light-secondary-container dark:hover:bg-md-dark-secondary-container hover:cursor-pointer touch-ripple-current"
            },
            children: [
              /* @__PURE__ */ jsx(TableCell, { hidden: true, children: log.id }),
              /* @__PURE__ */ jsx(TableCell, { children: log.result_path }),
              /* @__PURE__ */ jsx(TableCell, { children: log.username }),
              /* @__PURE__ */ jsx(TableCell, { children: log.score }),
              /* @__PURE__ */ jsx(TableCell, { children: diffDate(log.created_at) }),
              /* @__PURE__ */ jsx(TableCell, { children: moment(log.created_at).format("DD MMM YYYY HH:mm:ss") })
            ]
          },
          index
        )) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs(
      Sheet,
      {
        className: "pb-safe w-full h-full max-h-[50vh] bg-base-200",
        opened: sheetOpened,
        onBackdropClick: () => setSheetOpened(false),
        children: [
          /* @__PURE__ */ jsxs(Toolbar, { top: true, children: [
            /* @__PURE__ */ jsx("div", { className: "left" }),
            /* @__PURE__ */ jsx("div", { className: "right", children: /* @__PURE__ */ jsx(Link, { toolbar: true, onClick: () => setSheetOpened(false), children: "Close" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-4/5", children: sheetContent })
        ]
      }
    )
  ] });
};
const Dashboard = (props) => {
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Predicted, {}),
    /* @__PURE__ */ jsx(PredictedLogs, { data: props.predictedLogs }),
    /* @__PURE__ */ jsx(FabMenu, {}),
    /* @__PURE__ */ jsx("div", { className: "-right-18 top-5 fixed bg-red-700 text-white rotate-45 w-52 text-center", children: props.agent.os })
  ] });
};
export {
  Dashboard as default
};
