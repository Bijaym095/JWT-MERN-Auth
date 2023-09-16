const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`${className ?? ""}`}>
      {children}
    </div>
  );
};

export default FormGroup;

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
