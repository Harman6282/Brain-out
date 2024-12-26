
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";

function Dashboard() {
  const [modalOpen , setModalOpen] = useState(false)
  return (

    <div>
    <div>
      <Sidebar />
    </div>
    
    <div className="p-4 ml-56">
      <CreateContentModel open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} />
      <div className="flex gap-2 float-end">
        <Button 

          startIcon={<PlusIcon size="md" />}
          variant="secondary"
          size="md"
          text="Share Brain"
          onClick={() => {setModalOpen(true)}}
        />
        <Button
        
          startIcon={<PlusIcon size="md" />}

          variant="primary"
          size="md"
          text="Add Content"
          onClick={() => {setModalOpen(true)}}
        />
      </div>

      <div className="flex gap-2">
        <Card
          title="this is title"
          link="https://www.youtube.com/embed/GV3bRwWcZy0?si=_H0wND9hNocDVszp"
          type="youtube"
        />
        <Card
          title="this is title"
          link="https://twitter.com/100xDevs/status/1872166958806041038"
          type="twitter"
        />
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
