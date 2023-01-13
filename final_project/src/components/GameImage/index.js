import { useContext } from "react";
import { Difficulties } from "../../types/Difficulties";

import Stage0 from "../../assets/stages/stage0.svg";
import Stage1 from "../../assets/stages/stage1.svg";
import Stage2 from "../../assets/stages/stage2.svg";
import Stage3 from "../../assets/stages/stage3.svg";
import Stage4 from "../../assets/stages/stage4.svg";
import Stage5 from "../../assets/stages/stage5.svg";
import Stage6 from "../../assets/stages/stage6.svg";
import { DifficultyContext } from "../../contexts/DifficultyContext";

export default function GameImage({errors, height, width}) {
    const { difficulty } = useContext(DifficultyContext);

    if (errors == 0) return <Stage0 height={height} width={width}/>;
    if (errors == 1) return <Stage1 height={height} width={width}/>;
    if (errors == 2) return <Stage2 height={height} width={width}/>;
    if ((errors == 3 && difficulty == Difficulties.hard) || 
        (errors == 4 && difficulty == Difficulties.medium) || 
        errors == 6) return <Stage6 height={height} width={width}/>;
    if ((errors == 3 && difficulty == Difficulties.medium) || errors == 4) return <Stage4 height={height} width={width}/>;
    if (errors == 5) return <Stage5 height={height} width={width}/>;
    if (errors == 3 && difficulty == Difficulties.easy) return <Stage3 height={height} width={width}/>;
}