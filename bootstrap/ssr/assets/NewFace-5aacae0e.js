import { j as jsxs, a as jsx, F as Fragment } from "../ssr.js";
import axios from "axios";
import { N as NoImage, u as useCamera } from "./No-Image-Found-86e13b26.js";
import { G as Guest } from "./Guest-926b84ae.js";
import { u as useStoreState } from "./hook-282f7307.js";
import { useRemember, router } from "@inertiajs/react";
import { List, ListInput, ListItem, Toggle, Button, Icon, Dialog, Preloader, DialogButton } from "konsta/react";
import { useState, useEffect } from "react";
import { e as MdClose, f as MdRefresh } from "./index.esm-569eca09.js";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react/server";
import "@capacitor/camera";
import "easy-peasy";
const AxiosGuest = axios.create({
  baseURL: "http://localhost:81"
});
const isValidUrl = (urlString) => {
  try {
    const parsedUrl = new URL(urlString);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (error) {
    return false;
  }
};
const NewFace = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const qsMode = urlSearchParams.get("mode");
  const { image } = useStoreState((state) => state);
  const [username, setUsername] = useState("");
  const [isReplace, setReplace] = useState(!!parseInt(urlSearchParams.get("replace") || "0"));
  const [confirmOpened, setConfirmOpened] = useState(false);
  const [imageData, setImageData] = useRemember(router.restore("image") || image || null, "image");
  const [isLoading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState(null);
  const [resTitle, setResTitle] = useState("");
  const { takePicture } = useCamera();
  const handleSubmit = async () => {
    const body = new FormData();
    body.append("username", username || "");
    body.append("replace", isReplace ? "true" : "false");
    if (imageData == null ? void 0 : imageData.webPath) {
      const res = await axios.get(imageData == null ? void 0 : imageData.webPath, { responseType: "blob" });
      console.log(res.data);
      body.append("image", res.data);
      const file = new File([res.data], "image.png", { type: "image/jpg" });
      body.append("image", file);
      console.log(file);
      console.log(res.data);
    }
    setLoading(true);
    setResTitle("Loading");
    const { data, error } = await AxiosGuest.post(`/api/lbph/${qsMode}`, body).then((res) => {
      console.log(res.data);
      return {
        data: res.data,
        error: null
      };
    }).catch((err) => {
      var _a, _b, _c;
      return {
        error: ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || ((_c = err.response) == null ? void 0 : _c.data) || { "message": "Something went wrong" },
        data: null
      };
    });
    setTimeout(() => {
      setLoading(false);
      if (error) {
        console.log(error);
        setResTitle("Error");
        if (JSON.stringify(error) === "{}") {
          setResMessage("Internal Server Error");
        } else {
          setResMessage(Object.values(error).map((err, idx) => /* @__PURE__ */ jsx("p", { children: err }, idx)));
        }
        return;
      } else {
        if (qsMode == "train") {
          setResTitle("Success");
          setResMessage(Object.keys(data).map((key, idx) => /* @__PURE__ */ jsxs("p", { children: [
            key,
            ": ",
            data[key]
          ] }, idx)));
        }
        if (qsMode == "predict") {
          window.localStorage.setItem("predicted", data.result_path);
          setResTitle("Success");
          setResMessage(
            /* @__PURE__ */ jsx("table", { children: /* @__PURE__ */ jsx("tbody", { children: Object.keys(data).map(
              (key, idx) => /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { children: key }),
                /* @__PURE__ */ jsx("td", { children: ":" }),
                /* @__PURE__ */ jsx("td", {
                  // data[key] is url
                  children: isValidUrl(data[key]) ? /* @__PURE__ */ jsx("a", { className: "link", href: data[key], target: "_blank", rel: "noreferrer", children: data[key].split("/").pop() }) : data[key]
                })
              ] }, idx)
            ) }) })
          );
        }
      }
    }, 2e3);
  };
  useEffect(() => {
    const arr = [
      "train",
      "predict"
    ];
    console.log({ qsMode });
    if (!(qsMode && arr.includes(qsMode)))
      router.replace("/");
    if (window.localStorage.getItem("image")) {
      setImageData(window.localStorage.getItem("image") ? JSON.parse(window.localStorage.getItem("image")) : null);
    }
    return () => {
      router.remember(router.restore("image"), "image");
    };
  }, []);
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsxs("div", { className: "h-screen flex flex-col p-3", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: (imageData == null ? void 0 : imageData.webPath) || NoImage,
          alt: "captured image",
          className: "h-3/5 w-full max-w-xl object-cover mx-auto border-black border rounded-md",
          onError: (e) => e.currentTarget.setAttribute("src", NoImage)
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("form", { onSubmit: (e) => {
          var _a;
          e.preventDefault();
          setConfirmOpened(true);
          setResTitle("Confirm");
          setResMessage(null);
          (_a = document.getElementById("submit")) == null ? void 0 : _a.focus();
        }, children: /* @__PURE__ */ jsxs(List, { children: [
          /* @__PURE__ */ jsx(
            ListInput,
            {
              floatingLabel: true,
              label: "Username",
              type: "text",
              onChange: (e) => setUsername(e.target.value),
              required: true,
              tabIndex: 0,
              autoFocus: true
            }
          ),
          qsMode === "train" && /* @__PURE__ */ jsx(
            ListItem,
            {
              title: "Update",
              after: /* @__PURE__ */ jsx(
                Toggle,
                {
                  checked: isReplace,
                  onChange: () => setReplace(!isReplace)
                }
              )
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx(Button, { clear: true, className: "w-min k-color-kred", tabIndex: 1, onClick: () => router.visit("/"), children: /* @__PURE__ */ jsx(Icon, { material: /* @__PURE__ */ jsx(MdClose, { size: 44 }), ios: /* @__PURE__ */ jsx(MdClose, { size: 44 }), className: "aspect-square" }) }),
          /* @__PURE__ */ jsx(Button, { clear: true, className: "w-min k-color-yellow", onClick: async () => {
            const image2 = await takePicture();
            setImageData(image2);
            router.remember(image2, "image");
            window.localStorage.setItem("image", JSON.stringify(image2));
          }, children: /* @__PURE__ */ jsx(Icon, { material: /* @__PURE__ */ jsx(MdRefresh, { size: 44 }), ios: /* @__PURE__ */ jsx(MdRefresh, { size: 44 }), className: "aspect-square" }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => {
                var _a;
                setConfirmOpened(true);
                setResTitle("Confirm");
                setResMessage(null);
                (_a = document.getElementById("submit")) == null ? void 0 : _a.focus();
              },
              children: qsMode === "train" ? "Save" : "Predict"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        opened: confirmOpened,
        onBackdropClick: () => setConfirmOpened(false),
        title: resTitle || "Confirm",
        content: isLoading ? /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Preloader, {}) }) : resMessage || "Are you sure want to save this face?",
        buttons: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(DialogButton, { onClick: () => setConfirmOpened(false), disabled: isLoading, children: resTitle === "Success" ? "Close" : "Cancel" }),
          /* @__PURE__ */ jsx(
            DialogButton,
            {
              strong: true,
              onClick: resTitle === "Success" ? () => {
                setConfirmOpened(false);
                router.replace("/");
              } : handleSubmit,
              disabled: isLoading || resTitle === "Error",
              id: "submit",
              children: resTitle === "Success" ? "Back" : "Confirm"
            }
          )
        ] }),
        colors: resTitle === "Error" ? {
          titleIos: "text-red-500",
          titleMaterial: "text-red-500"
        } : void 0
      }
    )
  ] });
};
export {
  NewFace as default
};
