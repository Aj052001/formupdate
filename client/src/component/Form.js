import React, { useState, useEffect } from "react";
import "./Form.css";
import axios from "axios";
import { TiArrowSortedDown } from 'react-icons/ti';
import { BsSearch } from 'react-icons/bs';
function RegistrationForm() {
  const URL = "http://localhost:5000/api/v1.0/users/";
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [contact, setContact] = useState(null);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [query,setQuery]=useState("");


  useEffect(() => {
    getData();
  }, [URL]);

  const getData = async () => {
    const response = await axios.get(URL);
    setData(response.data);
  };

    //sorting
    const sorting = (col) => {
      if (order === "ASC") {
        const sorted = [...data].sort((a, b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted);
        setOrder("DSC");
      }
      if (order === "DSC") {
        const sorted = [...data].sort((a, b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted);
        setOrder("ASC");
      }
    };
  
    
  
    const removeData = (id) => {
      axios.delete(`${URL}/${id}`).then(() => {
        const del = data.filter((item) => id !== item._id);
        alert(`The data has been delete`);
        setData(del);
      });
    };


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setFirstName(value);
    }
    if (id === "lastName") {
      setLastName(value);
    }
    if (id === "contact") {
      setContact(value);
    }
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/v1.0/users/", {
        firstName: firstName,
        lastName: lastName,
        contact: contact,
      })
      .then((res) => {
        console.log(res);
       getData();
      });
     
  };


  const renderBody = () => {
    return (
      data &&
      data.filter(name=>name.firstName.toLowerCase().includes(query)).map(({ _id, firstName, lastName, contact,Id}) => {
        return (
          <tr key={_id}>
            <td>{Id}</td>
            <td>
              {`${firstName} `}
              {lastName}
            </td>
            <td>{contact}</td>
            <td className="operation">
              <button className="button" onClick={() => removeData(_id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      })

    );
  };
  

  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="username">
              <span className="form__label">Person's Name </span>
              <div className="Item">
                <input
                  className="form__input"
                  type="text"
                  value={firstName || ""}
                  onChange={(e) => handleInputChange(e)}
                  id="firstName"
                  placeholder="First"
                  required={true}
                />
                <input
                  type="text"
                  name=""
                  id="lastName"
                  value={lastName || ""}
                  className="form__input"
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Last"
                  required={true}
                />
              </div>
            </div>

            <div className="contactNumber">
              <span className="form__label">Contact Number </span>
              <input
                type="text"
                id="contact"
                className="form__input"
                value={contact || ""}
                onChange={(e) => handleInputChange(e)}
                required={true}
                // placeholder="Email"
              />
            </div>
          </div>
          <div className="footer">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>

      <div className="Search">
      <input type="text" onChange={(e)=>setQuery(e.target.value)} />
      <button><BsSearch/></button>
      {/* <input type="submit" name="" id="" value="search"/> */}
    </div>
      <table id="employee">
        <thead>
          <tr>
            <th>SN.</th>
            <th onClick={() => sorting("firstName")} >Name <TiArrowSortedDown/></th>
            <th>Contact</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </>
  );
}

export default RegistrationForm;
