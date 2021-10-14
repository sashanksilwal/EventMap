import axios from "axios";

function Home() {
  axios
    .get(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=991b8e158ade4660ae884d0e07aa294c"
    )
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  return <div></div>;
}

export default Home;
