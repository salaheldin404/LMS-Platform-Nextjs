import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SearchInput from "./SearchInput";
import { IoSearch } from "react-icons/io5";

interface MobileSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MobileSearch = ({ value, onChange }: MobileSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        <IoSearch />
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogTitle>Search</DialogTitle>
        <SearchInput value={value} onChange={onChange} autoFocus />
      </DialogContent>
    </Dialog>
  );
};

export default MobileSearch;
