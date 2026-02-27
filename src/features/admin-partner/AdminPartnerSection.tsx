"use client"

import clsx from "clsx"
import { useState } from "react"
import PartnerContainer from "./PartnerContainer"
import { Plus, Store } from "lucide-react"
import { Button } from "antd"
import PartnerModal from "./PartnerModal"

export default function AdminPartnerSection() {
  const [currentTab, setCurrentTab] = useState(0)
  const tabList: string[] = ['ทั้งหมด', 'ร้านค้า', 'สถานที่']

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-10 flex flex-col gap-7">
      <div className="flex justify-between">
        <p className="font-bold text-2xl">พาร์ทเนอร์</p>
        <Button className="bg-primary! text-background! font-semibold! rounded-xl! px-5!" onClick={showModal}>
          <Plus />
          เพิ่มพาร์ทเนอร์
        </Button>
        <PartnerModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} />
      </div>
      <div className="flex gap-2 bg-secondary w-fit p-2 rounded-xl text-gray-400 text-sm">
        {
          tabList.map((element, index) => {
            return <button key={index} onClick={() => setCurrentTab(index)} className={clsx("transition-all px-5 py-2 rounded-lg cursor-pointer", {
              "bg-background px-5 py-2 rounded-lg text-white! ": currentTab === index
            })}>
              <p>{element}</p>
            </button>
          })
        }
      </div>
      <div className="flex flex-wrap gap-5">
        <PartnerContainer openModal={showModal} key={0} icon={<Store className="stroke-primary" />} partnerName="ร้านดอกไม้ สวนสวรรค์" status="ใช้งาน" ownerName="คุณสมศรี" tel="02-123-4567" type="ร้านดอกไม้" address="ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ" />
        <PartnerContainer openModal={showModal} key={1} icon={<Store className="stroke-primary" />} partnerName="ร้านดอกไม้ สวนสวรรค์" status="ใช้งาน" ownerName="คุณสมศรี" tel="02-123-4567" type="ร้านดอกไม้" address="ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ" />
        <PartnerContainer openModal={showModal} key={2} icon={<Store className="stroke-primary" />} partnerName="ร้านดอกไม้ สวนสวรรค์" status="ใช้งาน" ownerName="คุณสมศรี" tel="02-123-4567" type="ร้านดอกไม้" address="ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ" />
        <PartnerContainer openModal={showModal} key={3} icon={<Store className="stroke-primary" />} partnerName="ร้านดอกไม้ สวนสวรรค์" status="ใช้งาน" ownerName="คุณสมศรี" tel="02-123-4567" type="ร้านดอกไม้" address="ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ" />
      </div>
    </div>
  )
}