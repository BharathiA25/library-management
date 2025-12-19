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
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "1px",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box"
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


