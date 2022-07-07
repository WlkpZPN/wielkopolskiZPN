//? update application depending on the new status_id

//* 1. roboczy - zmieniamy tylko status_id + aktualizujemy dane

//* 2. wnioskowany - zmienay status_id + aktualizujemy dane

//* 3. zatwierdzony - zmienay status_id + aktualizujemy dane

//* 4. do poprawy - zmienay status_id + aktualizujemy dane

//* 2. wnioskowany - zmienay status_id + aktualizujemy dane

//* 2. wnioskowany - zmienay status_id + aktualizujemy dane

import prisma from "../../../../middleware/prisma";
import {
  convertAddressData,
  getCurrentDate,
} from "../../../../middleware/utils";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { formData, clubData, newStatus, userID } = req.body;
    const {
      stepOne,
      stepTwo,
      stepThree,
      stepFour,
      stepFive,
      stepSix,
      stepSeven,
    } = formData;
    console.log('STEP ONE', stepOne);
    await prisma.clubs.update({
      where: {
        id: clubData.id,
      },
      data: {
        name: stepOne.name,
        futsal_subtype: stepOne.futsal_subtype,
        leauge: stepOne.leauge,
        address: convertAddressData(
          stepOne.clubCity,
          stepOne.clubStreet,
          stepOne.clubZipCode
        ),
        email: stepOne.email,
        agent_name: `${stepOne.agentName} ${stepOne.agentLastName}`,
        agent_position: stepOne.position,
        agent_phone: stepOne.agentPhone,
        agent_email: stepOne.agentEmail,
      },
    });
    //2. update application data
    const dataToInsert = {
      club_id: clubData.id,
      status_id: parseInt(newStatus),
      number_of_seasons: stepOne.number_of_seasons,

      declaration_on_the_subject_of_participation_in_the_competition:
        stepTwo.participateInCompetitions,
      declaration_on_the_use_of_personal_data_documentation:
        stepTwo.privateDataProtection,
      number_of_youth_groups: stepThree.numberOfYouthGroups,
      share_of_youth_groups: stepThree.shareOfYouthGroups,
      youth_groups_possession: stepThree.youthGroupsPossession,
      declaration_on_medical_care_for_the_players: stepThree.medicalDeclaration,
      declaration_of_no_obligations_towards_employees:
        stepFive.NoObligationsTowardsEmployees,
      declaration_of_no_obligations_towards_PZPN_and_WZPN:
        stepFive.NoObligationsTowardsPzpnAndWzpn,
      declaration_of_no_obligations_towards_football_clubs:
        stepFive.NoObligationTowardsFootballClubs,
      declaration_of_having_football_staff: stepSix.havingFootballStaff,
      declaration_of_having_security_services: stepSix.HavingSecurityServices,
      updated_at: `${getCurrentDate()}`,
      club_agreement_name: stepThree.clubAgreementName,
      invoice_required: stepSeven.invoice_required,
    };
    // console.log("data to insert", dataToInsert);

    // we have an application | update

    await prisma.applications.update({
      where: {
        id: clubData.applications[0].id,
      },
      data: dataToInsert,
    });

    const { name } = await prisma.statuses.findUnique({
      where: {
        id: parseInt(newStatus),
      },
      select: {
        name: true,
      },
    });

    console.log("new status", name);

    await prisma.histories.create({
      data: {
        application_id: clubData.applications[0].id,
        created_at: getCurrentDate(),
        description: `Zmiana statusu z ${clubData.applications[0].statuses.name} na ${name}`,
        status_id: parseInt(newStatus),
        user_id: parseInt(userID),
      },
    });

    //5 add record to history table

    await prisma.$disconnect();

    res.send("zaaktualizowano wniosek");
    return resolve();
  });
};
