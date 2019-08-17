CREATE TABLE "tasks" (
	"id" serial primary key,
    "description" varchar(120) not null,
    "due_date" date,
);


INSERT INTO "tasks"("description", "due_date") 
    VALUES('Take clothes to the cleaners')


