export default async (req, res) => {
  const { clubID, applicationID, clubData } = req.body;
  const sport_facilities = clubData.applications[0].sport_facilities;

  try {
    await prisma.histories.deleteMany({
      where: { application_id: parseInt(applicationID) },
    });

    await prisma.applications.update({
      where: { id: parseInt(applicationID) },
      data: { status_id: 1, is_new_season: false },
    });

    // Delete files from S3
    // for (const facility of sport_facilities) {
    //   for (const attachment of facility.applications_attachments) {
    //     const params = { Bucket: 'pdf/wnioski', Key: attachment.name };
    //     try {
    //       await s3.deleteObject(params).promise();
    //     } catch (err) {
    //       console.log('S3 delete error:', err);
    //     }
    //   }
    // }

    // for (const attachment of clubData.applications[0].applications_attachments) {
    //   const params = { Bucket: 'pdf/wnioski', Key: attachment.name };
    //   try {
    //     await s3.deleteObject(params).promise();
    //   } catch (err) {
    //     console.log('S3 delete error:', err);
    //   }
    // }

    await prisma.applications_attachments.deleteMany({
      where: { application_id: parseInt(applicationID) },
    });

    for (const facility of sport_facilities) {
      await prisma.applications_attachments.deleteMany({
        where: { sport_facilities_id: facility.id },
      });
    }

    res.send('Application deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
