import dotenv from "dotenv";
dotenv.config({ path: "./Config/.env" })
import cloudinary from "cloudinary"


// Configuration 
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
});
export default cloudinary.v2