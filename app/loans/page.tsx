"use client";

import { Check, FileText, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import EditIconSVG from "@/components/ui/editIconSvg";
import { Pagination } from "@/components/ui/pagination";
import PenIconSVG from "@/components/ui/pendIconSvg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleSummaryCard from "@/components/ui/vehicleSummaryCard";

import { DeleteIcon } from "@/assets/imageIndex";
import { MOCK_APPLICATIONS } from "@/lib/utils";
import {
  Application,
  TabType,
} from "@/types/loan.interface";
import { SelectedBankCard } from "../search/details/[id]/loan/_components/bankSelectionForm";
import StatusBadge from "@/components/statusBadge";




const ActionButton = ({
  variant = "default",
  className,
  icon,
  children,
  onClick,
}: {
  variant?: "default" | "ghost";
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Button
    variant={variant}
    className={className}
    onClick={onClick}
    child={
      <>
        {icon}
        {children}
      </>
    }
  />
);

const ApplicationCard = ({
  application,
  activeTab,
}: {
  application: Application;
  activeTab: TabType;
}) => {
  const canEdit = activeTab === "draft";
  const canDelete =
    application.status === "Submitted" || application.status === "Draft";

  return (
    <div className="flex flex-col bg-white gap-4 border border-gray-200 py-6 shadow-sm rounded-sm">
      <div className="px-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Application #{application.id}
            </h2>
            <StatusBadge status={application.status} />
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-2">
            {canEdit && (
              <ActionButton
                className="text-[#1A73E8] bg-white hover:bg-blue-50 shadow-none"
                icon={
                  <PenIconSVG width={16} height={16} className="w-4 h-4 mr-2" />
                }
              >
                Edit
              </ActionButton>
            )}

            {canDelete && (
              <ActionButton
                className="text-[#B7192C] bg-white hover:bg-red-50 shadow-none"
                icon={
                  <Image
                    src={DeleteIcon}
                    width={16}
                    height={16}
                    alt="Delete"
                    className="w-4 h-4 mr-2"
                  />
                }
              >
                Delete
              </ActionButton>
            )}
          </div>

          {/* Mobile dropdown menu */}
          <div className="md:hidden">
            {canDelete && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-white hover:bg-gray-50 shadow-none p-2"
                    child={<MoreVertical className="w-4 h-4 text-gray-600" />}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2" align="end">
                  <div className="flex flex-col gap-1">
                    {canEdit && (
                      <ActionButton
                        variant="ghost"
                        className="justify-start text-[#45535F] hover:bg-gray-50 h-auto py-2 px-3"
                        icon={
                          <PenIconSVG
                            width={16}
                            height={16}
                            className="w-4 h-4 mr-2"
                          />
                        }
                      >
                        Edit
                      </ActionButton>
                    )}
                    {application.status === "Draft" && <Separator />}
                    {canDelete && (
                      <ActionButton
                        variant="ghost"
                        className="justify-start text-[#B7192C] hover:bg-red-50 hover:text-[#B7192C] h-auto py-2 px-3"
                        icon={
                          <Image
                            src={DeleteIcon}
                            width={16}
                            height={16}
                            alt="Delete"
                            className="w-4 h-4 mr-2"
                          />
                        }
                      >
                        Delete
                      </ActionButton>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <p className="text-[#45535F] text-sm">
          Submitted on: <span>{application.submittedDate}</span>
        </p>
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row gap-6 px-6">
        <div className="flex-1 w-full">
          <VehicleSummaryCard vehicle={application.vehicle} />
        </div>
        <div className="flex-1 w-full">
          <SelectedBankCard
            name={application.bank.name}
            swiftCode={application.bank.swiftCode}
          />
        </div>
      </div>
    </div>
  );
};

const EmptyState = ({ activeTab }: { activeTab: TabType }) => (
  <div className="text-center py-20">
    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <FileText className="w-10 h-10 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No Applications Yet
    </h3>
    <p className="text-gray-600 mb-6">
      {activeTab === "submitted"
        ? "You haven't submitted any loan applications yet."
        : "You don't have any draft applications."}
    </p>
    <Button
      className="bg-[#2D7EF8] hover:bg-[#1E6FE8] text-white"
      child="Browse Vehicles"
    />
  </div>
);

export default function MyApplications() {
  const [activeTab, setActiveTab] = useState<TabType>("submitted");

  const filteredApplications =
    activeTab === "submitted"
      ? MOCK_APPLICATIONS.filter((app) => app.status !== "Draft")
      : MOCK_APPLICATIONS.filter((app) => app.status === "Draft");

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="px-6 py-12">
        {/* Page Title */}

        <h1 className="text-3xl font-bold text-[#353D45] text-center bg-white p-6 rounded-sm border border-gray-200 mb-8">
          My Applications
        </h1>

        {/* Tabs */}
        <div className="flex flex-col md:flex-row gap-3 md:justify-between mb-8">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TabType)}
            className="w-auto"
          >
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger
                value="submitted"
                className="data-[state=active]:bg-[#2D7EF8] data-[state=active]:text-white rounded-l-full px-6"
              >
                <Check className="w-4 h-4 mr-2" />
                Submitted
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="data-[state=active]:bg-[#2D7EF8] data-[state=active]:text-white rounded-r-full px-6"
              >
                <EditIconSVG className="w-4 h-4 mr-2" />
                Draft
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="text-sm text-[#353D45]">
            {filteredApplications.length} Applications{" "}
            {activeTab === "submitted" ? "Submitted" : "in Draft"}
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {filteredApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  activeTab={activeTab}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={1}
              totalResults={MOCK_APPLICATIONS.length}
              pageSize={10}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyState activeTab={activeTab} />
        )}
      </div>
    </div>
  );
}
