function Button({ title, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#1976d2",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer"
            }}
        >
            {title}
        </button>
    );
}

export default Button;