const URL = window.location.href.includes("localhost")
  ? "http://localhost:4044/api"
  : "https://jour-myhabittracker.vercel.app/api";

export default URL;
