type DefaultHeadMetaTagsProps = {
  title?: string;
  description?: string;
};

const DefaultHeadMetaTags: React.FC<DefaultHeadMetaTagsProps> = ({
  title,
  description,
}) => {
  return (
    <>
      <title>{title || "Workout Analyzer"}</title>
      <meta name="description" content={description || "Workout Analyzer"} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

export default DefaultHeadMetaTags;
