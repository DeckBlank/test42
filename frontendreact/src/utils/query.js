export const query = async (query, method, json) => {

  let options = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...json })
  };
  console.log(process.env);
  console.log(options,`${process.env.REACT_APP_URL_BACKEND}${query}`);
  switch (method.toLowerCase()) {
    case "get":
      delete options.headers;
      delete options.body;
      break;
    case "delete":
      delete options.headers;
      delete options.body;
      break;
  }
  try {
    let resp = await fetch(`${process.env.REACT_APP_URL_BACKEND}${query}`, options);
    return resp.json();
  } catch (error) {
    console.log(error);
    return false;
  }
};
