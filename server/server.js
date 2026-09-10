import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const port = process.env.PORT || 5000;

try {
	await connectDB();
} catch (error) {
	console.error("Database startup failed:", error.message);
}

app.listen(port, () => {
	console.log(`KnowledgeContinuity API listening on port ${port}`);
});
