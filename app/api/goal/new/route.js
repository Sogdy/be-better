import { connectToDB } from "@utils/database";
import Goal from "@models/goal";

export const POST = async (req) => {
    const { userId, title, description, tag, endDate, status, isPrivate } = await req.json();

    try {
        await connectToDB();
        const newGoal = new Goal({
            title,
            description,
            tag,
            endDate,
            status,
            isPrivate,
            creator: userId,
        })

        await newGoal.save();

        return new Response(JSON.stringify(newGoal), { status: 201 });
    } catch (error) {
        return new Response('Failed to create the new goal!', { status: 500 });
    }
}