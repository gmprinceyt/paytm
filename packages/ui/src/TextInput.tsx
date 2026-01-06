import { type ChangeEvent, type HTMLInputTypeAttribute } from "react";

export function TextInput({
  placeholder,
  label,
  onChange,
  type = "text",
}: {
  placeholder: string;
  label: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
}
