"use client";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";

export default function ShareBlogPost({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-bold text-muted-foreground">Share:</span>

      {/* Twitter */}
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      {/* Facebook */}
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      {/* LinkedIn */}
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      {/* WhatsApp */}
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      {/* Email */}
      <EmailShareButton
        url={url}
        subject={title}
        body="Check out this article: "
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
}
