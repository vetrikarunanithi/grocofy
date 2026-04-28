import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vetrikarunanithi:Vetri%232004@cluster0.bhsapbz.mongodb.net/grocofy')
        .then(() => console.log("DB Connected"));
}
