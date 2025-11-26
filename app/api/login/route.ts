
// import { NextResponse } from "next/server";
// import User from "@/models/User";
// import { connectDB } from "@/lib/mongodb";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";


// export async function POST(req: Request) {
//   await connectDB();

//   const { email, password } = await req.json();
//   const user = await User.findOne({ email });

//   if (!user) {
//     return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
//   }

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
//   }

//   const token = jwt.sign(
//     { id: user._id, email: user.email },
//     process.env.JWT_SECRET as string,
//     { expiresIn: "7d" }
//   );

//   return NextResponse.json({ token });
// }
