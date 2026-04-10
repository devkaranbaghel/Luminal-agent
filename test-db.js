const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Checking Database Connection...");
    try {
        const users = await prisma.user.findMany({ select: { email: true } });
        console.log(`✅ Success! Found ${users.length} users in the database.`);
        console.log("📧 Registered emails:", users.map(u => u.email).join(', '));
    } catch (e) {
        console.error("❌ Database Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();
