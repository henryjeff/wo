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
      <title>{title || "WO"}</title>
      <meta
        name="description"
        content={
          description || "WO is an open source workout tracker and analyzer"
        }
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

export default DefaultHeadMetaTags;
