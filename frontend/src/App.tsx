import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <MantineProvider>
      <HomePage />
    </MantineProvider>
  );
};
export default App;
