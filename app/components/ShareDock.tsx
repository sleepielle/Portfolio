"use client";

import { CalendarIcon, MailIcon } from "lucide-react";
import { Link } from "react-router";
import React from "react";

import { buttonVariants } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "~/lib/utils";
import { Dock, DockIcon } from "./ui/dock";

export type IconProps = React.HTMLAttributes<SVGElement>;

const Icons = {
  calendar: (props: IconProps) => <CalendarIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  twitter: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M.102 0h4.71l4.193 5.997L14.04 0h1.505L9.58 6.82L16 16h-4.71L6.911 9.738L1.504 16H0l6.337-7.083z"
      ></path>
    </svg>
  ),
  facebook: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M182.594 0C81.445 0 0 81.445 0 182.594v634.813c0 101.149 81.445 182.594 182.594 182.594h344.063V609.063H423.282v-140.75h103.375v-120.25c0-94.475 61.079-181.219 201.781-181.219c56.968 0 99.094 5.469 99.094 5.469l-3.313 131.438s-42.963-.406-89.844-.406c-50.739 0-58.875 23.378-58.875 62.188v102.781h152.75l-6.656 140.75H675.5v390.938h141.906c101.149 0 182.594-81.445 182.594-182.594V182.595C1000 81.446 918.555.001 817.406.001H182.593z"
      ></path>
    </svg>
  ),
};

export function ShareDock({
  postSlug,
  postTitle,
}: {
  postSlug: string;
  postTitle: string;
}) {
  const DATA = {
    contact: {
      social: {
        LinkedIn: {
          name: "Share on LinkedIn",
          url: `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${encodeURIComponent(
            `https://mercedesgpaz.vercel.app/blog/${postSlug}`
          )}&text=${encodeURIComponent(postTitle)}  | Mercedes Paz`,
          icon: Icons.linkedin,
        },

        Twitter: {
          name: "Share on X",
          url: `https://x.com/intent/tweet?url=https://mercedesgpaz.vercel.app/blog/${postSlug}/&amp;text=${postTitle} | Mercedes Paz`,
          icon: Icons.twitter,
        },
        Facebook: {
          name: "Share on Facebook",
          url: `https://www.facebook.com/sharer/sharer.php?u=https://mercedesgpaz.vercel.app/blog/${postSlug}/&amp;text=${postTitle} | Mercedes Paz`,
          icon: Icons.facebook,
        },
      },
    },
  };

  return (
    <>
      <div className="relative "></div>
      <div className=" sm:flex sm:flex-col items-center justify-center absolute top-[94%] left-[91%]   ">
        <TooltipProvider>
          <Dock direction="bottom" className="fixed z-10 ">
            {Object.entries(DATA.contact.social).map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={social.url}
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12 rounded-full "
                      )}
                    >
                      <social.icon className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on {name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      </div>
    </>
  );
}
