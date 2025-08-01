import { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { InfoCircle } from '@styled-icons/boxicons-regular/InfoCircle';
import { FilePdf } from '@styled-icons/fa-regular/FilePdf';
import { toast } from 'react-toastify';
import { checkMimeType, makeid } from '../../middleware/utils';
import { ApplicationContext } from '../../components/organisms/club_application';
import ErrorMessage from '../atoms/error_message';
//components

const Parent = styled.div`
  position: relative;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  position: relative;
  bottom: 16px;
`;

const Wrapper = styled.div`
  //border-radius: 5px;
  white-space: pre-wrap;
  word-break: break-word;
  padding: 16px;
  margin-right: 16px;
  background-color: #f2f3f4;
  border-radius: 2px 3px 3px rgba(0, 0, 0, 0.2);
  height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 0;
  width: 260px;
  overflow: auto;
  text-align: center;
`;

const Info = styled.div<{ text: string }>`
  & svg {
    width: 30px;
    z-index: 100;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: all 0.2s;
  }

  width: 100%;

  color: ${({ theme }) => theme.primaryLight};

  &:hover {
    color: white;

    &::after {
      display: block;
    }
  }

  &::after {
    content: '${({ text }) => `${text}`}';
    z-index: 100;
    padding: 32px;
    display: none;
    transition: all 0.2s;
    position: absolute;
    left: 14px;
    min-width: 400px;
    top: 14px;
    border-radius: 5px;
    width: 500px;
    color: white;
    background: ${({ theme }) => theme.primary};
    width: 90%;
    z-index: 1;
    /* transform: translate(-50%, 50%); */
  }
`;

const FileInfo = styled.div`
  white-space: wrap;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  align-items: center;

  margin-bottom: 32px;

  svg {
    width: 40px;
    margin-bottom: 16px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label``;

const AddButton = styled.span`
  padding: 8px 16px;
  border: 2px solid ${({ theme }) => theme.primaryLight};
  transition: all 0.2s;
  font-weight: bold;
  color: ${({ theme }) => theme.primaryLight};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  background: transparent;

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.3);
  }
`;

const Link = styled.a`
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.span`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.danger};
  color: white;
  font-weight: bold;
  transition: all 0.2s;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.dangerDark};
  }
`;

const AddFacilityFile = ({ file, category, text, upload, isFutsal = false }) => {
  const {
    formData,
    clubData,
    refreshData,
    currentObject,
    deleteFacilityFile,
    setFormData,
    filePath,
  } = useContext(ApplicationContext);
  const app_facility = isFutsal
    ? formData.stepFour.futsal_facilities[currentObject]
    : formData.stepFour.sport_facilities[currentObject];
  const facilityID = app_facility?.id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //console.log(error);
  const handleChange = async (e) => {
    e.preventDefault();
    const result = checkMimeType(e);
    if (!result.valid) {
      // setError(result.error);

      console.log('error', result.error);
      toast.error(result.error);
      return;
    }
    const fileName = `${makeid(3)}_${e.target.files[0].name}`;

    const newFile = new File([e.target.files[0]], fileName, {
      type: e.target.files[0].type,
      lastModified: e.target.files[0].lastModified,
    });

    // const blob = e.target.files[0];
    // const newFile = new File([blob], fileName, blob.type);
    const fileData = new FormData();
    fileData.append('files', newFile);
    fileData.append('targetDir', '/wnioski');

    const config = {
      timeout: 60000, // 1-minute timeout
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    };
    try {
      setLoading(true);
      const uploadResult = await axios.post('/api/ftp/upload', fileData, config);

      if (upload) {
        await axios.post('/api/files/addFilesUrl', {
          category,
          fileName,
          facilityID: app_facility.id,
          filepath: `/${uploadResult.data.results[0].key}`,
        });
        toast.info('Dodano plik', {
          autoClose: 2000,
        });
        refreshData();
      }

      let newData = formData;
      if (isFutsal) {
        newData.stepFour.futsal_facilities[currentObject].applications_attachments.push({
          filepath: `/${uploadResult.data.results[0].key}`,
          category,
          name: fileName,
          fileData: newFile,
        });
      } else {
        newData.stepFour.sport_facilities[currentObject].applications_attachments.push({
          filepath: `/${uploadResult.data.results[0].key}`,
          category,
          name: fileName,
          fileData: newFile,
        });
      }
      setFormData(newData);
      setLoading(false);
      // toast.success("Dodano plik na serwer", {
      //   autoClose: 2000,
      // });
      // router.replace(router.asPath);
    } catch (err) {
      console.log(err);
      toast.error('Dodawanie pliku się nie powiodło, prosimy spróbować później');
      setLoading(false);
    }
  };

  const deleteFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (file.id || upload) {
      // delete from server

      try {
        const response = await axios.post('/api/files/deleteFacilityFile', {
          attachment: file,
          facilityID,
        });
        setLoading(false);
        toast.info('Plik usunięty', {
          autoClose: 2000,
        });

        if (isFutsal) {
          const newFormData = formData;
          newFormData.stepFour.futsal_facilities[currentObject].applications_attachments =
            response.data.attachments;

          setFormData(newFormData);
        } else {
          const newFormData = formData;
          newFormData.stepFour.sport_facilities[currentObject].applications_attachments =
            response.data.attachments;

          setFormData(newFormData);
        }
        refreshData();
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error('Nie udało się usunąć pliku,spróbuj ponownie', {
          autoClose: 2500,
        });
        return;
      }
    } else {
      // delete from state
      deleteFacilityFile(file.name);
    }

    setLoading(false);
  };

  console.log('file', file);

  function getFilePath(file): string {
    if (file.filepath) {
      return file.filepath;
    } else {
      return '/wnioski/' + file.name;
    }
  }

  return (
    <Parent>
      <Wrapper>
        <>
          {' '}
          {text ? (
            <Info text={text}>
              <InfoCircle />
            </Info>
          ) : null}
          <FileInfo>
            <FilePdf />
            {file ? (
              <Link
                target="_blank"
                href={'/api/view?path=' + encodeURIComponent(getFilePath(file))}
              >
                {file.name}
              </Link>
            ) : (
              <span style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
                {'Brak załączonego dokumentu.'}
              </span>
            )}
          </FileInfo>
          <Label>
            {file ? null : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {' '}
                <AddButton>+ Dodaj dokument</AddButton>
                <span
                  style={{
                    color: '#363636',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  Dopuszczalne formaty to PDF oraz JPG, maksymalnie 5 Mb
                </span>{' '}
              </div>
            )}

            <FileInput id="file" type="file" name="file" onChange={handleChange} />
          </Label>
          {file ? <DeleteButton onClick={deleteFile}>Usuń</DeleteButton> : null}{' '}
        </>
        <ErrorMessage>{error}</ErrorMessage>
      </Wrapper>
    </Parent>
  );
};

export default AddFacilityFile;
