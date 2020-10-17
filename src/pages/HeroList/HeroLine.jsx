import React from "react";
import AscendField from "./AscendField";
import InnField from "./InnField";
import SiField from "./SiField";

const HeroLine = ({ id, name, setLevel, getValue, isView }) => {
  const heroFileName = name.toLowerCase().replace(/[^a-z]/g, "");

  return (
    <div key={id} className="hero-list__line">
      <div className="hero-list__image-wrapper">
        <img src={`/heroes/${heroFileName}.jpg`} className="hero-list__image" alt={name} />
      </div>
      <span className="hero-list__item-name">{name}</span>

      <SiField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
      <InnField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
      <AscendField id={id} setLevel={setLevel} getValue={getValue} isView={isView} />
    </div>
  );
};

export default HeroLine;
