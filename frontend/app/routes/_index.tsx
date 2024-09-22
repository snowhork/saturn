import type { MetaFunction } from "@remix-run/node";

import {
  transferApiTransferPost,
  useListApiStoragesGet,
} from "../gen/default/default";
import { RootNode } from "../components/StorageTree";
import { Storage } from "../gen/schema";
import { Alert, Modal, Snackbar, SnackbarCloseReason } from "@mui/material";
import StorageProvider, {
  StorageContextType,
  useInitStorageContext,
} from "../components/StorageProvider";
import { useCallback, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import DragProvider, { StorageNameItem } from "../components/DragProvider";

export const meta: MetaFunction = () => {
  return [{ title: "Saturn" }, { name: "saturn", content: "Saturn" }];
};

const transfer = (
  src: StorageContextType,
  dst: StorageContextType,
  transferData: { src: StorageNameItem; dst: StorageNameItem },
) => {
  return transferApiTransferPost({
    src_name: src.storage.name,
    dst_name: dst.storage.name,

    src_ids: [transferData.src.item.id],
    dst_id: transferData.dst.item.id,

    src_credentials: {
      google_drive_token: src.googleDriveAccessToken,
    },

    dst_credentials: {
      google_drive_token: dst.googleDriveAccessToken,
    },
  });
};

const ButtonWithModal = ({
  context1,
  context2,
  open,
  close,
  transferData,
}: {
  context1: StorageContextType;
  context2: StorageContextType;
  open: boolean;
  close: () => void;
  transferData: { src: StorageNameItem; dst: StorageNameItem };
}) => {
  const [context1Item, context2Item, modalState] = useMemo(() => {
    if (transferData.src.storageName === context1.storage.name) {
      return [transferData.src.item, transferData.dst.item, "right_arrow"];
    } else {
      return [transferData.dst.item, transferData.src.item, "left_arrow"];
    }
  }, [context1, transferData]);

  const [transferring, setTransferring] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const onTransfer = useCallback(
    async (from: StorageContextType, to: StorageContextType) => {
      setTransferring(true);
      try {
        console.log("await transfer(from, to)", from, to);
        await transfer(from, to, transferData);
        setSuccess(true);
      } catch (e) {
        console.error(e);
        setFailed(true);
      } finally {
        setTransferring(false);
      }

      close();
    },
    [close, transferData],
  );

  const onSuccessSnackBarClose = useCallback(
    (_e: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }

      setSuccess(false);
    },
    [],
  );

  const onFailedSnackBarClose = useCallback(
    (_e: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }

      setFailed(false);
    },
    [],
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

      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // className="px-4 py-2"
      >
        <div className="px-8 py-4 bg-gray-800 m-auto mt-12 w-1/2 rounded">
          <div className="text-white flex justify-center">
            <div className="w-1/2 text-right">
              <div className="font-bold text-sm">{context1.storage.name}</div>
              <ul className="list-disc">
                <li className="text-xs">{context1Item.name}</li>
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
                <li className="text-xs">{context2Item.name}</li>
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
    </>
  );
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

  const [open, setOpen] = useState(false);

  const [transferData, setTransferData] = useState<{
    src: StorageNameItem;
    dst: StorageNameItem;
  }>();

  const onDragCallback = useCallback(
    ({ src, dst }: { src: StorageNameItem; dst: StorageNameItem }) => {
      setTransferData({ src, dst });
      setOpen(true);

      // setTransferData({
      //   context1: {
      //     storageName: src.storageName,
      //     itemID: src.item.id,
      //   },
      // });
    },
    [],
  );

  return (
    <DragProvider
      context1={context1}
      context2={context2}
      callback={onDragCallback}
    >
      <div className="w-1/2">
        <div className="font-bold">{storage1.name}</div>
        <StorageProvider context={context1}>
          <RootNode />
        </StorageProvider>
      </div>
      <div className="w-[80px] relative">
        {transferData && (
          <ButtonWithModal
            context1={context1}
            context2={context2}
            open={open}
            close={() => setOpen(false)}
            transferData={transferData}
          />
        )}
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

export default function Index() {
  const { data } = useListApiStoragesGet();

  return (
    <>
      <div className="flex w-full m-5">
        {data && <Storages storage1={data.data[0]} storage2={data.data[1]} />}
      </div>
    </>
  );
}
