import React, {useState} from "react";
import {FormControl} from "@mui/material/";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// components
import {MainNavbar} from "../../components/Navigation/MainNavbar";
import {SelectOption} from "../../components/Inputs/SelectOption";
import {SelectLanguage} from "../../components/Dialog/SelectLanguage";
import {SelectSubject} from "../../components/Dialog/SelectSubject";
import {BlockButton} from "../../components/Buttons/BlockButton";

// logic
import {companyInfo} from "../../types/companyInfo";
import {useSelected} from "../../hooks/selected";

export function GamePrep() {
  const navigate = useNavigate();
  const controlSelected = useSelected();

  const [language, setlanguage] = useState("");
  const [type, setType] = useState("");
  const [subject, setSubject] = useState("");
  const [sentence, setSentence] = useState("");

  const move = () => {
    axios
      .post("quiz/setGameInfo", {
        language: language,
        subject: subject,
        gameType: type,
        sentences: sentence,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/game");
        }
      })

      .catch((err) => console.log(err));
  };

  const handlelanguage = (value: string) => {
    setlanguage(value);
  };

  const handleSubject = (value: string) => {
    setSubject(value);
  };

  const handleType = (value: string) => {
    setType(value);
  };

  const handleSentence = (value: string) => {
    setSentence(value);
  };

  return (
    <div className="vh-100 border">
      <MainNavbar />

      <div className="vh-100 d-flex flex-column align-items-center">
        <h1 className="p-md-5 p-4 mt-md-1 mt-3">Select your game</h1>
        <FormControl className="w-75 d-flex align-items-center">
          <SelectLanguage
            label="Select langugae"
            className="mb-3 w-75 h-25 border border-dark text-dark rounded "
            controlSelected={controlSelected}
            onClick={handlelanguage}
          />

          <SelectSubject onClick={handleSubject} />
          <SelectOption
            label="Game type"
            id="game-type"
            getValue={handleType}
            item={[
              {text: "Stress: You have 30 sec to answer each sentence"},
              {text: "Cool: You have 45 sec to answer each sentence"},
            ]}
          />
          <SelectOption
            label="Sentences"
            id="sentences"
            getValue={handleSentence}
            item={[{text: "10 sentences"}, {text: "20 sentences"}, {text: "30 sentences"}]}
          />

          <BlockButton
            text="Speak"
            type="contained"
            background={companyInfo.company_color}
            className="w-75 mt-3"
            onClick={move}
          />
        </FormControl>
      </div>
    </div>
  );
}
