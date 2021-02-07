import "./SelectOption.css";

const SelectOption = ({value, sortType, ...otherProps}) => {
    return (
        <select value={value} {...otherProps}>
            {
                sortType.map(({value, label}) => <option value={value} key={value}>{label}</option>)
            }
        </select>
    );
};

export default SelectOption;