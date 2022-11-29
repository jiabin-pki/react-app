import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { IntlProvider } from "react-intl";
import "./App.css";
import RouteApp from "./RouteApp";
import { zh_CN, en_US } from "./lang/en";
function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <IntlProvider locale="zh" messages={zh_CN}>
        <RouteApp />
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;
