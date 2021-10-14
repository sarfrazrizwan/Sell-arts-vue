const APP_URL =
  process.env.NODE_ENV === "production"
    ? "https://admin.llovas.com/api"
    : "http://llovas.test/api"

export { APP_URL }
