import SearchClient from "./_components/searchClient";

export const metadata = {
  title: "Search",
  description: "Find vehicles on wheels and filter to match your needs.",
  openGraph: {
    title: "Search",
    description: "Find vehicles on wheels and filter to match your needs.",
    type: "website",
  },
};

export default function Search() {
  return <SearchClient />;
}
