import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-reveal";
import { CircularProgress } from "@mui/material";
import app_config from "../config";

const ModalList = () => {
  const [threeDArray, setthreeDArray] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const url = app_config.api_url;

  const getDataFromBackend = async () => {
    setIsloading(true);
    const response = await fetch(url + "/modal/getall");
    setIsloading(false);
    const data = await response.json();
    console.log(data);
    setthreeDArray(data);
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);

  const displayModels = () => {
    return threeDArray.map((model) => (
      <>
        <Slide bottom>
          <div className="card card-list mb-5 p-3">
            <div className="row ">
              <div className="col-md-3  mb-md-0 ms-auto">
                <div
                  className="bg-image hover-overlay ripple shadow-1-strong rounded-4 mb-4 ripple-surface-light"
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={url + "/images/" + model.thumbnail}
                    className="w-100"
                    alt=""
                    aria-controls="#picker-editor"
                    draggable="false"
                  />
                </div>
              </div>
              <div className="col-md-9 col-xl-7 mb-4 mb-md-0 me-auto">
                <h5 className="fw-bold">{model.title}</h5>
                <div className="mb-2 text-danger small">
                  <i
                    className="fas fa-building me-2"
                    aria-controls="#picker-editor"
                  />
                  <span>{model.category}</span>
                  <br />
                  <span style={{ color: "gray" }}>
                    Created : {model.created}
                  </span>
                </div>
                <div>
                  <p className="text-muted">{model.description}</p>
                </div>
                <Link
                  to={"/viewer/" + model._id}
                  className="btn  btn-primary model w-100"
                >
                  View Model
                </Link>
              </div>
            </div>
          </div>
        </Slide>
      </>
    ));
  };

  return (
    <div>
      <div id="preview" className="preview">
        <div style={{ display: "none" }} />
        <div>
          <div
            data-draggable="true"
            className=""
            style={{ position: "relative" }}
            draggable="false"
          >
            <section
              draggable="false"
              className="container pt-5"
              data-v-271253ee=""
            >
              <section className="mb-10">
                <h2 className="fw-bold mb-5 text-center">Modals List</h2>
                {isloading ? (
                  <div className="d-flex justify-content-center">
                    <CircularProgress size="10rem" />
                  </div>
                ) : (
                  displayModels()
                )}
              </section>
            </section>
            {/**/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalList;
