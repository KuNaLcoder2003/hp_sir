-- AlterTable
CREATE SEQUENCE week_week_no_seq;
ALTER TABLE "Week" ALTER COLUMN "week_no" SET DEFAULT nextval('week_week_no_seq');
ALTER SEQUENCE week_week_no_seq OWNED BY "Week"."week_no";
