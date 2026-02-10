import app from "./app";
import { envConfig } from "./config/env";

// Start the server
app.listen(envConfig.PORT, () => {
    console.log(`Server is running on http://localhost:${envConfig.PORT}`);
});