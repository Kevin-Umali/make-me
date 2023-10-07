import React, { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PurposeFilterProps {
  purpose: string;
  onPurposeChange: (purpose: string) => void;
}

const PurposeFilter: React.FC<PurposeFilterProps> = ({ purpose, onPurposeChange }) => {
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(purpose);

  const handlePurposeChange = (newPurpose: string) => {
    setSelectedPurpose(newPurpose);
    onPurposeChange(newPurpose);
  };

  return (
    <div className="mb-4">
      <Label htmlFor="purpose" className="block text-md font-medium mb-2">
        End Result Purpose:
      </Label>
      <Select onValueChange={(e) => handlePurposeChange(e)} defaultValue={selectedPurpose ?? ""} aria-label="Select a purpose for the end result">
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Purpose" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Personal Use">Personal Use</SelectItem>
            <SelectItem value="Gift">Gift</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PurposeFilter;
