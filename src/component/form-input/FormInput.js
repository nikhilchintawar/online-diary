import "./forminput.css";

const FormInput = ({type, ...otherProps}) => {
    return (
        <input 
          type={type}
          className="form-input"
          {...otherProps}
        />
    );
};

export default FormInput;