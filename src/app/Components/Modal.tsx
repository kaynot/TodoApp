"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import Warning from "../imgs/exclamation.png";
import Image from "next/image";

interface ModalProps {
  title?: string;
  open?: boolean;
  onOk?: (value:any) => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  message?: string;
  disabledCancel?: boolean;
}

export const ModalTemplate = ({
  title,
  open,
  onCancel,
  onOk,
  okText,
  message,
  cancelText,
  disabledCancel,
}: ModalProps) => {
return (
    <>
        <Modal
            title={title}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            width={"20%"}
            centered
            footer={[
                <Button key="back" onClick={onOk} className="bg-black text-white">
                    OK
                </Button>,
                !disabledCancel && (
                    <Button key="cancel" onClick={onCancel} className="bg-white text-black">
                        Cancel
                    </Button>
                ),
            ]}
        >
            <div className="flex p-2 gap-4">
                <Image src={Warning} alt="delete.png" className="w-10" />
                {message}
            </div>
        </Modal>
    </>
);
};
