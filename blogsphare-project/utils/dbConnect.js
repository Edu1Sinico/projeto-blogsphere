import mongoose from "mongoose";

const dataBaseUrl = process.env.DATABASE_URL;

if (!dataBaseUrl) {
    throw new Error("Env não preenchido");
}

const connectMongo = async () => {
    if (mongoose.connection.readyState > 0) {
        return; // Já está conectado
    } else {
        try {
            await mongoose.connect(dataBaseUrl);
            console.log("MongoDB Conectado");
        } catch (err) {
            console.error("Erro ao conectar ao MongoDB", err);
        }
    }
}

export default connectMongo;
