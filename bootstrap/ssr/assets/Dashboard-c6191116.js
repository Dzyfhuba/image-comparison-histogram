import { j as jsxs, a as jsx, F as Fragment } from "../ssr.js";
import { useState, useEffect } from "react";
import { u as useStoreState } from "./hook-282f7307.js";
import Select from "react-select";
import { G as Guest, B as Button } from "./Button-563e84df.js";
import axios from "axios";
import Swal from "sweetalert2";
import ReactImageUploading from "react-images-uploading";
import { M as MdDelete, a as MdUpload } from "./index.esm-569eca09.js";
import { ScaleLoader } from "react-spinners";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react";
import "@inertiajs/react/server";
import "easy-peasy";
const MemberForm = (props) => {
  const { members } = useStoreState((state) => state);
  return /* @__PURE__ */ jsxs("form", { className: "shadow border p-3 rounded", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "member", children: "Pilih Member" }),
    /* @__PURE__ */ jsx(
      Select,
      {
        name: "member",
        onChange: props.setSelectedMember,
        options: members.map((member) => {
          return {
            value: member.id,
            label: member.username
          };
        }),
        isClearable: true
      }
    )
  ] });
};
const Dashboard = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [member, setMember] = useState();
  const [images, setImages] = useState([]);
  const [score, setScore] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const fetchData = async (memberId) => {
    if (!memberId)
      return;
    const member2 = await axios.get(`/api/members/${memberId}`).then((res) => {
      return res.data;
    }).catch((err) => {
      Swal.fire({
        title: "Error 500",
        icon: "error"
      });
      return [];
    });
    setMember(member2);
  };
  useEffect(() => {
    fetchData((selectedMember == null ? void 0 : selectedMember.value) || 0);
  }, [selectedMember]);
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const handleCalculate = async () => {
    const body = new FormData();
    if (selectedMember == null ? void 0 : selectedMember.value) {
      body.append("id", (selectedMember == null ? void 0 : selectedMember.value) ? "" + selectedMember.value : "0");
    }
    if (images.length) {
      body.append("kyc_image", images[0].file, "test");
    }
    setLoading(true);
    const score2 = await axios.post("/api/members/compare_similarity", body).then((res) => {
      return res.data;
    }).catch((err) => {
      var _a;
      Swal.fire({
        title: `Error ${((_a = err.response) == null ? void 0 : _a.status) || 500}`,
        icon: "error"
      });
      return NaN;
    });
    setScore(score2);
    setLoading(false);
  };
  return /* @__PURE__ */ jsxs(Guest, { className: "min-h-screen px-3", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black underline", children: "Image Comparison" }),
    /* @__PURE__ */ jsx(MemberForm, { setSelectedMember }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        id: "comparison",
        className: "grid grid-cols-2 p-3 auto-rows-min mt-3 shadow rounded border gap-3",
        children: [
          /* @__PURE__ */ jsx("h1", { className: "col-span-full text-lg font-bold", children: "Image Comparison" }),
          /* @__PURE__ */ jsxs("div", { id: "image-a", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-center underline", children: "Image A" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                className: `h-28 outline outline-1 object-contain w-full ${member ? "bg-black" : "bg-neutral-200"}`,
                src: member ? `/api/members/image/${member == null ? void 0 : member.kyc_image}` : "/images/No-Image-Found.png",
                alt: member == null ? void 0 : member.username
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { id: "image-b", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-center underline", children: "Image B" }),
            /* @__PURE__ */ jsx(
              ReactImageUploading,
              {
                value: images,
                onChange,
                acceptType: ["png"],
                dataURLKey: "data_url",
                children: ({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  isDragging,
                  dragProps
                }) => (
                  // write your building UI
                  /* @__PURE__ */ jsx("div", { className: "outline outline-1 h-28 flex justify-center relative bg-black", children: imageList.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        className: "h-28 object-contain",
                        src: imageList[0]["data_url"] || ""
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        className: `absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl`,
                        onClick: onImageRemoveAll,
                        children: /* @__PURE__ */ jsx(MdDelete, { size: 20 })
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxs(
                    Button,
                    {
                      onClick: onImageUpload,
                      type: "button",
                      level: "primary",
                      className: "w-full h-28 rounded-none",
                      ...dragProps,
                      children: [
                        /* @__PURE__ */ jsx(MdUpload, { className: "mx-auto", size: isDragging ? 40 : void 0 }),
                        !isDragging ? /* @__PURE__ */ jsx("span", { children: "Upload Image" }) : void 0
                      ]
                    }
                  ) })
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { id: "score", className: "col-span-full text-center", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                level: "primary",
                onClick: () => handleCalculate(),
                disabled: isLoading,
                children: isLoading ? /* @__PURE__ */ jsx(ScaleLoader, { height: 8, color: "white" }) : "Calculate"
              }
            ),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("span", { children: [
              "Score: ",
              score * 100,
              "%"
            ] }) })
          ] })
        ]
      }
    )
  ] });
};
export {
  Dashboard as default
};
