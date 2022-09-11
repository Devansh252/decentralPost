import React, { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import Docial from "./artifacts/contracts/Docial.sol/Docial.json";
import Main from "./Components/Main";

function App() {
  const [account, setaccount] = useState("0x");
  const [docial, setDocial] = useState(null);
  const [posts, setposts] = useState([]);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  useEffect(() => {
    getImg();
  }, [docial]);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setaccount(accounts[0]);
    const docial = new web3.eth.Contract(
      Docial.abi,
      "0x5E09D06bD038439B4DD3C333742bAAbED971F555"
    );
    setDocial(docial);
  }

  async function getImg() {
    const images = await docial.methods.getImages().call();
    setposts(images);
    console.log(posts);
  }

  async function postImage(url) {
    console.log(docial, account);
    const c = await docial.methods.postImage(url).send({ from: account });
    console.log(c);
  }

  return (
    <div className="App">
      <nav className="NavBar">
        <h1 style={{ fontFamily: "monospace", fontSize: "40px" }}>Docial</h1>
        <div
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          <button className="button" onClick={getImg}>
            View Posts!
          </button>
          <p style={{ marginLeft: "10px" }}>{account}</p>
        </div>
      </nav>
      <div
        style={{
          justifyContent: "center",
          marginTop: "10vh",
          display: "flex",
          width: "100%",
        }}
      >
        <Main postImage={postImage} posts={posts} />
      </div>
    </div>
  );
}

export default App;
