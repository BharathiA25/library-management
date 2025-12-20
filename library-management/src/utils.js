export const getThemeColors = (themeProvider) => ({
  bgColor:
    themeProvider === "dark"
      ? "linear-gradient(to bottom right, #130223ff, #3d0066)"
      : "linear-gradient(to right, #a044ff, #e738b1)",

  textColor: themeProvider === "dark" ? "white" : "black",

  paperColor: themeProvider === "dark" ? "#2b2727ff" : "#ffffff",

  lightTheme: themeProvider === "dark" ? "#0497a783" : "#FFD93D",

  darkTheme: themeProvider === "light" ? "#e738b1" : "#ffffffff",

  spanColor : themeProvider ==="light"? "#e738b1" : "#af64e0ff",
});
export const inputStyle = {
      backgroundColor: "#fff",
      borderRadius: "25px",
      "& .MuiOutlinedInput-root": {
        borderRadius: "25px",
        "& fieldset": { borderColor: "#d0d0d0" },
        "&:hover fieldset": { borderColor: "#b0b0b0" },
        "&.Mui-focused fieldset": { borderColor: "#a044ff" },
      },
      "& .MuiInputAdornment-root svg": { color: "#9e9e9e" },
  };
  export const getButtonStyle = (themeProvider) =>({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: themeProvider ==="light"?
                "linear-gradient(to right, #a044ff, #e738b1)" :
                "linear-gradient(to bottom right, #130223ff, #3d0066)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px"
  });
  export const errorStyle = {
  color: "#ff4d4d",
  fontSize: "12px",
  marginTop: "1px",
  fontWeight: "500",
  marginBottom:'5px !important',
  lineHeight :'1.2'
};
export const fieldWrapper = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "18px", 
};


