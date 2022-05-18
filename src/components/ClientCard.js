import React from "react";
import cookie from "cookie";
const cookies = cookie.parse(document.cookie)

const url = "https://app-final-checkpoint.herokuapp.com/clientCode/";
export default function ClientCard(props) {
  const { client, picture, assignMentor, setAssignMentor } = props;
  const handleClick = (e, id) => {
    console.log(id);
    fetch(`${url+id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
      setAssignMentor(true)
      window.reload()
  };
  return (
    <div key={client.clients_id} className="client-card">
      {/* {console.log(props, 'this is the single client')} */}
      <img src={`${picture}`}></img>
      <h3>{client.full_name}</h3>
      <p>{client.bio}</p>
      <div>
        {!client.user_name && (
          <button
            onClick={(e) => handleClick(e, client.clients_id)}
            className="mentor-button"
          >
            Become my Mentor
          </button>
        )}
        {client.user_name && (
          <p className="mentor">Mentor: {client.user_name}</p>
        )}
      </div>
    </div>
  );
}
