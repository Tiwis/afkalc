import React, { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ascendLevels from "../../../../data/heroAscensionLevel.json";
import Modal from "../../../functionnal/Modal";
import ChoosePriorityHero from "../../../modal/ChoosePriorityHero";
import GuildContext from "../../../providers/GuildContext";
import IFirebaseProfile from "../../../providers/types/IFirebaseProfile";
import Character from "../../../ui/afk/Character";
import CheckboxField from "../../../ui/CheckboxField";
import Chip from "../../../ui/Chip";
import useHero from "../../TiersList/hooks/useHero";
import SearchListItem from "./SearchListItem";
import styles from "./TabSearchHero.module.css";

interface IProps {
  [key: string]: never;
}

function filterHeroes(hero: number, si: number, fi: number, ascend: number, reverse: boolean) {
  return (box: IFirebaseProfile) => {
    const vAscend = box?.heroes?.[hero]?.ascend ?? -1;
    const vSi = box?.heroes?.[hero]?.si ?? 0;
    const vFi = box?.heroes?.[hero]?.fi ?? 0;

    const result = vAscend >= ascend && vSi >= si && vFi >= fi;

    return reverse ? !result : result;
  };
}

function getAscendName(ascend: number) {
  return ascendLevels.find((level) => level.key === ascend)?.name;
}

const TabSearchHero: React.FC<IProps> = () => {
  const { values } = useContext(GuildContext);
  const { t } = useTranslation("guild");
  const [showModal, setShowModal] = useState(false);
  const [hero, setHero] = useState<number>(1);
  const [si, setSi] = useState<number>(0);
  const [fi, setFi] = useState<number>(0);
  const [reverse, setReverse] = useState<boolean>(false);
  const [ascend, setAscend] = useState<number>(0);
  const { getHero } = useHero();

  const searchString = [getHero(hero)?.name];
  if (ascend > 0) searchString.push(t(`common:ascension-${getAscendName(ascend)}`));
  if (si > 0) searchString.push(`${t("common:concept.si")} +${si}`);
  if (fi > 0) searchString.push(`${t("common:concept.fi")} ${fi}/9`);

  const foundBoxes = useMemo(
    () =>
      values.members
        .filter(filterHeroes(hero, si, fi, ascend, reverse))
        .sort((a, b) => a.playerName?.localeCompare(b.playerName ?? "") ?? 0)
        .map((box) => values.members.find((member) => member.id === box.id)),
    [ascend, fi, hero, reverse, si, values.members]
  );

  return (
    <>
      <div className={styles.SearchBox}>
        <div className={styles.SearchCharacter}>
          <Character
            id={hero}
            ascendLevel={ascend}
            siLevel={si}
            fiLevel={fi}
            onClick={() => setShowModal(true)}
          />
          {searchString.join(", ")}
          <Chip>{foundBoxes.length}</Chip>
        </div>
        <CheckboxField
          label={t("reverse-search")}
          name="reverse"
          onChange={setReverse}
          value={reverse}
        />
      </div>

      {foundBoxes.map((member) => {
        if (member === undefined) return null;
        return (
          <SearchListItem
            member={member}
            key={member.id ?? ""}
            isOwner={values.guild.ownerId === member.id}
            isDeputy={values.guild.deputies.includes(member.id ?? "")}
          >
            <Character
              id={hero}
              siLevel={member.heroes?.[hero]?.si}
              ascendLevel={member.heroes?.[hero]?.ascend}
              fiLevel={member.heroes?.[hero]?.fi}
              disabled={member.heroes?.[hero]?.ascend === undefined}
            />
          </SearchListItem>
        );
      })}

      <Modal active={showModal} onClose={() => setShowModal(false)}>
        <ChoosePriorityHero
          si={si}
          fi={fi}
          hero={hero}
          ascend={ascend}
          onSelect={(selectedHero) => {
            setHero(selectedHero.hero);
            setSi(selectedHero.si);
            setFi(selectedHero.fi);
            setAscend(selectedHero.ascend);
          }}
        />
      </Modal>
    </>
  );
};

export default TabSearchHero;
