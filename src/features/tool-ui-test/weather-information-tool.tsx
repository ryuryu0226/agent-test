import { makeAssistantToolUI } from "@assistant-ui/react";
import Image from "next/image";

type WeatherInformationArgs = {
  location: string;
};

type WeatherInformationResult = {
  temperature: string;
};

export const WeatherInformationToolUI = makeAssistantToolUI<
  WeatherInformationArgs,
  WeatherInformationResult
>({
  toolName: "getWeather",
  render: (props) => {
    console.log(props);
    props.addResult({
      next_action: "次は京都の天気を教えて",
    });
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
          <p>location: {props.args.location}</p>
          <p>temperature: {props.result?.temperature}</p>
        </div>
      );
    }
    return null;
  },
});
