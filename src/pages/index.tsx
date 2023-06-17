import InfiniteTweetList from "Y/components/InfiniteTweetList";
import NewTweetForm from "Y/components/newTweetForm";
import { api } from "Y/utils/api";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";

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

const FollowingTweet = () => {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
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

const tabs = ["Recent", "Following"];
const Home: NextPage = () => {
  const userSession = useSession();
  const [selectedTab, setSelectedTab] =
    useState<(typeof tabs)[number]>("Recent");
  return (
    <>
      <div className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold capitalize">home</h1>
        {userSession.status == "authenticated" && (
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                  tab == selectedTab
                    ? "border-b-4 border-b-blue-500 font-bold"
                    : ""
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>
      <NewTweetForm />
      {selectedTab == "Recent" ? <RecentTweet /> : <FollowingTweet />}
    </>
  );
};

export default Home;
