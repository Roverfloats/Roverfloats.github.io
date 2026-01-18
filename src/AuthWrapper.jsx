import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthWrapper({ children, darkMode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      navigate("/");
    }
  }, [navigate]);

  var darkColors = {background: "#171717", blue: "#0065AD", text: "#ffffff", textOpposite: "#000000", border: "#000000", red: "#DF121B", inputBackground: "#292929", textOnBlue: "#ffffff", green: "#008800", greenBorder:"#004700"}
  var lightColors = {background: "#ffffff", blue: "#0096FF", text: "#000000", textOpposite: "#ffffff", border: "#D0D0D0", red: "#DF121B", inputBackground: "#F4F4F4", textOnBlue: "#ffffff", green: "#00BC00", greenBorder:"#008800"}

  useEffect(() => {
    console.log("test")
    var jsonColors
    jsonColors = JSON.stringify(darkColors)
    localStorage.setItem("colors", jsonColors);
    
    if(darkMode){
      jsonColors = JSON.stringify(darkColors)
      localStorage.setItem("colors", jsonColors);
    } else {
      jsonColors = JSON.stringify(lightColors)
      localStorage.setItem("colors", jsonColors);
    }
    var colors = JSON.parse(localStorage.getItem("colors"))
    document.documentElement.style.setProperty("--main-bg-color", colors.background);
  }, [darkMode]);

  return children;
}

export default AuthWrapper