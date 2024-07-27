const Input = (props) => {
  const { withText, placeholder, className, hash, onChange, value, name } =
    props;

  return (
    <div className="flex flex-col gap-2">
      <span className={`${!withText ? "hidden" : "block"} text-sm text-white`}>
        {withText}
      </span>
      <input
        type={`${hash ? "password" : "text"}`}
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
