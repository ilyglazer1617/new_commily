import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
const Comments = () => {
  let token = localStorage.getItem("x-auth-token");
  let id;
  if (token) {
    const { _id } = jwt(token);
    id = _id;
  }

  useEffect(() => {
    getallComments();
    // getUser();
  }, []);
  const [data, setData] = useState({});
  const [alldata, setAllData] = useState([]);

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

      <ul>
        {alldata.map((val) => (
          <ol>
            <li>
              {" "}
              {val.body} - {val.name}
            </li>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default Comments;

// import React, { useState } from "react";
// import axios from "axios";
// import jwt from "jwt-decode";
// const Comments = () => {
//   let token = localStorage.getItem("token");
//   const { _id } = jwt(token)

//   const [data, setData] = useState({});
//   const handelSubmit = async (e) => {
//     e.preventDefault();
//     console.log(data);
//     await axios.post("http://localhost:3050/api/comments", data);
//   };

//   return (
//     <div>
//       <form
//         onSubmit={(e) => {
//           handelSubmit(e);
//         }}
//       >
//         <div class="mb-3">
//           <label for="exampleInputEmail1" class="form-label">
//             your comment{" "}
//           </label>
//           <input
//             type="text"
//             class="form-control"
//             id="exampleInputEmail1"
//             placeholder="your Comment"
//             aria-describedby="emailHelp"
//             onChange={(ev) => setData({ ...data, body: ev.target.value })}
//           />
//         </div>
//         <button type="submit" class="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Comments;
