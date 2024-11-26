import '../../styles/CheckBox.css';

export default function CheckBox({ name, label, checked, onChange, short }) {
    return (
        <div className='checkboxDiv'>
            <label
                className={
                    short
                        ? `checkbox short`
                        : 'checkbox'
                }
            >
                <input
                    name={name}
                    type="checkbox"
                    checked={checked}
                    className='checkboxInput'
                    onChange={onChange}
                />
                {label}
            </label>
        </div>
    );
}
