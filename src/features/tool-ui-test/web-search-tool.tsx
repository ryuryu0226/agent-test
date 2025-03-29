import { makeAssistantToolUI } from "@assistant-ui/react";
import Image from "next/image";

type WebSearchArgs = {
  queries: string[];
};

type WebSearchResult = {
  temperature: string;
};

export const WebSearchToolUI = makeAssistantToolUI<
  WebSearchArgs,
  WebSearchResult
>({
  toolName: "web_search_preview",
  render: (props) => {
    console.log(props);
    if (props.status.type === "complete") {
      return (
        <div className="space-y-4">
          <p>sample image:</p>
          <Image
            src={"/next.svg"}
            alt="Next.js Logo"
            width={200}
            height={200}
          />
          {/* <p>location: {props.args.location}</p>
          <p>temperature: {props.result?.temperature}</p> */}
        </div>
      );
    }
    return null;
  },
});
