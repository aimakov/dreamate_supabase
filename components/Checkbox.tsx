import React from "react";
import { ChangeEventHandler } from "react";

type Props = {
    value: boolean;
    onChange: ChangeEventHandler;
    name: string;
};

const Checkbox = ({ value, onChange, name }: Props) => {
    return (
        <label className="flex flex-col items-center gap-2 hover:cursor-pointer select-none">
            <p className="text-sm">{`Show ${name}`}</p>
            <input type="checkbox" checked={value} value={value ? 1 : 0} onChange={onChange} className="sr-only peer" />
            <div className="bg-gray-500 w-11 relative h-5 rounded-full after:content-[''] after:absolute after:top-2/4 after:-translate-y-1/2 after:left-[-3px] after:rounded-full after:w-6 after:h-6 after:bg-white after:shadow-md peer-checked:bg-blue-300 peer-checked:after:bg-blue-500 peer-checked:after:translate-x-full after:transition-all transition-all after:duration-300 duration-500"></div>
        </label>
    );
};

export default Checkbox;
