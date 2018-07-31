import CliqueComponent from "./CliqueComponent";
import React from "react";


const Clique = ({match}) => {
  return <CliqueComponent id={ match.params.id }/>
}

export default Clique
