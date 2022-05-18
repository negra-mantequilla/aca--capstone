import React, { useState, useEffect } from "react";
import ClientCard from "./ClientCard";
const URL = "https://app-final-checkpoint.herokuapp.com/client-user-relation";

export default function Clients(props) {
  const [clientsData, setClientsData] = useState([]);
  const [assignMentor, setAssignMentor]  = useState(false)
  useEffect(() => {
    const getClients = async () => {
      const result = await fetch(URL);
      const data = await result.json();
      // console.log(data)
      const list = data.map(async (person) => {
        let response  = await fetch("https://randomuser.me/api/")
        let image = await response.json()
        console.log(image)
        person.picture = image.results[0].picture.medium
        return person
      });
      // console.log(data)
      Promise.all(list).then((response) => {
        console.log(response)
        setClientsData(response)
      })
    };
    getClients();
  }, [assignMentor]);
  if (clientsData.length === 0) return <div>Loading...</div>;

  return (
    <div className="clients_list">
      {console.log(clientsData, "clients")}
      {clientsData.map((client) => (
        <ClientCard
          client={client}
          picture={client.picture}
          key={client.clients_id}
          assignMentor={assignMentor}
          setAssignMentor={setAssignMentor}
        />
      ))}
    </div>
  );
}
