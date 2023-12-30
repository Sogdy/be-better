import { connectToDB } from "@utils/database";
import Goal from "@models/goal";

export const GET = async (req, { params }) => {
    // console.log({req})
    try {
        await connectToDB();

        const goals = await Goal.find({creator: params.id}).populate('creator');
        // const goals = await Goal.find({ creator: req.creator}).populate('creator');

        return new Response(JSON.stringify(goals), { status: 200 });
    } catch (error) {
        return new Response('Failed to get all goals', { status: 500 });
    }
}