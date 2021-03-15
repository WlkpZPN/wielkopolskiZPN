-- CreateTable
CREATE TABLE "annotations" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "user_id" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "status_id" INTEGER,
    "number_of_seasons" BIGINT,
    "declaration_on_the_subject_of_participation_in_the_competition" BOOLEAN,
    "declaration_on_the_use_of_personal_data_documentation" BOOLEAN,
    "number_of_youth_groups" BIGINT,
    "share_of_youth_groups" BIGINT,
    "declaration_on_medical_care_for_the_players" BOOLEAN,
    "declaration_of_no_obligations_towards_employees" BOOLEAN,
    "declaration_of_no_obligations_towards_PZPN_and_WZPN" BOOLEAN,
    "declaration_of_no_obligations_towards_football_clubs" BOOLEAN,
    "declaration_of_having_football_staff" BOOLEAN,
    "declaration_of_having_security_services" BOOLEAN,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications_attachments" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "attachment_id" INTEGER,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications_leagues" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "league_id" INTEGER,
    "created_at" BIGINT,
    "updated_at" BIGINT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications_youth_groups" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "youth_group_id" INTEGER,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachment_categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "description" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" SERIAL NOT NULL,
    "attachment_category_id" INTEGER,
    "name" VARCHAR(60),
    "description" TEXT,
    "filepath" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clubs" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "address" VARCHAR(60),
    "post_code" VARCHAR(60),
    "email" VARCHAR(60),
    "phone" VARCHAR(60),
    "email_2" VARCHAR(60),
    "webpage" TEXT,
    "facebook_profile" TEXT,
    "agent_name" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "leauge" VARCHAR(50),
    "stadium" VARCHAR(300),
    "email_3" VARCHAR(100),
    "phone_2" VARCHAR(20),
    "phone_3" VARCHAR(20),
    "landline_phone" VARCHAR(20),
    "agent_phone" VARCHAR(20),
    "agent_position" VARCHAR(100),
    "chairman" VARCHAR(60),
    "chairman_phone" VARCHAR(20),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequently_asked_questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT,
    "answer" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histories" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "user_id" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "status_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leagues" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "description" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "description" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sport_facilities" (
    "id" SERIAL NOT NULL,
    "application_id" INTEGER,
    "address" VARCHAR(60),
    "post_code" VARCHAR(60),
    "city" VARCHAR(60),
    "I01_1" BOOLEAN,
    "I01_2" BOOLEAN,
    "I02_1" BOOLEAN,
    "I02_2" BOOLEAN,
    "I02_3" BOOLEAN,
    "I02_4" BOOLEAN,
    "I03_total_capacity" BIGINT,
    "I03_1" BOOLEAN,
    "I03_2" BOOLEAN,
    "I04_1" BOOLEAN,
    "I04_2" BOOLEAN,
    "I04_3" BOOLEAN,
    "I04_4" BOOLEAN,
    "I04_5" BOOLEAN,
    "I05_number_of_seats_for_guests" BIGINT,
    "I05_percentage_of_seats_for_guests" BIGINT,
    "I05_1" BOOLEAN,
    "I05_2" BOOLEAN,
    "I05_3" BOOLEAN,
    "I06_type" VARCHAR(60),
    "I06_condition" VARCHAR(60),
    "I06_dimensions" VARCHAR(60),
    "I06_1" BOOLEAN,
    "I06_2" BOOLEAN,
    "I06_3" BOOLEAN,
    "I06_4" BOOLEAN,
    "I06_5" BOOLEAN,
    "I07_1" BOOLEAN,
    "I07_2" BOOLEAN,
    "I07_3" BOOLEAN,
    "I07_4" BOOLEAN,
    "I08_number_of_seats_on_the_bench" BIGINT,
    "I08_1" BOOLEAN,
    "I08_2" BOOLEAN,
    "I08_3" BOOLEAN,
    "I08_4" BOOLEAN,
    "I09_1" BOOLEAN,
    "I09_2" BOOLEAN,
    "I10_1" BOOLEAN,
    "I11_number_of_seats" BIGINT,
    "I11_number_of_hangers_or_lockers" BIGINT,
    "I11_number_of_showers" BIGINT,
    "I11_number_of_toilets" BIGINT,
    "I11_1" BOOLEAN,
    "I11_2" BOOLEAN,
    "I12_number_of_seats" BIGINT,
    "I12_number_of_hangers_or_lockers" BIGINT,
    "I12_number_of_showers" BIGINT,
    "I12_number_of_toilets" BIGINT,
    "I12_1" BOOLEAN,
    "I12_2" BOOLEAN,
    "I13_1" BOOLEAN,
    "I13_2" BOOLEAN,
    "I13_3" BOOLEAN,
    "I13_4" BOOLEAN,
    "I13_5" BOOLEAN,
    "I14_1" BOOLEAN,
    "I14_2" BOOLEAN,
    "I14_3" BOOLEAN,
    "I15_number_of_toilets_for_women" BIGINT,
    "I15_number_of_toilets_for_men" BIGINT,
    "I15_standard" VARCHAR(60),
    "I15_1" BOOLEAN,
    "I16_1" BOOLEAN,
    "I17_1" BOOLEAN,
    "I18_1" BOOLEAN,
    "I19_1" BOOLEAN,
    "I19_2" BOOLEAN,
    "I19_3" BOOLEAN,
    "I20_1" BOOLEAN,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statuses" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "description" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "club_id" INTEGER,
    "name" VARCHAR(60),
    "email" VARCHAR(60),
    "password" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "youth_groups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60),
    "description" TEXT,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "annotations" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annotations" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications_attachments" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications_attachments" ADD FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications_leagues" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications_leagues" ADD FOREIGN KEY ("league_id") REFERENCES "leagues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications_youth_groups" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications_youth_groups" ADD FOREIGN KEY ("youth_group_id") REFERENCES "youth_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD FOREIGN KEY ("attachment_category_id") REFERENCES "attachment_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sport_facilities" ADD FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
