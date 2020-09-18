import axios from "axios";

export default axios.create({
    headers: {
        Authorization: localStorage.getItem("token"),
    },
    baseURL: "http://localhost:5000/api/",
})