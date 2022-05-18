import React, { useState, useEffect } from "react";
import cookie from "cookie";
import ClientCard from "./ClientCard";

const url =
  "https://app-final-checkpoint.herokuapp.com/client-user-relation-by-user";

const cookies = cookie.parse(document.cookie);

export default function Profile() {
  const [clientsData, setClientsData] = useState([]);
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const list = data.map(async (person) => {
          let response = await fetch("https://randomuser.me/api/");
          let image = await response.json();
          console.log(image);
          person.picture = image.results[0].picture.medium;
          return person;
        });
        // console.log(data)
        Promise.all(list).then((response) => {
          console.log(response, "hello");
          setClientsData(response);
        });
      });
  }, []);

  if (clientsData.length === 0) {
    return <p>currently have no clients to list</p>;
  }

  return (
    <div className="clients_list">
      <h3>Hello {clientsData[0].user_name}</h3>
      {clientsData.map((client) => {
        return <ClientCard key={client.clients_id} picture={client.picture} client={client} key={client.clients_id} />;
      })}
    </div>
  );
}
