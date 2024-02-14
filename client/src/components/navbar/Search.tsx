import Loader from "@/components/ui/Loader";
import { FC } from "react";
import SearchCard from "./SearchCard";
import { searchProduct } from "@/components/Navbar";

interface SearchProps {
  data: searchProduct[];
  visible: boolean;
  loading: boolean;
}

const Search: FC<SearchProps> = ({ data, visible, loading }) => {
  return (
    <div
      className={`${
        visible ? "" : "hidden"
      } bg-cardMain absolute w-full top-12 z-20 shadow-md rounded-md `}
    >
      {loading ? (
        <div className="flex justify-center p-5">
          <Loader />
        </div>
      ) : (
        data &&
        data.map(({ imageUrl, name }) => (
          <SearchCard imageUrl={imageUrl} name={name} />
        ))
      )}
    </div>
  );
};

export default Search;
