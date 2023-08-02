import React from "react";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import ApproveButton from "./ApproveButton";
import DeclineButton from "./DeclineButton";
type Props = {};
const prisma = new PrismaClient();
async function RequestList({}: Props) {
  const requests = await prisma.vendorRequest.findMany();
  return (
    <div className="p-3">
      <div>
        <h1 className="title">Request List</h1>
        <p>
          {requests.length >= 2
            ? `${requests.length} Requests`
            : `${requests.length} Request`}
        </p>
      </div>
      <div className="flex flex-col divide-x-2">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between px-3 py-2"
          >
            <div className="flex flex-col md:flex-row items-center gap-3">
              <Image
                alt={request.companyName as string}
                width={500}
                height={500}
                src={request.companyImage as string}
                className="w-12 h-12 rounded-full"
              />
              <p>{request.companyName}</p>
            </div>
            <div className="flex items-center gap-3">
              <ApproveButton request={request} />
              <DeclineButton request={request} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestList;
