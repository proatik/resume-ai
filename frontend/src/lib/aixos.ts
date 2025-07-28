import axios from "axios";

import { getBaseUrl } from "@/lib/utils";

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: { "Content-Type": "application/json" },
});

export default api;
