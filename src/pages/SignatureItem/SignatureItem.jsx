import React, { useCallback, useState } from "react";
import useCountEmblem from "./components/hooks/useCountEmblem";
import SignatureItemLeft from "./components/ui/SignatureItemLeft";
import InputField from "../../components/ui/InputField";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import HelpButton from "../../components/ui/button/HelpButton";

const SignatureItem = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const [primoridial10, amplifying10, faction10, celest10] = useCountEmblem(10, currentLevel);
  const [primoridial20, amplifying20, faction20, celest20] = useCountEmblem(20, currentLevel);
  const [primoridial30, amplifying30, faction30, celest30] = useCountEmblem(30, currentLevel);
  const [primoridial40, amplifying40, faction40, celest40] = useCountEmblem(40, currentLevel);

  const onChange = useCallback((e) => {
    const val = Number(e);
    if (!Number.isNaN(val) && val >= 0 && val <= 40) {
      setCurrentLevel(val);
    }
  }, []);

  return (
    <div>
      {showHelp ? (
        <Card>
          <div style={{ padding: "16px" }}>
            This tool is aimed to give you the remaining emblems you need to get to the specified
            stages
          </div>
        </Card>
      ) : null}
      <Card>
        <HelpButton onClick={() => setShowHelp(!showHelp)} />
        <CardTitle>First, set your character informations</CardTitle>
        <InputField value={currentLevel} label="Current SI level" onChange={onChange} />
      </Card>

      <SignatureItemLeft
        step={40}
        primoridial={primoridial40}
        amplifying={amplifying40}
        faction={faction40}
        celest={celest40}
      />
      <SignatureItemLeft
        step={30}
        primoridial={primoridial30}
        amplifying={amplifying30}
        faction={faction30}
        celest={celest30}
      />
      <SignatureItemLeft
        step={20}
        primoridial={primoridial20}
        amplifying={amplifying20}
        faction={faction20}
        celest={celest20}
      />
      <SignatureItemLeft
        step={10}
        primoridial={primoridial10}
        amplifying={amplifying10}
        faction={faction10}
        celest={celest10}
      />
    </div>
  );
};

export default SignatureItem;