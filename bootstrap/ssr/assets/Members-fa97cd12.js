import { a as jsx, j as jsxs, F as Fragment } from "../ssr.js";
import { u as useStoreState, b as useStoreActions, B as Button, c as MdImage, a as MdUpload, M as MdDelete, G as Guest } from "./Button-09698f11.js";
import { G as GenIcon } from "./iconBase-08c2f7b6.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useState, useEffect } from "react";
import ReactImageUploading from "react-images-uploading";
import { createStore, action, thunk, StoreProvider } from "easy-peasy";
import Zoom from "react-medium-image-zoom";
import { nanoid } from "nanoid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react/jsx-runtime";
import "react-dom/server";
import "@inertiajs/react";
import "@inertiajs/react/server";
function GoPlus(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M11.75 4.5a.75.75 0 0 1 .75.75V11h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0V12.5H5.25a.75.75 0 0 1 0-1.5H11V5.25a.75.75 0 0 1 .75-.75Z" } }] })(props);
}
const Input = (props) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      className: `p-2.5 rounded-md outline outline-1 outline-neutral-1 disabled:bg-neutral-200 disabled:text-neutral-500`
    }
  );
};
const Label = (props) => {
  return /* @__PURE__ */ jsx("label", { ...props, className: `block ${props.className}`, children: props.children });
};
const Form = (props) => {
  var _a;
  const { members } = useStoreState((state) => state);
  const { fetchMembers } = useStoreActions((actions) => actions);
  const [username, setUsername] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState({
    member: "",
    images: ""
  });
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const onSubmit = async (e) => {
    var _a2;
    e.preventDefault();
    console.log({ members, images });
    if (!(images.length && username !== "") && props.mode === "create") {
      setError({
        images: !images.length ? "Upload One" : "",
        member: !username ? "Required" : ""
      });
      return;
    }
    const body = new FormData();
    if (props.mode === "create") {
      body.append("username", username);
    } else {
      body.append("_method", "PUT");
    }
    body.append("kyc_image", images[0].file || "", "" + images[0]);
    Swal.update({
      title: "Loading",
      html: void 0
    });
    Swal.showLoading();
    axios.post(props.mode === "create" ? "/api/members" : `/api/members/${(_a2 = props.member) == null ? void 0 : _a2.id}`, body).then((res) => {
      console.log(res.data);
      fetchMembers();
      Swal.hideLoading();
      Swal.update({
        icon: "success",
        title: props.mode === "create" ? "Add New Member Successfully" : "Update Member Successfully"
      });
    }).catch((err) => {
      var _a3;
      console.error(err);
      Swal.hideLoading();
      Swal.update({
        icon: "error",
        title: `Error ${((_a3 = err.response) == null ? void 0 : _a3.status) || 500}`
      });
    });
  };
  useEffect(() => {
    if (username === "") {
      setError({
        ...error,
        member: ""
      });
    }
    if (images.length) {
      setError({
        ...error,
        images: ""
      });
    }
  }, [username, images]);
  const onReset = () => {
    setImages([]);
    setError({
      images: "",
      member: ""
    });
  };
  console.log(props.member);
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "flex flex-col gap-3 p-3 text-start",
      onSubmit,
      onReset,
      autoComplete: "off",
      children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "member", children: "Member" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Username Member",
            name: "member",
            onChange: (e) => setUsername(e.target.value),
            autoComplete: "new-password",
            disabled: props.mode === "edit",
            value: props.mode === "edit" ? (_a = props.member) == null ? void 0 : _a.username : void 0,
            required: true
          }
        ),
        error.member && /* @__PURE__ */ jsx("small", { className: "text-red-500", children: error.member }),
        /* @__PURE__ */ jsx(
          ReactImageUploading,
          {
            value: images,
            onChange,
            acceptType: ["png"],
            children: ({
              onImageUpload,
              onImageRemoveAll,
              isDragging,
              dragProps
            }) => {
              var _a2;
              return (
                // write your building UI
                /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      onClick: onImageUpload,
                      type: "button",
                      level: "primary",
                      className: "w-full",
                      ...dragProps,
                      children: images.length ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(MdImage, { className: "mx-auto" }),
                        /* @__PURE__ */ jsx("span", { className: "line-clamp-1", children: (_a2 = images[0].file) == null ? void 0 : _a2.name })
                      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(MdUpload, { className: "mx-auto", size: isDragging ? 40 : void 0 }),
                        !isDragging ? /* @__PURE__ */ jsx("span", { children: "Upload Image" }) : void 0
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      level: "danger",
                      type: "button",
                      onClick: onImageRemoveAll,
                      children: /* @__PURE__ */ jsx(MdDelete, {})
                    }
                  )
                ] })
              );
            }
          }
        ),
        error.images && /* @__PURE__ */ jsx("small", { className: "text-red-500", children: error.images }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsx(Button, { level: "danger", type: "reset", children: /* @__PURE__ */ jsx(MdDelete, {}) }),
          /* @__PURE__ */ jsx(Button, { level: "success", type: "submit", className: "w-full", children: "Submit" })
        ] })
      ]
    }
  );
};
const store = createStore({
  members: [],
  setMembers: action((state, payload) => {
    state.members = payload;
  }),
  fetchMembers: thunk(async (actions) => {
    const data = await axios.get("/api/members").then((res) => {
      return res.data;
    }).catch((err) => {
      console.error(err);
      return [];
    });
    actions.setMembers(data);
  })
});
const CreateButton = () => {
  useStoreActions((actions) => actions);
  const ReactSwal = withReactContent(Swal);
  const handleClick = (e) => {
    console.log(e.target);
    ReactSwal.fire({
      title: "Add New Member",
      showConfirmButton: false,
      html: /* @__PURE__ */ jsx(StoreProvider, { store, children: /* @__PURE__ */ jsx(Form, { mode: "create" }) })
    });
  };
  return /* @__PURE__ */ jsx(
    Button,
    {
      className: `bg-primary rounded-full p-3 border border-primary
      fixed bottom-16 right-2 hover:bg-white-1 hover:text-primary
        transition-colors duration-300 text-white`,
      onClick: handleClick,
      children: /* @__PURE__ */ jsx(GoPlus, { size: 20 })
    }
  );
};
const styles = "";
const Members = () => {
  const { members } = useStoreState((state) => state);
  const { setMembers } = useStoreActions((state) => state);
  const ReactSwal = withReactContent(Swal);
  const fetchData = async () => {
    const members2 = await axios.get("/api/members").then((res) => {
      return res.data;
    }).catch((error) => {
      console.error(error);
      return [];
    });
    setMembers(members2);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleEdit = (member) => {
    ReactSwal.fire({
      title: "Edit Member",
      showConfirmButton: false,
      html: /* @__PURE__ */ jsx(StoreProvider, { store, children: /* @__PURE__ */ jsx(Form, { mode: "edit", member }) })
    });
  };
  const handleDelete = async (member) => {
    Swal.fire({
      title: `Sure Delete username: ${member.username}?`,
      text: "Can't restore after deleted",
      icon: "warning",
      confirmButtonColor: "#f00",
      confirmButtonText: "Delete",
      showCancelButton: true,
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const success = await axios.delete(`/api/members/${member.id}`).then(() => {
          return true;
        }).catch((err) => {
          console.error(err);
          return false;
        });
        return success;
      }
    }).then(async ({ value }) => {
      if (value) {
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Delete Member Successfully"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error 500"
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs(Guest, { className: "min-h-screen px-3", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black underline", children: "Kelola Members" }),
    /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-3", children: members.map((member) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "shadow-md border border-primary rounded-2xl p-3 flex flex-col flex-wrap h-32 gap-1",
        children: [
          /* @__PURE__ */ jsx("span", { children: `Member ID: ${member.id}` }),
          /* @__PURE__ */ jsx("span", { children: `Username: ${member.username}` }),
          /* @__PURE__ */ jsx("span", { children: new Date(member.updated_at).toLocaleString("id") }),
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(Zoom, { children: /* @__PURE__ */ jsx(
            LazyLoadImage,
            {
              src: `/api/members/image/${member.kyc_image}`,
              alt: member.username,
              className: "w-16 h-16 object-contain mx-auto",
              useIntersectionObserver: true
            },
            nanoid()
          ) }) }),
          /* @__PURE__ */ jsxs("span", { className: "flex-grow flex items-end justify-end gap-1", children: [
            /* @__PURE__ */ jsx(Button, { level: "primary", onClick: () => handleEdit(member), children: "Edit" }),
            /* @__PURE__ */ jsx(Button, { level: "danger", onClick: () => handleDelete(member), style: { padding: 0 }, children: /* @__PURE__ */ jsx(MdDelete, { size: 24 }) })
          ] })
        ]
      },
      member.id
    )) }),
    /* @__PURE__ */ jsx(CreateButton, {})
  ] });
};
export {
  Members as default
};
