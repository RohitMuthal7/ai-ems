function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name
}) {
    return (
        <div style={{ marginBottom: "20px" }}>

            <label
                style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold"
                }}
            >
                {label}
            </label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "16px",
                    boxSizing: "border-box"
                }}
            />

        </div>
    );
}

export default Input;