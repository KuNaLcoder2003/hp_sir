"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
node_cron_1.default.schedule("0 0 * * 0", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastWeek = yield prisma.week.findFirst({
            where: { completed: false },
            orderBy: { week_no: "asc" },
        });
        if (lastWeek) {
            yield prisma.week.update({
                where: { id: lastWeek.id },
                data: { completed: true },
            });
            console.log(`✅ Marked week ${lastWeek.week_no} as completed`);
        }
    }
    catch (err) {
        console.error(" Error in cron job:", err);
    }
}));
