import { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  classNameLabel?: string
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  label?:string
  type?:string
}
const Input: FC<Props> = ({ label, id, classNameLabel, className, ...props }) => {
  return (
    <div className="mb-3 w-full">
      <label className={`text-xs md:text-xl w-full ${classNameLabel}`}>{label}</label>
      <input id={id} className={`input input-bordered w-full ${className}`} {...props} />
    </div>
  );
};

// const CostumInput: FC<InputProps> = ({ value, label, type  }) => {
//   return (
//     <div className="w-full py-2 mt-5 ">
//       <Input value={value} label={label} type={type} className="w-full text-black" />
//     </div>
//   );
// };

export default Input;