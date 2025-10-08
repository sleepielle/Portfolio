const ShareIcons = ({
  postSlug,
  postTitle,
}: {
  postSlug: string;
  postTitle: string;
}) => {
  return (
    <div className="my-5">
      <p className="text-sm mb-2 text-slate-400">Share on social media!</p>
      <div className="flex justify-between items-center ">
        <a
          href={`https://twitter.com/intent/tweet?url=https://mercedesgpaz.vercel.app/blog/${postSlug}/show-your-work/&amp;text=${postTitle}`}
          target="_blank"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M13.982 10.622 20.54 3h-1.554l-5.693 6.618L8.745 3H3.5l6.876 10.007L3.5 21h1.554l6.012-6.989L15.868 21h5.245l-7.131-10.378Zm-2.128 2.474-.697-.997-5.543-7.93H8l4.474 6.4.697.996 5.815 8.318h-2.387l-4.745-6.787Z"></path>
          </svg>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=https://mercedesgpaz.vercel.app/blog/${postSlug}/show-your-work/&amp;text=${postTitle}`}
          target="_blank"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"></path>
          </svg>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&amp;url=https://mercedesgpaz.vercel.app/blog/${postSlug}/show-your-work/&amp;text=${postTitle}`}
          target="_blank"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ShareIcons;
