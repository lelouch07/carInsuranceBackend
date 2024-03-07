import { run } from "./mongoDBConfig";
import dbName from "./mongoDBConfig";
export async function getUserByUserId(userId:string) {
    const client = await run();
    try {
        // Connect to MongoDB
        // Get a reference to the database
        const database = client.db(dbName);

        // Get the users collection
        const collection = database.collection('users');

        const user = await collection.findOne({ UserID: userId });
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error;
    }
}


// Create a new user in MongoDB
export async function createUser(userId:string,email:string,age:number,PasswordHash:string) {
    const client = await run();
    try {
        const database = client.db(dbName);
        const collection = database.collection('users');

        // Insert the user document into the users collection
        const result = await collection.insertOne({UserID:userId,Email:email,Age:age,Password:PasswordHash});
        console.log('User created:', result.insertedId);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}


// Delete a user from MongoDB by userId
async function deleteUserByUserId(userId:string) {
    const client = await run();
    try {
        const database = client.db(dbName);
        const collection = database.collection('users');

        // Delete the user document with the specified userId
        const result = await collection.deleteOne({ userId: userId });
        console.log(`Deleted ${result.deletedCount} user(s)`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }

}
