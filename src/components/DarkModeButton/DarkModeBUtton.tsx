const DarkModeButton = () => {
  const toggleDarkMode = () => {
    if (typeof document !== undefined) {
      const dark = localStorage.getItem("theme") === "dark";
      console.log(dark)
      const root = document?.querySelector(":root") as HTMLElement;
      const style = root.style;
      style.setProperty("--background-color", !dark ? "#16161a" : "#fffffe");
      style.setProperty("--text-color", !dark ? "#fffffe" : "#16161a");
      style.setProperty("--paragraph-color", !dark ? "#fffffe" : "#16161a");
      localStorage.setItem("theme", dark ? "light" : "dark");
    }
  };

  return <button onClick={toggleDarkMode}>Toggle</button>;
};

export default DarkModeButton;
