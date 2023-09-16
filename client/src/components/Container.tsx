const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`container ${className ?? ""}`}>
      {children}
    </div>
  );
};

export default Container;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
