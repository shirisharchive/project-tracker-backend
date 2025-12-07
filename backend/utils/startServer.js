
const connectDB = require("../src/model/connectDB");

const StartServer = async (app) => {
    try {
        const PORT = process.env.PORT || 3000;

        // Connect to MongoDB first
        await connectDB();


        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Error starting server:", error);
        process.exit(1);
    }
};

module.exports = StartServer;
