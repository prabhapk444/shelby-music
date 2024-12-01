import Header from "@/Components/Header";
import SearchInput from "@/Components/SearchInput";
import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchContent from "./Components/SearchContent";
import Footer from "@/Components/Footer";

interface SearchProps{
    searchParams:{
        title:string;
    };
};

const search = async ({ searchParams}: SearchProps) =>{
    const songs = await getSongsByTitle(searchParams.title);

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
               <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        search
                    </h1>
                    <SearchInput />
               </div>
            </Header>
            <SearchContent songs={songs}/>
            <Footer/>
        </div>
    );
};

export default search;