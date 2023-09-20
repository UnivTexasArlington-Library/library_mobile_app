import {useQuery} from "@tanstack/react-query";
import {fetchArticleData} from "../util/http";

const useEventsPosts = () =>
  useQuery(["eventsPosts"], () => fetchArticleData("latestEvents"));
export default useEventsPosts;
