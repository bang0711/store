import React, { useState } from "react";

type Props = {};

function UpdateForm({}: Props) {
  const [data, setData] = useState({
    companyName: "",
  });
  return <div>UpdateForm</div>;
}

export default UpdateForm;
