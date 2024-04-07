import { userStore } from "../stores/userStore";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5555/";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
