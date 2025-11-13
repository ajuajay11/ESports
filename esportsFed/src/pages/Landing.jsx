import { useState } from "react";
import Button from "../components/buttons";
import CreateMatchModal from "../components/match/CreateMatchModal";
import JoinMatchModal from "../components/match/JoinMatchModal";

export default function Home() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  return (
    <>
      <section style={{ minHeight: "100vh" }}>
        <div className="flex items-center h-full gap-10">
          {/* CREATE MATCH BUTTON */}
          <button
            onClick={() => setOpenCreate(true)}
            className="px-5 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md"
          >
            openCreate
          </button>

          {/* JOIN MATCH BUTTON */}
          <button
            onClick={() => setOpenJoin(true)}
            className="px-5 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md"
          >
            openJoin
          </button>
        </div>
      </section>

      {/* CREATE MATCH MODAL */}
      {openCreate && <CreateMatchModal close={() => setOpenCreate(false)} />}

      {/* JOIN MATCH MODAL */}
      {openJoin && <JoinMatchModal close={() => setOpenJoin(false)} />}
    </>
  );
}
