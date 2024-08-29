import connect from "@/lib/db";
import User from "@/models/user.model";

export const getUserByEmail = async (email: string) => {
    try {
         await connect();
         const user = await User.findOne({
              email
         });
         return JSON.parse(JSON.stringify(user));
    } catch (error) {
         return null;
    }
}

export const getUserById = async (id: string) => {
     try {
           await connect();
           const user = await User.findById(id);
           return JSON.parse(JSON.stringify(user));
     } catch (error) {
           return null;
     }
}

