export const query = async (query, method, json) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let options = {
    method,
    headers: myHeaders,
    body: JSON.stringify(json),
    //credentials: 'same-origin',
    redirect: 'follow'
  };
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
    return resp;
  } catch (error) {
    console.log(error);
    return false;
  }
};
