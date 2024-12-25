import "./App.css";
import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button
        startIcon={<ShareIcon size="sm" />}
        variant="primary"
        size="sm"
        text="small"
        onClick={() => {}}
      />
      <Button
        startIcon={<PlusIcon size="md" />}
        variant="secondary"
        size="md"
        text="medium"
        onClick={() => {}}
      />
      <Button
        startIcon={<ShareIcon size="lg" />}
        variant="secondary"
        size="lg"
        text="large"
        onClick={() => {}}
      />
    </>
  );
}

export default App;
