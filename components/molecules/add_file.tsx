import { useState, useContext } from 'react';
import uniqid from 'uniqid';
import axios from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { InfoCircle } from '@styled-icons/boxicons-regular/InfoCircle';
import { FilePdf } from '@styled-icons/fa-regular/FilePdf';
import Loader from '../atoms/loader';
import { toast } from 'react-toastify';
import { makeid, checkMimeType } from '../../middleware/utils';
import { ApplicationContext } from '../../components/organisms/club_application';
//components
import OutlineButton from '../atoms/outline_button';

const Parent = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
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
  border-radius: 8px;

  z-index: 0;
  width: 260px;
  overflow: auto;
  text-align: center;
`;

const Info = styled.div<{ text: string }>`
  & svg {
    width: 30px;
    z-index: 0;
    position: absolute;
    top: 16px;
    left: 16px;
    transition: all 0.2s;
  }
  width: 100%;

  color: ${({ theme }) => theme.primaryLight};
  &:hover {
    /* color: white; */
    &::after {
      display: block;
    }
  }
  &::after {
    content: '${({ text }) => `${text}`}';
    z-index: 200;
    padding: 32px;
    display: none;
    transition: all 0.2s;
    position: absolute;
    left: 40px;
    min-width: 400px;
    top: 40px;
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

// const AddFile = ({ file, handleDelete, addFile, text, category, id }) => {
const AddFile = ({ file, category, id, text }) => {
  const { formData, clubData, refreshData } = useContext(ApplicationContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log(file);
  const handleChange = async (e) => {
    e.preventDefault();
    const result = checkMimeType(e);
    if (!result.valid) {
      toast.error(result.error);
      return;
    }
    console.log(e.target.files[0].type);

    const fileName = `${makeid(3)}_${e.target.files[0].name}`;

    const newFile = new File([e.target.files[0]], fileName, {
      type: e.target.files[0].type,
      lastModified: e.target.files[0].lastModified,
    });

    const fileData = new FormData();
    fileData.append('files', newFile);
    fileData.append('targetDir', '/wnioski');


    const config = {
      // headers: { "Content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    try {
      setLoading(true);
      await axios.post('/api/ftp/upload', fileData, config);

      if (category === 'agreement_documents' || category === 'krs_documents') {
        await axios.post('/api/files/addFilesUrl', {
          applicationID: clubData.applications[0].id,
          category: category,
          fileName: fileName,
        });
      } else {
        await axios.post('/api/files/addFilesUrl', {
          facilityID: clubData.applications[0].id,
          category: category,
          fileName: fileName,
        });
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

  const deleteFile = async () => {
    if (!file?.id) {
      return;
    }
    setLoading(true);
    try {
      axios.post('/api/applications/deleteFile', {
        attachment: file,
      });
      setLoading(false);
      toast.error('Usunięto plik', {
        autoClose: 1500,
      });
      refreshData();
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error('Nie udało się usunąć pliku,spróbuj ponownie', {
        autoClose: 2000,
      });
    }
  };
  if (file) {
    file.filepath = file.filepath.replace('https://pdf.fra1.digitaloceanspaces.com', '');
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
              <Link target="_blank" href={'/api/view?path='+encodeURIComponent(file.filepath)}>
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

            <FileInput
              id="file"
              type="file"
              name="file"
              onChange={handleChange}
            />
          </Label>
          {file ? (
            <DeleteButton
              onClick={(e) => {
                e.preventDefault();
                // handleDelete(file.id);
                deleteFile();
              }}
            >
              Usuń
            </DeleteButton>
          ) : null}{' '}
        </>
      </Wrapper>
    </Parent>
  );
};

export default AddFile;
