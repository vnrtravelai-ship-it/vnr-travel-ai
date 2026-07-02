import React, { useState } from "react";
import { Train, Calendar, Navigation, Trash2, ArrowRight, Eye, ClipboardCheck, Edit2, Check, X } from "lucide-react";
import { ItineraryResult } from "../../types";

interface MyTripsViewProps {
  lang: "vi" | "en";
  savedTrips: ItineraryResult[];
  deleteTrip: (id: string) => void;
  updateTrip: (id: string, fields: Partial<ItineraryResult>) => void;
  setSubPage: (page: string) => void;
  setItinerary: (val: ItineraryResult | null) => void;
}

export default function MyTripsView({ lang, savedTrips, deleteTrip, updateTrip, setSubPage, setItinerary }: MyTripsViewProps) {
  const t = (vi: string, en: string) => (lang === "vi" ? vi : en);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleInspectTrip = (trip: ItineraryResult) => {
    setItinerary(trip);
    setSubPage("planner");
  };

  const startRenameInput = (trip: ItineraryResult) => {
    if (trip.itineraryId) {
      setEditingId(trip.itineraryId);
      setEditTitle(trip.title);
    }
  };

  const saveRenameInput = (id: string) => {
    if (editTitle.trim()) {
      updateTrip(id, { title: editTitle.trim() });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Header section */}
      <div>
        <span className="text-[#01411C] font-extrabold text-[10px] uppercase font-mono tracking-widest block">
          {t("Nhật ký lữ hành của bạn", "Your historical notebook")}
        </span>
        <h3 className="text-lg font-bold text-slate-900 mt-1">{t("Hành Trình Đã Lưu Của Tôi", "My Saved Railway Itineraries")}</h3>
        <p className="text-xs text-slate-400">{t("Lịch sử lập trình các mác tàu di sản, được đồng bộ trực tuyến thời gian thực với tủ hồ sơ bảo mật.", "History of all coordinates generated via Gemini. Synced live securely to Cloud database.")}</p>
      </div>

      <div className="max-w-4xl">
        {savedTrips.length === 0 ? (
          /* Empty state */
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-green-50 text-[#01411C] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Calendar className="w-6 h-6 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-slate-800">{t("Không Có Hành Trình Nào Được Lưu", "No Saved Plans Found")}</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                {t("Tiến sâu vào trình dệt lịch trình bằng AI, nhấp lập tức 'Lưu Lại Hành Trình' ghim gối đầu tài khoản lữ danh.", "Get custom plans customized by Gemini and click 'Save Itinerary' to see them tabulated here.")}
              </p>
            </div>
            <button
              onClick={() => setSubPage("planner")}
              className="bg-[#01411C] hover:bg-green-800 text-white font-extrabold h-12 px-6 rounded-xl text-xs flex items-center justify-center gap-1 mx-auto cursor-pointer transition-colors"
            >
              {t("Thiết Kế Ngay", "Generate Custom Trip")} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Saved lists */
          <div className="space-y-3">
            {savedTrips.map((trip) => (
              <div key={trip.itineraryId} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-green-400/40 transition-all">
                
                <div className="space-y-1 w-full md:max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-extrabold bg-green-50 text-[#01411C] px-2 py-0.2 rounded uppercase tracking-wider font-mono">
                      🚂 {trip.departure} ➔ {trip.arrival}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold">
                      {trip.daysCount} {t("Ngày", "Days")}
                    </span>
                  </div>

                  {editingId === trip.itineraryId ? (
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="bg-[#FAFAFA] border border-gray-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-green-700 font-extrabold max-w-sm w-full"
                        autoFocus
                      />
                      <button
                        onClick={() => trip.itineraryId && saveRenameInput(trip.itineraryId)}
                        className="p-1 px-2 bg-[#01411C] hover:bg-[#002b11] text-white rounded-lg text-[10px] font-bold font-sans cursor-pointer transition-all flex items-center gap-1 shrink-0"
                      >
                        <Check className="w-3" /> {t("Lưu", "Save")}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="p-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold font-sans cursor-pointer transition-all shrink-0"
                      >
                        <X className="w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-6">{trip.title}</h4>
                      <button
                        onClick={() => startRenameInput(trip)}
                        className="text-slate-400 hover:text-green-700 cursor-pointer p-1"
                        title={t("Chỉnh sửa tiêu đề", "Rename Title")}
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-500 max-w-xl truncate mt-1">&ldquo;{trip.summary}&rdquo;</p>
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t border-slate-50 pt-3 md:border-t-0 md:pt-0 shrink-0">
                  <button
                    onClick={() => handleInspectTrip(trip)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5" /> {t("Mở Xem Lại", "View Details")}
                  </button>

                  <button
                    onClick={() => trip.itineraryId && deleteTrip(trip.itineraryId)}
                    className="bg-rose-50 text-rose-700 hover:bg-rose-100 p-2 rounded-lg transition-colors cursor-pointer"
                    title={t("Xóa bỏ", "Delete plan")}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
