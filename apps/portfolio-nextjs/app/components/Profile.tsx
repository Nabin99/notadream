import type { StaticImageData } from "next/image";

interface ProfileProperties {
  src: string | StaticImageData;
  alt: string;
}

export const Profile: React.FC<ProfileProperties> = ({ src, alt }) => {
  const imageSource = typeof src === "string" ? src : src.src;
  return (
    <div className="profile-image-container">
      <img src={imageSource} alt={alt} loading="lazy" />
    </div>
  );
};
