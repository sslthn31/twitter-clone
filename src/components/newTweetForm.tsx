import React, {
  FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Buttons from "./Buttons";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import { api } from "Y/utils/api";

const updateTextArea = (textarea?: HTMLTextAreaElement) => {
  if (!textarea) return;
  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
};

const NewTweetForm = () => {
  const userSession = useSession();
  if (userSession.status === "unauthenticated") return null;

  return <Form />;
};

const Form = () => {
  const userSession = useSession();
  const [newTweet, setNewTweet] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const newTweetMutation = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log(newTweet);
      setNewTweet("");
    },
  });

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextArea(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextArea(textAreaRef.current);
  }, [newTweet]);

  function handleNewTweet(e: FormEvent) {
    e.preventDefault();
    newTweetMutation.mutate({ content: newTweet });
  }
  if (userSession.status === "unauthenticated") return null;

  return (
    <form
      className="flex flex-col gap-2 border-b px-4 py-2"
      onSubmit={handleNewTweet}
    >
      <div className="flex gap-4">
        <ProfileImage src={userSession.data?.user.image} />
        <textarea
          onChange={(e) => setNewTweet(e.target.value)}
          style={{ height: 0 }}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
          ref={inputRef}
          value={newTweet}
        />
      </div>
      <Buttons className="self-end" type="submit">
        Tweet
      </Buttons>
    </form>
  );
};

export default NewTweetForm;
