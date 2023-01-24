import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtdecode from "jwt-decode";
import "../comment.css";
const Comments = () => {
  let token = localStorage.getItem("x-auth-token");
  let id;
  if (token) {
    const { _id } = jwtdecode(token);
    id = _id;
  }

  useEffect(() => {
    getallComments();
    // getUser();
  }, []);
  const [data, setData] = useState({});
  const [alldata, setAllData] = useState([]);
  const [number, setNumber] = useState();

  useEffect(() => {
    if (token) getUser();
  }, [token]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    await axios.post("http://localhost:3050/api/comments", data, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    getallComments();
  };
  async function getUser() {
    try {
      const results = await axios.get(`http://localhost:3050/api/users/${id}`);
      setData({ name: results.data.name });
    } catch (error) {
      return error;
    }
  }
  async function getallComments() {
    const results = await axios.get(`http://localhost:3050/api/comments`, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    setAllData(results.data);
  }
  async function deleteCommentById() {
    try {
      const resulte = await axios.delete(
        `http://localhost:3050/api/comments/${id}`
      );
    } catch (error) {
      return error;
    }
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          // getUser();
          handelSubmit(e);
          getallComments();
        }}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            your comment{" "}
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            placeholder="your Comment"
            aria-describedby="emailHelp"
            onChange={(ev) => setData({ ...data, body: ev.target.value })}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <table className="cinereousTable">
        <thead>
          <tr>
            <th></th>
            <th>user name</th>
            <th>commment </th>
          </tr>
        </thead>

        <tbody>
          {alldata.map((val, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{val.name}</td>
              <td>{val.body}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;
