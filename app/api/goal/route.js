import { connectToDB } from "@utils/database";
import Goal from "@models/goal";

export const GET = async (req) => {
    try {
        await connectToDB();
        const currentUserId = req.headers['x-customer-id']
        console.log({req: req.headers, currentUserId})

        // const goals = await Goal.find({ isPrivate: false }).populate('creator');
        const goals = await Goal.find({
            $or: [
              { creator: currentUserId },
              { isPrivate: false },
            ],
          }).populate('creator');

        return new Response(JSON.stringify(goals), { status: 200 });
    } catch (error) {
        return new Response('Failed to get all goals', { status: 500 });
    }
}