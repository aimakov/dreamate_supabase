import React from "react";

type Props = {
  value: number;
  checked: boolean;
  name: string;
  setPlayerSkill: Function;
};

const Radio = ({ value, checked, name, setPlayerSkill }: Props) => {
  return (
    <label className="flex items-center gap-2 hover:cursor-pointer md:pl-4">
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={() => setPlayerSkill(value)}
      />
      <p className="text-sm translate-y-[2px]">{name}</p>
    </label>
  );
};

export default Radio;
