import cron from "node-cron"
import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient()
cron.schedule("0 0 * * 0", async () => {
    try {
        const lastWeek = await prisma.week.findFirst({
            where: { completed: false },
            orderBy: { week_no: "asc" },
        });

        if (lastWeek) {
            await prisma.week.update({
                where: { id: lastWeek.id },
                data: { completed: true },
            });
            console.log(`✅ Marked week ${lastWeek.week_no} as completed`);
        }
    } catch (err) {
        console.error(" Error in cron job:", err);
    }
});