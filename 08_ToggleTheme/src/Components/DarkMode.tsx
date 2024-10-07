import "./style.css"
import useLocalStorage from "./useLocalstorage"

function DarkMode() {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    function handleTheme(){
        setTheme(theme === "light" ? "dark" : "light");
    }
    console.log(theme)
  return (
    <div className="light-dark-mode" data-theme={theme}>
        <div className="container">
            <p>hello world !</p>
            <button onClick={handleTheme}>Toggle Theme</button>
        </div>
    </div>
  )
}

export default DarkMode