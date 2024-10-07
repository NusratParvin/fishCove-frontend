import ArticleForm from "./component/articleForm";

export default function CreateArticlePage() {
  return (
    <div className="max-w-full mx-auto p-4 mt-6">
      <h1 className="text-2xl font-semibold mb-4 text-black/70 tracking-tighter ">
        Create New Article
      </h1>
      <ArticleForm />
    </div>
  );
}
