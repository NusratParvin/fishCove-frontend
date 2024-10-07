import Profile from "./component/profileInfo";
import ArticleTabs from "./component/tabArticles";

export default function page() {
  return (
    <div className="me-1">
      <Profile />
      <ArticleTabs />
    </div>
  );
}
