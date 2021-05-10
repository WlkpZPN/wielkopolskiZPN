import prisma from "../../../middleware/prisma";
import {
  convertAddressData,
  getCurrentDate,
  createSeasons,
} from "../../../middleware/utils";
export default async (req, res) => {
  return new Promise(async (resolve) => {
    const { formData, clubData, statusId } = req.body;
    const {
      stepOne,
      stepTwo,
      stepThree,
      stepFour,
      stepFive,
      stepSix,
      stepSeven,
    } = formData;

    await prisma.clubs.update({
      where: {
        id: clubData.id,
      },
      data: {
        name: stepOne.name,

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
      status_id: parseInt(statusId),
      number_of_seasons: stepOne.seasons,
      seasons: stepOne.seasons,
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

    if (!clubData.applications[0]) {
      // we dont have an application | create
      const application = await prisma.applications.create({
        data: {
          created_at: getCurrentDate(),
        },
      });

      await prisma.applications.update({
        where: {
          id: application.id,
        },
        data: dataToInsert,
      });
    } else if (clubData.applications[0]) {
      // we have an application | update
      await prisma.applications.update({
        where: {
          id: clubData.applications[0].id,
        },
        data: dataToInsert,
      });
    }

    //3. update sport_facilities

    //4 update application_attachments

    //5 add record to history table

    await prisma.$disconnect();

    res.send("zaaktualizowano wniosek");
    return resolve();
  });
};
