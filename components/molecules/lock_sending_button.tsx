import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import PrimaryButton from "../atoms/primary_button";
import Loader from "../atoms/loader";
const Wrapper = styled.div`
  margin-bottom: 15px;
  span {
    display: flex;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Icon = styled.div<{locked?: boolean}>`
  width: 45px;
  height: 25px;
  background: #d6d6d6;
  margin-left: 8px;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
  &::after {
    content: "";

    transition: all 0.2s;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${({ theme, locked }) =>
      locked ? theme.success : theme.danger};
    position: absolute;
    top: 0;
    left: ${({ locked }) => (locked ? 0 : "initial")};
    right: ${({ locked }) => (!locked ? 0 : "initial")};
  }
`;

const LockButton = ({ locked }) => {
  const [loading, setLoading] = useState(false);
  const [lockMode, setLockMode] = useState(locked);
  const changeLockMode = async () => {
    const oldVal = locked;
    setLockMode((locked) => !locked);
    try {
      await axios.post("/api/settings/changeLock", {
        lockMode: !lockMode,
      });
      return;
    } catch (error) {
      console.log(error);
      setLockMode(oldVal);
      toast.error("Błąd podczas edycji blokady akcji,spróbuj ponownie");
      return;
    }
  };
  return (
    <Wrapper>
      {lockMode === false && (
        <span onClick={changeLockMode}>
          {" "}
          Zablokuj wysyłanie wniosków poza okresem licencyjnym{" "}
          <Icon locked={lockMode} />{" "}
        </span>
      )}
      {lockMode === true && (
        <span onClick={changeLockMode}>
          {" "}
          Odblokuj wysyłanie wniosków poza okresem licencyjnym{" "}
          <Icon locked={lockMode} />
        </span>
      )}
    </Wrapper>
  );
};

export default LockButton;
