import CliqueComponent from "./CliqueComponent";
import React from "react";


const Clique = ({match}) => {
  return <CliqueComponent clique_name={ match.params.id }/>
}

export default Clique
