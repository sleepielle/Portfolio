import Eyebrow from "./Eyebrow";
import { HeroVideoDialog } from "./ui/hero-video-dialog";

export function DigitalGarden() {
  return (
    <section className="mt-5  border-t-gray-400 pt-5">
      <Eyebrow
        eyebrowText="Check it out!"
        title="Digital Garden"
        description=""
        className={""}
        route=""
      />
      <div className="relative">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </section>
  );
}
