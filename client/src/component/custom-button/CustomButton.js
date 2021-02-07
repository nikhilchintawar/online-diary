import "./CustomButton.css";

const CustomButton = ({
  children,
  ...otherProps
}) => (
  <button
    className="custom-button"
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;