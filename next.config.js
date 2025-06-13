const requiredEnvVars = [
  'GDRIVE_FOLDER_ID',
  'GDRIVE_FOLDER_ID_FAKTURY',
  'GDRIVE_FOLDER_ID_WNIOSKI',
  'GDRIVE_CREDENTIALS',
];

const missing = requiredEnvVars.filter((name) => !process.env[name]);

if (missing.length > 0) {
  throw new Error(`❌ Missing environment variables: ${missing.join(', ')}`);
}

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
