import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Environment, OrbitControls } from "@react-three/drei";
import { Link, useParams } from "react-router-dom";
import app_config from "../config";
import { CircularProgress } from "@mui/material";

const ViewModel = () => {
  const { id } = useParams();
  const url = app_config.api_url;
  const [modelData, setModelData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getModelById = () => {
    setLoading(true);
    fetch(url + "/modal/getbyid/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setModelData(data);
        setLoading(false);
        console.log(url + "/extracted/" + data.data + "/scene.gltf");
      });
  };

  useEffect(() => {
    getModelById();
  }, []);

  const displayModelData = () => {
    console.log(loading);
    if (!loading && modelData) {
      return (
        <div
          style={{
            background:
              "linear-gradient(to top, #ffffff00,#64a5ad, #ffffff00,#64a5ad)",
          }}
        >
          <div className="container">
            <div className="row view-top">
              {/* <div className="col-md-12"> */}
              <div className="card bg p-0">
                <div className="card-body view-card-body">
                  {showModel(modelData.data)}
                </div>
                {/* </div> */}

                <div style={{ padding: "2rem", marginTop: "-3%" }}>
                  <h2
                    className="card-title"
                    style={{
                      fontWeight: "bold",
                      fontSize: "2rem",
                      color: "#00bcd4",
                    }}
                  >
                    {modelData.title}
                  </h2>
                  <h5>3D Model</h5>
                  <p className="card-text d-flex">
                    <b>Created At:</b>
                    <div style={{ color: "#009688" }}>{modelData.created}</div>
                  </p>
                  <div className="d-flex">
                  <h5
                    style={{
                      fontWeight: "bold",
                    }}
                    className="card-text"
                  >
                    Uploaded BY :
                  </h5>
                    <div style={{ color: "#009688" }}>
                      {modelData.uplodedby}
                    </div>
                  </div>
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  <p className="card-text d-flex">
                    <b>Description:</b>{" "}
                    <div style={{ color: "#009688" }}>
                      {modelData.description}
                    </div>
                  </p>
                  <hr />
                </div>
                </div>
                <center>
                  <Link
                    style={{ background: "#64a5ad", width: "90%" }}
                    className="btn "
                    to="/listmodal"
                  >
                    Go Back
                  </Link>
                </center>
                <hr />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const Model = ({ path }) => {
    const gltf = useLoader(GLTFLoader, path);
    return (
      <>
        <primitive object={gltf.scene} scale={0.4} />
      </>
    );
  };

  const showModel = (modelname) => {
    console.log(url + "/extracted/" + modelname + "/scene.gltf");
    return (
      <Canvas>
        <Suspense fallback={null}>
          <Model path={url + "/extracted/" + modelname + "/scene.gltf"} />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    );
  };

  return (
    <div>
      {loading ? (
        <div>
          <CircularProgress size="15rem" />
        </div>
      ) : (
        displayModelData()
      )}
    </div>
  );
};

export default ViewModel;
