import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const AddFile = ({ clubData, category, checkMimeType, makeid }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const result = checkMimeType(e);

    if (!result.valid) {
      toast.error(result.error);
      return;
    }
    console.log(e.target.files[0].type);

    // Create File and Prepare Data
    const fileName = `${makeid(3)}_${e.target.files[0].name}`;
    const newFile = new File([e.target.files[0]], fileName, {
      type: e.target.files[0].type,
      lastModified: e.target.files[0].lastModified,
    });
    const fileData = new FormData();
    fileData.append('files', newFile);
    fileData.append('targetDir', '/wnioski');

    const config = {
      timeout: 60000, // 1-minute timeout
      onUploadProgress: (event) => {
        console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    try {
      setLoading(true);

      // Upload File
      await axios.post('/api/ftp/upload', fileData, config);

      // Log File URL
      if (category === 'agreement_documents' || category === 'krs_documents') {
        await axios.post(
            '/api/files/addFilesUrl',
            {
              applicationID: clubData.applications[0].id,
              category: category,
              fileName: fileName,
            },
            { timeout: 60000 } // Add timeout for this request
        );
      } else {
        await axios.post(
            '/api/files/addFilesUrl',
            {
              facilityID: clubData.applications[0].id,
              category: category,
              fileName: fileName,
            },
            { timeout: 60000 } // Add timeout for this request
        );
      }

      setLoading(false);
      toast.success('Zapisano plik', {
        autoClose: 2000,
      });
      router.replace(router.asPath);
    } catch (err) {
      console.log(err);
      toast.error(
          'Dodawanie pliku się nie powiodło, prosimy spróbować później'
      );
      setLoading(false);
    }
  };

  return (
      <div>
        <input
            type="file"
            onChange={handleFileUpload}
            disabled={loading}
            accept="*/*"
        />
      </div>
  );
};

export default AddFile;