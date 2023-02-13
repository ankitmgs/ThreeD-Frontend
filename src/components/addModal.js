import React, { useState } from "react";
import { Formik } from "formik";
import app_config from "../config";
import Swal from "sweetalert2";
import { Slide } from "react-reveal";
import CircularProgress from "@mui/material/CircularProgress";

const AddModal = () => {
  const url = app_config.api_url;
  const [selFile, setSelFile] = useState("");
  const [selImage, setSelImage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const modalForm = {
    title: "",
    description: "",
    uplodedby: "",
    data: "",
    thumbnail: "",
    category: "",
    userID: currentUser._id,
  };

  console.log("heloe", currentUser);

  const modalSubmit = (formdata) => {
    setIsloading(true);
    formdata.data = selFile;
    formdata.thumbnail = selImage;
    fetch(url + "/modal/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Added Successfully",
          });
        }
        setIsloading(false);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(url + "/modal/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setSelImage(file.name);
    const fd = new FormData();
    fd.append("myimage", file);
    fetch(url + "/modal/uploadimage", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("image uploaded");
      }
    });
  };

  return (
    <div>
      <>
        {/* Section: Design Block */}
        <section className=" text-center text-lg-start">
          <style
            dangerouslySetInnerHTML={{
              __html:
                "\n    .rounded-t-5 {\n      border-top-left-radius: 0.5rem;\n      border-top-right-radius: 0.5rem;\n    }\n\n    @media (min-width: 992px) {\n      .rounded-tr-lg-0 {\n        border-top-right-radius: 0;\n      }\n\n      .rounded-bl-lg-5 {\n        border-bottom-left-radius: 0.5rem;\n      }\n    }\n  ",
            }}
          />
          <div className="card mb-3" style={{ height: "100vh" }}>
            <div className="row g-0 d-flex align-items-center">
              <Slide left>
                <div className="col-lg-4 d-none d-lg-flex">
                  <img
                    src="https://miro.medium.com/max/800/1*7zKy7ApAilsVT0Mzeiasyw.jpeg"
                    alt="Trendy Pants and Shoes"
                    className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                  />
                </div>
              </Slide>
              <div className="col-lg-8">
                <div className="card-body py-5 px-md-5">
                  <Slide top>
                    <h3 className="mb-5">Upload your Modal here..</h3>
                  </Slide>

                  <Formik initialValues={modalForm} onSubmit={modalSubmit}>
                    {({ values, handleSubmit, handleChange }) => (
                      <Slide right>
                        <form onSubmit={handleSubmit}>
                          {/* input */}
                          <div className="form-label mb-4">
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              value={values.title}
                              onChange={handleChange}
                              placeholder="Title"
                              required
                            />
                          </div>
                          <div className="form-label mb-4">
                            <textarea
                              className="form-control"
                              rows="4"
                              id="description"
                              value={values.description}
                              onChange={handleChange}
                              placeholder="Description"
                              required
                            ></textarea>
                          </div>
                          <div className="form-label mb-4">
                            <input
                              className="form-control"
                              disabled
                              id="userID"
                              value={values.userID}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="form-label mb-4">
                            <input
                              type="text"
                              className="form-control"
                              id="uplodedby"
                              value={values.uplodedby}
                              onChange={handleChange}
                              placeholder="Uploded By"
                              required
                            />
                          </div>

                          {/*  category */}
                          <div className="mb-4">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              id="category"
                              value={values.category}
                              onChange={handleChange}
                              required
                            >
                              <option selected>Choose Modal Category</option>
                              <option value="Product">Product</option>
                              <option value="Architecture">Architecture</option>
                              <option value="Art">Art</option>
                              <option value="Design">Design</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="row mb-3">
                            <div className="col-md-6">
                              <div className="mb-4 ">
                                <label
                                  className="form-label d-flex justify-content-start mb-0"
                                  for="customFile"
                                >
                                  <p
                                    className="m-0 "
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Upload Thumbnail
                                  </p>
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={uploadImage}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-4 ">
                                <label
                                  className="form-label d-flex justify-content-start mb-0"
                                  for="customFile"
                                >
                                  <p
                                    className="m-0 d-flex"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Upload File (must be in glTF format)
                                    <div
                                    className="mx-2"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Wrap the glTF file in zip and then upload."
                                      style={{
                                        alignItems: "center",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        border: "1px solid gray",
                                        width: "25px",
                                        height: "25px",
                                        backgroundColor: "#EEEEEE",
                                      }}
                                    >
                                      {/* <i className=" fa-duotone fa-question" /> */}

?                                    </div>
                                  </p>
                                </label>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={uploadFile}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary btn-block mb-4"
                          >
                            {isloading ? (
                              <CircularProgress
                                size="1.2rem"
                                style={{ color: "white" }}
                              />
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </form>
                      </Slide>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default AddModal;
