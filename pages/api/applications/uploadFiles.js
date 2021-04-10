import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import prisma from "../../../middleware/prisma";

const spacesEndpoint = new aws.Endpoint(process.env.DB_SPACES_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DB_SPACES_KEY,
  secretAccessKey: process.env.DB_SPACES_SECRET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pdf/wnioski",
    acl: "public-read",
    key: function (req, file, cb) {
      console.log("req", req);
      console.log("file", file);
      cb(null, file.originalname);
    },
  }),
}).single("file");

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.statusCode(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

//apiRoute.use(upload.single("invoice"));

apiRoute.post((req, res) => {
  upload(req, res, function (error) {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      res.send("");
    }
  });
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};

// import nextConnect from "next-connect";
// import multer from "multer";
// import multerS3 from "multer-s3";
// import aws from "aws-sdk";

// const spacesEndpoint = new aws.Endpoint(process.env.DB_SPACES_ENDPOINT);
// const s3 = new aws.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.DB_SPACES_KEY,
//   secretAccessKey: process.env.DB_SPACES_SECRET,
// });

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "/pdf/wnioski",
//     acl: "public-read",
//     key: function (req, file, cb) {
//       console.log("file", file);

//       cb(null, file.originalname);
//     },
//   }),
// }).any("files");

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.statusCode(405).json({ error: `Method ${req.method} Not Allowed` });
//   },
// });

// //const uploadMiddleware = upload.array("files", 1);
// //const uploadMiddleware = upload.any();

// //apiRoute.use(uploadMiddleware);

// apiRoute.post((req, res) => {
//   upload(req, res, function (error) {
//     if (error) {
//       console.log(error);
//       res.status(400).send(error);
//     } else {
//       console.log("data", req.file);
//     }
//   });
// });

// export default apiRoute;
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // export default async (req, res) => {
// //   return new Promise(async (resolve) => {
// //     console.log("fileData", req.body);
// //     res.send("ok");
// //     return resolve();
// //   });
// // };
