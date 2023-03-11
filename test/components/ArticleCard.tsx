import Article from "@/model/article.model";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden  w-full  gap-4">
      {/* Image section */}
      <div className="relative h-40">
        {/* TODO: //ADD NEXT/IMAGE */}
        <img
          className="absolute object-cover w-full h-full"
          src={article.urlToImage}
          alt={"image alt"}
        />
      </div>
      {/* Title and content section */}
      <div className="p-4">
        <h2 className="text-lg font-bold">{article.title}</h2>
        <p className="mt-2  font-light">{article.content}</p>
      </div>
      {/* Labels section */}
      {/* <div className="bg-gray-100 px-4 py-2 flex flex-wrap items-center">
        {article.map((label) => (
          <span
            key={label}
            className="bg-gray-200 text-gray-700 text-sm rounded-full px-2 py-1 mr-2 mb-2"
          >
            {label}
          </span>
        ))}
      </div> */}
    </div>
  );
}
