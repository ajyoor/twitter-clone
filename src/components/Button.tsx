interface propsVar {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: any;
}
const Button = ({ className, onClick, children }: propsVar) => {
  return (
    <button className={`w-full rounded-xl p-3 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
