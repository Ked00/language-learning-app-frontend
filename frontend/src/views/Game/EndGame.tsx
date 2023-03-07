import React from "react";
import {Container, Stack} from "react-bootstrap";
import {MainNavbar} from "../../components/Navigation/MainNavbar";
import {PriceCard} from "../../components/Cards/PriceCard";
import {BlockButton} from "../../components/Buttons/BlockButton";

type Props = {
  getInfo: {info: {time: number; sentence: number}; gameInfo: () => void};
  points: {correct: number; points: number; decrease: () => void; wrong:number};
};


export function EndGame(props: Props) {
  return (
    <div className="vh-100">
      <MainNavbar />
      <Container>
        <div className="text-md-center my-5">
          <h1>Congratulation!</h1>
          <p className="mb-4">You have finished the game</p>
          <img
            src={require("../../images/celebration.png")}
            width="100%"
            height="100%"
            className="image-fluid"
          />
        </div>
        <p className="my-2 p-2 fs-4 text-md-center">Here is your result</p>
        <div className="d-flex justify-content-center">
          <PriceCard
            classname="h-100 d-flex justify-content-center align-items-center"
            week="Score: "
            price={`${props.points.points} points`}
          />
          <PriceCard
            classname="h-100 d-flex justify-content-center align-items-center mb-5"
            week="Results: "
            price={`${props.points.correct} out of ${props.getInfo.info.sentence} correct`}
          />
        </div>
        <Stack gap={3} className="mt-3 ms-md-4">
          <BlockButton type="outlined" text="Score report" />
          <BlockButton type="contained" text="Play again" className="mb-3" />
        </Stack>
      </Container>
    </div>
  );
}
