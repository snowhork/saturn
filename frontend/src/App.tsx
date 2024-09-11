import "./App.css";
import {
  transferTransferPost,
  useListStoragesGet,
} from "./gen/default/default";
import { RootNode } from "./StorageTree";
import { Item, Storage } from "./gen/schema";
import { Alert, Modal, Snackbar, SnackbarCloseReason } from "@mui/material";
import StorageProvider, {
  StorageContextType,
  useInitStorageContext,
} from "./StorageProvider";
import { useCallback, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { DndContext } from "@dnd-kit/core";
import DragProvider from "./DragProvider";

const transferEnabled = (fromItems: Item[], toItems: Item[]) => {
  if (toItems.length === 0 || fromItems.length === 0) return false;
  if (!toItems[0].is_dir || toItems.length > 1) return false;

  return true;
};

const Storages = ({
  storage1,
  storage2,
}: {
  storage1: Storage;
  storage2: Storage;
}) => {
  const context1 = useInitStorageContext(storage1);
  const context2 = useInitStorageContext(storage2);

  return (
    <DragProvider context1={context1} context2={context2}>
      <div className="w-1/2">
        <div className="font-bold">{storage1.name}</div>
        <StorageProvider context={context1}>
          <RootNode />
        </StorageProvider>
      </div>
      <div className="w-[80px] relative">
        <ButtonWithModal context1={context1} context2={context2} />
      </div>
      <div className="w-1/2">
        <div className="font-bold">{storage2.name}</div>
        <StorageProvider context={context2}>
          <RootNode />
        </StorageProvider>
      </div>
    </DragProvider>
  );
};

function App() {
  const { data } = useListStoragesGet();

  return (
    <>
      <div className="flex w-full m-5">
        {data && <Storages storage1={data.data[0]} storage2={data.data[1]} />}
      </div>
    </>
  );
}

const transfer = (src: StorageContextType, dst: StorageContextType) => {
  return transferTransferPost({
    src_name: src.storage.name,
    dst_name: dst.storage.name,
    src_ids: src.selectedItems.map((item) => item.id),
    dst_id: dst.selectedItems[0].id,

    src_credentials: {
      google_drive_token: src.googleDriveOauthToken?.access_token,
    },

    dst_credentials: {
      google_drive_token: dst.googleDriveOauthToken?.access_token,
    },
  });
};

const ButtonWithModal = ({
  context1,
  context2,
}: {
  context1: StorageContextType;
  context2: StorageContextType;
}) => {
  const [modalState, setModalState] = useState<
    "closed" | "right_arrow" | "left_arrow"
  >("closed");

  const [transferring, setTransferring] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const onTransfer = useCallback(
    async (from: StorageContextType, to: StorageContextType) => {
      setTransferring(true);
      try {
        await transfer(from, to);
        setSuccess(true);
      } catch {
        setFailed(true);
      } finally {
        setTransferring(false);
      }

      setModalState("closed");
    },
    []
  );

  const onSuccessSnackBarClose = useCallback(
    (_e: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }

      setSuccess(false);
    },
    []
  );

  const onFailedSnackBarClose = useCallback(
    (_e: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }

      setFailed(false);
    },
    []
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={success}
        onClose={onSuccessSnackBarClose}
        autoHideDuration={3000}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Success!
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={failed}
        onClose={onFailedSnackBarClose}
        autoHideDuration={3000}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Failed. Please check server logs.
        </Alert>
      </Snackbar>

      <button
        className="fixed bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded text-sm top-1/4 disabled:bg-blue-100"
        disabled={
          !transferEnabled(context1.selectedItems, context2.selectedItems)
        }
        onClick={() => setModalState("right_arrow")}
      >
        <FaArrowRight />
      </button>
      <Modal
        open={modalState != "closed"}
        onClose={() => setModalState("closed")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="px-4 py-2 bg-gray-800 m-auto mt-12 w-1/2">
          <div className="text-white flex justify-center">
            <div className="w-1/2 text-right">
              <div className="font-bold text-sm">{context1.storage.name}</div>
              <ul className="list-disc">
                {context1.selectedItems.map((item, i) => (
                  <li className="text-xs" key={i}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-8 mt-2">
              {modalState === "right_arrow" ? (
                <FaArrowRight />
              ) : (
                <FaArrowLeft />
              )}
            </div>
            <div className="w-1/2 text-left">
              <div className="font-bold text-sm">{context2.storage.name}</div>
              <ul className="list-disc">
                {context2.selectedItems.map((item, i) => (
                  <li className="text-xs" key={i}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex mt-4 justify-center">
            {modalState === "right_arrow" ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs disabled:bg-blue-100"
                onClick={() => onTransfer(context1, context2)}
                disabled={transferring}
              >
                Transfer
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs disabled:bg-green-100"
                onClick={() => onTransfer(context2, context1)}
                disabled={transferring}
              >
                Transfer
              </button>
            )}
          </div>
        </div>
      </Modal>
      <button
        className="fixed bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded text-sm top-1/4 mt-12  disabled:bg-green-100"
        disabled={
          !transferEnabled(context2.selectedItems, context1.selectedItems)
        }
        onClick={() => setModalState("left_arrow")}
      >
        <FaArrowLeft />
      </button>
    </>
  );
};

export default App;
