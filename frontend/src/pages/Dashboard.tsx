import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const shareBrain =  async () => {
     const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,  {
         share: true
     },{
         headers: {
             "Authorization": localStorage.getItem("token")
         }
     });
     const shareUrl = `https://localhost:5173/brain/${response.data.hash}`
     alert(shareUrl);
  }

  return (
    <div>
      <div>
        <Sidebar />
      </div>

      <div className="p-4 ml-56">
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex gap-2 float-end">
          <Button
            startIcon={<PlusIcon size="md" />}
            variant="secondary"
            size="md"
            text="Share Brain"
            onClick={() => {
             shareBrain()
            }}
          />
          <Button
            startIcon={<PlusIcon size="md" />}
            variant="primary"
            size="md"
            text="Add Content"
            onClick={() => {
              setModalOpen(true);
            }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card
              key={link}
              title={title}
              link={link}
              type={type}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
