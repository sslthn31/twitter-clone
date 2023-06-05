import InfiniteTweetList from "Y/components/InfiniteTweetList";
import NewTweetForm from "Y/components/newTweetForm";
import { api } from "Y/utils/api";
import { type NextPage } from "next";

const RecentTweet = () => {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((pages) => pages.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
};

const Home: NextPage = () => {
  return (
    <>
      <div className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold capitalize">home</h1>
      </div>
      <NewTweetForm />
      <RecentTweet />
    </>
  );
};

export default Home;
