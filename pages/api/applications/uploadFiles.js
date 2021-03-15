import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const spacesEndpoint = new aws.Endpoint("fra1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY_ID,
  secretAccessKey: process.env.SPACES_KEY_SECRET,
});
const apiRoute = nextConnect({
  onNoMatch(req, res) {
    res.statusCode(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pdf",
    acl: "public-read",
    key: function (req, file, cb) {
      console.log("file", file);

      cb(null, file.originalname);
    },
  }),
}).array("files");

//const uploadMiddleware = upload.array("files", 1);
//const uploadMiddleware = upload.any();

//apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
  console.log(req.body);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
    }

    // Everything went fine.
  });
  res.status(200).json({ data: "success" });
});

console.log("error", err);
export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};

// export default async (req, res) => {
//   return new Promise(async (resolve) => {
//     console.log("fileData", req.body);
//     res.send("ok");
//     return resolve();
//   });
// };