"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { VenueCard } from "./venue-card";
import { useOrder } from "@/src/hooks/order-context";
import { locationService } from "@/src/features/location/data/services/location";
import { Pagination } from "antd";

const ITEMS_PER_PAGE = 6;

export function LocationList() {
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { setVenue } = useOrder();

  useEffect(() => {
    locationService.init();
    setIsClient(true);
  }, []);

  // สร้างข้อมูลที่มีการสุ่มระยะทางจำลองไว้ในตัวแปร
  const venuesWithMeta = useMemo(() => {
    return locationService.getAll().map((venue) => ({
      ...venue,
      // จำลองการคำนวณระยะทางสุ่ม 1-100
      simulatedDistance: Math.floor(Math.random() * 100) + 1,
    }));
  }, [isClient]); // สุ่มใหม่เฉพาะตอนโหลดหน้าครั้งแรกฝั่ง Client

  // เรียงลำดับตามระยะทางที่สุ่มได้
  const sortedVenues = useMemo(() => {
    return [...venuesWithMeta].sort((a, b) => a.simulatedDistance - b.simulatedDistance);
  }, [venuesWithMeta]);

  // Pagination logic
  const totalVenues = sortedVenues.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedVenues = sortedVenues.slice(startIndex, endIndex);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelect = (venue: any) => {
    setSelectedVenueId(venue.id);
    // ส่งข้อมูล venue พร้อม distance เข้าไปใน Context เพื่อใช้ในหน้าถัดไป
    setVenue({ ...venue, distance: venue.simulatedDistance });
  };

  if (!isClient) return null;

  return (
    <div className="mt-10">
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            // ส่งค่าที่สุ่มได้จาก parent ลงไป
            distance={venue.simulatedDistance}
            isSelected={selectedVenueId === venue.id}
            onSelect={() => handleSelect(venue)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalVenues > ITEMS_PER_PAGE && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={totalVenues}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}