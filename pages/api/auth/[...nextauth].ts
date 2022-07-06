import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import clientPromise from "lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        //Get all the users
        const client = await clientPromise;
        const db = client.db("woDatabase");

        const users = await db.collection("users");
        //Find user with the email
        const result = await users.findOne({
          email: credentials?.email,
        });

        if (!result) {
          throw new Error("No user found with the email");
        }
        const checkPassword = await compare(
          credentials?.password || "",
          result.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          throw new Error("Passwords do not match match");
        }
        //Else send success response
        return { email: result.email };
      },
    }),
  ],
});
