import {useQuery} from "@tanstack/react-query";
import {fetchArticleData} from "../util/http";

const useBlogPosts = () =>
  useQuery(["blogPosts"], () => fetchArticleData("blogs"));
export default useBlogPosts;
