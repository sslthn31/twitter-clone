import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import TweetCard from "./TweetCard";
import { LoadingAnimation } from "./LoadingAnimation";

type tweetType = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: {
    id: string;
    image: string | null;
    name: string | null;
  };
};

type InfiniteTweetListType = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewTweets: () => Promise<unknown>;
  tweets: tweetType[] | undefined;
};

const InfiniteTweetList = ({
  tweets,
  isError,
  isLoading,
  fetchNewTweets,
  hasMore = false,
}: InfiniteTweetListType) => {
  if (isLoading) return <LoadingAnimation />;
  if (isError) return <h1>Error...</h1>;

  if (!tweets || tweets.length == 0)
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader={<LoadingAnimation />}
      >
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet} />;
        })}
      </InfiniteScroll>
    </ul>
  );
};

export default InfiniteTweetList;
