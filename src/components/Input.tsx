interface propsVar {
  withText?: string;
  placeholder: string;
  className: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}
const Input = ({
  withText,
  placeholder,
  className,
  type,
  onChange,
  value,
  name,
}: propsVar) => {
  return (
    <div className="flex flex-col gap-2">
      {withText && <span className="text-sm text-white">{withText}</span>}
      <input
        type={type}
        placeholder={placeholder}
        className={`rounded-xl border-gray-500 p-3 text-sm ${className}`}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
