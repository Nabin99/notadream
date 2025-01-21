interface ProfileProperties {
  src: string;
  alt: string;
}

export const Profile: React.FC<ProfileProperties> = ({ src, alt }) => {
  return (
    <div className="profile-image-container">
      <img src={src} alt={alt} />
    </div>
  );
};
