import type { Root } from "mdast";
import type { Plugin } from "unified";
import { toString } from "mdast-util-to-string";
import readingTime from "reading-time";

// Text signifies formatted. e.g. "5 minute read"
// Minutes signifies to raw minutes. e.g. "2.8" in minutes
export enum ReadTimeFormat {
  Text = "text",
  Minutes = "minutes",
}

interface ReadingTimeOptions {
  format?: ReadTimeFormat;
}

export const remarkReadingTime: Plugin<[ReadingTimeOptions?], Root> = (
  options = {},
) => {
  const { format = ReadTimeFormat.Text } = options;

  return (tree, file) => {
    // parse text into the readingTime helper method
    const text = toString(tree);
    const stats = readingTime(text);

    // save the reading time into the front matter data
    const vFileData = file.data as { readingTime?: string };

    // if minutes specified in options then return raw number otherwise leave formatted
    if (format === ReadTimeFormat.Minutes) {
      vFileData.readingTime = stats.minutes.toString();
    } else {
      vFileData.readingTime = stats.text;
    }
  };
};
