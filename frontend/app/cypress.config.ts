import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

      return config
    },
  env: {
    test_user_email: process.env.REACT_APP_TEST_EMAIL,
    test_user_password: process.env.REACT_APP_TEST_PASSWORD,
  },
}
})

