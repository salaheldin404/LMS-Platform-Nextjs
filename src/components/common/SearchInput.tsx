import { Input } from "../ui/input";

type SearchInputProps = React.ComponentProps<typeof Input>;

const SearchInput = (props: SearchInputProps) => {
  return (
    <Input
      name="search"
      placeholder="Search..."
      className="w-full px-2 py-5 bg-card"
      {...props}
    />
  );
};

export default SearchInput;
