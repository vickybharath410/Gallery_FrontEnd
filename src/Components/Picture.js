import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Picture.css";
function Picture() {
  const [post, setPost] = useState([]);
  const [hoverText, setHoverText] = useState(null);
  const [findData, SetFindData] = useState("");
  const [check, setCheck] = useState([]);
  const [flag, setFlag] = useState(false);
  const [addFlag,setAddFlag]=useState(false);
  const [url,setUrl]=useState('');
  const [label,setlabel]=useState('');

  useEffect(() => {
    axios
      .get("https://gallery-back-end.vercel.app/")
      .then((res) => setPost(res.data.data))
      .catch((e) => console.log(e));
  }, [flag]);

  function overCheckIn(index) {
    setHoverText(index);
  }
  function overCheckOut() {
    setHoverText(null);
  }
  function handleSubmit() {
    const filteredData = post.filter((elements) => elements.label === findData);
    setCheck(filteredData);
    SetFindData("")
  }
  function confirm(id) {
    console.log("clicked");
    var checkPassword = prompt("Are you Sure ?");
    if (checkPassword === "delete") {
      deletePost(id);
    }
  }

  function deletePost(id) {
    axios
      .delete(`https://gallery-back-end.vercel.app/${id}`)
      .then((res) => {
        alert("Post deleted");
        setFlag(!flag);
      })
      .catch((e) => console.log(e));
  }
  function addNewPost(){
    axios.post("https://gallery-back-end.vercel.app/add",{label:label,url:url})
    .then(res=>{
      alert("Post added")
      setAddFlag(false)
      setUrl("");
      setlabel("");
      setFlag(!flag);
    })
    .catch(e=>console.log(e))
  }
  return (
    <div className="container">
      {/* {console.log(post)} */}
      <header className="header">
        <div className="input-group mb-3" style={{ width: "50%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter text to search "
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={findData}
            onChange={(e) => SetFindData(e.target.value)}
            style={{ textTransform: "lowercase" }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => handleSubmit()}
            >
              search
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-info" onClick={()=>setAddFlag(true)}>
          Add Photo
        </button>
      </header>
      <marquee > Password is delete</marquee>
      {check.length !== 0 ? (
        <>
        <button className= "btn btn-info" onClick={()=>setCheck([])}>Back</button>
          <div className="pic-box">
            {check.map((each, index) => {
              // console.log(each.url);
              return (
                <div
                  className="view"
                  style={{ backgroundImage: "url(" + each.url + ")" }}
                  onMouseOver={() => overCheckIn(index)}
                  onMouseOut={() => overCheckOut()}
                >
                  {hoverText === index ? (
                    <>
                      <button
                        type="button"
                        class="btn btn-warning"
                        style={{ alignSelf: "flex-end" }}
                        onClick={() => confirm(each._id)}
                      >
                        delete
                      </button>
                      ,<span id="hover-label">{each.label}</span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="pic-box">
            {post.map((each, index) => {
              // console.log(each.url);
              return (
                <div
                  className="view"
                  style={{ backgroundImage: "url(" + each.url + ")" }}
                  onMouseOver={() => overCheckIn(index)}
                  onMouseOut={() => overCheckOut()}
                >
                  {hoverText === index ? (
                    <>
                      <button
                        type="button"
                        class="btn btn-warning"
                        style={{ alignSelf: "flex-end" }}
                        onClick={() => confirm(each._id)}
                      >
                        delete
                      </button>
                      ,<span id="hover-label">{each.label}</span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      {
      addFlag && <div className="addpost">
      <h2>Add Post</h2>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Label"
          onChange={(e)=>setlabel(e.target.value)}
          value={label}
          style={{ textTransform: "lowercase" }}
        />
      </div>
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Image Url"
          onChange={(e)=>setUrl(e.target.value)}
          value={url}
        />
      </div>
      <div id="buttongrp">
      <button
        type="button"
        class="btn btn-warning"
        style={{ alignSelf: "flex-end" }}
        onClick={() => setAddFlag(false)}
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-warning"
        style={{ alignSelf: "flex-end" }}
        onClick={() => addNewPost()}
      >
        Submit
      </button>
      </div>
    </div>
       }
    </div>
  );
}

export default Picture;
