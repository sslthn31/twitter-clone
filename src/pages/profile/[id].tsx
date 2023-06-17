import { ssgHelper } from "Y/server/api/ssgHerper";
import { api } from "Y/utils/api";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import React from "react";
import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import IconHoverEffect from "Y/components/IconHoverEffect";
import { VscArrowLeft } from "react-icons/vsc";
import ProfileImage from "Y/components/ProfileImage";
import InfiniteTweetList from "Y/components/InfiniteTweetList";
import FollowButton from "Y/components/FollowButton";
const ProfilePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const trpcUtils = api.useContext();
  const { data: profile } = api.profile.getById.useQuery({ id });
  const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
    { userId: id },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  const toggleFollow = api.profile.toggleFollow.useMutation({
    onSuccess: ({ addedFollow }) => {
      trpcUtils.profile.getById.setData({ id }, (oldData) => {
        if (!oldData) return;

        const countModifier = addedFollow ? 1 : -1;
        return {
          ...oldData,
          isFollowing: addedFollow,
          followersCount: oldData._count.followers + countModifier,
        };
      });
    },
  });
  if (!profile || profile.name == null) return <ErrorPage statusCode={404} />;
  return (
    <>
      <Head>
        <title>{`Twitter Clone ${profile.name}`}</title>
      </Head>
      <div className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">
        <Link href=".." className="mr-2">
          <IconHoverEffect>
            <VscArrowLeft className="h-6 w-6" />
          </IconHoverEffect>
        </Link>
        <ProfileImage src={profile.image} className="flex-shrink-0" />
        <div className="ml-2 flex-grow">
          <h1 className="text-lg font-bold">{profile.name}</h1>
          <div className="text-gray-500">
            {profile._count.tweets}{" "}
            {getPlural(profile._count.tweets, "Tweet", "Tweets")} -{" "}
            {profile._count.followers}{" "}
            {getPlural(profile._count.followers, "Follower", "Followers")} -{" "}
            {profile._count.follows} Following
          </div>
        </div>
        <FollowButton
          isFollowing={profile.isFollowing}
          isLoading={toggleFollow.isLoading}
          userId={id}
          onClick={() => toggleFollow.mutate({ userId: id })}
        />
      </div>
      <div>
        <InfiniteTweetList
          tweets={tweets.data?.pages.flatMap((pages) => pages.tweets)}
          isError={tweets.isError}
          isLoading={tweets.isLoading}
          hasMore={tweets.hasNextPage}
          fetchNewTweets={tweets.fetchNextPage}
        />
      </div>
    </>
  );
};
const pluralFormula = new Intl.PluralRules();
function getPlural(number: number, singular: string, plural: string) {
  return pluralFormula.select(number) === "one" ? singular : plural;
}
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const id = context.params?.id;

  if (!id) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const ssg = ssgHelper();
  await ssg.profile.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
}

export default ProfilePage;
