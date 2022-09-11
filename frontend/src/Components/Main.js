import React, { useState } from "react";
import "../App.css";

import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

function Main({ postImage, posts }) {
  const [fileUrl, updateFileUrl] = useState(``);
  const [loading, setloading] = useState(false);

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      setloading(true);
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setloading(false);
      updateFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
      setloading(false);
    }
  }

  return (
    <div className="MainDiv">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <form
          style={{ widht: "100%" }}
          onSubmit={(event) => {
            event.preventDefault();
            postImage(fileUrl);
          }}
        >
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .bmp, .gif"
            onChange={onChange}
          />

          <button type="submit" disabled={loading} className="button">
            {loading ? "loading.." : "Upload"}
          </button>
        </form>
      </div>
      <div
        style={{ height: "fit-content", maxHeight: "80vh", overflowY: "auto" }}
      >
        {posts ? (
          posts.map((i) => {
            return (
              <div style={{ margin: "10px", backgroundColor: "white" }}>
                <h4>{i.author}</h4>
                <img src={i.image}></img>
              </div>
            );
          })
        ) : (
          <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!c1024wm0"></img>
        )}
      </div>
    </div>
  );
}

export default Main;
